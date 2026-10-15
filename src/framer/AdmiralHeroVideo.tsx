// Generated single-file Framer component. Paste this entire file into Framer.
import * as React from "react";
import { addPropertyControls, ControlType, useIsStaticRenderer } from "framer";
export type HeroState = "idle" | "loading" | "playing" | "paused" | "ended" | "blocked" | "error";
export interface HeroMetrics {
  state: HeroState; posterReadyMs: number | null; firstFrameMs: number | null;
  currentTime: number; duration: number; droppedFrames: number; totalFrames: number;
  stalls: number; stallMs: number; bufferedSeconds: number; reducedMotion: boolean; saveData: boolean;
}
export interface HeroOptions {
  root: HTMLElement; video: HTMLVideoElement; startImage: HTMLImageElement; endImage: HTMLImageElement;
  videoUrl: string; endUrl: string; threshold?: number; warmupDelay?: number; preload?: boolean;
  respectReducedMotion?: boolean; onState?: (state: HeroState) => void; onMetrics?: (metrics: HeroMetrics) => void;
}
/** One-way, scroll-triggered playback. No scroll interception and no seek-on-scroll. */
export function createHeroPlayer(options: HeroOptions) {
  const {root, video, startImage, endImage} = options;
  const controller = new AbortController();
  const {signal} = controller;
  const mountedAt = performance.now();
  const mediaQuery = matchMedia("(prefers-reduced-motion: reduce)");
  const connection = (navigator as Navigator & {connection?: {saveData?: boolean; effectiveType?: string}}).connection;
  const respectMotion = options.respectReducedMotion !== false;
  const saveData = !!connection?.saveData;
  const timers = new Set<ReturnType<typeof setTimeout>>();
  let disposed = false, state: HeroState = "idle", loaded = false, triggered = false;
  let revealed = false, endReady = false, userPaused = false, visibilityPaused = false, playPending = false;
  let lastY = Math.max(0, window.scrollY), downwardTravel = 0, scrollRAF = 0;
  let videoCallback = 0, generation = 0, triggerAt: number | null = null, stallAt: number | null = null;
  let posterReadyMs: number | null = null, firstFrameMs: number | null = null;
  let stalls = 0, stallMs = 0;
  let visible = isVisible();
  const reduced = () => respectMotion && mediaQuery.matches;
  function isVisible() {
    const rect = root.getBoundingClientRect();
    return rect.bottom > Math.min(100, innerHeight * .15) && rect.top < innerHeight * .85;
  }
  function later(fn: () => void, ms: number) {
    const timer = setTimeout(() => { timers.delete(timer); if (!disposed) fn(); }, ms);
    timers.add(timer); return timer;
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
    options.onState?.(next); report();
  }
  function endStall() {
    if (stallAt !== null) { stallMs += performance.now() - stallAt; stallAt = null; }
  }
  function showEnd() {
    if (endReady && state === "ended") root.dataset.endVisible = "true";
  }
  function prepareEnd() {
    if (!options.endUrl) return;
    const expected = new URL(options.endUrl, document.baseURI).href;
    if (endImage.src !== expected) { endReady = false; endImage.src = options.endUrl; }
    if (endImage.complete && endImage.naturalWidth) { endReady = true; showEnd(); }
  }
  function warm() {
    if (disposed) return;
    prepareEnd();
    if (loaded || !options.videoUrl) return;
    loaded = true;
    video.preload = "auto";
    video.src = options.videoUrl;
    video.load();
  }
  function cancelFrame() {
    if (videoCallback && video.cancelVideoFrameCallback) video.cancelVideoFrameCallback(videoCallback);
    videoCallback = 0;
  }
  function reveal() {
    if (disposed || revealed || !triggered || video.readyState < 2 || state === "idle") return;
    revealed = true;
    root.dataset.videoVisible = "true";
    firstFrameMs = triggerAt === null ? null : performance.now() - triggerAt;
    report();
  }
  function observeFirstFrame() {
    cancelFrame();
    if (revealed) return;
    if (video.requestVideoFrameCallback) {
      videoCallback = video.requestVideoFrameCallback(() => { videoCallback = 0; reveal(); });
    }
    // Fallback only after playback has begun; never hide the poster on metadata alone.
    later(() => { if (state === "playing" && !video.paused) reveal(); }, 250);
  }
  async function play(explicit = false) {
    if (disposed || playPending || state === "ended" || (reduced() && !explicit)) return;
    if (!options.videoUrl) { setState("error"); return; }
    triggered = true; userPaused = false; visibilityPaused = false;
    if (triggerAt === null) triggerAt = performance.now();
    if (state === "error") { loaded = false; }
    warm();
    if (!visible || document.hidden) { visibilityPaused = true; setState("paused"); return; }
    playPending = true;
    const token = generation;
    setState("loading");
    try {
      await video.play();
      if (disposed || token !== generation) return;
    } catch (error) {
      if (disposed || token !== generation || visibilityPaused || userPaused) return;
      const name = error instanceof Error ? error.name : "";
      if (name === "AbortError") return;
      setState(name === "NotAllowedError" ? "blocked" : "error");
    } finally {
      if (token === generation) playPending = false;
    }
  }
  function pause() {
    if (!triggered || state === "ended") return;
    userPaused = true; visibilityPaused = false; generation++; playPending = false;
    video.pause(); endStall(); setState("paused");
  }
  function visibilityChanged() {
    visible = isVisible();
    if (document.hidden || !visible) {
      if (triggered && !userPaused && state !== "ended" && state !== "error" && state !== "blocked") {
        visibilityPaused = true; generation++; playPending = false;
        video.pause(); endStall(); setState("paused");
      }
    } else if (visibilityPaused && !userPaused) {
      visibilityPaused = false; void play(true);
    }
  }
  function reset() {
    generation++; playPending = false; triggered = false; revealed = false;
    userPaused = false; visibilityPaused = false; triggerAt = null; firstFrameMs = null;
    stalls = 0; stallMs = 0; stallAt = null; cancelFrame();
    video.pause(); if (loaded && video.readyState > 0) video.currentTime = 0;
    root.dataset.videoVisible = "false"; root.dataset.endVisible = "false";
    lastY = Math.max(0, window.scrollY); downwardTravel = 0;
    root.style.setProperty("--film-progress", "0");
    setState("idle");
  }
  function onScroll() {
    if (disposed || triggered || reduced() || scrollRAF) return;
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
    posterReadyMs = performance.now() - mountedAt;
    report();
    if (options.preload !== false && !reduced() && !saveData && !/^(slow-)?2g$/.test(connection?.effectiveType ?? "")) {
      later(() => { if (visible && !document.hidden && !reduced()) warm(); }, options.warmupDelay ?? 650);
    }
  }
  video.muted = true; video.defaultMuted = true; video.playsInline = true; video.loop = false;
  video.setAttribute("playsinline", ""); video.setAttribute("webkit-playsinline", "");
  video.preload = "none";
  root.dataset.videoVisible = "false"; root.dataset.endVisible = "false";
  startImage.addEventListener("load", posterLoaded, {signal});
  startImage.addEventListener("error", () => { root.dataset.posterError = "true"; report(); }, {signal});
  endImage.addEventListener("load", () => { endReady = endImage.naturalWidth > 0; showEnd(); report(); }, {signal});
  endImage.addEventListener("error", () => { endReady = false; root.dataset.endVisible = "false"; }, {signal});
  video.addEventListener("playing", () => {
    if (!triggered) return;
    endStall(); setState("playing"); observeFirstFrame();
  }, {signal});
  video.addEventListener("waiting", () => {
    if (triggered && revealed && !video.paused && stallAt === null) {
      stalls++; stallAt = performance.now(); setState("loading");
    }
  }, {signal});
  video.addEventListener("timeupdate", () => {
    if (Number.isFinite(video.duration) && video.duration > 0)
      root.style.setProperty("--film-progress", String(video.currentTime / video.duration));
    report();
  }, {signal});
  video.addEventListener("ended", () => {
    endStall(); root.style.setProperty("--film-progress", "1"); setState("ended"); showEnd();
  }, {signal});
  video.addEventListener("error", () => { if (triggered) { endStall(); setState("error"); } }, {signal});
  window.addEventListener("scroll", onScroll, {passive: true, signal});
  window.addEventListener("resize", () => { lastY = Math.max(0, scrollY); downwardTravel = 0; visibilityChanged(); }, {passive: true, signal});
  document.addEventListener("visibilitychange", visibilityChanged, {signal});
  mediaQuery.addEventListener("change", () => {
    if (reduced() && triggered && state !== "ended") pause();
    report();
  }, {signal});
  const observer = new IntersectionObserver(visibilityChanged, {threshold: [0, .15, .5, 1]});
  observer.observe(root);
  setState("idle");
  if (startImage.complete && startImage.naturalWidth) posterLoaded();
  return {
    play: () => play(true), pause, reset, getMetrics: metrics, getState: () => state,
    destroy() {
      disposed = true; generation++; controller.abort(); observer.disconnect();
      cancelFrame(); if (scrollRAF) cancelAnimationFrame(scrollRAF);
      for (const timer of timers) clearTimeout(timer);
      video.pause(); video.removeAttribute("src"); video.load();
    }
  };
}

