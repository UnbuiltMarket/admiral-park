import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
import {ts} from '../scripts/tooling.mjs';

const source=await readFile(new URL('../src/core/orbit-apartment-picker.ts',import.meta.url),'utf8');
const script=ts.transpileModule(source,{compilerOptions:{target:ts.ScriptTarget.ES2020,module:ts.ModuleKind.CommonJS}}).outputText;
const palette=[{id:'A001',maskColor:'#2080E0'},{id:'A002',maskColor:'#E08020'}];
function rgba(width=10,height=10){
 const pixels=new Uint8ClampedArray(width*height*4);
 for(let y=0;y<height;y++)for(let x=0;x<width;x++){
  const color=x<width/2?[32,128,224]:[224,128,32],offset=(y*width+x)*4;
  pixels.set([...color,255],offset);
 }
 return pixels;
}

function cssContext(initial='rgb(46, 119, 255)',initialPixel=[46,119,255,255]){
 let resolved=initial,pixel=initialPixel,reads=0,removed=0;const probes=[],surfaces=[],fills=[];
 const ownerDocument={defaultView:{getComputedStyle(probe){assert.ok(probe.parentNode,'CSS tokens must resolve while attached to their inherited root');reads++;return{backgroundColor:resolved};}},createElement(tag){
  if(tag==='span'){
   const properties={},probe={properties,style:{cssText:'',setProperty(name,value){properties[name]=value;}},setAttribute(){},remove(){removed++;this.parentNode=null;}};probes.push(probe);return probe;
  }
  assert.equal(tag,'canvas');const surface={width:0,height:0,getContext(){return{set fillStyle(value){fills.push(value);},fillRect(){},getImageData(){return{data:new Uint8ClampedArray(pixel)};}};}};surfaces.push(surface);return surface;
 }};
 return{ownerDocument,probes,surfaces,fills,setResolved(value,nextPixel=pixel){resolved=value;pixel=nextPixel;},stats:()=>({reads,removed})};
}

