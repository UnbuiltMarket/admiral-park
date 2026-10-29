/* ADMIRAL_FONT_LOADER_START */
function ensureAdmiralFont(folder) {
  if (typeof window === 'undefined' || !window.FontFace || !document.fonts || !folder) return Promise.resolve();
  const cache = window[Symbol.for('admiral-park:montserrat-fonts')] ||= new Map();
  if (cache.has(folder)) return cache.get(folder);
  const sources = [
    ['montserrat-latin-ext-variable.woff2', 'U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C4,U+2113,U+2C60-2C7F,U+A720-A7FF'],
    ['montserrat-latin-variable.woff2', 'U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD'],
  ];
  const loaded = Promise.allSettled(sources.map(([file, unicodeRange]) => {
    const face = new FontFace('Montserrat', 'url("' + new URL(file, folder).href + '")', {style: 'normal', weight: '100 900', display: 'swap', unicodeRange});
    document.fonts.add(face);
    return face.load();
  }));
  cache.set(folder, loaded);
  return loaded;
}
/* ADMIRAL_FONT_LOADER_END */

export function mountApartmentList(root = document, config = {}) {
const $ = (id) => root.querySelector(`#${id}`);
const lifecycle = new AbortController();
const signal = lifecycle.signal;
const events = {signal};
const esc = (value) => String(value ?? '').replace(/[&<>"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const number = new Intl.NumberFormat('hu-HU', {maximumFractionDigits: 2});
const priceNumber = new Intl.NumberFormat('hu-HU', {maximumFractionDigits: 0});
const area = (value) => Number.isFinite(value) ? `${number.format(value)} m²` : 'Nincs adat';
const price = (value) => Number.isFinite(value) ? `${priceNumber.format(value)} Ft` : 'Ár kérésre';
const apartmentPrice = (a) => a.price == null && a.status === 'sold' ? 'Nincs megadva' : price(a.price);
const floorText = (a) => a.floorLabel || (a.floor === 0 ? 'Földszint' : a.floor == null ? 'Nincs adat' : `${a.floor}. emelet`);
const labels = {available:'Elérhető', under_negotiation:'Tárgyalás alatt', reserved:'Egyeztetés alatt', sold:'Elkelt', unknown:'Érdeklődjön'};
const statusText = (a) => a.statusLabel || labels[a.status] || labels.unknown;
function assetUrl(value) {
  if(typeof value!=='string'||!value.trim())return null;
  const input=value.trim();
  try {
    if(/^[a-z][a-z\d+.-]*:/i.test(input)) {const direct=new URL(input);return ['http:','https:'].includes(direct.protocol)?direct.href:null;}
    let base=document.baseURI, relative=input;
    if(typeof config.assetBaseUrl==='string'&&config.assetBaseUrl.trim()) {
      const custom=new URL(config.assetBaseUrl.trim(),document.baseURI);
      if(!['http:','https:'].includes(custom.protocol))return null;
      if(!custom.pathname.endsWith('/'))custom.pathname+='/';
      base=custom.href;relative=relative.replace(/^\.?\/?assets\//,'');
    } else if(typeof config.dataUrl==='string'&&/^https?:\/\//i.test(config.dataUrl))base=new URL('.',config.dataUrl).href;
    const resolved=new URL(relative,base);
    return ['http:','https:'].includes(resolved.protocol)?resolved.href:null;
  }catch{return null;}
}
const montserratFolder=assetUrl('assets/fonts/montserrat/');
ensureAdmiralFont(montserratFolder);
const embed = !!config.embed;
const useUrl = !embed && !config.disableUrl;
const filterIds = ['search','building','floor','rooms','status','minArea','maxArea','minPrice','maxPrice','terrace','garden','favoritesOnly'];
const checks = new Set(['terrace','garden','favoritesOnly']);
const numericFilters = new Set(['minArea','maxArea','minPrice','maxPrice']);
const rangeGroups = [
  {min:'minArea',max:'maxArea',field:'areaInterior',divisor:1,unit:'m²',output:'area-range-value'},
  {min:'minPrice',max:'maxPrice',field:'price',divisor:1000000,unit:'M Ft',output:'price-range-value'},
];
const rangeBounds = new Map();
const defaults = Object.fromEntries(filterIds.map(k => [k, checks.has(k) ? false : '']));
let state = {...defaults, sort:'id'};
let apartments = [], data, apartmentsReady = false, selected = new Set(), favorites = new Set(), toastTimer, mediaView=null, mediaSequence=0, rangeDrag=null;
const dialogFocus=new WeakMap(), dialogStack=[], downloadUrls=new Set();
const modalRegistry=window[Symbol.for('admiral-park:open-dialogs')] ||= new Set();
const modalScroll=window[Symbol.for('admiral-park:scroll-lock')] ||= {locked:false,value:'',priority:'',watched:new WeakSet()};
const dialogs=[$('compare-dialog'),$('media-dialog')].filter(Boolean);
let apartmentFocus=null,currentApartmentId=null,rowInquiryOpen=null;
let storage = true;
try { const stored = JSON.parse(localStorage.getItem('admiral-park:favorites:v1') || '[]'); if (Array.isArray(stored)) favorites = new Set(stored.filter(x => typeof x === 'string')); } catch { storage = false; }

function toast(message) {
  $('toast').textContent = message;
  $('toast').classList.add('visible');
  clearTimeout(toastTimer); toastTimer = setTimeout(() => $('toast').classList.remove('visible'), 4200);
}
function readUrl() {
  if (!useUrl) return;
  const p = new URL(location.href).searchParams;
  for (const id of filterIds) {
    if (checks.has(id)) state[id] = p.get(id) === '1';
    else if (numericFilters.has(id)) state[id] = p.has(id) && /^\d+(?:\.\d+)?$/.test(p.get(id)) ? p.get(id) : '';
    else state[id] = p.get(id) || '';
  }
  if ([...$('sort').options].some(o=>o.value===p.get('sort'))) state.sort = p.get('sort');
}
function writeUrl() {
  if (!useUrl) return;
  const u = new URL(location.href);
  for (const id of filterIds) { const v = state[id]; if (v !== '' && v !== false) u.searchParams.set(id, checks.has(id) ? '1' : v); else u.searchParams.delete(id); }
  if(state.sort !== 'id') u.searchParams.set('sort', state.sort); else u.searchParams.delete('sort');
  try { history.replaceState(null, '', u); } catch {}
}
function syncControls() {
  for (const id of [...filterIds,'sort']) {
    if (numericFilters.has(id)) continue;
    if (checks.has(id)) $(id).checked = !!state[id];
    else { $(id).value = state[id]; if ($(id).tagName === 'SELECT' && !$(id).value) { state[id] = ''; $(id).value = ''; } }
  }
  syncRanges();
}
function setupRanges() {
  for (const group of rangeGroups) {
    const values=apartments.map(a=>a[group.field]).filter(hasNumber).map(value=>value/group.divisor);
    const min=values.length?Math.floor(Math.min(...values)):0;
    const max=values.length?Math.max(min+1,Math.ceil(Math.max(...values))):1;
    rangeBounds.set(group.min,{min,max});
    for(const id of [group.min,group.max]) {$(id).min=String(min);$(id).max=String(max);$(id).disabled=!values.length;}
  }
}
function syncRanges() {
  for (const group of rangeGroups) {
    const bounds=rangeBounds.get(group.min);if(!bounds)continue;
    const clamp=value=>Math.max(bounds.min,Math.min(bounds.max,Math.round(Number(value))));
    let low=state[group.min]===''?bounds.min:clamp(state[group.min]);
    const high=state[group.max]===''?bounds.max:clamp(state[group.max]);
    low=Math.min(low,high);
    state[group.min]=low===bounds.min?'':String(low);
    state[group.max]=high===bounds.max?'':String(high);
    for(const [id,value] of [[group.min,low],[group.max,high]]) {
      $(id).value=String(value);$(id).setAttribute('aria-valuetext',`${number.format(value)} ${group.unit}`);
    }
    $(group.output).textContent=`${number.format(low)} – ${number.format(high)} ${group.unit}`;
    const track=$(group.min).closest('.range-slider');
    track.dataset.minAtMax=String(low===bounds.max);
    $(group.min).setAttribute('aria-valuemax',String(high));
    $(group.max).setAttribute('aria-valuemin',String(low));
    track.style.setProperty('--range-start',`${(low-bounds.min)/(bounds.max-bounds.min)*100}%`);
    track.style.setProperty('--range-end',`${(high-bounds.min)/(bounds.max-bounds.min)*100}%`);
  }
}
function updateRange(id) {
  const group=rangeGroups.find(group=>group.min===id||group.max===id);
  if(!group||!rangeBounds.has(group.min))return;
  const value=Number($(id).value);
  state[id]=String(id===group.min?Math.min(value,Number($(group.max).value)):Math.max(value,Number($(group.min).value)));
  syncRanges();
}
function setupOptions(id, options) {
  const select = $(id);
  select.replaceChildren(new Option('Összes', ''), ...options.map(([v,l]) => new Option(l,v)));
}
const byId = (id) => apartments.find(a => a.id === id);
const hasNumber = (v) => typeof v === 'number' && Number.isFinite(v);
function normalizeApartmentSearch(value) {
  return String(value ?? '').normalize('NFKC').replace(/[\s.\-_–—]/g,'').toUpperCase();
}
function matches(a) {
  const query=normalizeApartmentSearch(state.search);
  if(query&&!normalizeApartmentSearch(a.id).includes(query))return false;
  if (state.building && a.building !== state.building) return false;
  if (state.floor !== '' && a.floor !== Number(state.floor)) return false;
  if (state.rooms && (state.rooms === '4+' ? !(a.rooms >= 4) : a.rooms !== Number(state.rooms))) return false;
  if (state.status && a.status !== state.status) return false;
  if (state.terrace && !(a.areaTerrace > 0)) return false;
  if (state.garden && !(a.areaGarden > 0)) return false;
  if (state.favoritesOnly && !favorites.has(a.id)) return false;
  for (const [key, field, direction, mult] of [['minArea','areaInterior',1,1],['maxArea','areaInterior',-1,1],['minPrice','price',1,1000000],['maxPrice','price',-1,1000000]]) {
    if (state[key] !== '' && (!hasNumber(a[field]) || direction * a[field] < direction * Number(state[key]) * mult)) return false;
  }
  return true;
}
function sorted(list) {
  const [key, direction] = state.sort === 'floor' ? ['floor','asc'] : state.sort.split('-');
  const field = {price:'price',area:'areaInterior',floor:'floor'}[key];
  return list.sort((a,b) => {
    if (!field) return a.id.localeCompare(b.id, 'hu', {numeric:true});
    const av=a[field],bv=b[field];
    if(av == null && bv != null) return 1;
    if(bv == null && av != null) return -1;
    return (av == null ? 0 : (av-bv)*(direction==='desc'?-1:1)) || a.id.localeCompare(b.id,'hu',{numeric:true});
  });
}
const svg = (name) => name === 'heart' ? '<svg viewBox="0 0 24 24" width="19" height="19" aria-hidden="true"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>' : '<span aria-hidden="true">↗</span>';
const downloadIcon='<svg viewBox="0 0 20 20" width="15" height="15" fill="none" aria-hidden="true"><path d="M10 2v10m-4-4 4 4 4-4M3 13v4h14v-4" stroke="currentColor" stroke-width="1.2"/></svg>';
function mediaEntries(a) {
  return [['floorplan','Alaprajz'],['floorLayout','Szintrajz']].flatMap(([key,name])=>{
    const source=a.media?.[key] || (key==='floorplan'&&a.floorplan?{full:a.floorplan}:null);
    const full=assetUrl(source?.full);if(!full)return [];
    let label=typeof source.label==='string'&&source.label.trim()?source.label.trim():name;
    if(key==='floorplan'&&a.apartmentType)label=`${a.apartmentType} típus`;
    return [{key,name,label,full,thumbnail:assetUrl(source.thumbnail),isIllustrative:!!source.isIllustrative}];
  });
}
function previewButton(a,item) {
  return `<button class="media-preview" data-media="${esc(a.id)}" data-media-kind="${item.key}" title="${esc(item.label)}" aria-label="${esc(a.id)} – ${esc(item.name)} megnyitása: ${esc(item.label)}"><span class="preview-visual">${item.thumbnail?`<img src="${esc(item.thumbnail)}" alt="" loading="lazy" decoding="async" data-thumbnail><span class="preview-unavailable" hidden>Megnyitás</span>`:'<span class="preview-unavailable">Megnyitás</span>'}</span></button>`;
}

function downloadLink(a) {
  return `<span class="download-wrap"><button type="button" class="datasheet-link action-pill" data-download="${esc(a.id)}" aria-label="${esc(a.id)} lakás adatlapjának letöltése PDF formátumban" title="Lakásadatlap letöltése">${downloadIcon}<span>Adatlap</span></button></span>`;
}
function safeInquiryUrl(value) {
  if(typeof value!=='string'||!value.trim())return null;
  try {const url=new URL(value.trim(),document.baseURI);return ['http:','https:'].includes(url.protocol)?url:null;}catch{return null;}
}
function rowInquiry(a) {
  const url=safeInquiryUrl(config.inquiryUrl);
  const attributes={'aria-label':`Érdeklődöm a(z) ${a.id} lakásról`};
  if(url){url.searchParams.set('apartment',a.id);return renderFrostedButton({label:'Érdeklődöm',href:url.href,className:'inquiry-link action-pill',attributes:{...attributes,target:'_blank',rel:'noopener noreferrer'}});}
  const id=`row-inquiry-${encodeURIComponent(a.id)}`;
  const button=renderFrostedButton({label:'Érdeklődöm',className:'inquiry-link action-pill',attributes:{...attributes,'data-row-inquiry':a.id,'aria-expanded':'false','aria-controls':id}});
  return `<span class="row-inquiry-wrap">${button}<span class="row-inquiry-pending" id="${esc(id)}" role="region" aria-label="${esc(a.id)} kapcsolatfelvétel" hidden><button type="button" class="row-inquiry-close" data-inquiry-close aria-label="Kapcsolatfelvételi üzenet bezárása">×</button><strong>${esc(a.id)}</strong><span>A kapcsolatfelvétel hamarosan elérhető.</span><button type="button" class="inquiry-copy" data-copy-inquiry="${esc(a.id)}">Lakásadatok másolása</button></span></span>`;
}
function closeRowInquiry(restore=false) {
  if(!rowInquiryOpen)return;
  const {trigger,panel}=rowInquiryOpen;rowInquiryOpen=null;panel.hidden=true;trigger.setAttribute('aria-expanded','false');
  if(restore&&trigger.isConnected)trigger.focus({preventScroll:true});
}
function toggleRowInquiry(trigger) {
  const wasOpen=rowInquiryOpen?.trigger===trigger;closeRowInquiry();if(wasOpen)return;
  const wrap=trigger.closest('.row-inquiry-wrap'),panel=wrap.querySelector('.row-inquiry-pending');
  wrap.removeAttribute('data-below');panel.hidden=false;trigger.setAttribute('aria-expanded','true');
  if(panel.getBoundingClientRect().top<8)wrap.dataset.below='true';
  rowInquiryOpen={trigger,panel,wrap};
}
async function copyInquiry(a) {
  const link=safeInquiryUrl(config.pageUrl)||new URL(location.href);
  for(const key of [...filterIds,'sort'])link.searchParams.delete(key);
  link.searchParams.set('apartment',a.id);
  const text=`Érdeklődöm az Admiral Park ${a.id} lakása iránt.\n${a.building} épület, ${floorText(a)}\nNettó alapterület: ${area(a.areaInterior)}\nTerasz: ${area(a.areaTerrace)}${hasNumber(a.areaGarden)&&a.areaGarden>0?`\nKert: ${area(a.areaGarden)}`:''}\nBruttó ár: ${apartmentPrice(a)}\n${link.href}`;
  try {await navigator.clipboard.writeText(text);if(!signal.aborted)toast('A vágólapra másoltuk.');}
  catch {
    if(signal.aborted)return;
    const previous=root.activeElement||document.activeElement,helper=document.createElement('textarea');
    helper.value=text;helper.setAttribute('aria-label','Másolható lakásadatok');helper.style.cssText='position:fixed;top:20px;left:20px;z-index:99999;width:80%;height:80px';
    root.querySelector('main').append(helper);helper.focus({preventScroll:true});helper.select();
    let copied=false;try{copied=document.execCommand('copy');}catch{}helper.remove();previous?.focus({preventScroll:true});
    toast(copied?'A vágólapra másoltuk.':'A böngésző nem engedélyezte a másolást.');
  }
}
function saveButton(a) { const saved=favorites.has(a.id); return `<button type="button" class="save-button ${saved?'is-saved':''}" data-save="${esc(a.id)}" aria-label="${esc(a.id)} ${saved?'eltávolítása a kedvencekből':'mentése a kedvencekhez'}" aria-pressed="${saved}">${svg('heart')}</button>`; }
function compareToggle(a) { return `<button type="button" class="compare-toggle action-pill" data-compare="${esc(a.id)}" aria-label="${esc(a.id)} összehasonlítása" aria-pressed="${selected.has(a.id)}"><svg viewBox="0 0 20 20" width="14" height="14" fill="none" aria-hidden="true"><path d="${selected.has(a.id)?'m4 10 4 4 8-8':'M10 4v12M4 10h12'}" stroke="currentColor" stroke-width="1.2"/></svg><span>Összevetés</span></button>`; }
function rowArea(value) {
  return hasNumber(value) ? `<span class="area-number">${number.format(value)}</span> <span class="area-unit">m²</span>` : '<span class="value-missing">Nincs adat</span>';
}
function row(a) {
  const media=mediaEntries(a);
  const floorplan=media.find(item=>item.key==='floorplan'),floorLayout=media.find(item=>item.key==='floorLayout');
  return `<tr class="apartment-row" data-unit="${esc(a.id)}">
    <td class="cell-unit" data-label="Lakás"><div class="unit-summary"><div class="unit-media">${floorplan?previewButton(a,floorplan):''}</div><div class="unit-identification"><div class="unit-id-line"><button type="button" class="unit-id unit-open" data-detail="${esc(a.id)}" aria-label="${esc(a.id)} lakás részleteinek megnyitása" aria-haspopup="dialog">${esc(a.id)}</button>${saveButton(a)}</div><span class="unit-status status-pill status-${esc(a.status)}">${esc(statusText(a))}</span><span class="unit-mobile-meta"><span>${esc(a.building)} épület · ${esc(floorText(a))}</span><span class="unit-room-count">${a.rooms == null ? esc(a.layoutLabel || 'Nincs szobaadat') : `${number.format(a.rooms)} szoba`}${a.apartmentType?` · ${esc(a.apartmentType)} típus`:''}</span></span></div></div></td>
    <td class="cell-type" data-label="Típus"><span class="unit-type" aria-label="${esc(a.apartmentType||'')} lakástípus">${esc(a.apartmentType||'')}</span></td>
    <td class="cell-rooms" data-label="Szobák">${a.rooms == null ? `<span title="${esc(a.layoutLabel || 'Nincs adat')}">${esc(a.layoutLabel || 'Nincs adat')}</span>` : number.format(a.rooms)}</td>
    <td class="cell-area cell-interior" data-label="Beltér"><span class="interior-value">${rowArea(a.areaInterior)}</span></td>
    <td class="cell-outdoor" data-label="Terasz"><div class="outdoor-area cell-balcony"><span class="outdoor-label">Terasz</span><span class="outdoor-value">${rowArea(a.areaTerrace)}</span></div></td>
    <td class="cell-garden${hasNumber(a.areaGarden)&&a.areaGarden>0?'':' empty-garden'}" data-label="Kert">${hasNumber(a.areaGarden)&&a.areaGarden>0?`<span class="outdoor-value garden-value">${rowArea(a.areaGarden)}</span>`:''}</td>
    <td class="cell-price" data-label="Bruttó ár"><span class="price-amount">${apartmentPrice(a)}</span></td>
    <td class="cell-location" data-label="Épület, emelet"><span class="unit-location"><span class="unit-building"><strong>${esc(a.building)}</strong> épület</span><span class="unit-floor">${esc(floorText(a))}</span></span></td>
    <td class="cell-floor-layout" data-label="Szintrajz">${floorLayout?previewButton(a,floorLayout):''}</td>
    <td class="cell-actions"><div class="row-actions"><div class="action-pills">${downloadLink(a)}${compareToggle(a)}${rowInquiry(a)}</div></div></td>
  </tr>`;
}
function renderChips() {
  const titles = {search:'Keresés',building:'Épület',floor:'Emelet',rooms:'Szobák',status:'Státusz',minArea:'Terület ettől',maxArea:'Terület eddig',minPrice:'Ár ettől',maxPrice:'Ár eddig',terrace:'Terasz',garden:'Kert',favoritesOnly:'Kedvencek'};
  $('filter-chips').innerHTML = filterIds.filter(id=>state[id]!=='' && state[id]!==false).map(id=>{
    let value=state[id];
    if($(id).tagName==='SELECT') value=$(id).selectedOptions[0]?.textContent||value;
    else if(id.includes('Area')) value=`${number.format(Number(value))} m²`;
    else if(id.includes('Price')) value=`${number.format(Number(value))} M Ft`;
    return `<button class="filter-chip" data-remove-filter="${id}" aria-label="${esc(titles[id])} szűrő törlése">${esc(titles[id])}${checks.has(id)?'':`: ${esc(value)}`} <span aria-hidden="true">×</span></button>`;
  }).join('');
}
function renderTray() {
  const chosen = [...selected].map(byId).filter(Boolean);
  $('compare-tray').hidden = chosen.length === 0;
  $('compare-tray').innerHTML = `<div><span class="tray-label">ÖSSZEHASONLÍTÁS</span><strong>${chosen.map(a=>esc(a.id)).join(' · ')}</strong><span class="tray-hint">${chosen.length} / 3 lakás</span></div><div><button class="button-secondary" data-clear-compare> Törlés </button><button class="button-primary" data-open-compare ${chosen.length<2?'disabled':''}>Összehasonlítom ${svg('arrow')}</button></div>`;
  resizeEmbed();
}
function render() {
  // Keep keyboard navigation on the same control, or its nearest remaining row.
  const active=root.activeElement||document.activeElement;
  const focusAttribute=['data-sort','data-save','data-detail','data-compare','data-download'].find(name=>active?.hasAttribute?.(name));
  const focus=focusAttribute&&$('results').contains(active)?{attribute:focusAttribute,value:active.getAttribute(focusAttribute),row:[...$('results').querySelectorAll('[data-unit]')].indexOf(active.closest('[data-unit]'))}:null;
  closeRowInquiry();
  const list = sorted(apartments.filter(matches));
  const invalidArea = state.minArea!=='' && state.maxArea!=='' && Number(state.minArea)>Number(state.maxArea);
  const invalidPrice = state.minPrice!=='' && state.maxPrice!=='' && Number(state.minPrice)>Number(state.maxPrice);
  $('result-count').innerHTML = `<strong>${list.length}</strong> lakás${list.length===apartments.length?'':` <span class="result-total">/ ${apartments.length}</span>`}`;
  $('results').innerHTML = list.length ? `<table class="apartment-table"><caption class="sr-only">Lakások. A nettó belső terület, a terasz és a kert külön szerepel, az árak bruttó forintárak.</caption><thead><tr><th scope="col" class="heading-unit">Lakás</th><th scope="col" class="heading-type">Típus</th><th scope="col" class="heading-rooms">Szobák</th><th scope="col" class="heading-interior"><button data-sort="area">Beltér ${state.sort.startsWith('area')?(state.sort.endsWith('desc')?'↓':'↑'):'↕'}</button></th><th scope="col" class="heading-outdoor">Terasz</th><th scope="col" class="heading-garden">Kert</th><th scope="col" class="heading-price"><button data-sort="price">Bruttó ár ${state.sort.startsWith('price')?(state.sort.endsWith('desc')?'↓':'↑'):'↕'}</button></th><th scope="col" class="heading-location">Épület, emelet</th><th scope="col" class="heading-floor-layout">Szintrajz</th><th scope="col" class="heading-actions"><span class="sr-only">Műveletek</span></th></tr></thead><tbody>${list.map(row).join('')}</tbody></table>` : `<div class="empty-state"><span class="empty-mark" aria-hidden="true">⌕</span><h2>${invalidArea||invalidPrice?'Ellenőrizze a megadott tartományt.':'Most nincs ilyen lakás.'}</h2><p>${invalidArea||invalidPrice?'A kezdőérték legyen kisebb vagy egyenlő a záróértékkel.':'Módosítsa a szűrőket, vagy nézze meg a teljes kínálatot.'}</p><button class="button-primary" data-reset>Szűrők törlése</button></div>`;
  $('minArea').setAttribute('aria-invalid', String(invalidArea)); $('maxArea').setAttribute('aria-invalid', String(invalidArea));
  $('minPrice').setAttribute('aria-invalid', String(invalidPrice)); $('maxPrice').setAttribute('aria-invalid', String(invalidPrice));
  $('reset').hidden=!filterIds.some(id=>state[id]!==''&&state[id]!==false)&&state.sort==='id';
  renderChips(); renderTray(); writeUrl(); resizeEmbed();
  $('results').setAttribute('aria-busy','false');
  if(focus){
    const rows=[...$('results').querySelectorAll('[data-unit]')];
    const same=$('results').querySelector(`[${focus.attribute}="${CSS.escape(focus.value)}"]`);
    const neighbor=focus.row>=0?rows[Math.min(focus.row,rows.length-1)]?.querySelector(`[${focus.attribute}]`):null;
    (same||neighbor||$('favoritesOnly'))?.focus({preventScroll:true});
  }
}
function reset() { state={...defaults,sort:'id'}; syncControls(); render(); }
function syncModalState() {
  for(const dialog of modalRegistry)if(!dialog.open||!dialog.isConnected)modalRegistry.delete(dialog);
  const documentDialogs=[...document.querySelectorAll('dialog[open]')],locked=modalRegistry.size>0||documentDialogs.length>0;
  document.body.classList.toggle('dialog-open',locked);
  if(locked&&!modalScroll.locked){
    modalScroll.value=document.body.style.getPropertyValue('overflow');modalScroll.priority=document.body.style.getPropertyPriority('overflow');modalScroll.locked=true;
    document.body.style.setProperty('overflow','hidden',modalScroll.priority);
  }else if(!locked&&modalScroll.locked){
    if(modalScroll.value)document.body.style.setProperty('overflow',modalScroll.value,modalScroll.priority);else document.body.style.removeProperty('overflow');
    modalScroll.locked=false;
  }
  for(const dialog of documentDialogs)if(!modalRegistry.has(dialog)&&!modalScroll.watched.has(dialog)){
    modalScroll.watched.add(dialog);dialog.addEventListener('close',()=>{modalScroll.watched.delete(dialog);syncModalState();},{once:true});
  }
}
function openDialog(dialog) {
  if(!dialog.open) {
    dialogFocus.set(dialog,root.activeElement || document.activeElement);
    dialog.showModal();dialogStack.push(dialog);modalRegistry.add(dialog);
  }
  syncModalState();
  dialog.querySelector('[data-close]')?.focus();
}
function finishDialogClose(dialog) {
  if(dialog.open||(!modalRegistry.has(dialog)&&!dialogStack.includes(dialog)))return;
  modalRegistry.delete(dialog);const position=dialogStack.indexOf(dialog);if(position!==-1)dialogStack.splice(position,1);syncModalState();
  if(dialog.id==='media-dialog'){mediaView=null;dialog.replaceChildren();}
  const top=dialogStack.findLast(item=>item.open),previous=dialogFocus.get(dialog);
  const focus=previous?.isConnected&&(!top||top.contains(previous))?previous:top?.querySelector('[data-close]');
  focus?.focus({preventScroll:true});
}
function closeDialog(dialog) { if(dialog?.open){dialog.close();finishDialogClose(dialog);} }
function detail(id) {
  if(!byId(id))return;
  if(currentApartmentId!==id)apartmentFocus=root.activeElement||document.activeElement;
  currentApartmentId=id;
  if(useUrl){const u=new URL(location.href);u.searchParams.set('apartment',id);try{history.replaceState(null,'',u);}catch{}}
  config.onApartmentOpen?.(id,data);
}
function closeApartment() {
  const id=currentApartmentId;currentApartmentId=null;
  if(useUrl){const u=new URL(location.href);u.searchParams.delete('apartment');try{history.replaceState(null,'',u);}catch{}}
  const fallback=(id?root.querySelector('[data-detail="'+CSS.escape(id)+'"]'):null)||$('favoritesOnly');
  (apartmentFocus?.isConnected?apartmentFocus:fallback)?.focus({preventScroll:true});
  apartmentFocus=null;
}
function refreshFavorites(event = undefined) {
  const previous=[...favorites].sort().join(',');
  let ids=event?.detail?.ids;
  if(!Array.isArray(ids)){try {ids=JSON.parse(localStorage.getItem('admiral-park:favorites:v1')||'[]');}catch{}}
  if(Array.isArray(ids))favorites=new Set(ids.filter(id=>typeof id==='string'&&(!apartmentsReady||byId(id))));
  if(apartmentsReady&&previous!==[...favorites].sort().join(','))render();
}
function showCompare() {
  const chosen=[...selected].map(byId).filter(Boolean); if(chosen.length<2) return;
  const fields=[['Státusz',a=>esc(statusText(a))],['Épület',a=>esc(a.building)],['Emelet',a=>esc(floorText(a))],['Szobák',a=>esc(a.rooms??a.layoutLabel??'Nincs adat')],['Nettó belső alapterület',a=>area(a.areaInterior)],['Terasz',a=>area(a.areaTerrace)],['Kert',a=>hasNumber(a.areaGarden)&&a.areaGarden>0?area(a.areaGarden):''],['Tájolás',a=>esc(a.orientation||'Nincs adat')],['Bruttó vételár',a=>price(a.price)]];
  $('compare-dialog').innerHTML=`<div class="dialog-inner"><header class="dialog-head"><div><div class="eyebrow">AZ ÖN VÁLASZTÁSA</div><h2>Lakások összehasonlítása</h2></div><button class="dialog-close" data-close aria-label="Bezárás">×</button></header><div class="compare-scroll" tabindex="0" role="region" aria-label="Összehasonlító táblázat"><table class="compare-table"><caption class="sr-only">A kiválasztott lakások adatai</caption><thead><tr><th scope="col">Lakás</th>${chosen.map(a=>`<th scope="col">${esc(a.id)}</th>`).join('')}</tr></thead><tbody>${fields.map(([name,fn])=>`<tr><th scope="row">${name}</th>${chosen.map(a=>`<td>${fn(a)}</td>`).join('')}</tr>`).join('')}<tr><th scope="row">Részletek</th>${chosen.map(a=>`<td><button class="details-button" data-from-compare="${esc(a.id)}">Megnézem ${svg('arrow')}</button></td>`).join('')}</tr></tbody></table></div></div>`;
  openDialog($('compare-dialog'));
}
function openMedia(id,kind) {
  const a=byId(id);if(!a)return;
  const entries=mediaEntries(a);if(!entries.length)return;
  mediaView={id,entries,index:Math.max(0,entries.findIndex(item=>item.key===kind)),scale:1,x:0,y:0,drag:null,token:0};
  const dialog=$('media-dialog');
  dialog.innerHTML=`<div class="media-shell"><header class="media-header"><div class="media-heading"><p class="eyebrow">${esc(a.id)} · ${esc(a.building)} ÉPÜLET</p><h2 id="media-title"></h2><p class="media-description" id="media-description"></p></div><div class="media-tabs" role="tablist" aria-label="Rajz kiválasztása">${entries.map((item,index)=>`<button type="button" role="tab" id="media-tab-${item.key}" data-media-tab="${index}" aria-controls="media-image-region" aria-selected="false" tabindex="-1">${esc(item.name)}</button>`).join('')}</div><button class="dialog-close" data-close aria-label="Rajznézet bezárása">×</button></header><div class="media-stage" id="media-image-region" role="tabpanel" tabindex="0" aria-describedby="media-help"><div class="media-canvas"><img class="media-image" alt="" draggable="false" decoding="async"></div><div class="media-load-status" role="status" aria-live="polite"></div></div><footer class="media-footer"><p id="media-help">Nagyítás után húzza a rajzot, vagy használja a nyílbillentyűket.</p><div class="media-zoom" role="group" aria-label="Rajz nagyítása"><button data-zoom="out" aria-label="Kicsinyítés">−</button><button data-zoom="reset" class="zoom-level" aria-label="Nagyítás visszaállítása">100%</button><button data-zoom="in" aria-label="Nagyítás">+</button></div></footer></div>`;
  openDialog(dialog);showMedia(mediaView.index);
}
function showMedia(index) {
  if(!mediaView)return;
  mediaView.index=(index+mediaView.entries.length)%mediaView.entries.length;
  mediaView.scale=1;mediaView.x=0;mediaView.y=0;mediaView.drag=null;
  const current=mediaView.entries[mediaView.index],token=++mediaSequence,dialog=$('media-dialog');mediaView.token=token;
  const image=dialog.querySelector('.media-image'),status=dialog.querySelector('.media-load-status');
  dialog.dataset.loading='true';dialog.dataset.error='false';
  dialog.querySelector('#media-title').textContent=current.name;
  dialog.querySelector('.media-description').textContent=current.label;
  dialog.querySelector('.media-stage').setAttribute('aria-label',`${mediaView.id} – ${current.label}`);
  dialog.querySelector('.media-stage').setAttribute('aria-labelledby',`media-tab-${current.key}`);
  dialog.querySelector('.media-stage').setAttribute('aria-busy','true');
  dialog.querySelectorAll('[data-media-tab]').forEach(button=>{const active=Number(button.dataset.mediaTab)===mediaView.index;button.setAttribute('aria-selected',String(active));button.tabIndex=active?0:-1;});
  image.removeAttribute('src');image.alt=`${mediaView.id} – ${current.label}`;
  status.textContent='Rajz betöltése…';
  image.onload=()=>{
    if(!mediaView||token!==mediaView.token)return;
    dialog.dataset.loading='false';dialog.querySelector('.media-stage').setAttribute('aria-busy','false');status.textContent='';updateMediaTransform();
  };
  image.onerror=()=>{
    if(!mediaView||token!==mediaView.token)return;
    dialog.dataset.loading='false';dialog.dataset.error='true';dialog.querySelector('.media-stage').setAttribute('aria-busy','false');
    status.innerHTML=`<p>A nagy méretű rajz most nem tölthető be.</p><div><button class="button-secondary" data-media-retry>Újrapróbálom</button><a class="button-secondary" href="${esc(current.full)}" target="_blank" rel="noopener">Kép megnyitása új lapon ${svg('arrow')}</a></div>`;
  };
  image.src=current.full;updateMediaTransform();
}
function updateMediaTransform() {
  if(!mediaView)return;
  const dialog=$('media-dialog'),canvas=dialog.querySelector('.media-canvas'),image=dialog.querySelector('.media-image');
  if(!canvas||!image)return;
  const fit=image.naturalWidth?Math.min(canvas.clientWidth/image.naturalWidth,canvas.clientHeight/image.naturalHeight):1;
  const maxX=Math.max(0,(image.naturalWidth*fit*mediaView.scale-canvas.clientWidth)/2),maxY=Math.max(0,(image.naturalHeight*fit*mediaView.scale-canvas.clientHeight)/2);
  mediaView.x=Math.max(-maxX,Math.min(maxX,mediaView.x));mediaView.y=Math.max(-maxY,Math.min(maxY,mediaView.y));
  image.style.transform=`translate(${mediaView.x}px,${mediaView.y}px) scale(${mediaView.scale})`;
  dialog.querySelector('.media-stage').dataset.zoomed=String(mediaView.scale>1);
  const zoom=dialog.querySelector('.zoom-level');zoom.textContent=`${Math.round(mediaView.scale*100)}%`;
  dialog.querySelector('[data-zoom="out"]').disabled=mediaView.scale<=1;
  dialog.querySelector('[data-zoom="in"]').disabled=mediaView.scale>=4;
}
function zoomMedia(action) {
  if(!mediaView)return;
  mediaView.scale=action==='reset'?1:Math.max(1,Math.min(4,mediaView.scale+(action==='in'?.5:-.5)));
  if(mediaView.scale===1){mediaView.x=0;mediaView.y=0;}
  updateMediaTransform();
}
async function downloadDatasheet(id,trigger) {
  if(!byId(id)||trigger.getAttribute("aria-busy")==="true")return;
  trigger.setAttribute("aria-busy","true");trigger.setAttribute("aria-disabled","true");
  try {
    if(typeof config.onApartmentDownload!=="function")throw new Error("Shared apartment PDF exporter unavailable");
    await config.onApartmentDownload(id,data,trigger);
  }catch(error){
    if(!signal.aborted)toast("Nem sikerült elkészíteni a lakás adatlapját. Próbálja újra.");
  }finally{
    trigger.removeAttribute("aria-busy");trigger.removeAttribute("aria-disabled");
  }
}
function resizeEmbed() { if(embed) requestAnimationFrame(()=>{ parent.postMessage({type:'admiral-list-height',height:document.documentElement.scrollHeight,instance:config.instance},'*'); }); }
function syncSortPlacement() {
  const container=root.querySelector('.list-container'),field=$('sort-field');
  const destination=$(container&&container.clientWidth<=600?'mobile-sort-slot':'desktop-sort-slot');
  if(field&&destination&&field.parentElement!==destination)destination.append(field);
}

root.addEventListener('click',event=>{
  const clickedRow=event.target.closest('.apartment-row[data-unit]');
  if(clickedRow&&!event.target.closest('button,a,input,label,select,textarea,[role="button"],.row-inquiry-pending')) {
    const selection=window.getSelection();
    if(selection&&!selection.isCollapsed&&(clickedRow.contains(selection.anchorNode)||clickedRow.contains(selection.focusNode)))return;
    clickedRow.querySelector('[data-detail]')?.focus({preventScroll:true});
    detail(clickedRow.dataset.unit);return;
  }
  const t=event.target.closest('button,a[data-download],[data-close]'); if(!t) return;
  if(t.hasAttribute('data-row-inquiry'))toggleRowInquiry(t);
  if(t.hasAttribute('data-inquiry-close'))closeRowInquiry(true);
  if(t.hasAttribute('data-copy-inquiry')){const a=byId(t.dataset.copyInquiry);if(a)copyInquiry(a);}
  if(t.hasAttribute('data-media'))openMedia(t.dataset.media,t.dataset.mediaKind);
  if(t.hasAttribute('data-media-tab'))showMedia(Number(t.dataset.mediaTab));
  if(t.hasAttribute('data-media-retry')&&mediaView){showMedia(mediaView.index);$('media-dialog').querySelector('.media-stage')?.focus();}
  if(t.hasAttribute('data-zoom'))zoomMedia(t.dataset.zoom);
  if(t.hasAttribute('data-download')){event.preventDefault();downloadDatasheet(t.dataset.download,t);}
  if(t.id==='reset'||t.hasAttribute('data-reset')) reset();
  if(t.id==='mobile-filters') { const open=$('filters').dataset.open!=='true'; $('filters').dataset.open=String(open); t.setAttribute('aria-expanded',String(open)); resizeEmbed(); }
  if(t.hasAttribute('data-remove-filter')) { const id=t.dataset.removeFilter; state[id]=defaults[id]; syncControls(); render(); }
  if(t.hasAttribute('data-sort')) { const key=t.dataset.sort; state.sort=key==='floor'?'floor':`${key}-${state.sort===`${key}-asc`?'desc':'asc'}`; syncControls(); render(); }
  if(t.hasAttribute('data-save')) {
    const id=t.dataset.save; if(favorites.has(id)) favorites.delete(id); else favorites.add(id);
    try{localStorage.setItem('admiral-park:favorites:v1',JSON.stringify([...favorites]));}catch{storage=false;}
    render();
    window.dispatchEvent(new CustomEvent('admiral:apartment-favorites',{detail:{ids:[...favorites]}}));
    toast(favorites.has(id)?`A(z) ${id} lakást elmentettük${storage?'':'. A mentés csak ezen az oldalon marad meg'}.`:`A(z) ${id} lakást eltávolítottuk a kedvencekből.`);
  }
  if(t.hasAttribute('data-detail')) detail(t.dataset.detail);
  if(t.hasAttribute('data-compare')) {
    const id=t.dataset.compare;
    if(selected.has(id))selected.delete(id);
    else {if(selected.size>=3){toast('Legfeljebb 3 lakás hasonlítható össze.');return;}selected.add(id);}
    t.setAttribute('aria-pressed',String(selected.has(id)));t.querySelector('svg path')?.setAttribute('d',selected.has(id)?'m4 10 4 4 8-8':'M10 4v12M4 10h12');renderTray();
  }
  if(t.hasAttribute('data-close')) closeDialog(t.closest('dialog'));
  if(t.hasAttribute('data-clear-compare')) {selected.clear();render();}
  if(t.hasAttribute('data-open-compare')) showCompare();
  if(t.hasAttribute('data-from-compare')) {closeDialog($('compare-dialog'));detail(t.dataset.fromCompare);}
},events);
document.addEventListener('click',event=>{if(rowInquiryOpen&&!event.composedPath().includes(rowInquiryOpen.wrap))closeRowInquiry();},events);
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&rowInquiryOpen){event.preventDefault();closeRowInquiry(true);}},events);
$('filters').addEventListener('submit',e=>e.preventDefault(),events);
$('filters').addEventListener('input',e=>{const id=e.target.id;if(!filterIds.includes(id))return;if(numericFilters.has(id))updateRange(id);else state[id]=checks.has(id)?e.target.checked:e.target.value;render();},events);
function moveRangeOnTrack(event) {
  if(!rangeDrag||rangeDrag.pointerId!==event.pointerId)return;
  const {input,track}=rangeDrag,rect=track.querySelector('.slider-track').getBoundingClientRect();
  const ratio=Math.max(0,Math.min(1,(event.clientX-rect.left)/Math.max(1,rect.width)));
  input.value=String(Number(input.min)+ratio*(Number(input.max)-Number(input.min)));
  updateRange(input.id);render();
}
$('filters').addEventListener('pointerdown',event=>{
  const track=event.target.closest('.range-slider');
  if(!track||event.target.matches('input')||event.button!==0)return;
  const inputs=[...track.querySelectorAll('input[type="range"]')];
  if(inputs.some(input=>input.disabled))return;
  const rect=track.querySelector('.slider-track').getBoundingClientRect();
  const value=Number(inputs[0].min)+(event.clientX-rect.left)/Math.max(1,rect.width)*(Number(inputs[0].max)-Number(inputs[0].min));
  const input=inputs.reduce((closest,item)=>Math.abs(Number(item.value)-value)<Math.abs(Number(closest.value)-value)?item:closest);
  rangeDrag={input,track,pointerId:event.pointerId};track.setPointerCapture(event.pointerId);input.focus();event.preventDefault();moveRangeOnTrack(event);
},events);
$('filters').addEventListener('pointermove',moveRangeOnTrack,events);
for(const name of ['pointerup','pointercancel'])$('filters').addEventListener(name,event=>{if(rangeDrag?.pointerId===event.pointerId)rangeDrag=null;},events);
$('sort').addEventListener('change',e=>{state.sort=e.target.value;render();},events);
root.addEventListener('error',event=>{
  const image=event.target;
  if(image.matches?.('img[data-thumbnail]')){image.hidden=true;const fallback=image.parentElement.querySelector('.preview-unavailable');if(fallback)fallback.hidden=false;}
},{...events,capture:true});
for(const dialog of dialogs) {
  dialog.addEventListener('cancel',e=>{e.preventDefault();closeDialog(dialog);},events);
  dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeDialog(dialog);}},events);
  dialog.addEventListener('close',()=>finishDialogClose(dialog),events);
}
const mediaDialog=$('media-dialog');
mediaDialog?.addEventListener('pointerdown',event=>{
  const stage=event.target.closest('.media-stage');
  if(!stage||!mediaView||mediaView.scale<=1||event.button!==0)return;
  event.preventDefault();stage.focus();stage.setPointerCapture(event.pointerId);
  mediaView.drag={pointerId:event.pointerId,startX:event.clientX,startY:event.clientY,x:mediaView.x,y:mediaView.y};stage.dataset.dragging='true';
},events);
mediaDialog?.addEventListener('pointermove',event=>{
  if(!mediaView?.drag||mediaView.drag.pointerId!==event.pointerId)return;
  mediaView.x=mediaView.drag.x+event.clientX-mediaView.drag.startX;mediaView.y=mediaView.drag.y+event.clientY-mediaView.drag.startY;updateMediaTransform();
},events);
function stopMediaDrag(event) {
  if(!mediaView?.drag||mediaView.drag.pointerId!==event.pointerId)return;
  const stage=mediaDialog.querySelector('.media-stage');mediaView.drag=null;
  if(stage){stage.dataset.dragging='false';if(stage.hasPointerCapture(event.pointerId))stage.releasePointerCapture(event.pointerId);}
}
mediaDialog?.addEventListener('pointerup',stopMediaDrag,events);
mediaDialog?.addEventListener('pointercancel',stopMediaDrag,events);
mediaDialog?.addEventListener('keydown',event=>{
  if(!mediaView)return;
  if(event.target.matches('[role="tab"]')&&['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) {
    event.preventDefault();const index=event.key==='Home'?0:event.key==='End'?mediaView.entries.length-1:mediaView.index+(event.key==='ArrowRight'?1:-1);
    showMedia(index);mediaDialog.querySelector('[role="tab"][aria-selected="true"]')?.focus();return;
  }
  if(['+','=','-','0'].includes(event.key)){event.preventDefault();zoomMedia(event.key==='0'?'reset':event.key==='-'?'out':'in');return;}
  if(!event.target.closest('.media-stage')||!event.key.startsWith('Arrow'))return;
  event.preventDefault();
  if(mediaView.scale<=1){if(['ArrowLeft','ArrowRight'].includes(event.key))showMedia(mediaView.index+(event.key==='ArrowRight'?1:-1));return;}
  const step=event.shiftKey?120:45;
  if(event.key==='ArrowLeft')mediaView.x+=step;if(event.key==='ArrowRight')mediaView.x-=step;
  if(event.key==='ArrowUp')mediaView.y+=step;if(event.key==='ArrowDown')mediaView.y-=step;
  updateMediaTransform();
},events);
window.addEventListener('resize',updateMediaTransform,events);
window.addEventListener('admiral:apartment-favorites',refreshFavorites,events);
window.addEventListener('storage',event=>{if(event.key==='admiral-park:favorites:v1')refreshFavorites();},events);
if(useUrl)window.addEventListener('popstate',()=>{state={...defaults,sort:'id'};readUrl();syncControls();render();const id=new URL(location.href).searchParams.get('apartment');if(id&&byId(id))detail(id);else config.onApartmentClose?.();},events);
if(embed) document.documentElement.classList.add('embedded');
const observer = new ResizeObserver(()=>{syncSortPlacement();resizeEmbed();});
observer.observe(root.host || document.body);
syncSortPlacement();

async function load() {
  $('results').setAttribute('aria-busy','true');
  $('results').innerHTML='<div class="empty-state" role="status"><p>Lakások betöltése…</p></div>';
  try {
    const source=config.dataUrl || './apartments.json';
    const response=await fetch(source,{cache:'no-cache',signal});
    if(!response.ok)throw new Error(`HTTP ${response.status}`);
    data=await response.json();
    if(!data || data.schemaVersion!=='1.0' || !Array.isArray(data.apartments))throw new Error('Nem támogatott adatformátum');
    const ids=new Set();
    for(const a of data.apartments){if(typeof a.id!=='string'||!a.id||ids.has(a.id)||!Object.hasOwn(labels,a.status)||typeof a.building!=='string')throw new Error('Hibás vagy ismétlődő lakásadat');ids.add(a.id);for(const field of ['floor','rooms','areaInterior','areaTerrace','areaGarden','price']){if(a[field]!=null&&(!hasNumber(a[field])||a[field]<0))throw new Error('Hibás számadat');}}
    apartments=data.apartments;
    apartmentsReady=true;
    config.onDataLoaded?.(data);
    // Another tab/component may have saved favourites while this request loaded.
    try {const stored=localStorage.getItem('admiral-park:favorites:v1');if(stored!==null){const latest=JSON.parse(stored);if(Array.isArray(latest))favorites=new Set(latest.filter(id=>typeof id==='string'));}}catch{}
    favorites=new Set([...favorites].filter(id=>ids.has(id)));
    setupOptions('building',[...new Set(apartments.map(a=>a.building))].sort().map(v=>[v,`${v} épület`]));
    setupOptions('floor',[...new Set(apartments.map(a=>a.floor).filter(v=>v!=null))].sort((a,b)=>a-b).map(v=>[String(v),v===0?'Földszint':`${v}. emelet`]));
    setupOptions('rooms',[...new Set(apartments.map(a=>a.rooms).filter(v=>v!=null).map(v=>v>=4?'4+':String(v)))].sort().map(v=>[v,`${v==='4+'?v:number.format(Number(v))} szoba`]));
    setupRanges();readUrl();syncControls();
    $('data-note').textContent='A nettó belső alapterület, a terasz és a kert külön szerepel. Az árak bruttó árak. A helyiségadatok munkaközi tervből származnak; az aktuális árat és elérhetőséget az értékesítő erősíti meg.';
    render();
    const id=config.apartment||(useUrl?new URL(location.href).searchParams.get('apartment'):null);
    if(id&&byId(id))detail(id);
    if(root===document)window.admiralList={getData:()=>structuredClone(data),getState:()=>({...state}),reload:load};
  } catch(error) {
    if(signal.aborted)return;
    $('results').setAttribute('aria-busy','false');
    $('result-count').textContent='Az adatok nem érhetők el';
    $('results').innerHTML='<div class="empty-state" role="alert"><h2>Nem sikerült betölteni a lakáslistát.</h2><p>Próbálja újra néhány pillanat múlva.</p><button class="button-primary" id="retry">Újrapróbálom</button></div>';
    $('retry').addEventListener('click',load); resizeEmbed();
  }
}
load();
const destroy = () => {closeRowInquiry();lifecycle.abort();observer.disconnect();clearTimeout(toastTimer);for(const d of [...dialogs].reverse()){if(d.open)d.close();modalRegistry.delete(d);}for(const url of downloadUrls)URL.revokeObjectURL(url);downloadUrls.clear();mediaView=null;syncModalState();};
return {destroy,closeApartment,refreshFavorites,getData:()=>data,getState:()=>({...state})};
}
