# Shared apartment detail card in Framer

The homepage and apartment list import one local `AdmiralApartmentDetailCard` module. The card's presentation and interaction code lives in that module, so changing it changes both entry points. The orbit stays fullscreen on desktop and keeps its mobile apartment workspace.

## Install the three code files

Create or update these three Framer code files at the same folder level, using the exact names:

1. `AdmiralApartmentDetailCard.tsx` — create this shared file first. Paste the generated file from `src/framer/`. It is a dependency; do not add a separate instance to the canvas.
2. `AdmiralHomepageTrial.tsx` — replace the contents of the existing homepage file. Keep the current component instance and its sidebar settings.
3. `AdmiralApartmentList.tsx` — replace the contents of the existing list file. Keep the current list instance and sidebar settings.

Both entry files import `./AdmiralApartmentDetailCard.tsx`, including the `.tsx` extension required by the Framer code-file path. Keep that exact filename and case. If you deliberately place the shared file in another folder, update both import paths. An unresolved-import error can also mean the shared file is missing or its name/path differs.

If the canvas reports “Unable to resolve missing Admiral apartment detail card”, first confirm that `AdmiralApartmentDetailCard.tsx` exists in Assets → Code at the exact path imported by both entry files. Replace its entire contents with the generated shared file and save it before saving the two entry files. The shared component uses one direct `export default function AdmiralApartmentDetailCard(...)` declaration; keep this form rather than adding a separate named export and default alias. Existing homepage and list instances can stay in place. Source checks verify the declaration and dependency paths, and server-rendering checks verify the module exports; these checks do not inspect Framer's own project component registry. If the message remains after the correct shared file is saved, inspect the Framer code-file diagnostic rather than changing the live rendering behavior.

The component code stays inside the Framer project. No GitHub component loader is involved. Code edits remain available to Framer's editor immediately. Publish the Framer project normally after reviewing the result.

The list uses the orbitdata's light liquid-glass material: a full-width ambient header, a centered 900px filter rail, reflective utility pills and floating comparison surfaces. Rows stay aligned and backgroundless floorplans remain clear. Tints follow the existing colour controls; navbar spacing, data and actions are unchanged. Blur is limited to shared surfaces, with opaque and reduced-transparency fallbacks. Replace only the list file for this styling update. The project-local import annotation handles Framer's single-file checker's lack of sibling-file resolution; it does not replace the required shared card.

## Apartment PDF download

The `Adatlap` buttons in both a list row and the detail popup create a one-page landscape PDF of the selected apartment's detail card. It uses the same branding, colours, cropped drawing, plan markers, room data, price and status. It no longer downloads the generic apartment-type datasheet. Files are named `Admiral-Park-A001-adatlap.pdf`, using the selected ID.

The PDF uses the same full layout on phones and desktop, regardless of the mobile card's hidden tabs. The selected drawing tab is respected: Alaprajz exports the apartment plan; Szintrajz exports the floor layout. Numbered type-plan rooms are joined to actual areas only when their explicit `planNumber` mappings are complete. Other apartments show the type legend and actual room areas as separate columns.

Text, logo paths and room markers are vectors. The drawing is compressed as a high-quality JPEG, retaining up to 1800 pixels along its longest cropped edge. Background gradients are rasterised separately. Price and availability are a snapshot at download time; the PDF includes the date and a link back to the apartment.

For the row-download and search update, replace `AdmiralApartmentDetailCard.tsx` and `AdmiralApartmentList.tsx` together. The existing homepage continues importing the same shared card. Do not add a separate shared-card canvas instance.

Export code is included in the shared component. PDF-Lib 1.17.1 and Fontkit 1.1.1 are loaded from jsDelivr only after a download click, with pinned SHA-384 integrity hashes. The two small static Montserrat print-font subsets are also fetched only on export. No PDF renderer, print font, canvas, or per-apartment PDF is prepared on page load. No apartment data is sent to an export server. Network failures show a retryable message and never silently download the old type PDF.

