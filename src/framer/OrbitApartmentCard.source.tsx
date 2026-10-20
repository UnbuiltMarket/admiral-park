// Shared native apartment dialog used by both homepage and apartment list.
const ORBIT_APARTMENT_CARD_STYLES = __APARTMENT_CARD_STYLES__
const ORBIT_APARTMENT_CARD_SHELL = __APARTMENT_CARD_SHELL__

// @APARTMENT_CARD_RUNTIME_INSERT

interface OrbitApartmentCardController {
    open: (id: string) => void
    close: () => void
    retry: () => unknown
    dispose: () => void
}
export interface AdmiralApartmentDetailCardProps {
    openId: string | null
    dataUrl: string
    assetBase: string
    inquiryUrl: string
    pageUrl: string
    onOpenChange: (open: boolean) => void
    onClosed: () => void
    onReady?: () => void
    /** Reuse the list's loaded JSON instead of issuing another request. */
    dataset?: unknown
    /** Shared card colour variables; updates without rebuilding the runtime. */
    theme?: React.CSSProperties
}

export default function AdmiralApartmentDetailCard(props: AdmiralApartmentDetailCardProps) {
    const { openId, dataUrl, assetBase, inquiryUrl, pageUrl, dataset, theme } = props
    const host = React.useRef<HTMLDivElement | null>(null)
    const controller = React.useRef<OrbitApartmentCardController | null>(null)
    const noticeHost = React.useRef<HTMLDivElement | null>(null)
    const opener = React.useRef<HTMLElement | null>(null)
    const lastRequestedId = React.useRef<string | null>(null)
    const retryFrame = React.useRef<number | null>(null)
    const restoreFrame = React.useRef<number | null>(null)
    const current = React.useRef(props)
    const closing = React.useRef(false)
    current.current = props
    const [started, setStarted] = React.useState(false)
    const [state, setState] = React.useState<"idle" | "loading" | "ready" | "error">("idle")
    const [error, setError] = React.useState("")
    const [nativeOpen, setNativeOpen] = React.useState(false)

    const restoreFocus = React.useCallback(() => {
        if (restoreFrame.current !== null) cancelAnimationFrame(restoreFrame.current)
        restoreFrame.current = requestAnimationFrame(() => {
            restoreFrame.current = null
            const target = opener.current
            if (target?.isConnected && target.getClientRects().length && !target.closest("[inert]")) target.focus({ preventScroll: true })
        })
    }, [])

    React.useEffect(() => () => {
        if (retryFrame.current !== null) cancelAnimationFrame(retryFrame.current)
        if (restoreFrame.current !== null) cancelAnimationFrame(restoreFrame.current)
    }, [])

    React.useEffect(() => {
        if (openId) {
            if (restoreFrame.current !== null) { cancelAnimationFrame(restoreFrame.current); restoreFrame.current = null }
            if (!lastRequestedId.current) opener.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
            closing.current = false
            setStarted(true)
        } else if (lastRequestedId.current && !closing.current) { closing.current = true; restoreFocus() }
        lastRequestedId.current = openId
    }, [openId, restoreFocus])

    React.useEffect(() => {
        if (!started || !host.current) return
        const shadow = host.current.shadowRoot || host.current.attachShadow({ mode: "open" })
        let alive = true
        let lastOpen = false
        shadow.innerHTML = "<style>" + ORBIT_APARTMENT_CARD_STYLES + "\n:host{position:fixed!important;inset:0 auto auto 0!important;width:0!important;height:0!important;min-height:0!important;background:transparent!important;pointer-events:none!important;overflow:visible!important}dialog,.toast{pointer-events:auto}dialog{font-size:14px}</style>" + ORBIT_APARTMENT_CARD_SHELL
        setState("loading")
        setError("")
        setNativeOpen(false)
        try {
            const runtime = mountOrbitApartmentCardRuntime(shadow, {
                dataUrl,
                dataset,
                assetBaseUrl: assetBase,
                inquiryUrl,
                pageUrl: pageUrl || window.location.href,
                apartment: current.current.openId,
                onState: (next: "loading" | "ready" | "error", message: string) => {
                    if (!alive) return
                    setState(next)
                    setError(message || "")
                },
                onReady: () => { if (alive) current.current.onReady?.() },
                onOpenChange: (next: boolean) => {
                    if (!alive || next === lastOpen) return
                    lastOpen = next
                    setNativeOpen(next)
                    current.current.onOpenChange(next)
                    if (!next && !closing.current) { closing.current = true; current.current.onClosed(); restoreFocus() }
                },
            }) as OrbitApartmentCardController
            controller.current = runtime
            return () => {
                // StrictMode disposal must not clear the current apartment selection.
                alive = false
                if (controller.current === runtime) controller.current = null
                runtime.dispose()
                shadow.replaceChildren()
            }
        } catch {
            setState("error")
            setError("Nem sikerült megnyitni a lakás adatait. Próbálja újra.")
            return () => { alive = false; controller.current = null; shadow.replaceChildren() }
        }
    }, [started, dataUrl, assetBase, inquiryUrl, pageUrl, dataset, restoreFocus])

    React.useEffect(() => {
        if (openId) controller.current?.open(openId)
        else controller.current?.close()
    }, [openId, started, dataUrl, assetBase, inquiryUrl, pageUrl, dataset])

    const close = React.useCallback(() => {
        if (closing.current) return
        closing.current = true
        if (retryFrame.current !== null) { cancelAnimationFrame(retryFrame.current); retryFrame.current = null }
        controller.current?.close()
        current.current.onOpenChange(false)
        current.current.onClosed()
        restoreFocus()
    }, [restoreFocus])
    const retry = React.useCallback(() => {
        if (controller.current) {
            controller.current.open(current.current.openId || "")
            controller.current.retry()
        } else {
            setStarted(false)
            if (retryFrame.current !== null) cancelAnimationFrame(retryFrame.current)
            retryFrame.current = requestAnimationFrame(() => { retryFrame.current = null; if (current.current.openId) setStarted(true) })
        }
    }, [])
    const notice = !!openId && !nativeOpen && (state === "loading" || state === "error" || !started)

    React.useEffect(() => {
        if (notice) noticeHost.current?.querySelector<HTMLButtonElement>('button[aria-label="Close apartment details"]')?.focus({ preventScroll: true })
    }, [notice, state])

    return <div
        data-orbit-detail-card=""
        data-orbit-ignore=""
        data-state={state === "idle" && openId ? "loading" : state}
        data-apartment-id={openId || ""}
        style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 30 }}
    >
        <div ref={host} data-orbit-ignore="" style={{ ...theme, position: "fixed", top: 0, left: 0, width: 0, height: 0, pointerEvents: "none" }} />
        {notice && <div
            ref={noticeHost}
            data-orbit-ignore=""
            role="dialog"
            aria-modal="true"
            aria-label="Apartment details"
            onKeyDown={event => {
                if (event.key === "Escape") { event.preventDefault(); event.stopPropagation(); close(); return }
                if (event.key === "Tab") {
                    const buttons = Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>("button:not(:disabled)"))
                    const first = buttons[0], last = buttons[buttons.length - 1]
                    if (first && ((!event.shiftKey && document.activeElement === last) || (event.shiftKey && document.activeElement === first) || !event.currentTarget.contains(document.activeElement))) {
                        event.preventDefault()
                        const target = event.shiftKey ? last : first
                        target?.focus()
                    }
                    event.stopPropagation()
                }
            }}
            style={{ position: "fixed", inset: 0, display: "grid", placeItems: "center", background: "rgba(36,40,36,.42)", backdropFilter: "blur(5px)", pointerEvents: "auto", padding: 20 }}
        >
            <div style={{ position: "relative", width: "min(460px,100%)", padding: "42px 30px 30px", color: "#242824", background: "linear-gradient(180deg,#fdfbfb,#e4e9ec)", font: "14px/1.7 Montserrat,Arial,sans-serif", boxShadow: "0 24px 100px rgba(36,40,36,.22)" }}>
                <button type="button" aria-label="Close apartment details" onClick={close} style={{ position: "absolute", top: 8, right: 12, border: 0, background: "none", color: "inherit", fontSize: 28, cursor: "pointer" }}>×</button>
                <p style={{ margin: "0 0 12px", fontSize: 24, fontWeight: 500 }}>{openId}</p>
                {state === "error" ? <><p role="alert" style={{ margin: "0 0 20px" }}>{error || "Nem sikerült betölteni a lakás adatait."}</p><button type="button" aria-label="Retry apartment details" onClick={retry} style={{ minHeight: 42, padding: "9px 20px", border: "1px solid #a38c69", borderRadius: 999, background: "none", color: "inherit", font: "inherit", cursor: "pointer" }}>Újrapróbálom</button></> : <p role="status" aria-live="polite" style={{ margin: 0 }}>Lakásadatok betöltése…</p>}
            </div>
        </div>}
    </div>
}
