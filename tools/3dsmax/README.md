# Admiral Park apartment mask boxes

Run **AdmiralApartmentMaskBoxes.ms** in 3ds Max using **Scripting → Run Script**. The file is self-contained: it does not need Node, Python, an external JSON parser or an internet connection inside Max.

It creates **69 separate Box objects**, one for each real apartment ID:

| Parameter | New box size |
| --- | ---: |
| Height | 315 cm |
| Length | 500 cm |
| Width | 1000 cm |

The script converts these physical sizes into the current scene's system units. It does not change the scene units or renderer.

New boxes are arranged in a flat staging grid with nine columns and a 100 cm gap, starting at world origin. This grid is a palette, **not the real apartment layout**. Move and reshape each box into the matching apartment volume. The layers are **AP_MASKS_A**, **AP_MASKS_B** and **AP_MASKS_C**. Names such as **AP_MASK_A001** identify the apartment.

Each box has its own Object Color (`colorByLayer = false`), plus these User Defined properties:

- `AdmiralMaskOwner`: `admiral-park-mask-v1`
- `ApartmentId`: for example `A001`
- `MaskHex`: for example `#2080E0`
- `MaskPaletteVersion`: `1`

The script preserves your current selection. To select only newly created boxes, use this in the MAXScript Listener:

```maxscript
AdmiralCreateApartmentMaskBoxes selectCreated:true
```

Running the script again finds the tagged boxes and restores their assigned colours. It preserves their current dimensions, shape, transforms, names, parenting, materials and visibility. Missing boxes are recreated in the staging grid. Duplicate apartment tags or an unrelated object using a reserved name stop the script before it changes the scene. Creation and refresh form one undo operation.

## Fixed colour mapping

**data/apartment-mask-colors.json** is the permanent colour ledger. Both **data/apartments.json** and **data/apartment-details.json** contain a `maskColor` field on each apartment, joined by its ID. Availability, source ordering and data refreshes do not reassign colours.

**apartment-mask-colors.csv** lists all 69 IDs, hex/RGB values, object names, layers and sizes. Black `#000000` is reserved for background; white is not used as an apartment ID. The palette's minimum pairwise Euclidean RGB distance is 48. These are numeric identifiers, not a promise that every pair will look different to every viewer.

Do not hand-edit the generated `.ms` palette or regenerate colours from apartment order. The build command regenerates the Max file and CSV from the existing ledger:

```text
node scripts/build-apartment-mask-boxes.mjs
node scripts/build-apartment-mask-boxes.mjs --check
```

No Framer component replacement is needed for this preparation step. The façade hit-testing and highlight layer will be connected after the eight mask images exist.

## Corona mask export

1. Use the same eight checkpoint cameras, resolution and image framing as the beauty views. Keep the boxes aligned to the corresponding apartments. Exporting only the mask boxes, as planned, avoids needing beauty materials for the ID pass.
2. Add **CMasking_WireColor** in Render Setup → Render Elements. This uses the objects' assigned wire/Object Colors. Do not use the lit beauty image or a random-ID pass for this mapping. [Chaos render-element reference](https://docs-chaos.atlassian.net/wiki/spaces/CRMAX/pages/124495479).
3. Use a separate mask scene/settings with no depth of field, motion blur, denoising, grading, LUT or display transform on the exported ID data. Disable reflection/refraction propagation for first-surface picking.
4. For hard ID edges, Chaos documents the string option `bool shading.enableAa = false`. This affects the render, including beauty, so use it only for the mask setup and remove it before beauty rendering. [Chaos antialiasing instructions](https://support.chaos.com/hc/en-us/articles/4528455704721-How-to-completely-disable-antialiasing-in-Corona). **Render only masks (disable shading)** can speed this separate pass. [Chaos masks-only workflow](https://support.chaos.com/hc/en-us/articles/4528329061905-How-to-disable-antialiasing-for-render-elements-in-Corona-for-3ds-Max).
5. Save the mask as **lossless 8-bit RGB/RGBA PNG**, with a black or transparent background. Keep the AVIF beauty frames separate. Do not use lossy AVIF, JPEG or lossy WebP for the colour-ID masks, and do not smooth-resize the exported masks.
6. Render **one checkpoint first** and sample a solid pixel well inside a box. Its RGB bytes must equal the CSV/JSON entry. Gamma/OCIO/export settings can change numeric colours even when an image looks similar; confirm this round trip before exporting all eight views. If necessary, fix the mask export conversion rather than guessing new object colours.

Antialiased or resampled boundary pixels can mix colours, even with a spaced palette. The eventual website picker must reject ambiguous boundary pixels rather than blindly assigning the nearest ID.

## Verification

The repository's Node tests verify all 69 canonical IDs, unique colours, palette separation, matching JSON/MAXScript/CSV mappings, centimetre dimensions, repeatable builds and stable data refreshes. The runtime harness also passed in **3ds Max 2026.3**, testing centimetre and metre system units, edited geometry preservation, duplicate/name conflict checks and missing-box repair. This validates box creation and metadata; it does not replace the rendered PNG colour check above.

`tests/3dsmax/verify-apartment-mask-boxes.ms` is a separate **headless test harness**; it resets its test scene and must not be run in a production scene. The deliverable to run in your working scene is **AdmiralApartmentMaskBoxes.ms**.
