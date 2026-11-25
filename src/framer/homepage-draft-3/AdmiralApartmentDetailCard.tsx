// Shared apartment detail card. Create this Framer code file once.
import * as React from "react"

const ADMIRAL_FAVORITES_STORAGE_KEY = "admiral-park:favorites:v1"
export const ADMIRAL_FAVORITES_LIMIT = 10
export const ADMIRAL_FAVORITES_LIMIT_MESSAGE =
    `Legfeljebb ${ADMIRAL_FAVORITES_LIMIT} lakást menthet a kedvencekhez.`

// Ordered oldest to newest. Existing storage and event payloads share this shape.
export function normalizeAdmiralFavorites(
    values: unknown,
    accept?: (id: string) => boolean
): Set<string> {
    const entries: unknown[] = Array.isArray(values)
        ? values
        : values instanceof Set ? [...values] : []
    const unique = new Set<string>()
    for (const value of entries) {
        if (typeof value !== "string") continue
        const id = value.trim()
        if (id && (!accept || accept(id))) unique.add(id)
    }
    return new Set([...unique].slice(-ADMIRAL_FAVORITES_LIMIT))
}

// The list, orbit and detail card keep the ten most recently added apartments.
export function toggleAdmiralFavorite(
    id: string,
    current: ReadonlySet<string>,
    { storage = true, accept }: { storage?: boolean; accept?: (id: string) => boolean } = {}
) {
    let storedIds: unknown[] | undefined
    if (storage) {
        try {
            const stored = localStorage.getItem(ADMIRAL_FAVORITES_STORAGE_KEY)
            if (stored !== null) {
                const parsed: unknown = JSON.parse(stored)
                if (Array.isArray(parsed)) storedIds = parsed
            }
        } catch {
            storage = false
        }
    }
    // When storage is unavailable the ordered in-memory set owns the session.
    const favorites = normalizeAdmiralFavorites(storedIds ?? new Set(current), accept)
    const selectedId = typeof id === "string" ? id.trim() : ""
    if (selectedId && (!accept || accept(selectedId)) && !favorites.delete(selectedId)) {
        favorites.add(selectedId)
        while (favorites.size > ADMIRAL_FAVORITES_LIMIT)
            favorites.delete(favorites.values().next().value!)
    }
    try {
        localStorage.setItem(ADMIRAL_FAVORITES_STORAGE_KEY, JSON.stringify([...favorites]))
        storage = true
    } catch {
        storage = false
    }
    return { favorites, limited: false, storage }
}

