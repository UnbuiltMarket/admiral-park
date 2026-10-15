export type HeroState = "idle" | "loading" | "entering" | "playing" | "paused" | "exiting" | "ended" | "blocked" | "error";
export interface HeroMetrics {
  state: HeroState; posterReadyMs: number | null; firstFrameMs: number | null;
  currentTime: number; duration: number; droppedFrames: number; totalFrames: number;
  stalls: number; stallMs: number; bufferedSeconds: number; reducedMotion: boolean; saveData: boolean;
}
export interface HeroOptions {
  root: HTMLElement; video: HTMLVideoElement; startImage: HTMLImageElement; endImage: HTMLImageElement;
  videoUrl: string; endUrl: string; threshold?: number; warmupDelay?: number; preload?: boolean;
  autoplay?: boolean; loop?: boolean; muted?: boolean; transitionMs?: number;
  respectReducedMotion?: boolean; onState?: (state: HeroState) => void; onMetrics?: (metrics: HeroMetrics) => void;
}
/** Scroll once: paused first video frame fades in, playback runs, then the last still fades in. */
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
  let introDone = false, endReady = false, playbackEnded = false, endShown = false;
  let userPaused = false, visibilityPaused = false, playPending = false;
  let lastY = Math.max(0, window.scrollY), downwardTravel = 0, scrollRAF = 0;
  let run: AbortController | null = null;
  let triggerAt: number | null = null, stallAt: number | null = null;
  let posterReadyMs: number | null = null, firstFrameMs: number | null = null;
  let stalls = 0, stallMs = 0, visible = isVisible();
  const reduced = () => respectMotion && mediaQuery.matches;
  const fadeDuration = () => reduced() ? 0 : Math.max(0, options.transitionMs ?? 1000);
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
    if (endImage.src !== expected) { endReady = false; endImage.src = options.endUrl; }
    if (endImage.complete && endImage.naturalWidth) endReady = true;
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
    if (!endReady) { setState("ended"); return; } // Retain the video's last frame if the image is unavailable.
    visible = isVisible();
    if (!visible || document.hidden || userPaused) { visibilityPaused = !userPaused; setState("paused"); return; }
    const task = new AbortController(); run = task; playPending = true;
    root.dataset.endVisible = "true"; setState("exiting");
    try {
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
      // Playback starts only AFTER the incoming one-second fade has finished.
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
    cancelRun(); video.pause(); triggered = false; playbackEnded = false;
    userPaused = false; visibilityPaused = false; triggerAt = null; firstFrameMs = null;
    stalls = 0; stallMs = 0; stallAt = null;
    if (loaded && video.readyState > 0) video.currentTime = 0;
    restoreStart(); lastY = Math.max(0, window.scrollY); downwardTravel = 0;
    root.style.setProperty("--film-progress", "0"); setState("idle");
  }
  function onScroll() {
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
    endReady = endImage.naturalWidth > 0;
    if (playbackEnded && !userPaused) void finishEnd();
    report();
  }, {signal});
  endImage.addEventListener("error", () => {
    if (playbackEnded) cancelRun();
    endReady = false; endImage.style.opacity = "0"; root.dataset.endVisible = "false";
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
    report();
  }, {signal});
  video.addEventListener("ended", () => {
    endStall(); playbackEnded = true; root.style.setProperty("--film-progress", "1"); void finishEnd();
  }, {signal});
  video.addEventListener("error", () => {
    if (triggered) { cancelRun(); video.pause(); endStall(); restoreStart(); setState("error"); }
  }, {signal});
  window.addEventListener("scroll", onScroll, {passive: true, signal});
  window.addEventListener("resize", () => { lastY = Math.max(0, scrollY); downwardTravel = 0; visibilityChanged(); }, {passive: true, signal});
  document.addEventListener("visibilitychange", visibilityChanged, {signal});
  mediaQuery.addEventListener("change", () => {
    if (reduced() && triggered && state !== "ended") pause();
    report();
  }, {signal});
  const observer = new IntersectionObserver(visibilityChanged, {threshold: [0, .15, .5, 1]});
  observer.observe(root); setState("idle");
  if (startImage.complete && startImage.naturalWidth) posterLoaded();
  return {
    play: () => play(true), pause, reset, getMetrics: metrics, getState: () => state,
    destroy() {
      disposed = true; cancelRun(); controller.abort(); observer.disconnect();
      if (scrollRAF) cancelAnimationFrame(scrollRAF);
      for (const timer of timers) clearTimeout(timer);
      video.pause(); video.removeAttribute("src"); video.load();
    }
  };
}
