// Framer Agent program for the Admiral Park canvas. The active header is shared
// by the homepage, apartment list, introduction, news and contact pages.
const { tree } = api

const closed = "PuW1sqJIC"
const open = "qFt3a1eWP"
const navbar = "XtrBtHXVP"
const logo = "e4LTwxaux"
const links = "DMLPudZKb"
const linkRows = ["x1mql4Mlb", "cWsK61b6y", "M_z0lrfjF", "pNa_QpaUi", "cQpRz3kTQ"]
const linkInstances = ["xTlmQkqh9", "eBheKMp04", "pcmzJu43c", "kIogLLRNb", "ntlI0fK2B"]
const blue = "#123c59"

function addOnce(type, parent, name, options) {
    const existing = [...tree.walk(parent)].find(node => node.name === name)
    return existing ?? tree.insert(type, name, { parent, name, ...options })
}

function addMenuButton(name, label, target, variant, layout) {
    const button = addOnce("FrameNode", navbar, name, {
        htmlTag: "button",
        ariaLabel: label,
        ariaExpanded: variant === open,
        cursor: "pointer",
        layout: "stack",
        stackDirection: "horizontal",
        stackAlignment: "center",
        stackDistribution: "center",
        height: "44px",
        width: "auto",
        minWidth: "44px",
        padding: "0px 10px 0px 10px",
        radius: "22px",
        visible: false,
        onTap: [{ action: "SET_VARIANT", controls: { variant: target } }],
        ...layout,
    })
    addOnce("RichTextNode", button.id, `${name} · label`, {
        text: label,
        width: "auto",
        fontName: "Inter",
        fontSize: "14px",
        fontWeight: 600,
        textColor: blue,
        ariaHidden: true,
    })
    return tree.patch(`${variant}${button.id}`, { visible: true })
}

for (const id of [closed, open, navbar, logo, links]) {
    if (!tree.get(id)) throw new Error(`Admiral Park header node ${id} is missing`)
}

tree.patch(closed, { height: "56px", stackAlignment: "center" })
tree.patch(`${closed}${navbar}`, { padding: "3px 4px 3px 7px", gap: null })
tree.patch(`${closed}${logo}`, {
    link: { href: tree.get("Phxhru9uu").path, openInNewTab: false },
    onTap: null,
    width: "44px",
    height: "44px",
    stackDistribution: "center",
    ariaLabel: "Admiral Park – kezdőlap",
})
tree.patch(`${closed}aRgWhLeCB`, { width: "112px", height: "44px" })
const opener = addMenuButton("Admiral mobile menu", "Menü", open, closed, { position: "relative" })
tree.patch(opener.id, { fill: "rgba(244,250,253,0.94)" })
tree.move(opener.id, `${closed}${navbar}`, 3)

tree.patch(open, { stackDistribution: "center", padding: "4px" })
tree.patch(`${open}${navbar}`, {
    width: "96%",
    maxWidth: "430px",
    height: "auto",
    maxHeight: "90vh",
    overflow: "auto",
    padding: "8px 16px 14px 16px",
    stackAlignment: "start",
    stackDistribution: "start",
    gap: "8px",
})
tree.patch(`${open}${logo}`, { height: "44px", ariaLabel: "Admiral Park – kezdőlap" })
tree.patch(`${open}G7oIa8HKU`, { width: "40px", height: "38px" })
tree.patch(`${open}${links}`, { width: "1fr", gap: "0px", stackDistribution: "start" })
tree.patch(`${open}BL5MI0ckm`, { gap: "0px", stackDistribution: "start" })
tree.patch(`${open}Ddw6Oriwu`, { visible: false })
tree.patch(`${open}aRgWhLeCB`, { height: "44px" })

for (const [index, id] of linkRows.entries()) {
    tree.patch(`${open}${id}`, { width: "1fr", height: "44px", stackDistribution: "start" })
    const instance = `${open}${linkInstances[index]}`
    tree.patch(instance, {
        width: "1fr",
        height: "44px",
        "$control__variant": "L3F5hWlyJ",
        "$control__XSbTnrhXC": 15,
        "$control__fxVoGXxWM": blue,
        "$control__WJh8ZMmaD": [{ action: "SET_VARIANT", controls: { variant: closed } }],
        ...(index === 0 ? { "$control__lb6Os26Xe": "Kezdőlap" } : {}),
    })
}

