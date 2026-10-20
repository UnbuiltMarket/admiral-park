#!/usr/bin/env python3
"""Rebuild the two small, static Montserrat fonts used only for PDF export.

Requires Python 3.10+ and fonttools==4.61.1. Example:
    python -m pip install fonttools==4.61.1
    python scripts/prepare-pdf-fonts.py

The source and licence come from a pinned official Google Fonts revision. The
download is hash checked before any output is written. These are real static
TrueType fonts, so PDF font embedding does not depend on browser webfont state
or on variable-font support. Keep OFL.txt alongside the generated fonts.
"""

from __future__ import annotations

import argparse
import hashlib
import io
import json
from pathlib import Path
import urllib.request

import fontTools
from fontTools import subset
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont


FONTTOOLS_VERSION = "4.61.1"
GOOGLE_FONTS_REVISION = "76fca9fd0bb4ea46583f92e978660f3984ab9442"
SOURCE_BASE = (
    "https://raw.githubusercontent.com/google/fonts/"
    + GOOGLE_FONTS_REVISION
    + "/ofl/montserrat/"
)
SOURCE_URL = SOURCE_BASE + "Montserrat%5Bwght%5D.ttf"
SOURCE_SHA256 = "0f7b311b2f3279e4eef9b2f968bcdbab6e28f4daeb1f049f4f278a902bcd82f7"
LICENSE_SHA256 = "8b7141c03fa4f8d44e6345d5d4931709290f0f67875e452e95ac1fd3a027802e"
ROOT = Path(__file__).resolve().parents[1]
DEFAULT_OUTPUT = ROOT / "assets/apartment-list/fonts/montserrat"

# Broad Western Latin coverage includes Hungarian, present/future apartment
# labels and all usual numbers/currency/quotation/spacing characters. Keeping
# complete ranges instead of only today's strings prevents data-dependent
# missing glyphs after the apartment JSON is updated.
UNICODE_RANGES = (
    (0x0020, 0x007E),  # ASCII
    (0x00A0, 0x017F),  # Latin-1, Latin Extended A: includes ő and ű
    (0x0300, 0x036F),  # combining accents
    (0x2000, 0x206F),  # spaces, dashes, bullets, ellipsis, directional marks
    (0x20A0, 0x20CF),  # currency signs
    (0x2100, 0x214F),  # letterlike symbols, e.g. trademark
    (0x2190, 0x21FF),  # arrows, e.g. website/inquiry marker
)
EXTRA_CODEPOINTS = {0x1E9E, 0x2212, 0x2215, 0xFEFF}  # capital sharp S, minus, fraction slash, BOM
REQUIRED_TEXT = (
    "Árvíztűrő tükörfúrógép ÁÉÍÓÖŐÚÜŰ áéíóöőúüű "
    "Admiral Park Balatonfüred Beltér Erkély Kert Bruttó vételár "
    "Földszint Típusterv Lakásterületek Helyiségek Tájolás "
    "Az alaprajz illusztráció. Bútorozatlan átadás. "
    "0123456789 m² Ft M Ft % / . , : ; ( ) – — … · • ↗"
)


