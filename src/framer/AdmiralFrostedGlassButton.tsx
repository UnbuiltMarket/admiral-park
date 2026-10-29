// Generated from the shared frosted button CSS. No other Framer code file is required.
import * as React from "react"
import { addPropertyControls, ControlType } from "framer"

const FROSTED_BUTTON_DEFAULTS = {"tint":"#7395a0","text":"#183b43","fontSize":14,"letterSpacing":"-.015em"}
const FROSTED_BUTTON_CSS = "\n:where(.admiral-frosted-button) { min-height: 44px; padding: 10px 22px; font-size: 14px; }\n.admiral-frosted-button {\n  box-sizing: border-box;\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n  border: 1px solid #bdcfd3;\n  border-color: color-mix(in srgb, var(--frosted-button-tint, #7395a0) 42%, white);\n  border-radius: 999px;\n  background: linear-gradient(145deg, rgb(255 255 255 / 80%), rgb(255 255 255 / 14%) 55%, rgb(255 255 255 / 42%)), #dce6e8;\n  background: linear-gradient(145deg, rgb(255 255 255 / 80%), rgb(255 255 255 / 14%) 55%, rgb(255 255 255 / 42%)), color-mix(in srgb, var(--frosted-button-tint, #7395a0) 25%, rgb(255 255 255 / 68%));\n  color: var(--frosted-button-text, #183b43);\n  -webkit-backdrop-filter: blur(18px) saturate(115%);\n  backdrop-filter: blur(18px) saturate(115%);\n  box-shadow: inset 0 1px 1px rgb(255 255 255 / 95%), inset 0 -1px 0 rgb(24 59 67 / 9%), 0 3px 9px rgb(24 59 67 / 9%);\n  font-family: 'Montserrat', Arial, sans-serif;\n  font-size: 14px;\n  font-weight: 600;\n  letter-spacing: -.015em;\n  line-height: 1.3;\n  text-align: center;\n  text-decoration: none;\n  white-space: nowrap;\n  cursor: pointer;\n  touch-action: manipulation;\n  -webkit-tap-highlight-color: transparent;\n  transition: background .18s ease, border-color .18s ease, box-shadow .18s ease, transform .18s ease;\n}\n.admiral-frosted-button:focus-visible {\n  outline: 2px solid var(--frosted-button-text, #183b43);\n  outline-offset: 4px;\n  border-color: var(--frosted-button-tint, #7395a0);\n  box-shadow: inset 0 1px 1px white, 0 0 0 3px rgb(255 255 255 / 75%), 0 4px 12px rgb(24 59 67 / 15%);\n}\n@media (hover: hover) {\n  .admiral-frosted-button:not(:disabled):not([aria-disabled=\"true\"]):hover {\n    border-color: color-mix(in srgb, var(--frosted-button-tint, #7395a0) 70%, white);\n    background: linear-gradient(145deg, rgb(255 255 255 / 90%), rgb(255 255 255 / 28%) 55%, rgb(255 255 255 / 58%)), color-mix(in srgb, var(--frosted-button-tint, #7395a0) 33%, rgb(255 255 255 / 75%));\n    box-shadow: inset 0 1px 1px white, inset 0 -1px 0 rgb(24 59 67 / 10%), 0 5px 14px rgb(24 59 67 / 14%);\n  }\n}\n.admiral-frosted-button:not(:disabled):not([aria-disabled=\"true\"]):active { transform: translateY(1px); box-shadow: inset 0 1px 3px rgb(24 59 67 / 14%), 0 1px 3px rgb(24 59 67 / 7%); }\n.admiral-frosted-button:disabled, .admiral-frosted-button[aria-disabled=\"true\"] { opacity: .48; cursor: not-allowed; pointer-events: none; }\n@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {\n  .admiral-frosted-button { background: linear-gradient(145deg, rgb(255 255 255 / 60%), transparent 65%), #dce6e8; background: linear-gradient(145deg, rgb(255 255 255 / 60%), transparent 65%), color-mix(in srgb, var(--frosted-button-tint, #7395a0) 22%, white); }\n}\n@media (prefers-reduced-motion: reduce) {\n  .admiral-frosted-button { transition: none; }\n  .admiral-frosted-button:not(:disabled):not([aria-disabled=\"true\"]):active { transform: none; }\n}\n@media (prefers-reduced-transparency: reduce) {\n  .admiral-frosted-button, .admiral-frosted-button:not(:disabled):not([aria-disabled=\"true\"]):hover {\n    background: #dce6e8;\n    background: color-mix(in srgb, var(--frosted-button-tint, #7395a0) 20%, white);\n    -webkit-backdrop-filter: none; backdrop-filter: none;\n  }\n}\n@media (forced-colors: active) {\n  .admiral-frosted-button, .admiral-frosted-button:not(:disabled):not([aria-disabled=\"true\"]):hover {\n    border: 1px solid ButtonText; background: ButtonFace; color: ButtonText;\n    -webkit-backdrop-filter: none; backdrop-filter: none; box-shadow: none;\n  }\n  .admiral-frosted-button:focus-visible { outline-color: Highlight; }\n  .admiral-frosted-button:disabled, .admiral-frosted-button[aria-disabled=\"true\"] { border-color: GrayText; color: GrayText; opacity: 1; }\n}\n"

