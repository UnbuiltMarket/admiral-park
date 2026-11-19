# OrbitView compatibility audit

The production tour was tested both from its opening film and from its direct entry. Chrome completed both routes. In Windows WebKit the three-film journey reached the handoff, but the camera never became interactive. All 120 images had downloaded. The same browser could read the PNG picking mask but could not decode either the sharp AVIF or a movement AVIF through either available image API. The developer’s Mac was not available for testing, so its specific failure remains unconfirmed. [Tour](https://admiralpark.hu/homepage-draft-3) · [Direct orbit entry](https://admiralpark.hu/homepage-draft-3#orbit)

## Findings and fixes

| Finding | Evidence | Draft behavior |
| --- | --- | --- |
| An unavailable AVIF decoder blocked the entire orbit. | The movement file and checkpoint returned HTTP 200. Both native image decoding and bitmap creation failed in WebKit. | A small embedded image tests the decoder once. A matching WebP sequence, checkpoint, posters and lighting serve browsers that fail that test. Both paths use the same lossless picking masks. |
| One missing file anywhere in the ring could block the first view or a fully loaded turn. | Returning HTTP 503 for frame 60 left entry stuck at 119 of 120 files. | The starting view opens when its own frame is ready. Each turn waits for the frames along that turn. The full orbit continues downloading in the background. Temporary network failures get one automatic retry. |
| The detail bar could intercept the Retry button. | A browser click on the old button hit the bar after an essential frame failed. | A single recovery button sits over the camera. Click tests recovered from failures at the starting checkpoint and within a turn. |
| Escape could silently pause the orbit, including when closing an apartment card. | Subsequent wheel and arrow input left the camera parked with no visible Resume action. | Escape can manually pause only where the playback toggle is available. Closing a card returns control to the camera. |
| Releasing a desktop drag could discard its final movement. | Releasing just past the midpoint in the same display frame settled at frame 0 instead of 15. | The player applies the final available pose before choosing the closest checkpoint. High-frequency wheel input also avoids unnecessary style reads for controls outside the pointer position. |
| An interrupted approach film could make scrolling appear unresponsive. | With playback rejected for SEQ_02, a fresh scroll did nothing. Its recovery buttons offered Retry and a return to the opening. | A new scroll, swipe or forward-navigation key can resume an interrupted film. If playback continues to fail, visitors can skip that film and proceed. |

## What was verified

- **Published baseline.** The tour’s direct link and full journey worked in desktop Chrome at a 1470 × 850 CSS-pixel viewport and 2× display scale. Wheel, horizontal and vertical trackpad-like input, keyboard and click-drag were exercised. The WebKit failure reproduced on both routes.
- **Updated component.** Desktop Chrome and emulated phone Chrome selected AVIF. Windows WebKit selected WebP automatically. Each selected the full set of 120 frames. Direct entry skipped the approach videos. Selecting apartment B105 on the façade opened its matching detail card. Closing the card and turning to another checkpoint worked. The full journeys were also exercised with the three original films.
- **Fault tests.** The orbit stayed usable on unaffected arcs with a distant 503 or a missing frame on the opposite arc. A temporarily failed starting image recovered on retry. A persistent failure in the current arc exposed a clickable retry. A rejected SEQ_02 could be skipped, and scrolling restarted SEQ_03 once playback became available.
- **Transfer and memory.** The default movement assets, including the sharp first checkpoint, total 6.25 MB in AVIF or 14.38 MB in WebP. A browser downloads one movement format. With the current eight-checkpoint settings, the ordinary decoded window is 31 movement frames plus an optional sharp inspection image. Lighting and masks load separately.

## Two details for reproducing a Mac report

The public root opens a separate landing/contact page. On the published desktop navbar, Home and 3D kereső lead to the current tour, while the logo links to the older homepage draft. The direct orbit link above isolates the picker.

Desktop drag deliberately caps rotation speed and settles at the nearest visible checkpoint. In one Chrome run a quick 213 px drag moved two frames and settled back, while a longer, slower drag moved through two checkpoints. The cap and the 1.2-second single-checkpoint scroll timing are preserved. A hardware-specific follow-up should record the exact URL, browser version, whether the building appears, and whether the on-screen arrows work.