addMenuButton("Admiral mobile close", "Bezárás", closed, open, {
    position: "absolute",
    top: "8px",
    right: "12px",
    zIndex: 2,
})

// Keep the cropped annotation overlay off the phone layout. The caption stays
// at the lower edge of the image where the gradient supports white text.
for (const [annotation, image, gradient] of [
    ["oJJx8gKycqH4m5YwoG", "oJJx8gKycclaaDW320", "oJJx8gKycygOFRnDI7"],
    ["RnA329eK1BsNlIZrJV", "RnA329eK1wtqXcC6eU", "RnA329eK1EhyGFN_WL"],
]) {
    tree.patch(annotation, { visible: false })
    tree.patch(image, { padding: "0px" })
    tree.patch(gradient, { opacity: 0.9 })
}

// Preserve the visible labels and form field names while giving screen readers
// a distinct name for each half of the name row.
tree.patch("v:Fu5o297Jv:0:1", {
    link: { href: "/adatkezelesitajekoztato", openInNewTab: true },
    linkStylePreset: "CAgf18CWt",
})

const inquiryRoute = "/contact-page-draft#visszahivas"
for (const [pageId, componentId] of [["kbkbxs570", "lpTXCEEr5"], ["Phxhru9uu", "Pcq4F2KgH"]]) {
    tree.patch(componentId, { "$control__inquiryUrl": inquiryRoute })
    for (const breakpoint of tree.get(pageId).$breakpoints ?? []) {
        const replica = tree.get(`${breakpoint.id}${componentId}`)
        if (replica) tree.patch(replica.id, { "$control__inquiryUrl": inquiryRoute })
    }
}

addOnce("CustomCodeNode", tree.root.id, "Admiral Park phone menu viewport", {
    pageIds: ["Phxhru9uu", "kbkbxs570", "ZmD0CLV3Z", "A8W8FsOjk", "XLriEYHai"],
    placement: "headEnd",
    loadMode: "once",
    code: `<style>
[data-framer-name="AP - MOBILE HEADER - open"] > [data-framer-name="Navbar"] {
  max-height: calc(100svh - 12px - env(safe-area-inset-top,0px) - env(safe-area-inset-bottom,0px));
  overscroll-behavior: contain;
}
</style>`,
})

// The existing favorites component owns the inquiry field in the React form.
const replacedSnippet = tree.getNodesOfTypes("CustomCodeNode").find(node => node.name === "Admiral Park inquiry name fields")
if (replacedSnippet) tree.remove(replacedSnippet.id)

// Both phone drawers reuse the same labels, with a separate treatment for the CTA.
const mobileMenuLabels = ["Kezdőlap", "3D kereső", "Lakáslista", "Bemutatkozás", "Aktuális"]
for (const menuVariant of [open, "otenexeuQ"]) {
    for (const [index, instance] of linkInstances.entries()) {
        tree.patch(`${menuVariant}${instance}`, {
            "$control__lb6Os26Xe": mobileMenuLabels[index],
            "$control__XSbTnrhXC": 15,
            "$control__fxVoGXxWM": blue,
        })
    }
}

// The homepage's Phone replica also serves widths below 1440px. Scope its
// typographic and fitting changes to phone viewports and touch landscape.
for (const [id, name] of [
    ["U2WFFcOoa", "SEQ02 copy"],
    ["xowzGt9gR", "SEQ02 title"],
    ["AWRuc5Wvg", "SEQ02 introduction"],
]) {
    for (const target of [id, `RnA329eK1${id}`]) tree.patch(target, { name })
}

