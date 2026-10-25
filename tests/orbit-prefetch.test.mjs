import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
import {ts} from '../scripts/tooling.mjs';

const source=await readFile(new URL('../src/core/orbit-player.ts',import.meta.url),'utf8');
const compiled=ts.transpileModule(source,{compilerOptions:{target:ts.ScriptTarget.ES2020,module:ts.ModuleKind.CommonJS}}).outputText;

function fixture(options={}){
 const requests=[],decodes=[],closed=[],mutations=[],animations=new Map(),listeners=new Map();let now=1000,nextAnimation=0;
 let inFlight=0,maxFetches=0,failOnce=options.failOnce,holdDecodes=!!options.gateDecodes;const decodeWaiters=[];
 class Element{
  constructor(){this.style={};this.dataset={};this.clientWidth=100;this.clientHeight=100;this.parentElement=null;}
  matches(){return false;} contains(value){return value===this;} getAttribute(){return null;} closest(){return null;}
  querySelectorAll(){return [];} getBoundingClientRect(){return {left:0,top:0,right:100,bottom:100,width:100,height:100};}
  hasPointerCapture(){return false;} setPointerCapture(){} releasePointerCapture(){}
 }
 const root=new Element(),canvas=new Element();
 root.dataset=new Proxy({}, {set(target,key,value){mutations.push([key,value]);target[key]=value;return true;}});
 canvas.getContext=()=>({drawImage(){},fillRect(){},save(){},restore(){},beginPath(){},rect(){},clip(){}});
 const world={exports:{},Element,AbortController,setTimeout,clearTimeout,console,performance:{now:()=>now},
  window:{devicePixelRatio:1,addEventListener(name,callback){listeners.set(name,callback);},removeEventListener(name){listeners.delete(name);}},
  document:{hidden:false,addEventListener(){},removeEventListener(){}},
  requestAnimationFrame(callback){animations.set(++nextAnimation,callback);return nextAnimation;},cancelAnimationFrame(id){animations.delete(id);},
  fetch:async url=>{const index=Number(url.slice(5));requests.push(index);inFlight++;maxFetches=Math.max(maxFetches,inFlight);await Promise.resolve();inFlight--;
   if(index===failOnce){failOnce=null;throw new Error('Transient connection failure');}
   return {ok:true,blob:async()=>({index,size:50_000})};},
  createImageBitmap:async(blob,settings)=>{decodes.push({index:blob.index,width:settings.resizeWidth});await Promise.resolve();if(holdDecodes)await new Promise(resolve=>decodeWaiters.push(resolve));return {width:settings.resizeWidth,height:Math.round(settings.resizeWidth*1010/1920),close(){closed.push(blob.index);}};},
  getComputedStyle:()=>({display:'block',visibility:'visible',opacity:'1',pointerEvents:'auto',overflowX:'visible',overflowY:'visible'})};
 vm.runInNewContext(compiled,world);
 const player=world.exports.createOrbitPlayer({root,canvas,urls:Array.from({length:120},(_,index)=>'frame'+index),
  decodeWidth:options.decodeWidth??960,inspectionWidth:options.inspectionWidth??1920,bufferCheckpoints:options.bufferCheckpoints??2,
  startFrame:45,snapDuration:1.5});
 return {player,root,requests,decodes,closed,mutations,get maxFetches(){return maxFetches;},
  releaseDecodes(){holdDecodes=false;for(const resolve of decodeWaiters.splice(0))resolve();},
  tick(milliseconds){now+=milliseconds;const pending=[...animations.values()];animations.clear();for(const callback of pending)callback(now);}};
}

async function until(check){for(let attempt=0;attempt<200;attempt++){if(check())return;await new Promise(resolve=>setImmediate(resolve));}assert.ok(check(),'The orbit reached its expected resource state');}

test('full compressed prefetch keeps every orbit frame downloaded with no decoded allocations until prepare',async()=>{
 const f=fixture();
 try{
  f.player.prefetch();f.player.prefetch();
  await until(()=>f.player.snapshot().downloaded===120);
  assert.equal(f.requests.length,120);assert.equal(new Set(f.requests).size,120);assert.ok(f.maxFetches<=4);
  assert.equal(f.player.snapshot().state,'idle');assert.equal(f.player.snapshot().decoded,0);assert.equal(f.player.snapshot().bufferTotal,0);
  assert.equal(f.decodes.length,0,'A complete compressed download does not create ImageBitmaps');
  f.player.deactivate();f.player.prefetch();await new Promise(resolve=>setImmediate(resolve));
  assert.equal(f.decodes.length,0,'A Home/reset deactivation cannot accidentally enable decoding before preparation');
  await f.player.prepare();await until(()=>f.player.snapshot().buffered===61);
  assert.equal(f.requests.length,120,'Preparation reuses every already downloaded blob');
  assert.equal(f.player.snapshot().decoded,61);assert.equal(f.player.snapshot().state,'idle');
  assert.ok(f.decodes.every(value=>value.width===960));
  await f.player.activate();await until(()=>f.player.snapshot().decoded===62);
  assert.equal(f.player.snapshot().frame,45);assert.equal(f.player.snapshot().checkpoint,3);
  f.player.go(1);await until(()=>f.player.snapshot().state==='settling');f.tick(750);
  assert.equal(f.player.snapshot().position,52.5,'The existing smooth 1.5-second checkpoint easing is unchanged');
  f.tick(750);await until(()=>f.player.snapshot().state==='checkpoint');await until(()=>f.player.snapshot().buffered===61);
  assert.equal(f.player.snapshot().frame,60);assert.equal(f.requests.length,120);
 }finally{f.player.destroy();}
});

