import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { setImmediate } from 'node:timers/promises';
import { Script } from 'node:vm';
import { compileTS, ts } from '../scripts/tooling.mjs';

const name = 'HERO_video_no_fullscreen.tsx';
const source = await readFile(new URL('../src/framer/homepage-draft-3/' + name, import.meta.url), 'utf8');
const file = ts.createSourceFile(name, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
const player = file.statements.find(node => ts.isFunctionDeclaration(node) && node.name?.text === 'createHomepageHeroVideo');
assert.ok(player, 'test the native player used by the Framer homepage');
const script = new Script(compileTS(player.getText(file), name) + '\ncreateHomepageHeroVideo');

class Layer extends EventTarget {
    style = { opacity: '0' };
    naturalWidth = 1920;
    getAttribute() { return null; }
    removeAttribute() {}
    animate() { return { finished: Promise.resolve(), cancel() {} }; }
    decode() { return Promise.resolve(); }
}

function flight(t) {
    t.mock.timers.enable({ apis: ['setTimeout'] });
    const video = Object.assign(new Layer(), {
        duration: 4, currentTime: 0, readyState: 2, paused: true, ended: false,
        buffered: { length: 1, start: () => 0, end: () => 4 },
        play() { this.paused = false; this.dispatchEvent(new Event('playing')); return Promise.resolve(); },
        pause() { this.paused = true; },
        load() {},
    });
    const endLayer = new Layer();
    const snapshots = [];
    const createPlayer = script.runInNewContext({
        document: new EventTarget(), window: { setTimeout }, clearTimeout, AbortController,
        matchMedia: () => new EventTarget(), getComputedStyle: layer => layer.style,
        requestAnimationFrame: () => 0, cancelAnimationFrame() {},
        sequenceClamp: value => Math.max(0, Math.min(1, value)),
    });
    const controller = createPlayer({
        video, poster: new Layer(), endLayer, url: 'flight.mp4', endPoster: 'landing.avif',
        lastFrame: 63, startAtEnd: false, fadeExtension: () => 0,
        onUpdate: snapshot => snapshots.push(snapshot),
    });
    t.after(() => controller.destroy());
    const event = type => video.dispatchEvent(new Event(type));
    return {
        video, endLayer, controller, event,
        state: () => snapshots.at(-1)?.state,
        move(time) { video.currentTime = time; event('timeupdate'); },
        async start() { controller.start(); await setImmediate(); },
        async advance(ms) { t.mock.timers.tick(ms); await setImmediate(); },
    };
}

test('one buffered seek resumes a stalled decoder and the film reaches its real end', async t => {
    const f = flight(t);
    await f.start();
    f.move(1);
    f.event('waiting');
    await f.advance(1500);
    assert.equal(f.video.currentTime, 1 + 1 / 24);
    f.move(1.7);
    await f.advance(1600);
    assert.equal(f.video.currentTime, 1.7, 'a second seek would disrupt resumed playback');
    f.move(2.4);
    await f.advance(2100);
    assert.equal(f.state(), 'moving', 'genuine progress extends the deadline');
    f.move(4);
    f.video.ended = true;
    f.event('ended');
    await setImmediate();
    assert.equal(f.state(), 'arrival');
    assert.equal(f.endLayer.style.opacity, '1');
});

test('repeated waits and the seek itself do not postpone the five-second landing', async t => {
    const f = flight(t);
    await f.start();
    f.move(1.27);
    f.event('waiting');
    await f.advance(1500);
    f.event('timeupdate');
    await f.advance(3499);
    f.event('waiting');
    assert.equal(f.state(), 'loading');
    await f.advance(1);
    assert.equal(f.state(), 'arrival');
    assert.equal(f.endLayer.style.opacity, '1');
});

test('never seek into missing bytes, including when a silent stall emits no waiting event', async t => {
    const f = flight(t);
    f.video.buffered = { length: 2, start: i => i ? 2 : 0, end: i => i ? 4 : 1.04 };
    await f.start();
    f.move(1);
    await f.advance(1500);
    assert.equal(f.video.currentTime, 1);
    await f.advance(3500);
    assert.equal(f.state(), 'arrival');
});

for (const mode of ['unreadable', 'pending']) {
    test('retry is available when playback failed and the landing image is ' + mode, async t => {
        const f = flight(t);
        f.endLayer.decode = () => mode === 'pending' ? new Promise(() => {}) : Promise.reject(Error('decode failed'));
        await f.start();
        f.move(1);
        f.event('error');
        await f.advance(9000);
        assert.equal(f.state(), 'error');
        assert.equal(f.endLayer.style.opacity, '0');
        f.endLayer.decode = () => Promise.resolve();
        f.controller.skip();
        await setImmediate();
        assert.equal(f.state(), 'arrival');
        assert.equal(f.endLayer.style.opacity, '1');
    });
}

test('a genuinely ended, visible video remains a usable endpoint if its still fails', async t => {
    const f = flight(t);
    f.endLayer.decode = () => Promise.reject(Error('decode failed'));
    await f.start();
    f.move(4);
    f.video.ended = true;
    f.event('ended');
    await setImmediate();
    assert.equal(f.state(), 'arrival');
    assert.equal(f.video.style.opacity, '1');
    assert.equal(f.endLayer.style.opacity, '0');
});
