import * as React from "react"
import type { ComponentType } from "react"
import { addPropertyControls, ControlType, RenderTarget, useIsStaticRenderer } from "framer"

// Paste this bridge once. The published runtime is checked once per page visit.
const HOST = "https://unbuiltmarket.github.io/admiral-park/"
const FALLBACK = __FALLBACK_RELEASE__
const POSTERS = __FALLBACK_POSTERS__
// @PROPS_INSERT
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
// @CONTROLS_INSERT
