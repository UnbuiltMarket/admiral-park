import assert from 'node:assert/strict';
import {readFile,mkdir,writeFile} from 'node:fs/promises';
import {createRequire} from 'node:module';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const root=new URL('../',import.meta.url),out=new URL('tmp/priority-card-check/',root),read=name=>readFile(new URL(name,root),'utf8');
const require=createRequire(import.meta.url),{chromium}=require(process.env.PLAYWRIGHT_MODULE_PATH||'playwright');
const data=JSON.parse(await read('data/apartment-details.json'));
const runtime=await read('src/shared/apartment-card/card-runtime.js'),css=await read('src/shared/apartment-card/card.css'),shell=await read('src/shared/apartment-card/card-shell.html');
const listRuntime=(await read('src/shared/ui/frosted-button.js')).replace(/^export /gm,'')+'\n'+(await read('src/shared/apartment-list/app.js')).replace('export function mountApartmentList','function mountApartmentList');
await mkdir(out,{recursive:true});
const browser=await chromium.launch({headless:true,channel:process.env.PLAYWRIGHT_CHANNEL||'chrome'}),results=[];
try{
 const context=await browser.newContext({viewport:{width:1440,height:1000}}),page=await context.newPage(),errors=[],requests=[];
 let failPlan=true,failFloor=true;
 page.on('pageerror',error=>errors.push(error.message));
 await page.route('http://priority-card.test/**',async route=>{
  const url=new URL(route.request().url()),name=decodeURIComponent(url.pathname);requests.push({path:name,query:url.search});
  if(name==='/apartments.json')return route.fulfill({contentType:'application/json',json:data});
  if(name.startsWith('/assets/')){
   if(name.endsWith('/original.png')&&failPlan)return route.fulfill({status:503,body:'intentional plan outage'});
   if(name.startsWith('/assets/floor-layouts/')&&failFloor)return route.fulfill({status:503,body:'intentional floor outage'});
   assert.ok(!name.split('/').includes('..'));
   const file=new URL('assets/apartment-list/'+name.slice(8),root);
   return route.fulfill({contentType:{'.png':'image/png','.webp':'image/webp','.svg':'image/svg+xml','.woff2':'font/woff2'}[path.extname(name)]||'application/octet-stream',body:await readFile(file)});
  }
  return route.fulfill({contentType:'text/html',body:'<!doctype html><meta name="viewport" content="width=device-width,initial-scale=1"><style>body{margin:0}</style><div id="card"></div><div id="list"></div>'});
 });
 await page.goto('http://priority-card.test/');
 await page.addScriptTag({content:'function createAdmiralApartmentPdf(snapshot){window.pdfSnapshot=snapshot;return Promise.resolve(new Blob(["test-pdf"],{type:"application/pdf"}));}\n'+runtime});
 const reserved=structuredClone(data);reserved.apartments[0].status='reserved';reserved.apartments[0].statusLabel=null;
 await page.evaluate(({data,css,shell})=>{
  const shadow=document.querySelector('#card').attachShadow({mode:'open'});shadow.innerHTML='<style>'+css+'</style>'+shell;
  window.live=null;window.states=[];window.card=mountOrbitApartmentCardRuntime(shadow,{dataset:data,getLiveDataset:()=>window.live,assetBaseUrl:'http://priority-card.test/assets/',onState:s=>window.states.push(s)});
 },{data:reserved,css,shell});
 await page.waitForFunction(()=>window.states.includes('ready'));
 await page.evaluate(()=>window.card.open('A001'));
 const card=page.locator('#card'),plan=card.locator('img[data-detail-image="plan"]');
 await card.locator('[data-detail-image-feedback="plan"]:visible').waitFor();
 assert.equal(await card.locator('.status-reserved').textContent(),'Egyeztetés alatt');
 assert.equal(await card.locator('img[data-detail-image="floor"]').getAttribute('src'),null,'The hidden full floor image has no source');
 assert.ok(!requests.some(r=>r.path.startsWith('/assets/floor-layouts/')),'Opening a card must not download the hidden floor layout');
 assert.equal(await plan.evaluate(i=>i.naturalWidth),0);
 results.push('Reserved card opens successfully and hidden floor layout has no request');
 failPlan=false;
 await card.locator('[data-detail-image-retry="plan"]').click();
 await page.waitForFunction(()=>document.querySelector('#card').shadowRoot.querySelector('img[data-detail-image="plan"]')?.naturalWidth>0);
 await card.locator('[data-detail-image-feedback="plan"]').waitFor({state:'hidden'});
 assert.ok(requests.some(r=>r.path.endsWith('/original.png')&&r.query.includes('admiral-retry=')),'Retry bypasses only the failed drawing cache entry');
 results.push('Failed main floorplan retries successfully without closing the card');
 await card.locator('[data-document-view="floor"]').click();
 await card.locator('[data-detail-image-feedback="floor"]:visible').waitFor();
 assert.ok(requests.some(r=>r.path.startsWith('/assets/floor-layouts/')),'Selecting Szintrajz starts its source');
 failFloor=false;
 await card.locator('[data-detail-image-retry="floor"]').click();
 await page.waitForFunction(()=>document.querySelector('#card').shadowRoot.querySelector('img[data-detail-image="floor"]')?.naturalWidth>0);
 await card.locator('[data-detail-image-feedback="floor"]').waitFor({state:'hidden'});
 results.push('Floor-layout tab loads only on demand and has isolated retry');
 const facts=await page.evaluate(()=>{
  const r=document.querySelector('#card').shadowRoot,original=r.querySelector('.detail-plan-image'),marker=r.querySelector('.room-marker'),floor=r.querySelector('[data-document-view="floor"]');floor.focus();
  window.live={apartments:[{id:'A001',status:'sold',statusLabel:'Eladva',price:123000000,areaInterior:88.25,areaTerrace:12,areaGarden:0,rooms:4,building:'A',floor:0,floorLabel:'Földszint',orientation:'D',apartmentType:'EVIL',roomList:[{name:'EVIL'}],media:{floorplan:{original:'http://evil.invalid/image.png'}}}]};
  const changed=window.card.refreshFacts(),sameAgain=window.card.refreshFacts();
  return {changed,sameAgain,price:r.querySelector('.detail-price p').textContent,status:r.querySelector('.detail-status').textContent,metrics:r.querySelector('.detail-area-row').textContent,hasSameImage:original===r.querySelector('.detail-plan-image'),hasSameMarker:marker===r.querySelector('.room-marker'),floorSelected:floor.getAttribute('aria-selected'),focusPreserved:r.activeElement===floor,image:r.querySelector('.detail-plan-image').src,html:r.querySelector('.detail-room-panel').textContent};
 });
 assert.equal(facts.changed,true);assert.equal(facts.sameAgain,false);assert.match(facts.price,/123/);assert.equal(facts.status,'Eladva');assert.match(facts.metrics,/88,25/);
 assert.equal(facts.hasSameImage,true);assert.equal(facts.hasSameMarker,true);assert.equal(facts.floorSelected,'true');assert.equal(facts.focusPreserved,true);assert.doesNotMatch(facts.image,/evil/);assert.doesNotMatch(facts.html,/EVIL/);
 const pdf=await page.evaluate(async()=>({result:await window.card.download('A001'),snapshot:window.pdfSnapshot}));
 assert.equal(pdf.result.status,'downloaded');assert.equal(pdf.snapshot.price,'123 M Ft');assert.equal(pdf.snapshot.status,'Eladva');assert.doesNotMatch(pdf.snapshot.imageUrl,/evil/);
 results.push('Live canonical facts refresh in place, preserve geometry/tab/focus, and reach the PDF snapshot');
 await page.evaluate(()=>window.card.dispose());
 await page.addScriptTag({content:listRuntime});
 await page.evaluate(({css,shell,data})=>{
  const shadow=document.querySelector('#list').attachShadow({mode:'open'});shadow.innerHTML='<style>'+css+'</style>'+shell;
  window.list=mountApartmentList(shadow,{dataUrl:'http://priority-card.test/apartments.json',assetBaseUrl:'http://priority-card.test/assets/',onDataLoaded:d=>window.loadedList=d});
 },{css:await read('src/shared/apartment-list/styles.css'),shell:await read('src/shared/apartment-list/shell.html')});
 await page.waitForFunction(()=>window.loadedList);
 const list=page.locator('#list');await list.locator('[data-sort="area"]').focus();await page.keyboard.press('Enter');
 assert.equal(await page.evaluate(()=>document.querySelector('#list').shadowRoot.activeElement?.dataset.sort),'area');
 results.push('Keyboard sorting retains focus on the active sort header');
 // Exercise the actual list validator with a reserved record too.
 await page.evaluate(()=>{window.list.destroy();window.loadedList=null;});
 await page.route('http://priority-card.test/reserved.json',route=>route.fulfill({contentType:'application/json',json:reserved}));
 await page.evaluate(({css,shell})=>{const shadow=document.querySelector('#list').shadowRoot;shadow.innerHTML='<style>'+css+'</style>'+shell;window.list=mountApartmentList(shadow,{dataUrl:'http://priority-card.test/reserved.json',assetBaseUrl:'http://priority-card.test/assets/',onDataLoaded:d=>window.loadedList=d});},{css:await read('src/shared/apartment-list/styles.css'),shell:await read('src/shared/apartment-list/shell.html')});
 await page.waitForFunction(()=>window.loadedList);
 assert.equal(await list.locator('[data-unit]').count(),69);assert.equal(await list.locator('[data-unit="A001"] .status-reserved').count(),2);
 results.push('A reserved record no longer rejects the 69-apartment list');
 assert.deepEqual(errors,[]);
 await writeFile(new URL('result.json',out),JSON.stringify({results,requests,errors},null,2));
 console.log(results.map(x=>'PASS '+x).join('\n'));
 await context.close();
}finally{await browser.close();}
