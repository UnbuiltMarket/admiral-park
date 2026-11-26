// Repair navigation for the review homepage or the experiment on the live domain.
{
    const { tree } = api
    const home = "Phxhru9uu"
    const holding = "augiA20Il"
    const keepInquiryHome = typeof admiralReleaseMode !== "undefined" && admiralReleaseMode === "live-draft"
    const description = "Fedezze fel az Admiral Park balatonfüredi lakásait az Aranyhíd sétányon, a 3D lakáskeresőben és a lakáslistában."
    const homepageTitle = "Admiral Park Balatonfüred – Lakások az Aranyhíd sétányon"
    if (keepInquiryHome) {
        if (tree.get(home)?.path !== "/homepage-draft-3" || tree.get(holding)?.path !== "/") {
            throw new Error("The experiment is not separate from the live inquiry page")
        }
        tree.patch(home, { "metadata.title": homepageTitle, "metadata.description": description, "metadata.noIndex": true })
        const listPath = tree.get("kbkbxs570")?.path
        if (!listPath) throw new Error("Apartment list route is missing")
        for (const instance of ["Pcq4F2KgH", "RnA329eK1Pcq4F2KgH"]) {
            tree.patch(instance, { "$control__detailPageUrl": listPath })
        }
    } else {
        if (tree.get(home)?.path === "/homepage-draft-3" && tree.get(holding)?.path === "/") {
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

        tree.patch(tree.root.id, { "metadata.description": description })
        const pages = [
            [home, "Kezdőlap", homepageTitle, description],
            ["kbkbxs570", "Lakáslista", "Lakáslista | Admiral Park Balatonfüred", "Böngéssze az Admiral Park balatonfüredi lakásait, hasonlítsa össze az alaprajzokat és mentse kedvenceit."],
            ["A8W8FsOjk", "Aktuális", "Aktuális | Admiral Park Balatonfüred", "Friss hírek és újdonságok az Admiral Park balatonfüredi fejlesztéséről."],
            ["kepPPkXui", "Adatkezelési tájékoztató", "Adatkezelési tájékoztató | Admiral Park", "Az Admiral Park weboldalához és kapcsolatfelvételi űrlapjához tartozó adatkezelési tájékoztató."],
        ]
        for (const [id, name, title, info] of pages) {
            tree.patch(id, { name, "metadata.title": title, "metadata.description": info })
        }

        // The review copy omits the broken cookie link while the notice is pending.
        const cookieLink = [...tree.walk("a9wxflcMb")].find(node =>
            node.type === "TextRun" && node.link?.href === "https://claude.ai/sutikezelesi-tajekoztato")
        if (cookieLink) tree.patch(cookieLink.id, { link: null, linkStylePreset: null })
    }

    const homepagePath = tree.get(home).path

    // Render the absolute-positioned shared header before the page slot so its
    // links are reached first without moving or restyling the visual header.
    for (const [parent, header] of [["imNYrJaln", "DPrAHUgg2"], ["P_fKFHMTO", "P_fKFHMTODPrAHUgg2"]]) {
        if (tree.get(parent)?.children?.[0]?.id !== header) tree.move(header, parent, 0)
    }

    const variants = ["PuW1sqJIC", "qFt3a1eWP", "RBw5RGsxX", "otenexeuQ", "zB0MNs5OS", "x5whu27Ce"]
    for (const variant of variants) {
        tree.patch(variant, { tabIndex: -1, ariaLabel: "Fő navigáció" })
        tree.patch(`${variant}e4LTwxaux`, {
            link: { href: homepagePath, openInNewTab: false },
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

    const pageIds = [home, "kbkbxs570", "ZmD0CLV3Z", "A8W8FsOjk", "XLriEYHai"]
    if (keepInquiryHome) {
        const routeName = "Admiral Park experimental orbit route"
        const route = tree.getNodesOfTypes("CustomCodeNode").find(node => node.name === routeName)
        const attrs = { pageIds, placement: "headEnd", loadMode: "once", code: `<meta name="admiral-orbit-path" content="${homepagePath}">` }
        if (route) tree.patch(route.id, attrs)
        else tree.insert("CustomCodeNode", "admiral-experimental-orbit-route", { parent: tree.root, name: routeName, ...attrs })
    } else {
        pageIds.push("kepPPkXui")
    }
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

    // @shared-navbar-start
    {
        const { tree } = api
        const template = "p4cXKp6DX"
        const mobileClosed = "RBw5RGsxX"
        const mobileOpen = "otenexeuQ"
        const desktop = "x5whu27Ce"
        const navigationNavy = tree.token("oFWpnXGiK")
        const pages = ["Phxhru9uu", "kbkbxs570", "ZmD0CLV3Z", "A8W8FsOjk", "XLriEYHai"]
        const privacy = "kepPPkXui"
        if (tree.get(privacy)?.$layoutTemplateId === template) pages.push(privacy)
        const homePath = tree.get(pages[0])?.path
        if (!homePath || pages.some(id => tree.get(id)?.$layoutTemplateId !== template)) {
            throw new Error("The new Admiral Park pages must share the home new template")
        }
        for (const id of pages) {
            tree.patch(id, { "$control__oK6lVDB1A": mobileClosed, "$control__A8J3tyLkJ": desktop })
        }
        // The template only contains the shared header and page slot. Make
        // its compact header available on landscape phones up to 959px.
        tree.patch("P_fKFHMTO", { width: "960px" })
        // Pin the existing header per breakpoint and keep its authored inset.
        for (const header of ["DPrAHUgg2", "P_fKFHMTODPrAHUgg2", "BYxCw_4kwDPrAHUgg2"]) {
            tree.patch(header, { position: "fixed" })
        }

        for (const variant of [mobileClosed, mobileOpen, desktop]) {
            tree.patch(`${variant}e4LTwxaux`, {
                link: { href: homePath, openInNewTab: false },
                onTap: null,
                ariaLabel: "Admiral Park – kezdőlap",
            })
            tree.patch(`${variant}xTlmQkqh9`, { "$control__h5DL13tDk": homePath })
            tree.patch(`${variant}eBheKMp04`, { "$control__h5DL13tDk": `${homePath}#orbit` })
        }
        for (const variant of [mobileClosed, mobileOpen]) {
            const isOpen = variant === mobileOpen
            // Use the bottom gutter for more space around the 44px controls.
            tree.patch(variant, { padding: "8px 10px 0px 10px" })
            tree.patch(`${variant}XtrBtHXVP`, { padding: "4px 8px", radius: "26px" })
            tree.patch(`${variant}xb3fgxYOT`, { "$control__radius": 26 })
            tree.patch(`${variant}U_NhgbaxW`, { height: "44px", top: "4px" })
            tree.patch(`${variant}BL5MI0ckm`, { height: "44px", padding: "0px" })
            tree.patch(`${variant}aRgWhLeCB`, { width: "124px", "$control__width": 124 })
            tree.patch(`${variant}Ddw6Oriwu`, { height: "44px" })
            tree.patch(`${variant}cpKq9Al9R`, {
                fill: null, border: null, boxShadows: [], radius: "0px",
                width: "44px", height: "44px", maxHeight: "44px",
            })
            tree.patch(`${variant}kYSDnMgz5`, { visible: false })
            for (const [index, id] of ["P1ZidUzqV", "JG7KK45jO"].entries()) {
                tree.patch(`${variant}${id}`, {
                    visible: true, fill: navigationNavy, width: "23px", height: "2px", left: "10.5px",
                    top: isOpen ? "21px" : index === 0 ? "17px" : "25px",
                    rotateZ: isOpen ? (index === 0 ? "45deg" : "-45deg") : "0deg",
                })
            }
        }

        tree.patch(`${mobileOpen}XtrBtHXVP`, { height: "650px", fill: "rgba(246,250,253,0.9)" })
        tree.patch(`${mobileOpen}DMLPudZKb`, {
            name: "Mobile menu links", height: "1fr", padding: "16px 16px 20px 16px",
        })
        const rows = ["x1mql4Mlb", "cWsK61b6y", "M_z0lrfjF", "pNa_QpaUi", "cQpRz3kTQ"]
        const links = ["xTlmQkqh9", "eBheKMp04", "pcmzJu43c", "kIogLLRNb", "ntlI0fK2B"]
        for (const [index, row] of rows.entries()) {
            tree.patch(`${mobileOpen}${row}`, { height: "64px" })
            tree.patch(`${mobileOpen}${links[index]}`, {
                height: "1fr", "$control__XSbTnrhXC": 28, "$control__fxVoGXxWM": navigationNavy,
            })
        }

        // Retain the previous typography for unused legacy variants without
        // letting its important declarations override the new shared menu.
        const legacy = tree.getNodesOfTypes("CustomCodeNode").find(node => node.name === "Admiral Park mobile typography")
        const legacyBoth = ':is([data-framer-name="AP - MOBILE HEADER - open"], [data-framer-name="MOBILE_LG_OPEN"])'
        if (legacy?.code.includes(legacyBoth)) {
            tree.patch(legacy.id, { code: legacy.code.replace(legacyBoth, '[data-framer-name="AP - MOBILE HEADER - open"]') })
        }

        const name = "Admiral Park phone menu viewport"
        const snippet = tree.getNodesOfTypes("CustomCodeNode").find(node => node.name === name)
        const code = `<style>
:is([data-framer-name="MOBILE_LG"], [data-framer-name="MOBILE_LG_OPEN"]) > [data-framer-name="Navbar"] .admiral-frosted-button[data-appearance="blue"] {
  padding-inline: 16px !important;
}
/* Keep the inquiry label legible in WebKit over the homepage video. */
:is([data-framer-name="MOBILE_LG"], [data-framer-name="MOBILE_LG_OPEN"]) > [data-framer-name="Navbar"] .admiral-frosted-button[data-appearance="blue"] > span {
  font-family: Arial, sans-serif !important;
  font-weight: 700 !important;
}
[data-framer-name="MOBILE_LG_OPEN"] > [data-framer-name="Navbar"] {
  height: 82vh !important;
  height: 82svh !important;
  height: 82dvh !important;
  max-height: calc(100dvh - 16px - env(safe-area-inset-top, 0px) - env(safe-area-inset-bottom, 0px)) !important;
  grid-template-rows: 44px minmax(0, 1fr) !important;
}
[data-framer-name="MOBILE_LG_OPEN"] [data-framer-name="Mobile menu links"] {
  box-sizing: border-box !important;
  align-self: stretch !important;
  min-height: 0 !important;
  height: 100% !important;
  overflow: auto !important;
  overscroll-behavior: contain;
  padding: clamp(12px, 4dvh, 32px) clamp(12px, 4vw, 26px) 16px !important;
}
[data-framer-name="MOBILE_LG_OPEN"] [data-framer-name="Mobile menu links"] > [data-framer-name="Link"] {
  box-sizing: border-box !important;
  flex: 1 0 52px !important;
  min-height: 52px;
  max-height: 104px;
  border-bottom: 1px solid rgba(18, 60, 89, .12);
}
[data-framer-name="MOBILE_LG_OPEN"] [data-framer-name="Mobile menu links"] [data-framer-name="Link"] a {
  flex-direction: row !important;
  align-items: center !important;
  justify-content: flex-start !important;
  padding-inline: 10px !important;
}
[data-framer-name="MOBILE_LG_OPEN"] [data-framer-name="Mobile menu links"] a > [data-framer-component-type="RichTextContainer"] {
  position: relative !important;
  inset: auto !important;
  transform: none !important;
  align-self: auto !important;
}
[data-framer-name="MOBILE_LG_OPEN"] [data-framer-name="Mobile menu links"] a > [data-framer-component-type="RichTextContainer"] + [data-framer-component-type="RichTextContainer"] {
  display: none !important;
}
[data-framer-name="MOBILE_LG_OPEN"] [data-framer-name="Mobile menu links"] [data-framer-name="Link"] p {
  --framer-font-size: clamp(24px, 7.2vw, 36px) !important;
  --framer-font-weight: 600 !important;
  --framer-text-color: var(--token-oFWpnXGiK, #113655) !important;
  font-size: var(--framer-font-size) !important;
  font-weight: var(--framer-font-weight) !important;
  color: var(--framer-text-color) !important;
  line-height: 1.15 !important;
  text-transform: none !important;
}
[data-framer-name="MOBILE_LG_OPEN"] [data-framer-name="Mobile menu links"] :is(a[data-framer-page-link-current="true"], a[aria-current="page"]) p {
  --framer-font-weight: 800 !important;
}
[data-framer-name="MOBILE_LG_OPEN"] [data-framer-name="Mobile menu links"] [data-framer-name="Link"] a:focus-visible {
  outline-offset: -3px !important;
}
</style>`
        const attrs = { pageIds: pages, placement: "headEnd", loadMode: "once", code }
        if (snippet) tree.patch(snippet.id, attrs)
        else tree.insert("CustomCodeNode", "admiral-phone-menu-viewport", { parent: tree.root, name, ...attrs })
    }
    // @shared-navbar-end
}
