// Supply lazyEditorialSource with the source of AdmiralLazyEditorialImage.tsx.
{
    const { tree, files } = api
    const path = "AdmiralLazyEditorialImage.tsx"
    const mobile = "RnA329eK1"
    const photos = [
        { id: "Mu5NAcyi_", slug: "promenade", position: "50% 72%", naturalMobile: true },
        { id: "hp6Se4Okv", slug: "pool", position: "50% 50%" },
        { id: "HyP4zN9sC", slug: "facade", position: "91.3% 50.6%" },
    ]
    const findComponent = components => components?.find(entry => entry.type === "component")
    for (const photo of photos) {
        if (!tree.get(photo.id) || !tree.get(`${mobile}${photo.id}`))
            throw new Error(`Missing editorial image frame ${photo.id}`)
    }

    const existing = (await api.components.list()).project.code[path]
    const result = existing
        ? (await files.read(path)).source === lazyEditorialSource
            ? { components: existing, diagnostics: [] }
            : await files.write(path, lazyEditorialSource)
        : await files.create(path, lazyEditorialSource)
    const component = findComponent(result.components)
    if (!component || result.diagnostics.length)
        throw new Error(`Editorial image compile failed: ${JSON.stringify(result.diagnostics)}`)

    const report = []
    const childName = "Lazy editorial image"
    const staticPhotoFrame = { lightboxEffect: null, cursor: "default", htmlTag: "div" }
    for (const { id, slug, position, naturalMobile } of photos) {
        const frame = tree.get(id)
        tree.patch(id, { layout: "stack", stackDirection: "vertical", ...(naturalMobile ? staticPhotoFrame : {}) })
        const attributes = {
            name: childName,
            position: "relative",
            width: "1fr",
            height: "1fr",
            $control__photo: slug,
            $control__position: position,
        }
        const existingChild = frame.children?.find(child => child.name === childName)
        if (existingChild && existingChild.component !== component.id)
            throw new Error(`Unexpected component under editorial image frame ${id}`)
        const child = existingChild
            ? tree.patch(existingChild.id, attributes)
            : tree.insert("ComponentInstanceNode", `homepage-lazy-${slug}`, { parent: id, component: component.id, ...attributes })
        const childId = child?.id ?? existingChild?.id
        const phoneChild = `${mobile}${childId}`
        if (!childId || !tree.get(phoneChild))
            throw new Error(`Missing ${slug} image instance or phone replica`)
        if (naturalMobile) {
            tree.patch(phoneChild, { height: "auto", $control__position: "50% 50%", $control__natural: true })
            tree.patch(`${mobile}${id}`, { ...staticPhotoFrame, height: "auto", fill: null })
        }
        tree.patch(id, { fill: null })
        if (!naturalMobile && tree.get(`${mobile}${id}`)?.fill) tree.patch(`${mobile}${id}`, { fill: null })
        report.push({ image: slug, primary: childId, phone: phoneChild })
    }
    console.log(JSON.stringify({ component: component.id, instances: report }))
}
