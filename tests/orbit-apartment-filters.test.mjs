import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
import {ts} from '../scripts/tooling.mjs';

const dataset=JSON.parse(await readFile(new URL('../data/apartments.json',import.meta.url),'utf8'));
const source=await readFile(new URL('../src/core/orbit-apartment-filters.ts',import.meta.url),'utf8');
const script=ts.transpileModule(source+'\nglobalThis.filtersApi={getOrbitPriceBounds,normalizeOrbitFilters,getOrbitFilterResult};',{
 compilerOptions:{target:ts.ScriptTarget.ES2020,module:ts.ModuleKind.CommonJS},reportDiagnostics:true,
});
assert.equal((script.diagnostics||[]).filter(item=>item.category===ts.DiagnosticCategory.Error).length,0);
const context={exports:{}};vm.runInNewContext(script.outputText,context);
const {getOrbitPriceBounds,normalizeOrbitFilters,getOrbitFilterResult}=context.filtersApi;
const plain=value=>JSON.parse(JSON.stringify(value));
const empty=()=>({statuses:[],priceMin:null,priceMax:null});

test('real dataset bounds cover all 63 known HUF prices on an outward million-forint grid',()=>{
 assert.equal(dataset.apartments.length,69);
 assert.deepEqual(plain(getOrbitPriceBounds(dataset.apartments)),{min:153000000,max:677000000,step:1000000,pricedCount:63,currency:'HUF'});
 assert.equal(Math.min(...dataset.apartments.flatMap(item=>item.price===null?[]:[item.price])),153888000);
 assert.equal(Math.max(...dataset.apartments.flatMap(item=>item.price===null?[]:[item.price])),676200000);
});

test('no criteria is hover-only while all statuses selected deliberately activates highlights',()=>{
 const result=getOrbitFilterResult(dataset.apartments,empty());
 assert.equal(result.active,false);assert.deepEqual(plain(result.matchingIds),dataset.apartments.map(item=>item.id));
 const all=getOrbitFilterResult(dataset.apartments,{...empty(),statuses:['sold','available','under_negotiation']});
 assert.equal(all.active,true);assert.equal(all.matchingIds.length,69);
 assert.deepEqual(plain(all.filters.statuses),['available','under_negotiation','sold']);
});

test('availability options combine with OR, retain source order, and price combines with AND',()=>{
 const available=getOrbitFilterResult(dataset.apartments,{...empty(),statuses:['available']});
 assert.equal(available.matchingIds.length,61);
 const twoStatuses=getOrbitFilterResult(dataset.apartments,{...empty(),statuses:['under_negotiation','sold']});
 assert.equal(twoStatuses.matchingIds.length,8);
 assert.deepEqual(plain(twoStatuses.matchingIds),dataset.apartments.filter(item=>['under_negotiation','sold'].includes(item.status)).map(item=>item.id));
 const filters={statuses:['available','under_negotiation'],priceMin:200000000,priceMax:300000000};
 const combined=getOrbitFilterResult(dataset.apartments,filters);
 assert.equal(combined.active,true);
 assert.deepEqual(plain(combined.matchingIds),dataset.apartments.filter(item=>filters.statuses.includes(item.status)&&item.price!==null&&item.price>=200000000&&item.price<=300000000).map(item=>item.id));
 assert.ok(combined.matchingIds.length>0&&combined.matchingIds.length<available.matchingIds.length);
});

test('price boundaries are inclusive, unknown prices stay eligible only when price is unrestricted',()=>{
 const records=[
  {id:'LOW',status:'available',price:200000000,currency:'HUF'},
  {id:'HIGH',status:'available',price:300000000,currency:'HUF'},
  {id:'BELOW',status:'available',price:199999999,currency:'HUF'},
  {id:'ABOVE',status:'available',price:300000001,currency:'HUF'},
  {id:'NULL',status:'sold',price:null,currency:'HUF'},
  {id:'MISSING',status:'sold',currency:'HUF'},
  {id:'BAD',status:'sold',price:NaN,currency:'HUF'},
 ];
 assert.deepEqual(plain(getOrbitFilterResult(records,{...empty(),priceMin:200000000,priceMax:300000000}).matchingIds),['LOW','HIGH']);
 assert.deepEqual(plain(getOrbitFilterResult(records,{...empty(),statuses:['sold']}).matchingIds),['NULL','MISSING','BAD']);
 assert.deepEqual(plain(getOrbitFilterResult(records,{statuses:['sold'],priceMin:200000000,priceMax:null}).matchingIds),[]);
 const sold=getOrbitFilterResult(dataset.apartments,{...empty(),statuses:['sold']});
 assert.equal(sold.matchingIds.length,6);
 assert.equal(getOrbitFilterResult(dataset.apartments,{statuses:['sold'],priceMin:null,priceMax:400000000}).matchingIds.length,0);
});

