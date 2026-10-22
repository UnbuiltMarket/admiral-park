import assert from 'node:assert/strict';
import {readFile,mkdir,writeFile} from 'node:fs/promises';
import {createRequire} from 'node:module';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

// Exercise the generated Framer component in its real Shadow DOM.
const root=new URL('../',import.meta.url),out=new URL('tmp/mobile-list-check/',root);
const {ts,requireDev}=await import(new URL('scripts/tooling.mjs',root));
const require=createRequire(import.meta.url);
const {chromium}=require(process.env.PLAYWRIGHT_MODULE_PATH||'playwright');
const mediaRoot=process.env.APARTMENT_MEDIA_ROOT||fileURLToPath(new URL('assets/apartment-list/',root));
const compilerOptions={target:ts.ScriptTarget.ES2020,module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.React};
const codes=Object.fromEntries(await Promise.all(['AdmiralApartmentList','AdmiralApartmentDetailCard'].map(async name=>['./'+name+'.tsx',ts.transpileModule(await readFile(new URL('src/framer/'+name+'.tsx',root),'utf8'),{compilerOptions}).outputText])));
const react=await readFile(path.join(path.dirname(requireDev.resolve('react/package.json')),'umd/react.development.js'),'utf8');
const dom=await readFile(path.join(path.dirname(requireDev.resolve('react-dom/package.json')),'umd/react-dom.development.js'),'utf8');
const dataset=JSON.parse(await readFile(new URL('data/apartment-details.json',root),'utf8'));
await mkdir(out,{recursive:true});
const browser=await chromium.launch({headless:true,channel:process.env.PLAYWRIGHT_CHANNEL||'chrome'}),checks=[],measurements=[];
const check=(name,value,detail)=>{assert.ok(value,name+(detail?': '+JSON.stringify(detail):''));checks.push(name);};
const context=await browser.newContext({viewport:{width:390,height:844},locale:'hu-HU'}),page=await context.newPage(),errors=[];
page.on('pageerror',error=>errors.push(error.message));
await page.route('http://mobile-list.test/**',async route=>{
  const pathname=decodeURIComponent(new URL(route.request().url()).pathname);
  if(pathname==='/data.json')return route.fulfill({contentType:'application/json',json:dataset});
  if(pathname.startsWith('/assets/')){
    const relative=pathname.slice(8).replace(/^assets\//,'');assert.ok(!relative.split('/').includes('..'));
    const file=path.join(mediaRoot,relative),contentType={'.webp':'image/webp','.svg':'image/svg+xml','.woff2':'font/woff2'}[path.extname(file)]||'application/octet-stream';
    try{return await route.fulfill({contentType,body:await readFile(file)});}catch(error){if(error.code==='ENOENT')return route.fulfill({status:404,body:'Missing test asset'});throw error;}
  }
  return route.fulfill({contentType:'text/html',body:'<!doctype html><meta name="viewport" content="width=device-width,initial-scale=1"><style>body{margin:0}</style><div id="mount"></div>'});
});
try{
  await page.goto('http://mobile-list.test/');
  await page.addScriptTag({content:react});await page.addScriptTag({content:dom});
  await page.evaluate(codes=>{
    const stub={RenderTarget:{canvas:'canvas',current:()=> 'preview'},addPropertyControls:()=>{},ControlType:new Proxy({},{get:(_,name)=>name})};
    const cache=new Map(),req=name=>{if(name==='react')return React;if(name==='framer')return stub;if(cache.has(name))return cache.get(name).exports;if(!codes[name])throw Error('Unknown module '+name);const module={exports:{}};cache.set(name,module);new Function('module','exports','require',codes[name])(module,module.exports,req);return module.exports;};
    const component=req('./AdmiralApartmentList.tsx').default;window.fixtureRoot=ReactDOM.createRoot(document.querySelector('#mount'));
    window.fixtureRoot.render(React.createElement(React.StrictMode,null,React.createElement(component,{dataUrl:'http://mobile-list.test/data.json',assetBaseUrl:'http://mobile-list.test/assets/'})));
  },codes);
  const list=page.locator('[data-admiral-apartment-list]');
  await list.locator('#results[aria-busy="false"]').waitFor();
  await page.evaluate(()=>document.fonts.ready);
  check('All 69 original apartments load',await list.locator('[data-unit]').count()===69);
  for(const width of [320,390,430]){
    await page.setViewportSize({width,height:844});
    await list.locator('#mobile-sort-slot #sort').waitFor({state:'attached'});
    await page.waitForTimeout(100);
    const m=await list.evaluate(host=>{
      const r=host.shadowRoot,row=r.querySelector('[data-unit="A001"]'),style=e=>getComputedStyle(e),rect=e=>e.getBoundingClientRect().toJSON();
      const id=row.querySelector('.unit-id-line'),status=row.querySelector('.unit-status'),rooms=row.querySelector('.unit-room-count'),primary=[row.querySelector('.cell-interior'),row.querySelector('.cell-balcony'),row.querySelector('.cell-garden')];
      return {width:innerWidth,pageWidth:document.documentElement.scrollWidth,filter:rect(r.querySelector('.filter-header')),id:rect(id),status:rect(status),statusText:status.textContent,rooms:{rect:rect(rooms),size:parseFloat(style(rooms).fontSize),weight:style(rooms).fontWeight},areas:primary.map(e=>({rect:rect(e),size:parseFloat(style(e.querySelector('.area-number')||e.querySelector('.outdoor-value')).fontSize)})),oldRooms:style(row.querySelector('.cell-rooms')).display,oldStatus:style(row.querySelector('.cell-price .cell-status')).display,oldType:style(row.querySelector('.cell-type')).display,row:rect(row),primaryTexts:primary.map(e=>e.textContent.trim()),plan:rect(row.querySelector('.unit-media')),meta:rect(row.querySelector('.unit-mobile-meta'))};
    });
    measurements.push(m);
    check('No horizontal overflow at '+width,m.pageWidth<=width+1,m);
    check('Collapsed filter is compact and retains a 44px touch target at '+width,m.filter.height>=44&&m.filter.height<=48,m.filter);
    check('Sorting stays inside hidden filters at '+width,!(await list.locator('#sort').isVisible()));
    check('Availability is directly below apartment number at '+width,m.status.top>=m.id.bottom-1&&m.status.top-m.id.bottom<8&&Math.abs(m.status.left-m.id.left)<1,m);
    check('Mobile status appears once at '+width,m.statusText==='Elérhető'&&m.oldStatus==='none',m);
    check('Interior, balcony and garden share the primary row at '+width,Math.max(...m.areas.map(e=>e.rect.top))-Math.min(...m.areas.map(e=>e.rect.top))<=1,m.areas);
    check('Rooms are small secondary metadata at '+width,m.rooms.size<=11&&m.areas.every(e=>e.size>=m.rooms.size+7)&&m.oldRooms==='none',m);
    check('Mobile gross-price heading is absent at '+width,await list.locator('[data-unit="A001"] .cell-price').evaluate(e=>getComputedStyle(e,'::before').display==='none'));
    check('Identity metadata fits alongside floorplan at '+width,m.meta.right<=width&&m.meta.bottom<=m.plan.bottom+1,m);
    await page.screenshot({path:fileURLToPath(new URL('framer-list-'+width+'.png',out))});
    await list.locator('#mobile-filters').click();
    check('Filter disclosure announces expanded state at '+width,await list.locator('#mobile-filters').getAttribute('aria-expanded')==='true');
    check('Sorting is visible in expanded filters at '+width,await list.locator('#mobile-sort-slot #sort').isVisible());
    if(width===390)await page.screenshot({path:fileURLToPath(new URL('framer-list-390-filters-open.png',out))});
    await list.locator('#sort').selectOption('price-asc');
    const visibleIds=await list.locator('[data-unit]').evaluateAll(rows=>rows.map(row=>row.dataset.unit));
    const expected=dataset.apartments.toSorted((a,b)=>(a.price==null&&b.price!=null?1:b.price==null&&a.price!=null?-1:(a.price??0)-(b.price??0))||a.id.localeCompare(b.id,'hu',{numeric:true})).map(a=>a.id);
    check('Price sorting works from mobile filters at '+width,JSON.stringify(visibleIds)===JSON.stringify(expected));
    await list.locator('#status').selectOption('available');
    await list.locator('#status').dispatchEvent('input');
    check('Availability filter still works at '+width,await list.locator('[data-unit]').count()===dataset.apartments.filter(a=>a.status==='available').length);
    await list.locator('#reset').click();
    await list.locator('#mobile-filters').click();
  }
  await page.setViewportSize({width:1440,height:1000});
  await list.locator('#desktop-sort-slot #sort').waitFor({state:'visible'});
  const desktop=await list.evaluate(host=>{const r=host.shadowRoot,row=r.querySelector('[data-unit="A001"]');return {headers:[...r.querySelectorAll('thead th')].map(e=>e.getBoundingClientRect().height),unitStatus:getComputedStyle(row.querySelector('.unit-status')).display,metadata:getComputedStyle(row.querySelector('.unit-mobile-meta')).display,priceStatus:getComputedStyle(row.querySelector('.cell-price .cell-status')).display,rooms:getComputedStyle(row.querySelector('.cell-rooms')).display,emptyGarden:getComputedStyle(r.querySelector('.empty-garden')).display};});
  check('Desktop table headings and original status/room columns remain',desktop.headers.length===8&&desktop.headers.every(h=>h>0)&&desktop.unitStatus==='none'&&desktop.metadata==='none'&&desktop.priceStatus!=='none'&&desktop.rooms!=='none'&&desktop.emptyGarden==='none',desktop);
  await list.locator('#sort').selectOption('area-desc');
  check('Desktop sorting remains functional',(await list.locator('[data-unit]').first().getAttribute('data-unit'))===dataset.apartments.toSorted((a,b)=>(b.areaInterior||0)-(a.areaInterior||0)||a.id.localeCompare(b.id,'hu',{numeric:true}))[0].id);
  await page.screenshot({path:fileURLToPath(new URL('framer-list-1440.png',out))});
  await page.setViewportSize({width:390,height:844});
  await list.locator('#mobile-sort-slot #sort').waitFor({state:'attached'});
  await list.locator('#mobile-filters').click();
  check('Sort selection persists after mobile/desktop changes',await list.locator('#sort').inputValue()==='area-desc');
  check('Only one functional sorting select exists',await list.locator('#sort').count()===1);
  await list.locator('#reset').click();
  await list.locator('[data-detail="A001"]').click();
  const card=page.locator('[data-orbit-detail-card]');
  await card.locator('#detail-dialog[open]').waitFor();
  check('Mobile apartment ID still opens shared A001 detail card',await card.locator('.detail-apartment-number').textContent()==='A001');
  check('No uncaught browser errors',errors.length===0,errors);
  await writeFile(new URL('report.json',out),JSON.stringify({checks,measurements},null,2));
  console.log(JSON.stringify({checks:checks.length,screenshots:fileURLToPath(out)}));
}finally{await context.close();await browser.close();}
