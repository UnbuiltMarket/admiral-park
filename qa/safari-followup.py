"""Use the native Safari driver to trace input delivery and the three sequences."""
import base64
import collections
import json
import os
import struct
import subprocess
import tempfile
import time
import qa


def install():
    qa.js("""
    let rows=[];const id='safari-audit-events',node=document.createElement('script');node.type='application/json';node.id=id;document.head.append(node);
    const record = a=>{if(rows.length<400){rows.push([Math.round(performance.now()),...a]);node.textContent=JSON.stringify(rows)}};
    for (const k of ['wheel','keydown','pointerdown','visibilitychange','playing','ended','error','loadedmetadata','waiting','pause','stalled','timeupdate','seeking','play']){
      const last=new WeakMap();
      window.addEventListener(k,e=>{
        const t=e.target,hero=t.closest?.('[data-admiral-homepage]')||document.querySelector('[data-admiral-homepage][data-homepage-nav-active=true]');
        if(t instanceof HTMLMediaElement){
          if(k==='timeupdate' && Math.abs(t.currentTime-(last.get(t)||0))<.4)return;
          if(k==='timeupdate')last.set(t,t.currentTime);
          record(['media',k,hero?.dataset.homepageStage,hero?.dataset.activeSequence,
            [...t.attributes].map(a=>a.name).filter(s=>s.includes('video')).join(' '),
            t.currentTime,t.readyState,t.error?.code,t.error?.message,t.currentSrc?.slice(0,160)]);
        }else if(k==='wheel'||k==='keydown'||k==='pointerdown'){
          record(['input',k,e.isTrusted,k==='wheel'?[e.deltaX,e.deltaY,e.deltaMode,e.clientX,e.clientY]:e.key,
               t.tagName,t.getAttribute?.('data-framer-name'),hero?.dataset.homepageStage,window.scrollY]);
        }else if(k==='visibilitychange')record(['visibility',document.visibilityState]);
        else if(e.message)record(['error',String(e.message)]);
      },true);
    }
    window.addEventListener('unhandledrejection',e=>record(['rejection',String(e.reason)]));
    """)


def snapshot():
    return qa.js("""const v=[...document.querySelectorAll('video')].map(e=>{
      let ds=e.closest('[data-admiral-homepage]')?.dataset;
      return [e.currentSrc?.slice(0,130),Math.round(1000*e.currentTime)/1000,e.readyState,e.networkState,e.paused,e.error?.code,e.error?.message,ds?.homepageNavActive]; });
      return {viewport:[innerWidth,innerHeight],hidden:document.hidden,focus:document.hasFocus(),reduce:matchMedia('(prefers-reduced-motion: reduce)').matches,
        stage:r?.dataset.homepageStage,seq:r?.dataset.activeSequence,orbit:r?.dataset.orbitState,camera:r?.dataset.orbitFrame,scrolled:window.scrollY,
        garden:r?.querySelector('[data-seq3-garden-cue]')?.dataset.visible,hero:r&&Object.fromEntries(Object.entries(r.dataset).filter(([k])=>/video|flight|hero|load|state/i.test(k)&&!k.startsWith('orbit'))),v}""")


def trace():
    return qa.js("""return JSON.parse(document.getElementById('safari-audit-events')?.textContent||'[]')""")


def sample(label,desired,seconds):
    unique=[];started=time.monotonic();last=None
    while time.monotonic()-started<seconds:
        s=snapshot()
        key=(s['stage'],s.get('seq'),s.get('garden'),tuple(tuple(row[2:6]) for row in s['v']))
        if last!=key:
            unique.append([round(time.monotonic()-started,1),s]);last=key
        if desired(s):
            qa.emit(label,unique[-10:])
            return True
        time.sleep(.28)
    qa.emit(label+" timeout",unique[-10:])
    return False


def keydown():
    qa.command("/actions",{"actions":[{"type":"key","id":"keys","actions":[
        {"type":"keyDown","value":"\ue015"},{"type":"keyUp","value":"\ue015"}]}]})


def domwheel():
    qa.js("""const x=Math.round(innerWidth*.51),y=Math.round(innerHeight*.45),t=document.elementFromPoint(x,y);
        t.dispatchEvent(new WheelEvent('wheel',{clientX:x,clientY:y,deltaY:180,bubbles:true,cancelable:true}));""")


def geometry():
    return qa.js("""const box=e=>{let b=e.getBoundingClientRect();return [Math.round(b.left),Math.round(b.right),Math.round(b.top),Math.round(b.bottom)]};
        const i=r.querySelector('[data-orbit-floorplan]');
        return {image:i&&[i.naturalWidth,i.naturalHeight,box(i)],visibleAnchors:[...document.links].filter(a=>{let b=a.getBoundingClientRect();return b.width>15&&b.top>=0&&b.top<100}).slice(0,15).map(a=>[a.innerText.trim(),a.getAttribute('aria-label'),a.getAttribute('href')]),metrics:[...r.querySelectorAll('[data-orbit-detail-bar] [data-orbit-apartment-metric]')].map(el=>[el.innerText,box(el)]),bar:box(r.querySelector('[data-orbit-detail-bar]'))};""")