test('full-span sliders normalize to reset instead of accidentally excluding unpriced homes',()=>{
 const bounds=getOrbitPriceBounds(dataset.apartments);
 const normalized=normalizeOrbitFilters({statuses:[],priceMin:bounds.min,priceMax:bounds.max},bounds);
 assert.deepEqual(plain(normalized),empty());
 const result=getOrbitFilterResult(dataset.apartments,normalized,bounds);
 assert.equal(result.active,false);assert.equal(result.matchingIds.length,69);
 assert.deepEqual(plain(normalizeOrbitFilters({statuses:['sold'],priceMin:-1,priceMax:Infinity},bounds)),{statuses:['sold'],priceMin:null,priceMax:null});
});

test('unknown statuses are unrestricted until a known status is selected',()=>{
 const records=[{id:'A',status:'available',price:200000000},{id:'R',status:'reserved',price:220000000},{id:'U',status:'unknown',price:null}];
 assert.deepEqual(plain(getOrbitFilterResult(records,empty()).matchingIds),['A','R','U']);
 assert.deepEqual(plain(getOrbitFilterResult(records,{...empty(),statuses:['available','sold']}).matchingIds),['A']);
 assert.deepEqual(plain(normalizeOrbitFilters({statuses:['unknown','sold','available','sold'],priceMin:null,priceMax:null})),{statuses:['available','sold'],priceMin:null,priceMax:null});
});

test('foreign currencies and invalid prices never enter a HUF price comparison or slider bounds',()=>{
 const records=[
  {id:'HUF',status:'available',price:200000001,currency:'HUF'},
  {id:'DEFAULT',status:'available',price:210000001},
  {id:'NULL_CURRENCY',status:'available',price:220000001,currency:null},
  {id:'LOWERCASE',status:'available',price:230000001,currency:' huf '},
  {id:'EUR',status:'available',price:100,currency:'EUR'},
  {id:'BLANK',status:'available',price:900000000,currency:''},
  {id:'NEGATIVE',status:'available',price:-1,currency:'HUF'},
  {id:'INFINITY',status:'available',price:Infinity,currency:'HUF'},
  {id:'STRING',status:'available',price:'240000000',currency:'HUF'},
 ];
 assert.deepEqual(plain(getOrbitPriceBounds(records)),{min:200000000,max:231000000,step:1000000,pricedCount:4,currency:'HUF'});
 assert.equal(getOrbitFilterResult(records,empty()).matchingIds.length,records.length);
 assert.deepEqual(plain(getOrbitFilterResult(records,{...empty(),priceMin:205000000}).matchingIds),['DEFAULT','NULL_CURRENCY','LOWERCASE']);
});

test('invalid, reversed and out-of-range input normalizes safely without mutating any inputs',()=>{
 const bounds=getOrbitPriceBounds(dataset.apartments);
 assert.deepEqual(plain(normalizeOrbitFilters({statuses:null,priceMin:'200000000',priceMax:NaN},bounds)),empty());
 assert.deepEqual(plain(normalizeOrbitFilters({statuses:['sold'],priceMin:400000000,priceMax:200000000},bounds)),{statuses:['sold'],priceMin:200000000,priceMax:400000000});
 assert.deepEqual(plain(normalizeOrbitFilters({statuses:[],priceMin:999000000,priceMax:null},bounds)),{statuses:[],priceMin:677000000,priceMax:null});
 assert.deepEqual(plain(normalizeOrbitFilters({statuses:[],priceMin:null,priceMax:-5},bounds)),{statuses:[],priceMin:null,priceMax:153000000});
 const snapshot=JSON.stringify(dataset.apartments);
 const input=Object.freeze({statuses:Object.freeze(['sold','available','sold']),priceMin:400000000,priceMax:200000000});
 Object.freeze(bounds);
 getOrbitFilterResult(dataset.apartments,input,bounds);
 assert.equal(JSON.stringify(dataset.apartments),snapshot);
 assert.deepEqual(input,{statuses:['sold','available','sold'],priceMin:400000000,priceMax:200000000});
});

test('no priced records disables price criteria while availability filtering remains useful',()=>{
 const records=[{id:'A',status:'available',price:null},{id:'S',status:'sold',price:null}];
 const bounds=getOrbitPriceBounds(records);
 assert.equal(bounds,null);
 const unrestricted=getOrbitFilterResult(records,{...empty(),priceMin:200000000,priceMax:300000000});
 assert.equal(unrestricted.active,false);assert.deepEqual(plain(unrestricted.matchingIds),['A','S']);
 const sold=getOrbitFilterResult(records,{statuses:['sold'],priceMin:200000000,priceMax:300000000});
 assert.equal(sold.active,true);assert.deepEqual(plain(sold.matchingIds),['S']);
 assert.deepEqual(plain(getOrbitFilterResult([],empty())),{active:false,matchingIds:[],filters:empty()});
});
