import * as React from "react"
import { addPropertyControls, ControlType, RenderTarget } from "framer"

interface Props {
    prefixText?: string
    emptyText?: string
    inputName?: string
    textColor?: string
    fontSize?: number
    style?: React.CSSProperties
}

const STORAGE_KEY = "admiral-park:favorites:v1"
const CHANGE_EVENT = "admiral:apartment-favorites"
const INQUIRY_FIELD = "Kiválasztott lakás"
const NAME_FIELDS = { Vezetéknév: "family-name", Keresztnév: "given-name" }

function requestedApartment(): string {
    const id = new URLSearchParams(window.location.search).get("apartment")?.trim().toUpperCase() || ""
    return /^[A-Z][0-9]{3}[A-Z]?$/.test(id) ? id : ""
}

function favouriteIds(value: unknown): string[] | null {
    if (!Array.isArray(value)) return null
    const ids = new Set<string>()
    for (const item of value.slice(0, 512)) {
        if (typeof item !== "string") continue
        const id = item.trim().toUpperCase()
        // Apartment identifiers are text, never markup. Keep suffixes such as
        // A001S and future letter/number/hyphen/underscore identifiers intact.
        if (/^[A-Z0-9][A-Z0-9_-]{0,31}$/.test(id)) ids.add(id)
        if (ids.size === 128) break
    }
    return [...ids]
}

function storedIds(raw: string | null): string[] | null {
    if (raw === null) return []
    try {
        return favouriteIds(JSON.parse(raw))
    } catch {
        return null
    }
}

/**
 * @framerSupportedLayoutWidth any
 * @framerSupportedLayoutHeight auto
 * @framerIntrinsicWidth 360
 * @framerIntrinsicHeight 24
 */
