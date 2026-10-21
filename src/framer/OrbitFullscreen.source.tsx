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
    assetBase: string
    language: "hu" | "en"
    onOpenDetails: () => void
    moving: boolean
    onPrevious: () => void
    onNext: () => void
    onClose: () => void
    checkpoint: number
    count: number
}

const orbitFullscreenStyles = `
[data-orbit-fullscreen-details] { position:absolute; inset:0; z-index:8; color:#fff; font-family:Montserrat,Arial,Helvetica,sans-serif; pointer-events:none; -webkit-font-smoothing:antialiased; }
[data-orbit-fullscreen-details] * { box-sizing:border-box; }
[data-orbit-fullscreen-details] button { font:inherit; color:inherit; cursor:pointer; -webkit-tap-highlight-color:transparent; touch-action:manipulation; }
[data-orbit-fullscreen-details] button:disabled { cursor:default; opacity:.4; }
[data-orbit-fullscreen-details] button:focus-visible { outline:2px solid white; outline-offset:4px; }
[data-orbit-fullscreen-details] .orbit-fullscreen-brand { position:absolute; top:14px; left:50%; transform:translateX(-50%); width:100px; height:43px; background:white; -webkit-mask-image:var(--orbit-fullscreen-logo); mask-image:var(--orbit-fullscreen-logo); -webkit-mask-size:contain; mask-size:contain; -webkit-mask-position:center; mask-position:center; -webkit-mask-repeat:no-repeat; mask-repeat:no-repeat; filter:drop-shadow(0 1px 4px rgba(0,0,0,.2)); }
[data-orbit-fullscreen-details] .orbit-fullscreen-close { position:absolute; top:10px; right:12px; display:grid; place-items:center; width:44px; height:44px; padding:0; border:1px solid rgba(255,255,255,.45); border-radius:50%; background:rgba(16,24,32,.28); pointer-events:auto; }
[data-orbit-fullscreen-details] .orbit-fullscreen-close svg { width:19px; height:19px; }
[data-orbit-fullscreen-details] .orbit-fullscreen-nav { position:absolute; inset:45% 16px auto; display:flex; justify-content:space-between; align-items:center; pointer-events:none; }
[data-orbit-fullscreen-details] .orbit-fullscreen-nav button { display:grid; place-items:center; width:42px; height:42px; padding:0; border:1px solid rgba(255,255,255,.45); border-radius:50%; background:rgba(16,24,32,.28); pointer-events:auto; font-size:22px; line-height:1; }
[data-orbit-fullscreen-details] .orbit-fullscreen-bar { position:absolute; inset:auto 0 0; display:grid; grid-template-columns:minmax(0,1fr) 96px minmax(0,1fr); align-items:end; gap:18px; min-width:0; padding:35px 28px 16px; background:linear-gradient(0deg,rgba(7,16,24,.85) 0%,rgba(7,16,24,.65) 55%,rgba(7,16,24,0) 100%); }
[data-orbit-fullscreen-details] .orbit-fullscreen-left,[data-orbit-fullscreen-details] .orbit-fullscreen-right { min-width:0; text-align:left; }
[data-orbit-fullscreen-details] .orbit-fullscreen-identity { display:flex; align-items:baseline; flex-wrap:wrap; gap:6px 12px; margin-bottom:10px; }
[data-orbit-fullscreen-details] .orbit-fullscreen-id { margin:0; font-size:24px; font-weight:600; line-height:1; letter-spacing:-.04em; }
[data-orbit-fullscreen-details] .orbit-fullscreen-status { margin:0; font-size:10px; font-weight:400; line-height:1.3; }
[data-orbit-fullscreen-details] .orbit-fullscreen-stats { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:10px; margin:0; }
[data-orbit-fullscreen-details] .orbit-fullscreen-stats>div { min-width:0; text-align:left; }
[data-orbit-fullscreen-details] dt { margin:0 0 5px; font-size:9px; font-weight:400; line-height:1.3; opacity:.8; }
[data-orbit-fullscreen-details] dd { margin:0; font-size:17px; font-weight:500; line-height:1.1; letter-spacing:-.025em; white-space:nowrap; }
[data-orbit-fullscreen-details] dd small { margin-left:3px; font-size:10px; font-weight:400; }
[data-orbit-fullscreen-details] .orbit-fullscreen-plan { display:flex; flex-direction:column; align-items:center; justify-content:flex-end; gap:5px; min-width:0; margin:0; }
[data-orbit-fullscreen-details] .orbit-fullscreen-plan img { display:block; width:82px; height:82px; max-width:100%; object-fit:contain; }
[data-orbit-fullscreen-details] .orbit-fullscreen-plan figcaption { font-size:8px; font-weight:400; opacity:.8; line-height:1.2; }
[data-orbit-fullscreen-details] .orbit-fullscreen-right { display:grid; grid-template-columns:minmax(0,1fr) auto; align-items:end; column-gap:12px; row-gap:9px; }
[data-orbit-fullscreen-details] .orbit-fullscreen-meta { grid-column:1/-1; margin:0; font-size:10px; font-weight:400; line-height:1.5; }
[data-orbit-fullscreen-details] .orbit-fullscreen-price { margin:0; font-size:19px; font-weight:500; line-height:1.15; letter-spacing:-.035em; white-space:nowrap; }
[data-orbit-fullscreen-details] .orbit-fullscreen-price small { margin-left:3px; font-size:11px; font-weight:400; }
[data-orbit-fullscreen-details] .orbit-fullscreen-detail { display:inline-flex; align-items:center; justify-content:center; gap:12px; min-height:38px; padding:8px 13px; border:1px solid rgba(255,255,255,.8); border-radius:0; background:transparent; font-size:10px; white-space:nowrap; pointer-events:auto; }
[data-orbit-fullscreen-details] .orbit-fullscreen-empty { grid-column:1/-1; margin:0; padding:8px 0; text-align:center; font-size:12px; line-height:1.5; }
[data-orbit-fullscreen-details][data-compact="true"] .orbit-fullscreen-bar { grid-template-columns:minmax(0,1fr) 74px minmax(0,1fr); padding:28px 18px 12px; gap:12px; }
[data-orbit-fullscreen-details][data-compact="true"] .orbit-fullscreen-stats { gap:6px; }
[data-orbit-fullscreen-details][data-compact="true"] .orbit-fullscreen-plan img { width:68px; height:68px; }
[data-orbit-fullscreen-details][data-compact="true"] .orbit-fullscreen-right { column-gap:8px; }
[data-orbit-fullscreen-details][data-compact="true"] .orbit-fullscreen-id { font-size:21px; }
[data-orbit-fullscreen-details][data-compact="true"] .orbit-fullscreen-price { font-size:16px; }
[data-orbit-fullscreen-details][data-compact="true"] .orbit-fullscreen-detail { min-height:36px; padding:7px 9px; }
`

