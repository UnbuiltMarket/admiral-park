type ApartmentDetailsLanguage = "hu" | "en"

interface ApartmentDetailsData {
    id?: string
    number: string
    area: number | null
    terrace: number | null
    garden: number | null
    rooms: number | null
    availability: string
    floorplanUrl?: string
}

interface ApartmentDetailsPreview {
    number?: string
    area?: number
    terrace?: number
    garden?: number
    rooms?: number
    availability?: string
    floorplan?: string
}

function normalizeApartmentDetails(value: unknown): ApartmentDetailsData | null {
    if (!value || typeof value !== "object" || Array.isArray(value)) return null
    const input = value as Record<string, unknown>
    const identifier = (candidate: unknown): string => {
        if (typeof candidate === "string") return candidate.trim().slice(0, 128)
        return typeof candidate === "number" && Number.isFinite(candidate) ? String(candidate) : ""
    }
    const number = identifier(input.number) || identifier(input.id)
    if (!number) return null
    const numeric = (candidate: unknown): number | null => {
        const parsed = typeof candidate === "number" ? candidate : typeof candidate === "string" && /^\s*\d+(?:[.,]\d+)?\s*$/.test(candidate) ? Number(candidate.trim().replace(",", ".")) : NaN
        return Number.isFinite(parsed) && parsed >= 0 ? parsed : null
    }
    const floorplan = typeof input.floorplanUrl === "string" ? input.floorplanUrl.trim() : ""
    const safeFloorplan = floorplan && !/^(?:javascript|vbscript):/i.test(floorplan) && (!/^data:/i.test(floorplan) || /^data:image\/(?:png|jpeg|webp|avif|gif|svg\+xml)[;,]/i.test(floorplan)) ? floorplan : undefined
    return {
        ...(identifier(input.id) ? { id: identifier(input.id) } : {}),
        number,
        area: numeric(input.area), terrace: numeric(input.terrace), garden: numeric(input.garden), rooms: numeric(input.rooms),
        availability: typeof input.availability === "string" ? input.availability.trim().slice(0, 128) : "",
        ...(safeFloorplan ? { floorplanUrl: safeFloorplan } : {}),
    }
}

function createApartmentPreview(preview: ApartmentDetailsPreview = {}): ApartmentDetailsData {
    return normalizeApartmentDetails({
        number: typeof preview.number === "string" && preview.number.trim() ? preview.number : "A.204", area: preview.area ?? 66.4,
        terrace: preview.terrace ?? 12.8, garden: preview.garden ?? 0,
        rooms: preview.rooms ?? 3, availability: preview.availability ?? "available", floorplanUrl: preview.floorplan,
    }) ?? { number: "A.204", area: 66.4, terrace: 12.8, garden: 0, rooms: 3, availability: "available" }
}

