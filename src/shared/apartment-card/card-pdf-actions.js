// Replacements applied by extract-apartment-card.mjs; the upstream list snapshot
// remains read-only. Both list and orbit call this one shared export path.
function downloadLink(a,large=false) {
  return `<span class="download-wrap"><button type="button" class="datasheet-link action-pill${large?' datasheet-large footer-pill':''}" data-download="${esc(a.id)}" aria-label="${esc(a.id)} lakás adatlapjának letöltése PDF formátumban" title="Lakásadatlap letöltése">${downloadIcon}<span>Adatlap</span></button></span>`;
}

async function downloadDatasheet(id,trigger) {
  const a=byId(id),dialog=$('detail-dialog');
  if(!a||!dialog.open)return;
  if(pdfExportJob){if(pdfExportJob.id===id)return;pdfExportJob.controller.abort();pdfExportJob=null;}
  const shell=dialog.querySelector('.detail-shell'),computed=getComputedStyle(shell);
  const colors={};
  for(const [key,property] of [['top','--detail-top'],['bottom','--detail-bottom'],['ink','--detail-ink'],['muted','--detail-muted'],['watermarkTop','--detail-watermark-top'],['watermarkBottom','--detail-watermark-bottom'],['accent','--accent']])colors[key]=computed.getPropertyValue(property).trim();
  colors.status=getComputedStyle(dialog.querySelector('.status-pill')).color;
  const layout=data.roomLayouts?.[a.apartmentType],markers=validPlanMarkers(layout),rooms=Array.isArray(a.roomList)?a.roomList:[];
  const mapped=markers.length&&rooms.length===markers.length&&markers.every(marker=>rooms.some(room=>room.planNumber===marker.number));
  const unitRows=rooms.map(room=>({name:roomLabel(room.name),area:area(room.area)}));
  const typeRows=markers.map(marker=>({number:marker.number,name:roomLabel(marker.name),area:mapped?area(rooms.find(room=>room.planNumber===marker.number).area):null}));
  const roomGroups=markers.length?[{label:mapped?'Típusterv · Helyiségterületek':'Típusterv · Számozott helyiségek',rows:typeRows}]:[];
  if(!mapped||!markers.length)roomGroups.push({label:markers.length?'Lakásterületek · A kiválasztott lakás adatai':'Helyiségterületek',rows:unitRows});
  const floor=dialog.querySelector('[data-document-view="floor"][aria-selected="true"]')?mediaEntries(a).find(item=>item.key==='floorLayout'):null;
  const view=layout?.viewBox||{x:0,y:0,width:1,height:1};
  const validView=[view.x,view.y,view.width,view.height].every(hasNumber)&&view.x>=0&&view.y>=0&&view.width>0&&view.height>0&&view.x+view.width<=1.001&&view.y+view.height<=1.001;
  const source=a.media?.floorplan;
  const pageUrl=apartmentLink(a.id),inquiryUrl=safeUrl(config.inquiryUrl),actionUrl=new URL(inquiryUrl||pageUrl);if(inquiryUrl)actionUrl.searchParams.set('apartment',a.id);
  const snapshot={
    id:String(a.id),date:new Date(),colors,
    metrics:[{label:'Beltér',value:area(a.areaInterior)},{label:'Erkély',value:area(a.areaTerrace)},...(a.areaGarden>0?[{label:'Kert',value:area(a.areaGarden)}]:[])],
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
  const controller=new AbortController(),job={controller,id};pdfExportJob=job;
  const abort=()=>controller.abort();signal.addEventListener('abort',abort,{once:true});
  const timeout=setTimeout(abort,45000),label=trigger.querySelector('span'),previous=label?.textContent;
  trigger.setAttribute('aria-busy','true');trigger.setAttribute('aria-disabled','true');if(label)label.textContent='PDF készül…';
  toast('A lakás adatlapja készül…');
  try{
    const blob=await createAdmiralApartmentPdf(snapshot,{signal:controller.signal});
    if(signal.aborted||controller.signal.aborted||!dialog.open||dialog.dataset.apartment!==id)return;
    const url=URL.createObjectURL(blob);downloadUrls.add(url);
    const link=document.createElement('a');link.href=url;link.download=`Admiral-Park-${String(a.id).replace(/[^A-Za-z0-9_-]/g,'-')}-adatlap.pdf`;
    shell.append(link);link.click();link.remove();
    const timer=setTimeout(()=>{URL.revokeObjectURL(url);downloadUrls.delete(url);pdfDownloadTimers.delete(timer);},30000);pdfDownloadTimers.add(timer);
    toast('A lakás adatlapjának letöltése elindult.');
  }catch(error){
    if(!signal.aborted&&dialog.open&&dialog.dataset.apartment===id)toast('Nem sikerült elkészíteni a PDF-et. Próbálja újra.');
  }finally{
    clearTimeout(timeout);controller.abort();signal.removeEventListener('abort',abort);if(pdfExportJob===job)pdfExportJob=null;
    trigger.removeAttribute('aria-busy');trigger.removeAttribute('aria-disabled');if(label)label.textContent=previous;
  }
}
