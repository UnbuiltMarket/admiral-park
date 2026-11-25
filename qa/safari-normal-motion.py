"""Verify normal-motion flights in native Safari, with runner accessibility settings explicitly identified."""
import json
import time
import qa
import display


ORIGIN="https://admiralpark.hu"
TARGET=qa.SITE+"?review=native-safari-motion"
SHIM=r"""(()=>{const original=window.matchMedia.bind(window);
window.matchMedia=query=>{if(typeof query==='string' && /prefers-reduced-motion\s*:\s*reduce/i.test(query))return original('not all');return original(query)};
document.documentElement.dataset.qaMotion=String(window.matchMedia('(prefers-reduced-motion: reduce)').matches);})()"""
MONITOR="""(()=>{
const n=document.createElement('meta');n.id='native-journey-observations';document.head.append(n);
const flights={},log=[],ready=()=>{n.content=JSON.stringify({flights,log});};ready();
for(const name of ['playing','timeupdate','ended','error','waiting']){
 document.addEventListener(name,e=>{
 const v=e.target,hero=v.closest?.('[data-admiral-homepage]');
 if(!(v instanceof HTMLVideoElement)||hero?.dataset.homepageNavActive!=='true')return;
 const seq=hero.dataset.activeSequence;const f=flights[seq]||=( {playing:0,ended:0,waiting:0,error:0,max:0,frames:0,frameTime:0} );
 if(name!=='timeupdate'){f[name]++;log.push([Math.round(performance.now()),seq,name,+v.currentTime.toFixed(3),v.error?.code]);}
 f.max=Math.max(f.max,Number(v.currentTime.toFixed(3)));
 if(name==='playing'&&v.requestVideoFrameCallback){
   function obs(t,info){if(!v.isConnected||hero.dataset.activeSequence!==seq)return;
     f.frames++;f.frameTime=Math.max(f.frameTime,Number(info.mediaTime.toFixed(3)));ready();
     if(!v.ended&&!v.paused)v.requestVideoFrameCallback(obs);}
   v.requestVideoFrameCallback(obs);
 }
 ready();
 },true);
}
})()"""


def build_page():
    # A same-origin text document has a fresh JS realm and no Framer modules in its cache.
    qa.command("/url",{"url":ORIGIN+"/robots.txt?review=motion-probe"})
    settings=qa.js("return {nativeReduce:matchMedia('(prefers-reduced-motion: reduce)').matches,origin:location.origin,userAgent:navigator.userAgent}")
    qa.emit("runner_settings",settings)
    if not settings['nativeReduce']:
        qa.command("/url",{"url":TARGET})
        mode="native OS motion preference"
    else:
        assert settings['origin']==ORIGIN
        # Test-only local copy. Same HTML, origin, URLs, video player and images. A single
        # early script forces only JS reduced-motion matching off for this document.
        qa.js(r"""const url=arguments[0],shim=arguments[1];
          fetch(url,{credentials:'omit',cache:'no-store'}).then(async response=>{
            if(!response.ok)throw new Error('HTTP '+response.status);
            const html=await response.text();
            if(!/<head[\s>]/i.test(html))throw new Error('Missing HTML head');
            const next=html.replace(/<head\b[^>]*>/i,tag=>tag+'<script>'+shim+'</'+'script>');
            history.replaceState(null,'',url);document.open();document.write(next);document.close();
          }).catch(e=>{document.documentElement.dataset.qaMotionError=String(e)});""",TARGET,SHIM)
        mode="page-only JS normal-motion override; macOS Reduce Motion remains on"
        qa.wait("test-only normal-motion bootstrap","return document.documentElement.dataset.qaMotion==='false'",25)
    qa.emit("motion_test_mode",mode)
    qa.wait('homepage boots',"return r?.dataset.homepageBooted==='true' && r.dataset.homepageStage==='opening'",35)
    qa.js("const s=document.createElement('script');s.textContent=arguments[0];document.head.append(s);s.remove()",MONITOR)
    qa.wait('page realm monitor',"return !!document.querySelector('#native-journey-observations')",5)
    return mode


def key():
    qa.command("/actions",{"actions":[{"type":"key","id":"keys","actions":[
        {"type":"keyDown","value":"\ue015"},{"type":"keyUp","value":"\ue015"}]}]})


def metrics():
    return qa.js("return JSON.parse(document.getElementById('native-journey-observations')?.content||'{}')")


