# Liquid glass desktop navbar

The native Framer `Header` component (`dU4C_Dzxh`) contains the preserved `DESKTOP_W` variant (`x5whu27Ce`) and its new `DESKTOP_LG` variant (`zB0MNs5OS`). The new variant copies the existing links, logo, layout and interactions.

`DESKTOP_LG` uses a 16px backdrop blur, a translucent pearl gradient, a 1px white edge and layered inset/outer shadows. The existing Liquid Glass Buttons inquiry instance is tinted gold. The desktop template/page control `Desktop - Navbar` (`A8J3tyLkJ`) selects the new variant on the homepage, list and introduction drafts. Select `DESKTOP_W` in that same control to revert. Mobile selections are unchanged.

The current-page override in `src/framer/DesktopWCurrentPage.tsx` supports both variant names. Keep its existing export and attachment; do not replace the native Header with a code component.

Verified in Framer: original variant serialization unchanged apart from transient measured rectangles; all five navigation labels and their destinations preserved; 1100x75 variant and 60px navbar sizing preserved; light and dark background screenshots reviewed. Changes are saved in Framer and have not been published.
