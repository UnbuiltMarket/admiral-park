import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFile} from 'node:fs/promises';

const runtime=await readFile(new URL('../src/shared/apartment-card/card-runtime.js',import.meta.url),'utf8');
const apartments=[
  {id:'A001',building:'A',apartmentType:'B',floor:0,rooms:2,areaInterior:51.2,areaTerrace:8,areaGarden:12,price:75000000,status:'available',roomList:[{name:'Nappali',area:30,planNumber:1}],media:{floorplan:{original:'assets/plan.png'}}},
  {id:'C303',building:'C',apartmentType:'D',floor:3,rooms:3,areaInterior:82,areaTerrace:23,areaGarden:0,price:125000000,status:'sold',roomList:[{name:'Szoba',area:20,planNumber:1}],media:{floorplan:{original:'assets/plan-d.png'}}},
];
const dataset={schemaVersion:'1.0',apartments,roomLayouts:{B:{markers:[{number:1,name:'Nappali',x:.5,y:.5}]}}};

function fixture({exporter=async()=>new Blob(['pdf'],{type:'application/pdf'}),fetcher}={}){
  const elements=new Map(),downloads=[],snapshots=[],urls=[],revoked=[],listeners=new Map();
  let fetches=0,layoutWrites=0;
  const classList={toggle(){},add(){},remove(){}};
  const style={getPropertyValue(){return '';},getPropertyPriority(){return '';},setProperty(){},removeProperty(){}};
  for(const id of ['detail-dialog','media-dialog','toast']){
    const element={id,open:false,isConnected:true,dataset:{},classList,style,addEventListener(name,fn){listeners.set(id+':'+name,fn);},querySelector(){throw new Error('A closed export must not initialize or inspect the detail layout');},querySelectorAll(){return [];}};
    Object.defineProperty(element,'innerHTML',{set(){layoutWrites++;}});
    elements.set(id,element);
  }
  const document={baseURI:'https://admiral.test/',body:{classList,style,append(){}},querySelectorAll(){return [];},activeElement:null,
    createElement(name){assert.equal(name,'a');return {click(){downloads.push({name:this.download,url:this.href});},remove(){}};}};
  const window={addEventListener(){},dispatchEvent(){},FontFace:null};
  class DownloadURL extends URL {
    static createObjectURL(){const url='blob:pdf-'+urls.length;urls.push(url);return url;}
    static revokeObjectURL(url){revoked.push(url);}
  }
  const context={window,document,location:{href:'https://admiral.test/?building=B&search=old'},AbortController,URL:DownloadURL,Blob,Intl,Map,Set,WeakMap,WeakSet,Object,Promise,Number,String,Array,JSON,Symbol,
    requestAnimationFrame(){return 1;},setTimeout,clearTimeout,localStorage:{getItem(){return null;}},
    getComputedStyle(element){assert.equal(element,elements.get('detail-dialog'));return {getPropertyValue(property){return {'--detail-ink':'#123456','--sold':'#ab1122'}[property]||'';}};},
    fetch:async(...args)=>{fetches++;if(fetcher)return fetcher(...args);throw new Error('Unexpected JSON request');},
    createAdmiralApartmentPdf:async(snapshot,options)=>{snapshots.push(snapshot);return exporter(snapshot,options);}};
  const root={host:{},querySelector(selector){return elements.get(selector.slice(1))||null;},addEventListener(){}};
  vm.runInNewContext(runtime+'\nthis.mount=mountOrbitApartmentCardRuntime;',context);
  const controller=context.mount(root,{dataset:fetcher?undefined:dataset,dataUrl:'https://admiral.test/apartments.json',assetBaseUrl:'https://assets.admiral.test/',pageUrl:'https://admiral.test/?search=old'});
  const trigger=()=>{
    const attrs=new Map(),label={textContent:'Adatlap'};
    return {label,attrs,querySelector(){return label;},setAttribute(k,v){attrs.set(k,v);},getAttribute(k){return attrs.get(k)??null;},removeAttribute(k){attrs.delete(k);}};
  };
  return {controller,trigger,downloads,snapshots,urls,revoked,elements,listeners,get fetches(){return fetches;},get layoutWrites(){return layoutWrites;}};
}

