import * as React from "react"
import type { ComponentType } from "react"

// Framer updates its current-page marker during client-side navigation.
// Preserve current-page weight in desktop and liquid-glass mobile variants.
const desktopVariant = "[data-framer-name=\"DESKTOP_W\"],[data-framer-name=\"DESKTOP_LG\"],[data-framer-name=\"Desktop · Filter Blue\"]"
const mobileVariants = '[data-framer-name="MOBILE_LG"],[data-framer-name="MOBILE_LG_OPEN"],[data-framer-name="Mobile · Filter Blue"],[data-framer-name="Mobile · Filter Blue Open"]'

const desktopLinkSlot = `:is(${desktopVariant}) [data-framer-name="Tour links"] > [data-framer-name="Link"][data-admiral-nav-slot]`

const currentPageStyle = `
:is(${desktopVariant},${mobileVariants}) a[data-framer-page-link-current="true"] .framer-text,
:is(${desktopVariant},${mobileVariants}) a[aria-current="page"] .framer-text {
    font-weight: 800 !important;
}

${desktopLinkSlot} {
    flex: none !important;
    width: var(--admiral-nav-slot-width) !important;
}

/* Framer swaps which label is in flow. Both layers keep the same text center
   as the slot while their existing vertical positions animate. */
${desktopLinkSlot} > div,
${desktopLinkSlot} a,
${desktopLinkSlot} a > [data-framer-component-type="RichTextContainer"] {
    width: 100% !important;
}
${desktopLinkSlot} a > [data-framer-component-type="RichTextContainer"] {
    left: 0 !important;
}
${desktopLinkSlot} a > [data-framer-component-type="RichTextContainer"] > .framer-text {
    text-align: center !important;
}
`

const desktopSlotWidth = "--admiral-nav-slot-width"

function reserveDesktopLinkWidths(menu: HTMLElement) {
    if (!menu.closest(desktopVariant) || menu.dataset.framerName !== "Tour links") return

    // Framer slides between a light and a bold copy of the label. Let the
    // outer slot reserve the bolder copy without changing the swipe animation.
    const ruler = document.createElement("span")
    ruler.setAttribute("aria-hidden", "true")
    ruler.style.cssText = "position:fixed;top:0;left:0;visibility:hidden;pointer-events:none;white-space:pre;"
    document.body.appendChild(ruler)
    const slots = new Set<HTMLElement>()
    let frame: number | undefined
    let mounted = true

    const reserve = () => {
        frame = undefined
        const links = Array.from(menu.querySelectorAll<HTMLElement>(':scope > [data-framer-name="Link"]'))
        for (const slot of links) {
            let width = 0
            const labels = Array.from(slot.querySelectorAll<HTMLElement>("p.framer-text, span.framer-text"))
            for (const label of labels) {
                const text = label.textContent?.trim()
                if (!text) continue
                const font = getComputedStyle(label)
                ruler.style.fontFamily = font.fontFamily
                ruler.style.fontSize = font.fontSize
                ruler.style.fontStyle = font.fontStyle
                ruler.style.fontStretch = font.fontStretch
                ruler.style.letterSpacing = font.letterSpacing
                ruler.style.textTransform = font.textTransform
                ruler.style.fontWeight = "800"
                ruler.textContent = text
                width = Math.max(width, ruler.getBoundingClientRect().width)
            }
            if (!width) continue
            const value = Math.ceil(width) + "px"
            if (slot.style.getPropertyValue(desktopSlotWidth) !== value) {
                slot.style.setProperty(desktopSlotWidth, value)
                slot.dataset.admiralNavSlot = ""
            }
            slots.add(slot)
        }
        ruler.textContent = ""
    }
    const schedule = () => {
        if (mounted && frame === undefined) frame = requestAnimationFrame(reserve)
    }
    const labels = new MutationObserver(schedule)
    labels.observe(menu, { childList: true, characterData: true, subtree: true })
    window.addEventListener("resize", schedule, { passive: true })
    document.fonts?.ready.then(schedule)
    document.fonts?.addEventListener("loadingdone", schedule)
    reserve()

    return () => {
        mounted = false
        labels.disconnect()
        if (frame !== undefined) cancelAnimationFrame(frame)
        window.removeEventListener("resize", schedule)
        document.fonts?.removeEventListener("loadingdone", schedule)
        ruler.remove()
        for (const slot of slots) {
            slot.style.removeProperty(desktopSlotWidth)
            delete slot.dataset.admiralNavSlot
        }
    }
}

const useClientLayoutEffect = typeof window === "undefined" ? React.useEffect : React.useLayoutEffect

export function withDesktopWCurrentPage(Component: ComponentType<any>): ComponentType<any> {
    return React.forwardRef<HTMLElement, any>(function DesktopWCurrentPage(props, forwardedRef) {
        const menu = React.useRef<HTMLElement | null>(null)
        const setMenuRef = React.useCallback((node: HTMLElement | null) => {
            menu.current = node
            if (typeof forwardedRef === "function") forwardedRef(node)
            else if (forwardedRef) forwardedRef.current = node
        }, [forwardedRef])
        useClientLayoutEffect(() => {
            const style = document.createElement("style")
            style.textContent = currentPageStyle
            document.head.appendChild(style)
            const resetWidths = menu.current && reserveDesktopLinkWidths(menu.current)
            return () => {
                resetWidths?.()
                style.remove()
            }
        }, [])
        return <Component {...props} ref={setMenuRef} />
    })
}
