import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { Script } from 'node:vm';
import { compileTS } from '../scripts/tooling.mjs';

const source = await readFile(new URL('../src/framer/homepage-draft-3/HERO_video_no_fullscreen.tsx', import.meta.url), 'utf8');
const start = source.indexOf('const ORBIT_WHEEL_RELEASE_MS');
const end = source.indexOf('function orbitControlCoversPoint', start);
const sample = new Script(compileTS(source.slice(start, end), 'orbit-wheel.ts') + '\nsampleOrbitWheel').runInNewContext();

function swipe(samples, spacing, discrete = false) {
    let previous = null;
    return samples.map((strength, i) => {
        const result = sample(previous, i * spacing, 1, false, strength, discrete);
        const newEnvelope = previous !== result.gesture;
        previous = result.gesture;
        return { ...result, newEnvelope };
    });
}

for (const spacing of [18, 210, 297]) {
    test(`one trackpad swipe sampled every ${spacing} ms stays a single checkpoint intent`, () => {
        const results = swipe([1, 3, 6, 9, 10, 7, 5, 3, 2, 1], spacing);
        assert.equal(results.filter(s => s.newEnvelope).length, 1);
        assert.equal(results.some(s => s.continuous || s.renewed), false);
    });
}

test('a second push after the same swipe tapers earns an adjoining checkpoint', () => {
    const results = swipe([3, 14, 30, 20, 7, 2, 8, 24], 24);
    assert.equal(results.filter(s => s.renewed).length, 1);
});

test('separated swipes restart and repeated wheel detents keep driving', () => {
    assert.equal(swipe([6, 6], 500).filter(s => s.newEnvelope).length, 2);
    assert.equal(swipe([100, 100, 100, 100], 85).at(-1).continuous, true);
    assert.equal(swipe([48, 48], 70, true).at(-1).continuous, true);
});
