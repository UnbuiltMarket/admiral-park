import * as React from "react"
import type { ComponentType } from "react"
import { addPropertyControls, ControlType, useIsStaticRenderer } from "framer"

const HOMEPAGE_HERO_NAMES: string[] = __HERO_NAMES__
const HOMEPAGE_ORBIT_NAMES: string[] = __ORBIT_NAMES__
const HOMEPAGE_HERO_VERSION = "__HERO_VERSION__"
const HOMEPAGE_ORBIT_VERSION = "__ORBIT_VERSION__"
const HOMEPAGE_ASSETS = "https://raw.githubusercontent.com/UnbuiltMarket/admiral-park/main/assets"
type HomepageStage = "opening" | "approach" | "building" | "handoff" | "orbit"
interface HomepageTiming { openingOut: number; buildingIn: number; buildingFull: number; ctaIn: number; rise: number }
interface HomepageChannel { snapshot: SequenceSnapshot; timing: HomepageTiming; enabled: boolean }
const homepageChannels = new Map<HTMLElement, HomepageChannel>()
const homepageSubscribers = new Set<() => void>()
const notifyHomepage = () => homepageSubscribers.forEach(update => update())
interface AdmiralHomepageTrialProps {
    useGitHubAssets?: boolean; heroBaseUrl?: string; orbitBaseUrl?: string
    startView?: "opening" | "orbit"; editorView?: "opening" | "building" | "orbit"
    duration?: number; maxSpeed?: number; momentum?: number; triggerDistance?: number
    checkpointCount?: number; motionWidth?: number; orbitMobileWidth?: number; inspectionWidth?: number
    wheelSensitivity?: number; dragSensitivity?: number; orbitMomentum?: number; snapDuration?: number
    focalX?: number; focalY?: number; darken?: number; showControls?: boolean; showViewpoints?: boolean; showDiagnostics?: boolean
    openingOut?: number; buildingIn?: number; buildingFull?: number; ctaIn?: number; rise?: number
    background?: string; alt?: string; style?: React.CSSProperties
}
interface HomepageActions { explore: () => void; overview: () => void; skip: () => void; resumeHero: () => void; orbit: ReturnType<typeof createOrbitPlayer> | null }
const homepageButton: React.CSSProperties = {
    appearance: "none", border: "1px solid rgba(255,255,255,.45)", borderRadius: 6,
    background: "rgba(10,20,28,.78)", color: "#fff", padding: "9px 12px", font: "500 12px/1.3 system-ui,sans-serif", cursor: "pointer",
}
function homepageBlocked(target: EventTarget | null) {
    return target instanceof Element && !!target.closest("nav,header,a,button,input,textarea,select,[contenteditable]:not([contenteditable='false']),[role='button'],[role='link'],[data-orbit-ignore],[data-homepage-controls]")
}
function homepageUrls(base: string, names: string[], version = "") {
    return names.map(name => base.trim().replace(/\/+$/, "") + "/" + encodeURIComponent(name) + (version ? "?v=" + version : ""))
}

/**
 * @framerSupportedLayoutWidth any-prefer-fixed
 * @framerSupportedLayoutHeight any-prefer-fixed
 * @framerIntrinsicWidth 1440
 * @framerIntrinsicHeight 900
 */
