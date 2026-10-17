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
const orbits=await Promise.all(Array.from({length:120},(_,i)=>readFile(new URL('assets/ORBIT PICKER/BEAUTY sequence_Desktop/'+encodeURIComponent(`AP_ORBIT_V01${String(i).padStart(4,'0')} copy.avif`),root))));
const browser=await chromium.launch({headless:true,channel:process.env.PLAYWRIGHT_CHANNEL||'chrome'}),results=[];
const pause=ms=>new Promise(resolve=>setTimeout(resolve,ms));

async function fixture(options={}){
 const context=await browser.newContext({viewport:{width:1200,height:800},...options.context});
 const page=await context.newPage(),errors=[],heroRequests=[],orbitRequests=[];
 let failIndex=options.failOrbit;
 page.on('pageerror',error=>errors.push(error.message));
 await page.route('http://homepage.test/**',async route=>{
  const url=new URL(route.request().url()),pathname=decodeURIComponent(url.pathname);
  if(pathname.startsWith('/hero/')){
   const index=Number(pathname.match(/sequence(\d+)/)?.[1]);heroRequests.push(index);
   return route.fulfill({contentType:'image/avif',headers:{'Cache-Control':'public,max-age=3600'},body:heroes[index]});
  }
  if(pathname.startsWith('/orbit/')){
   const index=Number(pathname.match(/AP_ORBIT_V01(\d{4})/)?.[1]);orbitRequests.push(index);
   if(options.delayOrbit)await pause(options.delayOrbit);
   if(index===failIndex)return route.fulfill({status:503,body:'Deliberate trial orbit outage'});
   return route.fulfill({contentType:'image/avif',headers:{'Cache-Control':'public,max-age=3600'},body:orbits[index]});
  }
  return route.fulfill({contentType:'text/html',body:'<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><style>html,body{margin:0;font:18px Arial;background:#0e1720}#stage{height:100svh;position:relative;overflow:hidden}.copy{position:absolute;left:6%;top:20%;max-width:650px;color:white;z-index:4}.cta{position:absolute;left:6%;top:65%;z-index:4}.cta a{display:inline-block;padding:18px;background:white;color:black}#navbar{position:fixed;z-index:50;top:8px;left:12px;display:flex;gap:12px}#nested{position:absolute;right:0;top:100px;width:110px;height:100px;overflow:auto;z-index:40;background:white}#native-input{position:absolute;right:5px;top:220px;z-index:40;width:95px}#external-framer-overlay{position:absolute;inset:0;z-index:20;pointer-events:auto}#external-framer-overlay>div{width:100%;height:100%}</style></head><body'+(options.externalOverlay?' style="height:300vh"':'')+'><nav id="navbar"><a id="nav-link" href="#apartments">Apartments</a><button id="nav-button">Contact</button></nav><div id="mount"></div></body></html>'});
 });
 await page.goto('http://homepage.test/');await page.addScriptTag({content:react});await page.addScriptTag({content:dom});
 await page.evaluate(({code,props,staticMode,publicMode,twoInstances,externalOverlay})=>{
  window.bitmapCreated=0;window.bitmapClosed=0;
  const nativeCreateImageBitmap=window.createImageBitmap.bind(window);
  window.createImageBitmap=async(...args)=>{const bitmap=await nativeCreateImageBitmap(...args);window.bitmapCreated++;const close=bitmap.close.bind(bitmap);let closed=false;bitmap.close=()=>{if(!closed){closed=true;window.bitmapClosed++;}close();};return bitmap;};
  document.querySelector('#nav-button').addEventListener('click',()=>window.navClicked=(window.navClicked||0)+1);
  const module={exports:{}};
  const stub={useIsStaticRenderer:()=>staticMode,RenderTarget:{canvas:'canvas',current:()=>staticMode?'canvas':'preview'},addPropertyControls:()=>{},ControlType:new Proxy({},{get:(_,name)=>name})};
  new Function('module','exports','require',code)(module,module.exports,name=>name==='react'?React:stub);
  const Frame=React.forwardRef((props,ref)=>React.createElement('div',{...props,ref}));
  const Intro=module.exports.OpeningContent(Frame),Building=module.exports.BuildingContent(Frame),CTA=module.exports.ArrivalCTA(Frame);
  window.component=module.exports.default;
  window.props={useGitHubAssets:publicMode,heroBaseUrl:'http://homepage.test/hero',orbitBaseUrl:'http://homepage.test/orbit',...props};
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
  window.sampleTimer=setInterval(()=>{const root=document.querySelector('[data-admiral-homepage]'),orbit=document.querySelector('[data-admiral-orbit]')||root,hero=document.querySelector('[data-admiral-sequence]');if(root)window.samples.push({time:performance.now(),stage:root.dataset.homepageStage,state:orbit?.dataset.orbitState,position:Number(orbit?.dataset.orbitPosition),frame:Number(orbit?.dataset.orbitFrame),checkpoint:Number(orbit?.dataset.orbitCheckpoint),decoded:Number(orbit?.dataset.orbitDecoded),ready:orbit?.dataset.orbitReady,heroFrame:Number(hero?.dataset.frame)});},16);
 },{code,props:options.props||{},staticMode:!!options.staticMode,publicMode,twoInstances:!!options.twoInstances,externalOverlay:!!options.externalOverlay});
 await page.waitForSelector('[data-admiral-homepage]');
 await page.waitForFunction(()=>[...document.images].some(image=>image.naturalWidth>0));
 await page.mouse.move(450,500);
 return {context,page,errors,heroRequests,orbitRequests,restoreOrbit(){failIndex=undefined;},async close(){assert.deepEqual(errors,[]);await context.close();}};
}
const orbitSelector='[data-admiral-orbit]';
async function orbitData(page){return page.locator(orbitSelector).evaluate(element=>({...element.dataset}));}
async function waitOrbit(page,state='checkpoint',timeout=30000){await page.waitForFunction(state=>{const root=document.querySelector('[data-admiral-homepage]'),orbit=document.querySelector('[data-admiral-orbit]');return root?.dataset.homepageStage==='orbit'&&orbit?.dataset.orbitState===state;},state,{timeout});}
async function waitStage(page,stage,timeout=20000){await page.waitForFunction(stage=>document.querySelector('[data-admiral-homepage]')?.dataset.homepageStage===stage,stage,{timeout});}
async function pass(name,fn){if(process.env.HOMEPAGE_TEST_FILTER&&!name.includes(process.env.HOMEPAGE_TEST_FILTER))return;const started=Date.now();await fn();results.push({name,ms:Date.now()-started});console.log('PASS '+name);}

