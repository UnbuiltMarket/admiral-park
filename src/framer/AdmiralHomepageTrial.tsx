// Generated Framer homepage. Requires AdmiralApartmentDetailCard.tsx in the same Framer project.
import * as React from "react"
import type { ComponentType } from "react"
import { addPropertyControls, ControlType, useIsStaticRenderer } from "framer"
import AdmiralApartmentDetailCard from "./AdmiralApartmentDetailCard.tsx"

const HOMEPAGE_HERO_NAMES: string[] = ["raw sequence00.avif","raw sequence01.avif","raw sequence02.avif","raw sequence03.avif","raw sequence04.avif","raw sequence05.avif","raw sequence06.avif","raw sequence07.avif","raw sequence08.avif","raw sequence09.avif","raw sequence10.avif","raw sequence11.avif","raw sequence12.avif","raw sequence13.avif","raw sequence14.avif","raw sequence15.avif","raw sequence16.avif","raw sequence17.avif","raw sequence18.avif","raw sequence19.avif","raw sequence20.avif","raw sequence21.avif","raw sequence22.avif","raw sequence23.avif","raw sequence24.avif","raw sequence25.avif","raw sequence26.avif","raw sequence27.avif","raw sequence28.avif","raw sequence29.avif","raw sequence30.avif","raw sequence31.avif","raw sequence32.avif","raw sequence33.avif","raw sequence34.avif","raw sequence35.avif","raw sequence36.avif","raw sequence37.avif","raw sequence38.avif","raw sequence39.avif","raw sequence40.avif","raw sequence41.avif","raw sequence42.avif","raw sequence43.avif","raw sequence44.avif","raw sequence45.avif","raw sequence46.avif","raw sequence47.avif","raw sequence48.avif","raw sequence49.avif","raw sequence50.avif","raw sequence51.avif","raw sequence52.avif","raw sequence53.avif","raw sequence54.avif","raw sequence55.avif","raw sequence56.avif","raw sequence57.avif","raw sequence58.avif","raw sequence59.avif","raw sequence60.avif","raw sequence61.avif","raw sequence62.avif","raw sequence63.avif","raw sequence64.avif"]
const HOMEPAGE_CONNECTION_NAMES: string[] = ["02 sequence00 copy.avif","02 sequence01 copy.avif","02 sequence02 copy.avif","02 sequence03 copy.avif","02 sequence04 copy.avif","02 sequence05 copy.avif","02 sequence06 copy.avif","02 sequence07 copy.avif","02 sequence08 copy.avif","02 sequence09 copy.avif","02 sequence10 copy.avif","02 sequence11 copy.avif","02 sequence12 copy.avif","02 sequence13 copy.avif","02 sequence14 copy.avif","02 sequence15 copy.avif","02 sequence16 copy.avif","02 sequence17 copy.avif","02 sequence18 copy.avif","02 sequence19 copy.avif","02 sequence20 copy.avif","02 sequence21 copy.avif","02 sequence22 copy.avif","02 sequence23 copy.avif","02 sequence24 copy.avif","02 sequence25 copy.avif","02 sequence26 copy.avif","02 sequence27 copy.avif","02 sequence28 copy.avif","02 sequence29 copy.avif","02 sequence30 copy.avif","02 sequence31 copy.avif","02 sequence32 copy.avif","02 sequence33 copy.avif","02 sequence34 copy.avif","02 sequence35 copy.avif","02 sequence36 copy.avif","02 sequence37 copy.avif","02 sequence38 copy.avif","02 sequence39 copy.avif","02 sequence40 copy.avif","02 sequence41 copy.avif","02 sequence42 copy.avif","02 sequence43 copy.avif","02 sequence44 copy.avif","02 sequence45 copy.avif","02 sequence46 copy.avif","02 sequence47 copy.avif","02 sequence48 copy.avif","02 sequence49 copy.avif","02 sequence50 copy.avif","02 sequence51 copy.avif","02 sequence52 copy.avif","02 sequence53 copy.avif","02 sequence54 copy.avif","02 sequence55 copy.avif","02 sequence56 copy.avif","02 sequence57 copy.avif","02 sequence58 copy.avif","02 sequence59 copy.avif","02 sequence60 copy.avif","02 sequence61 copy.avif","02 sequence62 copy.avif","02 sequence63 copy.avif","02 sequence64 copy.avif","02 sequence65 copy.avif","02 sequence66 copy.avif","02 sequence67 copy.avif","02 sequence68 copy.avif","02 sequence69 copy.avif","02 sequence70 copy.avif","02 sequence71 copy.avif","02 sequence72 copy.avif"]
const HOMEPAGE_ORBIT_NAMES: string[] = ["adjusted sequence0000 copy.avif","adjusted sequence0001 copy.avif","adjusted sequence0002 copy.avif","adjusted sequence0003 copy.avif","adjusted sequence0004 copy.avif","adjusted sequence0005 copy.avif","adjusted sequence0006 copy.avif","adjusted sequence0007 copy.avif","adjusted sequence0008 copy.avif","adjusted sequence0009 copy.avif","adjusted sequence0010 copy.avif","adjusted sequence0011 copy.avif","adjusted sequence0012 copy.avif","adjusted sequence0013 copy.avif","adjusted sequence0014 copy.avif","adjusted sequence0015 copy.avif","adjusted sequence0016 copy.avif","adjusted sequence0017 copy.avif","adjusted sequence0018 copy.avif","adjusted sequence0019 copy.avif","adjusted sequence0020 copy.avif","adjusted sequence0021 copy.avif","adjusted sequence0022 copy.avif","adjusted sequence0023 copy.avif","adjusted sequence0024 copy.avif","adjusted sequence0025 copy.avif","adjusted sequence0026 copy.avif","adjusted sequence0027 copy.avif","adjusted sequence0028 copy.avif","adjusted sequence0029 copy.avif","adjusted sequence0030 copy.avif","adjusted sequence0031 copy.avif","adjusted sequence0032 copy.avif","adjusted sequence0033 copy.avif","adjusted sequence0034 copy.avif","adjusted sequence0035 copy.avif","adjusted sequence0036 copy.avif","adjusted sequence0037 copy.avif","adjusted sequence0038 copy.avif","adjusted sequence0039 copy.avif","adjusted sequence0040 copy.avif","adjusted sequence0041 copy.avif","adjusted sequence0042 copy.avif","adjusted sequence0043 copy.avif","adjusted sequence0044 copy.avif","adjusted sequence0045 copy.avif","adjusted sequence0046 copy.avif","adjusted sequence0047 copy.avif","adjusted sequence0048 copy.avif","adjusted sequence0049 copy.avif","adjusted sequence0050 copy.avif","adjusted sequence0051 copy.avif","adjusted sequence0052 copy.avif","adjusted sequence0053 copy.avif","adjusted sequence0054 copy.avif","adjusted sequence0055 copy.avif","adjusted sequence0056 copy.avif","adjusted sequence0057 copy.avif","adjusted sequence0058 copy.avif","adjusted sequence0059 copy.avif","adjusted sequence0060 copy.avif","adjusted sequence0061 copy.avif","adjusted sequence0062 copy.avif","adjusted sequence0063 copy.avif","adjusted sequence0064 copy.avif","adjusted sequence0065 copy.avif","adjusted sequence0066 copy.avif","adjusted sequence0067 copy.avif","adjusted sequence0068 copy.avif","adjusted sequence0069 copy.avif","adjusted sequence0070 copy.avif","adjusted sequence0071 copy.avif","adjusted sequence0072 copy.avif","adjusted sequence0073 copy.avif","adjusted sequence0074 copy.avif","adjusted sequence0075 copy.avif","adjusted sequence0076 copy.avif","adjusted sequence0077 copy.avif","adjusted sequence0078 copy.avif","adjusted sequence0079 copy.avif","adjusted sequence0080 copy.avif","adjusted sequence0081 copy.avif","adjusted sequence0082 copy.avif","adjusted sequence0083 copy.avif","adjusted sequence0084 copy.avif","adjusted sequence0085 copy.avif","adjusted sequence0086 copy.avif","adjusted sequence0087 copy.avif","adjusted sequence0088 copy.avif","adjusted sequence0089 copy.avif","adjusted sequence0090 copy.avif","adjusted sequence0091 copy.avif","adjusted sequence0092 copy.avif","adjusted sequence0093 copy.avif","adjusted sequence0094 copy.avif","adjusted sequence0095 copy.avif","adjusted sequence0096 copy.avif","adjusted sequence0097 copy.avif","adjusted sequence0098 copy.avif","adjusted sequence0099 copy.avif","adjusted sequence0100 copy.avif","adjusted sequence0101 copy.avif","adjusted sequence0102 copy.avif","adjusted sequence0103 copy.avif","adjusted sequence0104 copy.avif","adjusted sequence0105 copy.avif","adjusted sequence0106 copy.avif","adjusted sequence0107 copy.avif","adjusted sequence0108 copy.avif","adjusted sequence0109 copy.avif","adjusted sequence0110 copy.avif","adjusted sequence0111 copy.avif","adjusted sequence0112 copy.avif","adjusted sequence0113 copy.avif","adjusted sequence0114 copy.avif","adjusted sequence0115 copy.avif","adjusted sequence0116 copy.avif","adjusted sequence0117 copy.avif","adjusted sequence0118 copy.avif","adjusted sequence0119 copy.avif"]
const HOMEPAGE_HERO_VERSION = "1d4b64cbfa4f"
const HOMEPAGE_CONNECTION_VERSION = "426c29f22325"
const HOMEPAGE_ORBIT_VERSION = "15fce8a9d4fe"
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

// Native Framer groups remain responsible for their own content and layout.
type OrbitStoryDirection = "left" | "right" | "top" | "bottom" | "none"
interface OrbitStoryViewMotion { enterFrom?: OrbitStoryDirection; exitTo?: OrbitStoryDirection; distance?: number }
interface OrbitStorySettings { enabled: boolean; enterDuration: number; exitDuration: number; delay: number; views: OrbitStoryViewMotion[] }
const DEFAULT_ORBIT_STORY_VIEWS: OrbitStoryViewMotion[] = Array.from({ length: 8 }, () => ({ enterFrom: "bottom", exitTo: "bottom", distance: 24 }))

