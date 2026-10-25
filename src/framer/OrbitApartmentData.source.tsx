// Canonical apartment JSON adapter. Inlined into the standalone Framer component.
type OrbitApartmentStatus = "available" | "under_negotiation" | "reserved" | "sold" | "unknown"

// Shared facade and orbitdata availability language. Framer colour controls set
// the custom properties on the viewer; the fallbacks also work in isolated UI.
const ORBIT_AVAILABILITY_COLORS = { available: "#46A66A", under_negotiation: "#E2B849", reserved: "#E2B849", sold: "#DA5961", unknown: "#A8AFB4" } as const
function orbitAvailabilityColor(status: string | undefined): string {
    return status === "available" ? "var(--orbit-available-color,#46A66A)" : status === "sold" ? "var(--orbit-sold-color,#DA5961)" : status === "under_negotiation" || status === "reserved" ? "var(--orbit-negotiation-color,#E2B849)" : "#A8AFB4"
}
const orbitDataDividerStyles = `
[data-orbitdata-divider] { position:absolute; z-index:0; top:var(--orbitdata-divider-y,0px); height:1px; background:rgba(255,255,255,.62); pointer-events:none !important; opacity:1; transition:opacity 240ms ease; }
[data-orbitdata-divider="left"] { left:0; width:var(--orbitdata-divider-left,0px); }
[data-orbitdata-divider="right"] { left:var(--orbitdata-divider-right,100%); right:0; }
[data-orbitdata-divider][data-info-visible="false"] { opacity:0; }
@media (prefers-reduced-motion:reduce) { [data-orbitdata-divider] { transition:none; } }
`
function useOrbitDataDividers(root: React.RefObject<HTMLElement | null>, selector: string, revision: string): void {
    React.useEffect(() => {
        const host = root.current, plan = host?.querySelector<HTMLElement>(selector)
        if (!host || !plan) return
        // offset geometry remains in layout coordinates when the phone's entire
        // fullscreen surface is rotated. A screen-space rect would swap axes.
        const measure = () => {
            let node: HTMLElement | null = plan, left = 0, top = 0
            while (node && node !== host) { left += node.offsetLeft; top += node.offsetTop; node = node.offsetParent as HTMLElement | null }
            if (node !== host) return
            host.style.setProperty("--orbitdata-divider-y", `${top + plan.offsetHeight / 2}px`)
            host.style.setProperty("--orbitdata-divider-left", `${Math.max(0,left - 16)}px`)
            host.style.setProperty("--orbitdata-divider-right", `${Math.min(host.clientWidth,left + plan.offsetWidth + 16)}px`)
        }
        measure()
        if (typeof ResizeObserver !== "undefined") {
            const observer = new ResizeObserver(measure); observer.observe(host); observer.observe(plan)
            return () => observer.disconnect()
        }
        window.addEventListener("resize", measure)
        return () => window.removeEventListener("resize", measure)
    }, [root,selector,revision])
}
// One mounted record fades through to the latest pointer target. Keeping a
// single plan avoids decoding two large drawings just to crossfade their UI.
interface OrbitDataTransition<T> { displayed: T | null; key: string | null; phase: "empty" | "in" | "out" | "visible"; visible: boolean }
function useOrbitDataTransition<T>(value: T | null, key: string | null, { moving = false, enabled = true }: { moving?: boolean; enabled?: boolean } = {}) {
    const initial: OrbitDataTransition<T> = { displayed: value, key: value ? key : null, phase: value ? "visible" : "empty", visible: !!value }
    const [state, setState] = React.useState(initial)
    const stateRef = React.useRef(state), latest = React.useRef({ value, key, moving, enabled })
    latest.current = { value, key: value ? key : null, moving, enabled }
    const alive = React.useRef(false), wasMoving = React.useRef(moving)
    const timer = React.useRef<number | null>(null), frame = React.useRef<number | null>(null)
    const [reduced, setReduced] = React.useState(() => typeof window !== "undefined" && !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches)
    const cancel = () => { if (timer.current !== null) window.clearTimeout(timer.current); if (frame.current !== null) window.cancelAnimationFrame(frame.current); timer.current = frame.current = null }
    const commit = (next: OrbitDataTransition<T>) => {
        if (!alive.current) return
        const old = stateRef.current
        if (old.displayed === next.displayed && old.key === next.key && old.phase === next.phase && old.visible === next.visible) return
        stateRef.current = next; setState(next)
    }
    const empty = () => commit({ displayed: null, key: null, phase: "empty", visible: false })
    const finishIn = () => {
        timer.current = window.setTimeout(() => { timer.current = null; const current = stateRef.current; if (current.phase === "in") commit({ ...current, phase: "visible", visible: true }) }, 180)
    }
    const enter = (next: T, nextKey: string | null, alreadyMounted = false) => {
        cancel(); commit({ displayed: next, key: nextKey, phase: "in", visible: alreadyMounted })
        if (alreadyMounted) finishIn()
        else frame.current = window.requestAnimationFrame(() => {
            frame.current = window.requestAnimationFrame(() => {
                frame.current = null
                if (!alive.current || stateRef.current.phase !== "in") return
                commit({ ...stateRef.current, visible: true }); finishIn()
            })
        })
    }
    React.useEffect(() => {
        alive.current = true
        const query = window.matchMedia?.("(prefers-reduced-motion: reduce)")
        const change = () => setReduced(!!query?.matches)
        change(); query?.addEventListener?.("change", change)
        return () => { alive.current = false; cancel(); query?.removeEventListener?.("change", change) }
    }, [])
    // Deliberately reconcile every committed render: a floorplan URL can become
    // ready without changing its apartment ID. Active fades never restart for
    // that update, and a rapid A -> B -> C pass consumes only the latest target.
    React.useEffect(() => {
        const target = latest.current, current = stateRef.current
        if (!target.enabled) { cancel(); wasMoving.current = target.moving; empty(); return }
        if (target.moving) {
            cancel(); wasMoving.current = true
            const retained = current.displayed || target.value
            commit({ displayed: retained, key: current.displayed ? current.key : target.key, phase: retained ? "visible" : "empty", visible: !!retained })
            return
        }
        if (wasMoving.current || reduced) {
            cancel(); wasMoving.current = false
            commit({ displayed: target.value, key: target.key, phase: target.value ? "visible" : "empty", visible: !!target.value })
            return
        }
        if (current.key === target.key) {
            if (!target.value) { cancel(); empty(); return }
            if (current.phase === "out") { enter(target.value, target.key, true); return }
            commit({ ...current, displayed: target.value })
            // Recover cancelled scheduling when React remounts effects in StrictMode.
            if (current.phase === "in" && timer.current === null && frame.current === null) enter(target.value, target.key, true)
            return
        }
        if (!current.displayed) { if (target.value) enter(target.value, target.key); return }
        if (current.phase === "out" && timer.current !== null) return
        cancel(); commit({ ...current, phase: "out", visible: false })
        timer.current = window.setTimeout(() => {
            timer.current = null
            const next = latest.current
            if (!next.enabled) { empty(); return }
            if (next.moving) return
            if (next.value) enter(next.value, next.key)
            else empty()
        }, 180)
    })
    // Suppress the departing record on the arrival render itself, before the
    // passive effect clears retained state and the camera panel starts fading in.
    const arriving = wasMoving.current && !moving
    return { displayed: arriving ? value : state.displayed,
        phase: arriving ? value ? "visible" as const : "empty" as const : state.phase,
        visible: arriving ? !!value : state.visible,
        interactive: enabled && !moving && !!value && (arriving || key === state.key && state.phase === "visible") }
}
interface OrbitApartmentImage {
    thumbnail?: string
    full: string
    label?: string
    isIllustrative?: boolean
    original?: string
}
interface OrbitApartmentRecord {
    id: string
    maskColor?: string
    name: string
    building: string
    floor: number | null
    floorLabel: string | null
    rooms: number | null
    bedrooms: number | null
    layoutLabel: string | null
    orientation: string | null
    areaInterior: number | null
    areaTerrace: number | null
    areaGarden: number | null
    price: number | null
    currency: string
    priceIncludesVat: boolean | null
    status: OrbitApartmentStatus
    statusLabel: string | null
    apartmentType: string | null
    floorplan: string | null
    note: string | null
    media?: {
        floorplan?: OrbitApartmentImage
        floorLayout?: OrbitApartmentImage
        datasheet?: { url: string; filename?: string; label?: string; page?: number }
    }
}
interface OrbitApartmentDimensions { width: number; height: number }
interface OrbitApartmentViewBox { x: number; y: number; width: number; height: number }
interface OrbitApartmentDataset {
    schemaVersion: string
    project: {
        id: string; name: string; city?: string | null; locale?: string; currency?: string; areaUnit?: string
        availabilityAsOf?: string | null; priceDefinition?: string
    }
    apartments: OrbitApartmentRecord[]
    roomLayouts: Record<string, { imageDimensions: OrbitApartmentDimensions; viewBox: OrbitApartmentViewBox }>
}
interface OrbitApartmentPlan {
    url: string
    aspect: number
    viewBox: OrbitApartmentViewBox
    dimensions: OrbitApartmentDimensions
    isIllustrative: boolean
    label: string
}

