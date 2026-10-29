# Shared Érdeklődöm contact button

Updated 2026-10-29. One canonical design now supplies every current Érdeklődöm placement. Framer canvas buttons use the same code component; imperative list/card UI and orbit inquiry links use its exact shared CSS and rendering principles.

## Canonical design

- Source: `src/shared/ui/frosted-button.js`.
- Framer component: `AdmiralFrostedGlassButton.tsx`, native export `codeFile/YdsVXw2:default`.
- Tint `#7395a0`, text `#183b43`, pearl highlights, white rim, frosted blur and pill shape.
- Montserrat 14 px, weight 600, letter spacing −0.015 em, line height 1.3.
- Same 0.18 s hover treatment, 1 px press movement, focus indication and reduced-motion/transparency/forced-colour behavior.
- Context sizing is preserved: 112 × 36 px row actions, 44 px mobile touch targets, 48 px normal native CTAs and the fitted card’s 60/52/44 px responsive geometry.

`FROSTED_BUTTON_DEFAULTS` supplies shared defaults to the standalone component and PDF fallback styling. No extra runtime dependency is required when pasting the generated list, homepage or shared card into Framer.

## Native Framer instances

The shared Header instance source is `aRgWhLeCB`, hidden in the primary variant and rollback variants. It is visible in:

- `DESKTOP_LG`: `zB0MNs5OSaRgWhLeCB`.
- `MOBILE_LG`: `RBw5RGsxXaRgWhLeCB`.
- `MOBILE_LG_OPEN`: `otenexeuQaRgWhLeCB`.
- Currently used `Desktop - Full`: `MZ6KEQmQWaRgWhLeCB`.

Bemutató uses `I6QYlPG7d` and its tablet/phone replicas. All seven placements use the same component, tint, text colour and label, with `/contact-page-draft` as their same-tab destination. This also gives the previously unconfigured Header contact actions a destination. The previous visible CTA instances are hidden rather than deleted. The mobile contact button remains before the hamburger/close control.

Pre-existing nodes in DESKTOP_W and the four preserved mobile rollback variants were compared before/after and are unchanged; the new shared instance is hidden there. Phone-call actions, callback scrolling and the contact form submit button are separate actions and were not replaced.

## Code-rendered placements

The list and card use `renderFrostedButton()` without changing configured apartment URL parameters, placeholder notices, copy behavior or PDF actions. The shared card CSS is derived with the scope `#detail-dialog .inquiry-button.admiral-frosted-button` so its material and typography win the card’s resets.

Orbit inquiry links use CSS derived with `[data-orbit-studio][data-mobile] .orbit-studio-primary.admiral-frosted-button[data-orbit-inquiry]`, ensuring the canonical appearance wins desktop, mobile, builder and glass-tone rules. Only actual inquiry links receive this class; details actions retain their existing logic. Inquiry arrows are removed.

The newer native `HERO_video.tsx` and `HERO_video_no_fullscreen.tsx` files were patched in place. Only the inquiry anchor class/arrow, canonical CSS constant and its style inclusion changed. A reverse patch verified all unrelated source bytes are preserved; both writes returned clean diagnostics with the same exports. They were not overwritten by the older generated canonical homepage.

The native shared card retains its existing React wrapper while receiving the updated canonical renderer, styles and export logic. The private preview uses the same canonical shared sources. A configured PDF inquiry pill matches the pearl tint, dark text and Montserrat semibold principles; its non-inquiry “Lakás megtekintése” fallback keeps its existing appearance.

## Verification and publication

Native desktop and mobile Header screenshots were inspected: the labels fit without clipping, and the seven contact destinations are configured. Source/SSR/PDF snapshot checks, configured and fallback PDF generation, material/hover checks and Poppler renders were performed. Row sizing, apartment data and interactions are checked using the generated consumers and shared preview.

Framer changes are saved for review, not published. The separate owner-private apartment-list preview is deployed through Sites with its audience unchanged.
