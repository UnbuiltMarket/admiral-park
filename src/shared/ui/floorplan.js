// The WebP companion is encoded from the same AVIF sheet, so the room crop
// and marker coordinates apply to both formats.
export function floorplanFallbackUrl(source) {
  if (typeof source !== 'string' || !/^https?:\/\//i.test(source)) return null;
  const url = new URL(source);
  if (!/\/floorplans\/types\/[a-z0-9]+\/plan\.avif$/i.test(url.pathname)) return null;
  url.pathname = url.pathname.replace(/plan\.avif$/i, 'plan.webp');
  if (url.hostname === 'raw.githubusercontent.com') {
    const assetRevision = '2d2cd2bbb70ad70cae23bfd4c423384ab6cfcde2';
    url.pathname = url.pathname.replace(/^\/UnbuiltMarket\/admiral-park\/main\/assets\/apartment-list\//,
      `/UnbuiltMarket/admiral-park/${assetRevision}/assets/apartment-list/`);
  }
  return url.href;
}

export function swapToFloorplanFallback(image) {
  const fallback = image.dataset.floorplanFallback;
  if (!fallback || image.dataset.floorplanFallbackUsed === 'true') return false;
  image.dataset.floorplanFallbackUsed = 'true';
  image.src = fallback;
  return true;
}
