import assert from 'node:assert/strict';
import {readFile,mkdir,writeFile} from 'node:fs/promises';
import {createRequire} from 'node:module';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

// Exercise the generated Framer list, rather than a reconstructed row fixture.
// Preview mode runs the same sizing and interaction checks on its shared adapter.
const root=new URL('../',import.meta.url),out=new URL('tmp/apartment-list-row-check/',root);
const {ts,requireDev}=await import(new URL('scripts/tooling.mjs',root));
const require=createRequire(import.meta.url);
const {chromium}=require(process.env.PLAYWRIGHT_MODULE_PATH||'playwright');
const preview=process.env.ROW_LIST_PREVIEW_URL||'';
const mediaRoot=process.env.APARTMENT_MEDIA_ROOT||fileURLToPath(new URL('assets/apartment-list/',root));
const compilerOptions={target:ts.ScriptTarget.ES2020,module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.React};
const codes=Object.fromEntries(await Promise.all(['AdmiralApartmentList','AdmiralApartmentDetailCard'].map(async name=>['./'+name+'.tsx',ts.transpileModule(await readFile(new URL('src/framer/'+name+'.tsx',root),'utf8'),{compilerOptions}).outputText])));
const react=await readFile(path.join(path.dirname(requireDev.resolve('react/package.json')),'umd/react.development.js'),'utf8');
const dom=await readFile(path.join(path.dirname(requireDev.resolve('react-dom/package.json')),'umd/react-dom.development.js'),'utf8');
const dataset=JSON.parse(await readFile(new URL('data/apartment-details.json',root),'utf8'));
const expectedPrice=value=>new Intl.NumberFormat('hu-HU',{maximumFractionDigits:0}).format(value)+' Ft';
const normalize=text=>text.replace(/\s+/g,' ').trim();
await mkdir(out,{recursive:true});
const mode=preview?'preview':'framer',checks=[],failures=[],measurements=[],errors=[];
const check=(name,passes,detail)=>{checks.push(name);if(!passes)failures.push({name,detail});};
const browser=await chromium.launch({headless:true,channel:process.env.PLAYWRIGHT_CHANNEL||'chrome'});

