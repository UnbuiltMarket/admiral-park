"""Read-only, native Mac display diagnostics at an already-hovered checkpoint."""
import base64
import collections
import json
import os
import struct
import subprocess
import tempfile
import time
import qa


PROBE=r"""(async()=>{
 const n=document.createElement('meta');n.id='ap-display-report';document.head.append(n);
 const report={};function update(){n.content=JSON.stringify(report)};update();
 const root=document.querySelector('[data-admiral-homepage][data-homepage-nav-active=true]');
 const pretty=e=>String(e?.name)+': '+String(e?.message);
 const b=root.querySelector('[data-orbit-render-canvas]'),o=root.querySelector('[data-orbit-mask-overlay]');
 function read(c){try{const ctx=c.getContext('2d');const x=Math.max(0,Math.floor(c.width/2)-5),y=Math.max(0,Math.floor(c.height/2)-5);
 const d=ctx.getImageData(x,y,10,10).data;let col=new Set(),a=0;for(let i=0;i<d.length;i+=4){if(d[i+3])a++;col.add(d[i]*65536+d[i+1]*256+d[i+2]);}
 return {colors:col.size,alpha:a,rgba:Array.from(d.slice(0,4)),contextLost:ctx.isContextLost?.()};}catch(e){return pretty(e)}}
 for(const [name,c] of [['liveBeauty',b],['liveOverlay',o]]){const box=c.getBoundingClientRect();report[name]={backing:[c.width,c.height],rect:[box.x,box.y,box.width,box.height],paint:c.hasAttribute('data-orbit-painted'),visibility:getComputedStyle(c).visibility,read:read(c)};}
 const sources=performance.getEntriesByType('resource').map(e=>e.name).filter(s=>/\.avif(?:\?|$)/i.test(s));
 const rank=s=>{const p=decodeURIComponent(s).toLowerCase(),f=p.split('/').pop().split('?')[0];return (/checkp|beautycp|beauty_cp/.test(p)?140:0)+(/(?:0030|[_-]30)\D*\.avif/.test(f)?72:0)+(/orbit|beauty/.test(p)?18:0)-(/mask|lighting|floorplan|floor-plan|alaprajz/.test(p)?400:0)};
 const ranked=[...new Set(sources)].sort((a,b)=>rank(b)-rank(a));
 const asset=ranked[0];report.asset=asset;report.alternatives=ranked.slice(1,3);let image;
 if(asset){try{image=new Image();image.crossOrigin='anonymous';image.src=asset;await Promise.race([image.decode(),new Promise((res,rej)=>setTimeout(()=>rej(Error('image decode timeout')),6000))]);report.decoded=[image.naturalWidth,image.naturalHeight]}catch(e){report.decodeError=pretty(e)}}
 for(const hinted of [false,true]){const c=document.createElement('canvas'),out={};c.width=Math.max(10,b.width);c.height=Math.max(10,b.height);
 c.style.cssText='position:fixed;left:0;top:0;width:10px;height:10px;opacity:.01;pointer-events:none';document.body.append(c);
 try{const ctx=c.getContext('2d',{willReadFrequently:hinted});ctx.fillStyle='#13579b';ctx.fillRect(0,0,c.width,c.height);out.control=read(c);
 if(image?.naturalWidth){try{ctx.drawImage(image,0,0,c.width,c.height);out.image=read(c)}catch(e){out.imageDrawError=pretty(e)}}
 try{ctx.drawImage(b,0,0,c.width,c.height);out.liveDraw=read(c)}catch(e){out.liveDrawError=pretty(e)}
 }catch(e){out.error=pretty(e)}finally{c.remove();c.width=1;c.height=1}report['frequent'+hinted]=out;update();}
 report.done=true;update();})().catch(e=>{document.querySelector('#ap-display-report').content=JSON.stringify({error:String(e),done:true})})"""


