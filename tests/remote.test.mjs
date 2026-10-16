import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import vm from 'node:vm';
import {createHash} from 'node:crypto';
import {ts,requireDev} from '../scripts/tooling.mjs';
const root=new URL('../',import.meta.url);
const source=await readFile(new URL('src/framer/AdmiralHeroLoader.tsx',root),'utf8');
test('permanent bridge type-checks with the actual React and Framer SDK',()=>{
 const modules=path.dirname(path.dirname(requireDev.resolve('react/package.json')));
 const options={strict:true,noEmit:true,skipLibCheck:true,target:ts.ScriptTarget.ES2020,module:ts.ModuleKind.ESNext,moduleResolution:ts.ModuleResolutionKind.Bundler,jsx:ts.JsxEmit.React,types:['react'],typeRoots:[path.join(modules,'@types')],lib:['lib.es2020.d.ts','lib.dom.d.ts']};
 const host=ts.createCompilerHost(options);
 host.resolveModuleNames=(names,containing)=>names.map(name=>ts.resolveModuleName(name,containing,options,ts.sys).resolvedModule||ts.resolveModuleName(name,path.join(modules,'../component.tsx'),options,ts.sys).resolvedModule);
 const errors=ts.getPreEmitDiagnostics(ts.createProgram([fileURLToPath(new URL('src/framer/AdmiralHeroLoader.tsx',root))],options,host)).filter(d=>d.category===ts.DiagnosticCategory.Error);
 assert.equal(errors.length,0,ts.formatDiagnosticsWithColorAndContext(errors,{getCurrentDirectory:()=>process.cwd(),getCanonicalFileName:f=>f,getNewLine:()=>"\n"}));
});
test('permanent bridge server-renders the opening image without loading remote code',()=>{
 const compiled=ts.transpileModule(source,{compilerOptions:{target:ts.ScriptTarget.ES2020,module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.React}}).outputText;
 const module={exports:{}};
 const framer={addPropertyControls:()=>{},ControlType:new Proxy({},{get:(_,key)=>key}),useIsStaticRenderer:()=>true};
 vm.runInNewContext(compiled,{module,exports:module.exports,require:name=>name==='framer'?framer:requireDev(name)});
 assert.deepEqual(Object.keys(module.exports).sort(),['ArrivalCTA','BuildingContent','OpeningContent','default']);
 const html=requireDev('react-dom/server').renderToStaticMarkup(requireDev('react').createElement(module.exports.default));
 assert.match(html,/raw%20sequence00\.avif/);assert.doesNotMatch(html,/<script|<canvas/);
 assert.ok(!source.includes('function createHeroSequence('),'Bridge must not embed the playback engine');
});
test('release manifest integrity and injected-React runtime match the published artifact',async()=>{
 const manifest=JSON.parse(await readFile(new URL('docs/hero-manifest.json',root),'utf8'));
 const bundle=await readFile(new URL('docs/'+manifest.script,root),'utf8');
 assert.equal(manifest.integrity,'sha384-'+createHash('sha384').update(bundle).digest('base64'));
 const window={};vm.runInNewContext(bundle,{window});
 const module=window.__admiralHeroFactoriesV1[manifest.version](requireDev('react'),{addPropertyControls:()=>{},ControlType:new Proxy({},{get:(_,key)=>key}),RenderTarget:{canvas:'canvas',current:()=> 'export'},useIsStaticRenderer:()=>true});
 const html=requireDev('react-dom/server').renderToStaticMarkup(requireDev('react').createElement(module.default));
 assert.match(html,/https:\/\/unbuiltmarket.github.io\/admiral-park\/assets\/[a-f0-9]+\/raw%20sequence00\.avif/);
 assert.equal(typeof module.ArrivalCTA,'function');
});