async function fixture(props={}){
  const context=await browser.newContext({viewport:{width:1440,height:1000},locale:'hu-HU'}),page=await context.newPage();
  page.on('pageerror',error=>errors.push(error.message));
  await page.addInitScript(()=>{Object.defineProperty(navigator,'clipboard',{value:{writeText:async text=>{window.rowInquiryClipboard=text;}},configurable:true});});
  await page.route('http://apartment-row.test/**',async route=>{
    const pathname=decodeURIComponent(new URL(route.request().url()).pathname);
    if(pathname==='/apartment-details.json')return route.fulfill({contentType:'application/json',json:dataset});
    if(pathname.startsWith('/assets/')){
      const relative=pathname.slice(8).replace(/^assets\//,'');assert.ok(!relative.split('/').includes('..'));
      const file=path.join(mediaRoot,relative),contentType={'.webp':'image/webp','.png':'image/png','.svg':'image/svg+xml','.ttf':'font/ttf','.woff2':'font/woff2'}[path.extname(file)]||'application/octet-stream';
      return route.fulfill({contentType,body:await readFile(file)});
    }
    return route.fulfill({contentType:'text/html',body:'<!doctype html><meta name="viewport" content="width=device-width,initial-scale=1"><style>body{margin:0;background:#fcfcfa}</style><div id="mount"></div>'});
  });
  await page.goto(preview||'http://apartment-row.test/');
  if(!preview){
    await page.addScriptTag({content:react});await page.addScriptTag({content:dom});
    await page.evaluate(({codes,props})=>{
      const stub={RenderTarget:{canvas:'canvas',current:()=> 'preview'},addPropertyControls:()=>{},ControlType:new Proxy({},{get:(_,name)=>name})};
      const cache=new Map(),req=name=>{if(name==='react')return React;if(name==='framer')return stub;if(cache.has(name))return cache.get(name).exports;if(!codes[name])throw Error('Unknown module '+name);const module={exports:{}};cache.set(name,module);new Function('module','exports','require',codes[name])(module,module.exports,req);return module.exports;};
      const component=req('./AdmiralApartmentList.tsx').default;
      window.root=ReactDOM.createRoot(document.querySelector('#mount'));
      window.root.render(React.createElement(React.StrictMode,null,React.createElement(component,{dataUrl:'http://apartment-row.test/apartment-details.json',assetBaseUrl:'http://apartment-row.test/assets/',pageUrl:'http://apartment-row.test/lista?search=ignored&sort=price-asc&campaign=retained',...props})));
    },{codes,props});
  }
  const list=page.locator(preview?'#apartment-list':'[data-admiral-apartment-list]'),card=page.locator(preview?'#apartment-card':'[data-orbit-detail-card]');
  await list.locator('#results[aria-busy="false"]').waitFor();await page.evaluate(()=>document.fonts.ready);
  return {context,page,list,card,close:()=>context.close()};
}

try{
  const f=await fixture();
  try{
    check('All 69 apartments remain in the list',await f.list.locator('[data-unit]').count()===69);
    const prices=await f.list.locator('.apartment-row').evaluateAll(rows=>rows.map(row=>({id:row.dataset.unit,text:row.querySelector('.price-amount').textContent})));
    for(const a of dataset.apartments.filter(a=>Number.isFinite(a.price))){const actual=prices.find(row=>row.id===a.id)?.text;check(a.id+' shows its full forint price',normalize(actual||'')===normalize(expectedPrice(a.price)),{actual,expected:expectedPrice(a.price)});}
    const first=f.list.locator('[data-unit="A001"]');
    check('Type has no stacked building or floor beneath it',normalize(await first.locator('.cell-type').innerText())==='B'&&await first.locator('.cell-type .unit-location').count()===0);
    check('Building and floor belong to the apartment identity group',await first.locator('.unit-identification .unit-desktop-location').innerText().then(text=>/A épület\s*·\s*Földszint/.test(normalize(text))));

    // Capture the two priority widths before interaction and before all checks.
    for(const width of [1440,320,1366,1920,1280,1101,1024,390]){
      await f.page.setViewportSize({width,height:width<500?900:1000});await f.page.waitForTimeout(120);
      await f.list.locator('img[data-thumbnail]').evaluateAll(images=>Promise.all(images.filter(image=>{const rect=image.getBoundingClientRect();return rect.width>0&&rect.top<innerHeight&&rect.bottom>0;}).map(image=>image.decode().catch(()=>{}))));
      await f.page.screenshot({path:fileURLToPath(new URL(`${mode}-row-${width}.png`,out)),fullPage:false});
      if(width===1440||width===320)console.log(JSON.stringify({screenshot:fileURLToPath(new URL(`${mode}-row-${width}.png`,out))}));
      const m=await f.list.evaluate(host=>{
        const r=host.shadowRoot||host,rows=[...r.querySelectorAll('.apartment-row')],row=rows[0],rect=e=>e?.getBoundingClientRect().toJSON();
        const headings=[...r.querySelectorAll('thead th')].map(e=>({text:e.textContent.trim(),rect:rect(e),display:getComputedStyle(e).display}));
        const statusIndex=headings.findIndex(e=>e.text==='Elérhetőség'),statusCell=row.children[statusIndex],priceCell=row.querySelector('.price-amount')?.closest('td');
        const pills=[...row.querySelectorAll('.action-pill')].map(e=>({text:e.textContent.trim(),rect:rect(e),bg:getComputedStyle(e).backgroundImage,color:getComputedStyle(e).backgroundColor}));
        const clipping=rows.flatMap(row=>[...row.querySelectorAll('.price-amount,.unit-id,.action-pill,.status-pill')].filter(e=>e.clientWidth>0&&e.scrollWidth>e.clientWidth+1).map(e=>({id:row.dataset.unit,text:e.textContent,client:e.clientWidth,scroll:e.scrollWidth,rect:rect(e)})));
        return {width:innerWidth,pageWidth:document.documentElement.scrollWidth,host:rect(host),row:rect(row),rowHeights:rows.map(e=>e.getBoundingClientRect().height),pills,clipping,headings,priceCell:rect(priceCell),statusCell:rect(statusCell),separateStatus:!!statusCell&&statusCell!==priceCell&&!!statusCell.querySelector('.status-pill'),rowText:row.innerText};
      });
      measurements.push(m);
      check('No horizontal page overflow at '+width,m.pageWidth<=width+1,m);
      check('Full prices and action labels do not clip at '+width,m.clipping.length===0,m.clipping);
      check('Exactly three equal row pills at '+width,m.pills.length===3&&m.pills.every(p=>Math.abs(p.rect.width-m.pills[0].rect.width)<=1&&Math.abs(p.rect.height-m.pills[0].rect.height)<=1),m.pills);
      check('Pills follow datasheet, comparison, inquiry order at '+width,m.pills.map(p=>p.text).join('|')==='Adatlap|Összevetés|Érdeklődöm',m.pills);
      check('Inquiry is the final gold pill at '+width,m.pills[2].text==='Érdeklődöm'&&(m.pills[2].bg!=='none'||m.pills[2].color!=='rgba(0, 0, 0, 0)'),m.pills[2]);
      check('Row does not repeat an Erkély label at '+width,!m.rowText.includes('Erkély'),m.rowText);
      if(width>=1101){
        check('Desktop exposes separate Terasz and Elérhetőség headings at '+width,m.headings.length===9&&m.headings.some(h=>h.text==='Terasz'&&h.display!=='none'&&h.rect.height>0)&&m.headings.some(h=>h.text==='Elérhetőség'&&h.display!=='none'&&h.rect.height>0),m.headings);
        check('Price and availability occupy distinct visible desktop columns at '+width,m.separateStatus&&m.priceCell.width>0&&m.statusCell.width>0&&m.statusCell.left>=m.priceCell.right-1,{price:m.priceCell,status:m.statusCell});
        check('Desktop row height is preserved at '+width,Math.max(...m.rowHeights)<=157,{maxHeight:Math.max(...m.rowHeights)});
        check('Desktop pills stay 112 by 36 at '+width,m.pills.every(p=>Math.abs(p.rect.width-112)<=1&&Math.abs(p.rect.height-36)<=1),m.pills);
      }
      if(width<500)check('Mobile pills retain 44-pixel touch targets at '+width,m.pills.every(p=>p.rect.width>=44&&p.rect.height>=44),m.pills);
    }

    await f.page.setViewportSize({width:1440,height:1000});
    const inquiry=first.locator('[data-row-inquiry]'),panel=first.locator('.row-inquiry-pending');
    await inquiry.click();
    check('Missing contact URL opens an honest inline notice',await panel.isVisible()&&await inquiry.getAttribute('aria-expanded')==='true'&&await panel.innerText().then(text=>text.includes('hamarosan')));
    check('Inquiry notice does not open the detail card',await f.card.locator('#detail-dialog[open]').count()===0);
    await inquiry.click();check('Clicking inquiry again closes its notice',!(await panel.isVisible())&&await inquiry.getAttribute('aria-expanded')==='false');
    await inquiry.click();await f.page.keyboard.press('Escape');
    check('Escape closes inquiry and restores its button focus',!(await panel.isVisible())&&await inquiry.evaluate(e=>e.getRootNode().activeElement===e));
    await inquiry.click();await f.list.locator('#result-count').click();check('Outside click closes the inquiry notice',!(await panel.isVisible()));
    await inquiry.click();await first.locator('[data-copy-inquiry]').click();
    const copied=await f.page.evaluate(()=>window.rowInquiryClipboard||'');
    check('Copying inquiry includes apartment number and full price',copied.includes('A001')&&/248\s?950\s?000 Ft/.test(copied)&&!copied.includes(' M Ft'),copied);
    const copiedUrl=new URL(copied.split('\n').at(-1));
    check('Copied inquiry link identifies the apartment and excludes active filters',copiedUrl.searchParams.get('apartment')==='A001'&&!copiedUrl.searchParams.has('search')&&!copiedUrl.searchParams.has('sort'),copiedUrl.href);
    if(!preview)check('Copied inquiry link preserves unrelated URL parameters',copiedUrl.searchParams.get('campaign')==='retained',copiedUrl.href);
    await f.list.locator('#search').fill('A001');check('Changing filters closes the inquiry notice',await f.list.locator('.row-inquiry-pending:not([hidden])').count()===0);
    check('Inquiry and copy actions keep the card closed',await f.card.locator('#detail-dialog[open]').count()===0);
    const refreshed=f.list.locator('[data-unit="A001"]');
    await refreshed.locator('[data-save]').click();check('Favourite remains operable',await refreshed.locator('[data-save]').getAttribute('aria-pressed')==='true');
    await refreshed.locator('[data-compare]').click();check('Compare confirms selection visually without opening details',await refreshed.locator('[data-compare]').getAttribute('aria-pressed')==='true'&&await refreshed.locator('[data-compare] path').getAttribute('d')==='m4 10 4 4 8-8'&&await f.card.locator('#detail-dialog[open]').count()===0);
    await refreshed.locator('[data-detail]').click();await f.card.locator('#detail-dialog[open]').waitFor();
    check('Apartment number still opens the shared detail card',await f.card.locator('.detail-apartment-number').innerText()==='A001');
    await f.page.keyboard.press('Escape');await f.card.locator('#detail-dialog[open]').waitFor({state:'hidden'});
    check('Closing details preserves browsing filters',await f.list.locator('#search').inputValue()==='A001');
    await refreshed.locator('[data-media-kind="floorplan"]').click();await f.list.locator('#media-dialog[open]').waitFor();
    check('Floorplan inspection remains independent from details',await f.list.locator('#media-title').innerText()==='Alaprajz'&&await f.card.locator('#detail-dialog[open]').count()===0);
    await f.page.keyboard.press('Escape');
  }finally{await f.close();}
  if(!preview){
    const configured=await fixture({inquiryUrl:'https://example.test/contact?campaign=summer&apartment=old#inquiry'});
    try{
      const link=configured.list.locator('[data-unit="A001"] a.inquiry-link'),url=new URL(await link.getAttribute('href'));
      check('Configured inquiry points to the intended apartment',url.origin==='https://example.test'&&url.pathname==='/contact'&&url.searchParams.get('apartment')==='A001',url.href);
      check('Configured inquiry preserves unrelated query and fragment',url.searchParams.get('campaign')==='summer'&&url.hash==='#inquiry',url.href);
      check('Configured inquiry is an ordinary safe external link',await link.getAttribute('target')==='_blank'&&/noopener/.test(await link.getAttribute('rel'))&&await configured.list.locator('[data-unit="A001"] [data-row-inquiry]').count()===0);
    }finally{await configured.close();}
    for(const inquiryUrl of ['javascript:alert(1)','data:text/html,unsafe']){
      const unsafe=await fixture({inquiryUrl});
      try{check('Unsafe inquiry URL falls back to the local notice: '+inquiryUrl,await unsafe.list.locator('[data-unit="A001"] [data-row-inquiry]').count()===1&&await unsafe.list.locator('[data-unit="A001"] a.inquiry-link').count()===0);}finally{await unsafe.close();}
    }
  }
  check('No uncaught browser errors',errors.length===0,errors);
  console.log(JSON.stringify({mode,passed:checks.length-failures.length,checks:checks.length,failures}));
  assert.equal(failures.length,0,JSON.stringify(failures,null,2));
}finally{
  await writeFile(new URL(`${mode}-results.json`,out),JSON.stringify({mode,checks,failures,measurements,errors},null,2)+'\n');await browser.close();
}
