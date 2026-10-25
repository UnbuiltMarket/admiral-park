// Generated Framer homepage. Requires AdmiralApartmentDetailCard.tsx in the same Framer project.
import * as React from "react"
import type { ComponentType } from "react"
import { addPropertyControls, ControlType, useIsStaticRenderer } from "framer"
import AdmiralApartmentDetailCard from "./AdmiralApartmentDetailCard.tsx"

const HOMEPAGE_HERO_NAMES: string[] = ["raw sequence00.avif","raw sequence01.avif","raw sequence02.avif","raw sequence03.avif","raw sequence04.avif","raw sequence05.avif","raw sequence06.avif","raw sequence07.avif","raw sequence08.avif","raw sequence09.avif","raw sequence10.avif","raw sequence11.avif","raw sequence12.avif","raw sequence13.avif","raw sequence14.avif","raw sequence15.avif","raw sequence16.avif","raw sequence17.avif","raw sequence18.avif","raw sequence19.avif","raw sequence20.avif","raw sequence21.avif","raw sequence22.avif","raw sequence23.avif","raw sequence24.avif","raw sequence25.avif","raw sequence26.avif","raw sequence27.avif","raw sequence28.avif","raw sequence29.avif","raw sequence30.avif","raw sequence31.avif","raw sequence32.avif","raw sequence33.avif","raw sequence34.avif","raw sequence35.avif","raw sequence36.avif","raw sequence37.avif","raw sequence38.avif","raw sequence39.avif","raw sequence40.avif","raw sequence41.avif","raw sequence42.avif","raw sequence43.avif","raw sequence44.avif","raw sequence45.avif","raw sequence46.avif","raw sequence47.avif","raw sequence48.avif","raw sequence49.avif","raw sequence50.avif","raw sequence51.avif","raw sequence52.avif","raw sequence53.avif","raw sequence54.avif","raw sequence55.avif","raw sequence56.avif","raw sequence57.avif","raw sequence58.avif","raw sequence59.avif","raw sequence60.avif","raw sequence61.avif","raw sequence62.avif","raw sequence63.avif","raw sequence64.avif"]
const HOMEPAGE_CONNECTION_NAMES: string[] = ["02 sequence00 copy.avif","02 sequence01 copy.avif","02 sequence02 copy.avif","02 sequence03 copy.avif","02 sequence04 copy.avif","02 sequence05 copy.avif","02 sequence06 copy.avif","02 sequence07 copy.avif","02 sequence08 copy.avif","02 sequence09 copy.avif","02 sequence10 copy.avif","02 sequence11 copy.avif","02 sequence12 copy.avif","02 sequence13 copy.avif","02 sequence14 copy.avif","02 sequence15 copy.avif","02 sequence16 copy.avif","02 sequence17 copy.avif","02 sequence18 copy.avif","02 sequence19 copy.avif","02 sequence20 copy.avif","02 sequence21 copy.avif","02 sequence22 copy.avif","02 sequence23 copy.avif","02 sequence24 copy.avif","02 sequence25 copy.avif","02 sequence26 copy.avif","02 sequence27 copy.avif","02 sequence28 copy.avif","02 sequence29 copy.avif","02 sequence30 copy.avif","02 sequence31 copy.avif","02 sequence32 copy.avif","02 sequence33 copy.avif","02 sequence34 copy.avif","02 sequence35 copy.avif","02 sequence36 copy.avif","02 sequence37 copy.avif","02 sequence38 copy.avif","02 sequence39 copy.avif","02 sequence40 copy.avif","02 sequence41 copy.avif","02 sequence42 copy.avif","02 sequence43 copy.avif","02 sequence44 copy.avif","02 sequence45 copy.avif","02 sequence46 copy.avif","02 sequence47 copy.avif","02 sequence48 copy.avif","02 sequence49 copy.avif","02 sequence50 copy.avif","02 sequence51 copy.avif","02 sequence52 copy.avif","02 sequence53 copy.avif","02 sequence54 copy.avif","02 sequence55 copy.avif","02 sequence56 copy.avif","02 sequence57 copy.avif","02 sequence58 copy.avif","02 sequence59 copy.avif","02 sequence60 copy.avif","02 sequence61 copy.avif","02 sequence62 copy.avif","02 sequence63 copy.avif","02 sequence64 copy.avif","02 sequence65 copy.avif","02 sequence66 copy.avif","02 sequence67 copy.avif","02 sequence68 copy.avif","02 sequence69 copy.avif","02 sequence70 copy.avif","02 sequence71 copy.avif","02 sequence72 copy.avif"]
const HOMEPAGE_ORBIT_NAMES: string[] = ["adjusted sequence0000 copy.avif","adjusted sequence0001 copy.avif","adjusted sequence0002 copy.avif","adjusted sequence0003 copy.avif","adjusted sequence0004 copy.avif","adjusted sequence0005 copy.avif","adjusted sequence0006 copy.avif","adjusted sequence0007 copy.avif","adjusted sequence0008 copy.avif","adjusted sequence0009 copy.avif","adjusted sequence0010 copy.avif","adjusted sequence0011 copy.avif","adjusted sequence0012 copy.avif","adjusted sequence0013 copy.avif","adjusted sequence0014 copy.avif","adjusted sequence0015 copy.avif","adjusted sequence0016 copy.avif","adjusted sequence0017 copy.avif","adjusted sequence0018 copy.avif","adjusted sequence0019 copy.avif","adjusted sequence0020 copy.avif","adjusted sequence0021 copy.avif","adjusted sequence0022 copy.avif","adjusted sequence0023 copy.avif","adjusted sequence0024 copy.avif","adjusted sequence0025 copy.avif","adjusted sequence0026 copy.avif","adjusted sequence0027 copy.avif","adjusted sequence0028 copy.avif","adjusted sequence0029 copy.avif","adjusted sequence0030 copy.avif","adjusted sequence0031 copy.avif","adjusted sequence0032 copy.avif","adjusted sequence0033 copy.avif","adjusted sequence0034 copy.avif","adjusted sequence0035 copy.avif","adjusted sequence0036 copy.avif","adjusted sequence0037 copy.avif","adjusted sequence0038 copy.avif","adjusted sequence0039 copy.avif","adjusted sequence0040 copy.avif","adjusted sequence0041 copy.avif","adjusted sequence0042 copy.avif","adjusted sequence0043 copy.avif","adjusted sequence0044 copy.avif","adjusted sequence0045 copy.avif","adjusted sequence0046 copy.avif","adjusted sequence0047 copy.avif","adjusted sequence0048 copy.avif","adjusted sequence0049 copy.avif","adjusted sequence0050 copy.avif","adjusted sequence0051 copy.avif","adjusted sequence0052 copy.avif","adjusted sequence0053 copy.avif","adjusted sequence0054 copy.avif","adjusted sequence0055 copy.avif","adjusted sequence0056 copy.avif","adjusted sequence0057 copy.avif","adjusted sequence0058 copy.avif","adjusted sequence0059 copy.avif","adjusted sequence0060 copy.avif","adjusted sequence0061 copy.avif","adjusted sequence0062 copy.avif","adjusted sequence0063 copy.avif","adjusted sequence0064 copy.avif","adjusted sequence0065 copy.avif","adjusted sequence0066 copy.avif","adjusted sequence0067 copy.avif","adjusted sequence0068 copy.avif","adjusted sequence0069 copy.avif","adjusted sequence0070 copy.avif","adjusted sequence0071 copy.avif","adjusted sequence0072 copy.avif","adjusted sequence0073 copy.avif","adjusted sequence0074 copy.avif","adjusted sequence0075 copy.avif","adjusted sequence0076 copy.avif","adjusted sequence0077 copy.avif","adjusted sequence0078 copy.avif","adjusted sequence0079 copy.avif","adjusted sequence0080 copy.avif","adjusted sequence0081 copy.avif","adjusted sequence0082 copy.avif","adjusted sequence0083 copy.avif","adjusted sequence0084 copy.avif","adjusted sequence0085 copy.avif","adjusted sequence0086 copy.avif","adjusted sequence0087 copy.avif","adjusted sequence0088 copy.avif","adjusted sequence0089 copy.avif","adjusted sequence0090 copy.avif","adjusted sequence0091 copy.avif","adjusted sequence0092 copy.avif","adjusted sequence0093 copy.avif","adjusted sequence0094 copy.avif","adjusted sequence0095 copy.avif","adjusted sequence0096 copy.avif","adjusted sequence0097 copy.avif","adjusted sequence0098 copy.avif","adjusted sequence0099 copy.avif","adjusted sequence0100 copy.avif","adjusted sequence0101 copy.avif","adjusted sequence0102 copy.avif","adjusted sequence0103 copy.avif","adjusted sequence0104 copy.avif","adjusted sequence0105 copy.avif","adjusted sequence0106 copy.avif","adjusted sequence0107 copy.avif","adjusted sequence0108 copy.avif","adjusted sequence0109 copy.avif","adjusted sequence0110 copy.avif","adjusted sequence0111 copy.avif","adjusted sequence0112 copy.avif","adjusted sequence0113 copy.avif","adjusted sequence0114 copy.avif","adjusted sequence0115 copy.avif","adjusted sequence0116 copy.avif","adjusted sequence0117 copy.avif","adjusted sequence0118 copy.avif","adjusted sequence0119 copy.avif"]
const HOMEPAGE_MASK_NAMES: string[] = ["mask_CMasking_WireColor0000.png","mask_CMasking_WireColor0015.png","mask_CMasking_WireColor0030.png","mask_CMasking_WireColor0045.png","mask_CMasking_WireColor0060.png","mask_CMasking_WireColor0075.png","mask_CMasking_WireColor0090.png","mask_CMasking_WireColor0105.png"]
const HOMEPAGE_MASK_PALETTE: { id: string; maskColor: string; maskColorAliases?: string[] }[] = [{"id":"A001","maskColor":"#63BBF1","maskColorAliases":["#63BAF0"]},{"id":"A002","maskColor":"#F1BB63","maskColorAliases":["#F0BA63"]},{"id":"A003","maskColor":"#63F163","maskColorAliases":["#63F063"]},{"id":"A004","maskColor":"#F163F1","maskColorAliases":["#F063F0"]},{"id":"A005","maskColor":"#9763BB","maskColorAliases":["#9663BA","#9763BA"]},{"id":"A006","maskColor":"#BBD8BB","maskColorAliases":["#BAD7BA"]},{"id":"A101","maskColor":"#63BB97","maskColorAliases":["#63BA96","#63BA97"]},{"id":"A102","maskColor":"#63F1D8","maskColorAliases":["#63F0D7"]},{"id":"A103","maskColor":"#BB6363","maskColorAliases":["#BA6363"]},{"id":"A104","maskColor":"#BB97F1","maskColorAliases":["#BA96F0","#BA97F0"]},{"id":"A105","maskColor":"#BBF1F1","maskColorAliases":["#BAF0F0"]},{"id":"A106","maskColor":"#D897BB","maskColorAliases":["#D796BA","#D797BA"]},{"id":"A107","maskColor":"#D8F163","maskColorAliases":["#D7F063"]},{"id":"A201","maskColor":"#F1D8D8","maskColorAliases":["#F0D7D7"]},{"id":"A202","maskColor":"#6363F1","maskColorAliases":["#6363F0"]},{"id":"A203","maskColor":"#BBBB63","maskColorAliases":["#BABA63"]},{"id":"A204","maskColor":"#F16363","maskColorAliases":["#F06363"]},{"id":"A205","maskColor":"#636397","maskColorAliases":["#636396"]},{"id":"A301","maskColor":"#639763","maskColorAliases":["#639663"]},{"id":"A302","maskColor":"#6397BB","maskColorAliases":["#6396BA","#6397BA"]},{"id":"A303","maskColor":"#63D8BB","maskColorAliases":["#63D7BA"]},{"id":"A304","maskColor":"#979797","maskColorAliases":["#969696"]},{"id":"B001","maskColor":"#9797D8","maskColorAliases":["#9696D7","#9797D7"]},{"id":"B002","maskColor":"#97BBBB","maskColorAliases":["#96BABA","#97BABA"]},{"id":"B003","maskColor":"#97D863","maskColorAliases":["#96D763","#97D763"]},{"id":"B004","maskColor":"#97D8D8","maskColorAliases":["#96D7D7","#97D7D7"]},{"id":"B005","maskColor":"#97F197","maskColorAliases":["#96F096","#97F097"]},{"id":"B006","maskColor":"#BB63D8","maskColorAliases":["#BA63D7"]},{"id":"B101","maskColor":"#BBBBD8","maskColorAliases":["#BABAD7"]},{"id":"B102","maskColor":"#D86397","maskColorAliases":["#D76396","#D76397"]},{"id":"B103","maskColor":"#D89763","maskColorAliases":["#D79663","#D79763"]},{"id":"B104","maskColor":"#D8BB97","maskColorAliases":["#D7BA96","#D7BA97"]},{"id":"B105","maskColor":"#D8BBF1","maskColorAliases":["#D7BAF0"]},{"id":"B106","maskColor":"#D8F1BB","maskColorAliases":["#D7F0BA"]},{"id":"B107","maskColor":"#F163BB","maskColorAliases":["#F063BA"]},{"id":"B201","maskColor":"#F19797","maskColorAliases":["#F09696","#F09797"]},{"id":"B202","maskColor":"#F197D8","maskColorAliases":["#F096D7","#F097D7"]},{"id":"B203","maskColor":"#F1BBBB","maskColorAliases":["#F0BABA"]},{"id":"B204","maskColor":"#F1D897","maskColorAliases":["#F0D796","#F0D797"]},{"id":"B205","maskColor":"#F1F1F1","maskColorAliases":["#F0F0F0"]},{"id":"B206","maskColor":"#636363"},{"id":"B207","maskColor":"#6363BB","maskColorAliases":["#6363BA"]},{"id":"B301","maskColor":"#6363D8","maskColorAliases":["#6363D7"]},{"id":"B302","maskColor":"#639797","maskColorAliases":["#639696"]},{"id":"B303","maskColor":"#6397D8","maskColorAliases":["#6396D7","#6397D7"]},{"id":"B304","maskColor":"#6397F1","maskColorAliases":["#6396F0","#6397F0"]},{"id":"C001","maskColor":"#63BB63","maskColorAliases":["#63BA63"]},{"id":"C002","maskColor":"#63BBBB","maskColorAliases":["#63BABA"]},{"id":"C003","maskColor":"#63BBD8","maskColorAliases":["#63BAD7"]},{"id":"C004","maskColor":"#63D863","maskColorAliases":["#63D763"]},{"id":"C005","maskColor":"#63D897","maskColorAliases":["#63D796","#63D797"]},{"id":"C006","maskColor":"#63D8D8","maskColorAliases":["#63D7D7"]},{"id":"C007","maskColor":"#63D8F1","maskColorAliases":["#63D7F0"]},{"id":"C008","maskColor":"#63F197","maskColorAliases":["#63F096","#63F097"]},{"id":"C101","maskColor":"#63F1BB","maskColorAliases":["#63F0BA"]},{"id":"C102","maskColor":"#63F1F1","maskColorAliases":["#63F0F0"]},{"id":"C103","maskColor":"#976363","maskColorAliases":["#966363"]},{"id":"C104","maskColor":"#976397","maskColorAliases":["#966396"]},{"id":"C105","maskColor":"#9763D8","maskColorAliases":["#9663D7","#9763D7"]},{"id":"C106","maskColor":"#9763F1","maskColorAliases":["#9663F0","#9763F0"]},{"id":"C201","maskColor":"#979763","maskColorAliases":["#969663"]},{"id":"C202","maskColor":"#9797BB","maskColorAliases":["#9696BA","#9797BA"]},{"id":"C203","maskColor":"#9797F1","maskColorAliases":["#9696F0","#9797F0"]},{"id":"C204","maskColor":"#97BB63","maskColorAliases":["#96BA63","#97BA63"]},{"id":"C205","maskColor":"#97BB97","maskColorAliases":["#96BA96","#97BA97"]},{"id":"C301","maskColor":"#97BBD8","maskColorAliases":["#96BAD7","#97BAD7"]},{"id":"C302","maskColor":"#97BBF1","maskColorAliases":["#96BAF0","#97BAF0"]},{"id":"C303","maskColor":"#97D897","maskColorAliases":["#96D796","#97D797"]},{"id":"C304","maskColor":"#97D8BB","maskColorAliases":["#96D7BA","#97D7BA"]}]
const HOMEPAGE_MASK_VERSION = "e0d8174df3f4"
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
    maskPicking?: boolean; maskBaseUrl?: string; maskHighlightColor?: string; maskHighlightOpacity?: number
    maskAvailableColor?: string; maskNegotiationColor?: string; maskSoldColor?: string
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
const homepageMobileOrbitStyles = `
[data-admiral-homepage] button[data-orbit-fullscreen-open] { position:absolute; z-index:4; left:calc(var(--admiral-image-x, 0px) + var(--admiral-image-width, 100%) - 6px); top:calc(var(--admiral-image-y, 0px) + var(--admiral-image-height, 100%) - 6px); transform:translate(-100%,-100%); display:grid; place-items:center; width:44px; height:44px; min-height:44px; padding:0; appearance:none; border:0; border-radius:50%; background:transparent; color:#242824; cursor:pointer; touch-action:manipulation; -webkit-tap-highlight-color:transparent; }
[data-admiral-homepage] button[data-orbit-fullscreen-open]::before { content:""; position:absolute; inset:6px; border:1px solid rgba(255,255,255,.85); border-radius:50%; background:rgba(255,255,255,.95); box-shadow:0 2px 10px rgba(20,32,24,.14); transition:background .18s,box-shadow .18s; }
[data-admiral-homepage] button[data-orbit-fullscreen-open] svg { position:relative; width:15px; height:15px; }
[data-admiral-homepage] button[data-orbit-fullscreen-open]:focus-visible { outline:2px solid #242824; outline-offset:3px; }
[data-admiral-homepage] button[data-orbit-fullscreen-open]:active::before { background:#e9ede7; box-shadow:0 1px 4px rgba(20,32,24,.12); }
@media (hover:hover) and (pointer:fine) { [data-admiral-homepage] button[data-orbit-fullscreen-open]:hover::before { background:#fff; box-shadow:0 3px 12px rgba(20,32,24,.2); } }
@media (prefers-reduced-motion:reduce) { [data-admiral-homepage] button[data-orbit-fullscreen-open]::before { transition:none; } }
`
function homepageBlocked(target: EventTarget | null) {
    return target instanceof Element && !!target.closest("nav,header,a,button,input,textarea,select,[contenteditable]:not([contenteditable='false']),[role='button'],[role='link'],[data-orbit-ignore],[data-homepage-controls]")
}
function homepageSelfLink(event: MouseEvent): HTMLAnchorElement | null {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return null
    const link = event.composedPath().find(node => node instanceof HTMLAnchorElement) as HTMLAnchorElement | undefined
    if (!link || !link.hasAttribute("href") || link.hasAttribute("download") || link.closest("[inert],[aria-disabled='true']")) return null
    const target = (link.getAttribute("target") || document.querySelector("base[target]")?.getAttribute("target") || "").toLowerCase()
    if (target && target !== "_self") return null
    try {
        const destination = new URL(link.href, location.href), current = new URL(location.href)
        const path = (url: URL) => url.pathname.replace(/\/+$/, "") || "/"
        // Only a link to this page's opening view is a Home action. Section links,
        // other pages, query changes and new tabs retain their normal navigation.
        return destination.origin === current.origin && path(destination) === path(current) && destination.search === current.search &&
            (!destination.hash || destination.hash.toLowerCase() === "#top") ? link : null
    } catch { return null }
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
                // Checkpoint groups cannot appear during either approach flight.
                // Stage changes already notify every subscriber, so no geometry
                // or ancestor styles are needed to keep these groups hidden.
                if (![...homepageChannels.values()].some(channel => channel.stage === "orbit" && channel.story.enabled)) {
                    if (state !== "hidden" || target || opacity !== 0 || timer || frame) hide()
                    restoreLayout()
                    return
                }
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

// Shared facade and orbitdata availability language. Framer colour controls set
// the custom properties on the viewer; the fallbacks also work in isolated UI.
const ORBIT_AVAILABILITY_COLORS = { available: "#46A66A", under_negotiation: "#E2B849", reserved: "#E2B849", sold: "#DA5961", unknown: "#A8AFB4" } as const
function orbitAvailabilityColor(status: string | undefined): string {
    return status === "available" ? "var(--orbit-available-color,#46A66A)" : status === "sold" ? "var(--orbit-sold-color,#DA5961)" : status === "under_negotiation" || status === "reserved" ? "var(--orbit-negotiation-color,#E2B849)" : "#A8AFB4"
}
const orbitDataDividerStyles = `
[data-orbitdata-divider] { position:absolute; z-index:0; top:var(--orbitdata-divider-y,0px); height:1px; background:rgba(255,255,255,.62); pointer-events:none !important; opacity:1; transition:opacity 240ms ease; }
[data-orbitdata-divider="left"] { left:0; width:var(--orbitdata-divider-left,0px); }
[data-orbitdata-divider="right"] { left:var(--orbitdata-divider-right,100%); right:0; }
[data-orbitdata-divider][data-info-visible="false"] { opacity:0; }
@media (prefers-reduced-motion:reduce) { [data-orbitdata-divider] { transition:none; } }
`
function useOrbitDataDividers(root: React.RefObject<HTMLElement | null>, selector: string, revision: string): void {
    React.useEffect(() => {
        const host = root.current, plan = host?.querySelector<HTMLElement>(selector)
        if (!host || !plan) return
        // offset geometry remains in layout coordinates when the phone's entire
        // fullscreen surface is rotated. A screen-space rect would swap axes.
        const measure = () => {
            let node: HTMLElement | null = plan, left = 0, top = 0
            while (node && node !== host) { left += node.offsetLeft; top += node.offsetTop; node = node.offsetParent as HTMLElement | null }
            if (node !== host) return
            host.style.setProperty("--orbitdata-divider-y", `${top + plan.offsetHeight / 2}px`)
            host.style.setProperty("--orbitdata-divider-left", `${Math.max(0,left - 16)}px`)
            host.style.setProperty("--orbitdata-divider-right", `${Math.min(host.clientWidth,left + plan.offsetWidth + 16)}px`)
        }
        measure()
        if (typeof ResizeObserver !== "undefined") {
            const observer = new ResizeObserver(measure); observer.observe(host); observer.observe(plan)
            return () => observer.disconnect()
        }
        window.addEventListener("resize", measure)
        return () => window.removeEventListener("resize", measure)
    }, [root,selector,revision])
}
// One mounted record fades through to the latest pointer target. Keeping a
// single plan avoids decoding two large drawings just to crossfade their UI.
interface OrbitDataTransition<T> { displayed: T | null; key: string | null; phase: "empty" | "in" | "out" | "visible"; visible: boolean }
function useOrbitDataTransition<T>(value: T | null, key: string | null, { moving = false, enabled = true }: { moving?: boolean; enabled?: boolean } = {}) {
    const initial: OrbitDataTransition<T> = { displayed: value, key: value ? key : null, phase: value ? "visible" : "empty", visible: !!value }
    const [state, setState] = React.useState(initial)
    const stateRef = React.useRef(state), latest = React.useRef({ value, key, moving, enabled })
    latest.current = { value, key: value ? key : null, moving, enabled }
    const alive = React.useRef(false), wasMoving = React.useRef(moving)
    const timer = React.useRef<number | null>(null), frame = React.useRef<number | null>(null)
    const [reduced, setReduced] = React.useState(() => typeof window !== "undefined" && !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches)
    const cancel = () => { if (timer.current !== null) window.clearTimeout(timer.current); if (frame.current !== null) window.cancelAnimationFrame(frame.current); timer.current = frame.current = null }
    const commit = (next: OrbitDataTransition<T>) => {
        if (!alive.current) return
        const old = stateRef.current
        if (old.displayed === next.displayed && old.key === next.key && old.phase === next.phase && old.visible === next.visible) return
        stateRef.current = next; setState(next)
    }
    const empty = () => commit({ displayed: null, key: null, phase: "empty", visible: false })
    const finishIn = () => {
        timer.current = window.setTimeout(() => { timer.current = null; const current = stateRef.current; if (current.phase === "in") commit({ ...current, phase: "visible", visible: true }) }, 180)
    }
    const enter = (next: T, nextKey: string | null, alreadyMounted = false) => {
        cancel(); commit({ displayed: next, key: nextKey, phase: "in", visible: alreadyMounted })
        if (alreadyMounted) finishIn()
        else frame.current = window.requestAnimationFrame(() => {
            frame.current = window.requestAnimationFrame(() => {
                frame.current = null
                if (!alive.current || stateRef.current.phase !== "in") return
                commit({ ...stateRef.current, visible: true }); finishIn()
            })
        })
    }
    React.useEffect(() => {
        alive.current = true
        const query = window.matchMedia?.("(prefers-reduced-motion: reduce)")
        const change = () => setReduced(!!query?.matches)
        change(); query?.addEventListener?.("change", change)
        return () => { alive.current = false; cancel(); query?.removeEventListener?.("change", change) }
    }, [])
    // Deliberately reconcile every committed render: a floorplan URL can become
    // ready without changing its apartment ID. Active fades never restart for
    // that update, and a rapid A -> B -> C pass consumes only the latest target.
    React.useEffect(() => {
        const target = latest.current, current = stateRef.current
        if (!target.enabled) { cancel(); wasMoving.current = target.moving; empty(); return }
        if (target.moving) {
            cancel(); wasMoving.current = true
            const retained = current.displayed || target.value
            commit({ displayed: retained, key: current.displayed ? current.key : target.key, phase: retained ? "visible" : "empty", visible: !!retained })
            return
        }
        if (wasMoving.current || reduced) {
            cancel(); wasMoving.current = false
            commit({ displayed: target.value, key: target.key, phase: target.value ? "visible" : "empty", visible: !!target.value })
            return
        }
        if (current.key === target.key) {
            if (!target.value) { cancel(); empty(); return }
            if (current.phase === "out") { enter(target.value, target.key, true); return }
            commit({ ...current, displayed: target.value })
            // Recover cancelled scheduling when React remounts effects in StrictMode.
            if (current.phase === "in" && timer.current === null && frame.current === null) enter(target.value, target.key, true)
            return
        }
        if (!current.displayed) { if (target.value) enter(target.value, target.key); return }
        if (current.phase === "out" && timer.current !== null) return
        cancel(); commit({ ...current, phase: "out", visible: false })
        timer.current = window.setTimeout(() => {
            timer.current = null
            const next = latest.current
            if (!next.enabled) { empty(); return }
            if (next.moving) return
            if (next.value) enter(next.value, next.key)
            else empty()
        }, 180)
    })
    // Suppress the departing record on the arrival render itself, before the
    // passive effect clears retained state and the camera panel starts fading in.
    const arriving = wasMoving.current && !moving
    return { displayed: arriving ? value : state.displayed,
        phase: arriving ? value ? "visible" as const : "empty" as const : state.phase,
        visible: arriving ? !!value : state.visible,
        interactive: enabled && !moving && !!value && (arriving || key === state.key && state.phase === "visible") }
}
interface OrbitApartmentImage {
    thumbnail?: string
    full: string
    label?: string
    isIllustrative?: boolean
    original?: string
}
interface OrbitApartmentRecord {
    id: string
    maskColor?: string
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
        const sourceMaskColor = text(apartment.maskColor, 64)
        const maskColor = sourceMaskColor && /^#[0-9a-fA-F]{6}$/.test(sourceMaskColor) ? sourceMaskColor.toUpperCase() : null
        const sourceSheet = object(sourceMedia?.datasheet), sheetUrl = text(sourceSheet?.url, 4096)
        const media = { ...(plan ? { floorplan: plan } : {}), ...(floorLayout ? { floorLayout } : {}),
            ...(sheetUrl ? { datasheet: { url: sheetUrl, ...(text(sourceSheet?.filename) ? { filename: text(sourceSheet?.filename)! } : {}),
                ...(text(sourceSheet?.label) ? { label: text(sourceSheet?.label)! } : {}),
                ...(typeof sourceSheet?.page === "number" && Number.isSafeInteger(sourceSheet.page) && sourceSheet.page > 0 ? { page: sourceSheet.page } : {}) } } : {}) }
        return { id, ...(maskColor ? { maskColor } : {}), name: text(apartment.name) || id, building: text(apartment.building, 64) || "", floor,
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

function orbitApartmentPlan(record: OrbitApartmentRecord, dataset: OrbitApartmentDataset, base: string, view: "floorplan" | "floorLayout" = "floorplan", preferThumbnail = false): OrbitApartmentPlan | null {
    const source = view === "floorLayout" ? record.media?.floorLayout : record.media?.floorplan
    const thumbnail = preferThumbnail ? orbitApartmentAssetUrl(source?.thumbnail, base) : null
    const url = thumbnail || orbitApartmentAssetUrl(source?.full || (view === "floorplan" ? record.floorplan : null), base)
    if (!url) return null
    const layout = view === "floorplan" && record.apartmentType ? dataset.roomLayouts[record.apartmentType] : null
    const dimensions = layout?.imageDimensions || (view === "floorLayout" ? { width: 2560, height: 1600 } : { width: 1500, height: 2000 })
    const viewBox = layout?.viewBox || { x: 0, y: 0, width: 1, height: 1 }
    const aspect = dimensions.width * viewBox.width / (dimensions.height * viewBox.height)
    // The existing thumbnails already contain the plan crop; applying it twice cuts
    // away rooms. Retain the drawing's cropped aspect while showing the whole thumb.
    return { url, aspect, dimensions: thumbnail ? { width: dimensions.width * viewBox.width, height: dimensions.height * viewBox.height } : dimensions,
        viewBox: thumbnail ? { x: 0, y: 0, width: 1, height: 1 } : viewBox,
        isIllustrative: view === "floorplan" && source?.isIllustrative !== false,
        label: source?.label || (view === "floorLayout" ? "Szintrajz" : "Alaprajz · illusztráció") }
}

// A fast pointer pass updates apartment text immediately without starting a large
// drawing request for every crossed unit. Cache URL readiness, not decoded images.
const orbitPreviewImageReady = new Set<string>()
const orbitPreviewImageRequests = new Map<string, Promise<void>>()
function requestOrbitPreviewImage(url: string): Promise<void> {
    if (orbitPreviewImageReady.has(url)) return Promise.resolve()
    const previous = orbitPreviewImageRequests.get(url)
    if (previous) return previous
    const request = new Promise<void>((resolve, reject) => {
        const image = new Image()
        image.decoding = "async"
        let finished = false
        const finish = (error?: Error) => {
            if (finished) return
            finished = true; image.onload = null; image.onerror = null
            if (error) reject(error)
            else resolve()
        }
        image.onerror = () => finish(new Error("Apartment floorplan could not be loaded."))
        image.onload = () => {
            if (typeof image.decode === "function") image.decode().then(() => finish(), () => finish(new Error("Apartment floorplan could not be decoded.")))
            else finish()
        }
        image.src = url
    }).then(() => {
        orbitPreviewImageReady.add(url)
        if (orbitPreviewImageReady.size > 96) orbitPreviewImageReady.delete(orbitPreviewImageReady.values().next().value!)
    }).finally(() => { orbitPreviewImageRequests.delete(url) })
    orbitPreviewImageRequests.set(url, request)
    return request
}
function useOrbitPreviewImage(url: string | null | undefined, enabled = true): string | null {
    const requested = enabled && url ? url : null
    const [ready, setReady] = React.useState<string | null>(null)
    React.useEffect(() => {
        if (!requested) { setReady(null); return }
        if (orbitPreviewImageReady.has(requested)) { setReady(requested); return }
        let active = true
        setReady(null)
        const timer = setTimeout(() => {
            requestOrbitPreviewImage(requested).then(() => { if (active) setReady(requested) }, () => { if (active) setReady(null) })
        }, 160)
        return () => { active = false; clearTimeout(timer) }
    }, [requested])
    // Do not show an old apartment's floorplan during the effect's next tick.
    return requested && (ready === requested || orbitPreviewImageReady.has(requested)) ? requested : null
}

const orbitApartmentRequests = new Map<string, Promise<OrbitApartmentDataset>>()
const orbitApartmentCache = new Map<string, { dataset: OrbitApartmentDataset; refreshedAt: number }>()
const orbitApartmentSubscribers = new Map<string, Set<(dataset: OrbitApartmentDataset) => void>>()
const ORBIT_APARTMENT_FRESH_MS = 60_000
function orbitApartmentRequestUrl(value: string): string | null {
    if (!value.trim()) return null
    try {
        const url = new URL(value.trim(), typeof document !== "undefined" ? document.baseURI : "https://admiralpark.hu/")
        return url.protocol === "http:" || url.protocol === "https:" ? url.href : null
    } catch { return null }
}
function requestOrbitApartmentDataset(url: string, force = false): Promise<OrbitApartmentDataset> {
    const pending = orbitApartmentRequests.get(url)
    if (pending) return pending
    const cached = orbitApartmentCache.get(url)
    if (!force && cached && Date.now() - cached.refreshedAt < ORBIT_APARTMENT_FRESH_MS) return Promise.resolve(cached.dataset)
    const cancellation = new AbortController(), timeout = setTimeout(() => cancellation.abort(), 15_000)
    const request = fetch(url, { mode: "cors", credentials: "omit", cache: "no-cache", signal: cancellation.signal,
        headers: { Accept: "application/json" } }).then(response => {
        if (!response.ok) throw new Error(`Apartment data could not be loaded (${response.status}).`)
        return response.json()
    }).then(parseOrbitApartmentDataset).then(parsed => {
        // Retain object identity on unchanged refreshes, avoiding unnecessary
        // filter, hover and card rebuilds every minute.
        const dataset = cached && JSON.stringify(cached.dataset) === JSON.stringify(parsed) ? cached.dataset : parsed
        orbitApartmentCache.set(url, { dataset, refreshedAt: Date.now() })
        // A handful of custom URLs must not accumulate cached datasets forever.
        if (orbitApartmentCache.size > 8) for (const key of orbitApartmentCache.keys()) {
            if (key !== url && !orbitApartmentSubscribers.get(key)?.size) { orbitApartmentCache.delete(key); break }
        }
        orbitApartmentSubscribers.get(url)?.forEach(listener => listener(dataset))
        return dataset
    }).finally(() => {
        clearTimeout(timeout)
        if (orbitApartmentRequests.get(url) === request) orbitApartmentRequests.delete(url)
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
        const accept = (dataset: OrbitApartmentDataset) => {
            if (active) setState(previous => previous.url === resolved && previous.dataset === dataset && previous.status === "ready" && !previous.error ? previous : { url: resolved, dataset, status: "ready", error: "" })
        }
        let subscribers = orbitApartmentSubscribers.get(resolved)
        if (!subscribers) { subscribers = new Set(); orbitApartmentSubscribers.set(resolved, subscribers) }
        subscribers.add(accept)
        const load = (force = false) => {
            if (!active) return
            setState(previous => previous.url === resolved && previous.dataset ? previous : { url: resolved, dataset: null, status: "loading", error: "" })
            requestOrbitApartmentDataset(resolved, force).then(accept, error => {
                if (active) setState(previous => previous.url === resolved && previous.dataset ? { ...previous, error: error instanceof Error ? error.message : "Apartment data could not be refreshed." } :
                    { url: resolved, dataset: null, status: "error", error: error instanceof Error ? error.message : "Apartment data could not be loaded." })
            })
        }
        const refresh = () => { if (!document.hidden) load() }
        load(attempt > 0)
        const interval = window.setInterval(refresh, ORBIT_APARTMENT_FRESH_MS)
        document.addEventListener("visibilitychange", refresh)
        window.addEventListener("focus", refresh); window.addEventListener("pageshow", refresh)
        return () => {
            active = false; subscribers!.delete(accept)
            if (!subscribers!.size) orbitApartmentSubscribers.delete(resolved)
            window.clearInterval(interval); document.removeEventListener("visibilitychange", refresh)
            window.removeEventListener("focus", refresh); window.removeEventListener("pageshow", refresh)
        }
    }, [resolved, url, enabled, attempt])
    const retry = React.useCallback(() => { setAttempt(value => value + 1) }, [])
    if (!enabled) return { dataset: state.url === resolved ? state.dataset : null, status: "idle", error: "", retry }
    if (state.url !== (resolved || url.trim())) return { dataset: null, status: "loading", error: "", retry }
    return { dataset: state.dataset, status: state.status, error: state.error, retry }
}

type OrbitFilterStatus = "available" | "under_negotiation" | "sold";

interface OrbitApartmentFilters {
    statuses: OrbitFilterStatus[];
    priceMin: number | null;
    priceMax: number | null;
    /** Optional for compatibility with previously saved price/status filters. */
    areaMin?: number | null;
    areaMax?: number | null;
}

interface OrbitFilterApartment {
    id: string;
    status: string;
    price: number | null;
    /** Missing currency follows the apartment dataset's HUF default. */
    currency?: string | null;
    areaInterior?: number | null;
}

interface OrbitPriceBounds {
    min: number;
    max: number;
    step: number;
    pricedCount: number;
    currency: "HUF";
}

interface OrbitAreaBounds {
    min: number;
    max: number;
    step: number;
    areaCount: number;
    unit: "m²";
}

interface OrbitApartmentFilterResult {
    /** False means the renderer should highlight only the hovered apartment. */
    active: boolean;
    matchingIds: string[];
    filters: OrbitApartmentFilters;
}

const orbitFilterStatuses: OrbitFilterStatus[] = ["available", "under_negotiation", "sold"];
const orbitFilterPriceStep = 1000000;

function orbitFilterArea(apartment: OrbitFilterApartment): number | null {
    return typeof apartment.areaInterior === "number" && Number.isFinite(apartment.areaInterior) && apartment.areaInterior >= 0
        ? apartment.areaInterior : null;
}

function orbitFilterHufPrice(apartment: OrbitFilterApartment): number | null {
    const currency = apartment.currency;
    const isHuf = currency === undefined || currency === null ||
        (typeof currency === "string" && currency.trim().toUpperCase() === "HUF");
    return isHuf && typeof apartment.price === "number" && Number.isFinite(apartment.price) && apartment.price >= 0
        ? apartment.price : null;
}

/** The complete HUF range stays stable when availability choices change. */
function getOrbitPriceBounds(apartments: readonly OrbitFilterApartment[]): OrbitPriceBounds | null {
    let minimum = Infinity, maximum = -Infinity, pricedCount = 0;
    for (const apartment of apartments) {
        const price = orbitFilterHufPrice(apartment);
        if (price === null) continue;
        minimum = Math.min(minimum, price);
        maximum = Math.max(maximum, price);
        pricedCount++;
    }
    if (!pricedCount) return null;
    return {
        min: Math.floor(minimum / orbitFilterPriceStep) * orbitFilterPriceStep,
        max: Math.ceil(maximum / orbitFilterPriceStep) * orbitFilterPriceStep,
        step: orbitFilterPriceStep,
        pricedCount,
        currency: "HUF",
    };
}

/** Interior area uses the complete dataset and outward one-square-metre bounds. */
function getOrbitAreaBounds(apartments: readonly OrbitFilterApartment[]): OrbitAreaBounds | null {
    let minimum = Infinity, maximum = -Infinity, areaCount = 0;
    for (const apartment of apartments) {
        const area = orbitFilterArea(apartment);
        if (area === null) continue;
        minimum = Math.min(minimum, area);
        maximum = Math.max(maximum, area);
        areaCount++;
    }
    return areaCount ? { min: Math.floor(minimum), max: Math.ceil(maximum), step: 1, areaCount, unit: "m²" } : null;
}

/** Canonicalize without modifying slider state or the original apartment data. */
function normalizeOrbitFilters(
    filters: Partial<OrbitApartmentFilters> | null | undefined,
    bounds?: OrbitPriceBounds | null,
    areaBounds?: OrbitAreaBounds | null,
): OrbitApartmentFilters {
    const selected = Array.isArray(filters?.statuses) ? filters.statuses : [];
    const statuses = orbitFilterStatuses.filter(status => selected.includes(status));
    const limit = (value: unknown) => typeof value === "number" && Number.isFinite(value) ? Math.max(0, value) : null;
    const range = (minimum: unknown, maximum: unknown, rangeBounds?: { min: number; max: number } | null): [number | null, number | null] => {
        let min = limit(minimum), max = limit(maximum);
        if (min !== null && max !== null && min > max) [min, max] = [max, min];
        if (rangeBounds === null) return [null, null];
        if (rangeBounds) {
            const low = limit(rangeBounds.min), high = limit(rangeBounds.max);
            if (low === null || high === null || high < low) return [null, null];
            const clamp = (value: number) => Math.min(high, Math.max(low, value));
            if (min !== null) min = clamp(min);
            if (max !== null) max = clamp(max);
            // Full span means unrestricted, so records without this value remain eligible.
            if (min !== null && min <= low) min = null;
            if (max !== null && max >= high) max = null;
        }
        return [min, max];
    };
    const [priceMin, priceMax] = range(filters?.priceMin, filters?.priceMax, bounds);
    const result: OrbitApartmentFilters = { statuses, priceMin, priceMax };
    if (filters && ("areaMin" in filters || "areaMax" in filters)) {
        const [areaMin, areaMax] = range(filters.areaMin, filters.areaMax, areaBounds);
        result.areaMin = areaMin; result.areaMax = areaMax;
    }
    return result;
}

/** Statuses are ORed; inclusive price and interior-area limits are ANDed. */
function getOrbitFilterResult(
    apartments: readonly OrbitFilterApartment[],
    filters: Partial<OrbitApartmentFilters> | null | undefined,
    bounds: OrbitPriceBounds | null = getOrbitPriceBounds(apartments),
    areaBounds: OrbitAreaBounds | null = getOrbitAreaBounds(apartments),
): OrbitApartmentFilterResult {
    const normalized = normalizeOrbitFilters(filters, bounds, areaBounds);
    const hasStatusFilter = normalized.statuses.length > 0;
    const hasPriceFilter = normalized.priceMin !== null || normalized.priceMax !== null;
    const hasAreaFilter = normalized.areaMin != null || normalized.areaMax != null;
    const active = hasStatusFilter || hasPriceFilter || hasAreaFilter;
    const matchingIds: string[] = [];
    for (const apartment of apartments) {
        if (hasStatusFilter && !normalized.statuses.includes(apartment.status as OrbitFilterStatus)) continue;
        if (hasPriceFilter) {
            const price = orbitFilterHufPrice(apartment);
            if (price === null || (normalized.priceMin !== null && price < normalized.priceMin) ||
                (normalized.priceMax !== null && price > normalized.priceMax)) continue;
        }
        if (hasAreaFilter) {
            const area = orbitFilterArea(apartment);
            if (area === null || (normalized.areaMin != null && area < normalized.areaMin) ||
                (normalized.areaMax != null && area > normalized.areaMax)) continue;
        }
        matchingIds.push(apartment.id);
    }
    return { active, matchingIds, filters: normalized };
}

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
    moving?: boolean
    filters: OrbitApartmentFilters
    filterBounds: OrbitPriceBounds | null
    filterAreaBounds?: OrbitAreaBounds | null
    filterActive: boolean
    filterCount: number
    onFiltersChange: (filters: OrbitApartmentFilters) => void
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
[data-orbit-studio][data-mobile="false"] .orbit-studio-header { flex-wrap: wrap; row-gap: 12px; }
[data-orbit-studio] [data-orbit-studio-filters] { flex: 1 0 100%; width: 100%; min-width: 0; }
[data-orbit-studio][data-mobile="false"] [data-orbit-filter-status], [data-orbit-studio][data-mobile="false"] [data-orbit-price-toggle] { font-size: 12px; }
[data-orbit-studio] .orbit-studio-preview { display: flex; align-items: center; gap: 10px; min-width: 0; font-size: 10px; color: var(--studio-muted); }
[data-orbit-studio] .orbit-studio-preview label { white-space: nowrap; }
[data-orbit-studio] select { width: 98px; max-width: 100%; min-height: 38px; padding: 5px 24px 5px 10px; border: 1px solid var(--studio-line); border-radius: 0; background: transparent; font-size: 12px; }
[data-orbit-studio] .orbit-studio-heading { display: flex; align-items: center; gap: 20px; min-width: 0; }
[data-orbit-studio] .orbit-studio-id { margin: 0; font-size: clamp(27px,3vw,44px); font-weight: 700; line-height: 1; letter-spacing: -.065em; }
[data-orbit-studio] .orbit-studio-status { display: inline-flex; align-items: center; gap: 8px; color: var(--studio-muted); font-size: 12px; font-weight: 500; line-height: 1.4; }
[data-orbit-studio] .orbit-studio-status-dot { position: relative; display: block; width: 6px; height: 6px; border-radius: 50%; background: currentColor; flex-shrink: 0; }
[data-orbit-studio] .orbit-studio-status[data-status="available"] { color: #35764c; color: color-mix(in srgb,var(--orbit-available-color,#46A66A) 65%,#263b32); }
[data-orbit-studio] .orbit-studio-status[data-status="available"] .orbit-studio-status-dot::after { position: absolute; content: ""; inset: -3px; border: 1px solid currentColor; border-radius: 50%; animation: orbitStudioAvailablePulse 2.4s ease-out infinite; }
[data-orbit-studio] .orbit-studio-status[data-status="under_negotiation"],[data-orbit-studio] .orbit-studio-status[data-status="reserved"] { color: #79723c; color: color-mix(in srgb,var(--orbit-negotiation-color,#E2B849) 45%,#263b32); }
[data-orbit-studio] .orbit-studio-status[data-status="sold"] { color: #ae4f56; color: color-mix(in srgb,var(--orbit-sold-color,#DA5961) 75%,#263b32); }
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
[data-orbit-studio] .orbit-studio-areas dd { margin: 0; font-size: clamp(24px,2.4vw,36px); font-weight: 700; line-height: 1; letter-spacing: -.045em; white-space: nowrap; }
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
/* Fade the record in place; the logo, preview selector and filters stay steady. */
[data-orbit-studio] [data-orbitdata-transition] { opacity: 1; transition: opacity .18s ease; }
[data-orbit-studio] [data-orbitdata-transition][data-orbitdata-visible="false"] { opacity: 0; pointer-events: none; }
/* Keep the scene geometry stable while checkpoint information fades away. */
[data-orbit-studio][data-moving="true"] [data-orbitdata-transition] { opacity: 0; pointer-events: none; }

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
/* Phones keep the complete orbit above a compact apartment summary. */
[data-orbit-studio][data-mobile="true"] {
    container-name: orbit-studio-mobile; container-type: size; overflow: hidden;
    padding: 8px 12px max(10px,env(safe-area-inset-bottom,0px)); gap: 6px;
    grid-template-rows: auto auto minmax(0,1fr); text-align: left;
}
[data-orbit-studio][data-mobile="true"] .orbit-studio-header { display: flex; align-items: center; justify-content: center; gap: 0; min-height: 0; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-brand { width: 160px; height: auto; max-width: 52cqw; }
[data-orbit-studio][data-mobile="true"] > [data-orbit-filters] { z-index: 5; }
[data-orbit-studio][data-mobile="true"] > [data-orbit-filters] [data-orbit-range-popover] { top: var(--orbit-mobile-popup-top,calc(-100% - 7px)); bottom: auto; }
[data-orbit-studio][data-mobile="true"] > [data-orbit-filters] [data-orbit-range-popover] { height: 64px; padding: 7px 10px; }
[data-orbit-studio][data-mobile="true"] > [data-orbit-filters] .orbit-filter-price-values { height: 15px; font-size: 10px; }
[data-orbit-studio][data-mobile="true"] > [data-orbit-filters] .orbit-filter-price-stage { height: 28px; margin-top: 3px; }
[data-orbit-studio][data-mobile="true"] > [data-orbit-filters] input[type="range"] { height: 28px; }
[data-orbit-studio][data-mobile="true"] > [data-orbit-filters] :is(.orbit-filter-price-track,.orbit-filter-price-selection) { top: 13px; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-body { display: grid; grid-template-columns: minmax(0,1fr); grid-template-rows: calc((100cqw + 24px) * 1010 / 1920) minmax(0,1fr); gap: 8px; overflow: hidden; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-scene { display: contents; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-image-slot { position: relative; order: 0; width: calc(100% + 24px); height: 100%; margin-inline: -12px; aspect-ratio: 1920 / 1010; container-type: inline-size; }
[data-orbit-studio][data-mobile="true"] [data-orbit-viewport] { position: absolute; inset: 0; width: 100%; height: 100%; max-height: none; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-panel { display: grid; grid-template-columns: minmax(0,1.5fr) minmax(0,1fr); grid-template-rows: auto minmax(0,1fr); gap: 8px 10px; min-width: 0; min-height: 0; height: min(100%,calc(max(200px,(100cqw - 10px) * .6 / var(--studio-plan-aspect,1)) + 36px)); align-self: center; overflow: hidden; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-panel > .orbit-studio-heading { grid-column: 1 / -1; justify-content: flex-start; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-plan { display: flex; flex-direction: column; justify-content: center; gap: 6px; min-width: 0; min-height: 0; margin: 0; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-plan > :is(figcaption,p) { flex-shrink: 0; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-eyebrow { margin: 0; color: var(--studio-muted); font-size: 10px; font-weight: 500; line-height: 1.4; letter-spacing: .07em; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-plan-button { display: grid; flex: 0 1 auto; min-width: 0; min-height: 0; width: 100%; aspect-ratio: var(--studio-plan-aspect,1); padding: 0; border: 0; border-radius: 8px; background: rgba(255,255,255,.45); text-align: left; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-plan-stage { width: 100%; height: 100%; min-height: 0; flex: auto; padding: 0; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-plan-note { margin: 0; font-size: 8px; line-height: 1.4; text-align: left; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-summary { display: flex; flex-direction: column; justify-content: center; align-items: stretch; gap: 7px; min-width: 0; min-height: 0; text-align: left; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-heading { display: flex; align-items: center; flex-wrap: nowrap; gap: 7px; min-width: 0; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-id { flex: 0 0 auto; margin: 0; font-size: 28px; line-height: 1; font-weight: 700; letter-spacing: -.045em; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-id small { margin-left: 5px; color: var(--studio-muted); font-size: 10px; font-weight: 400; letter-spacing: 0; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-status { flex: 0 1 auto; min-width: 0; font-size: 10px; line-height: 1.35; font-weight: 500; gap: 5px; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-status-text { display: block; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-metrics { display: grid; grid-template-columns: minmax(0,1fr); gap: 6px; margin: 0; min-width: 0; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-metrics > div { display: flex; align-items: baseline; justify-content: space-between; flex-wrap: wrap; gap: 2px 5px; min-width: 0; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-metrics > div:first-child { grid-column: 1 / -1; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-metrics dt { margin: 0; color: var(--studio-muted); font-size: 10px; font-weight: 400; line-height: 1.4; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-metrics dd { margin: 0; color: #263b32; font-size: 14px; font-weight: 700; line-height: 1.2; letter-spacing: -.025em; white-space: nowrap; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-metrics > div:first-child dd { font-size: 21px; line-height: 1.1; letter-spacing: -.05em; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-metrics small { margin-left: 2px; color: var(--studio-muted); font-size: 9px; font-weight: 400; letter-spacing: 0; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-metrics > div:first-child small { margin-left: 4px; font-size: 11px; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-meta { display: flex; align-items: baseline; justify-content: flex-start; flex-wrap: wrap; gap: 2px 7px; margin: 0; padding-top: 6px; border-top: 1px solid var(--studio-line); color: var(--studio-muted); font-size: 10px; line-height: 1.45; text-align: left; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-meta strong { color: var(--studio-ink); font-weight: 500; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-actions { display: block; min-width: 0; margin: 0; padding-top: 6px; border-top: 1px solid var(--studio-line); }
[data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-actions .orbit-studio-bottom { display: flex; flex-direction: column; justify-content: flex-start; align-items: stretch; margin: 0; gap: 7px; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-actions .orbit-studio-secondary { display: none; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-label { margin-bottom: 4px; font-size: 9px; line-height: 1.3; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-price-value { font-size: 18px; line-height: 1.1; font-weight: 500; letter-spacing: -.035em; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-price-value small { font-size: 11px; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-price-value.orbit-studio-price-empty { font-size: 12px; line-height: 1.4; font-weight: 400; letter-spacing: 0; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-primary { flex: 0 0 auto; min-height: 44px; padding: 10px 12px; gap: 8px; border: 1px solid #263b32; border-radius: 999px; color: #fff; background: #263b32; box-shadow: 0 3px 10px rgba(29,52,42,.1); font-size: 12px; font-weight: 500; transition: background .18s,box-shadow .18s; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-primary svg { width: 16px; height: 16px; flex-shrink: 0; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-primary:hover { background: #344e41; box-shadow: 0 4px 12px rgba(29,52,42,.16); }
[data-orbit-studio][data-mobile="true"] .orbit-studio-primary:active { background: #1c2e25; box-shadow: none; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-panel > .orbit-studio-empty { grid-column: 1 / -1; padding: 12px 0; }
@container orbit-studio-mobile (max-height: 560px) and (max-aspect-ratio: 1/1) {
    [data-orbit-studio][data-mobile="true"] .orbit-studio-brand { width: 116px; }
    [data-orbit-studio][data-mobile="true"] .orbit-studio-body { gap: 4px; }
    [data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-panel { grid-template-columns: minmax(0,1.5fr) minmax(0,1fr); grid-template-rows: auto minmax(0,1fr); gap: 4px 8px; height: 100%; max-height: 220px; }
    [data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-panel > .orbit-studio-heading { grid-column: 2; grid-row: 1; align-self: end; }
    [data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-plan { grid-column: 1; grid-row: 1 / span 2; }
    [data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-plan-button { max-height: 100%; }
    [data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-summary { grid-column: 2; grid-row: 2; }
    [data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-summary { gap: 2px; }
    [data-orbit-studio][data-mobile="true"] .orbit-studio-heading { display: flex; align-items: center; gap: 6px; flex-wrap: nowrap; }
    [data-orbit-studio][data-mobile="true"] .orbit-studio-id { font-size: 20px; margin: 0; }
    [data-orbit-studio][data-mobile="true"] .orbit-studio-status { font-size: 8.5px; gap: 4px; white-space: nowrap; }
    [data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-metrics { gap: 2px; }
    [data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-metrics > div:first-child dd { font-size: 18px; }
    [data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-metrics dt { font-size: 9px; }
    [data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-metrics dd { font-size: 12px; }
    [data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-meta { display: none; }
    [data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-actions { padding-top: 2px; }
    [data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-actions .orbit-studio-bottom { gap: 3px; }
    [data-orbit-studio][data-mobile="true"] .orbit-studio-price-value { font-size: 16px; }
    [data-orbit-studio][data-mobile="true"] .orbit-studio-primary { padding-inline: 9px; font-size: 11px; }
    [data-orbit-studio][data-mobile="true"] .orbit-studio-plan-note { display: none; }
}
@container orbit-studio-mobile (max-height: 480px) and (min-aspect-ratio: 4/3) {
    [data-orbit-studio][data-mobile="true"] .orbit-studio-brand { width: 110px; }
    [data-orbit-studio][data-mobile="true"] .orbit-studio-body { grid-template-columns: minmax(0,1.1fr) minmax(0,1fr); grid-template-rows: minmax(0,1fr); column-gap: 18px; }
    [data-orbit-studio][data-mobile="true"] .orbit-studio-image-slot { grid-column: 1; grid-row: 1; width: 100%; height: 100%; margin: 0; aspect-ratio: auto; container-type: size; }
    [data-orbit-studio][data-mobile="true"] [data-orbit-viewport] { position: relative; inset: auto; width: min(100cqw,calc(100cqh * 1920 / 1010)); height: auto; max-height: 100%; }
    [data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-panel { grid-column: 2; grid-row: 1; grid-template-rows: auto minmax(0,1fr); gap: 4px 8px; height: 100%; }
    [data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-panel > .orbit-studio-heading { grid-column: 2; grid-row: 1; }
    [data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-plan { grid-column: 1; grid-row: 1 / span 2; }
    [data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-summary { grid-column: 2; grid-row: 2; gap: 3px; }
    [data-orbit-studio][data-mobile="true"] .orbit-studio-id { font-size: 22px; }
    [data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-metrics { gap: 4px; }
    [data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-metrics > div:first-child dd { font-size: 19px; }
    [data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-meta { display: none; }
    [data-orbit-studio][data-mobile="true"] .orbit-studio-plan-note { display: none; }
    [data-orbit-studio][data-mobile="true"] .orbit-studio-price-value { font-size: 17px; }
    [data-orbit-studio][data-mobile="true"] .orbit-studio-primary { padding-inline: 14px; }
}
@media (prefers-reduced-motion: reduce) {
    [data-orbit-studio][data-mobile="true"] .orbit-studio-primary,
    [data-orbit-studio] [data-orbitdata-transition] { transition: none; }
}
@container orbit-studio-mobile (max-width: 340px) {
    [data-orbit-studio][data-mobile="true"] .orbit-studio-heading { gap: 5px; }
    [data-orbit-studio][data-mobile="true"] .orbit-studio-id { font-size: 20px; }
    [data-orbit-studio][data-mobile="true"] .orbit-studio-status { font-size: 8.5px; gap: 3px; }
    [data-orbit-studio][data-mobile="true"] .orbit-studio-status-dot { width: 5px; height: 5px; }
}
`

function OrbitApartmentStudio(props: OrbitApartmentStudioProps): React.JSX.Element {
    const { active, mode, dataset, dataStatus, error, onRetry, apartment: currentApartment, onSelect, assetBase, detailsUrl, inquiryUrl, onViewport, language, onLayout, onOpenDetails, mobile = false, moving = false, filters, filterBounds, filterAreaBounds = null, filterActive, filterCount, onFiltersChange } = props
    const transition = useOrbitDataTransition(currentApartment, currentApartment?.id || null, { moving, enabled: active })
    const apartment = transition.displayed
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
    const plan = active && apartment && dataset ? orbitApartmentPlan(apartment, dataset, assetBase, view, !expanded) : null
    // Warm the incoming drawing while the outgoing record is fading away.
    const incomingPlan = active && currentApartment && dataset ? orbitApartmentPlan(currentApartment, dataset, assetBase, currentApartment.id === apartment?.id ? view : "floorplan", true) : null
    useOrbitPreviewImage(incomingPlan?.url, active)
    const previewImage = useOrbitPreviewImage(plan?.url, active)
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
    React.useEffect(() => { if (!active || moving) setExpanded(false) }, [active, moving])
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
    const statusText = availability === "available" ? hu ? "Elérhető" : "Available" : availability === "sold" ? hu ? "Eladva" : "Sold" : availability === "under_negotiation" ? hu ? "Egyeztetés alatt" : "In negotiation" : availability === "reserved" ? hu ? "Foglalt" : "Reserved" : apartment?.statusLabel || ""
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
            <div className="orbit-studio-price">{!mobile && <p className="orbit-studio-label">{apartment?.priceIncludesVat === false ? hu ? "Nettó vételár" : "Net purchase price" : labels.gross}</p>}<p className={`orbit-studio-price-value${!positive(apartment?.price) ? " orbit-studio-price-empty" : ""}`} data-orbit-apartment-price="" data-orbit-field="price">
                {positive(apartment?.price) ? <>{number.format(apartment!.price! / 1000000)}<small>M Ft</small></> : availability === "sold" ? hu ? "Nincs megadva" : "Not provided" : hu ? "Ár kérésre" : "Price on request"}
            </p></div>
            {(mobile || !inquiryLink) && onOpenDetails ? <button type="button" className="orbit-studio-primary" data-orbit-apartment-action="" data-orbit-detail-link="" aria-haspopup="dialog" disabled={!transition.interactive} onClick={() => { if (transition.interactive) onOpenDetails() }}><span>{mobile ? hu ? "Adatlap" : "Details" : labels.details}</span>{mobile ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" /></svg> : <span aria-hidden="true">↗</span>}</button> : (mobile ? detailLink : actionLink) && <a className="orbit-studio-primary" href={mobile ? detailLink : actionLink} data-orbit-apartment-action="" {...(!mobile && inquiryLink ? { "data-orbit-inquiry": "" } : { "data-orbit-detail-link": "" })}><span>{mobile ? hu ? "Adatlap" : "Details" : inquiryLink ? labels.inquire : labels.details}</span>{mobile ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" /></svg> : <span aria-hidden="true">↗</span>}</a>}
        </div>
        <div className="orbit-studio-secondary">
            {download && <a href={download} className="orbit-studio-text-button" target="_blank" rel="noopener noreferrer" download={record?.media?.datasheet?.filename || undefined} data-orbit-apartment-download="" data-orbit-download=""><span aria-hidden="true">↓</span>{labels.download}</a>}
            {inquiryLink && (onOpenDetails ? <button type="button" className="orbit-studio-text-button" data-orbit-detail-link="" aria-haspopup="dialog" disabled={!transition.interactive} onClick={() => { if (transition.interactive) onOpenDetails() }}>{labels.details}<span aria-hidden="true">↗</span></button> : detailLink && <a href={detailLink} className="orbit-studio-text-button" data-orbit-detail-link="">{labels.details}<span aria-hidden="true">↗</span></a>)}
            {apartment && <button type="button" className="orbit-studio-text-button" onClick={() => { void share() }}>{labels.share}<span aria-hidden="true">↗</span></button>}
            <span className="orbit-studio-share-message" role="status">{shareMessage}</span>
        </div>
    </>
    const viewBox = plan?.viewBox || { x: 0, y: 0, width: 1, height: 1 }
    const planStyle: React.CSSProperties = { left: `${-viewBox.x / viewBox.width * 100}%`, top: `${-viewBox.y / viewBox.height * 100}%`, width: `${100 / viewBox.width}%`, height: `${100 / viewBox.height}%` }
    const previousPlanAspect = React.useRef(plan?.aspect || 1)
    if (plan?.aspect) previousPlanAspect.current = plan.aspect
    const aspectStyle = { "--studio-plan-aspect": previousPlanAspect.current } as React.CSSProperties
    const planShown = !!plan && previewImage === plan.url && failedImage !== plan.url
    const note = hu ? "Az alaprajz illusztráció. Bútorozatlan átadás." : "Illustrative floor plan. Homes are delivered unfurnished."
    const tabs = <div className="orbit-studio-tabs" role="tablist" aria-label={hu ? "Rajz kiválasztása" : "Choose drawing"}>
        {(["floorplan", "floorLayout"] as const).filter(kind => kind === "floorplan" || !!floorLayout).map(kind => <button key={kind} type="button" className="orbit-studio-tab" role="tab" aria-selected={view === kind} aria-controls={planPanelId} tabIndex={view === kind ? 0 : -1}
            onClick={() => setView(kind)} onKeyDown={event => { if (event.key === "ArrowRight" || event.key === "ArrowLeft" || event.key === "Home" || event.key === "End") { event.preventDefault(); const next = floorLayout && (event.key === "End" || (event.key !== "Home" && view === "floorplan")) ? "floorLayout" : "floorplan"; setView(next); const list = event.currentTarget.parentElement; requestAnimationFrame(() => list?.querySelector<HTMLButtonElement>(`[data-plan-tab="${next}"]`)?.focus()) } }} data-plan-tab={kind}>{labels[kind]}</button>)}
    </div>
    const detailsVisibility = { "aria-hidden": !active || moving || !!apartment && !transition.interactive, ...(!active || moving || !!apartment && !transition.interactive ? { inert: "" as any } : {}) }
    const recordFade = {
        "data-orbitdata-transition": "", "data-orbitdata-phase": transition.phase,
        "data-orbitdata-displayed-id": apartment?.id || "",
        "data-orbitdata-visible": String(!!apartment && transition.visible),
    }
    const panelFade = { ...recordFade, "data-orbitdata-visible": String(!apartment && !moving || transition.visible) }
    const facts = <div className="orbit-studio-facts" data-orbit-ignore="" {...(!shortLandscape ? recordFade : {})} {...detailsVisibility}>
        <dl className="orbit-studio-areas">
            {([ ["areaInterior", labels.interior, "area"], ["areaTerrace", labels.terrace, "terrace"], ["areaGarden", labels.garden, "garden"] ] as const).map(([key, label, field]) => <div key={key} data-orbit-apartment-metric={key} data-orbit-field={field}><dt>{label}</dt><dd>{positive(apartment?.[key]) && (key === "areaInterior" || apartment![key]! > 0) ? <>{number.format(apartment![key]!)}<small>m²</small></> : "—"}</dd></div>)}
        </dl>
        {meta()}{conversion()}
    </div>
    return <>
        <section data-orbit-studio="" data-active={active ? "true" : "false"} data-mobile={mobile ? "true" : "false"} data-moving={moving ? "true" : "false"} data-mode={mode} data-status={dataStatus} data-apartment-id={currentApartment?.id || ""} aria-hidden={!active} {...(!active ? { inert: "" as any } : {})} aria-labelledby={mobile ? undefined : headingId} aria-label={mobile ? hu ? "Lakásválasztó" : "Apartments" : undefined}>
            <style>{fontStyles + orbitApartmentStudioStyles}</style>
            <header className="orbit-studio-header" data-orbit-ignore="">
                {logo && <img className="orbit-studio-brand" src={logo} alt="Admiral Park" width={184} height={78} draggable={false} />}
                {!mobile && <div className="orbit-studio-header-end">
                    <div className="orbit-studio-heading" {...panelFade} {...detailsVisibility}><h2 id={headingId} className="orbit-studio-id">{apartment?.id || (hu ? "Lakásválasztó" : "Apartments")}</h2>
                        {statusText && <span className="orbit-studio-status" data-status={availability} data-orbit-field="status"><span className="orbit-studio-status-dot" aria-hidden="true" />{statusText}</span>}
                    </div>
                    {mode === "preview" && dataset && <div className="orbit-studio-preview"><label htmlFor={`${headingId}-select`}>{labels.preview}</label><select id={`${headingId}-select`} data-orbit-apartment-select="" aria-label={labels.select} value={currentApartment?.id || ""} disabled={!active || moving} onChange={event => onSelect(event.target.value)}>
                        {!currentApartment && <option value="">—</option>}{dataset.apartments.map(unit => <option key={unit.id} value={unit.id}>{unit.id}</option>)}
                    </select></div>}
                </div>}
                {!mobile && <div data-orbit-studio-filters=""><OrbitFilterBar active={active && !moving} language={language} filters={filters} bounds={filterBounds} areaBounds={filterAreaBounds} matchCount={filterCount} total={dataset?.apartments.length || 0} onChange={onFiltersChange} /></div>}
            </header>
            {mobile && <OrbitFilterBar active={active && !moving} language={language} filters={filters} bounds={filterBounds} areaBounds={filterAreaBounds} matchCount={filterCount} total={dataset?.apartments.length || 0} onChange={onFiltersChange} />}
            <div className="orbit-studio-body">
                <div className="orbit-studio-scene">
                    <div className="orbit-studio-image-slot"><div ref={viewportCallback} data-orbit-viewport="" aria-hidden="true" /></div>
                    {!mobile && !shortLandscape && facts}
                </div>
                {mobile ? <div className="orbit-studio-mobile-panel" data-orbit-studio-details="" data-orbit-ignore="" style={aspectStyle} {...panelFade} {...detailsVisibility}>
                    {dataStatus === "error" ? <div className="orbit-studio-empty" role="status"><p>{hu ? "A lakásadatok most nem tölthetők be." : "Apartment information could not be loaded."}</p><button type="button" className="orbit-studio-text-button" onClick={onRetry}>{hu ? "Újrapróbálom" : "Try again"}</button></div> : !apartment ? <div className="orbit-studio-empty" role="status" {...(filterActive && filterCount === 0 ? { "data-orbit-filter-empty": "" } : {})}><p>{dataStatus === "loading" || dataStatus === "idle" ? hu ? "Lakásadatok betöltése…" : "Loading apartment information…" : filterActive && filterCount === 0 ? hu ? "Nincs a szűrésnek megfelelő lakás." : "No apartments match these filters." : hu ? "Válasszon egy lakást az épületen." : "Select an apartment on the building."}</p></div> : <>
                            <div className="orbit-studio-heading"><h2 id={headingId} className="orbit-studio-id">{apartment.id}</h2>
                                {statusText && <span className="orbit-studio-status" data-status={availability} data-orbit-field="status" title={statusText}><span className="orbit-studio-status-dot" aria-hidden="true" /><span className="orbit-studio-status-text">{availability === "under_negotiation" ? hu ? "Egyeztetés" : "In talks" : statusText}</span></span>}
                            </div>
                        <figure className="orbit-studio-mobile-plan" style={aspectStyle}>
                            <button type="button" className="orbit-studio-mobile-plan-button" data-orbit-detail-link="" aria-haspopup="dialog" aria-label={hu ? `${apartment.id} adatlap megnyitása` : `Open apartment ${apartment.id} details`} disabled={!transition.interactive || !onOpenDetails} onClick={() => { if (transition.interactive) onOpenDetails?.() }}>
                                <span className="orbit-studio-plan-stage" style={aspectStyle}>
                                    {planShown ? <span className="orbit-studio-plan-crop" data-orbit-plan-crop=""><img data-orbit-floorplan="" className="orbit-studio-plan-image" src={plan!.url} style={planStyle} alt={`${apartment.id} · ${labels.floorplan}`} decoding="async" draggable={false} onLoad={() => onLayout?.()} onError={() => setFailedImage(plan!.url)} /></span> : <span className="orbit-studio-loading">{hu ? "Az alaprajz még nem érhető el." : "Floor plan unavailable."}</span>}
                                </span>
                            </button>
                        </figure>
                        <div className="orbit-studio-mobile-summary" data-orbit-mobile-summary="">
                            <dl className="orbit-studio-mobile-metrics">
                                {([ ["areaInterior", hu ? "Lakótér" : labels.interior, "area"], ["areaTerrace", hu ? "Terasz" : labels.terrace, "terrace"], ["areaGarden", labels.garden, "garden"] ] as const).map(([key, label, field]) => <div key={key} data-orbit-apartment-metric={key} data-orbit-field={field}><dt>{label}</dt><dd>{positive(apartment[key]) && (key === "areaInterior" || apartment[key]! > 0) ? <>{number.format(apartment[key]!)}<small>m²</small></> : "—"}</dd></div>)}
                            </dl>
                            <p className="orbit-studio-mobile-meta">
                                {positive(apartment.rooms) && <span data-orbit-field="rooms"><strong>{number.format(apartment.rooms!)} {labels.roomCount}</strong></span>}
                                {apartment.orientation && <span data-orbit-field="orientation">{apartment.orientation}</span>}
                                {floor && <span data-orbit-field="floor">{floor}</span>}
                            </p>
                            <div className="orbit-studio-mobile-actions">{conversion()}</div>
                        </div>
                    </>}
                </div> : <div className="orbit-studio-details" data-orbit-studio-details="" data-orbit-ignore="" {...panelFade} {...detailsVisibility}>
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
                </div>}
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
        {logo && <span className="orbit-fullscreen-brand" role="img" aria-label="Admiral Park" style={{ "--orbit-fullscreen-logo": `url("${logo.replace(/["\\]/g, "\\// @ORBIT_FULLSCREEN_INSERT")}")` } as React.CSSProperties} />}
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


/**
 * @framerSupportedLayoutWidth any-prefer-fixed
 * @framerSupportedLayoutHeight any-prefer-fixed
 * @framerIntrinsicWidth 1440
 * @framerIntrinsicHeight 900
 */
export default function AdmiralHomepageTrial(props: AdmiralHomepageTrialProps): React.JSX.Element {
    const {
        useGitHubAssets = true, heroBaseUrl = "", connectionBaseUrl = "", orbitBaseUrl = "", startView = "opening", editorView = "opening", editorOrbitView = "entry", orbitStartFrame = 45,
        maskPicking = true, maskBaseUrl = "", maskHighlightColor = "#f8d68b", maskHighlightOpacity = 27,
        maskAvailableColor = "#46A66A", maskNegotiationColor = "#E2B849", maskSoldColor = "#DA5961",
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
    const maskUrls = React.useMemo(() => {
        const base = useGitHubAssets ? HOMEPAGE_ASSETS + "/images/Mask%20full%20size%201920" : maskBaseUrl
        return base.trim() ? homepageUrls(base, HOMEPAGE_MASK_NAMES, useGitHubAssets ? HOMEPAGE_MASK_VERSION : "") : []
    }, [useGitHubAssets, maskBaseUrl])
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
    const [maskFailed, setMaskFailed] = React.useState(false)
    const useStudio = (orbitLayout === "studio" || orbitLayout === "mobile" && mobilePresentation) && detailsMode !== "off"
    // Every orbit layout uses real apartment IDs so its floorplan opens the shared card.
    const jsonDetails = detailsMode !== "off"
    const [selectedApartmentId, setSelectedApartmentId] = React.useState<string | null>(null)
    const [interactionApartmentId, setInteractionApartmentId] = React.useState<string | null>(null)
    // A001 is only the initial preview. Real desktop hover takes ownership of
    // orbitdata; leaving the facade must not restore a stale preview record.
    const [apartmentInteracted, setApartmentInteracted] = React.useState(false)
    const mobilePresentationRef = React.useRef(mobilePresentation); mobilePresentationRef.current = mobilePresentation
    const [apartmentFilters, setApartmentFilters] = React.useState<OrbitApartmentFilters>({ statuses: [], priceMin: null, priceMax: null })
    const [detailApartmentId, setDetailApartmentId] = React.useState<string | null>(null)
    const detailOpen = React.useRef(false)
    const apartmentData = useOrbitApartments(apartmentDataUrl, jsonDetails && (staticRenderer && editorView === "orbit" || hostVisible && ["building", "connection", "handoff", "orbit"].includes(stage)))
    const filterBounds = React.useMemo(() => getOrbitPriceBounds(apartmentData.dataset?.apartments || []), [apartmentData.dataset])
    const filterAreaBounds = React.useMemo(() => getOrbitAreaBounds(apartmentData.dataset?.apartments || []), [apartmentData.dataset])
    const filterResult = React.useMemo(() => getOrbitFilterResult(apartmentData.dataset?.apartments || [], apartmentFilters, filterBounds, filterAreaBounds), [apartmentData.dataset, apartmentFilters, filterBounds, filterAreaBounds])
    const filterMatches = React.useMemo(() => new Set(filterResult.matchingIds), [filterResult])
    const selectedApartment = React.useMemo(() => {
        const records = (apartmentData.dataset?.apartments || []).filter(item => filterMatches.has(item.id))
        return records.find(item => item.id === selectedApartmentId) || (detailsMode === "preview" && !apartmentInteracted ? records.find(item => item.id === previewApartmentId) || records[0] || null : null)
    }, [apartmentData.dataset, selectedApartmentId, previewApartmentId, detailsMode, filterMatches, apartmentInteracted])
    React.useEffect(() => {
        if (selectedApartmentId && !filterMatches.has(selectedApartmentId)) setSelectedApartmentId(null)
        if (interactionApartmentId && !filterMatches.has(interactionApartmentId)) setInteractionApartmentId(null)
    }, [filterMatches, selectedApartmentId, interactionApartmentId])
    const selectedApartmentDetails = React.useMemo<ApartmentDetailsData | null>(() => selectedApartment ? {
        id: selectedApartment.id, number: selectedApartment.id, area: selectedApartment.areaInterior, terrace: selectedApartment.areaTerrace,
        garden: selectedApartment.areaGarden, rooms: selectedApartment.rooms,
        availability: selectedApartment.status,
        floorplanUrl: orbitApartmentAssetUrl(selectedApartment.media?.floorplan?.thumbnail || selectedApartment.media?.floorplan?.full || selectedApartment.floorplan || "", apartmentAssetBase) || undefined,
    } : null, [selectedApartment, apartmentAssetBase, detailsLanguage])
    const clearApartmentDetails = React.useCallback(() => {
        setInteractionApartmentId(null)
        setSelectedApartmentId(null)
    }, [])
    const rootRef = React.useRef<HTMLDivElement>(null), heroRootRef = React.useRef<HTMLDivElement>(null)
    const heroCanvasRef = React.useRef<HTMLCanvasElement>(null), orbitCanvasRef = React.useRef<HTMLCanvasElement>(null), posterRef = React.useRef<HTMLImageElement>(null)
    const maskCanvasRef = React.useRef<HTMLCanvasElement>(null)
    const maskPickerRef = React.useRef<ReturnType<typeof createOrbitApartmentPicker> | null>(null)
    const actions = React.useRef<HomepageActions | null>(null)
    const openApartmentDetails = React.useCallback((id?: string) => {
        const value = id || selectedApartment?.id, root = rootRef.current
        if (!jsonDetails || staticRenderer || !value || !filterMatches.has(value) || !apartmentData.dataset?.apartments.some(apartment => apartment.id === value) || !root ||
            root.dataset.homepageStage !== "orbit" || root.dataset.orbitState !== "checkpoint" || Number(root.dataset.orbitCheckpoint) < 0) return
        setApartmentInteracted(true); setSelectedApartmentId(value); detailOpen.current = true; actions.current?.orbit?.setSuspended(true); setDetailApartmentId(value)
    }, [jsonDetails, staticRenderer, selectedApartment?.id, apartmentData.dataset, filterMatches])
    const closeApartmentDetails = React.useCallback(() => {
        detailOpen.current = false; setDetailApartmentId(null); actions.current?.orbit?.setSuspended(false)
        if (!mobilePresentationRef.current) { setInteractionApartmentId(null); setSelectedApartmentId(null) }
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
    const apartmentHighlightColors = React.useMemo(() => new Map((apartmentData.dataset?.apartments || []).flatMap(apartment => {
        const color = apartment.status === "available" ? maskAvailableColor : apartment.status === "sold" ? maskSoldColor :
            apartment.status === "under_negotiation" || apartment.status === "reserved" ? maskNegotiationColor : null
        return color ? [[apartment.id, color] as const] : []
    })), [apartmentData.dataset, maskAvailableColor, maskNegotiationColor, maskSoldColor])
    const pickerLatest = React.useRef({ hostVisible, mobilePresentation, focalX, focalY, filterResult, jsonDetails, apartmentHighlightColors })
    pickerLatest.current = { hostVisible, mobilePresentation, focalX, focalY, filterResult, jsonDetails, apartmentHighlightColors }
    const pickerStyle = React.useRef({ color: maskHighlightColor, opacity: maskHighlightOpacity / 100 })
    pickerStyle.current = { color: maskHighlightColor, opacity: maskHighlightOpacity / 100 }

    React.useEffect(() => {
        const root = rootRef.current, canvas = maskCanvasRef.current
        if (!root || !canvas || staticRenderer || !maskPicking || checkpointCount !== 8 || maskUrls.length !== 8) return
        const picker = createOrbitApartmentPicker({
            root, canvas, urls: maskUrls, palette: HOMEPAGE_MASK_PALETTE,
            highlightColor: pickerStyle.current.color, highlightOpacity: pickerStyle.current.opacity,
            getView: () => {
                const latest = pickerLatest.current, geometry = fullscreen.geometryRef.current
                const width = geometry?.width || root.clientWidth, height = geometry?.height || root.clientHeight
                const value = (name: string, fallback: number) => {
                    const number = parseFloat(root.style.getPropertyValue(name))
                    return Number.isFinite(number) ? number : fallback
                }
                return { enabled: latest.hostVisible && latest.jsonDetails && root.dataset.homepageStage === "orbit",
                    checkpoint: Number(root.dataset.orbitCheckpoint ?? -1), moving: root.dataset.orbitState !== "checkpoint",
                    suspended: detailOpen.current, mobile: latest.mobilePresentation, width, height,
                    viewport: geometry ? { x: 0, y: 0, width, height } : { x: value("--admiral-image-x", 0), y: value("--admiral-image-y", 0), width: value("--admiral-image-width", width), height: value("--admiral-image-height", height) },
                    focalX: latest.focalX / 100, focalY: latest.focalY / 100 }
            },
            inputPoint: (clientX, clientY) => {
                const geometry = fullscreen.geometryRef.current
                if (geometry) {
                    const { physical, width, height, rotated } = geometry, x = clientX - physical.left, y = clientY - physical.top
                    return rotated ? { x: y * width / physical.height, y: height - x * height / physical.width } : { x: x * width / physical.width, y: y * height / physical.height }
                }
                const bounds = root.getBoundingClientRect()
                return { x: (clientX - bounds.left) * root.clientWidth / Math.max(1, bounds.width), y: (clientY - bounds.top) * root.clientHeight / Math.max(1, bounds.height) }
            },
            getAllowedIds: () => pickerLatest.current.filterResult.matchingIds,
            getHighlightColor: id => pickerLatest.current.apartmentHighlightColors.get(id),
            isFilterActive: () => pickerLatest.current.filterResult.active,
            getHighlightIds: () => {
                try { return JSON.parse(root.dataset.orbitHighlightIds || "[]") as string[] } catch { return [] }
            },
            onHover: id => {
                // The card owns its ID independently while picking is suspended.
                // Its transient null hover must not change the open datasheet.
                if (id === null && detailOpen.current) return
                root.dispatchEvent(new CustomEvent("admiral:apartment-hover", { detail: { id } }))
            },
            onPick: id => root.dispatchEvent(new CustomEvent("admiral:apartment-click", { detail: { id } })),
        })
        maskPickerRef.current = picker
        const refresh = () => picker.refresh(), retry = () => picker.retry(), observer = new ResizeObserver(refresh)
        const status = new MutationObserver(() => setMaskFailed(root.dataset.orbitMaskState === "error"))
        status.observe(root, { attributes: true, attributeFilter: ["data-orbit-mask-state"] })
        root.addEventListener("admiral:orbit-filter-change", refresh)
        root.addEventListener("admiral:orbit-mask-retry", retry)
        observer.observe(root); picker.refresh()
        return () => { observer.disconnect(); status.disconnect(); root.removeEventListener("admiral:orbit-filter-change", refresh); root.removeEventListener("admiral:orbit-mask-retry", retry); picker.destroy(); setMaskFailed(false); if (maskPickerRef.current === picker) maskPickerRef.current = null }
    }, [staticRenderer, maskPicking, checkpointCount, maskUrls])
    React.useEffect(() => { maskPickerRef.current?.setHighlightStyle(maskHighlightColor, maskHighlightOpacity / 100) }, [maskHighlightColor, maskHighlightOpacity, mobilePresentation, fullscreen.active])
    React.useEffect(() => { maskPickerRef.current?.refresh() }, [hostVisible, mobilePresentation, stage, orbitInfo.state, orbitInfo.checkpoint, detailApartmentId, fullscreen.active, focalX, focalY, filterResult, apartmentHighlightColors])

    React.useEffect(() => {
        const root = rootRef.current
        if (!root) return
        const moving = !staticRenderer && (stage !== "orbit" || orbitInfo.state !== "checkpoint")
        const hoveredApartmentId = !moving && interactionApartmentId && filterMatches.has(interactionApartmentId) ? interactionApartmentId : null
        const highlightIds = moving ? [] : filterResult.active ? filterResult.matchingIds : hoveredApartmentId ? [hoveredApartmentId] : []
        // The eight mask views can consume the same IDs in compact and fullscreen
        // mode. A preview record supplies details without pretending it is hovered.
        const state = { version: 1, criteriaActive: filterResult.active, ...filterResult.filters,
            matchedIds: [...filterResult.matchingIds], highlightIds: [...highlightIds], hoveredApartmentId,
            checkpoint: orbitInfo.checkpoint, moving }
        root.dataset.orbitFilterActive = String(state.criteriaActive)
        root.dataset.orbitFilterCriteria = JSON.stringify(filterResult.filters)
        root.dataset.orbitFilterMatches = JSON.stringify(state.matchedIds)
        root.dataset.orbitHighlightIds = JSON.stringify(state.highlightIds)
        root.dispatchEvent(new CustomEvent("admiral:orbit-filter-change", { detail: state }))
    }, [filterResult, filterMatches, interactionApartmentId, stage, orbitInfo.state, orbitInfo.checkpoint, staticRenderer])
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
        let arrivedAt = -Infinity, lastWheelAt = -Infinity, wheelIntent = 0, wheelCanEnter = false, lastUI = 0, lastOrbitUI = ""
        let resetWheelAt: number | null = null
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
            maskPickerRef.current?.refresh()
        }
        function changeStage(next: HomepageStage) {
            currentStage = next; root!.dataset.homepageStage = next; setStage(next); applyPresentation(); publish()
        }
        function changePoster(url: string) { poster!.src = url; setPosterUrl(url) }
        function destroyHero() { heroGeneration++; hero?.destroy(); hero = null }
        function sequenceInput(event: Event) {
            if (homepageBlocked(event.target)) return false
            if (event instanceof WheelEvent && resetWheelAt !== null) {
                const now = performance.now(), quiet = now - resetWheelAt
                resetWheelAt = now
                // A Home click must not be undone by the trackpad's old inertia.
                // A fresh burst after a quiet gap, keyboard or new touch stays usable.
                if (quiet < 160) return false
                resetWheelAt = null
            }
            return true
        }
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
                maskPickerRef.current?.refresh()
                orbitSnapshot = snapshot; publish()
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
            enterToken++; orbit?.deactivate(true); destroyHero()
            presentationProgress = 0; applyPresentation()
            activeSequence = "SEQ_01"; root!.dataset.activeSequence = activeSequence
            changePoster(heroUrls[atEnd ? heroUrls.length - 1 : 0])
            heroSnapshot = { state: atEnd ? "arrival" : "opening", progress: atEnd ? 1 : 0, frame: atEnd ? heroUrls.length - 1 : 0, direction: 1, held: false, decoded: 0, downloaded: 0 }
            setHeroState(heroSnapshot.state)
            changeStage(atEnd ? "building" : "opening")
            if (atEnd) arrivedAt = performance.now()
            const generation = ++heroGeneration
            hero = createHeroSequence({
                root: heroRoot!, canvas: heroCanvas!, poster: poster!, urls: heroUrls, duration, maxSpeed, momentum, triggerDistance, startAtEnd: atEnd,
                preservePresentation: atEnd, holdScroll: true, preload: true, cacheFrames: phone ? 10 : 14, decodeWidth: phone ? 1280 : 1920, focalX, focalY,
                inputFilter: sequenceInput,
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
            let completed = false, orbitPreparing = false
            hero = createHeroSequence({
                root: heroRoot!, canvas: heroCanvas!, poster: poster!, urls: connectionPlaybackUrls,
                duration: connectionDuration, maxSpeed, momentum, triggerDistance, preservePresentation: true,
                viewport: (progress, bounds) => viewportFor(progress, bounds),
                holdScroll: true, preload: true, cacheFrames: phone ? 10 : 14, decodeWidth: phone ? 1280 : 1920, focalX, focalY,
                inputFilter: sequenceInput,
                onUpdate(snapshot) {
                    if (disposed || generation !== heroGeneration) return
                    heroSnapshot = snapshot; setHeroState(previous => previous === snapshot.state ? previous : snapshot.state)
                    presentationProgress = snapshot.progress; applyPresentation()
                    // Compressed orbit downloads run from page load; decode its
                    // bounded window only near the connecting flight's handoff.
                    if (!orbitPreparing && snapshot.direction > 0 && snapshot.progress >= .55) {
                        orbitPreparing = true; void orbit.prepare().catch(() => {})
                    }
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
        function resetHome() {
            if (disposed || staticRenderer || !isVisible()) return
            closeApartmentDetails(); fullscreen.close()
            setSelectedApartmentId(null); setInteractionApartmentId(null); setApartmentInteracted(false)
            setApartmentFilters({ statuses: [], priceMin: null, priceMax: null })
            wheelIntent = 0; wheelCanEnter = false; lastWheelAt = arrivedAt = -Infinity
            touchY = null; touchCanEnter = touchInside = false
            resetWheelAt = performance.now()
            // Cancels both sequence generations and pending orbit activation,
            // while keeping the orbit's already downloaded compressed frames.
            mountHero(false)
        }
        window.addEventListener("click", event => {
            if (staticRenderer || !isVisible() || !homepageSelfLink(event)) return
            event.preventDefault()
            // Leave propagation intact so an authored mobile menu can close.
            resetHome()
        }, { capture: true, signal })
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
            // A clamped phone popup can overlap the status row. Passive Framer
            // covers must not relay a click in its padding to a button below it.
            if (Array.from(root!.querySelectorAll<HTMLElement>("[data-orbit-range-popover]:not([hidden])")).some(panel => {
                if (panel.closest("[inert],[aria-hidden='true']")) return false
                const box = panel.getBoundingClientRect()
                return box.width > 0 && box.height > 0 && event.clientX >= box.left && event.clientX <= box.right && event.clientY >= box.top && event.clientY <= box.bottom
            })) return
            // Passive Framer overlay frames can cover the viewport. Relay only a click
            // over one of our visible controls; genuine links and buttons above stay native.
            for (const button of Array.from(root!.querySelectorAll<HTMLButtonElement>("[data-homepage-controls] button, [data-orbit-filters] button, button[data-apartment-open], button[data-orbit-detail-link], button[data-orbit-fullscreen-open], button[data-orbit-fullscreen-close]"))) {
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
        function resetWheelIntent() { wheelIntent = 0; wheelCanEnter = false }
        function wheel(event: WheelEvent) {
            const now = performance.now(), gap = now - lastWheelAt; lastWheelAt = now
            // A quiet gap identifies a fresh gesture. Once armed, accumulate
            // every small trackpad or mouse pulse instead of discarding the burst.
            // A gesture inherited from SEQ_01 stays unarmed until it goes quiet.
            if (gap >= 160) { wheelIntent = 0; wheelCanEnter = currentStage === "building" && now - arrivedAt >= 200 }
            const box = root!.getBoundingClientRect()
            if (!isVisible() || event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom || homepageBlocked(event.target) || event.ctrlKey || event.metaKey || event.defaultPrevented) { resetWheelIntent(); return }
            if (currentStage !== "building" && currentStage !== "handoff") { resetWheelIntent(); return }
            // Horizontal jitter should neither trigger nor cancel a new vertical gesture.
            if (Math.abs(event.deltaX) > Math.abs(event.deltaY) || event.deltaY === 0) return
            for (let element = event.target instanceof Element ? event.target : null; element && element !== document.body && element !== document.documentElement; element = element.parentElement) {
                const css = getComputedStyle(element)
                if (/(auto|scroll)/.test(css.overflowY) && element.scrollHeight > element.clientHeight + 1 && (event.deltaY > 0 ? element.scrollTop + element.clientHeight < element.scrollHeight - 1 : element.scrollTop > 0)) { resetWheelIntent(); return }
            }
            if (currentStage === "handoff") { resetWheelIntent(); if (event.cancelable) event.preventDefault(); return }
            if (event.deltaY < 0) { resetWheelIntent(); return }
            if (event.cancelable) event.preventDefault()
            if (!wheelCanEnter) return
            wheelIntent += event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? innerHeight : 1)
            if (wheelIntent >= triggerDistance) { resetWheelIntent(); void explore() }
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
            // Keep the complete orbit download, without retaining its decoded
            // window beside SEQ_01. Preparation starts near the SEQ_02 handoff.
            const warm = window.setTimeout(() => { if (!disposed && isVisible()) orbit!.prefetch() }, 300)
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
        motionWidth, orbitMobileWidth, inspectionWidth, desktopBuffer, phoneBuffer, orbitStartIndex, editorPreviewFrame, snapDuration, frameBlend, focalX, focalY, showDiagnostics, clearApartmentDetails, closeApartmentDetails, fullscreen.close])

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
            if (detail === null || detail === "" || values && (values.id === null || values.apartmentId === null || values.number === null)) {
                setInteractionApartmentId(null)
                if (!mobilePresentationRef.current) setSelectedApartmentId(null)
                return
            }
            if (typeof value === "string" && filterMatches.has(value) && apartmentData.dataset?.apartments.some(item => item.id === value)) {
                setApartmentInteracted(true); setInteractionApartmentId(value); setSelectedApartmentId(value)
            }
        }
        root.addEventListener("admiral:apartment-hover", selectFromMask)
        return () => root.removeEventListener("admiral:apartment-hover", selectFromMask)
    }, [jsonDetails, apartmentData.dataset, filterMatches])

    React.useEffect(() => {
        const root = rootRef.current
        if (!root || staticRenderer) return
        const click = (event: Event) => {
            const detail = (event as CustomEvent<unknown>).detail
            const values = detail && typeof detail === "object" ? detail as { id?: unknown; apartmentId?: unknown; number?: unknown } : null
            const id = typeof detail === "string" ? detail : values?.id ?? values?.apartmentId ?? values?.number
            if (typeof id !== "string" || !filterMatches.has(id)) return
            if (mobilePresentation) {
                // Touch selects first; the explicit Details action opens the
                // shared card. Desktop facade clicks retain their direct action.
                if (jsonDetails && root!.dataset.homepageStage === "orbit" && root!.dataset.orbitState === "checkpoint" && Number(root!.dataset.orbitCheckpoint) >= 0 &&
                    apartmentData.dataset?.apartments.some(apartment => apartment.id === id)) { setApartmentInteracted(true); setInteractionApartmentId(id); setSelectedApartmentId(id) }
            } else openApartmentDetails(id)
        }
        root.addEventListener("admiral:apartment-click", click)
        return () => root.removeEventListener("admiral:apartment-click", click)
    }, [openApartmentDetails, staticRenderer, mobilePresentation, jsonDetails, apartmentData.dataset, filterMatches])
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
        // Mouse orbitdata follows the facade. A phone tap remains selected so
        // its explicit Adatlap action is still reachable after lifting a finger.
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
    const stripFloorplanUrl = useOrbitPreviewImage(selectedApartmentDetails?.floorplanUrl || null, !useStudio && detailsMode !== "off")
    const detailsData = selectedApartmentDetails ? { ...selectedApartmentDetails, floorplanUrl: stripFloorplanUrl || undefined } : null
    const detailsVisible = !useStudio && (detailsMode === "preview" ? detailsData !== null && (orbitStatic || (orbitVisible && orbitInfo.state === "checkpoint")) :
        detailsMode === "hover" && orbitVisible && orbitInfo.state === "checkpoint" && orbitInfo.checkpoint >= 0 && detailsData !== null)
    const stripFiltersEnabled = !useStudio && !fullscreen.active && detailsMode !== "off"
    const orbitPanelVisible = orbitStatic || orbitVisible && orbitInfo.state === "checkpoint"
    const classicOrbitPanel = stripFiltersEnabled && (orbitVisible || orbitStatic)
    const controlsBottom = classicOrbitPanel || detailsVisible ? `calc(${detailsBottom + detailsHeight + 20}px + env(safe-area-inset-bottom, 0px))` : "18px"
    const diagnosticBottom = classicOrbitPanel || detailsVisible ? detailsBottom + detailsHeight + (showControls ? 112 : 20) : 94
    const studioControls = useStudio && (stage === "orbit" || stage === "handoff")
    const imageClip = "inset(var(--admiral-image-y, 0px) var(--admiral-image-right, 0px) var(--admiral-image-cut, 0px) var(--admiral-image-x, 0px))"
    return (
        <div ref={rootRef} data-admiral-homepage="" data-admiral-orbit="" data-homepage-stage={stage} data-orbit-fullscreen={String(fullscreen.active)} role="region" aria-label={alt} tabIndex={0}
            style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden", background, "--admiral-orbit-background": orbitBackground, "--orbit-available-color": maskAvailableColor,
                "--orbit-negotiation-color": maskNegotiationColor, "--orbit-sold-color": maskSoldColor, ...style } as React.CSSProperties}>
            {mobilePresentation && useStudio && <style>{homepageMobileOrbitStyles}</style>}
            <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: orbitBackground, opacity: "var(--admiral-studio-light, 0)" as unknown as number, pointerEvents: "none" }} />
            {useStudio && <OrbitApartmentStudio active={!fullscreen.active && (orbitVisible || orbitStatic)} mobile={mobilePresentation} moving={!staticRenderer && orbitMoving} mode={detailsMode} dataset={apartmentData.dataset} dataStatus={apartmentData.status} error={apartmentData.error}
                filters={filterResult.filters} filterBounds={filterBounds} filterAreaBounds={filterAreaBounds} filterActive={filterResult.active} filterCount={filterResult.matchingIds.length} onFiltersChange={setApartmentFilters}
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
                    <canvas ref={maskCanvasRef} data-orbit-mask-overlay="" aria-hidden="true" width={1} height={1} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 3, opacity: orbitVisible ? 1 : 0, pointerEvents: "none", clipPath: fullscreen.active ? "none" : imageClip }} />
                    {maskFailed && fullscreen.active && <button type="button" data-orbit-mask-retry="" data-orbit-ignore="" style={{ ...homepageButton, position: "absolute", left: 16, top: 16, zIndex: 9 }} onClick={() => maskPickerRef.current?.retry()}>{detailsLanguage === "hu" ? "Lakáskijelölés újratöltése" : "Retry apartment picking"}</button>}
                    {fullscreen.active && <OrbitFullscreenDetails apartment={selectedApartment} dataset={apartmentData.dataset} assetBase={apartmentAssetBase} language={detailsLanguage}
                        filters={filterResult.filters} filterBounds={filterBounds} filterAreaBounds={filterAreaBounds} filterCount={filterResult.matchingIds.length} total={apartmentData.dataset?.apartments.length || 0} onFiltersChange={setApartmentFilters}
                        emptyMessage={filterResult.active && filterResult.matchingIds.length === 0 ? detailsLanguage === "hu" ? "Nincs a szűrésnek megfelelő lakás." : "No apartments match these filters." : undefined}
                        onOpenDetails={() => openApartmentDetails()} moving={orbitMoving} onPrevious={() => actions.current?.orbit?.go(-1)} onNext={() => actions.current?.orbit?.go(1)}
                        onClose={fullscreen.close} checkpoint={orbitInfo.checkpoint} count={checkpoints} />}
                </div>
            </div>
            {mobilePresentation && useStudio && orbitVisible && !fullscreen.active && <button type="button" data-orbit-fullscreen-open="" data-orbit-ignore="" aria-haspopup="dialog" aria-label={detailsLanguage === "hu" ? "Teljes képernyő" : "Fullscreen view"} title={detailsLanguage === "hu" ? "Teljes képernyő" : "Fullscreen view"} onClick={fullscreen.open}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d="M8 4H4v4m12-4h4v4M4 16v4h4m12-4v4h-4" /></svg>
            </button>}
            {maskFailed && orbitVisible && !fullscreen.active && <button type="button" data-orbit-mask-retry="" data-orbit-ignore="" style={{ ...homepageButton, position: "absolute", left: "calc(var(--admiral-image-x, 0px) + 12px)", top: "calc(var(--admiral-image-y, 0px) + 12px)", zIndex: 5 }} onClick={() => maskPickerRef.current?.retry()}>{detailsLanguage === "hu" ? "Lakáskijelölés újratöltése" : "Retry apartment picking"}</button>}
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
                    {detailsMode === "preview" && <button type="button" disabled={orbitMoving || !selectedApartment} style={{ ...orbitButtonStyle, opacity: orbitMoving || !selectedApartment ? .45 : 1 }} onClick={() => openApartmentDetails()}>Open apartment details</button>}
                    <button type="button" aria-label="Previous view" disabled={orbitMoving} style={orbitButtonStyle} onClick={() => actions.current?.orbit?.go(-1)}>←</button>
                    <span aria-live="polite" style={{ ...homepageButton, cursor: "default", minWidth: 65, textAlign: "center" }}>{orbitInfo.checkpoint >= 0 ? `View ${orbitInfo.checkpoint + 1} / ${checkpoints}` : orbitInfo.state === "checkpoint" ? "Custom view" : orbitInfo.state === "buffering" ? "Preparing view…" : orbitInfo.state === "error" ? "View unavailable" : "Looking around"}</span>
                    <button type="button" aria-label="Next view" disabled={orbitMoving} style={orbitButtonStyle} onClick={() => actions.current?.orbit?.go(1)}>→</button>
                    <button type="button" disabled={orbitInfo.state === "error"} style={homepageButton} onClick={() => paused ? actions.current?.orbit?.resume() : actions.current?.orbit?.pause()}>{paused ? "Continue rotation" : "Pause rotation"}</button>
                    {showViewpoints && Array.from({ length: checkpoints }, (_, i) => <button key={i} type="button" aria-label={`View ${i + 1}`} aria-pressed={orbitInfo.checkpoint === i} disabled={orbitMoving}
                        style={{ ...orbitButtonStyle, padding: "7px 9px", background: orbitInfo.checkpoint === i ? "rgba(255,255,255,.9)" : homepageButton.background, color: orbitInfo.checkpoint === i ? "#101820" : "#fff" }} onClick={() => actions.current?.orbit?.setCheckpoint(i)}>{i + 1}</button>)}
                </>}
            </div>}
            {!staticRenderer && !showControls && ["opening", "approach", "connection"].includes(stage) && (heroState === "paused" || heroState === "error") && <div data-homepage-controls="" data-homepage-recovery={stage === "connection" ? "SEQ_02" : "SEQ_01"} data-orbit-ignore="" role="group" aria-label="Animation recovery" style={{ position: "absolute", bottom: 18, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 7, zIndex: 3 }}>
                <button type="button" style={homepageButton} onClick={() => actions.current?.resumeHero()}>{stage === "connection" ? heroState === "error" ? "Retry connection" : "Continue connection" : heroState === "error" ? "Retry approach" : "Continue approach"}</button>
                {stage === "connection" ? <button type="button" style={homepageButton} onClick={() => actions.current?.overview()}>Overview</button> : <button type="button" style={homepageButton} onClick={() => actions.current?.skip()}>Skip approach</button>}
            </div>}
            {!staticRenderer && !showControls && orbitInfo.state === "buffering" && <span role="status" style={{ ...homepageButton, position: "absolute", bottom: 18, left: "50%", transform: "translateX(-50%)", pointerEvents: "none", zIndex: 3 }}>Preparing view…</span>}
            {!staticRenderer && !showControls && orbitInfo.state === "error" && <div data-homepage-controls="" data-orbit-ignore="" style={{ position: "absolute", bottom: 18, left: "50%", transform: "translateX(-50%)", zIndex: 3 }}>
                <button type="button" style={homepageButton} onClick={() => { void (rootRef.current as (HTMLElement & { retryOrbit?: () => Promise<void> }) | null)?.retryOrbit?.() }}>Retry orbit</button>
            </div>}
            {!useStudio && !fullscreen.active && detailsMode !== "off" && <ApartmentDetailsStrip apartment={detailsData} language={detailsLanguage} visible={detailsVisible} preview={false}
                bottom={detailsBottom} inset={detailsInset} onHeightChange={setDetailsHeight} onOpen={jsonDetails ? () => openApartmentDetails() : undefined}
                moving={orbitVisible && orbitMoving} filtersVisible={orbitPanelVisible} filters={stripFiltersEnabled ? <div data-orbit-desktop-filters=""><OrbitFilterBar active={orbitPanelVisible} language={detailsLanguage} filters={filterResult.filters} bounds={filterBounds} areaBounds={filterAreaBounds} matchCount={filterResult.matchingIds.length} total={apartmentData.dataset?.apartments.length || 0} onChange={setApartmentFilters} presentation="overlay" /></div> : undefined} />}
            {!staticRenderer && <AdmiralApartmentDetailCard openId={detailApartmentId} dataUrl={detailDataUrl} assetBase={apartmentAssetBase} inquiryUrl={inquiryUrl} pageUrl={detailPageUrl}
                onOpenChange={reportDetailOpen} onClosed={closeApartmentDetails} liveDataset={apartmentData.dataset} />}
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
    maskPicking: { type: ControlType.Boolean, title: "Apartment masks", defaultValue: true, description: "Hover on desktop or tap on phones to select an apartment at the eight parked camera views." },
    maskBaseUrl: { type: ControlType.String, title: "Mask folder", defaultValue: "", hidden: p => p.useGitHubAssets !== false || p.maskPicking === false },
    maskAvailableColor: { type: ControlType.Color, title: "Available colour", defaultValue: "#46A66A", hidden: p => p.maskPicking === false },
    maskNegotiationColor: { type: ControlType.Color, title: "Negotiation colour", defaultValue: "#E2B849", hidden: p => p.maskPicking === false },
    maskSoldColor: { type: ControlType.Color, title: "Sold colour", defaultValue: "#DA5961", hidden: p => p.maskPicking === false },
    maskHighlightColor: { type: ControlType.Color, title: "Other status colour", defaultValue: "#f8d68b", hidden: p => p.maskPicking === false },
    maskHighlightOpacity: { type: ControlType.Number, title: "Highlight opacity", defaultValue: 27, min: 5, max: 70, step: 1, unit: "%", hidden: p => p.maskPicking === false },
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
    previewApartmentId: { type: ControlType.String, title: "Preview apartment", defaultValue: "A001", hidden: p => p.detailsMode === "hover" || p.detailsMode === "off", description: "Initial apartment before hover or tap selection. Clicking its floorplan opens the shared detail card." },
    detailPageUrl: { type: ControlType.String, title: "Details page", defaultValue: "/lista", hidden: p => p.detailsMode === "off", description: "Your Framer apartment page path. Links add ?apartment=ID to open this apartment." },
    detailDataUrl: { type: ControlType.String, title: "Detail card JSON", defaultValue: "https://raw.githubusercontent.com/UnbuiltMarket/admiral-park/main/data/apartment-details.json", description: "Full apartment data for the shared list-view card, fetched only when an apartment is opened." },
    inquiryUrl: { type: ControlType.String, title: "Inquiry page", defaultValue: "", hidden: p => p.detailsMode === "off", description: "Optional enquiry page URL. If empty, the action opens the apartment details page." },
    detailsMode: { type: ControlType.Enum, title: "Apartment details", options: ["preview", "hover", "off"], optionTitles: ["Preview", "Hover", "Off"], defaultValue: "preview", description: "Preview starts with A001 and updates on hover/tap. Hover waits for an actual apartment selection. Off hides the apartment workspace and picking." },
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

const apartmentDetailsStyles = `${orbitDataDividerStyles}
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
    transition: opacity 240ms ease, transform 240ms ease, visibility 0s linear 240ms;
}
[data-apartment-details][data-details-shell-visible="true"] {
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
    background: linear-gradient(to bottom, rgba(8,15,20,0) 0%, rgba(8,15,20,.16) 28%, rgba(8,15,20,.44) 72%, rgba(8,15,20,.64) 100%);
    pointer-events: none !important;
}
[data-apartment-details] .admiral-details-summary *, [data-apartment-details] .admiral-details-plan *, [data-apartment-details] .admiral-details-summary *::before, [data-apartment-details] .admiral-details-summary *::after {
    box-sizing: border-box;
    pointer-events: none !important;
}
[data-apartment-details] .admiral-details-filter-row { display: flex; justify-content: flex-end; min-width: 0; padding: 5px 0 0; pointer-events: auto !important; }
[data-apartment-details] [data-orbit-desktop-filters] { width: min(520px,100%); min-width: 0; }
[data-apartment-details] [data-apartment-open] { display: flex; flex-direction: column; align-items: center; gap: 7px; max-width: 100%; min-width: 48px; min-height: 48px; padding: 0; border: 0; color: inherit; font: inherit; background: none; cursor: pointer; pointer-events: auto !important; }
[data-apartment-details] [data-apartment-open]:focus-visible { outline: 2px solid currentColor; outline-offset: 5px; }
[data-apartment-details] [data-apartment-open]:hover .admiral-details-plan-image { opacity: .82; }
[data-apartment-details] .admiral-details-grid {
    display: grid;
    grid-template-columns: repeat(3,minmax(0,1fr)) 220px repeat(3,minmax(0,1fr));
    column-gap: clamp(8px,1.1cqw,20px);
    align-items: center;
    padding-top: 8px;
    opacity: 1;
    transition: opacity 240ms ease;
}
[data-apartment-details] .admiral-details-grid[aria-hidden="true"] { opacity: 0; }
[data-apartment-details] .admiral-details-field { min-width: 0; }
[data-apartment-details] .admiral-details-label {
    display: flex;
    align-items: baseline;
    gap: 7px;
    min-height: 11px;
    margin: 0 0 6px;
    color: rgba(255,255,255,.8);
    font-size: 9px;
    line-height: 1.2;
    font-weight: 400;
    letter-spacing: .08em;
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
    font-size: 24px;
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
    font-size: 29px;
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
    font-size: 13px;
    line-height: 1.45;
    letter-spacing: .015em;
    overflow-wrap: anywhere;
}
[data-apartment-details] .admiral-details-plan { justify-self: center; text-align: center; }
[data-apartment-details] .admiral-details-rooms .admiral-details-value { font-size: 18px; }
[data-apartment-details] .admiral-details-plan .admiral-details-label { display: none; }
[data-apartment-details] .admiral-details-plan-caption { color: rgba(255,255,255,.85); font-size: 9px; line-height: 1.3; letter-spacing: .06em; }
[data-apartment-details] .admiral-details-plan-image {
    display: block;
    width: 220px;
    height: 190px;
    max-width: 100%;
    object-fit: contain;
    object-position: center;
    transition: opacity 160ms ease;
}
[data-apartment-details] .admiral-details-plan-empty {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 220px;
    height: 190px;
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
    [data-apartment-details] .admiral-details-plan-image, [data-apartment-details] .admiral-details-plan-empty { width: 148px; height: 128px; }
}
@container admiral-apartment (max-width: 360px) {
    [data-apartment-details] .admiral-details-grid { column-gap: 8px; }
    [data-apartment-details] .admiral-details-label { font-size: 8px; letter-spacing: .07em; }
    [data-apartment-details] .admiral-details-value { font-size: 20px; }
    [data-apartment-details] .admiral-details-number .admiral-details-value { font-size: 24px; }
    [data-apartment-details] .admiral-details-plan-image, [data-apartment-details] .admiral-details-plan-empty { width: 120px; height: 112px; }
}
[data-apartment-details] .admiral-details-grid [data-orbitdata-transition] { opacity:1; transition:opacity 180ms ease; }
[data-apartment-details] .admiral-details-grid [data-orbitdata-transition][data-orbitdata-visible="false"] { opacity:0; pointer-events:none; }
/* The plan and its selection controls form the primary center composition. */
[data-apartment-details] .admiral-details-grid { grid-template-columns: minmax(0,1fr) 240px minmax(0,1fr); max-width: 1200px; margin-inline: auto; gap: 28px; padding-top: 12px; align-items: start; }
[data-apartment-details] .admiral-details-summary { grid-column: 1; grid-row: 1; min-width: 0; width: 100%; height: 210px; max-width: 360px; justify-self: end; display: grid; grid-template-rows: minmax(0,1fr) minmax(0,1fr); gap: 32px; transition: opacity 240ms ease; }
[data-apartment-details] :is(.admiral-details-summary,.admiral-details-plan)[data-info-visible="false"] { opacity: 0; }
[data-apartment-details] .admiral-details-summary .admiral-details-field { grid-area: auto; justify-self: stretch; min-width: 0; text-align: left; }
[data-apartment-details] .admiral-details-identity { display: flex; align-items: baseline; align-self: end; flex-wrap: wrap; gap: 8px 14px; }
[data-apartment-details] .admiral-details-facts { align-self: start; min-width: 0; }
[data-apartment-details] .admiral-details-identity .admiral-details-label { display: none; }
[data-apartment-details] .admiral-details-number .admiral-details-value { font-size: 29px; font-weight: 700; }
[data-apartment-details] .admiral-details-status .admiral-details-value { padding: 0; font-size: 12px; font-weight: 500; letter-spacing: 0; }
[data-apartment-details] .admiral-details-metrics { display: grid; grid-template-columns: repeat(3,minmax(0,1fr)); gap: 14px; }
[data-apartment-details] .admiral-details-metrics .admiral-details-label { font-size: 9px; letter-spacing: .04em; color: rgba(255,255,255,.72); }
[data-apartment-details] .admiral-details-metrics .admiral-details-value { font-size: 22px; font-weight: 700; }
[data-apartment-details] .admiral-details-secondary .admiral-details-field { display: flex; align-items: baseline; gap: 7px; margin-top: 12px; opacity: .75; }
[data-apartment-details] .admiral-details-secondary :is(.admiral-details-label,.admiral-details-value) { margin: 0; font-size: 11px; letter-spacing: 0; line-height: 1.3; text-transform: none; }
[data-apartment-details] .admiral-details-plan { grid-column: 2; grid-row: 1; transition: opacity 240ms ease; }
[data-apartment-details] :is(.admiral-details-plan-image,.admiral-details-plan-empty) { width: 240px; height: 210px; }
[data-apartment-details] .admiral-details-filter-row { grid-column: 3; grid-row: 1; width: 100%; min-width: 0; padding: 0; justify-content: flex-start; }
[data-apartment-details] [data-orbit-desktop-filters] { width: 100%; min-width: 0; }
[data-apartment-details] [data-orbit-desktop-filters] > [data-orbit-filters] { display: grid; grid-template-rows: minmax(0,1fr) minmax(0,1fr); align-items: start; row-gap: 32px; height: 210px; }
[data-apartment-details] [data-orbit-desktop-filters] [data-orbit-filter-row] { align-self: end; }
[data-apartment-details] [data-orbit-desktop-filters] [data-orbit-filter-ranges] { margin-top: 0; }

@container admiral-apartment (max-width: 1000px) {
    [data-apartment-details] .admiral-details-grid { grid-template-columns: minmax(0,1fr) 200px; gap: 14px 22px; max-width: 700px; }
    [data-apartment-details] .admiral-details-filter-row { grid-column: 1 / -1; grid-row: 1; justify-self: center; max-width: 520px; }
    [data-apartment-details] .admiral-details-summary { grid-column: 1; grid-row: 2; height: 180px; }
    [data-apartment-details] [data-orbit-desktop-filters] > [data-orbit-filters] { display: block; height: auto; }
    [data-apartment-details] [data-orbit-desktop-filters] [data-orbit-filter-ranges] { margin-top: 5px; }
    [data-apartment-details] .admiral-details-plan { grid-area: 2 / 2 / 3 / 3; }
    [data-apartment-details] :is(.admiral-details-plan-image,.admiral-details-plan-empty) { width: 200px; height: 180px; }
}
@container admiral-apartment (max-width: 540px) {
    [data-apartment-details] .admiral-details-grid { grid-template-columns: minmax(0,1fr) minmax(120px,1fr); gap: 10px 14px; }
    [data-apartment-details] .admiral-details-summary { height: 160px; gap: 24px; }
    [data-apartment-details] .admiral-details-metrics { grid-template-columns: minmax(0,1fr); gap: 6px; }
    [data-apartment-details] .admiral-details-metrics .admiral-details-field { display: flex; justify-content: space-between; align-items: baseline; gap: 5px; }
    [data-apartment-details] .admiral-details-metrics .admiral-details-label { margin: 0; font-size: 8px; }
    [data-apartment-details] .admiral-details-metrics .admiral-details-value { font-size: 17px; }
    [data-apartment-details] :is(.admiral-details-plan-image,.admiral-details-plan-empty) { width: 150px; height: 160px; }
}
@media (prefers-reduced-motion: reduce) {
    [data-apartment-details] :is(.admiral-details-summary,.admiral-details-plan) { transition: none; }
    [data-apartment-details], [data-apartment-details] .admiral-details-grid, [data-apartment-details] .admiral-details-grid [data-orbitdata-transition] { transform: none; transition: none; }
}
`

function ApartmentDetailsStrip({ apartment, language, visible, preview, bottom, inset, onHeightChange, onOpen, filters, filtersVisible = false, moving = false }: {
    apartment: ApartmentDetailsData | null
    language: ApartmentDetailsLanguage
    visible: boolean
    preview: boolean
    bottom: number
    inset: number
    onHeightChange?: (height: number) => void
    onOpen?: () => void
    filters?: React.ReactNode
    filtersVisible?: boolean
    moving?: boolean
}): React.JSX.Element {
    const transition = useOrbitDataTransition(apartment, apartment?.id || apartment?.number || null, { moving })
    const data: ApartmentDetailsData = transition.displayed ?? { number: "—", area: null, terrace: null, garden: null, rooms: null, availability: "" }
    const sample = preview
    const infoVisible = !!transition.displayed && transition.visible && visible
    const interactive = transition.interactive && visible
    const recordFade = { "data-orbitdata-transition": "", "data-orbitdata-phase": transition.phase,
        "data-orbitdata-displayed-id": transition.displayed?.id || transition.displayed?.number || "", "data-orbitdata-visible": String(infoVisible),
        "aria-hidden": !interactive, ...(!interactive ? { inert: "" as any } : {}) }
    const shown = visible && apartment !== null
    const shellShown = shown || !!filters && filtersVisible
    const hu = language !== "en"
    const labels = hu ? { number: "Lakás", area: "Alapterület", terrace: "Terasz", garden: "Kert", rooms: "Szobák", availability: "Státusz", floorplan: "Alaprajz" } :
        { number: "Apartment", area: "Area", terrace: "Terrace", garden: "Garden", rooms: "Rooms", availability: "Availability", floorplan: "Floor plan" }
    const sampleLabel = hu ? "MINTA" : "SAMPLE"
    const statusCode = data.availability.toLowerCase()
    const status = statusCode === "available" ? hu ? "Elérhető" : "Available" : statusCode === "reserved" ? hu ? "Foglalt" : "Reserved" : statusCode === "under_negotiation" ? hu ? "Egyeztetés alatt" : "In negotiation" : statusCode === "sold" ? hu ? "Eladva" : "Sold" : data.availability
    const formatter = new Intl.NumberFormat(hu ? "hu-HU" : "en-GB", { maximumFractionDigits: 2 })
    const root = React.useRef<HTMLDivElement>(null)
    useOrbitDataDividers(root, ".admiral-details-plan-image,.admiral-details-plan-empty", `${data.number}|${data.floorplanUrl || ""}`)
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
    return <div ref={root} data-apartment-details="" data-details-preview={sample ? "true" : "false"} data-details-visible={shown ? "true" : "false"} data-details-shell-visible={String(shellShown)}
        role="region" aria-label={`${hu ? "Lakásadatok" : "Apartment details"}${sample ? hu ? " — minta" : " — sample" : ""}`} aria-hidden={!shellShown} {...(!shellShown ? { inert: "" as any } : {})}
        style={{ position: "absolute", left: `min(${safeInset}px, 4%)`, right: `min(${safeInset}px, 4%)`, bottom: `calc(${safeBottom}px + env(safe-area-inset-bottom, 0px))`, "--admiral-details-bottom": `calc(${safeBottom}px + env(safe-area-inset-bottom, 0px))`, zIndex: 4, pointerEvents: "none" } as React.CSSProperties}>
        <style>{apartmentDetailsStyles}</style>
        <span data-orbitdata-divider="left" data-info-visible={String(shown)} aria-hidden="true" /><span data-orbitdata-divider="right" data-info-visible={String(shown)} aria-hidden="true" />
        <div className="admiral-details-grid">
          <div className="admiral-details-summary" data-info-visible={String(infoVisible)} {...recordFade}>
           <div className="admiral-details-identity">
            <div className="admiral-details-field admiral-details-number" data-apartment-field="number">
                <div className="admiral-details-label">{labels.number}{sample && <span className="admiral-details-sample">{sampleLabel}</span>}</div>
                <div className="admiral-details-value">{data.number}</div>
            </div>
            <div className="admiral-details-field admiral-details-status" data-apartment-field="availability" data-status={statusCode} style={{ color: orbitAvailabilityColor(statusCode) }}><div className="admiral-details-label">{labels.availability}</div><div className="admiral-details-value" style={{ color: "inherit" }}>{status || "—"}</div></div>
           </div>
           <div className="admiral-details-facts"><div className="admiral-details-metrics">{metric("area")}{metric("terrace")}{metric("garden")}</div>
           <div className="admiral-details-secondary">{metric("rooms", false)}</div></div>
          </div>
            <div className="admiral-details-field admiral-details-plan" data-apartment-field="floorplan" data-info-visible={String(infoVisible)} {...recordFade}>
                <div className="admiral-details-label">{labels.floorplan}</div>
                {onOpen ? <button type="button" data-apartment-open="" data-orbit-ignore="" aria-label={hu ? `${data.number} lakás részletei` : `Apartment ${data.number} details`} aria-haspopup="dialog" tabIndex={interactive ? 0 : -1} disabled={!interactive} onClick={() => { if (interactive) onOpen?.() }}>
                    {floorplan ? <img className="admiral-details-plan-image" src={floorplan} alt={hu ? `${data.number} lakás alaprajza` : `Floor plan of apartment ${data.number}`} loading="lazy" decoding="async" draggable={false} onError={() => setFailedFloorplan(floorplan)} /> : <span className="admiral-details-plan-empty">{hu ? "Részletek ↗" : "Details ↗"}</span>}
                    {floorplan && <span className="admiral-details-plan-caption">{hu ? "Adatlap ↗" : "Details ↗"}</span>}
                </button> : floorplan ? <img className="admiral-details-plan-image" src={floorplan} alt={hu ? `${data.number} lakás alaprajza` : `Floor plan of apartment ${data.number}`} loading="lazy" decoding="async" draggable={false} onError={() => setFailedFloorplan(floorplan)} /> : sample ?
                    <svg className="admiral-details-plan-image" viewBox="0 0 112 78" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label={hu ? "Mintaalaprajz — nem valódi lakás" : "Sample floor plan — not an actual apartment"}>
                        <path d="M7 6H105V58H77V69H7V6Z" stroke="currentColor" strokeWidth="1.3" />
                        <path d="M47 6V29M47 39V69M7 43H28M37 43H47M47 29H70M80 29H105M77 29V58M47 53H61M70 53H77" stroke="currentColor" strokeWidth="1.1" />
                        <path d="M47 39A10 10 0 0 0 37 29H47M37 43A9 9 0 0 0 28 34V43M80 29A10 10 0 0 0 70 19V29M70 53A9 9 0 0 0 61 44V53" stroke="currentColor" strokeWidth=".65" opacity=".65" />
                        <path d="M15 6H36M7 14V31M57 6H90M105 36V50M15 69H36M86 58H98" stroke="currentColor" strokeWidth="2.8" />
                        <text x="101" y="73" textAnchor="end" fill="currentColor" fontSize="6" letterSpacing="1.2" fontFamily="inherit" opacity=".75">{sampleLabel}</text>
                    </svg> : <span className="admiral-details-plan-empty">{hu ? "Nem elérhető" : "Unavailable"}</span>}
            </div>
            {filters && <div className="admiral-details-filter-row">{filters}</div>}
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
    let nativeDecodes = 0, decodeGeneration = 0;
    let lastPaint = "", lastNotification = "";
    let residentFramesDirty = true, requiredFramesDirty = true;
    let residentFramesText = "", requiredFramesText = "";
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

    function setData(name: string, text: string) {
        if (root.dataset[name] !== text) root.dataset[name] = text;
    }

    function notify() {
        if (destroyed) return;
        const value = snapshot();
        // These attributes are also consumed by picking and Framer overlays. Keep
        // them current without scheduling MutationObserver work for unchanged data.
        setData("orbitState", state); setData("orbitFrame", String(value.frame));
        setData("orbitCheckpoint", String(value.checkpoint)); setData("orbitReady", String(value.ready));
        setData("orbitDecoded", String(value.decoded)); setData("orbitDownloaded", String(value.downloaded));
        setData("orbitPosition", position.toFixed(4)); setData("orbitMotionWidth", String(motionWidth));
        setData("orbitTarget", (pendingMove?.target ?? settling?.target ?? position).toFixed(4));
        setData("orbitFrameBlend", String(frameBlend));
        setData("orbitLocked", String(!!settling || !!pendingMove));
        setData("orbitSuspended", String(suspended));
        setData("orbitBuffered", String(value.buffered)); setData("orbitBufferTotal", String(value.bufferTotal));
        setData("orbitRequiredReady", String(value.requiredReady)); setData("orbitRequiredTotal", String(value.requiredTotal));
        setData("orbitDecoding", String(nativeDecodes));
        setData("orbitCacheLimit", String(desired.size)); setData("orbitBufferCheckpoints", String(bufferCheckpoints));
        if (residentFramesDirty) { residentFramesText = [...frames.keys()].sort((a, b) => a - b).join(","); residentFramesDirty = false; }
        if (requiredFramesDirty) { requiredFramesText = [...required].sort((a, b) => a - b).join(","); requiredFramesDirty = false; }
        setData("orbitResidentFrames", residentFramesText); setData("orbitRequiredFrames", requiredFramesText);
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
        desired = new Set(wanted);
        if (essential.length !== required.size || essential.some(index => !required.has(index))) {
            required = new Set(essential); requiredFramesDirty = true;
        }
        priority = [...new Set([...first, ...wanted])].filter(index => desired.has(index));
        for (const [index, bitmap] of frames) if (!desired.has(index)) { bitmap.close(); frames.delete(index); residentFramesDirty = true; }
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
        const generation = decodeGeneration;
        decoding.add(index);
        try {
            const bitmap = await decodeBlob(blobs.get(index)!, motionWidth);
            if (destroyed || generation !== decodeGeneration || !desired.has(index)) bitmap.close();
            else { if (!frames.has(index)) residentFramesDirty = true; frames.get(index)?.close(); frames.set(index, bitmap); }
        } catch (reason) { if (!destroyed && generation === decodeGeneration) decodeFailed.set(index, String(reason)); }
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

    /** Download the complete compressed orbit without allocating decoded frames. */
    function prefetch(): void {
        if (destroyed || started || !total) return;
        started = true;
        pump();
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
        setData("orbitFrameFrom", String(from)); setData("orbitFrameTo", String(to)); setData("orbitFrameMix", frameMix.toFixed(4));
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
        return Array.from(root.querySelectorAll<HTMLElement>("[data-homepage-controls] button, button[data-apartment-open], button[data-orbit-detail-link], button[data-orbit-fullscreen-open], button[data-orbit-fullscreen-close], [data-orbit-filters], [data-orbit-filters] button, [data-orbit-price-popover], [data-orbit-area-popover]")).some(control => {
            if ((control as HTMLButtonElement).disabled || control.getAttribute("aria-disabled") === "true" || control.closest("[inert], [hidden], [aria-hidden='true']")) return false;
            const style = getComputedStyle(control);
            if (style.pointerEvents === "none") return false;
            for (let element: HTMLElement | null = control; element; element = element.parentElement) {
                const css = element === control ? style : getComputedStyle(element);
                if (css.display === "none" || css.visibility === "hidden" || css.visibility === "collapse" || Number(css.opacity) === 0) return false;
                if (element === root) break;
            }
            const box = control.getBoundingClientRect();
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
        if (!inputAvailable() || event.defaultPrevented || event.ctrlKey || event.metaKey || !insideViewer(event.clientX, event.clientY) || coveredTrialControl(event.clientX, event.clientY) || ignored(event.target)) return;
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

    /** Retain compressed downloads while optionally releasing all parked/motion bitmaps. */
    function deactivate(releaseDecoded = false) {
        activation++; active = false; automaticPause = false; releaseDrag(); settling = null; pendingMove = null; pausedAt = 0;
        if (raf) cancelAnimationFrame(raf); raf = 0; dropInspection();
        canvas.style.touchAction = originalTouchAction;
        error = undefined;
        if (releaseDecoded) {
            // The opening sequence must not share memory with an invisible orbit
            // window. Late native decodes keep their permits, then close instead
            // of entering a later preparation that happens to want the same IDs.
            decodeGeneration++; prepared = preparing = false;
            desired.clear(); required.clear(); priority = []; preparationRequired = [];
            residentFramesDirty = requiredFramesDirty = true;
            frames.forEach(bitmap => bitmap.close()); frames.clear();
            const resolve = prepareResolve; prepareResolve = prepareReject = null; preparePromise = null;
            // Old activation waiters observe the incremented activation token.
            // Finish abandoned warm-up promises without an unhandled rejection.
            resolve?.(); state = "idle"; finishWaiters(); notify(); pump();
            return;
        }
        state = prepared ? "idle" : preparing ? "loading" : "idle";
        if ((prepared || preparing) && !destroyed) setRestBuffer(startFrame, true);
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
        prefetch, prepare, activate, deactivate, go, setCheckpoint, pause: () => pauseInternal(false), resume, retry, snapshot, setSuspended, redraw: () => paint(performance.now()),
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

interface OrbitMaskRect { x: number; y: number; width: number; height: number }
interface OrbitApartmentPickerView {
    enabled: boolean; checkpoint: number; moving: boolean; suspended: boolean; mobile: boolean;
    width: number; height: number; viewport: OrbitMaskRect; focalX: number; focalY: number;
}
interface OrbitApartmentPickerOptions {
    root: HTMLElement; canvas: HTMLCanvasElement; urls: readonly string[];
    /** Actual exported mask RGB values; these may differ from the source object colours. */
    palette: readonly { id: string; maskColor: string; maskColorAliases?: readonly string[] }[];
    getView: () => OrbitApartmentPickerView;
    inputPoint: (clientX: number, clientY: number) => { x: number; y: number };
    onHover: (id: string | null) => void; onPick: (id: string) => void;
    getAllowedIds: () => readonly string[]; getHighlightIds: () => readonly string[];
    /** Availability colour for this apartment; absent values retain the configured fallback tint. */
    getHighlightColor?: (id: string) => string | undefined;
    /** Filter fills receive extra emphasis only under an actual desktop pointer. */
    isFilterActive?: () => boolean;
    highlightColor?: string; highlightOpacity?: number;
}
interface OrbitMaskIndex { width: number; height: number; pixels: Uint8Array }
interface OrbitApartmentPickerSnapshot {
    state: "off" | "moving" | "loading" | "ready" | "error"; checkpoint: number;
    cached: number; downloaded: number; hovered: string | null; highlighted: string[]; error: string | null;
}

function orbitNumericHighlightRGB(input: string): [number, number, number] | null {
    if (/^#(?:[0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(input)) {
        const raw = input.slice(1), hex = raw.length <= 4 ? raw.split("").map(channel => channel + channel).join("") : raw;
        return [parseInt(hex.slice(0, 2), 16), parseInt(hex.slice(2, 4), 16), parseInt(hex.slice(4, 6), 16)];
    }
    const match = input.match(/^rgba?\(([^()]*)\)$/i);
    if (!match) return null;
    const channels = match[1].trim().split(/[\s,/]+/).filter(Boolean);
    if ((channels.length !== 3 && channels.length !== 4) || channels.some(channel => !/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)%?$/.test(channel))) return null;
    const values = channels.slice(0, 3).map(channel => Math.round(Math.max(0, Math.min(255, channel.endsWith("%") ? parseFloat(channel) * 255 / 100 : parseFloat(channel)))));
    // Alpha is controlled separately by highlightOpacity for consistent filters.
    return [values[0], values[1], values[2]];
}

/** Resolve Framer tokens in the component's inherited CSS context, never by discarding their fallback wrapper. */
function orbitMaskHighlightRGB(value?: string, root?: HTMLElement): [number, number, number] {
    const input = typeof value === "string" ? value.trim() : "", fallback: [number, number, number] = [248, 214, 139];
    const numeric = orbitNumericHighlightRGB(input);
    if (numeric) return numeric;
    const owner = root?.ownerDocument;
    if (!input || !root || !owner) return fallback;
    let probe: HTMLSpanElement | null = null, surface: HTMLCanvasElement | null = null;
    try {
        probe = owner.createElement("span");
        probe.setAttribute("aria-hidden", "true");
        probe.style.cssText = "display:none!important;position:absolute!important;pointer-events:none!important";
        // Custom properties resolve inherited tokens and nested var() fallbacks.
        // An unresolved token also gets the explicit default below, rather than
        // accidentally inheriting the webpage's text colour.
        probe.style.setProperty("--admiral-highlight-probe-color", input);
        probe.style.setProperty("background-color", "var(--admiral-highlight-probe-color, #f8d68b)", "important");
        root.appendChild(probe);
        const resolved = (owner.defaultView?.getComputedStyle(probe) ?? getComputedStyle(probe)).backgroundColor;
        const direct = orbitNumericHighlightRGB(resolved);
        if (direct && !/^rgba?\(\s*0[\s,]+0[\s,]+0(?:[\s,/]+0(?:\.0+)?\s*)\)$/i.test(resolved)) return direct;
        // The browser converts supported hsl(), lab(), oklch(), color() and
        // display-p3 values into the overlay's default sRGB canvas colour space.
        surface = owner.createElement("canvas"); surface.width = surface.height = 1;
        const drawing = surface.getContext("2d", { willReadFrequently: true });
        if (!drawing) return fallback;
        drawing.fillStyle = "#f8d68b"; drawing.fillStyle = resolved; drawing.fillRect(0, 0, 1, 1);
        const pixel = drawing.getImageData(0, 0, 1, 1).data;
        return pixel[3] ? [pixel[0], pixel[1], pixel[2]] : fallback;
    } catch { return fallback; }
    finally {
        probe?.remove();
        if (surface) surface.width = surface.height = 0;
    }
}

/** The same object-fit:cover crop used by the orbit image, before any scene rotation. */
function orbitMaskCoverRect(width: number, height: number, viewport: OrbitMaskRect, focalX = .5, focalY = .5): OrbitMaskRect {
    const scale = Math.max(viewport.width / width, viewport.height / height);
    const resultWidth = width * scale, resultHeight = height * scale;
    return { x: viewport.x + (viewport.width - resultWidth) * Math.max(0, Math.min(1, focalX)),
        y: viewport.y + (viewport.height - resultHeight) * Math.max(0, Math.min(1, focalY)), width: resultWidth, height: resultHeight };
}

/** Encode an opaque exact RGB match once. Zero always means background or ambiguous edge. */
function buildOrbitMaskIndex(rgba: ArrayLike<number>, width: number, height: number, palette: readonly { id: string; maskColor: string; maskColorAliases?: readonly string[] }[]): OrbitMaskIndex {
    if (!Number.isInteger(width) || !Number.isInteger(height) || width <= 0 || height <= 0 || width * height > 16777216 || rgba.length !== width * height * 4) throw new Error("Invalid apartment mask dimensions");
    if (!palette.length || palette.length > 254) throw new Error("Invalid apartment mask palette");
    const colors = new Map<number, number>(), ids = new Set<string>();
    palette.forEach((entry, index) => {
        if (!entry.id || ids.has(entry.id) || (entry.maskColorAliases && (!Array.isArray(entry.maskColorAliases) || entry.maskColorAliases.length > 16))) throw new Error("Invalid apartment mask colour mapping");
        ids.add(entry.id);
        // Only explicitly audited byte encodings are accepted. This never
        // expands to a nearest-colour search or an arbitrary colour tolerance.
        for (const hex of new Set([entry.maskColor, ...(entry.maskColorAliases ?? [])])) {
            if (!/^#[0-9a-f]{6}$/i.test(hex)) throw new Error("Invalid apartment mask colour mapping");
            const rgb = parseInt(hex.slice(1), 16), owner = colors.get(rgb);
            if (rgb === 0 || rgb === 0xffffff || (owner !== undefined && owner !== index + 1)) throw new Error("Ambiguous apartment mask colour mapping");
            colors.set(rgb, index + 1);
        }
    });
    const pixels = new Uint8Array(width * height);
    for (let pixel = 0, channel = 0; pixel < pixels.length; pixel++, channel += 4) {
        if (rgba[channel + 3] !== 255) continue;
        pixels[pixel] = colors.get((rgba[channel] << 16) | (rgba[channel + 1] << 8) | rgba[channel + 2]) ?? 0;
    }
    return { width, height, pixels };
}

/** Require a solid pixel and its immediate neighbours; never guess an antialiased border. */
function orbitMaskPixelAt(mask: OrbitMaskIndex, x: number, y: number): number {
    const px = Math.floor(x), py = Math.floor(y);
    if (px < 1 || py < 1 || px >= mask.width - 1 || py >= mask.height - 1) return 0;
    const offset = py * mask.width + px, value = mask.pixels[offset];
    return value && mask.pixels[offset - 1] === value && mask.pixels[offset + 1] === value &&
        mask.pixels[offset - mask.width] === value && mask.pixels[offset + mask.width] === value ? value : 0;
}

/** Compressed masks stay downloaded; at most two compact one-byte ID maps stay decoded. */
function createOrbitApartmentPicker(options: OrbitApartmentPickerOptions) {
    const { root, canvas } = options, urls = [...options.urls], palette = [...options.palette];
    const context = canvas.getContext("2d"), cancellation = new AbortController();
    const blobs = new Map<number, Blob>(), masks = new Map<number, OrbitMaskIndex>(), failures = new Map<number, string>();
    const generations = new Map<number, number>(), reload = new Set<number>();
    const fetching = new Set<number>(), decoding = new Set<number>(), ids = palette.map(entry => entry.id);
    const indices = new Map(ids.map((id, index) => [id, index + 1]));
    let highlightColor = options.highlightColor, highlightRGB = orbitMaskHighlightRGB(highlightColor, root);
    let highlightOpacity = Math.max(0, Math.min(1, Number.isFinite(options.highlightOpacity) ? options.highlightOpacity! : .27));
    const colorCache = new Map<string, [number, number, number]>();
    let styleBounds: string | null = null;
    const controls = "nav,header,a,button,input,textarea,select,option,[contenteditable]:not([contenteditable='false']),[role='button'],[role='link'],[role='dialog']:not([data-orbit-fullscreen-surface]),[data-orbit-ignore]";
    let destroyed = false, begun = false, decodingIndex = -1, frame = 0, hovered: string | null = null, pointerHovered: string | null = null, currentCheckpoint = -1;
    let texture: HTMLCanvasElement | null = null, textureKey = "", paintKey = "";
    let latestPoint: { clientX: number; clientY: number; target: EventTarget | null } | null = null;
    let down: { id: number; x: number; y: number; checkpoint: number; mobile: boolean; dragged: boolean } | null = null;
    let diagnostics: OrbitApartmentPickerSnapshot = { state: "off", checkpoint: -1, cached: 0, downloaded: 0, hovered: null, highlighted: [], error: null };

    function setDiagnostic(name: string, value: string) {
        if (root.dataset[name] !== value) root.dataset[name] = value;
    }

    function viewReady(view: OrbitApartmentPickerView) {
        return !destroyed && !document.hidden && !!context && view.enabled && !view.moving && !view.suspended &&
            Number.isInteger(view.checkpoint) && view.checkpoint >= 0 && view.checkpoint < urls.length &&
            [view.width, view.height, view.viewport.x, view.viewport.y, view.viewport.width, view.viewport.height, view.focalX, view.focalY].every(Number.isFinite) &&
            view.width > 0 && view.height > 0 && view.viewport.width > 0 && view.viewport.height > 0;
    }

    function setHover(id: string | null, force = false, pointer = false) {
        pointerHovered = pointer ? id : null;
        if (hovered === id) { if (force) options.onHover(id); return; }
        hovered = id; setDiagnostic("orbitMaskHovered", id ?? "");
        options.onHover(id);
    }

    function clearTexture() {
        if (texture) texture.width = texture.height = 0;
        texture = null; textureKey = "";
    }

    function resolveHighlightStyle(color = highlightColor, opacity = highlightOpacity) {
        highlightColor = color;
        // Resolve inherited status tokens again after explicit style or viewport
        // changes, without probing the DOM on every pointer movement.
        colorCache.clear();
        const rgb = orbitMaskHighlightRGB(color, root), alpha = Math.max(0, Math.min(1, Number.isFinite(opacity) ? opacity : .27));
        if (rgb.every((channel, index) => channel === highlightRGB[index]) && alpha === highlightOpacity) return false;
        highlightRGB = rgb; highlightOpacity = alpha; clearTexture(); paintKey = "";
        return true;
    }

    function setHighlightStyle(color = highlightColor, opacity = highlightOpacity) {
        if (!destroyed) { resolveHighlightStyle(color, opacity); refresh(); }
    }

    function updateDiagnostics(view: OrbitApartmentPickerView, highlighted: string[] = []) {
        const available = viewReady(view), error = available ? failures.get(view.checkpoint) ?? null : null;
        const state = !view.enabled || view.suspended || document.hidden ? "off" : view.moving ? "moving" : !available ? "off" : error ? "error" : masks.has(view.checkpoint) ? "ready" : "loading";
        diagnostics = { state, checkpoint: available ? view.checkpoint : -1, cached: masks.size, downloaded: blobs.size, hovered, highlighted, error };
        setDiagnostic("orbitMaskState", state); setDiagnostic("orbitMaskCheckpoint", String(diagnostics.checkpoint));
        setDiagnostic("orbitMaskCached", String(masks.size)); setDiagnostic("orbitMaskDownloaded", String(blobs.size));
        setDiagnostic("orbitMaskHighlights", highlighted.join(",")); setDiagnostic("orbitMaskError", error ?? "");
    }

    function touchMask(index: number) {
        const mask = masks.get(index);
        if (mask) { masks.delete(index); masks.set(index, mask); }
        return mask;
    }

    function storeMask(index: number, mask: OrbitMaskIndex) {
        masks.delete(index); masks.set(index, mask);
        while (masks.size > 2) {
            const old = [...masks.keys()].find(key => key !== currentCheckpoint && key !== index) ?? [...masks.keys()][0];
            masks.delete(old);
        }
    }

    function priority() {
        const anchor = currentCheckpoint >= 0 ? currentCheckpoint : 0;
        return [...new Set([anchor, (anchor + 1) % urls.length, (anchor - 1 + urls.length) % urls.length, ...urls.map((_, index) => index)])];
    }

    async function fetchMask(index: number) {
        fetching.add(index);
        const generation = generations.get(index) ?? 0, valid = () => !destroyed && (generations.get(index) ?? 0) === generation;
        const controller = new AbortController(), abort = () => controller.abort();
        cancellation.signal.addEventListener("abort", abort, { once: true });
        const timer = setTimeout(abort, 15000);
        try {
            const cache = reload.delete(index) ? "reload" : "force-cache";
            const response = await fetch(urls[index], { signal: controller.signal, credentials: "omit", cache });
            if (!response.ok) throw new Error("Mask download failed (" + response.status + ")");
            const blob = await response.blob();
            if (!blob.size || blob.size > 16777216) throw new Error("Invalid apartment mask file");
            if (valid()) blobs.set(index, blob);
        } catch (reason) {
            if (valid()) failures.set(index, reason instanceof Error ? reason.message : "Mask download failed");
        } finally {
            clearTimeout(timer); cancellation.signal.removeEventListener("abort", abort); fetching.delete(index);
            if (!destroyed) { refresh(); pump(); }
        }
    }

    async function decodeMask(index: number) {
        decoding.add(index); decodingIndex = index;
        const generation = generations.get(index) ?? 0, valid = () => !destroyed && (generations.get(index) ?? 0) === generation;
        let image: ImageBitmap | HTMLImageElement | null = null, objectURL = "";
        let surface: HTMLCanvasElement | null = null;
        let expired = false;
        // Native ImageBitmap work cannot be cancelled; keep its one decode permit
        // until it settles, but stop presenting the view as indefinitely loading.
        const watchdog = setTimeout(() => {
            expired = true;
            if (valid()) { failures.set(index, "Mask decoding timed out"); refresh(); }
        }, 15000);
        try {
            const blob = blobs.get(index);
            if (!blob) return;
            if (typeof createImageBitmap === "function") {
                try { image = await createImageBitmap(blob, { premultiplyAlpha: "none", colorSpaceConversion: "none" }); }
                catch { /* Native PNG Image decoding is also available in older browsers. */ }
            }
            if (!valid() || expired) return;
            if (!image) {
                const fallback = new Image(); objectURL = URL.createObjectURL(blob); fallback.decoding = "async"; fallback.src = objectURL;
                image = fallback;
                await new Promise<void>((resolve, reject) => {
                    const timer = setTimeout(() => { fallback.src = ""; reject(new Error("Mask decoding timed out")); }, 12000);
                    const abort = () => { clearTimeout(timer); fallback.src = ""; reject(new Error("Mask picker disposed")); };
                    cancellation.signal.addEventListener("abort", abort, { once: true });
                    const done = () => { clearTimeout(timer); cancellation.signal.removeEventListener("abort", abort); };
                    fallback.decode().then(() => { done(); resolve(); }, reason => { done(); reject(reason); });
                });
            }
            if (!valid() || expired) return;
            const width = image.width, height = image.height;
            if (!width || !height || width * height > 16777216) throw new Error("Invalid apartment mask dimensions");
            surface = document.createElement("canvas"); surface.width = width; surface.height = height;
            const drawing = surface.getContext("2d", { willReadFrequently: true });
            if (!drawing) throw new Error("Mask decoding canvas is unavailable");
            drawing.drawImage(image, 0, 0);
            const rgba = drawing.getImageData(0, 0, width, height).data;
            const mask = buildOrbitMaskIndex(rgba, width, height, palette);
            if (!mask.pixels.some(value => value !== 0)) throw new Error("Mask colours do not match the apartment palette");
            if (valid() && !expired) storeMask(index, mask);
        } catch (reason) {
            if (valid()) failures.set(index, reason instanceof Error ? reason.message : "Mask decoding failed");
        } finally {
            clearTimeout(watchdog);
            if (image && "close" in image) image.close();
            else if (image) image.src = "";
            if (objectURL) URL.revokeObjectURL(objectURL);
            if (surface) surface.width = surface.height = 0;
            decoding.delete(index); decodingIndex = -1;
            if (!destroyed) { refresh(); pump(); }
        }
    }

    function pump() {
        if (destroyed || !begun || !urls.length) return;
        for (const index of priority()) {
            if (fetching.size >= 2) break;
            if (!blobs.has(index) && !fetching.has(index) && !failures.has(index)) void fetchMask(index);
        }
        if (decodingIndex !== -1) return;
        const target = currentCheckpoint;
        if (target >= 0 && blobs.has(target) && !masks.has(target) && !decoding.has(target) && !failures.has(target)) void decodeMask(target);
    }

    function highlightStyles(highlighted: string[], view: OrbitApartmentPickerView) {
        const boost = !view.mobile && options.isFilterActive?.() ? pointerHovered : null;
        return highlighted.map(id => {
            const color = options.getHighlightColor?.(id)?.trim();
            let rgb = highlightRGB;
            if (color) {
                const cached = colorCache.get(color);
                rgb = cached ?? orbitMaskHighlightRGB(color, root);
                if (!cached) colorCache.set(color, rgb);
            }
            const opacity = Math.min(1, highlightOpacity + (id === boost ? .30 : 0));
            return { index: indices.get(id)!, rgb, opacity };
        });
    }

    function makeTexture(mask: OrbitMaskIndex, styles: ReturnType<typeof highlightStyles>, key: string) {
        if (key === textureKey && texture) return texture;
        clearTexture();
        if (!styles.length) return null;
        // A tiny per-ID table resolves all strings once before the pixel loop.
        // We still retain one overlay texture, rather than an image per unit.
        const tint = new Uint8ClampedArray(255 * 4), borders = new Uint8Array(255), wanted = new Uint8Array(255);
        for (const style of styles) {
            const channel = style.index * 4;
            wanted[style.index] = 1;
            tint[channel] = style.rgb[0]; tint[channel + 1] = style.rgb[1]; tint[channel + 2] = style.rgb[2];
            tint[channel + 3] = Math.round(255 * style.opacity);
            borders[style.index] = Math.round(255 * Math.min(1, style.opacity + .5));
        }
        const surface = document.createElement("canvas"); surface.width = mask.width; surface.height = mask.height;
        const drawing = surface.getContext("2d");
        if (!drawing) return null;
        const image = drawing.createImageData(mask.width, mask.height), data = image.data, pixels = mask.pixels;
        for (let offset = 0; offset < pixels.length; offset++) {
            const apartment = pixels[offset];
            if (!apartment || !wanted[apartment]) continue;
            const x = offset % mask.width, y = Math.floor(offset / mask.width);
            const border = x === 0 || y === 0 || x === mask.width - 1 || y === mask.height - 1 ||
                pixels[offset - 1] !== apartment || pixels[offset + 1] !== apartment || pixels[offset - mask.width] !== apartment || pixels[offset + mask.width] !== apartment;
            const channel = offset * 4, color = apartment * 4;
            data[channel] = tint[color]; data[channel + 1] = tint[color + 1]; data[channel + 2] = tint[color + 2];
            data[channel + 3] = border ? borders[apartment] : tint[color + 3];
        }
        drawing.putImageData(image, 0, 0); texture = surface; textureKey = key;
        return texture;
    }

    function refresh() {
        if (destroyed) return;
        const view = options.getView(), ready = viewReady(view), checkpoint = ready ? view.checkpoint : -1;
        const bounds = view.width + "|" + view.height;
        if (bounds !== styleBounds) { if (styleBounds !== null) resolveHighlightStyle(); styleBounds = bounds; }
        if (checkpoint !== currentCheckpoint) { currentCheckpoint = checkpoint; setHover(null); clearTexture(); paintKey = ""; }
        if (ready) { begun = true; pump(); }
        if (!ready) { down = null; latestPoint = null; setHover(null); clearTexture(); }
        const mask = ready ? touchMask(checkpoint) : undefined;
        const allowed = new Set(options.getAllowedIds()), highlighted = mask ? [...new Set(options.getHighlightIds())].filter(id => allowed.has(id) && indices.has(id)).sort() : [];
        if (hovered && !allowed.has(hovered)) setHover(null);
        const styles = highlightStyles(highlighted, view);
        const textureSignature = checkpoint + ":" + styles.map(style => [style.index, ...style.rgb, style.opacity].join(",")).join(";");
        const logicalWidth = Number.isFinite(view.width) && view.width > 0 ? view.width : 1;
        const logicalHeight = Number.isFinite(view.height) && view.height > 0 ? view.height : 1;
        // A transparent full-window backing can otherwise allocate 32+ MB on
        // a 4K screen. Native masks have no additional detail above this budget.
        const dpr = Math.min(window.devicePixelRatio || 1, 2, Math.sqrt(1920 * 1010 / (logicalWidth * logicalHeight)));
        const width = Math.max(1, Math.floor(logicalWidth * dpr)), height = Math.max(1, Math.floor(logicalHeight * dpr));
        const signature = [checkpoint, !!mask, width, height, ...Object.values(view.viewport), view.focalX, view.focalY, textureSignature].join("|");
        if (signature !== paintKey && context) {
            if (canvas.width !== width || canvas.height !== height) { canvas.width = width; canvas.height = height; }
            context.clearRect(0, 0, canvas.width, canvas.height);
            const layer = mask ? makeTexture(mask, styles, textureSignature) : null;
            if (layer && mask) {
                const rect = orbitMaskCoverRect(mask.width, mask.height, view.viewport, view.focalX, view.focalY);
                context.save(); context.scale(width / view.width, height / view.height);
                context.beginPath(); context.rect(view.viewport.x, view.viewport.y, view.viewport.width, view.viewport.height); context.clip();
                context.drawImage(layer, rect.x, rect.y, rect.width, rect.height); context.restore();
            }
            paintKey = signature;
        }
        updateDiagnostics(view, highlighted);
    }

    function ignored(target: EventTarget | null) {
        let element = target instanceof Element ? target : null;
        if (!element) return true;
        while (element && element !== root && !element.contains(root)) {
            if (element.matches(controls)) return true;
            element = element.parentElement;
        }
        return false;
    }

    function coveredControl(x: number, y: number) {
        return Array.from(root.querySelectorAll<HTMLElement>(controls)).some(control => {
            if ((control as HTMLButtonElement).disabled || control.closest("[inert],[hidden],[aria-hidden='true']")) return false;
            const style = getComputedStyle(control);
            // The shared card keeps a full-window idle wrapper mounted with
            // pointer-events:none. Only a hit-testable control should obscure
            // the facade; an explicitly interactive child is checked itself.
            if (style.pointerEvents === "none") return false;
            for (let element: HTMLElement | null = control; element; element = element.parentElement) {
                const css = element === control ? style : getComputedStyle(element);
                if (css.display === "none" || css.visibility === "hidden" || css.visibility === "collapse" || Number(css.opacity) === 0) return false;
                if (element === root) break;
            }
            const bounds = control.getBoundingClientRect();
            return bounds.width > 0 && bounds.height > 0 && x >= bounds.left && x <= bounds.right && y >= bounds.top && y <= bounds.bottom;
        });
    }

    function hit(clientX: number, clientY: number, target: EventTarget | null) {
        const view = options.getView();
        if (!viewReady(view) || ignored(target) || coveredControl(clientX, clientY)) return null;
        const mask = masks.get(view.checkpoint), point = options.inputPoint(clientX, clientY), viewport = view.viewport;
        if (!mask || !Number.isFinite(point.x) || !Number.isFinite(point.y) || point.x < viewport.x || point.y < viewport.y || point.x >= viewport.x + viewport.width || point.y >= viewport.y + viewport.height) return null;
        const rect = orbitMaskCoverRect(mask.width, mask.height, viewport, view.focalX, view.focalY);
        const index = orbitMaskPixelAt(mask, (point.x - rect.x) * mask.width / rect.width, (point.y - rect.y) * mask.height / rect.height);
        const id = index ? ids[index - 1] : null;
        return id && options.getAllowedIds().includes(id) ? id : null;
    }

    function processHover() {
        frame = 0;
        if (!latestPoint || destroyed) return;
        const point = latestPoint; latestPoint = null;
        const id = hit(point.clientX, point.clientY, point.target);
        // Lifecycle clears can be intentionally ignored by the parent while a
        // detail card is open. Explicit background input still clears that
        // parent's restored highlight after the card has closed.
        setHover(id, id === null, true); refresh();
    }

    function onPointerMove(event: PointerEvent) {
        if (down && event.pointerId === down.id && Math.hypot(event.clientX - down.x, event.clientY - down.y) > 6) down.dragged = true;
        if (event.pointerType === "touch" || options.getView().mobile || down?.dragged || event.buttons) return;
        latestPoint = { clientX: event.clientX, clientY: event.clientY, target: event.target };
        if (!frame) frame = requestAnimationFrame(processHover);
    }

    function onPointerDown(event: PointerEvent) {
        if (!event.isPrimary || event.button !== 0 || event.defaultPrevented) { down = null; return; }
        const view = options.getView();
        if (!viewReady(view) || ignored(event.target) || coveredControl(event.clientX, event.clientY)) return;
        const point = options.inputPoint(event.clientX, event.clientY), viewport = view.viewport;
        if (point.x < viewport.x || point.y < viewport.y || point.x >= viewport.x + viewport.width || point.y >= viewport.y + viewport.height) return;
        down = { id: event.pointerId, x: event.clientX, y: event.clientY, checkpoint: view.checkpoint, mobile: view.mobile || event.pointerType === "touch", dragged: false };
    }

    function onPointerUp(event: PointerEvent) {
        if (!down || down.id !== event.pointerId) return;
        const press = down; down = null;
        if (press.dragged || Math.hypot(event.clientX - press.x, event.clientY - press.y) > 6 || options.getView().checkpoint !== press.checkpoint || event.defaultPrevented) return;
        const id = hit(event.clientX, event.clientY, event.target); setHover(id, id === null, !press.mobile); refresh();
        if (id && !press.mobile) options.onPick(id);
    }

    function onPointerCancel() { down = null; latestPoint = null; }
    function onPointerOut(event: PointerEvent) { if (!event.relatedTarget && !options.getView().mobile) { setHover(null); refresh(); } }
    function onVisibility() { if (document.hidden) onPointerCancel(); refresh(); }
    function onResize() { resolveHighlightStyle(); styleBounds = null; refresh(); }

    window.addEventListener("pointermove", onPointerMove, { passive: true, capture: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true, capture: true });
    window.addEventListener("pointerup", onPointerUp, { passive: true, capture: true });
    window.addEventListener("pointercancel", onPointerCancel, { passive: true, capture: true });
    window.addEventListener("pointerout", onPointerOut, { passive: true, capture: true });
    window.addEventListener("resize", onResize, { passive: true }); document.addEventListener("visibilitychange", onVisibility);
    refresh();
    return {
        refresh, setHighlightStyle,
        retry(checkpoint?: number) {
            if (destroyed) return;
            const failed = checkpoint === undefined ? [...failures.keys()] : failures.has(checkpoint) ? [checkpoint] : [];
            for (const index of failed) {
                // A corrected file must replace corrupt cached bytes. Version
                // guards also discard an old native decode that finishes late.
                generations.set(index, (generations.get(index) ?? 0) + 1);
                blobs.delete(index); masks.delete(index); failures.delete(index); reload.add(index);
                if (index === currentCheckpoint) { setHover(null); clearTexture(); paintKey = ""; }
            }
            refresh(); pump();
        },
        snapshot: () => ({ ...diagnostics, highlighted: [...diagnostics.highlighted] }),
        destroy() {
            if (destroyed) return;
            destroyed = true; cancellation.abort(); if (frame) cancelAnimationFrame(frame);
            window.removeEventListener("pointermove", onPointerMove, true); window.removeEventListener("pointerdown", onPointerDown, true);
            window.removeEventListener("pointerup", onPointerUp, true); window.removeEventListener("pointercancel", onPointerCancel, true);
            window.removeEventListener("pointerout", onPointerOut, true); window.removeEventListener("resize", onResize);
            document.removeEventListener("visibilitychange", onVisibility);
            down = latestPoint = null; clearTexture(); colorCache.clear(); masks.clear(); blobs.clear(); failures.clear(); generations.clear(); reload.clear();
            context?.clearRect(0, 0, canvas.width, canvas.height); setHover(null);
            setDiagnostic("orbitMaskState", "off"); setDiagnostic("orbitMaskCached", "0"); setDiagnostic("orbitMaskDownloaded", "0");
            setDiagnostic("orbitMaskHighlights", "");
        }
    };
}