function harness({fetchFailure=false,deferredDecode=false,decodeFailure=false,highlightColor,preserveModalHover=false,colorContext}={}){
 const listeners=new Map(),animation=new Map(),draws=[],hovered=[],picked=[],created=[],requests=[],watchdogs=new Map();
 let rafId=0,highlights=[],allowed=['A001','A002'],fetches=0,inFlight=0,maxFetches=0,closed=0,decodes=0,decodeResolve,mapper=(x,y)=>({x,y});
 class Element{
  constructor({control=false,bounds={left:0,top:0,right:100,bottom:100,width:100,height:100}}={}){this.control=control;this.bounds=bounds;this.dataset={};this.style={};this.parentElement=null;}
  matches(selector){return this.fullscreenSurface&&selector.includes(":not([data-orbit-fullscreen-surface])")?false:this.control;}
  contains(node){for(let parent=node;parent;parent=parent.parentElement)if(parent===this)return true;return false;} closest(){return null;}
  querySelectorAll(selector){return(this.controls??[]).filter(control=>control.matches(selector));} getBoundingClientRect(){return this.bounds;}
  appendChild(child){child.parentNode=this;return child;}
 }
 class Canvas extends Element{
  constructor(){super();this.width=0;this.height=0;this.image=null;created.push(this);}
  getContext(){const surface=this;return{
   drawImage(image,...args){surface.image=image;draws.push({surface,image,args});},getImageData(){return{data:surface.image.rgba};},
   createImageData(w,h){return{data:new Uint8ClampedArray(w*h*4)};},putImageData(data){surface.rgba=data.data;},
   clearRect(){},save(){},restore(){},scale(){},beginPath(){},rect(){},clip(){}
  };}
 }
 const root=new Element(),canvas=new Canvas(),document={hidden:false,createElement:()=>new Canvas(),addEventListener(){},removeEventListener(){}};
 if(colorContext)root.ownerDocument=colorContext.ownerDocument;
 const view={enabled:true,checkpoint:0,moving:false,suspended:false,mobile:false,width:100,height:100,viewport:{x:0,y:0,width:100,height:100},focalX:.5,focalY:.5};
 const context={exports:{},Uint8Array,Uint8ClampedArray,Element,document,window:{devicePixelRatio:1,
  addEventListener(name,fn){if(!listeners.has(name))listeners.set(name,[]);listeners.get(name).push(fn);},
  removeEventListener(name,fn){listeners.set(name,(listeners.get(name)??[]).filter(value=>value!==fn));}},
  AbortController,setTimeout(fn,delay){const timer=setTimeout(fn,delay);if(delay===15000)watchdogs.set(timer,fn);return timer;},clearTimeout(timer){watchdogs.delete(timer);clearTimeout(timer);},console,URL,
  getComputedStyle:element=>({display:'block',visibility:'visible',opacity:'1',pointerEvents:'auto',...element.css}),
  requestAnimationFrame(fn){animation.set(++rafId,fn);return rafId;},cancelAnimationFrame(id){animation.delete(id);},
  async fetch(url,init){requests.push({url,cache:init.cache});fetches++;inFlight++;maxFetches=Math.max(maxFetches,inFlight);await Promise.resolve();inFlight--;if(fetchFailure&&url==='mask0'){fetchFailure=false;return{ok:false,status:503};}return{ok:true,blob:async()=>{const index=Number(url.slice(4)),corrupt=decodeFailure&&index===0;if(corrupt)decodeFailure=false;return{size:20,index,corrupt};}};},
  async createImageBitmap(blob){decodes++;if(deferredDecode&&blob.index===0){deferredDecode=false;await new Promise(resolve=>decodeResolve=resolve);}return{width:10,height:10,rgba:blob.corrupt?new Uint8ClampedArray(400):rgba(),close(){closed++;}};}
 };
 vm.runInNewContext(script,context);
 const engine=context.exports.createOrbitApartmentPicker({root,canvas,urls:Array.from({length:8},(_,index)=>'mask'+index),palette,
  getView:()=>view,inputPoint:(x,y)=>mapper(x,y),getAllowedIds:()=>allowed,getHighlightIds:()=>highlights,
  highlightColor,onHover(id){hovered.push(id);if(preserveModalHover&&view.suspended&&id===null)return;highlights=id?[id]:[];},onPick(id){picked.push(id);}});
 function emit(type,extra={}){const event={pointerId:1,pointerType:'mouse',isPrimary:true,button:0,buttons:0,clientX:20,clientY:40,target:root,relatedTarget:root,defaultPrevented:false,...extra};for(const listener of listeners.get(type)??[])listener(event);return event;}
 function flush(){const tasks=[...animation.values()];animation.clear();tasks.forEach(fn=>fn());}
 return{api:context.exports,engine,view,root,canvas,draws,hovered,picked,created,requests,emit,flush,listeners,Element,
  setAllowed(value){allowed=value;},setHighlights(value){highlights=value;},setMapper(value){mapper=value;},resolveDecode(){decodeResolve?.();},
  expireWatchdogs(){for(const[timer,fn]of watchdogs){clearTimeout(timer);watchdogs.delete(timer);fn();}},
  stats:()=>({fetches,inFlight,maxFetches,closed,decodes}),context};
}
async function until(predicate){for(let step=0;step<100;step++){if(predicate())return;await new Promise(resolve=>setImmediate(resolve));}assert.fail('Mask operation did not settle');}

test('exact mask indexing rejects background, transparent pixels, near colours, duplicate palette and blended edges',()=>{
 const app=harness();try{
  const data=rgba(),index=app.api.buildOrbitMaskIndex(data,10,10,palette);
  assert.equal(app.api.orbitMaskPixelAt(index,2.2,4.7),1);assert.equal(app.api.orbitMaskPixelAt(index,7,4),2);
  assert.equal(app.api.orbitMaskPixelAt(index,4,4),0);assert.equal(app.api.orbitMaskPixelAt(index,0,0),0);
  for(const replacement of [[0,0,0,255],[33,128,224,255],[32,128,224,254]]){
   const changed=rgba();changed.set(replacement,(4*10+2)*4);
   assert.equal(app.api.orbitMaskPixelAt(app.api.buildOrbitMaskIndex(changed,10,10,palette),2,4),0);
  }
  assert.throws(()=>app.api.buildOrbitMaskIndex(data,10,10,[...palette,{id:'A003',maskColor:'#2080e0'}]),/Ambiguous/);
  assert.throws(()=>app.api.buildOrbitMaskIndex(data,10,10,[{id:'A001',maskColor:'#000000'}]),/Ambiguous/);
 }finally{app.engine.destroy();}
});

