interface OrbitFullscreenGeometry {
    width: number
    height: number
    rotated: boolean
    physical: { left: number; top: number; width: number; height: number }
}

/** Changes presentation only: the same scene, canvas and player remain mounted. */
function useOrbitFullscreen(onLayout: () => void, modalOpen: React.MutableRefObject<boolean>) {
    const surfaceRef = React.useRef<HTMLDivElement>(null)
    const geometryRef = React.useRef<OrbitFullscreenGeometry | null>(null)
    const [active, setActive] = React.useState(false)
    const [geometry, setGeometry] = React.useState<OrbitFullscreenGeometry | null>(null)
    const activeRef = React.useRef(false)
    const mountedRef = React.useRef(false)
    const nativeTarget = React.useRef<HTMLElement | null>(null)
    const nativeEntered = React.useRef(false)
    const requestGeneration = React.useRef(0)
    const [nativePhase, setNativePhase] = React.useState<"pending" | "active" | "fallback">("fallback")
    const exitOwnedFullscreen = React.useCallback((target: HTMLElement | null) => {
        if (!target || document.fullscreenElement !== target) return
        try { void document.exitFullscreen?.().catch(() => {}) } catch { /* Browser exit remains available. */ }
    }, [])
    const callbackRef = React.useRef(onLayout)
    callbackRef.current = onLayout
    const previousFocus = React.useRef<HTMLElement | null>(null)
    const focusFrame = React.useRef<number | null>(null)

    const readGeometry = React.useCallback((): OrbitFullscreenGeometry => {
        const viewport = window.visualViewport
        const width = Math.max(1, viewport?.width || window.innerWidth)
        const height = Math.max(1, viewport?.height || window.innerHeight)
        const rotated = height > width
        return { width: rotated ? height : width, height: rotated ? width : height, rotated,
            physical: { left: viewport?.offsetLeft || 0, top: viewport?.offsetTop || 0, width, height } }
    }, [])
    const open = React.useCallback(() => {
        if (typeof window === "undefined" || activeRef.current) return
        if (focusFrame.current !== null) cancelAnimationFrame(focusFrame.current)
        previousFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
        const next = readGeometry()
        activeRef.current = true; geometryRef.current = next
        setGeometry(next); setActive(true)
        const target = surfaceRef.current?.closest<HTMLElement>("[data-admiral-homepage]") || null
        const generation = ++requestGeneration.current
        nativeEntered.current = false
        // Fullscreen must be requested during this click, before any deferred
        // effect. The root also contains the shared apartment-card dialogs.
        if (target && document.fullscreenElement === target) {
            nativeTarget.current = target; nativeEntered.current = true; setNativePhase("active")
        } else if (target && !document.fullscreenElement && document.fullscreenEnabled !== false && typeof target.requestFullscreen === "function") {
            nativeTarget.current = target; setNativePhase("pending")
            const failed = () => {
                if (!mountedRef.current || !activeRef.current || requestGeneration.current !== generation || nativeTarget.current !== target) return
                // An older request on this root may have succeeded after a
                // close/reopen. A newer rejection must not discard that owner.
                if (document.fullscreenElement === target) {
                    nativeEntered.current = true; setNativePhase("active")
                    const actual = readGeometry(); geometryRef.current = actual; setGeometry(actual)
                    return
                }
                nativeTarget.current = null; nativeEntered.current = false; setNativePhase("fallback")
            }
            try {
                const request = target.requestFullscreen({ navigationUI: "hide" })
                void Promise.resolve(request).then(() => {
                    // A late result may belong to a closed/unmounted viewer.
                    // A newer active request on the same root may adopt it.
                    if (!mountedRef.current || !activeRef.current || nativeTarget.current !== target) { exitOwnedFullscreen(target); return }
                    if (document.fullscreenElement !== target) { failed(); return }
                    nativeEntered.current = true; setNativePhase("active")
                    const actual = readGeometry(); geometryRef.current = actual; setGeometry(actual)
                }, failed)
            } catch { failed() }
        } else {
            nativeTarget.current = null; setNativePhase("fallback")
        }
    }, [readGeometry, exitOwnedFullscreen])
    const close = React.useCallback(() => {
        if (!activeRef.current) return
        activeRef.current = false; geometryRef.current = null
        requestGeneration.current++
        const target = nativeTarget.current
        nativeTarget.current = null; nativeEntered.current = false
        exitOwnedFullscreen(target)
        setNativePhase("fallback")
        const surface = surfaceRef.current as (HTMLDivElement & { hidePopover?: () => void }) | null
        if (surface) {
            try { surface.hidePopover?.() } catch { /* Fixed positioning is the browser fallback. */ }
            surface.removeAttribute("popover")
        }
        setActive(false); setGeometry(null)
        if (focusFrame.current !== null) cancelAnimationFrame(focusFrame.current)
        focusFrame.current = requestAnimationFrame(() => {
            focusFrame.current = null
            const previous = previousFocus.current
            const root = surfaceRef.current?.closest<HTMLElement>("[data-admiral-homepage]")
            const fallback = root?.querySelector<HTMLButtonElement>("[data-orbit-fullscreen-open]") || null
            const target = previous && previous !== document.body && previous !== document.documentElement && previous.isConnected ? previous : fallback
            if (target?.isConnected && !modalOpen.current) target.focus({ preventScroll: true })
            previousFocus.current = null
        })
    }, [modalOpen, exitOwnedFullscreen])

    React.useEffect(() => {
        mountedRef.current = true
        const changed = () => {
            const target = nativeTarget.current
            if (!target) return
            if (document.fullscreenElement === target) {
                if (!activeRef.current) { exitOwnedFullscreen(target); return }
                nativeEntered.current = true; setNativePhase("active")
                const actual = readGeometry(); geometryRef.current = actual; setGeometry(actual)
            } else if (nativeEntered.current) {
                // Browser Back, Escape and its own exit control restore the
                // compact workspace, without affecting somebody else's root.
                close()
            }
        }
        document.addEventListener("fullscreenchange", changed)
        return () => {
            mountedRef.current = false; activeRef.current = false; requestGeneration.current++
            const target = nativeTarget.current
            nativeTarget.current = null; nativeEntered.current = false; geometryRef.current = null
            document.removeEventListener("fullscreenchange", changed)
            exitOwnedFullscreen(target)
        }
    }, [close, readGeometry, exitOwnedFullscreen])

    React.useEffect(() => {
        const surface = surfaceRef.current
        if (!active || !surface) return
        surface.dataset.orbitFullscreen = "true"
        // Native fullscreen promotes the whole root to the top layer. Its fixed
        // child needs no popover; promoting both could reorder them mid-entry.
        if (nativePhase === "fallback") {
            surface.setAttribute("popover", "manual")
            try {
                const show = (surface as HTMLDivElement & { showPopover?: () => void }).showPopover
                if (show) show.call(surface)
                else surface.removeAttribute("popover")
            } catch { surface.removeAttribute("popover") /* Retain the fixed fullscreen fallback. */ }
        } else surface.removeAttribute("popover")
        if (focusFrame.current !== null) cancelAnimationFrame(focusFrame.current)
        focusFrame.current = requestAnimationFrame(() => {
            focusFrame.current = null
            if (activeRef.current && !modalOpen.current) surface.querySelector<HTMLButtonElement>("[data-orbit-fullscreen-close]")?.focus({ preventScroll: true })
        })
        const update = () => {
            if (!activeRef.current) return
            const next = readGeometry(), old = geometryRef.current
            if (old && old.rotated === next.rotated && old.width === next.width && old.height === next.height && old.physical.left === next.physical.left && old.physical.top === next.physical.top) return
            geometryRef.current = next; setGeometry(next)
        }
        const keyboard = (event: KeyboardEvent) => {
            // The shared apartment dialog is above this scene and owns its keys.
            if (!activeRef.current || modalOpen.current || event.defaultPrevented) return
            if (event.key === "Escape") { event.preventDefault(); event.stopPropagation(); close(); return }
            if (event.key !== "Tab") return
            const candidates = Array.from(surface.querySelectorAll<HTMLElement>("button:not(:disabled),a[href],input:not(:disabled),select:not(:disabled),textarea:not(:disabled),[tabindex]:not([tabindex='-1'])"))
                .filter(element => !element.closest("[inert],[hidden],[aria-hidden='true']") && element.getClientRects().length > 0 && getComputedStyle(element).visibility !== "hidden")
            if (!candidates.length) { event.preventDefault(); surface.focus({ preventScroll: true }); return }
            const first = candidates[0], last = candidates[candidates.length - 1], focused = document.activeElement
            if (event.shiftKey && (focused === first || !surface.contains(focused))) { event.preventDefault(); last.focus({ preventScroll: true }) }
            else if (!event.shiftKey && (focused === last || !surface.contains(focused))) { event.preventDefault(); first.focus({ preventScroll: true }) }
        }
        window.addEventListener("resize", update)
        window.visualViewport?.addEventListener("resize", update)
        window.visualViewport?.addEventListener("scroll", update)
        window.addEventListener("keydown", keyboard, true)
        return () => {
            window.removeEventListener("resize", update)
            window.visualViewport?.removeEventListener("resize", update)
            window.visualViewport?.removeEventListener("scroll", update)
            window.removeEventListener("keydown", keyboard, true)
            try { (surface as HTMLDivElement & { hidePopover?: () => void }).hidePopover?.() } catch { /* Already closed. */ }
            surface.removeAttribute("popover")
            surface.dataset.orbitFullscreen = "false"
        }
    }, [active, nativePhase, close, modalOpen, readGeometry])

    React.useEffect(() => {
        const surface = surfaceRef.current
        if (surface) {
            surface.setAttribute("data-orbit-fullscreen-surface", "")
            surface.dataset.active = active ? "true" : "false"
            surface.dataset.orbitFullscreenNative = active ? nativePhase : "off"
            surface.dataset.orbitFullscreen = active ? "true" : "false"
            surface.dataset.orbitFullscreenRotated = geometry?.rotated ? "true" : "false"
            if (geometry) { surface.dataset.orbitFullscreenWidth = String(geometry.width); surface.dataset.orbitFullscreenHeight = String(geometry.height) }
            else { delete surface.dataset.orbitFullscreenWidth; delete surface.dataset.orbitFullscreenHeight }
        }
        // Layout callbacks run after the mode and dimensions have been committed.
        const frame = requestAnimationFrame(() => callbackRef.current())
        return () => cancelAnimationFrame(frame)
    }, [active, geometry, nativePhase])
    React.useEffect(() => () => {
        if (focusFrame.current !== null) cancelAnimationFrame(focusFrame.current)
        activeRef.current = false; geometryRef.current = null
    }, [])

    const surfaceStyle: React.CSSProperties = active && geometry ? {
        position: "fixed", display: "block", left: geometry.physical.left, top: geometry.physical.top,
        width: geometry.physical.width, height: geometry.physical.height, margin: 0, padding: 0, border: 0,
        maxWidth: "none", maxHeight: "none", overflow: "hidden", boxSizing: "border-box", background: "#101820",
        zIndex: 2147483500, isolation: "isolate", outline: "none", overscrollBehavior: "none",
    } : { display: "contents" }
    const planeStyle: React.CSSProperties = active && geometry ? {
        position: "absolute", display: "block", left: "50%", top: "50%", width: geometry.width, height: geometry.height,
        transform: `translate(-50%, -50%)${geometry.rotated ? " rotate(90deg)" : ""}`,
        transformOrigin: "center", overflow: "hidden", isolation: "isolate", background: "#101820",
    } : { display: "contents" }
    return { active, open, close, geometryRef, surfaceRef, surfaceStyle, planeStyle }
}

