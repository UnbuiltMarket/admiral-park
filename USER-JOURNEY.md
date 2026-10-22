# Native Framer content for the homepage journey

The camera journey has three content phases: **Balatonfüred → Aranyhíd sétány → the building**. The native Framer layers supply the logos, text, graphics and optional buttons. The code synchronises their visibility and short directional movements with the camera; it adds no story panel or background.

No project claims, finished copy or new logo artwork are included. Each checkpoint composition can combine the same brand logo with different text and a graphic. Eight viewpoints do not require eight different brand logos. A persistent brand logo can remain in the native navbar independently of this system.

## Set up the layers

1. First install the local `AdmiralApartmentDetailCard.tsx` dependency using [the shared-card setup](FRAMER-SHARED-CARD.md). Replace the existing homepage file with the latest generated `src/framer/AdmiralHomepageTrial.tsx`. Keep the existing code component instance and choose overrides from this same homepage file.
2. Use one Relative parent Frame, sized to the viewport with height **100vh**. The camera component fills this parent. Put the content groups above it as siblings, rather than inside the code component. Keep the navbar above the viewer as native Framer content.
3. Create a native Frame for the opening composition and apply **BalatonfuredContent**. The existing **OpeningContent** name still works for this same phase.
4. Create a native Frame for the Aranyhíd sétány composition and apply **AranyhidContent**. The existing **BuildingContent** name still works. A separately timed native CTA can keep **ArrivalCTA**.
5. Create eight native Frames for the eight building compositions. Apply **OrbitView1**, **OrbitView2**, through **OrbitView8** to their corresponding parent Frames.
6. Put each composition's native text, logo, SVG or other graphic, and any optional button inside its overridden Frame. Position that Frame absolutely in Framer, set its responsive width and padding, and edit the content normally.
7. Preview the whole journey, then publish from Framer when the composition is ready. Saving or pushing the repository does not publish the Framer page.

Example layer structure:

```text
Viewport — Relative, 100vh
  Camera component — fills viewport
  Balatonfüred group — BalatonfuredContent
  Aranyhíd sétány group — AranyhidContent
  View 1 group — OrbitView1
  View 2 group — OrbitView2
  …
  View 8 group — OrbitView8
Navbar — native Framer navigation above the viewer
```

Apply one journey override to each composition's parent. Its children move and fade as a group. Do not put an additional Framer Appear effect or opacity transition on that same overridden parent: both effects would try to control its visibility. Animate a child separately if a second decorative motion is needed.

## Match each composition to its camera

Keep **Viewpoints = 8**. The eight story groups are attached to the fixed physical cameras, rather than to the order in which a visitor first encounters them.

| Override | Orbit frame | Physical camera |
| --- | ---: | ---: |
| OrbitView1 | 0 | 1 |
| OrbitView2 | 15 | 2 |
| OrbitView3 | 30 | 3 |
| OrbitView4 | 45 | 4 |
| OrbitView5 | 60 | 5 |
| OrbitView6 | 75 | 6 |
| OrbitView7 | 90 | 7 |
| OrbitView8 | 105 | 8 |

The connected journey enters the orbit at frame **45**, so the first building composition is **OrbitView4**. Forward rotation then shows **4 → 5 → 6 → 7 → 8 → 1 → 2 → 3** before repeating. Backward rotation follows the same physical mapping in reverse. The story mapping is disabled if Viewpoints is changed from eight, avoiding text being shown against the wrong view.

A custom **Orbit start frame** such as 42 remains an exact parked image, but has no checkpoint story. Its first forward movement arrives at frame 45 and can show OrbitView4; its first backward movement arrives at frame 30 and can show OrbitView3.

## What appears during each segment

The Balatonfüred composition belongs to the opening panorama and fades during SEQ_01 according to the existing opening controls. The Aranyhíd sétány composition arrives toward the end of SEQ_01 and is fully readable on its final still. The visitor can read it before a fresh downward gesture starts SEQ_02.

Aranyhíd content and the arrival CTA retain their **0.5-second departure fade** as SEQ_02 begins. Their interaction is disabled immediately. There is no additional copy stage in the middle of SEQ_02. The matching camera sequence leads directly to the parked orbit view.

