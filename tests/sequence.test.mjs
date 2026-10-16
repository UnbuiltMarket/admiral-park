import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,readdir} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import vm from 'node:vm';
import {ts,requireDev,inlineCore} from '../scripts/tooling.mjs';
const root=new URL('../',import.meta.url);
const source=await readFile(new URL('src/framer/AdmiralHeroSequence.tsx',root),'utf8');
test('corrected sequence includes every expected numbered frame',async()=>{
 const folder=new URL('assets/images/AVIF 30_1920x1010 DESKTOP HERO SEQUENCE/',root);
 const files=(await readdir(folder)).filter(n=>/^raw sequence\d{2}\.avif$/.test(n));
 assert.equal(files.length,65);
 assert.match(source,/const count = useGitHubAssets \? 65 :/);
 for(let i=0;i<65;i++){
  const name=`raw sequence${String(i).padStart(2,'0')}.avif`;
  assert.ok(files.includes(name));
  const data=await readFile(new URL(encodeURIComponent(name),folder));
  assert.equal(data.toString('ascii',4,8),'ftyp',name);
  assert.ok(data.subarray(8,64).includes(Buffer.from('avif')),name);
 }
});
test('sequence and its named overrides type-check with the actual React/Framer SDK',()=>{
 const file=fileURLToPath(new URL('src/framer/AdmiralHeroSequence.tsx',root));
 const modules=path.dirname(path.dirname(requireDev.resolve('react/package.json')));
 const options={strict:true,noEmit:true,skipLibCheck:true,target:ts.ScriptTarget.ES2020,module:ts.ModuleKind.ESNext,
  moduleResolution:ts.ModuleResolutionKind.Bundler,jsx:ts.JsxEmit.React,types:['react'],
  typeRoots:[path.join(modules,'@types')],lib:['lib.es2020.d.ts','lib.dom.d.ts']};
 const host=ts.createCompilerHost(options);
 host.resolveModuleNames=(names,containing)=>names.map(name=>ts.resolveModuleName(name,containing,options,ts.sys).resolvedModule||ts.resolveModuleName(name,path.join(modules,'../component.tsx'),options,ts.sys).resolvedModule);
 const errors=ts.getPreEmitDiagnostics(ts.createProgram([file],options,host)).filter(d=>d.category===ts.DiagnosticCategory.Error);
 assert.equal(errors.length,0,ts.formatDiagnosticsWithColorAndContext(errors,{getCurrentDirectory:()=>process.cwd(),getCanonicalFileName:f=>f,getNewLine:()=>"\n"}));
});
test('standalone sequence registers and server-renders without browser globals',async()=>{
 const core=await readFile(new URL('src/core/hero-sequence.ts',root),'utf8');
 assert.ok(source.includes(inlineCore(core).trimEnd()));
 const compiled=ts.transpileModule(source,{compilerOptions:{target:ts.ScriptTarget.ES2020,module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.React}}).outputText;
 let registered;
 const stub={addPropertyControls:(component)=>registered=component,ControlType:new Proxy({},{get:(_,name)=>name}),useIsStaticRenderer:()=>true};
 const module={exports:{}};
 vm.runInNewContext(compiled,{module,exports:module.exports,require:name=>name==='framer'?stub:requireDev(name)});
 assert.deepEqual(Object.keys(module.exports).sort(),['ArrivalCTA','BuildingContent','OpeningContent','default']);
 assert.equal(registered,module.exports.default);
 const html=requireDev('react-dom/server').renderToStaticMarkup(requireDev('react').createElement(module.exports.default));
 assert.match(html,/AVIF%2030_1920x1010/);assert.match(html,/raw%20sequence00\.avif/);
 assert.doesNotMatch(html,/<h1|<nav|<video/);
});
