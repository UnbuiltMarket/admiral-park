const workingPageId = "Phxhru9uu"
const workingPath = "/homepage-draft"
const workingPage = api.tree.get(workingPageId)
if (workingPage?.path !== workingPath) throw new Error("Expected the working homepage draft")

const status = await api.publishing.status()
if (status.status !== "ready" || status.target !== "production" ||
    status.urls?.production !== "https://admiralpark.hu" || status.changesCount !== 0) {
    throw new Error("The production site has a different target or pending changes")
}

const code = `<style id="admiral-working-story-framing">
@media (max-width: 767px) and (orientation: portrait) {
    :root[data-admiral-working-story] [data-admiral-homepage]::after {
        content: none;
    }

    :root[data-admiral-working-story] [data-admiral-homepage] [data-phone-sequence-story] {
        /* Both 1080 × 1920 frames use cover with a bottom-centered origin. */
        --admiral-story-height: 100vh;
        --admiral-story-image-height: max(var(--admiral-story-height), 177.7778vw);
        --admiral-story-horizon: calc(var(--admiral-story-height) - .473 * var(--admiral-story-image-height));
        --admiral-story-lake-center: calc(var(--admiral-story-height) - .356 * var(--admiral-story-image-height));
        --admiral-story-roof: calc(var(--admiral-story-height) - .263 * var(--admiral-story-image-height));
        --admiral-story-top: max(calc(env(safe-area-inset-top) + 64px), min(18vh, 155px));
        top: var(--admiral-story-top);
        gap: clamp(12px, 1.8vh, 16px);
    }

    @supports (height: 100dvh) {
        :root[data-admiral-working-story] [data-admiral-homepage] [data-phone-sequence-story] {
            --admiral-story-height: 100dvh;
            --admiral-story-top: max(calc(env(safe-area-inset-top) + 64px), min(18dvh, 155px));
        }
    }

    :root[data-admiral-working-story] [data-admiral-homepage] [data-phone-sequence-story="neighborhood"] {
        --admiral-story-top: max(calc(env(safe-area-inset-top) + 70px), calc(.5 * var(--admiral-story-horizon) - 16px));
    }

    :root[data-admiral-working-story] [data-phone-sequence-story] :is(h2, p) {
        text-shadow: 0 1px 3px rgb(5 22 38 / 67%);
    }

    :root[data-admiral-working-story] [data-phone-sequence-story] p {
        font-weight: 300;
    }

    :root[data-admiral-working-story] [data-phone-sequence-story] ul {
        position: absolute;
        inset-inline: 0;
        margin: 0 auto;
        text-shadow: 0 1px 2px rgb(5 22 38 / 92%), 0 0 4px rgb(5 22 38 / 55%);
    }

    :root[data-admiral-working-story] [data-phone-sequence-story] svg {
        filter: drop-shadow(0 1px 1px rgb(5 22 38 / 78%));
    }

    :root[data-admiral-working-story] [data-phone-sequence-story="neighborhood"] ul {
        /* Center the whole group in the open water between the two shores. */
        top: calc(var(--admiral-story-lake-center) - var(--admiral-story-top));
        translate: 0 -50%;
    }

    :root[data-admiral-working-story] [data-phone-sequence-story="garden"] ul {
        /* Anchor the lower pair above the rooftop, in the gap between the pines. */
        bottom: calc(100% + var(--admiral-story-top) - var(--admiral-story-roof) + clamp(24px, 4.2vh, 40px));
        width: min(62vw, 212px);
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 8px 6px;
    }

    :root[data-admiral-working-story] [data-phone-sequence-story="garden"] li:first-child {
        grid-column: 1 / -1;
    }

    @media (prefers-reduced-motion: no-preference) {
        :root[data-admiral-working-story] [data-phone-sequence-story][data-draw="true"] h2 {
            animation-duration: .72s;
        }

        :root[data-admiral-working-story] [data-phone-sequence-story][data-draw="true"] p {
            animation-duration: .68s;
            animation-delay: .17s;
        }

        :root[data-admiral-working-story] [data-phone-sequence-story][data-draw="true"] ul {
            animation-duration: .56s;
            animation-delay: .92s;
        }

        :root[data-admiral-working-story] [data-phone-sequence-story][data-draw="true"] path {
            animation-duration: 1.8s;
            animation-delay: 1.48s;
        }

        :root[data-admiral-working-story] [data-phone-sequence-story][data-draw="true"] li:nth-child(2) path {
            animation-delay: 1.63s;
        }

        :root[data-admiral-working-story] [data-phone-sequence-story][data-draw="true"] li:nth-child(3) path {
            animation-delay: 1.78s;
        }
    }
}
</style>
<script>
(() => {
    const marker = "data-admiral-working-story";
    const mount = Symbol.for("admiralpark:working-story-framing");
    if (window[mount]) {
        window[mount]();
        return;
    }

    const root = document.documentElement;
    const observer = new MutationObserver(sync);

    function sync() {
        const active = location.pathname.replace(/[/]+$/, "") === "${workingPath}";
        const wasActive = root.hasAttribute(marker);
        root.toggleAttribute(marker, active);
        if (active === wasActive) return;

        // Framer can retain custom styles during client navigation.
        if (active) observer.observe(root, { childList: true, subtree: true });
        else observer.disconnect();
    }

    window[mount] = sync;
    sync();
    window.addEventListener("pageshow", sync);
    window.addEventListener("popstate", sync);
    window.navigation?.addEventListener("navigatesuccess", sync);
})();
</script>`

const name = "Admiral Park · Working draft story framing"
const existing = api.tree.getNodesOfTypes("CustomCodeNode").find(node => node.name === name)
const attributes = { name, code, placement: "headStart", loadMode: "always", pageIds: [workingPageId] }
if (existing) api.tree.patch(existing.id, attributes)
else api.tree.insert("CustomCodeNode", "working-story-framing", { parent: api.tree.root.id, ...attributes })

const saved = api.tree.getNodesOfTypes("CustomCodeNode").find(node => node.name === name)
return { id: saved.id, pageIds: saved.pageIds, placement: saved.placement }
