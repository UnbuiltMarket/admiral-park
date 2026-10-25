interface OrbitApartmentStudioProps {
    active: boolean
    mode: "preview" | "hover" | "off"
    dataset: OrbitApartmentDataset | null
    dataStatus: "idle" | "loading" | "ready" | "error"
    error: string
    onRetry: () => void
    apartment: OrbitApartmentRecord | null
    onSelect: (id: string) => void
    assetBase: string
    detailsUrl: string
    inquiryUrl: string
    onViewport: (element: HTMLDivElement | null) => void
    language: "hu" | "en"
    onLayout?: () => void
    onOpenDetails?: () => void
    mobile?: boolean
    moving?: boolean
    filters: OrbitApartmentFilters
    filterBounds: OrbitPriceBounds | null
    filterAreaBounds?: OrbitAreaBounds | null
    filterActive: boolean
    filterCount: number
    onFiltersChange: (filters: OrbitApartmentFilters) => void
}

const orbitApartmentStudioStyles = `
[data-orbit-studio] {
    --studio-ink: #242824; --studio-muted: #687074; --studio-line: rgba(72,81,85,.2);
    --studio-paper: var(--admiral-orbit-background,#fdfbfb); --studio-base: #e4e9ec;
    position: absolute; inset: auto 0 0; height: 90%; z-index: 1; box-sizing: border-box;
    display: grid; grid-template-rows: auto minmax(0,1fr); gap: clamp(14px,1.8vw,26px);
    padding: clamp(16px,2.2vw,34px) clamp(20px,3vw,52px) 24px;
    color: var(--studio-ink); background: linear-gradient(180deg,var(--studio-paper),var(--studio-base));
    font-family: Montserrat,Arial,Helvetica,sans-serif; -webkit-font-smoothing: antialiased;
    opacity: 0; visibility: hidden; pointer-events: none; transition: opacity .4s ease,visibility 0s linear .4s;
}
[data-orbit-studio][data-active="true"] { opacity: 1; visibility: visible; pointer-events: auto; transition-delay: 0s; }
[data-orbit-studio] *, [data-orbit-studio] *::before, [data-orbit-studio] *::after { box-sizing: border-box; }
[data-orbit-studio] button,[data-orbit-studio] select,[data-orbit-studio] a { font: inherit; color: inherit; -webkit-tap-highlight-color: transparent; touch-action: manipulation; }
[data-orbit-studio] button { cursor: pointer; }
[data-orbit-studio] button:disabled { cursor: default; opacity: .45; }
[data-orbit-studio] :is(button,a,select):focus-visible { outline: 2px solid var(--studio-ink); outline-offset: 4px; }
[data-orbit-studio] [hidden] { display: none !important; }
[data-orbit-studio] .orbit-studio-header { display: flex; justify-content: space-between; align-items: center; gap: 20px; min-width: 0; }
[data-orbit-studio] .orbit-studio-brand { display: block; width: clamp(130px,13vw,184px); height: auto; flex: 0 0 auto; }
[data-orbit-studio] .orbit-studio-header-end { display: flex; align-items: center; justify-content: flex-end; flex-wrap: wrap; gap: 14px 24px; min-width: 0; }
[data-orbit-studio][data-mobile="false"] .orbit-studio-header { flex-wrap: wrap; row-gap: 12px; }
[data-orbit-studio] [data-orbit-studio-filters] { flex: 1 0 100%; width: 100%; min-width: 0; }
[data-orbit-studio][data-mobile="false"] [data-orbit-filter-status], [data-orbit-studio][data-mobile="false"] [data-orbit-price-toggle] { font-size: 12px; }
[data-orbit-studio] .orbit-studio-preview { display: flex; align-items: center; gap: 10px; min-width: 0; font-size: 10px; color: var(--studio-muted); }
[data-orbit-studio] .orbit-studio-preview label { white-space: nowrap; }
[data-orbit-studio] select { width: 98px; max-width: 100%; min-height: 38px; padding: 5px 24px 5px 10px; border: 1px solid var(--studio-line); border-radius: 0; background: transparent; font-size: 12px; }
[data-orbit-studio] .orbit-studio-heading { display: flex; align-items: center; gap: 20px; min-width: 0; }
[data-orbit-studio] .orbit-studio-id { margin: 0; font-size: clamp(27px,3vw,44px); font-weight: 700; line-height: 1; letter-spacing: -.065em; }
[data-orbit-studio] .orbit-studio-status { display: inline-flex; align-items: center; gap: 8px; color: var(--studio-muted); font-size: 12px; font-weight: 500; line-height: 1.4; }
[data-orbit-studio] .orbit-studio-status-dot { position: relative; display: block; width: 6px; height: 6px; border-radius: 50%; background: currentColor; flex-shrink: 0; }
[data-orbit-studio] .orbit-studio-status[data-status="available"] { color: #35764c; color: color-mix(in srgb,var(--orbit-available-color,#46A66A) 65%,#263b32); }
[data-orbit-studio] .orbit-studio-status[data-status="available"] .orbit-studio-status-dot::after { position: absolute; content: ""; inset: -3px; border: 1px solid currentColor; border-radius: 50%; animation: orbitStudioAvailablePulse 2.4s ease-out infinite; }
[data-orbit-studio] .orbit-studio-status[data-status="under_negotiation"],[data-orbit-studio] .orbit-studio-status[data-status="reserved"] { color: #79723c; color: color-mix(in srgb,var(--orbit-negotiation-color,#E2B849) 45%,#263b32); }
[data-orbit-studio] .orbit-studio-status[data-status="sold"] { color: #ae4f56; color: color-mix(in srgb,var(--orbit-sold-color,#DA5961) 75%,#263b32); }
@keyframes orbitStudioAvailablePulse { 0%,15% { opacity: .55; transform: scale(.6); } 75%,100% { opacity: 0; transform: scale(1.5); } }
[data-orbit-studio] .orbit-studio-body { display: grid; grid-template-columns: minmax(0,1.5fr) minmax(300px,1fr); gap: clamp(22px,3vw,48px); min-width: 0; min-height: 0; }
[data-orbit-studio] .orbit-studio-scene { display: grid; grid-template-rows: minmax(0,1fr) auto; gap: 18px; min-width: 0; min-height: 0; }
[data-orbit-studio] .orbit-studio-image-slot { display: flex; align-items: center; justify-content: center; min-width: 0; min-height: 0; container-type: size; }
[data-orbit-studio] [data-orbit-viewport] { position: relative; width: 100%; max-width: 100%; max-height: 100%; aspect-ratio: 1920 / 1010; background: transparent; }
@supports (width: 1cqh) { [data-orbit-studio] [data-orbit-viewport] { width: min(100cqw,calc(100cqh * 1920 / 1010)); } }
[data-orbit-studio] .orbit-studio-facts { min-width: 0; border-top: 1px solid var(--studio-line); padding-top: 18px; }
[data-orbit-studio] .orbit-studio-areas { display: grid; grid-template-columns: repeat(3,minmax(0,1fr)); gap: 16px; margin: 0 0 18px; }
[data-orbit-studio] .orbit-studio-areas > div { min-width: 0; }
[data-orbit-studio] .orbit-studio-areas dt { margin: 0 0 8px; color: var(--studio-muted); font-size: 11px; line-height: 1.4; }
[data-orbit-studio] .orbit-studio-areas dd { margin: 0; font-size: clamp(24px,2.4vw,36px); font-weight: 700; line-height: 1; letter-spacing: -.045em; white-space: nowrap; }
[data-orbit-studio] .orbit-studio-areas small { margin-left: 4px; color: var(--studio-muted); font-size: 12px; font-weight: 400; letter-spacing: 0; }
[data-orbit-studio] .orbit-studio-meta { display: flex; align-items: baseline; flex-wrap: wrap; gap: 8px 16px; margin: 0; color: var(--studio-muted); font-size: 11px; line-height: 1.6; }
[data-orbit-studio] .orbit-studio-meta strong { color: var(--studio-ink); font-weight: 600; }
[data-orbit-studio] .orbit-studio-mobile-meta { display: none; }
[data-orbit-studio] .orbit-studio-bottom { display: flex; align-items: flex-end; justify-content: space-between; gap: 16px; margin-top: 20px; }
[data-orbit-studio] .orbit-studio-price { min-width: 0; }
[data-orbit-studio] .orbit-studio-label { margin: 0 0 6px; color: var(--studio-muted); font-size: 10px; line-height: 1.4; }
[data-orbit-studio] .orbit-studio-price-value { margin: 0; font-size: clamp(24px,2.6vw,38px); font-weight: 400; letter-spacing: -.055em; line-height: 1.1; }
[data-orbit-studio] .orbit-studio-price-value small { margin-left: 4px; font-size: 12px; font-weight: 400; letter-spacing: 0; }
[data-orbit-studio] .orbit-studio-primary { display: inline-flex; align-items: center; justify-content: center; gap: 20px; min-height: 46px; padding: 10px 18px; border: 1px solid var(--studio-ink); border-radius: 0; color: var(--studio-ink); background: transparent; font-size: 12px; line-height: 1.3; text-decoration: none; white-space: nowrap; }
[data-orbit-studio] .orbit-studio-primary:hover { background: rgba(36,40,36,.05); }
[data-orbit-studio] .orbit-studio-secondary { display: flex; align-items: center; flex-wrap: wrap; gap: 8px 18px; margin-top: 16px; }
[data-orbit-studio] .orbit-studio-text-button { display: inline-flex; align-items: center; justify-content: center; gap: 6px; min-height: 36px; padding: 6px 0; border: 0; border-bottom: 1px solid var(--studio-line); border-radius: 0; color: var(--studio-muted); background: none; font-size: 10px; line-height: 1.4; text-decoration: none; }
[data-orbit-studio] .orbit-studio-text-button:hover { color: var(--studio-ink); border-bottom-color: var(--studio-ink); }
[data-orbit-studio] .orbit-studio-share-message { color: var(--studio-muted); font-size: 10px; line-height: 1.5; }
/* Keep the scene geometry stable while checkpoint information fades away. */
[data-orbit-studio] :is(.orbit-studio-header-end,.orbit-studio-facts,.orbit-studio-details,.orbit-studio-mobile-panel) { opacity: 1; transition: opacity .24s ease; }
[data-orbit-studio][data-moving="true"] :is(.orbit-studio-header-end,.orbit-studio-facts,.orbit-studio-details,.orbit-studio-mobile-panel) { opacity: 0; pointer-events: none; }

[data-orbit-studio] .orbit-studio-details { display: flex; flex-direction: column; min-width: 0; min-height: 0; }
[data-orbit-studio] .orbit-studio-drawing-toolbar { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px 18px; margin-bottom: 14px; min-height: 32px; flex-shrink: 0; }
[data-orbit-studio] .orbit-studio-tabs { display: flex; gap: 18px; align-items: center; }
[data-orbit-studio] .orbit-studio-tab { min-height: 36px; padding: 7px 0; border: 0; border-bottom: 1px solid transparent; border-radius: 0; color: var(--studio-muted); background: none; font-size: 11px; line-height: 1.4; }
[data-orbit-studio] .orbit-studio-tab[aria-selected="true"] { border-bottom-color: var(--studio-ink); color: var(--studio-ink); }
[data-orbit-studio] .orbit-studio-plan-section { display: flex; flex: 1; flex-direction: column; min-width: 0; min-height: 0; }
[data-orbit-studio] .orbit-studio-plan-stage { display: grid; flex: 1; place-items: center; min-width: 0; min-height: 0; container-type: size; }
[data-orbit-studio] .orbit-studio-plan-crop { position: relative; width: 100%; max-width: 100%; max-height: 100%; aspect-ratio: var(--studio-plan-aspect,1); overflow: hidden; }
@supports (width: 1cqh) { [data-orbit-studio] .orbit-studio-plan-crop { width: min(100cqw,calc(100cqh * var(--studio-plan-aspect,1))); } }
[data-orbit-studio] .orbit-studio-plan-image { position: absolute; display: block; max-width: none; border: 0; object-fit: fill; }
[data-orbit-studio] .orbit-studio-plan-note { flex-shrink: 0; margin: 14px 0 0; color: var(--studio-muted); font-size: 9px; font-weight: 400; line-height: 1.6; }
[data-orbit-studio] .orbit-studio-empty { margin: auto; max-width: 320px; padding: 24px 0; color: var(--studio-muted); font-size: 12px; line-height: 1.8; text-align: center; }
[data-orbit-studio] .orbit-studio-empty p { margin: 0 0 12px; }
[data-orbit-studio] .orbit-studio-loading { color: var(--studio-muted); font-size: 11px; line-height: 1.8; }
[data-orbit-studio] .orbit-studio-mobile-actions { display: none; }
[data-orbit-plan-dialog] { width: min(94vw,1450px); max-width: 94vw; height: 92dvh; max-height: 92dvh; margin: auto; padding: 0; border: 1px solid rgba(72,81,85,.2); color: #242824; background: linear-gradient(180deg,#fdfbfb,#e4e9ec); font-family: Montserrat,Arial,Helvetica,sans-serif; overscroll-behavior: contain; }
[data-orbit-plan-dialog]::backdrop { background: rgba(20,29,34,.6); backdrop-filter: blur(4px); }
[data-orbit-plan-dialog] .orbit-studio-dialog-shell { display: grid; grid-template-rows: auto minmax(0,1fr) auto; height: 100%; min-height: 0; padding: 16px 22px; gap: 12px; }
[data-orbit-plan-dialog] .orbit-studio-dialog-header { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; }
[data-orbit-plan-dialog] .orbit-studio-dialog-title { margin: 0; font-size: 16px; line-height: 1.4; font-weight: 500; }
[data-orbit-plan-dialog] .orbit-studio-dialog-tools { display: flex; align-items: center; gap: 8px; }
[data-orbit-plan-dialog] button { display: inline-flex; align-items: center; justify-content: center; min-width: 38px; min-height: 38px; border: 1px solid rgba(72,81,85,.25); border-radius: 0; color: #242824; background: transparent; font: inherit; cursor: pointer; touch-action: manipulation; }
[data-orbit-plan-dialog] button:focus-visible { outline: 2px solid #242824; outline-offset: 3px; }
[data-orbit-plan-dialog] .orbit-studio-dialog-zoom { min-width: 48px; font-size: 11px; text-align: center; }
[data-orbit-plan-dialog] .orbit-studio-zoom-stage { position: relative; display: grid; place-items: center; min-width: 0; min-height: 0; overflow: hidden; container-type: size; touch-action: none; }
[data-orbit-plan-dialog] .orbit-studio-zoom-plan { position: relative; width: 100%; max-width: 100%; max-height: 100%; aspect-ratio: var(--studio-plan-aspect,1); overflow: hidden; transform-origin: center; }
@supports (width: 1cqh) { [data-orbit-plan-dialog] .orbit-studio-zoom-plan { width: min(100cqw,calc(100cqh * var(--studio-plan-aspect,1))); } }
[data-orbit-plan-dialog] img { position: absolute; display: block; max-width: none; object-fit: fill; pointer-events: none; user-select: none; }
[data-orbit-plan-dialog] .orbit-studio-dialog-note { margin: 0; color: #687074; font-size: 10px; line-height: 1.5; }
@media (max-width: 1000px) and (min-width: 768px) {
    [data-orbit-studio] { padding: 18px 24px; gap: 14px; }
    [data-orbit-studio] .orbit-studio-body { grid-template-columns: minmax(0,1.25fr) minmax(270px,1fr); gap: 22px; }
    [data-orbit-studio] .orbit-studio-header-end { gap: 12px; }
    [data-orbit-studio] .orbit-studio-heading { gap: 12px; }
    [data-orbit-studio] .orbit-studio-bottom { align-items: flex-start; flex-direction: column; gap: 12px; }
    [data-orbit-studio] .orbit-studio-areas { gap: 10px; }
}
@media (max-width: 767px) {
    [data-orbit-studio] { padding: 14px 16px max(12px,env(safe-area-inset-bottom,0px)); gap: 12px; }
    [data-orbit-studio] .orbit-studio-header { gap: 12px; align-items: flex-start; }
    [data-orbit-studio] .orbit-studio-brand { width: 104px; }
    [data-orbit-studio] .orbit-studio-header-end { flex: 1; gap: 6px 12px; }
    [data-orbit-studio] .orbit-studio-heading { gap: 8px; justify-content: flex-end; flex-wrap: wrap; }
    [data-orbit-studio] .orbit-studio-id { font-size: 28px; }
    [data-orbit-studio] .orbit-studio-status { font-size: 10px; gap: 5px; }
    [data-orbit-studio] .orbit-studio-preview { gap: 6px; font-size: 9px; }
    [data-orbit-studio] .orbit-studio-preview select { width: 85px; min-height: 30px; font-size: 10px; }
    [data-orbit-studio] .orbit-studio-body { display: flex; flex-direction: column; gap: 12px; overflow: hidden; }
    [data-orbit-studio] .orbit-studio-scene { display: contents; }
    [data-orbit-studio] .orbit-studio-image-slot { flex: 0 0 auto; width: calc(100% + 32px); margin-inline: -16px; aspect-ratio: 1920 / 1010; container-type: normal; }
    [data-orbit-studio] [data-orbit-viewport] { width: 100%; height: 100%; max-height: none; }
    [data-orbit-studio] .orbit-studio-facts { order: 2; flex: 0 0 auto; padding-top: 12px; }
    [data-orbit-studio] .orbit-studio-areas { margin-bottom: 0; gap: 10px; }
    [data-orbit-studio] .orbit-studio-areas dt { margin-bottom: 5px; font-size: 9px; }
    [data-orbit-studio] .orbit-studio-areas dd { font-size: 25px; }
    [data-orbit-studio] .orbit-studio-areas small { font-size: 10px; }
    [data-orbit-studio] .orbit-studio-facts > .orbit-studio-meta, [data-orbit-studio] .orbit-studio-facts > .orbit-studio-bottom, [data-orbit-studio] .orbit-studio-facts > .orbit-studio-secondary { display: none; }
    [data-orbit-studio] .orbit-studio-details { order: 3; display: block; flex: 1 1 auto; overflow-y: auto; overscroll-behavior: contain; touch-action: pan-y; scrollbar-width: thin; scrollbar-color: rgba(72,81,85,.35) transparent; padding-right: 3px; }
    [data-orbit-studio] .orbit-studio-drawing-toolbar { margin-bottom: 8px; gap: 5px 12px; }
    [data-orbit-studio] .orbit-studio-tabs { gap: 16px; }
    [data-orbit-studio] .orbit-studio-tab { font-size: 10px; }
    [data-orbit-studio] .orbit-studio-drawing-toolbar > .orbit-studio-text-button { font-size: 9px; }
    [data-orbit-studio] .orbit-studio-mobile-meta { display: flex; margin-bottom: 10px; font-size: 10px; gap: 5px 12px; }
    [data-orbit-studio] .orbit-studio-plan-section { min-height: 310px; height: 310px; }
    [data-orbit-studio] .orbit-studio-plan-stage { height: 280px; flex: 0 0 280px; }
    [data-orbit-studio] .orbit-studio-plan-note { margin-top: 10px; font-size: 8px; }
    [data-orbit-studio] .orbit-studio-mobile-actions { display: block; border-top: 1px solid var(--studio-line); padding-top: 14px; margin-top: 16px; }
    [data-orbit-studio] .orbit-studio-mobile-actions .orbit-studio-bottom { margin: 0; align-items: center; }
    [data-orbit-studio] .orbit-studio-price-value { font-size: 26px; }
    [data-orbit-studio] .orbit-studio-price-value small { font-size: 10px; }
    [data-orbit-studio] .orbit-studio-primary { min-height: 42px; gap: 12px; padding: 8px 12px; font-size: 10px; }
    [data-orbit-studio] .orbit-studio-secondary { gap: 8px 14px; margin-top: 10px; }
    [data-orbit-plan-dialog] { width: 96vw; max-width: 96vw; height: 94dvh; max-height: 94dvh; }
    [data-orbit-plan-dialog] .orbit-studio-dialog-shell { padding: 12px; }
    [data-orbit-plan-dialog] .orbit-studio-dialog-title { font-size: 13px; }
    [data-orbit-plan-dialog] .orbit-studio-dialog-tools { gap: 4px; }
    [data-orbit-plan-dialog] .orbit-studio-dialog-note { font-size: 9px; }
}
@media (prefers-reduced-motion: reduce) {
    [data-orbit-studio] { transition: none; }
    [data-orbit-studio] .orbit-studio-status-dot::after { animation: none !important; }
}
@media (min-width: 768px) and (max-height: 600px) {
    [data-orbit-studio] { padding: 12px 20px; gap: 10px; }
    [data-orbit-studio] .orbit-studio-brand { width: 110px; }
    [data-orbit-studio] .orbit-studio-id { font-size: 28px; }
    [data-orbit-studio] .orbit-studio-body { grid-template-columns: minmax(0,1.2fr) minmax(280px,1fr); gap: 20px; }
    [data-orbit-studio] .orbit-studio-scene { grid-template-rows: minmax(0,1fr); gap: 0; }
    [data-orbit-studio] .orbit-studio-details { overflow-y: auto; overscroll-behavior: contain; touch-action: pan-y; padding-right: 6px; }
    [data-orbit-studio] .orbit-studio-plan-section { flex: 0 0 auto; min-height: 330px; }
    [data-orbit-studio] .orbit-studio-plan-stage { flex: none; height: 300px; }
    [data-orbit-studio] .orbit-studio-details .orbit-studio-facts { margin-top: 18px; }
}
/* Phones keep the complete orbit above a compact apartment summary. */
[data-orbit-studio][data-mobile="true"] {
    container-name: orbit-studio-mobile; container-type: size; overflow: hidden;
    padding: 8px 12px max(10px,env(safe-area-inset-bottom,0px)); gap: 6px;
    grid-template-rows: auto auto minmax(0,1fr); text-align: left;
}
[data-orbit-studio][data-mobile="true"] .orbit-studio-header { display: flex; align-items: center; justify-content: center; gap: 0; min-height: 0; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-brand { width: 160px; height: auto; max-width: 52cqw; }
[data-orbit-studio][data-mobile="true"] > [data-orbit-filters] { z-index: 5; }
[data-orbit-studio][data-mobile="true"] > [data-orbit-filters] [data-orbit-range-popover] { top: var(--orbit-mobile-popup-top,calc(-100% - 7px)); bottom: auto; }
[data-orbit-studio][data-mobile="true"] > [data-orbit-filters] [data-orbit-range-popover] { height: 64px; padding: 7px 10px; }
[data-orbit-studio][data-mobile="true"] > [data-orbit-filters] .orbit-filter-price-values { height: 15px; font-size: 10px; }
[data-orbit-studio][data-mobile="true"] > [data-orbit-filters] .orbit-filter-price-stage { height: 28px; margin-top: 3px; }
[data-orbit-studio][data-mobile="true"] > [data-orbit-filters] input[type="range"] { height: 28px; }
[data-orbit-studio][data-mobile="true"] > [data-orbit-filters] :is(.orbit-filter-price-track,.orbit-filter-price-selection) { top: 13px; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-body { display: grid; grid-template-columns: minmax(0,1fr); grid-template-rows: calc((100cqw + 24px) * 1010 / 1920) minmax(0,1fr); gap: 8px; overflow: hidden; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-scene { display: contents; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-image-slot { position: relative; order: 0; width: calc(100% + 24px); height: 100%; margin-inline: -12px; aspect-ratio: 1920 / 1010; container-type: inline-size; }
[data-orbit-studio][data-mobile="true"] [data-orbit-viewport] { position: absolute; inset: 0; width: 100%; height: 100%; max-height: none; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-panel { display: grid; grid-template-columns: minmax(0,1.5fr) minmax(0,1fr); grid-template-rows: auto minmax(0,1fr); gap: 8px 10px; min-width: 0; min-height: 0; height: min(100%,calc(max(200px,(100cqw - 10px) * .6 / var(--studio-plan-aspect,1)) + 36px)); align-self: center; overflow: hidden; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-panel > .orbit-studio-heading { grid-column: 1 / -1; justify-content: flex-start; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-plan { display: flex; flex-direction: column; justify-content: center; gap: 6px; min-width: 0; min-height: 0; margin: 0; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-plan > :is(figcaption,p) { flex-shrink: 0; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-eyebrow { margin: 0; color: var(--studio-muted); font-size: 10px; font-weight: 500; line-height: 1.4; letter-spacing: .07em; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-plan-button { display: grid; flex: 0 1 auto; min-width: 0; min-height: 0; width: 100%; aspect-ratio: var(--studio-plan-aspect,1); padding: 0; border: 0; border-radius: 8px; background: rgba(255,255,255,.45); text-align: left; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-plan-stage { width: 100%; height: 100%; min-height: 0; flex: auto; padding: 0; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-plan-note { margin: 0; font-size: 8px; line-height: 1.4; text-align: left; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-summary { display: flex; flex-direction: column; justify-content: center; align-items: stretch; gap: 7px; min-width: 0; min-height: 0; text-align: left; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-heading { display: flex; align-items: center; flex-wrap: nowrap; gap: 7px; min-width: 0; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-id { flex: 0 0 auto; margin: 0; font-size: 28px; line-height: 1; font-weight: 700; letter-spacing: -.045em; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-id small { margin-left: 5px; color: var(--studio-muted); font-size: 10px; font-weight: 400; letter-spacing: 0; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-status { flex: 0 1 auto; min-width: 0; font-size: 10px; line-height: 1.35; font-weight: 500; gap: 5px; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-status-text { display: block; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-metrics { display: grid; grid-template-columns: minmax(0,1fr); gap: 6px; margin: 0; min-width: 0; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-metrics > div { display: flex; align-items: baseline; justify-content: space-between; flex-wrap: wrap; gap: 2px 5px; min-width: 0; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-metrics > div:first-child { grid-column: 1 / -1; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-metrics dt { margin: 0; color: var(--studio-muted); font-size: 10px; font-weight: 400; line-height: 1.4; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-metrics dd { margin: 0; color: #263b32; font-size: 14px; font-weight: 700; line-height: 1.2; letter-spacing: -.025em; white-space: nowrap; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-metrics > div:first-child dd { font-size: 21px; line-height: 1.1; letter-spacing: -.05em; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-metrics small { margin-left: 2px; color: var(--studio-muted); font-size: 9px; font-weight: 400; letter-spacing: 0; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-metrics > div:first-child small { margin-left: 4px; font-size: 11px; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-meta { display: flex; align-items: baseline; justify-content: flex-start; flex-wrap: wrap; gap: 2px 7px; margin: 0; padding-top: 6px; border-top: 1px solid var(--studio-line); color: var(--studio-muted); font-size: 10px; line-height: 1.45; text-align: left; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-meta strong { color: var(--studio-ink); font-weight: 500; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-actions { display: block; min-width: 0; margin: 0; padding-top: 6px; border-top: 1px solid var(--studio-line); }
[data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-actions .orbit-studio-bottom { display: flex; flex-direction: column; justify-content: flex-start; align-items: stretch; margin: 0; gap: 7px; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-actions .orbit-studio-secondary { display: none; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-label { margin-bottom: 4px; font-size: 9px; line-height: 1.3; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-price-value { font-size: 18px; line-height: 1.1; font-weight: 500; letter-spacing: -.035em; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-price-value small { font-size: 11px; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-price-value.orbit-studio-price-empty { font-size: 12px; line-height: 1.4; font-weight: 400; letter-spacing: 0; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-primary { flex: 0 0 auto; min-height: 44px; padding: 10px 12px; gap: 8px; border: 1px solid #263b32; border-radius: 999px; color: #fff; background: #263b32; box-shadow: 0 3px 10px rgba(29,52,42,.1); font-size: 12px; font-weight: 500; transition: background .18s,box-shadow .18s; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-primary svg { width: 16px; height: 16px; flex-shrink: 0; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-primary:hover { background: #344e41; box-shadow: 0 4px 12px rgba(29,52,42,.16); }
[data-orbit-studio][data-mobile="true"] .orbit-studio-primary:active { background: #1c2e25; box-shadow: none; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-panel > .orbit-studio-empty { grid-column: 1 / -1; padding: 12px 0; }
@container orbit-studio-mobile (max-height: 560px) and (max-aspect-ratio: 1/1) {
    [data-orbit-studio][data-mobile="true"] .orbit-studio-brand { width: 116px; }
    [data-orbit-studio][data-mobile="true"] .orbit-studio-body { gap: 4px; }
    [data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-panel { grid-template-columns: minmax(0,1.5fr) minmax(0,1fr); grid-template-rows: auto minmax(0,1fr); gap: 4px 8px; height: 100%; max-height: 220px; }
    [data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-panel > .orbit-studio-heading { grid-column: 2; grid-row: 1; align-self: end; }
    [data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-plan { grid-column: 1; grid-row: 1 / span 2; }
    [data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-plan-button { max-height: 100%; }
    [data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-summary { grid-column: 2; grid-row: 2; }
    [data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-summary { gap: 2px; }
    [data-orbit-studio][data-mobile="true"] .orbit-studio-heading { display: flex; align-items: center; gap: 6px; flex-wrap: nowrap; }
    [data-orbit-studio][data-mobile="true"] .orbit-studio-id { font-size: 20px; margin: 0; }
    [data-orbit-studio][data-mobile="true"] .orbit-studio-status { font-size: 8.5px; gap: 4px; white-space: nowrap; }
    [data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-metrics { gap: 2px; }
    [data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-metrics > div:first-child dd { font-size: 18px; }
    [data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-metrics dt { font-size: 9px; }
    [data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-metrics dd { font-size: 12px; }
    [data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-meta { display: none; }
    [data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-actions { padding-top: 2px; }
    [data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-actions .orbit-studio-bottom { gap: 3px; }
    [data-orbit-studio][data-mobile="true"] .orbit-studio-price-value { font-size: 16px; }
    [data-orbit-studio][data-mobile="true"] .orbit-studio-primary { padding-inline: 9px; font-size: 11px; }
    [data-orbit-studio][data-mobile="true"] .orbit-studio-plan-note { display: none; }
}
@container orbit-studio-mobile (max-height: 480px) and (min-aspect-ratio: 4/3) {
    [data-orbit-studio][data-mobile="true"] .orbit-studio-brand { width: 110px; }
    [data-orbit-studio][data-mobile="true"] .orbit-studio-body { grid-template-columns: minmax(0,1.1fr) minmax(0,1fr); grid-template-rows: minmax(0,1fr); column-gap: 18px; }
    [data-orbit-studio][data-mobile="true"] .orbit-studio-image-slot { grid-column: 1; grid-row: 1; width: 100%; height: 100%; margin: 0; aspect-ratio: auto; container-type: size; }
    [data-orbit-studio][data-mobile="true"] [data-orbit-viewport] { position: relative; inset: auto; width: min(100cqw,calc(100cqh * 1920 / 1010)); height: auto; max-height: 100%; }
    [data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-panel { grid-column: 2; grid-row: 1; grid-template-rows: auto minmax(0,1fr); gap: 4px 8px; height: 100%; }
    [data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-panel > .orbit-studio-heading { grid-column: 2; grid-row: 1; }
    [data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-plan { grid-column: 1; grid-row: 1 / span 2; }
    [data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-summary { grid-column: 2; grid-row: 2; gap: 3px; }
    [data-orbit-studio][data-mobile="true"] .orbit-studio-id { font-size: 22px; }
    [data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-metrics { gap: 4px; }
    [data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-metrics > div:first-child dd { font-size: 19px; }
    [data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-meta { display: none; }
    [data-orbit-studio][data-mobile="true"] .orbit-studio-plan-note { display: none; }
    [data-orbit-studio][data-mobile="true"] .orbit-studio-price-value { font-size: 17px; }
    [data-orbit-studio][data-mobile="true"] .orbit-studio-primary { padding-inline: 14px; }
}
@media (prefers-reduced-motion: reduce) {
    [data-orbit-studio][data-mobile="true"] .orbit-studio-primary,
    [data-orbit-studio] :is(.orbit-studio-header-end,.orbit-studio-facts,.orbit-studio-details,.orbit-studio-mobile-panel) { transition: none; }
}
@container orbit-studio-mobile (max-width: 340px) {
    [data-orbit-studio][data-mobile="true"] .orbit-studio-heading { gap: 5px; }
    [data-orbit-studio][data-mobile="true"] .orbit-studio-id { font-size: 20px; }
    [data-orbit-studio][data-mobile="true"] .orbit-studio-status { font-size: 8.5px; gap: 3px; }
    [data-orbit-studio][data-mobile="true"] .orbit-studio-status-dot { width: 5px; height: 5px; }
}
`