test('a list download exports the selected apartment through the card engine without opening or rendering a popup',async()=>{
  const f=fixture(),button=f.trigger();
  const result=await f.controller.download('C303',button);
  assert.equal(result.status,'downloaded');assert.equal(f.fetches,0);assert.equal(f.layoutWrites,0);
  assert.equal(f.elements.get('detail-dialog').open,false);
  assert.equal(f.snapshots.length,1);
  const snapshot=f.snapshots[0];
  assert.equal(snapshot.id,'C303');assert.equal(snapshot.price,'125 M Ft');assert.equal(snapshot.status,'Elkelt');
  assert.deepEqual(Array.from(snapshot.metrics,metric=>metric.value),['C303','82 m2','23 m2']);
  assert.equal(snapshot.colors.ink,'#123456');assert.equal(snapshot.colors.status,'#ab1122');
  assert.equal(snapshot.documentLabel,'Alaprajz');assert.equal(snapshot.imageUrl,'https://assets.admiral.test/plan-d.png');
  assert.equal(snapshot.pageUrl,'https://admiral.test/?apartment=C303');
  assert.match(f.downloads[0].name,/^Admiral-Park-C303-adatlap\.pdf$/);
  assert.equal(button.label.textContent,'Adatlap');assert.equal(button.getAttribute('aria-busy'),null);
  f.controller.dispose();assert.deepEqual(f.revoked,f.urls);
});

test('a download requested during initialization shares the in-flight data request',async(t)=>{
  let release;
  const f=fixture({fetcher:()=>new Promise(resolve=>{release=()=>resolve({ok:true,json:async()=>dataset});})});
  t.after(()=>f.controller.dispose());
  await new Promise(setImmediate);
  const pending=f.controller.download('A001',f.trigger());
  assert.equal(f.fetches,1);release();
  assert.equal((await pending).status,'downloaded');assert.equal(f.fetches,1);
  assert.equal(f.snapshots[0].metrics[3].label,'Kert');
  f.controller.dispose();
});

test('repeat clicks share one PDF job while a different apartment cancels the previous job',async()=>{
  const releases=new Map();
  const f=fixture({exporter:(snapshot,{signal})=>new Promise((resolve,reject)=>{
    releases.set(snapshot.id,()=>resolve(new Blob(['pdf'])));
    signal.addEventListener('abort',()=>reject(new Error('cancelled')),{once:true});
  })});
  await f.controller.retry();
  const first=f.trigger(),second=f.trigger(),third=f.trigger();
  const a=f.controller.download('A001',first),repeat=f.controller.download('A001',second);
  assert.equal(f.snapshots.length,1);assert.equal(first.getAttribute('aria-busy'),'true');assert.equal(second.getAttribute('aria-busy'),'true');
  const b=f.controller.download('C303',third);
  assert.equal((await a).status,'cancelled');assert.equal((await repeat).status,'cancelled');
  releases.get('C303')();assert.equal((await b).status,'downloaded');
  assert.deepEqual(f.downloads.map(item=>item.name),['Admiral-Park-C303-adatlap.pdf']);
  for(const button of [first,second,third])assert.equal(button.getAttribute('aria-busy'),null);
  f.controller.dispose();
});

test('a failed export releases busy state and can be retried without a generic type-sheet fallback',async()=>{
  let calls=0;
  const f=fixture({exporter:async()=>{if(++calls===1)throw new Error('offline');return new Blob(['pdf']);}}),button=f.trigger();
  assert.equal((await f.controller.download('A001',button)).status,'error');
  assert.equal(button.getAttribute('aria-busy'),null);assert.equal(f.downloads.length,0);
  assert.equal((await f.controller.download('A001',button)).status,'downloaded');
  assert.equal(calls,2);assert.equal(f.downloads.length,1);f.controller.dispose();
});

test('closing or disposing aborts an unfinished row export and never creates a download URL',async()=>{
  for(const action of ['close','dispose']){
    const f=fixture({exporter:(_snapshot,{signal})=>new Promise((_resolve,reject)=>signal.addEventListener('abort',()=>reject(new Error('cancelled')),{once:true}))});
    await f.controller.retry();
    const button=f.trigger(),pending=f.controller.download('A001',button);
    f.controller[action]();assert.equal((await pending).status,'cancelled');
    assert.equal(f.urls.length,0);assert.equal(f.downloads.length,0);assert.equal(button.getAttribute('aria-busy'),null);
    f.controller.dispose();
  }
});
