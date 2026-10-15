import * as React from "react"
import type { ComponentType } from "react"
import { addPropertyControls, ControlType, RenderTarget, useIsStaticRenderer } from "framer"

const ADMIRAL_SEQUENCE_BASE = "https://raw.githubusercontent.com/UnbuiltMarket/admiral-park/main/assets/images/AVIF%2030_1920x1010%20DESKTOP%20HERO%20SEQUENCE"
const ADMIRAL_SEQUENCE_VERSION = "__SEQUENCE_VERSION__"

interface OverlayTiming {
    openingOut: number; buildingIn: number; buildingFull: number; ctaIn: number; rise: number
}
interface SequenceChannel { snapshot: SequenceSnapshot; timing: OverlayTiming }
const sequenceChannels = new Map<HTMLElement, SequenceChannel>()
const sequenceSubscribers = new Set<() => void>()
function notifySequenceOverlays() { sequenceSubscribers.forEach(update => update()) }

interface AdmiralHeroSequenceProps {
    useGitHubAssets?: boolean; baseUrl?: string; filename?: string; frameCount?: number; firstIndex?: number; digits?: number
    duration?: number; maxSpeed?: number; momentum?: number; triggerDistance?: number; holdScroll?: boolean; preload?: boolean
    cacheFrames?: number; mobileWidth?: number; focalX?: number; focalY?: number; darken?: number
    openingOut?: number; buildingIn?: number; buildingFull?: number; ctaIn?: number; rise?: number
    editorView?: "opening" | "arrival"; showControls?: boolean; background?: string; alt?: string; style?: React.CSSProperties
}

/**
 * @framerSupportedLayoutWidth any-prefer-fixed
 * @framerSupportedLayoutHeight any-prefer-fixed
 * @framerIntrinsicWidth 1440
 * @framerIntrinsicHeight 900
 */
export default function AdmiralHeroSequence(props: AdmiralHeroSequenceProps): React.JSX.Element {
    const {
        useGitHubAssets = true, baseUrl = "", filename = "frame-{index}.avif", frameCount = 65, firstIndex = 0, digits = 2,
        duration = 2.5, maxSpeed = 1.8, momentum = .22, triggerDistance = 28, holdScroll = true, preload = true,
        cacheFrames = 14, mobileWidth = 1280, focalX = 50, focalY = 50, darken = 0,
        openingOut = 20, buildingIn = 68, buildingFull = 88, ctaIn = 86, rise = 20,
        editorView = "opening", showControls = true, background = "#101820",
        alt = "Aerial approach from Lake Balaton to Admiral Park in Balatonfüred", style,
    } = props
    const staticRenderer = useIsStaticRenderer()
    const urls = React.useMemo(() => {
        const base = (useGitHubAssets ? ADMIRAL_SEQUENCE_BASE : baseUrl).trim().replace(/\/+$/, "")
        const pattern = useGitHubAssets ? "raw sequence{index}.avif" : filename
        const count = useGitHubAssets ? 65 : Math.round(Math.max(2, Math.min(300, frameCount)))
        return Array.from({ length: count }, (_, i) => {
            const number = String(i + (useGitHubAssets ? 0 : firstIndex)).padStart(useGitHubAssets ? 2 : digits, "0")
            return base + "/" + encodeURIComponent(pattern.replace("{index}", number)) + (useGitHubAssets ? "?v=" + ADMIRAL_SEQUENCE_VERSION : "")
        })
    }, [useGitHubAssets, baseUrl, filename, frameCount, firstIndex, digits])
    const rootRef = React.useRef<HTMLDivElement>(null)
    const canvasRef = React.useRef<HTMLCanvasElement>(null)
    const posterRef = React.useRef<HTMLImageElement>(null)
    const playerRef = React.useRef<ReturnType<typeof createHeroSequence> | null>(null)
    const timing = React.useRef<OverlayTiming>({ openingOut, buildingIn, buildingFull, ctaIn, rise })
    timing.current = { openingOut, buildingIn, buildingFull, ctaIn, rise }
    const [state, setState] = React.useState<SequenceState>("opening")
    const previousState = React.useRef<SequenceState>("opening")
    const previewEnd = staticRenderer && typeof window !== "undefined" && RenderTarget.current() === RenderTarget.canvas && editorView === "arrival"

    React.useEffect(() => {
        const root = rootRef.current, canvas = canvasRef.current, poster = posterRef.current
        if (!root || !canvas || !poster) return
        const initial: SequenceSnapshot = {
            state: previewEnd ? "arrival" : "opening", progress: previewEnd ? 1 : 0,
            frame: previewEnd ? urls.length - 1 : 0, direction: 1, held: false, decoded: 0, downloaded: 0,
        }
        const report = (snapshot: SequenceSnapshot) => {
            sequenceChannels.set(root, { snapshot, timing: timing.current })
            notifySequenceOverlays()
            if (snapshot.state !== previousState.current) {
                previousState.current = snapshot.state
                setState(snapshot.state)
            }
        }
        report(initial)
        if (!staticRenderer) {
            const phone = window.matchMedia("(max-width: 767px)").matches
            const player = createHeroSequence({
                root, canvas, poster, urls, duration, maxSpeed, momentum, triggerDistance, holdScroll, preload,
                cacheFrames: phone ? Math.min(cacheFrames, 10) : cacheFrames,
                decodeWidth: phone ? mobileWidth : 1920, focalX, focalY, onUpdate: report,
            })
            playerRef.current = player
        }
        return () => {
            playerRef.current?.destroy(); playerRef.current = null
            sequenceChannels.delete(root); notifySequenceOverlays()
        }
    }, [urls, staticRenderer, previewEnd, duration, maxSpeed, momentum, triggerDistance, holdScroll, preload, cacheFrames, mobileWidth, focalX, focalY])

    React.useEffect(() => {
        const channel = rootRef.current && sequenceChannels.get(rootRef.current)
        if (channel) { channel.timing = timing.current; notifySequenceOverlays() }
    }, [openingOut, buildingIn, buildingFull, ctaIn, rise])

    const busy = state === "loading" || state === "moving"
    const recoverable = state === "paused" || state === "error"
    return (
        <div ref={rootRef} className="admiral-hero-sequence" data-admiral-sequence=""
            style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden", background, ...style }}>
            <img ref={posterRef} src={urls[previewEnd ? urls.length - 1 : 0]} alt={alt}
                loading="eager" decoding="async" {...{ fetchpriority: "high" }} crossOrigin="anonymous" draggable={false}
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover",
                    objectPosition: `${focalX}% ${focalY}%`, pointerEvents: "none" }} />
            <canvas ref={canvasRef} aria-hidden="true" width={1} height={1}
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0, pointerEvents: "none" }} />
            <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "black", opacity: darken, pointerEvents: "none" }} />
            {showControls && !staticRenderer && (busy || recoverable) && (
                <div data-sequence-controls="" style={{ position: "absolute", bottom: 16, right: 16, display: "flex", gap: 8, zIndex: 2 }}>
                    {recoverable && <button type="button" onClick={() => playerRef.current?.start()} style={sequenceControlStyle}>
                        {state === "error" ? "Retry animation" : "Continue animation"}
                    </button>}
                    <button type="button" onClick={() => playerRef.current?.skip()} style={sequenceControlStyle}>
                        Skip animation
                    </button>
                </div>
            )}
            <span role="status" aria-live="polite" style={{ position: "absolute", width: 1, height: 1, padding: 0, overflow: "hidden", clipPath: "inset(50%)", whiteSpace: "nowrap" }}>
                {state === "error" ? "Animation unavailable. You can continue down the page." : ""}
            </span>
        </div>
    )
}
const sequenceControlStyle: React.CSSProperties = {
    appearance: "none", border: "1px solid rgba(255,255,255,.5)", borderRadius: 6,
    background: "rgba(10,20,28,.75)", color: "white", font: "500 12px/1.3 system-ui,sans-serif",
    padding: "8px 12px", cursor: "pointer",
}

