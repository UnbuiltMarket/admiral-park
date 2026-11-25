"""A one-time, read-only visitor journey in macOS Safari via its built-in WebDriver."""
import json
import base64
import platform
import sys
import time
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

DRIVER = "http://127.0.0.1:4444"
SITE = "https://admiralpark.hu/homepage-draft-3"
ROOT = "[data-admiral-homepage][data-homepage-nav-active=true]"
session = ""


def emit(label, result):
    print(label, json.dumps(result, ensure_ascii=False), flush=True)


def call(method, route, body=None):
    data = json.dumps(body).encode() if body is not None else None
    req = Request(DRIVER + route, data=data, method=method, headers={"Content-Type": "application/json"})
    try:
        with urlopen(req, timeout=90) as response:
            return json.load(response)["value"]
    except HTTPError as err:
        raise RuntimeError(f"{method} {route}: {err.read().decode()[:650]}") from err


def command(route, body):
    return call("POST", "/session/" + session + route, body)


def js(script, *args):
    return command("/execute/sync", {"script":"const r=document.querySelector(" + json.dumps(ROOT) + ");" + script, "args":list(args)})


def wait(label, script, seconds=45):
    until=time.monotonic()+seconds
    while time.monotonic()<until:
        result=js(script)
        if result:
            return result
        time.sleep(.25)
    raise TimeoutError(label + " last state " + json.dumps(state()))


def state():
    return js("""return {path:location.pathname, hash:location.hash, viewport:[innerWidth,innerHeight],stage:r?.dataset.homepageStage,
        camera:r?.dataset.orbitFrame,orbit:r?.dataset.orbitState,mask:r?.dataset.orbitMaskState,
        lights:r?.dataset.orbitLightingState,hover:r?.dataset.orbitMaskHovered,details:r?.querySelector('[data-orbit-studio]')?.dataset.apartmentId,
        downloaded:r?.dataset.orbitDownloaded,videos:[...(r?.querySelectorAll('video') || [])].map(v=>[+v.currentTime.toFixed(2),v.readyState,v.error?.code])}""")


def install_monitor():
    js("""
        window.auditFlight={};window.auditErrors=[];
        addEventListener('error',e=>{if(e.message)auditErrors.push(String(e.message))});
        addEventListener('unhandledrejection',e=>auditErrors.push(String(e.reason)));
        for(const kind of ['playing','timeupdate','ended','error','waiting']){
          document.addEventListener(kind,e=>{
            const v=e.target,hero=v.closest?.('[data-admiral-homepage]');
            if(!(v instanceof HTMLVideoElement)||hero?.dataset.homepageNavActive!=='true')return;
            const name=hero.dataset.activeSequence || 'unknown';
            const f=auditFlight[name] ||= {playing:0,ended:0,waiting:0,error:0,max:0,frames:0,frameTime:0};
            if(kind!=='timeupdate')f[kind]++;
            f.max=Math.max(f.max,Number(v.currentTime.toFixed(3)));
            if(kind==='playing'&&v.requestVideoFrameCallback){
              const monitor=(_,info)=>{
                if(hero.dataset.activeSequence!==name || !v.isConnected)return;
                f.frames++;f.frameTime=Math.max(f.frameTime,Number(info.mediaTime.toFixed(3)));
                if(!v.ended && !v.paused)v.requestVideoFrameCallback(monitor);
              };v.requestVideoFrameCallback(monitor);
            }
          },true);
        }
    """)


def wheel(delta=180, point=None):
    x,y=point or js("return [Math.floor(innerWidth*.52), Math.floor(innerHeight*.48)]")
    try:
        command("/actions",{"actions":[{"type":"wheel","id":"wheel","actions":[
            {"type":"scroll","origin":"viewport","x":x,"y":y,"deltaX":0,"deltaY":delta,"duration":50}]}]})
        emit("scroll_input","WebDriver wheel")
    except RuntimeError as err:
        emit("scroll_input",["WebDriver wheel unsupported, DOM wheel event",str(err)[:160]])
        js("const [x,y,d]=arguments;document.elementFromPoint(x,y).dispatchEvent(new WheelEvent('wheel',{clientX:x,clientY:y,deltaY:d,bubbles:true,cancelable:true}));",x,y,delta)


