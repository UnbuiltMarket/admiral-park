
import * as React from "react"
import { addPropertyControls, ControlType, RenderTarget } from "framer"
import { motion } from "framer-motion"

type Chapter = "area" | "overview" | "garden" | "comfort"

interface Props {
    content?: Chapter
    mapAddress?: string
    mapPin?: string
    style?: React.CSSProperties
}

const address = "Aranyhíd sétány 10/A, 8230 Balatonfüred"
const siteMapPin = "46.95666,17.90911"
const gardenFacts = [
    ["268", "új fa"], ["46", "fafajta"],
    ["1 000", "közepes méretű cserje"], ["7 000", "talajtakaró növény"],
]

const styles = [
    '[data-admiral-intro]{box-sizing:border-box;width:100%;container-type:inline-size;font-family:Montserrat,system-ui,sans-serif;color:#233d49}',
    '[data-admiral-intro] *{box-sizing:border-box}',
    '[data-admiral-intro] .ap-card{background:linear-gradient(135deg,#f8fcff 0%,#e7f0f7 58%,#d9e7ee 100%);border:1px solid rgba(51,92,122,.18);border-radius:clamp(20px,3cqi,32px);overflow:hidden;box-shadow:inset 0 1px 0 #fff,0 15px 40px -30px #34536c66}',
    '[data-admiral-intro] .ap-split{display:grid;grid-template-columns:minmax(0,.87fr) minmax(0,1.13fr);align-items:center;min-height:320px}',
    '[data-admiral-intro] .ap-copy{min-width:0;padding:clamp(22px,4.2cqi,46px)}',
    '[data-admiral-intro] .ap-kicker{margin:0 0 12px;color:#335d76;font-size:11px;font-weight:700;letter-spacing:.13em;text-transform:uppercase}',
    '[data-admiral-intro] h2,[data-admiral-intro] h3{margin:0;color:var(--ap-accent);line-height:1.14;font-size:clamp(25px,4cqi,42px);letter-spacing:-.045em;font-weight:650;text-wrap:balance}',
    '[data-admiral-intro] .ap-copy p:not(.ap-kicker){margin:14px 0 0;line-height:1.65;font-size:clamp(14px,1.65cqi,17px);color:#3d5261}',
    '[data-admiral-intro] .ap-art{display:grid;place-items:center;min-width:0;padding:clamp(10px,2.3cqi,28px);background:radial-gradient(ellipse at 35% 28%,#fcfdffe3,transparent 71%);align-self:stretch}',
    '[data-admiral-intro] .ap-art svg{width:100%;height:auto;max-width:660px;display:block}',
    '[data-admiral-intro] .ap-numbers{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:clamp(12px,2.8cqi,24px);margin:24px 0 0}',
    '[data-admiral-intro] .ap-numbers div{border-top:1px solid #9bb6c6;padding-top:12px;display:flex;flex-direction:column;gap:4px}',
    '[data-admiral-intro] .ap-numbers dt{font-size:12px;font-weight:550;color:#3d5261;line-height:1.4}',
    '[data-admiral-intro] .ap-numbers dd{order:-1;margin:0;color:var(--ap-accent);font-size:clamp(26px,4cqi,45px);line-height:1.05;letter-spacing:-.04em;font-weight:650;font-variant-numeric:tabular-nums}',
    '[data-admiral-intro] .ap-garden-art{align-content:center;padding-bottom:22px}',
    '[data-admiral-intro] .ap-green{display:flex;align-items:center;gap:15px;margin-top:20px;color:#285b55;font-size:13px;font-weight:600}',
    '[data-admiral-intro] .ap-green svg{width:50px;height:50px;flex:none}',
    '[data-admiral-intro] .ap-green strong{display:block;font-size:27px;font-variant-numeric:tabular-nums}',
    '[data-admiral-intro] .ap-legend{display:flex;justify-content:center;flex-wrap:wrap;gap:8px 17px;padding:0;margin:4px 0 0;list-style:none;color:#304b5a;font-size:11px;font-weight:600}',
    '[data-admiral-intro] .ap-legend li{display:flex;gap:7px;align-items:center}',
    '[data-admiral-intro] .ap-legend i{width:8px;height:8px;border-radius:50%;border:1px solid #2846564d}',
    '[data-admiral-intro] .ap-caption{color:#3d5261;font-size:11px;margin:7px 0 0;text-align:center}',
    '[data-admiral-intro] .ap-mapviewport{height:clamp(268px,42cqi,420px);overflow:hidden;background:#d6e7ee}',
    '[data-admiral-intro] .ap-mapframe{width:100%;height:100%;border:0;display:block}',
    '[data-admiral-intro] .ap-mapbar{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;padding:clamp(14px,2.4cqi,24px);background:linear-gradient(135deg,#f9fcfe,#e6eff6);border-top:1px solid #afc4d1}',
    '[data-admiral-intro] .ap-address{color:#213d52;font-size:clamp(13px,1.8cqi,16px);font-weight:600}',
    '[data-admiral-intro] .ap-maplink{color:#fff;background:var(--ap-accent);display:inline-flex;align-items:center;justify-content:center;gap:9px;min-height:44px;padding:0 16px;border-radius:999px;text-decoration:none;font-size:13px;font-weight:700}',
    '[data-admiral-intro] .ap-maplink:hover{background:#113652}',
    '[data-admiral-intro] .ap-maplink:focus-visible{outline:2px solid #184a72;outline-offset:4px}',
    '@container (max-width:680px){[data-admiral-intro] .ap-split{grid-template-columns:minmax(0,1fr);min-height:0}[data-admiral-intro] .ap-art{padding:0 clamp(8px,3cqi,22px) 18px}[data-admiral-intro] .ap-numbers{margin-top:18px}[data-admiral-intro] .ap-copy{padding-bottom:14px}}',
    '@container (max-width:390px){[data-admiral-intro] .ap-maplink{width:100%}[data-admiral-intro] .ap-mapbar{padding:15px}[data-admiral-intro] .ap-garden-art{padding-bottom:20px}}',
    '[data-admiral-intro] .ap-card.ap-location-map{border:0;border-radius:0;background:transparent;box-shadow:none;overflow:visible}',
    '[data-admiral-intro] .ap-location-map .ap-mapbar{background:transparent;border-top:0;border-bottom:1px solid #afc4d5;border-radius:0;padding:7px 0;align-items:center}',
    '[data-admiral-intro] .ap-location-map .ap-maplink{background:linear-gradient(145deg,#ffffff,#e8f1f8);color:#145083;min-height:42px;width:auto;border-radius:999px;padding:8px 16px;text-decoration:none;border:1px solid #a6bfd2;font-size:12px;font-weight:600}',
    '[data-admiral-intro] .ap-location-map .ap-maplink:hover{color:#103c61;border-color:#668caa}',
    '[data-admiral-intro] .ap-location-map .ap-address{color:#254863;font-weight:550}',
    '@container(max-width:450px){[data-admiral-intro] .ap-location-map .ap-mapbar{display:flex;flex-wrap:wrap;gap:10px;padding:12px 0 14px}[data-admiral-intro] .ap-location-map .ap-address{display:block}}',
].join("\n")