export default function AdmiralHomepageTrial(props: AdmiralHomepageTrialProps): React.JSX.Element {
    const {
        useGitHubAssets = true, heroBaseUrl = "", orbitBaseUrl = "", startView = "opening", editorView = "opening",
        duration = 2.5, maxSpeed = 1.8, momentum = .22, triggerDistance = 28, checkpointCount = 8,
        motionWidth = 960, orbitMobileWidth = 640, inspectionWidth = 1920, wheelSensitivity = .025, dragSensitivity = .08,
        orbitMomentum = .18, snapDuration = .32, focalX = 50, focalY = 50, darken = 0,
        showControls = true, showViewpoints = true, showDiagnostics = false,
        openingOut = 20, buildingIn = 68, buildingFull = 88, ctaIn = 86, rise = 20,
        background = "#101820", alt = "Explore Admiral Park, Balatonfüred", style,
    } = props
    const staticRenderer = useIsStaticRenderer()
    const heroUrls = React.useMemo(() => homepageUrls(useGitHubAssets ? HOMEPAGE_ASSETS + "/images/AVIF%2030_1920x1010%20DESKTOP%20HERO%20SEQUENCE" : heroBaseUrl,
        HOMEPAGE_HERO_NAMES, useGitHubAssets ? HOMEPAGE_HERO_VERSION : ""), [useGitHubAssets, heroBaseUrl])
    const orbitUrls = React.useMemo(() => homepageUrls(useGitHubAssets ? HOMEPAGE_ASSETS + "/ORBIT%20PICKER/BEAUTY%20sequence_Desktop" : orbitBaseUrl,
        HOMEPAGE_ORBIT_NAMES, useGitHubAssets ? HOMEPAGE_ORBIT_VERSION : ""), [useGitHubAssets, orbitBaseUrl])
    const previewStage: HomepageStage = staticRenderer ? (editorView === "orbit" ? "orbit" : editorView === "building" ? "building" : "opening") : startView === "orbit" ? "handoff" : "opening"
    const initialPoster = staticRenderer && editorView === "building" ? heroUrls[heroUrls.length - 1] :
        (staticRenderer && editorView === "orbit") || (!staticRenderer && startView === "orbit") ? orbitUrls[0] : heroUrls[0]
    const [stage, setStage] = React.useState<HomepageStage>(previewStage)
    const [posterUrl, setPosterUrl] = React.useState(initialPoster)
    const [heroState, setHeroState] = React.useState<SequenceState>("opening")
    const [orbitInfo, setOrbitInfo] = React.useState<OrbitSnapshot>({ state: "idle", frame: 0, checkpoint: -1, direction: 1, ready: 0, total: orbitUrls.length, decoded: 0, downloaded: 0, position: 0 })
    const [reduced, setReduced] = React.useState(false)
    const [hostVisible, setHostVisible] = React.useState(false)
    const rootRef = React.useRef<HTMLDivElement>(null), heroRootRef = React.useRef<HTMLDivElement>(null)
    const heroCanvasRef = React.useRef<HTMLCanvasElement>(null), orbitCanvasRef = React.useRef<HTMLCanvasElement>(null), posterRef = React.useRef<HTMLImageElement>(null)
    const actions = React.useRef<HomepageActions | null>(null)
    const timing = React.useRef<HomepageTiming>({ openingOut, buildingIn, buildingFull, ctaIn, rise })
    timing.current = { openingOut, buildingIn, buildingFull, ctaIn, rise }

    React.useEffect(() => {
        const root = rootRef.current
        if (!root || staticRenderer) return
        const update = () => {
            const box = root.getBoundingClientRect()
            setHostVisible(box.width > 0 && box.height > 0 && box.bottom > 0 && box.top < innerHeight)
        }
        const resize = new ResizeObserver(update), intersection = new IntersectionObserver(update)
        resize.observe(root); intersection.observe(root); update()
        return () => { resize.disconnect(); intersection.disconnect() }
    }, [staticRenderer])

    React.useEffect(() => {
        const root = rootRef.current, heroRoot = heroRootRef.current, heroCanvas = heroCanvasRef.current, orbitCanvas = orbitCanvasRef.current, poster = posterRef.current
        if (!root || !heroRoot || !heroCanvas || !orbitCanvas || !poster || (!staticRenderer && !hostVisible)) return
        let disposed = false, heroGeneration = 0, enterToken = 0
        let currentStage: HomepageStage = previewStage
        let hero: ReturnType<typeof createHeroSequence> | null = null
        let heroSnapshot: SequenceSnapshot = { state: previewStage === "building" ? "arrival" : "opening", progress: previewStage === "building" ? 1 : 0, frame: previewStage === "building" ? heroUrls.length - 1 : 0, direction: 1, held: false, decoded: 0, downloaded: 0 }
        let arrivedAt = -Infinity, lastWheelAt = -Infinity, wheelIntent = 0, lastUI = 0, lastOrbitUI = ""
        const abort = new AbortController(), signal = abort.signal
        const phone = window.matchMedia("(max-width: 767px)").matches
        const reducedMedia = window.matchMedia("(prefers-reduced-motion: reduce)")
        setReduced(reducedMedia.matches)
        reducedMedia.addEventListener("change", () => setReduced(reducedMedia.matches), { signal })
        const decodeWidth = phone ? orbitMobileWidth : motionWidth
        root.dataset.orbitMotionWidth = String(decodeWidth)
        function isVisible() {
            const box = root!.getBoundingClientRect()
            return box.width > 0 && box.height > 0 && box.bottom > 0 && box.top < innerHeight
        }
        function publish() {
            homepageChannels.set(root!, { snapshot: heroSnapshot, timing: timing.current, enabled: currentStage !== "orbit" && currentStage !== "handoff" })
            notifyHomepage()
        }
        function changeStage(next: HomepageStage) {
            currentStage = next; root!.dataset.homepageStage = next; setStage(next); publish()
        }
        function changePoster(url: string) { poster!.src = url; setPosterUrl(url) }
        function destroyHero() { heroGeneration++; hero?.destroy(); hero = null }
        const orbit = staticRenderer ? null : createOrbitPlayer({
            root, canvas: orbitCanvas, urls: orbitUrls, decodeWidth, inspectionWidth: phone ? Math.min(inspectionWidth, 1280) : inspectionWidth,
            checkpointCount, wheelSensitivity, dragSensitivity, momentum: orbitMomentum, snapDuration, focalX: focalX / 100, focalY: focalY / 100,
            onUpdate(snapshot) {
                if (disposed) return
                root!.dataset.orbitDownloaded = String(snapshot.downloaded)
                const key = `${snapshot.state}:${snapshot.checkpoint}:${Math.floor(snapshot.ready / 6)}`
                const now = performance.now()
                if (key !== lastOrbitUI || (showDiagnostics && now - lastUI > 150)) {
                    lastOrbitUI = key; lastUI = now; setOrbitInfo(snapshot)
                }
            },
        })
        function mountHero(atEnd = false) {
            if (disposed) return
            enterToken++; orbit?.deactivate(); destroyHero()
            changePoster(heroUrls[atEnd ? heroUrls.length - 1 : 0])
            changeStage(atEnd ? "building" : "opening")
            const generation = ++heroGeneration
            hero = createHeroSequence({
                root: heroRoot!, canvas: heroCanvas!, poster: poster!, urls: heroUrls, duration, maxSpeed, momentum, triggerDistance,
                holdScroll: true, preload: true, cacheFrames: phone ? 10 : 14, decodeWidth: phone ? 1280 : 1920, focalX, focalY,
                inputFilter: event => !homepageBlocked(event.target),
                onUpdate(snapshot) {
                    if (disposed || generation !== heroGeneration) return
                    heroSnapshot = snapshot; setHeroState(previous => previous === snapshot.state ? previous : snapshot.state)
                    if (snapshot.state === "arrival" || snapshot.state === "reduced") {
                        if (currentStage !== "building") arrivedAt = performance.now()
                        changeStage("building")
                    } else if (snapshot.state === "opening") changeStage("opening")
                    else if (snapshot.state === "moving" || snapshot.state === "loading") changeStage("approach")
                    else publish()
                },
            })
            if (atEnd) hero.skip()
        }
        async function explore() {
            if (disposed || !orbit || !isVisible() || currentStage === "orbit" || currentStage === "handoff") return
            const token = ++enterToken
            changeStage("handoff"); destroyHero()
            try {
                await orbit.activate(0)
                if (disposed || token !== enterToken) return
                changeStage("orbit")
            } catch { /* The orbit reports a visible retry state. The current hero remains visible. */ }
        }
        function overview() { mountHero(false) }
        const retry = async () => {
            if (!orbit) return
            const token = enterToken
            try {
                await orbit.retry()
                if (disposed || token !== enterToken) return
                if (currentStage === "handoff") {
                    await orbit.activate(0)
                    if (!disposed && token === enterToken) changeStage("orbit")
                }
            } catch { /* The retry control remains available. */ }
        }
        function wheel(event: WheelEvent) {
            const now = performance.now(), gap = now - lastWheelAt; lastWheelAt = now
            const box = root!.getBoundingClientRect()
            if (!isVisible() || event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom || homepageBlocked(event.target) || event.ctrlKey || event.metaKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return
            if (currentStage === "handoff") { if (event.cancelable) event.preventDefault(); return }
            if (currentStage !== "building" || event.deltaY <= 0 || event.defaultPrevented) return
            if (event.cancelable) event.preventDefault()
            if (now - arrivedAt < 200 || gap < 160) { wheelIntent = 0; return }
            wheelIntent += event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? innerHeight : 1)
            if (wheelIntent >= triggerDistance) { wheelIntent = 0; void explore() }
        }
        let touchY: number | null = null, touchCanEnter = false, touchInside = false
        window.addEventListener("touchstart", event => {
            const touch = event.touches.length === 1 ? event.touches[0] : null, box = root!.getBoundingClientRect()
            touchInside = !!touch && isVisible() && touch.clientX >= box.left && touch.clientX <= box.right && touch.clientY >= box.top && touch.clientY <= box.bottom && !homepageBlocked(event.target)
            touchCanEnter = touchInside && currentStage === "building" && performance.now() - arrivedAt > 200
            touchY = touch ? touch.clientY : null
        }, { passive: true, signal })
        window.addEventListener("touchmove", event => {
            if (!touchInside || !isVisible()) return
            if (currentStage === "handoff" && event.touches.length === 1 && !homepageBlocked(event.target)) { if (event.cancelable) event.preventDefault(); return }
            if (!touchCanEnter || touchY === null || event.touches.length !== 1) return
            if (touchY - event.touches[0].clientY > triggerDistance) { touchCanEnter = false; if (event.cancelable) event.preventDefault(); void explore() }
        }, { passive: false, signal })
        window.addEventListener("wheel", wheel, { passive: false, signal })
        window.addEventListener("keydown", event => {
            if (!isVisible() || homepageBlocked(event.target) || event.ctrlKey || event.metaKey || event.altKey) return
            if (event.key === "Escape" && currentStage === "handoff") { mountHero(true); return }
            if (currentStage === "building" && ["ArrowDown", "PageDown", " "].includes(event.key)) { event.preventDefault(); void explore() }
        }, { signal })
        root.addEventListener("admiral:overview", overview, { signal })
        window.addEventListener("admiral:overview", event => { if (event.target === window && root!.getBoundingClientRect().width > 0) overview() }, { signal })
        root.addEventListener("admiral:explore", () => { void explore() }, { signal })
        actions.current = { explore: () => { void explore() }, overview, skip: () => hero?.skip(), resumeHero: () => { if (heroSnapshot.direction < 0) hero?.reverse(); else hero?.start() }, orbit }
        ;(root as HTMLElement & { retryOrbit?: () => Promise<void> }).retryOrbit = retry
        if (staticRenderer) { changeStage(previewStage); changePoster(initialPoster) }
        else {
            changeStage("opening")
            if (startView === "orbit") { changePoster(orbitUrls[0]); void explore() }
            else mountHero()
            // The opening picture wins the first network requests; preload the entire orbit behind it.
            const warm = window.setTimeout(() => { if (!disposed && isVisible()) void orbit!.prepare().catch(() => {}) }, 300)
            signal.addEventListener("abort", () => clearTimeout(warm), { once: true })
        }
        publish()
        return () => {
            disposed = true; enterToken++; destroyHero(); orbit?.destroy(); abort.abort()
            actions.current = null; delete (root as HTMLElement & { retryOrbit?: () => Promise<void> }).retryOrbit
            homepageChannels.delete(root); notifyHomepage()
        }
    }, [heroUrls, orbitUrls, staticRenderer, hostVisible, startView, editorView, duration, maxSpeed, momentum, triggerDistance, checkpointCount,
        motionWidth, orbitMobileWidth, inspectionWidth, wheelSensitivity, dragSensitivity, orbitMomentum, snapDuration, focalX, focalY, showDiagnostics])

    React.useEffect(() => {
        const root = rootRef.current, channel = root && homepageChannels.get(root)
        if (channel) { channel.timing = timing.current; notifyHomepage() }
    }, [openingOut, buildingIn, buildingFull, ctaIn, rise])
    const orbitVisible = !staticRenderer && stage === "orbit"
    const orbitStatic = staticRenderer && editorView === "orbit"
    const percent = Math.round(100 * orbitInfo.ready / Math.max(1, orbitInfo.total))
    const checkpoints = Math.round(Math.max(2, Math.min(16, checkpointCount)))
    const paused = orbitInfo.state === "paused"
    return (
        <div ref={rootRef} data-admiral-homepage="" data-admiral-orbit="" data-homepage-stage={stage} role="region" aria-label={alt} tabIndex={0}
            style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden", background, ...style }}>
            <div ref={heroRootRef} data-admiral-sequence="" style={{ position: "absolute", inset: 0, pointerEvents: stage === "orbit" || stage === "handoff" ? "none" : "auto" }}>
                <img ref={posterRef} src={posterUrl} alt={alt} loading="eager" decoding="async" {...{ fetchpriority: "high" }} crossOrigin="anonymous" draggable={false}
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: `${focalX}% ${focalY}%`, pointerEvents: "none" }} />
                <canvas ref={heroCanvasRef} aria-hidden="true" width={1} height={1} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0 }} />
            </div>
            <canvas ref={orbitCanvasRef} aria-hidden="true" width={1} height={1} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: orbitVisible ? 1 : 0, transition: reduced ? "none" : "opacity .35s", touchAction: "pan-y pinch-zoom", pointerEvents: orbitVisible ? "auto" : "none" }} />
            {orbitStatic && <span style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />}
            <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "#000", opacity: darken, pointerEvents: "none" }} />
            {!staticRenderer && showControls && <div data-homepage-controls="" data-orbit-ignore="" style={{ position: "absolute", bottom: 18, left: "50%", transform: "translateX(-50%)", display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap", gap: 7, width: "max-content", maxWidth: "94%", zIndex: 3 }}>
                {(stage === "opening" || stage === "approach") && <button type="button" style={homepageButton} onClick={() => actions.current?.skip()}>Skip approach</button>}
                {stage === "approach" && (heroState === "paused" || heroState === "error") && <button type="button" style={homepageButton} onClick={() => actions.current?.resumeHero()}>{heroState === "error" ? "Retry approach" : "Continue approach"}</button>}
                {stage === "building" && <button type="button" style={homepageButton} onClick={() => actions.current?.explore()}>Explore building</button>}
                {stage === "handoff" && orbitInfo.state !== "error" && <span role="status" style={{ ...homepageButton, cursor: "default" }}>Preparing orbit {percent}%</span>}
                {(stage === "building" || stage === "handoff") && orbitInfo.state === "error" && <button type="button" style={homepageButton} onClick={() => { void (rootRef.current as (HTMLElement & { retryOrbit?: () => Promise<void> }) | null)?.retryOrbit?.() }}>Retry orbit</button>}
                {(stage === "building" || stage === "handoff" || stage === "orbit") && <button type="button" style={homepageButton} onClick={() => actions.current?.overview()}>Overview</button>}
                {stage === "orbit" && <>
                    <button type="button" aria-label="Previous view" style={homepageButton} onClick={() => actions.current?.orbit?.go(-1)}>←</button>
                    <span aria-live="polite" style={{ ...homepageButton, cursor: "default", minWidth: 65, textAlign: "center" }}>{orbitInfo.checkpoint >= 0 ? `View ${orbitInfo.checkpoint + 1} / ${checkpoints}` : "Looking around"}</span>
                    <button type="button" aria-label="Next view" style={homepageButton} onClick={() => actions.current?.orbit?.go(1)}>→</button>
                    <button type="button" style={homepageButton} onClick={() => paused ? actions.current?.orbit?.resume() : actions.current?.orbit?.pause()}>{paused ? "Continue rotation" : "Pause rotation"}</button>
                    {showViewpoints && Array.from({ length: checkpoints }, (_, i) => <button key={i} type="button" aria-label={`View ${i + 1}`} aria-pressed={orbitInfo.checkpoint === i}
                        style={{ ...homepageButton, padding: "7px 9px", background: orbitInfo.checkpoint === i ? "rgba(255,255,255,.9)" : homepageButton.background, color: orbitInfo.checkpoint === i ? "#101820" : "#fff" }} onClick={() => actions.current?.orbit?.setCheckpoint(i)}>{i + 1}</button>)}
                </>}
            </div>}
            {!staticRenderer && showDiagnostics && <output data-homepage-diagnostics="" style={{ position: "absolute", left: 12, bottom: 94, pointerEvents: "none", background: "rgba(0,0,0,.65)", color: "#fff", padding: 8, borderRadius: 4, font: "11px/1.5 monospace", zIndex: 2 }}>
                {stage} · {orbitInfo.state} · frame {orbitInfo.frame} · ready {orbitInfo.ready}/{orbitInfo.total} · decoded {orbitInfo.decoded}
            </output>}
            <span role="status" aria-live="polite" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clipPath: "inset(50%)" }}>{orbitInfo.state === "error" ? "Orbit unavailable. Retry the images or use the navigation." : ""}</span>
        </div>
    )
}