// Shared native apartment dialog used by both homepage and apartment list.
const ORBIT_APARTMENT_CARD_STYLES = "/* Shared detail and media card styles; list-only selectors removed. */\n:root, :host {\n  --paper: #fbfaf8;\n  --surface: #f1f0eb;\n  --filter-background: #f1f0eb;\n  --ink: #242824;\n  --muted: #70736d;\n  --accent: #a38c69;\n  --line: #deded6;\n  --button: #242824;\n  --button-text: #ffffff;\n  --available: #4f7959;\n  --negotiating: #b28a2f;\n  --sold: #b4564f;\n  --hover: color-mix(in srgb, var(--ink) 3%, var(--paper));\n  --detail-top: #fdfbfb;\n  --detail-bottom: #e4e9ec;\n  --detail-ink: #242824;\n  --detail-muted: #687074;\n  --detail-watermark-top: #f2f0f1;\n  --detail-watermark-bottom: #d9dfe2;\n  font-family: 'Montserrat', Arial, sans-serif;\n  font-size: 14px;\n  font-synthesis: none;\n  color: var(--ink);\n  background: var(--paper);\n  color-scheme: light;\n  -webkit-font-smoothing: antialiased;\n}\n:host { display: block; width: 100%; }\n* { box-sizing: border-box; }\nbody { margin: 0; background: var(--paper); }\nbody.dialog-open { overflow: hidden; }\nbutton, input, select { font: inherit; color: inherit; }\nbutton, select, input[type=\"checkbox\"], summary { cursor: pointer; }\nbutton, a, input, select, summary { -webkit-tap-highlight-color: color-mix(in srgb, var(--ink) 0%, transparent); }\nbutton, a { touch-action: manipulation; }\nbutton { border: 0; background: none; }\nbutton:disabled { cursor: default; opacity: .4; }\na { color: inherit; text-decoration: none; }\ninput, select { min-width: 0; border-radius: 0; }\ninput[type=\"number\"] { appearance: textfield; -moz-appearance: textfield; }\ninput::-webkit-inner-spin-button, input::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }\nbutton:focus-visible, a:focus-visible, input:focus-visible, select:focus-visible, summary:focus-visible { outline: 1px solid var(--accent); outline-offset: 5px; }\ninput:focus-visible, select:focus-visible { outline-offset: 2px; }\n[hidden] { display: none !important; }\n.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0; }\nselect option { background: var(--surface); color: var(--ink); }\ninput[aria-invalid=\"true\"] { border-color: var(--negotiating); }\n.media-preview { display: flex; flex-direction: column; align-items: stretch; width: 100px; min-width: 0; padding: 0; border: 0; background: none; text-align: left; }\n.preview-visual { display: flex; align-items: center; justify-content: center; width: 100%; height: 90px; overflow: hidden; border: 0; background: none; transition: opacity .15s; }\n.preview-visual img { display: block; min-width: 0; min-height: 0; width: 100%; height: 100%; border: 0; object-fit: contain; background: none; }\n.media-preview:hover .preview-visual { opacity: .8; }\n.preview-unavailable { color: var(--muted); font-size: 8px; text-align: center; }\n.datasheet-link { display: inline-flex; align-items: center; justify-content: center; gap: 6px; min-height: 34px; padding: 8px 13px; border: 1px solid var(--line); border-radius: 999px; background: none; color: var(--ink); font-size: 10px; line-height: 1.5; white-space: nowrap; transition: border-color .15s, background .15s; }\n.datasheet-large { min-height: 40px; padding: 10px 17px; font-size: 11px; }\n.datasheet-link > svg { color: var(--accent); flex-shrink: 0; }\n.datasheet-link:hover { border-color: var(--accent); background: var(--hover); }\n.datasheet-link[aria-busy=\"true\"] { opacity: .45; pointer-events: none; }\n.action-pill { display: inline-flex; align-items: center; justify-content: center; gap: 6px; width: 102px; min-width: 102px; max-width: 102px; height: 34px; min-height: 34px; max-height: 34px; margin: 0; padding: 0 9px; border: 1px solid var(--line); border-radius: 999px; background: none; color: var(--ink); font-size: 10px; font-weight: 400; line-height: 1.4; text-align: center; white-space: nowrap; cursor: pointer; transition: border-color .15s, background .15s, color .15s; }\n.action-pill:hover { border-color: var(--accent); background: var(--hover); }\n.action-pill > svg { width: 14px; height: 14px; flex-shrink: 0; }\n.download-wrap { display: inline-flex; flex-direction: column; align-items: flex-start; min-width: 0; }\n.download-fallback { display: inline-flex; gap: 5px; margin-top: 6px; color: var(--muted); font-size: 9px; text-decoration: underline; text-underline-offset: 3px; }\n.heading-rooms { text-align: center; }\n.status-pill { display: inline-flex; align-items: center; gap: 7px; color: var(--muted); font-size: 10px; line-height: 1.5; white-space: nowrap; }\n.status-pill::before { content: ''; width: 4px; height: 4px; flex-shrink: 0; border-radius: 50%; background: currentColor; }\n.status-available { color: var(--available); }\n.status-under_negotiation, .status-reserved { color: color-mix(in srgb, var(--negotiating) 60%, var(--detail-ink)); }\n.status-under_negotiation::before, .status-reserved::before { background: var(--negotiating); }\n.status-sold { color: var(--sold); }\n.status-unknown { color: var(--muted); }\n.save-button { display: inline-grid; place-items: center; width: 31px; height: 34px; vertical-align: middle; padding: 6px; color: color-mix(in srgb, var(--muted) 65%, var(--paper)); }\n.save-button svg { display: block; width: 18px; height: 18px; }\n.save-button:hover, .save-button.is-saved { color: var(--accent); }\n.save-button.is-saved svg path { fill: currentColor; }\n.button-primary, .button-secondary { display: inline-flex; align-items: center; justify-content: center; gap: 20px; min-height: 43px; padding: 12px 19px; border: 1px solid var(--button); font-size: 11px; line-height: 1.5; text-align: center; }\n.button-primary { background: var(--button); color: var(--button-text); }\n.button-primary:hover { background: color-mix(in srgb, var(--button) 88%, var(--paper)); }\n.button-secondary { border-color: var(--line); background: none; color: var(--ink); }\n.button-secondary:hover { border-color: var(--accent); }\n.toast { position: fixed; bottom: 26px; left: 50%; z-index: 80; transform: translate(-50%, 12px); max-width: calc(100% - 32px); padding: 13px 21px; background: var(--button); color: var(--button-text); font-size: 11px; line-height: 1.7; text-align: center; opacity: 0; pointer-events: none; transition: opacity .2s, transform .2s; }\n.toast.visible { opacity: 1; transform: translate(-50%, 0); }\n#detail-dialog .detail-feedback { position: absolute; z-index: 70; bottom: 24px; width: max-content; max-width: calc(100% - 32px); border-radius: 4px; }\n.apartment-dialog { width: min(930px, calc(100% - 40px)); max-height: calc(100% - 40px); margin: auto; padding: 0; overflow: auto; border: 1px solid var(--line); color: var(--ink); background: var(--paper); box-shadow: 0 20px 90px color-mix(in srgb, var(--ink) 15%, transparent); }\n.apartment-dialog::backdrop { background: color-mix(in srgb, var(--ink) 42%, transparent); backdrop-filter: blur(3px); }\n.dialog-inner { padding: 34px 38px; }\n.dialog-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 22px; padding-bottom: 25px; margin-bottom: 28px; border-bottom: 1px solid var(--line); }\n.eyebrow { color: var(--muted); font-size: 9px; letter-spacing: 1.3px; line-height: 1.6; margin-bottom: 13px; }\n.dialog-head h2 { margin: 0; font-family: 'Montserrat', Arial, sans-serif; font-size: 39px; font-weight: 400; letter-spacing: -.8px; line-height: 1.1; }\n.dialog-head h2 > span { color: var(--muted); }\n.dialog-close { display: grid; place-items: center; width: 33px; height: 33px; flex-shrink: 0; padding: 0; color: var(--muted); font-size: 25px; font-weight: 300; line-height: 1; }\n.dialog-close:hover { color: var(--accent); }\n.empty-plan { padding: 0 0 23px; border-bottom: 1px solid var(--line); color: var(--muted); }\n.empty-plan h3 { margin: 0 0 11px; font-family: 'Montserrat', Arial, sans-serif; font-size: 24px; font-weight: 400; line-height: 1.4; color: var(--ink); }\n.empty-plan p { margin: 0; font-size: 11px; line-height: 1.8; }\n#detail-dialog { width: 90vw; max-width: none; height: 90dvh; max-height: 90dvh; padding: 0; overflow: hidden; overscroll-behavior: contain; border: 1px solid color-mix(in srgb, var(--detail-muted) 20%, var(--detail-top)); color: var(--detail-ink); background: linear-gradient(180deg, var(--detail-top), var(--detail-bottom)); box-shadow: 0 24px 100px color-mix(in srgb, var(--detail-ink) 22%, transparent); font-family: 'Montserrat', Arial, Helvetica, sans-serif; }\n#detail-dialog::backdrop { background: color-mix(in srgb, var(--detail-ink) 47%, transparent); backdrop-filter: blur(5px); }\n#detail-dialog .detail-shell { position: relative; width: 100%; height: 100%; min-height: 0; isolation: isolate; }\n#detail-dialog .detail-brand-motif { position: absolute; z-index: -1; inset: 0 0 0 auto; width: 67%; pointer-events: none; background: linear-gradient(180deg, var(--detail-watermark-top), var(--detail-watermark-bottom)); -webkit-mask-image: var(--detail-monogram-image, none); mask-image: var(--detail-monogram-image, none); -webkit-mask-position: center; mask-position: center; -webkit-mask-repeat: no-repeat; mask-repeat: no-repeat; -webkit-mask-size: contain; mask-size: contain; opacity: .6; }\n#detail-dialog .detail-topbar { position: absolute; z-index: 50; top: 9px; right: 11px; height: 42px; pointer-events: none; }\n#detail-dialog .detail-top-actions { display: flex; align-items: center; justify-content: flex-end; gap: 7px; pointer-events: auto; }\n#detail-dialog .detail-save-label { display: block; max-width: 100px; font-size: 10px; font-weight: 400; line-height: 1.25; text-align: left; }\n#detail-dialog .dialog-close { width: 38px; height: 40px; color: var(--detail-ink); font-size: 29px; font-weight: 300; }\n#detail-dialog .dialog-close:hover { color: var(--detail-muted); }\n#detail-dialog :is(button, a, summary, input):focus-visible { outline: 2px solid var(--detail-ink); outline-offset: 4px; }\n#detail-dialog .detail-layout { position: relative; display: grid; grid-template-columns: minmax(0, 1.3fr) minmax(0, 1fr); grid-template-rows: minmax(0, 1fr); column-gap: clamp(20px, 2vw, 42px); width: 100%; height: 100%; min-width: 0; min-height: 0; padding: 22px clamp(18px, 2vw, 42px) 34px; }\n#detail-dialog .detail-sidebar { grid-column: 2; grid-row: 1; display: grid; grid-template-rows: auto 1px minmax(0, 1fr) auto; row-gap: 16px; min-width: 0; min-height: 0; }\n#detail-dialog .detail-core { display: flex; flex-direction: column; align-items: center; gap: 14px; width: 100%; min-width: 0; padding-block: 16px; }\n#detail-dialog .detail-identity { width: 100%; min-width: 0; text-align: center; }\n#detail-dialog .detail-brand-group { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0; min-width: 0; }\n#detail-dialog .detail-logo { display: block; width: 200px; max-width: 100%; aspect-ratio: 1232.62 / 523.833007; margin-inline: auto; background: var(--detail-ink); -webkit-mask-image: var(--detail-logo-image, none); mask-image: var(--detail-logo-image, none); -webkit-mask-position: center; mask-position: center; -webkit-mask-repeat: no-repeat; mask-repeat: no-repeat; -webkit-mask-size: contain; mask-size: contain; }\n#detail-dialog .detail-area-row { width: 100%; min-width: 0; }\n#detail-dialog .detail-id-metric .detail-apartment-number { margin: 0; color: inherit; font: inherit; letter-spacing: inherit; line-height: inherit; white-space: nowrap; }\n#detail-dialog .detail-id-metric dt { white-space: nowrap; }\n#detail-dialog .detail-metrics { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; margin: 0; }\n#detail-dialog .detail-metrics.has-garden { grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 6px; }\n#detail-dialog .detail-metrics > div { display: block; min-width: 0; text-align: center; }\n#detail-dialog .detail-metrics dt { margin: 0 0 4px; color: var(--detail-muted); font-size: 15px; font-weight: 400; line-height: 1.4; }\n#detail-dialog .detail-metrics dd { margin: 0; font-size: 30px; font-weight: 600; letter-spacing: -.8px; line-height: 1.05; white-space: nowrap; }\n#detail-dialog .detail-metrics.has-garden dd { white-space: normal; }\n#detail-dialog .detail-metrics dd small { display: inline-block; margin-left: 3px; color: var(--detail-muted); font-size: 14px; font-weight: 400; letter-spacing: 0; line-height: 1.3; vertical-align: baseline; }\n#detail-dialog .detail-drawing-toolbar { display: flex; align-items: center; justify-content: flex-start; flex-shrink: 0; gap: 10px; min-width: 0; min-height: 27px; margin-bottom: 10px; }\n#detail-dialog .detail-unit-meta { flex: 1; min-width: 0; margin: 0; padding: 0; color: var(--detail-muted); font-size: 10px; font-weight: 400; line-height: 1.4; text-align: right; }\n#detail-dialog .detail-unit-meta strong { font-weight: 600; }\n#detail-dialog .detail-unit-meta span { display: inline-block; margin-inline: 3px; }\n#detail-dialog .detail-layout-label { margin-left: 7px; color: var(--detail-muted); font-size: 10px; font-weight: 300; letter-spacing: 0; line-height: 1.3; }\n#detail-dialog .detail-illustration-note { position: absolute; z-index: 10; left: 10px; bottom: 6px; max-width: calc(100% - 20px); margin: 0; padding: 0; color: var(--detail-muted); font-size: 9px; font-weight: 300; line-height: 1.3; text-align: left; pointer-events: none; }\n#detail-dialog .detail-divider { display: block; width: 100%; height: 1px; margin: 0; border: 0; background: color-mix(in srgb, var(--detail-muted) 25%, transparent); }\n#detail-dialog .detail-room-panel { position: relative; }\n#detail-dialog .detail-room-tabs { position: absolute; z-index: 1; top: 0; right: 0; gap: 12px; margin: 0; padding: 0; }\n#detail-dialog .detail-panel-nav { display: none; }\n#detail-dialog .detail-drawing { grid-column: 1; grid-row: 1; }\n#detail-dialog .detail-drawing, #detail-dialog .detail-room-panel { display: flex; flex-direction: column; min-width: 0; min-height: 0; }\n#detail-dialog #detail-dialog .detail-room-tabs { display: flex; align-items: center; gap: 16px; flex-shrink: 0; min-width: 0; min-height: 27px; margin-bottom: 10px; }\n#detail-dialog :is(.detail-room-tabs, .detail-summary-tabs) button { min-height: 27px; margin: 0; padding: 3px 0 6px; border: 0; border-bottom: 1px solid transparent; color: var(--detail-muted); background: none; font-size: 11px; line-height: 1.4; text-align: left; }\n#detail-dialog :is(.detail-room-tabs, .detail-summary-tabs) button[aria-selected=\"true\"], #detail-dialog :is(.detail-room-tabs) button.is-active { border-bottom-color: var(--detail-ink); color: var(--detail-ink); }\n#detail-dialog .detail-plan, #detail-dialog .detail-floor-plan { position: relative; display: flex; flex: 1; flex-direction: column; min-width: 0; min-height: 0; margin: 0; }\n#detail-dialog [data-image-state]:not([data-image-state=\"ready\"]) :is(.detail-plan-image, .detail-floor-image) { opacity: 0; }\n#detail-dialog [data-image-state]:not([data-image-state=\"ready\"]) .detail-plan-markers { visibility: hidden; }\n#detail-dialog .detail-section-label { flex-shrink: 0; margin: 0 0 9px; color: var(--detail-muted); font-size: 10px; font-weight: 400; letter-spacing: 1.1px; line-height: 1.4; text-transform: uppercase; }\n#detail-dialog .detail-plan-stage { position: relative; container-type: size; display: grid; flex: 1; place-items: center; min-width: 0; min-height: 0; margin: 0; padding: 0; border: 0; background: none; }\n#detail-dialog .detail-plan-canvas { position: relative; width: min(100cqw, calc(100cqh * var(--plan-aspect, 1))); max-width: 100%; max-height: 100%; aspect-ratio: var(--plan-aspect, 1); overflow: hidden; border: 0; background: none; }\n#detail-dialog .detail-plan-surface { position: absolute; }\n#detail-dialog .detail-plan-image { display: block; width: 100%; height: 100%; max-width: none; margin: 0; border: 0; object-fit: contain; background: none; }\n#detail-dialog .detail-plan-markers { position: absolute; inset: 0; }\n#detail-dialog .room-marker { position: absolute; z-index: 2; display: grid; place-items: center; width: 28px; height: 28px; margin: 0; padding: 0; border: 0; border-radius: 50%; color: var(--detail-ink); background: none; font-family: inherit; font-size: 11px; font-weight: 400; line-height: 1; transform: translate(-50%, -50%); isolation: isolate; cursor: pointer; }\n#detail-dialog .room-marker::before { content: ''; position: absolute; z-index: -1; inset: 4px; border: 1px solid color-mix(in srgb, var(--detail-ink) 48%, var(--detail-top)); border-radius: 50%; background: color-mix(in srgb, var(--detail-top) 96%, transparent); box-shadow: 0 1px 5px color-mix(in srgb, var(--detail-ink) 9%, transparent); transition: background .15s, border-color .15s; }\n#detail-dialog .room-marker.is-active { z-index: 5; color: var(--detail-top); }\n#detail-dialog .room-marker.is-active::before { border-color: var(--detail-ink); background: var(--detail-ink); }\n#detail-dialog .room-marker:focus-visible { outline-offset: 0; }\n#detail-dialog .detail-plan-note { flex-shrink: 0; margin: 9px 0 0; color: var(--detail-muted); font-size: 10px; line-height: 1.5; }\n#detail-dialog .detail-floor-plan > .detail-floor-image { display: block; flex: 1; min-width: 0; min-height: 0; width: 100%; height: 100%; margin: 0; border: 0; object-fit: contain; background: none; }\n#detail-dialog .empty-plan { display: flex; flex: 1; flex-direction: column; justify-content: center; min-height: 0; padding: 0; border: 0; color: var(--detail-muted); }\n#detail-dialog .empty-plan h3 { color: var(--detail-ink); }\n#detail-dialog .detail-rooms, #detail-dialog .unit-room-section { display: flex; flex: 1; flex-direction: column; min-width: 0; min-height: 0; margin: 0; }\n#detail-dialog :is(.detail-rooms, .unit-room-section) > h3 { flex-shrink: 0; min-height: 28px; margin: 0 0 6px; padding-right: 0; color: var(--detail-ink); font-family: inherit; font-size: 20px; font-weight: 400; letter-spacing: -.4px; line-height: 1.3; }\n#detail-dialog .room-page { flex: 1; min-width: 0; min-height: 0; }\n#detail-dialog .room-pagination { display: flex; flex-shrink: 0; align-items: center; justify-content: center; gap: 12px; min-height: 28px; margin-top: 4px; color: var(--detail-muted); font-size: 10px; }\n#detail-dialog .room-pagination button { min-width: 32px; min-height: 28px; padding: 3px 8px; color: var(--detail-ink); border: 1px solid color-mix(in srgb, var(--detail-muted) 30%, transparent); border-radius: 999px; }\n#detail-dialog .type-room-list, #detail-dialog .unit-room-list { display: grid; grid-template-columns: repeat(var(--room-columns, 1), minmax(0, 1fr)); gap: 0 10px; margin: 0; padding: 0; list-style: none; }\n#detail-dialog .type-room-list > li { min-width: 0; }\n#detail-dialog .room-legend-button { display: grid; grid-template-columns: var(--room-circle, 18px) minmax(0, 1fr) auto; align-items: center; gap: 6px; width: 100%; min-height: 0; margin: 0; padding: var(--room-padding, 4px) 0; border: 0; border-bottom: 1px solid color-mix(in srgb, var(--detail-muted) 20%, transparent); background: none; color: var(--detail-ink); text-align: left; }\n#detail-dialog .room-number { display: grid; place-items: center; width: var(--room-circle, 18px); height: var(--room-circle, 18px); border: 1px solid color-mix(in srgb, var(--detail-muted) 36%, var(--detail-top)); border-radius: 50%; color: var(--detail-muted); font-size: 10px; line-height: 1; transition: background .15s, color .15s; }\n#detail-dialog .room-name { min-width: 0; font-size: 11px; line-height: 1.4; }\n#detail-dialog .room-area { font-size: 10px; font-variant-numeric: tabular-nums; line-height: 1.4; white-space: nowrap; }\n#detail-dialog .room-legend-button.is-active .room-number { border-color: var(--detail-ink); background: var(--detail-ink); color: var(--detail-top); }\n#detail-dialog .unit-room-list li { display: grid; grid-template-columns: minmax(0, 1fr) auto; align-items: baseline; gap: 8px; min-width: 0; min-height: 0; padding: var(--room-padding, 4px) 0; border-bottom: 1px solid color-mix(in srgb, var(--detail-muted) 20%, transparent); color: var(--detail-muted); font-size: 11px; line-height: 1.4; }\n#detail-dialog .unit-room-list li > :last-child { color: var(--detail-ink); font-size: 10px; font-weight: 400; white-space: nowrap; }\n#detail-dialog .detail-conversion { display: grid; grid-template-rows: auto auto auto; row-gap: 10px; min-width: 0; }\n#detail-dialog .detail-price { margin: 0; padding: 6px 10px; border-radius: 8px; background: color-mix(in srgb, var(--detail-ink) 4%, transparent); text-align: center; }\n#detail-dialog .detail-price > p { display: flex; align-items: baseline; justify-content: center; flex-wrap: wrap; gap: 6px; margin: 0; }\n#detail-dialog .price-value { font-size: clamp(30px, 2.6vw, 40px); font-weight: 400; letter-spacing: -1.6px; line-height: 1.05; }\n#detail-dialog .price-unit { color: var(--detail-ink); font-size: 12px; font-weight: 400; line-height: 1.4; }\n#detail-dialog .price-unavailable { font-size: 24px; font-weight: 400; letter-spacing: -.7px; line-height: 1.2; }\n#detail-dialog .detail-inquiry { position: relative; min-width: 0; min-height: 60px; margin: 0; }\n#detail-dialog .detail-inquiry > .inquiry-button { width: 100%; }\n#detail-dialog .inquiry-pending { position: absolute; z-index: 40; bottom: calc(100% + 8px); left: 0; right: 0; margin: 0; padding: 13px 15px; border: 1px solid color-mix(in srgb, var(--detail-muted) 28%, var(--detail-top)); border-radius: 3px; color: var(--detail-muted); background: var(--detail-top); box-shadow: 0 7px 25px color-mix(in srgb, var(--detail-ink) 12%, transparent); font-size: 11px; line-height: 1.6; }\n#detail-dialog .inquiry-pending p { margin: 0; }\n#detail-dialog .inquiry-pending button { display: inline; margin: 4px 0 0; padding: 0; color: var(--detail-ink); font-size: inherit; text-decoration: underline; text-underline-offset: 4px; }\n#detail-dialog .detail-footer { display: grid; grid-template-columns: minmax(0, 1fr) minmax(100px, .85fr) minmax(0, 1fr); align-items: center; gap: 12px; margin: 0; min-width: 0; }\n#detail-dialog .detail-footer > :is(.download-wrap, .detail-share-wrap) { display: block; width: 100%; min-width: 0; }\n#detail-dialog .detail-footer .footer-pill { display: flex; align-items: center; justify-content: center; gap: 6px; width: 100%; min-width: 0; max-width: none; height: 44px; min-height: 44px; max-height: 44px; margin: 0; padding: 8px 11px; border: 1px solid var(--detail-ink); border-radius: 999px; color: var(--detail-ink); background: none; font-size: 11px; font-weight: 500; line-height: 1.2; text-align: center; white-space: normal; cursor: pointer; }\n#detail-dialog .detail-footer .datasheet-link { color: var(--detail-ink); background: none; }\n#detail-dialog .detail-footer .datasheet-link:hover { background: color-mix(in srgb, var(--detail-top) 40%, transparent); }\n#detail-dialog .detail-footer .footer-pill > svg { display: block; width: 15px; height: 15px; flex-shrink: 0; color: currentColor; }\n#detail-dialog .detail-footer .share-button:hover, #detail-dialog .detail-footer .share-button[aria-expanded=\"true\"] { background: color-mix(in srgb, var(--detail-top) 40%, transparent); }\n#detail-dialog .detail-status { display: flex; align-items: center; justify-content: center; min-width: 0; min-height: 44px; margin: 0; padding: 0; border: 0; text-align: center; }\n#detail-dialog .detail-status .status-pill { display: inline-flex; align-items: center; justify-content: center; gap: 6px; max-width: 100%; color: var(--detail-ink); font-size: 18px; font-weight: 400; line-height: 1.15; white-space: normal; }\n#detail-dialog .detail-status .status-pill::before { display: block; width: 6px; height: 6px; flex-shrink: 0; border-radius: 50%; background: currentColor; }\n#detail-dialog .detail-status .status-available { color: var(--available); }\n#detail-dialog .detail-status .status-sold { color: var(--sold); }\n#detail-dialog .detail-status .status-under_negotiation, #detail-dialog .detail-status .status-reserved { color: color-mix(in srgb, var(--negotiating) 60%, var(--detail-ink)); }\n#detail-dialog .detail-status .status-under_negotiation::before, #detail-dialog .detail-status .status-reserved::before { background: var(--negotiating); }\n#detail-dialog .detail-status .status-available::before { animation: detail-availability-pulse 2.3s ease-in-out infinite; }\n@keyframes detail-availability-pulse { 0%, 100% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--available) 24%, transparent); } 50% { box-shadow: 0 0 0 4px color-mix(in srgb, var(--available) 8%, transparent); } }\n@media (prefers-reduced-motion: reduce) {\n#detail-dialog .detail-status .status-available::before { animation: none; box-shadow: none; }\n}\n#detail-dialog .detail-share-wrap { position: relative; }\n#detail-dialog .download-fallback { color: var(--detail-muted); }\n#detail-dialog .share-popover { position: fixed; z-index: 100; width: min(280px, calc(90vw - 24px)); margin: 0; padding: 14px; border: 1px solid color-mix(in srgb, var(--detail-muted) 28%, var(--detail-top)); border-radius: 8px; color: var(--detail-ink); background: var(--detail-top); box-shadow: 0 10px 38px color-mix(in srgb, var(--detail-ink) 16%, transparent); }\n#detail-dialog .share-heading { display: flex; align-items: center; justify-content: space-between; gap: 14px; margin-bottom: 9px; }\n#detail-dialog .share-heading > div { display: flex; flex-direction: column; gap: 4px; }\n#detail-dialog .share-heading span { color: var(--detail-muted); font-size: 10px; line-height: 1.4; }\n#detail-dialog .share-heading strong { font-family: 'Montserrat', Arial, sans-serif; font-size: 23px; font-weight: 400; line-height: 1.1; }\n#detail-dialog .share-heading > button { display: grid; place-items: center; width: 30px; height: 30px; padding: 0; color: var(--detail-ink); font-size: 22px; line-height: 1; }\n#detail-dialog .share-options { display: grid; }\n#detail-dialog .share-options > :is(button, a) { display: flex; align-items: center; gap: 11px; min-height: 33px; margin: 0; padding: 7px 0; border-bottom: 1px solid color-mix(in srgb, var(--detail-muted) 16%, transparent); color: var(--detail-ink); font-size: 12px; line-height: 1.4; text-align: left; }\n#detail-dialog .share-options > :is(button, a) > span { width: 18px; color: var(--detail-muted); text-align: center; }\n#detail-dialog .share-options > :is(button, a):hover { color: var(--detail-muted); }\n#detail-dialog .share-url { display: block; width: 100%; min-width: 0; height: 31px; margin-top: 11px; padding: 6px 8px; border: 1px solid color-mix(in srgb, var(--detail-muted) 25%, transparent); border-radius: 3px; color: var(--detail-muted); background: none; font-size: 10px; line-height: 1.4; }\n#detail-dialog .share-feedback { display: block; min-height: 14px; margin-top: 7px; color: var(--detail-muted); font-size: 10px; line-height: 1.4; }\n.inquiry-button { box-sizing: border-box; width: 100%; min-width: 0; height: 60px; min-height: 60px; margin: 0; padding: 15px 24px; overflow: hidden; }\n.inquiry-button > svg { display: none; }\n@media (min-width: 1101px) and (min-height: 601px) {\n#detail-dialog .detail-room-tabs, #detail-dialog .detail-room-panel :is(.detail-rooms, .unit-room-section) > h3, #detail-dialog .detail-room-panel :is(.type-room-list, .unit-room-list) { transform: translateY(calc(var(--room-slack, 0px) * .5)); }\n}\n@media (min-width: 1700px) and (min-height: 900px) {\n#detail-dialog .detail-layout { padding-block: 28px 40px; }\n#detail-dialog .detail-sidebar { row-gap: 16px; }\n#detail-dialog .detail-core { gap: 18px; padding-block: 24px; }\n#detail-dialog .price-value { font-size: 44px; }\n#detail-dialog .detail-logo { width: 230px; }\n#detail-dialog .detail-metrics dd { font-size: 34px; }\n#detail-dialog .room-name { font-size: 12px; }\n}\n@media (max-height: 800px) {\n#detail-dialog .detail-layout { padding-block: 16px 28px; }\n#detail-dialog .detail-sidebar { row-gap: 8px; }\n#detail-dialog .detail-core { gap: 10px; padding-block: 4px; }\n#detail-dialog .detail-logo { width: 200px; }\n#detail-dialog .detail-metrics { gap: 8px; }\n#detail-dialog .detail-metrics dd { font-size: 28px; }\n#detail-dialog .detail-conversion { row-gap: 6px; }\n#detail-dialog .detail-price { padding: 4px 8px; }\n#detail-dialog .price-value { font-size: 28px; }\n}\n@media (max-width: 1100px), (max-height: 600px) {\n#detail-dialog .detail-layout { grid-template-columns: minmax(0, 1fr); grid-template-rows: auto 1px 32px minmax(0, 1fr) auto; gap: 8px 0; padding: 13px 15px 25px; }\n#detail-dialog .detail-sidebar { display: contents; }\n#detail-dialog .detail-core { grid-column: 1; grid-row: 1; gap: 8px; padding-block: 0; }\n#detail-dialog .detail-logo { width: 160px; }\n#detail-dialog .detail-metrics { gap: 8px; }\n#detail-dialog .detail-metrics dt { font-size: 14px; }\n#detail-dialog .detail-metrics dd { font-size: 22px; letter-spacing: -.8px; white-space: normal; }\n#detail-dialog .detail-metrics dd small { font-size: 14px; }\n#detail-dialog .detail-divider { grid-column: 1; grid-row: 2; }\n#detail-dialog .detail-panel-nav { grid-column: 1; grid-row: 3; display: flex; align-items: stretch; justify-content: center; gap: 26px; border-bottom: 1px solid color-mix(in srgb, var(--detail-muted) 18%, transparent); }\n#detail-dialog .detail-panel-nav button { min-width: 75px; min-height: 32px; margin: 0; padding: 0 4px; border: 0; border-bottom: 1px solid transparent; color: var(--detail-muted); background: none; font-size: 11px; line-height: 1.4; }\n#detail-dialog .detail-panel-nav button[aria-selected=\"true\"] { border-bottom-color: var(--detail-ink); color: var(--detail-ink); }\n#detail-dialog .detail-layout [data-detail-panel] { grid-column: 1; grid-row: 4; display: none; }\n#detail-dialog .detail-shell[data-panel=\"plan\"] .detail-drawing { display: flex; }\n#detail-dialog .detail-shell[data-panel=\"rooms\"] .detail-room-panel { display: flex; }\n#detail-dialog .detail-room-panel { width: 100%; min-height: 0; padding-top: 26px; }\n#detail-dialog .detail-room-panel h3 { display: block; min-height: 0; margin: 0 0 4px; padding: 0; font-size: 16px; line-height: 1.25; }\n#detail-dialog .detail-room-tabs { min-height: 24px; }\n#detail-dialog .detail-drawing-toolbar { gap: 8px; }\n#detail-dialog .detail-unit-meta { font-size: 9px; }\n#detail-dialog .detail-unit-meta span { margin-inline: 1px; }\n#detail-dialog .detail-conversion { grid-column: 1; grid-row: 5; row-gap: 8px; }\n#detail-dialog .price-value { font-size: 28px; }\n#detail-dialog .price-unit { font-size: 10px; }\n#detail-dialog .price-unavailable { font-size: 20px; }\n#detail-dialog .detail-inquiry { min-height: 52px; }\n#detail-dialog .detail-inquiry > .inquiry-button { height: 52px; min-height: 52px; padding: 12px 20px; }\n#detail-dialog .detail-footer { grid-template-columns: minmax(0, 1fr) minmax(80px, .95fr) minmax(0, 1fr); gap: 6px; }\n#detail-dialog .detail-footer .footer-pill { gap: 4px; padding: 6px; font-size: 10px; }\n#detail-dialog .detail-footer .footer-pill > svg { width: 13px; height: 13px; }\n#detail-dialog .detail-status .status-pill { gap: 4px; font-size: 14px; }\n#detail-dialog .detail-status .status-pill::before { width: 5px; height: 5px; }\n#detail-dialog .detail-brand-motif { width: 100%; }\n#detail-dialog .detail-illustration-note { left: 8px; bottom: 5px; font-size: 8.5px; }\n}\n@media (max-width: 600px) {\n#detail-dialog .detail-metrics dd small { display: block; margin-left: 0; }\n#detail-dialog .detail-metrics.has-garden dt { min-height: 2.8em; }\n#detail-dialog .detail-metrics.has-garden .detail-id-metric dt { white-space: normal; }\n#detail-dialog .detail-topbar { top: 8px; right: 8px; }\n#detail-dialog .detail-top-actions { gap: 8px; }\n#detail-dialog .detail-drawing-toolbar { flex-wrap: wrap; justify-content: flex-start; row-gap: 4px; column-gap: 10px; }\n#detail-dialog .detail-save-label { max-width: 70px; font-size: 9.5px; overflow-wrap: anywhere; }\n#detail-dialog .detail-drawing-toolbar .detail-unit-meta { flex-basis: 100%; font-size: 9px; text-align: left; }\n#detail-dialog .dialog-close { width: 32px; height: 38px; font-size: 28px; }\n}\n@media (max-width: 600px) and (max-height: 700px) {\n#detail-dialog .detail-layout { grid-template-rows: auto 1px 28px minmax(0, 1fr) auto; row-gap: 3px; padding: 6px 15px 20px; }\n#detail-dialog .detail-core { gap: 4px; }\n#detail-dialog .detail-logo { width: 110px; }\n#detail-dialog .detail-metrics { gap: 6px; }\n#detail-dialog .detail-metrics.has-garden { gap: 4px; }\n#detail-dialog .detail-metrics dt { margin-bottom: 2px; }\n#detail-dialog .detail-metrics dd { font-size: 18px; }\n#detail-dialog .detail-conversion { row-gap: 4px; }\n#detail-dialog .price-value { font-size: 24px; }\n#detail-dialog .price-unavailable { font-size: 18px; }\n#detail-dialog .detail-inquiry { min-height: 44px; }\n#detail-dialog .detail-inquiry > .inquiry-button { height: 44px; min-height: 44px; padding: 10px 18px; }\n#detail-dialog .detail-status .status-pill { font-size: 13px; }\n#detail-dialog .detail-panel-nav { gap: 8px; }\n#detail-dialog .detail-panel-nav button { min-width: 45px; min-height: 28px; font-size: 10px; }\n#detail-dialog .detail-shell[data-panel=\"rooms\"] .detail-panel-nav { justify-content: flex-start; padding-right: 140px; }\n#detail-dialog .detail-room-panel { padding-top: 0; }\n#detail-dialog .detail-room-tabs { top: -31px; min-height: 28px; gap: 8px; }\n#detail-dialog .detail-room-panel h3 { margin: 0; font-size: 13px; line-height: 1.2; }\n#detail-dialog .detail-layout-label { margin-left: 5px; font-size: 10px; }\n#detail-dialog .detail-illustration-note { font-size: 8px; line-height: 1.2; }\n#detail-dialog .detail-room-tabs button { min-height: 28px; padding: 0; font-size: 10px; }\n}\n@media (max-width: 360px) and (max-height: 700px) {\n#detail-dialog .detail-layout { row-gap: 2px; }\n}\n@media (max-width: 360px) {\n#detail-dialog .detail-drawing-toolbar { gap: 6px; }\n#detail-dialog .detail-unit-meta { font-size: 8px; }\n#detail-dialog .type-room-list, #detail-dialog .unit-room-list { column-gap: 8px; }\n#detail-dialog .room-legend-button { grid-template-columns: 14px minmax(0, 1fr) auto; gap: 2px; }\n#detail-dialog .room-number { width: 14px; height: 14px; font-size: 9px; }\n#detail-dialog .room-area { font-size: 9px; }\n}\n@media (max-height: 600px) and (min-width: 601px), (max-height: 450px) and (min-width: 450px) {\n#detail-dialog .detail-layout { --detail-landscape-rail: clamp(210px, 42vw, 300px); grid-template-columns: var(--detail-landscape-rail) minmax(0, 1fr); grid-template-rows: 28px minmax(0, 1fr); gap: 8px 12px; padding: 12px 12px 26px; }\n#detail-dialog .detail-sidebar { grid-column: 1; grid-row: 1 / 3; display: grid; grid-template-rows: auto 1px minmax(0, 1fr) auto; row-gap: 6px; }\n#detail-dialog .detail-core { grid-column: 1; grid-row: 1; gap: 6px; padding-block: 0; }\n#detail-dialog .detail-logo { width: 140px; }\n#detail-dialog .detail-metrics { gap: 6px; }\n#detail-dialog .detail-metrics.has-garden dt { min-height: 2.8em; }\n#detail-dialog .detail-metrics dd { font-size: 20px; }\n#detail-dialog .detail-room-panel h3 { min-height: 0; margin: 0 0 3px; padding-right: 0; font-size: 14px; line-height: 1.2; }\n#detail-dialog .detail-conversion { grid-column: 1; grid-row: 4; row-gap: 4px; }\n#detail-dialog .price-value { font-size: 24px; }\n#detail-dialog .detail-inquiry { min-height: 44px; }\n#detail-dialog .detail-inquiry > .inquiry-button { height: 44px; min-height: 44px; padding: 10px 18px; }\n#detail-dialog .detail-panel-nav { grid-column: 2; grid-row: 1; padding-right: 66px; gap: 16px; }\n#detail-dialog .detail-layout > .detail-drawing { grid-column: 2; grid-row: 2; }\n#detail-dialog .detail-room-panel { position: absolute; left: calc(12px + var(--detail-landscape-rail) + 12px); right: 12px; top: 50px; bottom: 26px; width: auto; padding-top: 0; }\n#detail-dialog .detail-room-tabs { position: static; top: auto; align-self: flex-start; min-height: 24px; gap: 10px; margin-bottom: 3px; }\n#detail-dialog .detail-room-tabs button { min-height: 24px; padding: 2px 0; font-size: 10px; }\n#detail-dialog .detail-layout-label { display: block; margin: 2px 0 0; }\n#detail-dialog .detail-shell[data-panel=\"rooms\"] .detail-panel-nav { justify-content: flex-start; padding-right: 0; }\n}\n@media (max-height: 360px) and (min-width: 450px) {\n#detail-dialog .detail-sidebar { row-gap: 3px; }\n#detail-dialog .detail-core { gap: 4px; }\n#detail-dialog .detail-logo { width: 100px; }\n#detail-dialog .detail-metrics dt { font-size: 12px; }\n#detail-dialog .detail-metrics dd { font-size: 18px; }\n#detail-dialog .detail-metrics dd small { display: inline-block; margin-left: 2px; font-size: 10px; }\n#detail-dialog .detail-price { padding-block: 2px; }\n}\n.media-dialog { position: fixed; inset: 0; width: 100vw; max-width: none; height: 100dvh; max-height: none; margin: 0; padding: 0; border: 0; overflow: hidden; background: var(--paper); color: var(--ink); }\n.media-dialog::backdrop { background: var(--paper); }\n.media-shell { display: grid; grid-template-rows: auto minmax(0, 1fr) auto; width: 100%; height: 100%; }\n.media-header { display: grid; grid-template-columns: 1fr auto auto; align-items: center; gap: 32px; padding: 20px 32px; border-bottom: 1px solid var(--line); }\n.media-heading { min-width: 0; }\n.media-heading .eyebrow { margin: 0 0 6px; font-size: 8px; }\n.media-heading h2 { margin: 0; font-family: 'Montserrat', Arial, sans-serif; font-size: 27px; font-weight: 400; line-height: 1.2; }\n.media-description { margin: 7px 0 0; color: var(--muted); font-size: 10px; line-height: 1.6; }\n.media-tabs { display: flex; align-items: center; gap: 25px; }\n.media-tabs button { min-height: 40px; padding: 7px 0; border-bottom: 1px solid color-mix(in srgb, var(--line) 0%, transparent); color: var(--muted); font-size: 11px; }\n.media-tabs button[aria-selected=\"true\"] { border-color: var(--accent); color: var(--ink); }\n.media-stage { position: relative; min-width: 0; min-height: 0; overflow: hidden; user-select: none; touch-action: pan-x pan-y pinch-zoom; outline-offset: -5px; }\n.media-canvas { position: absolute; inset: 24px; pointer-events: none; }\n.media-image { display: block; width: 100%; height: 100%; object-fit: contain; transform-origin: center; transition: transform .1s ease-out; }\n.media-stage[data-zoomed=\"true\"] { cursor: grab; touch-action: none; }\n.media-stage[data-dragging=\"true\"] { cursor: grabbing; }\n.media-stage[data-dragging=\"true\"] .media-image { transition: none; }\n.media-dialog[data-loading=\"true\"] .media-image, .media-dialog[data-error=\"true\"] .media-image { opacity: 0; }\n.media-load-status { position: absolute; inset: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 16px; color: var(--muted); font-size: 12px; line-height: 1.8; text-align: center; }\n.media-load-status:empty { display: none; }\n.media-load-status p { margin: 0; }\n.media-load-status > div { display: flex; justify-content: center; flex-wrap: wrap; gap: 12px; }\n.media-footer { display: flex; align-items: center; justify-content: space-between; gap: 24px; padding: 13px 32px; border-top: 1px solid var(--line); }\n.media-footer > p { margin: 0; color: var(--muted); font-size: 10px; line-height: 1.7; }\n.media-zoom { display: flex; flex-shrink: 0; align-items: center; border: 1px solid var(--line); }\n.media-zoom button { display: grid; place-items: center; min-width: 37px; height: 36px; padding: 0 10px; color: var(--ink); font-size: 17px; }\n.media-zoom .zoom-level { min-width: 65px; font-size: 10px; border-inline: 1px solid var(--line); }\n.media-zoom button:hover { background: var(--hover); }\n@media (max-width: 760px) {\n.apartment-dialog { width: calc(100% - 24px); max-height: calc(100% - 24px); }\n.dialog-inner { padding: 26px 23px; }\n.dialog-head { padding-bottom: 23px; margin-bottom: 24px; }\n.dialog-head h2 { font-size: 34px; }\n.eyebrow { font-size: 8px; letter-spacing: 1.1px; }\n.toast { font-size: 10px; padding: 12px 17px; }\n.media-header { grid-template-columns: 1fr auto; gap: 12px 20px; padding: 18px 20px 0; }\n.media-header .dialog-close { grid-column: 2; grid-row: 1; align-self: start; }\n.media-heading h2 { font-size: 25px; }\n.media-tabs { grid-column: 1 / -1; gap: 25px; }\n.media-tabs button { min-height: 39px; font-size: 10px; }\n.media-canvas { inset: 15px; }\n.media-footer { gap: 15px; padding: 12px 18px; }\n.media-footer > p { font-size: 9px; max-width: 180px; }\n.media-zoom button { min-width: 33px; padding-inline: 8px; }\n.media-zoom .zoom-level { min-width: 54px; }\n}\n@media (prefers-reduced-motion: reduce) {\n*, *::before, *::after { animation: none !important; transition: none !important; scroll-behavior: auto !important; }\n}\n\n/* Recover failed drawings without changing the normal card composition. */\n#detail-dialog [data-detail-image-stage] { position:relative; }\n#detail-dialog .detail-image-feedback { position:absolute; inset:0; z-index:4; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:12px; padding:20px; text-align:center; color:var(--detail-muted); background:none; }\n#detail-dialog .detail-image-feedback[hidden] { display:none; }\n#detail-dialog .detail-image-feedback p { margin:0; font-size:11px; line-height:1.5; }\n#detail-dialog .detail-image-feedback .button-secondary { min-height:34px; padding:7px 12px; font-size:11px; border-radius:999px; }\n#detail-dialog [data-image-state=\"error\"] .detail-plan-markers { visibility:hidden; pointer-events:none; }\n#detail-dialog [data-image-state=\"error\"] :is(.detail-plan-image,.detail-floor-image) { visibility:hidden; }\n\n/* Shared paper-glass material, matching the list and orbitdata. Preserve the\n   fitted card geometry: optical layers never add room or toolbar padding. */\n:root, :host {\n  --card-glass-blur: none;\n  --card-glass-edge: color-mix(in srgb, var(--detail-top) 88%, transparent);\n  --card-glass-rule: color-mix(in srgb, var(--detail-ink) 12%, transparent);\n  --card-glass-fill: color-mix(in srgb, var(--detail-top) 96%, transparent);\n  --card-glass-sheen: radial-gradient(130% 100% at 0% 0%, rgb(255 255 255 / 30%), transparent 48%), radial-gradient(110% 130% at 100% 100%, rgb(255 255 255 / 18%), transparent 52%), linear-gradient(150deg, rgb(255 255 255 / 18%), rgb(255 255 255 / 2%) 46%, rgb(255 255 255 / 12%));\n  --card-glass-inset: inset 0 1px 1px rgb(255 255 255 / 85%), inset 0 -1px 1px color-mix(in srgb, var(--detail-ink) 7%, transparent);\n  --card-glass-lift: var(--card-glass-inset), 0 9px 28px color-mix(in srgb, var(--detail-ink) 10%, transparent), 0 1px 3px color-mix(in srgb, var(--detail-ink) 5%, transparent);\n}\n@supports ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {\n  :root, :host { --card-glass-blur: blur(16px) saturate(145%); --card-glass-fill: color-mix(in srgb, var(--detail-top) 94%, transparent); }\n}\n#detail-dialog {\n  border-color: var(--card-glass-edge);\n  border-radius: 25px;\n  background: transparent;\n  box-shadow: var(--card-glass-inset), 0 28px 90px color-mix(in srgb, var(--detail-ink) 22%, transparent), 0 3px 12px color-mix(in srgb, var(--detail-ink) 9%, transparent);\n}\n/* Blur only the decorative sibling. A filtered dialog would change the\n   containing block of the share menu, whose coordinates use the viewport. */\n#detail-dialog::before {\n  content: ''; position: absolute; inset: 0; z-index: 0; border-radius: inherit; pointer-events: none;\n  background: var(--card-glass-sheen), linear-gradient(155deg, var(--card-glass-fill), color-mix(in srgb, var(--detail-bottom) 32%, var(--detail-top)));\n  -webkit-backdrop-filter: var(--card-glass-blur); backdrop-filter: var(--card-glass-blur);\n}\n#detail-dialog .detail-shell { z-index: 1; }\n#detail-dialog:not([open])::before { display: none; }\n#detail-dialog::backdrop { background: color-mix(in srgb, var(--detail-ink) 32%, transparent); -webkit-backdrop-filter: blur(8px); backdrop-filter: blur(8px); }\n#detail-dialog .detail-brand-motif { opacity: .25; }\n#detail-dialog .detail-divider { background: var(--card-glass-rule); box-shadow: 0 1px 0 rgb(255 255 255 / 65%); }\n#detail-dialog .detail-price {\n  border-radius: 999px;\n  background: var(--card-glass-sheen), color-mix(in srgb, var(--detail-top) 60%, transparent);\n  box-shadow: var(--card-glass-inset), 0 2px 8px color-mix(in srgb, var(--detail-ink) 4%, transparent);\n}\n#detail-dialog .price-value { font-weight: 500; }\n#detail-dialog .dialog-close,\n#detail-dialog .detail-footer .footer-pill,\n#detail-dialog .room-pagination button,\n#detail-dialog .detail-image-feedback .button-secondary,\n#detail-dialog .share-heading > button {\n  border-color: color-mix(in srgb, var(--detail-ink) 16%, transparent);\n  border-radius: 999px;\n  background: var(--card-glass-sheen), color-mix(in srgb, var(--detail-top) 62%, transparent);\n  box-shadow: var(--card-glass-inset), 0 2px 6px color-mix(in srgb, var(--detail-ink) 5%, transparent);\n  transition: background .16s ease, box-shadow .16s ease, border-color .16s ease;\n}\n#detail-dialog .dialog-close { border: 1px solid var(--card-glass-edge); }\n#detail-dialog .detail-footer .footer-pill:hover,\n#detail-dialog .detail-footer .share-button[aria-expanded=\"true\"],\n#detail-dialog .dialog-close:hover,\n#detail-dialog .room-pagination button:not(:disabled):hover { border-color: color-mix(in srgb, var(--detail-ink) 30%, transparent); background: var(--card-glass-sheen), color-mix(in srgb, var(--detail-top) 90%, transparent); }\n#detail-dialog :is(.detail-room-tabs, .detail-summary-tabs, .detail-panel-nav) button {\n  border-bottom-color: transparent;\n  border-radius: 999px;\n  box-shadow: none;\n  transition: background .16s ease, box-shadow .16s ease, color .16s ease;\n}\n#detail-dialog :is(.detail-room-tabs, .detail-summary-tabs, .detail-panel-nav) button:is([aria-selected=\"true\"], .is-active) {\n  border-bottom-color: transparent;\n  background: var(--card-glass-sheen), color-mix(in srgb, var(--detail-top) 70%, transparent);\n  box-shadow: var(--card-glass-inset), 0 2px 7px color-mix(in srgb, var(--detail-ink) 5%, transparent);\n  color: var(--detail-ink);\n}\n#detail-dialog .detail-panel-nav { border-bottom-color: var(--card-glass-rule); }\n#detail-dialog .room-number,\n#detail-dialog .room-marker::before {\n  border-color: color-mix(in srgb, var(--detail-ink) 25%, var(--detail-top));\n  background: var(--card-glass-sheen), color-mix(in srgb, var(--detail-top) 94%, transparent);\n  box-shadow: inset 0 1px 0 rgb(255 255 255 / 85%), 0 1px 4px color-mix(in srgb, var(--detail-ink) 7%, transparent);\n}\n#detail-dialog .room-legend-button, #detail-dialog .unit-room-list li { border-bottom-color: var(--card-glass-rule); }\n#detail-dialog .room-legend-button:is(:hover, .is-active) { background: linear-gradient(110deg, color-mix(in srgb, var(--detail-top) 70%, transparent), transparent); }\n#detail-dialog .room-legend-button.is-active .room-number,\n#detail-dialog .room-marker.is-active::before { border-color: var(--detail-ink); background: var(--detail-ink); box-shadow: inset 0 1px 0 rgb(255 255 255 / 20%), 0 1px 5px color-mix(in srgb, var(--detail-ink) 15%, transparent); }\n#detail-dialog .share-popover, #detail-dialog .inquiry-pending {\n  border-color: var(--card-glass-edge); border-radius: 20px;\n  background: var(--card-glass-sheen), color-mix(in srgb, var(--detail-top) 97%, transparent);\n  box-shadow: var(--card-glass-lift);\n}\n#detail-dialog .share-url { border-color: var(--card-glass-rule); border-radius: 999px; background: color-mix(in srgb, var(--detail-top) 70%, transparent); }\n#detail-dialog .share-options > :is(button, a) { border-bottom-color: var(--card-glass-rule); }\n.toast, #detail-dialog .detail-feedback { border: 1px solid var(--card-glass-edge); border-radius: 999px; background: var(--card-glass-sheen), var(--card-glass-fill); color: var(--detail-ink); box-shadow: var(--card-glass-lift); }\n.media-dialog { background: radial-gradient(ellipse at 15% 0, color-mix(in srgb, var(--detail-bottom) 45%, transparent), transparent 70%), var(--detail-top); }\n.media-header, .media-footer { border-color: var(--card-glass-rule); background: var(--card-glass-sheen), var(--card-glass-fill); }\n.media-zoom, .media-header .dialog-close { border-color: var(--card-glass-rule); border-radius: 999px; background: var(--card-glass-sheen), color-mix(in srgb, var(--detail-top) 70%, transparent); box-shadow: var(--card-glass-inset); }\n@media (pointer: coarse) {\n  :root, :host { --card-glass-blur: blur(12px) saturate(135%); }\n}\n@media (prefers-reduced-transparency: reduce) {\n  :root, :host { --card-glass-blur: none; --card-glass-fill: var(--detail-top); }\n  #detail-dialog::before { background-color: var(--detail-top); }\n  #detail-dialog::backdrop { -webkit-backdrop-filter: none; backdrop-filter: none; }\n  #detail-dialog :is(.detail-price, .footer-pill, .dialog-close, .share-popover, .inquiry-pending, .room-pagination button, .detail-feedback), .toast { background-color: var(--detail-top); }\n}\n@media (forced-colors: active) {\n  #detail-dialog, #detail-dialog :is(.footer-pill, .dialog-close, .room-pagination button, .share-popover, .inquiry-pending) { border: 1px solid CanvasText; box-shadow: none; }\n  #detail-dialog .room-legend-button.is-active .room-number, #detail-dialog .room-marker.is-active::before { background: Highlight; color: HighlightText; }\n}\n\n/* Mobile keeps the drawing tall: quiet metadata runs beside the image,\n   while the room tab has one numbered apartment-area list. */\n@media (max-width: 1100px), (max-height: 600px) {\n  #detail-dialog .detail-topbar { left: 12px; right: 12px; display: flex; align-items: flex-start; justify-content: space-between; height: 40px; }\n  #detail-dialog .detail-top-actions { margin-left: auto; }\n  #detail-dialog .dialog-close { width: 40px; height: 40px; }\n  #detail-dialog .detail-shell[data-panel=\"plan\"] .detail-drawing { display: grid; grid-template-columns: minmax(0, 1fr) 58px; grid-template-rows: minmax(0, 1fr); gap: 3px 8px; }\n  #detail-dialog .detail-drawing-toolbar { display: contents; }\n  #detail-dialog .detail-drawing-toolbar .detail-unit-meta { grid-column: 2; grid-row: 1; display: flex; flex-direction: column; justify-content: center; align-self: stretch; gap: 12px; width: auto; min-width: 0; margin: 0; font-size: 9px; line-height: 1.35; text-align: left; }\n  #detail-dialog .detail-unit-meta .detail-meta-item { display: block; margin: 0; }\n  #detail-dialog .detail-unit-meta .detail-meta-item strong { display: block; color: var(--detail-ink); font-size: 11px; font-weight: 600; }\n  #detail-dialog .detail-unit-meta .detail-meta-separator { display: none; }\n  #detail-dialog .detail-plan-stage { place-items: center; }\n  #detail-dialog .detail-metrics dd, #detail-dialog .detail-metrics.has-garden dd { white-space: nowrap; }\n  #detail-dialog .detail-metrics dd small { display: inline; margin-left: 2px; font-size: 11px; line-height: 1; }\n  #detail-dialog .detail-metrics.has-garden dt { min-height: 0; }\n  #detail-dialog .detail-metrics.has-garden .detail-id-metric dt { white-space: nowrap; }\n  #detail-dialog .detail-room-panel { padding-top: 0; }\n  #detail-dialog .detail-rooms { display: flex; flex: 1; flex-direction: column; min-width: 0; min-height: 0; }\n  #detail-dialog .detail-rooms > h3 { min-height: 0; margin: 0 0 5px; padding: 0; color: var(--detail-ink); font-size: 13px; font-weight: 400; line-height: 1.3; }\n  #detail-dialog .detail-rooms .room-legend-button { grid-template-columns: var(--room-circle, 18px) minmax(0, 1fr) auto; gap: 6px; }\n  #detail-dialog .detail-rooms .room-page { min-height: 0; }\n  #detail-dialog .detail-shell[data-panel=\"rooms\"] .detail-panel-nav { justify-content: center; padding-right: 0; }\n  #detail-dialog .detail-price .price-value { display: inline; color: var(--detail-ink); font-size: 25px; font-weight: 500; letter-spacing: -.7px; line-height: 1.1; white-space: nowrap; }\n  #detail-dialog .detail-price .price-unit { display: inline; color: var(--detail-ink); font-size: 11px; font-weight: 400; line-height: 1.3; }\n  #detail-dialog .detail-footer { grid-template-columns: minmax(0, 1fr) minmax(70px, .9fr) minmax(0, 1fr); gap: 5px; }\n  #detail-dialog .detail-footer .footer-pill { height: 40px; min-height: 40px; max-height: 40px; padding: 5px 6px; font-size: 10px; }\n  #detail-dialog .detail-status { min-height: 40px; }\n  #detail-dialog .detail-status .status-pill { font-size: 12px; line-height: 1.15; }\n  #detail-dialog .detail-illustration-note { left: 10px; right: 10px; width: auto; max-width: none; text-align: center; }\n}\n@media (max-width: 600px) {\n  #detail-dialog { width: 94vw; }\n  #detail-dialog .detail-layout { padding: 54px 10px 22px; row-gap: 5px; }\n  #detail-dialog .detail-core { gap: 0; }\n  #detail-dialog .detail-identity { position: absolute; top: 9px; left: 50%; width: 100px; transform: translateX(-50%); }\n  #detail-dialog .detail-identity .detail-logo { width: 100px; }\n  #detail-dialog .detail-metrics dt { margin-bottom: 3px; font-size: 12px; line-height: 1.3; }\n  #detail-dialog .detail-metrics dd { font-size: 21px; }\n  #detail-dialog .detail-metrics.has-garden dd { font-size: clamp(14px, 4.2vw, 19px); letter-spacing: -.6px; }\n  #detail-dialog .detail-metrics.has-garden dd small { font-size: 10px; }\n  #detail-dialog .detail-shell[data-panel=\"plan\"] .detail-drawing { grid-template-columns: minmax(0, 1fr) 40px; gap: 2px 5px; }\n  #detail-dialog .detail-drawing-toolbar .detail-unit-meta { gap: 10px; font-size: 8px; }\n  #detail-dialog .detail-unit-meta .detail-meta-item strong { font-size: 10px; }\n  #detail-dialog .detail-illustration-note { font-size: 8px; }\n}\n@media (max-width: 600px) and (max-height: 700px) {\n  #detail-dialog .detail-layout { grid-template-rows: auto 1px 28px minmax(0, 1fr) auto; padding-top: 49px; row-gap: 3px; }\n  #detail-dialog .detail-identity { width: 90px; }\n  #detail-dialog .detail-identity .detail-logo { width: 90px; }\n  #detail-dialog .detail-core { gap: 0; }\n  #detail-dialog .detail-metrics dd { font-size: 19px; }\n  #detail-dialog .detail-metrics.has-garden dd { font-size: clamp(14px, 4.2vw, 17px); }\n  #detail-dialog .detail-conversion { row-gap: 4px; }\n  #detail-dialog .detail-price .price-value { font-size: 23px; }\n  #detail-dialog .detail-footer .footer-pill { height: 38px; min-height: 38px; max-height: 38px; }\n  #detail-dialog .detail-status { min-height: 38px; }\n}\n@media (max-width: 360px) {\n}\n@media (max-height: 600px) and (min-width: 601px), (max-height: 450px) and (min-width: 450px) {\n  #detail-dialog .detail-layout { grid-template-columns: var(--detail-landscape-rail) minmax(0, 1fr); grid-template-rows: 28px minmax(0, 1fr); gap: 8px 12px; padding: 12px 12px 26px; }\n  #detail-dialog .detail-room-panel { grid-area: auto; position: absolute; left: calc(12px + var(--detail-landscape-rail) + 12px); right: 12px; top: 50px; bottom: 26px; }\n  #detail-dialog .detail-core { padding-top: 28px; }\n  #detail-dialog .detail-identity { position: static; left: auto; top: auto; width: 100%; transform: none; }\n  #detail-dialog .detail-panel-nav { padding-right: 48px; gap: 4px; }\n  #detail-dialog .detail-panel-nav button { min-width: 0; padding-inline: 5px; font-size: 10px; }\n  #detail-dialog .detail-rooms > h3 { font-size: 12px; }\n  #detail-dialog .detail-price .price-value { font-size: 22px; }\n  #detail-dialog .detail-drawing-toolbar .detail-unit-meta { gap: 7px; }\n}\n\n/* Mobile side rail: drawing controls and apartment metadata are separate\n   vertical groups, leaving the former tab row available to the drawing. */\n@media (max-width: 1100px), (max-height: 600px) {\n  #detail-dialog .detail-layout { --detail-side-width: 58px; --detail-side-gap: 8px; grid-template-columns: minmax(0, 1fr) var(--detail-side-width); grid-template-rows: auto 1px minmax(0, 1fr) auto; gap: 8px var(--detail-side-gap); }\n  #detail-dialog .detail-core { grid-column: 1 / -1; grid-row: 1; }\n  #detail-dialog .detail-area-row { border-top: 1px solid var(--card-glass-rule); padding-top: 7px; }\n  #detail-dialog .detail-divider { grid-column: 1 / -1; grid-row: 2; }\n  #detail-dialog .detail-panel-nav, #detail-dialog .detail-shell[data-panel=\"rooms\"] .detail-panel-nav { grid-column: 2; grid-row: 3; z-index: 5; align-self: start; display: flex; flex-direction: column; align-items: stretch; justify-content: flex-start; gap: 4px; width: 100%; min-width: 0; margin: 0; padding: 0 0 8px; border: 0; border-bottom: 1px solid var(--card-glass-rule); }\n  #detail-dialog .detail-panel-nav button { width: 100%; min-width: 0; min-height: 30px; margin: 0; padding: 4px 2px; border: 1px solid color-mix(in srgb, var(--detail-ink) 10%, transparent); background: color-mix(in srgb, var(--detail-top) 24%, transparent); font-size: 9px; line-height: 1.15; text-align: center; }\n  #detail-dialog .detail-layout > .detail-drawing, #detail-dialog .detail-shell[data-panel=\"plan\"] .detail-drawing { grid-column: 1 / -1; grid-row: 3; grid-template-columns: minmax(0, 1fr) var(--detail-side-width); gap: 0 var(--detail-side-gap); }\n  #detail-dialog .detail-drawing-toolbar .detail-unit-meta { grid-column: 2; grid-row: 1; justify-content: flex-start; padding-top: 112px; gap: 8px; }\n  #detail-dialog .detail-layout .detail-room-panel { grid-column: 1; grid-row: 3; width: auto; }\n  #detail-dialog .detail-rooms .room-page { --room-column-width: 110px; }\n  #detail-dialog .detail-rooms .room-name { overflow-wrap: anywhere; }\n  #detail-dialog .detail-shell[data-panel=\"rooms\"] .detail-drawing { display: contents; }\n  #detail-dialog .detail-shell[data-panel=\"rooms\"] .detail-unit-meta { grid-column: 2; grid-row: 3; }\n  #detail-dialog .detail-conversion { grid-column: 1 / -1; grid-row: 4; }\n}\n@media (max-width: 600px) {\n  #detail-dialog .detail-layout { --detail-side-width: 40px; --detail-side-gap: 5px; row-gap: 5px; }\n  #detail-dialog .detail-panel-nav button { font-size: 9px; padding-inline: 1px; }\n  #detail-dialog .detail-drawing-toolbar .detail-unit-meta { font-size: 8px; gap: 6px; }\n}\n@media (max-width: 600px) and (max-height: 700px) {\n  #detail-dialog .detail-layout { grid-template-rows: auto 1px minmax(0, 1fr) auto; row-gap: 3px; }\n}\n@media (max-width: 360px) {\n  #detail-dialog .detail-rooms .room-legend-button { grid-template-columns: 14px minmax(0, 1fr) auto; gap: 2px; }\n  #detail-dialog .detail-rooms .room-name { font-size: 10px; }\n  #detail-dialog .detail-rooms .room-area { font-size: 8.5px; }\n}\n@media (max-height: 600px) and (min-width: 601px), (max-height: 450px) and (min-width: 450px) {\n  #detail-dialog .detail-layout { --detail-side-width: 40px; --detail-side-gap: 5px; grid-template-columns: var(--detail-landscape-rail) minmax(0, 1fr); grid-template-rows: minmax(0, 1fr); gap: 0 12px; }\n  #detail-dialog .detail-sidebar { grid-column: 1; grid-row: 1; }\n  #detail-dialog .detail-core { grid-column: 1; grid-row: 1; }\n  #detail-dialog .detail-divider { grid-column: 1; grid-row: 2; }\n  #detail-dialog .detail-conversion { grid-column: 1; grid-row: 4; }\n  #detail-dialog .detail-layout > .detail-drawing, #detail-dialog .detail-shell[data-panel=\"plan\"] .detail-drawing { grid-column: 2; grid-row: 1; }\n  #detail-dialog .detail-panel-nav, #detail-dialog .detail-shell[data-panel=\"rooms\"] .detail-panel-nav { position: absolute; top: 42px; right: 0; width: var(--detail-side-width); grid-area: auto; gap: 3px; }\n  #detail-dialog .detail-panel-nav button { min-height: 28px; padding: 3px 1px; font-size: 8.5px; }\n  #detail-dialog .detail-drawing-toolbar .detail-unit-meta { padding-top: 146px; gap: 4px; font-size: 8px; }\n  #detail-dialog .detail-unit-meta .detail-meta-item strong { font-size: 10px; }\n  #detail-dialog .detail-layout .detail-room-panel { grid-area: auto; left: calc(12px + var(--detail-landscape-rail) + 12px); right: calc(12px + var(--detail-side-width) + var(--detail-side-gap)); top: 12px; bottom: 26px; }\n  #detail-dialog .detail-shell[data-panel=\"rooms\"] .detail-unit-meta { grid-column: 2; grid-row: 1; justify-self: end; width: var(--detail-side-width); }\n}\n\n\n:where(#detail-dialog .inquiry-button.admiral-frosted-button) { min-height: 44px; padding: 10px 22px; font-size: 14px; }\n#detail-dialog .inquiry-button.admiral-frosted-button {\n  box-sizing: border-box;\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n  border: 1px solid #bdcfd3;\n  border-color: color-mix(in srgb, var(--frosted-button-tint, #7395a0) 42%, white);\n  border-radius: 999px;\n  background: linear-gradient(145deg, rgb(255 255 255 / 80%), rgb(255 255 255 / 14%) 55%, rgb(255 255 255 / 42%)), #dce6e8;\n  background: linear-gradient(145deg, rgb(255 255 255 / 80%), rgb(255 255 255 / 14%) 55%, rgb(255 255 255 / 42%)), color-mix(in srgb, var(--frosted-button-tint, #7395a0) 25%, rgb(255 255 255 / 68%));\n  color: var(--frosted-button-text, #183b43);\n  -webkit-backdrop-filter: blur(18px) saturate(115%);\n  backdrop-filter: blur(18px) saturate(115%);\n  box-shadow: inset 0 1px 1px rgb(255 255 255 / 95%), inset 0 -1px 0 rgb(24 59 67 / 9%), 0 3px 9px rgb(24 59 67 / 9%);\n  font-family: 'Montserrat', Arial, sans-serif;\n  font-size: 14px;\n  font-weight: 600;\n  letter-spacing: -.015em;\n  line-height: 1.3;\n  text-align: center;\n  text-decoration: none;\n  white-space: nowrap;\n  cursor: pointer;\n  touch-action: manipulation;\n  -webkit-tap-highlight-color: transparent;\n  transition: background .18s ease, border-color .18s ease, box-shadow .18s ease, transform .18s ease;\n}\n#detail-dialog .inquiry-button.admiral-frosted-button:focus-visible {\n  outline: 2px solid var(--frosted-button-text, #183b43);\n  outline-offset: 4px;\n  border-color: var(--frosted-button-tint, #7395a0);\n  box-shadow: inset 0 1px 1px white, 0 0 0 3px rgb(255 255 255 / 75%), 0 4px 12px rgb(24 59 67 / 15%);\n}\n@media (hover: hover) {\n  #detail-dialog .inquiry-button.admiral-frosted-button:not(:disabled):not([aria-disabled=\"true\"]):hover {\n    border-color: color-mix(in srgb, var(--frosted-button-tint, #7395a0) 70%, white);\n    background: linear-gradient(145deg, rgb(255 255 255 / 90%), rgb(255 255 255 / 28%) 55%, rgb(255 255 255 / 58%)), color-mix(in srgb, var(--frosted-button-tint, #7395a0) 33%, rgb(255 255 255 / 75%));\n    box-shadow: inset 0 1px 1px white, inset 0 -1px 0 rgb(24 59 67 / 10%), 0 5px 14px rgb(24 59 67 / 14%);\n  }\n}\n#detail-dialog .inquiry-button.admiral-frosted-button:not(:disabled):not([aria-disabled=\"true\"]):active { transform: translateY(1px); box-shadow: inset 0 1px 3px rgb(24 59 67 / 14%), 0 1px 3px rgb(24 59 67 / 7%); }\n#detail-dialog .inquiry-button.admiral-frosted-button:disabled, #detail-dialog .inquiry-button.admiral-frosted-button[aria-disabled=\"true\"] { opacity: .48; cursor: not-allowed; pointer-events: none; }\n@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {\n  #detail-dialog .inquiry-button.admiral-frosted-button { background: linear-gradient(145deg, rgb(255 255 255 / 60%), transparent 65%), #dce6e8; background: linear-gradient(145deg, rgb(255 255 255 / 60%), transparent 65%), color-mix(in srgb, var(--frosted-button-tint, #7395a0) 22%, white); }\n}\n@media (prefers-reduced-motion: reduce) {\n  #detail-dialog .inquiry-button.admiral-frosted-button { transition: none; }\n  #detail-dialog .inquiry-button.admiral-frosted-button:not(:disabled):not([aria-disabled=\"true\"]):active { transform: none; }\n}\n@media (prefers-reduced-transparency: reduce) {\n  #detail-dialog .inquiry-button.admiral-frosted-button, #detail-dialog .inquiry-button.admiral-frosted-button:not(:disabled):not([aria-disabled=\"true\"]):hover {\n    background: #dce6e8;\n    background: color-mix(in srgb, var(--frosted-button-tint, #7395a0) 20%, white);\n    -webkit-backdrop-filter: none; backdrop-filter: none;\n  }\n}\n@media (forced-colors: active) {\n  #detail-dialog .inquiry-button.admiral-frosted-button, #detail-dialog .inquiry-button.admiral-frosted-button:not(:disabled):not([aria-disabled=\"true\"]):hover {\n    border: 1px solid ButtonText; background: ButtonFace; color: ButtonText;\n    -webkit-backdrop-filter: none; backdrop-filter: none; box-shadow: none;\n  }\n  #detail-dialog .inquiry-button.admiral-frosted-button:focus-visible { outline-color: Highlight; }\n  #detail-dialog .inquiry-button.admiral-frosted-button:disabled, #detail-dialog .inquiry-button.admiral-frosted-button[aria-disabled=\"true\"] { border-color: GrayText; color: GrayText; opacity: 1; }\n}\n\n#detail-dialog { --detail-control-blue: #225d82; }\n#detail-dialog .detail-topbar {\n  left: 12px; right: 12px; display: flex; align-items: flex-start; justify-content: space-between; height: 44px;\n}\n#detail-dialog .detail-top-save { display: flex; align-items: center; min-width: 0; pointer-events: auto; }\n#detail-dialog .detail-top-save .save-button {\n  display: inline-flex; align-items: center; justify-content: center; gap: 7px;\n  width: auto; min-width: 44px; height: 44px; min-height: 44px; padding: 4px 8px;\n  border-radius: 999px; color: var(--detail-control-blue);\n  transition: background-color .16s ease;\n}\n#detail-dialog .detail-top-save .save-button svg { width: 23px; height: 23px; flex-shrink: 0; }\n#detail-dialog .detail-top-save .detail-save-label { max-width: 96px; color: inherit; font-size: 11px; font-weight: 550; overflow-wrap: normal; }\n#detail-dialog .detail-top-save .save-button.is-saved { background-color: rgb(34 93 130 / 9%); }\n\n#detail-dialog .detail-unit-meta .detail-meta-orientation { color: var(--detail-control-blue); font-size: 1.16em; font-weight: 550; }\n#detail-dialog .detail-unit-meta .detail-meta-orientation strong { color: inherit; font-size: 1.2em; font-weight: 700; }\n\n#detail-dialog .detail-plan-switcher {\n  position: relative; display: grid; flex: 1; min-width: 0; min-height: 0;\n  grid-template-columns: minmax(0, 1fr); grid-template-rows: minmax(0, 1fr);\n}\n#detail-dialog .detail-plan-switcher[data-switchable] {\n  grid-template-columns: 44px minmax(0, 1fr) 44px; column-gap: 6px;\n}\n#detail-dialog .detail-plan-documents { display: flex; flex-direction: column; grid-column: 1; grid-row: 1; min-width: 0; min-height: 0; }\n#detail-dialog .detail-plan-switcher[data-switchable] .detail-plan-documents { grid-column: 2; }\n#detail-dialog .detail-plan-arrow {\n  display: grid; place-items: center; grid-row: 1; justify-self: center; align-self: center;\n  width: 44px; height: 44px; padding: 0; border: 0; border-radius: 50%;\n  color: var(--detail-control-blue); background: none;\n}\n#detail-dialog .detail-plan-arrow[data-plan-step=\"-1\"] { grid-column: 1; }\n#detail-dialog .detail-plan-arrow[data-plan-step=\"1\"] { grid-column: 3; }\n#detail-dialog .detail-plan-arrow > span {\n  display: grid; place-items: center; width: 38px; height: 38px;\n  border: 1px solid rgb(34 93 130 / 31%); border-radius: 50%;\n  background: var(--card-glass-sheen), #f6fbfd; box-shadow: 0 3px 10px rgb(34 93 130 / 13%);\n  transition: background-color .16s ease, border-color .16s ease, box-shadow .16s ease;\n}\n#detail-dialog .detail-plan-arrow[data-plan-step=\"-1\"] svg { transform: rotate(180deg); }\n#detail-dialog :is(.detail-plan-arrow, .detail-top-save .save-button):focus-visible { outline: 2px solid var(--detail-control-blue); outline-offset: -2px; }\n@media (hover: hover) {\n  #detail-dialog .detail-top-save .save-button:hover { background-color: rgb(34 93 130 / 14%); }\n  #detail-dialog .detail-plan-arrow:hover > span { border-color: var(--detail-control-blue); background-color: #dbeef7; box-shadow: 0 3px 12px rgb(34 93 130 / 22%); }\n}\n@media (max-width: 1100px), (max-height: 600px) {\n  #detail-dialog .detail-drawing > .detail-plan-switcher { grid-column: 1; grid-row: 1; }\n  #detail-dialog .detail-shell[data-panel=\"rooms\"] .detail-plan-switcher { display: none; }\n  #detail-dialog .detail-drawing-toolbar .detail-unit-meta { padding-top: 82px; }\n}\n@media (max-width: 600px) {\n  #detail-dialog .detail-plan-switcher[data-switchable] { grid-template-columns: 34px minmax(0, 1fr) 34px; column-gap: 5px; }\n  #detail-dialog .detail-plan-arrow > span { width: 32px; height: 32px; }\n  #detail-dialog .detail-top-save .detail-save-label { max-width: 84px; font-size: 10px; }\n}\n@media (max-width: 430px), (max-height: 600px) and (min-width: 601px), (max-height: 450px) and (min-width: 450px) {\n  #detail-dialog .detail-top-save .detail-save-label { display: none; }\n}\n@media (max-height: 600px) and (min-width: 601px), (max-height: 450px) and (min-width: 450px) {\n  #detail-dialog .detail-drawing-toolbar .detail-unit-meta { padding-top: 113px; }\n}\n@media (forced-colors: active) {\n  #detail-dialog .detail-plan-arrow > span { border-color: ButtonText; background: Canvas; box-shadow: none; }\n  #detail-dialog .detail-top-save .save-button.is-saved { color: Highlight; }\n}\n\n#detail-dialog .detail-floor-viewport {\n  position: relative;\n  flex: 1;\n  min-height: 0;\n  overflow: hidden;\n  isolation: isolate;\n}\n#detail-dialog .detail-floor-sheet {\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  width: 2560px;\n  height: 1600px;\n  transform-origin: 0 0;\n  transform: var(--floor-overview-transform, scale(0));\n  clip-path: inset(0px 0px 0px 0px);\n}\n#detail-dialog .detail-floor-viewport[data-view-sized] .detail-floor-sheet {\n  transition: transform .66s cubic-bezier(.22,.76,.26,1), clip-path .66s cubic-bezier(.22,.76,.26,1);\n}\n#detail-dialog[data-document-view=\"building\"] .detail-floor-sheet {\n  transform: var(--floor-building-transform, scale(0));\n  clip-path: var(--floor-building-clip);\n}\n#detail-dialog .detail-floor-sheet > :is(.detail-floor-image, .detail-floor-locations) {\n  position: absolute;\n  inset: 0;\n  display: block;\n  width: 100%;\n  height: 100%;\n  margin: 0;\n  border: 0;\n}\n#detail-dialog .detail-floor-locations {\n  pointer-events: none;\n  opacity: 0;\n}\n#detail-dialog [data-image-state=\"ready\"] .detail-floor-locations { opacity: 1; }\n#detail-dialog .detail-floor-map-labels { transition: opacity .22s ease-out; }\n#detail-dialog[data-document-view=\"building\"] .detail-floor-map-labels {\n  opacity: 0;\n  visibility: hidden;\n  transition: opacity .18s ease-out, visibility 0s .18s;\n}\n#detail-dialog .detail-floor-map-labels text {\n  fill: #214763;\n  font-family: inherit;\n  font-weight: 700;\n  text-anchor: middle;\n}\n#detail-dialog .detail-floor-map-labels circle {\n  fill: #f9fcff;\n  stroke: #577b95;\n  stroke-width: 3;\n}\n#detail-dialog .detail-floor-compass-arrow { fill: #214763; }\n@media (prefers-reduced-motion: reduce) {\n  #detail-dialog .detail-floor-viewport[data-view-sized] .detail-floor-sheet,\n  #detail-dialog .detail-floor-map-labels {\n    transition: none;\n  }\n}\n@media (forced-colors: active) {\n  #detail-dialog .detail-floor-location { stroke: Highlight; fill: transparent; }\n}\n\n#detail-dialog .detail-floor-viewport {\n  --floor-outline-multiplier: var(--floor-overview-stroke, 1);\n}\n#detail-dialog[data-document-view=\"building\"] .detail-floor-viewport {\n  --floor-outline-multiplier: var(--floor-building-stroke, 1);\n}\n#detail-dialog .detail-floor-location-halo,\n#detail-dialog .detail-floor-location {\n  fill: none;\n  stroke-linecap: round;\n  stroke-linejoin: round;\n  transition: stroke-width .66s cubic-bezier(.22,.76,.26,1);\n}\n#detail-dialog .detail-floor-location-halo {\n  stroke: #fff;\n  stroke-width: calc(var(--floor-outline-halo, 8px) * var(--floor-outline-multiplier));\n}\n#detail-dialog .detail-floor-location {\n  stroke: #00599f;\n  stroke-width: calc(var(--floor-outline-blue, 4.5px) * var(--floor-outline-multiplier));\n}\n#detail-dialog .detail-floor-legend {\n  position: absolute;\n  z-index: 1;\n  left: 50%;\n  bottom: 3px;\n  width: max-content;\n  max-width: calc(100% - 8px);\n  box-sizing: border-box;\n  transform: translateX(-50%);\n  padding: 9px 12px 8px;\n  border: 1px solid rgb(36 77 107 / 16%);\n  border-radius: 12px;\n  background: #fbfdff;\n  color: #294453;\n  font-size: 12px;\n  line-height: 1.3;\n  opacity: 0;\n  visibility: hidden;\n}\n#detail-dialog[data-document-view=\"floor\"] [data-image-state=\"ready\"] .detail-floor-legend {\n  opacity: 1;\n  visibility: visible;\n}\n#detail-dialog .detail-floor-legend[data-placement=\"center\"] {\n  left: var(--floor-legend-x);\n  top: var(--floor-legend-y);\n  bottom: auto;\n  transform: translate(-50%, -50%);\n}\n#detail-dialog .detail-floor-legend[data-placement=\"dock\"] {\n  max-height: var(--floor-legend-max-height);\n  overflow: auto;\n  overscroll-behavior: contain;\n}\n#detail-dialog .detail-floor-legend h3 {\n  margin: 0 0 4px;\n  color: #193e59;\n  font-size: 13px;\n  font-weight: 650;\n}\n#detail-dialog .detail-floor-legend table {\n  width: 100%;\n  border-collapse: collapse;\n  font-variant-numeric: tabular-nums;\n}\n#detail-dialog .detail-floor-legend :is(th, td) {\n  padding: 3px 0 3px 10px;\n  font-size: inherit;\n  text-align: right;\n  white-space: nowrap;\n}\n#detail-dialog .detail-floor-legend :is(th, td):first-child { padding-left: 0; text-align: left; }\n#detail-dialog .detail-floor-legend thead th { font-weight: 550; }\n#detail-dialog .detail-floor-legend tbody tr { border-top: 1px solid rgb(41 68 83 / 12%); }\n#detail-dialog .detail-floor-legend-type { display: inline-flex; align-items: center; gap: 6px; }\n#detail-dialog .detail-floor-legend-swatch {\n  display: inline-block;\n  flex: 0 0 12px;\n  height: 12px;\n  border: 1px solid rgb(26 49 80 / 32%);\n  border-radius: 3px;\n}\n#detail-dialog .detail-floor-legend-note { margin: 4px 0 0; color: #445961; font-size: 10.5px; }\n#detail-dialog .detail-floor-legend[tabindex]:focus-visible { outline: 2px solid #00599f; outline-offset: -2px; }\n@media (max-width: 1600px) {\n  #detail-dialog .detail-floor-legend { padding: 8px; }\n  #detail-dialog .detail-floor-legend :is(th, td) { padding-left: 7px; }\n}\n@media (max-width: 600px), (max-height: 480px) {\n  #detail-dialog .detail-floor-viewport { --floor-outline-halo: 5.5px; --floor-outline-blue: 3px; }\n  #detail-dialog .detail-floor-legend { padding: 6px 7px; font-size: 11px; line-height: 1.2; }\n  #detail-dialog .detail-floor-legend :is(th, td) { padding: 2px 0 2px 5px; }\n}\n@media (max-width: 360px) {\n  #detail-dialog .detail-floor-legend table { table-layout: fixed; }\n  #detail-dialog .detail-floor-legend :is(th, td) { padding: 1.5px 0 1.5px 2px; white-space: normal; }\n  #detail-dialog .detail-floor-legend :is(th, td):first-child { width: 25%; }\n  #detail-dialog .detail-floor-legend-type { gap: 3px; }\n  #detail-dialog .detail-floor-legend-swatch { flex-basis: 9px; height: 9px; }\n}\n@media (prefers-reduced-motion: reduce) {\n  #detail-dialog :is(.detail-floor-location, .detail-floor-location-halo) { transition: none; }\n}\n@media (forced-colors: active) {\n  #detail-dialog .detail-floor-location-halo { stroke: Canvas; }\n  #detail-dialog .detail-floor-location { stroke: Highlight; }\n  #detail-dialog .detail-floor-legend-swatch { forced-color-adjust: none; }\n}\n\n#detail-dialog {\n  --detail-drawing-space: clamp(12px, 2.2dvh, 20px);\n  --detail-meta-label-size: 12px;\n  --detail-meta-value-size: 15px;\n}\n#detail-dialog .detail-plan-switcher {\n  grid-template-rows: minmax(0, 1fr) auto;\n  padding-block-start: var(--detail-drawing-space);\n  row-gap: var(--detail-drawing-space);\n}\n#detail-dialog .detail-plan-switcher .detail-illustration-note {\n  position: static;\n  grid-column: 1 / -1;\n  grid-row: 2;\n  align-self: start;\n  justify-self: center;\n  width: fit-content;\n  max-width: 100%;\n  text-align: center;\n}\n#detail-dialog .detail-core .detail-area-row {\n  position: relative;\n  top: clamp(5px, 1.25dvh, 12px);\n}\n#detail-dialog .detail-id-metric .detail-apartment-number {\n  color: var(--detail-control-blue);\n  font-size: 1.06em;\n}\n#detail-dialog .detail-unit-meta .detail-meta-item {\n  color: var(--detail-control-blue);\n  font-size: var(--detail-meta-label-size);\n  font-weight: 550;\n}\n#detail-dialog .detail-unit-meta .detail-meta-item strong {\n  color: inherit;\n  font-size: var(--detail-meta-value-size);\n  font-weight: 700;\n}\n#detail-dialog .detail-unit-meta .detail-meta-separator {\n  color: var(--detail-control-blue);\n  opacity: .65;\n}\n#detail-dialog .detail-bottom-actions {\n  position: absolute;\n  z-index: 11;\n  left: 12px;\n  bottom: 5px;\n}\n#detail-dialog .detail-orbit-link {\n  display: inline-flex;\n  align-items: center;\n  justify-content: flex-start;\n  gap: 6px;\n  min-height: 34px;\n  padding: 4px 8px;\n  border-radius: 999px;\n  color: var(--detail-control-blue);\n  font-size: 11px;\n  font-weight: 550;\n  line-height: 1.2;\n  white-space: nowrap;\n  transition: background-color .16s ease;\n}\n#detail-dialog .detail-orbit-link svg { flex: 0 0 auto; }\n#detail-dialog .detail-orbit-link:focus-visible {\n  outline: 2px solid var(--detail-control-blue);\n  outline-offset: -2px;\n}\n@media (hover: hover) {\n  #detail-dialog .detail-orbit-link:hover { background-color: rgb(34 93 130 / 14%); }\n}\n@media (max-width: 1100px), (max-height: 600px) {\n  #detail-dialog {\n    --detail-drawing-space: clamp(4px, 1.02dvh, 10px);\n    --detail-meta-label-size: 10px;\n    --detail-meta-value-size: 13px;\n  }\n  #detail-dialog .detail-layout { padding-bottom: 42px; }\n  #detail-dialog .detail-core .detail-area-row { top: 2px; }\n  #detail-dialog .detail-unit-meta .detail-meta-item strong { overflow-wrap: anywhere; }\n  #detail-dialog .detail-orbit-link { min-height: 30px; }\n}\n@media (max-width: 600px), (max-height: 450px) {\n  #detail-dialog { --detail-meta-label-size: 9px; --detail-meta-value-size: 11px; }\n  #detail-dialog .detail-layout { --detail-side-width: 52px; }\n  #detail-dialog .detail-unit-meta .detail-meta-item .detail-meta-ground { white-space: nowrap; letter-spacing: -.2px; }\n}\n@media (prefers-reduced-motion: reduce) {\n  #detail-dialog .detail-orbit-link { transition: none; }\n}\n\n@media (max-width: 600px), (pointer: coarse) and (max-height: 450px) {\n  #detail-dialog {\n    max-width: calc(100vw - max(8px, env(safe-area-inset-left, 0px)) - max(8px, env(safe-area-inset-right, 0px)));\n    max-height: min(90dvh, calc(100dvh - max(8px, env(safe-area-inset-top, 0px)) - max(8px, env(safe-area-inset-bottom, 0px))));\n  }\n  #detail-dialog .detail-topbar { height: 44px; }\n  #detail-dialog .dialog-close, .media-dialog .dialog-close { width: 44px; height: 44px; }\n  #detail-dialog .detail-layout { padding-bottom: 50px; }\n  #detail-dialog .detail-panel-nav button { min-height: 44px; font-size: 10px; }\n  #detail-dialog .detail-drawing-toolbar .detail-unit-meta { padding-top: 104px; }\n  #detail-dialog .detail-footer .footer-pill { height: 44px; min-height: 44px; max-height: 44px; }\n  #detail-dialog .detail-orbit-link { min-height: 44px; }\n  .media-tabs button, .media-zoom button { min-height: 44px; }\n  .media-zoom button { min-width: 44px; }\n  .media-header { padding-top: max(12px, env(safe-area-inset-top, 0px)); }\n  .media-header, .media-footer {\n    padding-left: max(14px, env(safe-area-inset-left, 0px));\n    padding-right: max(14px, env(safe-area-inset-right, 0px));\n  }\n  .media-footer { padding-bottom: max(12px, env(safe-area-inset-bottom, 0px)); }\n}\n@media (max-width: 600px) and (orientation: portrait) {\n  #detail-dialog .detail-plan-switcher[data-switchable] { grid-template-columns: minmax(0, 1fr); row-gap: 4px; }\n  #detail-dialog .detail-plan-switcher[data-switchable] .detail-plan-documents { grid-column: 1; }\n  #detail-dialog .detail-plan-switcher .detail-plan-arrow[data-plan-step] { grid-column: 1; grid-row: 2; z-index: 1; }\n  #detail-dialog .detail-plan-arrow[data-plan-step=\"-1\"] { justify-self: start; }\n  #detail-dialog .detail-plan-arrow[data-plan-step=\"1\"] { justify-self: end; }\n  #detail-dialog .detail-plan-switcher[data-switchable] .detail-illustration-note {\n    align-self: center;\n    max-width: calc(100% - 96px);\n  }\n}\n@media (max-height: 450px) and (min-width: 450px) and (pointer: coarse) {\n  #detail-dialog .detail-panel-nav, #detail-dialog .detail-shell[data-panel=\"rooms\"] .detail-panel-nav { top: 58px; }\n  #detail-dialog .detail-drawing-toolbar .detail-unit-meta { padding-top: 154px; }\n  #detail-dialog .detail-bottom-actions { right: 12px; left: auto; }\n}\n\n/* Give the apartment number and price clear priority over labels while\n   keeping long room names and amounts comfortable to read on a phone. */\n@media (max-width: 600px), (pointer: coarse) and (max-height: 450px) {\n  #detail-dialog { --detail-meta-label-size: 10px; --detail-meta-value-size: 12px; }\n  #detail-dialog .detail-metrics dt { font-size: 11px; line-height: 1.25; }\n  #detail-dialog .detail-id-metric .detail-apartment-number { font-size: 1.15em; font-weight: 650; }\n  #detail-dialog .detail-price .price-value { font-variant-numeric: tabular-nums; }\n  #detail-dialog .detail-panel-nav button { font-size: 11px; font-weight: 550; }\n  #detail-dialog .detail-footer .footer-pill { font-size: 11px; }\n  #detail-dialog .detail-orbit-link { font-size: 12px; }\n  #detail-dialog .detail-illustration-note { font-size: 10px; line-height: 1.35; }\n  #detail-dialog .detail-rooms > h3 { font-size: 15px; }\n  #detail-dialog .detail-rooms .room-name { font-size: 12px; line-height: 1.3; }\n  #detail-dialog .detail-rooms .room-area { font-size: 11px; }\n  #detail-dialog .detail-rooms .room-number { font-size: 10px; }\n  .media-heading .eyebrow { font-size: 10px; letter-spacing: .09em; }\n  .media-heading h2 { font-size: 22px; font-weight: 500; }\n  .media-description, .media-tabs button, .media-footer > p { font-size: 12px; }\n}\n\n@media (max-width: 600px) and (orientation: portrait) {\n  #detail-dialog .detail-rooms .room-page { --room-column-width: 165px; }\n}\n"
const ORBIT_APARTMENT_CARD_SHELL = "<dialog id=\"detail-dialog\" class=\"apartment-dialog\" aria-label=\"Lakás részletei\"></dialog>\n<dialog id=\"media-dialog\" class=\"media-dialog\" aria-labelledby=\"media-title\"></dialog>\n<div id=\"toast\" class=\"toast\" role=\"status\" aria-live=\"polite\"></div>\n"