function OrbitFullscreenDetails({ apartment, assetBase, language, onOpenDetails, moving, onPrevious, onNext, onClose, checkpoint, count }: OrbitFullscreenDetailsProps) {
    const hu = language !== "en"
    const rootRef = React.useRef<HTMLDivElement>(null)
    const [compact, setCompact] = React.useState(false)
    React.useEffect(() => {
        const root = rootRef.current
        if (!root) return
        const update = () => setCompact(root.clientWidth < 740 || root.clientHeight < 360)
        const observer = new ResizeObserver(update); observer.observe(root); update()
        return () => observer.disconnect()
    }, [])
    const number = new Intl.NumberFormat(hu ? "hu-HU" : "en-GB", { maximumFractionDigits: 2 })
    const known = (value: number | null | undefined) => typeof value === "number" && Number.isFinite(value)
    const area = (value: number | null | undefined) => known(value) ? <>{number.format(value!)}<small>m²</small></> : "—"
    const floorplan = apartment && orbitApartmentAssetUrl(apartment.media?.floorplan?.thumbnail || apartment.media?.floorplan?.full || apartment.floorplan, assetBase)
    const logo = orbitApartmentAssetUrl("assets/brand/admiral-park-full-logo-no-location.svg", assetBase)
    const state = apartment?.status
    const status = state === "available" ? hu ? "Szabad" : "Available" : state === "sold" ? hu ? "Eladva" : "Sold" : state === "under_negotiation" ? hu ? "Tárgyalás alatt" : "In negotiation" : state === "reserved" ? hu ? "Foglalt" : "Reserved" : apartment?.statusLabel || ""
    const meta = apartment ? [apartment.building && `${apartment.building} ${hu ? "épület" : "building"}`, apartment.floorLabel, known(apartment.rooms) && `${number.format(apartment.rooms!)} ${hu ? "szoba" : "rooms"}`, apartment.orientation].filter(Boolean).join(" · ") : ""
    return <div ref={rootRef} data-orbit-fullscreen-details="" data-compact={compact ? "true" : "false"} data-apartment-id={apartment?.id || ""}>
        <style>{orbitFullscreenStyles}</style>
        {logo && <span className="orbit-fullscreen-brand" role="img" aria-label="Admiral Park" style={{ "--orbit-fullscreen-logo": `url("${logo.replace(/["\\]/g, "\\$&")}")` } as React.CSSProperties} />}
        <button type="button" data-orbit-ignore="" data-orbit-fullscreen-close="" className="orbit-fullscreen-close" aria-label={hu ? "Teljes képernyő bezárása" : "Close fullscreen"} onClick={onClose}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="m5 5 14 14M19 5 5 19" /></svg></button>
        <div className="orbit-fullscreen-nav" data-orbit-ignore=""><button type="button" data-orbit-fullscreen-step="previous" disabled={moving} aria-label={hu ? "Előző nézet" : "Previous view"} onClick={onPrevious}>←</button><button type="button" data-orbit-fullscreen-step="next" disabled={moving} aria-label={hu ? "Következő nézet" : "Next view"} onClick={onNext}>→</button></div>
        <div className="orbit-fullscreen-bar" data-orbit-ignore="" aria-live="polite">
            {apartment ? <>
                <div className="orbit-fullscreen-left"><div className="orbit-fullscreen-identity"><p className="orbit-fullscreen-id" data-orbit-fullscreen-field="number">{apartment.id}</p><p className="orbit-fullscreen-status" data-status={state} data-orbit-fullscreen-field="status">{status}</p></div><dl className="orbit-fullscreen-stats"><div data-orbit-fullscreen-field="area"><dt>{hu ? "Lakótér" : "Interior"}</dt><dd>{area(apartment.areaInterior)}</dd></div><div data-orbit-fullscreen-field="terrace"><dt>{hu ? "Terasz" : "Terrace"}</dt><dd>{area(apartment.areaTerrace)}</dd></div><div data-orbit-fullscreen-field="garden"><dt>{hu ? "Kert" : "Garden"}</dt><dd>{area(apartment.areaGarden)}</dd></div></dl></div>
                <figure className="orbit-fullscreen-plan" data-orbit-fullscreen-field="floorplan">{floorplan && <img src={floorplan} alt={`${apartment.id} · ${hu ? "alaprajz" : "floorplan"}`} decoding="async" draggable={false} />}<figcaption>{hu ? "Alaprajz · illusztráció" : "Illustrative floorplan"}</figcaption></figure>
                <div className="orbit-fullscreen-right"><p className="orbit-fullscreen-meta" data-orbit-fullscreen-field="meta">{meta}</p><div><p className="orbit-fullscreen-price" data-orbit-fullscreen-field="price">{known(apartment.price) ? apartment.currency === "HUF" ? <>{number.format(apartment.price! / 1000000)}<small>M Ft</small></> : number.format(apartment.price!) + " " + apartment.currency : hu ? "Ár kérésre" : "Price on request"}</p></div><button type="button" className="orbit-fullscreen-detail" data-orbit-detail-link="" disabled={moving} onClick={onOpenDetails}>{hu ? "Részletek" : "Details"}<span aria-hidden="true">↗</span></button></div>
            </> : <p className="orbit-fullscreen-empty">{hu ? "Koppintson egy lakásra a részletekhez." : "Tap an apartment to see its details."}</p>}
        </div>
        <span style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clipPath: "inset(50%)" }} role="status">{checkpoint >= 0 ? `${hu ? "Nézet" : "View"} ${checkpoint + 1} / ${count}` : hu ? "Nézetváltás" : "Moving to next view"}</span>
    </div>
}
