import os
import time
import base64
import qa
from normal import css_and_pixels, key, MONITOR, metrics
from display import colors

qa.SITE=os.environ.get('REVIEW_URL','http://127.0.0.1:8081')
points=[('B204',.42474,.28663),('B301',.07682,.17673),('C304',.65286,.26980),('B301',.85755,.29752),
        ('B301',.29609,.41832),('A301',.83672,.34208),('A301',.29089,.38960),('A301',.39922,.04307)]

def assert_pixels(id):
    p=css_and_pixels()
    def good(name,n):
        return any(v and v['colorCount']>=n and v['nontransparentPixels']>5 for v in (p[name].get('direct'),p[name].get('sample')))
    qa.emit('actual_pixels',[id,p['beauty'].get('direct'),p['lights'].get('direct'),p['beauty'].get('options'),qa.js("return r.dataset.orbitCanvasMode")])
    assert good('beauty',30) and good('lights',1),p

def screenshot():
    geo=qa.js("const b=r.querySelector('[data-orbit-render-canvas]').getBoundingClientRect();return [(b.x+b.width*.2)/innerWidth,(b.y+b.height*.2)/innerHeight,b.width*.6/innerWidth,b.height*.6/innerHeight]")
    with open('safari-repaired-orbit.png','wb') as f:f.write(base64.b64decode(qa.call('GET','/session/'+qa.session+'/screenshot')))
    sample=colors('safari-repaired-orbit.png',geo)
    qa.emit('mac_visible_window',sample)
    assert sample['colors']>30 and sample['dominant']<.98,sample

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
        qa.command('/url',{'url':qa.SITE+'/'})
        qa.wait('opening',"return r?.dataset.homepageStage==='opening'&&r.dataset.homepageBooted==='true'")
        reduced=qa.js("return matchMedia('(prefers-reduced-motion: reduce)').matches")
        qa.emit('reduced',reduced)
        assert reduced==(os.environ.get('REDUCE')=='true')
        qa.js("const s=document.createElement('script');s.textContent=arguments[0];document.head.append(s);s.remove()",MONITOR)
        for label,predicate in [('SEQ_01',"return r?.dataset.homepageStage==='building'"),('SEQ_02',"return r?.querySelector('[data-seq3-garden-cue]')?.dataset.visible==='true'"),('SEQ_03',"return r?.dataset.homepageStage==='orbit'&&r.dataset.orbitState==='checkpoint'")]:
            time.sleep(.85);key();qa.wait(label,predicate,40);qa.emit('arrival',[label,qa.state()])
        films=metrics().get('flights',{})
        qa.emit('instrumented_videos',films)
        if reduced:
            assert not any(v.get('playing') for v in films.values())
        else:
            assert all(films.get(k,{}).get('max',0)>1 for k in ('SEQ_01','SEQ_02','SEQ_03')),films
        qa.parked(0);time.sleep(5.5)
        for i,(id,x,y) in enumerate(points[:2] if reduced else points):
            if i:qa.next_camera();qa.parked(i*15)
            qa.hover(id,x,y);time.sleep(.5);assert_pixels(id)
            if i==0:screenshot()
        if not reduced:
            qa.drag();qa.trackpad_trace()
            qa.wait('full orbit cache','return +r.dataset.orbitDownloaded===120',45)
            qa.inspect_edges()
            assert qa.js("""const b=r.querySelector('[data-orbit-detail-bar]'),box=b.getBoundingClientRect();
            return [...b.querySelectorAll('[data-orbit-apartment-metric]')].every(e=>{const z=e.getBoundingClientRect();return z.left>=box.left-1&&z.right<=box.right+1&&z.bottom<=box.bottom+1})""")
    finally:qa.call('DELETE','/session/'+qa.session)
if __name__=='__main__':run()
