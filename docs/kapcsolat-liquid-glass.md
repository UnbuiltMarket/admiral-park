# Kapcsolat native Liquid Glass design

Updated in the Admiral Park Framer project on 2026-10-29. These are native canvas changes, not a replacement TSX page. They are saved for review and have not been published.

## Scope and page

- Project: `bziNTn8ZeBdiKTAMnee3`
- Kapcsolat page: `XLriEYHai`, path `/contact-page-draft`
- Desktop: `VMTNPQQq9` (1200 px)
- Tablet: `OxaKDOFJS` (810 px)
- Phone: `wT6oWNPPp` (390 px, also reviewed at 320 and 430 px)
- Existing `home new` layout template retained. Desktop navbar now selects `DESKTOP_LG` (`zB0MNs5OS`), mobile retains `MOBILE_LG` (`RBw5RGsxX`). Original navbar variants remain available.

## Visual system

The page matches the orbit, list, shared detail card and Bemutató glass treatment: a pearl ambient gradient, translucent white panels, a subtle white edge, 16 px background blur, rounded corners and soft inset/exterior shadows. Text remains sharp, with no blur applied to form controls.

Montserrat replaces the page-local serif and decorative text styles without changing global typography presets. Headings use weight 600; body copy uses 16 px with generous line height. The hero heading is 60 px desktop, 50 px tablet and 34 px phone. Secondary text uses a muted blue-grey and headings use the existing Black token.

Native groups:

- `XtzDnIK2k`: glass introduction over the existing aerial image; desktop maximum width 760 px, responsive padding.
- `GF4nec1Dr`: adviser information grouped on one glass surface, including the retained portrait placeholder, availability and phone link.
- `i2EV2vZBc`: callback form glass surface, with a common heading/input alignment.
- `ALa8SDuUN`: rounded glass location panel and existing project image.
- `FcsJYAVZo`: light footer with dark logo and links.
- `DGrn43cvh`: old absolute dark overlay hidden; it previously extended beyond the hero on narrow layouts.

New Liquid Glass Buttons instances preserve the existing telephone and callback destinations. The previous instances are hidden rather than deleted:

- `MQIkmZwMm`: hero call action, gold tint.
- `D5cTdjW2U`: callback anchor action, clear glass.
- `o8HYH7Jur`: adviser call action, clear glass.

## Form styling and preservation

The existing local Newsletter Section component `U1lucohRo` is used only on Kapcsolat. Its primary variant is `Vm3QfhtQo`, native form root `WK5GufZbb`.

Inputs/selects now use 48 px height, 16 px Montserrat, a mostly opaque white fill, 14 px radius, visible borders and a 2 px focus border. Consent rows have at least 44 px height; their original checkbox values, required rules and privacy link are unchanged. Consent text is 14 px with room to wrap.

Preserved all six required input/select fields, required privacy consent, optional marketing consent, select options, input names/types, placeholders, autofill, form destinations, WishlistDisplay and BehaviourTracker behavior controls. Only the WishlistDisplay colour and text size were changed.

The existing submit `ewXTWJAgc` is still referenced by the form and is its last child. Its external Button 2 source and pending/success mappings were retained. The button is now 50 px high; its external dark appearance remains, because its controls do not expose internal styling. No submission was sent during visual QA.

## Verification

Reviewed full-page desktop, tablet, 390 px phone, 320 px and 430 px screenshots. No visible horizontal overflow, overlapping panels or clipped consent copy. Phone width was restored to 390 px after testing. A second visual review found no blocking layout issues.

Compared before/after native data: page text, form text, image references, field requirements/options, form destination configuration, submit identity/order and state mappings are unchanged. Existing content links remain; new glass actions use their original destinations.

Saved review screenshots:

- Desktop: https://framerusercontent.com/screenshots/on-demand/96082c47-3399-41df-b8e9-77ef7a0d671f.jpg
- Tablet: https://framerusercontent.com/screenshots/on-demand/bcb6cde4-1332-4f1e-ac96-d31b8ea44dd4.jpg
- Phone, final: https://framerusercontent.com/screenshots/on-demand/61b02677-1495-4715-a6a0-fa0397b5290e.jpg
- 320 px, refined heading: https://framerusercontent.com/screenshots/on-demand/8c8a5970-3a03-4b9b-89ac-7ef85fe2eadd.jpg

The separate hosted apartment-list preview does not contain this native Framer page.