def colors(file, rect):
    with tempfile.TemporaryDirectory() as td:
        bmp=td+'/thumb.bmp'
        subprocess.run(['/usr/bin/sips','-Z','320','-s','format','bmp',file,'--out',bmp],capture_output=True,check=True)
        with open(bmp,'rb') as f:data=f.read()
        start=struct.unpack_from('<I',data,10)[0]; w,h=struct.unpack_from('<ii',data,18)
        bpp=struct.unpack_from('<H',data,28)[0];assert bpp in (24,32)
        stride=(w*bpp+31)//32*4; height=abs(h); x,y,width,tall=rect
        x1=max(0,int(x*w));x2=min(w,int((x+width)*w))
        y1=max(0,int(y*height));y2=min(height,int((y+tall)*height))
        count=collections.Counter()
        for cy in range(y1,y2):
            base=start+(height-cy-1 if h>0 else cy)*stride
            for cx in range(x1,x2):
                offset=base+cx*(bpp//8);count[data[offset:offset+3]]+=1
        return {'size':os.path.getsize(file),'sample':[x1,y1,x2,y2],'colors':len(count),'dominant':round(count.most_common(1)[0][1]/sum(count.values()),3) if count else None,'bgr':count.most_common(1)[0][0].hex() if count else None}


def inspect():
    geo=qa.js("""const b=r.querySelector('[data-orbit-render-canvas]').getBoundingClientRect();return [innerWidth,innerHeight,b.x+b.width*.2,b.y+b.height*.2,b.width*.6,b.height*.6,outerHeight,outerWidth,screenX,screenY,screen.width,screen.height]""")
    w,h,x,y,ww,hh,oh,ow,sx,sy,sw,sh=geo
    try:
        with open('safari-display-driver.png','wb') as f:f.write(base64.b64decode(qa.call('GET','/session/'+qa.session+'/screenshot')))
        qa.emit('webdriver_orbit_pixels',colors('safari-display-driver.png',(x/w,y/h,ww/w,hh/h)))
    except Exception as e:qa.emit('webdriver_capture_error',str(e))
    try:
        swift='''import CoreGraphics
import Foundation
let windows=CGWindowListCopyWindowInfo([.optionOnScreenOnly,.excludeDesktopElements],kCGNullWindowID) as? [[String:Any]] ?? []
for w in windows where (w[kCGWindowOwnerName as String] as? String)?.contains("Safari") == true && (w[kCGWindowLayer as String] as? Int) == 0 {
 if let id=w[kCGWindowNumber as String] as? Int,let b=w[kCGWindowBounds as String] as? [String:Any],(b["Width"] as? Double ?? 0)>500 { print(id);break } }'''
        sid=subprocess.run(['/usr/bin/swift','-e',swift],text=True,capture_output=True,timeout=20).stdout.strip()
        path='safari-display-macos.png'
        capture=subprocess.run(['/usr/sbin/screencapture','-x','-o','-l'+sid,path],capture_output=True,timeout=10) if sid.isdigit() else None
        if capture is not None and capture.returncode==0 and os.path.exists(path):
            qa.emit('quartz_window_orbit_pixels',colors(path,(x/ow,(y+max(0,oh-h))/oh,ww/ow,hh/oh)))
        else:
            p=subprocess.run(['/usr/sbin/screencapture','-x',path],text=True,capture_output=True,timeout=10)
            if p.returncode:raise RuntimeError('macOS capture '+p.stderr)
            qa.emit('quartz_screen_orbit_pixels',colors(path,((x+sx)/sw,(y+sy+max(0,oh-h))/sh,ww/sw,hh/sh)))
    except Exception as e:qa.emit('quartz_capture_error',str(e))
    try:
        qa.js("const s=document.createElement('script');s.textContent=arguments[0];document.head.appendChild(s);s.remove()",PROBE)
        out=qa.wait('display probes',"""const s=document.querySelector('#ap-display-report')?.content;if(!s)return false;const o=JSON.parse(s);return o.done&&o""",20)
        qa.emit('direct_display_readbacks',out)
    except Exception as e:qa.emit('display_readback_error',str(e))