// The notice had only a 1200px canvas. Give its existing document a phone
// layout so it can render at the intended reading size on a narrow screen.
const privacy = tree.get("kepPPkXui")
const privacyPhoneId = privacy.$breakpoints.find(breakpoint => breakpoint.name === "Phone")?.id
    ?? tree.createVariant("AF0ivQ9ev", "admiral-privacy-phone", {
        gesture: null,
        name: "Phone",
        left: "1240px",
        width: "390px",
        height: "780px",
    }).id
tree.patch(`${privacyPhoneId}BQaPZibOe`, { padding: "84px 22px 52px 22px" })
tree.patch(`${privacyPhoneId}a9wxflcMb`, { name: "Adatkezelési tájékoztató szövege" })

const mobileTypography = `<style>
@media (max-width: 809px), (pointer: coarse) and (max-width: 1000px) and (max-height: 550px) {
  :is([data-framer-name="AP - MOBILE HEADER - open"], [data-framer-name="MOBILE_LG_OPEN"]) [data-framer-name="Link"] p {
    --framer-font-size: 15px !important;
    --framer-text-color: #123c59 !important;
    font-size: 15px !important;
    color: #123c59 !important;
    line-height: 1.3 !important;
    text-transform: none !important;
  }

  [data-framer-name="SEQ01"] [data-framer-name="Handover date glass"] {
    width: fit-content !important;
    max-width: calc(100vw - 32px) !important;
    padding: 6px 12px !important;
  }
  [data-framer-name="Handover date glass"] [data-framer-component-type="RichTextContainer"] {
    flex: 0 1 auto !important;
    width: auto !important;
  }
  [data-framer-name="Handover date glass"] :is(h3, h3 span) {
    --framer-font-size: 12px !important;
    font-size: 12px !important;
    line-height: 1.35 !important;
  }

  [data-framer-name="SEQ02"] {
    box-sizing: border-box !important;
    inset-inline: 0 !important;
    width: 100% !important;
    padding: 50px clamp(18px, 5.2vw, 26px) clamp(78px, 18svh, 155px) !important;
  }
  [data-framer-name="SEQ02 copy"] {
    width: min(100%, 435px) !important;
    max-width: 100% !important;
    min-width: 0 !important;
    gap: 12px !important;
  }
  [data-framer-name="SEQ02"] :is([data-framer-name="SEQ02 title"], [data-framer-name="SEQ02 introduction"]) {
    width: 100% !important;
    min-width: 0 !important;
    height: auto !important;
  }
  [data-framer-name="SEQ02 title"] :is(h3, h3 span) {
    --framer-font-size: clamp(25px, 7vw, 32px) !important;
    font-size: var(--framer-font-size) !important;
    line-height: 1.13 !important;
    letter-spacing: -.025em !important;
    overflow-wrap: normal !important;
  }
  [data-framer-name="SEQ02 title"] h3 > span { display: block; }
  [data-framer-name="SEQ02 title"] h3 > br { display: none; }
  [data-framer-name="SEQ02 title"] h3 > br + span {
    --framer-font-size: clamp(12px, 3.5vw, 15px) !important;
    --framer-font-weight: 600 !important;
    margin-top: 8px;
    font-weight: 600 !important;
    line-height: 1.3 !important;
    letter-spacing: .04em !important;
  }
  [data-framer-name="SEQ02 introduction"] :is(h3, h3 span) {
    --framer-font-size: 14px !important;
    --framer-font-weight: 400 !important;
    font-size: 14px !important;
    font-weight: 400 !important;
    line-height: 1.5 !important;
    overflow-wrap: normal !important;
  }
  :is([data-framer-name="SEQ02 title"], [data-framer-name="SEQ02 introduction"]) h3,
  [data-admiral-homepage] [data-seq3-garden] :is(h2, p) {
    text-shadow: 0 1px 3px rgba(8, 28, 45, .8), 0 2px 12px rgba(8, 28, 45, .38) !important;
  }
  [data-framer-name="SEQ02 scroll cue"] :is(h3, h3 span) {
    --framer-font-size: 12px !important;
    font-size: 12px !important;
    line-height: 1.35 !important;
  }

  :is([data-framer-name="location-heading"] [data-framer-name="location-title"], [data-framer-name="garden-title"], [data-framer-name="Műszaki adatok · H2"]) :is(h2, h2 span) {
    --framer-font-size: clamp(34px, 9.1vw, 43px) !important;
    font-size: var(--framer-font-size) !important;
    line-height: 1.08 !important;
  }
  [data-framer-name="opening-copy"] [data-framer-name="opening-title"] :is(h1, h1 span) {
    --framer-font-size: clamp(44px, 12.2vw, 50px) !important;
    font-size: var(--framer-font-size) !important;
  }
  [data-framer-name="Galéria · címsor"] [data-framer-name="Galéria"] :is(h2, h2 span) {
    --framer-font-size: clamp(35px, 10vw, 42px) !important;
    font-size: var(--framer-font-size) !important;
    line-height: 1.08 !important;
  }
  [data-framer-name="Balatonfüred a magasból · kép"] [data-framer-name="Cím"] :is(h3, h3 span) {
    --framer-font-size: clamp(24px, 6.8vw, 28px) !important;
    font-size: var(--framer-font-size) !important;
  }
  :is([data-framer-name="relax-title"], [data-framer-name="play-title"], [data-framer-name="fitness-title"], [data-framer-name="climate-title"], [data-framer-name="shading-title"], [data-framer-name="choice-title"]) :is(h3, h3 span) {
    --framer-font-size: 21px !important;
    font-size: 21px !important;
    line-height: 1.2 !important;
  }
  [data-framer-name="details-title"] :is(h3, h3 span) { --framer-font-size: 25px !important; font-size: 25px !important; }
  [data-framer-name="closing-title"] :is(h2, h2 span) {
    --framer-font-size: clamp(30px, 8.8vw, 36px) !important;
    font-size: var(--framer-font-size) !important;
    line-height: 1.12 !important;
  }
  [data-framer-name="agent-name"] :is(h3, h3 span) { --framer-font-size: 23px !important; font-size: 23px !important; }
  [data-framer-name="form-title"] :is(h2, h2 span) { --framer-font-size: 26px !important; font-size: 26px !important; }
  [data-framer-name="location-copy"] [data-framer-name="location-title"] :is(h2, h2 span) {
    --framer-font-size: 25px !important;
    font-size: 25px !important;
  }
  [data-framer-name="Friss hírek és újdonságok"] :is(h1, h1 span) {
    --framer-font-size: clamp(34px, 9.3vw, 42px) !important;
    font-size: var(--framer-font-size) !important;
  }
  [data-framer-name="Adatkezelési tájékoztató szövege"] :is(p, li, a) { overflow-wrap: anywhere; }
  [data-framer-name="Adatkezelési tájékoztató szövege"] :is(p:first-child, p:first-child span) {
    --framer-font-size: clamp(27px, 7.5vw, 34px) !important;
    font-size: var(--framer-font-size) !important;
    line-height: 1.12 !important;
  }
}
@media (pointer: coarse) and (max-width: 1000px) and (max-height: 550px) and (orientation: landscape) {
  [data-framer-name="SEQ02"] { padding-block: 45px 52px !important; }
  [data-framer-name="SEQ02 copy"] { width: min(78%, 435px) !important; gap: 8px !important; }
  [data-framer-name="SEQ02 title"] :is(h3, h3 span) { --framer-font-size: clamp(22px, 6.7svh, 28px) !important; }
  [data-framer-name="SEQ02 introduction"] :is(h3, h3 span) { font-size: 13px !important; line-height: 1.35 !important; }
}
</style>`
const typographyPageIds = ["Phxhru9uu", "kbkbxs570", "ZmD0CLV3Z", "A8W8FsOjk", "XLriEYHai", "kepPPkXui"]
const typographySnippet = addOnce("CustomCodeNode", tree.root.id, "Admiral Park mobile typography", {
    pageIds: typographyPageIds,
    placement: "headEnd",
    loadMode: "once",
    code: mobileTypography,
})
tree.patch(typographySnippet.id, { code: mobileTypography, pageIds: typographyPageIds })
