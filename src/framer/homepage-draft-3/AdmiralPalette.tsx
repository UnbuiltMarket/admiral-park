import * as React from "react"
import { addPropertyControls, ControlType } from "framer"

// The editable swatches live in Framer → Assets → Colors → Admiral Park.
const accent = "var(--token-OWqJomPzk, #145083)"
const secondary = "var(--token-gYYue_hFm, #406b86)"
const paper = "var(--token-VoaAxSYjq, #f8fafb)"

// The list's original steel gradient, with a configurable middle stop.
export function admiralPanelGradient(base: string): string {
    return `radial-gradient(ellipse 85% 116% at 10% -24%, rgb(162 191 210 / 12%), transparent 69%), linear-gradient(126deg, color-mix(in srgb, ${base} 74%, #6b899a), ${base} 39%, color-mix(in srgb, ${base} 51%, #1c3147) 80%, color-mix(in srgb, ${base} 58%, #233e53))`
}

// White tint is given in percentage points. All white glass shares the same
// light direction and cool lower edge.
function whiteGlass(tint: number): string {
    return `linear-gradient(145deg, rgb(255 255 255 / ${tint + 12}%), rgb(247 251 253 / ${tint}%) 50%, rgb(225 239 247 / ${tint - 6}%))`
}

const panelGradient = admiralPanelGradient(secondary)

export const admiralPalette = {
    accent,
    secondary,
    paper,
    onPanel: paper,
    panelGradient,
    filterPanelGradient: `linear-gradient(rgb(6 21 34 / 6%), rgb(6 21 34 / 6%)), ${panelGradient}`,
    lightGlass: whiteGlass(44),
    lightGlassBlur: "blur(10px) saturate(112%)",
    lightGlassFallback: "#e6eef2",
    lightGlassInk: "#112e43",
    lightGlassRim: "rgb(255 255 255 / 57%)",
    lightGlassShadow: "inset 0 1px 0 rgb(255 255 255 / 48%), inset 0 -1px 0 rgb(219 233 241 / 28%), 0 3px 10px -4px rgb(17 47 63 / 30%)",
    lightGlassInset: whiteGlass(18),
    lightGlassDivider: "rgb(255 255 255 / 72%)",
    inquiryGradient: `linear-gradient(145deg, color-mix(in srgb, ${accent} 50%, #339de8), ${accent} 53%, color-mix(in srgb, ${accent} 65%, #001128))`,
    inquiryRim: "#1c496b",
    inquiryShadow: "inset 0 1px 1px rgb(220 240 255 / 32%), inset 0 -1px 0 rgb(5 24 46 / 18%), 0 3px 9px rgb(14 53 82 / 28%)",
} as const

interface SurfaceProps {
    tone?: "blue" | "glass"
    radius?: number
    style?: React.CSSProperties
}

const navbar = '[data-framer-name="Navbar"]'
const materialBar = navbar + ':has([data-admiral-nav-surface])'
const glassBar = navbar + ':has([data-admiral-nav-surface="glass"])'
const closedMobile = '[data-framer-name="MOBILE_LG"]'
const mobileBar = ':is([data-framer-name="MOBILE_LG"], [data-framer-name="MOBILE_LG_OPEN"])'
// Framer can mount hidden breakpoint copies. Follow the hero that owns the
// camera and use its actual panel reveal, including direct entry or Skip.
const activeHero = '[data-admiral-homepage][data-homepage-nav-active="true"]'
const aboveArticle = ':root:not(:has([data-admiral-reading-article]))'
const journey = `:root:has(${activeHero})`
const landing = `${aboveArticle}:has(${activeHero}[data-homepage-stage="orbitApproach"]:not([data-orbit-arriving]))`
const parkedStages = ':is([data-homepage-stage="handoff"],[data-homepage-stage="orbit"])'
const landed = `${aboveArticle}:is(:has(${activeHero}:is([data-orbit-arriving],${parkedStages})), :not(:has([data-homepage-nav-active])):has([data-admiral-homepage]${parkedStages}))`
const mobileLanded = `${aboveArticle}:has(${activeHero}[data-homepage-nav-in-view]:is([data-orbit-arriving],${parkedStages}))`
const apartmentListPage = ':root:has([data-admiral-apartment-list="shared"])'
const header = '[data-framer-name="Header || Appear"]'
const navHost = header + ' > nav'
const blueMobileBar = `:is(${mobileLanded}, ${apartmentListPage}) ${mobileBar} > ${glassBar}`
const blueBar = `:is(${navbar}:has([data-admiral-nav-surface="blue"]), ${landed} ${glassBar}:not(${mobileBar} > ${navbar}), ${blueMobileBar}, ${apartmentListPage} ${glassBar})`
const lightInquiry = `${blueBar} .admiral-frosted-button[data-appearance="blue"]`
const handover = '[data-framer-name="Handover date glass"]'