Maintain the renderer in `src/shared/apartment-card/pdf-export.js` and the active button/snapshot handlers in `card-runtime.js`. Keep their matching `card-pdf-actions.js` fixture aligned; the build reads the maintained runtime directly. Recreate the print fonts, if needed, with `scripts/prepare-pdf-fonts.py`; its official font source and checksum are pinned and it checks Hungarian character coverage. The existing Montserrat OFL licence applies.

## Data and loading

The homepage uses the small `data/apartments.json` projection for its compact information. Its first apartment click loads `data/apartment-details.json`, containing the public room lists and plan markers needed by the card. The list uses that full public dataset and passes it directly to the shared card, so opening a card from the list does not request it again.

The card is initialized on the first apartment open or PDF download and reused afterward. Row downloads call its shared controller without opening the detail dialog, reusing the list's loaded dataset and current colours. Its code is a normal local module import; this change does not promise a separate on-demand JavaScript download. Confirm published bundle behaviour separately before adding code splitting.

The card renders the selected apartment's drawings. It does not mount an invisible apartment list or request every apartment's thumbnails. The full plan, room legend, floor layout, status, price, inquiry, PDF, favourites and sharing remain in the shared view. Collapsed orbit information continues to omit the room list.

## Maintain and build

The editable source in this repository is authoritative for both Framer entry points:

- `src/shared/apartment-card/card-runtime.js` owns the detail markup, room interactions, loading, favourites, sharing and active PDF handlers.
- `src/shared/apartment-card/card.css` and `card-shell.html` own the detail and media presentation.
- `src/shared/apartment-card/pdf-export.js` owns the exported PDF. Keep the two PDF action functions in `card-pdf-actions.js` aligned with the active runtime; the canonical invariant test checks them together.
- `src/framer/OrbitApartmentCard.source.tsx` owns the React wrapper. Both `AdmiralHomepageTrial.source.tsx` and `AdmiralApartmentList.source.tsx` import the resulting shared component.
- `src/shared/apartment-list/app.js`, `styles.css` and `shell.html` own the list, filters, comparison and list media viewer. Apartment selection calls the shared card with the list's loaded dataset.

The apartment number belongs in the same metrics row as Beltér, Erkély and optional Kert. The price label is carried by the bottom illustration note as “Bruttó vételár.”. Change these shared sources when reviewing a design update; do not copy an older all-in-one list renderer.

The separate apartment-list authoring project remains a source for canonical apartment JSON. The data projection commands remain supported:

```text
node scripts/sync-orbit-apartments.mjs --source <canonical-apartments.json>
node scripts/sync-apartment-details.mjs --source <canonical-apartments.json>
node scripts/build.mjs
node --test tests/canonical-shared-card.test.mjs tests/shared-card-runtime.test.mjs tests/apartment-list-shared.test.mjs tests/homepage-trial.test.mjs
```

The build reads the maintained sources directly and regenerates the three paste-ready Framer files. Keep the shared file installed whenever updating either entry point. Update the source manifests when changing their listed source files.

`sync-apartment-card.mjs` and `sync-apartment-list.mjs` are retired. They fail without changing files because regenerating from an old list snapshot would overwrite the shared design and PDF export. `extract-apartment-card.mjs` is a read-only historical adapter utility for tests and in-memory comparisons; its command-line entry also refuses to write.

The private preview is a thin static adapter over the same shared runtime, CSS, shell and PDF renderer. In the private project, run `node scripts/sync-shared.mjs --canonical <public-checkout>` followed by `node scripts/build.mjs`. When that public checkout is available, the adapter checks the recorded source hashes and rejects stale snapshots. Make card changes in the canonical shared sources; do not edit a standalone preview card.

The retained `src/shared/apartment-card/app.js`, `styles.css` and `shell.html` are historical migration fixtures used by those adapter tests. Their hashes remain pinned under `historicalSnapshots` in `source.json`; they do not define the current card and the build never consumes them. The current source hashes are recorded separately under `canonicalSources`.

