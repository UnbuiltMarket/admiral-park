// Generated from the shared frosted button CSS. No other Framer code file is required.
import * as React from "react"
import { addPropertyControls, ControlType } from "framer"

// @FROSTED_BUTTON_CSS_INSERT

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
    const {text = "Érdeklődöm", link, openInNewTab = false, tint = "#7395a0", textColor = "#183b43", disabled = false, width = 180, height = 48, onTap, style} = props
    const href = frostedButtonLink(link)
    const label = text.trim() || "Érdeklődöm"
    const theme = {
        fontSize: 15, width, height, ...style,
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
    tint: {type: ControlType.Color, title: "Üveg színe", defaultValue: "#7395a0"},
    textColor: {type: ControlType.Color, title: "Szöveg színe", defaultValue: "#183b43"},
    width: {type: ControlType.Number, title: "Szélesség", defaultValue: 180, min: 80, max: 640, step: 1, unit: "px"},
    height: {type: ControlType.Number, title: "Magasság", defaultValue: 48, min: 32, max: 120, step: 1, unit: "px"},
    disabled: {type: ControlType.Boolean, title: "Letiltva", defaultValue: false},
    onTap: {type: ControlType.EventHandler},
})
