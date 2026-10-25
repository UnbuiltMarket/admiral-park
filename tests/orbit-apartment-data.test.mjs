import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
import {ts} from '../scripts/tooling.mjs';

const dataset=JSON.parse(await readFile(new URL('../data/apartments.json',import.meta.url),'utf8'));
const source=await readFile(new URL('../src/framer/OrbitApartmentData.source.tsx',import.meta.url),'utf8');
const script=ts.transpileModule(source+'\nglobalThis.adapter={parseOrbitApartmentDataset,requestOrbitApartmentDataset,orbitApartmentPlan,orbitApartmentAssetUrl,useOrbitPreviewImage};',{compilerOptions:{target:ts.ScriptTarget.ES2020,module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.React}}).outputText;
function adapter(fetch=()=>Promise.reject(new Error('Unexpected fetch')),extra={}){const context={URL,fetch,console,AbortController,setTimeout,clearTimeout,...extra};vm.runInNewContext(script,context);return context.adapter;}

test('orbit JSON retains all 69 canonical units, honest nulls and floorplan crop metadata without room lists',()=>{
 const api=adapter(),parsed=api.parseOrbitApartmentDataset(dataset);
 assert.equal(parsed.apartments.length,69);assert.equal(new Set(parsed.apartments.map(item=>item.id)).size,69);
 const sold=parsed.apartments.find(item=>item.id==='B105'),unknown=parsed.apartments.find(item=>item.id==='A201'),sample=parsed.apartments.find(item=>item.id==='A001');
 assert.equal(sold.status,'sold');assert.equal(sold.price,null);assert.equal(unknown.rooms,null);assert.equal(unknown.areaGarden,null);
 assert.equal(sample.areaInterior,68.67);assert.equal(sample.areaTerrace,39);assert.equal(sample.price,248950000);
 assert.equal(sample.maskColor,'#2080E0');assert.equal(parsed.apartments.filter(item=>/^#[0-9A-F]{6}$/.test(item.maskColor)).length,69);
 assert.ok(!JSON.stringify(parsed).includes('roomList'));assert.ok(!JSON.stringify(parsed).includes('markers'));assert.ok(!JSON.stringify(parsed).includes('original.png'));
 const plan=api.orbitApartmentPlan(sample,parsed,'https://media.test/apartment-assets');
 assert.equal(plan.url,'https://media.test/apartment-assets/floorplans/types/B/full.webp');assert.equal(plan.dimensions.width,1500);assert.equal(plan.dimensions.height,2000);assert.equal(plan.isIllustrative,true);
 assert.ok(Math.abs(plan.aspect-(1500*.9306666666666666)/(2000*.7895))<1e-10);assert.equal(plan.viewBox.y,.125);
 const layout=api.orbitApartmentPlan(sample,parsed,'https://media.test/apartment-assets','floorLayout');assert.equal(layout.url,'https://media.test/apartment-assets/floor-layouts/00/full.webp');assert.equal(layout.isIllustrative,false);
});

test('orbit previews prefer existing cropped thumbnails without double cropping while full drawings remain unchanged',()=>{
 const api=adapter(),parsed=api.parseOrbitApartmentDataset(dataset),sample=parsed.apartments.find(item=>item.id==='A001');
 const full=api.orbitApartmentPlan(sample,parsed,'https://media.test/apartment-assets');
 const thumbnail=api.orbitApartmentPlan(sample,parsed,'https://media.test/apartment-assets','floorplan',true);
 assert.equal(thumbnail.url,'https://media.test/apartment-assets/floorplans/types/B/thumb.webp');
 assert.equal(thumbnail.aspect,full.aspect);assert.deepEqual(JSON.parse(JSON.stringify(thumbnail.viewBox)),{x:0,y:0,width:1,height:1});
 assert.equal(thumbnail.dimensions.width,full.dimensions.width*full.viewBox.width);assert.equal(thumbnail.dimensions.height,full.dimensions.height*full.viewBox.height);
 assert.equal(full.url,'https://media.test/apartment-assets/floorplans/types/B/full.webp');assert.equal(full.viewBox.y,.125);
 for(const invalid of [undefined,'javascript:alert(1)']){
  const record=structuredClone(sample);record.media.floorplan.thumbnail=invalid;
  const fallback=api.orbitApartmentPlan(record,parsed,'https://media.test/apartment-assets','floorplan',true);
  assert.equal(fallback.url,full.url);assert.equal(fallback.viewBox.y,full.viewBox.y);
 }
});

test('optional apartment mask colours are retained only as complete RGB hex values',()=>{
 const api=adapter();
 for(const [input,expected] of [[' #ab12ef ','#AB12EF'],['#ABCDEFx',undefined],['red',undefined],['#000',undefined],[null,undefined]]){
  const value=structuredClone(dataset);value.apartments[0].maskColor=input;
  assert.equal(api.parseOrbitApartmentDataset(value).apartments[0].maskColor,expected);
 }
});

test('preview loading waits for stable hover URLs, suppresses stale drawings and reuses loaded thumbnails',async()=>{
 let cursor=0,clock=0,timerId=0;
 const state=[],effects=[],pending=[],timers=new Map(),requests=[];
 const React={
  useState(initial){const index=cursor++;if(!(index in state))state[index]=initial;return[state[index],value=>{state[index]=typeof value==='function'?value(state[index]):value;}];},
  useEffect(effect,deps){const index=cursor++,previous=effects[index];if(!previous||deps.some((value,i)=>!Object.is(value,previous.deps[i]))){pending.push(()=>{previous?.cleanup?.();effects[index]={deps,cleanup:effect()};});}},
 };
 class FakeImage{
  set src(url){this.url=url;requests.push(this);}
  decode(){return new Promise((resolve,reject)=>{this.resolveDecode=resolve;this.rejectDecode=reject;});}
 }
 const api=adapter(undefined,{React,Image:FakeImage,setTimeout:(callback,delay)=>{const id=++timerId;timers.set(id,{callback,at:clock+delay});return id;},clearTimeout:id=>timers.delete(id)});
 const render=(url,enabled=true)=>{cursor=0;const result=api.useOrbitPreviewImage(url,enabled);while(pending.length)pending.shift()();return result;};
 const advance=milliseconds=>{clock+=milliseconds;for(const[id,timer]of[...timers])if(timer.at<=clock){timers.delete(id);timer.callback();}};
 const flush=async()=>{for(let tick=0;tick<6;tick++)await Promise.resolve();};
 const load=async image=>{image.onload();image.resolveDecode();await flush();};
 assert.equal(render('https://media.test/A.webp'),null);advance(100);assert.equal(requests.length,0);
 assert.equal(render('https://media.test/B.webp'),null);advance(159);assert.equal(requests.length,0);advance(1);assert.equal(requests.length,1);assert.equal(requests[0].url,'https://media.test/B.webp');
 requests[0].onload();assert.equal(render('https://media.test/B.webp'),null);requests[0].resolveDecode();await flush();assert.equal(render('https://media.test/B.webp'),'https://media.test/B.webp');
 assert.equal(render('https://media.test/C.webp'),null);advance(160);assert.equal(requests.length,2);
 assert.equal(render('https://media.test/D.webp'),null);await load(requests[1]);assert.equal(render('https://media.test/D.webp'),null);
 advance(160);assert.equal(requests.length,3);await load(requests[2]);assert.equal(render('https://media.test/D.webp'),'https://media.test/D.webp');
 assert.equal(render('https://media.test/B.webp'),'https://media.test/B.webp');advance(160);assert.equal(requests.length,3);
 assert.equal(render('https://media.test/E.webp'),null);advance(160);requests[3].onerror();await flush();assert.equal(render('https://media.test/E.webp'),null);
 assert.equal(render('https://media.test/B.webp',false),null);assert.equal(render(null),null);
});

test('orbit JSON rejects duplicate IDs and invalid numbers and never turns arbitrary URLs into executable assets',()=>{
 const api=adapter();
 for(const mutate of [input=>input.apartments.push(input.apartments[0]),input=>input.apartments[0].price=-1,input=>input.apartments[0].areaInterior='68.67',input=>input.roomLayouts.B.viewBox.width=2]){
  const input=structuredClone(dataset);mutate(input);assert.throws(()=>api.parseOrbitApartmentDataset(input));
 }
 assert.equal(api.orbitApartmentAssetUrl('javascript:alert(1)','https://media.test/'),null);assert.equal(api.orbitApartmentAssetUrl('data:image/svg+xml,evil','https://media.test/'),null);
});

test('orbit apartment requests share one in-flight download, cache success and allow a failed JSON request to retry',async()=>{
 let calls=0,resolve;
 const api=adapter(()=>{calls++;return new Promise(done=>resolve=done);});
 const first=api.requestOrbitApartmentDataset('https://data.test/apartments.json'),same=api.requestOrbitApartmentDataset('https://data.test/apartments.json');
 assert.equal(first,same);assert.equal(calls,1);resolve({ok:false,status:503});await assert.rejects(first,/503/);
 const retry=api.requestOrbitApartmentDataset('https://data.test/apartments.json');assert.equal(calls,2);resolve({ok:true,json:async()=>structuredClone(dataset)});assert.equal((await retry).apartments.length,69);
 assert.equal(await api.requestOrbitApartmentDataset('https://data.test/apartments.json'),await retry);assert.equal(calls,2);
});


test('apartment cache revalidates after its lease, deduplicates refreshes, and keeps identity for unchanged data',async()=>{
 let now=1000,calls=0,revision=structuredClone(dataset);
 const api=adapter(async()=>{calls++;return{ok:true,json:async()=>structuredClone(revision)};},{Date:{now:()=>now}});
 const first=await api.requestOrbitApartmentDataset('https://data.test/apartments.json');
 assert.equal(calls,1);assert.equal(await api.requestOrbitApartmentDataset('https://data.test/apartments.json'),first);
 now+=60001;const [a,b]=await Promise.all([api.requestOrbitApartmentDataset('https://data.test/apartments.json'),api.requestOrbitApartmentDataset('https://data.test/apartments.json')]);
 assert.equal(calls,2);assert.equal(a,first);assert.equal(b,first,'Unchanged records retain identity');
 revision.apartments[0].status='sold';revision.apartments[0].price=123456789;now+=60001;
 const changed=await api.requestOrbitApartmentDataset('https://data.test/apartments.json');
 assert.equal(calls,3);assert.notEqual(changed,first);assert.equal(changed.apartments[0].status,'sold');assert.equal(changed.apartments[0].price,123456789);
 await api.requestOrbitApartmentDataset('https://data.test/apartments.json',true);assert.equal(calls,4,'Explicit retry revalidates within the lease');
});
