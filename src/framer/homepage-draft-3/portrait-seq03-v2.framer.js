const workingPageId = "Phxhru9uu"
const componentId = "codeFile/tlTfkfX:default"
const heroPath = "HERO_video_no_fullscreen.tsx"
const heroIds = ["Pcq4F2KgH", "RnA329eK1Pcq4F2KgH"]
const video = "https://cdn.jsdelivr.net/gh/UnbuiltMarket/admiral-park@c69792a571e2657d8cfe0e413380369012ba095d/assets/videos/homepage/seq-03/portrait/seq3-v2.mp4"

if (api.tree.get(workingPageId)?.path !== "/homepage-draft") {
    throw new Error("Expected the working homepage draft")
}
const heroNodes = heroIds.map(id => api.tree.get(id))
if (heroNodes.some(node => node?.$scopeId !== workingPageId || node.component !== componentId)) {
    throw new Error("Expected both hero instances on the working homepage draft")
}
const source = await api.files.read(heroPath)
if (!source.source.includes("portraitApproachVideo: {")) {
    throw new Error("Install the portrait flight control in the hero component first")
}

for (const id of heroIds) api.tree.patch(id, { $control__portraitApproachVideo: video })

return heroIds.map(id => {
    const node = api.tree.get(id)
    return { id, page: node.$scopeId, video: node.$control__portraitApproachVideo }
})
