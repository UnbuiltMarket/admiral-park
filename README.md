# Shared apartment list and orbit detail card

The homepage and apartment list share one local `AdmiralApartmentDetailCard.tsx` in Framer. Install it alongside `AdmiralHomepageTrial.tsx` and `AdmiralApartmentList.tsx`; see [the shared-card guide](FRAMER-SHARED-CARD.md) for installation, PDF export and maintenance.

Edit the canonical `src/shared/apartment-card/card-runtime.js`, `card.css`, `card-shell.html` and `pdf-export.js`, plus `src/framer/OrbitApartmentCard.source.tsx`, then build the paste-ready files. The list-only source lives in `src/shared/apartment-list/`. Both old presentation sync commands are retired and fail without changing files. Historical snapshot files are test fixtures, not current design sources.

# Current installation: paste the standalone component

Use **src/framer/AdmiralHeroSequence.tsx** for immediate copy-and-paste updates in Framer. Keep the existing code file and component instance to retain the native controls and overrides. The normal build generates the standalone component only. The optional hosted loader below is not installed on the site and remains on its previous release.

# Optional automatic updates from GitHub — inactive workflow

Paste **src/framer/AdmiralHeroLoader.tsx** into your existing AdmiralHeroSequence code file in Framer once, save, and publish. Keep the same code file and existing component instance so your settings and the OpeningContent, BuildingContent and ArrivalCTA overrides stay connected. This permanent bridge checks the published runtime at `https://unbuiltmarket.github.io/admiral-park/hero-manifest.json` once per page visit. Compatible animation, asset and overlay changes then arrive after a GitHub Pages deployment, without another Framer paste or publish. An already-open page keeps its loaded release until a reload; deployment and caching can take a few minutes.

The bridge keeps the existing Framer controls and a server-rendered opening poster. The editor canvas stays static and does not fetch executable code. Preview and the published page load one small manifest and a versioned JavaScript bundle, sharing Framer's React instead of downloading a second copy. The initial release's poster and runtime use the same image URL. After a future asset change, an old bridge may briefly show its installed poster until the current runtime's image appears. The native text/CTA overrides use the same remote release as the hero.

The manifest only selects runtime files on this repository's GitHub Pages host. Script integrity is verified by the browser. If the current manifest or runtime cannot load, the bridge tries the known release packaged with it. If that also fails, it leaves the opening still and normal page navigation available. If Pages cannot serve the still, the original GitHub image is a secondary source. Render errors are contained at the component/layer boundary. New Framer property-panel controls or an incompatible bridge API change can still require a one-time bridge update; ordinary player/overlay updates do not.

## Release workflow

Only if returning to the hosted loader workflow, run `node scripts/build.mjs --remote` and run the sequence and remote tests. This opt-in build writes a versioned runtime under `docs/releases/`, copies its versioned images under `docs/assets/`, and updates `docs/hero-manifest.json`. Commit the source changes and generated `docs` outputs, then push. GitHub Pages publishes **main /docs** automatically. No separate website is deployed; these files serve the Framer animation. Keep previous release and image folders so older bridges, cached manifests and rollbacks continue working. The hosted release currently retains its old 0.5-second endpoint fades; update the remote timing expectation when publishing a new release.

To roll back a runtime, restore the previous `docs/hero-manifest.json` in a new commit and push it. Keep its referenced JavaScript and images. No force push or Framer change is needed for compatible releases. The standalone component below remains available for a fully pasted installation.

Run `node --test tests/remote.test.mjs tests/sequence.test.mjs` for type, server-render, release integrity and asset checks. Set `SEQUENCE_REMOTE=1` when running `node tests/sequence-browser-check.mjs` to exercise the bridge, the player, automatic updates, script/manifest failures and fallback images. Set `SEQUENCE_PUBLIC=1` and `SEQUENCE_TEST_FILTER=public` too for a smoke test against the real hosted release. Actual Framer Preview remains the final integration check; the automated fixture checks the Framer SDK separately.

---

# Framer hero sequence — standalone installation

Use **src/framer/AdmiralHeroSequence.tsx** for the new AVIF hero. This is one complete paste-ready Code Component, including the three native-layer Code Overrides. The video component below remains available as a separate fallback.

## Install in Framer

