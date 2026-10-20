# Orbit apartment studio

The homepage keeps the cinematic **SEQ01 → SEQ02 → ORBIT** journey. The default **Apartment studio** orbit layout adds a light background and apartment information projected from the apartment detail pages' canonical JSON. It does not change or publish the Framer page automatically.

## Framer setup

1. Replace the entire contents of the existing Framer code file with the generated `src/framer/AdmiralHomepageTrial.tsx`. Keep the same component instance.
2. Keep the outer component and its Relative parent at **100vh**, filling the viewport. The studio occupies the lower **90% of that component**, leaving a header reserve above. Do not reduce the component itself to 90vh.
3. Use **Orbit layout → Apartment studio** and **Apartment details → Preview** while the picking masks are unfinished. The preview selector chooses a real apartment from the JSON; it does not generate example apartment facts.
4. Keep the default apartment JSON and media base URLs when using the supplied GitHub assets. The JSON is `data/apartments.json`; the media base is `assets/apartment-list/`. Asset paths in the JSON are resolved against this media base.
5. Set the apartment details page and, when available, the inquiry page URL. Links add `?apartment=<ID>` while preserving other query parameters. The default details destination is `/lista`. An inquiry action appears only when an inquiry URL is configured; otherwise the main action opens the actual apartment details page.
6. Keep **Trial controls → Off** for reviewing the composition. Use Framer Preview to check desktop and phone layouts. Repository changes still require pasting the updated generated component into Framer.

Desktop places the orbit beside a large floorplan. Apartment identity and availability sit above the image; area values and further facts sit below. Phone layouts keep the orbit full width, with a separately scrollable drawing and detail region below. The floorplan remains at least 280px high instead of shrinking into a thumbnail; **Nagyítás** opens a larger drawing with zoom and drag controls. On short phones, scroll the information region to reach its remaining actions.

On short landscape screens, the orbit stays in the left column while the drawing and facts scroll independently in the right column. This follows the browser's natural orientation without rotating the interface or requesting an orientation lock.

The interface includes interior, terrace and garden area, building, floor, type, orientation, room count, gross price, availability, drawings and available PDF links. It intentionally includes no individual room list or room markers. **Alaprajz / Szintrajz** tabs use the drawing files available for the selected apartment. Existing crop metadata removes unused white margins without changing the source image. Missing values are shown as unavailable; prices are never inferred.

## Keep the two apartment views in sync

The canonical source remains the apartment-list project's apartment JSON. Refresh the public orbit projection from that source after apartment facts change:

```text
node scripts/sync-orbit-apartments.mjs --source <canonical-apartments.json>
```

The script validates the current 69 apartments and ten confirmed type plans, writes `data/apartments.json`, and leaves the canonical source untouched. It copies public facts, drawing paths and crop metadata. The orbit projection excludes room lists, room markers, source provenance and other unused source information. Update the shared public media files when a plan or PDF changes, then rebuild the standalone Framer component before copying a code update.

The browser loads the apartment JSON once and requests the selected plan, rather than downloading every apartment drawing. Matching apartment types can share one cached plan. The floorplan expansion uses that same selected image.

## Future picking masks

The masks are not implemented by this studio. While testing, the preview selector provides the selected apartment ID. A future picking implementation can send the same ID on the camera component root:

```js
root.dispatchEvent(new CustomEvent("admiral:apartment-hover", {
    detail: { id: "A101" }
}))
```

The ID must match an apartment in the loaded JSON. The event is accepted only while the orbit is settled at a checkpoint. Facts and drawings are looked up from the JSON; the mask does not provide its own price, areas or availability. The last selected apartment stays visible while visitors move from the building to the drawing or actions. In **Hover** mode the preview selector is hidden; leave **Preview** selected until a real picking implementation exists.

## Classic fallback

Choose **Classic** for the previous orbit presentation and compact details strip. **Apartment details → Off** also disables the apartment studio. This provides a comparison without removing or changing the underlying sequence assets.
