import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import path from "node:path";
import {createRequire} from "node:module";
import {ts,requireDev} from "../scripts/tooling.mjs";
const require=createRequire(import.meta.url);
const {chromium}=require(process.env.PLAYWRIGHT_MODULE_PATH||"playwright");
const source=await readFile(new URL("../src/framer/AdmiralHeroVideo.tsx",import.meta.url),"utf8");
const compiled=ts.transpileModule(source,{compilerOptions:{target:ts.ScriptTarget.ES2020,module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.React}}).outputText;
const react=await readFile(path.join(path.dirname(requireDev.resolve("react/package.json")),"umd/react.development.js"),"utf8");
const dom=await readFile(path.join(path.dirname(requireDev.resolve("react-dom/package.json")),"umd/react-dom.development.js"),"utf8");
const browser=await chromium.launch({headless:true,channel:process.env.PLAYWRIGHT_CHANNEL||"chrome"});
const context=await browser.newContext({viewport:{width:1200,height:800}});
const page=await context.newPage();
const errors=[];page.on("pageerror",e=>errors.push(e.message));
await page.route("http://hero.test/**",async route=>{
 const url=new URL(route.request().url());
 const paths={"/first.webp":"assets/images/hero-start.webp","/last.webp":"assets/images/hero-end.webp",
 "/hero.mp4":"assets/videos/admiral-park-hero-1920-quality VBR 6.mp4","/hero2.mp4":"assets/videos/admiral-park-hero-1920-quality VBR 6.mp4"};
 if(paths[url.pathname])return route.fulfill({status:200,contentType:url.pathname.endsWith(".mp4")?"video/mp4":"image/webp",
  body:await readFile(new URL("../"+paths[url.pathname],import.meta.url))});
 await route.fulfill({contentType:"text/html",body:'<html><body style="margin:0;height:200vh"><div id="mount" style="height:100vh;position:sticky;top:0"></div></body></html>'});
});
try{
 await page.goto("http://hero.test/");
 await page.addScriptTag({content:react});await page.addScriptTag({content:dom});
 await page.evaluate(code=>{
  const module={exports:{}};
  const framer={useIsStaticRenderer:()=>false,ControlType:new Proxy({},{get:(_,name)=>name}),
   addPropertyControls:(component,controls)=>{window.registeredComponent=component;window.propertyControls=controls;}};
  new Function("module","exports","require",code)(module,module.exports,name=>name==="react"?React:framer);
  window.Hero=module.exports.default;
  window.root=ReactDOM.createRoot(document.getElementById("mount"));
  window.props={videoUrl:"http://hero.test/hero.mp4",startFrame:{src:"http://hero.test/first.webp"},
   endFrame:{src:"http://hero.test/last.webp"},showControls:true,preloadVideo:false,muted:true,loop:false};
  window.renderHero=()=>window.root.render(React.createElement(React.StrictMode,null,React.createElement(window.Hero,window.props)));
  window.renderHero();
 },compiled);
 await page.waitForFunction(()=>document.querySelector(".admiral-hero-video")?.dataset.state==="idle");
 assert.equal(await page.evaluate(()=>window.registeredComponent===window.Hero),true);
 await page.mouse.wheel(0,100);
 await page.waitForFunction(()=>document.querySelector(".admiral-hero-video").dataset.state==="playing");
 await page.waitForTimeout(600);
 const before=await page.locator("video").evaluate(v=>v.currentTime);
 assert.ok(before>.3);
 await page.evaluate(()=>{window.props={...window.props,startFrame:{src:"http://hero.test/first.webp"},endFrame:{src:"http://hero.test/last.webp"},buttonTextColor:"#ffcc00"};window.renderHero();});
 await page.waitForTimeout(500);
 assert.ok(await page.locator("video").evaluate(v=>v.currentTime)>before+.2,"Fresh image objects and styling must not restart playback");
 await page.waitForFunction(()=>document.querySelector(".admiral-hero-video").dataset.state==="ended",{},{timeout:10000});
 assert.equal(await page.locator(".admiral-hero-video").getAttribute("data-end-visible"),"true");
 console.log("PASS React 18 Strict Mode: scroll, continuous playback, stable image props, final still");
 await page.evaluate(()=>{window.props={...window.props,autoplay:false};window.renderHero();});
 await page.waitForFunction(()=>document.querySelector(".admiral-hero-video").dataset.state==="idle");
 await page.mouse.wheel(0,60);await page.waitForTimeout(200);
 assert.equal(await page.locator(".admiral-hero-video").getAttribute("data-state"),"idle");
 await page.getByRole("button",{name:"Play hero video",exact:true}).click();
 await page.waitForFunction(()=>document.querySelector(".admiral-hero-video").dataset.state==="playing");
 console.log("PASS Scroll autoplay switch and manual play");
 await page.evaluate(()=>{window.props={...window.props,loop:true,muted:false};window.renderHero();});
 await page.waitForFunction(()=>{const v=document.querySelector("video");return v.loop&&!v.muted;});
 await page.evaluate(()=>{window.props={...window.props,videoUrl:"http://hero.test/hero2.mp4"};window.renderHero();});
 await page.waitForFunction(()=>document.querySelector(".admiral-hero-video").dataset.state==="idle");
 assert.equal(await page.locator("video").evaluate(v=>v.loop&&!v.muted),true);
 console.log("PASS Loop and mute settings survive a source replacement");
 assert.deepEqual(errors,[]);
}finally{await context.close();await browser.close();}