function createOrbitStoryOverlay(Component: ComponentType<any>, viewIndex: number): ComponentType<any> {
    const Overlay = React.forwardRef<HTMLElement, any>((props, forwardedRef) => {
        const elementRef = React.useRef<HTMLElement | null>(null)
        const initialStyle = React.useRef(props.style)
        const ref = React.useCallback((node: HTMLElement | null) => {
            elementRef.current = node
            if (typeof forwardedRef === "function") forwardedRef(node)
            else if (forwardedRef) forwardedRef.current = node
        }, [forwardedRef])
        React.useEffect(() => {
            const element = elementRef.current
            if (!element?.style) return
            const original = {
                opacity: initialStyle.current?.opacity === undefined ? "" : String(initialStyle.current.opacity),
                translate: element.style.translate, visibility: element.style.visibility,
                pointerEvents: element.style.pointerEvents, hidden: element.getAttribute("aria-hidden"), inert: element.inert,
                story: element.getAttribute("data-orbit-story"), target: element.getAttribute("data-story-target"), state: element.getAttribute("data-story-state"),
                orbitIgnore: element.getAttribute("data-orbit-ignore"),
            }
            const layoutProperties = ["position", "top", "bottom", "left", "right", "width", "minWidth", "maxWidth", "minHeight", "maxHeight", "boxSizing", "overflowY", "overscrollBehavior", "touchAction"] as const
            const originalLayout = Object.fromEntries(layoutProperties.map(property => [property, element.style[property]])) as Record<typeof layoutProperties[number], string>
            let mobileLayout = false
            const computedTranslate = getComputedStyle(element).translate
            const baseTranslate = original.translate || computedTranslate
            const translateParts: string[] = []
            let token = "", depth = 0
            for (const character of baseTranslate === "none" ? "" : baseTranslate) {
                if (character === "(") depth++
                if (character === ")") depth--
                if (/\s/.test(character) && !depth) { if (token) { translateParts.push(token); token = "" } }
                else token += character
            }
            if (token) translateParts.push(token)
            const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
            let disposed = false, selected: HTMLElement | null = null, lastEligible = false, lastMotionKey = ""
            let timer = 0, frame = 0, state = "hidden", target = false
            let opacity = 0, x = 0, y = 0
            let sourceResize: ResizeObserver | null = null, sourceIntersection: IntersectionObserver | null = null, sourceMutation: MutationObserver | null = null
            const clampSetting = (value: number, fallback: number, max: number) => Number.isFinite(value) ? Math.min(max, Math.max(0, value)) : fallback
            function direction(value: OrbitStoryDirection | undefined): OrbitStoryDirection {
                return value === "left" || value === "right" || value === "top" || value === "bottom" || value === "none" ? value : "bottom"
            }
            function offset(from: OrbitStoryDirection, distance: number): [number, number] {
                return from === "left" ? [-distance, 0] : from === "right" ? [distance, 0] : from === "top" ? [0, -distance] : from === "bottom" ? [0, distance] : [0, 0]
            }
            function cancel() {
                clearTimeout(timer); timer = 0
                if (frame) cancelAnimationFrame(frame)
                frame = 0
            }
            function paint(interactive = false) {
                element!.style.opacity = String(opacity)
                element!.style.translate = Math.abs(x) < .001 && Math.abs(y) < .001 ? original.translate :
                    `calc(${translateParts[0] || "0px"} + ${x}px) calc(${translateParts[1] || "0px"} + ${y}px)${translateParts[2] ? " " + translateParts[2] : ""}`
                element!.style.visibility = opacity <= .001 ? "hidden" : original.visibility
                element!.style.pointerEvents = interactive ? original.pointerEvents : "none"
                element!.inert = interactive ? original.inert : true
                if (!interactive) element!.setAttribute("aria-hidden", "true")
                else if (original.hidden === null) element!.removeAttribute("aria-hidden")
                else element!.setAttribute("aria-hidden", original.hidden)
                element!.dataset.orbitStory = String(viewIndex + 1)
                element!.dataset.storyTarget = String(target)
                element!.dataset.storyState = state
            }
            function hide() {
                cancel(); opacity = 0; x = 0; y = 0; state = "hidden"; target = false; lastEligible = false; lastMotionKey = ""
                paint()
            }
            function rootVisible(root: HTMLElement) {
                if (!root.isConnected || !homepageChannels.has(root)) return false
                const box = root.getBoundingClientRect()
                if (box.width <= 0 || box.height <= 0 || box.right <= 0 || box.bottom <= 0 || box.left >= innerWidth || box.top >= innerHeight) return false
                let ancestor: HTMLElement | null = root
                while (ancestor) {
                    const css = getComputedStyle(ancestor)
                    if (css.display === "none" || css.visibility === "hidden" || css.visibility === "collapse" || Number(css.opacity) === 0) return false
                    ancestor = ancestor.parentElement
                }
                return true
            }
            function restoreLayout() {
                if (!mobileLayout) return
                for (const property of layoutProperties) if (element!.style[property] !== originalLayout[property]) element!.style[property] = originalLayout[property]
                if (original.orbitIgnore === null) element!.removeAttribute("data-orbit-ignore")
                else element!.setAttribute("data-orbit-ignore", original.orbitIgnore)
                mobileLayout = false
            }
            function positionForMobile(root: HTMLElement | null, channel: HomepageChannel | null | undefined) {
                if (!root || !channel?.mobile?.enabled) { restoreLayout(); return }
                mobileLayout = true
                const set = (property: typeof layoutProperties[number], value: string) => {
                    if (element!.style[property] !== value) element!.style[property] = value
                }
                // Read the containing block after switching to absolute positioning: its
                // padding edge is the origin, and its own scrolling moves that origin.
                set("position", "absolute")
                const rootBox = root.getBoundingClientRect()
                const parent = element!.offsetParent as HTMLElement | null
                const initialBlock = !parent || (parent === document.body && getComputedStyle(parent).position === "static")
                const parentBox = parent?.getBoundingClientRect()
                const scaleX = !initialBlock && parentBox && parent!.offsetWidth > 0 ? parentBox.width / parent!.offsetWidth : 1
                const scaleY = !initialBlock && parentBox && parent!.offsetHeight > 0 ? parentBox.height / parent!.offsetHeight : 1
                const safeScaleX = Number.isFinite(scaleX) && scaleX > 0 ? scaleX : 1
                const safeScaleY = Number.isFinite(scaleY) && scaleY > 0 ? scaleY : 1
                const storyLeft = channel.mobile.storyLeft ?? 24
                const storyWidth = channel.mobile.storyWidth ?? rootBox.width - 48
                const left = initialBlock ? rootBox.left + window.scrollX + storyLeft : (rootBox.left + storyLeft - parentBox!.left) / safeScaleX + parent!.scrollLeft - parent!.clientLeft
                const top = initialBlock ? rootBox.top + window.scrollY + channel.mobile.storyTop : (rootBox.top + channel.mobile.storyTop - parentBox!.top) / safeScaleY + parent!.scrollTop - parent!.clientTop
                const pixel = (value: number) => `${Math.round(value * 1000) / 1000}px`
                set("left", pixel(left)); set("top", pixel(top))
                set("bottom", "auto"); set("right", "auto")
                set("boxSizing", "border-box")
                set("width", pixel(Math.max(0, storyWidth) / safeScaleX))
                set("minWidth", "0px"); set("maxWidth", "none"); set("minHeight", "0px")
                set("maxHeight", pixel(Math.max(0, channel.mobile.storyMaxHeight) / safeScaleY))
                set("overflowY", "auto"); set("overscrollBehavior", "contain"); set("touchAction", "pan-y")
                if (!element!.hasAttribute("data-orbit-ignore")) element!.setAttribute("data-orbit-ignore", "")
            }
            function observeSource(root: HTMLElement | null) {
                sourceResize?.disconnect(); sourceIntersection?.disconnect(); sourceMutation?.disconnect()
                sourceResize = null; sourceIntersection = null; sourceMutation = null
                if (!root) return
                sourceResize = new ResizeObserver(update); sourceResize.observe(root)
                sourceIntersection = new IntersectionObserver(update); sourceIntersection.observe(root)
                sourceMutation = new MutationObserver(update)
                let ancestor: HTMLElement | null = root
                while (ancestor) {
                    sourceMutation.observe(ancestor, { attributes: true, attributeFilter: ["style", "class", "hidden"], childList: true })
                    ancestor = ancestor.parentElement
                }
            }
            function resolve(): HTMLElement | null {
                if (!element!.isConnected) return null
                let parent = element!.parentElement
                const ownBox = element!.getBoundingClientRect(), ownX = ownBox.left + ownBox.width / 2, ownY = ownBox.top + ownBox.height / 2
                while (parent) {
                    const candidates = [...homepageChannels.keys()].filter(root => parent!.contains(root) && rootVisible(root))
                    if (candidates.length) {
                        candidates.sort((a, b) => {
                            if (a.contains(element!) !== b.contains(element!)) return a.contains(element!) ? -1 : 1
                            const aa = a.getBoundingClientRect(), bb = b.getBoundingClientRect()
                            return Math.hypot(aa.left + aa.width / 2 - ownX, aa.top + aa.height / 2 - ownY) - Math.hypot(bb.left + bb.width / 2 - ownX, bb.top + bb.height / 2 - ownY)
                        })
                        return candidates[0]
                    }
                    parent = parent.parentElement
                }
                return null
            }
            function animate(toOpacity: number, toX: number, toY: number, duration: number, nextState: "entering" | "leaving") {
                cancel()
                const fromOpacity = opacity, fromX = x, fromY = y, started = performance.now()
                state = nextState; paint()
                const tick = (now: number) => {
                    frame = 0
                    if (disposed) return
                    if (!selected || !rootVisible(selected) || homepageChannels.get(selected)?.stage !== "orbit") { hide(); return }
                    const progress = duration > 0 ? sequenceClamp((now - started) / (duration * 1000)) : 1
                    const eased = nextState === "entering" ? 1 - Math.pow(1 - progress, 3) : sequenceEase(progress)
                    opacity = fromOpacity + (toOpacity - fromOpacity) * eased
                    x = fromX + (toX - fromX) * eased; y = fromY + (toY - fromY) * eased
                    if (progress >= 1) {
                        opacity = toOpacity; x = toX; y = toY; state = toOpacity ? "visible" : "hidden"
                    }
                    paint(target && opacity >= .98 && state !== "leaving")
                    if (progress < 1) frame = requestAnimationFrame(tick)
                }
                if (!duration) tick(started)
                else frame = requestAnimationFrame(tick)
            }
            function update() {
                if (disposed) return
                const root = resolve()
                if (selected !== root) { hide(); selected = root; observeSource(root) }
                const channel = root && homepageChannels.get(root)
                positionForMobile(root, channel)
                if (!channel || channel.stage !== "orbit" || !channel.story.enabled) { hide(); return }
                const settings = channel.story, motion = settings.views[viewIndex] || DEFAULT_ORBIT_STORY_VIEWS[viewIndex]
                const enterFrom = direction(motion.enterFrom), exitTo = direction(motion.exitTo)
                const distance = clampSetting(motion.distance as number, 24, 300)
                const enter = clampSetting(settings.enterDuration, .6, 10), exit = clampSetting(settings.exitDuration, .3, 10), delay = clampSetting(settings.delay, .12, 10)
                const motionKey = `${enterFrom}:${exitTo}:${distance}:${enter}:${exit}:${delay}`
                const eligible = channel.orbit.state === "checkpoint" && channel.orbit.checkpoint === viewIndex
                const wasEligible = lastEligible
                lastEligible = eligible; target = eligible
                if (channel.static || reduced.matches) {
                    cancel(); opacity = eligible ? 1 : 0; x = 0; y = 0; state = eligible ? "visible" : "hidden"; lastMotionKey = motionKey
                    paint(eligible); return
                }
                if (!eligible) {
                    if (wasEligible || (state !== "leaving" && state !== "hidden")) {
                        cancel()
                        if (opacity <= .001) { opacity = 0; state = "hidden"; paint() }
                        else { const [exitX, exitY] = offset(exitTo, distance); animate(0, exitX, exitY, exit, "leaving") }
                    } else paint()
                    return
                }
                if (wasEligible && motionKey === lastMotionKey) return
                lastMotionKey = motionKey; cancel()
                if (opacity <= .001) { opacity = 0; [x, y] = offset(enterFrom, distance) }
                state = "waiting"; paint()
                const start = () => {
                    timer = 0
                    if (disposed || !target || !selected || !rootVisible(selected)) return
                    const live = homepageChannels.get(selected)
                    if (!live || live.stage !== "orbit" || live.orbit.state !== "checkpoint" || live.orbit.checkpoint !== viewIndex || !live.story.enabled) { update(); return }
                    animate(1, 0, 0, enter, "entering")
                }
                if (delay) timer = window.setTimeout(start, delay * 1000)
                else start()
            }
            homepageSubscribers.add(update)
            reduced.addEventListener("change", update)
            window.addEventListener("resize", update, { passive: true })
            window.addEventListener("scroll", update, { passive: true, capture: true })
            paint(); update()
            return () => {
                disposed = true; cancel(); observeSource(null); homepageSubscribers.delete(update)
                reduced.removeEventListener("change", update)
                window.removeEventListener("resize", update); window.removeEventListener("scroll", update, true)
                restoreLayout()
                element.style.opacity = original.opacity; element.style.translate = original.translate; element.style.visibility = original.visibility
                element.style.pointerEvents = original.pointerEvents; element.inert = original.inert
                const restore = (name: string, value: string | null) => value === null ? element.removeAttribute(name) : element.setAttribute(name, value)
                restore("aria-hidden", original.hidden); restore("data-orbit-story", original.story)
                restore("data-story-target", original.target); restore("data-story-state", original.state)
            }
        }, [])
        return <Component {...props} ref={ref} style={{ ...props.style, opacity: elementRef.current?.style.opacity ?? 0 }} />
    })
    Overlay.displayName = `OrbitView${viewIndex + 1}`
    return Overlay
}
export function OrbitView1(Component: ComponentType<any>): ComponentType<any> { return createOrbitStoryOverlay(Component, 0) }
export function OrbitView2(Component: ComponentType<any>): ComponentType<any> { return createOrbitStoryOverlay(Component, 1) }
export function OrbitView3(Component: ComponentType<any>): ComponentType<any> { return createOrbitStoryOverlay(Component, 2) }
export function OrbitView4(Component: ComponentType<any>): ComponentType<any> { return createOrbitStoryOverlay(Component, 3) }
export function OrbitView5(Component: ComponentType<any>): ComponentType<any> { return createOrbitStoryOverlay(Component, 4) }
export function OrbitView6(Component: ComponentType<any>): ComponentType<any> { return createOrbitStoryOverlay(Component, 5) }
export function OrbitView7(Component: ComponentType<any>): ComponentType<any> { return createOrbitStoryOverlay(Component, 6) }
export function OrbitView8(Component: ComponentType<any>): ComponentType<any> { return createOrbitStoryOverlay(Component, 7) }

