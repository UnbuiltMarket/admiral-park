"""Bake Safari-independent apartment IDs and transparent window sprites from Corona exports.

Run with Python, Pillow (AVIF/WebP support) and NumPy:
  python scripts/build_orbit_interaction.py --source assets/orbit-v05 --output assets/orbit-interaction-v1
"""

import argparse
import json
import struct
from pathlib import Path

import numpy as np
from PIL import Image

TILE = 32
PAD = 2
COLUMNS = 20
STRIDE = TILE + 2 * PAD


def build_camera(mask_file, source, output, palette, lookup):
    with Image.open(mask_file) as image:
        rgba = np.asarray(image.convert("RGBA"))
    rgb = rgba[:, :, :3].astype(np.uint32)
    identities = lookup[rgb[:, :, 0] << 16 | rgb[:, :, 1] << 8 | rgb[:, :, 2]]
    identities[rgba[:, :, 3] != 255] = 0
    h, w = identities.shape
    if (w, h) != (1920, 1010):
        raise ValueError(f"Unexpected mask dimensions for {mask_file}")

    def render(folder):
        with Image.open(source / folder / mask_file.with_suffix(".avif").name) as image:
            if image.size != (w, h):
                raise ValueError("Misaligned light renders")
            return np.asarray(image.convert("RGB"))

    native, sold = render("light"), render("sold")
    delta = sold.astype(np.int16) - native
    change = delta[:, :, 0] - 0.65 * delta[:, :, 1] - 0.35 * delta[:, :, 2]
    alpha = np.floor(np.clip((change - 8) * 12 + 0.5, 0, 255)).astype(np.uint8)
    indices = sorted(set(np.unique(identities)) - {0})
    payload = bytearray()
    tiles = []
    for index in indices:
        # APM1 uses one 4-byte apartment ID, followed by (y,x,length) runs.
        # Lighting tiles follow the runs and refer to consecutive atlas slots.
        selected = identities == index
        edge = np.diff(np.pad(selected.astype(np.int8), ((0, 0), (1, 1))), axis=1)
        ys, xs = np.nonzero(edge == 1)
        end_rows, ends = np.nonzero(edge == -1)
        assert np.array_equal(ys, end_rows)
        name = palette[index - 1]["id"].encode("ascii")
        assert len(name) == 4
        payload += name + struct.pack("<I", len(ys))
        payload += np.stack((ys, xs, ends - xs), axis=1).astype("<u2").tobytes()
        y, x = np.nonzero(selected & (alpha > 0))
        tile_keys = np.unique((y // TILE) * 256 + x // TILE)
        payload += struct.pack("<H", len(tile_keys))
        for key in tile_keys:
            ty, tx = divmod(int(key), 256)
            payload += bytes([tx, ty])
            tiles.append((index, tx * TILE, ty * TILE))

    # Three aligned banks hold the original light, the rendered sold light,
    # and a luminance plane for tinting reserved apartments to any sidebar colour.
    bank_height = ((len(tiles) + COLUMNS - 1) // COLUMNS) * STRIDE
    atlas = np.zeros((3 * bank_height, COLUMNS * STRIDE, 4), dtype=np.uint8)
    for slot, (index, x, y) in enumerate(tiles):
        sy, sx = slice(y, min(y + TILE, h)), slice(x, min(x + TILE, w))
        th, tw = identities[sy, sx].shape
        coverage = np.where(identities[sy, sx] == index, alpha[sy, sx], 0)
        gray = np.max(native[sy, sx], axis=2, keepdims=True)
        oy, ox = slot // COLUMNS * STRIDE, slot % COLUMNS * STRIDE
        for bank, colors in enumerate((native[sy, sx], sold[sy, sx], gray)):
            patch = np.zeros((TILE, TILE, 4), dtype=np.uint8)
            patch[:th, :tw, :3] = colors
            patch[:th, :tw, 3] = coverage
            if bank == 2:
                # Opaque gray on the drawn pixels allows exact multiplication;
                # the native bank restores the real soft alpha in the browser.
                patch[:th, :tw, 3] = np.where(coverage, 255, 0)
            patch[patch[:, :, 3] == 0] = 0
            top = oy + bank * bank_height
            atlas[top:top + STRIDE, ox:ox + STRIDE] = np.pad(
                patch, ((PAD, PAD), (PAD, PAD), (0, 0)), mode="edge"
            )
    header = struct.pack("<4sHHBBBBH", b"APM1", w, h, len(indices), TILE, COLUMNS, PAD, len(tiles))
    (output / (mask_file.stem + ".bin")).write_bytes(header + payload)
    image = Image.fromarray(atlas)
    for suffix, scale in (("", 1), ("-phone", 2)):
        variant = image if scale == 1 else image.resize(
            (image.width // scale, image.height // scale), Image.Resampling.BOX
        )
        variant.save(output / (mask_file.stem + suffix + ".webp"), "WEBP", quality=94, method=5)
    return {palette[index - 1]["id"] for index in indices}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--source", type=Path, required=True)
    parser.add_argument("--output", type=Path, required=True)
    args = parser.parse_args()
    project = Path(__file__).resolve().parents[1]
    palette = json.loads((project / "data/orbit-mask-views.json").read_text(encoding="utf-8"))["palette"]
    lookup = np.zeros(1 << 24, dtype=np.uint8)
    for index, apartment in enumerate(palette, 1):
        for convert in (lambda n: n >> 8, lambda n: n // 257, lambda n: round(n / 257)):
            r, g, b = map(convert, apartment["renderedRgb16"])
            key = r << 16 | g << 8 | b
            if lookup[key] not in (0, index):
                raise ValueError("Ambiguous mask palette")
            lookup[key] = index
    args.output.mkdir(parents=True, exist_ok=True)
    seen = set()
    for frame in range(0, 120, 15):
        mask_file = args.source / "masks" / f"{frame:04}.png"
        seen.update(build_camera(mask_file, args.source, args.output, palette, lookup))
    if seen != {apartment["id"] for apartment in palette}:
        raise ValueError("The mask set is missing apartments")


if __name__ == "__main__":
    main()
