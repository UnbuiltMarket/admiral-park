import assert from 'node:assert/strict';
import {readFile,mkdir,writeFile} from 'node:fs/promises';
import path from 'node:path';
import {createRequire} from 'node:module';
import {fileURLToPath,pathToFileURL} from 'node:url';

const root=process.env.HOMEPAGE_TEST_ROOT?pathToFileURL(path.resolve(process.env.HOMEPAGE_TEST_ROOT)+path.sep):new URL('../',import.meta.url);
const {ts,requireDev}=await import(new URL('scripts/tooling.mjs',root));

const require=createRequire(import.meta.url);
const {chromium}=require(process.env.PLAYWRIGHT_MODULE_PATH||'playwright');
const out=new URL('tmp/homepage-trial-check/',root);
await mkdir(out,{recursive:true});
const publicMode=process.env.HOMEPAGE_PUBLIC==='1';
const source=await readFile(new URL('src/framer/AdmiralHomepageTrial.tsx',root),'utf8');
const code=ts.transpileModule(source,{compilerOptions:{target:ts.ScriptTarget.ES2020,module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.React}}).outputText;
const react=await readFile(path.join(path.dirname(requireDev.resolve('react/package.json')),'umd/react.development.js'),'utf8');
const dom=await readFile(path.join(path.dirname(requireDev.resolve('react-dom/package.json')),'umd/react-dom.development.js'),'utf8');
const heroes=await Promise.all(Array.from({length:65},(_,i)=>readFile(new URL('assets/images/AVIF 30_1920x1010 DESKTOP HERO SEQUENCE/'+encodeURIComponent(`raw sequence${String(i).padStart(2,'0')}.avif`),root))));
const orbits=await Promise.all(Array.from({length:120},(_,i)=>readFile(new URL('assets/ORBIT PICKER/BEAUTY sequence_Desktop/'+encodeURIComponent(`adjusted sequence${String(i).padStart(4,'0')} copy.avif`),root))));
const browser=await chromium.launch({headless:true,channel:process.env.PLAYWRIGHT_CHANNEL||'chrome'}),results=[];
const pause=ms=>new Promise(resolve=>setTimeout(resolve,ms));