const apartmentDetailsStyles = `
[data-apartment-details] {
    container: admiral-apartment / inline-size;
    box-sizing: border-box;
    color: #fff;
    font-family: inherit;
    -webkit-font-smoothing: antialiased;
    pointer-events: none !important;
    isolation: isolate;
    border-top: 1px solid rgba(255,255,255,.65);
    opacity: 0;
    visibility: hidden;
    transform: translateY(8px);
    transition: opacity 240ms ease, transform 240ms ease, visibility 0s linear 240ms;
}
[data-apartment-details][data-details-shell-visible="true"] {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
    transition-delay: 0s;
}
[data-apartment-details]::before {
    content: "";
    position: absolute;
    z-index: -1;
    left: -200px;
    right: -200px;
    top: -120px;
    bottom: calc(0px - var(--admiral-details-bottom, 32px));
    background: linear-gradient(to bottom, rgba(8,15,20,0) 0%, rgba(8,15,20,.28) 28%, rgba(8,15,20,.68) 72%, rgba(8,15,20,.84) 100%);
    pointer-events: none !important;
}
[data-apartment-details] .admiral-details-grid *, [data-apartment-details] .admiral-details-grid *::before, [data-apartment-details] .admiral-details-grid *::after {
    box-sizing: border-box;
    pointer-events: none !important;
}
[data-apartment-details] .admiral-details-filter-row { display: flex; justify-content: flex-end; min-width: 0; padding: 5px 0 0; pointer-events: auto !important; }
[data-apartment-details] [data-orbit-desktop-filters] { width: min(520px,100%); min-width: 0; }
[data-apartment-details] [data-apartment-open] { display: flex; flex-direction: column; align-items: center; gap: 7px; max-width: 100%; min-width: 48px; min-height: 48px; padding: 0; border: 0; color: inherit; font: inherit; background: none; cursor: pointer; pointer-events: auto !important; }
[data-apartment-details] [data-apartment-open]:focus-visible { outline: 2px solid currentColor; outline-offset: 5px; }
[data-apartment-details] [data-apartment-open]:hover .admiral-details-plan-image { opacity: .82; }
[data-apartment-details] .admiral-details-grid {
    display: grid;
    grid-template-columns: repeat(3,minmax(0,1fr)) 220px repeat(3,minmax(0,1fr));
    column-gap: clamp(8px,1.1cqw,20px);
    align-items: center;
    padding-top: 8px;
    opacity: 1;
    transition: opacity 240ms ease;
}
[data-apartment-details] .admiral-details-grid[aria-hidden="true"] { opacity: 0; }
[data-apartment-details] .admiral-details-field { min-width: 0; }
[data-apartment-details] .admiral-details-label {
    display: flex;
    align-items: baseline;
    gap: 7px;
    min-height: 11px;
    margin: 0 0 6px;
    color: rgba(255,255,255,.8);
    font-size: 9px;
    line-height: 1.2;
    font-weight: 400;
    letter-spacing: .08em;
    text-transform: uppercase;
    white-space: nowrap;
}
[data-apartment-details] .admiral-details-sample {
    color: #fff;
    font-size: 8px;
    letter-spacing: .13em;
}
[data-apartment-details] .admiral-details-value {
    display: flex;
    align-items: baseline;
    gap: 5px;
    margin: 0;
    color: #fff;
    font-size: 24px;
    line-height: 1.08;
    font-weight: 400;
    letter-spacing: -.035em;
    font-variant-numeric: tabular-nums;
}
[data-apartment-details] .admiral-details-number .admiral-details-value {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 29px;
}
[data-apartment-details] .admiral-details-unit {
    flex-shrink: 0;
    font-size: 12px;
    font-weight: 400;
    line-height: 1;
    letter-spacing: -.01em;
}
[data-apartment-details] .admiral-details-numeric { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
[data-apartment-details] .admiral-details-status .admiral-details-value {
    padding-top: 5px;
    font-size: 13px;
    line-height: 1.45;
    letter-spacing: .015em;
    overflow-wrap: anywhere;
}
[data-apartment-details] .admiral-details-plan { justify-self: center; text-align: center; }
[data-apartment-details] .admiral-details-rooms .admiral-details-value { font-size: 18px; }
[data-apartment-details] .admiral-details-plan .admiral-details-label { display: none; }
[data-apartment-details] .admiral-details-plan-caption { color: rgba(255,255,255,.85); font-size: 9px; line-height: 1.3; letter-spacing: .06em; }
[data-apartment-details] .admiral-details-plan-image {
    display: block;
    width: 220px;
    height: 190px;
    max-width: 100%;
    object-fit: contain;
    object-position: center;
    transition: opacity 160ms ease;
}
[data-apartment-details] .admiral-details-plan-empty {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 220px;
    height: 190px;
    max-width: 100%;
    color: rgba(255,255,255,.6);
    font-size: 10px;
    line-height: 1.4;
    text-align: center;
}
@container admiral-apartment (max-width: 820px) {
    [data-apartment-details] .admiral-details-grid {
        grid-template-columns: repeat(4,minmax(0,1fr));
        column-gap: 12px;
        row-gap: 15px;
        padding-top: 14px;
    }
    [data-apartment-details] .admiral-details-number { grid-area: 1 / 1 / 2 / 2; }
    [data-apartment-details] .admiral-details-status { grid-area: 1 / 4 / 2 / 5; justify-self: end; text-align: right; }
    [data-apartment-details] .admiral-details-status .admiral-details-label { justify-content: flex-end; }
    [data-apartment-details] .admiral-details-plan { grid-area: 1 / 2 / 2 / 4; justify-self: center; }
    [data-apartment-details] .admiral-details-area { grid-area: 2 / 1 / 3 / 2; }
    [data-apartment-details] .admiral-details-terrace { grid-area: 2 / 2 / 3 / 3; }
    [data-apartment-details] .admiral-details-garden { grid-area: 2 / 3 / 3 / 4; }
    [data-apartment-details] .admiral-details-rooms { grid-area: 2 / 4 / 3 / 5; }
    [data-apartment-details] .admiral-details-label { margin-bottom: 8px; font-size: 9px; letter-spacing: .1em; }
    [data-apartment-details] .admiral-details-number .admiral-details-label { flex-wrap: wrap; row-gap: 3px; }
    [data-apartment-details] .admiral-details-number .admiral-details-value { font-size: 26px; }
    [data-apartment-details] .admiral-details-value { gap: 3px; font-size: 22px; }
    [data-apartment-details] .admiral-details-unit { font-size: 10px; }
    [data-apartment-details] .admiral-details-status .admiral-details-value { padding-top: 2px; font-size: 13px; }
    [data-apartment-details] .admiral-details-plan .admiral-details-label { margin-bottom: 6px; text-align: center; justify-content: center; }
    [data-apartment-details] .admiral-details-plan-image, [data-apartment-details] .admiral-details-plan-empty { width: 148px; height: 128px; }
}
@container admiral-apartment (max-width: 360px) {
    [data-apartment-details] .admiral-details-grid { column-gap: 8px; }
    [data-apartment-details] .admiral-details-label { font-size: 8px; letter-spacing: .07em; }
    [data-apartment-details] .admiral-details-value { font-size: 20px; }
    [data-apartment-details] .admiral-details-number .admiral-details-value { font-size: 24px; }
    [data-apartment-details] .admiral-details-plan-image, [data-apartment-details] .admiral-details-plan-empty { width: 120px; height: 112px; }
}
@media (prefers-reduced-motion: reduce) {
    [data-apartment-details], [data-apartment-details] .admiral-details-grid { transform: none; transition: none; }
}
`

