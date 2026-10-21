// Inlined into the standalone homepage component; state lives in the homepage.
interface OrbitFilterBarProps {
    active: boolean
    language: "hu" | "en"
    filters: OrbitApartmentFilters
    bounds: OrbitPriceBounds | null
    matchCount: number
    total: number
    onChange: (filters: OrbitApartmentFilters) => void
}

const orbitApartmentFilterStyles = `
[data-orbit-filters] { position: relative; width: 100%; min-width: 0; color: #26382d; font-family: inherit; isolation: isolate; }
[data-orbit-filters] *, [data-orbit-filters] *::before, [data-orbit-filters] *::after { box-sizing: border-box; }
[data-orbit-filters] [hidden] { display: none !important; }
[data-orbit-filters] button { display: inline-flex; align-items: center; justify-content: center; min-width: 0; height: 30px; margin: 0; padding: 0; border: 0; border-radius: 8px; color: inherit; background: transparent; font: inherit; cursor: pointer; -webkit-tap-highlight-color: transparent; touch-action: manipulation; }
[data-orbit-filters] button:disabled { opacity: .4; cursor: default; }
[data-orbit-filters] :is(button,input):focus-visible { outline: 2px solid #42634c; outline-offset: 2px; }
[data-orbit-filters] [data-orbit-filter-row] { display: flex; align-items: center; gap: 3px; width: 100%; min-width: 0; height: 32px; padding: 0; border-top: 1px solid rgba(48,67,54,.12); border-bottom: 1px solid rgba(48,67,54,.12); }
[data-orbit-filters] .orbit-filter-statuses { display: flex; align-items: center; flex: 1 1 auto; gap: 2px; min-width: 0; }
[data-orbit-filters] [data-orbit-filter-status] { flex: 1 1 auto; gap: 4px; height: 26px; padding: 0 5px; border: 1px solid transparent; border-radius: 6px; color: #677269; font-size: 10px; font-weight: 500; line-height: 1; letter-spacing: -.15px; white-space: nowrap; }
[data-orbit-filters] [data-orbit-filter-status] .orbit-filter-status-label { overflow: hidden; min-width: 0; text-overflow: ellipsis; }
[data-orbit-filters] .orbit-filter-dot { flex: 0 0 auto; width: 4px; height: 4px; border-radius: 50%; background: var(--filter-dot,#617764); opacity: .85; }
[data-orbit-filters] [data-orbit-filter-status="under_negotiation"] { --filter-dot: #ae843e; }
[data-orbit-filters] [data-orbit-filter-status="sold"] { --filter-dot: #ae655e; }
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
[data-orbit-filters] .orbit-filter-price-stage { position: relative; height: 28px; margin-top: 3px; }
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
@media (hover:hover) { [data-orbit-filters] button:not(:disabled):hover { background: #edf1e9; } [data-orbit-filters] [aria-pressed="true"]:hover { background: #dce6da; } }
@media (prefers-reduced-motion:reduce) { [data-orbit-filters] *, [data-orbit-filters] *::before, [data-orbit-filters] *::after { animation: none !important; transition: none !important; } }
`

