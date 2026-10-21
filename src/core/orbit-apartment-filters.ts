export type OrbitFilterStatus = "available" | "under_negotiation" | "sold";

export interface OrbitApartmentFilters {
    statuses: OrbitFilterStatus[];
    priceMin: number | null;
    priceMax: number | null;
}

export interface OrbitFilterApartment {
    id: string;
    status: string;
    price: number | null;
    /** Missing currency follows the apartment dataset's HUF default. */
    currency?: string | null;
}

export interface OrbitPriceBounds {
    min: number;
    max: number;
    step: number;
    pricedCount: number;
    currency: "HUF";
}

export interface OrbitApartmentFilterResult {
    /** False means the renderer should highlight only the hovered apartment. */
    active: boolean;
    matchingIds: string[];
    filters: OrbitApartmentFilters;
}

const orbitFilterStatuses: OrbitFilterStatus[] = ["available", "under_negotiation", "sold"];
const orbitFilterPriceStep = 1000000;

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

/** Canonicalize without modifying slider state or the original apartment data. */
export function normalizeOrbitFilters(
    filters: Partial<OrbitApartmentFilters> | null | undefined,
    bounds?: OrbitPriceBounds | null,
): OrbitApartmentFilters {
    const selected = Array.isArray(filters?.statuses) ? filters.statuses : [];
    const statuses = orbitFilterStatuses.filter(status => selected.includes(status));
    const limit = (value: unknown) => typeof value === "number" && Number.isFinite(value) ? Math.max(0, value) : null;
    let priceMin = limit(filters?.priceMin), priceMax = limit(filters?.priceMax);
    if (priceMin !== null && priceMax !== null && priceMin > priceMax) [priceMin, priceMax] = [priceMax, priceMin];

    if (bounds === null) return { statuses, priceMin: null, priceMax: null };
    if (bounds) {
        const low = limit(bounds.min), high = limit(bounds.max);
        // A dataset without usable HUF prices cannot support a price control.
        if (low === null || high === null || high < low) return { statuses, priceMin: null, priceMax: null };
        const clamp = (value: number) => Math.min(high, Math.max(low, value));
        if (priceMin !== null) priceMin = clamp(priceMin);
        if (priceMax !== null) priceMax = clamp(priceMax);
        // Full-span sliders are equivalent to reset, including unpriced apartments.
        if (priceMin !== null && priceMin <= low) priceMin = null;
        if (priceMax !== null && priceMax >= high) priceMax = null;
    }
    return { statuses, priceMin, priceMax };
}

/** Statuses are ORed; active price limits are inclusive and ANDed with status. */
export function getOrbitFilterResult(
    apartments: readonly OrbitFilterApartment[],
    filters: Partial<OrbitApartmentFilters> | null | undefined,
    bounds: OrbitPriceBounds | null = getOrbitPriceBounds(apartments),
): OrbitApartmentFilterResult {
    const normalized = normalizeOrbitFilters(filters, bounds);
    const hasStatusFilter = normalized.statuses.length > 0;
    const hasPriceFilter = normalized.priceMin !== null || normalized.priceMax !== null;
    const active = hasStatusFilter || hasPriceFilter;
    const matchingIds: string[] = [];
    for (const apartment of apartments) {
        if (hasStatusFilter && !normalized.statuses.includes(apartment.status as OrbitFilterStatus)) continue;
        if (hasPriceFilter) {
            const price = orbitFilterHufPrice(apartment);
            if (price === null || (normalized.priceMin !== null && price < normalized.priceMin) ||
                (normalized.priceMax !== null && price > normalized.priceMax)) continue;
        }
        matchingIds.push(apartment.id);
    }
    return { active, matchingIds, filters: normalized };
}