function FactList({ items }: { items: string[][] }) {
    return <dl className="ap-numbers">{items.map(([value, label]) => (
        <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
    ))}</dl>
}


function LocationMap({ target, pin }: { target: string; pin?: string }) {
    const query = pin?.trim() || (target === address ? siteMapPin : target)
    const encoded = encodeURIComponent(query)
    return <section className="ap-card ap-location-map" aria-label="Az Admiral Park a Google Térképen">
        <div className="ap-mapviewport">
            <iframe className="ap-mapframe"
                title={"Google Térkép műholdnézetben – " + target}
                src={"https://www.google.com/maps?q=" + encoded + "&hl=hu&t=k&z=16&output=embed"}
                referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
        </div>
        <div className="ap-mapbar">
            <span className="ap-address">{target}</span>
            <a className="ap-maplink" target="_blank" rel="noopener noreferrer"
                href={"https://www.google.com/maps?q=" + encoded + "&hl=hu&t=k&z=16"}>
                Megnyitás a Google Térképen
                <svg aria-hidden="true" width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 3h7v7m0-7-8 8m6-1v3H3V5h3" />
                </svg>
            </a>
        </div>
    </section>
}

// @framerSupportedLayoutWidth any-prefer-fixed
// @framerSupportedLayoutHeight auto
// @framerIntrinsicWidth 880
export default function DevelopmentFacts({ content = "area", mapAddress, mapPin, style }: Props) {
    const root = React.useRef<HTMLDivElement>(null)
    const [readyToPlay, setReadyToPlay] = React.useState(false)
    const [seen, setSeen] = React.useState(false)

    React.useEffect(() => {
        if (content === "area" || RenderTarget.current() === RenderTarget.canvas ||
            !root.current || typeof IntersectionObserver === "undefined") return
        const media = window.matchMedia("(prefers-reduced-motion: reduce)")
        let observer: IntersectionObserver | undefined
        const updateMotion = () => {
            observer?.disconnect()
            const enabled = !media.matches
            setReadyToPlay(enabled)
            if (!enabled || !root.current) return
            observer = new IntersectionObserver(([entry]) => {
                if (!entry?.isIntersecting) return
                setSeen(true)
                observer?.disconnect()
            }, { threshold: 0.22 })
            observer.observe(root.current)
        }
        updateMotion()
        media.addEventListener("change", updateMotion)
        return () => {
            observer?.disconnect()
            media.removeEventListener("change", updateMotion)
        }
    }, [content])

    const play = !readyToPlay || seen
    const instant = !readyToPlay
    return <div ref={root} data-admiral-intro="" style={{ ...style, "--ap-accent": "var(--token-OWqJomPzk, #184a72)" } as React.CSSProperties}>
        <style>{styles}</style>
        {content === "area" && <LocationMap target={mapAddress?.trim() || address} pin={mapPin} />}
        {content === "overview" && <section className="ap-card ap-split" aria-label="Az Admiral Park épületei">
            <div className="ap-copy">
                <p className="ap-kicker">Admiral Park</p>
                <h2>Három épület, egy közös kert</h2>
                <p>A külön bejáratú, liftes épületek között a közös kert köti össze a lakótereket.</p>
                <FactList items={[["3", "önálló épület"], ["69", "lakás"]]} />
            </div>
            <div className="ap-art">
                <BuildingPlanArt play={play} instant={instant} />
                <p className="ap-caption">Sematikus tömegábra</p>
            </div>
        </section>}
        {content === "garden" && <section className="ap-card ap-split" aria-label="A kert kialakítása">
            <div className="ap-copy">
                <h3>A kert számokban</h3>
                <div className="ap-green">
                    <svg viewBox="0 0 54 54" aria-hidden="true">
                        <circle cx="27" cy="27" r="21" fill="none" stroke="#bbd2cd" strokeWidth="5.5" />
                        <motion.circle cx="27" cy="27" r="21" fill="none" stroke="#41766e" strokeWidth="5.5"
                            strokeLinecap="round" transform="rotate(-90 27 27)" initial={false}
                            animate={{ pathLength: play ? 0.55 : 0.08 }}
                            transition={{ duration: instant ? 0 : 0.74, ease: "easeOut" }} />
                    </svg>
                    <span><strong>55%</strong> zöldfelület a telken</span>
                </div>
                <FactList items={gardenFacts} />
            </div>
            <div className="ap-art ap-garden-art">
                <GardenPlanArt play={play} instant={instant} />
                <ul className="ap-legend" aria-label="Jelmagyarázat">
                    <li><i style={{ background: "#70a9bb" }} />Medencék</li>
                    <li><i style={{ background: "#e9c890" }} />Játszótér</li>
                    <li><i style={{ background: "#99b8ab" }} />Pihenőhelyek</li>
                </ul>
                <p className="ap-caption">Sematikus kertábra</p>
            </div>
        </section>}
        {content === "comfort" && <section className="ap-card ap-split" aria-label="A lakótér és a terasz kapcsolata">
            <div className="ap-copy">
                <p className="ap-kicker">Lakótér és terasz</p>
                <h3>Fény a kert felől</h3>
                <p>A nagy üvegfelületek a kert felé nyitják a lakóteret. A redőnyök és teraszárnyékolók segítenek szabályozni a beáramló fényt.</p>
            </div>
            <div className="ap-art"><ComfortArt play={play} instant={instant} /></div>
        </section>}
    </div>
}

