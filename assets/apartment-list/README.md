# Apartment list media

Ten shared apartment-type plans, four composite floor layouts, and ten matching type-datasheet PDFs for the Admiral Park apartment list.

```text
floorplans/types/A/       original.png, full.webp, thumb.webp
floorplans/types/B/       ... through F2
floor-layouts/00/         full.webp, thumb.webp
floor-layouts/01/         ... through 03
datasheets/types/         A.pdf ... F2.pdf
media-manifest.json       Exact apartment-to-type mapping and file hashes
```

Plan images are type illustrations. They do not establish the precise mirrored arrangement or terrace variant of every apartment. The official type workbook maps all 69 apartment IDs; building letters and type letters remain separate. Each floor layout contains buildings A, B and C together.

Original PNG copies retain their source bytes. Full WebP plan images preserve their decoded pixels and alpha. Type thumbnails trim only transparent outer margins with a small transparent inset; every visible mark is preserved. Floor layouts use the supplied native transparent plan artwork at 2560 × 1600, preserving the full canvas, apartment labels and linework used in the latest customer book. The ten one-page PDFs preserve the matching type pages from the current customer book (r05). The corrected C entry image is used.

The manifest uses application-relative `assets/` paths. When resolving against this directory, remove that prefix: `assets/floorplans/types/B/full.webp` becomes `floorplans/types/B/full.webp`. The Framer component's Asset folder control performs this resolution.

The folder contains no apartment prices or private local filesystem paths.
