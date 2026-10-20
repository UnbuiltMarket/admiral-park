# Shared apartment detail card in Framer

The homepage and apartment list import one local `AdmiralApartmentDetailCard` module. The card's presentation and interaction code lives in that module, so changing it changes both entry points. The orbit stays fullscreen on desktop and keeps its mobile apartment workspace.

## Install the three code files

Create or update these three Framer code files at the same folder level, using the exact names:

1. `AdmiralApartmentDetailCard.tsx` — create this shared file first. Paste the generated file from `src/framer/`. It is a dependency; do not add a separate instance to the canvas.
2. `AdmiralHomepageTrial.tsx` — replace the contents of the existing homepage file. Keep the current component instance and its sidebar settings.
3. `AdmiralApartmentList.tsx` — replace the contents of the existing list file. Keep the current list instance and sidebar settings.

Both entry files import `./AdmiralApartmentDetailCard`. If you deliberately place the shared file in another folder, update both import paths. An unresolved-import error means the shared file is missing or its name/path differs.

The component code stays inside the Framer project. No GitHub component loader is involved. Code edits remain available to Framer's editor immediately. Publish the Framer project normally after reviewing the result.

## Apartment PDF download

The `Adatlap` button creates a one-page landscape PDF of the selected apartment's detail card. It uses the same branding, colours, cropped drawing, plan markers, room data, price and status. It no longer downloads the generic apartment-type datasheet. Files are named `Admiral-Park-A001-adatlap.pdf`, using the selected ID.

The PDF uses the same full layout on phones and desktop, regardless of the mobile card's hidden tabs. The selected drawing tab is respected: Alaprajz exports the apartment plan; Szintrajz exports the floor layout. Numbered type-plan rooms are joined to actual areas only when their explicit `planNumber` mappings are complete. Other apartments show the type legend and actual room areas as separate columns.

Text, logo paths and room markers are vectors. The drawing is compressed as a high-quality JPEG, retaining up to 1800 pixels along its longest cropped edge. Background gradients are rasterised separately. Price and availability are a snapshot at download time; the PDF includes the date and a link back to the apartment.

Only `AdmiralApartmentDetailCard.tsx` needs replacing for this update if the three-file shared setup is already installed. Do not replace the list or homepage just for PDF export, and do not add a separate shared-card canvas instance.

Export code is included in the shared component. PDF-Lib 1.17.1 and Fontkit 1.1.1 are loaded from jsDelivr only after a download click, with pinned SHA-384 integrity hashes. The two small static Montserrat print-font subsets are also fetched only on export. No PDF renderer, print font, canvas, or per-apartment PDF is prepared on page load. No apartment data is sent to an export server. Network failures show a retryable message and never silently download the old type PDF.

Maintain the renderer in `src/shared/apartment-card/pdf-export.js` and the button/snapshot handler in `card-pdf-actions.js`. The guarded extractor applies those two handler replacements, preserving the upstream design snapshot. Recreate the print fonts, if needed, with `scripts/prepare-pdf-fonts.py`; its official font source and checksum are pinned and it checks Hungarian character coverage. The existing Montserrat OFL licence applies.

## Data and loading

The homepage uses the small `data/apartments.json` projection for its compact information. Its first apartment click loads `data/apartment-details.json`, containing the public room lists and plan markers needed by the card. The list uses that full public dataset and passes it directly to the shared card, so opening a card from the list does not request it again.

The card is initialized when an apartment is opened and reused afterward. Its code is a normal local module import; this change does not promise a separate on-demand JavaScript download. Confirm published bundle behaviour separately before adding code splitting.

The card renders the selected apartment's drawings. It does not mount an invisible apartment list or request every apartment's thumbnails. The full plan, room legend, floor layout, status, price, inquiry, PDF, favourites and sharing remain in the shared view. Collapsed orbit information continues to omit the room list.

## Maintain and build

Generated files in `src/framer/` are the paste-ready deliverables. Edit their source templates and shared runtime, then run `node scripts/build.mjs` to regenerate all three together. Keep the shared file installed whenever updating either entry point.

The separate apartment-list authoring project remains the reference for data and design. Use its canonical JSON with the projection scripts, and review the snapshot sync when bringing over design changes. Avoid repasting the older all-in-one list component from that project's output: it contains a separate copy of the detail card.

```text
node scripts/sync-orbit-apartments.mjs --source <canonical-apartments.json>
node scripts/sync-apartment-details.mjs --source <canonical-apartments.json>
node scripts/sync-apartment-card.mjs --source <apartment-list-project-folder>
node scripts/sync-apartment-list.mjs --source <apartment-list-project-folder>
node scripts/build.mjs
```

The card sync regenerates its smaller card-only runtime and styles in the same operation. It checks the extraction before replacing files; unsupported changes in the reference source stop for review. The separate list sync regenerates its list-only runtime and styling. The shared card's edited source remains the single presentation used by both Framer entries.

The former desktop studio experiment remains saved on the `orbit-apartment-studio` branch. Current development continues on `main`.
