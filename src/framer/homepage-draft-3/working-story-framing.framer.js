const workingPageId = "Phxhru9uu"
const workingPath = "/homepage-draft"
const workingPage = api.tree.get(workingPageId)
if (workingPage?.path !== workingPath) throw new Error("Expected the working homepage draft")
const heroIds = ["Pcq4F2KgH", "RnA329eK1Pcq4F2KgH"]
for (const id of heroIds) {
    const hero = api.tree.get(id)
    if (hero?.$scopeId !== workingPageId || hero.component !== "codeFile/tlTfkfX:default") {
        throw new Error("Expected the working homepage hero")
    }
}
const heroFile = await api.files.read("HERO_video_no_fullscreen.tsx")
if (!heroFile.source.includes("portraitStoryOverlays: {")) throw new Error("Install the mobile story control first")
const desktopCopy = ["xowzGt9gR", "AWRuc5Wvg"].map(id => api.tree.get(id))
if (desktopCopy.some(node => node?.$scopeId !== workingPageId || !node.text?.trim())) {
    throw new Error("Expected the authored desktop SEQ_02 title and body")
}
const [gardenTitle, gardenBody] = desktopCopy.map(node => node.text.replace(/\s+/g, " ").trim())

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
        gap: clamp(14px, 2.2vh, 20px);
    }

    :root[data-admiral-working-story] [data-phone-sequence-story="neighborhood"] h2 {
        max-width: min(100%, 368px);
        font-size: clamp(22px, 6.5vw, 29px);
        line-height: 1.17;
        letter-spacing: .038em;
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

    :root[data-admiral-working-story] [data-phone-sequence-story="garden"] :is(h2, p) {
        /* Use the full desktop copy with natural phone line breaks. */
        display: block;
        overflow: visible;
        -webkit-line-clamp: unset;
    }

    :root[data-admiral-working-story] [data-phone-sequence-story="garden"] h2 {
        max-width: min(100%, 376px);
        font-size: clamp(18px, 5.1vw, 23px);
    }

    :root[data-admiral-working-story] [data-phone-sequence-story="garden"] p {
        max-width: min(100%, 390px);
    }

    @media (max-width: 360px), (max-height: 550px) {
        :root[data-admiral-working-story] [data-admiral-homepage] [data-phone-sequence-story="garden"] {
            --admiral-story-top: max(calc(env(safe-area-inset-top) + 64px), min(14.5vh, 104px));
            gap: 10px;
        }
    }

    @media (max-height: 550px) {
        :root[data-admiral-working-story] [data-phone-sequence-story="garden"] ul {
            width: min(76vw, 240px);
            grid-template-columns: repeat(3, minmax(0, 1fr));
        }

        :root[data-admiral-working-story] [data-phone-sequence-story="garden"] li:first-child {
            grid-column: auto;
        }
    }

    :root[data-admiral-working-story] [data-phone-story-tuned] [data-phone-story-map] {
        /* Register the original landscape artwork to the wider, bottom-aligned land in the portrait frame. */
        position: absolute;
        display: block;
        width: calc(1.1208 * var(--admiral-story-image-height));
        max-width: none;
        height: auto;
        left: calc(50% - .56042 * var(--admiral-story-image-height));
        bottom: calc(100% + var(--admiral-story-top) - var(--admiral-story-height));
        /* The desktop street caption falls outside the mobile crop. Keep the path and pins. */
        clip-path: polygon(32.8125% 0, 100% 0, 100% 100%, 0 100%, 0 87.9208%, 15.625% 87.9208%, 32.8125% 79.505%);
        opacity: 0;
    }

    :root[data-admiral-working-story] [data-phone-story-tuned] [data-phone-story-map][data-ready] {
        opacity: 1;
    }

    :root[data-admiral-working-story]:has([data-phone-story-tuned]) :is([data-hero-overlay="openingScroll"], [data-hero-overlay="building"]) .admiral-scroll-cue {
        display: none;
    }

    :root[data-admiral-working-story]:has([data-phone-story-tuned]) [data-hero-overlay="building"] {
        /* The legacy transparent wrapper overlaps the compact cue's tap area. */
        pointer-events: none !important;
    }

    :root[data-admiral-working-story] [data-phone-story-tuned] [data-phone-journey-cue] {
        position: absolute;
        z-index: 5;
        left: 50%;
        bottom: max(8px, env(safe-area-inset-bottom));
        translate: -50% 0;
        display: grid;
        place-items: center;
        width: 48px;
        height: 48px;
        padding: 0;
        border: 0;
        border-radius: 50%;
        background: transparent;
        color: inherit;
        cursor: pointer;
        touch-action: manipulation;
    }

    :root[data-admiral-working-story] [data-phone-journey-cue] .admiral-scroll-cue-glass {
        scale: .5;
    }

    :root[data-admiral-working-story] [data-phone-journey-cue]:not([data-phone-journey-cue="opening"]) .admiral-scroll-cue {
        --admiral-cue-arrival: .18s;
    }

    :root[data-admiral-working-story] [data-phone-journey-cue]:focus-visible {
        outline: 2px solid white;
        outline-offset: 2px;
    }

    @media (prefers-reduced-motion: no-preference) {
        :root[data-admiral-working-story] [data-phone-story-tuned] [data-phone-story-leaving] {
            --admiral-exit-x: 0px;
            --admiral-exit-y: calc(36px * var(--admiral-phone-story-exit, 0));
            translate: var(--admiral-exit-x) var(--admiral-exit-y);
            opacity: calc(1 - var(--admiral-phone-story-exit, 0));
            transition: translate 45ms linear, opacity 45ms linear;
        }

        :root[data-admiral-working-story] [data-phone-story-tuned] [data-phone-story-leaving][data-phone-sequence-story="neighborhood"] {
            --admiral-exit-x: calc(56px * var(--admiral-phone-story-exit, 0));
            --admiral-exit-y: calc(-18px * var(--admiral-phone-story-exit, 0));
        }

        :root[data-admiral-working-story] [data-phone-story-tuned] [data-phone-story-map][data-ready] {
            animation: admiral-phone-site-map-in 1s ease 1.25s both;
        }

        :root[data-admiral-working-story] [data-phone-story-leaving] [data-phone-story-map] {
            /* Keep the pins on the land as the copy moves away. */
            translate: calc(-1 * var(--admiral-exit-x)) calc(-1 * var(--admiral-exit-y));
            filter: opacity(calc(1 - min(1, 2 * var(--admiral-phone-story-exit, 0))));
            transition: translate 45ms linear, filter 45ms linear;
        }

        @keyframes admiral-phone-site-map-in {
            from { opacity: 0; }
            to { opacity: 1; }
        }

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
for (const id of heroIds) {
    const hero = api.tree.get(id)
    api.tree.patch(id, {
        $control__portraitStoryOverlays: true,
        $control__phoneSequenceCopy: { ...hero.$control__phoneSequenceCopy, gardenTitle, gardenBody },
    })
}

return { id: saved.id, pageIds: saved.pageIds, placement: saved.placement, heroIds }
