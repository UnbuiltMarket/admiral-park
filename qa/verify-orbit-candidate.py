import os
import time
import base64
import subprocess
import qa
from normal import key, MONITOR, metrics
from display import colors

qa.SITE=os.environ.get('REVIEW_URL',qa.SITE)
points=[('B204',.42474,.28663),('B301',.07682,.17673),('C304',.65286,.26980),('B301',.85755,.29752),
        ('B301',.29609,.41832),('A301',.83672,.34208),('A301',.29089,.38960),('A301',.39922,.04307)]

SURFACES = r"""
const [frame,id,done]=arguments;
(async()=>{
 const r=document.querySelector('[data-admiral-homepage][data-homepage-nav-active=true]');
 const useImages=r.dataset.orbitBeautySurface==='image';
 const view=r.querySelector('[data-orbit-render-canvas]').getBoundingClientRect();
 const scene=r.querySelector('[data-orbit-dom-scene]');
 const images=scene?[...scene.querySelectorAll('img')]:[];
 function shown(el){if(!el)return false;const b=el.getBoundingClientRect();
   if(b.width<1||b.height<1)return false;
   for(let p=el;p;p=p.parentElement){const s=getComputedStyle(p);if(s.visibility==='hidden'||s.display==='none'||+s.opacity<.01)return false}
   return true;}
 function surface(w,h){let c=document.createElement('canvas');c.width=w;c.height=h;return c.getContext('2d',{willReadFrequently:true});}
 const W=192,H=101;
 const picture=useImages?images.filter(shown).at(-1):r.querySelector('[data-orbit-render-canvas]');
 if(!shown(picture))throw Error('Missing visible scene surface ('+r.dataset.orbitBeautySurface+')');
 const pb=picture.getBoundingClientRect();
 if(useImages && (Number(scene.dataset.frame)!==frame || !picture.complete || !picture.naturalWidth||
    Math.max(Math.abs(view.x-pb.x),Math.abs(view.y-pb.y),Math.abs(view.width-pb.width),Math.abs(view.height-pb.height))>3))
    throw Error('Native image did not fit the active camera '+frame);
 // Area-average thumbnails. A one-step 1920px → 48px bilinear draw can alias
 // enough facade details to disagree with the same photo on an 863px canvas.
 const read=img=>{const c=surface(256,128);c.imageSmoothingQuality='high';c.drawImage(img,0,0,256,128);
   const bytes=c.getImageData(0,0,256,128).data,out=new Float32Array(32*16*4);
   for(let y=0;y<128;y++)for(let x=0;x<256;x++){const a=(y*256+x)*4,b=((y>>3)*32+(x>>3))*4;
      for(let k=0;k<4;k++)out[b+k]+=bytes[a+k]/64;}return out;};
 const shot=read(picture),expected=String(frame).padStart(4,'0'),resources=performance.getEntriesByType('resource').map(e=>e.name);
 const samples=resources.filter(s=>new RegExp('/(?:movement|checkpoints)/'+expected+'\\.(?:avif|webp)(?:[?#]|$)').test(s));
 // Read independent, frame-numbered production assets. URLs of the displayed images can be blob:.
 if(!samples.length)throw Error('Missing independent image URL for frame '+frame);
 async function reference(url){const i=new Image();i.crossOrigin='anonymous';i.src=url;await i.decode();return i;}
 const matches=[];
 for(const url of [...new Set(samples)]){
   const bytes=read(await reference(url));let delta=0;
   for(let j=0;j<shot.length;j++)delta+=Math.abs(bytes[j]-shot[j]);
   matches.push({url,meanDelta:delta/shot.length});
 }
 matches.sort((a,b)=>a.meanDelta-b.meanDelta);
 const maskUrl=resources.find(s=>new RegExp('/'+expected+'\\.bin(?:[?#]|$)').test(s));
 if(!maskUrl)throw Error('No mask packet for camera '+frame);
 const res=await fetch(maskUrl);if(!res.ok)throw Error('Mask HTTP '+res.status);
 const packet=new DataView(await res.arrayBuffer()),mw=packet.getUint16(4,true),mh=packet.getUint16(6,true);
 const cells=new Set();let offset=14;
 for(let e=0;e<packet.getUint8(8);e++){
   const unit=String.fromCharCode(...new Uint8Array(packet.buffer,offset,4)),runs=packet.getUint32(offset+4,true);offset+=8;
   for(let run=0;run<runs;run++,offset+=6){if(unit!==id)continue;
     const y=Math.floor(packet.getUint16(offset,true)*H/mh),x=packet.getUint16(offset+2,true),end=x+packet.getUint16(offset+4,true)-1;
     for(let q=Math.floor(x*W/mw);q<=Math.floor(end*W/mw);q++)cells.add(y*W+q);}
   offset+=2+packet.getUint16(offset,true)*2;
 }
 const parent=r.querySelector('[data-orbit-dom-overlays]');
 const layers=useImages?[...(parent?.querySelectorAll('img[data-orbit-dom-highlight][data-ready]')||[])].filter(shown)
                      :[r.querySelector('[data-orbit-mask-overlay]')];
 if(!layers.length||!cells.size)throw Error('No active overlay or apartment pixels for '+id);
 const alpha=surface(W,H);
 for(const layer of layers){
   if(!shown(layer))throw Error('Invisible overlay for '+id);
   if(useImages&&(!layer.complete||!layer.naturalWidth||Number(layer.dataset.frame)!==frame||
        !(layer.dataset.apartments||'').split(',').includes(id)))throw Error('Stale overlay '+JSON.stringify(layer.dataset));
   const b=layer.getBoundingClientRect();alpha.drawImage(layer,(b.x-view.x)/view.width*W,(b.y-view.y)/view.height*H,b.width/view.width*W,b.height/view.height*H);
 }
 const data=alpha.getImageData(0,0,W,H).data;let lit=0,registered=0;
 for(let j=0;j<W*H;j++){
   if(data[j*4+3]<4)continue;lit++;
   const x=j%W,y=Math.floor(j/W);
   // Allow a 10px source-space fringe around lit windows.
   let hit=false;for(let yy=Math.max(0,y-1);yy<=Math.min(H-1,y+1)&&!hit;yy++)
       for(let xx=Math.max(0,x-1);xx<=Math.min(W-1,x+1);xx++){if(cells.has(yy*W+xx)){hit=true;break;}}
   if(hit)registered++;
 }
 return {frame,id,mode:r.dataset.orbitBeautySurface||'canvas',layers:layers.length,lit,registered,
         expectedPixels:cells.size,reference:matches[0].url,meanDelta:matches[0].meanDelta};
})().then(done,e=>done({error:String(e)}));
"""

