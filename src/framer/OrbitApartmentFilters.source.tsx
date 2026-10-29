// Inlined into the standalone homepage component; state lives in the homepage.
interface OrbitFilterBarProps {
    active: boolean
    language: "hu" | "en"
    filters: OrbitApartmentFilters
    bounds: OrbitPriceBounds | null
    areaBounds?: OrbitAreaBounds | null
    matchCount: number
    total: number
    onChange: (filters: OrbitApartmentFilters) => void
    presentation?: "compact" | "floating" | "overlay"
}

const orbitApartmentFilterStyles = `
[data-orbit-filters] { position: relative; width: 100%; min-width: 0; box-sizing: border-box; color: #26382d; font-family: inherit; isolation: isolate; container-type: inline-size; container-name: orbit-filters; opacity: 1; transition: opacity 240ms ease; }
[data-orbit-filters][data-active="false"] { opacity: 0; pointer-events: none; }
[data-orbit-filters][data-active="false"] * { pointer-events: none !important; }
[data-orbit-filters][data-active="false"] button:disabled { opacity: 1; }
[data-orbit-filters] *, [data-orbit-filters] *::before, [data-orbit-filters] *::after { box-sizing: border-box; }
[data-orbit-filters] [hidden] { display: none !important; }
[data-orbit-filters] button { display: inline-flex; align-items: center; justify-content: center; min-width: 0; height: 30px; margin: 0; padding: 0; border: 0; border-radius: 8px; color: inherit; background: transparent; font: inherit; cursor: pointer; -webkit-tap-highlight-color: transparent; touch-action: manipulation; }
[data-orbit-filters] button:disabled { opacity: .4; cursor: default; }
[data-orbit-filters] :is(button,input):focus-visible { outline: 2px solid #42634c; outline-offset: 2px; }
[data-orbit-filters] [data-orbit-filter-row] { display: flex; align-items: center; gap: 3px; width: 100%; min-width: 0; height: 30px; padding: 0; border-top: 1px solid rgba(48,67,54,.12); border-bottom: 1px solid rgba(48,67,54,.12); }
[data-orbit-filters] .orbit-filter-statuses { display: flex; align-items: center; flex: 1 1 auto; gap: 2px; min-width: 0; }
[data-orbit-filters] [data-orbit-filter-status] { flex: 1 1 auto; gap: 4px; height: 26px; padding: 0 5px; border: 1px solid transparent; border-radius: 6px; color: #677269; font-size: 10px; font-weight: 500; line-height: 1; letter-spacing: -.15px; white-space: nowrap; }
[data-orbit-filters] [data-orbit-filter-status] .orbit-filter-status-label { overflow: hidden; min-width: 0; text-overflow: ellipsis; }
[data-orbit-filters] .orbit-filter-dot { flex: 0 0 auto; width: 4px; height: 4px; border-radius: 50%; background: var(--filter-dot,var(--orbit-available-color,#46A66A)); opacity: 1; }
[data-orbit-filters] [data-orbit-filter-status="under_negotiation"] { --filter-dot: var(--orbit-negotiation-color,#E2B849); }
[data-orbit-filters] [data-orbit-filter-status="sold"] { --filter-dot: var(--orbit-sold-color,#DA5961); }
[data-orbit-filters] [data-orbit-filter-status][aria-pressed="true"] { border-color: rgba(50,79,59,.2); color: #263f2e; background: #e3eae2; }
[data-orbit-filters] [data-orbit-price-toggle] { flex: 0 0 auto; gap: 3px; height: 26px; padding: 0 6px; color: #56635a; font-size: 10px; font-weight: 600; line-height: 1; }
[data-orbit-filters] [data-orbit-price-toggle][data-filtered="true"], [data-orbit-filters] [data-orbit-price-toggle][aria-expanded="true"] { color: #263f2e; background: #e3eae2; }
[data-orbit-filters] [data-orbit-price-toggle] svg { width: 11px; height: 11px; flex-shrink: 0; }
[data-orbit-filters] [data-orbit-filter-count] { flex: 0 0 auto; min-width: 26px; padding: 0 2px; color: #758078; font-size: 9px; font-weight: 500; line-height: 1; font-variant-numeric: tabular-nums; text-align: center; white-space: nowrap; }
[data-orbit-filters] [data-orbit-filter-reset] { flex: 0 0 24px; width: 24px; height: 26px; color: #526357; }
[data-orbit-filters] [data-orbit-filter-reset] svg { width: 12px; height: 12px; }
[data-orbit-filters] [data-orbit-price-popover] { position: absolute; z-index: 4; bottom: calc(100% + 6px); left: 0; right: 0; height: 62px; min-width: 0; padding: 7px 10px; border: 1px solid rgba(48,67,54,.15); border-radius: 12px; background: #fbfcf8; box-shadow: 0 5px 22px rgba(35,50,39,.12); }
[data-orbit-filters] .orbit-filter-price-values { display: flex; align-items: center; justify-content: space-between; gap: 12px; height: 15px; min-width: 0; font-size: 10px; font-weight: 600; line-height: 1; font-variant-numeric: tabular-nums; }
[data-orbit-filters] .orbit-filter-price-caption { color: #738077; font-size: 9px; font-weight: 500; }
[data-orbit-filters] .orbit-filter-price-stage { position: relative; height: 28px; margin-top: 3px; touch-action: none; user-select: none; -webkit-user-select: none; cursor: ew-resize; }
[data-orbit-filters] .orbit-filter-price-track, [data-orbit-filters] .orbit-filter-price-selection { position: absolute; top: 13px; height: 2px; border-radius: 2px; pointer-events: none; }
[data-orbit-filters] .orbit-filter-price-track { left: 12px; right: 12px; background: #dce3da; }
[data-orbit-filters] .orbit-filter-price-selection { background: #48634d; }
[data-orbit-filters] input[type="range"] { position: absolute; inset: 0; width: 100%; height: 28px; margin: 0; padding: 0; border: 0; border-radius: 5px; outline-offset: 1px; background: transparent; appearance: none; -webkit-appearance: none; pointer-events: none; touch-action: none; }
[data-orbit-filters] input[type="range"]::-webkit-slider-runnable-track { height: 2px; background: transparent; border: 0; }
[data-orbit-filters] input[type="range"]::-webkit-slider-thumb { width: 24px; height: 24px; margin-top: -11px; border: 1px solid #ccd7ca; border-radius: 50%; background: #fdfefb; box-shadow: 0 1px 3px rgba(35,50,39,.18),inset 0 0 0 7px #fdfefb; appearance: none; -webkit-appearance: none; pointer-events: auto; cursor: ew-resize; }
[data-orbit-filters] input[type="range"]::-moz-range-track { height: 2px; background: transparent; border: 0; }
[data-orbit-filters] input[type="range"]::-moz-range-thumb { width: 22px; height: 22px; border: 1px solid #ccd7ca; border-radius: 50%; background: #fdfefb; box-shadow: 0 1px 3px rgba(35,50,39,.18); pointer-events: auto; cursor: ew-resize; }
[data-orbit-filters] input[type="range"]:focus-visible::-webkit-slider-thumb { border-color: #42634c; }
[data-orbit-filters] input[type="range"]:focus-visible::-moz-range-thumb { border-color: #42634c; }
[data-orbit-filters] input[type="range"]:disabled::-webkit-slider-thumb { pointer-events: none; }
[data-orbit-filters] input[type="range"]:disabled::-moz-range-thumb { pointer-events: none; }
[data-orbit-filters][data-presentation="floating"] { padding: 4px 10px; border: 1px solid rgba(255,255,255,.8); border-radius: 12px; background: rgba(251,252,248,.96); box-shadow: 0 4px 20px rgba(10,25,16,.12); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); font-family: Montserrat,Arial,Helvetica,sans-serif; }
[data-orbit-filters][data-presentation="floating"] [data-orbit-filter-row] { height: 36px; border: 0; gap: 5px; }
[data-orbit-filters][data-presentation="floating"] [data-orbit-filter-status] { height: 32px; padding: 0 9px; font-size: 12px; }
[data-orbit-filters][data-presentation="floating"] [data-orbit-price-toggle] { height: 32px; padding: 0 9px; font-size: 12px; }
[data-orbit-filters][data-presentation="floating"] [data-orbit-filter-count] { min-width: 36px; font-size: 10px; }
[data-orbit-filters][data-presentation="overlay"] { color: #fff; }
[data-orbit-filters][data-presentation="overlay"] [data-orbit-filter-row] { height: 30px; border: 0; }
[data-orbit-filters][data-presentation="overlay"] :is([data-orbit-filter-status],[data-orbit-price-toggle]) { height: 28px; color: rgba(255,255,255,.85); font-size: 11px; }
[data-orbit-filters][data-presentation="overlay"] [data-orbit-filter-status][aria-pressed="true"], [data-orbit-filters][data-presentation="overlay"] [data-orbit-price-toggle]:is([data-filtered="true"],[aria-expanded="true"]) { color: #fff; border-color: rgba(255,255,255,.45); background: rgba(255,255,255,.13); }
[data-orbit-filters][data-presentation="overlay"] :is([data-orbit-filter-count],[data-orbit-filter-reset]) { color: rgba(255,255,255,.78); }
[data-orbit-filters][data-presentation="overlay"] button:not(:disabled):hover { color: #fff; background: rgba(255,255,255,.18); }
[data-orbit-filters][data-presentation="overlay"] :is(button,input):focus-visible { outline-color: #fff; }
[data-orbit-filters][data-presentation="overlay"] [data-orbit-price-popover] { color: #26382d; }
/* Availability is the primary action; price and area share a quieter second row. */
[data-orbit-filters] [data-orbit-filter-row], [data-orbit-filters][data-presentation="floating"] [data-orbit-filter-row], [data-orbit-filters][data-presentation="overlay"] [data-orbit-filter-row] { height: auto; border: 0; gap: 0; }
[data-orbit-filters] .orbit-filter-statuses { display: grid; grid-template-columns: 1fr 1.65fr .85fr; width: 100%; gap: 4px; }
[data-orbit-filters] [data-orbit-filter-status] { height: 38px; padding: 0 6px; gap: 5px; border-color: rgba(48,67,54,.32); border-radius: 7px; color: #4d5f51; font-size: 11px; font-weight: 600; line-height: 1.1; letter-spacing: -.2px; }
[data-orbit-filters] [data-orbit-filter-status] .orbit-filter-status-label { overflow: visible; text-overflow: clip; }
[data-orbit-filters] .orbit-filter-dot { width: 5px; height: 5px; }
[data-orbit-filters] [data-orbit-filter-status][aria-pressed="true"] { border-color: #526e57; box-shadow: inset 0 0 0 .5px #526e57; }
[data-orbit-filters] [data-orbit-filter-ranges] { display: flex; align-items: center; width: 100%; min-width: 0; gap: 5px; margin-top: 5px; }
[data-orbit-filters] [data-orbit-range-toggle], [data-orbit-filters][data-presentation="floating"] [data-orbit-range-toggle], [data-orbit-filters][data-presentation="overlay"] [data-orbit-range-toggle] { flex: 1 1 0; gap: 5px; height: 34px; padding: 0 8px; border: 1px solid rgba(48,67,54,.15); border-radius: 7px; color: #4d5f51; font-size: 11px; font-weight: 600; line-height: 1; white-space: nowrap; }
[data-orbit-filters] [data-orbit-range-toggle][data-filtered="true"], [data-orbit-filters] [data-orbit-range-toggle][aria-expanded="true"] { color: #203a28; border-color: #6d826f; background: #e3eae2; }
[data-orbit-filters] [data-orbit-range-toggle] svg { width: 12px; height: 12px; flex-shrink: 0; }
[data-orbit-filters] [data-orbit-filter-count] { min-width: 35px; padding: 0 3px; font-size: 10px; }
[data-orbit-filters] [data-orbit-filter-reset] { flex-basis: 32px; width: 32px; height: 34px; }
[data-orbit-filters] [data-orbit-range-popover] { position: absolute; z-index: 4; bottom: calc(100% + 7px); left: 0; right: 0; height: 76px; min-width: 0; padding: 10px 11px; border: 1px solid rgba(48,67,54,.15); border-radius: 12px; color: #26382d; background: #fbfcf8; box-shadow: 0 5px 22px rgba(35,50,39,.12); }
[data-orbit-filters] .orbit-filter-price-values { height: 17px; font-size: 11px; gap: 8px; white-space: nowrap; }
[data-orbit-filters] .orbit-filter-price-caption { font-size: 10px; }
[data-orbit-filters] .orbit-filter-price-stage { height: 32px; margin-top: 5px; }
[data-orbit-filters] .orbit-filter-price-track, [data-orbit-filters] .orbit-filter-price-selection { top: 15px; }
[data-orbit-filters] input[type="range"] { height: 32px; }
[data-orbit-filters][data-presentation="floating"] { padding: 8px; }
[data-orbit-filters][data-presentation="overlay"] [data-orbit-filter-status] { height: 39px; padding: 0 6px; color: #fff; border-color: rgba(255,255,255,.57); font-size: 13px; }
[data-orbit-filters][data-presentation="overlay"] [data-orbit-range-toggle] { color: rgba(255,255,255,.92); border-color: rgba(255,255,255,.45); font-size: 12px; }
[data-orbit-filters][data-presentation="overlay"] [data-orbit-filter-status][aria-pressed="true"], [data-orbit-filters][data-presentation="overlay"] [data-orbit-range-toggle]:is([data-filtered="true"],[aria-expanded="true"]) { color: #fff; border-color: rgba(255,255,255,.75); background: rgba(255,255,255,.2); box-shadow: inset 0 0 0 .5px rgba(255,255,255,.55); }
@container orbit-filters (max-width: 330px) { [data-orbit-filters][data-presentation="overlay"] [data-orbit-filter-status] { font-size: 11px; padding: 0 4px; gap: 4px; } }
@container orbit-filters (max-width: 260px) { [data-orbit-filters] .orbit-filter-statuses { gap: 2px; } [data-orbit-filters] [data-orbit-filter-status], [data-orbit-filters][data-presentation="overlay"] [data-orbit-filter-status] { font-size: 10px; padding: 0 3px; gap: 3px; letter-spacing: -.3px; } [data-orbit-filters] [data-orbit-filter-count] { min-width: 29px; padding: 0; font-size: 9px; } [data-orbit-filters] [data-orbit-range-toggle] { padding: 0 4px; font-size: 10px; } }
@media (hover:hover) { [data-orbit-filters] button:not(:disabled):hover { background: #edf1e9; } [data-orbit-filters] [aria-pressed="true"]:hover { background: #dce6da; } }
@media (prefers-reduced-motion:reduce) { [data-orbit-filters], [data-orbit-filters] *, [data-orbit-filters] *::before, [data-orbit-filters] *::after { animation: none !important; transition: none !important; } }
/* @ORBIT_FILTER_PILLS_INSERT */
`

