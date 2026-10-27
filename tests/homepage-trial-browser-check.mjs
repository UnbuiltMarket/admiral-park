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
const compilerOptions={target:ts.ScriptTarget.ES2020,module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.React};
const code=ts.transpileModule(source,{compilerOptions}).outputText;
const sharedCode=ts.transpileModule(await readFile(new URL('src/framer/AdmiralApartmentDetailCard.tsx',root),'utf8'),{compilerOptions}).outputText;
const listCode=ts.transpileModule(await readFile(new URL('src/framer/AdmiralApartmentList.tsx',root),'utf8'),{compilerOptions}).outputText;
const react=await readFile(path.join(path.dirname(requireDev.resolve('react/package.json')),'umd/react.development.js'),'utf8');
const dom=await readFile(path.join(path.dirname(requireDev.resolve('react-dom/package.json')),'umd/react-dom.development.js'),'utf8');
const heroes=await Promise.all(Array.from({length:65},(_,i)=>readFile(new URL('assets/images/AVIF 30_1920x1010 DESKTOP HERO SEQUENCE/'+encodeURIComponent(`raw sequence${String(i).padStart(2,'0')}.avif`),root))));
const connections=await Promise.all(Array.from({length:73},(_,i)=>readFile(new URL('assets/images/SEQ_02_V01/'+encodeURIComponent(`02 sequence${String(i).padStart(2,'0')} copy.avif`),root))));
const orbits=await Promise.all(Array.from({length:120},(_,i)=>readFile(new URL('assets/ORBIT PICKER/BEAUTY sequence_Desktop/'+encodeURIComponent(`adjusted sequence${String(i).padStart(4,'0')} copy.avif`),root))));
const masks=await Promise.all(Array.from({length:8},(_,i)=>readFile(new URL('assets/images/Mask full size 1920/'+encodeURIComponent(`mask_CMasking_WireColor${String(i*15).padStart(4,'0')}.png`),root))));
const apartmentMediaRoot=process.env.APARTMENT_MEDIA_ROOT||'G:/Egyéb számítógépek/Saját számítógép/UMA_visual/01_Projektek/2026-06-04_Balatonfüred/13_Repostory Admiral Park/assets/apartment-list';
const browser=await chromium.launch({headless:true,channel:process.env.PLAYWRIGHT_CHANNEL||'chrome'}),results=[];
const pause=ms=>new Promise(resolve=>setTimeout(resolve,ms));

async function fixture(options={}){
 const context=await browser.newContext({viewport:{width:1200,height:800},...options.context});
 const page=await context.newPage(),errors=[],heroRequests=[],connectionRequests=[],orbitRequests=[],maskRequests=[],floorplanRequests=[],apartmentRequests=[],apartmentMediaRequests=[],detailRequests=[],pdfLibraryRequests=[];
 let failHero=options.failHero,failIndex=options.failOrbit,corruptIndex=options.corruptOrbit,failConnection=options.failConnection,corruptConnection=options.corruptConnection,failMask=options.failMask,corruptMask=options.corruptMask,failApartment=!!options.failApartment,failDetails=!!options.failDetails,detailGateOpen=!options.gateDetails;const detailWaiters=[];
 page.on('pageerror',error=>errors.push(error.message));
 await page.route(/https:\/\/(?:cdn\.jsdelivr\.net|unpkg\.com)\/(?:npm\/)?(?:pdf-lib@1\.17\.1\/dist\/pdf-lib\.min\.js|@pdf-lib\/fontkit@1\.1\.1\/dist\/fontkit\.umd\.min\.js)(?:\?.*)?$/,async route=>{
  const url=route.request().url();pdfLibraryRequests.push(url);const name=url.includes('@pdf-lib/fontkit@')?'fontkit-1.1.1.umd.min.js':'pdf-lib-1.17.1.min.js';
  let body;try{body=await readFile(new URL('tmp/pdf-tools/'+name,root));}catch(error){if(error.code==='ENOENT')return route.continue();throw error;}
  return route.fulfill({contentType:'application/javascript',headers:{'Access-Control-Allow-Origin':'*'},body});
 });
 await page.route('http://homepage.test/**',async route=>{
  const url=new URL(route.request().url()),pathname=decodeURIComponent(url.pathname);
  if(pathname==='/apartments.json'){
   apartmentRequests.push(pathname);
   if(options.delayApartment)await pause(options.delayApartment);
   if(failApartment)return route.fulfill({status:503,body:'Deliberate apartment data outage'});
   const body=options.apartmentPayload===undefined?await readFile(new URL('data/apartments.json',root),'utf8'):JSON.stringify(options.apartmentPayload);
   return route.fulfill({contentType:'application/json',body});
  }
  if(pathname==='/apartment-details.json'){
   detailRequests.push(pathname);
   if(!detailGateOpen)await new Promise(resolve=>detailWaiters.push(resolve));
   if(options.delayDetails)await pause(options.delayDetails);
   if(failDetails)return route.fulfill({status:503,body:'Deliberate full detail data outage'});
   const body=options.detailPayload===undefined?await readFile(new URL('data/apartment-details.json',root),'utf8'):JSON.stringify(options.detailPayload);
   return route.fulfill({contentType:'application/json',body});
  }
  if(pathname.startsWith('/apartment-assets/')){
   apartmentMediaRequests.push(pathname);
   const relative=pathname.slice('/apartment-assets/'.length).replace(/^assets\//,'');
   assert.ok(!relative.split('/').includes('..'),'Apartment media route stays inside the read-only media directory');
   const file=path.join(apartmentMediaRoot,relative),extension=path.extname(file).toLowerCase(),contentType={'.webp':'image/webp','.png':'image/png','.svg':'image/svg+xml','.woff2':'font/woff2','.ttf':'font/ttf','.pdf':'application/pdf'}[extension]||'application/octet-stream';
   if(extension==='.ttf'){try{return route.fulfill({contentType,body:await readFile(new URL('assets/apartment-list/'+relative,root))});}catch(error){if(error.code!=='ENOENT')throw error;}}
   try{return route.fulfill({contentType,body:await readFile(file)});}catch(error){if(error.code!=='ENOENT')throw error;return route.fulfill({status:404,body:'Missing local studio media'});}
  }
  if(pathname==='/floorplan.svg'){
   floorplanRequests.push(pathname);
   if(options.brokenFloorplan)return route.fulfill({status:404,body:'Missing trial floorplan'});
   return route.fulfill({contentType:'image/svg+xml',body:'<svg xmlns="http://www.w3.org/2000/svg" width="240" height="160"><path fill="none" stroke="white" stroke-width="6" d="M10 10H230V150H10Z M90 10V110H230 M90 80H10"/></svg>'});
  }
  if(pathname.startsWith('/masks/')){
   const frame=Number(pathname.match(/WireColor(\d{4})\.png$/)?.[1]),index=frame/15;maskRequests.push(index);assert.ok(Number.isInteger(index)&&index>=0&&index<masks.length,'Mask requests identify a real checkpoint image');
   if(options.delayMask)await pause(options.delayMask);
   if(index===failMask)return route.fulfill({status:503,body:'Deliberate picking-mask outage'});
   if(index===corruptMask)return route.fulfill({contentType:'image/png',body:'Deliberately invalid picking mask'});
   return route.fulfill({contentType:'image/png',headers:{'Cache-Control':'public,max-age=3600'},body:masks[index]});
  }
  if(pathname.startsWith('/hero/')){
   const index=Number(pathname.match(/sequence(\d+)/)?.[1]);heroRequests.push(index);
   if(index===failHero)return route.fulfill({status:503,body:'Deliberate trial opening outage'});
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
  return route.fulfill({contentType:'text/html',body:'<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><style>html,body{margin:0;font:18px Arial;background:#0e1720}#stage{height:100svh;position:relative;overflow:hidden}.copy{position:absolute;left:6%;top:20%;max-width:650px;color:white;z-index:4}.cta{position:absolute;left:6%;top:65%;z-index:4}.cta a{display:inline-block;padding:18px;background:white;color:black}#navbar{position:fixed;z-index:50;top:8px;left:12px;display:flex;gap:12px}#nested{position:absolute;right:0;top:100px;width:110px;height:100px;overflow:auto;z-index:40;background:white}#native-input{position:absolute;right:5px;top:220px;z-index:40;width:95px}#external-framer-overlay{position:absolute;inset:0;z-index:20;pointer-events:auto}#external-framer-overlay>div{width:100%;height:100%}</style></head><body'+(options.externalOverlay||options.pageOverflow?' style="height:300vh"':'')+'><nav id="navbar"><a id="nav-link" href="#apartments">Apartments</a><button id="nav-button">Contact</button></nav><div id="mount"></div></body></html>'});
 });
 await page.goto(options.initialUrl||'http://homepage.test/');
 if(options.authoredCss)await page.addStyleTag({content:options.authoredCss});
 if(options.authoredPageStyles)await page.evaluate(()=>{document.documentElement.style.setProperty('overflow-y','scroll','important');document.documentElement.style.setProperty('overscroll-behavior-y','contain');document.body.style.setProperty('position','relative');document.body.style.setProperty('padding-right','9px','important');document.body.style.setProperty('overflow-y','auto');const properties=element=>Object.fromEntries([...element.style].sort().map(name=>[name,{value:element.style.getPropertyValue(name),priority:element.style.getPropertyPriority(name)}]));window.readFixturePageStyles=()=>({html:properties(document.documentElement),body:properties(document.body)});window.authoredPageStyles=window.readFixturePageStyles();});
 if(options.initialScroll)await page.evaluate(y=>scrollTo(0,y),options.initialScroll);
 await page.addScriptTag({content:react});await page.addScriptTag({content:dom});
 await page.evaluate(({code,sharedCode,listCode,listMode,bothEntries,props,staticMode,publicMode,twoInstances,externalOverlay,gateDecodeIndices,gateFirstNativeDecodes,accelerateDecodeWatchdog,useDefaultOrbitStart,useDefaultPhoneWidth,useDefaultOrbitLayout,cleanFixture,storyOverlays,storyAliases,tallStory,stageScale,stageWidth,stageHeight})=>{
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
   const response=await nativeFetch(...args);if(/\/apartments\.json(?:$|\?)/.test(url))window.apartmentJsonFetched=true;
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
  const stub={useIsStaticRenderer:()=>staticMode,RenderTarget:{canvas:'canvas',current:()=>staticMode?'canvas':'preview'},addPropertyControls:()=>{},ControlType:new Proxy({},{get:(_,name)=>name})};
  const moduleSources=new Map([['./AdmiralHomepageTrial.tsx',code],['./AdmiralApartmentDetailCard.tsx',sharedCode],['./AdmiralApartmentList.tsx',listCode]]),moduleCache=new Map();window.sharedCardLoads=0;
  const requireModule=name=>{
   if(name==='react')return React;if(name==='framer')return stub;
   if(!moduleSources.has(name))throw new Error('Unexpected Framer module '+name);
   if(moduleCache.has(name))return moduleCache.get(name).exports;
   const module={exports:{}};moduleCache.set(name,module);if(name==='./AdmiralApartmentDetailCard.tsx')window.sharedCardLoads++;
   new Function('module','exports','require',moduleSources.get(name))(module,module.exports,requireModule);return module.exports;
  };
  const module={exports:requireModule('./AdmiralHomepageTrial.tsx')};window.requireFramerModule=requireModule;window.sharedCardModule=requireModule('./AdmiralApartmentDetailCard.tsx');
  const Frame=React.forwardRef((props,ref)=>React.createElement('div',{...props,ref}));
  const Intro=module.exports[storyAliases?'BalatonfuredContent':'OpeningContent'](Frame),Building=module.exports[storyAliases?'AranyhidContent':'BuildingContent'](Frame),CTA=module.exports.ArrivalCTA(Frame);
  const Stories=storyOverlays?Array.from({length:8},(_,index)=>module.exports[`OrbitView${index+1}`](Frame)):[];
  window.component=module.exports.default;
  window.props={orbitLayout:'classic',useGitHubAssets:publicMode,heroBaseUrl:'http://homepage.test/hero',connectionBaseUrl:'http://homepage.test/connection',connectionDuration:.6,orbitBaseUrl:'http://homepage.test/orbit',orbitStartFrame:0,maskPicking:false,maskBaseUrl:'',apartmentDataUrl:'http://homepage.test/apartments.json',detailDataUrl:'http://homepage.test/apartment-details.json',apartmentAssetBase:'http://homepage.test/apartment-assets',previewApartmentId:'A001',detailsMode:'off',snapDuration:.3,phoneImageWidth:80,...props};
  if(useDefaultOrbitStart)delete window.props.orbitStartFrame;
  if(useDefaultPhoneWidth)delete window.props.phoneImageWidth;
  if(useDefaultOrbitLayout)delete window.props.orbitLayout;
  window.root=ReactDOM.createRoot(document.querySelector('#mount'));
  if(listMode){
   window.component=requireModule('./AdmiralApartmentList.tsx').default;
   window.props={dataUrl:'http://homepage.test/apartment-details.json',assetBaseUrl:'http://homepage.test/apartment-assets',pageUrl:'http://homepage.test/lista',...props};
   window.renderTrial=()=>window.root.render(React.createElement(React.StrictMode,null,bothEntries?React.createElement('section',{id:'stage',style:{position:'fixed',inset:0,zIndex:0}},React.createElement(module.exports.default,{useGitHubAssets:false,heroBaseUrl:'http://homepage.test/hero',connectionBaseUrl:'http://homepage.test/connection',orbitBaseUrl:'http://homepage.test/orbit',startView:'orbit',orbitStartFrame:0,showControls:false,detailsMode:'off',snapDuration:.3})):null,React.createElement('section',{id:'list-fixture',style:bothEntries?{position:'fixed',inset:0,zIndex:20,overflow:'auto'}:undefined},React.createElement(window.component,window.props))));window.renderTrial();return;
  }
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
 },{code,sharedCode,listCode,listMode:!!options.listMode,bothEntries:!!options.bothEntries,props:options.props||{},staticMode:!!options.staticMode,publicMode,twoInstances:!!options.twoInstances,externalOverlay:!!options.externalOverlay,gateDecodeIndices:options.gateDecodeIndices||[],gateFirstNativeDecodes:options.gateFirstNativeDecodes||0,accelerateDecodeWatchdog:!!options.accelerateDecodeWatchdog,useDefaultOrbitStart:!!options.useDefaultOrbitStart,useDefaultPhoneWidth:!!options.useDefaultPhoneWidth,useDefaultOrbitLayout:!!options.useDefaultOrbitLayout,cleanFixture:!!options.cleanFixture,storyOverlays:!!options.storyOverlays,storyAliases:!!options.storyAliases,tallStory:!!options.tallStory,stageScale:options.stageScale,stageWidth:options.stageWidth,stageHeight:options.stageHeight});
 if(options.listMode)await page.locator('[data-detail="A001"]').first().waitFor({state:'visible'});
 else{await page.waitForSelector('[data-admiral-homepage]');await page.waitForFunction(()=>[...document.images].some(image=>image.naturalWidth>0));}
 await page.mouse.move(450,500);
 return {context,page,errors,heroRequests,connectionRequests,orbitRequests,maskRequests,floorplanRequests,apartmentRequests,apartmentMediaRequests,detailRequests,pdfLibraryRequests,restoreHero(){failHero=undefined;},setApartmentPayload(value){options.apartmentPayload=value;},releaseDetails(){detailGateOpen=true;detailWaiters.splice(0).forEach(resolve=>resolve());},restoreDetails(){failDetails=false;},restoreApartment(){failApartment=false;},restoreOrbit(){failIndex=undefined;corruptIndex=undefined;},restoreMasks(){failMask=undefined;corruptMask=undefined;},restoreConnection(){failConnection=undefined;corruptConnection=undefined;},async close(){detailGateOpen=true;detailWaiters.splice(0).forEach(resolve=>resolve());if(options.props?.orbitLayout==='studio'){await page.screenshot({path:fileURLToPath(new URL('studio-last-state.png',out))}).catch(()=>{});await writeFile(new URL('studio-last-state.json',out),JSON.stringify(await page.evaluate(()=>({root:{...document.querySelector('[data-admiral-homepage]')?.dataset},studio:{...document.querySelector('[data-orbit-studio]')?.dataset},text:document.querySelector('[data-orbit-studio]')?.innerText})).catch(()=>({})),null,2));}await page.evaluate(()=>{window.releaseDecodeGates?.();window.releaseNativeDecodeGates?.();window.releaseSequenceDecodeGates?.();}).catch(()=>{});assert.deepEqual(errors,[]);await context.close();}};
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
async function pagePosition(page){return page.evaluate(()=>{const box=document.querySelector('[data-admiral-homepage]')?.getBoundingClientRect();return {x:scrollX,y:scrollY,sceneX:box?.x,sceneY:box?.y,bodyHeight:Math.max(document.body.scrollHeight,document.body.getBoundingClientRect().height,document.documentElement.scrollHeight)};});}
async function assertPageHeld(page,before,message){await page.waitForTimeout(160);const after=await pagePosition(page);for(const key of ['x','y','sceneX','sceneY'])assert.ok(Math.abs(after[key]-before[key])<1,message+' preserves '+key+': '+JSON.stringify({before,after}));}
async function phoneSwipe(page,{x,y,dx=0,dy=-90}){const cdp=await page.context().newCDPSession(page);await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x,y}]});for(const fraction of [.2,.4,.6,.8,1]){await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:x+dx*fraction,y:y+dy*fraction}]});await page.waitForTimeout(20);}await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});}
async function coveredClick(page,name){const box=await page.getByRole('button',{name,exact:true}).boundingBox();assert.ok(box,name);await page.mouse.click(box.x+box.width/2,box.y+box.height/2);}
const detailsSelector='[data-apartment-details]';
const apartmentFields=['number','area','terrace','garden','rooms','availability','floorplan'];
async function waitDetails(page,visible=true){await page.locator(detailsSelector+'[data-details-visible="true"]').waitFor({state:visible?'visible':'hidden'});}
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
const studioProps={orbitLayout:'studio',orbitBackground:'#fdfbfb',apartmentDataUrl:'http://homepage.test/apartments.json',detailDataUrl:'http://homepage.test/apartment-details.json',apartmentAssetBase:'http://homepage.test/apartment-assets',previewApartmentId:'A001',detailsMode:'preview',startView:'orbit',showControls:false,showViewpoints:false};
// Interior pixels independently audited from the real Corona PNGs. Each has a
// uniform 16px neighbourhood, so browser rounding cannot land on a mask edge.
const realMaskViews=[
 {frame:0,probe:{id:'B302',x:1235,y:200},second:{id:'B303',x:684,y:200},background:{x:980,y:597}},
 {frame:15,probe:{id:'C302',x:1261,y:295},second:{id:'C303',x:784,y:133},background:{x:942,y:628}},
 {frame:30,probe:{id:'C304',x:1276,y:320},second:{id:'C301',x:585,y:314},background:{x:924,y:578}},
 {frame:45,probe:{id:'C304',x:357,y:361},second:{id:'C205',x:367,y:517},background:{x:1065,y:505}},
 {frame:60,probe:{id:'B301',x:509,y:422},second:{id:'B304',x:1371,y:420},background:{x:933,y:330}},
 {frame:75,probe:{id:'A301',x:1519,y:374},second:{id:'A201',x:1510,y:533},background:{x:865,y:461}},
 {frame:90,probe:{id:'A301',x:488,y:382},second:{id:'A304',x:1412,y:382},background:{x:1011,y:557}},
 {frame:105,probe:{id:'A303',x:746,y:223},second:{id:'A302',x:1277,y:103},background:{x:943,y:646}},
];
const maskProps={...studioProps,maskPicking:true,maskBaseUrl:'http://homepage.test/masks'};
async function waitMask(page,checkpoint=0,state='ready'){await page.waitForFunction(({checkpoint,state})=>{const root=document.querySelector('[data-admiral-homepage]');return root?.dataset.orbitMaskState===state&&Number(root.dataset.orbitMaskCheckpoint)===checkpoint;},{checkpoint,state},{timeout:20000});}
async function projectMaskPoint(page,source){return page.locator('[data-admiral-homepage]').evaluate((root,source)=>{
 const full=root.dataset.orbitFullscreen==='true',plane=root.querySelector('[data-orbit-fullscreen-plane]'),surface=root.querySelector('[data-orbit-fullscreen-surface]'),box=root.getBoundingClientRect();
 const logicalWidth=full?plane.clientWidth:root.clientWidth,logicalHeight=full?plane.clientHeight:root.clientHeight;
 const view=full?{x:0,y:0,width:logicalWidth,height:logicalHeight}:{x:Number(root.dataset.imageX)*root.clientWidth/box.width,y:Number(root.dataset.imageY)*root.clientHeight/box.height,width:Number(root.dataset.imageWidth)*root.clientWidth/box.width,height:Number(root.dataset.imageHeight)*root.clientHeight/box.height};
 const focalX=(window.props.focalX??50)/100,focalY=(window.props.focalY??50)/100,scale=Math.max(view.width/1920,view.height/1010),lx=view.x+(view.width-1920*scale)*focalX+source.x*scale,ly=view.y+(view.height-1010*scale)*focalY+source.y*scale;
 let physical;if(full){const physicalBox=surface.getBoundingClientRect(),rotated=surface.dataset.orbitFullscreenRotated==='true';physical=rotated?{x:physicalBox.x+physicalBox.width-ly*physicalBox.width/logicalHeight,y:physicalBox.y+lx*physicalBox.height/logicalWidth}:{x:physicalBox.x+lx*physicalBox.width/logicalWidth,y:physicalBox.y+ly*physicalBox.height/logicalHeight};}else physical={x:box.x+lx*box.width/root.clientWidth,y:box.y+ly*box.height/root.clientHeight};
 return {...physical,lx,ly,logicalWidth,logicalHeight,inside:lx>view.x&&lx<view.x+view.width&&ly>view.y&&ly<view.y+view.height};
 },source);}