1. Create a new **Code Component** named **AdmiralHeroSequence.tsx** under Assets > Code. Replace the entire file with `src/framer/AdmiralHeroSequence.tsx`. Use the generated file, not the `.source.tsx` template. Save.
2. Insert **Hero Sequence** from Assets. Replace the old video instance; do not run both players in the same hero.
3. Use one normal **Relative** hero Frame, height **100vh** (or a stable viewport height), with the sequence filling it. Put your native Framer content above it. Remove the previous extra-tall sticky spacer. With **Hold hero** on, the code holds the page only while this short journey is active. It does not fix the body or change the scrollbar width.
4. Create three separate native wrapper Frames: opening logo/location text, building headline/body, and the CTA button. Keep them inside that same hero Frame, as siblings above the sequence. Use content-sized wrappers where possible so transparent layers do not cover the Skip control. Put the CTA beside the building wrapper, not inside it, to avoid applying both fades to the button.
5. On each wrapper, open **Code Overrides**, select **AdmiralHeroSequence**, and apply **OpeningContent**, **BuildingContent**, or **ArrivalCTA** respectively. These names are exported from the same file as the player; do not duplicate the code into a second file, because the overrides and player must share their progress channel.
6. Keep fonts, copy, layout, responsive styling, button links and hover effects in Framer. Remove Appear/Scroll Transform effects from the three outer wrappers: their opacity and vertical movement belong to the sequence overrides. Child styling and button interactions remain native.
7. Preview the page to test synchronization. **Editor view: Opening / Arrival** only selects the background still while editing. Framer does not execute Code Overrides on the editing canvas; the synchronized text reveals run in Preview and on the published site.
8. Leave **GitHub assets** enabled for the supplied 65 AVIF files, named `raw sequence00.avif` through `raw sequence64.avif`. Frame 00 is the sharper opening still; frame 64 is the sharper arrival still. Updating the GitHub code does not replace a pasted Framer code file automatically: paste the updated file, save, then publish in Framer. The previous `copy.avif` URLs remain published for compatibility with older pasted components.

## Default visitor experience

The opening panorama appears immediately. A deliberate downward scroll starts a 0.8-second crossfade from frame 00 to frame 01, followed by the guided flight through frames 01–63, then a single 0.8-second crossfade from 63 to the sharper frame 64. The journey setting controls the middle flight (2.5 seconds by default), making the unboosted total approximately 4.1 seconds. Additional downward input boosts the middle flight up to 1.8x; the boost decays over 0.22 seconds. The opening and final fades stay at 0.8 seconds each regardless of scroll speed, in either direction. Releasing the wheel or finger still completes the journey. An intentional upward gesture reverses it, including during either fade. Near the start and finish the camera eases gently; it crosses the middle faster. Middle frames, including 62 to 63, have no crossfades or extra blur. Both endpoint fades work in reverse too, keeping the lower image opaque to avoid a dark flash.

Opening content fades out over the first 20% of the actual displayed sequence. Building content enters at 68% and is fully visible at 88%. The CTA enters at 86% and is fully visible at arrival. These are adjustable controls in the hero's property panel. Hidden wrappers are inert, so invisible buttons cannot receive clicks or keyboard focus.

The page releases and the CTA becomes interactive only after the actual final frame is drawn and its fade finishes. A brief, bounded guard consumes the tail of the gesture already in progress; fresh scrolling continues down the page. Scrolling back to the top of the hero and then upward reverses the sequence. Window scroll position is not used as the animation playhead, so text follows the camera even while it coasts, dissolves or waits for a frame.

Escape, Tab navigation, Skip, a failed frame, a hidden tab or a timeout releases the hold. Nested scrollable menus, input fields and pinch zoom retain native behavior. Manual scrollbar/anchor navigation remains native when no hold is active. A reduced-motion preference displays the arrival still and CTA without pinning or bulk frame loading. **Hold hero** can be disabled if the surrounding layout should manage scrolling.

## Loading and memory

The supplied export is 65 frames (00–64) at 1920 x 1010, totaling approximately 3.53 MB. The sharper opening and arrival stills add about 430 kB combined and are used directly as the sequence endpoints. The initial still is high priority. Background loading starts after the poster, with up to four downloads and two decodes at once. Save-data/2G connections wait for interaction before bulk loading. The loader retains compressed files, keeps a bounded decoded window including both endpoints, and releases evicted bitmap resources. It draws only when the frame, fade amount or canvas size changes, with consistent cover cropping throughout. Endpoint dissolves reuse already decoded images and add no image downloads.

Desktop defaults to 14 decoded frames at 1920 width. Phone-sized viewports use at most 10 decoded frames at 1280 width. The phone setting reduces decoded memory, not downloaded file size; a separately composed mobile export can be supplied later. The fallback HTML image decoder may retain full-resolution frames if bitmap resizing is unavailable. On failure the last valid image remains visible and navigation is released. There is no full-screen loader.

## Sequence development and verification

