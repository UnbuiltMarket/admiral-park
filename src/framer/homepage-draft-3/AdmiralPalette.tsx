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

export const admiralPalette = {
    accent,
    secondary,
    paper,
    onPanel: paper,
    panelGradient: admiralPanelGradient(secondary),
    lightGlass: whiteGlass(44),
    lightGlassBlur: "blur(10px) saturate(112%)",
    lightGlassFallback: "#e6eef2",
    lightGlassInk: "#112e43",
    lightGlassRim: "rgb(255 255 255 / 57%)",
    lightGlassShadow: "inset 0 1px 0 rgb(255 255 255 / 48%), inset 0 -1px 0 rgb(219 233 241 / 28%), 0 3px 10px -4px rgb(17 47 63 / 30%)",
    lightGlassInset: whiteGlass(18),
    lightGlassDivider: "rgb(255 255 255 / 72%)",
    inquiryGradient: `linear-gradient(145deg, color-mix(in srgb, ${accent} 50%, #339de8), ${accent} 53%, color-mix(in srgb, ${accent} 65%, #001128))`,
} as const

interface SurfaceProps {
    tone?: "blue" | "glass"
    radius?: number
    style?: React.CSSProperties
}

const navbar = '[data-framer-name="Navbar"]'
const materialBar = navbar + ':has([data-admiral-nav-surface])'
const glassBar = navbar + ':has([data-admiral-nav-surface="glass"])'
// Framer can mount hidden breakpoint copies. Follow the hero that owns the
// camera and use its actual panel reveal, including direct entry or Skip.
const activeHero = '[data-admiral-homepage][data-homepage-nav-active="true"]'
const journey = `:root:has(${activeHero})`
const landing = `:root:has(${activeHero}[data-homepage-stage="orbitApproach"]:not([data-orbit-arriving]))`
const parkedStages = ':is([data-homepage-stage="handoff"],[data-homepage-stage="orbit"])'
const landed = `:is(:root:has(${activeHero}:is([data-orbit-arriving],${parkedStages})), :root:not(:has([data-homepage-nav-active])):has([data-admiral-homepage]${parkedStages}))`
const header = '[data-framer-name="Header || Appear"]'
const navHost = header + ' > nav'
const blueBar = `:is(${navbar}:has([data-admiral-nav-surface="blue"]), ${landed} ${glassBar})`
const handover = '[data-framer-name="Handover date glass"]'

const surfaceCSS = `
:root {
    --admiral-glass-fill: ${admiralPalette.lightGlass};
    --admiral-glass-blur: ${admiralPalette.lightGlassBlur};
    --admiral-glass-fallback: ${admiralPalette.lightGlassFallback};
    --admiral-glass-ink: ${admiralPalette.lightGlassInk};
    --admiral-glass-rim: ${admiralPalette.lightGlassRim};
    --admiral-glass-shadow: ${admiralPalette.lightGlassShadow};
    --admiral-glass-inset: ${admiralPalette.lightGlassInset};
    --admiral-glass-divider: ${admiralPalette.lightGlassDivider};
}
/* Framer animates the fixed outer wrapper on page entry. The inner nav
   fades independently so the authored entrance and position stay intact. */
${journey} ${navHost} { transition: opacity .4s ease, visibility 0s; }
${landing} ${header} { pointer-events: none !important; }
${landing} ${navHost} {
    opacity: 0 !important; visibility: hidden; interactivity: inert;
    transition: opacity .32s ease, visibility 0s linear .32s;
}
${materialBar}, ${handover} {
    --border-color: var(--admiral-glass-rim) !important;
    box-shadow: var(--admiral-glass-shadow) !important;
}
${handover} { background: var(--admiral-glass-fallback) !important; }
${handover} .framer-text {
    color: var(--admiral-glass-ink) !important; --framer-text-color: var(--admiral-glass-ink) !important;
}
[data-admiral-nav-surface] { background: ${admiralPalette.lightGlassFallback}; }
@supports ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
    [data-admiral-nav-surface="glass"] { background: ${admiralPalette.lightGlass}; }
    ${handover} { background: var(--admiral-glass-fill) !important; }
    ${glassBar}, ${handover} {
        -webkit-backdrop-filter: ${admiralPalette.lightGlassBlur} !important;
        backdrop-filter: ${admiralPalette.lightGlassBlur} !important;
    }
}
[data-admiral-nav-surface]::after {
    content: ""; display: block; position: absolute; inset: 0; border-radius: inherit;
    background: ${admiralPalette.panelGradient}; pointer-events: none;
    opacity: 0; transition: opacity .42s ease-in-out;
}
[data-admiral-nav-surface="blue"]::after, ${landed} [data-admiral-nav-surface="glass"]::after { opacity: 1; }
${landed} [data-admiral-nav-surface="glass"]::after { transition: none; }
${blueBar} [data-framer-name="Logo"] { filter: brightness(0) invert(1); }
${blueBar} [data-framer-name="Link"] .framer-text,
${blueBar} [data-framer-name="Links"] .framer-text,
${blueBar} [data-desktop-tour-menu-button] button { color: #fff !important; --framer-text-color: #fff; }
${blueBar} [data-framer-name="Mobile menu toggle"] { background: rgba(255,255,255,.12) !important; }

${blueBar} .admiral-frosted-button[data-appearance="blue"]:focus-visible { outline-color: white; }
@media (prefers-reduced-motion: reduce) {
    [data-admiral-nav-surface]::after, ${journey} ${navHost}, ${landing} ${navHost} { transition: none; }
}
@media (prefers-reduced-transparency: reduce) {
    [data-admiral-nav-surface="glass"] { background: ${admiralPalette.lightGlassFallback}; }
    ${handover} { background: var(--admiral-glass-fallback) !important; }
    ${glassBar}, ${handover} { -webkit-backdrop-filter: none !important; backdrop-filter: none !important; }
}
@media (forced-colors: active) {
    [data-admiral-nav-surface]::after { display: none; }
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
