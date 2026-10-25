import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFile,readdir} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import {ts} from '../scripts/tooling.mjs';

const root=new URL('../',import.meta.url),read=path=>readFile(new URL(path,root),'utf8');
const [runtime,styles,shell,pdfActions]=await Promise.all(['card-runtime.js','card.css','card-shell.html','card-pdf-actions.js'].map(file=>read('src/shared/apartment-card/'+file)));
function functions(source,mountName){
  const parsed=ts.createSourceFile('source.js',source,ts.ScriptTarget.ES2020,true,ts.ScriptKind.JS);
  const statements=mountName?parsed.statements.find(node=>ts.isFunctionDeclaration(node)&&node.name?.text===mountName)?.body.statements:parsed.statements;
  assert.ok(statements,'Expected mounted card runtime');
  return new Map(statements.filter(ts.isFunctionDeclaration).map(node=>[node.name.text,node.getText(parsed)]));
}
const card=functions(runtime,'mountOrbitApartmentCardRuntime');

test('authored and delivered Framer dependencies use exact filenames and a direct default component declaration',async()=>{
  const folder=fileURLToPath(new URL('src/framer/',root));
  const files=['AdmiralHomepageTrial.source.tsx','AdmiralApartmentList.source.tsx',
    'AdmiralHomepageTrial.tsx','AdmiralApartmentList.tsx','AdmiralApartmentDetailCard.tsx'];
  let localImports=0;
  for(const file of files){
    const source=await read('src/framer/'+file);
    const parsed=ts.createSourceFile(file,source,ts.ScriptTarget.ES2020,true,ts.ScriptKind.TSX);
    const specifiers=[];
    const visit=node=>{
      if((ts.isImportDeclaration(node)||ts.isExportDeclaration(node))&&node.moduleSpecifier&&ts.isStringLiteral(node.moduleSpecifier))specifiers.push(node.moduleSpecifier.text);
      if(ts.isCallExpression(node)&&node.expression.kind===ts.SyntaxKind.ImportKeyword&&node.arguments.length===1&&ts.isStringLiteral(node.arguments[0]))specifiers.push(node.arguments[0].text);
      ts.forEachChild(node,visit);
    };
    visit(parsed);
    for(const specifier of specifiers.filter(name=>name.startsWith('.'))){
      localImports++;
      assert.match(specifier,/\.(?:tsx?|jsx?)$/,file+' local import must include its file extension: '+specifier);
      const target=path.resolve(folder,specifier),relative=path.relative(folder,target);
      assert.ok(relative&&!relative.startsWith('..')&&!path.isAbsolute(relative),file+' dependency must be installed inside the Framer code folder');
      let directory=folder;
      for(const segment of relative.split(path.sep)){
        assert.ok((await readdir(directory)).includes(segment),file+' dependency must exist with exact filename case: '+specifier);
        directory=path.join(directory,segment);
      }
    }
  }
  assert.ok(localImports>=4,'Both authored and generated consumers must exercise local dependency validation');
  for(const file of ['OrbitApartmentCard.source.tsx','AdmiralApartmentDetailCard.tsx']){
    const source=await read('src/framer/'+file);
    const parsed=ts.createSourceFile(file,source,ts.ScriptTarget.ES2020,true,ts.ScriptKind.TSX);
    const component=parsed.statements.filter(node=>ts.isFunctionDeclaration(node)&&node.name?.text==='AdmiralApartmentDetailCard');
    assert.equal(component.length,1,file+' declares one shared component');
    const modifiers=component[0].modifiers?.map(modifier=>modifier.kind)||[];
    assert.ok(modifiers.includes(ts.SyntaxKind.ExportKeyword)&&modifiers.includes(ts.SyntaxKind.DefaultKeyword),file+' directly declares its default component for Framer metadata discovery');
    const valueExports=parsed.statements.filter(node=>
      ts.isExportAssignment(node)||ts.isExportDeclaration(node)||
      ((ts.isFunctionDeclaration(node)||ts.isVariableStatement(node)||ts.isClassDeclaration(node)||ts.isEnumDeclaration(node))&&node.modifiers?.some(modifier=>modifier.kind===ts.SyntaxKind.ExportKeyword)));
    assert.deepEqual(valueExports,[component[0]],file+' has no duplicate named component export or default alias');
  }
});

