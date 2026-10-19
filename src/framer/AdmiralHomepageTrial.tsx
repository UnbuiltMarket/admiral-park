// Generated complete Framer homepage trial. Paste this entire file into Framer.
import * as React from "react"
import type { ComponentType } from "react"
import { addPropertyControls, ControlType, useIsStaticRenderer } from "framer"

const HOMEPAGE_HERO_NAMES: string[] = ["raw sequence00.avif","raw sequence01.avif","raw sequence02.avif","raw sequence03.avif","raw sequence04.avif","raw sequence05.avif","raw sequence06.avif","raw sequence07.avif","raw sequence08.avif","raw sequence09.avif","raw sequence10.avif","raw sequence11.avif","raw sequence12.avif","raw sequence13.avif","raw sequence14.avif","raw sequence15.avif","raw sequence16.avif","raw sequence17.avif","raw sequence18.avif","raw sequence19.avif","raw sequence20.avif","raw sequence21.avif","raw sequence22.avif","raw sequence23.avif","raw sequence24.avif","raw sequence25.avif","raw sequence26.avif","raw sequence27.avif","raw sequence28.avif","raw sequence29.avif","raw sequence30.avif","raw sequence31.avif","raw sequence32.avif","raw sequence33.avif","raw sequence34.avif","raw sequence35.avif","raw sequence36.avif","raw sequence37.avif","raw sequence38.avif","raw sequence39.avif","raw sequence40.avif","raw sequence41.avif","raw sequence42.avif","raw sequence43.avif","raw sequence44.avif","raw sequence45.avif","raw sequence46.avif","raw sequence47.avif","raw sequence48.avif","raw sequence49.avif","raw sequence50.avif","raw sequence51.avif","raw sequence52.avif","raw sequence53.avif","raw sequence54.avif","raw sequence55.avif","raw sequence56.avif","raw sequence57.avif","raw sequence58.avif","raw sequence59.avif","raw sequence60.avif","raw sequence61.avif","raw sequence62.avif","raw sequence63.avif","raw sequence64.avif"]
const HOMEPAGE_CONNECTION_NAMES: string[] = ["02 sequence00 copy.avif","02 sequence01 copy.avif","02 sequence02 copy.avif","02 sequence03 copy.avif","02 sequence04 copy.avif","02 sequence05 copy.avif","02 sequence06 copy.avif","02 sequence07 copy.avif","02 sequence08 copy.avif","02 sequence09 copy.avif","02 sequence10 copy.avif","02 sequence11 copy.avif","02 sequence12 copy.avif","02 sequence13 copy.avif","02 sequence14 copy.avif","02 sequence15 copy.avif","02 sequence16 copy.avif","02 sequence17 copy.avif","02 sequence18 copy.avif","02 sequence19 copy.avif","02 sequence20 copy.avif","02 sequence21 copy.avif","02 sequence22 copy.avif","02 sequence23 copy.avif","02 sequence24 copy.avif","02 sequence25 copy.avif","02 sequence26 copy.avif","02 sequence27 copy.avif","02 sequence28 copy.avif","02 sequence29 copy.avif","02 sequence30 copy.avif","02 sequence31 copy.avif","02 sequence32 copy.avif","02 sequence33 copy.avif","02 sequence34 copy.avif","02 sequence35 copy.avif","02 sequence36 copy.avif","02 sequence37 copy.avif","02 sequence38 copy.avif","02 sequence39 copy.avif","02 sequence40 copy.avif","02 sequence41 copy.avif","02 sequence42 copy.avif","02 sequence43 copy.avif","02 sequence44 copy.avif","02 sequence45 copy.avif","02 sequence46 copy.avif","02 sequence47 copy.avif","02 sequence48 copy.avif","02 sequence49 copy.avif","02 sequence50 copy.avif","02 sequence51 copy.avif","02 sequence52 copy.avif","02 sequence53 copy.avif","02 sequence54 copy.avif","02 sequence55 copy.avif","02 sequence56 copy.avif","02 sequence57 copy.avif","02 sequence58 copy.avif","02 sequence59 copy.avif","02 sequence60 copy.avif","02 sequence61 copy.avif","02 sequence62 copy.avif","02 sequence63 copy.avif","02 sequence64 copy.avif","02 sequence65 copy.avif","02 sequence66 copy.avif","02 sequence67 copy.avif","02 sequence68 copy.avif","02 sequence69 copy.avif","02 sequence70 copy.avif","02 sequence71 copy.avif","02 sequence72 copy.avif"]
const HOMEPAGE_ORBIT_NAMES: string[] = ["adjusted sequence0000 copy.avif","adjusted sequence0001 copy.avif","adjusted sequence0002 copy.avif","adjusted sequence0003 copy.avif","adjusted sequence0004 copy.avif","adjusted sequence0005 copy.avif","adjusted sequence0006 copy.avif","adjusted sequence0007 copy.avif","adjusted sequence0008 copy.avif","adjusted sequence0009 copy.avif","adjusted sequence0010 copy.avif","adjusted sequence0011 copy.avif","adjusted sequence0012 copy.avif","adjusted sequence0013 copy.avif","adjusted sequence0014 copy.avif","adjusted sequence0015 copy.avif","adjusted sequence0016 copy.avif","adjusted sequence0017 copy.avif","adjusted sequence0018 copy.avif","adjusted sequence0019 copy.avif","adjusted sequence0020 copy.avif","adjusted sequence0021 copy.avif","adjusted sequence0022 copy.avif","adjusted sequence0023 copy.avif","adjusted sequence0024 copy.avif","adjusted sequence0025 copy.avif","adjusted sequence0026 copy.avif","adjusted sequence0027 copy.avif","adjusted sequence0028 copy.avif","adjusted sequence0029 copy.avif","adjusted sequence0030 copy.avif","adjusted sequence0031 copy.avif","adjusted sequence0032 copy.avif","adjusted sequence0033 copy.avif","adjusted sequence0034 copy.avif","adjusted sequence0035 copy.avif","adjusted sequence0036 copy.avif","adjusted sequence0037 copy.avif","adjusted sequence0038 copy.avif","adjusted sequence0039 copy.avif","adjusted sequence0040 copy.avif","adjusted sequence0041 copy.avif","adjusted sequence0042 copy.avif","adjusted sequence0043 copy.avif","adjusted sequence0044 copy.avif","adjusted sequence0045 copy.avif","adjusted sequence0046 copy.avif","adjusted sequence0047 copy.avif","adjusted sequence0048 copy.avif","adjusted sequence0049 copy.avif","adjusted sequence0050 copy.avif","adjusted sequence0051 copy.avif","adjusted sequence0052 copy.avif","adjusted sequence0053 copy.avif","adjusted sequence0054 copy.avif","adjusted sequence0055 copy.avif","adjusted sequence0056 copy.avif","adjusted sequence0057 copy.avif","adjusted sequence0058 copy.avif","adjusted sequence0059 copy.avif","adjusted sequence0060 copy.avif","adjusted sequence0061 copy.avif","adjusted sequence0062 copy.avif","adjusted sequence0063 copy.avif","adjusted sequence0064 copy.avif","adjusted sequence0065 copy.avif","adjusted sequence0066 copy.avif","adjusted sequence0067 copy.avif","adjusted sequence0068 copy.avif","adjusted sequence0069 copy.avif","adjusted sequence0070 copy.avif","adjusted sequence0071 copy.avif","adjusted sequence0072 copy.avif","adjusted sequence0073 copy.avif","adjusted sequence0074 copy.avif","adjusted sequence0075 copy.avif","adjusted sequence0076 copy.avif","adjusted sequence0077 copy.avif","adjusted sequence0078 copy.avif","adjusted sequence0079 copy.avif","adjusted sequence0080 copy.avif","adjusted sequence0081 copy.avif","adjusted sequence0082 copy.avif","adjusted sequence0083 copy.avif","adjusted sequence0084 copy.avif","adjusted sequence0085 copy.avif","adjusted sequence0086 copy.avif","adjusted sequence0087 copy.avif","adjusted sequence0088 copy.avif","adjusted sequence0089 copy.avif","adjusted sequence0090 copy.avif","adjusted sequence0091 copy.avif","adjusted sequence0092 copy.avif","adjusted sequence0093 copy.avif","adjusted sequence0094 copy.avif","adjusted sequence0095 copy.avif","adjusted sequence0096 copy.avif","adjusted sequence0097 copy.avif","adjusted sequence0098 copy.avif","adjusted sequence0099 copy.avif","adjusted sequence0100 copy.avif","adjusted sequence0101 copy.avif","adjusted sequence0102 copy.avif","adjusted sequence0103 copy.avif","adjusted sequence0104 copy.avif","adjusted sequence0105 copy.avif","adjusted sequence0106 copy.avif","adjusted sequence0107 copy.avif","adjusted sequence0108 copy.avif","adjusted sequence0109 copy.avif","adjusted sequence0110 copy.avif","adjusted sequence0111 copy.avif","adjusted sequence0112 copy.avif","adjusted sequence0113 copy.avif","adjusted sequence0114 copy.avif","adjusted sequence0115 copy.avif","adjusted sequence0116 copy.avif","adjusted sequence0117 copy.avif","adjusted sequence0118 copy.avif","adjusted sequence0119 copy.avif"]
const HOMEPAGE_HERO_VERSION = "1d4b64cbfa4f"
const HOMEPAGE_CONNECTION_VERSION = "426c29f22325"
const HOMEPAGE_ORBIT_VERSION = "15fce8a9d4fe"
const HOMEPAGE_ASSETS = "https://raw.githubusercontent.com/UnbuiltMarket/admiral-park/main/assets"
type HomepageStage = "opening" | "approach" | "building" | "connection" | "handoff" | "orbit"
interface HomepageTiming { openingOut: number; buildingIn: number; buildingFull: number; ctaIn: number; rise: number }
interface HomepageChannel { snapshot: SequenceSnapshot; timing: HomepageTiming; enabled: boolean }
const homepageChannels = new Map<HTMLElement, HomepageChannel>()
const homepageSubscribers = new Set<() => void>()
const notifyHomepage = () => homepageSubscribers.forEach(update => update())
interface AdmiralHomepageTrialProps {
    useGitHubAssets?: boolean; heroBaseUrl?: string; connectionBaseUrl?: string; orbitBaseUrl?: string
    startView?: "opening" | "orbit"; editorView?: "opening" | "building" | "connection" | "orbit"; orbitStartFrame?: number
    duration?: number; connectionDuration?: number; maxSpeed?: number; momentum?: number; triggerDistance?: number
    checkpointCount?: number; motionWidth?: number; orbitMobileWidth?: number; inspectionWidth?: number
    desktopBuffer?: number; phoneBuffer?: number
    snapDuration?: number; frameBlend?: number
    focalX?: number; focalY?: number; darken?: number; showControls?: boolean; showViewpoints?: boolean; showDiagnostics?: boolean
    openingOut?: number; buildingIn?: number; buildingFull?: number; ctaIn?: number; rise?: number
    detailsMode?: "preview" | "hover" | "off"; detailsLanguage?: ApartmentDetailsLanguage
    detailsBottom?: number; detailsInset?: number; apartmentPreview?: ApartmentDetailsPreview
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
        useGitHubAssets = true, heroBaseUrl = "", connectionBaseUrl = "", orbitBaseUrl = "", startView = "opening", editorView = "opening", orbitStartFrame = 45,
        duration = 2.5, connectionDuration = 2.5, maxSpeed = 1.8, momentum = .22, triggerDistance = 28, checkpointCount = 8,
        motionWidth = 960, orbitMobileWidth = 640, inspectionWidth = 1920, desktopBuffer = 2, phoneBuffer = 1, snapDuration = 1.5, frameBlend = 0,
        focalX = 50, focalY = 50, darken = 0,
        showControls = true, showViewpoints = true, showDiagnostics = false,
        openingOut = 20, buildingIn = 68, buildingFull = 88, ctaIn = 86, rise = 20,
        detailsMode = "preview", detailsLanguage = "hu", detailsBottom = 32, detailsInset = 48, apartmentPreview,
        background = "#101820", alt = "Explore Admiral Park, Balatonfüred", style,
    } = props
    const staticRenderer = useIsStaticRenderer()
    const heroUrls = React.useMemo(() => homepageUrls(useGitHubAssets ? HOMEPAGE_ASSETS + "/images/AVIF%2030_1920x1010%20DESKTOP%20HERO%20SEQUENCE" : heroBaseUrl,
        HOMEPAGE_HERO_NAMES, useGitHubAssets ? HOMEPAGE_HERO_VERSION : ""), [useGitHubAssets, heroBaseUrl])
    const connectionUrls = React.useMemo(() => homepageUrls(useGitHubAssets ? HOMEPAGE_ASSETS + "/images/SEQ_02_V01" : connectionBaseUrl,
        HOMEPAGE_CONNECTION_NAMES, useGitHubAssets ? HOMEPAGE_CONNECTION_VERSION : ""), [useGitHubAssets, connectionBaseUrl])
    // Keep the displayed SEQ_01 endpoint as the first dissolve layer; the new render differs slightly in colour.
    const connectionPlaybackUrls = React.useMemo(() => [heroUrls[heroUrls.length - 1], ...connectionUrls], [heroUrls, connectionUrls])
    const orbitUrls = React.useMemo(() => homepageUrls(useGitHubAssets ? HOMEPAGE_ASSETS + "/ORBIT%20PICKER/BEAUTY%20sequence_Desktop" : orbitBaseUrl,
        HOMEPAGE_ORBIT_NAMES, useGitHubAssets ? HOMEPAGE_ORBIT_VERSION : ""), [useGitHubAssets, orbitBaseUrl])
    const orbitStartIndex = Math.round(Math.max(0, Math.min(orbitUrls.length - 1, Number.isFinite(orbitStartFrame) ? orbitStartFrame : 45)))
    const orbitPoster = orbitUrls[orbitStartIndex]
    const previewStage: HomepageStage = staticRenderer ? (editorView === "orbit" ? "orbit" : editorView === "building" ? "building" : editorView === "connection" ? "connection" : "opening") : startView === "orbit" ? "handoff" : "opening"
    const initialPoster = staticRenderer && editorView === "connection" ? connectionUrls[Math.floor(connectionUrls.length / 2)] :
        staticRenderer && editorView === "building" ? heroUrls[heroUrls.length - 1] :
        (staticRenderer && editorView === "orbit") || (!staticRenderer && startView === "orbit") ? orbitPoster : heroUrls[0]
    const [stage, setStage] = React.useState<HomepageStage>(previewStage)
    const [posterUrl, setPosterUrl] = React.useState(initialPoster)
    const [heroState, setHeroState] = React.useState<SequenceState>("opening")
    const [orbitInfo, setOrbitInfo] = React.useState<OrbitSnapshot>({ state: "idle", frame: orbitStartIndex, checkpoint: -1, direction: 1, ready: 0, total: orbitUrls.length, decoded: 0, downloaded: 0, buffered: 0, bufferTotal: 0, requiredReady: 0, requiredTotal: 0, position: orbitStartIndex })
    const [reduced, setReduced] = React.useState(false)
    const [hostVisible, setHostVisible] = React.useState(false)
    const [hoveredApartment, setHoveredApartment] = React.useState<ApartmentDetailsData | null>(null)
    const [detailsHeight, setDetailsHeight] = React.useState(140)
    const hoveredApartmentRef = React.useRef<ApartmentDetailsData | null>(null)
    const clearApartmentDetails = React.useCallback(() => {
        if (hoveredApartmentRef.current !== null) { hoveredApartmentRef.current = null; setHoveredApartment(null) }
    }, [])
    const sampleApartment = React.useMemo(() => createApartmentPreview(apartmentPreview), [apartmentPreview])
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
        let activeSequence: "SEQ_01" | "SEQ_02" = "SEQ_01", connectionWarmed = false
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
            homepageChannels.set(root!, { snapshot: heroSnapshot, timing: timing.current, enabled: currentStage === "opening" || currentStage === "approach" || currentStage === "building" })
            notifyHomepage()
        }
        function changeStage(next: HomepageStage) {
            currentStage = next; root!.dataset.homepageStage = next; setStage(next); publish()
        }
        function changePoster(url: string) { poster!.src = url; setPosterUrl(url) }
        function destroyHero() { heroGeneration++; hero?.destroy(); hero = null }
        const orbit = staticRenderer ? null : createOrbitPlayer({
            root, canvas: orbitCanvas, urls: orbitUrls, startFrame: orbitStartIndex, decodeWidth, inspectionWidth: phone ? Math.min(inspectionWidth, 1280) : inspectionWidth,
            checkpointCount, bufferCheckpoints: phone ? phoneBuffer : desktopBuffer, snapDuration, frameBlend: frameBlend / 100, focalX: focalX / 100, focalY: focalY / 100,
            onUpdate(snapshot) {
                if (disposed) return
                root!.dataset.orbitDownloaded = String(snapshot.downloaded)
                if (snapshot.state !== "checkpoint" || snapshot.checkpoint < 0) clearApartmentDetails()
                const key = `${snapshot.state}:${snapshot.checkpoint}:${Math.floor(snapshot.ready / 6)}:${Math.floor(snapshot.buffered / 6)}:${Math.floor(snapshot.requiredReady / 3)}:${snapshot.buffered === snapshot.bufferTotal}:${snapshot.requiredReady === snapshot.requiredTotal}:${snapshot.decoded > snapshot.buffered}`
                const now = performance.now()
                if (key !== lastOrbitUI || (showDiagnostics && now - lastUI > 150)) {
                    lastOrbitUI = key; lastUI = now; setOrbitInfo(snapshot)
                }
            },
        })
        // Prefetch only compressed bytes, using the browser cache. No second decoded sequence lives beside SEQ_01.
        function warmConnection() {
            const connection = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection
            if (connectionWarmed || staticRenderer || reducedMedia.matches || connection?.saveData || /(^|-)2g$/.test(connection?.effectiveType || "")) return
            connectionWarmed = true
            let next = 0
            async function worker() {
                while (!disposed && next < connectionUrls.length) {
                    const url = connectionUrls[next++], request = new AbortController()
                    const cancel = () => request.abort(), timeout = setTimeout(cancel, 10000)
                    signal.addEventListener("abort", cancel, { once: true })
                    try {
                        const response = await fetch(url, { signal: request.signal, mode: "cors", credentials: "omit", cache: "force-cache" })
                        if (response.ok) await response.blob()
                    } catch { /* The active sequence retries a failed background download. */ }
                    finally { clearTimeout(timeout); signal.removeEventListener("abort", cancel) }
                }
            }
            void Promise.all([worker(), worker()])
        }
        function mountHero(atEnd = false) {
            if (disposed) return
            enterToken++; orbit?.deactivate(); destroyHero()
            activeSequence = "SEQ_01"; root!.dataset.activeSequence = activeSequence
            changePoster(heroUrls[atEnd ? heroUrls.length - 1 : 0])
            if (atEnd) heroSnapshot = { state: "arrival", progress: 1, frame: heroUrls.length - 1, direction: 1, held: false, decoded: 0, downloaded: 0 }
            changeStage(atEnd ? "building" : "opening")
            if (atEnd) arrivedAt = performance.now()
            const generation = ++heroGeneration
            hero = createHeroSequence({
                root: heroRoot!, canvas: heroCanvas!, poster: poster!, urls: heroUrls, duration, maxSpeed, momentum, triggerDistance, startAtEnd: atEnd,
                holdScroll: true, preload: true, cacheFrames: phone ? 10 : 14, decodeWidth: phone ? 1280 : 1920, focalX, focalY,
                inputFilter: event => !homepageBlocked(event.target),
                onUpdate(snapshot) {
                    if (disposed || generation !== heroGeneration) return
                    heroSnapshot = snapshot; setHeroState(previous => previous === snapshot.state ? previous : snapshot.state)
                    if (snapshot.state === "moving" || snapshot.state === "loading" || snapshot.state === "arrival") warmConnection()
                    if (snapshot.state === "arrival" || snapshot.state === "reduced") {
                        if (currentStage !== "building") arrivedAt = performance.now()
                        changeStage("building")
                    } else if (snapshot.state === "opening") changeStage("opening")
                    else if (snapshot.state === "moving" || snapshot.state === "loading") changeStage("approach")
                    else publish()
                },
            })
        }
        async function activateOrbit() {
            if (disposed || !orbit || !isVisible()) return
            const token = ++enterToken
            destroyHero(); changeStage("handoff")
            try {
                await orbit.activate()
                if (disposed || token !== enterToken) return
                changeStage("orbit")
            } catch { /* The orbit reports a visible retry state. The completed sequence remains visible. */ }
        }
        function explore() {
            if (disposed || !orbit || !isVisible() || currentStage !== "building") return
            if (reducedMedia.matches) { void activateOrbit(); return }
            enterToken++; destroyHero(); clearApartmentDetails()
            activeSequence = "SEQ_02"; root!.dataset.activeSequence = activeSequence
            changePoster(heroUrls[heroUrls.length - 1]); changeStage("connection")
            const generation = ++heroGeneration
            let completed = false
            hero = createHeroSequence({
                root: heroRoot!, canvas: heroCanvas!, poster: poster!, urls: connectionPlaybackUrls,
                duration: connectionDuration, maxSpeed, momentum, triggerDistance,
                holdScroll: true, preload: true, cacheFrames: phone ? 10 : 14, decodeWidth: phone ? 1280 : 1920, focalX, focalY,
                inputFilter: event => !homepageBlocked(event.target),
                onUpdate(snapshot) {
                    if (disposed || generation !== heroGeneration) return
                    heroSnapshot = snapshot; setHeroState(previous => previous === snapshot.state ? previous : snapshot.state)
                    publish()
                    const arrived = (snapshot.state === "arrival" || snapshot.state === "reduced") && snapshot.frame === connectionPlaybackUrls.length - 1
                    const returned = snapshot.state === "opening" && snapshot.direction < 0 && snapshot.frame === 0
                    if (!completed && (arrived || returned)) {
                        completed = true
                        // Constructors may publish synchronously under reduced motion. Teardown follows assignment, never precedes it.
                        queueMicrotask(() => {
                            if (disposed || generation !== heroGeneration) return
                            if (returned) mountHero(true)
                            else void activateOrbit()
                        })
                    }
                },
            })
            hero.start()
        }
        function overview() { mountHero(false) }
        const retry = async () => {
            if (!orbit) return
            const token = enterToken
            try {
                await orbit.retry()
                if (disposed || token !== enterToken) return
                if (currentStage === "handoff") {
                    await orbit.activate()
                    if (!disposed && token === enterToken) changeStage("orbit")
                }
            } catch { /* The retry control remains available. */ }
        }
        function relayControlClick(event: MouseEvent) {
            if (!isVisible() || root!.contains(event.target as Node) || homepageBlocked(event.target)) return
            for (const button of Array.from(root!.querySelectorAll<HTMLButtonElement>("[data-homepage-controls] button"))) {
                const box = button.getBoundingClientRect()
                if (!button.disabled && box.width > 0 && box.height > 0 && event.clientX >= box.left && event.clientX <= box.right && event.clientY >= box.top && event.clientY <= box.bottom) {
                    event.preventDefault(); event.stopPropagation(); button.click(); return
                }
            }
        }
        window.addEventListener("click", relayControlClick, { capture: true, signal })
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
            if (currentStage === "handoff") {
                if (event.key === "Escape") { mountHero(true); return }
                if (["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " "].includes(event.key)) event.preventDefault()
                return
            }
            if (currentStage === "building" && ["ArrowDown", "PageDown", " "].includes(event.key)) { event.preventDefault(); void explore() }
        }, { signal })
        root.addEventListener("admiral:overview", overview, { signal })
        window.addEventListener("admiral:overview", event => { if (event.target === window && root!.getBoundingClientRect().width > 0) overview() }, { signal })
        root.addEventListener("admiral:explore", () => { void explore() }, { signal })
        actions.current = { explore: () => { void explore() }, overview, skip: () => { if (activeSequence === "SEQ_02" && reducedMedia.matches) void activateOrbit(); else hero?.skip() }, resumeHero: () => { if (heroSnapshot.direction < 0) hero?.reverse(); else hero?.start() }, orbit }
        ;(root as HTMLElement & { retryOrbit?: () => Promise<void> }).retryOrbit = retry
        if (staticRenderer) { changeStage(previewStage); changePoster(initialPoster) }
        else {
            changeStage("opening")
            if (startView === "orbit") { changePoster(orbitPoster); void activateOrbit() }
            else mountHero()
            // The opening picture wins the first network requests; preload the entire orbit behind it.
            const warm = window.setTimeout(() => { if (!disposed && isVisible()) void orbit!.prepare().catch(() => {}) }, 300)
            signal.addEventListener("abort", () => clearTimeout(warm), { once: true })
        }
        publish()
        return () => {
            disposed = true; enterToken++; clearApartmentDetails(); destroyHero(); orbit?.destroy(); abort.abort()
            actions.current = null; delete (root as HTMLElement & { retryOrbit?: () => Promise<void> }).retryOrbit
            homepageChannels.delete(root); notifyHomepage()
        }
    }, [heroUrls, connectionUrls, connectionPlaybackUrls, orbitUrls, staticRenderer, hostVisible, startView, editorView, duration, connectionDuration, maxSpeed, momentum, triggerDistance, checkpointCount,
        motionWidth, orbitMobileWidth, inspectionWidth, desktopBuffer, phoneBuffer, orbitStartIndex, snapDuration, frameBlend, focalX, focalY, showDiagnostics, clearApartmentDetails])

    React.useEffect(() => {
        const root = rootRef.current, channel = root && homepageChannels.get(root)
        if (channel) { channel.timing = timing.current; notifyHomepage() }
    }, [openingOut, buildingIn, buildingFull, ctaIn, rise])
    React.useEffect(() => {
        const root = rootRef.current
        if (!root || staticRenderer) return
        clearApartmentDetails()
        function hover(event: Event) {
            const box = root!.getBoundingClientRect()
            const eligible = detailsMode === "hover" && box.width > 0 && box.height > 0 && box.bottom > 0 && box.top < innerHeight && box.right > 0 && box.left < innerWidth &&
                root!.dataset.homepageStage === "orbit" && root!.dataset.orbitState === "checkpoint" && Number(root!.dataset.orbitCheckpoint) >= 0
            const apartment = eligible ? normalizeApartmentDetails((event as CustomEvent<unknown>).detail) : null
            hoveredApartmentRef.current = apartment; setHoveredApartment(apartment)
        }
        root.addEventListener("admiral:apartment-hover", hover)
        root.addEventListener("pointerleave", clearApartmentDetails)
        return () => { root.removeEventListener("admiral:apartment-hover", hover); root.removeEventListener("pointerleave", clearApartmentDetails) }
    }, [detailsMode, staticRenderer, clearApartmentDetails])
    const orbitVisible = !staticRenderer && stage === "orbit"
    const orbitStatic = staticRenderer && editorView === "orbit"
    const percent = Math.round(100 * orbitInfo.downloaded / Math.max(1, orbitInfo.total))
    const requiredPercent = Math.round(100 * orbitInfo.requiredReady / Math.max(1, orbitInfo.requiredTotal))
    const preparationPercent = Math.min(percent, requiredPercent)
    const checkpoints = Math.round(Math.max(2, Math.min(16, checkpointCount)))
    const paused = orbitInfo.state === "paused"
    const orbitMoving = orbitInfo.state !== "checkpoint"
    const orbitButtonStyle: React.CSSProperties = { ...homepageButton, opacity: orbitMoving ? .45 : 1, cursor: orbitMoving ? "default" : "pointer" }
    const detailsVisible = detailsMode === "preview" ? (orbitStatic || (orbitVisible && orbitInfo.state === "checkpoint")) :
        detailsMode === "hover" && orbitVisible && orbitInfo.state === "checkpoint" && orbitInfo.checkpoint >= 0 && hoveredApartment !== null
    const detailsData = detailsMode === "preview" ? sampleApartment : hoveredApartment
    const controlsBottom = detailsVisible ? `calc(${detailsBottom + detailsHeight + 20}px + env(safe-area-inset-bottom, 0px))` : "18px"
    const diagnosticBottom = detailsVisible ? detailsBottom + detailsHeight + (showControls ? 112 : 20) : 94
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
            {!staticRenderer && showControls && <div data-homepage-controls="" data-orbit-ignore="" style={{ position: "absolute", bottom: controlsBottom, left: "50%", transform: "translateX(-50%)", display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap", gap: 7, width: "max-content", maxWidth: "94%", zIndex: 3 }}>
                {(stage === "opening" || stage === "approach") && <button type="button" style={homepageButton} onClick={() => actions.current?.skip()}>Skip approach</button>}
                {stage === "approach" && (heroState === "paused" || heroState === "error") && <button type="button" style={homepageButton} onClick={() => actions.current?.resumeHero()}>{heroState === "error" ? "Retry approach" : "Continue approach"}</button>}
                {stage === "connection" && <button type="button" style={homepageButton} onClick={() => actions.current?.skip()}>Skip connection</button>}
                {stage === "connection" && (heroState === "paused" || heroState === "error") && <button type="button" style={homepageButton} onClick={() => actions.current?.resumeHero()}>{heroState === "error" ? "Retry connection" : "Continue connection"}</button>}
                {stage === "building" && <button type="button" style={homepageButton} onClick={() => actions.current?.explore()}>Explore building</button>}
                {stage === "handoff" && orbitInfo.state !== "error" && <span role="status" style={{ ...homepageButton, cursor: "default" }}>Preparing orbit {preparationPercent}%</span>}
                {(stage === "building" || stage === "handoff" || stage === "orbit") && orbitInfo.state === "error" && <button type="button" style={homepageButton} onClick={() => { void (rootRef.current as (HTMLElement & { retryOrbit?: () => Promise<void> }) | null)?.retryOrbit?.() }}>Retry orbit</button>}
                {(stage === "building" || stage === "connection" || stage === "handoff" || stage === "orbit") && <button type="button" style={homepageButton} onClick={() => actions.current?.overview()}>Overview</button>}
                {stage === "orbit" && <>
                    <button type="button" aria-label="Previous view" disabled={orbitMoving} style={orbitButtonStyle} onClick={() => actions.current?.orbit?.go(-1)}>←</button>
                    <span aria-live="polite" style={{ ...homepageButton, cursor: "default", minWidth: 65, textAlign: "center" }}>{orbitInfo.checkpoint >= 0 ? `View ${orbitInfo.checkpoint + 1} / ${checkpoints}` : orbitInfo.state === "checkpoint" ? "Custom view" : orbitInfo.state === "buffering" ? "Preparing view…" : orbitInfo.state === "error" ? "View unavailable" : "Looking around"}</span>
                    <button type="button" aria-label="Next view" disabled={orbitMoving} style={orbitButtonStyle} onClick={() => actions.current?.orbit?.go(1)}>→</button>
                    <button type="button" disabled={orbitInfo.state === "error"} style={homepageButton} onClick={() => paused ? actions.current?.orbit?.resume() : actions.current?.orbit?.pause()}>{paused ? "Continue rotation" : "Pause rotation"}</button>
                    {showViewpoints && Array.from({ length: checkpoints }, (_, i) => <button key={i} type="button" aria-label={`View ${i + 1}`} aria-pressed={orbitInfo.checkpoint === i} disabled={orbitMoving}
                        style={{ ...orbitButtonStyle, padding: "7px 9px", background: orbitInfo.checkpoint === i ? "rgba(255,255,255,.9)" : homepageButton.background, color: orbitInfo.checkpoint === i ? "#101820" : "#fff" }} onClick={() => actions.current?.orbit?.setCheckpoint(i)}>{i + 1}</button>)}
                </>}
            </div>}
            {!staticRenderer && !showControls && stage === "connection" && (heroState === "paused" || heroState === "error") && <div data-homepage-controls="" data-orbit-ignore="" style={{ position: "absolute", bottom: 18, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 7, zIndex: 3 }}>
                <button type="button" style={homepageButton} onClick={() => actions.current?.resumeHero()}>{heroState === "error" ? "Retry connection" : "Continue connection"}</button>
                <button type="button" style={homepageButton} onClick={() => actions.current?.overview()}>Overview</button>
            </div>}
            {!staticRenderer && !showControls && orbitInfo.state === "buffering" && <span role="status" style={{ ...homepageButton, position: "absolute", bottom: 18, left: "50%", transform: "translateX(-50%)", pointerEvents: "none", zIndex: 3 }}>Preparing view…</span>}
            {!staticRenderer && !showControls && orbitInfo.state === "error" && <div data-homepage-controls="" data-orbit-ignore="" style={{ position: "absolute", bottom: 18, left: "50%", transform: "translateX(-50%)", zIndex: 3 }}>
                <button type="button" style={homepageButton} onClick={() => { void (rootRef.current as (HTMLElement & { retryOrbit?: () => Promise<void> }) | null)?.retryOrbit?.() }}>Retry orbit</button>
            </div>}
            {detailsMode !== "off" && <ApartmentDetailsStrip apartment={detailsData} language={detailsLanguage} visible={detailsVisible} preview={detailsMode === "preview"}
                bottom={detailsBottom} inset={detailsInset} onHeightChange={setDetailsHeight} />}
            {!staticRenderer && showDiagnostics && <output data-homepage-diagnostics="" style={{ position: "absolute", left: 12, bottom: diagnosticBottom, pointerEvents: "none", background: "rgba(0,0,0,.65)", color: "#fff", padding: 8, borderRadius: 4, font: "11px/1.5 monospace", zIndex: 2 }}>
                {stage} · {orbitInfo.state} · frame {orbitInfo.frame} · downloaded {orbitInfo.downloaded}/{orbitInfo.total} · buffered {orbitInfo.buffered}/{orbitInfo.bufferTotal} · required {orbitInfo.requiredReady}/{orbitInfo.requiredTotal} · decoded {orbitInfo.decoded}
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
    heroBaseUrl: { type: ControlType.String, title: "SEQ_01 folder", defaultValue: "", hidden: p => p.useGitHubAssets !== false },
    connectionBaseUrl: { type: ControlType.String, title: "SEQ_02 folder", defaultValue: "", hidden: p => p.useGitHubAssets !== false },
    orbitBaseUrl: { type: ControlType.String, title: "Orbit folder", defaultValue: "", hidden: p => p.useGitHubAssets !== false },
    startView: { type: ControlType.Enum, title: "Start trial", options: ["opening", "orbit"], optionTitles: ["Full journey", "Orbit directly"], defaultValue: "opening" },
    editorView: { type: ControlType.Enum, title: "Editor view", options: ["opening", "building", "connection", "orbit"], optionTitles: ["SEQ_01 opening", "SEQ_01 arrival", "SEQ_02 midway", "Orbit"], defaultValue: "opening" },
    orbitStartFrame: { type: ControlType.Number, title: "Orbit start frame", defaultValue: 45, min: 0, max: HOMEPAGE_ORBIT_NAMES.length - 1, step: 1, description: "Exact first orbit image, numbered 0–119 to match the filenames. With 8 viewpoints: 0 = camera 1, 15 = camera 2, 30 = camera 3, 45 = camera 4. Custom frames stay still until the next gesture; the checkpoint cameras stay fixed." },
    duration: { type: ControlType.Number, title: "SEQ_01 duration", defaultValue: 2.5, min: .6, max: 10, step: .1, unit: "s" },
    connectionDuration: { type: ControlType.Number, title: "SEQ_02 duration", defaultValue: 2.5, min: .6, max: 10, step: .1, unit: "s", description: "Flight time from the SEQ_01 arrival into the orbit. Uses the same scroll trigger, boost, coast, reversal and 0.8-second endpoint fades as SEQ_01." },
    maxSpeed: { type: ControlType.Number, title: "Flight boost", defaultValue: 1.8, min: 1, max: 3, step: .1, description: "Scroll acceleration for both SEQ_01 and SEQ_02." },
    momentum: { type: ControlType.Number, title: "Flight coast", defaultValue: .22, min: .08, max: .6, step: .02, description: "Momentum response for both SEQ_01 and SEQ_02." },
    triggerDistance: { type: ControlType.Number, title: "Scroll trigger", defaultValue: 28, min: 8, max: 150, step: 1 },
    checkpointCount: { type: ControlType.Number, title: "Viewpoints", defaultValue: 8, min: 2, max: 16, step: 1 },
    motionWidth: { type: ControlType.Number, title: "Orbit decode", defaultValue: 960, min: 480, max: 1920, step: 160, unit: "px" },
    orbitMobileWidth: { type: ControlType.Number, title: "Phone decode", defaultValue: 640, min: 480, max: 1280, step: 160, unit: "px" },
    inspectionWidth: { type: ControlType.Number, title: "Stopped detail", defaultValue: 1920, min: 960, max: 1920, step: 160, unit: "px" },
    desktopBuffer: { type: ControlType.Number, title: "Desktop buffer", defaultValue: 2, min: 1, max: 3, step: 1, description: "Checkpoints decoded ahead and behind on desktop. With 8 viewpoints, 2 keeps up to 61 movement frames. All 120 compressed images stay downloaded." },
    phoneBuffer: { type: ControlType.Number, title: "Phone buffer", defaultValue: 1, min: 1, max: 3, step: 1, description: "Checkpoints decoded ahead and behind on phones. With 8 viewpoints, 1 keeps up to 31 movement frames. Increasing this uses more memory." },
    snapDuration: { type: ControlType.Number, title: "Settle time", defaultValue: 1.5, min: .15, max: 10, step: .05, unit: "s", description: "Time for one checkpoint move: slow start, quicker middle, slow arrival. New input is ignored until arrival." },
    frameBlend: { type: ControlType.Number, title: "Frame blend", defaultValue: 0, min: 0, max: 100, step: 5, unit: "%", description: "Crossfade neighbouring orbit frames. 0% keeps frames crisp; 100% blends throughout each frame interval. Strong blending can produce double edges." },
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
    detailsMode: { type: ControlType.Enum, title: "Apartment details", options: ["preview", "hover", "off"], optionTitles: ["Sample", "Hover", "Off"], defaultValue: "preview", description: "Sample previews the design with example values. Hover waits for apartment data from the future picking masks. Off hides the strip." },
    detailsLanguage: { type: ControlType.Enum, title: "Details language", options: ["hu", "en"], optionTitles: ["Magyar", "English"], defaultValue: "hu", hidden: p => p.detailsMode === "off" },
    detailsBottom: { type: ControlType.Number, title: "Details bottom", defaultValue: 32, min: 0, max: 160, step: 1, unit: "px", hidden: p => p.detailsMode === "off" },
    detailsInset: { type: ControlType.Number, title: "Details margin", defaultValue: 48, min: 0, max: 120, step: 1, unit: "px", hidden: p => p.detailsMode === "off" },
    apartmentPreview: { type: ControlType.Object, title: "Sample apartment", hidden: p => p.detailsMode !== undefined && p.detailsMode !== "preview", controls: {
        number: { type: ControlType.String, title: "Apartment", defaultValue: "A.204" },
        area: { type: ControlType.Number, title: "Area", defaultValue: 66.4, min: 0, max: 500, step: .1, unit: "m²" },
        terrace: { type: ControlType.Number, title: "Terrace", defaultValue: 12.8, min: 0, max: 500, step: .1, unit: "m²" },
        garden: { type: ControlType.Number, title: "Garden", defaultValue: 0, min: 0, max: 3000, step: .1, unit: "m²" },
        rooms: { type: ControlType.Number, title: "Rooms", defaultValue: 3, min: 0, max: 20, step: .5 },
        availability: { type: ControlType.Enum, title: "Availability", options: ["available", "reserved", "sold"], optionTitles: ["Available", "Reserved", "Sold"], defaultValue: "available" },
        floorplan: { type: ControlType.Image, title: "Floorplan" },
    } },
    background: { type: ControlType.Color, title: "Background", defaultValue: "#101820" },
    alt: { type: ControlType.String, title: "Image alt", defaultValue: "Explore Admiral Park, Balatonfüred" },
})

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
    opacity: 0;
    visibility: hidden;
    transform: translateY(8px);
    transition: opacity 180ms ease, transform 180ms ease, visibility 0s linear 180ms;
}
[data-apartment-details][data-details-visible="true"] {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
    transition-delay: 0s;
}
[data-apartment-details] *, [data-apartment-details] *::before, [data-apartment-details] *::after {
    box-sizing: border-box;
    pointer-events: none !important;
}
[data-apartment-details] .admiral-details-grid {
    display: grid;
    grid-template-columns: minmax(95px,1.05fr) minmax(80px,.95fr) minmax(65px,.85fr) minmax(60px,.8fr) minmax(55px,.65fr) minmax(100px,1fr) 112px;
    column-gap: clamp(14px,2.2cqw,40px);
    align-items: start;
    padding-top: 19px;
    border-top: 1px solid rgba(255,255,255,.75);
}
[data-apartment-details] .admiral-details-field { min-width: 0; }
[data-apartment-details] .admiral-details-label {
    display: flex;
    align-items: baseline;
    gap: 7px;
    min-height: 11px;
    margin: 0 0 12px;
    color: rgba(255,255,255,.62);
    font-size: 9px;
    line-height: 1.2;
    font-weight: 400;
    letter-spacing: .15em;
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
    font-size: 28px;
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
    font-size: 32px;
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
    font-size: 15px;
    line-height: 1.45;
    letter-spacing: .015em;
    overflow-wrap: anywhere;
}
[data-apartment-details] .admiral-details-plan .admiral-details-label { margin-bottom: 10px; }
[data-apartment-details] .admiral-details-plan-image {
    display: block;
    width: 112px;
    height: 78px;
    max-width: 100%;
    object-fit: contain;
    object-position: right top;
}
[data-apartment-details] .admiral-details-plan-empty {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 112px;
    height: 78px;
    max-width: 100%;
    color: rgba(255,255,255,.6);
    font-size: 10px;
    line-height: 1.4;
    text-align: right;
}
@container admiral-apartment (max-width: 820px) {
    [data-apartment-details] .admiral-details-grid {
        grid-template-columns: repeat(4,minmax(0,1fr));
        column-gap: 12px;
        row-gap: 15px;
        padding-top: 14px;
    }
    [data-apartment-details] .admiral-details-number { grid-area: 1 / 1 / 2 / 2; }
    [data-apartment-details] .admiral-details-status { grid-area: 1 / 2 / 2 / 4; padding-left: 10px; }
    [data-apartment-details] .admiral-details-plan { grid-area: 1 / 4 / 2 / 5; justify-self: end; }
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
    [data-apartment-details] .admiral-details-plan .admiral-details-label { margin-bottom: 6px; text-align: right; justify-content: flex-end; }
    [data-apartment-details] .admiral-details-plan-image, [data-apartment-details] .admiral-details-plan-empty { width: 92px; height: 58px; }
}
@container admiral-apartment (max-width: 360px) {
    [data-apartment-details] .admiral-details-grid { column-gap: 8px; }
    [data-apartment-details] .admiral-details-label { font-size: 8px; letter-spacing: .07em; }
    [data-apartment-details] .admiral-details-value { font-size: 20px; }
    [data-apartment-details] .admiral-details-number .admiral-details-value { font-size: 24px; }
    [data-apartment-details] .admiral-details-status { padding-left: 4px; }
    [data-apartment-details] .admiral-details-plan-image, [data-apartment-details] .admiral-details-plan-empty { width: 74px; height: 53px; }
}
@media (prefers-reduced-motion: reduce) {
    [data-apartment-details] { transform: none; transition: none; }
}
`

function ApartmentDetailsStrip({ apartment, language, visible, preview, bottom, inset, onHeightChange }: {
    apartment: ApartmentDetailsData | null
    language: ApartmentDetailsLanguage
    visible: boolean
    preview: boolean
    bottom: number
    inset: number
    onHeightChange?: (height: number) => void
}): React.JSX.Element {
    const last = React.useRef<{ apartment: ApartmentDetailsData; preview: boolean } | null>(apartment ? { apartment, preview } : null)
    if (apartment) last.current = { apartment, preview }
    const displayed = apartment ? { apartment, preview } : last.current
    const data: ApartmentDetailsData = displayed?.apartment ?? { number: "—", area: null, terrace: null, garden: null, rooms: null, availability: "" }
    const sample = displayed?.preview ?? preview
    const shown = visible && apartment !== null
    const hu = language !== "en"
    const labels = hu ? { number: "Lakás", area: "Alapterület", terrace: "Terasz", garden: "Kert", rooms: "Szobák", availability: "Státusz", floorplan: "Alaprajz" } :
        { number: "Apartment", area: "Area", terrace: "Terrace", garden: "Garden", rooms: "Rooms", availability: "Availability", floorplan: "Floor plan" }
    const sampleLabel = hu ? "MINTA" : "SAMPLE"
    const statusCode = data.availability.toLowerCase()
    const status = statusCode === "available" ? hu ? "Szabad" : "Available" : statusCode === "reserved" ? hu ? "Foglalt" : "Reserved" : statusCode === "sold" ? hu ? "Eladva" : "Sold" : data.availability
    const formatter = new Intl.NumberFormat(hu ? "hu-HU" : "en-GB", { maximumFractionDigits: 1 })
    const root = React.useRef<HTMLDivElement>(null)
    const heightCallback = React.useRef(onHeightChange), measuredHeight = React.useRef(-1)
    heightCallback.current = onHeightChange
    const [failedFloorplan, setFailedFloorplan] = React.useState("")
    React.useEffect(() => {
        const element = root.current
        if (!element) return
        const measure = () => {
            const height = Math.ceil(element.getBoundingClientRect().height)
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
    return <div ref={root} data-apartment-details="" data-details-preview={sample ? "true" : "false"} data-details-visible={shown ? "true" : "false"}
        role="region" aria-label={`${hu ? "Lakásadatok" : "Apartment details"}${sample ? hu ? " — minta" : " — sample" : ""}`} aria-hidden={!shown}
        style={{ position: "absolute", left: `min(${safeInset}px, 4%)`, right: `min(${safeInset}px, 4%)`, bottom: `calc(${safeBottom}px + env(safe-area-inset-bottom, 0px))`, zIndex: 4, pointerEvents: "none" }}>
        <style>{apartmentDetailsStyles}</style>
        <div className="admiral-details-grid">
            <div className="admiral-details-field admiral-details-number" data-apartment-field="number">
                <div className="admiral-details-label">{labels.number}{sample && <span className="admiral-details-sample">{sampleLabel}</span>}</div>
                <div className="admiral-details-value">{data.number}</div>
            </div>
            {metric("area")}{metric("terrace")}{metric("garden")}{metric("rooms", false)}
            <div className="admiral-details-field admiral-details-status" data-apartment-field="availability">
                <div className="admiral-details-label">{labels.availability}</div>
                <div className="admiral-details-value">{status || "—"}</div>
            </div>
            <div className="admiral-details-field admiral-details-plan" data-apartment-field="floorplan">
                <div className="admiral-details-label">{labels.floorplan}</div>
                {floorplan ? <img className="admiral-details-plan-image" src={floorplan} alt={hu ? `${data.number} lakás alaprajza` : `Floor plan of apartment ${data.number}`} loading="lazy" decoding="async" draggable={false} onError={() => setFailedFloorplan(floorplan)} /> : sample ?
                    <svg className="admiral-details-plan-image" viewBox="0 0 112 78" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label={hu ? "Mintaalaprajz — nem valódi lakás" : "Sample floor plan — not an actual apartment"}>
                        <path d="M7 6H105V58H77V69H7V6Z" stroke="currentColor" strokeWidth="1.3" />
                        <path d="M47 6V29M47 39V69M7 43H28M37 43H47M47 29H70M80 29H105M77 29V58M47 53H61M70 53H77" stroke="currentColor" strokeWidth="1.1" />
                        <path d="M47 39A10 10 0 0 0 37 29H47M37 43A9 9 0 0 0 28 34V43M80 29A10 10 0 0 0 70 19V29M70 53A9 9 0 0 0 61 44V53" stroke="currentColor" strokeWidth=".65" opacity=".65" />
                        <path d="M15 6H36M7 14V31M57 6H90M105 36V50M15 69H36M86 58H98" stroke="currentColor" strokeWidth="2.8" />
                        <text x="101" y="73" textAnchor="end" fill="currentColor" fontSize="6" letterSpacing="1.2" fontFamily="inherit" opacity=".75">{sampleLabel}</text>
                    </svg> : <span className="admiral-details-plan-empty">{hu ? "Nem elérhető" : "Unavailable"}</span>}
            </div>
        </div>
    </div>
}

type SequenceState = "opening" | "loading" | "moving" | "arrival" | "paused" | "error" | "reduced";
interface SequenceSnapshot {
    state: SequenceState; progress: number; frame: number; direction: number;
    held: boolean; decoded: number; downloaded: number;
}
interface SequenceOptions {
    root: HTMLElement; canvas: HTMLCanvasElement; poster: HTMLImageElement; urls: string[];
    duration?: number; maxSpeed?: number; momentum?: number; triggerDistance?: number;
    preload?: boolean; holdScroll?: boolean; cacheFrames?: number; decodeWidth?: number;
    startAtEnd?: boolean;
    focalX?: number; focalY?: number; timeoutMs?: number;
    onUpdate?: (snapshot: SequenceSnapshot) => void;
    inputFilter?: (event: Event) => boolean;
}
interface SequenceBitmap {
    image: CanvasImageSource; width: number; height: number; close: () => void;
}
// One active hold per document, including multiple Framer breakpoint instances.
let sequenceScrollOwner: HTMLElement | null = null;
function sequenceClamp(n: number, min = 0, max = 1) { return Math.min(max, Math.max(min, n)); }
function sequenceEase(n: number) { return n * n * (3 - 2 * n); }

/** Encoded bytes are inexpensive; decoded pixels have an explicitly bounded lifetime. */
function createSequenceFrames(urls: string[], width: number, limit: number, notify: () => void) {
    const abort = new AbortController();
    const blobs = new Map<number, Blob>();
    const bitmaps = new Map<number, SequenceBitmap>();
    const fetching = new Set<number>(), decoding = new Set<number>(), failed = new Set<number>(), retrying = new Set<number>();
    let disposed = false, all = false, center = 0, wanted: number[] = [0], downloads = 0;
    const last = urls.length - 1;
    const valid = (n: number) => n >= 0 && n <= last;
    function evict() {
        while (bitmaps.size > limit) {
            const candidates = [...bitmaps.keys()].filter(i => i !== center && i !== 0 && i !== last);
            candidates.sort((a, b) => Math.abs(b - center) - Math.abs(a - center));
            const index = candidates[0];
            if (index === undefined) break;
            bitmaps.get(index)?.close(); bitmaps.delete(index);
        }
    }
    async function decode(index: number) {
        decoding.add(index);
        let bitmap: SequenceBitmap | undefined;
        try {
            const blob = blobs.get(index)!;
            if (typeof createImageBitmap === "function") {
                try {
                    const image = await createImageBitmap(blob, { resizeWidth: width, resizeQuality: "high" });
                    bitmap = { image, width: image.width, height: image.height, close: () => image.close() };
                } catch { /* Safari/older engines can fall back to HTMLImageElement.decode. */ }
            }
            if (!bitmap) {
                const image = new Image();
                const objectURL = URL.createObjectURL(blob);
                try {
                    image.src = objectURL;
                    await image.decode();
                    bitmap = { image, width: image.naturalWidth, height: image.naturalHeight, close: () => { image.src = ""; } };
                } finally { URL.revokeObjectURL(objectURL); }
            }
            if (disposed || !wanted.includes(index)) bitmap.close();
            else { bitmaps.set(index, bitmap); evict(); }
        } catch { if (!disposed) failed.add(index); }
        finally { decoding.delete(index); if (!disposed) { notify(); pump(); } }
    }
    async function fetchFrame(index: number) {
        fetching.add(index);
        const requestAbort = new AbortController();
        const timeout = setTimeout(() => requestAbort.abort(), 10000);
        const cancel = () => requestAbort.abort();
        abort.signal.addEventListener("abort", cancel, { once: true });
        try {
            const response = await fetch(urls[index], { signal: requestAbort.signal, mode: "cors", credentials: "omit", cache: retrying.has(index) ? "reload" : "force-cache" });
            if (!response.ok) throw new Error("Frame " + index + ": " + response.status);
            const blob = await response.blob();
            if (!disposed) { blobs.set(index, blob); retrying.delete(index); downloads++; }
        } catch { if (!disposed) failed.add(index); }
        finally {
            clearTimeout(timeout); abort.signal.removeEventListener("abort", cancel); fetching.delete(index);
            if (!disposed) { notify(); pump(); }
        }
    }
    function pump() {
        if (disposed) return;
        const queue = all ? [...new Set([...wanted, ...urls.map((_, i) => i)])] : wanted;
        for (const index of queue) {
            if (fetching.size >= 4) break;
            if (!blobs.has(index) && !fetching.has(index) && !failed.has(index)) void fetchFrame(index);
        }
        for (const index of wanted) {
            if (decoding.size >= 2) break;
            if (blobs.has(index) && !bitmaps.has(index) && !decoding.has(index) && !failed.has(index)) void decode(index);
        }
    }
    return {
        request(index: number, direction: number, full = false, single = false) {
            center = sequenceClamp(Math.round(index), 0, last); all = single ? false : all || full;
            const next = [center];
            if (!single) {
                // Keep endpoints and a few frames behind for an immediate change of direction.
                next.push(0, last, center - direction, center - 2 * direction);
                for (let step = 1; next.length < limit; step++) next.push(center + step * direction);
            }
            wanted = [...new Set(next.filter(valid))]; pump();
        },
        get: (index: number) => bitmaps.get(index),
        failed: (index: number) => failed.has(index),
        counts: () => ({ decoded: bitmaps.size, downloaded: downloads }),
        retry() {
            // A failed decode may have cached a damaged body. An explicit retry downloads a fresh copy.
            for (const index of failed) { blobs.delete(index); retrying.add(index); }
            failed.clear(); pump();
        },
        destroy() {
            disposed = true; abort.abort(); blobs.clear(); retrying.clear();
            bitmaps.forEach(bitmap => bitmap.close()); bitmaps.clear();
        },
    };
}

/** A two-endpoint journey: scroll starts/boosts/reverses; release still completes the flight. */
function createHeroSequence(options: SequenceOptions) {
    const { root, canvas, poster, urls } = options;
    const last = urls.length - 1;
    const duration = sequenceClamp(options.duration ?? 2.5, .6, 10);
    // Only the opening and final image transitions dissolve, for 0.8s each.
    const openingFade = last >= 3 ? .8 : 0;
    const arrivalFade = last >= 3 ? .8 : 0;
    const flightEnd = openingFade + duration, totalDuration = flightEnd + arrivalFade;
    const maxSpeed = sequenceClamp(options.maxSpeed ?? 1.8, 1, 3);
    const momentum = sequenceClamp(options.momentum ?? .22, .08, .6);
    const threshold = sequenceClamp(options.triggerDistance ?? 28, 8, 150);
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    const abort = new AbortController(), signal = abort.signal;
    const context = canvas.getContext("2d", { alpha: false });
    const initialFrame = options.startAtEnd ? last : 0;
    let disposed = false, state: SequenceState = options.startAtEnd ? "arrival" : "opening", displayed = initialFrame, clock = options.startAtEnd ? totalDuration : 0;
    let displayedProgress = options.startAtEnd ? 1 : 0;
    let rendered = { index: initialFrame, next: initialFrame, mix: 0 };
    let direction = 1, velocity = 0, boost = 0, held = false, playing = false;
    let active = false, raf = 0, previousTime = 0, waitingSince = 0;
    let holdY = 0, holdX = 0, holdTimer: ReturnType<typeof setTimeout> | undefined;
    let intent = 0, intentAt = 0, lastIntentAt = -Infinity, drainUntil = 0, drainDirection = 0;
    let scrollGuard = false, warmed = false, bypass = false;
    let touch: { x: number; y: number } | null = null;
    let warmTimer: ReturnType<typeof setTimeout> | undefined;
    const width = sequenceClamp(options.decodeWidth ?? 1920, 640, 1920);
    const frames = createSequenceFrames(urls, width, sequenceClamp(options.cacheFrames ?? 14, 8, 24), wake);
    function snapshot(): SequenceSnapshot {
        return { state, progress: displayedProgress, frame: displayed, direction, held, ...frames.counts() };
    }
    function publish() {
        if (disposed) return;
        root.dataset.sequenceState = state;
        root.dataset.frame = String(displayed);
        root.dataset.progress = String(displayedProgress);
        root.dataset.crossfade = rendered.index !== rendered.next ? (rendered.index === 0 ? "opening" : "arrival") : "";
        root.dataset.crossfadeMix = String(rendered.mix);
        root.dataset.scrollHeld = String(held);
        root.dataset.decoded = String(frames.counts().decoded);
        options.onUpdate?.(snapshot());
    }
    function visible() {
        const rect = root.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0 && rect.bottom > 0 && rect.top < innerHeight;
    }
    function atHero() {
        const rect = root.getBoundingClientRect();
        return visible() && rect.top >= -3 && rect.top <= innerHeight * .15 && rect.bottom >= innerHeight * .6;
    }
    function release(reason: string) {
        if (holdTimer) clearTimeout(holdTimer);
        holdTimer = undefined; held = false;
        if (sequenceScrollOwner === root) sequenceScrollOwner = null;
        root.dataset.scrollRelease = reason;
    }
    function hold() {
        if (held || options.holdScroll === false || motion.matches || !atHero()) return;
        if (sequenceScrollOwner && sequenceScrollOwner !== root) return;
        sequenceScrollOwner = root; held = true; holdX = scrollX; holdY = scrollY;
        holdTimer = setTimeout(() => fail("timeout"), options.timeoutMs ?? Math.max(12000, (totalDuration + 2) * 1000));
    }
    function draw(index: number, force = false, nextIndex = index, mix = 0) {
        const bitmap = frames.get(index), next = frames.get(nextIndex);
        if (!context || !bitmap || !next) return false;
        if (index === rendered.index && nextIndex === rendered.next && mix === rendered.mix && !force && canvas.style.opacity === "1") return true;
        const box = root.getBoundingClientRect();
        if (box.width <= 0 || box.height <= 0) return false;
        const boxRatio = box.width / box.height;
        let sw = bitmap.width, sh = bitmap.height;
        if (sw / sh > boxRatio) sw = sh * boxRatio; else sh = sw / boxRatio;
        const ratio = Math.min(devicePixelRatio || 1, 2, sw / box.width, sh / box.height);
        const cw = Math.max(1, Math.round(box.width * ratio)), ch = Math.max(1, Math.round(box.height * ratio));
        if (canvas.width !== cw) canvas.width = cw;
        if (canvas.height !== ch) canvas.height = ch;
        // Fill before drawing: a small alpha channel in exported files cannot accumulate trails.
        context.globalAlpha = 1;
        context.fillStyle = "#101820"; context.fillRect(0, 0, cw, ch);
        function paint(frame: SequenceBitmap) {
            let w = frame.width, h = frame.height;
            if (w / h > boxRatio) w = h * boxRatio; else h = w / boxRatio;
            context!.drawImage(frame.image,
                (frame.width - w) * sequenceClamp((options.focalX ?? 50) / 100),
                (frame.height - h) * sequenceClamp((options.focalY ?? 50) / 100),
                w, h, 0, 0, cw, ch);
        }
        // Keep the lower image opaque to prevent a dark dip during the dissolve.
        paint(bitmap);
        if (nextIndex !== index) { context.globalAlpha = mix; paint(next); context.globalAlpha = 1; }
        rendered = { index, next: nextIndex, mix };
        displayed = mix === 1 ? nextIndex : index;
        displayedProgress = (index + (nextIndex - index) * mix) / Math.max(1, last);
        canvas.style.opacity = "1"; poster.style.opacity = "0";
        publish(); return true;
    }
    function redraw() { return draw(rendered.index, true, rendered.next, rendered.mix); }
    function frameAt(time: number) {
        if (time <= 0) return { index: 0, next: 0, mix: 0 };
        if (time >= totalDuration) return { index: last, next: last, mix: 0 };
        if (openingFade && time < openingFade) return { index: 0, next: 1, mix: sequenceEase(time / openingFade) };
        if (arrivalFade && time > flightEnd) return { index: last - 1, next: last, mix: sequenceEase((time - flightEnd) / arrivalFade) };
        const firstMoving = openingFade ? 1 : 0;
        const index = firstMoving + Math.round(sequenceEase(sequenceClamp((time - openingFade) / duration)) * (last - (arrivalFade ? 1 : 0) - firstMoving));
        return { index, next: index, mix: 0 };
    }
    function warm(explicit = false) {
        if (disposed || motion.matches) return;
        if (!explicit && (options.preload === false || connection?.saveData || /(^|-)2g$/.test(connection?.effectiveType || ""))) return;
        warmed = true;
        frames.request(displayed, direction, true);
    }
    function wake() {
        if (disposed || raf || document.hidden) return;
        if (playing || (motion.matches && displayed !== last) || (active && canvas.style.opacity !== "1")) raf = requestAnimationFrame(tick);
    }
    function finish() {
        playing = false; velocity = 0; boost = 0; waitingSince = 0;
        state = direction > 0 ? "arrival" : "opening";
        drainDirection = direction; drainUntil = performance.now() + 350;
        intent = 0; release("endpoint"); publish();
    }
    function fail(reason: string) {
        playing = false; velocity = 0; state = "error"; bypass = true;
        release(reason); publish();
    }
    function tick(now: number) {
        raf = 0;
        if (disposed || document.hidden) return;
        if (motion.matches) {
            if (frames.failed(last)) { state = "reduced"; publish(); return; }
            if (draw(last)) { state = "reduced"; publish(); }
            return;
        }
        if (!playing) { if (active && canvas.style.opacity !== "1") redraw(); return; }
        const elapsed = previousTime ? (now - previousTime) / 1000 : 1 / 60;
        const dt = Math.min(.05, elapsed);
        previousTime = now;
        boost *= Math.exp(-dt / momentum);
        const wantedVelocity = direction * (1 + boost);
        velocity += (wantedVelocity - velocity) * (1 - Math.exp(-dt / .10));
        let proposed: number;
        if (openingFade && (clock < openingFade || (clock === openingFade && direction < 0))) {
            velocity = direction;
            proposed = sequenceClamp(clock + direction * elapsed, 0, openingFade);
        } else if (arrivalFade && (clock > flightEnd || (clock === flightEnd && direction > 0))) {
            velocity = direction;
            proposed = sequenceClamp(clock + direction * elapsed, flightEnd, totalDuration);
        } else proposed = sequenceClamp(clock + velocity * dt, openingFade, flightEnd);
        const frame = frameAt(proposed);
        frames.request(frame.index, direction, true);
        if (frames.failed(frame.index) || frames.failed(frame.next)) { fail("frame-error"); return; }
        if (draw(frame.index, false, frame.next, frame.mix)) {
            clock = proposed; waitingSince = 0;
            if (state !== "moving") { state = "moving"; publish(); }
            if ((direction > 0 && clock >= totalDuration && displayed === last) || (direction < 0 && clock <= 0 && displayed === 0)) { finish(); return; }
        } else {
            if (canvas.style.opacity !== "1") draw(displayed);
            if (!waitingSince) waitingSince = now;
            if (now - waitingSince > 7000) { fail("frame-timeout"); return; }
            if (state !== "loading") { state = "loading"; publish(); }
        }
        wake();
    }
    function start(nextDirection: number, manual = false) {
        if (disposed || document.hidden || motion.matches || !context || last < 1) return;
        if (!manual && (!atHero() || (sequenceScrollOwner && sequenceScrollOwner !== root))) return;
        bypass = false;
        direction = nextDirection > 0 ? 1 : -1;
        if ((direction > 0 && clock >= totalDuration && displayed === last) || (direction < 0 && clock <= 0 && displayed === 0)) return;
        active = true; playing = true; previousTime = 0; waitingSince = 0;
        state = frames.get(displayed) ? "moving" : "loading";
        frames.retry(); warm(true); hold(); publish(); wake();
    }
    function pause(reason = "pause") {
        playing = false; velocity = 0; boost = 0; bypass = true;
        if (raf) cancelAnimationFrame(raf); raf = 0;
        if (state === "moving" || state === "loading") state = "paused";
        release(reason); drainUntil = 0; publish();
    }
    function skip() {
        direction = 1; clock = totalDuration; active = true; playing = true; previousTime = 0; bypass = true;
        velocity = 0; boost = 0; frames.retry(); frames.request(last, 1, false, true);
        // Skipping always releases navigation immediately, even on a failed connection.
        release("skip"); state = "loading"; publish(); wake();
    }
    function nestedScroll(target: EventTarget | null, delta: number) {
        let element = target instanceof Element ? target : null;
        while (element && element !== document.body && element !== document.documentElement) {
            const style = getComputedStyle(element);
            if (/(auto|scroll)/.test(style.overflowY) && element.scrollHeight > element.clientHeight + 1 &&
                (delta > 0 ? element.scrollTop + element.clientHeight < element.scrollHeight - 1 : element.scrollTop > 0)) return true;
            element = element.parentElement;
        }
        return false;
    }
    function scrollIntent(event: Event, delta: number) {
        if (options.inputFilter && !options.inputFilter(event)) return;
        if (disposed || bypass || motion.matches || document.hidden || event.defaultPrevented || Math.abs(delta) < 1 || nestedScroll(event.target, delta)) return;
        if (sequenceScrollOwner && sequenceScrollOwner !== root) return;
        const now = performance.now(), sign = Math.sign(delta);
        if (!playing && sign === drainDirection && now < drainUntil && now - lastIntentAt < 140 && atHero()) {
            if (event.cancelable) event.preventDefault(); lastIntentAt = now; return;
        }
        if (!playing && (!atHero() || (clock === 0 && sign < 0) || (clock === totalDuration && sign > 0))) return;
        if (!event.cancelable) return;
        if (held || (options.holdScroll !== false && atHero())) event.preventDefault();
        lastIntentAt = now;
        if (now - intentAt > 180 || Math.sign(intent) !== sign) intent = 0;
        intentAt = now; intent += delta;
        if (!playing) {
            if (Math.abs(intent) >= threshold) { start(sign); intent = 0; }
        } else if (sign !== direction) {
            if (Math.abs(intent) >= threshold) { direction = sign; boost = 0; intent = 0; publish(); }
        } else {
            boost = Math.min(maxSpeed - 1, boost + Math.min(250, Math.abs(delta)) / 260);
            intent = 0;
        }
    }
    function wheel(event: WheelEvent) {
        if (event.ctrlKey || event.metaKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
        scrollIntent(event, event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? innerHeight : 1));
    }
    function key(event: KeyboardEvent) {
        if (event.key === "Escape") { if (playing || held) pause("escape"); return; }
        if (event.key === "Tab" && held) { pause("focus-navigation"); return; }
        if (event.ctrlKey || event.metaKey || event.altKey) return;
        if (event.target instanceof Element && event.target.closest('input,textarea,select,button,a,[contenteditable="true"],[role="slider"]')) return;
        const delta = event.key === "ArrowDown" ? 45 : event.key === "ArrowUp" ? -45 :
            ["PageDown", "End"].includes(event.key) ? innerHeight : ["PageUp", "Home"].includes(event.key) ? -innerHeight :
            event.key === " " ? (event.shiftKey ? -innerHeight : innerHeight) : 0;
        if (delta) scrollIntent(event, delta);
    }
    function onScroll() {
        if (held) {
            if (!scrollGuard && (scrollY !== holdY || scrollX !== holdX)) {
                scrollGuard = true; window.scrollTo({ top: holdY, left: holdX, behavior: "instant" }); scrollGuard = false;
            }
        } else {
            // Scrollbar dragging and anchor navigation remain native. Never pull a visitor back.
            if (playing && !visible()) pause("offscreen");
            if (!warmed && visible() && poster.complete) warm();
            if (!atHero()) bypass = false;
        }
    }
    function reducedChanged() {
        pause("motion-preference");
        if (motion.matches) {
            state = "reduced"; frames.request(last, 1, false, true); active = true; wake(); publish();
        } else {
            if (displayed === last) clock = totalDuration;
            state = displayed === last ? "arrival" : "opening"; publish();
        }
    }
    const resize = new ResizeObserver(() => { if (active && !disposed) redraw(); });
    resize.observe(root);
    const intersection = new IntersectionObserver(entries => {
        if (entries[0]?.isIntersecting) { if (poster.complete) warm(); }
        else if (playing) pause("offscreen");
    });
    intersection.observe(root);
    window.addEventListener("wheel", wheel, { passive: false, signal });
    window.addEventListener("keydown", key, { signal });
    window.addEventListener("touchstart", event => {
        touch = event.touches.length === 1 ? { x: event.touches[0].clientX, y: event.touches[0].clientY } : null;
    }, { passive: true, signal });
    window.addEventListener("touchmove", event => {
        if (!touch || event.touches.length !== 1) { touch = null; return; }
        const next = event.touches[0], dx = touch.x - next.clientX, dy = touch.y - next.clientY;
        touch = { x: next.clientX, y: next.clientY };
        if (Math.abs(dy) >= Math.abs(dx)) scrollIntent(event, dy);
    }, { passive: false, signal });
    window.addEventListener("touchend", () => { touch = null; }, { passive: true, signal });
    window.addEventListener("touchcancel", () => { touch = null; }, { passive: true, signal });
    window.addEventListener("scroll", onScroll, { passive: true, signal });
    document.addEventListener("visibilitychange", () => { if (document.hidden) pause("hidden"); }, { signal });
    window.addEventListener("pagehide", () => pause("pagehide"), { signal });
    motion.addEventListener("change", reducedChanged, { signal });
    const loadedPoster = () => {
        if (!visible() || motion.matches) return;
        clearTimeout(warmTimer); warmTimer = setTimeout(() => warm(), 250);
    };
    poster.addEventListener("load", loadedPoster, { signal });
    if (poster.complete) loadedPoster();
    canvas.style.opacity = "0"; poster.style.opacity = "1";
    // A restored endpoint is parked, not skipped: reverse input stays enabled and the opening copy never flashes.
    if (options.startAtEnd) { active = true; frames.request(last, 1, false, true); wake(); }
    publish();
    if (motion.matches) reducedChanged();
    return {
        start: () => start(1, true), reverse: () => start(-1, true), pause, skip, snapshot,
        destroy() {
            if (disposed) return;
            pause("destroy"); disposed = true; abort.abort();
            if (warmTimer) clearTimeout(warmTimer);
            resize.disconnect(); intersection.disconnect(); frames.destroy();
        },
    };
}

type OrbitState = "idle" | "loading" | "buffering" | "moving" | "settling" | "checkpoint" | "paused" | "error";

interface OrbitSnapshot {
    state: OrbitState; frame: number; checkpoint: number; direction: number;
    ready: number; total: number; decoded: number; downloaded: number;
    buffered: number; bufferTotal: number; requiredReady: number; requiredTotal: number;
    position: number; error?: string;
}

interface OrbitOptions {
    root: HTMLElement; canvas: HTMLCanvasElement; urls: string[];
    decodeWidth?: number; inspectionWidth?: number; checkpointCount?: number; bufferCheckpoints?: number; startFrame?: number;
    snapDuration?: number; frameBlend?: number; focalX?: number; focalY?: number;
    onUpdate?: (snapshot: OrbitSnapshot) => void;
}

interface OrbitBitmap {
    image: CanvasImageSource; width: number; height: number; close: () => void;
}

const orbitClamp = (value: number, minimum: number, maximum: number) => Math.min(maximum, Math.max(minimum, value));
const orbitModulo = (value: number, size: number) => ((value % size) + size) % size;

/** Keep every compressed file, a bounded checkpoint window, and one optional sharp parked view. */
function createOrbitPlayer(options: OrbitOptions) {
    const { root, canvas } = options;
    const urls = [...options.urls], total = urls.length;
    const startFrame = Math.round(orbitClamp(Number.isFinite(options.startFrame) ? options.startFrame! : 0, 0, Math.max(0, total - 1)));
    const motionWidth = Math.round(orbitClamp(options.decodeWidth ?? 960, 240, 1920));
    const inspectionWidth = Math.round(orbitClamp(options.inspectionWidth ?? 1920, motionWidth, 3840));
    const checkpointCount = Math.round(orbitClamp(options.checkpointCount ?? 8, 1, Math.max(1, total)));
    const checkpoints = Array.from({ length: checkpointCount }, (_, index) => Math.round(index * total / checkpointCount));
    const bufferCheckpoints = Math.round(orbitClamp(options.bufferCheckpoints ?? 2, 1, Math.max(1, Math.floor(checkpointCount / 2))));
    const snapDuration = orbitClamp(options.snapDuration ?? 1.5, .15, 10);
    const frameBlend = orbitClamp(options.frameBlend ?? 0, 0, 1);
    const focalX = orbitClamp(options.focalX ?? .5, 0, 1), focalY = orbitClamp(options.focalY ?? .5, 0, 1);
    const context = canvas.getContext("2d", { alpha: false });
    const cancellation = new AbortController();
    const blobs = new Map<number, Blob>(), frames = new Map<number, OrbitBitmap>();
    const fetching = new Set<number>(), decoding = new Set<number>();
    const fetchFailed = new Map<number, string>(), decodeFailed = new Map<number, string>(), refresh = new Set<number>();
    const reducedQuery = typeof matchMedia === "function" ? matchMedia("(prefers-reduced-motion: reduce)") : null;
    const originalTouchAction = canvas.style.touchAction;
    let destroyed = false, started = false, prepared = false, preparing = false, active = false, activation = 0, visible = true, automaticPause = false;
    let state: OrbitState = "idle", position = startFrame, entryFrame = startFrame, direction = 1, error: string | undefined;
    let raf = 0, lastInputAt = -Infinity, lastWheelAt = -Infinity, wheelLatched = false, pausedAt = 0, suppressClickUntil = 0;
    let preparePromise: Promise<void> | null = null, prepareResolve: (() => void) | null = null;
    let prepareReject: ((reason: Error) => void) | null = null;
    let inspection: OrbitBitmap | null = null, inspectionFrame = -1, inspectionGeneration = 0, qualityStartedAt = 0, inspectionDecoding = false, inspectionWanted = false;
    let nativeDecodes = 0;
    let lastPaint = "", lastNotification = "";
    let drag: { id: number; x: number; y: number; moved: boolean; triggered: boolean } | null = null;
    let touchDragging = false;
    let settling: { start: number; target: number; time: number; duration: number } | null = null;
    let pendingMove: { start: number; target: number; indices: number[] } | null = null;
    let desired = new Set<number>(), required = new Set<number>(), priority: number[] = [];
    let preparationRequired: number[] = [], errorWasPaused = false;
    const waiters: Array<{ indices: number[]; token: number; allDownloads: boolean; resolve: () => void; reject: (reason: Error) => void }> = [];
    const frameAt = () => total ? orbitModulo(Math.round(position), total) : 0;
    const canRun = () => active && !destroyed && visible && !document.hidden && state !== "error";
    const inputAvailable = () => active && prepared && !destroyed && visible && !document.hidden;
    const fullyReady = () => prepared;
    const reduced = () => !!reducedQuery?.matches;

    function checkpointAt() {
        if (state !== "checkpoint" || total === 0) return -1;
        const withinRing = orbitModulo(position, total);
        return checkpoints.findIndex(value => Math.abs(value - withinRing) < .0001 || Math.abs(value + total - withinRing) < .0001);
    }

    function snapshot(): OrbitSnapshot {
        return { state, frame: frameAt(), checkpoint: checkpointAt(), direction, ready: blobs.size, total,
            decoded: frames.size + (inspection ? 1 : 0), downloaded: blobs.size, buffered: frames.size,
            bufferTotal: desired.size, requiredReady: [...required].filter(index => frames.has(index)).length,
            requiredTotal: required.size, position, ...(error ? { error } : {}) };
    }

    function notify() {
        if (destroyed) return;
        const value = snapshot();
        root.dataset.orbitState = state; root.dataset.orbitFrame = String(value.frame);
        root.dataset.orbitCheckpoint = String(value.checkpoint); root.dataset.orbitReady = String(value.ready);
        root.dataset.orbitDecoded = String(value.decoded); root.dataset.orbitDownloaded = String(value.downloaded);
        root.dataset.orbitPosition = position.toFixed(4); root.dataset.orbitMotionWidth = String(motionWidth);
        root.dataset.orbitTarget = (pendingMove?.target ?? settling?.target ?? position).toFixed(4);
        root.dataset.orbitFrameBlend = String(frameBlend);
        root.dataset.orbitLocked = String(!!settling || !!pendingMove);
        root.dataset.orbitBuffered = String(value.buffered); root.dataset.orbitBufferTotal = String(value.bufferTotal);
        root.dataset.orbitRequiredReady = String(value.requiredReady); root.dataset.orbitRequiredTotal = String(value.requiredTotal);
        root.dataset.orbitDecoding = String(nativeDecodes);
        root.dataset.orbitCacheLimit = String(desired.size); root.dataset.orbitBufferCheckpoints = String(bufferCheckpoints);
        root.dataset.orbitResidentFrames = [...frames.keys()].sort((a, b) => a - b).join(",");
        root.dataset.orbitRequiredFrames = [...required].sort((a, b) => a - b).join(",");
        const signature = [state, value.frame, value.checkpoint, direction, value.ready, value.decoded, value.bufferTotal,
            value.requiredReady, value.requiredTotal, position.toFixed(4), error].join("|");
        if (signature !== lastNotification) { lastNotification = signature; options.onUpdate?.(value); }
    }

    async function decodeBlob(blob: Blob, width: number): Promise<OrbitBitmap> {
        let expired = false;
        nativeDecodes++;
        const operation = (async () => {
            if (typeof createImageBitmap === "function") {
                try {
                    const image = await createImageBitmap(blob, { resizeWidth: width, resizeQuality: "high" });
                    return { image, width: image.width, height: image.height, close: () => image.close() };
                } catch { /* A resized canvas also works in browsers without AVIF ImageBitmap decoding. */ }
            }
            const image = new Image(), objectURL = URL.createObjectURL(blob);
            try {
                image.decoding = "async"; image.src = objectURL;
                await new Promise<void>((resolve, reject) => {
                    const timer = setTimeout(() => { image.src = ""; reject(new Error("Image decoding timed out")); }, 12000);
                    const abort = () => { clearTimeout(timer); image.src = ""; reject(new Error("Orbit disposed")); };
                    cancellation.signal.addEventListener("abort", abort, { once: true });
                    const done = () => { clearTimeout(timer); cancellation.signal.removeEventListener("abort", abort); };
                    image.decode().then(() => { done(); resolve(); }, reason => { done(); reject(reason); });
                });
                const surface = document.createElement("canvas");
                surface.width = Math.min(width, image.naturalWidth);
                surface.height = Math.max(1, Math.round(image.naturalHeight * surface.width / image.naturalWidth));
                const drawing = surface.getContext("2d", { alpha: false });
                if (!drawing) throw new Error("Canvas decoding is unavailable");
                drawing.drawImage(image, 0, 0, surface.width, surface.height);
                return { image: surface, width: surface.width, height: surface.height, close: () => { surface.width = surface.height = 0; } };
            } finally { image.src = ""; URL.revokeObjectURL(objectURL); }
        })();
        return await new Promise<OrbitBitmap>((resolve, reject) => {
            const timer = setTimeout(() => { expired = true; reject(new Error("Image decoding timed out")); }, 15000);
            operation.then(bitmap => {
                clearTimeout(timer);
                if (expired || destroyed) { bitmap.close(); if (!expired) reject(new Error("Orbit disposed")); }
                else resolve(bitmap);
            }, reason => { clearTimeout(timer); if (!expired) reject(reason); }).finally(() => {
                // ImageBitmap decoding cannot be cancelled. A watchdog may report
                // an error, but its native permit stays held until the work settles.
                nativeDecodes--;
                if (!destroyed) resourcesChanged();
            });
        });
    }

    function indicesBetween(start: number, end: number) {
        const result = new Set<number>();
        for (let index = Math.floor(Math.min(start, end)); index <= Math.ceil(Math.max(start, end)) && result.size < total; index++) result.add(orbitModulo(index, total));
        return [...result];
    }

    function windowIndices(center: number, radius: number) {
        let left = center, right = center;
        for (let step = 0; step < radius; step++) { left = nextCheckpoint(left, -1); right = nextCheckpoint(right, 1); }
        return indicesBetween(left, right);
    }

    function nearestFirst(indices: number[], center: number) {
        const wrapped = orbitModulo(center, total);
        const distance = (index: number) => Math.min(orbitModulo(index - wrapped, total), orbitModulo(wrapped - index, total));
        return [...indices].sort((a, b) => distance(a) - distance(b) || orbitModulo(a - wrapped, total) - orbitModulo(b - wrapped, total));
    }

    function setBuffer(wanted: number[], essential: number[], first = essential) {
        desired = new Set(wanted); required = new Set(essential);
        priority = [...new Set([...first, ...wanted])].filter(index => desired.has(index));
        for (const [index, bitmap] of frames) if (!desired.has(index)) { bitmap.close(); frames.delete(index); }
        resourcesChanged();
    }

    function setRestBuffer(center: number, initial = false) {
        const near = nearestFirst(windowIndices(center, 1), center);
        const wanted = nearestFirst(windowIndices(center, bufferCheckpoints), center);
        setBuffer(wanted, initial ? near : [orbitModulo(Math.round(center), total)], near);
    }

    function fail(index: number) {
        if (state !== "error") errorWasPaused = state === "paused";
        error = "Could not prepare orbit frame " + index + ". Retry to continue.";
        state = "error";
        if (raf) cancelAnimationFrame(raf); raf = 0;
    }

    function failedIndex(indices: number[]) { return indices.find(index => fetchFailed.has(index) || decodeFailed.has(index)); }
    function framesReady(indices: number[]) { return indices.every(index => frames.has(index)); }

    function finishPreparation() {
        if (destroyed || !preparing) return;
        const failure = fetchFailed.size ? [...fetchFailed.keys()][0] : failedIndex(preparationRequired);
        if (failure !== undefined) {
            fail(failure);
            const reject = prepareReject; prepareResolve = prepareReject = null;
            reject?.(new Error(error));
        } else if (blobs.size === total && framesReady(preparationRequired)) {
            preparing = false; prepared = true; error = undefined;
            const resolve = prepareResolve; prepareResolve = prepareReject = null;
            if (!active) state = "idle";
            resolve?.();
        }
    }

    function finishWaiters() {
        for (let index = waiters.length - 1; index >= 0; index--) {
            const waiter = waiters[index], failure = failedIndex(waiter.indices);
            if (waiter.token !== activation) { waiters.splice(index, 1); waiter.resolve(); }
            else if (failure !== undefined || (waiter.allDownloads && fetchFailed.size)) {
                waiters.splice(index, 1); waiter.reject(new Error("Could not prepare orbit frame " + (failure ?? [...fetchFailed.keys()][0])));
            } else if (framesReady(waiter.indices) && (!waiter.allDownloads || blobs.size === total)) { waiters.splice(index, 1); waiter.resolve(); }
        }
    }

    function waitForFrames(indices: number[], token: number, allDownloads = false) {
        return new Promise<void>((resolve, reject) => { waiters.push({ indices, token, allDownloads, resolve, reject }); resourcesChanged(); });
    }

    function resourcesChanged() {
        if (destroyed) return;
        finishPreparation(); finishWaiters();
        if (prepared && pendingMove) {
            const failure = failedIndex(pendingMove.indices);
            if (failure !== undefined) fail(failure);
            else tryStartPending();
        }
        notify(); pump();
    }

    async function fetchFrame(index: number) {
        fetching.add(index);
        const request = new AbortController(), cancel = () => request.abort();
        const timer = setTimeout(cancel, 10000);
        cancellation.signal.addEventListener("abort", cancel, { once: true });
        try {
            const response = await fetch(urls[index], { signal: request.signal, mode: "cors", credentials: "omit", cache: refresh.has(index) ? "reload" : "force-cache" });
            if (!response.ok) throw new Error("HTTP " + response.status);
            const blob = await response.blob();
            if (!destroyed) { blobs.set(index, blob); refresh.delete(index); }
        } catch (reason) { if (!destroyed) fetchFailed.set(index, String(reason)); }
        finally {
            clearTimeout(timer); cancellation.signal.removeEventListener("abort", cancel); fetching.delete(index);
            if (!destroyed) resourcesChanged();
        }
    }

    async function decodeFrame(index: number) {
        decoding.add(index);
        try {
            const bitmap = await decodeBlob(blobs.get(index)!, motionWidth);
            if (destroyed || !desired.has(index)) bitmap.close();
            else { frames.get(index)?.close(); frames.set(index, bitmap); }
        } catch (reason) { if (!destroyed) decodeFailed.set(index, String(reason)); }
        finally {
            decoding.delete(index);
            if (!destroyed) resourcesChanged();
        }
    }

    function pump() {
        if (destroyed || !started) return;
        const all = nearestFirst(urls.map((_, index) => index), position);
        const downloads = [...new Set([...required, ...priority, ...all])];
        for (const index of downloads) {
            if (fetching.size >= 4) break;
            if (!blobs.has(index) && !fetching.has(index) && !fetchFailed.has(index)) void fetchFrame(index);
        }
        if (inspectionWanted) void prepareInspection();
        const allowed = prepared ? priority : preparationRequired;
        for (const index of allowed) {
            if (nativeDecodes >= 2 || decoding.size + (inspectionDecoding ? 1 : 0) >= 2) break;
            if (desired.has(index) && blobs.has(index) && !frames.has(index) && !decoding.has(index) && !decodeFailed.has(index)) void decodeFrame(index);
        }
        notify();
    }

    function prepare(): Promise<void> {
        if (destroyed) return Promise.reject(new Error("Orbit disposed"));
        if (prepared) return Promise.resolve();
        if (preparePromise) return preparePromise;
        if (!total || !context) {
            state = "error"; error = !total ? "No orbit frames were provided." : "Canvas rendering is unavailable."; notify();
            return Promise.reject(new Error(error));
        }
        started = preparing = true; state = "loading"; error = undefined;
        preparePromise = new Promise<void>((resolve, reject) => { prepareResolve = resolve; prepareReject = reject; });
        preparationRequired = nearestFirst(windowIndices(startFrame, 1), startFrame);
        setRestBuffer(startFrame, true); return preparePromise;
    }

    function dropInspection() {
        inspectionGeneration++;
        inspectionWanted = false;
        inspection?.close(); inspection = null; inspectionFrame = -1; qualityStartedAt = 0; lastPaint = "";
    }

    async function prepareInspection() {
        const frame = frameAt(), blob = blobs.get(frame);
        const parked = state === "checkpoint" || state === "buffering" || (state === "paused" && !!pendingMove);
        if (!blob || destroyed || !active || !parked || inspectionWidth <= motionWidth || inspectionFrame === frame) { inspectionWanted = false; return; }
        inspectionWanted = true;
        if (inspectionDecoding || decoding.size >= 2 || nativeDecodes >= 2) return;
        inspectionWanted = false;
        const generation = ++inspectionGeneration;
        inspectionDecoding = true;
        try {
            const bitmap = await decodeBlob(blob, inspectionWidth);
            const stillParked = state === "checkpoint" || state === "buffering" || (state === "paused" && !!pendingMove);
            if (destroyed || generation !== inspectionGeneration || !active || !stillParked || frameAt() !== frame) bitmap.close();
            else {
                inspection?.close(); inspection = bitmap; inspectionFrame = frame;
                qualityStartedAt = performance.now(); lastPaint = ""; notify(); requestPaint();
            }
        } catch { /* Inspection quality is optional; the ready motion image remains selectable. */ }
        finally {
            inspectionDecoding = false;
            if (!destroyed && generation !== inspectionGeneration && active && state === "checkpoint" && inspectionFrame !== frameAt()) inspectionWanted = true;
            if (!destroyed) resourcesChanged();
        }
    }

    function drawImage(bitmap: OrbitBitmap) {
        if (!context) return;
        const scale = Math.max(canvas.width / bitmap.width, canvas.height / bitmap.height);
        const width = bitmap.width * scale, height = bitmap.height * scale;
        context.drawImage(bitmap.image, (canvas.width - width) * focalX, (canvas.height - height) * focalY, width, height);
    }

    function paint(now: number) {
        const frame = frameAt();
        let from = frame, to = frame, frameMix = 0;
        if (frameBlend > 0 && !reduced()) {
            const lower = Math.floor(position), fraction = position - lower;
            // Blend only around the boundary between the two nearest samples.
            // Width zero is a hard nearest-frame cut; width one is linear interpolation.
            frameMix = orbitClamp((fraction - (1 - frameBlend) / 2) / frameBlend, 0, 1);
            from = orbitModulo(lower, total); to = orbitModulo(lower + 1, total);
            if (frameMix === 1) { from = to; frameMix = 0; }
            if (frameMix === 0) to = from;
        }
        const bitmap = frames.get(from), next = frameMix > 0 ? frames.get(to) : undefined;
        if (!context || !bitmap || !active || destroyed) return;
        const bounds = canvas.getBoundingClientRect();
        if (bounds.width <= 0 || bounds.height <= 0) return;
        const useful = inspection && inspectionFrame === frame ? inspection : bitmap;
        const usefulDPR = Math.min(useful.width / bounds.width, useful.height / bounds.height);
        const dpr = Math.min(window.devicePixelRatio || 1, 2, usefulDPR);
        const width = Math.max(1, Math.round(bounds.width * dpr)), height = Math.max(1, Math.round(bounds.height * dpr));
        if (canvas.width !== width || canvas.height !== height) { canvas.width = width; canvas.height = height; lastPaint = ""; }
        const mix = inspection && inspectionFrame === frame ? (reduced() ? 1 : orbitClamp((now - qualityStartedAt) / 120, 0, 1)) : 0;
        const signature = [from, to, frameMix.toFixed(4), width, height, inspectionFrame, mix.toFixed(4)].join("|");
        if (signature === lastPaint) return;
        context.globalAlpha = 1; drawImage(bitmap);
        if (next) { context.globalAlpha = frameMix; drawImage(next); context.globalAlpha = 1; }
        if (inspection && mix > 0 && inspectionFrame === frame) {
            context.globalAlpha = mix; drawImage(inspection); context.globalAlpha = 1;
        }
        root.dataset.orbitFrameFrom = String(from); root.dataset.orbitFrameTo = String(to);
        root.dataset.orbitFrameMix = frameMix.toFixed(4);
        lastPaint = signature;
    }

    function requestPaint() {
        if (!raf && canRun() && state !== "paused") raf = requestAnimationFrame(tick);
    }

    function nextCheckpoint(from: number, heading: number) {
        const cycle = Math.floor(from / total), candidates: number[] = [];
        for (let offset = -1; offset <= 1; offset++) for (const checkpoint of checkpoints) candidates.push((cycle + offset) * total + checkpoint);
        if (heading > 0) return Math.min(...candidates.filter(value => value > from + .0001));
        return Math.max(...candidates.filter(value => value < from - .0001));
    }

    function arrive(target: number) {
        position = target; settling = null; pendingMove = null; pausedAt = 0; state = "checkpoint";
        setRestBuffer(target);
        paint(performance.now()); notify(); void prepareInspection();
    }

    function startSettle(target = nextCheckpoint(position, direction)) {
        if (!canRun() || !fullyReady()) return;
        if (Math.abs(target - position) < .0001) { arrive(target); return; }
        direction = Math.sign(target - position); pausedAt = 0;
        const indices = reduced() ? [...new Set([frameAt(), orbitModulo(Math.round(target), total)])] : indicesBetween(position, target);
        const adjacent = Math.abs(target - nextCheckpoint(position, direction)) < .0001;
        // An adjacent target's window already contains the whole committed arc.
        // A distant numbered jump pins only its route, never route + outer window.
        const wanted = adjacent ? windowIndices(target, bufferCheckpoints) : indices;
        pendingMove = { start: position, target, indices }; state = "buffering";
        setBuffer(wanted, indices, [...indices, ...nearestFirst(wanted, target)]);
    }

    function tryStartPending() {
        if (!pendingMove || !canRun() || state === "paused" || blobs.size !== total || !framesReady(pendingMove.indices)) return;
        const pending = pendingMove;
        if (failedIndex(pending.indices) !== undefined) return;
        pendingMove = null; dropInspection(); pausedAt = 0;
        if (reduced()) { arrive(pending.target); return; }
        settling = { start: pending.start, target: pending.target, time: performance.now(), duration: snapDuration * 1000 };
        state = "settling"; notify(); requestPaint();
    }

    function tick(now: number) {
        raf = 0;
        if (!canRun() || state === "paused") return;
        if (settling) {
            const motion = settling, t = orbitClamp((now - motion.time) / motion.duration, 0, 1);
            const smooth = t * t * (3 - 2 * t);
            position = motion.start + (motion.target - motion.start) * smooth;
            if (t >= 1) { arrive(motion.target); }
        }
        paint(now); notify();
        const qualityActive = inspection && inspectionFrame === frameAt() && now - qualityStartedAt < 120;
        if (settling || qualityActive) requestPaint();
    }

    function releaseDrag() {
        if (!drag) return;
        if (drag.moved) suppressClickUntil = performance.now() + 400;
        const pointer = drag.id; drag = null; touchDragging = false;
        try { if (root.hasPointerCapture(pointer)) root.releasePointerCapture(pointer); } catch { /* Detached elements have no capture. */ }
    }

    function ignored(target: EventTarget | null) {
        let element = target instanceof Element ? target : null;
        if (!element) return true;
        // Framer may place a transparent sibling above this component. Stop at the
        // shared container: its role/overflow belongs to the page, not a control.
        while (element && element !== root && !element.contains(root)) {
            if (element.matches("nav,header,a,button,input,textarea,select,option,[contenteditable]:not([contenteditable='false']),[role='button'],[role='link'],[data-orbit-ignore]")) return true;
            element = element.parentElement;
        }
        return false;
    }

    function insideViewer(x: number, y: number) {
        const box = root.getBoundingClientRect();
        return box.width > 0 && box.height > 0 && x >= box.left && x <= box.right && y >= box.top && y <= box.bottom;
    }

    function coveredTrialControl(x: number, y: number) {
        return Array.from(root.querySelectorAll<HTMLButtonElement>("[data-homepage-controls] button")).some(button => {
            const box = button.getBoundingClientRect();
            return !button.disabled && box.width > 0 && box.height > 0 && x >= box.left && x <= box.right && y >= box.top && y <= box.bottom;
        });
    }

    function nestedScroll(target: EventTarget | null, deltaX: number, deltaY: number) {
        let element = target instanceof Element ? target : null;
        while (element && element !== root && !element.contains(root)) {
            const style = getComputedStyle(element), horizontal = Math.abs(deltaX) > Math.abs(deltaY);
            if (horizontal && /auto|scroll/.test(style.overflowX) && element.scrollWidth > element.clientWidth + 1) {
                if (deltaX < 0 ? element.scrollLeft > 0 : element.scrollLeft < element.scrollWidth - element.clientWidth - 1) return true;
            }
            if (!horizontal && /auto|scroll/.test(style.overflowY) && element.scrollHeight > element.clientHeight + 1) {
                if (deltaY < 0 ? element.scrollTop > 0 : element.scrollTop < element.scrollHeight - element.clientHeight - 1) return true;
            }
            element = element.parentElement;
        }
        return false;
    }

    function onWheel(event: WheelEvent) {
        if (!inputAvailable() || event.defaultPrevented || event.ctrlKey || event.metaKey || !insideViewer(event.clientX, event.clientY) || ignored(event.target)) return;
        if (nestedScroll(event.target, event.deltaX, event.deltaY)) return;
        const scale = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? Math.max(1, root.clientHeight) : 1;
        const raw = (Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY) * scale;
        if (Math.abs(raw) < .2) return;
        event.preventDefault();
        const now = performance.now(), freshGesture = now - lastWheelAt >= 180;
        lastWheelAt = lastInputAt = now;
        if (freshGesture) wheelLatched = false;
        const consumed = wheelLatched;
        wheelLatched = true;
        // Refresh the latch even for ignored input: a long trackpad tail must not
        // become a second move merely because the camera arrived during that tail.
        if (consumed || state !== "checkpoint" || settling || pendingMove || drag) return;
        go(Math.sign(raw));
    }

    function onPointerDown(event: PointerEvent) {
        if (event.pointerType === "touch") return;
        if (!event.isPrimary) { if (drag) releaseDrag(); return; }
        if (!inputAvailable() || event.defaultPrevented || event.button !== 0 || !insideViewer(event.clientX, event.clientY) || coveredTrialControl(event.clientX, event.clientY) || ignored(event.target)) return;
        if (nestedScroll(event.target, 1, 0) || nestedScroll(event.target, 0, 1)) return;
        drag = { id: event.pointerId, x: event.clientX, y: event.clientY, moved: false, triggered: state !== "checkpoint" || !!settling || !!pendingMove };
        try { root.setPointerCapture(event.pointerId); } catch { /* Mouse events can still finish through the window listener. */ }
    }

    function onPointerMove(event: PointerEvent) {
        if (!drag || touchDragging || drag.id !== event.pointerId || !inputAvailable()) return;
        const dx = event.clientX - drag.x;
        if (Math.abs(dx) < 8 && !drag.moved) return;
        if (event.cancelable) event.preventDefault();
        drag.moved = true; lastInputAt = performance.now();
        if (drag.triggered) return;
        drag.triggered = true; go(dx < 0 ? 1 : -1);
    }

    function onPointerUp(event: PointerEvent) {
        if (!drag || touchDragging || drag.id !== event.pointerId) return;
        if (drag.moved) lastInputAt = performance.now();
        releaseDrag();
    }

    function onPointerCancel(event: PointerEvent) {
        if (!drag || touchDragging || drag.id !== event.pointerId) return;
        releaseDrag();
    }

    function onClick(event: MouseEvent) {
        if (coveredTrialControl(event.clientX, event.clientY)) return;
        // A drag must not accidentally activate a picking listener attached by the wrapper.
        const now = performance.now();
        if ((now < suppressClickUntil || (now - lastInputAt < 120 && state !== "checkpoint")) && insideViewer(event.clientX, event.clientY) && !ignored(event.target)) {
            event.preventDefault(); event.stopPropagation();
        }
    }

    function onTouchStart(event: TouchEvent) {
        if (event.touches.length !== 1) {
            if (touchDragging) releaseDrag();
            return;
        }
        const touch = event.touches[0];
        if (!inputAvailable() || event.defaultPrevented || !insideViewer(touch.clientX, touch.clientY) || coveredTrialControl(touch.clientX, touch.clientY) || ignored(event.target)) return;
        if (nestedScroll(event.target, 1, 0) || nestedScroll(event.target, 0, 1)) return;
        drag = { id: touch.identifier, x: touch.clientX, y: touch.clientY, moved: false, triggered: state !== "checkpoint" || !!settling || !!pendingMove };
        touchDragging = true;
    }

    function onTouchMove(event: TouchEvent) {
        if (!touchDragging || !drag || !inputAvailable() || event.touches.length !== 1) return;
        const touch = event.touches[0];
        const dx = touch.clientX - drag.x, dy = touch.clientY - drag.y;
        // A non-passive touch listener also reaches Framer sibling hit layers;
        // changing the canvas touch-action alone cannot prevent their page pan.
        if (event.cancelable) event.preventDefault();
        if (!drag.moved && Math.max(Math.abs(dx), Math.abs(dy)) < 12) return;
        drag.moved = true; lastInputAt = performance.now();
        if (drag.triggered) return;
        const delta = Math.abs(dx) >= Math.abs(dy) ? -dx : -dy;
        drag.triggered = true; go(Math.sign(delta));
    }

    function onTouchEnd(event: TouchEvent) {
        if (!touchDragging || !drag || event.touches.length) return;
        if (drag.moved) lastInputAt = performance.now();
        releaseDrag();
    }

    function onTouchCancel() {
        if (!touchDragging || !drag) return;
        releaseDrag();
    }

    function go(heading: number) {
        if (!canRun() || !fullyReady() || !heading || settling || pendingMove || state !== "checkpoint") return;
        automaticPause = false; direction = heading > 0 ? 1 : -1;
        if (drag) drag.triggered = true;
        startSettle(nextCheckpoint(position, direction));
    }

    function setCheckpoint(index: number) {
        if (!canRun() || !fullyReady() || settling || pendingMove || state !== "checkpoint") return;
        const desired = checkpoints[orbitModulo(Math.round(index), checkpointCount)];
        const current = orbitModulo(position, total);
        let distance = orbitModulo(desired - current + total / 2, total) - total / 2;
        if (Math.abs(distance + total / 2) < .0001) distance = direction * total / 2;
        automaticPause = false;
        if (drag) drag.triggered = true;
        startSettle(position + distance);
    }

    function pauseInternal(automatic: boolean) {
        if (!active || destroyed || state === "error" || state === "loading") return;
        automaticPause = automatic; releaseDrag();
        if (state !== "paused") pausedAt = performance.now();
        if (raf) cancelAnimationFrame(raf); raf = 0;
        state = "paused"; notify();
    }

    function resume() {
        if (!active || destroyed || !fullyReady() || !visible || document.hidden || state === "error") return;
        automaticPause = false;
        if (pendingMove) { pausedAt = 0; state = "buffering"; resourcesChanged(); return; }
        if (settling) {
            if (reduced()) { arrive(settling.target); return; }
            if (pausedAt) settling.time += performance.now() - pausedAt;
            pausedAt = 0; state = "settling"; notify(); requestPaint(); return;
        }
        const current = orbitModulo(position, total), checkpoint = checkpoints.find(value => Math.abs(value - current) < .0001);
        if (checkpoint !== undefined || Math.abs(current - entryFrame) < .0001) { state = "checkpoint"; paint(performance.now()); notify(); if (!inspection) void prepareInspection(); requestPaint(); }
        else { state = "moving"; startSettle(); }
    }

    function visibilityChanged() {
        if (!active) return;
        if ((!visible || document.hidden) && state !== "paused") pauseInternal(true);
        else if (visible && !document.hidden && automaticPause) resume();
    }

    function onKeyDown(event: KeyboardEvent) {
        if (!inputAvailable() || event.defaultPrevented || event.ctrlKey || event.metaKey || event.altKey || ignored(event.target)) return;
        const heading = ["ArrowRight", "ArrowDown", "PageDown"].includes(event.key) ? 1 :
            ["ArrowLeft", "ArrowUp", "PageUp"].includes(event.key) ? -1 :
            event.key === " " || event.key === "Spacebar" ? (event.shiftKey ? -1 : 1) : 0;
        if (heading) { event.preventDefault(); if (!event.repeat) go(heading); }
    }

    function onEscape(event: KeyboardEvent) {
        if (event.key === "Escape" && !event.defaultPrevented && active && visible && !document.hidden) pauseInternal(false);
    }

    async function activate(frame = startFrame) {
        const token = ++activation;
        await prepare();
        if (destroyed || token !== activation) return;
        active = false; automaticPause = false;
        position = entryFrame = orbitModulo(Math.round(Number.isFinite(frame) ? frame : startFrame), total); direction = 1;
        settling = null; pendingMove = null; pausedAt = 0; dropInspection();
        state = "loading";
        const initial = nearestFirst(windowIndices(position, 1), position);
        setRestBuffer(position, true);
        try { await waitForFrames(initial, token); }
        catch (reason) {
            if (!destroyed && token === activation) { fail(failedIndex(initial) ?? frameAt()); notify(); }
            throw reason;
        }
        if (destroyed || token !== activation) return;
        active = true; canvas.style.touchAction = "pinch-zoom";
        // Do not interpret the approach's remaining wheel momentum as an orbit move.
        lastWheelAt = performance.now(); wheelLatched = true;
        state = "checkpoint";
        // A custom entry frame is parked exactly; the eight selectable cameras stay fixed.
        setRestBuffer(position); paint(performance.now()); notify(); void prepareInspection();
        if (!visible || document.hidden) pauseInternal(true);
    }

    function deactivate() {
        activation++; active = false; automaticPause = false; releaseDrag(); settling = null; pendingMove = null; pausedAt = 0;
        if (raf) cancelAnimationFrame(raf); raf = 0; dropInspection();
        canvas.style.touchAction = originalTouchAction;
        error = undefined;
        state = prepared ? "idle" : preparing ? "loading" : "idle";
        if (started && !destroyed) setRestBuffer(startFrame, true);
        else { finishWaiters(); notify(); }
    }

    async function retry() {
        if (destroyed) return;
        const token = activation, wasActive = active, remainPaused = errorWasPaused;
        // A decoder failure may be an invalid cached response. Refresh only those
        // sources; successful downloads and resident bitmaps remain untouched.
        for (const index of decodeFailed.keys()) { blobs.delete(index); refresh.add(index); }
        fetchFailed.clear(); decodeFailed.clear(); error = undefined; errorWasPaused = false;
        if (!prepared) {
            preparePromise = null;
            await prepare();
        } else {
            state = wasActive ? (pendingMove ? (remainPaused ? "paused" : "buffering") : "paused") : "loading";
            try { await waitForFrames([...required], token, true); }
            catch (reason) { if (!destroyed && token === activation) { fail(failedIndex([...required]) ?? frameAt()); notify(); } throw reason; }
        }
        if (destroyed || token !== activation || !wasActive) return;
        if (remainPaused) { state = "paused"; notify(); }
        else if (pendingMove) { state = "buffering"; resourcesChanged(); }
        else { state = "paused"; resume(); }
    }

    const resizeObserver = typeof ResizeObserver === "function" ? new ResizeObserver(() => {
        lastPaint = "";
        if (active && state === "paused") paint(performance.now()); else requestPaint();
    }) : null;
    resizeObserver?.observe(canvas);
    const intersectionObserver = typeof IntersectionObserver === "function" ? new IntersectionObserver(entries => {
        const entry = entries.find(value => value.target === root);
        if (entry) { visible = entry.isIntersecting && entry.intersectionRatio > 0; visibilityChanged(); }
    }) : null;
    intersectionObserver?.observe(root);
    const resize = () => { lastPaint = ""; if (active && state === "paused") paint(performance.now()); else requestPaint(); };
    const reducedChanged = () => {
        if (reduced() && active && fullyReady() && (state === "moving" || state === "settling")) arrive(settling?.target ?? nextCheckpoint(position, direction));
    };
    window.addEventListener("wheel", onWheel, { passive: false, capture: true });
    window.addEventListener("pointerdown", onPointerDown, true);
    window.addEventListener("pointermove", onPointerMove, { passive: false, capture: true });
    window.addEventListener("pointerup", onPointerUp, true); window.addEventListener("pointercancel", onPointerCancel, true);
    window.addEventListener("touchstart", onTouchStart, { passive: true, capture: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false, capture: true });
    window.addEventListener("touchend", onTouchEnd, true); window.addEventListener("touchcancel", onTouchCancel, true);
    window.addEventListener("click", onClick, true); window.addEventListener("keydown", onKeyDown, true);
    window.addEventListener("resize", resize); window.addEventListener("keydown", onEscape);
    document.addEventListener("visibilitychange", visibilityChanged);
    reducedQuery?.addEventListener?.("change", reducedChanged);
    notify();

    return {
        prepare, activate, deactivate, go, setCheckpoint, pause: () => pauseInternal(false), resume, retry, snapshot,
        destroy() {
            if (destroyed) return;
            destroyed = true; deactivate(); cancellation.abort();
            const reject = prepareReject; prepareResolve = prepareReject = null; reject?.(new Error("Orbit disposed"));
            waiters.splice(0).forEach(waiter => waiter.resolve());
            frames.forEach(bitmap => bitmap.close()); frames.clear(); blobs.clear();
            resizeObserver?.disconnect(); intersectionObserver?.disconnect();
            window.removeEventListener("wheel", onWheel, true); window.removeEventListener("pointerdown", onPointerDown, true);
            window.removeEventListener("pointermove", onPointerMove, true); window.removeEventListener("pointerup", onPointerUp, true);
            window.removeEventListener("pointercancel", onPointerCancel, true); window.removeEventListener("click", onClick, true);
            window.removeEventListener("touchstart", onTouchStart, true); window.removeEventListener("touchmove", onTouchMove, true);
            window.removeEventListener("touchend", onTouchEnd, true); window.removeEventListener("touchcancel", onTouchCancel, true);
            window.removeEventListener("keydown", onKeyDown, true);
            window.removeEventListener("resize", resize); window.removeEventListener("keydown", onEscape); document.removeEventListener("visibilitychange", visibilityChanged);
            reducedQuery?.removeEventListener?.("change", reducedChanged);
        },
    };
}
