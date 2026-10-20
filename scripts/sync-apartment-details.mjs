// Public on-demand data for the same detail card used by the apartment list.
// Source mapping: apartment-list/apartments.json -> data/apartment-details.json.
// Usage: node scripts/sync-apartment-details.mjs --source <canonical-apartments.json>
// The canonical source is read only; source paths and reconciliation metadata are excluded.
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const assert = (condition, message) => { if (!condition) throw new Error(message); };
const plain = value => value !== null && typeof value === 'object' && !Array.isArray(value);
const hasNumber = value => typeof value === 'number' && Number.isFinite(value) && value >= 0;
const text = value => typeof value === 'string' && value.trim().length > 0;
const statuses = new Set(['available', 'under_negotiation', 'reserved', 'sold', 'unknown']);
const numericFields = ['floor', 'rooms', 'bedrooms', 'areaInterior', 'areaTerrace', 'areaGarden', 'price'];
const apartmentFields = ['id', 'name', 'building', 'floor', 'floorLabel', 'rooms', 'bedrooms', 'layoutLabel', 'orientation', 'areaInterior', 'areaTerrace', 'areaGarden', 'price', 'currency', 'priceIncludesVat', 'status', 'statusLabel', 'apartmentType', 'floorplan', 'note'];
const projectFields = ['id', 'name', 'city', 'locale', 'currency', 'areaUnit', 'availabilityAsOf', 'priceDefinition'];

function publicAsset(value, label) {
    assert(text(value), `Missing ${label} asset path.`);
    const path = value.trim();
    assert(!/^[a-z]:[\\/]|^\\\\|^(?:file|data|javascript|vbscript):/i.test(path), `Private or unsupported ${label} asset path.`);
    if (/^[a-z][a-z\d+.-]*:/i.test(path)) {
        let url;
        try { url = new URL(path); } catch { throw new Error(`Invalid ${label} asset URL.`); }
        assert((url.protocol === 'https:' || url.protocol === 'http:') && !url.username && !url.password, `Unsupported ${label} asset URL.`);
    }
    return path;
}
function imageProjection(value, label, illustrative = false) {
    assert(plain(value), `Missing ${label} image.`);
    const output = { full: publicAsset(value.full, label) };
    if (value.thumbnail !== undefined) output.thumbnail = publicAsset(value.thumbnail, `${label} thumbnail`);
    if (value.original !== undefined) output.original = publicAsset(value.original, `${label} original`);
    if (text(value.label)) output.label = value.label;
    if (illustrative) {
        assert(value.isIllustrative === true, `${label} must retain its illustration label.`);
        output.isIllustrative = true;
    }
    return output;
}