def capture():
    file='safari-C304.png'
    with open(file,'wb') as out:
        out.write(base64.b64decode(qa.call('GET','/session/'+qa.session+'/screenshot'),validate=True))
    # macOS sips turns every PNG layout into a tiny 24/32bpp BMP for a colour histogram.
    with tempfile.TemporaryDirectory() as td:
        thumb=td+'/thumb.bmp'
        subprocess.run(['/usr/bin/sips','-Z','64','-s','format','bmp',file,'--out',thumb],check=True,capture_output=True)
        data=open(thumb,'rb').read()
        offset=struct.unpack_from('<I',data,10)[0]
        w,h=struct.unpack_from('<ii',data,18)
        bpp=struct.unpack_from('<H',data,28)[0];assert bpp in (24,32)
        stride=(w*bpp+31)//32*4
        pixels=[data[offset+y*stride+x*(bpp//8):offset+y*stride+x*(bpp//8)+3] for y in range(abs(h)) for x in range(w)]
        counts=collections.Counter(pixels)
        qa.emit('webdriver_screenshot',{'bytes':os.stat(file).st_size,'thumbSize':[w,abs(h)],'colors':len(counts),'topColorBGR':counts.most_common(1)[0][0].hex(),'topColorPercent':round(100*counts.most_common(1)[0][1]/len(pixels),1)})

def independent_movie():
    # On a private test tab, check the exact production files outside the site's player.
    # Sample playback on a trusted click so browser media policy does not obscure the result.
    links = ['onxwvQct3TBTm6WVR33HaBWHo', 'BfO7rinv7Ci9Naw3GW01EFAvHi0', 'N02rcgZxOCN9LfVxWZtmoNOx2ws']
    qa.command('/url',{'url':'about:blank'})
    for chapter, asset in enumerate(links, 1):
        url='https://framerusercontent.com/assets/'+asset+'.mp4'
        qa.js("""document.body.innerHTML='<button id="start">Play</button><video muted playsinline width="480" height="270"></video>';
        const v=document.querySelector('video');v.muted=true;v.src=arguments[0];
        document.querySelector('button').onclick=()=>v.play().catch(e=>{v.dataset.failure=String(e)});""",url)
        btn=qa.command('/element',{'using':'css selector','value':'#start'})
        qa.command('/element/'+btn['element-6066-11e4-a52e-4f735466cecf']+'/click',{})
        started=time.monotonic()
        vals=[]
        while time.monotonic()-started<10:
            row=qa.js("""const v=document.querySelector('video');return {clock:v.currentTime,ready:v.readyState,ended:v.ended,w:v.videoWidth,error:v.error?.code||v.dataset.failure||null,h264:v.canPlayType('video/mp4; codecs="avc1.42E01E"')};""")
            vals.append(row)
            if row['ended'] or row['error']:break
            time.sleep(.85)
        qa.emit('isolated_media_'+str(chapter),vals)


def main():
    for _ in range(25):
        try:
            if qa.call('GET','/status').get('ready'):break
        except Exception:pass
        time.sleep(.4)
    qa.session=qa.call('POST','/session',{'capabilities':{'alwaysMatch':{'browserName':'safari','pageLoadStrategy':'eager'}}})['sessionId']
    try:
        qa.command('/window/rect',{'width':1440,'height':900})
        qa.command('/url',{'url':qa.SITE+'?review=flight-diagnostics'})
        qa.wait('boot',"return r?.dataset.homepageBooted==='true'")
        install();time.sleep(2)
        qa.emit('start',snapshot())
        qa.wheel(180);time.sleep(.45)
        qa.emit('native_scroll_delivered',[a for a in trace() if a[1]=='input'])
        # If the automation driver delivered a reversed wheel, use an explicit positive event.
        if snapshot()['stage']=='opening':time.sleep(.7);domwheel()
        reached=sample('first',lambda s:s['stage']=='building',28)
        if not reached:
            keydown();sample('first via key',lambda s:s['stage']=='building',20)
        time.sleep(1.2);domwheel()
        second=sample('second',lambda s:s.get('garden')=='true',28)
        if not second:
            keydown();sample('second via key',lambda s:s.get('garden')=='true',20)
        time.sleep(1.2);keydown();sample('third via key',lambda s:s['stage']=='orbit',38)
        events=trace()
        qa.emit('event_trace',events)
        qa.emit('video_downloads',qa.js("""return performance.getEntriesByType('resource').filter(e=>/\.mp4(\?|$)/i.test(e.name)).map(e=>[e.name,Math.round(e.duration),e.transferSize,e.responseStatus,e.initiatorType]);"""))
        qa.emit('normal_complete',snapshot())
        qa.command('/url',{'url':qa.SITE+'?review=orbit-diagnostics#orbit'})
        install();qa.parked(0);time.sleep(6)
        x,y,w,h=qa.image_rect();pt=(round(x+.5*w),round(y+.4*h));qa.wheel(160,pt)
        time.sleep(2);qa.emit('orbit_wheel_actual',{'events':[a for a in trace() if a[1]=='input'],'end':snapshot()})
        try:
            for _ in range(8):
                if int(qa.state()['camera'])==30:break
                qa.next_camera();time.sleep(1.7)
            qa.parked(30);qa.hover('C304',.65286458,.26980198)
        except Exception as e:qa.emit('hover_error',str(e))
        capture()
        qa.command('/window/rect',{'width':1060,'height':760});time.sleep(1)
        qa.emit('compact',geometry())
        independent_movie()
    finally:qa.call('DELETE','/session/'+qa.session)


if __name__=='__main__':main()
