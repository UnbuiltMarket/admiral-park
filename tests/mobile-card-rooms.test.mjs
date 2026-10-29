import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
import {ts} from '../scripts/tooling.mjs';

const data=JSON.parse(await readFile(new URL('../data/apartment-details.json',import.meta.url),'utf8'));
const source=await readFile(new URL('../src/shared/apartment-card/card-runtime.js',import.meta.url),'utf8');
const tree=ts.createSourceFile('card.js',source,ts.ScriptTarget.Latest,true,ts.ScriptKind.JS);
const mount=tree.statements.find(node=>ts.isFunctionDeclaration(node)&&node.name?.text==='mountOrbitApartmentCardRuntime');
const functions=new Map(mount.body.statements.filter(ts.isFunctionDeclaration).map(node=>[node.name.text,node.getText(tree)]));
const context={data,hasNumber:value=>typeof value==='number'&&Number.isFinite(value)};
vm.runInNewContext(functions.get('validPlanMarkers')+'\n'+functions.get('numberedUnitRooms')+'\nthis.join=numberedUnitRooms;',context);

test('mobile room numbers preserve every actual apartment room and area',()=>{
  const before=JSON.stringify(data);
  let count=0;
  for(const apartment of data.apartments){
    const rows=context.join(apartment),markers=data.roomLayouts[apartment.apartmentType].markers;
    assert.equal(rows.length,apartment.roomList.length,apartment.id);
    assert.equal(new Set(rows.map(row=>row.planNumber)).size,rows.length,apartment.id+' unique numbering');
    rows.forEach((row,index)=>{
      assert.equal(row.room,apartment.roomList[index],apartment.id+' source room retained');
      assert.ok(markers.some(marker=>marker.number===row.planNumber&&marker.kind===row.room.kind),apartment.id+' valid plan number');
      if(row.room.planNumber!==undefined)assert.equal(row.planNumber,row.room.planNumber);
    });
    count+=rows.length;
  }
  assert.equal(count,806);
  assert.equal(JSON.stringify(data),before,'Display joins never rewrite measurements or verified source data');
});

test('owner-confirmed C303 and C101 links stay fixed and equal bedrooms stay consistent',()=>{
  const rows=id=>context.join(data.apartments.find(apartment=>apartment.id===id));
  const c303=rows('C303');
  assert.equal(c303.find(row=>row.room.key==='rooms:1184').planNumber,6);
  assert.equal(c303.find(row=>row.room.key==='rooms:1186').planNumber,9);
  assert.deepEqual(Array.from(c303.filter(row=>row.room.name==='Hálószoba'&&row.room.area===10.01),row=>row.planNumber).sort((a,b)=>a-b),[11,17]);
  const c101=rows('C101');
  assert.equal(c101.find(row=>row.room.key==='rooms:944').planNumber,5);
  assert.equal(c101.find(row=>row.room.key==='rooms:946').planNumber,10);
  assert.deepEqual(Array.from(rows('C303'),row=>row.planNumber),Array.from(c303,row=>row.planNumber));
});
