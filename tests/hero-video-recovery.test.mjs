import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { setImmediate } from 'node:timers/promises';
import { Script } from 'node:vm';
import { compileTS, ts } from '../scripts/tooling.mjs';

const name = 'HERO_video_no_fullscreen.tsx';
const source = await readFile(new URL('../src/framer/homepage-draft-3/' + name, import.meta.url), 'utf8');
const file = ts.createSourceFile(name, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
function compileFunction(name) {
    const fn = file.statements.find(node => ts.isFunctionDeclaration(node) && node.name?.text === name);
    assert.ok(fn, 'test the actual homepage ' + name);
    return new Script(compileTS(fn.getText(file), file.fileName) + '\n' + name);
}
const script = compileFunction('createHomepageHeroVideo');
const downloadScript = compileFunction('prepareFlightVideo');
const advanceFraming = compileFunction('orbitApproachFraming').runInNewContext();

test('SEQ_03 window advances between 24 fps pictures on 60, 120 and 240 Hz displays', () => {
    const duration = 70 / 24;
    for (const hz of [60, 120, 240]) {
        let progress = 0;
        for (let tick = 1; tick < hz * 2; tick++) {
            const picture = Math.floor(tick * 24 / hz) / 24 / duration;
            const next = advanceFraming(progress, picture, 1 / hz, duration);
            assert.ok(next > progress);
            assert.ok(Math.abs(next - tick / hz / duration) < 1e-8);
            progress = next;
        }
    }
});

test('on a silent stall the SEQ_03 window stops within one picture and never rewinds', () => {
    const duration = 70 / 24, picture = .35;
    let progress = picture;
    for (let i = 0; i < 80; i++) progress = advanceFraming(progress, picture, 1 / 120, duration);
    assert.equal(progress, picture + 1 / 70);
    assert.equal(advanceFraming(progress, picture, 5, duration), progress);
    assert.equal(advanceFraming(progress, picture - .02, 0, duration), progress);
    assert.equal(advanceFraming(progress, picture, .1, NaN), progress);
});

class Layer extends EventTarget {
    style = { opacity: '0' };
    naturalWidth = 1920;
    getAttribute() { return null; }
    removeAttribute() {}
    animate() { return { finished: Promise.resolve(), cancel() {} }; }
    decode() { return Promise.resolve(); }
}

function flight(t, options = {}) {
    t.mock.timers.enable({ apis: ['setTimeout'] });
    const video = Object.assign(new Layer(), {
        duration: 4, currentTime: 0, readyState: 2, paused: true, ended: false,
        buffered: { length: 1, start: () => 0, end: () => 4 },
        playCalls: 0,
        play() { this.playCalls++; this.paused = false; this.dispatchEvent(new Event('playing')); return Promise.resolve(); },
        pause() { this.paused = true; },
        load() {},
    });
    let frame;
    if (options.frames) Object.assign(video, {
        requestVideoFrameCallback(cb) { frame = cb; return 1; }, cancelVideoFrameCallback() { frame = null; },
    });
    const endLayer = new Layer(), requests = [], releases = [], doc = new EventTarget();
    const fetchVideo = (url) => {
        requests.push(url);
        return {ready: options.bytes ?? Promise.resolve('blob:film'), release() { releases.push(url); }};
    };
    const snapshots = [];
    const createPlayer = script.runInNewContext({
        document: doc, navigator: {connection:{saveData:false}}, window: { setTimeout }, clearTimeout, AbortController,
        preferNativeFlightVideo: false,
        matchMedia: () => new EventTarget(), getComputedStyle: layer => layer.style,
        requestAnimationFrame: () => 0, cancelAnimationFrame() {},
        sequenceClamp: value => Math.max(0, Math.min(1, value)),
        prepareFlightVideo: fetchVideo,
    });
    const controller = createPlayer({
        video, poster: new Layer(), endLayer, url: 'flight.mp4', endPoster: 'landing.avif',
        lastFrame: 63, startAtEnd: false, fadeExtension: () => 0, preparedVideo: options.prepared,
        resumeWhenVisible: options.resumeWhenVisible,
        onUpdate: snapshot => snapshots.push(snapshot),
    });
    t.after(() => controller.destroy());
    const event = type => video.dispatchEvent(new Event(type));
    return {
        video, endLayer, controller, event, requests, releases, doc,
        state: () => snapshots.at(-1)?.state,
        move(time) { video.currentTime = time; event('timeupdate'); },
        present(time) { frame?.(0, {mediaTime:time}); },
        async start() { controller.start(); await setImmediate(); },
        async advance(ms) { t.mock.timers.tick(ms); await setImmediate(); },
    };
}

test('one buffered seek resumes a stalled decoder and the film reaches its real end', async t => {
    const f = flight(t);
    await f.start();
    f.move(1);
    f.event('waiting');
    await f.advance(400);
    assert.equal(f.video.currentTime, 1 + 1 / 24);
    f.move(1.7);
    await f.advance(470);
    assert.equal(f.video.currentTime, 1.7, 'a second seek would disrupt resumed playback');
    f.move(2.4);
    await f.advance(650);
    assert.notEqual(f.state(), 'arrival', 'genuine progress extends the deadline');
    f.move(4);
    f.video.ended = true;
    f.event('ended');
    await setImmediate();
    assert.equal(f.state(), 'arrival');
    assert.equal(f.endLayer.style.opacity, '1');
});

test('repeated waits and the seek itself do not postpone the 1.2-second landing', async t => {
    const f = flight(t);
    await f.start();
    f.move(1.27);
    f.event('waiting');
    await f.advance(400);
    f.event('timeupdate');
    await f.advance(799);
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
    await f.advance(400);
    assert.equal(f.video.currentTime, 1);
    await f.advance(800);
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

test('partial downloads stay on the start image; a transferred prefetch is used just once', async t => {
    let done, released = 0;
    const f = flight(t, {prepared:{ready: new Promise(r=>{done=r}), release() { released++; }}});
    await f.start();
    await f.advance(6000);
    assert.equal(f.video.playCalls, 0);
    assert.equal(f.state(), 'loading');
    assert.equal(f.video.style.opacity, '0');
    done('blob:completed');
    await setImmediate();
    assert.equal(f.video.playCalls, 1);
    assert.deepEqual(f.requests, []);
    f.move(1);
    assert.equal(f.state(), 'moving');
    f.controller.destroy();
    assert.equal(released, 1);
});

test('a blocked play request can be resumed directly by a fresh gesture', async t => {
    const f = flight(t);
    const play = f.video.play;
    f.video.play = () => Promise.reject(new DOMException('Gesture required', 'NotAllowedError'));
    await f.start();
    assert.equal(f.state(), 'paused');
    await f.advance(10000);
    assert.equal(f.state(), 'paused');
    f.video.play = play;
    f.controller.start();
    assert.equal(f.video.playCalls, 1, 'play is called synchronously on the next gesture');
    f.move(.2);
    assert.equal(f.state(), 'moving');
});

test('a moving media clock cannot conceal a frozen presented picture', async t => {
    const f = flight(t, {frames:true});
    await f.start();
    f.move(.2);
    f.present(.2);
    assert.equal(f.state(), 'moving');
    await f.advance(400);
    assert.equal(f.state(), 'loading');
    f.move(1.0);
    await f.advance(800);
    assert.equal(f.state(), 'arrival');
    assert.equal(f.endLayer.style.opacity, '1');
});

test('a phone flight keeps its still visible until the first picture is presented', async t => {
    const f = flight(t, {frames:true});
    await f.start();
    assert.equal(f.video.style.opacity, '0');
    f.move(.25);
    assert.equal(f.video.style.opacity, '0');
    f.present(0);
    assert.equal(f.video.style.opacity, '1');
    f.present(.25);
    assert.equal(f.state(), 'moving');
});

test('returning to the phone tab resumes at the interrupted picture', async t => {
    const f = flight(t, {frames:true, resumeWhenVisible:true});
    await f.start();
    f.move(1.2);
    f.present(1.2);
    f.doc.hidden = true;
    f.doc.dispatchEvent(new Event('visibilitychange'));
    assert.equal(f.state(), 'paused');
    assert.equal(f.video.paused, true);
    await f.advance(12000);
    assert.equal(f.video.currentTime, 1.2);
    f.doc.hidden = false;
    f.doc.dispatchEvent(new Event('visibilitychange'));
    assert.equal(f.video.playCalls, 2);
    f.move(1.6);
    f.present(1.6);
    assert.equal(f.state(), 'moving');
});

test('leaving during a pending transfer cancels its ownership and ignores late completion', async t => {
    let done;
    const f = flight(t, {bytes:new Promise(r=>{done=r})});
    await f.start();
    f.controller.destroy();
    done('blob:late');
    await setImmediate();
    assert.equal(f.video.playCalls, 0);
    assert.equal(f.releases.length, 1);
});

function transport(t, status = 200) {
    t.mock.timers.enable({apis:['setTimeout']});
    let stream, cancelled = false, revoked = 0, receivedSize = null;
    const create = downloadScript.runInNewContext({
        window:{setTimeout}, clearTimeout, AbortController, Blob, Response, TransformStream, preferNativeFlightVideo: false,
        URL:{createObjectURL(blob) {receivedSize = blob.size; return 'blob:completed'}, revokeObjectURL(){revoked++;}},
        fetch: async (_url, {signal}) => {
            const body = new ReadableStream({start(controller){stream=controller;}});
            signal.addEventListener('abort',()=>{cancelled=true;stream.error(Error('Aborted'));});
            return new Response(body, {status, headers: status === 206 ? {'content-range':'bytes 0-9/30'} : {}});
        },
    });
    const clip = create('https://cdn.example/film.mp4');
    t.after(() => clip.release());
    return {clip, stream, cancelled:()=>cancelled, revoked:()=>revoked, size:()=>receivedSize};
}

test('slow, advancing transfers become one blob only after the last byte', async t => {
    const f = transport(t);
    for (let i=0;i<4;i++) {
        t.mock.timers.tick(10000);
        f.stream.enqueue(Uint8Array.of(i));
        await setImmediate();
        assert.equal(f.cancelled(), false);
        assert.equal(f.size(), null);
    }
    f.stream.close();
    assert.equal(await f.clip.ready, 'blob:completed');
    assert.equal(f.size(), 4);
    f.clip.release(); f.clip.release();
    assert.equal(f.revoked(), 1);
});

test('a silent network timeout never becomes playable', async t => {
    const f = transport(t);
    await setImmediate();
    t.mock.timers.tick(15000);
    assert.equal(await f.clip.ready, null);
    assert.equal(f.cancelled(), true);
    assert.equal(f.size(), null);
});

test('a partial HTTP response cannot be mistaken for a complete film', async t => {
    assert.equal(await transport(t, 206).clip.ready, null);
});

test('an offline transfer lands directly on the decoded fallback', async t => {
    const f = flight(t, {bytes:Promise.resolve(null)});
    await f.start();
    assert.equal(f.state(), 'arrival');
    assert.equal(f.video.playCalls, 0);
    assert.equal(f.endLayer.style.opacity, '1');
});

test('a browser rejecting Blob MP4 waits for the entire native HTTP movie, then plays', async t => {
    const f = flight(t);
    let end = 1.4;
    f.video.buffered = {length:1,start:()=>0,end:()=>end};
    const play = f.video.play;
    f.video.play = function() {
        this.play = play;
        this.playCalls++;
        return Promise.reject(new DOMException('Blob MP4 unsupported', 'NotSupportedError'));
    };
    await f.start();
    assert.equal(f.video.src, 'flight.mp4');
    assert.equal(f.state(), 'loading');
    await f.advance(4000);
    assert.equal(f.video.playCalls, 1, 'partial HTTP buffer does not start playback');
    end = f.video.duration;
    f.event('progress');
    await setImmediate();
    assert.equal(f.video.playCalls, 2);
    f.move(.5);
    assert.equal(f.state(), 'moving');
    f.move(4);
    f.video.ended = true;
    f.event('ended');
    await setImmediate();
    assert.equal(f.state(), 'arrival');
});

test('a range-blind native player waits for the full download and native readiness', async t => {
    let completeDownload;
    const f = flight(t, {bytes:new Promise(resolve => { completeDownload = resolve; })});
    f.video.buffered = {length:0};
    await f.start();
    f.event('ended'); // An event from preloading must not dismiss the poster.
    await f.advance(1500);
    assert.equal(f.video.playCalls, 0);
    assert.equal(f.state(), 'loading');
    completeDownload('flight.mp4');
    await setImmediate();
    assert.equal(f.video.playCalls, 0);
    f.video.readyState = 4;
    f.event('canplaythrough');
    await setImmediate();
    assert.equal(f.video.playCalls, 1);
    f.move(.5);
    assert.equal(f.state(), 'moving');
});
