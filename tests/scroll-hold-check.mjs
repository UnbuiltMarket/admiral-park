import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
const {chromium}=require(process.env.PLAYWRIGHT_MODULE_PATH||'playwright');
const core=await readFile(new URL('../src/core/hero-player.js',import.meta.url),'utf8');
const data=JSON.parse(await readFile(new URL('../data/hero.json',import.meta.url),'utf8'));
const video=await readFile(new URL('../'+data.variants.find(v=>v.id===data.defaultVariant).path,import.meta.url));
const start=await readFile(new URL('../'+data.startFrame,import.meta.url));
const end=await readFile(new URL('../'+data.endFrame,import.meta.url));
const browser=await chromium.launch({headless:true,channel:process.env.PLAYWRIGHT_CHANNEL||'chrome'});
const errors=[];
async function fixture({delayEnd=false,failEnd=false,failVideo=false,delayVideo=false,mobile=false,reduced=false,options={}}={}) {
 const context=await browser.newContext({viewport:mobile?{width:390,height:844}:{width:1200,height:800},isMobile:mobile,hasTouch:mobile,reducedMotion:reduced?'reduce':'no-preference'});
 const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));
 let releaseEnd,releaseVideo;
 const endGate=new Promise(resolve=>releaseEnd=resolve),videoGate=new Promise(resolve=>releaseVideo=resolve);
 await page.route('http://hold.test/**',async route=>{
  const p=new URL(route.request().url()).pathname;
  try {
   if(p==='/core.js')return await route.fulfill({contentType:'text/javascript',body:core});
   if(p==='/first.webp')return await route.fulfill({contentType:'image/webp',body:start});
   if(p==='/last.webp'){if(delayEnd)await endGate;return await route.fulfill({status:failEnd?404:200,contentType:'image/webp',body:failEnd?'missing':end});}
   if(p==='/video.mp4'){if(delayVideo)await videoGate;return await route.fulfill({status:failVideo?404:200,contentType:'video/mp4',body:failVideo?'missing':video});}
   return await route.fulfill({contentType:'text/html',body:`<!doctype html><meta name="viewport" content="width=device-width,initial-scale=1"><style>html{scroll-behavior:smooth}body{margin:0}#hero{position:relative;height:100vh;overflow:hidden}#hero>img,#hero>video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;pointer-events:none}#video,#end{opacity:0}#nested{position:absolute;top:20px;left:20px;width:160px;height:100px;overflow:auto;background:white}#after{height:250vh;background:#eee}</style><section id="hero"><img id="first" src="/first.webp"><video id="video" muted playsinline></video><img id="end" src="/last.webp"><div id="nested"><div style="height:500px">Scrollable menu</div></div><input id="input" aria-label="Input" style="position:absolute;top:140px;left:20px"></section><section id="after">Next page section</section><script type="module">import {createHeroPlayer} from '/core.js';window.player=createHeroPlayer({root:document.querySelector('#hero'),video:document.querySelector('#video'),startImage:document.querySelector('#first'),endImage:document.querySelector('#end'),videoUrl:'/video.mp4',endUrl:'/last.webp',preload:false,...${JSON.stringify(options)}})</script>`});
  }catch(e){if(!page.isClosed())throw e;}
 });
 await page.goto('http://hold.test/',{waitUntil:'domcontentloaded'});await page.waitForFunction(()=>!!window.player);
 await page.locator('#first').evaluate(i=>i.decode());
 await page.mouse.move(mobile?250:700,400);
 return {page,context,releaseEnd,releaseVideo,close:async()=>{releaseEnd();releaseVideo();await context.close();}};
}
async function state(page,value){await page.waitForFunction(value=>document.querySelector('#hero').dataset.state===value,value,{timeout:12000});}
async function held(page,value){await page.waitForFunction(value=>document.querySelector('#hero').dataset.scrollHeld===String(value),value);}
async function y(page){return page.evaluate(()=>scrollY);}
async function swipe(page){const cdp=await page.context().newCDPSession(page);await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:250,y:600}]});for(const yy of [550,480,400,320])await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:250,y:yy}]});await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await cdp.detach();}
try {
 {
  const f=await fixture({delayEnd:true});const {page}=f;
  await page.mouse.wheel(0,1500);await held(page,true);await state(page,'playing');
  assert.equal(await y(page),0,'Initial wheel must not move a normal-flow hero');
  await page.mouse.wheel(0,3000);await page.keyboard.press('PageDown');
  await page.evaluate(()=>scrollTo({top:500,behavior:'instant'}));await page.waitForTimeout(80);
  assert.equal(await y(page),0,'Extra input and programmatic scroll cannot pass the held hero');
  await page.waitForFunction(()=>document.querySelector('#video').ended);
  assert.equal(await page.locator('#hero').getAttribute('data-state'),'loading');
  assert.equal(await page.locator('#hero').getAttribute('data-scroll-held'),'true');
  await page.mouse.wheel(0,1000);assert.equal(await y(page),0);
  f.releaseEnd();await state(page,'exiting');assert.equal(await page.locator('#hero').getAttribute('data-scroll-held'),'true');
  await state(page,'ended');await held(page,false);
  assert.equal(await page.locator('#end').evaluate(i=>getComputedStyle(i).opacity),'1');
  assert.equal(await y(page),0,'Release must not replay accumulated scroll distance');
  await page.mouse.wheel(0,500);await page.waitForFunction(()=>scrollY>100);
  await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));await page.waitForTimeout(80);
  assert.equal(await page.locator('#hero').getAttribute('data-state'),'ended');
  await page.evaluate(()=>{player.reset();void player.play();});await state(page,'playing');await held(page,false);
  console.log('PASS Wheel hold, delayed final image, complete fade before release, no jump and no relock');await f.close();
 }
 {
  const f=await fixture();const {page}=f;
  await page.locator('#input').focus();await page.keyboard.press('ArrowDown');await state(page,'idle');
  await page.mouse.move(80,60);await page.mouse.wheel(0,100);await page.waitForFunction(()=>document.querySelector('#nested').scrollTop>0);await state(page,'idle');
  await page.locator('#input').evaluate(e=>e.blur());await page.mouse.move(700,400);await page.keyboard.press('PageDown');await held(page,true);
  assert.equal(await y(page),0);await page.keyboard.press('Escape');await held(page,false);
  await page.mouse.wheel(0,300);await page.waitForFunction(()=>scrollY>50);
  console.log('PASS Keyboard start, editable input and nested scrolling, Escape releases navigation');await f.close();
 }
 {
  const f=await fixture({mobile:true});const {page}=f;
  await swipe(page);await state(page,'playing');await held(page,true);assert.equal(await y(page),0);
  await swipe(page);assert.equal(await y(page),0);await state(page,'ended');await held(page,false);
  await swipe(page);await page.waitForFunction(()=>scrollY>50);
  console.log('PASS Mobile touch holds playback and the next swipe moves down after completion');await f.close();
 }
 for(const [name,config,target] of [['missing final image',{failEnd:true},'ended'],['failed video',{failVideo:true},'error']]) {
  const f=await fixture(config);await f.page.mouse.wheel(0,100);await state(f.page,target);await held(f.page,false);
  await f.page.mouse.wheel(0,500);await f.page.waitForFunction(()=>scrollY>50);
  console.log('PASS '+name+' releases the page');await f.close();
 }
 {
  const f=await fixture({delayVideo:true,options:{holdTimeoutMs:500}});await f.page.mouse.wheel(0,100);await held(f.page,true);await held(f.page,false);
  assert.equal(await f.page.locator('#hero').getAttribute('data-scroll-release'),'timeout');
  await f.page.mouse.wheel(0,500);await f.page.waitForFunction(()=>scrollY>50);
  console.log('PASS A stalled download cannot hold navigation indefinitely');await f.close();
 }
 {
  const f=await fixture();await f.page.mouse.wheel(0,100);await held(f.page,true);await f.page.evaluate(()=>player.destroy());await held(f.page,false);
  await f.page.mouse.wheel(0,500);await f.page.waitForFunction(()=>scrollY>50);
  console.log('PASS Unmount restores scrolling and removes listeners');await f.close();
 }
 for(const [name,config] of [['reduced motion',{reduced:true}],['disabled hold',{options:{holdScroll:false}}],['looping video',{options:{loop:true}}]]) {
  const f=await fixture(config);await f.page.mouse.wheel(0,80);await f.page.waitForFunction(()=>scrollY>20);await held(f.page,false);
  console.log('PASS '+name+' keeps normal page scrolling');await f.close();
 }
 assert.deepEqual(errors,[]);console.log('All scroll-hold checks passed.');
}finally{await browser.close();}
