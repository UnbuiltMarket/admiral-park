// Permanent Framer bridge. Paste the entire file once; future compatible runtimes load from GitHub Pages.
import * as React from "react"
import type { ComponentType } from "react"
import { addPropertyControls, ControlType, RenderTarget, useIsStaticRenderer } from "framer"

// Paste this bridge once. The published runtime is checked once per page visit.
const HOST = "https://unbuiltmarket.github.io/admiral-park/"
const FALLBACK = {"api":1,"version":"10d3cce4b5e08bed","script":"releases/admiral-hero.10d3cce4b5e08bed.js","integrity":"sha384-qdkd4DQK00eZZnCPLtBtyU0cGNP1aT/CBaTtdr2IOSmqjEjdTkW3F879Rtj3ZJY3"}
const POSTERS = {"opening":"https://unbuiltmarket.github.io/admiral-park/assets/92a9ae63b113/raw%20sequence00.avif?v=92a9ae63b113","arrival":"https://unbuiltmarket.github.io/admiral-park/assets/92a9ae63b113/raw%20sequence64.avif?v=92a9ae63b113","openingFallback":"https://raw.githubusercontent.com/UnbuiltMarket/admiral-park/main/assets/images/AVIF%2030_1920x1010%20DESKTOP%20HERO%20SEQUENCE/raw%20sequence00.avif?v=92a9ae63b113","arrivalFallback":"https://raw.githubusercontent.com/UnbuiltMarket/admiral-park/main/assets/images/AVIF%2030_1920x1010%20DESKTOP%20HERO%20SEQUENCE/raw%20sequence64.avif?v=92a9ae63b113"}
interface AdmiralHeroSequenceProps {
    useGitHubAssets?: boolean; baseUrl?: string; filename?: string; frameCount?: number; firstIndex?: number; digits?: number
    duration?: number; maxSpeed?: number; momentum?: number; triggerDistance?: number; holdScroll?: boolean; preload?: boolean
    cacheFrames?: number; mobileWidth?: number; focalX?: number; focalY?: number; darken?: number
    openingOut?: number; buildingIn?: number; buildingFull?: number; ctaIn?: number; rise?: number
    editorView?: "opening" | "arrival"; showControls?: boolean; background?: string; alt?: string; style?: React.CSSProperties
}
interface HeroModule {
    default: ComponentType<AdmiralHeroSequenceProps>
    OpeningContent: (component: ComponentType<any>) => ComponentType<any>
    BuildingContent: (component: ComponentType<any>) => ComponentType<any>
    ArrivalCTA: (component: ComponentType<any>) => ComponentType<any>
}
interface Release { api: number; version: string; script: string; integrity: string }
type Factory = (react: typeof React, framer: object) => HeroModule
type HeroWindow = Window & { __admiralHeroFactoriesV1?: Record<string, Factory> }
interface RuntimeState { module: HeroModule | null; version: string; failed: boolean }
const initialState: RuntimeState = { module: null, version: "", failed: false }
let runtimeState = initialState
let pending: Promise<void> | null = null
const subscribers = new Set<() => void>()
const subscribe = (listener: () => void) => { subscribers.add(listener); return () => { subscribers.delete(listener) } }
const snapshot = () => runtimeState
const serverSnapshot = () => initialState