function orbitPricePointerValue(clientX: number, rect: { left: number; width: number }, logicalWidth: number, minimum: number, maximum: number, step: number) {
    const scale = rect.width / Math.max(1, logicalWidth || rect.width), inset = 12 * scale
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left - inset) / Math.max(1, rect.width - 2 * inset)))
    return Math.max(minimum, Math.min(maximum, minimum + Math.round(ratio * (maximum - minimum) / step) * step))
}

/** Project onto the rendered horizontal rail, including the mobile fullscreen rotation. */
function orbitRangePointerGeometry(stage: HTMLDivElement, clientX: number, clientY: number) {
    const box = stage.getBoundingClientRect()
    let axisX = 1, axisY = 0
    for (let element: HTMLElement | null = stage; element; element = element.parentElement) {
        const transform = getComputedStyle(element).transform
        if (!transform || transform === "none") continue
        try {
            const matrix = new DOMMatrixReadOnly(transform), x = matrix.a * axisX + matrix.c * axisY
            axisY = matrix.b * axisX + matrix.d * axisY; axisX = x
        } catch { /* Axis-aligned rails retain their normal pointer coordinates. */ }
    }
    const vertical = Math.abs(axisY) > Math.abs(axisX), positive = (vertical ? axisY : axisX) >= 0
    return vertical ? { point: positive ? clientY : -clientY, rect: { left: positive ? box.top : -box.bottom, width: box.height } }
        : { point: positive ? clientX : -clientX, rect: { left: positive ? box.left : -box.right, width: box.width } }
}