Edit `src/core/hero-sequence.ts` and `src/framer/AdmiralHeroSequence.source.tsx`, then run `node scripts/build.mjs`. This builds the standalone Framer file and the framework-independent browser module. The build counts the numbered AVIF files, checks they are consecutive from 00, and includes them all in the generated component and asset version. Run `node --test tests/*.test.mjs` for the asset, SDK typing and server-render checks. Run `node tests/sequence-browser-check.mjs` for browser interactions. Existing external-module environment settings described below also apply.

The automated fixture uses the real images, React 18 Strict Mode, and native-layer stand-ins with the Framer SDK checked separately. It covers coasting, acceleration, mid-flight and return-to-hero reverse, synchronized overlays, native CTA links, scroll release, nested scrolling, Escape, reduced motion, delayed/failed frames, touch emulation, bounded cache and cleanup. Solid-colour test frames also verify the actual blended pixels and 0.8-second opening and final fade timings in both directions; another check reverses a fade and verifies pause/resume across a resize. It is a component test fixture, not a website design. Actual Framer Preview and real iPhone/Safari performance still need verification after installation.

---


# Framer hero video component

The deliverable is **src/framer/AdmiralHeroVideo.tsx**: the full animation component in one file. It includes no logo, headline, navigation, sales copy, or website layout.

## Use in Framer
1. In Framer, open Assets > Code > Create Code File and choose a new Code Component. Name it AdmiralHeroVideo.tsx. Replace the entire file with src/framer/AdmiralHeroVideo.tsx from this repository. Do not paste the .source.tsx template, the core helper, or a Markdown code fence.
2. Save the file, then find **Hero Video** under Assets > Code and drag it onto the canvas. Leave **GitHub assets** enabled: the V02 opening image, faster V02 video and V02 final image load from the public UnbuiltMarket/admiral-park repository automatically, including on existing instances with old saved file choices.
3. To use other assets, turn **GitHub assets** off and choose **Video**, optional **Mobile Video**, **First Frame** and **Last Frame** with the file controls.
4. Set the component's size in Framer. Layer your own logo, text, buttons, and navigation above it.
5. Keep **Hold scroll** enabled and use a 100vh hero in normal page flow (Relative in Framer). Remove any extra-tall sticky spacer: the player holds the page for the actual media loading and playback time. Adjust **Focal X/Y**, **Object Fit**, optional **Darken**, **Play controls**, **Scroll trigger**, and button colors. Autoplay means start on downward scroll. Keep Loop off to hold the final frame.
6. Test in Framer Preview/published mode. The editing canvas renders the opening still.

The opening image appears on page load. A downward page scroll (default threshold: 18 pixels) starts a 0.3-second crossfade to the paused first video frame. Playback starts only after that fade finishes. The film plays once in time, independently of subsequent scroll movement. On video end, the stopped final video frame crossfades to the final image over 0.3 seconds, then holds. Each dissolve keeps the lower layer opaque until the incoming layer is fully visible, avoiding a dark flash.
It does not replay on upward scroll. The optional control supports pause, resume and replay.
With Hold scroll on (default), the initial downward wheel, swipe or scrolling key starts the film without moving past the hero. The page stays at that position until the final still is loaded, decoded and finished fading in. Further scrolling moves down the page normally without a jump or replay. An existing oversized sticky parent will still obey its Framer layout; remove that extra height to let the next section follow immediately. Turn Hold scroll off to restore unrestricted page scrolling.
The hold targets the page window. Nested scrolling menus and inputs keep their normal controls. Reduced-motion visitors and looping videos do not hold the page. Escape, manual pause, playback failure, tab hiding or component removal releases the hold; a 15-second maximum prevents a stalled download from trapping navigation. Once released, the blocking input listeners are removed; resuming/replaying does not hold the page again until the component remounts.

## Loading and fallbacks
The opening image loads eagerly. Video warming begins 650 ms after that image loads.
The opening still remains until the paused video frame is ready; the 0.3-second incoming fade then begins. Slow loading does not fade into an empty player. Pause/resume works during both fades as well as playback.
Reduced-motion visitors use manual play with instant transitions. Data-saving and 2G connections skip speculative video loading.
The final image may take up to eight additional seconds to load and decode after playback. If it fails or times out, the last video frame stays visible and the page releases. Video failure preserves the opening image.
The player pauses while offscreen or in a hidden tab and resumes unless manually paused.
An optional mobile video URL selects one source on mount. The supplied horizontal video otherwise crops to fill the component.
Keep Play controls enabled for manual playback; browser-blocked playback always exposes a button.