type FrostedGlassButtonProps = {
    text?: string
    link?: string
    openInNewTab?: boolean
    tint?: string
    textColor?: string
    disabled?: boolean
    width?: number
    height?: number
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
    const {text = "Érdeklődöm", link, openInNewTab = false, tint = FROSTED_BUTTON_DEFAULTS.tint, textColor = FROSTED_BUTTON_DEFAULTS.text, disabled = false, width = 180, height = 48, onTap, style} = props
    const href = frostedButtonLink(link)
    const label = text.trim() || "Érdeklődöm"
    const theme = {
        fontSize: FROSTED_BUTTON_DEFAULTS.fontSize, width, height, ...style,
        "--frosted-button-tint": tint, "--frosted-button-text": textColor,
    } as React.CSSProperties
    const activate = (event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
        if (disabled) { event.preventDefault(); event.stopPropagation(); return }
        onTap?.()
    }
    const content = <><style>{FROSTED_BUTTON_CSS}</style><span>{label}</span></>
    return href
        ? <a className="admiral-frosted-button" href={disabled ? undefined : href} role={disabled ? "link" : undefined} aria-disabled={disabled || undefined} tabIndex={disabled ? -1 : undefined} target={!disabled && openInNewTab ? "_blank" : undefined} rel={!disabled && openInNewTab ? "noopener noreferrer" : undefined} onClick={activate} style={theme}>{content}</a>
        : <button className="admiral-frosted-button" type="button" disabled={disabled} aria-disabled={disabled || undefined} onClick={activate} style={theme}>{content}</button>
}

AdmiralFrostedGlassButton.displayName = "Admiral Frosted Glass Button"
addPropertyControls(AdmiralFrostedGlassButton, {
    text: {type: ControlType.String, title: "Felirat", defaultValue: "Érdeklődöm"},
    link: {type: ControlType.Link, title: "Hivatkozás"},
    openInNewTab: {type: ControlType.Boolean, title: "Új lap", defaultValue: false, hidden: props => !props.link},
    tint: {type: ControlType.Color, title: "Üveg színe", defaultValue: FROSTED_BUTTON_DEFAULTS.tint},
    textColor: {type: ControlType.Color, title: "Szöveg színe", defaultValue: FROSTED_BUTTON_DEFAULTS.text},
    width: {type: ControlType.Number, title: "Szélesség", defaultValue: 180, min: 80, max: 640, step: 1, unit: "px"},
    height: {type: ControlType.Number, title: "Magasság", defaultValue: 48, min: 32, max: 120, step: 1, unit: "px"},
    disabled: {type: ControlType.Boolean, title: "Letiltva", defaultValue: false},
    onTap: {type: ControlType.EventHandler},
})