test('cover crop matches wide, tall and focal-shifted orbit layouts in logical scene coordinates',()=>{
 const app=harness();try{
  const wide=app.api.orbitMaskCoverRect(1920,1010,{x:12,y:24,width:390,height:206},.5,.5);
  assert.ok(Math.abs(wide.width-206*1920/1010)<1e-9);assert.equal(wide.y,24);assert.ok(wide.x<12);
  const portrait=app.api.orbitMaskCoverRect(1920,1010,{x:0,y:0,width:390,height:780},0,1);
  assert.equal(portrait.x,0);assert.equal(portrait.y,0);assert.equal(portrait.height,780);assert.ok(portrait.width>1400);
  const right=app.api.orbitMaskCoverRect(1920,1010,{x:0,y:0,width:390,height:780},1,.5);
  assert.equal(right.x,390-right.width);
 }finally{app.engine.destroy();}
});

test('Framer numeric CSS colours and short/alpha hex tint correctly while invalid colours use the default',()=>{
 const app=harness();try{
  for(const color of ['rgb(12, 34, 56)','rgba(12,34,56,.5)','rgb(12 34 56 / 50%)','#0c2238','#0c223880'])assert.deepEqual([...app.api.orbitMaskHighlightRGB(color)],[12,34,56]);
  assert.deepEqual([...app.api.orbitMaskHighlightRGB('#abc')],[170,187,204]);
  assert.deepEqual([...app.api.orbitMaskHighlightRGB('#abcd')],[170,187,204]);
  assert.deepEqual([...app.api.orbitMaskHighlightRGB('rgb(100% 0% 50%)')],[255,0,128]);
  for(const color of ['javascript:alert(1)','rgb(broken)','rgba(12,34,56,broken)','#zzzzzz',undefined])assert.deepEqual([...app.api.orbitMaskHighlightRGB(color)],[248,214,139]);
 }finally{app.engine.destroy();}
});

test('numeric CSS highlight colour reaches the rendered overlay and unchanged diagnostics do not mutate the root',async()=>{
 const app=harness({highlightColor:'rgb(12,34,56)'});try{
  await until(()=>app.engine.snapshot().state==='ready'&&app.engine.snapshot().downloaded===8);
  app.emit('pointermove');app.flush();
  const layer=app.draws.filter(draw=>draw.surface===app.canvas).at(-1).image;
  assert.deepEqual([...layer.rgba.slice((4*10+2)*4,(4*10+2)*4+3)],[12,34,56]);
  let writes=0;app.root.dataset=new Proxy(app.root.dataset,{set(target,key,value){writes++;target[key]=value;return true;}});
  for(let step=0;step<10;step++)app.engine.refresh();
  assert.equal(writes,0,'Unchanged mask state must not retrigger root mutation observers');
 }finally{app.engine.destroy();}
});

