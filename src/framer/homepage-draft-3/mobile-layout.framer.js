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
    link: { href: "/homepage-draft-3", openInNewTab: false },
    onTap: null,
    width: "44px",
    height: "44px",
    stackDistribution: "center",
    ariaLabel: "Admiral Park – kezdőlap",
})
tree.patch(`${closed}aRgWhLeCB`, { width: "112px", height: "44px" })
const opener = addMenuButton("Admiral mobile menu", "Menü", open, closed, { position: "relative" })
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
        "$control__XSbTnrhXC": 19,
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

// Framer’s native form element does not accept ariaLabel as a canvas property.
addOnce("CustomCodeNode", tree.root.id, "Admiral Park inquiry name fields", {
    pageIds: ["XLriEYHai"],
    placement: "bodyEnd",
    loadMode: "always",
    code: `<script>
(() => {
  const names = { 'Vezetéknév': 'family-name', 'Keresztnév': 'given-name' };
  for (const [name, autofill] of Object.entries(names)) {
    document.querySelectorAll('form input[name="' + name + '"]').forEach((input) => {
      input.setAttribute('aria-label', name);
      input.setAttribute('autocomplete', autofill);
    });
  }
})();
</script>`,
})