interface OrbitFullscreenDetailsProps {
    apartment: OrbitApartmentRecord | null
    dataset?: OrbitApartmentDataset | null
    assetBase: string
    language: "hu" | "en"
    onOpenDetails: () => void
    moving: boolean
    onPrevious: () => void
    onNext: () => void
    onClose: () => void
    checkpoint: number
    count: number
    emptyMessage?: string
    filters: OrbitApartmentFilters
    filterBounds: OrbitPriceBounds | null
    filterAreaBounds?: OrbitAreaBounds | null
    filterCount: number
    total: number
    onFiltersChange: (filters: OrbitApartmentFilters) => void
}

const orbitFullscreenStyles = `${orbitDataDividerStyles}
[data-orbit-fullscreen-details] { position:absolute; inset:0; z-index:8; color:#fff; font-family:Montserrat,Arial,Helvetica,sans-serif; pointer-events:none; -webkit-font-smoothing:antialiased; }
[data-orbit-fullscreen-details] * { box-sizing:border-box; }
[data-orbit-fullscreen-details] button { font:inherit; color:inherit; cursor:pointer; -webkit-tap-highlight-color:transparent; touch-action:manipulation; }
[data-orbit-fullscreen-details] button:disabled { cursor:default; opacity:.4; }
[data-orbit-fullscreen-details] button:focus-visible { outline:2px solid white; outline-offset:4px; }
[data-orbit-fullscreen-details] .orbit-fullscreen-brand { position:absolute; top:14px; left:50%; transform:translateX(-50%); width:140px; height:56px; background:white; -webkit-mask-image:var(--orbit-fullscreen-logo); mask-image:var(--orbit-fullscreen-logo); -webkit-mask-size:contain; mask-size:contain; -webkit-mask-position:center; mask-position:center; -webkit-mask-repeat:no-repeat; mask-repeat:no-repeat; filter:drop-shadow(0 1px 4px rgba(0,0,0,.2)); }
[data-orbit-fullscreen-details] .orbit-fullscreen-close { position:absolute; top:12px; right:14px; display:grid; place-items:center; width:44px; height:44px; padding:0; border:1px solid rgba(255,255,255,.85); border-radius:50%; background:#fff; color:#242824; box-shadow:0 3px 16px rgba(20,32,24,.16); pointer-events:auto; }
[data-orbit-fullscreen-details] .orbit-fullscreen-close svg { width:19px; height:19px; }
[data-orbit-fullscreen-details] .orbit-fullscreen-nav { position:absolute; inset:45% 16px auto; display:flex; justify-content:space-between; align-items:center; pointer-events:none; }
[data-orbit-fullscreen-details] .orbit-fullscreen-nav button { display:grid; place-items:center; width:44px; height:44px; padding:0; border:1px solid rgba(255,255,255,.45); border-radius:50%; background:rgba(16,24,32,.28); pointer-events:auto; font-size:22px; line-height:1; }
[data-orbit-fullscreen-details] .orbit-fullscreen-bar { --orbit-fullscreen-plan-size:176px; position:absolute; inset:auto 0 0; display:grid; grid-template-columns:minmax(100px,.9fr) 180px minmax(272px,1.45fr); align-items:start; gap:18px; min-width:0; padding:24px 24px 14px; background:linear-gradient(0deg,rgba(7,16,24,.66) 0%,rgba(7,16,24,.42) 55%,rgba(7,16,24,0) 100%); opacity:1; transition:opacity .24s ease; }
[data-orbit-fullscreen-details] .orbit-fullscreen-bar[data-moving="true"] { opacity:0; pointer-events:none; }
[data-orbit-fullscreen-details] .orbit-fullscreen-bar[data-moving="true"] * { pointer-events:none; }
[data-orbit-fullscreen-details] [data-orbitdata-transition] { opacity:1; transition:opacity .18s ease; }
[data-orbit-fullscreen-details] [data-orbitdata-transition][data-orbitdata-visible="false"] { opacity:0; pointer-events:none; }
[data-orbit-fullscreen-details] .orbit-fullscreen-bar[data-moving="true"] [data-orbitdata-transition] { opacity:0; }
[data-orbit-fullscreen-details] .orbit-fullscreen-left,[data-orbit-fullscreen-details] .orbit-fullscreen-right { min-width:0; text-align:left; }
[data-orbit-fullscreen-details] .orbit-fullscreen-left { height:var(--orbit-fullscreen-plan-size); display:grid; grid-template-rows:minmax(0,1fr) minmax(0,1fr); row-gap:32px; }
[data-orbit-fullscreen-details] .orbit-fullscreen-identity { display:flex; align-items:baseline; flex-wrap:wrap; gap:5px 10px; align-self:end; margin:0; }
[data-orbit-fullscreen-details] .orbit-fullscreen-id { margin:0; font-size:24px; font-weight:700; line-height:1; letter-spacing:-.04em; }
[data-orbit-fullscreen-details] .orbit-fullscreen-status { margin:0; font-size:10px; font-weight:500; line-height:1.3; }
[data-orbit-fullscreen-details] .orbit-fullscreen-stats { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:10px; margin:0; align-self:start; }
[data-orbit-fullscreen-details] .orbit-fullscreen-stats>div { min-width:0; text-align:left; }
[data-orbit-fullscreen-details] dt { margin:0 0 4px; font-size:9px; font-weight:400; line-height:1.3; opacity:.8; }
[data-orbit-fullscreen-details] dd { margin:0; font-size:15px; font-weight:700; line-height:1.1; letter-spacing:-.025em; white-space:nowrap; }
[data-orbit-fullscreen-details] dd small { margin-left:3px; font-size:10px; font-weight:400; }
[data-orbit-fullscreen-details] .orbit-fullscreen-plan { display:flex; flex-direction:column; align-items:center; justify-content:center; gap:5px; min-width:0; min-height:var(--orbit-fullscreen-plan-size); margin:0; }
[data-orbit-fullscreen-details] .orbit-fullscreen-plan-stage { display:grid; place-items:center; width:var(--orbit-fullscreen-plan-size); height:var(--orbit-fullscreen-plan-size); max-width:100%; }
[data-orbit-fullscreen-details] .orbit-fullscreen-plan-crop { position:relative; display:block; width:min(100%,calc(var(--orbit-fullscreen-plan-size) * var(--orbit-fullscreen-plan-aspect,.75))); max-height:100%; aspect-ratio:var(--orbit-fullscreen-plan-aspect,.75); overflow:hidden; }
[data-orbit-fullscreen-details] .orbit-fullscreen-plan img { position:absolute; display:block; max-width:none; object-fit:fill; }
[data-orbit-fullscreen-details] .orbit-fullscreen-plan figcaption { font-size:8px; font-weight:400; opacity:.8; line-height:1.2; }
[data-orbit-fullscreen-details] .orbit-fullscreen-right { display:flex; flex-direction:column; align-items:stretch; gap:10px; }
[data-orbit-fullscreen-details] .orbit-fullscreen-filters { min-width:0; pointer-events:auto; }
[data-orbit-fullscreen-details] .orbit-fullscreen-filters > [data-orbit-filters] { display:grid; grid-template-rows:calc(var(--orbit-fullscreen-plan-size) / 2 - 16px) auto; row-gap:32px; }
[data-orbit-fullscreen-details] .orbit-fullscreen-filters [data-orbit-filter-row] { align-self:end; }
[data-orbit-fullscreen-details] .orbit-fullscreen-filters [data-orbit-filter-ranges] { margin-top:0; }

[data-orbit-fullscreen-details] .orbit-fullscreen-conversion { display:flex; align-items:center; justify-content:space-between; gap:10px; min-width:0; }
[data-orbit-fullscreen-details] .orbit-fullscreen-meta { grid-column:1/-1; margin:0; font-size:10px; font-weight:400; line-height:1.4; }
[data-orbit-fullscreen-details] .orbit-fullscreen-price { margin:0; font-size:17px; font-weight:500; line-height:1.15; letter-spacing:-.035em; white-space:nowrap; }
[data-orbit-fullscreen-details] .orbit-fullscreen-price small { margin-left:3px; font-size:11px; font-weight:400; }
[data-orbit-fullscreen-details] .orbit-fullscreen-detail { display:inline-flex; align-items:center; justify-content:center; gap:10px; min-height:44px; padding:10px 16px; border:1px solid rgba(255,255,255,.85); border-radius:999px; background:#fff; color:#242824; box-shadow:0 2px 8px rgba(0,0,0,.08); font-size:11px; font-weight:600; white-space:nowrap; pointer-events:auto; transition:background .18s,box-shadow .18s; }
[data-orbit-fullscreen-details] .orbit-fullscreen-detail svg { width:15px; height:15px; flex:none; }
[data-orbit-fullscreen-details] .orbit-fullscreen-detail:active:not(:disabled),[data-orbit-fullscreen-details] .orbit-fullscreen-close:active { background:#e9ede5; box-shadow:none; }
[data-orbit-fullscreen-details] .orbit-fullscreen-empty { margin:0; padding:8px 0; text-align:left; font-size:12px; line-height:1.5; }
[data-orbit-fullscreen-details][data-compact="true"] .orbit-fullscreen-bar { --orbit-fullscreen-plan-size:148px; grid-template-columns:minmax(76px,1fr) 148px minmax(256px,1.8fr); padding:20px 16px 10px; gap:10px; }
[data-orbit-fullscreen-details][data-compact="true"] .orbit-fullscreen-stats { grid-template-columns:minmax(0,1fr); gap:5px; }
[data-orbit-fullscreen-details][data-compact="true"] .orbit-fullscreen-stats>div { display:flex; align-items:baseline; flex-wrap:wrap; gap:2px 5px; }
[data-orbit-fullscreen-details][data-compact="true"] dt { margin:0; font-size:9px; }
[data-orbit-fullscreen-details][data-compact="true"] dd { font-size:14px; }
[data-orbit-fullscreen-details][data-compact="true"] .orbit-fullscreen-right { gap:7px; }
[data-orbit-fullscreen-details][data-compact="true"] .orbit-fullscreen-meta { display:none; }
[data-orbit-fullscreen-details][data-compact="true"] .orbit-fullscreen-id { font-size:21px; }
[data-orbit-fullscreen-details][data-compact="true"] .orbit-fullscreen-price { font-size:16px; }
[data-orbit-fullscreen-details][data-compact="true"] .orbit-fullscreen-detail { padding:9px 12px; }
@media (prefers-reduced-motion:reduce) { [data-orbit-fullscreen-details] .orbit-fullscreen-detail,[data-orbit-fullscreen-details] .orbit-fullscreen-bar,[data-orbit-fullscreen-details] [data-orbitdata-transition] { transition:none; } }
`