test('the published Framer token resolves in its inherited context, including primary variables and nested fallbacks',()=>{
 const app=harness(),css=cssContext(),root={ownerDocument:css.ownerDocument,appendChild(node){node.parentNode=this;return node;}};
 const published='var(--token-66c2eeca-6d1b-4d69-991e-55004b209eb7, rgb(46, 119, 255))';
 try{
  assert.deepEqual([...app.api.orbitMaskHighlightRGB(published,root)],[46,119,255]);
  assert.equal(css.probes.at(-1).properties['--admiral-highlight-probe-color'],published);
  css.setResolved('rgb(12, 34, 56)');assert.deepEqual([...app.api.orbitMaskHighlightRGB(published,root)],[12,34,56],'The actual inherited variable must take priority over the fallback text');
  const nested='var(--missing, var(--nested, hsl(219 100% 59%)))';css.setResolved('rgb(46, 119, 255)');
  assert.deepEqual([...app.api.orbitMaskHighlightRGB(nested,root)],[46,119,255]);assert.equal(css.probes.at(-1).properties['--admiral-highlight-probe-color'],nested);
  assert.deepEqual([...app.api.orbitMaskHighlightRGB('hsl(219 100% 59%)',root)],[46,119,255]);
  assert.equal(css.stats().reads,4);assert.equal(css.stats().removed,4);assert.equal(css.surfaces.length,0,'Resolved numeric CSS does not need a canvas readback');
  assert.deepEqual([...app.api.orbitMaskHighlightRGB(published)],[248,214,139],'Unavailable browser CSS context must degrade safely');
 }finally{app.engine.destroy();}
});

test('browser-supported modern CSS colours use a one-pixel sRGB conversion and invalid computed colours fall back safely',()=>{
 const app=harness(),css=cssContext('color(display-p3 0.2 0.4 0.8)',[39,103,210,255]),root={ownerDocument:css.ownerDocument,appendChild(node){node.parentNode=this;return node;}};
 try{
  assert.deepEqual([...app.api.orbitMaskHighlightRGB('color(display-p3 0.2 0.4 0.8)',root)],[39,103,210]);
  assert.equal(css.fills.at(-1),'color(display-p3 0.2 0.4 0.8)');assert.equal(css.surfaces.at(-1).width,0);assert.equal(css.surfaces.at(-1).height,0);
  css.setResolved('rgba(0, 0, 0, 0)',[0,0,0,0]);
  assert.deepEqual([...app.api.orbitMaskHighlightRGB('not-a-colour',root)],[248,214,139]);
  assert.equal(css.stats().removed,2);
 }finally{app.engine.destroy();}
});

test('highlight style changes and CSS token reapplication preserve masks, downloads, camera, and hover state',async()=>{
 const css=cssContext(),app=harness({highlightColor:'#f8d68b',colorContext:css});
 const tint=()=>{const layer=app.draws.filter(draw=>draw.surface===app.canvas).at(-1).image;return[...layer.rgba.slice((4*10+2)*4,(4*10+2)*4+4)];};
 try{
  await until(()=>app.engine.snapshot().state==='ready'&&app.engine.snapshot().downloaded===8);app.emit('pointermove');app.flush();
  const before=app.stats(),snapshot=app.engine.snapshot();
  app.engine.setHighlightStyle('var(--token-66c2eeca-6d1b-4d69-991e-55004b209eb7, rgb(46, 119, 255))',.33);
  assert.deepEqual(tint(),[46,119,255,84]);assert.deepEqual(app.stats(),before);assert.equal(app.engine.snapshot().checkpoint,snapshot.checkpoint);assert.equal(app.engine.snapshot().cached,snapshot.cached);assert.equal(app.engine.snapshot().hovered,'A001');
  const reads=css.stats().reads;app.emit('pointermove');app.flush();app.engine.refresh();assert.equal(css.stats().reads,reads,'Pointer updates must not perform CSS probe or pixel readbacks');
  css.setResolved('rgb(200, 60, 90)');app.engine.setHighlightStyle();assert.deepEqual(tint(),[200,60,90,84]);assert.deepEqual(app.stats(),before);
  css.setResolved('rgb(9, 8, 7)');app.view.width=110;app.engine.refresh();assert.deepEqual(tint(),[9,8,7,84]);
  css.setResolved('rgb(1, 2, 3)');app.emit('resize');assert.deepEqual(tint(),[1,2,3,84]);assert.deepEqual(app.stats(),before);
 }finally{app.engine.destroy();}
});

