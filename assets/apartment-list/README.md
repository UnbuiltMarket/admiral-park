# Apartment list media

Ten shared apartment-type plans, four composite floor layouts, and ten matching type-datasheet PDFs for the Admiral Park apartment list.

```text
floorplans/types/A/       plan.avif
floorplans/types/B/       ... through F2
floor-layouts/00/         full.webp, thumb.webp
floor-layouts/01/         ... through 03
datasheets/types/         A.pdf ... F2.pdf
media-manifest.json       Exact apartment-to-type mapping and file hashes
```

Plan images are type illustrations. They do not establish the precise mirrored arrangement or terrace variant of every apartment. The official type workbook maps all 69 apartment IDs; building letters and type letters remain separate. Each floor layout contains buildings A, B and C together.

The orbit, list and detail card share one transparent AVIF per type. Each AVIF contains the full sheet. Use the apartment dataset's normalized room-layout view box to frame the drawing, including in thumbnails. Floor overviews use the supplied transparent artwork at 2560 × 1600. The ten one-page PDFs preserve the matching type pages from the current customer book (r05).

The manifest uses application-relative `assets/` paths. The Framer component's Asset folder control resolves `assets/floorplans/types/B/plan.avif` as `floorplans/types/B/plan.avif` within this directory.

The folder contains no apartment prices or private local filesystem paths.