const DETAIL_ACTION_STYLES = `
/* The card's shadow root inherits the same inquiry material as the navbar. */
#detail-dialog .detail-conversion :is(.inquiry-button.admiral-frosted-button, .detail-footer .datasheet-link) {
  --card-inquiry-accent: var(--token-OWqJomPzk, #145083);
  color: #fff;
  background: linear-gradient(145deg, #2477b6, #145083 53%, #0d3a63);
  background: var(--admiral-inquiry-fill, linear-gradient(145deg, color-mix(in srgb, var(--card-inquiry-accent) 50%, #339de8), var(--card-inquiry-accent) 53%, color-mix(in srgb, var(--card-inquiry-accent) 65%, #001128)));
  border-color: var(--admiral-inquiry-rim, #1c496b);
  box-shadow: var(--admiral-inquiry-shadow, inset 0 1px 1px rgb(220 240 255 / 32%), inset 0 -1px 0 rgb(5 24 46 / 18%), 0 3px 9px rgb(14 53 82 / 28%));
  -webkit-backdrop-filter: none;
  backdrop-filter: none;
}
@media (hover: hover) {
  #detail-dialog .detail-conversion :is(.inquiry-button.admiral-frosted-button, .detail-footer .datasheet-link):not(:disabled):not([aria-disabled="true"]):hover {
    border-color: #6fa9db;
    background: linear-gradient(145deg, #1d537e, #113b64 53%, #0c294b);
    box-shadow: inset 0 1px 1px rgb(230 244 255 / 45%), 0 0 0 2px rgb(91 155 219 / 24%), 0 6px 16px rgb(10 44 79 / 38%);
  }
}
#detail-dialog .detail-conversion :is(.inquiry-button.admiral-frosted-button, .detail-footer .datasheet-link):not(:disabled):not([aria-disabled="true"]):active {
  background: #103654;
  box-shadow: inset 0 2px 4px rgb(3 20 36 / 28%), 0 1px 3px rgb(14 53 82 / 20%);
}
#detail-dialog .detail-conversion :is(.inquiry-button.admiral-frosted-button, .detail-footer .datasheet-link):focus-visible {
  outline: 2px solid #438dd3;
  outline-offset: 3px;
}
@media (forced-colors: active) {
  #detail-dialog .detail-conversion :is(.inquiry-button.admiral-frosted-button, .detail-footer .datasheet-link),
  #detail-dialog .detail-conversion :is(.inquiry-button.admiral-frosted-button, .detail-footer .datasheet-link):not(:disabled):not([aria-disabled="true"]):is(:hover, :active) {
    background: ButtonFace; color: ButtonText; border-color: ButtonText; box-shadow: none;
  }
  #detail-dialog .detail-conversion :is(.inquiry-button.admiral-frosted-button, .detail-footer .datasheet-link):focus-visible { outline-color: Highlight; }
}
`

