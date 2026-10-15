import {createRequire} from "node:module";
import {readFile,writeFile,open} from "node:fs/promises";
import {fileURLToPath} from "node:url";
const require=createRequire(import.meta.url);
const {chromium}=require(process.env.PLAYWRIGHT_MODULE_PATH||"playwright");
const root=new URL("../",import.meta.url);
const data=JSON.parse(await readFile(new URL("data/hero.json",root),"utf8"));
const atoms=[];
for(const variant of data.variants){
 const file=await open(new URL(variant.path,root),"r");const boxes=[];let offset=0;
 try{while(offset<variant.bytes){
  const bytes=Buffer.alloc(16);await file.read(bytes,0,16,offset);let size=bytes.readUInt32BE(0);const type=bytes.toString("ascii",4,8);
  if(size===1)size=Number(bytes.readBigUInt64BE(8));if(!size)size=variant.bytes-offset;
  boxes.push({type,offset,size});offset+=size;
 }}finally{await file.close();}
 atoms.push({variant:variant.id,fastStart:boxes.find(b=>b.type==="moov")?.offset<boxes.find(b=>b.type==="mdat")?.offset,boxes});
}
const browser=await chromium.launch({headless:true,channel:process.env.PLAYWRIGHT_CHANNEL||"chrome"});
try{
 const context=await browser.newContext({viewport:{width:1440,height:900}});
 const page=await context.newPage();
 const cdp=await context.newCDPSession(page);
 await cdp.send("Network.enable");
 await cdp.send("Network.setCacheDisabled",{cacheDisabled:true});
 await cdp.send("Network.emulateNetworkConditions",{offline:false,latency:120,downloadThroughput:4000000/8,uploadThroughput:1000000/8});
 await page.goto("http://127.0.0.1:4173");
 await page.waitForFunction(()=>!!window.heroReview);
 await page.locator("#first-frame").evaluate(img=>img.decode());
 await page.waitForTimeout(2000);
 await page.mouse.wheel(0,100);
 await page.waitForFunction(()=>document.querySelector("#hero").dataset.state==="ended",null,{timeout:30000});
 const results={network:"Simulated 4 Mbps down, 1 Mbps up, 120 ms latency; empty browser cache; scroll 2 s after poster ready",metrics:await page.evaluate(()=>window.heroReview.getMetrics()),atoms};
 console.log(JSON.stringify(results,null,2));
 await writeFile(new URL("tmp/network-results.json",root),JSON.stringify(results,null,2));
 await page.locator("#review-fab").click();
 await page.screenshot({path:fileURLToPath(new URL("tmp/hero-review-panel.png",root))});
 await context.close();
 const mobile=await browser.newContext({viewport:{width:390,height:844},deviceScaleFactor:1,isMobile:true,hasTouch:true});
 const mp=await mobile.newPage();await mp.goto("http://127.0.0.1:4173");
 await mp.locator("#first-frame").evaluate(img=>img.decode());
 const a=await mp.locator("#film-toggle").boundingBox(),b=await mp.locator("#review-fab").boundingBox();
 if(a.x < b.x+b.width && a.x+a.width > b.x && a.y < b.y+b.height && a.y+a.height > b.y)throw new Error("Review overlaps mobile playback");
 await mp.screenshot({path:fileURLToPath(new URL("tmp/hero-mobile-final.png",root))});
 await mobile.close();
}finally{await browser.close();}
