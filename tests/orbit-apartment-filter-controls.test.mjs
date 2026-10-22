import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
import {ts} from '../scripts/tooling.mjs';

const source=await readFile(new URL('../src/framer/OrbitApartmentFilters.source.tsx',import.meta.url),'utf8');
const context={};
vm.runInNewContext(ts.transpileModule(source+'\nglobalThis.pricePoint=orbitPricePointerValue;',{
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
