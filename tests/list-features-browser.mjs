import assert from 'node:assert/strict';
import {readFile,mkdir,writeFile} from 'node:fs/promises';
import {createRequire} from 'node:module';
import path from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';

const root=new URL('../',import.meta.url),out=new URL('tmp/list-features-check/',root);
const {ts,requireDev}=await import(new URL('scripts/tooling.mjs',root));
const require=createRequire(import.meta.url);
const {chromium}=require(process.env.PLAYWRIGHT_MODULE_PATH||'playwright');
const preview=process.env.LIST_FEATURES_PREVIEW_URL||'';
const mediaRoot=process.env.APARTMENT_MEDIA_ROOT||fileURLToPath(new URL('assets/apartment-list/',root));
const pdfTools=process.env.PDF_TOOLS_ROOT||fileURLToPath(new URL('tmp/pdf-tools/',root));
const compilerOptions={target:ts.ScriptTarget.ES2020,module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.React};
const codes=Object.fromEntries(await Promise.all(['AdmiralApartmentList','AdmiralApartmentDetailCard'].map(async name=>['./'+name+'.tsx',ts.transpileModule(await readFile(new URL('src/framer/'+name+'.tsx',root),'utf8'),{compilerOptions}).outputText])));
const react=await readFile(path.join(path.dirname(requireDev.resolve('react/package.json')),'umd/react.development.js'),'utf8');
const dom=await readFile(path.join(path.dirname(requireDev.resolve('react-dom/package.json')),'umd/react-dom.development.js'),'utf8');
const dataset=JSON.parse(await readFile(new URL('data/apartment-details.json',root),'utf8'));
await mkdir(out,{recursive:true});
const browser=await chromium.launch({headless:true,channel:process.env.PLAYWRIGHT_CHANNEL||'chrome'}),checks=[];
const check=(name,value)=>{assert.ok(value,name);checks.push(name);};
const pause=ms=>new Promise(resolve=>setTimeout(resolve,ms));
let parser;
async function pdfText(download,id,suffix=''){
  assert.equal(download.suggestedFilename(),`Admiral-Park-${id}-adatlap.pdf`);
  const file=new URL(`${preview?'preview':'framer'}-${id}${suffix}.pdf`,out);await download.saveAs(fileURLToPath(file));
  const bytes=await readFile(file);assert.equal(bytes.subarray(0,5).toString(),'%PDF-');assert.ok(bytes.length>15000&&bytes.length<2000000);
  if(!parser){const folder=path.dirname(require.resolve(process.env.PLAYWRIGHT_MODULE_PATH||'playwright'));parser=await import(pathToFileURL(process.env.PDFJS_MODULE_PATH||require.resolve('pdfjs-dist/legacy/build/pdf.mjs',{paths:[folder]})).href);}
  const pdf=await parser.getDocument({data:new Uint8Array(bytes),useSystemFonts:true}).promise;
  try{assert.equal(pdf.numPages,1);const p=await pdf.getPage(1);check(id+' exports one landscape card',p.view[2]>p.view[3]);const text=(await p.getTextContent()).items.map(item=>item.str||'').join(' ').replace(/\s+/g,' ');check(id+' PDF has selectable unit number',text.includes(id));if(!preview){const ops=await p.getOperatorList();check(id+' PDF inherits the list accent theme',ops.fnArray.some((op,i)=>op===parser.OPS.setFillRGBColor&&/127,85,51|#7f5533/i.test(JSON.stringify(ops.argsArray[i]))));}return text;}finally{await pdf.destroy();}
}
async function fixture(options={}){
  const context=await browser.newContext({viewport:options.viewport||{width:1440,height:900},locale:'hu-HU'}),page=await context.newPage();
  const errors=[],requests=[],pdfRequests=[];
  page.on('pageerror',error=>errors.push(error.message));page.on('request',request=>{if(/(?:apartment-details|apartments)\.json(?:\?|$)/.test(request.url()))requests.push(request.url());if(/datasheets\/types\/.*\.pdf/.test(request.url()))pdfRequests.push(request.url());});
  await page.addInitScript(()=>{Object.defineProperty(navigator,'share',{value:undefined,configurable:true});});
  await page.route(/https:\/\/(?:cdn\.jsdelivr\.net|unpkg\.com)\/(?:npm\/)?(?:pdf-lib@1\.17\.1\/dist\/pdf-lib\.min\.js|@pdf-lib\/fontkit@1\.1\.1\/dist\/fontkit\.umd\.min\.js)(?:\?.*)?$/,async route=>{
    try {
      const body=await readFile(path.join(pdfTools,route.request().url().includes('@pdf-lib/fontkit@')?'fontkit-1.1.1.umd.min.js':'pdf-lib-1.17.1.min.js'));
      return route.fulfill({contentType:'application/javascript',headers:{'Access-Control-Allow-Origin':'*'},body});
    } catch(error) {if(error.code==='ENOENT')return route.continue();throw error;}
  });
  await page.route('http://list-features.test/**',async route=>{
    const url=new URL(route.request().url()),pathname=decodeURIComponent(url.pathname);
    if(pathname==='/apartment-details.json')return route.fulfill({contentType:'application/json',json:dataset});
    if(pathname.startsWith('/assets/')){
      const relative=pathname.slice(8).replace(/^assets\//,'');assert.ok(!relative.split('/').includes('..'));
      const file=path.join(mediaRoot,relative),contentType={'.webp':'image/webp','.png':'image/png','.svg':'image/svg+xml','.ttf':'font/ttf','.woff2':'font/woff2','.pdf':'application/pdf'}[path.extname(file)]||'application/octet-stream';
      return route.fulfill({contentType,body:await readFile(file)});
    }
    return route.fulfill({contentType:'text/html',body:'<!doctype html><meta name="viewport" content="width=device-width,initial-scale=1"><style>body{margin:0;background:#fbfaf8}</style><div id="mount"></div>'});
  });
  await page.goto((preview||'http://list-features.test/')+(options.query||''));
  if(!preview){
    await page.addScriptTag({content:react});await page.addScriptTag({content:dom});
    await page.evaluate(({codes,theme})=>{
      const stub={RenderTarget:{canvas:'canvas',current:()=> 'preview'},addPropertyControls:()=>{},ControlType:new Proxy({},{get:(_,name)=>name})};
      const cache=new Map();const req=name=>{if(name==='react')return React;if(name==='framer')return stub;if(cache.has(name))return cache.get(name).exports;if(!codes[name])throw Error('Unknown module '+name);const module={exports:{}};cache.set(name,module);new Function('module','exports','require',codes[name])(module,module.exports,req);return module.exports;};
      const component=req('./AdmiralApartmentList.tsx').default;window.root=ReactDOM.createRoot(document.querySelector('#mount'));
      window.fixtureProps={dataUrl:'http://list-features.test/apartment-details.json',assetBaseUrl:'http://list-features.test/assets/',pageUrl:'http://list-features.test/lista',detailColors:theme||{top:'#eedddd',bottom:'#ddddff'},colors:{accent:'#7f5533'}};
      window.renderFixture=()=>window.root.render(React.createElement(React.StrictMode,null,React.createElement(component,window.fixtureProps)));window.renderFixture();
    },{codes,theme:options.theme});
  }
  const list=page.locator(preview?'#apartment-list':'[data-admiral-apartment-list]'),card=page.locator(preview?'#apartment-card':'[data-orbit-detail-card]');
  await list.locator('#results[aria-busy="false"]').waitFor();
  return {context,page,list,card,errors,requests,pdfRequests,initialRequests:requests.length,async close(){check('No uncaught browser errors',errors.length===0);await context.close();}};
}
async function rowDownload(f,id,suffix=''){
  const button=f.list.locator(`[data-unit="${id}"] [data-download]`);const [download]=await Promise.all([f.page.waitForEvent('download'),button.click()]);const text=await pdfText(download,id,suffix);
  check(id+' row download leaves detail popup closed',await f.card.locator('#detail-dialog[open]').count()===0);
  check(id+' row button restores after PDF generation',await button.getAttribute('aria-busy')===null);
  return text;
}
try{
  const f=await fixture();
  try{
    check('All 69 apartment records load',await f.list.locator('[data-unit]').count()===69);
    const search=f.list.locator('#search');
    await search.fill(' a 0 0 1 ');check('Search accepts spaces and lower case apartment numbers',await f.list.locator('[data-unit]').count()===1&&await f.list.locator('[data-unit="A001"]').count()===1);
    check('Search updates the list URL',new URL(f.page.url()).searchParams.has('search'));
    const searchBox=await search.boundingBox(),buildingBox=await f.list.locator('#building').boundingBox();check('Search shares the primary desktop filter row',Math.abs(searchBox.y-buildingBox.y)<2);
    const first=await rowDownload(f,'A001');check('A001 PDF contains its actual interior area and price',/68[,.]67/.test(first)&&/248[,.]95|248\s?950\s?000/.test(first));
    check('Download retains apartment search',await search.inputValue()===' a 0 0 1 '&&new URL(f.page.url()).searchParams.has('search'));
    await f.list.locator('[data-detail="A001"]').click();await f.card.locator('#detail-dialog[open]').waitFor();
    await f.card.locator('[data-share="A001"]').click();await f.card.locator('.share-popover').waitFor();const share=new URL(await f.card.locator('.share-url').inputValue());check('Shared apartment link excludes search filters',share.searchParams.get('apartment')==='A001'&&!share.searchParams.has('search'));
    await f.page.keyboard.press('Escape');await f.page.keyboard.press('Escape');await f.card.locator('#detail-dialog[open]').waitFor({state:'hidden'});
    await f.list.locator('#reset').click();check('Reset clears number search',await search.inputValue()===''&&!new URL(f.page.url()).searchParams.has('search'));
    await search.fill('A00');check('Partial number search retains several matching units',await f.list.locator('[data-unit]').count()>1);
    await search.fill('A002');const second=await rowDownload(f,'A002');check('Same type exports the selected second apartment price and number',/258[,.]44|258\s?440\s?000/.test(second)&&!second.includes('A001'));
    await f.list.locator('#reset').click();await search.fill('c303');const third=await rowDownload(f,'C303');check('Large apartment has all selected data',/133[,.]48/.test(third)&&/675[,.]65|675\s?654\s?000/.test(third));
    check('Row/card exports reuse the already loaded dataset',f.requests.length===f.initialRequests);check('No generic apartment type PDF requested',f.pdfRequests.length===0);
    await f.list.locator('#reset').click();
    const header=f.list.locator('.apartment-table thead');const headerText=await header.innerText();check('Type has an explicit column heading',/Típus|Type/.test(headerText));
    for(const viewport of [{width:1440,height:900},{width:1000,height:800},{width:390,height:844},{width:320,height:568}]){
      await f.page.setViewportSize(viewport);await pause(100);
      const geometry=await f.list.evaluate(host=>{const root=host.shadowRoot||host;const h=root.querySelector('thead tr'),r=root.querySelector('.apartment-row'),t=r?.querySelector('.cell-type'),p=r?.querySelector('.unit-media');return {viewport:innerWidth,pageWidth:document.documentElement.scrollWidth,heads:h?Array.from(h.children).map(x=>x.getBoundingClientRect().toJSON()):[],rows:r?Array.from(r.children).map(x=>x.getBoundingClientRect().toJSON()):[],typeLabel:t?.dataset.label,type:t?.getBoundingClientRect().toJSON(),plan:p?.getBoundingClientRect().toJSON(),pseudo:t?getComputedStyle(t,'::before').content:null};});
      check('List fits viewport '+viewport.width,geometry.pageWidth<=viewport.width+1);
      if(viewport.width===1440)check('Desktop type heading and row align',Math.abs(geometry.heads[1].x-geometry.rows[1].x)<=1&&Math.abs(geometry.heads[1].width-geometry.rows[1].width)<=1);
      check('Type label is available '+viewport.width,geometry.typeLabel==='Típus');
      if(viewport.width<1300)check('Type keeps clear of the floorplan '+viewport.width,geometry.type.x>=geometry.plan.right-1);
      await f.page.screenshot({path:fileURLToPath(new URL(`${preview?'preview':'framer'}-list-${viewport.width}.png`,out)),fullPage:false});
    }
    await f.page.setViewportSize({width:390,height:844});await f.list.locator('#mobile-filters').click();await search.fill('a001');check('Mobile search remains operable inside the expanded filter header',await f.list.locator('[data-unit]').count()===1);
    await f.page.screenshot({path:fileURLToPath(new URL(`${preview?'preview':'framer'}-list-search-390.png`,out)),fullPage:false});
  }finally{await f.close();}
  // Failure injection exercises the shared exporter, rather than accepting a
  // type-PDF fallback. Retry must keep the list operational and download once.
  const failure=await fixture();
  try{
    let downloads=0;failure.page.on('download',()=>downloads++);
    await failure.page.evaluate(()=>{const original=HTMLCanvasElement.prototype.toBlob;window.pdfCanvasFailures=0;HTMLCanvasElement.prototype.toBlob=function(callback,...args){if(!window.pdfCanvasFailures++){setTimeout(()=>callback(null),50);return;}return original.call(this,callback,...args);};});
    const button=failure.list.locator('[data-unit="A001"] [data-download]');await button.click();await failure.page.waitForFunction(()=>window.pdfCanvasFailures>0);await button.evaluate(element=>new Promise(resolve=>{const done=()=>element.getAttribute('aria-busy')==='true'?requestAnimationFrame(done):resolve();done();}));
    check('A failed row PDF restores download without an incomplete file',downloads===0&&await button.getAttribute('aria-disabled')===null);
    await rowDownload(failure,'A001','-retry');check('Retry downloads exactly one selected unit PDF',downloads===1);check('No generic PDF fallback on failure',failure.pdfRequests.length===0);
  }finally{await failure.close();}
  const linked=await fixture({query:'?search=a002'});try{check('A URL search restores both field and matching apartment',await linked.list.locator('#search').inputValue()==='a002'&&await linked.list.locator('[data-unit]').count()===1&&await linked.list.locator('[data-unit="A002"]').count()===1);await linked.list.locator('[data-remove-filter="search"]').click();check('Removing the search chip restores all units',await linked.list.locator('[data-unit]').count()===69);await linked.list.locator('#search').fill('zzzz');check('Unknown number produces a helpful empty state',await linked.list.locator('.empty-state').isVisible());await linked.list.locator('[data-reset]').click();check('Empty-state reset restores the listing',await linked.list.locator('[data-unit]').count()===69);}finally{await linked.close();}
  if(!preview){
    const stale=await fixture();try{
      let downloads=0;stale.page.on('download',()=>downloads++);
      await stale.page.evaluate(()=>{const nativeFetch=window.fetch.bind(window);window.fetch=(input,options)=>{if(!window.pdfFontGateUsed&&String(input).includes('montserrat-pdf-regular.ttf')){window.pdfFontGateUsed=true;window.pdfFontGatePending=true;return new Promise((resolve,reject)=>{const cancel=()=>{window.pdfFontGateAborted=true;reject(new DOMException('Test export aborted','AbortError'));};if(options?.signal?.aborted)cancel();else options?.signal?.addEventListener('abort',cancel,{once:true});});}return nativeFetch(input,options);};});
      await stale.list.locator('[data-unit="A001"] [data-download]').click();await stale.page.waitForFunction(()=>window.pdfFontGatePending===true);await stale.page.evaluate(()=>window.root.unmount());await stale.page.waitForFunction(()=>window.pdfFontGateAborted===true);await pause(100);check('Unmount cancels a pending row export without a stale download',downloads===0);
    }finally{await stale.close();}
  }
  console.log(JSON.stringify({mode:preview?'shared-preview':'real-react-framer-modules',passed:checks.length,checks}));
}finally{
  await writeFile(new URL(`${preview?'preview':'framer'}-results.json`,out),JSON.stringify({checks},null,2)+'\n');await browser.close();
}