addPropertyControls(DevelopmentFacts, {
    content: {
        type: ControlType.Enum, title: "Szakasz", defaultValue: "area",
        options: ["area", "overview", "garden", "comfort"],
        optionTitles: ["Google Térkép", "Épületek", "Kert", "Lakótér és terasz"],
    },
    mapAddress: {
        type: ControlType.String, title: "Cím", defaultValue: address,
        hidden: (props: Props) => props.content !== "area",
    },
    mapPin: {
        type: ControlType.String, title: "Térképtű", placeholder: siteMapPin,
        description: "A helyjelölő koordinátái (szélesség, hosszúság). Az Admiral Park címén az üres mező a telek helyjelölőjét használja.",
        hidden: (props: Props) => props.content !== "area",
    },
})

type IntroPlanArtProps = { play: boolean; instant: boolean }

const introPlanFont = "Montserrat, system-ui, sans-serif"
const introPlanInk = "#184a72"
const introPlanSteel = "#396681"
const introPlanTeal = "#41766e"

const introMasses = [
    { label: "B", x: 158, y: 39, w: 134, d: 57 },
    { label: "A", x: 38, y: 55, w: 57, d: 145 },
    { label: "C", x: 355, y: 78, w: 58, d: 143 },
]

const introSitePoint = (x: number, y: number, z = 0) =>
    [99 + 0.84 * x - 0.30 * y, 90 + 0.12 * x + 0.60 * y - z]