// Canonical apartment JSON adapter. Inlined into the standalone Framer component.
type OrbitApartmentStatus = "available" | "under_negotiation" | "reserved" | "sold" | "unknown"
interface OrbitApartmentImage {
    thumbnail?: string
    full: string
    label?: string
    isIllustrative?: boolean
    original?: string
}
interface OrbitApartmentRecord {
    id: string
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
        const sourceSheet = object(sourceMedia?.datasheet), sheetUrl = text(sourceSheet?.url, 4096)
        const media = { ...(plan ? { floorplan: plan } : {}), ...(floorLayout ? { floorLayout } : {}),
            ...(sheetUrl ? { datasheet: { url: sheetUrl, ...(text(sourceSheet?.filename) ? { filename: text(sourceSheet?.filename)! } : {}),
                ...(text(sourceSheet?.label) ? { label: text(sourceSheet?.label)! } : {}),
                ...(typeof sourceSheet?.page === "number" && Number.isSafeInteger(sourceSheet.page) && sourceSheet.page > 0 ? { page: sourceSheet.page } : {}) } } : {}) }
        return { id, name: text(apartment.name) || id, building: text(apartment.building, 64) || "", floor,
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

function orbitApartmentPlan(record: OrbitApartmentRecord, dataset: OrbitApartmentDataset, base: string, view: "floorplan" | "floorLayout" = "floorplan"): OrbitApartmentPlan | null {
    const source = view === "floorLayout" ? record.media?.floorLayout : record.media?.floorplan
    const url = orbitApartmentAssetUrl(source?.full || (view === "floorplan" ? record.floorplan : null), base)
    if (!url) return null
    const layout = view === "floorplan" && record.apartmentType ? dataset.roomLayouts[record.apartmentType] : null
    const dimensions = layout?.imageDimensions || (view === "floorLayout" ? { width: 2560, height: 1600 } : { width: 1500, height: 2000 })
    const viewBox = layout?.viewBox || { x: 0, y: 0, width: 1, height: 1 }
    return { url, aspect: dimensions.width * viewBox.width / (dimensions.height * viewBox.height), dimensions, viewBox,
        isIllustrative: view === "floorplan" && source?.isIllustrative !== false,
        label: source?.label || (view === "floorLayout" ? "Szintrajz" : "Alaprajz · illusztráció") }
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

interface OrbitApartmentStudioProps {
    active: boolean
    mode: "preview" | "hover" | "off"
    dataset: OrbitApartmentDataset | null
    dataStatus: "idle" | "loading" | "ready" | "error"
    error: string
    onRetry: () => void
    apartment: OrbitApartmentRecord | null
    onSelect: (id: string) => void
    assetBase: string
    detailsUrl: string
    inquiryUrl: string
    onViewport: (element: HTMLDivElement | null) => void
    language: "hu" | "en"
    onLayout?: () => void
    onOpenDetails?: () => void
    mobile?: boolean
}

const orbitApartmentStudioStyles = `
[data-orbit-studio] {
    --studio-ink: #242824; --studio-muted: #687074; --studio-line: rgba(72,81,85,.2);
    --studio-paper: var(--admiral-orbit-background,#fdfbfb); --studio-base: #e4e9ec;
    position: absolute; inset: auto 0 0; height: 90%; z-index: 1; box-sizing: border-box;
    display: grid; grid-template-rows: auto minmax(0,1fr); gap: clamp(14px,1.8vw,26px);
    padding: clamp(16px,2.2vw,34px) clamp(20px,3vw,52px) 24px;
    color: var(--studio-ink); background: linear-gradient(180deg,var(--studio-paper),var(--studio-base));
    font-family: Montserrat,Arial,Helvetica,sans-serif; -webkit-font-smoothing: antialiased;
    opacity: 0; visibility: hidden; pointer-events: none; transition: opacity .4s ease,visibility 0s linear .4s;
}
[data-orbit-studio][data-active="true"] { opacity: 1; visibility: visible; pointer-events: auto; transition-delay: 0s; }
[data-orbit-studio] *, [data-orbit-studio] *::before, [data-orbit-studio] *::after { box-sizing: border-box; }
[data-orbit-studio] button,[data-orbit-studio] select,[data-orbit-studio] a { font: inherit; color: inherit; -webkit-tap-highlight-color: transparent; touch-action: manipulation; }
[data-orbit-studio] button { cursor: pointer; }
[data-orbit-studio] button:disabled { cursor: default; opacity: .45; }
[data-orbit-studio] :is(button,a,select):focus-visible { outline: 2px solid var(--studio-ink); outline-offset: 4px; }
[data-orbit-studio] [hidden] { display: none !important; }
[data-orbit-studio] .orbit-studio-header { display: flex; justify-content: space-between; align-items: center; gap: 20px; min-width: 0; }
[data-orbit-studio] .orbit-studio-brand { display: block; width: clamp(130px,13vw,184px); height: auto; flex: 0 0 auto; }
[data-orbit-studio] .orbit-studio-header-end { display: flex; align-items: center; justify-content: flex-end; flex-wrap: wrap; gap: 14px 24px; min-width: 0; }
[data-orbit-studio] .orbit-studio-preview { display: flex; align-items: center; gap: 10px; min-width: 0; font-size: 10px; color: var(--studio-muted); }
[data-orbit-studio] .orbit-studio-preview label { white-space: nowrap; }
[data-orbit-studio] select { width: 98px; max-width: 100%; min-height: 38px; padding: 5px 24px 5px 10px; border: 1px solid var(--studio-line); border-radius: 0; background: transparent; font-size: 12px; }
[data-orbit-studio] .orbit-studio-heading { display: flex; align-items: center; gap: 20px; min-width: 0; }
[data-orbit-studio] .orbit-studio-id { margin: 0; font-size: clamp(27px,3vw,44px); font-weight: 600; line-height: 1; letter-spacing: -.065em; }
[data-orbit-studio] .orbit-studio-status { display: inline-flex; align-items: center; gap: 8px; color: var(--studio-muted); font-size: 12px; font-weight: 500; line-height: 1.4; }
[data-orbit-studio] .orbit-studio-status-dot { position: relative; display: block; width: 6px; height: 6px; border-radius: 50%; background: currentColor; flex-shrink: 0; }
[data-orbit-studio] .orbit-studio-status[data-status="available"] { color: #4f7959; }
[data-orbit-studio] .orbit-studio-status[data-status="available"] .orbit-studio-status-dot::after { position: absolute; content: ""; inset: -3px; border: 1px solid currentColor; border-radius: 50%; animation: orbitStudioAvailablePulse 2.4s ease-out infinite; }
[data-orbit-studio] .orbit-studio-status[data-status="under_negotiation"],[data-orbit-studio] .orbit-studio-status[data-status="reserved"] { color: #a77e25; }
[data-orbit-studio] .orbit-studio-status[data-status="sold"] { color: #b4564f; }
@keyframes orbitStudioAvailablePulse { 0%,15% { opacity: .55; transform: scale(.6); } 75%,100% { opacity: 0; transform: scale(1.5); } }
[data-orbit-studio] .orbit-studio-body { display: grid; grid-template-columns: minmax(0,1.5fr) minmax(300px,1fr); gap: clamp(22px,3vw,48px); min-width: 0; min-height: 0; }
[data-orbit-studio] .orbit-studio-scene { display: grid; grid-template-rows: minmax(0,1fr) auto; gap: 18px; min-width: 0; min-height: 0; }
[data-orbit-studio] .orbit-studio-image-slot { display: flex; align-items: center; justify-content: center; min-width: 0; min-height: 0; container-type: size; }
[data-orbit-studio] [data-orbit-viewport] { position: relative; width: 100%; max-width: 100%; max-height: 100%; aspect-ratio: 1920 / 1010; background: transparent; }
@supports (width: 1cqh) { [data-orbit-studio] [data-orbit-viewport] { width: min(100cqw,calc(100cqh * 1920 / 1010)); } }
[data-orbit-studio] .orbit-studio-facts { min-width: 0; border-top: 1px solid var(--studio-line); padding-top: 18px; }
[data-orbit-studio] .orbit-studio-areas { display: grid; grid-template-columns: repeat(3,minmax(0,1fr)); gap: 16px; margin: 0 0 18px; }
[data-orbit-studio] .orbit-studio-areas > div { min-width: 0; }
[data-orbit-studio] .orbit-studio-areas dt { margin: 0 0 8px; color: var(--studio-muted); font-size: 11px; line-height: 1.4; }
[data-orbit-studio] .orbit-studio-areas dd { margin: 0; font-size: clamp(24px,2.4vw,36px); font-weight: 600; line-height: 1; letter-spacing: -.045em; white-space: nowrap; }
[data-orbit-studio] .orbit-studio-areas small { margin-left: 4px; color: var(--studio-muted); font-size: 12px; font-weight: 400; letter-spacing: 0; }
[data-orbit-studio] .orbit-studio-meta { display: flex; align-items: baseline; flex-wrap: wrap; gap: 8px 16px; margin: 0; color: var(--studio-muted); font-size: 11px; line-height: 1.6; }
[data-orbit-studio] .orbit-studio-meta strong { color: var(--studio-ink); font-weight: 600; }
[data-orbit-studio] .orbit-studio-mobile-meta { display: none; }
[data-orbit-studio] .orbit-studio-bottom { display: flex; align-items: flex-end; justify-content: space-between; gap: 16px; margin-top: 20px; }
[data-orbit-studio] .orbit-studio-price { min-width: 0; }
[data-orbit-studio] .orbit-studio-label { margin: 0 0 6px; color: var(--studio-muted); font-size: 10px; line-height: 1.4; }
[data-orbit-studio] .orbit-studio-price-value { margin: 0; font-size: clamp(24px,2.6vw,38px); font-weight: 400; letter-spacing: -.055em; line-height: 1.1; }
[data-orbit-studio] .orbit-studio-price-value small { margin-left: 4px; font-size: 12px; font-weight: 400; letter-spacing: 0; }
[data-orbit-studio] .orbit-studio-primary { display: inline-flex; align-items: center; justify-content: center; gap: 20px; min-height: 46px; padding: 10px 18px; border: 1px solid var(--studio-ink); border-radius: 0; color: var(--studio-ink); background: transparent; font-size: 12px; line-height: 1.3; text-decoration: none; white-space: nowrap; }
[data-orbit-studio] .orbit-studio-primary:hover { background: rgba(36,40,36,.05); }
[data-orbit-studio] .orbit-studio-secondary { display: flex; align-items: center; flex-wrap: wrap; gap: 8px 18px; margin-top: 16px; }
[data-orbit-studio] .orbit-studio-text-button { display: inline-flex; align-items: center; justify-content: center; gap: 6px; min-height: 36px; padding: 6px 0; border: 0; border-bottom: 1px solid var(--studio-line); border-radius: 0; color: var(--studio-muted); background: none; font-size: 10px; line-height: 1.4; text-decoration: none; }
[data-orbit-studio] .orbit-studio-text-button:hover { color: var(--studio-ink); border-bottom-color: var(--studio-ink); }
[data-orbit-studio] .orbit-studio-share-message { color: var(--studio-muted); font-size: 10px; line-height: 1.5; }
[data-orbit-studio] .orbit-studio-details { display: flex; flex-direction: column; min-width: 0; min-height: 0; }
[data-orbit-studio] .orbit-studio-drawing-toolbar { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px 18px; margin-bottom: 14px; min-height: 32px; flex-shrink: 0; }
[data-orbit-studio] .orbit-studio-tabs { display: flex; gap: 18px; align-items: center; }
[data-orbit-studio] .orbit-studio-tab { min-height: 36px; padding: 7px 0; border: 0; border-bottom: 1px solid transparent; border-radius: 0; color: var(--studio-muted); background: none; font-size: 11px; line-height: 1.4; }
[data-orbit-studio] .orbit-studio-tab[aria-selected="true"] { border-bottom-color: var(--studio-ink); color: var(--studio-ink); }
[data-orbit-studio] .orbit-studio-plan-section { display: flex; flex: 1; flex-direction: column; min-width: 0; min-height: 0; }
[data-orbit-studio] .orbit-studio-plan-stage { display: grid; flex: 1; place-items: center; min-width: 0; min-height: 0; container-type: size; }
[data-orbit-studio] .orbit-studio-plan-crop { position: relative; width: 100%; max-width: 100%; max-height: 100%; aspect-ratio: var(--studio-plan-aspect,1); overflow: hidden; }
@supports (width: 1cqh) { [data-orbit-studio] .orbit-studio-plan-crop { width: min(100cqw,calc(100cqh * var(--studio-plan-aspect,1))); } }
[data-orbit-studio] .orbit-studio-plan-image { position: absolute; display: block; max-width: none; border: 0; object-fit: fill; }
[data-orbit-studio] .orbit-studio-plan-note { flex-shrink: 0; margin: 14px 0 0; color: var(--studio-muted); font-size: 9px; font-weight: 400; line-height: 1.6; }
[data-orbit-studio] .orbit-studio-empty { margin: auto; max-width: 320px; padding: 24px 0; color: var(--studio-muted); font-size: 12px; line-height: 1.8; text-align: center; }
[data-orbit-studio] .orbit-studio-empty p { margin: 0 0 12px; }
[data-orbit-studio] .orbit-studio-loading { color: var(--studio-muted); font-size: 11px; line-height: 1.8; }
[data-orbit-studio] .orbit-studio-mobile-actions { display: none; }
[data-orbit-plan-dialog] { width: min(94vw,1450px); max-width: 94vw; height: 92dvh; max-height: 92dvh; margin: auto; padding: 0; border: 1px solid rgba(72,81,85,.2); color: #242824; background: linear-gradient(180deg,#fdfbfb,#e4e9ec); font-family: Montserrat,Arial,Helvetica,sans-serif; overscroll-behavior: contain; }
[data-orbit-plan-dialog]::backdrop { background: rgba(20,29,34,.6); backdrop-filter: blur(4px); }
[data-orbit-plan-dialog] .orbit-studio-dialog-shell { display: grid; grid-template-rows: auto minmax(0,1fr) auto; height: 100%; min-height: 0; padding: 16px 22px; gap: 12px; }
[data-orbit-plan-dialog] .orbit-studio-dialog-header { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; }
[data-orbit-plan-dialog] .orbit-studio-dialog-title { margin: 0; font-size: 16px; line-height: 1.4; font-weight: 500; }
[data-orbit-plan-dialog] .orbit-studio-dialog-tools { display: flex; align-items: center; gap: 8px; }
[data-orbit-plan-dialog] button { display: inline-flex; align-items: center; justify-content: center; min-width: 38px; min-height: 38px; border: 1px solid rgba(72,81,85,.25); border-radius: 0; color: #242824; background: transparent; font: inherit; cursor: pointer; touch-action: manipulation; }
[data-orbit-plan-dialog] button:focus-visible { outline: 2px solid #242824; outline-offset: 3px; }
[data-orbit-plan-dialog] .orbit-studio-dialog-zoom { min-width: 48px; font-size: 11px; text-align: center; }
[data-orbit-plan-dialog] .orbit-studio-zoom-stage { position: relative; display: grid; place-items: center; min-width: 0; min-height: 0; overflow: hidden; container-type: size; touch-action: none; }
[data-orbit-plan-dialog] .orbit-studio-zoom-plan { position: relative; width: 100%; max-width: 100%; max-height: 100%; aspect-ratio: var(--studio-plan-aspect,1); overflow: hidden; transform-origin: center; }
@supports (width: 1cqh) { [data-orbit-plan-dialog] .orbit-studio-zoom-plan { width: min(100cqw,calc(100cqh * var(--studio-plan-aspect,1))); } }
[data-orbit-plan-dialog] img { position: absolute; display: block; max-width: none; object-fit: fill; pointer-events: none; user-select: none; }
[data-orbit-plan-dialog] .orbit-studio-dialog-note { margin: 0; color: #687074; font-size: 10px; line-height: 1.5; }
@media (max-width: 1000px) and (min-width: 768px) {
    [data-orbit-studio] { padding: 18px 24px; gap: 14px; }
    [data-orbit-studio] .orbit-studio-body { grid-template-columns: minmax(0,1.25fr) minmax(270px,1fr); gap: 22px; }
    [data-orbit-studio] .orbit-studio-header-end { gap: 12px; }
    [data-orbit-studio] .orbit-studio-heading { gap: 12px; }
    [data-orbit-studio] .orbit-studio-bottom { align-items: flex-start; flex-direction: column; gap: 12px; }
    [data-orbit-studio] .orbit-studio-areas { gap: 10px; }
}
@media (max-width: 767px) {
    [data-orbit-studio] { padding: 14px 16px max(12px,env(safe-area-inset-bottom,0px)); gap: 12px; }
    [data-orbit-studio] .orbit-studio-header { gap: 12px; align-items: flex-start; }
    [data-orbit-studio] .orbit-studio-brand { width: 104px; }
    [data-orbit-studio] .orbit-studio-header-end { flex: 1; gap: 6px 12px; }
    [data-orbit-studio] .orbit-studio-heading { gap: 8px; justify-content: flex-end; flex-wrap: wrap; }
    [data-orbit-studio] .orbit-studio-id { font-size: 28px; }
    [data-orbit-studio] .orbit-studio-status { font-size: 10px; gap: 5px; }
    [data-orbit-studio] .orbit-studio-preview { gap: 6px; font-size: 9px; }
    [data-orbit-studio] .orbit-studio-preview select { width: 85px; min-height: 30px; font-size: 10px; }
    [data-orbit-studio] .orbit-studio-body { display: flex; flex-direction: column; gap: 12px; overflow: hidden; }
    [data-orbit-studio] .orbit-studio-scene { display: contents; }
    [data-orbit-studio] .orbit-studio-image-slot { flex: 0 0 auto; width: calc(100% + 32px); margin-inline: -16px; aspect-ratio: 1920 / 1010; container-type: normal; }
    [data-orbit-studio] [data-orbit-viewport] { width: 100%; height: 100%; max-height: none; }
    [data-orbit-studio] .orbit-studio-facts { order: 2; flex: 0 0 auto; padding-top: 12px; }
    [data-orbit-studio] .orbit-studio-areas { margin-bottom: 0; gap: 10px; }
    [data-orbit-studio] .orbit-studio-areas dt { margin-bottom: 5px; font-size: 9px; }
    [data-orbit-studio] .orbit-studio-areas dd { font-size: 25px; }
    [data-orbit-studio] .orbit-studio-areas small { font-size: 10px; }
    [data-orbit-studio] .orbit-studio-facts > .orbit-studio-meta, [data-orbit-studio] .orbit-studio-facts > .orbit-studio-bottom, [data-orbit-studio] .orbit-studio-facts > .orbit-studio-secondary { display: none; }
    [data-orbit-studio] .orbit-studio-details { order: 3; display: block; flex: 1 1 auto; overflow-y: auto; overscroll-behavior: contain; touch-action: pan-y; scrollbar-width: thin; scrollbar-color: rgba(72,81,85,.35) transparent; padding-right: 3px; }
    [data-orbit-studio] .orbit-studio-drawing-toolbar { margin-bottom: 8px; gap: 5px 12px; }
    [data-orbit-studio] .orbit-studio-tabs { gap: 16px; }
    [data-orbit-studio] .orbit-studio-tab { font-size: 10px; }
    [data-orbit-studio] .orbit-studio-drawing-toolbar > .orbit-studio-text-button { font-size: 9px; }
    [data-orbit-studio] .orbit-studio-mobile-meta { display: flex; margin-bottom: 10px; font-size: 10px; gap: 5px 12px; }
    [data-orbit-studio] .orbit-studio-plan-section { min-height: 310px; height: 310px; }
    [data-orbit-studio] .orbit-studio-plan-stage { height: 280px; flex: 0 0 280px; }
    [data-orbit-studio] .orbit-studio-plan-note { margin-top: 10px; font-size: 8px; }
    [data-orbit-studio] .orbit-studio-mobile-actions { display: block; border-top: 1px solid var(--studio-line); padding-top: 14px; margin-top: 16px; }
    [data-orbit-studio] .orbit-studio-mobile-actions .orbit-studio-bottom { margin: 0; align-items: center; }
    [data-orbit-studio] .orbit-studio-price-value { font-size: 26px; }
    [data-orbit-studio] .orbit-studio-price-value small { font-size: 10px; }
    [data-orbit-studio] .orbit-studio-primary { min-height: 42px; gap: 12px; padding: 8px 12px; font-size: 10px; }
    [data-orbit-studio] .orbit-studio-secondary { gap: 8px 14px; margin-top: 10px; }
    [data-orbit-plan-dialog] { width: 96vw; max-width: 96vw; height: 94dvh; max-height: 94dvh; }
    [data-orbit-plan-dialog] .orbit-studio-dialog-shell { padding: 12px; }
    [data-orbit-plan-dialog] .orbit-studio-dialog-title { font-size: 13px; }
    [data-orbit-plan-dialog] .orbit-studio-dialog-tools { gap: 4px; }
    [data-orbit-plan-dialog] .orbit-studio-dialog-note { font-size: 9px; }
}
@media (prefers-reduced-motion: reduce) {
    [data-orbit-studio] { transition: none; }
    [data-orbit-studio] .orbit-studio-status-dot::after { animation: none !important; }
}
@media (min-width: 768px) and (max-height: 600px) {
    [data-orbit-studio] { padding: 12px 20px; gap: 10px; }
    [data-orbit-studio] .orbit-studio-brand { width: 110px; }
    [data-orbit-studio] .orbit-studio-id { font-size: 28px; }
    [data-orbit-studio] .orbit-studio-body { grid-template-columns: minmax(0,1.2fr) minmax(280px,1fr); gap: 20px; }
    [data-orbit-studio] .orbit-studio-scene { grid-template-rows: minmax(0,1fr); gap: 0; }
    [data-orbit-studio] .orbit-studio-details { overflow-y: auto; overscroll-behavior: contain; touch-action: pan-y; padding-right: 6px; }
    [data-orbit-studio] .orbit-studio-plan-section { flex: 0 0 auto; min-height: 330px; }
    [data-orbit-studio] .orbit-studio-plan-stage { flex: none; height: 300px; }
    [data-orbit-studio] .orbit-studio-details .orbit-studio-facts { margin-top: 18px; }
}
/* The phone workspace fits its parent in either orientation. The orbit and plan
   share the available height; only the separate detail card can scroll. */
[data-orbit-studio][data-mobile="true"] {
    container-name: orbit-studio-mobile; container-type: size; overflow: hidden;
    padding: 8px 12px max(8px,env(safe-area-inset-bottom,0px)); gap: 6px;
    grid-template-rows: auto minmax(0,1fr); text-align: left;
}
[data-orbit-studio][data-mobile="true"] .orbit-studio-header { position: relative; display: grid; grid-template-rows: 32px 24px; justify-content: stretch; justify-items: center; gap: 6px; min-height: 0; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-brand { width: auto; height: 32px; max-width: 120px; justify-self: center; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-header-end { display: contents; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-heading { width: 100%; justify-content: flex-start; align-items: center; flex-wrap: nowrap; gap: 12px; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-id { font-size: 24px; line-height: 24px; font-weight: 600; letter-spacing: -.045em; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-status { font-size: 10px; line-height: 1.35; font-weight: 500; gap: 6px; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-preview { position: absolute; top: 0; left: 0; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-preview label { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); }
[data-orbit-studio][data-mobile="true"] .orbit-studio-preview select { width: 70px; min-height: 32px; font-size: 10px; padding: 4px 16px 4px 6px; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-body { display: grid; grid-template-columns: minmax(0,1fr); grid-template-rows: calc((100cqw + 24px) * 1010 / 1920) auto minmax(0,1fr); gap: 6px; overflow: hidden; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-scene { display: contents; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-image-slot { position: relative; order: 0; width: calc(100% + 24px); height: 100%; margin-inline: -12px; aspect-ratio: 1920 / 1010; container-type: inline-size; }
[data-orbit-studio][data-mobile="true"] [data-orbit-viewport] { position: absolute; inset: 0; width: 100%; height: 100%; max-height: none; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-facts { order: 1; min-height: 0; margin: 0; padding-top: 6px; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-areas { gap: 10px; margin: 0; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-areas dt { margin-bottom: 3px; font-size: 9px; font-weight: 400; line-height: 1.3; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-areas dd { font-size: clamp(21px,2.9cqh,26px); font-weight: 600; line-height: 1.1; letter-spacing: -.04em; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-areas small { margin-left: 3px; font-size: 10px; font-weight: 400; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-facts > .orbit-studio-meta,
[data-orbit-studio][data-mobile="true"] .orbit-studio-facts > .orbit-studio-bottom,
[data-orbit-studio][data-mobile="true"] .orbit-studio-facts > .orbit-studio-secondary { display: none; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-details { order: 2; display: grid; grid-template-rows: auto minmax(0,1fr) auto; gap: 6px; overflow: hidden; padding: 0; touch-action: auto; overscroll-behavior: auto; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-drawing-toolbar { display: none; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-meta { display: flex; align-items: baseline; justify-content: flex-start; flex-wrap: wrap; gap: 2px 10px; margin: 0; font-size: 10px; line-height: 1.4; text-align: left; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-meta strong { font-weight: 600; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-plan-section { display: flex; height: auto; min-height: 0; flex: 1; overflow: hidden; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-plan-stage { flex: 1; min-height: 0; height: auto; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-plan-note { margin: 4px 0 0; font-size: 8px; line-height: 1.4; text-align: left; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-actions { display: block; margin: 0; padding-top: 6px; border-top: 1px solid var(--studio-line); }
[data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-actions .orbit-studio-bottom { display: flex; flex-direction: row; justify-content: space-between; align-items: center; margin: 0; gap: 10px; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-actions .orbit-studio-secondary { display: none; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-label { margin-bottom: 3px; font-size: 9px; line-height: 1.3; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-price-value { font-size: 23px; line-height: 1.05; font-weight: 500; letter-spacing: -.045em; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-price-value small { font-size: 10px; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-primary { min-height: 44px; padding: 9px 15px; gap: 15px; font-size: 11px; font-weight: 600; }
/* Make room for the complete image on short portrait phones. The illustration
   note remains visible in the full apartment card. */
@container orbit-studio-mobile (max-height: 560px) and (max-aspect-ratio: 1/1) {
    [data-orbit-studio][data-mobile="true"] .orbit-studio-header { grid-template-rows: 28px 24px; gap: 4px; }
    [data-orbit-studio][data-mobile="true"] .orbit-studio-brand { height: 28px; }
    [data-orbit-studio][data-mobile="true"] .orbit-studio-body,
    [data-orbit-studio][data-mobile="true"] .orbit-studio-details { gap: 4px; }
    [data-orbit-studio][data-mobile="true"] .orbit-studio-facts,
    [data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-actions { padding-top: 4px; }
    [data-orbit-studio][data-mobile="true"] .orbit-studio-plan-note { display: none; }
}
@container orbit-studio-mobile (max-height: 480px) and (min-aspect-ratio: 4/3) {
    [data-orbit-studio][data-mobile="true"] .orbit-studio-body { grid-template-columns: minmax(0,1.1fr) minmax(0,1fr); grid-template-rows: minmax(0,1fr) auto; column-gap: 16px; }
    [data-orbit-studio][data-mobile="true"] .orbit-studio-image-slot { grid-column: 1; grid-row: 1; width: 100%; height: 100%; margin: 0; aspect-ratio: auto; container-type: size; }
    [data-orbit-studio][data-mobile="true"] [data-orbit-viewport] { position: relative; inset: auto; width: min(100cqw,calc(100cqh * 1920 / 1010)); height: auto; max-height: 100%; }
    [data-orbit-studio][data-mobile="true"] .orbit-studio-facts { grid-column: 1; grid-row: 2; }
    [data-orbit-studio][data-mobile="true"] .orbit-studio-details { grid-column: 2; grid-row: 1 / 3; }
    [data-orbit-studio][data-mobile="true"] .orbit-studio-areas dd { font-size: 21px; }
    [data-orbit-studio][data-mobile="true"] .orbit-studio-primary { padding-inline: 10px; }
}
`

function OrbitApartmentStudio(props: OrbitApartmentStudioProps): React.JSX.Element {
    const { active, mode, dataset, dataStatus, error, onRetry, apartment, onSelect, assetBase, detailsUrl, inquiryUrl, onViewport, language, onLayout, onOpenDetails, mobile = false } = props
    const hu = language !== "en"
    const [view, setView] = React.useState<"floorplan" | "floorLayout">("floorplan")
    const [expanded, setExpanded] = React.useState(false), [zoom, setZoom] = React.useState(1)
    const [pan, setPan] = React.useState({ x: 0, y: 0 })
    const [shareMessage, setShareMessage] = React.useState("")
    const [shortLandscape, setShortLandscape] = React.useState(false)
    const [failedImage, setFailedImage] = React.useState("")
    const dialog = React.useRef<HTMLDialogElement>(null)
    const drag = React.useRef<{ pointer: number; x: number; y: number; panX: number; panY: number } | null>(null)
    const mounted = React.useRef(true), shareGeneration = React.useRef(0)
    const headingId = React.useId(), planPanelId = React.useId()
    const labels = hu ? { interior: "Beltér", terrace: "Erkély", garden: "Kert", floorplan: "Alaprajz", floorLayout: "Szintrajz", expand: "Alaprajz nagyítása", preview: "Előnézet", select: "Előnézeti lakás", gross: "Bruttó vételár", details: "Lakás részletei", inquire: "Érdeklődöm", download: "Adatlap PDF", share: "Megosztás", close: "Bezárás", roomCount: "szoba", floor: "emelet", building: "épület", type: "típus", orientation: "tájolás" } :
        { interior: "Interior", terrace: "Terrace", garden: "Garden", floorplan: "Floor plan", floorLayout: "Floor layout", expand: "Enlarge floor plan", preview: "Preview", select: "Preview apartment", gross: "Gross purchase price", details: "Apartment details", inquire: "Enquire", download: "PDF factsheet", share: "Share", close: "Close", roomCount: "rooms", floor: "floor", building: "building", type: "type", orientation: "orientation" }
    const number = new Intl.NumberFormat(hu ? "hu-HU" : "en-GB", { maximumFractionDigits: 2 })
    const plan = active && apartment && dataset ? orbitApartmentPlan(apartment, dataset, assetBase, view) : null
    const floorLayout = apartment && dataset ? orbitApartmentPlan(apartment, dataset, assetBase, "floorLayout") : null
    const asset = (path: string) => orbitApartmentAssetUrl(path, assetBase) || ""
    const logo = asset("assets/brand/admiral-park-full-logo-no-location.svg")
    const fontLatin = asset("assets/fonts/montserrat/montserrat-latin-variable.woff2")
    const fontExtended = asset("assets/fonts/montserrat/montserrat-latin-ext-variable.woff2")
    const cssUrl = (url: string) => url.replace(/["\\\n\r]/g, character => encodeURIComponent(character))
    const fontStyles = `@font-face{font-family:Montserrat;src:url("${cssUrl(fontLatin)}") format("woff2");font-style:normal;font-weight:100 900;font-display:swap;unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}@font-face{font-family:Montserrat;src:url("${cssUrl(fontExtended)}") format("woff2");font-style:normal;font-weight:100 900;font-display:swap;unicode-range:U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C4,U+2113,U+2C60-2C7F,U+A720-A7FF}`
    React.useEffect(() => { mounted.current = true; return () => { mounted.current = false; shareGeneration.current++ } }, [])
    React.useEffect(() => { setView("floorplan"); setFailedImage(""); setExpanded(false); setShareMessage(""); shareGeneration.current++ }, [apartment?.id])
    React.useEffect(() => { if (mobile) setView("floorplan") }, [mobile])
    React.useEffect(() => { setZoom(1); setPan({ x: 0, y: 0 }); setFailedImage("") }, [view, expanded])
    React.useEffect(() => { if (!active) setExpanded(false) }, [active])
    React.useEffect(() => {
        const element = dialog.current
        if (!element) return
        if (expanded && active && !element.open) element.showModal()
        if ((!expanded || !active) && element.open) element.close()
    }, [expanded, active])
    React.useEffect(() => {
        const query = window.matchMedia("(min-width: 768px) and (max-height: 600px)")
        const update = () => setShortLandscape(query.matches)
        update(); query.addEventListener("change", update)
        return () => query.removeEventListener("change", update)
    }, [])
    React.useEffect(() => { onLayout?.() }, [active, apartment?.id, dataStatus, view, shortLandscape, mobile, onLayout])
    const positive = (value: unknown): value is number => typeof value === "number" && Number.isFinite(value) && value >= 0
    const linkFor = (source: string) => {
        if (!source || !apartment) return ""
        try {
            const url = new URL(source, typeof window !== "undefined" ? window.location.href : "https://admiralpark.hu/")
            if (url.protocol !== "https:" && url.protocol !== "http:") return ""
            url.searchParams.set("apartment", apartment.id)
            return url.href
        } catch { return "" }
    }
    const detailLink = linkFor(detailsUrl), inquiryLink = linkFor(inquiryUrl)
    const actionLink = inquiryLink || detailLink
    const record = apartment as unknown as { media?: { datasheet?: { url?: string; label?: string; filename?: string } } } | null
    const download = record?.media?.datasheet?.url ? asset(record.media.datasheet.url) : ""
    const availability = apartment?.status || ""
    const statusText = availability === "available" ? hu ? "Szabad" : "Available" : availability === "sold" ? hu ? "Eladva" : "Sold" : availability === "under_negotiation" ? hu ? "Tárgyalás alatt" : "In negotiation" : availability === "reserved" ? hu ? "Foglalt" : "Reserved" : apartment?.statusLabel || ""
    const floor = apartment?.floorLabel || (apartment?.floor === 0 ? hu ? "Földszint" : "Ground floor" : positive(apartment?.floor) ? `${apartment!.floor}. ${labels.floor}` : "")
    const viewportCallback = React.useCallback((element: HTMLDivElement | null) => onViewport(element), [onViewport])
    const share = async () => {
        const generation = ++shareGeneration.current
        const url = detailLink || (typeof window !== "undefined" ? linkFor(window.location.href) : "")
        if (!apartment || !url) return
        setShareMessage("")
        try {
            const title = `Admiral Park · ${apartment.id}`
            if (navigator.share) await navigator.share({ title, url })
            else if (navigator.clipboard?.writeText) { await navigator.clipboard.writeText(url); if (mounted.current && generation === shareGeneration.current) setShareMessage(hu ? "Hivatkozás másolva" : "Link copied") }
            else if (mounted.current && generation === shareGeneration.current) setShareMessage(hu ? "A hivatkozás a lakás részleteinél érhető el." : "Use the apartment details link to share this home.")
        } catch (reason) {
            if ((reason as { name?: string })?.name !== "AbortError" && mounted.current && generation === shareGeneration.current) setShareMessage(hu ? "A megosztás most nem érhető el." : "Sharing is currently unavailable.")
        }
    }
    const meta = (mobile = false) => <p className={`orbit-studio-meta${mobile ? " orbit-studio-mobile-meta" : ""}`}>
        {apartment?.apartmentType && <span><strong>{apartment.apartmentType}</strong> {labels.type}</span>}
        {apartment?.building && <span><strong>{apartment.building}</strong> {labels.building}</span>}
        {floor && <span data-orbit-field="floor"><strong>{floor}</strong></span>}
        {apartment?.orientation && <span data-orbit-field="orientation"><strong>{apartment.orientation}</strong> {labels.orientation}</span>}
        {positive(apartment?.rooms) && <span data-orbit-field="rooms"><strong>{number.format(apartment!.rooms!)}</strong> {labels.roomCount}</span>}
    </p>
    const conversion = () => <>
        <div className="orbit-studio-bottom">
            <div className="orbit-studio-price"><p className="orbit-studio-label">{apartment?.priceIncludesVat === false ? hu ? "Nettó vételár" : "Net purchase price" : labels.gross}</p><p className="orbit-studio-price-value" data-orbit-apartment-price="" data-orbit-field="price">
                {positive(apartment?.price) ? <>{number.format(apartment!.price! / 1000000)}<small>M Ft</small></> : availability === "sold" ? hu ? "Nincs megadva" : "Not provided" : hu ? "Ár kérésre" : "Price on request"}
            </p></div>
            {(mobile || !inquiryLink) && onOpenDetails ? <button type="button" className="orbit-studio-primary" data-orbit-apartment-action="" data-orbit-detail-link="" aria-haspopup="dialog" onClick={onOpenDetails}><span>{mobile ? hu ? "Részletek" : "Details" : labels.details}</span><span aria-hidden="true">↗</span></button> : (mobile ? detailLink : actionLink) && <a className="orbit-studio-primary" href={mobile ? detailLink : actionLink} data-orbit-apartment-action="" {...(!mobile && inquiryLink ? { "data-orbit-inquiry": "" } : { "data-orbit-detail-link": "" })}><span>{mobile ? hu ? "Részletek" : "Details" : inquiryLink ? labels.inquire : labels.details}</span><span aria-hidden="true">↗</span></a>}
        </div>
        <div className="orbit-studio-secondary">
            {download && <a href={download} className="orbit-studio-text-button" target="_blank" rel="noopener noreferrer" download={record?.media?.datasheet?.filename || undefined} data-orbit-apartment-download="" data-orbit-download=""><span aria-hidden="true">↓</span>{labels.download}</a>}
            {inquiryLink && (onOpenDetails ? <button type="button" className="orbit-studio-text-button" data-orbit-detail-link="" aria-haspopup="dialog" onClick={onOpenDetails}>{labels.details}<span aria-hidden="true">↗</span></button> : detailLink && <a href={detailLink} className="orbit-studio-text-button" data-orbit-detail-link="">{labels.details}<span aria-hidden="true">↗</span></a>)}
            {apartment && <button type="button" className="orbit-studio-text-button" onClick={() => { void share() }}>{labels.share}<span aria-hidden="true">↗</span></button>}
            <span className="orbit-studio-share-message" role="status">{shareMessage}</span>
        </div>
    </>
    const viewBox = plan?.viewBox || { x: 0, y: 0, width: 1, height: 1 }
    const planStyle: React.CSSProperties = { left: `${-viewBox.x / viewBox.width * 100}%`, top: `${-viewBox.y / viewBox.height * 100}%`, width: `${100 / viewBox.width}%`, height: `${100 / viewBox.height}%` }
    const aspectStyle = { "--studio-plan-aspect": plan?.aspect || 1 } as React.CSSProperties
    const planShown = !!plan && failedImage !== plan.url
    const note = hu ? "Az alaprajz illusztráció. Bútorozatlan átadás." : "Illustrative floor plan. Homes are delivered unfurnished."
    const tabs = <div className="orbit-studio-tabs" role="tablist" aria-label={hu ? "Rajz kiválasztása" : "Choose drawing"}>
        {(["floorplan", "floorLayout"] as const).filter(kind => kind === "floorplan" || !!floorLayout).map(kind => <button key={kind} type="button" className="orbit-studio-tab" role="tab" aria-selected={view === kind} aria-controls={planPanelId} tabIndex={view === kind ? 0 : -1}
            onClick={() => setView(kind)} onKeyDown={event => { if (event.key === "ArrowRight" || event.key === "ArrowLeft" || event.key === "Home" || event.key === "End") { event.preventDefault(); const next = floorLayout && (event.key === "End" || (event.key !== "Home" && view === "floorplan")) ? "floorLayout" : "floorplan"; setView(next); const list = event.currentTarget.parentElement; requestAnimationFrame(() => list?.querySelector<HTMLButtonElement>(`[data-plan-tab="${next}"]`)?.focus()) } }} data-plan-tab={kind}>{labels[kind]}</button>)}
    </div>
    const facts = <div className="orbit-studio-facts" data-orbit-ignore="">
        <dl className="orbit-studio-areas">
            {([ ["areaInterior", labels.interior, "area"], ["areaTerrace", labels.terrace, "terrace"], ["areaGarden", labels.garden, "garden"] ] as const).map(([key, label, field]) => <div key={key} data-orbit-apartment-metric={key} data-orbit-field={field}><dt>{label}</dt><dd>{positive(apartment?.[key]) && (key === "areaInterior" || apartment![key]! > 0) ? <>{number.format(apartment![key]!)}<small>m²</small></> : "—"}</dd></div>)}
        </dl>
        {meta()}{conversion()}
    </div>
    return <>
        <section data-orbit-studio="" data-active={active ? "true" : "false"} data-mobile={mobile ? "true" : "false"} data-mode={mode} data-status={dataStatus} data-apartment-id={apartment?.id || ""} aria-hidden={!active} {...(!active ? { inert: "" as any } : {})} aria-labelledby={headingId}>
            <style>{fontStyles + orbitApartmentStudioStyles}</style>
            <header className="orbit-studio-header" data-orbit-ignore="">
                {logo && <img className="orbit-studio-brand" src={logo} alt="Admiral Park" width={184} height={78} draggable={false} />}
                <div className="orbit-studio-header-end">
                    <div className="orbit-studio-heading"><h2 id={headingId} className="orbit-studio-id">{apartment?.id || (hu ? "Lakásválasztó" : "Apartments")}</h2>
                        {statusText && <span className="orbit-studio-status" data-status={availability} data-orbit-field="status"><span className="orbit-studio-status-dot" aria-hidden="true" />{statusText}</span>}
                    </div>
                    {mode === "preview" && dataset && <div className="orbit-studio-preview"><label htmlFor={`${headingId}-select`}>{labels.preview}</label><select id={`${headingId}-select`} data-orbit-apartment-select="" aria-label={labels.select} value={apartment?.id || ""} onChange={event => onSelect(event.target.value)}>
                        {!apartment && <option value="">—</option>}{dataset.apartments.map(unit => <option key={unit.id} value={unit.id}>{unit.id}</option>)}
                    </select></div>}
                </div>
            </header>
            <div className="orbit-studio-body">
                <div className="orbit-studio-scene">
                    <div className="orbit-studio-image-slot"><div ref={viewportCallback} data-orbit-viewport="" aria-hidden="true" /></div>
                    {(!shortLandscape || mobile) && facts}
                </div>
                <div className="orbit-studio-details" data-orbit-studio-details="" data-orbit-ignore="">
                    {dataStatus === "error" ? <div className="orbit-studio-empty" role="status"><p>{hu ? "A lakásadatok most nem tölthetők be." : "Apartment information could not be loaded."}</p>{error && <p>{error}</p>}<button type="button" className="orbit-studio-text-button" onClick={onRetry}>{hu ? "Újrapróbálom" : "Try again"}</button></div> : !apartment ? <div className="orbit-studio-empty" role="status"><p>{dataStatus === "loading" || dataStatus === "idle" ? hu ? "Lakásadatok betöltése…" : "Loading apartment information…" : hu ? "A lakás adatai a kijelölt otthonnál jelennek meg." : "Point to an apartment to see its details."}</p></div> : <>
                        <div className="orbit-studio-drawing-toolbar">{tabs}<button type="button" className="orbit-studio-text-button" aria-label={labels.expand} disabled={!planShown} onClick={() => setExpanded(true)}>{hu ? "Nagyítás" : "Enlarge"}<span aria-hidden="true">↗</span></button></div>
                        {meta(true)}
                        <section className="orbit-studio-plan-section" id={planPanelId} role="tabpanel" aria-label={labels[view]}>
                            <div className="orbit-studio-plan-stage" style={aspectStyle}>
                                {planShown ? <div className="orbit-studio-plan-crop" data-orbit-plan-crop=""><img data-orbit-floorplan="" className="orbit-studio-plan-image" src={plan!.url} style={planStyle} alt={`${apartment.id} · ${labels[view]}`} decoding="async" draggable={false} onLoad={() => onLayout?.()} onError={() => setFailedImage(plan!.url)} /></div> : <p className="orbit-studio-empty">{hu ? "A rajz még nem érhető el." : "This drawing is not available yet."}</p>}
                            </div>
                            <p className="orbit-studio-plan-note">{note}</p>
                        </section>
                        {shortLandscape && !mobile && facts}
                        <div className="orbit-studio-mobile-actions">{conversion()}</div>
                    </>}
                </div>
            </div>
        </section>
        <dialog ref={dialog} data-orbit-plan-dialog="" data-orbit-ignore="" aria-label={`${apartment?.id || ""} · ${labels[view]}`} onCancel={event => { event.preventDefault(); setExpanded(false) }} onClose={() => setExpanded(false)} onClick={event => { if (event.target === event.currentTarget) setExpanded(false) }}>
            <div className="orbit-studio-dialog-shell">
                <header className="orbit-studio-dialog-header"><h3 className="orbit-studio-dialog-title">{apartment?.id} · {labels[view]}</h3><div className="orbit-studio-dialog-tools">
                    <button type="button" aria-label={hu ? "Kicsinyítés" : "Zoom out"} disabled={zoom <= 1} onClick={() => { setZoom(value => Math.max(1,value - .5)); setPan({ x: 0, y: 0 }) }}>−</button>
                    <span className="orbit-studio-dialog-zoom">{Math.round(zoom * 100)}%</span>
                    <button type="button" aria-label={hu ? "Nagyítás" : "Zoom in"} disabled={zoom >= 3} onClick={() => setZoom(value => Math.min(3,value + .5))}>+</button>
                    <button type="button" aria-label={labels.close} onClick={() => setExpanded(false)}>×</button>
                </div></header>
                <div className="orbit-studio-zoom-stage" style={{ ...aspectStyle, cursor: zoom > 1 ? "grab" : "default" }}
                    onPointerDown={event => { if (zoom <= 1) return; drag.current = { pointer: event.pointerId, x: event.clientX, y: event.clientY, panX: pan.x, panY: pan.y }; event.currentTarget.setPointerCapture(event.pointerId) }}
                    onPointerMove={event => { const current = drag.current; if (current?.pointer !== event.pointerId) return; const box = event.currentTarget.getBoundingClientRect(), limitX = box.width * (zoom - 1) / 2, limitY = box.height * (zoom - 1) / 2; setPan({ x: Math.max(-limitX,Math.min(limitX,current.panX + event.clientX - current.x)), y: Math.max(-limitY,Math.min(limitY,current.panY + event.clientY - current.y)) }) }}
                    onPointerUp={() => { drag.current = null }} onPointerCancel={() => { drag.current = null }}>
                    {expanded && planShown && <div className="orbit-studio-zoom-plan" style={{ transform: `translate(${pan.x}px,${pan.y}px) scale(${zoom})` }}><img src={plan!.url} style={planStyle} alt={`${apartment?.id} · ${labels[view]}`} draggable={false} /></div>}
                </div>
                <p className="orbit-studio-dialog-note">{note}{zoom > 1 ? hu ? " A nagyított rajz húzással mozgatható." : " Drag the enlarged drawing to move it." : ""}</p>
            </div>
        </dialog>
    </>
}

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
        {logo && <span className="orbit-fullscreen-brand" role="img" aria-label="Admiral Park" style={{ "--orbit-fullscreen-logo": `url("${logo.replace(/["\\]/g, "\\// @ORBIT_FULLSCREEN_INSERT")}")` } as React.CSSProperties} />}
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
    const refreshFullscreenLayout = React.useCallback(() => {
        // Cancel a finger gesture across a mode/size change, retaining the
        // current camera, compressed downloads and bounded decoded cache.
        actions.current?.orbit?.setSuspended(true)
        refreshPresentation.current()
        actions.current?.orbit?.setSuspended(detailOpen.current)
    }, [])
    const fullscreen = useOrbitFullscreen(refreshFullscreenLayout, detailOpen)
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
        if (fullscreen.active && (!hostVisible || stage !== "orbit")) fullscreen.close()
    }, [hostVisible, stage, fullscreen.active, fullscreen.close])

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
        // A phone entering in landscape still uses the phone decode budget.
        // Read logical component sizes so scaled Framer previews stay desktop.
        const phone = root.clientWidth <= 767 || window.matchMedia("(pointer: coarse)").matches && Math.min(root.clientWidth, root.clientHeight) <= 767
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
            renderBounds: () => fullscreen.geometryRef.current,
            inputBounds: () => fullscreen.geometryRef.current?.physical || null,
            inputPoint: (clientX, clientY) => {
                const geometry = fullscreen.geometryRef.current
                if (!geometry) return { x: clientX, y: clientY }
                const { physical, width, height, rotated } = geometry
                const x = clientX - physical.left, y = clientY - physical.top
                return rotated ? { x: y * width / physical.height, y: height - x * height / physical.width } :
                    { x: x * width / physical.width, y: y * height / physical.height }
            },
            viewport: bounds => fullscreen.geometryRef.current ? null : viewportFor(1, bounds),
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
            for (const button of Array.from(root!.querySelectorAll<HTMLButtonElement>("[data-homepage-controls] button, button[data-apartment-open], button[data-orbit-detail-link], button[data-orbit-fullscreen-open], button[data-orbit-fullscreen-close]"))) {
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
            if (typeof id !== "string") return
            if (mobilePresentation) {
                // Touch selects first; the explicit Details action opens the
                // shared card. Desktop facade clicks retain their direct action.
                if (jsonDetails && root!.dataset.homepageStage === "orbit" && root!.dataset.orbitState === "checkpoint" && Number(root!.dataset.orbitCheckpoint) >= 0 &&
                    apartmentData.dataset?.apartments.some(apartment => apartment.id === id)) setSelectedApartmentId(id)
            } else openApartmentDetails(id)
        }
        root.addEventListener("admiral:apartment-click", click)
        return () => root.removeEventListener("admiral:apartment-click", click)
    }, [openApartmentDetails, staticRenderer, mobilePresentation, jsonDetails, apartmentData.dataset])
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
        const leave = () => { if (!mobilePresentation) clearApartmentDetails() }
        root.addEventListener("pointerleave", leave)
        return () => root.removeEventListener("pointerleave", leave)
    }, [detailsMode, staticRenderer, clearApartmentDetails, mobilePresentation])
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
        <div ref={rootRef} data-admiral-homepage="" data-admiral-orbit="" data-homepage-stage={stage} data-orbit-fullscreen={String(fullscreen.active)} role="region" aria-label={alt} tabIndex={0}
            style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden", background, "--admiral-orbit-background": orbitBackground, ...style } as React.CSSProperties}>
            <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: orbitBackground, opacity: "var(--admiral-studio-light, 0)" as unknown as number, pointerEvents: "none" }} />
            {useStudio && <OrbitApartmentStudio active={!fullscreen.active && (orbitVisible || orbitStatic)} mobile={mobilePresentation} mode={detailsMode} dataset={apartmentData.dataset} dataStatus={apartmentData.status} error={apartmentData.error}
                onRetry={apartmentData.retry} apartment={selectedApartment} onSelect={setSelectedApartmentId} assetBase={apartmentAssetBase} detailsUrl={detailPageUrl} inquiryUrl={inquiryUrl}
                onViewport={setStudioViewport} language={detailsLanguage} onLayout={refreshStudioLayout} onOpenDetails={() => openApartmentDetails()} />}
            <div ref={heroRootRef} data-admiral-sequence="" style={{ position: "absolute", inset: 0, zIndex: 2, pointerEvents: stage === "orbit" || stage === "handoff" ? "none" : "auto", clipPath: imageClip }}>
                <img ref={posterRef} src={posterUrl} alt={alt} loading="eager" decoding="async" {...{ fetchpriority: "high" }} crossOrigin="anonymous" draggable={false}
                    style={{ position: "absolute", top: "var(--admiral-image-y, 0px)", left: "var(--admiral-image-x, 0px)", width: "var(--admiral-image-width, 100%)", height: "var(--admiral-image-height, 100%)", objectFit: "cover", objectPosition: `${focalX}% ${focalY}%`, pointerEvents: "none" }} />
                <canvas ref={heroCanvasRef} aria-hidden="true" width={1} height={1} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0, clipPath: "inset(var(--admiral-image-y, 0px) 0px var(--admiral-image-cut, 0px) 0px)" }} />
            </div>
            <div ref={fullscreen.surfaceRef} data-orbit-fullscreen-surface="" data-active={String(fullscreen.active)} role={fullscreen.active ? "dialog" : undefined}
                aria-label={fullscreen.active ? detailsLanguage === "hu" ? "Teljes képernyős épületnézet" : "Fullscreen building view" : undefined} aria-modal={fullscreen.active ? true : undefined} style={fullscreen.surfaceStyle}>
                <div data-orbit-fullscreen-plane="" data-rotated={String(!!fullscreen.geometryRef.current?.rotated)} style={fullscreen.planeStyle}>
                    <canvas ref={orbitCanvasRef} aria-hidden="true" width={1} height={1} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 2, opacity: orbitVisible ? 1 : 0, transition: reduced ? "none" : "opacity .35s", touchAction: fullscreen.active ? "none" : "pan-y pinch-zoom", pointerEvents: orbitVisible ? "auto" : "none", clipPath: fullscreen.active ? "none" : imageClip }} />
                    {fullscreen.active && <OrbitFullscreenDetails apartment={selectedApartment} assetBase={apartmentAssetBase} language={detailsLanguage}
                        onOpenDetails={() => openApartmentDetails()} moving={orbitMoving} onPrevious={() => actions.current?.orbit?.go(-1)} onNext={() => actions.current?.orbit?.go(1)}
                        onClose={fullscreen.close} checkpoint={orbitInfo.checkpoint} count={checkpoints} />}
                </div>
            </div>
            {mobilePresentation && useStudio && orbitVisible && !fullscreen.active && <button type="button" data-orbit-fullscreen-open="" data-orbit-ignore="" onClick={fullscreen.open}
                style={{ position: "absolute", zIndex: 4, left: "calc(var(--admiral-image-x, 0px) + var(--admiral-image-width, 100%) - 10px)", top: "calc(var(--admiral-image-y, 0px) + var(--admiral-image-height, 100%) - 8px)", transform: "translate(-100%,-100%)", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 7, width: "max-content", whiteSpace: "nowrap", minHeight: 44, padding: "7px 10px", border: "1px solid rgba(36,40,36,.25)", borderRadius: 0, color: "#242824", background: "rgba(253,251,251,.94)", font: "500 10px/1.3 Montserrat,Arial,sans-serif", cursor: "pointer", touchAction: "manipulation" }}>
                <span aria-hidden="true" style={{ fontSize: 19, lineHeight: 1 }}>⛶</span>{detailsLanguage === "hu" ? "Teljes képernyő" : "Fullscreen view"}
            </button>}
            {orbitStatic && <span style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />}
            <div aria-hidden="true" style={{ position: "absolute", top: "var(--admiral-image-y, 0px)", left: "var(--admiral-image-x, 0px)", width: "var(--admiral-image-width, 100%)", height: "var(--admiral-image-height, 100%)", background: "#000", opacity: darken, pointerEvents: "none", zIndex: 2 }} />
            {!staticRenderer && showControls && !fullscreen.active && <div data-homepage-controls="" data-orbit-ignore="" style={{ position: "absolute", bottom: studioControls ? "auto" : controlsBottom, top: studioControls ? "var(--admiral-controls-top)" : "auto", left: studioControls ? "var(--admiral-controls-left)" : "50%", transform: "translateX(-50%)", display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap", gap: 7, width: "max-content", maxWidth: studioControls ? "var(--admiral-controls-width)" : "94%", zIndex: 3 }}>
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
            {!useStudio && !fullscreen.active && detailsMode !== "off" && <ApartmentDetailsStrip apartment={detailsData} language={detailsLanguage} visible={detailsVisible} preview={false}
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
[data-apartment-details] *, [data-apartment-details] *::before, [data-apartment-details] *::after {
    box-sizing: border-box;
    pointer-events: none !important;
}
[data-apartment-details] [data-apartment-open] { display: flex; flex-direction: column; align-items: center; gap: 7px; max-width: 100%; min-width: 48px; min-height: 48px; padding: 0; border: 0; color: inherit; font: inherit; background: none; cursor: pointer; pointer-events: auto !important; }
[data-apartment-details] [data-apartment-open]:focus-visible { outline: 2px solid currentColor; outline-offset: 5px; }
[data-apartment-details] [data-apartment-open]:hover .admiral-details-plan-image { opacity: .82; }
[data-apartment-details] .admiral-details-grid {
    display: grid;
    grid-template-columns: repeat(3,minmax(0,1fr)) 148px repeat(3,minmax(0,1fr));
    column-gap: clamp(12px,1.8cqw,32px);
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
    color: rgba(255,255,255,.8);
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
[data-apartment-details] .admiral-details-plan { justify-self: center; text-align: center; }
[data-apartment-details] .admiral-details-plan .admiral-details-label { justify-content: center; margin-bottom: 10px; }
[data-apartment-details] .admiral-details-plan-caption { color: rgba(255,255,255,.85); font-size: 9px; line-height: 1.3; letter-spacing: .06em; }
[data-apartment-details] .admiral-details-plan-image {
    display: block;
    width: 148px;
    height: 100px;
    max-width: 100%;
    object-fit: contain;
    object-position: center;
    transition: opacity 160ms ease;
}
[data-apartment-details] .admiral-details-plan-empty {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 148px;
    height: 100px;
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
    [data-apartment-details] .admiral-details-plan-image, [data-apartment-details] .admiral-details-plan-empty { width: 124px; height: 82px; }
}
@container admiral-apartment (max-width: 360px) {
    [data-apartment-details] .admiral-details-grid { column-gap: 8px; }
    [data-apartment-details] .admiral-details-label { font-size: 8px; letter-spacing: .07em; }
    [data-apartment-details] .admiral-details-value { font-size: 20px; }
    [data-apartment-details] .admiral-details-number .admiral-details-value { font-size: 24px; }
    [data-apartment-details] .admiral-details-plan-image, [data-apartment-details] .admiral-details-plan-empty { width: 100px; height: 70px; }
}
@media (prefers-reduced-motion: reduce) {
    [data-apartment-details] { transform: none; transition: none; }
}
`

function ApartmentDetailsStrip({ apartment, language, visible, preview, bottom, inset, onHeightChange, onOpen }: {
    apartment: ApartmentDetailsData | null
    language: ApartmentDetailsLanguage
    visible: boolean
    preview: boolean
    bottom: number
    inset: number
    onHeightChange?: (height: number) => void
    onOpen?: () => void
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
    return <div ref={root} data-apartment-details="" data-details-preview={sample ? "true" : "false"} data-details-visible={shown ? "true" : "false"}
        role="region" aria-label={`${hu ? "Lakásadatok" : "Apartment details"}${sample ? hu ? " — minta" : " — sample" : ""}`} aria-hidden={!shown}
        style={{ position: "absolute", left: `min(${safeInset}px, 4%)`, right: `min(${safeInset}px, 4%)`, bottom: `calc(${safeBottom}px + env(safe-area-inset-bottom, 0px))`, "--admiral-details-bottom": `calc(${safeBottom}px + env(safe-area-inset-bottom, 0px))`, zIndex: 4, pointerEvents: "none" } as React.CSSProperties}>
        <style>{apartmentDetailsStyles}</style>
        <div className="admiral-details-grid">
            <div className="admiral-details-field admiral-details-number" data-apartment-field="number">
                <div className="admiral-details-label">{labels.number}{sample && <span className="admiral-details-sample">{sampleLabel}</span>}</div>
                <div className="admiral-details-value">{data.number}</div>
            </div>
            {metric("area")}{metric("terrace")}
            <div className="admiral-details-field admiral-details-plan" data-apartment-field="floorplan">
                <div className="admiral-details-label">{labels.floorplan}</div>
                {onOpen ? <button type="button" data-apartment-open="" data-orbit-ignore="" aria-label={hu ? `${data.number} lakás részletei` : `Apartment ${data.number} details`} aria-haspopup="dialog" tabIndex={shown ? 0 : -1} disabled={!shown} onClick={onOpen}>
                    {floorplan ? <img className="admiral-details-plan-image" src={floorplan} alt={hu ? `${data.number} lakás alaprajza` : `Floor plan of apartment ${data.number}`} loading="lazy" decoding="async" draggable={false} onError={() => setFailedFloorplan(floorplan)} /> : <span className="admiral-details-plan-empty">{hu ? "Részletek ↗" : "Details ↗"}</span>}
                    {floorplan && <span className="admiral-details-plan-caption">{hu ? "Részletek ↗" : "Details ↗"}</span>}
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

type SequenceState = "opening" | "loading" | "moving" | "arrival" | "paused" | "error" | "reduced";
interface SequenceSnapshot {
    state: SequenceState; progress: number; frame: number; direction: number;
    held: boolean; decoded: number; downloaded: number;
    time?: number; playing?: boolean;
}
interface SequenceOptions {
    root: HTMLElement; canvas: HTMLCanvasElement; poster: HTMLImageElement; urls: string[];
    /** Physical viewer element when the canvas scene itself is transformed. */
    inputRoot?: HTMLElement;
    duration?: number; maxSpeed?: number; momentum?: number; triggerDistance?: number;
    preload?: boolean; holdScroll?: boolean; cacheFrames?: number; decodeWidth?: number;
    startAtEnd?: boolean;
    /** Restore a frozen journey when Framer replaces its active breakpoint component. */
    restoration?: { time: number; direction?: number; playing?: boolean; frame?: number; progress?: number };
    suspended?: boolean;
    /** Keep the previous sequence's painted endpoint until this sequence paints successfully. */
    preservePresentation?: boolean;
    focalX?: number; focalY?: number; timeoutMs?: number;
    /** Logical CSS dimensions before a surrounding scene transform. */
    renderBounds?: (progress: number) => { width: number; height: number } | null;
    /** Optional fixed pixel allocation while the logical scene changes shape. */
    backingSize?: () => { width: number; height: number } | null;
    /** Optional image rectangle in CSS pixels; the canvas backing size stays tied to the full bounds. */
    viewport?: (progress: number, bounds: { width: number; height: number }) => { x: number; y: number; width: number; height: number } | null;
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
    const inputRoot = options.inputRoot ?? root;
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
    const preservePresentation = options.preservePresentation === true && canvas.style.opacity === "1" && canvas.width > 1 && canvas.height > 1;
    const restoration = options.restoration && Number.isFinite(options.restoration.time) ? options.restoration : null;
    const initialClock = restoration ? sequenceClamp(restoration.time, 0, totalDuration) : options.startAtEnd ? totalDuration : 0;
    const initialVisual = frameAt(initialClock);
    const initialFrame = initialVisual.mix === 1 ? initialVisual.next : initialVisual.index;
    const initialDirection = restoration?.direction && Number.isFinite(restoration.direction) ? Math.sign(restoration.direction) : 1;
    const restoredPlaying = !!restoration?.playing && !(initialDirection > 0 ? initialClock >= totalDuration : initialClock <= 0);
    let disposed = false, state: SequenceState = restoredPlaying ? "moving" : initialClock <= 0 ? "opening" : initialClock >= totalDuration ? "arrival" : "paused", displayed = initialFrame, clock = initialClock;
    let displayedProgress = (initialVisual.index + (initialVisual.next - initialVisual.index) * initialVisual.mix) / Math.max(1, last);
    let rendered = initialVisual;
    let renderedGeometry = "";
    // An opaque canvas may belong to the preceding sequence, so this controller must still paint once.
    let hasPainted = false;
    let direction = initialDirection, velocity = 0, boost = 0, held = false, playing = restoredPlaying;
    let active = false, raf = 0, previousTime = 0, waitingSince = 0, suspended = options.suspended === true;
    let holdY = 0, holdX = 0, holdTimer: ReturnType<typeof setTimeout> | undefined;
    let intent = 0, intentAt = 0, lastIntentAt = -Infinity, drainUntil = 0, drainDirection = 0;
    let scrollGuard = false, warmed = false, bypass = !!restoration && !restoredPlaying && initialClock > 0 && initialClock < totalDuration;
    let touch: { x: number; y: number } | null = null;
    let warmTimer: ReturnType<typeof setTimeout> | undefined;
    const width = sequenceClamp(options.decodeWidth ?? 1920, 640, 1920);
    const frames = createSequenceFrames(urls, width, sequenceClamp(options.cacheFrames ?? 14, 8, 24), wake);
    function snapshot(): SequenceSnapshot {
        return { state, progress: displayedProgress, frame: displayed, direction, held, time: clock, playing, ...frames.counts() };
    }
    function publish() {
        if (disposed) return;
        root.dataset.sequenceState = state;
        root.dataset.sequenceTime = String(clock);
        root.dataset.sequencePlaying = String(playing);
        root.dataset.frame = String(displayed);
        root.dataset.progress = String(displayedProgress);
        root.dataset.crossfade = rendered.index !== rendered.next ? (rendered.index === 0 ? "opening" : "arrival") : "";
        root.dataset.crossfadeMix = String(rendered.mix);
        root.dataset.scrollHeld = String(held);
        root.dataset.sequenceSuspended = String(suspended);
        root.dataset.decoded = String(frames.counts().decoded);
        options.onUpdate?.(snapshot());
    }
    function visible() {
        const rect = inputRoot.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0 && rect.bottom > 0 && rect.top < innerHeight;
    }
    function atHero() {
        const rect = inputRoot.getBoundingClientRect();
        return visible() && rect.top >= -3 && rect.top <= innerHeight * .15 && rect.bottom >= innerHeight * .6;
    }
    function release(reason: string) {
        if (holdTimer) clearTimeout(holdTimer);
        holdTimer = undefined; held = false;
        if (sequenceScrollOwner === root) sequenceScrollOwner = null;
        root.dataset.scrollRelease = reason;
    }
    function hold() {
        if (suspended || held || options.holdScroll === false || motion.matches || !atHero()) return;
        if (sequenceScrollOwner && sequenceScrollOwner !== root) return;
        sequenceScrollOwner = root; held = true; holdX = scrollX; holdY = scrollY;
        holdTimer = setTimeout(() => fail("timeout"), options.timeoutMs ?? Math.max(12000, (totalDuration + 2) * 1000));
    }
    function draw(index: number, force = false, nextIndex = index, mix = 0) {
        const bitmap = frames.get(index), next = frames.get(nextIndex);
        if (!context || !bitmap || !next) return false;
        const progress = (index + (nextIndex - index) * mix) / Math.max(1, last);
        const requestedBounds = options.renderBounds?.(progress);
        const box = requestedBounds && [requestedBounds.width, requestedBounds.height].every(Number.isFinite) &&
            requestedBounds.width > 0 && requestedBounds.height > 0 ? requestedBounds : root.getBoundingClientRect();
        if (box.width <= 0 || box.height <= 0) return false;
        const requestedViewport = options.viewport?.(progress, { width: box.width, height: box.height });
        const viewport = requestedViewport && [requestedViewport.x, requestedViewport.y, requestedViewport.width, requestedViewport.height].every(Number.isFinite) &&
            requestedViewport.width > 0 && requestedViewport.height > 0 ? requestedViewport : null;
        const boxRatio = viewport ? viewport.width / viewport.height : box.width / box.height;
        let sw = bitmap.width, sh = bitmap.height;
        if (sw / sh > boxRatio) sw = sh * boxRatio; else sh = sw / boxRatio;
        // Mobile framing must not change the backing allocation as its image rectangle shrinks.
        const ratio = viewport ? Math.min(devicePixelRatio || 1, 2) : Math.min(devicePixelRatio || 1, 2, sw / box.width, sh / box.height);
        const requestedBacking = options.backingSize?.();
        const backing = requestedBacking && [requestedBacking.width, requestedBacking.height].every(Number.isFinite) &&
            requestedBacking.width > 0 && requestedBacking.height > 0 ? requestedBacking : null;
        const cw = Math.max(1, Math.round(backing?.width ?? box.width * ratio)), ch = Math.max(1, Math.round(backing?.height ?? box.height * ratio));
        const destination = viewport ? { x: viewport.x * cw / box.width, y: viewport.y * ch / box.height,
            width: viewport.width * cw / box.width, height: viewport.height * ch / box.height } : { x: 0, y: 0, width: cw, height: ch };
        const geometry = [viewport ? 1 : 0, box.width, box.height, cw, ch, destination.x, destination.y, destination.width, destination.height].join("|");
        if (hasPainted && index === rendered.index && nextIndex === rendered.next && mix === rendered.mix && geometry === renderedGeometry && !force && canvas.style.opacity === "1") return true;
        if (canvas.width !== cw) canvas.width = cw;
        if (canvas.height !== ch) canvas.height = ch;
        // Fill before drawing: a small alpha channel in exported files cannot accumulate trails.
        context.globalAlpha = 1;
        context.fillStyle = "#101820"; context.fillRect(0, 0, cw, ch);
        if (viewport) {
            context.save(); context.beginPath(); context.rect(destination.x, destination.y, destination.width, destination.height); context.clip();
        }
        function paint(frame: SequenceBitmap) {
            let w = frame.width, h = frame.height;
            if (w / h > boxRatio) w = h * boxRatio; else h = w / boxRatio;
            context!.drawImage(frame.image,
                (frame.width - w) * sequenceClamp((options.focalX ?? 50) / 100),
                (frame.height - h) * sequenceClamp((options.focalY ?? 50) / 100),
                w, h, destination.x, destination.y, destination.width, destination.height);
        }
        // Keep the lower image opaque to prevent a dark dip during the dissolve.
        paint(bitmap);
        if (nextIndex !== index) { context.globalAlpha = mix; paint(next); context.globalAlpha = 1; }
        if (viewport) context.restore();
        rendered = { index, next: nextIndex, mix };
        renderedGeometry = geometry;
        hasPainted = true;
        displayed = mix === 1 ? nextIndex : index;
        displayedProgress = progress;
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
        if (disposed || (suspended && !(active && !hasPainted)) || raf || document.hidden) return;
        if (playing || (motion.matches && displayed !== last) || (active && (!hasPainted || canvas.style.opacity !== "1"))) raf = requestAnimationFrame(tick);
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
        // A replacement breakpoint needs its saved image, even while the rotation
        // overlay is holding input. This paint never advances the restored clock.
        if (suspended) {
            if (active && !hasPainted) {
                if (frames.failed(rendered.index) || frames.failed(rendered.next)) fail("frame-error");
                else redraw();
            }
            return;
        }
        if (restoration && active && !hasPainted) {
            if (frames.failed(rendered.index) || frames.failed(rendered.next)) { fail("frame-error"); return; }
            redraw(); previousTime = 0;
            if (playing) wake();
            return;
        }
        if (motion.matches) {
            if (frames.failed(last)) { state = "reduced"; publish(); return; }
            if (draw(last)) { state = "reduced"; publish(); }
            return;
        }
        if (!playing) { if (active && (!hasPainted || canvas.style.opacity !== "1")) redraw(); return; }
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
        const previousClock = clock;
        clock = proposed;
        if (draw(frame.index, false, frame.next, frame.mix)) {
            waitingSince = 0;
            if (state !== "moving") { state = "moving"; publish(); }
            if ((direction > 0 && clock >= totalDuration && displayed === last) || (direction < 0 && clock <= 0 && displayed === 0)) { finish(); return; }
        } else {
            clock = previousClock;
            if (!hasPainted || canvas.style.opacity !== "1") draw(displayed);
            if (!waitingSince) waitingSince = now;
            if (now - waitingSince > 7000) { fail("frame-timeout"); return; }
            if (state !== "loading") { state = "loading"; publish(); }
        }
        wake();
    }
    function start(nextDirection: number, manual = false) {
        if (disposed || suspended || document.hidden || motion.matches || !context || last < 1) return;
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
        if (disposed || suspended) return;
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
        if (suspended) return;
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
        if (event.ctrlKey || event.metaKey) return;
        if (suspendedInput(event, event.clientX, event.clientY)) return;
        if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
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
        if (delta) { if (suspendedInput(event)) return; scrollIntent(event, delta); }
    }
    function suspendedInput(event: Event, x?: number, y?: number) {
        if (!suspended || disposed || !visible()) return false;
        if (event.target instanceof Element && event.target.closest('nav,header,input,textarea,select,button,a,[contenteditable="true"],[role="slider"],[role="button"],[role="link"],[data-orbit-ignore]')) return false;
        const box = inputRoot.getBoundingClientRect();
        if (x !== undefined && y !== undefined && (x < box.left || x > box.right || y < box.top || y > box.bottom)) return false;
        if (event.cancelable) event.preventDefault();
        return true;
    }
    function setSuspended(value: boolean) {
        if (disposed || suspended === value) return;
        suspended = value;
        // Rotation must not retain a swipe origin, wheel intent, or hold timeout.
        touch = null; intent = 0; intentAt = 0; lastIntentAt = -Infinity; drainUntil = 0; drainDirection = 0;
        previousTime = 0; waitingSince = 0;
        if (suspended) {
            if (raf) cancelAnimationFrame(raf); raf = 0;
            release("orientation");
        } else {
            if (playing && !bypass) hold();
            wake();
        }
        publish();
    }
    function onScroll() {
        if (suspended) return;
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
    resize.observe(inputRoot);
    const intersection = new IntersectionObserver(entries => {
        if (entries[0]?.isIntersecting) { if (poster.complete) warm(); }
        else if (playing && !suspended) pause("offscreen");
    });
    intersection.observe(inputRoot);
    window.addEventListener("wheel", wheel, { passive: false, signal });
    window.addEventListener("keydown", key, { signal });
    window.addEventListener("touchstart", event => {
        if (suspended) { touch = null; return; }
        touch = event.touches.length === 1 ? { x: event.touches[0].clientX, y: event.touches[0].clientY } : null;
    }, { passive: true, signal });
    window.addEventListener("touchmove", event => {
        if (suspended && event.touches.length === 1) { const point = event.touches[0]; suspendedInput(event, point.clientX, point.clientY); touch = null; return; }
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
    // A newly assigned poster can still be undecoded. Leave the shared canvas visible across
    // matching sequence endpoints; draw() replaces it atomically when the next image is ready.
    if (!preservePresentation) { canvas.style.opacity = "0"; poster.style.opacity = "1"; }
    // A restored endpoint is parked, not skipped: reverse input stays enabled and the opening copy never flashes.
    if (restoration) {
        active = true;
        frames.request(initialVisual.index, direction, restoredPlaying);
        if (restoredPlaying) { warm(true); hold(); }
        wake();
    } else if (options.startAtEnd) { active = true; frames.request(last, 1, false, true); wake(); }
    publish();
    if (motion.matches) reducedChanged();
    return {
        start: () => start(1, true), reverse: () => start(-1, true), pause, skip, snapshot, redraw, setSuspended,
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
    position: number; target?: number; userPaused: boolean; suspended: boolean; error?: string;
}

interface OrbitRestoration {
    position: number; target?: number; paused?: boolean; direction?: number;
}

interface OrbitOptions {
    root: HTMLElement; canvas: HTMLCanvasElement; urls: string[];
    decodeWidth?: number; inspectionWidth?: number; checkpointCount?: number; bufferCheckpoints?: number; startFrame?: number;
    snapDuration?: number; frameBlend?: number; focalX?: number; focalY?: number;
    /** Logical CSS dimensions before a surrounding scene transform. */
    renderBounds?: () => { width: number; height: number } | null;
    /** Optional fixed pixel allocation while the logical scene changes shape. */
    backingSize?: () => { width: number; height: number } | null;
    /** Map physical pointer coordinates into the transformed scene's logical space. */
    inputPoint?: (clientX: number, clientY: number) => { x: number; y: number };
    inputBounds?: () => { left: number; top: number; width: number; height: number } | null;
    /** Optional image rectangle in CSS pixels, independent of the full canvas backing size. */
    viewport?: (bounds: { width: number; height: number }) => { x: number; y: number; width: number; height: number } | null;
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
    let suspended = false, suspendedAt = 0;
    let settling: { start: number; target: number; time: number; duration: number } | null = null;
    let pendingMove: { start: number; target: number; indices: number[] } | null = null;
    let desired = new Set<number>(), required = new Set<number>(), priority: number[] = [];
    let preparationRequired: number[] = [], errorWasPaused = false;
    const waiters: Array<{ indices: number[]; token: number; allDownloads: boolean; resolve: () => void; reject: (reason: Error) => void }> = [];
    const frameAt = () => total ? orbitModulo(Math.round(position), total) : 0;
    const canRun = () => active && !suspended && !destroyed && visible && !document.hidden && state !== "error";
    const inputAvailable = () => active && prepared && !suspended && !destroyed && visible && !document.hidden;
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
            requiredTotal: required.size, position, target: pendingMove?.target ?? settling?.target,
            userPaused: state === "paused" && !automaticPause, suspended, ...(error ? { error } : {}) };
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
        root.dataset.orbitSuspended = String(suspended);
        root.dataset.orbitBuffered = String(value.buffered); root.dataset.orbitBufferTotal = String(value.bufferTotal);
        root.dataset.orbitRequiredReady = String(value.requiredReady); root.dataset.orbitRequiredTotal = String(value.requiredTotal);
        root.dataset.orbitDecoding = String(nativeDecodes);
        root.dataset.orbitCacheLimit = String(desired.size); root.dataset.orbitBufferCheckpoints = String(bufferCheckpoints);
        root.dataset.orbitResidentFrames = [...frames.keys()].sort((a, b) => a - b).join(",");
        root.dataset.orbitRequiredFrames = [...required].sort((a, b) => a - b).join(",");
        const signature = [state, value.frame, value.checkpoint, direction, value.ready, value.decoded, value.bufferTotal,
            value.requiredReady, value.requiredTotal, position.toFixed(4), value.target, value.userPaused, suspended, error].join("|");
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

    function drawImage(bitmap: OrbitBitmap, viewport?: { x: number; y: number; width: number; height: number }, logicalRatio?: number) {
        if (!context) return;
        const target = viewport ?? { x: 0, y: 0, width: canvas.width, height: canvas.height };
        if (logicalRatio) {
            let width = bitmap.width, height = bitmap.height;
            if (width / height > logicalRatio) width = height * logicalRatio; else height = width / logicalRatio;
            context.drawImage(bitmap.image, (bitmap.width - width) * focalX, (bitmap.height - height) * focalY,
                width, height, target.x, target.y, target.width, target.height);
            return;
        }
        const scale = Math.max(target.width / bitmap.width, target.height / bitmap.height);
        const width = bitmap.width * scale, height = bitmap.height * scale;
        context.drawImage(bitmap.image, target.x + (target.width - width) * focalX, target.y + (target.height - height) * focalY, width, height);
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
        const requestedBounds = options.renderBounds?.();
        const bounds = requestedBounds && [requestedBounds.width, requestedBounds.height].every(Number.isFinite) &&
            requestedBounds.width > 0 && requestedBounds.height > 0 ? requestedBounds : canvas.getBoundingClientRect();
        if (bounds.width <= 0 || bounds.height <= 0) return;
        const requestedViewport = options.viewport?.({ width: bounds.width, height: bounds.height });
        const viewport = requestedViewport && [requestedViewport.x, requestedViewport.y, requestedViewport.width, requestedViewport.height].every(Number.isFinite) &&
            requestedViewport.width > 0 && requestedViewport.height > 0 ? requestedViewport : null;
        const useful = inspection && inspectionFrame === frame ? inspection : bitmap;
        const usefulDPR = Math.min(useful.width / bounds.width, useful.height / bounds.height);
        const dpr = viewport ? Math.min(window.devicePixelRatio || 1, 2) : Math.min(window.devicePixelRatio || 1, 2, usefulDPR);
        const requestedBacking = options.backingSize?.();
        const backing = requestedBacking && [requestedBacking.width, requestedBacking.height].every(Number.isFinite) &&
            requestedBacking.width > 0 && requestedBacking.height > 0 ? requestedBacking : null;
        const width = Math.max(1, Math.round(backing?.width ?? bounds.width * dpr)), height = Math.max(1, Math.round(backing?.height ?? bounds.height * dpr));
        if (canvas.width !== width || canvas.height !== height) { canvas.width = width; canvas.height = height; lastPaint = ""; }
        const destination = viewport ? { x: viewport.x * width / bounds.width, y: viewport.y * height / bounds.height,
            width: viewport.width * width / bounds.width, height: viewport.height * height / bounds.height } : undefined;
        const mix = inspection && inspectionFrame === frame ? (reduced() ? 1 : orbitClamp((now - qualityStartedAt) / 120, 0, 1)) : 0;
        const logicalRatio = backing ? viewport ? viewport.width / viewport.height : bounds.width / bounds.height : undefined;
        const signature = [from, to, frameMix.toFixed(4), width, height, inspectionFrame, mix.toFixed(4), logicalRatio ?? "",
            viewport ? 1 : 0, destination?.x ?? 0, destination?.y ?? 0, destination?.width ?? width, destination?.height ?? height].join("|");
        if (signature === lastPaint) return;
        context.globalAlpha = 1;
        if (destination) {
            context.fillStyle = "#101820"; context.fillRect(0, 0, width, height);
            context.save(); context.beginPath(); context.rect(destination.x, destination.y, destination.width, destination.height); context.clip();
        }
        drawImage(bitmap, destination, logicalRatio);
        if (next) { context.globalAlpha = frameMix; drawImage(next, destination, logicalRatio); context.globalAlpha = 1; }
        if (inspection && mix > 0 && inspectionFrame === frame) {
            context.globalAlpha = mix; drawImage(inspection, destination, logicalRatio); context.globalAlpha = 1;
        }
        if (destination) context.restore();
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
        const box = options.inputBounds?.() || root.getBoundingClientRect();
        return box.width > 0 && box.height > 0 && x >= box.left && x <= box.left + box.width && y >= box.top && y <= box.top + box.height;
    }

    function inputPoint(clientX: number, clientY: number) {
        const point = options.inputPoint?.(clientX, clientY);
        return point && Number.isFinite(point.x) && Number.isFinite(point.y) ? point : { x: clientX, y: clientY };
    }

    function coveredTrialControl(x: number, y: number) {
        return Array.from(root.querySelectorAll<HTMLButtonElement>("[data-homepage-controls] button, button[data-apartment-open], button[data-orbit-detail-link], button[data-orbit-fullscreen-open], button[data-orbit-fullscreen-close]")).some(button => {
            if (button.disabled || button.getAttribute("aria-disabled") === "true" || button.closest("[inert], [hidden], [aria-hidden='true']")) return false;
            const css = getComputedStyle(button);
            if (css.display === "none" || css.visibility === "hidden" || css.visibility === "collapse" || Number(css.opacity) === 0) return false;
            const box = button.getBoundingClientRect();
            return box.width > 0 && box.height > 0 && x >= box.left && x <= box.right && y >= box.top && y <= box.bottom;
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

    function suspendedInput(event: Event, x?: number, y?: number) {
        if (!suspended || !active || destroyed || !visible || ignored(event.target)) return false;
        if (x !== undefined && y !== undefined && !insideViewer(x, y)) return false;
        if (event.cancelable) event.preventDefault();
        return true;
    }

    function setSuspended(value: boolean) {
        if (destroyed || suspended === value) return;
        const now = performance.now();
        suspended = value;
        releaseDrag();
        // Forget the old gesture and consume its immediate inertial tail after rotation.
        lastWheelAt = lastInputAt = now; wheelLatched = true; suppressClickUntil = now + 400;
        if (suspended) {
            suspendedAt = now;
            if (raf) cancelAnimationFrame(raf); raf = 0;
        } else {
            // The committed arc resumes from the same point. A manual pause owns its
            // own timestamp and remains paused until the visitor explicitly resumes.
            if (settling && state !== "paused") settling.time += now - suspendedAt;
            suspendedAt = 0;
            if (!visible || document.hidden || (state === "paused" && automaticPause)) visibilityChanged();
            if (pendingMove) tryStartPending();
            requestPaint();
        }
        notify();
    }

    function onWheel(event: WheelEvent) {
        if (!event.ctrlKey && !event.metaKey && suspendedInput(event, event.clientX, event.clientY)) return;
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
        if (suspendedInput(event, event.clientX, event.clientY)) return;
        if (!event.isPrimary) { if (drag) releaseDrag(); return; }
        if (!inputAvailable() || event.defaultPrevented || event.button !== 0 || !insideViewer(event.clientX, event.clientY) || coveredTrialControl(event.clientX, event.clientY) || ignored(event.target)) return;
        if (nestedScroll(event.target, 1, 0) || nestedScroll(event.target, 0, 1)) return;
        const point = inputPoint(event.clientX, event.clientY);
        drag = { id: event.pointerId, x: point.x, y: point.y, moved: false, triggered: state !== "checkpoint" || !!settling || !!pendingMove };
        try { root.setPointerCapture(event.pointerId); } catch { /* Mouse events can still finish through the window listener. */ }
    }

    function onPointerMove(event: PointerEvent) {
        if (!drag || touchDragging || drag.id !== event.pointerId || !inputAvailable()) return;
        const dx = inputPoint(event.clientX, event.clientY).x - drag.x;
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
        if (suspendedInput(event, event.clientX, event.clientY)) { event.stopPropagation(); return; }
        if (coveredTrialControl(event.clientX, event.clientY)) return;
        // A drag must not accidentally activate a picking listener attached by the wrapper.
        const now = performance.now();
        if ((now < suppressClickUntil || (now - lastInputAt < 120 && state !== "checkpoint")) && insideViewer(event.clientX, event.clientY) && !ignored(event.target)) {
            event.preventDefault(); event.stopPropagation();
        }
    }

    function onTouchStart(event: TouchEvent) {
        if (suspended) { releaseDrag(); return; }
        if (event.touches.length !== 1) {
            if (touchDragging) releaseDrag();
            return;
        }
        const touch = event.touches[0];
        if (!inputAvailable() || event.defaultPrevented || !insideViewer(touch.clientX, touch.clientY) || coveredTrialControl(touch.clientX, touch.clientY) || ignored(event.target)) return;
        if (nestedScroll(event.target, 1, 0) || nestedScroll(event.target, 0, 1)) return;
        const point = inputPoint(touch.clientX, touch.clientY);
        drag = { id: touch.identifier, x: point.x, y: point.y, moved: false, triggered: state !== "checkpoint" || !!settling || !!pendingMove };
        touchDragging = true;
    }

    function onTouchMove(event: TouchEvent) {
        if (suspended && event.touches.length === 1) { const point = event.touches[0]; suspendedInput(event, point.clientX, point.clientY); return; }
        if (!touchDragging || !drag || !inputAvailable() || event.touches.length !== 1) return;
        const touch = event.touches[0];
        const point = inputPoint(touch.clientX, touch.clientY);
        const dx = point.x - drag.x, dy = point.y - drag.y;
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
        if (state !== "paused") pausedAt = suspended ? suspendedAt : performance.now();
        if (raf) cancelAnimationFrame(raf); raf = 0;
        state = "paused"; notify();
    }

    function resume() {
        if (!active || suspended || destroyed || !fullyReady() || !visible || document.hidden || state === "error") return;
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
        if (!active || suspended) return;
        if ((!visible || document.hidden) && state !== "paused") pauseInternal(true);
        else if (visible && !document.hidden && automaticPause) resume();
    }

    function onKeyDown(event: KeyboardEvent) {
        if (!event.ctrlKey && !event.metaKey && !event.altKey && ["ArrowRight", "ArrowDown", "PageDown", "ArrowLeft", "ArrowUp", "PageUp", " ", "Spacebar", "Home", "End"].includes(event.key) && suspendedInput(event)) return;
        if (!inputAvailable() || event.defaultPrevented || event.ctrlKey || event.metaKey || event.altKey || ignored(event.target)) return;
        const heading = ["ArrowRight", "ArrowDown", "PageDown"].includes(event.key) ? 1 :
            ["ArrowLeft", "ArrowUp", "PageUp"].includes(event.key) ? -1 :
            event.key === " " || event.key === "Spacebar" ? (event.shiftKey ? -1 : 1) : 0;
        if (heading) { event.preventDefault(); if (!event.repeat) go(heading); }
    }

    function onEscape(event: KeyboardEvent) {
        if (event.key === "Escape" && !event.defaultPrevented && !ignored(event.target) && active && visible && !document.hidden) pauseInternal(false);
    }

    async function activate(frame = startFrame, restoration?: OrbitRestoration) {
        const token = ++activation;
        await prepare();
        if (destroyed || token !== activation) return;
        active = false; automaticPause = false;
        position = Number.isFinite(restoration?.position) ? restoration!.position : orbitModulo(Math.round(Number.isFinite(frame) ? frame : startFrame), total);
        entryFrame = orbitModulo(Math.round(position), total);
        direction = restoration?.direction && Number.isFinite(restoration.direction) ? Math.sign(restoration.direction) : 1;
        settling = null; pendingMove = null; pausedAt = 0; dropInspection();
        state = "loading";
        const target = Number.isFinite(restoration?.target) && Math.abs(restoration!.target! - position) > .0001 ? restoration!.target! : undefined;
        const initial = target === undefined ? nearestFirst(windowIndices(position, 1), position) : indicesBetween(position, target);
        if (target === undefined) setRestBuffer(position, true);
        else {
            direction = Math.sign(target - position);
            pendingMove = { start: position, target, indices: initial };
            const wanted = [...new Set([...windowIndices(target, bufferCheckpoints), ...initial])];
            setBuffer(wanted, initial, [...initial, ...nearestFirst(wanted, target)]);
        }
        try { await waitForFrames(initial, token); }
        catch (reason) {
            if (!destroyed && token === activation) { fail(failedIndex(initial) ?? frameAt()); notify(); }
            throw reason;
        }
        if (destroyed || token !== activation) return;
        active = true; canvas.style.touchAction = "pinch-zoom";
        // Do not interpret the approach's remaining wheel momentum as an orbit move.
        lastWheelAt = performance.now(); wheelLatched = true;
        state = restoration?.paused ? "paused" : target === undefined ? "checkpoint" : "buffering";
        if (state === "paused") pausedAt = suspended ? suspendedAt : performance.now();
        // A custom entry frame is parked exactly; the eight selectable cameras stay fixed.
        if (target === undefined) setRestBuffer(position);
        paint(performance.now()); notify(); void prepareInspection();
        if (!suspended && (!visible || document.hidden)) pauseInternal(true);
        else if (target !== undefined) resourcesChanged();
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
        if (active && (state === "paused" || suspended)) paint(performance.now()); else requestPaint();
    }) : null;
    resizeObserver?.observe(canvas);
    const intersectionObserver = typeof IntersectionObserver === "function" ? new IntersectionObserver(entries => {
        const entry = entries.find(value => value.target === root);
        if (entry) { visible = entry.isIntersecting && entry.intersectionRatio > 0; visibilityChanged(); }
    }) : null;
    intersectionObserver?.observe(root);
    const resize = () => { lastPaint = ""; if (active && (state === "paused" || suspended)) paint(performance.now()); else requestPaint(); };
    const reducedChanged = () => {
        if (!suspended && reduced() && active && fullyReady() && (state === "moving" || state === "settling")) arrive(settling?.target ?? nextCheckpoint(position, direction));
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
        prepare, activate, deactivate, go, setCheckpoint, pause: () => pauseInternal(false), resume, retry, snapshot, setSuspended, redraw: () => paint(performance.now()),
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
