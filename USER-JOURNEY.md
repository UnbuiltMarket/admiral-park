# Native Framer content for the homepage journey

The camera journey has three content phases: **Balatonfüred → Aranyhíd sétány → the building**. The native Framer layers supply the logos, text, graphics and optional buttons. The code synchronises their visibility and short directional movements with the camera; it adds no story panel or background.

No project claims, finished copy or new logo artwork are included. Each checkpoint composition can combine the same brand logo with different text and a graphic. Eight viewpoints do not require eight different brand logos. A persistent brand logo can remain in the native navbar independently of this system.

## Set up the layers

1. Replace the whole existing Framer code file with the latest generated `src/framer/AdmiralHomepageTrial.tsx`. Keep the existing code component instance and choose overrides from this same file.
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

## Try the mobile framing

**Phone orbit → Turn during SEQ02** is the default phone experience. To retain the earlier upright, smaller image trial below, choose **Phone orbit → Inline portrait**.

### Automatic scene turn

SEQ_01 stays upright and fullscreen. The next scroll starts SEQ_02 directly. As its displayed frames advance, the scene gradually turns clockwise from 0° to 90°. The orbit ends as a fullscreen sideways landscape view. There is no rotation question, Continue button, portrait gate or document-level cover. The visitor can simply turn the phone to read the horizontal view naturally.

The turn follows the actually drawn SEQ_02 progress, including reversal. Loading holds the current image and angle together. Overview restores the upright opening scene. The scene grows during the turn to cover all screen corners, then finishes with its logical width and height swapped. Apartment details, trial controls and checkpoint stories follow the same orientation; their click and drag coordinates are adjusted to match.

If the visitor physically rotates the phone into landscape, the scene becomes upright within that landscape viewport. A brief guard freezes camera movement while the viewport settles and releases unfinished gestures, without showing a question or confirmation. The camera position and committed destination stay the same. Manual pause stays paused. A landscape-to-landscape turn is guarded the same way.

Keep the same component, assets, Orbit start frame and Phone orbit setting across Phone and Tablet breakpoints. Framer may switch breakpoint layouts when the phone turns. The code preserves its own scene across a short component handoff; the external navbar remains governed by its native Framer layout.

The phone keeps its existing decode and cache limits in either orientation. The automatic turn uses a fixed square canvas backing capped at 1280 × 1280 pixels (about 6.6 MB per canvas) instead of reallocating it on every frame. No new image sequence or video is downloaded for the turn.

For the trial, paste the updated component, select **Phone orbit → Turn during SEQ02**, and test on a physical phone. **Start trial → Orbit directly** checks the final sideways view; **Full journey** checks the gradual turn. **Trial controls → Off** gives the clean presentation. Use **Inline portrait** to compare with the earlier layout. Pushing GitHub does not publish the Framer page.

Replace the contents of the existing Framer code file with the updated **AdmiralHomepageTrial.tsx**. Keep the existing camera instance and native content overrides. No permanent loader is needed.

On the Phone breakpoint, keep the outer viewer at the full screen height. The code manages the image inside that fixed area:

| Framer control | Trial value | Effect |
| --- | ---: | --- |
| **Phone framing** | On | SEQ_01 stays fullscreen. SEQ_02 gradually opens into a landscape image, and the orbit keeps that framing. Applies to component widths of 767 px or less. |
| **Phone image width** | 80% | Shows at least 80% of the original landscape image width. Increase toward 100% to show more of each view. This is image coverage, not the component's CSS width. |
| **Phone image top** | 80 px | Leaves room above the parked image for the navbar. Adjust to the actual mobile header. |
| **Apartment details** | Sample | Shows the example strip below the image while testing the layout. Use Hover only when apartment picking is connected. |
| **Trial controls** | Off for content layout | Leaves the available phone space for the story and apartment strip. Enable temporarily when checking camera buttons. |

At a 390 px screen width, the default parked image is approximately 390 × 256 px. At 100% source coverage it becomes approximately 390 × 205 px. The outer viewer height does not change, so the transition does not move the page. On short screens the image height and top inset are constrained to leave room for the details.

Test **Start trial → Orbit directly** first to tune the phone layout. Then choose **Full journey** to inspect the fullscreen-to-landscape change during SEQ_02. The image framing follows the displayed frames, including reversal. Overview restores the fullscreen opening picture. Desktop framing stays as authored; turning Phone framing off restores the previous fullscreen phone layout.

The eight native OrbitView groups remain editable in Framer. On phones their overridden parent is positioned 20 px below the image and given the available height above the details and trial controls. Keep mobile text and graphics concise. If a group is taller than its available area, it can scroll without turning the camera. On desktop the original native placement is restored. Framer design-canvas overrides do not run; use Preview to check this final placement.

The existing AVIF files and bounded decode buffers are reused. The canvas backing allocation stays fixed throughout SEQ_02 rather than resizing every frame. The future apartment-mask picker must use this same displayed image rectangle when mapping a phone tap to source-image coordinates. Actual apartment tap selection is not part of this layout trial.

## Preview one composition without changing live entry

Choose **Editor view → Orbit**, then use **Editor orbit view** to select **Entry camera** or one of the eight camera views. Entry previews the configured Orbit start frame. A numbered choice previews that background camera on the editor canvas, so its native text and graphics can be composed against the correct image.

Framer activates code overrides in Preview and on the published page, rather than on the design canvas ([official override documentation](https://www.framer.com/developers/overrides-introduction)). The editor camera selector does not automatically isolate the matching native content group. While composing, temporarily hide the other content groups in Layers. Restore **Visible = Yes** and **opacity = 100%** for every story group before Preview or publishing; the overrides then control which group is visible.

This editor choice does not change the published journey's **Orbit start frame**, which remains 45 unless changed separately. To test real movement, use Framer Preview or the published page. **Start trial → Orbit directly** is useful while tuning the building compositions; **Full journey** checks the complete Balatonfüred and Aranyhíd approach.

## Keep the building usable

Place each composition in the open space of its particular camera view. Keep the facade, future apartment hover areas and bottom apartment-details strip clear. Give the native Frame sensible content-sized bounds. The viewer continues to receive wheel and drag input through ordinary empty overlay areas.

Use native button and link children for any CTA so genuine controls retain their normal click, tap and keyboard behaviour. Avoid marking an entire decorative composition as a button or link. The override disables hidden and departing groups so their invisible children cannot remain interactive.

While composing the building story, **Apartment details → Off** hides the sample apartment strip. Turn it back on to check spacing once the story is placed. The final hover strip and the checkpoint story describe different things: the checkpoint composition describes the building; apartment data appears only for the selected apartment when picking is connected.

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

Camera 8 may contain a native **Lakások megtekintése** button linked to the actual apartment-selection page through Framer's Link setting. No destination URL is assumed, and the future facade-mask picker is not activated by this setup.
