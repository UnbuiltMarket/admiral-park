import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
import {ts,requireDev} from '../scripts/tooling.mjs';

const root=new URL('../',import.meta.url);
const read=path=>readFile(new URL(path,root),'utf8');
const source=await read('src/framer/AdmiralApartmentList.tsx');

test('the list delegates apartment details to one local Framer module and contains no duplicate card UI',async()=>{
 const parsed=ts.createSourceFile('AdmiralApartmentList.tsx',source,ts.ScriptTarget.ES2020,true,ts.ScriptKind.TSX);
 const imports=parsed.statements.filter(ts.isImportDeclaration).map(node=>node.moduleSpecifier.text);
 assert.deepEqual(imports,['react','framer','./AdmiralApartmentDetailCard.tsx']);
 assert.doesNotMatch(source,/INITIAL_JSON|"provenance"|originalFileName|function detailPlan\b|function detailRooms\b|detail-dialog/);
 const [shell,css]=await Promise.all([read('src/shared/apartment-list/shell.html'),read('src/shared/apartment-list/styles.css')]);
 assert.doesNotMatch(shell+css,/detail-dialog|detail-shell|detail-plan-canvas|room-marker|share-popover/);
 assert.match(shell,/compare-dialog/);assert.match(shell,/media-dialog/);
 assert.match(source,/dataset=\{dataset\}/);
});

test('the list keeps its Framer controls and can render on the server without fetching apartment data',()=>{
 const React=requireDev('react'),ReactDOMServer=requireDev('react-dom/server');
 const compiled=ts.transpileModule(source,{compilerOptions:{target:ts.ScriptTarget.ES2020,module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.React}}).outputText;
 let component,controls;
 const exports={};
 const noFetch=()=>{throw Error('Server render must not fetch data');};
 const stub={ControlType:new Proxy({},{get:(_,name)=>name}),RenderTarget:{canvas:'canvas',current:()=> 'canvas'},addPropertyControls:(value,props)=>{component=value;controls=props;}};
 vm.runInNewContext(compiled,{exports,require:name=>name==='react'?React:name==='framer'?stub:name==='./AdmiralApartmentDetailCard.tsx'?{default:()=>null}:assert.fail('Unexpected dependency '+name),fetch:noFetch});
 assert.equal(component,exports.default);
 for(const key of ['dataUrl','assetBaseUrl','inquiryUrl','pageUrl','colors','detailColors','inset','topSpacing','mobileTopSpacing'])assert.ok(controls[key],key);
 assert.match(controls.dataUrl.defaultValue,/\/data\/apartment-details\.json$/);
 assert.equal(controls.detailColors.controls.watermarkBottom.defaultValue,'#d9dfe2');
 assert.equal(controls.topSpacing.defaultValue,120);
 assert.equal(controls.mobileTopSpacing.defaultValue,88);
 const html=ReactDOMServer.renderToString(React.createElement(exports.default,{}));
 assert.match(html,/data-admiral-apartment-list="shared"/);
 assert.match(html,/data-orbit-ignore=""/);
 assert.doesNotMatch(html,/dialog|iframe/);
});

test('favourite messages update the list when browser storage is unavailable',async()=>{
 const runtime=await read('src/shared/apartment-list/app.js');
 const parsed=ts.createSourceFile('list.js',runtime,ts.ScriptTarget.ES2020,true,ts.ScriptKind.JS);
 let refresh;
 const visit=node=>{if(ts.isFunctionDeclaration(node)&&node.name?.text==='refreshFavorites')refresh=node.getText(parsed);else ts.forEachChild(node,visit);};
 visit(parsed);assert.ok(refresh);
 const context=vm.createContext({localStorage:{getItem:()=>{throw Error('Storage denied');}}});
 vm.runInContext(`let favorites=new Set(),apartmentsReady=true,data={apartments:[{id:'A001'},{id:'A002'}]},renders=0;const byId=id=>data.apartments.find(a=>a.id===id);const render=()=>renders++;${refresh};globalThis.run=refreshFavorites;globalThis.state=()=>({ids:[...favorites],renders});`,context);
 context.run({detail:{ids:['A001','missing',1]}});
 assert.equal(JSON.stringify(context.state()),JSON.stringify({ids:['A001'],renders:1}));
 context.run({detail:{ids:['A001']}});
 assert.equal(context.state().renders,1,'Unchanged favourites preserve the focused list control.');
 context.run({detail:{ids:[]}});
 assert.equal(JSON.stringify(context.state()),JSON.stringify({ids:[],renders:2}));
});

test('incoming favourites remain intact until apartment records are available',async()=>{
 const runtime=await read('src/shared/apartment-list/app.js');
 const parsed=ts.createSourceFile('list.js',runtime,ts.ScriptTarget.ES2020,true,ts.ScriptKind.JS);
 let refresh;
 const visit=node=>{if(ts.isFunctionDeclaration(node)&&node.name?.text==='refreshFavorites')refresh=node.getText(parsed);else ts.forEachChild(node,visit);};
 visit(parsed);
 const context=vm.createContext({localStorage:{getItem:()=>JSON.stringify(['A001'])}});
 vm.runInContext(`let favorites=new Set(),apartmentsReady=false,renders=0;const byId=()=>undefined;const render=()=>renders++;${refresh};globalThis.run=refreshFavorites;globalThis.state=()=>({ids:[...favorites],renders});`,context);
 context.run({detail:{ids:['A001',1]}});
 assert.equal(JSON.stringify(context.state()),JSON.stringify({ids:['A001'],renders:0}));
 context.run();
 assert.equal(JSON.stringify(context.state()),JSON.stringify({ids:['A001'],renders:0}));
});

test('the runtime preserves list filtering, comparison, media viewing, and shared favourite storage',async()=>{
 const runtime=await read('src/shared/apartment-list/app.js');
 assert.match(runtime,/function matches\(a\)/);
 assert.match(runtime,/function showCompare\(\)/);
 assert.match(runtime,/function openMedia\(id,kind\)/);
 assert.match(runtime,/function downloadDatasheet\(id,trigger\)/);
 assert.match(runtime,/admiral-park:favorites:v1/);
 assert.match(runtime,/admiral:apartment-favorites/);
 assert.match(runtime,/onApartmentOpen\?\.\(id,data\)/);
 assert.match(runtime,/onApartmentClose\?\.\(\)/);
});
