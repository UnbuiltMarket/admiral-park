import assert from 'node:assert/strict';
import {readFile,mkdir,writeFile} from 'node:fs/promises';
import {createRequire} from 'node:module';
import {fileURLToPath} from 'node:url';
import path from 'node:path';

const root=new URL('../',import.meta.url),read=file=>readFile(new URL(file,root),'utf8');
const [runtime,styles,shell,json]=await Promise.all(['src/shared/apartment-card/card-runtime.js','src/shared/apartment-card/card.css','src/shared/apartment-card/card-shell.html','data/apartment-details.json'].map(read));
const dataset=JSON.parse(json),a=dataset.apartments.find(a=>a.id==='A001');a.status='under_negotiation';a.statusLabel='Tárgyalás alatt';
const out=new URL('tmp/card-status-contrast/',root);await mkdir(out,{recursive:true});
const require=createRequire(import.meta.url),{chromium}=require(process.env.PLAYWRIGHT_MODULE_PATH||'playwright');
const mediaRoot=process.env.APARTMENT_MEDIA_ROOT||fileURLToPath(new URL('assets/apartment-list/',root));
const browser=await chromium.launch({headless:true,channel:process.env.PLAYWRIGHT_CHANNEL||'chrome'}),results=[];
try {
 const page=await browser.newPage({viewport:{width:1440,height:900}});
 await page.route('http://card-status.test/**',async route=>{
  const pathname=new URL(route.request().url()).pathname;
  if(pathname.startsWith('/assets/')){const file=path.join(mediaRoot,decodeURIComponent(pathname.slice(8)));try{return route.fulfill({body:await readFile(file),contentType:({'.png':'image/png','.svg':'image/svg+xml','.webp':'image/webp','.woff2':'font/woff2'})[path.extname(file)]||'application/octet-stream'});}catch{return route.fulfill({status:404});}}
  return route.fulfill({contentType:'text/html',body:'<!doctype html><meta name="viewport" content="width=device-width,initial-scale=1"><div id="card"></div>'});
 });
 await page.goto('http://card-status.test/');await page.addScriptTag({content:runtime});
 await page.evaluate(({styles,shell,dataset})=>{const root=document.querySelector('#card').attachShadow({mode:'open'});root.innerHTML='<style id="card-styles">'+styles+'</style>'+shell;window.card=root;window.ctrl=mountOrbitApartmentCardRuntime(root,{dataset});window.ctrl.open('A001');},{styles,shell,dataset});
 await page.locator('#card').locator('#detail-document-plan[data-image-state="ready"]').waitFor();
 await page.evaluate(()=>Promise.all([...card.querySelectorAll('img')].map(image=>image.decode().catch(()=>{}))));
 await page.evaluate(()=>document.fonts.ready);
 for(const viewport of [{width:1440,height:900},{width:390,height:844}]) {
  await page.setViewportSize(viewport);await page.waitForTimeout(100);
  const measure=()=>page.evaluate(()=>{
   const status=card.querySelector('.detail-status .status-pill'),style=getComputedStyle(status),dialog=card.querySelector('#detail-dialog'),ctx=document.createElement('canvas').getContext('2d');
   const rgb=color=>{ctx.clearRect(0,0,1,1);ctx.fillStyle=color;ctx.fillRect(0,0,1,1);return [...ctx.getImageData(0,0,1,1).data].slice(0,3);};
   const lum=channels=>channels.map(c=>c/255).map(c=>c<=.04045?c/12.92:((c+.055)/1.055)**2.4).reduce((s,c,i)=>s+c*[.2126,.7152,.0722][i],0);
   const text=rgb(style.color),contrast=background=>{const a=lum(text),b=lum(rgb(background));return (Math.max(a,b)+.05)/(Math.min(a,b)+.05);};
   const image=dialog.querySelector('.detail-plan-image');
   return {text,dot:rgb(getComputedStyle(status,'::before').backgroundColor),animation:getComputedStyle(status,'::before').animationName,topRatio:contrast(style.getPropertyValue('--detail-top')),bottomRatio:contrast(style.getPropertyValue('--detail-bottom')),geometry:[dialog,status,...dialog.querySelectorAll('.detail-logo,.detail-area-row,.detail-price,.inquiry-button')].map(el=>el.getBoundingClientRect().toJSON()),canvasMix:rgb('color-mix(in srgb, '+style.getPropertyValue('--negotiating')+' 60%, '+style.getPropertyValue('--detail-ink')+')'),image:{src:image.src,width:image.naturalWidth,height:image.naturalHeight,opacity:getComputedStyle(image).opacity,rect:image.getBoundingClientRect().toJSON(),panel:image.closest('[data-document-panel]').dataset.imageState}};
  });
  const after=await measure();
  assert.ok(after.topRatio>=4.5&&after.bottomRatio>=4.5,'Readable against both gradient extremes');
  assert.deepEqual(after.dot,[178,138,47],'Retains yellow dot');assert.equal(after.animation,'none','Negotiation does not pulse');assert.deepEqual(after.canvasMix,after.text,'PDF canvas resolves the same mixing expression');
  await page.screenshot({path:fileURLToPath(new URL('after-'+viewport.width+'.png',out))});
  await page.evaluate(styles=>{card.querySelector('#card-styles').textContent=styles.replaceAll('color-mix(in srgb, var(--negotiating) 60%, var(--detail-ink))','var(--negotiating)');},styles);
  const before=await measure();assert.deepEqual(after.geometry,before.geometry,'Contrast correction preserves layout geometry');
  await page.screenshot({path:fileURLToPath(new URL('before-'+viewport.width+'.png',out))});
  await page.evaluate(styles=>{card.querySelector('#card-styles').textContent=styles;},styles);
  results.push({viewport,...after,geometryUnchanged:true});
 }
 await page.evaluate(()=>ctrl.close());await page.waitForTimeout(20);
 const exportCheck=await page.evaluate(async()=>{
  let captured;
  window.createAdmiralApartmentPdf=async snapshot=>{captured=snapshot.colors.status;throw new Error('Stop after color snapshot');};
  const trigger=document.createElement('button');trigger.innerHTML='<span>Adatlap</span>';document.body.append(trigger);
  const result=await ctrl.download('A001',trigger);
  const ctx=document.createElement('canvas').getContext('2d');ctx.fillStyle=captured;ctx.fillRect(0,0,1,1);
  return {result,rawColor:captured,rgb:[...ctx.getImageData(0,0,1,1).data].slice(0,3),busy:trigger.getAttribute('aria-busy'),disabled:trigger.getAttribute('aria-disabled'),label:trigger.textContent,dialogOpen:card.querySelector('#detail-dialog').open};
 });
 assert.deepEqual(exportCheck.rgb,results[0].text,'Direct-row PDF uses the same readable status text color as the card');
 assert.equal(exportCheck.result.status,'error','Injected stop settles export');assert.equal(exportCheck.busy,null,'Export releases busy state');assert.equal(exportCheck.disabled,null,'Export restores trigger');assert.equal(exportCheck.label,'Adatlap');assert.equal(exportCheck.dialogOpen,false,'Direct export keeps card closed');
 results.push({directRowPdf:exportCheck});
 await writeFile(new URL('results.json',out),JSON.stringify(results,null,2));console.log(JSON.stringify(results.map(({geometry,...value})=>value),null,2));
} finally {await browser.close();}
