import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createApartmentDetailDataset } from '../scripts/sync-apartment-details.mjs';

const detail = JSON.parse(await readFile(new URL('../data/apartment-details.json', import.meta.url), 'utf8'));
const orbit = JSON.parse(await readFile(new URL('../data/apartments.json', import.meta.url), 'utf8'));

test('expanded apartment details preserve all collapsed orbit facts without publishing internal metadata', () => {
    assert.equal(detail.apartments.length, 69);
    assert.equal(Object.keys(detail.roomLayouts).length, 10);
    assert.equal(detail.apartments.reduce((sum, record) => sum + record.roomList.length, 0), 806);
    assert.equal(Object.values(detail.roomLayouts).reduce((sum, layout) => sum + layout.markers.length, 0), 137);
    for (const apartment of detail.apartments) {
        const collapsed = orbit.apartments.find(record => record.id === apartment.id);
        assert.ok(collapsed, `Matching collapsed apartment ${apartment.id}`);
        for (const field of ['id', 'name', 'building', 'floor', 'floorLabel', 'rooms', 'bedrooms', 'layoutLabel', 'orientation', 'areaInterior', 'areaTerrace', 'areaGarden', 'price', 'currency', 'priceIncludesVat', 'status', 'statusLabel', 'apartmentType', 'floorplan', 'note']) assert.deepEqual(apartment[field], collapsed[field], `${apartment.id} ${field}`);
        assert.match(apartment.media.floorplan.original, /^assets\/floorplans\/types\/[^/]+\/original\.png$/);
        for (const room of apartment.roomList) assert.ok(Object.keys(room).every(key => ['id', 'key', 'name', 'area', 'kind', 'planNumber'].includes(key)));
        assert.deepEqual(detail.roomLayouts[apartment.apartmentType].viewBox, orbit.roomLayouts[apartment.apartmentType].viewBox);
    }
    assert.doesNotMatch(JSON.stringify(detail), /"(?:sources|source|provenance|validation|dataIssues|originalFileName|sourceApartmentCode|sourceAsOf|roomLayoutSources)"\s*:/);
    assert.doesNotMatch(JSON.stringify(detail), /[A-Za-z]:\\|file:\/\//);
});

test('detail projection keeps authentic room marker joins and repeated source room IDs without inventing links', () => {
    const regenerated = createApartmentDetailDataset(structuredClone(detail));
    assert.deepEqual(regenerated, detail);
    const linked = detail.apartments.filter(apartment => apartment.roomList.some(room => room.planNumber !== undefined));
    assert.equal(linked.length, 10);
    const unmapped = detail.apartments.filter(apartment => !apartment.roomList.some(room => room.planNumber !== undefined));
    assert.equal(unmapped.length, 59);
    assert.equal(new Set(detail.apartments.map(record => record.id)).size, 69);
    for (const apartment of linked) {
        const markers = detail.roomLayouts[apartment.apartmentType].markers;
        for (const room of apartment.roomList) if (room.planNumber !== undefined) assert.ok(markers.some(marker => marker.number === room.planNumber && marker.kind === room.kind));
    }
    const repeatedIds = detail.apartments.flatMap(apartment => apartment.roomList.filter((room, index, list) => list.findIndex(other => other.id === room.id) !== index));
    assert.equal(repeatedIds.length, 1);
    assert.notEqual(repeatedIds[0].key, '');
});

test('detail projection rejects malformed apartments, room areas, markers and private media paths', () => {
    const mutate = change => { const source = structuredClone(detail); change(source); return source; };
    assert.throws(() => createApartmentDetailDataset(mutate(source => source.apartments[1].id = source.apartments[0].id)), /Repeated apartment/);
    assert.throws(() => createApartmentDetailDataset(mutate(source => source.apartments[0].roomList[0].area = -1)), /Invalid room data/);
    assert.throws(() => createApartmentDetailDataset(mutate(source => source.apartments[0].roomList[1].key = source.apartments[0].roomList[0].key)), /room key/);
    assert.throws(() => createApartmentDetailDataset(mutate(source => source.roomLayouts.B.markers[0].x = 1.1)), /marker coordinates/);
    assert.throws(() => createApartmentDetailDataset(mutate(source => source.roomLayouts.B.markers[1].number = source.roomLayouts.B.markers[0].number)), /marker number/);
    assert.throws(() => createApartmentDetailDataset(mutate(source => source.apartments[0].roomList[0].planNumber = 100)), /room-to-plan link/);
    assert.throws(() => createApartmentDetailDataset(mutate(source => source.apartments[0].media.floorplan.original = 'C:\\private\\plan.png')), /Private or unsupported/);
    assert.throws(() => createApartmentDetailDataset(mutate(source => source.apartments[0].media.floorplan.original = 'file:///private/plan.png')), /Private or unsupported/);
    const extra = mutate(source => { source.sources = [{ file: 'private.xlsx' }]; source.apartments[0].provenance = { source: 'private' }; source.apartments[0].roomList[0].source = { range: 'D5' }; });
    assert.deepEqual(createApartmentDetailDataset(extra), detail, 'Source metadata is excluded by explicit field allowlists.');
});
