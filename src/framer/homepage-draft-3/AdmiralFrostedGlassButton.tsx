import { admiralPalette } from "./AdmiralPalette.tsx"
import * as React from "react"
import { addPropertyControls, ControlType } from "framer"

/** Keep CSS raw text identical between React SSR and client hydration. */
function frostedStyleMarkup(css: string): { __html: string } {
    return { __html: css.replace(/<\/style/gi, "<\\/style") }
}

const FROSTED_BUTTON_DEFAULTS = {"tint":"#7395a0","text":"#183b43","fontSize":14,"letterSpacing":"-.015em"}
const FROSTED_BUTTON_CSS = `
:where(.admiral-frosted-button) { min-height: 44px; padding: 10px 22px; font-size: 14px; }
.admiral-frosted-button {
  box-sizing: border-box;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: 1px solid #bdcfd3;
  border-color: color-mix(in srgb, var(--frosted-button-tint, #7395a0) 42%, white);
  border-radius: 999px;
  background: linear-gradient(145deg, rgb(255 255 255 / 80%), rgb(255 255 255 / 14%) 55%, rgb(255 255 255 / 42%)), #dce6e8;
  background: linear-gradient(145deg, rgb(255 255 255 / 80%), rgb(255 255 255 / 14%) 55%, rgb(255 255 255 / 42%)), color-mix(in srgb, var(--frosted-button-tint, #7395a0) 25%, rgb(255 255 255 / 68%));
  color: var(--frosted-button-text, #183b43);
  -webkit-backdrop-filter: blur(18px) saturate(115%);
  backdrop-filter: blur(18px) saturate(115%);
  box-shadow: inset 0 1px 1px rgb(255 255 255 / 95%), inset 0 -1px 0 rgb(24 59 67 / 9%), 0 3px 9px rgb(24 59 67 / 9%);
  font-family: 'Montserrat', Arial, sans-serif;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: -.015em;
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
  outline: 2px solid var(--frosted-button-text, #183b43);
  outline-offset: 4px;
  border-color: var(--frosted-button-tint, #7395a0);
  box-shadow: inset 0 1px 1px white, 0 0 0 3px rgb(255 255 255 / 75%), 0 4px 12px rgb(24 59 67 / 15%);
}
@media (hover: hover) {
  .admiral-frosted-button:not(:disabled):not([aria-disabled="true"]):hover {
    border-color: color-mix(in srgb, var(--frosted-button-tint, #7395a0) 70%, white);
    background: linear-gradient(145deg, rgb(255 255 255 / 90%), rgb(255 255 255 / 28%) 55%, rgb(255 255 255 / 58%)), color-mix(in srgb, var(--frosted-button-tint, #7395a0) 33%, rgb(255 255 255 / 75%));
    box-shadow: inset 0 1px 1px white, inset 0 -1px 0 rgb(24 59 67 / 10%), 0 5px 14px rgb(24 59 67 / 14%);
  }
}
.admiral-frosted-button:not(:disabled):not([aria-disabled="true"]):active { transform: translateY(1px); box-shadow: inset 0 1px 3px rgb(24 59 67 / 14%), 0 1px 3px rgb(24 59 67 / 7%); }
.admiral-frosted-button:disabled, .admiral-frosted-button[aria-disabled="true"] { opacity: .48; cursor: not-allowed; pointer-events: none; }
@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
  .admiral-frosted-button { background: linear-gradient(145deg, rgb(255 255 255 / 60%), transparent 65%), #dce6e8; background: linear-gradient(145deg, rgb(255 255 255 / 60%), transparent 65%), color-mix(in srgb, var(--frosted-button-tint, #7395a0) 22%, white); }
}
@media (prefers-reduced-motion: reduce) {
  .admiral-frosted-button { transition: none; }
  .admiral-frosted-button:not(:disabled):not([aria-disabled="true"]):active { transform: none; }
}
@media (prefers-reduced-transparency: reduce) {
  .admiral-frosted-button, .admiral-frosted-button:not(:disabled):not([aria-disabled="true"]):hover {
    background: #dce6e8;
    background: color-mix(in srgb, var(--frosted-button-tint, #7395a0) 20%, white);
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

/* Opt-in blue inquiry CTA. Ordinary glass buttons retain their original theme. */
.admiral-frosted-button[data-appearance="blue"] {
  border-color: ${admiralPalette.inquiryRim};
  background: linear-gradient(145deg, #2477b6, #145083 53%, #0d3a63);
  background: ${admiralPalette.inquiryGradient};
  color: #fff;
  -webkit-backdrop-filter: none;
  backdrop-filter: none;
  box-shadow: ${admiralPalette.inquiryShadow};
}
.admiral-frosted-button[data-appearance="blue"]:focus-visible {
  outline: 2px solid #438dd3;
  outline-offset: 3px;
  box-shadow: inset 0 1px 1px rgb(220 240 255 / 32%), 0 0 0 2px rgb(255 255 255 / 88%), 0 5px 14px rgb(14 53 82 / 32%);
}
@media (hover: hover) {
  .admiral-frosted-button[data-appearance="blue"]:not(:disabled):not([aria-disabled="true"]):hover {
    border-color: #6fa9db;
    background: linear-gradient(145deg, #1d537e, #113b64 53%, #0c294b);
    color: #fff;
    box-shadow: inset 0 1px 1px rgb(230 244 255 / 45%), 0 0 0 2px rgb(91 155 219 / 24%), 0 6px 16px rgb(10 44 79 / 38%);
  }
}
.admiral-frosted-button[data-appearance="blue"]:not(:disabled):not([aria-disabled="true"]):active {
  background: #103654;
  box-shadow: inset 0 2px 4px rgb(3 20 36 / 28%), 0 1px 3px rgb(14 53 82 / 20%);
}
@media (forced-colors: active) {
  .admiral-frosted-button[data-appearance="blue"],
  .admiral-frosted-button[data-appearance="blue"]:not(:disabled):not([aria-disabled="true"]):hover,
  .admiral-frosted-button[data-appearance="blue"]:not(:disabled):not([aria-disabled="true"]):active {
    border: 1px solid ButtonText; background: ButtonFace; color: ButtonText; box-shadow: none;
  }
  .admiral-frosted-button[data-appearance="blue"]:focus-visible { outline-color: Highlight; }
  .admiral-frosted-button[data-appearance="blue"]:disabled,
  .admiral-frosted-button[data-appearance="blue"][aria-disabled="true"] { border-color: GrayText; color: GrayText; }
}
`