function validateRelease(value: any): Release {
    if (value?.api !== 1 || !/^[a-f0-9]{16}$/.test(value.version) ||
        value.script !== `releases/admiral-hero.${value.version}.js` ||
        !/^sha384-[A-Za-z0-9+/]{64}$/.test(value.integrity)) throw new Error("Invalid hero release")
    return value
}
async function latestRelease(): Promise<Release> {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 5000)
    try {
        const response = await fetch(HOST + "hero-manifest.json?visit=" + Date.now(), {
            signal: controller.signal, cache: "no-store", mode: "cors", credentials: "omit",
        })
        if (!response.ok) throw new Error("Hero manifest unavailable")
        return validateRelease(await response.json())
    } finally { clearTimeout(timeout) }
}
function loadScript(release: Release): Promise<Factory> {
    const scope = window as HeroWindow
    const existing = scope.__admiralHeroFactoriesV1?.[release.version]
    if (existing) return Promise.resolve(existing)
    return new Promise((resolve, reject) => {
        const script = document.createElement("script")
        let settled = false
        const finish = (error?: Error) => {
            if (settled) return
            settled = true; clearTimeout(timeout); script.onload = null; script.onerror = null; script.remove()
            const factory = scope.__admiralHeroFactoriesV1?.[release.version]
            if (error || typeof factory !== "function") reject(error || new Error("Hero runtime did not register"))
            else resolve(factory)
        }
        const timeout = setTimeout(() => finish(new Error("Hero runtime timed out")), 8000)
        script.src = HOST + release.script
        script.integrity = release.integrity
        script.crossOrigin = "anonymous"
        script.async = true
        script.onload = () => finish()
        script.onerror = () => finish(new Error("Hero runtime unavailable"))
        document.head.appendChild(script)
    })
}
async function instantiate(release: Release): Promise<RuntimeState> {
    const factory = await loadScript(release)
    // Share Framer's React instance; the remote bundle contains no extra React copy.
    const module = factory(React, { ControlType, RenderTarget, useIsStaticRenderer, addPropertyControls: () => {} })
    if (!["default", "OpeningContent", "BuildingContent", "ArrivalCTA"].every(key => typeof module?.[key as keyof HeroModule] === "function")) {
        throw new Error("Incompatible hero runtime")
    }
    return { module, version: release.version, failed: false }
}
function ensureRuntime() {
    if (pending) return pending
    pending = (async () => {
        try { runtimeState = await instantiate(await latestRelease()) }
        catch {
            try { runtimeState = await instantiate(validateRelease(FALLBACK)) }
            catch { runtimeState = { module: null, version: "", failed: true } }
        }
        subscribers.forEach(listener => listener())
    })()
    return pending
}
function useRuntime() {
    const isStatic = useIsStaticRenderer()
    const value = React.useSyncExternalStore(subscribe, snapshot, serverSnapshot)
    React.useEffect(() => { if (!isStatic) void ensureRuntime() }, [isStatic])
    return isStatic ? initialState : value
}
class HeroBoundary extends React.Component<{ children: React.ReactNode; fallback: React.ReactNode }, { failed: boolean }> {
    state = { failed: false }
    static getDerivedStateFromError() { return { failed: true } }
    render() { return this.state.failed ? this.props.fallback : this.props.children }
}
function posterURL(props: AdmiralHeroSequenceProps, arrival: boolean) {
    if (props.useGitHubAssets !== false) return arrival ? POSTERS.arrival : POSTERS.opening
    const index = (props.firstIndex ?? 0) + (arrival ? Math.max(2, props.frameCount ?? 65) - 1 : 0)
    return (props.baseUrl ?? "").replace(/\/+$/, "") + "/" + encodeURIComponent(
        (props.filename ?? "frame-{index}.avif").replace("{index}", String(index).padStart(props.digits ?? 2, "0")))
}

/**
 * @framerSupportedLayoutWidth any-prefer-fixed
 * @framerSupportedLayoutHeight any-prefer-fixed
 * @framerIntrinsicWidth 1440
 * @framerIntrinsicHeight 900
 */
export default function AdmiralHeroLoader(props: AdmiralHeroSequenceProps): React.JSX.Element {
    const runtime = useRuntime()
    const isStatic = useIsStaticRenderer()
    const arrival = isStatic && typeof window !== "undefined" && RenderTarget.current() === RenderTarget.canvas && props.editorView === "arrival"
    const Hero = runtime.module?.default
    return <div data-admiral-loader="" data-runtime-version={runtime.version}
        data-runtime-status={runtime.failed ? "unavailable" : Hero ? "ready" : "loading"}
        style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden", background: props.background ?? "#101820", ...props.style }}>
        <img src={posterURL(props, arrival)} alt={Hero ? "" : props.alt ?? "Aerial approach from Lake Balaton to Admiral Park in Balatonfüred"}
            aria-hidden={Hero ? true : undefined} loading="eager" decoding="async" crossOrigin="anonymous" {...{ fetchpriority: "high" }}
            onError={event => {
                if (props.useGitHubAssets === false) return
                const fallback = arrival ? POSTERS.arrivalFallback : POSTERS.openingFallback
                if (event.currentTarget.src !== fallback) event.currentTarget.src = fallback
            }}
            draggable={false} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover",
                objectPosition: `${props.focalX ?? 50}% ${props.focalY ?? 50}%`, pointerEvents: "none" }} />
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "black", opacity: Hero ? 0 : props.darken ?? 0, pointerEvents: "none" }} />
        {Hero && <HeroBoundary fallback={null}><Hero {...props}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", background: "transparent" }} /></HeroBoundary>}
    </div>
}
function remoteOverlay(Component: ComponentType<any>, name: "OpeningContent" | "BuildingContent" | "ArrivalCTA"): ComponentType<any> {
    const Overlay = React.forwardRef<HTMLElement, any>((props, ref) => {
        const runtime = useRuntime()
        const Wrapped = React.useMemo(() => runtime.module?.[name](Component), [runtime.module])
        const opening = name === "OpeningContent"
        const fallback = <Component {...props} ref={ref} aria-hidden={opening ? props["aria-hidden"] : true}
            style={{ ...props.style, opacity: opening ? 1 : 0, visibility: opening ? props.style?.visibility : "hidden", pointerEvents: opening ? props.style?.pointerEvents : "none" }} />
        return Wrapped ? <HeroBoundary fallback={fallback}><Wrapped {...props} ref={ref} /></HeroBoundary> : fallback
    })
    Overlay.displayName = `Remote${name}`
    return Overlay
}
export function OpeningContent(Component: ComponentType<any>): ComponentType { return remoteOverlay(Component, "OpeningContent") }
export function BuildingContent(Component: ComponentType<any>): ComponentType { return remoteOverlay(Component, "BuildingContent") }
export function ArrivalCTA(Component: ComponentType<any>): ComponentType { return remoteOverlay(Component, "ArrivalCTA") }

