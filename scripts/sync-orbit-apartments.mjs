// Build the public orbit data from the canonical apartment-list JSON.
// Usage: node scripts/sync-orbit-apartments.mjs --source <canonical-apartments.json>
// The source belongs to the apartment-list project; this script never changes it.
// Source mapping: apartment-list/apartments.json -> data/apartments.json.
// --source locates the canonical file without publishing a private filesystem path.
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { getApartmentMaskColor } from './apartment-mask-colors.mjs';

const args = process.argv.slice(2);
const sourceFlag = args.indexOf('--source');
if (sourceFlag < 0 || !args[sourceFlag + 1] || args.length !== 2) {
    throw new Error('Usage: node scripts/sync-orbit-apartments.mjs --source <canonical-apartments.json>');
}
const sourcePath = resolve(args[sourceFlag + 1]);
const destination = new URL('../data/apartments.json', import.meta.url);
if (sourcePath === fileURLToPath(destination)) throw new Error('Choose the canonical source JSON, not the public orbit projection.');
const source = JSON.parse(await readFile(sourcePath, 'utf8'));
const assert = (condition, message) => { if (!condition) throw new Error(message); };
assert(source && typeof source === 'object' && Array.isArray(source.apartments), 'Canonical JSON must contain apartments.');
assert(source.apartments.length === 69, `Expected 69 confirmed apartments; found ${source.apartments.length}.`);
assert(source.schemaVersion === '1.0', 'Unsupported canonical apartment schema.');
const ids = new Set();
const knownStatuses = new Set(['available', 'under_negotiation', 'reserved', 'sold', 'unknown']);
const numericFields = ['floor', 'rooms', 'bedrooms', 'areaInterior', 'areaTerrace', 'areaGarden', 'price'];
const fields = ['id', 'name', 'building', 'floor', 'floorLabel', 'rooms', 'bedrooms', 'layoutLabel', 'orientation', 'areaInterior', 'areaTerrace', 'areaGarden', 'price', 'currency', 'priceIncludesVat', 'status', 'statusLabel', 'apartmentType', 'floorplan', 'note'];
const plain = value => value && typeof value === 'object' && !Array.isArray(value);
const mediaImage = (value, illustrative = false) => {
    assert(plain(value) && typeof value.full === 'string' && value.full.length > 0, 'Apartment media requires a full image path.');
    const projected = Object.fromEntries(['thumbnail', 'full', 'label'].filter(key => typeof value[key] === 'string').map(key => [key, value[key]]));
    if (illustrative) projected.isIllustrative = value.isIllustrative === true;
    return projected;
};
const apartments = source.apartments.map(apartment => {
    assert(plain(apartment) && /^[ABC][0-3][0-9]{2}$/.test(apartment.id), 'Invalid apartment ID.');
    assert(!ids.has(apartment.id), `Repeated apartment ${apartment.id}.`); ids.add(apartment.id);
    assert(['A', 'B', 'C'].includes(apartment.building), `Invalid building for ${apartment.id}.`);
    assert(knownStatuses.has(apartment.status), `Invalid status for ${apartment.id}.`);
    for (const key of numericFields) assert(apartment[key] === null || (typeof apartment[key] === 'number' && Number.isFinite(apartment[key]) && apartment[key] >= 0), `Invalid ${key} for ${apartment.id}.`);
    assert(apartment.floor === null || (Number.isSafeInteger(apartment.floor) && apartment.floor <= 3), `Invalid floor for ${apartment.id}.`);
    assert(apartment.price === null || Number.isSafeInteger(apartment.price), `Invalid gross price for ${apartment.id}.`);
    assert(apartment.currency === 'HUF', `Invalid currency for ${apartment.id}.`);
    assert(apartment.priceIncludesVat === null || typeof apartment.priceIncludesVat === 'boolean', `Invalid VAT field for ${apartment.id}.`);
    const record = Object.fromEntries(fields.map(key => [key, apartment[key] ?? null]));
    record.maskColor = getApartmentMaskColor(apartment.id);
    if (plain(apartment.media)) {
        record.media = {};
        if (apartment.media.floorplan) record.media.floorplan = mediaImage(apartment.media.floorplan, true);
        if (apartment.media.floorLayout) record.media.floorLayout = mediaImage(apartment.media.floorLayout);
        if (apartment.media.datasheet) {
            const sheet = apartment.media.datasheet;
            assert(plain(sheet) && typeof sheet.url === 'string', `Invalid datasheet for ${apartment.id}.`);
            record.media.datasheet = Object.fromEntries(['url', 'filename', 'label', 'page'].filter(key => sheet[key] !== undefined).map(key => [key, sheet[key]]));
        }
    }
    return record;
});
const roomLayouts = {};
for (const [key, layout] of Object.entries(source.roomLayouts || {})) {
    assert(/^[A-Za-z0-9_-]{1,64}$/.test(key) && !['__proto__', 'prototype', 'constructor'].includes(key), 'Invalid plan type.');
    const dimensions = layout?.imageDimensions, box = layout?.viewBox;
    assert(plain(dimensions) && ['width', 'height'].every(key => typeof dimensions[key] === 'number' && Number.isFinite(dimensions[key]) && dimensions[key] > 0), `Invalid plan dimensions for ${key}.`);
    assert(plain(box) && ['x', 'y', 'width', 'height'].every(key => typeof box[key] === 'number' && Number.isFinite(box[key]) && box[key] >= 0) && box.width > 0 && box.height > 0 && box.x + box.width <= 1.000001 && box.y + box.height <= 1.000001, `Invalid plan crop for ${key}.`);
    roomLayouts[key] = { imageDimensions: { width: dimensions.width, height: dimensions.height }, viewBox: { x: box.x, y: box.y, width: box.width, height: box.height } };
}
assert(Object.keys(roomLayouts).length === 10, 'Expected the ten confirmed apartment-type plans.');
for (const apartment of apartments) assert(roomLayouts[apartment.apartmentType], `Missing confirmed plan geometry for ${apartment.id}.`);
const projectFields = ['id', 'name', 'city', 'locale', 'currency', 'areaUnit', 'availabilityAsOf', 'priceDefinition'];
const output = { schemaVersion: source.schemaVersion, project: Object.fromEntries(projectFields.filter(key => source.project?.[key] !== undefined).map(key => [key, source.project[key]])), apartments, roomLayouts };
const serialized = JSON.stringify(output) + '\n';
assert(!/"(?:sources|provenance|validation|dataIssues|roomList|markers|originalFileName)"\s*:/.test(serialized), 'Private source or unused room metadata leaked into the orbit data.');
await mkdir(new URL('../data/', import.meta.url), { recursive: true });
await writeFile(destination, serialized, 'utf8');
const statuses = Object.fromEntries([...knownStatuses].map(status => [status, apartments.filter(apartment => apartment.status === status).length]));
console.log(`Synced ${apartments.length} apartments and ${Object.keys(roomLayouts).length} type plans to data/apartments.json (${Buffer.byteLength(serialized)} bytes).`);
console.log(`Status totals: ${JSON.stringify(statuses)}. Source JSON was not changed.`);