An orbit story appears only when its exact checkpoint has been reached. The camera stops, waits **0.12 seconds**, then the composition fades and moves into place over **0.6 seconds**. When the next camera command is accepted, it fades toward its selected exit direction over **0.3 seconds**, including while the next route is buffering. Buttons stop accepting input immediately when departure begins. Download and decode updates do not restart either animation.

Orbit stories stay hidden during loading, movement, a paused transition, custom parked frames and Overview. Returning to a valid checkpoint can reveal its composition again. Reduced-motion visitors receive immediate visibility changes without the extra directional animation.

## Motion controls

These controls belong to the camera component's Framer sidebar; the content and its screen position remain editable on the native Frames.

| Framer control | Default | Effect |
| --- | ---: | --- |
| **Orbit stories** | On | Enables the eight checkpoint compositions. |
| **Story enter** | 0.6 s | Shared time for a checkpoint composition to appear. |
| **Story exit** | 0.3 s | Shared time for a checkpoint composition to leave. |
| **Story delay** | 0.12 s | Short wait after the camera parks, before the composition appears. |
| **View 1 motion** … **View 8 motion** | One object per camera | Sets the selected camera's **Enter from**, **Exit to** and **Distance**. |
| **Enter from** | Bottom | Edge from which that composition enters: left, right, top, bottom or none. |
| **Exit to** | Bottom | Edge toward which that composition leaves: left, right, top, bottom or none. |
| **Distance** | 24 px | Short offset from the native Frame's normal Framer position. |

The entrance and exit directions are independent. For a composition on the left, entering from the left can complement the open space in that view; another camera may work better with a composition on the right or near the top. Choose these against the actual image. Selecting **Fade only** keeps the fade and removes the directional movement. Motion settings can be adjusted without resetting the camera journey.

The animation uses a separate translation, preserving the group's Framer position and layout on desktop. With **Phone framing** enabled, mobile orbit stories are placed below the image and above the apartment details. Long compositions can scroll inside that area.

## Mobile apartment overview and horizontal viewer

Keep **Orbit layout → Mobile** for the default split: desktop stays fullscreen, while phones receive the light apartment workspace. The outer viewer stays fixed and the workspace occupies its lower 90%, leaving the header space above. Keep the Framer component at the full available screen height; use **Trial controls → Off** for the finished composition.

The portrait phone orbit is edge-to-edge at **100% of the component width**, with the complete **1920 × 1010** image and its natural height: approximately **320 × 168 px** or **390 × 205 px**. SEQ_02 arrives at that same image rectangle. The workspace fits without scrolling: a large centred Admiral Park logo, one slim filter row, the orbit, then a floorplan on the left and apartment facts on the right. Price and **Adatlap** sit at the bottom. The mobile overview omits the redundant floorplan heading, the word beside the apartment ID and the gross-price caption. The drawing remains illustrative; the shared detail card contains its full notes and room list. Short portrait screens tighten spacing; short landscape screens retain a useful two-column image/detail layout.

