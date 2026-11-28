// Page-scoped Framer program for the informal customer review.
const reviewPageId = "HQgOOegzF"
const reviewPath = "/homepage-draft-3"
const review = api.tree.get(reviewPageId)
if (review?.path !== reviewPath || api.tree.get("Phxhru9uu")?.path !== "/homepage-draft" || api.tree.get("augiA20Il")?.path !== "/") {
    throw new Error("The customer review, working draft, and public homepage must be separate pages")
}

const guestPreview = `<style>
html[data-admiral-guest-locked],html[data-admiral-guest-locked] body { overflow: hidden !important; }
html[data-admiral-guest-locked] body > :not(#admiral-guest-gate) { visibility: hidden !important; opacity: 0 !important; pointer-events: none !important; }
#admiral-guest-gate {
    --review-photo: url("https://cdn.jsdelivr.net/gh/UnbuiltMarket/admiral-park@a3ff5a346f501a0d2af5b4466c2d2f95b30a3fb0/assets/orbit-compat-v06/stills/seq02-end.webp");
    position: fixed; inset: 0; z-index: 100000; isolation: isolate; box-sizing: border-box;
    margin: 0; width: 100%; height: 100%; height: 100dvh; max-width: none; max-height: none;
    overflow-x: hidden; overflow-y: auto; border: 0; clip-path: inset(0); color: #143451; background: #254962;
    padding: max(16px, env(safe-area-inset-top)) max(16px, env(safe-area-inset-right)) max(16px, env(safe-area-inset-bottom)) max(16px, env(safe-area-inset-left));
    font-family: Montserrat, Arial, sans-serif;
}
#admiral-guest-gate[open] { display: grid; grid-template-columns: minmax(0, 1fr); place-items: center; }
#admiral-guest-gate::backdrop { background: #254962; }
#admiral-guest-gate [data-guest-photo] {
    position: fixed; inset: 0; z-index: -1; pointer-events: none; overflow: hidden; contain: paint;
}
#admiral-guest-gate [data-guest-photo]::before {
    content: ""; position: absolute; inset: -24px;
    background: linear-gradient(160deg, rgb(8 33 54 / 26%), rgb(10 32 50 / 50%)), var(--review-photo) center / cover no-repeat;
    filter: blur(18px);
}
#admiral-guest-gate form {
    box-sizing: border-box; width: min(100%, 396px); min-width: 0; padding: clamp(18px, 5vw, 26px); margin: 0;
    display: grid; grid-template-columns: minmax(0, 1fr); gap: 12px; border: 1px solid rgb(255 255 255 / 82%); border-radius: 28px;
    background: linear-gradient(145deg, rgb(250 253 255 / 94%), rgb(223 237 248 / 89%));
    box-shadow: 0 12px 46px rgb(5 23 40 / 28%);
}
#admiral-guest-gate label { font-size: 17px; font-weight: 650; line-height: 1.35; }
#admiral-guest-gate [data-guest-fields] { display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 8px; min-width: 0; }
#admiral-guest-gate :is(input,button) {
    box-sizing: border-box; min-height: 48px; margin: 0; border-radius: 24px; font-family: inherit;
}
#admiral-guest-gate input {
    width: 100%; min-width: 0; border: 1px solid #7899b1; padding: 0 14px; outline-offset: 2px;
    background: rgb(255 255 255 / 95%); color: #143451; font-size: 16px;
}
#admiral-guest-gate button {
    border: 1px solid #184b77; padding: 0 16px; color: white;
    background: linear-gradient(145deg, #256ba0, #154876 67%, #123c61);
    font-size: 14px; font-weight: 650; cursor: pointer;
}
#admiral-guest-gate :is(input,button):focus-visible { outline: 2px solid #105889; outline-offset: 2px; }
#admiral-guest-gate [data-guest-error] { margin: 0; color: #9b252d; font-size: 13px; line-height: 1.4; }
#admiral-guest-gate [data-guest-error]:empty { display: none; }
@media (orientation: portrait) {
    #admiral-guest-gate { --review-photo: url("https://cdn.jsdelivr.net/gh/UnbuiltMarket/admiral-park@d1378960808e1163e9abb27c8d5cd74c30ed461d/assets/videos/homepage/seq-02/portrait/pool.webp"); }
    #admiral-guest-gate [data-guest-photo]::before { background-position: 50% 65%; }
}
</style>
<script>
(() => {
    const instance = Symbol.for("admiralpark:guest-preview");
    if (window[instance]) { window[instance](); return; }
    const route = "/homepage-draft-3";
    const digest = "11de218c48da6346f2ac40b89837005b4595b070dbe2149fe89974adc9bfb99f";
    const key = "admiralpark:guest:" + digest.slice(0, 12);
    const root = document.documentElement;
    const locked = "data-admiral-guest-locked";
    const gateId = "admiral-guest-gate";
    let unlocked = false;
    let gate = null;

    function reviewRoute() { return location.pathname.replace(/[/]+$/, "") === route; }
    function hasAccess() {
        if (unlocked) return true;
        try { return sessionStorage.getItem(key) === "1"; }
        catch { return false; }
    }
    function removeGate() {
        if (gate?.open && typeof gate.close === "function") gate.close();
        gate?.remove();
        gate = null;
        root.removeAttribute(locked);
    }
    function mount() {
        if (!reviewRoute() || hasAccess()) { removeGate(); return; }
        root.setAttribute(locked, "");
        if (gate || !document.body) return;

        gate = document.createElement("dialog");
        gate.id = gateId;
        gate.lang = "hu";
        gate.setAttribute("aria-labelledby", "admiral-guest-label");
        gate.innerHTML = [
            '<div data-guest-photo aria-hidden="true"></div>',
            '<form method="post">',
            '<label id="admiral-guest-label" for="admiral-guest-password" tabindex="-1" autofocus>Jelszó</label>',
            '<div data-guest-fields>',
            '<input id="admiral-guest-password" type="password" autocomplete="off" autocapitalize="off" spellcheck="false" required aria-describedby="admiral-guest-error">',
            '<button type="submit">Belépés</button>',
            '</div>',
            '<p id="admiral-guest-error" data-guest-error role="alert"></p>',
            '</form>',
        ].join("");
        const form = gate.querySelector("form");
        const input = gate.querySelector("input");
        const button = gate.querySelector("button");
        const error = gate.querySelector("[data-guest-error]");
        gate.addEventListener("cancel", event => event.preventDefault());
        input.addEventListener("input", () => {
            error.textContent = "";
            input.removeAttribute("aria-invalid");
        });
        form.addEventListener("submit", async event => {
            event.preventDefault();
            if (button.disabled) return;
            button.disabled = true;
            try {
                const candidate = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(input.value.trim()));
                const result = Array.from(new Uint8Array(candidate), byte => byte.toString(16).padStart(2, "0")).join("");
                if (result !== digest) {
                    error.textContent = "A megadott jelszó nem megfelelő.";
                    input.setAttribute("aria-invalid", "true");
                    input.focus();
                    input.select();
                    return;
                }
                unlocked = true;
                try { sessionStorage.setItem(key, "1"); } catch {}
                removeGate();
            } catch {
                error.textContent = "A belépés most nem sikerült. Kérjük, próbálja újra.";
            } finally {
                button.disabled = false;
            }
        });
        document.body.append(gate);
        if (typeof gate.showModal === "function") gate.showModal();
        else gate.setAttribute("open", "");
    }

    window[instance] = mount;
    mount();
    if (!document.body) document.addEventListener("DOMContentLoaded", mount, { once: true });
    window.addEventListener("pageshow", mount);
    window.addEventListener("popstate", mount);
    window.navigation?.addEventListener("navigatesuccess", mount);
})();
</script>`

