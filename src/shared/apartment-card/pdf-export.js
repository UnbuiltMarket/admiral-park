// Export-only renderer. Inlined into the shared Framer card, never mounted as UI.
// Libraries and print fonts load on demand; apartment data is never uploaded.
async function loadAdmiralPdfTools() {
  const key=Symbol.for('admiral-park:pdf-tools:v1');
  if(window[key])return window[key];
  const load=(url,integrity,name)=>new Promise((resolve,reject)=>{
    const script=document.createElement('script');
    script.src=url;script.integrity=integrity;script.crossOrigin='anonymous';script.async=true;
    const finish=(error)=>{clearTimeout(timer);script.onload=null;script.onerror=null;script.remove();error?reject(error):resolve(window[name]);};
    const timer=setTimeout(()=>finish(new Error('PDF library timeout')),20000);
    script.onload=()=>finish(window[name]?null:new Error('Invalid PDF library'));
    script.onerror=()=>finish(new Error('PDF library unavailable'));
    document.head.append(script);
  });
  const promise=Promise.all([
    load('https://cdn.jsdelivr.net/npm/pdf-lib@1.17.1/dist/pdf-lib.min.js','sha384-weMABwrltA6jWR8DDe9Jp5blk+tZQh7ugpCsF3JwSA53WZM9/14PjS5LAJNHNjAI','PDFLib'),
    load('https://cdn.jsdelivr.net/npm/@pdf-lib/fontkit@1.1.1/dist/fontkit.umd.min.js','sha384-2p6U+1mmqF10USehFeRiyG2ESG9FwIqN+jxULn5w9jjQIihSn9Pt13dVCn/Hawjn','fontkit'),
  ]).then(([pdf,fontkit])=>({pdf,fontkit}));
  window[key]=promise;
  try{return await promise;}catch(error){if(window[key]===promise)delete window[key];throw error;}
}

