import {FROSTED_BUTTON_CSS} from '../src/shared/ui/frosted-button.js';
import assert from 'node:assert/strict';
import {readFile,mkdir,writeFile} from 'node:fs/promises';
import {createRequire} from 'node:module';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const require=createRequire(import.meta.url),{chromium}=require(process.env.PLAYWRIGHT_MODULE_PATH||'playwright');
const root=new URL('../',import.meta.url),out=new URL('tmp/card-audit-fixes/',root);
const mediaRoot=process.env.APARTMENT_MEDIA_ROOT||fileURLToPath(new URL('assets/apartment-list/',root));
const [cardRuntime,cardStyles,shell,data]=await Promise.all(['src/shared/apartment-card/card-runtime.js','src/shared/apartment-card/card.css','src/shared/apartment-card/card-shell.html','data/apartment-details.json'].map(file=>readFile(new URL(file,root),'utf8')));
const buttonRuntime=(await readFile(new URL('../src/shared/ui/frosted-button.js',import.meta.url),'utf8')).replace(/^export /gm,'');
const runtime=buttonRuntime+'\n'+cardRuntime,styles=cardStyles+'\n'+FROSTED_BUTTON_CSS.replaceAll('.admiral-frosted-button', '#detail-dialog .inquiry-button.admiral-frosted-button');
const browser=await chromium.launch({headless:true,channel:process.env.PLAYWRIGHT_CHANNEL||'chrome'});
const checks=[],errors=[];await mkdir(out,{recursive:true});
const check=(message,value)=>{assert.ok(value,message);checks.push(message);};
try {
  const page=await browser.newPage({viewport:{width:1440,height:900}});
  let failedAsset='';
  page.on('pageerror',error=>errors.push(error.message));
  await page.route('http://card-regression.test/**',async route=>{
    const u=new URL(route.request().url());
    if(u.pathname.startsWith('/assets/')){
      if(failedAsset&&u.pathname.includes(failedAsset))return route.fulfill({status:404});
      const file=path.join(mediaRoot,decodeURIComponent(u.pathname.slice(8)));
      try{return route.fulfill({body:await readFile(file),contentType:({'.png':'image/png','.svg':'image/svg+xml','.webp':'image/webp','.woff2':'font/woff2'})[path.extname(file)]||'application/octet-stream'});}
      catch{return route.fulfill({status:404});}
    }
    return route.fulfill({contentType:'text/html',body:'<!doctype html><meta name="viewport" content="width=device-width,initial-scale=1"><button id="opener">Open</button><div id="card"></div>'});
  });
  await page.goto('http://card-regression.test/');await page.addScriptTag({content:runtime});
  await page.evaluate(({runtimeStyles,shell,data})=>{
    const root=document.querySelector('#card').attachShadow({mode:'open'});root.innerHTML='<style>'+runtimeStyles+'</style>'+shell;
    window.ctrl=mountOrbitApartmentCardRuntime(root,{dataset:JSON.parse(data),pageUrl:'http://card-regression.test/lista'});window.card=root;
    window.createAdmiralApartmentPdf=async()=>{throw new Error('Injected PDF failure');};
  },{runtimeStyles:styles,shell,data});
  const card=page.locator('#card');
  await page.waitForTimeout(150);
  for(const viewport of [{width:1440,height:900},{width:390,height:844},{width:320,height:568},{width:844,height:390},{width:667,height:375},{width:568,height:320}]){
    await page.setViewportSize(viewport);
    for(const id of ['A001','C303']){
      await page.evaluate(id=>ctrl.open(id),id);await page.waitForTimeout(80);
      const expectedPrice=new Intl.NumberFormat('hu-HU',{maximumFractionDigits:2}).format(JSON.parse(data).apartments.find(apartment=>apartment.id===id).price);
      check(`${id} ${viewport.width}×${viewport.height} shows its full HUF price`,await card.locator('.price-value').innerText()===expectedPrice&&await card.locator('.price-unit').innerText()==='Ft');
      await card.locator('[data-detail-tab="rooms"]').evaluate(button=>button.click());await page.waitForTimeout(60);
      check(`${id} has one room list and no alternate room tabs`,await card.locator('.detail-rooms').count()===1&&await card.locator('[data-room-view]').count()===0);
      for(const view of ['unit']){
        const seen=new Set();let pages=0;
        do {
          const state=await page.evaluate(view=>{
            const panel=card.querySelector('.detail-rooms'),frame=panel.querySelector('.room-page'),dialog=card.querySelector('#detail-dialog'),close=dialog.querySelector('[data-close]');
            const list=frame.querySelector('ol,ul'),rows=[...list.children],rect=frame.getBoundingClientRect(),bounds=dialog.getBoundingClientRect(),closeBounds=close.getBoundingClientRect();
            return {rows:rows.filter(row=>!row.hidden).map(row=>{const b=row.getBoundingClientRect(),name=row.querySelector('.room-name'),area=row.querySelector('.room-area'),range=document.createRange();if(name)range.selectNodeContents(name);return {index:rows.indexOf(row),top:b.top,bottom:b.bottom,left:b.left,right:b.right,nameRight:name?range.getBoundingClientRect().right:null,areaLeft:area?.getBoundingClientRect().left};}),count:rows.length,frame:rect.toJSON(),bounds:bounds.toJSON(),close:closeBounds.toJSON(),price:dialog.querySelector('.detail-price').getBoundingClientRect().toJSON(),scroll:dialog.scrollHeight,client:dialog.clientHeight,more:!!panel.querySelector('.room-pagination:not([hidden]) [data-room-page="1"]:not(:disabled)')};
          },view);
          check(`${id} ${view} ${viewport.width}×${viewport.height} room frame has space`,state.frame.height>10);
          check(`${id} ${view} ${viewport.width}×${viewport.height} all shown rooms fit`,state.rows.length>0&&state.rows.every(row=>row.top>=state.frame.top-.6&&row.bottom<=state.frame.bottom+.6&&row.left>=state.frame.left-.6&&row.right<=state.frame.right+.6));
          check(`${id} room names stay clear of their areas`,state.rows.every(row=>row.nameRight===null||row.areaLeft===undefined||row.nameRight<=row.areaLeft+.6));
          check(`${id} ${view} ${viewport.width}×${viewport.height} popup stays inside screen`,state.bounds.left>0&&state.bounds.top>0&&state.bounds.right<viewport.width&&state.bounds.bottom<viewport.height&&state.close.top>=state.bounds.top&&state.close.bottom<=state.bounds.bottom);
          check(`${id} ${view} ${viewport.width}×${viewport.height} popup needs no scrolling`,state.scroll<=state.client+1);
          if(viewport.width<=600&&viewport.height>450)check(`${id} room list stays above the price`,state.frame.bottom<=state.price.top+1);
          for(const row of state.rows)seen.add(row.index);
          if(!state.more){check(`${id} ${view} ${viewport.width}×${viewport.height} every room is reachable`,seen.size===state.count);break;}
          await card.locator('.detail-rooms [data-room-page="1"]').click();await page.waitForTimeout(20);
        }while(++pages<30);
        check(`${id} ${view} pagination terminates`,pages<30);
      }
      await page.screenshot({path:fileURLToPath(new URL(`${id}-${viewport.width}x${viewport.height}.png`,out))});
      if(viewport.width===1440&&id==='A001'){
        await card.locator('.room-legend-button[data-plan-room="1"]').hover();
        check('Unified desktop room list highlights the corresponding floorplan number',await card.locator('.room-marker[data-plan-room="1"]').evaluate(node=>node.classList.contains('is-active')));
      }
      if(viewport.width===390&&id==='A001'){
        await card.locator('#detail-tab-plan').focus();await page.keyboard.press('ArrowDown');
        check('Vertical side tabs use ArrowDown for Szintrajz',await card.locator('#detail-tab-floor').getAttribute('aria-selected')==='true');
        await page.keyboard.press('ArrowDown');
        check('Vertical side tabs reach Helyiséglista',await card.locator('#detail-tab-rooms').getAttribute('aria-selected')==='true');
        await page.keyboard.press('Home');
        check('Home returns to Alaprajz',await card.locator('#detail-tab-plan').getAttribute('aria-selected')==='true');
      }
      await page.evaluate(()=>ctrl.close());
    }
  }
  await page.setViewportSize({width:1440,height:900});failedAsset='/floorplans/types/B/original.png';
  await page.evaluate(()=>ctrl.open('A001'));
  await card.locator('.detail-plan-image').evaluate(image=>image.src+='?audit-error=1');
  await card.locator('[data-detail-image-stage="plan"][data-image-state="error"]').waitFor();
  check('Failed plan has visible retry feedback',await card.locator('[data-detail-image-retry="plan"]').isVisible());
  check('Failed plan hides all numeric markers',!await card.locator('.room-marker').first().isVisible());
  failedAsset='';await card.locator('[data-detail-image-retry="plan"]').click();
  await card.locator('[data-detail-image-stage="plan"][data-image-state="ready"]').waitFor();
  check('Plan retry loads the image and restores room numbers',await card.locator('.room-marker').first().isVisible());
  const floorPath=await card.locator('.detail-floor-image').getAttribute('data-image-url');
  failedAsset=new URL(floorPath).pathname;
  await card.locator('[data-document-view="floor"]').click();
  await card.locator('.detail-floor-image').evaluate(image=>image.src+='?audit-error=1');
  await card.locator('#detail-document-floor[data-image-state="error"]').waitFor();
  check('Failed floor layout has visible retry feedback',await card.locator('[data-detail-image-retry="floor"]').isVisible());
  failedAsset='';await card.locator('[data-detail-image-retry="floor"]').click();
  await card.locator('#detail-document-floor[data-image-state="ready"]').waitFor();
  check('Floor layout retry succeeds',await card.locator('.detail-floor-image').evaluate(image=>image.naturalWidth>0));
  // Exercise desktop sharing even on hosts that also offer native Web Share.
  await page.evaluate(()=>Object.defineProperty(navigator,'share',{value:undefined,configurable:true}));
  await card.locator('[data-share]').click();
  const shareBounds=await card.locator('.share-popover').evaluate(menu=>{const a=menu.getBoundingClientRect(),b=menu.closest('dialog').getBoundingClientRect();return {visible:!menu.hidden,inside:a.left>=b.left&&a.right<=b.right&&a.top>=b.top&&a.bottom<=b.bottom};});
  check('Desktop share menu stays inside the open card',shareBounds.visible&&shareBounds.inside);
  await card.locator('[data-share-close]').click();
  await card.locator('[data-download]').click();
  await page.waitForFunction(()=>card.querySelector('.detail-feedback')?.textContent.includes('Nem sikerült'));
  check('Open-card PDF error is inside the native modal',await card.locator('#detail-dialog .detail-feedback.visible').isVisible());
  check('External feedback is hidden while card is open',!await card.locator('#toast').evaluate(element=>element.classList.contains('visible')));
  await page.screenshot({path:fileURLToPath(new URL('pdf-error-in-modal.png',out))});
  await page.evaluate(()=>ctrl.close());
  await page.evaluate(()=>ctrl.download('A001'));
  check('Closed-card row export still uses external feedback',await card.locator('#toast.visible').isVisible());
  check('No uncaught browser errors',errors.length===0);
  await writeFile(new URL('results.json',out),JSON.stringify({checks,errors},null,2));
  console.log(`${checks.length} shared-card audit browser checks passed`);
} finally {await browser.close();}
