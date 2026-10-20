# Shared apartment detail card in Framer

The homepage and apartment list import one local `AdmiralApartmentDetailCard` module. The card's presentation and interaction code lives in that module, so changing it changes both entry points. The orbit stays fullscreen on desktop and keeps its mobile apartment workspace.

## Install the three code files

Create or update these three Framer code files at the same folder level, using the exact names:

1. `AdmiralApartmentDetailCard.tsx` — create this shared file first. Paste the generated file from `src/framer/`. It is a dependency; do not add a separate instance to the canvas.
2. `AdmiralHomepageTrial.tsx` — replace the contents of the existing homepage file. Keep the current component instance and its sidebar settings.
3. `AdmiralApartmentList.tsx` — replace the contents of the existing list file. Keep the current list instance and sidebar settings.

Both entry files import `./AdmiralApartmentDetailCard`. If you deliberately place the shared file in another folder, update both import paths. An unresolved-import error means the shared file is missing or its name/path differs.

All code stays inside the Framer project. No GitHub script loader is involved. Code edits remain available to Framer's editor immediately. Publish the Framer project normally after reviewing the result.

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