function parseOrbitApartmentDataset(value: unknown): OrbitApartmentDataset {
    const object = (input: unknown): Record<string, unknown> | null => input !== null && typeof input === "object" && !Array.isArray(input) ? input as Record<string, unknown> : null
    const text = (input: unknown, maximum = 512): string | null => typeof input === "string" && input.trim() ? input.trim().slice(0, maximum) : null
    const number = (input: unknown, field: string): number | null => {
        if (input === null || input === undefined) return null
        if (typeof input !== "number" || !Number.isFinite(input) || input < 0) throw new Error(`Invalid apartment ${field}.`)
        return input
    }
    const image = (input: unknown): OrbitApartmentImage | undefined => {
        const entry = object(input), full = text(entry?.full, 4096)
        if (!entry || !full) return undefined
        return { full, ...(text(entry.thumbnail, 4096) ? { thumbnail: text(entry.thumbnail, 4096)! } : {}),
            ...(text(entry.original, 4096) ? { original: text(entry.original, 4096)! } : {}),
            ...(text(entry.label) ? { label: text(entry.label)! } : {}),
            ...(typeof entry.isIllustrative === "boolean" ? { isIllustrative: entry.isIllustrative } : {}) }
    }
    const input = object(value)
    if (!input || !Array.isArray(input.apartments) || input.apartments.length < 1 || input.apartments.length > 10000) throw new Error("Apartment JSON must contain an apartment list.")
    const ids = new Set<string>(), statuses = new Set<OrbitApartmentStatus>(["available", "under_negotiation", "reserved", "sold", "unknown"])
    const apartments = input.apartments.map((candidate): OrbitApartmentRecord => {
        const apartment = object(candidate), id = text(apartment?.id, 128)
        if (!apartment || !id || !/^[A-Za-z0-9._-]+$/.test(id) || ids.has(id)) throw new Error("Apartment JSON contains an invalid or repeated apartment ID.")
        ids.add(id)
        const status = text(apartment.status, 64) as OrbitApartmentStatus | null
        if (!status || !statuses.has(status)) throw new Error(`Invalid availability for apartment ${id}.`)
        const floor = number(apartment.floor, "floor")
        if (floor !== null && !Number.isSafeInteger(floor)) throw new Error(`Invalid floor for apartment ${id}.`)
        const price = number(apartment.price, "price")
        if (price !== null && !Number.isSafeInteger(price)) throw new Error(`Invalid price for apartment ${id}.`)
        const sourceMedia = object(apartment.media), plan = image(sourceMedia?.floorplan), floorLayout = image(sourceMedia?.floorLayout)
        const sourceMaskColor = text(apartment.maskColor, 64)
        const maskColor = sourceMaskColor && /^#[0-9a-fA-F]{6}$/.test(sourceMaskColor) ? sourceMaskColor.toUpperCase() : null
        const sourceSheet = object(sourceMedia?.datasheet), sheetUrl = text(sourceSheet?.url, 4096)
        const media = { ...(plan ? { floorplan: plan } : {}), ...(floorLayout ? { floorLayout } : {}),
            ...(sheetUrl ? { datasheet: { url: sheetUrl, ...(text(sourceSheet?.filename) ? { filename: text(sourceSheet?.filename)! } : {}),
                ...(text(sourceSheet?.label) ? { label: text(sourceSheet?.label)! } : {}),
                ...(typeof sourceSheet?.page === "number" && Number.isSafeInteger(sourceSheet.page) && sourceSheet.page > 0 ? { page: sourceSheet.page } : {}) } } : {}) }
        return { id, ...(maskColor ? { maskColor } : {}), name: text(apartment.name) || id, building: text(apartment.building, 64) || "", floor,
            floorLabel: text(apartment.floorLabel), rooms: number(apartment.rooms, "rooms"), bedrooms: number(apartment.bedrooms, "bedrooms"),
            layoutLabel: text(apartment.layoutLabel), orientation: text(apartment.orientation),
            areaInterior: number(apartment.areaInterior, "interior area"), areaTerrace: number(apartment.areaTerrace, "balcony area"), areaGarden: number(apartment.areaGarden, "garden area"),
            price, currency: text(apartment.currency, 12) || "HUF", priceIncludesVat: typeof apartment.priceIncludesVat === "boolean" ? apartment.priceIncludesVat : null,
            status, statusLabel: text(apartment.statusLabel), apartmentType: text(apartment.apartmentType, 64), floorplan: text(apartment.floorplan, 4096),
            note: text(apartment.note, 2048), ...(Object.keys(media).length ? { media } : {}) }
    })
    const roomLayouts: OrbitApartmentDataset["roomLayouts"] = {}
    const layouts = object(input.roomLayouts)
    for (const [key, candidate] of Object.entries(layouts || {})) {
        if (!/^[A-Za-z0-9_-]{1,64}$/.test(key) || key === "__proto__" || key === "constructor" || key === "prototype") continue
        const layout = object(candidate), sourceDimensions = object(layout?.imageDimensions), sourceBox = object(layout?.viewBox)
        if (!layout || !sourceDimensions || !sourceBox) continue
        const width = number(sourceDimensions.width, "drawing width"), height = number(sourceDimensions.height, "drawing height")
        const x = number(sourceBox.x, "drawing crop"), y = number(sourceBox.y, "drawing crop"), cropWidth = number(sourceBox.width, "drawing crop"), cropHeight = number(sourceBox.height, "drawing crop")
        if (width === null || height === null || width <= 0 || height <= 0 || x === null || y === null || cropWidth === null || cropHeight === null || cropWidth <= 0 || cropHeight <= 0 || x + cropWidth > 1.000001 || y + cropHeight > 1.000001) throw new Error(`Invalid drawing dimensions for type ${key}.`)
        roomLayouts[key] = { imageDimensions: { width, height }, viewBox: { x, y, width: cropWidth, height: cropHeight } }
    }
    const sourceProject = object(input.project)
    return { schemaVersion: text(input.schemaVersion, 64) || "1.0", apartments, roomLayouts,
        project: { id: text(sourceProject?.id, 128) || "admiral-park", name: text(sourceProject?.name) || "Admiral Park",
            ...(text(sourceProject?.city) ? { city: text(sourceProject?.city)! } : {}), ...(text(sourceProject?.locale, 32) ? { locale: text(sourceProject?.locale, 32)! } : {}),
            ...(text(sourceProject?.currency, 12) ? { currency: text(sourceProject?.currency, 12)! } : {}), ...(text(sourceProject?.areaUnit, 12) ? { areaUnit: text(sourceProject?.areaUnit, 12)! } : {}),
            availabilityAsOf: text(sourceProject?.availabilityAsOf, 32), ...(text(sourceProject?.priceDefinition) ? { priceDefinition: text(sourceProject?.priceDefinition)! } : {}) } }
}

