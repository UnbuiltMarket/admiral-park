export type SequenceState = "opening" | "loading" | "moving" | "arrival" | "paused" | "error" | "reduced";
export interface SequenceSnapshot {
    state: SequenceState; progress: number; frame: number; direction: number;
    held: boolean; decoded: number; downloaded: number;
}
export interface SequenceOptions {
    root: HTMLElement; canvas: HTMLCanvasElement; poster: HTMLImageElement; urls: string[];
    duration?: number; maxSpeed?: number; momentum?: number; triggerDistance?: number;
    preload?: boolean; holdScroll?: boolean; cacheFrames?: number; decodeWidth?: number;
    focalX?: number; focalY?: number; timeoutMs?: number;
    onUpdate?: (snapshot: SequenceSnapshot) => void;
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
    const fetching = new Set<number>(), decoding = new Set<number>(), failed = new Set<number>();
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
            const response = await fetch(urls[index], { signal: requestAbort.signal, mode: "cors", credentials: "omit", cache: "force-cache" });
            if (!response.ok) throw new Error("Frame " + index + ": " + response.status);
            const blob = await response.blob();
            if (!disposed) { blobs.set(index, blob); downloads++; }
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
        retry() { failed.clear(); pump(); },
        destroy() {
            disposed = true; abort.abort(); blobs.clear();
            bitmaps.forEach(bitmap => bitmap.close()); bitmaps.clear();
        },
    };
}