def assert_pixels(id,frame):
    p=qa.command('/execute/async',{'script':SURFACES,'args':[frame,id]})
    qa.emit('actual_pixels',p)
    assert 'error' not in p and p['meanDelta']<10 and p['lit']>=3 and p['registered']>=3 and p['registered']/p['lit']>.65,p
    return p['reference']

def window_id():
    swift='''import CoreGraphics
let windows=CGWindowListCopyWindowInfo([.optionOnScreenOnly,.excludeDesktopElements],kCGNullWindowID) as? [[String:Any]] ?? []
for w in windows where (w[kCGWindowOwnerName as String] as? String)?.contains("Safari")==true && (w[kCGWindowLayer as String] as? Int)==0 {
 if let id=w[kCGWindowNumber as String] as? Int, let b=w[kCGWindowBounds as String] as? [String:Any], (b["Width"] as? Double ?? 0)>500 {print(id);break}}'''
    try:
        return subprocess.run(['swift','-e',swift],text=True,capture_output=True,timeout=25).stdout.strip()
    except (OSError,subprocess.TimeoutExpired):
        return ''

def capture(label,sid,selector):
    g=qa.js("const b=r.querySelector('[data-orbit-render-canvas]').getBoundingClientRect();return [innerWidth,innerHeight,b.x+b.width*.2,b.y+b.height*.2,b.width*.6,b.height*.6,outerHeight,outerWidth]")
    w,h,x,y,ww,hh,oh,ow=g
    file='safari-'+label+'-webdriver.png'
    with open(file,'wb') as f:f.write(base64.b64decode(qa.call('GET','/session/'+qa.session+'/screenshot')))
    result={'webdriver':colors(file,(x/w,y/h,ww/w,hh/h))}
    try:
        button=qa.command('/element',{'using':'css selector','value':selector})
        element_id=button['element-6066-11e4-a52e-4f735466cecf']
        file='safari-'+label+'-element.png'
        encoded=qa.call('GET','/session/'+qa.session+'/element/'+element_id+'/screenshot')
        with open(file,'wb') as f:f.write(base64.b64decode(encoded))
        result['element']=colors(file,(.2,.2,.6,.6))
    except Exception as e:qa.emit(label+'_element_error',str(e))
    if sid.isdigit():
        file='safari-'+label+'-window.png'
        shot=subprocess.run(['/usr/sbin/screencapture','-x','-o','-l'+sid,file],capture_output=True,timeout=12)
        if shot.returncode==0:result['window']=colors(file,(x/ow,(y+max(0,oh-h))/oh,ww/ow,hh/oh))
    qa.emit(label,result)
    return result