async function fixture(options={}){
 const context=await browser.newContext({viewport:{width:1200,height:800},...options.context});
 const page=await context.newPage(),errors=[],heroRequests=[],orbitRequests=[];
 let failIndex=options.failOrbit,corruptIndex=options.corruptOrbit;
 page.on('pageerror',error=>errors.push(error.message));
 await page.route('http://homepage.test/**',async route=>{
  const url=new URL(route.request().url()),pathname=decodeURIComponent(url.pathname);
  if(pathname.startsWith('/hero/')){
   const index=Number(pathname.match(/sequence(\d+)/)?.[1]);heroRequests.push(index);
   return route.fulfill({contentType:'image/avif',headers:{'Cache-Control':'public,max-age=3600'},body:heroes[index]});
  }
  if(pathname.startsWith('/orbit/')){
   const index=Number(pathname.match(/adjusted sequence(\d{4})/)?.[1]);orbitRequests.push(index);
   if(options.delayOrbit)await pause(options.delayOrbit);
   if(index===failIndex)return route.fulfill({status:503,body:'Deliberate trial orbit outage'});
   if(index===corruptIndex)return route.fulfill({contentType:'image/avif',body:'Deliberately invalid encoded orbit frame'});
   if(options.solidFrames)return route.fulfill({contentType:'image/svg+xml',body:`<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1010"><rect width="1920" height="1010" fill="${index%2?'blue':'red'}"/></svg>`});
   return route.fulfill({contentType:'image/avif',headers:{'Cache-Control':'public,max-age=3600'},body:orbits[index]});
  }
  return route.fulfill({contentType:'text/html',body:'<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><style>html,body{margin:0;font:18px Arial;background:#0e1720}#stage{height:100svh;position:relative;overflow:hidden}.copy{position:absolute;left:6%;top:20%;max-width:650px;color:white;z-index:4}.cta{position:absolute;left:6%;top:65%;z-index:4}.cta a{display:inline-block;padding:18px;background:white;color:black}#navbar{position:fixed;z-index:50;top:8px;left:12px;display:flex;gap:12px}#nested{position:absolute;right:0;top:100px;width:110px;height:100px;overflow:auto;z-index:40;background:white}#native-input{position:absolute;right:5px;top:220px;z-index:40;width:95px}#external-framer-overlay{position:absolute;inset:0;z-index:20;pointer-events:auto}#external-framer-overlay>div{width:100%;height:100%}</style></head><body'+(options.externalOverlay?' style="height:300vh"':'')+'><nav id="navbar"><a id="nav-link" href="#apartments">Apartments</a><button id="nav-button">Contact</button></nav><div id="mount"></div></body></html>'});
 });
 await page.goto('http://homepage.test/');await page.addScriptTag({content:react});await page.addScriptTag({content:dom});
 await page.evaluate(({code,props,staticMode,publicMode,twoInstances,externalOverlay,gateDecodeIndices,gateFirstNativeDecodes,accelerateDecodeWatchdog})=>{
  window.bitmapCreated=0;window.bitmapClosed=0;window.bitmapRecords=[];window.orbitLive=0;window.orbitLiveMax=0;
  window.nativeBitmapCalls=0;window.nativeBitmapActive=0;window.nativeBitmapPeak=0;
  const nativeTimers=window.setTimeout.bind(window);window.acceleratedWatchdog=accelerateDecodeWatchdog;
  if(accelerateDecodeWatchdog)window.setTimeout=(callback,delay,...args)=>nativeTimers(callback,window.acceleratedWatchdog&&delay===15000?100:delay,...args);
  const orbitBlobs=new WeakMap(),nativeFetch=window.fetch.bind(window);
  window.fetch=async(...args)=>{const response=await nativeFetch(...args),match=decodeURIComponent(String(args[0])).match(/adjusted sequence(\d{4})/);if(match){const readBlob=response.blob.bind(response);response.blob=async()=>{const blob=await readBlob();orbitBlobs.set(blob,Number(match[1]));return blob;};}return response;};
  const gates=new Set(gateDecodeIndices),waiting=[];window.decodeGateOpen=!gates.size;
  window.releaseDecodeGates=()=>{window.decodeGateOpen=true;waiting.splice(0).forEach(resolve=>resolve());};
  const nativeWaiting=[];window.nativeDecodeGateOpen=!gateFirstNativeDecodes;
  window.releaseNativeDecodeGates=()=>{window.nativeDecodeGateOpen=true;nativeWaiting.splice(0).forEach(resolve=>resolve());};
  const nativeCreateImageBitmap=window.createImageBitmap.bind(window);
  window.createImageBitmap=async(...args)=>{
   const call=++window.nativeBitmapCalls;window.nativeBitmapActive++;window.nativeBitmapPeak=Math.max(window.nativeBitmapPeak,window.nativeBitmapActive);
   const record={index:orbitBlobs.get(args[0]),width:args[1]?.resizeWidth,started:performance.now(),created:false,returned:false,closed:false};window.bitmapRecords.push(record);
   try{
    if(call<=gateFirstNativeDecodes&&!window.nativeDecodeGateOpen)await new Promise(resolve=>nativeWaiting.push(resolve));
    const bitmap=await nativeCreateImageBitmap(...args);window.bitmapCreated++;record.created=true;record.nativeReadyAt=performance.now();
    if(Number.isFinite(record.index)){window.orbitLive++;window.orbitLiveMax=Math.max(window.orbitLiveMax,window.orbitLive);}
    const close=bitmap.close.bind(bitmap);bitmap.close=()=>{if(!record.closed){record.closed=true;record.closedAt=performance.now();window.bitmapClosed++;if(Number.isFinite(record.index))window.orbitLive--;}close();};
    if(gates.has(record.index)&&!window.decodeGateOpen)await new Promise(resolve=>waiting.push(resolve));record.returned=true;record.returnedAt=performance.now();return bitmap;
   }finally{window.nativeBitmapActive--;}
  };
  document.querySelector('#nav-button').addEventListener('click',()=>window.navClicked=(window.navClicked||0)+1);
  const module={exports:{}};
  const stub={useIsStaticRenderer:()=>staticMode,RenderTarget:{canvas:'canvas',current:()=>staticMode?'canvas':'preview'},addPropertyControls:()=>{},ControlType:new Proxy({},{get:(_,name)=>name})};
  new Function('module','exports','require',code)(module,module.exports,name=>name==='react'?React:stub);
  const Frame=React.forwardRef((props,ref)=>React.createElement('div',{...props,ref}));
  const Intro=module.exports.OpeningContent(Frame),Building=module.exports.BuildingContent(Frame),CTA=module.exports.ArrivalCTA(Frame);
  window.component=module.exports.default;
  window.props={useGitHubAssets:publicMode,heroBaseUrl:'http://homepage.test/hero',orbitBaseUrl:'http://homepage.test/orbit',snapDuration:.3,...props};
  window.root=ReactDOM.createRoot(document.querySelector('#mount'));
  window.renderTrial=()=>window.root.render(React.createElement(React.StrictMode,null,React.createElement('section',{id:'stage'},
   React.createElement(window.component,window.props),
   React.createElement(Intro,{id:'intro',className:'copy'},'LOCATION'),
   React.createElement(Building,{id:'building',className:'copy'},'BUILDING'),
   React.createElement(CTA,{id:'cta',className:'cta'},React.createElement('a',{href:'#apartments',onClick:()=>window.ctaClicked=true},'Apartment details')),
   externalOverlay?React.createElement('div',{id:'external-framer-overlay','data-external-framer-wrapper':''},React.createElement('div',{'data-external-framer-surface':''})):null,
   React.createElement('div',{id:'nested'},React.createElement('div',{style:{height:500}},'Native scroll panel')),
   React.createElement('input',{id:'native-input',defaultValue:'Apartment'})),
   twoInstances?React.createElement('section',{id:'secondary',style:{display:'none',position:'relative',height:'100svh'}},React.createElement(window.component,window.props)):null));
  window.renderTrial();window.samples=[];
  window.sampleTimer=setInterval(()=>{const root=document.querySelector('[data-admiral-homepage]'),orbit=document.querySelector('[data-admiral-orbit]')||root,hero=document.querySelector('[data-admiral-sequence]');if(root)window.samples.push({time:performance.now(),stage:root.dataset.homepageStage,state:orbit?.dataset.orbitState,position:Number(orbit?.dataset.orbitPosition),frame:Number(orbit?.dataset.orbitFrame),checkpoint:Number(orbit?.dataset.orbitCheckpoint),decoded:Number(orbit?.dataset.orbitDecoded),buffered:Number(orbit?.dataset.orbitBuffered),bufferTotal:Number(orbit?.dataset.orbitBufferTotal),requiredReady:Number(orbit?.dataset.orbitRequiredReady),requiredTotal:Number(orbit?.dataset.orbitRequiredTotal),decoding:Number(orbit?.dataset.orbitDecoding),ready:orbit?.dataset.orbitReady,target:Number(orbit?.dataset.orbitTarget),mix:Number(orbit?.dataset.orbitFrameMix),heroFrame:Number(hero?.dataset.frame)});},16);
 },{code,props:options.props||{},staticMode:!!options.staticMode,publicMode,twoInstances:!!options.twoInstances,externalOverlay:!!options.externalOverlay,gateDecodeIndices:options.gateDecodeIndices||[],gateFirstNativeDecodes:options.gateFirstNativeDecodes||0,accelerateDecodeWatchdog:!!options.accelerateDecodeWatchdog});
 await page.waitForSelector('[data-admiral-homepage]');
 await page.waitForFunction(()=>[...document.images].some(image=>image.naturalWidth>0));
 await page.mouse.move(450,500);
 return {context,page,errors,heroRequests,orbitRequests,restoreOrbit(){failIndex=undefined;corruptIndex=undefined;},async close(){await page.evaluate(()=>{window.releaseDecodeGates?.();window.releaseNativeDecodeGates?.();}).catch(()=>{});assert.deepEqual(errors,[]);await context.close();}};
}
const orbitSelector='[data-admiral-orbit]';
async function orbitData(page){return page.locator(orbitSelector).evaluate(element=>({...element.dataset}));}
async function waitOrbit(page,state='checkpoint',timeout=30000){await page.waitForFunction(state=>{const root=document.querySelector('[data-admiral-homepage]'),orbit=document.querySelector('[data-admiral-orbit]');return root?.dataset.homepageStage==='orbit'&&orbit?.dataset.orbitState===state;},state,{timeout});if(state==='checkpoint')await page.waitForTimeout(220);}
async function waitStage(page,stage,timeout=20000){await page.waitForFunction(stage=>document.querySelector('[data-admiral-homepage]')?.dataset.homepageStage===stage,stage,{timeout});}
async function pass(name,fn){if(process.env.HOMEPAGE_TEST_FILTER&&!name.includes(process.env.HOMEPAGE_TEST_FILTER))return;const started=Date.now();await fn();results.push({name,ms:Date.now()-started});console.log('PASS '+name);}

