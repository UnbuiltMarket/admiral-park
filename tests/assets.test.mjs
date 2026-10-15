import test from "node:test";
import assert from "node:assert/strict";
import {readFile,stat} from "node:fs/promises";
import path from "node:path";
import {fileURLToPath} from "node:url";
import vm from "node:vm";
import {ts,requireDev,inlineCore,compileTS} from "../scripts/tooling.mjs";
const root=new URL("../",import.meta.url);
test("every selectable video exists and metadata matches its actual size",async()=>{
 const data=JSON.parse(await readFile(new URL("data/hero.json",root),"utf8"));
 assert.ok(data.variants.some(v=>v.id===data.defaultVariant));
 for(const v of data.variants)assert.equal((await stat(new URL(v.path,root))).size,v.bytes);
 for(const frame of [data.startFrame,data.endFrame])assert.ok((await stat(new URL(frame,root))).size>0);
});
test("single-file Framer output keeps playback helpers private and has a JSX component",async()=>{
 const core=await readFile(new URL("src/core/hero-player.ts",root),"utf8");
 const source=await readFile(new URL("src/framer/AdmiralHeroVideo.tsx",root),"utf8");
 assert.ok(source.includes(inlineCore(core).trimEnd()),"Rebuild after editing the player");
 assert.doesNotThrow(()=>compileTS(source,"AdmiralHeroVideo.tsx"));
 const ast=ts.createSourceFile("AdmiralHeroVideo.tsx",source,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
 const exports=ast.statements.filter(s=>s.modifiers?.some(m=>m.kind===ts.SyntaxKind.ExportKeyword));
 assert.equal(exports.length,1);
 const component=exports[0];
 assert.ok(ts.isFunctionDeclaration(component));
 assert.equal(component.name.text,"AdmiralHeroVideo");
 assert.ok(component.modifiers.some(m=>m.kind===ts.SyntaxKind.DefaultKeyword));
 let jsx=false;function visit(node){if(ts.isJsxElement(node))jsx=true;ts.forEachChild(node,visit);}visit(component);
 assert.equal(jsx,true);
});
test("Framer component type-checks against React 18 and the Framer SDK",()=>{
 const file=fileURLToPath(new URL("src/framer/AdmiralHeroVideo.tsx",root));
 const modules=path.dirname(path.dirname(requireDev.resolve("react/package.json")));
 const options={strict:true,noEmit:true,skipLibCheck:true,target:ts.ScriptTarget.ES2020,
  module:ts.ModuleKind.ESNext,moduleResolution:ts.ModuleResolutionKind.Bundler,jsx:ts.JsxEmit.React,
  types:["react"],typeRoots:[path.join(modules,"@types")],lib:["lib.es2020.d.ts","lib.dom.d.ts"]};
 const host=ts.createCompilerHost(options);
 host.resolveModuleNames=(names,containingFile)=>names.map(name=>
  ts.resolveModuleName(name,containingFile,options,ts.sys).resolvedModule||
  ts.resolveModuleName(name,path.join(modules,"../component.tsx"),options,ts.sys).resolvedModule);
 const program=ts.createProgram([file],options,host);
 const errors=ts.getPreEmitDiagnostics(program).filter(d=>d.category===ts.DiagnosticCategory.Error);
 assert.equal(errors.length,0,ts.formatDiagnosticsWithColorAndContext(errors,{
  getCurrentDirectory:()=>process.cwd(),getCanonicalFileName:f=>f,getNewLine:()=>"\n"}));
});
test("default export registers the pasted controls and renders without browser globals",async()=>{
 const source=await readFile(new URL("src/framer/AdmiralHeroVideo.tsx",root),"utf8");
 const compiled=ts.transpileModule(source,{compilerOptions:{target:ts.ScriptTarget.ES2020,
  module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.React}}).outputText;
 const React=requireDev("react"),server=requireDev("react-dom/server");
 let registered,controls;
 const stub={addPropertyControls:(component,value)=>{registered=component;controls=value;},
  ControlType:new Proxy({},{get:(_,name)=>name}),useIsStaticRenderer:()=>true};
 const module={exports:{}};
 vm.runInNewContext(compiled,{exports:module.exports,module,require:name=>name==="framer"?stub:requireDev(name)});
 const Component=module.exports.default;
 assert.deepEqual(Object.keys(module.exports),["default"]);
 assert.equal(registered,Component);
 assert.equal(Component.displayName,"Hero Video");
 assert.equal(controls.startFrame.type,"ResponsiveImage");
 assert.equal(controls.endFrame.type,"ResponsiveImage");
 assert.equal(controls.videoUrl.type,"File");
 for(const name of ["useGitHubAssets","autoplay","loop","muted","objectFit","showControls","overlay","focalX","focalY","triggerDistance","preloadVideo","backgroundColor","buttonTextColor","buttonBackgroundColor","buttonBorderColor"])assert.ok(controls[name],name);
 const html=server.renderToStaticMarkup(React.createElement(Component));
 assert.match(html,/class="admiral-hero-video"/);
 assert.match(html,/raw\.githubusercontent\.com\/UnbuiltMarket\/admiral-park\/main\/assets\/images\/START%20frame_web_V02\.webp/);
 assert.equal(controls.useGitHubAssets.defaultValue,true);
 assert.equal(controls.videoUrl.hidden({useGitHubAssets:true}),true);
 assert.equal(controls.videoUrl.hidden({useGitHubAssets:false}),false);
 assert.doesNotMatch(html,/<h1|<nav|<header/);
});