test('phone prefetch retains the same complete download and its existing smaller decoded window',async()=>{
 const f=fixture({decodeWidth:640,inspectionWidth:1920,bufferCheckpoints:1});
 try{
  f.player.prefetch();await until(()=>f.player.snapshot().downloaded===120);assert.equal(f.decodes.length,0);
  await f.player.activate();await until(()=>f.player.snapshot().decoded===32);
  assert.equal(f.player.snapshot().buffered,31);assert.equal(f.requests.length,120);
  assert.equal(f.decodes.filter(value=>value.width===640).length,31);
  assert.equal(f.decodes.filter(value=>value.width===1920).length,1);
 }finally{f.player.destroy();}
});

test('prefetch failures retain recoverable diagnostics and retry downloads only the failed frame',async()=>{
 const f=fixture({failOnce:86});
 try{
  f.player.prefetch();await until(()=>f.requests.length===120);await new Promise(resolve=>setImmediate(resolve));
  assert.equal(f.player.snapshot().downloaded,119);assert.equal(f.decodes.length,0);
  await assert.rejects(f.player.prepare(),/Could not prepare orbit frame 86/);assert.equal(f.player.snapshot().state,'error');
  await f.player.retry();await until(()=>f.player.snapshot().buffered===61);
  assert.equal(f.player.snapshot().downloaded,120);assert.equal(f.requests.length,121);
  assert.equal(f.requests.filter(index=>index===86).length,2);assert.equal(f.player.snapshot().state,'idle');
 }finally{f.player.destroy();}
});

test('orbit diagnostics change only with their values and cache lists change only with membership',async()=>{
 const f=fixture({inspectionWidth:960});
 try{
  await f.player.activate();await until(()=>f.player.snapshot().buffered===61);
  const before=f.mutations.length;f.player.redraw();f.player.redraw();f.player.prefetch();
  assert.equal(f.mutations.length,before,'Unchanged paint/resource calls do not schedule duplicate attribute mutations');
  f.player.go(1);await until(()=>f.player.snapshot().state==='settling');
  await until(()=>f.player.snapshot().buffered===61);
  const membershipBefore=f.mutations.filter(([key])=>key==='orbitResidentFrames'||key==='orbitRequiredFrames').length;
  const frameBefore=Number(f.root.dataset.orbitPosition);
  f.tick(300);f.tick(300);f.tick(300);
  assert.ok(Number(f.root.dataset.orbitPosition)>frameBefore,'The animation still publishes its changing position');
  assert.equal(f.mutations.filter(([key])=>key==='orbitResidentFrames'||key==='orbitRequiredFrames').length,membershipBefore,
   'Unchanged sorted membership lists are not rebuilt into repeated diagnostic mutations per animation frame');
  const current=new Map();
  for(const [key,value] of f.mutations){assert.notEqual(current.get(key),value,'Repeated value for '+key);current.set(key,value);}
 }finally{f.player.destroy();}
});


test('returning to the opening releases every decoded orbit bitmap while preserving the complete compressed download',async()=>{
 const f=fixture();
 try{
  await f.player.activate();await until(()=>f.player.snapshot().decoded===62);
  const decodesBefore=f.decodes.length;
  f.player.deactivate(true);
  assert.equal(f.player.snapshot().state,'idle');assert.equal(f.player.snapshot().decoded,0);
  assert.equal(f.player.snapshot().bufferTotal,0);assert.equal(f.player.snapshot().requiredTotal,0);
  assert.equal(f.player.snapshot().downloaded,120);assert.equal(f.requests.length,120);
  assert.equal(f.closed.length,62,'The inspection image and every cached motion bitmap close');
  f.player.prefetch();f.player.redraw();await new Promise(resolve=>setImmediate(resolve));
  assert.equal(f.decodes.length,decodesBefore,'Idle prefetch/redraw cannot restore the invisible decoded window');
  await f.player.prepare();await until(()=>f.player.snapshot().buffered===61);
  assert.equal(f.player.snapshot().state,'idle');assert.equal(f.player.snapshot().decoded,61);
  assert.equal(f.requests.length,120,'Re-entering prepares existing blobs without downloading the orbit again');
  f.player.deactivate();
  assert.equal(f.player.snapshot().buffered,61,'Default deactivation retains the original restoration behavior');
 }finally{f.player.destroy();}
});

test('release cancels a pending activation and stale native decodes cannot populate a new preparation',async()=>{
 const f=fixture({gateDecodes:true});
 try{
  f.player.prefetch();await until(()=>f.player.snapshot().downloaded===120);
  const oldActivation=f.player.activate();await until(()=>f.decodes.length===2);
  f.player.deactivate(true);await oldActivation;
  assert.equal(f.player.snapshot().state,'idle');assert.equal(f.player.snapshot().decoded,0);
  const nextPreparation=f.player.prepare();
  assert.equal(f.decodes.length,2,'Uncancellable native decodes retain both permits until they settle');
  f.releaseDecodes();await nextPreparation;await until(()=>f.player.snapshot().buffered===61);
  assert.equal(f.closed.length,2,'Both old-generation results close instead of entering the new cache');
  assert.equal(f.decodes.length,63,'The new generation decodes its own complete bounded window');
  assert.equal(f.player.snapshot().state,'idle');assert.equal(f.player.snapshot().decoded,61);
  assert.equal(f.requests.length,120,'Cancellation preserves successful compressed bytes');
 }finally{f.releaseDecodes();f.player.destroy();}
});