AdmiralHeroLoader.displayName = "Hero Sequence"
addPropertyControls(AdmiralHeroLoader, {
    useGitHubAssets: { type: ControlType.Boolean, title: "GitHub assets", defaultValue: true },
    baseUrl: { type: ControlType.String, title: "Folder URL", defaultValue: "", hidden: p => p.useGitHubAssets !== false },
    filename: { type: ControlType.String, title: "Filename", defaultValue: "frame-{index}.avif", hidden: p => p.useGitHubAssets !== false },
    frameCount: { type: ControlType.Number, title: "Frames", defaultValue: 65, min: 2, max: 300, step: 1, hidden: p => p.useGitHubAssets !== false },
    firstIndex: { type: ControlType.Number, title: "First index", defaultValue: 0, min: 0, max: 999, step: 1, hidden: p => p.useGitHubAssets !== false },
    digits: { type: ControlType.Number, title: "Digits", defaultValue: 2, min: 1, max: 6, step: 1, hidden: p => p.useGitHubAssets !== false },
    duration: { type: ControlType.Number, title: "Journey", defaultValue: 2.5, min: .6, max: 10, step: .1, unit: "s" },
    maxSpeed: { type: ControlType.Number, title: "Max boost", defaultValue: 1.8, min: 1, max: 3, step: .1, unit: "×" },
    momentum: { type: ControlType.Number, title: "Momentum", defaultValue: .22, min: .08, max: .6, step: .02, unit: "s" },
    triggerDistance: { type: ControlType.Number, title: "Trigger", defaultValue: 28, min: 8, max: 150, step: 1, unit: "px" },
    holdScroll: { type: ControlType.Boolean, title: "Hold hero", defaultValue: true },
    preload: { type: ControlType.Boolean, title: "Preload", defaultValue: true },
    openingOut: { type: ControlType.Number, title: "Opening out", defaultValue: 20, min: 1, max: 50, step: 1, unit: "%" },
    buildingIn: { type: ControlType.Number, title: "Building in", defaultValue: 68, min: 20, max: 95, step: 1, unit: "%" },
    buildingFull: { type: ControlType.Number, title: "Building full", defaultValue: 88, min: 40, max: 100, step: 1, unit: "%" },
    ctaIn: { type: ControlType.Number, title: "CTA in", defaultValue: 86, min: 40, max: 99, step: 1, unit: "%" },
    rise: { type: ControlType.Number, title: "Text rise", defaultValue: 20, min: 0, max: 60, step: 1, unit: "px" },
    focalX: { type: ControlType.Number, title: "Focal X", defaultValue: 50, min: 0, max: 100, unit: "%" },
    focalY: { type: ControlType.Number, title: "Focal Y", defaultValue: 50, min: 0, max: 100, unit: "%" },
    darken: { type: ControlType.Number, title: "Darken", defaultValue: 0, min: 0, max: .8, step: .05 },
    mobileWidth: { type: ControlType.Number, title: "Phone decode", defaultValue: 1280, min: 640, max: 1920, step: 160, unit: "px" },
    cacheFrames: { type: ControlType.Number, title: "Decoded cache", defaultValue: 14, min: 8, max: 24, step: 1 },
    editorView: { type: ControlType.Enum, title: "Editor view", options: ["opening", "arrival"], optionTitles: ["Opening", "Arrival"], defaultValue: "opening" },
    showControls: { type: ControlType.Boolean, title: "Skip control", defaultValue: true },
    background: { type: ControlType.Color, title: "Background", defaultValue: "#101820" },
    alt: { type: ControlType.String, title: "Image alt", defaultValue: "Aerial approach from Lake Balaton to Admiral Park in Balatonfüred" },
})
