# Admiral Park homepage performance audit

19 November 2026 · Homepage draft 3 · SEQ_01 → SEQ_02 → SEQ_03 → orbit

The published page transferred **10.20 MB on desktop before the first gesture**. By then it had downloaded the opening film and the entire orbit. On a fast connection those downloads finished in the background. On a cold connection they could compete with the opening photograph. The third film had a different cost. During its descent, the component repeatedly measured and resized the page, then presented the orbit controls in a separate step.

The revised component gives the first picture priority, preserves the full orbit download, and moves the third film into its final window using a transform. A separate change splits apartment-mask and lighting work into short batches so that the browser can respond to input and paint between them.

## Measured visitor journey

These are cumulative wire transfers on the **published version before the changes**, including the HTML, application, fonts, media and HTTP overhead. The desktop run used Chrome at 1440 × 900. The phone run used Chrome touch emulation at 390 × 844 and 2× pixel density. Both had the browser cache disabled. A pause after each gesture allowed the next asset to preload. Visit timing, range requests and ordinary browser caching influence these totals.

| Visitor reaches | Desktop | Phone | What had loaded |
| --- | ---: | ---: | --- |
| Opening, after a 5.5 s idle wait | 10.20 MB | 10.04 MB | First poster and film, all 120 compressed orbit frames, page code and fonts. Zero orbit frames decoded. |
| SEQ_01 end and infographic | 12.59 MB | 12.43 MB | First end poster, infographic, apartment index and the next film. |
| SEQ_02 end | 12.87 MB | 12.71 MB | Second end poster. |
| At the orbit handoff | 15.41 MB | 15.25 MB | Third film and its matching checkpoint still. |
| Parked at checkpoint 0 | **16.52 MB** | **16.43 MB** | Eight compressed ID masks, the current camera’s two light renders and the default apartment’s small floor plan. |
| Open apartment A002’s detail card | — | **19.21 MB** | Another 2.79 MB, including the full floor plan and detail JSON. |

Opening the detailed floor plan was a larger single transfer than either SEQ_02 or SEQ_03. It was only requested after the visitor opened the card.

In a separate fresh desktop session with ordinary caching enabled, the public page transferred **15.85 MB** across 180 recorded requests through the first parked viewpoint. Video accounted for 7.05 MB and fetch requests for 7.11 MB, mostly orbit data. The 13 font requests totaled 649 kB and 15 script requests totaled 417 kB over that whole visit. SEQ_01 and SEQ_02 end posters were each transferred once and subsequently reused from cache in this run.

## What the media costs

Source sizes below use decimal kB and MB. The wire totals above also include headers, range transfers and repeated URLs. The individual rows below should only be added when they represent different files.

| Resource | Size | When and how it is used |
| --- | ---: | --- |
| SEQ_01 opening AVIF | 100.2 kB | Sharp first frame. The revision embeds a 256 px copy of the same frame, a 3,468-byte WebP before base64 encoding, directly in the component’s first paint. The full poster can refine it over 160 ms. |
| SEQ_01 MP4, end AVIF, infographic | 2.717 MB + 197.4 kB + 63.1 kB | First film is 4.04 s. The infographic source is a PNG. Framer served an AVIF response of about 24.6 kB in the desktop run. |
| SEQ_02 MP4 and end AVIF | 1.960 MB + 137.5 kB | The 3.00 s film preloads after the first approach. Its start uses the preceding endpoint. |
| SEQ_03 MP4 | 2.364 MB | The 4.04 s landing film ends on the orbit’s checkpoint-zero frame. |
| Complete orbit | **6.250 MB for 120 frames** | 119 movement AVIFs plus a 175.7 kB sharp frame at zero. That still also serves as the landing endpoint. Zero is the only dedicated sharp checkpoint in this configuration. |
| Eight checkpoint ID masks | 547.9 kB total | Compressed masks begin downloading at a selectable viewpoint. Only the current map must be decoded to pick an apartment. |
| Eight pairs of lighting renders | 2.168 MB across all eight views | Only the current camera’s pair is needed for its real window highlights. The first pair transferred about 270 kB. |
| Apartment data | About 4 kB on the wire, then 15.4 kB on card open | The summary JSON supports filters and selection. The detailed JSON is fetched for the detail card. |
| Floor plan, A002 example | 90.8 kB thumbnail, 2.65 MB original | The orbit showed a 318 × 360 WebP. The card loaded its 1500 × 2000 PNG. Sizes vary by apartment type. |
| Page infrastructure | About 417 kB of scripts | At opening, desktop also requested 12 font files totaling 620 kB. Phone requested six totaling 454 kB. |

