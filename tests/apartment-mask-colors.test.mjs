import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { readFile, writeFile, mkdir, mkdtemp, cp, rm, stat } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { apartmentMaskPalette, getApartmentMaskColor, maskRgb, validateApartmentMaskPalette } from '../scripts/apartment-mask-colors.mjs';
import { createApartmentDetailDataset } from '../scripts/sync-apartment-details.mjs';

const root = new URL('../', import.meta.url);
const load = async path => JSON.parse(await readFile(new URL(path, root), 'utf8'));
const [orbit, detail] = await Promise.all([load('data/apartments.json'), load('data/apartment-details.json')]);
const sorted = records => [...records].sort((a, b) => a.id.localeCompare(b.id, 'en'));
const withoutColors = records => sorted(records).map(({ maskColor, ...record }) => record);
const exec = promisify(execFile);
const distance = (a, b) => Math.sqrt(a.reduce((sum, value, i) => sum + (value - b[i]) ** 2, 0));

test('all 69 canonical apartments have stable, distinct, separated mask colours in both public datasets', () => {
    const entries = apartmentMaskPalette.apartments;
    assert.equal(entries.length, 69);
    assert.equal(apartmentMaskPalette.encoding, 'RGB8');
    assert.equal(apartmentMaskPalette.colorSpace, 'sRGB');
    assert.equal(apartmentMaskPalette.backgroundColor, '#000000');
    assert.deepEqual(apartmentMaskPalette.boxDimensionsCm, { height: 315, length: 500, width: 1000 });
    assert.deepEqual(entries, sorted(entries), 'The persisted reference has a predictable apartment-ID order.');
    assert.deepEqual(entries.map(entry => entry.id), sorted(orbit.apartments).map(entry => entry.id));
    validateApartmentMaskPalette(apartmentMaskPalette, orbit.apartments.map(entry => entry.id));
    validateApartmentMaskPalette(apartmentMaskPalette, detail.apartments.map(entry => entry.id));
    const colours = entries.map(entry => {
        assert.match(entry.maskColor, /^#[0-9A-F]{6}$/);
        assert.ok(!['#000000', '#FFFFFF'].includes(entry.maskColor));
        return maskRgb(entry.maskColor);
    });
    assert.equal(new Set(entries.map(entry => entry.maskColor)).size, 69);
    for (let i = 0; i < colours.length; i++) {
        for (let j = 0; j < i; j++) assert.ok(distance(colours[i], colours[j]) >= 48, `${entries[i].id} and ${entries[j].id} are too close.`);
        assert.ok(distance(colours[i], [0, 0, 0]) > 48);
        assert.ok(distance(colours[i], [255, 255, 255]) > 48);
    }
    for (const dataset of [orbit, detail]) {
        for (const record of dataset.apartments) assert.equal(record.maskColor, getApartmentMaskColor(record.id), record.id);
    }
    assert.equal(getApartmentMaskColor('A001'), '#2080E0');
    assert.equal(getApartmentMaskColor('C304'), '#50B080');
});

test('palette validation rejects ambiguous, missing and malformed assignments instead of silently recolouring apartments', () => {
    const invalid = mutate => { const value = structuredClone(apartmentMaskPalette); mutate(value); return value; };
    assert.throws(() => validateApartmentMaskPalette(invalid(value => value.apartments[1].id = value.apartments[0].id)));
    assert.throws(() => validateApartmentMaskPalette(invalid(value => value.apartments[1].maskColor = value.apartments[0].maskColor)));
    assert.throws(() => validateApartmentMaskPalette(invalid(value => value.apartments[0].maskColor = '#000000')));
    assert.throws(() => validateApartmentMaskPalette(invalid(value => value.apartments[0].maskColor = '#FFFFFF')));
    assert.throws(() => validateApartmentMaskPalette(invalid(value => value.apartments[0].maskColor = '#2080e0')));
    assert.throws(() => validateApartmentMaskPalette(invalid(value => value.apartments[1].maskColor = '#2080DF')));
    assert.throws(() => validateApartmentMaskPalette(invalid(value => value.apartments.pop())));
    assert.throws(() => validateApartmentMaskPalette(apartmentMaskPalette, orbit.apartments.slice(1).map(entry => entry.id)));
    assert.throws(() => getApartmentMaskColor('A999'), /No persisted mask colour/);
    const reversed = structuredClone(apartmentMaskPalette);
    reversed.apartments.reverse();
    const byId = validateApartmentMaskPalette(reversed, orbit.apartments.map(entry => entry.id).reverse());
    for (const entry of apartmentMaskPalette.apartments) assert.equal(byId.get(entry.id), entry.maskColor);
});

test('the self-contained MAXScript embeds the same IDs, RGB bytes and hex colours as the ledger', async () => {
    const script = await readFile(new URL('tools/3dsmax/AdmiralApartmentMaskBoxes.ms', root), 'utf8');
    const rows = [...script.matchAll(/#\("([ABC][0-3][0-9]{2})",\s*(\d+),\s*(\d+),\s*(\d+),\s*"(#[0-9A-F]{6})",\s*"([ABC])"\)/g)];
    assert.equal(rows.length, 69, 'The standalone script has one explicit row per apartment.');
    assert.equal(new Set(rows.map(row => row[1])).size, 69);
    for (const [, id, r, g, b, hex, building] of rows) {
        assert.equal(hex, getApartmentMaskColor(id), id);
        assert.deepEqual([r, g, b].map(Number), maskRgb(hex), id);
        assert.equal(building, id[0]);
    }
    assert.doesNotMatch(script, /__APARTMENT_MASK_ROWS__/);
    assert.doesNotMatch(script, /[^\x09\x0A\x0D\x20-\x7E]/, 'The standalone MAXScript stays ASCII for reliable loading.');
    assert.match(script, /\.wirecolor\s*=/i);
    assert.match(script, /\.colorByLayer\s*=\s*false/i);
    assert.doesNotMatch(script, /\b(?:renderers\.current|units\.(?:systemtype|systemscale|displaytype))\s*=/i, 'Creating the boxes does not replace the renderer or change scene units.');
});

test('the CSV reference maps every named box to its apartment and requested centimetre dimensions', async () => {
    const csv = await readFile(new URL('tools/3dsmax/apartment-mask-colors.csv', root), 'utf8');
    const [header, ...lines] = csv.trim().split(/\r?\n/);
    assert.equal(header, 'apartmentId,maskColor,red,green,blue,objectName,layer,heightCm,lengthCm,widthCm');
    assert.equal(lines.length, 69);
    for (const line of lines) {
        const [id, hex, red, green, blue, objectName, layer, height, length, width] = line.split(',');
        assert.equal(hex, getApartmentMaskColor(id));
        assert.deepEqual([red, green, blue].map(Number), maskRgb(hex));
        assert.equal(objectName, `AP_MASK_${id}`);
        assert.equal(layer, `AP_MASKS_${id[0]}`);
        assert.deepEqual([height, length, width].map(Number), [315, 500, 1000]);
    }
});

test('checking generated artifacts is read-only and does not regenerate the authoritative palette', async () => {
    const paths = ['data/apartment-mask-colors.json', 'tools/3dsmax/AdmiralApartmentMaskBoxes.ms', 'tools/3dsmax/apartment-mask-colors.csv'];
    const snapshot = async () => Promise.all(paths.map(async path => {
        const url = new URL(path, root);
        return { path, hash: createHash('sha256').update(await readFile(url)).digest('hex'), modified: (await stat(url)).mtimeMs };
    }));
    const before = await snapshot();
    const { stdout } = await exec(process.execPath, [fileURLToPath(new URL('scripts/build-apartment-mask-boxes.mjs', root)), '--check'], { cwd: fileURLToPath(root) });
    assert.match(stdout, /Verified 69 apartment mask boxes/);
    assert.deepEqual(await snapshot(), before);
});

test('refreshing detail data joins colours by apartment ID and preserves every other public field', () => {
    const source = structuredClone(detail);
    source.apartments.reverse();
    for (const record of source.apartments) record.maskColor = '#FFFFFF';
    const regenerated = createApartmentDetailDataset(source);
    assert.deepEqual(withoutColors(regenerated.apartments), withoutColors(detail.apartments));
    assert.deepEqual(regenerated.roomLayouts, detail.roomLayouts);
    assert.deepEqual(regenerated.project, detail.project);
    for (const record of regenerated.apartments) assert.equal(record.maskColor, getApartmentMaskColor(record.id));
});

test('refreshing orbit data preserves the ID mapping even when the canonical apartment order changes', async () => {
    const fixture = await mkdtemp(join(tmpdir(), 'admiral-mask-data-'));
    try {
        await Promise.all([mkdir(join(fixture, 'scripts')), mkdir(join(fixture, 'data'))]);
        await Promise.all([
            cp(new URL('scripts/sync-orbit-apartments.mjs', root), join(fixture, 'scripts/sync-orbit-apartments.mjs')),
            cp(new URL('scripts/apartment-mask-colors.mjs', root), join(fixture, 'scripts/apartment-mask-colors.mjs')),
            cp(new URL('data/apartment-mask-colors.json', root), join(fixture, 'data/apartment-mask-colors.json')),
        ]);
        const source = structuredClone(orbit);
        source.apartments.reverse();
        for (const record of source.apartments) record.maskColor = '#FFFFFF';
        const inputPath = join(fixture, 'canonical.json');
        const input = JSON.stringify(source);
        await writeFile(inputPath, input, 'utf8');
        await exec(process.execPath, [join(fixture, 'scripts/sync-orbit-apartments.mjs'), '--source', inputPath], { cwd: fixture });
        const regenerated = JSON.parse(await readFile(join(fixture, 'data/apartments.json'), 'utf8'));
        assert.deepEqual(withoutColors(regenerated.apartments), withoutColors(orbit.apartments));
        assert.deepEqual(regenerated.roomLayouts, orbit.roomLayouts);
        assert.deepEqual(regenerated.project, orbit.project);
        for (const record of regenerated.apartments) assert.equal(record.maskColor, getApartmentMaskColor(record.id));
        assert.equal(await readFile(inputPath, 'utf8'), input, 'The canonical source is never overwritten.');
    } finally {
        assert.equal(dirname(resolve(fixture)), resolve(tmpdir()), 'Clean up only the dedicated temporary test directory.');
        assert.match(basename(fixture), /^admiral-mask-data-/);
        await rm(fixture, { recursive: true, force: true });
    }
});