function orbitApartmentAssetUrl(path: unknown, base: string): string | null {
    if (typeof path !== "string" || !path.trim()) return null
    const value = path.trim()
    try {
        if (/^[a-z][a-z\d+.-]*:/i.test(value)) {
            const direct = new URL(value)
            return direct.protocol === "http:" || direct.protocol === "https:" ? direct.href : null
        }
        const documentBase = typeof document !== "undefined" ? document.baseURI : "https://admiralpark.hu/"
        const assetBase = new URL(base || documentBase, documentBase)
        if (assetBase.protocol !== "http:" && assetBase.protocol !== "https:") return null
        if (base && !assetBase.pathname.endsWith("/")) assetBase.pathname += "/"
        const resolved = new URL(value.replace(/^\.?\/?assets\//, ""), assetBase)
        return resolved.protocol === "http:" || resolved.protocol === "https:" ? resolved.href : null
    } catch { return null }
}

function orbitApartmentPlan(record: OrbitApartmentRecord, dataset: OrbitApartmentDataset, base: string, view: "floorplan" | "floorLayout" = "floorplan", preferThumbnail = false): OrbitApartmentPlan | null {
    const source = view === "floorLayout" ? record.media?.floorLayout : record.media?.floorplan
    const thumbnail = preferThumbnail ? orbitApartmentAssetUrl(source?.thumbnail, base) : null
    const url = thumbnail || orbitApartmentAssetUrl(source?.full || (view === "floorplan" ? record.floorplan : null), base)
    if (!url) return null
    const layout = view === "floorplan" && record.apartmentType ? dataset.roomLayouts[record.apartmentType] : null
    const dimensions = layout?.imageDimensions || (view === "floorLayout" ? { width: 2560, height: 1600 } : { width: 1500, height: 2000 })
    const viewBox = layout?.viewBox || { x: 0, y: 0, width: 1, height: 1 }
    const aspect = dimensions.width * viewBox.width / (dimensions.height * viewBox.height)
    // The existing thumbnails already contain the plan crop; applying it twice cuts
    // away rooms. Retain the drawing's cropped aspect while showing the whole thumb.
    return { url, aspect, dimensions: thumbnail ? { width: dimensions.width * viewBox.width, height: dimensions.height * viewBox.height } : dimensions,
        viewBox: thumbnail ? { x: 0, y: 0, width: 1, height: 1 } : viewBox,
        isIllustrative: view === "floorplan" && source?.isIllustrative !== false,
        label: source?.label || (view === "floorLayout" ? "Szintrajz" : "Alaprajz · illusztráció") }
}

// A fast pointer pass updates apartment text immediately without starting a large
// drawing request for every crossed unit. Cache URL readiness, not decoded images.
const orbitPreviewImageReady = new Set<string>()
const orbitPreviewImageRequests = new Map<string, Promise<void>>()
function requestOrbitPreviewImage(url: string): Promise<void> {
    if (orbitPreviewImageReady.has(url)) return Promise.resolve()
    const previous = orbitPreviewImageRequests.get(url)
    if (previous) return previous
    const request = new Promise<void>((resolve, reject) => {
        const image = new Image()
        image.decoding = "async"
        let finished = false
        const finish = (error?: Error) => {
            if (finished) return
            finished = true; image.onload = null; image.onerror = null
            if (error) reject(error)
            else resolve()
        }
        image.onerror = () => finish(new Error("Apartment floorplan could not be loaded."))
        image.onload = () => {
            if (typeof image.decode === "function") image.decode().then(() => finish(), () => finish(new Error("Apartment floorplan could not be decoded.")))
            else finish()
        }
        image.src = url
    }).then(() => {
        orbitPreviewImageReady.add(url)
        if (orbitPreviewImageReady.size > 96) orbitPreviewImageReady.delete(orbitPreviewImageReady.values().next().value!)
    }).finally(() => { orbitPreviewImageRequests.delete(url) })
    orbitPreviewImageRequests.set(url, request)
    return request
}
function useOrbitPreviewImage(url: string | null | undefined, enabled = true): string | null {
    const requested = enabled && url ? url : null
    const [ready, setReady] = React.useState<string | null>(null)
    React.useEffect(() => {
        if (!requested) { setReady(null); return }
        if (orbitPreviewImageReady.has(requested)) { setReady(requested); return }
        let active = true
        setReady(null)
        const timer = setTimeout(() => {
            requestOrbitPreviewImage(requested).then(() => { if (active) setReady(requested) }, () => { if (active) setReady(null) })
        }, 160)
        return () => { active = false; clearTimeout(timer) }
    }, [requested])
    // Do not show an old apartment's floorplan during the effect's next tick.
    return requested && (ready === requested || orbitPreviewImageReady.has(requested)) ? requested : null
}

const orbitApartmentRequests = new Map<string, Promise<OrbitApartmentDataset>>()
function orbitApartmentRequestUrl(value: string): string | null {
    if (!value.trim()) return null
    try {
        const url = new URL(value.trim(), typeof document !== "undefined" ? document.baseURI : "https://admiralpark.hu/")
        return url.protocol === "http:" || url.protocol === "https:" ? url.href : null
    } catch { return null }
}
function requestOrbitApartmentDataset(url: string): Promise<OrbitApartmentDataset> {
    const previous = orbitApartmentRequests.get(url)
    if (previous) return previous
    const request = fetch(url, { mode: "cors", credentials: "omit", headers: { Accept: "application/json" } }).then(response => {
        if (!response.ok) throw new Error(`Apartment data could not be loaded (${response.status}).`)
        return response.json()
    }).then(parseOrbitApartmentDataset).catch(error => {
        if (orbitApartmentRequests.get(url) === request) orbitApartmentRequests.delete(url)
        throw error
    })
    orbitApartmentRequests.set(url, request)
    return request
}
function useOrbitApartments(url: string, enabled: boolean): { dataset: OrbitApartmentDataset | null; status: "idle" | "loading" | "ready" | "error"; error: string; retry: () => void } {
    const [attempt, setAttempt] = React.useState(0)
    const [state, setState] = React.useState<{ url: string; dataset: OrbitApartmentDataset | null; status: "idle" | "loading" | "ready" | "error"; error: string }>({ url: "", dataset: null, status: "idle", error: "" })
    const resolved = orbitApartmentRequestUrl(url)
    React.useEffect(() => {
        if (!enabled) return
        if (!resolved) { setState({ url: url.trim(), dataset: null, status: "error", error: "Set a valid apartment JSON address." }); return }
        let active = true
        setState(previous => previous.url === resolved && previous.dataset ? previous : { url: resolved, dataset: null, status: "loading", error: "" })
        requestOrbitApartmentDataset(resolved).then(dataset => { if (active) setState({ url: resolved, dataset, status: "ready", error: "" }) }, error => {
            if (active) setState({ url: resolved, dataset: null, status: "error", error: error instanceof Error ? error.message : "Apartment data could not be loaded." })
        })
        return () => { active = false }
    }, [resolved, url, enabled, attempt])
    const retry = React.useCallback(() => { setAttempt(value => value + 1) }, [])
    if (!enabled) return { dataset: state.url === resolved ? state.dataset : null, status: "idle", error: "", retry }
    if (state.url !== (resolved || url.trim())) return { dataset: null, status: "loading", error: "", retry }
    return { dataset: state.dataset, status: state.status, error: state.error, retry }
}