## Why three parts felt uneven

**Cold opening.** The public page already pointed to the correct SEQ_01 AVIF, but the image was still undecoded at the DOM-ready checkpoint in a cold visit. The page background could show through that gap. The revision paints an inline image underneath the sharp poster and avoids resetting an unchanged poster URL. Direct links to the orbit keep their separate entry path.

**Loading while visitors read.** Previously, up to four orbit requests could begin while the opening media was still loading. The revised queue waits for the opening poster to settle and normally for the first film’s `canplay` event. Once the poster settles, a four-second fallback covers browsers that defer video loading until a gesture. Two low-priority requests download orbit frames in the background. The limit rises to four when the orbit starts preparing. A visitor can still download the entire orbit while reading. On a fast connection the eventual byte total can therefore be similar.

**SEQ_01 and SEQ_02.** The first film’s end poster is requested as playback begins. The infographic starts loading during the two-second end hold and retains its two-second reveal. The second film holds full framing throughout. When it settles, the player can prepare checkpoint zero and its neighbouring frames while the visitor pauses before the final scroll.

**SEQ_03 and the panels.** The revised landing measures the target window once and recalculates it on resize. A fixed-size media layer moves and scales inside a clip. The orbit interface starts a coordinated fade during the final third of the flight, and its controls activate when the handoff completes. Preparing the selected apartment’s thumbnail during the flight reduces the chance of an empty floor-plan panel becoming visible.

An intermediate build still showed a pause when Chrome first painted the panel. Two repeatable frame gaps of roughly 100–150 ms occurred about 2.86 s into SEQ_03. Hiding the panel in a diagnostic run removed those gaps. In the final build the browser paints the inert panels behind the stationary SEQ_02 ending. The reveal starts at 68% of SEQ_03, about 1.3 s before the film ends. Two subsequent desktop runs had no comparable gap at the reveal. Their largest animation-frame intervals during the flight were 42 and 33 ms. The panel still had a one-time paint cost during the preceding hold of roughly 0.2 s in those headless runs.

On an emulated phone, an immediate swipe could still leave a short pause before SEQ_03 advanced from time zero. The video then ran through the panel reveal without an interval above 34 ms at that point. Its largest interval during motion was 42 ms in that run.

One paired 1280 × 800 local Chrome run isolated the landing geometry change and measured the following over the landing interval. Browser “task time” is renderer work accumulated over that interval.

| Local landing measurement | Previous | Revised |
| --- | ---: | ---: |
| Layouts | 930 | 14 |
| Style recalculation time | 2.409 s | 0.109 s |
| Renderer task time | 3.061 s | 0.535 s |

One cold public desktop run reported **zero dropped video frames across all three films** (97, 72 and 97 frames). These films are approximately 24 fps. The layout work was measurable even with a clean video-decoder counter. Display refresh, device load and the camera motion captured in the original footage can still affect how smooth it looks.

## Orbit memory and responsiveness

The full orbit’s compressed frames occupy approximately **5.96 MiB** of retained image payload. At checkpoint zero, both public runs reported **31 movement frames and one sharp frame decoded**. A moving buffer keeps the current view and approximately one checkpoint in either direction. Native image decodes are limited to two at once.

