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

export const admiralPalette = {
    accent,
    secondary,
    paper,
    onPanel: paper,
    panelGradient: admiralPanelGradient(secondary),
    lightGlass: "linear-gradient(118deg, rgba(255,255,255,.80), rgba(244,249,252,.64) 45%, rgba(226,238,247,.51))",
    lightGlassBlur: "blur(16px) saturate(116%)",
    lightGlassFallback: "#eff4f8",
    inquiryGradient: `linear-gradient(145deg, color-mix(in srgb, ${accent} 50%, #339de8), ${accent} 53%, color-mix(in srgb, ${accent} 65%, #001128))`,
} as const

interface SurfaceProps {
    tone?: "blue" | "glass"
    radius?: number
    style?: React.CSSProperties
}

const navbar = '[data-framer-name="Navbar"]'
const glassBar = navbar + ':has([data-admiral-nav-surface="glass"])'
const landed = ':root:has([data-admiral-homepage]:is([data-homepage-stage="handoff"],[data-homepage-stage="orbit"]))'
const blueBar = `:is(${navbar}:has([data-admiral-nav-surface="blue"]), ${landed} ${glassBar})`

const surfaceCSS = `
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
[data-admiral-nav-surface="blue"]::after, ${landed} [data-admiral-nav-surface="glass"]::after { opacity: 1; }
${blueBar} [data-framer-name="Logo"] { filter: brightness(0) invert(1); }
${blueBar} [data-framer-name="Link"] .framer-text,
${blueBar} [data-framer-name="Links"] .framer-text,
${blueBar} [data-desktop-tour-menu-button] button { color: #fff !important; --framer-text-color: #fff; }
${blueBar} [data-framer-name="Mobile menu toggle"] { background: rgba(255,255,255,.12) !important; }

${blueBar} .admiral-frosted-button[data-appearance="blue"] {
    color: ${admiralPalette.accent}; background: #fff; border-color: rgba(255,255,255,.94);
    box-shadow: inset 0 1px 0 #fff, 0 2px 8px rgba(8,36,58,.21);
}
@media (hover: hover) {
    ${blueBar} .admiral-frosted-button[data-appearance="blue"]:not(:disabled):not([aria-disabled="true"]):hover {
        color: ${admiralPalette.accent}; background: #eaf3fa; border-color: #fff;
        box-shadow: inset 0 1px 0 #fff, 0 3px 12px rgba(8,36,58,.32);
    }
}
${blueBar} .admiral-frosted-button[data-appearance="blue"]:active { background: #dbeaf5; }
${blueBar} .admiral-frosted-button[data-appearance="blue"]:focus-visible { outline: 2px solid white; outline-offset: 3px; }
@media (prefers-reduced-motion: reduce) { [data-admiral-nav-surface]::after { transition: none; } }
@media (prefers-reduced-transparency: reduce) {
    [data-admiral-nav-surface="glass"] { background: ${admiralPalette.lightGlassFallback}; }
    ${glassBar} { -webkit-backdrop-filter: none !important; backdrop-filter: none !important; }
}
@media (forced-colors: active) {
    [data-admiral-nav-surface]::after { display: none; }
    ${blueBar} .admiral-frosted-button[data-appearance="blue"] { color: ButtonText; background: ButtonFace; border-color: ButtonText; }
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
