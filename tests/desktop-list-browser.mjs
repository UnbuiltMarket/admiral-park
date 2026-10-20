import assert from 'node:assert/strict';
import {readFile,mkdir,writeFile} from 'node:fs/promises';
import {createRequire} from 'node:module';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

// Exercise the real generated Framer consumers, including their shared popup.
// Optional preview mode uses the same DOM/geometry assertions on the static host.
const root=new URL('../',import.meta.url),out=new URL('tmp/desktop-list-check/',root);
const {ts,requireDev}=await import(new URL('scripts/tooling.mjs',root));
const require=createRequire(import.meta.url);
const {chromium}=require(process.env.PLAYWRIGHT_MODULE_PATH||'playwright');
const preview=process.env.DESKTOP_LIST_PREVIEW_URL||'';
const mediaRoot=process.env.APARTMENT_MEDIA_ROOT||fileURLToPath(new URL('assets/apartment-list/',root));
const compilerOptions={target:ts.ScriptTarget.ES2020,module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.React};
const codes=Object.fromEntries(await Promise.all(['AdmiralApartmentList','AdmiralApartmentDetailCard'].map(async name=>['./'+name+'.tsx',ts.transpileModule(await readFile(new URL('src/framer/'+name+'.tsx',root),'utf8'),{compilerOptions}).outputText])));
const react=await readFile(path.join(path.dirname(requireDev.resolve('react/package.json')),'umd/react.development.js'),'utf8');
const dom=await readFile(path.join(path.dirname(requireDev.resolve('react-dom/package.json')),'umd/react-dom.development.js'),'utf8');
const dataset=JSON.parse(await readFile(new URL('data/apartment-details.json',root),'utf8'));
await mkdir(out,{recursive:true});
const browser=await chromium.launch({headless:true,channel:process.env.PLAYWRIGHT_CHANNEL||'chrome'}),checks=[],measurements=[];
const check=(name,value,detail)=>{assert.ok(value,detail?name+': '+JSON.stringify(detail):name);checks.push(name);};
const context=await browser.newContext({viewport:{width:1440,height:1000},locale:'hu-HU'}),page=await context.newPage(),errors=[];
page.on('pageerror',e=>errors.push(e.message));
await page.route('http://desktop-list.test/**',async route=>{
  const url=new URL(route.request().url()),pathname=decodeURIComponent(url.pathname);
  if(pathname==='/apartment-details.json')return route.fulfill({contentType:'application/json',json:dataset});
  if(pathname.startsWith('/assets/')){
    const relative=pathname.slice(8).replace(/^assets\//,'');assert.ok(!relative.split('/').includes('..'));
    const file=path.join(mediaRoot,relative),contentType={'.webp':'image/webp','.png':'image/png','.svg':'image/svg+xml','.ttf':'font/ttf','.woff2':'font/woff2','.pdf':'application/pdf'}[path.extname(file)]||'application/octet-stream';
    return route.fulfill({contentType,body:await readFile(file)});
  }
  return route.fulfill({contentType:'text/html',body:'<!doctype html><meta name="viewport" content="width=device-width,initial-scale=1"><style>body{margin:0;background:#fbfaf8}</style><div id="mount"></div>'});
});
try{
  await page.goto(preview||'http://desktop-list.test/');
  if(!preview){
    await page.addScriptTag({content:react});await page.addScriptTag({content:dom});
    await page.evaluate(codes=>{
      const stub={RenderTarget:{canvas:'canvas',current:()=> 'preview'},addPropertyControls:()=>{},ControlType:new Proxy({},{get:(_,name)=>name})};
      const cache=new Map();const req=name=>{if(name==='react')return React;if(name==='framer')return stub;if(cache.has(name))return cache.get(name).exports;if(!codes[name])throw Error('Unknown module '+name);const module={exports:{}};cache.set(name,module);new Function('module','exports','require',codes[name])(module,module.exports,req);return module.exports;};
      const component=req('./AdmiralApartmentList.tsx').default;window.root=ReactDOM.createRoot(document.querySelector('#mount'));
      window.root.render(React.createElement(React.StrictMode,null,React.createElement(component,{dataUrl:'http://desktop-list.test/apartment-details.json',assetBaseUrl:'http://desktop-list.test/assets/',pageUrl:'http://desktop-list.test/lista'})));
    },codes);
  }
  const list=page.locator(preview?'#apartment-list':'[data-admiral-apartment-list]'),card=page.locator(preview?'#apartment-card':'[data-orbit-detail-card]');
  await list.locator('#results[aria-busy="false"]').waitFor();
  await page.evaluate(()=>document.fonts.ready);
  check('All 69 records remain in the redesigned list',await list.locator('[data-unit]').count()===69);
  for(const width of [1920,1440,1366,1100,1024,390,320]){
    await page.setViewportSize({width,height:width<500?844:1000});
    await page.waitForTimeout(150);
    const m=await list.evaluate(host=>{
      const r=host.shadowRoot||host,table=r.querySelector('.apartment-table'),row=r.querySelector('.apartment-row'),head=r.querySelector('thead tr');
      const rect=e=>e?.getBoundingClientRect().toJSON();
      const style=e=>e?({size:parseFloat(getComputedStyle(e).fontSize),line:parseFloat(getComputedStyle(e).lineHeight),weight:getComputedStyle(e).fontWeight}):null;
      const plan=row.querySelector('.unit-media'),type=row.querySelector('.unit-type'),id=row.querySelector('.unit-id'),price=row.querySelector('.price-amount')||row.querySelector('.cell-price');
      const texts=Array.from(row.querySelectorAll('button, .unit-type, .cell-price, .status-pill')).filter(e=>getComputedStyle(e).display!=='none').map(e=>({text:e.textContent.trim(),rect:rect(e),size:style(e).size,scroll:e.scrollWidth,client:e.clientWidth}));
      const hs=Array.from(head?.children||[]).map(e=>({text:e.textContent.trim(),rect:rect(e),size:style(e).size,display:getComputedStyle(e).display}));
      const overflows=Array.from(r.querySelectorAll('*')).map(e=>({tag:e.tagName,cls:e.className,id:e.id,rect:rect(e),text:e.textContent.slice(0,80)})).filter(e=>e.rect.width>0&&(e.rect.right>innerWidth+1||e.rect.left< -1)).slice(0,15);
      const clippedRooms=Array.from(r.querySelectorAll('.cell-rooms > span')).filter(e=>e.getBoundingClientRect().width>e.parentElement.getBoundingClientRect().width+1).map(e=>({text:e.textContent,rect:rect(e),parent:rect(e.parentElement)}));
      const mobileTargets=Array.from(row.querySelectorAll('[data-save],[data-download],[data-compare]')).map(e=>({action:e.dataset.save?'save':e.dataset.download?'download':'compare',rect:rect(e)}));
      return {width:innerWidth,pageWidth:document.documentElement.scrollWidth,host:rect(host),table:rect(table),row:rect(row),heads:hs,cells:Array.from(row.children).map(rect),id:style(id),price:style(price),area:style(row.querySelector('.cell-interior .area-number')||row.querySelector('.cell-interior')),type:rect(type),plan:rect(plan),texts,overflows,clippedRooms,mobileTargets};
    });
    measurements.push(m);
    check('No horizontal page overflow at '+width,m.pageWidth<=width+1,m);
    check('Row fits the host at '+width,m.row.right<=m.host.right+1&&m.row.left>=m.host.left-1,m);
    if(width>=1366){
      check('All grouped column headings remain visible at '+width,m.heads.every(h=>h.display!=='none'&&h.rect.height>0),m.heads);
      check('Every heading aligns with its data column at '+width,m.heads.length===m.cells.length&&m.heads.every((h,i)=>Math.abs(h.rect.left-m.cells[i].left)<=1&&Math.abs(h.rect.width-m.cells[i].width)<=1),{heads:m.heads,cells:m.cells});
      check('Desktop headings are readable at '+width,m.heads.every(h=>h.size>=11.5),m.heads);
      check('Apartment number is prominent at '+width,m.id.size>=24,m.id);
      check('Price has clear emphasis at '+width,m.price.size>=20,m.price);
      check('Interior area has clear emphasis at '+width,m.area.size>=18,m.area);
    }
    // Thumbnail and type may share a group but their visible bounds cannot overlap.
    check('Type is clear of the floorplan at '+width,!m.type||!m.plan||m.type.left>=m.plan.right-1||m.type.bottom<=m.plan.top+1||m.type.top>=m.plan.bottom-1,{type:m.type,plan:m.plan});
    const clipped=m.texts.filter(t=>t.text&&t.client>0&&t.scroll>t.client+2);
    check('Main row labels are not horizontally clipped at '+width,clipped.length===0,clipped);
    check('Every special room-layout label fits its column at '+width,m.clippedRooms.length===0,m.clippedRooms);
    if(width<500)check('Mobile action targets are at least 44 pixels at '+width,m.mobileTargets.every(t=>t.rect.width>=44&&t.rect.height>=44),m.mobileTargets);
    await page.screenshot({path:fileURLToPath(new URL((preview?'preview':'framer')+'-list-'+width+'.png',out)),fullPage:false});
  }
  await page.setViewportSize({width:1440,height:900});
  const search=list.locator('#search');await search.fill('A00');
  const count=await list.locator('[data-unit]').count();check('Number search still filters the list',count>1&&count<69);
  const favorite=list.locator('[data-unit="A001"] [data-save]');await favorite.click();
  check('Favorite toggle remains operable',await list.locator('[data-unit="A001"] [data-save]').getAttribute('aria-pressed')==='true');
  check('Saving a favorite leaves the detail card closed',await card.locator('#detail-dialog[open]').count()===0);
  const open=list.locator('[data-detail="A001"]');await open.focus();await page.keyboard.press('Enter');await card.locator('#detail-dialog[open]').waitFor();
  check('Keyboard opens the shared detail card',await card.locator('.detail-apartment-number').innerText()==='A001');
  await page.keyboard.press('Escape');await card.locator('#detail-dialog[open]').waitFor({state:'hidden'});
  check('Closing the card retains search and results',await search.inputValue()==='A00'&&await list.locator('[data-unit]').count()===count);
  check('Closing restores focus to the apartment opener',await list.locator('[data-detail="A001"]').evaluate(e=>e.getRootNode().activeElement===e));
  await list.locator('[data-unit="A001"] [data-compare]').click();await list.locator('[data-unit="A002"] [data-compare]').click();
  check('Compare retains both selected apartments',await list.locator('#compare-tray').innerText().then(s=>s.includes('A001')&&s.includes('A002')));
  check('Compare selection leaves the detail card closed',await card.locator('#detail-dialog[open]').count()===0);
  await list.locator('[data-open-compare]').click();await list.locator('#compare-dialog[open]').waitFor();
  check('Compare opens its two-apartment table',await list.locator('.compare-table thead').innerText().then(s=>s.includes('A001')&&s.includes('A002')));
  await page.keyboard.press('Escape');await list.locator('#compare-dialog[open]').waitFor({state:'hidden'});
  const media=list.locator('[data-unit="A001"] [data-media-kind="floorplan"]');await media.click();await list.locator('#media-dialog[open]').waitFor();
  check('Floorplan thumbnail retains its inspection view',await list.locator('#media-title').innerText().then(s=>s.length>0));
  check('Floorplan inspection does not also open the detail card',await card.locator('#detail-dialog[open]').count()===0);
  await page.keyboard.press('Escape');await list.locator('#media-dialog[open]').waitFor({state:'hidden'});
  const later=list.locator('[data-detail]').last();await later.scrollIntoViewIfNeeded();const beforeScroll=await page.evaluate(()=>scrollY);const laterId=await later.getAttribute('data-detail');
  await later.click();await card.locator('#detail-dialog[open]').waitFor();check('A later apartment opens without navigating away',await card.locator('.detail-apartment-number').innerText()===laterId);
  await page.keyboard.press('Escape');await card.locator('#detail-dialog[open]').waitFor({state:'hidden'});
  check('Closing restores the list browsing position',Math.abs(await page.evaluate(()=>scrollY)-beforeScroll)<=1);
  check('No uncaught browser errors',errors.length===0,errors);
  console.log(JSON.stringify({mode:preview?'shared-preview':'real-react-framer-modules',passed:checks.length,checks}));
}finally{
  await writeFile(new URL((preview?'preview':'framer')+'-results.json',out),JSON.stringify({checks,measurements,errors},null,2)+'\n');await browser.close();
}