| Estimated pixel storage at checkpoint 0 | Desktop | Phone |
| --- | ---: | ---: |
| 31 movement images, four bytes per pixel | 57.3 MiB at 960 × 505 | 25.5 MiB at 640 × 337 |
| One inspection image, four bytes per pixel | 7.4 MiB at 1920 × 1010 | 3.3 MiB at 1280 × 673 |
| Compact apartment ID maps | Up to 3.7 MiB for two | Up to 3.7 MiB for two |
| Actual stored lighting samples for camera 0 | 0.89 MiB | 0.22 MiB |

These estimates cover the named buffers. The browser also manages video decoder surfaces, temporary RGBA buffers, canvas backing stores, GPU textures and overhead. For example, the two temporary lighting RGBA arrays alone take about 14.8 MiB on desktop or 3.7 MiB on phone. The A002 detail PNG can add about 11.4 MiB of decoded pixels. Actual peak process memory requires measurement on the device.

**Checkpoint CPU work.** At 4× CPU slowdown in Chrome, a checkpoint-zero mask scan previously held the main thread for 63.4 ms. Its longest uninterrupted segment fell to **4.8 ms**. Desktop lighting went from 61.3 ms to **8.1 ms**. Lighting still took 65 ms in total in that run, with input and rendering opportunities between batches. Across all eight checkpoints, every ID, rectangle and packed lighting sample matched the previous result at both processing widths. Leaving a checkpoint during either pass discards partial work.

## What was exercised

- Withheld the sharp opening AVIF on desktop and an emulated phone. The first-frame preview appeared immediately. An early wheel or swipe started the first film while the sharp poster was still pending.
- Followed each scroll through the three real videos. SEQ_02 held its framing, SEQ_03 arrived at the authored desktop and phone window, and the orbit opened at frame zero. The final media and window bounds differed by less than one CSS pixel on both screens.
- Advanced to checkpoint 15 and returned to zero. Tested direct orbit entry and reduced motion, which bypassed the three video downloads. Clicking Home while the bars were appearing restored the opening and canceled the pending arrival.
- Compared all eight apartment masks and lighting results and exercised cancellation during processing. Chrome also passed the timer fallback used in browsers without the scheduler yield API.

## Next improvements, in priority order

1. **Serve a screen-sized detail floor plan.** A002 alone cost 2.65 MB to open. A crisp WebP or AVIF sized for the card could satisfy ordinary viewing while the original remains available for zoom and PDF. Verify thin walls and small labels before replacing the screen image.
2. **Audit Framer font assignments.** The opening desktop font transfers totaled six times the size of its first photograph. Check which weights and families the opening navigation and headline actually use, and measure again after consolidating duplicate roles.
3. **Measure the published revision under network throttling.** Record time to the opening photograph, first accepted gesture and pickable checkpoint on a repeatable mobile connection. Normal caching already reused the first two films’ end posters in the public desktop test. The most useful remaining comparison is how early the visitor can see and interact.
4. **Check real iOS Safari and the M3 MacBook Air.** Compare a cold visit on a constrained connection, a warm visit, fast repeated checkpoint changes and opening an apartment card. The phone numbers above are Chrome emulation. The rendering benchmarks are local Chrome measurements.

The published transfer figures are the baseline. The new scheduling, layout and mask timings were validated separately. A fresh published trace after rollout is needed to quantify the change in visitor download timing.

**Sources**

[Published homepage](https://admiralpark.hu/homepage-draft-3) · [Homepage component](https://github.com/UnbuiltMarket/admiral-park/blob/main/src/framer/homepage-draft-3/HERO_video_no_fullscreen.tsx) · [Versioned orbit assets](https://github.com/UnbuiltMarket/admiral-park/tree/6be37e13fbb610cc41e3aa37fe9a6b28df828afb/assets/orbit-v05)
