import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {pathToFileURL} from 'node:url';
import {ts} from './tooling.mjs';
const folder=new URL('../src/shared/apartment-card/',import.meta.url);
const sha=value=>createHash('sha256').update(value.replace(/\r\n/g,'\n')).digest('hex');
const guardedSections={
  click:'3d00b12667d9717b0a019696da4a52a7b21051a471b09fbdd9f2586d9aa29faf',
  load:'0f4a0e5c4f7a1603ca2f1f814e5a885c126e330a9cba2e96c62c0a93ab4343a8',
  controller:'3cf2e214da8f3a14aec888f093373504e8f69ed029eb6ffc697ec1654fd57d9b',
};
const fail=message=>{throw new Error('Apartment-card extraction requires review: '+message);};

// Historical migration utility for in-memory comparison and adapter tests only.
// The snapshots are no longer the source of the directly maintained shared card.
export async function extractApartmentCard({runtimeSource,stylesSource,shellSource,writeOutputs=false}={}){
if(writeOutputs)throw new Error('Historical apartment-card extraction is read-only. Edit the canonical shared sources directly; see FRAMER-SHARED-CARD.md.');
const [source,css,originalShell]=await Promise.all([
  runtimeSource??readFile(new URL('app.js',folder),'utf8'),
  stylesSource??readFile(new URL('styles.css',folder),'utf8'),
  shellSource??readFile(new URL('shell.html',folder),'utf8'),
]);
const file=ts.createSourceFile('app.js',source,ts.ScriptTarget.ES2020,true,ts.ScriptKind.JS);
if(file.parseDiagnostics.length)fail('runtime is not valid JavaScript');
const mounts=file.statements.filter(s=>ts.isFunctionDeclaration(s)&&s.name?.text==='mountOrbitApartmentCardRuntime');
if(mounts.length!==1)fail('expected one mounted runtime');
const mount=mounts[0];
const declarations=mount.body.statements.filter(ts.isFunctionDeclaration);
for(const name of ['detail','detailPlan','detailRooms','syncModalState','openDialog','finishDialogClose','openMedia','shareApartment','copyText','load']){
  if(declarations.filter(node=>node.name?.text===name).length!==1)fail('missing or duplicate '+name+' function');
}
for(const [name,expected] of Object.entries(guardedSections)){
  const nodes=mount.body.statements.filter(node=>name==='click'?node.getText(file).startsWith("root.addEventListener('click'"):name==='load'?ts.isFunctionDeclaration(node)&&node.name?.text==='load':ts.isVariableStatement(node)&&node.declarationList.declarations.some(d=>d.name.getText(file)==='controller'));
  if(nodes.length!==1||sha(nodes[0].getText(file))!==expected)fail('upstream '+name+' behavior changed; review the card-only adapter instead of silently dropping that update');
}
const removeFunctions=new Set(['readUrl','writeUrl','syncControls','setupRanges','syncRanges','updateRange','setupOptions','matches','sorted','previewButton','compareToggle','row','renderChips','renderTray','render','reset','fact','showCompare','resizeEmbed','moveRangeOnTrack']);
const removeVariables=new Set(['embed','useUrl','filterIds','checks','numericFilters','rangeGroups','rangeBounds','defaults','state','observer']);
const retainedFunctions=new Set(('assetUrl toast mediaEntries datasheet downloadLink saveButton syncModalState openDialog finishDialogClose closeDialog inquiry positionInquiryNotice detailMetric validPlanMarkers detailPlan detailRooms detail selectDetailPanel selectDetailDocument selectDetailRoomView fitDetailRooms paintPlanRoom selectPlanRoom openMedia showMedia updateMediaTransform zoomMedia downloadDatasheet apartmentLink sharePayload shareControl shareMenu closeShare positionShareMenu openShareMenu shareApartment copyShareLink copyText stopMediaDrag load').split(' '));
for(const node of declarations)if(!removeFunctions.has(node.name.text)&&!retainedFunctions.has(node.name.text))fail('new upstream function needs classification as card or list code: '+node.name.text);
for(const node of file.statements)if(!ts.isFunctionDeclaration(node)||!['mountOrbitApartmentCardRuntime','ensureOrbitApartmentCardFont'].includes(node.name?.text))fail('new top-level runtime dependency needs classification');
const click=String.raw`root.addEventListener('click',event=>{
  if(!event.target.closest('.detail-share-wrap'))closeShare(false);
  const t=event.target.closest('button,a[data-download],[data-close]');if(!t)return;
  if(t.hasAttribute('data-share'))shareApartment(t.dataset.share,t);
  if(t.hasAttribute('data-share-close'))closeShare();
  if(t.hasAttribute('data-share-copy'))copyShareLink(t.dataset.shareCopy);
  if(t.hasAttribute('data-detail-tab'))selectDetailPanel(t.dataset.detailTab);
  if(t.hasAttribute('data-document-view'))selectDetailDocument(t.dataset.documentView);
  if(t.hasAttribute('data-room-view'))selectDetailRoomView(t.dataset.roomView);
  if(t.hasAttribute('data-plan-room'))selectPlanRoom(t.dataset.planRoom,t);
  if(t.hasAttribute('data-inquiry-placeholder')){
    const dialog=$('detail-dialog'),note=dialog.querySelector('.inquiry-pending');
    if(note){note.hidden=!note.hidden;t.setAttribute('aria-expanded',String(!note.hidden));if(!note.hidden)positionInquiryNotice();}
  }
  if(t.hasAttribute('data-media'))openMedia(t.dataset.media,t.dataset.mediaKind);
  if(t.hasAttribute('data-media-tab'))showMedia(Number(t.dataset.mediaTab));
  if(t.hasAttribute('data-media-retry')&&mediaView){showMedia(mediaView.index);$('media-dialog').querySelector('.media-stage')?.focus();}
  if(t.hasAttribute('data-zoom'))zoomMedia(t.dataset.zoom);
  if(t.hasAttribute('data-download')){event.preventDefault();downloadDatasheet(t.dataset.download,t);}
  if(t.hasAttribute('data-save')){
    const id=t.dataset.save;if(favorites.has(id))favorites.delete(id);else favorites.add(id);
    try{localStorage.setItem('admiral-park:favorites:v1',JSON.stringify([...favorites]));}catch{storage=false;}
    updateFavoriteButton();
    $('detail-dialog').querySelector('[data-save]')?.focus({preventScroll:true});
    window.dispatchEvent(new CustomEvent('admiral:apartment-favorites',{detail:{ids:[...favorites]}}));
    toast(favorites.has(id)?\`A(z) \${id} lakást elmentettük\${storage?'':'. A mentés csak ezen az oldalon marad meg'}.\`:\`A(z) \${id} lakást eltávolítottuk a kedvencekből.\`);
  }
  if(t.hasAttribute('data-close'))closeDialog(t.closest('dialog'));
  if(t.hasAttribute('data-copy-inquiry')){
    const a=byId(t.dataset.copyInquiry);if(a)copyText(\`Érdeklődöm az Admiral Park \${a.id} lakása iránt.\n\${a.building} épület, \${floorText(a)}\nNettó alapterület: \${area(a.areaInterior)}\nErkély: \${area(a.areaTerrace)}\nBruttó ár: \${price(a.price)}\n\${apartmentLink(a.id)}\`);
  }
},events);
function updateFavoriteButton(){
  const dialog=$('detail-dialog'),id=dialog.dataset.apartment,a=byId(id),button=dialog.querySelector('[data-save]');if(!button||!a)return;
  const saved=favorites.has(id);button.classList.toggle('is-saved',saved);button.setAttribute('aria-pressed',String(saved));
  button.setAttribute('aria-label',id+' '+(saved?'eltávolítása a kedvencekből':'mentése a kedvencekhez'));
  const label=button.querySelector('.detail-save-label');if(label)label.textContent=saved?'Kedvencekhez mentve':'Mentés a kedvencekhez';
}
function syncFavorites(event){
  if(event.type==='storage'&&event.key!=='admiral-park:favorites:v1')return;
  try{const ids=event.detail?.ids||JSON.parse(localStorage.getItem('admiral-park:favorites:v1')||'[]');if(Array.isArray(ids))favorites=new Set(ids.filter(id=>typeof id==='string'));}catch{storage=false;}
  updateFavoriteButton();
}
window.addEventListener('storage',syncFavorites,events);
window.addEventListener('admiral:apartment-favorites',syncFavorites,events);`;
const load=String.raw`let loadPromise=null;
async function load(){
  if(loadPromise)return loadPromise;
  config.onState?.('loading','');
  loadPromise=(async()=>{
    try{
      // Keep provided-data initialization asynchronous too, so concurrent opens
      // and retries share the same in-flight initialization promise.
      await Promise.resolve();
      if(config.dataset!==undefined)data=config.dataset;
      else{
        const response=await fetch(config.dataUrl||'./apartments.json',{cache:'no-cache',signal});
        if(!response.ok)throw new Error('HTTP '+response.status);
        data=await response.json();
      }
      if(signal.aborted)return;
      if(!data||data.schemaVersion!=='1.0'||!Array.isArray(data.apartments))throw new Error('Nem támogatott adatformátum');
      const ids=new Set();
      for(const a of data.apartments){
        if(!a||typeof a.id!=='string'||!a.id||ids.has(a.id)||!Object.hasOwn(labels,a.status)||typeof a.building!=='string')throw new Error('Hibás vagy ismétlődő lakásadat');
        ids.add(a.id);
        for(const field of ['floor','rooms','areaInterior','areaTerrace','areaGarden','price'])if(a[field]!=null&&(!hasNumber(a[field])||a[field]<0))throw new Error('Hibás számadat');
      }
      apartments=data.apartments;favorites=new Set([...favorites].filter(id=>ids.has(id)));
      config.onState?.('ready','');config.onReady?.(controller);
      if(requestedApartmentId){if(byId(requestedApartmentId))detail(requestedApartmentId);else config.onState?.('error','A kiválasztott lakás nem található.');}
    }catch(error){
      if(signal.aborted)return;
      data=undefined;apartments=[];
      config.onState?.('error','Nem sikerült betölteni a lakás adatait. Próbálja újra.');
    }finally{loadPromise=null;}
  })();
  return loadPromise;
}
const controller={
  open(id){
    requestedApartmentId=typeof id==='string'?id:null;if(!requestedApartmentId)return;
    if(data){if(byId(requestedApartmentId)){config.onState?.('ready','');detail(requestedApartmentId);}else config.onState?.('error','A kiválasztott lakás nem található.');}
  },
  close(){requestedApartmentId=null;for(const dialog of [...dialogs].reverse())closeDialog(dialog);},
  retry(){return load();},
  dispose(){lifecycle.abort();detailResize?.disconnect();clearTimeout(toastTimer);for(const d of [...dialogs].reverse()){if(d.open)d.close();modalRegistry.delete(d);}for(const url of downloadUrls)URL.revokeObjectURL(url);downloadUrls.clear();mediaView=null;syncModalState();}
};
load();
return controller;`;
let body=[];
for(const statement of mount.body.statements){
  let text=statement.getText(file);
  if(ts.isFunctionDeclaration(statement)){
    if(removeFunctions.has(statement.name.text)||statement.name.text==='load')continue;
    if(statement.name.text==='apartmentLink')text=String.raw`function apartmentLink(id){const u=new URL(safeUrl(config.pageUrl)||location.href);for(const key of ['building','floor','rooms','status','minArea','maxArea','minPrice','maxPrice','terrace','garden','favoritesOnly','search','sort'])u.searchParams.delete(key);u.searchParams.set('apartment',id);return u.href;}`;
    if(statement.name.text==='finishDialogClose'){
      const pattern=/  if\(dialog\.id==='detail-dialog'&&useUrl\)[^\n]+\n/g;
      if([...text.matchAll(pattern)].length!==1)fail('detail URL close anchor changed');
      text=text.replace(pattern,'');
    }
    if(statement.name.text==='detail'){
      const pattern=/  if\(useUrl\)[^\n]+\n/g;
      if([...text.matchAll(pattern)].length!==1)fail('detail URL open anchor changed');
      text=text.replace(pattern,'');
    }
  }
  if(ts.isVariableStatement(statement)){
    const names=statement.declarationList.declarations.map(d=>d.name.getText(file));
    if(names.some(name=>removeVariables.has(name)||name==='controller'))continue;
    if(names.includes('apartments'))text='let apartments=[],data,favorites=new Set(),toastTimer,mediaView=null,mediaSequence=0;';
    if(names.includes('dialogs'))text="const dialogs=[$('detail-dialog'),$('media-dialog')].filter(Boolean);";
  }
  if(text.startsWith("root.addEventListener('click'")){body.push(click);continue;}
  if(text.startsWith("$('filters')")||text.startsWith("$('sort')")||text.startsWith('if(useUrl)')||text.startsWith('if(embed)')||text.startsWith('observer.')||text==='load();'||text==='return controller;')continue;
  if(ts.isForOfStatement(statement)&&text.includes("$('filters')"))continue;
  if(text.startsWith("window.addEventListener('resize'"))text=text.replace('updateMediaTransform();','updateMediaTransform();requestAnimationFrame(fitDetailRooms);');
  body.push(text);
}
const fonts=file.statements.filter(s=>ts.isFunctionDeclaration(s)&&s.name?.text==='ensureOrbitApartmentCardFont');
if(fonts.length!==1)fail('font loader changed');
const font=fonts[0].getText(file);
const pdfActions=await readFile(new URL('card-pdf-actions.js',folder),'utf8');
const pdfFile=ts.createSourceFile('card-pdf-actions.js',pdfActions,ts.ScriptTarget.ES2020,true,ts.ScriptKind.JS);
if(pdfFile.parseDiagnostics.length)fail('PDF actions are not valid JavaScript');
const replacements=new Map(pdfFile.statements.filter(ts.isFunctionDeclaration).map(node=>[node.name.text,node.getText(pdfFile)]));
if(replacements.size!==2||!replacements.has('downloadLink')||!replacements.has('downloadDatasheet'))fail('unexpected PDF action replacement');
body=body.flatMap(text=>{
  const match=/^(?:async )?function (\w+)\(/.exec(text),name=match?.[1];
  if(name==='datasheet')return [];
  return [replacements.get(name)||text];
});
const pdfState="let pdfExportJob=null;const pdfDownloadTimers=new Set();\n$('detail-dialog').addEventListener('close',()=>{pdfExportJob?.controller.abort();pdfExportJob=null;},events);\nsignal.addEventListener('abort',()=>{pdfExportJob?.controller.abort();for(const timer of pdfDownloadTimers)clearTimeout(timer);pdfDownloadTimers.clear();},{once:true});";
const runtime='// Card-only runtime. Shared by the list and orbit; no list/filter/comparison renderer.\n'+font+'\n\nfunction mountOrbitApartmentCardRuntime(root=document,config={}){\n'+body.join('\n')+'\n'+pdfState+'\n'+load+'\n}\n';
// Unescape template literals embedded in the String.raw source above.
const cardRuntime=runtime.replace(/\\`/g,'`').replace(/\\\$\{/g,'${');
const outputFile=ts.createSourceFile('card-runtime.js',cardRuntime,ts.ScriptTarget.ES2020,true,ts.ScriptKind.JS);
if(outputFile.parseDiagnostics.length)fail('generated card runtime is not valid JavaScript');
const strippedNames=new Set([...removeFunctions,...removeVariables]);
function inspect(node){
  if(ts.isIdentifier(node)&&strippedNames.has(node.text)&&!(ts.isPropertyAccessExpression(node.parent)&&node.parent.name===node))fail('retained card code now depends on removed list function/state: '+node.text);
  ts.forEachChild(node,inspect);
}
inspect(outputFile);
const cardShell=['detail-dialog','media-dialog','toast'].map(id=>{
  const tag=id==='toast'?'div':'dialog';
  const matches=[...originalShell.matchAll(new RegExp('<'+tag+'\\b[^>]*\\bid="'+id+'"[^>]*>[\\s\\S]*?</'+tag+'>','g'))];
  if(matches.length!==1)fail('missing or duplicate '+id+' shell');
  return matches[0][0];
}).join('\n')+'\n';

// Keep all declaration bodies and ordering that can style the detail/media card.
// Remove list/filter/comparison selectors and their container-only responsive rules.
const forbidden=/\.(?:list-container|page-width|mobile-filter-button|filter-header|filters|primary-filters|range-filters|range-field|range-slider|slider-track|slider-selection|checkbox-filters|checkbox-label|field|select-wrap|result-toolbar|result-count|result-total|reset-button|sort-field|favorites-hint|filter-chips|filter-chip|results|apartment-table|apartment-row|unit-id|unit-type|unit-open|unit-summary|unit-identification|unit-media|cell-[\w-]+|garden-value|row-actions|action-pills|compare[\w-]*|tray-[\w-]+|details-button|data-note|loading-state|loading-dot|empty-state|empty-mark|detail-gallery|gallery-preview|source-note)(?![\w-])/;
function prune(input){
  let out='',cursor=0;
  while(cursor<input.length){
    while(/\s/.test(input[cursor]||''))cursor++;
    if(cursor>=input.length)break;
    if(input.startsWith('/*',cursor)){const end=input.indexOf('*/',cursor)+2;if(end<2)fail('unclosed CSS comment');cursor=end;continue;}
    const start=cursor,open=input.indexOf('{',cursor);if(open<0)break;
    const header=input.slice(start,open).trim();let level=1,end=open+1,quote='';
    for(;end<input.length&&level;end++){
      const c=input[end];if(quote){if(c===quote&&input[end-1]!=='\\')quote='';continue;}
      if(c==='"'||c==="'"){quote=c;continue;}if(c==='{')level++;if(c==='}')level--;
    }
    if(level)fail('unbalanced CSS rule: '+header);
    const content=input.slice(open+1,end-1);cursor=end;
    if(header.startsWith('@container')){
      if(!header.startsWith('@container apartment-list ')&&header!=='@container (max-width: 640px)')fail('new non-list CSS container rule: '+header);
      continue;
    }
    if(header.startsWith('@media')){const kept=prune(content);if(kept.trim())out+=header+' {\n'+kept+'}\n';continue;}
    if(header.startsWith('@keyframes')){if(header.includes('detail-availability-pulse'))out+=header+' {'+content+'}\n';continue;}
    if(header.startsWith('@')&&header!=='@font-face')fail('new CSS grouping rule needs classification: '+header);
    const selectors=header.split(',').map(v=>v.trim()).filter(selector=>!forbidden.test(selector));
    if(selectors.length)out+=selectors.join(', ')+' {'+content+'}\n';
  }
  return out;
}
const cardStyles='/* Shared detail and media card styles; list-only selectors removed. */\n'+prune(css);
const outputs={'card-runtime.js':cardRuntime,'card.css':cardStyles,'card-shell.html':cardShell};
return outputs;
}

if(process.argv[1]&&pathToFileURL(process.argv[1]).href===import.meta.url){
  throw new Error('extract-apartment-card.mjs is a read-only historical test utility and changes no files. Edit src/shared/apartment-card/ directly, then run node scripts/build.mjs. See FRAMER-SHARED-CARD.md.');
}