function ApartmentDetailsStrip({ apartment, language, visible, preview, bottom, inset, onHeightChange, onOpen, filters, filtersVisible = false }: {
    apartment: ApartmentDetailsData | null
    language: ApartmentDetailsLanguage
    visible: boolean
    preview: boolean
    bottom: number
    inset: number
    onHeightChange?: (height: number) => void
    onOpen?: () => void
    filters?: React.ReactNode
    filtersVisible?: boolean
}): React.JSX.Element {
    const last = React.useRef<{ apartment: ApartmentDetailsData; preview: boolean } | null>(apartment ? { apartment, preview } : null)
    if (apartment) last.current = { apartment, preview }
    const displayed = apartment ? { apartment, preview } : last.current
    const data: ApartmentDetailsData = displayed?.apartment ?? { number: "—", area: null, terrace: null, garden: null, rooms: null, availability: "" }
    const sample = displayed?.preview ?? preview
    const shown = visible && apartment !== null
    const shellShown = shown || !!filters && filtersVisible
    const hu = language !== "en"
    const labels = hu ? { number: "Lakás", area: "Alapterület", terrace: "Terasz", garden: "Kert", rooms: "Szobák", availability: "Státusz", floorplan: "Alaprajz" } :
        { number: "Apartment", area: "Area", terrace: "Terrace", garden: "Garden", rooms: "Rooms", availability: "Availability", floorplan: "Floor plan" }
    const sampleLabel = hu ? "MINTA" : "SAMPLE"
    const statusCode = data.availability.toLowerCase()
    const status = statusCode === "available" ? hu ? "Szabad" : "Available" : statusCode === "reserved" ? hu ? "Foglalt" : "Reserved" : statusCode === "sold" ? hu ? "Eladva" : "Sold" : data.availability
    const formatter = new Intl.NumberFormat(hu ? "hu-HU" : "en-GB", { maximumFractionDigits: 2 })
    const root = React.useRef<HTMLDivElement>(null)
    const heightCallback = React.useRef(onHeightChange), measuredHeight = React.useRef(-1)
    heightCallback.current = onHeightChange
    const [failedFloorplan, setFailedFloorplan] = React.useState("")
    React.useEffect(() => {
        const element = root.current
        if (!element) return
        const measure = () => {
            const height = element.offsetHeight
            if (height !== measuredHeight.current) { measuredHeight.current = height; heightCallback.current?.(height) }
        }
        measure()
        if (typeof ResizeObserver !== "undefined") {
            const observer = new ResizeObserver(measure)
            observer.observe(element)
            return () => observer.disconnect()
        }
        window.addEventListener("resize", measure)
        return () => window.removeEventListener("resize", measure)
    }, [])
    const metric = (field: "area" | "terrace" | "garden" | "rooms", unit = true) => {
        const value = data[field], present = value !== null && Number.isFinite(value) && !((field === "terrace" || field === "garden") && value === 0)
        return <div className={`admiral-details-field admiral-details-${field}`} data-apartment-field={field}>
            <div className="admiral-details-label">{labels[field]}</div>
            <div className="admiral-details-value"><span className="admiral-details-numeric">{present ? formatter.format(value!) : "—"}</span>{present && unit && <span className="admiral-details-unit">m²</span>}</div>
        </div>
    }
    const safeBottom = Number.isFinite(bottom) ? Math.max(0, Math.min(400, bottom)) : 24
    const safeInset = Number.isFinite(inset) ? Math.max(0, Math.min(200, inset)) : 48
    const floorplan = data.floorplanUrl && data.floorplanUrl !== failedFloorplan ? data.floorplanUrl : ""
    return <div ref={root} data-apartment-details="" data-details-preview={sample ? "true" : "false"} data-details-visible={shown ? "true" : "false"} data-details-shell-visible={String(shellShown)}
        role="region" aria-label={`${hu ? "Lakásadatok" : "Apartment details"}${sample ? hu ? " — minta" : " — sample" : ""}`} aria-hidden={!shellShown} {...(!shellShown ? { inert: "" as any } : {})}
        style={{ position: "absolute", left: `min(${safeInset}px, 4%)`, right: `min(${safeInset}px, 4%)`, bottom: `calc(${safeBottom}px + env(safe-area-inset-bottom, 0px))`, "--admiral-details-bottom": `calc(${safeBottom}px + env(safe-area-inset-bottom, 0px))`, zIndex: 4, pointerEvents: "none" } as React.CSSProperties}>
        <style>{apartmentDetailsStyles}</style>
        {filters && <div className="admiral-details-filter-row">{filters}</div>}
        <div className="admiral-details-grid" aria-hidden={!shown} {...(!shown ? { inert: "" as any } : {})}>
            <div className="admiral-details-field admiral-details-number" data-apartment-field="number">
                <div className="admiral-details-label">{labels.number}{sample && <span className="admiral-details-sample">{sampleLabel}</span>}</div>
                <div className="admiral-details-value">{data.number}</div>
            </div>
            {metric("area")}{metric("terrace")}
            <div className="admiral-details-field admiral-details-plan" data-apartment-field="floorplan">
                <div className="admiral-details-label">{labels.floorplan}</div>
                {onOpen ? <button type="button" data-apartment-open="" data-orbit-ignore="" aria-label={hu ? `${data.number} lakás részletei` : `Apartment ${data.number} details`} aria-haspopup="dialog" tabIndex={shown ? 0 : -1} disabled={!shown} onClick={onOpen}>
                    {floorplan ? <img className="admiral-details-plan-image" src={floorplan} alt={hu ? `${data.number} lakás alaprajza` : `Floor plan of apartment ${data.number}`} loading="lazy" decoding="async" draggable={false} onError={() => setFailedFloorplan(floorplan)} /> : <span className="admiral-details-plan-empty">{hu ? "Részletek ↗" : "Details ↗"}</span>}
                    {floorplan && <span className="admiral-details-plan-caption">{hu ? "Adatlap ↗" : "Details ↗"}</span>}
                </button> : floorplan ? <img className="admiral-details-plan-image" src={floorplan} alt={hu ? `${data.number} lakás alaprajza` : `Floor plan of apartment ${data.number}`} loading="lazy" decoding="async" draggable={false} onError={() => setFailedFloorplan(floorplan)} /> : sample ?
                    <svg className="admiral-details-plan-image" viewBox="0 0 112 78" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label={hu ? "Mintaalaprajz — nem valódi lakás" : "Sample floor plan — not an actual apartment"}>
                        <path d="M7 6H105V58H77V69H7V6Z" stroke="currentColor" strokeWidth="1.3" />
                        <path d="M47 6V29M47 39V69M7 43H28M37 43H47M47 29H70M80 29H105M77 29V58M47 53H61M70 53H77" stroke="currentColor" strokeWidth="1.1" />
                        <path d="M47 39A10 10 0 0 0 37 29H47M37 43A9 9 0 0 0 28 34V43M80 29A10 10 0 0 0 70 19V29M70 53A9 9 0 0 0 61 44V53" stroke="currentColor" strokeWidth=".65" opacity=".65" />
                        <path d="M15 6H36M7 14V31M57 6H90M105 36V50M15 69H36M86 58H98" stroke="currentColor" strokeWidth="2.8" />
                        <text x="101" y="73" textAnchor="end" fill="currentColor" fontSize="6" letterSpacing="1.2" fontFamily="inherit" opacity=".75">{sampleLabel}</text>
                    </svg> : <span className="admiral-details-plan-empty">{hu ? "Nem elérhető" : "Unavailable"}</span>}
            </div>
            {metric("garden")}{metric("rooms", false)}
            <div className="admiral-details-field admiral-details-status" data-apartment-field="availability">
                <div className="admiral-details-label">{labels.availability}</div>
                <div className="admiral-details-value">{status || "—"}</div>
            </div>
        </div>
    </div>
}
