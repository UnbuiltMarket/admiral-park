import * as React from "react"
import type { ComponentType } from "react"

// Framer updates its current-page marker during client-side navigation.
// Preserve current-page weight in both desktop navbar variants.
const currentPageStyle = `
:is([data-framer-name="DESKTOP_W"], [data-framer-name="DESKTOP_LG"]) a[data-framer-page-link-current="true"] .framer-text,
:is([data-framer-name="DESKTOP_W"], [data-framer-name="DESKTOP_LG"]) a[aria-current="page"] .framer-text {
    font-weight: 800 !important;
}
`

export function withDesktopWCurrentPage(Component: ComponentType<any>): ComponentType<any> {
    return React.forwardRef<any, any>(function DesktopWCurrentPage(props, ref) {
        React.useEffect(() => {
            const style = document.createElement("style")
            style.textContent = currentPageStyle
            document.head.appendChild(style)
            return () => style.remove()
        }, [])
        return <Component {...props} ref={ref} />
    })
}