interface Props {
  videoUrl: string; mobileVideoUrl: string; startFrame: string; endFrame: string;
  overlay: number; focalX: number; focalY: number; triggerDistance: number;
  preloadVideo: boolean; showControls: boolean; style?: React.CSSProperties;
}
/**
 * @framerSupportedLayoutWidth any
 * @framerSupportedLayoutHeight any
 * @framerIntrinsicWidth 1440
 * @framerIntrinsicHeight 900
 */
export default function AdmiralHeroVideo(props: Props) {
  const {videoUrl="",mobileVideoUrl="",startFrame="",endFrame="",overlay=0,
    focalX=50,focalY=50,triggerDistance=18,preloadVideo=true,showControls=true,style} = props;
  const rootRef = React.useRef<HTMLDivElement>(null);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const firstRef = React.useRef<HTMLImageElement>(null);
  const lastRef = React.useRef<HTMLImageElement>(null);
  const playerRef = React.useRef<ReturnType<typeof createHeroPlayer> | null>(null);
  const staticRenderer = useIsStaticRenderer();
  const [state,setState] = React.useState<HeroState>("idle");
  React.useEffect(() => {
    if (staticRenderer || !rootRef.current || !videoRef.current || !firstRef.current || !lastRef.current) return;
    const chosenVideo = mobileVideoUrl && matchMedia("(max-width: 767px)").matches ? mobileVideoUrl : videoUrl;
    const player = createHeroPlayer({root:rootRef.current,video:videoRef.current,
      startImage:firstRef.current,endImage:lastRef.current,videoUrl:chosenVideo,endUrl:endFrame,
      threshold:triggerDistance,preload:preloadVideo,onState:setState});
    playerRef.current = player;
    return () => { player.destroy(); playerRef.current = null; };
  },[staticRenderer,videoUrl,mobileVideoUrl,startFrame,endFrame,triggerDistance,preloadVideo]);
  const mediaStyle: React.CSSProperties = {position:"absolute",inset:0,width:"100%",height:"100%",
    objectFit:"cover",objectPosition:focalX+"% "+focalY+"%",pointerEvents:"none"};
  const label = state==="playing"?"Pause":state==="ended"?"Replay":
    state==="loading"?"Pause loading":state==="paused"?"Resume":
    state==="error"?"Retry":state==="blocked"?"Tap to play":"Play";
  const activate = () => {
    const player = playerRef.current; if (!player) return;
    if (state==="playing" || state==="loading") player.pause();
    else { if (state==="ended") player.reset(); void player.play(); }
  };
  return React.createElement("div",{ref:rootRef,className:"admiral-hero-video",
    style:{position:"relative",width:"100%",height:"100%",overflow:"hidden",background:"#111",...style}},
    React.createElement("style",null,
      ".admiral-hero-video .ap-video,.admiral-hero-video .ap-last{opacity:0;transition:opacity 180ms linear}.admiral-hero-video[data-video-visible=true] .ap-video{opacity:1}.admiral-hero-video[data-end-visible=true] .ap-last{opacity:1}.admiral-hero-video button:focus-visible{outline:2px solid white;outline-offset:4px}@media(prefers-reduced-motion:reduce){.admiral-hero-video .ap-video,.admiral-hero-video .ap-last{transition:none}}"),
    React.createElement("img",{ref:firstRef,src:startFrame||undefined,alt:"",width:1920,height:1013,
      loading:"eager",fetchPriority:"high",decoding:"async",style:mediaStyle}),
    React.createElement("video",{ref:videoRef,className:"ap-video",muted:true,playsInline:true,preload:"none",
      "aria-hidden":true,disablePictureInPicture:true,style:mediaStyle}),
    React.createElement("img",{ref:lastRef,className:"ap-last",alt:"",width:1920,height:1013,
      decoding:"async",style:mediaStyle}),
    overlay>0 && React.createElement("div",{"aria-hidden":true,style:{position:"absolute",inset:0,
      pointerEvents:"none",background:"rgba(0,0,0,"+overlay+")"}}),
    (showControls || state==="blocked" || state==="error") && React.createElement("button",
      {type:"button",onClick:activate,disabled:staticRenderer,"aria-label":label+" hero video",
       style:{position:"absolute",bottom:20,right:20,padding:"9px 14px",color:"white",
        border:"1px solid rgba(255,255,255,.5)",borderRadius:4,background:"rgba(0,0,0,.45)",
        font:"12px Arial,sans-serif",cursor:"pointer"}},label));
}
addPropertyControls(AdmiralHeroVideo,{
  videoUrl:{type:ControlType.String,title:"Video URL",placeholder:"https://…/hero.mp4"},
  mobileVideoUrl:{type:ControlType.String,title:"Mobile video",placeholder:"Optional mobile video URL"},
  startFrame:{type:ControlType.Image,title:"First frame"},
  endFrame:{type:ControlType.Image,title:"Last frame"},
  showControls:{type:ControlType.Boolean,title:"Play controls",defaultValue:true},
  overlay:{type:ControlType.Number,title:"Darken",min:0,max:.8,step:.01,defaultValue:0},
  focalX:{type:ControlType.Number,title:"Focal X",min:0,max:100,step:1,defaultValue:50},
  focalY:{type:ControlType.Number,title:"Focal Y",min:0,max:100,step:1,defaultValue:50},
  triggerDistance:{type:ControlType.Number,title:"Scroll trigger",min:1,max:100,step:1,unit:"px",defaultValue:18},
  preloadVideo:{type:ControlType.Boolean,title:"Warm video",defaultValue:true}
});