/** A two-endpoint journey: scroll starts/boosts/reverses; release still completes the flight. */
export function createHeroSequence(options: SequenceOptions) {
    const { root, canvas, poster, urls } = options;
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
    let disposed = false, state: SequenceState = "opening", displayed = 0, clock = 0;
    let displayedProgress = 0;
    let rendered = { index: 0, next: 0, mix: 0 };
    let direction = 1, velocity = 0, boost = 0, held = false, playing = false;
    let active = false, raf = 0, previousTime = 0, waitingSince = 0;
    let holdY = 0, holdX = 0, holdTimer: ReturnType<typeof setTimeout> | undefined;
    let intent = 0, intentAt = 0, lastIntentAt = -Infinity, drainUntil = 0, drainDirection = 0;
    let scrollGuard = false, warmed = false, bypass = false;
    let touch: { x: number; y: number } | null = null;
    let warmTimer: ReturnType<typeof setTimeout> | undefined;
    const width = sequenceClamp(options.decodeWidth ?? 1920, 640, 1920);
    const frames = createSequenceFrames(urls, width, sequenceClamp(options.cacheFrames ?? 14, 8, 24), wake);
    function snapshot(): SequenceSnapshot {
        return { state, progress: displayedProgress, frame: displayed, direction, held, ...frames.counts() };
    }
    function publish() {
        if (disposed) return;
        root.dataset.sequenceState = state;
        root.dataset.frame = String(displayed);
        root.dataset.progress = String(displayedProgress);
        root.dataset.crossfade = rendered.index !== rendered.next ? (rendered.index === 0 ? "opening" : "arrival") : "";
        root.dataset.crossfadeMix = String(rendered.mix);
        root.dataset.scrollHeld = String(held);
        root.dataset.decoded = String(frames.counts().decoded);
        options.onUpdate?.(snapshot());
    }
    function visible() {
        const rect = root.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0 && rect.bottom > 0 && rect.top < innerHeight;
    }
    function atHero() {
        const rect = root.getBoundingClientRect();
        return visible() && rect.top >= -3 && rect.top <= innerHeight * .15 && rect.bottom >= innerHeight * .6;
    }
    function release(reason: string) {
        if (holdTimer) clearTimeout(holdTimer);
        holdTimer = undefined; held = false;
        if (sequenceScrollOwner === root) sequenceScrollOwner = null;
        root.dataset.scrollRelease = reason;
    }
    function hold() {
        if (held || options.holdScroll === false || motion.matches || !atHero()) return;
        if (sequenceScrollOwner && sequenceScrollOwner !== root) return;
        sequenceScrollOwner = root; held = true; holdX = scrollX; holdY = scrollY;
        holdTimer = setTimeout(() => fail("timeout"), options.timeoutMs ?? Math.max(12000, (totalDuration + 2) * 1000));
    }
    function draw(index: number, force = false, nextIndex = index, mix = 0) {
        const bitmap = frames.get(index), next = frames.get(nextIndex);
        if (!context || !bitmap || !next) return false;
        if (index === rendered.index && nextIndex === rendered.next && mix === rendered.mix && !force && canvas.style.opacity === "1") return true;
        const box = root.getBoundingClientRect();
        if (box.width <= 0 || box.height <= 0) return false;
        const boxRatio = box.width / box.height;
        let sw = bitmap.width, sh = bitmap.height;
        if (sw / sh > boxRatio) sw = sh * boxRatio; else sh = sw / boxRatio;
        const ratio = Math.min(devicePixelRatio || 1, 2, sw / box.width, sh / box.height);
        const cw = Math.max(1, Math.round(box.width * ratio)), ch = Math.max(1, Math.round(box.height * ratio));
        if (canvas.width !== cw) canvas.width = cw;
        if (canvas.height !== ch) canvas.height = ch;
        // Fill before drawing: a small alpha channel in exported files cannot accumulate trails.
        context.globalAlpha = 1;
        context.fillStyle = "#101820"; context.fillRect(0, 0, cw, ch);
        function paint(frame: SequenceBitmap) {
            let w = frame.width, h = frame.height;
            if (w / h > boxRatio) w = h * boxRatio; else h = w / boxRatio;
            context!.drawImage(frame.image,
                (frame.width - w) * sequenceClamp((options.focalX ?? 50) / 100),
                (frame.height - h) * sequenceClamp((options.focalY ?? 50) / 100),
                w, h, 0, 0, cw, ch);
        }
        // Keep the lower image opaque to prevent a dark dip during the dissolve.
        paint(bitmap);
        if (nextIndex !== index) { context.globalAlpha = mix; paint(next); context.globalAlpha = 1; }
        rendered = { index, next: nextIndex, mix };
        displayed = mix === 1 ? nextIndex : index;
        displayedProgress = (index + (nextIndex - index) * mix) / Math.max(1, last);
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
        if (disposed || raf || document.hidden) return;
        if (playing || (motion.matches && displayed !== last) || (active && canvas.style.opacity !== "1")) raf = requestAnimationFrame(tick);
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
        if (motion.matches) {
            if (frames.failed(last)) { state = "reduced"; publish(); return; }
            if (draw(last)) { state = "reduced"; publish(); }
            return;
        }
        if (!playing) { if (active && canvas.style.opacity !== "1") redraw(); return; }
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
        if (draw(frame.index, false, frame.next, frame.mix)) {
            clock = proposed; waitingSince = 0;
            if (state !== "moving") { state = "moving"; publish(); }
            if ((direction > 0 && clock >= totalDuration && displayed === last) || (direction < 0 && clock <= 0 && displayed === 0)) { finish(); return; }
        } else {
            if (canvas.style.opacity !== "1") draw(displayed);
            if (!waitingSince) waitingSince = now;
            if (now - waitingSince > 7000) { fail("frame-timeout"); return; }
            if (state !== "loading") { state = "loading"; publish(); }
        }
        wake();
    }
    function start(nextDirection: number, manual = false) {
        if (disposed || document.hidden || motion.matches || !context || last < 1) return;
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
        if (event.ctrlKey || event.metaKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
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
        if (delta) scrollIntent(event, delta);
    }
    function onScroll() {
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
    resize.observe(root);
    const intersection = new IntersectionObserver(entries => {
        if (entries[0]?.isIntersecting) { if (poster.complete) warm(); }
        else if (playing) pause("offscreen");
    });
    intersection.observe(root);
    window.addEventListener("wheel", wheel, { passive: false, signal });
    window.addEventListener("keydown", key, { signal });
    window.addEventListener("touchstart", event => {
        touch = event.touches.length === 1 ? { x: event.touches[0].clientX, y: event.touches[0].clientY } : null;
    }, { passive: true, signal });
    window.addEventListener("touchmove", event => {
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
    canvas.style.opacity = "0"; poster.style.opacity = "1";
    publish();
    if (motion.matches) reducedChanged();
    return {
        start: () => start(1, true), reverse: () => start(-1, true), pause, skip, snapshot,
        destroy() {
            if (disposed) return;
            pause("destroy"); disposed = true; abort.abort();
            if (warmTimer) clearTimeout(warmTimer);
            resize.disconnect(); intersection.disconnect(); frames.destroy();
        },
    };
}