test('background input clears a parent highlight intentionally restored after closing an apartment modal',async()=>{
 const app=harness({preserveModalHover:true});try{
  await until(()=>app.engine.snapshot().state==='ready');app.emit('pointermove');app.flush();
  assert.deepEqual([...app.engine.snapshot().highlighted],['A001']);
  app.view.suspended=true;app.engine.refresh();assert.equal(app.engine.snapshot().hovered,null);
  app.view.suspended=false;app.engine.refresh();assert.deepEqual([...app.engine.snapshot().highlighted],['A001']);
  app.emit('pointermove',{clientX:0,clientY:0});app.flush();
  assert.deepEqual([...app.engine.snapshot().highlighted],[]);assert.equal(app.hovered.at(-1),null);
 }finally{app.engine.destroy();}
});

test('explicit audited 16-to-8-bit aliases match exactly and collisions remain rejected',()=>{
 const app=harness();try{
  const exported=[{id:'A001',maskColor:'#63BBF1',maskColorAliases:['#63BAF0']},{id:'A002',maskColor:'#9763BB',maskColorAliases:['#9663BA','#9763BA']}];
  const data=new Uint8ClampedArray(5*5*4);
  for(const rgb of [[99,187,241],[99,186,240]]){
   for(let offset=0;offset<data.length;offset+=4)data.set([...rgb,255],offset);
   assert.equal(app.api.orbitMaskPixelAt(app.api.buildOrbitMaskIndex(data,5,5,exported),2,2),1);
  }
  for(let offset=0;offset<data.length;offset+=4)data.set([100,186,240,255],offset);
  assert.equal(app.api.orbitMaskPixelAt(app.api.buildOrbitMaskIndex(data,5,5,exported),2,2),0,'Nearby unlisted colour must remain unpickable');
  assert.throws(()=>app.api.buildOrbitMaskIndex(data,5,5,[...exported,{id:'A003',maskColor:'#63BAF0'}]),/Ambiguous/);
  assert.throws(()=>app.api.buildOrbitMaskIndex(data,5,5,[exported[0],{id:'A002',maskColor:'#9763BB',maskColorAliases:['#63BBF1']}]),/Ambiguous/);
 }finally{app.engine.destroy();}
});

test('overlay backing is uniformly scaled and capped at the native mask pixel budget',()=>{
 const app=harness();try{
  app.view.width=3840;app.view.height=2160;app.view.viewport={x:0,y:0,width:3840,height:2160};app.context.window.devicePixelRatio=2;app.engine.refresh();
  assert.ok(app.canvas.width*app.canvas.height<=1920*1010);
  assert.ok(Math.abs(app.canvas.width/app.canvas.height-3840/2160)<.002);
  assert.ok(app.canvas.width<3840);assert.ok(app.canvas.height<2160);
 }finally{app.engine.destroy();}
});

test('stationary desktop hover and click select one apartment; controls, filters, drag, moving and modals fail closed',async()=>{
 const app=harness();try{
  await until(()=>app.engine.snapshot().state==='ready');
  app.emit('pointermove');app.flush();assert.equal(app.hovered.at(-1),'A001');
  const count=app.created.length;app.emit('pointermove');app.flush();assert.equal(app.created.length,count,'Repeated same apartment must reuse its highlight texture');
  app.emit('pointerdown');app.emit('pointerup');assert.deepEqual(app.picked,['A001']);
  app.emit('pointerdown');app.emit('pointermove',{clientX:30});app.emit('pointerup',{clientX:30});assert.equal(app.picked.length,1);
  const control=new app.Element({control:true});app.root.controls=[control];app.emit('pointermove');app.flush();assert.equal(app.hovered.at(-1),null);
  app.emit('pointerdown',{target:control});app.emit('pointerup',{target:control});assert.equal(app.picked.length,1);app.root.controls=[];
  app.setAllowed(['A002']);app.engine.refresh();app.emit('pointermove');app.flush();assert.equal(app.hovered.at(-1),null);
  app.emit('pointermove',{clientX:70});app.flush();assert.equal(app.hovered.at(-1),'A002');
  app.view.moving=true;app.engine.refresh();assert.equal(app.engine.snapshot().state,'moving');assert.equal(app.hovered.at(-1),null);assert.deepEqual([...app.engine.snapshot().highlighted],[]);
  app.emit('pointerdown',{clientX:70});app.emit('pointerup',{clientX:70});assert.equal(app.picked.length,1);
  app.view.moving=false;app.view.suspended=true;app.engine.refresh();assert.equal(app.engine.snapshot().state,'off');
 }finally{app.engine.destroy();}
});

