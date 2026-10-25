// Native Framer groups remain responsible for their own content and layout.
type OrbitStoryDirection = "left" | "right" | "top" | "bottom" | "none"
interface OrbitStoryViewMotion { enterFrom?: OrbitStoryDirection; exitTo?: OrbitStoryDirection; distance?: number }
interface OrbitStorySettings { enabled: boolean; enterDuration: number; exitDuration: number; delay: number; views: OrbitStoryViewMotion[] }
const DEFAULT_ORBIT_STORY_VIEWS: OrbitStoryViewMotion[] = Array.from({ length: 8 }, () => ({ enterFrom: "bottom", exitTo: "bottom", distance: 24 }))

function createOrbitStoryOverlay(Component: ComponentType<any>, viewIndex: number): ComponentType<any> {
    const Overlay = React.forwardRef<HTMLElement, any>((props, forwardedRef) => {
        const elementRef = React.useRef<HTMLElement | null>(null)
        const initialStyle = React.useRef(props.style)
        const ref = React.useCallback((node: HTMLElement | null) => {
            elementRef.current = node
            if (typeof forwardedRef === "function") forwardedRef(node)
            else if (forwardedRef) forwardedRef.current = node
        }, [forwardedRef])
        React.useEffect(() => {
            const element = elementRef.current
            if (!element?.style) return
            const original = {
                opacity: initialStyle.current?.opacity === undefined ? "" : String(initialStyle.current.opacity),
                translate: element.style.translate, visibility: element.style.visibility,
                pointerEvents: element.style.pointerEvents, hidden: element.getAttribute("aria-hidden"), inert: element.inert,
                story: element.getAttribute("data-orbit-story"), target: element.getAttribute("data-story-target"), state: element.getAttribute("data-story-state"),
                orbitIgnore: element.getAttribute("data-orbit-ignore"),
            }
            const layoutProperties = ["position", "top", "bottom", "left", "right", "width", "minWidth", "maxWidth", "minHeight", "maxHeight", "boxSizing", "overflowY", "overscrollBehavior", "touchAction"] as const
            const originalLayout = Object.fromEntries(layoutProperties.map(property => [property, element.style[property]])) as Record<typeof layoutProperties[number], string>
            let mobileLayout = false
            const computedTranslate = getComputedStyle(element).translate
            const baseTranslate = original.translate || computedTranslate
            const translateParts: string[] = []
            let token = "", depth = 0
            for (const character of baseTranslate === "none" ? "" : baseTranslate) {
                if (character === "(") depth++
                if (character === ")") depth--
                if (/\s/.test(character) && !depth) { if (token) { translateParts.push(token); token = "" } }
                else token += character
            }
            if (token) translateParts.push(token)
            const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
            let disposed = false, selected: HTMLElement | null = null, lastEligible = false, lastMotionKey = ""
            let timer = 0, frame = 0, state = "hidden", target = false
            let opacity = 0, x = 0, y = 0
            let sourceResize: ResizeObserver | null = null, sourceIntersection: IntersectionObserver | null = null, sourceMutation: MutationObserver | null = null
            const clampSetting = (value: number, fallback: number, max: number) => Number.isFinite(value) ? Math.min(max, Math.max(0, value)) : fallback
            function direction(value: OrbitStoryDirection | undefined): OrbitStoryDirection {
                return value === "left" || value === "right" || value === "top" || value === "bottom" || value === "none" ? value : "bottom"
            }
            function offset(from: OrbitStoryDirection, distance: number): [number, number] {
                return from === "left" ? [-distance, 0] : from === "right" ? [distance, 0] : from === "top" ? [0, -distance] : from === "bottom" ? [0, distance] : [0, 0]
            }
            function cancel() {
                clearTimeout(timer); timer = 0
                if (frame) cancelAnimationFrame(frame)
                frame = 0
            }
            function paint(interactive = false) {
                element!.style.opacity = String(opacity)
                element!.style.translate = Math.abs(x) < .001 && Math.abs(y) < .001 ? original.translate :
                    `calc(${translateParts[0] || "0px"} + ${x}px) calc(${translateParts[1] || "0px"} + ${y}px)${translateParts[2] ? " " + translateParts[2] : ""}`
                element!.style.visibility = opacity <= .001 ? "hidden" : original.visibility
                element!.style.pointerEvents = interactive ? original.pointerEvents : "none"
                element!.inert = interactive ? original.inert : true
                if (!interactive) element!.setAttribute("aria-hidden", "true")
                else if (original.hidden === null) element!.removeAttribute("aria-hidden")
                else element!.setAttribute("aria-hidden", original.hidden)
                element!.dataset.orbitStory = String(viewIndex + 1)
                element!.dataset.storyTarget = String(target)
                element!.dataset.storyState = state
            }
            function hide() {
                cancel(); opacity = 0; x = 0; y = 0; state = "hidden"; target = false; lastEligible = false; lastMotionKey = ""
                paint()
            }
            function rootVisible(root: HTMLElement) {
                if (!root.isConnected || !homepageChannels.has(root)) return false
                const box = root.getBoundingClientRect()
                if (box.width <= 0 || box.height <= 0 || box.right <= 0 || box.bottom <= 0 || box.left >= innerWidth || box.top >= innerHeight) return false
                let ancestor: HTMLElement | null = root
                while (ancestor) {
                    const css = getComputedStyle(ancestor)
                    if (css.display === "none" || css.visibility === "hidden" || css.visibility === "collapse" || Number(css.opacity) === 0) return false
                    ancestor = ancestor.parentElement
                }
                return true
            }
            function restoreLayout() {
                if (!mobileLayout) return
                for (const property of layoutProperties) if (element!.style[property] !== originalLayout[property]) element!.style[property] = originalLayout[property]
                if (original.orbitIgnore === null) element!.removeAttribute("data-orbit-ignore")
                else element!.setAttribute("data-orbit-ignore", original.orbitIgnore)
                mobileLayout = false
            }
            function positionForMobile(root: HTMLElement | null, channel: HomepageChannel | null | undefined) {
                if (!root || !channel?.mobile?.enabled) { restoreLayout(); return }
                mobileLayout = true
                const set = (property: typeof layoutProperties[number], value: string) => {
                    if (element!.style[property] !== value) element!.style[property] = value
                }
                // Read the containing block after switching to absolute positioning: its
                // padding edge is the origin, and its own scrolling moves that origin.
                set("position", "absolute")
                const rootBox = root.getBoundingClientRect()
                const parent = element!.offsetParent as HTMLElement | null
                const initialBlock = !parent || (parent === document.body && getComputedStyle(parent).position === "static")
                const parentBox = parent?.getBoundingClientRect()
                const scaleX = !initialBlock && parentBox && parent!.offsetWidth > 0 ? parentBox.width / parent!.offsetWidth : 1
                const scaleY = !initialBlock && parentBox && parent!.offsetHeight > 0 ? parentBox.height / parent!.offsetHeight : 1
                const safeScaleX = Number.isFinite(scaleX) && scaleX > 0 ? scaleX : 1
                const safeScaleY = Number.isFinite(scaleY) && scaleY > 0 ? scaleY : 1
                const storyLeft = channel.mobile.storyLeft ?? 24
                const storyWidth = channel.mobile.storyWidth ?? rootBox.width - 48
                const left = initialBlock ? rootBox.left + window.scrollX + storyLeft : (rootBox.left + storyLeft - parentBox!.left) / safeScaleX + parent!.scrollLeft - parent!.clientLeft
                const top = initialBlock ? rootBox.top + window.scrollY + channel.mobile.storyTop : (rootBox.top + channel.mobile.storyTop - parentBox!.top) / safeScaleY + parent!.scrollTop - parent!.clientTop
                const pixel = (value: number) => `${Math.round(value * 1000) / 1000}px`
                set("left", pixel(left)); set("top", pixel(top))
                set("bottom", "auto"); set("right", "auto")
                set("boxSizing", "border-box")
                set("width", pixel(Math.max(0, storyWidth) / safeScaleX))
                set("minWidth", "0px"); set("maxWidth", "none"); set("minHeight", "0px")
                set("maxHeight", pixel(Math.max(0, channel.mobile.storyMaxHeight) / safeScaleY))
                set("overflowY", "auto"); set("overscrollBehavior", "contain"); set("touchAction", "pan-y")
                if (!element!.hasAttribute("data-orbit-ignore")) element!.setAttribute("data-orbit-ignore", "")
            }
            function observeSource(root: HTMLElement | null) {
                sourceResize?.disconnect(); sourceIntersection?.disconnect(); sourceMutation?.disconnect()
                sourceResize = null; sourceIntersection = null; sourceMutation = null
                if (!root) return
                sourceResize = new ResizeObserver(update); sourceResize.observe(root)
                sourceIntersection = new IntersectionObserver(update); sourceIntersection.observe(root)
                sourceMutation = new MutationObserver(update)
                let ancestor: HTMLElement | null = root
                while (ancestor) {
                    sourceMutation.observe(ancestor, { attributes: true, attributeFilter: ["style", "class", "hidden"], childList: true })
                    ancestor = ancestor.parentElement
                }
            }
            function resolve(): HTMLElement | null {
                if (!element!.isConnected) return null
                let parent = element!.parentElement
                const ownBox = element!.getBoundingClientRect(), ownX = ownBox.left + ownBox.width / 2, ownY = ownBox.top + ownBox.height / 2
                while (parent) {
                    const candidates = [...homepageChannels.keys()].filter(root => parent!.contains(root) && rootVisible(root))
                    if (candidates.length) {
                        candidates.sort((a, b) => {
                            if (a.contains(element!) !== b.contains(element!)) return a.contains(element!) ? -1 : 1
                            const aa = a.getBoundingClientRect(), bb = b.getBoundingClientRect()
                            return Math.hypot(aa.left + aa.width / 2 - ownX, aa.top + aa.height / 2 - ownY) - Math.hypot(bb.left + bb.width / 2 - ownX, bb.top + bb.height / 2 - ownY)
                        })
                        return candidates[0]
                    }
                    parent = parent.parentElement
                }
                return null
            }
            function animate(toOpacity: number, toX: number, toY: number, duration: number, nextState: "entering" | "leaving") {
                cancel()
                const fromOpacity = opacity, fromX = x, fromY = y, started = performance.now()
                state = nextState; paint()
                const tick = (now: number) => {
                    frame = 0
                    if (disposed) return
                    if (!selected || !rootVisible(selected) || homepageChannels.get(selected)?.stage !== "orbit") { hide(); return }
                    const progress = duration > 0 ? sequenceClamp((now - started) / (duration * 1000)) : 1
                    const eased = nextState === "entering" ? 1 - Math.pow(1 - progress, 3) : sequenceEase(progress)
                    opacity = fromOpacity + (toOpacity - fromOpacity) * eased
                    x = fromX + (toX - fromX) * eased; y = fromY + (toY - fromY) * eased
                    if (progress >= 1) {
                        opacity = toOpacity; x = toX; y = toY; state = toOpacity ? "visible" : "hidden"
                    }
                    paint(target && opacity >= .98 && state !== "leaving")
                    if (progress < 1) frame = requestAnimationFrame(tick)
                }
                if (!duration) tick(started)
                else frame = requestAnimationFrame(tick)
            }
            function update() {
                if (disposed) return
                // Checkpoint groups cannot appear during either approach flight.
                // Stage changes already notify every subscriber, so no geometry
                // or ancestor styles are needed to keep these groups hidden.
                if (![...homepageChannels.values()].some(channel => channel.stage === "orbit" && channel.story.enabled)) {
                    if (state !== "hidden" || target || opacity !== 0 || timer || frame) hide()
                    restoreLayout()
                    return
                }
                const root = resolve()
                if (selected !== root) { hide(); selected = root; observeSource(root) }
                const channel = root && homepageChannels.get(root)
                positionForMobile(root, channel)
                if (!channel || channel.stage !== "orbit" || !channel.story.enabled) { hide(); return }
                const settings = channel.story, motion = settings.views[viewIndex] || DEFAULT_ORBIT_STORY_VIEWS[viewIndex]
                const enterFrom = direction(motion.enterFrom), exitTo = direction(motion.exitTo)
                const distance = clampSetting(motion.distance as number, 24, 300)
                const enter = clampSetting(settings.enterDuration, .6, 10), exit = clampSetting(settings.exitDuration, .3, 10), delay = clampSetting(settings.delay, .12, 10)
                const motionKey = `${enterFrom}:${exitTo}:${distance}:${enter}:${exit}:${delay}`
                const eligible = channel.orbit.state === "checkpoint" && channel.orbit.checkpoint === viewIndex
                const wasEligible = lastEligible
                lastEligible = eligible; target = eligible
                if (channel.static || reduced.matches) {
                    cancel(); opacity = eligible ? 1 : 0; x = 0; y = 0; state = eligible ? "visible" : "hidden"; lastMotionKey = motionKey
                    paint(eligible); return
                }
                if (!eligible) {
                    if (wasEligible || (state !== "leaving" && state !== "hidden")) {
                        cancel()
                        if (opacity <= .001) { opacity = 0; state = "hidden"; paint() }
                        else { const [exitX, exitY] = offset(exitTo, distance); animate(0, exitX, exitY, exit, "leaving") }
                    } else paint()
                    return
                }
                if (wasEligible && motionKey === lastMotionKey) return
                lastMotionKey = motionKey; cancel()
                if (opacity <= .001) { opacity = 0; [x, y] = offset(enterFrom, distance) }
                state = "waiting"; paint()
                const start = () => {
                    timer = 0
                    if (disposed || !target || !selected || !rootVisible(selected)) return
                    const live = homepageChannels.get(selected)
                    if (!live || live.stage !== "orbit" || live.orbit.state !== "checkpoint" || live.orbit.checkpoint !== viewIndex || !live.story.enabled) { update(); return }
                    animate(1, 0, 0, enter, "entering")
                }
                if (delay) timer = window.setTimeout(start, delay * 1000)
                else start()
            }
            homepageSubscribers.add(update)
            reduced.addEventListener("change", update)
            window.addEventListener("resize", update, { passive: true })
            window.addEventListener("scroll", update, { passive: true, capture: true })
            paint(); update()
            return () => {
                disposed = true; cancel(); observeSource(null); homepageSubscribers.delete(update)
                reduced.removeEventListener("change", update)
                window.removeEventListener("resize", update); window.removeEventListener("scroll", update, true)
                restoreLayout()
                element.style.opacity = original.opacity; element.style.translate = original.translate; element.style.visibility = original.visibility
                element.style.pointerEvents = original.pointerEvents; element.inert = original.inert
                const restore = (name: string, value: string | null) => value === null ? element.removeAttribute(name) : element.setAttribute(name, value)
                restore("aria-hidden", original.hidden); restore("data-orbit-story", original.story)
                restore("data-story-target", original.target); restore("data-story-state", original.state)
            }
        }, [])
        return <Component {...props} ref={ref} style={{ ...props.style, opacity: elementRef.current?.style.opacity ?? 0 }} />
    })
    Overlay.displayName = `OrbitView${viewIndex + 1}`
    return Overlay
}
export function OrbitView1(Component: ComponentType<any>): ComponentType<any> { return createOrbitStoryOverlay(Component, 0) }
export function OrbitView2(Component: ComponentType<any>): ComponentType<any> { return createOrbitStoryOverlay(Component, 1) }
export function OrbitView3(Component: ComponentType<any>): ComponentType<any> { return createOrbitStoryOverlay(Component, 2) }
export function OrbitView4(Component: ComponentType<any>): ComponentType<any> { return createOrbitStoryOverlay(Component, 3) }
export function OrbitView5(Component: ComponentType<any>): ComponentType<any> { return createOrbitStoryOverlay(Component, 4) }
export function OrbitView6(Component: ComponentType<any>): ComponentType<any> { return createOrbitStoryOverlay(Component, 5) }
export function OrbitView7(Component: ComponentType<any>): ComponentType<any> { return createOrbitStoryOverlay(Component, 6) }
export function OrbitView8(Component: ComponentType<any>): ComponentType<any> { return createOrbitStoryOverlay(Component, 7) }