## Local animation test
The included index.html, styles.css and app.js are a neutral media test fixture.
Run **Start Preview.ps1**, or with Node.js 24+:
~~~sh
node scripts/serve.mjs --port 4173
~~~
Open http://127.0.0.1:4173. Scroll down. Test controls switch between your original exports and show playback diagnostics.
The server binds to this computer only. Running this local test does not publish or upload files.

## Development
Edit src/core/hero-player.ts for playback logic and src/framer/AdmiralHeroVideo.source.tsx for the Framer wrapper.
Install development dependencies with npm ci, then run npm run build to regenerate the browser module and standalone Framer file. The generated file has one default JSX component export; playback helpers stay private. A TypeScript compiler is used for JSX validation. Development packages are not bundled into the standalone component.
Run node --test tests/assets.test.mjs for asset and generated-source checks.
Browser checks require Playwright: node tests/browser-check.mjs.
Set PLAYWRIGHT_MODULE_PATH to an existing Playwright package if not installed locally; set PLAYWRIGHT_CHANNEL=chrome to use installed Chrome.
The browser test results and screenshots are written under ignored tmp/.

## Verification and limits
Desktop Chrome and a phone-sized Chrome viewport passed scroll/play/end, pause/replay, reduced-motion, slow-response, blocked-playback and failed-media checks.
These automated regression tests use local browser fixtures rather than real phone hardware. The published Framer draft was inspected separately as described below; deploying the updated timing still requires replacing the code in Framer and republishing. The standalone JSX component was type-checked against React 18 and the Framer SDK, server-rendered without browser globals, and tested in React Strict Mode. The user confirmed that the component appears in the actual Framer Assets picker. The updated sequence is browser-tested; final layout and scroll behavior should be checked in the Framer project.
Before shortening the fades from one second, a V02 cold-cache simulation at 4 Mbps / 120 ms latency, scrolling two seconds after the opening image loaded, completed with zero buffering stalls and zero dropped frames across 63 frames. This single desktop simulation does not guarantee results on every connection or phone. The updated React browser check also loaded both V02 images and the V02 video from the real public GitHub URLs and verified the transition sequence. The current browser check verifies both 300 ms fades and pause/resume during them.
The local desktop run had no buffering stalls. Results vary with device, cache and network.

## Assets
Default: V02, 1,956,984 bytes (1.96 MB / 1.87 MiB), about 49% smaller than the previous 3.82 MB export. It runs for 2.625 seconds at 1920 × 1010, 24 fps, H.264 without audio, with fast-start metadata. The two V02 stills are also 1920 × 1010 and total 550,560 bytes. With both 0.3-second fades, the sequence lasts about 3.23 seconds once the video is ready.
Previous comparison videos remain available: 3.82 MB, 5.05 MB and 10.15 MB, each about 5.04 seconds. The original 1920 × 1013 stills are preserved. Exact visual matches should come from the final graded timeline.
Original exports and supplied stills are preserved. assets/images contains copies for the component test.
GitHub mode uses public raw.githubusercontent.com URLs under main. For a fixed release or larger deployments, use public, versioned media URLs on your chosen host. Verify MP4 byte-range support; never place private GitHub credentials in component code.

## Component recognition fix
The supplied file already had a default export. The replacement uses literal JSX, an explicit React.JSX.Element return type, layout annotations directly above the exported function, stable default props, and controls registered to that same function. Responsive-image objects and older image URL strings are supported. Image URLs, rather than object identities, drive the playback effect so property-panel rerenders do not restart the film.

Run node tests/framer-component-check.mjs for React 18 playback regression checks (requires Playwright). On a cloud-synced drive that rejects node_modules installation, install the same package.json dependencies on a local disk and set HERO_DEV_MODULES to that node_modules directory before building or testing.

Official Framer guidance: https://www.framer.com/developers/components-introduction and https://www.framer.com/developers/property-controls

## Final-frame alignment
Inspection of the published homepage draft on 15 October 2026 confirmed that the video and both V02 stills use the same 1920 × 1010 source dimensions, CSS bounds, cover fit and centered position, with no scale transform. The final video frame and the sharper supplied final still have slightly different subject geometry, so their dissolve can look like a small zoom or shift. A 300 ms fade shortens the visible mismatch; it does not align the source images. A still exported from the exact final video frame matches its framing, while keeping the sharper render requires matching the video endpoint to that render.

Run node tests/scroll-hold-check.mjs for normal-flow wheel, keyboard, touch, delayed end-image, error, timeout and cleanup checks. Touch is tested in Chrome emulation; a real iPhone/Safari check is still useful.