export default function AdmiralFavouriteApartments({
    prefixText = "",
    emptyText = "Jelöljön meg kedvenc lakásokat a szív ikonnal.",
    inputName = "Kedvelt lakások",
    textColor = "#526a74",
    fontSize = 14,
    style,
}: Props) {
    const [ids, setIds] = React.useState<string[]>([])
    const [inquiryApartment, setInquiryApartment] = React.useState("")
    const root = React.useRef<HTMLDivElement>(null)
    const input = React.useRef<HTMLInputElement>(null)
    const latestIds = React.useRef<string[]>([])
    const canvas = RenderTarget.current() === RenderTarget.canvas
    const fieldName = typeof inputName === "string" && inputName.trim() ? inputName.trim() : "Kedvelt lakások"
    const prefix = typeof prefixText === "string" ? prefixText.trim() : ""
    const visibleIds = canvas ? [] : ids
    const size = Number.isFinite(fontSize) ? Math.max(10, Math.min(32, fontSize)) : 14

    React.useEffect(() => {
        if (canvas) return
        let alive = true
        // Producers still dispatch the event when localStorage writes fail.
        // Preserve that newer in-memory value until storage genuinely changes.
        let eventOverride: { raw: string | null | undefined; ids: string[] } | null = null
        const readRaw = (): string | null | undefined => {
            try {
                return window.localStorage.getItem(STORAGE_KEY)
            } catch {
                return undefined
            }
        }
        const apply = (next: string[]) => {
            if (!alive) return
            latestIds.current = next
            if (input.current) input.current.value = next.join(", ")
            setIds((previous) => previous.join("\u0000") === next.join("\u0000") ? previous : next)
        }
        const refresh = () => {
            const raw = readRaw()
            if (raw === undefined) return
            const next = storedIds(raw)
            if (next === null) return
            if (eventOverride) {
                if (next.join("\u0000") === eventOverride.ids.join("\u0000")) {
                    eventOverride = null
                } else if (eventOverride.raw === undefined) {
                    eventOverride.raw = raw
                    return
                } else if (raw === eventOverride.raw) {
                    return
                } else {
                    eventOverride = null
                }
            }
            apply(next)
        }
        const changed = (event: Event) => {
            const next = favouriteIds((event as CustomEvent<{ ids?: unknown }>).detail?.ids)
            if (next === null) return
            const raw = readRaw()
            const persisted = raw === undefined ? null : storedIds(raw)
            eventOverride = persisted?.join("\u0000") === next.join("\u0000") ? null : { raw, ids: next }
            apply(next)
        }
        const storageChanged = (event: StorageEvent) => {
            if (event.key !== STORAGE_KEY && event.key !== null) return
            try {
                if (event.storageArea && event.storageArea !== window.localStorage) return
            } catch {
                // A valid event remains usable when direct storage access is blocked.
            }
            const next = event.key === null ? [] : storedIds(event.newValue)
            if (next === null) return
            eventOverride = null
            apply(next)
        }
        const form = root.current?.closest("form")
        for (const [name, autofill] of Object.entries(NAME_FIELDS)) {
            const field = form?.elements.namedItem(name)
            if (field instanceof HTMLInputElement) {
                field.setAttribute("aria-label", name)
                field.setAttribute("autocomplete", autofill)
            }
        }
        const refreshInquiry = () => setInquiryApartment(requestedApartment())
        const keepInquiryOnJump = (event: MouseEvent) => {
            if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
            if (!requestedApartment() || !(event.target instanceof Element)) return
            const link = event.target.closest<HTMLAnchorElement>("a[href]")
            if (!link || (link.target && link.target !== "_self")) return
            const destination = new URL(link.href)
            const current = window.location
            if (destination.origin !== current.origin || destination.pathname !== current.pathname || destination.hash !== "#visszahivas") return
            const target = document.getElementById("visszahivas")
            if (!target) return
            event.preventDefault()
            event.stopPropagation()
            if (current.hash === destination.hash) target.scrollIntoView({ block: "start" })
            else current.hash = destination.hash
        }
        const submit = () => refresh()
        const formData = (event: Event) => {
            const data = (event as FormDataEvent).formData
            data?.set(fieldName, latestIds.current.join(", "))
            const selected = requestedApartment()
            if (selected) data?.set(INQUIRY_FIELD, selected)
        }
        window.addEventListener(CHANGE_EVENT, changed)
        window.addEventListener("storage", storageChanged)
        window.addEventListener("pageshow", refresh)
        window.addEventListener("pageshow", refreshInquiry)
        window.addEventListener("popstate", refreshInquiry)
        window.addEventListener("focus", refresh)
        document.addEventListener("click", keepInquiryOnJump, true)
        form?.addEventListener("submit", submit, true)
        form?.addEventListener("formdata", formData)
        refresh()
        refreshInquiry()
        return () => {
            alive = false
            window.removeEventListener(CHANGE_EVENT, changed)
            window.removeEventListener("storage", storageChanged)
            window.removeEventListener("pageshow", refresh)
            window.removeEventListener("pageshow", refreshInquiry)
            window.removeEventListener("popstate", refreshInquiry)
            window.removeEventListener("focus", refresh)
            document.removeEventListener("click", keepInquiryOnJump, true)
            form?.removeEventListener("submit", submit, true)
            form?.removeEventListener("formdata", formData)
        }
    }, [canvas, fieldName])

    return (
        <div
            ref={root}
            data-admiral-form-favourites=""
            style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 6, width: "100%", minWidth: 0, color: textColor, fontFamily: "Montserrat,Arial,sans-serif", fontSize: size, lineHeight: 1.45, ...style }}
        >
            <input ref={input} type="hidden" name={fieldName} value={visibleIds.join(", ")} readOnly />
            {!canvas && inquiryApartment && (
                <p data-admiral-inquiry-apartment="" style={{ margin: 0, color: "#123c59", fontWeight: 600 }}>
                    {INQUIRY_FIELD}: {inquiryApartment}
                    <input type="hidden" name={INQUIRY_FIELD} value={inquiryApartment} readOnly />
                </p>
            )}
            <div aria-live="polite" aria-atomic="true" style={{ width: "100%", minWidth: 0 }}>
                {visibleIds.length ? (
                    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 6, minWidth: 0 }}>
                        {prefix && <span style={{ marginRight: 2 }}>{prefix}</span>}
                        <div role="list" aria-label="Kedvelt lakások" style={{ display: "flex", flexWrap: "wrap", gap: 6, minWidth: 0, maxWidth: "100%" }}>
                            {visibleIds.map((id) => (
                                <span key={id} role="listitem" data-favourite-apartment={id} style={{ display: "inline-flex", alignItems: "center", maxWidth: "100%", padding: "4px 10px", border: "1px solid rgba(82,106,116,.24)", borderRadius: 999, background: "rgba(255,255,255,.18)", fontWeight: 500, overflowWrap: "anywhere", boxSizing: "border-box" }}>{id}</span>
                            ))}
                        </div>
                    </div>
                ) : (
                    <span data-favourites-empty="" style={{ opacity: .85 }}>{emptyText}</span>
                )}
            </div>
        </div>
    )
}

addPropertyControls(AdmiralFavouriteApartments, {
    prefixText: { type: ControlType.String, title: "Prefix", defaultValue: "", description: "Optional text before the saved apartment numbers. Leave empty when the form already has a heading." },
    emptyText: { type: ControlType.String, title: "Empty text", defaultValue: "Jelöljön meg kedvenc lakásokat a szív ikonnal." },
    inputName: { type: ControlType.String, title: "Form field", defaultValue: "Kedvelt lakások", description: "The field name included in the form submission." },
    textColor: { type: ControlType.Color, title: "Text colour", defaultValue: "#526a74" },
    fontSize: { type: ControlType.Number, title: "Text size", defaultValue: 14, min: 10, max: 24, step: 1, unit: "px" },
})
