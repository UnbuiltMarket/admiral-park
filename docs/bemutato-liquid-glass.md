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
