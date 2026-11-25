import * as React from "react"
import type { ComponentType } from "react"

const desktopHeaders = "[data-framer-name=\"DESKTOP_LG\"],[data-framer-name=\"DESKTOP_W\"],[data-framer-name=\"Desktop · Filter Blue\"]"

const tourNavigationStyles = `
[data-admiral-tour-controller] { position:absolute!important; inset:0!important; width:100%!important; height:100%!important; pointer-events:none!important; z-index:5!important; overflow:visible!important; }
:is(${desktopHeaders}) > [data-framer-name="Navbar"] {
    --tour-wide-cta:142px;
    --tour-open-width:min(1100px,92%);
    --tour-compact-width:min(348px,92%);
    --tour-cta-width:110px;
    --tour-item-size:38px;
    --tour-logo-size:36px;
    position:relative!important; flex:none!important; align-self:center!important; margin-inline:auto!important; isolation:isolate;
    width:var(--tour-compact-width)!important; max-width:1100px!important; height:50px!important; padding:0!important; overflow:visible!important;
    transition:width 600ms cubic-bezier(.22,1,.36,1) 100ms,height 600ms cubic-bezier(.22,1,.36,1) 100ms!important;
}
:is(${desktopHeaders}) > [data-framer-name="Navbar"]:has(> [data-admiral-tour-controller][data-tour-open="true"]) {
    --tour-cta-width:var(--tour-wide-cta); --tour-item-size:44px; --tour-logo-size:44px;
    width:var(--tour-open-width)!important; height:60px!important;
    transition:width 650ms cubic-bezier(.22,1,.36,1),height 650ms cubic-bezier(.22,1,.36,1)!important;
}
:is(${desktopHeaders}) > [data-framer-name="Navbar"] > [data-framer-name="LOGO"] { position:absolute!important; left:16px!important; right:auto!important; top:50%!important; width:var(--tour-logo-size)!important; height:var(--tour-logo-size)!important; transform:translateY(-50%)!important; transition:width 550ms cubic-bezier(.22,1,.36,1),height 550ms cubic-bezier(.22,1,.36,1)!important; }
:is(${desktopHeaders}) > [data-framer-name="Navbar"] > [data-framer-name="LOGO"] > [data-framer-name="Logo"] { width:100%!important; height:100%!important; display:flex!important; align-items:center!important; justify-content:center!important; }
:is(${desktopHeaders}) > [data-framer-name="Navbar"] > [data-framer-name="Menu"] { position:absolute!important; right:8px!important; left:auto!important; top:50%!important; width:var(--tour-cta-width)!important; height:var(--tour-item-size)!important; transform:translateY(-50%)!important; transition:width 550ms cubic-bezier(.22,1,.36,1),height 550ms cubic-bezier(.22,1,.36,1)!important; }
:is(${desktopHeaders}) > [data-framer-name="Navbar"] > [data-framer-name="Menu"] .admiral-frosted-button { height:100%!important; width:100%!important; min-height:0!important; font-size:13px!important; padding:0 8px!important; }
:is(${desktopHeaders}) > [data-framer-name="Navbar"] [data-desktop-tour-menu-button] { width:100%!important; height:100%!important; }
:is(${desktopHeaders}) > [data-framer-name="Navbar"] > [data-framer-name="Tour menu toggle"] {
    position:absolute!important; left:50%!important; right:auto!important; top:50%!important;
    transform:translate(-50%,-50%)!important; width:68px!important; height:44px!important; flex:none!important; z-index:6!important;
    opacity:1; visibility:visible; transition:opacity 220ms ease 330ms,visibility 0s linear 330ms!important;
}
:is(${desktopHeaders}) > [data-framer-name="Navbar"]:has(> [data-admiral-tour-controller][data-tour-open="true"]) > [data-framer-name="Tour menu toggle"] { opacity:0; visibility:hidden; pointer-events:none; transition:opacity 120ms ease,visibility 0s linear 120ms!important; }
:is(${desktopHeaders}) > [data-framer-name="Navbar"] > [data-framer-name="Tour menu toggle"]:focus-within { opacity:1!important; transition:none!important; }

:is(${desktopHeaders}) > [data-framer-name="Navbar"] > [data-framer-name="Tour links"] { position:absolute!important; left:50%!important; right:auto!important; top:0!important; width:max-content!important; height:100%!important; padding:0!important; gap:clamp(10px,1.25vw,20px)!important; overflow:visible!important; opacity:0!important; visibility:hidden; pointer-events:none; transform:translate(-50%,6px)!important; transition:opacity 120ms ease,transform 180ms ease,visibility 0s linear 180ms; }
:is(${desktopHeaders}) > [data-framer-name="Navbar"]:has(> [data-admiral-tour-controller][data-tour-open="true"]) > [data-framer-name="Tour links"] { opacity:1!important; visibility:visible; pointer-events:auto; transform:translate(-50%,0)!important; transition:opacity 220ms ease 320ms,transform 320ms cubic-bezier(.22,1,.36,1) 320ms,visibility 0s; }
:is(${desktopHeaders}) > [data-framer-name="Navbar"] > [data-framer-name="Tour links"] > * { opacity:1; translate:none; scale:none; }
:is(${desktopHeaders}) > [data-framer-name="Navbar"]:has(> [data-admiral-tour-controller][data-tour-open="true"]) > [data-framer-name="Tour links"]:focus-within { transition-delay:0s!important; }
:is(${desktopHeaders}) > [data-framer-name="Navbar"] a[data-framer-page-link-current="true"] .framer-text,
:is(${desktopHeaders}) > [data-framer-name="Navbar"] a[aria-current="page"] .framer-text { font-weight:800!important; }

/* Follow the displayed frame of SEQ_02 in both directions. */
:is(${desktopHeaders}) > [data-framer-name="Navbar"]:has(> [data-admiral-tour-controller][data-tour-sequence="true"]) {
    --tour-link-fade-end:.45;
    --tour-link-progress:clamp(0,calc(var(--tour-close-progress,0) / var(--tour-link-fade-end)),1);
    --tour-toggle-opacity:clamp(0,calc((var(--tour-close-progress,0) - var(--tour-link-fade-end)) / .24),1);
    --tour-cta-width:calc((1 - var(--tour-close-progress,0)) * var(--tour-wide-cta) + var(--tour-close-progress,0) * 110px);
    --tour-logo-size:calc(44px - 8px * var(--tour-close-progress,0));
    --tour-item-size:calc(44px - 6px * var(--tour-close-progress,0));
    width:calc((1 - var(--tour-close-progress,0)) * var(--tour-open-width) + var(--tour-close-progress,0) * var(--tour-compact-width))!important;
    height:calc(60px - 10px * var(--tour-close-progress,0))!important;
    transition:none!important;
}
:is(${desktopHeaders}) > [data-framer-name="Navbar"]:has(> [data-admiral-tour-controller][data-tour-sequence="true"]) * { transition:none!important; animation:none!important; }
:is(${desktopHeaders}) > [data-framer-name="Navbar"]:has(> [data-admiral-tour-controller][data-tour-sequence="true"]) > [data-framer-name="Tour links"] { opacity:calc(1 - var(--tour-link-progress))!important; transform:translate(-50%,calc(6px * var(--tour-link-progress)))!important; }
:is(${desktopHeaders}) > [data-framer-name="Navbar"]:has(> [data-admiral-tour-controller][data-tour-sequence="true"]) > [data-framer-name="Tour menu toggle"] { opacity:var(--tour-toggle-opacity); }

:is(${desktopHeaders}) > [data-framer-name="Navbar"]:has(> [data-admiral-tour-controller][data-tour-interacted="false"]), :is(${desktopHeaders}) > [data-framer-name="Navbar"]:has(> [data-admiral-tour-controller][data-tour-interacted="false"]) * { transition:none!important; animation:none!important; }
@media(max-width:1050px) {
    :is(${desktopHeaders}) > [data-framer-name="Navbar"] { --tour-wide-cta:132px; }
    :is(${desktopHeaders}) > [data-framer-name="Navbar"]:has(> [data-admiral-tour-controller][data-tour-sequence="true"]) { --tour-link-fade-end:.20; }
    :is(${desktopHeaders}) > [data-framer-name="Navbar"] > [data-framer-name="Tour links"] { gap:10px!important; }
    :is(${desktopHeaders}) > [data-framer-name="Navbar"] > [data-framer-name="Tour links"] .framer-text { font-size:13px!important; }
}
/* Match the expanded navbar width on the list and 3D tour. */
@media(min-width:1250px) {
    :root:has([data-admiral-apartment-list="shared"]) :is(${desktopHeaders}) > [data-framer-name="Navbar"],
    :is(${desktopHeaders}) > [data-framer-name="Navbar"][data-tour-wide-open] {
        --tour-open-width:88vw;
        max-width:88vw!important;
    }
}

@media(prefers-reduced-motion:reduce) {
    :is(${desktopHeaders}) > [data-framer-name="Navbar"]:has(> [data-admiral-tour-controller][data-tour-open][data-tour-interacted]), :is(${desktopHeaders}) > [data-framer-name="Navbar"]:has(> [data-admiral-tour-controller][data-tour-open][data-tour-interacted]) *, :is(${desktopHeaders}) > [data-framer-name="Navbar"]:has(> [data-admiral-tour-controller][data-tour-open][data-tour-interacted]) *::before, :is(${desktopHeaders}) > [data-framer-name="Navbar"]:has(> [data-admiral-tour-controller][data-tour-open][data-tour-interacted]) *::after { transition:none!important; animation:none!important; }
}
`

