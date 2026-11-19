import * as React from "react"
import { addPropertyControls, ControlType, RenderTarget } from "framer"
import { admiralButtonStyleMarkup } from "./AdmiralFrostedGlassButton.tsx"

const originalFile = "https://framerusercontent.com/assets/UmXeGKez7KlSRLROwJCUsa7YA.pdf"
const originalName = "Admiral-Park-Vevoi-Muszaki-Leiras-Tervezet.pdf"

type Props = { file?: string; filename?: string; style?: React.CSSProperties }

/**
 * @framerSupportedLayoutWidth any
 * @framerSupportedLayoutHeight auto
 * @framerIntrinsicWidth 256
 * @framerIntrinsicHeight 44
 */
export default function AdmiralTechnicalDownload({ file, filename, style }: Props) {
    const href = file || originalFile
    const name = filename || originalName
    const busy = React.useRef(false)
    const [loading, setLoading] = React.useState(false)
    const [useDirectLink, setUseDirectLink] = React.useState(false)

    async function save(event: React.MouseEvent<HTMLAnchorElement>) {
        if (RenderTarget.current() === RenderTarget.canvas) {
            event.preventDefault()
            return
        }
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || useDirectLink) return
        event.preventDefault()
        if (busy.current) return
        busy.current = true
        setLoading(true)
        try {
            const response = await fetch(href)
            if (!response.ok) throw new Error("PDF unavailable")
            const blob = await response.blob()
            const url = URL.createObjectURL(blob)
            const link = document.createElement("a")
            link.download = name
            link.href = url
            document.body.appendChild(link)
            link.click()
            link.remove()
            window.setTimeout(() => URL.revokeObjectURL(url), 60000)
        } catch {
            setUseDirectLink(true)
        } finally {
            busy.current = false
            setLoading(false)
        }
    }

    return <div style={{ ...style, display: "flex", alignItems: "center", maxWidth: "100%" }}>
        <style dangerouslySetInnerHTML={admiralButtonStyleMarkup} />
        <a className="admiral-frosted-button" data-appearance="blue" href={href} download={name} onClick={save}
            target={useDirectLink ? "_blank" : undefined} rel="noopener"
            aria-label={useDirectLink ? "A műszaki leírás PDF-fájljának megnyitása" : "Műszaki leírás letöltése PDF formátumban"}
            aria-busy={loading} style={{ maxWidth: "100%", whiteSpace: "normal" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3v11m-4-4 4 4 4-4M5 16v4h14v-4"/></svg>
            <span aria-live="polite">{loading ? "Letöltés…" : useDirectLink ? "PDF megnyitása" : "Műszaki leírás letöltése"}</span>
        </a>
    </div>
}

addPropertyControls(AdmiralTechnicalDownload, {
    file: { type: ControlType.File, title: "PDF", allowedFileTypes: ["pdf"] },
    filename: { type: ControlType.String, title: "Fájlnév", defaultValue: originalName },
})