def digest(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def download(url: str, expected: str) -> bytes:
    request = urllib.request.Request(url, headers={"User-Agent": "Admiral-Park-PDF-font-preparation"})
    with urllib.request.urlopen(request, timeout=60) as response:
        data = response.read()
    actual = digest(data)
    if actual != expected:
        raise ValueError(f"Unexpected source hash for {url}: {actual}")
    return data


def json_strings(value):
    if isinstance(value, str):
        yield value
    elif isinstance(value, list):
        for child in value:
            yield from json_strings(child)
    elif isinstance(value, dict):
        for key, child in value.items():
            yield key
            yield from json_strings(child)


def make_font(source: bytes, weight: int, style: str, postscript_style: str) -> bytes:
    font = TTFont(io.BytesIO(source), recalcTimestamp=False)
    source_times = (font["head"].created, font["head"].modified)
    instantiateVariableFont(font, {"wght": weight}, inplace=True, optimize=True, updateFontNames=True)
    options = subset.Options()
    options.recalc_timestamp = False
    options.canonical_order = True
    options.layout_features = ["kern", "liga", "clig", "ccmp", "locl", "mark", "mkmk"]
    # PDF text is rendered at arbitrary zoom; omit pixel-grid hints and optional
    # small-cap/stylistic sets rather than shipping unused alternate glyphs.
    options.hinting = False
    options.name_IDs = [0, 1, 2, 3, 4, 5, 6, 13, 14, 16, 17]
    options.name_legacy = True
    options.name_languages = [0x409]
    options.notdef_glyph = True
    options.notdef_outline = True
    options.recommended_glyphs = True
    options.drop_tables += ["DSIG"]
    unicodes = set(EXTRA_CODEPOINTS)
    for first, last in UNICODE_RANGES:
        unicodes.update(range(first, last + 1))
    subsetter = subset.Subsetter(options=options)
    subsetter.populate(unicodes=unicodes)
    subsetter.subset(font)
    font["OS/2"].usWeightClass = weight
    font["head"].created, font["head"].modified = source_times
    for name_id, value in {
        1: "Montserrat",
        2: style,
        4: "Montserrat " + style,
        6: "Montserrat-" + postscript_style,
        16: "Montserrat",
        17: style,
    }.items():
        font["name"].setName(value, name_id, 3, 1, 0x409)
        font["name"].setName(value, name_id, 1, 0, 0)
    if "fvar" in font:
        raise ValueError("PDF font must be static; a variable axis remains")
    cmap = font.getBestCmap()
    missing = sorted({char for char in REQUIRED_TEXT if ord(char) not in cmap})
    dataset = ROOT / "data/apartment-details.json"
    if dataset.is_file():
        for text in json_strings(json.loads(dataset.read_text(encoding="utf-8-sig"))):
            missing += [char for char in text if not char.isspace() and ord(char) not in cmap]
    if missing:
        names = ", ".join(f"U+{ord(char):04X} {char!r}" for char in sorted(set(missing)))
        raise ValueError("The PDF font does not cover required text: " + names)
    output = io.BytesIO()
    font.save(output, reorderTables=True)
    font.close()
    return output.getvalue()


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--output", type=Path, default=DEFAULT_OUTPUT)
    parser.add_argument("--source", type=Path, help="Optional local copy of the pinned source TTF; hash is still checked")
    arguments = parser.parse_args()
    if fontTools.version != FONTTOOLS_VERSION:
        raise RuntimeError(f"For byte-repeatable output install fonttools=={FONTTOOLS_VERSION}; found {fontTools.version}")
    source = arguments.source.read_bytes() if arguments.source else download(SOURCE_URL, SOURCE_SHA256)
    if digest(source) != SOURCE_SHA256:
        raise ValueError("Local font source does not match the pinned Google Fonts revision")
    # Finish/validate both outputs before writing anything. Never overwrite an
    # existing licence, which is already shared with the site's webfonts.
    files = {
        "montserrat-pdf-regular.ttf": make_font(source, 400, "Regular", "Regular"),
        "montserrat-pdf-semibold.ttf": make_font(source, 600, "SemiBold", "SemiBold"),
    }
    license_file = arguments.output / "OFL.txt"
    license_bytes = None if license_file.is_file() else download(SOURCE_BASE + "OFL.txt", LICENSE_SHA256)
    arguments.output.mkdir(parents=True, exist_ok=True)
    if license_bytes is not None:
        license_file.write_bytes(license_bytes)
    for filename, data in files.items():
        (arguments.output / filename).write_bytes(data)
    print(json.dumps({
        "source": SOURCE_URL,
        "fonttools": FONTTOOLS_VERSION,
        "files": {filename: {"bytes": len(data), "sha256": digest(data)} for filename, data in files.items()},
    }, indent=2))


if __name__ == "__main__":
    main()