async function maskOverlayPixel(page,point){return page.locator('canvas[data-orbit-mask-overlay]').evaluate((canvas,point)=>{const x=Math.max(0,Math.min(canvas.width-1,Math.floor(point.lx/point.logicalWidth*canvas.width))),y=Math.max(0,Math.min(canvas.height-1,Math.floor(point.ly/point.logicalHeight*canvas.height)));return [...canvas.getContext('2d').getImageData(x,y,1,1).data];},point);}
async function waitMaskOverlay(page,point,visible){await page.waitForFunction(({point,visible})=>{const canvas=document.querySelector('canvas[data-orbit-mask-overlay]'),x=Math.max(0,Math.min(canvas.width-1,Math.floor(point.lx/point.logicalWidth*canvas.width))),y=Math.max(0,Math.min(canvas.height-1,Math.floor(point.ly/point.logicalHeight*canvas.height)));return (canvas.getContext('2d').getImageData(x,y,1,1).data[3]>0)===visible;},{point,visible},{timeout:5000});}
async function waitMaskAlpha(page,point,alpha){await page.waitForFunction(({point,alpha})=>{const canvas=document.querySelector('canvas[data-orbit-mask-overlay]'),x=Math.max(0,Math.min(canvas.width-1,Math.floor(point.lx/point.logicalWidth*canvas.width))),y=Math.max(0,Math.min(canvas.height-1,Math.floor(point.ly/point.logicalHeight*canvas.height)));return Math.abs(canvas.getContext('2d').getImageData(x,y,1,1).data[3]-alpha)<=1;},{point,alpha},{timeout:5000});}
async function assertActualMaskColour(page,probe,expected,message){const point=await projectMaskPoint(page,probe);await waitMaskOverlay(page,point,true);await page.waitForFunction(({point,expected})=>{const canvas=document.querySelector('canvas[data-orbit-mask-overlay]'),x=Math.max(0,Math.min(canvas.width-1,Math.floor(point.lx/point.logicalWidth*canvas.width))),y=Math.max(0,Math.min(canvas.height-1,Math.floor(point.ly/point.logicalHeight*canvas.height))),rgba=canvas.getContext('2d').getImageData(x,y,1,1).data;return expected.every((channel,index)=>Math.abs(rgba[index]-channel)<=4);},{point,expected},{timeout:1500}).catch(()=>{});const rgba=await maskOverlayPixel(page,point);assert.ok(expected.every((channel,index)=>Math.abs(rgba[index]-channel)<=4),message+' renders the requested actual canvas RGB: '+JSON.stringify({expected,actual:rgba}));return rgba;}
async function hoverRealMask(page,probe){const point=await projectMaskPoint(page,probe);assert.equal(point.inside,true,'The audited apartment pixel is visible through the current cover crop');await page.mouse.move(point.x,point.y);try{await page.waitForFunction(id=>document.querySelector('[data-admiral-homepage]')?.dataset.orbitMaskHovered===id,probe.id,{timeout:8000});}catch(error){const diagnostics=await page.evaluate(point=>{const root=document.querySelector('[data-admiral-homepage]'),controls="nav,header,a,button,input,textarea,select,option,[contenteditable]:not([contenteditable='false']),[role='button'],[role='link'],[role='dialog'],[data-orbit-ignore]";return {point,root:{...root.dataset},hit:document.elementsFromPoint(point.x,point.y).map(element=>element.outerHTML.slice(0,350)),covered:[...root.querySelectorAll(controls)].filter(element=>{const box=element.getBoundingClientRect(),css=getComputedStyle(element);return box.width>0&&box.height>0&&point.x>=box.x&&point.x<=box.right&&point.y>=box.y&&point.y<=box.bottom&&css.display!=='none'&&css.visibility==='visible'&&Number(css.opacity)!==0;}).map(element=>({tag:element.outerHTML.slice(0,500),style:element.getAttribute('style'),inert:!!element.closest('[inert],[hidden],[aria-hidden=true]')}))};},point);await writeFile(new URL('real-mask-hit-failure.json',out),JSON.stringify(diagnostics,null,2));throw error;}return point;}
async function tapRealMask(page,probe){const point=await projectMaskPoint(page,probe);assert.equal(point.inside,true,'The audited apartment pixel is visible in the phone image');await page.touchscreen.tap(point.x,point.y);return point;}
async function waitStudio(page,id='A001'){
 await waitOrbit(page);
 await page.waitForFunction(id=>{const studio=document.querySelector('[data-orbit-studio]'),plan=studio?.querySelector('[data-orbit-floorplan]'),parts=[...studio?.querySelectorAll('[data-orbitdata-transition]')||[]];return studio?.dataset.active==='true'&&studio.dataset.apartmentId===id&&plan?.complete&&plan.naturalWidth>0&&parts.every(element=>element.dataset.orbitdataDisplayedId===id&&Number(getComputedStyle(element).opacity)>.99&&!element.closest('[inert]'));},id,{timeout:20000});
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
async function assertDesktopStudioHierarchy(page,message){
 if(await page.locator('[data-orbit-studio]').getAttribute('data-layout')==='builder'){
  await assertBuilderTextFits(page,message);return;
 }
 const geometry=await page.locator('.orbit-studio-details').evaluate(panel=>{
  const box=element=>{const rect=element.getBoundingClientRect();return {x:rect.x,y:rect.y,width:rect.width,height:rect.height,right:rect.right,bottom:rect.bottom};};
  const parts=['.orbit-studio-heading','.orbit-studio-facts','.orbit-studio-apartment-footer'].map(selector=>box(panel.querySelector(selector)));
  const plan=box(panel.querySelector('.orbit-studio-plan-workspace')),summary=panel.querySelector('.orbit-studio-summary');
  const metrics=[...panel.querySelectorAll('.orbit-studio-areas > div')].map(cell=>{const range=document.createRange();range.selectNodeContents(cell.querySelector('dd'));return {cell:box(cell),fragments:[...range.getClientRects()].map(rect=>({x:rect.x,y:rect.y,right:rect.right,bottom:rect.bottom}))};});
  const price=panel.querySelector('.orbit-studio-price'),action=panel.querySelector('.orbit-studio-primary'),priceRange=document.createRange();priceRange.selectNodeContents(price);
  const status=panel.querySelector('.orbit-studio-status'),statusRange=document.createRange();if(status)statusRange.selectNodeContents(status);
  return {parts,plan,summary:summary?box(summary):null,status:status?box(status):null,statusText:status?box(statusRange):null,metrics,price:box(price),action:box(action),priceFragments:[...priceRange.getClientRects()].map(rect=>({x:rect.x,y:rect.y,right:rect.right,bottom:rect.bottom})),enlarge:box(panel.querySelector('.orbit-studio-drawing-toolbar > button')),viewport:{width:innerWidth,height:innerHeight}};
 });
 for(let i=0;i<geometry.parts.length-1;i++)assert.ok(geometry.parts[i].bottom<=geometry.parts[i+1].y+1,message+' keeps apartment identity, areas and actions in non-overlapping rows');
 if(geometry.viewport.width>=1180){assert.ok(geometry.summary,'The desktop has a dedicated apartment summary beside the drawing');assert.ok(geometry.plan.right<=geometry.summary.x+1,message+' places apartment details horizontally to the right of the floorplan');assert.ok(Math.min(geometry.plan.bottom,geometry.summary.bottom)-Math.max(geometry.plan.y,geometry.summary.y)>=Math.min(geometry.plan.height,geometry.summary.height)*.6,message+' aligns the drawing and details beside each other');}
 if(geometry.status){assert.ok(geometry.statusText.x>=geometry.status.x-1&&geometry.statusText.right<=geometry.status.right+1&&geometry.statusText.bottom<=geometry.status.bottom+1,message+' keeps complete availability text inside its field');if(geometry.summary?.width>0)assert.ok(geometry.status.right<=geometry.summary.right+1,message+' keeps availability inside the apartment summary');}
 for(const metric of geometry.metrics)for(const fragment of metric.fragments)assert.ok(fragment.x>=metric.cell.x-1&&fragment.right<=metric.cell.right+1&&fragment.bottom<=metric.cell.bottom+1,message+' keeps area values and units inside their own columns: '+JSON.stringify(metric));
 assert.ok(geometry.price.right<=geometry.action.x+1||geometry.action.right<=geometry.price.x+1||geometry.price.bottom<=geometry.action.y+1||geometry.action.bottom<=geometry.price.y+1,message+' keeps the price and primary action separated');
 for(const fragment of geometry.priceFragments)assert.ok(fragment.x>=geometry.price.x-1&&fragment.right<=geometry.price.right+1,message+' keeps the complete price readable inside its allocated space');
 assert.ok(geometry.enlarge.width>=40&&geometry.enlarge.height>=30&&geometry.enlarge.x>=0&&geometry.enlarge.y>=0&&geometry.enlarge.right<=geometry.viewport.width+1&&geometry.enlarge.bottom<=geometry.viewport.height+1,message+' keeps floorplan enlargement reachable');
}
const builderDataParts=['apartmentNumber','availability','areaInterior','areaTerrace','areaGarden','price','detailsButton','secondaryLinks','metadata'];
const builderParts=['orbit','floorplan','logo','filters',...builderDataParts];
let approvedBuilderLayoutPromise;
const approvedBuilderLayout=()=>approvedBuilderLayoutPromise||=readFile(new URL('docs/studio-layout-2026-10-26.json',root),'utf8').then(JSON.parse);
async function readBuilderFrames(page){return page.locator('[data-orbit-studio]').evaluate(studio=>{
 const root=studio.closest('[data-admiral-homepage]'),physical=root.getBoundingClientRect(),scaleX=physical.width/root.clientWidth,scaleY=physical.height/root.clientHeight;
 const box=element=>{const r=element.getBoundingClientRect();return {x:(r.x-physical.x)/scaleX,y:(r.y-physical.y)/scaleY,width:r.width/scaleX,height:r.height/scaleY,right:(r.right-physical.x)/scaleX,bottom:(r.bottom-physical.y)/scaleY};};
 const fontSelectors={apartmentNumber:'.orbit-studio-id',availability:'.orbit-studio-status',areaInterior:'dd',areaTerrace:'dd',areaGarden:'dd',price:'.orbit-studio-price-value',detailsButton:'.orbit-studio-primary',secondaryLinks:'.orbit-studio-text-button',metadata:'.orbit-studio-meta'};
 const parts={};for(const element of studio.querySelectorAll('[data-orbit-layout-part]')){
  const id=element.dataset.orbitLayoutPart,selector=fontSelectors[id],fontNode=selector?(element.matches(selector)?element:element.querySelector(selector)):null;
  const range=document.createRange();range.selectNodeContents(element);
  const fragments=[...range.getClientRects()].filter(r=>r.width>0&&r.height>0).map(r=>({x:(r.x-physical.x)/scaleX,y:(r.y-physical.y)/scaleY,right:(r.right-physical.x)/scaleX,bottom:(r.bottom-physical.y)/scaleY}));
  parts[id]={...box(element),fontSize:fontNode?parseFloat(getComputedStyle(fontNode).fontSize):null,fragments,text:element.textContent};
 }
 return {parts,width:root.clientWidth,height:root.clientHeight,physical:{x:physical.x,y:physical.y,width:physical.width,height:physical.height},scaleX,scaleY,overflow:document.documentElement.scrollWidth-innerWidth};
});}
function assertBuilderTextGeometry(geometry,message){
 for(const id of builderDataParts){const part=geometry.parts[id];assert.ok(part&&part.width>0&&part.height>0,message+' has independently placed '+id);
  for(const text of part.fragments)assert.ok(text.x>=part.x-2&&text.right<=part.right+2&&text.y>=part.y-2&&text.bottom<=part.bottom+2,message+' '+id+' keeps text inside its requested frame: '+JSON.stringify({part,text}));
 }
}
async function assertBuilderTextFits(page,message){assertBuilderTextGeometry(await readBuilderFrames(page),message);}
async function assertBuilderReference(page,mode,message){
 const approved=await approvedBuilderLayout(),expected=approved.layouts[mode],actual=await readBuilderFrames(page);
 assert.equal(actual.width,expected.referenceViewport.width,message+' uses the requested logical width');assert.equal(actual.height,expected.referenceViewport.height,message+' uses the requested logical height');
 for(const id of builderParts){const part=actual.parts[id],target=expected.elements[id];assert.ok(part&&target,message+' exposes requested '+id);
  for(const key of ['x','y','width','height'])assert.ok(Math.abs(part[key]-target[key])<2,message+' '+id+' '+key+' matches the builder: '+JSON.stringify({actual:part[key],expected:target[key]}));
  if(builderDataParts.includes(id))assert.ok(Math.abs(part.fontSize-target.fontSize)<.15,message+' '+id+' font size matches the builder: '+JSON.stringify({actual:part.fontSize,expected:target.fontSize}));
 }
 assert.equal(actual.overflow,0,message+' has no horizontal overflow');assertBuilderTextGeometry(actual,message);return actual;
}
function assertNaturalWidthMobileOrbit(geometry,message){
 const expectedHeight=geometry.root.width*1010/1920;
 assert.ok(Math.abs(geometry.viewport.x-geometry.root.x)<1,message+' image slot begins at the phone left edge: '+JSON.stringify(geometry.viewport));
 assert.ok(Math.abs(geometry.viewport.width-geometry.root.width)<1,message+' image slot fills 100% of the phone width: '+JSON.stringify(geometry.viewport));
 assert.ok(Math.abs(geometry.viewport.height-expectedHeight)<1,message+' reserves the complete natural image height: '+JSON.stringify(geometry.viewport));
 assert.ok(Math.abs(geometry.image.x)<1,message+' painted image starts at the left edge');
 assert.ok(Math.abs(geometry.image.width-geometry.root.width)<1,message+' paints the image across the whole phone width: '+JSON.stringify(geometry.image));
 assert.ok(Math.abs(geometry.image.height-expectedHeight)<1,message+' paints the full 1920:1010 image without a short contain box or distortion: '+JSON.stringify(geometry.image));
 assert.ok(Math.abs(geometry.image.y-(geometry.viewport.y-geometry.root.y))<1,message+' painted image aligns vertically with its natural-height slot');
}
async function studioField(page,name){return page.locator('[data-orbit-field="'+name+'"]').first().innerText();}
async function compactStudioGeometry(page){
 await page.evaluate(()=>document.fonts.ready);
 return page.locator(studioSelector).evaluate(studio=>{
  const bounds=element=>{if(!element)return null;const rect=element.getBoundingClientRect();return {x:rect.x,y:rect.y,width:rect.width,height:rect.height,right:rect.right,bottom:rect.bottom};};
  const visible=element=>!!element&&element.getClientRects().length>0&&getComputedStyle(element).visibility!=='hidden';
  const root=studio.closest('[data-admiral-homepage]'),details=studio.querySelector('[data-orbit-studio-details]');
  const fields=[...studio.querySelectorAll('[data-orbit-field]')].filter(visible).map(element=>{const range=document.createRange();range.selectNodeContents(element);return {name:element.dataset.orbitField,...bounds(element),text:bounds(range),align:getComputedStyle(element).textAlign,fontSize:getComputedStyle(element).fontSize,fontWeight:getComputedStyle(element).fontWeight};});
  const action=[...studio.querySelectorAll('.orbit-studio-primary[data-orbit-detail-link]')].find(visible),brand=studio.querySelector('.orbit-studio-brand'),heading=[...studio.querySelectorAll('.orbit-studio-id')].find(visible),opener=root.querySelector('[data-orbit-fullscreen-open]'),circle=opener?getComputedStyle(opener,'::before'):null;
  const circleWidth=circle?parseFloat(circle.width)+(circle.boxSizing==='border-box'?0:parseFloat(circle.borderLeftWidth)+parseFloat(circle.borderRightWidth)):0,circleHeight=circle?parseFloat(circle.height)+(circle.boxSizing==='border-box'?0:parseFloat(circle.borderTopWidth)+parseFloat(circle.borderBottomWidth)):0;
  const chips=[...root.querySelectorAll('[data-orbit-filter-status]')].filter(visible).map(element=>{const label=element.querySelector('.orbit-filter-status-label');return {id:element.dataset.orbitFilterStatus,...bounds(element),labelWidth:label?.clientWidth,labelScrollWidth:label?.scrollWidth};});
  return {root:bounds(root),studio:bounds(studio),details:bounds(details),summary:bounds(studio.querySelector('[data-orbit-mobile-summary]')),plan:bounds(studio.querySelector('[data-orbit-plan-crop]')),viewport:bounds(studio.querySelector('[data-orbit-viewport]')),brand:bounds(brand),action:bounds(action),actionText:action?.textContent?.trim(),visibleSelectors:[...studio.querySelectorAll('[data-orbit-apartment-select]')].filter(visible).length,fields,detailsScroll:{height:details?.scrollHeight,client:details?.clientHeight,top:details?.scrollTop},pageScroll:{x:scrollX,y:scrollY,width:document.documentElement.scrollWidth,viewport:innerWidth},heading:bounds(heading),headingText:heading?.textContent?.trim(),headingFont:heading?parseFloat(getComputedStyle(heading).fontSize):0,mobilePlanLabels:[...studio.querySelectorAll('.orbit-studio-mobile-eyebrow')].filter(visible).length,purchaseLabels:[...studio.querySelectorAll('.orbit-studio-mobile-actions .orbit-studio-label')].filter(visible).length,filterRow:bounds([...root.querySelectorAll('[data-orbit-filter-row]')].find(visible)),chips,opener:opener?{...bounds(opener),text:opener.textContent.trim(),label:opener.getAttribute('aria-label'),icons:opener.querySelectorAll('svg').length,circleWidth,circleHeight}:null};
 });
}
function assertCompactStudioFit(geometry,viewport,message){
 const within=(box,label)=>{assert.ok(box&&box.width>0&&box.height>0,message+' '+label+' is present');assert.ok(box.x>=geometry.root.x-1&&box.right<=geometry.root.right+1&&box.y>=geometry.root.y-1&&box.bottom<=geometry.root.bottom+1,message+' '+label+' is wholly inside the viewport: '+JSON.stringify(box));};
 within(geometry.viewport,'orbit');within(geometry.plan,'floorplan');within(geometry.action,'details button');within(geometry.brand,'brand');within(geometry.heading,'apartment number');
 assert.ok(geometry.detailsScroll.height<=geometry.detailsScroll.client+1,message+' has no hidden detail content or scrolling: '+JSON.stringify(geometry.detailsScroll));
 assert.ok(Math.abs(geometry.detailsScroll.top)<=1,message+' starts with the complete fixed detail view');
 assert.equal(geometry.pageScroll.width,geometry.pageScroll.viewport,message+' has no horizontal page overflow');
 assert.ok(Math.abs(geometry.brand.x+geometry.brand.width/2-(geometry.root.x+geometry.root.width/2))<2,message+' centres the brand independently from apartment information');
 assert.ok(geometry.plan.height>=(viewport.width<viewport.height?140:100),message+' gives the floorplan a useful reading size: '+JSON.stringify(geometry.plan));
 assert.equal(geometry.visibleSelectors,0,message+' has no visitor-facing apartment dropdown');
 assert.match(geometry.actionText,/Adatlap/,message+' labels the apartment action Adatlap');
 assert.equal(geometry.mobilePlanLabels,0,message+' omits the redundant Alaprajz heading');assert.equal(geometry.purchaseLabels,0,message+' omits the redundant purchase-price heading');assert.match(geometry.headingText,/^[ABC]\d{3}$/,message+' shows only the apartment number without a lakás suffix');
 within(geometry.filterRow,'filter row');assert.equal(geometry.chips.length,3,message+' exposes all three availability options');for(const chip of geometry.chips){within(chip,chip.id+' filter');assert.ok(Math.abs(chip.y-geometry.chips[0].y)<1,message+' keeps availability options in one row');assert.ok(chip.labelScrollWidth<=chip.labelWidth+1,message+' keeps the '+chip.id+' filter label readable without ellipsis');}
 if(geometry.opener){within(geometry.opener,'fullscreen opener');assert.ok(Math.abs(geometry.opener.width-44)<1&&Math.abs(geometry.opener.height-44)<1,message+' retains a 44px fullscreen touch target');assert.ok(Math.abs(geometry.opener.circleWidth-32)<1&&Math.abs(geometry.opener.circleHeight-32)<1,message+' limits the visible fullscreen circle to 32px');assert.equal(geometry.opener.text,'',message+' fullscreen control is icon only');assert.ok(geometry.opener.label&&geometry.opener.icons===1,message+' keeps an accessible fullscreen label and SVG icon');}
 if(viewport.width<viewport.height){
  within(geometry.summary,'apartment summary');assert.ok(geometry.brand.height>=40,message+' gives the centered logo more visual weight than the previous compact mark: '+JSON.stringify(geometry.brand));
  assert.ok(geometry.plan.right<=geometry.summary.x-4,message+' keeps the readable floorplan left of the apartment facts: '+JSON.stringify({plan:geometry.plan,summary:geometry.summary}));
  assert.ok(Math.min(geometry.plan.bottom,geometry.summary.bottom)-Math.max(geometry.plan.y,geometry.summary.y)>=Math.min(geometry.plan.height,geometry.summary.height)*.5,message+' aligns floorplan and facts beside each other');
  assert.ok(geometry.plan.y>=geometry.viewport.bottom-1&&geometry.summary.y>=geometry.viewport.bottom-1,message+' puts both detail columns below the orbit image');
  assert.ok(geometry.filterRow.bottom<=geometry.viewport.y+1,message+' puts the availability row above the orbit');
 }
 for(const name of ['area','terrace','garden','price','status',...(geometry.fields.some(item=>item.name==='rooms')?['rooms']:[])]){const field=geometry.fields.find(item=>item.name===name);within(field,name);within(field.text,name+' text');assert.ok(['left','start'].includes(field.align),message+' '+name+' is left aligned');assert.ok(field.text.x>=field.x-1&&field.text.right<=field.right+1,message+' '+name+' text fits its data column: '+JSON.stringify(field));}
 assert.ok(geometry.headingFont>=20,message+' keeps the apartment number stronger than supporting labels');
}
async function apartmentSelect(page,id){if(await page.locator('[data-orbit-studio][data-mobile="true"]').count())await clickApartment(page,id);else await page.locator('[data-orbit-apartment-select]').selectOption(id);await waitStudio(page,id);}
async function hoverStudioId(page,id){await page.locator('[data-admiral-homepage]').evaluate((root,id)=>root.dispatchEvent(new CustomEvent('admiral:apartment-hover',{detail:{id}})),id);await waitStudio(page,id);}

// Sample rendered opacity and retained content together. Merely finding a CSS
// transition would miss a record being removed before its fade can be painted.
async function traceOrbitdata(page,scope){await page.evaluate(scope=>{
 if(window.orbitdataFadeRaf)cancelAnimationFrame(window.orbitdataFadeRaf);
 window.orbitdataFadeSamples=[];
 const opacity=element=>{let value=1;for(let node=element;node instanceof HTMLElement;node=node.parentElement)value*=Number(getComputedStyle(node).opacity);return value;};
 const sample=()=>{const host=document.querySelector(scope),filters=host?.querySelector('[data-orbit-filters]')||[...document.querySelectorAll('[data-orbit-filters]')].find(element=>element.getBoundingClientRect().width>0&&getComputedStyle(element).visibility!=='hidden'&&opacity(element)>.01);window.orbitdataFadeSamples.push({time:performance.now(),filterOpacity:filters?opacity(filters):null,parts:[...host?.querySelectorAll('[data-orbitdata-transition]')||[]].map(element=>({id:element.dataset.orbitdataDisplayedId||'',phase:element.dataset.orbitdataPhase,opacity:opacity(element),text:element.textContent,plans:[...element.querySelectorAll('img')].map(image=>image.currentSrc||image.src),inert:!!element.closest('[inert]'),actions:[...element.querySelectorAll('button,a')].map(action=>({disabled:action.disabled===true,inert:!!action.closest('[inert]')}))}))});window.orbitdataFadeRaf=requestAnimationFrame(sample);};sample();
 },scope);}
async function stopOrbitdataTrace(page){return page.evaluate(()=>{cancelAnimationFrame(window.orbitdataFadeRaf);return window.orbitdataFadeSamples;});}
async function waitOrbitdataRecord(page,scope,id){await page.waitForFunction(({scope,id})=>{const parts=[...document.querySelector(scope)?.querySelectorAll('[data-orbitdata-transition]')||[]];return parts.length>0&&parts.every(element=>element.dataset.orbitdataDisplayedId===id&&Number(getComputedStyle(element).opacity)>.99&&!element.closest('[inert]'));},{scope,id});}
function assertOrbitdataSwap(samples,from,to,message){
 const parts=samples.flatMap(sample=>sample.parts.map(part=>({...part,time:sample.time})));
 assert.ok(parts.some(part=>part.id===from&&part.opacity>.03&&part.opacity<.97),message+' paints the previous record at intermediate fade-out opacity');
 assert.ok(parts.some(part=>part.id===to&&part.opacity>.03&&part.opacity<.97),message+' paints the new record at intermediate fade-in opacity');
 const firstNew=parts.find(part=>part.id===to&&part.opacity>.01)?.time;
 assert.ok(firstNew!==undefined,message+' reaches the next actual apartment');
 assert.ok(!parts.some(part=>part.time>firstNew&&part.id===from&&part.opacity>.01),message+' never flashes the old apartment back after the replacement appears');
 const stale=parts.filter(part=>part.id===from&&part.opacity>.03&&part.opacity<.97);
 assert.ok(stale.every(part=>part.actions.every(action=>action.disabled||action.inert)),message+' makes outgoing apartment actions inert immediately');
 assert.ok(samples.every(sample=>sample.filterOpacity===null||sample.filterOpacity>.99),message+' leaves the primary filters continuously visible');
}

async function readOrbitFilters(page){return page.locator('[data-admiral-homepage]').evaluate(root=>({active:root.dataset.orbitFilterActive==='true',criteria:JSON.parse(root.dataset.orbitFilterCriteria||'{}'),matchedIds:JSON.parse(root.dataset.orbitFilterMatches||'[]'),highlightIds:JSON.parse(root.dataset.orbitHighlightIds||'[]'),event:window.orbitFilterEvents?.at(-1)}));}
async function waitOrbitFilters(page,criteria){await page.waitForFunction(criteria=>{const root=document.querySelector('[data-admiral-homepage]');try{const current=JSON.parse(root?.dataset.orbitFilterCriteria||'{}');return JSON.stringify(current.statuses)===JSON.stringify(criteria.statuses)&&['priceMin','priceMax','areaMin','areaMax'].every(key=>(current[key]??null)===(criteria[key]??null));}catch{return false;}},criteria);await page.waitForTimeout(35);return readOrbitFilters(page);}
function expectedOrbitMatches(records,criteria){return records.filter(record=>(!criteria.statuses.length||criteria.statuses.includes(record.status))&&(criteria.priceMin==null||Number.isFinite(record.price)&&record.price>=criteria.priceMin)&&(criteria.priceMax==null||Number.isFinite(record.price)&&record.price<=criteria.priceMax)&&(criteria.areaMin==null||Number.isFinite(record.areaInterior)&&record.areaInterior>=criteria.areaMin)&&(criteria.areaMax==null||Number.isFinite(record.areaInterior)&&record.areaInterior<=criteria.areaMax)).map(record=>record.id);}
function assertOrbitFilterState(state,criteria,records,message,{event=true,highlights=true}={}){
 const active=criteria.statuses.length>0||['priceMin','priceMax','areaMin','areaMax'].some(key=>criteria[key]!=null),matchedIds=expectedOrbitMatches(records,criteria);
 assert.equal(state.active,active,message+' publishes whether criteria are active');assert.deepEqual(state.criteria,criteria,message+' publishes canonical criteria');assert.deepEqual(state.matchedIds,matchedIds,message+' matches the independent JSON filter');if(highlights)assert.deepEqual(state.highlightIds,active?matchedIds:[],message+' publishes only the intended highlight IDs');
 if(event){assert.ok(state.event,message+' emits the filter-change integration event');assert.equal(state.event.version,1);for(const key of ['statuses','priceMin','priceMax',...('areaMin'in criteria||'areaMax'in criteria?['areaMin','areaMax']:[])])assert.deepEqual(state.event[key],criteria[key],message+' event includes '+key);assert.equal(state.event.criteriaActive,active);assert.deepEqual(state.event.matchedIds,matchedIds);assert.deepEqual(state.event.highlightIds,state.highlightIds);}
 return matchedIds;
}
async function setOrbitPrice(page,side,value){const input=page.locator('[data-orbit-price-'+side+']:visible');await input.focus();await input.press('Home');const start=Number(await input.inputValue()),step=Number(await input.getAttribute('step')),steps=Math.abs(value-start)/step;assert.ok(Number.isInteger(steps)&&steps<600,'The requested test range uses valid native slider steps');for(let index=0;index<steps;index++)await input.press(value>start?'ArrowRight':'ArrowLeft');assert.equal(Number(await input.inputValue()),value,'The native '+side+' price slider reaches the requested HUF value');}
async function orbitPriceGeometry(page){return page.locator('[data-orbit-price-stage]:visible').evaluate(stage=>{const box=stage.getBoundingClientRect(),low=stage.querySelector('[data-orbit-price-min]'),high=stage.querySelector('[data-orbit-price-max]');return {x:box.x,y:box.y,width:box.width,height:box.height,minimum:Number(low.min),maximum:Number(low.max),low:Number(low.value),high:Number(high.value)};});}
function orbitPricePoint(geometry,value){return {x:geometry.x+12+(geometry.width-24)*(value-geometry.minimum)/(geometry.maximum-geometry.minimum),y:geometry.y+geometry.height/2};}
async function dragOrbitPrice(page,side,value){const geometry=await orbitPriceGeometry(page),from=orbitPricePoint(geometry,geometry[side==='min'?'low':'high']),to=orbitPricePoint(geometry,value);await phoneSwipe(page,{...from,dx:to.x-from.x,dy:0});await page.waitForTimeout(40);return orbitPriceGeometry(page);}
async function orbitRangeGeometry(page,kind){return page.locator('[data-orbit-'+kind+'-stage]:visible').evaluate((stage,kind)=>{const box=stage.getBoundingClientRect(),low=stage.querySelector('[data-orbit-'+kind+'-min]'),high=stage.querySelector('[data-orbit-'+kind+'-max]'),surface=stage.closest('[data-orbit-fullscreen-surface]');return {x:box.x,y:box.y,width:box.width,height:box.height,logicalWidth:stage.offsetWidth,rotated:surface?.dataset.orbitFullscreenRotated==='true',minimum:Number(low.min),maximum:Number(low.max),step:Number(low.step),low:Number(low.value),high:Number(high.value)};},kind);}
function orbitRangePoint(geometry,value){const ratio=(value-geometry.minimum)/(geometry.maximum-geometry.minimum),span=geometry.rotated?geometry.height:geometry.width,inset=12*span/geometry.logicalWidth,distance=inset+(span-2*inset)*ratio;return geometry.rotated?{x:geometry.x+geometry.width/2,y:geometry.y+distance}:{x:geometry.x+distance,y:geometry.y+geometry.height/2};}
async function dragOrbitRange(page,kind,side,value){const geometry=await orbitRangeGeometry(page,kind),from=orbitRangePoint(geometry,geometry[side==='min'?'low':'high']),to=orbitRangePoint(geometry,value);await phoneSwipe(page,{...from,dx:to.x-from.x,dy:to.y-from.y});await page.waitForTimeout(40);return orbitRangeGeometry(page,kind);}
async function setOrbitRangeKeyboard(page,kind,side,value){const input=page.locator('[data-orbit-'+kind+'-'+side+']:visible');await input.focus();await input.press('Home');const start=Number(await input.inputValue()),step=Number(await input.getAttribute('step')),steps=Math.abs(value-start)/step;assert.ok(Number.isInteger(steps)&&steps<600,'The requested '+kind+' range uses valid native steps');for(let index=0;index<steps;index++)await input.press(value>start?'ArrowRight':'ArrowLeft');assert.equal(Number(await input.inputValue()),value,'Native '+kind+' keyboard control reaches the requested value');return orbitRangeGeometry(page,kind);}
async function primaryFilterGeometry(page){return page.locator('[data-orbit-filters]:visible').evaluate(root=>{const box=element=>{if(!element)return null;const rect=element.getBoundingClientRect();return {x:rect.x,y:rect.y,right:rect.right,bottom:rect.bottom,width:rect.width,height:rect.height};};const buttons=[...root.querySelectorAll('[data-orbit-filter-status],[data-orbit-price-toggle],[data-orbit-area-toggle]')].map(element=>{const label=element.querySelector('.orbit-filter-status-label');return {kind:element.dataset.orbitFilterStatus||(element.hasAttribute('data-orbit-price-toggle')?'price':'area'),text:element.textContent.trim(),...box(element),fontSize:parseFloat(getComputedStyle(element).fontSize),labelWidth:label?.clientWidth,labelScrollWidth:label?.scrollWidth};});return {root:box(root),row:box(root.querySelector('[data-orbit-filter-row]')),buttons};});}
async function assertRangeAboveScene(page,kind){const painted=await page.locator('[data-orbit-'+kind+'-popover]:visible').evaluate(panel=>{const box=panel.getBoundingClientRect(),x=box.x+box.width/2,y=box.y+box.height/2,stack=document.elementsFromPoint(x,y),first=stack.find(element=>element.closest('[data-orbit-filters]')||element.matches('[data-orbit-fullscreen-plane] > canvas'));return {panelAbove:!!first?.closest('[data-orbit-filters]'),stack:stack.map(element=>element.tagName+':'+element.className),box:{x:box.x,y:box.y,width:box.width,height:box.height}};});assert.equal(painted.panelAbove,true,'The '+kind+' popover paints above the orbit canvas, including beneath passive Framer covers: '+JSON.stringify(painted));}
// Physical coordinates intentionally bypass Playwright's target-actionability
// check: a passive Framer sibling may cover these otherwise native controls.
async function orbitControlPoint(page,selector){const target=page.locator(selector+':visible');assert.equal(await target.count(),1,'Exactly one visible control exists for '+selector);const box=await target.boundingBox();return {x:box.x+box.width/2,y:box.y+box.height/2};}
async function activateOrbitControl(page,selector,mobile){const point=await orbitControlPoint(page,selector);if(mobile)await page.touchscreen.tap(point.x,point.y);else await page.mouse.click(point.x,point.y);return point;}
const statusControlProbes={available:{id:'B302',x:1235,y:200},under_negotiation:{id:'B006',x:410,y:367},sold:{id:'B105',x:606,y:380}};
const statusHighlightRGB={available:[70,166,106],under_negotiation:[226,184,73],sold:[218,89,97]};
async function assertStatusMaskPixels(page,statuses){for(const [status,probe]of Object.entries(statusControlProbes)){const point=await projectMaskPoint(page,probe);assert.equal(point.inside,true,'The audited '+status+' facade pixel is visible');await waitMaskOverlay(page,point,statuses.includes(status));const rgba=await maskOverlayPixel(page,point);if(statuses.includes(status))assert.ok(statusHighlightRGB[status].every((channel,index)=>Math.abs(rgba[index]-channel)<=4),'The '+status+' apartment uses its availability colour: '+JSON.stringify(rgba));else assert.equal(rgba[3],0,'The '+status+' apartment remains unlit');}}

const cardSelector='[data-orbit-detail-card]';
async function clickApartment(page,id){await page.locator('[data-admiral-homepage]').evaluate((root,id)=>root.dispatchEvent(new CustomEvent('admiral:apartment-click',{detail:{id}})),id);}
async function waitApartmentCard(page,id='A001'){
 const card=page.locator('#detail-dialog');await card.waitFor({state:'visible'});assert.equal(await card.getAttribute('data-apartment'),id);
 await card.locator('.detail-plan-image').evaluate(image=>image.decode());return card;
}
async function closeApartmentCard(page){await page.locator('#detail-dialog').getByRole('button',{name:'Bezárás',exact:true}).click();await page.locator('#detail-dialog').waitFor({state:'hidden'});await waitOrbit(page);}
function assertSameCamera(before,after,message){for(const key of ['orbitPosition','orbitFrame','orbitTarget'])assert.equal(after[key],before[key],message+' retains '+key);}

let pdfParserPromise;
async function inspectApartmentPdf(download,id,suffix=''){
 assert.equal(download.suggestedFilename(),`Admiral-Park-${id}-adatlap.pdf`);
 const target=new URL(`apartment-card-${id}${suffix}.pdf`,out);await download.saveAs(fileURLToPath(target));
 const bytes=await readFile(target);assert.equal(bytes.subarray(0,5).toString(),'%PDF-','Download is an actual PDF document');
 assert.ok(bytes.length>15000,'The floorplan and branding are embedded in the document');assert.ok(bytes.length<2000000,'The individual card stays comfortably below two megabytes');
 if(!pdfParserPromise){const folder=path.dirname(require.resolve(process.env.PLAYWRIGHT_MODULE_PATH||'playwright'));pdfParserPromise=import(pathToFileURL(process.env.PDFJS_MODULE_PATH||require.resolve('pdfjs-dist/legacy/build/pdf.mjs',{paths:[folder]})).href);}
 const {getDocument}=await pdfParserPromise,document=await getDocument({data:new Uint8Array(bytes),useSystemFonts:true}).promise;
 try{
  assert.equal(document.numPages,1,'The complete apartment card fits on one page');
  const pdfPage=await document.getPage(1),view=pdfPage.view;
  assert.ok(view[2]-view[0]>view[3]-view[1],'Phone and desktop downloads share a readable landscape layout');
  const content=await pdfPage.getTextContent(),text=content.items.map(item=>item.str||'').join(' ').replace(/\s+/g,' ');
  assert.ok(text.includes(id),'The PDF contains the selected apartment ID as selectable text');
  for(const item of content.items){if(!item.str?.trim())continue;const x=item.transform[4],y=item.transform[5];assert.ok(x>=view[0]-1&&x+item.width<=view[2]+1&&y>=view[1]-1&&y<=view[3]+1,`Selectable text fits inside the card page: ${item.str}`);}
  return {text,view,bytes:bytes.length};
 }finally{await document.destroy();}
}

const storySelector=view=>`[data-orbit-story="${view}"]`;
async function waitStory(page,view,state='visible'){
 await page.waitForFunction(({view,state})=>document.querySelector(`[data-orbit-story="${view}"]`)?.dataset.storyState===state,{view,state},{timeout:12000});
}
async function readStory(page,view){return page.locator(storySelector(view)).evaluate(element=>{const style=getComputedStyle(element),parts=style.translate==='none'?['0','0']:style.translate.split(' ');return {state:element.dataset.storyState,target:element.dataset.storyTarget,opacity:Number(style.opacity),x:parseFloat(parts[0])||0,y:parseFloat(parts[1])||0,inert:element.inert,pointer:style.pointerEvents,visibility:style.visibility,hidden:element.getAttribute('aria-hidden')};});}
async function assertStoryTarget(page,view){
 assert.deepEqual(await page.locator('[data-orbit-story][data-story-target="true"]').evaluateAll(nodes=>nodes.map(node=>Number(node.dataset.orbitStory))),[view],'Only the native group for this exact physical camera is eligible');
 const active=await readStory(page,view);assert.equal(active.state,'visible');assert.equal(active.opacity,1);assert.equal(active.inert,false);
}

// External Framer navigation is intentionally authored outside the code component.
async function addHomeNavigation(page,href='/',attributes={}){
 await page.evaluate(({href,attributes})=>{const old=document.querySelector('#home-reset-link');old?.remove();const link=document.createElement('a');link.id='home-reset-link';link.href=href;link.textContent='Kezdőlap';link.addEventListener('click',()=>window.homeResetMenuClosures=(window.homeResetMenuClosures||0)+1);for(const [name,value]of Object.entries(attributes))link.setAttribute(name,value);document.querySelector('#navbar').prepend(link);window.homeResetDocument ||= {};}, {href,attributes});
 return page.locator('#home-reset-link');
}
async function assertOpeningReset(page,message){
 await page.waitForFunction(()=>{const root=document.querySelector('[data-admiral-homepage]'),poster=root?.querySelector('[data-admiral-sequence] img');return root?.dataset.homepageStage==='opening'&&poster?.complete&&poster.naturalWidth>0;},null,{timeout:2500});
 const state=await page.locator('[data-admiral-homepage]').evaluate(root=>{const sequence=root.querySelector('[data-admiral-sequence]'),poster=sequence.querySelector('img'),canvas=sequence.querySelector('canvas');return {stage:root.dataset.homepageStage,sequence:root.dataset.activeSequence,frame:Number(sequence.dataset.frame),posterOpacity:Number(getComputedStyle(poster).opacity),posterReady:poster.complete&&poster.naturalWidth>0,posterSource:poster.src,canvasOpacity:Number(getComputedStyle(canvas).opacity),scrollY,documentRetained:!!window.homeResetDocument,menuClosed:window.homeResetMenuClosures>0};});
 assert.equal(state.stage,'opening',message+' returns to the opening stage');assert.equal(state.sequence,'SEQ_01',message+' restores SEQ_01');assert.equal(state.frame,0,message+' restores the first image');assert.equal(state.posterOpacity,1,message+' shows the first poster');assert.equal(state.posterReady,true,message+' has a decoded opening poster');assert.match(state.posterSource,/raw%20sequence00\.avif/,message+' uses the actual opening asset');assert.equal(state.canvasOpacity,0,message+' hides stale motion imagery');assert.equal(state.scrollY,0,message+' restores page top');assert.equal(state.documentRetained,true,message+' resets without reloading the document');assert.equal(state.menuClosed,true,message+' still lets the authored Home bubble handler close its menu');
}

async function installCompactCheckpointTrace(page,{details,filters,brand}){
 await page.evaluate(({details,filters,brand})=>{
  const root=document.querySelector('[data-admiral-homepage]'),panel=root.querySelector(details),bar=filters?root.querySelector(filters):null,mark=brand?root.querySelector(brand):null;
  const opacity=element=>{if(!element)return null;let value=1;for(let current=element;current&&current!==root;current=current.parentElement)value*=Number(getComputedStyle(current).opacity);return value;};
  const inert=element=>!!element?.closest('[inert],[aria-hidden="true"]');
  const box=element=>{const r=element.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height};};
  window.compactCheckpointCanvas=root.querySelector('[data-orbit-fullscreen-plane] > canvas:not([data-orbit-mask-overlay])');window.compactCheckpointPlan=panel?.querySelector('img');window.compactCheckpointSamples=[];clearInterval(window.compactCheckpointTimer);
  window.compactCheckpointTimer=setInterval(()=>{const canvas=root.querySelector('[data-orbit-fullscreen-plane] > canvas:not([data-orbit-mask-overlay])');window.compactCheckpointSamples.push({time:performance.now(),state:root.dataset.orbitState,frame:Number(root.dataset.orbitFrame),panelOpacity:opacity(panel),filterOpacity:opacity(bar),brandOpacity:opacity(mark),panelInert:inert(panel),filterInert:inert(bar),sceneOpacity:opacity(canvas),root:box(root),canvas:canvas?box(canvas):null,canvasWidth:canvas?.width,canvasHeight:canvas?.height,sameCanvas:canvas===window.compactCheckpointCanvas,samePlan:panel?.querySelector('img')===window.compactCheckpointPlan,planCount:panel?.querySelectorAll('img').length,panelText:panel?.textContent});},16);
 },{details,filters,brand});
}
function assertCompactCheckpointTrace(samples,message,{filters=true,brand=false}={}){
 const moving=samples.filter(sample=>['buffering','moving','settling'].includes(sample.state)),committed=moving.filter(sample=>sample.time-moving[0].time>=40);
 assert.ok(moving.length>10,message+' records a complete automatic camera journey');
 assert.ok(moving.some(sample=>sample.panelOpacity>0&&sample.panelOpacity<.95),message+' fades details out through intermediate opacity');
 assert.ok(moving.some(sample=>sample.panelOpacity<.01),message+' removes details from view during travel');
 assert.ok(committed.every(sample=>sample.panelInert),message+' makes fading details inert after the initial React commit');
 if(filters){assert.ok(moving.some(sample=>sample.filterOpacity>0&&sample.filterOpacity<.95),message+' fades filters smoothly');assert.ok(moving.some(sample=>sample.filterOpacity<.01),message+' hides filters during travel');assert.ok(committed.every(sample=>sample.filterInert),message+' prevents filter edits throughout travel');}
 if(brand)assert.ok(moving.every(sample=>sample.brandOpacity>.99),message+' leaves the centered brand visible while apartment UI fades');
 assert.ok(samples.some(sample=>sample.state==='checkpoint'&&sample.panelOpacity>.02&&sample.panelOpacity<.98),message+' fades the information back in on arrival');
 const first=samples[0],last=samples.at(-1);assert.ok(last.panelOpacity>.99,message+' restores details at rest');if(filters)assert.ok(last.filterOpacity>.99,message+' restores filters at rest');
 for(const sample of samples){assert.ok(sample.sceneOpacity>.99,message+' never fades the orbit canvas itself');for(const key of ['x','y','width','height']){assert.ok(Math.abs(sample.root[key]-first.root[key])<1,message+' fixes scene root '+key);assert.ok(Math.abs(sample.canvas[key]-first.canvas[key])<1,message+' fixes orbit canvas '+key);}assert.equal(sample.sameCanvas,true,message+' retains the existing canvas while the bounded motion-resolution buffer changes');}
}