test('mobile tap highlights without opening, and scene mapping survives a rotated fullscreen plane',async()=>{
 const app=harness();try{
  await until(()=>app.engine.snapshot().state==='ready');app.view.mobile=true;
  app.emit('pointermove',{pointerType:'touch'});app.flush();assert.equal(app.hovered.length,0);
  app.emit('pointerdown',{pointerType:'touch'});app.emit('pointerup',{pointerType:'touch'});assert.equal(app.hovered.at(-1),'A001');assert.equal(app.picked.length,0);
  app.emit('pointerdown',{pointerType:'touch'});app.emit('pointermove',{pointerType:'touch',clientY:55});app.emit('pointerup',{pointerType:'touch',clientY:55});assert.equal(app.hovered.filter(Boolean).length,1);
  app.view.viewport={x:10,y:10,width:80,height:80};app.engine.refresh();
  app.emit('pointerdown',{pointerType:'touch',clientX:95});app.emit('pointerup',{pointerType:'touch',clientX:95});assert.equal(app.picked.length,0);
  app.setMapper((x,y)=>({x:y,y:100-x}));
  app.emit('pointerdown',{pointerType:'touch',clientX:60,clientY:70});app.emit('pointerup',{pointerType:'touch',clientX:60,clientY:70});
  assert.equal(app.hovered.at(-1),'A002');assert.equal(app.picked.length,0);
 }finally{app.engine.destroy();}
});

test('idle full-window card wrapper and own fullscreen dialog do not obscure picking; real controls still do',async()=>{
 const app=harness();try{
  await until(()=>app.engine.snapshot().state==='ready');
  const idle=new app.Element({control:true});idle.css={pointerEvents:'none'};idle.parentElement=app.root;app.root.controls=[idle];
  app.emit('pointermove');app.flush();assert.equal(app.hovered.at(-1),'A001','Mounted idle card wrapper must not block the facade');
  app.emit('pointerdown');app.emit('pointerup');assert.deepEqual(app.picked,['A001']);
  const child=new app.Element({control:true});child.css={pointerEvents:'auto'};child.parentElement=idle;app.root.controls=[idle,child];
  app.emit('pointermove');app.flush();assert.equal(app.hovered.at(-1),null,'Explicitly interactive child remains a blocker');
  idle.css.opacity='0';app.emit('pointermove');app.flush();assert.equal(app.hovered.at(-1),'A001','An invisible ancestor cannot obscure the facade');
  const surface=new app.Element({control:true});surface.fullscreenSurface=true;surface.parentElement=app.root;app.canvas.parentElement=surface;app.root.controls=[surface];
  app.emit('pointerdown',{target:app.canvas});app.emit('pointerup',{target:app.canvas});assert.equal(app.picked.length,2,'The orbit fullscreen dialog is its own scene, not an overlay blocker');
  const modal=new app.Element({control:true});modal.parentElement=app.root;app.canvas.parentElement=modal;app.root.controls=[modal];
  app.emit('pointermove',{target:app.canvas});app.flush();assert.equal(app.hovered.at(-1),null,'An unrelated real dialog stays blocked');
 }finally{app.engine.destroy();}
});