const FLOOR_LAKE_STYLES = `
.detail-floor-lake {
  display: none;
  position: absolute;
  left: 50%;
  top: var(--floor-lake-y);
  width: var(--floor-lake-width);
  transform: translateX(-50%);
  align-items: center;
  gap: 9px;
  color: #285e80;
  font: 600 11px/14px 'Montserrat', Arial, sans-serif;
  letter-spacing: .07em;
  pointer-events: none;
}
#detail-dialog[data-document-view="floor"] [data-image-state="ready"] [data-view-sized] > .detail-floor-lake {
  display: flex;
}
.detail-floor-lake::before, .detail-floor-lake::after {
  content: "";
  flex: 1;
  border-top: 1px solid currentColor;
  opacity: .65;
}
`

// One shared source for imperative apartment actions and the standalone Framer button.
const FROSTED_BUTTON_DEFAULTS: any = (Object as any).freeze(({ tint: "#7395a0", text: "#183b43", fontSize: 14, letterSpacing: "-.015em" } as any));
const FROSTED_BUTTON_CSS: any = `
:where(.admiral-frosted-button) { min-height: 44px; padding: 10px 22px; font-size: 14px; }
.admiral-frosted-button {
  box-sizing: border-box;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: 1px solid #bdcfd3;
  border-color: color-mix(in srgb, var(--frosted-button-tint, ${FROSTED_BUTTON_DEFAULTS.tint}) 42%, white);
  border-radius: 999px;
  background: linear-gradient(145deg, rgb(255 255 255 / 80%), rgb(255 255 255 / 14%) 55%, rgb(255 255 255 / 42%)), #dce6e8;
  background: linear-gradient(145deg, rgb(255 255 255 / 80%), rgb(255 255 255 / 14%) 55%, rgb(255 255 255 / 42%)), color-mix(in srgb, var(--frosted-button-tint, ${FROSTED_BUTTON_DEFAULTS.tint}) 25%, rgb(255 255 255 / 68%));
  color: var(--frosted-button-text, ${FROSTED_BUTTON_DEFAULTS.text});
  -webkit-backdrop-filter: blur(18px) saturate(115%);
  backdrop-filter: blur(18px) saturate(115%);
  box-shadow: inset 0 1px 1px rgb(255 255 255 / 95%), inset 0 -1px 0 rgb(24 59 67 / 9%), 0 3px 9px rgb(24 59 67 / 9%);
  font-family: 'Montserrat', Arial, sans-serif;
  font-size: ${FROSTED_BUTTON_DEFAULTS.fontSize}px;
  font-weight: 600;
  letter-spacing: ${FROSTED_BUTTON_DEFAULTS.letterSpacing};
  line-height: 1.3;
  text-align: center;
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  transition: background .18s ease, border-color .18s ease, box-shadow .18s ease, transform .18s ease;
}
.admiral-frosted-button:focus-visible {
  outline: 2px solid var(--frosted-button-text, ${FROSTED_BUTTON_DEFAULTS.text});
  outline-offset: 4px;
  border-color: var(--frosted-button-tint, ${FROSTED_BUTTON_DEFAULTS.tint});
  box-shadow: inset 0 1px 1px white, 0 0 0 3px rgb(255 255 255 / 75%), 0 4px 12px rgb(24 59 67 / 15%);
}
@media (hover: hover) {
  .admiral-frosted-button:not(:disabled):not([aria-disabled="true"]):hover {
    border-color: color-mix(in srgb, var(--frosted-button-tint, ${FROSTED_BUTTON_DEFAULTS.tint}) 70%, white);
    background: linear-gradient(145deg, rgb(255 255 255 / 90%), rgb(255 255 255 / 28%) 55%, rgb(255 255 255 / 58%)), color-mix(in srgb, var(--frosted-button-tint, ${FROSTED_BUTTON_DEFAULTS.tint}) 33%, rgb(255 255 255 / 75%));
    box-shadow: inset 0 1px 1px white, inset 0 -1px 0 rgb(24 59 67 / 10%), 0 5px 14px rgb(24 59 67 / 14%);
  }
}
.admiral-frosted-button:not(:disabled):not([aria-disabled="true"]):active { transform: translateY(1px); box-shadow: inset 0 1px 3px rgb(24 59 67 / 14%), 0 1px 3px rgb(24 59 67 / 7%); }
.admiral-frosted-button:disabled, .admiral-frosted-button[aria-disabled="true"] { opacity: .48; cursor: not-allowed; pointer-events: none; }
@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
  .admiral-frosted-button { background: linear-gradient(145deg, rgb(255 255 255 / 60%), transparent 65%), #dce6e8; background: linear-gradient(145deg, rgb(255 255 255 / 60%), transparent 65%), color-mix(in srgb, var(--frosted-button-tint, ${FROSTED_BUTTON_DEFAULTS.tint}) 22%, white); }
}
@media (prefers-reduced-motion: reduce) {
  .admiral-frosted-button { transition: none; }
  .admiral-frosted-button:not(:disabled):not([aria-disabled="true"]):active { transform: none; }
}
@media (prefers-reduced-transparency: reduce) {
  .admiral-frosted-button, .admiral-frosted-button:not(:disabled):not([aria-disabled="true"]):hover {
    background: #dce6e8;
    background: color-mix(in srgb, var(--frosted-button-tint, ${FROSTED_BUTTON_DEFAULTS.tint}) 20%, white);
    -webkit-backdrop-filter: none; backdrop-filter: none;
  }
}
@media (forced-colors: active) {
  .admiral-frosted-button, .admiral-frosted-button:not(:disabled):not([aria-disabled="true"]):hover {
    border: 1px solid ButtonText; background: ButtonFace; color: ButtonText;
    -webkit-backdrop-filter: none; backdrop-filter: none; box-shadow: none;
  }
  .admiral-frosted-button:focus-visible { outline-color: Highlight; }
  .admiral-frosted-button:disabled, .admiral-frosted-button[aria-disabled="true"] { border-color: GrayText; color: GrayText; opacity: 1; }
}
`;
const escapeFrostedButton: any = (value: any): any => String(value ?? '').replace(/[&<>"']/g, (character: any): any => (({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' } as any)[character]));
// href must already have passed the caller's URL policy. Attribute values and
// labels are escaped here; event handlers, inline styles and structural overrides
// are deliberately excluded from the HTML renderer's attribute interface.
function renderFrostedButton({ label = 'Érdeklődöm', href, className = '', attributes = ({} as any), disabled = false }: any = ({} as any)): any {
    const link: any = typeof href === 'string' && !!href.trim();
    const tag: any = link ? 'a' : 'button';
    const props: any = ({} as any);
    if (attributes && typeof attributes === 'object' && !Array.isArray(attributes)) {
        for (const [name, value] of (Object as any).entries(attributes)) {
            if (!/^[a-zA-Z][a-zA-Z0-9:_.-]*$/.test(name) || /^(?:on|style$|srcdoc$|href$|class$|className$|type$|disabled$)/i.test(name))
                continue;
            if (!(['string', 'number', 'boolean'] as any).includes(typeof value))
                continue;
            if (value === false && !/^(?:aria-|data-)/i.test(name))
                continue;
            props[name] = value;
        }
    }
    if (link && !disabled)
        props.href = href;
    if (!link)
        props.type = 'button';
    if (disabled) {
        props['aria-disabled'] = 'true';
        if (link) {
            props.role = 'link';
            props.tabindex = '-1';
        }
        else
            props.disabled = true;
    }
    if (link && String(props.target).toLowerCase() === '_blank') {
        const rel: any = new Set(String(props.rel || '').split(/\s+/).filter(Boolean));
        rel.add('noopener');
        rel.add('noreferrer');
        props.rel = ([...rel] as any).join(' ');
    }
    const serialized: any = (Object as any).entries(props).map(([name, value]: any): any => value === true && !/^(?:aria-|data-)/i.test(name) ? ' ' + name : ' ' + name + '="' + escapeFrostedButton(value) + '"').join('');
    return '<' + tag + ' class="admiral-frosted-button' + (className ? ' ' + escapeFrostedButton(className) : '') + '"' + serialized + '>' + escapeFrostedButton(label) + '</' + tag + '>';
}
// The WebP companion is encoded from the same AVIF sheet, so the room crop
// and marker coordinates apply to both formats.
export function floorplanFallbackUrl(source: string | null): string | null {
    if (typeof source !== 'string' || !/^https?:\/\//i.test(source))
        return null;
    const url = new URL(source);
    if (!/\/floorplans\/types\/[a-z0-9]+\/plan\.avif$/i.test(url.pathname))
        return null;
    url.pathname = url.pathname.replace(/plan\.avif$/i, 'plan.webp');
    if (url.hostname === 'raw.githubusercontent.com') {
        const assetRevision = '2d2cd2bbb70ad70cae23bfd4c423384ab6cfcde2';
        url.pathname = url.pathname.replace(/^\/UnbuiltMarket\/admiral-park\/main\/assets\/apartment-list\//,
            `/UnbuiltMarket/admiral-park/${assetRevision}/assets/apartment-list/`);
    }
    return url.href;
}
function swapToFloorplanFallback(image: any): any {
    const fallback: any = image.dataset.floorplanFallback;
    if (!fallback || image.dataset.floorplanFallbackUsed === 'true')
        return false;
    image.dataset.floorplanFallbackUsed = 'true';
    image.src = fallback;
    return true;
}
// Export-only renderer. Inlined into the shared Framer card, never mounted as UI.
// Libraries and print fonts load on demand; apartment data is never uploaded.
async function loadAdmiralPdfTools(): Promise<any> {
    const key: any = Symbol.for('admiral-park:pdf-tools:v1');
    if ((window as any)[key])
        return (window as any)[key];
    const load: any = (url: any, integrity: any, name: any): any => new Promise((resolve: any, reject: any): any => {
        const script: any = (document as any).createElement('script');
        script.src = url;
        script.integrity = integrity;
        script.crossOrigin = 'anonymous';
        script.async = true;
        const finish: any = (error: any): any => { clearTimeout(timer); script.onload = null; script.onerror = null; script.remove(); error ? reject(error) : resolve((window as any)[name]); };
        const timer: any = setTimeout((): any => finish(new Error('PDF library timeout')), 20000);
        script.onload = (): any => finish((window as any)[name] ? null : new Error('Invalid PDF library'));
        script.onerror = (): any => finish(new Error('PDF library unavailable'));
        (document as any).head.append(script);
    });
    const promise: any = Promise.all(([
        load('https://cdn.jsdelivr.net/npm/pdf-lib@1.17.1/dist/pdf-lib.min.js', 'sha384-weMABwrltA6jWR8DDe9Jp5blk+tZQh7ugpCsF3JwSA53WZM9/14PjS5LAJNHNjAI', 'PDFLib'),
        load('https://cdn.jsdelivr.net/npm/@pdf-lib/fontkit@1.1.1/dist/fontkit.umd.min.js', 'sha384-2p6U+1mmqF10USehFeRiyG2ESG9FwIqN+jxULn5w9jjQIihSn9Pt13dVCn/Hawjn', 'fontkit'),
    ] as any)).then(([pdf, fontkit]: any): any => (({ pdf, fontkit } as any)));
    (window as any)[key] = promise;
    try {
        return await promise;
    }
    catch (error: any) {
        if ((window as any)[key] === promise)
            delete (window as any)[key];
        throw error;
    }
}
function admiralPdfImageType(contentType: any, url: any): any {
    const declared: any = contentType.split(';', 1)[0].trim().toLowerCase();
    if (/^image\/[a-z\d][a-z\d.+-]*$/.test(declared))
        return declared;
    const extension: any = url.split(/[?#]/, 1)[0].split('.').pop().toLowerCase();
    const types: any = ({ avif: 'image/avif', webp: 'image/webp', png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg', gif: 'image/gif', svg: 'image/svg+xml' } as any);
    return (Object as any).hasOwn(types, extension) ? types[extension] : '';
}
async function createAdmiralApartmentPdf(snapshot: any, options: any): Promise<any> {
    const { signal }: any = options;
    const check: any = (): any => { if (signal.aborted)
        throw new DOMException('Export cancelled', 'AbortError'); };
    const resources: any = ([] as any), canvases: any = ([] as any);
    const canvas: any = (width: any, height: any): any => { const c: any = (document as any).createElement('canvas'); c.width = width; c.height = height; canvases.push(c); return c; };
    async function fetchAsset(url: any): Promise<any> {
        if (!url)
            throw new Error('Missing PDF asset');
        const response: any = await fetch(url, ({ signal, credentials: 'omit' } as any));
        if (!response.ok)
            throw new Error('PDF asset unavailable: ' + response.status);
        return response;
    }
    async function bytes(url: any): Promise<any> {
        return new Uint8Array(await (await fetchAsset(url)).arrayBuffer());
    }
    async function planBlob(url: any): Promise<any> {
        const response: any = await fetchAsset(url);
        const blob: any = await response.blob();
        const type: any = admiralPdfImageType(blob.type, response.url || url);
        return blob.type === type ? blob : blob.slice(0, blob.size, type);
    }
    async function image(content: any, type: any = ''): Promise<any> {
        check();
        const url: any = URL.createObjectURL(type ? new Blob(([content] as any), ({ type } as any)) : content);
        resources.push(url);
        const img: any = new Image();
        img.src = url;
        await img.decode();
        check();
        return img;
    }
    async function planImage(primary: any, fallback: any): Promise<any> {
        try {
            return await image(await planBlob(primary));
        }
        catch (error: any) {
            check();
            if (!fallback)
                throw error;
            return image(await planBlob(fallback));
        }
    }
    async function jpeg(c: any, quality: any): Promise<any> {
        const blob: any = await new Promise((resolve: any): any => c.toBlob(resolve, 'image/jpeg', quality));
        if (!blob)
            throw new Error('Image compression failed');
        check();
        return new Uint8Array(await blob.arrayBuffer());
    }
    try {
        const [{ pdf: lib, fontkit }, regularBytes, semiboldBytes, floorplan, logoBytes, monogramBytes]: any = await Promise.all(([
            loadAdmiralPdfTools(), bytes(snapshot.fontRegular), bytes(snapshot.fontSemibold),
            snapshot.imageUrl ? planImage(snapshot.imageUrl, snapshot.imageFallbackUrl) : null, bytes(snapshot.logoUrl), bytes(snapshot.monogramUrl),
        ] as any));
        check();
        const pdf: any = await lib.PDFDocument.create();
        pdf.registerFontkit(fontkit);
        const [regular, semibold]: any = await Promise.all(([pdf.embedFont(regularBytes, ({ subset: true } as any)), pdf.embedFont(semiboldBytes, ({ subset: true } as any))] as any));
        const W: any = 1120, H: any = 700, page: any = pdf.addPage(([W, H] as any));
        pdf.setTitle('Admiral Park - ' + snapshot.id + ' lakás');
        pdf.setAuthor('Admiral Park');
        pdf.setSubject(snapshot.id + ' - egyedi lakásadatlap');
        pdf.setCreator('Admiral Park apartment detail card');
        pdf.setCreationDate(snapshot.date);
        const swatch: any = canvas(1, 1), sc: any = swatch.getContext('2d');
        function color(value: any, fallback: any): any { sc.clearRect(0, 0, 1, 1); sc.fillStyle = fallback; sc.fillStyle = value || fallback; sc.fillRect(0, 0, 1, 1); return ([...sc.getImageData(0, 0, 1, 1).data] as any).slice(0, 3).map((v: any): any => v / 255); }
        const colors: any = ({ top: color(snapshot.colors.top, '#fdfbfb'), bottom: color(snapshot.colors.bottom, '#e4e9ec'), ink: color(snapshot.colors.ink, '#242824'), muted: color(snapshot.colors.muted, '#687074'), watermarkTop: color(snapshot.colors.watermarkTop, '#f2f0f1'), watermarkBottom: color(snapshot.colors.watermarkBottom, '#d9dfe2'), status: color(snapshot.colors.status, '#4f7959') } as any);
        const rgb: any = (value: any): any => lib.rgb(...value);
        const css: any = (value: any): any => 'rgb(' + value.map((v: any): any => Math.round(v * 255)).join(',') + ')';
        const mix: any = (a: any, b: any, t: any): any => a.map((v: any, i: any): any => v + (b[i] - v) * t);
        const ink: any = rgb(colors.ink), muted: any = rgb(colors.muted), blue: any = rgb(color(snapshot.colors.controlBlue, '#225d82'));
        const rx: any = 640, rw: any = 454, actionTop: any = 580, actionHeight: any = 48;
        function text(value: any, x: any, top: any, size: any = 10, font: any = regular, tone: any = ink): any {
            const str: any = String(value ?? '').replace(/\u00a0|\u202f/g, ' ');
            // Unknown characters use an explicit replacement glyph; never drop ő/ű.
            const supported: any = font.getCharacterSet(), safe: any = ([...str] as any).map((c: any): any => supported.includes(c.codePointAt(0)) ? c : '?').join('');
            page.drawText(safe, ({ x, y: H - top - size, size, font, color: tone } as any));
            return font.widthOfTextAtSize(safe, size);
        }
        function centered(value: any, cx: any, top: any, size: any = 10, font: any = regular, tone: any = ink): any { return text(value, cx - font.widthOfTextAtSize(String(value), size) / 2, top, size, font, tone); }
        function right(value: any, x: any, top: any, size: any = 10, font: any = regular, tone: any = ink): any { return text(value, x - font.widthOfTextAtSize(String(value), size), top, size, font, tone); }
        function line(x: any, y: any, width: any, opacity: any = .18): any { page.drawLine(({ start: ({ x, y: H - y } as any), end: ({ x: x + width, y: H - y } as any), thickness: .55, color: muted, opacity } as any)); }
        function fit(value: any, width: any, size: any = 10, font: any = regular): any { return Math.min(size, width / Math.max(1, font.widthOfTextAtSize(String(value), size)) * size); }
        function wrap(value: any, width: any, size: any = 10, font: any = regular): any {
            const rows: any = ([] as any);
            let row: any = '';
            for (const word of String(value).split(/\s+/)) {
                const next: any = row ? row + ' ' + word : word;
                if (row && font.widthOfTextAtSize(next, size) > width) {
                    rows.push(row);
                    row = word;
                }
                else
                    row = next;
            }
            if (row)
                rows.push(row);
            return rows;
        }
        // Only the soft gradient and watermark are rasterised; text and logo stay vectors.
        const background: any = canvas(W, H), bg: any = background.getContext('2d'), gradient: any = bg.createLinearGradient(0, 0, 0, H);
        const paperTop: any = mix(colors.top, ([1, 1, 1] as any), .12), paperBottom: any = mix(colors.bottom, ([1, 1, 1] as any), .55);
        gradient.addColorStop(0, css(paperTop));
        gradient.addColorStop(1, css(paperBottom));
        bg.fillStyle = gradient;
        bg.fillRect(0, 0, W, H);
        const monogram: any = await image(monogramBytes, 'image/png'), motif: any = canvas(W, H), mc: any = motif.getContext('2d');
        const motifGradient: any = mc.createLinearGradient(0, 0, 0, H);
        motifGradient.addColorStop(0, css(colors.watermarkTop));
        motifGradient.addColorStop(1, css(colors.watermarkBottom));
        mc.fillStyle = motifGradient;
        mc.fillRect(0, 0, W, H);
        mc.globalCompositeOperation = 'destination-in';
        const scale: any = Math.min(W * .67 / monogram.naturalWidth, H / monogram.naturalHeight), mw: any = monogram.naturalWidth * scale, mh: any = monogram.naturalHeight * scale;
        mc.drawImage(monogram, W - W * .67 + (W * .67 - mw) / 2, (H - mh) / 2, mw, mh);
        bg.globalAlpha = .24;
        bg.drawImage(motif, 0, 0);
        bg.globalAlpha = 1;
        function paintBand(top: any, height: any, shade: any, rim: any): any {
            bg.save();
            bg.beginPath();
            bg.roundRect(rx + .5, top + .5, rw - 1, height - 1, height / 2);
            bg.shadowColor = 'rgba(29,63,88,.13)';
            bg.shadowBlur = 6;
            bg.shadowOffsetY = 2;
            bg.fillStyle = shade;
            bg.fill();
            bg.shadowColor = 'transparent';
            bg.strokeStyle = rim;
            bg.lineWidth = .8;
            bg.stroke();
            bg.restore();
        }
        const priceShade: any = bg.createLinearGradient(rx, 526, rx + rw, 570);
        priceShade.addColorStop(0, css(mix(colors.bottom, ([1, 1, 1] as any), .85)));
        priceShade.addColorStop(1, css(mix(colors.bottom, ([1, 1, 1] as any), .73)));
        paintBand(526, 44, priceShade, css(mix(colors.bottom, ([1, 1, 1] as any), .63)));
        // Reproduce the navbar's 145-degree inquiry gradient inside this wide PDF pill.
        const angle: any = 145 * Math.PI / 180, dx: any = Math.sin(angle), dy: any = -Math.cos(angle);
        const half: any = (rw * dx + actionHeight * dy) / 2, cx: any = rx + rw / 2, cy: any = actionTop + actionHeight / 2;
        const actionShade: any = bg.createLinearGradient(cx - dx * half, cy - dy * half, cx + dx * half, cy + dy * half);
        const accent: any = color(snapshot.colors.inquiryAccent, '#145083');
        actionShade.addColorStop(0, css(mix(accent, ([51 / 255, 157 / 255, 232 / 255] as any), .5)));
        actionShade.addColorStop(.53, css(accent));
        actionShade.addColorStop(1, css(mix(accent, ([0, 17 / 255, 40 / 255] as any), .35)));
        paintBand(actionTop, actionHeight, actionShade, '#1c496b');
        const backgroundImage: any = await pdf.embedJpg(await jpeg(background, .92));
        page.drawImage(backgroundImage, ({ x: 0, y: 0, width: W, height: H } as any));
        // Logo uses the same SVG paths as the card's CSS mask.
        const logoDocument: any = new DOMParser().parseFromString(new TextDecoder().decode(logoBytes), 'image/svg+xml');
        if (logoDocument.querySelector('parsererror'))
            throw new Error('Invalid brand SVG');
        const vb: any = (logoDocument.documentElement.getAttribute('viewBox') || '0 0 1232 524').trim().split(/[\s,]+/).map(Number), logoW: any = 174, logoScale: any = logoW / vb[2], logoX: any = rx + (rw - logoW) / 2, logoY: any = 30;
        const paths: any = ([...logoDocument.querySelectorAll('path')] as any);
        if (paths.length && !logoDocument.querySelector('[transform]')) {
            for (const path of paths)
                page.drawSvgPath(path.getAttribute('d'), ({ x: logoX - vb[0] * logoScale, y: H - logoY + vb[1] * logoScale, scale: logoScale, color: ink } as any));
        }
        else {
            const logo: any = await image(logoBytes, 'image/svg+xml'), lc: any = canvas(752, Math.round(752 * vb[3] / vb[2])), ctx: any = lc.getContext('2d');
            ctx.drawImage(logo, 0, 0, lc.width, lc.height);
            ctx.globalCompositeOperation = 'source-in';
            ctx.fillStyle = css(colors.ink);
            ctx.fillRect(0, 0, lc.width, lc.height);
            const png: any = await new Promise((resolve: any): any => lc.toBlob(resolve, 'image/png'));
            if (!png)
                throw new Error('Logo encoding failed');
            page.drawImage(await pdf.embedPng(await png.arrayBuffer()), ({ x: logoX, y: H - logoY - logoW * vb[3] / vb[2], width: logoW, height: logoW * vb[3] / vb[2] } as any));
        }
        function valueWithUnit(value: any, unit: any, cx: any, top: any, width: any, size: any, font: any, tone: any): any {
            const gap: any = unit ? 3 : 0, unitSize: any = unit ? 10 : 0, uw: any = unit ? regular.widthOfTextAtSize(unit, unitSize) : 0;
            const pointSize: any = fit(value, width - uw - gap, size, font), vw: any = font.widthOfTextAtSize(value, pointSize);
            const x: any = cx - (vw + uw + gap) / 2;
            text(value, x, top, pointSize, font, tone);
            if (unit)
                text(unit, x + vw + gap, top + pointSize - unitSize, unitSize, regular, muted);
        }
        const metrics: any = snapshot.metrics, cellWidth: any = rw / metrics.length;
        metrics.forEach((metric: any, i: any): any => {
            const cx: any = rx + cellWidth * (i + .5);
            centered(metric.label, cx, 128, 12, regular, muted);
            valueWithUnit(metric.value, metric.unit, cx, 146, cellWidth - 9, 26, semibold, i === 0 ? blue : ink);
        });
        line(rx, 193, rw);
        right(snapshot.meta, 609, 26, fit(snapshot.meta, 485, 12, semibold), semibold, blue);
        if (snapshot.documentLabel !== 'Alaprajz')
            text(snapshot.documentLabel, 28, 27, 10, semibold, muted);
        // Crop and fit the same plan as the detail card; no live viewport/tab clipping.
        const overview: any = snapshot.overview;
        const legendSpace: any = overview ? 74 + overview.legend.length * 14 : 0;
        const frame: any = ({ x: 40, top: 74, width: 558, height: 541 - legendSpace } as any);
        if (floorplan) {
            const img: any = floorplan, v: any = snapshot.viewBox, iw: any = img.naturalWidth, ih: any = img.naturalHeight;
            const sx: any = iw * v.x, sy: any = ih * v.y, sw: any = iw * v.width, sh: any = ih * v.height;
            if (!(sw > 0 && sh > 0 && iw > 0 && ih > 0))
                throw new Error('Invalid floorplan dimensions');
            const scale: any = Math.min(frame.width / sw, frame.height / sh), pw: any = sw * scale, ph: any = sh * scale, px: any = frame.x + (frame.width - pw) / 2, pt: any = frame.top + (frame.height - ph) / 2;
            const rasterScale: any = Math.min(1, 1800 / Math.max(sw, sh)), plan: any = canvas(Math.round(sw * rasterScale), Math.round(sh * rasterScale)), ctx: any = plan.getContext('2d');
            ctx.drawImage(background, px, pt, pw, ph, 0, 0, plan.width, plan.height);
            ctx.drawImage(img, sx, sy, sw, sh, 0, 0, plan.width, plan.height);
            if (snapshot.unitOutline) {
                ctx.save();
                ctx.scale(plan.width / sw, plan.height / sh);
                ctx.translate(-sx, -sy);
                const outline: any = new Path2D(snapshot.unitOutline);
                ctx.fillStyle = 'rgba(17,97,163,.18)';
                ctx.fill(outline);
                ctx.lineJoin = 'round';
                ctx.strokeStyle = '#fff';
                ctx.lineWidth = 7 / scale;
                ctx.stroke(outline);
                ctx.strokeStyle = '#17659c';
                ctx.lineWidth = 3.5 / scale;
                ctx.stroke(outline);
                ctx.restore();
            }
            const embedded: any = await pdf.embedJpg(await jpeg(plan, .94));
            page.drawImage(embedded, ({ x: px, y: H - pt - ph, width: pw, height: ph } as any));
            if (overview) {
                const mapX: any = (x: any): any => px + (x - sx) * scale, mapY: any = (y: any): any => pt + (y - sy) * scale;
                for (const [letter, point] of (Object as any).entries(overview.labels)) {
                    const x: any = mapX(point[0]), y: any = mapY(point[1]);
                    page.drawCircle(({ x, y: H - y, size: 8, color: lib.rgb(1, 1, 1), borderColor: blue, borderWidth: .8 } as any));
                    centered(letter, x, y - 5.8, 9, semibold, blue);
                }
                const north: any = overview.compass, nx: any = mapX(north.x), ny: any = mapY(north.y);
                const angle: any = north.angle * Math.PI / 180;
                const tip: any = ({ x: nx + 6 * Math.sin(angle), y: H - ny + 6 * Math.cos(angle) } as any);
                page.drawLine(({ start: ({ x: nx - 5 * Math.sin(angle), y: H - ny - 5 * Math.cos(angle) } as any), end: tip, thickness: 1.4, color: blue } as any));
                for (const side of ([-1, 1] as any)) {
                    const a: any = angle + side * Math.PI / 5;
                    page.drawLine(({ start: tip, end: ({ x: tip.x - 4 * Math.sin(a), y: tip.y - 4 * Math.cos(a) } as any), thickness: 1, color: blue } as any));
                }
                centered('É', nx + 9 * Math.sin(angle), ny - 9 * Math.cos(angle) - 9, 8, semibold, blue);
                const lakeY: any = pt + ph + 10;
                line(px, lakeY, pw * .43, .5);
                line(px + pw * .57, lakeY, pw * .43, .5);
                centered('Balaton', px + pw / 2, lakeY - 5.5, 8, semibold, blue);
                const lx: any = frame.x + frame.width * .14, lw: any = frame.width * .72, legendTop: any = frame.top + frame.height + 22;
                text('Lakástípusok', lx, legendTop, 11, semibold);
                right('Beltér (m²)', lx + lw * .58, legendTop + 2, 8, regular, muted);
                right(overview.exteriorLabel + ' (m²)', lx + lw, legendTop + 2, 8, regular, muted);
                overview.legend.forEach((row: any, index: any): any => {
                    const y: any = legendTop + 18 + index * 14;
                    page.drawCircle(({ x: lx + 4, y: H - y - 5, size: 3.8, color: rgb(color(row.color, '#dde3e8')), borderColor: muted, borderWidth: .3 } as any));
                    text(row.type, lx + 13, y, 8.5, semibold);
                    right(row.interior, lx + lw * .58, y, 8.5, regular);
                    right(row.exterior, lx + lw, y, 8.5, regular);
                });
            }
            for (const marker of snapshot.markers) {
                const mx: any = (marker.x - v.x) / v.width, my: any = (marker.y - v.y) / v.height;
                if (mx < 0 || mx > 1 || my < 0 || my > 1)
                    continue;
                const x: any = px + pw * mx, y: any = pt + ph * my;
                page.drawCircle(({ x, y: H - y, size: 7.5, color: lib.rgb(1, 1, 1), opacity: .94, borderColor: muted, borderWidth: .35, borderOpacity: .5 } as any));
                centered(String(marker.number), x, y - 4.6, 8.5, regular);
            }
        }
        else {
            text('Az alaprajz még nem érhető el.', frame.x + 40, frame.top + 150, 13, regular, muted);
        }
        const heading: any = 'Helyiséglista.';
        const headingWidth: any = text(heading, rx, 227, 18, regular);
        if (snapshot.layoutLabel)
            text(snapshot.layoutLabel, rx + headingWidth + 9, 236, fit(snapshot.layoutLabel, rw - headingWidth - 9, 8), regular, muted);
        // Use the online card's room ordering and its verified marker-number mapping.
        const rows: any = snapshot.roomRows, roomTop: any = 259, roomBottom: any = 508, nameWidth: any = rw - 101;
        const wrapped: any = rows.map((row: any): any => wrap(row.name, nameWidth, 10, regular));
        const totalLines: any = wrapped.reduce((sum: any, names: any): any => sum + Math.max(1, names.length), 0);
        const rowHeight: any = Math.min(22, (roomBottom - roomTop) / Math.max(1, totalLines));
        const roomSize: any = Math.min(10, rowHeight * .72);
        if (roomSize < 7.5)
            throw new Error('The room list is too long for the export layout');
        let y: any = roomTop;
        if (!rows.length)
            text('A helyiséglista még nem érhető el.', rx, y, 10, regular, muted);
        for (const [index, row] of rows.entries()) {
            const names: any = wrapped[index];
            if (row.number != null) {
                const radius: any = Math.min(6.6, rowHeight * .4);
                page.drawCircle(({ x: rx + 8, y: H - y - 5.8, size: radius, color: lib.rgb(1, 1, 1), borderColor: muted, borderWidth: .4, borderOpacity: .45 } as any));
                centered(String(row.number).padStart(2, '0'), rx + 8, y + .9, Math.min(7.5, rowHeight * .53), regular, muted);
            }
            names.forEach((name: any, i: any): any => text(name, rx + 22, y + i * rowHeight, roomSize, regular, ink));
            right(row.area, rx + rw - 3, y, roomSize, regular, ink);
            y += rowHeight * Math.max(1, names.length);
            line(rx, y - 3, rw, .25);
        }
        valueWithUnit(snapshot.price, snapshot.priceUnit, rx + rw / 2, 529, rw - 30, 31, regular, ink);
        centered(snapshot.actionLabel, rx + rw / 2, actionTop + 14, 15, semibold, lib.rgb(1, 1, 1));
        const actionLink: any = pdf.context.register(pdf.context.obj(({ Type: 'Annot', Subtype: 'Link', Rect: ([rx, H - actionTop - actionHeight, rx + rw, H - actionTop] as any), Border: ([0, 0, 0] as any), A: ({ Type: 'Action', S: 'URI', URI: lib.PDFString.of(snapshot.actionUrl) } as any) } as any)));
        page.node.addAnnot(actionLink);
        page.drawCircle(({ x: rx + 8, y: H - 653, size: 2.6, color: rgb(colors.status) } as any));
        text(snapshot.status, rx + 18, 644, 13, regular, rgb(colors.status));
        right('admiralpark.hu', rx + rw, 645, 10, semibold, blue);
        centered('Az alaprajz illusztráció. Bútorozatlan átadás. Bruttó vételár.', frame.x + frame.width / 2, 663, 7, regular, muted);
        right('Letöltve: ' + new Intl.DateTimeFormat('hu-HU').format(snapshot.date), rx + rw, 677, 7, regular, muted);
        const online: any = pdf.context.register(pdf.context.obj(({ Type: 'Annot', Subtype: 'Link', Rect: ([rx, H - 664, rx + rw, H - 643] as any), Border: ([0, 0, 0] as any), A: ({ Type: 'Action', S: 'URI', URI: lib.PDFString.of(snapshot.pageUrl) } as any) } as any)));
        page.node.addAnnot(online);
        check();
        const output: any = await pdf.save(({ useObjectStreams: true } as any));
        check();
        return new Blob(([output] as any), ({ type: 'application/pdf' } as any));
    }
    finally {
        for (const url of resources)
            URL.revokeObjectURL(url);
        for (const c of canvases) {
            c.width = 1;
            c.height = 1;
        }
    }
}
// Card-only runtime. Shared by the list and orbit; no list/filter/comparison renderer.
function ensureOrbitApartmentCardFont(folder: any): any {
    if (typeof (window as any) === 'undefined' || !(window as any).FontFace || !(document as any).fonts || !folder)
        return Promise.resolve();
    const cache: any = (window as any)[Symbol.for('admiral-park:montserrat-fonts')] ||= new Map();
    if (cache.has(folder))
        return cache.get(folder);
    const sources: any = ([
        (['montserrat-latin-ext-variable.woff2', 'U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C4,U+2113,U+2C60-2C7F,U+A720-A7FF'] as any),
        (['montserrat-latin-variable.woff2', 'U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD'] as any),
    ] as any);
    const loaded: any = Promise.allSettled(sources.map(([file, unicodeRange]: any): any => {
        const face: any = new FontFace('Montserrat', 'url("' + new URL(file, folder).href + '")', ({ style: 'normal', weight: '100 900', display: 'swap', unicodeRange } as any));
        (document as any).fonts.add(face);
        return face.load();
    }));
    cache.set(folder, loaded);
    return loaded;
}
function mountOrbitApartmentCardRuntime(root: any = (document as any), config: any = ({} as any)): any {
    const $: any = (id: any): any => root.querySelector(`#${id}`);
    const lifecycle: any = new AbortController();
    const signal: any = lifecycle.signal;
    const events: any = ({ signal } as any);
    const esc: any = (value: any): any => String(value ?? '').replace(/[&<>"']/g, (c: any): any => (({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' } as any)[c]));
    const roomLabel: any = (value: any): any => String(value ?? '').replace(/terasz/giu, 'Erkély');
    const number: any = new Intl.NumberFormat('hu-HU', ({ maximumFractionDigits: 2 } as any));
    const priceNumber: any = new Intl.NumberFormat('hu-HU', ({ maximumFractionDigits: 2 } as any));
    const area: any = (value: any): any => Number.isFinite(value) ? `${number.format(value)} m²` : 'Nincs adat';
    const price: any = (value: any): any => Number.isFinite(value) ? `${priceNumber.format(value / 1000000)} M Ft` : 'Ár kérésre';
    const apartmentPrice: any = (a: any): any => a.price == null && a.status === 'sold' ? 'Nincs megadva' : price(a.price);
    const floorText: any = (a: any): any => a.floorLabel || (a.floor === 0 ? 'Földszint' : a.floor == null ? 'Nincs adat' : `${a.floor}. emelet`);
    const labels: any = ({ available: 'Elérhető', under_negotiation: 'Tárgyalás alatt', reserved: 'Egyeztetés alatt', sold: 'Elkelt', unknown: 'Érdeklődjön' } as any);
    const statusText: any = (a: any): any => a.statusLabel || labels[a.status] || labels.unknown;
    const safeUrl: any = (value: any): any => { if (typeof value !== 'string' || !value.trim())
        return null; try {
        const u: any = new URL(value, location.href);
        return (['http:', 'https:'] as any).includes(u.protocol) ? u.href : null;
    }
    catch {
        return null;
    } };
    function assetUrl(value: any): any {
        if (typeof value !== 'string' || !value.trim())
            return null;
        const input: any = value.trim();
        try {
            if (/^[a-z][a-z\d+.-]*:/i.test(input)) {
                const direct: any = new URL(input);
                return (['http:', 'https:'] as any).includes(direct.protocol) ? direct.href : null;
            }
            let base: any = (document as any).baseURI, relative: any = input;
            if (typeof config.assetBaseUrl === 'string' && config.assetBaseUrl.trim()) {
                const custom: any = new URL(config.assetBaseUrl.trim(), (document as any).baseURI);
                if (!(['http:', 'https:'] as any).includes(custom.protocol))
                    return null;
                if (!custom.pathname.endsWith('/'))
                    custom.pathname += '/';
                base = custom.href;
                relative = relative.replace(/^\.?\/?assets\//, '');
            }
            else if (typeof config.dataUrl === 'string' && /^https?:\/\//i.test(config.dataUrl))
                base = new URL('.', config.dataUrl).href;
            const resolved: any = new URL(relative, base);
            return (['http:', 'https:'] as any).includes(resolved.protocol) ? resolved.href : null;
        }
        catch {
            return null;
        }
    }
    const montserratFolder: any = assetUrl('assets/fonts/montserrat/');
    ensureOrbitApartmentCardFont(montserratFolder).then((): any => { if (!signal.aborted)
        requestAnimationFrame(fitDetailRooms); });
    let apartments: any = ([] as any), data: any, favorites: any = new Set(), toastTimer: any, activeToast: any = null, mediaView: any = null, mediaSequence: any = 0;
    let requestedApartmentId: any = typeof config.apartment === 'string' ? config.apartment : null, cardOpen: any = false;
    let requestedDocument: ApartmentInitialDocument = config.initialDocument === 'floor' ? 'floor' : 'plan';
    const dialogFocus: any = new WeakMap(), dialogStack: any = ([] as any), downloadUrls: any = new Set();
    const modalRegistry: any = (window as any)[Symbol.for('admiral-park:open-dialogs')] ||= new Set();
    const modalScroll: any = (window as any)[Symbol.for('admiral-park:scroll-lock')] ||= ({ locked: false, value: '', priority: '', watched: new WeakSet() } as any);
    const dialogs: any = ([$('detail-dialog'), $('media-dialog')] as any).filter(Boolean);
    let detailResize: any = null, selectedPlanRoom: any = null, hoverPlanRoom: any = null, focusedPlanRoom: any = null;
    let storage: any = true;
    try {
        const stored: any = JSON.parse(localStorage.getItem('admiral-park:favorites:v1') || '[]');
        if (Array.isArray(stored)) {
            favorites = normalizeAdmiralFavorites(stored);
            const canonical = JSON.stringify([...favorites]);
            if (canonical !== JSON.stringify(stored))
                localStorage.setItem('admiral-park:favorites:v1', canonical);
        }
    }
    catch {
        storage = false;
    }
    function toast(message: any): any {
        // A native modal's top layer makes sibling live regions inert, regardless of
        // their z-index. Keep feedback in the open card, and row-export feedback outside.
        activeToast?.classList.remove('visible');
        const dialog: any = $('detail-dialog');
        activeToast = dialog.open ? dialog.querySelector('.detail-feedback') || $('toast') : $('toast');
        activeToast.textContent = message;
        activeToast.classList.add('visible');
        const target: any = activeToast;
        clearTimeout(toastTimer);
        toastTimer = setTimeout((): any => target.classList.remove('visible'), 4200);
    }
    // The orbit's compact dataset owns live sales facts; full card geometry and
    // room/media metadata stay on the detailed record. Never mutate either source.
    const liveNumberFacts: any = (['floor', 'rooms', 'bedrooms', 'areaInterior', 'areaTerrace', 'areaGarden', 'price'] as any);
    const liveTextFacts: any = (['name', 'building', 'floorLabel', 'orientation', 'layoutLabel', 'statusLabel', 'currency'] as any);
    const liveFactKeys: any = ([...liveNumberFacts, ...liveTextFacts, 'status', 'priceIncludesVat'] as any);
    function byId(id: any): any {
        const record: any = apartments.find((a: any): any => a.id === id);
        if (!record)
            return undefined;
        let live: any;
        try {
            const dataset: any = config.getLiveDataset?.();
            live = Array.isArray(dataset?.apartments) ? dataset.apartments.find((a: any): any => a?.id === id) : null;
        }
        catch {
            return record;
        }
        if (!live)
            return record;
        const facts: any = ({} as any);
        for (const key of liveNumberFacts)
            if ((Object as any).hasOwn(live, key)) {
                const value: any = live[key];
                if (value === null || (hasNumber(value) && value >= 0 && (!(['floor', 'price'] as any).includes(key) || Number.isSafeInteger(value))))
                    facts[key] = value;
            }
        for (const key of liveTextFacts)
            if ((Object as any).hasOwn(live, key)) {
                const value: any = live[key];
                if (value === null && !(['building', 'currency'] as any).includes(key) || typeof value === 'string' && value.length <= 1024 && (!(['building', 'currency'] as any).includes(key) || value.trim()))
                    facts[key] = value;
            }
        if ((Object as any).hasOwn(labels, live.status))
            facts.status = live.status;
        if (live.priceIncludesVat === null || typeof live.priceIncludesVat === 'boolean')
            facts.priceIncludesVat = live.priceIncludesVat;
        return (Object as any).keys(facts).some((key: any): any => facts[key] !== record[key]) ? ({ ...record, ...facts } as any) : record;
    }
    let renderedFactsSignature: any = '';
    const factsSignature: any = (a: any): any => JSON.stringify(liveFactKeys.map((key: any): any => a?.[key] ?? null));
    const hasNumber: any = (v: any): any => typeof v === 'number' && Number.isFinite(v);
    const svg: any = (name: any): any => name === 'heart' ? '<svg viewBox="0 0 24 24" width="19" height="19" aria-hidden="true"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>' : '<span aria-hidden="true">↗</span>';
    const downloadIcon: any = '<svg viewBox="0 0 20 20" width="15" height="15" fill="none" aria-hidden="true"><path d="M10 2v10m-4-4 4 4 4-4M3 13v4h14v-4" stroke="currentColor" stroke-width="1.2"/></svg>';
    function mediaEntries(a: any): any {
        return ([(['floorplan', 'Alaprajz'] as any), (['floorLayout', 'Szintrajz'] as any)] as any).flatMap(([key, name]: any): any => {
            const source: any = a.media?.[key] || (key === 'floorplan' && a.floorplan ? ({ full: a.floorplan } as any) : null);
            const full: any = assetUrl(source?.full);
            if (!full)
                return ([] as any);
            let label: any = typeof source.label === 'string' && source.label.trim() ? source.label.trim() : name;
            if (key === 'floorplan' && a.apartmentType)
                label = `${a.apartmentType} típus`;
            return ([({ key, name, label, full, thumbnail: assetUrl(source.thumbnail), isIllustrative: !!source.isIllustrative } as any)] as any);
        });
    }
    function downloadLink(a: any, large: any = false): any {
        return `<span class="download-wrap"><button type="button" class="datasheet-link action-pill${large ? ' datasheet-large footer-pill' : ''}" data-download="${esc(a.id)}" aria-label="${esc(a.id)} lakás adatlapjának letöltése PDF formátumban" title="Lakásadatlap letöltése">${downloadIcon}<span>Adatlap</span></button></span>`;
    }
    function saveButton(a: any, explain: any = false): any { const saved: any = favorites.has(a.id); return `<button type="button" class="save-button ${saved ? 'is-saved' : ''}${explain ? ' save-with-label' : ''}" data-save="${esc(a.id)}" aria-label="${esc(a.id)} ${saved ? 'eltávolítása a kedvencekből' : 'mentése a kedvencekhez'}" aria-pressed="${saved}">${svg('heart')}${explain ? `<span class="detail-save-label">${saved ? 'Kedvencekhez mentve' : 'Mentés a kedvencekhez'}</span>` : ''}</button>`; }
    function syncModalState(): any {
        const nextCardOpen: any = dialogs.some((dialog: any): any => dialog.open);
        if (nextCardOpen !== cardOpen) {
            cardOpen = nextCardOpen;
            config.onOpenChange?.(cardOpen);
        }
        for (const dialog of modalRegistry)
            if (!dialog.open || !dialog.isConnected)
                modalRegistry.delete(dialog);
        const documentDialogs: any = ([...(document as any).querySelectorAll('dialog[open]')] as any), locked: any = modalRegistry.size > 0 || documentDialogs.length > 0;
        (document as any).body.classList.toggle('dialog-open', locked);
        if (locked && !modalScroll.locked) {
            modalScroll.value = (document as any).body.style.getPropertyValue('overflow');
            modalScroll.priority = (document as any).body.style.getPropertyPriority('overflow');
            modalScroll.locked = true;
            (document as any).body.style.setProperty('overflow', 'hidden', modalScroll.priority);
        }
        else if (!locked && modalScroll.locked) {
            if (modalScroll.value)
                (document as any).body.style.setProperty('overflow', modalScroll.value, modalScroll.priority);
            else
                (document as any).body.style.removeProperty('overflow');
            modalScroll.locked = false;
        }
        for (const dialog of documentDialogs)
            if (!modalRegistry.has(dialog) && !modalScroll.watched.has(dialog)) {
                modalScroll.watched.add(dialog);
                dialog.addEventListener('close', (): any => { modalScroll.watched.delete(dialog); syncModalState(); }, ({ once: true } as any));
            }
    }
    function openDialog(dialog: any): any {
        if (!dialog.open) {
            dialogFocus.set(dialog, root.activeElement || (document as any).activeElement);
            dialog.showModal();
            dialogStack.push(dialog);
            modalRegistry.add(dialog);
        }
        syncModalState();
        dialog.querySelector('[data-close]')?.focus();
    }
    function finishDialogClose(dialog: any): any {
        if (dialog.open || (!modalRegistry.has(dialog) && !dialogStack.includes(dialog)))
            return;
        modalRegistry.delete(dialog);
        const position: any = dialogStack.indexOf(dialog);
        if (position !== -1)
            dialogStack.splice(position, 1);
        syncModalState();
        if (dialog.id === 'media-dialog') {
            mediaView = null;
            dialog.replaceChildren();
        }
        const top: any = dialogStack.findLast((item: any): any => item.open), previous: any = dialogFocus.get(dialog);
        const fallback: any = dialog.id === 'detail-dialog' ? root.querySelector(`[data-detail="${CSS.escape(dialog.dataset.apartment || '')}"]`) : null;
        const focus: any = previous?.isConnected && (!top || top.contains(previous)) ? previous : top?.querySelector('[data-close]') || fallback;
        focus?.focus(({ preventScroll: true } as any));
    }
    function closeDialog(dialog: any): any { if (dialog?.open) {
        dialog.close();
        finishDialogClose(dialog);
    } }
    function inquiry(a: any): any {
        const inquiryUrl: any = safeUrl(config.inquiryUrl);
        if (inquiryUrl) {
            const u: any = new URL(inquiryUrl);
            u.searchParams.set('apartment', a.id);
            return renderFrostedButton(({ label: 'Érdeklődöm', href: u.href, className: 'inquiry-button', attributes: ({ target: '_blank', rel: 'noopener noreferrer' } as any) } as any));
        }
        return renderFrostedButton(({ label: 'Érdeklődöm', className: 'inquiry-button', attributes: ({ 'data-inquiry-placeholder': '', 'aria-expanded': 'false', 'aria-controls': 'inquiry-pending' } as any) } as any)) + `<div class="inquiry-pending" id="inquiry-pending" role="status" hidden><p>A kapcsolatfelvétel hamarosan elérhető.</p><button type="button" class="inquiry-copy" data-copy-inquiry="${esc(a.id)}">Lakásadatok másolása</button></div>`;
    }
    function positionInquiryNotice(): any {
        const dialog: any = $('detail-dialog'), note: any = dialog?.querySelector('.inquiry-pending');
        if (!dialog?.open || !note || note.hidden)
            return;
        note.style.bottom = 'auto';
        note.style.top = '0px';
        const bounds: any = dialog.querySelector('.detail-layout').getBoundingClientRect(), anchor: any = dialog.querySelector('.detail-inquiry').getBoundingClientRect(), height: any = note.getBoundingClientRect().height;
        const preferred: any = anchor.top - height - 8 < bounds.top + 6 ? anchor.bottom + 8 : anchor.top - height - 8;
        note.style.top = `${Math.max(bounds.top + 6, Math.min(preferred, bounds.bottom - height - 6)) - anchor.top}px`;
    }
    function detailMetric(label: any, value: any): any {
        return `<div><dt>${esc(label)}</dt><dd>${hasNumber(value) ? number.format(value) : '—'}${hasNumber(value) ? '<small>m2</small>' : ''}</dd></div>`;
    }
    function validPlanMarkers(layout: any): any {
        return Array.isArray(layout?.markers) ? layout.markers.filter((marker: any): any => Number.isSafeInteger(marker.number) && marker.number > 0 && hasNumber(marker.x) && marker.x >= 0 && marker.x <= 1 && hasNumber(marker.y) && marker.y >= 0 && marker.y <= 1 && typeof marker.name === 'string') : ([] as any);
    }
    function initializeDetailImages(dialog: any): any {
        dialog.querySelectorAll('img[data-detail-image][src]').forEach((image: any): any => {
            if (!image.complete)
                detailImageState(image, 'loading');
            else if (image.naturalWidth)
                detailImageState(image, 'ready');
            else if (!swapToFloorplanFallback(image))
                detailImageState(image, 'error');
        });
    }
    function detailPlanUrl(a: any): string | null {
        const source = a.media?.floorplan;
        return assetUrl(source?.original || source?.full || a.floorplan);
    }
    function detailPlan(a: any, url: string | null, hidden = false): string {
        const layout = data.roomLayouts?.[a.apartmentType];
        if (!url)
            return '<div class="empty-plan"><h3>Alaprajz</h3><p>Az alaprajz még nem érhető el.</p></div>';
        const view: any = layout?.viewBox || ({ x: 0, y: 0, width: 1, height: 1 } as any);
        const dimensions: any = layout?.imageDimensions || ({ width: 1500, height: 2000 } as any);
        const imageWidth: any = dimensions.width || dimensions[0] || 1500, imageHeight: any = dimensions.height || dimensions[1] || 2000;
        const surface: any = `left:${-view.x / view.width * 100}%;top:${-view.y / view.height * 100}%;width:${100 / view.width}%;height:${100 / view.height}%`;
        const markers: any = validPlanMarkers(layout);
        return `<section class="detail-plan" data-document-panel="plan" id="detail-document-plan" aria-label="Alaprajz"${hidden ? ' hidden' : ''}><div class="detail-plan-stage" data-detail-image-stage="plan" data-image-state="loading" aria-busy="true">${detailImageFeedback('plan')}<div class="detail-plan-canvas" style="--plan-aspect:${imageWidth * view.width / (imageHeight * view.height)};aspect-ratio:${imageWidth * view.width}/${imageHeight * view.height}"><div class="detail-plan-surface" style="${surface}"><img class="detail-plan-image" data-detail-image="plan" data-image-url="${esc(url)}" data-floorplan-fallback="${esc(floorplanFallbackUrl(url))}"${hidden ? '' : ` src="${esc(url)}"`} alt="${esc(a.apartmentType || a.id)} típus számozott alaprajza" decoding="async"><div class="detail-plan-markers" aria-label="A típusterv helyiségei">${markers.map((marker: any): any => `<button type="button" class="room-marker" data-plan-room="${marker.number}" style="left:${marker.x * 100}%;top:${marker.y * 100}%" aria-label="${marker.number}. ${esc(roomLabel(marker.name))}" aria-pressed="false">${marker.number}</button>`).join('')}</div></div></div></div></section>`;
    }
    // Display-only joins for the shared illustrative plans. The source room rows
    // and their actual apartment areas remain unchanged; inferred joins are never
    // written back as verified planNumber data.
    function numberedUnitRooms(a: any): any {
        const rooms: any = Array.isArray(a?.roomList) ? a.roomList : ([] as any);
        const markers: any = validPlanMarkers(data.roomLayouts?.[a?.apartmentType]);
        const markerByNumber: any = new Map(markers.map((marker: any): any => ([marker.number, marker] as any)));
        // Owner-confirmed links, keyed by stable source-room keys. The two equal
        // C303 bedrooms use one consistent remaining assignment below.
        const confirmedNumbers: any = ({ C303: ({ 'rooms:1184': 6 } as any), C101: ({ 'rooms:944': 5, 'rooms:946': 10 } as any) } as any);
        const rows: any = rooms.map((room: any): any => {
            const linkedNumber: any = room.planNumber ?? confirmedNumbers[a.id]?.[room.key];
            const marker: any = markerByNumber.get(linkedNumber);
            const planNumber: any = marker && marker.kind === room.kind ? linkedNumber : null;
            return ({ room, planNumber, candidateNumbers: planNumber === null ? ([] as any) : ([planNumber] as any) } as any);
        });
        if (!markers.length || !rows.length)
            return rows;
        const prototype: any = (data.apartments || ([] as any)).find((item: any): any => item.apartmentType === a.apartmentType &&
            Array.isArray(item.roomList) && item.roomList.length === markers.length &&
            new Set(item.roomList.map((room: any): any => room.planNumber)).size === markers.length &&
            item.roomList.every((room: any): any => markerByNumber.get(room.planNumber)?.kind === room.kind && hasNumber(room.area)));
        const reference: any = prototype?.roomList || ([] as any);
        const basicName: any = (name: any): any => {
            const key: any = String(name || '').toLocaleLowerCase('hu').normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]/g, '');
            const aliases: any = ({ terasz: 'erkely', furdo: 'furdoszoba', kozl: 'kozlekedo',
                hazth: 'utility', haztartasihelyiseg: 'utility', tarolo: 'utility',
                konyaetkezo: 'konyhaetkezo' } as any);
            return aliases[key] || key;
        };
        // A single kitchen may be called either Konyha or Konyha, étkező. Keep those
        // names distinct in two-kitchen plans so their areas cannot be interchanged.
        const singleKitchen: any = markers.filter((marker: any): any => /^konyha/.test(basicName(marker.name))).length === 1;
        // C101's actual list calls the E1 wardrobe a Tároló (3.75 m²), and its
        // 5.16 m² utility room Házt.h. Group only this missing-wardrobe case, then
        // resolve it by area; retain both original names and actual values in rows.
        const e1StorageAlias: any = a.apartmentType === 'E1' &&
            !rooms.some((room: any): any => basicName(room.name) === 'gardrob') &&
            rooms.filter((room: any): any => basicName(room.name) === 'utility').length === 2 &&
            markers.some((marker: any): any => basicName(marker.name) === 'gardrob');
        const keyFor: any = (room: any): any => {
            let key: any = basicName(room.name);
            if (singleKitchen && /^konyha/.test(key))
                key = 'konyha';
            if (e1StorageAlias && (key === 'gardrob' || key === 'utility'))
                key = 'e1-storage';
            return room.kind + ':' + key;
        };
        const setNumber: any = (row: any, number: any): any => { row.planNumber = number; row.candidateNumbers = ([number] as any); };
        const used: any = new Set(rows.filter((row: any): any => row.planNumber !== null).map((row: any): any => row.planNumber));
        // A complete compatible order is useful evidence. An isolated same-index
        // bedroom is not enough: reordered lists such as C303 must use the groups.
        const ordered: any = rooms.length === markers.length && rooms.every((room: any, index: any): any => keyFor(room) === keyFor(markers[index]) &&
            (rows[index].planNumber === null || rows[index].planNumber === markers[index].number));
        if (ordered) {
            rows.forEach((row: any, index: any): any => {
                if (row.planNumber === null && !used.has(markers[index].number)) {
                    setNumber(row, markers[index].number);
                    used.add(markers[index].number);
                }
            });
            return rows;
        }
        const unlinked: any = rows.filter((row: any): any => row.planNumber === null);
        const available: any = reference.filter((room: any): any => !used.has(room.planNumber));
        for (const key of new Set(unlinked.map((row: any): any => keyFor(row.room)))) {
            const group: any = unlinked.filter((row: any): any => keyFor(row.room) === key);
            const targets: any = available.filter((room: any): any => keyFor(room) === key)
                .sort((left: any, right: any): any => left.planNumber - right.planNumber);
            if (group.length !== targets.length || !targets.length) {
                // Without a verified reference, only a unique name+kind pair is safe.
                const remaining: any = markers.filter((marker: any): any => !used.has(marker.number) && keyFor(marker) === key);
                if (group.length === 1 && remaining.length === 1) {
                    setNumber(group[0], remaining[0].number);
                    used.add(remaining[0].number);
                }
                continue;
            }
            if (group.length === 1) {
                setNumber(group[0], targets[0].planNumber);
                used.add(targets[0].planNumber);
                continue;
            }
            if (group.length > 7 || !group.every((row: any): any => hasNumber(row.room.area)))
                continue;
            const cents: any = (value: any): any => Math.round(value * 100);
            let bestScore: any = Infinity, solutions: any = ([] as any);
            const visit: any = (assignment: any, remaining: any, score: any): any => {
                if (score > bestScore)
                    return;
                if (!remaining.length) {
                    if (score < bestScore) {
                        bestScore = score;
                        solutions = ([] as any);
                    }
                    solutions.push(assignment);
                    return;
                }
                const index: any = assignment.length;
                remaining.forEach((target: any, position: any): any => visit(assignment.concat(target), remaining.filter((_: any, i: any): any => i !== position), score + (cents(group[index].room.area) - cents(target.area)) ** 2));
            };
            visit(([] as any), targets, 0);
            const rowValue: any = (row: any): any => ([row.room.name, row.room.kind, cents(row.room.area)] as any).join('|');
            // Identical balcony rows can be numbered deterministically: every optimal
            // assignment presents the exact same name and area at both markers.
            const harmlessTie: any = targets.every((target: any): any => new Set(solutions.map((solution: any): any => rowValue(group[solution.findIndex((item: any): any => item.planNumber === target.planNumber)]))).size === 1);
            group.forEach((row: any, index: any): any => {
                const candidates: any = ([...new Set(solutions.map((solution: any): any => solution[index].planNumber))] as any).sort((left: any, right: any): any => left - right);
                if (solutions.length === 1 || harmlessTie)
                    setNumber(row, solutions[0][index].planNumber);
                else {
                    row.candidateNumbers = candidates;
                    row.planNumber = candidates.length === 1 ? candidates[0] : null;
                }
                row.candidateNumbers.forEach((number: any): any => used.add(number));
            });
        }
        return rows;
    }
    function detailRooms(a: any): any {
        const layoutSummary: any = typeof a.layoutLabel === 'string' && a.layoutLabel.trim() ? a.layoutLabel.trim().replace(/hálószoba/giu, 'szoba') : hasNumber(a.rooms) ? `${number.format(a.rooms)} szoba` : '';
        const rooms: any = `<div class="detail-rooms"><h3>Helyiséglista.${layoutSummary ? ` <span class="detail-layout-label">${esc(layoutSummary)}</span>` : ''}</h3><div class="room-page"><ol class="type-room-list">${numberedUnitRooms(a).sort((left: any, right: any): any => (left.planNumber ?? Infinity) - (right.planNumber ?? Infinity)).map(({ room, planNumber }: any): any => `<li>${planNumber ? `<button type="button" class="room-legend-button" data-plan-room="${planNumber}" aria-pressed="false">` : '<div class="room-legend-button">'}<span class="room-number">${planNumber ? String(planNumber).padStart(2, '0') : '—'}</span><span class="room-name">${esc(roomLabel(room.name))}</span><span class="room-area">${area(room.area)}</span>${planNumber ? '</button>' : '</div>'}</li>`).join('') || '<li>A helyiséglista még nem érhető el.</li>'}</ol></div></div>`;
        return `<section class="detail-room-panel" data-detail-panel="rooms" id="detail-panel-rooms" role="tabpanel" aria-labelledby="detail-tab-rooms">${rooms}</section>`;
    }
    function detailMetrics(a: any): any {
        return `<dl class="detail-metrics${a.areaGarden > 0 ? ' has-garden' : ''}"><div class="detail-id-metric"><dt>Lakás<wbr>szám</dt><dd><h2 class="detail-apartment-number">${esc(a.id)}</h2></dd></div>${detailMetric('Beltér', a.areaInterior)}${detailMetric('Erkély', a.areaTerrace)}${hasNumber(a.areaGarden) && a.areaGarden > 0 ? detailMetric('Kert', a.areaGarden) : ''}</dl>`;
    }
    function detailPrice(a: any): any {
        return hasNumber(a.price) ? `<span class="price-value">${priceNumber.format(a.price)}</span> <small class="price-unit">Ft</small>` : `<span class="price-unavailable">${esc(apartmentPrice(a))}</span>`;
    }
    function detailUnitMeta(a: any): any {
        const caption: any = String(floorText(a)), match: any = /^(.*?)\s*emelet$/iu.exec(caption);
        const floor: any = match && match[1].trim() ? `<strong>${esc(match[1].trim())}</strong> emelet` : `<strong${a.floor === 0 ? ' class="detail-meta-ground"' : ''}>${esc(caption)}</strong>`;
        return `<span class="detail-meta-item"><strong>${esc(a.apartmentType || '')}</strong> típus</span> <span class="detail-meta-separator">·</span> <span class="detail-meta-item"><strong>${esc(a.building)}</strong> épület</span> <span class="detail-meta-separator">·</span> <span class="detail-meta-item">${floor}</span> <span class="detail-meta-separator">·</span> <span class="detail-meta-item detail-meta-orientation"><strong>${esc(a.orientation || 'Nincs adat')}</strong> tájolás</span>`;
    }
    function refreshFacts(): any {
        const dialog: any = $('detail-dialog'), a: any = dialog?.open && byId(dialog.dataset.apartment);
        if (!a)
            return false;
        const next: any = factsSignature(a);
        if (next === renderedFactsSignature)
            return false;
        renderedFactsSignature = next;
        const metrics: any = dialog.querySelector('.detail-area-row'), amount: any = dialog.querySelector('.detail-price p'), status: any = dialog.querySelector('.detail-status'), meta: any = dialog.querySelector('.detail-unit-meta');
        if (metrics)
            metrics.innerHTML = detailMetrics(a);
        if (amount)
            amount.innerHTML = detailPrice(a);
        if (status)
            status.innerHTML = `<span class="status-pill status-${esc(a.status)}">${esc(statusText(a))}</span>`;
        if (meta)
            meta.innerHTML = detailUnitMeta(a);
        const summary: any = typeof a.layoutLabel === 'string' && a.layoutLabel.trim() ? a.layoutLabel.trim().replace(/hálószoba/giu, 'szoba') : hasNumber(a.rooms) ? `${number.format(a.rooms)} szoba` : '';
        for (const heading of dialog.querySelectorAll('.detail-room-panel h3'))
            heading.innerHTML = `Helyiséglista.${summary ? ` <span class="detail-layout-label">${esc(summary)}</span>` : ''}`;
        // A refresh must not deliver a PDF snapshot carrying an old price or status.
        pdfExportJob?.controller.abort();
        pdfExportJob = null;
        requestAnimationFrame(fitDetailRooms);
        return true;
    }
    type DetailDocument = 'plan' | 'floor' | 'building';
    type PlanBounds = readonly [number, number, number, number];
    type PlanBuilding = 'A' | 'B' | 'C';
    const documentNames: Record<DetailDocument, string> = {
        plan: 'Alaprajz', floor: 'Szintrajz', building: 'Épület közelről',
    };
    const floorLocations: Record<string, {
        overview: PlanBounds;
        buildings: Record<PlanBuilding, PlanBounds>;
        units: Record<string, string>;
    }> = {"00":{"overview":[45,33,2510,1310],"buildings":{"A":[143,281,753,1205],"B":[834,163,1746,710],"C":[1767,374,2417,1298]},"units":{"A001":"M252 358L385 358L385 393L424 393L441 395L441 494L430 495L430 572L297 572L297 504L252 504Z","A002":"M497 358L629 358L629 504L586 504L586 572L453 572L452 570L453 497L452 495L442 494L442 395L459 393L498 393Z","A003":"M453 572L585 572L585 589L631 589L631 689L584 689L582 698L470 699L470 701L453 701Z","A004":"M453 786L470 786L470 788L582 789L584 798L631 798L631 898L585 898L585 915L453 915Z","A005":"M454 914L587 914L587 982L631 982L631 1128L498 1128L498 1093L460 1093L443 1091L443 992L453 991L454 989Z","A006":"M297 914L430 914L431 916L430 989L431 991L441 992L441 1091L424 1093L386 1093L386 1128L253 1128L253 982L297 982Z","B001":"M1513 256L1659 256L1659 389L1624 389L1624 428L1622 445L1523 445L1522 434L1445 434L1445 301L1513 301Z","B002":"M1523 446L1622 446L1624 463L1624 502L1659 501L1659 633L1513 633L1513 590L1445 590L1445 457L1520 457L1522 456Z","B003":"M1316 457L1445 457L1445 589L1428 589L1428 635L1328 635L1328 588L1319 586L1318 474L1316 474Z","B004":"M1102 457L1231 457L1231 474L1229 474L1228 586L1219 588L1219 635L1119 635L1119 589L1102 589Z","B005":"M926 447L1025 447L1026 457L1028 458L1103 458L1103 591L1035 591L1035 635L889 635L889 502L924 502L924 464Z","B006":"M889 257L1035 257L1035 301L1103 301L1103 434L1028 434L1026 435L1025 445L926 445L924 428L924 390L889 390Z","C001":"M2116 878L2249 878L2249 891L2293 891L2293 991L2251 991L2251 994L2248 995L2246 1004L2134 1005L2134 1007L2116 1007Z","C002":"M2117 1008L2250 1008L2250 1076L2294 1076L2294 1222L2161 1222L2161 1187L2123 1187L2106 1185L2106 1086L2116 1085L2117 1083Z","C003":"M1961 1007L2094 1007L2095 1009L2094 1082L2095 1084L2105 1085L2105 1184L2088 1186L2050 1186L2050 1221L1917 1221L1917 1075L1961 1075Z","C004":"M1961 878L2094 878L2094 1007L2076 1007L2076 1005L1964 1004L1962 995L1959 994L1959 991L1917 991L1917 891L1961 891Z","C005":"M1963 665L2095 665L2095 794L2078 794L2078 792L1966 791L1964 782L1917 782L1917 682L1963 682Z","C006":"M1917 451L2050 451L2050 486L2089 486L2106 488L2106 587L2095 588L2095 665L1962 665L1962 597L1917 597Z","C007":"M2162 451L2294 451L2294 597L2251 597L2251 665L2118 665L2117 663L2118 590L2117 588L2107 587L2107 488L2124 486L2163 486Z","C008":"M2118 665L2250 665L2250 682L2296 682L2296 782L2249 782L2247 791L2135 792L2135 794L2118 794Z"}},"01":{"overview":[45,33,2510,1310],"buildings":{"A":[152,272,754,1195],"B":[841,170,1710,701],"C":[1811,366,2413,1289]},"units":{"A101":"M306 562L439 562L439 691L421 691L421 689L310 688L306 678L272 678L272 581L306 580Z","A102":"M272 358L393 358L394 383L432 383L449 385L449 485L439 485L439 562L305 562L305 494L272 494Z","A103":"M508 359L630 359L630 495L597 496L597 618L466 618L465 616L463 488L451 484L451 387L477 383L508 383Z","A104":"M462 616L631 616L631 690L597 691L597 774L631 775L631 850L549 850L462 847Z","A105":"M466 848L597 848L597 971L630 971L630 1108L509 1108L508 1083L473 1083L451 1080L451 983L463 978Z","A106":"M305 906L439 906L439 981L449 981L449 1081L432 1083L394 1083L393 1108L272 1107L272 972L305 972Z","A107":"M358 777L439 777L439 906L306 906L306 886L272 885L272 788L306 788L310 778Z","B101":"M1337 257L1435 257L1435 291L1454 291L1454 425L1325 425L1327 295L1337 291Z","B102":"M1522 257L1657 258L1657 379L1632 379L1632 419L1630 436L1531 435L1529 424L1454 424L1454 291L1521 291Z","B103":"M1532 436L1629 437L1632 459L1632 493L1657 494L1657 615L1520 615L1520 582L1397 582L1397 450L1527 448Z","B104":"M1168 447L1399 447L1399 616L1325 615L1325 582L1241 582L1241 616L1165 616L1165 544Z","B105":"M936 436L1033 436L1038 448L1167 450L1167 582L1044 582L1044 615L908 615L908 493L932 493L932 461Z","B106":"M908 257L1042 257L1043 291L1110 291L1110 425L1036 424L1034 425L1034 435L935 436L932 415L932 379L908 379Z","B107":"M1130 257L1227 257L1227 291L1237 294L1239 425L1110 425L1110 291L1129 291Z","C101":"M2127 873L2257 873L2259 883L2294 883L2294 982L2259 983L2259 1066L2294 1067L2294 1204L2170 1204L2169 1178L2113 1178L2113 1077L2129 1077Z","C102":"M1968 943L2100 943L2103 1073L2114 1078L2114 1175L2092 1178L2057 1178L2057 1203L1935 1203L1935 1066L1968 1066Z","C103":"M1935 711L2103 711L2103 942L2017 945L1934 945L1934 870L1968 869L1969 787L1967 785L1935 786Z","C104":"M1935 454L2057 454L2057 478L2089 478L2114 482L2114 579L2102 584L2103 602L2100 713L1968 713L1968 590L1935 590Z","C105":"M2171 453L2292 454L2292 588L2258 589L2258 657L2125 657L2125 581L2114 579L2114 480L2131 478L2170 478Z","C106":"M2125 657L2258 657L2258 675L2292 675L2292 773L2258 773L2255 783L2143 784L2143 786L2125 786Z"}},"02":{"overview":[45,33,2510,1310],"buildings":{"A":[216,270,754,1193],"B":[842,170,1731,699],"C":[1823,364,2339,1287]},"units":{"A201":"M271 356L395 356L395 381L451 381L451 481L436 482L436 688L309 687L305 677L271 677L271 578L306 577L306 492L271 492Z","A202":"M508 357L630 357L630 493L597 494L597 616L466 616L465 614L463 486L451 482L451 385L477 381L508 381Z","A203":"M462 614L631 614L631 688L597 689L597 772L631 773L631 848L549 848L462 845Z","A204":"M466 846L597 846L597 969L630 969L630 1106L509 1106L508 1081L473 1081L451 1078L451 981L463 976Z","A205":"M308 777L437 777L436 981L452 982L452 1082L396 1082L395 1108L271 1108L271 972L305 972L305 887L271 887L271 787L306 787Z","B201":"M1337 256L1435 256L1435 290L1454 290L1454 424L1325 424L1327 294L1337 290Z","B202":"M1522 256L1657 257L1657 378L1632 378L1632 418L1630 435L1531 434L1529 423L1454 423L1454 290L1521 290Z","B203":"M1532 435L1629 436L1632 458L1632 492L1657 493L1657 614L1520 614L1520 581L1397 581L1397 449L1527 447Z","B204":"M1168 446L1399 446L1399 615L1325 614L1325 581L1241 581L1241 615L1165 615L1165 543Z","B205":"M936 435L1033 435L1038 447L1167 449L1167 581L1044 581L1044 614L908 614L908 492L932 492L932 460Z","B206":"M908 256L1042 256L1043 290L1110 290L1110 424L1036 423L1034 424L1034 434L935 435L932 414L932 378L908 378Z","B207":"M1130 256L1227 256L1227 290L1237 293L1239 424L1110 424L1110 290L1129 290Z","C201":"M2127 872L2257 872L2259 882L2294 882L2294 981L2259 982L2259 1065L2294 1066L2294 1203L2170 1203L2169 1177L2113 1177L2113 1076L2129 1076Z","C202":"M1968 942L2100 942L2103 1072L2114 1077L2114 1174L2092 1177L2057 1177L2057 1202L1935 1202L1935 1065L1968 1065Z","C203":"M1935 710L2103 710L2103 941L2017 944L1934 944L1934 869L1968 868L1969 786L1967 784L1935 785Z","C204":"M1935 453L2057 453L2057 477L2089 477L2114 481L2114 578L2102 583L2103 601L2100 712L1968 712L1968 589L1935 589Z","C205":"M2169 452L2294 453L2294 587L2259 588L2259 673L2293 674L2293 773L2259 773L2255 784L2128 783L2129 578L2114 577L2114 477L2169 477Z"}},"03":{"overview":[45,33,2510,1310],"buildings":{"A":[215,267,677,1191],"B":[851,166,1711,705],"C":[1880,364,2341,1288]},"units":{"A301":"M270 354L394 354L395 380L450 380L450 480L435 480L435 686L308 686L304 675L270 675L270 576L305 575L305 491L270 490Z","A302":"M506 355L628 355L628 490L596 490L596 568L628 568L628 688L596 688L596 731L466 731L465 497L464 480L450 479L450 383L451 380L506 380Z","A303":"M464 730L594 730L594 771L628 771L628 892L594 892L594 968L628 968L628 1105L506 1105L505 1079L452 1079L452 982L464 982Z","A304":"M307 773L436 773L435 977L451 978L451 1079L394 1079L394 1104L270 1104L270 968L304 968L304 883L270 883L270 784L305 784Z","B301":"M1337 255L1435 255L1436 289L1521 289L1522 255L1658 255L1658 378L1632 379L1632 434L1532 434L1532 419L1326 420L1326 293L1336 289Z","B302":"M1599 434L1631 434L1632 491L1658 492L1657 615L1520 615L1519 580L1444 580L1444 615L1323 615L1322 581L1280 580L1281 450L1514 450L1529 449L1531 435Z","B303":"M931 438L1029 438L1029 450L1281 450L1281 581L1241 581L1241 615L1119 615L1119 581L1042 581L1042 615L905 615L905 492L931 491Z","B304":"M905 255L1041 255L1042 289L1127 289L1128 255L1226 255L1227 289L1237 293L1237 420L1031 419L1031 434L931 434L931 379L905 379Z","C301":"M2127 870L2256 870L2258 880L2293 881L2293 980L2258 981L2258 1064L2293 1065L2293 1201L2169 1201L2169 1176L2112 1176L2112 1075L2128 1074Z","C302":"M1967 826L2097 826L2097 1078L2109 1078L2109 1175L2056 1175L2055 1201L1933 1201L1933 1064L1967 1064L1967 988L1933 988L1933 867L1967 867Z","C303":"M1934 451L2055 451L2056 476L2111 476L2112 575L2098 576L2097 588L2096 827L1966 827L1966 784L1934 784L1934 664L1966 664L1966 586L1934 586Z","C304":"M2168 450L2292 450L2293 452L2293 586L2258 586L2258 671L2292 672L2292 771L2259 771L2254 782L2127 781L2128 576L2113 576L2113 476L2168 476Z"}}};
    const floorLabelPoints: Record<PlanBuilding, readonly [number, number]> = {"A":[113.5,809.5],"B":[1282.5,86.5],"C":[2440,809.5]};
    const floorCompass = {"x":2400.5,"y":159,"angle":23};
    const drawingWidth = 2560, drawingHeight = 1600;

    interface FloorLegendRow {
        type: string;
        color: string;
        interior: string;
        exterior: string;
    }
    // Type figures and swatches transcribed from the customer book, pages 3–6.
    const floorLegends: Record<string, FloorLegendRow[]> = {"00":[{"type":"A","color":"#f0ddce","interior":"47,48","exterior":"17,40"},{"type":"B","color":"#fbece5","interior":"68,67","exterior":"23,01 – 39,00"}],"01":[{"type":"A","color":"#f0ddce","interior":"47,48","exterior":"11,51"},{"type":"B","color":"#fbece5","interior":"68,67","exterior":"28,00"},{"type":"C","color":"#ede8ff","interior":"89,66","exterior":"28,00"},{"type":"D","color":"#f8ddf0","interior":"88,88","exterior":"17,46"},{"type":"E1","color":"#f0f7d5","interior":"117,00","exterior":"39,51"}],"02":[{"type":"A","color":"#f0ddce","interior":"47,48","exterior":"11,51"},{"type":"B","color":"#fbece5","interior":"68,63","exterior":"28,00"},{"type":"C","color":"#ede8ff","interior":"89,65","exterior":"28,00"},{"type":"D","color":"#f8ddf0","interior":"88,88","exterior":"17,46"},{"type":"E1","color":"#feffef","interior":"117,01","exterior":"39,51"},{"type":"E2","color":"#e3f4e2","interior":"115,72","exterior":"39,51"}],"03":[{"type":"E","color":"#f0f7d5","interior":"118,38","exterior":"39,51"},{"type":"E2","color":"#e3f4e2","interior":"115,74","exterior":"39,51"},{"type":"F","color":"#f1f7f7","interior":"136,51","exterior":"42,09"},{"type":"F1","color":"#dcebfe","interior":"134,28","exterior":"42,09"},{"type":"F2","color":"#dbfbf0","interior":"133,56","exterior":"42,09"}]};

    function floorLegend(rows: FloorLegendRow[], groundFloor: boolean) {
        const entries = rows.map(row => `<tr data-floor-legend-row="${row.type}">
              <th scope="row"><span class="detail-floor-legend-type"><span class="detail-floor-legend-swatch" data-floor-legend-swatch="" style="background-color:${row.color}" aria-hidden="true"></span>${row.type}</span></th>
              <td>${row.interior}</td><td>${row.exterior}</td>
            </tr>`).join('');
        return `<aside class="detail-floor-legend" data-floor-legend="" data-placement="dock" aria-labelledby="detail-floor-legend-heading">
                  <h3 id="detail-floor-legend-heading" data-floor-legend-heading="">Lakástípusok</h3>
                  <table><thead><tr><th scope="col">Típus</th><th scope="col">Beltér (m²)</th><th scope="col">${groundFloor ? 'Terasz' : 'Erkély'} (m²)</th></tr></thead><tbody>${entries}</tbody></table>
                  <p class="detail-floor-legend-note">Pontos méretek a lakás adatlapján.</p>
                </aside>`;
    }

    function getFloorLocation(apartment: { id: string; building: string; floor: number }, full: string) {
        const source = new URL(full);
        const level = source.pathname.match(/\/floor-layouts\/(0[0-3])\/full\.webp$/)?.[1];
        if (!level || Number(level) !== apartment.floor) return null;
        const floor = floorLocations[level], building = apartment.building as PlanBuilding;
        if (!floor || !Object.prototype.hasOwnProperty.call(floor.buildings, building) ||
            !apartment.id.startsWith(building)) return null;
        return {
            level,
            overview: floor.overview,
            building: floor.buildings[building],
            unit: Object.prototype.hasOwnProperty.call(floor.units, apartment.id) ? floor.units[apartment.id] : null,
        };
    }
    function floorDrawing(apartment: any, floor: { full: string }, hidden: boolean) {
        const location = getFloorLocation(apartment, floor.full);
        const level = esc(floorText(apartment));
        const building = esc(apartment.building);
        const id = esc(apartment.id);
        const image = `<img class="detail-floor-image" data-detail-image="floor" data-image-url="${esc(floor.full)}" alt="${level} szintrajza" decoding="async">`;
        let drawing = image;
        if (location) {
            const labels = (Object.entries(floorLabelPoints) as [PlanBuilding, readonly [number, number]][])
                .map(([letter, [x, y]]) => `<g data-floor-building-label="${letter}" transform="translate(${x} ${y})"><circle r="36"/><text y="15" font-size="43">${letter}</text></g>`).join('');
            const { x, y, angle } = floorCompass;
            const compass = `<g data-floor-compass="" transform="translate(${x} ${y})"><circle r="67"/><path class="detail-floor-compass-arrow" transform="rotate(${angle})" d="M0 -41 16 26 0 15 -16 26Z"/><text y="-80" font-size="44">É</text></g>`;
            const unit = location.unit
                ? `<path class="detail-floor-location-halo" data-floor-unit-halo="" d="${esc(location.unit)}" vector-effect="non-scaling-stroke"/><path class="detail-floor-location" data-floor-unit="${id}" d="${esc(location.unit)}" vector-effect="non-scaling-stroke"/>`
                : '';
            drawing = `<div class="detail-floor-viewport" data-floor-viewport="" data-overview-bounds="${location.overview.join(',')}" data-building-bounds="${location.building.join(',')}">
                <div class="detail-floor-sheet" data-floor-sheet="">${image}
                  <svg class="detail-floor-locations" viewBox="0 0 ${drawingWidth} ${drawingHeight}" aria-hidden="true">
                    ${unit}<g class="detail-floor-map-labels">${labels}${compass}</g>
                  </svg>
                </div>
                <span class="detail-floor-lake" role="img" aria-label="A rajz alsó széle a Balaton felé néz.">Balaton</span>
                ${floorLegend(floorLegends[location.level], location.level === '00')}
              </div>`;
        }
        return `<section class="detail-floor-plan" data-detail-image-stage="floor" data-image-state="idle" data-document-panel="floor" id="detail-document-floor" aria-label="Szintrajz"${hidden ? ' hidden' : ''}>
            <p class="detail-section-label" data-floor-caption="" data-overview-caption="${level} · A, B, C épület" data-building-caption="${level} · ${building} épület">${level} · A, B, C épület</p>
            ${detailImageFeedback('floor')}${drawing}<p class="detail-plan-note">${id} · ${building} épület</p>
          </section>`;
    }
    function fitFloorDrawing(viewport: HTMLElement) {
        const { clientWidth: width, clientHeight: height } = viewport;
        if (width < 1 || height < 1) return;
        const fit = ([left, top, right, bottom]: number[], availableHeight = height) => {
            const scale = Math.min(Math.max(1, width - 16) / (right - left), Math.max(1, availableHeight - 16) / (bottom - top));
            const x = -(left + right) * scale / 2;
            const y = (availableHeight - height) / 2 - (top + bottom) * scale / 2;
            return { scale, x, y, transform: `translate(${x}px,${y}px) scale(${scale})` };
        };
        const overview = viewport.dataset.overviewBounds!.split(',').map(Number);
        const building = viewport.dataset.buildingBounds!.split(',').map(Number);
        const [left, top, right, bottom] = building;
        // Keep the lakeside label next to the drawing, above a docked legend.
        const lakeSpace = 18;
        let overviewFit = fit(overview, height - lakeSpace);
        const legend = viewport.querySelector<HTMLElement>('[data-floor-legend]');
        if (legend) {
            // This clear rectangle between the three buildings is shared by all
            // four source drawings. Keep the legend in its own space at smaller sizes.
            const [gapLeft, gapTop, gapRight, gapBottom] = [760, 715, 1765, 1310];
            const fullLegendHeight = legend.scrollHeight + 2;
            const fitsGap = legend.offsetWidth + 8 <= (gapRight - gapLeft) * overviewFit.scale &&
                fullLegendHeight + 8 <= (gapBottom - gapTop) * overviewFit.scale;
            legend.dataset.placement = fitsGap ? 'center' : 'dock';
            if (fitsGap) {
                const x = width / 2 + overviewFit.x + (gapLeft + gapRight) * overviewFit.scale / 2;
                const y = height / 2 + overviewFit.y + (gapTop + gapBottom) * overviewFit.scale / 2;
                legend.style.setProperty('--floor-legend-x', `${x}px`);
                legend.style.setProperty('--floor-legend-y', `${y}px`);
            } else {
                // On very short screens, let the legend scroll independently and
                // retain at least part of the available height for the overview.
                const planSpace = Math.min(110, Math.max(48, height * .24));
                const limit = Math.max(18, height - planSpace);
                legend.style.setProperty('--floor-legend-max-height', `${limit}px`);
                overviewFit = fit(overview, Math.max(1, height - Math.min(fullLegendHeight, limit) - 7 - lakeSpace));
            }
            if (legend.scrollHeight > legend.clientHeight || legend.scrollWidth > legend.clientWidth)
                legend.tabIndex = 0;
            else legend.removeAttribute('tabindex');
        }
        const buildingFit = fit(building);
        viewport.style.setProperty('--floor-lake-y', `${height / 2 + overviewFit.y + overview[3] * overviewFit.scale + 3}px`);
        viewport.style.setProperty('--floor-lake-width', `${(overview[2] - overview[0]) * overviewFit.scale}px`);
        viewport.style.setProperty('--floor-overview-transform', overviewFit.transform);
        viewport.style.setProperty('--floor-building-transform', buildingFit.transform);
        // The outer CSS transform scales even a non-scaling SVG stroke.
        // Compensate so a short overview and a large building use the same edge weight.
        viewport.style.setProperty('--floor-overview-stroke', String(1 / Math.max(.02, overviewFit.scale)));
        viewport.style.setProperty('--floor-building-stroke', String(1 / Math.max(.02, buildingFit.scale)));
        viewport.style.setProperty('--floor-building-clip', `inset(${top}px ${drawingWidth - right}px ${drawingHeight - bottom}px ${left}px)`);
        if (!viewport.hasAttribute('data-view-sized')) {
            viewport.querySelector('[data-floor-sheet]')?.getBoundingClientRect();
            viewport.setAttribute('data-view-sized', '');
        }
    }

    function planArrowLabel(step: number, target: DetailDocument) {
        return `${step < 0 ? 'Előző rajz' : 'Következő rajz'}: ${documentNames[target]}`;
    }
    function planArrow(step: -1 | 1) {
        const label = planArrowLabel(step, 'floor');
        return `<button type="button" class="detail-plan-arrow" data-plan-step="${step}" aria-controls="detail-plan-documents" aria-label="${label}" title="${label}"><span aria-hidden="true"><svg viewBox="0 0 20 20" width="18" height="18" fill="none"><path d="m7 4 6 6-6 6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg></span></button>`;
    }
    function drawingAfter(dialog: HTMLElement, step: number): DetailDocument {
        const current = dialog.dataset.documentView;
        if (current === 'plan') return 'floor';
        const hasApartmentPlan = !!dialog.querySelector('[data-document-panel="plan"]');
        const hasBuildingView = !!dialog.querySelector('[data-floor-viewport]');
        if (!hasBuildingView) return 'plan';
        const forward = step === Number(dialog.dataset.planDirection);
        if (current === 'building') return forward && hasApartmentPlan ? 'plan' : 'floor';
        return forward || !hasApartmentPlan ? 'building' : 'plan';
    }
    function stepDetailDocument(step: number) {
        const dialog = $('detail-dialog');
        if (dialog.dataset.documentView === 'plan') dialog.dataset.planDirection = String(step);
        selectDetailDocument(drawingAfter(dialog, step));
    }

    function apartmentOrbitHref(id: string) {
        return `/?orbitApartment=${encodeURIComponent(id)}#orbit`;
    }
    function showInOrbitLink(id: string) {
        return `<a class="detail-orbit-link" data-orbit-show="${esc(id)}" href="${esc(apartmentOrbitHref(id))}"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2.8 20.5 7.6v8.8L12 21.2l-8.5-4.8V7.6L12 2.8Z M3.5 7.6 12 12.4l8.5-4.8 M12 12.4v8.8"/></svg><span>Megtekintés 3D-ben</span></a>`;
    }
    function detail(id: any): any {
        const a: any = byId(id);
        if (!a)
            return;
        selectedPlanRoom = null;
        hoverPlanRoom = null;
        focusedPlanRoom = null;
        const floor: any = mediaEntries(a).find((item: any): any => item.key === 'floorLayout');
        const plan = detailPlanUrl(a);
        const initialDocument: DetailDocument = floor && (requestedDocument === 'floor' || !plan) ? 'floor' : 'plan';
        const switchable = Boolean(floor && (plan || getFloorLocation(a, floor.full)));
        const monogram: any = assetUrl('assets/brand/ap-monogram.png'), logo: any = assetUrl('assets/brand/admiral-park-full-logo-no-location.svg');
        const dialog: any = $('detail-dialog');
        dialog.dataset.apartment = id;
        dialog.dataset.documentView = initialDocument;
        dialog.dataset.planDirection = '1';
        renderedFactsSignature = factsSignature(a);
        detailResize?.disconnect();
        dialog.innerHTML = `<div class="detail-shell" data-panel="plan"><div class="detail-brand-motif" aria-hidden="true"></div>
    <header class="detail-topbar"><div class="detail-top-save">${saveButton(a, true)}</div><div class="detail-top-actions"><button type="button" class="dialog-close" data-close aria-label="Bezárás">×</button></div></header>
    <div class="detail-layout">
      <aside class="detail-sidebar" aria-label="A lakás adatai">
        <div class="detail-core">
          <div class="detail-identity"><div class="detail-brand-group"><span class="detail-logo" role="img" aria-label="Admiral Park"></span></div></div>
          <div class="detail-area-row">${detailMetrics(a)}</div>
        </div>
        <hr class="detail-divider">
        ${detailRooms(a)}
        <div class="detail-conversion"><div class="detail-price"><p>${detailPrice(a)}</p></div><div class="detail-inquiry">${inquiry(a)}</div><div class="detail-downloads detail-footer">${downloadLink(a, true)}<div class="detail-status"><span class="status-pill status-${esc(a.status)}">${esc(statusText(a))}</span></div>${shareControl(a)}</div></div>
      </aside>
      <nav class="detail-panel-nav" role="tablist" aria-orientation="vertical" aria-label="Rajzok és helyiséglista"><button type="button" role="tab" id="detail-tab-plan" data-detail-tab="plan" aria-controls="detail-panel-plan" aria-selected="true" tabindex="0">Rajzok</button><button type="button" role="tab" id="detail-tab-rooms" data-detail-tab="rooms" aria-controls="detail-panel-rooms" aria-selected="false" tabindex="-1">Helyiség<wbr>lista</button></nav>
      <section class="detail-drawing" data-detail-panel="plan">
        <div class="detail-drawing-toolbar"><p class="detail-unit-meta">${detailUnitMeta(a)}</p></div>
        <div class="detail-plan-switcher" id="detail-panel-plan" role="tabpanel" aria-labelledby="detail-tab-plan"${switchable ? ' data-switchable' : ''}>
          ${switchable ? planArrow(-1) + planArrow(1) : ''}
          <div class="detail-plan-documents" id="detail-plan-documents">
            ${initialDocument === 'plan' || plan ? detailPlan(a, plan, initialDocument !== 'plan') : ''}
            ${floor ? floorDrawing(a, floor, initialDocument === 'plan') : ''}
          </div>
          ${switchable ? '<span class="sr-only" data-plan-announcement role="status">Alaprajz</span>' : ''}
          <p class="detail-illustration-note">Az alaprajz illusztráció. Bútorozatlan átadás. Bruttó vételár.</p>
        </div>
      </section>
    </div><div class="detail-bottom-actions">${showInOrbitLink(a.id)}</div><div class="toast detail-feedback" role="status" aria-live="polite"></div></div>`;
        const shell: any = dialog.querySelector('.detail-shell');
        if (monogram)
            shell.style.setProperty('--detail-monogram-image', `url("${monogram.replace(/"/g, '%22')}")`);
        if (logo)
            shell.style.setProperty('--detail-logo-image', `url("${logo.replace(/"/g, '%22')}")`);
        openDialog(dialog);
        dialog.scrollTop = 0;
        initializeDetailImages(dialog);
        selectDetailDocument(initialDocument);
        const floorViewport = dialog.querySelector('[data-floor-viewport]') as HTMLElement | null;
        const rooms = dialog.querySelector('.detail-room-panel');
        detailResize = new ResizeObserver(entries => {
            for (const { target } of entries) {
                if (target === floorViewport && floorViewport) fitFloorDrawing(floorViewport);
                else if (target === rooms) requestAnimationFrame(fitDetailRooms);
            }
        });
        if (rooms) detailResize.observe(rooms);
        if (floorViewport) detailResize.observe(floorViewport);
        requestAnimationFrame(fitDetailRooms);
    }
    function selectDetailPanel(value: any, focus: any = false): any {
        const dialog: any = $('detail-dialog'), shell: any = dialog.querySelector('.detail-shell');
        if (!shell)
            return;
        shell.dataset.panel = value;
        dialog.querySelectorAll('[data-detail-tab]').forEach((button: any): any => { const active: any = button.dataset.detailTab === value; button.setAttribute('aria-selected', String(active)); button.tabIndex = active ? 0 : -1; });
        if (focus && getComputedStyle(dialog.querySelector('.detail-panel-nav')).display !== 'none')
            dialog.querySelector('[data-detail-tab][aria-selected="true"]')?.focus(({ preventScroll: true } as any));
        requestAnimationFrame(fitDetailRooms);
    }
    function detailImageFeedback(kind: any): any {
        return `<div class="detail-image-feedback" data-detail-image-feedback="${kind}" role="status" aria-live="polite" hidden><p>Rajz betöltése…</p><button type="button" class="button-secondary" data-detail-image-retry="${kind}" hidden>Újrapróbálom</button></div>`;
    }
    function detailImageState(image: any, state: any): any {
        const stage: any = image.closest('[data-detail-image-stage]');
        if (!stage)
            return;
        stage.dataset.imageState = state;
        stage.setAttribute('aria-busy', String(state === 'loading'));
        const feedback: any = stage.querySelector('[data-detail-image-feedback]');
        if (!feedback)
            return;
        const failed: any = state === 'error';
        feedback.hidden = state === 'ready' || state === 'idle';
        feedback.querySelector('p').textContent = failed ? 'Nem sikerült betölteni a rajzot.' : 'Rajz betöltése…';
        const button: any = feedback.querySelector('[data-detail-image-retry]');
        if (button) {
            button.disabled = !failed;
            button.hidden = !failed;
        }
    }
    function startDetailImage(kind: any, retry: any = false): any {
        if (!(['plan', 'floor'] as any).includes(kind))
            return;
        const image: any = $('detail-dialog').querySelector(`img[data-detail-image="${kind}"]`);
        if (!image || !image.dataset.imageUrl)
            return;
        detailImageState(image, 'loading');
        let url: any = image.dataset.floorplanFallbackUsed === 'true' ? image.dataset.floorplanFallback : image.dataset.imageUrl;
        if (retry) {
            const fresh: any = new URL(url);
            fresh.searchParams.set('admiral-retry', String(Date.now()));
            url = fresh.href;
            image.removeAttribute('src');
        }
        image.src = url;
    }
    function selectDetailDocument(value: DetailDocument) {
        const dialog = $('detail-dialog') as HTMLElement;
        dialog.dataset.documentView = value;
        const showFloor = value !== 'plan';
        for (const panel of dialog.querySelectorAll<HTMLElement>('[data-document-panel]'))
            panel.hidden = panel.dataset.documentPanel !== (showFloor ? 'floor' : 'plan');
        const caption = dialog.querySelector<HTMLElement>('[data-floor-caption]');
        if (caption && showFloor)
            caption.textContent = (value === 'building' ? caption.dataset.buildingCaption : caption.dataset.overviewCaption) || '';
        for (const button of dialog.querySelectorAll<HTMLButtonElement>('[data-plan-step]')) {
            const step = Number(button.dataset.planStep);
            const label = planArrowLabel(step, drawingAfter(dialog, step));
            button.setAttribute('aria-label', label);
            button.title = label;
        }
        const announcement = dialog.querySelector('[data-plan-announcement]');
        if (announcement) announcement.textContent = documentNames[value];
        if (showFloor) {
            const viewport = dialog.querySelector<HTMLElement>('[data-floor-viewport]');
            if (viewport) fitFloorDrawing(viewport);
            if (!dialog.querySelector('img[data-detail-image="floor"]')?.hasAttribute('src'))
                startDetailImage('floor');
        } else if (!dialog.querySelector('img[data-detail-image="plan"]')?.hasAttribute('src')) {
            startDetailImage('plan');
        }
    }
    function fitDetailRooms(): any {
        const dialog: any = $('detail-dialog');
        if (signal.aborted || !dialog.open)
            return;
        const panel: any = dialog.querySelector('.detail-room-panel');
        panel?.style.setProperty('--room-slack', '0px');
        const frame: any = visibleRoomFrame(panel);
        if (!frame?.clientHeight)
            return;
        const list: any = frame.querySelector('ol,ul');
        if (!list)
            return;
        const rows: any = ([...list.children] as any);
        rows.forEach((row: any): any => row.hidden = false);
        let navigation: any = frame.parentElement.querySelector('.room-pagination');
        if (navigation)
            navigation.hidden = true;
        const columnWidth: any = parseFloat(getComputedStyle(frame).getPropertyValue('--room-column-width')) || 125;
        const maxColumns: any = Math.max(1, Math.min(4, Math.floor(frame.clientWidth / Math.max(100, columnWidth))));
        for (let columns: any = 1; columns <= maxColumns; columns++) {
            list.style.setProperty('--room-columns', String(columns));
            list.dataset.columns = String(columns);
            for (const padding of ([4, 2, 1, 0] as any)) {
                list.style.setProperty('--room-padding', `${padding}px`);
                list.style.setProperty('--room-circle', `${padding >= 2 ? 18 : 16}px`);
                // Use the actual fractional height; rounded clientHeight could clip the last row.
                if (list.getBoundingClientRect().height <= Math.floor(frame.getBoundingClientRect().height) - 1) {
                    frame.dataset.page = '0';
                    frame.dataset.pageSize = String(rows.length);
                    panel.style.setProperty('--room-slack', `${Math.max(0, frame.getBoundingClientRect().height - list.getBoundingClientRect().height - 1)}px`);
                    return;
                }
            }
        }
        // Very short landscape screens cannot fit every row without making the
        // text unreadable. Paginate only after the existing compact layout is full.
        if (!navigation) {
            navigation = (document as any).createElement('nav');
            navigation.className = 'room-pagination';
            navigation.setAttribute('aria-label', 'További helyiségek');
            navigation.innerHTML = '<button type="button" data-room-page="-1" aria-label="Előző helyiségek">←</button><span role="status" aria-live="polite"></span><button type="button" data-room-page="1" aria-label="Következő helyiségek">→</button>';
            frame.after(navigation);
        }
        navigation.hidden = false;
        let pageSize: any = 1;
        for (let count: any = 1; count <= rows.length; count++) {
            rows.forEach((row: any, index: any): any => row.hidden = index >= count);
            if (list.getBoundingClientRect().height > Math.floor(frame.getBoundingClientRect().height) - 1)
                break;
            pageSize = count;
        }
        const pages: any = Math.ceil(rows.length / pageSize), page: any = Math.max(0, Math.min(Number(frame.dataset.page) || 0, pages - 1));
        frame.dataset.page = String(page);
        frame.dataset.pageSize = String(pageSize);
        rows.forEach((row: any, index: any): any => row.hidden = index < page * pageSize || index >= (page + 1) * pageSize);
        navigation.querySelector('[data-room-page="-1"]').disabled = page === 0;
        navigation.querySelector('[data-room-page="1"]').disabled = page === pages - 1;
        navigation.querySelector('span').textContent = `${page + 1} / ${pages}`;
    }
    function visibleRoomFrame(panel: any): any {
        return panel?.querySelector('.room-page');
    }
    function paintPlanRoom(value: any): any {
        const dialog: any = $('detail-dialog'), number: any = value == null ? null : String(value);
        dialog.querySelectorAll('[data-plan-room]').forEach((button: any): any => { button.classList.toggle('is-active', button.dataset.planRoom === number); button.setAttribute('aria-pressed', String(button.dataset.planRoom === selectedPlanRoom)); });
    }
    function selectPlanRoom(value: any, origin: any): any {
        selectedPlanRoom = String(value);
        paintPlanRoom(selectedPlanRoom);
        const frame: any = visibleRoomFrame($('detail-dialog').querySelector('.detail-room-panel')), rows: any = frame?.querySelectorAll('li'), row: any = origin?.classList.contains('room-marker') ? ([...rows || ([] as any)] as any).findIndex((item: any): any => item.querySelector(`[data-plan-room="${selectedPlanRoom}"]`)) : -1;
        if (frame && row >= 0 && Number(frame.dataset.pageSize) > 0) {
            frame.dataset.page = String(Math.floor(row / Number(frame.dataset.pageSize)));
        }
        if (origin?.classList.contains('room-marker'))
            selectDetailPanel('rooms', true);
        else {
            selectDetailDocument('plan');
            selectDetailPanel('plan', true);
        }
    }
    function openMedia(id: any, kind: any): any {
        const a: any = byId(id);
        if (!a)
            return;
        const entries: any = mediaEntries(a);
        if (!entries.length)
            return;
        mediaView = ({ id, entries, index: Math.max(0, entries.findIndex((item: any): any => item.key === kind)), scale: 1, x: 0, y: 0, drag: null, token: 0 } as any);
        const dialog: any = $('media-dialog');
        dialog.innerHTML = `<div class="media-shell"><header class="media-header"><div class="media-heading"><p class="eyebrow">${esc(a.id)} · ${esc(a.building)} ÉPÜLET</p><h2 id="media-title"></h2><p class="media-description" id="media-description"></p></div><div class="media-tabs" role="tablist" aria-label="Rajz kiválasztása">${entries.map((item: any, index: any): any => `<button type="button" role="tab" id="media-tab-${item.key}" data-media-tab="${index}" aria-controls="media-image-region" aria-selected="false" tabindex="-1">${esc(item.name)}</button>`).join('')}</div><button class="dialog-close" data-close aria-label="Rajznézet bezárása">×</button></header><div class="media-stage" id="media-image-region" role="tabpanel" tabindex="0" aria-describedby="media-help"><div class="media-canvas"><img class="media-image" alt="" draggable="false" decoding="async"></div><div class="media-load-status" role="status" aria-live="polite"></div></div><footer class="media-footer"><p id="media-help">Nagyítás után húzza a rajzot, vagy használja a nyílbillentyűket.</p><div class="media-zoom" role="group" aria-label="Rajz nagyítása"><button data-zoom="out" aria-label="Kicsinyítés">−</button><button data-zoom="reset" class="zoom-level" aria-label="Nagyítás visszaállítása">100%</button><button data-zoom="in" aria-label="Nagyítás">+</button></div></footer></div>`;
        openDialog(dialog);
        showMedia(mediaView.index);
    }
    function showMedia(index: any): any {
        if (!mediaView)
            return;
        mediaView.index = (index + mediaView.entries.length) % mediaView.entries.length;
        mediaView.scale = 1;
        mediaView.x = 0;
        mediaView.y = 0;
        mediaView.drag = null;
        const current: any = mediaView.entries[mediaView.index], token: any = ++mediaSequence, dialog: any = $('media-dialog');
        mediaView.token = token;
        const image: any = dialog.querySelector('.media-image'), status: any = dialog.querySelector('.media-load-status');
        image.dataset.floorplanFallback = floorplanFallbackUrl(current.full) || '';
        delete image.dataset.floorplanFallbackUsed;
        dialog.dataset.loading = 'true';
        dialog.dataset.error = 'false';
        dialog.querySelector('#media-title').textContent = current.name;
        dialog.querySelector('.media-description').textContent = current.label;
        dialog.querySelector('.media-stage').setAttribute('aria-label', `${mediaView.id} – ${current.label}`);
        dialog.querySelector('.media-stage').setAttribute('aria-labelledby', `media-tab-${current.key}`);
        dialog.querySelector('.media-stage').setAttribute('aria-busy', 'true');
        dialog.querySelectorAll('[data-media-tab]').forEach((button: any): any => { const active: any = Number(button.dataset.mediaTab) === mediaView.index; button.setAttribute('aria-selected', String(active)); button.tabIndex = active ? 0 : -1; });
        image.removeAttribute('src');
        image.alt = `${mediaView.id} – ${current.label}`;
        status.textContent = 'Rajz betöltése…';
        image.onload = (): any => {
            if (!mediaView || token !== mediaView.token)
                return;
            dialog.dataset.loading = 'false';
            dialog.querySelector('.media-stage').setAttribute('aria-busy', 'false');
            status.textContent = '';
            updateMediaTransform();
        };
        image.onerror = (): any => {
            if (!mediaView || token !== mediaView.token)
                return;
            if (swapToFloorplanFallback(image))
                return;
            dialog.dataset.loading = 'false';
            dialog.dataset.error = 'true';
            dialog.querySelector('.media-stage').setAttribute('aria-busy', 'false');
            status.innerHTML = `<p>A nagy méretű rajz most nem tölthető be.</p><div><button class="button-secondary" data-media-retry>Újrapróbálom</button><a class="button-secondary" href="${esc(current.full)}" target="_blank" rel="noopener">Kép megnyitása új lapon ${svg('arrow')}</a></div>`;
        };
        image.src = current.full;
        updateMediaTransform();
    }
    function updateMediaTransform(): any {
        if (!mediaView)
            return;
        const dialog: any = $('media-dialog'), canvas: any = dialog.querySelector('.media-canvas'), image: any = dialog.querySelector('.media-image');
        if (!canvas || !image)
            return;
        const fit: any = image.naturalWidth ? Math.min(canvas.clientWidth / image.naturalWidth, canvas.clientHeight / image.naturalHeight) : 1;
        const maxX: any = Math.max(0, (image.naturalWidth * fit * mediaView.scale - canvas.clientWidth) / 2), maxY: any = Math.max(0, (image.naturalHeight * fit * mediaView.scale - canvas.clientHeight) / 2);
        mediaView.x = Math.max(-maxX, Math.min(maxX, mediaView.x));
        mediaView.y = Math.max(-maxY, Math.min(maxY, mediaView.y));
        image.style.transform = `translate(${mediaView.x}px,${mediaView.y}px) scale(${mediaView.scale})`;
        dialog.querySelector('.media-stage').dataset.zoomed = String(mediaView.scale > 1);
        const zoom: any = dialog.querySelector('.zoom-level');
        zoom.textContent = `${Math.round(mediaView.scale * 100)}%`;
        dialog.querySelector('[data-zoom="out"]').disabled = mediaView.scale <= 1;
        dialog.querySelector('[data-zoom="in"]').disabled = mediaView.scale >= 4;
    }
    function zoomMedia(action: any): any {
        if (!mediaView)
            return;
        mediaView.scale = action === 'reset' ? 1 : Math.max(1, Math.min(4, mediaView.scale + (action === 'in' ? .5 : -.5)));
        if (mediaView.scale === 1) {
            mediaView.x = 0;
            mediaView.y = 0;
        }
        updateMediaTransform();
    }
    async function downloadDatasheet(id: any, trigger: any): Promise<any> {
        function waitForExportData(promise: any, exportSignal: any): any {
            return new Promise((resolve: any, reject: any): any => {
                const abort: any = (): any => { const error: any = new Error('PDF export cancelled'); error.name = 'AbortError'; reject(error); };
                if (exportSignal.aborted) {
                    abort();
                    return;
                }
                exportSignal.addEventListener('abort', abort, ({ once: true } as any));
                Promise.resolve(promise).then((value: any): any => { exportSignal.removeEventListener('abort', abort); resolve(value); }, (error: any): any => { exportSignal.removeEventListener('abort', abort); reject(error); });
            });
        }
        if (signal.aborted)
            return ({ id, status: 'cancelled' } as any);
        const dialog: any = $('detail-dialog');
        const markBusy: any = (job: any): any => {
            if (!trigger || job.triggers.has(trigger))
                return;
            const label: any = trigger.querySelector('span');
            const previous: any = pdfTriggerOwners.get(trigger)?.triggers.get(trigger);
            job.triggers.set(trigger, previous || ({ label, text: label?.textContent, busy: trigger.getAttribute('aria-busy'), disabled: trigger.getAttribute('aria-disabled') } as any));
            pdfTriggerOwners.set(trigger, job);
            trigger.setAttribute('aria-busy', 'true');
            trigger.setAttribute('aria-disabled', 'true');
            if (label)
                label.textContent = 'PDF készül…';
        };
        if (pdfExportJob?.id === id) {
            markBusy(pdfExportJob);
            return pdfExportJob.promise;
        }
        pdfExportJob?.controller.abort();
        const controller: any = new AbortController(), job: any = ({ controller, id, fromDialog: dialog.open && dialog.dataset.apartment === id, triggers: new Map(), promise: null } as any);
        pdfExportJob = job;
        markBusy(job);
        const abort: any = (): any => controller.abort();
        signal.addEventListener('abort', abort, ({ once: true } as any));
        const stale: any = (): any => signal.aborted || controller.signal.aborted || pdfExportJob !== job || (job.fromDialog && (!dialog.open || dialog.dataset.apartment !== id));
        let timedOut: any = false;
        const timeout: any = setTimeout((): any => { timedOut = true; abort(); }, 45000);
        toast('A lakás adatlapja készül…');
        job.promise = (async (): Promise<any> => {
            try {
                if (!data)
                    await waitForExportData(load(), controller.signal);
                if (stale())
                    return ({ id, status: 'cancelled' } as any);
                const a: any = byId(id);
                if (!a)
                    throw new Error('A kiválasztott lakás nem található.');
                // A list-row download never initializes or opens the detail layout. Its theme
                // is inherited by the closed native dialog, just as it is by an open card.
                const shell: any = job.fromDialog ? dialog.querySelector('.detail-shell') : null, computed: any = getComputedStyle(shell || dialog);
                const colors: any = ({} as any);
                for (const [key, property, fallback] of ([(['top', '--detail-top', '#fdfbfb'] as any), (['bottom', '--detail-bottom', '#e4e9ec'] as any), (['ink', '--detail-ink', '#242824'] as any), (['muted', '--detail-muted', '#687074'] as any), (['watermarkTop', '--detail-watermark-top', '#f2f0f1'] as any), (['watermarkBottom', '--detail-watermark-bottom', '#d9dfe2'] as any), (['accent', '--accent', '#a38c69'] as any), (['frostedTint', '--frosted-button-tint', FROSTED_BUTTON_DEFAULTS.tint] as any), (['frostedText', '--frosted-button-text', FROSTED_BUTTON_DEFAULTS.text] as any)] as any))
                    colors[key] = computed.getPropertyValue(property).trim() || fallback;
                const statusProperty: any = ({ available: '--available', sold: '--sold', under_negotiation: '--negotiating', reserved: '--negotiating' } as any)[a.status] || '--detail-muted';
                colors.status = job.fromDialog ? getComputedStyle(dialog.querySelector('.status-pill')).color : computed.getPropertyValue(statusProperty).trim() || (({ available: '#4f7959', sold: '#b4564f', under_negotiation: '#b28a2f', reserved: '#b28a2f' } as any)[a.status] || colors.muted);
                if (!job.fromDialog && (['under_negotiation', 'reserved'] as any).includes(a.status))
                    colors.status = `color-mix(in srgb, ${colors.status} 60%, ${colors.ink})`;
                colors.controlBlue = computed.getPropertyValue('--detail-control-blue').trim() || '#225d82';
                colors.inquiryAccent = computed.getPropertyValue('--token-OWqJomPzk').trim() || '#145083';
                const layout: any = data.roomLayouts?.[a.apartmentType], markers: any = validPlanMarkers(layout);
                const roomRows: any = numberedUnitRooms(a)
                    .sort((left: any, right: any): any => (left.planNumber ?? Infinity) - (right.planNumber ?? Infinity))
                    .map(({ room, planNumber }: any): any => (({ number: planNumber, name: roomLabel(room.name), area: area(room.area) } as any)));
                const metric: any = (label: any, value: any): any => (({ label, value: hasNumber(value) ? number.format(value) : 'Nincs adat', unit: hasNumber(value) ? 'm²' : '' } as any));
                const floor: any = job.fromDialog && ['floor', 'building'].includes(dialog.dataset.documentView) ? mediaEntries(a).find((item: any): any => item.key === 'floorLayout') : null;
                const location = floor ? getFloorLocation(a, floor.full) : null;
                const buildingView = dialog.dataset.documentView === 'building';
                const bounds = location && (buildingView ? location.building : location.overview);
                const view: any = layout?.viewBox || ({ x: 0, y: 0, width: 1, height: 1 } as any);
                const validView: any = ([view.x, view.y, view.width, view.height] as any).every(hasNumber) && view.x >= 0 && view.y >= 0 && view.width > 0 && view.height > 0 && view.x + view.width <= 1.001 && view.y + view.height <= 1.001;
                const pageUrl: any = apartmentLink(a.id), inquiryUrl: any = safeUrl(config.inquiryUrl), actionUrl: any = new URL(inquiryUrl || pageUrl);
                if (inquiryUrl)
                    actionUrl.searchParams.set('apartment', a.id);
                const imageUrl = floor?.full || detailPlanUrl(a);
                const snapshot: any = ({
                    id: String(a.id), date: new Date(), colors,
                    metrics: ([({ label: 'Lakásszám', value: String(a.id) } as any), metric('Beltér', a.areaInterior), metric('Erkély', a.areaTerrace), ...(a.areaGarden > 0 ? ([metric('Kert', a.areaGarden)] as any) : ([] as any))] as any),
                    meta: ([a.apartmentType ? `${a.apartmentType} típus` : null, `${a.building} épület`, floorText(a), a.orientation ? `${a.orientation} tájolás` : null] as any).filter(Boolean).join(' · '),
                    documentLabel: floor ? (buildingView ? a.building + ' épület · ' + floorText(a) : 'Szintrajz') : 'Alaprajz',
                    imageUrl, imageFallbackUrl: floorplanFallbackUrl(imageUrl),
                    unitOutline: location?.unit,
                    overview: location && !buildingView ? { labels: floorLabelPoints, compass: floorCompass, legend: floorLegends[location.level], exteriorLabel: location.level==='00'?'Terasz':'Erkély' } : undefined,
                    viewBox: bounds ? { x:bounds[0]/drawingWidth, y:bounds[1]/drawingHeight, width:(bounds[2]-bounds[0])/drawingWidth, height:(bounds[3]-bounds[1])/drawingHeight } : floor || !validView ? ({ x: 0, y: 0, width: 1, height: 1 } as any) : ({ x: view.x, y: view.y, width: view.width, height: view.height } as any),
                    markers: floor ? ([] as any) : markers.map((marker: any): any => (({ number: marker.number, x: marker.x, y: marker.y } as any))),
                    roomRows, layoutLabel: typeof a.layoutLabel === 'string' ? a.layoutLabel.replace(/hálószoba/giu, 'szoba') : hasNumber(a.rooms) ? `${number.format(a.rooms)} szoba` : '',
                    price: hasNumber(a.price) ? priceNumber.format(a.price) : apartmentPrice(a), priceUnit: hasNumber(a.price) ? 'Ft' : '', status: statusText(a), pageUrl, actionUrl: actionUrl.href, actionIsInquiry: !!inquiryUrl, actionLabel: inquiryUrl ? 'Érdeklődöm' : 'Lakás megtekintése',
                    fontRegular: assetUrl('assets/fonts/montserrat/montserrat-pdf-regular.ttf'), fontSemibold: assetUrl('assets/fonts/montserrat/montserrat-pdf-semibold.ttf'),
                    logoUrl: assetUrl('assets/brand/admiral-park-full-logo-no-location.svg'), monogramUrl: assetUrl('assets/brand/ap-monogram.png'),
                } as any);
                const blob: any = await createAdmiralApartmentPdf(snapshot, ({ signal: controller.signal } as any));
                if (stale() && !timedOut)
                    return ({ id, status: 'cancelled' } as any);
                if (timedOut)
                    throw new Error('PDF export timeout');
                const url: any = URL.createObjectURL(blob);
                downloadUrls.add(url);
                const link: any = (document as any).createElement('a');
                link.href = url;
                link.download = `Admiral-Park-${String(a.id).replace(/[^A-Za-z0-9_-]/g, '-')}-adatlap.pdf`;
                (shell || (document as any).body).append(link);
                link.click();
                link.remove();
                const timer: any = setTimeout((): any => { URL.revokeObjectURL(url); downloadUrls.delete(url); pdfDownloadTimers.delete(timer); }, 30000);
                pdfDownloadTimers.add(timer);
                toast('A lakás adatlapjának letöltése elindult.');
                return ({ id, status: 'downloaded' } as any);
            }
            catch (error: any) {
                if (stale() && !timedOut)
                    return ({ id, status: 'cancelled' } as any);
                toast('Nem sikerült elkészíteni a PDF-et. Próbálja újra.');
                return ({ id, status: 'error' } as any);
            }
            finally {
                clearTimeout(timeout);
                controller.abort();
                signal.removeEventListener('abort', abort);
                if (pdfExportJob === job)
                    pdfExportJob = null;
                for (const [button, previous] of job.triggers) {
                    if (pdfTriggerOwners.get(button) !== job)
                        continue;
                    pdfTriggerOwners.delete(button);
                    for (const [attribute, value] of ([(['aria-busy', previous.busy] as any), (['aria-disabled', previous.disabled] as any)] as any))
                        if (value === null)
                            button.removeAttribute(attribute);
                        else
                            button.setAttribute(attribute, value);
                    if (previous.label)
                        previous.label.textContent = previous.text;
                }
            }
        })();
        return job.promise;
    }
    function apartmentLink(id: any): any { const u: any = new URL(safeUrl(config.pageUrl) || location.href); for (const key of (['building', 'floor', 'rooms', 'bedrooms', 'status', 'minArea', 'maxArea', 'minPrice', 'maxPrice', 'terrace', 'garden', 'favoritesOnly', 'search', 'sort'] as any))
        u.searchParams.delete(key); u.searchParams.set('apartment', id); return u.href; }
    const sendIcon: any = '<svg viewBox="0 0 24 24" width="21" height="21" fill="none" aria-hidden="true"><path d="m21 3-7.2 18-3.6-7.2L3 10.2 21 3Zm0 0L10.2 13.8" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    function sharePayload(a: any): any {
        return ({ title: `Admiral Park · ${a.id}`, text: `Admiral Park ${a.id} lakás · ${area(a.areaInterior)} beltér · ${area(a.areaTerrace)} erkély${hasNumber(a.price) ? ` · ${price(a.price)}` : ''}`, url: apartmentLink(a.id) } as any);
    }
    function shareControl(a: any): any {
        const payload: any = sharePayload(a), email: any = `mailto:?subject=${encodeURIComponent(payload.title)}&body=${encodeURIComponent(payload.text + '\n\n' + payload.url)}`, whatsapp: any = `https://wa.me/?text=${encodeURIComponent(payload.text + '\n' + payload.url)}`;
        return `<div class="detail-share-wrap"><button type="button" class="share-button footer-pill" data-share="${esc(a.id)}" title="Lakás megosztása" aria-label="${esc(a.id)} lakás megosztása" aria-haspopup="dialog" aria-expanded="false" aria-controls="detail-share-menu">${sendIcon}<span>Küldd el valakinek</span></button><div class="share-popover" id="detail-share-menu" role="dialog" aria-label="Lakás megosztása" hidden><div class="share-heading"><div><span>Lakás megosztása</span><strong>${esc(a.id)}</strong></div><button type="button" data-share-close aria-label="Megosztás bezárása">×</button></div><div class="share-options"><button type="button" data-share-copy="${esc(a.id)}"><span aria-hidden="true">↗</span>Link másolása</button><a data-share-email href="${esc(email)}"><span aria-hidden="true">@</span>E-mail</a><a data-share-whatsapp href="${esc(whatsapp)}" target="_blank" rel="noopener noreferrer"><span aria-hidden="true">↗</span>WhatsApp</a></div><label class="sr-only" for="detail-share-url">A lakás hivatkozása</label><input class="share-url" id="detail-share-url" type="text" readonly value="${esc(payload.url)}"><output class="share-feedback" role="status" aria-live="polite"></output></div></div>`;
    }
    function shareMenu(): any { return $('detail-dialog')?.querySelector('.share-popover'); }
    function closeShare(restore: any = true): any {
        const menu: any = shareMenu();
        if (!menu || menu.hidden)
            return false;
        menu.hidden = true;
        const button: any = $('detail-dialog').querySelector('[data-share]');
        button?.setAttribute('aria-expanded', 'false');
        if (restore)
            button?.focus(({ preventScroll: true } as any));
        return true;
    }
    function positionShareMenu(): any {
        const dialog: any = $('detail-dialog'), menu: any = shareMenu();
        if (!dialog?.open || !menu || menu.hidden)
            return;
        const bounds: any = dialog.getBoundingClientRect(), anchor: any = dialog.querySelector('[data-share]').getBoundingClientRect(), close: any = dialog.querySelector('[data-close]').getBoundingClientRect();
        const width: any = menu.getBoundingClientRect().width, height: any = menu.getBoundingClientRect().height, minTop: any = close.bottom + 8, maxTop: any = bounds.bottom - height - 12;
        const preferred: any = anchor.top - height - 8 >= minTop ? anchor.top - height - 8 : anchor.bottom + 8;
        menu.style.left = `${Math.max(bounds.left + 12, Math.min(anchor.right - width, bounds.right - width - 12))}px`;
        menu.style.top = `${Math.max(minTop, Math.min(preferred, maxTop))}px`;
    }
    function openShareMenu(id: any): any {
        const dialog: any = $('detail-dialog'), menu: any = shareMenu();
        if (!dialog.open || dialog.dataset.apartment !== id || !menu)
            return;
        menu.hidden = false;
        dialog.querySelector('[data-share]')?.setAttribute('aria-expanded', 'true');
        positionShareMenu();
        menu.querySelector('[data-share-copy]')?.focus(({ preventScroll: true } as any));
    }
    async function shareApartment(id: any, trigger: any): Promise<any> {
        const a: any = byId(id);
        if (!a || trigger.getAttribute('aria-busy') === 'true')
            return;
        if (closeShare())
            return;
        const payload: any = sharePayload(a);
        if (typeof navigator.share === 'function') {
            trigger.setAttribute('aria-busy', 'true');
            try {
                await navigator.share(payload);
                return;
            }
            catch (error: any) {
                if (error?.name === 'AbortError' || signal.aborted || !trigger.isConnected)
                    return;
            }
            finally {
                trigger.removeAttribute('aria-busy');
            }
        }
        openShareMenu(id);
    }
    async function copyShareLink(id: any): Promise<any> {
        const menu: any = shareMenu();
        if (!menu || menu.hidden)
            return;
        const copied: any = await copyText(apartmentLink(id));
        if (!menu.isConnected)
            return;
        menu.querySelector('.share-feedback').textContent = copied ? 'Link másolva.' : 'A link kijelölve, másolásra kész.';
        if (!copied) {
            const input: any = menu.querySelector('.share-url');
            input.focus(({ preventScroll: true } as any));
            input.select();
        }
        positionShareMenu();
    }
    async function copyText(text: any): Promise<any> {
        try {
            await navigator.clipboard.writeText(text);
            toast('A vágólapra másoltuk.');
            return true;
        }
        catch {
            const previous: any = root.activeElement || (document as any).activeElement, helper: any = (document as any).createElement('textarea'), holder: any = root.querySelector('dialog[open] .dialog-inner,dialog[open] .detail-shell') || root.querySelector('main') || (document as any).body;
            helper.value = text;
            helper.setAttribute('aria-label', 'Másolható szöveg');
            helper.style.cssText = 'position:fixed;top:20px;left:20px;z-index:99999;width:80%;height:80px';
            holder.append(helper);
            helper.focus(({ preventScroll: true } as any));
            helper.select();
            let copied: any = false;
            try {
                copied = (document as any).execCommand('copy');
            }
            catch { }
            helper.remove();
            previous?.focus(({ preventScroll: true } as any));
            toast(copied ? 'A vágólapra másoltuk.' : 'A böngésző nem engedélyezte a másolást.');
            return copied;
        }
    }
    for (const name of (['pointerover', 'pointermove', 'pointerout', 'focusin', 'focusout'] as any))
        root.addEventListener(name, (event: any): any => {
            if (event.pointerType === 'touch')
                return;
            const button: any = event.target.closest?.('.room-marker,.room-legend-button');
            if (!button?.closest('#detail-dialog') || button.contains(event.relatedTarget))
                return;
            if (name === 'pointermove' && button.classList.contains('is-active'))
                return;
            if (name === 'pointerover' || name === 'pointermove')
                hoverPlanRoom = button.dataset.planRoom;
            if (name === 'pointerout')
                hoverPlanRoom = null;
            if (name === 'focusin')
                focusedPlanRoom = button.dataset.planRoom;
            if (name === 'focusout')
                focusedPlanRoom = null;
            paintPlanRoom(name === 'focusin' ? focusedPlanRoom : hoverPlanRoom || focusedPlanRoom || selectedPlanRoom);
        }, events);
    root.addEventListener('click', (event: any): any => {
        if (!event.target.closest('.detail-share-wrap'))
            closeShare(false);
        const t: any = event.target.closest('button,a[data-download],[data-close]');
        if (!t)
            return;
        if (t.hasAttribute('data-share'))
            shareApartment(t.dataset.share, t);
        if (t.hasAttribute('data-share-close'))
            closeShare();
        if (t.hasAttribute('data-share-copy'))
            copyShareLink(t.dataset.shareCopy);
        if (t.hasAttribute('data-detail-tab'))
            selectDetailPanel(t.dataset.detailTab);
        if (t.hasAttribute('data-plan-step'))
            stepDetailDocument(Number(t.dataset.planStep));
        if (t.hasAttribute('data-detail-image-retry'))
            startDetailImage(t.dataset.detailImageRetry, true);
        if (t.hasAttribute('data-room-page')) {
            const panel: any = t.closest('.detail-rooms'), frame: any = panel?.querySelector('.room-page');
            if (frame) {
                frame.dataset.page = String((Number(frame.dataset.page) || 0) + Number(t.dataset.roomPage));
                fitDetailRooms();
                if (t.disabled)
                    panel.querySelector('.room-pagination button:not(:disabled)')?.focus(({ preventScroll: true } as any));
            }
        }
        if (t.hasAttribute('data-plan-room'))
            selectPlanRoom(t.dataset.planRoom, t);
        if (t.hasAttribute('data-inquiry-placeholder')) {
            const dialog: any = $('detail-dialog'), note: any = dialog.querySelector('.inquiry-pending');
            if (note) {
                note.hidden = !note.hidden;
                t.setAttribute('aria-expanded', String(!note.hidden));
                if (!note.hidden)
                    positionInquiryNotice();
            }
        }
        if (t.hasAttribute('data-media'))
            openMedia(t.dataset.media, t.dataset.mediaKind);
        if (t.hasAttribute('data-media-tab'))
            showMedia(Number(t.dataset.mediaTab));
        if (t.hasAttribute('data-media-retry') && mediaView) {
            showMedia(mediaView.index);
            $('media-dialog').querySelector('.media-stage')?.focus();
        }
        if (t.hasAttribute('data-zoom'))
            zoomMedia(t.dataset.zoom);
        if (t.hasAttribute('data-download')) {
            event.preventDefault();
            downloadDatasheet(t.dataset.download, t);
        }
        if (t.hasAttribute('data-save')) {
            const id: string = t.dataset.save;
            const result = toggleAdmiralFavorite(id, favorites, {
                storage,
                accept: (savedId) => !!byId(savedId),
            });
            favorites = result.favorites;
            storage = result.storage;
            updateFavoriteButton();
            t.focus(({ preventScroll: true } as any));
            (window as any).dispatchEvent(new CustomEvent('admiral:apartment-favorites', ({ detail: ({ ids: ([...favorites] as any) } as any) } as any)));
            toast(favorites.has(id) ? `A(z) ${id} lakást elmentettük${storage ? '' : '. A mentés csak ezen az oldalon marad meg'}.` : `A(z) ${id} lakást eltávolítottuk a kedvencekből.`);
        }
        if (t.hasAttribute('data-close'))
            closeDialog(t.closest('dialog'));
        if (t.hasAttribute('data-copy-inquiry')) {
            const a: any = byId(t.dataset.copyInquiry);
            if (a)
                copyText(`Érdeklődöm az Admiral Park ${a.id} lakása iránt.\n${a.building} épület, ${floorText(a)}\nNettó alapterület: ${area(a.areaInterior)}\nErkély: ${area(a.areaTerrace)}\nBruttó ár: ${price(a.price)}\n${apartmentLink(a.id)}`);
        }
    }, events);
    function updateFavoriteButton(): any {
        const dialog: any = $('detail-dialog'), id: any = dialog.dataset.apartment, a: any = byId(id);
        if (!a)
            return;
        const saved: any = favorites.has(id);
        for (const button of dialog.querySelectorAll('[data-save]')) {
            button.classList.toggle('is-saved', saved);
            button.setAttribute('aria-pressed', String(saved));
            button.setAttribute('aria-label', id + ' ' + (saved ? 'eltávolítása a kedvencekből' : 'mentése a kedvencekhez'));
            const label: any = button.querySelector('.detail-save-label');
            if (label)
                label.textContent = saved ? 'Kedvencekhez mentve' : 'Mentés a kedvencekhez';
        }
    }
    function syncFavorites(event: any): any {
        if (event.type === 'storage' && event.key !== 'admiral-park:favorites:v1' && event.key !== null)
            return;
        try {
            const ids: any = event.detail?.ids || JSON.parse(localStorage.getItem('admiral-park:favorites:v1') || '[]');
            if (Array.isArray(ids)) {
                favorites = normalizeAdmiralFavorites(ids);
                const canonical = JSON.stringify([...favorites]);
                if (event.type === 'storage' && canonical !== JSON.stringify(ids))
                    localStorage.setItem('admiral-park:favorites:v1', canonical);
            }
        }
        catch {
            storage = false;
        }
        updateFavoriteButton();
    }
    (window as any).addEventListener('storage', syncFavorites, events);
    (window as any).addEventListener('admiral:apartment-favorites', syncFavorites, events);
    root.addEventListener('keydown', (event: any): any => {
        if (event.key === 'Escape' && closeShare()) {
            event.preventDefault();
            event.stopPropagation();
            return;
        }
        if (event.target.closest('[data-plan-step]') && ['ArrowLeft', 'ArrowRight'].includes(event.key)) {
            event.preventDefault();
            stepDetailDocument(event.key === 'ArrowLeft' ? -1 : 1);
            return;
        }
        const tab: any = event.target.closest('[role=tab][data-detail-tab]');
        if (!tab)
            return;
        const group: any = tab.closest('[role=tablist]'), vertical: any = group.getAttribute('aria-orientation') === 'vertical';
        const previous: any = vertical ? 'ArrowUp' : 'ArrowLeft', next: any = vertical ? 'ArrowDown' : 'ArrowRight';
        if (!([previous, next, 'Home', 'End'] as any).includes(event.key))
            return;
        const tabs: any = ([...group.querySelectorAll('[role=tab]')] as any), current: any = tabs.indexOf(tab), index: any = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : (current + (event.key === next ? 1 : -1) + tabs.length) % tabs.length;
        event.preventDefault();
        tabs[index].click();
        tabs[index].focus(({ preventScroll: true } as any));
    }, events);
    root.addEventListener('error', (event: any): any => {
        const image: any = event.target;
        if (image.matches?.('img[data-detail-image]') && !swapToFloorplanFallback(image))
            detailImageState(image, 'error');
        if (image.matches?.('img[data-thumbnail]')) {
            image.hidden = true;
            const fallback: any = image.parentElement.querySelector('.preview-unavailable');
            if (fallback)
                fallback.hidden = false;
        }
    }, ({ ...events, capture: true } as any));
    root.addEventListener('load', (event: any): any => { if (event.target.matches?.('img[data-detail-image]'))
        detailImageState(event.target, 'ready'); }, ({ ...events, capture: true } as any));
    for (const dialog of dialogs) {
        dialog.addEventListener('cancel', (e: any): any => { e.preventDefault(); if (dialog.id === 'detail-dialog' && closeShare())
            return; closeDialog(dialog); }, events);
        dialog.addEventListener('click', (e: any): any => { if (e.target === dialog) {
            const r: any = dialog.getBoundingClientRect();
            if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom)
                closeDialog(dialog);
        } }, events);
        dialog.addEventListener('close', (): any => finishDialogClose(dialog), events);
    }
    const mediaDialog: any = $('media-dialog');
    mediaDialog?.addEventListener('pointerdown', (event: any): any => {
        const stage: any = event.target.closest('.media-stage');
        if (!stage || !mediaView || mediaView.scale <= 1 || event.button !== 0)
            return;
        event.preventDefault();
        stage.focus();
        stage.setPointerCapture(event.pointerId);
        mediaView.drag = ({ pointerId: event.pointerId, startX: event.clientX, startY: event.clientY, x: mediaView.x, y: mediaView.y } as any);
        stage.dataset.dragging = 'true';
    }, events);
    mediaDialog?.addEventListener('pointermove', (event: any): any => {
        if (!mediaView?.drag || mediaView.drag.pointerId !== event.pointerId)
            return;
        mediaView.x = mediaView.drag.x + event.clientX - mediaView.drag.startX;
        mediaView.y = mediaView.drag.y + event.clientY - mediaView.drag.startY;
        updateMediaTransform();
    }, events);
    function stopMediaDrag(event: any): any {
        if (!mediaView?.drag || mediaView.drag.pointerId !== event.pointerId)
            return;
        const stage: any = mediaDialog.querySelector('.media-stage');
        mediaView.drag = null;
        if (stage) {
            stage.dataset.dragging = 'false';
            if (stage.hasPointerCapture(event.pointerId))
                stage.releasePointerCapture(event.pointerId);
        }
    }
    mediaDialog?.addEventListener('pointerup', stopMediaDrag, events);
    mediaDialog?.addEventListener('pointercancel', stopMediaDrag, events);
    mediaDialog?.addEventListener('keydown', (event: any): any => {
        if (!mediaView)
            return;
        if (event.target.matches('[role="tab"]') && (['ArrowLeft', 'ArrowRight', 'Home', 'End'] as any).includes(event.key)) {
            event.preventDefault();
            const index: any = event.key === 'Home' ? 0 : event.key === 'End' ? mediaView.entries.length - 1 : mediaView.index + (event.key === 'ArrowRight' ? 1 : -1);
            showMedia(index);
            mediaDialog.querySelector('[role="tab"][aria-selected="true"]')?.focus();
            return;
        }
        if ((['+', '=', '-', '0'] as any).includes(event.key)) {
            event.preventDefault();
            zoomMedia(event.key === '0' ? 'reset' : event.key === '-' ? 'out' : 'in');
            return;
        }
        if (!event.target.closest('.media-stage') || !event.key.startsWith('Arrow'))
            return;
        event.preventDefault();
        if (mediaView.scale <= 1) {
            if ((['ArrowLeft', 'ArrowRight'] as any).includes(event.key))
                showMedia(mediaView.index + (event.key === 'ArrowRight' ? 1 : -1));
            return;
        }
        const step: any = event.shiftKey ? 120 : 45;
        if (event.key === 'ArrowLeft')
            mediaView.x += step;
        if (event.key === 'ArrowRight')
            mediaView.x -= step;
        if (event.key === 'ArrowUp')
            mediaView.y += step;
        if (event.key === 'ArrowDown')
            mediaView.y -= step;
        updateMediaTransform();
    }, events);
    (window as any).addEventListener('resize', (): any => { updateMediaTransform(); requestAnimationFrame(fitDetailRooms); requestAnimationFrame((): any => { positionInquiryNotice(); positionShareMenu(); }); }, events);
    let pdfExportJob: any = null;
    const pdfDownloadTimers: any = new Set(), pdfTriggerOwners: any = new WeakMap();
    $('detail-dialog').addEventListener('close', (): any => { pdfExportJob?.controller.abort(); pdfExportJob = null; }, events);
    signal.addEventListener('abort', (): any => { pdfExportJob?.controller.abort(); for (const timer of pdfDownloadTimers)
        clearTimeout(timer); pdfDownloadTimers.clear(); }, ({ once: true } as any));
    let loadPromise: any = null;
    async function load(): Promise<any> {
        if (loadPromise)
            return loadPromise;
        config.onState?.('loading', '');
        loadPromise = (async (): Promise<any> => {
            try {
                // Keep provided-data initialization asynchronous too, so concurrent opens
                // and retries share the same in-flight initialization promise.
                await Promise.resolve();
                if (config.dataset !== undefined)
                    data = config.dataset;
                else {
                    const response: any = await fetch(config.dataUrl || './apartments.json', ({ cache: 'no-cache', signal } as any));
                    if (!response.ok)
                        throw new Error('HTTP ' + response.status);
                    data = await response.json();
                }
                if (signal.aborted)
                    return;
                if (!data || data.schemaVersion !== '1.0' || !Array.isArray(data.apartments))
                    throw new Error('Nem támogatott adatformátum');
                const ids: any = new Set();
                for (const a of data.apartments) {
                    if (!a || typeof a.id !== 'string' || !a.id || ids.has(a.id) || !(Object as any).hasOwn(labels, a.status) || typeof a.building !== 'string')
                        throw new Error('Hibás vagy ismétlődő lakásadat');
                    ids.add(a.id);
                    for (const field of (['floor', 'rooms', 'areaInterior', 'areaTerrace', 'areaGarden', 'price'] as any))
                        if (a[field] != null && (!hasNumber(a[field]) || a[field] < 0))
                            throw new Error('Hibás számadat');
                }
                apartments = data.apartments;
                favorites = normalizeAdmiralFavorites(favorites, id => ids.has(id));
                config.onState?.('ready', '');
                config.onReady?.(controller);
                if (requestedApartmentId) {
                    if (byId(requestedApartmentId))
                        detail(requestedApartmentId);
                    else
                        config.onState?.('error', 'A kiválasztott lakás nem található.');
                }
            }
            catch (error: any) {
                if (signal.aborted)
                    return;
                data = undefined;
                apartments = ([] as any);
                config.onState?.('error', 'Nem sikerült betölteni a lakás adatait. Próbálja újra.');
            }
            finally {
                loadPromise = null;
            }
        })();
        return loadPromise;
    }
    const controller: any = ({
        open(id: any, initialDocument: ApartmentInitialDocument = 'plan') {
            requestedApartmentId = typeof id === 'string' ? id : null;
            requestedDocument = initialDocument;
            if (!requestedApartmentId)
                return;
            if (pdfExportJob && pdfExportJob.id !== requestedApartmentId) {
                pdfExportJob.controller.abort();
                pdfExportJob = null;
            }
            if (data) {
                if (byId(requestedApartmentId)) {
                    config.onState?.('ready', '');
                    detail(requestedApartmentId);
                }
                else
                    config.onState?.('error', 'A kiválasztott lakás nem található.');
            }
        },
        close() { requestedApartmentId = null; pdfExportJob?.controller.abort(); pdfExportJob = null; for (const dialog of ([...dialogs] as any).reverse())
            closeDialog(dialog); },
        download(id: any, trigger: any) { return downloadDatasheet(id, trigger); },
        retry() { return load(); },
        refreshFacts,
        dispose() { lifecycle.abort(); detailResize?.disconnect(); clearTimeout(toastTimer); for (const d of ([...dialogs] as any).reverse()) {
            if (d.open)
                d.close();
            modalRegistry.delete(d);
        } for (const url of downloadUrls)
            URL.revokeObjectURL(url); downloadUrls.clear(); mediaView = null; syncModalState(); }
    } as any);
    load();
    return controller;
}


type ApartmentInitialDocument = 'plan' | 'floor'

interface OrbitApartmentCardController {
    open: (id: string, initialDocument?: ApartmentInitialDocument) => void
    close: () => void
    retry: () => unknown
    refreshFacts?: () => void
    download: (id: string, trigger?: HTMLElement) => Promise<AdmiralApartmentDownloadResult>
    dispose: () => void
}
export interface AdmiralApartmentDownloadResult {
    id: string
    status: "downloaded" | "cancelled" | "error"
}
export interface AdmiralApartmentDetailCardProps {
    openId: string | null
    /** The drawing to show when opening the card. */
    initialDocument?: ApartmentInitialDocument
    dataUrl: string
    assetBase: string
    inquiryUrl: string
    pageUrl: string
    onOpenChange: (open: boolean) => void
    onClosed: () => void
    onReady?: () => void
    /** Reuse the list's loaded JSON instead of issuing another request. */
    dataset?: unknown
    /** Current orbit facts; drawing/room metadata remains owned by detail JSON. */
    liveDataset?: unknown
    /** Shared card colour variables; updates without rebuilding the runtime. */
    theme?: React.CSSProperties
    /** Export the selected apartment through the same PDF path, without opening it. */
    downloadRequest?: { id: string; token: number; trigger?: HTMLElement } | null
    onDownloadComplete?: (token: number, result: AdmiralApartmentDownloadResult) => void
}

export default function AdmiralApartmentDetailCard(
    props: AdmiralApartmentDetailCardProps
) {
    const {
        openId,
        initialDocument,
        dataUrl,
        assetBase,
        inquiryUrl,
        pageUrl,
        dataset,
        theme,
        downloadRequest,
    } = props
    const host = React.useRef<HTMLDivElement | null>(null)
    const controller = React.useRef<OrbitApartmentCardController | null>(null)
    const noticeHost = React.useRef<HTMLDivElement | null>(null)
    const opener = React.useRef<HTMLElement | null>(null)
    const lastRequestedId = React.useRef<string | null>(null)
    const retryFrame = React.useRef<number | null>(null)
    const restoreFrame = React.useRef<number | null>(null)
    const current = React.useRef(props)
    const closing = React.useRef(false)
    current.current = props
    const [started, setStarted] = React.useState(false)
    const [state, setState] = React.useState<
        "idle" | "loading" | "ready" | "error"
    >("idle")
    const [error, setError] = React.useState("")
    const [nativeOpen, setNativeOpen] = React.useState(false)

    const restoreFocus = React.useCallback(() => {
        if (restoreFrame.current !== null)
            cancelAnimationFrame(restoreFrame.current)
        restoreFrame.current = requestAnimationFrame(() => {
            restoreFrame.current = null
            const target = opener.current
            if (
                target?.isConnected &&
                target.getClientRects().length &&
                !target.closest("[inert]")
            )
                target.focus({ preventScroll: true })
        })
    }, [])

    React.useEffect(
        () => () => {
            if (retryFrame.current !== null)
                cancelAnimationFrame(retryFrame.current)
            if (restoreFrame.current !== null)
                cancelAnimationFrame(restoreFrame.current)
        },
        []
    )

    React.useEffect(() => {
        if (openId) {
            if (restoreFrame.current !== null) {
                cancelAnimationFrame(restoreFrame.current)
                restoreFrame.current = null
            }
            if (!lastRequestedId.current)
                opener.current =
                    document.activeElement instanceof HTMLElement
                        ? document.activeElement
                        : null
            closing.current = false
            setStarted(true)
        } else if (lastRequestedId.current && !closing.current) {
            closing.current = true
            restoreFocus()
        }
        lastRequestedId.current = openId
    }, [openId, restoreFocus])

    React.useEffect(() => {
        if (downloadRequest) setStarted(true)
    }, [downloadRequest])

    React.useEffect(() => {
        if (!started || !host.current) return
        const shadow =
            host.current.shadowRoot ||
            host.current.attachShadow({ mode: "open" })
        let alive = true
        let lastOpen = false
        shadow.innerHTML =
            "<style>" +
            ORBIT_APARTMENT_CARD_STYLES +
            FLOOR_LAKE_STYLES +
            DETAIL_ACTION_STYLES +
            "\n:host{position:fixed!important;inset:0 auto auto 0!important;width:0!important;height:0!important;min-height:0!important;background:transparent!important;pointer-events:none!important;overflow:visible!important}dialog,.toast.visible{pointer-events:auto}dialog{font-size:14px}</style>" +
            ORBIT_APARTMENT_CARD_SHELL
        setState("loading")
        setError("")
        setNativeOpen(false)
        try {
            const runtime = mountOrbitApartmentCardRuntime(shadow, {
                dataUrl,
                dataset,
                getLiveDataset: () => current.current.liveDataset,
                assetBaseUrl: assetBase,
                inquiryUrl,
                pageUrl: pageUrl || window.location.href,
                apartment: current.current.openId,
                initialDocument: current.current.initialDocument,
                onState: (
                    next: "loading" | "ready" | "error",
                    message: string
                ) => {
                    if (!alive) return
                    setState(next)
                    setError(message || "")
                },
                onReady: () => {
                    if (alive) current.current.onReady?.()
                },
                onOpenChange: (next: boolean) => {
                    if (!alive || next === lastOpen) return
                    lastOpen = next
                    setNativeOpen(next)
                    current.current.onOpenChange(next)
                    if (!next && !closing.current) {
                        closing.current = true
                        current.current.onClosed()
                        restoreFocus()
                    }
                },
            }) as OrbitApartmentCardController
            controller.current = runtime
            return () => {
                // StrictMode disposal must not clear the current apartment selection.
                alive = false
                if (controller.current === runtime) controller.current = null
                runtime.dispose()
                shadow.replaceChildren()
            }
        } catch {
            setState("error")
            setError("Nem sikerült megnyitni a lakás adatait. Próbálja újra.")
            const request = current.current.downloadRequest
            if (request)
                current.current.onDownloadComplete?.(request.token, {
                    id: request.id,
                    status: "error",
                })
            return () => {
                alive = false
                controller.current = null
                shadow.replaceChildren()
            }
        }
    }, [
        started,
        dataUrl,
        assetBase,
        inquiryUrl,
        pageUrl,
        dataset,
        restoreFocus,
    ])

    React.useEffect(() => {
        if (openId) controller.current?.open(openId, initialDocument)
        else controller.current?.close()
    }, [openId, initialDocument, started, dataUrl, assetBase, inquiryUrl, pageUrl, dataset])

    React.useEffect(() => {
        controller.current?.refreshFacts?.()
    }, [props.liveDataset, started])

    React.useEffect(() => {
        if (!started || !downloadRequest || !controller.current) return
        let alive = true
        const request = downloadRequest
        controller.current
            .download(request.id, request.trigger)
            .then((result) => {
                if (alive)
                    current.current.onDownloadComplete?.(request.token, result)
            })
            .catch(() => {
                if (alive)
                    current.current.onDownloadComplete?.(request.token, {
                        id: request.id,
                        status: "error",
                    })
            })
        return () => {
            alive = false
        }
    }, [
        downloadRequest,
        started,
        dataUrl,
        assetBase,
        inquiryUrl,
        pageUrl,
        dataset,
    ])

    const close = React.useCallback(() => {
        if (closing.current) return
        closing.current = true
        if (retryFrame.current !== null) {
            cancelAnimationFrame(retryFrame.current)
            retryFrame.current = null
        }
        controller.current?.close()
        current.current.onOpenChange(false)
        current.current.onClosed()
        restoreFocus()
    }, [restoreFocus])
    const retry = React.useCallback(() => {
        if (controller.current) {
            controller.current.open(current.current.openId || "", current.current.initialDocument)
            controller.current.retry()
        } else {
            setStarted(false)
            if (retryFrame.current !== null)
                cancelAnimationFrame(retryFrame.current)
            retryFrame.current = requestAnimationFrame(() => {
                retryFrame.current = null
                if (current.current.openId) setStarted(true)
            })
        }
    }, [])
    const notice =
        !!openId &&
        !nativeOpen &&
        (state === "loading" || state === "error" || !started)

    React.useEffect(() => {
        if (notice)
            noticeHost.current
                ?.querySelector<HTMLButtonElement>(
                    'button[aria-label="Close apartment details"]'
                )
                ?.focus({ preventScroll: true })
    }, [notice, state])

    return (
        <div
            data-orbit-detail-card=""
            data-orbit-ignore=""
            data-state={state === "idle" && openId ? "loading" : state}
            data-apartment-id={openId || ""}
            style={{
                position: "absolute",
                inset: 0,
                pointerEvents: "none",
                zIndex: 30,
            }}
        >
            <div
                ref={host}
                data-orbit-ignore=""
                style={{
                    ...theme,
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: 0,
                    height: 0,
                    pointerEvents: "none",
                }}
            />
            {notice && (
                <div
                    ref={noticeHost}
                    data-orbit-ignore=""
                    role="dialog"
                    aria-modal="true"
                    aria-label="Apartment details"
                    onKeyDown={(event) => {
                        if (event.key === "Escape") {
                            event.preventDefault()
                            event.stopPropagation()
                            close()
                            return
                        }
                        if (event.key === "Tab") {
                            const buttons = Array.from(
                                event.currentTarget.querySelectorAll<HTMLButtonElement>(
                                    "button:not(:disabled)"
                                )
                            )
                            const first = buttons[0],
                                last = buttons[buttons.length - 1]
                            if (
                                first &&
                                ((!event.shiftKey &&
                                    document.activeElement === last) ||
                                    (event.shiftKey &&
                                        document.activeElement === first) ||
                                    !event.currentTarget.contains(
                                        document.activeElement
                                    ))
                            ) {
                                event.preventDefault()
                                const target = event.shiftKey ? last : first
                                target?.focus()
                            }
                            event.stopPropagation()
                        }
                    }}
                    style={{
                        position: "fixed",
                        inset: 0,
                        display: "grid",
                        placeItems: "center",
                        background: "rgba(36,40,36,.42)",
                        backdropFilter: "blur(5px)",
                        pointerEvents: "auto",
                        padding: 20,
                    }}
                >
                    <div
                        style={{
                            position: "relative",
                            width: "min(460px,100%)",
                            padding: "42px 30px 30px",
                            color: "#242824",
                            background:
                                "linear-gradient(180deg,#fdfbfb,#e4e9ec)",
                            font: "14px/1.7 Montserrat,Arial,sans-serif",
                            boxShadow: "0 24px 100px rgba(36,40,36,.22)",
                        }}
                    >
                        <button
                            type="button"
                            aria-label="Close apartment details"
                            onClick={close}
                            style={{
                                position: "absolute",
                                top: 8,
                                right: 12,
                                border: 0,
                                background: "none",
                                color: "inherit",
                                fontSize: 28,
                                cursor: "pointer",
                            }}
                        >
                            ×
                        </button>
                        <p
                            style={{
                                margin: "0 0 12px",
                                fontSize: 24,
                                fontWeight: 500,
                            }}
                        >
                            {openId}
                        </p>
                        {state === "error" ? (
                            <>
                                <p role="alert" style={{ margin: "0 0 20px" }}>
                                    {error ||
                                        "Nem sikerült betölteni a lakás adatait."}
                                </p>
                                <button
                                    type="button"
                                    aria-label="Retry apartment details"
                                    onClick={retry}
                                    style={{
                                        minHeight: 42,
                                        padding: "9px 20px",
                                        border: "1px solid #a38c69",
                                        borderRadius: 999,
                                        background: "none",
                                        color: "inherit",
                                        font: "inherit",
                                        cursor: "pointer",
                                    }}
                                >
                                    Újrapróbálom
                                </button>
                            </>
                        ) : (
                            <p
                                role="status"
                                aria-live="polite"
                                style={{ margin: 0 }}
                            >
                                Lakásadatok betöltése…
                            </p>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