async function createAdmiralApartmentPdf(snapshot,options) {
  const {signal}=options;
  const check=()=>{if(signal.aborted)throw new DOMException('Export cancelled','AbortError');};
  const resources=[],canvases=[];
  const canvas=(width,height)=>{const c=document.createElement('canvas');c.width=width;c.height=height;canvases.push(c);return c;};
  async function bytes(url){
    if(!url)throw new Error('Missing PDF asset');
    const response=await fetch(url,{signal,credentials:'omit'});
    if(!response.ok)throw new Error('PDF asset unavailable: '+response.status);
    return new Uint8Array(await response.arrayBuffer());
  }
  async function image(content,type){
    check();const url=URL.createObjectURL(new Blob([content],{type}));resources.push(url);
    const img=new Image();img.src=url;await img.decode();check();return img;
  }
  async function jpeg(c,quality){
    const blob=await new Promise(resolve=>c.toBlob(resolve,'image/jpeg',quality));
    if(!blob)throw new Error('Image compression failed');
    check();return new Uint8Array(await blob.arrayBuffer());
  }
  try{
    const [{pdf:lib,fontkit},regularBytes,semiboldBytes,planBytes,logoBytes,monogramBytes]=await Promise.all([
      loadAdmiralPdfTools(),bytes(snapshot.fontRegular),bytes(snapshot.fontSemibold),
      snapshot.imageUrl?bytes(snapshot.imageUrl):null,bytes(snapshot.logoUrl),bytes(snapshot.monogramUrl),
    ]);
    check();
    const pdf=await lib.PDFDocument.create();pdf.registerFontkit(fontkit);
    const [regular,semibold]=await Promise.all([pdf.embedFont(regularBytes,{subset:true}),pdf.embedFont(semiboldBytes,{subset:true})]);
    const W=1120,H=700,page=pdf.addPage([W,H]);
    pdf.setTitle('Admiral Park - '+snapshot.id+' lakás');pdf.setAuthor('Admiral Park');
    pdf.setSubject(snapshot.id+' - egyedi lakásadatlap');pdf.setCreator('Admiral Park apartment detail card');pdf.setCreationDate(snapshot.date);
    const swatch=canvas(1,1),sc=swatch.getContext('2d');
    function color(value,fallback){sc.clearRect(0,0,1,1);sc.fillStyle=fallback;sc.fillStyle=value||fallback;sc.fillRect(0,0,1,1);return [...sc.getImageData(0,0,1,1).data].slice(0,3).map(v=>v/255);}
    const colors={top:color(snapshot.colors.top,'#fdfbfb'),bottom:color(snapshot.colors.bottom,'#e4e9ec'),ink:color(snapshot.colors.ink,'#242824'),muted:color(snapshot.colors.muted,'#687074'),watermarkTop:color(snapshot.colors.watermarkTop,'#f2f0f1'),watermarkBottom:color(snapshot.colors.watermarkBottom,'#d9dfe2'),accent:color(snapshot.colors.accent,'#a38c69'),status:color(snapshot.colors.status,'#4f7959')};
    const rgb=value=>lib.rgb(...value);
    const css=value=>'rgb('+value.map(v=>Math.round(v*255)).join(',')+')';
    const mix=(a,b,t)=>a.map((v,i)=>v+(b[i]-v)*t);
    const ink=rgb(colors.ink),muted=rgb(colors.muted);
    function text(value,x,top,size=10,font=regular,tone=ink){
      const str=String(value??'').replace(/\u00a0|\u202f/g,' ');
      // Unknown characters use an explicit replacement glyph; never drop ő/ű.
      const supported=font.getCharacterSet(),safe=[...str].map(c=>supported.includes(c.codePointAt(0))?c:'?').join('');
      page.drawText(safe,{x,y:H-top-size,size,font,color:tone});return font.widthOfTextAtSize(safe,size);
    }
    function centered(value,cx,top,size=10,font=regular,tone=ink){return text(value,cx-font.widthOfTextAtSize(String(value),size)/2,top,size,font,tone);}
    function right(value,x,top,size=10,font=regular,tone=ink){return text(value,x-font.widthOfTextAtSize(String(value),size),top,size,font,tone);}
    function line(x,y,width,opacity=.18){page.drawLine({start:{x,y:H-y},end:{x:x+width,y:H-y},thickness:.55,color:muted,opacity});}
    function fit(value,width,size=10,font=regular){return Math.min(size,width/Math.max(1,font.widthOfTextAtSize(String(value),size))*size);}
    function wrap(value,width,size=10,font=regular){
      const rows=[];let row='';
      for(const word of String(value).split(/\s+/)){const next=row?row+' '+word:word;if(row&&font.widthOfTextAtSize(next,size)>width){rows.push(row);row=word;}else row=next;}
      if(row)rows.push(row);return rows;
    }
    // Only the soft gradient and watermark are rasterised; text and logo stay vectors.
    const background=canvas(W,H),bg=background.getContext('2d'),gradient=bg.createLinearGradient(0,0,0,H);
    gradient.addColorStop(0,css(colors.top));gradient.addColorStop(1,css(colors.bottom));bg.fillStyle=gradient;bg.fillRect(0,0,W,H);
    const monogram=await image(monogramBytes,'image/png'),motif=canvas(W,H),mc=motif.getContext('2d');
    const motifGradient=mc.createLinearGradient(0,0,0,H);motifGradient.addColorStop(0,css(colors.watermarkTop));motifGradient.addColorStop(1,css(colors.watermarkBottom));
    mc.fillStyle=motifGradient;mc.fillRect(0,0,W,H);mc.globalCompositeOperation='destination-in';
    const scale=Math.min(W*.67/monogram.naturalWidth,H/monogram.naturalHeight),mw=monogram.naturalWidth*scale,mh=monogram.naturalHeight*scale;
    mc.drawImage(monogram,W-W*.67+(W*.67-mw)/2,(H-mh)/2,mw,mh);bg.globalAlpha=.6;bg.drawImage(motif,0,0);bg.globalAlpha=1;
    const backgroundImage=await pdf.embedJpg(await jpeg(background,.92));page.drawImage(backgroundImage,{x:0,y:0,width:W,height:H});
    const rx=638,rw=454;
    // Logo uses the same SVG paths as the card's CSS mask.
    const logoDocument=new DOMParser().parseFromString(new TextDecoder().decode(logoBytes),'image/svg+xml');
    if(logoDocument.querySelector('parsererror'))throw new Error('Invalid brand SVG');
    const vb=(logoDocument.documentElement.getAttribute('viewBox')||'0 0 1232 524').trim().split(/[\s,]+/).map(Number),logoW=188,logoScale=logoW/vb[2],logoX=rx+7,logoY=42;
    const paths=[...logoDocument.querySelectorAll('path')];
    if(paths.length&&!logoDocument.querySelector('[transform]')){
      for(const path of paths)page.drawSvgPath(path.getAttribute('d'),{x:logoX-vb[0]*logoScale,y:H-logoY+vb[1]*logoScale,scale:logoScale,color:ink});
    }else{
      const logo=await image(logoBytes,'image/svg+xml'),lc=canvas(752,Math.round(752*vb[3]/vb[2])),ctx=lc.getContext('2d');ctx.drawImage(logo,0,0,lc.width,lc.height);ctx.globalCompositeOperation='source-in';ctx.fillStyle=css(colors.ink);ctx.fillRect(0,0,lc.width,lc.height);
      const png=await new Promise(resolve=>lc.toBlob(resolve,'image/png'));if(!png)throw new Error('Logo encoding failed');
      page.drawImage(await pdf.embedPng(await png.arrayBuffer()),{x:logoX,y:H-logoY-logoW*vb[3]/vb[2],width:logoW,height:logoW*vb[3]/vb[2]});
    }
    centered(snapshot.id,rx+rw*.77,32,40,semibold);
    const metrics=snapshot.metrics,metricsX=rx+rw*.49,metricsW=rw*.51;
    metrics.forEach((metric,i)=>{const cx=metricsX+metricsW*(i+.5)/metrics.length;centered(metric.label,cx,84,12,regular,muted);centered(metric.value,cx,103,fit(metric.value,metricsW/metrics.length-9,24,semibold),semibold);});
    line(rx,160,rw);
    text(snapshot.documentLabel,28,27,10,regular);line(28,45,snapshot.documentLabel==='Alaprajz'?42:44,.9);
    right(snapshot.meta,607,28,fit(snapshot.meta,450,9),regular,muted);
    // Crop and fit the same plan as the detail card; no live viewport/tab clipping.
    const frame={x:28,top:66,width:579,height:584};
    if(planBytes){
      const img=await image(planBytes,'image/*'),v=snapshot.viewBox,iw=img.naturalWidth,ih=img.naturalHeight;
      const sx=iw*v.x,sy=ih*v.y,sw=iw*v.width,sh=ih*v.height;
      if(!(sw>0&&sh>0&&iw>0&&ih>0))throw new Error('Invalid floorplan dimensions');
      const scale=Math.min(frame.width/sw,frame.height/sh),pw=sw*scale,ph=sh*scale,px=frame.x+(frame.width-pw)/2,pt=frame.top+(frame.height-ph)/2;
      const rasterScale=Math.min(1,1800/Math.max(sw,sh)),plan=canvas(Math.round(sw*rasterScale),Math.round(sh*rasterScale)),ctx=plan.getContext('2d');
      const pg=ctx.createLinearGradient(0,0,0,plan.height);pg.addColorStop(0,css(mix(colors.top,colors.bottom,pt/H)));pg.addColorStop(1,css(mix(colors.top,colors.bottom,(pt+ph)/H)));ctx.fillStyle=pg;ctx.fillRect(0,0,plan.width,plan.height);ctx.drawImage(img,sx,sy,sw,sh,0,0,plan.width,plan.height);
      const embedded=await pdf.embedJpg(await jpeg(plan,.94));page.drawImage(embedded,{x:px,y:H-pt-ph,width:pw,height:ph});
      for(const marker of snapshot.markers){
        const mx=(marker.x-v.x)/v.width,my=(marker.y-v.y)/v.height;if(mx<0||mx>1||my<0||my>1)continue;
        const x=px+pw*mx,y=pt+ph*my;
        page.drawCircle({x,y:H-y,size:7.5,color:lib.rgb(1,1,1),opacity:.94,borderColor:muted,borderWidth:.35,borderOpacity:.5});centered(String(marker.number),x,y-4.6,8.5,regular);
      }
    }else{text('Az alaprajz még nem érhető el.',frame.x+40,frame.top+150,13,regular,muted);}
    text('Helyiségek.',rx,186,18,regular);
    if(snapshot.layoutLabel)text(snapshot.layoutLabel,rx+112,193,fit(snapshot.layoutLabel,rw-112,8),regular,muted);
    // Mapped plans share one numbered list. Unmapped unit areas remain a separate
    // list, never paired with type-plan markers by array index or room name.
    const groups=snapshot.roomGroups,roomTop=222,roomBottom=502,columns=groups.length>1?2:1,columnGap=20,columnWidth=(rw-columnGap*(columns-1))/columns;
    const nameWidth=row=>columnWidth-(row.number!=null?22:0)-(row.area?70:5);
    const maxUnits=Math.max(1,...groups.map(group=>group.rows.reduce((n,row)=>n+Math.max(1,wrap(row.name,nameWidth(row),9).length),0)+3.6));
    const rowHeight=Math.min(22,(roomBottom-roomTop)/maxUnits),roomSize=Math.min(columns>1?9:10,rowHeight*.72);
    if(roomSize<7.5)throw new Error('The room list is too long for the export layout');
    let maxY=roomTop;
    for(const [groupIndex,group] of groups.entries()){
      const gx=rx+groupIndex*(columnWidth+columnGap);let y=roomTop;
      const headings=wrap(group.label,columnWidth,7.5,semibold);headings.forEach((heading,i)=>text(heading,gx,y+i*10,7.5,semibold,muted));y+=Math.max(rowHeight*1.4,headings.length*10+6);
      if(!group.rows.length){text('A helyiséglista még nem érhető el.',gx,y,8,regular,muted);y+=rowHeight;}
      for(const row of group.rows){
        const numbered=row.number!=null,indent=numbered?22:0,names=wrap(row.name,nameWidth(row),roomSize);
        if(numbered){page.drawCircle({x:gx+7,y:H-y-5.5,size:Math.min(6.5,rowHeight*.42),borderColor:muted,borderWidth:.4,borderOpacity:.5});centered(String(row.number).padStart(2,'0'),gx+7,y+.3,Math.min(6.7,rowHeight*.52),regular,muted);}
        names.forEach((name,i)=>text(name,gx+indent,y+i*rowHeight,roomSize,regular,muted));
        if(row.area)right(row.area,gx+columnWidth,y,roomSize,regular,muted);
        y+=rowHeight*names.length;line(gx,y-2,columnWidth,.2);
      }
      maxY=Math.max(maxY,y);
    }
    if(maxY>515)throw new Error('The room list is too long for the export layout');
    // Match the card's price panel and gold action, with a useful PDF link.
    page.drawRectangle({x:rx,y:H-575,width:rw,height:64,color:ink,opacity:.035});
    centered('Bruttó vételár',rx+rw/2,518,10,regular,muted);
    centered(snapshot.price,rx+rw/2,535,fit(snapshot.price,rw-30,33),regular);
    const actionTop=586,actionHeight=43;
    page.drawRectangle({x:rx+21,y:H-actionTop-actionHeight,width:rw-42,height:actionHeight,color:rgb(colors.accent)});
    page.drawCircle({x:rx+21,y:H-actionTop-actionHeight/2,size:21.5,color:rgb(colors.accent)});
    page.drawCircle({x:rx+rw-21,y:H-actionTop-actionHeight/2,size:21.5,color:rgb(colors.accent)});
    centered(snapshot.actionLabel,rx+rw/2,actionTop+10,17,semibold);
    const actionLink=pdf.context.register(pdf.context.obj({Type:'Annot',Subtype:'Link',Rect:[rx,H-actionTop-actionHeight,rx+rw,H-actionTop],Border:[0,0,0],A:{Type:'Action',S:'URI',URI:lib.PDFString.of(snapshot.actionUrl)}}));
    page.node.addAnnot(actionLink);
    page.drawCircle({x:rx+8,y:H-653,size:2.2,color:rgb(colors.status)});text(snapshot.status,rx+18,646,11,regular,rgb(colors.status));
    right('admiralpark.hu',rx+rw,647,9,regular,muted);
    text('Az alaprajz illusztráció. Bútorozatlan átadás.',9,680,7,regular,muted);
    right('Letöltve: '+new Intl.DateTimeFormat('hu-HU').format(snapshot.date),W-12,680,7,regular,muted);
    const online=pdf.context.register(pdf.context.obj({Type:'Annot',Subtype:'Link',Rect:[rx,H-664,rx+rw,H-643],Border:[0,0,0],A:{Type:'Action',S:'URI',URI:lib.PDFString.of(snapshot.pageUrl)}}));page.node.addAnnot(online);
    check();const output=await pdf.save({useObjectStreams:true});check();
    return new Blob([output],{type:'application/pdf'});
  }finally{
    for(const url of resources)URL.revokeObjectURL(url);
    for(const c of canvases){c.width=1;c.height=1;}
  }
}
