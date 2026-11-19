import * as React from "react"
import type { ComponentType } from "react"

// Applied to the native stack running from Helyszín through the homepage footer.
export function withHomepageArticleNavigation(Component: ComponentType<any>): ComponentType<any> {
    return React.forwardRef<HTMLElement, any>(function HomepageArticleNavigation(props, forwardedRef) {
        const article = React.useRef<HTMLElement | null>(null)
        const [reading, setReading] = React.useState(false)
        const setRef = React.useCallback((node: HTMLElement | null) => {
            article.current = node
            if (typeof forwardedRef === "function") forwardedRef(node)
            else if (forwardedRef) forwardedRef.current = node
        }, [forwardedRef])

        React.useEffect(() => {
            const node = article.current
            if (!node) return
            let observer: IntersectionObserver | undefined
            const hasObserver = typeof IntersectionObserver !== "undefined"

            // Observe just the first pixel of the viewport. Reading stays active
            // through every chapter, even if the user jumps directly to the footer.
            const measure = () => {
                const rect = node.getBoundingClientRect()
                setReading(rect.width > 0 && rect.height > 0 && rect.top <= 1 && rect.bottom >= 0)
            }
            const observe = () => {
                observer?.disconnect()
                measure()
                if (!hasObserver) return
                const inset = Math.max(0, document.documentElement.clientHeight - 1)
                observer = new IntersectionObserver(([entry]) => {
                    if (entry) setReading(entry.isIntersecting && entry.boundingClientRect.width > 0 && entry.boundingClientRect.height > 0)
                }, { rootMargin: `0px 0px -${inset}px 0px` })
                observer.observe(node)
            }
            observe()
            window.addEventListener("resize", observe)
            window.addEventListener("pageshow", observe)
            if (!hasObserver) window.addEventListener("scroll", measure, { passive: true })
            return () => {
                observer?.disconnect()
                window.removeEventListener("resize", observe)
                window.removeEventListener("pageshow", observe)
                if (!hasObserver) window.removeEventListener("scroll", measure)
            }
        }, [])

        return <Component {...props} ref={setRef} data-admiral-reading-article={reading || undefined} />
    })
}
