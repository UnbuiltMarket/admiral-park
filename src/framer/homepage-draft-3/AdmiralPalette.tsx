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
    inquiryGradient: `linear-gradient(145deg, color-mix(in srgb, ${accent} 50%, #339de8), ${accent} 53%, color-mix(in srgb, ${accent} 65%, #001128))`,
} as const
