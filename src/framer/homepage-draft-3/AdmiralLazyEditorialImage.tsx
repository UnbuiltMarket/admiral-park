import * as React from "react"
import { addPropertyControls, ControlType } from "framer"

const photos = {
    promenade: {
        file: "2oFq6rhQVH3hlgU7zWnPuDodU.webp",
        width: 7560,
        height: 5670,
        sizes: "min(100vw, 1280px)",
        alt: "Az Admiral Park kertje az Aranyhíd sétány felől, fák alatt futó sétaúttal és a háttérben a lakóépületekkel.",
    },
    pool: {
        file: "z73j7FjqGcC6uHwOdoYIQnNsojQ.webp",
        width: 3000,
        height: 2250,
        sizes: "(min-width: 1440px) max((min(100vw, 1280px) - 64px) / 1.8475, 1px), min(100vw, 1280px)",
        alt: "Nappali látványterv a medencével és a közös kerttel.",
    },
    facade: {
        file: "KOnAeWmNHejCxUxsjneNKbcybw.webp",
        width: 3000,
        height: 2250,
        sizes: "(min-width: 1440px) max((min(100vw, 1180px) - 64px) * 0.4152, 1px), min(100vw, 1180px)",
        alt: "Homlokzati részlet a dekoratív teraszárnyékolókkal.",
    },
} as const

type Photo = keyof typeof photos

interface EditorialImageProps {
    photo?: Photo
    position?: string
    natural?: boolean
    style?: React.CSSProperties
}

/** @framerSupportedLayoutWidth any
 * @framerSupportedLayoutHeight any
 */
export default function AdmiralLazyEditorialImage({
    photo = "promenade",
    position = "50% 50%",
    natural = false,
    style,
}: EditorialImageProps) {
    const { file, width, height, sizes, alt } = photos[photo] ?? photos.promenade
    const url = `https://framerusercontent.com/images/${file}`
    const variant = (size: number) => `${url}?scale-down-to=${size}&width=${width}&height=${height}`
    const resized = [512, 1024, 2048, 4096].filter(size => size < width).map(size => `${variant(size)} ${size}w`)
    const srcSet = [...resized, `${url}?width=${width}&height=${height} ${width}w`].join(", ")
    const zoomable = photo === "promenade"
    const [open, setOpen] = React.useState(false)
    const dialog = React.useRef<HTMLDialogElement>(null)
    const trigger = React.useRef<HTMLButtonElement>(null)
    const closeButton = React.useRef<HTMLButtonElement>(null)
    const boxSize = { width: "100%", height: natural ? "auto" : "100%" }

    React.useEffect(() => {
        const element = dialog.current
        if (!open || !element) return
        if (!element.open) element.showModal()
        closeButton.current?.focus()
    }, [open])

    const image = <img
        data-admiral-editorial-image={photo}
        src={variant(1024)}
        srcSet={srcSet}
        sizes={sizes}
        width={width}
        height={height}
        alt={alt}
        loading="lazy"
        decoding="async"
        {...{ fetchpriority: "low" }}
        draggable={false}
        style={{ ...(zoomable ? {} : style), ...boxSize, display: "block", borderRadius: "inherit", objectFit: "cover", objectPosition: position }}
    />

    if (!zoomable) return image

    return <div style={{ ...style, ...boxSize, borderRadius: "inherit" }}>
        <button
            type="button"
            ref={trigger}
            aria-haspopup="dialog"
            aria-label="A kert látványtervének nagyítása"
            onClick={() => setOpen(true)}
            style={{ ...boxSize, display: "block", padding: 0, border: 0, background: "none", borderRadius: "inherit", cursor: "zoom-in" }}
        >{image}</button>
        {open && <dialog
            ref={dialog}
            aria-label="A kert látványterve"
            onClose={() => {
                setOpen(false)
                trigger.current?.focus({ preventScroll: true })
            }}
            style={{ position: "fixed", inset: 0, boxSizing: "border-box", margin: 0, width: "100%", height: "100%", maxWidth: "none", maxHeight: "none", border: 0, padding: 20, background: "rgba(11,32,47,.9)" }}
        >
            <div
                onClick={event => { if (event.target === event.currentTarget) dialog.current?.close() }}
                style={{ display: "grid", placeItems: "center", minHeight: "100%" }}
            >
                <img
                    src={variant(2048)}
                    srcSet={srcSet}
                    sizes="min(100vw, 1600px)"
                    alt={alt}
                    style={{ display: "block", maxWidth: "min(100%, 1600px)", maxHeight: "calc(100dvh - 40px)", objectFit: "contain" }}
                />
            </div>
            <button
                ref={closeButton}
                type="button"
                aria-label="Nagyítás bezárása"
                onClick={() => dialog.current?.close()}
                style={{ position: "absolute", top: 16, right: 16, width: 44, height: 44, border: 0, borderRadius: 999, background: "white", color: "#123c59", fontSize: 24, cursor: "pointer" }}
            >×</button>
        </dialog>}
    </div>
}

addPropertyControls(AdmiralLazyEditorialImage, {
    photo: { type: ControlType.Enum, options: ["promenade", "pool", "facade"], optionTitles: ["Aranyhíd sétány", "Medencés kert", "Homlokzat"] },
    position: { type: ControlType.String, defaultValue: "50% 50%", title: "Position" },
    natural: { type: ControlType.Boolean, defaultValue: false, title: "Natural height" },
})