def flights():
    command("/url",{"url":SITE})
    install_monitor()
    wait("opening","return r?.dataset.homepageStage==='opening' && r.dataset.homepageBooted==='true'")
    wheel()
    wait("first landing","return r?.dataset.homepageStage==='building'",65)
    time.sleep(.8)
    wheel()
    wait("second landing","return r?.querySelector('[data-seq3-garden-cue]')?.dataset.visible==='true'",65)
    time.sleep(.8)
    wheel()
    wait("orbit handoff","return r?.dataset.homepageStage==='orbit'&&r.dataset.orbitState==='checkpoint'",75)
    metrics=js("return window.auditFlight")
    emit("sequence_video_metrics",metrics)
    for name in ("SEQ_01","SEQ_02","SEQ_03"):
        assert metrics.get(name,{}).get("max",0)>.4, "No measured video playback for "+name
    emit("sequence_handoff",state())


def parked(frame):
    wait("parked at "+str(frame),f"return r?.dataset.orbitState==='checkpoint' && Number(r.dataset.orbitFrame)==={frame} && r.dataset.orbitMaskState==='ready' && Number(r.dataset.orbitMaskCheckpoint)==={frame//15}")


def mouse_at(x,y):
    command("/actions",{"actions":[{"type":"pointer","id":"mouse","parameters":{"pointerType":"mouse"},
            "actions":[{"type":"pointerMove","origin":"viewport","duration":80,"x":round(x),"y":round(y)}]}]})


def hover(apt,u,v):
    x,y=js("const bb=r.querySelector('[data-orbit-render-canvas]').getBoundingClientRect();return [bb.x+bb.width*arguments[0],bb.y+bb.height*arguments[1]]",u,v)
    mouse_at(x,y)
    wait(apt+" hover",f"return r?.dataset.orbitMaskHovered==='{apt}' && r.querySelector('[data-orbit-studio]')?.dataset.apartmentId==='{apt}'",10)
    img=wait(apt+" decoded AVIF","const i=r?.querySelector('[data-orbit-floorplan]');return i?.complete&&i.naturalWidth&&[i.naturalWidth,i.naturalHeight,i.currentSrc.split('/').slice(-2).join('/')]",15)
    wait(apt+" lighting",f"return r?.dataset.orbitLightingState==='ready' && (r.dataset.orbitLightingApartment||'').includes('{apt}')",15)
    emit("hover_floorplan_and_lighting",{"apartment":apt,"image":img,"frame":state()["camera"]})


def next_camera():
    element=command("/element",{"using":"css selector","value":ROOT+' [data-orbit-side-arrow="next"]'})
    command("/element/"+element["element-6066-11e4-a52e-4f735466cecf"]+"/click",{})


def orbit():
    command("/url",{"url":SITE+"?review=safari#orbit"})
    install_monitor()
    parked(0)
    time.sleep(5.5)
    hover("B204",.42473958,.28663366)
    next_camera();parked(15)
    next_camera();parked(30)
    hover("C304",.65286458,.26980198)
    with open("safari-C304.png","wb") as target:
        target.write(base64.b64decode(call("GET","/session/"+session+"/screenshot"),validate=True))
    emit("screenshot","safari-C304.png")
    wait("120 orbit files","return +r?.dataset.orbitDownloaded===120",60)
    command("/window/rect",{"width":1200,"height":740})
    time.sleep(1.3)
    parked(30)
    after=state()
    assert after["downloaded"]=="120", "Lost download cache on resize"
    hover("C304",.65286458,.26980198)
    layout=js("""const b=s=>Math.round(r.querySelector(s).getBoundingClientRect().bottom);return {
          viewport:innerHeight,detail:b('[data-orbit-detail-bar]'),plan:b('[data-orbit-plan-bar]'),
          selects:getComputedStyle(r.querySelector('[data-orbit-filter-bar] select')).appearance};""")
    emit("floorplan_layout_after_resize",layout)
    assert abs(layout["detail"]-layout["plan"])<=2 and layout["plan"]<=layout["viewport"]+2, "Apartment details extend past viewport"
    assert layout["selects"]=="none"
    emit("direct_orbit",after)


def image_rect():
    wait("orbit ready","return r?.dataset.orbitState==='checkpoint'",15)
    return js("const b=r.querySelector('[data-orbit-render-canvas]').getBoundingClientRect();return [b.x,b.y,b.width,b.height]")