The former desktop studio experiment remains saved on the `orbit-apartment-studio` branch. Current development continues on `main`.

## Apartment search and type column

Keresés shares the primary filter row with Épület, Emelet, Szobák and Elérhetőség. It searches apartment IDs, accepts partial values and ignores case, spaces, hyphens and dots. Search combines with the other filters, survives URL reloads, has a removable filter chip, and clears with Alaphelyzet. Shared apartment links omit this search. Típus is its own table column, with a visible label on compact rows.

## Airy desktop list

The desktop list uses ten aligned comparison groups: Lakás (plan, apartment number, favourite, building and floor), Típus (type only), Szobák, Beltér, Terasz, Kert (positive area with its unit; blank if absent), Bruttó ár (full forint price), Elérhetőség (separate status column), Szintrajz, and three equal action pills. Building/floor sit beneath the apartment number rather than beneath the type letter. Large unboxed plans, restrained warm surfaces, Montserrat and generous row spacing establish the hierarchy. Column headings remain visible in the standard desktop layout, with an intentional grouped layout on narrower containers.

Search and selectors share the first filter band; the area/price sliders and Terasz/Kert/Kedvencek toggles share the second. Alaphelyzet appears when filters or sorting change. Apartment selection keeps the shared closeable card and returns to the same browsing state. Every row now has a gold Érdeklődöm pill, equal in size to Adatlap and Összevetés. It opens the configured Inquiry page with the apartment ID, preserving other URL parameters. Until that page is configured, it shows the coming-soon notice and optional apartment-data copy without opening the detail card. The row update only requires replacing AdmiralApartmentList.tsx. Existing Framer colour overrides are preserved.

Official availability references used to assess comparison structure and action placement: [Claremont Hall](https://www.claremonthall.com/availability), [The Vanderbilt Residences](https://www.thevanderbiltresidences.com/availability), and [Fouquet’s Residences Miami](https://www.fouquetsmiami.com/availability/).

Desktop filters now form an open header section. Its editable Filter header background reaches the component's top and both sides, with a subtle bottom boundary and no enclosing rounded border. The filter form is centered at a maximum width of 900px; the list retains its 1560px content cap and horizontal inset. In Framer, use width Fill and place the list component at the top of its page section to extend this surface to those edges. The existing compact mobile disclosure remains unchanged. This update only requires replacing AdmiralApartmentList.tsx.

The row action stack is ordered Adatlap, Összevetés, Érdeklődöm, with the gold enquiry pill last. Desktop Terasz rows show the area and unit without a repeated label. The list filter, comparison and copy-detail terminology also uses Terasz; internal terrace data keys and units remain unchanged. Availability has its own desktop column. Mobile retains its distinct status beside the apartment identity and labels its terrace metric for context.


## Live facts and drawing recovery

The homepage passes `liveDataset` to the shared card. The runtime overlays validated price, availability, area and other canonical facts on each selected detailed record; it does not replace room lists, plan geometry, apartment type or media. Updates patch facts in an open card without rebuilding its dialog, changing the selected tab or losing focus. PDF exports use those same current facts. The list continues reusing its loaded full dataset.

Both consumers accept `available`, `under_negotiation`, `reserved`, `sold` and `unknown`. Reserved uses the negotiation colour. The main drawing remains the existing source image. Its failure state now offers a drawing-only retry, and the hidden full Szintrajz source is not assigned until that tab is opened. A retry does not reload the apartment dataset or close the dialog.

The open filter header reserves 120px above its normal control padding for an overlay navbar. In Framer, adjust **Navbar space**; **Mobile navbar** controls the 88px default in list containers up to 760px wide. The header colour continues behind this empty area. Supply the actual navigation in Framer. This update only requires replacing AdmiralApartmentList.tsx; the shared detail card and both homepage variants remain compatible.
