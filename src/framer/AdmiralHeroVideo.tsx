// Generated standalone Framer Code Component. Paste this entire file into Framer.
import * as React from "react"
import { addPropertyControls, ControlType, useIsStaticRenderer } from "framer"

type ImageValue = { src?: string; srcSet?: string; alt?: string } | string | null
const DEFAULT_VIDEO_URL = "https://raw.githubusercontent.com/UnbuiltMarket/admiral-park/main/assets/videos/admiral-park-hero-1920-quality%20VBR%206%20_V02.mp4"
const DEFAULT_FIRST_FRAME = {
    src: "https://raw.githubusercontent.com/UnbuiltMarket/admiral-park/main/assets/images/START%20frame_web_V02.webp",
    alt: "First frame",
}
const DEFAULT_LAST_FRAME = {
    src: "https://raw.githubusercontent.com/UnbuiltMarket/admiral-park/main/assets/images/END%20frame_web_V02.webp",
    alt: "Last frame",
}
const HERO_CSS = ".admiral-hero-video .ap-video,.admiral-hero-video .ap-last{opacity:0}.admiral-hero-video button:focus-visible{outline:2px solid white;outline-offset:4px}"

interface AdmiralHeroVideoProps {
    useGitHubAssets: boolean
    videoUrl: string
    mobileVideoUrl: string
    startFrame?: ImageValue
    endFrame?: ImageValue
    autoplay: boolean
    loop: boolean
    muted: boolean
    objectFit: "cover" | "contain" | "fill" | "none" | "scale-down"
    overlay: number
    focalX: number
    focalY: number
    holdScroll: boolean
    triggerDistance: number
    preloadVideo: boolean
    showControls: boolean
    backgroundColor: string
    buttonTextColor: string
    buttonBackgroundColor: string
    buttonBorderColor: string
    style?: React.CSSProperties
}
/**
 * @framerSupportedLayoutWidth any-prefer-fixed
 * @framerSupportedLayoutHeight any-prefer-fixed
 * @framerIntrinsicWidth 1440
 * @framerIntrinsicHeight 900
 */