function createHomepageOverlay(Component: React.ComponentType<any>, kind: "opening" | "building" | "cta"): React.ComponentType<any> {
    const Overlay = React.forwardRef<HTMLElement, any>((props, forwardedRef) => {
        const elementRef = React.useRef<HTMLElement | null>(null)
        const ref = React.useCallback((node: HTMLElement | null) => {
            elementRef.current = node
            if (typeof forwardedRef === "function") forwardedRef(node)
            else if (forwardedRef) forwardedRef.current = node
        }, [forwardedRef])
        React.useEffect(() => {
            const element = elementRef.current
            if (!element?.style) return
            const original = { opacity: element.style.opacity, translate: element.style.translate, pointerEvents: element.style.pointerEvents, visibility: element.style.visibility, hidden: element.getAttribute("aria-hidden"), inert: element.inert }
            let selected: HTMLElement | null = null
            function resolve() {
                if (selected?.isConnected && homepageChannels.has(selected) && selected.getBoundingClientRect().width > 0) return homepageChannels.get(selected)
                let parent = element!.parentElement
                while (parent) {
                    const candidates = [...homepageChannels.keys()].filter(root => parent!.contains(root) && root.getBoundingClientRect().width > 0)
                    if (candidates.length) { selected = candidates[0]; return homepageChannels.get(selected) }
                    parent = parent.parentElement
                }
            }
            function update() {
                const channel = resolve()
                if (!channel) return
                const { progress } = channel.snapshot, t = channel.timing
                const ramp = (from: number, to: number) => sequenceEase(sequenceClamp((progress * 100 - from) / Math.max(1, to - from)))
                const opacity = !channel.enabled ? 0 : kind === "opening" ? 1 - ramp(0, t.openingOut) : kind === "building" ? ramp(t.buildingIn, t.buildingFull) : ramp(t.ctaIn, 100)
                const interactive = opacity >= .98 && (kind !== "cta" || channel.snapshot.state === "arrival" || channel.snapshot.state === "reduced")
                element!.style.opacity = String(opacity); element!.style.translate = `0px ${kind === "opening" ? -(1 - opacity) * t.rise * .6 : (1 - opacity) * t.rise}px`
                element!.style.visibility = opacity < .001 ? "hidden" : original.visibility
                element!.style.pointerEvents = interactive ? original.pointerEvents : "none"; element!.inert = interactive ? original.inert : true
                if (opacity < .01) element!.setAttribute("aria-hidden", "true")
                else if (original.hidden === null) element!.removeAttribute("aria-hidden"); else element!.setAttribute("aria-hidden", original.hidden)
                element!.dataset.heroOverlay = kind
            }
            homepageSubscribers.add(update); update()
            return () => {
                homepageSubscribers.delete(update); element.style.opacity = original.opacity; element.style.translate = original.translate
                element.style.pointerEvents = original.pointerEvents; element.style.visibility = original.visibility; element.inert = original.inert
                if (original.hidden === null) element.removeAttribute("aria-hidden"); else element.setAttribute("aria-hidden", original.hidden)
                delete element.dataset.heroOverlay
            }
        }, [])
        return <Component {...props} ref={ref} style={{ ...props.style, opacity: kind === "opening" ? 1 : 0 }} />
    })
    Overlay.displayName = `Homepage${kind}`
    return Overlay
}
export function OpeningContent(Component: ComponentType<any>): ComponentType { return createHomepageOverlay(Component, "opening") }
export function BuildingContent(Component: ComponentType<any>): ComponentType { return createHomepageOverlay(Component, "building") }
export function ArrivalCTA(Component: ComponentType<any>): ComponentType { return createHomepageOverlay(Component, "cta") }