async function waitFrame(page,frame,timeout=12000){
 await page.waitForFunction(frame=>{const orbit=document.querySelector('[data-admiral-orbit]');return orbit?.dataset.orbitState==='checkpoint'&&Number(orbit.dataset.orbitFrame)===frame;},frame,{timeout});
}
async function waitBuffer(page,count,selector=orbitSelector){await page.waitForFunction(({count,selector})=>{const root=document.querySelector(selector);return Number(root?.dataset.orbitBuffered)===count&&Number(root?.dataset.orbitDecoding)===0;},{count,selector},{timeout:30000});}
async function freshWheel(page,delta){await page.waitForTimeout(220);await page.mouse.move(450,500);await page.mouse.wheel(0,delta);}
async function coveredClick(page,name){const box=await page.getByRole('button',{name,exact:true}).boundingBox();assert.ok(box,name);await page.mouse.click(box.x+box.width/2,box.y+box.height/2);}

try{
 await pass('one small scroll plays a complete long transition with symmetric easing and no speed boost',async()=>{
  const f=await fixture({props:{startView:'orbit',snapDuration:1.5}}),{page}=f;await waitOrbit(page);
  await page.evaluate(()=>{window.samples=[];window.motionStarted=performance.now();});
  await page.mouse.wheel(0,1);await page.waitForTimeout(180);
  assert.ok(['moving','settling'].includes((await orbitData(page)).orbitState),'Even a small scroll starts a whole transition');
  assert.equal(await page.getByRole('button',{name:'Next view',exact:true}).isDisabled(),true,'Checkpoint controls lock during travel');
  // Large opposite input and repeated keys must not alter either the destination or duration.
  for(let index=0;index<7;index++){await page.mouse.wheel(0,index%2?1200:-1200);await page.keyboard.press('ArrowLeft');await page.waitForTimeout(40);}
  await waitFrame(page,15);await page.waitForTimeout(30);
  const trace=await page.evaluate(()=>({started:window.motionStarted,samples:window.samples}));
  const finished=trace.samples.find(sample=>sample.state==='checkpoint'&&sample.position===15);
  assert.ok(finished,'Arrival was sampled');const elapsed=finished.time-trace.started;
  assert.ok(elapsed>=1400&&elapsed<=1750,`Settle time remains 1.5 seconds (${elapsed}ms)`);
  const closest=fraction=>trace.samples.filter(sample=>sample.stage==='orbit').reduce((best,sample)=>Math.abs(sample.time-(trace.started+1500*fraction))<Math.abs(best.time-(trace.started+1500*fraction))?sample:best).position/15;
  const quarter=closest(.25),middle=closest(.5),third=closest(.75);
  assert.ok(quarter>0&&quarter<.23,`Ease-in at quarter time: ${quarter}`);
  assert.ok(Math.abs(middle-.5)<.1,`Midpoint remains centered: ${middle}`);
  assert.ok(third>.77&&third<1,`Ease-out at three-quarter time: ${third}`);
  assert.ok(Math.abs(quarter+third-1)<.12,'First and last halves use symmetric easing');
  assert.ok(trace.samples.every(sample=>!Number.isFinite(sample.position)||sample.position>=0&&sample.position<=15),'Busy input cannot reverse or overshoot the transition');
  await page.waitForTimeout(400);assert.equal(Number((await orbitData(page)).orbitPosition),15,'Ignored input leaves no queued transition');
  await writeFile(new URL('checkpoint-easing.json',out),JSON.stringify(trace,null,2));await f.close();
 });
 await pass('wheel momentum through arrival triggers one checkpoint and a fresh reverse gesture triggers one more',async()=>{
  const f=await fixture({props:{startView:'orbit',snapDuration:.3}}),{page}=f;await waitOrbit(page);
  for(let index=0;index<16;index++){await page.mouse.wheel(0,index%3===0?-500:500);await page.waitForTimeout(40);}
  await page.waitForTimeout(120);
  assert.equal(Number((await orbitData(page)).orbitPosition),-15,'One continuous wheel gesture cannot chain after arrival');
  await page.waitForTimeout(300);assert.equal(Number((await orbitData(page)).orbitPosition),-15,'No command remains queued');
  await freshWheel(page,1);await waitFrame(page,0);assert.equal(Number((await orbitData(page)).orbitPosition),0);
  await freshWheel(page,-1);await waitFrame(page,105);assert.equal(Number((await orbitData(page)).orbitPosition),-15,'Reverse crosses the 0/119 seam without losing a frame');
  await f.close();
 });
 await pass('drag direction triggers one step and holding the same drag through arrival cannot chain',async()=>{
  const f=await fixture({props:{startView:'orbit'}}),{page}=f;await waitOrbit(page);
  await page.mouse.move(650,500);await page.mouse.down();await page.mouse.move(560,500,{steps:4});
  await waitFrame(page,15);await page.mouse.move(-100,500,{steps:10});await page.waitForTimeout(350);
  assert.equal(Number((await orbitData(page)).orbitPosition),15,'Held drag keeps its original one-step destination');
  await page.mouse.up();await page.mouse.move(400,500);await page.mouse.down();await page.mouse.move(480,500,{steps:4});await page.mouse.up();
  await waitFrame(page,0);assert.equal(Number((await orbitData(page)).orbitPosition),0,'A new opposite drag can reverse after arrival');await f.close();
 });
 await pass('frame blending interpolates real canvas pixels while zero blending keeps crisp frame cuts',async()=>{
  for(const amount of [0,100]){
   const f=await fixture({solidFrames:true,props:{startView:'orbit',snapDuration:2,frameBlend:amount,inspectionWidth:960}}),{page}=f;await waitOrbit(page);
   await page.mouse.wheel(0,amount===100?-1:1);
   const pixels=[];
   for(let index=0;index<45;index++){
    pixels.push(await page.locator('[data-admiral-orbit]').evaluate(root=>{const canvas=[...root.querySelectorAll('canvas')].find(canvas=>!canvas.closest('[data-admiral-sequence]'));return {position:Number(root.dataset.orbitPosition),from:Number(root.dataset.orbitFrameFrom),to:Number(root.dataset.orbitFrameTo),rgba:[...canvas.getContext('2d').getImageData(5,5,1,1).data]};}));
    await page.waitForTimeout(20);
   }
   const useful=pixels.filter(sample=>{const fraction=sample.position-Math.floor(sample.position);return fraction>.2&&fraction<.8;});
   assert.ok(useful.length>=3,'Sampled fractional movement positions');
   if(amount===0)assert.ok(useful.every(sample=>sample.rgba[1]===0&&sample.rgba[3]===255&&((sample.rgba[0]===255&&sample.rgba[2]===0)||(sample.rgba[0]===0&&sample.rgba[2]===255))),'Zero blend draws one opaque source frame');
   else{
    assert.ok(useful.some(sample=>sample.rgba[0]>20&&sample.rgba[2]>20),'Frame blend draws both neighboring image colours');
    assert.ok(useful.some(sample=>sample.from===119&&sample.to===0),'The wraparound blend has both frame119 and frame0 prepared');
    for(const sample of useful){const fraction=sample.position-Math.floor(sample.position),red=Math.floor(sample.position)%2?255*fraction:255*(1-fraction);assert.ok(Math.abs(sample.rgba[0]-red)<4&&sample.rgba[1]===0&&sample.rgba[3]===255,`Pixel blend tracks fractional frame position (${sample.position}: ${sample.rgba})`);}
   }
   await waitFrame(page,amount===100?105:15);await f.close();
  }
 });
 await pass('external Framer wrapper accepts one-step wheel drag and body keys without page scrolling',async()=>{
  const f=await fixture({externalOverlay:true,props:{startView:'orbit'}}),{page}=f;await waitOrbit(page);
  assert.ok(await page.evaluate(()=>document.body.scrollHeight>innerHeight*2),'Fixture has real page overflow');
  assert.equal(await page.evaluate(()=>document.elementFromPoint(450,500)?.hasAttribute('data-external-framer-surface')),true,'A transparent Framer sibling receives pointer input');
  await page.mouse.wheel(0,1);await waitFrame(page,15);assert.equal(await page.evaluate(()=>scrollY),0);
  await freshWheel(page,-1);await waitFrame(page,0);assert.equal(await page.evaluate(()=>scrollY),0);
  await page.mouse.move(700,500);await page.mouse.down();await page.mouse.move(-80,500,{steps:12});await page.mouse.up();await waitFrame(page,15);
  await page.mouse.move(450,500);await page.evaluate(()=>{document.activeElement?.blur();document.body.tabIndex=-1;document.body.focus();});
  await page.keyboard.press('ArrowDown');await waitFrame(page,30);assert.equal(await page.evaluate(()=>scrollY),0,'Body keys cannot scroll past the viewer');
  await coveredClick(page,'Next view');await waitFrame(page,45);
  await page.getByRole('button',{name:'Contact',exact:true}).click();assert.equal(await page.evaluate(()=>window.navClicked),1);
  await coveredClick(page,'Overview');await waitStage(page,'opening');await coveredClick(page,'Skip approach');await waitStage(page,'building');await coveredClick(page,'Explore building');await waitOrbit(page);
  await page.evaluate(()=>{clearInterval(window.sampleTimer);window.root.unmount();});await page.mouse.move(450,500);await page.mouse.wheel(0,450);await page.waitForTimeout(120);
  assert.ok(await page.evaluate(()=>scrollY)>100,'Unmount restores normal scrolling');await f.close();
 });
 await pass('external Framer wrapper accepts one-step phone swipes holds the page and preserves pinch',async()=>{
  const f=await fixture({externalOverlay:true,props:{startView:'orbit'},context:{viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:3}}),{page}=f;await waitOrbit(page);
  const cdp=await page.context().newCDPSession(page);
  await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:330,y:450}]});
  for(const x of [325,320,305,270])await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x,y:450}]});await waitFrame(page,15);
  await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:90,y:450}]});await page.waitForTimeout(350);
  assert.equal(Number((await orbitData(page)).orbitPosition),15,'Holding one touch through arrival cannot start a second movement');
  await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
  await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:180,y:650}]});
  for(const y of [645,640,625,590,530,440,350])await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:180,y}]});
  await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await waitFrame(page,30);assert.equal(await page.evaluate(()=>scrollY),0);
  const button=await page.getByRole('button',{name:'Next view',exact:true}).boundingBox();await page.touchscreen.tap(button.x+button.width/2,button.y+button.height/2);await waitFrame(page,45);
  const pinch=await page.evaluate(()=>{const target=document.querySelector('[data-external-framer-surface]'),touches=[new Touch({identifier:10,target,clientX:130,clientY:400}),new Touch({identifier:11,target,clientX:250,clientY:400})];const start=new TouchEvent('touchstart',{touches,targetTouches:touches,changedTouches:touches,bubbles:true,cancelable:true});target.dispatchEvent(start);const move=new TouchEvent('touchmove',{touches,targetTouches:touches,changedTouches:touches,bubbles:true,cancelable:true});target.dispatchEvent(move);target.dispatchEvent(new TouchEvent('touchend',{touches:[],targetTouches:[],changedTouches:touches,bubbles:true,cancelable:true}));return {start:start.defaultPrevented,move:move.defaultPrevented};});
  assert.deepEqual(pinch,{start:false,move:false});await page.getByRole('button',{name:'Contact',exact:true}).tap();assert.equal(await page.evaluate(()=>window.navClicked),1);await f.close();
 });
 await pass('Space PageDown PageUp and held keyboard repeats navigate once without scrolling the page',async()=>{
  const f=await fixture({externalOverlay:true,props:{startView:'orbit'}}),{page}=f;await waitOrbit(page);
  await page.evaluate(()=>{document.body.tabIndex=-1;document.body.focus();});
  for(const [key,frame] of [['Space',15],['PageDown',30],['PageUp',15],['Shift+Space',0]]){
   await page.keyboard.press(key);await waitFrame(page,frame);assert.equal(await page.evaluate(()=>scrollY),0,`${key} stays inside the viewer`);
  }
  await page.keyboard.down('Space');
  for(let index=0;index<16;index++){await page.keyboard.down('Space');await page.waitForTimeout(40);}
  assert.equal(Number((await orbitData(page)).orbitPosition),15,'Holding a key beyond arrival cannot chain a second transition');
  assert.equal(await page.evaluate(()=>scrollY),0,'Repeated Space cannot cause native page scrolling');
  await page.keyboard.up('Space');await page.waitForTimeout(220);await page.keyboard.press('Space');await waitFrame(page,30);await f.close();
 });
 await pass('accepted phone movement prevents page pan before the navigation threshold',async()=>{
  const f=await fixture({externalOverlay:true,props:{startView:'orbit'},context:{viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:2}}),{page}=f;await waitOrbit(page);
  const moves=await page.evaluate(()=>{
   const target=document.querySelector('[data-external-framer-surface]'),touch=y=>new Touch({identifier:30,target,clientX:180,clientY:y});
   const first=touch(650);target.dispatchEvent(new TouchEvent('touchstart',{touches:[first],targetTouches:[first],changedTouches:[first],bubbles:true,cancelable:true}));
   const results=[];
   for(const y of [645,640]){const current=touch(y),event=new TouchEvent('touchmove',{touches:[current],targetTouches:[current],changedTouches:[current],bubbles:true,cancelable:true});target.dispatchEvent(event);results.push({prevented:event.defaultPrevented,position:Number(document.querySelector('[data-admiral-orbit]').dataset.orbitPosition)});}
   const last=touch(640);target.dispatchEvent(new TouchEvent('touchend',{touches:[],targetTouches:[],changedTouches:[last],bubbles:true,cancelable:true}));return results;
  });
  assert.ok(moves.every(move=>move.prevented),'The first 5px and 10px of an accepted swipe cannot start native page pan');
  assert.ok(moves.every(move=>move.position===0),'Small movement still respects the navigation threshold');assert.equal(await page.evaluate(()=>scrollY),0);await f.close();
 });
 await pass('complete orbit downloads all frames but retains a bounded desktop window and one sharp view',async()=>{
  const f=await fixture({props:{startView:'orbit'}}),{page}=f;await waitOrbit(page);await waitBuffer(page,61);await page.waitForFunction(()=>Number(document.querySelector('[data-admiral-orbit]').dataset.orbitDecoded)===62);
  const data=await orbitData(page);assert.equal(Number(data.orbitDownloaded),120);assert.equal(Number(data.orbitReady),120);assert.equal(Number(data.orbitDecoded),62);
  assert.equal(Number(data.orbitMotionWidth),960);assert.equal(Number(data.orbitFrame),0);assert.equal(Number(data.orbitCheckpoint),0);assert.equal(new Set(f.orbitRequests).size,120);
  await page.mouse.wheel(0,1);await page.waitForTimeout(70);assert.ok(Number((await orbitData(page)).orbitDecoded)<=61,'Inspection bitmap is released during movement');await waitFrame(page,15);await waitBuffer(page,61);await page.waitForFunction(()=>Number(document.querySelector('[data-admiral-orbit]').dataset.orbitDecoded)===62);
  await page.screenshot({path:fileURLToPath(new URL('orbit-desktop.png',out))});await f.close();
 });
 await pass('bounded cache prioritizes nearby frames and closes evictions across a complete lap and reverse',async()=>{
  const f=await fixture({props:{startView:'orbit',snapDuration:.2}}),{page}=f;await waitOrbit(page);await waitBuffer(page,61);
  const baselineRequests=[...f.orbitRequests],initial=await page.evaluate(()=>({closed:window.bitmapRecords.filter(record=>Number.isFinite(record.index)&&record.closed).length,first:window.bitmapRecords.filter(record=>Number.isFinite(record.index)&&record.width===960).slice(0,12).map(record=>record.index)}));
  assert.ok(initial.first.every(index=>Math.min(index,120-index)<=15),'The first decoded frames are nearest the opening checkpoint');
  for(let checkpoint=1;checkpoint<=8;checkpoint++){
   await page.getByRole('button',{name:'Next view',exact:true}).click();await waitFrame(page,(checkpoint*15)%120);await waitBuffer(page,61);
   assert.ok(Number((await orbitData(page)).orbitDecoded)<=62,'A full revolution keeps the same resident budget');
  }
  await freshWheel(page,-1);await waitFrame(page,105);await waitBuffer(page,61);
  const final=await page.evaluate(()=>({closed:window.bitmapRecords.filter(record=>Number.isFinite(record.index)&&record.closed).length,peak:window.orbitLiveMax,live:window.orbitLive}));
  assert.ok(final.closed-initial.closed>=120,'Moving the window closes old bitmaps instead of retaining previous turns');
  assert.ok(final.peak<=64,`At most61 resident motion +one sharp +two completing decodes (${final.peak})`);assert.ok(final.live<=62);
  assert.deepEqual(f.orbitRequests,baselineRequests,'Cached encoded images are reused for the whole lap and reverse');await f.close();
 });
 await pass('buffering a missing arc keeps the sharp checkpoint and a pending pause survives decode completion',async()=>{
  const f=await fixture({gateDecodeIndices:[35],props:{startView:'orbit',snapDuration:1.2}}),{page}=f;await waitOrbit(page);await waitBuffer(page,61);
  const before=await page.locator(orbitSelector).evaluate(root=>{const canvas=[...root.querySelectorAll('canvas')].find(canvas=>!canvas.closest('[data-admiral-sequence]'));return [...canvas.getContext('2d').getImageData(10,10,1,1).data];});
  await page.getByRole('button',{name:'View 4',exact:true}).click();
  await page.waitForFunction(()=>document.querySelector('[data-admiral-orbit]')?.dataset.orbitState==='buffering'&&window.bitmapRecords.some(record=>record.index===35&&record.created&&!record.returned));
  await page.mouse.wheel(0,-1);await page.waitForTimeout(300);
  const pending=await orbitData(page);assert.equal(Number(pending.orbitPosition),0);assert.equal(Number(pending.orbitTarget),45);assert.ok(Number(pending.orbitRequiredReady)<Number(pending.orbitRequiredTotal));
  assert.equal(await page.getByRole('button',{name:'Next view',exact:true}).isDisabled(),true);
  const still=await page.locator(orbitSelector).evaluate(root=>{const canvas=[...root.querySelectorAll('canvas')].find(canvas=>!canvas.closest('[data-admiral-sequence]'));return [...canvas.getContext('2d').getImageData(10,10,1,1).data];});assert.deepEqual(still,before,'The original sharp image remains displayed throughout buffering');
  assert.ok(await page.evaluate(()=>window.bitmapRecords.some(record=>record.index===0&&record.width===1920&&record.created&&!record.closed)),'The inspection bitmap remains pinned while waiting');
  await page.getByRole('button',{name:'Contact',exact:true}).click();assert.equal(await page.evaluate(()=>window.navClicked),1);
  await page.getByRole('button',{name:'Pause rotation',exact:true}).click();await waitOrbit(page,'paused');await page.evaluate(()=>window.releaseDecodeGates());
  await page.waitForFunction(()=>Number(document.querySelector('[data-admiral-orbit]')?.dataset.orbitRequiredReady)===Number(document.querySelector('[data-admiral-orbit]')?.dataset.orbitRequiredTotal)&&Number(document.querySelector('[data-admiral-orbit]')?.dataset.orbitDecoding)===0);
  await page.waitForTimeout(250);assert.equal((await orbitData(page)).orbitState,'paused');assert.equal(Number((await orbitData(page)).orbitPosition),0,'Finishing a decode cannot resume a paused pending transition');
  const started=await page.evaluate(()=>{window.samples=[];return performance.now();});await page.getByRole('button',{name:'Continue rotation',exact:true}).click();await waitFrame(page,45);await page.waitForTimeout(30);
  const trace=await page.evaluate(()=>window.samples),finished=trace.find(sample=>sample.state==='checkpoint'&&sample.position===45);assert.ok(finished.time-started>=1100,'The full movement clock starts after buffering and explicit resume');
  assert.ok(trace.filter(sample=>['moving','settling'].includes(sample.state)).every(sample=>sample.requiredReady===sample.requiredTotal),'Every frame needed by the committed arc is ready before moving');
  await page.waitForTimeout(250);assert.equal(Number((await orbitData(page)).orbitPosition),45,'Input during buffering did not queue a reverse');await f.close();
 });
 await pass('phone cache stays small and a distant view temporarily pins one complete arc without a window union',async()=>{
  const f=await fixture({gateDecodeIndices:[35],props:{startView:'orbit',snapDuration:.6},context:{viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:2}}),{page}=f;await waitOrbit(page);await waitBuffer(page,31);
  const baselineRequests=[...f.orbitRequests];assert.ok(Number((await orbitData(page)).orbitDecoded)<=32);
  await page.getByRole('button',{name:'View 5',exact:true}).click();await page.waitForFunction(()=>document.querySelector('[data-admiral-orbit]')?.dataset.orbitState==='buffering'&&window.bitmapRecords.some(record=>record.index===35&&record.created&&!record.returned));
  await page.waitForTimeout(250);assert.equal(Number((await orbitData(page)).orbitPosition),0);assert.equal(Number((await orbitData(page)).orbitTarget),60);
  const released=await page.evaluate(()=>{window.samples=[];window.releaseDecodeGates();return performance.now();});await waitFrame(page,60);await page.waitForTimeout(30);
  const trace=await page.evaluate(()=>window.samples),finished=trace.find(sample=>sample.state==='checkpoint'&&sample.position===60);assert.ok(finished.time-released>=550,'Uncached arc loading does not consume the movement duration');
  assert.ok(trace.every(sample=>sample.buffered<=61&&sample.decoded<=62),'A distant jump pins its arc without retaining a second window');
  assert.ok(trace.filter(sample=>['moving','settling'].includes(sample.state)).every(sample=>sample.requiredReady===sample.requiredTotal));
  await waitBuffer(page,31);assert.ok(Number((await orbitData(page)).orbitDecoded)<=32);assert.ok(await page.evaluate(()=>window.orbitLiveMax)<=64,'Live bitmaps remain bounded even with two late decoders');
  await page.getByRole('button',{name:'Previous view',exact:true}).click();await waitFrame(page,45);await waitBuffer(page,31);assert.ok(Number((await orbitData(page)).orbitDecoded)<=32);
  assert.deepEqual(f.orbitRequests,baselineRequests,'Far navigation and reverse reuse downloaded blobs');await f.close();
 });
 await pass('a newly decoded corrupt arc can retry its failed source while retaining other downloaded frames',async()=>{
  const f=await fixture({corruptOrbit:35,props:{startView:'orbit'}}),{page}=f;await waitOrbit(page);await waitBuffer(page,61);
  await page.getByRole('button',{name:'View 4',exact:true}).click();await page.waitForFunction(()=>document.querySelector('[data-admiral-orbit]')?.dataset.orbitState==='error');
  assert.equal(Number((await orbitData(page)).orbitPosition),0,'A decode failure cannot strand the view mid-flight');assert.ok(Number((await orbitData(page)).orbitDownloaded)>=119,'Other encoded frames remain cached after a corrupt source fails');
  await page.getByRole('button',{name:'Contact',exact:true}).click();assert.equal(await page.evaluate(()=>window.navClicked),1);f.restoreOrbit();await page.getByRole('button',{name:'Retry orbit',exact:true}).click();await waitOrbit(page);
  const current=Number((await orbitData(page)).orbitFrame);assert.ok(current===0||current===45,'Retry recovers the parked checkpoint or original target');
  await page.getByRole('button',{name:'Next view',exact:true}).click();await waitFrame(page,(current+15)%120);
  assert.ok(f.orbitRequests.filter(index=>index===35).length>=2,'Retry fetches a fresh copy of the failed encoded source');await f.close();
 });
 await pass('late buffered decodes close after Overview and unmount without reviving an old transition',async()=>{
  for(const action of ['overview','unmount']){
   const f=await fixture({gateDecodeIndices:[35],props:{startView:'orbit'}}),{page}=f;await waitOrbit(page);await waitBuffer(page,61);await page.getByRole('button',{name:'View 4',exact:true}).click();
   await page.waitForFunction(()=>window.bitmapRecords.some(record=>record.index===35&&record.created&&!record.returned));
   if(action==='overview'){await page.getByRole('button',{name:'Overview',exact:true}).click();await waitStage(page,'opening');}
   else await page.evaluate(()=>{clearInterval(window.sampleTimer);window.root.unmount();});
   await page.evaluate(()=>window.releaseDecodeGates());await page.waitForFunction(()=>window.bitmapRecords.filter(record=>record.index===35&&record.created).every(record=>record.closed));
   await page.waitForTimeout(150);
   if(action==='overview')assert.equal(await page.locator('[data-admiral-homepage]').getAttribute('data-homepage-stage'),'opening');
   else await page.waitForFunction(()=>window.bitmapRecords.filter(record=>Number.isFinite(record.index)&&record.created).every(record=>record.closed));
   await page.getByRole('button',{name:'Contact',exact:true}).click();assert.equal(await page.evaluate(()=>window.navClicked),1);await f.close();
  }
 });
 await pass('native decode watchdog keeps its two permits until the unfinished operations settle',async()=>{
  const f=await fixture({gateFirstNativeDecodes:2,accelerateDecodeWatchdog:true,props:{startView:'orbit'}}),{page}=f;
  await page.waitForFunction(()=>document.querySelector('[data-admiral-orbit]')?.dataset.orbitState==='error');await page.waitForTimeout(250);
  const held=await page.evaluate(()=>({calls:window.nativeBitmapCalls,active:window.nativeBitmapActive,peak:window.nativeBitmapPeak,reported:Number(document.querySelector('[data-admiral-orbit]').dataset.orbitDecoding)}));
  assert.deepEqual(held,{calls:2,active:2,peak:2,reported:2},'An outer timeout cannot free capacity while both native promises remain unfinished');
  await page.getByRole('button',{name:'Contact',exact:true}).click();assert.equal(await page.evaluate(()=>window.navClicked),1);
  await page.evaluate(()=>{window.acceleratedWatchdog=false;window.releaseNativeDecodeGates();});
  await page.waitForFunction(()=>window.bitmapRecords.slice(0,2).every(record=>record.created&&record.closed));
  await page.getByRole('button',{name:'Retry orbit',exact:true}).click();await waitOrbit(page);await waitBuffer(page,61);
  await page.getByRole('button',{name:'Next view',exact:true}).click();await waitFrame(page,15);
  assert.ok(await page.evaluate(()=>window.nativeBitmapPeak)<=2,'Retry keeps the same physical decode limit');await f.close();
 });
 await pass('buffer controls wire nondefault desktop phone and irregular checkpoint windows correctly',async()=>{
  const cases=[
   {props:{desktopBuffer:1},expected:31},
   {props:{desktopBuffer:3},expected:91},
   {props:{phoneBuffer:2},expected:61,context:{viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:2}},
   {props:{checkpointCount:7,desktopBuffer:2},expected:69,irregular:true},
  ];
  for(const setting of cases){
   const f=await fixture({props:{startView:'orbit',snapDuration:.2,...setting.props},context:setting.context}),{page}=f;await waitOrbit(page);await waitBuffer(page,setting.expected);
   assert.equal(Number((await orbitData(page)).orbitReady),120);assert.ok(Number((await orbitData(page)).orbitDecoded)<=setting.expected+1);
   if(setting.irregular){
    for(const [frame,count] of [[17,69],[34,70],[51,70],[69,70],[86,70],[103,69],[0,69]]){
     await page.getByRole('button',{name:'Next view',exact:true}).click();await waitFrame(page,frame);await waitBuffer(page,count);assert.ok(Number((await orbitData(page)).orbitDecoded)<=count+1);
    }
    assert.equal(Number((await orbitData(page)).orbitPosition),120,'Seven uneven intervals still complete a seamless full lap');
   }
   await f.close();
  }
 });
 await pass('explicit pause resumes toward the original adjacent checkpoint',async()=>{
  const f=await fixture({props:{startView:'orbit',snapDuration:1.2}}),{page}=f;await waitOrbit(page);
  await page.mouse.wheel(0,1);await page.waitForTimeout(250);await page.getByRole('button',{name:'Pause rotation',exact:true}).click();await waitOrbit(page,'paused');
  const position=Number((await orbitData(page)).orbitPosition);await page.waitForTimeout(300);assert.equal(Number((await orbitData(page)).orbitPosition),position);
  await page.getByRole('button',{name:'Continue rotation',exact:true}).click();await waitFrame(page,15);assert.equal(Number((await orbitData(page)).orbitPosition),15);await f.close();
 });
 await pass('approach owns input until building arrival and fresh input enters the orbit',async()=>{
  const f=await fixture({props:{duration:.6}}),{page}=f;await waitStage(page,'opening');await page.mouse.wheel(0,100);await waitStage(page,'approach');await page.waitForTimeout(180);
  assert.equal(Number((await orbitData(page)).orbitPosition),0,'Hero input cannot rotate the hidden orbit');await waitStage(page,'building');await page.waitForTimeout(500);
  assert.equal(await page.locator('[data-admiral-homepage]').getAttribute('data-homepage-stage'),'building');assert.equal(await page.locator('#cta').evaluate(element=>element.inert),false);
  await page.mouse.wheel(0,120);await waitOrbit(page);for(const id of ['intro','building','cta'])assert.equal(await page.locator('#'+id).evaluate(element=>element.inert),true);
  await page.getByRole('button',{name:'Overview',exact:true}).click();await waitStage(page,'opening');assert.equal(await page.locator('#intro').evaluate(element=>element.inert),false);await f.close();
 });
 await pass('navbar form keyboard and nested scrolling stay native during transitions',async()=>{
  const f=await fixture({externalOverlay:true,props:{startView:'orbit'}}),{page}=f;await waitOrbit(page);
  await page.mouse.move(1150,150);await page.mouse.wheel(0,70);await page.waitForTimeout(120);assert.ok(await page.locator('#nested').evaluate(element=>element.scrollTop)>0);assert.equal(Number((await orbitData(page)).orbitPosition),0);
  await page.locator('#native-input').focus();await page.keyboard.press('ArrowRight');await page.keyboard.press('Space');assert.equal(Number((await orbitData(page)).orbitPosition),0);
  await page.getByRole('button',{name:'Contact',exact:true}).click();assert.equal(await page.evaluate(()=>window.navClicked),1);await page.mouse.move(450,500);await page.mouse.wheel(0,1);
  await page.getByRole('button',{name:'Contact',exact:true}).click();assert.equal(await page.evaluate(()=>window.navClicked),2);await page.locator('#nav-link').click();assert.equal(await page.evaluate(()=>location.hash),'#apartments');await f.close();
 });
 await pass('failed orbit retains a useful still and retry keeps navigation available',async()=>{
  const f=await fixture({props:{startView:'orbit'},failOrbit:37}),{page}=f;await page.waitForFunction(()=>document.querySelector('[data-admiral-orbit]')?.dataset.orbitState==='error',null,{timeout:30000});
  assert.ok(await page.evaluate(()=>[...document.images].some(image=>image.naturalWidth>0&&getComputedStyle(image).opacity!=='0')||[...document.querySelectorAll('canvas')].some(canvas=>canvas.width>0&&canvas.height>0&&canvas.getContext('2d')?.getImageData(5,5,1,1).data[3]>0)));
  await page.getByRole('button',{name:'Contact',exact:true}).click();assert.equal(await page.evaluate(()=>window.navClicked),1);f.restoreOrbit();await page.getByRole('button',{name:'Retry orbit',exact:true}).click();await waitOrbit(page);assert.equal(Number((await orbitData(page)).orbitDownloaded),120);await f.close();
 });
 await pass('reduced motion jumps checkpoints while one wheel gesture stays latched',async()=>{
  const f=await fixture({props:{startView:'orbit'},context:{reducedMotion:'reduce'}}),{page}=f;await waitOrbit(page);await page.evaluate(()=>window.samples=[]);
  for(let index=0;index<10;index++){await page.mouse.wheel(0,50);await page.waitForTimeout(40);}await waitFrame(page,15);
  assert.ok((await page.evaluate(()=>window.samples)).every(sample=>sample.stage!=='orbit'||!['moving','settling'].includes(sample.state)));
  await freshWheel(page,-1);await waitFrame(page,0);await page.getByRole('button',{name:'Next view',exact:true}).click();await waitFrame(page,15);await f.close();
 });
 await pass('phone prepares its smaller movement set and a swipe makes one adjacent transition',async()=>{
  const f=await fixture({props:{startView:'orbit'},context:{viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:3}}),{page}=f;await waitOrbit(page);await waitBuffer(page,31);assert.equal(Number((await orbitData(page)).orbitMotionWidth),640);assert.ok(Number((await orbitData(page)).orbitDecoded)<=32);
  const cdp=await page.context().newCDPSession(page);await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:330,y:450}]});await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:100,y:450}]});await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await waitFrame(page,15);
  await page.screenshot({path:fileURLToPath(new URL('orbit-phone.png',out))});await f.close();
 });
 await pass('phone swipe over native Framer building copy enters orbit at its first checkpoint',async()=>{
  const f=await fixture({context:{viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:2}}),{page}=f;await page.getByRole('button',{name:'Skip approach',exact:true}).click();await waitStage(page,'building');await page.waitForTimeout(250);
  const box=await page.locator('#building').boundingBox(),x=box.x+Math.min(box.width/2,180),y=box.y+Math.min(box.height/2,80),cdp=await page.context().newCDPSession(page);
  await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x,y}]});await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x,y:y-90}]});await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await waitFrame(page,0);await f.close();
 });
 await pass('Framer canvas previews one image without preparing the entire orbit',async()=>{
  const f=await fixture({staticMode:true,props:{editorView:'orbit'}}),{page}=f;await page.waitForTimeout(250);assert.ok(new Set(f.orbitRequests).size<=1);await page.mouse.wheel(0,300);await page.waitForTimeout(100);assert.notEqual(await page.locator('[data-admiral-homepage]').getAttribute('data-homepage-stage'),'approach');await f.close();
 });
 await pass('Overview during preparation cannot cancel a newer Explore activation',async()=>{
  const f=await fixture({delayOrbit:100}),{page}=f;await page.getByRole('button',{name:'Skip approach',exact:true}).click();await waitStage(page,'building');await page.getByRole('button',{name:'Explore building',exact:true}).click();await waitStage(page,'handoff');
  await page.getByRole('button',{name:'Overview',exact:true}).click();await waitStage(page,'opening');await page.getByRole('button',{name:'Skip approach',exact:true}).click();await waitStage(page,'building');await page.getByRole('button',{name:'Explore building',exact:true}).click();await waitOrbit(page);
  await page.getByRole('button',{name:'Next view',exact:true}).click();await waitFrame(page,15);await f.close();
 });
 await pass('hidden Framer breakpoints avoid duplicate preload and release decoded movement frames',async()=>{
  const f=await fixture({twoInstances:true,props:{startView:'orbit'}}),{page}=f;await page.waitForFunction(()=>document.querySelector('#stage [data-admiral-orbit]')?.dataset.orbitState==='checkpoint',null,{timeout:30000});await page.waitForTimeout(350);
  await waitBuffer(page,61,'#stage [data-admiral-orbit]');
  const before=await page.evaluate(()=>({created:window.bitmapCreated,closed:window.bitmapClosed,hiddenReady:Number(document.querySelector('#secondary [data-admiral-orbit]')?.dataset.orbitReady||0)}));assert.equal(before.hiddenReady,0);assert.ok(before.created<=65);assert.ok(f.orbitRequests.length<=130);
  await page.evaluate(()=>{document.querySelector('#stage').style.display='none';document.querySelector('#secondary').style.display='block';});await page.waitForFunction(()=>document.querySelector('#secondary [data-admiral-orbit]')?.dataset.orbitState==='checkpoint',null,{timeout:30000});
  const after=await page.evaluate(()=>({created:window.bitmapCreated,closed:window.bitmapClosed}));assert.ok(after.closed-before.closed>=61);assert.ok(after.created-before.created>=31);
  await page.locator('#secondary').getByRole('button',{name:'Next view',exact:true}).click();await page.waitForFunction(()=>document.querySelector('#secondary [data-admiral-orbit]')?.dataset.orbitState==='checkpoint'&&document.querySelector('#secondary [data-admiral-orbit]')?.dataset.orbitFrame==='15');assert.equal(await page.evaluate(()=>scrollY),0);await f.close();
 });
 if(publicMode)await pass('public GitHub assets prepare and advance one checkpoint',async()=>{
  const f=await fixture({props:{startView:'orbit'}}),{page}=f;await waitOrbit(page,'checkpoint',60000);assert.equal(Number((await orbitData(page)).orbitDownloaded),120);await page.getByRole('button',{name:'Next view',exact:true}).click();await waitFrame(page,15);await f.close();
 });
}finally{
 await writeFile(new URL(publicMode?'public-results.json':'results.json',out),JSON.stringify(results,null,2));await browser.close();
}
