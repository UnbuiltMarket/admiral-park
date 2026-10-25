import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createRequire} from 'node:module';

// Mount authored sources directly, so this catches regressions before generation.
const root=new URL('../',import.meta.url),read=file=>readFile(new URL(file,root),'utf8');
const [runtime,css,shell,json]=await Promise.all(['src/shared/apartment-list/app.js','src/shared/apartment-list/styles.css','src/shared/apartment-list/shell.html','data/apartment-details.json'].map(read));
const dataset=JSON.parse(json),require=createRequire(import.meta.url);
dataset.apartments.find(a=>a.id==='A001').status='under_negotiation';
dataset.apartments.find(a=>a.id==='A002').areaGarden=12;
dataset.apartments.find(a=>a.id==='A003').status='reserved';
const {chromium}=require(process.env.PLAYWRIGHT_MODULE_PATH||'playwright');
const browser=await chromium.launch({headless:true,channel:process.env.PLAYWRIGHT_CHANNEL||'chrome'});
const checks=[];
const check=(name,value)=>{assert.ok(value,name);checks.push(name);};
async function fixture({gate=false}={}) {
 const context=await browser.newContext({viewport:{width:1440,height:900}}),page=await context.newPage(),errors=[];
 page.on('pageerror',error=>errors.push(error.message));
 await page.route('http://list-audit.test/**',route=>{
  if(new URL(route.request().url()).pathname==='/apartments.json')return route.fulfill({contentType:'application/json',json:dataset});
  return route.fulfill({contentType:'text/html',body:'<!doctype html><meta name="viewport" content="width=device-width,initial-scale=1"><style>body{margin:0}</style><div id="list"></div>'});
 });
 await page.goto('http://list-audit.test/');
 await page.evaluate(({runtime,css,shell,gate})=>{
  if(gate){const native=fetch;window.fetch=(...args)=>String(args[0]).endsWith('/apartments.json')?new Promise(resolve=>window.releaseData=()=>resolve(native(...args))):native(...args);}
  const root=document.querySelector('#list').attachShadow({mode:'open'});root.innerHTML='<style>'+css+'</style>'+shell;
  window.listController=new Function(runtime.replace('export function mountApartmentList','function mountApartmentList')+'; return mountApartmentList;')()(root,{dataUrl:'http://list-audit.test/apartments.json',disableUrl:true});
 },{runtime,css,shell,gate});
 const list=page.locator('#list');
 if(!gate)await list.locator('#results[aria-busy="false"]').waitFor();
 return {page,list,context,errors,async close(){check('No browser exceptions',errors.length===0);await context.close();}};
}
try {
 const delayed=await fixture({gate:true});
 try {
  await delayed.page.waitForFunction(()=>!!window.releaseData);
  await delayed.page.evaluate(()=>{localStorage.setItem('admiral-park:favorites:v1',JSON.stringify(['A001']));dispatchEvent(new CustomEvent('admiral:apartment-favorites',{detail:{ids:['A001']}}));window.releaseData();});
  await delayed.list.locator('#results[aria-busy="false"]').waitFor();
  check('Favourite saved during loading is rendered saved',await delayed.list.locator('[data-save="A001"]').getAttribute('aria-pressed')==='true');
  await delayed.list.locator('[data-save="A002"]').click();
  check('Next save preserves favourite received during loading',await delayed.page.evaluate(()=>JSON.stringify(JSON.parse(localStorage.getItem('admiral-park:favorites:v1')).sort())==='["A001","A002"]'));
 } finally {await delayed.close();}
 const unpersisted=await fixture({gate:true});
 try {
  await unpersisted.page.waitForFunction(()=>!!window.releaseData);
  await unpersisted.page.evaluate(()=>{dispatchEvent(new CustomEvent('admiral:apartment-favorites',{detail:{ids:['A001']}}));window.releaseData();});
  await unpersisted.list.locator('#results[aria-busy="false"]').waitFor();
  check('Favourite event survives loading when no storage snapshot exists',await unpersisted.list.locator('[data-save="A001"]').getAttribute('aria-pressed')==='true');
 } finally {await unpersisted.close();}
 const removed=await fixture({gate:true});
 try {
  await removed.page.waitForFunction(()=>!!window.releaseData);
  await removed.page.evaluate(()=>{dispatchEvent(new CustomEvent('admiral:apartment-favorites',{detail:{ids:['A001']}}));localStorage.setItem('admiral-park:favorites:v1','[]');window.releaseData();});
  await removed.list.locator('#results[aria-busy="false"]').waitFor();
  check('Latest persisted removal wins over an earlier favourite event',await removed.list.locator('[data-save="A001"]').getAttribute('aria-pressed')==='false');
 } finally {await removed.close();}
 const f=await fixture();
 try {
  for(const key of ['area','price']) {
   await f.list.locator(`[data-sort="${key}"]`).focus();await f.page.keyboard.press('Enter');
   check(key+' heading retains keyboard focus after sorting',await f.list.locator(`[data-sort="${key}"]`).evaluate(el=>el.getRootNode().activeElement===el));
  }
  await f.list.locator('[data-save="A001"]').click();await f.list.locator('[data-save="A002"]').click();await f.list.locator('#favoritesOnly').check();
  await f.list.locator('[data-save="A001"]').focus();await f.page.keyboard.press('Enter');
  check('Removing visible favourite focuses nearest remaining favourite',await f.list.locator('[data-save="A002"]').evaluate(el=>el.getRootNode().activeElement===el));
  await f.page.keyboard.press('Enter');
  check('Removing last favourite focuses stable filter',await f.list.locator('#favoritesOnly').evaluate(el=>el.getRootNode().activeElement===el));
  await f.list.locator('#favoritesOnly').uncheck();
  await f.list.locator('#search').focus();await f.list.locator('#search').fill('A00');
  check('Filtering preserves search input focus',await f.list.locator('#search').evaluate(el=>el.getRootNode().activeElement===el));
  const contrast=await f.list.locator('[data-unit="A001"] .cell-status .status-pill').evaluate(el=>{
   const canvas=document.createElement('canvas'),ctx=canvas.getContext('2d');
   const rgb=color=>{ctx.clearRect(0,0,1,1);ctx.fillStyle=color;ctx.fillRect(0,0,1,1);return [...ctx.getImageData(0,0,1,1).data].slice(0,3);};
   const luminance=channels=>channels.map(c=>c/255).map(c=>c<=.04045?c/12.92:((c+.055)/1.055)**2.4).reduce((sum,c,i)=>sum+c*[.2126,.7152,.0722][i],0);
   const style=getComputedStyle(el),text=rgb(style.color),background=rgb(style.getPropertyValue('--paper')),a=luminance(text),b=luminance(background);
   return {ratio:(Math.max(a,b)+.05)/(Math.min(a,b)+.05),text,dot:rgb(getComputedStyle(el,'::before').backgroundColor)};
  });
  check('Negotiation text meets 4.5:1 contrast',contrast.ratio>=4.5);
  check('Negotiation dot retains original yellow',JSON.stringify(contrast.dot)==='[178,138,47]');
  check('Reserved status remains supported after integration',await f.list.locator('[data-unit="A003"] .cell-status .status-reserved').count()===1);
  check('Reserved text uses the same readable hue',await f.list.locator('[data-unit="A003"] .cell-status .status-pill').evaluate(el=>getComputedStyle(el).color===getComputedStyle(el.closest('table').querySelector('[data-unit="A001"] .cell-status .status-pill')).color));
  await f.page.setViewportSize({width:390,height:844});
  check('Absent mobile garden remains omitted',!await f.list.locator('[data-unit="A001"] .cell-garden').isVisible());
  check('Known mobile garden area remains visible',await f.list.locator('[data-unit="A002"] .cell-garden').isVisible());
  check('Terrace captions use correct article',!(await f.list.locator('#data-note').textContent()).includes('az terasz'));
  console.log(JSON.stringify({checks,contrast},null,2));
 } finally {await f.close();}
 console.log(`Passed ${checks.length} list audit regression checks.`);
} finally {await browser.close();}
