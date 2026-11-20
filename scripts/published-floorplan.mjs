import { readFileSync } from 'node:fs';

const manifestUrl = new URL('../assets/apartment-list/media-manifest.json', import.meta.url);
const { types, files } = JSON.parse(readFileSync(manifestUrl, 'utf8'));
const planFiles = new Map(files.filter(file => file.role === 'floorplan').map(file => [file.type, file]));

export function publishedPlanDimensions(type) {
    const file = planFiles.get(type);
    if (!file) throw new Error(`Missing floor-plan file for type ${type} in the media manifest.`);
    const [width, height] = file.dimensions;
    return { width, height };
}

// The pricing workbook supplies the type; the website manifest owns the media.
// Apply this after projecting and validating the private source record.
export function usePublishedFloorplan(record) {
    const plan = types[record.apartmentType]?.floorplan;
    if (!plan) throw new Error(`No published floor plan for ${record.id} (${record.apartmentType}).`);
    record.floorplan = plan.full;
    const image = record.media?.floorplan;
    if (image) {
        image.thumbnail = plan.thumbnail;
        image.full = plan.full;
        if ('original' in image) image.original = plan.original;
        if ('preview' in image) image.preview = plan.full;
    }
    return record;
}
