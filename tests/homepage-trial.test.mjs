import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,readdir} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import vm from 'node:vm';
import {ts,requireDev} from '../scripts/tooling.mjs';

const root=new URL('../',import.meta.url);
const source=await readFile(new URL('src/framer/AdmiralHomepageTrial.tsx',root),'utf8');

test('trial orbit contains exactly 120 consecutive AVIFs at the intended aspect ratio',async()=>{
 const folder=new URL('assets/ORBIT PICKER/BEAUTY sequence_Desktop/',root);
 const names=(await readdir(folder)).filter(name=>/^adjusted sequence\d{4} copy\.avif$/.test(name));
 assert.equal(names.length,120);
 let bytes=0;
 for(let index=0;index<120;index++){
  const name=`adjusted sequence${String(index).padStart(4,'0')} copy.avif`;
  assert.ok(names.includes(name),name);
  assert.ok(source.includes(JSON.stringify(name)),`Generated component uses the rerendered frame ${name}`);
  const data=await readFile(new URL(encodeURIComponent(name),folder));bytes+=data.length;
  assert.equal(data.toString('ascii',4,8),'ftyp',name);
  assert.ok(data.subarray(8,64).includes(Buffer.from('avif')),name);
  const ispe=data.indexOf(Buffer.from('ispe'));assert.ok(ispe>=0,`${name}: image dimensions`);
  assert.equal(data.readUInt32BE(ispe+8),1920,name);assert.equal(data.readUInt32BE(ispe+12),1010,name);
 }
 assert.ok(bytes>0);
});

test('combined homepage and native overrides type-check with the real React and Framer SDKs',()=>{
 const file=fileURLToPath(new URL('src/framer/AdmiralHomepageTrial.tsx',root));
 const modules=path.dirname(path.dirname(requireDev.resolve('react/package.json')));
 const options={strict:true,noEmit:true,skipLibCheck:true,target:ts.ScriptTarget.ES2020,module:ts.ModuleKind.ESNext,
  moduleResolution:ts.ModuleResolutionKind.Bundler,jsx:ts.JsxEmit.React,types:['react'],
  typeRoots:[path.join(modules,'@types')],lib:['lib.es2020.d.ts','lib.dom.d.ts']};
 const host=ts.createCompilerHost(options);
 host.resolveModuleNames=(names,containing)=>names.map(name=>ts.resolveModuleName(name,containing,options,ts.sys).resolvedModule||ts.resolveModuleName(name,path.join(modules,'../component.tsx'),options,ts.sys).resolvedModule);
 const errors=ts.getPreEmitDiagnostics(ts.createProgram([file],options,host)).filter(d=>d.category===ts.DiagnosticCategory.Error);
 assert.equal(errors.length,0,ts.formatDiagnosticsWithColorAndContext(errors,{getCurrentDirectory:()=>process.cwd(),getCanonicalFileName:f=>f,getNewLine:()=>"\n"}));
});

test('paste-in homepage registers its controls and server-renders without loading remote executable code',()=>{
 const compiled=ts.transpileModule(source,{compilerOptions:{target:ts.ScriptTarget.ES2020,module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.React}}).outputText;
 let registered,controls;
 const stub={addPropertyControls:(component,props)=>{registered=component;controls=props;},ControlType:new Proxy({},{get:(_,name)=>name}),useIsStaticRenderer:()=>true,RenderTarget:{canvas:'canvas',current:()=> 'canvas'}};
 const module={exports:{}};
 vm.runInNewContext(compiled,{module,exports:module.exports,require:name=>name==='framer'?stub:requireDev(name)});
 assert.deepEqual(Object.keys(module.exports).sort(),['ArrivalCTA','BuildingContent','OpeningContent','default']);
 assert.equal(registered,module.exports.default);
 for(const key of ['startView','editorView','checkpointCount','motionWidth','orbitMobileWidth','snapDuration','frameBlend','desktopBuffer','phoneBuffer'])assert.ok(controls[key],`Framer control ${key}`);
 assert.equal(controls.snapDuration.title,'Settle time');assert.equal(controls.snapDuration.defaultValue,1.5);assert.equal(controls.snapDuration.max,10);
 assert.equal(controls.frameBlend.defaultValue,0);assert.equal(controls.frameBlend.min,0);assert.equal(controls.frameBlend.max,100);
 assert.equal(controls.desktopBuffer.title,'Desktop buffer');assert.equal(controls.desktopBuffer.defaultValue,2);assert.equal(controls.desktopBuffer.min,1);assert.equal(controls.desktopBuffer.max,3);
 assert.equal(controls.phoneBuffer.title,'Phone buffer');assert.equal(controls.phoneBuffer.defaultValue,1);assert.equal(controls.phoneBuffer.min,1);assert.equal(controls.phoneBuffer.max,3);
 for(const removed of ['wheelSensitivity','dragSensitivity','orbitMomentum'])assert.equal(controls[removed],undefined,`Obsolete speed control ${removed} is hidden`);
 const html=requireDev('react-dom/server').renderToStaticMarkup(requireDev('react').createElement(module.exports.default));
 assert.match(html,/raw%20sequence00\.avif/);
 assert.doesNotMatch(html,/<script|<iframe|<nav|<video/);
 assert.doesNotMatch(source,/hero-manifest\.json|__admiralHeroFactoriesV1|AdmiralHeroLoader/);
});
