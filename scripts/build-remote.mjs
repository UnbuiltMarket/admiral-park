import {readFile,writeFile,mkdir,copyFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {ts,compileTS} from './tooling.mjs';
const root=new URL('../',import.meta.url);
const host='https://unbuiltmarket.github.io/admiral-park/';
export async function buildRemote(){
 const source=await readFile(new URL('src/framer/AdmiralHeroSequence.tsx',root),'utf8');
 const assetsHash=source.match(/const ADMIRAL_SEQUENCE_VERSION = "([a-f0-9]+)"/)[1];
 const assetPath=`assets/${assetsHash}/`;
 await mkdir(new URL('docs/'+assetPath,root),{recursive:true});
 for(let i=0;i<65;i++){
  const filename=`raw sequence${String(i).padStart(2,'0')}.avif`;
  await copyFile(new URL('assets/images/AVIF 30_1920x1010 DESKTOP HERO SEQUENCE/'+encodeURIComponent(filename),root),new URL('docs/'+assetPath+encodeURIComponent(filename),root));
 }
 const remoteSource=source.replace(/const ADMIRAL_SEQUENCE_BASE = "[^"]+"/,`const ADMIRAL_SEQUENCE_BASE = "${host+assetPath.slice(0,-1)}"`);
 const compiled=ts.transpileModule(remoteSource,{compilerOptions:{target:ts.ScriptTarget.ES2020,module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.React,removeComments:true}}).outputText;
 const version=createHash('sha256').update(compiled).digest('hex').slice(0,16);
 const bundle=`// Admiral Park hero runtime. API 1. Generated; edit the source component.\n(function(scope){\n"use strict";\nconst factories=scope.__admiralHeroFactoriesV1||(scope.__admiralHeroFactoriesV1=Object.create(null));\nfactories["${version}"]=function(react,framer){\nconst module={exports:{}};const exports=module.exports;\nconst require=name=>{if(name==="react")return react;if(name==="framer")return framer;throw new Error("Unsupported runtime import: "+name);};\n${compiled}\nreturn module.exports;\n};\n})(window);\n`;
 const manifest={api:1,version,script:`releases/admiral-hero.${version}.js`,integrity:'sha384-'+createHash('sha384').update(bundle).digest('base64')};
 await mkdir(new URL('docs/releases/',root),{recursive:true});
 await writeFile(new URL('docs/'+manifest.script,root),bundle);
 await writeFile(new URL('docs/hero-manifest.json',root),JSON.stringify(manifest,null,2)+'\n');
 await writeFile(new URL('docs/.nojekyll',root),'');
 await writeFile(new URL('docs/index.html',root),'<!doctype html><meta charset="utf-8"><meta name="robots" content="noindex"><title>Admiral Park hero runtime</title><p>Animation files for the Admiral Park Framer component.</p>\n');
 const props=source.match(/interface AdmiralHeroSequenceProps \{[\s\S]*?\n\}/)[0];
 const controls=source.match(/addPropertyControls\(AdmiralHeroSequence,[\s\S]*?\n\}\)/)[0].replace('addPropertyControls(AdmiralHeroSequence,','addPropertyControls(AdmiralHeroLoader,');
 // Use the same versioned URLs as the runtime so the initial image download is reused.
 const base=source.match(/const ADMIRAL_SEQUENCE_BASE = "([^"]+)"/)[1];
 const posters={opening:host+assetPath+'raw%20sequence00.avif?v='+assetsHash,arrival:host+assetPath+'raw%20sequence64.avif?v='+assetsHash,
  openingFallback:base+'/raw%20sequence00.avif?v='+assetsHash,arrivalFallback:base+'/raw%20sequence64.avif?v='+assetsHash};
 const template=await readFile(new URL('src/framer/AdmiralHeroLoader.source.tsx',root),'utf8');
 const loader=template.replace('__FALLBACK_RELEASE__',JSON.stringify(manifest)).replace('__FALLBACK_POSTERS__',JSON.stringify(posters)).replace('// @PROPS_INSERT',() => props).replace('// @CONTROLS_INSERT',() => controls);
 compileTS(loader,'AdmiralHeroLoader.tsx');
 await writeFile(new URL('src/framer/AdmiralHeroLoader.tsx',root),'// Permanent Framer bridge. Paste the entire file once; future compatible runtimes load from GitHub Pages.\n'+loader);
 console.log(`Built remote hero ${version} (${Buffer.byteLength(bundle)} bytes) and permanent Framer loader.`);
}
