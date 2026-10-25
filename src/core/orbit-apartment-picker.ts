export interface OrbitMaskRect { x: number; y: number; width: number; height: number }
export interface OrbitApartmentPickerView {
    enabled: boolean; checkpoint: number; moving: boolean; suspended: boolean; mobile: boolean;
    width: number; height: number; viewport: OrbitMaskRect; focalX: number; focalY: number;
}
export interface OrbitApartmentPickerOptions {
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
export interface OrbitMaskIndex { width: number; height: number; pixels: Uint8Array }
export interface OrbitApartmentPickerSnapshot {
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
export function orbitMaskHighlightRGB(value?: string, root?: HTMLElement): [number, number, number] {
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
export function orbitMaskCoverRect(width: number, height: number, viewport: OrbitMaskRect, focalX = .5, focalY = .5): OrbitMaskRect {
    const scale = Math.max(viewport.width / width, viewport.height / height);
    const resultWidth = width * scale, resultHeight = height * scale;
    return { x: viewport.x + (viewport.width - resultWidth) * Math.max(0, Math.min(1, focalX)),
        y: viewport.y + (viewport.height - resultHeight) * Math.max(0, Math.min(1, focalY)), width: resultWidth, height: resultHeight };
}

/** Encode an opaque exact RGB match once. Zero always means background or ambiguous edge. */
export function buildOrbitMaskIndex(rgba: ArrayLike<number>, width: number, height: number, palette: readonly { id: string; maskColor: string; maskColorAliases?: readonly string[] }[]): OrbitMaskIndex {
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
export function orbitMaskPixelAt(mask: OrbitMaskIndex, x: number, y: number): number {
    const px = Math.floor(x), py = Math.floor(y);
    if (px < 1 || py < 1 || px >= mask.width - 1 || py >= mask.height - 1) return 0;
    const offset = py * mask.width + px, value = mask.pixels[offset];
    return value && mask.pixels[offset - 1] === value && mask.pixels[offset + 1] === value &&
        mask.pixels[offset - mask.width] === value && mask.pixels[offset + mask.width] === value ? value : 0;
}

/** Compressed masks stay downloaded; at most two compact one-byte ID maps stay decoded. */
export function createOrbitApartmentPicker(options: OrbitApartmentPickerOptions) {
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
