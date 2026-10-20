# Orbit apartment studio

The homepage keeps the cinematic **SEQ01 → SEQ02 → ORBIT** journey. The default **Fullscreen desktop** layout keeps the desktop orbit fullscreen and uses the light apartment workspace on phones. Apartment information is projected from the apartment detail pages' canonical JSON. It does not change or publish the Framer page automatically.

The complete desktop studio experiment is preserved on the GitHub branch [`orbit-apartment-studio`](https://github.com/UnbuiltMarket/admiral-park/tree/orbit-apartment-studio), at commit `a5d4cc4eeceae0abd50e0ea4c282589e56baf6ff`. Work continues on `main` with fullscreen desktop. **Orbit layout → Apartment studio** still previews the alternative on all screen sizes.

## Framer setup

1. Follow [the three-file shared-card setup](FRAMER-SHARED-CARD.md): create `AdmiralApartmentDetailCard.tsx`, then update the existing `AdmiralHomepageTrial.tsx` and `AdmiralApartmentList.tsx` files. Keep the same homepage and list component instances.
2. Keep the outer component and its Relative parent at **100vh**, filling the viewport. The studio occupies the lower **90% of that component**, leaving a header reserve above. Do not reduce the component itself to 90vh.
3. Use **Orbit layout → Fullscreen desktop** and **Apartment details → Preview** while the picking masks are unfinished. Existing component instances may retain the previous **Apartment studio** choice after pasting; change it explicitly. The desktop white detail strip and phone workspace use the same real JSON apartment. Choose it with **Preview apartment** in the sidebar, or with the phone preview selector.
4. Keep the default apartment JSON and media base URLs when using the supplied GitHub assets. The JSON is `data/apartments.json`; the media base is `assets/apartment-list/`. Asset paths in the JSON are resolved against this media base.
5. Set the apartment details page for shared links and, when available, the inquiry page URL. Links add `?apartment=<ID>` while preserving other query parameters. The default shared-link destination is `/lista`. The workspace's details action opens the shared card over the orbit. If an inquiry URL is configured, its main inquiry action remains a real link and a separate details action opens the card.
6. Keep **Trial controls → Off** for reviewing the composition. Use Framer Preview to check desktop and phone layouts. Repository changes still require pasting the updated generated component into Framer.

Desktop places the orbit beside a large floorplan. Apartment identity and availability sit above the image; area values and further facts sit below. Phone layouts keep the orbit full width, with a separately scrollable drawing and detail region below. The floorplan remains at least 280px high instead of shrinking into a thumbnail; **Nagyítás** opens a larger drawing with zoom and drag controls. On short phones, scroll the information region to reach its remaining actions.

On phones held sideways, the orbit stays in the left column while the drawing and facts scroll independently in the right column. A coarse-pointer phone remains in its mobile workspace through rotation. Resizing between desktop and phone layouts redraws the existing player without resetting the checkpoint or selected apartment. This follows the browser's natural orientation without rotating the interface or requesting an orientation lock.

The interface includes interior, terrace and garden area, building, floor, type, orientation, room count, gross price, availability, drawings and available PDF links. It intentionally includes no individual room list or room markers. **Alaprajz / Szintrajz** tabs use the drawing files available for the selected apartment. Existing crop metadata removes unused white margins without changing the source image. Missing values are shown as unavailable; prices are never inferred.

## Keep the two apartment views in sync

The canonical source remains the apartment-list project's apartment JSON. Refresh the public orbit projection from that source after apartment facts change:

```text
node scripts/sync-orbit-apartments.mjs --source <canonical-apartments.json>
```

The script validates the current 69 apartments and ten confirmed type plans, writes `data/apartments.json`, and leaves the canonical source untouched. It copies public facts, drawing paths and crop metadata. The orbit projection excludes room lists, room markers, source provenance and other unused source information. Update the shared public media files when a plan or PDF changes, then rebuild the standalone Framer component before copying a code update.

The browser loads the apartment JSON once and requests the selected plan, rather than downloading every apartment drawing. Matching apartment types can share one cached plan. The floorplan expansion uses that same selected image.

## Open the list-view apartment card

Selecting an apartment opens the same native detail card used by `AdmiralApartmentList`: the full logo, large numbered floorplan, room legend, floor layout, status, price, inquiry button, PDF, favourites and sharing. Both entry points import the local `AdmiralApartmentDetailCard.tsx` file; the card is no longer copied inside the homepage or list. Its source is kept in `src/shared/apartment-card/`. No remote script loader or iframe is needed.

Until the picking masks exist, open the selected unit with the floorplan thumbnail in the desktop white strip, **Lakás részletei** in the phone workspace, or **Open apartment details** in the trial controls. The card overlays the current homepage. Closing it restores the same camera and selected apartment; card interactions suspend orbit navigation.

**Detail card JSON** defaults to `data/apartment-details.json`. Its 69 records include the public room lists and plan markers needed by the full card. This larger dataset and the card's selected drawing are fetched on demand after the first click. The compact orbit data remains separate and small. No list rows or all-apartment thumbnails are loaded behind the card.

Refresh the card data and shared presentation after changes in the apartment-list project:

```text
node scripts/sync-apartment-details.mjs --source <canonical-apartments.json>
node scripts/sync-apartment-card.mjs --source <apartment-list-project-folder>
node scripts/sync-apartment-list.mjs --source <apartment-list-project-folder>
node scripts/build.mjs
```

The presentation sync records hashes and checks its adapter anchors. If the other project's source changes substantially, it stops for a code review instead of silently generating a different card. It never edits the apartment-list project. The **Details page** setting provides share-link destinations; clicking a unit opens the local card without navigating to that page.

## Future picking masks

The masks are not implemented by this studio. While testing, the preview selector provides the selected apartment ID. A future picking implementation can send the same ID on the camera component root:

```js
root.dispatchEvent(new CustomEvent("admiral:apartment-hover", {
    detail: { id: "A101" }
}))
```

The picking implementation opens that apartment's full card with the corresponding click event:

```js
root.dispatchEvent(new CustomEvent("admiral:apartment-click", {
    detail: { id: "A101" }
}))
```

The ID must match an apartment in the loaded JSON. The event is accepted only while the orbit is settled at a checkpoint. Facts and drawings are looked up from the JSON; the mask does not provide its own price, areas or availability. The last selected apartment stays visible while visitors move from the building to the drawing or actions. In **Hover** mode the preview selector is hidden; leave **Preview** selected until a real picking implementation exists.

## Classic fallback

Choose **Classic** for the previous orbit presentation and compact details strip. **Apartment details → Off** also disables the apartment studio. This provides a comparison without removing or changing the underlying sequence assets.