export default function AdmiralHeroVideo(props: AdmiralHeroVideoProps): React.JSX.Element {
    const {
        useGitHubAssets = true,
        videoUrl = DEFAULT_VIDEO_URL,
        mobileVideoUrl = "",
        startFrame = DEFAULT_FIRST_FRAME,
        endFrame = DEFAULT_LAST_FRAME,
        autoplay = true,
        loop = false,
        muted = true,
        objectFit = "cover",
        overlay = 0,
        focalX = 50,
        focalY = 50,
        holdScroll = true,
        triggerDistance = 18,
        preloadVideo = true,
        showControls = true,
        backgroundColor = "#111111",
        buttonTextColor = "#FFFFFF",
        buttonBackgroundColor = "rgba(0,0,0,.45)",
        buttonBorderColor = "rgba(255,255,255,.5)",
        style,
    } = props
    const selectedFirst = useGitHubAssets ? DEFAULT_FIRST_FRAME : startFrame
    const selectedLast = useGitHubAssets ? DEFAULT_LAST_FRAME : endFrame
    const resolvedVideoUrl = useGitHubAssets ? DEFAULT_VIDEO_URL : videoUrl
    const resolvedMobileVideoUrl = useGitHubAssets ? "" : mobileVideoUrl
    const firstImage: { src?: string; srcSet?: string; alt?: string } | null | undefined = typeof selectedFirst === "string" ? { src: selectedFirst } : selectedFirst
    const lastImage: { src?: string; srcSet?: string; alt?: string } | null | undefined = typeof selectedLast === "string" ? { src: selectedLast } : selectedLast
    const firstFrameSrc = firstImage?.src || ""
    const lastFrameSrc = lastImage?.src || ""
    const playbackSettings = React.useRef({ loop, muted })
    playbackSettings.current = { loop, muted }
    const rootRef = React.useRef<HTMLDivElement>(null)
    const videoRef = React.useRef<HTMLVideoElement>(null)
    const firstRef = React.useRef<HTMLImageElement>(null)
    const lastRef = React.useRef<HTMLImageElement>(null)
    const playerRef = React.useRef<ReturnType<typeof createHeroPlayer> | null>(
        null
    )
    const staticRenderer = useIsStaticRenderer()
    const [state, setState] = React.useState<HeroState>("idle")
    React.useEffect(() => {
        if (
            staticRenderer ||
            typeof window === "undefined" ||
            !rootRef.current ||
            !videoRef.current ||
            !firstRef.current ||
            !lastRef.current
        )
            return
        const chosenVideo =
            resolvedMobileVideoUrl && window.matchMedia("(max-width: 767px)").matches
                ? resolvedMobileVideoUrl
                : resolvedVideoUrl
        const player = createHeroPlayer({
            root: rootRef.current,
            video: videoRef.current,
            startImage: firstRef.current,
            endImage: lastRef.current,
            videoUrl: chosenVideo,
            endUrl: lastFrameSrc,
            holdScroll,
            threshold: triggerDistance,
            preload: preloadVideo,
            autoplay,
            ...playbackSettings.current,
            onState: (next) => {
                React.startTransition(() => setState(next))
            },
        })
        playerRef.current = player
        return () => {
            player.destroy()
            playerRef.current = null
        }
    }, [
        staticRenderer,
        resolvedVideoUrl,
        resolvedMobileVideoUrl,
        firstFrameSrc,
        lastFrameSrc,
        holdScroll,
        triggerDistance,
        preloadVideo,
        autoplay,
    ])
    React.useEffect(() => {
        if (!videoRef.current) return
        videoRef.current.loop = loop
    }, [loop])
    React.useEffect(() => {
        if (!videoRef.current) return
        videoRef.current.muted = muted
        videoRef.current.defaultMuted = muted
    }, [muted])
    const mediaStyle: React.CSSProperties = {
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit,
        objectPosition: focalX + "% " + focalY + "%",
        pointerEvents: "none",
    }
    const label =
        state === "playing" || state === "entering" || state === "exiting"
            ? "Pause"
            : state === "ended"
              ? "Replay"
              : state === "loading"
                ? "Pause loading"
                : state === "paused"
                  ? "Resume"
                  : state === "error"
                    ? "Retry"
                    : state === "blocked"
                      ? "Tap to play"
                      : "Play"
    const activate = () => {
        const player = playerRef.current
        if (!player) return
        if (["playing", "loading", "entering", "exiting"].includes(state)) player.pause()
        else {
            if (state === "ended") player.reset()
            void player.play()
        }
    }
    return (
        <div
            ref={rootRef}
            className="admiral-hero-video"
            style={{
                position: "relative",
                width: "100%",
                height: "100%",
                overflow: "hidden",
                background: backgroundColor,
                ...style,
            }}
        >
            <style>{HERO_CSS}</style>
            <img
                ref={firstRef}
                src={firstFrameSrc || undefined}
                srcSet={firstImage?.srcSet || undefined}
                alt=""
                width={1920}
                height={1010}
                loading="eager"
                decoding="async"
                style={mediaStyle}
            />
            <video
                ref={videoRef}
                className="ap-video"
                muted={muted}
                loop={loop}
                playsInline
                preload="none"
                aria-hidden
                disablePictureInPicture
                style={mediaStyle}
            />
            <img
                ref={lastRef}
                className="ap-last"
                src={lastFrameSrc || undefined}
                srcSet={lastImage?.srcSet || undefined}
                alt=""
                width={1920}
                height={1010}
                decoding="async"
                style={mediaStyle}
            />
            {overlay > 0 && (
                <div
                    aria-hidden
                    style={{
                        position: "absolute",
                        inset: 0,
                        pointerEvents: "none",
                        background: "rgba(0,0,0," + overlay + ")",
                    }}
                />
            )}
            {(showControls || state === "blocked" || state === "error") && (
                <button
                    type="button"
                    onClick={activate}
                    disabled={staticRenderer}
                    aria-label={label + " hero video"}
                    style={{
                        position: "absolute",
                        bottom: 20,
                        right: 20,
                        padding: "9px 14px",
                        color: buttonTextColor,
                        border: "1px solid " + buttonBorderColor,
                        borderRadius: 4,
                        background: buttonBackgroundColor,
                        font: "12px Arial,sans-serif",
                        cursor: "pointer",
                    }}
                >
                    {label}
                </button>
            )}
        </div>
    )
}

