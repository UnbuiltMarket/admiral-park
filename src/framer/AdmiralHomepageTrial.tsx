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
`

function OrbitApartmentStudio(props: OrbitApartmentStudioProps): React.JSX.Element {
    const { active, mode, dataset, dataStatus, error, onRetry, apartment, onSelect, assetBase, detailsUrl, inquiryUrl, onViewport, language, onLayout, onOpenDetails } = props
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
    React.useEffect(() => { onLayout?.() }, [active, apartment?.id, dataStatus, view, shortLandscape, onLayout])
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
            {!inquiryLink && onOpenDetails ? <button type="button" className="orbit-studio-primary" data-orbit-apartment-action="" data-orbit-detail-link="" aria-haspopup="dialog" onClick={onOpenDetails}><span>{labels.details}</span><span aria-hidden="true">↗</span></button> : actionLink && <a className="orbit-studio-primary" href={actionLink} data-orbit-apartment-action="" {...(inquiryLink ? { "data-orbit-inquiry": "" } : { "data-orbit-detail-link": "" })}><span>{inquiryLink ? labels.inquire : labels.details}</span><span aria-hidden="true">↗</span></a>}
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
        <section data-orbit-studio="" data-active={active ? "true" : "false"} data-mode={mode} data-status={dataStatus} data-apartment-id={apartment?.id || ""} aria-hidden={!active} {...(!active ? { inert: "" as any } : {})} aria-labelledby={headingId}>
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
                    {!shortLandscape && facts}
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
                        {shortLandscape && facts}
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

// Same native apartment dialog as AdmiralApartmentList, built from the shared snapshot.
const ORBIT_APARTMENT_CARD_STYLES = ":root, :host {\n  --paper: #fbfaf8;\n  --surface: #f1f0eb;\n  --filter-background: #f1f0eb;\n  --ink: #242824;\n  --muted: #70736d;\n  --accent: #a38c69;\n  --line: #deded6;\n  --button: #242824;\n  --button-text: #ffffff;\n  --available: #4f7959;\n  --negotiating: #b28a2f;\n  --sold: #b4564f;\n  --hover: color-mix(in srgb, var(--ink) 3%, var(--paper));\n  --detail-top: #fdfbfb;\n  --detail-bottom: #e4e9ec;\n  --detail-ink: #242824;\n  --detail-muted: #687074;\n  --detail-watermark-top: #f2f0f1;\n  --detail-watermark-bottom: #d9dfe2;\n  font-family: 'Montserrat', Arial, sans-serif;\n  font-size: 14px;\n  font-synthesis: none;\n  color: var(--ink);\n  background: var(--paper);\n  color-scheme: light;\n  -webkit-font-smoothing: antialiased;\n}\n:host { display: block; width: 100%; }\n* { box-sizing: border-box; }\nbody { margin: 0; background: var(--paper); }\nbody.dialog-open { overflow: hidden; }\nbutton, input, select { font: inherit; color: inherit; }\nbutton, select, input[type=\"checkbox\"], summary { cursor: pointer; }\nbutton, a, input, select, summary { -webkit-tap-highlight-color: color-mix(in srgb, var(--ink) 0%, transparent); }\nbutton, a { touch-action: manipulation; }\nbutton { border: 0; background: none; }\nbutton:disabled { cursor: default; opacity: .4; }\na { color: inherit; text-decoration: none; }\ninput, select { min-width: 0; border-radius: 0; }\ninput[type=\"number\"] { appearance: textfield; -moz-appearance: textfield; }\ninput::-webkit-inner-spin-button, input::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }\nbutton:focus-visible, a:focus-visible, input:focus-visible, select:focus-visible, summary:focus-visible { outline: 1px solid var(--accent); outline-offset: 5px; }\ninput:focus-visible, select:focus-visible { outline-offset: 2px; }\n[hidden] { display: none !important; }\n.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0; }\n.list-container { width: 100%; container: apartment-list / inline-size; }\n.page-width { width: 100%; max-width: 1480px; margin-inline: auto; padding: var(--component-padding, 32px); }\n.mobile-filter-button { display: none; }\n\n/* A distinct, quiet header groups the filters above the results. */\n.filter-header { padding: 20px 24px 17px; border: 1px solid var(--line); border-radius: 14px; background: var(--filter-background); }\n.filters { margin: 0; }\n.primary-filters { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 30px; }\n.field { min-width: 0; }\n.field > label, .range-field legend { display: block; color: var(--muted); font-size: 10px; font-weight: 400; letter-spacing: 1.15px; line-height: 1.4; text-transform: uppercase; }\n.field > label { margin-bottom: 7px; }\n.field select { display: block; width: 100%; height: 33px; padding: 0 0 8px; border: 0; border-bottom: 1px solid var(--line); background: none; font-size: 14px; line-height: 1.5; transition: border-color .15s; }\n.field select:hover, .field select:focus { border-color: var(--accent); }\n.select-wrap { position: relative; min-width: 0; }\n.select-wrap::after { content: ''; position: absolute; right: 3px; top: 8px; width: 5px; height: 5px; border-right: 1px solid currentColor; border-bottom: 1px solid currentColor; transform: rotate(45deg); pointer-events: none; color: var(--muted); }\n.select-wrap select { appearance: none; padding-right: 23px; }\nselect option { background: var(--surface); color: var(--ink); }\n.range-filters { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) auto; align-items: end; gap: 30px; margin-top: 17px; }\n.range-field { min-width: 0; margin: 0; padding: 0; border: 0; }\n.range-field legend { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; width: 100%; padding: 0; margin: 0; }\n.range-field output { color: var(--ink); font-size: 12px; line-height: 1.5; letter-spacing: 0; text-transform: none; white-space: nowrap; }\n.range-slider { position: relative; width: 100%; height: 44px; margin-bottom: -5px; touch-action: pan-y; }\n.slider-track { position: absolute; left: 22px; right: 22px; top: 21px; height: 1px; background: var(--line); pointer-events: none; }\n.slider-selection { position: absolute; left: var(--range-start, 0%); right: calc(100% - var(--range-end, 100%)); top: 0; height: 1px; background: var(--accent); }\n.range-slider input[type=\"range\"] { position: absolute; inset: 0; z-index: 1; appearance: none; -webkit-appearance: none; width: 100%; height: 44px; margin: 0; padding: 0; border: 0; background: none; pointer-events: none; cursor: auto; outline: none; }\n.range-slider input[type=\"range\"]:last-of-type { z-index: 2; }\n.range-slider[data-min-at-max=\"true\"] input[type=\"range\"]:first-of-type { z-index: 3; }\n.range-slider input[type=\"range\"]:focus-visible { z-index: 4; }\n.range-slider input[type=\"range\"]::-webkit-slider-runnable-track { height: 1px; background: none; border: 0; }\n.range-slider input[type=\"range\"]::-webkit-slider-thumb { appearance: none; -webkit-appearance: none; width: 44px; height: 44px; margin-top: -21.5px; border: 0; border-radius: 50%; background: radial-gradient(circle, var(--accent) 0 5px, transparent 5.5px); pointer-events: auto; cursor: ew-resize; }\n.range-slider input[type=\"range\"]:focus-visible::-webkit-slider-thumb { background: radial-gradient(circle, var(--accent) 0 5px, var(--filter-background) 5.5px 8px, var(--accent) 8.5px 9px, transparent 9.5px); }\n.range-slider input[type=\"range\"]::-moz-range-track { height: 1px; border: 0; background: none; }\n.range-slider input[type=\"range\"]::-moz-range-thumb { width: 44px; height: 44px; border: 0; border-radius: 50%; background: radial-gradient(circle, var(--accent) 0 5px, transparent 5.5px); pointer-events: auto; cursor: ew-resize; }\n.range-slider input[type=\"range\"]:focus-visible::-moz-range-thumb { background: radial-gradient(circle, var(--accent) 0 5px, var(--filter-background) 5.5px 8px, var(--accent) 8.5px 9px, transparent 9.5px); }\n.checkbox-filters { display: flex; align-items: center; justify-content: flex-end; gap: 18px; min-height: 44px; margin-bottom: -5px; }\n.checkbox-label { display: inline-flex; align-items: center; gap: 9px; color: var(--muted); font-size: 11px; line-height: 1.5; white-space: nowrap; cursor: pointer; }\n.checkbox-label input { appearance: none; display: inline-grid; place-items: center; width: 12px; height: 12px; flex-shrink: 0; margin: 0; border: 1px solid color-mix(in srgb, var(--muted) 50%, var(--paper)); background: none; border-radius: 0; cursor: pointer; }\n.checkbox-label input:checked { border-color: var(--accent); background: var(--accent); }\n.checkbox-label input:checked::after { content: ''; width: 5px; height: 3px; border-left: 1px solid var(--paper); border-bottom: 1px solid var(--paper); transform: rotate(-45deg) translateY(-1px); }\n.checkbox-label:has(input:checked) { color: var(--ink); }\ninput[aria-invalid=\"true\"] { border-color: var(--negotiating); }\n\n/* A quiet count line leads into an unboxed list. */\n.result-toolbar { display: flex; align-items: center; gap: 25px; padding: 27px 0 21px; }\n.result-count { margin: 0; font-size: 12px; line-height: 1.5; }\n.result-count strong { font-family: 'Montserrat', Arial, sans-serif; font-size: 27px; font-weight: 400; margin-right: 3px; }\n.result-total { color: var(--muted); font-size: 11px; }\n.reset-button { display: inline-flex; align-items: center; gap: 10px; padding: 8px 0; color: var(--muted); font-size: 10px; }\n.reset-button:hover { color: var(--ink); }\n.reset-button > span { color: var(--accent); font-size: 17px; }\n.sort-field { display: flex; align-items: center; gap: 17px; margin-left: auto; min-width: 0; }\n.sort-field > label { color: var(--muted); font-size: 9px; letter-spacing: 1px; text-transform: uppercase; }\n.sort-field .select-wrap::after { top: 8px; right: 2px; }\n.sort-field select { min-width: 172px; max-width: 100%; border: 0; background: none; padding: 0 23px 0 0; font-size: 11px; line-height: 1.7; }\n.favorites-hint { display: flex; align-items: center; gap: 8px; margin: -7px 0 17px; color: var(--muted); font-size: 10px; line-height: 1.6; }\n.favorites-hint > svg { width: 13px; height: 13px; flex-shrink: 0; color: var(--accent); }\n.filter-chips { display: flex; flex-wrap: wrap; gap: 8px; }\n.filter-chips:not(:empty) { padding-bottom: 24px; }\n.filter-chip { display: inline-flex; align-items: center; gap: 13px; max-width: 100%; padding: 6px 0; margin-right: 14px; border-bottom: 1px solid var(--line); color: var(--muted); font-size: 10px; text-align: left; overflow-wrap: anywhere; }\n.filter-chip > span { color: var(--accent); font-size: 16px; }\n.filter-chip:hover { color: var(--ink); border-color: var(--accent); }\n.results { width: 100%; }\n.apartment-table { width: 100%; border-collapse: collapse; table-layout: auto; text-align: left; font-variant-numeric: tabular-nums; }\n.apartment-table th { height: 42px; padding: 0 12px 15px; border-bottom: 1px solid var(--line); color: var(--muted); font-size: 10px; font-weight: 400; letter-spacing: .2px; white-space: nowrap; vertical-align: bottom; }\n.apartment-table th:first-child, .apartment-table td:first-child { padding-left: 0; }\n.apartment-table th:last-child, .apartment-table td:last-child { padding-right: 0; }\n.apartment-table th button { padding: 5px 0 0; text-align: left; font: inherit; color: inherit; white-space: nowrap; }\n.apartment-table td { height: 146px; padding: 15px 12px; border-bottom: 1px solid var(--line); vertical-align: middle; font-size: 14px; line-height: 1.6; }\n.apartment-row { cursor: pointer; transition: background .15s; }\n.apartment-row:hover, .apartment-row:focus-within { background: var(--hover); }\n.unit-id, .unit-type { font-family: 'Montserrat', Arial, sans-serif; font-size: 26px; font-weight: 400; letter-spacing: -.6px; line-height: 1.15; white-space: nowrap; }\n.unit-type { flex-shrink: 0; }\n.unit-open { display: inline-block; padding: 0; border: 0; background: none; text-align: left; transition: color .15s; }\n.unit-open:hover { color: var(--accent); }\n.unit-summary { display: flex; align-items: center; gap: 12px; }\n.unit-identification { flex-shrink: 0; }\n.unit-media { display: flex; align-items: flex-start; gap: 10px; }\n.unit-media .media-preview { width: 140px; flex-shrink: 0; }\n.unit-media .preview-visual { height: 110px; }\n.cell-floor-layout { width: 124px; }\n.cell-floor-layout .media-preview { margin-inline: auto; }\n.media-preview { display: flex; flex-direction: column; align-items: stretch; width: 100px; min-width: 0; padding: 0; border: 0; background: none; text-align: left; }\n.preview-visual { display: flex; align-items: center; justify-content: center; width: 100%; height: 90px; overflow: hidden; border: 0; background: none; transition: opacity .15s; }\n.preview-visual img { display: block; min-width: 0; min-height: 0; width: 100%; height: 100%; border: 0; object-fit: contain; background: none; }\n.media-preview:hover .preview-visual { opacity: .8; }\n.preview-unavailable { color: var(--muted); font-size: 8px; text-align: center; }\n.row-actions { display: flex; justify-content: flex-end; align-items: center; gap: 9px; }\n.action-pills { display: flex; flex-direction: column; align-items: stretch; gap: 8px; width: 102px; flex-shrink: 0; }\n.datasheet-link { display: inline-flex; align-items: center; justify-content: center; gap: 6px; min-height: 34px; padding: 8px 13px; border: 1px solid var(--line); border-radius: 999px; background: none; color: var(--ink); font-size: 10px; line-height: 1.5; white-space: nowrap; transition: border-color .15s, background .15s; }\n.datasheet-large { min-height: 40px; padding: 10px 17px; font-size: 11px; }\n.datasheet-link > svg { color: var(--accent); flex-shrink: 0; }\n.datasheet-link:hover { border-color: var(--accent); background: var(--hover); }\n.datasheet-link[aria-busy=\"true\"] { opacity: .45; pointer-events: none; }\n.action-pill { display: inline-flex; align-items: center; justify-content: center; gap: 6px; width: 102px; min-width: 102px; max-width: 102px; height: 34px; min-height: 34px; max-height: 34px; margin: 0; padding: 0 9px; border: 1px solid var(--line); border-radius: 999px; background: none; color: var(--ink); font-size: 10px; font-weight: 400; line-height: 1.4; text-align: center; white-space: nowrap; cursor: pointer; transition: border-color .15s, background .15s, color .15s; }\n.action-pill:hover { border-color: var(--accent); background: var(--hover); }\n.action-pill > svg { width: 14px; height: 14px; flex-shrink: 0; }\n.compare-toggle > svg { opacity: 0; }\n.compare-toggle[aria-pressed=\"true\"] { border-color: var(--button); background: var(--button); color: var(--button-text); }\n.compare-toggle[aria-pressed=\"true\"] > svg { opacity: 1; }\n.download-wrap { display: inline-flex; flex-direction: column; align-items: flex-start; min-width: 0; }\n.download-fallback { display: inline-flex; gap: 5px; margin-top: 6px; color: var(--muted); font-size: 9px; text-decoration: underline; text-underline-offset: 3px; }\n.cell-area, .cell-building, .cell-interior, .cell-balcony, .cell-garden, .cell-price, .cell-floor { white-space: nowrap; }\n.cell-garden { width: 66px; }\n.garden-value { display: block; min-height: 1.5em; }\n.cell-price { font-weight: 400; }\n.cell-rooms, .heading-rooms { text-align: center; }\n.status-pill { display: inline-flex; align-items: center; gap: 7px; color: var(--muted); font-size: 10px; line-height: 1.5; white-space: nowrap; }\n.status-pill::before { content: ''; width: 4px; height: 4px; flex-shrink: 0; border-radius: 50%; background: currentColor; }\n.status-available { color: var(--available); }\n.status-under_negotiation { color: var(--negotiating); }\n.status-sold { color: var(--sold); }\n.status-unknown { color: var(--muted); }\n.cell-actions { min-width: 150px; text-align: right; }\n.save-button { display: inline-grid; place-items: center; width: 31px; height: 34px; vertical-align: middle; padding: 6px; color: color-mix(in srgb, var(--muted) 65%, var(--paper)); }\n.save-button svg { display: block; width: 18px; height: 18px; }\n.save-button:hover, .save-button.is-saved { color: var(--accent); }\n.save-button.is-saved svg path { fill: currentColor; }\n.details-button { display: inline-flex; align-items: center; justify-content: space-between; gap: 20px; min-height: 36px; padding: 5px 0 5px 10px; font-size: 11px; line-height: 1.5; white-space: nowrap; }\n.details-button > span { color: var(--accent); font-size: 17px; transition: transform .15s; }\n.details-button:hover > span { transform: translate(2px, -2px); }\n.data-note { max-width: 870px; margin: 25px 0 0; color: var(--muted); font-size: 10px; line-height: 1.9; }\n.data-note:empty { display: none; }\n.data-note a { text-decoration: underline; text-underline-offset: 3px; }\n.loading-state, .empty-state { padding: 64px 24px; border-block: 1px solid var(--line); text-align: center; color: var(--muted); font-size: 12px; }\n.loading-dot { display: inline-block; width: 4px; height: 4px; margin-right: 11px; border-radius: 50%; background: var(--accent); animation: breathe 1s infinite alternate; }\n.empty-mark { display: block; color: var(--accent); font-size: 36px; margin-bottom: 15px; }\n.empty-state h2 { color: var(--ink); font-family: 'Montserrat', Arial, sans-serif; font-size: 27px; line-height: 1.3; font-weight: 400; margin: 0 0 14px; }\n.empty-state p { margin: 0 0 23px; font-size: 12px; line-height: 1.8; }\n.button-primary, .button-secondary { display: inline-flex; align-items: center; justify-content: center; gap: 20px; min-height: 43px; padding: 12px 19px; border: 1px solid var(--button); font-size: 11px; line-height: 1.5; text-align: center; }\n.button-primary { background: var(--button); color: var(--button-text); }\n.button-primary:hover { background: color-mix(in srgb, var(--button) 88%, var(--paper)); }\n.button-secondary { border-color: var(--line); background: none; color: var(--ink); }\n.button-secondary:hover { border-color: var(--accent); }\n\n/* Selection stays visible while the visitor compares the list. */\n.compare-tray { position: fixed; bottom: 20px; left: 50%; z-index: 30; transform: translateX(-50%); display: flex; align-items: center; justify-content: space-between; gap: 24px; width: min(900px, calc(100% - 40px)); padding: 19px 23px; border: 1px solid var(--line); background: var(--surface); box-shadow: 0 6px 30px color-mix(in srgb, var(--ink) 7%, transparent); }\n.compare-tray > div:first-child { display: flex; align-items: center; gap: 21px; min-width: 0; flex-wrap: wrap; }\n.compare-tray > div:last-child { display: flex; align-items: center; gap: 12px; flex-shrink: 0; }\n.tray-label { font-size: 9px; letter-spacing: 1px; color: var(--muted); }\n.compare-tray strong { font-family: 'Montserrat', Arial, sans-serif; font-weight: 400; font-size: 18px; }\n.tray-hint { color: var(--muted); font-size: 10px; white-space: nowrap; }\n.compare-tray .button-secondary { border: 0; color: var(--muted); padding-inline: 10px; }\n.toast { position: fixed; bottom: 26px; left: 50%; z-index: 80; transform: translate(-50%, 12px); max-width: calc(100% - 32px); padding: 13px 21px; background: var(--button); color: var(--button-text); font-size: 11px; line-height: 1.7; text-align: center; opacity: 0; pointer-events: none; transition: opacity .2s, transform .2s; }\n.toast.visible { opacity: 1; transform: translate(-50%, 0); }\n\n/* Details and comparison inherit the list's editable theme. */\n.apartment-dialog { width: min(930px, calc(100% - 40px)); max-height: calc(100% - 40px); margin: auto; padding: 0; overflow: auto; border: 1px solid var(--line); color: var(--ink); background: var(--paper); box-shadow: 0 20px 90px color-mix(in srgb, var(--ink) 15%, transparent); }\n.apartment-dialog::backdrop { background: color-mix(in srgb, var(--ink) 42%, transparent); backdrop-filter: blur(3px); }\n.dialog-inner { padding: 34px 38px; }\n.dialog-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 22px; padding-bottom: 25px; margin-bottom: 28px; border-bottom: 1px solid var(--line); }\n.eyebrow { color: var(--muted); font-size: 9px; letter-spacing: 1.3px; line-height: 1.6; margin-bottom: 13px; }\n.dialog-head h2 { margin: 0; font-family: 'Montserrat', Arial, sans-serif; font-size: 39px; font-weight: 400; letter-spacing: -.8px; line-height: 1.1; }\n.dialog-head h2 > span { color: var(--muted); }\n.dialog-close { display: grid; place-items: center; width: 33px; height: 33px; flex-shrink: 0; padding: 0; color: var(--muted); font-size: 25px; font-weight: 300; line-height: 1; }\n.dialog-close:hover { color: var(--accent); }\n.detail-gallery { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); align-items: start; gap: 15px; }\n.gallery-preview { width: 100%; }\n.gallery-preview .preview-visual { height: 180px; }\n.source-note { color: var(--muted); font-size: 10px; line-height: 1.9; margin: 21px 0 0; }\n.dialog-inner > .source-note { padding-top: 22px; margin-top: 26px; border-top: 1px solid var(--line); }\n.empty-plan { padding: 0 0 23px; border-bottom: 1px solid var(--line); color: var(--muted); }\n.empty-plan h3 { margin: 0 0 11px; font-family: 'Montserrat', Arial, sans-serif; font-size: 24px; font-weight: 400; line-height: 1.4; color: var(--ink); }\n.empty-plan p { margin: 0; font-size: 11px; line-height: 1.8; }\n\n/* The drawing leads; the room list flows into the centered price and inquiry. */\n#detail-dialog { width: 90vw; max-width: none; height: 90dvh; max-height: 90dvh; padding: 0; overflow: hidden; overscroll-behavior: contain; border: 1px solid color-mix(in srgb, var(--detail-muted) 20%, var(--detail-top)); color: var(--detail-ink); background: linear-gradient(180deg, var(--detail-top), var(--detail-bottom)); box-shadow: 0 24px 100px color-mix(in srgb, var(--detail-ink) 22%, transparent); font-family: 'Montserrat', Arial, Helvetica, sans-serif; }\n#detail-dialog::backdrop { background: color-mix(in srgb, var(--detail-ink) 47%, transparent); backdrop-filter: blur(5px); }\n#detail-dialog .detail-shell { position: relative; width: 100%; height: 100%; min-height: 0; isolation: isolate; }\n#detail-dialog .detail-brand-motif { position: absolute; z-index: -1; inset: 0 0 0 auto; width: 67%; pointer-events: none; background: linear-gradient(180deg, var(--detail-watermark-top), var(--detail-watermark-bottom)); -webkit-mask-image: var(--detail-monogram-image, none); mask-image: var(--detail-monogram-image, none); -webkit-mask-position: center; mask-position: center; -webkit-mask-repeat: no-repeat; mask-repeat: no-repeat; -webkit-mask-size: contain; mask-size: contain; opacity: .6; }\n#detail-dialog .detail-topbar { position: absolute; z-index: 50; top: 9px; right: 11px; height: 42px; pointer-events: none; }\n#detail-dialog .detail-top-actions { display: flex; align-items: center; justify-content: flex-end; gap: 7px; pointer-events: auto; }\n#detail-dialog .detail-drawing-save { display: flex; align-items: center; flex-shrink: 0; }\n#detail-dialog .detail-drawing-save .save-button.save-with-label { display: inline-flex; align-items: center; justify-content: center; gap: 5px; width: auto; height: 34px; min-height: 34px; padding: 2px 0; color: var(--detail-muted); }\n#detail-dialog .detail-drawing-save .save-button:hover, #detail-dialog .detail-drawing-save .save-button.is-saved { color: var(--detail-ink); }\n#detail-dialog .detail-drawing-save svg { width: 18px; height: 18px; }\n#detail-dialog .detail-save-label { display: block; max-width: 100px; font-size: 10px; font-weight: 400; line-height: 1.25; text-align: left; }\n#detail-dialog .dialog-close { width: 38px; height: 40px; color: var(--detail-ink); font-size: 29px; font-weight: 300; }\n#detail-dialog .dialog-close:hover { color: var(--detail-muted); }\n#detail-dialog :is(button, a, summary, input):focus-visible { outline: 2px solid var(--detail-ink); outline-offset: 4px; }\n#detail-dialog .detail-layout { position: relative; display: grid; grid-template-columns: minmax(0, 1.3fr) minmax(0, 1fr); grid-template-rows: minmax(0, 1fr); column-gap: clamp(20px, 2vw, 42px); width: 100%; height: 100%; min-width: 0; min-height: 0; padding: 22px clamp(18px, 2vw, 42px) 34px; }\n#detail-dialog .detail-sidebar { grid-column: 2; grid-row: 1; display: grid; grid-template-rows: auto 1px minmax(0, 1fr) auto; row-gap: 16px; min-width: 0; min-height: 0; }\n#detail-dialog .detail-core { display: grid; grid-template-columns: minmax(0, .95fr) minmax(0, 1.05fr); align-items: center; column-gap: 20px; min-width: 0; padding-block: 16px; }\n#detail-dialog .detail-identity { min-width: 0; text-align: center; }\n#detail-dialog .detail-brand-group { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0; min-width: 0; }\n#detail-dialog .detail-logo { display: block; width: 200px; max-width: 100%; aspect-ratio: 1232.62 / 523.833007; margin-inline: auto; background: var(--detail-ink); -webkit-mask-image: var(--detail-logo-image, none); mask-image: var(--detail-logo-image, none); -webkit-mask-position: center; mask-position: center; -webkit-mask-repeat: no-repeat; mask-repeat: no-repeat; -webkit-mask-size: contain; mask-size: contain; }\n#detail-dialog .detail-apartment-number { margin: 0; color: var(--detail-ink); font-size: 48px; font-weight: 600; letter-spacing: -1.7px; line-height: 1.05; text-align: center; white-space: nowrap; }\n#detail-dialog .detail-area-row { display: flex; flex-direction: column; gap: 8px; min-width: 0; padding-top: 0; }\n#detail-dialog .detail-metrics { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; margin: 0; }\n#detail-dialog .detail-metrics.has-garden { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 6px; }\n#detail-dialog .detail-core:has(.detail-metrics.has-garden) { grid-template-columns: minmax(0, .7fr) minmax(0, 1.3fr); }\n#detail-dialog .detail-metrics > div { display: block; min-width: 0; text-align: center; }\n#detail-dialog .detail-metrics dt { margin: 0 0 4px; color: var(--detail-muted); font-size: 15px; font-weight: 400; line-height: 1.4; }\n#detail-dialog .detail-metrics dd { margin: 0; font-size: 30px; font-weight: 600; letter-spacing: -.8px; line-height: 1.05; white-space: nowrap; }\n#detail-dialog .detail-metrics.has-garden dd { white-space: normal; }\n#detail-dialog .detail-metrics dd small { display: inline-block; margin-left: 3px; color: var(--detail-muted); font-size: 14px; font-weight: 400; letter-spacing: 0; line-height: 1.3; vertical-align: baseline; }\n#detail-dialog .detail-drawing-toolbar { display: flex; align-items: center; justify-content: flex-start; flex-shrink: 0; gap: 10px; min-width: 0; min-height: 27px; margin-bottom: 10px; }\n#detail-dialog .detail-drawing-toolbar .detail-document-tabs { flex-shrink: 0; margin: 0; }\n#detail-dialog .detail-unit-meta { flex: 1; min-width: 0; margin: 0; padding: 0; color: var(--detail-muted); font-size: 10px; font-weight: 400; line-height: 1.4; text-align: right; }\n#detail-dialog .detail-unit-meta strong { font-weight: 600; }\n#detail-dialog .detail-unit-meta span { display: inline-block; margin-inline: 3px; }\n#detail-dialog .detail-layout-label { margin-left: 7px; color: var(--detail-muted); font-size: 10px; font-weight: 300; letter-spacing: 0; line-height: 1.3; }\n#detail-dialog .detail-illustration-note { position: absolute; z-index: 10; left: 10px; bottom: 6px; max-width: calc(100% - 20px); margin: 0; padding: 0; color: var(--detail-muted); font-size: 9px; font-weight: 300; line-height: 1.3; text-align: left; pointer-events: none; }\n#detail-dialog .detail-divider { display: block; width: 100%; height: 1px; margin: 0; border: 0; background: color-mix(in srgb, var(--detail-muted) 25%, transparent); }\n#detail-dialog .detail-room-panel { position: relative; }\n#detail-dialog .detail-room-tabs { position: absolute; top: 0; right: 0; gap: 12px; margin: 0; padding: 0; }\n#detail-dialog .detail-panel-nav { display: none; }\n#detail-dialog .detail-drawing { grid-column: 1; grid-row: 1; }\n#detail-dialog .detail-drawing, #detail-dialog .detail-room-panel { display: flex; flex-direction: column; min-width: 0; min-height: 0; }\n#detail-dialog .detail-document-tabs, #detail-dialog .detail-room-tabs { display: flex; align-items: center; gap: 16px; flex-shrink: 0; min-width: 0; min-height: 27px; margin-bottom: 10px; }\n#detail-dialog :is(.detail-document-tabs, .detail-room-tabs, .detail-summary-tabs) button { min-height: 27px; margin: 0; padding: 3px 0 6px; border: 0; border-bottom: 1px solid transparent; color: var(--detail-muted); background: none; font-size: 11px; line-height: 1.4; text-align: left; }\n#detail-dialog :is(.detail-document-tabs, .detail-room-tabs, .detail-summary-tabs) button[aria-selected=\"true\"], #detail-dialog :is(.detail-document-tabs, .detail-room-tabs) button.is-active { border-bottom-color: var(--detail-ink); color: var(--detail-ink); }\n#detail-dialog .detail-plan, #detail-dialog .detail-floor-plan { display: flex; flex: 1; flex-direction: column; min-width: 0; min-height: 0; margin: 0; }\n#detail-dialog .detail-section-label { flex-shrink: 0; margin: 0 0 9px; color: var(--detail-muted); font-size: 10px; font-weight: 400; letter-spacing: 1.1px; line-height: 1.4; text-transform: uppercase; }\n#detail-dialog .detail-plan-stage { position: relative; container-type: size; display: grid; flex: 1; place-items: center; min-width: 0; min-height: 0; margin: 0; padding: 0; border: 0; background: none; }\n#detail-dialog .detail-plan-canvas { position: relative; width: min(100cqw, calc(100cqh * var(--plan-aspect, 1))); max-width: 100%; max-height: 100%; aspect-ratio: var(--plan-aspect, 1); overflow: hidden; border: 0; background: none; }\n#detail-dialog .detail-plan-surface { position: absolute; }\n#detail-dialog .detail-plan-image { display: block; width: 100%; height: 100%; max-width: none; margin: 0; border: 0; object-fit: contain; background: none; }\n#detail-dialog .detail-plan-markers { position: absolute; inset: 0; }\n#detail-dialog .room-marker { position: absolute; z-index: 2; display: grid; place-items: center; width: 28px; height: 28px; margin: 0; padding: 0; border: 0; border-radius: 50%; color: var(--detail-ink); background: none; font-family: inherit; font-size: 11px; font-weight: 400; line-height: 1; transform: translate(-50%, -50%); isolation: isolate; cursor: pointer; }\n#detail-dialog .room-marker::before { content: ''; position: absolute; z-index: -1; inset: 4px; border: 1px solid color-mix(in srgb, var(--detail-ink) 48%, var(--detail-top)); border-radius: 50%; background: color-mix(in srgb, var(--detail-top) 96%, transparent); box-shadow: 0 1px 5px color-mix(in srgb, var(--detail-ink) 9%, transparent); transition: background .15s, border-color .15s; }\n#detail-dialog .room-marker.is-active { z-index: 5; color: var(--detail-top); }\n#detail-dialog .room-marker.is-active::before { border-color: var(--detail-ink); background: var(--detail-ink); }\n#detail-dialog .room-marker:focus-visible { outline-offset: 0; }\n#detail-dialog .detail-plan-note { flex-shrink: 0; margin: 9px 0 0; color: var(--detail-muted); font-size: 10px; line-height: 1.5; }\n#detail-dialog .detail-floor-plan > .detail-floor-image { display: block; flex: 1; min-width: 0; min-height: 0; width: 100%; height: 100%; margin: 0; border: 0; object-fit: contain; background: none; }\n#detail-dialog .empty-plan { display: flex; flex: 1; flex-direction: column; justify-content: center; min-height: 0; padding: 0; border: 0; color: var(--detail-muted); }\n#detail-dialog .empty-plan h3 { color: var(--detail-ink); }\n#detail-dialog .detail-rooms, #detail-dialog .unit-room-section { display: flex; flex: 1; flex-direction: column; min-width: 0; min-height: 0; margin: 0; }\n#detail-dialog :is(.detail-rooms, .unit-room-section) > h3 { flex-shrink: 0; min-height: 28px; margin: 0 0 6px; padding-right: 190px; color: var(--detail-ink); font-family: inherit; font-size: 20px; font-weight: 400; letter-spacing: -.4px; line-height: 1.3; }\n#detail-dialog .room-page { flex: 1; min-width: 0; min-height: 0; }\n#detail-dialog .type-room-list, #detail-dialog .unit-room-list { display: grid; grid-template-columns: repeat(var(--room-columns, 1), minmax(0, 1fr)); gap: 0 10px; margin: 0; padding: 0; list-style: none; }\n#detail-dialog .type-room-list > li { min-width: 0; }\n#detail-dialog .room-legend-button { display: grid; grid-template-columns: var(--room-circle, 18px) minmax(0, 1fr) auto; align-items: center; gap: 6px; width: 100%; min-height: 0; margin: 0; padding: var(--room-padding, 4px) 0; border: 0; border-bottom: 1px solid color-mix(in srgb, var(--detail-muted) 20%, transparent); background: none; color: var(--detail-ink); text-align: left; }\n#detail-dialog .room-number { display: grid; place-items: center; width: var(--room-circle, 18px); height: var(--room-circle, 18px); border: 1px solid color-mix(in srgb, var(--detail-muted) 36%, var(--detail-top)); border-radius: 50%; color: var(--detail-muted); font-size: 10px; line-height: 1; transition: background .15s, color .15s; }\n#detail-dialog .room-name { min-width: 0; font-size: 11px; line-height: 1.4; }\n#detail-dialog .room-area { font-size: 10px; font-variant-numeric: tabular-nums; line-height: 1.4; white-space: nowrap; }\n#detail-dialog .room-legend-button.is-active .room-number { border-color: var(--detail-ink); background: var(--detail-ink); color: var(--detail-top); }\n#detail-dialog .unit-room-list li { display: grid; grid-template-columns: minmax(0, 1fr) auto; align-items: baseline; gap: 8px; min-width: 0; min-height: 0; padding: var(--room-padding, 4px) 0; border-bottom: 1px solid color-mix(in srgb, var(--detail-muted) 20%, transparent); color: var(--detail-muted); font-size: 11px; line-height: 1.4; }\n#detail-dialog .unit-room-list li > :last-child { color: var(--detail-ink); font-size: 10px; font-weight: 400; white-space: nowrap; }\n\n\n#detail-dialog .detail-conversion { display: grid; grid-template-rows: auto auto auto; row-gap: 10px; min-width: 0; }\n#detail-dialog .detail-price { margin: 0; padding: 6px 10px; border-radius: 8px; background: color-mix(in srgb, var(--detail-ink) 4%, transparent); text-align: center; }\n#detail-dialog .detail-price > span { display: block; margin: 0 0 5px; color: var(--detail-muted); font-size: 11px; line-height: 1.4; }\n#detail-dialog .detail-price > p { display: flex; align-items: baseline; justify-content: center; flex-wrap: wrap; gap: 6px; margin: 0; }\n#detail-dialog .price-value { font-size: clamp(38px, 3.5vw, 58px); font-weight: 400; letter-spacing: -1.6px; line-height: 1.05; }\n#detail-dialog .price-unit { color: var(--detail-ink); font-size: 12px; font-weight: 400; line-height: 1.4; }\n#detail-dialog .price-unavailable { font-size: 24px; font-weight: 400; letter-spacing: -.7px; line-height: 1.2; }\n#detail-dialog .detail-inquiry { position: relative; min-width: 0; min-height: 60px; margin: 0; }\n#detail-dialog .detail-inquiry > .inquiry-button { width: 100%; }\n#detail-dialog .inquiry-pending { position: absolute; z-index: 40; bottom: calc(100% + 8px); left: 0; right: 0; margin: 0; padding: 13px 15px; border: 1px solid color-mix(in srgb, var(--detail-muted) 28%, var(--detail-top)); border-radius: 3px; color: var(--detail-muted); background: var(--detail-top); box-shadow: 0 7px 25px color-mix(in srgb, var(--detail-ink) 12%, transparent); font-size: 11px; line-height: 1.6; }\n#detail-dialog .inquiry-pending p { margin: 0; }\n#detail-dialog .inquiry-pending button { display: inline; margin: 4px 0 0; padding: 0; color: var(--detail-ink); font-size: inherit; text-decoration: underline; text-underline-offset: 4px; }\n#detail-dialog .detail-footer { display: grid; grid-template-columns: minmax(0, 1fr) minmax(100px, .85fr) minmax(0, 1fr); align-items: center; gap: 12px; margin: 0; min-width: 0; }\n#detail-dialog .detail-footer > :is(.download-wrap, .detail-share-wrap) { display: block; width: 100%; min-width: 0; }\n#detail-dialog .detail-footer .footer-pill { display: flex; align-items: center; justify-content: center; gap: 6px; width: 100%; min-width: 0; max-width: none; height: 44px; min-height: 44px; max-height: 44px; margin: 0; padding: 8px 11px; border: 1px solid var(--detail-ink); border-radius: 999px; color: var(--detail-ink); background: none; font-size: 11px; font-weight: 500; line-height: 1.2; text-align: center; white-space: normal; cursor: pointer; }\n#detail-dialog .detail-footer .datasheet-link { color: var(--detail-ink); background: none; }\n#detail-dialog .detail-footer .datasheet-link:hover { background: color-mix(in srgb, var(--detail-top) 40%, transparent); }\n#detail-dialog .detail-footer .footer-pill > svg { display: block; width: 15px; height: 15px; flex-shrink: 0; color: currentColor; }\n#detail-dialog .detail-footer .share-button:hover, #detail-dialog .detail-footer .share-button[aria-expanded=\"true\"] { background: color-mix(in srgb, var(--detail-top) 40%, transparent); }\n#detail-dialog .detail-status { display: flex; align-items: center; justify-content: center; min-width: 0; min-height: 44px; margin: 0; padding: 0; border: 0; text-align: center; }\n#detail-dialog .detail-status .status-pill { display: inline-flex; align-items: center; justify-content: center; gap: 6px; max-width: 100%; color: var(--detail-ink); font-size: 18px; font-weight: 400; line-height: 1.15; white-space: normal; }\n#detail-dialog .detail-status .status-pill::before { display: block; width: 6px; height: 6px; flex-shrink: 0; border-radius: 50%; background: currentColor; }\n#detail-dialog .detail-status .status-available { color: var(--available); }\n#detail-dialog .detail-status .status-sold { color: var(--sold); }\n#detail-dialog .detail-status .status-under_negotiation { color: var(--negotiating); }\n#detail-dialog .detail-status .status-available::before { animation: detail-availability-pulse 2.3s ease-in-out infinite; }\n@keyframes detail-availability-pulse { 0%, 100% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--available) 24%, transparent); } 50% { box-shadow: 0 0 0 4px color-mix(in srgb, var(--available) 8%, transparent); } }\n@media (prefers-reduced-motion: reduce) { #detail-dialog .detail-status .status-available::before { animation: none; box-shadow: none; } }\n#detail-dialog .detail-share-wrap { position: relative; }\n#detail-dialog .download-fallback { color: var(--detail-muted); }\n#detail-dialog .share-popover { position: fixed; z-index: 100; width: min(280px, calc(90vw - 24px)); margin: 0; padding: 14px; border: 1px solid color-mix(in srgb, var(--detail-muted) 28%, var(--detail-top)); border-radius: 8px; color: var(--detail-ink); background: var(--detail-top); box-shadow: 0 10px 38px color-mix(in srgb, var(--detail-ink) 16%, transparent); }\n#detail-dialog .share-heading { display: flex; align-items: center; justify-content: space-between; gap: 14px; margin-bottom: 9px; }\n#detail-dialog .share-heading > div { display: flex; flex-direction: column; gap: 4px; }\n#detail-dialog .share-heading span { color: var(--detail-muted); font-size: 10px; line-height: 1.4; }\n#detail-dialog .share-heading strong { font-family: 'Montserrat', Arial, sans-serif; font-size: 23px; font-weight: 400; line-height: 1.1; }\n#detail-dialog .share-heading > button { display: grid; place-items: center; width: 30px; height: 30px; padding: 0; color: var(--detail-ink); font-size: 22px; line-height: 1; }\n#detail-dialog .share-options { display: grid; }\n#detail-dialog .share-options > :is(button, a) { display: flex; align-items: center; gap: 11px; min-height: 33px; margin: 0; padding: 7px 0; border-bottom: 1px solid color-mix(in srgb, var(--detail-muted) 16%, transparent); color: var(--detail-ink); font-size: 12px; line-height: 1.4; text-align: left; }\n#detail-dialog .share-options > :is(button, a) > span { width: 18px; color: var(--detail-muted); text-align: center; }\n#detail-dialog .share-options > :is(button, a):hover { color: var(--detail-muted); }\n#detail-dialog .share-url { display: block; width: 100%; min-width: 0; height: 31px; margin-top: 11px; padding: 6px 8px; border: 1px solid color-mix(in srgb, var(--detail-muted) 25%, transparent); border-radius: 3px; color: var(--detail-muted); background: none; font-size: 10px; line-height: 1.4; }\n#detail-dialog .share-feedback { display: block; min-height: 14px; margin-top: 7px; color: var(--detail-muted); font-size: 10px; line-height: 1.4; }\n\n/* ADMIRAL_INQUIRY_BUTTON_START */\n.inquiry-button { --inquiry-gold-shadow: #b1935c; --inquiry-gold-mid: #d4bd8e; --inquiry-gold-light: #ecdbb5; --inquiry-gold-edge: #bda36f; --inquiry-ink: #2c281f; --inquiry-shine: #fffdf4; box-sizing: border-box; position: relative; display: inline-flex; align-items: center; justify-content: center; gap: 22px; width: 100%; min-width: 0; height: 60px; min-height: 60px; margin: 0; padding: 15px 24px; overflow: hidden; border: 1px solid var(--inquiry-gold-edge); border-radius: 999px; color: var(--inquiry-ink); background: linear-gradient(112deg, var(--inquiry-gold-shadow) 0%, var(--inquiry-gold-mid) 30%, var(--inquiry-gold-light) 57%, var(--inquiry-gold-shadow) 100%); box-shadow: inset 0 1px 0 color-mix(in srgb, var(--inquiry-shine) 55%, transparent), 0 3px 11px color-mix(in srgb, var(--inquiry-gold-shadow) 12%, transparent); font-family: 'Montserrat', Arial, sans-serif; font-size: 22px; font-weight: 600; letter-spacing: .2px; line-height: 1.3; text-align: center; text-decoration: none; cursor: pointer; -webkit-tap-highlight-color: transparent; transition: transform .2s, box-shadow .2s; }\n.inquiry-button:hover { transform: translateY(-1px); box-shadow: inset 0 1px 0 color-mix(in srgb, var(--inquiry-shine) 70%, transparent), 0 5px 15px color-mix(in srgb, var(--inquiry-gold-shadow) 18%, transparent); }\n.inquiry-button:active { transform: translateY(0); }\n.inquiry-button:focus-visible { outline: 2px solid var(--inquiry-ink); outline-offset: 5px; }\n.inquiry-button > svg { display: none; }\n@media (prefers-reduced-motion: reduce) { .inquiry-button { transition: none; } .inquiry-button:hover { transform: none; } }\n/* ADMIRAL_INQUIRY_BUTTON_END */\n\n/* Center the complete room block within its measured spare space. */\n@media (min-width: 1101px) and (min-height: 601px) {\n  #detail-dialog .detail-room-tabs, #detail-dialog .detail-room-panel :is(.detail-rooms, .unit-room-section) > h3, #detail-dialog .detail-room-panel :is(.type-room-list, .unit-room-list) { transform: translateY(calc(var(--room-slack, 0px) * .5)); }\n}\n@media (min-width: 1700px) and (min-height: 900px) {\n  #detail-dialog .detail-layout { padding-block: 28px 40px; }\n  #detail-dialog .detail-sidebar { row-gap: 16px; }\n  #detail-dialog .detail-core { column-gap: 24px; padding-block: 24px; }\n  #detail-dialog .detail-logo { width: 230px; }\n  #detail-dialog .detail-apartment-number { font-size: 56px; }\n  #detail-dialog .detail-metrics dd { font-size: 34px; }\n  #detail-dialog .room-name { font-size: 12px; }\n}\n@media (max-height: 800px) {\n  #detail-dialog .detail-layout { padding-block: 16px 28px; }\n  #detail-dialog .detail-sidebar { row-gap: 8px; }\n  #detail-dialog .detail-core { column-gap: 16px; padding-block: 4px; }\n  #detail-dialog .detail-logo { width: 200px; }\n  #detail-dialog .detail-metrics { gap: 8px; }\n  #detail-dialog .detail-metrics dd { font-size: 28px; }\n  #detail-dialog .detail-conversion { row-gap: 6px; }\n  #detail-dialog .detail-price { padding: 4px 8px; }\n  #detail-dialog .detail-price > span { margin-bottom: 3px; font-size: 10px; }\n  #detail-dialog .price-value { font-size: 32px; }\n}\n@media (max-width: 1100px), (max-height: 600px) {\n  #detail-dialog .detail-layout { grid-template-columns: minmax(0, 1fr); grid-template-rows: auto 1px 32px minmax(0, 1fr) auto; gap: 8px 0; padding: 13px 15px 25px; }\n  #detail-dialog .detail-sidebar { display: contents; }\n  #detail-dialog .detail-core { grid-column: 1; grid-row: 1; grid-template-columns: minmax(0, .9fr) minmax(0, 1.1fr); column-gap: 14px; padding-block: 0; }\n  #detail-dialog .detail-logo { width: 160px; }\n  #detail-dialog .detail-core:has(.detail-metrics.has-garden) { grid-template-columns: minmax(0, .6fr) minmax(0, 1.4fr); }\n  #detail-dialog .detail-apartment-number { font-size: 34px; letter-spacing: -1.3px; }\n  #detail-dialog .detail-area-row { gap: 6px; padding-top: 0; }\n  #detail-dialog .detail-metrics { gap: 8px; }\n  #detail-dialog .detail-metrics dt { font-size: 14px; }\n  #detail-dialog .detail-metrics dd { font-size: 22px; letter-spacing: -.8px; white-space: normal; }\n  #detail-dialog .detail-metrics dd small { font-size: 14px; }\n  #detail-dialog .detail-divider { grid-column: 1; grid-row: 2; }\n  #detail-dialog .detail-panel-nav { grid-column: 1; grid-row: 3; display: flex; align-items: stretch; justify-content: center; gap: 26px; border-bottom: 1px solid color-mix(in srgb, var(--detail-muted) 18%, transparent); }\n  #detail-dialog .detail-panel-nav button { min-width: 75px; min-height: 32px; margin: 0; padding: 0 4px; border: 0; border-bottom: 1px solid transparent; color: var(--detail-muted); background: none; font-size: 11px; line-height: 1.4; }\n  #detail-dialog .detail-panel-nav button[aria-selected=\"true\"] { border-bottom-color: var(--detail-ink); color: var(--detail-ink); }\n  #detail-dialog .detail-layout [data-detail-panel] { grid-column: 1; grid-row: 4; display: none; }\n  #detail-dialog .detail-shell[data-panel=\"plan\"] .detail-drawing { display: flex; }\n  #detail-dialog .detail-shell[data-panel=\"rooms\"] .detail-room-panel { display: flex; }\n  #detail-dialog .detail-room-panel { width: 100%; min-height: 0; padding-top: 26px; }\n  #detail-dialog .detail-room-panel h3 { display: block; min-height: 0; margin: 0 0 4px; padding: 0; font-size: 16px; line-height: 1.25; }\n  #detail-dialog .detail-room-tabs { min-height: 24px; }\n  #detail-dialog .detail-drawing-toolbar { gap: 8px; }\n  #detail-dialog .detail-drawing-toolbar .detail-document-tabs { gap: 10px; }\n  #detail-dialog .detail-drawing-toolbar .detail-document-tabs button { font-size: 10px; }\n  #detail-dialog .detail-unit-meta { font-size: 9px; }\n  #detail-dialog .detail-unit-meta span { margin-inline: 1px; }\n  #detail-dialog .detail-conversion { grid-column: 1; grid-row: 5; row-gap: 8px; }\n  #detail-dialog .detail-price > span { font-size: 10px; margin-bottom: 4px; }\n  #detail-dialog .price-value { font-size: 34px; }\n  #detail-dialog .price-unit { font-size: 10px; }\n  #detail-dialog .price-unavailable { font-size: 20px; }\n  #detail-dialog .detail-inquiry { min-height: 52px; }\n  #detail-dialog .detail-inquiry > .inquiry-button { height: 52px; min-height: 52px; padding: 12px 20px; font-size: 20px; }\n  #detail-dialog .detail-footer { grid-template-columns: minmax(0, 1fr) minmax(80px, .95fr) minmax(0, 1fr); gap: 6px; }\n  #detail-dialog .detail-footer .footer-pill { gap: 4px; padding: 6px; font-size: 10px; }\n  #detail-dialog .detail-footer .footer-pill > svg { width: 13px; height: 13px; }\n  #detail-dialog .detail-status .status-pill { gap: 4px; font-size: 14px; }\n  #detail-dialog .detail-status .status-pill::before { width: 5px; height: 5px; }\n  #detail-dialog .detail-brand-motif { width: 100%; }\n  #detail-dialog .detail-illustration-note { left: 8px; bottom: 5px; font-size: 8.5px; }\n}\n@media (max-width: 600px) {\n  #detail-dialog .detail-metrics dd small { display: block; margin-left: 0; }\n  #detail-dialog .detail-topbar { top: 8px; right: 8px; }\n  #detail-dialog .detail-top-actions { gap: 8px; }\n  #detail-dialog .detail-drawing-toolbar { flex-wrap: wrap; justify-content: flex-start; row-gap: 4px; column-gap: 10px; }\n  #detail-dialog .detail-drawing-save .save-button.save-with-label { gap: 4px; }\n  #detail-dialog .detail-save-label { max-width: 70px; font-size: 9.5px; overflow-wrap: anywhere; }\n  #detail-dialog .detail-drawing-toolbar .detail-unit-meta { flex-basis: 100%; font-size: 9px; text-align: left; }\n  #detail-dialog .dialog-close { width: 32px; height: 38px; font-size: 28px; }\n}\n@media (max-width: 600px) and (max-height: 700px) {\n  #detail-dialog .detail-layout { grid-template-rows: auto 1px 28px minmax(0, 1fr) auto; row-gap: 3px; padding: 6px 15px 20px; }\n  #detail-dialog .detail-core { column-gap: 12px; }\n  #detail-dialog .detail-logo { width: 130px; }\n  #detail-dialog .detail-apartment-number { font-size: 28px; letter-spacing: -1px; }\n  #detail-dialog .detail-area-row { gap: 4px; padding-top: 0; }\n  #detail-dialog .detail-metrics { gap: 6px; }\n  #detail-dialog .detail-metrics.has-garden { gap: 4px; }\n  #detail-dialog .detail-metrics dt { margin-bottom: 2px; }\n  #detail-dialog .detail-metrics dd { font-size: 18px; }\n  #detail-dialog .detail-conversion { row-gap: 4px; }\n  #detail-dialog .detail-price > span { margin-bottom: 2px; }\n  #detail-dialog .price-value { font-size: 28px; }\n  #detail-dialog .price-unavailable { font-size: 18px; }\n  #detail-dialog .detail-inquiry { min-height: 44px; }\n  #detail-dialog .detail-inquiry > .inquiry-button { height: 44px; min-height: 44px; padding: 10px 18px; font-size: 18px; }\n  #detail-dialog .detail-status .status-pill { font-size: 13px; }\n  #detail-dialog .detail-panel-nav { gap: 8px; }\n  #detail-dialog .detail-panel-nav button { min-width: 45px; min-height: 28px; font-size: 10px; }\n  #detail-dialog .detail-shell[data-panel=\"rooms\"] .detail-panel-nav { justify-content: flex-start; padding-right: 140px; }\n  #detail-dialog .detail-room-panel { padding-top: 0; }\n  #detail-dialog .detail-room-tabs { top: -31px; min-height: 28px; gap: 8px; }\n  #detail-dialog .detail-room-panel h3 { margin: 0; font-size: 13px; line-height: 1.2; }\n  #detail-dialog .detail-layout-label { margin-left: 5px; font-size: 10px; }\n  #detail-dialog .detail-illustration-note { font-size: 8px; line-height: 1.2; }\n  #detail-dialog .detail-room-tabs button { min-height: 28px; padding: 0; font-size: 10px; }\n}\n@media (max-width: 360px) and (max-height: 700px) {\n  #detail-dialog .detail-layout { row-gap: 2px; }\n}\n@media (max-width: 360px) {\n  #detail-dialog .detail-core { column-gap: 10px; }\n  #detail-dialog .detail-drawing-toolbar { gap: 6px; }\n  #detail-dialog .detail-drawing-toolbar .detail-document-tabs { gap: 8px; }\n  #detail-dialog .detail-drawing-toolbar .detail-document-tabs button { font-size: 9px; }\n  #detail-dialog .detail-unit-meta { font-size: 8px; }\n  #detail-dialog .type-room-list, #detail-dialog .unit-room-list { column-gap: 8px; }\n  #detail-dialog .room-legend-button { grid-template-columns: 14px minmax(0, 1fr) auto; gap: 2px; }\n  #detail-dialog .room-number { width: 14px; height: 14px; font-size: 9px; }\n  #detail-dialog .room-area { font-size: 9px; }\n}\n@media (max-height: 600px) and (min-width: 601px) {\n  #detail-dialog .detail-layout { --detail-landscape-rail: 300px; grid-template-columns: var(--detail-landscape-rail) minmax(0, 1fr); grid-template-rows: 28px minmax(0, 1fr); gap: 8px 20px; padding: 14px 18px 26px; }\n  #detail-dialog .detail-sidebar { grid-column: 1; grid-row: 1 / 3; display: grid; grid-template-rows: auto 1px minmax(0, 1fr) auto; row-gap: 6px; }\n  #detail-dialog .detail-core { grid-column: 1; grid-row: 1; grid-template-columns: minmax(0, .9fr) minmax(0, 1.1fr); column-gap: 10px; }\n  #detail-dialog .detail-logo { width: 140px; }\n  #detail-dialog .detail-apartment-number { font-size: 30px; }\n  #detail-dialog .detail-area-row { gap: 6px; padding-top: 0; }\n  #detail-dialog .detail-metrics { gap: 6px; }\n  #detail-dialog .detail-metrics dd { font-size: 20px; }\n  #detail-dialog .detail-room-panel h3 { margin: 0 0 3px; font-size: 14px; line-height: 1.2; }\n  #detail-dialog .detail-conversion { grid-column: 1; grid-row: 4; row-gap: 4px; }\n  #detail-dialog .detail-price > span { margin-bottom: 2px; }\n  #detail-dialog .price-value { font-size: 29px; }\n  #detail-dialog .detail-inquiry { min-height: 44px; }\n  #detail-dialog .detail-inquiry > .inquiry-button { height: 44px; min-height: 44px; padding: 10px 18px; font-size: 18px; }\n  #detail-dialog .detail-panel-nav { grid-column: 2; grid-row: 1; padding-right: 66px; gap: 16px; }\n  #detail-dialog .detail-layout > .detail-drawing { grid-column: 2; grid-row: 2; }\n  #detail-dialog .detail-room-panel { position: absolute; left: calc(18px + var(--detail-landscape-rail) + 20px); right: 18px; top: 50px; bottom: 14px; width: auto; padding-top: 26px; }\n}\n\n.compare-dialog { width: min(1000px, calc(100% - 40px)); }\n.compare-scroll { overflow-x: auto; }\n.compare-table { width: 100%; border-collapse: collapse; table-layout: fixed; font-size: 12px; }\n.compare-table th, .compare-table td { padding: 15px 17px; border-bottom: 1px solid var(--line); text-align: left; vertical-align: middle; line-height: 1.6; }\n.compare-table th { width: 26%; font-size: 10px; font-weight: 400; color: var(--muted); }\n.compare-table thead th { padding-top: 0; padding-bottom: 21px; font-family: 'Montserrat', Arial, sans-serif; font-size: 24px; color: var(--ink); }\n.compare-table thead th:first-child { font-family: 'Montserrat', Arial, sans-serif; font-size: 10px; color: var(--muted); }\n.compare-table th:first-child { padding-left: 0; }\n.compare-table td:last-child, .compare-table th:last-child { padding-right: 0; }\n.compare-table tbody tr:hover { background: var(--hover); }\n.compare-table .details-button { padding-left: 0; font-size: 10px; gap: 12px; }\n@keyframes breathe { to { opacity: .3; } }\n\n/* The full drawing is loaded only after a preview is opened. */\n.media-dialog { position: fixed; inset: 0; width: 100vw; max-width: none; height: 100dvh; max-height: none; margin: 0; padding: 0; border: 0; overflow: hidden; background: var(--paper); color: var(--ink); }\n.media-dialog::backdrop { background: var(--paper); }\n.media-shell { display: grid; grid-template-rows: auto minmax(0, 1fr) auto; width: 100%; height: 100%; }\n.media-header { display: grid; grid-template-columns: 1fr auto auto; align-items: center; gap: 32px; padding: 20px 32px; border-bottom: 1px solid var(--line); }\n.media-heading { min-width: 0; }\n.media-heading .eyebrow { margin: 0 0 6px; font-size: 8px; }\n.media-heading h2 { margin: 0; font-family: 'Montserrat', Arial, sans-serif; font-size: 27px; font-weight: 400; line-height: 1.2; }\n.media-description { margin: 7px 0 0; color: var(--muted); font-size: 10px; line-height: 1.6; }\n.media-tabs { display: flex; align-items: center; gap: 25px; }\n.media-tabs button { min-height: 40px; padding: 7px 0; border-bottom: 1px solid color-mix(in srgb, var(--line) 0%, transparent); color: var(--muted); font-size: 11px; }\n.media-tabs button[aria-selected=\"true\"] { border-color: var(--accent); color: var(--ink); }\n.media-stage { position: relative; min-width: 0; min-height: 0; overflow: hidden; user-select: none; touch-action: pan-x pan-y pinch-zoom; outline-offset: -5px; }\n.media-canvas { position: absolute; inset: 24px; pointer-events: none; }\n.media-image { display: block; width: 100%; height: 100%; object-fit: contain; transform-origin: center; transition: transform .1s ease-out; }\n.media-stage[data-zoomed=\"true\"] { cursor: grab; touch-action: none; }\n.media-stage[data-dragging=\"true\"] { cursor: grabbing; }\n.media-stage[data-dragging=\"true\"] .media-image { transition: none; }\n.media-dialog[data-loading=\"true\"] .media-image, .media-dialog[data-error=\"true\"] .media-image { opacity: 0; }\n.media-load-status { position: absolute; inset: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 16px; color: var(--muted); font-size: 12px; line-height: 1.8; text-align: center; }\n.media-load-status:empty { display: none; }\n.media-load-status p { margin: 0; }\n.media-load-status > div { display: flex; justify-content: center; flex-wrap: wrap; gap: 12px; }\n.media-footer { display: flex; align-items: center; justify-content: space-between; gap: 24px; padding: 13px 32px; border-top: 1px solid var(--line); }\n.media-footer > p { margin: 0; color: var(--muted); font-size: 10px; line-height: 1.7; }\n.media-zoom { display: flex; flex-shrink: 0; align-items: center; border: 1px solid var(--line); }\n.media-zoom button { display: grid; place-items: center; min-width: 37px; height: 36px; padding: 0 10px; color: var(--ink); font-size: 17px; }\n.media-zoom .zoom-level { min-width: 65px; font-size: 10px; border-inline: 1px solid var(--line); }\n.media-zoom button:hover { background: var(--hover); }\n\n/* Every apartment remains one full-width list row, including narrow Framer frames. */\n@container apartment-list (max-width: 1360px) {\n  .primary-filters, .range-filters { gap: 24px; }\n  .checkbox-filters { gap: 14px; }\n  .checkbox-label { font-size: 10px; gap: 7px; }\n  .apartment-table th, .apartment-table td { padding-inline: 8px; }\n  .apartment-table td { font-size: 13px; }\n  .apartment-table th { font-size: 9px; }\n  .unit-id, .unit-type { font-size: 25px; }\n  .unit-summary { gap: 10px; }\n  .cell-actions { min-width: 142px; }\n  .details-button { font-size: 10px; gap: 14px; padding-left: 5px; }\n  .status-pill { font-size: 9px; gap: 6px; }\n}\n@container apartment-list (max-width: 1360px) {\n  .apartment-table, .apartment-table tbody { display: block; }\n  .apartment-table thead { display: none; }\n  .apartment-table tbody { border-top: 1px solid var(--line); }\n  .apartment-table .apartment-row { display: grid; grid-template-columns: 250px minmax(40px, 1fr) minmax(66px, 1fr) minmax(100px, 1fr) minmax(80px, 1fr) minmax(105px, 1fr); grid-template-rows: auto auto; column-gap: 8px; row-gap: 4px; padding: 5px 0; margin: 0; border: 0; border-bottom: 1px solid var(--line); background: none; }\n  .apartment-table .apartment-row:hover, .apartment-table .apartment-row:focus-within { background: var(--hover); }\n  .apartment-table td { display: flex; flex-direction: column; justify-content: center; align-self: center; align-items: flex-start; min-width: 0; height: auto; min-height: 0; padding: 0; border: 0; gap: 6px; font-size: 13px; line-height: 1.5; text-align: left; }\n  .apartment-table td::before { content: attr(data-label); display: block; color: var(--muted); font-size: 9px; line-height: 1.4; font-weight: 400; white-space: normal; }\n  .apartment-table .cell-unit { grid-column: 1; grid-row: 1 / 3; }\n  .apartment-table .cell-unit::before { display: none; }\n  .apartment-table .cell-building { grid-column: 2; grid-row: 1; }\n  .apartment-table .cell-floor { grid-column: 3; grid-row: 1; }\n  .apartment-table .cell-rooms { grid-column: 4; grid-row: 1; }\n  .apartment-table .cell-interior { grid-column: 5; grid-row: 1; }\n  .apartment-table .cell-balcony { grid-column: 2 / 4; grid-row: 2; align-self: start; justify-self: start; width: calc(50% - 4px); }\n  .apartment-table .cell-garden { grid-column: 2 / 4; grid-row: 2; align-self: start; justify-self: end; width: calc(50% - 4px); }\n  .apartment-table .cell-price { grid-column: 6; grid-row: 1; font-size: 14px; }\n  .apartment-table .cell-status { grid-column: 2 / 4; grid-row: 2; align-self: end; }\n  .apartment-table .cell-status::before { display: none; }\n  .apartment-table .cell-status .status-pill { font-size: 10px; }\n  .apartment-table .cell-floor-layout { grid-column: 4; grid-row: 2; width: auto; align-items: center; }\n  .apartment-table .cell-floor-layout::before { display: none; }\n  .apartment-table .cell-actions { grid-column: 5 / -1; grid-row: 2; display: flex; flex-direction: column; justify-content: center; align-items: flex-end; min-width: 0; min-height: 90px; padding: 0; border: 0; }\n  .apartment-table .cell-actions::before { display: none; }\n  .cell-actions .save-button { width: 25px; padding-left: 0; }\n}\n@container apartment-list (max-width: 1200px) {\n  .apartment-table .apartment-row { padding-block: 18px; row-gap: 9px; }\n}\n@container apartment-list (max-width: 860px) {\n  .apartment-table .cell-balcony, .apartment-table .cell-garden { font-size: 12px; }\n}\n@container apartment-list (max-width: 760px) {\n  .filter-header { padding: 18px 20px 15px; }\n  .primary-filters { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px 24px; }\n  .range-filters { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 11px 24px; margin-top: 17px; }\n  .checkbox-filters { grid-column: 1 / -1; justify-content: flex-start; gap: 20px; min-height: 25px; margin-bottom: 0; }\n  .apartment-table .apartment-row { grid-template-columns: repeat(12, minmax(0, 1fr)); grid-template-rows: auto auto auto auto; column-gap: 6px; row-gap: 15px; padding: 19px 0; }\n  .apartment-table td { font-size: 14px; gap: 4px; }\n  .apartment-table .cell-unit { grid-column: 1 / -1; grid-row: 1; }\n  .unit-summary { gap: 12px; }\n  .unit-media { gap: 12px; }\n  .unit-media .preview-visual { height: 90px; }\n  .unit-id, .unit-type { font-size: 26px; }\n  .apartment-table .cell-building { grid-column: 1 / 3; grid-row: 2; }\n  .apartment-table .cell-floor { grid-column: 3 / 6; grid-row: 2; }\n  .apartment-table .cell-rooms { grid-column: 6 / 9; grid-row: 2; }\n  .apartment-table .cell-interior { grid-column: 9 / -1; grid-row: 2; }\n  .apartment-table .cell-balcony { grid-column: 1 / 4; grid-row: 3; align-self: center; justify-self: stretch; width: auto; font-size: 14px; }\n  .apartment-table .cell-garden { grid-column: 4 / 6; grid-row: 3; align-self: center; justify-self: stretch; width: auto; }\n  .apartment-table .cell-price { grid-column: 6 / 10; grid-row: 3; }\n  .apartment-table .cell-status { grid-column: 10 / -1; grid-row: 3; align-self: center; }\n  .apartment-table .cell-status::before { display: block; }\n  .apartment-table .cell-status .status-pill { white-space: normal; line-height: 1.4; }\n  .apartment-table .cell-floor-layout { grid-column: 1 / 5; grid-row: 4; align-items: flex-start; }\n  .cell-floor-layout .media-preview { margin-inline: 0; }\n  .apartment-table .cell-actions { grid-column: 5 / -1; grid-row: 4; justify-content: center; min-height: 90px; padding-top: 0; }\n}\n@container apartment-list (max-width: 600px) {\n  .filter-header { padding: 14px 17px; }\n  .mobile-filter-button { display: flex; align-items: center; width: 100%; min-height: 28px; padding: 0; gap: 10px; border: 0; font-size: 12px; text-align: left; }\n  .mobile-filter-button > svg { color: var(--accent); }\n  .filter-toggle-icon { margin-left: auto; font-size: 20px; font-weight: 300; color: var(--muted); }\n  .mobile-filter-button[aria-expanded=\"true\"] .filter-toggle-icon { transform: rotate(45deg); }\n  .filters { display: none; margin-top: 22px; }\n  .filters[data-open=\"true\"] { display: block; }\n  .primary-filters { gap: 16px 24px; }\n  .field > label, .range-field legend { font-size: 9px; letter-spacing: 1px; }\n  .field select { font-size: 14px; }\n  .range-filters { grid-template-columns: 1fr; gap: 8px; margin-top: 20px; }\n  .range-field output { font-size: 12px; }\n  .checkbox-filters { gap: 18px; min-height: 30px; padding-top: 3px; flex-wrap: wrap; }\n  .checkbox-label { font-size: 10px; gap: 8px; }\n  .result-toolbar { flex-wrap: wrap; gap: 15px; padding: 23px 0 20px; }\n  .result-count { font-size: 11px; }\n  .result-count strong { font-size: 26px; }\n  .result-total { font-size: 10px; }\n  .reset-button { margin-left: auto; gap: 8px; font-size: 9px; }\n  .sort-field { flex-basis: 100%; justify-content: flex-start; margin-left: 0; gap: 15px; }\n  .sort-field > label { font-size: 8px; }\n  .sort-field select { font-size: 10px; min-width: 164px; }\n  .favorites-hint { margin-top: -4px; margin-bottom: 17px; font-size: 9px; }\n  .data-note { margin-top: 19px; font-size: 9px; }\n  .filter-chips:not(:empty) { padding-bottom: 18px; }\n  .filter-chip { font-size: 9px; }\n  .empty-state { padding: 44px 10px; }\n  .empty-state h2 { font-size: 25px; }\n  .empty-state p { font-size: 11px; }\n}\n@container apartment-list (max-width: 380px) {\n  .unit-summary { gap: 10px; }\n  .unit-media { gap: 8px; }\n  .unit-id, .unit-type { font-size: 25px; }\n  .unit-media .preview-visual { height: 86px; }\n  .media-preview { width: 94px; }\n  .preview-visual { height: 86px; }\n  .gallery-preview { width: 100%; }\n  .gallery-preview .preview-visual { height: 180px; }\n}\n@container (max-width: 640px) { .page-width { padding-inline: min(var(--component-padding, 32px), 20px); } }\n@media (max-width: 760px) {\n  .page-width { padding-inline: min(var(--component-padding, 32px), 20px); }\n  .apartment-dialog, .compare-dialog { width: calc(100% - 24px); max-height: calc(100% - 24px); }\n  .dialog-inner { padding: 26px 23px; }\n  .dialog-head { padding-bottom: 23px; margin-bottom: 24px; }\n  .dialog-head h2 { font-size: 34px; }\n  .eyebrow { font-size: 8px; letter-spacing: 1.1px; }\n  .source-note { font-size: 10px; }\n  .compare-tray { width: calc(100% - 24px); bottom: 12px; padding: 16px; gap: 16px; flex-wrap: wrap; }\n  .compare-tray > div:first-child { flex: 1; gap: 10px 16px; }\n  .tray-label { flex-basis: 100%; font-size: 8px; }\n  .compare-tray strong { font-size: 17px; }\n  .compare-tray > div:last-child { width: 100%; justify-content: space-between; gap: 15px; }\n  .compare-tray .button-primary { flex: 1; min-height: 39px; padding-block: 10px; font-size: 10px; }\n  .compare-tray .button-secondary { min-height: 39px; padding: 10px 0; font-size: 10px; }\n  .compare-table { font-size: 10px; }\n  .compare-table th, .compare-table td { padding: 13px 7px; overflow-wrap: anywhere; }\n  .compare-table th { width: 27%; font-size: 9px; }\n  .compare-table thead th { font-size: 19px; }\n  .compare-table .details-button { gap: 7px; font-size: 9px; }\n  .compare-dialog .dialog-head h2 { font-size: 29px; line-height: 1.2; }\n  .toast { font-size: 10px; padding: 12px 17px; }\n  .media-header { grid-template-columns: 1fr auto; gap: 12px 20px; padding: 18px 20px 0; }\n  .media-header .dialog-close { grid-column: 2; grid-row: 1; align-self: start; }\n  .media-heading h2 { font-size: 25px; }\n  .media-tabs { grid-column: 1 / -1; gap: 25px; }\n  .media-tabs button { min-height: 39px; font-size: 10px; }\n  .media-canvas { inset: 15px; }\n  .media-footer { gap: 15px; padding: 12px 18px; }\n  .media-footer > p { font-size: 9px; max-width: 180px; }\n  .media-zoom button { min-width: 33px; padding-inline: 8px; }\n  .media-zoom .zoom-level { min-width: 54px; }\n}\n@media (prefers-reduced-motion: reduce) {\n  *, *::before, *::after { animation: none !important; transition: none !important; scroll-behavior: auto !important; }\n}\n"
const ORBIT_APARTMENT_CARD_SHELL = "\n  <div class=\"list-container\">\n  <main class=\"page-width\" id=\"apartment-app\" aria-label=\"Lakáslista\">\n    <section class=\"filter-header\" aria-label=\"Lakásszűrők\">\n    <button class=\"mobile-filter-button\" id=\"mobile-filters\" type=\"button\" aria-expanded=\"false\" aria-controls=\"filters\"><svg width=\"17\" height=\"17\" viewBox=\"0 0 18 18\" fill=\"none\" aria-hidden=\"true\"><path d=\"M2 5h14M2 13h14M6 2v6M12 10v6\" stroke=\"currentColor\" stroke-width=\"1.2\"/></svg><span>Szűrés</span><span class=\"filter-toggle-icon\" aria-hidden=\"true\">+</span></button>\n    <form id=\"filters\" class=\"filters\" data-open=\"false\" aria-label=\"Lakások szűrése\">\n      <div class=\"primary-filters\">\n        <div class=\"field\"><label for=\"building\">Épület</label><div class=\"select-wrap\"><select id=\"building\"><option value=\"\">Összes épület</option></select></div></div>\n        <div class=\"field\"><label for=\"floor\">Emelet</label><div class=\"select-wrap\"><select id=\"floor\"><option value=\"\">Összes emelet</option></select></div></div>\n        <div class=\"field\"><label for=\"rooms\">Szobák</label><div class=\"select-wrap\"><select id=\"rooms\"><option value=\"\">Összes</option></select></div></div>\n        <div class=\"field\"><label for=\"status\">Elérhetőség</label><div class=\"select-wrap\"><select id=\"status\"><option value=\"\">Minden lakás</option><option value=\"available\">Elérhető</option><option value=\"under_negotiation\">Tárgyalás alatt</option><option value=\"sold\">Elkelt</option><option value=\"unknown\">Egyeztetés szükséges</option></select></div></div>\n      </div>\n      <div class=\"range-filters\">\n          <fieldset class=\"range-field\"><legend><span>Alapterület</span><output id=\"area-range-value\" for=\"minArea maxArea\">m²</output></legend><div class=\"range-slider\"><span class=\"slider-track\" aria-hidden=\"true\"><span class=\"slider-selection\"></span></span><label class=\"sr-only\" for=\"minArea\">Minimum alapterület négyzetméterben</label><input id=\"minArea\" type=\"range\" min=\"0\" max=\"1\" step=\"1\"><label class=\"sr-only\" for=\"maxArea\">Maximum alapterület négyzetméterben</label><input id=\"maxArea\" type=\"range\" min=\"0\" max=\"1\" step=\"1\"></div></fieldset>\n          <fieldset class=\"range-field\"><legend><span>Vételár</span><output id=\"price-range-value\" for=\"minPrice maxPrice\">M Ft</output></legend><div class=\"range-slider\"><span class=\"slider-track\" aria-hidden=\"true\"><span class=\"slider-selection\"></span></span><label class=\"sr-only\" for=\"minPrice\">Minimum vételár millió forintban</label><input id=\"minPrice\" type=\"range\" min=\"0\" max=\"1\" step=\"1\"><label class=\"sr-only\" for=\"maxPrice\">Maximum vételár millió forintban</label><input id=\"maxPrice\" type=\"range\" min=\"0\" max=\"1\" step=\"1\"></div></fieldset>\n          <div class=\"checkbox-filters\"><label class=\"checkbox-label\" for=\"terrace\"><input id=\"terrace\" type=\"checkbox\"><span>Erkély</span></label><label class=\"checkbox-label\" for=\"garden\"><input id=\"garden\" type=\"checkbox\"><span>Kert</span></label><label class=\"checkbox-label\" for=\"favoritesOnly\"><input id=\"favoritesOnly\" type=\"checkbox\"><span>Kedvencek</span></label></div>\n      </div>\n    </form>\n    </section>\n    <div class=\"result-toolbar\">\n      <p class=\"result-count\" id=\"result-count\" aria-live=\"polite\" aria-atomic=\"true\">Lakások betöltése…</p>\n      <button type=\"button\" id=\"reset\" class=\"reset-button\">Alaphelyzet <span aria-hidden=\"true\">↺</span></button>\n      <div class=\"sort-field\"><label for=\"sort\">Rendezés</label><div class=\"select-wrap\"><select id=\"sort\"><option value=\"id\">Lakásazonosító szerint</option><option value=\"price-asc\">Ár: növekvő</option><option value=\"price-desc\">Ár: csökkenő</option><option value=\"area-asc\">Alapterület: növekvő</option><option value=\"area-desc\">Alapterület: csökkenő</option><option value=\"floor\">Emelet szerint</option></select></div></div>\n    </div>\n    <p class=\"favorites-hint\"><svg viewBox=\"0 0 24 24\" width=\"13\" height=\"13\" aria-hidden=\"true\"><path d=\"M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\"/></svg><span>A szívvel a kedvencekhez mentheti a lakást.</span></p>\n    <div class=\"filter-chips\" id=\"filter-chips\" aria-label=\"Aktív szűrők\"></div>\n    <div id=\"results\" class=\"results\" aria-busy=\"true\"><div class=\"loading-state\"><span class=\"loading-dot\"></span>Lakások betöltése…</div></div>\n    <p class=\"data-note\" id=\"data-note\"></p>\n  </main>\n  </div>\n  <aside id=\"compare-tray\" class=\"compare-tray\" aria-label=\"Összehasonlításra kijelölt lakások\" hidden></aside>\n  <dialog id=\"detail-dialog\" class=\"apartment-dialog\" aria-label=\"Lakás részletei\"></dialog>\n  <dialog id=\"compare-dialog\" class=\"apartment-dialog compare-dialog\" aria-label=\"Lakások összehasonlítása\"></dialog>\n  <dialog id=\"media-dialog\" class=\"media-dialog\" aria-labelledby=\"media-title\"></dialog>\n  <div id=\"toast\" class=\"toast\" role=\"status\" aria-live=\"polite\"></div>\n"

/* ADMIRAL_FONT_LOADER_START */
function ensureOrbitApartmentCardFont(folder: any): any {
    if (typeof (window as any) === 'undefined' || !(window as any).FontFace || !(document as any).fonts || !folder)
        return Promise.resolve();
    const cache: any = (window as any)[Symbol.for('admiral-park:montserrat-fonts')] ||= new Map();
    if (cache.has(folder))
        return cache.get(folder);
    const sources: any = ([
        (['montserrat-latin-ext-variable.woff2', 'U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C4,U+2113,U+2C60-2C7F,U+A720-A7FF'] as any),
        (['montserrat-latin-variable.woff2', 'U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD'] as any),
    ] as any);
    const loaded: any = Promise.allSettled(sources.map(([file, unicodeRange]: any): any => {
        const face: any = new FontFace('Montserrat', 'url("' + new URL(file, folder).href + '")', ({ style: 'normal', weight: '100 900', display: 'swap', unicodeRange } as any));
        (document as any).fonts.add(face);
        return face.load();
    }));
    cache.set(folder, loaded);
    return loaded;
}
/* ADMIRAL_FONT_LOADER_END */
function mountOrbitApartmentCardRuntime(root: any = (document as any), config: any = ({} as any)): any {
    const $: any = (id: any): any => root.querySelector(`#${id}`);
    const lifecycle: any = new AbortController();
    const signal: any = lifecycle.signal;
    const events: any = ({ signal } as any);
    const esc: any = (value: any): any => String(value ?? '').replace(/[&<>"']/g, (c: any): any => (({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' } as any)[c]));
    const roomLabel: any = (value: any): any => String(value ?? '').replace(/terasz/giu, 'Erkély');
    const number: any = new Intl.NumberFormat('hu-HU', ({ maximumFractionDigits: 2 } as any));
    const priceNumber: any = new Intl.NumberFormat('hu-HU', ({ maximumFractionDigits: 2 } as any));
    const area: any = (value: any): any => Number.isFinite(value) ? `${number.format(value)} m²` : 'Nincs adat';
    const price: any = (value: any): any => Number.isFinite(value) ? `${priceNumber.format(value / 1000000)} M Ft` : 'Ár kérésre';
    const apartmentPrice: any = (a: any): any => a.price == null && a.status === 'sold' ? 'Nincs megadva' : price(a.price);
    const floorText: any = (a: any): any => a.floorLabel || (a.floor === 0 ? 'Földszint' : a.floor == null ? 'Nincs adat' : `${a.floor}. emelet`);
    const labels: any = ({ available: 'Elérhető', under_negotiation: 'Tárgyalás alatt', sold: 'Elkelt', unknown: 'Érdeklődjön' } as any);
    const statusText: any = (a: any): any => a.statusLabel || labels[a.status] || labels.unknown;
    const safeUrl: any = (value: any): any => { if (typeof value !== 'string' || !value.trim())
        return null; try {
        const u: any = new URL(value, location.href);
        return (['http:', 'https:'] as any).includes(u.protocol) ? u.href : null;
    }
    catch {
        return null;
    } };
    function assetUrl(value: any): any {
        if (typeof value !== 'string' || !value.trim())
            return null;
        const input: any = value.trim();
        try {
            if (/^[a-z][a-z\d+.-]*:/i.test(input)) {
                const direct: any = new URL(input);
                return (['http:', 'https:'] as any).includes(direct.protocol) ? direct.href : null;
            }
            let base: any = (document as any).baseURI, relative: any = input;
            if (typeof config.assetBaseUrl === 'string' && config.assetBaseUrl.trim()) {
                const custom: any = new URL(config.assetBaseUrl.trim(), (document as any).baseURI);
                if (!(['http:', 'https:'] as any).includes(custom.protocol))
                    return null;
                if (!custom.pathname.endsWith('/'))
                    custom.pathname += '/';
                base = custom.href;
                relative = relative.replace(/^\.?\/?assets\//, '');
            }
            else if (typeof config.dataUrl === 'string' && /^https?:\/\//i.test(config.dataUrl))
                base = new URL('.', config.dataUrl).href;
            const resolved: any = new URL(relative, base);
            return (['http:', 'https:'] as any).includes(resolved.protocol) ? resolved.href : null;
        }
        catch {
            return null;
        }
    }
    const montserratFolder: any = assetUrl('assets/fonts/montserrat/');
    ensureOrbitApartmentCardFont(montserratFolder).then((): any => { if (!signal.aborted)
        requestAnimationFrame(fitDetailRooms); });
    const embed: any = !!config.embed;
    const useUrl: any = !embed && !config.disableUrl;
    const filterIds: any = (['building', 'floor', 'rooms', 'status', 'minArea', 'maxArea', 'minPrice', 'maxPrice', 'terrace', 'garden', 'favoritesOnly'] as any);
    const checks: any = new Set((['terrace', 'garden', 'favoritesOnly'] as any));
    const numericFilters: any = new Set((['minArea', 'maxArea', 'minPrice', 'maxPrice'] as any));
    const rangeGroups: any = ([
        ({ min: 'minArea', max: 'maxArea', field: 'areaInterior', divisor: 1, unit: 'm²', output: 'area-range-value' } as any),
        ({ min: 'minPrice', max: 'maxPrice', field: 'price', divisor: 1000000, unit: 'M Ft', output: 'price-range-value' } as any),
    ] as any);
    const rangeBounds: any = new Map();
    const defaults: any = (Object as any).fromEntries(filterIds.map((k: any): any => ([k, checks.has(k) ? false : ''] as any)));
    let state: any = ({ ...defaults, sort: 'id' } as any);
    let apartments: any = ([] as any), data: any, selected: any = new Set(), favorites: any = new Set(), toastTimer: any, mediaView: any = null, mediaSequence: any = 0, rangeDrag: any = null;
    let requestedApartmentId: any = typeof config.apartment === 'string' ? config.apartment : null, cardOpen: any = false;
    const dialogFocus: any = new WeakMap(), dialogStack: any = ([] as any), downloadUrls: any = new Set();
    const modalRegistry: any = (window as any)[Symbol.for('admiral-park:open-dialogs')] ||= new Set();
    const modalScroll: any = (window as any)[Symbol.for('admiral-park:scroll-lock')] ||= ({ locked: false, value: '', priority: '', watched: new WeakSet() } as any);
    const dialogs: any = ([$('detail-dialog'), $('compare-dialog'), $('media-dialog')] as any).filter(Boolean);
    let detailResize: any = null, selectedPlanRoom: any = null, hoverPlanRoom: any = null, focusedPlanRoom: any = null;
    let storage: any = true;
    try {
        const stored: any = JSON.parse(localStorage.getItem('admiral-park:favorites:v1') || '[]');
        if (Array.isArray(stored))
            favorites = new Set(stored.filter((x: any): any => typeof x === 'string'));
    }
    catch {
        storage = false;
    }
    function toast(message: any): any {
        $('toast').textContent = message;
        $('toast').classList.add('visible');
        clearTimeout(toastTimer);
        toastTimer = setTimeout((): any => $('toast').classList.remove('visible'), 4200);
    }
    function readUrl(): any {
        if (!useUrl)
            return;
        const p: any = new URL(location.href).searchParams;
        for (const id of filterIds) {
            if (checks.has(id))
                state[id] = p.get(id) === '1';
            else if (numericFilters.has(id))
                state[id] = p.has(id) && /^\d+(?:\.\d+)?$/.test(p.get(id)) ? p.get(id) : '';
            else
                state[id] = p.get(id) || '';
        }
        if (([...$('sort').options] as any).some((o: any): any => o.value === p.get('sort')))
            state.sort = p.get('sort');
    }
    function writeUrl(): any {
        if (!useUrl)
            return;
        const u: any = new URL(location.href);
        u.searchParams.delete('search');
        for (const id of filterIds) {
            const v: any = state[id];
            if (v !== '' && v !== false)
                u.searchParams.set(id, checks.has(id) ? '1' : v);
            else
                u.searchParams.delete(id);
        }
        if (state.sort !== 'id')
            u.searchParams.set('sort', state.sort);
        else
            u.searchParams.delete('sort');
        try {
            history.replaceState(null, '', u);
        }
        catch { }
    }
    function syncControls(): any {
        for (const id of ([...filterIds, 'sort'] as any)) {
            if (numericFilters.has(id))
                continue;
            if (checks.has(id))
                $(id).checked = !!state[id];
            else {
                $(id).value = state[id];
                if ($(id).tagName === 'SELECT' && !$(id).value) {
                    state[id] = '';
                    $(id).value = '';
                }
            }
        }
        syncRanges();
    }
    function setupRanges(): any {
        for (const group of rangeGroups) {
            const values: any = apartments.map((a: any): any => a[group.field]).filter(hasNumber).map((value: any): any => value / group.divisor);
            const min: any = values.length ? Math.floor(Math.min(...values)) : 0;
            const max: any = values.length ? Math.max(min + 1, Math.ceil(Math.max(...values))) : 1;
            rangeBounds.set(group.min, ({ min, max } as any));
            for (const id of ([group.min, group.max] as any)) {
                $(id).min = String(min);
                $(id).max = String(max);
                $(id).disabled = !values.length;
            }
        }
    }
    function syncRanges(): any {
        for (const group of rangeGroups) {
            const bounds: any = rangeBounds.get(group.min);
            if (!bounds)
                continue;
            const clamp: any = (value: any): any => Math.max(bounds.min, Math.min(bounds.max, Math.round(Number(value))));
            let low: any = state[group.min] === '' ? bounds.min : clamp(state[group.min]);
            const high: any = state[group.max] === '' ? bounds.max : clamp(state[group.max]);
            low = Math.min(low, high);
            state[group.min] = low === bounds.min ? '' : String(low);
            state[group.max] = high === bounds.max ? '' : String(high);
            for (const [id, value] of ([([group.min, low] as any), ([group.max, high] as any)] as any)) {
                $(id).value = String(value);
                $(id).setAttribute('aria-valuetext', `${number.format(value)} ${group.unit}`);
            }
            $(group.output).textContent = `${number.format(low)} – ${number.format(high)} ${group.unit}`;
            const track: any = $(group.min).closest('.range-slider');
            track.dataset.minAtMax = String(low === bounds.max);
            $(group.min).setAttribute('aria-valuemax', String(high));
            $(group.max).setAttribute('aria-valuemin', String(low));
            track.style.setProperty('--range-start', `${(low - bounds.min) / (bounds.max - bounds.min) * 100}%`);
            track.style.setProperty('--range-end', `${(high - bounds.min) / (bounds.max - bounds.min) * 100}%`);
        }
    }
    function updateRange(id: any): any {
        const group: any = rangeGroups.find((group: any): any => group.min === id || group.max === id);
        if (!group || !rangeBounds.has(group.min))
            return;
        const value: any = Number($(id).value);
        state[id] = String(id === group.min ? Math.min(value, Number($(group.max).value)) : Math.max(value, Number($(group.min).value)));
        syncRanges();
    }
    function setupOptions(id: any, options: any): any {
        const select: any = $(id);
        select.replaceChildren(new Option('Összes', ''), ...options.map(([v, l]: any): any => new Option(l, v)));
    }
    const byId: any = (id: any): any => apartments.find((a: any): any => a.id === id);
    const hasNumber: any = (v: any): any => typeof v === 'number' && Number.isFinite(v);
    function matches(a: any): any {
        if (state.building && a.building !== state.building)
            return false;
        if (state.floor !== '' && a.floor !== Number(state.floor))
            return false;
        if (state.rooms && (state.rooms === '4+' ? !(a.rooms >= 4) : a.rooms !== Number(state.rooms)))
            return false;
        if (state.status && a.status !== state.status)
            return false;
        if (state.terrace && !(a.areaTerrace > 0))
            return false;
        if (state.garden && !(a.areaGarden > 0))
            return false;
        if (state.favoritesOnly && !favorites.has(a.id))
            return false;
        for (const [key, field, direction, mult] of ([(['minArea', 'areaInterior', 1, 1] as any), (['maxArea', 'areaInterior', -1, 1] as any), (['minPrice', 'price', 1, 1000000] as any), (['maxPrice', 'price', -1, 1000000] as any)] as any)) {
            if (state[key] !== '' && (!hasNumber(a[field]) || direction * a[field] < direction * Number(state[key]) * mult))
                return false;
        }
        return true;
    }
    function sorted(list: any): any {
        const [key, direction]: any = state.sort === 'floor' ? (['floor', 'asc'] as any) : state.sort.split('-');
        const field: any = ({ price: 'price', area: 'areaInterior', floor: 'floor' } as any)[key];
        return list.sort((a: any, b: any): any => {
            if (!field)
                return a.id.localeCompare(b.id, 'hu', ({ numeric: true } as any));
            const av: any = a[field], bv: any = b[field];
            if (av == null && bv != null)
                return 1;
            if (bv == null && av != null)
                return -1;
            return (av == null ? 0 : (av - bv) * (direction === 'desc' ? -1 : 1)) || a.id.localeCompare(b.id, 'hu', ({ numeric: true } as any));
        });
    }
    const svg: any = (name: any): any => name === 'heart' ? '<svg viewBox="0 0 24 24" width="19" height="19" aria-hidden="true"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>' : '<span aria-hidden="true">↗</span>';
    const downloadIcon: any = '<svg viewBox="0 0 20 20" width="15" height="15" fill="none" aria-hidden="true"><path d="M10 2v10m-4-4 4 4 4-4M3 13v4h14v-4" stroke="currentColor" stroke-width="1.2"/></svg>';
    function mediaEntries(a: any): any {
        return ([(['floorplan', 'Alaprajz'] as any), (['floorLayout', 'Szintrajz'] as any)] as any).flatMap(([key, name]: any): any => {
            const source: any = a.media?.[key] || (key === 'floorplan' && a.floorplan ? ({ full: a.floorplan } as any) : null);
            const full: any = assetUrl(source?.full);
            if (!full)
                return ([] as any);
            let label: any = typeof source.label === 'string' && source.label.trim() ? source.label.trim() : name;
            if (key === 'floorplan' && a.apartmentType)
                label = `${a.apartmentType} típus`;
            return ([({ key, name, label, full, thumbnail: assetUrl(source.thumbnail), isIllustrative: !!source.isIllustrative } as any)] as any);
        });
    }
    function previewButton(a: any, item: any, large: any = false): any {
        return `<button class="media-preview${large ? ' gallery-preview' : ''}" data-media="${esc(a.id)}" data-media-kind="${item.key}" title="${esc(item.label)}" aria-label="${esc(a.id)} – ${esc(item.name)} megnyitása: ${esc(item.label)}"><span class="preview-visual">${item.thumbnail ? `<img src="${esc(item.thumbnail)}" alt="" loading="lazy" decoding="async" data-thumbnail><span class="preview-unavailable" hidden>Megnyitás</span>` : '<span class="preview-unavailable">Megnyitás</span>'}</span></button>`;
    }
    function datasheet(a: any): any {
        const source: any = a.media?.datasheet, url: any = assetUrl(source?.url);
        if (!url)
            return null;
        return ({ url, label: typeof source.label === 'string' && source.label.trim() ? source.label : 'Adatlap', filename: (typeof source.filename === 'string' && source.filename.trim() ? source.filename : `Admiral-Park-${a.id}-adatlap.pdf`).replace(/[\\/:*?"<>|]/g, '-') } as any);
    }
    function downloadLink(a: any, large: any = false): any {
        const file: any = datasheet(a);
        if (!file)
            return '';
        return `<span class="download-wrap"><a class="datasheet-link action-pill${large ? ' datasheet-large footer-pill' : ''}" href="${esc(file.url)}" download="${esc(file.filename)}" target="_blank" rel="noopener" data-download="${esc(a.id)}" aria-label="${esc(a.id)} – ${esc(file.label)} letöltése PDF formátumban" title="${esc(file.label)}">${downloadIcon}<span>Adatlap</span></a></span>`;
    }
    function saveButton(a: any, explain: any = false): any { const saved: any = favorites.has(a.id); return `<button type="button" class="save-button ${saved ? 'is-saved' : ''}${explain ? ' save-with-label' : ''}" data-save="${esc(a.id)}" aria-label="${esc(a.id)} ${saved ? 'eltávolítása a kedvencekből' : 'mentése a kedvencekhez'}" aria-pressed="${saved}">${svg('heart')}${explain ? `<span class="detail-save-label">${saved ? 'Kedvencekhez mentve' : 'Mentés a kedvencekhez'}</span>` : ''}</button>`; }
    function compareToggle(a: any): any { return `<button type="button" class="compare-toggle action-pill" data-compare="${esc(a.id)}" aria-label="${esc(a.id)} összehasonlítása" aria-pressed="${selected.has(a.id)}"><svg viewBox="0 0 20 20" width="14" height="14" fill="none" aria-hidden="true"><path d="m4 10 4 4 8-8" stroke="currentColor" stroke-width="1.2"/></svg><span>Összevetés</span></button>`; }
    function row(a: any): any {
        const media: any = mediaEntries(a);
        const floorplan: any = media.find((item: any): any => item.key === 'floorplan'), floorLayout: any = media.find((item: any): any => item.key === 'floorLayout');
        return `<tr class="apartment-row" data-unit="${esc(a.id)}">
    <td class="cell-unit" data-label="Lakás"><div class="unit-summary"><div class="unit-identification"><button type="button" class="unit-id unit-open" data-detail="${esc(a.id)}" aria-label="${esc(a.id)} lakás részleteinek megnyitása" aria-haspopup="dialog">${esc(a.id)}</button></div>${floorplan ? `<div class="unit-media">${previewButton(a, floorplan)}</div>` : ''}<span class="unit-type" aria-label="${esc(a.apartmentType || '')} lakástípus">${esc(a.apartmentType || '')}</span></div></td>
    <td class="cell-building" data-label="Épület">${esc(a.building)}</td>
    <td class="cell-floor" data-label="Emelet">${esc(floorText(a))}</td>
    <td class="cell-rooms" data-label="Szobák">${a.rooms == null ? `<span title="${esc(a.layoutLabel || 'Nincs adat')}">${esc(a.layoutLabel || 'Nincs adat')}</span>` : number.format(a.rooms)}</td>
    <td class="cell-area cell-interior" data-label="Nettó alapterület">${area(a.areaInterior)}</td>
    <td class="cell-area cell-balcony" data-label="Erkély">${area(a.areaTerrace)}</td>
    <td class="cell-area cell-garden" data-label="Kert"><span class="garden-value">${hasNumber(a.areaGarden) && a.areaGarden > 0 ? area(a.areaGarden) : ''}</span></td>
    <td class="cell-price" data-label="Bruttó ár">${apartmentPrice(a)}</td>
    <td class="cell-status" data-label="Státusz"><span class="status-pill status-${esc(a.status)}">${esc(statusText(a))}</span></td>
    <td class="cell-floor-layout" data-label="Szintrajz">${floorLayout ? previewButton(a, floorLayout) : ''}</td>
    <td class="cell-actions"><div class="row-actions">${saveButton(a)}<div class="action-pills">${downloadLink(a)}${compareToggle(a)}</div></div></td>
  </tr>`;
    }
    function renderChips(): any {
        const titles: any = ({ building: 'Épület', floor: 'Emelet', rooms: 'Szobák', status: 'Státusz', minArea: 'Terület ettől', maxArea: 'Terület eddig', minPrice: 'Ár ettől', maxPrice: 'Ár eddig', terrace: 'Erkély', garden: 'Kert', favoritesOnly: 'Kedvencek' } as any);
        $('filter-chips').innerHTML = filterIds.filter((id: any): any => state[id] !== '' && state[id] !== false).map((id: any): any => {
            let value: any = state[id];
            if ($(id).tagName === 'SELECT')
                value = $(id).selectedOptions[0]?.textContent || value;
            else if (id.includes('Area'))
                value = `${number.format(Number(value))} m²`;
            else if (id.includes('Price'))
                value = `${number.format(Number(value))} M Ft`;
            return `<button class="filter-chip" data-remove-filter="${id}" aria-label="${esc(titles[id])} szűrő törlése">${esc(titles[id])}${checks.has(id) ? '' : `: ${esc(value)}`} <span aria-hidden="true">×</span></button>`;
        }).join('');
    }
    function renderTray(): any {
        const chosen: any = ([...selected] as any).map(byId).filter(Boolean);
        $('compare-tray').hidden = chosen.length === 0;
        $('compare-tray').innerHTML = `<div><span class="tray-label">ÖSSZEHASONLÍTÁS</span><strong>${chosen.map((a: any): any => esc(a.id)).join(' · ')}</strong><span class="tray-hint">${chosen.length} / 3 lakás</span></div><div><button class="button-secondary" data-clear-compare> Törlés </button><button class="button-primary" data-open-compare ${chosen.length < 2 ? 'disabled' : ''}>Összehasonlítom ${svg('arrow')}</button></div>`;
        resizeEmbed();
    }
    function render(): any {
        if (config.detailOnly) {
            $('results').replaceChildren();
            return;
        }
        const list: any = sorted(apartments.filter(matches));
        const invalidArea: any = state.minArea !== '' && state.maxArea !== '' && Number(state.minArea) > Number(state.maxArea);
        const invalidPrice: any = state.minPrice !== '' && state.maxPrice !== '' && Number(state.minPrice) > Number(state.maxPrice);
        $('result-count').innerHTML = `<strong>${list.length}</strong> lakás${list.length === apartments.length ? '' : ` <span class="result-total">/ ${apartments.length}</span>`}`;
        $('results').innerHTML = list.length ? `<table class="apartment-table"><caption class="sr-only">Lakások. A nettó belső terület, az erkély és a kert külön szerepel, az árak bruttó forintárak.</caption><thead><tr><th scope="col">Lakás / típus</th><th scope="col">Épület</th><th scope="col"><button data-sort="floor">Emelet ${state.sort === 'floor' ? '↑' : '↕'}</button></th><th scope="col" class="heading-rooms">Szobák</th><th scope="col"><button data-sort="area">Nettó alapterület ${state.sort.startsWith('area') ? (state.sort.endsWith('desc') ? '↓' : '↑') : '↕'}</button></th><th scope="col">Erkély</th><th scope="col">Kert</th><th scope="col"><button data-sort="price">Bruttó ár ${state.sort.startsWith('price') ? (state.sort.endsWith('desc') ? '↓' : '↑') : '↕'}</button></th><th scope="col">Státusz</th><th scope="col">Szintrajz</th><th scope="col"><span class="sr-only">Műveletek</span></th></tr></thead><tbody>${list.map(row).join('')}</tbody></table>` : `<div class="empty-state"><span class="empty-mark" aria-hidden="true">⌕</span><h2>${invalidArea || invalidPrice ? 'Ellenőrizze a megadott tartományt.' : 'Most nincs ilyen lakás.'}</h2><p>${invalidArea || invalidPrice ? 'A kezdőérték legyen kisebb vagy egyenlő a záróértékkel.' : 'Módosítsa a szűrőket, vagy nézze meg a teljes kínálatot.'}</p><button class="button-primary" data-reset>Szűrők törlése</button></div>`;
        $('minArea').setAttribute('aria-invalid', String(invalidArea));
        $('maxArea').setAttribute('aria-invalid', String(invalidArea));
        $('minPrice').setAttribute('aria-invalid', String(invalidPrice));
        $('maxPrice').setAttribute('aria-invalid', String(invalidPrice));
        renderChips();
        renderTray();
        writeUrl();
        resizeEmbed();
        $('results').setAttribute('aria-busy', 'false');
    }
    function reset(): any { state = ({ ...defaults, sort: 'id' } as any); syncControls(); render(); }
    function syncModalState(): any {
        const nextCardOpen: any = dialogs.some((dialog: any): any => dialog.open);
        if (nextCardOpen !== cardOpen) {
            cardOpen = nextCardOpen;
            config.onOpenChange?.(cardOpen);
        }
        for (const dialog of modalRegistry)
            if (!dialog.open || !dialog.isConnected)
                modalRegistry.delete(dialog);
        const documentDialogs: any = ([...(document as any).querySelectorAll('dialog[open]')] as any), locked: any = modalRegistry.size > 0 || documentDialogs.length > 0;
        (document as any).body.classList.toggle('dialog-open', locked);
        if (locked && !modalScroll.locked) {
            modalScroll.value = (document as any).body.style.getPropertyValue('overflow');
            modalScroll.priority = (document as any).body.style.getPropertyPriority('overflow');
            modalScroll.locked = true;
            (document as any).body.style.setProperty('overflow', 'hidden', modalScroll.priority);
        }
        else if (!locked && modalScroll.locked) {
            if (modalScroll.value)
                (document as any).body.style.setProperty('overflow', modalScroll.value, modalScroll.priority);
            else
                (document as any).body.style.removeProperty('overflow');
            modalScroll.locked = false;
        }
        for (const dialog of documentDialogs)
            if (!modalRegistry.has(dialog) && !modalScroll.watched.has(dialog)) {
                modalScroll.watched.add(dialog);
                dialog.addEventListener('close', (): any => { modalScroll.watched.delete(dialog); syncModalState(); }, ({ once: true } as any));
            }
    }
    function openDialog(dialog: any): any {
        if (!dialog.open) {
            dialogFocus.set(dialog, root.activeElement || (document as any).activeElement);
            dialog.showModal();
            dialogStack.push(dialog);
            modalRegistry.add(dialog);
        }
        syncModalState();
        dialog.querySelector('[data-close]')?.focus();
    }
    function finishDialogClose(dialog: any): any {
        if (dialog.open || (!modalRegistry.has(dialog) && !dialogStack.includes(dialog)))
            return;
        modalRegistry.delete(dialog);
        const position: any = dialogStack.indexOf(dialog);
        if (position !== -1)
            dialogStack.splice(position, 1);
        syncModalState();
        if (dialog.id === 'detail-dialog' && useUrl) {
            const u: any = new URL(location.href);
            u.searchParams.delete('apartment');
            history.replaceState(null, '', u);
        }
        if (dialog.id === 'media-dialog') {
            mediaView = null;
            dialog.replaceChildren();
        }
        const top: any = dialogStack.findLast((item: any): any => item.open), previous: any = dialogFocus.get(dialog);
        const fallback: any = dialog.id === 'detail-dialog' ? root.querySelector(`[data-detail="${CSS.escape(dialog.dataset.apartment || '')}"]`) : null;
        const focus: any = previous?.isConnected && (!top || top.contains(previous)) ? previous : top?.querySelector('[data-close]') || fallback;
        focus?.focus(({ preventScroll: true } as any));
    }
    function closeDialog(dialog: any): any { if (dialog?.open) {
        dialog.close();
        finishDialogClose(dialog);
    } }
    function fact(title: any, value: any): any { return `<div class="fact"><dt>${esc(title)}</dt><dd>${value}</dd></div>`; }
    function inquiry(a: any): any {
        const inquiryUrl: any = safeUrl(config.inquiryUrl);
        if (inquiryUrl) {
            const u: any = new URL(inquiryUrl);
            u.searchParams.set('apartment', a.id);
            return `<a class="inquiry-button" href="${esc(u.href)}" target="_blank" rel="noopener"><span>Érdeklődöm</span></a>`;
        }
        return `<button type="button" class="inquiry-button" data-inquiry-placeholder aria-expanded="false" aria-controls="inquiry-pending"><span>Érdeklődöm</span></button><div class="inquiry-pending" id="inquiry-pending" role="status" hidden><p>A kapcsolatfelvétel hamarosan elérhető.</p><button type="button" class="inquiry-copy" data-copy-inquiry="${esc(a.id)}">Lakásadatok másolása</button></div>`;
    }
    function positionInquiryNotice(): any {
        const dialog: any = $('detail-dialog'), note: any = dialog?.querySelector('.inquiry-pending');
        if (!dialog?.open || !note || note.hidden)
            return;
        note.style.bottom = 'auto';
        note.style.top = '0px';
        const bounds: any = dialog.querySelector('.detail-layout').getBoundingClientRect(), anchor: any = dialog.querySelector('.detail-inquiry').getBoundingClientRect(), height: any = note.getBoundingClientRect().height;
        const preferred: any = anchor.top - height - 8 < bounds.top + 6 ? anchor.bottom + 8 : anchor.top - height - 8;
        note.style.top = `${Math.max(bounds.top + 6, Math.min(preferred, bounds.bottom - height - 6)) - anchor.top}px`;
    }
    function detailMetric(label: any, value: any): any {
        return `<div><dt>${esc(label)}</dt><dd>${hasNumber(value) ? number.format(value) : '—'}${hasNumber(value) ? '<small>m2</small>' : ''}</dd></div>`;
    }
    function validPlanMarkers(layout: any): any {
        return Array.isArray(layout?.markers) ? layout.markers.filter((marker: any): any => Number.isSafeInteger(marker.number) && marker.number > 0 && hasNumber(marker.x) && marker.x >= 0 && marker.x <= 1 && hasNumber(marker.y) && marker.y >= 0 && marker.y <= 1 && typeof marker.name === 'string') : ([] as any);
    }
    function detailPlan(a: any): any {
        const layout: any = data.roomLayouts?.[a.apartmentType], source: any = a.media?.floorplan;
        const url: any = assetUrl(source?.original || (layout ? `assets/floorplans/types/${encodeURIComponent(a.apartmentType)}/original.png` : source?.full || a.floorplan));
        if (!url)
            return '<div class="empty-plan"><h3>Alaprajz</h3><p>Az alaprajz még nem érhető el.</p></div>';
        const view: any = layout?.viewBox || ({ x: 0, y: 0, width: 1, height: 1 } as any);
        const dimensions: any = layout?.imageDimensions || ({ width: 1500, height: 2000 } as any);
        const imageWidth: any = dimensions.width || dimensions[0] || 1500, imageHeight: any = dimensions.height || dimensions[1] || 2000;
        const surface: any = `left:${-view.x / view.width * 100}%;top:${-view.y / view.height * 100}%;width:${100 / view.width}%;height:${100 / view.height}%`;
        const markers: any = validPlanMarkers(layout);
        return `<section class="detail-plan" data-document-panel="plan" id="detail-document-plan" role="tabpanel" aria-labelledby="detail-document-plan-tab"><div class="detail-plan-stage"><div class="detail-plan-canvas" style="--plan-aspect:${imageWidth * view.width / (imageHeight * view.height)};aspect-ratio:${imageWidth * view.width}/${imageHeight * view.height}"><div class="detail-plan-surface" style="${surface}"><img class="detail-plan-image" src="${esc(url)}" alt="${esc(a.apartmentType || a.id)} típus számozott alaprajza" decoding="async"><div class="detail-plan-markers" aria-label="A típusterv helyiségei">${markers.map((marker: any): any => `<button type="button" class="room-marker" data-plan-room="${marker.number}" style="left:${marker.x * 100}%;top:${marker.y * 100}%" aria-label="${marker.number}. ${esc(roomLabel(marker.name))}" aria-pressed="false">${marker.number}</button>`).join('')}</div></div></div></div></section>`;
    }
    function detailRooms(a: any): any {
        const rooms: any = Array.isArray(a.roomList) ? a.roomList : ([] as any), markers: any = validPlanMarkers(data.roomLayouts?.[a.apartmentType]);
        const mapped: any = markers.length && rooms.length === markers.length && markers.every((marker: any): any => rooms.some((room: any): any => room.planNumber === marker.number));
        const layoutSummary: any = typeof a.layoutLabel === 'string' && a.layoutLabel.trim() ? a.layoutLabel.trim().replace(/hálószoba/giu, 'szoba') : hasNumber(a.rooms) ? `${number.format(a.rooms)} szoba` : '';
        const roomHeading: any = `Helyiségek.${layoutSummary ? ` <span class="detail-layout-label">${esc(layoutSummary)}</span>` : ''}`;
        const ownRooms: any = `<ul class="unit-room-list">${rooms.map((room: any): any => `<li><span>${esc(roomLabel(room.name))}</span><strong>${area(room.area)}</strong></li>`).join('') || '<li>A helyiséglista még nem érhető el.</li>'}</ul>`;
        return `<section class="detail-room-panel" data-detail-panel="rooms" id="detail-panel-rooms" role="tabpanel" aria-labelledby="detail-tab-rooms" data-room-view="type"><div class="detail-room-tabs" role="tablist" aria-label="Helyiségjegyzék"><button type="button" id="detail-room-type-tab" data-room-view="type" role="tab" aria-selected="true" aria-controls="detail-room-type">Típusterv</button>${!mapped ? '<button type="button" id="detail-room-unit-tab" data-room-view="unit" role="tab" aria-selected="false" tabindex="-1" aria-controls="detail-room-unit">Lakásterületek</button>' : ''}</div><div class="detail-rooms" data-room-panel="type" id="detail-room-type" role="tabpanel" aria-labelledby="detail-room-type-tab"><h3>${roomHeading}</h3><div class="room-page">${markers.length ? `<ol class="type-room-list">${markers.map((marker: any): any => { const room: any = mapped ? rooms.find((room: any): any => room.planNumber === marker.number) : null; return `<li><button type="button" class="room-legend-button" data-plan-room="${marker.number}" aria-pressed="false"><span class="room-number">${String(marker.number).padStart(2, '0')}</span><span class="room-name">${esc(roomLabel(marker.name))}</span>${room ? `<span class="room-area">${area(room.area)}</span>` : ''}</button></li>`; }).join('')}</ol>` : ownRooms}</div></div>${!mapped ? `<div class="unit-room-section" data-room-panel="unit" id="detail-room-unit" role="tabpanel" aria-labelledby="detail-room-unit-tab" hidden><h3>${roomHeading}</h3><div class="room-page">${ownRooms}</div></div>` : ''}</section>`;
    }
    function detail(id: any): any {
        const a: any = byId(id);
        if (!a)
            return;
        selectedPlanRoom = null;
        hoverPlanRoom = null;
        focusedPlanRoom = null;
        if (useUrl) {
            const u: any = new URL(location.href);
            u.searchParams.set('apartment', id);
            history.replaceState(null, '', u);
        }
        const floor: any = mediaEntries(a).find((item: any): any => item.key === 'floorLayout');
        const floorCaption: any = String(floorText(a)), floorMatch: any = /^(.*?)\s*emelet$/iu.exec(floorCaption);
        const floorMeta: any = floorMatch && floorMatch[1].trim() ? `<strong>${esc(floorMatch[1].trim())}</strong> emelet` : `<strong>${esc(floorCaption)}</strong>`;
        const monogram: any = assetUrl('assets/brand/ap-monogram.png'), logo: any = assetUrl('assets/brand/admiral-park-full-logo-no-location.svg');
        const dialog: any = $('detail-dialog');
        dialog.dataset.apartment = id;
        detailResize?.disconnect();
        dialog.innerHTML = `<div class="detail-shell" data-panel="plan"><div class="detail-brand-motif" aria-hidden="true"></div>
    <header class="detail-topbar"><div class="detail-top-actions"><button type="button" class="dialog-close" data-close aria-label="Bezárás">×</button></div></header>
    <div class="detail-layout">
      <aside class="detail-sidebar" aria-label="A lakás adatai">
        <div class="detail-core">
          <div class="detail-identity"><div class="detail-brand-group"><span class="detail-logo" role="img" aria-label="Admiral Park"></span></div></div>
          <div class="detail-area-row"><h2 class="detail-apartment-number">${esc(a.id)}</h2><dl class="detail-metrics${a.areaGarden > 0 ? ' has-garden' : ''}">${detailMetric('Beltér', a.areaInterior)}${detailMetric('Erkély', a.areaTerrace)}${hasNumber(a.areaGarden) && a.areaGarden > 0 ? detailMetric('Kert', a.areaGarden) : ''}</dl></div>
        </div>
        <hr class="detail-divider">
        ${detailRooms(a)}
        <div class="detail-conversion"><div class="detail-price"><span>Bruttó vételár</span><p>${hasNumber(a.price) ? `<span class="price-value">${priceNumber.format(a.price / 1000000)}</span> <small class="price-unit">M Ft</small>` : `<span class="price-unavailable">${esc(apartmentPrice(a))}</span>`}</p></div><div class="detail-inquiry">${inquiry(a)}</div><div class="detail-downloads detail-footer">${downloadLink(a, true)}<div class="detail-status"><span class="status-pill status-${esc(a.status)}">${esc(statusText(a))}</span></div>${shareControl(a)}</div></div>
      </aside>
      <nav class="detail-panel-nav" role="tablist" aria-label="Rajz és helyiségjegyzék">${([(['plan', 'Rajzok'] as any), (['rooms', 'Helyiségek'] as any)] as any).map(([key, label]: any): any => `<button type="button" role="tab" id="detail-tab-${key}" data-detail-tab="${key}" aria-controls="detail-panel-${key}" aria-selected="${key === 'plan'}" tabindex="${key === 'plan' ? 0 : -1}">${label}</button>`).join('')}</nav>
      <section class="detail-drawing" data-detail-panel="plan" id="detail-panel-plan" role="tabpanel" aria-labelledby="detail-tab-plan"><div class="detail-drawing-toolbar"><div class="detail-document-tabs" role="tablist" aria-label="Rajz kiválasztása"><button type="button" id="detail-document-plan-tab" role="tab" data-document-view="plan" aria-selected="true" aria-controls="detail-document-plan">Alaprajz</button>${floor ? '<button type="button" id="detail-document-floor-tab" role="tab" data-document-view="floor" aria-selected="false" tabindex="-1" aria-controls="detail-document-floor">Szintrajz</button>' : ''}</div><div class="detail-drawing-save">${saveButton(a, true)}</div><p class="detail-unit-meta"><strong>${esc(a.apartmentType || '')}</strong> típus <span>·</span> <strong>${esc(a.building)}</strong> épület <span>·</span> ${floorMeta} <span>·</span> <strong>${esc(a.orientation || 'Nincs adat')}</strong> tájolás</p></div>${detailPlan(a)}${floor ? `<section class="detail-floor-plan" data-document-panel="floor" id="detail-document-floor" role="tabpanel" aria-labelledby="detail-document-floor-tab" hidden><p class="detail-section-label">${esc(floorText(a))} · A, B, C épület</p><img class="detail-floor-image" src="${esc(floor.full)}" alt="${esc(floorText(a))} szintrajza" decoding="async"><p class="detail-plan-note">${esc(a.id)} · ${esc(a.building)} épület</p></section>` : ''}</section>
    </div><p class="detail-illustration-note">Az alaprajz illusztráció. Bútorozatlan átadás.</p></div>`;
        const shell: any = dialog.querySelector('.detail-shell');
        if (monogram)
            shell.style.setProperty('--detail-monogram-image', `url("${monogram.replace(/"/g, '%22')}")`);
        if (logo)
            shell.style.setProperty('--detail-logo-image', `url("${logo.replace(/"/g, '%22')}")`);
        openDialog(dialog);
        dialog.scrollTop = 0;
        detailResize = new ResizeObserver((): any => requestAnimationFrame(fitDetailRooms));
        detailResize.observe(dialog.querySelector('.detail-room-panel'));
        requestAnimationFrame(fitDetailRooms);
    }
    function selectDetailPanel(value: any, focus: any = false): any {
        const dialog: any = $('detail-dialog'), shell: any = dialog.querySelector('.detail-shell');
        if (!shell)
            return;
        shell.dataset.panel = value;
        dialog.querySelectorAll('[data-detail-tab]').forEach((button: any): any => { const active: any = button.dataset.detailTab === value; button.setAttribute('aria-selected', String(active)); button.tabIndex = active ? 0 : -1; });
        if (focus && getComputedStyle(dialog.querySelector('.detail-panel-nav')).display !== 'none')
            dialog.querySelector(`[data-detail-tab="${value}"]`)?.focus(({ preventScroll: true } as any));
        requestAnimationFrame(fitDetailRooms);
    }
    function selectDetailDocument(value: any): any {
        const dialog: any = $('detail-dialog');
        dialog.querySelectorAll('[data-document-view]').forEach((button: any): any => { const active: any = button.dataset.documentView === value; button.setAttribute('aria-selected', String(active)); button.tabIndex = active ? 0 : -1; });
        dialog.querySelectorAll('[data-document-panel]').forEach((panel: any): any => { panel.hidden = panel.dataset.documentPanel !== value; });
    }
    function selectDetailRoomView(value: any): any {
        const dialog: any = $('detail-dialog'), panel: any = dialog.querySelector('.detail-room-panel');
        if (!panel)
            return;
        panel.dataset.roomView = value;
        panel.querySelectorAll('button[data-room-view]').forEach((button: any): any => { const active: any = button.dataset.roomView === value; button.setAttribute('aria-selected', String(active)); button.tabIndex = active ? 0 : -1; });
        panel.querySelectorAll('[data-room-panel]').forEach((item: any): any => { item.hidden = item.dataset.roomPanel !== value; });
        fitDetailRooms();
    }
    function fitDetailRooms(): any {
        const dialog: any = $('detail-dialog');
        if (signal.aborted || !dialog.open)
            return;
        const panel: any = dialog.querySelector('.detail-room-panel'), view: any = panel?.dataset.roomView;
        panel?.style.setProperty('--room-slack', '0px');
        const frame: any = panel?.querySelector(`[data-room-panel="${view}"] .room-page`);
        if (!frame?.clientHeight)
            return;
        const list: any = frame.querySelector('ol,ul');
        if (!list)
            return;
        const maxColumns: any = Math.max(1, Math.min(4, Math.floor(frame.clientWidth / 125)));
        for (let columns: any = 1; columns <= maxColumns; columns++) {
            list.style.setProperty('--room-columns', String(columns));
            list.dataset.columns = String(columns);
            for (const padding of ([4, 2, 1, 0] as any)) {
                list.style.setProperty('--room-padding', `${padding}px`);
                list.style.setProperty('--room-circle', `${padding >= 2 ? 18 : 16}px`);
                // Use the actual fractional height; rounded clientHeight could clip the last row.
                if (list.getBoundingClientRect().height <= Math.floor(frame.getBoundingClientRect().height) - 1) {
                    panel.style.setProperty('--room-slack', `${Math.max(0, frame.getBoundingClientRect().height - list.getBoundingClientRect().height - 1)}px`);
                    return;
                }
            }
        }
    }
    function paintPlanRoom(value: any): any {
        const dialog: any = $('detail-dialog'), number: any = value == null ? null : String(value);
        dialog.querySelectorAll('[data-plan-room]').forEach((button: any): any => { button.classList.toggle('is-active', button.dataset.planRoom === number); button.setAttribute('aria-pressed', String(button.dataset.planRoom === selectedPlanRoom)); });
    }
    function selectPlanRoom(value: any, origin: any): any {
        selectedPlanRoom = String(value);
        selectDetailRoomView('type');
        paintPlanRoom(selectedPlanRoom);
        if (origin?.classList.contains('room-marker'))
            selectDetailPanel('rooms', true);
        else {
            selectDetailDocument('plan');
            selectDetailPanel('plan', true);
        }
    }
    function showCompare(): any {
        const chosen: any = ([...selected] as any).map(byId).filter(Boolean);
        if (chosen.length < 2)
            return;
        const fields: any = ([(['Státusz', (a: any): any => esc(statusText(a))] as any), (['Épület', (a: any): any => esc(a.building)] as any), (['Emelet', (a: any): any => esc(floorText(a))] as any), (['Szobák', (a: any): any => esc(a.rooms ?? a.layoutLabel ?? 'Nincs adat')] as any), (['Nettó belső alapterület', (a: any): any => area(a.areaInterior)] as any), (['Erkély', (a: any): any => area(a.areaTerrace)] as any), (['Kert', (a: any): any => hasNumber(a.areaGarden) && a.areaGarden > 0 ? area(a.areaGarden) : ''] as any), (['Tájolás', (a: any): any => esc(a.orientation || 'Nincs adat')] as any), (['Bruttó vételár', (a: any): any => price(a.price)] as any)] as any);
        $('compare-dialog').innerHTML = `<div class="dialog-inner"><header class="dialog-head"><div><div class="eyebrow">AZ ÖN VÁLASZTÁSA</div><h2>Lakások összehasonlítása</h2></div><button class="dialog-close" data-close aria-label="Bezárás">×</button></header><div class="compare-scroll" tabindex="0" role="region" aria-label="Összehasonlító táblázat"><table class="compare-table"><caption class="sr-only">A kiválasztott lakások adatai</caption><thead><tr><th scope="col">Lakás</th>${chosen.map((a: any): any => `<th scope="col">${esc(a.id)}</th>`).join('')}</tr></thead><tbody>${fields.map(([name, fn]: any): any => `<tr><th scope="row">${name}</th>${chosen.map((a: any): any => `<td>${fn(a)}</td>`).join('')}</tr>`).join('')}<tr><th scope="row">Részletek</th>${chosen.map((a: any): any => `<td><button class="details-button" data-from-compare="${esc(a.id)}">Megnézem ${svg('arrow')}</button></td>`).join('')}</tr></tbody></table></div></div>`;
        openDialog($('compare-dialog'));
    }
    function openMedia(id: any, kind: any): any {
        const a: any = byId(id);
        if (!a)
            return;
        const entries: any = mediaEntries(a);
        if (!entries.length)
            return;
        mediaView = ({ id, entries, index: Math.max(0, entries.findIndex((item: any): any => item.key === kind)), scale: 1, x: 0, y: 0, drag: null, token: 0 } as any);
        const dialog: any = $('media-dialog');
        dialog.innerHTML = `<div class="media-shell"><header class="media-header"><div class="media-heading"><p class="eyebrow">${esc(a.id)} · ${esc(a.building)} ÉPÜLET</p><h2 id="media-title"></h2><p class="media-description" id="media-description"></p></div><div class="media-tabs" role="tablist" aria-label="Rajz kiválasztása">${entries.map((item: any, index: any): any => `<button type="button" role="tab" id="media-tab-${item.key}" data-media-tab="${index}" aria-controls="media-image-region" aria-selected="false" tabindex="-1">${esc(item.name)}</button>`).join('')}</div><button class="dialog-close" data-close aria-label="Rajznézet bezárása">×</button></header><div class="media-stage" id="media-image-region" role="tabpanel" tabindex="0" aria-describedby="media-help"><div class="media-canvas"><img class="media-image" alt="" draggable="false" decoding="async"></div><div class="media-load-status" role="status" aria-live="polite"></div></div><footer class="media-footer"><p id="media-help">Nagyítás után húzza a rajzot, vagy használja a nyílbillentyűket.</p><div class="media-zoom" role="group" aria-label="Rajz nagyítása"><button data-zoom="out" aria-label="Kicsinyítés">−</button><button data-zoom="reset" class="zoom-level" aria-label="Nagyítás visszaállítása">100%</button><button data-zoom="in" aria-label="Nagyítás">+</button></div></footer></div>`;
        openDialog(dialog);
        showMedia(mediaView.index);
    }
    function showMedia(index: any): any {
        if (!mediaView)
            return;
        mediaView.index = (index + mediaView.entries.length) % mediaView.entries.length;
        mediaView.scale = 1;
        mediaView.x = 0;
        mediaView.y = 0;
        mediaView.drag = null;
        const current: any = mediaView.entries[mediaView.index], token: any = ++mediaSequence, dialog: any = $('media-dialog');
        mediaView.token = token;
        const image: any = dialog.querySelector('.media-image'), status: any = dialog.querySelector('.media-load-status');
        dialog.dataset.loading = 'true';
        dialog.dataset.error = 'false';
        dialog.querySelector('#media-title').textContent = current.name;
        dialog.querySelector('.media-description').textContent = current.label;
        dialog.querySelector('.media-stage').setAttribute('aria-label', `${mediaView.id} – ${current.label}`);
        dialog.querySelector('.media-stage').setAttribute('aria-labelledby', `media-tab-${current.key}`);
        dialog.querySelector('.media-stage').setAttribute('aria-busy', 'true');
        dialog.querySelectorAll('[data-media-tab]').forEach((button: any): any => { const active: any = Number(button.dataset.mediaTab) === mediaView.index; button.setAttribute('aria-selected', String(active)); button.tabIndex = active ? 0 : -1; });
        image.removeAttribute('src');
        image.alt = `${mediaView.id} – ${current.label}`;
        status.textContent = 'Rajz betöltése…';
        image.onload = (): any => {
            if (!mediaView || token !== mediaView.token)
                return;
            dialog.dataset.loading = 'false';
            dialog.querySelector('.media-stage').setAttribute('aria-busy', 'false');
            status.textContent = '';
            updateMediaTransform();
        };
        image.onerror = (): any => {
            if (!mediaView || token !== mediaView.token)
                return;
            dialog.dataset.loading = 'false';
            dialog.dataset.error = 'true';
            dialog.querySelector('.media-stage').setAttribute('aria-busy', 'false');
            status.innerHTML = `<p>A nagy méretű rajz most nem tölthető be.</p><div><button class="button-secondary" data-media-retry>Újrapróbálom</button><a class="button-secondary" href="${esc(current.full)}" target="_blank" rel="noopener">Kép megnyitása új lapon ${svg('arrow')}</a></div>`;
        };
        image.src = current.full;
        updateMediaTransform();
    }
    function updateMediaTransform(): any {
        if (!mediaView)
            return;
        const dialog: any = $('media-dialog'), canvas: any = dialog.querySelector('.media-canvas'), image: any = dialog.querySelector('.media-image');
        if (!canvas || !image)
            return;
        const fit: any = image.naturalWidth ? Math.min(canvas.clientWidth / image.naturalWidth, canvas.clientHeight / image.naturalHeight) : 1;
        const maxX: any = Math.max(0, (image.naturalWidth * fit * mediaView.scale - canvas.clientWidth) / 2), maxY: any = Math.max(0, (image.naturalHeight * fit * mediaView.scale - canvas.clientHeight) / 2);
        mediaView.x = Math.max(-maxX, Math.min(maxX, mediaView.x));
        mediaView.y = Math.max(-maxY, Math.min(maxY, mediaView.y));
        image.style.transform = `translate(${mediaView.x}px,${mediaView.y}px) scale(${mediaView.scale})`;
        dialog.querySelector('.media-stage').dataset.zoomed = String(mediaView.scale > 1);
        const zoom: any = dialog.querySelector('.zoom-level');
        zoom.textContent = `${Math.round(mediaView.scale * 100)}%`;
        dialog.querySelector('[data-zoom="out"]').disabled = mediaView.scale <= 1;
        dialog.querySelector('[data-zoom="in"]').disabled = mediaView.scale >= 4;
    }
    function zoomMedia(action: any): any {
        if (!mediaView)
            return;
        mediaView.scale = action === 'reset' ? 1 : Math.max(1, Math.min(4, mediaView.scale + (action === 'in' ? .5 : -.5)));
        if (mediaView.scale === 1) {
            mediaView.x = 0;
            mediaView.y = 0;
        }
        updateMediaTransform();
    }
    async function downloadDatasheet(id: any, trigger: any): Promise<any> {
        const a: any = byId(id), file: any = a && datasheet(a);
        if (!file || trigger.getAttribute('aria-busy') === 'true')
            return;
        trigger.setAttribute('aria-busy', 'true');
        trigger.setAttribute('aria-disabled', 'true');
        try {
            const response: any = await fetch(file.url, ({ signal, credentials: 'omit' } as any));
            if (!response.ok)
                throw new Error('Download unavailable');
            const blob: any = await response.blob();
            if (new TextDecoder().decode(await blob.slice(0, 5).arrayBuffer()) !== '%PDF-')
                throw new Error('Invalid PDF');
            const url: any = URL.createObjectURL(blob);
            downloadUrls.add(url);
            const link: any = (document as any).createElement('a');
            link.href = url;
            link.download = file.filename;
            (dialogStack.findLast((dialog: any): any => dialog.open)?.querySelector('.dialog-inner,.detail-shell') || root.querySelector('main') || (document as any).body).append(link);
            link.click();
            link.remove();
            setTimeout((): any => { URL.revokeObjectURL(url); downloadUrls.delete(url); }, 30000);
            toast('Az adatlap letöltése elindult.');
        }
        catch (error: any) {
            if (signal.aborted)
                return;
            const holder: any = trigger.closest('.download-wrap');
            if (holder && !holder.querySelector('.download-fallback'))
                holder.insertAdjacentHTML('beforeend', `<a class="download-fallback" href="${esc(file.url)}" target="_blank" rel="noopener">PDF megnyitása ${svg('arrow')}</a>`);
            toast('A letöltés nem indult el. A PDF külön megnyitható.');
        }
        finally {
            trigger.removeAttribute('aria-busy');
            trigger.removeAttribute('aria-disabled');
        }
    }
    function apartmentLink(id: any): any { const u: any = new URL(safeUrl(config.pageUrl) || location.href); for (const key of ([...filterIds, 'search', 'sort'] as any))
        u.searchParams.delete(key); u.searchParams.set('apartment', id); return u.href; }
    const sendIcon: any = '<svg viewBox="0 0 24 24" width="21" height="21" fill="none" aria-hidden="true"><path d="m21 3-7.2 18-3.6-7.2L3 10.2 21 3Zm0 0L10.2 13.8" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    function sharePayload(a: any): any {
        return ({ title: `Admiral Park · ${a.id}`, text: `Admiral Park ${a.id} lakás · ${area(a.areaInterior)} beltér · ${area(a.areaTerrace)} erkély${hasNumber(a.price) ? ` · ${price(a.price)}` : ''}`, url: apartmentLink(a.id) } as any);
    }
    function shareControl(a: any): any {
        const payload: any = sharePayload(a), email: any = `mailto:?subject=${encodeURIComponent(payload.title)}&body=${encodeURIComponent(payload.text + '\n\n' + payload.url)}`, whatsapp: any = `https://wa.me/?text=${encodeURIComponent(payload.text + '\n' + payload.url)}`;
        return `<div class="detail-share-wrap"><button type="button" class="share-button footer-pill" data-share="${esc(a.id)}" title="Lakás megosztása" aria-label="${esc(a.id)} lakás megosztása" aria-haspopup="dialog" aria-expanded="false" aria-controls="detail-share-menu">${sendIcon}<span>Küldd el valakinek</span></button><div class="share-popover" id="detail-share-menu" role="dialog" aria-label="Lakás megosztása" hidden><div class="share-heading"><div><span>Lakás megosztása</span><strong>${esc(a.id)}</strong></div><button type="button" data-share-close aria-label="Megosztás bezárása">×</button></div><div class="share-options"><button type="button" data-share-copy="${esc(a.id)}"><span aria-hidden="true">↗</span>Link másolása</button><a data-share-email href="${esc(email)}"><span aria-hidden="true">@</span>E-mail</a><a data-share-whatsapp href="${esc(whatsapp)}" target="_blank" rel="noopener noreferrer"><span aria-hidden="true">↗</span>WhatsApp</a></div><label class="sr-only" for="detail-share-url">A lakás hivatkozása</label><input class="share-url" id="detail-share-url" type="text" readonly value="${esc(payload.url)}"><output class="share-feedback" role="status" aria-live="polite"></output></div></div>`;
    }
    function shareMenu(): any { return $('detail-dialog')?.querySelector('.share-popover'); }
    function closeShare(restore: any = true): any {
        const menu: any = shareMenu();
        if (!menu || menu.hidden)
            return false;
        menu.hidden = true;
        const button: any = $('detail-dialog').querySelector('[data-share]');
        button?.setAttribute('aria-expanded', 'false');
        if (restore)
            button?.focus(({ preventScroll: true } as any));
        return true;
    }
    function positionShareMenu(): any {
        const dialog: any = $('detail-dialog'), menu: any = shareMenu();
        if (!dialog?.open || !menu || menu.hidden)
            return;
        const bounds: any = dialog.getBoundingClientRect(), anchor: any = dialog.querySelector('[data-share]').getBoundingClientRect(), close: any = dialog.querySelector('[data-close]').getBoundingClientRect();
        const width: any = menu.getBoundingClientRect().width, height: any = menu.getBoundingClientRect().height, minTop: any = close.bottom + 8, maxTop: any = bounds.bottom - height - 12;
        const preferred: any = anchor.top - height - 8 >= minTop ? anchor.top - height - 8 : anchor.bottom + 8;
        menu.style.left = `${Math.max(bounds.left + 12, Math.min(anchor.right - width, bounds.right - width - 12))}px`;
        menu.style.top = `${Math.max(minTop, Math.min(preferred, maxTop))}px`;
    }
    function openShareMenu(id: any): any {
        const dialog: any = $('detail-dialog'), menu: any = shareMenu();
        if (!dialog.open || dialog.dataset.apartment !== id || !menu)
            return;
        menu.hidden = false;
        dialog.querySelector('[data-share]')?.setAttribute('aria-expanded', 'true');
        positionShareMenu();
        menu.querySelector('[data-share-copy]')?.focus(({ preventScroll: true } as any));
    }
    async function shareApartment(id: any, trigger: any): Promise<any> {
        const a: any = byId(id);
        if (!a || trigger.getAttribute('aria-busy') === 'true')
            return;
        if (closeShare())
            return;
        const payload: any = sharePayload(a);
        if (typeof navigator.share === 'function') {
            trigger.setAttribute('aria-busy', 'true');
            try {
                await navigator.share(payload);
                return;
            }
            catch (error: any) {
                if (error?.name === 'AbortError' || signal.aborted || !trigger.isConnected)
                    return;
            }
            finally {
                trigger.removeAttribute('aria-busy');
            }
        }
        openShareMenu(id);
    }
    async function copyShareLink(id: any): Promise<any> {
        const menu: any = shareMenu();
        if (!menu || menu.hidden)
            return;
        const copied: any = await copyText(apartmentLink(id));
        if (!menu.isConnected)
            return;
        menu.querySelector('.share-feedback').textContent = copied ? 'Link másolva.' : 'A link kijelölve, másolásra kész.';
        if (!copied) {
            const input: any = menu.querySelector('.share-url');
            input.focus(({ preventScroll: true } as any));
            input.select();
        }
        positionShareMenu();
    }
    async function copyText(text: any): Promise<any> {
        try {
            await navigator.clipboard.writeText(text);
            toast('A vágólapra másoltuk.');
            return true;
        }
        catch {
            const previous: any = root.activeElement || (document as any).activeElement, helper: any = (document as any).createElement('textarea'), holder: any = root.querySelector('dialog[open] .dialog-inner,dialog[open] .detail-shell') || root.querySelector('main') || (document as any).body;
            helper.value = text;
            helper.setAttribute('aria-label', 'Másolható szöveg');
            helper.style.cssText = 'position:fixed;top:20px;left:20px;z-index:99999;width:80%;height:80px';
            holder.append(helper);
            helper.focus(({ preventScroll: true } as any));
            helper.select();
            let copied: any = false;
            try {
                copied = (document as any).execCommand('copy');
            }
            catch { }
            helper.remove();
            previous?.focus(({ preventScroll: true } as any));
            toast(copied ? 'A vágólapra másoltuk.' : 'A böngésző nem engedélyezte a másolást.');
            return copied;
        }
    }
    function resizeEmbed(): any { if (embed)
        requestAnimationFrame((): any => { parent.postMessage(({ type: 'admiral-list-height', height: (document as any).documentElement.scrollHeight, instance: config.instance } as any), '*'); }); }
    // Hover and keyboard focus preview the paired room without changing the active panel.
    for (const name of (['pointerover', 'pointermove', 'pointerout', 'focusin', 'focusout'] as any))
        root.addEventListener(name, (event: any): any => {
            if (event.pointerType === 'touch')
                return;
            const button: any = event.target.closest?.('.room-marker,.room-legend-button');
            if (!button?.closest('#detail-dialog') || button.contains(event.relatedTarget))
                return;
            if (name === 'pointermove' && button.classList.contains('is-active'))
                return;
            if (name === 'pointerover' || name === 'pointermove')
                hoverPlanRoom = button.dataset.planRoom;
            if (name === 'pointerout')
                hoverPlanRoom = null;
            if (name === 'focusin')
                focusedPlanRoom = button.dataset.planRoom;
            if (name === 'focusout')
                focusedPlanRoom = null;
            paintPlanRoom(name === 'focusin' ? focusedPlanRoom : hoverPlanRoom || focusedPlanRoom || selectedPlanRoom);
        }, events);
    root.addEventListener('click', (event: any): any => {
        if (!event.target.closest('.detail-share-wrap'))
            closeShare(false);
        const clickedRow: any = event.target.closest('.apartment-row[data-unit]');
        if (clickedRow && !event.target.closest('button,a,input,label,select,textarea,[role="button"]')) {
            const selection: any = (window as any).getSelection();
            if (selection && !selection.isCollapsed && (clickedRow.contains(selection.anchorNode) || clickedRow.contains(selection.focusNode)))
                return;
            clickedRow.querySelector('[data-detail]')?.focus(({ preventScroll: true } as any));
            detail(clickedRow.dataset.unit);
            return;
        }
        const t: any = event.target.closest('button,a[data-download],[data-close]');
        if (!t)
            return;
        if (t.hasAttribute('data-share'))
            shareApartment(t.dataset.share, t);
        if (t.hasAttribute('data-share-close'))
            closeShare();
        if (t.hasAttribute('data-share-copy'))
            copyShareLink(t.dataset.shareCopy);
        if (t.hasAttribute('data-detail-tab'))
            selectDetailPanel(t.dataset.detailTab);
        if (t.hasAttribute('data-document-view'))
            selectDetailDocument(t.dataset.documentView);
        if (t.hasAttribute('data-room-view'))
            selectDetailRoomView(t.dataset.roomView);
        if (t.hasAttribute('data-plan-room'))
            selectPlanRoom(t.dataset.planRoom, t);
        if (t.hasAttribute('data-inquiry-placeholder')) {
            const dialog: any = $('detail-dialog'), note: any = dialog.querySelector('.inquiry-pending');
            if (note) {
                note.hidden = !note.hidden;
                t.setAttribute('aria-expanded', String(!note.hidden));
                if (!note.hidden)
                    positionInquiryNotice();
            }
        }
        if (t.hasAttribute('data-media'))
            openMedia(t.dataset.media, t.dataset.mediaKind);
        if (t.hasAttribute('data-media-tab'))
            showMedia(Number(t.dataset.mediaTab));
        if (t.hasAttribute('data-media-retry') && mediaView) {
            showMedia(mediaView.index);
            $('media-dialog').querySelector('.media-stage')?.focus();
        }
        if (t.hasAttribute('data-zoom'))
            zoomMedia(t.dataset.zoom);
        if (t.hasAttribute('data-download')) {
            event.preventDefault();
            downloadDatasheet(t.dataset.download, t);
        }
        if (t.id === 'reset' || t.hasAttribute('data-reset'))
            reset();
        if (t.id === 'mobile-filters') {
            const open: any = $('filters').dataset.open !== 'true';
            $('filters').dataset.open = String(open);
            t.setAttribute('aria-expanded', String(open));
            resizeEmbed();
        }
        if (t.hasAttribute('data-remove-filter')) {
            const id: any = t.dataset.removeFilter;
            state[id] = defaults[id];
            syncControls();
            render();
        }
        if (t.hasAttribute('data-sort')) {
            const key: any = t.dataset.sort;
            state.sort = key === 'floor' ? 'floor' : `${key}-${state.sort === `${key}-asc` ? 'desc' : 'asc'}`;
            syncControls();
            render();
        }
        if (t.hasAttribute('data-save')) {
            const id: any = t.dataset.save;
            if (favorites.has(id))
                favorites.delete(id);
            else
                favorites.add(id);
            try {
                localStorage.setItem('admiral-park:favorites:v1', JSON.stringify(([...favorites] as any)));
            }
            catch {
                storage = false;
            }
            const wasDetail: any = $('detail-dialog').open;
            render();
            if (wasDetail) {
                const a: any = byId(id);
                const b: any = $('detail-dialog').querySelector(`[data-save="${CSS.escape(id)}"]`);
                if (b) {
                    const holder: any = (document as any).createElement('div');
                    holder.innerHTML = saveButton(a, true);
                    b.replaceWith(holder.firstElementChild);
                    $('detail-dialog').querySelector('[data-save]')?.focus();
                }
            }
            else
                $('results').querySelector(`[data-save="${CSS.escape(id)}"]`)?.focus();
            toast(favorites.has(id) ? `A(z) ${id} lakást elmentettük${storage ? '' : '. A mentés csak ezen az oldalon marad meg'}.` : `A(z) ${id} lakást eltávolítottuk a kedvencekből.`);
        }
        if (t.hasAttribute('data-detail'))
            detail(t.dataset.detail);
        if (t.hasAttribute('data-compare')) {
            const id: any = t.dataset.compare;
            if (selected.has(id))
                selected.delete(id);
            else {
                if (selected.size >= 3) {
                    toast('Legfeljebb 3 lakás hasonlítható össze.');
                    return;
                }
                selected.add(id);
            }
            t.setAttribute('aria-pressed', String(selected.has(id)));
            renderTray();
        }
        if (t.hasAttribute('data-close'))
            closeDialog(t.closest('dialog'));
        if (t.hasAttribute('data-clear-compare')) {
            selected.clear();
            render();
        }
        if (t.hasAttribute('data-open-compare'))
            showCompare();
        if (t.hasAttribute('data-from-compare')) {
            closeDialog($('compare-dialog'));
            detail(t.dataset.fromCompare);
        }
        if (t.hasAttribute('data-copy-inquiry')) {
            const a: any = byId(t.dataset.copyInquiry);
            copyText(`Érdeklődöm az Admiral Park ${a.id} lakása iránt.\n${a.building} épület, ${floorText(a)}\nNettó alapterület: ${area(a.areaInterior)}\nErkély: ${area(a.areaTerrace)}\nBruttó ár: ${price(a.price)}\n${apartmentLink(a.id)}`);
        }
    }, events);
    $('filters').addEventListener('submit', (e: any): any => e.preventDefault(), events);
    $('filters').addEventListener('input', (e: any): any => { const id: any = e.target.id; if (!filterIds.includes(id))
        return; if (numericFilters.has(id))
        updateRange(id);
    else
        state[id] = checks.has(id) ? e.target.checked : e.target.value; render(); }, events);
    function moveRangeOnTrack(event: any): any {
        if (!rangeDrag || rangeDrag.pointerId !== event.pointerId)
            return;
        const { input, track }: any = rangeDrag, rect: any = track.querySelector('.slider-track').getBoundingClientRect();
        const ratio: any = Math.max(0, Math.min(1, (event.clientX - rect.left) / Math.max(1, rect.width)));
        input.value = String(Number(input.min) + ratio * (Number(input.max) - Number(input.min)));
        updateRange(input.id);
        render();
    }
    $('filters').addEventListener('pointerdown', (event: any): any => {
        const track: any = event.target.closest('.range-slider');
        if (!track || event.target.matches('input') || event.button !== 0)
            return;
        const inputs: any = ([...track.querySelectorAll('input[type="range"]')] as any);
        if (inputs.some((input: any): any => input.disabled))
            return;
        const rect: any = track.querySelector('.slider-track').getBoundingClientRect();
        const value: any = Number(inputs[0].min) + (event.clientX - rect.left) / Math.max(1, rect.width) * (Number(inputs[0].max) - Number(inputs[0].min));
        const input: any = inputs.reduce((closest: any, item: any): any => Math.abs(Number(item.value) - value) < Math.abs(Number(closest.value) - value) ? item : closest);
        rangeDrag = ({ input, track, pointerId: event.pointerId } as any);
        track.setPointerCapture(event.pointerId);
        input.focus();
        event.preventDefault();
        moveRangeOnTrack(event);
    }, events);
    $('filters').addEventListener('pointermove', moveRangeOnTrack, events);
    for (const name of (['pointerup', 'pointercancel'] as any))
        $('filters').addEventListener(name, (event: any): any => { if (rangeDrag?.pointerId === event.pointerId)
            rangeDrag = null; }, events);
    $('sort').addEventListener('change', (e: any): any => { state.sort = e.target.value; render(); }, events);
    root.addEventListener('keydown', (event: any): any => {
        if (event.key === 'Escape' && closeShare()) {
            event.preventDefault();
            event.stopPropagation();
            return;
        }
        const tab: any = event.target.closest('[role=tab][data-detail-tab],[role=tab][data-document-view],[role=tab][data-room-view]');
        if (!tab || !(['ArrowLeft', 'ArrowRight', 'Home', 'End'] as any).includes(event.key))
            return;
        const tabs: any = ([...tab.closest('[role=tablist]').querySelectorAll('[role=tab]')] as any), current: any = tabs.indexOf(tab), index: any = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : (current + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
        event.preventDefault();
        tabs[index].click();
        tabs[index].focus(({ preventScroll: true } as any));
    }, events);
    root.addEventListener('error', (event: any): any => {
        const image: any = event.target;
        if (image.matches?.('img[data-thumbnail]')) {
            image.hidden = true;
            const fallback: any = image.parentElement.querySelector('.preview-unavailable');
            if (fallback)
                fallback.hidden = false;
        }
    }, ({ ...events, capture: true } as any));
    for (const dialog of dialogs) {
        dialog.addEventListener('cancel', (e: any): any => { e.preventDefault(); if (dialog.id === 'detail-dialog' && closeShare())
            return; closeDialog(dialog); }, events);
        dialog.addEventListener('click', (e: any): any => { if (e.target === dialog) {
            const r: any = dialog.getBoundingClientRect();
            if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom)
                closeDialog(dialog);
        } }, events);
        dialog.addEventListener('close', (): any => finishDialogClose(dialog), events);
    }
    const mediaDialog: any = $('media-dialog');
    mediaDialog?.addEventListener('pointerdown', (event: any): any => {
        const stage: any = event.target.closest('.media-stage');
        if (!stage || !mediaView || mediaView.scale <= 1 || event.button !== 0)
            return;
        event.preventDefault();
        stage.focus();
        stage.setPointerCapture(event.pointerId);
        mediaView.drag = ({ pointerId: event.pointerId, startX: event.clientX, startY: event.clientY, x: mediaView.x, y: mediaView.y } as any);
        stage.dataset.dragging = 'true';
    }, events);
    mediaDialog?.addEventListener('pointermove', (event: any): any => {
        if (!mediaView?.drag || mediaView.drag.pointerId !== event.pointerId)
            return;
        mediaView.x = mediaView.drag.x + event.clientX - mediaView.drag.startX;
        mediaView.y = mediaView.drag.y + event.clientY - mediaView.drag.startY;
        updateMediaTransform();
    }, events);
    function stopMediaDrag(event: any): any {
        if (!mediaView?.drag || mediaView.drag.pointerId !== event.pointerId)
            return;
        const stage: any = mediaDialog.querySelector('.media-stage');
        mediaView.drag = null;
        if (stage) {
            stage.dataset.dragging = 'false';
            if (stage.hasPointerCapture(event.pointerId))
                stage.releasePointerCapture(event.pointerId);
        }
    }
    mediaDialog?.addEventListener('pointerup', stopMediaDrag, events);
    mediaDialog?.addEventListener('pointercancel', stopMediaDrag, events);
    mediaDialog?.addEventListener('keydown', (event: any): any => {
        if (!mediaView)
            return;
        if (event.target.matches('[role="tab"]') && (['ArrowLeft', 'ArrowRight', 'Home', 'End'] as any).includes(event.key)) {
            event.preventDefault();
            const index: any = event.key === 'Home' ? 0 : event.key === 'End' ? mediaView.entries.length - 1 : mediaView.index + (event.key === 'ArrowRight' ? 1 : -1);
            showMedia(index);
            mediaDialog.querySelector('[role="tab"][aria-selected="true"]')?.focus();
            return;
        }
        if ((['+', '=', '-', '0'] as any).includes(event.key)) {
            event.preventDefault();
            zoomMedia(event.key === '0' ? 'reset' : event.key === '-' ? 'out' : 'in');
            return;
        }
        if (!event.target.closest('.media-stage') || !event.key.startsWith('Arrow'))
            return;
        event.preventDefault();
        if (mediaView.scale <= 1) {
            if ((['ArrowLeft', 'ArrowRight'] as any).includes(event.key))
                showMedia(mediaView.index + (event.key === 'ArrowRight' ? 1 : -1));
            return;
        }
        const step: any = event.shiftKey ? 120 : 45;
        if (event.key === 'ArrowLeft')
            mediaView.x += step;
        if (event.key === 'ArrowRight')
            mediaView.x -= step;
        if (event.key === 'ArrowUp')
            mediaView.y += step;
        if (event.key === 'ArrowDown')
            mediaView.y -= step;
        updateMediaTransform();
    }, events);
    (window as any).addEventListener('resize', (): any => { updateMediaTransform(); requestAnimationFrame((): any => { positionInquiryNotice(); positionShareMenu(); }); }, events);
    if (useUrl)
        (window as any).addEventListener('popstate', (): any => { state = ({ ...defaults, sort: 'id' } as any); readUrl(); syncControls(); render(); const id: any = new URL(location.href).searchParams.get('apartment'); if (id)
            detail(id);
        else if ($('detail-dialog').open)
            closeDialog($('detail-dialog')); }, events);
    if (embed)
        (document as any).documentElement.classList.add('embedded');
    const observer: any = new ResizeObserver(resizeEmbed);
    observer.observe(root.host || (document as any).body);
    async function load(): Promise<any> {
        config.onState?.('loading', '');
        $('results').setAttribute('aria-busy', 'true');
        $('results').innerHTML = '<div class="empty-state" role="status"><p>Lakások betöltése…</p></div>';
        try {
            const source: any = config.dataUrl || './apartments.json';
            const response: any = await fetch(source, ({ cache: 'no-cache', signal } as any));
            if (!response.ok)
                throw new Error(`HTTP ${response.status}`);
            data = await response.json();
            if (!data || data.schemaVersion !== '1.0' || !Array.isArray(data.apartments))
                throw new Error('Nem támogatott adatformátum');
            const ids: any = new Set();
            for (const a of data.apartments) {
                if (typeof a.id !== 'string' || !a.id || ids.has(a.id) || !(Object as any).hasOwn(labels, a.status) || typeof a.building !== 'string')
                    throw new Error('Hibás vagy ismétlődő lakásadat');
                ids.add(a.id);
                for (const field of (['floor', 'rooms', 'areaInterior', 'areaTerrace', 'areaGarden', 'price'] as any)) {
                    if (a[field] != null && (!hasNumber(a[field]) || a[field] < 0))
                        throw new Error('Hibás számadat');
                }
            }
            apartments = data.apartments;
            favorites = new Set(([...favorites] as any).filter((id: any): any => ids.has(id)));
            setupOptions('building', ([...new Set(apartments.map((a: any): any => a.building))] as any).sort().map((v: any): any => ([v, `${v} épület`] as any)));
            setupOptions('floor', ([...new Set(apartments.map((a: any): any => a.floor).filter((v: any): any => v != null))] as any).sort((a: any, b: any): any => a - b).map((v: any): any => ([String(v), v === 0 ? 'Földszint' : `${v}. emelet`] as any)));
            setupOptions('rooms', ([...new Set(apartments.map((a: any): any => a.rooms).filter((v: any): any => v != null).map((v: any): any => v >= 4 ? '4+' : String(v)))] as any).sort().map((v: any): any => ([v, `${v === '4+' ? v : number.format(Number(v))} szoba`] as any)));
            setupRanges();
            readUrl();
            syncControls();
            $('data-note').textContent = 'A nettó belső alapterület, az erkély és a kert külön szerepel. Az árak bruttó árak. A helyiségadatok munkaközi tervből származnak; az aktuális árat és elérhetőséget az értékesítő erősíti meg.';
            render();
            config.onState?.('ready', '');
            config.onReady?.(controller);
            const id: any = requestedApartmentId || (useUrl ? new URL(location.href).searchParams.get('apartment') : null);
            if (id && byId(id))
                detail(id);
            else if (id)
                config.onState?.('error', 'A kiválasztott lakás nem található.');
            if (root === (document as any))
                (window as any).admiralList = ({ getData: (): any => structuredClone(data), getState: (): any => (({ ...state } as any)), reload: load } as any);
        }
        catch (error: any) {
            if (signal.aborted)
                return;
            $('results').setAttribute('aria-busy', 'false');
            $('result-count').textContent = 'Az adatok nem érhetők el';
            $('results').innerHTML = '<div class="empty-state" role="alert"><h2>Nem sikerült betölteni a lakáslistát.</h2><p>Próbálja újra néhány pillanat múlva.</p><button class="button-primary" id="retry">Újrapróbálom</button></div>';
            $('retry').addEventListener('click', load);
            resizeEmbed();
            config.onState?.('error', 'Nem sikerült betölteni a lakás adatait. Próbálja újra.');
        }
    }
    const controller: any = ({
        open(id: any) {
            requestedApartmentId = typeof id === 'string' ? id : null;
            if (!requestedApartmentId)
                return;
            if (data) {
                if (byId(requestedApartmentId)) {
                    config.onState?.('ready', '');
                    detail(requestedApartmentId);
                }
                else
                    config.onState?.('error', 'A kiválasztott lakás nem található.');
            }
        },
        close() { requestedApartmentId = null; for (const dialog of ([...dialogs] as any).reverse())
            closeDialog(dialog); },
        retry() { return load(); },
        dispose() { lifecycle.abort(); observer.disconnect(); detailResize?.disconnect(); clearTimeout(toastTimer); for (const d of ([...dialogs] as any).reverse()) {
            if (d.open)
                d.close();
            modalRegistry.delete(d);
        } for (const url of downloadUrls)
            URL.revokeObjectURL(url); downloadUrls.clear(); mediaView = null; syncModalState(); }
    } as any);
    load();
    return controller;
}


interface OrbitApartmentCardController {
    open: (id: string) => void
    close: () => void
    retry: () => unknown
    dispose: () => void
}
interface OrbitApartmentCardProps {
    openId: string | null
    dataUrl: string
    assetBase: string
    inquiryUrl: string
    pageUrl: string
    onOpenChange: (open: boolean) => void
    onClosed: () => void
    onReady?: () => void
}

function OrbitApartmentCard(props: OrbitApartmentCardProps) {
    const { openId, dataUrl, assetBase, inquiryUrl, pageUrl } = props
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
        // The list shell stays available for the shared engine's selectors, while its
        // renderer is disabled. No list rows or their image requests are created.
        shadow.innerHTML = "<style>" + ORBIT_APARTMENT_CARD_STYLES + "\n:host{position:fixed!important;inset:0 auto auto 0!important;width:0!important;height:0!important;min-height:0!important;background:transparent!important;pointer-events:none!important;overflow:visible!important}.list-container,#compare-tray{display:none!important}dialog,.toast{pointer-events:auto}dialog{font-size:14px}</style>" + ORBIT_APARTMENT_CARD_SHELL
        const list = shadow.querySelector<HTMLElement>(".list-container")
        if (list) { list.hidden = true; list.inert = true }
        setState("loading")
        setError("")
        setNativeOpen(false)
        try {
            const runtime = mountOrbitApartmentCardRuntime(shadow, {
                dataUrl,
                assetBaseUrl: assetBase,
                inquiryUrl,
                pageUrl: pageUrl || window.location.href,
                disableUrl: true,
                detailOnly: true,
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
    }, [started, dataUrl, assetBase, inquiryUrl, pageUrl, restoreFocus])

    React.useEffect(() => {
        if (openId) controller.current?.open(openId)
        else controller.current?.close()
    }, [openId, started, dataUrl, assetBase, inquiryUrl, pageUrl])

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
        <div ref={host} data-orbit-ignore="" style={{ position: "fixed", top: 0, left: 0, width: 0, height: 0, pointerEvents: "none" }} />
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
    const [hoveredApartment, setHoveredApartment] = React.useState<ApartmentDetailsData | null>(null)
    const [detailsHeight, setDetailsHeight] = React.useState(140)
    const [mobilePresentation, setMobilePresentation] = React.useState(false)
    const useStudio = (orbitLayout === "studio" || orbitLayout === "mobile" && mobilePresentation) && detailsMode !== "off"
    const jsonDetails = orbitLayout !== "classic" && detailsMode !== "off"
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
    const hoveredApartmentRef = React.useRef<ApartmentDetailsData | null>(null)
    const clearApartmentDetails = React.useCallback(() => {
        if (hoveredApartmentRef.current !== null) { hoveredApartmentRef.current = null; setHoveredApartment(null) }
    }, [])
    const sampleApartment = React.useMemo(() => createApartmentPreview(apartmentPreview), [apartmentPreview])
    const rootRef = React.useRef<HTMLDivElement>(null), heroRootRef = React.useRef<HTMLDivElement>(null)
    const heroCanvasRef = React.useRef<HTMLCanvasElement>(null), orbitCanvasRef = React.useRef<HTMLCanvasElement>(null), posterRef = React.useRef<HTMLImageElement>(null)
    const actions = React.useRef<HomepageActions | null>(null)
    const openApartmentDetails = React.useCallback((id?: string) => {
        const value = id || selectedApartment?.id, root = rootRef.current
        if (!value || !apartmentData.dataset?.apartments.some(apartment => apartment.id === value) || !root ||
            root.dataset.homepageStage !== "orbit" || root.dataset.orbitState !== "checkpoint" || Number(root.dataset.orbitCheckpoint) < 0) return
        setSelectedApartmentId(value); detailOpen.current = true; actions.current?.orbit?.setSuspended(true); setDetailApartmentId(value)
    }, [selectedApartment?.id, apartmentData.dataset])
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
    const detailsData = jsonDetails ? selectedApartmentDetails : detailsMode === "preview" ? sampleApartment : hoveredApartment
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
            {!useStudio && detailsMode !== "off" && <ApartmentDetailsStrip apartment={detailsData} language={detailsLanguage} visible={detailsVisible} preview={!jsonDetails && detailsMode === "preview"}
                bottom={detailsBottom} inset={detailsInset} onHeightChange={setDetailsHeight} onOpen={jsonDetails && selectedApartment ? () => openApartmentDetails() : undefined} />}
            {!staticRenderer && <OrbitApartmentCard openId={detailApartmentId} dataUrl={detailDataUrl} assetBase={apartmentAssetBase} inquiryUrl={inquiryUrl} pageUrl={detailPageUrl}
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
    apartmentDataUrl: { type: ControlType.String, title: "Apartment JSON", defaultValue: "https://raw.githubusercontent.com/UnbuiltMarket/admiral-park/main/data/apartments.json", hidden: p => p.orbitLayout === "classic", description: "Apartment facts and media paths. All 69 records are small; only the selected plan is loaded." },
    apartmentAssetBase: { type: ControlType.String, title: "Media base", defaultValue: HOMEPAGE_ASSETS + "/apartment-list/", hidden: p => p.orbitLayout === "classic" },
    previewApartmentId: { type: ControlType.String, title: "Preview apartment", defaultValue: "A001", hidden: p => p.orbitLayout === "classic" || p.detailsMode === "hover" || p.detailsMode === "off", description: "A real JSON apartment ID, used until picking masks are connected. You can also change it in the preview selector." },
    detailPageUrl: { type: ControlType.String, title: "Details page", defaultValue: "/lista", hidden: p => p.orbitLayout === "classic", description: "Your Framer apartment page path. Links add ?apartment=ID to open this apartment." },
    detailDataUrl: { type: ControlType.String, title: "Detail card JSON", defaultValue: "https://raw.githubusercontent.com/UnbuiltMarket/admiral-park/main/data/apartment-details.json", description: "Full apartment data for the shared list-view card, fetched only when an apartment is opened." },
    inquiryUrl: { type: ControlType.String, title: "Inquiry page", defaultValue: "", hidden: p => p.orbitLayout === "classic", description: "Optional enquiry page URL. If empty, the action opens the apartment details page." },
    detailsMode: { type: ControlType.Enum, title: "Apartment details", options: ["preview", "hover", "off"], optionTitles: ["Preview", "Hover", "Off"], defaultValue: "preview", description: "Preview shows real JSON data with a trial apartment selector. Hover waits for a selected apartment ID from the future masks. Off hides the apartment workspace." },
    detailsLanguage: { type: ControlType.Enum, title: "Details language", options: ["hu", "en"], optionTitles: ["Magyar", "English"], defaultValue: "hu", hidden: p => p.detailsMode === "off" },
    detailsBottom: { type: ControlType.Number, title: "Details bottom", defaultValue: 32, min: 0, max: 160, step: 1, unit: "px", hidden: p => p.detailsMode === "off" || p.orbitLayout === "studio" },
    detailsInset: { type: ControlType.Number, title: "Details margin", defaultValue: 48, min: 0, max: 120, step: 1, unit: "px", hidden: p => p.detailsMode === "off" || p.orbitLayout === "studio" },
    apartmentPreview: { type: ControlType.Object, title: "Sample apartment", hidden: p => p.orbitLayout !== "classic" || p.detailsMode !== undefined && p.detailsMode !== "preview", controls: {
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
[data-apartment-details] [data-apartment-open] { display: block; max-width: 100%; padding: 0; border: 0; color: inherit; background: none; cursor: pointer; pointer-events: auto !important; }
[data-apartment-details] [data-apartment-open]:focus-visible { outline: 2px solid currentColor; outline-offset: 5px; }
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
                {onOpen ? <button type="button" data-apartment-open="" data-orbit-ignore="" aria-label={hu ? `${data.number} lakás részletei` : `Apartment ${data.number} details`} aria-haspopup="dialog" tabIndex={shown ? 0 : -1} disabled={!shown} onClick={onOpen}>
                    {floorplan ? <img className="admiral-details-plan-image" src={floorplan} alt={hu ? `${data.number} lakás alaprajza` : `Floor plan of apartment ${data.number}`} loading="lazy" decoding="async" draggable={false} onError={() => setFailedFloorplan(floorplan)} /> : <span className="admiral-details-plan-empty">{hu ? "Részletek ↗" : "Details ↗"}</span>}
                </button> : floorplan ? <img className="admiral-details-plan-image" src={floorplan} alt={hu ? `${data.number} lakás alaprajza` : `Floor plan of apartment ${data.number}`} loading="lazy" decoding="async" draggable={false} onError={() => setFailedFloorplan(floorplan)} /> : sample ?
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
        const box = root.getBoundingClientRect();
        return box.width > 0 && box.height > 0 && x >= box.left && x <= box.right && y >= box.top && y <= box.bottom;
    }

    function inputPoint(clientX: number, clientY: number) {
        const point = options.inputPoint?.(clientX, clientY);
        return point && Number.isFinite(point.x) && Number.isFinite(point.y) ? point : { x: clientX, y: clientY };
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
