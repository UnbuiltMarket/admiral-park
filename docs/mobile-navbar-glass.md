# Liquid glass mobile navbar

The native Framer Header component (`dU4C_Dzxh`) contains `MOBILE_LG` (`RBw5RGsxX`) and `MOBILE_LG_OPEN` (`otenexeuQ`). All four original mobile variants remain unchanged for rollback.

The pair uses the desktop pearl gradient, 16px backdrop blur, white edges and layered shadows. The open menu has a more opaque surface for readability. Logo, inquiry button and menu toggle keep a stable header row. Menu/close controls and each navigation link have 44px targets. The closed navbar is 70px tall including outer spacing; the open drawer fits its content. Link labels and destinations come from the original open mobile menu. Link actions close into the new glass variant. The gold-tinted inquiry button retains the original unconfigured destination.

Shared layout and page controls select `MOBILE_LG` where they previously selected the old mobile headers. To revert, change `Mobile - Navbar` to the previous variant. The desktop selection remains `DESKTOP_LG`.

The existing `DesktopWCurrentPage.tsx` override supports the glass mobile names as well as both desktop variants. Keep its existing export and attachment.

Verified: original mobile variants serialize identically apart from transient measurement rectangles; toggle targets are paired; every menu link closes the new pair; 320px, 390px and 430px light/dark screenshots reviewed. Changes are saved in Framer, not published.
