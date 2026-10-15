import assert from "node:assert/strict";
import {fileURLToPath} from "node:url";
import {createRequire} from "node:module";
import {mkdir,writeFile} from "node:fs/promises";
const require=createRequire(import.meta.url);
const {chromium}=require(process.env.PLAYWRIGHT_MODULE_PATH || "playwright");
const base=process.env.HERO_PREVIEW_URL || "http://127.0.0.1:4173";
const output=new URL("../tmp/",import.meta.url);
await mkdir(output,{recursive:true});
const browser=await chromium.launch({headless:true,...(process.env.PLAYWRIGHT_CHANNEL?{channel:process.env.PLAYWRIGHT_CHANNEL}:{})});
const results=[];
const errors=[];
async function pageFor(options={}) {
  const context=await browser.newContext({viewport:{width:1440,height:900},...options});
  const page=await context.newPage();
  page.on("pageerror",error=>errors.push(error.message));
  return {context,page};
}
async function ready(page,path="") {
  await page.goto(base+"/"+path);
  await page.waitForFunction(()=>!!window.heroReview);
  await page.locator("#first-frame").evaluate(img=>img.decode());
}
async function state(page,value) {
  await page.waitForFunction(value=>document.querySelector("#hero").dataset.state===value,value,{timeout:12000});
}
async function check(name,fn) {
  await fn(); results.push({name,result:"pass"}); console.log("PASS "+name);
}
try {
  await check("Opening still, scroll-triggered continuous playback, final still, explicit replay",async()=>{
    const {context,page}=await pageFor();
    await ready(page);
    await page.waitForTimeout(900);
    assert.equal(await page.locator("#hero").getAttribute("data-state"),"idle");
    assert.equal(await page.locator("#hero-video").evaluate(v=>v.paused && v.currentTime===0),true);
    assert.equal(await page.locator("#hero").getAttribute("data-video-visible"),"false");
    await page.screenshot({path:fileURLToPath(new URL("hero-desktop-start.png",output))});
    await page.mouse.wheel(0,8);
    await page.waitForTimeout(150);
    assert.equal(await page.locator("#hero").getAttribute("data-state"),"idle");
    await page.mouse.wheel(0,100);
    await state(page,"playing");
    await page.waitForFunction(()=>document.querySelector("#hero").dataset.videoVisible==="true");
    const before=await page.locator("#hero-video").evaluate(v=>v.currentTime);
    await page.waitForTimeout(700);
    assert.ok(await page.locator("#hero-video").evaluate(v=>v.currentTime)>before+.3,"video continues after scroll stops");
    await state(page,"ended");
    assert.equal(await page.locator("#hero").getAttribute("data-end-visible"),"true");
    await page.waitForTimeout(250);
    await page.screenshot({path:fileURLToPath(new URL("hero-desktop-end.png",output))});
    const metrics=await page.evaluate(()=>window.heroReview.getMetrics());
    results.push({name:"Local desktop playback metrics",...metrics});
    await page.mouse.wheel(0,-100);
    await page.waitForTimeout(250);
    assert.equal(await page.locator("#hero").getAttribute("data-state"),"ended");
    await page.locator("#film-toggle").click();
    await state(page,"playing");
    await page.locator("#film-toggle").click();
    await state(page,"paused");
    const paused=await page.locator("#hero-video").evaluate(v=>v.currentTime);
    await page.waitForTimeout(250);
    assert.equal(await page.locator("#hero-video").evaluate(v=>v.currentTime),paused);
    await page.locator("#film-toggle").click();
    await state(page,"playing");
    await context.close();
  });
  await check("Export switching, darkening, keyboard scroll, no horizontal overflow",async()=>{
    const {context,page}=await pageFor();
    await ready(page,"?review=1");
    await page.selectOption("#quality","vbr8");
    assert.equal(await page.evaluate(()=>window.heroReview.getVariant()),"vbr8");
    assert.equal(await page.locator("#hero").getAttribute("data-state"),"idle");
    await page.locator("#shade").fill("55");
    assert.equal(await page.locator("#shade-value").textContent(),"55%");
    await page.locator("#review-close").click();
    await page.locator("body").click({position:{x:1100,y:400}});
    await page.keyboard.press("PageDown");
    await state(page,"playing");
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
    await context.close();
  });
  await check("Phone layout and continuous playback",async()=>{
    const {context,page}=await pageFor({viewport:{width:390,height:844},deviceScaleFactor:3,isMobile:true,hasTouch:true});
    await ready(page);
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
    await page.screenshot({path:fileURLToPath(new URL("hero-mobile-start.png",output))});
    await page.evaluate(()=>window.scrollTo(0,90));
    await state(page,"playing");
    await state(page,"ended");
    await page.waitForTimeout(250);
    await page.screenshot({path:fileURLToPath(new URL("hero-mobile-end.png",output))});
    results.push({name:"Emulated mobile playback metrics",...await page.evaluate(()=>window.heroReview.getMetrics())});
    await context.close();
  });
  await check("Reduced motion: no speculative video request or scroll autoplay, manual playback works",async()=>{
    const {context,page}=await pageFor({reducedMotion:"reduce"});
    let videoRequests=0;
    page.on("request",req=>{if(req.url().includes(".mp4"))videoRequests++;});
    await ready(page);
    await page.waitForTimeout(900);
    await page.mouse.wheel(0,100);
    await page.waitForTimeout(250);
    assert.equal(videoRequests,0);
    assert.equal(await page.locator("#hero").getAttribute("data-state"),"idle");
    await page.locator("#film-toggle").click();
    await state(page,"playing");
    assert.ok(videoRequests>0);
    await context.close();
  });
  await check("Slow video delivery retains opening still until the first video frame",async()=>{
    const {context,page}=await pageFor();
    await page.route("**/*.mp4",async route=>{await new Promise(resolve=>setTimeout(resolve,1600));await route.continue().catch(()=>{});});
    await ready(page);
    await page.mouse.wheel(0,100);
    await state(page,"loading");
    await page.waitForTimeout(300);
    assert.equal(await page.locator("#hero").getAttribute("data-video-visible"),"false");
    assert.equal(await page.locator("#first-frame").evaluate(img=>img.complete&&img.naturalWidth>0),true);
    await state(page,"playing");
    await page.waitForFunction(()=>document.querySelector("#hero").dataset.videoVisible==="true");
    await context.close();
  });
  await check("Browser autoplay rejection has a working manual fallback",async()=>{
    const {context,page}=await pageFor();
    await page.addInitScript(()=>{
      const original=HTMLMediaElement.prototype.play;
      let rejected=false;
      HTMLMediaElement.prototype.play=function(){
        if(!rejected){rejected=true;return Promise.reject(new DOMException("Test rejection","NotAllowedError"));}
        return original.apply(this,arguments);
      };
    });
    await ready(page);
    await page.mouse.wheel(0,100);
    await state(page,"blocked");
    assert.equal(await page.locator("#hero").getAttribute("data-video-visible"),"false");
    await page.locator("#film-toggle").click();
    await state(page,"playing");
    await context.close();
  });
  await check("Offscreen playback pauses and resumes on return",async()=>{
    const {context,page}=await pageFor();
    await ready(page);
    await page.mouse.wheel(0,100);
    await state(page,"playing");
    await page.evaluate(()=>{const spacer=document.createElement("div");spacer.style.height="150vh";document.body.append(spacer);scrollTo(0,2200);});
    await state(page,"paused");
    assert.equal(await page.locator("#hero-video").evaluate(v=>v.paused),true);
    await page.evaluate(()=>scrollTo(0,0));
    await state(page,"playing");
    await context.close();
  });
  await check("Failed video preserves opening still",async()=>{
    const {context,page}=await pageFor();
    await page.route("**/*.mp4",route=>route.fulfill({status:404,body:"Missing test video"}));
    await ready(page);
    await page.mouse.wheel(0,100);
    await state(page,"error");
    assert.equal(await page.locator("#hero").getAttribute("data-video-visible"),"false");
    assert.equal(await page.locator("#first-frame").evaluate(img=>img.complete&&img.naturalWidth>0),true);
    await context.close();
  });
  await check("Failed final still leaves the video's final frame",async()=>{
    const {context,page}=await pageFor();
    await page.route("**/END%20frame_web_V02.webp",route=>route.fulfill({status:404,body:"Missing test still"}));
    await ready(page);
    await page.mouse.wheel(0,100);
    await state(page,"ended");
    assert.equal(await page.locator("#hero").getAttribute("data-video-visible"),"true");
    assert.equal(await page.locator("#hero").getAttribute("data-end-visible"),"false");
    await context.close();
  });
  assert.deepEqual(errors,[],"No uncaught browser exceptions");
  await writeFile(new URL("browser-results.json",output),JSON.stringify(results,null,2));
  console.log("All browser checks passed. Screenshots and metrics are in tmp/.");
} finally { await browser.close(); }
