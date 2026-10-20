import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {pathToFileURL} from 'node:url';
import path from 'node:path';
const sourceIndex=process.argv.indexOf('--source');
if(sourceIndex<0||!process.argv[sourceIndex+1])throw Error('Provide --source followed by the apartment-list project directory.');
const upstream=pathToFileURL(path.resolve(process.argv[sourceIndex+1])+path.sep);
const base=new URL('../',import.meta.url);
const read=path=>readFile(new URL(path,upstream),'utf8');
let js=(await read('site/app.js')).replace(/\r\n/g,'\n');
const original=js;
const cut=(start,end)=>{const a=js.indexOf(start),b=js.indexOf(end,a);if(a<0||b<0)throw Error(start);js=js.slice(0,a)+js.slice(b);};
js=js.replace('ensureAdmiralFont(montserratFolder).then(()=>{if(!signal.aborted)requestAnimationFrame(fitDetailRooms);});','ensureAdmiralFont(montserratFolder);');
js=js.replace("const dialogs=[$('detail-dialog'),$('compare-dialog'),$('media-dialog')].filter(Boolean);","const dialogs=[$('compare-dialog'),$('media-dialog')].filter(Boolean);");
js=js.replace('let detailResize=null,selectedPlanRoom=null,hoverPlanRoom=null,focusedPlanRoom=null;','let apartmentFocus=null,currentApartmentId=null;');
js=js.replace(/^const roomLabel =[^\n]*\n/m,'').replace(/^const safeUrl =[^\n]*\n/m,'');
js=js.replace('function previewButton(a,item,large=false)', 'function previewButton(a,item)').replace("${large?' gallery-preview':''}",'');
js=js.replace('function downloadLink(a,large=false)', 'function downloadLink(a)').replace("${large?' datasheet-large footer-pill':''}",'');
js=js.replace(/function saveButton\(a,explain=false\)[^\n]+/,`function saveButton(a) { const saved=favorites.has(a.id); return \`<button type="button" class="save-button \${saved?'is-saved':''}" data-save="\${esc(a.id)}" aria-label="\${esc(a.id)} \${saved?'eltávolítása a kedvencekből':'mentése a kedvencekhez'}" aria-pressed="\${saved}">\${svg('heart')}</button>\`; }`);
js=js.replace(/  if\(dialog.id==='detail-dialog'&&useUrl\)[^\n]+\n/,'');
js=js.replace(/  const fallback=dialog.id==='detail-dialog'[^\n]+\n/,'');
js=js.replace("top?.querySelector('[data-close]')||fallback","top?.querySelector('[data-close]')");
cut('function fact(title,value)','function showCompare()');
js=js.replace('function showCompare()',`function detail(id) {
  if(!byId(id))return;
  if(currentApartmentId!==id)apartmentFocus=root.activeElement||document.activeElement;
  currentApartmentId=id;
  if(useUrl){const u=new URL(location.href);u.searchParams.set('apartment',id);try{history.replaceState(null,'',u);}catch{}}
  config.onApartmentOpen?.(id,data);
}
function closeApartment() {
  const id=currentApartmentId;currentApartmentId=null;
  if(useUrl){const u=new URL(location.href);u.searchParams.delete('apartment');try{history.replaceState(null,'',u);}catch{}}
  const fallback=(id?root.querySelector('[data-detail="'+CSS.escape(id)+'"]'):null)||$('favoritesOnly');
  (apartmentFocus?.isConnected?apartmentFocus:fallback)?.focus({preventScroll:true});
  apartmentFocus=null;
}
function refreshFavorites(event = undefined) {
  const previous=[...favorites].sort().join(',');
  let ids=event?.detail?.ids;
  if(!Array.isArray(ids)){try {ids=JSON.parse(localStorage.getItem('admiral-park:favorites:v1')||'[]');}catch{}}
  if(Array.isArray(ids))favorites=new Set(ids.filter(id=>typeof id==='string'&&byId(id)));
  if(data&&previous!==[...favorites].sort().join(','))render();
}
function showCompare()`);
js=js.replace(".querySelector('.dialog-inner,.detail-shell')",".querySelector('.dialog-inner')");
cut('function apartmentLink(id)','function resizeEmbed()');
cut('// Hover and keyboard focus preview','root.addEventListener(\'click\',event=>{');
js=js.replace("  if(!event.target.closest('.detail-share-wrap'))closeShare(false);\n",'');
cut("  if(t.hasAttribute('data-share'))","  if(t.hasAttribute('data-media'))");
js=js.replace(/    const wasDetail=\$\('detail-dialog'\)\.open;\n    render\(\);\n    if\(wasDetail\)[^\n]+\n    else /,"    render();\n    ");
js=js.replace(/    if\(t.hasAttribute\('data-copy-inquiry'\)\)[^\n]+\n/,'');
js=js.replace("    toast(favorites.has(id)?", "    window.dispatchEvent(new CustomEvent('admiral:apartment-favorites',{detail:{ids:[...favorites]}}));\n    toast(favorites.has(id)?");
cut("root.addEventListener('keydown',event=>{","root.addEventListener('error',event=>{");
js=js.replace("if(dialog.id==='detail-dialog'&&closeShare())return;",'');
js=js.replace("window.addEventListener('resize',()=>{updateMediaTransform();requestAnimationFrame(()=>{positionInquiryNotice();positionShareMenu();});},events);","window.addEventListener('resize',updateMediaTransform,events);\nwindow.addEventListener('admiral:apartment-favorites',refreshFavorites,events);\nwindow.addEventListener('storage',event=>{if(event.key==='admiral-park:favorites:v1')refreshFavorites();},events);");
js=js.replace("else if($('detail-dialog').open)closeDialog($('detail-dialog'));","else config.onApartmentClose?.();");
js=js.replace('if(id)detail(id);else config.onApartmentClose?.();','if(id&&byId(id))detail(id);else config.onApartmentClose?.();');
js=js.replace('    apartments=data.apartments;','    apartments=data.apartments;\n    config.onDataLoaded?.(data);');
js=js.replace('return () => {lifecycle.abort();observer.disconnect();detailResize?.disconnect();','const destroy = () => {lifecycle.abort();observer.disconnect();');
js=js.replace('mediaView=null;syncModalState();};\n}', 'mediaView=null;syncModalState();};\nreturn {destroy,closeApartment,refreshFavorites,getData:()=>data,getState:()=>({...state})};\n}');
js=js.replace(/\nif \(!window\.ADMIRAL_MANUAL_MOUNT\)[\s\S]*$/,'\n');
if(js.includes('detail-dialog')||js.includes('detailPlan')||js.includes('closeShare')){console.log(js.split('\n').filter(line=>/detail-dialog|detailPlan|closeShare/.test(line)).join('\n'));throw Error('Duplicated detail logic left in runtime');}
let css=await read('site/styles.css');
const ca=css.indexOf('/* The drawing leads;'),cb=css.indexOf('.compare-dialog {',ca);
if(ca<0||cb<0)throw Error('Missing CSS boundaries');
css=css.slice(0,ca)+css.slice(cb);
css=css.split('\n').filter(line=>!/^\s*(?:\.detail-gallery|\.gallery-preview|\.source-note|\.dialog-inner > \.source-note|\.empty-plan)/.test(line)).join('\n');
css=css.replace(/^\s*--detail-[^\n]*\n/gm,'');
css=css.replace("/* Details and comparison inherit the list's editable theme. */","/* Comparison and drawing previews inherit the editable list theme. */");
let shell=(await read('site/index.html')).match(/<body>([\s\S]*?)<script type="module"/)[1];
shell=shell.replace(/^.*<dialog id="detail-dialog"[^\n]*\n/m,'');
js=js.trimEnd()+'\n';css=css.replace(/\r\n/g,'\n').trimEnd()+'\n';shell=shell.replace(/\r\n/g,'\n').trimEnd()+'\n';
await mkdir(new URL('src/shared/apartment-list/',base),{recursive:true});
for(const [name,value] of [['app.js',js],['styles.css',css],['shell.html',shell]])await writeFile(new URL('src/shared/apartment-list/'+name,base),value);
await writeFile(new URL('src/shared/apartment-list/source.json',base),JSON.stringify({source:'Apartment list site snapshot',description:'List-only runtime snapshot. Apartment detail rendering is delegated to the shared Framer component.',upstreamAppSha256:createHash('sha256').update(original).digest('hex'),updated:'2026-10-20'},null,2)+'\n');
console.log(JSON.stringify({runtimeBytes:Buffer.byteLength(js),cssBytes:Buffer.byteLength(css),shellBytes:Buffer.byteLength(shell)}));