const snippetName = "Admiral Park · Draft 3 guest access"
const existing = api.tree.getNodesOfTypes("CustomCodeNode").find(node => node.name === snippetName)
const attributes = { name: snippetName, code: guestPreview, placement: "headStart", loadMode: "always", pageIds: [reviewPageId] }
if (existing) api.tree.patch(existing.id, attributes)
else api.tree.insert("CustomCodeNode", "draft-3-guest-access", { parent: api.tree.root.id, ...attributes })

// Framer's page duplication does not carry over these page-scoped snippets.
for (const id of ["Z7F6cJOEG", "iVcQx74S8", "LKracXcsZ", "zTteZlswu"]) {
    const snippet = api.tree.get(id)
    if (snippet?.pageIds?.length && !snippet.pageIds.includes(reviewPageId)) {
        api.tree.patch(id, { pageIds: [...snippet.pageIds, reviewPageId] })
    }
}

// Keep the shared preview site's Home and 3D links on the customer copy.
for (const variant of ["RBw5RGsxX", "otenexeuQ", "x5whu27Ce"]) {
    api.tree.patch(variant + "e4LTwxaux", { "link.href": reviewPath })
    api.tree.patch(variant + "xTlmQkqh9", { "$control__h5DL13tDk": reviewPath })
    api.tree.patch(variant + "eBheKMp04", { "$control__h5DL13tDk": reviewPath + "#orbit" })
}
api.tree.patch(reviewPageId, { draft: false })