try{
 await pass('external Framer wrapper accepts wheel, reverse, drag and body keys without scrolling past the viewer',async()=>{
  const f=await fixture({externalOverlay:true,props:{startView:'orbit'}}),{page}=f;await waitOrbit(page);
  assert.ok(await page.evaluate(()=>document.body.scrollHeight>innerHeight*2),'Fixture has real page overflow');
  assert.equal(await page.evaluate(()=>document.elementFromPoint(450,500)?.hasAttribute('data-external-framer-surface')),true,'Pointer hits a transparent Framer sibling outside the code component');
  await page.mouse.move(450,500);await page.mouse.wheel(0,450);await page.waitForTimeout(70);
  const forward=Number((await orbitData(page)).orbitPosition);
  assert.ok(forward>0,`Wheel over the external wrapper must rotate the orbit (position ${forward}, scrollY ${await page.evaluate(()=>scrollY)})`);
  assert.equal(await page.evaluate(()=>scrollY),0,'Orbit wheel consumes page movement despite body overflow');
  await page.mouse.wheel(0,-450);await page.waitForTimeout(40);
  assert.ok(Number((await orbitData(page)).orbitPosition)<forward,'Reverse input over the wrapper reverses from the current frame');
  await page.mouse.wheel(0,-300);await waitOrbit(page);
  assert.equal(Number((await orbitData(page)).orbitFrame)%15,0);assert.equal(await page.evaluate(()=>scrollY),0);
  const beforeDrag=Number((await orbitData(page)).orbitPosition);
  await page.mouse.move(700,500);await page.mouse.down();await page.mouse.move(100,500,{steps:10});await page.mouse.move(-80,500,{steps:4});
  assert.ok(Number((await orbitData(page)).orbitPosition)>beforeDrag,'Dragging the external wrapper retains capture outside the viewer');
  await page.mouse.up();await waitOrbit(page);assert.equal(Number((await orbitData(page)).orbitFrame)%15,0);
  await page.mouse.move(450,500);await page.evaluate(()=>{document.activeElement?.blur();document.body.tabIndex=-1;document.body.focus();});
  const beforeKey=Number((await orbitData(page)).orbitPosition);await page.keyboard.press('ArrowDown');await page.waitForTimeout(60);
  assert.ok(Number((await orbitData(page)).orbitPosition)>beforeKey,'Body-focused arrow key controls the visible orbit');
  await waitOrbit(page);assert.equal(await page.evaluate(()=>scrollY),0,'Arrow input cannot scroll past the homepage');
  const clickCovered=async name=>{const box=await page.getByRole('button',{name,exact:true}).boundingBox();await page.mouse.click(box.x+box.width/2,box.y+box.height/2);};
  const beforeButton=Number((await orbitData(page)).orbitPosition);
  await clickCovered('Next view');await page.waitForTimeout(60);
  assert.ok(Number((await orbitData(page)).orbitPosition)>beforeButton,'Covered viewpoint button still receives its native React click');await waitOrbit(page);
  await page.getByRole('button',{name:'Contact',exact:true}).click();assert.equal(await page.evaluate(()=>window.navClicked),1,'Navbar keeps its native click');
  await clickCovered('Overview');await waitStage(page,'opening');
  await clickCovered('Skip approach');await waitStage(page,'building');
  await clickCovered('Explore building');await waitOrbit(page);
  await page.evaluate(()=>{clearInterval(window.sampleTimer);window.root.unmount();});
  await page.mouse.move(450,500);await page.mouse.wheel(0,450);await page.waitForTimeout(120);
  assert.ok(await page.evaluate(()=>scrollY)>100,'Unmount restores normal page wheel scrolling');await f.close();
 });
 await pass('external Framer wrapper accepts phone dragging and holds vertical gestures while preserving pinch zoom',async()=>{
  const f=await fixture({externalOverlay:true,props:{startView:'orbit'},context:{viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:3}}),{page}=f;await waitOrbit(page);
  const cdp=await page.context().newCDPSession(page);
  await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:330,y:450}]});
  for(let x=300;x>=90;x-=30)await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x,y:450}]});
  await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
  await page.waitForTimeout(80);
  assert.ok(Number((await orbitData(page)).orbitPosition)>0,'Horizontal touch over a sibling wrapper rotates the orbit');
  await waitOrbit(page);assert.equal(Number((await orbitData(page)).orbitFrame)%15,0);
  const button=await page.getByRole('button',{name:'Next view',exact:true}).boundingBox(),beforeButton=Number((await orbitData(page)).orbitPosition);
  await page.touchscreen.tap(button.x+button.width/2,button.y+button.height/2);await page.waitForTimeout(60);
  assert.ok(Number((await orbitData(page)).orbitPosition)>beforeButton,'Covered viewpoint button accepts a touch tap');await waitOrbit(page);
  await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:180,y:650}]});
  for(let y=620;y>=350;y-=30)await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:180,y}]});
  await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await page.waitForTimeout(180);
  assert.equal(await page.evaluate(()=>scrollY),0,'Single-finger vertical input cannot scroll past the orbit');
  const pinch=await page.evaluate(()=>{
   const target=document.querySelector('[data-external-framer-surface]'),touches=[new Touch({identifier:10,target,clientX:130,clientY:400}),new Touch({identifier:11,target,clientX:250,clientY:400})];
   const start=new TouchEvent('touchstart',{touches,targetTouches:touches,changedTouches:touches,bubbles:true,cancelable:true});
   target.dispatchEvent(start);
   const move=new TouchEvent('touchmove',{touches,targetTouches:touches,changedTouches:touches,bubbles:true,cancelable:true});target.dispatchEvent(move);
   const end=new TouchEvent('touchend',{touches:[],targetTouches:[],changedTouches:touches,bubbles:true,cancelable:true});target.dispatchEvent(end);
   return {startPrevented:start.defaultPrevented,movePrevented:move.defaultPrevented};
  });
  assert.equal(pinch.startPrevented,false,'Two-finger touch start stays available to browser pinch zoom');
  assert.equal(pinch.movePrevented,false,'Two-finger touch movement stays available to browser pinch zoom');
  await page.getByRole('button',{name:'Contact',exact:true}).tap();assert.equal(await page.evaluate(()=>window.navClicked),1);await f.close();
 });
 await pass('complete orbit prepares all frames before activating and keeps a sharp checkpoint',async()=>{
  const f=await fixture({props:{startView:'orbit'}}),{page}=f;await waitOrbit(page);
  const data=await orbitData(page);
  assert.equal(Number(data.orbitDownloaded),120);assert.ok(Number(data.orbitDecoded)>=120);
  assert.equal(Number(data.orbitMotionWidth),960);assert.equal(Number(data.orbitFrame),0);
  assert.equal(Number(data.orbitCheckpoint),0);assert.equal(new Set(f.orbitRequests).size,120);
  assert.equal(await page.evaluate(()=>scrollY),0);
  await page.screenshot({path:fileURLToPath(new URL('orbit-desktop.png',out))});await f.close();
 });
 await pass('sustained scrolling crosses checkpoints and loops before settling in the last direction',async()=>{
  const f=await fixture({props:{startView:'orbit'}}),{page}=f;await waitOrbit(page);
  for(let index=0;index<28;index++){await page.mouse.wheel(0,450);await page.waitForTimeout(35);}
  const moving=await orbitData(page),releasePosition=Number(moving.orbitPosition);
  assert.ok(releasePosition>120,`Continuous scroll should pass a whole revolution (${releasePosition})`);
  assert.equal(Number(moving.orbitCheckpoint),-1,'No checkpoint hold during continued input');
  await waitOrbit(page);const forward=await orbitData(page);
  assert.equal(Number(forward.orbitFrame)%15,0);assert.ok(Number(forward.orbitPosition)>=releasePosition);
  assert.equal(await page.evaluate(()=>scrollY),0);
  const samples=await page.evaluate(()=>window.samples.filter(sample=>sample.stage==='orbit'&&Number.isFinite(sample.position)));
  assert.ok(samples.some(sample=>sample.position>120),'Unwrapped position survives the 119-to-0 seam');
  await writeFile(new URL('continuous-scroll.json',out),JSON.stringify(samples,null,2));await f.close();
 });
 await pass('opposite input reverses immediately and settles backward without stopping halfway',async()=>{
  const f=await fixture({props:{startView:'orbit'}}),{page}=f;await waitOrbit(page);
  for(let index=0;index<5;index++){await page.mouse.wheel(0,300);await page.waitForTimeout(30);}
  await page.mouse.wheel(0,-550);await page.waitForTimeout(40);
  const reverseStart=Number((await orbitData(page)).orbitPosition);
  await page.mouse.wheel(0,-450);await page.waitForTimeout(80);
  assert.ok(Number((await orbitData(page)).orbitPosition)<reverseStart,'Reverse input changes the current direction');
  const release=Number((await orbitData(page)).orbitPosition);await waitOrbit(page);
  const end=await orbitData(page);assert.equal(Number(end.orbitFrame)%15,0);
  assert.ok(Number(end.orbitPosition)<=release,'Settles at the next backward checkpoint');await f.close();
 });
 await pass('drag capture survives leaving the viewer and settles only after release',async()=>{
  const f=await fixture({props:{startView:'orbit'}}),{page}=f;await waitOrbit(page);
  await page.mouse.move(650,500);await page.mouse.down();await page.mouse.move(-100,500,{steps:10});
  const dragging=await orbitData(page);assert.notEqual(Number(dragging.orbitPosition),0);
  assert.equal(Number(dragging.orbitCheckpoint),-1);await page.mouse.up();await waitOrbit(page);
  assert.equal(Number((await orbitData(page)).orbitFrame)%15,0);await f.close();
 });
 await pass('explicit pause freezes the displayed position and resume finishes at a viewpoint',async()=>{
  const f=await fixture({props:{startView:'orbit'}}),{page}=f;await waitOrbit(page);
  await page.mouse.wheel(0,350);await page.getByRole('button',{name:'Pause rotation',exact:true}).click();
  await waitOrbit(page,'paused');const position=Number((await orbitData(page)).orbitPosition);
  await page.waitForTimeout(300);assert.equal(Number((await orbitData(page)).orbitPosition),position);
  await page.getByRole('button',{name:'Continue rotation',exact:true}).click();await waitOrbit(page);
  assert.equal(Number((await orbitData(page)).orbitFrame)%15,0);await f.close();
 });
 await pass('approach owns input until building arrival and fresh input enters the orbit',async()=>{
  const f=await fixture({props:{duration:.6}}),{page}=f;
  await waitStage(page,'opening');await page.mouse.wheel(0,100);
  await waitStage(page,'approach');await page.waitForTimeout(180);
  const orbitBefore=await page.locator(orbitSelector).count()?Number((await orbitData(page)).orbitPosition):0;
  assert.equal(orbitBefore,0,'Hero input cannot rotate the hidden orbit');
  await waitStage(page,'building');await page.waitForTimeout(500);
  assert.equal(await page.locator('[data-admiral-homepage]').getAttribute('data-homepage-stage'),'building','No automatic handoff from the approach gesture');
  assert.equal(await page.locator('#cta').evaluate(element=>element.inert),false);
  await page.mouse.wheel(0,120);await waitOrbit(page);
  for(const id of ['intro','building','cta'])assert.equal(await page.locator('#'+id).evaluate(element=>element.inert),true,`${id} hides during orbit`);
  await page.getByRole('button',{name:'Overview',exact:true}).click();await waitStage(page,'opening');
  assert.equal(await page.locator('#intro').evaluate(element=>element.inert),false);
  await f.close();
 });
 await pass('navbar, native form keys and nested scrolling remain usable during rotation',async()=>{
  const f=await fixture({props:{startView:'orbit'}}),{page}=f;await waitOrbit(page);
  await page.mouse.move(1150,150);await page.mouse.wheel(0,70);await page.waitForTimeout(120);
  assert.ok(await page.locator('#nested').evaluate(element=>element.scrollTop)>0);
  assert.equal(Number((await orbitData(page)).orbitPosition),0);
  await page.locator('#native-input').focus();await page.keyboard.press('ArrowRight');await page.keyboard.press('Space');
  assert.equal(Number((await orbitData(page)).orbitPosition),0,'Form keyboard input remains native');
  await page.getByRole('button',{name:'Contact',exact:true}).click();assert.equal(await page.evaluate(()=>window.navClicked),1);
  await page.mouse.move(450,500);await page.mouse.wheel(0,400);
  await page.getByRole('button',{name:'Contact',exact:true}).click();assert.equal(await page.evaluate(()=>window.navClicked),2);
  await page.locator('#nav-link').click();assert.equal(await page.evaluate(()=>location.hash),'#apartments');
  await page.evaluate(()=>{clearInterval(window.sampleTimer);window.root.unmount();document.body.style.height='300vh';});
  await page.mouse.move(450,500);await page.mouse.wheel(0,450);await page.waitForTimeout(150);
  assert.ok(await page.evaluate(()=>scrollY)>0,'Unmount removes wheel capture');await f.close();
 });
 await pass('orbit image failure preserves a visible still and can retry without blocking navigation',async()=>{
  const f=await fixture({props:{startView:'orbit'},failOrbit:37}),{page}=f;
  await page.waitForFunction(()=>document.querySelector('[data-admiral-orbit]')?.dataset.orbitState==='error',null,{timeout:30000});
  assert.ok(await page.evaluate(()=>[...document.images].some(image=>image.naturalWidth>0&&getComputedStyle(image).opacity!=='0')||[...document.querySelectorAll('canvas')].some(canvas=>canvas.width>0&&canvas.height>0&&canvas.getContext('2d')?.getImageData(5,5,1,1).data[3]>0)),'A useful visible still remains');
  await page.getByRole('button',{name:'Contact',exact:true}).click();assert.equal(await page.evaluate(()=>window.navClicked),1);
  f.restoreOrbit();await page.getByRole('button',{name:'Retry orbit',exact:true}).click();await waitOrbit(page);
  assert.equal(Number((await orbitData(page)).orbitDownloaded),120);await f.close();
 });
 await pass('reduced motion advances viewpoint controls without animated travel',async()=>{
  const f=await fixture({props:{startView:'orbit'},context:{reducedMotion:'reduce'}}),{page}=f;await waitOrbit(page);
  await page.evaluate(()=>window.samples=[]);await page.getByRole('button',{name:'Next view',exact:true}).click();
  await page.waitForFunction(()=>document.querySelector('[data-admiral-orbit]')?.dataset.orbitFrame==='15');
  assert.equal((await orbitData(page)).orbitState,'checkpoint');
  await page.waitForTimeout(100);
  assert.ok((await page.evaluate(()=>window.samples)).every(sample=>sample.stage!=='orbit'||!['moving','settling'].includes(sample.state)));
  await page.getByRole('button',{name:'Previous view',exact:true}).click();
  await page.waitForFunction(()=>document.querySelector('[data-admiral-orbit]')?.dataset.orbitFrame==='0');await f.close();
 });
 await pass('phone uses the smaller complete movement set and accepts touch rotation',async()=>{
  const f=await fixture({props:{startView:'orbit'},context:{viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:3}}),{page}=f;await waitOrbit(page);
  assert.equal(Number((await orbitData(page)).orbitMotionWidth),640);
  assert.ok(Number((await orbitData(page)).orbitDecoded)>=120);
  const cdp=await page.context().newCDPSession(page);
  await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:330,y:450}]});
  await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:100,y:450}]});
  await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
  await page.waitForFunction(()=>Number(document.querySelector('[data-admiral-orbit]')?.dataset.orbitPosition)!==0);
  await waitOrbit(page);assert.equal(Number((await orbitData(page)).orbitFrame)%15,0);
  await page.screenshot({path:fileURLToPath(new URL('orbit-phone.png',out))});await f.close();
 });
 await pass('phone swipe over a native Framer building overlay enters the orbit',async()=>{
  const f=await fixture({context:{viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:2}}),{page}=f;
  await page.getByRole('button',{name:'Skip approach',exact:true}).click();await waitStage(page,'building');await page.waitForTimeout(250);
  const box=await page.locator('#building').boundingBox(),x=box.x+Math.min(box.width/2,180),y=box.y+Math.min(box.height/2,80);
  const cdp=await page.context().newCDPSession(page);
  await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x,y}]});
  await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x,y:y-90}]});
  await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
  await waitOrbit(page);assert.equal(Number((await orbitData(page)).orbitFrame),0);await f.close();
 });
 await pass('Framer canvas previews one orbit image without preparing the complete experience',async()=>{
  const f=await fixture({staticMode:true,props:{editorView:'orbit'}}),{page}=f;
  await page.waitForTimeout(250);assert.ok(new Set(f.orbitRequests).size<=1);
  await page.mouse.wheel(0,300);await page.waitForTimeout(100);
  assert.notEqual(await page.locator('[data-admiral-homepage]').getAttribute('data-homepage-stage'),'approach');await f.close();
 });
 await pass('returning to Overview during preparation cannot cancel a newer Explore request',async()=>{
  const f=await fixture({delayOrbit:100}),{page}=f;
  await page.getByRole('button',{name:'Skip approach',exact:true}).click();await waitStage(page,'building');
  await page.getByRole('button',{name:'Explore building',exact:true}).click();await waitStage(page,'handoff');
  await page.getByRole('button',{name:'Overview',exact:true}).click();await waitStage(page,'opening');
  await page.getByRole('button',{name:'Skip approach',exact:true}).click();await waitStage(page,'building');
  await page.getByRole('button',{name:'Explore building',exact:true}).click();await waitOrbit(page);
  await page.getByRole('button',{name:'Next view',exact:true}).click();
  await page.waitForFunction(()=>document.querySelector('[data-admiral-orbit]')?.dataset.orbitFrame==='15');await waitOrbit(page);
  assert.equal(Number((await orbitData(page)).orbitFrame),15,'Latest activation retains working controls');await f.close();
 });
 await pass('hidden Framer breakpoint instances avoid duplicate preload and release decoded frames when hidden',async()=>{
  const f=await fixture({twoInstances:true,props:{startView:'orbit'}}),{page}=f;
  await page.waitForFunction(()=>document.querySelector('#stage [data-admiral-orbit]')?.dataset.orbitState==='checkpoint',null,{timeout:30000});
  await page.waitForTimeout(350);
  const before=await page.evaluate(()=>({created:window.bitmapCreated,closed:window.bitmapClosed,hiddenReady:Number(document.querySelector('#secondary [data-admiral-orbit]')?.dataset.orbitReady||0)}));
  assert.equal(before.hiddenReady,0,'Hidden breakpoint does not prepare its own orbit');
  assert.ok(before.created<=125,`Only the visible instance decodes a full set (${before.created} created)`);
  assert.ok(f.orbitRequests.length<=130,`Hidden breakpoint must not download a duplicate orbit (${f.orbitRequests.length} requests)`);
  await page.evaluate(()=>{document.querySelector('#stage').style.display='none';document.querySelector('#secondary').style.display='block';});
  await page.waitForFunction(()=>document.querySelector('#secondary [data-admiral-orbit]')?.dataset.orbitState==='checkpoint',null,{timeout:30000});
  const after=await page.evaluate(()=>({created:window.bitmapCreated,closed:window.bitmapClosed}));
  assert.ok(after.closed-before.closed>=120,`Hiding the old breakpoint closes its prepared images (${after.closed-before.closed})`);
  assert.ok(after.created-before.created>=120,'New visible breakpoint prepares its movement set');
  await page.locator('#secondary').getByRole('button',{name:'Next view',exact:true}).click();
  await page.waitForFunction(()=>document.querySelector('#secondary [data-admiral-orbit]')?.dataset.orbitFrame==='15');
  assert.equal(await page.evaluate(()=>scrollY),0);await f.close();
 });
 if(publicMode)await pass('public GitHub assets prepare and rotate in the paste-in component',async()=>{
  const f=await fixture({props:{startView:'orbit'}}),{page}=f;await waitOrbit(page,'checkpoint',60000);
  assert.equal(Number((await orbitData(page)).orbitDownloaded),120);
  await page.getByRole('button',{name:'Next view',exact:true}).click();
  await page.waitForFunction(()=>document.querySelector('[data-admiral-orbit]')?.dataset.orbitFrame==='15');await waitOrbit(page);
  assert.equal(Number((await orbitData(page)).orbitFrame),15);await f.close();
 });
}finally{
 await writeFile(new URL(publicMode?'public-results.json':'results.json',out),JSON.stringify(results,null,2));await browser.close();
}
