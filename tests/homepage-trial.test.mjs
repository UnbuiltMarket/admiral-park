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

test('SEQ_02 contains every connecting frame at the same aspect ratio as the hero and orbit',async()=>{
 const folder=new URL('assets/images/SEQ_02_V01/',root);
 const names=(await readdir(folder)).filter(name=>/^02 sequence\d{2} copy\.avif$/.test(name));
 assert.equal(names.length,73);
 let bytes=0;
 for(let index=0;index<73;index++){
  const name=`02 sequence${String(index).padStart(2,'0')} copy.avif`;
  assert.ok(names.includes(name),name);assert.ok(source.includes(JSON.stringify(name)),`Generated component includes ${name}`);
  const data=await readFile(new URL(encodeURIComponent(name),folder));bytes+=data.length;
  assert.equal(data.toString('ascii',4,8),'ftyp',name);assert.ok(data.subarray(8,64).includes(Buffer.from('avif')),name);
  const ispe=data.indexOf(Buffer.from('ispe'));assert.ok(ispe>=0,`${name}: image dimensions`);
  assert.equal(data.readUInt32BE(ispe+8),1920,name);assert.equal(data.readUInt32BE(ispe+12),1010,name);
 }
 assert.ok(bytes>3_000_000&&bytes<5_000_000,'Connector retains the exported compressed frames');
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
 assert.deepEqual(Object.keys(module.exports).sort(),['AranyhidContent','ArrivalCTA','BalatonfuredContent','BuildingContent','OpeningContent',...Array.from({length:8},(_,i)=>`OrbitView${i+1}`),'default'].sort());
 assert.equal(registered,module.exports.default);
 for(const key of ['startView','editorView','connectionBaseUrl','connectionDuration','checkpointCount','motionWidth','orbitMobileWidth','snapDuration','frameBlend','desktopBuffer','phoneBuffer','orbitStartFrame','detailsMode','detailsLanguage','detailsBottom','detailsInset','apartmentPreview','editorOrbitView','orbitStories','storyIn','storyOut','storyDelay',...Array.from({length:8},(_,i)=>`storyView${i+1}`)])assert.ok(controls[key],`Framer control ${key}`);
 assert.equal(controls.duration.title,'SEQ_01 duration');assert.equal(controls.connectionDuration.title,'SEQ_02 duration');assert.equal(controls.connectionDuration.defaultValue,2.5);assert.equal(controls.connectionBaseUrl.defaultValue,'');
 assert.ok(Array.from(controls.editorView.options).includes('connection'),'Editor exposes a static connection preview');
 assert.equal(controls.snapDuration.title,'Settle time');assert.equal(controls.snapDuration.defaultValue,1.5);assert.equal(controls.snapDuration.max,10);
 assert.equal(controls.frameBlend.defaultValue,0);assert.equal(controls.frameBlend.min,0);assert.equal(controls.frameBlend.max,100);
 assert.equal(controls.desktopBuffer.title,'Desktop buffer');assert.equal(controls.desktopBuffer.defaultValue,2);assert.equal(controls.desktopBuffer.min,1);assert.equal(controls.desktopBuffer.max,3);
 assert.equal(controls.phoneBuffer.title,'Phone buffer');assert.equal(controls.phoneBuffer.defaultValue,1);assert.equal(controls.phoneBuffer.min,1);assert.equal(controls.phoneBuffer.max,3);
 assert.equal(controls.orbitStartFrame.title,'Orbit start frame');assert.equal(controls.orbitStartFrame.defaultValue,45);assert.equal(controls.orbitStartFrame.min,0);assert.equal(controls.orbitStartFrame.max,119);assert.equal(controls.orbitStartFrame.step,1);
 assert.equal(controls.detailsMode.defaultValue,'preview');assert.deepEqual(Array.from(controls.detailsMode.options),['preview','hover','off']);assert.equal(controls.detailsLanguage.defaultValue,'hu');assert.deepEqual(Array.from(controls.detailsLanguage.options),['hu','en']);
 assert.equal(controls.detailsBottom.defaultValue,32);assert.equal(controls.detailsInset.defaultValue,48);assert.equal(controls.apartmentPreview.type,'Object');
 for(const field of ['number','area','terrace','garden','rooms','availability','floorplan'])assert.ok(controls.apartmentPreview.controls[field],`Apartment preview control ${field}`);
 assert.equal(controls.editorOrbitView.defaultValue,'entry');assert.deepEqual(Array.from(controls.editorOrbitView.options),['entry',...Array.from({length:8},(_,i)=>String(i+1))]);
 assert.equal(controls.orbitStories.defaultValue,true);assert.equal(controls.storyIn.defaultValue,.6);assert.equal(controls.storyOut.defaultValue,.3);assert.equal(controls.storyDelay.defaultValue,.12);
 for(let view=1;view<=8;view++){
  const control=controls[`storyView${view}`];assert.equal(control.type,'Object',`View ${view} groups its independent motion settings`);
  for(const key of ['enterFrom','exitTo'])assert.deepEqual(Array.from(control.controls[key].options),['left','right','top','bottom','none'],`View ${view} ${key} directions`);
  assert.equal(control.controls.enterFrom.defaultValue,'bottom');assert.equal(control.controls.exitTo.defaultValue,'bottom');assert.equal(control.controls.distance.defaultValue,24);
 }
 for(const removed of ['wheelSensitivity','dragSensitivity','orbitMomentum'])assert.equal(controls[removed],undefined,`Obsolete speed control ${removed} is hidden`);
 const html=requireDev('react-dom/server').renderToStaticMarkup(requireDev('react').createElement(module.exports.default));
 assert.match(html,/raw%20sequence00\.avif/);
 assert.doesNotMatch(html,/<script|<iframe|<nav|<video/);assert.doesNotMatch(html,/data-orbit-story=/,'The component does not invent or duplicate the eight native Framer content groups');
 assert.doesNotMatch(source,/hero-manifest\.json|__admiralHeroFactoriesV1|AdmiralHeroLoader/);
 const connectionPreview=requireDev('react-dom/server').renderToStaticMarkup(requireDev('react').createElement(module.exports.default,{editorView:'connection'}));
 assert.match(connectionPreview,/02%20sequence36%20copy\.avif/,'Connection editor displays its middle frame');assert.match(connectionPreview,/data-homepage-stage="connection"/);
 const orbitPreview=requireDev('react-dom/server').renderToStaticMarkup(requireDev('react').createElement(module.exports.default,{editorView:'orbit'}));
 assert.match(orbitPreview,/adjusted%20sequence0045%20copy\.avif/,'Editor orbit preview uses the new default fourth camera');
 assert.match(orbitPreview,/data-apartment-details/);assert.match(orbitPreview,/MINTA/);assert.match(orbitPreview,/A\.204/);
 const authoredView=requireDev('react-dom/server').renderToStaticMarkup(requireDev('react').createElement(module.exports.default,{editorView:'orbit',editorOrbitView:'2',orbitStartFrame:45}));assert.match(authoredView,/adjusted%20sequence0015%20copy\.avif/,'Static story editing can select camera 2 independently of the live entry camera');
 const englishPreview=requireDev('react-dom/server').renderToStaticMarkup(requireDev('react').createElement(module.exports.default,{editorView:'orbit',detailsLanguage:'en'}));assert.match(englishPreview,/SAMPLE/);assert.match(englishPreview,/Available/);
 const hiddenDetails=requireDev('react-dom/server').renderToStaticMarkup(requireDev('react').createElement(module.exports.default,{editorView:'orbit',detailsMode:'off'}));assert.doesNotMatch(hiddenDetails,/data-apartment-details/);
 for(const [input,expected] of [[42.7,43],[-2,0],[125,119],[NaN,45],[Infinity,45]]){
  const preview=requireDev('react-dom/server').renderToStaticMarkup(requireDev('react').createElement(module.exports.default,{editorView:'orbit',orbitStartFrame:input}));
  assert.ok(preview.includes(`adjusted%20sequence${String(expected).padStart(4,'0')}%20copy.avif`),`Orbit start ${String(input)} resolves to ${expected}`);
 }
});
