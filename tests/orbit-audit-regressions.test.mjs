import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
import { ts, inlineCore } from '../scripts/tooling.mjs';

const root = new URL('../', import.meta.url);
const source = await readFile(new URL('src/framer/OrbitApartmentData.source.tsx', root), 'utf8');
const data = JSON.parse(await readFile(new URL('data/apartments.json', root), 'utf8'));
const code = ts.transpileModule(source + '\nglobalThis.api={requestOrbitApartmentDataset,invalidateOrbitApartmentDataset,orbitDataPointerInBridge};', { compilerOptions: { target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.React } }).outputText;
function fixture(fetch) {
    let id=0;const timers=new Map();
    const context={URL,AbortController,fetch,setTimeout:callback=>{timers.set(++id,callback);return id;},clearTimeout:key=>timers.delete(key)};
    vm.runInNewContext(code,context);
    return {api:context.api,timers};
}

test('a stalled orbit download times out, aborts, evicts and can retry successfully',async()=>{
    let calls=0,signal;
    const {api,timers}=fixture((url,options)=>{calls++;signal=options.signal;return calls===1?new Promise(()=>{}):Promise.resolve({ok:true,json:async()=>data});});
    const first=api.requestOrbitApartmentDataset('https://test/apartments.json');
    assert.equal(first,api.requestOrbitApartmentDataset('https://test/apartments.json'));
    const rejected=assert.rejects(first,/timed out/);
    [...timers.values()][0]();await rejected;
    assert.equal(signal.aborted,true);assert.equal(timers.size,0);
    const retry=api.requestOrbitApartmentDataset('https://test/apartments.json');assert.equal((await retry).apartments.length,69);assert.equal(calls,2);
    assert.equal(api.requestOrbitApartmentDataset('https://test/apartments.json'),retry);assert.equal(timers.size,0);
});

test('a stalled response body also times out and explicit retry never reuses pending work',async()=>{
    let calls=0;const signals=[];
    const {api,timers}=fixture((url,options)=>{signals.push(options.signal);calls++;return Promise.resolve({ok:true,json:()=>calls===1?new Promise(()=>{}):Promise.resolve(data)});});
    const first=api.requestOrbitApartmentDataset('https://test/body.json');const rejected=assert.rejects(first,/cancelled/);
    await Promise.resolve();api.invalidateOrbitApartmentDataset('https://test/body.json');
    const retry=api.requestOrbitApartmentDataset('https://test/body.json');await rejected;assert.equal((await retry).apartments.length,69);
    assert.equal(signals[0].aborted,true);assert.equal(signals[1].aborted,false);assert.equal(calls,2);assert.equal(timers.size,0);
    assert.equal(api.requestOrbitApartmentDataset('https://test/body.json'),retry,'late old cleanup preserves the new cache entry');
});

test('orbitdata corridor retains only the control bounds and direct pointer approach',()=>{
    const {api}=fixture(()=>{}),origin={x:700,y:300},bounds={left:950,right:1150,top:600,bottom:800};
    assert.equal(api.orbitDataPointerInBridge(origin,{x:850,y:450},bounds),true);
    assert.equal(api.orbitDataPointerInBridge(origin,{x:1050,y:700},bounds),true);
    assert.equal(api.orbitDataPointerInBridge(origin,{x:500,y:500},bounds),false);
    assert.equal(api.orbitDataPointerInBridge(origin,{x:900,y:200},bounds),false);
});

test('all homepage source fragments are embedded verbatim, including replacement-token literals',async()=>{
    const generated=await readFile(new URL('src/framer/AdmiralHomepageTrial.tsx',root),'utf8');
    for(const file of ['OrbitStoryOverlays.source.tsx','OrbitApartmentData.source.tsx','OrbitApartmentFilters.source.tsx','OrbitApartmentStudio.source.tsx','OrbitFullscreen.source.tsx','ApartmentDetails.source.tsx']){
        const fragment=await readFile(new URL('src/framer/'+file,root),'utf8');assert.ok(generated.includes(fragment),file+' is inserted without interpreting $ replacement tokens');
    }
    for(const file of ['hero-sequence.ts','orbit-player.ts','orbit-apartment-picker.ts','orbit-apartment-filters.ts']){
        const fragment=inlineCore(await readFile(new URL('src/core/'+file,root),'utf8'));assert.ok(generated.includes(fragment),file+' is inserted verbatim after removing exports');
    }
    assert.ok(generated.includes('"\\\\$&"'),'the fullscreen logo escape replacement is preserved');
});
