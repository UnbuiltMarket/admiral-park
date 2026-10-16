import assert from 'node:assert/strict';
import {readFile,mkdir,writeFile} from 'node:fs/promises';
import path from 'node:path';
import {createRequire} from 'node:module';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import {ts,requireDev} from '../scripts/tooling.mjs';
const require=createRequire(import.meta.url);
const {chromium}=require(process.env.PLAYWRIGHT_MODULE_PATH||'playwright');
const root=new URL('../',import.meta.url);
const out=new URL('tmp/sequence-check/',root);await mkdir(out,{recursive:true});
const remoteMode=process.env.SEQUENCE_REMOTE==='1';
const frameCount=65,lastFrame=frameCount-1;
const source=await readFile(new URL(remoteMode?'src/framer/AdmiralHeroLoader.tsx':'src/framer/AdmiralHeroSequence.tsx',root),'utf8');
const release=remoteMode?JSON.parse(await readFile(new URL('docs/hero-manifest.json',root),'utf8')):null;
const releaseBundle=remoteMode?await readFile(new URL('docs/'+release.script,root),'utf8'):'';
const code=ts.transpileModule(source,{compilerOptions:{target:ts.ScriptTarget.ES2020,module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.React}}).outputText;
const react=await readFile(path.join(path.dirname(requireDev.resolve('react/package.json')),'umd/react.development.js'),'utf8');
const dom=await readFile(path.join(path.dirname(requireDev.resolve('react-dom/package.json')),'umd/react-dom.development.js'),'utf8');
const assets=await Promise.all(Array.from({length:frameCount},(_,i)=>readFile(new URL('assets/images/AVIF 30_1920x1010 DESKTOP HERO SEQUENCE/'+encodeURIComponent(`raw sequence${String(i).padStart(2,'0')}.avif`),root))));
const browser=await chromium.launch({headless:true,channel:process.env.PLAYWRIGHT_CHANNEL||'chrome'});
const results=[];
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function fixture(options={}){
 const context=await browser.newContext({viewport:{width:1200,height:800},...options.context});
 const page=await context.newPage(),errors=[],requests=[],remoteRequests=[];
 page.on('pageerror',e=>errors.push(e.message));
 if(remoteMode&&process.env.SEQUENCE_PUBLIC!=='1'){
  const updatedVersion='1111111111111111';
  const updatedBundle=releaseBundle.replaceAll(release.version,updatedVersion)+'\nwindow.__runtimeUpdateProof=true;\n';
  const selected=options.updatedRelease?{...release,version:updatedVersion,script:`releases/admiral-hero.${updatedVersion}.js`,integrity:'sha384-'+createHash('sha384').update(updatedBundle).digest('base64')}:release;
  if(options.badIntegrity)selected.integrity='sha384-'+'A'.repeat(64);
  await page.route('https://unbuiltmarket.github.io/admiral-park/**',async route=>{
   const pathname=new URL(route.request().url()).pathname.slice('/admiral-park/'.length);remoteRequests.push(pathname);
   const headers={'Access-Control-Allow-Origin':'*'};
   if(pathname==='hero-manifest.json')return route.fulfill({status:options.manifestFailure?503:200,contentType:'application/json',headers,body:JSON.stringify(selected)});
   if(pathname.endsWith('.js'))return route.fulfill({status:options.runtimeUnavailable?503:200,contentType:'application/javascript',headers,body:pathname===release.script?releaseBundle:updatedBundle});
   if(options.pagesImagesDown)return route.fulfill({status:503,headers,body:'Test image host outage'});
   return route.fulfill({headers,contentType:'image/avif',body:await readFile(new URL('docs/'+pathname,root))});
  });
  if(options.pagesImagesDown)await page.route('https://raw.githubusercontent.com/UnbuiltMarket/admiral-park/**',route=>route.fulfill({headers:{'Access-Control-Allow-Origin':'*'},contentType:'image/avif',body:assets[route.request().url().includes('sequence64')?64:0]}));
 }
 await page.route('http://sequence.test/**',async route=>{
  const url=new URL(route.request().url());
  if(url.pathname.startsWith('/frames/')){
   const index=Number(decodeURIComponent(url.pathname).match(/sequence(\d+)/)?.[1]);requests.push(index);
   if(options.delayLast&&index===lastFrame)await sleep(options.delayLast);
   if(options.failFrame===index)return route.fulfill({status:503,body:'Test failure'});
   if(options.solidFrames)return route.fulfill({contentType:'image/svg+xml',body:`<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1010"><rect width="1920" height="1010" fill="${index===0?'red':index===lastFrame-1?'lime':index===lastFrame?'yellow':'blue'}"/></svg>`});
   return route.fulfill({contentType:'image/avif',headers:{'Cache-Control':'public,max-age=3600'},body:assets[index]});
  }
  return route.fulfill({contentType:'text/html',body:'<html><head><meta name="viewport" content="width=device-width, initial-scale=1"><style>body{margin:0;background:#eee;color:white;font:18px Arial}#hero{height:100svh;position:relative}.copy{position:absolute;left:6%;top:20%;max-width:650px}.cta{position:absolute;left:6%;top:65%}.cta a{display:inline-block;background:#fff;color:#152a31;padding:18px;border-radius:4px}#after{height:160vh;padding:50px;color:#152a31}#nested{position:absolute;right:0;top:0;height:100px;width:100px;overflow:auto;z-index:5}</style></head><body><div id="mount"></div><section id="after">Content after the hero</section></body></html>'});
 });
 await page.goto('http://sequence.test/');await page.addScriptTag({content:react});await page.addScriptTag({content:dom});
 await page.evaluate(({code,props,staticMode})=>{
  const module={exports:{}};
  const stub={useIsStaticRenderer:()=>staticMode,RenderTarget:{canvas:'canvas',current:()=>staticMode?'canvas':'preview'},addPropertyControls:()=>{},ControlType:new Proxy({},{get:(_,name)=>name})};
  new Function('module','exports','require',code)(module,module.exports,name=>name==='react'?React:stub);
  window.Hero=module.exports.default;
  const Frame=React.forwardRef((props,ref)=>React.createElement('div',{...props,ref}));
  const Intro=module.exports.OpeningContent(Frame),Building=module.exports.BuildingContent(Frame),CTA=module.exports.ArrivalCTA(Frame);
  window.props={useGitHubAssets:false,baseUrl:'http://sequence.test/frames',filename:'raw sequence{index}.avif',...props};
  window.root=ReactDOM.createRoot(document.querySelector('#mount'));
  window.renderHero=()=>window.root.render(React.createElement(React.StrictMode,null,
   React.createElement('section',{id:'hero'},React.createElement(window.Hero,window.props),
    React.createElement(Intro,{id:'intro',className:'copy'},React.createElement('p',null,'LOCATION'),React.createElement('h1',null,'A BALATONPART LEGÉRTÉKESEBB PONTJÁN')),
    React.createElement(Building,{id:'building',className:'copy'},React.createElement('p',null,'ADMIRAL PARK'),React.createElement('h1',null,'Your building message')),
    React.createElement(CTA,{id:'cta',className:'cta'},React.createElement('a',{href:'#after',onClick:()=>window.ctaClicked=true},'View apartments')),
    React.createElement('div',{id:'nested'},React.createElement('div',{style:{height:400}},'Nested scroll test')))));
  window.renderHero();window.samples=[];
  window.sampleTimer=setInterval(()=>{const e=document.querySelector('[data-admiral-sequence]');if(e)window.samples.push({time:performance.now(),frame:Number(e.dataset.frame),state:e.dataset.sequenceState,decoded:Number(e.dataset.decoded),held:e.dataset.scrollHeld,edge:e.dataset.crossfade,mix:Number(e.dataset.crossfadeMix),ctaInert:document.querySelector('#cta')?.inert});},16);
 },{code,props:options.props||{},staticMode:!!options.staticMode});
 if(remoteMode&&!options.staticMode&&!options.runtimeUnavailable)await page.waitForSelector('[data-admiral-sequence]');
 if(remoteMode&&options.runtimeUnavailable)await page.waitForSelector('[data-runtime-status="unavailable"]');
 await page.waitForFunction(()=>document.querySelector('img')?.naturalWidth>0);
 await page.mouse.move(400,550);
 return {context,page,errors,requests,remoteRequests,async close(){assert.deepEqual(errors,[]);await context.close();}};
}
const state=page=>page.locator('[data-admiral-sequence]').getAttribute('data-sequence-state');
async function waitState(page,value,timeout=12000){await page.waitForFunction(value=>document.querySelector('[data-admiral-sequence]')?.dataset.sequenceState===value,value,{timeout});}
async function pass(name,fn){if(process.env.SEQUENCE_TEST_FILTER&&!name.includes(process.env.SEQUENCE_TEST_FILTER))return;const started=Date.now();await fn();results.push({name,ms:Date.now()-started});console.log('PASS '+name);}
try{
 await pass('forward, coasting, overlay synchronization, release and reverse',async()=>{
  const f=await fixture(),{page}=f;
  assert.equal(await state(page),'opening');
  assert.match(await page.locator('[data-admiral-sequence] img').getAttribute('src'),/raw%20sequence00\.avif/);
  assert.equal(await page.locator('#intro').evaluate(e=>getComputedStyle(e).opacity),'1');
  assert.equal(await page.locator('#cta').evaluate(e=>e.inert),true);
  await page.screenshot({path:fileURLToPath(new URL('opening.png',out))});
  await page.mouse.wheel(0,100);
  await page.waitForFunction(()=>Number(document.querySelector('[data-admiral-sequence]').dataset.frame)>8);
  const middle=await page.locator('[data-admiral-sequence]').getAttribute('data-frame');
  await page.waitForTimeout(250);
  assert.ok(Number(await page.locator('[data-admiral-sequence]').getAttribute('data-frame'))>Number(middle),'Continues without another scroll');
  await waitState(page,'arrival');
  assert.equal(await page.locator('[data-admiral-sequence]').getAttribute('data-frame'),String(lastFrame));
  assert.equal(await page.evaluate(()=>scrollY),0);
  assert.equal(await page.locator('#cta').evaluate(e=>e.inert),false);
  assert.equal(await page.locator('#building').evaluate(e=>getComputedStyle(e).opacity),'1');
  assert.equal(await page.locator('#intro').evaluate(e=>getComputedStyle(e).opacity),'0');
  assert.equal(await page.locator('canvas').evaluate(e=>e.style.opacity),'1');
  const samples=await page.evaluate(()=>window.samples);
  assert.ok(Math.max(...samples.map(s=>s.decoded||0))<=14,'Bounded decoded cache');
  await page.screenshot({path:fileURLToPath(new URL('arrival.png',out))});
  await page.waitForTimeout(180);await page.mouse.wheel(0,450);await page.waitForTimeout(150);
  assert.ok(await page.evaluate(()=>scrollY)>100,'New scroll moves down page');
  await page.mouse.wheel(0,-1200);await page.waitForTimeout(150);
  assert.equal(await page.evaluate(()=>scrollY),0);
  await page.mouse.wheel(0,-100);await waitState(page,'moving');await waitState(page,'opening');
  assert.equal(await page.locator('[data-admiral-sequence]').getAttribute('data-frame'),'0');
  assert.equal(await page.locator('#cta').evaluate(e=>e.inert),true);
  assert.equal(await page.locator('#intro').evaluate(e=>getComputedStyle(e).opacity),'1');
  await writeFile(new URL('forward-reverse.json',out),JSON.stringify(samples,null,2));await f.close();
 });
 await pass('reverse during flight and speed boost',async()=>{
  const f=await fixture(),{page}=f;
  await page.waitForTimeout(300);await page.mouse.wheel(0,80);
  await page.waitForFunction(()=>Number(document.querySelector('[data-admiral-sequence]').dataset.frame)>15);
  await page.mouse.wheel(0,-100);await waitState(page,'opening');
  const start=Date.now();await page.mouse.wheel(0,100);await waitState(page,'arrival');const baseline=Date.now()-start;
  await page.waitForTimeout(180);await page.mouse.wheel(0,-100);await waitState(page,'opening');
  await page.waitForTimeout(180);const fastStart=Date.now();await page.mouse.wheel(0,100);
  await page.waitForFunction(()=>Number(document.querySelector('[data-admiral-sequence]').dataset.frame)>1);
  for(let i=0;i<15;i++){await page.waitForTimeout(50);await page.mouse.wheel(0,180);}
  await waitState(page,'arrival');const boosted=Date.now()-fastStart;
  assert.ok(boosted<baseline*.92,`Boost ${boosted}ms should beat baseline ${baseline}ms`);
  results.push({baselineMs:baseline,boostedMs:boosted});await f.close();
 });
 await pass('endpoint dissolves blend pixels for the full duration before releasing the CTA',async()=>{
  const f=await fixture({solidFrames:true,props:{duration:.6}}),{page}=f;
  await page.waitForTimeout(250);await page.mouse.wheel(0,100);
  await page.waitForFunction(()=>{const e=document.querySelector('[data-admiral-sequence]');return e.dataset.crossfade==='opening'&&Number(e.dataset.crossfadeMix)>.25;});
  const pixel=await page.locator('[data-admiral-sequence]').evaluate(e=>({mix:Number(e.dataset.crossfadeMix),rgba:[...e.querySelector('canvas').getContext('2d').getImageData(10,10,1,1).data]}));
  assert.ok(pixel.mix>.25&&pixel.mix<.9);
  assert.ok(Math.abs(pixel.rgba[0]-255*(1-pixel.mix))<=2&&pixel.rgba[1]===0&&Math.abs(pixel.rgba[2]-255*pixel.mix)<=2&&pixel.rgba[3]===255,'Dissolve must blend two opaque frames without a black dip');
  await page.mouse.wheel(0,2000);await waitState(page,'arrival');
  const forward=await page.evaluate(()=>window.samples);
  await page.waitForTimeout(180);await page.evaluate(()=>window.samples=[]);
  await page.mouse.wheel(0,-100);await waitState(page,'moving');await waitState(page,'opening');
  const reverse=await page.evaluate(()=>window.samples);
  for(const [name,samples] of [['forward',forward],['reverse',reverse]])for(const edge of ['opening','arrival']){
   const fade=samples.filter(s=>s.edge===edge);assert.ok(fade.length>15,`${name} ${edge} has visible intermediate blends`);
   const ms=fade.at(-1).time-fade[0].time;
   // The optional hosted release is frozen at its previous half-second setting.
   const expectedMs=remoteMode?500:edge==='opening'?1000:330;
   assert.ok(ms>=expectedMs-100&&ms<=expectedMs+150,`${name} ${edge} took ${ms}ms despite scroll acceleration`);
   assert.ok(fade.every(s=>s.held==='true'&&s.ctaInert),`${name} ${edge} keeps the page held and CTA inert`);
  }
  assert.equal(await page.locator('[data-admiral-sequence]').getAttribute('data-frame'),'0');await f.close();
 });
 await pass('endpoint dissolve can reverse and pause without snapping on resize',async()=>{
  const f=await fixture({props:{duration:.6}}),{page}=f;
  await page.mouse.wheel(0,100);
  await page.waitForFunction(()=>{const e=document.querySelector('[data-admiral-sequence]');return e.dataset.crossfade==='opening'&&Number(e.dataset.crossfadeMix)>.3;});
  await page.mouse.wheel(0,-100);await waitState(page,'opening');
  assert.equal(await page.locator('[data-admiral-sequence]').getAttribute('data-frame'),'0');
  await page.mouse.wheel(0,100);
  await page.waitForFunction(()=>{const e=document.querySelector('[data-admiral-sequence]');return e.dataset.crossfade==='arrival'&&Number(e.dataset.crossfadeMix)>.2;});
  await page.keyboard.press('Escape');await waitState(page,'paused');
  const before=Number(await page.locator('[data-admiral-sequence]').getAttribute('data-crossfade-mix'));
  await page.setViewportSize({width:1100,height:750});await page.waitForTimeout(120);
  assert.equal(Number(await page.locator('[data-admiral-sequence]').getAttribute('data-crossfade-mix')),before);
  await page.getByRole('button',{name:'Continue animation',exact:true}).click();await waitState(page,'arrival');
  assert.equal(await page.locator('#cta').evaluate(e=>e.inert),false);await f.close();
 });
 await pass('Escape releases navigation and nested scroll is respected',async()=>{
  const f=await fixture(),{page}=f;
  await page.mouse.move(1150,50);await page.mouse.wheel(0,70);await page.waitForTimeout(150);
  assert.equal(await state(page),'opening');assert.ok(await page.locator('#nested').evaluate(e=>e.scrollTop)>0);
  await page.mouse.move(400,550);await page.keyboard.press('PageDown');await waitState(page,'moving');
  await page.keyboard.press('Escape');await waitState(page,'paused');
  await page.mouse.wheel(0,350);await page.waitForTimeout(150);
  assert.ok(await page.evaluate(()=>scrollY)>100,'Escape must not immediately re-arm the hold');await f.close();
 });
 await pass('reduced motion uses endpoints only and never holds scrolling',async()=>{
  const f=await fixture({context:{reducedMotion:'reduce'}}),{page}=f;
  await page.waitForFunction(last=>Number(document.querySelector('[data-admiral-sequence]').dataset.frame)===last,lastFrame);
  assert.equal(await state(page),'reduced');assert.equal(await page.locator('#cta').evaluate(e=>e.inert),false);
  await page.waitForTimeout(250);assert.deepEqual([...new Set(f.requests)].sort((a,b)=>a-b),[0,lastFrame]);
  await page.mouse.wheel(0,350);await page.waitForTimeout(150);assert.ok(await page.evaluate(()=>scrollY)>100);await f.close();
 });
 await pass('failed frame preserves a visible image and releases the page',async()=>{
  const f=await fixture({failFrame:1,props:{preload:false}}),{page}=f;
  await page.mouse.wheel(0,90);await waitState(page,'error');
  assert.equal(await page.locator('[data-admiral-sequence]').getAttribute('data-scroll-held'),'false');
  assert.ok(await page.locator('[data-admiral-sequence]').evaluate(e=>e.querySelector('canvas').style.opacity==='1'||(e.querySelector('img').naturalWidth>0&&e.querySelector('img').style.opacity!=='0')));
  await page.mouse.wheel(0,350);await page.waitForTimeout(150);assert.ok(await page.evaluate(()=>scrollY)>100);await f.close();
 });
 await pass('late final frame keeps CTA hidden until the actual arrival image',async()=>{
  const f=await fixture({delayLast:2500,props:{duration:.6,preload:false}}),{page}=f;
  await page.mouse.wheel(0,100);await page.waitForTimeout(1500);
  assert.notEqual(await state(page),'arrival');
  assert.equal(await page.locator('#cta').evaluate(e=>e.inert),true);
  assert.equal(await page.locator('[data-admiral-sequence]').getAttribute('data-scroll-held'),'true');
  await waitState(page,'arrival');assert.equal(await page.locator('#cta').evaluate(e=>e.inert),false);await f.close();
 });
 await pass('touch input and mobile decoded cache',async()=>{
  const f=await fixture({context:{viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:3}}),{page}=f;
  const cdp=await page.context().newCDPSession(page);
  await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:180,y:650}]});
  await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:180,y:580}]});
  await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
  await waitState(page,'arrival');
  const dimensions=await page.locator('canvas').evaluate(e=>({width:e.width,height:e.height}));
  assert.ok(dimensions.height<=674,'Phone decode is reduced to 1280 wide');
  assert.ok(await page.evaluate(()=>Math.max(...window.samples.map(s=>s.decoded||0)))<=10);
  await page.screenshot({path:fileURLToPath(new URL('mobile-arrival.png',out))});await f.close();
 });
 await pass('Skip and unmount release all scroll handlers',async()=>{
  const f=await fixture({delayLast:1200,props:{preload:false}}),{page}=f;
  await page.mouse.wheel(0,100);await waitState(page,'moving');
  await page.getByRole('button',{name:'Skip animation',exact:true}).click();
  assert.equal(await page.locator('[data-admiral-sequence]').getAttribute('data-scroll-held'),'false');
  await page.evaluate(()=>window.root.unmount());await page.mouse.wheel(0,400);await page.waitForTimeout(150);
  assert.ok(await page.evaluate(()=>scrollY)>0);await f.close();
 });
 if(!remoteMode)await pass('canvas arrival image is static and does not load a full sequence',async()=>{
  const f=await fixture({staticMode:true,props:{editorView:'arrival'}}),{page}=f;
  assert.equal(await page.locator('#cta').evaluate(e=>getComputedStyle(e).opacity),'1');
  assert.equal(await page.locator('#intro').evaluate(e=>getComputedStyle(e).opacity),'0');
  assert.deepEqual([...new Set(f.requests)],[lastFrame]);await f.close();
 });
 await pass('native CTA links and click handlers are preserved',async()=>{
  const f=await fixture({props:{duration:.6}}),{page}=f;
  await page.mouse.wheel(0,100);await waitState(page,'arrival');
  await page.locator('#cta a').click();await page.waitForTimeout(150);
  assert.equal(await page.evaluate(()=>window.ctaClicked),true);
  assert.equal(await page.evaluate(()=>location.hash),'#after');
  assert.ok(await page.evaluate(()=>scrollY)>0);await f.close();
 });
 if(remoteMode){
  await pass('remote loader shares one verified runtime across the hero and all overlays',async()=>{
   const f=await fixture();
   assert.equal(f.remoteRequests.filter(p=>p==='hero-manifest.json').length,1);
   assert.equal(f.remoteRequests.filter(p=>p.endsWith('.js')).length,1);
   assert.equal(await f.page.locator('[data-admiral-loader]').getAttribute('data-runtime-version'),release.version);await f.close();
  });
  await pass('remote update runs on a new visit without changing the pasted bridge',async()=>{
   const first=await fixture();assert.equal(await first.page.evaluate(()=>window.__runtimeUpdateProof),undefined);await first.close();
   const second=await fixture({updatedRelease:true});
   assert.equal(await second.page.evaluate(()=>window.__runtimeUpdateProof),true);
   assert.equal(await second.page.locator('[data-admiral-loader]').getAttribute('data-runtime-version'),'1111111111111111');await second.close();
  });
  await pass('remote manifest failure and failed integrity both use the installed fallback release',async()=>{
   for(const options of [{manifestFailure:true},{updatedRelease:true,badIntegrity:true}]){
    const f=await fixture(options);
    assert.equal(await f.page.locator('[data-admiral-loader]').getAttribute('data-runtime-version'),release.version);
    assert.equal(await f.page.evaluate(()=>window.__runtimeUpdateProof),undefined);await f.close();
   }
  });
  await pass('remote outage leaves the poster visible and page freely scrollable',async()=>{
   const f=await fixture({runtimeUnavailable:true}),{page}=f;
   assert.equal(await page.locator('[data-admiral-sequence]').count(),0);
   assert.ok(await page.locator('img').evaluate(e=>e.naturalWidth>0));
   assert.equal(await page.locator('#intro').evaluate(e=>getComputedStyle(e).opacity),'1');
   assert.equal(await page.locator('#cta').evaluate(e=>getComputedStyle(e).visibility),'hidden');
   await page.mouse.wheel(0,350);await page.waitForTimeout(150);assert.ok(await page.evaluate(()=>scrollY)>100);await f.close();
  });
  await pass('remote editor canvas uses the arrival poster without running hosted scripts',async()=>{
   const f=await fixture({staticMode:true,props:{editorView:'arrival'}});
   assert.deepEqual(f.remoteRequests,[]);assert.deepEqual([...new Set(f.requests)],[64]);await f.close();
  });
  await pass('remote image-host outage falls back to the original GitHub poster',async()=>{
   const f=await fixture({runtimeUnavailable:true,pagesImagesDown:true,props:{useGitHubAssets:true}});
   assert.match(await f.page.locator('img').getAttribute('src'),/^https:\/\/raw\.githubusercontent.com\//);
   assert.ok(await f.page.locator('img').evaluate(e=>e.naturalWidth>0));await f.close();
  });
 }
 if(process.env.SEQUENCE_PUBLIC==='1')await pass('public GitHub sequence loads and reaches the final frame',async()=>{
  const f=await fixture({props:{useGitHubAssets:true}}),{page}=f;
  assert.match(await page.locator('[data-admiral-sequence] img').getAttribute('src'),/^https:\/\/(raw\.githubusercontent.com\/UnbuiltMarket\/admiral-park\/|unbuiltmarket.github.io\/admiral-park\/assets\/)/);
  const failures=[];page.on('response',r=>{if((r.url().includes('raw.githubusercontent.com')||r.url().includes('unbuiltmarket.github.io'))&&r.status()>=400)failures.push(r.status());});
  await page.waitForTimeout(1500);await page.mouse.wheel(0,100);
  await waitState(page,'arrival',30000);
  assert.equal(await page.locator('[data-admiral-sequence]').getAttribute('data-frame'),String(lastFrame));
  assert.equal(await page.locator('#cta').evaluate(e=>e.inert),false);assert.deepEqual(failures,[]);
  await f.close();
 });
 await writeFile(new URL((remoteMode?'remote-':'')+(process.env.SEQUENCE_PUBLIC==='1'?'public-results.json':'results.json'),out),JSON.stringify(results,null,2));
}finally{await browser.close();}
