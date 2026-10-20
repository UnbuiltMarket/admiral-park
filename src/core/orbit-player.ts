export type OrbitState = "idle" | "loading" | "buffering" | "moving" | "settling" | "checkpoint" | "paused" | "error";

export interface OrbitSnapshot {
    state: OrbitState; frame: number; checkpoint: number; direction: number;
    ready: number; total: number; decoded: number; downloaded: number;
    buffered: number; bufferTotal: number; requiredReady: number; requiredTotal: number;
    position: number; target?: number; userPaused: boolean; suspended: boolean; error?: string;
}

export interface OrbitRestoration {
    position: number; target?: number; paused?: boolean; direction?: number;
}

export interface OrbitOptions {
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
export function createOrbitPlayer(options: OrbitOptions) {
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
