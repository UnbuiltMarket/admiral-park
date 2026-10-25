# Code audit repairs — 25 October 2026

These changes address the ten findings in the 25 October audit. The current list, orbit and detail-card design remains the baseline. The shared detail module continues to serve both Framer entry points and the private list preview.

| Finding | Repair |
| --- | --- |
| 1. Orbitdata actions clear before the pointer reaches them | Keep the actionable apartment while the pointer crosses to its displayed controls. Façade highlighting clears independently; leaving the combined interaction area clears the record. |
| 2. Favourite saved during JSON loading can disappear | Retain incoming IDs during loading, then validate against records and reconcile the latest stored snapshot. Missing or blocked storage preserves in-memory updates. |
| 3. Room lists clip on short landscape screens | Reflow the short landscape rail and fit room columns. Show compact room pagination only when the complete list cannot fit; keep the popup and close control inside the viewport. |
| 4. Export feedback is behind the modal | Deliver open-card feedback through a live region within the native dialog. Direct row exports retain their external feedback region. |
| 5. Stalled orbit JSON cannot recover | Bound request and body loading, evict failed requests, abort pending requests on explicit retry, and protect newer cache entries from old completions. |
| 6. Inline image failure leaves floating markers | Add loading, error and retry feedback to both inline drawings. Keep plan markers hidden until the plan loads. |
| 7. Sorting/removing a visible favourite loses keyboard focus | Restore the equivalent control after rendering, the nearest remaining row, or a stable favourites filter when empty. |
| 8. Negotiation text contrast | Darken status text relative to the configured hue while retaining the original yellow dot and palette control. |
| 9. Source insertion interprets literal replacement tokens | Insert code through replacement callbacks so source text such as `$&` remains unchanged. |
| 10. PDF timeout waits forever for initial JSON | Make the initialization wait abortable by the export job, so timeout/cancellation settles the job and restores the button. |

Related small repairs omit absent mobile garden values, correct the terrace caption, and make the historical hidden-column browser assertion visibility-aware.

The generated deliverables are `src/framer/AdmiralApartmentDetailCard.tsx`, `src/framer/AdmiralHomepageTrial.tsx` and `src/framer/AdmiralApartmentList.tsx`. Keep all three at the same folder level in Framer and save the shared detail file first. Code-file and canvas registry resolution must still be checked in the native Framer project; local browser/type checks cannot inspect that registry.

Regression coverage lives in the source tests and browser checks under `tests/`, including the dedicated list, orbit and card audit regressions. The preview verifies synchronized source hashes before building.

Verification completed: 110 source/data/generation/type tests, 308 generated-Framer/preview row checks, 108 actual PDF/search checks, 47 preview integration checks, 18 list race/focus checks and 141 detail-card recovery/viewport checks passed. Orbit tests exercise actual pointer travel and keyboard navigation in both layouts, stalled-fetch retry, and existing hover/fade behavior. Focused desktop/mobile status checks confirm readable negotiation text and matching direct-PDF colour. The desktop list screenshot is byte-identical to the saved pre-repair baseline. Native Framer canvas registry behavior remains outside this local verification.