export function withDesktopTourNavigation(Component: ComponentType<any>): ComponentType<any> {
    return React.forwardRef<HTMLElement, any>(function DesktopTourNavigation(props, forwardedRef) {
        const [open, setOpen] = React.useState(true)
        const [desktop, setDesktop] = React.useState(true)
        const [sequence, setSequence] = React.useState(false)
        const root = React.useRef<HTMLElement | null>(null)
        const focusFirst = React.useRef(false)
        const returnFocus = React.useRef(false)
        const interacted = React.useRef(false)
        const manualOpen = React.useRef(false)
        const cancelSequence = React.useRef<() => void>(() => {})
        const menuId = React.useId()
        const menuOpen = React.useRef(open)
        menuOpen.current = open
        const setRef = React.useCallback((node: HTMLElement | null) => {
            root.current = node
            if (typeof forwardedRef === "function") forwardedRef(node)
            else if (forwardedRef) forwardedRef.current = node
        }, [forwardedRef])
        const navbar = () => {
            const node = root.current
            if (!node?.closest(desktopHeaders) || !window.matchMedia("(min-width:810px)").matches) return null
            return node.parentElement
        }
        React.useEffect(() => {
            let frame: number | undefined
            const check = () => {
                const enabled = !!navbar()
                setDesktop(enabled)
                if (!enabled) { interacted.current = false; manualOpen.current = false; setSequence(false); setOpen(false) }
            }
            const resized = () => {
                check()
                if (frame !== undefined) cancelAnimationFrame(frame)
                frame = requestAnimationFrame(check)
            }
            resized()
            window.addEventListener("resize", resized, { passive: true })
            return () => {
                window.removeEventListener("resize", resized)
                if (frame !== undefined) cancelAnimationFrame(frame)
            }
        }, [])
        React.useEffect(() => {
            const links = navbar()?.querySelector<HTMLElement>('[data-framer-name="Tour links"]')
            if (!links) return
            const oldId = links.id, oldHidden = links.getAttribute("aria-hidden"), oldInert = links.inert
            links.id = menuId
            links.inert = !open
            links.setAttribute("aria-hidden", String(!open))
            const nav = navbar()
            nav?.dispatchEvent(new CustomEvent("admiral:tour-menu-state", { detail: { open, menuId } }))
            let frame: number | undefined
            if (open && focusFirst.current) {
                focusFirst.current = false
                frame = requestAnimationFrame(() => links.querySelector<HTMLElement>('a[href],button')?.focus({ preventScroll: true }))
            } else if (!open && returnFocus.current) {
                returnFocus.current = false
                frame = requestAnimationFrame(() => nav?.querySelector<HTMLButtonElement>(".admiral-tour-toggle")?.focus({ preventScroll: true }))
            }
            return () => {
                if (frame !== undefined) cancelAnimationFrame(frame)
                links.id = oldId
                links.inert = oldInert
                if (oldHidden === null) links.removeAttribute("aria-hidden")
                else links.setAttribute("aria-hidden", oldHidden)
            }
        }, [open, menuId, desktop])
        React.useEffect(() => {
            const nav = navbar()
            if (!open || !desktop || !nav) return
            const outside = (event: PointerEvent) => {
                // Story navigation stays open until its planned camera boundary.
                // An explicitly reopened menu still dismisses on an outside click.
                if (manualOpen.current && event.target instanceof Node && !nav.contains(event.target)) {
                    cancelSequence.current()
                    manualOpen.current = false
                    interacted.current = true
                    setOpen(false)
                }
            }
            const key = (event: KeyboardEvent) => {
                if (event.key === "Escape" && manualOpen.current && nav.contains(document.activeElement)) {
                    cancelSequence.current()
                    manualOpen.current = false
                    interacted.current = true
                    setOpen(false)
                    returnFocus.current = true
                }
            }
            document.addEventListener("pointerdown", outside, true)
            document.addEventListener("keydown", key)
            return () => {
                document.removeEventListener("pointerdown", outside, true)
                document.removeEventListener("keydown", key)
            }
        }, [open, desktop])
        React.useEffect(() => {
            const nav = navbar()
            if (!desktop || !nav) return
            const change = (event: Event) => {
                if (menuOpen.current) return
                const detail = (event as CustomEvent<{ keyboard?: boolean }>).detail
                cancelSequence.current()
                interacted.current = true
                manualOpen.current = true
                focusFirst.current = !!detail?.keyboard
                setOpen(true)
            }
            nav.addEventListener("admiral:tour-menu-toggle", change)
            return () => nav.removeEventListener("admiral:tour-menu-toggle", change)
        }, [desktop])
        // SEQ_02 supplies the actual rendered progress. Only the CSS number
        // changes per frame; React updates at entry/exit and link-focus thresholds.
        React.useEffect(() => {
            const nav = navbar()
            if (!desktop || !nav) return
            const selector = "[data-admiral-homepage][data-homepage-stage]"
            const sequenceSelector = "[data-admiral-sequence]"
            const narrow = window.matchMedia("(max-width:1050px)")
            const oldProgress = nav.style.getPropertyValue("--tour-close-progress")
            const oldWideOpen = nav.hasAttribute("data-tour-wide-open")
            let hero: HTMLElement | null = null, sequenceRoot: HTMLElement | null = null
            let zone: "expanded" | "connection" | "compact" | null = null
            let lastStage = "", pathname = window.location.pathname
            let applied = false, alive = true, following = false, manualConnection = false
            let waitingFresh = false, writtenProgress = ""
            let frame: number | undefined, progressFrame: number | undefined
            let stageObserver: MutationObserver | null = null, progressObserver: MutationObserver | null = null
            const visibleHero = () => Array.from(document.querySelectorAll<HTMLElement>(selector))
                .reverse().find((element) => {
                    if (!element.isConnected || !element.getClientRects().length) return false
                    const style = getComputedStyle(element)
                    return style.display !== "none" && style.visibility !== "hidden" && style.opacity !== "0"
                }) || null
            const semantic = (expanded: boolean) => {
                if (menuOpen.current === expanded) return
                menuOpen.current = expanded
                focusFirst.current = false
                if (!expanded) {
                    const links = nav.querySelector<HTMLElement>('[data-framer-name="Tour links"]')
                    if (links?.contains(document.activeElement)) {
                        returnFocus.current = true
                    }
                }
                setOpen(expanded)
            }
            const disconnectProgress = () => {
                following = false
                progressObserver?.disconnect()
                progressObserver = null
                sequenceRoot = null
                if (progressFrame !== undefined) cancelAnimationFrame(progressFrame)
                progressFrame = undefined
            }
            const stop = () => { disconnectProgress(); setSequence(false) }
            const manualCancel = () => {
                if (zone === "connection") manualConnection = true
                stop()
            }
            cancelSequence.current = manualCancel
            const apply = (expanded: boolean) => {
                disconnectProgress()
                // Hold both exact endpoints outside SEQ_02. Batched endpoint
                // progress + stage changes must not leave a trailing CSS tween.
                const endpoint = expanded ? "0" : "1"
                nav.style.setProperty("--tour-close-progress", endpoint)
                writtenProgress = endpoint
                setSequence(true)
                manualOpen.current = false
                focusFirst.current = false
                if (applied) interacted.current = true
                semantic(expanded)
                applied = true
            }
            const paintProgress = () => {
                progressFrame = undefined
                if (!alive || !following || !hero?.isConnected || !sequenceRoot?.isConnected) return
                const raw = Number.parseFloat(sequenceRoot.dataset.progress || "0")
                let progress = Number.isFinite(raw) ? Math.max(0, Math.min(1, raw)) : 0
                const activeSequence = hero.dataset.activeSequence
                if (activeSequence && activeSequence !== "SEQ_02") progress = 0
                // A known story-to-connection entry can briefly retain SEQ_01's
                // arrival attributes if the connector has not published yet.
                if (waitingFresh) {
                    if (progress < 1 || sequenceRoot.dataset.sequenceState !== "arrival") waitingFresh = false
                    else progress = 0
                }
                const value = progress.toFixed(5)
                if (value !== writtenProgress) {
                    writtenProgress = value
                    nav.style.setProperty("--tour-close-progress", value)
                }
                // Match the CSS link fade endpoint; never leave invisible links
                // focusable while the remaining bar is still shrinking.
                semantic(progress < (narrow.matches ? .20 : .45))
            }
            const scheduleProgress = () => {
                if (alive && following && progressFrame === undefined) progressFrame = requestAnimationFrame(paintProgress)
            }
            const follow = (freshEntry: boolean) => {
                const child = hero?.querySelector<HTMLElement>(sequenceSelector) || null
                if (following && child === sequenceRoot) { paintProgress(); return }
                progressObserver?.disconnect()
                sequenceRoot = child
                following = true
                waitingFresh = freshEntry && child?.dataset.progress === "1" && child.dataset.sequenceState === "arrival"
                writtenProgress = ""
                manualOpen.current = false
                focusFirst.current = false
                if (applied) interacted.current = true
                setSequence(true)
                if (sequenceRoot && typeof MutationObserver !== "undefined") {
                    progressObserver = new MutationObserver((records) => {
                        if (records.some((record) => record.oldValue !== sequenceRoot?.getAttribute(record.attributeName || ""))) scheduleProgress()
                    })
                    progressObserver.observe(sequenceRoot, { attributes: true, attributeOldValue: true,
                        attributeFilter: ["data-progress", "data-sequence-state"] })
                }
                if (!sequenceRoot) {
                    nav.style.setProperty("--tour-close-progress", "0")
                    semantic(true)
                } else paintProgress()
                applied = true
            }
            const discover = () => {
                frame = undefined
                if (!alive || !navbar()) return
                pathname = window.location.pathname
                const candidate = visibleHero(), replaced = candidate !== hero
                if (replaced) {
                    stageObserver?.disconnect()
                    hero = candidate
                    if (hero && typeof MutationObserver !== "undefined") {
                        stageObserver = new MutationObserver(schedule)
                        stageObserver.observe(hero, { attributes: true,
                            attributeFilter: ["data-homepage-stage", "data-active-sequence"] })
                    }
                }
                const page = pathname.replace(/\/+$/, "")
                const isIntroduction = page === "/bemutato-draft"
                const keepOpen = page === "" || page === "/homepage-draft-3" || isIntroduction
                nav.toggleAttribute("data-tour-wide-open", keepOpen)
                const stage = hero?.dataset.homepageStage || ""
                const nextZone = keepOpen ? "expanded"
                    : stage === "connection" ? "connection"
                    : stage === "handoff" || stage === "orbit" ? "compact" : "expanded"
                const openingReset = stage === "opening" && lastStage !== "" && lastStage !== "opening"
                const freshConnection = applied && !replaced && zone === "expanded" && nextZone === "connection"
                lastStage = stage
                if (!applied || replaced || nextZone !== zone || openingReset || (isIntroduction && !menuOpen.current)) {
                    zone = nextZone
                    manualConnection = false
                    if (zone === "connection") follow(freshConnection)
                    else apply(zone === "expanded")
                } else if (zone === "connection" && !manualConnection) {
                    follow(false)
                }
            }
            const schedule = () => {
                if (alive && frame === undefined) frame = requestAnimationFrame(discover)
            }
            const containsHero = (node: Node) => node instanceof Element &&
                (node.matches(selector) || !!node.querySelector(selector))
            const containsSequence = (node: Node) => node instanceof Element &&
                (node.matches(sequenceSelector) || !!node.querySelector(sequenceSelector))
            const pageObserver = typeof MutationObserver === "undefined" ? null : new MutationObserver((records) => {
                if (pathname !== window.location.pathname || (hero && !hero.isConnected) ||
                    (following && sequenceRoot && !sequenceRoot.isConnected) || records.some((record) =>
                    Array.from(record.addedNodes).some(containsHero) || Array.from(record.removedNodes).some(containsHero) ||
                    (zone === "connection" && Array.from(record.addedNodes).some(containsSequence)))) schedule()
            })
            if (document.body) pageObserver?.observe(document.body, { childList: true, subtree: true })
            window.addEventListener("resize", schedule, { passive: true })
            window.addEventListener("popstate", schedule)
            window.addEventListener("pageshow", schedule)
            document.addEventListener("visibilitychange", schedule)
            discover()
            return () => {
                alive = false
                if (frame !== undefined) cancelAnimationFrame(frame)
                if (progressFrame !== undefined) cancelAnimationFrame(progressFrame)
                stageObserver?.disconnect()
                progressObserver?.disconnect()
                pageObserver?.disconnect()
                nav.toggleAttribute("data-tour-wide-open", oldWideOpen)
                if (oldProgress) nav.style.setProperty("--tour-close-progress", oldProgress)
                else nav.style.removeProperty("--tour-close-progress")
                if (cancelSequence.current === manualCancel) cancelSequence.current = () => {}
                window.removeEventListener("resize", schedule)
                window.removeEventListener("popstate", schedule)
                window.removeEventListener("pageshow", schedule)
                document.removeEventListener("visibilitychange", schedule)
            }
        }, [desktop])
        return (
            <Component
                {...props}
                ref={setRef}
                data-admiral-tour-controller=""
                data-tour-open={String(open)}
                data-tour-interacted={String(interacted.current)}
                data-tour-sequence={String(sequence)}
                style={{ ...props.style, position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 5 }}
            >
                {props.children}
                <style dangerouslySetInnerHTML={{ __html: tourNavigationStyles }} />
            </Component>
        )
    })
}