const introSitePoints = (points: number[][]) =>
    points.map(([x, y, z = 0]) => introSitePoint(x, y, z).join(",")).join(" ")

function BuildingPlanArt({ play, instant }: IntroPlanArtProps) {
    return (
        <svg viewBox="0 0 560 330" role="img" aria-label="A három Admiral Park épület sematikus tömegábrája" style={{ width: "100%", height: "100%", display: "block" }}>
            <g opacity=".37" fill="none" stroke="#a8becb" strokeWidth="1">
                <path d="M44 110h9m-4.5-4.5v9M505 70h9m-4.5-4.5v9M504 259h9m-4.5-4.5v9M82 283h9m-4.5-4.5v9" />
                <path d="M41 142H521M41 183H521M41 224H521M120 58V277M200 58V277M280 58V277M360 58V277M440 58V277" strokeDasharray="2 7" />
            </g>
            <polygon points={introSitePoints([[0, 0], [473, 0], [473, 235], [0, 235]])} fill="#e8f0f5" stroke="#b0c6d3" strokeWidth="1.5" />
            <path d="M87 242c39 11 47 6 87 16s48 1 84 10 54 2 90 11 49 4 85 12m-322-37c25 5 36 4 58 10s46 4 75 11 55 4 84 12 49 4 76 11" fill="none" stroke="#84b1c8" strokeWidth="1.5" strokeLinecap="round" opacity=".63" />
            <motion.path
                d="M134 196c44-14 60-55 114-44 47 10 79 59 144 77"
                fill="none" stroke="#7ca69d" strokeWidth="3" strokeLinecap="round"
                initial={false} animate={{ pathLength: play ? 1 : 0.12, opacity: play ? 0.8 : 0.35 }}
                transition={{ duration: instant ? 0 : 0.62, ease: "easeOut", delay: instant ? 0 : (0.16)}}
            />
            {introMasses.map(({ label, x, y, w, d }, index) => {
                const z = 49
                const [labelX, labelY] = introSitePoint(x + w / 2, y + d / 2, z)
                return (
                    <motion.g
                        key={label} initial={false}
                        animate={{ opacity: play ? 1 : 0.56, y: play ? 0 : 10 }}
                        transition={{ duration: instant ? 0 : 0.48, ease: [0.22, 1, 0.36, 1], delay: instant ? 0 : (play ? index * 0.10 : 0)}}
                    >
                        <polygon points={introSitePoints([[x + 4, y + 4], [x + w + 8, y + 4], [x + w + 8, y + d + 8], [x + 4, y + d + 8]])} fill="#184a72" opacity=".12" />
                        <polygon points={introSitePoints([[x, y], [x, y + d], [x, y + d, z], [x, y, z]])} fill="#8cacc0" stroke={introPlanSteel} strokeWidth="1.25" strokeLinejoin="round" />
                        <polygon points={introSitePoints([[x, y + d], [x + w, y + d], [x + w, y + d, z], [x, y + d, z]])} fill="#7196af" stroke={introPlanSteel} strokeWidth="1.25" strokeLinejoin="round" />
                        {[12, 24, 36].map(level => (
                            <polyline key={level} points={introSitePoints([[x, y, level], [x, y + d, level], [x + w, y + d, level]])} fill="none" stroke="#e7f0f6" strokeWidth="1.1" opacity=".88" />
                        ))}
                        {[0.23, 0.46, 0.69].map(offset => (
                            <polyline key={offset} points={introSitePoints([[x, y + d * offset, 2], [x, y + d * offset, z - 3]])} fill="none" stroke="#d1e2ec" strokeWidth=".9" opacity=".56" />
                        ))}
                        {[0.25, 0.5, 0.75].map(offset => (
                            <polyline key={offset} points={introSitePoints([[x + w * offset, y + d, 2], [x + w * offset, y + d, z - 3]])} fill="none" stroke="#bad2e1" strokeWidth=".9" opacity=".56" />
                        ))}
                        <polygon points={introSitePoints([[x, y, z], [x + w, y, z], [x + w, y + d, z], [x, y + d, z]])} fill="#f4f8f8" stroke={introPlanSteel} strokeWidth="1.4" strokeLinejoin="round" />
                        <polygon points={introSitePoints([[x + 6, y + 6, z], [x + w - 6, y + 6, z], [x + w - 6, y + d - 6, z], [x + 6, y + d - 6, z]])} fill="#ccdcd8" stroke="#9ebbb8" strokeWidth="1" strokeLinejoin="round" />
                        <circle cx={labelX} cy={labelY} r="15" fill="#f8fafb" stroke={introPlanSteel} strokeWidth="1.2" />
                        <text x={labelX} y={labelY + 5} fontFamily={introPlanFont} fontSize="16" fontWeight="700" textAnchor="middle" fill={introPlanInk}>{label}</text>
                    </motion.g>
                )
            })}
        </svg>
    )
}