def drag():
    x,y,w,h=image_rect()
    initial=int(state()["camera"])
    def move(frac):
        return {"type":"pointerMove","origin":"viewport","x":round(x+w*frac),"y":round(y+h*.45),"duration":40}
    actions=[move(.7),{"type":"pointerDown","button":0}]+[move(.7-i*.014) for i in range(1,21)]
    def perform(items):
        command("/actions",{"actions":[{"type":"pointer","id":"mouse","parameters":{"pointerType":"mouse"},"actions":items}]})
    try:
        perform(actions)
        time.sleep(.15)
        while_held=state()
    finally:
        perform([{"type":"pointerUp","button":0}])
    wait("drag settles","return r.dataset.orbitState==='checkpoint'",12)
    final=int(state()["camera"])
    emit("native_mouse_drag",{"before":initial,"whileHeld":while_held,"settled":final})
    assert int(while_held["camera"])!=initial and final%15==0


def orbit_wheel():
    x,y,w,h=image_rect()
    point=(round(x+w*.52),round(y+h*.42))
    initial=int(state()["camera"]);time.sleep(.8)
    wheel(160,point);parked((initial+15)%120)
    time.sleep(.8);wheel(-160,point);parked(initial)
    emit("orbit_wheel",[initial,(initial+15)%120,initial])


def trackpad_trace():
    x,y,w,h=image_rect()
    pt=(round(x+w*.52),round(y+h*.42))
    cam=int(state()["camera"]);time.sleep(.9)
    js("""const [x,y]=arguments,el=document.elementFromPoint(x,y);
        [1,3,6,9,10,7,5,3,2,1].forEach((dy,i)=>setTimeout(()=>{
          el.dispatchEvent(new WheelEvent('wheel',{bubbles:true,cancelable:true,clientX:x,clientY:y,deltaMode:0,deltaY:dy}));},18*i));""",*pt)
    parked((cam+15)%120);time.sleep(.7)
    out=state();emit("synthetic_trackpad_trace",{"before":cam,"after":out})
    assert int(out["camera"])==(cam+15)%120


def inspect_edges():
    emit("visible_header_links",js("""return [...document.links].filter(a=>{const b=a.getBoundingClientRect();return b.width>15&&b.y>=0&&b.y<100}).slice(0,12).map(a=>[a.innerText.trim(),a.getAttribute('aria-label'),a.getAttribute('href')]);"""))
    outer=js("return [980+outerWidth-innerWidth,540+outerHeight-innerHeight]")
    command("/window/rect",{"width":outer[0],"height":outer[1]})
    time.sleep(1)
    emit("compact_detail_geometry",js("""const bar=r.querySelector('[data-orbit-detail-bar]'),b=bar.getBoundingClientRect(),box=e=>{const z=e.getBoundingClientRect();return [z.left,z.right,z.top,z.bottom].map(Math.round)};
        const nodes=[...bar.querySelectorAll('*')].filter(e=>e.childElementCount===0&&e.textContent.trim()).map(e=>[e.textContent.trim(),box(e)]);
        return {viewport:[innerWidth,innerHeight],bar:box(bar),outside:nodes.filter(q=>q[1][0]<b.left-1||q[1][1]>b.right+1||q[1][3]>b.bottom+1),bedroom:nodes.filter(q=>q[0].includes('Háló'))};"""))


def main():
    global session
    for _ in range(25):
        try:
            if call("GET","/status").get("ready"): break
        except (URLError,RuntimeError): pass
        time.sleep(.4)
    created=call("POST","/session",{"capabilities":{"alwaysMatch":{"browserName":"safari","pageLoadStrategy":"eager"}}})
    session=created["sessionId"]
    emit("native_safari",{"macOS":platform.mac_ver()[0],"arch":platform.machine(),"capabilities":created["capabilities"]})
    failures=[]
    try:
        command("/window/rect",{"width":1440,"height":900})
        for label,check in [("flights",flights),("orbit",orbit),("drag",drag),
                            ("wheel",orbit_wheel),("synthetic trackpad",trackpad_trace),("compact viewport",inspect_edges)]:
            try: check()
            except Exception as err:
                emit("test_failed",[label,str(err)]);failures.append(label)
                try: emit("diagnostics",{"state":state(),"video":js("return window.auditFlight||{}")})
                except Exception: pass
            errors=js("return window.auditErrors||[]")
            emit("page_errors",[label,errors])
            if errors: failures.append(label+" page errors")
    finally:
        call("DELETE","/session/"+session)
    emit("failures",failures)
    return int(bool(failures))


if __name__=="__main__":
    sys.exit(main())