def screenshot(reference):
    sid=window_id()
    target=qa.js("return r.dataset.orbitBeautySurface==='image'?'[data-orbit-dom-scene]':'[data-orbit-render-canvas]'")
    actual=capture('repaired-orbit',sid,qa.ROOT+' '+target)
    good=lambda values:any(p['colors']>30 and p['dominant']<.98 for p in values.values())
    visible={k:v for k,v in actual.items() if k!='element'}
    if good(visible):return
    # Put an independent HTML image above the entire page, exactly over the orbit in this test tab.
    qa.js("""const b=r.querySelector('[data-orbit-render-canvas]').getBoundingClientRect(),i=new Image();
        i.id='qa-reference-img';i.style.cssText='position:fixed;z-index:2147483647;pointer-events:none;object-fit:fill;max-width:none;';
        Object.assign(i.style,{left:b.x+'px',top:b.y+'px',width:b.width+'px',height:b.height+'px'});
        i.src=arguments[0];document.body.append(i);""",reference)
    try:
        qa.wait('reference HTML image decoded',"const i=document.querySelector('#qa-reference-img');return i?.complete&&i.naturalWidth>0",15)
        time.sleep(.5)
        control=capture('control-orbit',sid,'#qa-reference-img')
    finally:qa.js("document.querySelector('#qa-reference-img')?.remove()")
    if good({k:v for k,v in control.items() if k!='element'}):raise AssertionError('The app rendered flat while an independent HTML checkpoint was visible in the same window capture')
    # This hosted window capture is blind even to a known opaque HTML image.
    # Use a calibrated screenshot of the complete hero (all sibling layers and
    # their z-order), including a negative control over the exact same region.
    def hero_capture(label):
        bounds=qa.js("""const v=r.querySelector('[data-orbit-render-canvas]').getBoundingClientRect(),b=r.getBoundingClientRect();
        return [(v.x-b.x+v.width*.2)/b.width,(v.y-b.y+v.height*.2)/b.height,v.width*.6/b.width,v.height*.6/b.height]""")
        node=qa.command('/element',{'using':'css selector','value':qa.ROOT})
        ref=node['element-6066-11e4-a52e-4f735466cecf']
        file='safari-'+label+'-hero.png'
        with open(file,'wb') as out:out.write(base64.b64decode(qa.call('GET','/session/'+qa.session+'/element/'+ref+'/screenshot')))
        return colors(file,bounds)
    if not good({'scene':actual.get('element',{'colors':0,'dominant':1})}):raise AssertionError('The actual orbit scene snapshot is also blank')
    page=hero_capture('repaired')
    qa.js("""const b=r.querySelector('[data-orbit-render-canvas]').getBoundingClientRect();const n=document.createElement('div');
      n.id='qa-solid-test';n.style.cssText='position:fixed;z-index:2147483647;pointer-events:none;background:#ff00ff;';
      Object.assign(n.style,{left:b.x+'px',top:b.y+'px',width:b.width+'px',height:b.height+'px'});r.append(n)""")
    try:
        time.sleep(.2)
        patch=hero_capture('solid-control')
    finally:qa.js("document.querySelector('#qa-solid-test')?.remove()")
    qa.emit('calibrated_composite_capture',{'page':page,'control':patch,'window':'unavailable; independent HTML image also flat'})
    if not good({'page':page}) or patch['dominant']<.98 or patch['bgr']!='ff00ff':
        raise AssertionError('Full component screenshot could not verify the rendered scene and its overlaid solid control')