The small **expand icon** (accessible name: **Teljes képernyő**) opens a horizontal orbit viewer. Its visible circle is 32 px with a 44 px touch target. In portrait the scene and its controls rotate together; in landscape the scene uses the normal horizontal screen. It never automatically asks for or locks the phone orientation. Physical rotation preserves the same camera and selected apartment. The X or Escape returns to the compact workspace. The tap now also requests true browser fullscreen, with `navigationUI: "hide"`, on browsers that allow it. When the Fullscreen API is unavailable, rejected or restricted by an embedded preview, the same horizontal viewer fills the webpage viewport instead. Browser and phone support controls whether the address/navigation bars can disappear ([Fullscreen API documentation](https://developer.mozilla.org/en-US/docs/Web/API/Element/requestFullscreen)). Test the published page as well as Framer Preview. The X leaves both the horizontal viewer and its owned browser fullscreen; the browser's own fullscreen exit also restores the compact workspace.

The fullscreen viewer reuses the same canvas, player, downloaded AVIF bytes and bounded decoded window. It presents a centred white logo, a fading dark bottom gradient, a centred floorplan thumbnail and a horizontal apartment-data bar. Camera arrows are available as an alternative to dragging. True fullscreen promotes the whole homepage root, keeping the shared card's shadow-host dialogs inside it. When native fullscreen is unavailable, a manual popover places the horizontal viewer above Framer's clipping and navigation layers, with a fixed-position fallback elsewhere. Opening the shared detail card pauses that same player; closing it returns to the same fullscreen camera.

On a phone, tapping an apartment in a parked view highlights it and updates its facts without immediately opening a card. **Adatlap** or the floorplan then opens **AdmiralApartmentDetailCard.tsx**, exactly as the apartment list does. Desktop hover updates the bottom strip; clicking the apartment opens that shared card directly. The mobile preview defaults to **A001**, without a visitor-facing apartment dropdown. If filters exclude the preview, the first matching real apartment supplies the preview details. With no matches the panel shows an empty-result message.

### Apartment masks and filters

The eight PNG masks in `assets/images/Mask full size 1920` correspond to orbit frames **0, 15, 30, 45, 60, 75, 90 and 105**. Picking uses the same crop, focal point and fullscreen rotation as the beauty sequence. It is disabled during movement, camera buffering, shared-card dialogs and non-checkpoint views. Dragging turns the building without opening an apartment. Empty background and ambiguous edge pixels never select a guessed apartment.

**Apartment masks** in the Framer sidebar enables picking. **Highlight colour** and **Highlight opacity** control the subtle fill and edge. This uses the apartment silhouette, not a separate all-lights-on render. A custom **Mask folder** is available when GitHub assets are disabled. Keep eight checkpoints with these masks; a different camera layout requires matching masks.

The exported PNGs are lossless RGB16 and their gamma-encoded colours differ from the source 3ds Max object colours. `data/orbit-mask-views.json` preserves the canonical apartment IDs, source colours, audited native/rendered colours and file hashes. The build validates every mask pixel against that manifest and the canonical colour ledger before embedding the lookup. Explicit aliases cover the measured 16-to-8-bit quantization methods; the picker never uses nearest-colour matching. Changing a mask requires revalidating its calibration before rebuilding.

All eight compressed masks total **190,249 bytes**. They download with two requests at a time once the orbit is active. At most two one-byte-per-pixel ID maps remain decoded (about **3.7 MiB** together), and the overlay backing is capped at the native 1920 × 1010 pixel budget. Picking reads the compact CPU map, without a canvas readback on every pointer move. Fullscreen reuses these same downloads and maps. Failed masks leave the building usable and offer **Lakáskijelölés újratöltése**; they cannot select the wrong apartment as a fallback.

Overview floorplans prefer the existing `thumb.webp` files, which are already cropped. The apartment text updates immediately; a drawing URL must remain selected for **160 ms** before its request starts. The previous apartment's drawing hides during the change. Loaded thumbnail URLs are reused. Enlarging a drawing or opening the shared card still loads the full-quality asset on demand.

- The status buttons are independent choices: **Szabad**, **Egyeztetés alatt** and **Eladva** combine with OR. Clicking a status highlights every matching apartment visible at the current camera. Clicking it again removes that choice. No selected status means any status; when no price filter is active, only the hovered/tapped apartment is highlighted.
- **Ár** opens a two-handle price slider above the filter row, temporarily covering the logo without resizing the orbit. Price limits combine with the status choices using AND. The range is calculated from all known HUF prices, not only the currently selected statuses, in one-million-forint steps.
- Unknown prices remain eligible for status-only filtering. An active price limit excludes them. Returning both handles to the full range removes the price restriction; the reset icon clears all criteria.
- With no active criteria, the preview record alone never creates a highlight: only a valid hovered/tapped apartment is highlighted. Active criteria request highlights for every matching ID. Nonmatching apartments cannot update selection or open a detail card. Highlights are empty during camera movement and return at a checkpoint; filter criteria survive camera moves and fullscreen entry/exit.

On mobile, these controls remain in the slim row above the orbit. The desktop fullscreen layout has the same controls in a compact white row above the apartment-information strip; trial navigation moves above it. The desktop apartment-studio layout places them beneath its header. The selected filters also carry into the mobile horizontal viewer. Controls are protected from orbit wheel/drag input, and status-button clicks are relayed through passive Framer overlay frames without intercepting real links or buttons placed above them.

The mask layer reads the scoped homepage attributes `data-orbit-filter-active`, `data-orbit-filter-criteria`, `data-orbit-filter-matches` and `data-orbit-highlight-ids` and subscribes to **admiral:orbit-filter-change** on that same homepage root. Each event contains `version: 1`, `criteriaActive`, `statuses`, `priceMin`, `priceMax`, `matchedIds`, `highlightIds`, `hoveredApartmentId`, `checkpoint` and `moving`. IDs refer to the canonical JSON apartments and their persisted mask colours. `matchedIds` covers the dataset; each checkpoint mask limits the drawn highlights to visible apartments. The layer draws only `highlightIds` and accepts picking only from `matchedIds`. **admiral:apartment-hover** with `{id: null}` clears a pointer highlight.

Replace the existing Framer homepage file with the latest **AdmiralHomepageTrial.tsx** and keep **AdmiralApartmentDetailCard.tsx** beside it. No shared-card or list replacement is needed for this mobile update. The original fullscreen SEQ_01 and SEQ_02 journey remains; SEQ_02 still reframes toward the mobile orbit slot. The classic layout's **Phone image width**, **Phone image top** and **Phone framing** controls remain available when choosing that layout.

## Preview one composition without changing live entry

Choose **Editor view → Orbit**, then use **Editor orbit view** to select **Entry camera** or one of the eight camera views. Entry previews the configured Orbit start frame. A numbered choice previews that background camera on the editor canvas, so its native text and graphics can be composed against the correct image.

Framer activates code overrides in Preview and on the published page, rather than on the design canvas ([official override documentation](https://www.framer.com/developers/overrides-introduction)). The editor camera selector does not automatically isolate the matching native content group. While composing, temporarily hide the other content groups in Layers. Restore **Visible = Yes** and **opacity = 100%** for every story group before Preview or publishing; the overrides then control which group is visible.

This editor choice does not change the published journey's **Orbit start frame**, which remains 45 unless changed separately. To test real movement, use Framer Preview or the published page. **Start trial → Orbit directly** is useful while tuning the building compositions; **Full journey** checks the complete Balatonfüred and Aranyhíd approach.

## Keep the building usable

Place each composition in the open space of its particular camera view. Keep the facade, apartment picking areas and bottom apartment-details strip clear. Give the native Frame sensible content-sized bounds. The viewer continues to receive wheel and drag input through ordinary empty overlay areas.

Use native button and link children for any CTA so genuine controls retain their normal click, tap and keyboard behaviour. Avoid marking an entire decorative composition as a button or link. The override disables hidden and departing groups so their invisible children cannot remain interactive.

While composing the building story, **Apartment details → Off** hides the apartment strip and disables picking. Turn it back on to check spacing once the story is placed. The hover strip and the checkpoint story describe different things: the checkpoint composition describes the building; apartment data describes the hovered or tapped apartment.

Start with a short heading, a brief supporting text and one graphic per view, adding a CTA only where it helps the next action. Check both desktop and mobile compositions in Framer. The eight subjects, finished wording and project facts come from your native Framer content.
## Agreed content map

| Camera | Content | Override |
| --- | --- | --- |
| 1 | Közösségi kert | OrbitView1 |
| 2 | Saját kertek | OrbitView2 |
| 3 | 69 otthon | OrbitView3 |
| 4 | Közösségi terek | OrbitView4 |
| 5 | Szerkezet és szigetelés | OrbitView5 |
| 6 | A tervező víziója | OrbitView6 |
| 7 | Sarokteraszok — a nappali folytatása | OrbitView7 |
| 8 | Lakásválasztás | OrbitView8 |

Camera 8 may contain a native **Lakások megtekintése** button linked to the apartment-list page through Framer's Link setting. The facade picker also works at every other parked checkpoint with visible apartments.
