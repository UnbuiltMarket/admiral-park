# Framer hero video component

The deliverable is **src/framer/AdmiralHeroVideo.tsx**: the full animation component in one file. It includes no logo, headline, navigation, sales copy, or website layout.

## Use in Framer
1. In Framer, open Assets > Code > Create Code File and choose a new Code Component. Name it AdmiralHeroVideo.tsx. Replace the entire file with src/framer/AdmiralHeroVideo.tsx from this repository. Do not paste the .source.tsx template, the core helper, or a Markdown code fence.
2. Save the file, then find **Hero Video** under Assets > Code and drag it onto the canvas. Set **Video** and optional **Mobile Video** using the file controls. These controls preserve the supplied version of the component.
3. Upload/select the **First frame** and **Last frame** images.
4. Set the component's size in Framer. Layer your own logo, text, buttons, and navigation above it.
5. Adjust **Focal X/Y**, **Object Fit**, optional **Darken**, **Play controls**, **Scroll trigger**, and button colors. Autoplay means start on downward scroll. Keep Loop off to hold the final frame.
6. Test in Framer Preview/published mode. The editing canvas renders the opening still.

A downward page scroll starts automatic playback. Default threshold: 18 pixels.
The film plays once in time, independently of subsequent scroll movement, then holds the final image.
It does not replay on upward scroll. The optional control supports pause, resume and replay.
The component does not pin the page or intercept scrolling. Configure any sticky section in Framer.
The trigger listens to the page's window scroll; a separately scrolling nested container is not supported.

## Loading and fallbacks
The opening image has high loading priority. Video warming begins 650 ms after that image loads.
The still remains until a video frame is ready; both transitions use a 180 ms fade.
Reduced-motion visitors use manual play. Data-saving and 2G connections skip speculative video loading.
If the final image fails, the last video frame stays visible. Video failure preserves the opening image.
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
This is not a real phone or live Framer verification. The standalone JSX component was type-checked against React 18 and the Framer SDK, server-rendered without browser globals, and tested in React Strict Mode. Importing into the actual Framer Assets picker still needs confirmation in your project.
A cold-cache simulation at 4 Mbps / 120 ms latency, scrolling two seconds after the poster loaded, exposed about 1.4 seconds of buffering across five stalls with the 6 Mbps export. A smaller mobile/slower-connection export is still useful; the player cannot guarantee uninterrupted playback when delivery falls behind.
The local desktop run had no buffering stalls. Results vary with device, cache and network.

## Assets
Default: the 3.82 MB / 6 Mbps export. Comparison exports: 5.05 MB and 10.15 MB.
All are 1920 × 1010, 24 fps, about 5.04 seconds, H.264 without audio. All have fast-start metadata.
The supplied stills are 1920 × 1013. They share crop settings but are not pixel-identical to the video; exact matches should come from the final graded timeline.
Original exports and supplied stills are preserved. assets/images contains copies for the component test.
Use public, versioned media URLs on your chosen host. Verify MP4 byte-range support; never place private GitHub credentials in component code.

## Component recognition fix
The supplied file already had a default export. The replacement uses literal JSX, an explicit React.JSX.Element return type, layout annotations directly above the exported function, stable default props, and controls registered to that same function. Responsive-image objects and older image URL strings are supported. Image URLs, rather than object identities, drive the playback effect so property-panel rerenders do not restart the film.

Run node tests/framer-component-check.mjs for React 18 playback regression checks (requires Playwright). On a cloud-synced drive that rejects node_modules installation, install the same package.json dependencies on a local disk and set HERO_DEV_MODULES to that node_modules directory before building or testing.

Official Framer guidance: https://www.framer.com/developers/components-introduction and https://www.framer.com/developers/property-controls
