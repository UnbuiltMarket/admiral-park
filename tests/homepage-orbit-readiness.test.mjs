import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { setImmediate } from 'node:timers/promises';
import { Script } from 'node:vm';
import { compileTS } from '../scripts/tooling.mjs';

const source = await readFile(new URL('../src/framer/homepage-draft-3/HERO_video_no_fullscreen.tsx', import.meta.url), 'utf8');
const engine = source.slice(source.indexOf('const orbitClamp ='), source.indexOf('interface OrbitMaskRect'));
const script = new Script(compileTS(engine, 'orbit-engine.ts') + '\ncreateOrbitPlayer');

function fixture(t, { blocked, corrupt, hangingBitmap = false, unreadableCanvas = false } = {}) {
    t.mock.timers.enable({ apis: ['setTimeout'] });
    const root = new EventTarget(), attributes = new Set(), contextOptions = [];
    const poster = Object.assign(new EventTarget(), {
        src: '', complete: true, naturalWidth: 960, removeAttribute() { this.src = '' },
    });
    const scene = {children: [], dataset: {}, replaceChildren(...images) { this.children = images }};
    Object.assign(root, {
        dataset: {}, clientWidth: 720, clientHeight: 380,
        querySelector: selector => selector === '[data-orbit-dom-scene]' ? scene : poster,
        setAttribute: key => attributes.add(key), removeAttribute: key => attributes.delete(key),
        getBoundingClientRect: () => ({ left: 0, top: 0, width: 720, height: 380 }),
    });
    const canvas = () => Object.assign(new EventTarget(), {
        style: {}, dataset: {}, hasAttribute: () => false, setAttribute() {}, removeAttribute() {}, remove() {},
        width: 720, height: 380, getBoundingClientRect: root.getBoundingClientRect,
        getContext: (_kind, options) => {
            contextOptions.push(options);
            return { drawImage() {}, fillRect() {}, getImageData() {
                if (unreadableCanvas && !options?.willReadFrequently) throw Error('InvalidStateError');
                return { data: [19, 87, 155, 255] };
            } };
        },
    });
    const win = Object.assign(new EventTarget(), { devicePixelRatio: 1 });
    const doc = Object.assign(new EventTarget(), { createElement: canvas, hidden: false });
    const callbacks = new Map(), held = [], lateClosed = [], fetches = [];
    let time = 0, id = 0, triedBitmaps = 0, htmlDecodes = 0;
    const release = () => {
        blocked = undefined;
        corrupt = undefined;
        hangingBitmap = false;
        for (const resolve of held.splice(0)) resolve();
    };
    const createPlayer = script.runInNewContext({
        window: win, document: doc, AbortController, Event, setTimeout, clearTimeout,
        performance: { now: () => time },
        requestAnimationFrame: cb => { callbacks.set(++id, cb); return id; },
        cancelAnimationFrame: key => callbacks.delete(key),
        fetch: async (url, opts) => {
            const index = Number(url);
            fetches.push([index, opts.cache]);
            return { ok: true, blob: async () => ({ index, corrupt: index === corrupt, size: 50 }) };
        },
        createImageBitmap: async blob => {
            triedBitmaps++;
            if (blob.corrupt) throw Error('Invalid image');
            if (blob.index === blocked || hangingBitmap) await new Promise(resolve => held.push(resolve));
            return { width: 960, height: 505, close: () => lateClosed.push(blob.index) };
        },
        Image: class { naturalWidth = 960; naturalHeight = 505; style = {}; removeAttribute() { this.src = '' } async decode() {
            htmlDecodes++;
            if (this.src === 'blob:invalid') throw Error('Invalid image');
        } },
        URL: { createObjectURL: blob => blob.corrupt ? 'blob:invalid' : 'blob:test', revokeObjectURL() {} },
    });
    const surface = canvas();
    const player = createPlayer({ root, canvas: surface, urls: Array.from({ length: 120 }, (_, i) => String(i)),
        bufferCheckpoints: 1, decodeWidth: 960, inspectionWidth: 960, snapDuration: 1.2 });
    t.after(() => { release(); player.destroy(); });
    return {
        player, release, fetches, lateClosed, surface, root, attributes, poster, scene, contextOptions,
        get triedBitmaps() { return triedBitmaps; }, get htmlDecodes() { return htmlDecodes; },
        async tick(ms) {
            time += ms;
            t.mock.timers.tick(ms);
            const queued = [...callbacks.values()];
            callbacks.clear();
            for (const cb of queued) cb(time);
            await setImmediate();
        },
    };
}

