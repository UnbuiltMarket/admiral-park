import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
import {ts} from '../scripts/tooling.mjs';

const source=await readFile(new URL('../src/shared/apartment-list/app.js',import.meta.url),'utf8');
const parsed=ts.createSourceFile('list.js',source,ts.ScriptTarget.ES2020,true,ts.ScriptKind.JS);
const functions=new Map(),variables=new Map();
function visit(node) {
  if(ts.isFunctionDeclaration(node)&&node.name)functions.set(node.name.text,node.getText(parsed));
  if(ts.isVariableDeclaration(node)&&ts.isIdentifier(node.name))variables.set(node.name.text,node.getText(parsed));
  ts.forEachChild(node,visit);
}
visit(parsed);

function runtime() {
  const controls={sort:{options:[{value:'id'},{value:'price-asc'}]},'filter-chips':{innerHTML:''}};
  const context=vm.createContext({URL,Intl,location:{href:'https://example.test/lista'},history:{replaceState(_state,_title,url){context.location.href=String(url);}},control:id=>controls[id]||{tagName:'INPUT'}});
  const definitions=['filterIds','checks','numericFilters','defaults','esc','hasNumber'].map(name=>`const ${variables.get(name)};`).join('\n');
  const selected=['normalizeApartmentSearch','matches','readUrl','writeUrl','renderChips','reset'].map(name=>functions.get(name)).join('\n');
  vm.runInContext(`${definitions}\nconst useUrl=true,$=control,number=new Intl.NumberFormat('hu-HU');let state={...defaults,sort:'id'},favorites=new Set();const syncControls=()=>{},render=()=>writeUrl();${selected}\nglobalThis.api={setState:values=>{state={...defaults,sort:'id',...values}},getState:()=>({...state}),setFavorites:ids=>{favorites=new Set(ids)},matches,readUrl,writeUrl,renderChips,reset};`,context);
  return {api:context.api,context,controls};
}

const apartment={id:'A001',apartmentType:'C',building:'A',floor:0,rooms:2,status:'available',areaInterior:50,areaTerrace:12,areaGarden:0,price:90000000};

test('apartment-number search accepts partial IDs and common typed separators, independently of apartment type',()=>{
  const {api}=runtime();
  for(const query of ['A001','a001',' a-001 ','A.001','A 001','Ａ００１','001','A00']) {
    api.setState({search:query});assert.equal(api.matches(apartment),true,query);
  }
  for(const query of ['A002','B001','C','<img>']) {
    api.setState({search:query});assert.equal(api.matches(apartment),false,query);
  }
  api.setState({search:''});assert.equal(api.matches(apartment),true);
});

test('apartment search combines with existing availability, area, garden and favourite filters',()=>{
  const {api}=runtime();
  api.setState({search:'a001',building:'B'});assert.equal(api.matches(apartment),false);
  api.setState({search:'a001',status:'sold'});assert.equal(api.matches(apartment),false);
  api.setState({search:'a001',minArea:'51'});assert.equal(api.matches(apartment),false);
  api.setState({search:'a001',garden:true});assert.equal(api.matches(apartment),false);
  api.setState({search:'a001',favoritesOnly:true});assert.equal(api.matches(apartment),false);
  api.setFavorites(['A001']);assert.equal(api.matches(apartment),true);
  api.setState({search:'a001',building:'A',status:'available',maxArea:'50',terrace:true});assert.equal(api.matches(apartment),true);
});

test('search survives URL reload, appears in a removable escaped chip, and clears with reset',()=>{
  const {api,context,controls}=runtime();
  api.setState({search:'a-001',building:'A'});api.writeUrl();
  assert.equal(new URL(context.location.href).searchParams.get('search'),'a-001');
  api.setState({});api.readUrl();assert.equal(api.getState().search,'a-001');assert.equal(api.getState().building,'A');
  api.renderChips();assert.match(controls['filter-chips'].innerHTML,/data-remove-filter="search"/);assert.match(controls['filter-chips'].innerHTML,/Keresés: a-001/);
  api.setState({search:'<A001>'});api.renderChips();assert.match(controls['filter-chips'].innerHTML,/&lt;A001&gt;/);assert.doesNotMatch(controls['filter-chips'].innerHTML,/<A001>/);
  api.reset();assert.equal(api.getState().search,'');assert.equal(new URL(context.location.href).searchParams.has('search'),false);
});