const introGardenRoute = "M31 177H79C110 177 138 172 160 182S210 195 234 248M167 183c37 1 55 8 80 8 37 0 63-8 95-7 56 3 88 23 132 15 34-7 25-31 28-62s13-49 44-49M256 190v-54m54 51c8-25 12-47 12-69m24 67c-14 27-26 48-50 59-25 11-46 12-61 3"
const introGardenTrees = [
    [58, 85, 12], [83, 67, 9], [112, 73, 12], [142, 66, 8], [180, 70, 10], [213, 67, 8], [246, 66, 8], [279, 67, 10],
    [308, 66, 8], [341, 68, 11], [371, 68, 8], [480, 72, 10], [510, 76, 8], [519, 149, 9], [518, 170, 11], [510, 211, 9],
    [517, 241, 12], [483, 248, 10], [460, 241, 9], [438, 248, 9], [374, 248, 9], [345, 237, 10], [327, 254, 8], [195, 249, 9],
    [171, 241, 12], [147, 249, 8], [121, 249, 9], [89, 248, 8], [60, 240, 12], [55, 212, 8], [55, 181, 8], [59, 156, 9], [58, 128, 9],
]

function GardenPlanArt({ play, instant }: IntroPlanArtProps) {
    return (
        <svg viewBox="0 0 560 330" role="img" aria-label="Sematikus kertábra: a sétány a három épület között a medencét, a játszórészt és a pihenőhelyeket köti össze" style={{ width: "100%", height: "100%", display: "block" }}>
            <path d="M52 50h461q14 0 14 14v183q0 14-14 14H55l-21-15V66q0-16 18-16Z" fill="#e4eeeb" stroke="#a2bab6" strokeWidth="1.6" />
            <path d="M44 273h474" opacity=".68" stroke="#94b1bc" strokeDasharray="3 5" />
            <path d="M38 291c34 0 37-5 65-5s44 5 69 5 36-5 65-5 43 5 68 5 35-5 65-5 43 5 67 5 36-5 81-5" fill="none" stroke="#91bac7" strokeWidth="2" strokeLinecap="round" />
            <text x="281" y="315" textAnchor="middle" fontFamily={introPlanFont} fontWeight="650" fontSize="17" fill="#396681">Aranyhíd sétány</text>
            <motion.g
                fill="#b8d0c9" stroke="#86a9a0" strokeWidth=".8" initial={false}
                animate={{ opacity: play ? 1 : 0.5 }}
                transition={{ duration: instant ? 0 : 0.40, delay: instant ? 0 : (play ? 0.48 : 0)}}
            >
                {introGardenTrees.map(([cx, cy, r]) => <circle key={cx + "-" + cy} cx={cx} cy={cy} r={r} />)}
            </motion.g>
            <path d={introGardenRoute} fill="none" stroke="#f9fbfa" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
            <motion.path
                d={introGardenRoute} fill="none" stroke="#638a82" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
                initial={false} animate={{ pathLength: play ? 1 : 0.08, opacity: play ? 0.9 : 0.5 }}
                transition={{ duration: instant ? 0 : 0.9, ease: "easeOut" }}
            />
            <g fill="#f7faf9" stroke={introPlanSteel} strokeWidth="1.45" strokeLinejoin="round">
                <path d="M74 101h16v-6h37v6h13v128h-14v7H90v-7H74Z" />
                <path d="M184 83h126v7h11v47h-11v7H184v-8h-11V91h11Z" />
                <path d="M391 113h12v-7h36v7h14v128h-14v6h-36v-6h-12Z" />
            </g>
            <g fill="none" stroke="#abc0cc" strokeWidth="1">
                <path d="M84 124h45m-45 23h45m-45 41h45m-45 23h45M108 101v127M191 103h111m-111 20h111m-79-36v53m44-53v53M401 135h43m-43 25h43m-43 42h43m-43 23h43m-21-112v127" />
            </g>
            <g fontFamily={introPlanFont} fontWeight="750" fontSize="17" fill={introPlanInk} textAnchor="middle">
                <text x="106" y="172">A</text>
                <text x="250" y="116">B</text>
                <text x="422" y="184">C</text>
            </g>
            <motion.g initial={false} animate={{ opacity: play ? 1 : 0.55, y: play ? 0 : 5 }} transition={{ duration: instant ? 0 : 0.43, ease: "easeOut", delay: instant ? 0 : (play ? 0.50 : 0)}}>
                <rect x="238" y="205" width="25" height="38" rx="3" fill="#70a9bb" stroke="#3d7990" strokeWidth="1.4" />
                <path d="M243 216q4-3 7 0t8 0m-15 6q4-3 7 0t8 0m-15 6q4-3 7 0t8 0" stroke="#fff" strokeWidth="1.2" fill="none" strokeLinecap="round" />
                <path d="M278 232c4-4 11-2 12 3 2 7-5 12-11 8s-5-7-1-11Z" fill="#79afbf" stroke="#4b8094" strokeWidth="1" />
            </motion.g>
            <motion.g initial={false} animate={{ opacity: play ? 1 : 0.55, y: play ? 0 : 5 }} transition={{ duration: instant ? 0 : 0.43, ease: "easeOut", delay: instant ? 0 : (play ? 0.60 : 0)}}>
                <path d="M327 210c6-8 24-9 33 0s1 17-12 19-28-9-21-19Z" fill="#e9c890" stroke="#b08448" strokeWidth="1.2" />
                <path d="m339 219 5-10 5 10m-8-4h6" stroke="#926c39" fill="none" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M153 197c8-6 22-7 28-1s-1 17-10 16-24-8-18-15Z" fill="#99b8ab" stroke="#688f82" strokeWidth="1" />
                <path d="M471 222c8-6 22-5 27 1s0 15-12 14-22-10-15-15Z" fill="#99b8ab" stroke="#688f82" strokeWidth="1" />
                <path d="M160 203h13m304 25h13" stroke={introPlanTeal} strokeWidth="2" strokeLinecap="round" />
            </motion.g>
        </svg>
    )
}