function OrbitFilterBar({ active, language, filters, bounds, matchCount, total, onChange }: OrbitFilterBarProps): React.JSX.Element {
    const hu = language === "hu"
    const [priceOpen, setPriceOpen] = React.useState(false)
    const root = React.useRef<HTMLDivElement>(null)
    const priceToggle = React.useRef<HTMLButtonElement>(null)
    const minimumInput = React.useRef<HTMLInputElement>(null)
    const maximumInput = React.useRef<HTMLInputElement>(null)
    const panelId = React.useId()
    const hasBounds = bounds !== null && typeof bounds.min === "number" && Number.isFinite(bounds.min) && typeof bounds.max === "number" && Number.isFinite(bounds.max) && bounds.max > bounds.min
    const minimum = hasBounds ? bounds!.min! : 0, maximum = hasBounds ? bounds!.max! : 0
    const step = hasBounds && Number.isFinite(bounds!.step) && bounds!.step > 0 ? bounds!.step : 1000000
    const low = Math.min(maximum, Math.max(minimum, filters.priceMin ?? minimum))
    const high = Math.max(low, Math.min(maximum, filters.priceMax ?? maximum))
    const hasPrice = filters.priceMin !== null || filters.priceMax !== null
    const hasFilters = filters.statuses.length > 0 || hasPrice
    const formatPrice = (value: number) => `${new Intl.NumberFormat(hu ? "hu-HU" : "en-GB", { maximumFractionDigits: 1 }).format(value / 1000000)} ${hu ? "M Ft" : "M HUF"}`
    const changePrice = (side: "minimum" | "maximum", value: number) => {
        if (!hasBounds || !Number.isFinite(value)) return
        if (side === "minimum") {
            const next = Math.max(minimum, Math.min(high, value))
            onChange({ ...filters, priceMin: next <= minimum ? null : next })
        } else {
            const next = Math.min(maximum, Math.max(low, value))
            onChange({ ...filters, priceMax: next >= maximum ? null : next })
        }
    }
    React.useEffect(() => { if (!active || !hasBounds) setPriceOpen(false) }, [active, hasBounds])
    React.useEffect(() => {
        if (!priceOpen) return
        const outside = (event: PointerEvent) => { if (event.target instanceof Node && !root.current?.contains(event.target)) setPriceOpen(false) }
        const escape = (event: KeyboardEvent) => {
            if (event.key !== "Escape") return
            event.preventDefault()
            setPriceOpen(false)
            priceToggle.current?.focus()
        }
        document.addEventListener("pointerdown", outside, true)
        document.addEventListener("keydown", escape)
        return () => { document.removeEventListener("pointerdown", outside, true); document.removeEventListener("keydown", escape) }
    }, [priceOpen])
    const statusOptions: { id: OrbitFilterStatus; label: string; accessible: string }[] = [
        { id: "available", label: hu ? "Szabad" : "Available", accessible: hu ? "Szabad lakások" : "Available apartments" },
        { id: "under_negotiation", label: hu ? "Egyeztetés" : "In talks", accessible: hu ? "Tárgyalás alatt álló lakások" : "Apartments under negotiation" },
        { id: "sold", label: hu ? "Eladva" : "Sold", accessible: hu ? "Eladott lakások" : "Sold apartments" },
    ]
    const count = Math.max(0, Math.min(total, matchCount))
    const sliderPercent = (value: number) => hasBounds ? (value - minimum) / (maximum - minimum) * 100 : 0
    return <div ref={root} data-orbit-filters="" data-orbit-ignore="" data-filtered={hasFilters ? "true" : "false"}>
        <style>{orbitApartmentFilterStyles}</style>
        <div data-orbit-filter-row="" role="group" aria-label={hu ? "Lakások szűrése" : "Filter apartments"}>
            <div className="orbit-filter-statuses">
                {statusOptions.map(option => <button key={option.id} type="button" data-orbit-filter-status={option.id} aria-label={option.accessible} title={option.accessible} aria-pressed={filters.statuses.includes(option.id)} onClick={() => onChange({ ...filters, statuses: filters.statuses.includes(option.id) ? filters.statuses.filter(status => status !== option.id) : [...filters.statuses, option.id] })}>
                    <span className="orbit-filter-dot" aria-hidden="true" /><span className="orbit-filter-status-label">{option.label}</span>
                </button>)}
            </div>
            <button ref={priceToggle} type="button" data-orbit-price-toggle="" data-filtered={hasPrice ? "true" : "false"} aria-label={hu ? "Ártartomány beállítása" : "Set price range"} title={hasBounds ? (hu ? "Ártartomány" : "Price range") : (hu ? "Az árak még nem érhetők el" : "Prices are not available yet")} aria-expanded={priceOpen} aria-controls={panelId} disabled={!hasBounds} onClick={() => setPriceOpen(open => !open)}>
                <span>{hu ? "Ár" : "Price"}</span><svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d={priceOpen ? "M4 10 8 6l4 4" : "m4 6 4 4 4-4"} stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <span data-orbit-filter-count="" role="status" aria-live="polite" aria-atomic="true" aria-label={hu ? `${count} találat ${total} lakásból` : `${count} matches out of ${total} apartments`}>{count}/{total}</span>
            {hasFilters && <button type="button" data-orbit-filter-reset="" aria-label={hu ? "Minden szűrő törlése" : "Reset all filters"} title={hu ? "Szűrők törlése" : "Reset filters"} onClick={() => onChange({ statuses: [], priceMin: null, priceMax: null })}>
                <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="m4 4 8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
            </button>}
        </div>
        <div id={panelId} data-orbit-price-popover="" role="group" aria-label={hu ? "Ártartomány" : "Price range"} hidden={!priceOpen}>
            <div className="orbit-filter-price-values"><span>{formatPrice(low)}</span><span className="orbit-filter-price-caption">{hu ? "Ártartomány" : "Price range"}</span><span>{formatPrice(high)}</span></div>
            <div className="orbit-filter-price-stage" onPointerDown={event => {
                if (!hasBounds || event.target instanceof HTMLInputElement) return
                const rect = event.currentTarget.getBoundingClientRect()
                const ratio = Math.max(0, Math.min(1, (event.clientX - rect.left - 12) / Math.max(1, rect.width - 24)))
                const value = Math.max(minimum, Math.min(maximum, minimum + Math.round(ratio * (maximum - minimum) / step) * step))
                const side = Math.abs(value - low) <= Math.abs(value - high) ? "minimum" : "maximum"
                changePrice(side, value)
                ;(side === "minimum" ? minimumInput : maximumInput).current?.focus()
            }}>
                <span className="orbit-filter-price-track" aria-hidden="true" /><span className="orbit-filter-price-selection" aria-hidden="true" style={{ left: `calc(12px + (100% - 24px) * ${sliderPercent(low) / 100})`, right: `calc(12px + (100% - 24px) * ${(100 - sliderPercent(high)) / 100})` }} />
                <input ref={minimumInput} type="range" data-orbit-price-min="" min={minimum} max={maximum} step={step} value={low} aria-label={hu ? "Minimum ár forintban" : "Minimum price in HUF"} aria-valuetext={formatPrice(low)} disabled={!hasBounds} onChange={event => changePrice("minimum", event.currentTarget.valueAsNumber)} style={{ zIndex: low >= maximum ? 2 : 1 }} />
                <input ref={maximumInput} type="range" data-orbit-price-max="" min={minimum} max={maximum} step={step} value={high} aria-label={hu ? "Maximum ár forintban" : "Maximum price in HUF"} aria-valuetext={formatPrice(high)} disabled={!hasBounds} onChange={event => changePrice("maximum", event.currentTarget.valueAsNumber)} />
            </div>
        </div>
    </div>
}
