import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
import {ts} from '../scripts/tooling.mjs';

const dataset=JSON.parse(await readFile(new URL('../data/apartments.json',import.meta.url),'utf8'));
const source=await readFile(new URL('../src/core/orbit-apartment-filters.ts',import.meta.url),'utf8');
const script=ts.transpileModule(source+'\nglobalThis.filtersApi={getOrbitPriceBounds,getOrbitAreaBounds,normalizeOrbitFilters,getOrbitFilterResult};',{
 compilerOptions:{target:ts.ScriptTarget.ES2020,module:ts.ModuleKind.CommonJS},reportDiagnostics:true,
});
assert.equal((script.diagnostics||[]).filter(item=>item.category===ts.DiagnosticCategory.Error).length,0);
const context={exports:{}};vm.runInNewContext(script.outputText,context);
const {getOrbitPriceBounds,getOrbitAreaBounds,normalizeOrbitFilters,getOrbitFilterResult}=context.filtersApi;
const plain=value=>JSON.parse(JSON.stringify(value));
const empty=()=>({statuses:[],priceMin:null,priceMax:null});

test('real dataset bounds cover all 63 known HUF prices on an outward million-forint grid',()=>{
 assert.equal(dataset.apartments.length,69);
 assert.deepEqual(plain(getOrbitPriceBounds(dataset.apartments)),{min:153000000,max:677000000,step:1000000,pricedCount:63,currency:'HUF'});
 assert.equal(Math.min(...dataset.apartments.flatMap(item=>item.price===null?[]:[item.price])),153888000);
 assert.equal(Math.max(...dataset.apartments.flatMap(item=>item.price===null?[]:[item.price])),676200000);
});

test('interior area bounds use all 69 apartments on an outward one-square-metre grid',()=>{
 assert.deepEqual(plain(getOrbitAreaBounds(dataset.apartments)),{min:47,max:137,step:1,areaCount:69,unit:'m²'});
 const bounds=getOrbitAreaBounds(dataset.apartments);
 getOrbitFilterResult(dataset.apartments,{...empty(),statuses:['sold'],areaMin:80,areaMax:100});
 assert.deepEqual(plain(getOrbitAreaBounds(dataset.apartments)),plain(bounds),'Other filters never alter area-slider limits');
 assert.deepEqual(plain(getOrbitAreaBounds([{id:'ZERO',status:'available',price:null,areaInterior:0},{id:'A',status:'sold',price:null,areaInterior:68.67}])),{min:0,max:69,step:1,areaCount:2,unit:'m²'});
 assert.equal(getOrbitAreaBounds([{areaInterior:null},{areaInterior:-1},{areaInterior:Infinity},{areaInterior:'80'},{}]),null);
});

test('interior area is inclusive and ANDs with price plus the union of selected availability states',()=>{
 const records=[
  {id:'LOW',status:'available',price:200000000,areaInterior:60},
  {id:'HIGH',status:'under_negotiation',price:300000000,areaInterior:80},
  {id:'SOLD',status:'sold',price:250000000,areaInterior:70},
  {id:'SMALL',status:'available',price:250000000,areaInterior:59.99},
  {id:'LARGE',status:'available',price:250000000,areaInterior:80.01},
  {id:'CHEAP',status:'available',price:199999999,areaInterior:70},
  {id:'EXPENSIVE',status:'available',price:300000001,areaInterior:70},
  {id:'UNKNOWN',status:'available',price:null,areaInterior:null},
 ];
 const result=getOrbitFilterResult(records,{statuses:['available','under_negotiation'],priceMin:200000000,priceMax:300000000,areaMin:60,areaMax:80});
 assert.equal(result.active,true);assert.deepEqual(plain(result.matchingIds),['LOW','HIGH']);
 assert.equal(getOrbitFilterResult(records,empty()).matchingIds.length,records.length);
 assert.deepEqual(plain(getOrbitFilterResult(records,{...empty(),areaMin:60,areaMax:80}).matchingIds),['LOW','HIGH','SOLD','CHEAP','EXPENSIVE']);
 const real=getOrbitFilterResult(dataset.apartments,{statuses:['available'],priceMin:200000000,priceMax:300000000,areaMin:60,areaMax:80});
 assert.deepEqual(plain(real.matchingIds),dataset.apartments.filter(item=>item.status==='available'&&item.price>=200000000&&item.price<=300000000&&item.areaInterior>=60&&item.areaInterior<=80).map(item=>item.id));
 assert.ok(real.matchingIds.length>0);
});