const surfaceCSS = `
:root {
    --admiral-inquiry-fill: ${admiralPalette.inquiryGradient};
    --admiral-inquiry-rim: ${admiralPalette.inquiryRim};
    --admiral-inquiry-shadow: ${admiralPalette.inquiryShadow};
    --admiral-glass-fill: ${admiralPalette.lightGlass};
    --admiral-glass-blur: ${admiralPalette.lightGlassBlur};
    --admiral-glass-fallback: ${admiralPalette.lightGlassFallback};
    --admiral-glass-ink: ${admiralPalette.lightGlassInk};
    --admiral-glass-rim: ${admiralPalette.lightGlassRim};
    --admiral-glass-shadow: ${admiralPalette.lightGlassShadow};
    --admiral-glass-inset: ${admiralPalette.lightGlassInset};
    --admiral-glass-divider: ${admiralPalette.lightGlassDivider};
}
/* Keep the homepage header at its authored viewport inset once the orbit
   releases page scrolling. Framer animates the wrapper and we fade its inner nav. */
:root:has([data-admiral-homepage]) ${header} { position: fixed !important; }
${journey} ${navHost} { transition: opacity .4s ease, visibility 0s; }
${landing} ${header} { pointer-events: none !important; }
${landing} ${navHost} {
    opacity: 0 !important; visibility: hidden; interactivity: inert;
    transition: opacity .32s ease, visibility 0s linear .32s;
}
${materialBar} {
    --border-color: var(--admiral-glass-rim) !important;
    box-shadow: var(--admiral-glass-shadow) !important;
}
${handover} {
    background: ${admiralPalette.secondary} !important;
    background: ${admiralPalette.filterPanelGradient} !important;
    --border-color: rgb(255 255 255 / 30%) !important;
    box-shadow: ${admiralPalette.inquiryShadow} !important;
    -webkit-backdrop-filter: none !important; backdrop-filter: none !important;
}
${handover} .framer-text {
    color: white !important; --framer-text-color: white !important;
}
[data-admiral-nav-surface] { background: ${admiralPalette.lightGlassFallback}; }
@supports ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
    [data-admiral-nav-surface="glass"] { background: ${admiralPalette.lightGlass}; }
    ${glassBar} {
        -webkit-backdrop-filter: ${admiralPalette.lightGlassBlur} !important;
        backdrop-filter: ${admiralPalette.lightGlassBlur} !important;
    }
}
[data-admiral-nav-surface]::after {
    content: ""; display: block; position: absolute; inset: 0; border-radius: inherit;
    background: ${admiralPalette.panelGradient}; pointer-events: none;
    opacity: 0; transition: opacity .42s ease-in-out;
}
[data-admiral-nav-surface="blue"]::after, ${blueBar} [data-admiral-nav-surface="glass"]::after { opacity: 1; }
${blueBar} [data-admiral-nav-surface="glass"]::after, ${mobileBar} [data-admiral-nav-surface="glass"]::after { transition: none; }
${landed}:not(${mobileLanded}) ${closedMobile} > ${glassBar} { background-color: rgb(246 250 253 / 65%) !important; }
${blueBar} [data-framer-name="Logo"] { filter: brightness(0) invert(1); }
${blueBar} [data-framer-name="Link"] .framer-text,
${blueBar} [data-framer-name="Links"] .framer-text,
${blueBar} [data-desktop-tour-menu-button] button { color: #fff !important; --framer-text-color: #fff; }
${blueMobileBar} :is([data-framer-name="Menu line 1"], [data-framer-name="Menu line 2"]) { background-color: #fff !important; }
${blueMobileBar} [data-framer-name="Mobile menu links"] > [data-framer-name="Link"] { border-bottom-color: rgb(255 255 255 / 20%); }
${blueMobileBar} [data-framer-name="Mobile menu links"] [data-framer-name="Link"] p { color: #fff !important; }

/* The blue navbar uses a white inquiry button. Glass navbars inherit the button’s blue appearance. */
${lightInquiry} {
    color: ${admiralPalette.accent};
    border-color: rgb(255 255 255 / 82%);
    background: linear-gradient(155deg, #fff 0%, #f6faff 52%, #e0eaf3 100%);
    box-shadow: inset 0 1px 1px #fff, inset 0 -1px 0 rgb(50 94 125 / 13%), 0 2px 7px rgb(19 52 78 / 19%);
}
@media (hover: hover) {
    ${lightInquiry}:not(:disabled):not([aria-disabled="true"]):hover {
        color: ${admiralPalette.accent};
        border-color: #fff;
        background: linear-gradient(155deg, #fff, #f9fcff 58%, #dbe9f4);
        box-shadow: inset 0 1px 1px #fff, 0 0 0 2px rgb(96 150 188 / 22%), 0 4px 11px rgb(19 52 78 / 24%);
    }
}
${lightInquiry}:not(:disabled):not([aria-disabled="true"]):active {
    background: linear-gradient(155deg, #e4edf5, #f8fbfe);
    box-shadow: inset 0 1px 3px rgb(19 52 78 / 18%);
}
${lightInquiry}:focus-visible { outline: 2px solid white; outline-offset: 2px; }
@media (prefers-reduced-motion: reduce) {
    [data-admiral-nav-surface]::after, ${journey} ${navHost}, ${landing} ${navHost} { transition: none; }
}
@media (prefers-reduced-transparency: reduce) {
    [data-admiral-nav-surface="glass"] { background: ${admiralPalette.lightGlassFallback}; }
    ${glassBar} { -webkit-backdrop-filter: none !important; backdrop-filter: none !important; }
}
@media (forced-colors: active) {
    ${handover} { background: Canvas !important; box-shadow: none !important; --border-color: CanvasText !important; }
    ${handover} .framer-text { color: CanvasText !important; --framer-text-color: CanvasText !important; }
    [data-admiral-nav-surface]::after { display: none; }
    ${blueMobileBar}, ${apartmentListPage} ${glassBar} { color: CanvasText; }
    :is(${blueMobileBar}, ${apartmentListPage} ${glassBar}) [data-framer-name="Logo"] { filter: none; }
    ${blueMobileBar} :is([data-framer-name="Menu line 1"], [data-framer-name="Menu line 2"]) { background-color: CanvasText !important; }
    ${blueMobileBar} [data-framer-name="Mobile menu links"] [data-framer-name="Link"] p { color: LinkText !important; }
    ${lightInquiry}, ${lightInquiry}:not(:disabled):not([aria-disabled="true"]):is(:hover, :active) {
        background: ButtonFace; color: ButtonText; border-color: ButtonText; box-shadow: none;
    }
    ${lightInquiry}:focus-visible { outline-color: Highlight; }
}
`

/**
 * @framerSupportedLayoutWidth any
 * @framerSupportedLayoutHeight any
 * @framerIntrinsicWidth 320
 * @framerIntrinsicHeight 48
 */
export default function FilterBarSurface({ style, radius = 34, tone = "blue" }: SurfaceProps) {
    return <div aria-hidden="true" data-admiral-nav-surface={tone} style={{ width: "100%", height: "100%", ...style, position: style?.position ?? "relative", borderRadius: radius, pointerEvents: "none" }}>
        <style dangerouslySetInnerHTML={{ __html: surfaceCSS }} />
    </div>
}

addPropertyControls(FilterBarSurface, {
    tone: { type: ControlType.Enum, title: "Finish", options: ["blue", "glass"], optionTitles: ["Filter blue", "White glass → orbit blue"], defaultValue: "blue" },
    radius: { type: ControlType.Number, title: "Radius", defaultValue: 34, min: 0, max: 80, unit: "px" },
})