AdmiralHeroVideo.displayName = "Hero Video"
AdmiralHeroVideo.defaultProps = {
    useGitHubAssets: true,
    videoUrl: DEFAULT_VIDEO_URL,
    mobileVideoUrl: "",
    startFrame: DEFAULT_FIRST_FRAME,
    endFrame: DEFAULT_LAST_FRAME,
    autoplay: true,
    loop: false,
    muted: true,
    objectFit: "cover" as const,
    overlay: 0,
    focalX: 50,
    focalY: 50,
    holdScroll: true,
    triggerDistance: 18,
    preloadVideo: true,
    showControls: true,
    backgroundColor: "#111111",
    buttonTextColor: "#FFFFFF",
    buttonBackgroundColor: "rgba(0,0,0,.45)",
    buttonBorderColor: "rgba(255,255,255,.5)",
}

addPropertyControls(AdmiralHeroVideo, {
    useGitHubAssets: {
        type: ControlType.Boolean,
        title: "GitHub assets",
        defaultValue: true,
        description: "Use the video and stills from UnbuiltMarket/admiral-park. Turn off to choose custom files.",
    },
    videoUrl: {
        type: ControlType.File,
        title: "Video",
        allowedFileTypes: ["mp4", "webm", "mov"],
        hidden: (props) => props.useGitHubAssets !== false,
    },
    mobileVideoUrl: {
        type: ControlType.File,
        title: "Mobile Video",
        allowedFileTypes: ["mp4", "webm", "mov"],
        hidden: (props) => props.useGitHubAssets !== false,
    },
    startFrame: { type: ControlType.ResponsiveImage, title: "First Frame", hidden: (props) => props.useGitHubAssets !== false },
    endFrame: { type: ControlType.ResponsiveImage, title: "Last Frame", hidden: (props) => props.useGitHubAssets !== false },
    autoplay: {
        type: ControlType.Boolean,
        title: "Autoplay",
        defaultValue: true,
    },
    loop: {
        type: ControlType.Boolean,
        title: "Loop",
        defaultValue: false,
    },
    muted: {
        type: ControlType.Boolean,
        title: "Muted",
        defaultValue: true,
    },
    objectFit: {
        type: ControlType.Enum,
        title: "Object Fit",
        options: ["cover", "contain", "fill", "none", "scale-down"],
        optionTitles: ["Cover", "Contain", "Fill", "None", "Scale Down"],
        defaultValue: "cover",
    },
    showControls: {
        type: ControlType.Boolean,
        title: "Play controls",
        defaultValue: true,
    },
    overlay: {
        type: ControlType.Number,
        title: "Darken",
        min: 0,
        max: 0.8,
        step: 0.01,
        defaultValue: 0,
    },
    focalX: {
        type: ControlType.Number,
        title: "Focal X",
        min: 0,
        max: 100,
        step: 1,
        defaultValue: 50,
    },
    focalY: {
        type: ControlType.Number,
        title: "Focal Y",
        min: 0,
        max: 100,
        step: 1,
        defaultValue: 50,
    },
    holdScroll: {
        type: ControlType.Boolean,
        title: "Hold scroll",
        defaultValue: true,
        description: "Keep the page still until the final image finishes fading in. Use a 100vh hero in normal flow. Escape releases the hold.",
    },
    triggerDistance: {
        type: ControlType.Number,
        title: "Scroll trigger",
        min: 1,
        max: 100,
        step: 1,
        unit: "px",
        defaultValue: 18,
    },
    preloadVideo: {
        type: ControlType.Boolean,
        title: "Warm video",
        defaultValue: true,
    },
    backgroundColor: {
        type: ControlType.Color,
        title: "Background",
        defaultValue: "#111111",
    },
    buttonTextColor: {
        type: ControlType.Color,
        title: "Btn Text",
        defaultValue: "#FFFFFF",
    },
    buttonBackgroundColor: {
        type: ControlType.Color,
        title: "Btn BG",
        defaultValue: "rgba(0,0,0,.45)",
    },
    buttonBorderColor: {
        type: ControlType.Color,
        title: "Btn Border",
        defaultValue: "rgba(255,255,255,.5)",
    },
})