test('full area span removes its restriction and retains old price-only filter shapes',()=>{
 const records=[{id:'A',status:'available',price:null,areaInterior:60.4},{id:'B',status:'sold',price:null,areaInterior:80.5},{id:'UNKNOWN',status:'sold',price:null}];
 const bounds=getOrbitAreaBounds(records),filters={...empty(),areaMin:bounds.min,areaMax:bounds.max};
 const result=getOrbitFilterResult(records,filters);
 assert.equal(result.active,false);assert.deepEqual(plain(result.matchingIds),['A','B','UNKNOWN']);
 assert.deepEqual(plain(result.filters),{...empty(),areaMin:null,areaMax:null});
 assert.deepEqual(plain(normalizeOrbitFilters(empty(),null,bounds)),empty(),'Legacy objects must not acquire new keys merely by loading');
 assert.deepEqual(plain(normalizeOrbitFilters({...empty(),areaMin:null},null,bounds)),{...empty(),areaMin:null,areaMax:null});
});

test('invalid area input clamps, reverses and resets without mutating filters or data',()=>{
 const areaBounds=Object.freeze(getOrbitAreaBounds(dataset.apartments)),priceBounds=getOrbitPriceBounds(dataset.apartments);
 assert.deepEqual(plain(normalizeOrbitFilters({...empty(),areaMin:100,areaMax:70},priceBounds,areaBounds)),{...empty(),areaMin:70,areaMax:100});
 assert.deepEqual(plain(normalizeOrbitFilters({...empty(),areaMin:999,areaMax:null},priceBounds,areaBounds)),{...empty(),areaMin:137,areaMax:null});
 assert.deepEqual(plain(normalizeOrbitFilters({...empty(),areaMin:'70',areaMax:NaN},priceBounds,areaBounds)),{...empty(),areaMin:null,areaMax:null});
 const input=Object.freeze({...empty(),statuses:Object.freeze(['sold']),areaMin:60,areaMax:90}),before=JSON.stringify(dataset.apartments);
 getOrbitFilterResult(dataset.apartments,input,priceBounds,areaBounds);
 assert.equal(JSON.stringify(dataset.apartments),before);assert.deepEqual(input,{...empty(),statuses:['sold'],areaMin:60,areaMax:90});
 const records=[{id:'A',status:'available',price:200000000},{id:'S',status:'sold',price:300000000}];
 const result=getOrbitFilterResult(records,{...empty(),statuses:['sold'],areaMin:60,areaMax:90});
 assert.equal(result.active,true);assert.deepEqual(plain(result.matchingIds),['S']);assert.equal(result.filters.areaMin,null);assert.equal(result.filters.areaMax,null);
 const unpriced=[{id:'A',status:'available',price:null,areaInterior:50},{id:'B',status:'available',price:null,areaInterior:80}];
 assert.deepEqual(plain(getOrbitFilterResult(unpriced,{...empty(),priceMin:200000000,areaMin:70}).matchingIds),['B'],'Absent price data must not short-circuit a valid area filter');
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

test('visible filter bars and price popovers protect orbit gestures even behind passive Framer overlays',async()=>{
 const orbitSource=await readFile(new URL('../src/core/orbit-player.ts',import.meta.url),'utf8');
 const listeners=new Map(),animations=new Map();let now=1000,nextAnimation=0;
 class Element{
  constructor(bounds={left:0,top:0,right:100,bottom:100,width:100,height:100}){this.bounds=bounds;this.parentElement=null;this.style={};this.dataset={};this.clientWidth=100;this.clientHeight=100;this.hidden=false;this.css={};}
  matches(){return false;} contains(node){for(let parent=node;parent;parent=parent.parentElement)if(parent===this)return true;return false;}
  getAttribute(name){return this[name]??null;} closest(){for(let element=this;element;element=element.parentElement)if(element.hidden||element.inert||element.ariaHidden)return element;return null;}
  getBoundingClientRect(){return this.bounds;} querySelectorAll(selector){return(this.controls??[]).filter(control=>!control.filter||selector.includes('[data-orbit-filters]'));}
  hasPointerCapture(){return false;} setPointerCapture(){} releasePointerCapture(){}
 }
 const root=new Element(),canvas=new Element(),overlay=new Element();root.controls=[];
 canvas.getContext=()=>({drawImage(){},clearRect(){},fillRect(){},save(){},restore(){},beginPath(){},rect(){},clip(){}});
 const document={hidden:false,addEventListener(){},removeEventListener(){}},window={devicePixelRatio:1,
  addEventListener(name,handler){if(!listeners.has(name))listeners.set(name,[]);listeners.get(name).push(handler);},removeEventListener(name,handler){listeners.set(name,(listeners.get(name)??[]).filter(value=>value!==handler));}};
 const world={exports:{},Element,document,window,AbortController,setTimeout,clearTimeout,console,
  performance:{now:()=>now},getComputedStyle:element=>({display:'block',visibility:'visible',opacity:'1',pointerEvents:'auto',overflowX:'visible',overflowY:'visible',...element.css}),
  requestAnimationFrame(handler){animations.set(++nextAnimation,handler);return nextAnimation;},cancelAnimationFrame(id){animations.delete(id);},
  fetch:async()=>({ok:true,blob:async()=>({size:1})}),createImageBitmap:async()=>({width:240,height:126,close(){}})};
 vm.runInNewContext(ts.transpileModule(orbitSource,{compilerOptions:{target:ts.ScriptTarget.ES2020,module:ts.ModuleKind.CommonJS}}).outputText,world);
 const player=world.exports.createOrbitPlayer({root,canvas,urls:Array.from({length:8},(_,index)=>'frame'+index),checkpointCount:8,decodeWidth:240,inspectionWidth:240,snapDuration:1.5});
 const emit=(name,extra={})=>{const event={target:overlay,defaultPrevented:false,cancelable:true,ctrlKey:false,metaKey:false,button:0,isPrimary:true,pointerId:1,pointerType:'mouse',clientX:20,clientY:20,deltaX:0,deltaY:80,deltaMode:0,preventDefault(){this.defaultPrevented=true;},...extra};for(const handler of listeners.get(name)??[])handler(event);return event;};
 const drag=()=>{emit('pointerdown');emit('pointermove',{clientX:55});emit('pointerup',{clientX:55});};
 try{
  await player.activate();assert.equal(player.snapshot().state,'checkpoint');
  const nativeButton=new Element();nativeButton.matches=()=>true;
  now+=250;const nativeWheel=emit('wheel',{target:nativeButton});assert.equal(nativeWheel.defaultPrevented,false);
  emit('pointerdown',{target:nativeButton});emit('pointermove',{target:nativeButton,clientX:55});emit('pointerup',{target:nativeButton,clientX:55});
  assert.equal(player.snapshot().state,'checkpoint','A genuine authored button keeps its native events and cannot start orbit rotation');
  const bar=new Element({left:0,top:10,right:100,bottom:35,width:100,height:25});bar.filter=true;bar.parentElement=root;root.controls=[bar];
  now+=250;const wheel=emit('wheel');assert.equal(wheel.defaultPrevented,false);assert.equal(player.snapshot().state,'checkpoint');drag();assert.equal(player.snapshot().state,'checkpoint');
  emit('touchstart',{touches:[{identifier:4,clientX:20,clientY:20}]});emit('touchmove',{touches:[{identifier:4,clientX:60,clientY:20}]});emit('touchend',{touches:[]});assert.equal(player.snapshot().state,'checkpoint');
  const popover=new Element({left:0,top:0,right:100,bottom:25,width:100,height:25});popover.filter=true;popover.parentElement=root;root.controls=[popover];
  now+=250;emit('wheel');drag();assert.equal(player.snapshot().state,'checkpoint','Popover outside its filter row still owns gestures');
  const ancestor=new Element();ancestor.css.opacity='0';ancestor.parentElement=root;popover.parentElement=ancestor;
  now+=250;emit('wheel');assert.notEqual(player.snapshot().state,'checkpoint','Invisible ancestors cannot leave stale filter hit rectangles');
  await player.activate();popover.parentElement=root;popover.hidden=true;now+=250;drag();assert.notEqual(player.snapshot().state,'checkpoint','Hidden/inert filter panels do not block orbit gestures');
  await player.activate();popover.hidden=false;popover.inert=true;now+=250;emit('wheel');assert.notEqual(player.snapshot().state,'checkpoint','Inert filters do not capture wheel input');
  await player.activate();popover.inert=false;popover.css.pointerEvents='none';now+=250;drag();assert.notEqual(player.snapshot().state,'checkpoint','Noninteractive filter wrappers do not create invisible blockers');
 }finally{player.destroy();}
});
