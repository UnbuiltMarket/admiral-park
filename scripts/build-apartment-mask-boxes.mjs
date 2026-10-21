// Generate the self-contained MAXScript and the human-readable colour reference.
// The ledger is read-only: never regenerate colours from apartment list order.
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { apartmentMaskPalette, maskRgb, validateApartmentMaskPalette } from './apartment-mask-colors.mjs';

export async function buildApartmentMaskBoxes({ check = false } = {}) {
    const root = new URL('../', import.meta.url);
    const apartments = JSON.parse(await readFile(new URL('data/apartments.json', root), 'utf8')).apartments;
    validateApartmentMaskPalette(apartmentMaskPalette, apartments.map(apartment => apartment.id));
    const entries = [...apartmentMaskPalette.apartments].sort((a, b) => a.id.localeCompare(b.id, 'en'));
    const rows = entries.map(({ id, maskColor }) => {
        const [r, g, b] = maskRgb(maskColor);
        return `        #("${id}", ${r}, ${g}, ${b}, "${maskColor}", "${id[0]}")`;
    }).join(',\n');
    const template = await readFile(new URL('tools/3dsmax/AdmiralApartmentMaskBoxes.source.ms', root), 'utf8');
    if (template.split('__APARTMENT_MASK_ROWS__').length !== 2) throw new Error('Expected one MAXScript palette insertion marker.');
    const script = template.replace('__APARTMENT_MASK_ROWS__', rows).replace(/\r\n/g, '\n').trimEnd() + '\n';
    if (/[^\x09\x0A\x0D\x20-\x7E]/.test(script)) throw new Error('Keep the standalone MAXScript ASCII for reliable 3ds Max loading.');
    const csv = 'apartmentId,maskColor,red,green,blue,objectName,layer,heightCm,lengthCm,widthCm\n' + entries.map(({ id, maskColor }) =>
        [id, maskColor, ...maskRgb(maskColor), `AP_MASK_${id}`, `AP_MASKS_${id[0]}`, 315, 500, 1000].join(',')).join('\n') + '\n';
    const outputs = [['tools/3dsmax/AdmiralApartmentMaskBoxes.ms', script], ['tools/3dsmax/apartment-mask-colors.csv', csv]];
    if (!check) await mkdir(new URL('tools/3dsmax/', root), { recursive: true });
    for (const [path, content] of outputs) {
        const destination = new URL(path, root);
        if (check) {
            if (await readFile(destination, 'utf8') !== content) throw new Error(`Stale mask artifact: ${path}`);
        } else await writeFile(destination, content, 'utf8');
    }
    console.log(`${check ? 'Verified' : 'Built'} ${entries.length} apartment mask boxes and their fixed colour reference.`);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
    const args = process.argv.slice(2);
    if (args.length > 1 || args.some(value => value !== '--check')) throw new Error('Usage: node scripts/build-apartment-mask-boxes.mjs [--check]');
    await buildApartmentMaskBoxes({ check: args.includes('--check') });
}