function ComfortArt({ play, instant }: IntroPlanArtProps) {
    const id = React.useId()
    const glazing = `comfort-glazing-${id}`
    const floor = `comfort-floor-${id}`
    const lineTransition = { duration: instant ? 0 : 0.85, ease: "easeOut" as const }

    return (
        <svg
            viewBox="0 0 640 420"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="A nappali és a terasz kapcsolata, a nagy üvegfelületeken át beáramló nappali fénnyel"
            style={{ display: "block", width: "100%", height: "auto", overflow: "visible" }}
        >
            <defs>
                <linearGradient id={glazing} x1="0" x2="1" y1="1" y2="0">
                    <stop stopColor="#89aec8" stopOpacity=".32" />
                    <stop offset=".62" stopColor="#d3e8f4" stopOpacity=".73" />
                    <stop offset="1" stopColor="#f8fafb" stopOpacity=".9" />
                </linearGradient>
                <linearGradient id={floor} x1="0" x2="1" y1="0" y2="1">
                    <stop stopColor="#f3f7fa" />
                    <stop offset="1" stopColor="#c8dbe8" />
                </linearGradient>
            </defs>

            <g fill="none" stroke="#7a9bb4" strokeOpacity=".23" strokeWidth="1">
                <path d="M62 258H551M79 280H572M101 304H596M125 328H608M150 352H612" />
                <path d="M86 247L188 363M158 247L260 363M231 247L333 363M304 247L406 363M377 247L479 363M450 247L552 363M523 247L625 363" />
            </g>

            <motion.g
                initial={false}
                animate={play ? { y: [12, 0] } : { y: 0 }}
                transition={{ duration: instant ? 0 : 0.6, ease: "easeOut" }}
                fill="none"
                stroke="#396681"
                strokeWidth="1.5"
                strokeLinejoin="round"
            >
                <path d="M114 249L499 249L590 345V356H204L114 260Z" fill="#9bb8cd" />
                <path d="M114 249H499L590 345H204Z" fill={`url(#${floor})`} />
                <path d="M330 249H499L590 345H420Z" fill="#e6edf0" />
                <path d="M347 268H516M365 287H535M383 306H553M401 325H571" strokeOpacity=".37" />
                <path d="M204 345H590M204 345V356" strokeOpacity=".58" />
                <path d="M114 249V105H330V249Z" fill="#f8fafb" />
                <path d="M114 105H330L420 200H204Z" fill="#e0ebf1" fillOpacity=".28" strokeDasharray="4 5" />
                <path d="M114 105L204 200V345" strokeOpacity=".37" />
                <path d="M114 249H330L420 345" strokeWidth="2" />

                <path d="M153 266H252L292 309H193Z" fill="#d2e2eb" strokeOpacity=".4" />
                <path d="M147 244V219H244L265 241V268H169Z" fill="#9fb9ca" />
                <path d="M147 219H244L265 241H169Z" fill="#e0ebf1" />
                <path d="M169 241H265V258H169Z" fill="#f8fafb" />
                <path d="M201 241L181 219M232 241L212 219M169 258V267M256 258V267" strokeOpacity=".7" />
                <path d="M262 283H299L315 300H278Z" fill="#f8fafb" />
                <path d="M279 300V309M310 300V307" strokeOpacity=".7" />

                <path d="M498 249V217L590 313V345Z" fill="#b5d0e0" fillOpacity=".22" />
                <path d="M498 217L590 313M529 250V281M560 282V314M589 314V345" />
                <path d="M455 304H499L515 321H471Z" fill="#a9bfce" />
                <path d="M471 321V330M512 321V329" />
                <path d="M468 278H486L483 294H471Z" fill="#f8fafb" />
                <path d="M477 278Q459 267 470 264Q476 262 477 278Q488 259 492 268Q491 274 477 278Z" fill="#7f9a84" strokeWidth="1" />
            </motion.g>

            <motion.g
                initial={false}
                animate={play ? { y: [-13, 0], opacity: [0.45, 1] } : { y: 0, opacity: 1 }}
                transition={{ duration: instant ? 0 : 0.8, delay: instant ? 0 : (0.13), ease: "easeOut" }}
                stroke="#184a72"
                strokeWidth="1.65"
                strokeLinejoin="round"
            >
                <path d="M330 105L420 200V345L330 249Z" fill={`url(#${glazing})`} />
                <path d="M360 137V281M390 169V313M330 170L420 265" fill="none" strokeOpacity=".62" />
                <path d="M338 170V143M338 190V177M368 216V165M398 231V204" fill="none" stroke="#f8fafb" strokeWidth="3" strokeLinecap="round" strokeOpacity=".9" />
                <path d="M415 270V282" fill="none" strokeLinecap="round" />
            </motion.g>

            <g fill="none" stroke="#b58753" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="546" cy="132" r="13" />
                <path d="M546 109V102M546 155V162M523 132H516M569 132H576M529 115L524 110M563 115L568 110M563 149L568 154M529 149L524 154" />
                <motion.path
                    d="M522 151L380 218L267 265M521 165L383 243L306 276"
                    strokeDasharray="3 6"
                    initial={false}
                    animate={play ? { pathLength: [0, 1], opacity: [0, 0.85] } : { pathLength: 1, opacity: 0.85 }}
                    transition={{ ...lineTransition, delay: instant ? 0 : (0.33)}}
                />
            </g>

            <g fill="none" stroke="#184a72" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round">
                <motion.path
                    d="M380 167L353 69H447M240 299L169 375H74M519 310L537 375H609"
                    initial={false}
                    animate={play ? { pathLength: [0, 1] } : { pathLength: 1 }}
                    transition={{ ...lineTransition, delay: instant ? 0 : (0.4)}}
                />
                <circle cx="380" cy="167" r="4" fill="#f8fafb" />
                <circle cx="240" cy="299" r="4" fill="#f8fafb" />
                <circle cx="519" cy="310" r="4" fill="#f8fafb" />
            </g>
            <g fill="#184a72" fontSize="22" fontWeight="600" fontFamily="inherit">
                <text x="358" y="57">Nagy üvegfelületek</text>
                <text x="74" y="403">Nappali</text>
                <text x="609" y="403" textAnchor="end">Terasz</text>
            </g>
        </svg>
    )
}
