import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
import {ts} from '../scripts/tooling.mjs';

const source=await readFile(new URL('../src/framer/OrbitApartmentFilters.source.tsx',import.meta.url),'utf8');
const context={
 getComputedStyle:element=>({transform:element.transform??'none'}),
 DOMMatrixReadOnly:class{constructor(value){const [a,b,c,d]=JSON.parse(value);Object.assign(this,{a,b,c,d});}},
};
vm.runInNewContext(ts.transpileModule(source+'\nglobalThis.pricePoint=orbitPricePointerValue;globalThis.railGeometry=orbitRangePointerGeometry;',{
 compilerOptions:{target:ts.ScriptTarget.ES2020,module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.React},
}).outputText,context);
const value=context.pricePoint,min=153000000,max=677000000,step=1000000;

test('price track positions snap to million-forint steps and clamp outside the track',()=>{
 const rect={left:10,width:300};
 assert.equal(value(22,rect,300,min,max,step),min);
 assert.equal(value(160,rect,300,min,max,step),415000000);
 assert.equal(value(298,rect,300,min,max,step),max);
 assert.equal(value(-200,rect,300,min,max,step),min);
 assert.equal(value(1000,rect,300,min,max,step),max);
 assert.equal(value(23,rect,300,min,max,step),155000000);
});

test('scaled Framer previews preserve the same handle values and physical thumb insets',()=>{
 const normal={left:10,width:300},scaled={left:100,width:150};
 for(const fraction of [0,.1,.25,.5,.75,.9,1]){
  const normalX=normal.left+12+fraction*(normal.width-24);
  const scaledX=scaled.left+6+fraction*(scaled.width-12);
  assert.equal(value(normalX,normal,300,min,max,step),value(scaledX,scaled,300,min,max,step));
 }
});

test('price track supports arbitrary valid bounds without overshooting a final partial step',()=>{
 assert.equal(value(200,{left:0,width:200},200,100,955,100),955);
 assert.equal(value(-100,{left:0,width:200},200,100,955,100),100);
 assert.equal(value(100,{left:0,width:200},200,100,955,100),500);
});

test('the shared track supports precise one-square-metre area steps',()=>{
 const rect={left:0,width:294};
 assert.equal(value(12,rect,294,47,137,1),47);
 assert.equal(value(147,rect,294,47,137,1),92);
 assert.equal(value(282,rect,294,47,137,1),137);
 assert.equal(value(51,rect,294,47,137,1),60);
 assert.equal(value(51.5,rect,294,47,137,1),60);
});

test('portrait fullscreen maps both range handles onto the rotated physical Y rail',()=>{
 const stage={offsetWidth:300,parentElement:{transform:JSON.stringify([0,1,-1,0]),parentElement:null},getBoundingClientRect:()=>({left:100,top:200,right:132,bottom:500,width:32,height:300})};
 for(const fraction of [0,.2,.5,.8,1]){
  const geometry=context.railGeometry(stage,116,212+fraction*276);
  const rotated=value(geometry.point,geometry.rect,stage.offsetWidth,47,137,1);
  const normal=value(12+fraction*276,{left:0,width:300},300,47,137,1);
  assert.equal(rotated,normal);
 }
});

test('reverse rotation and nested scale preserve slider direction and thumb inset',()=>{
 const scale={transform:JSON.stringify([.5,0,0,.5]),parentElement:null};
 const rotation={transform:JSON.stringify([0,-1,1,0]),parentElement:scale};
 const stage={offsetWidth:300,parentElement:rotation,getBoundingClientRect:()=>({left:100,top:200,right:116,bottom:350,width:16,height:150})};
 for(const fraction of [0,.25,.5,.75,1]){
  const geometry=context.railGeometry(stage,108,344-fraction*138);
  assert.equal(value(geometry.point,geometry.rect,stage.offsetWidth,min,max,step),value(12+fraction*276,{left:0,width:300},300,min,max,step));
 }
});