export const admiralButtonStyleMarkup = frostedStyleMarkup(FROSTED_BUTTON_CSS)

type FrostedGlassButtonProps = {
    appearance?: "glass" | "blue"
    text?: string
    link?: string
    openInNewTab?: boolean
    tint?: string
    textColor?: string
    disabled?: boolean
    width?: number
    height?: number
    fitHeight?: boolean
    onTap?: () => void
    style?: React.CSSProperties
}
function frostedButtonLink(value?: string): string | undefined {
    if (typeof value !== "string" || !value.trim()) return undefined
    try {
        const resolved = new URL(value.trim(), typeof window === "undefined" ? "https://admiral.invalid/" : window.location.href)
        return ["http:", "https:", "mailto:", "tel:"].includes(resolved.protocol) ? value.trim() : undefined
    } catch { return undefined }
}

/**
 * @framerSupportedLayoutWidth any-prefer-fixed
 * @framerSupportedLayoutHeight any-prefer-fixed
 * @framerIntrinsicWidth 180
 * @framerIntrinsicHeight 48
 */
export default function AdmiralFrostedGlassButton(props: FrostedGlassButtonProps): React.JSX.Element {
    const {appearance = "glass", text = "Érdeklődöm", link, openInNewTab = false, tint = FROSTED_BUTTON_DEFAULTS.tint, textColor = FROSTED_BUTTON_DEFAULTS.text, disabled = false, width = 180, height = 48, fitHeight = false, onTap, style} = props
    const href = frostedButtonLink(link)
    const label = text.trim() || "Érdeklődöm"
    const theme = {
        fontSize: FROSTED_BUTTON_DEFAULTS.fontSize, width, height, ...style,
        ...(fitHeight ? { height: "100%", minHeight: 0, maxHeight: "100%", padding: "0 14px", containerType: "size" } : {}),
        "--frosted-button-tint": tint, "--frosted-button-text": textColor,
    } as React.CSSProperties
    const activate = (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
        if (disabled) { event.preventDefault(); event.stopPropagation(); return }
        onTap?.()
    }
    const content = <><style dangerouslySetInnerHTML={admiralButtonStyleMarkup} /><span style={fitHeight ? { fontSize: "clamp(10px,42cqh,14px)" } : undefined}>{label}</span></>
    return href
        ? <a className="admiral-frosted-button" data-appearance={appearance} href={disabled ? undefined : href} role={disabled ? "link" : undefined} aria-disabled={disabled || undefined} tabIndex={disabled ? -1 : undefined} target={!disabled && openInNewTab ? "_blank" : undefined} rel={!disabled && openInNewTab ? "noopener noreferrer" : undefined} onClick={activate} style={theme}>{content}</a>
        : <button className="admiral-frosted-button" data-appearance={appearance} type="button" disabled={disabled} aria-disabled={disabled || undefined} onClick={activate} style={theme}>{content}</button>
}

AdmiralFrostedGlassButton.displayName = "Admiral Frosted Glass Button"
addPropertyControls(AdmiralFrostedGlassButton, {
    appearance: {type: ControlType.Enum, title: "Megjelenés", options: ["glass", "blue"], optionTitles: ["Üveg", "Kék CTA"], defaultValue: "glass", description: "Kék CTA: mély kék érdeklődés gomb, fehér felirattal és kontrasztos hover állapottal. A gomb mérete és linkje változatlan."},
    text: {type: ControlType.String, title: "Felirat", defaultValue: "Érdeklődöm"},
    link: {type: ControlType.Link, title: "Hivatkozás"},
    openInNewTab: {type: ControlType.Boolean, title: "Új lap", defaultValue: false, hidden: props => !props.link},
    tint: {type: ControlType.Color, title: "Üveg színe", defaultValue: FROSTED_BUTTON_DEFAULTS.tint, hidden: props => props.appearance === "blue"},
    textColor: {type: ControlType.Color, title: "Szöveg színe", defaultValue: FROSTED_BUTTON_DEFAULTS.text, hidden: props => props.appearance === "blue"},
    width: {type: ControlType.Number, title: "Szélesség", defaultValue: 180, min: 80, max: 640, step: 1, unit: "px"},
    fitHeight: {type: ControlType.Boolean, title: "Magasság kitöltés", defaultValue: false, description: "A gomb a szülő keret magasságához igazodik. A réteg magasságát állítsa Fill értékre."},
    height: {type: ControlType.Number, title: "Magasság", defaultValue: 48, min: 32, max: 120, step: 1, unit: "px", hidden: props => !!props.fitHeight},
    disabled: {type: ControlType.Boolean, title: "Letiltva", defaultValue: false},
    onTap: {type: ControlType.EventHandler},
})