AdmiralHomepageTrial.displayName = "Admiral Homepage Trial"
addPropertyControls(AdmiralHomepageTrial, {
    useGitHubAssets: { type: ControlType.Boolean, title: "GitHub assets", defaultValue: true },
    heroBaseUrl: { type: ControlType.String, title: "Approach folder", defaultValue: "", hidden: p => p.useGitHubAssets !== false },
    orbitBaseUrl: { type: ControlType.String, title: "Orbit folder", defaultValue: "", hidden: p => p.useGitHubAssets !== false },
    startView: { type: ControlType.Enum, title: "Start trial", options: ["opening", "orbit"], optionTitles: ["Full journey", "Orbit directly"], defaultValue: "opening" },
    editorView: { type: ControlType.Enum, title: "Editor view", options: ["opening", "building", "orbit"], defaultValue: "opening" },
    duration: { type: ControlType.Number, title: "Approach", defaultValue: 2.5, min: .6, max: 10, step: .1, unit: "s" },
    maxSpeed: { type: ControlType.Number, title: "Approach boost", defaultValue: 1.8, min: 1, max: 3, step: .1 },
    momentum: { type: ControlType.Number, title: "Approach coast", defaultValue: .22, min: .08, max: .6, step: .02 },
    triggerDistance: { type: ControlType.Number, title: "Scroll trigger", defaultValue: 28, min: 8, max: 150, step: 1 },
    checkpointCount: { type: ControlType.Number, title: "Viewpoints", defaultValue: 8, min: 2, max: 16, step: 1 },
    motionWidth: { type: ControlType.Number, title: "Orbit decode", defaultValue: 960, min: 480, max: 1920, step: 160, unit: "px" },
    orbitMobileWidth: { type: ControlType.Number, title: "Phone decode", defaultValue: 640, min: 480, max: 1280, step: 160, unit: "px" },
    inspectionWidth: { type: ControlType.Number, title: "Stopped detail", defaultValue: 1920, min: 960, max: 1920, step: 160, unit: "px" },
    wheelSensitivity: { type: ControlType.Number, title: "Wheel speed", defaultValue: .025, min: .005, max: .12, step: .005 },
    dragSensitivity: { type: ControlType.Number, title: "Drag speed", defaultValue: .08, min: .02, max: .3, step: .01 },
    orbitMomentum: { type: ControlType.Number, title: "Orbit coast", defaultValue: .18, min: .05, max: .6, step: .01, unit: "s" },
    snapDuration: { type: ControlType.Number, title: "Settle time", defaultValue: .32, min: .15, max: 1, step: .01, unit: "s" },
    openingOut: { type: ControlType.Number, title: "Opening out", defaultValue: 20, min: 1, max: 50, unit: "%" },
    buildingIn: { type: ControlType.Number, title: "Building in", defaultValue: 68, min: 20, max: 95, unit: "%" },
    buildingFull: { type: ControlType.Number, title: "Building full", defaultValue: 88, min: 40, max: 100, unit: "%" },
    ctaIn: { type: ControlType.Number, title: "CTA in", defaultValue: 86, min: 40, max: 99, unit: "%" },
    rise: { type: ControlType.Number, title: "Text rise", defaultValue: 20, min: 0, max: 60, unit: "px" },
    focalX: { type: ControlType.Number, title: "Focal X", defaultValue: 50, min: 0, max: 100, unit: "%" },
    focalY: { type: ControlType.Number, title: "Focal Y", defaultValue: 50, min: 0, max: 100, unit: "%" },
    darken: { type: ControlType.Number, title: "Darken", defaultValue: 0, min: 0, max: .8, step: .05 },
    showControls: { type: ControlType.Boolean, title: "Trial controls", defaultValue: true },
    showViewpoints: { type: ControlType.Boolean, title: "View buttons", defaultValue: true },
    showDiagnostics: { type: ControlType.Boolean, title: "Diagnostics", defaultValue: false },
    background: { type: ControlType.Color, title: "Background", defaultValue: "#101820" },
    alt: { type: ControlType.String, title: "Image alt", defaultValue: "Explore Admiral Park, Balatonfüred" },
})

// @HERO_CORE_INSERT
// @ORBIT_CORE_INSERT
