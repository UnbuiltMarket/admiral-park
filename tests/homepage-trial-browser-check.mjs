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
const connections=await Promise.all(Array.from({length:73},(_,i)=>readFile(new URL('assets/images/SEQ_02_V01/'+encodeURIComponent(`02 sequence${String(i).padStart(2,'0')} copy.avif`),root))));
const orbits=await Promise.all(Array.from({length:120},(_,i)=>readFile(new URL('assets/ORBIT PICKER/BEAUTY sequence_Desktop/'+encodeURIComponent(`adjusted sequence${String(i).padStart(4,'0')} copy.avif`),root))));
const apartmentMediaRoot=process.env.APARTMENT_MEDIA_ROOT||'G:/Egyéb számítógépek/Saját számítógép/UMA_visual/01_Projektek/2026-06-04_Balatonfüred/13_Repostory Admiral Park/assets/apartment-list';
const browser=await chromium.launch({headless:true,channel:process.env.PLAYWRIGHT_CHANNEL||'chrome'}),results=[];
const pause=ms=>new Promise(resolve=>setTimeout(resolve,ms));

async function fixture(options={}){
 const context=await browser.newContext({viewport:{width:1200,height:800},...options.context});
 const page=await context.newPage(),errors=[],heroRequests=[],connectionRequests=[],orbitRequests=[],floorplanRequests=[],apartmentRequests=[],apartmentMediaRequests=[];
 let failIndex=options.failOrbit,corruptIndex=options.corruptOrbit,failConnection=options.failConnection,corruptConnection=options.corruptConnection,failApartment=!!options.failApartment;
 page.on('pageerror',error=>errors.push(error.message));
 await page.route('http://homepage.test/**',async route=>{
  const url=new URL(route.request().url()),pathname=decodeURIComponent(url.pathname);
  if(pathname==='/apartments.json'){
   apartmentRequests.push(pathname);
   if(options.delayApartment)await pause(options.delayApartment);
   if(failApartment)return route.fulfill({status:503,body:'Deliberate apartment data outage'});
   const body=options.apartmentPayload===undefined?await readFile(new URL('data/apartments.json',root),'utf8'):JSON.stringify(options.apartmentPayload);
   return route.fulfill({contentType:'application/json',body});
  }
  if(pathname.startsWith('/apartment-assets/')){
   apartmentMediaRequests.push(pathname);
   const relative=pathname.slice('/apartment-assets/'.length).replace(/^assets\//,'');
   assert.ok(!relative.split('/').includes('..'),'Apartment media route stays inside the read-only media directory');
   const file=path.join(apartmentMediaRoot,relative),extension=path.extname(file).toLowerCase(),contentType={'.webp':'image/webp','.png':'image/png','.svg':'image/svg+xml','.woff2':'font/woff2','.pdf':'application/pdf'}[extension]||'application/octet-stream';
   try{return route.fulfill({contentType,body:await readFile(file)});}catch(error){if(error.code!=='ENOENT')throw error;return route.fulfill({status:404,body:'Missing local studio media'});}
  }
  if(pathname==='/floorplan.svg'){
   floorplanRequests.push(pathname);
   if(options.brokenFloorplan)return route.fulfill({status:404,body:'Missing trial floorplan'});
   return route.fulfill({contentType:'image/svg+xml',body:'<svg xmlns="http://www.w3.org/2000/svg" width="240" height="160"><path fill="none" stroke="white" stroke-width="6" d="M10 10H230V150H10Z M90 10V110H230 M90 80H10"/></svg>'});
  }
  if(pathname.startsWith('/hero/')){
   const index=Number(pathname.match(/sequence(\d+)/)?.[1]);heroRequests.push(index);
   return route.fulfill({contentType:'image/avif',headers:{'Cache-Control':'public,max-age=3600'},body:heroes[index]});
  }
  if(pathname.startsWith('/connection/')){
   const index=Number(pathname.match(/02 sequence(\d+)/)?.[1]);connectionRequests.push(index);
   if(options.delayConnection)await pause(options.delayConnection);
   if(index===failConnection)return route.fulfill({status:503,body:'Deliberate trial connector outage'});
   if(index===corruptConnection)return route.fulfill({contentType:'image/avif',body:'Deliberately invalid encoded connector frame'});
   return route.fulfill({contentType:'image/avif',headers:{'Cache-Control':'public,max-age=3600'},body:connections[index]});
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
 await page.evaluate(({code,props,staticMode,publicMode,twoInstances,externalOverlay,gateDecodeIndices,gateFirstNativeDecodes,accelerateDecodeWatchdog,useDefaultOrbitStart,useDefaultPhoneWidth,useDefaultOrbitLayout,cleanFixture,storyOverlays,storyAliases,tallStory,stageScale,stageWidth,stageHeight})=>{
  if(cleanFixture){const style=document.createElement('style');style.textContent='#nested,#native-input{display:none!important}';document.head.appendChild(style);}
  window.bitmapCreated=0;window.bitmapClosed=0;window.bitmapRecords=[];window.sequenceDraws=[];window.orbitLive=0;window.orbitLiveMax=0;
  const bitmapRecords=new WeakMap(),nativeDrawImage=CanvasRenderingContext2D.prototype.drawImage;
  CanvasRenderingContext2D.prototype.drawImage=function(...args){const record=bitmapRecords.get(args[0]),root=document.querySelector('[data-admiral-homepage]');if(record?.sequence)window.sequenceDraws.push({time:performance.now(),stage:root?.dataset.homepageStage,activeSequence:root?.dataset.activeSequence,sequence:record.sequence,index:record.sequenceIndex});return nativeDrawImage.apply(this,args);};
  window.nativeBitmapCalls=0;window.nativeBitmapActive=0;window.nativeBitmapPeak=0;
  const nativeTimers=window.setTimeout.bind(window);window.acceleratedWatchdog=accelerateDecodeWatchdog;
  if(accelerateDecodeWatchdog)window.setTimeout=(callback,delay,...args)=>nativeTimers(callback,window.acceleratedWatchdog&&delay===15000?100:delay,...args);
  const orbitBlobs=new WeakMap(),sequenceBlobs=new WeakMap(),nativeFetch=window.fetch.bind(window);window.sequenceRequests=[];
  window.fetch=async(...args)=>{
   const url=decodeURIComponent(String(args[0])),match=url.match(/adjusted sequence(\d{4})/),sequence=url.match(/\/(hero|connection)\/(?:raw sequence|02 sequence)(\d+)/);
   if(sequence)window.sequenceRequests.push({sequence:sequence[1]==='connection'?'SEQ_02':'SEQ_01',index:Number(sequence[2]),cache:args[1]?.cache,time:performance.now()});
   const response=await nativeFetch(...args);
   if(match||sequence){const readBlob=response.blob.bind(response);response.blob=async()=>{const blob=await readBlob();if(match)orbitBlobs.set(blob,Number(match[1]));if(sequence)sequenceBlobs.set(blob,{sequence:sequence[1]==='connection'?'SEQ_02':'SEQ_01',sequenceIndex:Number(sequence[2])});return blob;};}
   return response;
  };
  const gates=new Set(gateDecodeIndices),waiting=[];window.decodeGateOpen=!gates.size;
  window.releaseDecodeGates=()=>{window.decodeGateOpen=true;waiting.splice(0).forEach(resolve=>resolve());};
  const nativeWaiting=[];window.nativeDecodeGateOpen=!gateFirstNativeDecodes;
  window.releaseNativeDecodeGates=()=>{window.nativeDecodeGateOpen=true;nativeWaiting.splice(0).forEach(resolve=>resolve());};
  const sequenceWaiting=[];window.sequenceDecodeGate=null;window.sequenceDecodeGateWaiters=0;
  window.gateSequenceDecodes=sequence=>{window.sequenceDecodeGate=sequence;};
  window.releaseSequenceDecodeGates=()=>{window.sequenceDecodeGate=null;sequenceWaiting.splice(0).forEach(resolve=>resolve());};
  const nativeCreateImageBitmap=window.createImageBitmap.bind(window);
  window.createImageBitmap=async(...args)=>{
   const call=++window.nativeBitmapCalls;window.nativeBitmapActive++;window.nativeBitmapPeak=Math.max(window.nativeBitmapPeak,window.nativeBitmapActive);
   const record={index:orbitBlobs.get(args[0]),...sequenceBlobs.get(args[0]),width:args[1]?.resizeWidth,started:performance.now(),created:false,returned:false,closed:false};window.bitmapRecords.push(record);
   try{
    if(record.sequence&&(window.sequenceDecodeGate==='all'||window.sequenceDecodeGate===record.sequence)){
     window.sequenceDecodeGateWaiters++;await new Promise(resolve=>sequenceWaiting.push(resolve));window.sequenceDecodeGateWaiters--;
    }
    if(call<=gateFirstNativeDecodes&&!window.nativeDecodeGateOpen)await new Promise(resolve=>nativeWaiting.push(resolve));
    const bitmap=await nativeCreateImageBitmap(...args);bitmapRecords.set(bitmap,record);window.bitmapCreated++;record.created=true;record.nativeReadyAt=performance.now();
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
  const Intro=module.exports[storyAliases?'BalatonfuredContent':'OpeningContent'](Frame),Building=module.exports[storyAliases?'AranyhidContent':'BuildingContent'](Frame),CTA=module.exports.ArrivalCTA(Frame);
  const Stories=storyOverlays?Array.from({length:8},(_,index)=>module.exports[`OrbitView${index+1}`](Frame)):[];
  window.component=module.exports.default;
  window.props={orbitLayout:'classic',useGitHubAssets:publicMode,heroBaseUrl:'http://homepage.test/hero',connectionBaseUrl:'http://homepage.test/connection',connectionDuration:.6,orbitBaseUrl:'http://homepage.test/orbit',orbitStartFrame:0,detailsMode:'off',snapDuration:.3,phoneImageWidth:80,...props};
  if(useDefaultOrbitStart)delete window.props.orbitStartFrame;
  if(useDefaultPhoneWidth)delete window.props.phoneImageWidth;
  if(useDefaultOrbitLayout)delete window.props.orbitLayout;
  window.root=ReactDOM.createRoot(document.querySelector('#mount'));
  window.renderTrial=()=>window.root.render(React.createElement(React.StrictMode,null,React.createElement('section',{id:'stage',style:{...(stageScale?{transform:`scale(${stageScale})`,transformOrigin:'top left'}:{}),...(stageWidth?{width:stageWidth}:{}),...(stageHeight?{height:stageHeight}:{})}},
   React.createElement(window.component,window.props),
   React.createElement(Intro,{id:'intro',className:'copy'},'LOCATION'),
   React.createElement(Building,{id:'building',className:'copy'},'BUILDING'),
   React.createElement(CTA,{id:'cta',className:'cta'},React.createElement('a',{href:'#apartments',onClick:()=>window.ctaClicked=true},'Apartment details')),
   ...Stories.map((Story,index)=>React.createElement(Story,{key:index,id:`story-${index+1}`,style:{position:'absolute',left:'6%',top:'32%',width:'240px',zIndex:30,color:'white'}},React.createElement('span',{'data-story-fixture':index+1},`Native Framer group ${index+1}`),tallStory&&index===7?React.createElement('div',{'data-story-long':'',style:{height:600}},'Editable native logo, heading and long supporting text'):null,React.createElement('button',{'data-story-fixture-cta':index+1,onClick:()=>window.storyClicks=(window.storyClicks||0)+1},`Story action ${index+1}`))),
   externalOverlay?React.createElement('div',{id:'external-framer-overlay','data-external-framer-wrapper':''},React.createElement('div',{'data-external-framer-surface':''})):null,
   React.createElement('div',{id:'nested'},React.createElement('div',{style:{height:500}},'Native scroll panel')),
   React.createElement('input',{id:'native-input',defaultValue:'Apartment'})),
   twoInstances?React.createElement('section',{id:'secondary',style:{display:'none',position:'relative',height:'100svh'}},React.createElement(window.component,window.props)):null));
  window.renderTrial();window.samples=[];
  window.sampleTimer=setInterval(()=>{const root=document.querySelector('[data-admiral-homepage]'),orbit=document.querySelector('[data-admiral-orbit]')||root,hero=document.querySelector('[data-admiral-sequence]');if(root)window.samples.push({time:performance.now(),stage:root.dataset.homepageStage,sequence:root.dataset.activeSequence,sequenceState:hero?.dataset.sequenceState,heroDecoded:Number(hero?.dataset.decoded),state:orbit?.dataset.orbitState,position:Number(orbit?.dataset.orbitPosition),frame:Number(orbit?.dataset.orbitFrame),checkpoint:Number(orbit?.dataset.orbitCheckpoint),decoded:Number(orbit?.dataset.orbitDecoded),buffered:Number(orbit?.dataset.orbitBuffered),bufferTotal:Number(orbit?.dataset.orbitBufferTotal),requiredReady:Number(orbit?.dataset.orbitRequiredReady),requiredTotal:Number(orbit?.dataset.orbitRequiredTotal),decoding:Number(orbit?.dataset.orbitDecoding),ready:orbit?.dataset.orbitReady,target:Number(orbit?.dataset.orbitTarget),mix:Number(orbit?.dataset.orbitFrameMix),heroFrame:Number(hero?.dataset.frame)});},16);
 },{code,props:options.props||{},staticMode:!!options.staticMode,publicMode,twoInstances:!!options.twoInstances,externalOverlay:!!options.externalOverlay,gateDecodeIndices:options.gateDecodeIndices||[],gateFirstNativeDecodes:options.gateFirstNativeDecodes||0,accelerateDecodeWatchdog:!!options.accelerateDecodeWatchdog,useDefaultOrbitStart:!!options.useDefaultOrbitStart,useDefaultPhoneWidth:!!options.useDefaultPhoneWidth,useDefaultOrbitLayout:!!options.useDefaultOrbitLayout,cleanFixture:!!options.cleanFixture,storyOverlays:!!options.storyOverlays,storyAliases:!!options.storyAliases,tallStory:!!options.tallStory,stageScale:options.stageScale,stageWidth:options.stageWidth,stageHeight:options.stageHeight});
 await page.waitForSelector('[data-admiral-homepage]');
 await page.waitForFunction(()=>[...document.images].some(image=>image.naturalWidth>0));
 await page.mouse.move(450,500);
 return {context,page,errors,heroRequests,connectionRequests,orbitRequests,floorplanRequests,apartmentRequests,apartmentMediaRequests,restoreApartment(){failApartment=false;},restoreOrbit(){failIndex=undefined;corruptIndex=undefined;},restoreConnection(){failConnection=undefined;corruptConnection=undefined;},async close(){if(options.props?.orbitLayout==='studio'){await page.screenshot({path:fileURLToPath(new URL('studio-last-state.png',out))}).catch(()=>{});await writeFile(new URL('studio-last-state.json',out),JSON.stringify(await page.evaluate(()=>({root:{...document.querySelector('[data-admiral-homepage]')?.dataset},studio:{...document.querySelector('[data-orbit-studio]')?.dataset},text:document.querySelector('[data-orbit-studio]')?.innerText})).catch(()=>({})),null,2));}await page.evaluate(()=>{window.releaseDecodeGates?.();window.releaseNativeDecodeGates?.();window.releaseSequenceDecodeGates?.();}).catch(()=>{});assert.deepEqual(errors,[]);await context.close();}};
}
const orbitSelector='[data-admiral-orbit]';
async function orbitData(page){return page.locator(orbitSelector).evaluate(element=>({...element.dataset}));}
async function waitOrbit(page,state='checkpoint',timeout=30000){await page.waitForFunction(state=>{const root=document.querySelector('[data-admiral-homepage]'),orbit=document.querySelector('[data-admiral-orbit]');return root?.dataset.homepageStage==='orbit'&&orbit?.dataset.orbitState===state;},state,{timeout});if(state==='checkpoint')await page.waitForTimeout(220);}
async function waitStage(page,stage,timeout=20000){await page.waitForFunction(stage=>document.querySelector('[data-admiral-homepage]')?.dataset.homepageStage===stage,stage,{timeout});}
async function waitConnectionFrame(page,min=1,max=72){await page.waitForFunction(({min,max})=>{const root=document.querySelector('[data-admiral-homepage]'),sequence=document.querySelector('[data-admiral-sequence]');return root?.dataset.homepageStage==='connection'&&root.dataset.activeSequence==='SEQ_02'&&sequence?.dataset.sequenceState==='moving'&&Number(sequence.dataset.frame)>=min&&Number(sequence.dataset.frame)<=max;},{min,max},{timeout:20000});}
async function pass(name,fn){if(process.env.HOMEPAGE_TEST_FILTER&&!name.includes(process.env.HOMEPAGE_TEST_FILTER))return;const started=Date.now();await fn();results.push({name,ms:Date.now()-started});console.log('PASS '+name);}

async function waitFrame(page,frame,timeout=12000){
 await page.waitForFunction(frame=>{const orbit=document.querySelector('[data-admiral-orbit]');return orbit?.dataset.orbitState==='checkpoint'&&Number(orbit.dataset.orbitFrame)===frame;},frame,{timeout});
}
async function waitBuffer(page,count,selector=orbitSelector){await page.waitForFunction(({count,selector})=>{const root=document.querySelector(selector);return Number(root?.dataset.orbitBuffered)===count&&Number(root?.dataset.orbitDecoding)===0;},{count,selector},{timeout:30000});}
async function freshWheel(page,delta){await page.waitForTimeout(220);await page.mouse.move(450,500);await page.mouse.wheel(0,delta);}
async function coveredClick(page,name){const box=await page.getByRole('button',{name,exact:true}).boundingBox();assert.ok(box,name);await page.mouse.click(box.x+box.width/2,box.y+box.height/2);}
const detailsSelector='[data-apartment-details]';
const apartmentFields=['number','area','terrace','garden','rooms','availability','floorplan'];
async function waitDetails(page,visible=true){await page.locator(detailsSelector).waitFor({state:visible?'visible':'hidden'});}
async function sendApartment(page,detail){await page.locator('[data-admiral-homepage]').evaluate((root,detail)=>root.dispatchEvent(new CustomEvent('admiral:apartment-hover',{detail})),detail);}
async function apartmentField(page,name){return page.locator(`[data-apartment-field="${name}"]`).innerText();}
async function componentScreenshot(page,name){const style=await page.addStyleTag({content:'#navbar{visibility:hidden!important}'});try{await page.screenshot({path:fileURLToPath(new URL(name,out))});}finally{await style.evaluate(element=>element.remove());}}

// Sample the actual painted surface, not only the existence of an image/canvas element.
// An opaque old canvas is essential while a new sequence's first decode is still pending.
async function captureSequencePresentation(page){
 await page.evaluate(()=>{
  if(window.presentationRaf)cancelAnimationFrame(window.presentationRaf);
  window.presentationSamples=[];
  window.readSequencePresentation=()=>{
   const root=document.querySelector('[data-admiral-homepage]'),canvas=root.querySelector('[data-admiral-sequence] canvas'),context=canvas.getContext('2d'),pixels=[];
   for(const y of [.2,.5,.8])for(const x of [.2,.5,.8])pixels.push(...context.getImageData(Math.min(canvas.width-1,Math.floor(canvas.width*x)),Math.min(canvas.height-1,Math.floor(canvas.height*y)),1,1).data);
   return {stage:root.dataset.homepageStage,sequence:root.dataset.activeSequence,opacity:Number(getComputedStyle(canvas).opacity),width:canvas.width,height:canvas.height,pixels};
  };
  const sample=()=>{window.presentationSamples.push(window.readSequencePresentation());window.presentationRaf=requestAnimationFrame(sample);};sample();
 });
}
function assertSamePaint(samples,baseline,message){
 assert.ok(samples.length>=5,'Several compositor frames are checked during the delayed decode');
 assert.ok(new Set(Array.from({length:9},(_,i)=>baseline.pixels.slice(i*4,i*4+3).join(','))).size>1,'Baseline contains real image detail, not just the canvas background');
 for(const sample of samples){
  assert.equal(sample.opacity,1,message+' keeps the painted canvas opaque');
  assert.equal(sample.width,baseline.width,message+' preserves the canvas width');assert.equal(sample.height,baseline.height,message+' preserves the canvas height');
  assert.deepEqual(sample.pixels,baseline.pixels,message+' preserves its exact painted image');
 }
}

async function installFramingCapture(page){
 await page.evaluate(()=>{
  window.framingSamples=[];
  window.readFraming=()=>{
   const root=document.querySelector('[data-admiral-homepage]'),box=root.getBoundingClientRect(),rootWidth=box.width,rootHeight=box.height,scaleX=box.width/root.clientWidth,scaleY=box.height/root.clientHeight,hero=root.querySelector('[data-admiral-sequence]'),heroCanvas=hero.querySelector('canvas'),orbitCanvas=[...root.querySelectorAll('canvas')].find(canvas=>!canvas.closest('[data-admiral-sequence]'));
   const stage=root.dataset.homepageStage,canvas=stage==='orbit'?orbitCanvas:heroCanvas,css=getComputedStyle(canvas),width=Number(root.dataset.imageWidth),height=Number(root.dataset.imageHeight),x=Number(root.dataset.imageX),y=Number(root.dataset.imageY),pixels=[];
   if(canvas.width>1&&canvas.height>1&&[width,height,x,y].every(Number.isFinite)){
    const context=canvas.getContext('2d');
    for(const fy of [.3,.5,.7])for(const fx of [.3,.5,.7])pixels.push(...context.getImageData(Math.max(0,Math.min(canvas.width-1,Math.floor((x+width*fx)/rootWidth*canvas.width))),Math.max(0,Math.min(canvas.height-1,Math.floor((y+height*fy)/rootHeight*canvas.height))),1,1).data);
   }
   const poster=hero.querySelector('img'),posterBox=poster.getBoundingClientRect();
   const hitCanvas=(px,py)=>document.elementFromPoint(box.x+px,box.y+py)===canvas;
   return {stage,sequence:root.dataset.activeSequence,paintedSequence:window.sequenceDraws.at(-1)?.activeSequence,frame:Number(hero.dataset.frame),direction:Number(hero.dataset.direction),progress:Number(hero.dataset.progress),mobile:root.dataset.mobileFraming,visibleWidth:Number(root.dataset.visibleImageWidth),rootWidth,rootHeight,logicalRootWidth:root.clientWidth,logicalRootHeight:root.clientHeight,scaleX,scaleY,x,y,width,height,canvasWidth:canvas.width,canvasHeight:canvas.height,opacity:Number(css.opacity),clip:css.clipPath,pixels,hitInside:hitCanvas(x+width*.5,y+height*.5),hitAbove:hitCanvas(x+width*.5,Math.max(1,y*.5)),hitBelow:hitCanvas(x+width*.5,Math.min(rootHeight-1,y+height+8)),poster:{x:posterBox.x-box.x,y:posterBox.y-box.y,width:posterBox.width,height:posterBox.height,ready:poster.complete&&poster.naturalWidth>0}};
  };
  const sample=()=>{window.framingSamples.push(window.readFraming());window.framingRaf=requestAnimationFrame(sample);};sample();
 });
}
async function readFraming(page){return page.evaluate(()=>window.readFraming());}
function assertFullFraming(frame,message){
 assert.equal(frame.x,0,message+' begins at the left edge');assert.equal(frame.y,0,message+' begins at the top edge');
 assert.ok(Math.abs(frame.width-frame.rootWidth)<1,message+' fills the component width');assert.ok(Math.abs(frame.height-frame.rootHeight)<1,message+' fills the component height');
}
function assertPhoneFraming(frame,width,top=80,message='Phone orbit',staticPoster=false){
 assert.equal(frame.mobile,'true',message+' enables the phone layout');assert.ok(Math.abs(frame.width-width)<1,message+' fills phone width');assert.equal(frame.x,0);
 assert.ok(Math.abs(frame.y-top)<1,message+' clears the header');assert.ok(frame.height<=width*1010/(1920*.8)+1,message+' shows at least 80% of source width');
 assert.ok(frame.visibleWidth>=79.9&&frame.visibleWidth<=100.1,message+' reports the real horizontal source coverage');
 assert.ok(frame.height>width*1010/1920-1,message+' keeps a landscape image');
 if(staticPoster){
  assert.equal(frame.poster.ready,true,message+' has a loaded static poster');
  for(const key of ['x','y','width','height'])assert.ok(Math.abs(frame.poster[key]-frame[key])<1,message+' poster uses the same displayed '+key);
 }else{
  assert.notEqual(frame.clip,'none',message+' clips the full-size canvas to the displayed image rectangle');
  assert.equal(frame.hitInside,true,message+' exposes the canvas inside the displayed rectangle');assert.equal(frame.hitAbove,false,message+' actually clips away the area above the image');assert.equal(frame.hitBelow,false,message+' actually clips away the area below the image');
  assert.ok(frame.pixels.some((value,index)=>index%4!==3&&value>45),message+' contains a painted image, not the dark backing fill');
 }
}
function assertMonotonicFraming(samples,forward){
 assert.ok(samples.length>8,'The framing transition is sampled across several displayed animation frames');
 for(let index=1;index<samples.length;index++){
  const previous=samples[index-1],current=samples[index];
  assert.ok(forward?current.height<=previous.height+1:current.height>=previous.height-1,'Image height follows displayed sequence progress without jumping backwards');
  assert.ok(forward?current.y>=previous.y-1:current.y<=previous.y+1,'Image top follows displayed sequence progress without jumping backwards');
  assert.equal(current.canvasWidth,previous.canvasWidth,'Framing does not reallocate the canvas backing width per frame');assert.equal(current.canvasHeight,previous.canvasHeight,'Framing does not reallocate the canvas backing height per frame');
  assert.equal(current.opacity,1,'The sequence canvas stays opaque throughout framing');assert.ok(current.pixels.some((value,index)=>index%4!==3&&value>45),'Each displayed frame contains real image pixels');
 }
}


const studioSelector='[data-orbit-studio]';
const studioProps={orbitLayout:'studio',orbitBackground:'#fdfbfb',apartmentDataUrl:'http://homepage.test/apartments.json',apartmentAssetBase:'http://homepage.test/apartment-assets',previewApartmentId:'A001',detailsMode:'preview',startView:'orbit',showControls:false,showViewpoints:false};
async function waitStudio(page,id='A001'){
 await waitOrbit(page);
 await page.waitForFunction(id=>{const studio=document.querySelector('[data-orbit-studio]'),plan=studio?.querySelector('[data-orbit-floorplan]');return studio?.dataset.active==='true'&&studio.dataset.apartmentId===id&&plan?.complete&&plan.naturalWidth>0;},id,{timeout:20000});
}
async function studioGeometry(page){return page.locator(studioSelector).evaluate(studio=>{
 const bounds=element=>{const rect=element.getBoundingClientRect();return {x:rect.x,y:rect.y,width:rect.width,height:rect.height,right:rect.right,bottom:rect.bottom};};
 const root=studio.closest('[data-admiral-homepage]'),viewport=studio.querySelector('[data-orbit-viewport]'),plan=studio.querySelector('[data-orbit-floorplan]'),details=studio.querySelector('[data-orbit-studio-details]'),canvas=root.querySelector('canvas[data-orbit-canvas]')||[...root.querySelectorAll('canvas')].find(item=>!item.closest('[data-admiral-sequence]'));
 const box=bounds(root),target=bounds(viewport),style=getComputedStyle(studio),pixels=[],context=canvas?.getContext('2d');
 if(context&&canvas.width>1){for(const fy of [.3,.5,.7])for(const fx of [.3,.5,.7]){const px=(target.x-box.x+target.width*fx)/box.width*canvas.width,py=(target.y-box.y+target.height*fy)/box.height*canvas.height;pixels.push(...context.getImageData(Math.max(0,Math.min(canvas.width-1,Math.floor(px))),Math.max(0,Math.min(canvas.height-1,Math.floor(py))),1,1).data);}}
 return {root:box,studio:bounds(studio),viewport:target,plan:bounds(studio.querySelector('[data-orbit-plan-crop]')||plan),details:details?bounds(details):null,background:style.backgroundImage,transform:style.transform,pixels,image:{x:Number(root.dataset.imageX),y:Number(root.dataset.imageY),width:Number(root.dataset.imageWidth),height:Number(root.dataset.imageHeight)},bodyOverflow:document.documentElement.scrollWidth-innerWidth,planSource:plan.currentSrc,planNaturalWidth:plan.naturalWidth};
 });}
function assertStudioViewport(geometry){
 for(const [dataset,physical]of [['x','x'],['y','y'],['width','width'],['height','height']]){
  const scale=Math.min(geometry.viewport.width/1920,geometry.viewport.height/1010),width=1920*scale,height=1010*scale;
  const expected=physical==='x'?geometry.viewport.x-geometry.root.x+(geometry.viewport.width-width)/2:physical==='y'?geometry.viewport.y-geometry.root.y+(geometry.viewport.height-height)/2:physical==='width'?width:height;
  assert.ok(Math.abs(geometry.image[dataset]-expected)<2,'Canvas '+dataset+' matches the visible studio image slot');
 }
 assert.ok(geometry.pixels.some((value,index)=>index%4!==3&&value>45),'Orbit viewport contains actual decoded image pixels');
 assert.equal(geometry.bodyOverflow,0,'The studio has no horizontal page overflow');
}
async function studioField(page,name){return page.locator('[data-orbit-field="'+name+'"]').first().innerText();}
async function apartmentSelect(page,id){await page.locator('[data-orbit-apartment-select]').selectOption(id);await waitStudio(page,id);}
async function hoverStudioId(page,id){await page.locator('[data-admiral-homepage]').evaluate((root,id)=>root.dispatchEvent(new CustomEvent('admiral:apartment-hover',{detail:{id}})),id);await waitStudio(page,id);}

const storySelector=view=>`[data-orbit-story="${view}"]`;
async function waitStory(page,view,state='visible'){
 await page.waitForFunction(({view,state})=>document.querySelector(`[data-orbit-story="${view}"]`)?.dataset.storyState===state,{view,state},{timeout:12000});
}
async function readStory(page,view){return page.locator(storySelector(view)).evaluate(element=>{const style=getComputedStyle(element),parts=style.translate==='none'?['0','0']:style.translate.split(' ');return {state:element.dataset.storyState,target:element.dataset.storyTarget,opacity:Number(style.opacity),x:parseFloat(parts[0])||0,y:parseFloat(parts[1])||0,inert:element.inert,pointer:style.pointerEvents,visibility:style.visibility,hidden:element.getAttribute('aria-hidden')};});}
async function assertStoryTarget(page,view){
 assert.deepEqual(await page.locator('[data-orbit-story][data-story-target="true"]').evaluateAll(nodes=>nodes.map(node=>Number(node.dataset.orbitStory))),[view],'Only the native group for this exact physical camera is eligible');
 const active=await readStory(page,view);assert.equal(active.state,'visible');assert.equal(active.opacity,1);assert.equal(active.inert,false);
}

try{
 await pass('default orbit layout preserves fullscreen desktop and enables the light studio only on phones',async()=>{
  const desktop=await fixture({cleanFixture:true,useDefaultOrbitLayout:true,context:{viewport:{width:1440,height:900}},props:studioProps}),{page}=desktop;
  try{await waitOrbit(page);await installFramingCapture(page);assertFullFraming(await readFraming(page),'Default desktop orbit');assert.equal(await page.locator('[data-orbit-studio][data-active="true"]').count(),0,'Desktop keeps the fullscreen orbit with no active studio panel');await page.waitForFunction(()=>document.querySelector('[data-apartment-field=number]')?.textContent.includes('A001'));assert.match(await apartmentField(page,'area'),/68[,.]67/,'Default fullscreen details use the real JSON apartment area');await sendApartment(page,{id:'A101'});await page.waitForFunction(()=>document.querySelector('[data-apartment-field=number]')?.textContent.includes('A101'));assert.match(await apartmentField(page,'area'),/47[,.]48/);await page.setViewportSize({width:390,height:844});await page.waitForTimeout(280);await waitStudio(page,'A101');assertStudioViewport(await studioGeometry(page));await page.setViewportSize({width:1440,height:900});await page.waitForTimeout(280);await waitFrame(page,0);assertFullFraming(await readFraming(page),'Desktop resize restores fullscreen orbit');assert.equal(await page.locator('[data-orbit-studio][data-active="true"]').count(),0);}finally{await desktop.close();}
  const phone=await fixture({cleanFixture:true,useDefaultOrbitLayout:true,context:{viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:2},props:studioProps});
  try{await waitStudio(phone.page);assertStudioViewport(await studioGeometry(phone.page));}finally{await phone.close();}
 });
 await pass('default mobile studio keeps the phone layout and retains the camera and selected apartment through rotation',async()=>{
  const f=await fixture({cleanFixture:true,useDefaultOrbitLayout:true,context:{viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:2},props:studioProps}),{page}=f;
  try{
   await waitStudio(page);await apartmentSelect(page,'A101');const geometry=await studioGeometry(page),cdp=await page.context().newCDPSession(page),x=geometry.viewport.x+geometry.viewport.width*.8,y=geometry.viewport.y+geometry.viewport.height*.5;
   await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x,y}]});await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:x-160,y}]});await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await waitFrame(page,15);
   await page.setViewportSize({width:844,height:390});await page.waitForTimeout(280);await waitStudio(page,'A101');assertStudioViewport(await studioGeometry(page));assert.equal(Number((await orbitData(page)).orbitFrame),15,'A coarse-pointer phone keeps its current camera when turned');assert.equal(await page.locator('[data-orbit-studio][data-active="true"]').count(),1,'A physical phone keeps its studio layout when turned to landscape');
   await page.setViewportSize({width:390,height:844});await page.waitForTimeout(280);await waitStudio(page,'A101');assertStudioViewport(await studioGeometry(page));assert.equal(Number((await orbitData(page)).orbitFrame),15,'Re-entering portrait keeps the exact parked camera');
   await componentScreenshot(page,'default-mobile-studio-phone-390.png');
  }finally{await f.close();}
 });
 await pass('studio desktop uses a light 90vh composition with a readable cropped plan and an unoccluded orbit',async()=>{
  for(const viewport of [{width:1440,height:900},{width:1200,height:800}]){
   const f=await fixture({cleanFixture:true,context:{viewport},props:studioProps}),{page}=f;
   try{
    await waitStudio(page);const geometry=await studioGeometry(page);assertStudioViewport(geometry);
    assert.match(geometry.background,/rgb\(253, 251, 251\)/,'The orbit studio has a light paper background');assert.ok(Math.abs(geometry.studio.height-geometry.root.height*.9)<2,'The light studio occupies 90% of the stable outer viewport');
    assert.ok(geometry.plan.height>=300,'The selected floorplan is large enough to read on desktop');assert.ok(geometry.plan.width>=250,'The selected floorplan has useful desktop width');
    assert.ok(geometry.planNaturalWidth>=1000,'The full selected drawing loads instead of a tiny thumbnail');assert.match(geometry.planSource,/floorplans\/types\/B\/full\.webp/);
    assert.equal(await page.locator('[data-orbit-apartment-select] option').count(),69,'All real JSON apartments are available in the temporary preview selector');
    assert.equal(await page.locator('[data-room-list],[data-room-marker],[data-orbit-room-list]').count(),0,'No room-by-room detail list is added to the studio');
    await page.getByRole('button',{name:'Alaprajz nagyítása',exact:true}).click();await page.locator('[data-orbit-plan-dialog]').waitFor({state:'visible'});
    assert.equal(Number((await orbitData(page)).orbitFrame),0,'The plan action remains clickable and cannot rotate the orbit');await page.keyboard.press('Escape');
    await componentScreenshot(page,'studio-desktop-'+viewport.width+'.png');
   }finally{await f.close();}
  }
 });
 await pass('studio phone keeps the upright full-width orbit above a large independently scrollable plan',async()=>{
  for(const viewport of [{width:390,height:844},{width:375,height:667}]){
   const f=await fixture({cleanFixture:true,context:{viewport,isMobile:true,hasTouch:true,deviceScaleFactor:2},props:{...studioProps,phoneImageWidth:100}}),{page}=f;
   try{
    await waitStudio(page);const geometry=await studioGeometry(page);assertStudioViewport(geometry);
    assert.equal(geometry.transform,'none','The phone layout does not rotate the scene');assert.ok(Math.abs(geometry.image.width-viewport.width)<2,'The phone image uses its entire available width');
    assert.ok(Math.abs(geometry.image.height-viewport.width*1010/1920)<2,'The complete landscape source stays upright');assert.ok(geometry.plan.height>=279,'The phone floorplan retains a readable size inside the detail scroller: '+JSON.stringify(geometry.plan));
    assert.ok(geometry.details.y>=geometry.viewport.bottom-2,'Apartment details start below the orbit image');
    const scroller=page.locator('[data-orbit-studio-details]');assert.ok(await scroller.evaluate(element=>element.scrollHeight>element.clientHeight),'Details have an independent vertical scroll area on a short phone');
    const before=await orbitData(page);await scroller.evaluate(element=>{element.scrollTop=element.scrollHeight;});await page.waitForTimeout(100);
    const after=await orbitData(page);assert.equal(after.orbitFrame,before.orbitFrame,'Reading apartment details does not turn the orbit');
    await page.getByRole('button',{name:'Alaprajz nagyítása',exact:true}).click();await page.locator('[data-orbit-plan-dialog]').waitFor({state:'visible'});await page.keyboard.press('Escape');
    const cdp=await page.context().newCDPSession(page),x=geometry.viewport.x+geometry.viewport.width*.8,y=geometry.viewport.y+geometry.viewport.height*.5;
    await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x,y}]});await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:x-180,y}]});await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await waitFrame(page,15);
    await componentScreenshot(page,'studio-phone-'+viewport.width+'.png');
   }finally{await f.close();}
  }
 });
 await pass('studio short landscape phone preserves the image and readable details through rotation',async()=>{
  for(const beginPortrait of [false,true]){
   const f=await fixture({cleanFixture:true,context:{viewport:beginPortrait?{width:390,height:844}:{width:844,height:390},isMobile:true,hasTouch:true,deviceScaleFactor:2},props:{...studioProps,phoneImageWidth:100}}),{page}=f;
   try{
    await waitStudio(page);if(beginPortrait){await page.setViewportSize({width:844,height:390});await page.waitForTimeout(280);}
    await page.waitForFunction(()=>{const viewport=document.querySelector('[data-orbit-viewport]')?.getBoundingClientRect();return viewport?.width>100&&viewport?.height>100;});
    const geometry=await studioGeometry(page);assertStudioViewport(geometry);assert.ok(geometry.plan.height>=279,'The landscape phone keeps a readable plan inside the detail scroller');
    const details=page.locator('[data-orbit-studio-details]');assert.ok(await details.evaluate(element=>element.scrollHeight>element.clientHeight&&/auto|scroll/.test(getComputedStyle(element).overflowY)),'Facts and large plan share a native scroller on a short landscape phone');
    await page.getByRole('button',{name:'Alaprajz nagyítása',exact:true}).click();await page.locator('[data-orbit-plan-dialog]').waitFor({state:'visible'});await page.keyboard.press('Escape');
    const cdp=await page.context().newCDPSession(page),x=geometry.viewport.x+geometry.viewport.width*.8,y=geometry.viewport.y+geometry.viewport.height*.5;
    await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x,y}]});await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:x-150,y}]});await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await waitFrame(page,15);
    await componentScreenshot(page,'studio-landscape-phone-844.png');await page.setViewportSize({width:390,height:844});await page.waitForTimeout(280);await waitStudio(page);
    const portrait=await studioGeometry(page);assertStudioViewport(portrait);assert.ok(Math.abs(portrait.image.width-390)<2);assert.equal(Number((await orbitData(page)).orbitFrame),15,'Returning to portrait retains the camera viewpoint');assert.equal(await page.locator(studioSelector).getAttribute('data-apartment-id'),'A001','Rotation retains the selected apartment details');
   }finally{await f.close();}
  }
 });
 await pass('studio apartment JSON retries independently and preserves unknown facts without inventing zeroes',async()=>{
  const f=await fixture({cleanFixture:true,failApartment:true,delayApartment:180,props:studioProps}),{page}=f;
  try{
   await waitOrbit(page);await page.waitForFunction(()=>document.querySelector('[data-orbit-studio]')?.dataset.status==='error');
   assert.equal(Number((await orbitData(page)).orbitFrame),0,'A JSON outage leaves the camera and image usable');
   f.restoreApartment();await page.getByRole('button',{name:'Újrapróbálom',exact:true}).click();await waitStudio(page);assert.ok(f.apartmentRequests.length>=2,'Retry requests the failed JSON again');
   await apartmentSelect(page,'B105');assert.match(await studioField(page,'status'),/Elkelt|Eladva/);assert.doesNotMatch(await studioField(page,'price'),/(^|\D)0\s*Ft/,'A sold unit with a null price does not become free');
   await apartmentSelect(page,'A201');assert.match(await studioField(page,'area'),/115[,.]66/);assert.equal(await page.locator('[data-orbit-field=rooms]').count(),0,'A missing room count is not coerced to zero');assert.doesNotMatch(await studioField(page,'garden'),/^0/,'A missing garden is not published as a zero-sized known garden');
  }finally{await f.close();}
 });
 await pass('studio hover IDs switch all canonical JSON facts without resetting the orbit or losing the selected unit',async()=>{
  const f=await fixture({cleanFixture:true,props:studioProps}),{page}=f;
  try{
   await waitStudio(page);const before=await orbitData(page),requests=f.orbitRequests.length;
   await hoverStudioId(page,'A101');assert.match(await studioField(page,'status'),/Tárgyalás alatt/);assert.match(await studioField(page,'area'),/47[,.]48/);assert.match(await studioField(page,'terrace'),/11[,.]51/);assert.match((await studioField(page,'price')).replace(/\s/g,''),/159[,.]38MFt/);assert.match(await studioField(page,'orientation'),/NY/);
   await page.mouse.move(5,5);await sendApartment(page,null);await page.waitForTimeout(160);assert.equal(await page.locator(studioSelector).getAttribute('data-apartment-id'),'A101','Leaving the building preserves the selected useful detail view');
   await hoverStudioId(page,'B105');assert.match(await studioField(page,'status'),/Elkelt|Eladva/);assert.match(await studioField(page,'area'),/89[,.]65/);assert.match(await page.locator('[data-orbit-floorplan]').getAttribute('src'),/types\/C\/full\.webp/);
   const after=await orbitData(page);assert.equal(after.orbitFrame,before.orbitFrame);assert.equal(after.orbitPosition,before.orbitPosition);assert.equal(after.orbitState,'checkpoint');assert.ok(f.orbitRequests.length-requests<5,'Switching apartment facts does not create a new orbit download');
  }finally{await f.close();}
 });
 await pass('studio selected media tabs expansion and actions remain native and SEQ_02 arrives at the same photo geometry',async()=>{
  const f=await fixture({cleanFixture:true,props:{...studioProps,startView:'opening',showControls:true,inquiryUrl:'/erdeklodes',duration:.5,connectionDuration:1.1}}),{page}=f;
  try{
   await coveredClick(page,'Skip approach');await waitStage(page,'building');await installFramingCapture(page);await coveredClick(page,'Explore building');await waitStudio(page);
   const geometry=await studioGeometry(page);assertStudioViewport(geometry);
   const last=await page.evaluate(()=>window.framingSamples.filter(item=>item.sequence==='SEQ_02'&&item.paintedSequence==='SEQ_02').at(-1));assert.ok(last,'The connection sequence reaches a painted final frame');
   for(const key of ['x','y','width','height'])assert.ok(Math.abs(last[key]-geometry.image[key])<2,'SEQ_02 and the orbit share their final '+key);
   const firstPlans=[...new Set(f.apartmentMediaRequests.filter(url=>/floorplans\/types\//.test(url)))];assert.equal(firstPlans.length,1,'Only the selected apartment type plan is downloaded');assert.match(firstPlans[0],/types\/B\/full\.webp/);assert.ok(!f.apartmentMediaRequests.some(url=>/original\.png/.test(url)),'Original production PNGs are never requested');
   const crop=await page.locator('[data-orbit-plan-crop]').first().evaluate(element=>({width:element.clientWidth,height:element.clientHeight}));assert.ok(Math.abs(crop.width/crop.height-(1500*.9306666666666666)/(2000*.7895))<.025,'The initial B drawing uses the JSON crop instead of wasting the page margins');
   await page.getByRole('tab',{name:'Szintrajz',exact:true}).click();await page.waitForFunction(()=>document.querySelector('[data-orbit-floorplan]')?.currentSrc.includes('/floor-layouts/00/full.webp'));await page.waitForFunction(()=>document.querySelector('[data-orbit-floorplan]')?.complete&&document.querySelector('[data-orbit-floorplan]')?.naturalWidth>0);
   assert.equal(Number((await orbitData(page)).orbitFrame),0,'The floor-layout tab cannot trigger camera motion');await page.getByRole('tab',{name:'Alaprajz',exact:true}).click();
   await page.getByRole('button',{name:'Alaprajz nagyítása',exact:true}).click();const dialog=page.locator('[data-orbit-plan-dialog]');await dialog.waitFor({state:'visible'});assert.ok((await dialog.boundingBox()).height>geometry.plan.height,'Expanded plan gets a larger reading area');await page.keyboard.press('Escape');
   for(const selector of ['[data-orbit-inquiry]','[data-orbit-download]','[data-orbit-detail-link]']){const action=page.locator(selector+':visible').first();assert.ok(await action.getAttribute('href'),'Native action has a concrete destination');await action.evaluate(element=>element.addEventListener('click',event=>{event.preventDefault();window.studioActionClick=(window.studioActionClick||0)+1;},{once:true}));await action.click();}
   assert.equal(await page.evaluate(()=>window.studioActionClick),3);await page.evaluate(()=>{Object.defineProperty(navigator,'share',{configurable:true,value:undefined});Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async value=>{window.sharedStudioUrl=value;}}});});await page.getByRole('button',{name:'Megosztás',exact:false}).click();assert.match(await page.evaluate(()=>window.sharedStudioUrl),/\/lista\?apartment=A001/,'Sharing uses the selected apartment detail link');assert.equal(Number((await orbitData(page)).orbitFrame),0,'Detail actions never rotate the orbit');
  }finally{await f.close();}
 });
 await pass('upright full-width phone defaults ignore the old turning setting and preserve buttons and swipes',async()=>{
  for(const viewport of [{width:390,height:844},{width:375,height:667}]){
   const f=await fixture({cleanFixture:true,useDefaultPhoneWidth:true,context:{viewport,isMobile:true,hasTouch:true,deviceScaleFactor:2},props:{phoneOrbitMode:'landscape',duration:.6,connectionDuration:1.2,maxSpeed:1,snapDuration:.2,detailsMode:'preview',showViewpoints:false}}),{page}=f;
   try{
    await installFramingCapture(page);assertFullFraming(await readFraming(page),'Upright SEQ_01 opening');
    await coveredClick(page,'Skip approach');await waitStage(page,'building');assertFullFraming(await readFraming(page),'Upright SEQ_01 arrival');
    await page.evaluate(()=>window.framingSamples=[]);await coveredClick(page,'Explore building');await waitOrbit(page);await waitDetails(page);
    const transition=await page.evaluate(()=>window.framingSamples.filter(sample=>sample.stage==='connection'&&sample.sequence==='SEQ_02'&&sample.paintedSequence==='SEQ_02'&&sample.canvasWidth>1));
    assertMonotonicFraming(transition,true);
    const frame=await readFraming(page);assertPhoneFraming(frame,viewport.width,80,'Upright full-width orbit');
    assert.ok(Math.abs(frame.height-viewport.width*1010/1920)<1,'Default image height preserves the complete source aspect ratio');
    assert.ok(Math.abs(frame.visibleWidth-100)<.1,'Default shows 100% of the source width');
    assert.equal(await page.locator('[data-homepage-scene],[data-phone-rotation],[data-phone-rotation-continue],[aria-modal="true"]').count(),0,'There is no rotating scene, prompt or confirmation button');
    const transforms=await page.locator('[data-admiral-homepage],[data-admiral-homepage] canvas,[data-admiral-sequence] img').evaluateAll(nodes=>nodes.map(node=>getComputedStyle(node).transform));
    assert.ok(transforms.every(transform=>transform==='none'),'The image and controls remain upright without CSS rotation');
    const details=await page.locator(detailsSelector).boundingBox();assert.ok(details.y>=frame.y+frame.height+8,'Apartment details remain below the full-width image');
    await coveredClick(page,'Next view');await waitFrame(page,15);
    const cdp=await page.context().newCDPSession(page),y=frame.y+frame.height*.5;
    await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:viewport.width*.75,y}]});
    await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:viewport.width*.35,y}]});
    await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await waitFrame(page,30);
    assert.equal(await page.evaluate(()=>scrollY),0,'The orbit swipe keeps the homepage in place');
    await componentScreenshot(page,'upright-full-width-'+viewport.width+'.png');
   }finally{await f.close();}
  }
  const direct=await fixture({cleanFixture:true,useDefaultPhoneWidth:true,useDefaultOrbitStart:true,context:{viewport:{width:390,height:844},isMobile:true,hasTouch:true},props:{startView:'orbit',phoneOrbitMode:'landscape',showViewpoints:false}});
  try{await waitFrame(direct.page,45);await installFramingCapture(direct.page);const frame=await readFraming(direct.page);assert.ok(Math.abs(frame.visibleWidth-100)<.1);assert.ok(Math.abs(frame.height-390*1010/1920)<1,'Direct orbit entry also uses upright 100% width');}finally{await direct.close();}
 });
 await pass('mobile framing SEQ_02 transforms fullscreen into a wide image and every orbit camera preserves coverage',async()=>{
  for(const viewport of [{width:390,height:844},{width:375,height:667}]){
   const f=await fixture({cleanFixture:true,context:{viewport,isMobile:true,hasTouch:true,deviceScaleFactor:2},props:{duration:.6,connectionDuration:1.2,maxSpeed:1,snapDuration:.15,detailsMode:'preview',showViewpoints:false}}),{page}=f;
   try{
    await installFramingCapture(page);assertFullFraming(await readFraming(page),'SEQ_01 opening');
    await coveredClick(page,'Skip approach');await waitStage(page,'building');assertFullFraming(await readFraming(page),'SEQ_01 building arrival');
    await page.evaluate(()=>window.framingSamples=[]);await coveredClick(page,'Explore building');await waitOrbit(page);await waitDetails(page);
    const transition=await page.evaluate(()=>window.framingSamples.filter(sample=>sample.stage==='connection'&&sample.sequence==='SEQ_02'&&sample.paintedSequence==='SEQ_02'&&sample.canvasWidth>1));
    assertMonotonicFraming(transition,true);assert.ok(transition[0].height>viewport.height*.9,'The connector begins with the previous fullscreen presentation');
    for(let checkpoint=0;checkpoint<8;checkpoint++){
     await waitFrame(page,checkpoint*15);await page.waitForFunction(()=>Number(getComputedStyle(document.querySelector('[data-apartment-details]')).opacity)>.99);const frame=await readFraming(page);assertPhoneFraming(frame,viewport.width,80,`Phone ${viewport.width} camera ${checkpoint+1}`);
     const details=await page.locator(detailsSelector).boundingBox();assert.ok(details.y>=frame.y+frame.height+8,'Apartment details remain below the framed building image');assert.ok(details.y+details.height<=viewport.height-31,'Apartment details preserve their bottom inset');
     if(checkpoint<7)await coveredClick(page,'Next view');
    }
    await componentScreenshot(page,`phone-framing-${viewport.width}.png`);
   }finally{await f.close();}
  }
 });
 await pass('mobile framing reverses with the connector and Overview restores the complete opening image',async()=>{
  const f=await fixture({cleanFixture:true,context:{viewport:{width:375,height:667},isMobile:true,hasTouch:true,deviceScaleFactor:2},props:{connectionDuration:3,maxSpeed:1}}),{page}=f;
  try{
   await installFramingCapture(page);await coveredClick(page,'Skip approach');await waitStage(page,'building');await coveredClick(page,'Explore building');await waitConnectionFrame(page,25,45);
   const middle=await readFraming(page);assert.ok(middle.y>0&&middle.y<80);assert.ok(middle.height<667&&middle.height>375*1010/(1920*.8));
   // Capture after the first reverse draw so the direction-change frame is not mistaken for backward geometry.
   const previousFrame=middle.frame,cdp=await page.context().newCDPSession(page);
   await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:185,y:180}]});await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:185,y:300}]});await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await page.waitForFunction(previous=>Number(document.querySelector('[data-admiral-sequence]').dataset.frame)<previous,previousFrame);
   await page.evaluate(()=>window.framingSamples=[]);await waitStage(page,'building');
   const reversed=await page.evaluate(()=>window.framingSamples.filter(sample=>sample.stage==='connection'&&sample.sequence==='SEQ_02'));assertMonotonicFraming(reversed,false);assertFullFraming(await readFraming(page),'Restored SEQ_01 endpoint');
   await coveredClick(page,'Explore building');await waitConnectionFrame(page,10,40);await coveredClick(page,'Overview');await waitStage(page,'opening');assertFullFraming(await readFraming(page),'Overview reset');
  }finally{await f.close();}
 });
 await pass('mobile framing preserves desktop and disabled phone fullscreen behavior and matches static previews',async()=>{
  for(const setting of [{context:{viewport:{width:1200,height:800}},props:{},mobile:false},{context:{viewport:{width:390,height:844},isMobile:true,hasTouch:true},props:{phoneFraming:false},mobile:false}]){
   const f=await fixture({...setting,props:{startView:'orbit',...setting.props}}),{page}=f;
   try{await waitOrbit(page);await installFramingCapture(page);const frame=await readFraming(page);assert.equal(frame.mobile,String(setting.mobile));assertFullFraming(frame,'Unframed orbit');}finally{await f.close();}
  }
  for(const editorView of ['opening','building','connection','orbit']){
   const f=await fixture({staticMode:true,cleanFixture:true,context:{viewport:{width:390,height:844},isMobile:true,hasTouch:true},props:{editorView,detailsMode:'preview'}}),{page}=f;
   try{
    await installFramingCapture(page);const frame=await readFraming(page);assert.equal(await page.evaluate(()=>window.nativeBitmapCalls),0,'A static framing preview never starts the sequence decoder');
    if(editorView==='orbit')assertPhoneFraming(frame,390,80,'Static phone orbit',true);
    else if(editorView==='connection'){assert.ok(frame.y>0&&frame.y<80);assert.ok(frame.height<844&&frame.height>390*1010/(1920*.8),'Static connection previews the midpoint framing');}
    else assertFullFraming(frame,'Static '+editorView);
   }finally{await f.close();}
  }
 });
 await pass('mobile framing keeps tall native story eight between image and details during resize and custom framing',async()=>{
  const f=await fixture({cleanFixture:true,storyOverlays:true,tallStory:true,context:{viewport:{width:375,height:667},isMobile:true,hasTouch:true,deviceScaleFactor:2},props:{startView:'orbit',orbitStartFrame:105,detailsMode:'preview',showControls:false,showViewpoints:false,storyDelay:.01,storyIn:.02,storyOut:.02}}),{page}=f;
  async function assertStoryRegion(){
   await waitStory(page,8);await page.waitForFunction(()=>Number(getComputedStyle(document.querySelector('[data-apartment-details]')).opacity)>.99);const frame=await readFraming(page),story=await page.locator(storySelector(8)).evaluate(element=>{const box=element.getBoundingClientRect(),css=getComputedStyle(element);return {top:box.top,bottom:box.bottom,height:box.height,maxHeight:parseFloat(css.maxHeight),overflow:css.overflowY,clientHeight:element.clientHeight,scrollHeight:element.scrollHeight};}),details=await page.locator(detailsSelector).boundingBox();
   assert.ok(story.top>=frame.y+frame.height+19,'Native story begins below the displayed image');assert.ok(story.bottom<=details.y-19,'Native story ends above the apartment details: '+JSON.stringify({story,details}));assert.ok(story.height>60,'The short phone keeps a usable story region');assert.ok(story.maxHeight>0&&Number.isFinite(story.maxHeight));assert.equal(story.overflow,'auto');assert.ok(story.scrollHeight>story.clientHeight,'Tall native content remains available through its own scroll region');
  }
  try{
   await waitFrame(page,105);await waitDetails(page);await installFramingCapture(page);await assertStoryRegion();
   await componentScreenshot(page,'phone-framing-story8-375.png');
   const cdp=await page.context().newCDPSession(page),storyBox=await page.locator(storySelector(8)).boundingBox(),storyTouchY=storyBox.y+storyBox.height-12;
   await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:120,y:storyTouchY}]});
   for(const delta of [20,40,60])await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:120,y:storyTouchY-delta}]});
   await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await page.waitForFunction(()=>document.querySelector('[data-orbit-story="8"]').scrollTop>0);await page.waitForTimeout(250);
   assert.equal(Number((await orbitData(page)).orbitFrame),105,'A real swipe scrolls the native text without rotating the building');assert.equal(await page.evaluate(()=>scrollY),0,'Scrolling native story content does not move the page');
   await page.locator(storySelector(8)).evaluate(element=>element.scrollTop=element.scrollHeight);await page.getByRole('button',{name:'Story action 8',exact:true}).click();assert.equal(await page.evaluate(()=>window.storyClicks),1,'The apartment selection CTA is reachable in a tall native group');assert.equal(await page.evaluate(()=>scrollY),0);
   await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:270,y:180}]});await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:160,y:180}]});await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await waitFrame(page,0);await waitStory(page,1);await page.getByRole('button',{name:'Story action 1',exact:true}).tap();assert.equal(await page.evaluate(()=>window.storyClicks),2,'Swiping the image rotates to the next camera and leaves its native CTA usable');
   await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:150,y:180}]});await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:270,y:180}]});await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await waitFrame(page,105);await assertStoryRegion();
   await page.setViewportSize({width:390,height:844});await page.waitForFunction(()=>Number(document.querySelector('[data-admiral-homepage]').dataset.imageWidth)===390);await assertStoryRegion();assertPhoneFraming(await readFraming(page),390);
   await page.evaluate(()=>{window.props={...window.props,phoneImageWidth:100,phoneImageTop:120};window.renderTrial();});await page.waitForFunction(()=>Math.abs(Number(document.querySelector('[data-admiral-homepage]').dataset.imageY)-120)<1);await waitFrame(page,105);await assertStoryRegion();const custom=await readFraming(page);assertPhoneFraming(custom,390,120,'Custom phone framing');assert.ok(Math.abs(custom.height-390*1010/1920)<1,'100% source-width setting shows the full landscape source');
   await page.setViewportSize({width:1200,height:800});await page.waitForFunction(()=>document.querySelector('[data-admiral-homepage]').dataset.mobileFraming==='false');await waitFrame(page,105);assertFullFraming(await readFraming(page),'Resized desktop');
   const restored=await page.locator(storySelector(8)).evaluate(element=>{const css=getComputedStyle(element),box=element.getBoundingClientRect();return {top:box.top,maxHeight:css.maxHeight,overflow:css.overflowY};});assert.ok(Math.abs(restored.top-800*.32)<1,'Desktop restores the native Framer story placement');assert.equal(restored.maxHeight,'none');assert.equal(restored.overflow,'visible');
  }finally{await f.close();}
 });
 await pass('mobile framing reduced motion retains fullscreen building while orbit decode is pending',async()=>{
  const f=await fixture({cleanFixture:true,gateDecodeIndices:[0],context:{viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:2,reducedMotion:'reduce'},props:{detailsMode:'preview'}}),{page}=f;
  try{
   await waitStage(page,'building');await installFramingCapture(page);assertFullFraming(await readFraming(page),'Reduced-motion building');
   await coveredClick(page,'Explore building');await waitStage(page,'handoff');await page.evaluate(()=>window.framingSamples=[]);await page.waitForTimeout(250);
   const pending=await page.evaluate(()=>window.framingSamples);assert.ok(pending.length>8);for(const frame of pending){assert.equal(frame.stage,'handoff');assertFullFraming(frame,'Pending reduced-motion handoff');assert.equal(frame.opacity,1);assert.ok(frame.pixels.some((value,index)=>index%4!==3&&value>45),'Pending orbit decoding keeps the actual building image');}
   await page.evaluate(()=>window.releaseDecodeGates());await waitOrbit(page);assertPhoneFraming(await readFraming(page),390,80,'Ready reduced-motion orbit');
  }finally{await f.close();}
 });
 await pass('mobile framing uses logical component dimensions inside scaled Framer ancestors',async()=>{
  const desktop=await fixture({cleanFixture:true,stageScale:.5,context:{viewport:{width:1200,height:800}},props:{startView:'orbit'}});
  try{
   await waitOrbit(desktop.page);await installFramingCapture(desktop.page);const frame=await readFraming(desktop.page);assert.equal(frame.rootWidth,600);assert.equal(frame.logicalRootWidth,1200);assert.equal(frame.mobile,'false','A scaled desktop preview is not mistaken for a phone');assertFullFraming(frame,'Scaled desktop preview');
  }finally{await desktop.close();}
  const phone=await fixture({cleanFixture:true,storyOverlays:true,tallStory:true,stageScale:.75,stageWidth:390,stageHeight:844,context:{viewport:{width:1200,height:1000}},props:{startView:'orbit',orbitStartFrame:105,detailsMode:'preview',showControls:false,storyDelay:.01,storyIn:.02,storyOut:.02}}),{page}=phone;
  try{
   await waitFrame(page,105);await waitStory(page,8);await page.waitForFunction(()=>Number(getComputedStyle(document.querySelector('[data-apartment-details]')).opacity)>.99);await installFramingCapture(page);const frame=await readFraming(page);assert.equal(frame.rootWidth,292.5);assert.equal(frame.logicalRootWidth,390);
   const logical={...frame,x:frame.x/frame.scaleX,y:frame.y/frame.scaleY,width:frame.width/frame.scaleX,height:frame.height/frame.scaleY,rootWidth:frame.logicalRootWidth,rootHeight:frame.logicalRootHeight};assertPhoneFraming(logical,390,80,'Scaled phone in a desktop editor');
   const story=await page.locator(storySelector(8)).boundingBox(),details=await page.locator(detailsSelector).boundingBox();assert.ok(story.y>=frame.y+frame.height+19*.75,'Scaled story remains below the real rendered image');assert.ok(story.y+story.height<=details.y-19*.75,'Scaled native text preserves the gap above details');
  }finally{await phone.close();}
 });
 await pass('orbit story selects the eight physical cameras across a complete lap reverse and distant jump',async()=>{
  const f=await fixture({storyOverlays:true,cleanFixture:true,useDefaultOrbitStart:true,externalOverlay:true,props:{startView:'orbit',storyDelay:.01,storyIn:.03,storyOut:.02,snapDuration:.15}}),{page}=f;
  await waitFrame(page,45);await waitStory(page,4);await assertStoryTarget(page,4);
  assert.equal(await page.locator('[data-orbit-story]').count(),8,'All eight groups remain native Framer siblings');
  for(const frame of [60,75,90,105,0,15,30,45]){
   await coveredClick(page,'Next view');await waitFrame(page,frame);const view=frame/15+1;await waitStory(page,view);await assertStoryTarget(page,view);
  }
  await coveredClick(page,'Previous view');await waitFrame(page,30);await waitStory(page,3);await assertStoryTarget(page,3);
  await coveredClick(page,'View 7');await waitFrame(page,90);await waitStory(page,7);await assertStoryTarget(page,7);await f.close();
 });
 await pass('orbit story delay survives decode updates and departure fades in its configured direction while inert',async()=>{
  const f=await fixture({storyOverlays:true,cleanFixture:true,gateDecodeIndices:[35],props:{startView:'orbit',storyDelay:.4,storyIn:.4,storyOut:.45,snapDuration:.7,storyView1:{enterFrom:'left',exitTo:'top',distance:48}}}),{page}=f;
  await waitFrame(page,0);await waitStory(page,1,'waiting');const waiting=await readStory(page,1);assert.equal(waiting.target,'true');assert.equal(waiting.inert,true);assert.equal(waiting.pointer,'none');assert.ok(waiting.x<0&&Math.abs(waiting.y)<1,'Entry begins to the left without changing Framer positioning');
  const arrived=await page.evaluate(()=>performance.now());await waitStory(page,1,'entering');assert.ok(await page.evaluate(()=>performance.now())-arrived<850,'Readiness notifications cannot keep restarting the reveal delay');await page.waitForTimeout(80);const entering=await readStory(page,1);assert.ok(entering.opacity>0&&entering.opacity<1);assert.ok(entering.x<0&&entering.x>-48);await waitStory(page,1);await page.getByRole('button',{name:'Story action 1',exact:true}).click();assert.equal(await page.evaluate(()=>window.storyClicks),1,'The native Framer CTA becomes usable after arrival');
  await coveredClick(page,'View 4');await page.waitForFunction(()=>document.querySelector('[data-admiral-orbit]')?.dataset.orbitState==='buffering');const leaving=await readStory(page,1);assert.equal(leaving.target,'false');assert.equal(leaving.state,'leaving');assert.equal(leaving.inert,true);assert.equal(leaving.pointer,'none');
  await page.waitForTimeout(100);const middle=await readStory(page,1);assert.ok(middle.opacity>0&&middle.opacity<1,'Departure has an actual opacity fade');assert.ok(middle.y<0&&Math.abs(middle.x)<1,'The outgoing view moves toward its independent top edge');
  const box=await page.locator('#story-1 button').boundingBox();await page.mouse.click(box.x+box.width/2,box.y+box.height/2);assert.equal(await page.evaluate(()=>window.storyClicks),1,'The fading CTA cannot receive interaction during buffering');
  await waitStory(page,1,'hidden');await page.evaluate(()=>window.releaseDecodeGates());await waitFrame(page,45);await waitStory(page,4);await assertStoryTarget(page,4);await f.close();
 });
 await pass('orbit story motion controls update without restarting the camera and stale arrivals cancel on Overview or unmount',async()=>{
  const f=await fixture({storyOverlays:true,storyAliases:true,cleanFixture:true,props:{startView:'orbit',orbitStartFrame:45,storyDelay:.02,storyIn:.04,storyOut:.04}}),{page}=f;await waitFrame(page,45);await waitStory(page,4);await waitBuffer(page,61);await page.waitForFunction(()=>Number(document.querySelector('[data-admiral-orbit]')?.dataset.orbitDecoded)===62);
  const baseline=await page.evaluate(()=>{window.storyCanvas=document.querySelector('[data-admiral-orbit] canvas');return {calls:window.nativeBitmapCalls,requests:window.sequenceRequests.length};});const requests=[...f.orbitRequests];
  await page.evaluate(()=>{window.props={...window.props,storyIn:.5,storyOut:.25,storyDelay:.75,editorOrbitView:'2',storyView5:{enterFrom:'right',exitTo:'bottom',distance:52}};window.renderTrial();});await page.waitForTimeout(250);assert.equal(Number((await orbitData(page)).orbitPosition),45);assert.equal(await page.evaluate(()=>window.storyCanvas===document.querySelector('[data-admiral-orbit] canvas')),true,'Changing overlay controls preserves the running engine and canvas');assert.equal(await page.evaluate(()=>window.nativeBitmapCalls),baseline.calls,'Overlay settings do not restart image decoding');assert.deepEqual(f.orbitRequests,requests);assert.equal((await readStory(page,4)).target,'true','Edited motion keeps the same physical camera eligible');
  await coveredClick(page,'Next view');await waitFrame(page,60);await waitStory(page,5,'waiting');assert.ok((await readStory(page,5)).x>0,'The edited next view uses its independent right-edge entry');await coveredClick(page,'Overview');await waitStage(page,'opening');await page.waitForTimeout(1350);assert.equal(await page.locator('[data-story-target="true"]').count(),0);assert.ok((await page.locator('[data-orbit-story]').evaluateAll(nodes=>nodes.map(node=>node.dataset.storyState))).every(state=>state==='hidden'),'Overview cancels the pending reveal completely');
  assert.equal(await page.locator('#intro').evaluate(element=>getComputedStyle(element).opacity),'1','BalatonfuredContent alias preserves opening content');await coveredClick(page,'Skip approach');await waitStage(page,'building');await page.waitForFunction(()=>Number(getComputedStyle(document.querySelector('#building')).opacity)>.99);assert.equal(await page.locator('#building').evaluate(element=>element.inert),false,'AranyhidContent alias preserves the arrival content');
  await coveredClick(page,'Explore building');await waitStage(page,'connection');await coveredClick(page,'Skip connection');await waitFrame(page,45);await waitStory(page,4,'waiting');await page.evaluate(()=>{window.detachedStory=document.querySelector('[data-orbit-story="4"]');window.root.unmount();});await page.waitForTimeout(30);const detached=await page.evaluate(()=>window.detachedStory.outerHTML);await page.waitForTimeout(1300);assert.equal(await page.evaluate(()=>window.detachedStory.outerHTML),detached,'An unmounted override has no delayed animation callback');await f.close();
 });
 await pass('orbit story static and reduced-motion previews are immediate and off-grid custom frames stay clear',async()=>{
  for(const setting of [{props:{orbitStartFrame:45},expected:4},{props:{orbitStartFrame:105},expected:8},{props:{orbitStartFrame:45,editorOrbitView:'2'},expected:2},{props:{orbitStartFrame:42},expected:0},{props:{orbitStartFrame:45,orbitStories:false},expected:0}]){
   const f=await fixture({storyOverlays:true,cleanFixture:true,staticMode:true,props:{editorView:'orbit',storyDelay:5,storyIn:5,...setting.props}}),{page}=f;await page.waitForTimeout(80);
   if(setting.expected){await assertStoryTarget(page,setting.expected);const active=await readStory(page,setting.expected);assert.equal(active.x,0);assert.equal(active.y,0);}else assert.equal(await page.locator('[data-story-target="true"]').count(),0);
   assert.equal(await page.evaluate(()=>window.nativeBitmapCalls),0,'Static native group preview does not start the orbit decoder');await f.close();
  }
  const f=await fixture({storyOverlays:true,cleanFixture:true,context:{reducedMotion:'reduce'},props:{startView:'orbit',orbitStartFrame:45,storyDelay:5,storyIn:5,storyOut:5}}),{page}=f;await waitFrame(page,45);await page.waitForTimeout(80);await assertStoryTarget(page,4);await coveredClick(page,'Next view');await waitFrame(page,60);await page.waitForTimeout(80);await assertStoryTarget(page,5);assert.equal((await readStory(page,4)).state,'hidden');await f.close();
  const custom=await fixture({storyOverlays:true,cleanFixture:true,props:{startView:'orbit',orbitStartFrame:42,storyDelay:.01,storyIn:.02,storyOut:.02}});await waitFrame(custom.page,42);await custom.page.waitForTimeout(150);assert.equal(await custom.page.locator('[data-story-target="true"]').count(),0,'A custom parked camera is not rounded into a mask or story checkpoint');await coveredClick(custom.page,'Next view');await waitFrame(custom.page,45);await waitStory(custom.page,4);await assertStoryTarget(custom.page,4);await custom.close();
 });
 await pass('orbit story phone gestures pass through native copy while the parked native CTA remains usable',async()=>{
  const f=await fixture({storyOverlays:true,cleanFixture:true,externalOverlay:true,context:{viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:2},props:{startView:'orbit',orbitStartFrame:45,phoneFraming:false,storyDelay:.02,storyIn:.05,storyOut:.15,snapDuration:.6}}),{page}=f;await waitFrame(page,45);await waitStory(page,4);await assertStoryTarget(page,4);const cdp=await page.context().newCDPSession(page),box=await page.locator('[data-story-fixture="4"]').boundingBox(),x=box.x+Math.min(70,box.width/2),y=box.y+box.height/2;
  await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x,y}]});await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:x-65,y}]});await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await page.waitForTimeout(50);assert.equal((await readStory(page,4)).inert,true);await waitFrame(page,60);await waitStory(page,5);await assertStoryTarget(page,5);await page.getByRole('button',{name:'Story action 5',exact:true}).tap();assert.equal(await page.evaluate(()=>window.storyClicks),1);assert.equal(await page.evaluate(()=>scrollY),0);assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'Native content and directional animations stay within the phone viewport');await f.close();
 });
 await pass('building content fades during SEQ_02 departure without hiding restored copy',async()=>{
  const readCopy=page=>page.evaluate(()=>Object.fromEntries(['intro','building','cta'].map(id=>{const element=document.getElementById(id),style=getComputedStyle(element);return [id,{opacity:Number(style.opacity),visibility:style.visibility,pointer:style.pointerEvents,inert:element.inert,hidden:element.getAttribute('aria-hidden')}];})));
  const readableBuilding=page=>page.waitForFunction(()=>['building','cta'].every(id=>Number(getComputedStyle(document.getElementById(id)).opacity)>.99));
  for(const phone of [false,true]){
   const f=await fixture({externalOverlay:true,context:phone?{viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:2}:{},props:{connectionDuration:3,maxSpeed:1}}),{page}=f;
   await coveredClick(page,'Skip approach');await waitStage(page,'building');await readableBuilding(page);await page.waitForTimeout(250);
   const before=await readCopy(page);assert.equal(before.building.visibility,'visible');assert.equal(before.cta.inert,false);
   if(phone){
    const box=await page.locator('#building').boundingBox(),x=box.x+Math.min(box.width/2,100),y=box.y+Math.min(box.height/2,40),cdp=await page.context().newCDPSession(page);
    await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x,y}]});await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x,y:y-90}]});await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
   }else await freshWheel(page,120);
   await waitStage(page,'connection');const early=await readCopy(page);
   for(const id of ['building','cta']){assert.ok(early[id].opacity>0,'Departing '+id+' remains visible initially');assert.equal(early[id].visibility,'visible');assert.equal(early[id].pointer,'none','Departing copy immediately stops intercepting input');assert.equal(early[id].inert,true);}
   assert.equal(early.intro.opacity,0,'The opening location text never flashes during SEQ_02');
   await page.waitForTimeout(170);const middle=await readCopy(page);
   for(const id of ['building','cta'])assert.ok(middle[id].opacity>0&&middle[id].opacity<early[id].opacity,'Departing '+id+' passes through a visibly intermediate opacity');
   await page.waitForTimeout(500);const end=await readCopy(page);
   for(const id of ['building','cta']){assert.equal(end[id].opacity,0,'Ongoing connector frames cannot restart the fade');assert.equal(end[id].visibility,'hidden');assert.equal(end[id].inert,true);}
   assert.equal(end.intro.opacity,0);assert.equal(await page.evaluate(()=>scrollY),0);
   if(!phone){
    await coveredClick(page,'Overview');await waitStage(page,'opening');await coveredClick(page,'Skip approach');await waitStage(page,'building');await readableBuilding(page);
    await coveredClick(page,'Explore building');await waitStage(page,'connection');await page.waitForTimeout(80);assert.ok((await readCopy(page)).building.opacity>0);
    await coveredClick(page,'Overview');await waitStage(page,'opening');assert.equal((await readCopy(page)).intro.opacity,1,'Overview restores the opening copy immediately');
    await coveredClick(page,'Skip approach');await waitStage(page,'building');await readableBuilding(page);await page.waitForTimeout(650);
    const restored=await readCopy(page);for(const id of ['building','cta']){assert.equal(restored[id].opacity,1,'An obsolete departure cannot hide restored '+id);assert.equal(restored[id].visibility,'visible');assert.equal(restored[id].inert,false);}assert.equal(restored.intro.opacity,0);
    await coveredClick(page,'Explore building');await waitStage(page,'connection');await page.waitForTimeout(80);assert.ok((await readCopy(page)).building.opacity>0);
    await page.emulateMedia({reducedMotion:'reduce'});await page.waitForTimeout(80);const reduced=await readCopy(page);
    for(const id of ['building','cta']){assert.equal(reduced[id].opacity,0,'Reduced motion removes departing copy without waiting for the fade');assert.equal(reduced[id].visibility,'hidden');assert.equal(reduced[id].inert,true);}assert.equal(reduced.intro.opacity,0);
   }
   await f.close();
  }
 });
 await pass('handoff presentation keeps the SEQ_01 image visible until SEQ_02 has decoded and drawn',async()=>{
  for(const phone of [false,true]){
   const f=await fixture({context:phone?{viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:2}:{},props:{duration:.6,connectionDuration:.6,maxSpeed:1}}),{page}=f;
   try{
    await coveredClick(page,'Skip approach');await waitStage(page,'building');await page.waitForFunction(()=>document.querySelector('[data-admiral-sequence] canvas').style.opacity==='1');
    await captureSequencePresentation(page);const before=await page.evaluate(()=>window.readSequencePresentation());
    await page.evaluate(()=>{window.gateSequenceDecodes('all');window.presentationSamples=[];window.handoffStarted=performance.now();});
    await coveredClick(page,'Explore building');await waitStage(page,'connection');await page.waitForFunction(()=>window.sequenceDecodeGateWaiters>0);await page.waitForTimeout(350);
    const pending=await page.evaluate(()=>window.presentationSamples.filter(sample=>sample.stage==='connection'));
    assertSamePaint(pending,before,(phone?'Phone':'Desktop')+' SEQ_01 → SEQ_02');
    assert.equal(await page.evaluate(()=>window.sequenceDraws.some(draw=>draw.time>=window.handoffStarted)),false,'The pending decoder has not supplied a replacement image yet');
    await page.evaluate(()=>window.releaseSequenceDecodeGates());await waitOrbit(page);
    assert.ok(await page.evaluate(()=>window.sequenceDraws.some(draw=>draw.sequence==='SEQ_02'&&draw.index===0&&draw.time>=window.handoffStarted)),'The new sequence paints its first connector image after the gate opens');
   }finally{await f.close();}
  }
 });
 await pass('handoff presentation keeps the connector endpoint visible while reverse return decodes SEQ_01',async()=>{
  const f=await fixture({props:{connectionDuration:2,maxSpeed:1}}),{page}=f;
  try{
   await coveredClick(page,'Skip approach');await waitStage(page,'building');await captureSequencePresentation(page);const building=await page.evaluate(()=>window.readSequencePresentation());
   await coveredClick(page,'Explore building');await waitConnectionFrame(page,10,40);
   await page.evaluate(()=>{window.gateSequenceDecodes('SEQ_01');window.presentationSamples=[];window.reverseStarted=performance.now();});
   await freshWheel(page,-120);await waitStage(page,'building');await page.waitForFunction(()=>window.sequenceDecodeGateWaiters>0);await page.waitForTimeout(350);
   const pending=await page.evaluate(()=>window.presentationSamples.filter(sample=>sample.stage==='building'));
   assert.ok(pending.length>0);assert.ok(pending[0].pixels.every((value,index)=>Math.abs(value-building.pixels[index])<=2),'The connector returned to the same building endpoint (independent AVIF decodes can round a channel by one)');
   assertSamePaint(pending,pending[0],'Reverse SEQ_02 → SEQ_01');
   await page.evaluate(()=>window.releaseSequenceDecodeGates());
   await page.waitForFunction(()=>window.sequenceDraws.some(draw=>draw.sequence==='SEQ_01'&&draw.index===64&&draw.activeSequence==='SEQ_01'&&draw.time>=window.reverseStarted));
   await freshWheel(page,-120);await waitStage(page,'opening');
   assert.equal(await page.locator('[data-admiral-sequence]').getAttribute('data-frame'),'0','The restored engine can still reverse all the way to the opening');
  }finally{await f.close();}
 });
 await pass('handoff presentation Overview resets to the opening poster instead of retaining a stale connector frame',async()=>{
  const f=await fixture({props:{connectionDuration:3,maxSpeed:1}}),{page}=f;
  try{
   await coveredClick(page,'Skip approach');await waitStage(page,'building');await coveredClick(page,'Explore building');await waitConnectionFrame(page,10,40);
   await page.evaluate(()=>window.gateSequenceDecodes('SEQ_01'));await coveredClick(page,'Overview');await waitStage(page,'opening');await page.waitForTimeout(150);
   const presentation=await page.locator('[data-admiral-sequence]').evaluate(root=>{const poster=root.querySelector('img'),canvas=root.querySelector('canvas');return {canvasOpacity:Number(getComputedStyle(canvas).opacity),posterOpacity:Number(getComputedStyle(poster).opacity),posterSource:poster.src,posterReady:poster.complete&&poster.naturalWidth>0};});
   assert.equal(presentation.canvasOpacity,0,'An explicit Overview reset hides the stale connector canvas');assert.equal(presentation.posterOpacity,1);assert.match(presentation.posterSource,/raw%20sequence00\.avif/);assert.equal(presentation.posterReady,true,'Overview shows the actual opening poster');
   await page.evaluate(()=>window.releaseSequenceDecodeGates());await page.waitForTimeout(150);assert.equal(await page.locator('[data-admiral-homepage]').getAttribute('data-homepage-stage'),'opening');
  }finally{await f.close();}
 });
 await pass('SEQ_02 full journey waits for a fresh scroll draws the connector endpoint and drains wheel momentum',async()=>{
  const f=await fixture({useDefaultOrbitStart:true,externalOverlay:true,props:{duration:.6,connectionDuration:.8,maxSpeed:1}}),{page}=f;
  await waitStage(page,'opening');assert.equal(await page.evaluate(()=>window.bitmapRecords.filter(record=>record.sequence==='SEQ_02').length),0,'Opening does not decode the connector');
  await page.mouse.wheel(0,120);await waitStage(page,'approach');await waitStage(page,'building');await page.waitForTimeout(300);
  assert.equal(await page.locator('[data-admiral-homepage]').getAttribute('data-homepage-stage'),'building','SEQ_01 completion waits at the building');
  assert.equal(await page.evaluate(()=>window.bitmapRecords.filter(record=>record.sequence==='SEQ_02').length),0,'Background connector downloads do not decode inactive images');
  await page.evaluate(()=>window.samples=[]);await freshWheel(page,120);await waitStage(page,'connection');
  assert.equal(await page.locator('[data-admiral-homepage]').getAttribute('data-active-sequence'),'SEQ_02');
  for(let index=0;index<85;index++){await page.mouse.wheel(0,60);await page.waitForTimeout(40);}
  await waitOrbit(page);assert.equal(Number((await orbitData(page)).orbitPosition),45,'Wheel momentum cannot rotate the newly entered orbit');assert.equal(await page.evaluate(()=>scrollY),0);
  const trace=await page.evaluate(()=>({samples:window.samples,draws:window.sequenceDraws,records:window.bitmapRecords}));
  assert.ok(trace.samples.some(sample=>sample.stage==='connection'&&sample.sequence==='SEQ_02'&&sample.heroFrame>1&&sample.heroFrame<73),'Connector advances through intermediate images');
  assert.ok(trace.draws.some(draw=>draw.sequence==='SEQ_02'&&draw.index===0),'First exported connector image is drawn');
  const final=trace.draws.find(draw=>draw.sequence==='SEQ_02'&&draw.index===72);assert.ok(final,'The actual final connector asset is drawn before handoff');
  const orbit=trace.samples.find(sample=>sample.stage==='orbit');assert.ok(orbit&&final.time<=orbit.time,'Orbit appears after the connector endpoint');
  assert.ok(trace.samples.filter(sample=>sample.stage==='connection').every(sample=>sample.heroDecoded<=16),'Desktop connector decoder remains bounded');
  assert.ok(trace.records.filter(record=>record.sequence==='SEQ_02').every(record=>!record.created||record.closed),'Connector bitmaps are released on orbit entry');
  assert.equal(new Set(f.connectionRequests).size,73,'All connector assets are fetched');
  await freshWheel(page,1);await waitFrame(page,60);await writeFile(new URL('seq02-journey.json',out),JSON.stringify(trace,null,2));await f.close();
 });
 await pass('SEQ_02 reverses to the building and a later fresh gesture can replay it',async()=>{
  const f=await fixture({useDefaultOrbitStart:true,props:{connectionDuration:4,maxSpeed:1}}),{page}=f;await page.getByRole('button',{name:'Skip approach',exact:true}).click();await waitStage(page,'building');
  await freshWheel(page,120);await waitConnectionFrame(page,8,40);await page.evaluate(()=>window.samples=[]);await freshWheel(page,-120);await waitStage(page,'building');
  assert.equal(await page.locator('[data-admiral-homepage]').getAttribute('data-active-sequence'),'SEQ_01');
  assert.match(await page.locator('[data-admiral-sequence] img').getAttribute('src'),/raw%20sequence64\.avif/,'Reversing returns to the SEQ_01 building endpoint');
  await page.waitForTimeout(300);assert.equal(await page.locator('[data-admiral-homepage]').getAttribute('data-homepage-stage'),'building');assert.ok((await page.evaluate(()=>window.samples)).every(sample=>sample.stage!=='opening'),'Restoring the building has no opening-stage flash');
  await freshWheel(page,-120);await waitStage(page,'approach');await waitStage(page,'opening');
  await page.getByRole('button',{name:'Skip approach',exact:true}).click();await waitStage(page,'building');
  await freshWheel(page,120);await waitStage(page,'connection');await page.getByRole('button',{name:'Skip connection',exact:true}).click();await waitFrame(page,45);await f.close();
 });
 await pass('SEQ_02 Overview cancels old callbacks and a new Explore activation survives',async()=>{
  const f=await fixture({useDefaultOrbitStart:true,props:{connectionDuration:3,maxSpeed:1}}),{page}=f;await page.getByRole('button',{name:'Skip approach',exact:true}).click();await waitStage(page,'building');await page.getByRole('button',{name:'Explore building',exact:true}).click();await waitConnectionFrame(page,3,55);
  await page.getByRole('button',{name:'Overview',exact:true}).click();await waitStage(page,'opening');await page.waitForTimeout(250);
  assert.equal(await page.locator('[data-admiral-homepage]').getAttribute('data-active-sequence'),'SEQ_01');assert.equal(await page.locator('[data-admiral-sequence]').getAttribute('data-frame'),'0');
  await page.getByRole('button',{name:'Skip approach',exact:true}).click();await waitStage(page,'building');await page.getByRole('button',{name:'Explore building',exact:true}).click();await waitStage(page,'connection');await page.getByRole('button',{name:'Skip connection',exact:true}).click();await waitFrame(page,45);
  await page.waitForTimeout(350);assert.equal(await page.locator('[data-admiral-homepage]').getAttribute('data-homepage-stage'),'orbit','A destroyed sequence cannot replace the newer activation');await f.close();
 });
 await pass('SEQ_02 slow downloads keep a useful image and failed assets retry with trial controls hidden',async()=>{
  const slow=await fixture({externalOverlay:true,delayConnection:180,props:{connectionDuration:.6,maxSpeed:1}});await coveredClick(slow.page,'Skip approach');await waitStage(slow.page,'building');await coveredClick(slow.page,'Explore building');await waitStage(slow.page,'connection');
  for(let index=0;index<5;index++){assert.ok(await slow.page.evaluate(()=>[...document.images].some(image=>image.complete&&image.naturalWidth>0&&getComputedStyle(image).opacity!=='0')||[...document.querySelectorAll('canvas')].some(canvas=>canvas.width>1&&canvas.getContext('2d')?.getImageData(5,5,1,1).data[3]>0)),'Slow connection keeps a rendered image');await slow.page.waitForTimeout(120);}
  assert.equal(await slow.page.evaluate(()=>scrollY),0);await waitOrbit(slow.page);await slow.close();
  for(const failure of [{failConnection:0},{corruptConnection:0}]){
   const f=await fixture({...failure,props:{showControls:false,duration:.6,connectionDuration:.6,maxSpeed:1}}),{page}=f;await page.mouse.wheel(0,120);await waitStage(page,'building');await page.locator('[data-admiral-homepage]').evaluate(root=>root.dispatchEvent(new CustomEvent('admiral:explore')));await waitStage(page,'connection');
   await page.getByRole('button',{name:'Retry connection',exact:true}).waitFor({timeout:25000});assert.equal(await page.locator('[data-admiral-sequence]').getAttribute('data-sequence-state'),'error');
   assert.equal(await page.locator('[data-admiral-homepage]').getAttribute('data-homepage-stage'),'connection','Connection error never silently skips the flight');
   f.restoreConnection();await page.getByRole('button',{name:'Retry connection',exact:true}).click();
   try{await waitOrbit(page);}catch(error){const state=await page.evaluate(()=>({root:{...document.querySelector('[data-admiral-homepage]').dataset},sequence:{...document.querySelector('[data-admiral-sequence]').dataset},samples:window.samples.slice(-60),records:window.bitmapRecords.filter(record=>record.sequence==='SEQ_02')}));await writeFile(new URL('seq02-retry-failure.json',out),JSON.stringify({failure,state},null,2));throw error;}
   assert.ok(await page.evaluate(()=>window.sequenceRequests.some(request=>request.sequence==='SEQ_02'&&request.index===0&&request.cache==='reload')),'An explicit retry refetches the failed source instead of reusing corrupt encoded bytes');await f.close();
  }
 });
 await pass('SEQ_02 phone swipe over building copy holds the page and parks at the configured orbit camera',async()=>{
  const f=await fixture({useDefaultOrbitStart:true,externalOverlay:true,context:{viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:2},props:{connectionDuration:.9,maxSpeed:1}}),{page}=f;await coveredClick(page,'Skip approach');await waitStage(page,'building');await page.waitForTimeout(250);
  const cdp=await page.context().newCDPSession(page);await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:180,y:430}]});await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:180,y:350}]});await waitStage(page,'connection');
  for(const y of [330,300,270,230,180]){await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:180,y}]});await page.waitForTimeout(80);}await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await waitFrame(page,45);
  assert.equal(await page.evaluate(()=>scrollY),0,'The connecting flight cannot pan the mobile page');assert.equal(Number((await orbitData(page)).orbitPosition),45);await page.waitForTimeout(250);assert.equal(Number((await orbitData(page)).orbitPosition),45,'The entry swipe cannot leave a queued orbit turn');
  const samples=await page.evaluate(()=>window.samples.filter(sample=>sample.stage==='connection'));assert.ok(samples.length>0&&samples.every(sample=>sample.heroDecoded<=12),'Phone connector decoder retains its smaller bounded cache');await f.close();
 });
 await pass('SEQ_02 static preview and direct orbit entry do not run a connecting decoder',async()=>{
  const staticView=await fixture({staticMode:true,props:{editorView:'connection'}});await staticView.page.waitForTimeout(200);assert.deepEqual([...new Set(staticView.connectionRequests)],[36]);assert.equal(await staticView.page.locator('[data-admiral-homepage]').getAttribute('data-homepage-stage'),'connection');assert.equal(await staticView.page.evaluate(()=>window.bitmapRecords.length),0);await staticView.close();
  const direct=await fixture({useDefaultOrbitStart:true,props:{startView:'orbit'}});await waitFrame(direct.page,45);await direct.page.waitForTimeout(350);assert.equal(direct.connectionRequests.length,0,'Direct orbit entry does not prefetch the unused connector');assert.equal(await direct.page.evaluate(()=>window.bitmapRecords.filter(record=>record.sequence==='SEQ_02').length),0);await direct.close();
 });
 await pass('apartment details desktop shows seven transparent localized preview columns and clears the toolbar',async()=>{
  for(const language of ['hu','en']){
   const f=await fixture({cleanFixture:true,externalOverlay:true,context:{viewport:{width:1440,height:900}},props:{startView:'orbit',orbitStartFrame:45,detailsMode:'preview',detailsLanguage:language,showControls:false}}),{page}=f;await waitOrbit(page);await waitDetails(page);
   assert.match(await page.locator(detailsSelector).innerText(),language==='hu'?/MINTA/:/SAMPLE/);
   assert.match(await apartmentField(page,'number'),/A\.204/);assert.match(await apartmentField(page,'area'),/66[,.]4/);assert.match(await apartmentField(page,'terrace'),/12[,.]8/);assert.match(await apartmentField(page,'garden'),/[—–]/);assert.match(await apartmentField(page,'rooms'),/3/);assert.match(await apartmentField(page,'availability'),language==='hu'?/Szabad/:/Available/);
   const layout=await page.locator(detailsSelector).evaluate(root=>{const fields=[...root.querySelectorAll('[data-apartment-field]')].map(field=>{const r=field.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height};});const styles=[root,...root.querySelectorAll('*')].map(element=>getComputedStyle(element));return {fields,styles:styles.map(style=>({pointer:style.pointerEvents,bg:style.backgroundColor,image:style.backgroundImage,shadow:style.boxShadow,blur:style.backdropFilter})),rule:styles.some(style=>parseFloat(style.borderTopWidth)>0&&parseFloat(style.borderTopWidth)<=1.5&&/^rgba?\(255,\s*255,\s*255/.test(style.borderTopColor))};});
   assert.equal(layout.fields.length,7);assert.ok(layout.fields.every((field,index)=>field.width>20&&(index===0||field.x>layout.fields[index-1].x)),'All seven columns share one desktop row');assert.ok(Math.max(...layout.fields.map(field=>field.y))-Math.min(...layout.fields.map(field=>field.y))<25);
   assert.ok(layout.styles.every(style=>style.pointer==='none'&&style.bg==='rgba(0, 0, 0, 0)'&&style.image==='none'&&style.shadow==='none'&&(!style.blur||style.blur==='none')),'Text and lines stay transparent and pass input through');assert.ok(layout.rule,'The strip has a thin white rule');
   if(language==='hu')await componentScreenshot(page,'apartment-details-desktop.png');
   await page.evaluate(()=>{window.props={...window.props,showControls:true};window.renderTrial();});await page.getByRole('button',{name:'Next view',exact:true}).waitFor();await page.waitForTimeout(150);
   const positions=await page.evaluate(()=>({panel:document.querySelector('[data-apartment-details]').getBoundingClientRect().top,controls:document.querySelector('[data-homepage-controls]').getBoundingClientRect().bottom}));assert.ok(positions.controls<=positions.panel-4,'Measured details height keeps the controls above the strip');
   const box=await page.locator(detailsSelector).boundingBox();await page.mouse.move(box.x+box.width/2,box.y+box.height/2);await page.mouse.wheel(0,1);await waitDetails(page,false);await waitFrame(page,60);await waitDetails(page);await f.close();
  }
 });
 await pass('apartment details phone layout stays inside the viewport and touch passes through its fields',async()=>{
  const f=await fixture({cleanFixture:true,context:{viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:2},props:{startView:'orbit',orbitStartFrame:45,detailsMode:'preview',showControls:false}}),{page}=f;await waitOrbit(page);await waitDetails(page);
  const boxes={};for(const field of apartmentFields){assert.equal(await page.locator(`[data-apartment-field="${field}"]`).isVisible(),true);boxes[field]=await page.locator(`[data-apartment-field="${field}"]`).boundingBox();assert.ok(boxes[field].x>=0&&boxes[field].x+boxes[field].width<=391,`${field} fits the phone viewport`);}
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'No horizontal page overflow');
  assert.ok(Math.abs(boxes.number.y-boxes.availability.y)<25&&Math.abs(boxes.number.y-boxes.floorplan.y)<25,'Apartment number, status and floorplan occupy the mobile header');
  assert.ok(['area','terrace','garden','rooms'].every(field=>boxes[field].y>boxes.number.y+25),'Four statistics occupy the second mobile row');
  await componentScreenshot(page,'apartment-details-mobile.png');
  const cdp=await page.context().newCDPSession(page),y=Math.min(820,boxes.area.y+boxes.area.height/2);await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:260,y}]});await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:200,y}]});await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await waitFrame(page,60);await waitDetails(page);assert.equal(await page.evaluate(()=>scrollY),0);await f.close();
 });
 await pass('apartment details preview appears only at orbit rest and static orbit editor',async()=>{
  const f=await fixture({props:{detailsMode:'preview'}}),{page}=f;await waitStage(page,'opening');assert.equal(await page.locator(detailsSelector+'[data-details-visible="true"]').count(),0);await page.mouse.wheel(0,100);await waitStage(page,'approach');assert.equal(await page.locator(detailsSelector+'[data-details-visible="true"]').count(),0);await page.getByRole('button',{name:'Skip approach',exact:true}).click();await waitStage(page,'building');assert.equal(await page.locator(detailsSelector+'[data-details-visible="true"]').count(),0);await page.getByRole('button',{name:'Explore building',exact:true}).click();await waitOrbit(page);await waitDetails(page);await page.getByRole('button',{name:'Overview',exact:true}).click();await waitStage(page,'opening');await waitDetails(page,false);await f.close();
  const editor=await fixture({staticMode:true,props:{editorView:'orbit',detailsMode:'preview'}});await waitDetails(editor.page);assert.equal(editor.floorplanRequests.length,0,'Schematic sample does not fetch a fake floorplan');assert.equal(await editor.page.evaluate(()=>window.bitmapRecords.length),0);await editor.close();
 });
 await pass('apartment details hover events require a real parked view and fresh selection after travel',async()=>{
  const f=await fixture({props:{startView:'orbit',orbitStartFrame:45,detailsMode:'hover',detailsLanguage:'en',snapDuration:.7}}),{page}=f;await waitOrbit(page);assert.equal(await page.locator(detailsSelector+'[data-details-visible="true"]').count(),0);assert.equal(f.floorplanRequests.length,0);
  const apartment={id:'test-503',number:'A.503',area:86,terrace:0,garden:null,rooms:4,availability:'reserved',floorplanUrl:'http://homepage.test/floorplan.svg'};
  await sendApartment(page,apartment);await waitDetails(page);assert.match(await apartmentField(page,'number'),/A\.503/);assert.match(await apartmentField(page,'availability'),/Reserved/);assert.doesNotMatch(await page.locator(detailsSelector).innerText(),/SAMPLE/);
  const image=page.locator('[data-apartment-field="floorplan"] img');assert.equal(await image.getAttribute('loading'),'lazy');await page.waitForFunction(()=>document.querySelector('[data-apartment-field="floorplan"] img')?.naturalWidth>0);assert.ok(f.floorplanRequests.length>0);
  await sendApartment(page,null);await waitDetails(page,false);await sendApartment(page,apartment);await waitDetails(page);
  await page.getByRole('button',{name:'Next view',exact:true}).click();await waitDetails(page,false);await sendApartment(page,{...apartment,number:'LATE'});await waitFrame(page,60);await page.waitForTimeout(100);assert.equal(await page.locator(detailsSelector+'[data-details-visible="true"]').count(),0,'A stale event during travel cannot reappear at arrival');
  await sendApartment(page,{...apartment,number:'A.603'});await waitDetails(page);assert.match(await apartmentField(page,'number'),/A\.603/);await sendApartment(page,null);await waitDetails(page,false);await f.close();
  const custom=await fixture({props:{startView:'orbit',orbitStartFrame:42,detailsMode:'hover'}});await waitOrbit(custom.page);await sendApartment(custom.page,apartment);assert.equal(await custom.page.locator(detailsSelector+'[data-details-visible="true"]').count(),0,'A custom off-grid pose has no selectable facade mask');await custom.close();
 });
 await pass('apartment details retain zeros missing values and long identifiers with a broken floorplan fallback',async()=>{
  const f=await fixture({brokenFloorplan:true,context:{viewport:{width:390,height:844},isMobile:true,hasTouch:true},props:{startView:'orbit',orbitStartFrame:45,detailsMode:'hover',detailsLanguage:'en',showControls:false}}),{page}=f;await waitOrbit(page);assert.equal(f.floorplanRequests.length,0);
  const number='ADMIRAL-PARK-BUILDING-A-APARTMENT-000000000204';await sendApartment(page,{number,area:0,terrace:null,garden:0,rooms:null,availability:'Coming soon — private release information',floorplanUrl:'http://homepage.test/floorplan.svg'});await waitDetails(page);
  assert.ok((await apartmentField(page,'number')).includes(number));assert.match(await apartmentField(page,'area'),/0/);assert.match(await apartmentField(page,'garden'),/[—–]/);assert.match(await apartmentField(page,'terrace'),/[—–]/);assert.match(await apartmentField(page,'rooms'),/[—–]/);
  await page.waitForFunction(()=>document.querySelector('[data-apartment-field="floorplan"]')?.textContent.includes('Unavailable'));assert.ok(f.floorplanRequests.length>0);assert.doesNotMatch(await page.locator(detailsSelector).innerText(),/NaN|undefined|null/);assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'Long user data cannot overflow the phone viewport');await f.close();
 });
 await pass('orbit start defaults to the fourth camera and preloads its nearest desktop and phone frames',async()=>{
  for(const setting of [{count:61},{count:31,context:{viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:2}}]){
   const f=await fixture({useDefaultOrbitStart:true,props:{startView:'orbit'},context:setting.context}),{page}=f;
   assert.equal(f.orbitRequests[0],45,'The first displayed orbit poster is the configured fourth camera');await waitOrbit(page);await waitBuffer(page,setting.count);
   const data=await orbitData(page);assert.equal(Number(data.orbitFrame),45);assert.equal(Number(data.orbitPosition),45);assert.equal(Number(data.orbitCheckpoint),3);assert.ok(Number(data.orbitDecoded)<=setting.count+1);
   const first=await page.evaluate(()=>window.bitmapRecords.filter(record=>Number.isFinite(record.index)&&record.width===Number(document.querySelector('[data-admiral-orbit]').dataset.orbitMotionWidth)).slice(0,12).map(record=>record.index));
   assert.ok(first.every(index=>Math.min(Math.abs(index-45),120-Math.abs(index-45))<=15),'Initial decoding prioritizes the configured camera instead of frame0');
   const idle=await page.evaluate(()=>window.samples.filter(sample=>sample.stage==='orbit'));assert.ok(idle.every(sample=>!['buffering','moving','settling'].includes(sample.state)&&sample.frame===45),'Entry parks directly at45 without a sampled0-to45 transition');
   await page.waitForTimeout(250);assert.equal(Number((await orbitData(page)).orbitFrame),45);
   await page.getByRole('button',{name:'Next view',exact:true}).click();await waitFrame(page,60);await waitBuffer(page,setting.count);await f.close();
  }
 });
 await pass('orbit start survives the full approach retry and Overview reentry at the chosen fourth camera',async()=>{
  const f=await fixture({useDefaultOrbitStart:true,failOrbit:45}),{page}=f;await waitStage(page,'opening');
  await page.getByRole('button',{name:'Skip approach',exact:true}).click();await waitStage(page,'building');await page.getByRole('button',{name:'Explore building',exact:true}).click();
  await page.waitForFunction(()=>document.querySelector('[data-admiral-orbit]')?.dataset.orbitState==='error');f.restoreOrbit();await page.getByRole('button',{name:'Retry orbit',exact:true}).click();await waitFrame(page,45);await waitBuffer(page,61);
  assert.equal(Number((await orbitData(page)).orbitCheckpoint),3);await page.getByRole('button',{name:'Next view',exact:true}).click();await waitFrame(page,60);
  await page.getByRole('button',{name:'Overview',exact:true}).click();await waitStage(page,'opening');await page.getByRole('button',{name:'Skip approach',exact:true}).click();await waitStage(page,'building');await page.getByRole('button',{name:'Explore building',exact:true}).click();await waitFrame(page,45);
  assert.equal(Number((await orbitData(page)).orbitPosition),45,'Reentry resets to the configured start instead of retaining the previous orbit pose');await f.close();
 });
 await pass('custom orbit start stays parked and preserves the fixed apartment checkpoint cameras',async()=>{
  for(const [button,target,checkpoint] of [['Next view',45,3],['Previous view',30,2]]){
   const f=await fixture({props:{startView:'orbit',orbitStartFrame:42}}),{page}=f;await waitOrbit(page);await waitBuffer(page,46);
   const data=await orbitData(page);assert.equal(Number(data.orbitFrame),42);assert.equal(Number(data.orbitCheckpoint),-1);assert.ok(Number(data.orbitDecoded)<=47);
   assert.equal(await page.getByText('Custom view',{exact:true}).isVisible(),true);
   await page.getByRole('button',{name:'Pause rotation',exact:true}).click();await waitOrbit(page,'paused');await page.getByRole('button',{name:'Continue rotation',exact:true}).click();await waitOrbit(page);
   assert.equal(Number((await orbitData(page)).orbitFrame),42,'Resuming a custom parked start cannot autoplay to a checkpoint');await page.waitForTimeout(250);assert.equal(Number((await orbitData(page)).orbitFrame),42);
   await page.getByRole('button',{name:button,exact:true}).click();await waitFrame(page,target);await waitBuffer(page,61);assert.equal(Number((await orbitData(page)).orbitCheckpoint),checkpoint);await f.close();
  }
 });
 await pass('editor orbit start previews only the requested frame without running a sequence',async()=>{
  for(const input of [undefined,119]){
   const f=await fixture({staticMode:true,useDefaultOrbitStart:input===undefined,props:{editorView:'orbit',...(input===undefined?{}:{orbitStartFrame:input})}}),{page}=f;
   await page.waitForTimeout(250);assert.deepEqual([...new Set(f.orbitRequests)],[input===undefined?45:119]);assert.equal(await page.evaluate(()=>window.bitmapRecords.length),0,'Editor preview creates no decoder engine');
   await page.mouse.wheel(0,100);await page.waitForTimeout(80);assert.equal(await page.locator('[data-admiral-homepage]').getAttribute('data-homepage-stage'),'orbit');await f.close();
  }
 });
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
