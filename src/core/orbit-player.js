// Generated from orbit-player.ts.
const orbitClamp = (value, minimum, maximum) => Math.min(maximum, Math.max(minimum, value));
const orbitModulo = (value, size) => ((value % size) + size) % size;
/** Every moving frame is prepared once. Only the parked view has a second, sharp bitmap. */
export function createOrbitPlayer(options) {
    const { root, canvas } = options;
    const urls = [...options.urls], total = urls.length;
    const motionWidth = Math.round(orbitClamp(options.decodeWidth ?? 960, 240, 1920));
    const inspectionWidth = Math.round(orbitClamp(options.inspectionWidth ?? 1920, motionWidth, 3840));
    const checkpointCount = Math.round(orbitClamp(options.checkpointCount ?? 8, 1, Math.max(1, total)));
    const checkpoints = Array.from({ length: checkpointCount }, (_, index) => Math.round(index * total / checkpointCount));
    const wheelSensitivity = orbitClamp(options.wheelSensitivity ?? .035, .001, .5);
    const dragSensitivity = orbitClamp(options.dragSensitivity ?? .10, .005, 1);
    const momentum = orbitClamp(options.momentum ?? .18, .04, .8);
    const snapDuration = orbitClamp(options.snapDuration ?? .5, .12, 2);
    const focalX = orbitClamp(options.focalX ?? .5, 0, 1), focalY = orbitClamp(options.focalY ?? .5, 0, 1);
    const context = canvas.getContext("2d", { alpha: false });
    const cancellation = new AbortController();
    const blobs = new Map(), frames = new Map();
    const fetching = new Set(), decoding = new Set(), failed = new Map();
    const reducedQuery = typeof matchMedia === "function" ? matchMedia("(prefers-reduced-motion: reduce)") : null;
    const originalTouchAction = canvas.style.touchAction;
    let destroyed = false, preparing = false, active = false, activation = 0, visible = true, automaticPause = false;
    let state = "idle", position = 0, direction = 1, velocity = 0, error;
    let raf = 0, lastInputAt = 0, previousInputAt = 0, wheelPending = false;
    let preparePromise = null, prepareResolve = null;
    let prepareReject = null;
    let inspection = null, inspectionFrame = -1, inspectionGeneration = 0, qualityStartedAt = 0, inspectionDecoding = false;
    let lastPaint = "", lastNotification = "";
    let drag = null;
    let touchDragging = false;
    let settling = null;
    const frameAt = () => total ? orbitModulo(Math.round(position), total) : 0;
    const canRun = () => active && !destroyed && visible && !document.hidden && state !== "error";
    const fullyReady = () => total > 0 && frames.size === total;
    const reduced = () => !!reducedQuery?.matches;
    function checkpointAt() {
        if (state !== "checkpoint" || total === 0)
            return -1;
        const withinRing = orbitModulo(position, total);
        return checkpoints.findIndex(value => Math.abs(value - withinRing) < .0001 || Math.abs(value + total - withinRing) < .0001);
    }
    function snapshot() {
        return { state, frame: frameAt(), checkpoint: checkpointAt(), direction, ready: frames.size, total,
            decoded: frames.size + (inspection ? 1 : 0), downloaded: blobs.size, position, ...(error ? { error } : {}) };
    }
    function notify() {
        if (destroyed)
            return;
        const value = snapshot();
        root.dataset.orbitState = state;
        root.dataset.orbitFrame = String(value.frame);
        root.dataset.orbitCheckpoint = String(value.checkpoint);
        root.dataset.orbitReady = String(value.ready);
        root.dataset.orbitDecoded = String(value.decoded);
        root.dataset.orbitDownloaded = String(value.downloaded);
        root.dataset.orbitPosition = position.toFixed(4);
        root.dataset.orbitMotionWidth = String(motionWidth);
        const signature = [state, value.frame, value.checkpoint, direction, value.ready, value.decoded, value.downloaded, position.toFixed(4), error].join("|");
        if (signature !== lastNotification) {
            lastNotification = signature;
            options.onUpdate?.(value);
        }
    }
    async function decodeBlob(blob, width) {
        let expired = false;
        const operation = (async () => {
            if (typeof createImageBitmap === "function") {
                try {
                    const image = await createImageBitmap(blob, { resizeWidth: width, resizeQuality: "high" });
                    return { image, width: image.width, height: image.height, close: () => image.close() };
                }
                catch { /* A resized canvas also works in browsers without AVIF ImageBitmap decoding. */ }
            }
            const image = new Image(), objectURL = URL.createObjectURL(blob);
            try {
                image.decoding = "async";
                image.src = objectURL;
                await new Promise((resolve, reject) => {
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
                if (!drawing)
                    throw new Error("Canvas decoding is unavailable");
                drawing.drawImage(image, 0, 0, surface.width, surface.height);
                return { image: surface, width: surface.width, height: surface.height, close: () => { surface.width = surface.height = 0; } };
            }
            finally {
                image.src = "";
                URL.revokeObjectURL(objectURL);
            }
        })();
        return await new Promise((resolve, reject) => {
            const timer = setTimeout(() => { expired = true; reject(new Error("Image decoding timed out")); }, 15000);
            operation.then(bitmap => {
                clearTimeout(timer);
                if (expired || destroyed) {
                    bitmap.close();
                    if (!expired)
                        reject(new Error("Orbit disposed"));
                }
                else
                    resolve(bitmap);
            }, reason => { clearTimeout(timer); if (!expired)
                reject(reason); });
        });
    }
    function finishPreparation() {
        if (destroyed || !preparing)
            return;
        if (failed.size) {
            error = "Could not prepare orbit frame " + [...failed.keys()][0] + ". Retry to continue.";
            state = "error";
            notify();
            const reject = prepareReject;
            prepareResolve = prepareReject = null;
            reject?.(new Error(error));
        }
        else if (fullyReady()) {
            preparing = false;
            error = undefined;
            const resolve = prepareResolve;
            prepareResolve = prepareReject = null;
            if (!active)
                state = "idle";
            notify();
            resolve?.();
        }
    }
    async function fetchFrame(index) {
        fetching.add(index);
        const request = new AbortController(), cancel = () => request.abort();
        const timer = setTimeout(cancel, 10000);
        cancellation.signal.addEventListener("abort", cancel, { once: true });
        try {
            const response = await fetch(urls[index], { signal: request.signal, mode: "cors", credentials: "omit", cache: "force-cache" });
            if (!response.ok)
                throw new Error("HTTP " + response.status);
            const blob = await response.blob();
            if (!destroyed)
                blobs.set(index, blob);
        }
        catch (reason) {
            if (!destroyed)
                failed.set(index, String(reason));
        }
        finally {
            clearTimeout(timer);
            cancellation.signal.removeEventListener("abort", cancel);
            fetching.delete(index);
            if (!destroyed) {
                notify();
                finishPreparation();
                pump();
            }
        }
    }
    async function decodeFrame(index) {
        decoding.add(index);
        try {
            const bitmap = await decodeBlob(blobs.get(index), motionWidth);
            if (destroyed)
                bitmap.close();
            else
                frames.set(index, bitmap);
        }
        catch (reason) {
            if (!destroyed)
                failed.set(index, String(reason));
        }
        finally {
            decoding.delete(index);
            if (!destroyed) {
                notify();
                finishPreparation();
                pump();
            }
        }
    }
    function pump() {
        if (destroyed || !preparing)
            return;
        for (let index = 0; index < total && fetching.size < 4; index++) {
            if (!blobs.has(index) && !fetching.has(index) && !failed.has(index))
                void fetchFrame(index);
        }
        for (let index = 0; index < total && decoding.size < 2; index++) {
            if (blobs.has(index) && !frames.has(index) && !decoding.has(index) && !failed.has(index))
                void decodeFrame(index);
        }
    }
    function prepare() {
        if (destroyed)
            return Promise.reject(new Error("Orbit disposed"));
        if (fullyReady())
            return Promise.resolve();
        if (preparePromise)
            return preparePromise;
        if (!total || !context) {
            state = "error";
            error = !total ? "No orbit frames were provided." : "Canvas rendering is unavailable.";
            notify();
            return Promise.reject(new Error(error));
        }
        preparing = true;
        state = "loading";
        error = undefined;
        preparePromise = new Promise((resolve, reject) => { prepareResolve = resolve; prepareReject = reject; });
        notify();
        pump();
        return preparePromise;
    }
    function dropInspection() {
        inspectionGeneration++;
        inspection?.close();
        inspection = null;
        inspectionFrame = -1;
        qualityStartedAt = 0;
        lastPaint = "";
    }
    async function prepareInspection() {
        const frame = frameAt(), blob = blobs.get(frame);
        if (!blob || destroyed || !active || state !== "checkpoint" || inspectionWidth <= motionWidth || inspectionDecoding)
            return;
        const generation = ++inspectionGeneration;
        inspectionDecoding = true;
        try {
            const bitmap = await decodeBlob(blob, inspectionWidth);
            if (destroyed || generation !== inspectionGeneration || !active || state !== "checkpoint" || frameAt() !== frame)
                bitmap.close();
            else {
                inspection?.close();
                inspection = bitmap;
                inspectionFrame = frame;
                qualityStartedAt = performance.now();
                lastPaint = "";
                notify();
                requestPaint();
            }
        }
        catch { /* Inspection quality is optional; the ready motion image remains selectable. */ }
        finally {
            inspectionDecoding = false;
            if (!destroyed && generation !== inspectionGeneration && active && state === "checkpoint" && inspectionFrame !== frameAt())
                void prepareInspection();
        }
    }
    function drawImage(bitmap) {
        if (!context)
            return;
        const scale = Math.max(canvas.width / bitmap.width, canvas.height / bitmap.height);
        const width = bitmap.width * scale, height = bitmap.height * scale;
        context.drawImage(bitmap.image, (canvas.width - width) * focalX, (canvas.height - height) * focalY, width, height);
    }
    function paint(now) {
        const frame = frameAt(), bitmap = frames.get(frame);
        if (!context || !bitmap || !active || destroyed)
            return;
        const bounds = canvas.getBoundingClientRect();
        if (bounds.width <= 0 || bounds.height <= 0)
            return;
        const useful = inspection && inspectionFrame === frame ? inspection : bitmap;
        const usefulDPR = Math.min(useful.width / bounds.width, useful.height / bounds.height);
        const dpr = Math.min(window.devicePixelRatio || 1, 2, usefulDPR);
        const width = Math.max(1, Math.round(bounds.width * dpr)), height = Math.max(1, Math.round(bounds.height * dpr));
        if (canvas.width !== width || canvas.height !== height) {
            canvas.width = width;
            canvas.height = height;
            lastPaint = "";
        }
        const mix = inspection && inspectionFrame === frame ? (reduced() ? 1 : orbitClamp((now - qualityStartedAt) / 120, 0, 1)) : 0;
        const signature = [frame, width, height, inspectionFrame, mix.toFixed(4)].join("|");
        if (signature === lastPaint)
            return;
        context.globalAlpha = 1;
        drawImage(bitmap);
        if (inspection && mix > 0 && inspectionFrame === frame) {
            context.globalAlpha = mix;
            drawImage(inspection);
            context.globalAlpha = 1;
        }
        lastPaint = signature;
    }
    function requestPaint() {
        if (!raf && canRun() && state !== "paused")
            raf = requestAnimationFrame(tick);
    }
    function nextCheckpoint(from, heading) {
        const cycle = Math.floor(from / total), candidates = [];
        for (let offset = -1; offset <= 1; offset++)
            for (const checkpoint of checkpoints)
                candidates.push((cycle + offset) * total + checkpoint);
        if (heading > 0)
            return Math.min(...candidates.filter(value => value > from + .0001));
        return Math.max(...candidates.filter(value => value < from - .0001));
    }
    function arrive(target) {
        position = target;
        velocity = 0;
        settling = null;
        wheelPending = false;
        state = "checkpoint";
        paint(performance.now());
        notify();
        void prepareInspection();
    }
    function startSettle(target = nextCheckpoint(position, direction)) {
        if (!canRun() || !fullyReady())
            return;
        dropInspection();
        wheelPending = false;
        if (reduced() || Math.abs(target - position) < .0001) {
            arrive(target);
            return;
        }
        const distance = Math.abs(target - position), step = total / checkpointCount;
        const duration = Math.max(.12, snapDuration * Math.min(1, .4 + .6 * distance / step));
        const heading = Math.sign(target - position);
        const tangent = heading * Math.min(Math.max(0, velocity * heading) * duration, distance * 2);
        settling = { start: position, target, time: performance.now(), duration: duration * 1000, tangent };
        direction = heading;
        state = "settling";
        notify();
        requestPaint();
    }
    function tick(now) {
        raf = 0;
        if (!canRun() || state === "paused")
            return;
        if (wheelPending && !drag && now - lastInputAt >= 110)
            startSettle();
        if (settling) {
            const motion = settling, t = orbitClamp((now - motion.time) / motion.duration, 0, 1);
            const smooth = t * t * (3 - 2 * t), tangent = t * (t - 1) * (t - 1);
            position = motion.start + (motion.target - motion.start) * smooth + motion.tangent * tangent;
            if (t >= 1) {
                arrive(motion.target);
            }
        }
        paint(now);
        notify();
        const qualityActive = inspection && inspectionFrame === frameAt() && now - qualityStartedAt < 120;
        if (settling || wheelPending || qualityActive)
            requestPaint();
    }
    function releaseDrag() {
        if (!drag)
            return;
        const pointer = drag.id;
        drag = null;
        touchDragging = false;
        try {
            if (root.hasPointerCapture(pointer))
                root.releasePointerCapture(pointer);
        }
        catch { /* Detached elements have no capture. */ }
    }
    function beginInput(now) {
        if (state === "paused") {
            automaticPause = false;
            state = "moving";
        }
        settling = null;
        dropInspection();
        state = "moving";
        lastInputAt = now;
    }
    function updateInput(delta, now) {
        if (!delta)
            return;
        const dt = orbitClamp((now - previousInputAt) / 1000, .008, .08);
        const sample = orbitClamp(delta / dt, -240, 240);
        const blend = 1 - Math.exp(-dt / momentum);
        velocity = Math.sign(sample) !== Math.sign(velocity) ? sample : velocity + (sample - velocity) * Math.max(.25, blend);
        position += delta;
        direction = Math.sign(delta);
        previousInputAt = now;
        lastInputAt = now;
        notify();
        requestPaint();
    }
    function ignored(target) {
        let element = target instanceof Element ? target : null;
        if (!element)
            return true;
        // Framer may place a transparent sibling above this component. Stop at the
        // shared container: its role/overflow belongs to the page, not a control.
        while (element && element !== root && !element.contains(root)) {
            if (element.matches("nav,header,a,button,input,textarea,select,option,[contenteditable]:not([contenteditable='false']),[role='button'],[role='link'],[data-orbit-ignore]"))
                return true;
            element = element.parentElement;
        }
        return false;
    }
    function insideViewer(x, y) {
        const box = root.getBoundingClientRect();
        return box.width > 0 && box.height > 0 && x >= box.left && x <= box.right && y >= box.top && y <= box.bottom;
    }
    function coveredTrialControl(x, y) {
        return Array.from(root.querySelectorAll("[data-homepage-controls] button")).some(button => {
            const box = button.getBoundingClientRect();
            return !button.disabled && box.width > 0 && box.height > 0 && x >= box.left && x <= box.right && y >= box.top && y <= box.bottom;
        });
    }
    function nestedScroll(target, deltaX, deltaY) {
        let element = target instanceof Element ? target : null;
        while (element && element !== root && !element.contains(root)) {
            const style = getComputedStyle(element), horizontal = Math.abs(deltaX) > Math.abs(deltaY);
            if (horizontal && /auto|scroll/.test(style.overflowX) && element.scrollWidth > element.clientWidth + 1) {
                if (deltaX < 0 ? element.scrollLeft > 0 : element.scrollLeft < element.scrollWidth - element.clientWidth - 1)
                    return true;
            }
            if (!horizontal && /auto|scroll/.test(style.overflowY) && element.scrollHeight > element.clientHeight + 1) {
                if (deltaY < 0 ? element.scrollTop > 0 : element.scrollTop < element.scrollHeight - element.clientHeight - 1)
                    return true;
            }
            element = element.parentElement;
        }
        return false;
    }
    function onWheel(event) {
        if (!canRun() || !fullyReady() || event.defaultPrevented || event.ctrlKey || event.metaKey || !insideViewer(event.clientX, event.clientY) || ignored(event.target))
            return;
        if (nestedScroll(event.target, event.deltaX, event.deltaY))
            return;
        const scale = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? Math.max(1, root.clientHeight) : 1;
        const raw = (Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY) * scale;
        if (Math.abs(raw) < .2)
            return;
        event.preventDefault();
        if (reduced()) {
            if (performance.now() - lastInputAt > 180) {
                direction = Math.sign(raw);
                lastInputAt = performance.now();
                arrive(nextCheckpoint(position, direction));
            }
            return;
        }
        releaseDrag();
        beginInput(performance.now());
        wheelPending = true;
        updateInput(orbitClamp(raw, -700, 700) * wheelSensitivity, performance.now());
    }
    function onPointerDown(event) {
        if (event.pointerType === "touch")
            return;
        if (!event.isPrimary) {
            if (drag) {
                releaseDrag();
                pauseInternal(true);
            }
            return;
        }
        if (!canRun() || !fullyReady() || event.defaultPrevented || event.button !== 0 || !insideViewer(event.clientX, event.clientY) || coveredTrialControl(event.clientX, event.clientY) || ignored(event.target))
            return;
        if (nestedScroll(event.target, 1, 0) || nestedScroll(event.target, 0, 1))
            return;
        drag = { id: event.pointerId, x: event.clientX, y: event.clientY, time: performance.now(), distance: 0, moved: false };
        try {
            root.setPointerCapture(event.pointerId);
        }
        catch { /* Mouse events can still finish through the window listener. */ }
    }
    function onPointerMove(event) {
        if (!drag || touchDragging || drag.id !== event.pointerId || !canRun())
            return;
        const now = performance.now(), dx = event.clientX - drag.x, dy = event.clientY - drag.y;
        drag.distance += Math.abs(dx);
        drag.x = event.clientX;
        drag.y = event.clientY;
        drag.time = now;
        if (!drag.moved && drag.distance < 3)
            return;
        if (event.pointerType === "touch" && !drag.moved && Math.abs(dy) > Math.abs(dx) * 1.5)
            return;
        if (event.cancelable)
            event.preventDefault();
        if (!drag.moved) {
            beginInput(now);
            velocity = 0;
            previousInputAt = now - 16;
            drag.moved = true;
        }
        if (reduced()) {
            direction = dx < 0 ? 1 : -1;
            return;
        }
        updateInput(-dx * dragSensitivity, now);
    }
    function onPointerUp(event) {
        if (!drag || touchDragging || drag.id !== event.pointerId)
            return;
        const moved = drag.moved;
        releaseDrag();
        if (moved && canRun())
            startSettle();
    }
    function onPointerCancel(event) {
        if (!drag || touchDragging || drag.id !== event.pointerId)
            return;
        const moved = drag.moved;
        releaseDrag();
        if (moved)
            pauseInternal(true);
    }
    function onClick(event) {
        if (coveredTrialControl(event.clientX, event.clientY))
            return;
        // A drag must not accidentally activate a picking listener attached by the wrapper.
        if (performance.now() - lastInputAt < 120 && state !== "checkpoint" && insideViewer(event.clientX, event.clientY) && !ignored(event.target)) {
            event.preventDefault();
            event.stopPropagation();
        }
    }
    function onTouchStart(event) {
        if (event.touches.length !== 1) {
            if (touchDragging) {
                releaseDrag();
                pauseInternal(true);
            }
            return;
        }
        const touch = event.touches[0];
        if (!canRun() || !fullyReady() || event.defaultPrevented || !insideViewer(touch.clientX, touch.clientY) || coveredTrialControl(touch.clientX, touch.clientY) || ignored(event.target))
            return;
        if (nestedScroll(event.target, 1, 0) || nestedScroll(event.target, 0, 1))
            return;
        drag = { id: touch.identifier, x: touch.clientX, y: touch.clientY, time: performance.now(), distance: 0, moved: false };
        touchDragging = true;
    }
    function onTouchMove(event) {
        if (!touchDragging || !drag || !canRun() || event.touches.length !== 1)
            return;
        const touch = event.touches[0], now = performance.now();
        const dx = touch.clientX - drag.x, dy = touch.clientY - drag.y;
        drag.distance += Math.max(Math.abs(dx), Math.abs(dy));
        drag.x = touch.clientX;
        drag.y = touch.clientY;
        drag.time = now;
        if (!drag.moved && drag.distance < 3)
            return;
        // A non-passive touch listener also reaches Framer sibling hit layers;
        // changing the canvas touch-action alone cannot prevent their page pan.
        if (event.cancelable)
            event.preventDefault();
        if (!drag.moved) {
            beginInput(now);
            velocity = 0;
            previousInputAt = now - 16;
            drag.moved = true;
        }
        const delta = Math.abs(dx) >= Math.abs(dy) ? -dx : -dy;
        if (reduced()) {
            if (delta)
                direction = Math.sign(delta);
            return;
        }
        updateInput(delta * dragSensitivity, now);
    }
    function onTouchEnd(event) {
        if (!touchDragging || !drag || event.touches.length)
            return;
        const moved = drag.moved;
        releaseDrag();
        if (moved && canRun())
            startSettle();
    }
    function onTouchCancel() {
        if (!touchDragging || !drag)
            return;
        const moved = drag.moved;
        releaseDrag();
        if (moved)
            pauseInternal(true);
    }
    function go(heading) {
        if (!canRun() || !fullyReady() || !heading)
            return;
        automaticPause = false;
        direction = heading > 0 ? 1 : -1;
        releaseDrag();
        velocity = 0;
        const from = settling && Math.sign(settling.target - position) === direction ? settling.target : position;
        startSettle(nextCheckpoint(from, direction));
    }
    function setCheckpoint(index) {
        if (!canRun() || !fullyReady())
            return;
        const desired = checkpoints[orbitModulo(Math.round(index), checkpointCount)];
        const current = orbitModulo(position, total);
        let distance = orbitModulo(desired - current + total / 2, total) - total / 2;
        if (Math.abs(distance + total / 2) < .0001)
            distance = direction * total / 2;
        automaticPause = false;
        releaseDrag();
        velocity = 0;
        startSettle(position + distance);
    }
    function pauseInternal(automatic) {
        if (!active || destroyed || state === "error" || state === "loading")
            return;
        automaticPause = automatic;
        releaseDrag();
        wheelPending = false;
        settling = null;
        velocity = 0;
        if (raf)
            cancelAnimationFrame(raf);
        raf = 0;
        state = "paused";
        notify();
    }
    function resume() {
        if (!active || destroyed || !fullyReady() || !visible || document.hidden || state === "error")
            return;
        automaticPause = false;
        const current = orbitModulo(position, total), checkpoint = checkpoints.find(value => Math.abs(value - current) < .0001);
        if (checkpoint !== undefined) {
            state = "checkpoint";
            paint(performance.now());
            notify();
            if (!inspection)
                void prepareInspection();
            requestPaint();
        }
        else {
            state = "moving";
            startSettle();
        }
    }
    function visibilityChanged() {
        if (!active)
            return;
        if ((!visible || document.hidden) && state !== "paused")
            pauseInternal(true);
        else if (visible && !document.hidden && automaticPause)
            resume();
    }
    function onKeyDown(event) {
        if (!canRun() || event.defaultPrevented || event.ctrlKey || event.metaKey || event.altKey || ignored(event.target))
            return;
        if (event.key === "ArrowRight" || event.key === "ArrowDown") {
            event.preventDefault();
            go(1);
        }
        else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
            event.preventDefault();
            go(-1);
        }
    }
    function onEscape(event) {
        if (event.key === "Escape" && !event.defaultPrevented && active && visible && !document.hidden)
            pauseInternal(false);
    }
    async function activate(frame = 0) {
        const token = ++activation;
        await prepare();
        if (destroyed || token !== activation)
            return;
        active = true;
        automaticPause = false;
        canvas.style.touchAction = "pinch-zoom";
        position = orbitModulo(Math.round(frame), total);
        direction = 1;
        velocity = 0;
        wheelPending = false;
        settling = null;
        dropInspection();
        state = "checkpoint";
        if (checkpointAt() < 0) {
            state = "moving";
            startSettle();
        }
        else {
            paint(performance.now());
            notify();
            void prepareInspection();
        }
        if (!visible || document.hidden)
            pauseInternal(true);
    }
    function deactivate() {
        activation++;
        active = false;
        automaticPause = false;
        releaseDrag();
        wheelPending = false;
        settling = null;
        if (raf)
            cancelAnimationFrame(raf);
        raf = 0;
        dropInspection();
        canvas.style.touchAction = originalTouchAction;
        if (state !== "error")
            state = fullyReady() ? "idle" : preparing ? "loading" : "idle";
        notify();
    }
    async function retry() {
        if (destroyed)
            return;
        const wasActive = active;
        failed.clear();
        error = undefined;
        preparePromise = null;
        await prepare();
        if (destroyed)
            return;
        if (wasActive) {
            state = "paused";
            resume();
        }
    }
    const resizeObserver = typeof ResizeObserver === "function" ? new ResizeObserver(() => {
        lastPaint = "";
        if (active && state === "paused")
            paint(performance.now());
        else
            requestPaint();
    }) : null;
    resizeObserver?.observe(canvas);
    const intersectionObserver = typeof IntersectionObserver === "function" ? new IntersectionObserver(entries => {
        const entry = entries.find(value => value.target === root);
        if (entry) {
            visible = entry.isIntersecting && entry.intersectionRatio > 0;
            visibilityChanged();
        }
    }) : null;
    intersectionObserver?.observe(root);
    const resize = () => { lastPaint = ""; if (active && state === "paused")
        paint(performance.now());
    else
        requestPaint(); };
    const reducedChanged = () => {
        if (reduced() && active && fullyReady() && (state === "moving" || state === "settling"))
            arrive(settling?.target ?? nextCheckpoint(position, direction));
    };
    window.addEventListener("wheel", onWheel, { passive: false, capture: true });
    window.addEventListener("pointerdown", onPointerDown, true);
    window.addEventListener("pointermove", onPointerMove, { passive: false, capture: true });
    window.addEventListener("pointerup", onPointerUp, true);
    window.addEventListener("pointercancel", onPointerCancel, true);
    window.addEventListener("touchstart", onTouchStart, { passive: true, capture: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false, capture: true });
    window.addEventListener("touchend", onTouchEnd, true);
    window.addEventListener("touchcancel", onTouchCancel, true);
    window.addEventListener("click", onClick, true);
    window.addEventListener("keydown", onKeyDown, true);
    window.addEventListener("resize", resize);
    window.addEventListener("keydown", onEscape);
    document.addEventListener("visibilitychange", visibilityChanged);
    reducedQuery?.addEventListener?.("change", reducedChanged);
    notify();
    return {
        prepare, activate, deactivate, go, setCheckpoint, pause: () => pauseInternal(false), resume, retry, snapshot,
        destroy() {
            if (destroyed)
                return;
            deactivate();
            destroyed = true;
            cancellation.abort();
            const reject = prepareReject;
            prepareResolve = prepareReject = null;
            reject?.(new Error("Orbit disposed"));
            frames.forEach(bitmap => bitmap.close());
            frames.clear();
            blobs.clear();
            resizeObserver?.disconnect();
            intersectionObserver?.disconnect();
            window.removeEventListener("wheel", onWheel, true);
            window.removeEventListener("pointerdown", onPointerDown, true);
            window.removeEventListener("pointermove", onPointerMove, true);
            window.removeEventListener("pointerup", onPointerUp, true);
            window.removeEventListener("pointercancel", onPointerCancel, true);
            window.removeEventListener("click", onClick, true);
            window.removeEventListener("touchstart", onTouchStart, true);
            window.removeEventListener("touchmove", onTouchMove, true);
            window.removeEventListener("touchend", onTouchEnd, true);
            window.removeEventListener("touchcancel", onTouchCancel, true);
            window.removeEventListener("keydown", onKeyDown, true);
            window.removeEventListener("resize", resize);
            window.removeEventListener("keydown", onEscape);
            document.removeEventListener("visibilitychange", visibilityChanged);
            reducedQuery?.removeEventListener?.("change", reducedChanged);
        },
    };
}
