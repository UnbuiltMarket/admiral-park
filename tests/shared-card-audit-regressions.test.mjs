import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFile} from 'node:fs/promises';

const runtime=await readFile(new URL('../src/shared/apartment-card/card-runtime.js',import.meta.url),'utf8');
const buttonRuntime=(await readFile(new URL('../src/shared/ui/frosted-button.js',import.meta.url),'utf8')).replace(/^export /gm,'');
function pendingDataFixture(){
  const elements=new Map(),timers=new Map(),classList={toggle(){},add(){},remove(){}},style={getPropertyValue(){return '';},getPropertyPriority(){return '';},setProperty(){},removeProperty(){}};
  for(const id of ['detail-dialog','media-dialog','toast'])elements.set(id,{id,open:false,isConnected:true,dataset:{},classList,style,addEventListener(){},querySelector(){return null;},querySelectorAll(){return [];}});
  const document={baseURI:'https://card.test/',body:{classList,style,append(){}},querySelectorAll(){return [];},activeElement:null,
    createElement(){return {click(){},remove(){}};}};
  let resolveData,exportCalls=0,fetches=0;
  const window={addEventListener(){},dispatchEvent(){},FontFace:null};
  class DownloadURL extends URL {static createObjectURL(){return 'blob:test';}static revokeObjectURL(){}}
  const context={window,document,location:{href:'https://card.test/'},AbortController,URL:DownloadURL,Blob,Intl,Map,Set,WeakMap,WeakSet,Object,Promise,Number,String,Array,JSON,Symbol,
    requestAnimationFrame(){return 1;},setTimeout(fn,ms){const timer={fn,ms};timers.set(timer,timer);return timer;},clearTimeout(timer){timers.delete(timer);},localStorage:{getItem(){return null;}},
    getComputedStyle(){return {getPropertyValue(){return '';}};},
    fetch(){fetches++;return new Promise(resolve=>{resolveData=resolve;});},
    createAdmiralApartmentPdf:async()=>{exportCalls++;return new Blob(['pdf']);}};
  const root={querySelector(selector){return elements.get(selector.slice(1))||null;},addEventListener(){}};
  vm.runInNewContext(buttonRuntime+'\n'+runtime+'\nthis.mount=mountOrbitApartmentCardRuntime;',context);
  const controller=context.mount(root,{dataUrl:'https://card.test/apartments.json'}),attrs=new Map(),label={textContent:'Adatlap'};
  const button={querySelector(){return label;},setAttribute(k,v){attrs.set(k,v);},getAttribute(k){return attrs.get(k)??null;},removeAttribute(k){attrs.delete(k);}};
  return {controller,button,label,elements,timers,release(){resolveData({ok:true,json:async()=>({schemaVersion:'1.0',apartments:[{id:'A001',building:'A',status:'available'}]})});},get fetches(){return fetches;},get exportCalls(){return exportCalls;}};
}
const settles=promise=>Promise.race([promise,new Promise((_,reject)=>setTimeout(()=>reject(new Error('Export remained pending')),100))]);

test('PDF timeout releases the button while the initial JSON request is still pending, then retry reuses its result',async()=>{
  const f=pendingDataFixture();await new Promise(setImmediate);
  const pending=f.controller.download('A001',f.button);
  assert.equal(f.button.getAttribute('aria-busy'),'true');
  const timeout=[...f.timers.values()].find(timer=>timer.ms===45000);assert.ok(timeout);timeout.fn();
  assert.equal((await settles(pending)).status,'error');
  assert.equal(f.button.getAttribute('aria-busy'),null);assert.equal(f.label.textContent,'Adatlap');
  assert.match(f.elements.get('toast').textContent,/Nem sikerült/);assert.equal(f.exportCalls,0);
  f.release();await f.controller.retry();
  assert.equal((await f.controller.download('A001',f.button)).status,'downloaded');
  assert.equal(f.fetches,1);assert.equal(f.exportCalls,1);f.controller.dispose();
});

test('closing and disposing settle PDF jobs waiting for JSON without waiting for the data request',async()=>{
  for(const action of ['close','dispose']){
    const f=pendingDataFixture();await new Promise(setImmediate);
    const pending=f.controller.download('A001',f.button);f.controller[action]();
    assert.equal((await settles(pending)).status,'cancelled');assert.equal(f.exportCalls,0);
    assert.equal(f.button.getAttribute('aria-busy'),null);assert.equal(f.label.textContent,'Adatlap');f.controller.dispose();
  }
});