test('a failed graphics probe displays the decoded image at the current camera even after canvas loss', async t => {
    const f = fixture(t, {unreadableCanvas: true});
    assert.equal(f.root.dataset.orbitCanvasMode, 'readback');
    assert.equal(f.contextOptions.at(-1).willReadFrequently, true);
    await f.player.activate(0);
    assert.equal(f.scene.children[0].src, 'blob:test');
    assert.equal(f.triedBitmaps, 0);
    const initial = f.scene.children[0];
    f.surface.dispatchEvent(new Event('contextlost'));
    f.player.go(1);
    await f.tick(1200);
    assert.notEqual(f.scene.children[0], initial);
    assert.equal(f.scene.dataset.frame, '15');
    f.player.deactivate();
    assert.equal(f.scene.children.length, 0);
});

test('canvas loss on a healthy renderer reveals a camera image until restoration', async t => {
    const f = fixture(t);
    await f.player.activate(0);
    f.surface.dispatchEvent(new Event('contextlost'));
    assert.ok(f.attributes.has('data-orbit-image-only'));
    f.surface.dispatchEvent(new Event('contextrestored'));
    assert.equal(f.attributes.has('data-orbit-image-only'), false);
    assert.equal(f.player.snapshot().frame, 0);
    f.player.deactivate();
    assert.equal(f.poster.src, '');
});

test('orbit entry waits for both adjacent arcs, including across the 119 → 0 seam', async t => {
    const f = fixture(t, { blocked: 111 });
    assert.equal(f.root.dataset.orbitCanvasMode, 'default');
    const entering = f.player.activate(0);
    await setImmediate();
    assert.equal(f.player.snapshot().state, 'loading');
    assert.equal(f.player.snapshot().requiredTotal, 31);
    assert.equal(f.player.snapshot().requiredReady, 30);
    f.release();
    await entering;
    f.player.go(-1);
    assert.equal(f.player.snapshot().state, 'settling');
    await f.tick(1200);
    assert.equal(f.player.snapshot().frame, 105);
    assert.equal(f.player.snapshot().state, 'checkpoint');
});

test('an unfinished next arc stays at the checkpoint; the 1.2 second turn begins only when fully decoded', async t => {
    const f = fixture(t, { blocked: 25 });
    await f.player.activate(0);
    f.player.go(1);
    await f.tick(1200);
    assert.equal(f.player.snapshot().frame, 15);
    f.player.go(1);
    await f.tick(500);
    assert.equal(f.player.snapshot().state, 'buffering');
    assert.equal(f.player.snapshot().frame, 15);
    f.release();
    await setImmediate();
    assert.equal(f.player.snapshot().state, 'settling');
    await f.tick(600);
    assert.equal(f.player.snapshot().position, 22.5);
    await f.tick(600);
    assert.equal(f.player.snapshot().frame, 30);
    assert.equal(f.player.snapshot().downloaded, 120);
});

test('two hung native decoders fall back to HTML images and close late bitmaps', async t => {
    const f = fixture(t, { hangingBitmap: true });
    const entering = f.player.activate(0);
    await setImmediate();
    assert.equal(f.triedBitmaps, 2);
    await f.tick(3000);
    await entering;
    assert.equal(f.player.snapshot().state, 'checkpoint');
    assert.equal(f.triedBitmaps, 2);
    assert.equal(f.htmlDecodes, 31);
    f.release();
    await setImmediate();
    assert.equal(f.lateClosed.length, 2);
});

test('a corrupt frame gets one fresh download, and retry resumes the pending complete route', async t => {
    const f = fixture(t, { corrupt: 25 });
    await f.player.activate(0);
    f.player.go(1);
    await f.tick(1200);
    f.player.go(1);
    await setImmediate();
    assert.equal(f.player.snapshot().state, 'error');
    assert.equal(f.player.snapshot().frame, 15);
    assert.deepEqual(f.fetches.filter(([index]) => index === 25).map(([, cache]) => cache),
        ['force-cache', 'reload']);
    f.release();
    await f.player.retry();
    await f.tick(1200);
    assert.equal(f.player.snapshot().state, 'checkpoint');
    assert.equal(f.player.snapshot().frame, 30);
});