try{
 for(const viewport of [{width:1440,height:900},{width:1920,height:1080}])await pass('Studio variant builder layout matches independent frames and fonts '+viewport.width,async()=>{
  const f=await fixture({cleanFixture:true,useDefaultOrbitLayout:true,context:{viewport},props:{...maskProps,snapDuration:.8}}),{page}=f;
  try{
   await waitStudio(page);await waitMask(page);const geometry=await studioGeometry(page),camera=await orbitData(page),pinned=await pagePosition(page);
   assert.equal(await page.evaluate(()=>Object.hasOwn(window.props,'orbitLayout')),false,'The component default chooses the Studio workspace without a fixture layout override');
   const mode=viewport.width===1440?'desktop':'wide';
   const requestedFrames=await assertBuilderReference(page,mode,'Applied builder '+mode);
   assertStudioViewport(geometry);
   assert.ok(Math.abs(geometry.image.width/geometry.image.height-1920/1010)<.01,'The requested orbit stays proportional');
   assert.ok(geometry.plan.x>=geometry.viewport.right-2,'The requested floorplan remains beside the orbit');
   assert.equal(await page.locator('[data-orbit-fullscreen-open]:visible').count(),0,'Desktop Studio does not add a phone fullscreen opener');
   await componentScreenshot(page,'studio-builder-initial-'+viewport.width+'.png');await writeFile(new URL('studio-builder-geometry-'+viewport.width+'.json',out),JSON.stringify({viewport,geometry,requestedFrames},null,2));
   assert.equal(await page.locator('[data-orbit-filters]:visible').count(),1,'The complete current filter set remains available');
   await page.waitForFunction(()=>Number(document.querySelector('[data-admiral-orbit]').dataset.orbitDownloaded)===120);assert.equal(new Set(f.orbitRequests).size,120,'The current full compressed orbit download is preserved');
   await componentScreenshot(page,'studio-variant-default-'+viewport.width+'.png');
   const probe=statusControlProbes.available;await hoverRealMask(page,probe);await waitStudio(page,probe.id);await assertActualMaskColour(page,probe,statusHighlightRGB.available,'Desktop Studio actual mask hover');await assertDesktopStudioHierarchy(page,'Large desktop '+viewport.width);for(const status of ['under_negotiation','sold']){await hoverRealMask(page,statusControlProbes[status]);await waitStudio(page,statusControlProbes[status].id);await assertDesktopStudioHierarchy(page,'Large desktop '+viewport.width+' '+status);}await hoverRealMask(page,probe);await waitStudio(page,probe.id);const hoveredGeometry=await studioGeometry(page);for(const key of ['x','y','width','height'])assert.ok(Math.abs(hoveredGeometry.image[key]-geometry.image[key])<2,'Hovering another apartment keeps the desktop orbit '+key+' stable');
   await componentScreenshot(page,'studio-builder-hover-'+viewport.width+'.png');const point=await projectMaskPoint(page,probe);await page.mouse.click(point.x,point.y);await waitApartmentCard(page,probe.id);await closeApartmentCard(page);await page.waitForTimeout(250);const clearedImage=await page.locator('[data-admiral-homepage]').evaluate(root=>Object.fromEntries(['x','y','width','height'].map(key=>[key,Number(root.dataset['image'+key[0].toUpperCase()+key.slice(1)])])));for(const key of ['x','y','width','height'])assert.ok(Math.abs(clearedImage[key]-geometry.image[key])<2,'Clearing hover after the card keeps the desktop orbit '+key+' stable');assertSameCamera(camera,await orbitData(page),'Studio shared-card open and close');
   const records=JSON.parse(await readFile(new URL('data/apartments.json',root),'utf8')).apartments,filterGeometry=await primaryFilterGeometry(page);assert.equal(filterGeometry.buttons.length,5,'The compact header retains all five primary filters');assert.ok(filterGeometry.buttons.every(button=>Math.abs(button.y-filterGeometry.buttons[0].y)<2),'All five primary filters use one desktop row');
   for(const status of ['available','under_negotiation','sold']){await activateOrbitControl(page,'[data-orbit-filter-status="'+status+'"]',false);const state=await waitOrbitFilters(page,{statuses:[status],priceMin:null,priceMax:null});assert.deepEqual(state.matchedIds,expectedOrbitMatches(records,state.criteria),'Enlarged Studio '+status+' filter follows the apartment JSON');await assertActualMaskColour(page,statusControlProbes[status],statusHighlightRGB[status],'Enlarged Studio '+status+' mask highlight');await activateOrbitControl(page,'[data-orbit-filter-status="'+status+'"]',false);await waitOrbitFilters(page,{statuses:[],priceMin:null,priceMax:null});}
   await activateOrbitControl(page,'[data-orbit-price-toggle]',false);await page.locator('[data-orbit-price-popover]:visible').waitFor();const popup=await page.locator('[data-orbit-price-popover]:visible').boundingBox();assert.ok(popup.y>=0&&popup.x>=0&&popup.x+popup.width<=viewport.width+1,'The compact desktop slider popup remains fully visible');await setOrbitRangeKeyboard(page,'price','min',220000000);await setOrbitRangeKeyboard(page,'price','max',330000000);await activateOrbitControl(page,'[data-orbit-area-toggle]',false);await setOrbitRangeKeyboard(page,'area','min',60);await setOrbitRangeKeyboard(page,'area','max',80);const criteria={statuses:[],priceMin:220000000,priceMax:330000000,areaMin:60,areaMax:80},filtered=await waitOrbitFilters(page,criteria);assert.deepEqual(filtered.matchedIds,expectedOrbitMatches(records,criteria),'The larger Studio retains combined price and area filtering');await page.keyboard.press('Escape');await activateOrbitControl(page,'[data-orbit-filter-reset]',false);await waitOrbitFilters(page,{statuses:[],priceMin:null,priceMax:null});const resetImage=await page.locator('[data-admiral-homepage]').evaluate(root=>Object.fromEntries(['x','y','width','height'].map(key=>[key,Number(root.dataset['image'+key[0].toUpperCase()+key.slice(1)])])));for(const key of ['x','y','width','height'])assert.ok(Math.abs(resetImage[key]-geometry.image[key])<2,'Filter editing preserves the larger desktop camera '+key);
   await freshWheel(page,100);await waitFrame(page,15);await assertPageHeld(page,pinned,'Studio checkpoint scroll');assert.equal(Number((await orbitData(page)).orbitCheckpoint),1,'The same scroll advances exactly one checkpoint');
   assert.equal(f.errors.length,0,'The new layout produces no browser errors');
  }finally{await f.close();}
 });
 for(const viewport of [{width:1280,height:720},{width:1280,height:600},{width:1024,height:600},{width:768,height:600}])await pass('Studio variant compact desktop preserves the contained orbit and usable apartment hierarchy '+viewport.width+'x'+viewport.height,async()=>{
  const f=await fixture({cleanFixture:true,useDefaultOrbitLayout:true,context:{viewport},props:maskProps}),{page}=f;
  try{
   await waitStudio(page);await waitMask(page);const geometry=await studioGeometry(page);assertStudioViewport(geometry);
   assert.ok(Math.abs(geometry.image.width/geometry.image.height-1920/1010)<.01,'Compact desktop retains the entire camera frame without distortion');
   assert.ok(geometry.viewport.x>=0&&geometry.viewport.right<=viewport.width+1&&geometry.viewport.y>=0&&geometry.viewport.bottom<=viewport.height+1,'The large orbit fits the visible desktop screen');
   if(await page.locator('[data-orbit-studio]').getAttribute('data-layout')==='builder'){
    const frames=await readBuilderFrames(page);
    for(const id of builderParts){const part=frames.parts[id];assert.ok(part&&part.x>=-1&&part.y>=-1&&part.right<=frames.width+1&&part.bottom<=frames.height+1,'Responsive builder '+id+' stays inside its logical viewport');}
    assertBuilderTextGeometry(frames,'Responsive builder '+viewport.width+'x'+viewport.height);
   }else{
   assert.ok(geometry.details.x>=geometry.viewport.right-2&&geometry.details.right<=viewport.width+1&&geometry.details.bottom<=viewport.height+1,'The apartment panel stays beside the orbit and inside the viewport');
   const hierarchy=await page.locator('.orbit-studio-details').evaluate(panel=>{const bounds=node=>{const b=node.getBoundingClientRect();return {x:b.x,y:b.y,width:b.width,height:b.height,right:b.right,bottom:b.bottom};},heading=panel.querySelector('.orbit-studio-heading'),facts=panel.querySelector('.orbit-studio-facts'),button=panel.querySelector('.orbit-studio-primary');return {panel:bounds(panel),heading:bounds(heading),facts:bounds(facts),button:bounds(button),scrollWidth:panel.scrollWidth,clientWidth:panel.clientWidth};});
   assert.ok(hierarchy.heading.y>=hierarchy.panel.y-1&&hierarchy.button.bottom<=hierarchy.panel.bottom+1,'The apartment identity and primary action remain immediately usable on shorter desktops');assert.ok(hierarchy.scrollWidth<=hierarchy.clientWidth+1,'Apartment data has no horizontal overflow');
   }
   const probe=statusControlProbes.available;await hoverRealMask(page,probe);await waitStudio(page,probe.id);await assertDesktopStudioHierarchy(page,'Compact desktop '+viewport.width+'x'+viewport.height);const hovered=await studioGeometry(page);for(const key of ['x','y','width','height'])assert.ok(Math.abs(hovered.image[key]-geometry.image[key])<2,'Changing the apartment keeps the compact desktop camera '+key+' stable');
   await componentScreenshot(page,'studio-variant-compact-'+viewport.width+'x'+viewport.height+'.png');assert.equal(f.errors.length,0);
  }finally{await f.close();}
 });
 for(const variant of [{name:'intermediate',viewport:{width:1600,height:1000}},{name:'Framer scaled',viewport:{width:1800,height:1200},stageWidth:1440,stageHeight:900,stageScale:.75}])await pass('Studio variant builder responsive frames and source aspect '+variant.name,async()=>{
  const f=await fixture({cleanFixture:true,useDefaultOrbitLayout:true,context:{viewport:variant.viewport},stageWidth:variant.stageWidth,stageHeight:variant.stageHeight,stageScale:variant.stageScale,props:maskProps}),{page}=f;
  try{
   await waitStudio(page);await waitMask(page);const before=await orbitData(page),geometry=await studioGeometry(page),frames=await readBuilderFrames(page);assertStudioViewport(geometry);
   for(const id of builderParts){const part=frames.parts[id];assert.ok(part&&part.x>=-1&&part.y>=-1&&part.right<=frames.width+1&&part.bottom<=frames.height+1,variant.name+' '+id+' fits the logical component viewport');}
   if(variant.stageScale)await assertBuilderReference(page,'desktop','Framer-scaled builder');
   else assertBuilderTextGeometry(frames,'Intermediate builder');
   assert.ok(Math.abs(geometry.image.width/geometry.image.height-1920/1010)<.01,'The rendered orbit keeps its natural aspect under '+variant.name);
   await hoverRealMask(page,statusControlProbes.available);await waitStudio(page,statusControlProbes.available.id);await assertActualMaskColour(page,statusControlProbes.available,statusHighlightRGB.available,variant.name+' actual mask');
   const action=page.locator('[data-orbit-detail-link]:visible').first(),box=await action.boundingBox();await page.mouse.move(box.x+box.width/2,box.y+box.height/2,{steps:24});await page.waitForTimeout(300);const reachedId=await action.evaluate(element=>element.closest('[data-orbitdata-displayed-id]')?.dataset.orbitdataDisplayedId);assert.ok(reachedId,'Pointer arrival retains the last apartment displayed by the data action');await action.click();await waitApartmentCard(page,reachedId);await closeApartmentCard(page);assertSameCamera(before,await orbitData(page),variant.name+' shared card');
   await componentScreenshot(page,'studio-builder-'+variant.name.replaceAll(' ','-')+'.png');assert.equal(f.errors.length,0);
  }finally{await f.close();}
 });
 await pass('Studio variant builder ultrawide orbit fits above the approved data fields',async()=>{
  const viewport={width:2560,height:1080},f=await fixture({cleanFixture:true,useDefaultOrbitLayout:true,context:{viewport},props:maskProps}),{page}=f;
  try{
   await waitStudio(page);await waitMask(page);const frames=await readBuilderFrames(page),geometry=await studioGeometry(page),camera=await orbitData(page);assertStudioViewport(geometry);assertBuilderTextGeometry(frames,'Ultrawide builder');
   for(const id of builderParts){const part=frames.parts[id];assert.ok(part&&part.x>=-1&&part.y>=-1&&part.right<=frames.width+1&&part.bottom<=frames.height+1,'Ultrawide '+id+' remains inside the component');}
   const firstDataTop=Math.min(...['apartmentNumber','availability','areaInterior','areaTerrace','areaGarden','price'].map(id=>frames.parts[id].y));assert.ok(geometry.image.y+geometry.image.height<=firstDataTop+2,'The orbit height cap leaves the approved data row unobscured');assert.ok(Math.abs(geometry.image.width/geometry.image.height-1920/1010)<.01,'Ultrawide orbit preserves source aspect');
   await hoverRealMask(page,statusControlProbes.available);await waitStudio(page,statusControlProbes.available.id);await assertActualMaskColour(page,statusControlProbes.available,statusHighlightRGB.available,'Ultrawide mask picking');
   const action=page.locator('[data-orbit-detail-link]:visible').first(),box=await action.boundingBox();await page.mouse.move(box.x+box.width/2,box.y+box.height/2,{steps:24});await page.waitForTimeout(400);const reachedId=await action.evaluate(element=>element.closest('[data-orbitdata-displayed-id]')?.dataset.orbitdataDisplayedId);assert.ok(reachedId);await action.click();await waitApartmentCard(page,reachedId);await closeApartmentCard(page);assertSameCamera(camera,await orbitData(page),'Ultrawide shared card');
   await writeFile(new URL('studio-builder-ultrawide.json',out),JSON.stringify({frames,geometry,firstDataTop},null,2));await componentScreenshot(page,'studio-builder-ultrawide.png');assert.equal(f.errors.length,0);
  }finally{await f.close();}
 });
 await pass('Studio variant builder updates the painted orbit on a height-only resize',async()=>{
  const f=await fixture({cleanFixture:true,useDefaultOrbitLayout:true,context:{viewport:{width:1440,height:900}},props:{...studioProps,maskPicking:false}}),{page}=f;
  try{
   await waitStudio(page);await page.mouse.move(0,0);const initial=await studioGeometry(page);assertStudioViewport(initial);
   await page.setViewportSize({width:1440,height:1000});await page.waitForFunction(()=>document.querySelector('[data-admiral-homepage]')?.clientHeight===1000);await page.waitForTimeout(250);await waitStudio(page);const taller=await studioGeometry(page);assertStudioViewport(taller);
   assert.ok(Math.abs(taller.image.y-initial.image.y)>10,'A height-only resize updates the actual painted image position');assert.equal(taller.root.width,initial.root.width,'The test retains the same logical width');await componentScreenshot(page,'studio-builder-height-resize.png');
   await page.setViewportSize({width:1440,height:900});await page.waitForFunction(()=>document.querySelector('[data-admiral-homepage]')?.clientHeight===900);await page.waitForTimeout(250);await waitStudio(page);assertStudioViewport(await studioGeometry(page));await assertBuilderReference(page,'desktop','Height-only round trip');assert.equal(f.errors.length,0);
  }finally{await f.close();}
 });
 await pass('Studio variant SEQ02 shrinks the fullscreen flight smoothly into the desktop orbit',async()=>{
  const viewport={width:1440,height:900},f=await fixture({cleanFixture:true,useDefaultOrbitLayout:true,gateDecodeIndices:[0],context:{viewport},props:{...maskProps,startView:'opening',showControls:true,duration:.6,connectionDuration:1.6,maxSpeed:1}}),{page}=f;
  try{
   await installFramingCapture(page);assertFullFraming(await readFraming(page),'Studio opening');await page.waitForFunction(()=>Number(document.querySelector('[data-admiral-orbit]').dataset.orbitDownloaded)===120);assert.equal(await page.evaluate(()=>window.bitmapRecords.filter(record=>Number.isFinite(record.index)).length),0,'The new layout retains compressed-only orbit prefetch before the connector');
   await coveredClick(page,'Skip approach');await waitStage(page,'building');assertFullFraming(await readFraming(page),'Studio SEQ01 final still');await page.evaluate(()=>window.framingSamples=[]);await coveredClick(page,'Explore building');await waitStage(page,'handoff');
   const samples=await page.evaluate(()=>window.framingSamples.filter(sample=>sample.stage==='connection'&&sample.sequence==='SEQ_02'&&sample.paintedSequence==='SEQ_02'&&sample.canvasWidth>1));assertMonotonicFraming(samples,true);
   assert.ok(samples.some(sample=>sample.progress>.1&&sample.progress<.9&&sample.width<sample.rootWidth-20&&sample.width>900),'The actual painted image shrinks through intermediate desktop widths');
   const endpoint=await readFraming(page);assert.ok(endpoint.width<viewport.width*.86,'The connecting endpoint is contained before the orbit decoder is released');assert.ok(endpoint.pixels.some((value,index)=>index%4!==3&&value>45),'The waiting handoff keeps the actual painted connector instead of flashing black');
   await page.evaluate(()=>window.releaseDecodeGates());await waitStudio(page);const geometry=await studioGeometry(page);assertStudioViewport(geometry);await writeFile(new URL('studio-variant-handoff-geometry.json',out),JSON.stringify({endpoint,geometry,samples:samples.slice(-4)},null,2));for(const key of ['x','y','width','height'])assert.ok(Math.abs(geometry.image[key]-endpoint[key])<2,'SEQ02 and orbit agree exactly at handoff '+key+': '+JSON.stringify({endpoint,geometry:geometry.image}));await componentScreenshot(page,'studio-variant-connector-endpoint.png');
   await writeFile(new URL('studio-variant-shrink-trace.json',out),JSON.stringify(samples,null,2));
   await coveredClick(page,'Overview');await waitStage(page,'opening');assertFullFraming(await readFraming(page),'Studio Overview restores the fullscreen opening');
   await coveredClick(page,'Skip approach');await waitStage(page,'building');await coveredClick(page,'Explore building');await waitConnectionFrame(page,10,40);await freshWheel(page,-120);await waitStage(page,'building');assertFullFraming(await readFraming(page),'Reverse connector restores the fullscreen building still');
   assert.equal(f.errors.length,0,'Studio flight and reverse produce no browser errors');
  }finally{await f.close();}
 });
 await pass('Studio variant phone retains the current full-width orbit and compact apartment data',async()=>{
  const viewport={width:390,height:844},f=await fixture({cleanFixture:true,useDefaultOrbitLayout:true,context:{viewport,isMobile:true,hasTouch:true,deviceScaleFactor:2},props:maskProps}),{page}=f;
  try{
   await waitStudio(page);await waitMask(page);const geometry=await studioGeometry(page);assertStudioViewport(geometry);assertNaturalWidthMobileOrbit(geometry,'Studio variant phone');assertCompactStudioFit(await compactStudioGeometry(page),viewport,'Studio variant phone');
   await tapRealMask(page,statusControlProbes.available);await waitStudio(page,statusControlProbes.available.id);const camera=await orbitData(page);await page.locator('.orbit-studio-primary[data-orbit-detail-link]:visible').tap();await waitApartmentCard(page,statusControlProbes.available.id);await closeApartmentCard(page);await waitStudio(page,statusControlProbes.available.id);assertSameCamera(camera,await orbitData(page),'Studio phone shared card');
   await componentScreenshot(page,'studio-variant-phone.png');assert.equal(f.errors.length,0);
  }finally{await f.close();}
 });
 for(const layout of ['classic','studio'])await pass('audit orbitdata '+layout+' pointer travel remains clickable and clears on exit',async()=>{
  const f=await fixture({cleanFixture:true,context:{viewport:{width:1440,height:900}},props:{...maskProps,orbitLayout:layout}}),{page}=f;
  try{
   await waitOrbit(page);await waitMask(page);const probe=realMaskViews[0].probe;
   const selector=layout==='classic'?'[data-apartment-open]':'[data-orbit-detail-link]';
   await hoverRealMask(page,probe);await page.waitForTimeout(650);
   const action=page.locator(selector).first(),box=await action.boundingBox();assert.ok(box);
   await page.mouse.move(box.x+box.width/2,box.y+box.height/2,{steps:30});await page.waitForTimeout(400);
   assert.equal(await action.isEnabled(),true,'the displayed action survives pointer approach');
   assert.equal(await page.locator('[data-admiral-homepage]').getAttribute('data-orbit-mask-hovered'),'','the façade hover itself clears on the control');
   const reachedId=await action.evaluate(element=>element.closest('[data-orbitdata-displayed-id]')?.dataset.orbitdataDisplayedId);assert.ok(reachedId);
   await page.mouse.click(box.x+box.width/2,box.y+box.height/2);await waitApartmentCard(page,reachedId);
   await page.locator('#detail-dialog [data-close]').click();await page.locator('#detail-dialog[open]').waitFor({state:'hidden'});
   await hoverRealMask(page,probe);await page.waitForTimeout(650);await action.focus();await page.mouse.move(5,5);await page.waitForTimeout(400);
   assert.equal(await action.isEnabled(),true,'keyboard focus keeps its action available when the pointer leaves');
   if(layout==='studio'){
    const secondary=page.locator('.orbit-studio-apartment-footer .orbit-studio-secondary a,.orbit-studio-apartment-footer .orbit-studio-secondary button').first();
    await secondary.focus();await secondary.press('Tab');await page.waitForTimeout(100);assert.equal(await action.isEnabled(),true,'Tab within orbitdata preserves the active apartment');await action.focus();
   }
   await action.press('Enter');await waitApartmentCard(page,probe.id);
   await page.locator('#detail-dialog [data-close]').click();await page.locator('#detail-dialog[open]').waitFor({state:'hidden'});
   await hoverRealMask(page,probe);await page.waitForTimeout(400);await page.mouse.move(5,5);await page.waitForTimeout(400);
   if(layout==='classic')assert.equal(await page.locator('[data-apartment-details]').getAttribute('data-details-visible'),'false');
   else assert.equal(await page.locator('[data-orbit-studio]').getAttribute('data-apartment-id'),'');
   const point=await projectMaskPoint(page,probe);await page.mouse.click(point.x,point.y);await waitApartmentCard(page,probe.id);
  }finally{await f.close();}
 });
 await pass('audit orbitdata stalled fetch times out and the visible retry loads fresh data',async()=>{
  const f=await fixture({cleanFixture:true,context:{viewport:{width:1440,height:900}},props:{...studioProps,orbitLayout:'studio'}}),{page}=f;
  try{
   await waitOrbit(page);
   await page.evaluate(()=>{
    window.auditStallCalls=0;const nativeFetch=window.fetch.bind(window),nativeTimer=window.setTimeout.bind(window);
    window.auditStallRecovered=false;window.setTimeout=(callback,delay,...args)=>nativeTimer(callback,delay===15000?100:delay,...args);
    window.fetch=(url,...args)=>String(url).includes('audit-stalled')?(window.auditStallCalls++,window.auditStallRecovered?nativeFetch('http://homepage.test/apartments.json',...args):new Promise(()=>{})):nativeFetch(url,...args);
    window.props={...window.props,apartmentDataUrl:'http://homepage.test/audit-stalled.json'};window.renderTrial();
   });
   await page.waitForFunction(()=>document.querySelector('[data-orbit-studio]')?.dataset.status==='error');
   assert.equal(await page.evaluate(()=>window.auditStallCalls),1);
   await page.evaluate(()=>{window.auditStallRecovered=true;});await page.getByRole('button',{name:'Újrapróbálom',exact:true}).click();
   await page.waitForFunction(()=>document.querySelector('[data-orbit-studio]')?.dataset.status==='ready');
   assert.equal(await page.evaluate(()=>window.auditStallCalls),2,'retry starts a new request after a stalled download');
  }finally{await f.close();}
 });
 for(const phone of [false,true])await pass('audit priority full orbit downloads without decoding during SEQ01 '+(phone?'phone':'desktop'),async()=>{
  const f=await fixture({cleanFixture:true,context:phone?{viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:2}:{viewport:{width:1440,height:900}},props:{showControls:false,duration:.6,connectionDuration:1,maxSpeed:1}}),{page}=f;
  try{
   await page.waitForFunction(()=>Number(document.querySelector('[data-admiral-orbit]').dataset.orbitDownloaded)===120,null,{timeout:30000});
   assert.equal(new Set(f.orbitRequests).size,120,'All 120 compressed orbit sources are downloaded before interaction');
   const encodedOnly=()=>page.evaluate(()=>({stage:document.querySelector('[data-admiral-homepage]').dataset.homepageStage,decoded:Number(document.querySelector('[data-admiral-orbit]').dataset.orbitDecoded),native:window.bitmapRecords.filter(record=>Number.isFinite(record.index)).length,live:window.orbitLive}));
   assert.deepEqual(await encodedOnly(),{stage:'opening',decoded:0,native:0,live:0},'Opening keeps only compressed orbit bytes, with no orbit decoding calls');
   if(phone)await phoneSwipe(page,{x:190,y:700,dy:-100});else await page.mouse.wheel(0,120);
   await waitStage(page,'building');assert.deepEqual(await encodedOnly(),{stage:'building',decoded:0,native:0,live:0},'SEQ01 completion still retains no invisible decoded orbit');
   const bytes=[...f.orbitRequests];
   if(phone){await page.waitForTimeout(250);await phoneSwipe(page,{x:190,y:700,dy:-100});}else await freshWheel(page,120);
   await waitOrbit(page);await waitBuffer(page,phone?31:61);assert.equal(Number((await orbitData(page)).orbitMotionWidth),phone?640:960,'The configured movement resolution is unchanged');
   assert.deepEqual(f.orbitRequests,bytes,'Handoff reuses all encoded frames without downloading the orbit again');
   const before=await orbitData(page);if(phone)await phoneSwipe(page,{x:230,y:350,dx:-110,dy:0});else await freshWheel(page,100);await waitFrame(page,15);assert.equal(Number((await orbitData(page)).orbitCheckpoint),1,'A fresh gesture still moves to exactly the next checkpoint');
   assert.equal(before.orbitCheckpoint,'0');
   const home=await addHomeNavigation(page);await home.click();await waitStage(page,'opening');await page.waitForFunction(()=>window.orbitLive===0&&Number(document.querySelector('[data-admiral-orbit]').dataset.orbitDecoded)===0);await page.waitForTimeout(300);assert.equal(await page.evaluate(()=>window.orbitLive),0,'Returning Home releases the decoded orbit again');assert.deepEqual(f.orbitRequests,bytes,'Returning Home preserves the full compressed orbit download');
  }finally{await f.close();}
 });
 for(const interruption of ['network','visibility'])await pass('audit priority SEQ01 hidden controls recover after '+interruption,async()=>{
  const f=await fixture({cleanFixture:true,failHero:interruption==='network'?1:undefined,props:{showControls:false,duration:1.8,maxSpeed:1}}),{page}=f;
  try{
   await page.waitForTimeout(180);assert.equal(await page.locator('[data-homepage-recovery]').count(),0,'Normal opening has no extra recovery UI');await page.mouse.wheel(0,120);
   if(interruption==='network')await page.waitForFunction(()=>document.querySelector('[data-admiral-sequence]').dataset.sequenceState==='error');
   else{
    await page.waitForFunction(()=>document.querySelector('[data-admiral-sequence]').dataset.sequencePlaying==='true');
    await page.evaluate(()=>{Object.defineProperty(document,'hidden',{configurable:true,value:true});document.dispatchEvent(new Event('visibilitychange'));Object.defineProperty(document,'hidden',{configurable:true,value:false});document.dispatchEvent(new Event('visibilitychange'));});
    await page.waitForFunction(()=>document.querySelector('[data-admiral-sequence]').dataset.sequenceState==='paused');
   }
   const recovery=page.locator('[data-homepage-recovery="SEQ_01"]');await recovery.waitFor({state:'visible'});assert.equal(await recovery.getByRole('button',{name:'Skip approach',exact:true}).count(),1,'The fallback includes an escape path');
   f.restoreHero();await recovery.getByRole('button',{name:interruption==='network'?'Retry approach':'Continue approach',exact:true}).click();await waitStage(page,'building');assert.equal(await page.locator('[data-homepage-recovery]').count(),0,'Recovery UI disappears when normal playback completes');
   const rendering=await page.locator('[data-admiral-sequence] img').evaluate(image=>({posterReady:image.complete&&image.naturalWidth>0}));assert.equal(rendering.posterReady,true,'The completed sequence retains a decoded visible still');
  }finally{await f.close();}
 });
 await pass('audit priority expired apartment data refreshes hover facts and the cached shared card',async()=>{
  const payload=JSON.parse(await readFile(new URL('data/apartments.json',root),'utf8')),probe=realMaskViews[0].probe;
  const f=await fixture({cleanFixture:true,props:{...maskProps,orbitLayout:'classic'}}),{page}=f;
  try{
   await waitOrbit(page);await waitMask(page);await hoverRealMask(page,probe);await waitOrbitdataRecord(page,'[data-apartment-details]',probe.id);let point=await projectMaskPoint(page,probe);
   await page.mouse.click(point.x,point.y);await waitApartmentCard(page,probe.id);await closeApartmentCard(page);const detailsBefore=f.detailRequests.length;
   const next=structuredClone(payload),unit=next.apartments.find(apartment=>apartment.id===probe.id);unit.status='sold';unit.statusLabel='Eladva';unit.price+=17000000;f.setApartmentPayload(next);
   const requests=f.apartmentRequests.length,camera=await orbitData(page),encoded=[...f.orbitRequests];
   await page.evaluate(()=>{const native=Date.now.bind(Date);Date.now=()=>native()+61000;Object.defineProperty(document,'hidden',{configurable:true,value:false});document.dispatchEvent(new Event('visibilitychange'));window.dispatchEvent(new Event('focus'));});
   await hoverRealMask(page,probe);await page.waitForFunction(()=>document.querySelector('[data-apartment-field="availability"]')?.textContent.includes('Eladva'),null,{timeout:12000});
   await waitOrbitdataRecord(page,'[data-apartment-details]',probe.id);assert.equal(f.apartmentRequests.length,requests+1,'Visibility and focus coalesce into one expired-data revalidation');
   await assertActualMaskColour(page,probe,statusHighlightRGB.sold,'Revalidated sold facade');point=await projectMaskPoint(page,probe);await page.mouse.click(point.x,point.y);const card=await waitApartmentCard(page,probe.id);assert.match(await card.locator('.detail-status').innerText(),/Eladva/,'The cached shared card uses the active orbit status');
   assert.equal(Number((await card.locator('.price-value').innerText()).replace(/\s/g,'').replace(',','.')),unit.price/1000000,'The cached card uses the active orbit price');assert.equal(f.detailRequests.length,detailsBefore,'Refreshing orbit facts does not download the full room dataset again');
   const final=structuredClone(next),finalUnit=final.apartments.find(apartment=>apartment.id===probe.id);finalUnit.status='under_negotiation';finalUnit.statusLabel='Egyeztetés alatt';finalUnit.price+=1000000;f.setApartmentPayload(final);await card.evaluate(dialog=>{window.auditOpenCard=dialog;});
   await page.evaluate(()=>{const previous=Date.now;Date.now=()=>previous()+61000;window.dispatchEvent(new Event('focus'));});
   await page.waitForFunction(()=>{const host=document.querySelector('[data-orbit-detail-card]'),dialog=host?.querySelector('div')?.shadowRoot?.querySelector('#detail-dialog');return dialog?.open&&dialog.querySelector('.detail-status')?.textContent.includes('Egyeztetés alatt');});
   assert.equal(await card.evaluate(dialog=>dialog===window.auditOpenCard),true,'Refreshing facts leaves the same detail dialog mounted and open');assert.equal(Number((await card.locator('.price-value').innerText()).replace(/\s/g,'').replace(',','.')),finalUnit.price/1000000,'An already-open card receives the new price');assert.equal(f.detailRequests.length,detailsBefore,'An open-card facts refresh still reuses its full room dataset');assertSameCamera(camera,await orbitData(page),'Apartment-data revalidation');assert.deepEqual(f.orbitRequests,encoded,'Apartment-data refresh does not re-download orbit frames');
  }finally{await f.close();}
 });
 for(const layout of ['classic','studio'])await pass('orbitdata fade desktop '+layout+' retains outgoing facts and drawing, swaps smoothly and clears on leave',async()=>{
  const f=await fixture({cleanFixture:true,useDefaultOrbitLayout:layout==='classic',context:{viewport:{width:1440,height:900}},props:{...maskProps,orbitLayout:layout}}),{page}=f,scope=layout==='classic'?'[data-apartment-details]':'[data-orbit-studio]';
  try{
   await waitOrbit(page);await waitMask(page);const camera=await orbitData(page),first=realMaskViews[0].probe,second=realMaskViews[0].second,background=await projectMaskPoint(page,realMaskViews[0].background);
   await hoverRealMask(page,first);await waitOrbitdataRecord(page,scope,first.id);await page.locator(scope+' [data-orbitdata-transition] img').first().evaluate(image=>image.decode());
   const oldPlan=await page.locator(scope+' [data-orbitdata-transition] img').first().getAttribute('src');
   await traceOrbitdata(page,scope);await hoverRealMask(page,second);await waitOrbitdataRecord(page,scope,second.id);await page.waitForTimeout(60);let samples=await stopOrbitdataTrace(page);
   assertOrbitdataSwap(samples,first.id,second.id,layout+' neighbouring apartment');
   const outgoing=samples.flatMap(sample=>sample.parts).filter(part=>part.id===first.id&&part.opacity>.03&&part.opacity<.97);
   assert.ok(outgoing.some(part=>part.text.includes(first.id)),layout+' preserves the outgoing apartment facts until they have faded');assert.ok(outgoing.some(part=>part.plans.some(url=>url.endsWith(oldPlan.replace('http://homepage.test',''))||url===oldPlan)),layout+' retains the outgoing floorplan during its fade');
   await traceOrbitdata(page,scope);await page.mouse.move(background.x,background.y);await page.waitForTimeout(400);samples=await stopOrbitdataTrace(page);const leaving=samples.flatMap(sample=>sample.parts);
   assert.ok(leaving.some(part=>part.id===second.id&&part.opacity>.03&&part.opacity<.97),layout+' paints a fade-out when the mouse leaves the facade');assert.ok(samples.at(-1).parts.every(part=>!part.id&&!/\b[ABC]\d{3}\b/.test(part.text)),layout+' removes the old facts after fading out');assert.ok(samples.every(sample=>sample.filterOpacity===null||sample.filterOpacity>.99),layout+' keeps filters visible while orbitdata leaves');assert.equal(await page.locator('#detail-dialog[open]').count(),0,'Hover transitions do not open a datasheet');assertSameCamera(camera,await orbitData(page),'Orbitdata hover fades');
   await componentScreenshot(page,'orbitdata-fade-'+layout+'-cleared.png');
  }finally{await f.close();}
 });
 for(const layout of ['classic','studio'])await pass('orbitdata fade rapid '+layout+' uses the latest hover without stale apartment flashes',async()=>{
  const f=await fixture({cleanFixture:true,useDefaultOrbitLayout:layout==='classic',context:{viewport:{width:1440,height:900}},props:{...maskProps,orbitLayout:layout}}),{page}=f,scope=layout==='classic'?'[data-apartment-details]':'[data-orbit-studio]';
  try{
   await waitOrbit(page);await waitMask(page);const first=realMaskViews[0].probe,skipped=realMaskViews[0].second,last={id:'B005',x:525,y:462},background=await projectMaskPoint(page,realMaskViews[0].background);
   await hoverRealMask(page,first);await waitOrbitdataRecord(page,scope,first.id);await traceOrbitdata(page,scope);
   await hoverRealMask(page,skipped);await page.waitForTimeout(20);await hoverRealMask(page,last);await waitOrbitdataRecord(page,scope,last.id);await page.waitForTimeout(90);let samples=await stopOrbitdataTrace(page),parts=samples.flatMap(sample=>sample.parts);
   assert.ok(!parts.some(part=>part.id===skipped.id&&part.opacity>.01),'A transient apartment crossed during fade-out never flashes into view');assertOrbitdataSwap(samples,first.id,last.id,layout+' fast sweep');
   await traceOrbitdata(page,scope);await page.mouse.move(background.x,background.y);await page.waitForTimeout(45);await hoverRealMask(page,first);await waitOrbitdataRecord(page,scope,first.id);await page.waitForTimeout(230);samples=await stopOrbitdataTrace(page);parts=samples.flatMap(sample=>sample.parts);assert.ok(parts.at(-1).id===first.id&&parts.at(-1).opacity>.99,'Re-entering before a fade ends cancels stale hide work');assert.ok(!parts.some(part=>part.id===skipped.id&&part.opacity>.01),'Re-entry cannot revive an abandoned apartment');assert.equal(await page.locator('#detail-dialog[open]').count(),0,'Rapid movement keeps datasheet actions inactive');
  }finally{await f.close();}
 });
 await pass('orbitdata fade reduced motion swaps and clears immediately',async()=>{
  const f=await fixture({cleanFixture:true,useDefaultOrbitLayout:true,context:{viewport:{width:1440,height:900},reducedMotion:'reduce'},props:maskProps}),{page}=f,scope='[data-apartment-details]';
  try{
   await waitOrbit(page);await waitMask(page);await hoverRealMask(page,realMaskViews[0].probe);await waitOrbitdataRecord(page,scope,realMaskViews[0].probe.id);await traceOrbitdata(page,scope);await hoverRealMask(page,realMaskViews[0].second);await waitOrbitdataRecord(page,scope,realMaskViews[0].second.id);const background=await projectMaskPoint(page,realMaskViews[0].background);await page.mouse.move(background.x,background.y);await page.waitForTimeout(50);const samples=await stopOrbitdataTrace(page),parts=samples.flatMap(sample=>sample.parts);assert.ok(!parts.some(part=>part.opacity>.01&&part.opacity<.99),'The reduced-motion setting avoids opacity interpolation');assert.ok(samples.at(-1).parts.every(part=>!part.id&&!/\b[ABC]\d{3}\b/.test(part.text)),'Reduced motion clears the record without waiting for the ordinary fade duration');
  }finally{await f.close();}
 });
 await pass('orbitdata fade mobile tap remains selected through smooth changes and rotated fullscreen',async()=>{
  const f=await fixture({cleanFixture:true,useDefaultOrbitLayout:true,context:{viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:2},props:maskProps}),{page}=f,scope='[data-orbit-studio]';
  try{
   await waitStudio(page);await waitMask(page);const first=realMaskViews[0].probe,second=realMaskViews[0].second;await tapRealMask(page,first);await waitOrbitdataRecord(page,scope,first.id);await traceOrbitdata(page,scope);await tapRealMask(page,second);await waitOrbitdataRecord(page,scope,second.id);await page.waitForTimeout(220);const samples=await stopOrbitdataTrace(page);assertOrbitdataSwap(samples,first.id,second.id,'Phone apartment tap');assert.equal(await page.locator(studioSelector).getAttribute('data-apartment-id'),second.id,'Lifting the finger retains the explicit apartment choice');assert.equal(await page.locator('#detail-dialog[open]').count(),0,'Phone taps select without opening the datasheet');
   await page.locator('[data-orbit-fullscreen-open]:visible').tap();await page.locator('[data-orbit-fullscreen-details]').waitFor();await waitMask(page);const fullscreen='[data-orbit-fullscreen-details]';await waitOrbitdataRecord(page,fullscreen,second.id);await traceOrbitdata(page,fullscreen);await tapRealMask(page,first);await waitOrbitdataRecord(page,fullscreen,first.id);await page.waitForTimeout(80);assertOrbitdataSwap(await stopOrbitdataTrace(page),second.id,first.id,'Rotated fullscreen tap');await page.locator('[data-orbit-fullscreen-close]:visible').tap();await waitOrbitdataRecord(page,scope,first.id);assert.equal(await page.locator(studioSelector).getAttribute('data-apartment-id'),first.id,'Fullscreen exit preserves the current phone selection');
  }finally{await f.close();}
 });
 for(const layout of ['classic','studio'])for(const externalOverlay of [false,true])await pass('status hover desktop '+layout+(externalOverlay?' covered':' native')+' clears orbitdata and boosts only the eligible facade',async()=>{
  const f=await fixture({cleanFixture:true,useDefaultOrbitLayout:layout==='classic',externalOverlay,context:{viewport:{width:1440,height:900}},props:{...maskProps,orbitLayout:layout,maskHighlightOpacity:27}}),{page}=f;
  const numberSelector=layout==='classic'?'[data-apartment-field="number"]':'.orbit-studio-id';
  const waitNumber=id=>page.waitForFunction(({selector,id})=>[...document.querySelectorAll(selector)].some(element=>element.textContent.includes(id)),{selector:numberSelector,id});
  const waitClear=()=>page.waitForFunction(layout=>{const root=document.querySelector('[data-admiral-homepage]');return !root.dataset.orbitMaskHovered&&(layout==='classic'?root.querySelector('[data-apartment-details]')?.dataset.detailsVisible==='false':root.querySelector('[data-orbit-studio]')?.dataset.apartmentId==='');},layout);
  try{
   await waitOrbit(page);await waitMask(page);const camera=await orbitData(page),background=await projectMaskPoint(page,realMaskViews[0].background);
   for(const [status,probe]of Object.entries(statusControlProbes)){
    await hoverRealMask(page,probe);await waitNumber(probe.id);if(layout==='classic'){const rgb=await page.locator('.admiral-details-status .admiral-details-value').evaluate(element=>getComputedStyle(element).color.match(/[\d.]+/g).slice(0,3).map(Number));assert.deepEqual(rgb,statusHighlightRGB[status],'The '+status+' orbitdata label shares the facade availability colour');}const rgba=await assertActualMaskColour(page,probe,statusHighlightRGB[status],'Mouse hover '+status);assert.ok(Math.abs(rgba[3]-69)<=1,'Unfiltered hover uses the configured 27% alpha');assert.equal(await page.locator('#detail-dialog[open]').count(),0,'Moving over a facade changes orbitdata without opening its card');
    await page.mouse.move(background.x,background.y);await waitClear();await waitMaskOverlay(page,await projectMaskPoint(page,probe),false);assert.equal(await page.locator('[data-orbit-filters]:visible').count(),1,'Clearing hover leaves the primary filters available');
   }
   await hoverRealMask(page,statusControlProbes.available);await activateOrbitControl(page,'[data-orbit-filter-status="available"]',false);await waitOrbitFilters(page,{statuses:['available'],priceMin:null,priceMax:null});await waitClear();
   const first=await projectMaskPoint(page,statusControlProbes.available),second=await projectMaskPoint(page,realMaskViews[0].second);
   await waitMaskOverlay(page,first,true);const base=await maskOverlayPixel(page,first);assert.ok(Math.abs(base[3]-69)<=1,'Available filtering lights facades at the configured 27% base alpha');
   await hoverRealMask(page,statusControlProbes.available);await waitNumber(statusControlProbes.available.id);await page.waitForFunction(point=>{const canvas=document.querySelector('canvas[data-orbit-mask-overlay]'),x=Math.floor(point.lx/point.logicalWidth*canvas.width),y=Math.floor(point.ly/point.logicalHeight*canvas.height);return Math.abs(canvas.getContext('2d').getImageData(x,y,1,1).data[3]-145)<=1;},first);const boosted=await maskOverlayPixel(page,first);assert.ok(Math.abs(boosted[3]-Math.round(255*.57))<=1,'Actual filtered mouse hover adds 30 percentage points: 27% becomes 57%');assert.ok(Math.abs((await maskOverlayPixel(page,second))[3]-69)<=1,'Other eligible apartments retain the base filter strength');
   await page.mouse.move(background.x,background.y);await waitClear();await waitMaskAlpha(page,first,69);assert.ok(Math.abs((await maskOverlayPixel(page,first))[3]-69)<=1,'Leaving the facade removes the boost while retaining its active filter light');
   // Clearing Studio facts can resize its image slot. Reproject the audited
   // B105 mask pixel now, rather than hovering a stale coordinate on another unit.
   const sold=await projectMaskPoint(page,statusControlProbes.sold);
   await page.mouse.move(sold.x,sold.y);await waitClear();assert.equal((await maskOverlayPixel(page,sold))[3],0,'A sold apartment excluded by the filter cannot gain a hover overlay');await page.mouse.click(sold.x,sold.y);assert.equal(await page.locator('#detail-dialog[open]').count(),0,'An excluded apartment cannot open a datasheet');
   await hoverRealMask(page,statusControlProbes.available);const filterPoint=await orbitControlPoint(page,'[data-orbit-area-toggle]');await page.mouse.move(filterPoint.x,filterPoint.y);await waitClear();await waitMaskAlpha(page,first,69);assert.ok(Math.abs((await maskOverlayPixel(page,first))[3]-69)<=1,'Moving onto a real filter control clears hover emphasis without clearing criteria');assertSameCamera(camera,await orbitData(page),'Mouse hover and status filters');assert.ok(Number(await page.locator('[data-admiral-homepage]').getAttribute('data-orbit-mask-cached'))<=2,'Status colours and hover emphasis retain the bounded two-mask decoded cache');await componentScreenshot(page,'status-hover-'+layout+(externalOverlay?'-covered':'-native')+'.png');
  }finally{await f.close();}
 });
 await pass('status hover mobile tap retains orbitdata without the mouse boost and opens its current card',async()=>{
  const f=await fixture({cleanFixture:true,useDefaultOrbitLayout:true,context:{viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:2},props:{...maskProps,maskHighlightOpacity:27}}),{page}=f;
  try{
   await waitStudio(page);await waitMask(page);const camera=await orbitData(page);await activateOrbitControl(page,'[data-orbit-filter-status="available"]',true);await waitOrbitFilters(page,{statuses:['available'],priceMin:null,priceMax:null});const point=await tapRealMask(page,statusControlProbes.available);await waitStudio(page,statusControlProbes.available.id);await page.waitForTimeout(350);const rgba=await assertActualMaskColour(page,statusControlProbes.available,statusHighlightRGB.available,'Tapped available apartment');assert.ok(Math.abs(rgba[3]-69)<=1,'Touch selection retains base filter opacity instead of applying a mouse-only boost');assert.equal(await page.locator('#detail-dialog[open]').count(),0,'A tap selects without opening the card');await activateOrbitControl(page,'[data-orbit-area-toggle]',true);await page.locator('[data-orbit-area-popover]:visible').waitFor();assert.equal(await page.locator(studioSelector).getAttribute('data-apartment-id'),statusControlProbes.available.id,'Opening a filter retains a deliberate phone selection');await activateOrbitControl(page,'[data-orbit-area-toggle]',true);await page.locator('.orbit-studio-primary[data-orbit-detail-link]:visible').tap();await waitApartmentCard(page,statusControlProbes.available.id);await closeApartmentCard(page);await waitStudio(page,statusControlProbes.available.id);await waitMask(page);assert.ok(Math.abs((await maskOverlayPixel(page,point))[3]-69)<=1,'Closing a card restores the selected phone apartment at base opacity');assertSameCamera(camera,await orbitData(page),'Phone tap and its shared card');await componentScreenshot(page,'status-hover-phone-selection.png');
  }finally{await f.close();}
 });
 for(const viewport of [{width:1440,height:900},{width:1920,height:1080}])await pass('status hover orbitdata divider meets the plan midpoint and strengthens key facts '+viewport.width,async()=>{
  const f=await fixture({cleanFixture:true,useDefaultOrbitLayout:true,context:{viewport},props:maskProps}),{page}=f;
  try{
   await waitOrbit(page);await waitMask(page);await hoverRealMask(page,statusControlProbes.available);await page.locator('[data-apartment-open] img').evaluate(image=>image.decode());await page.waitForTimeout(350);
   const geometry=await page.locator('[data-apartment-details]').evaluate(panel=>{const box=element=>{const rect=element.getBoundingClientRect();return {x:rect.x,y:rect.y,right:rect.right,bottom:rect.bottom,width:rect.width,height:rect.height};};return {plan:box(panel.querySelector('.admiral-details-plan-image')),lines:[...panel.querySelectorAll('[data-orbitdata-divider]')].map(element=>({side:element.dataset.orbitdataDivider,...box(element)})),numberWeight:Number(getComputedStyle(panel.querySelector('.admiral-details-number .admiral-details-value')).fontWeight),areaWeight:Number(getComputedStyle(panel.querySelector('.admiral-details-area .admiral-details-value')).fontWeight),statusColor:getComputedStyle(panel.querySelector('.admiral-details-status .admiral-details-value')).color,filterBorders:[...panel.querySelectorAll('[data-orbit-filter-status],[data-orbit-price-toggle],[data-orbit-area-toggle]')].map(element=>({width:parseFloat(getComputedStyle(element).borderTopWidth),color:getComputedStyle(element).borderTopColor}))};});
   assert.equal(geometry.lines.length,2,'Orbitdata has two actual divider segments');const left=geometry.lines.find(line=>line.side==='left'),right=geometry.lines.find(line=>line.side==='right'),mid=geometry.plan.y+geometry.plan.height/2;assert.ok(left&&right&&left.width>40&&right.width>40,'Both divider sides are present');for(const line of geometry.lines)assert.ok(Math.abs(line.y+line.height/2-mid)<=2,'Each segment passes through the floorplan midpoint: '+JSON.stringify(geometry));assert.ok(left.right<=geometry.plan.x-8&&right.x>=geometry.plan.right+8,'Divider lines stop clearly before both sides of the drawing');assert.ok(geometry.numberWeight>=600&&geometry.areaWeight>=600,'Apartment number and area figures are stronger than regular supporting text');assert.match(geometry.statusColor,/70,\s*166,\s*106/,'Availability text carries the available colour');assert.equal(geometry.filterBorders.length,5);assert.ok(geometry.filterBorders.every(border=>border.width>=1&&!/rgba\([^)]*,\s*0\)/.test(border.color)),'All five primary filter controls have visible outlines');assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth),viewport.width,'The divided orbitdata does not widen the page');await componentScreenshot(page,'status-hover-orbitdata-'+viewport.width+'.png');
  }finally{await f.close();}
 });
 for(const viewport of [{width:1440,height:900},{width:1920,height:1080}])await pass('primary orbit filters desktop centres the plan and prioritises complete status and range controls '+viewport.width,async()=>{
  const records=JSON.parse(await readFile(new URL('data/apartments.json',root),'utf8')).apartments,f=await fixture({cleanFixture:true,useDefaultOrbitLayout:true,context:{viewport},props:{...maskProps,showControls:false,snapDuration:.8}}),{page}=f;
  try{
   await waitOrbit(page);await waitDetails(page);await waitMask(page);await page.locator('[data-apartment-open] img').evaluate(image=>image.decode());await page.waitForTimeout(350);const camera=await orbitData(page),filters=await primaryFilterGeometry(page),layout=await page.locator('[data-apartment-details]').evaluate(panel=>{const box=element=>{const rect=element.getBoundingClientRect();return {x:rect.x,y:rect.y,right:rect.right,bottom:rect.bottom,width:rect.width,height:rect.height};};return {panel:box(panel),plan:box(panel.querySelector('[data-apartment-open]')),gradient:getComputedStyle(panel,'::before').backgroundImage,fields:[...panel.querySelectorAll('[data-apartment-field]')].filter(element=>element.dataset.apartmentField!=='floorplan').map(element=>({name:element.dataset.apartmentField,...box(element)}))};});
   assert.ok(Math.abs(layout.plan.x+layout.plan.width/2-viewport.width/2)<12,'The floorplan remains the central reading anchor');assert.ok(layout.plan.width>=210&&layout.plan.height>=175,'The central drawing keeps a readable size');assert.ok(filters.root.x>=layout.plan.right+8,'Primary filters occupy the column to the right of the drawing');assert.ok(filters.root.y>=layout.panel.y+1&&filters.root.bottom<=layout.panel.bottom+1,'The controls stay within the information divider');assert.ok(layout.fields.every(field=>field.right<=layout.plan.x+1),'Secondary facts remain compact to the left of the drawing');
   assert.equal(filters.buttons.length,5,'Three one-click statuses and two sliders remain immediately exposed');for(const button of filters.buttons){assert.ok(button.x>=0&&button.right<=viewport.width&&button.y>=0&&button.bottom<=viewport.height,'Every primary control is within the visible page');if(button.labelWidth!==undefined)assert.ok(button.labelScrollWidth<=button.labelWidth+1,'Full status labels are readable without ellipsis');assert.ok(button.fontSize>=11,'Primary controls retain readable typography');}assert.match(filters.buttons.find(button=>button.kind==='available').text,/Elérhető/);assert.doesNotMatch(filters.buttons.find(button=>button.kind==='available').text,/Szabad/);assert.match(filters.buttons.find(button=>button.kind==='area').text,/m²|Beltér|Alapterület/);
   for(const status of ['available','under_negotiation','sold']){await activateOrbitControl(page,'[data-orbit-filter-status="'+status+'"]',false);const state=await waitOrbitFilters(page,{statuses:[status],priceMin:null,priceMax:null});assert.deepEqual(state.matchedIds,expectedOrbitMatches(records,state.criteria),'The '+status+' one-click control uses the real JSON');await assertActualMaskColour(page,statusControlProbes[status],statusHighlightRGB[status],'Desktop '+status+' actual mask');await activateOrbitControl(page,'[data-orbit-filter-status="'+status+'"]',false);await waitOrbitFilters(page,{statuses:[],priceMin:null,priceMax:null});}
   await activateOrbitControl(page,'[data-orbit-filter-status="available"]',false);await activateOrbitControl(page,'[data-orbit-price-toggle]',false);await setOrbitRangeKeyboard(page,'price','min',220000000);await setOrbitRangeKeyboard(page,'price','max',330000000);await activateOrbitControl(page,'[data-orbit-area-toggle]',false);await page.locator('[data-orbit-price-popover]:visible').waitFor({state:'hidden'});await setOrbitRangeKeyboard(page,'area','min',60);await setOrbitRangeKeyboard(page,'area','max',80);const criteria={statuses:['available'],priceMin:220000000,priceMax:330000000,areaMin:60,areaMax:80},state=await waitOrbitFilters(page,criteria);assert.deepEqual(state.matchedIds,expectedOrbitMatches(records,criteria),'Area, price and status combine with AND');assert.ok(state.matchedIds.includes('B005')&&!state.matchedIds.includes('B302')&&!state.matchedIds.includes('B105'));await assertActualMaskColour(page,{id:'B005',x:525,y:462},statusHighlightRGB.available,'Desktop combined area and price highlight');assertSameCamera(camera,await orbitData(page),'Desktop primary controls');assert.equal(await page.locator('#detail-dialog[open]').count(),0,'Filtering never opens a datasheet');await componentScreenshot(page,'primary-orbit-filters-desktop-'+viewport.width+'.png');
  }finally{await f.close();}
 });
 for(const viewport of [{width:320,height:568},{width:390,height:844}])for(const externalOverlay of [false,true])await pass('primary orbit filters phone real touch keeps area price and status in sync '+viewport.width+(externalOverlay?' covered':' native'),async()=>{
  const records=JSON.parse(await readFile(new URL('data/apartments.json',root),'utf8')).apartments,f=await fixture({cleanFixture:true,useDefaultOrbitLayout:true,externalOverlay,context:{viewport,isMobile:true,hasTouch:true,deviceScaleFactor:2},props:{...maskProps,showControls:false,snapDuration:.8}}),{page}=f;
  try{
   await waitStudio(page);await waitMask(page);await page.waitForTimeout(350);const compact=await compactStudioGeometry(page),filters=await primaryFilterGeometry(page),pinned=await pagePosition(page),camera=await orbitData(page);assertStudioViewport(await studioGeometry(page));assertNaturalWidthMobileOrbit(await studioGeometry(page),'Primary filters '+viewport.width+'px');assert.equal(compact.pageScroll.width,viewport.width,'The new controls do not widen the page');assert.ok(compact.detailsScroll.height<=compact.detailsScroll.client+1,'Apartment facts fit without nested scrolling');assert.ok(compact.plan.width>=(viewport.width===320?155:195)&&compact.plan.height>=140,'The drawing retains a readable column');assert.ok(compact.action.height>=44&&compact.action.bottom<=viewport.height,'The datasheet action keeps a visible 44px target');assert.equal(filters.buttons.length,5,'All three statuses and both slider buttons remain exposed');const statusButtons=filters.buttons.filter(button=>!['price','area'].includes(button.kind)),rangeButtons=filters.buttons.filter(button=>['price','area'].includes(button.kind));assert.ok(statusButtons.every(button=>Math.abs(button.y-statusButtons[0].y)<1),'All status choices share the first row');assert.ok(rangeButtons.every(button=>button.y>=statusButtons[0].bottom-1),'Area and price use a second compact row');for(const button of filters.buttons){assert.ok(button.x>=0&&button.right<=viewport.width&&button.y>=0&&button.bottom<=viewport.height,'Every one-click control fits the narrow viewport');if(button.labelWidth!==undefined)assert.ok(button.labelScrollWidth<=button.labelWidth+1,'The '+button.kind+' label is complete');}assert.match(statusButtons.find(button=>button.kind==='available').text,/Elérhető/);assert.doesNotMatch(statusButtons.find(button=>button.kind==='available').text,/Szabad/);
   for(const status of ['available','under_negotiation','sold']){await activateOrbitControl(page,'[data-orbit-filter-status="'+status+'"]',true);const criteria={statuses:[status],priceMin:null,priceMax:null},state=await waitOrbitFilters(page,criteria);assert.deepEqual(state.matchedIds,expectedOrbitMatches(records,criteria),'Tap '+status+' filters the full apartment dataset');await assertActualMaskColour(page,statusControlProbes[status],statusHighlightRGB[status],viewport.width+'px '+status+' actual mask');await activateOrbitControl(page,'[data-orbit-filter-status="'+status+'"]',true);await waitOrbitFilters(page,{statuses:[],priceMin:null,priceMax:null});}
   await activateOrbitControl(page,'[data-orbit-filter-status="available"]',true);await activateOrbitControl(page,'[data-orbit-price-toggle]',true);await assertRangeAboveScene(page,'price');const popup=await page.locator('[data-orbit-price-popover]:visible').boundingBox();assert.ok(popup.x>=0&&popup.y>=0&&popup.x+popup.width<=viewport.width+1&&popup.y+popup.height<=viewport.height+1,'The complete price popover stays inside the short phone viewport');assert.ok(popup.y>=compact.studio.y&&popup.y+popup.height<=compact.studio.bottom,'The price popover is not clipped by the Studio container');if(externalOverlay&&viewport.width===320){const before=await readOrbitFilters(page),statusBox=await page.locator('[data-orbit-filter-status="under_negotiation"]:visible').boundingBox(),rail=await page.locator('[data-orbit-price-stage]:visible').boundingBox(),point={x:statusBox.x+statusBox.width/2,y:popup.y+popup.height-2};assert.ok(point.y>=statusBox.y&&point.y<=statusBox.y+statusBox.height&&point.y>rail.y+rail.height,'The regression click lies in popup padding directly above the negotiation button, outside the slider rail');await page.mouse.click(point.x,point.y);await page.waitForTimeout(60);assert.deepEqual((await readOrbitFilters(page)).criteria,before.criteria,'A passive-cover click on popup padding cannot activate the status beneath it');assertSameCamera(camera,await orbitData(page),'Popup padding over a status button');await page.locator('[data-orbit-price-popover]:visible').waitFor();}let price=await dragOrbitRange(page,'price','min',220000000);assert.ok(Math.abs(price.low-220000000)<=price.step*2,'The lower price thumb responds to actual touch');price=await dragOrbitRange(page,'price','max',330000000);assert.ok(Math.abs(price.high-330000000)<=price.step*2,'The upper price thumb responds to actual touch');await activateOrbitControl(page,'[data-orbit-area-toggle]',true);await page.locator('[data-orbit-price-popover]:visible').waitFor({state:'hidden'});await assertRangeAboveScene(page,'area');let area=await dragOrbitRange(page,'area','min',60);assert.ok(Math.abs(area.low-60)<=1,'The lower area thumb responds to actual touch');area=await dragOrbitRange(page,'area','max',80);assert.ok(Math.abs(area.high-80)<=1,'The upper area thumb responds to actual touch');let criteria={statuses:['available'],priceMin:price.low,priceMax:price.high,areaMin:area.low,areaMax:area.high},state=await waitOrbitFilters(page,criteria);assert.deepEqual(state.matchedIds,expectedOrbitMatches(records,criteria),'Physical touch combines area AND price AND availability');assert.ok(state.matchedIds.includes('B005')&&!state.matchedIds.includes('B302')&&!state.matchedIds.includes('B105'));await assertActualMaskColour(page,{id:'B005',x:525,y:462},statusHighlightRGB.available,'Combined phone criteria light the matching apartment');await waitMaskOverlay(page,await projectMaskPoint(page,statusControlProbes.available),false);await waitMaskOverlay(page,await projectMaskPoint(page,statusControlProbes.sold),false);
   area=await dragOrbitRange(page,'area','min',130);assert.equal(area.low,area.high,'An area thumb clamps at the other handle');area=await setOrbitRangeKeyboard(page,'area','min',60);criteria={...criteria,areaMin:area.low,areaMax:area.high};await waitOrbitFilters(page,criteria);assertSameCamera(camera,await orbitData(page),'Area and price touch and keyboard gestures');await assertPageHeld(page,pinned,'Primary range filter gestures');assert.equal(await page.locator('#detail-dialog[open]').count(),0,'Range gestures never pick the apartment below');await componentScreenshot(page,'primary-orbit-filters-phone-'+viewport.width+(externalOverlay?'-covered':'-native')+'.png');await activateOrbitControl(page,'[data-orbit-area-toggle]',true);await page.locator('[data-orbit-area-popover]:visible').waitFor({state:'hidden'});
   await installCompactCheckpointTrace(page,{details:'[data-orbit-studio-details]',filters:'[data-orbit-studio] [data-orbit-filters]',brand:'.orbit-studio-brand'});const orbit=await studioGeometry(page);await phoneSwipe(page,{x:orbit.viewport.x+orbit.viewport.width*.6,y:orbit.viewport.y+orbit.viewport.height*.4,dx:-110,dy:0});await waitFrame(page,15);await waitMask(page,1);await page.waitForTimeout(450);const samples=await page.evaluate(()=>{clearInterval(window.compactCheckpointTimer);return window.compactCheckpointSamples;});assertCompactCheckpointTrace(samples,'Primary phone filters camera turn',{brand:true});await waitOrbitFilters(page,criteria);await activateOrbitControl(page,'[data-orbit-area-toggle]',true);area=await orbitRangeGeometry(page,'area');assert.equal(area.low,criteria.areaMin,'Area minimum survives checkpoint movement and reopening');assert.equal(area.high,criteria.areaMax,'Area maximum survives checkpoint movement and reopening');await activateOrbitControl(page,'[data-orbit-price-toggle]',true);await page.locator('[data-orbit-area-popover]:visible').waitFor({state:'hidden'});price=await orbitRangeGeometry(page,'price');assert.equal(price.low,criteria.priceMin,'Price minimum survives checkpoint movement');assert.equal(price.high,criteria.priceMax,'Price maximum survives checkpoint movement');await activateOrbitControl(page,'[data-orbit-filter-reset]',true);await waitOrbitFilters(page,{statuses:[],priceMin:null,priceMax:null});await page.waitForFunction(()=>JSON.parse(document.querySelector('[data-admiral-homepage]').dataset.orbitHighlightIds).length===0);await assertPageHeld(page,pinned,'Primary filters after a camera turn');
  }finally{await f.close();}
 });
 for(const viewport of [{width:320,height:568},{width:390,height:844}])await pass('primary orbit filters rotated fullscreen touch edits both ranges and preserves exit '+viewport.width,async()=>{
  const records=JSON.parse(await readFile(new URL('data/apartments.json',root),'utf8')).apartments,f=await fixture({cleanFixture:true,useDefaultOrbitLayout:true,context:{viewport,isMobile:true,hasTouch:true,deviceScaleFactor:2},props:{...maskProps,snapDuration:.8}}),{page}=f;
  try{
   await waitStudio(page);await waitMask(page);const camera=await orbitData(page);await page.locator('[data-orbit-fullscreen-open]:visible').tap();await page.locator('[data-orbit-fullscreen-details]').waitFor();await page.waitForTimeout(450);assert.equal(await page.locator('[data-orbit-fullscreen-surface]').getAttribute('data-orbit-fullscreen-rotated'),'true','A portrait screen uses the horizontal orbit plane');const filters=await primaryFilterGeometry(page);assert.equal(filters.buttons.length,5,'Horizontal fullscreen exposes all primary filters');await activateOrbitControl(page,'[data-orbit-filter-status="available"]',true);await activateOrbitControl(page,'[data-orbit-price-toggle]',true);let price=await dragOrbitRange(page,'price','min',220000000);assert.equal(price.rotated,true,'The price rail is actually rotated on screen');assert.ok(Math.abs(price.low-220000000)<=price.step*3,'A vertical physical gesture edits the horizontal logical price rail');price=await dragOrbitRange(page,'price','max',330000000);assert.ok(Math.abs(price.high-330000000)<=price.step*3,'The rotated upper price thumb remains operable');await activateOrbitControl(page,'[data-orbit-area-toggle]',true);await page.locator('[data-orbit-price-popover]:visible').waitFor({state:'hidden'});await assertRangeAboveScene(page,'area');let area=await dragOrbitRange(page,'area','min',60);assert.ok(Math.abs(area.low-60)<=2,'The rotated lower area thumb responds');area=await dragOrbitRange(page,'area','max',80);assert.ok(Math.abs(area.high-80)<=2,'The rotated upper area thumb responds');const criteria={statuses:['available'],priceMin:price.low,priceMax:price.high,areaMin:area.low,areaMax:area.high},state=await waitOrbitFilters(page,criteria);assert.deepEqual(state.matchedIds,expectedOrbitMatches(records,criteria),'Fullscreen filters use the same combined criteria');await assertActualMaskColour(page,{id:'B005',x:525,y:462},statusHighlightRGB.available,'Fullscreen filtered facade');assertSameCamera(camera,await orbitData(page),'Rotated range gestures');assert.equal(await page.locator('[data-orbit-fullscreen-close]:visible').isEnabled(),true,'Exit remains available with the range open');await componentScreenshot(page,'primary-orbit-filters-horizontal-'+viewport.width+'.png');await page.locator('[data-orbit-fullscreen-close]:visible').tap();await waitStudio(page);await waitOrbitFilters(page,criteria);assertSameCamera(camera,await orbitData(page),'Leaving fullscreen with active area and price');
  }finally{await f.close();}
 });
 await pass('primary orbit filters Home reset clears both range criteria without reloading the page',async()=>{
  const f=await fixture({cleanFixture:true,useDefaultOrbitLayout:true,context:{viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:2},props:maskProps}),{page}=f;
  try{const home=await addHomeNavigation(page);await waitStudio(page);await activateOrbitControl(page,'[data-orbit-price-toggle]',true);await setOrbitRangeKeyboard(page,'price','min',220000000);await activateOrbitControl(page,'[data-orbit-area-toggle]',true);await setOrbitRangeKeyboard(page,'area','min',60);await waitOrbitFilters(page,{statuses:[],priceMin:220000000,priceMax:null,areaMin:60,areaMax:null});await home.evaluate(link=>link.click());await assertOpeningReset(page,'Home clears the primary orbit filters');await waitOrbitFilters(page,{statuses:[],priceMin:null,priceMax:null});assert.equal((await readOrbitFilters(page)).active,false,'Home clears area and price together');assert.equal(await page.locator('[data-orbit-area-popover]:visible').count(),0,'Home closes the area popover');assert.equal(await page.locator('[data-orbit-price-popover]:visible').count(),0,'Home closes the price popover');}finally{await f.close();}
 });
 await pass('compact checkpoint desktop gives the central plan reading room and puts compact filters below the divider',async()=>{
  for(const viewport of [{width:1440,height:900},{width:1920,height:1080}]){
   const f=await fixture({cleanFixture:true,useDefaultOrbitLayout:true,context:{viewport},props:{...studioProps,snapDuration:1.4}}),{page}=f;
   try{
    await waitOrbit(page);await waitDetails(page);await page.locator('[data-apartment-open] img').evaluate(image=>image.decode());await page.waitForTimeout(420);
    const geometry=await page.locator('[data-apartment-details]').evaluate(details=>{
     const box=element=>{const r=element.getBoundingClientRect();return {x:r.x,y:r.y,right:r.right,bottom:r.bottom,width:r.width,height:r.height};},root=details.closest('[data-admiral-homepage]'),filter=[...root.querySelectorAll('[data-orbit-filters]')].find(element=>element.getClientRects().length&&getComputedStyle(element).visibility==='visible'),plan=details.querySelector('[data-apartment-open]');
     const facts=[...details.querySelectorAll('[data-apartment-field]')].filter(element=>element.dataset.apartmentField!=='floorplan').map(element=>{const range=document.createRange();range.selectNodeContents(element);return {name:element.dataset.apartmentField,box:box(element),text:box(range)};});
     return {details:box(details),plan:box(plan),image:box(plan.querySelector('img')),filter:filter?box(filter):null,filterRow:filter?box(filter.querySelector('[data-orbit-filter-row]')):null,fields:facts,gradient:getComputedStyle(details,'::before').backgroundImage,divider:Number.parseFloat(getComputedStyle(details).borderTopWidth),pageWidth:document.documentElement.scrollWidth,viewport:innerWidth};
    });
    assert.ok(geometry.plan.width>=210&&geometry.plan.height>=175&&geometry.image.height>=175,'The desktop floorplan is materially larger than the old 148×100 target: '+JSON.stringify(geometry));
    assert.ok(geometry.filter&&geometry.filter.y>=geometry.details.y+1,'Filters sit in the details area below its top divider, not floating above: '+JSON.stringify(geometry));
    assert.ok(geometry.filter.bottom<=geometry.details.bottom+1&&geometry.filterRow.height<=94,'The primary status and range rows remain within the lower strip');
    assert.ok(geometry.details.height<=290,'Larger drawing does not turn the compact information strip into a tall panel');
    assert.ok(Math.abs(geometry.plan.x+geometry.plan.width/2-viewport.width/2)<2,'The reading-sized floorplan stays centered');
    assert.match(geometry.gradient,/linear-gradient/);assert.equal(geometry.pageWidth,geometry.viewport);
    for(const fact of geometry.fields){assert.ok(fact.box.width>20&&fact.text.x>=fact.box.x-1&&fact.text.right<=fact.box.right+1,'Each desktop fact fits without adjacent overlap: '+JSON.stringify(fact));assert.ok(fact.box.right<=geometry.plan.x+1||fact.box.x>=geometry.plan.right-1,'Facts do not overlap the enlarged plan: '+JSON.stringify(fact));}
    await componentScreenshot(page,'compact-checkpoint-desktop-'+viewport.width+'.png');
   }finally{await f.close();}
  }
 });
 await pass('compact checkpoint desktop fades details and filters in both directions and blocks stale controls through Framer covers',async()=>{
  for(const externalOverlay of [false,true]){
   const f=await fixture({cleanFixture:true,useDefaultOrbitLayout:true,externalOverlay,context:{viewport:{width:1440,height:900}},props:{...studioProps,snapDuration:1.4}}),{page}=f;
   try{
    await waitOrbit(page);await waitDetails(page);await page.waitForTimeout(420);await activateOrbitControl(page,'[data-orbit-filter-status="available"]',false);const criteria={statuses:['available'],priceMin:null,priceMax:null};await waitOrbitFilters(page,criteria);await sendApartment(page,{id:'A002'});await page.waitForFunction(()=>document.querySelector('[data-apartment-field="number"]')?.textContent.includes('A002'));
    await activateOrbitControl(page,'[data-orbit-price-toggle]',false);await page.locator('[data-orbit-price-popover]:visible').waitFor();const plan=await page.locator('[data-apartment-open]').boundingBox(),filter=await orbitControlPoint(page,'[data-orbit-filter-status="sold"]');
    for(const [delta,frame] of [[100,15],[-100,0]]){
     await installCompactCheckpointTrace(page,{details:'[data-apartment-details]',filters:'[data-orbit-filters]'});await freshWheel(page,delta);await page.waitForFunction(()=>['buffering','moving','settling'].includes(document.querySelector('[data-admiral-orbit]').dataset.orbitState));
     await page.mouse.click(filter.x,filter.y);await page.mouse.click(plan.x+plan.width/2,plan.y+plan.height/2);await page.waitForTimeout(260);assert.equal(await page.locator('#detail-dialog[open]').count(),0,'Fading floorplan cannot open a stale card');assert.deepEqual((await readOrbitFilters(page)).criteria,criteria,'A fading filter cannot change the criteria');await page.locator('[data-orbit-price-popover]:visible').waitFor({state:'hidden'});await waitFrame(page,frame);await page.waitForTimeout(450);
     const samples=await page.evaluate(()=>{clearInterval(window.compactCheckpointTimer);return window.compactCheckpointSamples;});assertCompactCheckpointTrace(samples,(externalOverlay?'Covered':'Native')+' desktop '+(delta>0?'forward':'reverse'));await writeFile(new URL('compact-checkpoint-desktop-'+(externalOverlay?'covered':'native')+'-'+frame+'.json',out),JSON.stringify(samples,null,2));assert.deepEqual((await readOrbitFilters(page)).criteria,criteria,'Arrival preserves the chosen status filter');assert.equal(await page.locator('[data-apartment-details]').getAttribute('data-details-visible'),'false','Arrival without a fresh hover keeps apartment data hidden');assert.deepEqual(await page.locator('[data-apartment-details] [data-orbitdata-transition]').evaluateAll(parts=>parts.map(part=>part.dataset.orbitdataDisplayedId)),['',''],'Departing apartment data clears after its camera fade rather than reappearing at the new view');
    }
   }finally{await f.close();}
  }
 });
 await pass('compact checkpoint phone enlarges its plan without scrolling and fades only the apartment UI between cameras',async()=>{
  for(const viewport of [{width:320,height:568},{width:390,height:844}]){
   const f=await fixture({cleanFixture:true,useDefaultOrbitLayout:true,externalOverlay:true,context:{viewport,isMobile:true,hasTouch:true,deviceScaleFactor:2},props:{...studioProps,snapDuration:1.4}}),{page}=f;
   try{
    await waitStudio(page);await page.waitForTimeout(450);const geometry=await studioGeometry(page);assertStudioViewport(geometry);assertNaturalWidthMobileOrbit(geometry,'Compact checkpoint '+viewport.width);const compact=await compactStudioGeometry(page);assertCompactStudioFit(compact,viewport,'Compact checkpoint '+viewport.width);assert.ok(compact.plan.width>=(viewport.width===320?160:200),'The floorplan receives a wider useful column: '+JSON.stringify(compact.plan));
    const heading=await page.locator('[data-orbit-studio-details]').evaluate(panel=>{const bounds=element=>{const rect=element.getBoundingClientRect();return {x:rect.x,y:rect.y,right:rect.right,bottom:rect.bottom};};return {id:bounds(panel.querySelector('.orbit-studio-id')),status:bounds(panel.querySelector('[data-orbit-field="status"]'))};});assert.ok(heading.status.x>=heading.id.right+3&&Math.abs(heading.status.y-heading.id.y)<12,'Phone availability remains beside the apartment number');await componentScreenshot(page,'compact-checkpoint-mobile-'+viewport.width+'.png');
    await activateOrbitControl(page,'[data-orbit-filter-status="available"]',true);const criteria={statuses:['available'],priceMin:null,priceMax:null};await waitOrbitFilters(page,criteria);const pinned=await pagePosition(page);
    for(const [dx,frame]of [[-110,15],[110,0]]){
     await installCompactCheckpointTrace(page,{details:'[data-orbit-studio-details]',filters:'[data-orbit-studio] [data-orbit-filters]',brand:'.orbit-studio-brand'});const orbit=await studioGeometry(page);await phoneSwipe(page,{x:orbit.viewport.x+orbit.viewport.width*.5,y:orbit.viewport.y+orbit.viewport.height*.4,dx,dy:0});await waitFrame(page,frame);await page.waitForTimeout(450);const samples=await page.evaluate(()=>{clearInterval(window.compactCheckpointTimer);return window.compactCheckpointSamples;});assertCompactCheckpointTrace(samples,viewport.width+'px phone '+(dx<0?'forward':'reverse'),{brand:true});assert.deepEqual((await readOrbitFilters(page)).criteria,criteria,'Phone checkpoint retains filters');await assertPageHeld(page,pinned,'Phone checkpoint UI fade');assertNaturalWidthMobileOrbit(await studioGeometry(page),'Restored phone image');
    }
    await activateOrbitControl(page,'[data-orbit-price-toggle]',true);await page.locator('[data-orbit-price-popover]:visible').waitFor();assert.equal((await orbitData(page)).orbitFrame,'0','Price control works again after camera settles');
   }finally{await f.close();}
  }
 });
 await pass('compact checkpoint horizontal fullscreen gives a readable plan and keeps exit available during fades',async()=>{
  const viewport={width:390,height:844},f=await fixture({cleanFixture:true,useDefaultOrbitLayout:true,context:{viewport,isMobile:true,hasTouch:true,deviceScaleFactor:2},props:{...studioProps,snapDuration:1.4}}),{page}=f;
  try{
   await waitStudio(page);await page.locator('[data-orbit-fullscreen-open]:visible').tap();await page.locator('[data-orbit-fullscreen-details]').waitFor();await page.waitForTimeout(450);
   const geometry=await page.locator('[data-orbit-fullscreen-details]').evaluate(hud=>{const plane=hud.closest('[data-orbit-fullscreen-plane]'),image=hud.querySelector('.orbit-fullscreen-plan img'),bar=hud.querySelector('.orbit-fullscreen-bar'),close=hud.querySelector('[data-orbit-fullscreen-close]');return {width:plane.clientWidth,height:plane.clientHeight,planWidth:image.offsetWidth,planHeight:image.offsetHeight,barHeight:bar.offsetHeight,closeDisabled:close.disabled,closeInert:!!close.closest('[inert],[aria-hidden="true"]')};});assert.ok(geometry.planWidth>=130&&geometry.planHeight>=130,'The horizontal viewer enlarges the previous 82px floorplan: '+JSON.stringify(geometry));assert.ok(geometry.barHeight<geometry.height*.55,'The horizontal information strip leaves room for the building: '+JSON.stringify(geometry));
   await installCompactCheckpointTrace(page,{details:'.orbit-fullscreen-bar',brand:'.orbit-fullscreen-brand'});await page.locator('[data-orbit-fullscreen-details]').getByRole('button',{name:'Következő nézet',exact:true}).tap();await page.waitForFunction(()=>['buffering','moving','settling'].includes(document.querySelector('[data-admiral-orbit]').dataset.orbitState));const close=page.locator('[data-orbit-fullscreen-close]:visible');assert.equal(await close.isEnabled(),true,'Exit remains enabled while apartment facts fade');assert.equal(await close.evaluate(element=>!!element.closest('[inert],[aria-hidden="true"]')),false,'Exit stays outside the inert apartment strip');await waitFrame(page,15);await page.waitForTimeout(450);const samples=await page.evaluate(()=>{clearInterval(window.compactCheckpointTimer);return window.compactCheckpointSamples;});assertCompactCheckpointTrace(samples,'Horizontal fullscreen camera turn',{filters:false,brand:true});await componentScreenshot(page,'compact-checkpoint-horizontal.png');await page.locator('[data-orbit-fullscreen-step="previous"]').tap();await page.waitForFunction(()=>['buffering','moving','settling'].includes(document.querySelector('[data-admiral-orbit]').dataset.orbitState));await close.tap();await waitFrame(page,0);await waitStudio(page);assert.equal(await page.locator('[data-admiral-homepage]').getAttribute('data-orbit-fullscreen'),'false','Exit works during an actual camera transition');assertNaturalWidthMobileOrbit(await studioGeometry(page),'Phone after closing horizontal view');
  }finally{await f.close();}
 });
 await pass('compact checkpoint hover mode retains the departing floorplan and facts through the visible fade',async()=>{
  for(const variant of ['classic','phone','horizontal']){
   const phone=variant!=='classic',f=await fixture({cleanFixture:true,useDefaultOrbitLayout:true,context:{viewport:phone?{width:390,height:844}:{width:1440,height:900},...(phone?{isMobile:true,hasTouch:true,deviceScaleFactor:2}:{})},props:{...studioProps,detailsMode:'hover',snapDuration:1.4}}),{page}=f;
   try{
    await waitOrbit(page);await page.waitForFunction(()=>window.apartmentJsonFetched===true);await sendApartment(page,{id:'A101'});if(phone)await waitStudio(page,'A101');else{await page.waitForFunction(()=>document.querySelector('[data-apartment-field="number"]')?.textContent.includes('A101'));await page.locator('[data-apartment-open] img').evaluate(image=>image.decode());}
    if(variant==='horizontal'){await page.locator('[data-orbit-fullscreen-open]:visible').tap();await page.locator('[data-orbit-fullscreen-details]').waitFor();}
    await page.waitForTimeout(450);const details=variant==='classic'?'.admiral-details-grid':variant==='phone'?'[data-orbit-studio-details]':'.orbit-fullscreen-bar';await installCompactCheckpointTrace(page,{details});
    if(variant==='classic')await freshWheel(page,100);else if(variant==='horizontal')await page.locator('[data-orbit-fullscreen-step="next"]').tap();else{const geometry=await studioGeometry(page);await phoneSwipe(page,{x:geometry.viewport.width*.6,y:geometry.viewport.y+geometry.viewport.height*.4,dx:-110,dy:0});}
    await waitFrame(page,15);await page.waitForTimeout(450);const samples=await page.evaluate(()=>{clearInterval(window.compactCheckpointTimer);return window.compactCheckpointSamples;}),departing=samples.filter(sample=>['buffering','moving','settling'].includes(sample.state)&&sample.panelOpacity>.01);
    assert.ok(departing.some(sample=>sample.panelOpacity<.95),variant+' records the visible departing fade');for(const sample of departing){assert.match(sample.panelText,/A101/,variant+' keeps the selected apartment text until the fade is over');assert.equal(sample.planCount,1,variant+' keeps the image mounted through the fade');assert.equal(sample.samePlan,true,variant+' keeps the same loaded image rather than replacing it during fade-out');}assert.equal(await page.locator('#detail-dialog[open]').count(),0,'Camera motion does not open a stale detail card');await writeFile(new URL('compact-checkpoint-hover-'+variant+'.json',out),JSON.stringify(samples,null,2));
   }finally{await f.close();}
  }
 });
 await pass('Home navigation resets scroll-triggered SEQ_01 and ignores the old gesture tail',async()=>{
  const f=await fixture({externalOverlay:true,props:{duration:4,maxSpeed:1,triggerDistance:24}}),{page}=f;
  try{const home=await addHomeNavigation(page);await page.mouse.wheel(0,120);await page.waitForFunction(()=>{const root=document.querySelector('[data-admiral-homepage]'),sequence=root.querySelector('[data-admiral-sequence]');return root.dataset.homepageStage==='approach'&&Number(sequence.dataset.frame)>2;});await home.click();await assertOpeningReset(page,'Home during SEQ_01');await page.mouse.move(450,500);for(let i=0;i<12;i++){await page.mouse.wheel(0,4);await page.waitForTimeout(16);}await assertOpeningReset(page,'Old scroll inertia after Home');await page.waitForTimeout(300);await page.mouse.wheel(0,120);await waitStage(page,'approach');}finally{await f.close();}
 });
 await pass('Home navigation cancels SEQ_02 pending decodes and later reentry survives stale completions',async()=>{
  const f=await fixture({useDefaultOrbitStart:true,props:{connectionDuration:3,maxSpeed:1}}),{page}=f;
  try{const home=await addHomeNavigation(page,'/#top');await coveredClick(page,'Skip approach');await waitStage(page,'building');await coveredClick(page,'Explore building');await waitConnectionFrame(page,5,35);await page.evaluate(()=>window.gateSequenceDecodes('SEQ_02'));await page.waitForFunction(()=>window.sequenceDecodeGateWaiters>0);await home.click();await assertOpeningReset(page,'Home during SEQ_02');await page.evaluate(()=>window.releaseSequenceDecodeGates());await page.waitForTimeout(400);await assertOpeningReset(page,'Cancelled SEQ_02 decode completion');await coveredClick(page,'Skip approach');await waitStage(page,'building');await coveredClick(page,'Explore building');await waitStage(page,'connection');await coveredClick(page,'Skip connection');await waitFrame(page,45);await page.waitForTimeout(400);assert.equal(await page.locator('[data-admiral-homepage]').getAttribute('data-homepage-stage'),'orbit','Old SEQ_02 callbacks cannot replace a fresh Explore activation');}finally{await f.close();}
 });
 await pass('Home navigation resets moving and parked orbit while retaining compressed orbit downloads',async()=>{
  const f=await fixture({props:{startView:'orbit',snapDuration:2}}),{page}=f;
  try{const home=await addHomeNavigation(page);await waitOrbit(page);await page.waitForFunction(()=>Number(document.querySelector('[data-admiral-orbit]').dataset.orbitDownloaded)===120);await waitBuffer(page,61);await page.evaluate(()=>window.homeResetOrbitCanvas=document.querySelector('canvas[data-orbit-canvas]'));const requests=f.orbitRequests.length;await page.getByRole('button',{name:'Next view',exact:true}).click();await page.waitForFunction(()=>{const orbit=document.querySelector('[data-admiral-orbit]');return ['moving','settling'].includes(orbit?.dataset.orbitState)&&Number(orbit.dataset.orbitPosition)>1&&Number(orbit.dataset.orbitPosition)<14;});await home.click();await assertOpeningReset(page,'Home during an orbit turn');await page.waitForTimeout(2200);await assertOpeningReset(page,'Cancelled orbit turn completion');assert.equal(f.orbitRequests.length,requests,'Home retains all compressed orbit downloads');assert.equal(await page.evaluate(()=>window.homeResetOrbitCanvas===document.querySelector('canvas[data-orbit-canvas]')),true,'Home keeps the existing orbit canvas/controller');await coveredClick(page,'Skip approach');await waitStage(page,'building');await coveredClick(page,'Explore building');await waitStage(page,'connection');await coveredClick(page,'Skip connection');await waitFrame(page,0);assert.equal(f.orbitRequests.length,requests,'Reentry reuses compressed orbit downloads');await home.click();await assertOpeningReset(page,'Home at a parked orbit checkpoint');}finally{await f.close();}
 });
 await pass('Home navigation clears mobile apartment filters selection shared card and fullscreen',async()=>{
  const f=await fixture({cleanFixture:true,useDefaultOrbitLayout:true,context:{viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:2},props:{...maskProps,showControls:true}}),{page}=f;
  try{const home=await addHomeNavigation(page);await waitStudio(page);await waitMask(page);await activateOrbitControl(page,'[data-orbit-filter-status="available"]',true);await waitOrbitFilters(page,{statuses:['available'],priceMin:null,priceMax:null});await tapRealMask(page,realMaskViews[0].probe);await waitStudio(page,realMaskViews[0].probe.id);await page.evaluate(()=>{Object.defineProperty(HTMLElement.prototype,'requestFullscreen',{configurable:true,value:undefined});Object.defineProperty(HTMLElement.prototype,'webkitRequestFullscreen',{configurable:true,value:undefined});});await page.locator('[data-orbit-fullscreen-open]:visible').tap();await page.locator('[data-orbit-fullscreen-surface][data-active="true"]').waitFor({state:'visible'});await page.locator('[data-orbit-fullscreen-details] [data-orbit-detail-link]:visible').tap();await waitApartmentCard(page,realMaskViews[0].probe.id);await home.evaluate(link=>link.click());await assertOpeningReset(page,'Home from the mobile apartment experience');await page.locator('#detail-dialog[open]').waitFor({state:'hidden'});assert.equal(await page.locator('[data-admiral-homepage]').getAttribute('data-orbit-fullscreen'),'false','Home closes the horizontal orbit viewer');assert.equal(await page.locator('[data-orbit-fullscreen-surface][data-active="true"]').count(),0,'No fullscreen surface remains active');const filters=await waitOrbitFilters(page,{statuses:[],priceMin:null,priceMax:null});assert.equal(filters.active,false,'Home clears active status/price filters');assert.deepEqual(filters.highlightIds,[],'Home leaves no old filter highlights');assert.ok(!await page.locator('[data-admiral-homepage]').getAttribute('data-orbit-mask-hovered'),'Home clears the selected apartment');await page.getByRole('button',{name:'Skip approach',exact:true}).tap({timeout:4000});await waitStage(page,'building');await page.getByRole('button',{name:'Explore building',exact:true}).tap();await waitStage(page,'connection');await page.getByRole('button',{name:'Skip connection',exact:true}).tap();await waitStudio(page,'A001');await waitMask(page);assert.equal(await page.locator('#detail-dialog[open]').count(),0,'Reentry does not reopen a stale detail card');}finally{await f.close();}
 });
 await pass('Home navigation leaves other destinations native and accepts canonical current-page links',async()=>{
  const f=await fixture({initialUrl:'http://homepage.test/homepage-draft?view=trial',props:{startView:'orbit'}}),{page}=f;
  try{await waitOrbit(page);const camera=await orbitData(page);const cases=[{href:'/lakások'},{href:'https://example.com/homepage-draft?view=trial'},{href:'/homepage-draft?view=trial#apartments'},{href:'/homepage-draft?view=other'},{href:'/homepage-draft?view=trial',attributes:{target:'_blank'}},{href:'/homepage-draft?view=trial',attributes:{download:'orbit.html'}},{href:'/homepage-draft?view=trial',modifiers:{ctrlKey:true}},{href:'/homepage-draft?view=trial',modifiers:{metaKey:true}},{href:'/homepage-draft?view=trial',modifiers:{shiftKey:true}},{href:'/homepage-draft?view=trial',modifiers:{altKey:true}},{href:'/homepage-draft?view=trial',modifiers:{button:1}}];
   for(const item of cases){await addHomeNavigation(page,item.href,item.attributes);const prevented=await page.evaluate(modifiers=>{let intercepted;const guard=event=>{intercepted=event.defaultPrevented;event.preventDefault();};document.addEventListener('click',guard,{once:true});document.querySelector('#home-reset-link').dispatchEvent(new MouseEvent('click',{bubbles:true,cancelable:true,...modifiers}));return intercepted;},item.modifiers||{});assert.equal(prevented,false,'Non-home navigation remains native: '+JSON.stringify(item));assertSameCamera(camera,await orbitData(page),'Non-home navigation '+item.href);assert.equal(await page.locator('[data-admiral-homepage]').getAttribute('data-homepage-stage'),'orbit','Non-home links never reset the homepage');}
   await addHomeNavigation(page,'/homepage-draft/?view=trial#top');await page.locator('#home-reset-link').click();await assertOpeningReset(page,'Canonical current-page trailing slash and #top');
  }finally{await f.close();}
 });
 await pass('mobile orbit availability stays beside apartment number for every status at320px',async()=>{
  const f=await fixture({cleanFixture:true,useDefaultOrbitLayout:true,context:{viewport:{width:320,height:568},isMobile:true,hasTouch:true,deviceScaleFactor:2},props:{...maskProps,maskAvailableColor:'var(--token-66c2eeca-6d1b-4d69-991e-55004b209eb7, rgb(46, 119, 255))',maskHighlightOpacity:33}}),{page}=f;
  try{await waitStudio(page);await waitMask(page);for(const [status,probe]of Object.entries(statusControlProbes)){await tapRealMask(page,probe);await waitStudio(page,probe.id);const geometry=await page.locator('[data-orbit-studio-details]').evaluate(summary=>{const heading=summary.querySelector('.orbit-studio-id'),status=summary.querySelector('[data-orbit-field="status"]'),box=element=>{const rect=element.getBoundingClientRect();return {x:rect.x,y:rect.y,right:rect.right,bottom:rect.bottom,width:rect.width,height:rect.height};},text=document.createRange();text.selectNodeContents(status);return {summary:box(summary),number:box(heading),status:box(status),text:box(text),statusId:status.dataset.status};});assert.equal(geometry.statusId,status);assert.ok(geometry.status.x>=geometry.number.right+3,'The '+status+' availability is next to the apartment number');assert.ok(Math.abs((geometry.number.y+geometry.number.height/2)-(geometry.status.y+geometry.status.height/2))<=2,'The '+status+' availability shares the number row');assert.ok(geometry.status.right<=geometry.summary.right+1&&geometry.text.right<=geometry.status.right+1&&geometry.text.bottom<=geometry.status.bottom+1,'The '+status+' availability text fits without clipping or wrapping');const layout=await compactStudioGeometry(page);await componentScreenshot(page,'compact-checkpoint-status-320-'+status+'.png');await writeFile(new URL('compact-checkpoint-status-320-'+status+'.json',out),JSON.stringify(layout,null,2));assert.ok(layout.detailsScroll.height<=layout.detailsScroll.client+1,'The '+status+' view has no hidden detail content or scrolling: '+JSON.stringify(layout));assert.equal(layout.pageScroll.width,layout.pageScroll.viewport,'The '+status+' view has no horizontal overflow');assert.ok(geometry.number.x>=layout.root.x&&geometry.number.y>=layout.root.y&&geometry.status.right<=layout.root.right&&geometry.status.bottom<=layout.root.bottom,'The entire '+status+' heading row remains inside the viewport');await assertActualMaskColour(page,probe,status==='available'?[46,119,255]:statusHighlightRGB[status],'320px '+status+' selection');await componentScreenshot(page,'orbit-heading-320-'+status+'.png');}}finally{await f.close();}
 });
 for(const width of [320,390])for(const externalOverlay of [false,true])await pass('mobile price touch gestures change both handles and track '+width+(externalOverlay?' through passive overlay':' with native input'),async()=>{
  const records=JSON.parse(await readFile(new URL('data/apartments.json',root),'utf8')).apartments,f=await fixture({cleanFixture:true,useDefaultOrbitLayout:true,externalOverlay,context:{viewport:{width,height:width===320?568:844},isMobile:true,hasTouch:true,deviceScaleFactor:2},props:{...maskProps,maskAvailableColor:'var(--token-66c2eeca-6d1b-4d69-991e-55004b209eb7, rgb(46, 119, 255))',maskHighlightOpacity:33}}),{page}=f;
  try{
   await waitStudio(page);await waitMask(page);const camera=await orbitData(page),pinned=await pagePosition(page);await page.locator('[data-admiral-homepage]').evaluate(root=>{window.orbitFilterEvents=[];root.addEventListener('admiral:orbit-filter-change',event=>window.orbitFilterEvents.push(structuredClone(event.detail)));});await activateOrbitControl(page,'[data-orbit-filter-status="available"]',true);await waitOrbitFilters(page,{statuses:['available'],priceMin:null,priceMax:null});await assertActualMaskColour(page,statusControlProbes.available,[46,119,255],'Blue status selection before price gestures');await activateOrbitControl(page,'[data-orbit-price-toggle]',true);await page.locator('[data-orbit-price-popover]:visible').waitFor();
   let geometry=await dragOrbitPrice(page,'min',220000000);assert.ok(Math.abs(geometry.low-220000000)<=4000000,'An actual lower-thumb drag changes the minimum price: '+JSON.stringify(geometry));assert.equal(geometry.high,geometry.maximum,'Dragging the lower handle preserves the upper handle');geometry=await dragOrbitPrice(page,'max',330000000);assert.ok(Math.abs(geometry.high-330000000)<=4000000,'An actual upper-thumb drag changes the maximum price: '+JSON.stringify(geometry));let criteria={statuses:['available'],priceMin:geometry.low,priceMax:geometry.high},state=await waitOrbitFilters(page,criteria),ids=assertOrbitFilterState(state,criteria,records,'Touch thumbs combine price AND availability');assert.ok(ids.includes('B005')&&!ids.includes('B302')&&!ids.includes('B105'),'The dragged range retains the286M available apartment and excludes the expensive or sold ones');await assertActualMaskColour(page,{id:'B005',x:525,y:462},[46,119,255],'Actual dragged price range highlights the matching apartment blue');await waitMaskOverlay(page,await projectMaskPoint(page,statusControlProbes.available),false);
   const trackTap=orbitPricePoint(geometry,175000000);await page.touchscreen.tap(trackTap.x,trackTap.y);await page.waitForTimeout(40);geometry=await orbitPriceGeometry(page);assert.ok(Math.abs(geometry.low-175000000)<=4000000,'An actual tap on the empty track changes the closest handle');const trackFrom=orbitPricePoint(geometry,240000000),trackTo=orbitPricePoint(geometry,260000000);await phoneSwipe(page,{...trackFrom,dx:trackTo.x-trackFrom.x,dy:0});await page.waitForTimeout(40);geometry=await orbitPriceGeometry(page);assert.ok(Math.abs(geometry.low-260000000)<=4000000,'Dragging from the track keeps moving the chosen handle');criteria={statuses:['available'],priceMin:geometry.low,priceMax:geometry.high};assertOrbitFilterState(await waitOrbitFilters(page,criteria),criteria,records,'Track gestures keep status AND price criteria');await assertActualMaskColour(page,{id:'B005',x:525,y:462},[46,119,255],'Track dragging retains matching blue highlights');
   geometry=await dragOrbitPrice(page,'min',600000000);assert.ok(geometry.low<=geometry.high,'Crossing the other thumb never inverts the range');assert.equal(geometry.low,geometry.high,'The lower handle clamps at the upper handle');const input=page.locator('[data-orbit-price-min]:visible');await input.focus();await input.press('Home');await input.press('ArrowRight');geometry=await orbitPriceGeometry(page);assert.equal(geometry.low,geometry.minimum+1000000,'The same native range retains keyboard editing after touch dragging');criteria={statuses:['available'],priceMin:geometry.low,priceMax:geometry.high};assertOrbitFilterState(await waitOrbitFilters(page,criteria),criteria,records,'Keyboard preserves the controlled filter state');assert.ok((await page.evaluate(()=>window.orbitFilterEvents)).every(event=>(event.priceMin??153000000)<=(event.priceMax??677000000)),'No intermediate pointer update publishes an inverted range');await page.locator('[data-orbit-price-popover]:visible').waitFor();assertSameCamera(camera,await orbitData(page),'Touching both handles, the track and native keys');await assertPageHeld(page,pinned,'All price-control gestures');assert.equal(await page.locator('#detail-dialog[open]').count(),0,'Price gestures never open an apartment underneath');await componentScreenshot(page,'orbit-price-touch-'+width+(externalOverlay?'-overlay':'-native')+'.png');await activateOrbitControl(page,'[data-orbit-price-toggle]',true);await page.locator('[data-orbit-price-popover]:visible').waitFor({state:'hidden'});
  }finally{await f.close();}
 });
 for(const variant of [
  {name:'direct blue hex',color:'#0066ff'},
  {name:'direct blue rgb',color:'rgb(0, 102, 255)'},
  {name:'Framer token fallback',color:'var(--token-missing-orbit-highlight, #0066ff)'},
  {name:'inherited mobile breakpoint token',color:'var(--token-orbit-highlight, #ff8a00)',css:':root{--token-orbit-highlight:#ff8a00}@media(max-width:600px){:root{--token-orbit-highlight:#0066ff}}'},
  {name:'published Framer rgb token fallback',color:'var(--token-66c2eeca-6d1b-4d69-991e-55004b209eb7, rgb(46, 119, 255))',rgb:[46,119,255],opacity:33},
  {name:'published Framer inherited blue override',color:'var(--token-66c2eeca-6d1b-4d69-991e-55004b209eb7, rgb(46, 119, 255))',rgb:[46,119,255],opacity:33,css:':root{--token-66c2eeca-6d1b-4d69-991e-55004b209eb7:#ff8a00}@media(max-width:600px){:root{--token-66c2eeca-6d1b-4d69-991e-55004b209eb7:rgb(46,119,255)}}'}
 ])await pass('mobile highlight colour '+variant.name+' matches real filtered tapped and fullscreen pixels',async()=>{
  const rgb=variant.rgb||[0,102,255],f=await fixture({cleanFixture:true,useDefaultOrbitLayout:true,authoredCss:variant.css,context:{viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:2},props:{...maskProps,maskAvailableColor:variant.color,...(variant.opacity?{maskHighlightOpacity:variant.opacity}:{})}}),{page}=f;
  try{
   await waitStudio(page);await waitMask(page);const camera=await orbitData(page);await page.locator('[data-orbit-filter-status="available"]:visible').tap();await waitOrbitFilters(page,{statuses:['available'],priceMin:null,priceMax:null});const filteredRgba=await assertActualMaskColour(page,realMaskViews[0].probe,rgb,variant.name+' availability filter');if(variant.opacity)assert.ok(Math.abs(filteredRgba[3]-Math.round(255*variant.opacity/100))<=1,'The published opacity control retains its '+variant.opacity+'% alpha');await assertActualMaskColour(page,realMaskViews[0].second,rgb,variant.name+' second matching apartment');
   await page.locator('[data-orbit-filter-reset]:visible').tap();await waitOrbitFilters(page,{statuses:[],priceMin:null,priceMax:null});await tapRealMask(page,realMaskViews[0].probe);await waitStudio(page,realMaskViews[0].probe.id);await assertActualMaskColour(page,realMaskViews[0].probe,rgb,variant.name+' real apartment tap');await waitMaskOverlay(page,await projectMaskPoint(page,realMaskViews[0].second),false);assert.equal(await page.locator('#detail-dialog[open]').count(),0,'Colour testing retains the normal tap-to-select behavior');
   await page.locator('[data-orbit-fullscreen-open]:visible').tap();await page.locator('[data-orbit-fullscreen-surface][data-active="true"]').waitFor();await waitMask(page);await assertActualMaskColour(page,realMaskViews[0].probe,rgb,variant.name+' fullscreen selection');await tapRealMask(page,realMaskViews[0].second);await page.waitForFunction(id=>document.querySelector('[data-orbit-fullscreen-details]')?.textContent.includes(id),realMaskViews[0].second.id);await assertActualMaskColour(page,realMaskViews[0].second,rgb,variant.name+' rotated fullscreen tap');await page.locator('[data-orbit-fullscreen-close]:visible').tap();await waitStudio(page,realMaskViews[0].second.id);assertSameCamera(camera,await orbitData(page),variant.name+' colour presentation');await componentScreenshot(page,'highlight-colour-'+variant.name.replaceAll(' ','-')+'.png');
  }finally{await f.close();}
 });
 await pass('mobile highlight colour live orange to blue update preserves camera selection and downloaded frames',async()=>{
  const f=await fixture({cleanFixture:true,useDefaultOrbitLayout:true,context:{viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:2},props:{...maskProps,maskAvailableColor:'#ff8a00'}}),{page}=f;
  try{
   await waitStudio(page);await waitMask(page);await page.locator('[data-orbit-filter-status="available"]:visible').tap();const criteria={statuses:['available'],priceMin:null,priceMax:null};await waitOrbitFilters(page,criteria);await tapRealMask(page,realMaskViews[0].probe);await waitStudio(page,realMaskViews[0].probe.id);await assertActualMaskColour(page,realMaskViews[0].probe,[255,138,0],'Initial orange selection');await page.waitForFunction(()=>Number(document.querySelector('[data-admiral-homepage]').dataset.orbitMaskDownloaded)===8);await page.waitForTimeout(500);const camera=await orbitData(page),requests={orbit:[...f.orbitRequests],masks:[...f.maskRequests]},decodes=await page.evaluate(()=>window.nativeBitmapCalls);await page.evaluate(()=>{window.colourOriginalCanvas=document.querySelector('canvas[data-orbit-mask-overlay]');window.props={...window.props,maskAvailableColor:'#0066ff'};window.renderTrial();});await assertActualMaskColour(page,realMaskViews[0].probe,[0,102,255],'Live blue control update');await waitStudio(page,realMaskViews[0].probe.id);assertSameCamera(camera,await orbitData(page),'Live highlight-colour update');assert.deepEqual((await readOrbitFilters(page)).criteria,criteria,'A live colour change retains active status filters');assert.equal(await page.evaluate(()=>window.colourOriginalCanvas===document.querySelector('canvas[data-orbit-mask-overlay]')),true,'The live colour control keeps the existing overlay canvas');assert.deepEqual(f.orbitRequests,requests.orbit,'A colour edit never downloads the orbit again');assert.deepEqual(f.maskRequests,requests.masks,'A colour edit never downloads mask PNGs again');assert.equal(await page.evaluate(()=>window.nativeBitmapCalls),decodes,'A colour edit does not restart native image decoding');await componentScreenshot(page,'highlight-colour-live-blue.png');
  }finally{await f.close();}
 });
 for(const layout of ['mobile','desktop-classic','desktop-studio'])for(const externalOverlay of [false,true])await pass('status controls actual PNG highlights '+layout+(externalOverlay?' through passive Framer overlay':' with native input'),async()=>{
  const mobile=layout==='mobile',records=JSON.parse(await readFile(new URL('data/apartments.json',root),'utf8')).apartments,empty={statuses:[],priceMin:null,priceMax:null},label=layout+(externalOverlay?' overlay':' native');
  const f=await fixture({cleanFixture:true,useDefaultOrbitLayout:layout!=='desktop-studio',externalOverlay,context:{viewport:mobile?{width:390,height:844}:{width:1440,height:900},...(mobile?{isMobile:true,hasTouch:true,deviceScaleFactor:2}:{})},props:{...maskProps,showControls:true,snapDuration:.7}}),{page}=f;
  try{
   await waitOrbit(page);await waitMask(page);if(mobile||layout==='desktop-studio')await waitStudio(page);const camera=await orbitData(page),pinned=await pagePosition(page);
   const host=mobile?'[data-orbit-studio]':layout==='desktop-classic'?'[data-orbit-desktop-filters]':'[data-orbit-studio-filters]';assert.equal(await page.locator(host+':visible [data-orbit-filter-row]').count(),1,label+' exposes the availability controls in the intended layout');assert.equal(await page.locator('[data-orbit-filter-row]:visible').count(),1,label+' never duplicates the active controls');
   assert.equal((await page.locator('[data-orbit-filter-status="under_negotiation"]:visible .orbit-filter-status-label').innerText()).trim(),'Egyeztetés alatt','The negotiation label is complete');
   await page.locator('[data-admiral-homepage]').evaluate(root=>{window.orbitFilterEvents=[];root.addEventListener('admiral:orbit-filter-change',event=>window.orbitFilterEvents.push(structuredClone(event.detail)));});
   for(const [status,count]of [['available',61],['under_negotiation',2],['sold',6]]){
    await activateOrbitControl(page,'[data-orbit-filter-status="'+status+'"]',mobile);const criterion={...empty,statuses:[status]},state=await waitOrbitFilters(page,criterion);assert.equal(assertOrbitFilterState(state,criterion,records,label+' '+status).length,count);assert.equal(await page.locator('[data-orbit-filter-status="'+status+'"]:visible').getAttribute('aria-pressed'),'true');await assertStatusMaskPixels(page,[status]);assertSameCamera(camera,await orbitData(page),label+' status click');
    await activateOrbitControl(page,'[data-orbit-filter-status="'+status+'"]',mobile);assertOrbitFilterState(await waitOrbitFilters(page,empty),empty,records,label+' toggles '+status+' off');await assertStatusMaskPixels(page,[]);
   }
   await activateOrbitControl(page,'[data-orbit-filter-status="available"]',mobile);await activateOrbitControl(page,'[data-orbit-filter-status="under_negotiation"]',mobile);const combined={...empty,statuses:['available','under_negotiation']};assert.equal(assertOrbitFilterState(await waitOrbitFilters(page,combined),combined,records,label+' OR selection').length,63);await assertStatusMaskPixels(page,combined.statuses);await componentScreenshot(page,'status-controls-'+layout+(externalOverlay?'-overlay':'-native')+'.png');
   await activateOrbitControl(page,'[data-orbit-filter-status="available"]',mobile);const negotiation={...empty,statuses:['under_negotiation']};assert.equal(assertOrbitFilterState(await waitOrbitFilters(page,negotiation),negotiation,records,label+' removes one OR option').length,2);await assertStatusMaskPixels(page,negotiation.statuses);await activateOrbitControl(page,'[data-orbit-filter-status="available"]',mobile);await waitOrbitFilters(page,combined);
   await activateOrbitControl(page,'[data-orbit-price-toggle]',mobile);await page.locator('[data-orbit-price-popover]:visible').waitFor();await setOrbitPrice(page,'max',300000000);await setOrbitPrice(page,'min',160000000);const priced={...combined,priceMin:160000000,priceMax:300000000},pricedIds=assertOrbitFilterState(await waitOrbitFilters(page,priced),priced,records,label+' native range applies price AND');assert.ok(pricedIds.length>0&&pricedIds.length<63);assert.ok(pricedIds.includes('B006')&&pricedIds.includes('B005')&&!pricedIds.includes('B302')&&!pricedIds.includes('B105'));
   for(const [probe,lit]of [[{id:'B005',x:525,y:462},true],[statusControlProbes.under_negotiation,true],[statusControlProbes.available,false],[statusControlProbes.sold,false]])await waitMaskOverlay(page,await projectMaskPoint(page,probe),lit);
   await activateOrbitControl(page,'[data-orbit-price-toggle]',mobile);await page.locator('[data-orbit-price-popover]:visible').waitFor({state:'hidden'});assertSameCamera(camera,await orbitData(page),label+' filters and price popup');await assertPageHeld(page,pinned,label+' filtering');assert.equal(await page.locator('#detail-dialog[open]').count(),0,'Filter input never opens the apartment underneath');
   if(mobile){await activateOrbitControl(page,'[data-orbit-fullscreen-open]',true);await page.locator('[data-orbit-fullscreen-surface][data-active="true"]').waitFor();await waitMask(page);assertOrbitFilterState(await readOrbitFilters(page),priced,records,label+' fullscreen retains criteria');await waitMaskOverlay(page,await projectMaskPoint(page,statusControlProbes.under_negotiation),true);await page.locator('[data-orbit-fullscreen-close]:visible').tap();await waitMask(page);assertSameCamera(camera,await orbitData(page),label+' fullscreen exit');}
   await coveredClick(page,'Next view');await page.waitForFunction(()=>JSON.parse(document.querySelector('[data-admiral-homepage]').dataset.orbitHighlightIds).length===0);await waitFrame(page,15);await waitMask(page,1);await page.waitForFunction(count=>JSON.parse(document.querySelector('[data-admiral-homepage]').dataset.orbitHighlightIds).length===count,pricedIds.length);assertOrbitFilterState(await readOrbitFilters(page),priced,records,label+' next camera preserves filters');await waitMaskOverlay(page,await projectMaskPoint(page,{id:'C003',x:1252,y:660}),true);
   await activateOrbitControl(page,'[data-orbit-filter-reset]',mobile);assertOrbitFilterState(await waitOrbitFilters(page,empty),empty,records,label+' reset');await waitMaskOverlay(page,await projectMaskPoint(page,{id:'C003',x:1252,y:660}),false);assert.equal(Number((await orbitData(page)).orbitFrame),15,'Reset preserves the settled camera');
  }finally{await f.close();}
 });
 await pass('status controls passive overlay price popup protects camera gestures',async()=>{
  for(const mobile of [true,false]){
   const f=await fixture({cleanFixture:true,useDefaultOrbitLayout:true,externalOverlay:true,context:{viewport:mobile?{width:320,height:568}:{width:1440,height:900},...(mobile?{isMobile:true,hasTouch:true,deviceScaleFactor:2}:{})},props:{...maskProps,showControls:true}}),{page}=f;
   try{await waitOrbit(page);await waitMask(page);if(mobile)await waitStudio(page);const camera=await orbitData(page),pinned=await pagePosition(page);await activateOrbitControl(page,'[data-orbit-price-toggle]',mobile);const popup=page.locator('[data-orbit-price-popover]:visible');await popup.waitFor();const box=await popup.boundingBox(),slider=await page.locator('[data-orbit-price-min]:visible').boundingBox();assert.ok(box.x>=-1&&box.y>=0&&box.x+box.width<= (mobile?320:1440)+1,'The popup stays visible behind the passive overlay');
    const point={x:slider.x+slider.width*.3,y:slider.y+slider.height/2};if(mobile)await phoneSwipe(page,{...point,dx:45,dy:0});else{await page.mouse.move(point.x,point.y);await page.mouse.down();await page.mouse.move(point.x+75,point.y,{steps:6});await page.mouse.up();}await popup.waitFor();assertSameCamera(camera,await orbitData(page),'A covered range gesture');await assertPageHeld(page,pinned,'A covered price range gesture');assert.equal(await page.locator('#detail-dialog[open]').count(),0,'The popup does not pick an apartment');await activateOrbitControl(page,'[data-orbit-price-toggle]',mobile);await popup.waitFor({state:'hidden'});assertSameCamera(camera,await orbitData(page),'The covered price button closes its own popup');
   }finally{await f.close();}
  }
 });
 await pass('real masks decode all calibrated apartment colours without unknown or antialiased IDs',async()=>{
  const records=JSON.parse(await readFile(new URL('data/apartments.json',root),'utf8')).apartments.map(record=>({id:record.id,color:record.maskColor}));
  const f=await fixture({cleanFixture:true,props:{startView:'orbit',showControls:false}}),{page}=f;
  try{
   const decoded=await page.evaluate(async({records,views})=>{
    const lut={32:99,80:151,128:187,176:216,224:241},palette=new Map(records.map(record=>{const channels=record.color.slice(1).match(/../g).map(value=>lut[parseInt(value,16)]);return [(channels[0]<<16)|(channels[1]<<8)|channels[2],record.id];})),seen=new Set(),unknown=new Set(),samples=[];
    const canvas=document.createElement('canvas');canvas.width=1920;canvas.height=1010;const context=canvas.getContext('2d',{willReadFrequently:true});
    for(const view of views){const url='http://homepage.test/masks/mask_CMasking_WireColor'+String(view.frame).padStart(4,'0')+'.png',blob=await(await fetch(url)).blob(),bitmap=await createImageBitmap(blob,{premultiplyAlpha:'none',colorSpaceConversion:'none'});context.clearRect(0,0,1920,1010);context.drawImage(bitmap,0,0);bitmap.close();const pixels=context.getImageData(0,0,1920,1010).data;for(let index=0;index<pixels.length;index+=4){const color=(pixels[index]<<16)|(pixels[index+1]<<8)|pixels[index+2];if(pixels[index+3]!==255)unknown.add('alpha:'+pixels[index+3]);if(color!==0){const id=palette.get(color);if(id)seen.add(id);else unknown.add(color.toString(16));}}for(const probe of [view.probe,view.second]){const index=(probe.y*1920+probe.x)*4,color=(pixels[index]<<16)|(pixels[index+1]<<8)|pixels[index+2];samples.push({frame:view.frame,expected:probe.id,actual:palette.get(color),rgb:[...pixels.slice(index,index+4)]});}}
    return {seen:[...seen].sort(),unknown:[...unknown],samples};
   },{records,views:realMaskViews});
   assert.deepEqual(decoded.unknown,[],'The actual decoded PNGs contain only background and exact calibrated apartment colours');assert.deepEqual(decoded.seen,records.map(record=>record.id).sort(),'All 69 JSON apartments occur in the eight real checkpoint masks');for(const sample of decoded.samples)assert.equal(sample.actual,sample.expected,'The audited interior pixel identifies the correct apartment at frame '+sample.frame);
   assert.deepEqual([...new Set(f.maskRequests)].sort((a,b)=>a-b),[0,1,2,3,4,5,6,7]);
  }finally{await f.close();}
 });
 await pass('real mask desktop hover click drag and all eight checkpoints use actual PNG pixels',async()=>{
  const f=await fixture({cleanFixture:true,useDefaultOrbitLayout:true,context:{viewport:{width:1440,height:900}},props:{...maskProps,showControls:true,snapDuration:.7}}),{page}=f;
  try{
   await waitOrbit(page);await waitMask(page);const first=realMaskViews[0].probe,point=await projectMaskPoint(page,first);assert.equal((await maskOverlayPixel(page,point))[3],0,'The raw ID map is invisible before a real hover');
   await hoverRealMask(page,first);await page.waitForFunction(id=>document.querySelector('[data-apartment-field=number]')?.textContent.includes(id),first.id);const colour=await maskOverlayPixel(page,point);assert.ok(colour[3]>0&&statusHighlightRGB.available.every((channel,index)=>Math.abs(colour[index]-channel)<=4),'The hovered apartment has its green availability overlay instead of its ID colour');assert.equal(await page.locator('#detail-dialog[open]').count(),0,'Hover updates the bottom bar without opening a card');await page.waitForTimeout(220);await componentScreenshot(page,'real-mask-desktop-hover.png');
   await page.mouse.click(point.x,point.y);await waitApartmentCard(page,first.id);await closeApartmentCard(page);assert.equal(Number((await orbitData(page)).orbitFrame),0,'The clicked apartment card preserves the current camera');
   const background=await projectMaskPoint(page,realMaskViews[0].background);await page.mouse.move(background.x,background.y);await page.waitForFunction(()=>!document.querySelector('[data-admiral-homepage]').dataset.orbitMaskHovered);await waitMaskOverlay(page,point,false);assert.equal((await maskOverlayPixel(page,point))[3],0,'Moving onto black background removes the hover overlay');
   await page.evaluate(point=>{const button=document.createElement('button');button.id='native-mask-framer-action';button.textContent='Native Framer action';Object.assign(button.style,{position:'fixed',left:(point.x-50)+'px',top:(point.y-20)+'px',width:'100px',height:'40px',zIndex:'100'});button.onclick=()=>window.nativeMaskFramerClicks=(window.nativeMaskFramerClicks||0)+1;document.body.appendChild(button);},point);await page.mouse.click(point.x,point.y);assert.equal(await page.evaluate(()=>window.nativeMaskFramerClicks),1,'A native Framer button above a coloured mask keeps its own action');assert.equal(await page.locator('#detail-dialog[open]').count(),0,'Picking never clicks through a real button into the apartment below');await page.locator('#native-mask-framer-action').evaluate(element=>element.remove());
   await page.mouse.move(point.x,point.y);await page.mouse.down();await page.mouse.move(point.x-85,point.y+4,{steps:8});await page.mouse.up();await waitFrame(page,15);await waitMask(page,1);assert.equal(await page.locator('#detail-dialog[open]').count(),0,'Dragging an apartment rotates the view and never opens its card');
   for(let checkpoint=1;checkpoint<8;checkpoint++){
    await waitMask(page,checkpoint);const view=realMaskViews[checkpoint];await hoverRealMask(page,view.probe);await page.waitForFunction(id=>document.querySelector('[data-apartment-field=number]')?.textContent.includes(id),view.probe.id);assert.ok(Number(await page.locator('[data-admiral-homepage]').getAttribute('data-orbit-mask-cached'))<=2,'Decoded mask-index memory stays bounded');
    if(checkpoint<7){await coveredClick(page,'Next view');await page.waitForFunction(()=>['buffering','moving','settling'].includes(document.querySelector('[data-admiral-orbit]').dataset.orbitState));assert.notEqual(await page.locator('[data-admiral-homepage]').getAttribute('data-orbit-mask-state'),'ready','Apartment picking is disabled while camera frames move');const movingPoint=await projectMaskPoint(page,view.probe);await page.mouse.click(movingPoint.x,movingPoint.y);assert.equal(await page.locator('#detail-dialog[open]').count(),0,'Clicking during travel cannot open an apartment');await waitFrame(page,realMaskViews[checkpoint+1].frame);}
   }
   await page.waitForFunction(()=>Number(document.querySelector('[data-admiral-homepage]').dataset.orbitMaskDownloaded)===8);assert.deepEqual([...new Set(f.maskRequests)].sort((a,b)=>a-b),[0,1,2,3,4,5,6,7],'The full compressed orbit mask set downloads once for all views');assert.ok(f.maskRequests.length<=16,'StrictMode and navigation do not cause unbounded mask downloads');await componentScreenshot(page,'real-mask-desktop-checkpoint-eight.png');
  }finally{await f.close();}
 });
 await pass('real mask desktop crop focal point and scaled component coordinates select the same apartments',async()=>{
  for(const variant of [{viewport:{width:1200,height:800},focalX:15,focalY:65},{viewport:{width:1200,height:800},focalX:85,focalY:35,externalOverlay:true},{viewport:{width:1440,height:600},focalX:50,focalY:65},{viewport:{width:1440,height:1000},focalX:50,focalY:50,stageScale:.75,stageWidth:1200,stageHeight:800}]){
   const f=await fixture({cleanFixture:true,useDefaultOrbitLayout:true,context:{viewport:variant.viewport},externalOverlay:variant.externalOverlay,stageScale:variant.stageScale,stageWidth:variant.stageWidth,stageHeight:variant.stageHeight,props:{...maskProps,focalX:variant.focalX,focalY:variant.focalY}}),{page}=f;
   try{await waitOrbit(page);await waitMask(page);for(const probe of [realMaskViews[0].probe,realMaskViews[0].second]){await hoverRealMask(page,probe);await page.waitForFunction(id=>document.querySelector('[data-apartment-field=number]')?.textContent.includes(id),probe.id);}const point=await projectMaskPoint(page,realMaskViews[0].second);await page.mouse.click(point.x,point.y);await waitApartmentCard(page,realMaskViews[0].second.id);await closeApartmentCard(page);assert.equal(Number((await orbitData(page)).orbitFrame),0);}finally{await f.close();}
  }
 });
 await pass('real mask mobile tap highlights first and Adatlap opens the shared current card including rotated fullscreen',async()=>{
  const f=await fixture({cleanFixture:true,useDefaultOrbitLayout:true,context:{viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:2},props:maskProps}),{page}=f;
  try{
   await waitStudio(page);await waitMask(page);const camera=await orbitData(page),point=await tapRealMask(page,realMaskViews[0].probe);await waitStudio(page,realMaskViews[0].probe.id);assert.equal(await page.locator('#detail-dialog[open]').count(),0,'A real facade tap selects without opening the card');assert.ok((await maskOverlayPixel(page,point))[3]>0,'A selected mobile apartment is visibly highlighted');await componentScreenshot(page,'real-mask-mobile-hover.png');await page.locator('.orbit-studio-primary[data-orbit-detail-link]:visible').tap();await waitApartmentCard(page,realMaskViews[0].probe.id);await closeApartmentCard(page);await waitStudio(page,realMaskViews[0].probe.id);await waitMask(page);assert.ok((await maskOverlayPixel(page,point))[3]>0,'Closing the card restores the selected apartment highlight');
   const maskCount=f.maskRequests.length;await page.locator('[data-orbit-fullscreen-open]:visible').tap();await page.locator('[data-orbit-fullscreen-surface][data-active="true"]').waitFor({state:'visible'});await waitMask(page);assert.equal(await page.locator('[data-orbit-fullscreen-surface]').getAttribute('data-orbit-fullscreen-rotated'),'true','The portrait phone presents a horizontal logical scene');const fullPoint=await tapRealMask(page,realMaskViews[0].second);await page.waitForFunction(id=>document.querySelector('[data-orbit-fullscreen-details]')?.textContent.includes(id),realMaskViews[0].second.id);assert.equal(await page.locator('#detail-dialog[open]').count(),0);assert.ok((await maskOverlayPixel(page,fullPoint))[3]>0,'Rotated fullscreen maps the selected apartment to the same source pixels');await page.waitForFunction(()=>{const image=document.querySelector('[data-orbit-fullscreen-field=floorplan] img');return image?.complete&&image.naturalWidth>0&&image.currentSrc.includes('/types/F/thumb.webp');});await componentScreenshot(page,'real-mask-mobile-fullscreen-hover.png');await page.locator('[data-orbit-fullscreen-details] [data-orbit-detail-link]:visible').tap();await waitApartmentCard(page,realMaskViews[0].second.id);await closeApartmentCard(page);await page.locator('[data-orbit-fullscreen-close]:visible').tap();await waitStudio(page,realMaskViews[0].second.id);assertSameCamera(camera,await orbitData(page),'Mobile tap, shared card and rotated fullscreen');assert.ok(f.maskRequests.length<=Math.max(maskCount,8),'Fullscreen reuses mask assets');await componentScreenshot(page,'real-mask-mobile-selected.png');
  }finally{await f.close();}
 });
 await pass('real mask filtering lights matching facades and rejects excluded coloured regions',async()=>{
  const f=await fixture({cleanFixture:true,useDefaultOrbitLayout:true,context:{viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:2},props:maskProps}),{page}=f;
  try{
   await waitStudio(page);await waitMask(page);const included=await projectMaskPoint(page,realMaskViews[0].probe),sold={id:'B105',x:606,y:380},excluded=await projectMaskPoint(page,sold);assert.equal((await maskOverlayPixel(page,included))[3],0,'No filters means the facade starts unlit');await page.locator('[data-orbit-filter-status="available"]:visible').tap();await page.waitForFunction(()=>JSON.parse(document.querySelector('[data-admiral-homepage]').dataset.orbitHighlightIds).length===61);await page.waitForTimeout(60);assert.ok((await maskOverlayPixel(page,included))[3]>0,'A visible matching apartment is lit by the filter');assert.equal((await maskOverlayPixel(page,excluded))[3],0,'The sold apartment remains unlit under the available filter');
   await tapRealMask(page,sold);await page.waitForTimeout(90);assert.equal(await page.locator(studioSelector).getAttribute('data-apartment-id'),'A001','Tapping a filtered-out mask ID cannot replace the current preview');assert.equal(await page.locator('#detail-dialog[open]').count(),0);await tapRealMask(page,realMaskViews[0].probe);await waitStudio(page,realMaskViews[0].probe.id);assert.equal(await page.locator('#detail-dialog[open]').count(),0);await componentScreenshot(page,'real-mask-mobile-available-filter.png');
   await page.locator('[data-orbit-filter-reset]:visible').tap();await page.touchscreen.tap((await projectMaskPoint(page,realMaskViews[0].background)).x,(await projectMaskPoint(page,realMaskViews[0].background)).y);await page.waitForTimeout(80);assert.equal((await maskOverlayPixel(page,included))[3],0,'Reset and tapping empty background clear the filter and selection glow');
  }finally{await f.close();}
 });
 await pass('real mask missing or corrupt checkpoint fails closed while other cameras remain usable',async()=>{
  for(const failure of [{failMask:0},{corruptMask:0}]){
   const f=await fixture({...failure,cleanFixture:true,useDefaultOrbitLayout:true,context:{viewport:{width:1440,height:900}},props:{...maskProps,showControls:true}}),{page}=f;
   try{await waitOrbit(page);await waitMask(page,0,'error');const probe=realMaskViews[0].probe,point=await projectMaskPoint(page,probe);await page.mouse.move(point.x,point.y);await page.mouse.click(point.x,point.y);await page.waitForTimeout(80);assert.equal(await page.locator('#detail-dialog[open]').count(),0,'An unavailable ID map never guesses an apartment');assert.equal((await maskOverlayPixel(page,point))[3],0);assert.match(await apartmentField(page,'number'),/A001/);f.restoreMasks();await page.locator('[data-orbit-mask-retry]:visible').click();await waitMask(page);assert.equal(Number((await orbitData(page)).orbitFrame),0,'Retrying a failed mask retains the exact current camera');await hoverRealMask(page,probe);await page.waitForFunction(id=>document.querySelector('[data-apartment-field=number]')?.textContent.includes(id),probe.id);await coveredClick(page,'Next view');await waitFrame(page,15);await waitMask(page,1);await hoverRealMask(page,realMaskViews[1].probe);await page.waitForFunction(id=>document.querySelector('[data-apartment-field=number]')?.textContent.includes(id),realMaskViews[1].probe.id);}finally{await f.close();}
  }
 });
 await pass('real mask rapid hovering keeps overview drawings deferred and never downloads originals',async()=>{
  const f=await fixture({cleanFixture:true,useDefaultOrbitLayout:true,context:{viewport:{width:1440,height:900}},props:maskProps}),{page}=f;
  try{await waitOrbit(page);await waitMask(page);await page.waitForTimeout(220);const before=f.apartmentMediaRequests.length,probes=[realMaskViews[0].probe,realMaskViews[0].second,{id:'B005',x:525,y:462},{id:'B205',x:594,y:310}];for(const probe of probes){const point=await projectMaskPoint(page,probe);await page.mouse.move(point.x,point.y);await page.waitForTimeout(22);}await page.waitForFunction(id=>document.querySelector('[data-apartment-field=number]')?.textContent.includes(id),probes.at(-1).id);await page.waitForTimeout(260);const requested=f.apartmentMediaRequests.slice(before).filter(url=>/floorplans\/types\//.test(url));assert.ok(new Set(requested).size<=2,'A rapid pass over several apartments loads only the final stable overview drawing');assert.ok(!requested.some(url=>/full\.webp|original\.png/.test(url)),'Overview hovering uses the existing small drawing assets');assert.equal(f.detailRequests.length,0,'Hovering never fetches the full detail projection');}finally{await f.close();}
 });
 await pass('apartment PDF export contains the selected card and keeps one full landscape layout on phones',async()=>{
  const f=await fixture({listMode:true,cleanFixture:true,props:{pageUrl:'https://admiralpark.hu/homepage-draft'}}),{page}=f;
  try{
   await page.locator('[data-detail="A001"]').first().click();let card=await waitApartmentCard(page);
   assert.ok(!f.apartmentMediaRequests.some(url=>/\.pdf(?:$|\?)/i.test(url)),'Opening a card never downloads a generic type PDF');
   assert.ok(!f.apartmentMediaRequests.some(url=>/\.ttf(?:$|\?)/i.test(url)),'PDF-only fonts stay unloaded until the visitor requests a download');
   assert.equal(f.pdfLibraryRequests.length,0,'PDF generation libraries stay unloaded until the visitor requests a download');
   const before=f.apartmentMediaRequests.length;
   const [firstDownload]=await Promise.all([page.waitForEvent('download'),card.locator('[data-download]').click()]);const first=await inspectApartmentPdf(firstDownload,'A001');
   assert.match(first.text,/68[,.]67/);assert.match(first.text,/248[,.]95|248\s?950\s?000/);assert.match(first.text,/Előtér/);assert.match(first.text,/Fürdőszoba/);assert.match(first.text,/illusztráció/i);
   assert.ok(!f.apartmentMediaRequests.slice(before).some(url=>/datasheets\/types\//.test(url)),'The export is generated from the actual card instead of fetching its generic type datasheet');
   assert.equal(await card.locator('[data-download]').getAttribute('aria-busy'),null,'A completed export restores the download control');
   await card.getByRole('tab',{name:'Szintrajz',exact:true}).click();await card.locator('.detail-floor-image').evaluate(image=>image.decode());const [floorDownload]=await Promise.all([page.waitForEvent('download'),card.locator('[data-download]').click()]);const floor=await inspectApartmentPdf(floorDownload,'A001','-floor');assert.match(floor.text,/Szintrajz/);assert.deepEqual(floor.view,first.view,'The active floor-layout document exports inside the same card design');
   await card.getByRole('button',{name:'Bezárás',exact:true}).click();await card.waitFor({state:'hidden'});
   await page.locator('[data-detail="A002"]').first().click();card=await waitApartmentCard(page,'A002');
   const [secondDownload]=await Promise.all([page.waitForEvent('download'),card.locator('[data-download]').click()]);const second=await inspectApartmentPdf(secondDownload,'A002');
   assert.match(second.text,/258[,.]44|258\s?440\s?000/);assert.ok(!second.text.includes('A001'),'A second apartment of the same floorplan type does not inherit the previous apartment number');
   assert.deepEqual(second.view,first.view,'Switching apartments preserves the card design and page geometry');
   await page.setViewportSize({width:390,height:844});await card.getByRole('tab',{name:'Helyiségek',exact:true}).click();await card.locator('.detail-room-panel').waitFor({state:'visible'});
   const [phoneDownload]=await Promise.all([page.waitForEvent('download'),card.locator('[data-download]').click()]);const phone=await inspectApartmentPdf(phoneDownload,'A002','-phone');
   assert.deepEqual(phone.view,first.view,'Downloading from a mobile room tab still exports the entire landscape card');assert.match(phone.text,/258[,.]44|258\s?440\s?000/);assert.match(phone.text,/Előtér/);
   await card.getByRole('button',{name:'Bezárás',exact:true}).click();await card.waitFor({state:'hidden'});await page.setViewportSize({width:1200,height:800});
   await page.locator('[data-detail="C303"]').first().click();card=await waitApartmentCard(page,'C303');const [largeDownload]=await Promise.all([page.waitForEvent('download'),card.locator('[data-download]').click()]);const large=await inspectApartmentPdf(largeDownload,'C303');
   assert.match(large.text,/133[,.]48/);assert.match(large.text,/675[,.]65|675[,.]654|675\s?654\s?000/);assert.match(large.text,/Háztartási|Házt\.h\./);assert.match(large.text,/Erkély/);
   await card.getByRole('button',{name:'Bezárás',exact:true}).click();await card.waitFor({state:'hidden'});await page.locator('[data-detail="A302"]').first().click();card=await waitApartmentCard(page,'A302');const [soldDownload]=await Promise.all([page.waitForEvent('download'),card.locator('[data-download]').click()]);const sold=await inspectApartmentPdf(soldDownload,'A302');assert.match(sold.text,/Eladva|Elkelt/);assert.match(sold.text,/Nincs megadva/);assert.doesNotMatch(sold.text,/\b0(?:[,.]0+)?\s*M Ft\b/,'An unknown sold-unit price must not become zero');
   assert.ok(!f.apartmentMediaRequests.some(url=>/datasheets\/types\//.test(url)),'No type PDF is used by any selected-apartment export');
  }finally{await f.close();}
 });
 await pass('apartment PDF export failure restores its control and retries without a generic datasheet fallback',async()=>{
  const f=await fixture({listMode:true,cleanFixture:true}),{page}=f;
  try{
   await page.locator('[data-detail="A001"]').first().click();const card=await waitApartmentCard(page),button=card.locator('[data-download]');let downloads=0;page.on('download',()=>downloads++);
   await page.evaluate(()=>{const original=HTMLCanvasElement.prototype.toBlob;window.pdfCanvasFailures=0;HTMLCanvasElement.prototype.toBlob=function(callback,...options){if(!window.pdfCanvasFailures++){setTimeout(()=>callback(null),180);return;}return original.call(this,callback,...options);};});
   await button.click();await button.evaluate(element=>element.click());
   await page.waitForFunction(()=>window.pdfCanvasFailures>0);await button.evaluate(element=>new Promise(resolve=>{const ready=()=>element.getAttribute('aria-busy')==='true'?requestAnimationFrame(ready):resolve();ready();}));
   assert.equal(downloads,0,'A failed canvas export cannot download an incomplete document');assert.equal(await button.getAttribute('aria-disabled'),null,'The control is available after failure');
   assert.equal(await card.locator('.download-fallback').count(),0,'A generation failure never redirects to the old apartment-type PDF');assert.match(await page.locator('[data-orbit-detail-card] #toast').innerText(),/nem sikerült|nem indult|próbál|hiba/i);
   const [download]=await Promise.all([page.waitForEvent('download'),button.click()]);await inspectApartmentPdf(download,'A001','-retry');assert.equal(downloads,1,'Retry produces exactly one complete apartment download');
   assert.equal(await button.getAttribute('aria-busy'),null);assert.ok(!f.apartmentMediaRequests.some(url=>/datasheets\/types\//.test(url)));
  }finally{await f.close();}
 });
 await pass('apartment PDF export cancellation prevents stale downloads after closing or unmounting the card',async()=>{
  for(const action of ['close','dispose']){
   const f=await fixture({listMode:true,cleanFixture:true}),{page}=f;
   try{
    await page.locator('[data-detail="A001"]').first().click();const card=await waitApartmentCard(page);let downloads=0;page.on('download',()=>downloads++);
    await page.evaluate(()=>{const nativeFetch=window.fetch.bind(window);window.fetch=(input,options)=>{if(!window.pdfFontGateUsed&&String(input).includes('montserrat-pdf-regular.ttf')){window.pdfFontGateUsed=true;window.pdfFontGatePending=true;return new Promise((resolve,reject)=>{const cancel=()=>{window.pdfFontGateAborted=true;reject(new DOMException('Test font request aborted','AbortError'));};if(options?.signal?.aborted)cancel();else options?.signal?.addEventListener('abort',cancel,{once:true});});}return nativeFetch(input,options);};});
    await card.locator('[data-download]').click();await page.waitForFunction(()=>window.pdfFontGatePending===true);
    if(action==='close'){await card.getByRole('button',{name:'Bezárás',exact:true}).click();await card.waitFor({state:'hidden'});}else await page.evaluate(()=>window.root.unmount());
    await page.waitForFunction(()=>window.pdfFontGateAborted===true);await page.waitForTimeout(100);assert.equal(downloads,0,`${action} aborts a pending export instead of downloading stale apartment data`);
    if(action==='close'){await page.locator('[data-detail="A002"]').first().click();const next=await waitApartmentCard(page,'A002');const [download]=await Promise.all([page.waitForEvent('download'),next.locator('[data-download]').click()]);await inspectApartmentPdf(download,'A002','-after-cancel');assert.equal(downloads,1,'Cancelling the first apartment does not block a deliberate export of the next apartment');}
   }finally{await f.close();}
  }
 });
 await pass('list compare and media dialogs preserve filters and cannot control an orbit behind them',async()=>{
  const f=await fixture({listMode:true,bothEntries:true,cleanFixture:true,context:{hasTouch:true}}),{page}=f;
  try{
   await waitOrbit(page);const before=await orbitData(page);await page.locator('#building').selectOption('A');await page.locator('[data-compare="A001"]').click();await page.locator('[data-compare="A003"]').click();await page.locator('[data-open-compare]').click();
   const compare=page.locator('[data-admiral-apartment-list] #compare-dialog');await compare.waitFor({state:'visible'});assert.match(await compare.locator('.compare-table').innerText(),/A001/);assert.match(await compare.locator('.compare-table').innerText(),/A003/);const compareBox=await compare.boundingBox();assert.ok(compareBox.width>700&&compareBox.height>300,'The existing comparison table retains a useful dialog layout');await componentScreenshot(page,'shared-list-compare-open.png');
   await compare.locator('[data-from-compare="A003"]').click();const card=await waitApartmentCard(page,'A003');await compare.waitFor({state:'hidden'});await card.getByRole('button',{name:'Bezárás',exact:true}).click();await card.waitFor({state:'hidden'});assert.equal(await page.locator('#building').inputValue(),'A','Opening a comparison apartment preserves its active list filter');
   await page.locator('[data-media="A001"][data-media-kind="floorplan"]').click();const media=page.locator('[data-admiral-apartment-list] #media-dialog');await media.waitFor({state:'visible'});await media.locator('.media-image').evaluate(image=>image.decode());const mediaBox=await media.boundingBox();assert.ok(Math.abs(mediaBox.width-1200)<2&&Math.abs(mediaBox.height-800)<2,'The separate media dialog keeps its fullscreen geometry');const mediaStage=await media.locator('.media-stage').boundingBox();assert.ok(mediaStage.width>1000&&mediaStage.height>500,'The list media image retains a usable reading area after CSS pruning');await media.getByRole('button',{name:'Nagyítás',exact:true}).click();assert.notEqual(await media.locator('[data-zoom=reset]').innerText(),'100%','The original list media zoom remains active');assert.match(await media.locator('.media-image').getAttribute('style'),/scale\(1\.5\)/,'The native zoom changes the actual image transform');await componentScreenshot(page,'shared-list-media-open.png');
   await media.locator('.media-stage').focus();await page.keyboard.press('ArrowRight');await page.mouse.move(400,350);await page.mouse.wheel(0,-120);const cdp=await page.context().newCDPSession(page);await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:800,y:400}]});await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:450,y:400}]});await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await page.waitForTimeout(350);assertSameCamera(before,await orbitData(page),'List compare and media actions');await page.keyboard.press('Escape');await media.waitFor({state:'hidden'});await waitOrbit(page);assertSameCamera(before,await orbitData(page),'Closing the separate list media dialog');assert.equal(await page.locator('#building').inputValue(),'A');await componentScreenshot(page,'shared-list-after-compare-media.png');
  }finally{await f.close();}
 });
 await pass('list initial apartment link opens the shared card and closing preserves its building filter',async()=>{
  const f=await fixture({listMode:true,cleanFixture:true,initialUrl:'http://homepage.test/?apartment=A001&building=A'}),{page}=f;
  try{const card=await waitApartmentCard(page);assert.equal(await page.locator('#building').inputValue(),'A');const requests=f.detailRequests.length;await card.getByRole('button',{name:'Bezárás',exact:true}).click();await card.waitFor({state:'hidden'});const url=new URL(page.url());assert.equal(url.searchParams.has('apartment'),false);assert.equal(url.searchParams.get('building'),'A');assert.equal(await page.locator('#building').inputValue(),'A');assert.equal(f.detailRequests.length,requests);}finally{await f.close();}
 });
 await pass('list entry and homepage resolve one shared card module and list opening reuses its loaded JSON dataset',async()=>{
  const f=await fixture({listMode:true,cleanFixture:true}),{page}=f;
  try{
   await page.locator('[data-admiral-apartment-list="shared"]').waitFor();assert.equal(await page.evaluate(()=>window.sharedCardLoads),1,'The homepage and list imports resolve one cached shared component module');assert.equal(await page.evaluate(()=>window.requireFramerModule('./AdmiralApartmentDetailCard.tsx')===window.sharedCardModule),true);
   await page.locator('#building').selectOption('A');await page.waitForTimeout(120);const initialRequests=f.detailRequests.length;assert.ok(initialRequests>=1,'The list loads its full apartment dataset');await componentScreenshot(page,'shared-list-before-open.png');
   await page.locator('[data-detail="A001"]').first().click();const card=await waitApartmentCard(page);assert.equal(f.detailRequests.length,initialRequests,'The shared detail card consumes the list dataset without fetching it again');assert.equal(await card.locator('.room-marker').count(),10);assert.equal(await card.locator('.detail-apartment-number').innerText(),'A001');await componentScreenshot(page,'shared-list-card-open.png');
   await card.locator('[data-save="A001"]').click();await card.getByRole('button',{name:'Bezárás',exact:true}).click();await card.waitFor({state:'hidden'});assert.equal(await page.locator('#building').inputValue(),'A','Closing the shared card preserves the active list filter');assert.equal(await page.locator('[data-admiral-apartment-list] [data-save="A001"]').getAttribute('aria-pressed'),'true','Favorites synchronize from the shared card back to its list entry');
   assert.equal(await page.evaluate(()=>window.sharedCardLoads),1);assert.equal(f.detailRequests.length,initialRequests);await componentScreenshot(page,'shared-list-entry.png');
  }finally{await f.close();}
 });
 await pass('shared detail card opens lazily for a parked canonical apartment and reuses the exact native list dialog',async()=>{
  const f=await fixture({cleanFixture:true,useDefaultOrbitLayout:true,context:{viewport:{width:1440,height:900}},props:{...studioProps,showControls:true,snapDuration:1.2},gateDetails:true}),{page}=f;
  try{
   await waitOrbit(page);await page.getByRole('button',{name:'Open apartment details',exact:true}).waitFor();assert.equal(f.detailRequests.length,0,'The room-level detail JSON is not fetched during orbit loading');
   await clickApartment(page,'NOT-A-REAL-APARTMENT');await page.waitForTimeout(100);assert.equal(f.detailRequests.length,0,'Unknown apartment IDs cannot open a card');
   await page.getByRole('button',{name:'Next view',exact:true}).click();await waitOrbit(page,'settling');await clickApartment(page,'A001');await page.waitForTimeout(100);assert.equal(f.detailRequests.length,0,'Apartment clicks while the camera moves are ignored');await waitFrame(page,15);
   await page.getByRole('button',{name:'Open apartment details',exact:true}).click();await page.locator(cardSelector+'[data-state=loading]').waitFor();await page.waitForFunction(()=>document.activeElement?.getAttribute('aria-label')==='Close apartment details');await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));await page.keyboard.press('Tab');await page.keyboard.press('Tab');assert.equal(await page.getByRole('button',{name:'Close apartment details',exact:true}).evaluate(element=>element===document.activeElement),true,'The pending card keeps keyboard focus inside its close control '+JSON.stringify(await page.evaluate(()=>({active:document.activeElement?.outerHTML?.slice(0,200),state:document.querySelector('[data-orbit-detail-card]')?.dataset.state}))));f.releaseDetails();const card=await waitApartmentCard(page);assert.equal(f.detailRequests.length,1,'The full detail projection downloads once, on the first valid click');
   assert.equal(await card.locator('.detail-apartment-number').innerText(),'A001');assert.match(await card.locator('.detail-metrics').innerText(),/68[,.]67/);assert.equal(await card.locator('.room-marker[data-plan-room]').count(),10);assert.equal(await card.locator('.room-legend-button[data-plan-room]').count(),10);assert.match(await card.locator('.detail-room-panel').innerText(),/Előtér/);
   assert.equal(await page.locator('[data-orbit-detail-card] #results .apartment-row').count(),0,'The shared engine renders no hidden apartment list or thumbnails');assert.equal(await page.locator('iframe').count(),0,'The same native dialog opens in this page');
   const bounds=await card.boundingBox();assert.ok(bounds.width>=1000&&bounds.height>=700,'The shared desktop card retains its large reading layout');assert.match(await card.locator('.detail-plan-image').getAttribute('src'),/floorplans\/types\/B\/original\.png/);
   const originals=[...new Set(f.apartmentMediaRequests.filter(url=>/original\.png/.test(url)))];assert.equal(originals.length,1,'Only the selected apartment type original is loaded');assert.ok(!f.apartmentMediaRequests.some(url=>/thumb\.webp/.test(url)&&!/types\/B\//.test(url)),'No hidden 69-apartment thumbnail preload is created');
   await componentScreenshot(page,'shared-apartment-card-desktop.png');await closeApartmentCard(page);assert.equal(Number((await orbitData(page)).orbitFrame),15);assert.equal(await page.getByRole('button',{name:'Open apartment details',exact:true}).evaluate(element=>element===document.activeElement),true,'Closing restores the original preview trigger focus');
   await page.locator('[data-apartment-open]').click();await waitApartmentCard(page);assert.equal(f.detailRequests.length,1,'The compact floorplan thumbnail reopens the cached same card');await closeApartmentCard(page);assert.equal(await page.locator('[data-apartment-open]').evaluate(element=>element===document.activeElement),true,'Closing returns focus to the actual thumbnail trigger');
  }finally{await f.close();}
 });
 await pass('shared detail card preserves native numbered plan tabs favorites PDF inquiry and sharing actions',async()=>{
  const f=await fixture({cleanFixture:true,useDefaultOrbitLayout:true,props:studioProps}),{page}=f;
  try{
   await waitOrbit(page);await clickApartment(page,'A001');const card=await waitApartmentCard(page),before=await orbitData(page);
   await card.locator('.room-marker[data-plan-room="1"]').click();assert.equal(await card.locator('.room-legend-button[data-plan-room="1"]').getAttribute('aria-pressed'),'true','Numbered plan and existing room legend remain synchronized');
   await card.getByRole('tab',{name:'Szintrajz',exact:true}).click();await card.locator('.detail-floor-image').waitFor({state:'visible'});await card.locator('.detail-floor-image').evaluate(image=>image.decode());assert.match(await card.locator('.detail-floor-image').getAttribute('src'),/floor-layouts\/00\/full\.webp/);await card.getByRole('tab',{name:'Alaprajz',exact:true}).click();
   await card.locator('[data-save="A001"]').click();assert.equal(await card.locator('[data-save="A001"]').getAttribute('aria-pressed'),'true');assert.ok(JSON.parse(await page.evaluate(()=>localStorage.getItem('admiral-park:favorites:v1'))).includes('A001'));
   await card.locator('[data-inquiry-placeholder]').click();await card.locator('.inquiry-pending').waitFor({state:'visible'});assert.match(await card.locator('.inquiry-pending').innerText(),/hamarosan/);
   await page.evaluate(()=>{Object.defineProperty(navigator,'share',{configurable:true,value:undefined});Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async value=>{window.sharedCardUrl=value;}}});});await card.locator('[data-share="A001"]').click();await card.locator('[data-share-copy="A001"]').click();assert.match(await page.evaluate(()=>window.sharedCardUrl),/apartment=A001/);await card.locator('[data-share-close]').click();
   const [download]=await Promise.all([page.waitForEvent('download'),card.locator('[data-download]').click()]);assert.equal(download.suggestedFilename(),'Admiral-Park-A001-adatlap.pdf');
   assertSameCamera(before,await orbitData(page),'Native card actions');await closeApartmentCard(page);assert.equal((await orbitData(page)).orbitState,'checkpoint');
  }finally{await f.close();}
 });
 await pass('shared detail card blocks orbit gestures across its shadow boundary and Escape returns to the same phone view',async()=>{
  const f=await fixture({cleanFixture:true,useDefaultOrbitLayout:true,context:{viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:2},props:studioProps}),{page}=f;
  try{
   await waitStudio(page);const before=await orbitData(page);await page.locator('.orbit-studio-primary[data-orbit-detail-link]:visible').click();const card=await waitApartmentCard(page);assert.equal((await orbitData(page)).orbitSuspended,'true');await card.getByRole('tab',{name:'Helyiségek',exact:true}).click();await card.locator('.detail-room-panel').waitFor({state:'visible'});assert.equal(await card.locator('.room-legend-button[data-plan-room]').count(),10);await card.getByRole('tab',{name:'Rajzok',exact:true}).click();await card.locator('.detail-plan-image').waitFor({state:'visible'});
   await page.mouse.move(200,300);await page.mouse.wheel(0,240);await page.keyboard.press('ArrowRight');await page.keyboard.press('PageDown');const cdp=await page.context().newCDPSession(page);
   await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:320,y:400}]});await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:100,y:400}]});await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await page.waitForTimeout(350);assertSameCamera(before,await orbitData(page),'Shadow card wheel, keyboard and touch input');
   await componentScreenshot(page,'shared-apartment-card-phone.png');await page.keyboard.press('Escape');await card.waitFor({state:'hidden'});await waitStudio(page);assert.equal((await orbitData(page)).orbitSuspended,'false');assertSameCamera(before,await orbitData(page),'Closing with Escape');
   const geometry=await studioGeometry(page),x=geometry.viewport.x+geometry.viewport.width*.8,y=geometry.viewport.y+geometry.viewport.height*.5;await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x,y}]});await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:x-160,y}]});await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await waitFrame(page,15);
  }finally{await f.close();}
 });
 await pass('shared detail card retries a failed lazy download and cancelling loading never reopens it later',async()=>{
  const f=await fixture({cleanFixture:true,useDefaultOrbitLayout:true,failDetails:true,props:studioProps}),{page}=f;
  try{
   await waitOrbit(page);await clickApartment(page,'A001');await page.locator(cardSelector+'[data-state=error]').waitFor();assert.equal((await orbitData(page)).orbitSuspended,'true');await page.waitForFunction(()=>document.activeElement?.getAttribute('aria-label')==='Close apartment details');await page.keyboard.press('Tab');assert.equal(await page.getByRole('button',{name:'Retry apartment details',exact:true}).evaluate(element=>element===document.activeElement),true);await page.keyboard.press('Tab');assert.equal(await page.getByRole('button',{name:'Close apartment details',exact:true}).evaluate(element=>element===document.activeElement),true);await page.keyboard.press('Shift+Tab');assert.equal(await page.getByRole('button',{name:'Retry apartment details',exact:true}).evaluate(element=>element===document.activeElement),true,'The error dialog traps both forward and reverse keyboard focus');f.restoreDetails();await page.getByRole('button',{name:'Retry apartment details',exact:true}).click();await waitApartmentCard(page);assert.equal(f.detailRequests.length,2);await closeApartmentCard(page);
   await clickApartment(page,'B105');const card=await waitApartmentCard(page,'B105');assert.equal(f.detailRequests.length,2,'Switching to another unit uses the same downloaded detail JSON');assert.match(await card.locator('.detail-status').innerText(),/Eladva|Elkelt/);await closeApartmentCard(page);
  }finally{await f.close();}
  const pending=await fixture({cleanFixture:true,useDefaultOrbitLayout:true,delayDetails:500,props:studioProps});
  try{await waitOrbit(pending.page);await clickApartment(pending.page,'A001');await pending.page.locator(cardSelector+'[data-state=loading]').waitFor();await pending.page.getByRole('button',{name:'Close apartment details',exact:true}).click();await pending.page.waitForTimeout(700);assert.equal(await pending.page.locator('#detail-dialog[open]').count(),0,'A cancelled pending request cannot reopen the dialog');await waitOrbit(pending.page);await clickApartment(pending.page,'A001');await waitApartmentCard(pending.page);assert.equal(pending.detailRequests.length,1,'A successful cancelled download can be reused on a later deliberate open');await closeApartmentCard(pending.page);}finally{await pending.close();}
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
 await pass('studio desktop uses a light responsive composition with a readable cropped plan and an unoccluded orbit',async()=>{
  for(const viewport of [{width:1440,height:900},{width:1200,height:800}]){
   const f=await fixture({cleanFixture:true,context:{viewport},props:studioProps}),{page}=f;
   try{
    await waitStudio(page);const geometry=await studioGeometry(page);assertStudioViewport(geometry);
    assert.match(geometry.background,/rgb\(253, 251, 251\)/,'The orbit studio has a light paper background');const builder=await page.locator('[data-orbit-studio]').getAttribute('data-layout')==='builder';assert.ok(Math.abs(geometry.studio.height-geometry.root.height*(builder?1:.9))<2,'Builder layouts use the full reference coordinate plane; compact layouts retain their ninety-percent workspace');
    assert.ok(geometry.plan.height>=(viewport.width>=1440?270:220),'The selected floorplan remains readable in the compact apartment column: '+JSON.stringify({viewport,plan:geometry.plan}));assert.ok(geometry.plan.width>=(viewport.width>=1440?200:195),'The selected floorplan retains useful width beside the enlarged orbit');
    assert.ok(geometry.planNaturalWidth>=200,'The existing compact overview drawing has useful source resolution');assert.match(geometry.planSource,/floorplans\/types\/B\/thumb\.webp/);
    assert.equal(await page.locator('[data-orbit-apartment-select] option').count(),69,'All real JSON apartments are available in the temporary preview selector');
    assert.equal(await page.locator('[data-room-list],[data-room-marker],[data-orbit-room-list]').count(),0,'No room-by-room detail list is added to the studio');
    await page.getByRole('button',{name:'Alaprajz nagyítása',exact:true}).click();await page.locator('[data-orbit-plan-dialog]').waitFor({state:'visible'});await page.locator('[data-orbit-plan-dialog] img').evaluate(image=>image.decode());assert.ok(await page.locator('[data-orbit-plan-dialog] img').evaluate(image=>image.naturalWidth>=1000),'Enlarging the overview still loads the full drawing for reading');assert.match(await page.locator('[data-orbit-plan-dialog] img').getAttribute('src'),/types\/B\/full\.webp/);
    assert.equal(Number((await orbitData(page)).orbitFrame),0,'The plan action remains clickable and cannot rotate the orbit');await page.keyboard.press('Escape');
    await componentScreenshot(page,'studio-desktop-'+viewport.width+'.png');
   }finally{await f.close();}
  }
 });
 await pass('compact mobile orbit fits the floorplan facts and details action without scrolling',async()=>{
  for(const viewport of [{width:320,height:568},{width:360,height:640},{width:375,height:667},{width:390,height:844},{width:430,height:932},{width:844,height:390}]){
   const f=await fixture({cleanFixture:true,useDefaultOrbitLayout:true,context:{viewport,isMobile:true,hasTouch:true,deviceScaleFactor:2},props:{...studioProps,phoneImageWidth:100,snapDuration:.6}}),{page}=f;
   try{
    await waitStudio(page);const geometry=await studioGeometry(page);assertStudioViewport(geometry);
    assert.equal(geometry.transform,'none','The ordinary mobile layout remains upright');
    const compact=await compactStudioGeometry(page);assertCompactStudioFit(compact,viewport,'Phone '+viewport.width+'×'+viewport.height);
    if(viewport.height>viewport.width){assertNaturalWidthMobileOrbit(geometry,'Phone '+viewport.width+'×'+viewport.height);assert.ok(compact.plan.y>=compact.viewport.bottom-2,'The readable floorplan sits below the portrait orbit');}
    await writeFile(new URL('mobile-redesign-layout-'+viewport.width+'x'+viewport.height+'.json',out),JSON.stringify(compact,null,2));await componentScreenshot(page,'mobile-redesign-preview-A001-'+viewport.width+'x'+viewport.height+'.png');
    assert.equal(await page.locator('.orbit-studio-primary[data-orbit-detail-link]:visible').isEnabled(),true,'Adatlap is available at a parked checkpoint');assert.equal(await page.locator('.orbit-studio-mobile-plan-button:visible').isEnabled(),true,'The floorplan opens its card at a parked checkpoint');
    const before=await orbitData(page);await page.locator('[data-orbit-studio-details]').evaluate(element=>{element.scrollTop=element.scrollHeight;});await page.waitForTimeout(100);
    assert.ok(Math.abs(await page.locator('[data-orbit-studio-details]').evaluate(element=>element.scrollTop))<=1,'Phone '+viewport.width+'×'+viewport.height+' details cannot scroll into a hidden continuation beyond pixel rounding');assertSameCamera(before,await orbitData(page),'Reading the complete mobile card');
    await clickApartment(page,'A101');await waitStudio(page,'A101');assert.equal(await page.locator('#detail-dialog[open]').count(),0,'A mobile apartment tap selects and highlights it without opening the full card');assert.equal(f.detailRequests.length,0,'Selecting an apartment does not download its full detail-card data');
    await clickApartment(page,'NOT_A_REAL_APARTMENT');await page.waitForTimeout(80);assert.equal(await page.locator(studioSelector).getAttribute('data-apartment-id'),'A101','An unknown future mask colour cannot replace the canonical apartment selection');
    await page.locator('.orbit-studio-primary[data-orbit-detail-link]:visible').tap();await waitApartmentCard(page,'A101');await closeApartmentCard(page);await waitStudio(page,'A101');assertSameCamera(before,await orbitData(page),'Closing Adatlap after mobile tap selection');
    const planAction=page.locator('.orbit-studio-mobile-plan-button:visible');await planAction.tap();await waitApartmentCard(page,'A101');await closeApartmentCard(page);await waitStudio(page,'A101');assertSameCamera(before,await orbitData(page),'Opening the same current apartment from its readable plan');assert.equal(await planAction.evaluate(element=>document.activeElement===element),true,'Closing the shared card returns focus to the tapped floorplan');
    const cdp=await page.context().newCDPSession(page),x=geometry.viewport.x+geometry.viewport.width*.8,y=geometry.viewport.y+geometry.viewport.height*.5;
    await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x,y}]});await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:x-180,y}]});await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
    await page.waitForFunction(()=>['buffering','moving','settling'].includes(document.querySelector('[data-admiral-orbit]')?.dataset.orbitState));
    assert.equal(await page.locator('.orbit-studio-primary[data-orbit-detail-link]:visible').isDisabled(),true,'Adatlap is disabled while the camera moves');assert.equal(await page.locator('.orbit-studio-mobile-plan-button:visible').isDisabled(),true,'The floorplan action is disabled while the camera moves');await waitFrame(page,15);
    assert.equal(await page.locator('.orbit-studio-primary[data-orbit-detail-link]:visible').isEnabled(),true,'Adatlap returns at the next checkpoint');assert.equal(await page.locator('.orbit-studio-mobile-plan-button:visible').isEnabled(),true,'The floorplan action returns at the next checkpoint');
    await componentScreenshot(page,'compact-mobile-orbit-'+viewport.width+'x'+viewport.height+'.png');
   }finally{await f.close();}
  }
 });
 await pass('orbit filters publish status OR and price AND matches and prevent excluded apartment selection',async()=>{
  const records=JSON.parse(await readFile(new URL('data/apartments.json',root),'utf8')).apartments,empty={statuses:[],priceMin:null,priceMax:null};
  const f=await fixture({cleanFixture:true,useDefaultOrbitLayout:true,context:{viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:2},props:{...studioProps,snapDuration:.7}}),{page}=f;
  try{
   await waitStudio(page);const camera=await orbitData(page);assertOrbitFilterState(await readOrbitFilters(page),empty,records,'Initial empty filters',{event:false});
   await page.locator('[data-admiral-homepage]').evaluate(root=>{window.orbitFilterEvents=[];root.addEventListener('admiral:orbit-filter-change',event=>window.orbitFilterEvents.push(structuredClone(event.detail)));});
   await page.locator('[data-orbit-filter-status="under_negotiation"]:visible').tap();const negotiation={...empty,statuses:['under_negotiation']};let state=await waitOrbitFilters(page,negotiation),ids=assertOrbitFilterState(state,negotiation,records,'Negotiation filter');assert.equal(ids.length,2);await waitStudio(page,ids[0]);
   await sendApartment(page,{id:'A001'});await clickApartment(page,'A001');await page.waitForTimeout(90);assert.equal(await page.locator(studioSelector).getAttribute('data-apartment-id'),ids[0],'Excluded hover and tap events cannot replace the first matching preview');assert.equal(await page.locator('#detail-dialog[open]').count(),0,'Excluded taps cannot open the detail card');
   await page.locator('[data-orbit-filter-status="available"]:visible').tap();const combined={...empty,statuses:['available','under_negotiation']};state=await waitOrbitFilters(page,combined);ids=assertOrbitFilterState(state,combined,records,'Two selected statuses combine with OR');assert.equal(ids.length,63);await waitStudio(page,'A001');
   await page.locator('[data-orbit-price-toggle]:visible').tap();await page.locator('[data-orbit-price-popover]:visible').waitFor();await setOrbitPrice(page,'max',200000000);await setOrbitPrice(page,'min',160000000);const priced={...combined,priceMin:160000000,priceMax:200000000};state=await waitOrbitFilters(page,priced);ids=assertOrbitFilterState(state,priced,records,'Price range intersects the selected statuses');assert.ok(ids.length>0&&ids.length<63);assert.ok(!ids.includes('A001'),'The expensive default preview is excluded by the active range');await waitStudio(page,ids[0]);assert.match(await page.locator('[data-orbit-filter-count]:visible').innerText(),new RegExp('^'+ids.length+'/69$'));
   await componentScreenshot(page,'orbit-filters-price-and-status-390.png');await page.locator('[data-orbit-filter-status="available"]:visible').tap();await page.locator('[data-orbit-filter-status="under_negotiation"]:visible').tap();await page.locator('[data-orbit-filter-status="sold"]:visible').tap();const noResults={statuses:['sold'],priceMin:160000000,priceMax:200000000};state=await waitOrbitFilters(page,noResults);assert.deepEqual(assertOrbitFilterState(state,noResults,records,'Unknown sold prices do not pass an active price range'),[]);await page.locator('[data-orbit-filter-empty]:visible').waitFor();assert.equal(await page.locator('.orbit-studio-primary[data-orbit-detail-link]:visible').count(),0,'No-match filters cannot expose a stale apartment card action');
   await sendApartment(page,{id:'A001'});await clickApartment(page,'A001');await clickApartment(page,'B105');await page.waitForTimeout(70);assert.equal(await page.locator('#detail-dialog[open]').count(),0);assert.equal(f.detailRequests.length,0,'Filtering and rejected picks never load the full detail-card JSON');await componentScreenshot(page,'orbit-filters-empty-results-390.png');
   const emptyMessage=(await page.locator('[data-orbit-filter-empty]:visible').innerText()).trim();await page.locator('[data-orbit-fullscreen-open]:visible').tap();await page.locator('[data-orbit-fullscreen-surface][data-active="true"]').waitFor({state:'visible'});assert.equal((await page.locator('[data-orbit-fullscreen-details] .orbit-fullscreen-empty').innerText()).trim(),emptyMessage,'Fullscreen explains the same active filters with no matches');assert.equal(await page.locator('[data-orbit-fullscreen-details] [data-orbit-detail-link]:visible').count(),0,'Fullscreen cannot open a stale apartment when the filtered result is empty');assertOrbitFilterState(await readOrbitFilters(page),noResults,records,'Entering fullscreen preserves empty filter results');await page.locator('[data-orbit-fullscreen-close]:visible').tap();await page.locator('[data-orbit-filter-empty]:visible').waitFor();assertSameCamera(camera,await orbitData(page),'Opening and closing fullscreen with no matching apartment');
   await page.locator('[data-orbit-filter-reset]:visible').tap();state=await waitOrbitFilters(page,empty);assertOrbitFilterState(state,empty,records,'Reset clears every criterion and all filter highlights');await waitStudio(page,'A001');assert.equal(await page.locator('[data-orbit-filter-reset]:visible').count(),0);assert.equal(await page.locator('[data-orbit-filter-status][aria-pressed="true"]:visible').count(),0);assertSameCamera(camera,await orbitData(page),'Status buttons, sliders, excluded picks and reset');
   for(const status of ['available','under_negotiation','sold'])await page.locator('[data-orbit-filter-status="'+status+'"]:visible').tap();const allStatuses={...empty,statuses:['available','under_negotiation','sold']};state=await waitOrbitFilters(page,allStatuses);assert.equal(assertOrbitFilterState(state,allStatuses,records,'Explicitly selecting all statuses highlights all homes including unpriced sold units').length,69);
   for(const status of ['under_negotiation','sold'])await page.locator('[data-orbit-filter-status="'+status+'"]:visible').tap();const available={...empty,statuses:['available']};state=await waitOrbitFilters(page,available);const matching=assertOrbitFilterState(state,available,records,'Available highlights before camera motion');const geometry=await studioGeometry(page);await phoneSwipe(page,{x:geometry.viewport.x+geometry.viewport.width*.75,y:geometry.viewport.y+geometry.viewport.height*.5,dx:-140,dy:0});await page.waitForFunction(()=>['buffering','moving','settling'].includes(document.querySelector('[data-admiral-orbit]')?.dataset.orbitState));await page.waitForFunction(()=>JSON.parse(document.querySelector('[data-admiral-homepage]').dataset.orbitHighlightIds).length===0);assert.deepEqual((await readOrbitFilters(page)).highlightIds,[],'All apartment highlights are cleared while the facade moves');await waitFrame(page,15);await page.waitForFunction(count=>JSON.parse(document.querySelector('[data-admiral-homepage]').dataset.orbitHighlightIds).length===count,matching.length);assertOrbitFilterState(await readOrbitFilters(page),available,records,'The next checkpoint restores matching apartment highlights');
  }finally{await f.close();}
 });
 await pass('mobile price popup opens over the logo without moving the image or controlling the orbit',async()=>{
  for(const viewport of [{width:320,height:568},{width:390,height:844}]){
   const f=await fixture({pageOverflow:true,cleanFixture:true,useDefaultOrbitLayout:true,context:{viewport,isMobile:true,hasTouch:true,deviceScaleFactor:2},props:studioProps}),{page}=f;
   try{
    await waitStudio(page);const before=await studioGeometry(page),camera=await orbitData(page),pinned=await pagePosition(page);await page.locator('[data-orbit-price-toggle]:visible').tap();const popup=page.locator('[data-orbit-price-popover]:visible');await popup.waitFor();
    const panel=await popup.boundingBox(),toggle=await page.locator('[data-orbit-price-toggle]:visible').boundingBox();assert.ok(panel.x>=0&&panel.x+panel.width<=viewport.width+1&&panel.y>=0,'The price popover is wholly visible on the phone');assert.ok(panel.y+panel.height<=toggle.y-1,'The price control opens upward');assert.ok(panel.y<before.viewport.y&&panel.y+panel.height>before.studio.y,'The popup uses the logo area above the image');
    assert.equal(await popup.evaluate(element=>{const box=element.getBoundingClientRect();return document.elementFromPoint(box.x+box.width/2,box.y+8)?.closest('[data-orbit-price-popover]')===element;}),true,'The upward popup is not clipped or hidden behind the logo');
    const opened=await studioGeometry(page);for(const name of ['x','y','width','height'])assert.ok(Math.abs(opened.image[name]-before.image[name])<1,'Opening the price popup preserves image '+name);assertNaturalWidthMobileOrbit(opened,'Phone price popup '+viewport.width);await componentScreenshot(page,'orbit-filters-price-popup-'+viewport.width+'x'+viewport.height+'.png');
    const slider=await page.locator('[data-orbit-price-min]:visible').boundingBox();await phoneSwipe(page,{x:slider.x+12,y:slider.y+slider.height/2,dx:40,dy:0});await assertPageHeld(page,pinned,'Dragging the native price slider');assertSameCamera(camera,await orbitData(page),'Dragging the price control');
    await page.keyboard.press('Escape');await popup.waitFor({state:'hidden'});assert.equal(await page.locator('[data-orbit-price-toggle]').evaluate(element=>document.activeElement===element),true,'Escape closes only the popup and restores its trigger focus');assert.equal((await orbitData(page)).orbitState,'checkpoint','Closing the price popup cannot pause or move the orbit');assertSameCamera(camera,await orbitData(page),'Closing the price control');
   }finally{await f.close();}
  }
 });
 await pass('mobile studio SEQ_02 arrival uses the same complete full-width image as the orbit',async()=>{
  for(const viewport of [{width:320,height:568},{width:390,height:844}]){
   const f=await fixture({cleanFixture:true,useDefaultOrbitLayout:true,gateDecodeIndices:[0],context:{viewport,isMobile:true,hasTouch:true,deviceScaleFactor:2},props:{...studioProps,startView:'opening',showControls:true,connectionDuration:1.2,duration:.6,maxSpeed:1}}),{page}=f;
   try{
    await installFramingCapture(page);assertFullFraming(await readFraming(page),'Mobile SEQ_01 opening');
    await coveredClick(page,'Skip approach');await waitStage(page,'building');assertFullFraming(await readFraming(page),'Mobile SEQ_01 arrival');
    await page.evaluate(()=>window.framingSamples=[]);await coveredClick(page,'Explore building');await waitStage(page,'handoff');
    const connection=await readFraming(page);assert.equal(connection.sequence,'SEQ_02','The handoff holds the completed connector');assert.equal(connection.frame,connections.length,'The connector reaches its matching last frame after the shared SEQ_01 endpoint before orbit activation');
    assert.ok(Math.abs(connection.x)<1&&Math.abs(connection.width-viewport.width)<1,'The final SEQ_02 frame fills exactly the phone width');
    assert.ok(Math.abs(connection.height-viewport.width*1010/1920)<1,'The final SEQ_02 frame shows the complete source at its natural image height');
    assert.ok(connection.pixels.some((value,index)=>index%4!==3&&value>45),'The pending orbit keeps actual completed connector pixels');
    const transition=await page.evaluate(()=>window.framingSamples.filter(sample=>sample.stage==='connection'&&sample.sequence==='SEQ_02'&&sample.paintedSequence==='SEQ_02'&&sample.canvasWidth>1));assertMonotonicFraming(transition,true);
    await page.evaluate(()=>window.releaseDecodeGates());await waitStudio(page);const geometry=await studioGeometry(page);assertStudioViewport(geometry);assertNaturalWidthMobileOrbit(geometry,'Mobile connector arrival '+viewport.width+'×'+viewport.height);
    for(const name of ['x','y','width','height'])assert.ok(Math.abs(geometry.image[name]-connection[name])<1,'SEQ_02 and orbit use an identical '+name+' at handoff: '+JSON.stringify({connection,orbit:geometry.image}));
    const compact=await compactStudioGeometry(page);assertCompactStudioFit(compact,viewport,'Mobile connector arrival '+viewport.width+'×'+viewport.height);await componentScreenshot(page,'mobile-fullwidth-connector-arrival-'+viewport.width+'x'+viewport.height+'.png');
   }finally{await f.close();}
  }
 });
 await pass('mobile horizontal fullscreen uses native fullscreen and keeps one player through details rotation and close',async()=>{
  for(const viewport of [{width:320,height:568},{width:390,height:844},{width:844,height:390}]){
   const f=await fixture({pageOverflow:true,cleanFixture:true,useDefaultOrbitLayout:true,context:{viewport,isMobile:true,hasTouch:true,deviceScaleFactor:2},props:studioProps}),{page}=f;
   try{
    await waitStudio(page);await page.waitForFunction(()=>{const orbit=document.querySelector('[data-admiral-orbit]');return Number(orbit?.dataset.orbitBufferTotal)>0&&orbit.dataset.orbitBuffered===orbit.dataset.orbitBufferTotal&&orbit.dataset.orbitDecoding==='0'&&Number(orbit.dataset.orbitDownloaded)===120;});const phoneCache=await orbitData(page);assert.equal(Number(phoneCache.orbitMotionWidth),640,'A physical phone keeps the smaller motion decode size in either orientation');assert.equal(Number(phoneCache.orbitCacheLimit),31,'A physical phone uses its bounded phone cache in either orientation');await clickApartment(page,'A101');await waitStudio(page,'A101');
    await page.evaluate(()=>{window.orbitCanvasBeforeFullscreen=document.querySelector('canvas[data-orbit-canvas]')||[...document.querySelectorAll('[data-admiral-orbit] canvas')].find(item=>!item.closest('[data-admiral-sequence]'));window.nativeFullscreenRequests=[];const request=HTMLElement.prototype.requestFullscreen;if(typeof request!=='function')throw new Error('Native Fullscreen API is required for this focused Chromium check');HTMLElement.prototype.requestFullscreen=function(options){window.nativeFullscreenRequests.push({root:this.matches('[data-admiral-homepage]'),options,activation:navigator.userActivation?.isActive});return request.call(this,options);};});
    const parked=await orbitData(page),downloadCount=f.orbitRequests.length,pinned=await pagePosition(page);
    await page.locator('[data-orbit-fullscreen-open]:visible').tap();
    await page.waitForFunction(()=>document.querySelector('[data-admiral-homepage]')?.dataset.orbitFullscreen==='true'&&document.fullscreenElement===document.querySelector('[data-admiral-homepage]'));
    const surface=page.locator('[data-orbit-fullscreen-surface][data-active="true"]'),plane=page.locator('[data-orbit-fullscreen-plane]'),hud=page.locator('[data-orbit-fullscreen-details]');
    await surface.waitFor({state:'visible'});await hud.waitFor({state:'visible'});assertSameCamera(parked,await orbitData(page),'Entering horizontal phone fullscreen');
    const geometry=await plane.evaluate(element=>{const surface=element.closest('[data-orbit-fullscreen-surface]'),rect=surface.getBoundingClientRect();return {width:element.clientWidth,height:element.clientHeight,x:rect.x,y:rect.y,right:rect.right,bottom:rect.bottom,rotated:element.closest('[data-orbit-fullscreen-surface]').dataset.orbitFullscreenRotated,popover:surface.matches(':popover-open'),native:!!document.fullscreenElement};});
    assert.ok(geometry.width>=geometry.height,'The fullscreen scene uses a horizontal logical viewport');assert.ok(Math.abs(geometry.width-Math.max(viewport.width,viewport.height))<2&&Math.abs(geometry.height-Math.min(viewport.width,viewport.height))<2,'The landscape plane uses the whole available phone screen');
    assert.ok(geometry.x>=-1&&geometry.y>=-1&&Math.abs(geometry.right-viewport.width)<2&&Math.abs(geometry.bottom-viewport.height)<2,'The fullscreen surface fills the physical viewport');assert.equal(geometry.native,true,'A supported user tap enters real browser fullscreen');
    assert.equal(geometry.popover,false,'The native fullscreen root contains the horizontal surface without a competing popover');assert.equal(await surface.getAttribute('data-orbit-fullscreen-native'),'active');assert.deepEqual(await page.evaluate(()=>window.nativeFullscreenRequests),[{root:true,options:{navigationUI:'hide'},activation:true}],'Native fullscreen is requested once directly during the trusted tap');assert.equal(await page.locator('[data-admiral-orbit]').count(),1,'Fullscreen retains a single orbit controller');assert.equal(await page.evaluate(()=>{const canvas=document.querySelector('canvas[data-orbit-canvas]')||[...document.querySelectorAll('[data-admiral-orbit] canvas')].find(item=>!item.closest('[data-admiral-sequence]'));return !!canvas&&window.orbitCanvasBeforeFullscreen===canvas;}),true,'Fullscreen moves the existing canvas rather than replacing its player');assert.equal(f.orbitRequests.length,downloadCount,'Fullscreen does not download the orbit sequence again');assert.match(await hud.innerText(),/A101/);
    for(const selector of ['[data-orbit-fullscreen-close]','[data-orbit-fullscreen-details] [data-orbit-detail-link]']){const box=await page.locator(selector+':visible').boundingBox();assert.ok(box&&box.x>=-1&&box.y>=-1&&box.x+box.width<=viewport.width+1&&box.y+box.height<=viewport.height+1,'Fullscreen '+selector+' stays inside the physical screen');}
    const readable=await hud.evaluate(element=>{const box=target=>{const rect=target.getBoundingClientRect();return {x:rect.x,y:rect.y,right:rect.right,bottom:rect.bottom};},names=['area','terrace','garden','price'];return names.map(name=>{const field=element.querySelector('[data-orbit-fullscreen-field="'+name+'"]'),value=field.querySelector('dd')||field,range=document.createRange();range.selectNodeContents(value);return {name,field:box(value),text:box(range)};});});for(const item of readable){assert.ok(item.text.x>=item.field.x-1&&item.text.right<=item.field.right+1&&item.text.y>=item.field.y-1&&item.text.bottom<=item.field.bottom+1,'Fullscreen '+item.name+' text fits its column without overlapping adjacent data: '+JSON.stringify(item));}
    await componentScreenshot(page,'compact-mobile-fullscreen-'+viewport.width+'x'+viewport.height+'.png');await clickApartment(page,'A001');await page.waitForFunction(()=>document.querySelector('[data-orbit-fullscreen-details]')?.textContent.includes('A001'));assert.equal(await page.locator('#detail-dialog[open]').count(),0,'Tapping an apartment in fullscreen only changes the selection');
    await page.locator('[data-orbit-fullscreen-details] [data-orbit-detail-link]:visible').tap();const detailCard=await waitApartmentCard(page,'A001');assert.equal((await orbitData(page)).orbitSuspended,'true','The shared card suspends the same fullscreen orbit');assert.equal(await detailCard.evaluate(element=>{let current=element;while(current){if(document.fullscreenElement?.contains(current))return true;current=current.getRootNode()?.host;}return false;}),true,'The shared detail card shadow host is inside the native fullscreen root');await closeApartmentCard(page);assert.equal(await page.evaluate(()=>document.fullscreenElement===document.querySelector('[data-admiral-homepage]')),true,'Opening and closing apartment details retains native fullscreen');assert.equal(await page.locator('[data-admiral-homepage]').getAttribute('data-orbit-fullscreen'),'true','Closing details returns to the horizontal orbit');assertSameCamera(parked,await orbitData(page),'Returning from shared details to fullscreen');
    const logical={x:geometry.width*.65,y:geometry.height*.4},physical=viewport.height>viewport.width?{x:geometry.height-logical.y,y:logical.x}:{x:logical.x,y:logical.y};
    await phoneSwipe(page,{...physical,...(viewport.height>viewport.width?{dy:-150}:{dx:-150,dy:0})});await waitFrame(page,15);await assertPageHeld(page,pinned,'Horizontal orbit drag in fullscreen');
    const moved=await orbitData(page),turned={width:viewport.height,height:viewport.width};await page.setViewportSize(turned);await page.waitForTimeout(350);assertSameCamera(moved,await orbitData(page),'Turning the phone inside horizontal fullscreen');assert.equal(await page.locator('[data-admiral-homepage]').getAttribute('data-orbit-fullscreen'),'true','A physical rotation does not accidentally leave the extended view');assert.match(await hud.innerText(),/A001/,'The selected apartment remains visible through physical rotation');const turnedBox=await surface.boundingBox();assert.ok(Math.abs(turnedBox.width-turned.width)<2&&Math.abs(turnedBox.height-turned.height)<2,'The fullscreen surface adapts to the turned phone screen');await page.setViewportSize(viewport);await page.waitForTimeout(350);
    await page.locator('[data-orbit-fullscreen-close]:visible').tap();await waitStudio(page,'A001');await page.waitForFunction(()=>!document.fullscreenElement);assertSameCamera(moved,await orbitData(page),'Closing horizontal fullscreen');assert.equal(await page.locator('[data-admiral-homepage]').getAttribute('data-orbit-fullscreen'),'false');assert.equal(await page.locator('[data-orbit-fullscreen-open]').evaluate(element=>document.activeElement===element),true,'Close returns focus to the fullscreen opener');assert.equal(f.orbitRequests.length,downloadCount,'Returning to the compact card reuses the downloaded sequence');
    await page.locator('[data-orbit-fullscreen-open]:visible').tap();await page.waitForFunction(()=>document.fullscreenElement===document.querySelector('[data-admiral-homepage]'));await page.evaluate(()=>document.exitFullscreen());await waitStudio(page,'A001');assert.equal(await page.locator('[data-admiral-homepage]').getAttribute('data-orbit-fullscreen'),'false','The browser or OS leaving fullscreen restores the compact view');assertSameCamera(moved,await orbitData(page),'Native browser exit keeps the current camera');assert.equal(await page.evaluate(()=>window.nativeFullscreenRequests.length),2,'Only the two explicit user opens request fullscreen');
    const restored=await studioGeometry(page);assertStudioViewport(restored);if(viewport.height>viewport.width)assertNaturalWidthMobileOrbit(restored,'Restored portrait after fullscreen '+viewport.width+'×'+viewport.height);assertCompactStudioFit(await compactStudioGeometry(page),viewport,'Restored phone after fullscreen '+viewport.width+'×'+viewport.height);
    await componentScreenshot(page,'compact-mobile-fullscreen-restored-'+viewport.width+'x'+viewport.height+'.png');
   }finally{await f.close();}
  }
 });
 await pass('mobile English fullscreen keeps the expanded logo and translated apartment action readable',async()=>{
  const viewport={width:320,height:568},f=await fixture({cleanFixture:true,useDefaultOrbitLayout:true,context:{viewport,isMobile:true,hasTouch:true,deviceScaleFactor:2},props:{...studioProps,detailsLanguage:'en'}}),{page}=f;
  try{
   await waitStudio(page);await clickApartment(page,'A101');await waitStudio(page,'A101');const parked=await orbitData(page);await page.locator('[data-orbit-fullscreen-open]:visible').tap();
   const surface=page.locator('[data-orbit-fullscreen-surface][data-active="true"]'),hud=page.locator('[data-orbit-fullscreen-details]');await surface.waitFor({state:'visible'});await page.waitForFunction(()=>document.fullscreenElement===document.querySelector('[data-admiral-homepage]'));assert.match(await hud.innerText(),/In negotiation/);
   const cta=hud.getByRole('button',{name:'Apartment details',exact:true});assert.equal(await cta.isEnabled(),true,'The translated fullscreen action remains available at a checkpoint');
   for(const selector of ['[data-orbit-fullscreen-close]','.orbit-fullscreen-brand','[data-orbit-fullscreen-details] [data-orbit-detail-link]']){const box=await page.locator(selector+':visible').boundingBox();assert.ok(box&&box.x>=-1&&box.y>=-1&&box.x+box.width<=viewport.width+1&&box.y+box.height<=viewport.height+1,'English fullscreen '+selector+' stays within the available screen: '+JSON.stringify(box));}
   const labels=await hud.evaluate(element=>['number','status','area','terrace','garden','price'].map(name=>{const target=element.querySelector('[data-orbit-fullscreen-field="'+name+'"]'),rect=target.getBoundingClientRect(),range=document.createRange();range.selectNodeContents(target);const text=range.getBoundingClientRect();return {name,box:{x:rect.x,y:rect.y,right:rect.right,bottom:rect.bottom},text:{x:text.x,y:text.y,right:text.right,bottom:text.bottom}};}));
   for(const item of labels)assert.ok(item.text.x>=-1&&item.text.y>=-1&&item.text.right<=viewport.width+1&&item.text.bottom<=viewport.height+1,'English fullscreen '+item.name+' text is visible: '+JSON.stringify(item));
   await componentScreenshot(page,'mobile-redesign-fullscreen-en-320x568.png');await page.locator('[data-orbit-fullscreen-close]:visible').tap();await waitStudio(page,'A101');assertSameCamera(parked,await orbitData(page),'Closing the translated fullscreen view');assertNaturalWidthMobileOrbit(await studioGeometry(page),'Restored English mobile orbit');
  }finally{await f.close();}
 });
 await pass('mobile horizontal fullscreen falls back safely when native fullscreen is unsupported or rejected',async()=>{
  for(const mode of ['unsupported','rejected']){
   const f=await fixture({pageOverflow:true,cleanFixture:true,useDefaultOrbitLayout:true,context:{viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:2},props:studioProps}),{page}=f;
   try{
    await waitStudio(page);await clickApartment(page,'A101');await waitStudio(page,'A101');const parked=await orbitData(page),pinned=await pagePosition(page);
    await page.evaluate(mode=>{window.nativeFullscreenRequests=[];Object.defineProperty(HTMLElement.prototype,'webkitRequestFullscreen',{configurable:true,value:undefined});Object.defineProperty(HTMLElement.prototype,'requestFullscreen',{configurable:true,value:mode==='unsupported'?undefined:function(options){window.nativeFullscreenRequests.push({root:this.matches('[data-admiral-homepage]'),options,activation:navigator.userActivation?.isActive});return Promise.reject(new DOMException('Fullscreen blocked by the embedding browser','NotAllowedError'));}});},mode);
    await page.locator('[data-orbit-fullscreen-open]:visible').tap();const surface=page.locator('[data-orbit-fullscreen-surface][data-active="true"]');await surface.waitFor({state:'visible'});await page.waitForFunction(()=>document.querySelector('[data-orbit-fullscreen-surface]')?.dataset.orbitFullscreenNative==='fallback');
    assert.equal(await page.evaluate(()=>!!document.fullscreenElement),false,'Unsupported or denied native fullscreen does not leave a fake browser fullscreen owner');assert.equal(await surface.evaluate(element=>element.matches(':popover-open')),true,'The '+mode+' path retains the existing horizontal browser-top-layer fallback');assertSameCamera(parked,await orbitData(page),mode+' native fullscreen fallback');assert.match(await page.locator('[data-orbit-fullscreen-details]').innerText(),/A101/,'Fallback keeps the selected apartment');assert.deepEqual(await page.evaluate(()=>window.nativeFullscreenRequests),mode==='unsupported'?[]:[{root:true,options:{navigationUI:'hide'},activation:true}],'A rejected request is attempted once during the user gesture');
    const box=await surface.boundingBox();assert.ok(Math.abs(box.width-390)<2&&Math.abs(box.height-844)<2,'Fallback covers the available viewport');await page.locator('[data-orbit-fullscreen-step="next"]').tap();await waitFrame(page,15);await assertPageHeld(page,pinned,'Native '+mode+' fullscreen fallback navigation');
    const moved=await orbitData(page);await page.keyboard.press('Escape');await waitStudio(page,'A101');assert.equal(await page.locator('[data-admiral-homepage]').getAttribute('data-orbit-fullscreen'),'false','Escape closes the '+mode+' fullscreen fallback');assertSameCamera(moved,await orbitData(page),'Closing the '+mode+' fallback');assert.equal(await page.locator('[data-orbit-fullscreen-surface]').evaluate(element=>element.matches(':popover-open')),false,'Closing removes the fallback from the browser top layer');
   }finally{await f.close();}
  }
 });
 await pass('mobile horizontal fullscreen fixed fallback works without Popover API and cleans up on unmount',async()=>{
  const f=await fixture({pageOverflow:true,cleanFixture:true,useDefaultOrbitLayout:true,context:{viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:2},props:studioProps}),{page}=f;
  try{
   await waitStudio(page);const pinned=await pagePosition(page);await page.evaluate(()=>{Object.defineProperty(HTMLElement.prototype,'requestFullscreen',{configurable:true,value:undefined});Object.defineProperty(HTMLElement.prototype,'webkitRequestFullscreen',{configurable:true,value:undefined});Object.defineProperty(HTMLElement.prototype,'showPopover',{configurable:true,value:undefined});Object.defineProperty(HTMLElement.prototype,'hidePopover',{configurable:true,value:undefined});});
   await page.locator('[data-orbit-fullscreen-open]:visible').tap();await page.waitForFunction(()=>document.querySelector('[data-admiral-homepage]')?.dataset.orbitFullscreen==='true');const surface=page.locator('[data-orbit-fullscreen-surface][data-active="true"]');await surface.waitFor({state:'visible'});assert.equal(await surface.getAttribute('popover'),null,'Unsupported Popover API falls back to a visible fixed surface');const box=await surface.boundingBox();assert.ok(Math.abs(box.width-390)<2&&Math.abs(box.height-844)<2,'The fallback still covers the available phone viewport');
   await page.locator('[data-orbit-fullscreen-step="next"]').tap();await waitFrame(page,15);await assertPageHeld(page,pinned,'Fallback fullscreen controls');
   await page.evaluate(()=>{clearInterval(window.sampleTimer);window.root.unmount();});assert.equal(await page.locator('[data-orbit-fullscreen-surface]').count(),0,'Unmount removes every fullscreen surface');assert.equal(await page.evaluate(()=>getComputedStyle(document.body).position==='fixed'),false,'Unmount releases the page pin from fullscreen');
   await phoneSwipe(page,{x:195,y:600,dy:-180});await page.waitForTimeout(180);assert.ok(await page.evaluate(()=>scrollY)>0,'Normal page touch scrolling returns after fullscreen unmount');
  }finally{await f.close();}
 });
 await pass('mobile horizontal fullscreen cancels late native entry after close or unmount',async()=>{
  for(const action of ['close','unmount']){
   const f=await fixture({pageOverflow:true,cleanFixture:true,useDefaultOrbitLayout:true,context:{viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:2},props:studioProps}),{page}=f;
   try{
    await waitStudio(page);const parked=await orbitData(page);await page.evaluate(()=>{let owner=null;window.delayedFullscreenRequests=0;window.delayedFullscreenExits=0;Object.defineProperty(document,'fullscreenElement',{configurable:true,get:()=>owner});Object.defineProperty(document,'exitFullscreen',{configurable:true,value:async()=>{window.delayedFullscreenExits++;owner=null;document.dispatchEvent(new Event('fullscreenchange'));}});Object.defineProperty(HTMLElement.prototype,'requestFullscreen',{configurable:true,value:function(){window.delayedFullscreenRequests++;return new Promise(resolve=>{window.completeDelayedFullscreen=()=>{owner=this;document.dispatchEvent(new Event('fullscreenchange'));resolve();};});}});});
    await page.locator('[data-orbit-fullscreen-open]:visible').tap();await page.waitForFunction(()=>document.querySelector('[data-orbit-fullscreen-surface]')?.dataset.orbitFullscreenNative==='pending');assert.equal(await page.evaluate(()=>window.delayedFullscreenRequests),1,'Only one pending browser request is created');assert.equal(await page.locator('[data-orbit-fullscreen-surface]').evaluate(element=>element.matches(':popover-open')),false,'Pending native entry does not compete with a popover');
    if(action==='close'){await page.locator('[data-orbit-fullscreen-close]:visible').tap();await waitStudio(page);assertSameCamera(parked,await orbitData(page),'Closing before the browser completes native entry');}else await page.evaluate(()=>{clearInterval(window.sampleTimer);window.root.unmount();});
    await page.evaluate(()=>window.completeDelayedFullscreen());await page.waitForFunction(()=>window.delayedFullscreenExits===1&&!document.fullscreenElement);assert.equal(await page.locator('[data-orbit-fullscreen-surface][data-active="true"]').count(),0,'Late native entry cannot reopen a '+action+'d horizontal viewer');assert.equal(await page.evaluate(()=>window.delayedFullscreenRequests),1,'Late completion never starts a second browser request');
    if(action==='close'){assert.equal(await page.locator('[data-admiral-homepage]').getAttribute('data-orbit-fullscreen'),'false');assertSameCamera(parked,await orbitData(page),'Late native completion after close');}else assert.equal(await page.locator('[data-admiral-homepage]').count(),0,'Unmounted components remain removed after a late browser promise');
   }finally{await f.close();}
  }
 });
 await pass('mobile horizontal fullscreen keeps a reopened viewer when an older native request succeeds',async()=>{
  const f=await fixture({cleanFixture:true,useDefaultOrbitLayout:true,context:{viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:2},props:studioProps}),{page}=f;
  try{
   await waitStudio(page);const parked=await orbitData(page);await page.evaluate(()=>{let owner=null;window.overlappingFullscreenRequests=[];window.overlappingFullscreenExits=0;Object.defineProperty(document,'fullscreenElement',{configurable:true,get:()=>owner});Object.defineProperty(document,'exitFullscreen',{configurable:true,value:async()=>{window.overlappingFullscreenExits++;owner=null;document.dispatchEvent(new Event('fullscreenchange'));}});Object.defineProperty(HTMLElement.prototype,'requestFullscreen',{configurable:true,value:function(){return new Promise((resolve,reject)=>{window.overlappingFullscreenRequests.push({complete:()=>{owner=this;document.dispatchEvent(new Event('fullscreenchange'));resolve();},reject:()=>reject(new DOMException('A newer browser request was denied','NotAllowedError'))});});}});});
   await page.locator('[data-orbit-fullscreen-open]:visible').tap();await page.waitForFunction(()=>document.querySelector('[data-orbit-fullscreen-surface]')?.dataset.orbitFullscreenNative==='pending');await page.locator('[data-orbit-fullscreen-close]:visible').tap();await waitStudio(page);await page.locator('[data-orbit-fullscreen-open]:visible').tap();await page.waitForFunction(()=>window.overlappingFullscreenRequests.length===2);
   await page.evaluate(()=>window.overlappingFullscreenRequests[0].complete());await page.waitForFunction(()=>document.querySelector('[data-orbit-fullscreen-surface]')?.dataset.orbitFullscreenNative==='active');await page.evaluate(()=>window.overlappingFullscreenRequests[1].reject());await page.waitForTimeout(100);assert.equal(await page.evaluate(()=>document.fullscreenElement===document.querySelector('[data-admiral-homepage]')),true,'The reopened viewer adopts the successful older request to the same root');assert.equal(await page.locator('[data-orbit-fullscreen-surface]').getAttribute('data-orbit-fullscreen-native'),'active','A later request denial cannot replace an already owned native screen with the fallback');assert.equal(await page.locator('[data-orbit-fullscreen-surface]').evaluate(element=>element.matches(':popover-open')),false,'The adopted native owner remains the only fullscreen presentation');assert.equal(await page.evaluate(()=>window.overlappingFullscreenExits),0,'The older completion does not immediately exit a deliberate reopened view');assertSameCamera(parked,await orbitData(page),'Overlapping browser fullscreen requests');
   await page.locator('[data-orbit-fullscreen-close]:visible').tap();await waitStudio(page);await page.waitForFunction(()=>!document.fullscreenElement);assert.equal(await page.evaluate(()=>window.overlappingFullscreenExits),1,'Closing exits the adopted browser fullscreen exactly once');assert.equal(await page.evaluate(()=>window.overlappingFullscreenRequests.length),2,'Only the two deliberate opens create native requests');
  }finally{await f.close();}
 });
 await pass('studio short landscape phone preserves the image and readable details through rotation',async()=>{
  for(const beginPortrait of [false,true]){
   const f=await fixture({cleanFixture:true,context:{viewport:beginPortrait?{width:390,height:844}:{width:844,height:390},isMobile:true,hasTouch:true,deviceScaleFactor:2},props:{...studioProps,phoneImageWidth:100}}),{page}=f;
   try{
    await waitStudio(page);if(beginPortrait){await page.setViewportSize({width:844,height:390});await page.waitForTimeout(280);}
    await page.waitForFunction(()=>{const viewport=document.querySelector('[data-orbit-viewport]')?.getBoundingClientRect();return viewport?.width>100&&viewport?.height>100;});
    const geometry=await studioGeometry(page);assertStudioViewport(geometry);assertCompactStudioFit(await compactStudioGeometry(page),{width:844,height:390},'Rotated landscape phone');
    const cdp=await page.context().newCDPSession(page),x=geometry.viewport.x+geometry.viewport.width*.8,y=geometry.viewport.y+geometry.viewport.height*.5;
    await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x,y}]});await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:x-150,y}]});await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await waitFrame(page,15);
    await componentScreenshot(page,'studio-landscape-phone-844.png');await page.setViewportSize({width:390,height:844});await page.waitForTimeout(280);await waitStudio(page);
    const portrait=await studioGeometry(page);assertStudioViewport(portrait);assertCompactStudioFit(await compactStudioGeometry(page),{width:390,height:844},'Restored portrait phone');assert.equal(Number((await orbitData(page)).orbitFrame),15,'Returning to portrait retains the camera viewpoint');assert.equal(await page.locator(studioSelector).getAttribute('data-apartment-id'),'A001','Rotation retains the selected apartment details');
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
   await hoverStudioId(page,'A101');assert.match(await studioField(page,'status'),/Egyeztetés alatt/);assert.match(await studioField(page,'area'),/47[,.]48/);assert.match(await studioField(page,'terrace'),/11[,.]51/);assert.match((await studioField(page,'price')).replace(/\s/g,''),/159[,.]38MFt/);assert.match(await studioField(page,'orientation'),/NY/);
   await page.mouse.move(5,5);await sendApartment(page,null);await page.waitForFunction(()=>[...document.querySelectorAll('[data-orbit-studio] [data-orbitdata-transition]')].every(element=>!element.dataset.orbitdataDisplayedId));assert.equal(await page.locator(studioSelector).getAttribute('data-apartment-id'),'','Leaving the building clears mouse-hover orbitdata after fading out');
   await hoverStudioId(page,'B105');assert.match(await studioField(page,'status'),/Elkelt|Eladva/);assert.match(await studioField(page,'area'),/89[,.]65/);assert.match(await page.locator('[data-orbit-floorplan]').getAttribute('src'),/types\/C\/thumb\.webp/);
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
   const firstPlans=[...new Set(f.apartmentMediaRequests.filter(url=>/floorplans\/types\//.test(url)))];assert.equal(firstPlans.length,1,'Only the selected apartment type plan is downloaded');assert.match(firstPlans[0],/types\/B\/thumb\.webp/);assert.ok(!f.apartmentMediaRequests.some(url=>/original\.png/.test(url)),'Original production PNGs are never requested');
   const crop=await page.locator('[data-orbit-plan-crop]').first().evaluate(element=>({width:element.clientWidth,height:element.clientHeight}));assert.ok(Math.abs(crop.width/crop.height-(1500*.9306666666666666)/(2000*.7895))<.025,'The initial B drawing uses the JSON crop instead of wasting the page margins');
   await page.getByRole('tab',{name:'Szintrajz',exact:true}).click();await page.waitForFunction(()=>document.querySelector('[data-orbit-floorplan]')?.currentSrc.includes('/floor-layouts/00/thumb.webp'));await page.waitForFunction(()=>document.querySelector('[data-orbit-floorplan]')?.complete&&document.querySelector('[data-orbit-floorplan]')?.naturalWidth>0);
   assert.equal(Number((await orbitData(page)).orbitFrame),0,'The floor-layout tab cannot trigger camera motion');await page.getByRole('tab',{name:'Alaprajz',exact:true}).click();
   await page.getByRole('button',{name:'Alaprajz nagyítása',exact:true}).click();const dialog=page.locator('[data-orbit-plan-dialog]');await dialog.waitFor({state:'visible'});assert.ok((await dialog.boundingBox()).height>geometry.plan.height,'Expanded plan gets a larger reading area');await page.keyboard.press('Escape');
   for(const selector of ['[data-orbit-inquiry]','[data-orbit-download]']){const action=page.locator(selector+':visible').first();assert.ok(await action.getAttribute('href'),'Native action has a concrete destination');await action.evaluate(element=>element.addEventListener('click',event=>{event.preventDefault();window.studioActionClick=(window.studioActionClick||0)+1;},{once:true}));await action.click();}
   assert.equal(await page.evaluate(()=>window.studioActionClick),2);await page.locator('[data-orbit-detail-link]:visible').click();await waitApartmentCard(page);await closeApartmentCard(page);await sendApartment(page,{id:'A001'});await waitStudio(page,'A001');await page.evaluate(()=>{Object.defineProperty(navigator,'share',{configurable:true,value:undefined});Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async value=>{window.sharedStudioUrl=value;}}});});await page.getByRole('button',{name:'Megosztás',exact:false}).click();assert.match(await page.evaluate(()=>window.sharedStudioUrl),/\/lista\?apartment=A001/,'Sharing uses the selected apartment detail link');assert.equal(Number((await orbitData(page)).orbitFrame),0,'Detail actions never rotate the orbit');
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
  const f=await fixture({pageOverflow:true,cleanFixture:true,storyOverlays:true,tallStory:true,context:{viewport:{width:375,height:667},isMobile:true,hasTouch:true,deviceScaleFactor:2},props:{startView:'orbit',orbitStartFrame:105,detailsMode:'preview',showControls:false,showViewpoints:false,storyDelay:.01,storyIn:.02,storyOut:.02}}),{page}=f;
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
 await pass('opening zoom keeps centered Framer groups anchored and opaque until the final departure',async()=>{
  const authoredCss='#intro.copy{left:50%;top:50%;width:250px;height:100px;max-width:none;transform:translate(-50%,-50%) rotate(2deg);transform-origin:40% 60%;scale:1.1 .95;translate:8px 5px;rotate:3deg;font-size:36px;display:grid;place-items:center}';
  for(const setting of [
   {name:'desktop',context:{viewport:{width:1440,height:900}}},
   {name:'phone',context:{viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:2}},
   {name:'scaled-Framer',context:{viewport:{width:1200,height:800}},stageScale:.75,stageWidth:1440,stageHeight:900},
   {name:'calc-translate',context:{viewport:{width:1440,height:900}},calcTranslate:true},
  ]){
   const f=await fixture({...setting,authoredCss:setting.calcTranslate?authoredCss.replace('translate:8px 5px','translate:calc(10% + 8px) calc(5% + 5px)'):authoredCss,cleanFixture:true,storyAliases:true,props:{duration:3,maxSpeed:1,openingOut:50,openingZoom:16}}),{page}=f;
   try{
    await waitStage(page,'opening');await page.waitForTimeout(80);
    const before=await page.locator('#intro').evaluate(element=>{const rect=element.getBoundingClientRect(),css=getComputedStyle(element);return {x:rect.x+rect.width/2,y:rect.y+rect.height/2,width:rect.width,height:rect.height,scale:css.scale,transform:css.transform,translate:css.translate,rotate:css.rotate,origin:css.transformOrigin};});
    await page.evaluate(()=>{window.openingZoomSamples=[];window.captureOpeningZoom=true;const sample=()=>{if(!window.captureOpeningZoom)return;const element=document.querySelector('#intro'),rect=element.getBoundingClientRect(),css=getComputedStyle(element),root=document.querySelector('[data-admiral-homepage]');window.openingZoomSamples.push({x:rect.x+rect.width/2,y:rect.y+rect.height/2,width:rect.width,height:rect.height,scale:Number.parseFloat(css.scale)||1,opacity:Number(css.opacity),visibility:css.visibility,inert:element.inert,pointer:css.pointerEvents,transform:css.transform,origin:css.transformOrigin,stage:root.dataset.homepageStage,rootWidth:root.getBoundingClientRect().width,scrollWidth:document.documentElement.scrollWidth,viewportWidth:innerWidth});requestAnimationFrame(sample);};requestAnimationFrame(sample);});
    await page.mouse.move(100,200);await page.mouse.wheel(0,120);
    await page.waitForFunction(()=>{const element=document.querySelector('#intro'),css=getComputedStyle(element);return parseFloat(css.scale)>2&&Number(css.opacity)===1&&element.inert;});
    await page.screenshot({path:fileURLToPath(new URL('opening-zoom-'+setting.name+'.png',out))});
    await page.waitForFunction(()=>getComputedStyle(document.querySelector('#intro')).visibility==='hidden');
    const samples=await page.evaluate(()=>{window.captureOpeningZoom=false;return window.openingZoomSamples;});
    const enlarged=samples.filter(sample=>sample.scale>1.2&&sample.visibility==='visible'&&sample.opacity>.01);
    assert.ok(enlarged.length>8,setting.name+' samples actual intermediate zoom frames');
    for(const sample of enlarged){assert.ok(Math.abs(sample.x-before.x)<.5,setting.name+' keeps the authored horizontal anchor');assert.ok(Math.abs(sample.y-before.y)<.5,setting.name+' keeps the authored vertical anchor');assert.equal(sample.transform,before.transform,'Framer positioning transform stays intact');assert.equal(sample.origin,before.origin,'Authored origin stays intact');assert.equal(sample.inert,true,'Enlarged content cannot intercept camera input');assert.equal(sample.pointer,'none');assert.ok(sample.scrollWidth<=sample.viewportWidth,setting.name+' does not create page overflow');}
    const early=enlarged.filter(sample=>sample.scale/1.1<Math.pow(16,.84));assert.ok(early.length>5);assert.ok(early.every(sample=>sample.opacity===1),'The opening stays fully opaque through most of the zoom');
    assert.ok(enlarged.some(sample=>sample.width>sample.rootWidth),'The group actually grows beyond the viewer edges');
    assert.ok(enlarged.some(sample=>sample.opacity>0&&sample.opacity<1),'Only the final zoom frames dissolve');
    await writeFile(new URL('opening-zoom-'+setting.name+'.json',out),JSON.stringify({before,samples},null,2));
    await waitStage(page,'building');await coveredClick(page,'Overview');await waitStage(page,'opening');
    const reset=await page.locator('#intro').evaluate(element=>{const rect=element.getBoundingClientRect(),css=getComputedStyle(element);return {x:rect.x+rect.width/2,y:rect.y+rect.height/2,scale:css.scale,translate:css.translate,opacity:css.opacity,visibility:css.visibility,inert:element.inert};});
    assert.equal(reset.scale,before.scale);assert.equal(reset.translate,before.translate);assert.equal(reset.opacity,'1');assert.equal(reset.visibility,'visible');assert.equal(reset.inert,false);assert.ok(Math.abs(reset.x-before.x)<.5&&Math.abs(reset.y-before.y)<.5,'Overview restores the exact original composition');
    await page.waitForTimeout(250);await page.mouse.move(100,200);await page.mouse.wheel(0,120);await page.waitForFunction(()=>parseFloat(getComputedStyle(document.querySelector('#intro')).scale)>2);
    await page.evaluate(()=>{window.detachedOpening=document.querySelector('#intro');window.root.unmount();});
    const detached=await page.evaluate(()=>({scale:window.detachedOpening.style.scale,translate:window.detachedOpening.style.translate,transform:window.detachedOpening.style.transform,opacity:window.detachedOpening.style.opacity,overlay:window.detachedOpening.dataset.heroOverlay}));
    assert.deepEqual(detached,{scale:'',translate:'',transform:'',opacity:'1',overlay:undefined},'Unmount restores every authored inline style and removes override metadata');await page.waitForTimeout(80);assert.deepEqual(await page.evaluate(()=>({scale:window.detachedOpening.style.scale,translate:window.detachedOpening.style.translate,transform:window.detachedOpening.style.transform,opacity:window.detachedOpening.style.opacity,overlay:window.detachedOpening.dataset.heroOverlay})),detached,'Disposed observers and animation frames cannot mutate detached content');
   }finally{await f.close();}
  }
 });
 await pass('opening zoom static previews and reduced motion retain their readable normal scale',async()=>{
  const authoredCss='#intro.copy{left:50%;top:50%;width:250px;height:100px;transform:translate(-50%,-50%)}';
  for(const editorView of ['opening','building','connection','orbit']){
   const f=await fixture({authoredCss,cleanFixture:true,staticMode:true,props:{editorView}}),{page}=f;
   try{await page.waitForTimeout(80);const intro=await page.locator('#intro').evaluate(element=>{const css=getComputedStyle(element);return {scale:css.scale,opacity:Number(css.opacity),visibility:css.visibility};});assert.equal(intro.scale,'none','Canvas composition is never zoomed');assert.equal(intro.opacity,editorView==='opening'?1:0,'Only the static opening view shows its composition');assert.equal(intro.visibility,editorView==='opening'?'visible':'hidden');assert.equal(await page.evaluate(()=>window.nativeBitmapCalls),0);}finally{await f.close();}
  }
  const f=await fixture({authoredCss,cleanFixture:true,context:{reducedMotion:'reduce'},props:{duration:3,openingOut:50,openingZoom:40}}),{page}=f;
  try{await waitStage(page,'building');await page.waitForFunction(()=>getComputedStyle(document.querySelector('#intro')).visibility==='hidden');assert.equal(await page.locator('#intro').evaluate(element=>getComputedStyle(element).scale),'none','Reduced motion never magnifies the opening');}finally{await f.close();}
  const dynamic=await fixture({authoredCss,cleanFixture:true,props:{duration:3,maxSpeed:1,openingOut:50,openingZoom:40}});
  try{await waitStage(dynamic.page,'opening');await dynamic.page.mouse.move(100,200);await dynamic.page.mouse.wheel(0,120);await dynamic.page.waitForFunction(()=>parseFloat(getComputedStyle(document.querySelector('#intro')).scale)>2);await dynamic.page.emulateMedia({reducedMotion:'reduce'});await waitStage(dynamic.page,'building');await dynamic.page.waitForFunction(()=>getComputedStyle(document.querySelector('#intro')).visibility==='hidden');assert.equal(await dynamic.page.locator('#intro').evaluate(element=>getComputedStyle(element).scale),'none','A live preference change immediately clears the zoom');await dynamic.page.emulateMedia({reducedMotion:'no-preference'});await coveredClick(dynamic.page,'Overview');await waitStage(dynamic.page,'opening');assert.equal(await dynamic.page.locator('#intro').evaluate(element=>getComputedStyle(element).opacity),'1');assert.equal(await dynamic.page.locator('#intro').evaluate(element=>getComputedStyle(element).scale),'none');}finally{await dynamic.close();}
 });
 await pass('opening zoom refreshes percentage and calc positioning when the viewport resizes during departure',async()=>{
  const authoredCss='#intro.copy,#reference-intro.copy{left:50%;top:50%;width:280px;height:110px;max-width:none;transform:translate(-50%,-50%) rotate(2deg);transform-origin:40% 60%;scale:1.1 .95;translate:calc(10% + 8px) calc(5% + 5px);rotate:3deg}@media(max-width:1000px){#intro.copy,#reference-intro.copy{width:210px;height:90px;scale:1.25 .8;translate:calc(8% + 3px) calc(6% + 1px)}}';
  const f=await fixture({authoredCss,cleanFixture:true,context:{viewport:{width:1440,height:900}},props:{duration:6,maxSpeed:1,openingOut:50,openingZoom:16}}),{page}=f;
  try{
   await waitStage(page,'opening');await page.evaluate(()=>{const reference=document.querySelector('#intro').cloneNode(true);reference.id='reference-intro';reference.style.visibility='hidden';reference.style.scale='';reference.style.translate='';document.querySelector('#stage').append(reference);});
   await page.mouse.move(100,200);await page.mouse.wheel(0,120);await page.waitForFunction(()=>parseFloat(getComputedStyle(document.querySelector('#intro')).scale)>2);
   await page.setViewportSize({width:900,height:700});await page.waitForTimeout(100);
   const resized=await page.evaluate(()=>{const intro=document.querySelector('#intro'),reference=document.querySelector('#reference-intro'),a=intro.getBoundingClientRect(),b=reference.getBoundingClientRect();return {a:{x:a.x+a.width/2,y:a.y+a.height/2,width:a.width,height:a.height},b:{x:b.x+b.width/2,y:b.y+b.height/2,width:b.width,height:b.height},scale:getComputedStyle(intro).scale,opacity:getComputedStyle(intro).opacity};});
   assert.ok(Math.abs(resized.a.x-resized.b.x)<.6&&Math.abs(resized.a.y-resized.b.y)<.6,'Resize preserves the newly authored responsive visual center');const zoomX=resized.a.width/resized.b.width,zoomY=resized.a.height/resized.b.height;assert.ok(zoomX>1.5&&Math.abs(zoomX-zoomY)<.02,'Responsive x/y scales are re-read before continuing the uniform zoom');assert.equal(resized.opacity,'1');await writeFile(new URL('opening-zoom-responsive-resize.json',out),JSON.stringify(resized,null,2));
   await page.locator('#nav-link').evaluate(element=>element.setAttribute('href','/'));await page.locator('#nav-link').click();await waitStage(page,'opening');const reset=await page.locator('#intro').evaluate(element=>({scale:getComputedStyle(element).scale,translate:getComputedStyle(element).translate,opacity:getComputedStyle(element).opacity}));assert.equal(reset.scale,'1.25 0.8','Home restores the responsive authored scale');assert.equal(reset.opacity,'1');
  }finally{await f.close();}
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
 await pass('SEQ_02 Mac trackpad small wheel pulses accumulate within one fresh gesture',async()=>{
  for(const externalOverlay of [false,true]){
   const f=await fixture({useDefaultOrbitStart:true,externalOverlay,props:{duration:.6,connectionDuration:4,maxSpeed:1,triggerDistance:24}}),{page}=f;
   try{
    await page.evaluate(()=>{window.trackpadTrace=[];window.addEventListener('wheel',event=>window.trackpadTrace.push({time:performance.now(),delta:event.deltaY,trusted:event.isTrusted,cancelable:event.cancelable,stage:document.querySelector('[data-admiral-homepage]')?.dataset.homepageStage}),{capture:true});});await waitStage(page,'opening');await page.mouse.move(450,500);await page.mouse.wheel(0,120);await waitStage(page,'building');await page.waitForTimeout(300);const pinned=await pagePosition(page);
    for(let index=0;index<20;index++){await page.mouse.wheel(0,1+index%4);await page.waitForTimeout(16);}const stage=await page.locator('[data-admiral-homepage]').getAttribute('data-homepage-stage'),trace=await page.evaluate(()=>window.trackpadTrace);await writeFile(new URL('seq02-trackpad-'+(externalOverlay?'overlay':'native')+'.json',out),JSON.stringify({stage,trace},null,2));assert.equal(stage,'connection','A fresh stream of 1–4px Mac trackpad pulses starts SEQ_02');assert.ok(trace.filter(event=>event.delta<=4&&event.trusted).length>=20,'The regression uses actual trusted browser wheel input');const burst=trace.filter(event=>event.delta<=4);assert.ok(burst.slice(1).every((event,index)=>event.time-burst[index].time<160),'The small pulses belong to a single continuous wheel gesture');await assertPageHeld(page,pinned,'The fine wheel stream');
   }finally{await f.close();}
  }
 });
 await pass('SEQ_02 Mac trackpad SEQ_01 inertial tail cannot chain before a quiet gap',async()=>{
  const f=await fixture({useDefaultOrbitStart:true,externalOverlay:true,props:{duration:.6,connectionDuration:4,maxSpeed:1,triggerDistance:24}}),{page}=f;
  try{
   await waitStage(page,'opening');await page.mouse.move(450,500);await page.mouse.wheel(0,120);let reached=false;
   for(let index=0;index<120;index++){await page.mouse.wheel(0,4);await page.waitForTimeout(16);const stage=await page.locator('[data-admiral-homepage]').getAttribute('data-homepage-stage');assert.ok(stage==='approach'||stage==='building','SEQ_01 wheel inertia never starts the connector');if(stage==='building'){reached=true;break;}}
   assert.equal(reached,true,'The original SEQ_01 arrives during its ongoing gesture');for(let index=0;index<24;index++){await page.mouse.wheel(0,4);await page.waitForTimeout(16);}assert.equal(await page.locator('[data-admiral-homepage]').getAttribute('data-homepage-stage'),'building','Continuing inertia remains unarmed after the arrival cooldown');await page.waitForTimeout(260);
   for(let index=0;index<10;index++){await page.mouse.wheel(0,4);await page.waitForTimeout(16);}assert.equal(await page.locator('[data-admiral-homepage]').getAttribute('data-homepage-stage'),'connection','A new wheel gesture after quiet time starts the connector normally');
  }finally{await f.close();}
 });
 await pass('SEQ_02 Mac trackpad later noncancelable pulses and horizontal jitter retain vertical intent',async()=>{
  const f=await fixture({useDefaultOrbitStart:true,props:{connectionDuration:4,maxSpeed:1,triggerDistance:24}}),{page}=f;
  try{await coveredClick(page,'Skip approach');await waitStage(page,'building');await page.waitForTimeout(300);await page.evaluate(async()=>{const target=document.querySelector('[data-admiral-homepage]');for(let index=0;index<12;index++){target.dispatchEvent(new WheelEvent('wheel',{deltaY:3,clientX:450,clientY:500,bubbles:true,cancelable:index===0}));if(index%3===0)target.dispatchEvent(new WheelEvent('wheel',{deltaX:6,deltaY:1,clientX:450,clientY:500,bubbles:true,cancelable:false}));await new Promise(resolve=>setTimeout(resolve,16));}});assert.equal(await page.locator('[data-admiral-homepage]').getAttribute('data-homepage-stage'),'connection','A browser burst with only its first pulse cancelable still accumulates through harmless horizontal jitter');}finally{await f.close();}
 });
 await pass('SEQ_02 Mac trackpad native scroll panels cancel partial connector intent',async()=>{
  const f=await fixture({useDefaultOrbitStart:true,props:{connectionDuration:4,maxSpeed:1,triggerDistance:24}}),{page}=f;
  try{await coveredClick(page,'Skip approach');await waitStage(page,'building');await page.waitForTimeout(300);await page.mouse.move(450,500);for(let index=0;index<3;index++){await page.mouse.wheel(0,4);await page.waitForTimeout(16);}const panel=await page.locator('#nested').boundingBox();await page.mouse.move(panel.x+panel.width/2,panel.y+panel.height/2);await page.mouse.wheel(0,80);await page.waitForFunction(()=>document.querySelector('#nested').scrollTop>0);await page.mouse.move(450,500);for(let index=0;index<10;index++){await page.mouse.wheel(0,4);await page.waitForTimeout(16);}assert.equal(await page.locator('[data-admiral-homepage]').getAttribute('data-homepage-stage'),'building','Scrolling a native panel disarms the partial connector gesture');assert.equal(await page.evaluate(()=>scrollY),0,'The native panel cannot pan the homepage');await page.waitForTimeout(260);for(let index=0;index<10;index++){await page.mouse.wheel(0,4);await page.waitForTimeout(16);}assert.equal(await page.locator('[data-admiral-homepage]').getAttribute('data-homepage-stage'),'connection','A deliberate fresh wheel gesture still works after native-panel interaction');}finally{await f.close();}
 });
 await pass('SEQ_02 ArrowDown and Explore button still enter the connecting sequence',async()=>{
  const f=await fixture({useDefaultOrbitStart:true,externalOverlay:true,props:{connectionDuration:4,maxSpeed:1}}),{page}=f;
  try{await coveredClick(page,'Skip approach');await waitStage(page,'building');await page.waitForTimeout(250);await page.keyboard.press('ArrowDown');await waitStage(page,'connection');assert.equal(await page.evaluate(()=>scrollY),0,'ArrowDown enters SEQ_02 without moving the page');await coveredClick(page,'Overview');await waitStage(page,'opening');await coveredClick(page,'Skip approach');await waitStage(page,'building');await coveredClick(page,'Explore building');await waitStage(page,'connection');await coveredClick(page,'Skip connection');await waitFrame(page,45);}finally{await f.close();}
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
 await pass('orbit apartment bar centers its floorplan and adds a noninteractive fading bottom gradient',async()=>{
  for(const language of ['hu','en']){
   const f=await fixture({cleanFixture:true,useDefaultOrbitLayout:true,context:{viewport:{width:1440,height:900}},props:{...studioProps,detailsLanguage:language}}),{page}=f;
   try{
    await waitOrbit(page);await waitDetails(page);await page.locator('[data-apartment-open] img').evaluate(image=>image.decode());
    assert.doesNotMatch(await page.locator(detailsSelector).innerText(),/MINTA|SAMPLE/,'All layouts display a real JSON apartment');assert.match(await apartmentField(page,'number'),/A001/);assert.match(await apartmentField(page,'area'),/68[,.]67/);assert.match(await apartmentField(page,'availability'),language==='hu'?/Elérhető/:/Available/);
    const layout=await page.locator(detailsSelector).evaluate(root=>{
     const box=root.closest('[data-admiral-homepage]').getBoundingClientRect(),fields=Object.fromEntries([...root.querySelectorAll('[data-apartment-field]')].map(field=>{const r=field.getBoundingClientRect();return [field.dataset.apartmentField,{x:r.x,y:r.y,width:r.width,height:r.height}];})),button=root.querySelector('[data-apartment-open]'),plan=button.getBoundingClientRect(),gradient=getComputedStyle(root,'::before'),styles=[root,...root.querySelector('.admiral-details-grid').querySelectorAll('*')].map(element=>({interactive:element===button,css:getComputedStyle(element)}));
     return {root:{x:box.x,width:box.width},fields,plan:{x:plan.x,width:plan.width},gradient:{image:gradient.backgroundImage,pointer:gradient.pointerEvents,zIndex:gradient.zIndex,top:gradient.top},styles:styles.map(({interactive,css})=>({interactive,pointer:css.pointerEvents,bg:css.backgroundColor,image:css.backgroundImage,shadow:css.boxShadow,blur:css.backdropFilter})),rule:styles.some(({css})=>parseFloat(css.borderTopWidth)>0&&parseFloat(css.borderTopWidth)<=1.5&&/^rgba?\(255,\s*255,\s*255/.test(css.borderTopColor))};
    });
    const order=['number','area','terrace','floorplan','garden','rooms','availability'];assert.equal(Object.keys(layout.fields).length,7);assert.ok(order.every((name,index)=>layout.fields[name].width>20&&(index===0||layout.fields[name].x>layout.fields[order[index-1]].x)),'Three facts sit on each side of the central plan');assert.ok(Math.max(...Object.entries(layout.fields).filter(([name])=>name!=='floorplan').map(([,field])=>field.y))-Math.min(...Object.entries(layout.fields).filter(([name])=>name!=='floorplan').map(([,field])=>field.y))<25,'Desktop facts keep one compact horizontal row beside the taller plan');
    assert.ok(Math.abs(layout.plan.x+layout.plan.width/2-(layout.root.x+layout.root.width/2))<1,'The clickable floorplan is geometrically centered in the component');
    assert.equal(layout.gradient.pointer,'none');assert.match(layout.gradient.image,/linear-gradient/);assert.match(layout.gradient.image,/rgba\([^)]*,\s*0\)/,'The upper edge of the gradient is transparent');assert.equal(layout.gradient.zIndex,'-1');assert.ok(parseFloat(layout.gradient.top)<0,'The shadow fades upward behind the information');assert.ok(layout.styles.every(style=>(style.pointer===(style.interactive?'auto':'none'))&&style.bg==='rgba(0, 0, 0, 0)'&&style.image==='none'&&style.shadow==='none'&&(!style.blur||style.blur==='none')),'Only the plan is interactive; white facts have no opaque boxes');assert.ok(layout.rule,'The white hairline remains visible');
    if(language==='hu')await componentScreenshot(page,'orbit-info-bar-centered-desktop.png');
    await page.evaluate(()=>{window.props={...window.props,showControls:true};window.renderTrial();});await page.getByRole('button',{name:'Next view',exact:true}).waitFor();await page.waitForTimeout(180);const positions=await page.evaluate(()=>({panel:document.querySelector('[data-apartment-details]').getBoundingClientRect().top,controls:document.querySelector('[data-homepage-controls]').getBoundingClientRect().bottom}));assert.ok(positions.controls<=positions.panel-4,'Measured details height keeps trial controls above the strip');
    const area=await page.locator('[data-apartment-field=area]').boundingBox();await page.mouse.move(area.x+area.width/2,area.y+area.height/2);await page.mouse.wheel(0,1);await waitFrame(page,15);await waitDetails(page);assert.equal(await page.locator('#detail-dialog[open]').count(),0,'Scrolling through a text field turns the orbit without opening a card');
   }finally{await f.close();}
  }
 });
 await pass('orbit apartment bar hover changes facts only and floorplan clicks open the shared current card in default and Classic layouts',async()=>{
  for(const variant of [{name:'default',useDefaultOrbitLayout:true},{name:'Classic',useDefaultOrbitLayout:false},{name:'covered default',useDefaultOrbitLayout:true,externalOverlay:true},{name:'covered Classic',useDefaultOrbitLayout:false,externalOverlay:true}]){
   const f=await fixture({cleanFixture:true,useDefaultOrbitLayout:variant.useDefaultOrbitLayout,externalOverlay:variant.externalOverlay,context:{viewport:{width:1440,height:900}},props:{...studioProps,orbitLayout:'classic',snapDuration:.6}}),{page}=f;
   try{
    await waitOrbit(page);await waitDetails(page);const before=await orbitData(page);await sendApartment(page,{id:'A101'});await page.waitForFunction(()=>document.querySelector('[data-apartment-field=number]')?.textContent.includes('A101'));await page.locator('[data-apartment-open] img').evaluate(image=>image.decode());assert.match(await apartmentField(page,'area'),/47[,.]48/);assert.match(await apartmentField(page,'availability'),/Egyeztetés|Tárgyalás|Under negotiation|In negotiation/);assert.equal(await page.locator('#detail-dialog[open]').count(),0,variant.name+' hover never opens the card');assert.equal(f.detailRequests.length,0,'Hover does not fetch full detail data');assertSameCamera(before,await orbitData(page),'Hover selection');
    await sendApartment(page,null);await page.waitForFunction(()=>document.querySelector('[data-apartment-details]')?.dataset.detailsVisible==='false');assert.equal(await page.locator('[data-orbit-filters]:visible').count(),1,'Leaving the facade clears apartment data while retaining filters');await sendApartment(page,{id:'A101'});
    await waitOrbitdataRecord(page,'[data-apartment-details]','A101');const plan=page.locator('[data-apartment-open]'),box=await plan.boundingBox();assert.ok(box.width>40&&box.height>40,'The preview floorplan provides a usable click target');await page.mouse.click(box.x+box.width/2,box.y+box.height/2);const card=await waitApartmentCard(page,'A101');if(variant.name==='default')await componentScreenshot(page,'orbit-floorplan-open-latest-shared-card.png');assert.match(await card.locator('.detail-metrics').innerText(),/47[,.]48/);assert.equal((await orbitData(page)).orbitSuspended,'true','Opening the shared card suspends the orbit immediately');
    await page.mouse.move(250,300);await page.mouse.wheel(0,220);await page.keyboard.press('ArrowRight');await page.waitForTimeout(150);assertSameCamera(before,await orbitData(page),'Reading the clicked apartment card');await closeApartmentCard(page);assertSameCamera(before,await orbitData(page),'Closing the card');assert.equal((await orbitData(page)).orbitSuspended,'false');await page.waitForFunction(()=>document.querySelector('[data-apartment-details]')?.dataset.detailsVisible==='false');assert.equal(await page.evaluate(()=>!!document.activeElement?.closest('[inert],[aria-hidden="true"]')),false,'Closing mouse-selected data does not trap focus inside its cleared strip');
    await sendApartment(page,{id:'A101'});await waitOrbitdataRecord(page,'[data-apartment-details]','A101');await plan.focus();await page.keyboard.press('Enter');await waitApartmentCard(page,'A101');await closeApartmentCard(page);assert.equal(f.detailRequests.length,1,'Keyboard re-opening uses the same shared component and cached detail data');
    await clickApartment(page,'A001');await waitApartmentCard(page,'A001');await closeApartmentCard(page);assert.equal(f.detailRequests.length,1,'Future mask clicks open their canonical apartment in the same shared card');
    if(variant.externalOverlay){
     await sendApartment(page,{id:'A001'});await waitOrbitdataRecord(page,'[data-apartment-details]','A001');const target=await plan.boundingBox();await page.evaluate(({x,y})=>{const button=document.createElement('button');button.id='native-framer-action';button.textContent='Native Framer action';Object.assign(button.style,{position:'fixed',left:(x-40)+'px',top:(y-20)+'px',width:'80px',height:'40px',zIndex:'100'});button.addEventListener('click',()=>window.nativeFramerClicks=(window.nativeFramerClicks||0)+1);document.body.appendChild(button);},{x:target.x+target.width/2,y:target.y+target.height/2});await page.mouse.click(target.x+target.width/2,target.y+target.height/2);assert.equal(await page.evaluate(()=>window.nativeFramerClicks),1,'A real Framer button above the floorplan keeps its own action');assert.equal(await page.locator('#detail-dialog[open]').count(),0,'The relay never clicks through a real native control');assertSameCamera(before,await orbitData(page),'Native overlay action');await page.locator('#native-framer-action').evaluate(button=>button.remove());
    }
    await page.mouse.move(1050,350);await page.mouse.wheel(0,1);await waitFrame(page,15);assert.equal(await page.locator('#detail-dialog[open]').count(),0,'Normal gestures outside the floorplan remain available');
   }finally{await f.close();}
  }
 });
 await pass('apartment details phone layout centers its plan and touch passes through the remaining fields',async()=>{
  const f=await fixture({cleanFixture:true,context:{viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:2},props:{startView:'orbit',orbitStartFrame:45,detailsMode:'preview',showControls:false}}),{page}=f;
  try{await waitOrbit(page);await waitDetails(page);const boxes={};for(const field of apartmentFields){assert.equal(await page.locator(`[data-apartment-field="${field}"]`).isVisible(),true);boxes[field]=await page.locator(`[data-apartment-field="${field}"]`).boundingBox();assert.ok(boxes[field].x>=0&&boxes[field].x+boxes[field].width<=391,`${field} fits the phone viewport`);}assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'No horizontal page overflow');assert.ok(Math.abs(boxes.floorplan.x+boxes.floorplan.width/2-195)<1,'The small-screen floorplan remains centered');assert.ok(Math.abs(boxes.number.y-boxes.availability.y)<25&&Math.abs(boxes.number.y-boxes.floorplan.y)<25,'Apartment number, plan and status occupy the mobile header');assert.ok(['area','terrace','garden','rooms'].every(field=>boxes[field].y>boxes.number.y+25),'Four statistics occupy the second mobile row');await componentScreenshot(page,'orbit-info-bar-centered-phone-classic.png');const parked=await orbitData(page);await page.locator('[data-apartment-open]').tap();await waitApartmentCard(page,'A001');await componentScreenshot(page,'orbit-floorplan-open-latest-shared-card-phone-classic.png');assert.equal((await orbitData(page)).orbitSuspended,'true');await closeApartmentCard(page);assertSameCamera(parked,await orbitData(page),'Closing the tapped Classic phone floorplan');const cdp=await page.context().newCDPSession(page),y=Math.min(820,boxes.area.y+boxes.area.height/2);await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:260,y}]});await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:200,y}]});await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await waitFrame(page,60);await waitDetails(page);assert.equal(await page.evaluate(()=>scrollY),0);}finally{await f.close();}
 });
 await pass('apartment details preview appears only at orbit rest and static orbit editor',async()=>{
  const f=await fixture({props:{detailsMode:'preview'}}),{page}=f;
  try{await waitStage(page,'opening');assert.equal(await page.locator(detailsSelector+'[data-details-visible="true"]').count(),0);await page.mouse.wheel(0,100);await waitStage(page,'approach');assert.equal(await page.locator(detailsSelector+'[data-details-visible="true"]').count(),0);await page.getByRole('button',{name:'Skip approach',exact:true}).click();await waitStage(page,'building');assert.equal(await page.locator(detailsSelector+'[data-details-visible="true"]').count(),0);await page.getByRole('button',{name:'Explore building',exact:true}).click();await waitOrbit(page);await waitDetails(page);await page.getByRole('button',{name:'Overview',exact:true}).click();await waitStage(page,'opening');await waitDetails(page,false);}finally{await f.close();}
  const editor=await fixture({staticMode:true,props:{editorView:'orbit',detailsMode:'preview'}});try{await waitDetails(editor.page);assert.match(await apartmentField(editor.page,'number'),/A001/);assert.equal(await editor.page.evaluate(()=>window.bitmapRecords.length),0,'The editor preview keeps all animation decoders idle');}finally{await editor.close();}
 });
 await pass('apartment details canonical hover requires a parked view and cannot open a popup or rotate the camera',async()=>{
  const f=await fixture({props:{startView:'orbit',orbitStartFrame:45,detailsMode:'hover',detailsLanguage:'en',snapDuration:.7}}),{page}=f;
  try{await waitOrbit(page);await page.waitForFunction(()=>window.apartmentJsonFetched===true);await page.waitForTimeout(40);assert.equal(await page.locator(detailsSelector+'[data-details-visible="true"]').count(),0);const before=await orbitData(page);await sendApartment(page,{id:'not-a-real-apartment'});await page.waitForTimeout(60);assert.equal(await page.locator(detailsSelector+'[data-details-visible="true"]').count(),0,'Unknown mask IDs cannot fabricate a detail bar');await sendApartment(page,{id:'A101'});await waitDetails(page);assert.match(await apartmentField(page,'number'),/A101/);assert.match(await apartmentField(page,'availability'),/Under negotiation|In negotiation/);await page.locator('[data-apartment-field="floorplan"] img').evaluate(image=>image.decode());assertSameCamera(before,await orbitData(page),'Canonical hover');assert.equal(f.detailRequests.length,0);await sendApartment(page,null);await page.waitForFunction(()=>document.querySelector('[data-apartment-details]')?.dataset.detailsVisible==='false');await page.getByRole('button',{name:'Next view',exact:true}).click();await waitDetails(page,false);await sendApartment(page,{id:'A002'});await clickApartment(page,'A002');await waitFrame(page,60);await waitDetails(page,false);assert.equal(await page.locator(detailsSelector+'[data-details-visible=true]').count(),0,'A late event during travel cannot reappear after arrival');assert.equal(await page.locator('#detail-dialog[open]').count(),0);await sendApartment(page,{id:'A002'});await page.waitForFunction(()=>document.querySelector('[data-apartment-field=number]')?.textContent.includes('A002'));assert.equal(f.detailRequests.length,0);}finally{await f.close();}
  const custom=await fixture({props:{startView:'orbit',orbitStartFrame:42,detailsMode:'hover'}});try{await waitOrbit(custom.page);await sendApartment(custom.page,{id:'A001'});assert.equal(await custom.page.locator(detailsSelector+'[data-details-visible="true"]').count(),0,'A custom off-grid pose has no selectable facade mask');}finally{await custom.close();}
 });
 await pass('apartment details retain canonical zero and missing facts with a long identifier and broken plan',async()=>{
  const payload=JSON.parse(await readFile(new URL('data/apartments.json',root),'utf8')),number='ADMIRAL-PARK-BUILDING-A-APARTMENT-000000000204';payload.apartments=[{...payload.apartments[0],id:number,areaInterior:0,areaTerrace:null,areaGarden:0,rooms:null,status:'unknown',media:{floorplan:{full:'http://homepage.test/floorplan.svg',thumbnail:'http://homepage.test/floorplan.svg'}}}];
  const f=await fixture({brokenFloorplan:true,apartmentPayload:payload,context:{viewport:{width:390,height:844},isMobile:true,hasTouch:true},props:{startView:'orbit',orbitStartFrame:45,detailsMode:'preview',previewApartmentId:number,detailsLanguage:'en',showControls:false}}),{page}=f;
  try{await waitOrbit(page);await waitDetails(page);assert.ok((await apartmentField(page,'number')).includes(number));assert.match(await apartmentField(page,'area'),/0/);assert.match(await apartmentField(page,'garden'),/[—–]/);assert.match(await apartmentField(page,'terrace'),/[—–]/);assert.match(await apartmentField(page,'rooms'),/[—–]/);await page.waitForFunction(()=>document.querySelector('[data-apartment-field="floorplan"]')?.textContent.includes('Details'));assert.ok(f.floorplanRequests.length>0);assert.doesNotMatch(await page.locator(detailsSelector).innerText(),/NaN|undefined|null/);assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'Long JSON identifiers cannot overflow the phone viewport');}finally{await f.close();}
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
  assert.ok((await pagePosition(page)).bodyHeight>await page.evaluate(()=>innerHeight*2),'Fixture has real page overflow even when its body is fixed');
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
 await pass('whole homepage page pin holds desktop navbar apartment bar and native scroll boundaries throughout the journey',async()=>{
  const f=await fixture({pageOverflow:true,useDefaultOrbitLayout:true,props:{...studioProps,showControls:true,startView:'opening',duration:.6,connectionDuration:.6}}),{page}=f;
  try{
   const pinned=await pagePosition(page);assert.ok(pinned.bodyHeight>1600,'The test page remains genuinely taller than its viewport');
   for(const stage of ['opening','building','orbit']){
    if(stage==='building'){await coveredClick(page,'Skip approach');await waitStage(page,'building');}
    if(stage==='orbit'){await coveredClick(page,'Explore building');await waitOrbit(page);await waitDetails(page);}
    const nav=await page.getByRole('button',{name:'Contact',exact:true}).boundingBox();await page.mouse.move(nav.x+nav.width/2,nav.y+nav.height/2);await page.mouse.wheel(0,420);await assertPageHeld(page,pinned,stage+' wheel over the fixed navbar');
    await page.getByRole('button',{name:'Contact',exact:true}).click();assert.ok(await page.evaluate(()=>window.navClicked)>0,'The fixed navbar remains clickable');
   }
   const frame=await orbitData(page),plan=await page.locator('[data-apartment-open]').boundingBox();await page.mouse.move(plan.x+plan.width/2,plan.y+plan.height/2);await page.mouse.wheel(0,420);await assertPageHeld(page,pinned,'Wheel over the floorplan button');assertSameCamera(frame,await orbitData(page),'Wheel over a native floorplan button');
   const nested=page.locator('#nested');await nested.evaluate(element=>element.scrollTop=0);await page.mouse.move(1150,145);await page.mouse.wheel(0,120);await page.waitForFunction(()=>document.querySelector('#nested').scrollTop>0);assertSameCamera(frame,await orbitData(page),'Scrolling the native nested panel');await assertPageHeld(page,pinned,'Native scrollable panel');
   for(const [edge,delta] of [['bottom',500],['top',-500]]){await nested.evaluate((element,edge)=>element.scrollTop=edge==='bottom'?element.scrollHeight:0,edge);await page.mouse.wheel(0,delta);await assertPageHeld(page,pinned,'Nested panel '+edge+' scroll boundary');}
   await waitOrbit(page);const beforeCard=await orbitData(page);await page.locator('[data-apartment-open]').click();const card=await waitApartmentCard(page);await page.mouse.move(500,420);await page.mouse.wheel(0,420);await assertPageHeld(page,pinned,'Shared detail card wheel');await card.getByRole('button',{name:'Bezárás',exact:true}).click();await card.waitFor({state:'hidden'});await waitOrbit(page);await assertPageHeld(page,pinned,'Closing the shared card retains the page pin');assertSameCamera(beforeCard,await orbitData(page),'Closing the shared card after nested scrolling');
  }finally{await f.close();}
 });
 await pass('whole homepage page pin holds the compact mobile orbit and its fixed details',async()=>{
  const f=await fixture({pageOverflow:true,cleanFixture:true,useDefaultOrbitLayout:true,context:{viewport:{width:390,height:667},isMobile:true,hasTouch:true,deviceScaleFactor:2},props:studioProps}),{page}=f;
  try{
   await waitStudio(page);const pinned=await pagePosition(page);assert.ok(pinned.bodyHeight>1334,'The mobile test page has real page overflow');
   for(const point of [{x:195,y:72},{x:190,y:20},{x:360,y:653}]){await phoneSwipe(page,{...point,dy:point.y<90?100:-100});await assertPageHeld(page,pinned,'Phone swipe over the header or studio space at '+JSON.stringify(point));await waitOrbit(page);}
   const parked=await orbitData(page);
   const details=page.locator('[data-orbit-studio-details]'),box=await details.boundingBox();assert.ok(await details.evaluate(element=>element.scrollHeight<=element.clientHeight+1),'All short-phone details are visible without an internal scroller');
   for(const dy of [-70,70]){await phoneSwipe(page,{x:box.x+box.width*.7,y:box.y+Math.min(box.height/2,110),dy});await assertPageHeld(page,pinned,'Touch over the compact apartment details');assert.equal(await details.evaluate(element=>element.scrollTop),0,'A touch cannot reveal additional hidden detail content');assertSameCamera(parked,await orbitData(page),'Touching the fixed apartment details');}
   await details.locator('.orbit-studio-primary[data-orbit-detail-link]').tap();const card=await waitApartmentCard(page);await phoneSwipe(page,{x:320,y:420,dy:-100});await assertPageHeld(page,pinned,'Touch scrolling the shared mobile card');await card.getByRole('button',{name:'Bezárás',exact:true}).tap();await card.waitFor({state:'hidden'});await waitStudio(page);await assertPageHeld(page,pinned,'Closing the mobile shared card');assertSameCamera(parked,await orbitData(page),'Mobile card touch and close');
   const pinch=await page.evaluate(()=>{const target=document.querySelector('[data-orbit-studio]'),touches=[new Touch({identifier:101,target,clientX:120,clientY:350}),new Touch({identifier:102,target,clientX:250,clientY:350})];const start=new TouchEvent('touchstart',{touches,targetTouches:touches,changedTouches:touches,bubbles:true,cancelable:true});target.dispatchEvent(start);const move=new TouchEvent('touchmove',{touches,targetTouches:touches,changedTouches:touches,bubbles:true,cancelable:true});target.dispatchEvent(move);target.dispatchEvent(new TouchEvent('touchend',{touches:[],targetTouches:[],changedTouches:touches,bubbles:true,cancelable:true}));return {start:start.defaultPrevented,move:move.defaultPrevented};});assert.deepEqual(pinch,{start:false,move:false},'Page pin leaves two-finger browser zoom available');
  }finally{await f.close();}
 });
 await pass('whole homepage page pin releases for hidden breakpoints route changes and unmount',async()=>{
  const f=await fixture({pageOverflow:true,authoredPageStyles:true,initialScroll:120,cleanFixture:true,props:{startView:'orbit'}}),{page}=f;
  try{
   await waitOrbit(page);const held=await pagePosition(page);await page.mouse.move(180,16);await page.mouse.wheel(0,500);await assertPageHeld(page,held,'Initial homepage page lock');
   await page.locator('#stage').evaluate(element=>element.style.display='none');await page.waitForTimeout(350);assert.equal(await page.evaluate(()=>scrollY),120,'Hiding the last owner restores its original nonzero scroll position');await page.mouse.move(450,500);await page.mouse.wheel(0,450);await page.waitForTimeout(200);assert.ok(await page.evaluate(()=>scrollY)>200,'A hidden Framer breakpoint releases page scrolling');
   await page.evaluate(()=>{scrollTo(0,0);document.querySelector('#stage').style.display='block';});await waitOrbit(page);await page.waitForTimeout(300);const restored=await pagePosition(page);await page.mouse.move(180,16);await page.mouse.wheel(0,500);await assertPageHeld(page,restored,'A visible breakpoint reacquires the page pin');
   await page.evaluate(()=>{history.pushState({},'','/apartments');clearInterval(window.sampleTimer);window.root.unmount();});await page.evaluate(()=>scrollTo(0,0));await page.mouse.wheel(0,450);await page.waitForTimeout(200);assert.ok(await page.evaluate(()=>scrollY)>100,'A route change unmount restores ordinary page scrolling');const restoredStyles=await page.evaluate(()=>({current:window.readFixturePageStyles(),authored:window.authoredPageStyles}));assert.deepEqual(restoredStyles.current,restoredStyles.authored,'Cleanup restores the authored body and root styles including inline priorities');
  }finally{await f.close();}
 });
 await pass('whole homepage page pin survives overlapping breakpoint owners and releases transparent or hidden ancestors',async()=>{
  const f=await fixture({pageOverflow:true,twoInstances:true,cleanFixture:true,props:{showControls:false}}),{page}=f;
  try{
   await page.waitForFunction(()=>getComputedStyle(document.body).position==='fixed');await page.locator('#secondary').evaluate(element=>{element.style.cssText='display:block;position:fixed;inset:0;height:100svh';});await page.waitForTimeout(250);assert.equal(await page.locator('[data-admiral-homepage]').count(),2,'Two visible breakpoint instances share the same page');
   await page.locator('#stage').evaluate(element=>element.style.display='none');await page.waitForTimeout(250);assert.equal(await page.evaluate(()=>getComputedStyle(document.body).position),'fixed','Hiding one owner cannot release the remaining visible homepage');await page.mouse.move(180,16);await page.mouse.wheel(0,450);assert.equal(await page.evaluate(()=>scrollY),0,'The remaining visible owner still holds the page');
   await page.locator('#secondary').evaluate(element=>element.style.display='none');await page.waitForFunction(()=>getComputedStyle(document.body).position!=='fixed');await page.mouse.wheel(0,400);await page.waitForTimeout(150);assert.ok(await page.evaluate(()=>scrollY)>100,'The final hidden owner restores native page scrolling');
   await page.evaluate(()=>{scrollTo(0,0);const stage=document.querySelector('#stage');stage.style.display='block';stage.style.opacity='0';});await page.waitForTimeout(200);assert.notEqual(await page.evaluate(()=>getComputedStyle(document.body).position),'fixed','An opacity-zero Framer ancestor cannot lock an unseen homepage');
   await page.locator('#stage').evaluate(element=>element.style.opacity='1');await page.waitForFunction(()=>getComputedStyle(document.body).position==='fixed');await page.locator('#stage').evaluate(element=>element.style.visibility='hidden');await page.waitForFunction(()=>getComputedStyle(document.body).position!=='fixed');
   await page.locator('#stage').evaluate(element=>element.style.visibility='visible');await page.waitForFunction(()=>getComputedStyle(document.body).position==='fixed');await page.evaluate(()=>{clearInterval(window.sampleTimer);window.root.unmount();});assert.notEqual(await page.evaluate(()=>getComputedStyle(document.body).position),'fixed','Unmount removes the final owner after repeated visibility changes');
  }finally{await f.close();}
 });
 await pass('whole homepage page pin closes an open shared card before a breakpoint becomes hidden',async()=>{
  const f=await fixture({pageOverflow:true,authoredPageStyles:true,cleanFixture:true,useDefaultOrbitLayout:true,props:studioProps}),{page}=f;
  try{
   await waitOrbit(page);await waitDetails(page);await page.locator('[data-apartment-open]').click();const card=await waitApartmentCard(page);assert.equal(await page.evaluate(()=>getComputedStyle(document.body).position),'fixed','The homepage remains pinned while its native card is open');
   await page.locator('#stage').evaluate(element=>element.style.display='none');await card.waitFor({state:'hidden'});await page.waitForFunction(()=>getComputedStyle(document.body).position!=='fixed');
   // The existing shared modal separately owns the body overflow shorthand; the homepage pin owns neither body overflow longhand.
   const restoredStyles=await page.evaluate(()=>{const current=window.readFixturePageStyles(),authored=structuredClone(window.authoredPageStyles);for(const styles of [current.body,authored.body])for(const name of ['overflow','overflow-x','overflow-y'])delete styles[name];return {current,authored,overflowY:getComputedStyle(document.body).overflowY};});assert.deepEqual(restoredStyles.current,restoredStyles.authored,'Hiding a card restores every page-pin-owned property');assert.notEqual(restoredStyles.overflowY,'hidden','The hidden card releases its separate modal scroll lock');await page.mouse.move(450,500);await page.mouse.wheel(0,450);await page.waitForTimeout(150);assert.ok(await page.evaluate(()=>scrollY)>100,'An unseen shared card cannot trap the page');
   await page.evaluate(()=>{scrollTo(0,0);document.querySelector('#stage').style.display='block';});await waitOrbit(page);await page.waitForFunction(()=>getComputedStyle(document.body).position==='fixed');assert.equal(await page.locator('#detail-dialog[open]').count(),0,'Reappearing at a breakpoint does not reopen the abandoned apartment card');await page.locator('[data-apartment-open]').click();await waitApartmentCard(page);await closeApartmentCard(page);assert.equal(await page.evaluate(()=>getComputedStyle(document.body).position),'fixed','A fresh card open and close keeps the visible homepage pin');
  }finally{await f.close();}
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
