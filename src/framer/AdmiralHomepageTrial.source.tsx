import * as React from "react"
import type { ComponentType } from "react"
import { addPropertyControls, ControlType, useIsStaticRenderer } from "framer"
import AdmiralApartmentDetailCard from "./AdmiralApartmentDetailCard.tsx"

const HOMEPAGE_HERO_NAMES: string[] = __HERO_NAMES__
const HOMEPAGE_CONNECTION_NAMES: string[] = __CONNECTION_NAMES__
const HOMEPAGE_ORBIT_NAMES: string[] = __ORBIT_NAMES__
const HOMEPAGE_HERO_VERSION = "__HERO_VERSION__"
const HOMEPAGE_CONNECTION_VERSION = "__CONNECTION_VERSION__"
const HOMEPAGE_ORBIT_VERSION = "__ORBIT_VERSION__"
const HOMEPAGE_ASSETS = "https://raw.githubusercontent.com/UnbuiltMarket/admiral-park/main/assets"
type HomepageStage = "opening" | "approach" | "building" | "connection" | "handoff" | "orbit"
interface HomepageTiming { openingOut: number; buildingIn: number; buildingFull: number; ctaIn: number; rise: number }
interface HomepageMobileLayout { enabled: boolean; storyTop: number; storyMaxHeight: number; storyLeft?: number; storyWidth?: number }
interface HomepageChannel { snapshot: SequenceSnapshot; timing: HomepageTiming; enabled: boolean; stage: HomepageStage; orbit: OrbitSnapshot; story: OrbitStorySettings; static: boolean; mobile: HomepageMobileLayout | null }
const homepageChannels = new Map<HTMLElement, HomepageChannel>()
const homepageSubscribers = new Set<() => void>()
const notifyHomepage = () => homepageSubscribers.forEach(update => update())
interface AdmiralHomepageTrialProps {
    useGitHubAssets?: boolean; heroBaseUrl?: string; connectionBaseUrl?: string; orbitBaseUrl?: string
    startView?: "opening" | "orbit"; editorView?: "opening" | "building" | "connection" | "orbit"; editorOrbitView?: string; orbitStartFrame?: number
    duration?: number; connectionDuration?: number; maxSpeed?: number; momentum?: number; triggerDistance?: number
    checkpointCount?: number; motionWidth?: number; orbitMobileWidth?: number; inspectionWidth?: number
    desktopBuffer?: number; phoneBuffer?: number
    phoneFraming?: boolean; phoneImageWidth?: number; phoneImageTop?: number
    snapDuration?: number; frameBlend?: number
    orbitStories?: boolean; storyIn?: number; storyOut?: number; storyDelay?: number
    storyView1?: OrbitStoryViewMotion; storyView2?: OrbitStoryViewMotion; storyView3?: OrbitStoryViewMotion; storyView4?: OrbitStoryViewMotion
    storyView5?: OrbitStoryViewMotion; storyView6?: OrbitStoryViewMotion; storyView7?: OrbitStoryViewMotion; storyView8?: OrbitStoryViewMotion
    focalX?: number; focalY?: number; darken?: number; showControls?: boolean; showViewpoints?: boolean; showDiagnostics?: boolean
    openingOut?: number; buildingIn?: number; buildingFull?: number; ctaIn?: number; rise?: number
    detailsMode?: "preview" | "hover" | "off"; detailsLanguage?: ApartmentDetailsLanguage
    detailsBottom?: number; detailsInset?: number; apartmentPreview?: ApartmentDetailsPreview
    orbitLayout?: "mobile" | "studio" | "classic"; apartmentDataUrl?: string; apartmentAssetBase?: string; previewApartmentId?: string
    detailPageUrl?: string; detailDataUrl?: string; inquiryUrl?: string; orbitBackground?: string
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
interface HomepageFramingConfig { enabled: boolean; sourceWidth: number; top: number; detailsHeight: number; detailsBottom: number; reserveDetails: boolean }
function homepageImageRect(progress: number, bounds: { width: number; height: number }, config: HomepageFramingConfig) {
    if (!config.enabled || bounds.width > 767 || bounds.width <= 0 || bounds.height <= 0) return null
    const sourceWidth = sequenceClamp(Number.isFinite(config.sourceWidth) ? config.sourceWidth : 100, 80, 100) / 100
    const reserved = config.reserveDetails ? config.detailsHeight + sequenceClamp(config.detailsBottom, 0, 400) + 32 : 24
    const available = Math.max(1, bounds.height - reserved)
    const height = Math.min(bounds.width * 1010 / (1920 * sourceWidth), available)
    const top = sequenceClamp(Number.isFinite(config.top) ? config.top : 80, 0, Math.max(0, available - height))
    const amount = sequenceEase(sequenceClamp(progress))
    return { x: 0, y: top * amount, width: bounds.width, height: bounds.height + (height - bounds.height) * amount }
}

interface HomepagePagePin { owners: Set<symbol>; release: () => void }
function pinHomepagePage(): () => void {
    const key = Symbol.for("admiral-park:homepage-page-pin:v1")
    const shared = window as typeof window & { [key: symbol]: HomepagePagePin | undefined }
    let pin = shared[key]
    if (!pin) {
        const html = document.documentElement, body = document.body
        const x = window.scrollX, y = window.scrollY
        const scrollbar = Math.max(0, window.innerWidth - html.clientWidth)
        const padding = parseFloat(getComputedStyle(body).paddingRight) || 0
        const owned: { element: HTMLElement; property: string; before: string; priority: string; value: string }[] = []
        const set = (element: HTMLElement, property: string, value: string) => {
            const before = element.style.getPropertyValue(property), priority = element.style.getPropertyPriority(property)
            element.style.setProperty(property, value, "important")
            owned.push({ element, property, before, priority, value: element.style.getPropertyValue(property) })
        }
        // Pin the page independently of stage and image bounds. Native children
        // still scroll, and no early preventDefault can swallow orbit gestures.
        set(html, "overflow-x", "hidden")
        set(html, "overflow-y", "hidden")
        set(html, "overscroll-behavior-y", "none")
        set(body, "position", "fixed")
        set(body, "top", `${-y}px`)
        set(body, "left", `${-x}px`)
        set(body, "width", "100%")
        set(body, "box-sizing", "border-box")
        if (scrollbar) set(body, "padding-right", `${padding + scrollbar}px`)
        pin = { owners: new Set(), release: () => {
            for (const item of owned.reverse()) {
                if (item.element.style.getPropertyValue(item.property) !== item.value || item.element.style.getPropertyPriority(item.property) !== "important") continue
                if (item.before) item.element.style.setProperty(item.property, item.before, item.priority)
                else item.element.style.removeProperty(item.property)
            }
            // The apartment dialog manages body overflow itself; never snapshot
            // or restore that property here, including when navigating away.
            window.scrollTo({ left: x, top: y, behavior: "instant" })
        } }
        shared[key] = pin
    }
    const owner = Symbol("homepage-page-pin")
    pin.owners.add(owner)
    return () => {
        if (!pin!.owners.delete(owner) || pin!.owners.size) return
        if (shared[key] === pin) delete shared[key]
        pin!.release()
    }
}

// @ORBIT_STORY_INSERT
// @ORBIT_APARTMENT_DATA_INSERT
// @ORBIT_APARTMENT_STUDIO_INSERT

/**
 * @framerSupportedLayoutWidth any-prefer-fixed
 * @framerSupportedLayoutHeight any-prefer-fixed
 * @framerIntrinsicWidth 1440
 * @framerIntrinsicHeight 900
 */
export default function AdmiralHomepageTrial(props: AdmiralHomepageTrialProps): React.JSX.Element {
    const {
        useGitHubAssets = true, heroBaseUrl = "", connectionBaseUrl = "", orbitBaseUrl = "", startView = "opening", editorView = "opening", editorOrbitView = "entry", orbitStartFrame = 45,
        duration = 2.5, connectionDuration = 2.5, maxSpeed = 1.8, momentum = .22, triggerDistance = 28, checkpointCount = 8,
        motionWidth = 960, orbitMobileWidth = 640, inspectionWidth = 1920, desktopBuffer = 2, phoneBuffer = 1, snapDuration = 1.5, frameBlend = 0,
        phoneFraming = true, phoneImageWidth = 100, phoneImageTop = 80,
        orbitStories = true, storyIn = .6, storyOut = .3, storyDelay = .12,
        storyView1, storyView2, storyView3, storyView4, storyView5, storyView6, storyView7, storyView8,
        focalX = 50, focalY = 50, darken = 0,
        showControls = true, showViewpoints = true, showDiagnostics = false,
        openingOut = 20, buildingIn = 68, buildingFull = 88, ctaIn = 86, rise = 20,
        detailsMode = "preview", detailsLanguage = "hu", detailsBottom = 32, detailsInset = 48, apartmentPreview,
        orbitLayout = "mobile", apartmentDataUrl = "https://raw.githubusercontent.com/UnbuiltMarket/admiral-park/main/data/apartments.json",
        apartmentAssetBase = HOMEPAGE_ASSETS + "/apartment-list/", previewApartmentId = "A001", detailPageUrl = "/lista", inquiryUrl = "", orbitBackground = "#fdfbfb",
        detailDataUrl = "https://raw.githubusercontent.com/UnbuiltMarket/admiral-park/main/data/apartment-details.json",
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
    const editorViewNumber = /^[1-8]$/.test(editorOrbitView) ? Number(editorOrbitView) : 0
    const editorPreviewFrame = staticRenderer && editorViewNumber ? Math.round((editorViewNumber - 1) * orbitUrls.length / 8) : orbitStartIndex
    const previewStage: HomepageStage = staticRenderer ? (editorView === "orbit" ? "orbit" : editorView === "building" ? "building" : editorView === "connection" ? "connection" : "opening") : startView === "orbit" ? "handoff" : "opening"
    const initialPoster = staticRenderer && editorView === "connection" ? connectionUrls[Math.floor(connectionUrls.length / 2)] :
        staticRenderer && editorView === "building" ? heroUrls[heroUrls.length - 1] :
        staticRenderer && editorView === "orbit" ? orbitUrls[editorPreviewFrame] : !staticRenderer && startView === "orbit" ? orbitPoster : heroUrls[0]
    const [stage, setStage] = React.useState<HomepageStage>(previewStage)
    const [posterUrl, setPosterUrl] = React.useState(initialPoster)
    const [heroState, setHeroState] = React.useState<SequenceState>("opening")
    const [orbitInfo, setOrbitInfo] = React.useState<OrbitSnapshot>({ state: "idle", frame: orbitStartIndex, checkpoint: -1, direction: 1, ready: 0, total: orbitUrls.length, decoded: 0, downloaded: 0, buffered: 0, bufferTotal: 0, requiredReady: 0, requiredTotal: 0, position: orbitStartIndex, userPaused: false, suspended: false })
    const [reduced, setReduced] = React.useState(false)
    const [hostVisible, setHostVisible] = React.useState(false)
    const [detailsHeight, setDetailsHeight] = React.useState(140)
    const [mobilePresentation, setMobilePresentation] = React.useState(false)
    const useStudio = (orbitLayout === "studio" || orbitLayout === "mobile" && mobilePresentation) && detailsMode !== "off"
    // Every orbit layout uses real apartment IDs so its floorplan opens the shared card.
    const jsonDetails = detailsMode !== "off"
    const [selectedApartmentId, setSelectedApartmentId] = React.useState<string | null>(null)
    const [detailApartmentId, setDetailApartmentId] = React.useState<string | null>(null)
    const detailOpen = React.useRef(false)
    const apartmentData = useOrbitApartments(apartmentDataUrl, jsonDetails && (staticRenderer && editorView === "orbit" || hostVisible && ["building", "connection", "handoff", "orbit"].includes(stage)))
    const selectedApartment = React.useMemo(() => {
        const records = apartmentData.dataset?.apartments || []
        return records.find(item => item.id === selectedApartmentId) || (detailsMode === "preview" ? records.find(item => item.id === previewApartmentId) || records[0] || null : null)
    }, [apartmentData.dataset, selectedApartmentId, previewApartmentId, detailsMode])
    const selectedApartmentDetails = React.useMemo<ApartmentDetailsData | null>(() => selectedApartment ? {
        id: selectedApartment.id, number: selectedApartment.id, area: selectedApartment.areaInterior, terrace: selectedApartment.areaTerrace,
        garden: selectedApartment.areaGarden, rooms: selectedApartment.rooms,
        availability: selectedApartment.status === "under_negotiation" ? detailsLanguage === "en" ? "Under negotiation" : selectedApartment.statusLabel || "Tárgyalás alatt" : selectedApartment.status,
        floorplanUrl: orbitApartmentAssetUrl(selectedApartment.media?.floorplan?.thumbnail || selectedApartment.media?.floorplan?.full || selectedApartment.floorplan || "", apartmentAssetBase) || undefined,
    } : null, [selectedApartment, apartmentAssetBase, detailsLanguage])
    const detailsModeRef = React.useRef(detailsMode); detailsModeRef.current = detailsMode
    const clearApartmentDetails = React.useCallback(() => {
        if (detailsModeRef.current === "hover") setSelectedApartmentId(null)
    }, [])
    const rootRef = React.useRef<HTMLDivElement>(null), heroRootRef = React.useRef<HTMLDivElement>(null)
    const heroCanvasRef = React.useRef<HTMLCanvasElement>(null), orbitCanvasRef = React.useRef<HTMLCanvasElement>(null), posterRef = React.useRef<HTMLImageElement>(null)
    const actions = React.useRef<HomepageActions | null>(null)
    const openApartmentDetails = React.useCallback((id?: string) => {
        const value = id || selectedApartment?.id, root = rootRef.current
        if (!jsonDetails || staticRenderer || !value || !apartmentData.dataset?.apartments.some(apartment => apartment.id === value) || !root ||
            root.dataset.homepageStage !== "orbit" || root.dataset.orbitState !== "checkpoint" || Number(root.dataset.orbitCheckpoint) < 0) return
        setSelectedApartmentId(value); detailOpen.current = true; actions.current?.orbit?.setSuspended(true); setDetailApartmentId(value)
    }, [jsonDetails, staticRenderer, selectedApartment?.id, apartmentData.dataset])
    const closeApartmentDetails = React.useCallback(() => {
        detailOpen.current = false; setDetailApartmentId(null); actions.current?.orbit?.setSuspended(false)
    }, [])
    const reportDetailOpen = React.useCallback((open: boolean) => {
        if (rootRef.current) rootRef.current.dataset.apartmentDetailOpen = String(open)
    }, [])
    const studioViewportRef = React.useRef<HTMLDivElement | null>(null)
    const studioEnabled = React.useRef(useStudio); studioEnabled.current = useStudio
    const framingConfig = React.useRef<HomepageFramingConfig>({ enabled: phoneFraming, sourceWidth: phoneImageWidth, top: phoneImageTop, detailsHeight, detailsBottom, reserveDetails: detailsMode !== "off" })
    framingConfig.current = { enabled: phoneFraming, sourceWidth: phoneImageWidth, top: phoneImageTop, detailsHeight, detailsBottom, reserveDetails: detailsMode !== "off" }
    const refreshPresentation = React.useRef<() => void>(() => {})
    const setStudioViewport = React.useCallback((element: HTMLDivElement | null) => { studioViewportRef.current = element; queueMicrotask(() => refreshPresentation.current()) }, [])
    const refreshStudioLayout = React.useCallback(() => { refreshPresentation.current() }, [])
    const timing = React.useRef<HomepageTiming>({ openingOut, buildingIn, buildingFull, ctaIn, rise })
    timing.current = { openingOut, buildingIn, buildingFull, ctaIn, rise }
    const storySettings = React.useMemo<OrbitStorySettings>(() => ({
        enabled: orbitStories && checkpointCount === 8, enterDuration: storyIn, exitDuration: storyOut, delay: storyDelay,
        views: [storyView1, storyView2, storyView3, storyView4, storyView5, storyView6, storyView7, storyView8].map((view, index) => ({ ...DEFAULT_ORBIT_STORY_VIEWS[index], ...view })),
    }), [orbitStories, checkpointCount, storyIn, storyOut, storyDelay, storyView1, storyView2, storyView3, storyView4, storyView5, storyView6, storyView7, storyView8])
    const story = React.useRef(storySettings)
    story.current = storySettings

    React.useEffect(() => {
        const root = rootRef.current
        if (!root) return
        const coarse = window.matchMedia("(pointer: coarse)")
        const update = () => {
            const width = root.clientWidth, height = root.clientHeight
            setMobilePresentation(width > 0 && (width <= 767 || coarse.matches && height > 0 && Math.min(width, height) <= 767))
        }
        const observer = new ResizeObserver(update)
        observer.observe(root); coarse.addEventListener("change", update); update()
        return () => { observer.disconnect(); coarse.removeEventListener("change", update) }
    }, [])

    React.useEffect(() => {
        const root = rootRef.current
        if (!root || staticRenderer) return
        const ancestors: HTMLElement[] = []
        for (let element: HTMLElement | null = root; element; element = element.parentElement) ancestors.push(element)
        const watched = new Set(ancestors), inlineVisibility = new WeakMap<HTMLElement, string>()
        const visibilityKey = (element: HTMLElement) => [element.style.display, element.style.visibility, element.style.opacity].join("|")
        ancestors.forEach(element => inlineVisibility.set(element, visibilityKey(element)))
        let frame: number | null = null
        const update = () => {
            frame = null
            const box = root.getBoundingClientRect()
            const hidden = !root.isConnected || ancestors.some(element => {
                const css = getComputedStyle(element)
                return element.hidden || css.display === "none" || css.visibility === "hidden" || css.visibility === "collapse" || Number(css.opacity) === 0
            })
            setHostVisible(!hidden && box.width > 0 && box.height > 0 && box.bottom > 0 && box.top < innerHeight && box.right > 0 && box.left < innerWidth)
        }
        const schedule = () => { if (frame === null) frame = requestAnimationFrame(update) }
        const resize = new ResizeObserver(schedule), intersection = new IntersectionObserver(schedule)
        const mutations = new MutationObserver(records => {
            let changed = false
            for (const record of records) {
                const element = record.target as HTMLElement, current = visibilityKey(element)
                if (record.attributeName !== "style" || current !== inlineVisibility.get(element)) changed = true
                inlineVisibility.set(element, current)
            }
            if (changed) schedule()
        })
        ancestors.forEach(element => mutations.observe(element, { attributes: true, attributeFilter: ["style", "class", "hidden"] }))
        const end = (event: Event) => { if (watched.has(event.target as HTMLElement)) schedule() }
        window.addEventListener("resize", schedule)
        window.addEventListener("transitionend", end, true); window.addEventListener("animationend", end, true)
        resize.observe(root); intersection.observe(root); update()
        return () => {
            resize.disconnect(); intersection.disconnect(); mutations.disconnect()
            window.removeEventListener("resize", schedule)
            window.removeEventListener("transitionend", end, true); window.removeEventListener("animationend", end, true)
            if (frame !== null) cancelAnimationFrame(frame)
        }
    }, [staticRenderer])

    React.useEffect(() => {
        if (!staticRenderer && hostVisible) return pinHomepagePage()
    }, [staticRenderer, hostVisible])

    React.useEffect(() => {
        if (!hostVisible && detailApartmentId) closeApartmentDetails()
    }, [hostVisible, detailApartmentId, closeApartmentDetails])

    React.useEffect(() => {
        const root = rootRef.current, heroRoot = heroRootRef.current, heroCanvas = heroCanvasRef.current, orbitCanvas = orbitCanvasRef.current, poster = posterRef.current
        if (!root || !heroRoot || !heroCanvas || !orbitCanvas || !poster || (!staticRenderer && !hostVisible)) return
        let disposed = false, heroGeneration = 0, enterToken = 0
        let currentStage: HomepageStage = previewStage
        let presentationProgress = previewStage === "orbit" || previewStage === "handoff" ? 1 : previewStage === "connection" ? .5 : 0
        let mobileLayout: HomepageMobileLayout | null = null
        let hero: ReturnType<typeof createHeroSequence> | null = null
        let activeSequence: "SEQ_01" | "SEQ_02" = "SEQ_01", connectionWarmed = false
        let heroSnapshot: SequenceSnapshot = { state: previewStage === "building" ? "arrival" : "opening", progress: previewStage === "building" ? 1 : 0, frame: previewStage === "building" ? heroUrls.length - 1 : 0, direction: 1, held: false, decoded: 0, downloaded: 0 }
        const cameraCount = Math.round(Math.min(orbitUrls.length, Math.max(1, checkpointCount)))
        const editorCheckpoint = Array.from({ length: cameraCount }, (_, index) => Math.round(index * orbitUrls.length / cameraCount)).indexOf(editorPreviewFrame)
        let orbitSnapshot: OrbitSnapshot = { state: staticRenderer && previewStage === "orbit" ? "checkpoint" : "idle", frame: editorPreviewFrame,
            checkpoint: staticRenderer && previewStage === "orbit" ? editorCheckpoint : -1, direction: 1, ready: 0, total: orbitUrls.length, decoded: 0, downloaded: 0,
            buffered: 0, bufferTotal: 0, requiredReady: 0, requiredTotal: 0, position: editorPreviewFrame, userPaused: false, suspended: false }
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
        function viewportFor(progress: number, bounds: { width: number; height: number }) {
            const slot = studioEnabled.current ? studioViewportRef.current?.getBoundingClientRect() : null
            if (slot && slot.width > 0 && slot.height > 0) {
                const rootBounds = root!.getBoundingClientRect(), amount = sequenceEase(sequenceClamp(progress))
                const scale = Math.min(slot.width / 1920, slot.height / 1010)
                const targetWidth = 1920 * scale, targetHeight = 1010 * scale
                const x = slot.left - rootBounds.left + (slot.width - targetWidth) / 2
                const y = slot.top - rootBounds.top + (slot.height - targetHeight) / 2
                return { x: x * amount, y: y * amount, width: bounds.width + (targetWidth - bounds.width) * amount, height: bounds.height + (targetHeight - bounds.height) * amount }
            }
            // Core drawing uses screen bounds; CSS clipping uses unscaled local pixels.
            const width = root!.clientWidth || bounds.width, height = root!.clientHeight || bounds.height
            const local = homepageImageRect(progress, { width, height }, framingConfig.current)
            return local ? { x: local.x * bounds.width / width, y: local.y * bounds.height / height,
                width: local.width * bounds.width / width, height: local.height * bounds.height / height } : null
        }
        function publish() {
            homepageChannels.set(root!, { snapshot: heroSnapshot, timing: timing.current, stage: currentStage, orbit: orbitSnapshot, story: story.current, static: staticRenderer, mobile: mobileLayout, enabled: currentStage === "opening" || currentStage === "approach" || currentStage === "building" })
            notifyHomepage()
        }
        function applyPresentation() {
            const bounds = root!.getBoundingClientRect()
            const requested = viewportFor(presentationProgress, bounds)
            const rect = requested || { x: 0, y: 0, width: bounds.width, height: bounds.height }
            const setStyle = (name: string, value: string) => { if (root!.style.getPropertyValue(name) !== value) root!.style.setProperty(name, value) }
            const cssScaleY = bounds.height > 0 ? (root!.clientHeight || bounds.height) / bounds.height : 1
            const cssScaleX = bounds.width > 0 ? (root!.clientWidth || bounds.width) / bounds.width : 1
            setStyle("--admiral-image-x", rect.x * cssScaleX + "px")
            setStyle("--admiral-image-width", rect.width * cssScaleX + "px")
            setStyle("--admiral-image-right", Math.max(0, bounds.width - rect.x - rect.width) * cssScaleX + "px")
            setStyle("--admiral-image-y", rect.y * cssScaleY + "px")
            setStyle("--admiral-image-height", rect.height * cssScaleY + "px")
            setStyle("--admiral-image-cut", Math.max(0, bounds.height - rect.y - rect.height) * cssScaleY + "px")
            const studioAmount = studioEnabled.current && (currentStage === "orbit" || currentStage === "handoff") ? 1 : studioEnabled.current && currentStage === "connection" ? sequenceEase(sequenceClamp((presentationProgress - .65) / .35)) : 0
            setStyle("--admiral-studio-light", String(studioAmount))
            const controls = root!.querySelector<HTMLElement>("[data-homepage-controls]")
            setStyle("--admiral-controls-left", (rect.x + rect.width / 2) * cssScaleX + "px")
            setStyle("--admiral-controls-top", Math.max(rect.y + 8, rect.y + rect.height - (controls?.offsetHeight || 48) / cssScaleY - 12) * cssScaleY + "px")
            setStyle("--admiral-controls-width", Math.max(100, rect.width * cssScaleX - 24) + "px")
            root!.dataset.mobileFraming = String(!!requested)
            root!.dataset.imageX = String(rect.x); root!.dataset.imageY = String(rect.y)
            root!.dataset.imageWidth = String(rect.width); root!.dataset.imageHeight = String(rect.height)
            root!.dataset.visibleImageWidth = String(Math.min(100, 100 * rect.width / Math.max(1, rect.height) / (1920 / 1010)))
            if (studioEnabled.current && requested) {
                mobileLayout = { enabled: true, storyLeft: rect.x + 24, storyWidth: Math.max(0, rect.width - 48), storyTop: rect.y + 24, storyMaxHeight: Math.max(0, rect.height - 116) }
            } else if (requested) {
                const details = root!.querySelector<HTMLElement>("[data-apartment-details]")
                const config = framingConfig.current
                // Ignore the strip's entrance translate: its parked position defines the story's space.
                const detailsBottom = details ? parseFloat(getComputedStyle(details).bottom) : config.detailsBottom
                const detailsTop = config.reserveDetails ? bounds.height - (Number.isFinite(detailsBottom) ? detailsBottom : config.detailsBottom) / cssScaleY -
                    (details ? details.getBoundingClientRect().height : config.detailsHeight / cssScaleY) : bounds.height - 16
                const controls = root!.querySelector<HTMLElement>("[data-homepage-controls]")
                const controlsTop = controls ? controls.getBoundingClientRect().top - bounds.top : bounds.height
                const storyTop = rect.y + rect.height + 20
                mobileLayout = { enabled: true, storyTop, storyMaxHeight: Math.max(0, Math.min(detailsTop, controlsTop) - 20 - storyTop) }
            } else mobileLayout = null
        }
        function changeStage(next: HomepageStage) {
            currentStage = next; root!.dataset.homepageStage = next; setStage(next); applyPresentation(); publish()
        }
        function changePoster(url: string) { poster!.src = url; setPosterUrl(url) }
        function destroyHero() { heroGeneration++; hero?.destroy(); hero = null }
        const orbit = staticRenderer ? null : createOrbitPlayer({
            root, canvas: orbitCanvas, urls: orbitUrls, startFrame: orbitStartIndex, decodeWidth, inspectionWidth: phone ? Math.min(inspectionWidth, 1280) : inspectionWidth,
            checkpointCount, bufferCheckpoints: phone ? phoneBuffer : desktopBuffer, snapDuration, frameBlend: frameBlend / 100, focalX: focalX / 100, focalY: focalY / 100,
            viewport: bounds => viewportFor(1, bounds),
            onUpdate(snapshot) {
                if (disposed) return
                orbitSnapshot = snapshot; publish()
                root!.dataset.orbitDownloaded = String(snapshot.downloaded)
                if (snapshot.state !== "checkpoint" || snapshot.checkpoint < 0) clearApartmentDetails()
                const key = `${snapshot.state}:${snapshot.checkpoint}:${Math.floor(snapshot.ready / 6)}:${Math.floor(snapshot.buffered / 6)}:${Math.floor(snapshot.requiredReady / 3)}:${snapshot.buffered === snapshot.bufferTotal}:${snapshot.requiredReady === snapshot.requiredTotal}:${snapshot.decoded > snapshot.buffered}`
                const now = performance.now()
                if (key !== lastOrbitUI || (showDiagnostics && now - lastUI > 150)) {
                    lastOrbitUI = key; lastUI = now; setOrbitInfo(snapshot)
                }
            },
        })
        orbit?.setSuspended(detailOpen.current)
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
            presentationProgress = 0; applyPresentation()
            activeSequence = "SEQ_01"; root!.dataset.activeSequence = activeSequence
            changePoster(heroUrls[atEnd ? heroUrls.length - 1 : 0])
            if (atEnd) heroSnapshot = { state: "arrival", progress: 1, frame: heroUrls.length - 1, direction: 1, held: false, decoded: 0, downloaded: 0 }
            changeStage(atEnd ? "building" : "opening")
            if (atEnd) arrivedAt = performance.now()
            const generation = ++heroGeneration
            hero = createHeroSequence({
                root: heroRoot!, canvas: heroCanvas!, poster: poster!, urls: heroUrls, duration, maxSpeed, momentum, triggerDistance, startAtEnd: atEnd,
                preservePresentation: atEnd, holdScroll: true, preload: true, cacheFrames: phone ? 10 : 14, decodeWidth: phone ? 1280 : 1920, focalX, focalY,
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
                presentationProgress = 1; applyPresentation()
                changeStage("orbit")
            } catch { /* The orbit reports a visible retry state. The completed sequence remains visible. */ }
        }
        function explore() {
            if (disposed || !orbit || !isVisible() || currentStage !== "building") return
            if (reducedMedia.matches) { void activateOrbit(); return }
            enterToken++; destroyHero(); clearApartmentDetails()
            presentationProgress = 0; applyPresentation()
            activeSequence = "SEQ_02"; root!.dataset.activeSequence = activeSequence
            changePoster(heroUrls[heroUrls.length - 1]); changeStage("connection")
            const generation = ++heroGeneration
            let completed = false
            hero = createHeroSequence({
                root: heroRoot!, canvas: heroCanvas!, poster: poster!, urls: connectionPlaybackUrls,
                duration: connectionDuration, maxSpeed, momentum, triggerDistance, preservePresentation: true,
                viewport: (progress, bounds) => viewportFor(progress, bounds),
                holdScroll: true, preload: true, cacheFrames: phone ? 10 : 14, decodeWidth: phone ? 1280 : 1920, focalX, focalY,
                inputFilter: event => !homepageBlocked(event.target),
                onUpdate(snapshot) {
                    if (disposed || generation !== heroGeneration) return
                    heroSnapshot = snapshot; setHeroState(previous => previous === snapshot.state ? previous : snapshot.state)
                    presentationProgress = snapshot.progress; applyPresentation()
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
                    if (!disposed && token === enterToken) { presentationProgress = 1; applyPresentation(); changeStage("orbit") }
                }
            } catch { /* The retry control remains available. */ }
        }
        function relayControlClick(event: MouseEvent) {
            if (event.defaultPrevented || detailOpen.current || !isVisible() || root!.contains(event.target as Node) || homepageBlocked(event.target)) return
            // Passive Framer overlay frames can cover the viewport. Relay only a click
            // over one of our visible controls; genuine links and buttons above stay native.
            for (const button of Array.from(root!.querySelectorAll<HTMLButtonElement>("[data-homepage-controls] button, button[data-apartment-open], button[data-orbit-detail-link]"))) {
                if (button.disabled || button.getAttribute("aria-disabled") === "true" || button.closest("[inert], [hidden], [aria-hidden='true']")) continue
                let visible = true
                for (let element: HTMLElement | null = button; element; element = element.parentElement) {
                    const css = getComputedStyle(element)
                    if (css.display === "none" || css.visibility === "hidden" || css.visibility === "collapse" || Number(css.opacity) === 0) { visible = false; break }
                    if (element === root) break
                }
                if (!visible) continue
                const box = button.getBoundingClientRect()
                if (box.width > 0 && box.height > 0 && event.clientX >= box.left && event.clientX <= box.right && event.clientY >= box.top && event.clientY <= box.bottom) {
                    event.preventDefault(); event.stopPropagation(); button.focus({ preventScroll: true }); button.click(); return
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
        const refresh = () => { if (!disposed) { applyPresentation(); hero?.redraw(); orbit?.redraw(); publish() } }
        refreshPresentation.current = refresh
        const presentationResize = new ResizeObserver(refresh)
        presentationResize.observe(root)
        if (studioViewportRef.current) presentationResize.observe(studioViewportRef.current)
        applyPresentation()
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
            presentationResize.disconnect(); refreshPresentation.current = () => {}
            actions.current = null; delete (root as HTMLElement & { retryOrbit?: () => Promise<void> }).retryOrbit
            homepageChannels.delete(root); notifyHomepage()
        }
    }, [heroUrls, connectionUrls, connectionPlaybackUrls, orbitUrls, staticRenderer, hostVisible, startView, editorView, duration, connectionDuration, maxSpeed, momentum, triggerDistance, checkpointCount,
        motionWidth, orbitMobileWidth, inspectionWidth, desktopBuffer, phoneBuffer, orbitStartIndex, editorPreviewFrame, snapDuration, frameBlend, focalX, focalY, showDiagnostics, clearApartmentDetails])

    React.useEffect(() => { refreshPresentation.current() }, [phoneFraming, phoneImageWidth, phoneImageTop, detailsHeight, detailsBottom, detailsMode, useStudio, showControls, showViewpoints, stage, orbitInfo.state])

    React.useEffect(() => {
        const slot = studioViewportRef.current
        if (!useStudio || !slot) return
        const observer = new ResizeObserver(() => refreshPresentation.current())
        observer.observe(slot)
        return () => observer.disconnect()
    }, [useStudio])

    React.useEffect(() => {
        const root = rootRef.current
        if (!root || !jsonDetails) return
        function selectFromMask(event: Event) {
            if (root!.dataset.homepageStage !== "orbit" || root!.dataset.orbitState !== "checkpoint") return
            const detail = (event as CustomEvent<unknown>).detail
            const values = detail && typeof detail === "object" ? detail as { id?: unknown; apartmentId?: unknown; number?: unknown } : null
            const value = typeof detail === "string" ? detail : values?.id ?? values?.apartmentId ?? values?.number
            if (typeof value === "string" && apartmentData.dataset?.apartments.some(item => item.id === value)) setSelectedApartmentId(value)
        }
        root.addEventListener("admiral:apartment-hover", selectFromMask)
        return () => root.removeEventListener("admiral:apartment-hover", selectFromMask)
    }, [jsonDetails, apartmentData.dataset])

    React.useEffect(() => {
        const root = rootRef.current
        if (!root || staticRenderer) return
        const click = (event: Event) => {
            const detail = (event as CustomEvent<unknown>).detail
            const values = detail && typeof detail === "object" ? detail as { id?: unknown; apartmentId?: unknown; number?: unknown } : null
            const id = typeof detail === "string" ? detail : values?.id ?? values?.apartmentId ?? values?.number
            if (typeof id === "string") openApartmentDetails(id)
        }
        root.addEventListener("admiral:apartment-click", click)
        return () => root.removeEventListener("admiral:apartment-click", click)
    }, [openApartmentDetails, staticRenderer])
    React.useEffect(() => { if (stage !== "orbit" && detailApartmentId) closeApartmentDetails() }, [stage, detailApartmentId, closeApartmentDetails])

    React.useEffect(() => {
        const root = rootRef.current, channel = root && homepageChannels.get(root)
        if (channel) { channel.timing = timing.current; notifyHomepage() }
    }, [openingOut, buildingIn, buildingFull, ctaIn, rise])
    React.useEffect(() => {
        const root = rootRef.current, channel = root && homepageChannels.get(root)
        if (channel) { channel.story = story.current; notifyHomepage() }
    }, [storySettings])
    React.useEffect(() => {
        const root = rootRef.current
        if (!root || staticRenderer) return
        clearApartmentDetails()
        // Keep the last valid facade hover readable while the pointer moves to
        // its floorplan. A camera move or leaving this viewer clears Hover mode.
        root.addEventListener("pointerleave", clearApartmentDetails)
        return () => root.removeEventListener("pointerleave", clearApartmentDetails)
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
    const detailsData = selectedApartmentDetails
    const detailsVisible = !useStudio && (detailsMode === "preview" ? (orbitStatic || (orbitVisible && orbitInfo.state === "checkpoint")) :
        detailsMode === "hover" && orbitVisible && orbitInfo.state === "checkpoint" && orbitInfo.checkpoint >= 0 && detailsData !== null)
    const controlsBottom = detailsVisible ? `calc(${detailsBottom + detailsHeight + 20}px + env(safe-area-inset-bottom, 0px))` : "18px"
    const diagnosticBottom = detailsVisible ? detailsBottom + detailsHeight + (showControls ? 112 : 20) : 94
    const studioControls = useStudio && (stage === "orbit" || stage === "handoff")
    const imageClip = "inset(var(--admiral-image-y, 0px) var(--admiral-image-right, 0px) var(--admiral-image-cut, 0px) var(--admiral-image-x, 0px))"
    return (
        <div ref={rootRef} data-admiral-homepage="" data-admiral-orbit="" data-homepage-stage={stage} role="region" aria-label={alt} tabIndex={0}
            style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden", background, "--admiral-orbit-background": orbitBackground, ...style } as React.CSSProperties}>
            <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: orbitBackground, opacity: "var(--admiral-studio-light, 0)" as unknown as number, pointerEvents: "none" }} />
            {useStudio && <OrbitApartmentStudio active={orbitVisible || orbitStatic} mode={detailsMode} dataset={apartmentData.dataset} dataStatus={apartmentData.status} error={apartmentData.error}
                onRetry={apartmentData.retry} apartment={selectedApartment} onSelect={setSelectedApartmentId} assetBase={apartmentAssetBase} detailsUrl={detailPageUrl} inquiryUrl={inquiryUrl}
                onViewport={setStudioViewport} language={detailsLanguage} onLayout={refreshStudioLayout} onOpenDetails={() => openApartmentDetails()} />}
            <div ref={heroRootRef} data-admiral-sequence="" style={{ position: "absolute", inset: 0, zIndex: 2, pointerEvents: stage === "orbit" || stage === "handoff" ? "none" : "auto", clipPath: imageClip }}>
                <img ref={posterRef} src={posterUrl} alt={alt} loading="eager" decoding="async" {...{ fetchpriority: "high" }} crossOrigin="anonymous" draggable={false}
                    style={{ position: "absolute", top: "var(--admiral-image-y, 0px)", left: "var(--admiral-image-x, 0px)", width: "var(--admiral-image-width, 100%)", height: "var(--admiral-image-height, 100%)", objectFit: "cover", objectPosition: `${focalX}% ${focalY}%`, pointerEvents: "none" }} />
                <canvas ref={heroCanvasRef} aria-hidden="true" width={1} height={1} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0, clipPath: "inset(var(--admiral-image-y, 0px) 0px var(--admiral-image-cut, 0px) 0px)" }} />
            </div>
            <canvas ref={orbitCanvasRef} aria-hidden="true" width={1} height={1} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 2, opacity: orbitVisible ? 1 : 0, transition: reduced ? "none" : "opacity .35s", touchAction: "pan-y pinch-zoom", pointerEvents: orbitVisible ? "auto" : "none", clipPath: imageClip }} />
            {orbitStatic && <span style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />}
            <div aria-hidden="true" style={{ position: "absolute", top: "var(--admiral-image-y, 0px)", left: "var(--admiral-image-x, 0px)", width: "var(--admiral-image-width, 100%)", height: "var(--admiral-image-height, 100%)", background: "#000", opacity: darken, pointerEvents: "none", zIndex: 2 }} />
            {!staticRenderer && showControls && <div data-homepage-controls="" data-orbit-ignore="" style={{ position: "absolute", bottom: studioControls ? "auto" : controlsBottom, top: studioControls ? "var(--admiral-controls-top)" : "auto", left: studioControls ? "var(--admiral-controls-left)" : "50%", transform: "translateX(-50%)", display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap", gap: 7, width: "max-content", maxWidth: studioControls ? "var(--admiral-controls-width)" : "94%", zIndex: 3 }}>
                {(stage === "opening" || stage === "approach") && <button type="button" style={homepageButton} onClick={() => actions.current?.skip()}>Skip approach</button>}
                {stage === "approach" && (heroState === "paused" || heroState === "error") && <button type="button" style={homepageButton} onClick={() => actions.current?.resumeHero()}>{heroState === "error" ? "Retry approach" : "Continue approach"}</button>}
                {stage === "connection" && <button type="button" style={homepageButton} onClick={() => actions.current?.skip()}>Skip connection</button>}
                {stage === "connection" && (heroState === "paused" || heroState === "error") && <button type="button" style={homepageButton} onClick={() => actions.current?.resumeHero()}>{heroState === "error" ? "Retry connection" : "Continue connection"}</button>}
                {stage === "building" && <button type="button" style={homepageButton} onClick={() => actions.current?.explore()}>Explore building</button>}
                {stage === "handoff" && orbitInfo.state !== "error" && <span role="status" style={{ ...homepageButton, cursor: "default" }}>Preparing orbit {preparationPercent}%</span>}
                {(stage === "building" || stage === "handoff" || stage === "orbit") && orbitInfo.state === "error" && <button type="button" style={homepageButton} onClick={() => { void (rootRef.current as (HTMLElement & { retryOrbit?: () => Promise<void> }) | null)?.retryOrbit?.() }}>Retry orbit</button>}
                {(stage === "building" || stage === "connection" || stage === "handoff" || stage === "orbit") && <button type="button" style={homepageButton} onClick={() => actions.current?.overview()}>Overview</button>}
                {stage === "orbit" && <>
                    {detailsMode === "preview" && selectedApartment && <button type="button" disabled={orbitMoving} style={orbitButtonStyle} onClick={() => openApartmentDetails()}>Open apartment details</button>}
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
            {!useStudio && detailsMode !== "off" && <ApartmentDetailsStrip apartment={detailsData} language={detailsLanguage} visible={detailsVisible} preview={false}
                bottom={detailsBottom} inset={detailsInset} onHeightChange={setDetailsHeight} onOpen={jsonDetails && selectedApartment ? () => openApartmentDetails() : undefined} />}
            {!staticRenderer && <AdmiralApartmentDetailCard openId={detailApartmentId} dataUrl={detailDataUrl} assetBase={apartmentAssetBase} inquiryUrl={inquiryUrl} pageUrl={detailPageUrl}
                onOpenChange={reportDetailOpen} onClosed={closeApartmentDetails} />}
            {!staticRenderer && !useStudio && jsonDetails && orbitVisible && apartmentData.status === "error" && <div data-orbit-ignore="" role="status" style={{ position: "absolute", left: "4%", bottom: 24, zIndex: 4 }}>
                <button type="button" style={homepageButton} onClick={apartmentData.retry}>{detailsLanguage === "en" ? "Retry apartment data" : "Lakásadatok újratöltése"}</button>
            </div>}
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
            let previousStage: HomepageStage | undefined, lastTiming: HomepageTiming | null = null
            let fadeFrame = 0, disposed = false
            let departure: { from: number; started: number; timing: HomepageTiming } | null = null
            const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
            function stopFade() {
                if (fadeFrame) cancelAnimationFrame(fadeFrame)
                fadeFrame = 0; departure = null
            }
            function paint(opacity: number, t: HomepageTiming, interactive: boolean) {
                element!.style.opacity = String(opacity); element!.style.translate = `0px ${kind === "opening" ? -(1 - opacity) * t.rise * .6 : (1 - opacity) * t.rise}px`
                element!.style.visibility = opacity < .001 ? "hidden" : original.visibility
                element!.style.pointerEvents = interactive ? original.pointerEvents : "none"; element!.inert = interactive ? original.inert : true
                if (opacity < .01) element!.setAttribute("aria-hidden", "true")
                else if (original.hidden === null) element!.removeAttribute("aria-hidden"); else element!.setAttribute("aria-hidden", original.hidden)
                element!.dataset.heroOverlay = kind
            }
            function fadeDeparture(now: number) {
                fadeFrame = 0
                if (disposed || !departure) return
                const progress = sequenceClamp((now - departure.started) / 500)
                paint(departure.from * (1 - sequenceEase(progress)), departure.timing, false)
                if (progress < 1) fadeFrame = requestAnimationFrame(fadeDeparture)
                else departure = null
            }
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
                if (!channel) {
                    stopFade(); previousStage = undefined
                    if (lastTiming) paint(0, lastTiming, false)
                    return
                }
                const fromStage = previousStage
                previousStage = channel.stage
                const { progress } = channel.snapshot, t = channel.timing
                lastTiming = t
                if (departure && (channel.enabled || reducedMotion.matches)) stopFade()
                if (kind !== "opening" && fromStage === "building" && channel.stage === "connection" && !reducedMotion.matches) {
                    const from = sequenceClamp(parseFloat(getComputedStyle(element!).opacity) || 0)
                    if (from > .001) {
                        stopFade(); departure = { from, started: performance.now(), timing: t }
                        // The text stays visible through the dissolve, but its CTA stops accepting input immediately.
                        paint(from, t, false); fadeFrame = requestAnimationFrame(fadeDeparture)
                        return
                    }
                }
                if (departure) return
                const ramp = (from: number, to: number) => sequenceEase(sequenceClamp((progress * 100 - from) / Math.max(1, to - from)))
                const opacity = !channel.enabled ? 0 : kind === "opening" ? 1 - ramp(0, t.openingOut) : kind === "building" ? ramp(t.buildingIn, t.buildingFull) : ramp(t.ctaIn, 100)
                const interactive = channel.enabled && opacity >= .98 && (kind !== "cta" || channel.snapshot.state === "arrival" || channel.snapshot.state === "reduced")
                paint(opacity, t, interactive)
            }
            homepageSubscribers.add(update); reducedMotion.addEventListener("change", update); update()
            return () => {
                disposed = true; stopFade(); reducedMotion.removeEventListener("change", update)
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
export function BalatonfuredContent(Component: ComponentType<any>): ComponentType { return createHomepageOverlay(Component, "opening") }
export function AranyhidContent(Component: ComponentType<any>): ComponentType { return createHomepageOverlay(Component, "building") }

AdmiralHomepageTrial.displayName = "Admiral Homepage Trial"
addPropertyControls(AdmiralHomepageTrial, {
    useGitHubAssets: { type: ControlType.Boolean, title: "GitHub assets", defaultValue: true },
    heroBaseUrl: { type: ControlType.String, title: "SEQ_01 folder", defaultValue: "", hidden: p => p.useGitHubAssets !== false },
    connectionBaseUrl: { type: ControlType.String, title: "SEQ_02 folder", defaultValue: "", hidden: p => p.useGitHubAssets !== false },
    orbitBaseUrl: { type: ControlType.String, title: "Orbit folder", defaultValue: "", hidden: p => p.useGitHubAssets !== false },
    startView: { type: ControlType.Enum, title: "Start trial", options: ["opening", "orbit"], optionTitles: ["Full journey", "Orbit directly"], defaultValue: "opening" },
    editorView: { type: ControlType.Enum, title: "Editor view", options: ["opening", "building", "connection", "orbit"], optionTitles: ["SEQ_01 opening", "SEQ_01 arrival", "SEQ_02 midway", "Orbit"], defaultValue: "opening" },
    editorOrbitView: { type: ControlType.Enum, title: "Editor orbit view", options: ["entry", "1", "2", "3", "4", "5", "6", "7", "8"], optionTitles: ["Entry camera", "View 1", "View 2", "View 3", "View 4", "View 5", "View 6", "View 7", "View 8"], defaultValue: "entry", hidden: p => p.editorView !== "orbit", description: "Preview one camera and its native story group while editing. The published orbit entry stays unchanged." },
    orbitStartFrame: { type: ControlType.Number, title: "Orbit start frame", defaultValue: 45, min: 0, max: HOMEPAGE_ORBIT_NAMES.length - 1, step: 1, description: "Exact first orbit image, numbered 0–119 to match the filenames. With 8 viewpoints: 0 = camera 1, 15 = camera 2, 30 = camera 3, 45 = camera 4. Custom frames stay still until the next gesture; the checkpoint cameras stay fixed." },
    duration: { type: ControlType.Number, title: "SEQ_01 duration", defaultValue: 2.5, min: .6, max: 10, step: .1, unit: "s" },
    connectionDuration: { type: ControlType.Number, title: "SEQ_02 duration", defaultValue: 2.5, min: .6, max: 10, step: .1, unit: "s", description: "Flight time from the SEQ_01 arrival into the orbit. Uses the same scroll trigger, boost, coast, reversal and 0.8-second endpoint fades as SEQ_01." },
    maxSpeed: { type: ControlType.Number, title: "Flight boost", defaultValue: 1.8, min: 1, max: 3, step: .1, description: "Scroll acceleration for both SEQ_01 and SEQ_02." },
    momentum: { type: ControlType.Number, title: "Flight coast", defaultValue: .22, min: .08, max: .6, step: .02, description: "Momentum response for both SEQ_01 and SEQ_02." },
    triggerDistance: { type: ControlType.Number, title: "Scroll trigger", defaultValue: 28, min: 8, max: 150, step: 1 },
    checkpointCount: { type: ControlType.Number, title: "Viewpoints", defaultValue: 8, min: 2, max: 16, step: 1, description: "Keep 8 for the eight authored OrbitView story groups. Other counts disable these stories to preserve camera-to-content alignment." },
    motionWidth: { type: ControlType.Number, title: "Orbit decode", defaultValue: 960, min: 480, max: 1920, step: 160, unit: "px" },
    orbitMobileWidth: { type: ControlType.Number, title: "Phone decode", defaultValue: 640, min: 480, max: 1280, step: 160, unit: "px" },
    phoneFraming: { type: ControlType.Boolean, title: "Phone framing", defaultValue: true, hidden: p => p.orbitLayout !== "classic", description: "On phones, SEQ_02 opens from fullscreen into a landscape orbit image, with stories and apartment details below." },
    phoneImageWidth: { type: ControlType.Number, title: "Phone image width", defaultValue: 100, min: 80, max: 100, step: 1, unit: "%", hidden: p => p.phoneFraming === false, description: "How much of the original landscape image remains visible. 80% gives a closer view; 100% shows its full width." },
    phoneImageTop: { type: ControlType.Number, title: "Phone image top", defaultValue: 80, min: 0, max: 240, step: 4, unit: "px", hidden: p => p.phoneFraming === false, description: "Space above the parked orbit image, for the mobile header. Clamps on short screens to keep the image and details visible." },
    inspectionWidth: { type: ControlType.Number, title: "Stopped detail", defaultValue: 1920, min: 960, max: 1920, step: 160, unit: "px" },
    desktopBuffer: { type: ControlType.Number, title: "Desktop buffer", defaultValue: 2, min: 1, max: 3, step: 1, description: "Checkpoints decoded ahead and behind on desktop. With 8 viewpoints, 2 keeps up to 61 movement frames. All 120 compressed images stay downloaded." },
    phoneBuffer: { type: ControlType.Number, title: "Phone buffer", defaultValue: 1, min: 1, max: 3, step: 1, description: "Checkpoints decoded ahead and behind on phones. With 8 viewpoints, 1 keeps up to 31 movement frames. Increasing this uses more memory." },
    snapDuration: { type: ControlType.Number, title: "Settle time", defaultValue: 1.5, min: .15, max: 10, step: .05, unit: "s", description: "Time for one checkpoint move: slow start, quicker middle, slow arrival. New input is ignored until arrival." },
    frameBlend: { type: ControlType.Number, title: "Frame blend", defaultValue: 0, min: 0, max: 100, step: 5, unit: "%", description: "Crossfade neighbouring orbit frames. 0% keeps frames crisp; 100% blends throughout each frame interval. Strong blending can produce double edges." },
    orbitStories: { type: ControlType.Boolean, title: "Orbit stories", defaultValue: true, description: "Animate native Framer groups using the OrbitView1–OrbitView8 overrides. Requires Viewpoints = 8." },
    storyIn: { type: ControlType.Number, title: "Story enter", defaultValue: .6, min: 0, max: 2, step: .05, unit: "s", hidden: p => p.orbitStories === false },
    storyOut: { type: ControlType.Number, title: "Story exit", defaultValue: .3, min: 0, max: 1.5, step: .05, unit: "s", hidden: p => p.orbitStories === false },
    storyDelay: { type: ControlType.Number, title: "Story delay", defaultValue: .12, min: 0, max: 1.5, step: .02, unit: "s", hidden: p => p.orbitStories === false, description: "Wait after the camera parks before revealing its story. Loading updates do not restart this delay." },
    storyView1: { type: ControlType.Object, title: "View 1 motion", hidden: p => p.orbitStories === false, controls: {
        enterFrom: { type: ControlType.Enum, title: "Enter from", options: ["left", "right", "top", "bottom", "none"], optionTitles: ["Left", "Right", "Top", "Bottom", "Fade only"], defaultValue: "bottom" },
        exitTo: { type: ControlType.Enum, title: "Exit to", options: ["left", "right", "top", "bottom", "none"], optionTitles: ["Left", "Right", "Top", "Bottom", "Fade only"], defaultValue: "bottom" },
        distance: { type: ControlType.Number, title: "Distance", defaultValue: 24, min: 0, max: 100, step: 2, unit: "px" },
    } },
    storyView2: { type: ControlType.Object, title: "View 2 motion", hidden: p => p.orbitStories === false, controls: {
        enterFrom: { type: ControlType.Enum, title: "Enter from", options: ["left", "right", "top", "bottom", "none"], optionTitles: ["Left", "Right", "Top", "Bottom", "Fade only"], defaultValue: "bottom" },
        exitTo: { type: ControlType.Enum, title: "Exit to", options: ["left", "right", "top", "bottom", "none"], optionTitles: ["Left", "Right", "Top", "Bottom", "Fade only"], defaultValue: "bottom" },
        distance: { type: ControlType.Number, title: "Distance", defaultValue: 24, min: 0, max: 100, step: 2, unit: "px" },
    } },
    storyView3: { type: ControlType.Object, title: "View 3 motion", hidden: p => p.orbitStories === false, controls: {
        enterFrom: { type: ControlType.Enum, title: "Enter from", options: ["left", "right", "top", "bottom", "none"], optionTitles: ["Left", "Right", "Top", "Bottom", "Fade only"], defaultValue: "bottom" },
        exitTo: { type: ControlType.Enum, title: "Exit to", options: ["left", "right", "top", "bottom", "none"], optionTitles: ["Left", "Right", "Top", "Bottom", "Fade only"], defaultValue: "bottom" },
        distance: { type: ControlType.Number, title: "Distance", defaultValue: 24, min: 0, max: 100, step: 2, unit: "px" },
    } },
    storyView4: { type: ControlType.Object, title: "View 4 motion", hidden: p => p.orbitStories === false, controls: {
        enterFrom: { type: ControlType.Enum, title: "Enter from", options: ["left", "right", "top", "bottom", "none"], optionTitles: ["Left", "Right", "Top", "Bottom", "Fade only"], defaultValue: "bottom" },
        exitTo: { type: ControlType.Enum, title: "Exit to", options: ["left", "right", "top", "bottom", "none"], optionTitles: ["Left", "Right", "Top", "Bottom", "Fade only"], defaultValue: "bottom" },
        distance: { type: ControlType.Number, title: "Distance", defaultValue: 24, min: 0, max: 100, step: 2, unit: "px" },
    } },
    storyView5: { type: ControlType.Object, title: "View 5 motion", hidden: p => p.orbitStories === false, controls: {
        enterFrom: { type: ControlType.Enum, title: "Enter from", options: ["left", "right", "top", "bottom", "none"], optionTitles: ["Left", "Right", "Top", "Bottom", "Fade only"], defaultValue: "bottom" },
        exitTo: { type: ControlType.Enum, title: "Exit to", options: ["left", "right", "top", "bottom", "none"], optionTitles: ["Left", "Right", "Top", "Bottom", "Fade only"], defaultValue: "bottom" },
        distance: { type: ControlType.Number, title: "Distance", defaultValue: 24, min: 0, max: 100, step: 2, unit: "px" },
    } },
    storyView6: { type: ControlType.Object, title: "View 6 motion", hidden: p => p.orbitStories === false, controls: {
        enterFrom: { type: ControlType.Enum, title: "Enter from", options: ["left", "right", "top", "bottom", "none"], optionTitles: ["Left", "Right", "Top", "Bottom", "Fade only"], defaultValue: "bottom" },
        exitTo: { type: ControlType.Enum, title: "Exit to", options: ["left", "right", "top", "bottom", "none"], optionTitles: ["Left", "Right", "Top", "Bottom", "Fade only"], defaultValue: "bottom" },
        distance: { type: ControlType.Number, title: "Distance", defaultValue: 24, min: 0, max: 100, step: 2, unit: "px" },
    } },
    storyView7: { type: ControlType.Object, title: "View 7 motion", hidden: p => p.orbitStories === false, controls: {
        enterFrom: { type: ControlType.Enum, title: "Enter from", options: ["left", "right", "top", "bottom", "none"], optionTitles: ["Left", "Right", "Top", "Bottom", "Fade only"], defaultValue: "bottom" },
        exitTo: { type: ControlType.Enum, title: "Exit to", options: ["left", "right", "top", "bottom", "none"], optionTitles: ["Left", "Right", "Top", "Bottom", "Fade only"], defaultValue: "bottom" },
        distance: { type: ControlType.Number, title: "Distance", defaultValue: 24, min: 0, max: 100, step: 2, unit: "px" },
    } },
    storyView8: { type: ControlType.Object, title: "View 8 motion", hidden: p => p.orbitStories === false, controls: {
        enterFrom: { type: ControlType.Enum, title: "Enter from", options: ["left", "right", "top", "bottom", "none"], optionTitles: ["Left", "Right", "Top", "Bottom", "Fade only"], defaultValue: "bottom" },
        exitTo: { type: ControlType.Enum, title: "Exit to", options: ["left", "right", "top", "bottom", "none"], optionTitles: ["Left", "Right", "Top", "Bottom", "Fade only"], defaultValue: "bottom" },
        distance: { type: ControlType.Number, title: "Distance", defaultValue: 24, min: 0, max: 100, step: 2, unit: "px" },
    } },
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
    orbitLayout: { type: ControlType.Enum, title: "Orbit layout", options: ["mobile", "studio", "classic"], optionTitles: ["Fullscreen desktop", "Apartment studio", "Classic"], defaultValue: "mobile", description: "Fullscreen desktop keeps the orbit fullscreen with a white detail strip; phones use the light apartment workspace. Apartment studio enables the experiment on desktop too. Keep the component at 100vh." },
    orbitBackground: { type: ControlType.Color, title: "Orbit background", defaultValue: "#fdfbfb", hidden: p => p.orbitLayout === "classic" },
    apartmentDataUrl: { type: ControlType.String, title: "Apartment JSON", defaultValue: "https://raw.githubusercontent.com/UnbuiltMarket/admiral-park/main/data/apartments.json", hidden: p => p.detailsMode === "off", description: "Apartment facts and media paths. All 69 records are small; only the selected plan is loaded." },
    apartmentAssetBase: { type: ControlType.String, title: "Media base", defaultValue: HOMEPAGE_ASSETS + "/apartment-list/", hidden: p => p.detailsMode === "off" },
    previewApartmentId: { type: ControlType.String, title: "Preview apartment", defaultValue: "A001", hidden: p => p.detailsMode === "hover" || p.detailsMode === "off", description: "A real JSON apartment ID, used until picking masks are connected. Clicking its floorplan opens the shared detail card." },
    detailPageUrl: { type: ControlType.String, title: "Details page", defaultValue: "/lista", hidden: p => p.detailsMode === "off", description: "Your Framer apartment page path. Links add ?apartment=ID to open this apartment." },
    detailDataUrl: { type: ControlType.String, title: "Detail card JSON", defaultValue: "https://raw.githubusercontent.com/UnbuiltMarket/admiral-park/main/data/apartment-details.json", description: "Full apartment data for the shared list-view card, fetched only when an apartment is opened." },
    inquiryUrl: { type: ControlType.String, title: "Inquiry page", defaultValue: "", hidden: p => p.detailsMode === "off", description: "Optional enquiry page URL. If empty, the action opens the apartment details page." },
    detailsMode: { type: ControlType.Enum, title: "Apartment details", options: ["preview", "hover", "off"], optionTitles: ["Preview", "Hover", "Off"], defaultValue: "preview", description: "Preview shows real JSON data with a trial apartment selector. Hover waits for a selected apartment ID from the future masks. Off hides the apartment workspace." },
    detailsLanguage: { type: ControlType.Enum, title: "Details language", options: ["hu", "en"], optionTitles: ["Magyar", "English"], defaultValue: "hu", hidden: p => p.detailsMode === "off" },
    detailsBottom: { type: ControlType.Number, title: "Details bottom", defaultValue: 32, min: 0, max: 160, step: 1, unit: "px", hidden: p => p.detailsMode === "off" || p.orbitLayout === "studio" },
    detailsInset: { type: ControlType.Number, title: "Details margin", defaultValue: 48, min: 0, max: 120, step: 1, unit: "px", hidden: p => p.detailsMode === "off" || p.orbitLayout === "studio" },
    apartmentPreview: { type: ControlType.Object, title: "Sample apartment", hidden: () => true, controls: {
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

// @APARTMENT_DETAILS_INSERT
// @HERO_CORE_INSERT
// @ORBIT_CORE_INSERT
