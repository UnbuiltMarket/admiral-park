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
    const colors={top:color(snapshot.colors.top,'#fdfbfb'),bottom:color(snapshot.colors.bottom,'#e4e9ec'),ink:color(snapshot.colors.ink,'#242824'),muted:color(snapshot.colors.muted,'#687074'),watermarkTop:color(snapshot.colors.watermarkTop,'#f2f0f1'),watermarkBottom:color(snapshot.colors.watermarkBottom,'#d9dfe2'),frostedTint:color(snapshot.colors.frostedTint,FROSTED_BUTTON_DEFAULTS.tint),frostedText:color(snapshot.colors.frostedText,FROSTED_BUTTON_DEFAULTS.text),status:color(snapshot.colors.status,'#4f7959')};
    const rgb=value=>lib.rgb(...value);
    const css=value=>'rgb('+value.map(v=>Math.round(v*255)).join(',')+')';
    const mix=(a,b,t)=>a.map((v,i)=>v+(b[i]-v)*t);
    const ink=rgb(colors.ink),muted=rgb(colors.muted),blue=rgb(color(snapshot.colors.controlBlue,'#225d82'));
    const rx=640,rw=454,actionTop=580,actionHeight=48;
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
    const paperTop=mix(colors.top,[1,1,1],.12),paperBottom=mix(colors.bottom,[1,1,1],.55);
    gradient.addColorStop(0,css(paperTop));gradient.addColorStop(1,css(paperBottom));bg.fillStyle=gradient;bg.fillRect(0,0,W,H);
    const monogram=await image(monogramBytes,'image/png'),motif=canvas(W,H),mc=motif.getContext('2d');
    const motifGradient=mc.createLinearGradient(0,0,0,H);motifGradient.addColorStop(0,css(colors.watermarkTop));motifGradient.addColorStop(1,css(colors.watermarkBottom));
    mc.fillStyle=motifGradient;mc.fillRect(0,0,W,H);mc.globalCompositeOperation='destination-in';
    const scale=Math.min(W*.67/monogram.naturalWidth,H/monogram.naturalHeight),mw=monogram.naturalWidth*scale,mh=monogram.naturalHeight*scale;
    mc.drawImage(monogram,W-W*.67+(W*.67-mw)/2,(H-mh)/2,mw,mh);bg.globalAlpha=.24;bg.drawImage(motif,0,0);bg.globalAlpha=1;
    function glassBand(top,height,tint,strength) {
      const shade=bg.createLinearGradient(rx,top,rx+rw,top+height);
      shade.addColorStop(0,css(mix(tint,[1,1,1],Math.min(1,strength+.12))));
      shade.addColorStop(1,css(mix(tint,[1,1,1],strength)));
      bg.save();
      bg.beginPath();bg.roundRect(rx+.5,top+.5,rw-1,height-1,height/2);
      bg.shadowColor='rgba(29,63,88,.13)';bg.shadowBlur=6;bg.shadowOffsetY=2;
      bg.fillStyle=shade;bg.fill();bg.shadowColor='transparent';
      bg.strokeStyle=css(mix(tint,[1,1,1],strength-.1));bg.lineWidth=.8;bg.stroke();bg.restore();
    }
    glassBand(526,44,colors.bottom,.73);
    glassBand(actionTop,actionHeight,colors.frostedTint,.75);
    const backgroundImage=await pdf.embedJpg(await jpeg(background,.92));page.drawImage(backgroundImage,{x:0,y:0,width:W,height:H});
    // Logo uses the same SVG paths as the card's CSS mask.
    const logoDocument=new DOMParser().parseFromString(new TextDecoder().decode(logoBytes),'image/svg+xml');
    if(logoDocument.querySelector('parsererror'))throw new Error('Invalid brand SVG');
    const vb=(logoDocument.documentElement.getAttribute('viewBox')||'0 0 1232 524').trim().split(/[\s,]+/).map(Number),logoW=174,logoScale=logoW/vb[2],logoX=rx+(rw-logoW)/2,logoY=30;
    const paths=[...logoDocument.querySelectorAll('path')];
    if(paths.length&&!logoDocument.querySelector('[transform]')){
      for(const path of paths)page.drawSvgPath(path.getAttribute('d'),{x:logoX-vb[0]*logoScale,y:H-logoY+vb[1]*logoScale,scale:logoScale,color:ink});
    }else{
      const logo=await image(logoBytes,'image/svg+xml'),lc=canvas(752,Math.round(752*vb[3]/vb[2])),ctx=lc.getContext('2d');ctx.drawImage(logo,0,0,lc.width,lc.height);ctx.globalCompositeOperation='source-in';ctx.fillStyle=css(colors.ink);ctx.fillRect(0,0,lc.width,lc.height);
      const png=await new Promise(resolve=>lc.toBlob(resolve,'image/png'));if(!png)throw new Error('Logo encoding failed');
      page.drawImage(await pdf.embedPng(await png.arrayBuffer()),{x:logoX,y:H-logoY-logoW*vb[3]/vb[2],width:logoW,height:logoW*vb[3]/vb[2]});
    }
    function valueWithUnit(value,unit,cx,top,width,size,font,tone) {
      const gap=unit?3:0,unitSize=unit?10:0,uw=unit?regular.widthOfTextAtSize(unit,unitSize):0;
      const pointSize=fit(value,width-uw-gap,size,font),vw=font.widthOfTextAtSize(value,pointSize);
      const x=cx-(vw+uw+gap)/2;
      text(value,x,top,pointSize,font,tone);
      if(unit)text(unit,x+vw+gap,top+pointSize-unitSize,unitSize,regular,muted);
    }
    const metrics=snapshot.metrics,cellWidth=rw/metrics.length;
    metrics.forEach((metric,i)=>{
      const cx=rx+cellWidth*(i+.5);
      centered(metric.label,cx,128,12,regular,muted);
      valueWithUnit(metric.value,metric.unit,cx,146,cellWidth-9,26,semibold,i===0?blue:ink);
    });
    line(rx,193,rw);
    right(snapshot.meta,609,26,fit(snapshot.meta,485,12,semibold),semibold,blue);
    if(snapshot.documentLabel!=='Alaprajz')text(snapshot.documentLabel,28,27,10,semibold,muted);
    // Crop and fit the same plan as the detail card; no live viewport/tab clipping.
    const overview=snapshot.overview;
    const legendSpace=overview?74+overview.legend.length*14:0;
    const frame={x:40,top:74,width:558,height:541-legendSpace};
    if(planBytes){
      const img=await image(planBytes,'image/*'),v=snapshot.viewBox,iw=img.naturalWidth,ih=img.naturalHeight;
      const sx=iw*v.x,sy=ih*v.y,sw=iw*v.width,sh=ih*v.height;
      if(!(sw>0&&sh>0&&iw>0&&ih>0))throw new Error('Invalid floorplan dimensions');
      const scale=Math.min(frame.width/sw,frame.height/sh),pw=sw*scale,ph=sh*scale,px=frame.x+(frame.width-pw)/2,pt=frame.top+(frame.height-ph)/2;
      const rasterScale=Math.min(1,1800/Math.max(sw,sh)),plan=canvas(Math.round(sw*rasterScale),Math.round(sh*rasterScale)),ctx=plan.getContext('2d');
      ctx.drawImage(background,px,pt,pw,ph,0,0,plan.width,plan.height);
      ctx.drawImage(img,sx,sy,sw,sh,0,0,plan.width,plan.height);
      if(snapshot.unitOutline){
        ctx.save();ctx.scale(plan.width/sw,plan.height/sh);ctx.translate(-sx,-sy);
        const outline=new Path2D(snapshot.unitOutline);
        ctx.fillStyle='rgba(17,97,163,.18)';ctx.fill(outline);ctx.lineJoin='round';
        ctx.strokeStyle='#fff';ctx.lineWidth=7/scale;ctx.stroke(outline);
        ctx.strokeStyle='#17659c';ctx.lineWidth=3.5/scale;ctx.stroke(outline);ctx.restore();
      }
      const embedded=await pdf.embedJpg(await jpeg(plan,.94));page.drawImage(embedded,{x:px,y:H-pt-ph,width:pw,height:ph});
      if(overview){
        const mapX=x=>px+(x-sx)*scale,mapY=y=>pt+(y-sy)*scale;
        for(const [letter,point] of Object.entries(overview.labels)){
          const x=mapX(point[0]),y=mapY(point[1]);
          page.drawCircle({x,y:H-y,size:8,color:lib.rgb(1,1,1),borderColor:blue,borderWidth:.8});
          centered(letter,x,y-5.8,9,semibold,blue);
        }
        const north=overview.compass,nx=mapX(north.x),ny=mapY(north.y);
        const angle=north.angle*Math.PI/180;
        const tip={x:nx+6*Math.sin(angle),y:H-ny+6*Math.cos(angle)};
        page.drawLine({start:{x:nx-5*Math.sin(angle),y:H-ny-5*Math.cos(angle)},end:tip,thickness:1.4,color:blue});
        for(const side of [-1,1]){
          const a=angle+side*Math.PI/5;
          page.drawLine({start:tip,end:{x:tip.x-4*Math.sin(a),y:tip.y-4*Math.cos(a)},thickness:1,color:blue});
        }
        centered('É',nx+9*Math.sin(angle),ny-9*Math.cos(angle)-9,8,semibold,blue);
        const lakeY=pt+ph+10;
        line(px,lakeY,pw*.43,.5);line(px+pw*.57,lakeY,pw*.43,.5);
        centered('Balaton',px+pw/2,lakeY-5.5,8,semibold,blue);
        const lx=frame.x+frame.width*.14,lw=frame.width*.72,legendTop=frame.top+frame.height+22;
        text('Lakástípusok',lx,legendTop,11,semibold);
        right('Beltér (m²)',lx+lw*.58,legendTop+2,8,regular,muted);
        right(overview.exteriorLabel+' (m²)',lx+lw,legendTop+2,8,regular,muted);
        overview.legend.forEach((row,index)=>{
          const y=legendTop+18+index*14;
          page.drawCircle({x:lx+4,y:H-y-5,size:3.8,color:rgb(color(row.color,'#dde3e8')),borderColor:muted,borderWidth:.3});
          text(row.type,lx+13,y,8.5,semibold);right(row.interior,lx+lw*.58,y,8.5,regular);right(row.exterior,lx+lw,y,8.5,regular);
        });
      }
      for(const marker of snapshot.markers){
        const mx=(marker.x-v.x)/v.width,my=(marker.y-v.y)/v.height;if(mx<0||mx>1||my<0||my>1)continue;
        const x=px+pw*mx,y=pt+ph*my;
        page.drawCircle({x,y:H-y,size:7.5,color:lib.rgb(1,1,1),opacity:.94,borderColor:muted,borderWidth:.35,borderOpacity:.5});centered(String(marker.number),x,y-4.6,8.5,regular);
      }
    }else{text('Az alaprajz még nem érhető el.',frame.x+40,frame.top+150,13,regular,muted);}
    const heading='Helyiséglista.';
    const headingWidth=text(heading,rx,227,18,regular);
    if(snapshot.layoutLabel)text(snapshot.layoutLabel,rx+headingWidth+9,236,fit(snapshot.layoutLabel,rw-headingWidth-9,8),regular,muted);
    // Use the online card's room ordering and its verified marker-number mapping.
    const rows=snapshot.roomRows,roomTop=259,roomBottom=508,nameWidth=rw-101;
    const wrapped=rows.map(row=>wrap(row.name,nameWidth,10,regular));
    const totalLines=wrapped.reduce((sum,names)=>sum+Math.max(1,names.length),0);
    const rowHeight=Math.min(22,(roomBottom-roomTop)/Math.max(1,totalLines));
    const roomSize=Math.min(10,rowHeight*.72);
    if(roomSize<7.5)throw new Error('The room list is too long for the export layout');
    let y=roomTop;
    if(!rows.length)text('A helyiséglista még nem érhető el.',rx,y,10,regular,muted);
    for(const [index,row] of rows.entries()){
      const names=wrapped[index];
      if(row.number!=null){
        const radius=Math.min(6.6,rowHeight*.4);
        page.drawCircle({x:rx+8,y:H-y-5.8,size:radius,color:lib.rgb(1,1,1),borderColor:muted,borderWidth:.4,borderOpacity:.45});
        centered(String(row.number).padStart(2,'0'),rx+8,y+.9,Math.min(7.5,rowHeight*.53),regular,muted);
      }
      names.forEach((name,i)=>text(name,rx+22,y+i*rowHeight,roomSize,regular,ink));
      right(row.area,rx+rw-3,y,roomSize,regular,ink);
      y+=rowHeight*Math.max(1,names.length);line(rx,y-3,rw,.25);
    }
    valueWithUnit(snapshot.price,snapshot.priceUnit,rx+rw/2,529,rw-30,31,regular,ink);
    centered(snapshot.actionLabel,rx+rw/2,actionTop+14,15,semibold,rgb(colors.frostedText));
    const actionLink=pdf.context.register(pdf.context.obj({Type:'Annot',Subtype:'Link',Rect:[rx,H-actionTop-actionHeight,rx+rw,H-actionTop],Border:[0,0,0],A:{Type:'Action',S:'URI',URI:lib.PDFString.of(snapshot.actionUrl)}}));
    page.node.addAnnot(actionLink);
    page.drawCircle({x:rx+8,y:H-653,size:2.6,color:rgb(colors.status)});text(snapshot.status,rx+18,644,13,regular,rgb(colors.status));
    right('admiralpark.hu',rx+rw,645,10,semibold,blue);
    centered('Az alaprajz illusztráció. Bútorozatlan átadás. Bruttó vételár.',frame.x+frame.width/2,663,7,regular,muted);
    right('Letöltve: '+new Intl.DateTimeFormat('hu-HU').format(snapshot.date),rx+rw,677,7,regular,muted);
    const online=pdf.context.register(pdf.context.obj({Type:'Annot',Subtype:'Link',Rect:[rx,H-664,rx+rw,H-643],Border:[0,0,0],A:{Type:'Action',S:'URI',URI:lib.PDFString.of(snapshot.pageUrl)}}));page.node.addAnnot(online);
    check();const output=await pdf.save({useObjectStreams:true});check();
    return new Blob([output],{type:'application/pdf'});
  }finally{
    for(const url of resources)URL.revokeObjectURL(url);
    for(const c of canvases){c.width=1;c.height=1;}
  }
}
