# Bemutató liquid glass presentation

The native Framer page `Bemutató` (`ZmD0CLV3Z`, `/bemutato-draft`) uses the same light liquid-glass material as the orbitdata, list, shared apartment card and navigation. Its main content remains native Framer layers, with the existing shared layout template and desktop/mobile navigation controls.

Design changes:

- Montserrat throughout the page, with a 64px desktop hero title, 40px section headings and responsive 52/34px tablet and 40/30px phone sizes. Body copy uses 16px with larger introductory copy.
- Pearl ambient section backgrounds; glass hero copy, chapter navigation, project facts, amenities, specification accordion and closing action panel.
- White edges, restrained inset highlights and soft shadows; 16px blur on desktop and 12px on selected narrower surfaces.
- Rounded image windows preserve the original architectural renders and their sequence.
- Existing button labels and destinations are represented by the site's existing Liquid Glass Buttons component. The inquiry action is gold tinted.

Native button instances:

| Role | Node | Destination |
| --- | --- | --- |
| Discover | `dDhRS3siL` | `/bemutato-draft#helyszin` |
| Apartment list | `hKFH8cOQe` | `/listview-draft` |
| Inquiry | `MpieAx9Jq` | `/contact-page-draft` |

The original button instances remain hidden. The dedicated technical-accordion and rolling-number components keep their existing content, variables and state interactions. Page-local text presets were removed where required to apply the new typography; unrelated site text styles were not changed.

Verified in Framer: 43 existing native text nodes retain their original text prefixes, four image asset references are identical, all four smooth chapter links remain and have 44px minimum targets, and the three action destinations are preserved. Desktop, tablet, phone and a 320px phone with expanded technical details were visually reviewed. The phone width and accordion default state were restored after review. Saved in Framer; not published.

## Active chapter bubble (2026-10-29)

The existing native chapter-links frame was converted with `createComponentFromFrame` into the editable component **Bemutató / Liquid Glass fejezetek** (`pkYdleWY_`). Its page instance is `oKK6YtIg6`, inside the original sticky wrapper `wfmrZscNZ` at 82 px. No custom JavaScript, code override or additional runtime dependency was introduced.

Four variants share one reflective, frosted bubble and four equal link slots:

| State | Variant | Scroll section node | Anchor |
| --- | --- | --- | --- |
| Helyszín | `NjlntUPRu` | `qg_eQdcX9` | `helyszin` |
| Kert | `UqUjtXTfu` | `hca5HB9ZN` | `kert` |
| Komfort | `F6FeCy8kT` | `WVXUWraQp` | `komfort` |
| Részletek | `se6GRkLjK` | `Lex5xPX4x` | `reszletek` |

The instance uses native `scrollVariantEffect` with `trigger: "onScrollTarget"`, the four node/variant mappings and `replay: true`. Framer normalized the omitted threshold to its default `0.5`. This effect is inherited by tablet and phone instances. Helyszín is the initial state; no click-only selected-state override is applied. The active link uses `ariaCurrent: "location"`, heavier text and darker ink. Existing smooth-scrolling destinations remain unchanged.

The bubble (`oX22Hquvi`) is decorative and ignores pointer events. It is 25% of an overlay layout plane, positioned responsively by leading/trailing flex spacers (0/3, 1/2, 2/1, 3/0) rather than fixed pixel offsets. All variants use a 0.45 s native spring transition with 0.15 bounce. The bar is 432 × 56 px on desktop/tablet and fills its available phone width; all links are 44 px high. The four target sections now use 180 px scroll margins to clear both navigation bars.

Verified native state serialization: four distinct variants, exactly one bubble and one current link per variant, four unchanged smooth links, enabled targets, and the same section mappings on all three breakpoint instances. All four states were rendered at desktop width and at a 280 px bar width (the available width in a 320 px phone). Component widths and spring transitions were restored after inspection.

Live editor scrolling was not manually verified: the Framer window was minimized during the computer-use preview check. The native section-tracking configuration is saved; no Framer publication was performed. The separate hosted apartment-list preview does not contain this native page.