function OrbitApartmentStudio(props: OrbitApartmentStudioProps): React.JSX.Element {
    const { active, mode, dataset, dataStatus, error, onRetry, apartment: currentApartment, onSelect, assetBase, detailsUrl, inquiryUrl, onViewport, language, onLayout, onOpenDetails, mobile = false, moving = false, filters, filterBounds, filterAreaBounds = null, filterActive, filterCount, onFiltersChange } = props
    // Retain only the departing visual while it fades; selection and hit testing
    // remain controlled by the parent and are disabled for checkpoint travel.
    const lastApartment = React.useRef<OrbitApartmentRecord | null>(currentApartment)
    if (currentApartment || !moving) lastApartment.current = currentApartment
    const apartment = currentApartment || (moving ? lastApartment.current : null)
    const hu = language !== "en"
    const [view, setView] = React.useState<"floorplan" | "floorLayout">("floorplan")
    const [expanded, setExpanded] = React.useState(false), [zoom, setZoom] = React.useState(1)
    const [pan, setPan] = React.useState({ x: 0, y: 0 })
    const [shareMessage, setShareMessage] = React.useState("")
    const [shortLandscape, setShortLandscape] = React.useState(false)
    const [failedImage, setFailedImage] = React.useState("")
    const dialog = React.useRef<HTMLDialogElement>(null)
    const drag = React.useRef<{ pointer: number; x: number; y: number; panX: number; panY: number } | null>(null)
    const mounted = React.useRef(true), shareGeneration = React.useRef(0)
    const headingId = React.useId(), planPanelId = React.useId()
    const labels = hu ? { interior: "Beltér", terrace: "Erkély", garden: "Kert", floorplan: "Alaprajz", floorLayout: "Szintrajz", expand: "Alaprajz nagyítása", preview: "Előnézet", select: "Előnézeti lakás", gross: "Bruttó vételár", details: "Lakás részletei", inquire: "Érdeklődöm", download: "Adatlap PDF", share: "Megosztás", close: "Bezárás", roomCount: "szoba", floor: "emelet", building: "épület", type: "típus", orientation: "tájolás" } :
        { interior: "Interior", terrace: "Terrace", garden: "Garden", floorplan: "Floor plan", floorLayout: "Floor layout", expand: "Enlarge floor plan", preview: "Preview", select: "Preview apartment", gross: "Gross purchase price", details: "Apartment details", inquire: "Enquire", download: "PDF factsheet", share: "Share", close: "Close", roomCount: "rooms", floor: "floor", building: "building", type: "type", orientation: "orientation" }
    const number = new Intl.NumberFormat(hu ? "hu-HU" : "en-GB", { maximumFractionDigits: 2 })
    const plan = active && apartment && dataset ? orbitApartmentPlan(apartment, dataset, assetBase, view, !expanded) : null
    const previewImage = useOrbitPreviewImage(plan?.url, active)
    const floorLayout = apartment && dataset ? orbitApartmentPlan(apartment, dataset, assetBase, "floorLayout") : null
    const asset = (path: string) => orbitApartmentAssetUrl(path, assetBase) || ""
    const logo = asset("assets/brand/admiral-park-full-logo-no-location.svg")
    const fontLatin = asset("assets/fonts/montserrat/montserrat-latin-variable.woff2")
    const fontExtended = asset("assets/fonts/montserrat/montserrat-latin-ext-variable.woff2")
    const cssUrl = (url: string) => url.replace(/["\\\n\r]/g, character => encodeURIComponent(character))
    const fontStyles = `@font-face{font-family:Montserrat;src:url("${cssUrl(fontLatin)}") format("woff2");font-style:normal;font-weight:100 900;font-display:swap;unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}@font-face{font-family:Montserrat;src:url("${cssUrl(fontExtended)}") format("woff2");font-style:normal;font-weight:100 900;font-display:swap;unicode-range:U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C4,U+2113,U+2C60-2C7F,U+A720-A7FF}`
    React.useEffect(() => { mounted.current = true; return () => { mounted.current = false; shareGeneration.current++ } }, [])
    React.useEffect(() => { setView("floorplan"); setFailedImage(""); setExpanded(false); setShareMessage(""); shareGeneration.current++ }, [apartment?.id])
    React.useEffect(() => { if (mobile) setView("floorplan") }, [mobile])
    React.useEffect(() => { setZoom(1); setPan({ x: 0, y: 0 }); setFailedImage("") }, [view, expanded])
    React.useEffect(() => { if (!active || moving) setExpanded(false) }, [active, moving])
    React.useEffect(() => {
        const element = dialog.current
        if (!element) return
        if (expanded && active && !element.open) element.showModal()
        if ((!expanded || !active) && element.open) element.close()
    }, [expanded, active])
    React.useEffect(() => {
        const query = window.matchMedia("(min-width: 768px) and (max-height: 600px)")
        const update = () => setShortLandscape(query.matches)
        update(); query.addEventListener("change", update)
        return () => query.removeEventListener("change", update)
    }, [])
    React.useEffect(() => { onLayout?.() }, [active, apartment?.id, dataStatus, view, shortLandscape, mobile, onLayout])
    const positive = (value: unknown): value is number => typeof value === "number" && Number.isFinite(value) && value >= 0
    const linkFor = (source: string) => {
        if (!source || !apartment) return ""
        try {
            const url = new URL(source, typeof window !== "undefined" ? window.location.href : "https://admiralpark.hu/")
            if (url.protocol !== "https:" && url.protocol !== "http:") return ""
            url.searchParams.set("apartment", apartment.id)
            return url.href
        } catch { return "" }
    }
    const detailLink = linkFor(detailsUrl), inquiryLink = linkFor(inquiryUrl)
    const actionLink = inquiryLink || detailLink
    const record = apartment as unknown as { media?: { datasheet?: { url?: string; label?: string; filename?: string } } } | null
    const download = record?.media?.datasheet?.url ? asset(record.media.datasheet.url) : ""
    const availability = apartment?.status || ""
    const statusText = availability === "available" ? hu ? "Elérhető" : "Available" : availability === "sold" ? hu ? "Eladva" : "Sold" : availability === "under_negotiation" ? hu ? "Egyeztetés alatt" : "In negotiation" : availability === "reserved" ? hu ? "Foglalt" : "Reserved" : apartment?.statusLabel || ""
    const floor = apartment?.floorLabel || (apartment?.floor === 0 ? hu ? "Földszint" : "Ground floor" : positive(apartment?.floor) ? `${apartment!.floor}. ${labels.floor}` : "")
    const viewportCallback = React.useCallback((element: HTMLDivElement | null) => onViewport(element), [onViewport])
    const share = async () => {
        const generation = ++shareGeneration.current
        const url = detailLink || (typeof window !== "undefined" ? linkFor(window.location.href) : "")
        if (!apartment || !url) return
        setShareMessage("")
        try {
            const title = `Admiral Park · ${apartment.id}`
            if (navigator.share) await navigator.share({ title, url })
            else if (navigator.clipboard?.writeText) { await navigator.clipboard.writeText(url); if (mounted.current && generation === shareGeneration.current) setShareMessage(hu ? "Hivatkozás másolva" : "Link copied") }
            else if (mounted.current && generation === shareGeneration.current) setShareMessage(hu ? "A hivatkozás a lakás részleteinél érhető el." : "Use the apartment details link to share this home.")
        } catch (reason) {
            if ((reason as { name?: string })?.name !== "AbortError" && mounted.current && generation === shareGeneration.current) setShareMessage(hu ? "A megosztás most nem érhető el." : "Sharing is currently unavailable.")
        }
    }
    const meta = (mobile = false) => <p className={`orbit-studio-meta${mobile ? " orbit-studio-mobile-meta" : ""}`}>
        {apartment?.apartmentType && <span><strong>{apartment.apartmentType}</strong> {labels.type}</span>}
        {apartment?.building && <span><strong>{apartment.building}</strong> {labels.building}</span>}
        {floor && <span data-orbit-field="floor"><strong>{floor}</strong></span>}
        {apartment?.orientation && <span data-orbit-field="orientation"><strong>{apartment.orientation}</strong> {labels.orientation}</span>}
        {positive(apartment?.rooms) && <span data-orbit-field="rooms"><strong>{number.format(apartment!.rooms!)}</strong> {labels.roomCount}</span>}
    </p>
    const conversion = () => <>
        <div className="orbit-studio-bottom">
            <div className="orbit-studio-price">{!mobile && <p className="orbit-studio-label">{apartment?.priceIncludesVat === false ? hu ? "Nettó vételár" : "Net purchase price" : labels.gross}</p>}<p className={`orbit-studio-price-value${!positive(apartment?.price) ? " orbit-studio-price-empty" : ""}`} data-orbit-apartment-price="" data-orbit-field="price">
                {positive(apartment?.price) ? <>{number.format(apartment!.price! / 1000000)}<small>M Ft</small></> : availability === "sold" ? hu ? "Nincs megadva" : "Not provided" : hu ? "Ár kérésre" : "Price on request"}
            </p></div>
            {(mobile || !inquiryLink) && onOpenDetails ? <button type="button" className="orbit-studio-primary" data-orbit-apartment-action="" data-orbit-detail-link="" aria-haspopup="dialog" disabled={mobile && moving} onClick={onOpenDetails}><span>{mobile ? hu ? "Adatlap" : "Details" : labels.details}</span>{mobile ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" /></svg> : <span aria-hidden="true">↗</span>}</button> : (mobile ? detailLink : actionLink) && <a className="orbit-studio-primary" href={mobile ? detailLink : actionLink} data-orbit-apartment-action="" {...(!mobile && inquiryLink ? { "data-orbit-inquiry": "" } : { "data-orbit-detail-link": "" })}><span>{mobile ? hu ? "Adatlap" : "Details" : inquiryLink ? labels.inquire : labels.details}</span>{mobile ? <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" /></svg> : <span aria-hidden="true">↗</span>}</a>}
        </div>
        <div className="orbit-studio-secondary">
            {download && <a href={download} className="orbit-studio-text-button" target="_blank" rel="noopener noreferrer" download={record?.media?.datasheet?.filename || undefined} data-orbit-apartment-download="" data-orbit-download=""><span aria-hidden="true">↓</span>{labels.download}</a>}
            {inquiryLink && (onOpenDetails ? <button type="button" className="orbit-studio-text-button" data-orbit-detail-link="" aria-haspopup="dialog" onClick={onOpenDetails}>{labels.details}<span aria-hidden="true">↗</span></button> : detailLink && <a href={detailLink} className="orbit-studio-text-button" data-orbit-detail-link="">{labels.details}<span aria-hidden="true">↗</span></a>)}
            {apartment && <button type="button" className="orbit-studio-text-button" onClick={() => { void share() }}>{labels.share}<span aria-hidden="true">↗</span></button>}
            <span className="orbit-studio-share-message" role="status">{shareMessage}</span>
        </div>
    </>
    const viewBox = plan?.viewBox || { x: 0, y: 0, width: 1, height: 1 }
    const planStyle: React.CSSProperties = { left: `${-viewBox.x / viewBox.width * 100}%`, top: `${-viewBox.y / viewBox.height * 100}%`, width: `${100 / viewBox.width}%`, height: `${100 / viewBox.height}%` }
    const aspectStyle = { "--studio-plan-aspect": plan?.aspect || 1 } as React.CSSProperties
    const planShown = !!plan && previewImage === plan.url && failedImage !== plan.url
    const note = hu ? "Az alaprajz illusztráció. Bútorozatlan átadás." : "Illustrative floor plan. Homes are delivered unfurnished."
    const tabs = <div className="orbit-studio-tabs" role="tablist" aria-label={hu ? "Rajz kiválasztása" : "Choose drawing"}>
        {(["floorplan", "floorLayout"] as const).filter(kind => kind === "floorplan" || !!floorLayout).map(kind => <button key={kind} type="button" className="orbit-studio-tab" role="tab" aria-selected={view === kind} aria-controls={planPanelId} tabIndex={view === kind ? 0 : -1}
            onClick={() => setView(kind)} onKeyDown={event => { if (event.key === "ArrowRight" || event.key === "ArrowLeft" || event.key === "Home" || event.key === "End") { event.preventDefault(); const next = floorLayout && (event.key === "End" || (event.key !== "Home" && view === "floorplan")) ? "floorLayout" : "floorplan"; setView(next); const list = event.currentTarget.parentElement; requestAnimationFrame(() => list?.querySelector<HTMLButtonElement>(`[data-plan-tab="${next}"]`)?.focus()) } }} data-plan-tab={kind}>{labels[kind]}</button>)}
    </div>
    const detailsVisibility = { "aria-hidden": !active || moving, ...(!active || moving ? { inert: "" as any } : {}) }
    const facts = <div className="orbit-studio-facts" data-orbit-ignore="" {...detailsVisibility}>
        <dl className="orbit-studio-areas">
            {([ ["areaInterior", labels.interior, "area"], ["areaTerrace", labels.terrace, "terrace"], ["areaGarden", labels.garden, "garden"] ] as const).map(([key, label, field]) => <div key={key} data-orbit-apartment-metric={key} data-orbit-field={field}><dt>{label}</dt><dd>{positive(apartment?.[key]) && (key === "areaInterior" || apartment![key]! > 0) ? <>{number.format(apartment![key]!)}<small>m²</small></> : "—"}</dd></div>)}
        </dl>
        {meta()}{conversion()}
    </div>
    return <>
        <section data-orbit-studio="" data-active={active ? "true" : "false"} data-mobile={mobile ? "true" : "false"} data-moving={moving ? "true" : "false"} data-mode={mode} data-status={dataStatus} data-apartment-id={apartment?.id || ""} aria-hidden={!active} {...(!active ? { inert: "" as any } : {})} aria-labelledby={mobile ? undefined : headingId} aria-label={mobile ? hu ? "Lakásválasztó" : "Apartments" : undefined}>
            <style>{fontStyles + orbitApartmentStudioStyles}</style>
            <header className="orbit-studio-header" data-orbit-ignore="">
                {logo && <img className="orbit-studio-brand" src={logo} alt="Admiral Park" width={184} height={78} draggable={false} />}
                {!mobile && <div className="orbit-studio-header-end" {...detailsVisibility}>
                    <div className="orbit-studio-heading"><h2 id={headingId} className="orbit-studio-id">{apartment?.id || (hu ? "Lakásválasztó" : "Apartments")}</h2>
                        {statusText && <span className="orbit-studio-status" data-status={availability} data-orbit-field="status"><span className="orbit-studio-status-dot" aria-hidden="true" />{statusText}</span>}
                    </div>
                    {mode === "preview" && dataset && <div className="orbit-studio-preview"><label htmlFor={`${headingId}-select`}>{labels.preview}</label><select id={`${headingId}-select`} data-orbit-apartment-select="" aria-label={labels.select} value={apartment?.id || ""} onChange={event => onSelect(event.target.value)}>
                        {!apartment && <option value="">—</option>}{dataset.apartments.map(unit => <option key={unit.id} value={unit.id}>{unit.id}</option>)}
                    </select></div>}
                </div>}
                {!mobile && <div data-orbit-studio-filters=""><OrbitFilterBar active={active && !moving} language={language} filters={filters} bounds={filterBounds} areaBounds={filterAreaBounds} matchCount={filterCount} total={dataset?.apartments.length || 0} onChange={onFiltersChange} /></div>}
            </header>
            {mobile && <OrbitFilterBar active={active && !moving} language={language} filters={filters} bounds={filterBounds} areaBounds={filterAreaBounds} matchCount={filterCount} total={dataset?.apartments.length || 0} onChange={onFiltersChange} />}
            <div className="orbit-studio-body">
                <div className="orbit-studio-scene">
                    <div className="orbit-studio-image-slot"><div ref={viewportCallback} data-orbit-viewport="" aria-hidden="true" /></div>
                    {!mobile && !shortLandscape && facts}
                </div>
                {mobile ? <div className="orbit-studio-mobile-panel" data-orbit-studio-details="" data-orbit-ignore="" style={aspectStyle} {...detailsVisibility}>
                    {dataStatus === "error" ? <div className="orbit-studio-empty" role="status"><p>{hu ? "A lakásadatok most nem tölthetők be." : "Apartment information could not be loaded."}</p><button type="button" className="orbit-studio-text-button" onClick={onRetry}>{hu ? "Újrapróbálom" : "Try again"}</button></div> : !apartment ? <div className="orbit-studio-empty" role="status" {...(filterActive && filterCount === 0 ? { "data-orbit-filter-empty": "" } : {})}><p>{dataStatus === "loading" || dataStatus === "idle" ? hu ? "Lakásadatok betöltése…" : "Loading apartment information…" : filterActive && filterCount === 0 ? hu ? "Nincs a szűrésnek megfelelő lakás." : "No apartments match these filters." : hu ? "Válasszon egy lakást az épületen." : "Select an apartment on the building."}</p></div> : <>
                            <div className="orbit-studio-heading"><h2 id={headingId} className="orbit-studio-id">{apartment.id}</h2>
                                {statusText && <span className="orbit-studio-status" data-status={availability} data-orbit-field="status" title={statusText}><span className="orbit-studio-status-dot" aria-hidden="true" /><span className="orbit-studio-status-text">{availability === "under_negotiation" ? hu ? "Egyeztetés" : "In talks" : statusText}</span></span>}
                            </div>
                        <figure className="orbit-studio-mobile-plan" style={aspectStyle}>
                            <button type="button" className="orbit-studio-mobile-plan-button" data-orbit-detail-link="" aria-haspopup="dialog" aria-label={hu ? `${apartment.id} adatlap megnyitása` : `Open apartment ${apartment.id} details`} disabled={moving || !onOpenDetails} onClick={onOpenDetails}>
                                <span className="orbit-studio-plan-stage" style={aspectStyle}>
                                    {planShown ? <span className="orbit-studio-plan-crop" data-orbit-plan-crop=""><img data-orbit-floorplan="" className="orbit-studio-plan-image" src={plan!.url} style={planStyle} alt={`${apartment.id} · ${labels.floorplan}`} decoding="async" draggable={false} onLoad={() => onLayout?.()} onError={() => setFailedImage(plan!.url)} /></span> : <span className="orbit-studio-loading">{hu ? "Az alaprajz még nem érhető el." : "Floor plan unavailable."}</span>}
                                </span>
                            </button>
                        </figure>
                        <div className="orbit-studio-mobile-summary" data-orbit-mobile-summary="">
                            <dl className="orbit-studio-mobile-metrics">
                                {([ ["areaInterior", hu ? "Lakótér" : labels.interior, "area"], ["areaTerrace", hu ? "Terasz" : labels.terrace, "terrace"], ["areaGarden", labels.garden, "garden"] ] as const).map(([key, label, field]) => <div key={key} data-orbit-apartment-metric={key} data-orbit-field={field}><dt>{label}</dt><dd>{positive(apartment[key]) && (key === "areaInterior" || apartment[key]! > 0) ? <>{number.format(apartment[key]!)}<small>m²</small></> : "—"}</dd></div>)}
                            </dl>
                            <p className="orbit-studio-mobile-meta">
                                {positive(apartment.rooms) && <span data-orbit-field="rooms"><strong>{number.format(apartment.rooms!)} {labels.roomCount}</strong></span>}
                                {apartment.orientation && <span data-orbit-field="orientation">{apartment.orientation}</span>}
                                {floor && <span data-orbit-field="floor">{floor}</span>}
                            </p>
                            <div className="orbit-studio-mobile-actions">{conversion()}</div>
                        </div>
                    </>}
                </div> : <div className="orbit-studio-details" data-orbit-studio-details="" data-orbit-ignore="" {...detailsVisibility}>
                    {dataStatus === "error" ? <div className="orbit-studio-empty" role="status"><p>{hu ? "A lakásadatok most nem tölthetők be." : "Apartment information could not be loaded."}</p>{error && <p>{error}</p>}<button type="button" className="orbit-studio-text-button" onClick={onRetry}>{hu ? "Újrapróbálom" : "Try again"}</button></div> : !apartment ? <div className="orbit-studio-empty" role="status"><p>{dataStatus === "loading" || dataStatus === "idle" ? hu ? "Lakásadatok betöltése…" : "Loading apartment information…" : hu ? "A lakás adatai a kijelölt otthonnál jelennek meg." : "Point to an apartment to see its details."}</p></div> : <>
                        <div className="orbit-studio-drawing-toolbar">{tabs}<button type="button" className="orbit-studio-text-button" aria-label={labels.expand} disabled={!planShown} onClick={() => setExpanded(true)}>{hu ? "Nagyítás" : "Enlarge"}<span aria-hidden="true">↗</span></button></div>
                        {meta(true)}
                        <section className="orbit-studio-plan-section" id={planPanelId} role="tabpanel" aria-label={labels[view]}>
                            <div className="orbit-studio-plan-stage" style={aspectStyle}>
                                {planShown ? <div className="orbit-studio-plan-crop" data-orbit-plan-crop=""><img data-orbit-floorplan="" className="orbit-studio-plan-image" src={plan!.url} style={planStyle} alt={`${apartment.id} · ${labels[view]}`} decoding="async" draggable={false} onLoad={() => onLayout?.()} onError={() => setFailedImage(plan!.url)} /></div> : <p className="orbit-studio-empty">{hu ? "A rajz még nem érhető el." : "This drawing is not available yet."}</p>}
                            </div>
                            <p className="orbit-studio-plan-note">{note}</p>
                        </section>
                        {shortLandscape && !mobile && facts}
                        <div className="orbit-studio-mobile-actions">{conversion()}</div>
                    </>}
                </div>}
            </div>
        </section>
        <dialog ref={dialog} data-orbit-plan-dialog="" data-orbit-ignore="" aria-label={`${apartment?.id || ""} · ${labels[view]}`} onCancel={event => { event.preventDefault(); setExpanded(false) }} onClose={() => setExpanded(false)} onClick={event => { if (event.target === event.currentTarget) setExpanded(false) }}>
            <div className="orbit-studio-dialog-shell">
                <header className="orbit-studio-dialog-header"><h3 className="orbit-studio-dialog-title">{apartment?.id} · {labels[view]}</h3><div className="orbit-studio-dialog-tools">
                    <button type="button" aria-label={hu ? "Kicsinyítés" : "Zoom out"} disabled={zoom <= 1} onClick={() => { setZoom(value => Math.max(1,value - .5)); setPan({ x: 0, y: 0 }) }}>−</button>
                    <span className="orbit-studio-dialog-zoom">{Math.round(zoom * 100)}%</span>
                    <button type="button" aria-label={hu ? "Nagyítás" : "Zoom in"} disabled={zoom >= 3} onClick={() => setZoom(value => Math.min(3,value + .5))}>+</button>
                    <button type="button" aria-label={labels.close} onClick={() => setExpanded(false)}>×</button>
                </div></header>
                <div className="orbit-studio-zoom-stage" style={{ ...aspectStyle, cursor: zoom > 1 ? "grab" : "default" }}
                    onPointerDown={event => { if (zoom <= 1) return; drag.current = { pointer: event.pointerId, x: event.clientX, y: event.clientY, panX: pan.x, panY: pan.y }; event.currentTarget.setPointerCapture(event.pointerId) }}
                    onPointerMove={event => { const current = drag.current; if (current?.pointer !== event.pointerId) return; const box = event.currentTarget.getBoundingClientRect(), limitX = box.width * (zoom - 1) / 2, limitY = box.height * (zoom - 1) / 2; setPan({ x: Math.max(-limitX,Math.min(limitX,current.panX + event.clientX - current.x)), y: Math.max(-limitY,Math.min(limitY,current.panY + event.clientY - current.y)) }) }}
                    onPointerUp={() => { drag.current = null }} onPointerCancel={() => { drag.current = null }}>
                    {expanded && planShown && <div className="orbit-studio-zoom-plan" style={{ transform: `translate(${pan.x}px,${pan.y}px) scale(${zoom})` }}><img src={plan!.url} style={planStyle} alt={`${apartment?.id} · ${labels[view]}`} draggable={false} /></div>}
                </div>
                <p className="orbit-studio-dialog-note">{note}{zoom > 1 ? hu ? " A nagyított rajz húzással mozgatható." : " Drag the enlarged drawing to move it." : ""}</p>
            </div>
        </dialog>
    </>
}