test('both editable Framer consumers import and mount the sole canonical detail renderer',async()=>{
  for(const name of ['AdmiralHomepageTrial','AdmiralApartmentList']){
    const source=await read('src/framer/'+name+'.source.tsx');
    const parsed=ts.createSourceFile(name+'.tsx',source,ts.ScriptTarget.ES2020,true,ts.ScriptKind.TSX);
    const imports=parsed.statements.filter(node=>ts.isImportDeclaration(node)&&node.moduleSpecifier.text==='./AdmiralApartmentDetailCard.tsx');
    assert.equal(imports.length,1,name+' imports the shared module once');
    assert.equal(imports[0].importClause?.name?.text,'AdmiralApartmentDetailCard');
    let mounts=0;
    const visit=node=>{
      if((ts.isJsxSelfClosingElement(node)||ts.isJsxOpeningElement(node))&&node.tagName.getText(parsed)==='AdmiralApartmentDetailCard')mounts++;
      ts.forEachChild(node,visit);
    };
    visit(parsed);assert.equal(mounts,1,name+' mounts the shared component once');
    assert.doesNotMatch(source,/function detailPlan\b|function detailRooms\b|detail-dialog|ORBIT_APARTMENT_CARD_(?:STYLES|SHELL)/);
  }
  const [list,css,listShell,build]=await Promise.all(['src/shared/apartment-list/app.js','src/shared/apartment-list/styles.css','src/shared/apartment-list/shell.html','scripts/build-apartment-card.mjs'].map(read));
  assert.doesNotMatch(list+css+listShell,/detail-dialog|detail-shell|detail-plan-canvas|function detailPlan\b|function detailRooms\b/);
  assert.match(list,/config\.onApartmentOpen\?\.\(id,data\)/,'List selection delegates its loaded dataset');
  assert.deepEqual([...shell.matchAll(/id="([^"]+)"/g)].map(match=>match[1]),['detail-dialog','media-dialog','toast']);
  for(const file of ['card-runtime.js','card.css','card-shell.html','pdf-export.js'])assert.ok(build.includes('src/shared/apartment-card/'+file),file+' is a canonical build input');
  assert.doesNotMatch(build,/extract-apartment-card|sync-apartment-card|apartment-card\/app\.js|apartment-card\/styles\.css/);
});

function renderDetail(apartment){
  const dialog={dataset:{},innerHTML:'',querySelector(){return {style:{setProperty(){}}};}};
  const context={apartment,byId:()=>apartment,$:()=>dialog,mediaEntries:()=>[],floorText:()=> 'Földszint',
    assetUrl:()=>null,esc:String,number:{format:String},priceNumber:{format:String},hasNumber:Number.isFinite,
    detailRooms:()=>'',detailPlan:()=>'',inquiry:()=>'',downloadLink:()=>'',shareControl:()=>'',saveButton:()=>'',
    apartmentPrice:()=> 'Ár kérésre',statusText:()=> 'Elérhető',factsSignature:()=>'',openDialog(){},
    ResizeObserver:class{observe(){}},requestAnimationFrame(){},fitDetailRooms(){}};
  vm.runInNewContext('let selectedPlanRoom=null,hoverPlanRoom=null,focusedPlanRoom=null,detailResize=null,renderedFactsSignature="";\n'+['detailMetric','detailMetrics','detailPrice','detailUnitMeta','detail'].map(name=>card.get(name)).join('\n')+'\ndetail(apartment.id);',context);
  return dialog.innerHTML;
}
test('rendered shared card keeps Lakásszám in its metrics row and gross-price copy in the footer',()=>{
  for(const garden of [null,12.5]){
    const html=renderDetail({id:'A001',building:'A',apartmentType:'T1',areaInterior:50,areaTerrace:8,areaGarden:garden,price:75000000,status:'available'});
    const metrics=html.match(/<dl class="detail-metrics([^"]*)">([\s\S]*?)<\/dl>/);
    assert.ok(metrics,'The card renders its metrics row');
    const labels=[...metrics[2].matchAll(/<dt>([\s\S]*?)<\/dt>/g)].map(match=>match[1].replace(/<wbr>/g,''));
    assert.deepEqual(labels,garden?['Lakásszám','Beltér','Erkély','Kert']:['Lakásszám','Beltér','Erkély']);
    assert.match(metrics[2],/^<div class="detail-id-metric"><dt>Lakás<wbr>szám<\/dt><dd><h2 class="detail-apartment-number">A001<\/h2>/);
    assert.equal(metrics[1].includes('has-garden'),garden!==null);
    const price=html.match(/<div class="detail-price">([\s\S]*?)<\/p><\/div>/)?.[1];
    assert.ok(price);assert.match(price,/price-value">75<\/span>/);assert.doesNotMatch(price,/Bruttó vételár/);
    assert.match(html,/<p class="detail-illustration-note">[^<]*Bruttó vételár\.<\/p>/);
  }
  assert.match(styles,/#detail-dialog \.detail-metrics \{[^}]*repeat\(3,/);
  assert.match(styles,/#detail-dialog \.detail-metrics\.has-garden \{[^}]*repeat\(4,/);
  assert.match(styles,/#detail-dialog \.detail-core \{[^}]*display: flex;[^}]*flex-direction: column;/);
  assert.doesNotMatch(card.get('detail'),/\buseUrl\b|\bhistory\b/,'Consumers own apartment URL state');
});

test('canonical card keeps selected-apartment PDF actions and cancellation',()=>{
  const actions=functions(pdfActions);
  for(const name of ['downloadLink','downloadDatasheet'])assert.equal(card.get(name),actions.get(name),name+' stays aligned with maintained PDF actions');
  assert.match(card.get('downloadLink'),/<button[^>]+data-download=/);
  assert.match(card.get('downloadDatasheet'),/createAdmiralApartmentPdf\(snapshot/);
  assert.match(card.get('downloadDatasheet'),/dialog\.dataset\.apartment!==id/,'Stale exports cannot download another selection');
  assert.match(runtime,/pdfExportJob\?\.controller\.abort\(\)/);
  assert.match(runtime,/pdfDownloadTimers\.clear\(\)/);
  assert.equal(card.has('datasheet'),false,'No generic type-PDF fallback');
});

test('retired snapshot commands fail without changing canonical sources',async()=>{
  const files=['card-runtime.js','card.css','card-shell.html','pdf-export.js','card-pdf-actions.js'].map(file=>'src/shared/apartment-card/'+file).concat(['app.js','styles.css','shell.html'].map(file=>'src/shared/apartment-list/'+file));
  const hash=async()=>Promise.all(files.map(async file=>createHash('sha256').update(await read(file)).digest('hex')));
  const before=await hash();
  for(const file of ['sync-apartment-card.mjs','sync-apartment-list.mjs','extract-apartment-card.mjs']){
    const result=spawnSync(process.execPath,[fileURLToPath(new URL('scripts/'+file,root)),'--source','unused'],{encoding:'utf8'});
    assert.equal(result.status,1,file+' rejects retired commands');
    assert.match(result.stderr,/retired|read-only historical test utility/);
    assert.match(result.stderr,/changes no files/);
  }
  assert.deepEqual(await hash(),before);
});

test('source manifests identify current canonical sources separately from historical fixtures',async()=>{
  for(const folder of ['apartment-card','apartment-list']){
    const base='src/shared/'+folder+'/';
    const manifest=JSON.parse(await read(base+'source.json'));
    assert.equal(manifest.schemaVersion,'2.0');
    for(const [file,expected] of Object.entries(manifest.canonicalSources)){
      const source=await read(base+file);
      assert.equal(createHash('sha256').update(source).digest('hex'),expected.sha256,folder+'/'+file+' has current metadata');
      assert.equal(Buffer.byteLength(source),expected.bytes);
    }
    if(folder==='apartment-card'){
      for(const file of ['card-runtime.js','card.css','card-shell.html','pdf-export.js','card-pdf-actions.js'])assert.ok(manifest.canonicalSources[file],file);
      assert.deepEqual(Object.keys(manifest.historicalSnapshots),['app.js','styles.css','shell.html']);
    }
  }
});
