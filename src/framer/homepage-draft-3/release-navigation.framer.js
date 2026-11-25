// Promote the active Admiral Park page and repair shared navigation on the review build.
{
    const { tree } = api
    const home = "Phxhru9uu"
    const holding = "augiA20Il"
    const active = tree.get(home)
    if (active?.path === "/homepage-draft-3" && tree.get(holding)?.path === "/") {
        tree.changeHomePage({ newPage: home, oldHomePagePath: "/elozetes" })
    }
    if (tree.get(home)?.path !== "/") throw new Error("Active homepage route was not promoted")
    tree.patch(holding, { draft: true, "metadata.noIndex": true })
    for (const id of ["s88nk7y5V", "TkpIndvEQ"]) {
        tree.patch(id, { draft: true, "metadata.noIndex": true })
    }

    for (const from of ["/homepage-draft-3", "/homepage-draft"]) {
        const existing = tree.getNodesOfTypes("RedirectNode").find(node => node.from === from)
        if (existing) tree.patch(existing.id, { to: "/" })
        else tree.insert("RedirectNode", `admiral-redirect-${from.slice(1)}`, { parent: tree.root, from, to: "/" })
    }

    const description = "Fedezze fel az Admiral Park balatonfüredi lakásait az Aranyhíd sétányon, a 3D lakáskeresőben és a lakáslistában."
    tree.patch(tree.root.id, { "metadata.description": description })
    const pages = [
        [home, "Kezdőlap", "Admiral Park Balatonfüred – Lakások az Aranyhíd sétányon", description],
        ["kbkbxs570", "Lakáslista", "Lakáslista | Admiral Park Balatonfüred", "Böngéssze az Admiral Park balatonfüredi lakásait, hasonlítsa össze az alaprajzokat és mentse kedvenceit."],
        ["A8W8FsOjk", "Aktuális", "Aktuális | Admiral Park Balatonfüred", "Friss hírek és újdonságok az Admiral Park balatonfüredi fejlesztéséről."],
        ["kepPPkXui", "Adatkezelési tájékoztató", "Adatkezelési tájékoztató | Admiral Park", "Az Admiral Park weboldalához és kapcsolatfelvételi űrlapjához tartozó adatkezelési tájékoztató."],
    ]
    for (const [id, name, title, info] of pages) {
        tree.patch(id, { name, "metadata.title": title, "metadata.description": info })
    }

    // The old Claude link led outside the project to a missing page. Preserve
    // the policy wording while the owner prepares the approved destination.
    const cookieLink = [...tree.walk("a9wxflcMb")].find(node =>
        node.type === "TextRun" && node.link?.href === "https://claude.ai/sutikezelesi-tajekoztato")
    if (cookieLink) tree.patch(cookieLink.id, { link: null, linkStylePreset: null })

    // Render the absolute-positioned shared header before the page slot so its
    // links are reached first without moving or restyling the visual header.
    for (const [parent, header] of [["imNYrJaln", "DPrAHUgg2"], ["P_fKFHMTO", "P_fKFHMTODPrAHUgg2"]]) {
        if (tree.get(parent)?.children?.[0]?.id !== header) tree.move(header, parent, 0)
    }

    const variants = ["PuW1sqJIC", "qFt3a1eWP", "RBw5RGsxX", "otenexeuQ", "zB0MNs5OS", "x5whu27Ce"]
    for (const variant of variants) {
        tree.patch(variant, { tabIndex: -1, ariaLabel: "Fő navigáció" })
        tree.patch(`${variant}e4LTwxaux`, {
            link: { href: "/", openInNewTab: false },
            onTap: null,
            ariaLabel: "Admiral Park – kezdőlap",
        })
        tree.patch(`${variant}xTlmQkqh9`, { "$control__lb6Os26Xe": "Kezdőlap" })
    }

    function connectMobileDrawer() {
        if (window.__admiralMobileDrawerReady) return
        window.__admiralMobileDrawerReady = true
        const openHeaders = '[data-framer-name="AP - MOBILE HEADER - open"],[data-framer-name="MOBILE_LG_OPEN"]'
        const closedHeaders = '[data-framer-name="ADMIRAL PARK - MOBILE HEADER"],[data-framer-name="MOBILE_LG"]'
        const opener = '[aria-label="Menü"],[aria-label="Menü megnyitása"]'
        const closer = '[aria-label="Bezárás"],[aria-label="Menü bezárása"]'
        const controls = 'a[href],button:not(:disabled),[role="button"][tabindex],[tabindex="0"]'
        const namedNavigation = '[data-framer-name="Header || Appear"] [data-framer-name="Navbar"]'
        const inertSiblings = new Set()
        let dialog = null
        let scheduled = false
        let restore = false

        function rendered(node) {
            return node.getClientRects().length > 0 && getComputedStyle(node).visibility !== "hidden"
        }

        function openPanel() {
            return [...document.querySelectorAll(openHeaders)]
                .map(header => header.querySelector('[data-framer-name="Navbar"]'))
                .find(node => node && rendered(node) && node.querySelector(closer)) ?? null
        }

        function setInert(panel) {
            for (let branch = panel; branch.parentElement && branch !== document.body; branch = branch.parentElement) {
                for (const node of branch.parentElement.children) {
                    if (node !== branch && node instanceof HTMLElement && !node.inert) {
                        node.inert = true
                        inertSiblings.add(node)
                    }
                }
            }
        }

        function clearInert() {
            for (const node of inertSiblings) node.inert = false
            inertSiblings.clear()
        }

        function nameLinks() {
            for (const link of document.querySelectorAll(`${namedNavigation} a[data-framer-name="Black"]`)) {
                const text = link.querySelector("p")?.textContent?.trim()
                if (text && link.getAttribute("aria-label") !== text) link.setAttribute("aria-label", text)
            }
        }

        function sync() {
            scheduled = false
            nameLinks()
            const next = openPanel()
            if (next === dialog && (!next || next.getAttribute("role") === "dialog")) return
            if (dialog) {
                dialog.removeAttribute("role")
                dialog.removeAttribute("aria-modal")
                dialog.removeAttribute("aria-label")
            }
            clearInert()
            dialog = next
            if (dialog) {
                dialog.setAttribute("role", "dialog")
                dialog.setAttribute("aria-modal", "true")
                dialog.setAttribute("aria-label", "Menü")
                dialog.querySelector(closer)?.focus({ preventScroll: true })
                setInert(dialog)
            } else if (restore) {
                const trigger = [...document.querySelectorAll(closedHeaders)]
                    .map(header => header.querySelector(opener)).find(node => node && rendered(node))
                if (trigger) trigger.focus({ preventScroll: true })
                restore = false
            }
        }

        function schedule() {
            if (scheduled) return
            scheduled = true
            requestAnimationFrame(sync)
        }

        document.addEventListener("click", event => {
            if (dialog?.contains(event.target) && event.target.closest?.(closer)) restore = true
            schedule()
        }, true)
        document.addEventListener("keydown", event => {
            if (!dialog) return
            if (event.key === "Escape") {
                event.preventDefault()
                event.stopPropagation()
                restore = true
                const button = dialog.querySelector(closer)
                button?.focus({ preventScroll: true })
                // Trigger the same keyboard activation as the visible close control.
                for (const type of ["keydown", "keyup"]) {
                    button?.dispatchEvent(new KeyboardEvent(type, {
                        key: "Enter", code: "Enter", bubbles: true, cancelable: true,
                    }))
                }
                return
            }
            if (event.key !== "Tab") return
            const items = [...dialog.querySelectorAll(controls)].filter(node => node.tabIndex >= 0 && rendered(node))
            if (!items.length) return
            const active = items.indexOf(document.activeElement)
            const next = active === -1 ? (event.shiftKey ? items.length - 1 : 0)
                : (active + (event.shiftKey ? -1 : 1) + items.length) % items.length
            event.preventDefault()
            items[next].focus()
        }, true)

        new MutationObserver(schedule).observe(document.documentElement, {
            childList: true, subtree: true, attributes: true, attributeFilter: ["data-framer-name"],
        })
        window.addEventListener("resize", schedule, { passive: true })
        window.addEventListener("pageshow", schedule)
        schedule()
    }

    const pageIds = [home, "kbkbxs570", "ZmD0CLV3Z", "A8W8FsOjk", "XLriEYHai", "kepPPkXui"]
    const name = "Admiral Park keyboard navigation"
    const code = `<style>
[data-framer-name="Header || Appear"]:focus-within { opacity: 1 !important; transform: translateX(-50%) !important; }
[data-framer-name="Header || Appear"] :is(a, button, [role="button"]):focus-visible {
  outline: 2px solid #16679f !important;
  outline-offset: 3px;
}
</style><script>(${connectMobileDrawer.toString()})();</script>`
    const existing = tree.getNodesOfTypes("CustomCodeNode").find(node => node.name === name)
    const attrs = { pageIds, placement: "bodyEnd", loadMode: "once", code }
    if (existing) tree.patch(existing.id, attrs)
    else tree.insert("CustomCodeNode", "admiral-keyboard-navigation", { parent: tree.root, name, ...attrs })
}
