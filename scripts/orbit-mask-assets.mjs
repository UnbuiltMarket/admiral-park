// Validate the lossless masks before embedding their immutable RGB lookup in Framer.
// Source maskColor remains authoritative; renderedColor records this export's transfer.
import { readFile, readdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { inflateSync } from 'node:zlib';
import { validateApartmentMaskPalette, maskRgb } from './apartment-mask-colors.mjs';

const fail = message => { throw new Error(`Orbit mask assets: ${message}`); };
const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
const folder = 'assets/images/Mask full size 1920/';
const frames = [0, 15, 30, 45, 60, 75, 90, 105];
const filenameFor = frame => `mask_CMasking_WireColor${String(frame).padStart(4, '0')}.png`;
const crcTable = Array.from({ length: 256 }, (_, index) => {
    let value = index;
    for (let bit = 0; bit < 8; bit++) value = (value & 1) ? 0xEDB88320 ^ (value >>> 1) : value >>> 1;
    return value >>> 0;
});
function crc32(buffer) {
    let crc = 0xFFFFFFFF;
    for (const byte of buffer) crc = crcTable[(crc ^ byte) & 255] ^ (crc >>> 8);
    return (crc ^ 0xFFFFFFFF) >>> 0;
}
function paeth(left, up, upperLeft) {
    const estimate = left + up - upperLeft;
    const leftDistance = Math.abs(estimate - left), upDistance = Math.abs(estimate - up), diagonalDistance = Math.abs(estimate - upperLeft);
    return leftDistance <= upDistance && leftDistance <= diagonalDistance ? left : upDistance <= diagonalDistance ? up : upperLeft;
}

// Node has no built-in PNG decoder. Supporting only RGB8/RGB16, non-interlaced
// data format keeps this build-time validator small and avoids colour-management APIs.
export function decodeOrbitMaskPng(buffer, label = 'PNG') {
    if (!Buffer.isBuffer(buffer) || !buffer.subarray(0, 8).equals(signature)) fail(`${label} has an invalid PNG signature.`);
    let offset = 8, header = null, ended = false;
    const imageData = [];
    while (offset < buffer.length) {
        if (offset + 12 > buffer.length) fail(`${label} has a truncated PNG chunk.`);
        const length = buffer.readUInt32BE(offset), end = offset + 12 + length;
        if (end > buffer.length) fail(`${label} has a truncated PNG payload.`);
        const type = buffer.toString('ascii', offset + 4, offset + 8), data = buffer.subarray(offset + 8, offset + 8 + length);
        if (crc32(buffer.subarray(offset + 4, offset + 8 + length)) !== buffer.readUInt32BE(offset + 8 + length)) fail(`${label} has a PNG checksum mismatch.`);
        if (!header && type !== 'IHDR') fail(`${label} must start with IHDR.`);
        if (type === 'IHDR') {
            if (header || length !== 13) fail(`${label} has an invalid IHDR.`);
            header = { width: data.readUInt32BE(0), height: data.readUInt32BE(4), bitDepth: data[8] };
            if (header.width !== 1920 || header.height !== 1010 || ![8, 16].includes(header.bitDepth) || data[9] !== 2 || data[10] !== 0 || data[11] !== 0 || data[12] !== 0) fail(`${label} must be 1920×1010, RGB8/RGB16, non-interlaced PNG.`);
        } else if (type === 'IDAT') imageData.push(data);
        else if (type === 'IEND') {
            if (length !== 0) fail(`${label} has an invalid IEND.`);
            ended = true; offset = end; break;
        } else if (type === 'tRNS' || (type.charCodeAt(0) & 32) === 0) fail(`${label} uses an unsupported PNG chunk ${type}.`);
        offset = end;
    }
    if (!header || !ended || offset !== buffer.length || !imageData.length) fail(`${label} is incomplete or has trailing PNG data.`);
    const bytesPerPixel = 3 * header.bitDepth / 8, stride = header.width * bytesPerPixel, expected = (stride + 1) * header.height;
    let raw;
    try { raw = inflateSync(Buffer.concat(imageData), { maxOutputLength: expected }); }
    catch { fail(`${label} contains invalid or oversized compressed PNG data.`); }
    if (raw.length !== expected) fail(`${label} has an unexpected decoded byte count.`);
    const samples = Buffer.alloc(stride * header.height);
    for (let y = 0; y < header.height; y++) {
        const source = y * (stride + 1), target = y * stride, filter = raw[source];
        if (filter > 4) fail(`${label} uses an invalid PNG row filter.`);
        for (let x = 0; x < stride; x++) {
            const left = x >= bytesPerPixel ? samples[target + x - bytesPerPixel] : 0, up = y ? samples[target + x - stride] : 0, upperLeft = y && x >= bytesPerPixel ? samples[target + x - stride - bytesPerPixel] : 0;
            const prediction = filter === 0 ? 0 : filter === 1 ? left : filter === 2 ? up : filter === 3 ? Math.floor((left + up) / 2) : paeth(left, up, upperLeft);
            samples[target + x] = (raw[source + 1 + x] + prediction) & 255;
        }
    }
    const rgb = header.bitDepth === 8 ? samples : Buffer.alloc(header.width * header.height * 3);
    if (header.bitDepth === 16) for (let at = 0; at < rgb.length; at++) rgb[at] = samples[at * 2];
    return { ...header, rgb, samples };
}

export async function validateOrbitMaskAssets(root) {
    if (!(root instanceof URL) || root.protocol !== 'file:') fail('root must be a file URL.');
    const manifest = JSON.parse(await readFile(new URL('data/orbit-mask-views.json', root), 'utf8'));
    const canonical = validateApartmentMaskPalette(JSON.parse(await readFile(new URL('data/apartment-mask-colors.json', root), 'utf8')));
    if (manifest.schemaVersion !== '1.0' || manifest.projectId !== 'admiral-park' || manifest.paletteVersion !== 1 || manifest.encoding !== 'RGB16' || manifest.width !== 1920 || manifest.height !== 1010 || manifest.backgroundColor !== '#000000' || manifest.folder !== folder) fail('unsupported or changed mask manifest settings.');
    if (!Array.isArray(manifest.palette) || manifest.palette.length !== canonical.size) fail('expected all 69 calibrated apartment colours.');
    const ids = new Set(), colors = new Set(), acceptedColors = new Map(), idByPixel = new Map(), idByNativePixel = new Map(), palette = [];
    for (const row of manifest.palette) {
        if (!row || !canonical.has(row.id) || ids.has(row.id) || canonical.get(row.id) !== row.sourceColor) fail('calibrated source colours must exactly match the canonical apartment ID ledger.');
        let rgb;
        try { rgb = maskRgb(row.renderedColor); } catch { fail(`invalid calibrated colour for ${row.id}.`); }
        if (colors.has(row.renderedColor) || ['#000000', '#FFFFFF'].includes(row.renderedColor)) fail('rendered mask colours must be unique and may not use black or white.');
        if (!Array.isArray(row.renderedRgb16) || row.renderedRgb16.length !== 3 || row.renderedRgb16.some((value, index) => !Number.isInteger(value) || value < 0 || value > 65535 || value >>> 8 !== rgb[index])) fail(`invalid calibrated 16-bit colour for ${row.id}.`);
        const nativeKey = row.renderedRgb16[0] * 4294967296 + row.renderedRgb16[1] * 65536 + row.renderedRgb16[2];
        if (idByNativePixel.has(nativeKey)) fail('duplicate native 16-bit mask colour.');
        idByNativePixel.set(nativeKey, row.id);
        // PNG16-to-RGB8 implementations may retain the high byte or normalize the
        // whole RGB triplet by 257 with floor/round. Accept only those exact,
        // deterministic conversions, never a radius of nearby mask colours.
        const toHex = values => '#' + values.map(value => value.toString(16).padStart(2, '0')).join('').toUpperCase();
        const aliases = [...new Set([
            toHex(row.renderedRgb16.map(value => value >>> 8)),
            toHex(row.renderedRgb16.map(value => Math.floor(value / 257))),
            toHex(row.renderedRgb16.map(value => Math.round(value / 257))),
        ])].filter(color => color !== row.renderedColor);
        for (const color of [row.renderedColor, ...aliases]) {
            const previousId = acceptedColors.get(color);
            if (previousId && previousId !== row.id) fail('native RGB8 conversion aliases collide across apartment IDs.');
            acceptedColors.set(color, row.id);
        }
        ids.add(row.id); colors.add(row.renderedColor); idByPixel.set(rgb[0] * 65536 + rgb[1] * 256 + rgb[2], row.id);
        palette.push({ id: row.id, maskColor: row.renderedColor, ...(aliases.length ? { maskColorAliases: aliases } : {}) });
    }
    if (!Array.isArray(manifest.views) || manifest.views.length !== frames.length) fail('expected exactly eight checkpoint masks.');
    const names = frames.map(filenameFor), actualNames = (await readdir(new URL(folder, root))).filter(name => /\.png$/i.test(name)).sort();
    if (JSON.stringify(actualNames) !== JSON.stringify([...names].sort())) fail('mask folder must contain exactly frames 0000, 0015, 0030, 0045, 0060, 0075, 0090, 0105.');
    const version = createHash('sha256'), allVisibleIds = new Set();
    version.update(JSON.stringify(palette));
    for (const [index, frame] of frames.entries()) {
        const view = manifest.views[index], name = names[index];
        if (!view || view.frame !== frame || view.filename !== name || !Number.isInteger(view.bytes) || view.bytes < 1 || !/^[0-9a-f]{64}$/.test(view.sha256)) fail(`invalid manifest record for checkpoint ${frame}.`);
        const bytes = await readFile(new URL(encodeURIComponent(name), new URL(folder, root)));
        const hash = createHash('sha256').update(bytes).digest('hex');
        if (bytes.length !== view.bytes || hash !== view.sha256) fail(`${name} changed since calibration. Audit its exact RGB colours and update data/orbit-mask-views.json before building; never guess apartment IDs from a new gamma export.`);
        const image = decodeOrbitMaskPng(bytes, name), visible = new Set();
        if (image.bitDepth !== 16) fail(`${name} must retain the audited RGB16 encoding.`);
        for (let at = 0; at < image.rgb.length; at += 3) {
            const value = image.rgb[at] * 65536 + image.rgb[at + 1] * 256 + image.rgb[at + 2];
            const nativeAt = at * 2, nativeValue = image.samples.readUInt16BE(nativeAt) * 4294967296 + image.samples.readUInt16BE(nativeAt + 2) * 65536 + image.samples.readUInt16BE(nativeAt + 4);
            if (value === 0 && nativeValue === 0) continue;
            const id = idByPixel.get(value);
            if (!id || idByNativePixel.get(nativeValue) !== id) fail(`${name} contains an unrecognized RGB pixel at ${at / 3 % image.width},${Math.floor(at / 3 / image.width)}. Check gamma, anti-aliasing and the audited mask palette.`);
            visible.add(id); allVisibleIds.add(id);
        }
        if (!Array.isArray(view.visibleIds) || JSON.stringify(view.visibleIds) !== JSON.stringify([...visible].sort())) fail(`${name} visible apartment IDs differ from the audited manifest.`);
        version.update(name).update(bytes);
    }
    if (allVisibleIds.size !== canonical.size) fail('the eight masks must cover all 69 apartment IDs.');
    return { names, version: version.digest('hex').slice(0, 12), palette };
}
