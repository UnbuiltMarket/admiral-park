import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, writeFile, mkdir, mkdtemp, copyFile, rm, stat } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { basename, dirname, join, resolve, sep } from 'node:path';
import { pathToFileURL } from 'node:url';
import { createHash } from 'node:crypto';
import { deflateSync } from 'node:zlib';
import { decodeOrbitMaskPng, validateOrbitMaskAssets } from '../scripts/orbit-mask-assets.mjs';

const root = new URL('../', import.meta.url);
const manifest = JSON.parse(await readFile(new URL('data/orbit-mask-views.json', root), 'utf8'));
const failMessage = /Orbit mask assets:/;

async function withFixture(run) {
 const directory = await mkdtemp(join(tmpdir(), 'admiral-orbit-mask-assets-'));
 const fixture = pathToFileURL(directory + sep);
 try {
  await mkdir(new URL('data/', fixture)); await mkdir(new URL(manifest.folder, fixture), { recursive: true });
  for (const name of ['apartment-mask-colors.json', 'orbit-mask-views.json']) await copyFile(new URL('data/' + name, root), new URL('data/' + name, fixture));
  for (const view of manifest.views) await copyFile(new URL(manifest.folder + view.filename, root), new URL(manifest.folder + view.filename, fixture));
  await run(fixture);
 } finally {
  assert.equal(dirname(resolve(directory)), resolve(tmpdir()));
  assert.match(basename(directory), /^admiral-orbit-mask-assets-/);
  await rm(directory, { recursive: true, force: true });
 }
}

const crc32 = bytes => {
 let crc = 0xFFFFFFFF;
 for (const byte of bytes) {
  crc ^= byte;
  for (let bit = 0; bit < 8; bit++) crc = crc & 1 ? (crc >>> 1) ^ 0xEDB88320 : crc >>> 1;
 }
 return (crc ^ 0xFFFFFFFF) >>> 0;
};
function chunk(type, data) {
 const payload = Buffer.concat([Buffer.from(type), data]);
 const output = Buffer.alloc(data.length + 12); output.writeUInt32BE(data.length, 0); payload.copy(output, 4); output.writeUInt32BE(crc32(payload), output.length - 4); return output;
}
function encodeTestPng(pixels, filter = 0, bitDepth = 8) {
 const width = 1920, height = 1010, pixelBytes = bitDepth / 8 * 3, stride = width * pixelBytes;
 const raw = Buffer.alloc((stride + 1) * height);
 for (let y = 0; y < height; y++) {
  const source = y * stride, output = y * (stride + 1); raw[output] = filter;
  for (let x = 0; x < stride; x++) {
   const left = x >= pixelBytes ? pixels[source + x - pixelBytes] : 0, up = y ? pixels[source + x - stride] : 0, upperLeft = y && x >= pixelBytes ? pixels[source + x - stride - pixelBytes] : 0;
   let prediction = 0;
   if (filter === 1) prediction = left;
   if (filter === 2) prediction = up;
   if (filter === 3) prediction = Math.floor((left + up) / 2);
   if (filter === 4) {
    const estimate = left + up - upperLeft, differences = [Math.abs(estimate - left), Math.abs(estimate - up), Math.abs(estimate - upperLeft)];
    prediction = [left, up, upperLeft][differences.indexOf(Math.min(...differences))];
   }
   raw[output + x + 1] = (pixels[source + x] - prediction) & 255;
  }
 }
 const header = Buffer.alloc(13); header.writeUInt32BE(width); header.writeUInt32BE(height, 4); header[8] = bitDepth; header[9] = 2;
 return Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk('IHDR', header), chunk('IDAT', deflateSync(raw)), chunk('IEND', Buffer.alloc(0))]);
}

test('all real 16-bit checkpoint masks match stable source IDs and exact native colours without modifying files', async () => {
 const tracked = ['data/orbit-mask-views.json', ...manifest.views.map(view => manifest.folder + view.filename)];
 const before = await Promise.all(tracked.map(async name => ({ name, hash: createHash('sha256').update(await readFile(new URL(name, root))).digest('hex'), mtime: (await stat(new URL(name, root))).mtimeMs })));
 const result = await validateOrbitMaskAssets(root);
 assert.deepEqual(result.names, manifest.views.map(view => view.filename)); assert.match(result.version, /^[0-9a-f]{12}$/);
 assert.equal(result.palette.length, 69); assert.equal(new Set(result.palette.map(row => row.maskColor)).size, 69);
 assert.deepEqual(result.palette[0], { id: 'A001', maskColor: '#63BBF1', maskColorAliases: ['#63BAF0'] });
 const accepted = new Map();
 for (const entry of result.palette) {
  const native = manifest.palette.find(row => row.id === entry.id).renderedRgb16;
  const hex = values => '#' + values.map(value => value.toString(16).padStart(2, '0')).join('').toUpperCase();
  const expected = [...new Set([native.map(value => value >>> 8),native.map(value => Math.floor(value / 257)),native.map(value => Math.round(value / 257))].map(hex))].filter(color => color !== entry.maskColor);
  assert.deepEqual(entry.maskColorAliases || [], expected);assert.ok(expected.length <= 2);
  for(const color of [entry.maskColor,...expected]){assert.ok(!accepted.has(color)||accepted.get(color)===entry.id);accepted.set(color,entry.id);}
 }
 assert.equal(manifest.views.reduce((sum, view) => sum + view.bytes, 0), 190249);
 for (const previous of before) {
  assert.equal(createHash('sha256').update(await readFile(new URL(previous.name, root))).digest('hex'), previous.hash);
  assert.equal((await stat(new URL(previous.name, root))).mtimeMs, previous.mtime);
 }
});

