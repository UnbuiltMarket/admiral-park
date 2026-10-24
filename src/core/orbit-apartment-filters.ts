export type OrbitFilterStatus = "available" | "under_negotiation" | "sold";

export interface OrbitApartmentFilters {
    statuses: OrbitFilterStatus[];
    priceMin: number | null;
    priceMax: number | null;
    /** Optional for compatibility with previously saved price/status filters. */
    areaMin?: number | null;
    areaMax?: number | null;
}

export interface OrbitFilterApartment {
    id: string;
    status: string;
    price: number | null;
    /** Missing currency follows the apartment dataset's HUF default. */
    currency?: string | null;
    areaInterior?: number | null;
}

export interface OrbitPriceBounds {
    min: number;
    max: number;
    step: number;
    pricedCount: number;
    currency: "HUF";
}

export interface OrbitAreaBounds {
    min: number;
    max: number;
    step: number;
    areaCount: number;
    unit: "m²";
}

export interface OrbitApartmentFilterResult {
    /** False means the renderer should highlight only the hovered apartment. */
    active: boolean;
    matchingIds: string[];
    filters: OrbitApartmentFilters;
}

const orbitFilterStatuses: OrbitFilterStatus[] = ["available", "under_negotiation", "sold"];
const orbitFilterPriceStep = 1000000;

function orbitFilterArea(apartment: OrbitFilterApartment): number | null {
    return typeof apartment.areaInterior === "number" && Number.isFinite(apartment.areaInterior) && apartment.areaInterior >= 0
        ? apartment.areaInterior : null;
}

function orbitFilterHufPrice(apartment: OrbitFilterApartment): number | null {
    const currency = apartment.currency;
    const isHuf = currency === undefined || currency === null ||
        (typeof currency === "string" && currency.trim().toUpperCase() === "HUF");
    return isHuf && typeof apartment.price === "number" && Number.isFinite(apartment.price) && apartment.price >= 0
        ? apartment.price : null;
}

/** The complete HUF range stays stable when availability choices change. */
export function getOrbitPriceBounds(apartments: readonly OrbitFilterApartment[]): OrbitPriceBounds | null {
    let minimum = Infinity, maximum = -Infinity, pricedCount = 0;
    for (const apartment of apartments) {
        const price = orbitFilterHufPrice(apartment);
        if (price === null) continue;
        minimum = Math.min(minimum, price);
        maximum = Math.max(maximum, price);
        pricedCount++;
    }
    if (!pricedCount) return null;
    return {
        min: Math.floor(minimum / orbitFilterPriceStep) * orbitFilterPriceStep,
        max: Math.ceil(maximum / orbitFilterPriceStep) * orbitFilterPriceStep,
        step: orbitFilterPriceStep,
        pricedCount,
        currency: "HUF",
    };
}

/** Interior area uses the complete dataset and outward one-square-metre bounds. */
export function getOrbitAreaBounds(apartments: readonly OrbitFilterApartment[]): OrbitAreaBounds | null {
    let minimum = Infinity, maximum = -Infinity, areaCount = 0;
    for (const apartment of apartments) {
        const area = orbitFilterArea(apartment);
        if (area === null) continue;
        minimum = Math.min(minimum, area);
        maximum = Math.max(maximum, area);
        areaCount++;
    }
    return areaCount ? { min: Math.floor(minimum), max: Math.ceil(maximum), step: 1, areaCount, unit: "m²" } : null;
}

/** Canonicalize without modifying slider state or the original apartment data. */
export function normalizeOrbitFilters(
    filters: Partial<OrbitApartmentFilters> | null | undefined,
    bounds?: OrbitPriceBounds | null,
    areaBounds?: OrbitAreaBounds | null,
): OrbitApartmentFilters {
    const selected = Array.isArray(filters?.statuses) ? filters.statuses : [];
    const statuses = orbitFilterStatuses.filter(status => selected.includes(status));
    const limit = (value: unknown) => typeof value === "number" && Number.isFinite(value) ? Math.max(0, value) : null;
    const range = (minimum: unknown, maximum: unknown, rangeBounds?: { min: number; max: number } | null): [number | null, number | null] => {
        let min = limit(minimum), max = limit(maximum);
        if (min !== null && max !== null && min > max) [min, max] = [max, min];
        if (rangeBounds === null) return [null, null];
        if (rangeBounds) {
            const low = limit(rangeBounds.min), high = limit(rangeBounds.max);
            if (low === null || high === null || high < low) return [null, null];
            const clamp = (value: number) => Math.min(high, Math.max(low, value));
            if (min !== null) min = clamp(min);
            if (max !== null) max = clamp(max);
            // Full span means unrestricted, so records without this value remain eligible.
            if (min !== null && min <= low) min = null;
            if (max !== null && max >= high) max = null;
        }
        return [min, max];
    };
    const [priceMin, priceMax] = range(filters?.priceMin, filters?.priceMax, bounds);
    const result: OrbitApartmentFilters = { statuses, priceMin, priceMax };
    if (filters && ("areaMin" in filters || "areaMax" in filters)) {
        const [areaMin, areaMax] = range(filters.areaMin, filters.areaMax, areaBounds);
        result.areaMin = areaMin; result.areaMax = areaMax;
    }
    return result;
}

/** Statuses are ORed; inclusive price and interior-area limits are ANDed. */
export function getOrbitFilterResult(
    apartments: readonly OrbitFilterApartment[],
    filters: Partial<OrbitApartmentFilters> | null | undefined,
    bounds: OrbitPriceBounds | null = getOrbitPriceBounds(apartments),
    areaBounds: OrbitAreaBounds | null = getOrbitAreaBounds(apartments),
): OrbitApartmentFilterResult {
    const normalized = normalizeOrbitFilters(filters, bounds, areaBounds);
    const hasStatusFilter = normalized.statuses.length > 0;
    const hasPriceFilter = normalized.priceMin !== null || normalized.priceMax !== null;
    const hasAreaFilter = normalized.areaMin != null || normalized.areaMax != null;
    const active = hasStatusFilter || hasPriceFilter || hasAreaFilter;
    const matchingIds: string[] = [];
    for (const apartment of apartments) {
        if (hasStatusFilter && !normalized.statuses.includes(apartment.status as OrbitFilterStatus)) continue;
        if (hasPriceFilter) {
            const price = orbitFilterHufPrice(apartment);
            if (price === null || (normalized.priceMin !== null && price < normalized.priceMin) ||
                (normalized.priceMax !== null && price > normalized.priceMax)) continue;
        }
        if (hasAreaFilter) {
            const area = orbitFilterArea(apartment);
            if (area === null || (normalized.areaMin != null && area < normalized.areaMin) ||
                (normalized.areaMax != null && area > normalized.areaMax)) continue;
        }
        matchingIds.push(apartment.id);
    }
    return { active, matchingIds, filters: normalized };
}