function OrbitFilterBar({ active, language, filters, bounds, areaBounds = null, matchCount, total, onChange, presentation = "compact" }: OrbitFilterBarProps): React.JSX.Element {
    const hu = language === "hu"
    const [priceOpen, setPriceOpen] = React.useState(false)
    const [rangeKind, setRangeKind] = React.useState<"price" | "area">("price")
    const root = React.useRef<HTMLDivElement>(null)
    const priceToggle = React.useRef<HTMLButtonElement>(null)
    const areaToggle = React.useRef<HTMLButtonElement>(null)
    const minimumInput = React.useRef<HTMLInputElement>(null)
    const maximumInput = React.useRef<HTMLInputElement>(null)
    const priceStage = React.useRef<HTMLDivElement>(null)
    const panelId = React.useId()
    const usable = (values: OrbitPriceBounds | OrbitAreaBounds | null) => values !== null && Number.isFinite(values.min) && Number.isFinite(values.max) && values.max > values.min
    const selectedBounds = rangeKind === "price" ? bounds : areaBounds
    const hasBounds = usable(selectedBounds)
    const minimum = hasBounds ? selectedBounds!.min : 0, maximum = hasBounds ? selectedBounds!.max : 0
    const step = hasBounds && Number.isFinite(selectedBounds!.step) && selectedBounds!.step > 0 ? selectedBounds!.step : rangeKind === "price" ? 1000000 : 1
    const low = Math.min(maximum, Math.max(minimum, (rangeKind === "price" ? filters.priceMin : filters.areaMin) ?? minimum))
    const high = Math.max(low, Math.min(maximum, (rangeKind === "price" ? filters.priceMax : filters.areaMax) ?? maximum))
    const hasPrice = filters.priceMin != null || filters.priceMax != null
    const hasArea = filters.areaMin != null || filters.areaMax != null
    const hasFilters = filters.statuses.length > 0 || hasPrice || hasArea
    const priceLatest = React.useRef({ active, priceOpen, rangeKind, hasBounds, minimum, maximum, step, low, high, filters, onChange })
    priceLatest.current = { active, priceOpen, rangeKind, hasBounds, minimum, maximum, step, low, high, filters, onChange }
    const formatPrice = (value: number) => rangeKind === "price" ? `${new Intl.NumberFormat(hu ? "hu-HU" : "en-GB", { maximumFractionDigits: 1 }).format(value / 1000000)} ${hu ? "M Ft" : "M HUF"}` : `${new Intl.NumberFormat(hu ? "hu-HU" : "en-GB", { maximumFractionDigits: 1 }).format(value)} m²`
    const changePrice = (side: "minimum" | "maximum", value: number) => {
        const current = priceLatest.current
        if (!current.hasBounds || !Number.isFinite(value)) return
        let next: number, updated: OrbitApartmentFilters
        if (side === "minimum") {
            next = Math.max(current.minimum, Math.min(current.high, value))
            updated = current.rangeKind === "price" ? { ...current.filters, priceMin: next <= current.minimum ? null : next } : { ...current.filters, areaMin: next <= current.minimum ? null : next, areaMax: current.filters.areaMax ?? null }
            priceLatest.current = { ...current, low: next, filters: updated }
        } else {
            next = Math.min(current.maximum, Math.max(current.low, value))
            updated = current.rangeKind === "price" ? { ...current.filters, priceMax: next >= current.maximum ? null : next } : { ...current.filters, areaMax: next >= current.maximum ? null : next, areaMin: current.filters.areaMin ?? null }
            priceLatest.current = { ...current, high: next, filters: updated }
        }
        if (updated.priceMin !== current.filters.priceMin || updated.priceMax !== current.filters.priceMax || updated.areaMin !== current.filters.areaMin || updated.areaMax !== current.filters.areaMax) current.onChange(updated)
    }
    React.useEffect(() => { if (!active || !hasBounds) setPriceOpen(false) }, [active, hasBounds])
    React.useEffect(() => {
        if (!priceOpen) return
        const element = root.current
        const studio = element?.closest<HTMLElement>('[data-orbit-studio][data-mobile="true"]')
        const popup = element?.querySelector<HTMLElement>("[data-orbit-range-popover]")
        if (!element || !studio || !popup) return
        // Keep the panel inside the mobile Studio's clipped viewport and above
        // the photo canvas, whose stacking context sits over the filter wrapper.
        const place = () => {
            const box = element.getBoundingClientRect(), studioBox = studio.getBoundingClientRect()
            const scale = box.width / Math.max(1, element.offsetWidth) || 1
            const availableAbove = Math.max(0, (box.top - studioBox.top) / scale)
            const top = Math.max(-popup.offsetHeight - 7, -availableAbove + 4)
            const value = `${top}px`
            if (element.style.getPropertyValue("--orbit-mobile-popup-top") !== value) element.style.setProperty("--orbit-mobile-popup-top", value)
        }
        place()
        const observer = typeof ResizeObserver === "function" ? new ResizeObserver(place) : null
        observer?.observe(element); observer?.observe(studio); observer?.observe(popup)
        window.addEventListener("resize", place)
        return () => { observer?.disconnect(); window.removeEventListener("resize", place); element.style.removeProperty("--orbit-mobile-popup-top") }
    }, [priceOpen, rangeKind])
    React.useEffect(() => {
        if (!priceOpen) return
        const outside = (event: PointerEvent) => {
            const element = root.current
            if (!element || !(event.target instanceof Node) || element.contains(event.target)) return
            // Native Framer decoration can be the event target over our controls.
            // Keep the price panel open when that passive target is inside it.
            const genuineControl = event.target instanceof Element && event.target.closest("nav,header,a,button,input,textarea,select,[contenteditable]:not([contenteditable='false']),[role='button'],[role='link'],[data-orbit-ignore]")
            if (!genuineControl && [element, ...Array.from(element.querySelectorAll<HTMLElement>("[data-orbit-range-popover]:not([hidden])"))].some(node => {
                const box = node.getBoundingClientRect()
                return box.width > 0 && box.height > 0 && event.clientX >= box.left && event.clientX <= box.right && event.clientY >= box.top && event.clientY <= box.bottom
            })) return
            setPriceOpen(false)
        }
        const escape = (event: KeyboardEvent) => {
            if (event.key !== "Escape") return
            event.preventDefault()
            setPriceOpen(false)
            ;(rangeKind === "price" ? priceToggle : areaToggle).current?.focus()
        }
        document.addEventListener("pointerdown", outside, true)
        document.addEventListener("keydown", escape)
        return () => { document.removeEventListener("pointerdown", outside, true); document.removeEventListener("keydown", escape) }
    }, [priceOpen, rangeKind])
    React.useEffect(() => {
        if (!priceOpen || !active || !hasBounds) return
        let drag: { id: number; side: "minimum" | "maximum"; offset: number; kind: string; stage: HTMLDivElement } | null = null
        const finish = () => {
            const previous = drag; drag = null
            if (previous) { try { if (previous.stage.hasPointerCapture(previous.id)) previous.stage.releasePointerCapture(previous.id) } catch { /* A global listener still completes a detached gesture. */ } }
        }
        const apply = (clientX: number, clientY: number) => {
            if (!drag) return
            const current = priceLatest.current, geometry = orbitRangePointerGeometry(drag.stage, clientX, clientY)
            changePrice(drag.side, orbitPricePointerValue(geometry.point - drag.offset, geometry.rect, drag.stage.offsetWidth || geometry.rect.width, current.minimum, current.maximum, current.step))
        }
        const down = (event: PointerEvent) => {
            if (drag && drag.id !== event.pointerId) { finish(); return }
            if (!event.isPrimary || event.button !== 0 || event.defaultPrevented) { finish(); return }
            const stage = priceStage.current, current = priceLatest.current
            if (!stage || !current.active || !current.priceOpen || !current.hasBounds || stage.closest("[hidden],[inert],[aria-hidden='true']")) return
            const rect = stage.getBoundingClientRect()
            if (rect.width <= 0 || rect.height <= 0 || event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) return
            // An actual authored control above the price track keeps its own
            // interaction. A passive Framer sibling may safely cover this area.
            if (event.target instanceof Element && !stage.contains(event.target) && event.target.closest("nav,header,a,button,input,textarea,select,[contenteditable]:not([contenteditable='false']),[role='button'],[role='link'],[data-orbit-ignore]")) return
            const geometry = orbitRangePointerGeometry(stage, event.clientX, event.clientY)
            const value = orbitPricePointerValue(geometry.point, geometry.rect, stage.offsetWidth || geometry.rect.width, current.minimum, current.maximum, current.step)
            let side: "minimum" | "maximum" = Math.abs(value - current.low) <= Math.abs(value - current.high) ? "minimum" : "maximum"
            if (event.target === minimumInput.current) side = "minimum"
            else if (event.target === maximumInput.current) side = "maximum"
            else if (current.low === current.high) side = value >= current.high && current.high < current.maximum ? "maximum" : "minimum"
            const scale = geometry.rect.width / Math.max(1, stage.offsetWidth || geometry.rect.width), inset = 12 * scale
            const center = geometry.rect.left + inset + (side === "minimum" ? current.low - current.minimum : current.high - current.minimum) / (current.maximum - current.minimum) * (geometry.rect.width - 2 * inset)
            const offset = Math.abs(geometry.point - center) <= 14 * scale ? geometry.point - center : 0
            drag = { id: event.pointerId, side, offset, kind: event.pointerType, stage }
            if (event.cancelable) event.preventDefault()
            try { stage.setPointerCapture(event.pointerId) } catch { /* Window listeners also work through passive Framer overlays. */ }
            ;(side === "minimum" ? minimumInput : maximumInput).current?.focus({ preventScroll: true })
            apply(event.clientX, event.clientY)
        }
        const move = (event: PointerEvent) => {
            if (!drag || drag.id !== event.pointerId) return
            if (event.pointerType === "mouse" && event.buttons === 0) { finish(); return }
            if (event.cancelable) event.preventDefault()
            apply(event.clientX, event.clientY)
        }
        const up = (event: PointerEvent) => {
            if (!drag || drag.id !== event.pointerId) return
            if (event.cancelable) event.preventDefault()
            apply(event.clientX, event.clientY); finish()
        }
        const cancel = (event: PointerEvent) => { if (drag?.id === event.pointerId) finish() }
        const touchStart = (event: TouchEvent) => { if (event.touches.length !== 1) finish() }
        const touchMove = (event: TouchEvent) => {
            if (!drag || drag.kind !== "touch") return
            if (event.touches.length !== 1) { finish(); return }
            if (event.cancelable) event.preventDefault()
            apply(event.touches[0].clientX, event.touches[0].clientY)
        }
        window.addEventListener("pointerdown", down, { passive: false, capture: true })
        window.addEventListener("pointermove", move, { passive: false, capture: true })
        window.addEventListener("pointerup", up, { passive: false, capture: true })
        window.addEventListener("pointercancel", cancel, true)
        window.addEventListener("touchstart", touchStart, { passive: true, capture: true })
        window.addEventListener("touchmove", touchMove, { passive: false, capture: true })
        window.addEventListener("touchcancel", finish, true)
        window.addEventListener("blur", finish)
        return () => {
            finish(); window.removeEventListener("pointerdown", down, true); window.removeEventListener("pointermove", move, true)
            window.removeEventListener("pointerup", up, true); window.removeEventListener("pointercancel", cancel, true)
            window.removeEventListener("touchstart", touchStart, true); window.removeEventListener("touchmove", touchMove, true)
            window.removeEventListener("touchcancel", finish, true); window.removeEventListener("blur", finish)
        }
    }, [priceOpen, rangeKind, active, hasBounds, minimum, maximum, step])
    const statusOptions: { id: OrbitFilterStatus; label: string; accessible: string }[] = [
        { id: "available", label: hu ? "Elérhető" : "Available", accessible: hu ? "Elérhető lakások" : "Available apartments" },
        { id: "under_negotiation", label: hu ? "Egyeztetés alatt" : "In talks", accessible: hu ? "Egyeztetés alatt álló lakások" : "Apartments under negotiation" },
        { id: "sold", label: hu ? "Eladva" : "Sold", accessible: hu ? "Eladott lakások" : "Sold apartments" },
    ]
    const count = Math.max(0, Math.min(total, matchCount))
    const sliderPercent = (value: number) => hasBounds ? (value - minimum) / (maximum - minimum) * 100 : 0
    return <div ref={root} data-orbit-filters="" data-orbit-ignore="" data-active={String(active)} aria-hidden={!active} {...(!active ? { inert: "" as any } : {})} data-presentation={presentation} data-filtered={hasFilters ? "true" : "false"}>
        <style>{orbitApartmentFilterStyles}</style>
        <div data-orbit-filter-row="" role="group" aria-label={hu ? "Lakások szűrése" : "Filter apartments"}>
            <div className="orbit-filter-statuses">
                {statusOptions.map(option => <button key={option.id} type="button" disabled={!active} data-orbit-filter-status={option.id} aria-label={option.accessible} title={option.accessible} aria-pressed={filters.statuses.includes(option.id)} onClick={() => onChange({ ...filters, statuses: filters.statuses.includes(option.id) ? filters.statuses.filter(status => status !== option.id) : [...filters.statuses, option.id] })}>
                    <span className="orbit-filter-dot" aria-hidden="true" /><span className="orbit-filter-status-label">{option.label}</span>
                </button>)}
            </div>
        </div>
        <div data-orbit-filter-ranges="" role="group" aria-label={hu ? "Ár és lakótér szerinti szűrés" : "Filter by price and interior area"}>
            <button ref={priceToggle} type="button" data-orbit-range-toggle="price" data-orbit-price-toggle="" data-filtered={hasPrice ? "true" : "false"} aria-label={hu ? "Ártartomány beállítása" : "Set price range"} title={usable(bounds) ? (hu ? "Ártartomány" : "Price range") : (hu ? "Az árak még nem érhetők el" : "Prices are not available yet")} aria-expanded={priceOpen && rangeKind === "price"} aria-controls={panelId} disabled={!active || !usable(bounds)} onClick={() => { setRangeKind("price"); setPriceOpen(open => rangeKind === "price" ? !open : true) }}>
                <span>{hu ? "Ár" : "Price"}</span><svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d={priceOpen && rangeKind === "price" ? "M4 10 8 6l4 4" : "m4 6 4 4 4-4"} stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <button ref={areaToggle} type="button" data-orbit-range-toggle="area" data-orbit-area-toggle="" data-filtered={hasArea ? "true" : "false"} aria-label={hu ? "Lakótér beállítása négyzetméterben" : "Set interior area range in square metres"} title={usable(areaBounds) ? (hu ? "Lakótér (m²)" : "Interior area (m²)") : (hu ? "A lakóterületek még nem érhetők el" : "Interior areas are not available yet")} aria-expanded={priceOpen && rangeKind === "area"} aria-controls={panelId} disabled={!active || !usable(areaBounds)} onClick={() => { setRangeKind("area"); setPriceOpen(open => rangeKind === "area" ? !open : true) }}>
                <span>{hu ? "Lakótér (m²)" : "Interior (m²)"}</span><svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d={priceOpen && rangeKind === "area" ? "M4 10 8 6l4 4" : "m4 6 4 4 4-4"} stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <span data-orbit-filter-count="" role="status" aria-live="polite" aria-atomic="true" aria-label={hu ? `${count} találat ${total} lakásból` : `${count} matches out of ${total} apartments`}>{count}/{total}</span>
            {hasFilters && <button type="button" disabled={!active} data-orbit-filter-reset="" aria-label={hu ? "Minden szűrő törlése" : "Reset all filters"} title={hu ? "Szűrők törlése" : "Reset filters"} onClick={() => onChange({ statuses: [], priceMin: null, priceMax: null, ...(("areaMin" in filters || "areaMax" in filters) ? { areaMin: null, areaMax: null } : {}) })}>
                <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="m4 4 8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
            </button>}
        </div>
        <div id={panelId} data-orbit-range-popover={rangeKind} {...(rangeKind === "price" ? { "data-orbit-price-popover": "" } : { "data-orbit-area-popover": "" })} data-orbit-ignore="" role="group" aria-label={rangeKind === "price" ? (hu ? "Ártartomány" : "Price range") : (hu ? "Lakótér négyzetméterben" : "Interior area in square metres")} hidden={!priceOpen}>
            <div className="orbit-filter-price-values"><span>{formatPrice(low)}</span><span className="orbit-filter-price-caption">{rangeKind === "price" ? (hu ? "Ártartomány" : "Price range") : (hu ? "Lakótér" : "Interior area")}</span><span>{formatPrice(high)}</span></div>
            <div ref={priceStage} {...(rangeKind === "price" ? { "data-orbit-price-stage": "" } : { "data-orbit-area-stage": "" })} className="orbit-filter-price-stage">
                <span className="orbit-filter-price-track" aria-hidden="true" /><span className="orbit-filter-price-selection" aria-hidden="true" style={{ left: `calc(12px + (100% - 24px) * ${sliderPercent(low) / 100})`, right: `calc(12px + (100% - 24px) * ${(100 - sliderPercent(high)) / 100})` }} />
                <input ref={minimumInput} type="range" {...(rangeKind === "price" ? { "data-orbit-price-min": "" } : { "data-orbit-area-min": "" })} min={minimum} max={maximum} step={step} value={low} aria-label={rangeKind === "price" ? (hu ? "Minimum ár forintban" : "Minimum price in HUF") : (hu ? "Minimum lakótér négyzetméterben" : "Minimum interior area in square metres")} aria-valuetext={formatPrice(low)} disabled={!active || !hasBounds} onChange={event => changePrice("minimum", event.currentTarget.valueAsNumber)} style={{ zIndex: low >= maximum ? 2 : 1 }} />
                <input ref={maximumInput} type="range" {...(rangeKind === "price" ? { "data-orbit-price-max": "" } : { "data-orbit-area-max": "" })} min={minimum} max={maximum} step={step} value={high} aria-label={rangeKind === "price" ? (hu ? "Maximum ár forintban" : "Maximum price in HUF") : (hu ? "Maximum lakótér négyzetméterben" : "Maximum interior area in square metres")} aria-valuetext={formatPrice(high)} disabled={!active || !hasBounds} onChange={event => changePrice("maximum", event.currentTarget.valueAsNumber)} />
            </div>
        </div>
    </div>
}