test('downloads all compressed masks with two requests at once, but retains at most two index maps',async()=>{
 const app=harness();try{
  await until(()=>app.engine.snapshot().state==='ready'&&app.engine.snapshot().downloaded===8);
  assert.equal(app.stats().fetches,8);assert.equal(app.stats().maxFetches,2);assert.equal(app.stats().decodes,1);
  for(const checkpoint of [1,2,3]){app.view.checkpoint=checkpoint;app.engine.refresh();await until(()=>app.engine.snapshot().state==='ready');assert.ok(app.engine.snapshot().cached<=2);}
  assert.equal(app.stats().decodes,4);assert.equal(app.stats().closed,4);assert.equal(app.stats().fetches,8);
  app.engine.destroy();assert.equal(app.root.dataset.orbitMaskState,'off');assert.equal(app.root.dataset.orbitMaskCached,'0');
  assert.ok([...app.listeners.values()].every(list=>list.length===0));
 }finally{app.engine.destroy();}
});

test('failed download never enables picking and can retry without losing other compressed files',async()=>{
 const app=harness({fetchFailure:true});try{
  await until(()=>app.engine.snapshot().state==='error');app.emit('pointerdown');app.emit('pointerup');assert.equal(app.picked.length,0);
  app.engine.retry(0);await until(()=>app.engine.snapshot().state==='ready'&&app.engine.snapshot().downloaded===8);
  assert.equal(app.stats().fetches,9);app.emit('pointermove');app.flush();assert.equal(app.hovered.at(-1),'A001');
 }finally{app.engine.destroy();}
});

test('a corrupt mask retry fetches corrected bytes while preserving the camera and other compressed masks',async()=>{
 const app=harness({decodeFailure:true});try{
  await until(()=>app.engine.snapshot().state==='error'&&app.engine.snapshot().downloaded===8);
  assert.equal(app.stats().fetches,8);assert.equal(app.engine.snapshot().checkpoint,0);
  app.engine.retry(0);await until(()=>app.engine.snapshot().state==='ready'&&app.engine.snapshot().downloaded===8);
  assert.equal(app.engine.snapshot().checkpoint,0);assert.equal(app.stats().fetches,9);
  assert.deepEqual(app.requests.at(-1),{url:'mask0',cache:'reload'});
  app.emit('pointerdown');app.emit('pointerup');assert.deepEqual(app.picked,['A001']);
 }finally{app.engine.destroy();}
});

test('retry after a decode watchdog ignores the obsolete native result and keeps one decode permit',async()=>{
 const app=harness({deferredDecode:true});try{
  await until(()=>app.stats().decodes===1&&app.engine.snapshot().downloaded===8);
  app.expireWatchdogs();assert.equal(app.engine.snapshot().state,'error');
  app.engine.retry(0);await until(()=>app.stats().fetches===9&&app.engine.snapshot().downloaded===8);
  assert.equal(app.stats().decodes,1,'Retry must not add a second native decode while the obsolete one is running');
  app.resolveDecode();await until(()=>app.engine.snapshot().state==='ready');
  assert.equal(app.stats().decodes,2);assert.equal(app.stats().closed,2);assert.equal(app.engine.snapshot().checkpoint,0);
  app.emit('pointermove');app.flush();assert.equal(app.hovered.at(-1),'A001');
 }finally{app.engine.destroy();}
});

test('a stale decode cannot expose the old view, and destroying while decoding closes its eventual bitmap',async()=>{
 const app=harness({deferredDecode:true});
 try{
  await until(()=>app.stats().decodes===1);app.view.checkpoint=1;app.engine.refresh();
  assert.equal(app.engine.snapshot().state,'loading');app.emit('pointermove');app.flush();assert.equal(app.hovered.filter(Boolean).length,0);
  app.resolveDecode();await until(()=>app.engine.snapshot().state==='ready');assert.equal(app.engine.snapshot().checkpoint,1);assert.equal(app.stats().decodes,2);
 }finally{app.engine.destroy();app.resolveDecode();}
 const destroyed=harness({deferredDecode:true});await until(()=>destroyed.stats().decodes===1);destroyed.engine.destroy();destroyed.resolveDecode();
 await until(()=>destroyed.stats().closed===1);assert.equal(destroyed.root.dataset.orbitMaskState,'off');assert.equal(destroyed.root.dataset.orbitMaskCached,'0');assert.equal(destroyed.picked.length,0);
});
