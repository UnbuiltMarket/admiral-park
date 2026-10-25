// Card-only runtime. Shared by the list and orbit; no list/filter/comparison renderer.
function ensureOrbitApartmentCardFont(folder) {
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

function mountOrbitApartmentCardRuntime(root=document,config={}){
const $ = (id) => root.querySelector(`#${id}`);
const lifecycle = new AbortController();
const signal = lifecycle.signal;
const events = {signal};
const esc = (value) => String(value ?? '').replace(/[&<>"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const roomLabel = (value) => String(value ?? '').replace(/terasz/giu, 'Erkély');
const number = new Intl.NumberFormat('hu-HU', {maximumFractionDigits: 2});
const priceNumber = new Intl.NumberFormat('hu-HU', {maximumFractionDigits: 2});
const area = (value) => Number.isFinite(value) ? `${number.format(value)} m²` : 'Nincs adat';
const price = (value) => Number.isFinite(value) ? `${priceNumber.format(value / 1000000)} M Ft` : 'Ár kérésre';
const apartmentPrice = (a) => a.price == null && a.status === 'sold' ? 'Nincs megadva' : price(a.price);
const floorText = (a) => a.floorLabel || (a.floor === 0 ? 'Földszint' : a.floor == null ? 'Nincs adat' : `${a.floor}. emelet`);
const labels = {available:'Elérhető', under_negotiation:'Tárgyalás alatt', sold:'Elkelt', unknown:'Érdeklődjön'};
const statusText = (a) => a.statusLabel || labels[a.status] || labels.unknown;
const safeUrl = (value) => { if (typeof value !== 'string' || !value.trim()) return null; try { const u = new URL(value, location.href); return ['http:', 'https:'].includes(u.protocol) ? u.href : null; } catch { return null; } };
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
ensureOrbitApartmentCardFont(montserratFolder).then(()=>{if(!signal.aborted)requestAnimationFrame(fitDetailRooms);});
let apartments=[],data,favorites=new Set(),toastTimer,activeToast=null,mediaView=null,mediaSequence=0;
let requestedApartmentId=typeof config.apartment==='string'?config.apartment:null, cardOpen=false;
const dialogFocus=new WeakMap(), dialogStack=[], downloadUrls=new Set();
const modalRegistry=window[Symbol.for('admiral-park:open-dialogs')] ||= new Set();
const modalScroll=window[Symbol.for('admiral-park:scroll-lock')] ||= {locked:false,value:'',priority:'',watched:new WeakSet()};
const dialogs=[$('detail-dialog'),$('media-dialog')].filter(Boolean);
let detailResize=null,selectedPlanRoom=null,hoverPlanRoom=null,focusedPlanRoom=null;
let storage = true;
try { const stored = JSON.parse(localStorage.getItem('admiral-park:favorites:v1') || '[]'); if (Array.isArray(stored)) favorites = new Set(stored.filter(x => typeof x === 'string')); } catch { storage = false; }
function toast(message) {
  // A native modal's top layer makes sibling live regions inert, regardless of
  // their z-index. Keep feedback in the open card, and row-export feedback outside.
  activeToast?.classList.remove('visible');
  const dialog=$('detail-dialog');
  activeToast=dialog.open?dialog.querySelector('.detail-feedback')||$('toast'):$('toast');
  activeToast.textContent=message;activeToast.classList.add('visible');
  const target=activeToast;
  clearTimeout(toastTimer);toastTimer=setTimeout(()=>target.classList.remove('visible'),4200);
}
const byId = (id) => apartments.find(a => a.id === id);
const hasNumber = (v) => typeof v === 'number' && Number.isFinite(v);
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
function downloadLink(a,large=false) {
  return `<span class="download-wrap"><button type="button" class="datasheet-link action-pill${large?' datasheet-large footer-pill':''}" data-download="${esc(a.id)}" aria-label="${esc(a.id)} lakás adatlapjának letöltése PDF formátumban" title="Lakásadatlap letöltése">${downloadIcon}<span>Adatlap</span></button></span>`;
}
function saveButton(a,explain=false) { const saved=favorites.has(a.id); return `<button type="button" class="save-button ${saved?'is-saved':''}${explain?' save-with-label':''}" data-save="${esc(a.id)}" aria-label="${esc(a.id)} ${saved?'eltávolítása a kedvencekből':'mentése a kedvencekhez'}" aria-pressed="${saved}">${svg('heart')}${explain?`<span class="detail-save-label">${saved?'Kedvencekhez mentve':'Mentés a kedvencekhez'}</span>`:''}</button>`; }
function syncModalState() {
  const nextCardOpen=dialogs.some(dialog=>dialog.open);
  if(nextCardOpen!==cardOpen){cardOpen=nextCardOpen;config.onOpenChange?.(cardOpen);}
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
  const fallback=dialog.id==='detail-dialog'?root.querySelector(`[data-detail="${CSS.escape(dialog.dataset.apartment||'')}"]`):null;
  const focus=previous?.isConnected&&(!top||top.contains(previous))?previous:top?.querySelector('[data-close]')||fallback;
  focus?.focus({preventScroll:true});
}
function closeDialog(dialog) { if(dialog?.open){dialog.close();finishDialogClose(dialog);} }
function inquiry(a) {
  const inquiryUrl=safeUrl(config.inquiryUrl);
  if(inquiryUrl) { const u=new URL(inquiryUrl); u.searchParams.set('apartment',a.id); return `<a class="inquiry-button" href="${esc(u.href)}" target="_blank" rel="noopener"><span>Érdeklődöm</span></a>`; }
  return `<button type="button" class="inquiry-button" data-inquiry-placeholder aria-expanded="false" aria-controls="inquiry-pending"><span>Érdeklődöm</span></button><div class="inquiry-pending" id="inquiry-pending" role="status" hidden><p>A kapcsolatfelvétel hamarosan elérhető.</p><button type="button" class="inquiry-copy" data-copy-inquiry="${esc(a.id)}">Lakásadatok másolása</button></div>`;
}
function positionInquiryNotice() {
  const dialog=$('detail-dialog'),note=dialog?.querySelector('.inquiry-pending');
  if(!dialog?.open||!note||note.hidden)return;
  note.style.bottom='auto';note.style.top='0px';
  const bounds=dialog.querySelector('.detail-layout').getBoundingClientRect(),anchor=dialog.querySelector('.detail-inquiry').getBoundingClientRect(),height=note.getBoundingClientRect().height;
  const preferred=anchor.top-height-8<bounds.top+6?anchor.bottom+8:anchor.top-height-8;
  note.style.top=`${Math.max(bounds.top+6,Math.min(preferred,bounds.bottom-height-6))-anchor.top}px`;
}
function detailMetric(label,value) {
  return `<div><dt>${esc(label)}</dt><dd>${hasNumber(value)?number.format(value):'—'}${hasNumber(value)?'<small>m2</small>':''}</dd></div>`;
}
function validPlanMarkers(layout) {
  return Array.isArray(layout?.markers)?layout.markers.filter(marker=>Number.isSafeInteger(marker.number)&&marker.number>0&&hasNumber(marker.x)&&marker.x>=0&&marker.x<=1&&hasNumber(marker.y)&&marker.y>=0&&marker.y<=1&&typeof marker.name==='string'):[];
}
function inlineMediaFeedback() {
  return '<div class="inline-media-feedback" role="status" aria-live="polite">Rajz betöltése…</div>';
}
function setInlineMediaState(image,state) {
  const panel=image.closest('[data-document-panel]');if(!panel)return;
  panel.dataset.imageState=state;panel.setAttribute('aria-busy',String(state==='loading'));
  const feedback=panel.querySelector('.inline-media-feedback');if(!feedback)return;
  feedback.hidden=state==='ready';
  feedback.innerHTML=state==='error'?'<span>A rajz most nem tölthető be.</span><button type="button" class="button-secondary" data-inline-media-retry>Újrapróbálom</button>':state==='loading'?'Rajz betöltése…':'';
}
function initializeInlineMedia(dialog) {
  dialog.querySelectorAll('img[data-inline-media]').forEach(image=>{
    if(image.complete)setInlineMediaState(image,image.naturalWidth?'ready':'error');
  });
}
function detailPlan(a) {
  const layout=data.roomLayouts?.[a.apartmentType],source=a.media?.floorplan;
  const url=assetUrl(source?.original||(layout?`assets/floorplans/types/${encodeURIComponent(a.apartmentType)}/original.png`:source?.full||a.floorplan));
  if(!url)return '<div class="empty-plan"><h3>Alaprajz</h3><p>Az alaprajz még nem érhető el.</p></div>';
  const view=layout?.viewBox||{x:0,y:0,width:1,height:1};
  const dimensions=layout?.imageDimensions||{width:1500,height:2000};
  const imageWidth=dimensions.width||dimensions[0]||1500,imageHeight=dimensions.height||dimensions[1]||2000;
  const surface=`left:${-view.x/view.width*100}%;top:${-view.y/view.height*100}%;width:${100/view.width}%;height:${100/view.height}%`;
  const markers=validPlanMarkers(layout);
  return `<section class="detail-plan" data-document-panel="plan" data-image-state="loading" aria-busy="true" id="detail-document-plan" role="tabpanel" aria-labelledby="detail-document-plan-tab"><div class="detail-plan-stage"><div class="detail-plan-canvas" style="--plan-aspect:${imageWidth*view.width/(imageHeight*view.height)};aspect-ratio:${imageWidth*view.width}/${imageHeight*view.height}"><div class="detail-plan-surface" style="${surface}"><img class="detail-plan-image" data-inline-media src="${esc(url)}" alt="${esc(a.apartmentType||a.id)} típus számozott alaprajza" decoding="async"><div class="detail-plan-markers" aria-label="A típusterv helyiségei">${markers.map(marker=>`<button type="button" class="room-marker" data-plan-room="${marker.number}" style="left:${marker.x*100}%;top:${marker.y*100}%" aria-label="${marker.number}. ${esc(roomLabel(marker.name))}" aria-pressed="false">${marker.number}</button>`).join('')}</div></div></div></div>${inlineMediaFeedback()}</section>`;
}
function detailRooms(a) {
  const rooms=Array.isArray(a.roomList)?a.roomList:[],markers=validPlanMarkers(data.roomLayouts?.[a.apartmentType]);
  const mapped=markers.length&&rooms.length===markers.length&&markers.every(marker=>rooms.some(room=>room.planNumber===marker.number));
  const layoutSummary=typeof a.layoutLabel==='string'&&a.layoutLabel.trim()?a.layoutLabel.trim().replace(/hálószoba/giu,'szoba'):hasNumber(a.rooms)?`${number.format(a.rooms)} szoba`:'';
  const roomHeading=`Helyiségek.${layoutSummary?` <span class="detail-layout-label">${esc(layoutSummary)}</span>`:''}`;
  const ownRooms=`<ul class="unit-room-list">${rooms.map(room=>`<li><span>${esc(roomLabel(room.name))}</span><strong>${area(room.area)}</strong></li>`).join('')||'<li>A helyiséglista még nem érhető el.</li>'}</ul>`;
  return `<section class="detail-room-panel" data-detail-panel="rooms" id="detail-panel-rooms" role="tabpanel" aria-labelledby="detail-tab-rooms" data-room-view="type"><div class="detail-room-tabs" role="tablist" aria-label="Helyiségjegyzék"><button type="button" id="detail-room-type-tab" data-room-view="type" role="tab" aria-selected="true" aria-controls="detail-room-type">Típusterv</button>${!mapped?'<button type="button" id="detail-room-unit-tab" data-room-view="unit" role="tab" aria-selected="false" tabindex="-1" aria-controls="detail-room-unit">Lakásterületek</button>':''}</div><div class="detail-rooms" data-room-panel="type" id="detail-room-type" role="tabpanel" aria-labelledby="detail-room-type-tab"><h3>${roomHeading}</h3><div class="room-page">${markers.length?`<ol class="type-room-list">${markers.map(marker=>{const room=mapped?rooms.find(room=>room.planNumber===marker.number):null;return `<li><button type="button" class="room-legend-button" data-plan-room="${marker.number}" aria-pressed="false"><span class="room-number">${String(marker.number).padStart(2,'0')}</span><span class="room-name">${esc(roomLabel(marker.name))}</span>${room?`<span class="room-area">${area(room.area)}</span>`:''}</button></li>`;}).join('')}</ol>`:ownRooms}</div></div>${!mapped?`<div class="unit-room-section" data-room-panel="unit" id="detail-room-unit" role="tabpanel" aria-labelledby="detail-room-unit-tab" hidden><h3>${roomHeading}</h3><div class="room-page">${ownRooms}</div></div>`:''}</section>`;
}
function detail(id) {
  const a=byId(id);if(!a)return;
  selectedPlanRoom=null;hoverPlanRoom=null;focusedPlanRoom=null;
  const floor=mediaEntries(a).find(item=>item.key==='floorLayout');
  const floorCaption=String(floorText(a)),floorMatch=/^(.*?)\s*emelet$/iu.exec(floorCaption);
  const floorMeta=floorMatch&&floorMatch[1].trim()?`<strong>${esc(floorMatch[1].trim())}</strong> emelet`:`<strong>${esc(floorCaption)}</strong>`;
  const monogram=assetUrl('assets/brand/ap-monogram.png'),logo=assetUrl('assets/brand/admiral-park-full-logo-no-location.svg');
  const dialog=$('detail-dialog');dialog.dataset.apartment=id;detailResize?.disconnect();
  dialog.innerHTML=`<div class="detail-shell" data-panel="plan"><div class="detail-brand-motif" aria-hidden="true"></div>
    <header class="detail-topbar"><div class="detail-top-actions"><button type="button" class="dialog-close" data-close aria-label="Bezárás">×</button></div></header>
    <div class="detail-layout">
      <aside class="detail-sidebar" aria-label="A lakás adatai">
        <div class="detail-core">
          <div class="detail-identity"><div class="detail-brand-group"><span class="detail-logo" role="img" aria-label="Admiral Park"></span></div></div>
          <div class="detail-area-row"><dl class="detail-metrics${a.areaGarden>0?' has-garden':''}"><div class="detail-id-metric"><dt>Lakás<wbr>szám</dt><dd><h2 class="detail-apartment-number">${esc(a.id)}</h2></dd></div>${detailMetric('Beltér',a.areaInterior)}${detailMetric('Erkély',a.areaTerrace)}${hasNumber(a.areaGarden)&&a.areaGarden>0?detailMetric('Kert',a.areaGarden):''}</dl></div>
        </div>
        <hr class="detail-divider">
        ${detailRooms(a)}
        <div class="detail-conversion"><div class="detail-price"><p>${hasNumber(a.price)?`<span class="price-value">${priceNumber.format(a.price/1000000)}</span> <small class="price-unit">M Ft</small>`:`<span class="price-unavailable">${esc(apartmentPrice(a))}</span>`}</p></div><div class="detail-inquiry">${inquiry(a)}</div><div class="detail-downloads detail-footer">${downloadLink(a,true)}<div class="detail-status"><span class="status-pill status-${esc(a.status)}">${esc(statusText(a))}</span></div>${shareControl(a)}</div></div>
      </aside>
      <nav class="detail-panel-nav" role="tablist" aria-label="Rajz és helyiségjegyzék">${[['plan','Rajzok'],['rooms','Helyiségek']].map(([key,label])=>`<button type="button" role="tab" id="detail-tab-${key}" data-detail-tab="${key}" aria-controls="detail-panel-${key}" aria-selected="${key==='plan'}" tabindex="${key==='plan'?0:-1}">${label}</button>`).join('')}</nav>
      <section class="detail-drawing" data-detail-panel="plan" id="detail-panel-plan" role="tabpanel" aria-labelledby="detail-tab-plan"><div class="detail-drawing-toolbar"><div class="detail-document-tabs" role="tablist" aria-label="Rajz kiválasztása"><button type="button" id="detail-document-plan-tab" role="tab" data-document-view="plan" aria-selected="true" aria-controls="detail-document-plan">Alaprajz</button>${floor?'<button type="button" id="detail-document-floor-tab" role="tab" data-document-view="floor" aria-selected="false" tabindex="-1" aria-controls="detail-document-floor">Szintrajz</button>':''}</div><div class="detail-drawing-save">${saveButton(a,true)}</div><p class="detail-unit-meta"><strong>${esc(a.apartmentType||'')}</strong> típus <span>·</span> <strong>${esc(a.building)}</strong> épület <span>·</span> ${floorMeta} <span>·</span> <strong>${esc(a.orientation||'Nincs adat')}</strong> tájolás</p></div>${detailPlan(a)}${floor?`<section class="detail-floor-plan" data-document-panel="floor" data-image-state="loading" aria-busy="true" id="detail-document-floor" role="tabpanel" aria-labelledby="detail-document-floor-tab" hidden><p class="detail-section-label">${esc(floorText(a))} · A, B, C épület</p><img class="detail-floor-image" data-inline-media src="${esc(floor.full)}" alt="${esc(floorText(a))} szintrajza" decoding="async">${inlineMediaFeedback()}<p class="detail-plan-note">${esc(a.id)} · ${esc(a.building)} épület</p></section>`:''}</section>
    </div><p class="detail-illustration-note">Az alaprajz illusztráció. Bútorozatlan átadás. Bruttó vételár.</p><div class="toast detail-feedback" role="status" aria-live="polite"></div></div>`;
  const shell=dialog.querySelector('.detail-shell');
  if(monogram)shell.style.setProperty('--detail-monogram-image',`url("${monogram.replace(/"/g,'%22')}")`);
  if(logo)shell.style.setProperty('--detail-logo-image',`url("${logo.replace(/"/g,'%22')}")`);
  openDialog(dialog);dialog.scrollTop=0;initializeInlineMedia(dialog);
  detailResize=new ResizeObserver(()=>requestAnimationFrame(fitDetailRooms));detailResize.observe(dialog.querySelector('.detail-room-panel'));
  requestAnimationFrame(fitDetailRooms);
}
function selectDetailPanel(value,focus=false) {
  const dialog=$('detail-dialog'),shell=dialog.querySelector('.detail-shell');if(!shell)return;
  shell.dataset.panel=value;
  dialog.querySelectorAll('[data-detail-tab]').forEach(button=>{const active=button.dataset.detailTab===value;button.setAttribute('aria-selected',String(active));button.tabIndex=active?0:-1;});
  if(focus&&getComputedStyle(dialog.querySelector('.detail-panel-nav')).display!=='none')dialog.querySelector(`[data-detail-tab="${value}"]`)?.focus({preventScroll:true});
  requestAnimationFrame(fitDetailRooms);
}
function selectDetailDocument(value) {
  const dialog=$('detail-dialog');
  dialog.querySelectorAll('[data-document-view]').forEach(button=>{const active=button.dataset.documentView===value;button.setAttribute('aria-selected',String(active));button.tabIndex=active?0:-1;});
  dialog.querySelectorAll('[data-document-panel]').forEach(panel=>{panel.hidden=panel.dataset.documentPanel!==value;});
}
function selectDetailRoomView(value) {
  const dialog=$('detail-dialog'),panel=dialog.querySelector('.detail-room-panel');if(!panel)return;
  panel.dataset.roomView=value;
  panel.querySelectorAll('button[data-room-view]').forEach(button=>{const active=button.dataset.roomView===value;button.setAttribute('aria-selected',String(active));button.tabIndex=active?0:-1;});
  panel.querySelectorAll('[data-room-panel]').forEach(item=>{item.hidden=item.dataset.roomPanel!==value;});
  fitDetailRooms();
}
function fitDetailRooms() {
  const dialog=$('detail-dialog');if(signal.aborted||!dialog.open)return;
  const panel=dialog.querySelector('.detail-room-panel'),view=panel?.dataset.roomView;
  panel?.style.setProperty('--room-slack','0px');
  const frame=panel?.querySelector(`[data-room-panel="${view}"] .room-page`);if(!frame?.clientHeight)return;
  const list=frame.querySelector('ol,ul');if(!list)return;
  const rows=[...list.children];rows.forEach(row=>row.hidden=false);
  let navigation=frame.parentElement.querySelector('.room-pagination');
  if(navigation)navigation.hidden=true;
  const maxColumns=Math.max(1,Math.min(4,Math.floor(frame.clientWidth/125)));
  for(let columns=1;columns<=maxColumns;columns++){
    list.style.setProperty('--room-columns',String(columns));list.dataset.columns=String(columns);
    for(const padding of [4,2,1,0]){
      list.style.setProperty('--room-padding',`${padding}px`);list.style.setProperty('--room-circle',`${padding>=2?18:16}px`);
      // Use the actual fractional height; rounded clientHeight could clip the last row.
      if(list.getBoundingClientRect().height<=Math.floor(frame.getBoundingClientRect().height)-1){
        frame.dataset.page='0';frame.dataset.pageSize=String(rows.length);
        panel.style.setProperty('--room-slack',`${Math.max(0,frame.getBoundingClientRect().height-list.getBoundingClientRect().height-1)}px`);
        return;
      }
    }
  }
  // Very short landscape screens cannot fit every row without making the
  // text unreadable. Paginate only after the existing compact layout is full.
  if(!navigation){
    navigation=document.createElement('nav');navigation.className='room-pagination';navigation.setAttribute('aria-label','További helyiségek');
    navigation.innerHTML='<button type="button" data-room-page="-1" aria-label="Előző helyiségek">←</button><span role="status" aria-live="polite"></span><button type="button" data-room-page="1" aria-label="Következő helyiségek">→</button>';
    frame.after(navigation);
  }
  navigation.hidden=false;
  let pageSize=1;
  for(let count=1;count<=rows.length;count++){
    rows.forEach((row,index)=>row.hidden=index>=count);
    if(list.getBoundingClientRect().height>Math.floor(frame.getBoundingClientRect().height)-1)break;
    pageSize=count;
  }
  const pages=Math.ceil(rows.length/pageSize),page=Math.max(0,Math.min(Number(frame.dataset.page)||0,pages-1));
  frame.dataset.page=String(page);frame.dataset.pageSize=String(pageSize);
  rows.forEach((row,index)=>row.hidden=index<page*pageSize||index>=(page+1)*pageSize);
  navigation.querySelector('[data-room-page="-1"]').disabled=page===0;
  navigation.querySelector('[data-room-page="1"]').disabled=page===pages-1;
  navigation.querySelector('span').textContent=`${page+1} / ${pages}`;
}
function paintPlanRoom(value) {
  const dialog=$('detail-dialog'),number=value==null?null:String(value);
  dialog.querySelectorAll('[data-plan-room]').forEach(button=>{button.classList.toggle('is-active',button.dataset.planRoom===number);button.setAttribute('aria-pressed',String(button.dataset.planRoom===selectedPlanRoom));});
}
function selectPlanRoom(value,origin) {
  selectedPlanRoom=String(value);selectDetailRoomView('type');paintPlanRoom(selectedPlanRoom);
  const frame=$('detail-dialog').querySelector('[data-room-panel="type"] .room-page'),rows=frame?.querySelectorAll('li'),row=origin?.classList.contains('room-marker')?[...rows||[]].findIndex(item=>item.querySelector(`[data-plan-room="${selectedPlanRoom}"]`)): -1;
  if(frame&&row>=0&&Number(frame.dataset.pageSize)>0){frame.dataset.page=String(Math.floor(row/Number(frame.dataset.pageSize)));}
  if(origin?.classList.contains('room-marker'))selectDetailPanel('rooms',true);else {selectDetailDocument('plan');selectDetailPanel('plan',true);}
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
  function waitForExportData(promise,exportSignal) {
    return new Promise((resolve,reject)=>{
      const abort=()=>{const error=new Error('PDF export cancelled');error.name='AbortError';reject(error);};
      if(exportSignal.aborted){abort();return;}
      exportSignal.addEventListener('abort',abort,{once:true});
      Promise.resolve(promise).then(value=>{exportSignal.removeEventListener('abort',abort);resolve(value);},error=>{exportSignal.removeEventListener('abort',abort);reject(error);});
    });
  }
  if(signal.aborted)return {id,status:'cancelled'};
  const dialog=$('detail-dialog');
  const markBusy=job=>{
    if(!trigger||job.triggers.has(trigger))return;
    const label=trigger.querySelector('span');
    const previous=pdfTriggerOwners.get(trigger)?.triggers.get(trigger);
    job.triggers.set(trigger,previous||{label,text:label?.textContent,busy:trigger.getAttribute('aria-busy'),disabled:trigger.getAttribute('aria-disabled')});
    pdfTriggerOwners.set(trigger,job);
    trigger.setAttribute('aria-busy','true');trigger.setAttribute('aria-disabled','true');if(label)label.textContent='PDF készül…';
  };
  if(pdfExportJob?.id===id){markBusy(pdfExportJob);return pdfExportJob.promise;}
  pdfExportJob?.controller.abort();
  const controller=new AbortController(),job={controller,id,fromDialog:dialog.open&&dialog.dataset.apartment===id,triggers:new Map(),promise:null};
  pdfExportJob=job;markBusy(job);
  const abort=()=>controller.abort();signal.addEventListener('abort',abort,{once:true});
  const stale=()=>signal.aborted||controller.signal.aborted||pdfExportJob!==job||(job.fromDialog&&(!dialog.open||dialog.dataset.apartment!==id));
  let timedOut=false;
  const timeout=setTimeout(()=>{timedOut=true;abort();},45000);
  toast('A lakás adatlapja készül…');
  job.promise=(async()=>{
  try{
  if(!data)await waitForExportData(load(),controller.signal);
  if(stale())return {id,status:'cancelled'};
  const a=byId(id);if(!a)throw new Error('A kiválasztott lakás nem található.');
  // A list-row download never initializes or opens the detail layout. Its theme
  // is inherited by the closed native dialog, just as it is by an open card.
  const shell=job.fromDialog?dialog.querySelector('.detail-shell'):null,computed=getComputedStyle(shell||dialog);
  const colors={};
  for(const [key,property,fallback] of [['top','--detail-top','#fdfbfb'],['bottom','--detail-bottom','#e4e9ec'],['ink','--detail-ink','#242824'],['muted','--detail-muted','#687074'],['watermarkTop','--detail-watermark-top','#f2f0f1'],['watermarkBottom','--detail-watermark-bottom','#d9dfe2'],['accent','--accent','#a38c69']])colors[key]=computed.getPropertyValue(property).trim()||fallback;
  const statusProperty={available:'--available',sold:'--sold',under_negotiation:'--negotiating'}[a.status]||'--detail-muted';
  colors.status=job.fromDialog?getComputedStyle(dialog.querySelector('.status-pill')).color:computed.getPropertyValue(statusProperty).trim()||({available:'#4f7959',sold:'#b4564f',under_negotiation:'#b28a2f'}[a.status]||colors.muted);
  if(!job.fromDialog&&a.status==='under_negotiation')colors.status=`color-mix(in srgb, ${colors.status} 60%, ${colors.ink})`;
  const layout=data.roomLayouts?.[a.apartmentType],markers=validPlanMarkers(layout),rooms=Array.isArray(a.roomList)?a.roomList:[];
  const mapped=markers.length&&rooms.length===markers.length&&markers.every(marker=>rooms.some(room=>room.planNumber===marker.number));
  const unitRows=rooms.map(room=>({name:roomLabel(room.name),area:area(room.area)}));
  const typeRows=markers.map(marker=>({number:marker.number,name:roomLabel(marker.name),area:mapped?area(rooms.find(room=>room.planNumber===marker.number).area):null}));
  const roomGroups=markers.length?[{label:mapped?'Típusterv · Helyiségterületek':'Típusterv · Számozott helyiségek',rows:typeRows}]:[];
  if(!mapped||!markers.length)roomGroups.push({label:markers.length?'Lakásterületek · A kiválasztott lakás adatai':'Helyiségterületek',rows:unitRows});
  const floor=job.fromDialog&&dialog.querySelector('[data-document-view="floor"][aria-selected="true"]')?mediaEntries(a).find(item=>item.key==='floorLayout'):null;
  const view=layout?.viewBox||{x:0,y:0,width:1,height:1};
  const validView=[view.x,view.y,view.width,view.height].every(hasNumber)&&view.x>=0&&view.y>=0&&view.width>0&&view.height>0&&view.x+view.width<=1.001&&view.y+view.height<=1.001;
  const source=a.media?.floorplan;
  const pageUrl=apartmentLink(a.id),inquiryUrl=safeUrl(config.inquiryUrl),actionUrl=new URL(inquiryUrl||pageUrl);if(inquiryUrl)actionUrl.searchParams.set('apartment',a.id);
  const snapshot={
    id:String(a.id),date:new Date(),colors,
    metrics:[{label:'Lakásszám',value:String(a.id)},{label:'Beltér',value:area(a.areaInterior).replace('m²','m2')},{label:'Erkély',value:area(a.areaTerrace).replace('m²','m2')},...(a.areaGarden>0?[{label:'Kert',value:area(a.areaGarden).replace('m²','m2')}]:[])],
    meta:[a.apartmentType?`${a.apartmentType} típus`:null,`${a.building} épület`,floorText(a),a.orientation?`${a.orientation} tájolás`:null].filter(Boolean).join(' · '),
    documentLabel:floor?'Szintrajz':'Alaprajz',
    imageUrl:floor?.full||assetUrl(source?.original||(layout?`assets/floorplans/types/${encodeURIComponent(a.apartmentType)}/original.png`:source?.full||a.floorplan)),
    viewBox:floor||!validView?{x:0,y:0,width:1,height:1}:{x:view.x,y:view.y,width:view.width,height:view.height},
    markers:floor?[]:markers.map(marker=>({number:marker.number,x:marker.x,y:marker.y})),
    roomGroups,layoutLabel:typeof a.layoutLabel==='string'?a.layoutLabel.replace(/hálószoba/giu,'szoba'):hasNumber(a.rooms)?`${number.format(a.rooms)} szoba`:'',
    price:apartmentPrice(a),status:statusText(a),pageUrl,actionUrl:actionUrl.href,actionLabel:inquiryUrl?'Érdeklődöm':'Lakás megtekintése',
    fontRegular:assetUrl('assets/fonts/montserrat/montserrat-pdf-regular.ttf'),fontSemibold:assetUrl('assets/fonts/montserrat/montserrat-pdf-semibold.ttf'),
    logoUrl:assetUrl('assets/brand/admiral-park-full-logo-no-location.svg'),monogramUrl:assetUrl('assets/brand/ap-monogram.png'),
  };
    const blob=await createAdmiralApartmentPdf(snapshot,{signal:controller.signal});
    if(stale()&&!timedOut)return {id,status:'cancelled'};
    if(timedOut)throw new Error('PDF export timeout');
    const url=URL.createObjectURL(blob);downloadUrls.add(url);
    const link=document.createElement('a');link.href=url;link.download=`Admiral-Park-${String(a.id).replace(/[^A-Za-z0-9_-]/g,'-')}-adatlap.pdf`;
    (shell||document.body).append(link);link.click();link.remove();
    const timer=setTimeout(()=>{URL.revokeObjectURL(url);downloadUrls.delete(url);pdfDownloadTimers.delete(timer);},30000);pdfDownloadTimers.add(timer);
    toast('A lakás adatlapjának letöltése elindult.');
    return {id,status:'downloaded'};
  }catch(error){
    if(stale()&&!timedOut)return {id,status:'cancelled'};
    toast('Nem sikerült elkészíteni a PDF-et. Próbálja újra.');
    return {id,status:'error'};
  }finally{
    clearTimeout(timeout);controller.abort();signal.removeEventListener('abort',abort);if(pdfExportJob===job)pdfExportJob=null;
    for(const [button,previous] of job.triggers){
      if(pdfTriggerOwners.get(button)!==job)continue;
      pdfTriggerOwners.delete(button);
      for(const [attribute,value] of [['aria-busy',previous.busy],['aria-disabled',previous.disabled]])if(value===null)button.removeAttribute(attribute);else button.setAttribute(attribute,value);
      if(previous.label)previous.label.textContent=previous.text;
    }
  }
  })();
  return job.promise;
}
function apartmentLink(id){const u=new URL(safeUrl(config.pageUrl)||location.href);for(const key of ['building','floor','rooms','status','minArea','maxArea','minPrice','maxPrice','terrace','garden','favoritesOnly','search','sort'])u.searchParams.delete(key);u.searchParams.set('apartment',id);return u.href;}
const sendIcon='<svg viewBox="0 0 24 24" width="21" height="21" fill="none" aria-hidden="true"><path d="m21 3-7.2 18-3.6-7.2L3 10.2 21 3Zm0 0L10.2 13.8" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/></svg>';
function sharePayload(a) {
  return {title:`Admiral Park · ${a.id}`,text:`Admiral Park ${a.id} lakás · ${area(a.areaInterior)} beltér · ${area(a.areaTerrace)} erkély${hasNumber(a.price)?` · ${price(a.price)}`:''}`,url:apartmentLink(a.id)};
}
function shareControl(a) {
  const payload=sharePayload(a),email=`mailto:?subject=${encodeURIComponent(payload.title)}&body=${encodeURIComponent(payload.text+'\n\n'+payload.url)}`,whatsapp=`https://wa.me/?text=${encodeURIComponent(payload.text+'\n'+payload.url)}`;
  return `<div class="detail-share-wrap"><button type="button" class="share-button footer-pill" data-share="${esc(a.id)}" title="Lakás megosztása" aria-label="${esc(a.id)} lakás megosztása" aria-haspopup="dialog" aria-expanded="false" aria-controls="detail-share-menu">${sendIcon}<span>Küldd el valakinek</span></button><div class="share-popover" id="detail-share-menu" role="dialog" aria-label="Lakás megosztása" hidden><div class="share-heading"><div><span>Lakás megosztása</span><strong>${esc(a.id)}</strong></div><button type="button" data-share-close aria-label="Megosztás bezárása">×</button></div><div class="share-options"><button type="button" data-share-copy="${esc(a.id)}"><span aria-hidden="true">↗</span>Link másolása</button><a data-share-email href="${esc(email)}"><span aria-hidden="true">@</span>E-mail</a><a data-share-whatsapp href="${esc(whatsapp)}" target="_blank" rel="noopener noreferrer"><span aria-hidden="true">↗</span>WhatsApp</a></div><label class="sr-only" for="detail-share-url">A lakás hivatkozása</label><input class="share-url" id="detail-share-url" type="text" readonly value="${esc(payload.url)}"><output class="share-feedback" role="status" aria-live="polite"></output></div></div>`;
}
function shareMenu() {return $('detail-dialog')?.querySelector('.share-popover');}
function closeShare(restore=true) {
  const menu=shareMenu();if(!menu||menu.hidden)return false;
  menu.hidden=true;const button=$('detail-dialog').querySelector('[data-share]');button?.setAttribute('aria-expanded','false');if(restore)button?.focus({preventScroll:true});return true;
}
function positionShareMenu() {
  const dialog=$('detail-dialog'),menu=shareMenu();if(!dialog?.open||!menu||menu.hidden)return;
  const bounds=dialog.getBoundingClientRect(),anchor=dialog.querySelector('[data-share]').getBoundingClientRect(),close=dialog.querySelector('[data-close]').getBoundingClientRect();
  const width=menu.getBoundingClientRect().width,height=menu.getBoundingClientRect().height,minTop=close.bottom+8,maxTop=bounds.bottom-height-12;
  const preferred=anchor.top-height-8>=minTop?anchor.top-height-8:anchor.bottom+8;
  menu.style.left=`${Math.max(bounds.left+12,Math.min(anchor.right-width,bounds.right-width-12))}px`;
  menu.style.top=`${Math.max(minTop,Math.min(preferred,maxTop))}px`;
}
function openShareMenu(id) {
  const dialog=$('detail-dialog'),menu=shareMenu();if(!dialog.open||dialog.dataset.apartment!==id||!menu)return;
  menu.hidden=false;dialog.querySelector('[data-share]')?.setAttribute('aria-expanded','true');positionShareMenu();menu.querySelector('[data-share-copy]')?.focus({preventScroll:true});
}
async function shareApartment(id,trigger) {
  const a=byId(id);if(!a||trigger.getAttribute('aria-busy')==='true')return;
  if(closeShare())return;
  const payload=sharePayload(a);
  if(typeof navigator.share==='function'){
    trigger.setAttribute('aria-busy','true');
    try {await navigator.share(payload);return;}
    catch(error){if(error?.name==='AbortError'||signal.aborted||!trigger.isConnected)return;}
    finally {trigger.removeAttribute('aria-busy');}
  }
  openShareMenu(id);
}
async function copyShareLink(id) {
  const menu=shareMenu();if(!menu||menu.hidden)return;
  const copied=await copyText(apartmentLink(id));if(!menu.isConnected)return;
  menu.querySelector('.share-feedback').textContent=copied?'Link másolva.':'A link kijelölve, másolásra kész.';
  if(!copied){const input=menu.querySelector('.share-url');input.focus({preventScroll:true});input.select();}
  positionShareMenu();
}
async function copyText(text) {
  try {await navigator.clipboard.writeText(text);toast('A vágólapra másoltuk.');return true;}
  catch {
    const previous=root.activeElement||document.activeElement,helper=document.createElement('textarea'),holder=root.querySelector('dialog[open] .dialog-inner,dialog[open] .detail-shell')||root.querySelector('main')||document.body;
    helper.value=text;helper.setAttribute('aria-label','Másolható szöveg');helper.style.cssText='position:fixed;top:20px;left:20px;z-index:99999;width:80%;height:80px';holder.append(helper);helper.focus({preventScroll:true});helper.select();
    let copied=false;try{copied=document.execCommand('copy');}catch{}helper.remove();previous?.focus({preventScroll:true});toast(copied?'A vágólapra másoltuk.':'A böngésző nem engedélyezte a másolást.');return copied;
  }
}
for(const name of ['pointerover','pointermove','pointerout','focusin','focusout'])root.addEventListener(name,event=>{
  if(event.pointerType==='touch')return;
  const button=event.target.closest?.('.room-marker,.room-legend-button');
  if(!button?.closest('#detail-dialog')||button.contains(event.relatedTarget))return;
  if(name==='pointermove'&&button.classList.contains('is-active'))return;
  if(name==='pointerover'||name==='pointermove')hoverPlanRoom=button.dataset.planRoom;
  if(name==='pointerout')hoverPlanRoom=null;
  if(name==='focusin')focusedPlanRoom=button.dataset.planRoom;
  if(name==='focusout')focusedPlanRoom=null;
  paintPlanRoom(name==='focusin'?focusedPlanRoom:hoverPlanRoom||focusedPlanRoom||selectedPlanRoom);
},events);
root.addEventListener('click',event=>{
  if(!event.target.closest('.detail-share-wrap'))closeShare(false);
  const t=event.target.closest('button,a[data-download],[data-close]');if(!t)return;
  if(t.hasAttribute('data-share'))shareApartment(t.dataset.share,t);
  if(t.hasAttribute('data-share-close'))closeShare();
  if(t.hasAttribute('data-share-copy'))copyShareLink(t.dataset.shareCopy);
  if(t.hasAttribute('data-detail-tab'))selectDetailPanel(t.dataset.detailTab);
  if(t.hasAttribute('data-document-view'))selectDetailDocument(t.dataset.documentView);
  if(t.hasAttribute('data-room-view'))selectDetailRoomView(t.dataset.roomView);
  if(t.hasAttribute('data-room-page')){
    const panel=t.closest('[data-room-panel]'),frame=panel?.querySelector('.room-page');
    if(frame){frame.dataset.page=String((Number(frame.dataset.page)||0)+Number(t.dataset.roomPage));fitDetailRooms();if(t.disabled)panel.querySelector('.room-pagination button:not(:disabled)')?.focus({preventScroll:true});}
  }
  if(t.hasAttribute('data-inline-media-retry')){
    const panel=t.closest('[data-document-panel]'),image=panel?.querySelector('img[data-inline-media]');
    if(image){const src=image.getAttribute('src');setInlineMediaState(image,'loading');image.removeAttribute('src');image.setAttribute('src',src);$('detail-dialog').querySelector(`[data-document-view="${panel.dataset.documentPanel}"]`)?.focus({preventScroll:true});}
  }
  if(t.hasAttribute('data-plan-room'))selectPlanRoom(t.dataset.planRoom,t);
  if(t.hasAttribute('data-inquiry-placeholder')){
    const dialog=$('detail-dialog'),note=dialog.querySelector('.inquiry-pending');
    if(note){note.hidden=!note.hidden;t.setAttribute('aria-expanded',String(!note.hidden));if(!note.hidden)positionInquiryNotice();}
  }
  if(t.hasAttribute('data-media'))openMedia(t.dataset.media,t.dataset.mediaKind);
  if(t.hasAttribute('data-media-tab'))showMedia(Number(t.dataset.mediaTab));
  if(t.hasAttribute('data-media-retry')&&mediaView){showMedia(mediaView.index);$('media-dialog').querySelector('.media-stage')?.focus();}
  if(t.hasAttribute('data-zoom'))zoomMedia(t.dataset.zoom);
  if(t.hasAttribute('data-download')){event.preventDefault();downloadDatasheet(t.dataset.download,t);}
  if(t.hasAttribute('data-save')){
    const id=t.dataset.save;if(favorites.has(id))favorites.delete(id);else favorites.add(id);
    try{localStorage.setItem('admiral-park:favorites:v1',JSON.stringify([...favorites]));}catch{storage=false;}
    updateFavoriteButton();
    $('detail-dialog').querySelector('[data-save]')?.focus({preventScroll:true});
    window.dispatchEvent(new CustomEvent('admiral:apartment-favorites',{detail:{ids:[...favorites]}}));
    toast(favorites.has(id)?`A(z) ${id} lakást elmentettük${storage?'':'. A mentés csak ezen az oldalon marad meg'}.`:`A(z) ${id} lakást eltávolítottuk a kedvencekből.`);
  }
  if(t.hasAttribute('data-close'))closeDialog(t.closest('dialog'));
  if(t.hasAttribute('data-copy-inquiry')){
    const a=byId(t.dataset.copyInquiry);if(a)copyText(`Érdeklődöm az Admiral Park ${a.id} lakása iránt.\n${a.building} épület, ${floorText(a)}\nNettó alapterület: ${area(a.areaInterior)}\nErkély: ${area(a.areaTerrace)}\nBruttó ár: ${price(a.price)}\n${apartmentLink(a.id)}`);
  }
},events);
function updateFavoriteButton(){
  const dialog=$('detail-dialog'),id=dialog.dataset.apartment,a=byId(id),button=dialog.querySelector('[data-save]');if(!button||!a)return;
  const saved=favorites.has(id);button.classList.toggle('is-saved',saved);button.setAttribute('aria-pressed',String(saved));
  button.setAttribute('aria-label',id+' '+(saved?'eltávolítása a kedvencekből':'mentése a kedvencekhez'));
  const label=button.querySelector('.detail-save-label');if(label)label.textContent=saved?'Kedvencekhez mentve':'Mentés a kedvencekhez';
}
function syncFavorites(event){
  if(event.type==='storage'&&event.key!=='admiral-park:favorites:v1')return;
  try{const ids=event.detail?.ids||JSON.parse(localStorage.getItem('admiral-park:favorites:v1')||'[]');if(Array.isArray(ids))favorites=new Set(ids.filter(id=>typeof id==='string'));}catch{storage=false;}
  updateFavoriteButton();
}
window.addEventListener('storage',syncFavorites,events);
window.addEventListener('admiral:apartment-favorites',syncFavorites,events);
root.addEventListener('keydown',event=>{
  if(event.key==='Escape'&&closeShare()){event.preventDefault();event.stopPropagation();return;}
  const tab=event.target.closest('[role=tab][data-detail-tab],[role=tab][data-document-view],[role=tab][data-room-view]');
  if(!tab||!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;
  const tabs=[...tab.closest('[role=tablist]').querySelectorAll('[role=tab]')],current=tabs.indexOf(tab),index=event.key==='Home'?0:event.key==='End'?tabs.length-1:(current+(event.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length;
  event.preventDefault();tabs[index].click();tabs[index].focus({preventScroll:true});
},events);
root.addEventListener('error',event=>{
  const image=event.target;
  if(image.matches?.('img[data-inline-media]'))setInlineMediaState(image,'error');
  if(image.matches?.('img[data-thumbnail]')){image.hidden=true;const fallback=image.parentElement.querySelector('.preview-unavailable');if(fallback)fallback.hidden=false;}
},{...events,capture:true});
root.addEventListener('load',event=>{if(event.target.matches?.('img[data-inline-media]'))setInlineMediaState(event.target,'ready');},{...events,capture:true});
for(const dialog of dialogs) {
  dialog.addEventListener('cancel',e=>{e.preventDefault();if(dialog.id==='detail-dialog'&&closeShare())return;closeDialog(dialog);},events);
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
window.addEventListener('resize',()=>{updateMediaTransform();requestAnimationFrame(fitDetailRooms);requestAnimationFrame(()=>{positionInquiryNotice();positionShareMenu();});},events);
let pdfExportJob=null;const pdfDownloadTimers=new Set(),pdfTriggerOwners=new WeakMap();
$('detail-dialog').addEventListener('close',()=>{pdfExportJob?.controller.abort();pdfExportJob=null;},events);
signal.addEventListener('abort',()=>{pdfExportJob?.controller.abort();for(const timer of pdfDownloadTimers)clearTimeout(timer);pdfDownloadTimers.clear();},{once:true});
let loadPromise=null;
async function load(){
  if(loadPromise)return loadPromise;
  config.onState?.('loading','');
  loadPromise=(async()=>{
    try{
      // Keep provided-data initialization asynchronous too, so concurrent opens
      // and retries share the same in-flight initialization promise.
      await Promise.resolve();
      if(config.dataset!==undefined)data=config.dataset;
      else{
        const response=await fetch(config.dataUrl||'./apartments.json',{cache:'no-cache',signal});
        if(!response.ok)throw new Error('HTTP '+response.status);
        data=await response.json();
      }
      if(signal.aborted)return;
      if(!data||data.schemaVersion!=='1.0'||!Array.isArray(data.apartments))throw new Error('Nem támogatott adatformátum');
      const ids=new Set();
      for(const a of data.apartments){
        if(!a||typeof a.id!=='string'||!a.id||ids.has(a.id)||!Object.hasOwn(labels,a.status)||typeof a.building!=='string')throw new Error('Hibás vagy ismétlődő lakásadat');
        ids.add(a.id);
        for(const field of ['floor','rooms','areaInterior','areaTerrace','areaGarden','price'])if(a[field]!=null&&(!hasNumber(a[field])||a[field]<0))throw new Error('Hibás számadat');
      }
      apartments=data.apartments;favorites=new Set([...favorites].filter(id=>ids.has(id)));
      config.onState?.('ready','');config.onReady?.(controller);
      if(requestedApartmentId){if(byId(requestedApartmentId))detail(requestedApartmentId);else config.onState?.('error','A kiválasztott lakás nem található.');}
    }catch(error){
      if(signal.aborted)return;
      data=undefined;apartments=[];
      config.onState?.('error','Nem sikerült betölteni a lakás adatait. Próbálja újra.');
    }finally{loadPromise=null;}
  })();
  return loadPromise;
}
const controller={
  open(id){
    requestedApartmentId=typeof id==='string'?id:null;if(!requestedApartmentId)return;
    if(pdfExportJob&&pdfExportJob.id!==requestedApartmentId){pdfExportJob.controller.abort();pdfExportJob=null;}
    if(data){if(byId(requestedApartmentId)){config.onState?.('ready','');detail(requestedApartmentId);}else config.onState?.('error','A kiválasztott lakás nem található.');}
  },
  close(){requestedApartmentId=null;pdfExportJob?.controller.abort();pdfExportJob=null;for(const dialog of [...dialogs].reverse())closeDialog(dialog);},
  download(id,trigger){return downloadDatasheet(id,trigger);},
  retry(){return load();},
  dispose(){lifecycle.abort();detailResize?.disconnect();clearTimeout(toastTimer);for(const d of [...dialogs].reverse()){if(d.open)d.close();modalRegistry.delete(d);}for(const url of downloadUrls)URL.revokeObjectURL(url);downloadUrls.clear();mediaView=null;syncModalState();}
};
load();
return controller;
}