function OrbitFullscreenDetails({ apartment: currentApartment, dataset = null, assetBase, language, onOpenDetails, moving, onPrevious, onNext, onClose, checkpoint, count, emptyMessage, filters, filterBounds, filterAreaBounds = null, filterCount, total, onFiltersChange }: OrbitFullscreenDetailsProps) {
    const transition = useOrbitDataTransition(currentApartment, currentApartment?.id || null, { moving })
    const apartment = transition.displayed
    const hu = language !== "en"
    const rootRef = React.useRef<HTMLDivElement>(null)
    const barRef = React.useRef<HTMLDivElement>(null)
    const [compact, setCompact] = React.useState(false)
    React.useEffect(() => {
        const root = rootRef.current
        if (!root) return
        // A short landscape phone needs the 148px plan and no secondary meta
        // so the two filter rows plus the 44px action leave room for the building.
        const update = () => setCompact(root.clientWidth < 740 || root.clientHeight < 440)
        const observer = new ResizeObserver(update); observer.observe(root); update()
        return () => observer.disconnect()
    }, [])
    const number = new Intl.NumberFormat(hu ? "hu-HU" : "en-GB", { maximumFractionDigits: 2 })
    const known = (value: number | null | undefined) => typeof value === "number" && Number.isFinite(value)
    const area = (value: number | null | undefined) => known(value) ? <>{number.format(value!)}<small>m²</small></> : "—"
    const plan = apartment && dataset ? orbitApartmentPlan(apartment, dataset, assetBase, "floorplan", true) : null
    const incomingPlan = currentApartment && dataset ? orbitApartmentPlan(currentApartment, dataset, assetBase, "floorplan", true) : null
    const incomingSource = incomingPlan?.url || (currentApartment && orbitApartmentAssetUrl(currentApartment.media?.floorplan?.thumbnail || currentApartment.media?.floorplan?.full || currentApartment.floorplan, assetBase))
    useOrbitPreviewImage(incomingSource)
    const floorplanSource = plan?.url || (apartment && orbitApartmentAssetUrl(apartment.media?.floorplan?.thumbnail || apartment.media?.floorplan?.full || apartment.floorplan, assetBase))
    const floorplan = useOrbitPreviewImage(floorplanSource)
    useOrbitDataDividers(barRef, ".orbit-fullscreen-plan-crop,.orbit-fullscreen-plan-stage,.orbit-fullscreen-plan", `${apartment?.id || ""}|${floorplan || ""}|${compact}`)
    const viewBox = plan?.viewBox || { x: 0, y: 0, width: 1, height: 1 }
    const planAspect = { "--orbit-fullscreen-plan-aspect": plan?.aspect || .75 } as React.CSSProperties
    const planStyle: React.CSSProperties = { left: `${-viewBox.x / viewBox.width * 100}%`, top: `${-viewBox.y / viewBox.height * 100}%`, width: `${100 / viewBox.width}%`, height: `${100 / viewBox.height}%` }
    const logo = orbitApartmentAssetUrl("assets/brand/admiral-park-full-logo-no-location.svg", assetBase)
    const state = apartment?.status
    const status = state === "available" ? hu ? "Elérhető" : "Available" : state === "sold" ? hu ? "Eladva" : "Sold" : state === "under_negotiation" ? hu ? "Egyeztetés alatt" : "In negotiation" : state === "reserved" ? hu ? "Foglalt" : "Reserved" : apartment?.statusLabel || ""
    const meta = apartment ? [apartment.building && `${apartment.building} ${hu ? "épület" : "building"}`, apartment.floorLabel, known(apartment.rooms) && `${number.format(apartment.rooms!)} ${hu ? "szoba" : "rooms"}`, apartment.orientation].filter(Boolean).join(" · ") : ""
    const recordFade = {
        "data-orbitdata-transition": "", "data-orbitdata-phase": transition.phase,
        "data-orbitdata-displayed-id": apartment?.id || "", "data-orbitdata-visible": String(transition.visible),
        "aria-hidden": !transition.interactive,
        ...(!transition.interactive ? { inert: "" as any } : {}),
    }
    return <div ref={rootRef} data-orbit-fullscreen-details="" data-compact={compact ? "true" : "false"} data-apartment-id={currentApartment?.id || ""}>
        <style>{orbitFullscreenStyles}</style>
        {logo && <span className="orbit-fullscreen-brand" role="img" aria-label="Admiral Park" style={{ "--orbit-fullscreen-logo": `url("${logo.replace(/["\\]/g, "\\$&")}")` } as React.CSSProperties} />}
        <button type="button" data-orbit-ignore="" data-orbit-fullscreen-close="" className="orbit-fullscreen-close" aria-label={hu ? "Teljes képernyő bezárása" : "Close fullscreen"} onClick={onClose}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="m5 5 14 14M19 5 5 19" /></svg></button>
        <div className="orbit-fullscreen-nav" data-orbit-ignore=""><button type="button" data-orbit-fullscreen-step="previous" disabled={moving} aria-label={hu ? "Előző nézet" : "Previous view"} onClick={onPrevious}>←</button><button type="button" data-orbit-fullscreen-step="next" disabled={moving} aria-label={hu ? "Következő nézet" : "Next view"} onClick={onNext}>→</button></div>
        <div ref={barRef} className="orbit-fullscreen-bar" data-orbit-ignore="" data-moving={moving ? "true" : "false"} aria-hidden={moving} {...(moving ? { inert: "" as any } : {})} aria-live="polite">
            <span data-orbitdata-divider="left" data-info-visible={String(!!apartment && transition.visible)} aria-hidden="true" /><span data-orbitdata-divider="right" data-info-visible={String(!!apartment && transition.visible)} aria-hidden="true" />
            {apartment ? <>
                <div className="orbit-fullscreen-left" {...recordFade}><div className="orbit-fullscreen-identity"><p className="orbit-fullscreen-id" data-orbit-fullscreen-field="number">{apartment.id}</p><p className="orbit-fullscreen-status" data-status={state} data-orbit-fullscreen-field="status" style={{ color: orbitAvailabilityColor(state) }}>{status}</p></div><dl className="orbit-fullscreen-stats"><div data-orbit-fullscreen-field="area"><dt>{hu ? "Lakótér" : "Interior"}</dt><dd>{area(apartment.areaInterior)}</dd></div><div data-orbit-fullscreen-field="terrace"><dt>{hu ? "Terasz" : "Terrace"}</dt><dd>{area(apartment.areaTerrace)}</dd></div><div data-orbit-fullscreen-field="garden"><dt>{hu ? "Kert" : "Garden"}</dt><dd>{area(apartment.areaGarden)}</dd></div></dl></div>
                <figure className="orbit-fullscreen-plan" data-orbit-fullscreen-field="floorplan" style={planAspect} {...recordFade}><span className="orbit-fullscreen-plan-stage">{floorplan && <span className="orbit-fullscreen-plan-crop" data-orbit-plan-crop=""><img src={floorplan} style={planStyle} alt={`${apartment.id} · ${hu ? "alaprajz" : "floorplan"}`} decoding="async" draggable={false} /></span>}</span></figure>
            </> : <><p className="orbit-fullscreen-empty">{emptyMessage || (hu ? "Koppintson egy lakásra a részletekhez." : "Tap an apartment to see its details.")}</p><div className="orbit-fullscreen-plan" aria-hidden="true" /></>}
            <div className="orbit-fullscreen-right">
                <div className="orbit-fullscreen-filters"><OrbitFilterBar active={!moving} language={language} filters={filters} bounds={filterBounds} areaBounds={filterAreaBounds} matchCount={filterCount} total={total} onChange={onFiltersChange} presentation="overlay" /></div>
                {apartment && <><div className="orbit-fullscreen-conversion" {...recordFade}><p className="orbit-fullscreen-price" data-orbit-fullscreen-field="price">{known(apartment.price) ? apartment.currency === "HUF" ? <>{number.format(apartment.price! / 1000000)}<small>M Ft</small></> : number.format(apartment.price!) + " " + apartment.currency : hu ? "Ár kérésre" : "Price on request"}</p><button type="button" className="orbit-fullscreen-detail" data-orbit-detail-link="" disabled={!transition.interactive} onClick={() => { if (transition.interactive) onOpenDetails() }}>{hu ? "Adatlap" : "Apartment details"}<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d="M5 12h14m-6-6 6 6-6 6" /></svg></button></div><p className="orbit-fullscreen-meta" data-orbit-fullscreen-field="meta" {...recordFade}>{meta}</p></>}
            </div>
        </div>
        <span style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clipPath: "inset(50%)" }} role="status">{checkpoint >= 0 ? `${hu ? "Nézet" : "View"} ${checkpoint + 1} / ${count}` : hu ? "Nézetváltás" : "Moving to next view"}</span>
    </div>
}
