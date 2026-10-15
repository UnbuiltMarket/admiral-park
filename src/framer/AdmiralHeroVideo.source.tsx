import * as React from "react"
import { addPropertyControls, ControlType, useIsStaticRenderer } from "framer"

type ImageValue = { src?: string; srcSet?: string; alt?: string } | string | null
const DEFAULT_FIRST_FRAME = {
    src: "https://framerusercontent.com/images/2uTNEj5aTl2K3NJaEFWMbnrA.jpg",
    alt: "First frame",
}
const DEFAULT_LAST_FRAME = {
    src: "https://framerusercontent.com/images/f9RiWoNpmlCMqVRIHz8l8wYfeI.jpg",
    alt: "Last frame",
}
const HERO_CSS = ".admiral-hero-video .ap-video,.admiral-hero-video .ap-last{opacity:0;transition:opacity 180ms linear}.admiral-hero-video[data-video-visible=true] .ap-video{opacity:1}.admiral-hero-video[data-end-visible=true] .ap-last{opacity:1}.admiral-hero-video button:focus-visible{outline:2px solid white;outline-offset:4px}@media(prefers-reduced-motion:reduce){.admiral-hero-video .ap-video,.admiral-hero-video .ap-last{transition:none}}"

interface AdmiralHeroVideoProps {
    videoUrl: string
    mobileVideoUrl: string
    startFrame?: ImageValue
    endFrame?: ImageValue
    autoplay: boolean
    loop: boolean
    muted: boolean
    objectFit: "cover" | "contain" | "fill" | "none" | "scale-down"
    overlay: number
    focalX: number
    focalY: number
    triggerDistance: number
    preloadVideo: boolean
    showControls: boolean
    backgroundColor: string
    buttonTextColor: string
    buttonBackgroundColor: string
    buttonBorderColor: string
    style?: React.CSSProperties
}
/**
 * @framerSupportedLayoutWidth any-prefer-fixed
 * @framerSupportedLayoutHeight any-prefer-fixed
 * @framerIntrinsicWidth 1440
 * @framerIntrinsicHeight 900
 */
export default function AdmiralHeroVideo(props: AdmiralHeroVideoProps): React.JSX.Element {
    const {
        videoUrl = "",
        mobileVideoUrl = "",
        startFrame = DEFAULT_FIRST_FRAME,
        endFrame = DEFAULT_LAST_FRAME,
        autoplay = true,
        loop = false,
        muted = true,
        objectFit = "cover",
        overlay = 0,
        focalX = 50,
        focalY = 50,
        triggerDistance = 18,
        preloadVideo = true,
        showControls = true,
        backgroundColor = "#111111",
        buttonTextColor = "#FFFFFF",
        buttonBackgroundColor = "rgba(0,0,0,.45)",
        buttonBorderColor = "rgba(255,255,255,.5)",
        style,
    } = props
    const firstImage: { src?: string; srcSet?: string; alt?: string } | null | undefined = typeof startFrame === "string" ? { src: startFrame } : startFrame
    const lastImage: { src?: string; srcSet?: string; alt?: string } | null | undefined = typeof endFrame === "string" ? { src: endFrame } : endFrame
    const firstFrameSrc = firstImage?.src || ""
    const lastFrameSrc = lastImage?.src || ""
    const playbackSettings = React.useRef({ loop, muted })
    playbackSettings.current = { loop, muted }
    const rootRef = React.useRef<HTMLDivElement>(null)
    const videoRef = React.useRef<HTMLVideoElement>(null)
    const firstRef = React.useRef<HTMLImageElement>(null)
    const lastRef = React.useRef<HTMLImageElement>(null)
    const playerRef = React.useRef<ReturnType<typeof createHeroPlayer> | null>(
        null
    )
    const staticRenderer = useIsStaticRenderer()
    const [state, setState] = React.useState<HeroState>("idle")
    React.useEffect(() => {
        if (
            staticRenderer ||
            typeof window === "undefined" ||
            !rootRef.current ||
            !videoRef.current ||
            !firstRef.current ||
            !lastRef.current
        )
            return
        const chosenVideo =
            mobileVideoUrl && window.matchMedia("(max-width: 767px)").matches
                ? mobileVideoUrl
                : videoUrl
        const player = createHeroPlayer({
            root: rootRef.current,
            video: videoRef.current,
            startImage: firstRef.current,
            endImage: lastRef.current,
            videoUrl: chosenVideo,
            endUrl: lastFrameSrc,
            threshold: triggerDistance,
            preload: preloadVideo,
            autoplay,
            ...playbackSettings.current,
            onState: (next) => {
                React.startTransition(() => setState(next))
            },
        })
        playerRef.current = player
        return () => {
            player.destroy()
            playerRef.current = null
        }
    }, [
        staticRenderer,
        videoUrl,
        mobileVideoUrl,
        firstFrameSrc,
        lastFrameSrc,
        triggerDistance,
        preloadVideo,
        autoplay,
    ])
    React.useEffect(() => {
        if (!videoRef.current) return
        videoRef.current.loop = loop
    }, [loop])
    React.useEffect(() => {
        if (!videoRef.current) return
        videoRef.current.muted = muted
        videoRef.current.defaultMuted = muted
    }, [muted])
    const mediaStyle: React.CSSProperties = {
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit,
        objectPosition: focalX + "% " + focalY + "%",
        pointerEvents: "none",
    }
    const label =
        state === "playing"
            ? "Pause"
            : state === "ended"
              ? "Replay"
              : state === "loading"
                ? "Pause loading"
                : state === "paused"
                  ? "Resume"
                  : state === "error"
                    ? "Retry"
                    : state === "blocked"
                      ? "Tap to play"
                      : "Play"
    const activate = () => {
        const player = playerRef.current
        if (!player) return
        if (state === "playing" || state === "loading") player.pause()
        else {
            if (state === "ended") player.reset()
            void player.play()
        }
    }
    return (
        <div
            ref={rootRef}
            className="admiral-hero-video"
            style={{
                position: "relative",
                width: "100%",
                height: "100%",
                overflow: "hidden",
                background: backgroundColor,
                ...style,
            }}
        >
            <style>{HERO_CSS}</style>
            <img
                ref={firstRef}
                src={firstFrameSrc || undefined}
                srcSet={firstImage?.srcSet || undefined}
                alt=""
                width={1920}
                height={1013}
                loading="eager"
                decoding="async"
                style={mediaStyle}
            />
            <video
                ref={videoRef}
                className="ap-video"
                muted={muted}
                loop={loop}
                playsInline
                preload="none"
                aria-hidden
                disablePictureInPicture
                style={mediaStyle}
            />
            <img
                ref={lastRef}
                className="ap-last"
                src={lastFrameSrc || undefined}
                srcSet={lastImage?.srcSet || undefined}
                alt=""
                width={1920}
                height={1013}
                decoding="async"
                style={mediaStyle}
            />
            {overlay > 0 && (
                <div
                    aria-hidden
                    style={{
                        position: "absolute",
                        inset: 0,
                        pointerEvents: "none",
                        background: "rgba(0,0,0," + overlay + ")",
                    }}
                />
            )}
            {(showControls || state === "blocked" || state === "error") && (
                <button
                    type="button"
                    onClick={activate}
                    disabled={staticRenderer}
                    aria-label={label + " hero video"}
                    style={{
                        position: "absolute",
                        bottom: 20,
                        right: 20,
                        padding: "9px 14px",
                        color: buttonTextColor,
                        border: "1px solid " + buttonBorderColor,
                        borderRadius: 4,
                        background: buttonBackgroundColor,
                        font: "12px Arial,sans-serif",
                        cursor: "pointer",
                    }}
                >
                    {label}
                </button>
            )}
        </div>
    )
}

