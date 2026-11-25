import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { setImmediate } from 'node:timers/promises'
import { Script } from 'node:vm'
import test from 'node:test'
import { compileTS } from '../scripts/tooling.mjs'

const root = new URL('../', import.meta.url)
const source = await readFile(new URL('src/framer/homepage-draft-3/HERO_video_no_fullscreen.tsx', root), 'utf8')
const parser = source.slice(source.indexOf('interface OrbitMaskIndex'), source.indexOf('interface OrbitApartmentPickerSnapshot'))
const hit = source.slice(source.indexOf('function orbitMaskPixelAt'), source.indexOf('interface OrbitLightingApartment'))
const script = new Script(compileTS(parser + hit, 'mask.ts') + '\n;({readOrbitMaskPacket, orbitMaskPixelAt, loadCustomOrbitMask})')
const { palette } = JSON.parse(await readFile(new URL('data/orbit-mask-views.json', root), 'utf8'))
const ids = palette.map(entry => entry.id)
const bytesAt = async (frame, extension) => readFile(new URL('assets/orbit-interaction-v1/' + String(frame).padStart(4, '0') + extension, root))
const toBuffer = bytes => bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength)

test('eight colour-independent ID maps fit the matching desktop and phone lighting banks and cover all apartments', async () => {
    const { readOrbitMaskPacket, orbitMaskPixelAt } = script.runInNewContext({})
    const seen = new Set()
    for (let frame = 0; frame < 120; frame += 15) {
        const mask = readOrbitMaskPacket(toBuffer(await bytesAt(frame, '.bin')), ids)
        const { patches, columns, tileSize, padding, slots } = mask.lighting
        assert.equal(orbitMaskPixelAt(mask, 0, 0), 0)
        for (const id of patches.keys()) {
            assert.ok(mask.minX[ids.indexOf(id) + 1] < 1920)
            seen.add(id)
        }
        for (const [suffix, scale] of [['.webp', 1], ['-phone.webp', .5]]) {
            const image = await bytesAt(frame, suffix)
            assert.equal(image.toString('ascii', 12, 16), 'VP8X')
            const stride = (tileSize + 2 * padding) * scale
            assert.equal(image.readUIntLE(24, 3) + 1, columns * stride)
            assert.equal(image.readUIntLE(27, 3) + 1, 3 * Math.ceil(slots / columns) * stride)
        }
        if (frame === 30) {
            // Five actual hover samples from the Safari C304 report.
            for (const [x, y] of [[1406,222], [1526,246], [1554,270], [1526,294], [1522,318]])
                assert.equal(ids[orbitMaskPixelAt(mask, x, y) - 1], 'C304')
        }
    }
    assert.deepEqual(seen, new Set(ids))
})

test('truncated packets fail before exposing a partially populated mask', async () => {
    const { readOrbitMaskPacket } = script.runInNewContext({})
    const bytes = await bytesAt(0, '.bin')
    assert.throws(() => readOrbitMaskPacket(toBuffer(bytes.subarray(0, bytes.length - 1)), ids))
})

test('a stuck custom bitmap decoder falls back, releases its late bitmap and cancels native loads on disposal', async t => {
    t.mock.timers.enable({ apis: ['setTimeout'] })
    let finishBitmap, image, closed = 0, revoked = 0
    const { loadCustomOrbitMask } = script.runInNewContext({
        createImageBitmap: () => new Promise(resolve => { finishBitmap = resolve }),
        Image: class { constructor() { image = this } removeAttribute() {} },
        URL: { createObjectURL: () => 'blob:test', revokeObjectURL: () => { revoked++ } },
        setTimeout, clearTimeout,
    })
    const controller = new AbortController()
    const request = loadCustomOrbitMask({}, controller.signal)
    await setImmediate()
    t.mock.timers.tick(2500)
    await setImmediate()
    image.onload()
    assert.equal(await request, image)
    finishBitmap({ close: () => { closed++ } })
    await setImmediate()
    assert.equal(closed, 1)
    assert.equal(revoked, 1)
    const pending = loadCustomOrbitMask({}, controller.signal)
    await setImmediate()
    t.mock.timers.tick(2500)
    await setImmediate()
    controller.abort()
    await assert.rejects(pending, /cancelled/)
    assert.equal(revoked, 2)
})