test('PNG reconstruction supports all five row filters and preserves native 16-bit samples', () => {
 const pixels = Buffer.alloc(1920 * 1010 * 3);
 for (let y = 0; y < 1010; y++) for (let x = 0; x < 1920; x++) {
  const at = (y * 1920 + x) * 3; pixels[at] = (x + y) & 255; pixels[at + 1] = (x >> 2) & 255; pixels[at + 2] = (y >> 2) & 255;
 }
 for (let filter = 0; filter <= 4; filter++) {
  const decoded = decodeOrbitMaskPng(encodeTestPng(pixels, filter));
  assert.equal(decoded.bitDepth, 8); assert.equal(decoded.rgb.compare(pixels), 0, `filter ${filter}`);
 }
 const native = Buffer.alloc(pixels.length * 2);
 for (let at = 0; at < pixels.length; at++) { native[at * 2] = pixels[at]; native[at * 2 + 1] = (pixels[at] + 37) & 255; }
 const decoded = decodeOrbitMaskPng(encodeTestPng(native, 4, 16));
 assert.equal(decoded.bitDepth, 16); assert.equal(decoded.samples.compare(native), 0); assert.equal(decoded.rgb.compare(pixels), 0);
});

test('a changed colour ledger, duplicate calibration or checkpoint mapping fails before build', async () => {
 await withFixture(async fixture => {
  const changes = [
   value => { value.palette[0].sourceColor = '#FFFFFF'; },
   value => { value.palette[0].id = value.palette[1].id; },
   value => { value.palette[0].renderedColor = value.palette[1].renderedColor; },
   value => { value.palette[0].renderedRgb16[0]++; },
   value => { value.palette.pop(); },
   value => { value.views[0].frame = 1; },
   value => { value.folder = '../'; },
  ];
  for (const change of changes) {
   const value = structuredClone(manifest); change(value); await writeFile(new URL('data/orbit-mask-views.json', fixture), JSON.stringify(value));
   if (value.palette[0]?.renderedRgb16?.[0] === manifest.palette[0].renderedRgb16[0] + 1) {
    // A different low byte is invisible to RGB8 canvases but still must be rejected by native pixel validation.
    await assert.rejects(validateOrbitMaskAssets(fixture), /unrecognized RGB pixel/);
   } else await assert.rejects(validateOrbitMaskAssets(fixture), failMessage);
  }
 });
});

test('changed files and unrecognized native pixels cannot silently keep old apartment IDs', async () => {
 await withFixture(async fixture => {
  const view = manifest.views[0], url = new URL(manifest.folder + view.filename, fixture), original = await readFile(url);
  const changed = Buffer.from(original); changed[changed.length - 1] ^= 1; await writeFile(url, changed);
  await assert.rejects(validateOrbitMaskAssets(fixture), /changed since calibration/);
  const pixels = Buffer.alloc(1920 * 1010 * 6); pixels.writeUInt16BE(1, 0); // RGB8 would be black; native validation must still reject this pixel.
  const unknown = encodeTestPng(pixels, 0, 16); await writeFile(url, unknown);
  const value = structuredClone(manifest); value.views[0].bytes = unknown.length; value.views[0].sha256 = createHash('sha256').update(unknown).digest('hex');
  await writeFile(new URL('data/orbit-mask-views.json', fixture), JSON.stringify(value));
  await assert.rejects(validateOrbitMaskAssets(fixture), /unrecognized RGB pixel at 0,0/);
 });
});

test('PNG corruption and incompatible IHDR inputs fail before decoding pixels', async () => {
 const original = await readFile(new URL(manifest.folder + manifest.views[0].filename, root));
 const corrupt = Buffer.from(original); corrupt[corrupt.length - 1] ^= 1;
 assert.throws(() => decodeOrbitMaskPng(corrupt), /checksum/);
 assert.throws(() => decodeOrbitMaskPng(original.subarray(0, 30)), /truncated/);
 assert.throws(() => decodeOrbitMaskPng(Buffer.from('notpng')), /signature/);
});
