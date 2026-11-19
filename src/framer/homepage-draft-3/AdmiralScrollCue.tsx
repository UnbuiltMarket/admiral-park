import * as React from "react"
import { addPropertyControls, ControlType } from "framer"
import { admiralPalette } from "./AdmiralPalette.tsx"

/** Keep CSS raw text identical between React SSR and client hydration. */
function cueStyleMarkup(css: string): { __html: string } {
    return { __html: css.replace(/<\/style/gi, "<\\/style") }
}

const cueStyles = `
.admiral-scroll-cue {
    --admiral-cue-arrival: 1.6s;
    --admiral-cue-settled: calc(var(--admiral-cue-arrival) + .8s);
    display: grid;
    place-items: center;
    pointer-events: none;
    opacity: 1;
}
.admiral-scroll-cue-caption {
    max-width: 100%;
    color: inherit;
    font: 550 13px/1.35 Montserrat, Arial, sans-serif;
    letter-spacing: .01em;
    text-align: center;
    animation: admiral-cue-caption-scroll 3.2s cubic-bezier(.4,0,.2,1) var(--admiral-cue-settled) infinite;
}
.admiral-scroll-cue-glass {
    position: relative;
    box-sizing: border-box;
    width: 34px;
    height: 52px;
    overflow: hidden;
    border: 1px solid var(--admiral-glass-rim, ${admiralPalette.lightGlassRim});
    border-radius: 999px;
    color: var(--admiral-glass-ink, ${admiralPalette.lightGlassInk});
    background: var(--admiral-glass-fallback, ${admiralPalette.lightGlassFallback});
    box-shadow: var(--admiral-glass-shadow, ${admiralPalette.lightGlassShadow});
    animation: admiral-cue-arrive 0.8s ease var(--admiral-cue-arrival) both;
}
@supports ((backdrop-filter:blur(1px)) or (-webkit-backdrop-filter:blur(1px))) {
    .admiral-scroll-cue-glass {
        background: var(--admiral-glass-fill, ${admiralPalette.lightGlass});
        -webkit-backdrop-filter: var(--admiral-glass-blur, ${admiralPalette.lightGlassBlur});
        backdrop-filter: var(--admiral-glass-blur, ${admiralPalette.lightGlassBlur});
    }
}
@media (prefers-reduced-transparency: reduce) {
    .admiral-scroll-cue-glass {
        background: var(--admiral-glass-fallback, ${admiralPalette.lightGlassFallback});
        -webkit-backdrop-filter: none;
        backdrop-filter: none;
    }
}
.admiral-scroll-cue[data-caption] .admiral-scroll-cue-glass {
    display: grid;
    place-items: center;
    width: 100%;
    max-width: 268px;
    padding: 4px 13px;
}
.admiral-scroll-cue-indicator {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
}
.admiral-scroll-cue[data-caption] .admiral-scroll-cue-indicator { display: none; }
@media (max-width: 767px), (pointer: coarse) and (max-height: 767px) {
    .admiral-scroll-cue[data-caption] .admiral-scroll-cue-glass {
        display: block;
        width: 34px;
        padding: 0;
    }
    .admiral-scroll-cue[data-caption] .admiral-scroll-cue-indicator { display: block; }
    .admiral-scroll-cue-caption { display: none; }
}
.admiral-scroll-cue-stroke {
    position: absolute;
    top: 10px;
    left: calc(50% - 1px);
    width: 2px;
    height: 9px;
    border-radius: 2px;
    background: currentColor;
    animation: admiral-cue-scroll 2.4s cubic-bezier(0.4,0,0.2,1) var(--admiral-cue-settled) infinite;
}
.admiral-scroll-cue-chevron {
    position: absolute;
    left: calc(50% - 6px);
    bottom: 9px;
    width: 12px;
    height: 8px;
    color: inherit;
}
@media (forced-colors: active) {
    .admiral-scroll-cue-glass { color: CanvasText; background: Canvas; border-color: CanvasText; }
    .admiral-scroll-cue-stroke { background: CanvasText; }
}
[data-hero-overlay][aria-hidden="true"] :is(.admiral-scroll-cue-caption, .admiral-scroll-cue-stroke) {
    animation-play-state: paused;
}
@keyframes admiral-cue-arrive {
    from { opacity: 0; transform: translateY(-5px); }
    to { opacity: 1; transform: translateY(0); }
}
@keyframes admiral-cue-scroll {
    0%, 12% { transform: translateY(0); opacity: 0; }
    26% { opacity: 1; }
    60% { transform: translateY(12px); opacity: 0; }
    100% { transform: translateY(12px); opacity: 0; }
}
@keyframes admiral-cue-caption-scroll {
    0%, 25%, 100% { transform: translateY(0); opacity: 1; }
    64% { transform: translateY(6px); opacity: 1; }
    79% { transform: translateY(16px); opacity: 0; }
    79.1% { transform: translateY(-12px); opacity: 0; }
}
@media (prefers-reduced-motion: reduce) {
    .admiral-scroll-cue { transition: none; }
    .admiral-scroll-cue-caption,
    .admiral-scroll-cue-glass,
    .admiral-scroll-cue-stroke { animation: none; }
}
`

interface ScrollCueProps {
    caption?: string
    style?: React.CSSProperties
}

/**
 * @framerSupportedLayoutWidth fixed
 * @framerSupportedLayoutHeight fixed
 * @framerIntrinsicWidth 36
 * @framerIntrinsicHeight 54
 */
export default function AdmiralScrollCue({ caption = "", style }: ScrollCueProps) {
    const text = caption.trim()
    return (
        <div
            className="admiral-scroll-cue"
            data-caption={text ? "" : undefined}
            aria-hidden={text ? undefined : true}
            style={{ width: "100%", height: "100%", ...style, pointerEvents: "none" }}
        >
            <style dangerouslySetInnerHTML={cueStyleMarkup(cueStyles)} />
            <div className="admiral-scroll-cue-glass">
                <span className="admiral-scroll-cue-indicator" aria-hidden="true">
                    <span className="admiral-scroll-cue-stroke" />
                    <svg className="admiral-scroll-cue-chevron" viewBox="0 0 12 8" fill="none" focusable="false">
                        <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </span>
                {text && <span className="admiral-scroll-cue-caption">{text}</span>}
            </div>
        </div>
    )
}

addPropertyControls(AdmiralScrollCue, {
    caption: { type: ControlType.String, title: "Caption", defaultValue: "" },
})
