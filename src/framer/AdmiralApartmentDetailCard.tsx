// Shared apartment detail card. Create this Framer code file once.
import * as React from "react"

// Shared native apartment dialog used by both homepage and apartment list.
const ORBIT_APARTMENT_CARD_STYLES = "/* Shared detail and media card styles; list-only selectors removed. */\n:root, :host {\n  --paper: #fbfaf8;\n  --surface: #f1f0eb;\n  --filter-background: #f1f0eb;\n  --ink: #242824;\n  --muted: #70736d;\n  --accent: #a38c69;\n  --line: #deded6;\n  --button: #242824;\n  --button-text: #ffffff;\n  --available: #4f7959;\n  --negotiating: #b28a2f;\n  --sold: #b4564f;\n  --hover: color-mix(in srgb, var(--ink) 3%, var(--paper));\n  --detail-top: #fdfbfb;\n  --detail-bottom: #e4e9ec;\n  --detail-ink: #242824;\n  --detail-muted: #687074;\n  --detail-watermark-top: #f2f0f1;\n  --detail-watermark-bottom: #d9dfe2;\n  font-family: 'Montserrat', Arial, sans-serif;\n  font-size: 14px;\n  font-synthesis: none;\n  color: var(--ink);\n  background: var(--paper);\n  color-scheme: light;\n  -webkit-font-smoothing: antialiased;\n}\n:host { display: block; width: 100%; }\n* { box-sizing: border-box; }\nbody { margin: 0; background: var(--paper); }\nbody.dialog-open { overflow: hidden; }\nbutton, input, select { font: inherit; color: inherit; }\nbutton, select, input[type=\"checkbox\"], summary { cursor: pointer; }\nbutton, a, input, select, summary { -webkit-tap-highlight-color: color-mix(in srgb, var(--ink) 0%, transparent); }\nbutton, a { touch-action: manipulation; }\nbutton { border: 0; background: none; }\nbutton:disabled { cursor: default; opacity: .4; }\na { color: inherit; text-decoration: none; }\ninput, select { min-width: 0; border-radius: 0; }\ninput[type=\"number\"] { appearance: textfield; -moz-appearance: textfield; }\ninput::-webkit-inner-spin-button, input::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }\nbutton:focus-visible, a:focus-visible, input:focus-visible, select:focus-visible, summary:focus-visible { outline: 1px solid var(--accent); outline-offset: 5px; }\ninput:focus-visible, select:focus-visible { outline-offset: 2px; }\n[hidden] { display: none !important; }\n.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0; }\nselect option { background: var(--surface); color: var(--ink); }\ninput[aria-invalid=\"true\"] { border-color: var(--negotiating); }\n.media-preview { display: flex; flex-direction: column; align-items: stretch; width: 100px; min-width: 0; padding: 0; border: 0; background: none; text-align: left; }\n.preview-visual { display: flex; align-items: center; justify-content: center; width: 100%; height: 90px; overflow: hidden; border: 0; background: none; transition: opacity .15s; }\n.preview-visual img { display: block; min-width: 0; min-height: 0; width: 100%; height: 100%; border: 0; object-fit: contain; background: none; }\n.media-preview:hover .preview-visual { opacity: .8; }\n.preview-unavailable { color: var(--muted); font-size: 8px; text-align: center; }\n.datasheet-link { display: inline-flex; align-items: center; justify-content: center; gap: 6px; min-height: 34px; padding: 8px 13px; border: 1px solid var(--line); border-radius: 999px; background: none; color: var(--ink); font-size: 10px; line-height: 1.5; white-space: nowrap; transition: border-color .15s, background .15s; }\n.datasheet-large { min-height: 40px; padding: 10px 17px; font-size: 11px; }\n.datasheet-link > svg { color: var(--accent); flex-shrink: 0; }\n.datasheet-link:hover { border-color: var(--accent); background: var(--hover); }\n.datasheet-link[aria-busy=\"true\"] { opacity: .45; pointer-events: none; }\n.action-pill { display: inline-flex; align-items: center; justify-content: center; gap: 6px; width: 102px; min-width: 102px; max-width: 102px; height: 34px; min-height: 34px; max-height: 34px; margin: 0; padding: 0 9px; border: 1px solid var(--line); border-radius: 999px; background: none; color: var(--ink); font-size: 10px; font-weight: 400; line-height: 1.4; text-align: center; white-space: nowrap; cursor: pointer; transition: border-color .15s, background .15s, color .15s; }\n.action-pill:hover { border-color: var(--accent); background: var(--hover); }\n.action-pill > svg { width: 14px; height: 14px; flex-shrink: 0; }\n.download-wrap { display: inline-flex; flex-direction: column; align-items: flex-start; min-width: 0; }\n.download-fallback { display: inline-flex; gap: 5px; margin-top: 6px; color: var(--muted); font-size: 9px; text-decoration: underline; text-underline-offset: 3px; }\n.heading-rooms { text-align: center; }\n.status-pill { display: inline-flex; align-items: center; gap: 7px; color: var(--muted); font-size: 10px; line-height: 1.5; white-space: nowrap; }\n.status-pill::before { content: ''; width: 4px; height: 4px; flex-shrink: 0; border-radius: 50%; background: currentColor; }\n.status-available { color: var(--available); }\n.status-under_negotiation { color: var(--negotiating); }\n.status-sold { color: var(--sold); }\n.status-unknown { color: var(--muted); }\n.save-button { display: inline-grid; place-items: center; width: 31px; height: 34px; vertical-align: middle; padding: 6px; color: color-mix(in srgb, var(--muted) 65%, var(--paper)); }\n.save-button svg { display: block; width: 18px; height: 18px; }\n.save-button:hover, .save-button.is-saved { color: var(--accent); }\n.save-button.is-saved svg path { fill: currentColor; }\n.button-primary, .button-secondary { display: inline-flex; align-items: center; justify-content: center; gap: 20px; min-height: 43px; padding: 12px 19px; border: 1px solid var(--button); font-size: 11px; line-height: 1.5; text-align: center; }\n.button-primary { background: var(--button); color: var(--button-text); }\n.button-primary:hover { background: color-mix(in srgb, var(--button) 88%, var(--paper)); }\n.button-secondary { border-color: var(--line); background: none; color: var(--ink); }\n.button-secondary:hover { border-color: var(--accent); }\n.toast { position: fixed; bottom: 26px; left: 50%; z-index: 80; transform: translate(-50%, 12px); max-width: calc(100% - 32px); padding: 13px 21px; background: var(--button); color: var(--button-text); font-size: 11px; line-height: 1.7; text-align: center; opacity: 0; pointer-events: none; transition: opacity .2s, transform .2s; }\n.toast.visible { opacity: 1; transform: translate(-50%, 0); }\n.apartment-dialog { width: min(930px, calc(100% - 40px)); max-height: calc(100% - 40px); margin: auto; padding: 0; overflow: auto; border: 1px solid var(--line); color: var(--ink); background: var(--paper); box-shadow: 0 20px 90px color-mix(in srgb, var(--ink) 15%, transparent); }\n.apartment-dialog::backdrop { background: color-mix(in srgb, var(--ink) 42%, transparent); backdrop-filter: blur(3px); }\n.dialog-inner { padding: 34px 38px; }\n.dialog-head { display: flex; align-items: flex-start; justify-content: space-between; gap: 22px; padding-bottom: 25px; margin-bottom: 28px; border-bottom: 1px solid var(--line); }\n.eyebrow { color: var(--muted); font-size: 9px; letter-spacing: 1.3px; line-height: 1.6; margin-bottom: 13px; }\n.dialog-head h2 { margin: 0; font-family: 'Montserrat', Arial, sans-serif; font-size: 39px; font-weight: 400; letter-spacing: -.8px; line-height: 1.1; }\n.dialog-head h2 > span { color: var(--muted); }\n.dialog-close { display: grid; place-items: center; width: 33px; height: 33px; flex-shrink: 0; padding: 0; color: var(--muted); font-size: 25px; font-weight: 300; line-height: 1; }\n.dialog-close:hover { color: var(--accent); }\n.empty-plan { padding: 0 0 23px; border-bottom: 1px solid var(--line); color: var(--muted); }\n.empty-plan h3 { margin: 0 0 11px; font-family: 'Montserrat', Arial, sans-serif; font-size: 24px; font-weight: 400; line-height: 1.4; color: var(--ink); }\n.empty-plan p { margin: 0; font-size: 11px; line-height: 1.8; }\n#detail-dialog { width: 90vw; max-width: none; height: 90dvh; max-height: 90dvh; padding: 0; overflow: hidden; overscroll-behavior: contain; border: 1px solid color-mix(in srgb, var(--detail-muted) 20%, var(--detail-top)); color: var(--detail-ink); background: linear-gradient(180deg, var(--detail-top), var(--detail-bottom)); box-shadow: 0 24px 100px color-mix(in srgb, var(--detail-ink) 22%, transparent); font-family: 'Montserrat', Arial, Helvetica, sans-serif; }\n#detail-dialog::backdrop { background: color-mix(in srgb, var(--detail-ink) 47%, transparent); backdrop-filter: blur(5px); }\n#detail-dialog .detail-shell { position: relative; width: 100%; height: 100%; min-height: 0; isolation: isolate; }\n#detail-dialog .detail-brand-motif { position: absolute; z-index: -1; inset: 0 0 0 auto; width: 67%; pointer-events: none; background: linear-gradient(180deg, var(--detail-watermark-top), var(--detail-watermark-bottom)); -webkit-mask-image: var(--detail-monogram-image, none); mask-image: var(--detail-monogram-image, none); -webkit-mask-position: center; mask-position: center; -webkit-mask-repeat: no-repeat; mask-repeat: no-repeat; -webkit-mask-size: contain; mask-size: contain; opacity: .6; }\n#detail-dialog .detail-topbar { position: absolute; z-index: 50; top: 9px; right: 11px; height: 42px; pointer-events: none; }\n#detail-dialog .detail-top-actions { display: flex; align-items: center; justify-content: flex-end; gap: 7px; pointer-events: auto; }\n#detail-dialog .detail-drawing-save { display: flex; align-items: center; flex-shrink: 0; }\n#detail-dialog .detail-drawing-save .save-button.save-with-label { display: inline-flex; align-items: center; justify-content: center; gap: 5px; width: auto; height: 34px; min-height: 34px; padding: 2px 0; color: var(--detail-muted); }\n#detail-dialog .detail-drawing-save .save-button:hover, #detail-dialog .detail-drawing-save .save-button.is-saved { color: var(--detail-ink); }\n#detail-dialog .detail-drawing-save svg { width: 18px; height: 18px; }\n#detail-dialog .detail-save-label { display: block; max-width: 100px; font-size: 10px; font-weight: 400; line-height: 1.25; text-align: left; }\n#detail-dialog .dialog-close { width: 38px; height: 40px; color: var(--detail-ink); font-size: 29px; font-weight: 300; }\n#detail-dialog .dialog-close:hover { color: var(--detail-muted); }\n#detail-dialog :is(button, a, summary, input):focus-visible { outline: 2px solid var(--detail-ink); outline-offset: 4px; }\n#detail-dialog .detail-layout { position: relative; display: grid; grid-template-columns: minmax(0, 1.3fr) minmax(0, 1fr); grid-template-rows: minmax(0, 1fr); column-gap: clamp(20px, 2vw, 42px); width: 100%; height: 100%; min-width: 0; min-height: 0; padding: 22px clamp(18px, 2vw, 42px) 34px; }\n#detail-dialog .detail-sidebar { grid-column: 2; grid-row: 1; display: grid; grid-template-rows: auto 1px minmax(0, 1fr) auto; row-gap: 16px; min-width: 0; min-height: 0; }\n#detail-dialog .detail-core { display: flex; flex-direction: column; align-items: center; gap: 14px; width: 100%; min-width: 0; padding-block: 16px; }\n#detail-dialog .detail-identity { width: 100%; min-width: 0; text-align: center; }\n#detail-dialog .detail-brand-group { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0; min-width: 0; }\n#detail-dialog .detail-logo { display: block; width: 200px; max-width: 100%; aspect-ratio: 1232.62 / 523.833007; margin-inline: auto; background: var(--detail-ink); -webkit-mask-image: var(--detail-logo-image, none); mask-image: var(--detail-logo-image, none); -webkit-mask-position: center; mask-position: center; -webkit-mask-repeat: no-repeat; mask-repeat: no-repeat; -webkit-mask-size: contain; mask-size: contain; }\n#detail-dialog .detail-area-row { width: 100%; min-width: 0; }\n#detail-dialog .detail-id-metric .detail-apartment-number { margin: 0; color: inherit; font: inherit; letter-spacing: inherit; line-height: inherit; white-space: nowrap; }\n#detail-dialog .detail-id-metric dt { white-space: nowrap; }\n#detail-dialog .detail-metrics { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; margin: 0; }\n#detail-dialog .detail-metrics.has-garden { grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 6px; }\n#detail-dialog .detail-metrics > div { display: block; min-width: 0; text-align: center; }\n#detail-dialog .detail-metrics dt { margin: 0 0 4px; color: var(--detail-muted); font-size: 15px; font-weight: 400; line-height: 1.4; }\n#detail-dialog .detail-metrics dd { margin: 0; font-size: 30px; font-weight: 600; letter-spacing: -.8px; line-height: 1.05; white-space: nowrap; }\n#detail-dialog .detail-metrics.has-garden dd { white-space: normal; }\n#detail-dialog .detail-metrics dd small { display: inline-block; margin-left: 3px; color: var(--detail-muted); font-size: 14px; font-weight: 400; letter-spacing: 0; line-height: 1.3; vertical-align: baseline; }\n#detail-dialog .detail-drawing-toolbar { display: flex; align-items: center; justify-content: flex-start; flex-shrink: 0; gap: 10px; min-width: 0; min-height: 27px; margin-bottom: 10px; }\n#detail-dialog .detail-drawing-toolbar .detail-document-tabs { flex-shrink: 0; margin: 0; }\n#detail-dialog .detail-unit-meta { flex: 1; min-width: 0; margin: 0; padding: 0; color: var(--detail-muted); font-size: 10px; font-weight: 400; line-height: 1.4; text-align: right; }\n#detail-dialog .detail-unit-meta strong { font-weight: 600; }\n#detail-dialog .detail-unit-meta span { display: inline-block; margin-inline: 3px; }\n#detail-dialog .detail-layout-label { margin-left: 7px; color: var(--detail-muted); font-size: 10px; font-weight: 300; letter-spacing: 0; line-height: 1.3; }\n#detail-dialog .detail-illustration-note { position: absolute; z-index: 10; left: 10px; bottom: 6px; max-width: calc(100% - 20px); margin: 0; padding: 0; color: var(--detail-muted); font-size: 9px; font-weight: 300; line-height: 1.3; text-align: left; pointer-events: none; }\n#detail-dialog .detail-divider { display: block; width: 100%; height: 1px; margin: 0; border: 0; background: color-mix(in srgb, var(--detail-muted) 25%, transparent); }\n#detail-dialog .detail-room-panel { position: relative; }\n#detail-dialog .detail-room-tabs { position: absolute; top: 0; right: 0; gap: 12px; margin: 0; padding: 0; }\n#detail-dialog .detail-panel-nav { display: none; }\n#detail-dialog .detail-drawing { grid-column: 1; grid-row: 1; }\n#detail-dialog .detail-drawing, #detail-dialog .detail-room-panel { display: flex; flex-direction: column; min-width: 0; min-height: 0; }\n#detail-dialog .detail-document-tabs, #detail-dialog .detail-room-tabs { display: flex; align-items: center; gap: 16px; flex-shrink: 0; min-width: 0; min-height: 27px; margin-bottom: 10px; }\n#detail-dialog :is(.detail-document-tabs, .detail-room-tabs, .detail-summary-tabs) button { min-height: 27px; margin: 0; padding: 3px 0 6px; border: 0; border-bottom: 1px solid transparent; color: var(--detail-muted); background: none; font-size: 11px; line-height: 1.4; text-align: left; }\n#detail-dialog :is(.detail-document-tabs, .detail-room-tabs, .detail-summary-tabs) button[aria-selected=\"true\"], #detail-dialog :is(.detail-document-tabs, .detail-room-tabs) button.is-active { border-bottom-color: var(--detail-ink); color: var(--detail-ink); }\n#detail-dialog .detail-plan, #detail-dialog .detail-floor-plan { display: flex; flex: 1; flex-direction: column; min-width: 0; min-height: 0; margin: 0; }\n#detail-dialog .detail-section-label { flex-shrink: 0; margin: 0 0 9px; color: var(--detail-muted); font-size: 10px; font-weight: 400; letter-spacing: 1.1px; line-height: 1.4; text-transform: uppercase; }\n#detail-dialog .detail-plan-stage { position: relative; container-type: size; display: grid; flex: 1; place-items: center; min-width: 0; min-height: 0; margin: 0; padding: 0; border: 0; background: none; }\n#detail-dialog .detail-plan-canvas { position: relative; width: min(100cqw, calc(100cqh * var(--plan-aspect, 1))); max-width: 100%; max-height: 100%; aspect-ratio: var(--plan-aspect, 1); overflow: hidden; border: 0; background: none; }\n#detail-dialog .detail-plan-surface { position: absolute; }\n#detail-dialog .detail-plan-image { display: block; width: 100%; height: 100%; max-width: none; margin: 0; border: 0; object-fit: contain; background: none; }\n#detail-dialog .detail-plan-markers { position: absolute; inset: 0; }\n#detail-dialog .room-marker { position: absolute; z-index: 2; display: grid; place-items: center; width: 28px; height: 28px; margin: 0; padding: 0; border: 0; border-radius: 50%; color: var(--detail-ink); background: none; font-family: inherit; font-size: 11px; font-weight: 400; line-height: 1; transform: translate(-50%, -50%); isolation: isolate; cursor: pointer; }\n#detail-dialog .room-marker::before { content: ''; position: absolute; z-index: -1; inset: 4px; border: 1px solid color-mix(in srgb, var(--detail-ink) 48%, var(--detail-top)); border-radius: 50%; background: color-mix(in srgb, var(--detail-top) 96%, transparent); box-shadow: 0 1px 5px color-mix(in srgb, var(--detail-ink) 9%, transparent); transition: background .15s, border-color .15s; }\n#detail-dialog .room-marker.is-active { z-index: 5; color: var(--detail-top); }\n#detail-dialog .room-marker.is-active::before { border-color: var(--detail-ink); background: var(--detail-ink); }\n#detail-dialog .room-marker:focus-visible { outline-offset: 0; }\n#detail-dialog .detail-plan-note { flex-shrink: 0; margin: 9px 0 0; color: var(--detail-muted); font-size: 10px; line-height: 1.5; }\n#detail-dialog .detail-floor-plan > .detail-floor-image { display: block; flex: 1; min-width: 0; min-height: 0; width: 100%; height: 100%; margin: 0; border: 0; object-fit: contain; background: none; }\n#detail-dialog .empty-plan { display: flex; flex: 1; flex-direction: column; justify-content: center; min-height: 0; padding: 0; border: 0; color: var(--detail-muted); }\n#detail-dialog .empty-plan h3 { color: var(--detail-ink); }\n#detail-dialog .detail-rooms, #detail-dialog .unit-room-section { display: flex; flex: 1; flex-direction: column; min-width: 0; min-height: 0; margin: 0; }\n#detail-dialog :is(.detail-rooms, .unit-room-section) > h3 { flex-shrink: 0; min-height: 28px; margin: 0 0 6px; padding-right: 190px; color: var(--detail-ink); font-family: inherit; font-size: 20px; font-weight: 400; letter-spacing: -.4px; line-height: 1.3; }\n#detail-dialog .room-page { flex: 1; min-width: 0; min-height: 0; }\n#detail-dialog .type-room-list, #detail-dialog .unit-room-list { display: grid; grid-template-columns: repeat(var(--room-columns, 1), minmax(0, 1fr)); gap: 0 10px; margin: 0; padding: 0; list-style: none; }\n#detail-dialog .type-room-list > li { min-width: 0; }\n#detail-dialog .room-legend-button { display: grid; grid-template-columns: var(--room-circle, 18px) minmax(0, 1fr) auto; align-items: center; gap: 6px; width: 100%; min-height: 0; margin: 0; padding: var(--room-padding, 4px) 0; border: 0; border-bottom: 1px solid color-mix(in srgb, var(--detail-muted) 20%, transparent); background: none; color: var(--detail-ink); text-align: left; }\n#detail-dialog .room-number { display: grid; place-items: center; width: var(--room-circle, 18px); height: var(--room-circle, 18px); border: 1px solid color-mix(in srgb, var(--detail-muted) 36%, var(--detail-top)); border-radius: 50%; color: var(--detail-muted); font-size: 10px; line-height: 1; transition: background .15s, color .15s; }\n#detail-dialog .room-name { min-width: 0; font-size: 11px; line-height: 1.4; }\n#detail-dialog .room-area { font-size: 10px; font-variant-numeric: tabular-nums; line-height: 1.4; white-space: nowrap; }\n#detail-dialog .room-legend-button.is-active .room-number { border-color: var(--detail-ink); background: var(--detail-ink); color: var(--detail-top); }\n#detail-dialog .unit-room-list li { display: grid; grid-template-columns: minmax(0, 1fr) auto; align-items: baseline; gap: 8px; min-width: 0; min-height: 0; padding: var(--room-padding, 4px) 0; border-bottom: 1px solid color-mix(in srgb, var(--detail-muted) 20%, transparent); color: var(--detail-muted); font-size: 11px; line-height: 1.4; }\n#detail-dialog .unit-room-list li > :last-child { color: var(--detail-ink); font-size: 10px; font-weight: 400; white-space: nowrap; }\n#detail-dialog .detail-conversion { display: grid; grid-template-rows: auto auto auto; row-gap: 10px; min-width: 0; }\n#detail-dialog .detail-price { margin: 0; padding: 6px 10px; border-radius: 8px; background: color-mix(in srgb, var(--detail-ink) 4%, transparent); text-align: center; }\n#detail-dialog .detail-price > p { display: flex; align-items: baseline; justify-content: center; flex-wrap: wrap; gap: 6px; margin: 0; }\n#detail-dialog .price-value { font-size: clamp(30px, 2.6vw, 40px); font-weight: 400; letter-spacing: -1.6px; line-height: 1.05; }\n#detail-dialog .price-unit { color: var(--detail-ink); font-size: 12px; font-weight: 400; line-height: 1.4; }\n#detail-dialog .price-unavailable { font-size: 24px; font-weight: 400; letter-spacing: -.7px; line-height: 1.2; }\n#detail-dialog .detail-inquiry { position: relative; min-width: 0; min-height: 60px; margin: 0; }\n#detail-dialog .detail-inquiry > .inquiry-button { width: 100%; }\n#detail-dialog .inquiry-pending { position: absolute; z-index: 40; bottom: calc(100% + 8px); left: 0; right: 0; margin: 0; padding: 13px 15px; border: 1px solid color-mix(in srgb, var(--detail-muted) 28%, var(--detail-top)); border-radius: 3px; color: var(--detail-muted); background: var(--detail-top); box-shadow: 0 7px 25px color-mix(in srgb, var(--detail-ink) 12%, transparent); font-size: 11px; line-height: 1.6; }\n#detail-dialog .inquiry-pending p { margin: 0; }\n#detail-dialog .inquiry-pending button { display: inline; margin: 4px 0 0; padding: 0; color: var(--detail-ink); font-size: inherit; text-decoration: underline; text-underline-offset: 4px; }\n#detail-dialog .detail-footer { display: grid; grid-template-columns: minmax(0, 1fr) minmax(100px, .85fr) minmax(0, 1fr); align-items: center; gap: 12px; margin: 0; min-width: 0; }\n#detail-dialog .detail-footer > :is(.download-wrap, .detail-share-wrap) { display: block; width: 100%; min-width: 0; }\n#detail-dialog .detail-footer .footer-pill { display: flex; align-items: center; justify-content: center; gap: 6px; width: 100%; min-width: 0; max-width: none; height: 44px; min-height: 44px; max-height: 44px; margin: 0; padding: 8px 11px; border: 1px solid var(--detail-ink); border-radius: 999px; color: var(--detail-ink); background: none; font-size: 11px; font-weight: 500; line-height: 1.2; text-align: center; white-space: normal; cursor: pointer; }\n#detail-dialog .detail-footer .datasheet-link { color: var(--detail-ink); background: none; }\n#detail-dialog .detail-footer .datasheet-link:hover { background: color-mix(in srgb, var(--detail-top) 40%, transparent); }\n#detail-dialog .detail-footer .footer-pill > svg { display: block; width: 15px; height: 15px; flex-shrink: 0; color: currentColor; }\n#detail-dialog .detail-footer .share-button:hover, #detail-dialog .detail-footer .share-button[aria-expanded=\"true\"] { background: color-mix(in srgb, var(--detail-top) 40%, transparent); }\n#detail-dialog .detail-status { display: flex; align-items: center; justify-content: center; min-width: 0; min-height: 44px; margin: 0; padding: 0; border: 0; text-align: center; }\n#detail-dialog .detail-status .status-pill { display: inline-flex; align-items: center; justify-content: center; gap: 6px; max-width: 100%; color: var(--detail-ink); font-size: 18px; font-weight: 400; line-height: 1.15; white-space: normal; }\n#detail-dialog .detail-status .status-pill::before { display: block; width: 6px; height: 6px; flex-shrink: 0; border-radius: 50%; background: currentColor; }\n#detail-dialog .detail-status .status-available { color: var(--available); }\n#detail-dialog .detail-status .status-sold { color: var(--sold); }\n#detail-dialog .detail-status .status-under_negotiation { color: var(--negotiating); }\n#detail-dialog .detail-status .status-available::before { animation: detail-availability-pulse 2.3s ease-in-out infinite; }\n@keyframes detail-availability-pulse { 0%, 100% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--available) 24%, transparent); } 50% { box-shadow: 0 0 0 4px color-mix(in srgb, var(--available) 8%, transparent); } }\n@media (prefers-reduced-motion: reduce) {\n#detail-dialog .detail-status .status-available::before { animation: none; box-shadow: none; }\n}\n#detail-dialog .detail-share-wrap { position: relative; }\n#detail-dialog .download-fallback { color: var(--detail-muted); }\n#detail-dialog .share-popover { position: fixed; z-index: 100; width: min(280px, calc(90vw - 24px)); margin: 0; padding: 14px; border: 1px solid color-mix(in srgb, var(--detail-muted) 28%, var(--detail-top)); border-radius: 8px; color: var(--detail-ink); background: var(--detail-top); box-shadow: 0 10px 38px color-mix(in srgb, var(--detail-ink) 16%, transparent); }\n#detail-dialog .share-heading { display: flex; align-items: center; justify-content: space-between; gap: 14px; margin-bottom: 9px; }\n#detail-dialog .share-heading > div { display: flex; flex-direction: column; gap: 4px; }\n#detail-dialog .share-heading span { color: var(--detail-muted); font-size: 10px; line-height: 1.4; }\n#detail-dialog .share-heading strong { font-family: 'Montserrat', Arial, sans-serif; font-size: 23px; font-weight: 400; line-height: 1.1; }\n#detail-dialog .share-heading > button { display: grid; place-items: center; width: 30px; height: 30px; padding: 0; color: var(--detail-ink); font-size: 22px; line-height: 1; }\n#detail-dialog .share-options { display: grid; }\n#detail-dialog .share-options > :is(button, a) { display: flex; align-items: center; gap: 11px; min-height: 33px; margin: 0; padding: 7px 0; border-bottom: 1px solid color-mix(in srgb, var(--detail-muted) 16%, transparent); color: var(--detail-ink); font-size: 12px; line-height: 1.4; text-align: left; }\n#detail-dialog .share-options > :is(button, a) > span { width: 18px; color: var(--detail-muted); text-align: center; }\n#detail-dialog .share-options > :is(button, a):hover { color: var(--detail-muted); }\n#detail-dialog .share-url { display: block; width: 100%; min-width: 0; height: 31px; margin-top: 11px; padding: 6px 8px; border: 1px solid color-mix(in srgb, var(--detail-muted) 25%, transparent); border-radius: 3px; color: var(--detail-muted); background: none; font-size: 10px; line-height: 1.4; }\n#detail-dialog .share-feedback { display: block; min-height: 14px; margin-top: 7px; color: var(--detail-muted); font-size: 10px; line-height: 1.4; }\n.inquiry-button { --inquiry-gold-shadow: #b1935c; --inquiry-gold-mid: #d4bd8e; --inquiry-gold-light: #ecdbb5; --inquiry-gold-edge: #bda36f; --inquiry-ink: #2c281f; --inquiry-shine: #fffdf4; box-sizing: border-box; position: relative; display: inline-flex; align-items: center; justify-content: center; gap: 22px; width: 100%; min-width: 0; height: 60px; min-height: 60px; margin: 0; padding: 15px 24px; overflow: hidden; border: 1px solid var(--inquiry-gold-edge); border-radius: 999px; color: var(--inquiry-ink); background: linear-gradient(112deg, var(--inquiry-gold-shadow) 0%, var(--inquiry-gold-mid) 30%, var(--inquiry-gold-light) 57%, var(--inquiry-gold-shadow) 100%); box-shadow: inset 0 1px 0 color-mix(in srgb, var(--inquiry-shine) 55%, transparent), 0 3px 11px color-mix(in srgb, var(--inquiry-gold-shadow) 12%, transparent); font-family: 'Montserrat', Arial, sans-serif; font-size: 22px; font-weight: 600; letter-spacing: .2px; line-height: 1.3; text-align: center; text-decoration: none; cursor: pointer; -webkit-tap-highlight-color: transparent; transition: transform .2s, box-shadow .2s; }\n.inquiry-button:hover { transform: translateY(-1px); box-shadow: inset 0 1px 0 color-mix(in srgb, var(--inquiry-shine) 70%, transparent), 0 5px 15px color-mix(in srgb, var(--inquiry-gold-shadow) 18%, transparent); }\n.inquiry-button:active { transform: translateY(0); }\n.inquiry-button:focus-visible { outline: 2px solid var(--inquiry-ink); outline-offset: 5px; }\n.inquiry-button > svg { display: none; }\n@media (prefers-reduced-motion: reduce) {\n.inquiry-button { transition: none; }\n.inquiry-button:hover { transform: none; }\n}\n@media (min-width: 1101px) and (min-height: 601px) {\n#detail-dialog .detail-room-tabs, #detail-dialog .detail-room-panel :is(.detail-rooms, .unit-room-section) > h3, #detail-dialog .detail-room-panel :is(.type-room-list, .unit-room-list) { transform: translateY(calc(var(--room-slack, 0px) * .5)); }\n}\n@media (min-width: 1700px) and (min-height: 900px) {\n#detail-dialog .detail-layout { padding-block: 28px 40px; }\n#detail-dialog .detail-sidebar { row-gap: 16px; }\n#detail-dialog .detail-core { gap: 18px; padding-block: 24px; }\n#detail-dialog .price-value { font-size: 44px; }\n#detail-dialog .detail-logo { width: 230px; }\n#detail-dialog .detail-metrics dd { font-size: 34px; }\n#detail-dialog .room-name { font-size: 12px; }\n}\n@media (max-height: 800px) {\n#detail-dialog .detail-layout { padding-block: 16px 28px; }\n#detail-dialog .detail-sidebar { row-gap: 8px; }\n#detail-dialog .detail-core { gap: 10px; padding-block: 4px; }\n#detail-dialog .detail-logo { width: 200px; }\n#detail-dialog .detail-metrics { gap: 8px; }\n#detail-dialog .detail-metrics dd { font-size: 28px; }\n#detail-dialog .detail-conversion { row-gap: 6px; }\n#detail-dialog .detail-price { padding: 4px 8px; }\n#detail-dialog .price-value { font-size: 28px; }\n}\n@media (max-width: 1100px), (max-height: 600px) {\n#detail-dialog .detail-layout { grid-template-columns: minmax(0, 1fr); grid-template-rows: auto 1px 32px minmax(0, 1fr) auto; gap: 8px 0; padding: 13px 15px 25px; }\n#detail-dialog .detail-sidebar { display: contents; }\n#detail-dialog .detail-core { grid-column: 1; grid-row: 1; gap: 8px; padding-block: 0; }\n#detail-dialog .detail-logo { width: 160px; }\n#detail-dialog .detail-metrics { gap: 8px; }\n#detail-dialog .detail-metrics dt { font-size: 14px; }\n#detail-dialog .detail-metrics dd { font-size: 22px; letter-spacing: -.8px; white-space: normal; }\n#detail-dialog .detail-metrics dd small { font-size: 14px; }\n#detail-dialog .detail-divider { grid-column: 1; grid-row: 2; }\n#detail-dialog .detail-panel-nav { grid-column: 1; grid-row: 3; display: flex; align-items: stretch; justify-content: center; gap: 26px; border-bottom: 1px solid color-mix(in srgb, var(--detail-muted) 18%, transparent); }\n#detail-dialog .detail-panel-nav button { min-width: 75px; min-height: 32px; margin: 0; padding: 0 4px; border: 0; border-bottom: 1px solid transparent; color: var(--detail-muted); background: none; font-size: 11px; line-height: 1.4; }\n#detail-dialog .detail-panel-nav button[aria-selected=\"true\"] { border-bottom-color: var(--detail-ink); color: var(--detail-ink); }\n#detail-dialog .detail-layout [data-detail-panel] { grid-column: 1; grid-row: 4; display: none; }\n#detail-dialog .detail-shell[data-panel=\"plan\"] .detail-drawing { display: flex; }\n#detail-dialog .detail-shell[data-panel=\"rooms\"] .detail-room-panel { display: flex; }\n#detail-dialog .detail-room-panel { width: 100%; min-height: 0; padding-top: 26px; }\n#detail-dialog .detail-room-panel h3 { display: block; min-height: 0; margin: 0 0 4px; padding: 0; font-size: 16px; line-height: 1.25; }\n#detail-dialog .detail-room-tabs { min-height: 24px; }\n#detail-dialog .detail-drawing-toolbar { gap: 8px; }\n#detail-dialog .detail-drawing-toolbar .detail-document-tabs { gap: 10px; }\n#detail-dialog .detail-drawing-toolbar .detail-document-tabs button { font-size: 10px; }\n#detail-dialog .detail-unit-meta { font-size: 9px; }\n#detail-dialog .detail-unit-meta span { margin-inline: 1px; }\n#detail-dialog .detail-conversion { grid-column: 1; grid-row: 5; row-gap: 8px; }\n#detail-dialog .price-value { font-size: 28px; }\n#detail-dialog .price-unit { font-size: 10px; }\n#detail-dialog .price-unavailable { font-size: 20px; }\n#detail-dialog .detail-inquiry { min-height: 52px; }\n#detail-dialog .detail-inquiry > .inquiry-button { height: 52px; min-height: 52px; padding: 12px 20px; font-size: 20px; }\n#detail-dialog .detail-footer { grid-template-columns: minmax(0, 1fr) minmax(80px, .95fr) minmax(0, 1fr); gap: 6px; }\n#detail-dialog .detail-footer .footer-pill { gap: 4px; padding: 6px; font-size: 10px; }\n#detail-dialog .detail-footer .footer-pill > svg { width: 13px; height: 13px; }\n#detail-dialog .detail-status .status-pill { gap: 4px; font-size: 14px; }\n#detail-dialog .detail-status .status-pill::before { width: 5px; height: 5px; }\n#detail-dialog .detail-brand-motif { width: 100%; }\n#detail-dialog .detail-illustration-note { left: 8px; bottom: 5px; font-size: 8.5px; }\n}\n@media (max-width: 600px) {\n#detail-dialog .detail-metrics dd small { display: block; margin-left: 0; }\n#detail-dialog .detail-metrics.has-garden dt { min-height: 2.8em; }\n#detail-dialog .detail-metrics.has-garden .detail-id-metric dt { white-space: normal; }\n#detail-dialog .detail-topbar { top: 8px; right: 8px; }\n#detail-dialog .detail-top-actions { gap: 8px; }\n#detail-dialog .detail-drawing-toolbar { flex-wrap: wrap; justify-content: flex-start; row-gap: 4px; column-gap: 10px; }\n#detail-dialog .detail-drawing-save .save-button.save-with-label { gap: 4px; }\n#detail-dialog .detail-save-label { max-width: 70px; font-size: 9.5px; overflow-wrap: anywhere; }\n#detail-dialog .detail-drawing-toolbar .detail-unit-meta { flex-basis: 100%; font-size: 9px; text-align: left; }\n#detail-dialog .dialog-close { width: 32px; height: 38px; font-size: 28px; }\n}\n@media (max-width: 600px) and (max-height: 700px) {\n#detail-dialog .detail-layout { grid-template-rows: auto 1px 28px minmax(0, 1fr) auto; row-gap: 3px; padding: 6px 15px 20px; }\n#detail-dialog .detail-core { gap: 4px; }\n#detail-dialog .detail-logo { width: 110px; }\n#detail-dialog .detail-metrics { gap: 6px; }\n#detail-dialog .detail-metrics.has-garden { gap: 4px; }\n#detail-dialog .detail-metrics dt { margin-bottom: 2px; }\n#detail-dialog .detail-metrics dd { font-size: 18px; }\n#detail-dialog .detail-conversion { row-gap: 4px; }\n#detail-dialog .price-value { font-size: 24px; }\n#detail-dialog .price-unavailable { font-size: 18px; }\n#detail-dialog .detail-inquiry { min-height: 44px; }\n#detail-dialog .detail-inquiry > .inquiry-button { height: 44px; min-height: 44px; padding: 10px 18px; font-size: 18px; }\n#detail-dialog .detail-status .status-pill { font-size: 13px; }\n#detail-dialog .detail-panel-nav { gap: 8px; }\n#detail-dialog .detail-panel-nav button { min-width: 45px; min-height: 28px; font-size: 10px; }\n#detail-dialog .detail-shell[data-panel=\"rooms\"] .detail-panel-nav { justify-content: flex-start; padding-right: 140px; }\n#detail-dialog .detail-room-panel { padding-top: 0; }\n#detail-dialog .detail-room-tabs { top: -31px; min-height: 28px; gap: 8px; }\n#detail-dialog .detail-room-panel h3 { margin: 0; font-size: 13px; line-height: 1.2; }\n#detail-dialog .detail-layout-label { margin-left: 5px; font-size: 10px; }\n#detail-dialog .detail-illustration-note { font-size: 8px; line-height: 1.2; }\n#detail-dialog .detail-room-tabs button { min-height: 28px; padding: 0; font-size: 10px; }\n}\n@media (max-width: 360px) and (max-height: 700px) {\n#detail-dialog .detail-layout { row-gap: 2px; }\n}\n@media (max-width: 360px) {\n#detail-dialog .detail-drawing-toolbar { gap: 6px; }\n#detail-dialog .detail-drawing-toolbar .detail-document-tabs { gap: 8px; }\n#detail-dialog .detail-drawing-toolbar .detail-document-tabs button { font-size: 9px; }\n#detail-dialog .detail-unit-meta { font-size: 8px; }\n#detail-dialog .type-room-list, #detail-dialog .unit-room-list { column-gap: 8px; }\n#detail-dialog .room-legend-button { grid-template-columns: 14px minmax(0, 1fr) auto; gap: 2px; }\n#detail-dialog .room-number { width: 14px; height: 14px; font-size: 9px; }\n#detail-dialog .room-area { font-size: 9px; }\n}\n@media (max-height: 600px) and (min-width: 601px) {\n#detail-dialog .detail-layout { --detail-landscape-rail: 300px; grid-template-columns: var(--detail-landscape-rail) minmax(0, 1fr); grid-template-rows: 28px minmax(0, 1fr); gap: 8px 20px; padding: 14px 18px 26px; }\n#detail-dialog .detail-sidebar { grid-column: 1; grid-row: 1 / 3; display: grid; grid-template-rows: auto 1px minmax(0, 1fr) auto; row-gap: 6px; }\n#detail-dialog .detail-core { grid-column: 1; grid-row: 1; gap: 6px; padding-block: 0; }\n#detail-dialog .detail-logo { width: 140px; }\n#detail-dialog .detail-metrics { gap: 6px; }\n#detail-dialog .detail-metrics.has-garden dt { min-height: 2.8em; }\n#detail-dialog .detail-metrics dd { font-size: 20px; }\n#detail-dialog .detail-room-panel h3 { margin: 0 0 3px; font-size: 14px; line-height: 1.2; }\n#detail-dialog .detail-conversion { grid-column: 1; grid-row: 4; row-gap: 4px; }\n#detail-dialog .price-value { font-size: 24px; }\n#detail-dialog .detail-inquiry { min-height: 44px; }\n#detail-dialog .detail-inquiry > .inquiry-button { height: 44px; min-height: 44px; padding: 10px 18px; font-size: 18px; }\n#detail-dialog .detail-panel-nav { grid-column: 2; grid-row: 1; padding-right: 66px; gap: 16px; }\n#detail-dialog .detail-layout > .detail-drawing { grid-column: 2; grid-row: 2; }\n#detail-dialog .detail-room-panel { position: absolute; left: calc(18px + var(--detail-landscape-rail) + 20px); right: 18px; top: 50px; bottom: 14px; width: auto; padding-top: 26px; }\n}\n.media-dialog { position: fixed; inset: 0; width: 100vw; max-width: none; height: 100dvh; max-height: none; margin: 0; padding: 0; border: 0; overflow: hidden; background: var(--paper); color: var(--ink); }\n.media-dialog::backdrop { background: var(--paper); }\n.media-shell { display: grid; grid-template-rows: auto minmax(0, 1fr) auto; width: 100%; height: 100%; }\n.media-header { display: grid; grid-template-columns: 1fr auto auto; align-items: center; gap: 32px; padding: 20px 32px; border-bottom: 1px solid var(--line); }\n.media-heading { min-width: 0; }\n.media-heading .eyebrow { margin: 0 0 6px; font-size: 8px; }\n.media-heading h2 { margin: 0; font-family: 'Montserrat', Arial, sans-serif; font-size: 27px; font-weight: 400; line-height: 1.2; }\n.media-description { margin: 7px 0 0; color: var(--muted); font-size: 10px; line-height: 1.6; }\n.media-tabs { display: flex; align-items: center; gap: 25px; }\n.media-tabs button { min-height: 40px; padding: 7px 0; border-bottom: 1px solid color-mix(in srgb, var(--line) 0%, transparent); color: var(--muted); font-size: 11px; }\n.media-tabs button[aria-selected=\"true\"] { border-color: var(--accent); color: var(--ink); }\n.media-stage { position: relative; min-width: 0; min-height: 0; overflow: hidden; user-select: none; touch-action: pan-x pan-y pinch-zoom; outline-offset: -5px; }\n.media-canvas { position: absolute; inset: 24px; pointer-events: none; }\n.media-image { display: block; width: 100%; height: 100%; object-fit: contain; transform-origin: center; transition: transform .1s ease-out; }\n.media-stage[data-zoomed=\"true\"] { cursor: grab; touch-action: none; }\n.media-stage[data-dragging=\"true\"] { cursor: grabbing; }\n.media-stage[data-dragging=\"true\"] .media-image { transition: none; }\n.media-dialog[data-loading=\"true\"] .media-image, .media-dialog[data-error=\"true\"] .media-image { opacity: 0; }\n.media-load-status { position: absolute; inset: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 16px; color: var(--muted); font-size: 12px; line-height: 1.8; text-align: center; }\n.media-load-status:empty { display: none; }\n.media-load-status p { margin: 0; }\n.media-load-status > div { display: flex; justify-content: center; flex-wrap: wrap; gap: 12px; }\n.media-footer { display: flex; align-items: center; justify-content: space-between; gap: 24px; padding: 13px 32px; border-top: 1px solid var(--line); }\n.media-footer > p { margin: 0; color: var(--muted); font-size: 10px; line-height: 1.7; }\n.media-zoom { display: flex; flex-shrink: 0; align-items: center; border: 1px solid var(--line); }\n.media-zoom button { display: grid; place-items: center; min-width: 37px; height: 36px; padding: 0 10px; color: var(--ink); font-size: 17px; }\n.media-zoom .zoom-level { min-width: 65px; font-size: 10px; border-inline: 1px solid var(--line); }\n.media-zoom button:hover { background: var(--hover); }\n@media (max-width: 760px) {\n.apartment-dialog { width: calc(100% - 24px); max-height: calc(100% - 24px); }\n.dialog-inner { padding: 26px 23px; }\n.dialog-head { padding-bottom: 23px; margin-bottom: 24px; }\n.dialog-head h2 { font-size: 34px; }\n.eyebrow { font-size: 8px; letter-spacing: 1.1px; }\n.toast { font-size: 10px; padding: 12px 17px; }\n.media-header { grid-template-columns: 1fr auto; gap: 12px 20px; padding: 18px 20px 0; }\n.media-header .dialog-close { grid-column: 2; grid-row: 1; align-self: start; }\n.media-heading h2 { font-size: 25px; }\n.media-tabs { grid-column: 1 / -1; gap: 25px; }\n.media-tabs button { min-height: 39px; font-size: 10px; }\n.media-canvas { inset: 15px; }\n.media-footer { gap: 15px; padding: 12px 18px; }\n.media-footer > p { font-size: 9px; max-width: 180px; }\n.media-zoom button { min-width: 33px; padding-inline: 8px; }\n.media-zoom .zoom-level { min-width: 54px; }\n}\n@media (prefers-reduced-motion: reduce) {\n*, *::before, *::after { animation: none !important; transition: none !important; scroll-behavior: auto !important; }\n}\n"
const ORBIT_APARTMENT_CARD_SHELL = "<dialog id=\"detail-dialog\" class=\"apartment-dialog\" aria-label=\"Lakás részletei\"></dialog>\n<dialog id=\"media-dialog\" class=\"media-dialog\" aria-labelledby=\"media-title\"></dialog>\n<div id=\"toast\" class=\"toast\" role=\"status\" aria-live=\"polite\"></div>\n"

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
async function createAdmiralApartmentPdf(snapshot: any, options: any): Promise<any> {
    const { signal }: any = options;
    const check: any = (): any => { if (signal.aborted)
        throw new DOMException('Export cancelled', 'AbortError'); };
    const resources: any = ([] as any), canvases: any = ([] as any);
    const canvas: any = (width: any, height: any): any => { const c: any = (document as any).createElement('canvas'); c.width = width; c.height = height; canvases.push(c); return c; };
    async function bytes(url: any): Promise<any> {
        if (!url)
            throw new Error('Missing PDF asset');
        const response: any = await fetch(url, ({ signal, credentials: 'omit' } as any));
        if (!response.ok)
            throw new Error('PDF asset unavailable: ' + response.status);
        return new Uint8Array(await response.arrayBuffer());
    }
    async function image(content: any, type: any): Promise<any> {
        check();
        const url: any = URL.createObjectURL(new Blob(([content] as any), ({ type } as any)));
        resources.push(url);
        const img: any = new Image();
        img.src = url;
        await img.decode();
        check();
        return img;
    }
    async function jpeg(c: any, quality: any): Promise<any> {
        const blob: any = await new Promise((resolve: any): any => c.toBlob(resolve, 'image/jpeg', quality));
        if (!blob)
            throw new Error('Image compression failed');
        check();
        return new Uint8Array(await blob.arrayBuffer());
    }
    try {
        const [{ pdf: lib, fontkit }, regularBytes, semiboldBytes, planBytes, logoBytes, monogramBytes]: any = await Promise.all(([
            loadAdmiralPdfTools(), bytes(snapshot.fontRegular), bytes(snapshot.fontSemibold),
            snapshot.imageUrl ? bytes(snapshot.imageUrl) : null, bytes(snapshot.logoUrl), bytes(snapshot.monogramUrl),
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
        const colors: any = ({ top: color(snapshot.colors.top, '#fdfbfb'), bottom: color(snapshot.colors.bottom, '#e4e9ec'), ink: color(snapshot.colors.ink, '#242824'), muted: color(snapshot.colors.muted, '#687074'), watermarkTop: color(snapshot.colors.watermarkTop, '#f2f0f1'), watermarkBottom: color(snapshot.colors.watermarkBottom, '#d9dfe2'), accent: color(snapshot.colors.accent, '#a38c69'), status: color(snapshot.colors.status, '#4f7959') } as any);
        const rgb: any = (value: any): any => lib.rgb(...value);
        const css: any = (value: any): any => 'rgb(' + value.map((v: any): any => Math.round(v * 255)).join(',') + ')';
        const mix: any = (a: any, b: any, t: any): any => a.map((v: any, i: any): any => v + (b[i] - v) * t);
        const ink: any = rgb(colors.ink), muted: any = rgb(colors.muted);
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
        gradient.addColorStop(0, css(colors.top));
        gradient.addColorStop(1, css(colors.bottom));
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
        bg.globalAlpha = .6;
        bg.drawImage(motif, 0, 0);
        bg.globalAlpha = 1;
        const backgroundImage: any = await pdf.embedJpg(await jpeg(background, .92));
        page.drawImage(backgroundImage, ({ x: 0, y: 0, width: W, height: H } as any));
        const rx: any = 638, rw: any = 454;
        // Logo uses the same SVG paths as the card's CSS mask.
        const logoDocument: any = new DOMParser().parseFromString(new TextDecoder().decode(logoBytes), 'image/svg+xml');
        if (logoDocument.querySelector('parsererror'))
            throw new Error('Invalid brand SVG');
        const vb: any = (logoDocument.documentElement.getAttribute('viewBox') || '0 0 1232 524').trim().split(/[\s,]+/).map(Number), logoW: any = 188, logoScale: any = logoW / vb[2], logoX: any = rx + (rw - logoW) / 2, logoY: any = 16;
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
        const metrics: any = snapshot.metrics, metricsX: any = rx, metricsW: any = rw;
        metrics.forEach((metric: any, i: any): any => { const cx: any = metricsX + metricsW * (i + .5) / metrics.length; centered(metric.label, cx, 108, 11, regular, muted); centered(metric.value, cx, 126, fit(metric.value, metricsW / metrics.length - 9, 23, semibold), semibold); });
        line(rx, 160, rw);
        text(snapshot.documentLabel, 28, 27, 10, regular);
        line(28, 45, snapshot.documentLabel === 'Alaprajz' ? 42 : 44, .9);
        right(snapshot.meta, 607, 28, fit(snapshot.meta, 450, 9), regular, muted);
        // Crop and fit the same plan as the detail card; no live viewport/tab clipping.
        const frame: any = ({ x: 28, top: 66, width: 579, height: 584 } as any);
        if (planBytes) {
            const img: any = await image(planBytes, 'image/*'), v: any = snapshot.viewBox, iw: any = img.naturalWidth, ih: any = img.naturalHeight;
            const sx: any = iw * v.x, sy: any = ih * v.y, sw: any = iw * v.width, sh: any = ih * v.height;
            if (!(sw > 0 && sh > 0 && iw > 0 && ih > 0))
                throw new Error('Invalid floorplan dimensions');
            const scale: any = Math.min(frame.width / sw, frame.height / sh), pw: any = sw * scale, ph: any = sh * scale, px: any = frame.x + (frame.width - pw) / 2, pt: any = frame.top + (frame.height - ph) / 2;
            const rasterScale: any = Math.min(1, 1800 / Math.max(sw, sh)), plan: any = canvas(Math.round(sw * rasterScale), Math.round(sh * rasterScale)), ctx: any = plan.getContext('2d');
            const pg: any = ctx.createLinearGradient(0, 0, 0, plan.height);
            pg.addColorStop(0, css(mix(colors.top, colors.bottom, pt / H)));
            pg.addColorStop(1, css(mix(colors.top, colors.bottom, (pt + ph) / H)));
            ctx.fillStyle = pg;
            ctx.fillRect(0, 0, plan.width, plan.height);
            ctx.drawImage(img, sx, sy, sw, sh, 0, 0, plan.width, plan.height);
            const embedded: any = await pdf.embedJpg(await jpeg(plan, .94));
            page.drawImage(embedded, ({ x: px, y: H - pt - ph, width: pw, height: ph } as any));
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
        text('Helyiségek.', rx, 186, 18, regular);
        if (snapshot.layoutLabel)
            text(snapshot.layoutLabel, rx + 112, 193, fit(snapshot.layoutLabel, rw - 112, 8), regular, muted);
        // Mapped plans share one numbered list. Unmapped unit areas remain a separate
        // list, never paired with type-plan markers by array index or room name.
        const groups: any = snapshot.roomGroups, roomTop: any = 222, roomBottom: any = 502, columns: any = groups.length > 1 ? 2 : 1, columnGap: any = 20, columnWidth: any = (rw - columnGap * (columns - 1)) / columns;
        const nameWidth: any = (row: any): any => columnWidth - (row.number != null ? 22 : 0) - (row.area ? 70 : 5);
        const maxUnits: any = Math.max(1, ...groups.map((group: any): any => group.rows.reduce((n: any, row: any): any => n + Math.max(1, wrap(row.name, nameWidth(row), 9).length), 0) + 3.6));
        const rowHeight: any = Math.min(22, (roomBottom - roomTop) / maxUnits), roomSize: any = Math.min(columns > 1 ? 9 : 10, rowHeight * .72);
        if (roomSize < 7.5)
            throw new Error('The room list is too long for the export layout');
        let maxY: any = roomTop;
        for (const [groupIndex, group] of groups.entries()) {
            const gx: any = rx + groupIndex * (columnWidth + columnGap);
            let y: any = roomTop;
            const headings: any = wrap(group.label, columnWidth, 7.5, semibold);
            headings.forEach((heading: any, i: any): any => text(heading, gx, y + i * 10, 7.5, semibold, muted));
            y += Math.max(rowHeight * 1.4, headings.length * 10 + 6);
            if (!group.rows.length) {
                text('A helyiséglista még nem érhető el.', gx, y, 8, regular, muted);
                y += rowHeight;
            }
            for (const row of group.rows) {
                const numbered: any = row.number != null, indent: any = numbered ? 22 : 0, names: any = wrap(row.name, nameWidth(row), roomSize);
                if (numbered) {
                    page.drawCircle(({ x: gx + 7, y: H - y - 5.5, size: Math.min(6.5, rowHeight * .42), borderColor: muted, borderWidth: .4, borderOpacity: .5 } as any));
                    centered(String(row.number).padStart(2, '0'), gx + 7, y + .3, Math.min(6.7, rowHeight * .52), regular, muted);
                }
                names.forEach((name: any, i: any): any => text(name, gx + indent, y + i * rowHeight, roomSize, regular, muted));
                if (row.area)
                    right(row.area, gx + columnWidth, y, roomSize, regular, muted);
                y += rowHeight * names.length;
                line(gx, y - 2, columnWidth, .2);
            }
            maxY = Math.max(maxY, y);
        }
        if (maxY > 515)
            throw new Error('The room list is too long for the export layout');
        // Match the card's price panel and gold action, with a useful PDF link.
        page.drawRectangle(({ x: rx, y: H - 575, width: rw, height: 64, color: ink, opacity: .035 } as any));
        centered(snapshot.price, rx + rw / 2, 531, fit(snapshot.price, rw - 30, 28), regular);
        const actionTop: any = 586, actionHeight: any = 43;
        page.drawRectangle(({ x: rx + 21, y: H - actionTop - actionHeight, width: rw - 42, height: actionHeight, color: rgb(colors.accent) } as any));
        page.drawCircle(({ x: rx + 21, y: H - actionTop - actionHeight / 2, size: 21.5, color: rgb(colors.accent) } as any));
        page.drawCircle(({ x: rx + rw - 21, y: H - actionTop - actionHeight / 2, size: 21.5, color: rgb(colors.accent) } as any));
        centered(snapshot.actionLabel, rx + rw / 2, actionTop + 10, 17, semibold);
        const actionLink: any = pdf.context.register(pdf.context.obj(({ Type: 'Annot', Subtype: 'Link', Rect: ([rx, H - actionTop - actionHeight, rx + rw, H - actionTop] as any), Border: ([0, 0, 0] as any), A: ({ Type: 'Action', S: 'URI', URI: lib.PDFString.of(snapshot.actionUrl) } as any) } as any)));
        page.node.addAnnot(actionLink);
        page.drawCircle(({ x: rx + 8, y: H - 653, size: 2.2, color: rgb(colors.status) } as any));
        text(snapshot.status, rx + 18, 646, 11, regular, rgb(colors.status));
        right('admiralpark.hu', rx + rw, 647, 9, regular, muted);
        text('Az alaprajz illusztráció. Bútorozatlan átadás. Bruttó vételár.', 9, 680, 7, regular, muted);
        right('Letöltve: ' + new Intl.DateTimeFormat('hu-HU').format(snapshot.date), W - 12, 680, 7, regular, muted);
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
    const labels: any = ({ available: 'Elérhető', under_negotiation: 'Tárgyalás alatt', sold: 'Elkelt', unknown: 'Érdeklődjön' } as any);
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
    let apartments: any = ([] as any), data: any, favorites: any = new Set(), toastTimer: any, mediaView: any = null, mediaSequence: any = 0;
    let requestedApartmentId: any = typeof config.apartment === 'string' ? config.apartment : null, cardOpen: any = false;
    const dialogFocus: any = new WeakMap(), dialogStack: any = ([] as any), downloadUrls: any = new Set();
    const modalRegistry: any = (window as any)[Symbol.for('admiral-park:open-dialogs')] ||= new Set();
    const modalScroll: any = (window as any)[Symbol.for('admiral-park:scroll-lock')] ||= ({ locked: false, value: '', priority: '', watched: new WeakSet() } as any);
    const dialogs: any = ([$('detail-dialog'), $('media-dialog')] as any).filter(Boolean);
    let detailResize: any = null, selectedPlanRoom: any = null, hoverPlanRoom: any = null, focusedPlanRoom: any = null;
    let storage: any = true;
    try {
        const stored: any = JSON.parse(localStorage.getItem('admiral-park:favorites:v1') || '[]');
        if (Array.isArray(stored))
            favorites = new Set(stored.filter((x: any): any => typeof x === 'string'));
    }
    catch {
        storage = false;
    }
    function toast(message: any): any {
        $('toast').textContent = message;
        $('toast').classList.add('visible');
        clearTimeout(toastTimer);
        toastTimer = setTimeout((): any => $('toast').classList.remove('visible'), 4200);
    }
    const byId: any = (id: any): any => apartments.find((a: any): any => a.id === id);
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
            return `<a class="inquiry-button" href="${esc(u.href)}" target="_blank" rel="noopener"><span>Érdeklődöm</span></a>`;
        }
        return `<button type="button" class="inquiry-button" data-inquiry-placeholder aria-expanded="false" aria-controls="inquiry-pending"><span>Érdeklődöm</span></button><div class="inquiry-pending" id="inquiry-pending" role="status" hidden><p>A kapcsolatfelvétel hamarosan elérhető.</p><button type="button" class="inquiry-copy" data-copy-inquiry="${esc(a.id)}">Lakásadatok másolása</button></div>`;
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
    function detailPlan(a: any): any {
        const layout: any = data.roomLayouts?.[a.apartmentType], source: any = a.media?.floorplan;
        const url: any = assetUrl(source?.original || (layout ? `assets/floorplans/types/${encodeURIComponent(a.apartmentType)}/original.png` : source?.full || a.floorplan));
        if (!url)
            return '<div class="empty-plan"><h3>Alaprajz</h3><p>Az alaprajz még nem érhető el.</p></div>';
        const view: any = layout?.viewBox || ({ x: 0, y: 0, width: 1, height: 1 } as any);
        const dimensions: any = layout?.imageDimensions || ({ width: 1500, height: 2000 } as any);
        const imageWidth: any = dimensions.width || dimensions[0] || 1500, imageHeight: any = dimensions.height || dimensions[1] || 2000;
        const surface: any = `left:${-view.x / view.width * 100}%;top:${-view.y / view.height * 100}%;width:${100 / view.width}%;height:${100 / view.height}%`;
        const markers: any = validPlanMarkers(layout);
        return `<section class="detail-plan" data-document-panel="plan" id="detail-document-plan" role="tabpanel" aria-labelledby="detail-document-plan-tab"><div class="detail-plan-stage"><div class="detail-plan-canvas" style="--plan-aspect:${imageWidth * view.width / (imageHeight * view.height)};aspect-ratio:${imageWidth * view.width}/${imageHeight * view.height}"><div class="detail-plan-surface" style="${surface}"><img class="detail-plan-image" src="${esc(url)}" alt="${esc(a.apartmentType || a.id)} típus számozott alaprajza" decoding="async"><div class="detail-plan-markers" aria-label="A típusterv helyiségei">${markers.map((marker: any): any => `<button type="button" class="room-marker" data-plan-room="${marker.number}" style="left:${marker.x * 100}%;top:${marker.y * 100}%" aria-label="${marker.number}. ${esc(roomLabel(marker.name))}" aria-pressed="false">${marker.number}</button>`).join('')}</div></div></div></div></section>`;
    }
    function detailRooms(a: any): any {
        const rooms: any = Array.isArray(a.roomList) ? a.roomList : ([] as any), markers: any = validPlanMarkers(data.roomLayouts?.[a.apartmentType]);
        const mapped: any = markers.length && rooms.length === markers.length && markers.every((marker: any): any => rooms.some((room: any): any => room.planNumber === marker.number));
        const layoutSummary: any = typeof a.layoutLabel === 'string' && a.layoutLabel.trim() ? a.layoutLabel.trim().replace(/hálószoba/giu, 'szoba') : hasNumber(a.rooms) ? `${number.format(a.rooms)} szoba` : '';
        const roomHeading: any = `Helyiségek.${layoutSummary ? ` <span class="detail-layout-label">${esc(layoutSummary)}</span>` : ''}`;
        const ownRooms: any = `<ul class="unit-room-list">${rooms.map((room: any): any => `<li><span>${esc(roomLabel(room.name))}</span><strong>${area(room.area)}</strong></li>`).join('') || '<li>A helyiséglista még nem érhető el.</li>'}</ul>`;
        return `<section class="detail-room-panel" data-detail-panel="rooms" id="detail-panel-rooms" role="tabpanel" aria-labelledby="detail-tab-rooms" data-room-view="type"><div class="detail-room-tabs" role="tablist" aria-label="Helyiségjegyzék"><button type="button" id="detail-room-type-tab" data-room-view="type" role="tab" aria-selected="true" aria-controls="detail-room-type">Típusterv</button>${!mapped ? '<button type="button" id="detail-room-unit-tab" data-room-view="unit" role="tab" aria-selected="false" tabindex="-1" aria-controls="detail-room-unit">Lakásterületek</button>' : ''}</div><div class="detail-rooms" data-room-panel="type" id="detail-room-type" role="tabpanel" aria-labelledby="detail-room-type-tab"><h3>${roomHeading}</h3><div class="room-page">${markers.length ? `<ol class="type-room-list">${markers.map((marker: any): any => { const room: any = mapped ? rooms.find((room: any): any => room.planNumber === marker.number) : null; return `<li><button type="button" class="room-legend-button" data-plan-room="${marker.number}" aria-pressed="false"><span class="room-number">${String(marker.number).padStart(2, '0')}</span><span class="room-name">${esc(roomLabel(marker.name))}</span>${room ? `<span class="room-area">${area(room.area)}</span>` : ''}</button></li>`; }).join('')}</ol>` : ownRooms}</div></div>${!mapped ? `<div class="unit-room-section" data-room-panel="unit" id="detail-room-unit" role="tabpanel" aria-labelledby="detail-room-unit-tab" hidden><h3>${roomHeading}</h3><div class="room-page">${ownRooms}</div></div>` : ''}</section>`;
    }
    function detail(id: any): any {
        const a: any = byId(id);
        if (!a)
            return;
        selectedPlanRoom = null;
        hoverPlanRoom = null;
        focusedPlanRoom = null;
        const floor: any = mediaEntries(a).find((item: any): any => item.key === 'floorLayout');
        const floorCaption: any = String(floorText(a)), floorMatch: any = /^(.*?)\s*emelet$/iu.exec(floorCaption);
        const floorMeta: any = floorMatch && floorMatch[1].trim() ? `<strong>${esc(floorMatch[1].trim())}</strong> emelet` : `<strong>${esc(floorCaption)}</strong>`;
        const monogram: any = assetUrl('assets/brand/ap-monogram.png'), logo: any = assetUrl('assets/brand/admiral-park-full-logo-no-location.svg');
        const dialog: any = $('detail-dialog');
        dialog.dataset.apartment = id;
        detailResize?.disconnect();
        dialog.innerHTML = `<div class="detail-shell" data-panel="plan"><div class="detail-brand-motif" aria-hidden="true"></div>
    <header class="detail-topbar"><div class="detail-top-actions"><button type="button" class="dialog-close" data-close aria-label="Bezárás">×</button></div></header>
    <div class="detail-layout">
      <aside class="detail-sidebar" aria-label="A lakás adatai">
        <div class="detail-core">
          <div class="detail-identity"><div class="detail-brand-group"><span class="detail-logo" role="img" aria-label="Admiral Park"></span></div></div>
          <div class="detail-area-row"><dl class="detail-metrics${a.areaGarden > 0 ? ' has-garden' : ''}"><div class="detail-id-metric"><dt>Lakás<wbr>szám</dt><dd><h2 class="detail-apartment-number">${esc(a.id)}</h2></dd></div>${detailMetric('Beltér', a.areaInterior)}${detailMetric('Erkély', a.areaTerrace)}${hasNumber(a.areaGarden) && a.areaGarden > 0 ? detailMetric('Kert', a.areaGarden) : ''}</dl></div>
        </div>
        <hr class="detail-divider">
        ${detailRooms(a)}
        <div class="detail-conversion"><div class="detail-price"><p>${hasNumber(a.price) ? `<span class="price-value">${priceNumber.format(a.price / 1000000)}</span> <small class="price-unit">M Ft</small>` : `<span class="price-unavailable">${esc(apartmentPrice(a))}</span>`}</p></div><div class="detail-inquiry">${inquiry(a)}</div><div class="detail-downloads detail-footer">${downloadLink(a, true)}<div class="detail-status"><span class="status-pill status-${esc(a.status)}">${esc(statusText(a))}</span></div>${shareControl(a)}</div></div>
      </aside>
      <nav class="detail-panel-nav" role="tablist" aria-label="Rajz és helyiségjegyzék">${([(['plan', 'Rajzok'] as any), (['rooms', 'Helyiségek'] as any)] as any).map(([key, label]: any): any => `<button type="button" role="tab" id="detail-tab-${key}" data-detail-tab="${key}" aria-controls="detail-panel-${key}" aria-selected="${key === 'plan'}" tabindex="${key === 'plan' ? 0 : -1}">${label}</button>`).join('')}</nav>
      <section class="detail-drawing" data-detail-panel="plan" id="detail-panel-plan" role="tabpanel" aria-labelledby="detail-tab-plan"><div class="detail-drawing-toolbar"><div class="detail-document-tabs" role="tablist" aria-label="Rajz kiválasztása"><button type="button" id="detail-document-plan-tab" role="tab" data-document-view="plan" aria-selected="true" aria-controls="detail-document-plan">Alaprajz</button>${floor ? '<button type="button" id="detail-document-floor-tab" role="tab" data-document-view="floor" aria-selected="false" tabindex="-1" aria-controls="detail-document-floor">Szintrajz</button>' : ''}</div><div class="detail-drawing-save">${saveButton(a, true)}</div><p class="detail-unit-meta"><strong>${esc(a.apartmentType || '')}</strong> típus <span>·</span> <strong>${esc(a.building)}</strong> épület <span>·</span> ${floorMeta} <span>·</span> <strong>${esc(a.orientation || 'Nincs adat')}</strong> tájolás</p></div>${detailPlan(a)}${floor ? `<section class="detail-floor-plan" data-document-panel="floor" id="detail-document-floor" role="tabpanel" aria-labelledby="detail-document-floor-tab" hidden><p class="detail-section-label">${esc(floorText(a))} · A, B, C épület</p><img class="detail-floor-image" src="${esc(floor.full)}" alt="${esc(floorText(a))} szintrajza" decoding="async"><p class="detail-plan-note">${esc(a.id)} · ${esc(a.building)} épület</p></section>` : ''}</section>
    </div><p class="detail-illustration-note">Az alaprajz illusztráció. Bútorozatlan átadás. Bruttó vételár.</p></div>`;
        const shell: any = dialog.querySelector('.detail-shell');
        if (monogram)
            shell.style.setProperty('--detail-monogram-image', `url("${monogram.replace(/"/g, '%22')}")`);
        if (logo)
            shell.style.setProperty('--detail-logo-image', `url("${logo.replace(/"/g, '%22')}")`);
        openDialog(dialog);
        dialog.scrollTop = 0;
        detailResize = new ResizeObserver((): any => requestAnimationFrame(fitDetailRooms));
        detailResize.observe(dialog.querySelector('.detail-room-panel'));
        requestAnimationFrame(fitDetailRooms);
    }
    function selectDetailPanel(value: any, focus: any = false): any {
        const dialog: any = $('detail-dialog'), shell: any = dialog.querySelector('.detail-shell');
        if (!shell)
            return;
        shell.dataset.panel = value;
        dialog.querySelectorAll('[data-detail-tab]').forEach((button: any): any => { const active: any = button.dataset.detailTab === value; button.setAttribute('aria-selected', String(active)); button.tabIndex = active ? 0 : -1; });
        if (focus && getComputedStyle(dialog.querySelector('.detail-panel-nav')).display !== 'none')
            dialog.querySelector(`[data-detail-tab="${value}"]`)?.focus(({ preventScroll: true } as any));
        requestAnimationFrame(fitDetailRooms);
    }
    function selectDetailDocument(value: any): any {
        const dialog: any = $('detail-dialog');
        dialog.querySelectorAll('[data-document-view]').forEach((button: any): any => { const active: any = button.dataset.documentView === value; button.setAttribute('aria-selected', String(active)); button.tabIndex = active ? 0 : -1; });
        dialog.querySelectorAll('[data-document-panel]').forEach((panel: any): any => { panel.hidden = panel.dataset.documentPanel !== value; });
    }
    function selectDetailRoomView(value: any): any {
        const dialog: any = $('detail-dialog'), panel: any = dialog.querySelector('.detail-room-panel');
        if (!panel)
            return;
        panel.dataset.roomView = value;
        panel.querySelectorAll('button[data-room-view]').forEach((button: any): any => { const active: any = button.dataset.roomView === value; button.setAttribute('aria-selected', String(active)); button.tabIndex = active ? 0 : -1; });
        panel.querySelectorAll('[data-room-panel]').forEach((item: any): any => { item.hidden = item.dataset.roomPanel !== value; });
        fitDetailRooms();
    }
    function fitDetailRooms(): any {
        const dialog: any = $('detail-dialog');
        if (signal.aborted || !dialog.open)
            return;
        const panel: any = dialog.querySelector('.detail-room-panel'), view: any = panel?.dataset.roomView;
        panel?.style.setProperty('--room-slack', '0px');
        const frame: any = panel?.querySelector(`[data-room-panel="${view}"] .room-page`);
        if (!frame?.clientHeight)
            return;
        const list: any = frame.querySelector('ol,ul');
        if (!list)
            return;
        const maxColumns: any = Math.max(1, Math.min(4, Math.floor(frame.clientWidth / 125)));
        for (let columns: any = 1; columns <= maxColumns; columns++) {
            list.style.setProperty('--room-columns', String(columns));
            list.dataset.columns = String(columns);
            for (const padding of ([4, 2, 1, 0] as any)) {
                list.style.setProperty('--room-padding', `${padding}px`);
                list.style.setProperty('--room-circle', `${padding >= 2 ? 18 : 16}px`);
                // Use the actual fractional height; rounded clientHeight could clip the last row.
                if (list.getBoundingClientRect().height <= Math.floor(frame.getBoundingClientRect().height) - 1) {
                    panel.style.setProperty('--room-slack', `${Math.max(0, frame.getBoundingClientRect().height - list.getBoundingClientRect().height - 1)}px`);
                    return;
                }
            }
        }
    }
    function paintPlanRoom(value: any): any {
        const dialog: any = $('detail-dialog'), number: any = value == null ? null : String(value);
        dialog.querySelectorAll('[data-plan-room]').forEach((button: any): any => { button.classList.toggle('is-active', button.dataset.planRoom === number); button.setAttribute('aria-pressed', String(button.dataset.planRoom === selectedPlanRoom)); });
    }
    function selectPlanRoom(value: any, origin: any): any {
        selectedPlanRoom = String(value);
        selectDetailRoomView('type');
        paintPlanRoom(selectedPlanRoom);
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
        const a: any = byId(id), dialog: any = $('detail-dialog');
        if (!a || !dialog.open)
            return;
        if (pdfExportJob) {
            if (pdfExportJob.id === id)
                return;
            pdfExportJob.controller.abort();
            pdfExportJob = null;
        }
        const shell: any = dialog.querySelector('.detail-shell'), computed: any = getComputedStyle(shell);
        const colors: any = ({} as any);
        for (const [key, property] of ([(['top', '--detail-top'] as any), (['bottom', '--detail-bottom'] as any), (['ink', '--detail-ink'] as any), (['muted', '--detail-muted'] as any), (['watermarkTop', '--detail-watermark-top'] as any), (['watermarkBottom', '--detail-watermark-bottom'] as any), (['accent', '--accent'] as any)] as any))
            colors[key] = computed.getPropertyValue(property).trim();
        colors.status = getComputedStyle(dialog.querySelector('.status-pill')).color;
        const layout: any = data.roomLayouts?.[a.apartmentType], markers: any = validPlanMarkers(layout), rooms: any = Array.isArray(a.roomList) ? a.roomList : ([] as any);
        const mapped: any = markers.length && rooms.length === markers.length && markers.every((marker: any): any => rooms.some((room: any): any => room.planNumber === marker.number));
        const unitRows: any = rooms.map((room: any): any => (({ name: roomLabel(room.name), area: area(room.area) } as any)));
        const typeRows: any = markers.map((marker: any): any => (({ number: marker.number, name: roomLabel(marker.name), area: mapped ? area(rooms.find((room: any): any => room.planNumber === marker.number).area) : null } as any)));
        const roomGroups: any = markers.length ? ([({ label: mapped ? 'Típusterv · Helyiségterületek' : 'Típusterv · Számozott helyiségek', rows: typeRows } as any)] as any) : ([] as any);
        if (!mapped || !markers.length)
            roomGroups.push(({ label: markers.length ? 'Lakásterületek · A kiválasztott lakás adatai' : 'Helyiségterületek', rows: unitRows } as any));
        const floor: any = dialog.querySelector('[data-document-view="floor"][aria-selected="true"]') ? mediaEntries(a).find((item: any): any => item.key === 'floorLayout') : null;
        const view: any = layout?.viewBox || ({ x: 0, y: 0, width: 1, height: 1 } as any);
        const validView: any = ([view.x, view.y, view.width, view.height] as any).every(hasNumber) && view.x >= 0 && view.y >= 0 && view.width > 0 && view.height > 0 && view.x + view.width <= 1.001 && view.y + view.height <= 1.001;
        const source: any = a.media?.floorplan;
        const pageUrl: any = apartmentLink(a.id), inquiryUrl: any = safeUrl(config.inquiryUrl), actionUrl: any = new URL(inquiryUrl || pageUrl);
        if (inquiryUrl)
            actionUrl.searchParams.set('apartment', a.id);
        const snapshot: any = ({
            id: String(a.id), date: new Date(), colors,
            metrics: ([({ label: 'Lakásszám', value: String(a.id) } as any), ({ label: 'Beltér', value: area(a.areaInterior).replace('m²', 'm2') } as any), ({ label: 'Erkély', value: area(a.areaTerrace).replace('m²', 'm2') } as any), ...(a.areaGarden > 0 ? ([({ label: 'Kert', value: area(a.areaGarden).replace('m²', 'm2') } as any)] as any) : ([] as any))] as any),
            meta: ([a.apartmentType ? `${a.apartmentType} típus` : null, `${a.building} épület`, floorText(a), a.orientation ? `${a.orientation} tájolás` : null] as any).filter(Boolean).join(' · '),
            documentLabel: floor ? 'Szintrajz' : 'Alaprajz',
            imageUrl: floor?.full || assetUrl(source?.original || (layout ? `assets/floorplans/types/${encodeURIComponent(a.apartmentType)}/original.png` : source?.full || a.floorplan)),
            viewBox: floor || !validView ? ({ x: 0, y: 0, width: 1, height: 1 } as any) : ({ x: view.x, y: view.y, width: view.width, height: view.height } as any),
            markers: floor ? ([] as any) : markers.map((marker: any): any => (({ number: marker.number, x: marker.x, y: marker.y } as any))),
            roomGroups, layoutLabel: typeof a.layoutLabel === 'string' ? a.layoutLabel.replace(/hálószoba/giu, 'szoba') : hasNumber(a.rooms) ? `${number.format(a.rooms)} szoba` : '',
            price: apartmentPrice(a), status: statusText(a), pageUrl, actionUrl: actionUrl.href, actionLabel: inquiryUrl ? 'Érdeklődöm' : 'Lakás megtekintése',
            fontRegular: assetUrl('assets/fonts/montserrat/montserrat-pdf-regular.ttf'), fontSemibold: assetUrl('assets/fonts/montserrat/montserrat-pdf-semibold.ttf'),
            logoUrl: assetUrl('assets/brand/admiral-park-full-logo-no-location.svg'), monogramUrl: assetUrl('assets/brand/ap-monogram.png'),
        } as any);
        const controller: any = new AbortController(), job: any = ({ controller, id } as any);
        pdfExportJob = job;
        const abort: any = (): any => controller.abort();
        signal.addEventListener('abort', abort, ({ once: true } as any));
        const timeout: any = setTimeout(abort, 45000), label: any = trigger.querySelector('span'), previous: any = label?.textContent;
        trigger.setAttribute('aria-busy', 'true');
        trigger.setAttribute('aria-disabled', 'true');
        if (label)
            label.textContent = 'PDF készül…';
        toast('A lakás adatlapja készül…');
        try {
            const blob: any = await createAdmiralApartmentPdf(snapshot, ({ signal: controller.signal } as any));
            if (signal.aborted || controller.signal.aborted || !dialog.open || dialog.dataset.apartment !== id)
                return;
            const url: any = URL.createObjectURL(blob);
            downloadUrls.add(url);
            const link: any = (document as any).createElement('a');
            link.href = url;
            link.download = `Admiral-Park-${String(a.id).replace(/[^A-Za-z0-9_-]/g, '-')}-adatlap.pdf`;
            shell.append(link);
            link.click();
            link.remove();
            const timer: any = setTimeout((): any => { URL.revokeObjectURL(url); downloadUrls.delete(url); pdfDownloadTimers.delete(timer); }, 30000);
            pdfDownloadTimers.add(timer);
            toast('A lakás adatlapjának letöltése elindult.');
        }
        catch (error: any) {
            if (!signal.aborted && dialog.open && dialog.dataset.apartment === id)
                toast('Nem sikerült elkészíteni a PDF-et. Próbálja újra.');
        }
        finally {
            clearTimeout(timeout);
            controller.abort();
            signal.removeEventListener('abort', abort);
            if (pdfExportJob === job)
                pdfExportJob = null;
            trigger.removeAttribute('aria-busy');
            trigger.removeAttribute('aria-disabled');
            if (label)
                label.textContent = previous;
        }
    }
    function apartmentLink(id: any): any { const u: any = new URL(safeUrl(config.pageUrl) || location.href); for (const key of (['building', 'floor', 'rooms', 'status', 'minArea', 'maxArea', 'minPrice', 'maxPrice', 'terrace', 'garden', 'favoritesOnly', 'search', 'sort'] as any))
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
        if (t.hasAttribute('data-document-view'))
            selectDetailDocument(t.dataset.documentView);
        if (t.hasAttribute('data-room-view'))
            selectDetailRoomView(t.dataset.roomView);
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
            const id: any = t.dataset.save;
            if (favorites.has(id))
                favorites.delete(id);
            else
                favorites.add(id);
            try {
                localStorage.setItem('admiral-park:favorites:v1', JSON.stringify(([...favorites] as any)));
            }
            catch {
                storage = false;
            }
            updateFavoriteButton();
            $('detail-dialog').querySelector('[data-save]')?.focus(({ preventScroll: true } as any));
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
        const dialog: any = $('detail-dialog'), id: any = dialog.dataset.apartment, a: any = byId(id), button: any = dialog.querySelector('[data-save]');
        if (!button || !a)
            return;
        const saved: any = favorites.has(id);
        button.classList.toggle('is-saved', saved);
        button.setAttribute('aria-pressed', String(saved));
        button.setAttribute('aria-label', id + ' ' + (saved ? 'eltávolítása a kedvencekből' : 'mentése a kedvencekhez'));
        const label: any = button.querySelector('.detail-save-label');
        if (label)
            label.textContent = saved ? 'Kedvencekhez mentve' : 'Mentés a kedvencekhez';
    }
    function syncFavorites(event: any): any {
        if (event.type === 'storage' && event.key !== 'admiral-park:favorites:v1')
            return;
        try {
            const ids: any = event.detail?.ids || JSON.parse(localStorage.getItem('admiral-park:favorites:v1') || '[]');
            if (Array.isArray(ids))
                favorites = new Set(ids.filter((id: any): any => typeof id === 'string'));
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
        const tab: any = event.target.closest('[role=tab][data-detail-tab],[role=tab][data-document-view],[role=tab][data-room-view]');
        if (!tab || !(['ArrowLeft', 'ArrowRight', 'Home', 'End'] as any).includes(event.key))
            return;
        const tabs: any = ([...tab.closest('[role=tablist]').querySelectorAll('[role=tab]')] as any), current: any = tabs.indexOf(tab), index: any = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : (current + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
        event.preventDefault();
        tabs[index].click();
        tabs[index].focus(({ preventScroll: true } as any));
    }, events);
    root.addEventListener('error', (event: any): any => {
        const image: any = event.target;
        if (image.matches?.('img[data-thumbnail]')) {
            image.hidden = true;
            const fallback: any = image.parentElement.querySelector('.preview-unavailable');
            if (fallback)
                fallback.hidden = false;
        }
    }, ({ ...events, capture: true } as any));
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
    const pdfDownloadTimers: any = new Set();
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
                favorites = new Set(([...favorites] as any).filter((id: any): any => ids.has(id)));
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
        open(id: any) {
            requestedApartmentId = typeof id === 'string' ? id : null;
            if (!requestedApartmentId)
                return;
            if (data) {
                if (byId(requestedApartmentId)) {
                    config.onState?.('ready', '');
                    detail(requestedApartmentId);
                }
                else
                    config.onState?.('error', 'A kiválasztott lakás nem található.');
            }
        },
        close() { requestedApartmentId = null; for (const dialog of ([...dialogs] as any).reverse())
            closeDialog(dialog); },
        retry() { return load(); },
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


interface OrbitApartmentCardController {
    open: (id: string) => void
    close: () => void
    retry: () => unknown
    dispose: () => void
}
export interface AdmiralApartmentDetailCardProps {
    openId: string | null
    dataUrl: string
    assetBase: string
    inquiryUrl: string
    pageUrl: string
    onOpenChange: (open: boolean) => void
    onClosed: () => void
    onReady?: () => void
    /** Reuse the list's loaded JSON instead of issuing another request. */
    dataset?: unknown
    /** Shared card colour variables; updates without rebuilding the runtime. */
    theme?: React.CSSProperties
}

export default function AdmiralApartmentDetailCard(props: AdmiralApartmentDetailCardProps) {
    const { openId, dataUrl, assetBase, inquiryUrl, pageUrl, dataset, theme } = props
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
    const [state, setState] = React.useState<"idle" | "loading" | "ready" | "error">("idle")
    const [error, setError] = React.useState("")
    const [nativeOpen, setNativeOpen] = React.useState(false)

    const restoreFocus = React.useCallback(() => {
        if (restoreFrame.current !== null) cancelAnimationFrame(restoreFrame.current)
        restoreFrame.current = requestAnimationFrame(() => {
            restoreFrame.current = null
            const target = opener.current
            if (target?.isConnected && target.getClientRects().length && !target.closest("[inert]")) target.focus({ preventScroll: true })
        })
    }, [])

    React.useEffect(() => () => {
        if (retryFrame.current !== null) cancelAnimationFrame(retryFrame.current)
        if (restoreFrame.current !== null) cancelAnimationFrame(restoreFrame.current)
    }, [])

    React.useEffect(() => {
        if (openId) {
            if (restoreFrame.current !== null) { cancelAnimationFrame(restoreFrame.current); restoreFrame.current = null }
            if (!lastRequestedId.current) opener.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
            closing.current = false
            setStarted(true)
        } else if (lastRequestedId.current && !closing.current) { closing.current = true; restoreFocus() }
        lastRequestedId.current = openId
    }, [openId, restoreFocus])

    React.useEffect(() => {
        if (!started || !host.current) return
        const shadow = host.current.shadowRoot || host.current.attachShadow({ mode: "open" })
        let alive = true
        let lastOpen = false
        shadow.innerHTML = "<style>" + ORBIT_APARTMENT_CARD_STYLES + "\n:host{position:fixed!important;inset:0 auto auto 0!important;width:0!important;height:0!important;min-height:0!important;background:transparent!important;pointer-events:none!important;overflow:visible!important}dialog,.toast{pointer-events:auto}dialog{font-size:14px}</style>" + ORBIT_APARTMENT_CARD_SHELL
        setState("loading")
        setError("")
        setNativeOpen(false)
        try {
            const runtime = mountOrbitApartmentCardRuntime(shadow, {
                dataUrl,
                dataset,
                assetBaseUrl: assetBase,
                inquiryUrl,
                pageUrl: pageUrl || window.location.href,
                apartment: current.current.openId,
                onState: (next: "loading" | "ready" | "error", message: string) => {
                    if (!alive) return
                    setState(next)
                    setError(message || "")
                },
                onReady: () => { if (alive) current.current.onReady?.() },
                onOpenChange: (next: boolean) => {
                    if (!alive || next === lastOpen) return
                    lastOpen = next
                    setNativeOpen(next)
                    current.current.onOpenChange(next)
                    if (!next && !closing.current) { closing.current = true; current.current.onClosed(); restoreFocus() }
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
            return () => { alive = false; controller.current = null; shadow.replaceChildren() }
        }
    }, [started, dataUrl, assetBase, inquiryUrl, pageUrl, dataset, restoreFocus])

    React.useEffect(() => {
        if (openId) controller.current?.open(openId)
        else controller.current?.close()
    }, [openId, started, dataUrl, assetBase, inquiryUrl, pageUrl, dataset])

    const close = React.useCallback(() => {
        if (closing.current) return
        closing.current = true
        if (retryFrame.current !== null) { cancelAnimationFrame(retryFrame.current); retryFrame.current = null }
        controller.current?.close()
        current.current.onOpenChange(false)
        current.current.onClosed()
        restoreFocus()
    }, [restoreFocus])
    const retry = React.useCallback(() => {
        if (controller.current) {
            controller.current.open(current.current.openId || "")
            controller.current.retry()
        } else {
            setStarted(false)
            if (retryFrame.current !== null) cancelAnimationFrame(retryFrame.current)
            retryFrame.current = requestAnimationFrame(() => { retryFrame.current = null; if (current.current.openId) setStarted(true) })
        }
    }, [])
    const notice = !!openId && !nativeOpen && (state === "loading" || state === "error" || !started)

    React.useEffect(() => {
        if (notice) noticeHost.current?.querySelector<HTMLButtonElement>('button[aria-label="Close apartment details"]')?.focus({ preventScroll: true })
    }, [notice, state])

    return <div
        data-orbit-detail-card=""
        data-orbit-ignore=""
        data-state={state === "idle" && openId ? "loading" : state}
        data-apartment-id={openId || ""}
        style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 30 }}
    >
        <div ref={host} data-orbit-ignore="" style={{ ...theme, position: "fixed", top: 0, left: 0, width: 0, height: 0, pointerEvents: "none" }} />
        {notice && <div
            ref={noticeHost}
            data-orbit-ignore=""
            role="dialog"
            aria-modal="true"
            aria-label="Apartment details"
            onKeyDown={event => {
                if (event.key === "Escape") { event.preventDefault(); event.stopPropagation(); close(); return }
                if (event.key === "Tab") {
                    const buttons = Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>("button:not(:disabled)"))
                    const first = buttons[0], last = buttons[buttons.length - 1]
                    if (first && ((!event.shiftKey && document.activeElement === last) || (event.shiftKey && document.activeElement === first) || !event.currentTarget.contains(document.activeElement))) {
                        event.preventDefault()
                        const target = event.shiftKey ? last : first
                        target?.focus()
                    }
                    event.stopPropagation()
                }
            }}
            style={{ position: "fixed", inset: 0, display: "grid", placeItems: "center", background: "rgba(36,40,36,.42)", backdropFilter: "blur(5px)", pointerEvents: "auto", padding: 20 }}
        >
            <div style={{ position: "relative", width: "min(460px,100%)", padding: "42px 30px 30px", color: "#242824", background: "linear-gradient(180deg,#fdfbfb,#e4e9ec)", font: "14px/1.7 Montserrat,Arial,sans-serif", boxShadow: "0 24px 100px rgba(36,40,36,.22)" }}>
                <button type="button" aria-label="Close apartment details" onClick={close} style={{ position: "absolute", top: 8, right: 12, border: 0, background: "none", color: "inherit", fontSize: 28, cursor: "pointer" }}>×</button>
                <p style={{ margin: "0 0 12px", fontSize: 24, fontWeight: 500 }}>{openId}</p>
                {state === "error" ? <><p role="alert" style={{ margin: "0 0 20px" }}>{error || "Nem sikerült betölteni a lakás adatait."}</p><button type="button" aria-label="Retry apartment details" onClick={retry} style={{ minHeight: 42, padding: "9px 20px", border: "1px solid #a38c69", borderRadius: 999, background: "none", color: "inherit", font: "inherit", cursor: "pointer" }}>Újrapróbálom</button></> : <p role="status" aria-live="polite" style={{ margin: 0 }}>Lakásadatok betöltése…</p>}
            </div>
        </div>}
    </div>
}
