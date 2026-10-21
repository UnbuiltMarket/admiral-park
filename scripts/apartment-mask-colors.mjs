// Stable ID colours. The persisted ledger, never apartment order or availability,
// is authoritative for the Max boxes and public apartment projections.
import { readFileSync } from 'node:fs';

const fail = message => { throw new Error(message); };
const idPattern = /^[ABC][0-3][0-9]{2}$/;
const hexPattern = /^#[0-9A-F]{6}$/;
export const maskRgb = hex => {
    if (typeof hex !== 'string' || !hexPattern.test(hex)) fail('Mask colours must be uppercase #RRGGBB.');
    return [1, 3, 5].map(index => parseInt(hex.slice(index, index + 2), 16));
};

export function validateApartmentMaskPalette(palette, expectedIds) {
    if (!palette || palette.schemaVersion !== '1.0' || palette.projectId !== 'admiral-park' || palette.paletteVersion !== 1 || palette.encoding !== 'RGB8') fail('Unsupported apartment mask palette.');
    if (palette.backgroundColor !== '#000000' || palette.colorSpace !== 'sRGB') fail('Invalid mask background or colour space.');
    if (palette.boxDimensionsCm?.height !== 315 || palette.boxDimensionsCm?.length !== 500 || palette.boxDimensionsCm?.width !== 1000) fail('Unexpected mask box dimensions.');
    if (!Array.isArray(palette.apartments) || palette.apartments.length !== 69) fail('Expected 69 persisted mask colours.');
    const byId = new Map(), used = new Set(), colors = [];
    for (const entry of palette.apartments) {
        if (!entry || !idPattern.test(entry.id) || byId.has(entry.id)) fail('Invalid or duplicate mask apartment ID.');
        const rgb = maskRgb(entry.maskColor);
        if (used.has(entry.maskColor) || ['#000000', '#FFFFFF'].includes(entry.maskColor)) fail('Duplicate or reserved apartment mask colour.');
        for (const previous of colors) {
            if (rgb.reduce((sum, value, i) => sum + (value - previous[i]) ** 2, 0) < 48 ** 2) fail('Apartment mask colours must remain at least 48 RGB units apart.');
        }
        byId.set(entry.id, entry.maskColor); used.add(entry.maskColor); colors.push(rgb);
    }
    if (expectedIds) {
        const ids = [...expectedIds];
        if (ids.length !== byId.size || new Set(ids).size !== ids.length || ids.some(id => !byId.has(id))) fail('Mask palette does not match the canonical apartment IDs.');
    }
    return byId;
}

export const apartmentMaskPalette = JSON.parse(readFileSync(new URL('../data/apartment-mask-colors.json', import.meta.url), 'utf8'));
const colorsById = validateApartmentMaskPalette(apartmentMaskPalette);
export function getApartmentMaskColor(id) {
    if (!colorsById.has(id)) fail(`No persisted mask colour for apartment ${id}. Add an explicit mapping before publishing new apartments.`);
    return colorsById.get(id);
}