def css_and_pixels():
    return qa.js("""const result={};const scratch=document.createElement('canvas');
    scratch.width=240;scratch.height=126;scratch.style.cssText='position:fixed;left:-600px;pointer-events:none';
    document.body.append(scratch);
    const ctx=scratch.getContext('2d',{willReadFrequently:true});
    function stats(a,stride=1){let colors=new Set(),opaque=0,peak=0,total=0;
      for(let i=0;i<a.length;i+=4*stride){total++;if(a[i+3]){opaque++;peak=Math.max(peak,a[i+3]);colors.add(a[i]*65536+a[i+1]*256+a[i+2]);}}
      return {colorCount:colors.size,nontransparentPixels:opaque,maxAlpha:peak,samplePixels:total};}
    try {ctx.fillStyle='rgb(221,40,120)';ctx.fillRect(0,0,40,30);
      result.control=[...ctx.getImageData(5,5,1,1).data];}catch(e){result.control=String(e);}
    for(const [name,sel] of [['beauty','[data-orbit-render-canvas]'],['lights','[data-orbit-mask-overlay]']]){
      const source=r.querySelector(sel),b=source.getBoundingClientRect(),cs=getComputedStyle(source),item=result[name]={
        backing:[source.width,source.height],rect:[b.x,b.y,b.width,b.height],opacity:cs.opacity,visibility:cs.visibility,
        painted:source.getAttribute('data-orbit-painted'),connected:source.isConnected};
      try {const sourceCtx=source.getContext('2d');
        item.lost=sourceCtx.isContextLost?.();item.options=sourceCtx.getContextAttributes?.();
        const rgba=sourceCtx.getImageData(0,0,source.width,source.height).data;
        item.direct=stats(rgba,23);
      }catch(e){item.directError=String(e);}
      try{ctx.clearRect(0,0,240,126);ctx.drawImage(source,0,0,240,126);item.sample=stats(ctx.getImageData(0,0,240,126).data);}
      catch(e){item.copyError=String(e);}
    } scratch.remove();return result;""")


def main():
    for _ in range(25):
        try:
            if qa.call('GET','/status').get('ready'):break
        except Exception:pass
        time.sleep(.4)
    session=qa.call('POST','/session',{'capabilities':{'alwaysMatch':{'browserName':'safari','pageLoadStrategy':'eager'}}})
    qa.session=session['sessionId'];qa.emit('safari',session['capabilities'])
    failures=[]
    try:
        qa.command('/window/rect',{'width':1440,'height':900})
        try:
            build_page()
            stages=[]
            for label,check in [
                ('SEQ_01',"return r?.dataset.homepageStage==='building'"),
                ('SEQ_02',"return r?.querySelector('[data-seq3-garden-cue]')?.dataset.visible==='true'"),
                ('SEQ_03',"return r?.dataset.homepageStage==='orbit'&&r.dataset.orbitState==='checkpoint'")]:
                time.sleep(.9)
                start=time.monotonic()
                if label=='SEQ_01':
                    qa.js("""const h=document.documentElement;window.addEventListener('wheel',e=>h.dataset.qaInput=[e.isTrusted,e.deltaY].join(','),{capture:true,once:true});""")
                    qa.wheel(180)
                    time.sleep(.8)
                    actual=qa.js("return document.documentElement.dataset.qaInput||''")
                    qa.emit("initial_wheel",actual)
                    if qa.state()['stage']=='opening' and (not actual or float(actual.split(',')[-1])<=0):
                        key()
                else:
                    key()
                qa.wait(label,check,45)
                stages.append([label,round(time.monotonic()-start,2),qa.state()['stage']])
                qa.emit('landed',stages[-1])
            m=metrics();qa.emit("video_evidence",m)
            for name in ['SEQ_01','SEQ_02','SEQ_03']:
                f=m.get('flights',{}).get(name,{})
                if not(f.get('playing',0)>=1 and f.get('ended',0)>=1 and f.get('max',0)>1 and f.get('frames',0)>=3 and f.get('frameTime',0)>1):
                    failures.append(name+" incomplete playback evidence")
        except Exception as e:
            failures.append("journey: "+str(e));qa.emit("journey_diagnostics",[qa.state(),metrics(),qa.js("return document.documentElement.dataset.qaMotionError")])
        try:
            if qa.state()['stage']!='orbit':qa.command('/url',{'url':qa.SITE+'?review=orbit-colors#orbit'})
            qa.parked(0);time.sleep(5.5);qa.hover('B204',.42473958,.28663366)
            qa.emit('B204_compositor',css_and_pixels())
            qa.next_camera();qa.parked(15);qa.next_camera();qa.parked(30);qa.hover('C304',.65286458,.26980198)
            p=css_and_pixels();qa.emit('C304_compositor',p)
            display.inspect()
            for name in ['beauty','lights']:
                evidence=p[name].get('direct') or p[name].get('sample')
                if not evidence or not evidence['nontransparentPixels'] or (name=='beauty' and evidence['colorCount']<30):
                    failures.append(name+" pixel verification inconclusive or blank; inspect control and backing sizes")
        except Exception as e:failures.append("orbit: "+str(e))
    finally:qa.call('DELETE','/session/'+qa.session)
    qa.emit('failures',failures);return int(bool(failures))


if __name__=="__main__":raise SystemExit(main())
