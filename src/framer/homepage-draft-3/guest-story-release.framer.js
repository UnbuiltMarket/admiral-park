// Copy the current portrait presentation once for the customer preview.
const working = { id: "Phxhru9uu", path: "/homepage-draft", heroIds: ["Pcq4F2KgH", "RnA329eK1Pcq4F2KgH"] }
const guest = { id: "HQgOOegzF", path: "/homepage-draft-3", heroIds: ["GaO3lgLgx", "g3xDdWfSxGaO3lgLgx"] }
const componentId = "codeFile/tlTfkfX:default"

for (const page of [working, guest]) {
    if (api.tree.get(page.id)?.path !== page.path || page.heroIds.some(id => {
        const node = api.tree.get(id)
        return node?.$scopeId !== page.id || node.component !== componentId
    })) throw new Error("Expected the verified homepage hero instances")
}

const source = api.tree.get("zE3x0gmAi")
if (source?.pageIds?.length !== 1 || source.pageIds[0] !== working.id || !source.code.includes("data-admiral-working-story")) {
    throw new Error("Expected the working portrait styles")
}

const heroSettings = working.heroIds.map((id, index) => {
    const hero = api.tree.get(id)
    const { neighborhoodBody, gardenTitle, gardenBody } = hero.$control__phoneSequenceCopy ?? {}
    const guestHero = api.tree.get(guest.heroIds[index])
    return {
        $control__portraitApproachVideo: hero.$control__portraitApproachVideo,
        $control__portraitStoryOverlays: hero.$control__portraitStoryOverlays,
        $control__phoneSequenceCopy: { ...guestHero.$control__phoneSequenceCopy, neighborhoodBody, gardenTitle, gardenBody },
    }
})
if (heroSettings.some(settings => !settings.$control__portraitApproachVideo || !settings.$control__portraitStoryOverlays ||
    !settings.$control__phoneSequenceCopy.neighborhoodBody || !settings.$control__phoneSequenceCopy.gardenTitle ||
    !settings.$control__phoneSequenceCopy.gardenBody)) {
    throw new Error("Expected the portrait video and story controls on the working draft")
}

const code = source.code
    .replaceAll("data-admiral-working-story", "data-admiral-guest-story")
    .replaceAll("admiral-working-story-framing", "admiral-guest-story-framing")
    .replaceAll("admiralpark:working-story-framing", "admiralpark:guest-story-framing")
    .replaceAll("admiral-working-intro", "admiral-guest-intro")
    .replaceAll("admiral-phone-site-map-in", "admiral-guest-phone-site-map-in")
    .replace(JSON.stringify(working.path), JSON.stringify(guest.path))
if (!code.includes('=== "/homepage-draft-3"') || code.includes("admiral-working-story") || code.includes("admiral-working-intro")) {
    throw new Error("Expected a separate route and style marker for the guest copy")
}

const name = "Admiral Park · Draft 3 story framing"
const current = api.tree.getNodesOfTypes("CustomCodeNode").find(node => node.name === name)
const attributes = { name, code, placement: "headStart", loadMode: "always", pageIds: [guest.id] }
if (current) api.tree.patch(current.id, attributes)
else api.tree.insert("CustomCodeNode", "draft-3-story-framing", { parent: api.tree.root.id, ...attributes })

guest.heroIds.forEach((id, index) => api.tree.patch(id, heroSettings[index]))
return { scope: guest.id, heroIds: guest.heroIds }