export function createApartmentDetailDataset(source) {
    assert(plain(source) && source.schemaVersion === '1.0' && Array.isArray(source.apartments), 'Unsupported canonical apartment JSON.');
    assert(source.apartments.length === 69, `Expected 69 confirmed apartments; found ${source.apartments.length}.`);
    const roomLayouts = {};
    for (const [type, layout] of Object.entries(source.roomLayouts || {})) {
        assert(/^[A-Za-z0-9_-]{1,64}$/.test(type) && !['__proto__', 'prototype', 'constructor'].includes(type), 'Invalid plan type.');
        const dimensions = layout?.imageDimensions, box = layout?.viewBox;
        assert(plain(dimensions) && ['width', 'height'].every(key => Number.isSafeInteger(dimensions[key]) && dimensions[key] > 0), `Invalid plan dimensions for ${type}.`);
        assert(plain(box) && ['x', 'y', 'width', 'height'].every(key => hasNumber(box[key])) && box.width > 0 && box.height > 0 && box.x + box.width <= 1.000001 && box.y + box.height <= 1.000001, `Invalid plan crop for ${type}.`);
        assert(Array.isArray(layout.markers) && layout.markers.length > 0 && layout.markers.length <= 100, `Missing plan markers for ${type}.`);
        const numbers = new Set();
        const markers = layout.markers.map(marker => {
            assert(plain(marker) && Number.isSafeInteger(marker.number) && marker.number >= 1 && marker.number <= 100 && !numbers.has(marker.number), `Invalid or repeated marker number for ${type}.`);
            assert(hasNumber(marker.x) && marker.x <= 1 && hasNumber(marker.y) && marker.y <= 1, `Invalid marker coordinates for ${type}.`);
            assert(text(marker.name) && ['interior', 'exterior'].includes(marker.kind), `Invalid marker name or kind for ${type}.`);
            numbers.add(marker.number);
            return { number: marker.number, name: marker.name, x: marker.x, y: marker.y, kind: marker.kind };
        });
        roomLayouts[type] = {
            imageDimensions: { width: dimensions.width, height: dimensions.height },
            viewBox: { x: box.x, y: box.y, width: box.width, height: box.height }, markers,
        };
    }
    assert(Object.keys(roomLayouts).length === 10, 'Expected the ten confirmed apartment-type plans.');
    const ids = new Set();
    const apartments = source.apartments.map(apartment => {
        assert(plain(apartment) && /^[ABC][0-3][0-9]{2}$/.test(apartment.id), 'Invalid apartment ID.');
        assert(!ids.has(apartment.id), `Repeated apartment ${apartment.id}.`); ids.add(apartment.id);
        assert(['A', 'B', 'C'].includes(apartment.building), `Invalid building for ${apartment.id}.`);
        assert(statuses.has(apartment.status), `Invalid status for ${apartment.id}.`);
        for (const key of numericFields) assert(apartment[key] === null || hasNumber(apartment[key]), `Invalid ${key} for ${apartment.id}.`);
        assert(apartment.floor === null || (Number.isSafeInteger(apartment.floor) && apartment.floor <= 3), `Invalid floor for ${apartment.id}.`);
        assert(apartment.price === null || Number.isSafeInteger(apartment.price), `Invalid gross price for ${apartment.id}.`);
        assert(apartment.currency === 'HUF', `Invalid currency for ${apartment.id}.`);
        assert(apartment.priceIncludesVat === null || typeof apartment.priceIncludesVat === 'boolean', `Invalid VAT field for ${apartment.id}.`);
        assert(roomLayouts[apartment.apartmentType], `Missing confirmed plan geometry for ${apartment.id}.`);
        const output = Object.fromEntries(apartmentFields.map(key => [key, apartment[key] ?? null]));
        if (output.floorplan !== null) output.floorplan = publicAsset(output.floorplan, `${apartment.id} floorplan`);
        assert(Array.isArray(apartment.roomList), `Missing room list for ${apartment.id}.`);
        const roomKeys = new Set(), linkedNumbers = new Set();
        output.roomList = apartment.roomList.map(room => {
            assert(plain(room) && text(room.id) && text(room.key) && !roomKeys.has(room.key), `Invalid or repeated room key for ${apartment.id}.`);
            assert(text(room.name) && hasNumber(room.area) && ['interior', 'exterior'].includes(room.kind), `Invalid room data for ${apartment.id}.`);
            roomKeys.add(room.key);
            const projected = { id: room.id, key: room.key, name: room.name, area: room.area, kind: room.kind };
            if (room.planNumber !== undefined) {
                const marker = roomLayouts[apartment.apartmentType].markers.find(marker => marker.number === room.planNumber);
                assert(Number.isSafeInteger(room.planNumber) && marker && marker.kind === room.kind && !linkedNumbers.has(room.planNumber), `Invalid verified room-to-plan link for ${apartment.id}.`);
                linkedNumbers.add(room.planNumber); projected.planNumber = room.planNumber;
            }
            return projected;
        });
        if (plain(apartment.media)) {
            output.media = {};
            if (apartment.media.floorplan) output.media.floorplan = imageProjection(apartment.media.floorplan, `${apartment.id} floorplan`, true);
            if (apartment.media.floorLayout) output.media.floorLayout = imageProjection(apartment.media.floorLayout, `${apartment.id} floor layout`);
            if (apartment.media.datasheet) {
                const sheet = apartment.media.datasheet;
                assert(plain(sheet), `Invalid datasheet for ${apartment.id}.`);
                output.media.datasheet = { url: publicAsset(sheet.url, `${apartment.id} datasheet`) };
                if (text(sheet.filename)) output.media.datasheet.filename = sheet.filename;
                if (text(sheet.label)) output.media.datasheet.label = sheet.label;
                if (sheet.page !== undefined) { assert(Number.isSafeInteger(sheet.page) && sheet.page > 0, `Invalid datasheet page for ${apartment.id}.`); output.media.datasheet.page = sheet.page; }
            }
        }
        return output;
    });
    const output = {
        schemaVersion: source.schemaVersion,
        project: Object.fromEntries(projectFields.filter(key => source.project?.[key] !== undefined).map(key => [key, source.project[key]])),
        apartments, roomLayouts,
    };
    assert(!/"(?:sources|source|provenance|validation|dataIssues|originalFileName|sourceApartmentCode|sourceAsOf|roomLayoutSources)"\s*:/.test(JSON.stringify(output)), 'Internal source metadata leaked into the apartment detail data.');
    return output;
}

async function run() {
    const args = process.argv.slice(2), sourceFlag = args.indexOf('--source');
    assert(sourceFlag >= 0 && args[sourceFlag + 1] && args.length === 2, 'Usage: node scripts/sync-apartment-details.mjs --source <canonical-apartments.json>');
    const sourcePath = resolve(args[sourceFlag + 1]), destination = new URL('../data/apartment-details.json', import.meta.url);
    assert(sourcePath !== fileURLToPath(destination), 'Choose the canonical source JSON, not the public detail projection.');
    const source = JSON.parse(await readFile(sourcePath, 'utf8'));
    const output = createApartmentDetailDataset(source), serialized = JSON.stringify(output) + '\n';
    await mkdir(new URL('../data/', import.meta.url), { recursive: true });
    await writeFile(destination, serialized, 'utf8');
    const rooms = output.apartments.reduce((sum, apartment) => sum + apartment.roomList.length, 0);
    const markers = Object.values(output.roomLayouts).reduce((sum, layout) => sum + layout.markers.length, 0);
    console.log(`Synced ${output.apartments.length} apartments, ${rooms} rooms and ${markers} plan markers to data/apartment-details.json (${Buffer.byteLength(serialized)} bytes). Source JSON was not changed.`);
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await run();