def run():
    for _ in range(25):
        try:
            if qa.call('GET','/status').get('ready'):break
        except Exception:pass
        time.sleep(.4)
    created=qa.call('POST','/session',{'capabilities':{'alwaysMatch':{'browserName':'safari','pageLoadStrategy':'eager'}}})
    qa.session=created['sessionId'];qa.emit('mac',created['capabilities'])
    try:
        qa.command('/window/rect',{'width':1440,'height':900})
        qa.command('/url',{'url':qa.SITE})
        qa.wait('opening',"return r?.dataset.homepageStage==='opening'&&r.dataset.homepageBooted==='true'")
        qa.emit('tested_url',qa.js('return location.href'))
        logos=qa.wait('visible header logo',"""const links=[...document.querySelectorAll('a[data-framer-name="Logo"][href]')].filter(a=>{
            const b=a.getBoundingClientRect();return b.width>0&&b.height>0&&b.top>=0&&b.top<90&&b.left<innerWidth*.3});
            return links.length&&links.map(a=>a.pathname)""")
        qa.emit('logo_routes',logos)
        assert all(path=='/homepage-draft-3' for path in logos),logos
        qa.js("performance.setResourceTimingBufferSize(5000)")
        reduced=qa.js("return matchMedia('(prefers-reduced-motion: reduce)').matches")
        qa.emit('reduced',reduced)
        assert reduced==(os.environ.get('REDUCE')=='true')
        qa.js("const s=document.createElement('script');s.textContent=arguments[0];document.head.append(s);s.remove()",MONITOR)
        wheel_errors=[]
        qa.js("""const events=[];r._wheelTrace=events;
            for(const phase of [true,false])window.addEventListener('wheel',e=>{
              const t=e.target,chain=[];for(let p=t;p&&p!==document.body;p=p.parentElement){const s=getComputedStyle(p);
               if(/(auto|scroll)/.test(s.overflowY)&&p.scrollHeight>p.clientHeight+1)chain.push([p.tagName,p.className,p.scrollTop,p.clientHeight,p.scrollHeight]);}
              events.push({phase,stage:r.dataset.homepageStage,x:e.clientX,y:e.clientY,dy:e.deltaY,dx:e.deltaX,
                mode:e.deltaMode,blocked:t.closest?.("nav,header,a,button,input,textarea,select,[role='button'],[role='link'],[data-orbit-ignore],[data-homepage-controls]")?.outerHTML.slice(0,250),
                target:t.outerHTML.slice(0,180),cancelable:e.cancelable,prevented:e.defaultPrevented,chain});},phase);""")
        for label,predicate in [('SEQ_01',"return r?.dataset.homepageStage==='building'"),('SEQ_02',"return r?.querySelector('[data-seq3-garden-cue]')?.dataset.visible==='true'"),('SEQ_03',"return r?.dataset.homepageStage==='orbit'&&r.dataset.orbitState==='checkpoint'")]:
            time.sleep(.9)
            before=qa.js("r._wheelTrace.length=0;return [r.dataset.homepageStage,r.dataset.activeSequence].join('/')")
            point=qa.js("return [Math.floor(innerWidth*.52), Math.floor(innerHeight*.48)]")
            qa.mouse_at(*point)
            qa.wheel(point=point)
            try:qa.wait('wheel took effect',f"return [r.dataset.homepageStage,r.dataset.activeSequence].join('/')!=='{before}'",5)
            except TimeoutError:
                traces=qa.js("return r._wheelTrace")
                qa.emit('ignored_wheel',[label,traces,qa.state()])
                if any(e.get('dy') and not e.get('blocked') for e in traces):wheel_errors.append(label)
                key()
            qa.wait(label,predicate,65);qa.emit('arrival',[label,qa.state()])
        films=metrics().get('flights',{})
        qa.emit('instrumented_videos',films)
        if reduced:
            assert not any(v.get('playing') for v in films.values())
            flights=qa.js(r"""return performance.getEntriesByType('resource').map(e=>e.name).filter(s=>/\.mp4\b/i.test(s))""")
            assert not flights,flights
        else:
            assert all(films.get(k,{}).get('max',0)>1 for k in ('SEQ_01','SEQ_02','SEQ_03')),films
        qa.parked(0);time.sleep(5.5)
        screen_error=None
        for i,(id,x,y) in enumerate(points[:2] if reduced else points):
            if i:qa.next_camera();qa.parked(i*15)
            qa.hover(id,x,y);time.sleep(.5);reference=assert_pixels(id,i*15)
        try:screenshot(reference)
        except Exception as error:
            screen_error=error
            qa.emit('screen_verification_error',str(error))
        if not reduced:
            qa.drag();qa.orbit_wheel();qa.trackpad_trace()
            qa.wait('full orbit cache','return +r.dataset.orbitDownloaded===120',45)
            qa.inspect_edges()
            assert qa.js("""const b=r.querySelector('[data-orbit-detail-bar]'),box=b.getBoundingClientRect();
            return [...b.querySelectorAll('[data-orbit-apartment-metric]')].every(e=>{const z=e.getBoundingClientRect();return z.left>=box.left-1&&z.right<=box.right+1&&z.bottom<=box.bottom+1})""")
        if screen_error:raise screen_error
        assert not wheel_errors,('No chapter advance from a delivered wheel event',wheel_errors)
    finally:qa.call('DELETE','/session/'+qa.session)
if __name__=='__main__':run()
