import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
import {ts} from '../scripts/tooling.mjs';

const dataset=JSON.parse(await readFile(new URL('../data/apartments.json',import.meta.url),'utf8'));
const source=await readFile(new URL('../src/framer/OrbitApartmentData.source.tsx',import.meta.url),'utf8');
const script=ts.transpileModule(source+'\nglobalThis.adapter={parseOrbitApartmentDataset,requestOrbitApartmentDataset,orbitApartmentPlan,orbitApartmentAssetUrl};',{compilerOptions:{target:ts.ScriptTarget.ES2020,module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.React}}).outputText;
function adapter(fetch=()=>Promise.reject(new Error('Unexpected fetch'))){const context={URL,fetch,console};vm.runInNewContext(script,context);return context.adapter;}

test('orbit JSON retains all 69 canonical units, honest nulls and floorplan crop metadata without room lists',()=>{
 const api=adapter(),parsed=api.parseOrbitApartmentDataset(dataset);
 assert.equal(parsed.apartments.length,69);assert.equal(new Set(parsed.apartments.map(item=>item.id)).size,69);
 const sold=parsed.apartments.find(item=>item.id==='B105'),unknown=parsed.apartments.find(item=>item.id==='A201'),sample=parsed.apartments.find(item=>item.id==='A001');
 assert.equal(sold.status,'sold');assert.equal(sold.price,null);assert.equal(unknown.rooms,null);assert.equal(unknown.areaGarden,null);
 assert.equal(sample.areaInterior,68.67);assert.equal(sample.areaTerrace,39);assert.equal(sample.price,248950000);
 assert.ok(!JSON.stringify(parsed).includes('roomList'));assert.ok(!JSON.stringify(parsed).includes('markers'));assert.ok(!JSON.stringify(parsed).includes('original.png'));
 const plan=api.orbitApartmentPlan(sample,parsed,'https://media.test/apartment-assets');
 assert.equal(plan.url,'https://media.test/apartment-assets/floorplans/types/B/full.webp');assert.equal(plan.dimensions.width,1500);assert.equal(plan.dimensions.height,2000);assert.equal(plan.isIllustrative,true);
 assert.ok(Math.abs(plan.aspect-(1500*.9306666666666666)/(2000*.7895))<1e-10);assert.equal(plan.viewBox.y,.125);
 const layout=api.orbitApartmentPlan(sample,parsed,'https://media.test/apartment-assets','floorLayout');assert.equal(layout.url,'https://media.test/apartment-assets/floor-layouts/00/full.webp');assert.equal(layout.isIllustrative,false);
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
 assert.equal(api.requestOrbitApartmentDataset('https://data.test/apartments.json'),retry);assert.equal(calls,2);
});