AdmiralHeroVideo.displayName = "Hero Video"
AdmiralHeroVideo.defaultProps = {
    videoUrl: "",
    mobileVideoUrl: "",
    startFrame: DEFAULT_FIRST_FRAME,
    endFrame: DEFAULT_LAST_FRAME,
    autoplay: true,
    loop: false,
    muted: true,
    objectFit: "cover" as const,
    overlay: 0,
    focalX: 50,
    focalY: 50,
    triggerDistance: 18,
    preloadVideo: true,
    showControls: true,
    backgroundColor: "#111111",
    buttonTextColor: "#FFFFFF",
    buttonBackgroundColor: "rgba(0,0,0,.45)",
    buttonBorderColor: "rgba(255,255,255,.5)",
}

addPropertyControls(AdmiralHeroVideo, {
    videoUrl: {
        type: ControlType.File,
        title: "Video",
        allowedFileTypes: ["mp4", "webm", "mov"],
    },
    mobileVideoUrl: {
        type: ControlType.File,
        title: "Mobile Video",
        allowedFileTypes: ["mp4", "webm", "mov"],
    },
    startFrame: { type: ControlType.ResponsiveImage, title: "First Frame" },
    endFrame: { type: ControlType.ResponsiveImage, title: "Last Frame" },
    autoplay: {
        type: ControlType.Boolean,
        title: "Autoplay",
        defaultValue: true,
    },
    loop: {
        type: ControlType.Boolean,
        title: "Loop",
        defaultValue: false,
    },
    muted: {
        type: ControlType.Boolean,
        title: "Muted",
        defaultValue: true,
    },
    objectFit: {
        type: ControlType.Enum,
        title: "Object Fit",
        options: ["cover", "contain", "fill", "none", "scale-down"],
        optionTitles: ["Cover", "Contain", "Fill", "None", "Scale Down"],
        defaultValue: "cover",
    },
    showControls: {
        type: ControlType.Boolean,
        title: "Play controls",
        defaultValue: true,
    },
    overlay: {
        type: ControlType.Number,
        title: "Darken",
        min: 0,
        max: 0.8,
        step: 0.01,
        defaultValue: 0,
    },
    focalX: {
        type: ControlType.Number,
        title: "Focal X",
        min: 0,
        max: 100,
        step: 1,
        defaultValue: 50,
    },
    focalY: {
        type: ControlType.Number,
        title: "Focal Y",
        min: 0,
        max: 100,
        step: 1,
        defaultValue: 50,
    },
    triggerDistance: {
        type: ControlType.Number,
        title: "Scroll trigger",
        min: 1,
        max: 100,
        step: 1,
        unit: "px",
        defaultValue: 18,
    },
    preloadVideo: {
        type: ControlType.Boolean,
        title: "Warm video",
        defaultValue: true,
    },
    backgroundColor: {
        type: ControlType.Color,
        title: "Background",
        defaultValue: "#111111",
    },
    buttonTextColor: {
        type: ControlType.Color,
        title: "Btn Text",
        defaultValue: "#FFFFFF",
    },
    buttonBackgroundColor: {
        type: ControlType.Color,
        title: "Btn BG",
        defaultValue: "rgba(0,0,0,.45)",
    },
    buttonBorderColor: {
        type: ControlType.Color,
        title: "Btn Border",
        defaultValue: "rgba(255,255,255,.5)",
    },
})

// @CORE_INSERT