type HeroState = "idle" | "loading" | "entering" | "playing" | "paused" | "exiting" | "ended" | "blocked" | "error";
interface HeroMetrics {
  state: HeroState; posterReadyMs: number | null; firstFrameMs: number | null;
  currentTime: number; duration: number; droppedFrames: number; totalFrames: number;
  stalls: number; stallMs: number; bufferedSeconds: number; reducedMotion: boolean; saveData: boolean;
}
interface HeroOptions {
  root: HTMLElement; video: HTMLVideoElement; startImage: HTMLImageElement; endImage: HTMLImageElement;
  videoUrl: string; endUrl: string; threshold?: number; warmupDelay?: number; preload?: boolean;
  autoplay?: boolean; loop?: boolean; muted?: boolean; transitionMs?: number;
  holdScroll?: boolean; holdTimeoutMs?: number;
  respectReducedMotion?: boolean; onState?: (state: HeroState) => void; onMetrics?: (metrics: HeroMetrics) => void;
}
/** Scroll once: paused first video frame fades in, playback runs, then the last still fades in. */
function createHeroPlayer(options: HeroOptions) {
  const {root, video, startImage, endImage} = options;
  const controller = new AbortController();
  let inputController = new AbortController();
  const {signal} = controller;
  const mountedAt = performance.now();
  const mediaQuery = matchMedia("(prefers-reduced-motion: reduce)");
  const connection = (navigator as Navigator & {connection?: {saveData?: boolean; effectiveType?: string}}).connection;
  const respectMotion = options.respectReducedMotion !== false;
  const saveData = !!connection?.saveData;
  const timers = new Set<ReturnType<typeof setTimeout>>();
  let disposed = false, state: HeroState = "idle", loaded = false, triggered = false;
  let introDone = false, playbackEnded = false, endShown = false;
  let userPaused = false, visibilityPaused = false, playPending = false;
  let lastY = Math.max(0, window.scrollY), downwardTravel = 0, scrollRAF = 0;
  let run: AbortController | null = null;
  let scrollHeld = false, holdUsed = false, holdX = 0, holdY = 0;
  let holdTimer: ReturnType<typeof setTimeout> | undefined;
  let touchPoint: {x: number; y: number} | null = null;
  let triggerAt: number | null = null, stallAt: number | null = null;
  let posterReadyMs: number | null = null, firstFrameMs: number | null = null;
  let stalls = 0, stallMs = 0, visible = isVisible();
  const reduced = () => respectMotion && mediaQuery.matches;
  const fadeDuration = () => reduced() ? 0 : Math.max(0, options.transitionMs ?? 300);
  function isVisible() {
    const rect = root.getBoundingClientRect();
    return rect.bottom > Math.min(100, innerHeight * .15) && rect.top < innerHeight * .85;
  }
  function later(fn: () => void, ms: number) {
    const timer = setTimeout(() => { timers.delete(timer); if (!disposed) fn(); }, ms);
    timers.add(timer); return timer;
  }
  // Hold the current page position without fixing the body or changing scrollbar width.
  function canHoldScroll() {
    if (options.holdScroll === false || holdUsed || reduced() || video.loop || document.hidden) return false;
    const rect = root.getBoundingClientRect();
    return rect.width > 0 && rect.top <= Math.max(20, innerHeight * .15) && rect.bottom >= innerHeight * .5;
  }
  function holdScroll() {
    if (scrollHeld || !canHoldScroll()) return;
    attachHoldInputs();
    holdUsed = true; scrollHeld = true; holdX = window.scrollX; holdY = window.scrollY;
    root.dataset.scrollHeld = "true";
    holdTimer = later(() => releaseScroll("timeout"), options.holdTimeoutMs ?? 15000);
  }
  function releaseScroll(reason: string) {
    if (triggered || reason === "destroy") {
      holdUsed = true; inputController.abort(); touchPoint = null;
    }
    if (holdTimer) { clearTimeout(holdTimer); timers.delete(holdTimer); holdTimer = undefined; }
    if (!scrollHeld) return;
    scrollHeld = false; root.dataset.scrollHeld = "false"; root.dataset.scrollRelease = reason;
    lastY = Math.max(0, window.scrollY); downwardTravel = 0;
    // Suppressed inputs are discarded. Never replay their distance or jump to the next section.
  }
  function keepScrollPosition() {
    if (scrollHeld && (window.scrollY !== holdY || window.scrollX !== holdX))
      window.scrollTo({top: holdY, left: holdX, behavior: "instant"});
  }
  function nestedCanScroll(target: EventTarget | null, delta: number) {
    let element = target instanceof Element ? target : null;
    while (element && element !== document.body && element !== document.documentElement) {
      const style = getComputedStyle(element);
      if (/(auto|scroll)/.test(style.overflowY) && element.scrollHeight > element.clientHeight + 1 &&
          (delta > 0 ? element.scrollTop + element.clientHeight < element.scrollHeight - 1 : element.scrollTop > 0)) return true;
      element = element.parentElement;
    }
    return false;
  }
  function onScrollIntent(event: Event, delta: number) {
    if (!scrollHeld && (disposed || triggered || options.autoplay === false || !canHoldScroll())) return;
    if (event.defaultPrevented || nestedCanScroll(event.target, delta)) return;
    if (scrollHeld) { if (event.cancelable) event.preventDefault(); return; }
    if (delta <= 0) { downwardTravel = 0; return; }
    if (!event.cancelable) return; // The actual scroll listener provides a fallback.
    event.preventDefault(); downwardTravel += delta;
    if (downwardTravel >= (options.threshold ?? 18)) void play();
  }
  function onWheel(event: WheelEvent) {
    if (event.ctrlKey || event.metaKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
    const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? innerHeight : 1;
    onScrollIntent(event, event.deltaY * unit);
  }
  function onTouchStart(event: TouchEvent) {
    touchPoint = event.touches.length === 1 ? {x: event.touches[0].clientX, y: event.touches[0].clientY} : null;
  }
  function onTouchMove(event: TouchEvent) {
    if (!touchPoint || event.touches.length !== 1) { touchPoint = null; return; }
    const touch = event.touches[0], dx = touchPoint.x - touch.clientX, dy = touchPoint.y - touch.clientY;
    touchPoint = {x: touch.clientX, y: touch.clientY};
    if (Math.abs(dy) >= Math.abs(dx)) onScrollIntent(event, dy);
  }
  function onScrollKey(event: KeyboardEvent) {
    if (event.key === "Escape" && scrollHeld) { releaseScroll("escape"); return; }
    if (event.ctrlKey || event.metaKey || event.altKey) return;
    const element = event.target instanceof Element ? event.target : null;
    if (element?.closest('input,textarea,select,button,a,[contenteditable]:not([contenteditable="false"]),[role="slider"]')) return;
    const delta = event.key === "ArrowDown" ? 40 : event.key === "ArrowUp" ? -40 :
      ["PageDown", "End"].includes(event.key) ? innerHeight : ["PageUp", "Home"].includes(event.key) ? -innerHeight :
      event.key === " " ? (event.shiftKey ? -innerHeight : innerHeight) : 0;
    if (delta) onScrollIntent(event, delta);
  }
  function metrics(): HeroMetrics {
    const quality = video.getVideoPlaybackQuality?.();
    let bufferedSeconds = 0;
    for (let i = 0; i < video.buffered.length; i++) {
      if (video.buffered.start(i) <= video.currentTime && video.buffered.end(i) >= video.currentTime)
        bufferedSeconds = video.buffered.end(i) - video.currentTime;
    }
    return {state, posterReadyMs, firstFrameMs, currentTime: video.currentTime || 0,
      duration: Number.isFinite(video.duration) ? video.duration : 0,
      droppedFrames: quality?.droppedVideoFrames ?? 0, totalFrames: quality?.totalVideoFrames ?? 0,
      stalls, stallMs: stallMs + (stallAt === null ? 0 : performance.now() - stallAt),
      bufferedSeconds, reducedMotion: reduced(), saveData};
  }
  function report() { if (!disposed) options.onMetrics?.(metrics()); }
  function setState(next: HeroState) {
    if (disposed) return;
    state = next; root.dataset.state = next;
    if (["ended", "error", "blocked", "paused"].includes(next)) releaseScroll(next);
    options.onState?.(next); report();
  }
  function endStall() {
    if (stallAt !== null) { stallMs += performance.now() - stallAt; stallAt = null; }
  }
  function cancelRun() {
    const previous = run; run = null; playPending = false;
    previous?.abort();
  }
  function restoreStart() {
    startImage.style.opacity = "1"; video.style.opacity = "0"; endImage.style.opacity = "0";
    root.dataset.videoVisible = "false"; root.dataset.endVisible = "false";
    introDone = false; endShown = false;
  }
  function prepareEnd() {
    if (!options.endUrl) return;
    const expected = new URL(options.endUrl, document.baseURI).href;
    if (endImage.src !== expected) endImage.src = options.endUrl;
  }
  function warm() {
    if (disposed) return;
    prepareEnd();
    if (loaded || !options.videoUrl) return;
    loaded = true; video.preload = "auto"; video.src = options.videoUrl; video.load();
  }
  function waitForFirstFrame(taskSignal: AbortSignal): Promise<void> {
    return new Promise((resolve, reject) => {
      let timeout: ReturnType<typeof setTimeout> | undefined;
      const events = ["loadeddata", "canplay", "seeked", "progress"];
      function cleanup() {
        if (timeout) clearTimeout(timeout);
        for (const event of events) video.removeEventListener(event, check);
        video.removeEventListener("error", failed);
        taskSignal.removeEventListener("abort", aborted);
      }
      function check() {
        if (taskSignal.aborted) return aborted();
        // HAVE_CURRENT_DATA is a decoded frame at the current position. Do not play to obtain it.
        if (video.readyState >= 2 && !video.seeking) { cleanup(); resolve(); }
      }
      function failed() { cleanup(); reject(new Error("The video frame could not load.")); }
      function aborted() { cleanup(); reject(new DOMException("Cancelled", "AbortError")); }
      for (const event of events) video.addEventListener(event, check);
      video.addEventListener("error", failed);
      taskSignal.addEventListener("abort", aborted, {once: true});
      timeout = setTimeout(failed, 20000);
      if (video.error) failed(); else check();
    });
  }
  function waitForEndFrame(taskSignal: AbortSignal): Promise<void> {
    return new Promise((resolve, reject) => {
      let decoding = false, settled = false;
      const timeout = setTimeout(failed, 8000);
      function cleanup() {
        clearTimeout(timeout); endImage.removeEventListener("load", check);
        endImage.removeEventListener("error", failed); taskSignal.removeEventListener("abort", aborted);
      }
      function finish(error?: Error) {
        if (settled) return;
        settled = true; cleanup(); if (error) reject(error); else resolve();
      }
      function failed() { finish(new Error("The final still could not load.")); }
      function aborted() { finish(new DOMException("Cancelled", "AbortError")); }
      function check() {
        if (taskSignal.aborted) return aborted();
        if (!options.endUrl || (endImage.complete && !endImage.naturalWidth)) return failed();
        if (!endImage.complete || !endImage.naturalWidth || decoding) return;
        decoding = true;
        const decoded = endImage.decode ? endImage.decode() : Promise.resolve();
        void decoded.then(() => { if (taskSignal.aborted) aborted(); else finish(); }, failed);
      }
      endImage.addEventListener("load", check); endImage.addEventListener("error", failed);
      taskSignal.addEventListener("abort", aborted, {once: true}); check();
    });
  }
  function fadeIn(element: HTMLElement, taskSignal: AbortSignal): Promise<void> {
    return new Promise((resolve, reject) => {
      if (taskSignal.aborted) { reject(new DOMException("Cancelled", "AbortError")); return; }
      const from = Math.max(0, Math.min(1, Number(getComputedStyle(element).opacity)));
      const duration = fadeDuration() * (1 - from);
      if (duration <= 0 || !element.animate) { element.style.opacity = "1"; resolve(); return; }
      const animation = element.animate([{opacity: from}, {opacity: 1}], {
        duration, easing: "ease-in-out", fill: "both"
      });
      function aborted() {
        // Freeze a paused crossfade. Resume only animates its remaining opacity.
        element.style.opacity = getComputedStyle(element).opacity;
        animation.cancel();
      }
      taskSignal.addEventListener("abort", aborted, {once: true});
      animation.finished.then(() => {
        taskSignal.removeEventListener("abort", aborted);
        if (taskSignal.aborted) { reject(new DOMException("Cancelled", "AbortError")); return; }
        element.style.opacity = "1"; animation.cancel(); resolve();
      }, error => {
        taskSignal.removeEventListener("abort", aborted); reject(error);
      });
    });
  }
  async function finishEnd() {
    if (disposed || playPending || endShown || !playbackEnded) return;
    visible = isVisible();
    if (!visible || document.hidden || userPaused) { visibilityPaused = !userPaused; setState("paused"); return; }
    const task = new AbortController(); run = task; playPending = true;
    setState("loading");
    try {
      await waitForEndFrame(task.signal);
      if (disposed || task.signal.aborted) return;
      root.dataset.endVisible = "true"; setState("exiting");
      await fadeIn(endImage, task.signal);
      if (disposed || task.signal.aborted) return;
      // The lower layer stays opaque during the dissolve to avoid a dark dip.
      video.style.opacity = "0"; startImage.style.opacity = "0";
      root.dataset.videoVisible = "false"; endShown = true; setState("ended");
    } catch (error) {
      if (!disposed && !task.signal.aborted) {
        endImage.style.opacity = "0"; root.dataset.endVisible = "false"; setState("ended");
      }
    } finally {
      if (run === task) { run = null; playPending = false; }
    }
  }
  async function play(explicit = false) {
    if (disposed || playPending || endShown || (reduced() && !explicit)) return;
    triggered = true; userPaused = false; visibilityPaused = false;
    if (playbackEnded) { await finishEnd(); return; }
    if (!options.videoUrl) { setState("error"); return; }
    if (triggerAt === null) triggerAt = performance.now();
    if (state === "error") { loaded = false; restoreStart(); }
    warm(); visible = isVisible();
    if (!visible || document.hidden) { visibilityPaused = true; setState("paused"); return; }
    holdScroll();
    const task = new AbortController(); run = task; playPending = true;
    setState("loading");
    try {
      if (!introDone) {
        video.pause();
        await waitForFirstFrame(task.signal);
        if (disposed || task.signal.aborted) return;
        root.dataset.videoVisible = "true";
        if (firstFrameMs === null) firstFrameMs = performance.now() - (triggerAt ?? performance.now());
        setState("entering");
        await fadeIn(video, task.signal);
        if (disposed || task.signal.aborted) return;
        introDone = true; startImage.style.opacity = "0";
      }
      // Playback starts only AFTER the incoming 0.3-second fade has finished.
      setState("loading");
      await video.play();
    } catch (error) {
      if (disposed || task.signal.aborted || visibilityPaused || userPaused) return;
      const name = error instanceof Error ? error.name : "";
      if (name === "AbortError") return;
      video.pause(); restoreStart(); endStall();
      setState(name === "NotAllowedError" ? "blocked" : "error");
    } finally {
      if (run === task) { run = null; playPending = false; }
    }
  }
  function pause() {
    if (!triggered || state === "ended") return;
    userPaused = true; visibilityPaused = false; cancelRun();
    video.pause(); endStall(); setState("paused");
  }
  function visibilityChanged() {
    visible = isVisible();
    if (document.hidden || !visible) {
      if (triggered && !userPaused && state !== "ended" && state !== "error" && state !== "blocked") {
        visibilityPaused = true; cancelRun(); video.pause(); endStall(); setState("paused");
      }
    } else if (visibilityPaused && !userPaused) {
      visibilityPaused = false; void play(true);
    }
  }
  function reset() {
    releaseScroll("reset");
    cancelRun(); video.pause(); triggered = false; playbackEnded = false;
    userPaused = false; visibilityPaused = false; triggerAt = null; firstFrameMs = null;
    stalls = 0; stallMs = 0; stallAt = null;
    if (loaded && video.readyState > 0) video.currentTime = 0;
    restoreStart(); lastY = Math.max(0, window.scrollY); downwardTravel = 0;
    root.style.setProperty("--film-progress", "0"); setState("idle");
  }
  function onScroll() {
    if (scrollHeld) { keepScrollPosition(); return; }
    if (disposed || triggered || reduced() || scrollRAF || options.autoplay === false) return;
    scrollRAF = requestAnimationFrame(() => {
      scrollRAF = 0;
      const y = Math.max(0, window.scrollY), delta = y - lastY; lastY = y;
      if (delta <= 0) { downwardTravel = 0; return; }
      visible = isVisible();
      if (!visible) { downwardTravel = 0; return; }
      downwardTravel += delta;
      if (downwardTravel >= (options.threshold ?? 18)) void play();
    });
  }
  function posterLoaded() {
    if (posterReadyMs !== null) return;
    posterReadyMs = performance.now() - mountedAt; report();
    if (options.preload !== false && !reduced() && !saveData && !/^(slow-)?2g$/.test(connection?.effectiveType ?? "")) {
      later(() => { if (visible && !document.hidden && !reduced()) warm(); }, options.warmupDelay ?? 650);
    }
  }
  video.muted = options.muted !== false; video.defaultMuted = options.muted !== false;
  video.playsInline = true; video.loop = options.loop === true;
  video.setAttribute("playsinline", ""); video.setAttribute("webkit-playsinline", ""); video.preload = "none";
  restoreStart();
  startImage.addEventListener("load", posterLoaded, {signal});
  startImage.addEventListener("error", () => { root.dataset.posterError = "true"; report(); }, {signal});
  endImage.addEventListener("load", () => {
    if (playbackEnded && !userPaused) void finishEnd();
    report();
  }, {signal});
  endImage.addEventListener("error", () => {
    if (playbackEnded) cancelRun();
    endImage.style.opacity = "0"; root.dataset.endVisible = "false";
    if (playbackEnded) { video.style.opacity = "1"; root.dataset.videoVisible = "true"; setState("ended"); }
  }, {signal});
  video.addEventListener("playing", () => {
    if (!triggered || !introDone) return;
    endStall(); setState("playing");
  }, {signal});
  video.addEventListener("waiting", () => {
    if (triggered && introDone && !video.paused && stallAt === null) {
      stalls++; stallAt = performance.now(); setState("loading");
    }
  }, {signal});
  video.addEventListener("timeupdate", () => {
    if (Number.isFinite(video.duration) && video.duration > 0)
      root.style.setProperty("--film-progress", String(video.currentTime / video.duration));
    if (video.loop) releaseScroll("loop");
    report();
  }, {signal});
  video.addEventListener("ended", () => {
    endStall(); playbackEnded = true; root.style.setProperty("--film-progress", "1"); void finishEnd();
  }, {signal});
  video.addEventListener("error", () => {
    if (triggered) { cancelRun(); video.pause(); endStall(); restoreStart(); setState("error"); }
  }, {signal});
  root.dataset.scrollHeld = "false";
  function attachHoldInputs() {
    if (options.holdScroll === false || holdUsed || reduced()) return;
    if (inputController.signal.aborted) inputController = new AbortController();
    const inputSignal = inputController.signal;
    window.addEventListener("wheel", onWheel, {passive: false, capture: true, signal: inputSignal});
    window.addEventListener("touchstart", onTouchStart, {passive: true, capture: true, signal: inputSignal});
    window.addEventListener("touchmove", onTouchMove, {passive: false, capture: true, signal: inputSignal});
    window.addEventListener("touchend", clearTouch, {passive: true, signal: inputSignal});
    window.addEventListener("touchcancel", clearTouch, {passive: true, signal: inputSignal});
    window.addEventListener("keydown", onScrollKey, {capture: true, signal: inputSignal});
  }
  function clearTouch() { touchPoint = null; }
  attachHoldInputs();
  window.addEventListener("scroll", onScroll, {passive: true, signal});
  window.addEventListener("pagehide", () => releaseScroll("pagehide"), {signal});
  window.addEventListener("resize", () => { lastY = Math.max(0, scrollY); downwardTravel = 0; visibilityChanged(); }, {passive: true, signal});
  document.addEventListener("visibilitychange", visibilityChanged, {signal});
  mediaQuery.addEventListener("change", () => {
    if (reduced()) { inputController.abort(); if (triggered && state !== "ended") pause(); }
    else attachHoldInputs();
    report();
  }, {signal});
  const observer = new IntersectionObserver(visibilityChanged, {threshold: [0, .15, .5, 1]});
  observer.observe(root); setState("idle");
  if (startImage.complete && startImage.naturalWidth) posterLoaded();
  return {
    play: () => play(true), pause, reset, getMetrics: metrics, getState: () => state,
    destroy() {
      releaseScroll("destroy"); disposed = true; cancelRun(); controller.abort(); observer.disconnect();
      if (scrollRAF) cancelAnimationFrame(scrollRAF);
      for (const timer of timers) clearTimeout(timer);
      video.pause(); video.removeAttribute("src"); video.load();
    }
  };
}
