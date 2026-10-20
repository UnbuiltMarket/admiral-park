import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFile} from 'node:fs/promises';
import {ts} from '../scripts/tooling.mjs';
import {extractApartmentCard} from '../scripts/extract-apartment-card.mjs';

const root=new URL('../',import.meta.url);
const [runtime,original,styles,originalStyles,shell,component]=await Promise.all([
  'src/shared/apartment-card/card-runtime.js','src/shared/apartment-card/app.js',
  'src/shared/apartment-card/card.css','src/shared/apartment-card/styles.css',
  'src/shared/apartment-card/card-shell.html','src/framer/AdmiralApartmentDetailCard.tsx',
].map(path=>readFile(new URL(path,root),'utf8')));

function functions(source){
  const file=ts.createSourceFile('runtime.js',source,ts.ScriptTarget.ES2020,true,ts.ScriptKind.JS);
  const mount=file.statements.find(node=>ts.isFunctionDeclaration(node)&&node.name?.text==='mountOrbitApartmentCardRuntime');
  return new Map(mount.body.statements.filter(ts.isFunctionDeclaration).map(node=>[node.name.text,node.getText(file)]));
}

test('shared card actually removes list/filter/compare code and hidden list DOM',()=>{
  const functionsByName=functions(runtime);
  for(const name of ['matches','sorted','setupRanges','syncRanges','renderChips','renderTray','row','render','reset','showCompare'])assert.equal(functionsByName.has(name),false,name);
  assert.deepEqual([...shell.matchAll(/id="([^"]+)"/g)].map(match=>match[1]),['detail-dialog','media-dialog','toast']);
  assert.doesNotMatch(styles,/\.(?:filters|apartment-row|compare-table|compare-tray|list-container)\b/);
  assert.doesNotMatch(runtime,/\$\('(?:filters|sort|results|compare-dialog|compare-tray)'\)/);
});

function runtimeFixture(config,fetcher){
  const listeners=new Map(),elements=new Map();
  const classList={toggle(){},add(){},remove(){}};
  const style={getPropertyValue(){return '';},getPropertyPriority(){return '';},setProperty(){},removeProperty(){}};
  for(const id of ['detail-dialog','media-dialog','toast'])elements.set(id,{id,open:false,isConnected:true,dataset:{},classList,style,addEventListener(){},querySelector(){return null;},querySelectorAll(){return [];}});
  const document={baseURI:'https://admiral.test/',body:{classList,style},querySelectorAll(){return [];},activeElement:null};
  const window={addEventListener(name,fn){listeners.set(name,fn);},dispatchEvent(){},FontFace:null};
  const context={window,document,location:{href:'https://admiral.test/'},AbortController,URL,Intl,Map,Set,WeakMap,WeakSet,Object,Promise,Number,String,Array,JSON,Symbol,requestAnimationFrame(){return 1;},setTimeout,clearTimeout,localStorage:{getItem(){return null;}},fetch:fetcher};
  const root={host:{},querySelector(selector){return elements.get(selector.slice(1))||null;},addEventListener(){}};
  vm.runInNewContext(runtime+'\nthis.mount=mountOrbitApartmentCardRuntime;',context);
  return {controller:context.mount(root,config),context,listeners};
}

test('the list reuses its loaded dataset without another JSON request',async()=>{
  let requests=0;
  const states=[];
  const {controller}=runtimeFixture({dataset:{schemaVersion:'1.0',apartments:[]},onState:(state,error)=>states.push([state,error])},async()=>{requests++;throw new Error('Should not fetch');});
  await controller.retry();
  assert.equal(requests,0);
  assert.equal(states.at(-1)[0],'ready');
  controller.open('missing');
  assert.equal(states.at(-1)[0],'error');
  controller.dispose();
});

test('a failed JSON request retries once and concurrent retries share the request',async()=>{
  let requests=0;
  const states=[];
  const fixture=runtimeFixture({dataUrl:'https://admiral.test/details.json',onState:(state,error)=>states.push([state,error])},async()=>{
    requests++;
    return requests===1?{ok:false,status:503}:{ok:true,json:async()=>({schemaVersion:'1.0',apartments:[]})};
  });
  await fixture.controller.retry();
  assert.equal(states.at(-1)[0],'error');
  await Promise.all([fixture.controller.retry(),fixture.controller.retry()]);
  assert.equal(requests,2);
  assert.equal(states.at(-1)[0],'ready');
  fixture.controller.dispose();
});

test('provided malformed data reports an error instead of silently fetching another dataset',async()=>{
  let requests=0;
  const states=[];
  const {controller}=runtimeFixture({dataset:null,onState:(state,error)=>states.push([state,error])},async()=>{requests++;});
  await controller.retry();
  assert.equal(requests,0);assert.equal(states.at(-1)[0],'error');
  controller.dispose();
});

test('shared React component remains lazy and theme changes do not rebuild the card',()=>{
  assert.match(component,/export (?:interface|type) AdmiralApartmentDetailCardProps/);
  assert.match(component,/export function AdmiralApartmentDetailCard/);
  assert.match(component,/export default AdmiralApartmentDetailCard/);
  assert.match(component,/if \(!started \|\| !host.current\) return/);
  assert.match(component,/dataset,/);
  const effectDependencies=component.match(/\}, \[started,([^\]]+)\]\)/)?.[1]||'';
  assert.ok(effectDependencies.includes('dataset'));
  assert.ok(!effectDependencies.includes('theme'));
  assert.match(component,/style=\{\{ \.\.\.theme,/);
});

test('historical extraction stays deterministic, read-only and guarded without defining canonical design',async()=>{
  const extracted=await extractApartmentCard({writeOutputs:false});
  assert.deepEqual(await extractApartmentCard(),extracted);
  await assert.rejects(extractApartmentCard({writeOutputs:true}),/read-only/);
  assert.deepEqual([...extracted['card-shell.html'].matchAll(/id="([^"]+)"/g)].map(match=>match[1]),['detail-dialog','media-dialog','toast']);
  await assert.rejects(extractApartmentCard({runtimeSource:original.replace("if(t.hasAttribute('data-share'))", "if(t.hasAttribute('data-new-action'))"),writeOutputs:false}),/upstream click behavior changed/);
  await assert.rejects(extractApartmentCard({runtimeSource:original.replace('function detailPlan(a)', 'function changedDetailPlan(a)'),writeOutputs:false}),/missing or duplicate detailPlan/);
  await assert.rejects(extractApartmentCard({runtimeSource:original.replace('function toast(message)', 'function newUpstreamFeature(){}\nfunction toast(message)'),writeOutputs:false}),/new upstream function needs classification/);
  await assert.rejects(extractApartmentCard({stylesSource:originalStyles+'\n@container new-card (width < 600px) { .detail-new { display: grid; } }',writeOutputs:false}),/new non-list CSS container/);
});