// Apply these to native Framer wrapper Frames. Their children keep native typography, links and hover effects.
function createSequenceOverlay(Component: React.ComponentType<any>, kind: "opening" | "building" | "cta"): React.ComponentType<any> {
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
            const original = { opacity: element.style.opacity, translate: element.style.translate,
                pointerEvents: element.style.pointerEvents, visibility: element.style.visibility,
                hidden: element.getAttribute("aria-hidden"), inert: element.inert }
            let selected: HTMLElement | null = null
            function resolve() {
                if (selected?.isConnected && sequenceChannels.has(selected) && selected.getBoundingClientRect().width > 0) return sequenceChannels.get(selected)
                let parent = element!.parentElement
                while (parent) {
                    const candidates = [...sequenceChannels.keys()].filter(root => parent!.contains(root) && root.getBoundingClientRect().width > 0)
                    if (candidates.length) { selected = candidates[0]; return sequenceChannels.get(selected) }
                    parent = parent.parentElement
                }
            }
            function update() {
                const channel = resolve()
                if (!channel) return
                const { progress } = channel.snapshot, t = channel.timing
                const ramp = (from: number, to: number) => sequenceEase(sequenceClamp((progress * 100 - from) / Math.max(1, to - from)))
                const opacity = kind === "opening" ? 1 - ramp(0, t.openingOut) :
                    kind === "building" ? ramp(t.buildingIn, t.buildingFull) : ramp(t.ctaIn, 100)
                const interactive = opacity >= .98 && (kind !== "cta" || channel.snapshot.state === "arrival" || channel.snapshot.state === "reduced")
                element!.style.opacity = String(opacity)
                element!.style.translate = `0px ${kind === "opening" ? -(1 - opacity) * t.rise * .6 : (1 - opacity) * t.rise}px`
                element!.style.visibility = opacity < .001 ? "hidden" : original.visibility
                element!.style.pointerEvents = interactive ? original.pointerEvents : "none"
                element!.inert = interactive ? original.inert : true
                if (opacity < .01) element!.setAttribute("aria-hidden", "true")
                else if (original.hidden === null) element!.removeAttribute("aria-hidden")
                else element!.setAttribute("aria-hidden", original.hidden)
                element!.dataset.heroOverlay = kind
            }
            sequenceSubscribers.add(update); update()
            return () => {
                sequenceSubscribers.delete(update)
                element.style.opacity = original.opacity; element.style.translate = original.translate
                element.style.pointerEvents = original.pointerEvents; element.style.visibility = original.visibility
                element.inert = original.inert
                if (original.hidden === null) element.removeAttribute("aria-hidden"); else element.setAttribute("aria-hidden", original.hidden)
                delete element.dataset.heroOverlay
            }
        }, [])
        return <Component {...props} ref={ref} style={{ ...props.style, opacity: kind === "opening" ? 1 : 0 }} />
    })
    Overlay.displayName = `Sequence${kind}`
    return Overlay
}

export function OpeningContent(Component: ComponentType<any>): ComponentType {
    return createSequenceOverlay(Component, "opening")
}
export function BuildingContent(Component: ComponentType<any>): ComponentType {
    return createSequenceOverlay(Component, "building")
}
export function ArrivalCTA(Component: ComponentType<any>): ComponentType {
    return createSequenceOverlay(Component, "cta")
}

AdmiralHeroSequence.displayName = "Hero Sequence"
addPropertyControls(AdmiralHeroSequence, {
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

// @CORE_INSERT
