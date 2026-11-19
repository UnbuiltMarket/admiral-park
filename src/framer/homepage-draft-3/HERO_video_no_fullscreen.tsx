// Generated Framer homepage. Requires AdmiralApartmentDetailCard.tsx in the same Framer project.
import * as React from "react"
import type { ComponentType } from "react"
import { addPropertyControls, ControlType, useIsStaticRenderer } from "framer"
// Project-local Framer import; the MCP single-file checker cannot resolve sibling files.
// @ts-ignore -- the existing sibling file is resolved by Framer at runtime.
import AdmiralApartmentDetailCard, { normalizeAdmiralFavorites, toggleAdmiralFavorite } from "./AdmiralApartmentDetailCard.tsx"

// @ts-ignore -- the Framer single-file checker does not resolve project-local modules.
import { admiralPalette } from "./AdmiralPalette.tsx"
// @ts-ignore -- resolved by Framer alongside this code file.
import AdmiralScrollCue from "./AdmiralScrollCue.tsx"

const HOMEPAGE_LIGHTING_ATLAS_URL = "https://framerusercontent.com/images/DxiRVoqzN1ZiE2KVkOho93CuQV0.webp"
const HOMEPAGE_LIGHTING_DATA_URL = "https://framerusercontent.com/assets/z7Sd93G28iAn2iOVsGRmivrt4Q.json"

/** Keep CSS raw text identical between React SSR and client hydration. */
function homepageStyleMarkup(css: string): { __html: string } {
    return { __html: css.replace(/<\/style/gi, "<\\/style") }
}

const HOMEPAGE_HERO_NAMES: string[] = [
    "raw sequence00.avif",
    "raw sequence01.avif",
    "raw sequence02.avif",
    "raw sequence03.avif",
    "raw sequence04.avif",
    "raw sequence05.avif",
    "raw sequence06.avif",
    "raw sequence07.avif",
    "raw sequence08.avif",
    "raw sequence09.avif",
    "raw sequence10.avif",
    "raw sequence11.avif",
    "raw sequence12.avif",
    "raw sequence13.avif",
    "raw sequence14.avif",
    "raw sequence15.avif",
    "raw sequence16.avif",
    "raw sequence17.avif",
    "raw sequence18.avif",
    "raw sequence19.avif",
    "raw sequence20.avif",
    "raw sequence21.avif",
    "raw sequence22.avif",
    "raw sequence23.avif",
    "raw sequence24.avif",
    "raw sequence25.avif",
    "raw sequence26.avif",
    "raw sequence27.avif",
    "raw sequence28.avif",
    "raw sequence29.avif",
    "raw sequence30.avif",
    "raw sequence31.avif",
    "raw sequence32.avif",
    "raw sequence33.avif",
    "raw sequence34.avif",
    "raw sequence35.avif",
    "raw sequence36.avif",
    "raw sequence37.avif",
    "raw sequence38.avif",
    "raw sequence39.avif",
    "raw sequence40.avif",
    "raw sequence41.avif",
    "raw sequence42.avif",
    "raw sequence43.avif",
    "raw sequence44.avif",
    "raw sequence45.avif",
    "raw sequence46.avif",
    "raw sequence47.avif",
    "raw sequence48.avif",
    "raw sequence49.avif",
    "raw sequence50.avif",
    "raw sequence51.avif",
    "raw sequence52.avif",
    "raw sequence53.avif",
    "raw sequence54.avif",
    "raw sequence55.avif",
    "raw sequence56.avif",
    "raw sequence57.avif",
    "raw sequence58.avif",
    "raw sequence59.avif",
    "raw sequence60.avif",
    "raw sequence61.avif",
    "raw sequence62.avif",
    "raw sequence63.avif",
    "raw sequence64.avif",
]
const HOMEPAGE_CONNECTION_NAMES: string[] = [
    "02 sequence00 copy.avif",
    "02 sequence01 copy.avif",
    "02 sequence02 copy.avif",
    "02 sequence03 copy.avif",
    "02 sequence04 copy.avif",
    "02 sequence05 copy.avif",
    "02 sequence06 copy.avif",
    "02 sequence07 copy.avif",
    "02 sequence08 copy.avif",
    "02 sequence09 copy.avif",
    "02 sequence10 copy.avif",
    "02 sequence11 copy.avif",
    "02 sequence12 copy.avif",
    "02 sequence13 copy.avif",
    "02 sequence14 copy.avif",
    "02 sequence15 copy.avif",
    "02 sequence16 copy.avif",
    "02 sequence17 copy.avif",
    "02 sequence18 copy.avif",
    "02 sequence19 copy.avif",
    "02 sequence20 copy.avif",
    "02 sequence21 copy.avif",
    "02 sequence22 copy.avif",
    "02 sequence23 copy.avif",
    "02 sequence24 copy.avif",
    "02 sequence25 copy.avif",
    "02 sequence26 copy.avif",
    "02 sequence27 copy.avif",
    "02 sequence28 copy.avif",
    "02 sequence29 copy.avif",
    "02 sequence30 copy.avif",
    "02 sequence31 copy.avif",
    "02 sequence32 copy.avif",
    "02 sequence33 copy.avif",
    "02 sequence34 copy.avif",
    "02 sequence35 copy.avif",
    "02 sequence36 copy.avif",
    "02 sequence37 copy.avif",
    "02 sequence38 copy.avif",
    "02 sequence39 copy.avif",
    "02 sequence40 copy.avif",
    "02 sequence41 copy.avif",
    "02 sequence42 copy.avif",
    "02 sequence43 copy.avif",
    "02 sequence44 copy.avif",
    "02 sequence45 copy.avif",
    "02 sequence46 copy.avif",
    "02 sequence47 copy.avif",
    "02 sequence48 copy.avif",
    "02 sequence49 copy.avif",
    "02 sequence50 copy.avif",
    "02 sequence51 copy.avif",
    "02 sequence52 copy.avif",
    "02 sequence53 copy.avif",
    "02 sequence54 copy.avif",
    "02 sequence55 copy.avif",
    "02 sequence56 copy.avif",
    "02 sequence57 copy.avif",
    "02 sequence58 copy.avif",
    "02 sequence59 copy.avif",
    "02 sequence60 copy.avif",
    "02 sequence61 copy.avif",
    "02 sequence62 copy.avif",
    "02 sequence63 copy.avif",
    "02 sequence64 copy.avif",
    "02 sequence65 copy.avif",
    "02 sequence66 copy.avif",
    "02 sequence67 copy.avif",
    "02 sequence68 copy.avif",
    "02 sequence69 copy.avif",
    "02 sequence70 copy.avif",
    "02 sequence71 copy.avif",
    "02 sequence72 copy.avif",
]
const HOMEPAGE_ORBIT_NAMES: string[] = [
    "or_030000 copy.avif",
    "or_030001 copy.avif",
    "or_030002 copy.avif",
    "or_030003 copy.avif",
    "or_030004 copy.avif",
    "or_030005 copy.avif",
    "or_030006 copy.avif",
    "or_030007 copy.avif",
    "or_030008 copy.avif",
    "or_030009 copy.avif",
    "or_030010 copy.avif",
    "or_030011 copy.avif",
    "or_030012 copy.avif",
    "or_030013 copy.avif",
    "or_030014 copy.avif",
    "or_030015 copy.avif",
    "or_030016 copy.avif",
    "or_030017 copy.avif",
    "or_030018 copy.avif",
    "or_030019 copy.avif",
    "or_030020 copy.avif",
    "or_030021 copy.avif",
    "or_030022 copy.avif",
    "or_030023 copy.avif",
    "or_030024 copy.avif",
    "or_030025 copy.avif",
    "or_030026 copy.avif",
    "or_030027 copy.avif",
    "or_030028 copy.avif",
    "or_030029 copy.avif",
    "or_030030 copy.avif",
    "or_030031 copy.avif",
    "or_030032 copy.avif",
    "or_030033 copy.avif",
    "or_030034 copy.avif",
    "or_030035 copy.avif",
    "or_030036 copy.avif",
    "or_030037 copy.avif",
    "or_030038 copy.avif",
    "or_030039 copy.avif",
    "or_030040 copy.avif",
    "or_030041 copy.avif",
    "or_030042 copy.avif",
    "or_030043 copy.avif",
    "or_030044 copy.avif",
    "or_030045 copy.avif",
    "or_030046 copy.avif",
    "or_030047 copy.avif",
    "or_030048 copy.avif",
    "or_030049 copy.avif",
    "or_030050 copy.avif",
    "or_030051 copy.avif",
    "or_030052 copy.avif",
    "or_030053 copy.avif",
    "or_030054 copy.avif",
    "or_030055 copy.avif",
    "or_030056 copy.avif",
    "or_030057 copy.avif",
    "or_030058 copy.avif",
    "or_030059 copy.avif",
    "or_030060 copy.avif",
    "or_030061 copy.avif",
    "or_030062 copy.avif",
    "or_030063 copy.avif",
    "or_030064 copy.avif",
    "or_030065 copy.avif",
    "or_030066 copy.avif",
    "or_030067 copy.avif",
    "or_030068 copy.avif",
    "or_030069 copy.avif",
    "or_030070 copy.avif",
    "or_030071 copy.avif",
    "or_030072 copy.avif",
    "or_030073 copy.avif",
    "or_030074 copy.avif",
    "or_030075 copy.avif",
    "or_030076 copy.avif",
    "or_030077 copy.avif",
    "or_030078 copy.avif",
    "or_030079 copy.avif",
    "or_030080 copy.avif",
    "or_030081 copy.avif",
    "or_030082 copy.avif",
    "or_030083 copy.avif",
    "or_030084 copy.avif",
    "or_030085 copy.avif",
    "or_030086 copy.avif",
    "or_030087 copy.avif",
    "or_030088 copy.avif",
    "or_030089 copy.avif",
    "or_030090 copy.avif",
    "or_030091 copy.avif",
    "or_030092 copy.avif",
    "or_030093 copy.avif",
    "or_030094 copy.avif",
    "or_030095 copy.avif",
    "or_030096 copy.avif",
    "or_030097 copy.avif",
    "or_030098 copy.avif",
    "or_030099 copy.avif",
    "or_030100 copy.avif",
    "or_030101 copy.avif",
    "or_030102 copy.avif",
    "or_030103 copy.avif",
    "or_030104 copy.avif",
    "or_030105 copy.avif",
    "or_030106 copy.avif",
    "or_030107 copy.avif",
    "or_030108 copy.avif",
    "or_030109 copy.avif",
    "or_030110 copy.avif",
    "or_030111 copy.avif",
    "or_030112 copy.avif",
    "or_030113 copy.avif",
    "or_030114 copy.avif",
    "or_030115 copy.avif",
    "or_030116 copy.avif",
    "or_030117 copy.avif",
    "or_030118 copy.avif",
    "or_030119 copy.avif",
]
const HOMEPAGE_MASK_NAMES: string[] = [
    "mask_CMasking_WireColor0000.png",
    "mask_CMasking_WireColor0015.png",
    "mask_CMasking_WireColor0030.png",
    "mask_CMasking_WireColor0045.png",
    "mask_CMasking_WireColor0060.png",
    "mask_CMasking_WireColor0075.png",
    "mask_CMasking_WireColor0090.png",
    "mask_CMasking_WireColor0105.png",
]
const HOMEPAGE_MASK_PALETTE: {
    id: string
    maskColor: string
    maskColorAliases?: string[]
}[] = [
    { id: "A001", maskColor: "#63BBF1", maskColorAliases: ["#63BAF0"] },
    { id: "A002", maskColor: "#F1BB63", maskColorAliases: ["#F0BA63"] },
    { id: "A003", maskColor: "#63F163", maskColorAliases: ["#63F063"] },
    { id: "A004", maskColor: "#F163F1", maskColorAliases: ["#F063F0"] },
    {
        id: "A005",
        maskColor: "#9763BB",
        maskColorAliases: ["#9663BA", "#9763BA"],
    },
    { id: "A006", maskColor: "#BBD8BB", maskColorAliases: ["#BAD7BA"] },
    {
        id: "A101",
        maskColor: "#63BB97",
        maskColorAliases: ["#63BA96", "#63BA97"],
    },
    { id: "A102", maskColor: "#63F1D8", maskColorAliases: ["#63F0D7"] },
    { id: "A103", maskColor: "#BB6363", maskColorAliases: ["#BA6363"] },
    {
        id: "A104",
        maskColor: "#BB97F1",
        maskColorAliases: ["#BA96F0", "#BA97F0"],
    },
    { id: "A105", maskColor: "#BBF1F1", maskColorAliases: ["#BAF0F0"] },
    {
        id: "A106",
        maskColor: "#D897BB",
        maskColorAliases: ["#D796BA", "#D797BA"],
    },
    { id: "A107", maskColor: "#D8F163", maskColorAliases: ["#D7F063"] },
    { id: "A201", maskColor: "#F1D8D8", maskColorAliases: ["#F0D7D7"] },
    { id: "A202", maskColor: "#6363F1", maskColorAliases: ["#6363F0"] },
    { id: "A203", maskColor: "#BBBB63", maskColorAliases: ["#BABA63"] },
    { id: "A204", maskColor: "#F16363", maskColorAliases: ["#F06363"] },
    { id: "A205", maskColor: "#636397", maskColorAliases: ["#636396"] },
    { id: "A301", maskColor: "#639763", maskColorAliases: ["#639663"] },
    {
        id: "A302",
        maskColor: "#6397BB",
        maskColorAliases: ["#6396BA", "#6397BA"],
    },
    { id: "A303", maskColor: "#63D8BB", maskColorAliases: ["#63D7BA"] },
    { id: "A304", maskColor: "#979797", maskColorAliases: ["#969696"] },
    {
        id: "B001",
        maskColor: "#9797D8",
        maskColorAliases: ["#9696D7", "#9797D7"],
    },
    {
        id: "B002",
        maskColor: "#97BBBB",
        maskColorAliases: ["#96BABA", "#97BABA"],
    },
    {
        id: "B003",
        maskColor: "#97D863",
        maskColorAliases: ["#96D763", "#97D763"],
    },
    {
        id: "B004",
        maskColor: "#97D8D8",
        maskColorAliases: ["#96D7D7", "#97D7D7"],
    },
    {
        id: "B005",
        maskColor: "#97F197",
        maskColorAliases: ["#96F096", "#97F097"],
    },
    { id: "B006", maskColor: "#BB63D8", maskColorAliases: ["#BA63D7"] },
    { id: "B101", maskColor: "#BBBBD8", maskColorAliases: ["#BABAD7"] },
    {
        id: "B102",
        maskColor: "#D86397",
        maskColorAliases: ["#D76396", "#D76397"],
    },
    {
        id: "B103",
        maskColor: "#D89763",
        maskColorAliases: ["#D79663", "#D79763"],
    },
    {
        id: "B104",
        maskColor: "#D8BB97",
        maskColorAliases: ["#D7BA96", "#D7BA97"],
    },
    { id: "B105", maskColor: "#D8BBF1", maskColorAliases: ["#D7BAF0"] },
    { id: "B106", maskColor: "#D8F1BB", maskColorAliases: ["#D7F0BA"] },
    { id: "B107", maskColor: "#F163BB", maskColorAliases: ["#F063BA"] },
    {
        id: "B201",
        maskColor: "#F19797",
        maskColorAliases: ["#F09696", "#F09797"],
    },
    {
        id: "B202",
        maskColor: "#F197D8",
        maskColorAliases: ["#F096D7", "#F097D7"],
    },
    { id: "B203", maskColor: "#F1BBBB", maskColorAliases: ["#F0BABA"] },
    {
        id: "B204",
        maskColor: "#F1D897",
        maskColorAliases: ["#F0D796", "#F0D797"],
    },
    { id: "B205", maskColor: "#F1F1F1", maskColorAliases: ["#F0F0F0"] },
    { id: "B206", maskColor: "#636363" },
    { id: "B207", maskColor: "#6363BB", maskColorAliases: ["#6363BA"] },
    { id: "B301", maskColor: "#6363D8", maskColorAliases: ["#6363D7"] },
    { id: "B302", maskColor: "#639797", maskColorAliases: ["#639696"] },
    {
        id: "B303",
        maskColor: "#6397D8",
        maskColorAliases: ["#6396D7", "#6397D7"],
    },
    {
        id: "B304",
        maskColor: "#6397F1",
        maskColorAliases: ["#6396F0", "#6397F0"],
    },
    { id: "C001", maskColor: "#63BB63", maskColorAliases: ["#63BA63"] },
    { id: "C002", maskColor: "#63BBBB", maskColorAliases: ["#63BABA"] },
    { id: "C003", maskColor: "#63BBD8", maskColorAliases: ["#63BAD7"] },
    { id: "C004", maskColor: "#63D863", maskColorAliases: ["#63D763"] },
    {
        id: "C005",
        maskColor: "#63D897",
        maskColorAliases: ["#63D796", "#63D797"],
    },
    { id: "C006", maskColor: "#63D8D8", maskColorAliases: ["#63D7D7"] },
    { id: "C007", maskColor: "#63D8F1", maskColorAliases: ["#63D7F0"] },
    {
        id: "C008",
        maskColor: "#63F197",
        maskColorAliases: ["#63F096", "#63F097"],
    },
    { id: "C101", maskColor: "#63F1BB", maskColorAliases: ["#63F0BA"] },
    { id: "C102", maskColor: "#63F1F1", maskColorAliases: ["#63F0F0"] },
    { id: "C103", maskColor: "#976363", maskColorAliases: ["#966363"] },
    { id: "C104", maskColor: "#976397", maskColorAliases: ["#966396"] },
    {
        id: "C105",
        maskColor: "#9763D8",
        maskColorAliases: ["#9663D7", "#9763D7"],
    },
    {
        id: "C106",
        maskColor: "#9763F1",
        maskColorAliases: ["#9663F0", "#9763F0"],
    },
    { id: "C201", maskColor: "#979763", maskColorAliases: ["#969663"] },
    {
        id: "C202",
        maskColor: "#9797BB",
        maskColorAliases: ["#9696BA", "#9797BA"],
    },
    {
        id: "C203",
        maskColor: "#9797F1",
        maskColorAliases: ["#9696F0", "#9797F0"],
    },
    {
        id: "C204",
        maskColor: "#97BB63",
        maskColorAliases: ["#96BA63", "#97BA63"],
    },
    {
        id: "C205",
        maskColor: "#97BB97",
        maskColorAliases: ["#96BA96", "#97BA97"],
    },
    {
        id: "C301",
        maskColor: "#97BBD8",
        maskColorAliases: ["#96BAD7", "#97BAD7"],
    },
    {
        id: "C302",
        maskColor: "#97BBF1",
        maskColorAliases: ["#96BAF0", "#97BAF0"],
    },
    {
        id: "C303",
        maskColor: "#97D897",
        maskColorAliases: ["#96D796", "#97D797"],
    },
    {
        id: "C304",
        maskColor: "#97D8BB",
        maskColorAliases: ["#96D7BA", "#97D7BA"],
    },
]
const HOMEPAGE_HERO_VERSION = "1d4b64cbfa4f"
const HOMEPAGE_HERO_VIDEO = "https://framerusercontent.com/assets/onxwvQct3TBTm6WVR33HaBWHo.mp4"
const HOMEPAGE_HERO_VIDEO_START = "https://framerusercontent.com/images/sxlVxZ6PtNJDscul3QBquRGeK0k.avif"
// A 256px rendering of the same opening AVIF, available in the first HTML paint.
const HOMEPAGE_HERO_PREVIEW = "data:image/webp;base64,UklGRoQNAABXRUJQVlA4IHgNAACwRwCdASoAAYcAPtlgp06oJaQpqjobATAbCWUIkYwBsjeAb1Py/K38PwgM+O5VFkFxA9X3n7/+BhiQ9Vy5uVt9lMhpu3mK+5hWG9QdKVsghJWXbf1zibO/ZOfMW2yMKtfE1vZn5jLt1iPYbF8Ba9kdkLGKOrY5S7tOMqpleOaFGKKyrDb8wXJ4GdNRiH/2jucGTVnXTl4B/iiWiTjjhAuQ89stIhe2aeNOb5pEwa6PCpwNREPEQNAuHwobViezwJKmWdvWpwoEjGf22t7Ge4amQon2CL+rj5+CmfrnUE20K3Fby6EtTd3f+FKBP/RMrUeGWAOs69K5ZyLtyTVIq92bXcfUxInC4n2a643wWH8Ho/QYl/BgXrQCrJiXD1cuZIo6LsMLJ5/NV7EuXf4OT5gnU1+zcIQytIBSf5wjoH2exP9o+0IMIMwVWtCok6K8I0BELaylIGEfBHw5AuIg/HeHeIgwZG1CsRjAyzy6NdX5HOZTV+cVw8JfhOtAeVRqQ6ENho28ld1MXns4Cel7p6P/EMImXd6xmu2nqa5gp6cik5gtPuQlQ0pIbWNa+B6v1fd9TrX6XRH7CeZnUl1C/jusNVPRNIMe+KSrtxGf6gVOwTKa16YkPZAdxdO9rOt2yyaY7cml6U8DdCOdjRP4lnEiuYZfQ8A1USZ4BWQnBnYl5vyeANn05eNIWu3Iwr3MozH3qP6q6YPyFj8HycrCX5f2xOq3gy4nYYrMyAmsYHgKUDnJTfptD7n8gUidhPssS/FYU2oQiGYA/dKLtYc59H8v3Q3ZF5qVZAbftquomhfIm/hGaQXsimq6nSI8lrZId1cr4JB/92GDNNC7OYFj7DxgDg4zFZZPH05udZ3K+M+6/2z0YjkyFxNHv8du2+Jp8Z2YpHsmJJWBzMxbqCm+vQD4iM9HBc5GyBuQVEalTD7aWxU2QCe0/lHZ5TKOf4IZ5OBngskF1X0LaweyLyVwhZNpj1ex2ud/RFVY4e9eRx60q3VPgR8yV8rt81iXMPlT3n6VmeIWJTdHuETlJXu3K1SRmiOo5hC9tuonkptOi4SGpxSY8vwPhjoXMfzlWWcaMtPFxvsTidhaBIy4fy0iAE2FSqFDiEX9AZArraR5ll1pvm/Q55cQoel39egwGKlRgiEaEEjkq2u9q0BdYkRPY2uT05V3POVuZOab1luQX4jqQvHy/CgJZJxjjLh8JfGb9G14o4MDlweMmfZf4chGj3Nn42BOiIMQeRbC47cm7EDIJBEUMw1oVsdtTQtTs9U7u+tv0Tee7lMyjsIJi6g3JTt2fqVNIJs+2AdgpfX4ZTAYXQzc5pnpytOBEDFPp2BaXpAZpTjUAUkITu0En/OOKaDZj/hKvYb9AKNCta2t/SHwBWtmw1CL3PC615jxXTYqYnY06h/1hp2vwg2v05FQTCy+bvmyQlscNG6psw3L+GcCGCaW6vwF93ECwEjqEsgkgpIYCE1kT1Uxaq63/TV+c2sbo4Wodd7VOhSVOmriio5BZi6pMzBHNvWSXcqtSvHAA3Bb+zgqUqQ/1Rqx9K8mYDW6Vfb/p/UJbuoZvhcBzAw/H42vBM2ZapQC8ThwJg3EuLQMqWdGLcG0GAMAe0IL1uk87BRCuID9snsy/qXjb1WVGGnVbwmxKZc35BA6Pms3gK5PnU8ROb0uQMlRFbOVbnn275kY+BWysSAfqtGSXOUqkOmgDesmZoFPUvFREAAwUBvTr6+hJK3kBnTeFHCMQNquNHKZz+Dcy+gArCjzbVrdh7Shf8NA55t1TOvWsGA6KbLCnwlem3RurmFhxxvQ3udhRF/yAHaYgKNe945VRtF8/5bpeDpFZlrdTHgKPUTLzZJ6GvkyQQnJ68tebvNhnTGzTnrBpObRMN40vvlyrEiHegR2klCMaHZ3VKAmE6h6WVtnL4se63mU86qP/RA1i73PIbqqXA9ic1yzFuwGxdeCvLu9ikGojKRhVX+ivz2jeIueQ7Hf5vGl+gyGEveCTim63EINXQMJbcQcCpoSJUongv+olGBC213e5BLRAzgn4aGS/0YXJhnJVjpR9G+1bC+Z1bBWvGyKdDJ+N7fHBm6ziYC0KPasZhyFFKN11tEkD/QpFqDRBI4RgDt9bVnEBcomzaSQLyJTFWR9+HQpE7+bF1DfpQKY41t+1Hbi5RO55JveOhFbOti4X9Mmv0UPLkDW5ZJxDYSqXX+1y5lqxlPRyNtR7Stb8MlL3GcwEilx0T+kdCZ2R8fiFs37wIX6UHVdVRr4pVP0c5bcHA3cfSRyd+5/dKuwHyq0UmDakh1a6QBDCqokv7MaC29pnW5GUr30JmKuU0DItfsAbvuYrabTo6dK2XGPrtAu5D9kG6WXENg5VMnk4T5FX4iMFMrg3AgnLR/ueajTyDtBwt0D40GNo/HZxHwFtqCENzRbaTRu138knBWEzGagbfzbbRgq6vTDK34lw0m7kgxnDoMq13xa4aa4tovp10LWYVgiNLitDn0fQVJeUsTjmJoSyp51z8v3wcq6LuPqRd4Ry0Q5Ng7aenHrHkoOgMSP6MS/KoWPcmsuXexsd7rI+HKk9KwTzmBK1xvnrDPVSuFi+8Ej5HnrqdLUg2hAjNLFIBsN0PngHCjU6lVCfTxhrGMaRvcHkybbWAFHTalapBy7HZvaMjN5itM3IexGqKmuGqLscDzH74fjzED3H2f0arweXuDalRrPzcB46CgCDWqbK1y2LKr1MYOAtWyO9MxVXIiDwQsVu35u3foAFcBFY4wUMzWJXIVfOTAN1gzTP9Gmt7+wCVJMyQtuHHmixu3UrYNUyj2YPrCoUJBKf6mJtYmxrXRl9kMmRFjcI0QqKLq+1iCpe3XXktzQlCBjePfrkUepr2cPdRdyDIJ1miy5V4Zzo1ppvUlUDdhnSRsZR0+z1ZETQmGtosiTuzohoCvtNPn2kMY4EBtLl7Y1ObPLI75723Tp1ZJfYUpM0rgZSmfVa02gAQBml+6Qw79U2Qr4fSjSpVDWy/bpHY2EpfAVdFyZd0Q5yyh3huG25BTVLCXlIpMEvh7pLNmnCKywTEuBmK6gCLGyHR7undcn/EzDcGfX8BP2AGnTSrmhtmj90DT5c96l3heLR7ljGR2P69HPLqdyFY1Sws0gv1MEjGQ7oYA5VPB08TULqh63MN8MUrkEU35IUhYXKvYNPyN3fgkwqyaz6oXATm0hpGCNb3vrCSxfWeLK7h93YMOUGW0j4LwlhnGt9ODJf9tbt0JR9Ce8CsrtxbVCD3Vc+d+Xq3gj7UanbZ5XXTTQallYpRCV2cexTxtYqQtZcZVd4N0QxL3zLB02wMP24lQUaojkK1ynocCejxh2mdKQw8BV4yhdJwSp1ffjqNCY3WW+cOhkl0VY/yRUfB2vejleZy7sE9bXmbY8wk4cTg4kGm5pKJboLUY/3STWZJshRjjowwWpwxsbTWAt2Q1vDeNkyjNich/ss3BxPOi+KS763CEl+3QXpMRDgNVXNeZlMy5AY/Z0gYpQZx+WwLQSZSlRe3F9EjzMRCnqkPvR/xBWgKlHCBANXRcDBAGQrwDGLQgTcR7zqeYVzYxcpK6p7dmjdiElu+kNveaeDSwWmx7YMe8ANs48ehDwrTaRTICb0M260S8HQIq0LwhqSC2nQA8uiGAcjM+3iJNU7dQ0xthIzpbwktl5z+QPrGRLNJ9oEYe9qXY1/t+MpnFPK3LUa5D3JxwjshkeP8dIpOg/hUHl9PMqs2soETUfmqRvvguzc59CM3M3y585l02Y41PagRnczfDTJyYKsZZBF6DmezuWCCoDFdA10E/b8bQOHbk1YkAz6zUxU8uBJFr1SOqLcia+HK6EU9bsxwWsFf3hCMS0iFgcfOOhaq1+zuA7kuvcWWW3bNhTwu+LS0t1xxOf3pY7MNzIQ+wCzkDstkFqt0OquUmDO8RYRHzDRl3z3CUbUimCQ7st9UZBMKu8qOIWHfyVs5UhEMXVdGPWPR2ry/GFzlvy/XHZTpL+Cwcy7MFgLIJr5f67/tLgMJaA3IOrRj/27CoP9+5WPdvkw4IvquOIAV3t4tnoo9d4WwNeuwzrL2kGPVWNoXgpFGvjLO3++ABZIiK8oKqcwO/J49fSIVu31Tt4RnF2+TqbTYl8oc5r1EUTrBeoMLQkGKxKJediAPr1hwV+Az7p222tGR0zTMhQkF+R8vK5zCsD1mwheeEjpuuAnXKfvRCMP9MuwEYUKbu5P0nF3PSSKFI18m2aPqa5kOh3ck+Vx0SonhQGiZbqfoB1VPOR13nSdHN3STEGmQbhfpsecON8QPjW4j3DI4zuAXPmu6lb34rJyXNC9EdhkvTW7Yt5uxuW+0I0m0O1wa2QHapAWvxH9rip7AeQTmwBF6vuAdYwuG+VPMnluar/Zc5D7IraEkEkOaRAEXiMoq13FsZqDxZTdKfJVw5snq1c0tuzB7ctJrW6UApenuKk6uwZr6QgFFktOmGj9qfWMkI+1LJJgkEYE8q20OpfTXlJbgPn807d2bQQQAKtsZslpZi6ipa3+j3KV456LO8O6k4IRkyU2U96CF6CBKNtaW6sgk54qlYwlCTSMDqIEmm/7ZIBhVvLcAAA"
const HOMEPAGE_HERO_VIDEO_END = "https://framerusercontent.com/images/n4ONve6JK1gXwOuw3mL3Tm18j9c.avif"
const HOMEPAGE_HERO_INFOGRAPHIC = "https://framerusercontent.com/images/vRuUWre5kfmD5Rif9y0jYbJQs.png"
const HOMEPAGE_CONNECTION_VIDEO = "https://framerusercontent.com/assets/BfO7rinv7Ci9Naw3GW01EFAvHi0.mp4"
const HOMEPAGE_CONNECTION_END = "https://framerusercontent.com/images/uYMWXjUcDBc351olR2N5bRso.avif"
const HOMEPAGE_ORBIT_APPROACH_VIDEO = "https://framerusercontent.com/assets/N02rcgZxOCN9LfVxWZtmoNOx2ws.mp4"
const ORBIT_CHECKPOINT_ASSETS = "https://raw.githubusercontent.com/UnbuiltMarket/admiral-park/bfb2349cf8af7e6ae3f1c665ca67c984b82cf024/assets"
const HOMEPAGE_CONNECTION_VERSION = "426c29f22325"
const HOMEPAGE_ORBIT_V05 = "https://raw.githubusercontent.com/UnbuiltMarket/admiral-park/6be37e13fbb610cc41e3aa37fe9a6b28df828afb/assets/orbit-v05"
const ORBIT_RENDER_ASSETS = "https://raw.githubusercontent.com/UnbuiltMarket/admiral-park/a3ff5a346f501a0d2af5b4466c2d2f95b30a3fb0/assets"
const ORBIT_WEBP_BASE = ORBIT_RENDER_ASSETS + "/orbit-compat-v06"
// A local 2 × 2 AVIF tests the browser's actual image decoder once per page.
const avifProbe = "data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADrbWV0YQAAAAAAAAAhaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAAAAAAAOcGl0bQAAAAAAAQAAAB5pbG9jAAAAAEQAAAEAAQAAAAEAAAETAAAAJgAAAChpaW5mAAAAAAABAAAAGmluZmUCAAAAAAEAAGF2MDFDb2xvcgAAAABqaXBycAAAAEtpcGNvAAAAFGlzcGUAAAAAAAAAAgAAAAIAAAAQcGl4aQAAAAADCAgIAAAADGF2MUOBAAwAAAAAE2NvbHJuY2x4AAEADQAGgAAAABdpcG1hAAAAAAAAAAEAAQQBAoMEAAAALm1kYXQSAAoIGAA2iAhoNCAyGBlHh4Yhh5555oAAAJBAyRxhRF5fXE5pgA=="
type OrbitImageFormat = "avif" | "webp"
let formatProbe: Promise<OrbitImageFormat> | undefined
function orbitImageFormat(): Promise<OrbitImageFormat> {
    if (!formatProbe) formatProbe = new Promise(resolve => {
        const image = new Image()
        const finish = (format: OrbitImageFormat) => {
            clearTimeout(timer)
            image.onload = image.onerror = null
            resolve(format)
        }
        const timer = setTimeout(() => finish("webp"), 2500)
        image.onload = () => finish(image.naturalWidth === 2 ? "avif" : "webp")
        image.onerror = () => finish("webp")
        image.src = avifProbe
    })
    return formatProbe
}
function orbitWebpFrame(folder: "movement" | "light" | "sold", frame: number) {
    return ORBIT_WEBP_BASE + "/" + folder + "/" + String(frame).padStart(4, "0") + ".webp"
}
function homepageOrbitV05Asset(folder: "light" | "sold" | "masks", frame: number) {
    return HOMEPAGE_ORBIT_V05 + "/" + folder + "/" + String(frame).padStart(4,"0") + (folder === "masks" ? ".png" : ".avif")
}
const HOMEPAGE_ORBIT_MOVEMENT = Array.from({length:120}, (_,frame) =>
    ORBIT_RENDER_ASSETS + "/orbit-v06/movement/" + String(frame).padStart(4,"0") + ".avif")
const HOMEPAGE_V05_MASKS = Array.from({length:8}, (_,view)=>homepageOrbitV05Asset("masks",view*15))
const HOMEPAGE_ASSETS =
    "https://raw.githubusercontent.com/UnbuiltMarket/admiral-park/main/assets"
const HOMEPAGE_EXTENDED_FADE_STYLES = "[data-admiral-fullscreen-fades] [data-orbitdata-divider] { transition: opacity var(--admiral-fade-panel,740ms) ease; }\n[data-admiral-fullscreen-fades] [data-orbit-filters] { transition: opacity var(--admiral-fade-panel,740ms) ease; }\n[data-admiral-fullscreen-fades] [data-orbit-studio] { transition: opacity var(--admiral-fade-shell,900ms) ease, visibility 0s linear var(--admiral-fade-shell,900ms); }\n[data-admiral-fullscreen-fades] [data-orbit-studio] [data-orbitdata-transition] { transition: opacity var(--admiral-fade-record,680ms) ease; }\n[data-admiral-fullscreen-fades] [data-orbit-fullscreen-details] .orbit-fullscreen-bar { transition: opacity var(--admiral-fade-panel,740ms) ease; }\n[data-admiral-fullscreen-fades] [data-orbit-fullscreen-details] [data-orbitdata-transition] { transition: opacity var(--admiral-fade-record,680ms) ease; }\n[data-admiral-fullscreen-fades] [data-apartment-details] { transition: opacity var(--admiral-fade-panel,740ms) ease, transform var(--admiral-fade-panel,740ms) ease, visibility 0s linear var(--admiral-fade-panel,740ms); }\n[data-admiral-fullscreen-fades] [data-apartment-details] .admiral-details-grid { transition: opacity var(--admiral-fade-panel,740ms) ease; }\n[data-admiral-fullscreen-fades] [data-apartment-details] .admiral-details-plan-image { transition: opacity var(--admiral-fade-plan,660ms) ease; }\n[data-admiral-fullscreen-fades] [data-apartment-details] .admiral-details-grid [data-orbitdata-transition] { transition: opacity var(--admiral-fade-record,680ms) ease; }\n[data-admiral-fullscreen-fades] [data-apartment-details] .admiral-details-summary { transition: opacity var(--admiral-fade-panel,740ms) ease; }\n[data-admiral-fullscreen-fades] [data-apartment-details] .admiral-details-plan { transition: opacity var(--admiral-fade-panel,740ms) ease; }\n[data-admiral-fullscreen-fades] [data-orbit-studio][data-active=\"true\"], [data-admiral-fullscreen-fades] [data-apartment-details][data-details-shell-visible=\"true\"] { transition-delay: 0s; }\n[data-admiral-fullscreen-fades] [data-orbit-studio] .orbit-studio-status[data-status=\"available\"] .orbit-studio-status-dot::after { animation-duration: var(--admiral-fade-pulse,2900ms); }\n@media (prefers-reduced-motion:reduce) { [data-admiral-fullscreen-fades] [data-orbitdata-divider], [data-admiral-fullscreen-fades] [data-orbit-filters], [data-admiral-fullscreen-fades] [data-orbit-studio], [data-admiral-fullscreen-fades] [data-orbit-studio] [data-orbitdata-transition], [data-admiral-fullscreen-fades] [data-orbit-fullscreen-details] .orbit-fullscreen-bar, [data-admiral-fullscreen-fades] [data-orbit-fullscreen-details] [data-orbitdata-transition], [data-admiral-fullscreen-fades] [data-apartment-details], [data-admiral-fullscreen-fades] [data-apartment-details] .admiral-details-grid, [data-admiral-fullscreen-fades] [data-apartment-details] .admiral-details-plan-image, [data-admiral-fullscreen-fades] [data-apartment-details] .admiral-details-grid [data-orbitdata-transition], [data-admiral-fullscreen-fades] [data-apartment-details] .admiral-details-summary, [data-admiral-fullscreen-fades] [data-apartment-details] .admiral-details-plan { transition:none !important; } [data-admiral-fullscreen-fades] [data-orbit-studio] .orbit-studio-status[data-status=\"available\"] .orbit-studio-status-dot::after { animation:none !important; } }"
const HomepageFadeContext = React.createContext(.5)
function homepageFadeSeconds(value: number | undefined) { return Number.isFinite(value) ? Math.max(0, Math.min(2, value!)) : .5 }

type HomepageStage =
    | "opening"
    | "approach"
    | "building"
    | "connection"
    | "orbitApproach"
    | "handoff"
    | "orbit"
interface OpeningLogoMotion {
    distance?: number
    delay?: number
    end?: number
    zoom?: number
    fadePortion?: number
}
interface OpeningCopyMotion {
    delay?: number
    end?: number
    distance?: number
}
interface OpeningMotionSettings {
    logo: Required<OpeningLogoMotion>
    text: Required<OpeningCopyMotion>
    scroll: Required<OpeningCopyMotion>
}
function homepageOpeningMotion(
    logo?: OpeningLogoMotion,
    text?: OpeningCopyMotion,
    scroll?: OpeningCopyMotion,
    legacyEnd = 20,
    legacyZoom = 16
): OpeningMotionSettings {
    const value = (input: number | undefined, fallback: number, min: number, max: number) =>
        Math.max(min, Math.min(max, Number.isFinite(input) ? input! : fallback))
    const end = value(legacyEnd, 20, 1, 50)
    return {
        logo: {
            distance: value(logo?.distance, 20, 0, 80),
            delay: value(logo?.delay, .2, 0, 2),
            end: value(logo?.end, end, 1, 50),
            zoom: value(logo?.zoom, value(legacyZoom, 16, 2, 40), 2, 40),
            fadePortion: value(logo?.fadePortion, 15, 1, 100),
        },
        text: {
            delay: value(text?.delay, 0, 0, 2),
            end: value(text?.end, end, 1, 50),
            distance: value(text?.distance, 20, 0, 80),
        },
        scroll: {
            delay: value(scroll?.delay, 0, 0, 2),
            end: value(scroll?.end, end, .1, 50),
            distance: value(scroll?.distance, 20, 0, 80),
        },
    }
}
interface HomepageTiming {
    contentFadeDuration: number
    openingMotion?: OpeningMotionSettings
    fadeExtension: number
    openingOut: number
    openingZoom: number
    buildingIn: number
    buildingFull: number
    ctaIn: number
    rise: number
}
function homepageContentFadeSeconds(t: HomepageTiming) {
    return (Number.isFinite(t.contentFadeDuration) ? Math.max(.1, Math.min(3, t.contentFadeDuration)) : .8) + t.fadeExtension
}
interface HomepageMobileLayout {
    enabled: boolean
    storyTop: number
    storyMaxHeight: number
    storyLeft?: number
    storyWidth?: number
}
interface HomepageChannel {
    snapshot: SequenceSnapshot
    openingProgress?: (delaySeconds?: number) => number
    departureProgress?: (durationSeconds: number, delaySeconds?: number) => number
    fadeProgress?: (from: number, to: number, delaySeconds?: number) => number
    timing: HomepageTiming
    enabled: boolean
    stage: HomepageStage
    orbit: OrbitSnapshot
    story: OrbitStorySettings
    static: boolean
    mobile: HomepageMobileLayout | null
}
const homepageChannels = new Map<HTMLElement, HomepageChannel>()
const homepageSubscribers = new Set<() => void>()
const notifyHomepage = () => homepageSubscribers.forEach((update) => update())
const HOMEPAGE_EMPTY_CHECKPOINT_URLS: readonly string[] = []
const defaultGardenTitle = "Otthon a lombok között"
const defaultGardenBody = "Az Admiral Park kertjében 46 különböző fafaj kap helyet, így a kilátás évszakról évszakra változik."
interface AdmiralHomepageTrialProps {
    gardenTitle?: string
    gardenBody?: string
    fadeExtension?: number
    useGitHubAssets?: boolean
    heroBaseUrl?: string
    connectionBaseUrl?: string
    orbitBaseUrl?: string
    sharpCheckpointUrls?: readonly string[]
    maskPicking?: boolean
    apartmentLighting?: boolean
    apartmentLightingAtlas?: string
    apartmentLightingData?: string
    maskBaseUrl?: string
    maskHighlightColor?: string
    maskHighlightOpacity?: number
    maskAvailableColor?: string
    maskNegotiationColor?: string
    maskSoldColor?: string
    startView?: "opening" | "orbit"
    editorView?: "opening" | "building" | "connection" | "orbit"
    editorOrbitView?: string
    orbitStartFrame?: number
    duration?: number
    connectionDuration?: number
    maxSpeed?: number
    momentum?: number
    triggerDistance?: number
    checkpointCount?: number
    motionWidth?: number
    orbitMobileWidth?: number
    inspectionWidth?: number
    desktopBuffer?: number
    phoneBuffer?: number
    dragTurnWidths?: number
    dragMaxCheckpointsPerSecond?: number
    dragReleaseDuration?: number
    phoneFraming?: boolean
    phoneImageWidth?: number
    phoneImageTop?: number
    snapDuration?: number
    frameBlend?: number
    checkpointFadeSeconds?: number
    orbitStories?: boolean
    storyIn?: number
    storyOut?: number
    storyDelay?: number
    storyView1?: OrbitStoryViewMotion
    storyView2?: OrbitStoryViewMotion
    storyView3?: OrbitStoryViewMotion
    storyView4?: OrbitStoryViewMotion
    storyView5?: OrbitStoryViewMotion
    storyView6?: OrbitStoryViewMotion
    storyView7?: OrbitStoryViewMotion
    storyView8?: OrbitStoryViewMotion
    focalX?: number
    focalY?: number
    darken?: number
    showControls?: boolean
    showViewpoints?: boolean
    showDiagnostics?: boolean
    contentFadeDuration?: number
    openingLogoMotion?: OpeningLogoMotion
    openingTextMotion?: OpeningCopyMotion
    openingScrollMotion?: OpeningCopyMotion
    openingOut?: number
    openingZoom?: number
    buildingIn?: number
    buildingFull?: number
    ctaIn?: number
    rise?: number
    detailsMode?: "preview" | "hover" | "off"
    detailsLanguage?: ApartmentDetailsLanguage
    detailsBottom?: number
    detailsInset?: number
    apartmentPreview?: ApartmentDetailsPreview
    orbitLayout?: "mobile" | "studio" | "classic"
    apartmentDataUrl?: string
    apartmentAssetBase?: string
    previewApartmentId?: string
    detailPageUrl?: string
    detailDataUrl?: string
    inquiryUrl?: string
    orbitBackground?: string
    pageBackdrop?: boolean
    background?: string
    alt?: string
    style?: React.CSSProperties
}
interface HomepageActions {
    startOrbitApproach: () => void
    explore: () => void
    overview: () => void
    skip: () => void
    resumeHero: () => void
    closeOrbitGroup: () => void
    orbit: ReturnType<typeof createOrbitPlayer> | null
}
const homepageButton: React.CSSProperties = {
    appearance: "none",
    border: "1px solid rgba(255,255,255,.45)",
    borderRadius: 6,
    background: "rgba(10,20,28,.78)",
    color: "#fff",
    padding: "9px 12px",
    font: "500 12px/1.3 system-ui,sans-serif",
    cursor: "pointer",
}
const homepageMobileOrbitStyles = `
[data-admiral-homepage] button[data-orbit-fullscreen-open] { position:absolute; z-index:4; left:calc(var(--admiral-image-x, 0px) + var(--admiral-image-width, 100%) - 6px); top:calc(var(--admiral-image-y, 0px) + var(--admiral-image-height, 100%) - 6px); transform:translate(-100%,-100%); display:grid; place-items:center; width:44px; height:44px; min-height:44px; padding:0; appearance:none; border:0; border-radius:50%; background:transparent; color:#242824; cursor:pointer; touch-action:manipulation; -webkit-tap-highlight-color:transparent; }
[data-admiral-homepage] button[data-orbit-fullscreen-open]::before { content:""; position:absolute; inset:6px; border:1px solid rgba(255,255,255,.12); border-radius:50%; background:linear-gradient(145deg,rgba(255,255,255,.52),rgba(255,255,255,.10) 60%,rgba(255,255,255,.28)); -webkit-backdrop-filter:blur(12px) saturate(145%); backdrop-filter:blur(12px) saturate(145%); box-shadow:inset 0 1px 1px rgba(255,255,255,.18),inset 0 -1px 0 rgba(24,59,67,.08),0 3px 10px rgba(20,32,24,.10); transition:background .18s,box-shadow .18s; }
[data-admiral-homepage] button[data-orbit-fullscreen-open] svg { position:relative; width:15px; height:15px; }
[data-admiral-homepage] button[data-orbit-fullscreen-open]:focus-visible { outline:2px solid #242824; outline-offset:3px; }
[data-admiral-homepage] button[data-orbit-fullscreen-open]:active::before { background:rgba(255,255,255,.30); box-shadow:inset 0 1px 3px rgba(24,59,67,.14),0 1px 4px rgba(20,32,24,.12); }
@media (hover:hover) and (pointer:fine) { [data-admiral-homepage] button[data-orbit-fullscreen-open]:hover::before { background:rgba(255,255,255,.42); box-shadow:inset 0 1px 1px rgba(255,255,255,.22),0 3px 12px rgba(20,32,24,.14); } }
@supports not ((backdrop-filter:blur(1px)) or (-webkit-backdrop-filter:blur(1px))) { [data-admiral-homepage] button[data-orbit-fullscreen-open]::before { background:rgba(255,255,255,.82); } }
@media (prefers-reduced-transparency:reduce) { [data-admiral-homepage] button[data-orbit-fullscreen-open]::before { background:#edf3f3; -webkit-backdrop-filter:none; backdrop-filter:none; } }
@media (prefers-reduced-motion:reduce) { [data-admiral-homepage] button[data-orbit-fullscreen-open]::before { transition:none; } }
`
function homepageBlocked(target: EventTarget | null) {
    return (
        target instanceof Element &&
        !!target.closest(
            "nav,header,a,button,input,textarea,select,[contenteditable]:not([contenteditable='false']),[role='button'],[role='link'],[data-orbit-ignore],[data-homepage-controls]"
        )
    )
}
const homepageOrbitHash = "#orbit"
// The fragment is available to the browser before Framer hydrates. Keep this
// guard ahead of the server-rendered sequence poster and scope it to boot.
const homepageOrbitEntryStyles = `
/* The landing still already shows the first orbit pose. Swap to the painted canvas
   in the same stage change so the glass underneath never shows through. */
[data-admiral-homepage] [data-orbit-render-canvas] { visibility: hidden; }
[data-admiral-homepage][data-homepage-stage="orbit"] [data-orbit-render-canvas][data-orbit-painted] { visibility: visible; }
[data-seq3-garden-cue] {
    position: absolute; z-index: 4; left: 50%; bottom: max(42px, env(safe-area-inset-bottom));
    width: min(268px, 90%); height: 54px; transform: translateX(-50%); pointer-events: none;
    opacity: 0; visibility: hidden; translate: 0 calc(0px - var(--admiral-sequence-copy-rise, 6px));
    transition: opacity var(--admiral-sequence-copy-duration, .74s) ease, translate var(--admiral-sequence-copy-duration, .74s) ease, visibility 0s linear var(--admiral-sequence-copy-duration, .74s);
}
[data-seq3-garden-cue][data-visible="true"] { opacity: 1; visibility: visible; translate: none; transition-delay: 0s; }
[data-seq3-garden-cue]:not([data-visible="true"]) :is(.admiral-scroll-cue-glass,.admiral-scroll-cue-caption,.admiral-scroll-cue-stroke) { animation-play-state: paused; }
[data-seq3-garden-cue] > [aria-hidden="true"] { width: 100%; height: 100%; }
[data-seq3-garden-cue] button {
    appearance: none; position: absolute; inset: 0; padding: 0; cursor: pointer;
    border: none; border-radius: 999px; background: transparent; pointer-events: auto; touch-action: manipulation;
}
[data-seq3-garden-cue] button:disabled { pointer-events: none; }
[data-seq3-garden-cue] button:focus-visible { outline: 2px solid white; outline-offset: 3px; }
@media (max-width: 1439.98px) {
    [data-seq3-garden-cue] { bottom: max(50px, env(safe-area-inset-bottom)); }
}
@media (max-width: 767px), (pointer: coarse) and (max-height: 767px) {
    [data-seq3-garden-cue] { width: 46px; }
}
@media (prefers-reduced-motion: reduce) { [data-seq3-garden-cue] { transition: none; translate: none; } }

[data-admiral-homepage] [data-seq3-garden] {
    position: absolute;
    /* The central roofline is one third down the SEQ_03 still. A wide
       cover crop takes sky off the top, so account for both frame axes. */
    inset: max(64px, env(safe-area-inset-top)) 0 max(68%, calc(50% + 9vw + 8px));
    z-index: 3;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: safe flex-end;
    gap: 16px;
    padding-inline: max(12px, env(safe-area-inset-left)) max(12px, env(safe-area-inset-right));
    color: var(--token-af31bcae-daff-40c0-91b5-11fdb1730857, #fff);
    text-align: center;
    text-shadow: 0 1px 2px rgba(14, 36, 58, .85), 0 2px 7px rgba(14, 36, 58, .55);
    pointer-events: none;
    opacity: 0;
    visibility: hidden;
    transform: translateY(calc(0px - var(--admiral-sequence-copy-rise)));
    transition:
        opacity var(--admiral-sequence-copy-duration) cubic-bezier(.333333, 0, .666667, 1),
        transform var(--admiral-sequence-copy-duration) cubic-bezier(.333333, 0, .666667, 1),
        visibility 0s linear var(--admiral-sequence-copy-duration);
}
[data-admiral-homepage][data-homepage-stage="connection"] [data-seq3-garden][data-visible="false"] {
    transform: translateY(var(--admiral-sequence-copy-rise));
}
[data-admiral-homepage] [data-seq3-garden][data-visible="true"] {
    opacity: 1;
    visibility: visible;
    transform: none;
    transition-delay: 0s;
}
[data-admiral-homepage] [data-seq3-garden] :is(h2, p) {
    margin: 0;
    max-width: 100%;
    color: inherit;
    letter-spacing: .03em;
    overflow-wrap: anywhere;
}
[data-admiral-homepage] [data-seq3-garden] h2 {
    font: 500 48px/1.5 Montserrat, "Montserrat Placeholder", sans-serif;
    text-decoration: underline;
    text-underline-offset: 6px;
}
[data-admiral-homepage] [data-seq3-garden] p {
    width: min(100%, 870px);
    font: 300 18px/1.5 Montserrat, "Montserrat Placeholder", sans-serif;
    text-wrap: balance;
}
@media (min-width: 1440px) {
    [data-admiral-homepage] [data-seq3-garden] { gap: 23px; }
}
@media (max-width: 640px) {
    [data-admiral-homepage] [data-seq3-garden] {
        gap: 10px;
    }
    [data-admiral-homepage] [data-seq3-garden] h2 { font-size: clamp(22px, 7vw, 40px); line-height: 1.25; }
    [data-admiral-homepage] [data-seq3-garden] p { font-size: clamp(14px, 4vw, 18px); line-height: 1.4; }
}
@media (orientation: landscape) and (max-height: 700px) {
    [data-admiral-homepage] [data-seq3-garden] { gap: 8px; }
    [data-admiral-homepage] [data-seq3-garden] h2 { font-size: clamp(22px, 6vh, 40px); line-height: 1.25; }
    [data-admiral-homepage] [data-seq3-garden] p { font-size: clamp(14px, 2.8vh, 18px); line-height: 1.35; }
}
@media (prefers-reduced-motion: reduce) {
    [data-admiral-homepage] [data-seq3-garden][data-visible] {
        transition: none;
        transform: none;
    }
}
[data-framer-name="SEQ01"] [data-framer-name="SEQ01 logo · gentle fade up"] {
    filter: drop-shadow(0 2px 3px rgb(13 43 70 / 42%));
}
[data-admiral-homepage][data-homepage-booted="false"] > [data-admiral-orbit-anchor]:target ~ [data-admiral-sequence],
[data-admiral-homepage][data-direct-orbit-entry="true"] > [data-admiral-sequence] { visibility: hidden; }
/* Framer can render a hidden replica at another breakpoint. */
@supports selector(:has(*)) {
  :root:has(#orbit:target) [data-admiral-homepage][data-homepage-booted="false"] > [data-admiral-sequence] { visibility: hidden; }
  :root:has(#orbit:target) [data-admiral-opening-overlay]:not([data-hero-overlay]) { visibility: hidden !important; }
}
`
const orbitApartmentParam = "orbitApartment"
// Ranked by visible interior-mask area across the eight production views.
const orbitApartmentCameras: Readonly<Record<string, readonly number[]>> = {"A001":[75,90],"A002":[75,105,0,90,60],"A003":[105,0,60,90,30],"A004":[105,60,0,90],"A005":[105,60],"A006":[90,105,75],"A101":[90,75],"A102":[75,90],"A103":[75,105,0],"A104":[105,90,60,0],"A105":[105,60],"A106":[90,105],"A107":[90,75],"A201":[90,75],"A202":[75,105,0],"A203":[105,90,60,0],"A204":[105,60,45],"A205":[90,105,75],"A301":[90,75,105],"A302":[90,105,75,0,60],"A303":[105,90,60,75,45],"A304":[90,105,75,45],"B001":[60,45,75,30],"B002":[15,0,45,90,60],"B003":[0,15,60,90],"B004":[0,60,105,30],"B005":[105,0,75,30,60],"B006":[60,75,90,0],"B101":[60,75,45],"B102":[60,45,30],"B103":[15,0,45,90,30],"B104":[0,60,90,30],"B105":[105,0,75,90,30],"B106":[60,75,90],"B107":[60,75],"B201":[60,75,45],"B202":[60,45,30],"B203":[15,0,45,30],"B204":[0,60,30,90],"B205":[105,0,75,90],"B206":[60,75,90],"B207":[60,75],"B301":[60,45,0,30,15,75],"B302":[0,15,45,30,60,75],"B303":[0,105,75,90,60,45],"B304":[60,75,0,90,105,45],"C001":[30,45],"C002":[30,15],"C003":[15,60],"C004":[15,60,30],"C005":[15,0,60],"C006":[45,15,0,30,60],"C007":[45,30],"C008":[30,45],"C101":[30,15,45],"C102":[15,60],"C103":[15,30,60],"C104":[45,15,0],"C105":[45,30],"C106":[30,45],"C201":[30,15,45],"C202":[15,60,75],"C203":[15,30,60],"C204":[45,15,0],"C205":[45,30],"C301":[30,15,45,75],"C302":[15,30,75,45,60],"C303":[15,45,30,75,0],"C304":[45,30,15,75]}

function homepageOrbitApartment(url: URL) {
    if (url.hash.toLowerCase() !== homepageOrbitHash) return null
    const id = url.searchParams.get(orbitApartmentParam)
    return id && Object.prototype.hasOwnProperty.call(orbitApartmentCameras, id) ? id : null
}

type OrbitApartmentGroup = {
    kind: "favorites" | "compare"
    ids: readonly string[]
}

const orbitGroupParam = "orbitGroup"
const orbitGroupApartmentsParam = "orbitApartments"
const orbitGroupFrames = [0, 15, 30, 45, 60, 75, 90, 105]

function homepageOrbitGroup(url: URL): OrbitApartmentGroup | null {
    if (url.hash.toLowerCase() !== homepageOrbitHash) return null
    const kind = url.searchParams.get(orbitGroupParam)
    if (kind !== "favorites" && kind !== "compare") return null
    const ids = [...new Set((url.searchParams.get(orbitGroupApartmentsParam) || "")
        .split(",")
        .filter(id => Object.prototype.hasOwnProperty.call(orbitApartmentCameras, id)))]
    return ids.length ? { kind, ids } : null
}

function orbitGroupKey(group: OrbitApartmentGroup | null) {
    return group ? group.kind + ":" + group.ids.join(",") : ""
}

function bestOrbitGroupFrame(ids: readonly string[], requiredId?: string, excluded: readonly number[] = []) {
    const frames = requiredId ? orbitApartmentCameras[requiredId] : orbitGroupFrames
    let best: number | undefined, bestCount = 0, bestClarity = 0
    for (const frame of frames) {
        if (excluded.includes(frame)) continue
        let count = 0, clarity = 0
        for (const id of ids) {
            const rank = orbitApartmentCameras[id].indexOf(frame)
            if (rank < 0) continue
            count++
            clarity += 1 / (rank + 1)
        }
        if (count > bestCount || (count === bestCount && clarity > bestClarity)) {
            best = frame
            bestCount = count
            bestClarity = clarity
        }
    }
    return best
}


function homepageJourneyQuery(url: URL) {
    const params = new URLSearchParams(url.search)
    params.delete(orbitApartmentParam)
    params.delete(orbitGroupParam)
    params.delete(orbitGroupApartmentsParam)
    return params.toString()
}
const useHomepageLayoutEffect = typeof window === "undefined" ? React.useEffect : React.useLayoutEffect

function homepageJourneyLink(event: MouseEvent): URL | null {
    if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
    )
        return null
    const link = event
        .composedPath()
        .find((node) => node instanceof HTMLAnchorElement) as
        | HTMLAnchorElement
        | undefined
    if (
        !link ||
        !link.hasAttribute("href") ||
        link.hasAttribute("download") ||
        link.closest("[inert],[aria-disabled='true']")
    )
        return null
    const target = (
        link.getAttribute("target") ||
        document.querySelector("base[target]")?.getAttribute("target") ||
        ""
    ).toLowerCase()
    if (target && target !== "_self") return null
    try {
        const destination = new URL(link.href, location.href),
            current = new URL(location.href)
        const path = (url: URL) => url.pathname.replace(/\/+$/, "") || "/"
        const hash = destination.hash.toLowerCase()
        if (destination.origin !== current.origin || path(destination) !== path(current)) return null
        if (hash && hash !== "#top" && hash !== homepageOrbitHash) return null
        const currentQuery = homepageJourneyQuery(current)
        const linkedQuery = homepageJourneyQuery(destination)
        if (hash !== homepageOrbitHash && linkedQuery && linkedQuery !== currentQuery) return null

        // The navbar uses clean URLs. Keep campaign and preview parameters
        // when switching views, and take apartment/group selection from the link.
        const supplied = new URLSearchParams(destination.search)
        new URLSearchParams(currentQuery).forEach((value, key) => {
            if (!supplied.has(key)) destination.searchParams.append(key, value)
        })
        return destination
    } catch {
        return null
    }
}
function homepageUrls(base: string, names: string[], version = "") {
    return names.map(
        (name) =>
            base.trim().replace(/\/+$/, "") +
            "/" +
            encodeURIComponent(name) +
            (version ? "?v=" + version : "")
    )
}
interface HomepageFramingConfig {
    enabled: boolean
    sourceWidth: number
    top: number
    detailsHeight: number
    detailsBottom: number
    reserveDetails: boolean
}
function homepageImageRect(
    progress: number,
    bounds: { width: number; height: number },
    config: HomepageFramingConfig
) {
    if (
        !config.enabled ||
        bounds.width > 767 ||
        bounds.width <= 0 ||
        bounds.height <= 0
    )
        return null
    const sourceWidth =
        sequenceClamp(
            Number.isFinite(config.sourceWidth) ? config.sourceWidth : 100,
            80,
            100
        ) / 100
    const reserved = config.reserveDetails
        ? config.detailsHeight +
          sequenceClamp(config.detailsBottom, 0, 400) +
          32
        : 24
    const available = Math.max(1, bounds.height - reserved)
    const height = Math.min(
        (bounds.width * 1010) / (1920 * sourceWidth),
        available
    )
    const top = sequenceClamp(
        Number.isFinite(config.top) ? config.top : 80,
        0,
        Math.max(0, available - height)
    )
    const amount = sequenceEase(sequenceClamp(progress))
    return {
        x: 0,
        y: top * amount,
        width: bounds.width,
        height: bounds.height + (height - bounds.height) * amount,
    }
}

interface HomepagePagePin {
    owners: Set<symbol>
    release: () => void
}
function pinHomepagePage(): () => void {
    const key = Symbol.for("admiral-park:homepage-page-pin:v1")
    const shared = window as typeof window & {
        [key: symbol]: HomepagePagePin | undefined
    }
    let pin = shared[key]
    if (!pin) {
        const html = document.documentElement,
            body = document.body
        const x = window.scrollX,
            y = window.scrollY
        const owned: {
            element: HTMLElement
            property: string
            before: string
            priority: string
            value: string
        }[] = []
        const set = (element: HTMLElement, property: string, value: string) => {
            const before = element.style.getPropertyValue(property),
                priority = element.style.getPropertyPriority(property)
            element.style.setProperty(property, value, "important")
            owned.push({
                element,
                property,
                before,
                priority,
                value: element.style.getPropertyValue(property),
            })
        }
        // Native children still scroll while the sequences or fullscreen own the page.
        set(html, "overflow-x", "hidden")
        set(html, "overflow-y", "hidden")
        set(html, "overscroll-behavior-y", "none")
        set(body, "position", "fixed")
        set(body, "top", `${-y}px`)
        set(body, "left", `${-x}px`)
        set(body, "width", "100%")
        set(body, "box-sizing", "border-box")
        // Full-bleed sequences fill the space freed by the hidden scrollbar.
        // Padding compensation here exposes a body-coloured strip on the right.
        pin = {
            owners: new Set(),
            release: () => {
                for (const item of owned.reverse()) {
                    if (
                        item.element.style.getPropertyValue(item.property) !==
                            item.value ||
                        item.element.style.getPropertyPriority(
                            item.property
                        ) !== "important"
                    )
                        continue
                    if (item.before)
                        item.element.style.setProperty(
                            item.property,
                            item.before,
                            item.priority
                        )
                    else item.element.style.removeProperty(item.property)
                }
                // The apartment dialog manages body overflow itself; never snapshot
                // or restore that property here, including when navigating away.
                window.scrollTo({ left: x, top: y, behavior: "instant" })
            },
        }
        shared[key] = pin
    }
    const owner = Symbol("homepage-page-pin")
    pin.owners.add(owner)
    return () => {
        if (!pin!.owners.delete(owner) || pin!.owners.size) return
        if (shared[key] === pin) delete shared[key]
        pin!.release()
    }
}

// Native Framer groups remain responsible for their own content and layout.
type OrbitStoryDirection = "left" | "right" | "top" | "bottom" | "none"
interface OrbitStoryViewMotion {
    enterFrom?: OrbitStoryDirection
    exitTo?: OrbitStoryDirection
    distance?: number
}
interface OrbitStorySettings {
    enabled: boolean
    enterDuration: number
    exitDuration: number
    delay: number
    views: OrbitStoryViewMotion[]
}
const DEFAULT_ORBIT_STORY_VIEWS: OrbitStoryViewMotion[] = Array.from(
    { length: 8 },
    () => ({ enterFrom: "bottom", exitTo: "bottom", distance: 24 })
)

function createOrbitStoryOverlay(
    Component: ComponentType<any>,
    viewIndex: number
): ComponentType<any> {
    const Overlay = React.forwardRef<HTMLElement, any>(
        (props, forwardedRef) => {
            const elementRef = React.useRef<HTMLElement | null>(null)
            const initialStyle = React.useRef(props.style)
            const ref = React.useCallback(
                (node: HTMLElement | null) => {
                    elementRef.current = node
                    if (typeof forwardedRef === "function") forwardedRef(node)
                    else if (forwardedRef) forwardedRef.current = node
                },
                [forwardedRef]
            )
            React.useEffect(() => {
                const element = elementRef.current
                if (!element?.style) return
                const original = {
                    opacity:
                        initialStyle.current?.opacity === undefined
                            ? ""
                            : String(initialStyle.current.opacity),
                    translate: element.style.translate,
                    visibility: element.style.visibility,
                    pointerEvents: element.style.pointerEvents,
                    hidden: element.getAttribute("aria-hidden"),
                    inert: element.inert,
                    story: element.getAttribute("data-orbit-story"),
                    target: element.getAttribute("data-story-target"),
                    state: element.getAttribute("data-story-state"),
                    orbitIgnore: element.getAttribute("data-orbit-ignore"),
                }
                const layoutProperties = [
                    "position",
                    "top",
                    "bottom",
                    "left",
                    "right",
                    "width",
                    "minWidth",
                    "maxWidth",
                    "minHeight",
                    "maxHeight",
                    "boxSizing",
                    "overflowY",
                    "overscrollBehavior",
                    "touchAction",
                ] as const
                const originalLayout = Object.fromEntries(
                    layoutProperties.map((property) => [
                        property,
                        element.style[property],
                    ])
                ) as Record<(typeof layoutProperties)[number], string>
                let mobileLayout = false
                const computedTranslate = getComputedStyle(element).translate
                const baseTranslate = original.translate || computedTranslate
                const translateParts: string[] = []
                let token = "",
                    depth = 0
                for (const character of baseTranslate === "none"
                    ? ""
                    : baseTranslate) {
                    if (character === "(") depth++
                    if (character === ")") depth--
                    if (/\s/.test(character) && !depth) {
                        if (token) {
                            translateParts.push(token)
                            token = ""
                        }
                    } else token += character
                }
                if (token) translateParts.push(token)
                const reduced = window.matchMedia(
                    "(prefers-reduced-motion: reduce)"
                )
                let disposed = false,
                    selected: HTMLElement | null = null,
                    lastEligible = false,
                    lastMotionKey = ""
                let timer = 0,
                    frame = 0,
                    state = "hidden",
                    target = false
                let opacity = 0,
                    x = 0,
                    y = 0
                let sourceResize: ResizeObserver | null = null,
                    sourceIntersection: IntersectionObserver | null = null,
                    sourceMutation: MutationObserver | null = null
                const clampSetting = (
                    value: number,
                    fallback: number,
                    max: number
                ) =>
                    Number.isFinite(value)
                        ? Math.min(max, Math.max(0, value))
                        : fallback
                function direction(
                    value: OrbitStoryDirection | undefined
                ): OrbitStoryDirection {
                    return value === "left" ||
                        value === "right" ||
                        value === "top" ||
                        value === "bottom" ||
                        value === "none"
                        ? value
                        : "bottom"
                }
                function offset(
                    from: OrbitStoryDirection,
                    distance: number
                ): [number, number] {
                    return from === "left"
                        ? [-distance, 0]
                        : from === "right"
                          ? [distance, 0]
                          : from === "top"
                            ? [0, -distance]
                            : from === "bottom"
                              ? [0, distance]
                              : [0, 0]
                }
                function cancel() {
                    clearTimeout(timer)
                    timer = 0
                    if (frame) cancelAnimationFrame(frame)
                    frame = 0
                }
                function paint(interactive = false) {
                    element!.style.opacity = String(opacity)
                    element!.style.translate =
                        Math.abs(x) < 0.001 && Math.abs(y) < 0.001
                            ? original.translate
                            : `calc(${translateParts[0] || "0px"} + ${x}px) calc(${translateParts[1] || "0px"} + ${y}px)${translateParts[2] ? " " + translateParts[2] : ""}`
                    element!.style.visibility =
                        opacity <= 0.001 ? "hidden" : original.visibility
                    element!.style.pointerEvents = interactive
                        ? original.pointerEvents
                        : "none"
                    element!.inert = interactive ? original.inert : true
                    if (!interactive)
                        element!.setAttribute("aria-hidden", "true")
                    else if (original.hidden === null)
                        element!.removeAttribute("aria-hidden")
                    else element!.setAttribute("aria-hidden", original.hidden)
                    element!.dataset.orbitStory = String(viewIndex + 1)
                    element!.dataset.storyTarget = String(target)
                    element!.dataset.storyState = state
                }
                function hide() {
                    cancel()
                    opacity = 0
                    x = 0
                    y = 0
                    state = "hidden"
                    target = false
                    lastEligible = false
                    lastMotionKey = ""
                    paint()
                }
                function rootVisible(root: HTMLElement) {
                    if (!root.isConnected || !homepageChannels.has(root))
                        return false
                    const box = root.getBoundingClientRect()
                    if (
                        box.width <= 0 ||
                        box.height <= 0 ||
                        box.right <= 0 ||
                        box.bottom <= 0 ||
                        box.left >= innerWidth ||
                        box.top >= innerHeight
                    )
                        return false
                    let ancestor: HTMLElement | null = root
                    while (ancestor) {
                        const css = getComputedStyle(ancestor)
                        if (
                            css.display === "none" ||
                            css.visibility === "hidden" ||
                            css.visibility === "collapse" ||
                            Number(css.opacity) === 0
                        )
                            return false
                        ancestor = ancestor.parentElement
                    }
                    return true
                }
                function restoreLayout() {
                    if (!mobileLayout) return
                    for (const property of layoutProperties)
                        if (
                            element!.style[property] !==
                            originalLayout[property]
                        )
                            element!.style[property] = originalLayout[property]
                    if (original.orbitIgnore === null)
                        element!.removeAttribute("data-orbit-ignore")
                    else
                        element!.setAttribute(
                            "data-orbit-ignore",
                            original.orbitIgnore
                        )
                    mobileLayout = false
                }
                function positionForMobile(
                    root: HTMLElement | null,
                    channel: HomepageChannel | null | undefined
                ) {
                    if (!root || !channel?.mobile?.enabled) {
                        restoreLayout()
                        return
                    }
                    mobileLayout = true
                    const set = (
                        property: (typeof layoutProperties)[number],
                        value: string
                    ) => {
                        if (element!.style[property] !== value)
                            element!.style[property] = value
                    }
                    // Read the containing block after switching to absolute positioning: its
                    // padding edge is the origin, and its own scrolling moves that origin.
                    set("position", "absolute")
                    const rootBox = root.getBoundingClientRect()
                    const parent = element!.offsetParent as HTMLElement | null
                    const initialBlock =
                        !parent ||
                        (parent === document.body &&
                            getComputedStyle(parent).position === "static")
                    const parentBox = parent?.getBoundingClientRect()
                    const scaleX =
                        !initialBlock && parentBox && parent!.offsetWidth > 0
                            ? parentBox.width / parent!.offsetWidth
                            : 1
                    const scaleY =
                        !initialBlock && parentBox && parent!.offsetHeight > 0
                            ? parentBox.height / parent!.offsetHeight
                            : 1
                    const safeScaleX =
                        Number.isFinite(scaleX) && scaleX > 0 ? scaleX : 1
                    const safeScaleY =
                        Number.isFinite(scaleY) && scaleY > 0 ? scaleY : 1
                    const storyLeft = channel.mobile.storyLeft ?? 24
                    const storyWidth =
                        channel.mobile.storyWidth ?? rootBox.width - 48
                    const left = initialBlock
                        ? rootBox.left + window.scrollX + storyLeft
                        : (rootBox.left + storyLeft - parentBox!.left) /
                              safeScaleX +
                          parent!.scrollLeft -
                          parent!.clientLeft
                    const top = initialBlock
                        ? rootBox.top + window.scrollY + channel.mobile.storyTop
                        : (rootBox.top +
                              channel.mobile.storyTop -
                              parentBox!.top) /
                              safeScaleY +
                          parent!.scrollTop -
                          parent!.clientTop
                    const pixel = (value: number) =>
                        `${Math.round(value * 1000) / 1000}px`
                    set("left", pixel(left))
                    set("top", pixel(top))
                    set("bottom", "auto")
                    set("right", "auto")
                    set("boxSizing", "border-box")
                    set("width", pixel(Math.max(0, storyWidth) / safeScaleX))
                    set("minWidth", "0px")
                    set("maxWidth", "none")
                    set("minHeight", "0px")
                    set(
                        "maxHeight",
                        pixel(
                            Math.max(0, channel.mobile.storyMaxHeight) /
                                safeScaleY
                        )
                    )
                    set("overflowY", "auto")
                    set("overscrollBehavior", "contain")
                    set("touchAction", "pan-y")
                    if (!element!.hasAttribute("data-orbit-ignore"))
                        element!.setAttribute("data-orbit-ignore", "")
                }
                function observeSource(root: HTMLElement | null) {
                    sourceResize?.disconnect()
                    sourceIntersection?.disconnect()
                    sourceMutation?.disconnect()
                    sourceResize = null
                    sourceIntersection = null
                    sourceMutation = null
                    if (!root) return
                    sourceResize = new ResizeObserver(update)
                    sourceResize.observe(root)
                    sourceIntersection = new IntersectionObserver(update)
                    sourceIntersection.observe(root)
                    sourceMutation = new MutationObserver(update)
                    let ancestor: HTMLElement | null = root
                    while (ancestor) {
                        sourceMutation.observe(ancestor, {
                            attributes: true,
                            attributeFilter: ["style", "class", "hidden"],
                            childList: true,
                        })
                        ancestor = ancestor.parentElement
                    }
                }
                function resolve(): HTMLElement | null {
                    if (!element!.isConnected) return null
                    let parent = element!.parentElement
                    const ownBox = element!.getBoundingClientRect(),
                        ownX = ownBox.left + ownBox.width / 2,
                        ownY = ownBox.top + ownBox.height / 2
                    while (parent) {
                        const candidates = [...homepageChannels.keys()].filter(
                            (root) =>
                                parent!.contains(root) && rootVisible(root)
                        )
                        if (candidates.length) {
                            candidates.sort((a, b) => {
                                if (
                                    a.contains(element!) !==
                                    b.contains(element!)
                                )
                                    return a.contains(element!) ? -1 : 1
                                const aa = a.getBoundingClientRect(),
                                    bb = b.getBoundingClientRect()
                                return (
                                    Math.hypot(
                                        aa.left + aa.width / 2 - ownX,
                                        aa.top + aa.height / 2 - ownY
                                    ) -
                                    Math.hypot(
                                        bb.left + bb.width / 2 - ownX,
                                        bb.top + bb.height / 2 - ownY
                                    )
                                )
                            })
                            return candidates[0]
                        }
                        parent = parent.parentElement
                    }
                    return null
                }
                function animate(
                    toOpacity: number,
                    toX: number,
                    toY: number,
                    duration: number,
                    nextState: "entering" | "leaving"
                ) {
                    cancel()
                    const fromOpacity = opacity,
                        fromX = x,
                        fromY = y,
                        started = performance.now()
                    state = nextState
                    paint()
                    const tick = (now: number) => {
                        frame = 0
                        if (disposed) return
                        if (
                            !selected ||
                            !rootVisible(selected) ||
                            homepageChannels.get(selected)?.stage !== "orbit"
                        ) {
                            hide()
                            return
                        }
                        const progress =
                            duration > 0
                                ? sequenceClamp(
                                      (now - started) / (duration * 1000)
                                  )
                                : 1
                        const eased =
                            nextState === "entering"
                                ? 1 - Math.pow(1 - progress, 3)
                                : sequenceEase(progress)
                        opacity =
                            fromOpacity + (toOpacity - fromOpacity) * eased
                        x = fromX + (toX - fromX) * eased
                        y = fromY + (toY - fromY) * eased
                        if (progress >= 1) {
                            opacity = toOpacity
                            x = toX
                            y = toY
                            state = toOpacity ? "visible" : "hidden"
                        }
                        paint(target && opacity >= 0.98 && state !== "leaving")
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
                    if (
                        ![...homepageChannels.values()].some(
                            (channel) =>
                                channel.stage === "orbit" &&
                                channel.story.enabled
                        )
                    ) {
                        if (
                            state !== "hidden" ||
                            target ||
                            opacity !== 0 ||
                            timer ||
                            frame
                        )
                            hide()
                        restoreLayout()
                        return
                    }
                    const root = resolve()
                    if (selected !== root) {
                        hide()
                        selected = root
                        observeSource(root)
                    }
                    const channel = root && homepageChannels.get(root)
                    positionForMobile(root, channel)
                    if (
                        !channel ||
                        channel.stage !== "orbit" ||
                        !channel.story.enabled
                    ) {
                        hide()
                        return
                    }
                    const settings = channel.story,
                        motion =
                            settings.views[viewIndex] ||
                            DEFAULT_ORBIT_STORY_VIEWS[viewIndex]
                    const enterFrom = direction(motion.enterFrom),
                        exitTo = direction(motion.exitTo)
                    const distance = clampSetting(
                        motion.distance as number,
                        24,
                        300
                    )
                    const enter = clampSetting(settings.enterDuration, 0.6, 10),
                        exit = clampSetting(settings.exitDuration, 0.3, 10),
                        delay = clampSetting(settings.delay, 0.12, 10)
                    const motionKey = `${enterFrom}:${exitTo}:${distance}:${enter}:${exit}:${delay}`
                    const eligible =
                        channel.orbit.state === "checkpoint" &&
                        channel.orbit.checkpoint === viewIndex
                    const wasEligible = lastEligible
                    lastEligible = eligible
                    target = eligible
                    if (channel.static || reduced.matches) {
                        cancel()
                        opacity = eligible ? 1 : 0
                        x = 0
                        y = 0
                        state = eligible ? "visible" : "hidden"
                        lastMotionKey = motionKey
                        paint(eligible)
                        return
                    }
                    if (!eligible) {
                        if (
                            wasEligible ||
                            (state !== "leaving" && state !== "hidden")
                        ) {
                            cancel()
                            if (opacity <= 0.001) {
                                opacity = 0
                                state = "hidden"
                                paint()
                            } else {
                                const [exitX, exitY] = offset(exitTo, distance)
                                animate(0, exitX, exitY, exit, "leaving")
                            }
                        } else paint()
                        return
                    }
                    if (wasEligible && motionKey === lastMotionKey) return
                    lastMotionKey = motionKey
                    cancel()
                    if (opacity <= 0.001) {
                        opacity = 0
                        ;[x, y] = offset(enterFrom, distance)
                    }
                    state = "waiting"
                    paint()
                    const start = () => {
                        timer = 0
                        if (
                            disposed ||
                            !target ||
                            !selected ||
                            !rootVisible(selected)
                        )
                            return
                        const live = homepageChannels.get(selected)
                        if (
                            !live ||
                            live.stage !== "orbit" ||
                            live.orbit.state !== "checkpoint" ||
                            live.orbit.checkpoint !== viewIndex ||
                            !live.story.enabled
                        ) {
                            update()
                            return
                        }
                        animate(1, 0, 0, enter, "entering")
                    }
                    if (delay) timer = window.setTimeout(start, delay * 1000)
                    else start()
                }
                homepageSubscribers.add(update)
                reduced.addEventListener("change", update)
                window.addEventListener("resize", update, { passive: true })
                window.addEventListener("scroll", update, {
                    passive: true,
                    capture: true,
                })
                paint()
                update()
                return () => {
                    disposed = true
                    cancel()
                    observeSource(null)
                    homepageSubscribers.delete(update)
                    reduced.removeEventListener("change", update)
                    window.removeEventListener("resize", update)
                    window.removeEventListener("scroll", update, true)
                    restoreLayout()
                    element.style.opacity = original.opacity
                    element.style.translate = original.translate
                    element.style.visibility = original.visibility
                    element.style.pointerEvents = original.pointerEvents
                    element.inert = original.inert
                    const restore = (name: string, value: string | null) =>
                        value === null
                            ? element.removeAttribute(name)
                            : element.setAttribute(name, value)
                    restore("aria-hidden", original.hidden)
                    restore("data-orbit-story", original.story)
                    restore("data-story-target", original.target)
                    restore("data-story-state", original.state)
                }
            }, [])
            return (
                <Component
                    {...props}
                    ref={ref}
                    style={{
                        ...props.style,
                        opacity: elementRef.current?.style.opacity ?? 0,
                    }}
                />
            )
        }
    )
    Overlay.displayName = `OrbitView${viewIndex + 1}`
    return Overlay
}
export function OrbitView1(Component: ComponentType<any>): ComponentType<any> {
    return createOrbitStoryOverlay(Component, 0)
}
export function OrbitView2(Component: ComponentType<any>): ComponentType<any> {
    return createOrbitStoryOverlay(Component, 1)
}
export function OrbitView3(Component: ComponentType<any>): ComponentType<any> {
    return createOrbitStoryOverlay(Component, 2)
}
export function OrbitView4(Component: ComponentType<any>): ComponentType<any> {
    return createOrbitStoryOverlay(Component, 3)
}
export function OrbitView5(Component: ComponentType<any>): ComponentType<any> {
    return createOrbitStoryOverlay(Component, 4)
}
export function OrbitView6(Component: ComponentType<any>): ComponentType<any> {
    return createOrbitStoryOverlay(Component, 5)
}
export function OrbitView7(Component: ComponentType<any>): ComponentType<any> {
    return createOrbitStoryOverlay(Component, 6)
}
export function OrbitView8(Component: ComponentType<any>): ComponentType<any> {
    return createOrbitStoryOverlay(Component, 7)
}

// Canonical apartment JSON adapter. Inlined into the standalone Framer component.
type OrbitApartmentStatus =
    | "available"
    | "under_negotiation"
    | "reserved"
    | "sold"
    | "unknown"

// Shared facade and orbitdata availability language. Framer colour controls set
// the custom properties on the viewer; the fallbacks also work in isolated UI.
const ORBIT_AVAILABILITY_COLORS = {
    available: "#46A66A",
    under_negotiation: "#E2B849",
    reserved: "#E2B849",
    sold: "#DA5961",
    unknown: "#A8AFB4",
} as const
function orbitAvailabilityColor(status: string | undefined): string {
    return status === "available"
        ? "var(--orbit-available-color,#46A66A)"
        : status === "sold"
          ? "var(--orbit-sold-color,#DA5961)"
          : status === "under_negotiation" || status === "reserved"
            ? "var(--orbit-negotiation-color,#E2B849)"
            : "#A8AFB4"
}
const orbitDataDividerStyles = `
[data-orbitdata-divider] { position:absolute; z-index:0; top:var(--orbitdata-divider-y,0px); height:1px; background:rgba(255,255,255,.62); pointer-events:none !important; opacity:1; transition:opacity 240ms ease; }
[data-orbitdata-divider="left"] { left:0; width:var(--orbitdata-divider-left,0px); }
[data-orbitdata-divider="right"] { left:var(--orbitdata-divider-right,100%); right:0; }
[data-orbitdata-divider][data-info-visible="false"] { opacity:0; }
@media (prefers-reduced-motion:reduce) { [data-orbitdata-divider] { transition:none; } }
`
function useOrbitDataDividers(
    root: React.RefObject<HTMLElement | null>,
    selector: string,
    revision: string
): void {
    React.useEffect(() => {
        const host = root.current,
            plan = host?.querySelector<HTMLElement>(selector)
        if (!host || !plan) return
        // offset geometry remains in layout coordinates when the phone's entire
        // fullscreen surface is rotated. A screen-space rect would swap axes.
        const measure = () => {
            let node: HTMLElement | null = plan,
                left = 0,
                top = 0
            while (node && node !== host) {
                left += node.offsetLeft
                top += node.offsetTop
                node = node.offsetParent as HTMLElement | null
            }
            if (node !== host) return
            host.style.setProperty(
                "--orbitdata-divider-y",
                `${top + plan.offsetHeight / 2}px`
            )
            host.style.setProperty(
                "--orbitdata-divider-left",
                `${Math.max(0, left - 16)}px`
            )
            host.style.setProperty(
                "--orbitdata-divider-right",
                `${Math.min(host.clientWidth, left + plan.offsetWidth + 16)}px`
            )
        }
        measure()
        if (typeof ResizeObserver !== "undefined") {
            const observer = new ResizeObserver(measure)
            observer.observe(host)
            observer.observe(plan)
            return () => observer.disconnect()
        }
        window.addEventListener("resize", measure)
        return () => window.removeEventListener("resize", measure)
    }, [root, selector, revision])
}
// Keep the record mounted and replace facts immediately on apartment changes.
// Real empty states and checkpoint travel retain their own appearance fades.
interface OrbitDataTransition<T> {
    displayed: T | null
    key: string | null
    phase: "empty" | "in" | "out" | "visible"
    visible: boolean
}
function useOrbitDataTransition<T>(
    value: T | null,
    key: string | null,
    {
        moving = false,
        enabled = true,
    }: { moving?: boolean; enabled?: boolean } = {}
) {
    const fadeExtra = React.useContext(HomepageFadeContext)
    const fadeDurationRef = React.useRef(180 + fadeExtra * 1000)
    // An active CSS fade keeps its original duration. Each next phase reads
    // the latest control value, even when an older callback starts that phase.
    fadeDurationRef.current = 180 + fadeExtra * 1000
    const initial: OrbitDataTransition<T> = {
        displayed: value,
        key: value ? key : null,
        phase: value ? "visible" : "empty",
        visible: !!value,
    }
    const [state, setState] = React.useState(initial)
    const stateRef = React.useRef(state),
        latest = React.useRef({ value, key, moving, enabled })
    latest.current = { value, key: value ? key : null, moving, enabled }
    const alive = React.useRef(false),
        wasMoving = React.useRef(moving)
    const timer = React.useRef<number | null>(null),
        frame = React.useRef<number | null>(null)
    const [reduced, setReduced] = React.useState(
        () =>
            typeof window !== "undefined" &&
            !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    )
    const cancel = () => {
        if (timer.current !== null) window.clearTimeout(timer.current)
        if (frame.current !== null) window.cancelAnimationFrame(frame.current)
        timer.current = frame.current = null
    }
    const commit = (next: OrbitDataTransition<T>) => {
        if (!alive.current) return
        const old = stateRef.current
        if (
            old.displayed === next.displayed &&
            old.key === next.key &&
            old.phase === next.phase &&
            old.visible === next.visible
        )
            return
        stateRef.current = next
        setState(next)
    }
    const empty = () =>
        commit({ displayed: null, key: null, phase: "empty", visible: false })
    const finishIn = () => {
        timer.current = window.setTimeout(() => {
            timer.current = null
            const current = stateRef.current
            if (current.phase === "in")
                commit({ ...current, phase: "visible", visible: true })
        }, fadeDurationRef.current)
    }
    const enter = (next: T, nextKey: string | null, alreadyMounted = false) => {
        cancel()
        commit({
            displayed: next,
            key: nextKey,
            phase: "in",
            visible: alreadyMounted,
        })
        if (alreadyMounted) finishIn()
        else
            frame.current = window.requestAnimationFrame(() => {
                frame.current = window.requestAnimationFrame(() => {
                    frame.current = null
                    if (!alive.current || stateRef.current.phase !== "in")
                        return
                    commit({ ...stateRef.current, visible: true })
                    finishIn()
                })
            })
    }
    React.useEffect(() => {
        alive.current = true
        const query = window.matchMedia?.("(prefers-reduced-motion: reduce)")
        const change = () => setReduced(!!query?.matches)
        change()
        query?.addEventListener?.("change", change)
        return () => {
            alive.current = false
            cancel()
            query?.removeEventListener?.("change", change)
        }
    }, [])
    // Deliberately reconcile every committed render: a floorplan URL can become
    // ready without changing its apartment ID. Active fades never restart for
    // that update, and a rapid A -> B -> C pass consumes only the latest target.
    React.useEffect(() => {
        const target = latest.current,
            current = stateRef.current
        if (!target.enabled) {
            cancel()
            wasMoving.current = target.moving
            empty()
            return
        }
        if (target.moving) {
            cancel()
            wasMoving.current = true
            const retained = current.displayed || target.value
            commit({
                displayed: retained,
                key: current.displayed ? current.key : target.key,
                phase: retained ? "visible" : "empty",
                visible: !!retained,
            })
            return
        }
        if (wasMoving.current || reduced) {
            cancel()
            wasMoving.current = false
            commit({
                displayed: target.value,
                key: target.key,
                phase: target.value ? "visible" : "empty",
                visible: !!target.value,
            })
            return
        }
        if (target.value && current.displayed && current.key !== target.key) {
            cancel()
            commit({ displayed: target.value, key: target.key, phase: "visible", visible: true })
            return
        }
        if (current.key === target.key) {
            if (!target.value) {
                cancel()
                empty()
                return
            }
            if (current.phase === "out") {
                enter(target.value, target.key, true)
                return
            }
            commit({ ...current, displayed: target.value })
            // Recover cancelled scheduling when React remounts effects in StrictMode.
            if (
                current.phase === "in" &&
                timer.current === null &&
                frame.current === null
            )
                enter(target.value, target.key, true)
            return
        }
        if (!current.displayed) {
            if (target.value) enter(target.value, target.key)
            return
        }
        if (current.phase === "out" && timer.current !== null) return
        cancel()
        commit({ ...current, phase: "out", visible: false })
        timer.current = window.setTimeout(() => {
            timer.current = null
            const next = latest.current
            if (!next.enabled) {
                empty()
                return
            }
            if (next.moving) return
            if (next.value) enter(next.value, next.key)
            else empty()
        }, fadeDurationRef.current)
    })
    // Suppress the departing record on the arrival render itself, before the
    // passive effect clears retained state and the camera panel starts fading in.
    const arriving = wasMoving.current && !moving
    // Do not render one stale record while its click action already targets the next ID.
    const swapping = enabled && !moving && !!value && !!state.displayed && key !== state.key
    const direct = arriving || swapping
    return {
        displayed: direct ? value : state.displayed,
        phase: direct
            ? value
                ? ("visible" as const)
                : ("empty" as const)
            : state.phase,
        visible: direct ? !!value : state.visible,
        interactive:
            enabled &&
            !moving &&
            !!value &&
            (direct || (key === state.key && state.phase === "visible")),
    }
}
interface OrbitApartmentImage {
    thumbnail?: string
    full: string
    label?: string
    isIllustrative?: boolean
    original?: string
}
interface OrbitApartmentRecord {
    id: string
    maskColor?: string
    name: string
    building: string
    floor: number | null
    floorLabel: string | null
    rooms: number | null
    bedrooms: number | null
    layoutLabel: string | null
    orientation: string | null
    areaInterior: number | null
    areaTerrace: number | null
    areaGarden: number | null
    price: number | null
    currency: string
    priceIncludesVat: boolean | null
    status: OrbitApartmentStatus
    statusLabel: string | null
    apartmentType: string | null
    floorplan: string | null
    note: string | null
    media?: {
        floorplan?: OrbitApartmentImage
        floorLayout?: OrbitApartmentImage
        datasheet?: {
            url: string
            filename?: string
            label?: string
            page?: number
        }
    }
}
interface OrbitApartmentDimensions {
    width: number
    height: number
}
interface OrbitApartmentViewBox {
    x: number
    y: number
    width: number
    height: number
}
interface OrbitApartmentDataset {
    schemaVersion: string
    project: {
        id: string
        name: string
        city?: string | null
        locale?: string
        currency?: string
        areaUnit?: string
        availabilityAsOf?: string | null
        priceDefinition?: string
    }
    apartments: OrbitApartmentRecord[]
    roomLayouts: Record<
        string,
        {
            imageDimensions: OrbitApartmentDimensions
            viewBox: OrbitApartmentViewBox
        }
    >
}
interface OrbitApartmentPlan {
    url: string
    isThumbnail: boolean
    aspect: number
    viewBox: OrbitApartmentViewBox

}

function parseOrbitApartmentDataset(value: unknown): OrbitApartmentDataset {
    const object = (input: unknown): Record<string, unknown> | null =>
        input !== null && typeof input === "object" && !Array.isArray(input)
            ? (input as Record<string, unknown>)
            : null
    const text = (input: unknown, maximum = 512): string | null =>
        typeof input === "string" && input.trim()
            ? input.trim().slice(0, maximum)
            : null
    const number = (input: unknown, field: string): number | null => {
        if (input === null || input === undefined) return null
        if (typeof input !== "number" || !Number.isFinite(input) || input < 0)
            throw new Error(`Invalid apartment ${field}.`)
        return input
    }
    const image = (input: unknown): OrbitApartmentImage | undefined => {
        const entry = object(input),
            full = text(entry?.full, 4096)
        if (!entry || !full) return undefined
        return {
            full,
            ...(text(entry.thumbnail, 4096)
                ? { thumbnail: text(entry.thumbnail, 4096)! }
                : {}),
            ...(text(entry.original, 4096)
                ? { original: text(entry.original, 4096)! }
                : {}),
            ...(text(entry.label) ? { label: text(entry.label)! } : {}),
            ...(typeof entry.isIllustrative === "boolean"
                ? { isIllustrative: entry.isIllustrative }
                : {}),
        }
    }
    const input = object(value)
    if (
        !input ||
        !Array.isArray(input.apartments) ||
        input.apartments.length < 1 ||
        input.apartments.length > 10000
    )
        throw new Error("Apartment JSON must contain an apartment list.")
    const ids = new Set<string>(),
        statuses = new Set<OrbitApartmentStatus>([
            "available",
            "under_negotiation",
            "reserved",
            "sold",
            "unknown",
        ])
    const apartments = input.apartments.map(
        (candidate): OrbitApartmentRecord => {
            const apartment = object(candidate),
                id = text(apartment?.id, 128)
            if (
                !apartment ||
                !id ||
                !/^[A-Za-z0-9._-]+$/.test(id) ||
                ids.has(id)
            )
                throw new Error(
                    "Apartment JSON contains an invalid or repeated apartment ID."
                )
            ids.add(id)
            const status = text(
                apartment.status,
                64
            ) as OrbitApartmentStatus | null
            if (!status || !statuses.has(status))
                throw new Error(`Invalid availability for apartment ${id}.`)
            const floor = number(apartment.floor, "floor")
            if (floor !== null && !Number.isSafeInteger(floor))
                throw new Error(`Invalid floor for apartment ${id}.`)
            const price = number(apartment.price, "price")
            if (price !== null && !Number.isSafeInteger(price))
                throw new Error(`Invalid price for apartment ${id}.`)
            const sourceMedia = object(apartment.media),
                plan = image(sourceMedia?.floorplan),
                floorLayout = image(sourceMedia?.floorLayout)
            const sourceMaskColor = text(apartment.maskColor, 64)
            const maskColor =
                sourceMaskColor && /^#[0-9a-fA-F]{6}$/.test(sourceMaskColor)
                    ? sourceMaskColor.toUpperCase()
                    : null
            const sourceSheet = object(sourceMedia?.datasheet),
                sheetUrl = text(sourceSheet?.url, 4096)
            const media = {
                ...(plan ? { floorplan: plan } : {}),
                ...(floorLayout ? { floorLayout } : {}),
                ...(sheetUrl
                    ? {
                          datasheet: {
                              url: sheetUrl,
                              ...(text(sourceSheet?.filename)
                                  ? { filename: text(sourceSheet?.filename)! }
                                  : {}),
                              ...(text(sourceSheet?.label)
                                  ? { label: text(sourceSheet?.label)! }
                                  : {}),
                              ...(typeof sourceSheet?.page === "number" &&
                              Number.isSafeInteger(sourceSheet.page) &&
                              sourceSheet.page > 0
                                  ? { page: sourceSheet.page }
                                  : {}),
                          },
                      }
                    : {}),
            }
            return {
                id,
                ...(maskColor ? { maskColor } : {}),
                name: text(apartment.name) || id,
                building: text(apartment.building, 64) || "",
                floor,
                floorLabel: text(apartment.floorLabel),
                rooms: number(apartment.rooms, "rooms"),
                bedrooms: number(apartment.bedrooms, "bedrooms"),
                layoutLabel: text(apartment.layoutLabel),
                orientation: text(apartment.orientation),
                areaInterior: number(apartment.areaInterior, "interior area"),
                areaTerrace: number(apartment.areaTerrace, "balcony area"),
                areaGarden: number(apartment.areaGarden, "garden area"),
                price,
                currency: text(apartment.currency, 12) || "HUF",
                priceIncludesVat:
                    typeof apartment.priceIncludesVat === "boolean"
                        ? apartment.priceIncludesVat
                        : null,
                status,
                statusLabel: text(apartment.statusLabel),
                apartmentType: text(apartment.apartmentType, 64),
                floorplan: text(apartment.floorplan, 4096),
                note: text(apartment.note, 2048),
                ...(Object.keys(media).length ? { media } : {}),
            }
        }
    )
    const roomLayouts: OrbitApartmentDataset["roomLayouts"] = {}
    const layouts = object(input.roomLayouts)
    for (const [key, candidate] of Object.entries(layouts || {})) {
        if (
            !/^[A-Za-z0-9_-]{1,64}$/.test(key) ||
            key === "__proto__" ||
            key === "constructor" ||
            key === "prototype"
        )
            continue
        const layout = object(candidate),
            sourceDimensions = object(layout?.imageDimensions),
            sourceBox = object(layout?.viewBox)
        if (!layout || !sourceDimensions || !sourceBox) continue
        const width = number(sourceDimensions.width, "drawing width"),
            height = number(sourceDimensions.height, "drawing height")
        const x = number(sourceBox.x, "drawing crop"),
            y = number(sourceBox.y, "drawing crop"),
            cropWidth = number(sourceBox.width, "drawing crop"),
            cropHeight = number(sourceBox.height, "drawing crop")
        if (
            width === null ||
            height === null ||
            width <= 0 ||
            height <= 0 ||
            x === null ||
            y === null ||
            cropWidth === null ||
            cropHeight === null ||
            cropWidth <= 0 ||
            cropHeight <= 0 ||
            x + cropWidth > 1.000001 ||
            y + cropHeight > 1.000001
        )
            throw new Error(`Invalid drawing dimensions for type ${key}.`)
        roomLayouts[key] = {
            imageDimensions: { width, height },
            viewBox: { x, y, width: cropWidth, height: cropHeight },
        }
    }
    const sourceProject = object(input.project)
    return {
        schemaVersion: text(input.schemaVersion, 64) || "1.0",
        apartments,
        roomLayouts,
        project: {
            id: text(sourceProject?.id, 128) || "admiral-park",
            name: text(sourceProject?.name) || "Admiral Park",
            ...(text(sourceProject?.city)
                ? { city: text(sourceProject?.city)! }
                : {}),
            ...(text(sourceProject?.locale, 32)
                ? { locale: text(sourceProject?.locale, 32)! }
                : {}),
            ...(text(sourceProject?.currency, 12)
                ? { currency: text(sourceProject?.currency, 12)! }
                : {}),
            ...(text(sourceProject?.areaUnit, 12)
                ? { areaUnit: text(sourceProject?.areaUnit, 12)! }
                : {}),
            availabilityAsOf: text(sourceProject?.availabilityAsOf, 32),
            ...(text(sourceProject?.priceDefinition)
                ? { priceDefinition: text(sourceProject?.priceDefinition)! }
                : {}),
        },
    }
}

function orbitApartmentAssetUrl(path: unknown, base: string): string | null {
    if (typeof path !== "string" || !path.trim()) return null
    const value = path.trim()
    try {
        if (/^[a-z][a-z\d+.-]*:/i.test(value)) {
            const direct = new URL(value)
            return direct.protocol === "http:" || direct.protocol === "https:"
                ? direct.href
                : null
        }
        const documentBase =
            typeof document !== "undefined"
                ? document.baseURI
                : "https://admiralpark.hu/"
        const assetBase = new URL(base || documentBase, documentBase)
        if (assetBase.protocol !== "http:" && assetBase.protocol !== "https:")
            return null
        if (base && !assetBase.pathname.endsWith("/")) assetBase.pathname += "/"
        const resolved = new URL(
            value.replace(/^\.?\/?assets\//, ""),
            assetBase
        )
        return resolved.protocol === "http:" || resolved.protocol === "https:"
            ? resolved.href
            : null
    } catch {
        return null
    }
}

function orbitApartmentPlan(
    record: OrbitApartmentRecord,
    dataset: OrbitApartmentDataset,
    base: string,
    preferThumbnail = false
): OrbitApartmentPlan | null {
    const source = record.media?.floorplan
    const thumbnail = preferThumbnail
        ? orbitApartmentAssetUrl(source?.thumbnail, base)
        : null
    const url = thumbnail || orbitApartmentAssetUrl(source?.full || record.floorplan, base)
    if (!url) return null
    const layout =
        record.apartmentType ? dataset.roomLayouts[record.apartmentType] : null
    const dimensions = layout?.imageDimensions || { width: 1500, height: 2000 }
    const viewBox = layout?.viewBox || { x: 0, y: 0, width: 1, height: 1 }
    const aspect =
        (dimensions.width * viewBox.width) /
        (dimensions.height * viewBox.height)
    // The existing thumbnails already contain the plan crop; applying it twice cuts
    // away rooms. Retain the drawing's cropped aspect while showing the whole thumb.
    return {
        url,
        isThumbnail: !!thumbnail,
        aspect,
        viewBox: thumbnail ? { x: 0, y: 0, width: 1, height: 1 } : viewBox,
    }
}

// A fast pointer pass updates apartment text immediately without starting a large
// drawing request for every crossed unit. Cache URL readiness, not decoded images.
const orbitPreviewImageReady = new Set<string>()
const orbitPreviewImageRequests = new Map<string, Promise<void>>()
function requestOrbitPreviewImage(url: string): Promise<void> {
    if (orbitPreviewImageReady.has(url)) return Promise.resolve()
    const previous = orbitPreviewImageRequests.get(url)
    if (previous) return previous
    const request = new Promise<void>((resolve, reject) => {
        const image = new Image()
        image.decoding = "async"
        let finished = false
        const finish = (error?: Error) => {
            if (finished) return
            finished = true
            image.onload = null
            image.onerror = null
            if (error) reject(error)
            else resolve()
        }
        image.onerror = () =>
            finish(new Error("Apartment floorplan could not be loaded."))
        image.onload = () => {
            if (typeof image.decode === "function")
                image.decode().then(
                    () => finish(),
                    () =>
                        finish(
                            new Error(
                                "Apartment floorplan could not be decoded."
                            )
                        )
                )
            else finish()
        }
        image.src = url
    })
        .then(() => {
            orbitPreviewImageReady.add(url)
            if (orbitPreviewImageReady.size > 96)
                orbitPreviewImageReady.delete(
                    orbitPreviewImageReady.values().next().value!
                )
        })
        .finally(() => {
            orbitPreviewImageRequests.delete(url)
        })
    orbitPreviewImageRequests.set(url, request)
    return request
}
function useOrbitPreviewImage(
    url: string | null | undefined,
    enabled = true,
    isThumbnail = false,
    delayMs = isThumbnail ? 32 : 160
): string | null {
    const requested = enabled && url ? url : null
    const [ready, setReady] = React.useState<string | null>(null)
    React.useEffect(() => {
        if (!requested) {
            setReady(null)
            return
        }
        if (orbitPreviewImageReady.has(requested)) {
            setReady(requested)
            return
        }
        let active = true
        setReady(null)
        const timer = setTimeout(() => {
            requestOrbitPreviewImage(requested).then(
                () => {
                    if (active) setReady(requested)
                },
                () => {
                    if (active) setReady(null)
                }
            )
        }, delayMs)
        return () => {
            active = false
            clearTimeout(timer)
        }
    }, [requested, delayMs])
    // Do not show an old apartment's floorplan during the effect's next tick.
    return requested &&
        (ready === requested || orbitPreviewImageReady.has(requested))
        ? requested
        : null
}

// The cache shares work between instances, but a stalled network or response-body
// read must not strand every consumer. Retry owns a fresh entry; old completion
// can neither evict nor overwrite that entry.
const ORBIT_APARTMENT_REQUEST_TIMEOUT = 15000
interface OrbitApartmentRequest {
    promise: Promise<OrbitApartmentDataset>
    cancel: () => void
    pending: boolean
}
const orbitApartmentRequests = new Map<string, OrbitApartmentRequest>()
const orbitApartmentCache = new Map<
    string,
    { dataset: OrbitApartmentDataset; refreshedAt: number }
>()
const orbitApartmentSubscribers = new Map<
    string,
    Set<(dataset: OrbitApartmentDataset) => void>
>()
const ORBIT_APARTMENT_FRESH_MS = 60_000
function orbitApartmentRequestUrl(value: string): string | null {
    if (!value.trim()) return null
    try {
        const url = new URL(
            value.trim(),
            typeof document !== "undefined"
                ? document.baseURI
                : "https://admiralpark.hu/"
        )
        return url.protocol === "http:" || url.protocol === "https:"
            ? url.href
            : null
    } catch {
        return null
    }
}
function requestOrbitApartmentDataset(
    url: string,
    force = false
): Promise<OrbitApartmentDataset> {
    const previous = orbitApartmentRequests.get(url)
    if (previous) return previous.promise
    const cached = orbitApartmentCache.get(url)
    if (
        !force &&
        cached &&
        Date.now() - cached.refreshedAt < ORBIT_APARTMENT_FRESH_MS
    )
        return Promise.resolve(cached.dataset)
    const controller = new AbortController()
    let timer: ReturnType<typeof setTimeout>, cancel!: () => void
    const cancellation = new Promise<never>((_, reject) => {
        cancel = () => {
            controller.abort()
            reject(
                new Error("Apartment data request was cancelled. Please retry.")
            )
        }
        timer = setTimeout(() => {
            controller.abort()
            reject(new Error("Apartment data request timed out. Please retry."))
        }, ORBIT_APARTMENT_REQUEST_TIMEOUT)
    })
    const download = fetch(url, {
        mode: "cors",
        credentials: "omit",
        cache: "no-cache",
        headers: { Accept: "application/json" },
        signal: controller.signal,
    })
        .then((response) => {
            if (!response.ok)
                throw new Error(
                    `Apartment data could not be loaded (${response.status}).`
                )
            return response.json()
        })
        .then(parseOrbitApartmentDataset)
    const entry: OrbitApartmentRequest = {
        promise: null as unknown as Promise<OrbitApartmentDataset>,
        cancel,
        pending: true,
    }
    entry.promise = Promise.race([download, cancellation])
        .then((parsed) => {
            // Retain identity when revalidation returns unchanged facts, avoiding
            // unnecessary hover, filter and card rebuilds every minute.
            const dataset =
                cached &&
                JSON.stringify(cached.dataset) === JSON.stringify(parsed)
                    ? cached.dataset
                    : parsed
            orbitApartmentCache.set(url, { dataset, refreshedAt: Date.now() })
            if (orbitApartmentCache.size > 8)
                for (const key of orbitApartmentCache.keys()) {
                    if (
                        key !== url &&
                        !orbitApartmentSubscribers.get(key)?.size
                    ) {
                        orbitApartmentCache.delete(key)
                        break
                    }
                }
            orbitApartmentSubscribers
                .get(url)
                ?.forEach((listener) => listener(dataset))
            return dataset
        })
        .finally(() => {
            entry.pending = false
            clearTimeout(timer)
            if (orbitApartmentRequests.get(url) === entry)
                orbitApartmentRequests.delete(url)
        })
    orbitApartmentRequests.set(url, entry)
    return entry.promise
}
function invalidateOrbitApartmentDataset(url: string): void {
    orbitApartmentCache.delete(url)
    const entry = orbitApartmentRequests.get(url)
    if (!entry) return
    orbitApartmentRequests.delete(url)
    if (entry.pending) entry.cancel()
}
function useOrbitApartments(
    url: string,
    enabled: boolean
): {
    dataset: OrbitApartmentDataset | null
    status: "idle" | "loading" | "ready" | "error"
    error: string
    retry: () => void
} {
    const [attempt, setAttempt] = React.useState(0)
    const [state, setState] = React.useState<{
        url: string
        dataset: OrbitApartmentDataset | null
        status: "idle" | "loading" | "ready" | "error"
        error: string
    }>({ url: "", dataset: null, status: "idle", error: "" })
    const resolved = orbitApartmentRequestUrl(url)
    React.useEffect(() => {
        if (!enabled) return
        if (!resolved) {
            setState({
                url: url.trim(),
                dataset: null,
                status: "error",
                error: "Set a valid apartment JSON address.",
            })
            return
        }
        let active = true
        const accept = (dataset: OrbitApartmentDataset) => {
            if (active)
                setState((previous) =>
                    previous.url === resolved &&
                    previous.dataset === dataset &&
                    previous.status === "ready" &&
                    !previous.error
                        ? previous
                        : { url: resolved, dataset, status: "ready", error: "" }
                )
        }
        let subscribers = orbitApartmentSubscribers.get(resolved)
        if (!subscribers) {
            subscribers = new Set()
            orbitApartmentSubscribers.set(resolved, subscribers)
        }
        subscribers.add(accept)
        const load = (force = false) => {
            if (!active) return
            setState((previous) =>
                previous.url === resolved && previous.dataset
                    ? previous
                    : {
                          url: resolved,
                          dataset: null,
                          status: "loading",
                          error: "",
                      }
            )
            requestOrbitApartmentDataset(resolved, force).then(
                accept,
                (error) => {
                    if (active)
                        setState((previous) =>
                            previous.url === resolved && previous.dataset
                                ? {
                                      ...previous,
                                      error:
                                          error instanceof Error
                                              ? error.message
                                              : "Apartment data could not be refreshed.",
                                  }
                                : {
                                      url: resolved,
                                      dataset: null,
                                      status: "error",
                                      error:
                                          error instanceof Error
                                              ? error.message
                                              : "Apartment data could not be loaded.",
                                  }
                        )
                }
            )
        }
        const refresh = () => {
            if (!document.hidden) load()
        }
        load(attempt > 0)
        const interval = window.setInterval(refresh, ORBIT_APARTMENT_FRESH_MS)
        document.addEventListener("visibilitychange", refresh)
        window.addEventListener("focus", refresh)
        window.addEventListener("pageshow", refresh)
        return () => {
            active = false
            subscribers!.delete(accept)
            if (!subscribers!.size) orbitApartmentSubscribers.delete(resolved)
            window.clearInterval(interval)
            document.removeEventListener("visibilitychange", refresh)
            window.removeEventListener("focus", refresh)
            window.removeEventListener("pageshow", refresh)
        }
    }, [resolved, url, enabled, attempt])
    const retry = React.useCallback(() => {
        if (resolved) invalidateOrbitApartmentDataset(resolved)
        setAttempt((value) => value + 1)
    }, [resolved])
    if (!enabled)
        return {
            dataset: state.url === resolved ? state.dataset : null,
            status: "idle",
            error: "",
            retry,
        }
    if (state.url !== (resolved || url.trim()))
        return { dataset: null, status: "loading", error: "", retry }
    return {
        dataset: state.dataset,
        status: state.status,
        error: state.error,
        retry,
    }
}

type OrbitFilterStatus = "available" | "under_negotiation" | "sold"

interface OrbitApartmentFilters {
    search?: string
    building?: string
    floor?: number | null
    statuses: OrbitFilterStatus[]
    priceMin: number | null
    priceMax: number | null
    /** Optional for compatibility with previously saved price/status filters. */
    areaMin?: number | null
    areaMax?: number | null
    bedroomsMin?: number | null
    bedroomsMax?: number | null
}

interface OrbitFilterApartment {
    id: string
    building?: string | null
    floor?: number | null
    status: string
    price: number | null
    /** Missing currency follows the apartment dataset's HUF default. */
    currency?: string | null
    areaInterior?: number | null
    bedrooms?: number | null
}

interface OrbitRangeBounds {
    min: number
    max: number
    step: number
}

type OrbitRangeKind = "price" | "area" | "bedrooms"

const orbitRangeFields = {
    price: { minimum: "priceMin", maximum: "priceMax" },
    area: { minimum: "areaMin", maximum: "areaMax" },
    bedrooms: { minimum: "bedroomsMin", maximum: "bedroomsMax" },
} as const

interface OrbitPriceBounds extends OrbitRangeBounds {
    pricedCount: number
    currency: "HUF"
}

interface OrbitAreaBounds extends OrbitRangeBounds {
    areaCount: number
    unit: "m²"
}

interface OrbitApartmentFilterResult {
    /** False means the renderer should highlight only the hovered apartment. */
    active: boolean
    matchingIds: string[]
    filters: OrbitApartmentFilters
}

const orbitFilterStatuses: OrbitFilterStatus[] = [
    "available",
    "under_negotiation",
    "sold",
]
const orbitFilterPriceStep = 1000000

function orbitFilterArea(apartment: OrbitFilterApartment): number | null {
    return typeof apartment.areaInterior === "number" &&
        Number.isFinite(apartment.areaInterior) &&
        apartment.areaInterior >= 0
        ? apartment.areaInterior
        : null
}

function orbitFilterBedrooms(apartment: OrbitFilterApartment): number | null {
    const bedrooms = apartment.bedrooms
    return typeof bedrooms === "number" && Number.isFinite(bedrooms) && bedrooms >= 0
        ? bedrooms
        : null
}

function orbitFilterHufPrice(apartment: OrbitFilterApartment): number | null {
    const currency = apartment.currency
    const isHuf =
        currency === undefined ||
        currency === null ||
        (typeof currency === "string" &&
            currency.trim().toUpperCase() === "HUF")
    return isHuf &&
        typeof apartment.price === "number" &&
        Number.isFinite(apartment.price) &&
        apartment.price >= 0
        ? apartment.price
        : null
}

/** The complete HUF range stays stable when availability choices change. */
function getOrbitPriceBounds(
    apartments: readonly OrbitFilterApartment[]
): OrbitPriceBounds | null {
    let minimum = Infinity,
        maximum = -Infinity,
        pricedCount = 0
    for (const apartment of apartments) {
        const price = orbitFilterHufPrice(apartment)
        if (price === null) continue
        minimum = Math.min(minimum, price)
        maximum = Math.max(maximum, price)
        pricedCount++
    }
    if (!pricedCount) return null
    return {
        min: Math.floor(minimum / orbitFilterPriceStep) * orbitFilterPriceStep,
        max: Math.ceil(maximum / orbitFilterPriceStep) * orbitFilterPriceStep,
        step: orbitFilterPriceStep,
        pricedCount,
        currency: "HUF",
    }
}

/** Interior area uses the complete dataset and outward one-square-metre bounds. */
function getOrbitAreaBounds(
    apartments: readonly OrbitFilterApartment[]
): OrbitAreaBounds | null {
    let minimum = Infinity,
        maximum = -Infinity,
        areaCount = 0
    for (const apartment of apartments) {
        const area = orbitFilterArea(apartment)
        if (area === null) continue
        minimum = Math.min(minimum, area)
        maximum = Math.max(maximum, area)
        areaCount++
    }
    return areaCount
        ? {
              min: Math.floor(minimum),
              max: Math.ceil(maximum),
              step: 1,
              areaCount,
              unit: "m²",
          }
        : null
}

/** Keep studio and half-bedroom values as provided by the apartment dataset. */
function getOrbitBedroomBounds(
    apartments: readonly OrbitFilterApartment[]
): OrbitRangeBounds | null {
    let min = Infinity, max = -Infinity, step = 1
    for (const apartment of apartments) {
        const bedrooms = orbitFilterBedrooms(apartment)
        if (bedrooms === null) continue
        min = Math.min(min, bedrooms)
        max = Math.max(max, bedrooms)
        if (!Number.isInteger(bedrooms)) step = .5
    }
    return Number.isFinite(min) ? { min, max, step } : null
}

/** Canonicalize without modifying slider state or the original apartment data. */
function normalizeOrbitFilters(
    filters: Partial<OrbitApartmentFilters> | null | undefined,
    bounds?: OrbitPriceBounds | null,
    areaBounds?: OrbitAreaBounds | null,
    bedroomBounds?: OrbitRangeBounds | null
): OrbitApartmentFilters {
    const selected = Array.isArray(filters?.statuses) ? filters.statuses : []
    const statuses = orbitFilterStatuses.filter((status) =>
        selected.includes(status)
    )
    const limit = (value: unknown) =>
        typeof value === "number" && Number.isFinite(value)
            ? Math.max(0, value)
            : null
    const range = (
        minimum: unknown,
        maximum: unknown,
        rangeBounds?: { min: number; max: number } | null
    ): [number | null, number | null] => {
        let min = limit(minimum),
            max = limit(maximum)
        if (min !== null && max !== null && min > max) [min, max] = [max, min]
        if (rangeBounds === null) return [null, null]
        if (rangeBounds) {
            const low = limit(rangeBounds.min),
                high = limit(rangeBounds.max)
            if (low === null || high === null || high < low) return [null, null]
            const clamp = (value: number) =>
                Math.min(high, Math.max(low, value))
            if (min !== null) min = clamp(min)
            if (max !== null) max = clamp(max)
            // Full span means unrestricted, so records without this value remain eligible.
            if (min !== null && min <= low) min = null
            if (max !== null && max >= high) max = null
        }
        return [min, max]
    }
    const [priceMin, priceMax] = range(
        filters?.priceMin,
        filters?.priceMax,
        bounds
    )
    const result: OrbitApartmentFilters = { statuses, priceMin, priceMax }
    if (typeof filters?.search === "string") result.search = filters.search.slice(0,48)
    if (typeof filters?.building === "string") result.building = filters.building.trim().slice(0,64)
    if (typeof filters?.floor === "number" && Number.isFinite(filters.floor)) result.floor = filters.floor
    for (const kind of ["area", "bedrooms"] as const) {
        const { minimum, maximum } = orbitRangeFields[kind]
        if (!filters || !(minimum in filters || maximum in filters)) continue
        const [min, max] = range(
            filters[minimum], filters[maximum], kind === "area" ? areaBounds : bedroomBounds
        )
        result[minimum] = min
        result[maximum] = max
    }
    return result
}

function normalizeOrbitApartmentSearch(value: unknown): string {
    return String(value ?? "").normalize("NFKC").replace(/[\s.\-_–—]/g, "").toUpperCase()
}

/** Statuses are ORed; the other active criteria are ANDed. */
function getOrbitFilterResult(
    apartments: readonly OrbitFilterApartment[],
    filters: Partial<OrbitApartmentFilters> | null | undefined,
    bounds: OrbitPriceBounds | null = getOrbitPriceBounds(apartments),
    areaBounds: OrbitAreaBounds | null = getOrbitAreaBounds(apartments),
    bedroomBounds: OrbitRangeBounds | null = getOrbitBedroomBounds(apartments)
): OrbitApartmentFilterResult {
    const normalized = normalizeOrbitFilters(filters, bounds, areaBounds, bedroomBounds)
    const hasStatusFilter = normalized.statuses.length > 0
    const hasPriceFilter =
        normalized.priceMin !== null || normalized.priceMax !== null
    const hasAreaFilter =
        normalized.areaMin != null || normalized.areaMax != null
    const hasBedroomFilter = normalized.bedroomsMin != null || normalized.bedroomsMax != null
    const search = normalizeOrbitApartmentSearch(normalized.search)
    const building = normalizeOrbitApartmentSearch(normalized.building)
    const hasFloorFilter = normalized.floor != null
    const active = hasStatusFilter || hasPriceFilter || hasAreaFilter || hasBedroomFilter || !!search || !!building || hasFloorFilter
    const matchingIds: string[] = []
    for (const apartment of apartments) {
        if (search && !normalizeOrbitApartmentSearch(apartment.id).includes(search)) continue
        if (building && normalizeOrbitApartmentSearch(apartment.building) !== building) continue
        if (hasFloorFilter && apartment.floor !== normalized.floor) continue
        if (
            hasStatusFilter &&
            !normalized.statuses.includes(apartment.status as OrbitFilterStatus)
        )
            continue
        if (hasPriceFilter) {
            const price = orbitFilterHufPrice(apartment)
            if (
                price === null ||
                (normalized.priceMin !== null && price < normalized.priceMin) ||
                (normalized.priceMax !== null && price > normalized.priceMax)
            )
                continue
        }
        if (hasAreaFilter) {
            const area = orbitFilterArea(apartment)
            if (
                area === null ||
                (normalized.areaMin != null && area < normalized.areaMin) ||
                (normalized.areaMax != null && area > normalized.areaMax)
            )
                continue
        }
        if (hasBedroomFilter) {
            const bedrooms = orbitFilterBedrooms(apartment)
            if (
                bedrooms === null ||
                (normalized.bedroomsMin != null && bedrooms < normalized.bedroomsMin) ||
                (normalized.bedroomsMax != null && bedrooms > normalized.bedroomsMax)
            )
                continue
        }
        matchingIds.push(apartment.id)
    }
    return { active, matchingIds, filters: normalized }
}

// Inlined into the standalone homepage component; state lives in the homepage.
interface OrbitFilterBarProps {
    active: boolean
    visible?: boolean
    language: "hu" | "en"
    filters: OrbitApartmentFilters
    bounds: OrbitPriceBounds | null
    areaBounds?: OrbitAreaBounds | null
    bedroomBounds?: OrbitRangeBounds | null
    matchCount: number
    total: number
    onChange: (filters: OrbitApartmentFilters) => void
    presentation?: "compact" | "floating" | "overlay"
}

const orbitLiquidGlassStyles = `
/* Shared optical material; only explicit orbit pods receive it. */
[data-orbit-glass-tone="overlay"] {
    --og-tint: rgba(18,30,38,.82);
    --og-edge: rgba(255,255,255,.46);
    --og-shadow: rgba(4,16,25,.22);
    --og-backdrop: none;
    --og-text-shadow: 0 1px 2px rgba(0,0,0,.24);
}
[data-orbit-glass-tone="paper"] {
    --og-tint: rgba(248,251,252,.96);
    --og-edge: rgba(255,255,255,.88);
    --og-shadow: rgba(36,61,73,.12);
    --og-backdrop: none;
    --og-text-shadow: none;
}
@supports ((backdrop-filter:blur(1px)) or (-webkit-backdrop-filter:blur(1px))) {
    [data-orbit-glass-tone="overlay"] {
        --og-tint: rgba(18,30,38,.32);
        --og-backdrop: blur(18px) saturate(165%) brightness(.92);
    }
    [data-orbit-glass-tone="paper"] {
        --og-tint: rgba(249,252,253,.55);
        --og-backdrop: blur(16px) saturate(145%);
    }
}
[data-orbit-glass-pod] {
    --og-inset: 0px;
    position: relative;
    isolation: isolate;
    border-radius: 25px;
    text-shadow: var(--og-text-shadow);
}
[data-orbit-glass-pod]::before,
[data-orbit-glass-pod]::after {
    content: "";
    position: absolute;
    inset: var(--og-inset);
    z-index: -1;
    border-radius: inherit;
    pointer-events: none !important;
}
[data-orbit-glass-pod]::before {
    border: 1px solid var(--og-edge);
    background:
        radial-gradient(130% 100% at 0% 0%,rgba(255,255,255,.16),transparent 48%),
        radial-gradient(110% 130% at 100% 100%,rgba(255,255,255,.10),transparent 52%),
        linear-gradient(150deg,rgba(255,255,255,.065),rgba(255,255,255,.01) 46%,rgba(255,255,255,.045)),
        var(--og-tint);
    -webkit-backdrop-filter: var(--og-backdrop);
    backdrop-filter: var(--og-backdrop);
    box-shadow: inset 0 1px 1px rgba(255,255,255,.56),inset 0 -1px 1px rgba(0,0,0,.14),0 9px 28px var(--og-shadow),0 1px 3px rgba(7,21,31,.10);
}
[data-orbit-glass-pod]::after {
    inset: calc(var(--og-inset) + 1px);
    border: 1px solid rgba(255,255,255,.10);
    box-shadow: inset 1px 0 0 rgba(255,255,255,.20),inset -1px 0 0 rgba(255,255,255,.06);
}
[data-orbit-glass-pod="identity"] { width: max-content; max-width: 100%; padding: 10px 16px; border-radius: 999px; }
[data-orbit-glass-pod="facts"] { padding: 11px 16px; }
[data-orbit-glass-pod="plan"] { --og-inset: -8px; border-radius: 28px; }
[data-orbit-glass-pod="conversion"] { --og-inset: -6px; border-radius: 999px; }
[data-orbit-glass-pod="filter"] { --og-inset: -3px; border-radius: 999px; }
[data-orbit-glass-pod="popover"] {
    --og-inset: 0px;
    --og-tint: rgba(247,251,253,.94);
    --og-edge: rgba(255,255,255,.90);
    --og-shadow: rgba(14,37,52,.22);
    --og-backdrop: blur(20px) saturate(145%);
    z-index: 30;
    border-radius: 22px;
    text-shadow: none;
}
[data-orbit-glass-pod="portrait"] { --og-inset: -6px; border-radius: 26px; }

/* Local contrast replaces the broad dark sheet and its divider lines. */
[data-orbit-glass-tone][data-apartment-details]::before { opacity: .22; }
[data-orbit-glass-tone] [data-orbitdata-divider] { display: none; }
[data-orbit-glass-tone][data-apartment-details] .admiral-details-summary .admiral-details-label { color: rgba(255,255,255,.94); }
[data-orbit-glass-tone][data-apartment-details] .admiral-details-identity { justify-self: start; }
[data-orbit-glass-tone][data-apartment-details] .admiral-details-filter-row { position: relative; z-index: 6; }
[data-orbit-glass-tone][data-apartment-details] [data-apartment-open]:hover .admiral-details-plan-image { opacity: 1; }
[data-orbit-glass-tone][data-apartment-details] .admiral-details-plan-caption { color: rgba(255,255,255,.95); }

[data-orbit-glass-tone][data-orbit-fullscreen-details] .orbit-fullscreen-bar { background: linear-gradient(0deg,rgba(7,16,24,.13),rgba(7,16,24,0) 90%); }
[data-orbit-glass-tone][data-orbit-fullscreen-details] .orbit-fullscreen-stats { padding: 9px 12px; gap: 7px; }
[data-orbit-glass-tone][data-orbit-fullscreen-details] .orbit-fullscreen-identity { padding: 9px 12px; }
[data-orbit-glass-tone][data-orbit-fullscreen-details] dt { opacity: 1; color: rgba(255,255,255,.94); }
[data-orbit-glass-tone][data-orbit-fullscreen-details] .orbit-fullscreen-right { position: relative; z-index: 6; }
[data-orbit-glass-tone][data-orbit-fullscreen-details] .orbit-fullscreen-conversion { margin-top: 3px; }
[data-orbit-glass-tone][data-orbit-fullscreen-details] .orbit-fullscreen-price { padding-left: 10px; }
[data-orbit-glass-tone][data-orbit-fullscreen-details][data-compact="true"] .orbit-fullscreen-identity { padding: 6px 10px; }
[data-orbit-glass-tone][data-orbit-fullscreen-details][data-compact="true"] .orbit-fullscreen-stats { padding: 2px 8px; gap: 3px; }

/* Filters share two glass rails; their inner buttons do not repeat the blur. */
[data-orbit-filters][data-orbit-glass-tone][data-presentation] { overflow: visible; z-index: 10; }
[data-orbit-filters][data-orbit-glass-tone][data-presentation] :is([data-orbit-filter-status],[data-orbit-range-toggle]) {
    border-radius: 999px;
    border-color: rgba(255,255,255,.14);
    background: linear-gradient(155deg,rgba(255,255,255,.075),rgba(255,255,255,.015));
    box-shadow: inset 0 1px 0 rgba(255,255,255,.16);
    transition: background .16s ease,box-shadow .16s ease,border-color .16s ease;
}
[data-orbit-filters][data-orbit-glass-tone="overlay"][data-presentation] :is([data-orbit-filter-status],[data-orbit-range-toggle]) { color: #fff; }
[data-orbit-filters][data-orbit-glass-tone="paper"][data-presentation] :is([data-orbit-filter-status],[data-orbit-range-toggle]) { color: #273e45; border-color: rgba(60,88,101,.12); }
[data-orbit-filters][data-orbit-glass-tone][data-presentation] :is([data-orbit-filter-status],[data-orbit-range-toggle]):is([aria-pressed="true"],[data-filtered="true"],[aria-expanded="true"]) {
    border-color: rgba(255,255,255,.78);
    background: linear-gradient(160deg,rgba(255,255,255,.30),rgba(255,255,255,.12));
    box-shadow: inset 0 1px 1px rgba(255,255,255,.64),0 2px 7px rgba(8,24,36,.09);
}
[data-orbit-filters][data-orbit-glass-tone="paper"][data-presentation] :is([data-orbit-filter-status],[data-orbit-range-toggle]):is([aria-pressed="true"],[data-filtered="true"],[aria-expanded="true"]) {
    color: #15353b; border-color: rgba(57,89,102,.30); background: rgba(255,255,255,.86);
}
[data-orbit-filters][data-orbit-glass-tone][data-presentation] [data-orbit-filter-count] { color: inherit; opacity: .9; }
[data-orbit-filters][data-orbit-glass-tone="overlay"][data-presentation] [data-orbit-filter-reset] { color: white; }
[data-orbit-filters][data-orbit-glass-tone][data-presentation] [data-orbit-range-popover] {
    z-index: 30; border: 0; background: none; box-shadow: none; color: #203740; overflow: visible;
}
[data-orbit-filters][data-orbit-glass-tone][data-presentation] .orbit-filter-price-caption { color: #526a74; }
[data-orbit-filters][data-orbit-glass-tone][data-presentation] .orbit-filter-price-track { background: rgba(69,100,115,.18); }
[data-orbit-filters][data-orbit-glass-tone][data-presentation] .orbit-filter-price-selection { background: #385c69; }
[data-orbit-filters][data-orbit-glass-tone][data-presentation] input[type="range"]::-webkit-slider-thumb {
    border-color: rgba(255,255,255,.96); background: linear-gradient(145deg,#fff,#eaf1f4);
    box-shadow: inset 0 1px 1px white,0 2px 7px rgba(25,57,73,.22);
}
[data-orbit-filters][data-orbit-glass-tone][data-presentation] input[type="range"]::-moz-range-thumb {
    border-color: rgba(255,255,255,.96); background: #f7fafc; box-shadow: 0 2px 7px rgba(25,57,73,.22);
}
@media (hover:hover) {
    [data-orbit-filters][data-orbit-glass-tone][data-presentation] :is([data-orbit-filter-status],[data-orbit-range-toggle]):not(:disabled):hover {
        border-color: rgba(255,255,255,.62); background: rgba(255,255,255,.19); box-shadow: inset 0 1px 1px rgba(255,255,255,.45),0 2px 8px rgba(6,23,34,.08);
    }
    [data-orbit-filters][data-orbit-glass-tone="paper"][data-presentation] :is([data-orbit-filter-status],[data-orbit-range-toggle]):not(:disabled):hover { background: rgba(255,255,255,.94); }
}
[data-orbit-studio][data-mobile="true"][data-orbit-glass-tone] [data-orbit-glass-pod="portrait"] { overflow: visible; }
[data-orbit-studio][data-mobile="true"][data-orbit-glass-tone] .orbit-studio-mobile-plan-button { border-radius: 17px; background: rgba(255,255,255,.34); box-shadow: inset 0 1px 1px rgba(255,255,255,.8); }
[data-orbit-studio][data-mobile="true"][data-orbit-glass-tone] .orbit-studio-primary { background: linear-gradient(155deg,#3c5759,#203c3d); border-color: rgba(255,255,255,.62); box-shadow: inset 0 1px 0 rgba(255,255,255,.38),0 4px 11px rgba(25,55,64,.15); }
[data-orbit-studio][data-mobile="true"][data-orbit-glass-tone] .orbit-studio-mobile-actions { border-color: rgba(70,103,119,.12); }
[data-orbit-glass-tone] .orbit-fullscreen-detail { background: linear-gradient(150deg,rgba(255,255,255,.98),rgba(234,243,247,.94)); border-color: rgba(255,255,255,.92); box-shadow: inset 0 1px 1px white,0 3px 9px rgba(3,20,31,.10); }

/* Stop hidden backdrop surfaces from adding camera-frame work. */
[data-orbit-filters][data-orbit-filter-visible="false"] [data-orbit-glass-pod]::before,
[data-orbit-studio][data-active="false"] [data-orbit-glass-pod]::before,
[data-apartment-details][data-details-shell-visible="false"] [data-orbit-glass-pod]::before {
    -webkit-backdrop-filter: none; backdrop-filter: none;
}
@media (pointer:coarse) {
    [data-orbit-glass-tone="overlay"] { --og-backdrop: blur(12px) saturate(150%) brightness(.92); }
    [data-orbit-glass-tone="paper"] { --og-backdrop: blur(12px) saturate(135%); }
}
@media (prefers-reduced-motion:reduce) {
    [data-orbit-filters][data-orbit-glass-tone][data-presentation] :is([data-orbit-filter-status],[data-orbit-range-toggle]) { transition: none; }
}
@media (prefers-reduced-transparency:reduce) {
    [data-orbit-glass-tone="overlay"] { --og-tint: rgba(20,33,42,.96); --og-backdrop: none; }
    [data-orbit-glass-tone="paper"] { --og-tint: rgba(249,252,253,.98); --og-backdrop: none; }
    [data-orbit-glass-pod="popover"] { --og-tint: rgba(247,251,253,.98); --og-backdrop: none; }
}
`

const orbitApartmentFilterStyles = `
[data-orbit-filters] { position: relative; width: 100%; min-width: 0; box-sizing: border-box; color: #26382d; font-family: inherit; isolation: isolate; container-type: inline-size; container-name: orbit-filters; opacity: 1; transition: opacity 240ms ease; }
[data-orbit-filters][data-orbit-filter-visible="false"] { opacity: 0; pointer-events: none; }
[data-orbit-filters][data-active="false"] * { pointer-events: none !important; }
[data-orbit-filters][data-active="false"] button:disabled { opacity: 1; }
[data-orbit-filters] *, [data-orbit-filters] *::before, [data-orbit-filters] *::after { box-sizing: border-box; }
[data-orbit-filters] [hidden] { display: none !important; }
[data-orbit-filters] button { display: inline-flex; align-items: center; justify-content: center; min-width: 0; height: 30px; margin: 0; padding: 0; border: 0; border-radius: 8px; color: inherit; background: transparent; font: inherit; cursor: pointer; -webkit-tap-highlight-color: transparent; touch-action: manipulation; }
[data-orbit-filters] button:disabled { opacity: .4; cursor: default; }
[data-orbit-filters] :is(button,input):focus-visible { outline: 2px solid #42634c; outline-offset: 2px; }
[data-orbit-filters] [data-orbit-filter-row] { display: flex; align-items: center; gap: 3px; width: 100%; min-width: 0; height: 30px; padding: 0; border-top: 1px solid rgba(48,67,54,.12); border-bottom: 1px solid rgba(48,67,54,.12); }
[data-orbit-filters] .orbit-filter-statuses { display: flex; align-items: center; flex: 1 1 auto; gap: 2px; min-width: 0; }
[data-orbit-filters] [data-orbit-filter-status] { flex: 1 1 auto; gap: 4px; height: 26px; padding: 0 5px; border: 1px solid transparent; border-radius: 6px; color: #677269; font-size: 10px; font-weight: 500; line-height: 1; letter-spacing: -.15px; white-space: nowrap; }
[data-orbit-filters] [data-orbit-filter-status] .orbit-filter-status-label { overflow: hidden; min-width: 0; text-overflow: ellipsis; }
[data-orbit-filters] .orbit-filter-dot { flex: 0 0 auto; width: 4px; height: 4px; border-radius: 50%; background: var(--filter-dot,var(--orbit-available-color,#46A66A)); opacity: 1; }
[data-orbit-filters] [data-orbit-filter-status="under_negotiation"] { --filter-dot: var(--orbit-negotiation-color,#E2B849); }
[data-orbit-filters] [data-orbit-filter-status="sold"] { --filter-dot: var(--orbit-sold-color,#DA5961); }
[data-orbit-filters] [data-orbit-filter-status][aria-pressed="true"] { border-color: rgba(50,79,59,.2); color: #263f2e; background: #e3eae2; }
[data-orbit-filters] [data-orbit-price-toggle] { flex: 0 0 auto; gap: 3px; height: 26px; padding: 0 6px; color: #56635a; font-size: 10px; font-weight: 600; line-height: 1; }
[data-orbit-filters] [data-orbit-price-toggle][data-filtered="true"], [data-orbit-filters] [data-orbit-price-toggle][aria-expanded="true"] { color: #263f2e; background: #e3eae2; }
[data-orbit-filters] [data-orbit-price-toggle] svg { width: 11px; height: 11px; flex-shrink: 0; }
[data-orbit-filters] [data-orbit-filter-count] { flex: 0 0 auto; min-width: 26px; padding: 0 2px; color: #758078; font-size: 9px; font-weight: 500; line-height: 1; font-variant-numeric: tabular-nums; text-align: center; white-space: nowrap; }
[data-orbit-filters] [data-orbit-filter-reset] { flex: 0 0 24px; width: 24px; height: 26px; color: #526357; }
[data-orbit-filters] [data-orbit-filter-reset] svg { width: 12px; height: 12px; }
[data-orbit-filters] [data-orbit-price-popover] { position: absolute; z-index: 4; bottom: calc(100% + 6px); left: 0; right: 0; height: 62px; min-width: 0; padding: 7px 10px; border: 1px solid rgba(48,67,54,.15); border-radius: 12px; background: #fbfcf8; box-shadow: 0 5px 22px rgba(35,50,39,.12); }
[data-orbit-filters] .orbit-filter-price-values { display: flex; align-items: center; justify-content: space-between; gap: 12px; height: 15px; min-width: 0; font-size: 10px; font-weight: 600; line-height: 1; font-variant-numeric: tabular-nums; }
[data-orbit-filters] .orbit-filter-price-caption { color: #738077; font-size: 9px; font-weight: 500; }
[data-orbit-filters] .orbit-filter-price-stage { position: relative; height: 28px; margin-top: 3px; touch-action: none; user-select: none; -webkit-user-select: none; cursor: ew-resize; }
[data-orbit-filters] .orbit-filter-price-track, [data-orbit-filters] .orbit-filter-price-selection { position: absolute; top: 13px; height: 2px; border-radius: 2px; pointer-events: none; }
[data-orbit-filters] .orbit-filter-price-track { left: 12px; right: 12px; background: #dce3da; }
[data-orbit-filters] .orbit-filter-price-selection { background: #48634d; }
[data-orbit-filters] input[type="range"] { position: absolute; inset: 0; width: 100%; height: 28px; margin: 0; padding: 0; border: 0; border-radius: 5px; outline-offset: 1px; background: transparent; appearance: none; -webkit-appearance: none; pointer-events: none; touch-action: none; }
[data-orbit-filters] input[type="range"]::-webkit-slider-runnable-track { height: 2px; background: transparent; border: 0; }
[data-orbit-filters] input[type="range"]::-webkit-slider-thumb { width: 24px; height: 24px; margin-top: -11px; border: 1px solid #ccd7ca; border-radius: 50%; background: #fdfefb; box-shadow: 0 1px 3px rgba(35,50,39,.18),inset 0 0 0 7px #fdfefb; appearance: none; -webkit-appearance: none; pointer-events: auto; cursor: ew-resize; }
[data-orbit-filters] input[type="range"]::-moz-range-track { height: 2px; background: transparent; border: 0; }
[data-orbit-filters] input[type="range"]::-moz-range-thumb { width: 22px; height: 22px; border: 1px solid #ccd7ca; border-radius: 50%; background: #fdfefb; box-shadow: 0 1px 3px rgba(35,50,39,.18); pointer-events: auto; cursor: ew-resize; }
[data-orbit-filters] input[type="range"]:focus-visible::-webkit-slider-thumb { border-color: #42634c; }
[data-orbit-filters] input[type="range"]:focus-visible::-moz-range-thumb { border-color: #42634c; }
[data-orbit-filters] input[type="range"]:disabled::-webkit-slider-thumb { pointer-events: none; }
[data-orbit-filters] input[type="range"]:disabled::-moz-range-thumb { pointer-events: none; }
[data-orbit-filters][data-presentation="floating"] { padding: 4px 10px; border: 1px solid rgba(255,255,255,.8); border-radius: 12px; background: rgba(251,252,248,.96); box-shadow: 0 4px 20px rgba(10,25,16,.12); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); font-family: Montserrat,Arial,Helvetica,sans-serif; }
[data-orbit-filters][data-presentation="floating"] [data-orbit-filter-row] { height: 36px; border: 0; gap: 5px; }
[data-orbit-filters][data-presentation="floating"] [data-orbit-filter-status] { height: 32px; padding: 0 9px; font-size: 12px; }
[data-orbit-filters][data-presentation="floating"] [data-orbit-price-toggle] { height: 32px; padding: 0 9px; font-size: 12px; }
[data-orbit-filters][data-presentation="floating"] [data-orbit-filter-count] { min-width: 36px; font-size: 10px; }
[data-orbit-filters][data-presentation="overlay"] { color: #fff; }
[data-orbit-filters][data-presentation="overlay"] [data-orbit-filter-row] { height: 30px; border: 0; }
[data-orbit-filters][data-presentation="overlay"] :is([data-orbit-filter-status],[data-orbit-price-toggle]) { height: 28px; color: rgba(255,255,255,.85); font-size: 11px; }
[data-orbit-filters][data-presentation="overlay"] [data-orbit-filter-status][aria-pressed="true"], [data-orbit-filters][data-presentation="overlay"] [data-orbit-price-toggle]:is([data-filtered="true"],[aria-expanded="true"]) { color: #fff; border-color: rgba(255,255,255,.45); background: rgba(255,255,255,.13); }
[data-orbit-filters][data-presentation="overlay"] :is([data-orbit-filter-count],[data-orbit-filter-reset]) { color: rgba(255,255,255,.78); }
[data-orbit-filters][data-presentation="overlay"] button:not(:disabled):hover { color: #fff; background: rgba(255,255,255,.18); }
[data-orbit-filters][data-presentation="overlay"] :is(button,input):focus-visible { outline-color: #fff; }
[data-orbit-filters][data-presentation="overlay"] [data-orbit-price-popover] { color: #26382d; }
/* Availability is the primary action; price and area share a quieter second row. */
[data-orbit-filters] [data-orbit-filter-row], [data-orbit-filters][data-presentation="floating"] [data-orbit-filter-row], [data-orbit-filters][data-presentation="overlay"] [data-orbit-filter-row] { height: auto; border: 0; gap: 0; }
[data-orbit-filters] .orbit-filter-statuses { display: grid; grid-template-columns: 1fr 1.65fr .85fr; width: 100%; gap: 4px; }
[data-orbit-filters] [data-orbit-filter-status] { height: 38px; padding: 0 6px; gap: 5px; border-color: rgba(48,67,54,.32); border-radius: 7px; color: #4d5f51; font-size: 11px; font-weight: 600; line-height: 1.1; letter-spacing: -.2px; }
[data-orbit-filters] [data-orbit-filter-status] .orbit-filter-status-label { overflow: visible; text-overflow: clip; }
[data-orbit-filters] .orbit-filter-dot { width: 5px; height: 5px; }
[data-orbit-filters] [data-orbit-filter-status][aria-pressed="true"] { border-color: #526e57; box-shadow: inset 0 0 0 .5px #526e57; }
[data-orbit-filters] [data-orbit-filter-ranges] { display: flex; align-items: center; width: 100%; min-width: 0; gap: 5px; margin-top: 5px; }
[data-orbit-filters] [data-orbit-range-toggle], [data-orbit-filters][data-presentation="floating"] [data-orbit-range-toggle], [data-orbit-filters][data-presentation="overlay"] [data-orbit-range-toggle] { flex: 1 1 0; gap: 5px; height: 34px; padding: 0 8px; border: 1px solid rgba(48,67,54,.15); border-radius: 7px; color: #4d5f51; font-size: 11px; font-weight: 600; line-height: 1; white-space: nowrap; }
[data-orbit-filters] [data-orbit-range-toggle][data-filtered="true"], [data-orbit-filters] [data-orbit-range-toggle][aria-expanded="true"] { color: #203a28; border-color: #6d826f; background: #e3eae2; }
[data-orbit-filters] [data-orbit-range-toggle] svg { width: 12px; height: 12px; flex-shrink: 0; }
[data-orbit-filters] [data-orbit-filter-count] { min-width: 35px; padding: 0 3px; font-size: 10px; }
[data-orbit-filters] [data-orbit-filter-reset] { flex-basis: 32px; width: 32px; height: 34px; }
[data-orbit-filters] [data-orbit-range-popover] { position: absolute; z-index: 4; bottom: calc(100% + 7px); left: 0; right: 0; height: 76px; min-width: 0; padding: 10px 11px; border: 1px solid rgba(48,67,54,.15); border-radius: 12px; color: #26382d; background: #fbfcf8; box-shadow: 0 5px 22px rgba(35,50,39,.12); }
[data-orbit-filters] .orbit-filter-price-values { height: 17px; font-size: 11px; gap: 8px; white-space: nowrap; }
[data-orbit-filters] .orbit-filter-price-caption { font-size: 10px; }
[data-orbit-filters] .orbit-filter-price-stage { height: 32px; margin-top: 5px; }
[data-orbit-filters] .orbit-filter-price-track, [data-orbit-filters] .orbit-filter-price-selection { top: 15px; }
[data-orbit-filters] input[type="range"] { height: 32px; }
[data-orbit-filters][data-presentation="floating"] { padding: 8px; }
[data-orbit-filters][data-presentation="overlay"] [data-orbit-filter-status] { height: 39px; padding: 0 6px; color: #fff; border-color: rgba(255,255,255,.57); font-size: 13px; }
[data-orbit-filters][data-presentation="overlay"] [data-orbit-range-toggle] { color: rgba(255,255,255,.92); border-color: rgba(255,255,255,.45); font-size: 12px; }
[data-orbit-filters][data-presentation="overlay"] [data-orbit-filter-status][aria-pressed="true"], [data-orbit-filters][data-presentation="overlay"] [data-orbit-range-toggle]:is([data-filtered="true"],[aria-expanded="true"]) { color: #fff; border-color: rgba(255,255,255,.75); background: rgba(255,255,255,.2); box-shadow: inset 0 0 0 .5px rgba(255,255,255,.55); }
@container orbit-filters (max-width: 330px) { [data-orbit-filters][data-presentation="overlay"] [data-orbit-filter-status] { font-size: 11px; padding: 0 4px; gap: 4px; } }
@container orbit-filters (max-width: 260px) { [data-orbit-filters] .orbit-filter-statuses { gap: 2px; } [data-orbit-filters] [data-orbit-filter-status], [data-orbit-filters][data-presentation="overlay"] [data-orbit-filter-status] { font-size: 10px; padding: 0 3px; gap: 3px; letter-spacing: -.3px; } [data-orbit-filters] [data-orbit-filter-count] { min-width: 29px; padding: 0; font-size: 9px; } [data-orbit-filters] [data-orbit-range-toggle] { padding: 0 4px; font-size: 10px; } }
@media (hover:hover) { [data-orbit-filters] button:not(:disabled):hover { background: #edf1e9; } [data-orbit-filters] [aria-pressed="true"]:hover { background: #dce6da; } }
@media (prefers-reduced-motion:reduce) { [data-orbit-filters], [data-orbit-filters] *, [data-orbit-filters] *::before, [data-orbit-filters] *::after { animation: none !important; transition: none !important; } }

@container orbit-filters (max-width: 285px) {
    [data-orbit-filters] [data-orbit-range-toggle] svg { display: none; }
}
/* @ORBIT_PILL_MATCH_BEGIN */
/* Match the list's pill material without adding a blur layer per control.
   The orbit rails retain their existing backdrop and layout geometry. */
[data-orbit-filters][data-orbit-ignore][data-presentation][data-active] {
    --ofp-paper: #fcfcfa;
    --ofp-ink: #242a27;
    --ofp-accent: #a38c69;
    --ofp-fill: color-mix(in srgb, var(--ofp-paper) 72%, transparent);
    --ofp-rim: color-mix(in srgb, var(--ofp-ink) 17%, transparent);
    --ofp-hover-rim: color-mix(in srgb, var(--ofp-accent) 55%, var(--ofp-paper));
    --ofp-selected: color-mix(in srgb, var(--ofp-accent) 18%, var(--ofp-paper));
    --ofp-selected-rim: color-mix(in srgb, var(--ofp-accent) 65%, var(--ofp-paper));
    --ofp-highlight: rgb(255 255 255 / 90%);
    --ofp-shade: color-mix(in srgb, var(--ofp-ink) 6%, transparent);
    --ofp-shadow: color-mix(in srgb, var(--ofp-ink) 5%, transparent);
    --ofp-sheen: radial-gradient(130% 100% at 0% 0%, rgb(255 255 255 / 30%), transparent 48%), radial-gradient(110% 130% at 100% 100%, rgb(255 255 255 / 18%), transparent 52%), linear-gradient(150deg, rgb(255 255 255 / 18%), rgb(255 255 255 / 2%) 46%, rgb(255 255 255 / 12%));
}
[data-orbit-filters][data-orbit-ignore][data-presentation="overlay"][data-active] {
    --ofp-ink: #fff;
    --ofp-fill: rgb(255 255 255 / 10%);
    --ofp-rim: rgb(255 255 255 / 30%);
    --ofp-hover-rim: rgb(255 255 255 / 65%);
    --ofp-selected: rgb(163 140 105 / 38%);
    --ofp-selected-rim: rgb(255 255 255 / 78%);
    --ofp-highlight: rgb(255 255 255 / 55%);
    --ofp-shade: rgb(0 0 0 / 12%);
    --ofp-shadow: rgb(4 16 25 / 12%);
}
[data-orbit-filters][data-orbit-ignore][data-presentation][data-active] :is([data-orbit-filter-status], [data-orbit-range-toggle], [data-orbit-filter-reset]) {
    border: 1px solid var(--ofp-rim);
    border-radius: 999px;
    color: var(--ofp-ink);
    background: var(--ofp-sheen), var(--ofp-fill);
    box-shadow: inset 0 1px 1px var(--ofp-highlight), inset 0 -1px 0 var(--ofp-shade), 0 2px 7px var(--ofp-shadow);
    font-weight: 500;
    transition: background .18s, border-color .18s, box-shadow .18s;
}
[data-orbit-filters][data-orbit-ignore][data-presentation][data-active] :is([data-orbit-filter-status], [data-orbit-range-toggle]):is([aria-pressed="true"], [data-filtered="true"], [aria-expanded="true"]) {
    color: var(--ofp-ink);
    border-color: var(--ofp-selected-rim);
    background: var(--ofp-sheen), var(--ofp-selected);
    box-shadow: inset 0 1px 1px var(--ofp-highlight), inset 0 0 0 1px color-mix(in srgb, var(--ofp-accent) 16%, transparent), 0 2px 7px var(--ofp-shadow);
}
@media (hover: hover) {
    [data-orbit-filters][data-orbit-ignore][data-presentation][data-active] :is([data-orbit-filter-status], [data-orbit-range-toggle], [data-orbit-filter-reset]):not(:disabled):hover {
        color: var(--ofp-ink);
        border-color: var(--ofp-hover-rim);
        background: var(--ofp-sheen), var(--ofp-fill);
        box-shadow: inset 0 1px 1px var(--ofp-highlight), 0 3px 10px var(--ofp-shadow);
    }
    [data-orbit-filters][data-orbit-ignore][data-presentation][data-active] :is([data-orbit-filter-status], [data-orbit-range-toggle]):is([aria-pressed="true"], [data-filtered="true"], [aria-expanded="true"]):not(:disabled):hover {
        border-color: var(--ofp-selected-rim);
        background: var(--ofp-sheen), var(--ofp-selected);
        box-shadow: inset 0 1px 1px var(--ofp-highlight), inset 0 0 0 1px color-mix(in srgb, var(--ofp-accent) 25%, transparent), 0 3px 10px var(--ofp-shadow);
    }
}
[data-orbit-filters][data-orbit-ignore][data-presentation][data-active] button:focus-visible { outline: 2px solid var(--ofp-accent); outline-offset: 3px; }
[data-orbit-filters][data-orbit-ignore][data-presentation="overlay"][data-active] button:focus-visible { outline-color: #fff; }
@media (prefers-reduced-motion: reduce) {
    [data-orbit-filters][data-orbit-ignore][data-presentation][data-active] button { transition: none; }
}
@media (prefers-reduced-transparency: reduce) {
    [data-orbit-filters][data-orbit-ignore][data-presentation][data-active] { --ofp-fill: var(--ofp-paper); }
    [data-orbit-filters][data-orbit-ignore][data-presentation="overlay"][data-active] { --ofp-fill: #243742; --ofp-selected: #655d4e; }
}
@media (forced-colors: active) {
    [data-orbit-filters][data-orbit-ignore][data-presentation][data-active] :is([data-orbit-filter-status], [data-orbit-range-toggle], [data-orbit-filter-reset]) { border-color: ButtonText; color: ButtonText; background: ButtonFace; box-shadow: none; }
    [data-orbit-filters][data-orbit-ignore][data-presentation][data-active] :is([data-orbit-filter-status], [data-orbit-range-toggle]):is([aria-pressed="true"], [data-filtered="true"], [aria-expanded="true"]) { outline: 2px solid Highlight; outline-offset: -3px; }
    [data-orbit-filters][data-orbit-ignore][data-presentation][data-active] button:focus-visible { outline: 2px solid Highlight; outline-offset: 3px; }
}
/* @ORBIT_PILL_MATCH_END */
`

function orbitPricePointerValue(
    clientX: number,
    rect: { left: number; width: number },
    logicalWidth: number,
    minimum: number,
    maximum: number,
    step: number
) {
    const scale = rect.width / Math.max(1, logicalWidth || rect.width),
        inset = 12 * scale
    const ratio = Math.max(
        0,
        Math.min(
            1,
            (clientX - rect.left - inset) / Math.max(1, rect.width - 2 * inset)
        )
    )
    return Math.max(
        minimum,
        Math.min(
            maximum,
            minimum + Math.round((ratio * (maximum - minimum)) / step) * step
        )
    )
}

/** Project onto the rendered horizontal rail, including the mobile fullscreen rotation. */
function orbitRangePointerGeometry(
    stage: HTMLDivElement,
    clientX: number,
    clientY: number
) {
    const box = stage.getBoundingClientRect()
    let axisX = 1,
        axisY = 0
    for (
        let element: HTMLElement | null = stage;
        element;
        element = element.parentElement
    ) {
        const transform = getComputedStyle(element).transform
        if (!transform || transform === "none") continue
        try {
            const matrix = new DOMMatrixReadOnly(transform),
                x = matrix.a * axisX + matrix.c * axisY
            axisY = matrix.b * axisX + matrix.d * axisY
            axisX = x
        } catch {
            /* Axis-aligned rails retain their normal pointer coordinates. */
        }
    }
    const vertical = Math.abs(axisY) > Math.abs(axisX),
        positive = (vertical ? axisY : axisX) >= 0
    return vertical
        ? {
              point: positive ? clientY : -clientY,
              rect: {
                  left: positive ? box.top : -box.bottom,
                  width: box.height,
              },
          }
        : {
              point: positive ? clientX : -clientX,
              rect: {
                  left: positive ? box.left : -box.right,
                  width: box.width,
              },
          }
}

function OrbitInlineRange({
    kind, bounds, filters, active, hu, onChange,
}: {
    kind: "price" | "area"
    bounds: OrbitRangeBounds | null
    filters: OrbitApartmentFilters
    active: boolean
    hu: boolean
    onChange: (filters: OrbitApartmentFilters) => void
}) {
    const root = React.useRef<HTMLDivElement>(null)
    const drag = React.useRef<{ id: number; side: "minimum" | "maximum"; offset: number } | null>(null)
    const fields = orbitRangeFields[kind]
    const minimum = bounds?.min ?? 0
    const maximum = bounds?.max ?? 0
    const step = bounds?.step ?? 1
    const enabled = active && maximum > minimum
    const low = Math.min(maximum, Math.max(minimum, filters[fields.minimum] ?? minimum))
    const high = Math.max(low, Math.min(maximum, filters[fields.maximum] ?? maximum))
    const latest = React.useRef({ enabled, minimum, maximum, step, low, high, filters, onChange, fields })
    latest.current = { enabled, minimum, maximum, step, low, high, filters, onChange, fields }
    const format = (value: number) => new Intl.NumberFormat(hu ? "hu-HU" : "en-GB", { maximumFractionDigits: 1 })
        .format(kind === "price" ? value / 1000000 : value)
    const unit = kind === "price" ? (hu ? "M Ft" : "M HUF") : "m²"
    const change = (side: "minimum" | "maximum", value: number) => {
        const current = latest.current
        if (!current.enabled || !Number.isFinite(value)) return
        const next = side === "minimum"
            ? Math.max(current.minimum, Math.min(current.high, value))
            : Math.min(current.maximum, Math.max(current.low, value))
        const field = current.fields[side]
        const normalized = next === (side === "minimum" ? current.minimum : current.maximum) ? null : next
        if ((current.filters[field] ?? null) === normalized) return
        const updated = { ...current.filters, [field]: normalized }
        latest.current = { ...current, filters: updated, ...(side === "minimum" ? { low: next } : { high: next }) }
        current.onChange(updated)
    }
    React.useEffect(() => {
        const stage = root.current
        if (!stage) return
        const pointValue = (x: number, y: number, offset = 0) => {
            const geometry = orbitRangePointerGeometry(stage, x, y)
            const current = latest.current
            return orbitPricePointerValue(geometry.point - offset, geometry.rect, stage.offsetWidth,
                current.minimum, current.maximum, current.step)
        }
        const finish = () => {
            const pointer = drag.current
            drag.current = null
            if (pointer && stage.hasPointerCapture(pointer.id)) stage.releasePointerCapture(pointer.id)
        }
        const down = (event: PointerEvent) => {
            if (!latest.current.enabled || drag.current || event.button !== 0 || !event.isPrimary) return
            const box = stage.getBoundingClientRect()
            if (box.width <= 0 || box.height <= 0 || stage.closest("[hidden],[inert],[aria-hidden='true']") ||
                event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) return
            if (event.target instanceof Element && !stage.contains(event.target) && homepageBlocked(event.target)) return
            const current = latest.current
            const value = pointValue(event.clientX, event.clientY)
            const hit = event.target instanceof HTMLInputElement ? event.target.dataset.orbitRangeSide : undefined
            const side = hit === "minimum" || hit === "maximum" ? hit
                : Math.abs(value - current.low) <= Math.abs(value - current.high) ? "minimum" : "maximum"
            const geometry = orbitRangePointerGeometry(stage, event.clientX, event.clientY)
            const inset = 12 * geometry.rect.width / Math.max(1, stage.offsetWidth)
            const selected = side === "minimum" ? current.low : current.high
            const center = geometry.rect.left + inset + (selected - current.minimum) / (current.maximum - current.minimum) * (geometry.rect.width - 2 * inset)
            const offset = Math.abs(geometry.point - center) < 14 ? geometry.point - center : 0
            drag.current = { id: event.pointerId, side, offset }
            if (event.cancelable) event.preventDefault()
            stage.querySelector<HTMLInputElement>(`[data-orbit-range-side="${side}"]`)?.focus({ preventScroll: true })
            stage.setPointerCapture(event.pointerId)
            change(side, pointValue(event.clientX, event.clientY, offset))
        }
        const move = (event: PointerEvent) => {
            const pointer = drag.current
            if (!pointer || event.pointerId !== pointer.id) return
            if (!latest.current.enabled) { finish(); return }
            if (event.cancelable) event.preventDefault()
            change(pointer.side, pointValue(event.clientX, event.clientY, pointer.offset))
        }
        const up = (event: PointerEvent) => { if (drag.current?.id === event.pointerId) finish() }
        window.addEventListener("pointerdown", down, { capture: true, passive: false })
        window.addEventListener("pointermove", move, { capture: true, passive: false })
        window.addEventListener("pointerup", up, true)
        window.addEventListener("pointercancel", up, true)
        window.addEventListener("blur", finish)
        return () => {
            finish()
            window.removeEventListener("pointerdown", down, true)
            window.removeEventListener("pointermove", move, true)
            window.removeEventListener("pointerup", up, true)
            window.removeEventListener("pointercancel", up, true)
            window.removeEventListener("blur", finish)
        }
    }, [])
    const percent = (value: number) => maximum > minimum ? 100 * (value - minimum) / (maximum - minimum) : 0
    const label = kind === "area" ? (hu ? "Alapterület" : "Interior area") : (hu ? "Vételár" : "Purchase price")
    const id = React.useId()
    return (
        <fieldset className="orbit-list-range" disabled={!enabled} data-orbit-inline-range={kind}>
            <legend><span>{label}</span><output>{bounds ? `${format(low)} – ${format(high)} ${unit}` : "—"}</output></legend>
            <div ref={root} className="orbit-list-track" data-orbit-range-track="" data-min-at-max={String(low === maximum)}>
                <span className="orbit-list-rail" aria-hidden="true">
                    <span style={{ left: `${percent(low)}%`, right: `${100 - percent(high)}%` }} />
                </span>
                {(["minimum", "maximum"] as const).map(side => (
                    <input key={side} id={`${id}-${side}`} type="range" min={minimum} max={maximum} step={step}
                        value={side === "minimum" ? low : high} data-orbit-range-side={side}
                        aria-label={hu ? `${side === "minimum" ? "Minimum" : "Maximum"} ${kind === "area" ? "alapterület négyzetméterben" : "vételár forintban"}`
                            : `${side === "minimum" ? "Minimum" : "Maximum"} ${kind === "area" ? "interior area" : "price"}`}
                        aria-valuetext={`${format(side === "minimum" ? low : high)} ${unit}`}
                        onChange={event => change(side, Number(event.currentTarget.value))} />
                ))}
            </div>
        </fieldset>
    )
}

function OrbitListFilters({ active, visible = active, language, filters, bounds, areaBounds = null,
    matchCount, total, onChange, apartments }: OrbitFilterBarProps & { apartments: readonly OrbitApartmentRecord[] }) {
    const hu = language === "hu"
    const id = React.useId()
    const change = (patch: Partial<OrbitApartmentFilters>) => onChange({ ...filters, ...patch })
    const count = Math.max(0, Math.min(total, matchCount))
    const statuses: { id: OrbitFilterStatus; label: string }[] = [
        { id: "available", label: hu ? "Elérhető" : "Available" },
        { id: "under_negotiation", label: hu ? "Egyeztetés alatt" : "In talks" },
        { id: "sold", label: hu ? "Eladva" : "Sold" },
    ]
    const numbers = new Intl.NumberFormat(hu ? "hu-HU" : "en-GB", { maximumFractionDigits: 1 })
    const buildings = [...new Set(apartments.map(a => a.building).filter(Boolean))].sort()
    const floors = [...new Set(apartments.map(a => a.floor).filter((floor): floor is number => floor !== null))].sort((a, b) => a - b)
    const bedrooms = [...new Set(apartments.map(a => a.bedrooms).filter((bedrooms): bedrooms is number => bedrooms !== null && Number.isFinite(bedrooms)))].sort((a, b) => a - b)
    const hasFilters = !!(filters.search || filters.building || filters.floor != null || filters.statuses.length ||
        filters.priceMin != null || filters.priceMax != null || filters.areaMin != null || filters.areaMax != null || filters.bedroomsMin != null || filters.bedroomsMax != null)
    const bedroomValue = filters.bedroomsMin != null && filters.bedroomsMin === filters.bedroomsMax ? String(filters.bedroomsMin) : ""
    const field = (key: string, label: string, control: React.ReactNode) => (
        <div className="orbit-list-field"><label htmlFor={`${id}-${key}`}>{label}</label>{control}</div>
    )
    return (
        <div data-orbit-list-filters="" data-orbit-filters="" data-orbit-ignore="" data-active={String(active)}
            data-orbit-filter-visible={String(visible)} data-filtered={String(hasFilters)} aria-hidden={!visible}
            {...(!visible ? { inert: "" as any } : {})}>
            <fieldset className="orbit-list-primary" disabled={!active} aria-label={hu ? "Lakások szűrése" : "Filter apartments"}>
                {field("search", hu ? "Keresés" : "Search", <input id={`${id}-search`} name="search" type="search"
                    value={filters.search ?? ""} placeholder={hu ? "pl. A001" : "e.g. A001"} maxLength={48}
                    autoComplete="off" autoCapitalize="characters" spellCheck={false}
                    aria-label={hu ? "Keresés lakásszám alapján" : "Search by apartment number"}
                    onChange={event => change({ search: event.currentTarget.value })} />)}
                {field("building", hu ? "Épület" : "Building", <select id={`${id}-building`} name="building" value={filters.building ?? ""}
                    onChange={event => change({ building: event.currentTarget.value })}>
                    <option value="">{hu ? "Összes épület" : "All buildings"}</option>
                    {buildings.map(building => <option key={building} value={building}>{building}</option>)}
                </select>)}
                {field("floor", hu ? "Emelet" : "Floor", <select id={`${id}-floor`} name="floor" value={filters.floor ?? ""}
                    onChange={event => change({ floor: event.currentTarget.value === "" ? null : Number(event.currentTarget.value) })}>
                    <option value="">{hu ? "Összes emelet" : "All floors"}</option>
                    {floors.map(floor => <option key={floor} value={floor}>{apartments.find(a => a.floor === floor)?.floorLabel || (floor === 0 ? (hu ? "Földszint" : "Ground floor") : `${floor}.`)}</option>)}
                </select>)}
                {field("bedrooms", hu ? "Hálószoba" : "Bedrooms", <select id={`${id}-bedrooms`} name="bedrooms" value={bedroomValue}
                    onChange={event => change({ bedroomsMin: event.currentTarget.value === "" ? null : Number(event.currentTarget.value), bedroomsMax: event.currentTarget.value === "" ? null : Number(event.currentTarget.value) })}>
                    <option value="">{hu ? "Összes" : "All"}</option>
                    {bedrooms.map(value => <option key={value} value={value}>{numbers.format(value)}</option>)}
                </select>)}
                {field("status", hu ? "Elérhetőség" : "Availability", <select id={`${id}-status`} name="status"
                    value={filters.statuses.length > 1 ? "multiple" : filters.statuses[0] ?? ""}
                    onChange={event => change({ statuses: event.currentTarget.value ? [event.currentTarget.value as OrbitFilterStatus] : [] })}>
                    <option value="">{hu ? "Minden lakás" : "All apartments"}</option>
                    {filters.statuses.length > 1 && <option value="multiple" disabled>{hu ? "Több állapot" : "Multiple statuses"}</option>}
                    {statuses.map(status => <option key={status.id} value={status.id}>{status.label}</option>)}
                </select>)}
            </fieldset>
            <div className="orbit-list-feedback">
                <span role="status" aria-live="polite" aria-atomic="true" data-orbit-filter-count="">{count} {hu ? "lakás" : "apartments"}</span>
                {hasFilters && <button type="button" disabled={!active} data-orbit-filter-reset=""
                    onClick={() => onChange({ statuses: [], priceMin: null, priceMax: null, areaMin: null, areaMax: null, bedroomsMin: null, bedroomsMax: null, search: "", building: "", floor: null })}>
                    {hu ? "Alaphelyzet" : "Reset filters"}<span aria-hidden="true">↺</span>
                </button>}
            </div>
            <div className="orbit-list-ranges">
                <OrbitInlineRange kind="area" bounds={areaBounds} filters={filters} active={active} hu={hu} onChange={onChange} />
                <OrbitInlineRange kind="price" bounds={bounds} filters={filters} active={active} hu={hu} onChange={onChange} />
            </div>
            <div className="orbit-list-availability" role="group" aria-label={hu ? "Elérhetőségi gyorsszűrők" : "Availability quick filters"}>
                {statuses.map(status => <button key={status.id} type="button" data-orbit-filter-status={status.id}
                    disabled={!active} aria-pressed={filters.statuses.includes(status.id)}
                    onClick={() => change({ statuses: filters.statuses.includes(status.id)
                        ? filters.statuses.filter(value => value !== status.id) : [...filters.statuses, status.id] })}>
                    <span className="orbit-filter-dot" aria-hidden="true" /><span>{status.label}</span>
                </button>)}
            </div>
        </div>
    )
}


function OrbitFilterBar({
    active,
    visible = active,
    language,
    filters,
    bounds,
    areaBounds = null,
    bedroomBounds = null,
    matchCount,
    total,
    onChange,
    presentation = "compact",
}: OrbitFilterBarProps): React.JSX.Element {
    const hu = language === "hu"
    const [priceOpen, setPriceOpen] = React.useState(false)
    const [rangeKind, setRangeKind] = React.useState<OrbitRangeKind>("price")
    const root = React.useRef<HTMLDivElement>(null)
    const priceToggle = React.useRef<HTMLButtonElement>(null)
    const areaToggle = React.useRef<HTMLButtonElement>(null)
    const bedroomsToggle = React.useRef<HTMLButtonElement>(null)
    const minimumInput = React.useRef<HTMLInputElement>(null)
    const maximumInput = React.useRef<HTMLInputElement>(null)
    const priceStage = React.useRef<HTMLDivElement>(null)
    const panelId = React.useId()
    const ranges = {
        price: {
            ref: priceToggle,
            bounds,
            label: hu ? "Ár" : "Price",
            title: hu ? "Ártartomány" : "Price range",
            accessible: hu ? "Ártartomány beállítása" : "Set price range",
            empty: hu ? "Az árak még nem érhetők el" : "Prices are not available yet",
            minimum: hu ? "Minimum ár forintban" : "Minimum price in HUF",
            maximum: hu ? "Maximum ár forintban" : "Maximum price in HUF",
        },
        area: {
            ref: areaToggle,
            bounds: areaBounds,
            label: hu ? "Lakótér (m²)" : "Interior (m²)",
            title: hu ? "Lakótér" : "Interior area",
            accessible: hu ? "Lakótér beállítása négyzetméterben" : "Set interior area range in square metres",
            empty: hu ? "A lakóterületek még nem érhetők el" : "Interior areas are not available yet",
            minimum: hu ? "Minimum lakótér négyzetméterben" : "Minimum interior area in square metres",
            maximum: hu ? "Maximum lakótér négyzetméterben" : "Maximum interior area in square metres",
        },
        bedrooms: {
            ref: bedroomsToggle,
            bounds: bedroomBounds,
            label: hu ? "Hálószoba" : "Bedrooms",
            title: hu ? "Hálószobák száma" : "Bedrooms",
            accessible: hu ? "Hálószobák számának beállítása" : "Set bedroom count range",
            empty: hu ? "A hálószobaszám nem szűrhető" : "Bedroom count cannot be filtered",
            minimum: hu ? "Minimum hálószobaszám" : "Minimum bedroom count",
            maximum: hu ? "Maximum hálószobaszám" : "Maximum bedroom count",
        },
    }
    const usable = (values: OrbitRangeBounds | null): values is OrbitRangeBounds =>
        values !== null && Number.isFinite(values.min) && Number.isFinite(values.max) && values.max > values.min
    const selectedRange = ranges[rangeKind]
    const selectedBounds = selectedRange.bounds
    const hasBounds = usable(selectedBounds)
    const minimum = hasBounds ? selectedBounds.min : 0,
        maximum = hasBounds ? selectedBounds.max : 0,
        step = hasBounds ? selectedBounds.step : 1
    const fields = orbitRangeFields[rangeKind]
    const low = Math.min(maximum, Math.max(minimum, filters[fields.minimum] ?? minimum))
    const high = Math.max(low, Math.min(maximum, filters[fields.maximum] ?? maximum))
    const kinds = Object.keys(ranges) as OrbitRangeKind[]
    const hasRangeFilter = (kind: OrbitRangeKind) => {
        const { minimum, maximum } = orbitRangeFields[kind]
        return filters[minimum] != null || filters[maximum] != null
    }
    const hasFilters = filters.statuses.length > 0 || kinds.some(hasRangeFilter) || !!filters.search || !!filters.building || filters.floor != null
    const priceLatest = React.useRef({
        active,
        priceOpen,
        rangeKind,
        hasBounds,
        minimum,
        maximum,
        step,
        low,
        high,
        filters,
        onChange,
    })
    priceLatest.current = {
        active,
        priceOpen,
        rangeKind,
        hasBounds,
        minimum,
        maximum,
        step,
        low,
        high,
        filters,
        onChange,
    }
    const formatPrice = (value: number) => {
        const numberFormat = new Intl.NumberFormat(hu ? "hu-HU" : "en-GB", { maximumFractionDigits: 1 })
        if (rangeKind === "price")
            return `${numberFormat.format(value / 1000000)} ${hu ? "M Ft" : "M HUF"}`
        if (rangeKind === "area") return `${numberFormat.format(value)} m²`
        return numberFormat.format(value)
    }
    const changePrice = (side: "minimum" | "maximum", value: number) => {
        const current = priceLatest.current
        if (!current.hasBounds || !Number.isFinite(value)) return
        const isMinimum = side === "minimum"
        const next = isMinimum
            ? Math.max(current.minimum, Math.min(current.high, value))
            : Math.min(current.maximum, Math.max(current.low, value))
        const field = orbitRangeFields[current.rangeKind][side]
        const nextBound = next === (isMinimum ? current.minimum : current.maximum) ? null : next
        if ((current.filters[field] ?? null) === nextBound) return
        const updated = { ...current.filters, [field]: nextBound }
        priceLatest.current = {
            ...current,
            ...(isMinimum ? { low: next } : { high: next }),
            filters: updated,
        }
        current.onChange(updated)
    }
    React.useEffect(() => {
        if (!active || !hasBounds) setPriceOpen(false)
    }, [active, hasBounds])
    React.useEffect(() => {
        if (!priceOpen) return
        const element = root.current
        const studio = element?.closest<HTMLElement>(
            '[data-orbit-studio][data-mobile="true"]'
        )
        const popup = element?.querySelector<HTMLElement>(
            "[data-orbit-range-popover]"
        )
        if (!element || !studio || !popup) return
        // The section must rise as a whole: a popover's z-index cannot escape
        // its parent's stacking context beneath the separately rendered orbit.
        const previousZIndex = studio.style.zIndex
        studio.style.zIndex = "3"
        // Keep the panel inside the mobile Studio's clipped viewport and above
        // the photo canvas, whose stacking context sits over the filter wrapper.
        const place = () => {
            const box = element.getBoundingClientRect(),
                studioBox = studio.getBoundingClientRect()
            const scale = box.width / Math.max(1, element.offsetWidth) || 1
            const availableAbove = Math.max(
                0,
                (box.top - studioBox.top) / scale
            )
            const availableBelow = Math.max(0, (studioBox.bottom - box.bottom) / scale)
            // The phone filter bar now lives near the top. When a slider cannot
            // fit above it, open below so the panel never covers its own toggle.
            const top = availableAbove < popup.offsetHeight + 11 &&
                availableBelow >= popup.offsetHeight + 11
                ? element.offsetHeight + 7
                : Math.max(-popup.offsetHeight - 7, -availableAbove + 4)
            const value = `${top}px`
            if (
                element.style.getPropertyValue("--orbit-mobile-popup-top") !==
                value
            )
                element.style.setProperty("--orbit-mobile-popup-top", value)
        }
        place()
        const observer =
            typeof ResizeObserver === "function"
                ? new ResizeObserver(place)
                : null
        observer?.observe(element)
        observer?.observe(studio)
        observer?.observe(popup)
        window.addEventListener("resize", place)
        return () => {
            observer?.disconnect()
            window.removeEventListener("resize", place)
            element.style.removeProperty("--orbit-mobile-popup-top")
            studio.style.zIndex = previousZIndex
        }
    }, [priceOpen, rangeKind])
    React.useEffect(() => {
        if (!priceOpen) return
        const outside = (event: PointerEvent) => {
            const element = root.current
            if (
                !element ||
                !(event.target instanceof Node) ||
                element.contains(event.target)
            )
                return
            // Native Framer decoration can be the event target over our controls.
            // Keep the price panel open when that passive target is inside it.
            const genuineControl =
                event.target instanceof Element &&
                event.target.closest(
                    "nav,header,a,button,input,textarea,select,[contenteditable]:not([contenteditable='false']),[role='button'],[role='link'],[data-orbit-ignore]"
                )
            if (
                !genuineControl &&
                [
                    element,
                    ...Array.from(
                        element.querySelectorAll<HTMLElement>(
                            "[data-orbit-range-popover]:not([hidden])"
                        )
                    ),
                ].some((node) => {
                    const box = node.getBoundingClientRect()
                    return (
                        box.width > 0 &&
                        box.height > 0 &&
                        event.clientX >= box.left &&
                        event.clientX <= box.right &&
                        event.clientY >= box.top &&
                        event.clientY <= box.bottom
                    )
                })
            )
                return
            setPriceOpen(false)
        }
        const escape = (event: KeyboardEvent) => {
            if (event.key !== "Escape") return
            event.preventDefault()
            setPriceOpen(false)
            ;selectedRange.ref.current?.focus()
        }
        document.addEventListener("pointerdown", outside, true)
        document.addEventListener("keydown", escape)
        return () => {
            document.removeEventListener("pointerdown", outside, true)
            document.removeEventListener("keydown", escape)
        }
    }, [priceOpen, rangeKind])
    React.useEffect(() => {
        if (!priceOpen || !active || !hasBounds) return
        let drag: {
            id: number
            side: "minimum" | "maximum"
            offset: number
            kind: string
            stage: HTMLDivElement
        } | null = null
        const finish = () => {
            const previous = drag
            drag = null
            if (previous) {
                try {
                    if (previous.stage.hasPointerCapture(previous.id))
                        previous.stage.releasePointerCapture(previous.id)
                } catch {
                    /* A global listener still completes a detached gesture. */
                }
            }
        }
        const apply = (clientX: number, clientY: number) => {
            if (!drag) return
            const current = priceLatest.current,
                geometry = orbitRangePointerGeometry(
                    drag.stage,
                    clientX,
                    clientY
                )
            changePrice(
                drag.side,
                orbitPricePointerValue(
                    geometry.point - drag.offset,
                    geometry.rect,
                    drag.stage.offsetWidth || geometry.rect.width,
                    current.minimum,
                    current.maximum,
                    current.step
                )
            )
        }
        const down = (event: PointerEvent) => {
            if (drag && drag.id !== event.pointerId) {
                finish()
                return
            }
            if (
                !event.isPrimary ||
                event.button !== 0 ||
                event.defaultPrevented
            ) {
                finish()
                return
            }
            const stage = priceStage.current,
                current = priceLatest.current
            if (
                !stage ||
                !current.active ||
                !current.priceOpen ||
                !current.hasBounds ||
                stage.closest("[hidden],[inert],[aria-hidden='true']")
            )
                return
            const rect = stage.getBoundingClientRect()
            if (
                rect.width <= 0 ||
                rect.height <= 0 ||
                event.clientX < rect.left ||
                event.clientX > rect.right ||
                event.clientY < rect.top ||
                event.clientY > rect.bottom
            )
                return
            // An actual authored control above the price track keeps its own
            // interaction. A passive Framer sibling may safely cover this area.
            if (
                event.target instanceof Element &&
                !stage.contains(event.target) &&
                event.target.closest(
                    "nav,header,a,button,input,textarea,select,[contenteditable]:not([contenteditable='false']),[role='button'],[role='link'],[data-orbit-ignore]"
                )
            )
                return
            const geometry = orbitRangePointerGeometry(
                stage,
                event.clientX,
                event.clientY
            )
            const value = orbitPricePointerValue(
                geometry.point,
                geometry.rect,
                stage.offsetWidth || geometry.rect.width,
                current.minimum,
                current.maximum,
                current.step
            )
            let side: "minimum" | "maximum" =
                Math.abs(value - current.low) <= Math.abs(value - current.high)
                    ? "minimum"
                    : "maximum"
            if (event.target === minimumInput.current) side = "minimum"
            else if (event.target === maximumInput.current) side = "maximum"
            else if (current.low === current.high)
                side =
                    value >= current.high && current.high < current.maximum
                        ? "maximum"
                        : "minimum"
            const scale =
                    geometry.rect.width /
                    Math.max(1, stage.offsetWidth || geometry.rect.width),
                inset = 12 * scale
            const center =
                geometry.rect.left +
                inset +
                ((side === "minimum"
                    ? current.low - current.minimum
                    : current.high - current.minimum) /
                    (current.maximum - current.minimum)) *
                    (geometry.rect.width - 2 * inset)
            const offset =
                Math.abs(geometry.point - center) <= 14 * scale
                    ? geometry.point - center
                    : 0
            drag = {
                id: event.pointerId,
                side,
                offset,
                kind: event.pointerType,
                stage,
            }
            if (event.cancelable) event.preventDefault()
            try {
                stage.setPointerCapture(event.pointerId)
            } catch {
                /* Window listeners also work through passive Framer overlays. */
            }
            ;(side === "minimum" ? minimumInput : maximumInput).current?.focus({
                preventScroll: true,
            })
            apply(event.clientX, event.clientY)
        }
        const move = (event: PointerEvent) => {
            if (!drag || drag.id !== event.pointerId) return
            if (event.pointerType === "mouse" && event.buttons === 0) {
                finish()
                return
            }
            if (event.cancelable) event.preventDefault()
            apply(event.clientX, event.clientY)
        }
        const up = (event: PointerEvent) => {
            if (!drag || drag.id !== event.pointerId) return
            if (event.cancelable) event.preventDefault()
            apply(event.clientX, event.clientY)
            finish()
        }
        const cancel = (event: PointerEvent) => {
            if (drag?.id === event.pointerId) finish()
        }
        const touchStart = (event: TouchEvent) => {
            if (event.touches.length !== 1) finish()
        }
        const touchMove = (event: TouchEvent) => {
            if (!drag || drag.kind !== "touch") return
            if (event.touches.length !== 1) {
                finish()
                return
            }
            if (event.cancelable) event.preventDefault()
            apply(event.touches[0].clientX, event.touches[0].clientY)
        }
        window.addEventListener("pointerdown", down, {
            passive: false,
            capture: true,
        })
        window.addEventListener("pointermove", move, {
            passive: false,
            capture: true,
        })
        window.addEventListener("pointerup", up, {
            passive: false,
            capture: true,
        })
        window.addEventListener("pointercancel", cancel, true)
        window.addEventListener("touchstart", touchStart, {
            passive: true,
            capture: true,
        })
        window.addEventListener("touchmove", touchMove, {
            passive: false,
            capture: true,
        })
        window.addEventListener("touchcancel", finish, true)
        window.addEventListener("blur", finish)
        return () => {
            finish()
            window.removeEventListener("pointerdown", down, true)
            window.removeEventListener("pointermove", move, true)
            window.removeEventListener("pointerup", up, true)
            window.removeEventListener("pointercancel", cancel, true)
            window.removeEventListener("touchstart", touchStart, true)
            window.removeEventListener("touchmove", touchMove, true)
            window.removeEventListener("touchcancel", finish, true)
            window.removeEventListener("blur", finish)
        }
    }, [priceOpen, rangeKind, active, hasBounds, minimum, maximum, step])
    const statusOptions: {
        id: OrbitFilterStatus
        label: string
        accessible: string
    }[] = [
        {
            id: "available",
            label: hu ? "Elérhető" : "Available",
            accessible: hu ? "Elérhető lakások" : "Available apartments",
        },
        {
            id: "under_negotiation",
            label: hu ? "Egyeztetés alatt" : "In talks",
            accessible: hu
                ? "Egyeztetés alatt álló lakások"
                : "Apartments under negotiation",
        },
        {
            id: "sold",
            label: hu ? "Eladva" : "Sold",
            accessible: hu ? "Eladott lakások" : "Sold apartments",
        },
    ]
    const count = Math.max(0, Math.min(total, matchCount))
    const sliderPercent = (value: number) =>
        hasBounds ? ((value - minimum) / (maximum - minimum)) * 100 : 0
    return (
        <div
            ref={root}
            data-orbit-filters=""
            data-orbit-filter-visible={String(visible)}
            data-orbit-glass-tone={presentation === "overlay" ? "overlay" : "paper"}
            data-orbit-ignore=""
            data-active={String(active)}
            aria-hidden={!active}
            {...(!active ? { inert: "" as any } : {})}
            data-presentation={presentation}
            data-filtered={hasFilters ? "true" : "false"}
        >
            <style dangerouslySetInnerHTML={homepageStyleMarkup(orbitApartmentFilterStyles)} />
            <div
                data-orbit-filter-row=""
                data-orbit-glass-pod="filter"
                role="group"
                aria-label={hu ? "Lakások szűrése" : "Filter apartments"}
            >
                <div className="orbit-filter-statuses">
                    {statusOptions.map((option) => (
                        <button
                            key={option.id}
                            type="button"
                            disabled={!active}
                            data-orbit-filter-status={option.id}
                            aria-label={option.accessible}
                            title={option.accessible}
                            aria-pressed={filters.statuses.includes(option.id)}
                            onClick={() =>
                                onChange({
                                    ...filters,
                                    statuses: filters.statuses.includes(
                                        option.id
                                    )
                                        ? filters.statuses.filter(
                                              (status) => status !== option.id
                                          )
                                        : [...filters.statuses, option.id],
                                })
                            }
                        >
                            <span
                                className="orbit-filter-dot"
                                aria-hidden="true"
                            />
                            <span className="orbit-filter-status-label">
                                {option.label}
                            </span>
                        </button>
                    ))}
                </div>
            </div>
            <div
                data-orbit-filter-ranges=""
                data-orbit-glass-pod="filter"
                role="group"
                aria-label={hu ? "Ár, lakótér és hálószobák szerinti szűrés" : "Filter by price, interior area and bedrooms"}
            >
                {kinds.map((kind) => {
                    const range = ranges[kind]
                    const rangeUsable = usable(range.bounds)
                    const expanded = priceOpen && rangeKind === kind
                    return (
                        <button
                            key={kind}
                            ref={range.ref}
                            type="button"
                            data-orbit-range-toggle={kind}
                            {...{ [`data-orbit-${kind}-toggle`]: "" }}
                            data-filtered={String(hasRangeFilter(kind))}
                            aria-label={range.accessible}
                            title={rangeUsable ? range.title : range.empty}
                            aria-expanded={expanded}
                            aria-controls={panelId}
                            disabled={!active || !rangeUsable}
                            onClick={() => {
                                setRangeKind(kind)
                                setPriceOpen((open) => rangeKind === kind ? !open : true)
                            }}
                        >
                            <span>{range.label}</span>
                            <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                                <path
                                    d={expanded ? "M4 10 8 6l4 4" : "m4 6 4 4 4-4"}
                                    stroke="currentColor"
                                    strokeWidth="1.4"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>
                    )
                })}
                <span
                    data-orbit-filter-count=""
                    role="status"
                    aria-live="polite"
                    aria-atomic="true"
                    aria-label={
                        hu
                            ? `${count} találat ${total} lakásból`
                            : `${count} matches out of ${total} apartments`
                    }
                >
                    {count}/{total}
                </span>
                {hasFilters && (
                    <button
                        type="button"
                        disabled={!active}
                        data-orbit-filter-reset=""
                        aria-label={
                            hu ? "Minden szűrő törlése" : "Reset all filters"
                        }
                        title={hu ? "Szűrők törlése" : "Reset filters"}
                        onClick={() =>
                            onChange({
                                statuses: [],
                                search: "", building: "", floor: null,
                                priceMin: null,
                                priceMax: null,
                                ...("areaMin" in filters || "areaMax" in filters
                                    ? { areaMin: null, areaMax: null }
                                    : {}),
                                ...("bedroomsMin" in filters || "bedroomsMax" in filters
                                    ? { bedroomsMin: null, bedroomsMax: null }
                                    : {}),
                            })
                        }
                    >
                        <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                            <path
                                d="m4 4 8 8M12 4l-8 8"
                                stroke="currentColor"
                                strokeWidth="1.4"
                                strokeLinecap="round"
                            />
                        </svg>
                    </button>
                )}
            </div>
            <div
                id={panelId}
                data-orbit-range-popover={rangeKind}
                data-orbit-glass-pod="popover"
                {...{ [`data-orbit-${rangeKind}-popover`]: "" }}
                data-orbit-ignore=""
                role="group"
                aria-label={selectedRange.title}
                hidden={!priceOpen}
            >
                <div className="orbit-filter-price-values">
                    <span>{formatPrice(low)}</span>
                    <span className="orbit-filter-price-caption">
                        {selectedRange.title}
                    </span>
                    <span>{formatPrice(high)}</span>
                </div>
                <div
                    ref={priceStage}
                    {...{ [`data-orbit-${rangeKind}-stage`]: "" }}
                    className="orbit-filter-price-stage"
                >
                    <span
                        className="orbit-filter-price-track"
                        aria-hidden="true"
                    />
                    <span
                        className="orbit-filter-price-selection"
                        aria-hidden="true"
                        style={{
                            left: `calc(12px + (100% - 24px) * ${sliderPercent(low) / 100})`,
                            right: `calc(12px + (100% - 24px) * ${(100 - sliderPercent(high)) / 100})`,
                        }}
                    />
                    <input
                        ref={minimumInput}
                        type="range"
                        {...{ [`data-orbit-${rangeKind}-min`]: "" }}
                        min={minimum}
                        max={maximum}
                        step={step}
                        value={low}
                        aria-label={selectedRange.minimum}
                        aria-valuetext={formatPrice(low)}
                        disabled={!active || !hasBounds}
                        onChange={(event) =>
                            changePrice(
                                "minimum",
                                event.currentTarget.valueAsNumber
                            )
                        }
                        style={{ zIndex: low >= maximum ? 2 : 1 }}
                    />
                    <input
                        ref={maximumInput}
                        type="range"
                        {...{ [`data-orbit-${rangeKind}-max`]: "" }}
                        min={minimum}
                        max={maximum}
                        step={step}
                        value={high}
                        aria-label={selectedRange.maximum}
                        aria-valuetext={formatPrice(high)}
                        disabled={!active || !hasBounds}
                        onChange={(event) =>
                            changePrice(
                                "maximum",
                                event.currentTarget.valueAsNumber
                            )
                        }
                    />
                </div>
            </div>
        </div>
    )
}

const orbitGroupStyles = "[data-admiral-homepage] [data-orbit-group] {\n    display: flex; align-items: center; gap: 5px;\n    width: max-content; max-width: 100%; min-width: 0; box-sizing: border-box;\n    margin-inline: auto; padding: 3px 5px;\n    border: 1px solid rgb(33 90 129 / 24%); border-radius: 999px;\n    color: #1b4565; background: rgb(247 251 255 / 94%); pointer-events: auto;\n}\n[data-orbit-group-chips] {\n    display: flex; align-items: center; gap: 5px;\n    min-width: 0; padding: 3px; overflow-x: auto;\n    overscroll-behavior-x: contain; scrollbar-width: thin; touch-action: pan-x;\n}\n[data-orbit-group] button {\n    display: grid; place-items: center; flex: 0 0 auto;\n    min-height: 32px; box-sizing: border-box; padding: 0 10px;\n    border: 1px solid #81a8c8; border-radius: 999px; background: transparent;\n    color: inherit; font: 650 12px/1 system-ui,sans-serif; cursor: pointer; touch-action: manipulation;\n}\n[data-orbit-group] button[data-visible=\"true\"] { color: #fff; background: #176cb7; border-color: #176cb7; }\n[data-orbit-group] button[aria-pressed=\"true\"] { background: #0d477e; border-color: #0d477e; box-shadow: inset 0 0 0 1px #fff; }\n[data-orbit-group] button[data-requested=\"true\"] { border-style: dashed; }\n[data-orbit-group] button[data-orbit-group-close] { min-width: 32px; padding: 0; border-color: transparent; font-size: 21px; font-weight: 400; }\n[data-orbit-group] button:focus-visible { outline: 2px solid #133d66; outline-offset: 1px; }\n[data-orbit-fullscreen-group] {\n    position: absolute; inset: 12px auto auto 50%; transform: translateX(-50%);\n    width: min(440px, calc(100% - 128px)); z-index: 1; pointer-events: none;\n}\n@media (hover: hover) {\n    [data-orbit-group] button:hover { background: #e2eff9; border-color: #3c78a9; }\n    [data-orbit-group] button[data-visible=\"true\"]:hover { background: #125890; border-color: #125890; }\n    [data-orbit-group] button[aria-pressed=\"true\"]:hover { background: #153e67; border-color: #153e67; }\n}\n@media (max-width: 600px) {\n    [data-admiral-homepage] [data-orbit-group] { gap: 2px; padding-inline: 3px; }\n    [data-orbit-group-chips] { gap: 3px; }\n    [data-orbit-group] button { padding-inline: 6px; font-size: 11px; }\n}\n\n/* The visible Framer introduction frames sit above the orbit instance even\n   when their contents have faded. During group browsing they are decorative. */\n@supports selector(:has(*)) {\n    [data-framer-name=\"Hero Orbit Stage\"]:has([data-admiral-homepage][data-homepage-stage=\"orbit\"] [data-orbit-group])\n        > :is([data-framer-name=\"SEQ01\"], [data-framer-name=\"SEQ02\"]),\n    [data-framer-name=\"Hero Orbit Stage\"]:has([data-admiral-homepage][data-homepage-stage=\"orbit\"] [data-orbit-group])\n        > :is([data-framer-name=\"SEQ01\"], [data-framer-name=\"SEQ02\"]) * {\n        pointer-events: none !important;\n    }\n}\n"

function OrbitGroupBar({
    group, visible, selected, requested, language, onSelect, onClose,
}: {
    group: OrbitApartmentGroup
    visible: readonly string[]
    selected: string | null
    requested: string | null
    language: "hu" | "en"
    onSelect: (id: string) => void
    onClose: () => void
}) {
    const hu = language !== "en"
    const label = group.kind === "favorites"
        ? (hu ? "Kedvencek" : "Favorites")
        : (hu ? "Összevetés" : "Comparison")
    const close = hu ? "Vissza az összes lakáshoz" : "Back to all apartments"
    return (
        <div data-orbit-group={group.kind} data-orbit-ignore="" role="group" aria-label={label}>
            <div data-orbit-group-chips="">
                {group.ids.map(id => {
                    const shown = visible.includes(id)
                    const state = shown
                        ? (hu ? "ebben a nézetben látható" : "visible in this view")
                        : (hu ? "megtekintés másik nézetből" : "view from another camera")
                    return (
                        <button
                            key={id}
                            type="button"
                            data-orbit-group-apartment={id}
                            data-visible={String(shown)}
                            data-requested={String(requested === id)}
                            aria-pressed={shown && selected === id}
                            aria-label={id + " · " + state}
                            onClick={() => onSelect(id)}
                        >
                            {id}
                        </button>
                    )
                })}
            </div>
            <button type="button" data-orbit-group-close="" aria-label={close} title={close} onClick={onClose}>
                <span aria-hidden="true">×</span>
            </button>
        </div>
    )
}


const ORBIT_FAVORITES_STORAGE_KEY = "admiral-park:favorites:v1"
const ORBIT_FAVORITES_EVENT = "admiral:apartment-favorites"

interface OrbitFavoriteActions {
    ids: ReadonlySet<string>
    toggle: (id: string) => void
}

function useOrbitFavorites(enabled: boolean) {
    const [ids, setIds] = React.useState<ReadonlySet<string>>(() => new Set())
    const current = React.useRef(ids)
    const storage = React.useRef(true)

    const sync = React.useCallback((values: unknown) => {
        if (!Array.isArray(values)) return
        const next = normalizeAdmiralFavorites(values)
        const previous = [...current.current]
        if (next.size === previous.length &&
            [...next].every((id, index) => id === previous[index])) return
        current.current = next
        setIds(next)
    }, [])

    React.useEffect(() => {
        if (!enabled) return
        const read = (value: string | null) => {
            try {
                const parsed: unknown = value === null ? [] : JSON.parse(value)
                if (!Array.isArray(parsed)) return
                const next = [...normalizeAdmiralFavorites(parsed)]
                sync(next)
                // Migrate older or malformed arrays to the newest ten, preserving order.
                if (value !== null && JSON.stringify(parsed) !== JSON.stringify(next)) {
                    try { window.localStorage.setItem(ORBIT_FAVORITES_STORAGE_KEY, JSON.stringify(next)) }
                    catch { storage.current = false }
                }
            } catch {
                // Discard malformed values while retaining session favorites.
            }
        }
        try {
            read(window.localStorage.getItem(ORBIT_FAVORITES_STORAGE_KEY))
        } catch {
            storage.current = false
        }
        const onStorage = (event: StorageEvent) => {
            if (event.key === ORBIT_FAVORITES_STORAGE_KEY || event.key === null)
                read(event.newValue)
        }
        const onFavorites = (event: Event) =>
            sync((event as CustomEvent<{ ids?: unknown }>).detail?.ids)
        window.addEventListener("storage", onStorage)
        window.addEventListener(ORBIT_FAVORITES_EVENT, onFavorites)
        return () => {
            window.removeEventListener("storage", onStorage)
            window.removeEventListener(ORBIT_FAVORITES_EVENT, onFavorites)
        }
    }, [enabled, sync])

    const toggle = React.useCallback((id: string) => {
        const result = toggleAdmiralFavorite(id, current.current, { storage: storage.current })
        storage.current = result.storage
        sync([...result.favorites])
        window.dispatchEvent(new CustomEvent(ORBIT_FAVORITES_EVENT, {
            detail: { ids: [...result.favorites] },
        }))
    }, [sync])

    return { ids, toggle }
}

function OrbitFavoriteButton({
    apartmentId, favorites, interactive, hu,
}: {
    apartmentId: string
    favorites: OrbitFavoriteActions
    interactive: boolean
    hu: boolean
}) {
    const saved = favorites.ids.has(apartmentId)
    const action = hu
        ? (saved ? "Eltávolítás a kedvencekből" : "Mentés a kedvencekhez")
        : (saved ? "Remove from favorites" : "Save to favorites")
    return (
        <button
            type="button"
            data-orbit-favorite={apartmentId}
            data-orbit-ignore=""
            aria-label={hu ? apartmentId + " kedvenc" : "Favorite " + apartmentId}
            aria-pressed={saved}
            title={action}
            disabled={!interactive}
            onClick={() => favorites.toggle(apartmentId)}
        >
            <svg viewBox="0 0 24 24" fill={saved ? "currentColor" : "none"}
                stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"
                strokeLinejoin="round" aria-hidden="true" focusable="false">
                <path d="M20.8 8.6c0 4.1-4.7 7.6-8.8 11.1-4.1-3.5-8.8-7-8.8-11.1a4.6 4.6 0 0 1 8.8-2 4.6 4.6 0 0 1 8.8 2Z" />
            </svg>
        </button>
    )
}

const orbitFavoriteStyles = "\n[data-admiral-homepage] [data-orbit-favorite] {\n    box-sizing: border-box; display: inline-grid; place-items: center; flex: 0 0 auto;\n    width: 36px; height: 36px; padding: 0; border: 1px solid rgb(34 97 144 / 42%);\n    border-radius: 50%; background: rgb(248 252 255 / 84%); color: #2166a0;\n    box-shadow: inset 0 1px 1px rgb(255 255 255 / 90%);\n    pointer-events: auto; cursor: pointer; touch-action: manipulation;\n    -webkit-tap-highlight-color: transparent;\n    transition: background-color .16s, border-color .16s, color .16s;\n}\n[data-admiral-homepage] [data-orbit-favorite] svg { width: 19px; height: 19px; }\n[data-admiral-homepage] [data-orbit-favorite][aria-pressed=\"true\"] {\n    color: #17598e; background: #e1eef9; border-color: #5c8eb8;\n}\n[data-admiral-homepage] [data-orbit-favorite]:focus-visible { outline: 2px solid #2166a0; outline-offset: 2px; }\n[data-admiral-homepage] [data-orbit-favorite]:disabled { opacity: .55; cursor: default; pointer-events: none; }\n[data-orbit-studio][data-mobile=\"true\"] .orbit-studio-mobile-identity { position: relative; }\n[data-admiral-homepage] .orbit-studio-mobile-identity [data-orbit-favorite] {\n    position: absolute; inset: 0 0 auto auto; width: 44px; height: 44px;\n}\n@media (max-width: 400px) {\n    [data-admiral-homepage] [data-orbit-studio][data-mobile=\"true\"][data-orbit-glass-tone=\"paper\"] .orbit-studio-mobile-identity .orbit-studio-id {\n        font-size: clamp(22px,7.5vw,30px);\n    }\n}\n[data-admiral-homepage] [data-orbit-fullscreen-details] > [data-orbit-favorite] {\n    position: absolute; inset: 12px auto auto 14px; width: 44px; height: 44px;\n}\n@media (hover: hover) {\n    [data-admiral-homepage] [data-orbit-favorite]:not(:disabled):hover { border-color: #2166a0; background: #d3e8f9; }\n}\n@media (prefers-reduced-motion: reduce) {\n    [data-admiral-homepage] [data-orbit-favorite] { transition: none; }\n}\n"

interface OrbitApartmentStudioProps {
    arriving: boolean
    favorites: OrbitFavoriteActions
    active: boolean
    groupControls?: React.ReactNode
    mode: "preview" | "hover" | "off"
    dataset: OrbitApartmentDataset | null
    dataStatus: "idle" | "loading" | "ready" | "error"
    error: string
    onRetry: () => void
    apartment: OrbitApartmentRecord | null
    onSelect: (id: string) => void
    assetBase: string
    detailsUrl: string
    inquiryUrl: string
    onViewport: (element: HTMLDivElement | null) => void
    language: "hu" | "en"
    onLayout?: () => void
    onOpenDetails?: () => void
    mobile?: boolean
    moving?: boolean
    filters: OrbitApartmentFilters
    filterBounds: OrbitPriceBounds | null
    filterAreaBounds?: OrbitAreaBounds | null
    filterBedroomBounds?: OrbitRangeBounds | null
    filterActive: boolean
    filterCount: number
    onFiltersChange: (filters: OrbitApartmentFilters) => void
}

const orbitFrostedButtonStyles = "\n:where([data-orbit-studio][data-mobile] .orbit-studio-primary.admiral-frosted-button[data-orbit-inquiry]) { min-height: 44px; padding: 10px 22px; font-size: 14px; }\n[data-orbit-studio][data-mobile] .orbit-studio-primary.admiral-frosted-button[data-orbit-inquiry] {\n  box-sizing: border-box;\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n  border: 1px solid #bdcfd3;\n  border-color: color-mix(in srgb, var(--frosted-button-tint, #7395a0) 42%, white);\n  border-radius: 999px;\n  background: linear-gradient(145deg, rgb(255 255 255 / 80%), rgb(255 255 255 / 14%) 55%, rgb(255 255 255 / 42%)), #dce6e8;\n  background: linear-gradient(145deg, rgb(255 255 255 / 80%), rgb(255 255 255 / 14%) 55%, rgb(255 255 255 / 42%)), color-mix(in srgb, var(--frosted-button-tint, #7395a0) 25%, rgb(255 255 255 / 68%));\n  color: var(--frosted-button-text, #183b43);\n  -webkit-backdrop-filter: blur(18px) saturate(115%);\n  backdrop-filter: blur(18px) saturate(115%);\n  box-shadow: inset 0 1px 1px rgb(255 255 255 / 95%), inset 0 -1px 0 rgb(24 59 67 / 9%), 0 3px 9px rgb(24 59 67 / 9%);\n  font-family: 'Montserrat', Arial, sans-serif;\n  font-size: 14px;\n  font-weight: 600;\n  letter-spacing: -.015em;\n  line-height: 1.3;\n  text-align: center;\n  text-decoration: none;\n  white-space: nowrap;\n  cursor: pointer;\n  touch-action: manipulation;\n  -webkit-tap-highlight-color: transparent;\n  transition: background .18s ease, border-color .18s ease, box-shadow .18s ease, transform .18s ease;\n}\n[data-orbit-studio][data-mobile] .orbit-studio-primary.admiral-frosted-button[data-orbit-inquiry]:focus-visible {\n  outline: 2px solid var(--frosted-button-text, #183b43);\n  outline-offset: 4px;\n  border-color: var(--frosted-button-tint, #7395a0);\n  box-shadow: inset 0 1px 1px white, 0 0 0 3px rgb(255 255 255 / 75%), 0 4px 12px rgb(24 59 67 / 15%);\n}\n@media (hover: hover) {\n  [data-orbit-studio][data-mobile] .orbit-studio-primary.admiral-frosted-button[data-orbit-inquiry]:not(:disabled):not([aria-disabled=\"true\"]):hover {\n    border-color: color-mix(in srgb, var(--frosted-button-tint, #7395a0) 70%, white);\n    background: linear-gradient(145deg, rgb(255 255 255 / 90%), rgb(255 255 255 / 28%) 55%, rgb(255 255 255 / 58%)), color-mix(in srgb, var(--frosted-button-tint, #7395a0) 33%, rgb(255 255 255 / 75%));\n    box-shadow: inset 0 1px 1px white, inset 0 -1px 0 rgb(24 59 67 / 10%), 0 5px 14px rgb(24 59 67 / 14%);\n  }\n}\n[data-orbit-studio][data-mobile] .orbit-studio-primary.admiral-frosted-button[data-orbit-inquiry]:not(:disabled):not([aria-disabled=\"true\"]):active { transform: translateY(1px); box-shadow: inset 0 1px 3px rgb(24 59 67 / 14%), 0 1px 3px rgb(24 59 67 / 7%); }\n[data-orbit-studio][data-mobile] .orbit-studio-primary.admiral-frosted-button[data-orbit-inquiry]:disabled, [data-orbit-studio][data-mobile] .orbit-studio-primary.admiral-frosted-button[data-orbit-inquiry][aria-disabled=\"true\"] { opacity: .48; cursor: not-allowed; pointer-events: none; }\n@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {\n  [data-orbit-studio][data-mobile] .orbit-studio-primary.admiral-frosted-button[data-orbit-inquiry] { background: linear-gradient(145deg, rgb(255 255 255 / 60%), transparent 65%), #dce6e8; background: linear-gradient(145deg, rgb(255 255 255 / 60%), transparent 65%), color-mix(in srgb, var(--frosted-button-tint, #7395a0) 22%, white); }\n}\n@media (prefers-reduced-motion: reduce) {\n  [data-orbit-studio][data-mobile] .orbit-studio-primary.admiral-frosted-button[data-orbit-inquiry] { transition: none; }\n  [data-orbit-studio][data-mobile] .orbit-studio-primary.admiral-frosted-button[data-orbit-inquiry]:not(:disabled):not([aria-disabled=\"true\"]):active { transform: none; }\n}\n@media (prefers-reduced-transparency: reduce) {\n  [data-orbit-studio][data-mobile] .orbit-studio-primary.admiral-frosted-button[data-orbit-inquiry], [data-orbit-studio][data-mobile] .orbit-studio-primary.admiral-frosted-button[data-orbit-inquiry]:not(:disabled):not([aria-disabled=\"true\"]):hover {\n    background: #dce6e8;\n    background: color-mix(in srgb, var(--frosted-button-tint, #7395a0) 20%, white);\n    -webkit-backdrop-filter: none; backdrop-filter: none;\n  }\n}\n@media (forced-colors: active) {\n  [data-orbit-studio][data-mobile] .orbit-studio-primary.admiral-frosted-button[data-orbit-inquiry], [data-orbit-studio][data-mobile] .orbit-studio-primary.admiral-frosted-button[data-orbit-inquiry]:not(:disabled):not([aria-disabled=\"true\"]):hover {\n    border: 1px solid ButtonText; background: ButtonFace; color: ButtonText;\n    -webkit-backdrop-filter: none; backdrop-filter: none; box-shadow: none;\n  }\n  [data-orbit-studio][data-mobile] .orbit-studio-primary.admiral-frosted-button[data-orbit-inquiry]:focus-visible { outline-color: Highlight; }\n  [data-orbit-studio][data-mobile] .orbit-studio-primary.admiral-frosted-button[data-orbit-inquiry]:disabled, [data-orbit-studio][data-mobile] .orbit-studio-primary.admiral-frosted-button[data-orbit-inquiry][aria-disabled=\"true\"] { border-color: GrayText; color: GrayText; opacity: 1; }\n}\n"

const orbitTourPanelStyles = `/* Quiet desktop tour instruments: one pane per task, with the plan between. */
[data-apartment-details][data-orbit-glass-tone]::before { opacity: .10; }
[data-apartment-details][data-orbit-glass-tone] .admiral-details-grid { grid-template-columns: minmax(0,320px) 240px minmax(0,320px); max-width: 936px; gap: 24px 28px; align-items: center; }
[data-apartment-details][data-orbit-glass-tone] :is(.admiral-details-summary,.admiral-details-filter-row) { width: 100%; max-width: 320px; height: 144px; padding: 14px 18px; border-radius: 24px; box-sizing: border-box; }
[data-apartment-details][data-orbit-glass-tone] .admiral-details-summary { display: grid; grid-template-rows: 42px minmax(0,1fr); gap: 12px; }
[data-apartment-details][data-orbit-glass-tone] :is(.admiral-details-identity,.admiral-details-facts) { width: 100%; max-width: none; padding: 0; border-radius: 0; }
[data-apartment-details][data-orbit-glass-tone] .admiral-details-identity { align-self: stretch; align-items: baseline; justify-content: space-between; flex-wrap: nowrap; gap: 10px; padding-bottom: 8px; border-bottom: 1px solid rgba(255,255,255,.18); }
[data-apartment-details][data-orbit-glass-tone] .admiral-details-number .admiral-details-value { font-size: 26px; line-height: 1.2; font-weight: 650; }
[data-apartment-details][data-orbit-glass-tone] .admiral-details-status .admiral-details-value { font-size: 10px; font-weight: 500; line-height: 1.4; }
[data-apartment-details][data-orbit-glass-tone] .admiral-details-metrics { gap: 10px; }
[data-apartment-details][data-orbit-glass-tone] .admiral-details-metrics .admiral-details-label { margin-bottom: 5px; font-size: 8px; letter-spacing: .06em; font-weight: 400; }
[data-apartment-details][data-orbit-glass-tone] .admiral-details-metrics .admiral-details-value { font-size: 20px; line-height: 1.1; font-weight: 600; letter-spacing: -.03em; }
[data-apartment-details][data-orbit-glass-tone] .admiral-details-metrics .admiral-details-unit { font-size: 9px; margin-left: 3px; }
[data-apartment-details][data-orbit-glass-tone] .admiral-details-metrics > .admiral-details-field + .admiral-details-field { padding-left: 10px; border-left: 1px solid rgba(255,255,255,.12); }
[data-apartment-details][data-orbit-glass-tone] .admiral-details-secondary .admiral-details-field { margin-top: 9px; opacity: .65; }
[data-apartment-details][data-orbit-glass-tone] .admiral-details-secondary :is(.admiral-details-label,.admiral-details-value) { font-size: 9px; }

/* The outside panel supplies the glass. Inside, controls remain light and direct. */
[data-apartment-details][data-orbit-glass-tone] [data-orbit-desktop-filters] { width: 100%; }
[data-apartment-details][data-orbit-glass-tone] [data-orbit-desktop-filters] > [data-orbit-filters] { display: grid; grid-template-rows: 42px minmax(0,1fr); align-items: start; gap: 12px; height: 100%; }
[data-apartment-details][data-orbit-glass-tone] [data-orbit-desktop-filters] [data-orbit-filter-row] { align-self: stretch; display: flex; align-items: flex-start; padding: 0 0 8px; border: 0; border-bottom: 1px solid rgba(255,255,255,.18); border-radius: 0; top: 0; }
[data-apartment-details][data-orbit-glass-tone] [data-orbit-desktop-filters] [data-orbit-filter-ranges] { margin: 0; padding: 0; gap: 4px; top: 0; align-items: flex-start; }
[data-apartment-details][data-orbit-glass-tone] [data-orbit-filters] [data-orbit-glass-pod="filter"]::before,
[data-apartment-details][data-orbit-glass-tone] [data-orbit-filters] [data-orbit-glass-pod="filter"]::after { display: none; }
[data-apartment-details][data-orbit-glass-tone] [data-orbit-filters][data-presentation][data-active] :is([data-orbit-filter-status],[data-orbit-range-toggle],[data-orbit-filter-reset]) { min-height: 30px; height: 30px; padding: 0 5px; gap: 4px; border: 1px solid rgba(255,255,255,.32); border-radius: 9px; box-shadow: none; background: transparent; color: rgba(255,255,255,.93); font-size: 11px; font-weight: 450; letter-spacing: 0; }
[data-apartment-details][data-orbit-glass-tone] [data-orbit-filters][data-presentation][data-active] .orbit-filter-statuses { gap: 2px; }
[data-apartment-details][data-orbit-glass-tone] [data-orbit-filters][data-presentation][data-active] [data-orbit-filter-status] .orbit-filter-dot { width: 4px; height: 4px; }
[data-apartment-details][data-orbit-glass-tone] [data-orbit-filters][data-presentation][data-active] [data-orbit-filter-status][aria-pressed="true"] { background: color-mix(in srgb,var(--filter-dot) 16%,rgba(255,255,255,.04)); border-color: color-mix(in srgb,var(--filter-dot) 42%,rgba(255,255,255,.15)); box-shadow: none; }
[data-apartment-details][data-orbit-glass-tone] [data-orbit-filters][data-presentation][data-active] [data-orbit-range-toggle] { min-height: 28px; height: 28px; flex: 1 1 0; border-color: rgba(255,255,255,.32); border-radius: 8px; background: rgba(255,255,255,.025); }
[data-apartment-details][data-orbit-glass-tone] [data-orbit-filters][data-presentation][data-active] [data-orbit-range-toggle]:is([data-filtered="true"],[aria-expanded="true"]) { border-color: rgba(255,255,255,.38); background: rgba(255,255,255,.10); box-shadow: none; }
[data-apartment-details][data-orbit-glass-tone] [data-orbit-filters][data-filtered="false"] [data-orbit-filter-count] { display: none; }
[data-apartment-details][data-orbit-glass-tone] [data-orbit-filters] [data-orbit-filter-count] { min-width: 28px; padding: 0 1px; font-size: 8px; align-self: center; }
[data-apartment-details][data-orbit-glass-tone] [data-orbit-filters][data-presentation][data-active] [data-orbit-filter-reset] { flex-basis: 24px; width: 24px; min-height: 28px; height: 28px; padding: 0; }
@media (hover:hover) {
    [data-apartment-details][data-orbit-glass-tone] [data-orbit-filters][data-presentation][data-active] :is([data-orbit-filter-status],[data-orbit-range-toggle],[data-orbit-filter-reset]):not(:disabled):hover { background: rgba(255,255,255,.16); border-color: rgba(255,255,255,.58); box-shadow: none; }
}
@container admiral-apartment (max-width: 1000px) {
    [data-apartment-details][data-orbit-glass-tone] .admiral-details-grid { grid-template-columns: minmax(0,320px) 200px; max-width: 548px; gap: 18px 28px; }
    [data-apartment-details][data-orbit-glass-tone] .admiral-details-filter-row { width: 100%; max-width: 548px; height: 92px; padding: 10px 16px; }
    [data-apartment-details][data-orbit-glass-tone] [data-orbit-desktop-filters] > [data-orbit-filters] { grid-template-rows: 32px 28px; gap: 10px; }
    [data-apartment-details][data-orbit-glass-tone] [data-orbit-desktop-filters] [data-orbit-filter-row] { padding-bottom: 2px; }
}
@container admiral-apartment (max-width: 540px) {
    [data-apartment-details][data-orbit-glass-tone] .admiral-details-grid { grid-template-columns: minmax(0,1fr) minmax(120px,1fr); gap: 14px; }
    [data-apartment-details][data-orbit-glass-tone] .admiral-details-summary { height: auto; min-height: 160px; padding: 12px; grid-template-rows: auto minmax(0,1fr); }
    [data-apartment-details][data-orbit-glass-tone] .admiral-details-identity { flex-wrap: wrap; }
    [data-apartment-details][data-orbit-glass-tone] .admiral-details-metrics .admiral-details-value { font-size: 17px; }
    [data-apartment-details][data-orbit-glass-tone] .admiral-details-metrics > .admiral-details-field + .admiral-details-field { padding-left: 0; border-left: 0; }
}
`

const orbitPhoneRefinementStyles = `/* A single quiet glass filter panel above an unframed, floorplan-led summary. */
[data-orbit-studio][data-mobile="true"][data-orbit-glass-tone="paper"] { top: 58px; height: auto; grid-template-rows: auto minmax(0,1fr); gap: 22px; background: transparent; padding: 8px var(--studio-phone-gutter) max(24px,env(safe-area-inset-bottom,0px)); }
[data-orbit-studio][data-mobile="true"][data-orbit-glass-tone="paper"] .orbit-studio-header { display: none; }
[data-orbit-studio][data-mobile="true"][data-orbit-glass-tone="paper"] > [data-orbit-filters][data-presentation] { padding: 2px 6px; border: 1px solid rgba(41,70,80,.28); border-radius: 20px; background: transparent; -webkit-backdrop-filter: none; backdrop-filter: none; box-shadow: none; overflow: visible; }
[data-orbit-studio][data-mobile="true"][data-orbit-glass-tone="paper"] > [data-orbit-filters][data-presentation] [data-orbit-glass-pod="filter"]::before,
[data-orbit-studio][data-mobile="true"][data-orbit-glass-tone="paper"] > [data-orbit-filters][data-presentation] [data-orbit-glass-pod="filter"]::after { display: none; }
[data-orbit-studio][data-mobile="true"][data-orbit-glass-tone="paper"] > [data-orbit-filters][data-presentation] [data-orbit-filter-row] { padding: 0 0 1px; border: 0; border-bottom: 1px solid rgba(51,76,85,.11); border-radius: 0; }
[data-orbit-studio][data-mobile="true"][data-orbit-glass-tone="paper"] > [data-orbit-filters][data-presentation] .orbit-filter-statuses { grid-template-columns: 1fr 1.65fr .85fr; gap: 1px; }
[data-orbit-studio][data-mobile="true"][data-orbit-glass-tone="paper"] > [data-orbit-filters][data-presentation] [data-orbit-filter-ranges] { margin: 1px 0 0; gap: 4px; }
[data-orbit-studio][data-mobile="true"][data-orbit-glass-tone="paper"] > [data-orbit-filters][data-presentation] :is([data-orbit-filter-status],[data-orbit-range-toggle]) { height: 30px; min-height: 30px; padding: 0 5px; gap: 6px; border: 1px solid rgba(46,86,104,.29); border-radius: 11px; color: #324a50; background: transparent; box-shadow: none; font-size: 10px; line-height: 1.2; font-weight: 500; letter-spacing: 0; }
[data-orbit-studio][data-mobile="true"][data-orbit-glass-tone="paper"] > [data-orbit-filters][data-presentation] [data-orbit-range-toggle] { height: 27px; min-height: 27px; font-size: 10px; color: #53686e; }
[data-orbit-studio][data-mobile="true"][data-orbit-glass-tone="paper"] > [data-orbit-filters][data-presentation] :is([data-orbit-filter-status][aria-pressed="true"],[data-orbit-range-toggle][data-filtered="true"],[data-orbit-range-toggle][aria-expanded="true"]) { color: #183b43; border-color: rgba(41,70,80,.22); background: rgba(255,255,255,.18); box-shadow: none; }
[data-orbit-studio][data-mobile="true"][data-orbit-glass-tone="paper"] > [data-orbit-filters][data-presentation] .orbit-filter-dot { width: 8px; height: 8px; box-shadow: 0 0 0 1px color-mix(in srgb,var(--filter-dot) 65%,rgba(50,72,82,.28)); }
[data-orbit-studio][data-mobile="true"][data-orbit-glass-tone="paper"] > [data-orbit-filters][data-presentation] [data-orbit-filter-count] { display: none; }
[data-orbit-studio][data-mobile="true"][data-orbit-glass-tone="paper"] > [data-orbit-filters][data-presentation] [data-orbit-filter-reset] { width: 27px; height: 27px; flex-basis: 27px; border-radius: 50%; color: #53686e; }
[data-orbit-studio][data-mobile="true"][data-orbit-glass-tone="paper"] > [data-orbit-filters][data-orbit-filter-visible="false"] { -webkit-backdrop-filter: none; backdrop-filter: none; }

[data-orbit-studio][data-mobile="true"][data-orbit-glass-tone="paper"] .orbit-studio-body { gap: 12px; }
[data-orbit-studio][data-mobile="true"][data-orbit-glass-tone="paper"] .orbit-studio-mobile-panel { grid-template-columns: minmax(0,1.55fr) minmax(0,1fr); grid-template-rows: minmax(0,1fr); height: 100%; max-height: none; gap: 16px; padding: 8px 0 0; background: none; border: 0; border-radius: 0; box-shadow: none; }
[data-orbit-studio][data-mobile="true"][data-orbit-glass-tone="paper"] .orbit-studio-mobile-plan { grid-column: 1; grid-row: 1; height: 100%; justify-content: center; }
[data-orbit-studio][data-mobile="true"][data-orbit-glass-tone="paper"] .orbit-studio-mobile-plan-button { width: 88%; height: 88%; max-height: 88%; align-self: center; aspect-ratio: auto; border-radius: 0; background: transparent; box-shadow: none; }
[data-orbit-studio][data-mobile="true"][data-orbit-glass-tone="paper"] .orbit-studio-mobile-summary { grid-column: 2; grid-row: 1; height: 100%; justify-content: space-between; gap: clamp(10px,1.9cqh,18px); min-width: 0; padding: 0 0 2px; }
[data-orbit-studio][data-mobile="true"][data-orbit-glass-tone="paper"] .orbit-studio-mobile-identity { flex-direction: column; flex-wrap: nowrap; align-items: flex-start; justify-content: flex-start; gap: 8px; width: 100%; padding-bottom: 12px; border-bottom: 1px solid rgba(56,77,83,.18); }
[data-orbit-studio][data-mobile="true"][data-orbit-glass-tone="paper"] .orbit-studio-id { width: 100%; font-size: 36px; letter-spacing: -.045em; }
[data-orbit-studio][data-mobile="true"][data-orbit-glass-tone="paper"] .orbit-studio-status { flex: 0 0 auto; max-width: 100%; font-size: 10px; line-height: 1.4; gap: 6px; }
[data-orbit-studio][data-mobile="true"][data-orbit-glass-tone="paper"] .orbit-studio-status-dot { width: 7px; height: 7px; }
[data-orbit-studio][data-mobile="true"][data-orbit-glass-tone="paper"] .orbit-studio-status-dot::after { display: none; }
[data-orbit-studio][data-mobile="true"][data-orbit-glass-tone="paper"] .orbit-studio-status-text { white-space: normal; overflow: visible; }
[data-orbit-studio][data-mobile="true"][data-orbit-glass-tone="paper"] .orbit-studio-mobile-metrics { flex-shrink: 0; gap: 14px; }
[data-orbit-studio][data-mobile="true"][data-orbit-glass-tone="paper"] .orbit-studio-mobile-metrics > div { justify-content: space-between; gap: 3px 5px; }
[data-orbit-studio][data-mobile="true"][data-orbit-glass-tone="paper"] .orbit-studio-mobile-metrics dt { order: 2; flex: 0 0 auto; margin-left: auto; font-size: 10px; line-height: 1.5; text-align: right; text-transform: lowercase; }
[data-orbit-studio][data-mobile="true"][data-orbit-glass-tone="paper"] .orbit-studio-mobile-metrics dd { order: 1; font-size: 18px; font-weight: 650; }
[data-orbit-studio][data-mobile="true"][data-orbit-glass-tone="paper"] .orbit-studio-mobile-metrics > div:first-child dd { font-size: 18px; }
[data-orbit-studio][data-mobile="true"][data-orbit-glass-tone="paper"] .orbit-studio-mobile-metrics small,
[data-orbit-studio][data-mobile="true"][data-orbit-glass-tone="paper"] .orbit-studio-mobile-metrics > div:first-child small { margin-left: 3px; font-size: 10px; }
[data-orbit-studio][data-mobile="true"][data-orbit-glass-tone="paper"] .orbit-studio-mobile-actions { flex-shrink: 0; padding-top: 0; border-top: 0; }
[data-orbit-studio][data-mobile="true"][data-orbit-glass-tone="paper"] .orbit-studio-price { width: 100%; padding: 12px 0; border-top: 1px solid rgba(56,77,83,.22); border-bottom: 1px solid rgba(56,77,83,.22); }
[data-orbit-studio][data-mobile="true"][data-orbit-glass-tone="paper"] .orbit-studio-price-value { font-size: clamp(17px,5.2cqw,21px); line-height: 1.35; font-weight: 600; letter-spacing: -.03em; white-space: nowrap; }
[data-orbit-studio][data-mobile="true"][data-orbit-glass-tone="paper"] .orbit-studio-price-value small { margin-left: 1px; font-size: .72em; }
@container orbit-studio-mobile (max-width: 360px) {
    [data-orbit-studio][data-mobile="true"][data-orbit-glass-tone="paper"] .orbit-studio-price-value { font-size: clamp(13px,4.7cqw,16px); }
}
[data-orbit-studio][data-mobile="true"][data-orbit-glass-tone="paper"] .orbit-studio-mobile-actions .orbit-studio-bottom { align-items: stretch; gap: 12px; }
[data-orbit-studio][data-mobile="true"][data-orbit-glass-tone="paper"] .orbit-studio-primary { width: 100%; min-height: 34px; padding: 7px 13px; gap: 9px; border-radius: 999px; border: 1px solid rgba(255,255,255,.86); background: linear-gradient(155deg,rgba(255,255,255,.88),rgba(230,240,240,.62)); color: #294346; box-shadow: inset 0 1px 1px white,0 2px 7px rgba(30,55,64,.08); font-size: 11px; font-weight: 500; }
[data-orbit-studio][data-mobile="true"][data-orbit-glass-tone="paper"] .orbit-studio-primary svg { width: 12px; height: 12px; }
[data-orbit-studio][data-mobile="true"][data-orbit-glass-tone="paper"] .orbit-studio-primary:active { background: rgba(219,234,234,.88); box-shadow: inset 0 1px 2px rgba(30,55,64,.12); }

/* The separate landscape fullscreen overlay keeps its existing compact controls. */
[data-orbit-fullscreen-details][data-compact][data-orbit-glass-tone] [data-orbit-filters][data-presentation] [data-orbit-filter-count] { display: none; }
[data-orbit-fullscreen-details][data-compact][data-orbit-glass-tone] [data-orbit-filters][data-presentation] :is([data-orbit-filter-status],[data-orbit-range-toggle]) { height: 30px; min-height: 30px; padding: 0 7px; gap: 4px; font-size: 10px; font-weight: 500; letter-spacing: 0; box-shadow: inset 0 1px 0 rgba(255,255,255,.7); }
[data-orbit-fullscreen-details][data-compact][data-orbit-glass-tone] [data-orbit-filters][data-presentation] [data-orbit-filter-status] { border-color: color-mix(in srgb,var(--filter-dot) 40%,rgba(50,72,82,.18)); background: linear-gradient(155deg,rgba(255,255,255,.30),transparent),color-mix(in srgb,var(--filter-dot) 17%,rgba(255,255,255,.46)); }
[data-orbit-fullscreen-details][data-compact][data-orbit-glass-tone] [data-orbit-filters][data-presentation] [data-orbit-filter-status][aria-pressed="true"] { border-color: color-mix(in srgb,var(--filter-dot) 70%,#3f6266); background: linear-gradient(155deg,rgba(255,255,255,.28),transparent),color-mix(in srgb,var(--filter-dot) 38%,rgba(255,255,255,.54)); box-shadow: inset 0 0 0 .5px color-mix(in srgb,var(--filter-dot) 55%,#557074); }
[data-orbit-fullscreen-details][data-compact][data-orbit-glass-tone] [data-orbit-filters][data-presentation] .orbit-filter-dot { width: 4px; height: 4px; }
[data-orbit-fullscreen-details][data-compact][data-orbit-glass-tone] .orbit-fullscreen-price { font-size: 15px; }
[data-orbit-fullscreen-details][data-compact][data-orbit-glass-tone] .orbit-fullscreen-detail { min-height: 34px; padding: 7px 12px; font-size: 10px; }

@container orbit-studio-mobile (max-height: 570px) {
    [data-orbit-studio][data-mobile="true"][data-orbit-glass-tone="paper"] .orbit-studio-body { gap: 8px; }
    [data-orbit-studio][data-mobile="true"][data-orbit-glass-tone="paper"] .orbit-studio-mobile-panel { gap: 12px; padding-top: 4px; }
    [data-orbit-studio][data-mobile="true"][data-orbit-glass-tone="paper"] .orbit-studio-mobile-summary { gap: 8px; padding-top: 0; }
    [data-orbit-studio][data-mobile="true"][data-orbit-glass-tone="paper"] .orbit-studio-mobile-identity { padding-bottom: 8px; gap: 5px 6px; }
    [data-orbit-studio][data-mobile="true"][data-orbit-glass-tone="paper"] .orbit-studio-id { font-size: 30px; }
    [data-orbit-studio][data-mobile="true"][data-orbit-glass-tone="paper"] .orbit-studio-mobile-metrics { gap: 7px; }
    [data-orbit-studio][data-mobile="true"][data-orbit-glass-tone="paper"] .orbit-studio-mobile-metrics dd { font-size: 16px; }
    [data-orbit-studio][data-mobile="true"][data-orbit-glass-tone="paper"] .orbit-studio-mobile-metrics > div:first-child dd { font-size: 16px; }
    [data-orbit-studio][data-mobile="true"][data-orbit-glass-tone="paper"] .orbit-studio-mobile-actions .orbit-studio-bottom { gap: 8px; }
    [data-orbit-studio][data-mobile="true"][data-orbit-glass-tone="paper"] .orbit-studio-price { padding-block: 8px; }
    [data-orbit-studio][data-mobile="true"][data-orbit-glass-tone="paper"] .orbit-studio-primary { min-height: 32px; padding: 6px 11px; }
}
@container orbit-studio-mobile (max-height: 510px) and (max-aspect-ratio: 1/1) {
    [data-orbit-studio][data-mobile="true"][data-orbit-glass-tone="paper"] .orbit-studio-mobile-panel { grid-template-columns: minmax(0,1.2fr) minmax(0,1fr); gap: 10px; padding-top: 0; }
    [data-orbit-studio][data-mobile="true"][data-orbit-glass-tone="paper"] .orbit-studio-mobile-summary { gap: 7px; padding-top: 0; }
    [data-orbit-studio][data-mobile="true"][data-orbit-glass-tone="paper"] .orbit-studio-mobile-identity { padding-bottom: 6px; }
    [data-orbit-studio][data-mobile="true"][data-orbit-glass-tone="paper"] .orbit-studio-id { font-size: 28px; }
    [data-orbit-studio][data-mobile="true"][data-orbit-glass-tone="paper"] .orbit-studio-mobile-metrics { gap: 6px; }
    [data-orbit-studio][data-mobile="true"][data-orbit-glass-tone="paper"] .orbit-studio-mobile-metrics > div:first-child dd { font-size: 16px; }
}
@container orbit-studio-mobile (max-height: 450px) and (min-aspect-ratio: 4/3) {
    [data-orbit-studio][data-mobile="true"][data-orbit-glass-tone="paper"] .orbit-studio-mobile-panel { gap: 12px; padding-top: 0; }
    [data-orbit-studio][data-mobile="true"][data-orbit-glass-tone="paper"] .orbit-studio-mobile-summary { gap: 6px; padding-top: 0; }
    [data-orbit-studio][data-mobile="true"][data-orbit-glass-tone="paper"] .orbit-studio-mobile-identity { padding-bottom: 6px; }
    [data-orbit-studio][data-mobile="true"][data-orbit-glass-tone="paper"] .orbit-studio-id { font-size: 28px; }
    [data-orbit-studio][data-mobile="true"][data-orbit-glass-tone="paper"] .orbit-studio-mobile-metrics { gap: 6px; }
    [data-orbit-studio][data-mobile="true"][data-orbit-glass-tone="paper"] .orbit-studio-mobile-metrics > div:first-child dd { font-size: 16px; }
}
@media (hover:hover) {
    [data-orbit-studio][data-mobile="true"][data-orbit-glass-tone="paper"] > [data-orbit-filters][data-presentation] :is([data-orbit-filter-status],[data-orbit-range-toggle]):not(:disabled):hover { color: #183b43; border-color: #6592a4; background: rgba(220,241,251,.6); box-shadow: none; }
    [data-orbit-studio][data-mobile="true"][data-orbit-glass-tone="paper"] > [data-orbit-filters][data-presentation] :is([data-orbit-filter-status][aria-pressed="true"],[data-orbit-range-toggle][data-filtered="true"],[data-orbit-range-toggle][aria-expanded="true"]):not(:disabled):hover { border-color: #6592a4; background: rgba(220,241,251,.72); }
}
@media (prefers-reduced-transparency:reduce) {
    [data-orbit-studio][data-mobile="true"][data-orbit-glass-tone="paper"] > [data-orbit-filters][data-presentation] { background: transparent; -webkit-backdrop-filter: none; backdrop-filter: none; }
}
`

const orbitApartmentStudioStyles = `
/* Let the browser paint the inert panels underneath SEQ_02's opaque ending still. */
[data-admiral-fullscreen-fades][data-orbit-prepaint]:not([data-orbit-arriving]) [data-orbit-studio] {
    visibility: visible; opacity: .005; transition: none;
}
[data-admiral-fullscreen-fades][data-orbit-prepaint] [data-orbit-studio] { will-change: opacity; }
/* Fade the board as one layer, behind the landing film. Its controls remain inert until activation. */
[data-admiral-fullscreen-fades][data-orbit-arriving][data-orbit-fullscreen="false"] [data-orbit-studio] {
    opacity: 1; visibility: visible; transition-delay: 0s;
}
[data-admiral-fullscreen-fades][data-orbit-arriving] [data-orbit-studio][data-active="false"] {
    --orbit-light-glass-blur: none;
}
[data-flight-media] { position: absolute; inset: 0; }
[data-native-flight] > [data-flight-media] {
    inset: 0 auto auto 0; width: 1920px; height: 1010px; transform-origin: 0 0;
    will-change: transform;
}
[data-native-flight] > [data-flight-media] > :is(img, video) {
    left: 0 !important; top: 0 !important; width: 100% !important; height: 100% !important;
    border-radius: 0 !important;
}
[data-homepage-stage="orbitApproach"] > [data-flight-shade] {
    inset: 0 !important; width: 100% !important; height: 100% !important; border-radius: 0 !important;
}

[data-orbit-studio] {
    --studio-ink: #242824; --studio-muted: #687074; --studio-line: rgba(72,81,85,.2);
    --studio-paper: var(--admiral-orbit-background,#fdfbfb); --studio-base: #e4e9ec;
    --studio-orbit-scale: .9;
    position: absolute; inset: auto 0 0; height: 90%; z-index: 1; box-sizing: border-box;
    display: grid; grid-template-rows: auto minmax(0,1fr); gap: clamp(14px,1.8vw,26px);
    padding: clamp(16px,2.2vw,34px) clamp(20px,3vw,52px) 24px;
    color: var(--studio-ink); background: linear-gradient(180deg,var(--studio-paper),var(--studio-base));
    font-family: Montserrat,Arial,Helvetica,sans-serif; -webkit-font-smoothing: antialiased;
    opacity: 0; visibility: hidden; pointer-events: none; transition: opacity .4s ease,visibility 0s linear .4s;
}
[data-orbit-studio][data-active="true"] { opacity: 1; visibility: visible; pointer-events: auto; transition-delay: 0s; }
[data-orbit-studio] *, [data-orbit-studio] *::before, [data-orbit-studio] *::after { box-sizing: border-box; }
[data-orbit-studio] button,[data-orbit-studio] select,[data-orbit-studio] a { font: inherit; color: inherit; -webkit-tap-highlight-color: transparent; touch-action: manipulation; }
[data-orbit-studio] button { cursor: pointer; }
[data-orbit-studio] button:disabled { cursor: default; opacity: .45; }
[data-orbit-studio] :is(button,a,select):focus-visible { outline: 2px solid var(--studio-ink); outline-offset: 4px; }
[data-orbit-studio] [hidden] { display: none !important; }
[data-orbit-studio] .orbit-studio-header { display: flex; justify-content: space-between; align-items: center; gap: 20px; min-width: 0; }
[data-orbit-studio] .orbit-studio-brand { display: block; width: clamp(130px,13vw,184px); height: auto; flex: 0 0 auto; }
[data-orbit-studio] .orbit-studio-header-end { display: flex; align-items: center; justify-content: flex-end; flex-wrap: wrap; gap: 14px 24px; min-width: 0; }
[data-orbit-studio][data-mobile="false"] .orbit-studio-header { flex-wrap: wrap; row-gap: 12px; }
[data-orbit-studio] [data-orbit-studio-filters] { flex: 1 0 100%; width: 100%; min-width: 0; }
[data-orbit-studio][data-mobile="false"] [data-orbit-filter-status], [data-orbit-studio][data-mobile="false"] [data-orbit-price-toggle] { font-size: 12px; }
[data-orbit-studio] .orbit-studio-preview { display: flex; align-items: center; gap: 10px; min-width: 0; font-size: 10px; color: var(--studio-muted); }
[data-orbit-studio] .orbit-studio-preview label { white-space: nowrap; }
[data-orbit-studio] select { width: 98px; max-width: 100%; min-height: 38px; padding: 5px 24px 5px 10px; border: 1px solid var(--studio-line); border-radius: 0; background: transparent; font-size: 12px; }
[data-orbit-studio] .orbit-studio-heading { display: flex; align-items: center; gap: 20px; min-width: 0; }
[data-orbit-studio] .orbit-studio-id { margin: 0; font-size: clamp(27px,3vw,44px); font-weight: 700; line-height: 1; letter-spacing: -.065em; }
[data-orbit-studio] .orbit-studio-status { display: inline-flex; align-items: center; gap: 8px; color: var(--studio-muted); font-size: 12px; font-weight: 500; line-height: 1.4; }
[data-orbit-studio] .orbit-studio-status-dot { position: relative; display: block; width: 6px; height: 6px; border-radius: 50%; background: currentColor; flex-shrink: 0; }
[data-orbit-studio] .orbit-studio-status[data-status="available"] { color: #35764c; color: color-mix(in srgb,var(--orbit-available-color,#46A66A) 65%,#263b32); }
[data-orbit-studio] .orbit-studio-status[data-status="available"] .orbit-studio-status-dot::after { position: absolute; content: ""; inset: -3px; border: 1px solid currentColor; border-radius: 50%; animation: orbitStudioAvailablePulse 2.4s ease-out infinite; }
[data-orbit-studio] .orbit-studio-status[data-status="under_negotiation"],[data-orbit-studio] .orbit-studio-status[data-status="reserved"] { color: #79723c; color: color-mix(in srgb,var(--orbit-negotiation-color,#E2B849) 45%,#263b32); }
[data-orbit-studio] .orbit-studio-status[data-status="sold"] { color: #ae4f56; color: color-mix(in srgb,var(--orbit-sold-color,#DA5961) 75%,#263b32); }
@keyframes orbitStudioAvailablePulse { 0%,15% { opacity: .55; transform: scale(.6); } 75%,100% { opacity: 0; transform: scale(1.5); } }
[data-orbit-studio] .orbit-studio-body { display: grid; grid-template-columns: minmax(0,1.5fr) minmax(300px,1fr); gap: clamp(22px,3vw,48px); min-width: 0; min-height: 0; }
[data-orbit-studio] .orbit-studio-scene { display: grid; grid-template-rows: minmax(0,1fr) auto; gap: 18px; min-width: 0; min-height: 0; }
[data-orbit-studio] .orbit-studio-image-slot { display: flex; align-items: center; justify-content: center; min-width: 0; min-height: 0; container-type: size; }
[data-admiral-homepage][data-orbit-scrubbing="true"] { cursor: grabbing; user-select: none; }
[data-admiral-homepage][data-orbit-wheel-pointer] [data-orbit-render-canvas] { cursor: grab; }
[data-orbit-wheel-cursor] {
    position: absolute;
    inset: 0 auto auto 0;
    z-index: 10;
    pointer-events: none;
    padding: 7px 10px;
    color: #153748;
    background: rgba(247, 252, 255, .91);
    border: 1px solid rgba(255, 255, 255, .82);
    border-radius: 999px;
    box-shadow: 0 3px 12px rgba(13, 47, 66, .15);
    font: 700 12px/1.2 "Inter", Arial, sans-serif;
    white-space: nowrap;
}
[data-admiral-homepage]:not([data-homepage-stage="orbit"]) [data-orbit-wheel-cursor],
[data-admiral-homepage][data-orbit-fullscreen="true"] [data-orbit-wheel-cursor],
[data-admiral-homepage][data-apartment-detail-open="true"] [data-orbit-wheel-cursor] { display: none; }
[data-orbit-studio] [data-orbit-viewport] { position: relative; width: 100%; max-width: 100%; max-height: 100%; aspect-ratio: 1920 / 1010; background: transparent; transform: scale(var(--studio-orbit-scale)); }
@supports (width: 1cqh) { [data-orbit-studio] [data-orbit-viewport] { width: min(100cqw,calc(100cqh * 1920 / 1010)); } }
[data-orbit-studio] .orbit-studio-facts { min-width: 0; border-top: 1px solid var(--studio-line); padding-top: 18px; }
[data-orbit-studio] .orbit-studio-areas { display: grid; grid-template-columns: repeat(3,minmax(0,1fr)); gap: 16px; margin: 0 0 18px; }
[data-orbit-studio] .orbit-studio-areas > div { min-width: 0; }
[data-orbit-studio] .orbit-studio-areas dt { margin: 0 0 8px; color: var(--studio-muted); font-size: 11px; line-height: 1.4; }
[data-orbit-studio] .orbit-studio-areas dd { margin: 0; font-size: clamp(24px,2.4vw,36px); font-weight: 700; line-height: 1; letter-spacing: -.045em; white-space: nowrap; }
[data-orbit-studio] .orbit-studio-areas small { margin-left: 4px; color: var(--studio-muted); font-size: 12px; font-weight: 400; letter-spacing: 0; }
[data-orbit-studio] .orbit-studio-bottom { display: flex; align-items: flex-end; justify-content: space-between; gap: 16px; margin-top: 20px; }
[data-orbit-studio] .orbit-studio-price { min-width: 0; }
[data-orbit-studio] .orbit-studio-label { margin: 0 0 6px; color: var(--studio-muted); font-size: 10px; line-height: 1.4; }
[data-orbit-studio] .orbit-studio-price-value { margin: 0; font-size: clamp(24px,2.6vw,38px); font-weight: 400; letter-spacing: -.055em; line-height: 1.1; }
[data-orbit-studio] .orbit-studio-price-value small { margin-left: 4px; font-size: 12px; font-weight: 400; letter-spacing: 0; }
[data-orbit-studio] .orbit-studio-primary { display: inline-flex; align-items: center; justify-content: center; gap: 20px; min-height: 46px; padding: 10px 18px; border: 1px solid var(--studio-ink); border-radius: 0; color: var(--studio-ink); background: transparent; font-size: 12px; line-height: 1.3; text-decoration: none; white-space: nowrap; }
[data-orbit-studio] .orbit-studio-primary:hover { background: rgba(36,40,36,.05); }
[data-orbit-studio] .orbit-studio-text-button { display: inline-flex; align-items: center; justify-content: center; gap: 6px; min-height: 36px; padding: 6px 0; border: 0; border-bottom: 1px solid var(--studio-line); border-radius: 0; color: var(--studio-muted); background: none; font-size: 10px; line-height: 1.4; text-decoration: none; }
[data-orbit-studio] .orbit-studio-text-button:hover { color: var(--studio-ink); border-bottom-color: var(--studio-ink); }
/* Fade the record in place; the logo, preview selector and filters stay steady. */
[data-orbit-studio] [data-orbitdata-transition] { opacity: 1; transition: opacity .18s ease; }
[data-orbit-studio] [data-orbitdata-transition][data-orbitdata-visible="false"] { opacity: 0; pointer-events: none; }
/* Retain the selected record and glass geometry while camera input is busy. */
[data-orbit-studio][data-moving="true"] [data-orbitdata-transition] { pointer-events: none; }

[data-orbit-studio] .orbit-studio-details { display: flex; flex-direction: column; min-width: 0; min-height: 0; }
[data-orbit-studio] .orbit-studio-plan-section { display: flex; flex: 1; flex-direction: column; min-width: 0; min-height: 0; }
[data-orbit-studio] .orbit-studio-plan-stage { display: grid; flex: 1; place-items: center; min-width: 0; min-height: 0; container-type: size; }
[data-orbit-studio] .orbit-studio-plan-crop { position: relative; width: 100%; max-width: 100%; max-height: 100%; aspect-ratio: var(--studio-plan-aspect,1); overflow: hidden; }
@supports (width: 1cqh) { [data-orbit-studio] .orbit-studio-plan-crop { width: min(100cqw,calc(100cqh * var(--studio-plan-aspect,1))); } }
[data-orbit-studio] .orbit-studio-plan-image { position: absolute; display: block; max-width: none; border: 0; object-fit: fill; }
[data-orbit-studio] .orbit-studio-empty { margin: auto; max-width: 320px; padding: 24px 0; color: var(--studio-muted); font-size: 12px; line-height: 1.8; text-align: center; }
[data-orbit-studio] .orbit-studio-empty p { margin: 0 0 12px; }
[data-orbit-studio] .orbit-studio-loading { color: var(--studio-muted); font-size: 11px; line-height: 1.8; }
[data-orbit-studio] .orbit-studio-mobile-actions { display: none; }
@media (max-width: 1000px) and (min-width: 768px) {
    [data-orbit-studio] { padding: 18px 24px; gap: 14px; }
    [data-orbit-studio] .orbit-studio-body { grid-template-columns: minmax(0,1.25fr) minmax(270px,1fr); gap: 22px; }
    [data-orbit-studio] .orbit-studio-header-end { gap: 12px; }
    [data-orbit-studio] .orbit-studio-heading { gap: 12px; }
    [data-orbit-studio] .orbit-studio-bottom { align-items: flex-start; flex-direction: column; gap: 12px; }
    [data-orbit-studio] .orbit-studio-areas { gap: 10px; }
}
@media (max-width: 767px) {
    [data-orbit-studio] { padding: 14px 16px max(12px,env(safe-area-inset-bottom,0px)); gap: 12px; }
    [data-orbit-studio] .orbit-studio-header { gap: 12px; align-items: flex-start; }
    [data-orbit-studio] .orbit-studio-brand { width: 104px; }
    [data-orbit-studio] .orbit-studio-header-end { flex: 1; gap: 6px 12px; }
    [data-orbit-studio] .orbit-studio-heading { gap: 8px; justify-content: flex-end; flex-wrap: wrap; }
    [data-orbit-studio] .orbit-studio-id { font-size: 28px; }
    [data-orbit-studio] .orbit-studio-status { font-size: 10px; gap: 5px; }
    [data-orbit-studio] .orbit-studio-preview { gap: 6px; font-size: 9px; }
    [data-orbit-studio] .orbit-studio-preview select { width: 85px; min-height: 30px; font-size: 10px; }
    [data-orbit-studio] .orbit-studio-body { display: flex; flex-direction: column; gap: 12px; overflow: hidden; }
    [data-orbit-studio] .orbit-studio-scene { display: contents; }
    [data-orbit-studio] .orbit-studio-image-slot { flex: 0 0 auto; width: calc(100% + 32px); margin-inline: -16px; aspect-ratio: 1920 / 1010; container-type: normal; }
    [data-orbit-studio] [data-orbit-viewport] { width: 100%; height: 100%; max-height: none; }
    [data-orbit-studio] .orbit-studio-facts { order: 2; flex: 0 0 auto; padding-top: 12px; }
    [data-orbit-studio] .orbit-studio-areas { margin-bottom: 0; gap: 10px; }
    [data-orbit-studio] .orbit-studio-areas dt { margin-bottom: 5px; font-size: 9px; }
    [data-orbit-studio] .orbit-studio-areas dd { font-size: 25px; }
    [data-orbit-studio] .orbit-studio-areas small { font-size: 10px; }
    [data-orbit-studio] .orbit-studio-facts > .orbit-studio-bottom { display: none; }
    [data-orbit-studio] .orbit-studio-details { order: 3; display: block; flex: 1 1 auto; overflow-y: auto; overscroll-behavior: contain; touch-action: pan-y; scrollbar-width: thin; scrollbar-color: rgba(72,81,85,.35) transparent; padding-right: 3px; }
    [data-orbit-studio] .orbit-studio-plan-section { min-height: 310px; height: 310px; }
    [data-orbit-studio] .orbit-studio-plan-stage { height: 280px; flex: 0 0 280px; }
    [data-orbit-studio] .orbit-studio-mobile-actions { display: block; border-top: 1px solid var(--studio-line); padding-top: 14px; margin-top: 16px; }
    [data-orbit-studio] .orbit-studio-mobile-actions .orbit-studio-bottom { margin: 0; align-items: center; }
    [data-orbit-studio] .orbit-studio-price-value { font-size: 26px; }
    [data-orbit-studio] .orbit-studio-price-value small { font-size: 10px; }
    [data-orbit-studio] .orbit-studio-primary { min-height: 42px; gap: 12px; padding: 8px 12px; font-size: 10px; }
}
@media (prefers-reduced-motion: reduce) {
    [data-orbit-studio] { transition: none; }
    [data-orbit-studio] .orbit-studio-status-dot::after { animation: none !important; }
}
@media (min-width: 768px) and (max-height: 600px) {
    [data-orbit-studio] { padding: 12px 20px; gap: 10px; }
    [data-orbit-studio] .orbit-studio-brand { width: 110px; }
    [data-orbit-studio] .orbit-studio-id { font-size: 28px; }
    [data-orbit-studio] .orbit-studio-body { grid-template-columns: minmax(0,1.2fr) minmax(280px,1fr); gap: 20px; }
    [data-orbit-studio] .orbit-studio-scene { grid-template-rows: minmax(0,1fr); gap: 0; }
    [data-orbit-studio] .orbit-studio-details { overflow-y: auto; overscroll-behavior: contain; touch-action: pan-y; padding-right: 6px; }
    [data-orbit-studio] .orbit-studio-plan-section { flex: 0 0 auto; min-height: 330px; }
    [data-orbit-studio] .orbit-studio-plan-stage { flex: none; height: 300px; }
    [data-orbit-studio] .orbit-studio-details .orbit-studio-facts { margin-top: 18px; }
}
/* Phones keep the complete orbit above a compact apartment summary. */
[data-orbit-studio][data-mobile="true"] {
    container-name: orbit-studio-mobile; container-type: size; overflow: hidden;
    --studio-phone-gutter: 12px;
    --studio-phone-frame-width: calc((100% + 2 * var(--studio-phone-gutter)) * var(--studio-orbit-scale));
    padding: 8px var(--studio-phone-gutter) max(10px,env(safe-area-inset-bottom,0px)); gap: 6px;
    grid-template-rows: auto auto minmax(0,1fr); text-align: left;
}
[data-orbit-studio][data-mobile="true"] .orbit-studio-header { display: flex; align-items: center; justify-content: center; gap: 0; min-height: 0; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-brand { width: 160px; height: auto; max-width: 52cqw; }
[data-orbit-studio][data-mobile="true"] > [data-orbit-filters] { z-index: 5; }
[data-orbit-studio][data-mobile="true"][data-orbit-glass-tone="paper"] > :is([data-orbit-filters][data-presentation],[data-orbit-group]),
[data-orbit-studio][data-mobile="true"][data-orbit-glass-tone="paper"] .orbit-studio-mobile-panel {
    width: var(--studio-phone-frame-width);
    justify-self: center;
}
[data-orbit-studio][data-mobile="true"] > [data-orbit-filters] [data-orbit-range-popover] { top: var(--orbit-mobile-popup-top,calc(-100% - 7px)); bottom: auto; }
[data-orbit-studio][data-mobile="true"] > [data-orbit-filters] [data-orbit-range-popover] { height: 64px; padding: 7px 10px; }
[data-orbit-studio][data-mobile="true"] > [data-orbit-filters] .orbit-filter-price-values { height: 15px; font-size: 10px; }
[data-orbit-studio][data-mobile="true"] > [data-orbit-filters] .orbit-filter-price-stage { height: 28px; margin-top: 3px; }
[data-orbit-studio][data-mobile="true"] > [data-orbit-filters] input[type="range"] { height: 28px; }
[data-orbit-studio][data-mobile="true"] > [data-orbit-filters] :is(.orbit-filter-price-track,.orbit-filter-price-selection) { top: 13px; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-body { display: grid; grid-template-columns: minmax(0,1fr); grid-template-rows: calc((100cqw + 2 * var(--studio-phone-gutter)) * 1010 / 1920) minmax(0,1fr); gap: 8px; overflow: hidden; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-scene { display: contents; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-image-slot { position: relative; order: 0; width: calc(100% + 2 * var(--studio-phone-gutter)); height: 100%; margin-inline: calc(-1 * var(--studio-phone-gutter)); aspect-ratio: 1920 / 1010; container-type: inline-size; }
[data-orbit-studio][data-mobile="true"] [data-orbit-viewport] { position: absolute; inset: 0; width: 100%; height: 100%; max-height: none; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-panel { display: grid; grid-template-columns: minmax(0,1.5fr) minmax(0,1fr); grid-template-rows: auto minmax(0,1fr); gap: 8px 10px; min-width: 0; min-height: 0; height: min(100%,calc(max(200px,(100cqw - 10px) * .6 / var(--studio-plan-aspect,1)) + 36px)); align-self: center; overflow: hidden; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-panel > .orbit-studio-heading { grid-column: 1 / -1; justify-content: flex-start; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-plan { display: flex; flex-direction: column; justify-content: center; gap: 6px; min-width: 0; min-height: 0; margin: 0; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-plan > :is(figcaption,p) { flex-shrink: 0; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-eyebrow { margin: 0; color: var(--studio-muted); font-size: 10px; font-weight: 500; line-height: 1.4; letter-spacing: .07em; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-plan-button { display: grid; flex: 0 1 auto; min-width: 0; min-height: 0; width: 100%; aspect-ratio: var(--studio-plan-aspect,1); padding: 0; border: 0; border-radius: 8px; background: rgba(255,255,255,.45); text-align: left; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-plan-stage { width: 100%; height: 100%; min-height: 0; flex: auto; padding: 0; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-summary { display: flex; flex-direction: column; justify-content: flex-start; align-items: stretch; gap: 7px; min-width: 0; min-height: 0; text-align: left; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-heading { display: flex; align-items: center; flex-wrap: nowrap; gap: 7px; min-width: 0; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-id { flex: 0 0 auto; margin: 0; font-size: 28px; line-height: 1; font-weight: 700; letter-spacing: -.045em; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-id small { margin-left: 5px; color: var(--studio-muted); font-size: 10px; font-weight: 400; letter-spacing: 0; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-status { flex: 0 1 auto; min-width: 0; font-size: 10px; line-height: 1.35; font-weight: 500; gap: 5px; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-status-text { display: block; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-metrics { display: grid; grid-template-columns: minmax(0,1fr); gap: 6px; margin: 0; min-width: 0; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-metrics > div { display: flex; align-items: baseline; justify-content: space-between; flex-wrap: wrap; gap: 2px 5px; min-width: 0; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-metrics > div:first-child { grid-column: 1 / -1; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-metrics dt { margin: 0; color: var(--studio-muted); font-size: 10px; font-weight: 400; line-height: 1.4; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-metrics dd { margin: 0; color: #263b32; font-size: 14px; font-weight: 700; line-height: 1.2; letter-spacing: -.025em; white-space: nowrap; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-metrics > div:first-child dd { font-size: 21px; line-height: 1.1; letter-spacing: -.05em; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-metrics small { margin-left: 2px; color: var(--studio-muted); font-size: 9px; font-weight: 400; letter-spacing: 0; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-metrics > div:first-child small { margin-left: 4px; font-size: 11px; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-actions { display: block; min-width: 0; margin: 0; padding-top: 6px; border-top: 1px solid var(--studio-line); }
[data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-actions .orbit-studio-bottom { display: flex; flex-direction: column; justify-content: flex-start; align-items: stretch; margin: 0; gap: 7px; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-label { margin-bottom: 4px; font-size: 9px; line-height: 1.3; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-price-value { font-size: 18px; line-height: 1.1; font-weight: 500; letter-spacing: -.035em; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-price-value small { font-size: 11px; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-price-value.orbit-studio-price-empty { font-size: 12px; line-height: 1.4; font-weight: 400; letter-spacing: 0; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-primary { flex: 0 0 auto; min-height: 44px; padding: 10px 12px; gap: 8px; border: 1px solid #263b32; border-radius: 999px; color: #fff; background: #263b32; box-shadow: 0 3px 10px rgba(29,52,42,.1); font-size: 12px; font-weight: 500; transition: background .18s,box-shadow .18s; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-primary svg { width: 16px; height: 16px; flex-shrink: 0; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-primary:hover { background: #344e41; box-shadow: 0 4px 12px rgba(29,52,42,.16); }
[data-orbit-studio][data-mobile="true"] .orbit-studio-primary:active { background: #1c2e25; box-shadow: none; }
[data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-panel > .orbit-studio-empty { grid-column: 1 / -1; padding: 12px 0; }
@container orbit-studio-mobile (max-height: 560px) and (max-aspect-ratio: 1/1) {
    [data-orbit-studio][data-mobile="true"] .orbit-studio-brand { width: 116px; }
    [data-orbit-studio][data-mobile="true"] .orbit-studio-body { gap: 4px; }
    [data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-panel { grid-template-columns: minmax(0,1.5fr) minmax(0,1fr); grid-template-rows: auto minmax(0,1fr); gap: 4px 8px; height: 100%; max-height: 220px; }
    [data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-panel > .orbit-studio-heading { grid-column: 2; grid-row: 1; align-self: end; }
    [data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-plan { grid-column: 1; grid-row: 1 / span 2; }
    [data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-plan-button { max-height: 100%; }
    [data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-summary { grid-column: 2; grid-row: 2; }
    [data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-summary { gap: 2px; }
    [data-orbit-studio][data-mobile="true"] .orbit-studio-heading { display: flex; align-items: center; gap: 6px; flex-wrap: nowrap; }
    [data-orbit-studio][data-mobile="true"] .orbit-studio-id { font-size: 20px; margin: 0; }
    [data-orbit-studio][data-mobile="true"] .orbit-studio-status { font-size: 8.5px; gap: 4px; white-space: nowrap; }
    [data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-metrics { gap: 2px; }
    [data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-metrics > div:first-child dd { font-size: 18px; }
    [data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-metrics dt { font-size: 9px; }
    [data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-metrics dd { font-size: 12px; }
    [data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-actions { padding-top: 2px; }
    [data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-actions .orbit-studio-bottom { gap: 3px; }
    [data-orbit-studio][data-mobile="true"] .orbit-studio-price-value { font-size: 16px; }
    [data-orbit-studio][data-mobile="true"] .orbit-studio-primary { padding-inline: 9px; font-size: 11px; }
}
@container orbit-studio-mobile (max-height: 480px) and (min-aspect-ratio: 4/3) {
    [data-orbit-studio][data-mobile="true"][data-orbit-glass-tone="paper"] > :is([data-orbit-filters][data-presentation],[data-orbit-group]),
    [data-orbit-studio][data-mobile="true"][data-orbit-glass-tone="paper"] .orbit-studio-mobile-panel { width: 100%; }
    [data-orbit-studio][data-mobile="true"] .orbit-studio-brand { width: 110px; }
    [data-orbit-studio][data-mobile="true"] .orbit-studio-body { grid-template-columns: minmax(0,1.1fr) minmax(0,1fr); grid-template-rows: minmax(0,1fr); column-gap: 18px; }
    [data-orbit-studio][data-mobile="true"] .orbit-studio-image-slot { grid-column: 1; grid-row: 1; width: 100%; height: 100%; margin: 0; aspect-ratio: auto; container-type: size; }
    [data-orbit-studio][data-mobile="true"] [data-orbit-viewport] { position: relative; inset: auto; width: min(100cqw,calc(100cqh * 1920 / 1010)); height: auto; max-height: 100%; }
    [data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-panel { grid-column: 2; grid-row: 1; grid-template-rows: auto minmax(0,1fr); gap: 4px 8px; height: 100%; }
    [data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-panel > .orbit-studio-heading { grid-column: 2; grid-row: 1; }
    [data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-plan { grid-column: 1; grid-row: 1 / span 2; }
    [data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-summary { grid-column: 2; grid-row: 2; gap: 3px; }
    [data-orbit-studio][data-mobile="true"] .orbit-studio-id { font-size: 22px; }
    [data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-metrics { gap: 4px; }
    [data-orbit-studio][data-mobile="true"] .orbit-studio-mobile-metrics > div:first-child dd { font-size: 19px; }
    [data-orbit-studio][data-mobile="true"] .orbit-studio-price-value { font-size: 17px; }
    [data-orbit-studio][data-mobile="true"] .orbit-studio-primary { padding-inline: 14px; }
}
@media (prefers-reduced-motion: reduce) {
    [data-orbit-studio][data-mobile="true"] .orbit-studio-primary,
    [data-orbit-studio] [data-orbitdata-transition] { transition: none; }
}
@container orbit-studio-mobile (max-width: 340px) {
    [data-orbit-studio][data-mobile="true"] .orbit-studio-heading { gap: 5px; }
    [data-orbit-studio][data-mobile="true"] .orbit-studio-id { font-size: 20px; }
    [data-orbit-studio][data-mobile="true"] .orbit-studio-status { font-size: 8.5px; gap: 3px; }
    [data-orbit-studio][data-mobile="true"] .orbit-studio-status-dot { width: 5px; height: 5px; }
}
`

const orbitWindowRadius = 19
const orbitBlueBackdrop = "#d4dee4"
// Soft silver-blue light falls from the top left across one continuous surface.
// Brightness decreases toward the bottom right instead of forming a white centre band.
const orbitBlueGradient = `radial-gradient(ellipse 110% 100% at 0% 0%, rgb(255 255 255 / 38%), transparent 72%),
    linear-gradient(135deg, #f3f6f8 0%, #e2eaf0 42%, #d4dee4 68%, #c7d5df 100%)`

const orbitBlueWatermark = "url(\"data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201778%201312%22%3E%3Cpath%20fill%3D%22%2370889a%22%20fill-opacity%3D%22.07%22%20fill-rule%3D%22evenodd%22%20d%3D%22M0%20994C0.6%20980.2%202.6%20966.6%205%20953C7%20941.9%209.6%20930.8%2013%20920C17.3%20906.4%2022.4%20893.1%2028%20880C31.7%20871.4%2036.3%20863.1%2041%20855C46%20846.4%2051.2%20838%2057%20830C64.5%20819.6%2072.5%20809.6%2081%20800C89.2%20790.9%2097.8%20782.1%20107%20774C118.5%20763.8%20130.3%20753.8%20143%20745C159.7%20733.4%20177%20722.5%20195%20713C213.7%20703.1%20233%20693.9%20253%20687C334.1%20659.2%20416.8%20636.5%20498%20609C536.9%20595.8%20575.1%20580.8%20613%20565C626.5%20559.4%20639.4%20552.4%20652%20545C662.8%20538.7%20673.2%20531.8%20683%20524C690.9%20517.7%20698.3%20510.6%20705%20503C711%20496.2%20716.3%20488.8%20721%20481C725.4%20473.7%20729.2%20466%20732%20458C736.2%20446.3%20739.5%20434.2%20742%20422C744.5%20409.5%20745.9%20396.7%20747%20384C748.2%20369.4%20749.1%20354.7%20749%20340C748.8%20313.3%20748%20286.6%20746%20260C745.3%20250.2%20743.3%20240.5%20741%20231C737.6%20217.2%20734.2%20203.3%20729%20190C723.1%20174.9%20716.4%20159.9%20708%20146C699.3%20131.5%20689%20117.9%20678%20105C669.9%2095.5%20660.6%2087%20651%2079C640.9%2070.6%20630.1%2063%20619%2056C608.8%2049.6%20598%2044%20587%2039C577.3%2034.6%20566.6%2032.5%20557%2028C555.1%2027.1%20553.8%2025%20553%2023C552%2020.5%20551.6%2017.7%20552%2015C552.3%2012.5%20553.5%2010.1%20555%208C556.3%206.3%20557.9%204.2%20560%204C595.9%201.5%20632%200.6%20668%200C693.7%20-0.4%20719.4%20-0.5%20745%201C765.4%202.2%20785.9%204.2%20806%208C825%2011.6%20843.5%2017.3%20862%2023C869.6%2025.3%20876.9%2028.5%20884%2032C894.6%2037.2%20905.3%2042.3%20915%2049C930%2059.4%20944.7%2070.4%20958%2083C970.9%2095.2%20982.5%20108.7%20993%20123C1003.6%20137.5%201011.2%20154%201021%20169C1022.5%20171.4%201024.3%20174.3%201027%20175C1030%20175.8%201033.8%20175.1%201036%20173C1047.1%20162.4%201055.2%20148.9%201066%20138C1081.9%20121.9%201098.5%20106.4%201116%2092C1129.3%2081%201143.5%2071.3%201158%2062C1168.9%2055%201180.2%2048.4%201192%2043C1209.6%2035%201227.6%2028%201246%2022C1258.4%2018%201271.2%2015.2%201284%2013C1300.2%2010.2%201316.6%208.3%201333%207C1353.3%205.3%201373.6%204.5%201394%204L1457%204C1480.1%205%201503.1%206.9%201526%2010C1542.8%2012.3%201559.6%2015.6%201576%2020C1593%2024.6%201609.8%2030.2%201626%2037C1639.9%2042.9%201653.2%2050.1%201666%2058C1675.9%2064.1%201685.4%2071.1%201694%2079C1705.1%2089.2%201715.8%20100.1%201725%20112C1733.9%20123.5%201741.7%20135.9%201748%20149C1755.4%20164.4%201761.4%20180.5%201766%20197C1770.8%20214%201774.3%20231.4%201776%20249C1778.3%20272.2%201779%20295.7%201778%20319C1777.3%20335.8%201774.5%20352.5%201771%20369C1767.8%20384%201763.5%20398.7%201758%20413C1751.8%20428.8%201744.6%20444.4%201736%20459C1726.9%20474.5%201716.5%20489.2%201705%20503C1693.7%20516.6%201681.4%20529.5%201668%20541C1650.7%20555.9%201631.8%20568.9%201613%20582C1605.4%20587.3%201597.3%20591.8%201589%20596C1571.6%20604.8%201554.5%20614.6%201536%20621C1448.7%20651.3%201359.8%20677%201272%20706C1249.8%20713.3%201227.8%20721.5%201206%20730C1189.5%20736.5%201173%20743.3%201157%20751C1142.6%20757.9%201128.5%20765.5%201115%20774C1104.8%20780.5%201094.9%20787.8%201086%20796C1077.5%20803.8%201069.8%20812.6%201063%20822C1057.4%20829.7%201053%20838.3%201049%20847C1045.7%20854.1%201043.1%20861.5%201041%20869C1038%20879.8%201035.3%20890.8%201034%20902C1031.3%20926.2%201029.3%20950.6%201029%20975C1028.7%201000.7%201028.9%201026.5%201032%201052C1034.6%201073%201039.5%201093.8%201046%201114C1051.2%201130.3%201058.4%201146.1%201067%201161C1076.2%201176.9%201087.2%201191.9%201099%201206C1107.6%201216.3%201117.7%201225.3%201128%201234C1137.1%201241.7%201146.8%201248.8%201157%201255C1169.2%201262.5%201182%201269.1%201195%201275C1203.4%201278.8%201212.7%201280.1%201221%201284C1222.9%201284.9%201224.3%201287%201225%201289C1226%201291.8%201226.2%201295%201226%201298C1225.9%201299.8%201225.2%201301.7%201224%201303C1221.8%201305.5%201219.3%201308.7%201216%201309C1184.8%201311.8%201153.3%201311.7%201122%201312C1091%201312.3%201060%201312.5%201029%201311C1011.2%201310.1%20993.5%201308.3%20976%201305C956.4%201301.3%20936.8%201296.8%20918%201290C899.9%201283.4%20882.4%201275%20866%201265C851%201255.9%20837%201244.8%20824%201233C811.9%201222.1%20801.4%201209.5%20791%201197C783.7%201188.2%20777.1%201178.7%20771%201169C765.1%201159.7%20761.1%201149.2%20755%201140C753.9%201138.4%20751.9%201137.3%20750%201137C748%201136.6%20745.5%201136.6%20744%201138C734.5%201147.2%20727.1%201158.4%20718%201168C705.8%201180.8%20693.3%201193.3%20680%201205C666.3%201217%20652.2%201228.9%20637%201239C618.1%201251.6%20598.3%201262.9%20578%201273C564.6%201279.6%20550.4%201285%20536%201289C514%201295.1%20491.6%201300%20469%201303C443.2%201306.4%20417%201307.4%20391%201308C359.7%201308.7%20328.3%201308.5%20297%201307C279.2%201306.2%20261.6%201303.7%20244%201301C230.9%201299%20217.8%201296.5%20205%201293C188.4%201288.5%20171.9%201283.5%20156%201277C141.8%201271.2%20127.9%201264.3%20115%201256C101.2%201247.2%2087.9%201237.2%2076%201226C65.2%201215.8%2055.4%201204.3%2047%201192C38%201178.8%2030.2%201164.7%2024%201150C17.1%201133.6%2012.1%201116.3%208%201099C4.4%201083.9%202.2%201068.5%201%201053C-0.5%201033.4%20-0.8%201013.7%200%20994ZM269%20984C268.1%20998.6%20268.9%201013.4%20270%201028C271.2%201043.4%20273.3%201058.8%20276%201074C278.3%201086.8%20281.3%201099.5%20285%201112C288.6%201124.2%20293%201136.3%20298%201148C302.3%201158%20307.3%201167.7%20313%201177C318.4%201185.8%20324.4%201194.1%20331%201202C336.8%201208.9%20343.1%201215.3%20350%201221C357.2%201227%20364.7%201232.7%20373%201237C383.8%201242.7%20395.3%201247.3%20407%201251C415.4%201253.7%20424.2%201255.1%20433%201256C444.6%201257.1%20456.3%201257.5%20468%201257C479.7%201256.5%20491.5%201255.2%20503%201253C515.5%201250.6%20528%201247.4%20540%201243C553.4%201238.1%20566.4%201231.7%20579%201225C587.7%201220.4%20596%201214.8%20604%201209C613%201202.5%20622%201195.8%20630%201188C643.4%201175%20656.5%201161.7%20668%201147C680.6%201130.9%20691.9%201113.8%20702%201096C711.6%201079%20720.1%201061.3%20727%201043C733.5%201025.8%20741.2%201008.3%20742%20990C748.3%20837.1%20747.7%20684%20748%20531C748%20528.9%20745.1%20527.5%20743%20527C740.4%20526.4%20737.1%20526.4%20735%20528C722.5%20537.6%20712.3%20550.1%20700%20560C679.6%20576.4%20658.5%20592.1%20637%20607C616.2%20621.4%20594.7%20634.9%20573%20648C527.6%20675.5%20481.2%20701.3%20436%20729C422.5%20737.3%20409.7%20746.5%20397%20756C386%20764.2%20375%20772.6%20365%20782C350.9%20795.3%20337.7%20809.4%20325%20824C319.3%20830.5%20314.5%20837.7%20310%20845C304.2%20854.4%20298.2%20863.8%20294%20874C286.9%20891.2%20280.1%20908.8%20276%20927C271.8%20945.7%20270.1%20964.9%20269%20984ZM1029%20772C1029%20775.7%201028.4%20780.4%201031%20783C1033.6%20785.6%201038.9%20787.1%201042%20785C1056.9%20775%201068.1%20760.3%201082%20749C1099.8%20734.6%201118.2%20721%201137%20708C1159.9%20692.3%201183.3%20677.4%201207%20663C1243.3%20641%201280.7%20621%201317%20599C1334.7%20588.3%201352%20576.9%201369%20565C1381.1%20556.5%201392.8%20547.5%201404%20538C1415.1%20528.5%201425.9%20518.6%201436%20508C1444.6%20498.9%201452.6%20489.1%201460%20479C1466.3%20470.4%201472.1%20461.5%201477%20452C1483.8%20438.7%201490.6%20425.3%201495%20411C1500.6%20392.8%201504.6%20373.9%201507%20355C1509.3%20337.1%201509.8%20319%201509%20301C1508.1%20279.9%201505.9%20258.8%201502%20238C1498.2%20218%201492.6%20198.3%201486%20179C1481.6%20166.2%201475.7%20153.8%201469%20142C1462.3%20130.4%201454.3%20119.5%201446%20109C1441.3%20103.1%201435.8%2097.9%201430%2093C1423.1%2087.2%201416%2081.3%201408%2077C1395.9%2070.5%201383.3%2064.6%201370%2061C1355.7%2057.2%201340.8%2055.3%201326%2055C1309.6%2054.6%201293.1%2055.9%201277%2059C1259.6%2062.3%201242.5%2067.5%201226%2074C1212%2079.5%201198.6%2086.8%201186%2095C1171.5%20104.5%201157.7%20115.1%201145%20127C1131.2%20139.9%201118.5%20154%201107%20169C1095.1%20184.5%201084.4%20200.9%201075%20218C1065.4%20235.4%201057.6%20253.7%201050%20272C1046.2%20281.1%201043.5%20290.5%201041%20300C1038.4%20309.9%201035.3%20319.8%201035%20330C1031.3%20477.3%201030.3%20624.7%201029%20772Z%22%2F%3E%3C%2Fsvg%3E\")"

/**
 * One decorative paint layer for the whole homepage, below the sequences and orbit.
 * @framerSupportedLayoutWidth any-prefer-fixed
 * @framerSupportedLayoutHeight any-prefer-fixed
 * @framerIntrinsicWidth 1440
 * @framerIntrinsicHeight 1800
 */
export function OrbitPageBackdrop({ style }: { style?: React.CSSProperties }): React.JSX.Element {
    return <div
        data-orbit-page-backdrop=""
        aria-hidden="true"
        style={{
            width: "100%", height: "100%", ...style,
            pointerEvents: "none",
            backgroundColor: orbitBlueBackdrop,
            backgroundImage: `${orbitBlueWatermark}, ${orbitBlueGradient}`,
            backgroundPosition: "54% 53%, 0 0, 0 0",
            backgroundSize: "cover, 100% 100%, 100% 100%",
            backgroundRepeat: "no-repeat",
            "--orbit-filter-steel": `color-mix(in srgb, ${orbitBlueBackdrop} 85%, #617580)`,
        } as React.CSSProperties}
    />
}
OrbitPageBackdrop.displayName = "Orbit Page Background"

const orbitBlueStudioStyles = `
[data-orbit-blue] {
    --orbit-panel: linear-gradient(rgb(6 21 34 / 6%), rgb(6 21 34 / 6%)), ${admiralPalette.panelGradient};
    --orbit-on-panel: ${admiralPalette.onPanel};
    --orbit-paper: ${admiralPalette.paper};
    --orbit-accent: ${admiralPalette.accent};
    --orbit-panel-rule: rgb(255 255 255 / 30%);
    --orbit-panel-sheen: linear-gradient(145deg, rgb(8 30 48 / 7%), rgb(8 30 48 / 18%));
}
[data-orbit-studio] {
    --orbit-light-glass: ${admiralPalette.lightGlassFallback};
    --orbit-light-glass-blur: none;
}
@supports ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
    [data-orbit-studio] {
        --orbit-light-glass: ${admiralPalette.lightGlass};
        --orbit-light-glass-blur: ${admiralPalette.lightGlassBlur};
    }
}
@media (prefers-reduced-transparency: reduce) {
    [data-orbit-studio] {
        --orbit-light-glass: ${admiralPalette.lightGlassFallback};
        --orbit-light-glass-blur: none;
    }
}
[data-orbit-studio][data-active="false"] { --orbit-light-glass-blur: none; }
[data-orbit-blue] [data-orbit-studio][data-layout="workspace"] [data-orbit-control-band] {
    background: transparent; box-shadow: none;
}
[data-orbit-blue] [data-orbit-studio][data-mobile="false"][data-layout="workspace"] {
    --workspace-ink: var(--orbit-on-panel);
    --workspace-muted: var(--orbit-on-panel);
    --workspace-rule: var(--orbit-panel-rule);
    --studio-muted: var(--orbit-on-panel);
    --workspace-glass: var(--orbit-panel);
    --workspace-control-fill: var(--orbit-panel);
}
[data-orbit-blue] [data-orbit-studio] :is([data-orbit-detail-bar], [data-orbit-plan-bar], .orbit-studio-mobile-panel) {
    --orbit-on-panel: var(--orbit-accent);
    --orbit-panel-rule: color-mix(in srgb, var(--orbit-accent) 22%, transparent);
    --studio-ink: var(--orbit-accent);
    --studio-muted: ${admiralPalette.secondary};
    --studio-line: var(--orbit-panel-rule);
    --workspace-ink: var(--studio-ink);
    --workspace-muted: var(--studio-muted);
    --workspace-rule: var(--studio-line);
    color: var(--studio-ink);
}
[data-orbit-blue] [data-orbit-studio][data-layout="workspace"] [data-orbit-list-filters] {
    position: relative; isolation: isolate;
    box-sizing: border-box; align-content: center;
    color: var(--orbit-on-panel); padding: 6px clamp(10px,1.4vw,24px);
}
/* The painted surface follows the allocated track, including its padding. */
[data-orbit-blue] [data-orbit-list-filters]::before {
    content: ""; position: absolute; z-index: -1; inset: 0;
    pointer-events: none; border-radius: 23px; background: var(--orbit-panel);
    box-shadow: var(--workspace-shadow); border: 1px solid var(--orbit-panel-rule);
}
[data-orbit-blue] [data-orbit-list-filters] .orbit-list-primary {
    background: var(--orbit-panel-sheen); color: var(--orbit-on-panel);
    border-color: var(--orbit-panel-rule); box-shadow: none;
}
[data-orbit-blue] [data-orbit-list-filters] .orbit-list-field + .orbit-list-field { border-color: var(--orbit-panel-rule); }
[data-orbit-blue] [data-orbit-list-filters] .orbit-list-field label,
[data-orbit-blue] [data-orbit-studio] [data-orbit-list-filters] .orbit-list-field :is(input,select),
[data-orbit-blue] [data-orbit-list-filters] input::placeholder,
[data-orbit-blue] [data-orbit-list-filters] .orbit-list-range :is(legend,output),
[data-orbit-blue] [data-orbit-studio][data-layout="workspace"] [data-orbit-list-filters] :is([data-orbit-filter-count],[data-orbit-filter-reset]) { color: var(--orbit-on-panel); }
[data-orbit-blue] [data-orbit-list-filters] .orbit-list-field option { color: var(--orbit-accent); background: var(--orbit-paper); }
[data-orbit-blue] [data-orbit-list-filters] .orbit-list-rail { background: var(--orbit-panel-rule); }
[data-orbit-blue] [data-orbit-list-filters] .orbit-list-rail > span { background: var(--orbit-on-panel); }
[data-orbit-blue] [data-orbit-studio][data-layout="workspace"] [data-orbit-list-filters] [data-orbit-filter-status],
[data-orbit-blue] [data-orbit-studio][data-mobile="true"][data-orbit-glass-tone="paper"] > [data-orbit-filters][data-presentation] :is([data-orbit-filter-status],[data-orbit-range-toggle],[data-orbit-filter-reset]) {
    color: var(--orbit-on-panel); border-color: var(--orbit-panel-rule); background: var(--orbit-panel-sheen); box-shadow: none;
}
[data-orbit-blue] [data-orbit-studio][data-layout="workspace"] [data-orbit-list-filters] [data-orbit-filter-status][aria-pressed="true"],
[data-orbit-blue] [data-orbit-studio][data-mobile="true"][data-orbit-glass-tone="paper"] > [data-orbit-filters][data-presentation] :is([aria-pressed="true"],[data-filtered="true"][data-orbit-range-toggle],[aria-expanded="true"][data-orbit-range-toggle]) {
    background: var(--orbit-paper); color: var(--orbit-accent); border-color: var(--orbit-paper);
}
[data-orbit-blue] [data-orbit-studio] .orbit-studio-plan-crop { border-radius: 4px; }
[data-orbit-blue] [data-orbit-studio][data-layout="workspace"] .orbit-studio-status {
    color: var(--orbit-on-panel); background: color-mix(in srgb, var(--orbit-accent) 5%, var(--orbit-paper)); border-color: var(--orbit-panel-rule);
}
[data-orbit-blue] [data-orbit-studio] .orbit-studio-status[data-status="available"] .orbit-studio-status-dot { background: var(--orbit-available-color,#46A66A); }
[data-orbit-blue] [data-orbit-studio] .orbit-studio-status:is([data-status="under_negotiation"],[data-status="reserved"]) .orbit-studio-status-dot { background: var(--orbit-negotiation-color,#E2B849); }
[data-orbit-blue] [data-orbit-studio] .orbit-studio-status[data-status="sold"] .orbit-studio-status-dot { background: var(--orbit-sold-color,#DA5961); }
[data-orbit-blue] [data-orbit-studio][data-layout="workspace"] [data-orbit-plan-actions] :is([data-orbit-favorite],[data-orbit-detail-link]) { color: var(--orbit-on-panel); }
[data-orbit-blue] [data-orbit-studio][data-layout="workspace"] [data-orbit-plan-actions] [data-orbit-favorite][aria-pressed="true"] { color: var(--orbit-on-panel); }
[data-orbit-blue] [data-orbit-studio][data-layout="workspace"] .orbit-studio-primary.admiral-frosted-button[data-orbit-inquiry] {
    color: var(--orbit-paper); background: ${admiralPalette.inquiryGradient}; border-color: var(--orbit-panel-rule);
}
[data-orbit-blue] [data-orbit-studio][data-mobile="true"][data-orbit-glass-tone="paper"] > [data-orbit-filters][data-presentation][data-active] {
    --studio-ink: var(--orbit-on-panel); --studio-muted: var(--orbit-on-panel); --studio-line: var(--orbit-panel-rule);
    color: var(--orbit-on-panel); background: var(--orbit-panel); border-color: var(--orbit-panel-rule);
}
[data-orbit-blue] [data-orbit-studio][data-mobile="true"][data-orbit-glass-tone="paper"] .orbit-studio-mobile-panel {
    border-radius: 19px; padding-inline: clamp(6px,2cqw,12px);
}
[data-orbit-blue] [data-orbit-studio][data-mobile="true"] :is(.orbit-studio-mobile-metrics dd,.orbit-studio-status-text) { color: var(--orbit-on-panel); }
[data-orbit-blue] [data-orbit-studio][data-mobile="true"][data-orbit-glass-tone="paper"] .orbit-studio-mobile-summary { padding-block: 7px; }
[data-orbit-blue] [data-orbit-studio][data-mobile="true"] .orbit-studio-price { container-type: inline-size; }
[data-orbit-blue] [data-orbit-studio][data-mobile="true"][data-orbit-glass-tone="paper"] .orbit-studio-price-value {
    font-size: 15px;
    font-size: clamp(11px,12.6cqi,21px);
}
[data-orbit-blue] [data-orbit-studio][data-mobile="true"][data-orbit-glass-tone="paper"] :is(.orbit-studio-mobile-identity,.orbit-studio-price) { border-color: var(--orbit-panel-rule); }
[data-orbit-blue] [data-orbit-studio][data-mobile="true"][data-orbit-glass-tone="paper"] > [data-orbit-filters] [data-orbit-filter-row] { border-bottom-color: var(--orbit-panel-rule); }
[data-orbit-blue] [data-orbit-studio][data-mobile="true"] [data-orbit-range-popover] {
    color: var(--orbit-accent); background: var(--orbit-paper); border-radius: 12px;
}
[data-orbit-blue] [data-orbit-studio][data-mobile="true"] [data-orbit-range-popover] .orbit-filter-price-caption { color: var(--orbit-accent); }
[data-orbit-blue] [data-orbit-studio][data-mobile="true"][data-orbit-glass-tone="paper"] .orbit-studio-primary { color: var(--orbit-accent); background: var(--orbit-paper); border-color: var(--orbit-panel-rule); }
[data-admiral-homepage][data-orbit-blue] [data-orbit-group] {
    color: var(--orbit-on-panel); background: var(--orbit-panel); border-color: var(--orbit-panel-rule);
}
[data-admiral-homepage][data-orbit-blue] [data-orbit-group] button { border-color: var(--orbit-panel-rule); }
[data-admiral-homepage][data-orbit-blue] [data-orbit-group] button[data-visible="true"] { border-color: var(--orbit-on-panel); }
[data-admiral-homepage][data-orbit-blue] [data-orbit-group] button[aria-pressed="true"] { background: var(--orbit-accent); }
@media (hover: hover) {
    [data-orbit-blue] [data-orbit-studio][data-layout="workspace"] [data-orbit-list-filters] [data-orbit-filter-status]:not([aria-pressed="true"]):not(:disabled):hover,
    [data-orbit-blue] [data-orbit-studio][data-mobile="true"][data-orbit-glass-tone="paper"] > [data-orbit-filters][data-presentation] :is([data-orbit-filter-status],[data-orbit-range-toggle]):not(:disabled):not([aria-pressed="true"]):not([aria-expanded="true"]):not([data-filtered="true"]):hover,
    [data-admiral-homepage][data-orbit-blue] [data-orbit-group] button:not([data-visible="true"]):not([aria-pressed="true"]):hover {
        background: var(--orbit-accent); color: var(--orbit-on-panel); border-color: var(--orbit-on-panel);
    }
    [data-orbit-blue] [data-orbit-studio][data-layout="workspace"] .orbit-studio-plan-workspace[data-orbit-plan-openable="true"]:hover [data-orbit-plan-actions] :is([data-orbit-detail-link],[data-orbit-favorite]) { color: var(--orbit-on-panel); }
    [data-orbit-blue] [data-orbit-studio][data-layout="workspace"] .orbit-studio-primary.admiral-frosted-button[data-orbit-inquiry]:not([aria-disabled="true"]):not(:disabled):hover {
        background: var(--orbit-paper); color: var(--orbit-accent); border-color: var(--orbit-accent);
    }
}
[data-orbit-blue] [data-orbit-studio][data-layout="workspace"] :is([data-orbit-plan-actions],[data-orbit-list-filters]) :is(button,select,input,a):focus-visible,
[data-orbit-blue] [data-orbit-studio][data-layout="workspace"] .orbit-studio-plan-content[role="button"]:focus-visible,
[data-orbit-blue] [data-orbit-studio][data-mobile="true"] [data-orbit-filters] button:focus-visible,
[data-admiral-homepage][data-orbit-blue] [data-orbit-group] button:focus-visible { outline: 2px solid var(--orbit-on-panel); outline-offset: 2px; }

/* The film, orbit and mask canvases are siblings of the studio. Leave their
   aperture clear while painting the connected glass surface around it. */
[data-orbit-studio] [data-orbit-housing] {
    position: relative;
    --housing-radius: ${orbitWindowRadius}px;
    --housing-rule: ${admiralPalette.lightGlassDivider};
    border-radius: var(--housing-radius);
    pointer-events: none;
}
[data-orbit-housing]::before, [data-orbit-housing]::after {
    content: ""; position: absolute; inset: 0; border-radius: inherit; pointer-events: none;
}
[data-orbit-housing]::before {
    background: var(--orbit-light-glass);
    -webkit-backdrop-filter: var(--orbit-light-glass-blur); backdrop-filter: var(--orbit-light-glass-blur);
}
[data-orbit-housing]::after { border: 1px solid ${admiralPalette.lightGlassRim}; box-shadow: ${admiralPalette.lightGlassShadow}; z-index: 1; }
[data-orbit-studio][data-layout="workspace"] [data-orbit-housing] {
    /* Keep the existing camera width and use the former inter-card gaps inside the housing. */
    --housing-image: calc((100% - var(--workspace-rail) - var(--workspace-gap)) * 2 * var(--studio-orbit-scale) / (1 + var(--studio-orbit-scale)));
    --housing-summary: calc(var(--workspace-summary) + var(--workspace-row-gap));
    display: grid; grid-area: 3 / 1 / 6 / -1; gap: 0;
    grid-template-columns: var(--housing-image) minmax(0,1fr);
    grid-template-rows: auto var(--housing-summary);
    margin-inline-start: calc((100% - var(--workspace-rail) - var(--workspace-gap)) * (1 - var(--studio-orbit-scale)) / 2);
}
[data-orbit-studio][data-layout="workspace"] [data-orbit-housing]::before {
    clip-path: polygon(var(--housing-image) 0, 100% 0, 100% 100%, 0 100%, 0 calc(100% - var(--housing-summary)), var(--housing-image) calc(100% - var(--housing-summary)));
}
@supports (mask-composite: exclude) {
  [data-orbit-studio][data-layout="workspace"] [data-orbit-housing]::before {
    /* Mask the glass with a rounded aperture. With no viewBox the SVG radius
       stays in CSS pixels as the camera's aspect-preserving grid cell resizes. */
    clip-path: none;
    mask: linear-gradient(#000 0 0), url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' rx='${orbitWindowRadius}'/%3E%3C/svg%3E") 0 0 / var(--housing-image) calc(100% - var(--housing-summary)) no-repeat;
    mask-composite: exclude;
  }
}
[data-orbit-studio][data-layout="workspace"] [data-orbit-housing]::after {
    /* Only the floor plan and detail bar need the shared outer rim here. */
    clip-path: polygon(var(--housing-image) -20px, calc(100% + 20px) -20px, calc(100% + 20px) calc(100% + 20px), -20px calc(100% + 20px), -20px calc(100% - var(--housing-summary)), var(--housing-image) calc(100% - var(--housing-summary)));
}
[data-orbit-studio][data-layout="workspace"] [data-orbit-housing] .orbit-studio-scene { grid-area: 1 / 1; }
[data-orbit-studio] [data-orbit-housing] .orbit-studio-scene { position: relative; z-index: 4; pointer-events: none; }
[data-orbit-studio][data-layout="workspace"] [data-orbit-housing] .orbit-studio-image-slot { width: 100%; }
[data-orbit-studio] [data-orbit-housing] [data-orbit-viewport] {
    border: 0; border-radius: var(--housing-radius);
    box-shadow: inset 0 0 0 1px var(--housing-rule), 0 3px 10px -3px rgb(17 47 63 / 26%);
}
[data-orbit-studio][data-layout="workspace"] [data-orbit-detail-bar] {
    grid-area: 2 / 1; width: 100%; border: 0; border-inline-end: 1px solid var(--housing-rule);
    border-radius: 0 0 0 var(--housing-radius); box-shadow: none; background: ${admiralPalette.lightGlassInset};
    container: orbit-apartment-strip / inline-size;
    grid-template-columns: max-content minmax(0,1fr) max-content;
}
[data-orbit-studio][data-layout="workspace"] [data-orbit-detail-bar] .orbit-studio-areas > div {
    flex: 1 0 max-content; min-width: max-content;
}
/* On short desktop windows the image can be much narrower than the screen. */
@container orbit-apartment-strip (max-width: 660px) {
    [data-orbit-detail-bar] .orbit-studio-heading { grid-area: 1 / 1; align-self: end; }
    [data-orbit-studio][data-layout="workspace"] [data-orbit-detail-bar] .orbit-studio-id { font-size: 24px; }
    [data-orbit-studio][data-layout="workspace"] [data-orbit-detail-bar] .orbit-studio-facts {
        grid-area: 1 / 2 / 3 / 4; padding-inline-start: clamp(8px,2cqw,14px);
    }
    [data-orbit-studio][data-layout="workspace"] [data-orbit-detail-bar] .orbit-studio-apartment-footer {
        grid-area: 2 / 1; align-self: start; border: 0; padding: 0;
    }
    [data-orbit-detail-bar] .orbit-studio-price > .orbit-studio-label { display: inline; margin-right: 5px; }
    [data-orbit-studio][data-layout="workspace"] [data-orbit-detail-bar] .orbit-studio-price-value { display: inline; font-size: 17px; }
    [data-orbit-studio][data-layout="workspace"] [data-orbit-detail-bar] .orbit-studio-areas dd { font-size: clamp(14px,3cqw,18px); }
    [data-orbit-studio][data-layout="workspace"] [data-orbit-detail-bar] .orbit-studio-areas > div { padding-inline: clamp(4px,1cqw,8px); }
}
[data-orbit-studio][data-layout="workspace"] [data-orbit-plan-bar] {
    grid-area: 1 / 2 / 3 / 3; border: 0;
    border-radius: 0 var(--housing-radius) var(--housing-radius) 0; box-shadow: none; background: transparent;
}
[data-orbit-studio][data-mobile="true"][data-orbit-glass-tone="paper"] [data-orbit-housing] {
    width: var(--studio-phone-frame-width); max-width: 100%; justify-self: center; gap: 0;
    grid-template-rows: auto minmax(0,1fr); overflow: visible;
}
[data-orbit-studio][data-mobile="true"] [data-orbit-housing]::before { grid-area: 2 / 1; border-radius: 0 0 var(--housing-radius) var(--housing-radius); }
[data-orbit-studio][data-mobile="true"] [data-orbit-housing]::after { grid-area: 2 / 1; border-radius: 0 0 var(--housing-radius) var(--housing-radius); border-top: 0; }
[data-orbit-studio][data-mobile="true"] [data-orbit-housing] .orbit-studio-image-slot { width: 100%; height: auto; margin: 0; }
[data-orbit-studio][data-mobile="true"][data-orbit-glass-tone="paper"] [data-orbit-housing] .orbit-studio-mobile-panel {
    position: relative; width: 100%; gap: 0; border: 0;
    border-radius: 0 0 var(--housing-radius) var(--housing-radius); background: transparent; box-shadow: none;
    padding: 0; pointer-events: auto;
}
[data-orbit-studio][data-mobile="true"] [data-orbit-housing] .orbit-studio-mobile-summary {
    padding-inline: clamp(6px,2cqw,12px); border-inline-start: 1px solid var(--housing-rule);
    background: ${admiralPalette.lightGlassInset};
}
@container orbit-studio-mobile (max-height: 480px) and (min-aspect-ratio: 4/3) {
    [data-orbit-studio][data-mobile="true"][data-orbit-glass-tone="paper"] [data-orbit-housing] {
        width: 100%; grid-template-rows: minmax(0,1fr);
    }
    [data-orbit-studio][data-mobile="true"] [data-orbit-housing]::before { grid-area: 1 / 2; border-radius: 0 var(--housing-radius) var(--housing-radius) 0; }
    [data-orbit-studio][data-mobile="true"] [data-orbit-housing]::after { grid-area: 1 / 2; border: 1px solid ${admiralPalette.lightGlassRim}; border-inline-start: 0; border-radius: 0 var(--housing-radius) var(--housing-radius) 0; }
    [data-orbit-studio][data-mobile="true"] [data-orbit-housing] .orbit-studio-image-slot {
        height: 100%;
    }
    [data-orbit-studio][data-mobile="true"][data-orbit-glass-tone="paper"] [data-orbit-housing] .orbit-studio-mobile-panel {
        border-radius: 0 var(--housing-radius) var(--housing-radius) 0;
    }
}
`

const orbitWorkspaceStyles = `
/* Equal gaps frame the divider; the orbit and its floor plan share a row. */
[data-orbit-studio][data-mobile="false"][data-layout="workspace"] {
    --workspace-top: clamp(100px, calc(11dvh + 4px), 120px);
    --workspace-bottom: clamp(16px, 3dvh, 36px);
    --workspace-edge: clamp(18px, 4.2vw, 76px);
    --workspace-gap: clamp(12px, 1.65vw, 28px);
    --workspace-row-gap: 16px;
    --workspace-toolbar: 150px;
    --workspace-summary: 78px;
    --workspace-plan-inset: clamp(12px,1.24vw,20px);
    --studio-orbit-scale: .94;
    --workspace-divider-track: calc(2 * var(--workspace-row-gap) + 1px);
    --workspace-max: 1600px;
    --workspace-rail: clamp(264px, 25vw, 380px);
    --workspace-content-height: calc(var(--studio-host-height,100dvh) - var(--workspace-top) - var(--workspace-bottom) - var(--workspace-toolbar) - var(--workspace-divider-track) - var(--workspace-row-gap) - var(--workspace-summary));
    --workspace-image-limit: calc(var(--workspace-content-height) * 1920 / 1010 / var(--studio-orbit-scale));
    --workspace-ink: #183139;
    --workspace-muted: #536b74;
    --workspace-rule: rgba(43, 72, 82, .16);
    --workspace-glass: linear-gradient(145deg, rgba(255,255,255,.93), rgba(255,255,255,.33) 56%, rgba(249,253,255,.72)), rgba(218,232,237,.54);
    --workspace-control-fill: linear-gradient(145deg, rgba(247, 251, 255, 0.96) 0%, rgba(216, 233, 247, 0.93) 55%, rgba(237, 246, 253, 0.96) 100%);
    --workspace-shadow: 0 7px 18px rgba(9, 44, 92, 0.22), 0 2px 5px rgba(13, 62, 125, 0.14);
    --workspace-button: linear-gradient(145deg, rgba(255,255,255,.91), rgba(255,255,255,.24) 56%, rgba(255,255,255,.66)), #dce8ed;
    inset: var(--workspace-top) 0 var(--workspace-bottom);
    width: min(calc(100% - 2 * var(--workspace-edge)), var(--workspace-max), calc(var(--workspace-image-limit) + var(--workspace-rail) + var(--workspace-gap)));
    height: max-content;
    margin: 0 auto;
    padding: 0;
    display: grid;
    grid-template-columns: minmax(0,1fr) var(--workspace-rail);
    grid-template-rows: var(--workspace-toolbar) var(--workspace-divider-track) auto var(--workspace-row-gap) var(--workspace-summary);
    column-gap: var(--workspace-gap);
    row-gap: 0;
    color: var(--workspace-ink);
    background: transparent;
    overflow: visible;
    pointer-events: none;
}
[data-orbit-studio][data-layout="workspace"][data-active="true"] { z-index: 4; }
[data-orbit-studio][data-layout="workspace"] [data-orbit-control-band] {
    --orbit-filter-steel: color-mix(in srgb, ${orbitBlueBackdrop} 85%, #617580);
    position: absolute; grid-column: 1 / -1; grid-row: 1 / 3; z-index: 1;
    inset-block: calc(-1 * var(--workspace-top)) var(--workspace-row-gap);
    inset-inline-start: 50%; width: var(--studio-host-width,100vw); transform: translateX(-50%);
    background-color: ${orbitBlueBackdrop}; background-image: ${orbitBlueWatermark}, ${orbitBlueGradient};
    background-position: 54% 53%,0 0,0 0;
    background-size: clamp(930px,100%,1780px) auto,100% 100%,100% 100%;
    background-repeat: no-repeat;
    box-shadow: 0 7px 18px rgba(9,44,92,.24);
    pointer-events: none;
}
[data-orbit-studio][data-layout="workspace"] .orbit-studio-body { display: contents; }
[data-orbit-studio][data-layout="workspace"] .orbit-studio-header {
    display: block; grid-column: 1 / -1; grid-row: 1;
    align-self: stretch; min-width: 0; min-height: 0; z-index: 6;
    margin-inline-start: calc((100% - var(--workspace-rail) - var(--workspace-gap)) * (1 - var(--studio-orbit-scale)) / 2);
}
[data-orbit-studio][data-layout="workspace"] .orbit-studio-brand,
[data-orbit-studio][data-layout="workspace"] .orbit-studio-header-end { display: none; }
[data-orbit-studio][data-layout="workspace"] :is(.orbit-studio-header,.orbit-studio-summary) { min-width: 0; }
[data-orbit-studio][data-layout="workspace"] [data-orbit-studio-filters] { width: 100%; height: 100%; }
[data-orbit-studio][data-layout="workspace"] .orbit-studio-scene {
    display: block; grid-column: 1; grid-row: 3; align-self: start; z-index: 0; min-width: 0; min-height: 0;
}
[data-orbit-studio][data-layout="workspace"] .orbit-studio-image-slot {
    display: block; container-type: normal; width: calc(100% * var(--studio-orbit-scale));
    margin-inline: auto; aspect-ratio: 1920 / 1010;
}
[data-orbit-studio][data-layout="workspace"] [data-orbit-viewport] {
    width: 100%; height: 100%; max-width: none; max-height: none; transform: none;
    border-radius: 21px; box-shadow: var(--workspace-shadow);
}
[data-orbit-studio][data-layout="workspace"][data-active="true"] :is(.orbit-studio-header,.orbit-studio-plan-workspace,.orbit-studio-summary) { pointer-events: auto; }
[data-orbit-studio][data-layout="workspace"] [data-orbit-plan-actions] {
    display: flex; align-items: center; justify-content: flex-end; gap: 8px;
    margin-inline-start: auto;
}
[data-orbit-studio][data-layout="workspace"][data-active="true"]:has([data-orbit-range-popover]:not([hidden])) { z-index: 5; }
[data-orbit-studio][data-layout="workspace"] [data-orbit-list-filters] {
    width: 100%; height: 100%; display: grid;
    grid-template-columns: minmax(105px,.85fr) minmax(0,2fr) minmax(250px,1.25fr);
    grid-template-rows: auto 48px;
    align-items: center; align-content: start; gap: 24px clamp(14px,2vw,30px);
    padding: 0; background: none; border: 0; border-radius: 0; box-shadow: none;
    color: #f8fbff; overflow: visible;
}
[data-orbit-list-filters] .orbit-list-primary {
    grid-column: 1 / -1; width: min(100%,960px); min-width: 0; justify-self: center;
    display: grid; grid-template-columns: 1.1fr repeat(4,minmax(0,1fr)); gap: 0;
    margin: 0; padding: 9px 4px; border: 1px solid rgba(248,251,255,.68); border-radius: 25px;
    background: var(--workspace-control-fill);
    box-shadow: var(--workspace-shadow); color: #364b58;
}
[data-orbit-list-filters] .orbit-list-field { min-width: 0; padding-inline: 15px; }
[data-orbit-list-filters] .orbit-list-field + .orbit-list-field { border-left: 1px solid rgba(50,79,100,.16); }
[data-orbit-list-filters] .orbit-list-field label { display: block; font-size: 12px; line-height: 1.5; color: #65747c; }
[data-orbit-studio] [data-orbit-list-filters] .orbit-list-field :is(input,select) {
    display: block; box-sizing: border-box; width: 100%; max-width: 100%; height: 28px; min-height: 0;
    padding: 0; margin: 0; border: 0; border-radius: 0; background: transparent; box-shadow: none;
    font: inherit; font-size: 14px; line-height: 1.7; color: #364b58; text-overflow: ellipsis;
}
[data-orbit-studio] [data-orbit-list-filters] .orbit-list-field select { padding-right: 3px; cursor: pointer; }
[data-orbit-list-filters] input::placeholder { color: #7a8992; opacity: 1; }
[data-orbit-list-filters] .orbit-list-feedback {
    grid-column: 1; grid-row: 2; display: flex; align-items: center; flex-wrap: wrap; gap: 7px 12px; min-width: 0;
}
[data-orbit-studio][data-layout="workspace"] [data-orbit-list-filters] [data-orbit-filter-count] {
    position: static; width: auto; height: auto; margin: 0; padding: 0; clip-path: none; white-space: nowrap;
    overflow: visible; color: #f8fbff; font-size: 14px; font-weight: 650; line-height: 1.4;
}
[data-orbit-studio] [data-orbit-list-filters] [data-orbit-filter-reset] {
    display: inline-flex; align-items: center; gap: 7px; width: auto; min-width: 0; min-height: 30px;
    padding: 4px 0; border: 0; border-radius: 0; background: none; color: #f8fbff;
    font-size: 11px; line-height: 1.3; box-shadow: none;
}
[data-orbit-list-filters] .orbit-list-ranges { grid-column: 2; grid-row: 2; display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); gap: clamp(12px,1.5vw,22px); min-width: 0; }
[data-orbit-list-filters] .orbit-list-range { min-width: 0; width: 100%; border: 0; margin: 0; padding: 0; }
[data-orbit-list-filters] .orbit-list-range legend { display: flex; justify-content: space-between; gap: 6px; width: 100%; font-size: 12px; font-weight: 550; line-height: 1.4; color: #f8fbff; }
[data-orbit-list-filters] .orbit-list-range output { white-space: nowrap; font-size: 14px; font-weight: 650; font-variant-numeric: tabular-nums; }
[data-orbit-list-filters] .orbit-list-track { position: relative; width: 100%; height: 30px; touch-action: none; }
[data-orbit-list-filters] .orbit-list-rail { position: absolute; left: 12px; right: 12px; top: 14px; height: 2px; background: rgba(248,251,255,.31); }
[data-orbit-list-filters] .orbit-list-rail > span { position: absolute; inset-block: 0; background: #d9edff; }
[data-orbit-studio] [data-orbit-list-filters] .orbit-list-track input[type="range"] {
    position: absolute; inset: 0; z-index: 1; appearance: none; -webkit-appearance: none;
    box-sizing: border-box; width: 100%; height: 30px; min-height: 0; margin: 0; padding: 0; border: 0;
    background: none; pointer-events: none; outline: none; cursor: ew-resize;
}
[data-orbit-list-filters] .orbit-list-track input[type="range"]:last-of-type { z-index: 2; }
[data-orbit-list-filters] .orbit-list-track[data-min-at-max="true"] input[type="range"]:first-of-type,
[data-orbit-list-filters] .orbit-list-track input[type="range"]:focus-visible { z-index: 3; }
[data-orbit-list-filters] .orbit-list-track input[type="range"]::-webkit-slider-runnable-track { height: 2px; border: 0; background: none; }
[data-orbit-list-filters] .orbit-list-track input[type="range"]::-webkit-slider-thumb {
    appearance: none; -webkit-appearance: none; width: 24px; height: 24px; margin-top: -11px; border: 0; border-radius: 50%;
    background: radial-gradient(circle,#fff 0 7px,#e8f2fa 7.5px 9px,rgba(29,71,107,.2) 9.5px 10px,transparent 10.5px);
    filter: drop-shadow(0 3px 3px rgba(7,23,44,.46)); pointer-events: auto; cursor: ew-resize;
}
[data-orbit-list-filters] .orbit-list-track input[type="range"]::-moz-range-track { height: 2px; border: 0; background: none; }
[data-orbit-list-filters] .orbit-list-track input[type="range"]::-moz-range-thumb {
    width: 24px; height: 24px; border: 0; border-radius: 50%; background: radial-gradient(circle,#fff 0 7px,#e8f2fa 7.5px 9px,rgba(29,71,107,.2) 9.5px 10px,transparent 10.5px);
    filter: drop-shadow(0 3px 3px rgba(7,23,44,.46)); pointer-events: auto; cursor: ew-resize;
}
[data-orbit-list-filters] .orbit-list-availability { grid-column: 3; grid-row: 2; display: flex; justify-content: flex-end; align-items: center; flex-wrap: nowrap; gap: 6px; min-width: 0; }
[data-orbit-studio][data-layout="workspace"] [data-orbit-list-filters] [data-orbit-filter-status] {
    display: inline-flex; align-items: center; justify-content: center; gap: 5px;
    min-width: 0; min-height: 40px; padding: 7px 10px; font-size: 11px; line-height: 1.3;
    color: #364b58; border: 1px solid rgba(248,251,255,.68); border-radius: 999px;
    background: var(--workspace-control-fill); box-shadow: var(--workspace-shadow);
}
[data-orbit-studio][data-layout="workspace"] [data-orbit-list-filters] [data-orbit-filter-status][aria-pressed="true"] {
    color: #143e5a; border-color: color-mix(in srgb,var(--filter-dot) 55%,white); background: color-mix(in srgb,var(--filter-dot) 20%,#eef7fc);
}
[data-orbit-list-filters] [data-orbit-filter-status="available"] { --filter-dot: var(--orbit-available-color,#46A66A); }
[data-orbit-list-filters] [data-orbit-filter-status="under_negotiation"] { --filter-dot: var(--orbit-negotiation-color,#E2B849); }
[data-orbit-list-filters] [data-orbit-filter-status="sold"] { --filter-dot: var(--orbit-sold-color,#DA5961); }
[data-orbit-list-filters] .orbit-filter-dot { display: block; width: 7px; height: 7px; flex-shrink: 0; border-radius: 50%; background: var(--filter-dot); }
[data-orbit-list-filters] :disabled { opacity: .55; }
[data-orbit-list-filters] :is(input,select,button):focus-visible { outline: 2px solid #8ccbf6; outline-offset: 3px; }
@media (min-width: 1800px) and (min-height: 950px) {
    [data-orbit-list-filters] .orbit-list-primary { width: min(100%,1320px); padding-block: 14px; }
    [data-orbit-list-filters] .orbit-list-field label { font-size: 15px; }
    [data-orbit-studio] [data-orbit-list-filters] .orbit-list-field :is(input,select) { font-size: 17px; height: 34px; }
    [data-orbit-list-filters] .orbit-list-range legend { font-size: 15px; }
    [data-orbit-list-filters] .orbit-list-range output { font-size: 19px; }
    [data-orbit-studio][data-layout="workspace"] [data-orbit-list-filters] [data-orbit-filter-status] { min-height: 44px; padding-inline: 18px; font-size: 15px; }
}
@media (max-width: 1100px) {
    [data-orbit-studio][data-layout="workspace"] [data-orbit-list-filters] { grid-template-columns: minmax(90px,.7fr) minmax(0,1.6fr) minmax(245px,1fr); column-gap: 12px; row-gap: 20px; grid-template-rows: auto 40px; }
    [data-orbit-list-filters] .orbit-list-primary { padding-block: 5px; }
    [data-orbit-list-filters] .orbit-list-field { padding-inline: 10px; }
    [data-orbit-list-filters] .orbit-list-field label { font-size: 10px; }
    [data-orbit-studio] [data-orbit-list-filters] .orbit-list-field :is(input,select) { font-size: 12px; height: 24px; }
    [data-orbit-list-filters] .orbit-list-range legend { font-size: 10px; }
    [data-orbit-list-filters] .orbit-list-range output { font-size: 11px; }
    [data-orbit-studio][data-layout="workspace"] [data-orbit-list-filters] [data-orbit-filter-status] { font-size: 10px; padding-inline: 7px; min-height: 36px; }
}
@media (max-width: 900px) {
    [data-orbit-studio][data-layout="workspace"] [data-orbit-list-filters] { grid-template-columns: 1fr 1fr; grid-template-rows: minmax(45px,1fr) 42px 36px; }
    [data-orbit-list-filters] .orbit-list-ranges { grid-column: 1 / -1; }
    [data-orbit-list-filters] .orbit-list-feedback { grid-column: 1; grid-row: 3; }
    [data-orbit-list-filters] .orbit-list-availability { grid-column: 2; grid-row: 3; }
}
@media (hover:hover) {
    [data-orbit-studio][data-layout="workspace"] [data-orbit-list-filters] [data-orbit-filter-status]:not(:disabled):hover { border-color: #9fc4dc; background: #eaf5fc; }
}
@media (prefers-reduced-transparency:reduce) {
    [data-orbit-list-filters] .orbit-list-primary { background: #edf4fb; }
}

[data-orbit-studio][data-layout="workspace"] .orbit-studio-details { display: contents; }
[data-orbit-studio][data-layout="workspace"] :is(.orbit-studio-plan-workspace,.orbit-studio-summary) {
    min-width: 0; min-height: 0;
    border-radius: 24px; border: 1px solid rgba(73,108,119,.18);
    background: var(--workspace-glass); box-shadow: var(--workspace-shadow); overflow: hidden;
}
[data-orbit-studio][data-layout="workspace"][data-moving="true"] .orbit-studio-plan-content { pointer-events: none; }
[data-orbit-studio][data-layout="workspace"] .orbit-studio-summary {
    grid-column: 1; grid-row: 5; z-index: 3; display: grid; align-items: center;
    grid-template-columns: minmax(164px,1fr) minmax(0,1.25fr) minmax(min-content,1.2fr);
    gap: clamp(8px,1vw,18px); width: calc(100% * var(--studio-orbit-scale)); justify-self: center;
    background: var(--workspace-control-fill); padding: 8px clamp(10px,1.25vw,20px);
}
[data-orbit-studio][data-layout="workspace"] .orbit-studio-heading {
    grid-column: 1; grid-row: 1; flex-direction: row; align-items: center; justify-content: flex-start; flex-wrap: nowrap; gap: 10px;
}
[data-orbit-studio][data-layout="workspace"] .orbit-studio-id {
    font-size: clamp(25px,2.4vw,39px); font-weight: 650; letter-spacing: -.055em; color: var(--workspace-ink);
}
[data-orbit-studio][data-layout="workspace"] .orbit-studio-status {
    font-size: 9px; gap: 6px; padding: 3px 6px; border-radius: 999px;
    background: rgba(255,255,255,.62); border: 1px solid rgba(73,108,119,.13);
}
[data-orbit-studio][data-layout="workspace"] .orbit-studio-facts {
    grid-column: 2; grid-row: 1; margin: 0; padding: 0 0 0 clamp(8px,.9vw,16px); border: 0; border-inline-start: 1px solid var(--workspace-rule);
}
[data-orbit-studio][data-layout="workspace"] .orbit-studio-areas {
    display: flex; align-items: baseline; gap: 0; margin: 0;
}
[data-orbit-studio][data-layout="workspace"] .orbit-studio-areas > div { flex: 1 1 0; padding: 0 8px; }
[data-orbit-studio][data-layout="workspace"] .orbit-studio-areas > div:first-child { padding-left: 0; }
[data-orbit-studio][data-layout="workspace"] .orbit-studio-areas > div + div { border-left: 1px solid var(--workspace-rule); }
[data-orbit-studio][data-layout="workspace"] .orbit-studio-areas dt { color: var(--workspace-muted); font-size: 10px; margin: 0 0 4px; }
[data-orbit-studio][data-layout="workspace"] .orbit-studio-areas dd { color: var(--workspace-ink); font-size: clamp(15px,1.35vw,22px); font-weight: 600; font-variant-numeric: tabular-nums; }
[data-orbit-studio][data-layout="workspace"] .orbit-studio-areas small { display: inline; font-size: 9px; margin: 0 0 0 3px; }
[data-orbit-studio][data-layout="workspace"] .orbit-studio-plan-workspace {
    grid-column: 2; grid-row: 3 / 6; align-self: stretch; z-index: 3; contain: size; display: flex; flex-direction: column;
    padding: var(--workspace-plan-inset); padding-bottom: 6px;
}
[data-orbit-studio][data-layout="workspace"] .orbit-studio-plan-content { display: flex; flex: 1 1 0; min-height: 0; }
[data-orbit-studio][data-layout="workspace"] .orbit-studio-plan-section { flex: 1 1 0; min-height: 0; }
[data-orbit-studio][data-layout="workspace"] [data-orbit-plan-footer] {
    flex: 0 0 auto; padding: 0; margin: 0 calc(6px - var(--workspace-plan-inset));
    border: 0; min-width: 0;
}
[data-orbit-studio][data-layout="workspace"] [data-orbit-plan-actions] { width: 100%; justify-content: space-between; }
[data-orbit-studio][data-layout="workspace"] [data-orbit-plan-actions] [data-orbit-favorite] {
    order: -1; width: 38px; height: 38px; min-height: 38px; padding: 6px;
    border: 0; border-radius: 0; background: transparent; box-shadow: none;
}
[data-orbit-studio][data-layout="workspace"] [data-orbit-plan-actions] [data-orbit-favorite] svg { width: 21px; height: 21px; }
@media (hover:hover) {
    [data-orbit-studio][data-layout="workspace"] [data-orbit-plan-actions] [data-orbit-favorite]:hover { color: #154a7d; }
}
[data-orbit-studio][data-layout="workspace"] .orbit-studio-plan-stage {
    flex: 1 1 0; height: auto; overflow: hidden;
    border: 0; border-radius: 0; background: transparent; box-shadow: none;
}
[data-orbit-studio][data-layout="workspace"] .orbit-studio-plan-crop { max-width: 97%; max-height: 97%; }
@supports (width: 1cqh) {
    [data-orbit-studio][data-layout="workspace"] .orbit-studio-plan-crop { width: min(97cqw,calc(97cqh * var(--studio-plan-aspect,1))); }
}
[data-orbit-studio][data-layout="workspace"] .orbit-studio-apartment-footer {
    grid-column: 3; grid-row: 1; display: flex; align-items: center; flex-wrap: wrap; gap: 6px 10px;
    min-width: 0; margin: 0; padding-inline-start: clamp(8px,.9vw,16px); border-inline-start: 1px solid var(--workspace-rule);
}
[data-orbit-studio][data-layout="workspace"] .orbit-studio-bottom {
    display: flex; flex-direction: row; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 8px; margin: 0;
}
[data-orbit-studio][data-layout="workspace"] .orbit-studio-label { margin: 0 0 2px; font-size: 9px; color: var(--workspace-muted); }
[data-orbit-studio][data-layout="workspace"] .orbit-studio-price-value {
    font-size: clamp(19px,1.85vw,26px); font-weight: 600; line-height: 1.1; min-height: 0;
    color: var(--workspace-ink); white-space: nowrap; font-variant-numeric: tabular-nums;
}
[data-orbit-studio][data-layout="workspace"] .orbit-studio-price-empty { font-size: 14px; }
[data-orbit-studio][data-layout="workspace"] .orbit-studio-price { flex: 0 0 auto; }
[data-orbit-studio][data-layout="workspace"] .orbit-studio-price-value small { margin-left: 2px; font-size: 10px; }
[data-orbit-studio][data-layout="workspace"] .orbit-studio-primary {
    min-height: 38px; width: auto; flex: 0 0 auto; min-width: 0; padding: 7px 12px; gap: 8px;
    border: 1px solid rgba(64,99,111,.26); border-radius: 999px;
    font-size: 11px; font-weight: 650; color: var(--workspace-ink); background: var(--workspace-button);
    box-shadow: inset 0 1px 1px rgba(255,255,255,.93),0 2px 6px rgba(55,88,101,.12);
    transition: background-color .18s, box-shadow .18s;
}
@media (hover: hover) and (pointer: fine) {
    [data-orbit-studio][data-layout="workspace"] [data-orbit-filters][data-presentation][data-active]
        :is([data-orbit-filter-status],[data-orbit-range-toggle],[data-orbit-filter-reset]):not(:disabled):hover {
        border-color: #5687a0; background: #e8f4fb; box-shadow: inset 0 1px 0 #fff;
    }
    [data-orbit-studio][data-layout="workspace"] [data-orbit-filters][data-presentation][data-active]
        [data-orbit-filter-status][aria-pressed="true"]:not(:disabled):hover {
        border-color: color-mix(in srgb,var(--filter-dot) 66%,#fff); background: color-mix(in srgb,var(--filter-dot) 24%,#fff);
    }
    [data-orbit-studio][data-layout="workspace"] .orbit-studio-primary:hover { background: #f4fafc; box-shadow: inset 0 1px 0 #fff,0 4px 12px rgba(55,88,101,.16); }
}
@media (max-width: 1030px) {
    [data-orbit-studio][data-mobile="false"][data-layout="workspace"] { --workspace-edge: 16px; --workspace-gap: 12px; --workspace-rail: clamp(235px,28vw,286px); }
    [data-orbit-studio][data-layout="workspace"] .orbit-studio-areas > div { padding-inline: 5px; }
    [data-orbit-studio][data-layout="workspace"] .orbit-studio-price-value { font-size: 17px; }
    [data-orbit-studio][data-layout="workspace"] .orbit-studio-primary { font-size: 10px; padding-inline: 8px; min-height: 34px; }
}
@media (max-height: 690px) {
    [data-orbit-studio][data-mobile="false"][data-layout="workspace"] { --workspace-top: 98px; --workspace-bottom: 12px; --workspace-row-gap: 12px; --workspace-toolbar: 146px; --workspace-summary: 70px; }
    [data-orbit-studio][data-layout="workspace"] .orbit-studio-plan-workspace { --workspace-plan-inset: 12px; padding-top: 10px; }
}
@media (max-width: 900px) {
    [data-orbit-studio][data-mobile="false"][data-layout="workspace"] { --workspace-summary: 106px; --workspace-toolbar: 174px; }
    [data-orbit-studio][data-layout="workspace"] .orbit-studio-summary { grid-template-columns: minmax(150px,1fr) minmax(0,1.2fr); align-content: center; }
    [data-orbit-studio][data-layout="workspace"] .orbit-studio-heading { gap: 6px; }
    [data-orbit-studio][data-layout="workspace"] .orbit-studio-id { font-size: 24px; }
    [data-orbit-studio][data-layout="workspace"] .orbit-studio-apartment-footer {
        grid-column: 1 / -1; grid-row: 2; padding: 5px 0 0; border: 0; border-top: 1px solid var(--workspace-rule);
    }
}
@media (prefers-reduced-transparency: reduce) {
    [data-orbit-studio][data-layout="workspace"] { --workspace-glass: #f2f7f9; --workspace-control-fill: #e5f0fa; --workspace-button: #f8fbfc; }
    [data-orbit-studio][data-layout="workspace"] [data-orbit-filters][data-presentation] { -webkit-backdrop-filter: none; backdrop-filter: none; }
}
@media (prefers-reduced-motion: reduce) {
    [data-orbit-studio][data-layout="workspace"] .orbit-studio-primary { transition: none; }
}
/* Controls follow the image bounds used for drawing and apartment picking. */
[data-admiral-homepage] [data-orbit-side-controls] {
    --side-arrow-size: 44px;
    position: absolute;
    left: var(--admiral-image-x,0px);
    top: calc(var(--admiral-image-y,0px) + var(--admiral-image-height,100%) / 2);
    width: var(--admiral-image-width,100%);
    height: 0;
    z-index: 4;
    pointer-events: none;
}
[data-orbit-side-controls] [data-orbit-side-arrow] {
    position: absolute;
    top: 0;
    transform: translateY(-50%);
    display: grid;
    place-items: center;
    width: var(--side-arrow-size);
    height: var(--side-arrow-size);
    box-sizing: border-box;
    padding: 0;
    border: 1px solid rgba(59,97,113,.24);
    border-radius: 50%;
    color: #17343f;
    background: linear-gradient(145deg,rgba(255,255,255,.94),rgba(222,239,244,.83));
    box-shadow: inset 0 1px 1px rgba(255,255,255,.9),0 4px 14px rgba(36,70,83,.20);
    -webkit-backdrop-filter: blur(14px) saturate(120%);
    backdrop-filter: blur(14px) saturate(120%);
    pointer-events: auto;
    touch-action: manipulation;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    transition: background .18s ease, box-shadow .18s ease, opacity .18s ease;
}
[data-orbit-side-controls] [data-orbit-side-arrow="previous"] { left: max(-15px,calc(4px - var(--admiral-image-x,0px))); }
[data-orbit-side-controls] [data-orbit-side-arrow="next"] { right: -10px; }
[data-orbit-side-controls][data-mobile="true"] [data-orbit-side-arrow="previous"] { left: 7px; }
[data-orbit-side-controls][data-mobile="true"] [data-orbit-side-arrow="next"] { right: 7px; }
[data-orbit-side-controls] [data-orbit-side-arrow] svg { width: 47%; height: 47%; }
[data-orbit-side-controls] [data-orbit-side-arrow]:disabled { opacity: .53; cursor: default; }
[data-orbit-side-controls] [data-orbit-side-arrow]:focus-visible { outline: 2px solid #163f51; outline-offset: 3px; }
@media (hover:hover) and (pointer:fine) {
    [data-orbit-side-controls] [data-orbit-side-arrow]:not(:disabled):hover {
        background: #f7fbfd;
        box-shadow: inset 0 1px 1px #fff,0 6px 20px rgba(36,70,83,.25);
    }
}
@media (prefers-reduced-motion:reduce) {
    [data-orbit-side-controls] [data-orbit-side-arrow] { transition: none; }
}
@media (prefers-reduced-transparency:reduce) {
    [data-orbit-side-controls] [data-orbit-side-arrow] {
        background: #f3f8fa;
        -webkit-backdrop-filter: none;
        backdrop-filter: none;
    }
}
/* Large monitors get wider rails and larger controls. The height budget
   still keeps the image, filters, drawing and apartment strip in view. */
@media (min-width: 1800px) and (min-height: 950px) {
    [data-orbit-studio][data-mobile="false"][data-layout="workspace"] {
        --workspace-max: 3420px;
        --workspace-top: clamp(100px,calc(9dvh + 4px),182px);
        --workspace-bottom: clamp(22px,3dvh,52px);
        --workspace-edge: clamp(38px,3vw,112px);
        --workspace-gap: clamp(26px,1.55vw,58px);
        --workspace-row-gap: clamp(18px,.76vw,28px);
        --workspace-toolbar: clamp(171px,7.3vw,182px);
        --workspace-summary: clamp(84px,4vw,108px);
        --workspace-rail: clamp(440px,26vw,990px);
    }

    [data-orbit-studio][data-layout="workspace"] .orbit-studio-plan-workspace {
        --workspace-plan-inset: clamp(16px,.9vw,31px);
        padding: var(--workspace-plan-inset); padding-bottom: 6px;
        border-radius: clamp(24px,1vw,40px);
    }
    [data-orbit-studio][data-layout="workspace"] .orbit-studio-id { font-size: clamp(37px,1.75vw,63px); }
    [data-orbit-studio][data-layout="workspace"] .orbit-studio-status { font-size: clamp(10px,.43vw,15px); }
    [data-orbit-studio][data-layout="workspace"] :is(.orbit-studio-areas dt,.orbit-studio-label) { font-size: clamp(10px,.42vw,15px); }
    [data-orbit-studio][data-layout="workspace"] :is(.orbit-studio-areas dd,.orbit-studio-price-value) { font-size: clamp(23px,1vw,36px); }
    [data-orbit-studio][data-layout="workspace"] .orbit-studio-primary {
        min-height: clamp(39px,1.48vw,56px); padding-inline: clamp(13px,.82vw,26px);
        font-size: clamp(11px,.47vw,17px);
    }
    [data-admiral-homepage] [data-orbit-side-controls][data-mobile="false"] { --side-arrow-size: clamp(48px,1.8vw,64px); }
}
[data-orbit-studio][data-mobile="true"][data-orbit-glass-tone="paper"] > [data-orbit-filters][data-presentation][data-active] {
    background: linear-gradient(145deg, rgba(247, 251, 255, 0.96) 0%, rgba(216, 233, 247, 0.93) 55%, rgba(237, 246, 253, 0.96) 100%); box-shadow: 0 7px 18px rgba(9, 44, 92, 0.22), 0 2px 5px rgba(13, 62, 125, 0.14); border-color: rgba(73,108,119,.22);
}

/* The divider sits in the existing gap; the image and card keep their geometry. */
[data-orbit-studio] > [data-orbit-section-divider] { display: none; pointer-events: none; }
[data-orbit-studio][data-layout="workspace"] > [data-orbit-section-divider] {
    display: block; grid-column: 1 / -1; grid-row: 2; align-self: center;
    position: relative; height: 1px; min-height: 1px; z-index: 2;
    margin-inline-start: calc((100% - var(--workspace-rail) - var(--workspace-gap)) * (1 - var(--studio-orbit-scale)) / 2);
    background: rgba(255,255,255,.58);
}
[data-orbit-studio][data-mobile="true"] > [data-orbit-filters][data-presentation]::after {
    content: ""; position: absolute; inset: auto 0 -11px; height: 1px;
    background: rgba(255,255,255,.58); pointer-events: none;
}
/* Size the portrait orbit in layout so its painted edges and the divider share one gutter. */
@media (orientation: portrait) {
    [data-orbit-studio][data-mobile="true"][data-orbit-glass-tone="paper"] {
        --phone-orbit-gap: clamp(8px, 1.45dvh, 12px);
        grid-template-rows: auto 1px minmax(0,1fr);
        row-gap: var(--phone-orbit-gap);
    }
    [data-orbit-studio][data-mobile="true"] > :is([data-orbit-filters],[data-orbit-group]) { grid-row: 1; }
    [data-orbit-studio][data-mobile="true"] > [data-orbit-filters][data-presentation]::after { content: none; }
    [data-orbit-studio][data-mobile="true"] > [data-orbit-section-divider] {
        display: block; grid-row: 2; width: var(--studio-phone-frame-width); justify-self: center;
        height: 1px; background: rgba(255,255,255,.58);
    }
    [data-orbit-studio][data-mobile="true"][data-orbit-glass-tone="paper"] .orbit-studio-body {
        grid-row: 3; row-gap: var(--phone-orbit-gap);
        grid-template-rows: calc((100cqw + 2 * var(--studio-phone-gutter)) * var(--studio-orbit-scale) * 1010 / 1920) minmax(0,1fr);
    }
    [data-orbit-studio][data-mobile="true"] .orbit-studio-image-slot {
        width: var(--studio-phone-frame-width); margin: 0; justify-self: center;
    }
    [data-orbit-studio][data-mobile="true"] [data-orbit-viewport] { transform: none; }
}
[data-admiral-homepage] [data-orbit-studio][data-layout="workspace"] .orbit-studio-plan-workspace[data-orbit-plan-openable="true"] { cursor: pointer; }
[data-admiral-homepage] [data-orbit-studio][data-layout="workspace"] [data-orbit-apartment-action][data-orbit-detail-link] {
    border: 0; border-radius: 4px; background: transparent; box-shadow: none;
    padding-inline: 2px; color: #155b91; text-decoration: none;
    text-underline-offset: 4px; text-decoration-thickness: 1px;
    transition: color .16s ease;
}
[data-admiral-homepage] [data-orbit-studio][data-layout="workspace"] [data-orbit-apartment-action][data-orbit-detail-link] > [aria-hidden="true"] { transition: transform .16s ease; }
[data-admiral-homepage] [data-orbit-studio][data-layout="workspace"] [data-orbit-plan-actions] [data-orbit-favorite],
[data-admiral-homepage] [data-orbit-studio][data-layout="workspace"] [data-orbit-plan-actions] [data-orbit-favorite][aria-pressed="true"] {
    border: 0; border-radius: 50%; background: transparent; box-shadow: none;
}
[data-admiral-homepage] [data-orbit-studio][data-layout="workspace"] [data-orbit-plan-actions] [data-orbit-favorite]:focus:not(:focus-visible) { outline: none; }
[data-admiral-homepage] [data-orbit-studio][data-layout="workspace"] [data-orbit-plan-actions] [data-orbit-favorite]:focus-visible {
    outline: 2px solid #2166a0; outline-offset: 2px;
}
[data-admiral-homepage] [data-orbit-studio][data-layout="workspace"] .orbit-studio-plan-content[role="button"]:focus-visible {
    outline: 2px solid #2166a0; outline-offset: 3px; border-radius: 9px;
}
@media (hover: hover) {
    [data-admiral-homepage] [data-orbit-studio][data-layout="workspace"] .orbit-studio-plan-workspace[data-orbit-plan-openable="true"]:hover [data-orbit-apartment-action][data-orbit-detail-link] {
        color: #0b4170; background: transparent; box-shadow: none; text-decoration: underline;
    }
    [data-admiral-homepage] [data-orbit-studio][data-layout="workspace"] [data-orbit-apartment-action][data-orbit-detail-link]:hover > [aria-hidden="true"] { transform: translate(2px,-2px); }
    [data-admiral-homepage] [data-orbit-studio][data-layout="workspace"] [data-orbit-plan-actions] [data-orbit-favorite]:not(:disabled):hover {
        color: #0b4c83; background: transparent; box-shadow: none;
    }
}
@media (prefers-reduced-motion: reduce) {
    [data-admiral-homepage] [data-orbit-studio][data-layout="workspace"] [data-orbit-apartment-action][data-orbit-detail-link],
    [data-admiral-homepage] [data-orbit-studio][data-layout="workspace"] [data-orbit-apartment-action][data-orbit-detail-link] > [aria-hidden="true"] { transition: none; transform: none; }
}
`

function OrbitBedroomMetric({ apartment, hu, number }: {
    apartment: OrbitApartmentRecord | null
    hu: boolean
    number: Intl.NumberFormat
}) {
    const count = apartment ? orbitFilterBedrooms(apartment) : null
    return (
        <div data-orbit-apartment-metric="bedrooms" data-orbit-field="bedrooms">
            <dt>{hu ? "Hálószoba" : "Bedrooms"}</dt>
            <dd>{count === null ? "—" : number.format(count)}</dd>
        </div>
    )
}

function OrbitApartmentStudio(
    props: OrbitApartmentStudioProps
): React.JSX.Element {
    const {
        active,
        arriving,
        mode,
        dataset,
        dataStatus,
        error,
        onRetry,
        apartment: currentApartment,
        onSelect,
        assetBase,
        detailsUrl,
        inquiryUrl,
        onViewport,
        language,
        onLayout,
        onOpenDetails,
        favorites,
        groupControls,
        mobile = false,
        moving = false,
        filters,
        filterBounds,
        filterAreaBounds = null,
        filterBedroomBounds = null,
        filterActive,
        filterCount,
        onFiltersChange,
    } = props
    const transition = useOrbitDataTransition(
        currentApartment,
        currentApartment?.id || null,
        { moving, enabled: active || arriving }
    )
    const boardRef = React.useRef<HTMLElement>(null)
    const [workspaceSize, setWorkspaceSize] = React.useState<{ width: number; height: number } | null>(null)
    const [widePlanPreview, setWidePlanPreview] = React.useState(false)
    const apartment = transition.displayed
    const hu = language !== "en"
    const [failedImage, setFailedImage] = React.useState("")
    const headingId = React.useId()
    const labels = hu
        ? {
              interior: "Beltér",
              terrace: "Erkély",
              garden: "Kert",
              floorplan: "Alaprajz",
              preview: "Előnézet",
              select: "Előnézeti lakás",
              gross: "Bruttó vételár",
              details: "Lakás részletei",
              inquire: "Érdeklődöm",
          }
        : {
              interior: "Interior",
              terrace: "Terrace",
              garden: "Garden",
              floorplan: "Floor plan",
              preview: "Preview",
              select: "Preview apartment",
              gross: "Gross purchase price",
              details: "Apartment details",
              inquire: "Enquire",
          }
    const number = new Intl.NumberFormat(hu ? "hu-HU" : "en-GB", {
        maximumFractionDigits: 2,
    })
    const previewPlan =
        (active || arriving) && apartment && dataset
            ? orbitApartmentPlan(apartment, dataset, assetBase, true)
            : null
    const previewImage = useOrbitPreviewImage(previewPlan?.url, active || arriving, !!previewPlan?.isThumbnail)
    // Keep the quick thumbnail while a stable large-screen selection sharpens.
    const sharpPlan = active && !mobile && widePlanPreview &&
        previewPlan?.isThumbnail && apartment && dataset
        ? orbitApartmentPlan(apartment, dataset, assetBase)
        : null
    const sharpImage = useOrbitPreviewImage(
        sharpPlan?.url === failedImage ? null : sharpPlan?.url,
        active && !moving,
        false,
        640
    )
    const plan = sharpImage && sharpPlan ? sharpPlan : previewPlan
    const asset = (path: string) =>
        orbitApartmentAssetUrl(path, assetBase) || ""
    const logo = asset("assets/brand/admiral-park-full-logo-no-location.svg")
    const fontLatin = asset(
        "assets/fonts/montserrat/montserrat-latin-variable.woff2"
    )
    const fontExtended = asset(
        "assets/fonts/montserrat/montserrat-latin-ext-variable.woff2"
    )
    const cssUrl = (url: string) =>
        url.replace(/["\\\n\r]/g, (character) => encodeURIComponent(character))
    const fontStyles = `@font-face{font-family:Montserrat;src:url("${cssUrl(fontLatin)}") format("woff2");font-style:normal;font-weight:100 900;font-display:swap;unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}@font-face{font-family:Montserrat;src:url("${cssUrl(fontExtended)}") format("woff2");font-style:normal;font-weight:100 900;font-display:swap;unicode-range:U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C4,U+2113,U+2C60-2C7F,U+A720-A7FF}`
    React.useEffect(() => {
        const host = boardRef.current?.closest<HTMLElement>("[data-admiral-homepage]")
        if (!host || mobile) return
        const update = () => {
            const { clientWidth: width, clientHeight: height } = host
            setWorkspaceSize((size) => size?.width === width && size.height === height ? size : { width, height })
            setWidePlanPreview(height >= 900 && width >= 1800 &&
                width * (window.devicePixelRatio || 1) >= 2300)
        }
        const observer = new ResizeObserver(update)
        observer.observe(host)
        update()
        return () => observer.disconnect()
    }, [mobile])
    React.useEffect(() => {
        setFailedImage("")
    }, [apartment?.id])
    React.useEffect(() => {
        onLayout?.()
    }, [active, apartment?.id, dataStatus, mobile, workspaceSize, onLayout])
    const positive = (value: unknown): value is number =>
        typeof value === "number" && Number.isFinite(value) && value >= 0
    const linkFor = (source: string) => {
        if (!source || !apartment) return ""
        try {
            const url = new URL(
                source,
                typeof window !== "undefined"
                    ? window.location.href
                    : "https://admiralpark.hu/"
            )
            if (url.protocol !== "https:" && url.protocol !== "http:") return ""
            url.searchParams.set("apartment", apartment.id)
            return url.href
        } catch {
            return ""
        }
    }
    const detailLink = linkFor(detailsUrl),
        inquiryLink = linkFor(inquiryUrl)
    const availability = apartment?.status || ""
    const statusText =
        availability === "available"
            ? hu
                ? "Elérhető"
                : "Available"
            : availability === "sold"
              ? hu
                  ? "Eladva"
                  : "Sold"
              : availability === "under_negotiation"
                ? hu
                    ? "Egyeztetés alatt"
                    : "In negotiation"
                : availability === "reserved"
                  ? hu
                      ? "Foglalt"
                      : "Reserved"
                  : apartment?.statusLabel || ""
    const viewportCallback = React.useCallback(
        (element: HTMLDivElement | null) => onViewport(element),
        [onViewport]
    )
    const canOpenPlan = active && transition.interactive && dataStatus === "ready" && !!apartment && !!(onOpenDetails || detailLink)
    const openPlanDetails = () => {
        if (!canOpenPlan) return
        if (onOpenDetails) onOpenDetails()
        else if (detailLink) window.location.assign(detailLink)
    }
    const detailActionContent = (
        <>
            <span>{mobile ? (hu ? "Adatlap" : "Details") : labels.details}</span>
            {mobile ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <path d="M5 12h14m-6-6 6 6-6 6" />
                </svg>
            ) : <span aria-hidden="true">↗</span>}
        </>
    )
    const detailsAction = onOpenDetails ? (
        <button
            type="button"
            className="orbit-studio-primary"
            data-orbit-apartment-action=""
            data-orbit-detail-link=""
            aria-haspopup="dialog"
            disabled={!transition.interactive}
            onClick={() => {
                if (transition.interactive) onOpenDetails()
            }}
        >
            {detailActionContent}
        </button>
    ) : detailLink ? (
        <a
            className="orbit-studio-primary"
            href={transition.interactive ? detailLink : undefined}
            aria-disabled={transition.interactive ? undefined : true}
            data-orbit-apartment-action=""
            data-orbit-detail-link=""
        >
            {detailActionContent}
        </a>
    ) : null
    const conversion = () => (
        <div className="orbit-studio-bottom">
            <div className="orbit-studio-price">
                {!mobile && (
                    <p className="orbit-studio-label">
                        {apartment?.priceIncludesVat === false
                            ? hu
                                ? "Nettó vételár"
                                : "Net purchase price"
                            : labels.gross}
                    </p>
                )}
                <p
                    className={`orbit-studio-price-value${!positive(apartment?.price) ? " orbit-studio-price-empty" : ""}`}
                    data-orbit-apartment-price=""
                    data-orbit-field="price"
                >
                    {positive(apartment?.price) ? (
                        <>
                            {number.format(apartment!.price!)}{" "}
                            <small>{apartment!.currency === "HUF" || !apartment!.currency ? "Ft" : apartment!.currency}</small>
                        </>
                    ) : availability === "sold" ? (
                        hu ? (
                            "Nincs megadva"
                        ) : (
                            "Not provided"
                        )
                    ) : hu ? (
                        "Ár kérésre"
                    ) : (
                        "Price on request"
                    )}
                </p>
            </div>
            {mobile ? detailsAction : inquiryLink && (
                <a
                    className="orbit-studio-primary admiral-frosted-button"
                    href={inquiryLink}
                    data-orbit-apartment-action=""
                    data-orbit-inquiry=""
                >
                    <span>{labels.inquire}</span>
                </a>
            )}
        </div>
    )
    const viewBox = plan?.viewBox || { x: 0, y: 0, width: 1, height: 1 }
    const planStyle: React.CSSProperties = {
        left: `${(-viewBox.x / viewBox.width) * 100}%`,
        top: `${(-viewBox.y / viewBox.height) * 100}%`,
        width: `${100 / viewBox.width}%`,
        height: `${100 / viewBox.height}%`,
    }
    const previousPlanAspect = React.useRef(plan?.aspect || 1)
    if (plan?.aspect) previousPlanAspect.current = plan.aspect
    const aspectStyle = {
        "--studio-plan-aspect": previousPlanAspect.current,
    } as React.CSSProperties
    const planShown =
        !!plan && (previewImage === plan.url || sharpImage === plan.url) && failedImage !== plan.url
    const detailsVisibility = {
        "aria-hidden":
            !active || moving || (!!apartment && !transition.interactive),
        ...(!active || moving || (!!apartment && !transition.interactive)
            ? { inert: "" as any }
            : {}),
    }
    const recordFade = {
        "data-orbitdata-transition": "",
        "data-orbitdata-phase": transition.phase,
        "data-orbitdata-displayed-id": apartment?.id || "",
        "data-orbitdata-visible": String(!!apartment && transition.visible),
    }
    const panelFade = {
        ...recordFade,
        "data-orbitdata-visible": String(
            (!apartment && !moving) || transition.visible
        ),
    }
    const facts = (
        <div
            className="orbit-studio-facts"
            data-orbit-ignore=""
            {...recordFade}
            {...detailsVisibility}
        >
            <dl className="orbit-studio-areas">
                {(
                    [
                        ["areaInterior", labels.interior, "area"],
                        ["areaTerrace", labels.terrace, "terrace"],
                        ["areaGarden", labels.garden, "garden"],
                    ] as const
                ).map(([key, label, field]) => (
                    <div
                        key={key}
                        data-orbit-apartment-metric={key}
                        data-orbit-field={field}
                    >
                        <dt>{label}</dt>
                        <dd>
                            {positive(apartment?.[key]) &&
                            (key === "areaInterior" || apartment![key]! > 0) ? (
                                <>
                                    {number.format(apartment![key]!)}
                                    <small>m²</small>
                                </>
                            ) : (
                                "—"
                            )}
                        </dd>
                    </div>
                ))}
                <OrbitBedroomMetric apartment={apartment} hu={hu} number={number} />
            </dl>
        </div>
    )
    return (
        <>
            <section
                ref={boardRef}
                data-orbit-studio=""
                data-layout={mobile ? "standard" : "workspace"}
                style={!mobile && workspaceSize?.width && workspaceSize.height ? ({
                    "--studio-host-height": workspaceSize.height + "px",
                    "--studio-host-width": workspaceSize.width + "px",
                } as React.CSSProperties) : undefined}
                data-orbit-glass-tone="paper"
                data-active={active ? "true" : "false"}
                data-mobile={mobile ? "true" : "false"}
                data-moving={moving ? "true" : "false"}
                data-mode={mode}
                data-status={dataStatus}
                data-apartment-id={currentApartment?.id || ""}
                aria-hidden={!active}
                {...(!active ? { inert: "" as any } : {})}
                aria-labelledby={mobile ? undefined : headingId}
                aria-label={
                    mobile ? (hu ? "Lakásválasztó" : "Apartments") : undefined
                }
            >
                <style dangerouslySetInnerHTML={homepageStyleMarkup(fontStyles + orbitApartmentStudioStyles + orbitFrostedButtonStyles + orbitWorkspaceStyles + orbitBlueStudioStyles)} />
                {!mobile && <div data-orbit-control-band="" aria-hidden="true" />}
                <div data-orbit-section-divider="" aria-hidden="true" />
                <header className="orbit-studio-header" data-orbit-ignore="">
                    {logo && !mobile && (
                        <img
                            className="orbit-studio-brand"
                            src={logo}
                            alt="Admiral Park"
                            width={184}
                            height={78}
                            draggable={false}
                        />
                    )}
                    {!mobile && (
                        <div className="orbit-studio-header-end">
                            {mode === "preview" && dataset && !groupControls && (
                                <div className="orbit-studio-preview">
                                    <label htmlFor={`${headingId}-select`}>
                                        {labels.preview}
                                    </label>
                                    <select
                                        id={`${headingId}-select`}
                                        data-orbit-apartment-select=""
                                        aria-label={labels.select}
                                        value={currentApartment?.id || ""}
                                        disabled={!active || moving}
                                        onChange={(event) =>
                                            onSelect(event.target.value)
                                        }
                                    >
                                        {!currentApartment && (
                                            <option value="">—</option>
                                        )}
                                        {dataset.apartments.map((unit) => (
                                            <option
                                                key={unit.id}
                                                value={unit.id}
                                            >
                                                {unit.id}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}
                        </div>
                    )}
                    {!mobile && (
                        <div data-orbit-studio-filters="" data-orbit-filter-bar="">
                            {groupControls || (<OrbitListFilters
                                apartments={dataset?.apartments || []}
                                active={active && !moving}
                                visible={active || arriving}
                                language={language}
                                filters={filters}
                                bounds={filterBounds}
                                areaBounds={filterAreaBounds}
                                bedroomBounds={filterBedroomBounds}
                                matchCount={filterCount}
                                total={dataset?.apartments.length || 0}
                                onChange={onFiltersChange}
                            />)}
                        </div>
                    )}
                </header>
                {mobile && (
                    groupControls || <OrbitFilterBar
                        active={active && !moving}
                        visible={active || arriving}
                        language={language}
                        filters={filters}
                        bounds={filterBounds}
                        areaBounds={filterAreaBounds}
                        bedroomBounds={filterBedroomBounds}
                        matchCount={filterCount}
                        total={dataset?.apartments.length || 0}
                        onChange={onFiltersChange}
                    />
                )}
                <div className="orbit-studio-body" data-orbit-housing="">
                    <div className="orbit-studio-scene">
                        <div className="orbit-studio-image-slot">
                            <div
                                ref={viewportCallback}
                                data-orbit-viewport=""
                                aria-hidden="true"
                            />
                        </div>
                    </div>
                    {mobile ? (
                        <div
                            className="orbit-studio-mobile-panel"
                            data-orbit-studio-details=""
                            data-orbit-ignore=""
                            style={aspectStyle}
                            {...panelFade}
                            {...detailsVisibility}
                        >
                            {dataStatus === "error" ? (
                                <div
                                    className="orbit-studio-empty"
                                    role="status"
                                >
                                    <p>
                                        {hu
                                            ? "A lakásadatok most nem tölthetők be."
                                            : "Apartment information could not be loaded."}
                                    </p>
                                    <button
                                        type="button"
                                        className="orbit-studio-text-button"
                                        onClick={onRetry}
                                    >
                                        {hu ? "Újrapróbálom" : "Try again"}
                                    </button>
                                </div>
                            ) : !apartment ? (
                                <div
                                    className="orbit-studio-empty"
                                    role="status"
                                    {...(filterActive && filterCount === 0
                                        ? { "data-orbit-filter-empty": "" }
                                        : {})}
                                >
                                    <p>
                                        {dataStatus === "loading" ||
                                        dataStatus === "idle"
                                            ? hu
                                                ? "Lakásadatok betöltése…"
                                                : "Loading apartment information…"
                                            : filterActive && filterCount === 0
                                              ? hu
                                                  ? "Nincs a szűrésnek megfelelő lakás."
                                                  : "No apartments match these filters."
                                              : hu
                                                ? "Válasszon egy lakást az épületen."
                                                : "Select an apartment on the building."}
                                    </p>
                                </div>
                            ) : (
                                <>
                                    <figure
                                        className="orbit-studio-mobile-plan"
                                        style={aspectStyle}
                                    >
                                        <button
                                            type="button"
                                            className="orbit-studio-mobile-plan-button"
                                            data-orbit-detail-link=""
                                            aria-haspopup="dialog"
                                            aria-label={
                                                hu
                                                    ? `${apartment.id} adatlap megnyitása`
                                                    : `Open apartment ${apartment.id} details`
                                            }
                                            disabled={
                                                !transition.interactive ||
                                                !onOpenDetails
                                            }
                                            onClick={() => {
                                                if (transition.interactive)
                                                    onOpenDetails?.()
                                            }}
                                        >
                                            <span
                                                className="orbit-studio-plan-stage"
                                                style={aspectStyle}
                                            >
                                                {planShown ? (
                                                    <span
                                                        className="orbit-studio-plan-crop"
                                                        data-orbit-plan-crop=""
                                                    >
                                                        <img
                                                            data-orbit-floorplan=""
                                                            className="orbit-studio-plan-image"
                                                            src={plan!.url}
                                                            style={planStyle}
                                                            alt={`${apartment.id} · ${labels.floorplan}`}
                                                            decoding="async"
                                                            draggable={false}
                                                            onLoad={() =>
                                                                onLayout?.()
                                                            }
                                                            onError={() =>
                                                                setFailedImage(
                                                                    plan!.url
                                                                )
                                                            }
                                                        />
                                                    </span>
                                                ) : (
                                                    <span className="orbit-studio-loading">
                                                        {hu
                                                            ? "Az alaprajz még nem érhető el."
                                                            : "Floor plan unavailable."}
                                                    </span>
                                                )}
                                            </span>
                                        </button>
                                    </figure>
                                    <div
                                        className="orbit-studio-mobile-summary"
                                        data-orbit-mobile-summary=""
                                    >
                                    <div className="orbit-studio-heading orbit-studio-mobile-identity">
                                        <OrbitFavoriteButton apartmentId={apartment.id} favorites={favorites}
                                            interactive={transition.interactive} hu={hu} />
                                        <h2
                                            id={headingId}
                                            className="orbit-studio-id"
                                        >
                                            {apartment.id}
                                        </h2>
                                        {statusText && (
                                            <span
                                                className="orbit-studio-status"
                                                data-status={availability}
                                                data-orbit-field="status"
                                                title={statusText}
                                            >
                                                <span
                                                    className="orbit-studio-status-dot"
                                                    aria-hidden="true"
                                                />
                                                <span className="orbit-studio-status-text">
                                                    {availability ===
                                                    "under_negotiation"
                                                        ? hu
                                                            ? "Egyeztetés"
                                                            : "In talks"
                                                        : statusText}
                                                </span>
                                            </span>
                                        )}
                                    </div>

                                        <dl className="orbit-studio-mobile-metrics">
                                            {(
                                                [
                                                    [
                                                        "areaInterior",
                                                        hu
                                                            ? "Lakótér"
                                                            : labels.interior,
                                                        "area",
                                                    ],
                                                    [
                                                        "areaTerrace",
                                                        hu
                                                            ? "Terasz"
                                                            : labels.terrace,
                                                        "terrace",
                                                    ],
                                                    [
                                                        "areaGarden",
                                                        labels.garden,
                                                        "garden",
                                                    ],
                                                ] as const
                                            ).filter(([key]) => key !== "areaGarden" || (positive(apartment.areaGarden) && apartment.areaGarden > 0)).map(([key, label, field]) => (
                                                <div
                                                    key={key}
                                                    data-orbit-apartment-metric={
                                                        key
                                                    }
                                                    data-orbit-field={field}
                                                >
                                                    <dt>{label}</dt>
                                                    <dd>
                                                        {positive(
                                                            apartment[key]
                                                        ) &&
                                                        (key ===
                                                            "areaInterior" ||
                                                            apartment[key]! >
                                                                0) ? (
                                                            <>
                                                                {number.format(
                                                                    apartment[
                                                                        key
                                                                    ]!
                                                                )}
                                                                <small>
                                                                    m²
                                                                </small>
                                                            </>
                                                        ) : (
                                                            "—"
                                                        )}
                                                    </dd>
                                                </div>
                                            ))}
                                            <OrbitBedroomMetric apartment={apartment} hu={hu} number={number} />
                                        </dl>

                                        <div className="orbit-studio-mobile-actions">
                                            {conversion()}
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    ) : (
                        <>
                            <div className="orbit-studio-summary" data-orbit-detail-bar="" data-orbit-ignore="">
                                <div
                                    className="orbit-studio-heading"
                                    {...recordFade}
                                >
                                    <h2
                                        id={headingId}
                                        className="orbit-studio-id"
                                    >
                                        {apartment?.id || "—"}
                                    </h2>
                                    {statusText && (
                                        <span
                                            className="orbit-studio-status"
                                            data-status={availability}
                                            data-orbit-field="status"
                                        >
                                            <span
                                                className="orbit-studio-status-dot"
                                                aria-hidden="true"
                                            />
                                            {statusText}
                                        </span>
                                    )}
                                </div>
                                {facts}
                                <div
                                    className="orbit-studio-apartment-footer"
                                >
                                    <div {...recordFade}>{conversion()}</div>
                                </div>
                            </div>
                            <div
                                className="orbit-studio-plan-workspace" data-orbit-plan-bar="" data-orbit-ignore=""
                                data-orbit-studio-details=""
                                data-orbit-plan-openable={String(canOpenPlan)}
                                onClick={(event) => {
                                    if (!canOpenPlan) return
                                    const target = event.target
                                    // Footer actions and retry controls retain their own behavior.
                                    if (target instanceof Element && target.closest("button, a, input, select, textarea, [contenteditable='true']")) return
                                    openPlanDetails()
                                }}
                            >
                                <div className="orbit-studio-plan-content" {...panelFade} {...detailsVisibility}
                                    role={canOpenPlan ? "button" : undefined}
                                    tabIndex={canOpenPlan ? 0 : undefined}
                                    aria-haspopup={canOpenPlan ? "dialog" : undefined}
                                    aria-label={canOpenPlan ? (hu ? apartment!.id + " adatlap megnyitása" : "Open apartment " + apartment!.id + " details") : undefined}
                                    onKeyDown={(event) => {
                                        if (canOpenPlan && (event.key === "Enter" || event.key === " ")) {
                                            event.preventDefault()
                                            openPlanDetails()
                                        }
                                    }}
                                >
                                    <section
                                        className="orbit-studio-plan-section"
                                        aria-label={labels.floorplan}
                                    >
                                        <div
                                            className="orbit-studio-plan-stage"
                                            style={aspectStyle}
                                        >
                                            {dataStatus === "error" ? (
                                                <div
                                                    className="orbit-studio-empty"
                                                    role="status"
                                                >
                                                    <p>
                                                        {hu
                                                            ? "A lakásadatok most nem tölthetők be."
                                                            : "Apartment information could not be loaded."}
                                                    </p>
                                                    {error && <p>{error}</p>}
                                                    <button
                                                        type="button"
                                                        className="orbit-studio-text-button"
                                                        onClick={onRetry}
                                                    >
                                                        {hu
                                                            ? "Újrapróbálom"
                                                            : "Try again"}
                                                    </button>
                                                </div>
                                            ) : !apartment ? (
                                                <div
                                                    className="orbit-studio-empty"
                                                    role="status"
                                                >
                                                    <p>
                                                        {dataStatus === "loading" ||
                                                        dataStatus === "idle"
                                                            ? hu
                                                                ? "Lakásadatok betöltése…"
                                                                : "Loading apartment information…"
                                                            : hu
                                                              ? "Válasszon egy lakást az épületen."
                                                              : "Select an apartment on the building."}
                                                    </p>
                                                </div>
                                            ) : planShown ? (
                                                <div
                                                    className="orbit-studio-plan-crop"
                                                    data-orbit-plan-crop=""
                                                >
                                                    <img
                                                        data-orbit-floorplan=""
                                                        className="orbit-studio-plan-image"
                                                        src={plan!.url}
                                                        style={planStyle}
                                                        alt={`${apartment.id} · ${labels.floorplan}`}
                                                        decoding="async"
                                                        draggable={false}
                                                        onLoad={() => onLayout?.()}
                                                        onError={() =>
                                                            setFailedImage(
                                                                plan!.url
                                                            )
                                                        }
                                                    />
                                                </div>
                                            ) : (
                                                <p className="orbit-studio-empty">
                                                    {hu
                                                        ? "A rajz még nem érhető el."
                                                        : "This drawing is not available yet."}
                                                </p>
                                            )}
                                        </div>
                                    </section>
                                </div>
                                {apartment && (
                                    <div data-orbit-plan-footer="">
                                        <div data-orbit-plan-actions="">
                                            {detailsAction}
                                            <OrbitFavoriteButton apartmentId={apartment.id} favorites={favorites}
                                                interactive={active} hu={hu} />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </section>
        </>
    )
}

interface OrbitFullscreenGeometry {
    width: number
    height: number
    rotated: boolean
    physical: { left: number; top: number; width: number; height: number }
}

/** Changes presentation only: the same scene, canvas and player remain mounted. */
function useOrbitFullscreen(
    onLayout: () => void,
    modalOpen: React.MutableRefObject<boolean>
) {
    const surfaceRef = React.useRef<HTMLDivElement>(null)
    const geometryRef = React.useRef<OrbitFullscreenGeometry | null>(null)
    const [active, setActive] = React.useState(false)
    const [geometry, setGeometry] =
        React.useState<OrbitFullscreenGeometry | null>(null)
    const activeRef = React.useRef(false)
    const mountedRef = React.useRef(false)
    const nativeTarget = React.useRef<HTMLElement | null>(null)
    const nativeEntered = React.useRef(false)
    const requestGeneration = React.useRef(0)
    const [nativePhase, setNativePhase] = React.useState<
        "pending" | "active" | "fallback"
    >("fallback")
    const exitOwnedFullscreen = React.useCallback(
        (target: HTMLElement | null) => {
            if (!target || document.fullscreenElement !== target) return
            try {
                void document.exitFullscreen?.().catch(() => {})
            } catch {
                /* Browser exit remains available. */
            }
        },
        []
    )
    const callbackRef = React.useRef(onLayout)
    callbackRef.current = onLayout
    const previousFocus = React.useRef<HTMLElement | null>(null)
    const focusFrame = React.useRef<number | null>(null)

    const readGeometry = React.useCallback((): OrbitFullscreenGeometry => {
        const viewport = window.visualViewport
        const width = Math.max(1, viewport?.width || window.innerWidth)
        const height = Math.max(1, viewport?.height || window.innerHeight)
        const rotated = height > width
        return {
            width: rotated ? height : width,
            height: rotated ? width : height,
            rotated,
            physical: {
                left: viewport?.offsetLeft || 0,
                top: viewport?.offsetTop || 0,
                width,
                height,
            },
        }
    }, [])
    const open = React.useCallback(() => {
        if (typeof window === "undefined" || activeRef.current) return
        if (focusFrame.current !== null)
            cancelAnimationFrame(focusFrame.current)
        previousFocus.current =
            document.activeElement instanceof HTMLElement
                ? document.activeElement
                : null
        const next = readGeometry()
        activeRef.current = true
        geometryRef.current = next
        setGeometry(next)
        setActive(true)
        const target =
            surfaceRef.current?.closest<HTMLElement>(
                "[data-admiral-homepage]"
            ) || null
        const generation = ++requestGeneration.current
        nativeEntered.current = false
        // Fullscreen must be requested during this click, before any deferred
        // effect. The root also contains the shared apartment-card dialogs.
        if (target && document.fullscreenElement === target) {
            nativeTarget.current = target
            nativeEntered.current = true
            setNativePhase("active")
        } else if (
            target &&
            !document.fullscreenElement &&
            document.fullscreenEnabled !== false &&
            typeof target.requestFullscreen === "function"
        ) {
            nativeTarget.current = target
            setNativePhase("pending")
            const failed = () => {
                if (
                    !mountedRef.current ||
                    !activeRef.current ||
                    requestGeneration.current !== generation ||
                    nativeTarget.current !== target
                )
                    return
                // An older request on this root may have succeeded after a
                // close/reopen. A newer rejection must not discard that owner.
                if (document.fullscreenElement === target) {
                    nativeEntered.current = true
                    setNativePhase("active")
                    const actual = readGeometry()
                    geometryRef.current = actual
                    setGeometry(actual)
                    return
                }
                nativeTarget.current = null
                nativeEntered.current = false
                setNativePhase("fallback")
            }
            try {
                const request = target.requestFullscreen({
                    navigationUI: "hide",
                })
                void Promise.resolve(request).then(() => {
                    // A late result may belong to a closed/unmounted viewer.
                    // A newer active request on the same root may adopt it.
                    if (
                        !mountedRef.current ||
                        !activeRef.current ||
                        nativeTarget.current !== target
                    ) {
                        exitOwnedFullscreen(target)
                        return
                    }
                    if (document.fullscreenElement !== target) {
                        failed()
                        return
                    }
                    nativeEntered.current = true
                    setNativePhase("active")
                    const actual = readGeometry()
                    geometryRef.current = actual
                    setGeometry(actual)
                }, failed)
            } catch {
                failed()
            }
        } else {
            nativeTarget.current = null
            setNativePhase("fallback")
        }
    }, [readGeometry, exitOwnedFullscreen])
    const close = React.useCallback(() => {
        if (!activeRef.current) return
        activeRef.current = false
        geometryRef.current = null
        requestGeneration.current++
        const target = nativeTarget.current
        nativeTarget.current = null
        nativeEntered.current = false
        exitOwnedFullscreen(target)
        setNativePhase("fallback")
        const surface = surfaceRef.current as
            | (HTMLDivElement & { hidePopover?: () => void })
            | null
        if (surface) {
            try {
                surface.hidePopover?.()
            } catch {
                /* Fixed positioning is the browser fallback. */
            }
            surface.removeAttribute("popover")
        }
        setActive(false)
        setGeometry(null)
        if (focusFrame.current !== null)
            cancelAnimationFrame(focusFrame.current)
        focusFrame.current = requestAnimationFrame(() => {
            focusFrame.current = null
            const previous = previousFocus.current
            const root = surfaceRef.current?.closest<HTMLElement>(
                "[data-admiral-homepage]"
            )
            const fallback =
                root?.querySelector<HTMLButtonElement>(
                    "[data-orbit-fullscreen-open]"
                ) || null
            const target =
                previous &&
                previous !== document.body &&
                previous !== document.documentElement &&
                previous.isConnected
                    ? previous
                    : fallback
            if (target?.isConnected && !modalOpen.current)
                target.focus({ preventScroll: true })
            previousFocus.current = null
        })
    }, [modalOpen, exitOwnedFullscreen])

    React.useEffect(() => {
        mountedRef.current = true
        const changed = () => {
            const target = nativeTarget.current
            if (!target) return
            if (document.fullscreenElement === target) {
                if (!activeRef.current) {
                    exitOwnedFullscreen(target)
                    return
                }
                nativeEntered.current = true
                setNativePhase("active")
                const actual = readGeometry()
                geometryRef.current = actual
                setGeometry(actual)
            } else if (nativeEntered.current) {
                // Browser Back, Escape and its own exit control restore the
                // compact workspace, without affecting somebody else's root.
                close()
            }
        }
        document.addEventListener("fullscreenchange", changed)
        return () => {
            mountedRef.current = false
            activeRef.current = false
            requestGeneration.current++
            const target = nativeTarget.current
            nativeTarget.current = null
            nativeEntered.current = false
            geometryRef.current = null
            document.removeEventListener("fullscreenchange", changed)
            exitOwnedFullscreen(target)
        }
    }, [close, readGeometry, exitOwnedFullscreen])

    React.useEffect(() => {
        const surface = surfaceRef.current
        if (!active || !surface) return
        surface.dataset.orbitFullscreen = "true"
        // Native fullscreen promotes the whole root to the top layer. Its fixed
        // child needs no popover; promoting both could reorder them mid-entry.
        if (nativePhase === "fallback") {
            surface.setAttribute("popover", "manual")
            try {
                const show = (
                    surface as HTMLDivElement & { showPopover?: () => void }
                ).showPopover
                if (show) show.call(surface)
                else surface.removeAttribute("popover")
            } catch {
                surface.removeAttribute(
                    "popover"
                ) /* Retain the fixed fullscreen fallback. */
            }
        } else surface.removeAttribute("popover")
        if (focusFrame.current !== null)
            cancelAnimationFrame(focusFrame.current)
        focusFrame.current = requestAnimationFrame(() => {
            focusFrame.current = null
            if (activeRef.current && !modalOpen.current)
                surface
                    .querySelector<HTMLButtonElement>(
                        "[data-orbit-fullscreen-close]"
                    )
                    ?.focus({ preventScroll: true })
        })
        const update = () => {
            if (!activeRef.current) return
            const next = readGeometry(),
                old = geometryRef.current
            if (
                old &&
                old.rotated === next.rotated &&
                old.width === next.width &&
                old.height === next.height &&
                old.physical.left === next.physical.left &&
                old.physical.top === next.physical.top
            )
                return
            geometryRef.current = next
            setGeometry(next)
        }
        const keyboard = (event: KeyboardEvent) => {
            // The shared apartment dialog is above this scene and owns its keys.
            if (
                !activeRef.current ||
                modalOpen.current ||
                event.defaultPrevented
            )
                return
            if (event.key === "Escape") {
                event.preventDefault()
                event.stopPropagation()
                close()
                return
            }
            if (event.key !== "Tab") return
            const candidates = Array.from(
                surface.querySelectorAll<HTMLElement>(
                    "button:not(:disabled),a[href],input:not(:disabled),select:not(:disabled),textarea:not(:disabled),[tabindex]:not([tabindex='-1'])"
                )
            ).filter(
                (element) =>
                    !element.closest("[inert],[hidden],[aria-hidden='true']") &&
                    element.getClientRects().length > 0 &&
                    getComputedStyle(element).visibility !== "hidden"
            )
            if (!candidates.length) {
                event.preventDefault()
                surface.focus({ preventScroll: true })
                return
            }
            const first = candidates[0],
                last = candidates[candidates.length - 1],
                focused = document.activeElement
            if (
                event.shiftKey &&
                (focused === first || !surface.contains(focused))
            ) {
                event.preventDefault()
                last.focus({ preventScroll: true })
            } else if (
                !event.shiftKey &&
                (focused === last || !surface.contains(focused))
            ) {
                event.preventDefault()
                first.focus({ preventScroll: true })
            }
        }
        window.addEventListener("resize", update)
        window.visualViewport?.addEventListener("resize", update)
        window.visualViewport?.addEventListener("scroll", update)
        window.addEventListener("keydown", keyboard, true)
        return () => {
            window.removeEventListener("resize", update)
            window.visualViewport?.removeEventListener("resize", update)
            window.visualViewport?.removeEventListener("scroll", update)
            window.removeEventListener("keydown", keyboard, true)
            try {
                ;(
                    surface as HTMLDivElement & { hidePopover?: () => void }
                ).hidePopover?.()
            } catch {
                /* Already closed. */
            }
            surface.removeAttribute("popover")
            surface.dataset.orbitFullscreen = "false"
        }
    }, [active, nativePhase, close, modalOpen, readGeometry])

    React.useEffect(() => {
        const surface = surfaceRef.current
        if (surface) {
            surface.setAttribute("data-orbit-fullscreen-surface", "")
            surface.dataset.active = active ? "true" : "false"
            surface.dataset.orbitFullscreenNative = active ? nativePhase : "off"
            surface.dataset.orbitFullscreen = active ? "true" : "false"
            surface.dataset.orbitFullscreenRotated = geometry?.rotated
                ? "true"
                : "false"
            if (geometry) {
                surface.dataset.orbitFullscreenWidth = String(geometry.width)
                surface.dataset.orbitFullscreenHeight = String(geometry.height)
            } else {
                delete surface.dataset.orbitFullscreenWidth
                delete surface.dataset.orbitFullscreenHeight
            }
        }
        // Layout callbacks run after the mode and dimensions have been committed.
        const frame = requestAnimationFrame(() => callbackRef.current())
        return () => cancelAnimationFrame(frame)
    }, [active, geometry, nativePhase])
    React.useEffect(
        () => () => {
            if (focusFrame.current !== null)
                cancelAnimationFrame(focusFrame.current)
            activeRef.current = false
            geometryRef.current = null
        },
        []
    )

    const surfaceStyle: React.CSSProperties =
        active && geometry
            ? {
                  position: "fixed",
                  display: "block",
                  left: geometry.physical.left,
                  top: geometry.physical.top,
                  width: geometry.physical.width,
                  height: geometry.physical.height,
                  margin: 0,
                  padding: 0,
                  border: 0,
                  maxWidth: "none",
                  maxHeight: "none",
                  overflow: "hidden",
                  boxSizing: "border-box",
                  background: "#101820",
                  zIndex: 2147483500,
                  isolation: "isolate",
                  outline: "none",
                  overscrollBehavior: "none",
              }
            : { display: "contents" }
    const planeStyle: React.CSSProperties =
        active && geometry
            ? {
                  position: "absolute",
                  display: "block",
                  left: "50%",
                  top: "50%",
                  width: geometry.width,
                  height: geometry.height,
                  transform: `translate(-50%, -50%)${geometry.rotated ? " rotate(90deg)" : ""}`,
                  transformOrigin: "center",
                  overflow: "hidden",
                  isolation: "isolate",
                  background: "#101820",
              }
            : { display: "contents" }
    return {
        active,
        open,
        close,
        geometryRef,
        surfaceRef,
        surfaceStyle,
        planeStyle,
    }
}

interface OrbitFullscreenDetailsProps {
    favorites: OrbitFavoriteActions
    groupControls?: React.ReactNode
    apartment: OrbitApartmentRecord | null
    dataset?: OrbitApartmentDataset | null
    assetBase: string
    language: "hu" | "en"
    onOpenDetails: () => void
    moving: boolean
    onPrevious: () => void
    onNext: () => void
    onClose: () => void
    checkpoint: number
    count: number
    emptyMessage?: string
    filters: OrbitApartmentFilters
    filterBounds: OrbitPriceBounds | null
    filterAreaBounds?: OrbitAreaBounds | null
    filterBedroomBounds?: OrbitRangeBounds | null
    filterCount: number
    total: number
    onFiltersChange: (filters: OrbitApartmentFilters) => void
}

const orbitFullscreenStyles = `${orbitDataDividerStyles}
[data-orbit-fullscreen-details] { position:absolute; inset:0; z-index:8; color:#fff; font-family:Montserrat,Arial,Helvetica,sans-serif; pointer-events:none; -webkit-font-smoothing:antialiased; }
[data-orbit-fullscreen-details] * { box-sizing:border-box; }
[data-orbit-fullscreen-details] button { font:inherit; color:inherit; cursor:pointer; -webkit-tap-highlight-color:transparent; touch-action:manipulation; }
[data-orbit-fullscreen-details] button:disabled { cursor:default; opacity:.4; }
[data-orbit-fullscreen-details] button:focus-visible { outline:2px solid white; outline-offset:4px; }
[data-orbit-fullscreen-details] .orbit-fullscreen-brand { position:absolute; top:14px; left:50%; transform:translateX(-50%); width:140px; height:56px; background:white; -webkit-mask-image:var(--orbit-fullscreen-logo); mask-image:var(--orbit-fullscreen-logo); -webkit-mask-size:contain; mask-size:contain; -webkit-mask-position:center; mask-position:center; -webkit-mask-repeat:no-repeat; mask-repeat:no-repeat; filter:drop-shadow(0 1px 4px rgba(0,0,0,.2)); }
[data-orbit-fullscreen-details] .orbit-fullscreen-close { position:absolute; top:12px; right:14px; display:grid; place-items:center; width:44px; height:44px; padding:0; border:1px solid rgba(255,255,255,.85); border-radius:50%; background:#fff; color:#242824; box-shadow:0 3px 16px rgba(20,32,24,.16); pointer-events:auto; }
[data-orbit-fullscreen-details] .orbit-fullscreen-close svg { width:19px; height:19px; }
[data-orbit-fullscreen-details] .orbit-fullscreen-nav { position:absolute; inset:45% 16px auto; display:flex; justify-content:space-between; align-items:center; pointer-events:none; }
[data-orbit-fullscreen-details] .orbit-fullscreen-nav button { display:grid; place-items:center; width:44px; height:44px; padding:0; border:1px solid rgba(255,255,255,.45); border-radius:50%; background:rgba(16,24,32,.28); pointer-events:auto; font-size:22px; line-height:1; }
[data-orbit-fullscreen-details] .orbit-fullscreen-bar { --orbit-fullscreen-plan-size:176px; position:absolute; inset:auto 0 0; display:grid; grid-template-columns:minmax(100px,.9fr) 180px minmax(272px,1.45fr); align-items:start; gap:18px; min-width:0; padding:24px 24px 14px; background:linear-gradient(0deg,rgba(7,16,24,.66) 0%,rgba(7,16,24,.42) 55%,rgba(7,16,24,0) 100%); opacity:1; transition:opacity .24s ease; }
[data-orbit-fullscreen-details] .orbit-fullscreen-bar[data-moving="true"] { pointer-events:none; }
[data-orbit-fullscreen-details] .orbit-fullscreen-bar[data-moving="true"] * { pointer-events:none; }
[data-orbit-fullscreen-details] [data-orbitdata-transition] { opacity:1; transition:opacity .18s ease; }
[data-orbit-fullscreen-details] [data-orbitdata-transition][data-orbitdata-visible="false"] { opacity:0; pointer-events:none; }

[data-orbit-fullscreen-details] .orbit-fullscreen-left,[data-orbit-fullscreen-details] .orbit-fullscreen-right { min-width:0; text-align:left; }
[data-orbit-fullscreen-details] .orbit-fullscreen-left { height:var(--orbit-fullscreen-plan-size); display:grid; align-content:start; grid-template-rows:52px minmax(0,1fr); row-gap:16px; }
[data-orbit-fullscreen-details] .orbit-fullscreen-identity { display:flex; align-items:baseline; flex-wrap:wrap; gap:5px 10px; align-self:start; margin:0; }
[data-orbit-fullscreen-details] .orbit-fullscreen-id { margin:0; font-size:24px; font-weight:700; line-height:1; letter-spacing:-.04em; }
[data-orbit-fullscreen-details] .orbit-fullscreen-status { margin:0; font-size:10px; font-weight:500; line-height:1.3; }
[data-orbit-fullscreen-details] .orbit-fullscreen-stats { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:10px; margin:0; align-self:start; }
[data-orbit-fullscreen-details] .orbit-fullscreen-stats>div { min-width:0; text-align:left; }
[data-orbit-fullscreen-details] dt { margin:0 0 4px; font-size:9px; font-weight:400; line-height:1.3; opacity:.8; }
[data-orbit-fullscreen-details] dd { margin:0; font-size:15px; font-weight:700; line-height:1.1; letter-spacing:-.025em; white-space:nowrap; }
[data-orbit-fullscreen-details] dd small { margin-left:3px; font-size:10px; font-weight:400; }
[data-orbit-fullscreen-details] .orbit-fullscreen-plan { display:flex; flex-direction:column; align-items:center; justify-content:center; gap:5px; min-width:0; min-height:var(--orbit-fullscreen-plan-size); margin:0; }
[data-orbit-fullscreen-details] .orbit-fullscreen-plan-stage { display:grid; place-items:center; width:var(--orbit-fullscreen-plan-size); height:var(--orbit-fullscreen-plan-size); max-width:100%; }
[data-orbit-fullscreen-details] .orbit-fullscreen-plan-crop { position:relative; display:block; width:min(100%,calc(var(--orbit-fullscreen-plan-size) * var(--orbit-fullscreen-plan-aspect,.75))); max-height:100%; aspect-ratio:var(--orbit-fullscreen-plan-aspect,.75); overflow:hidden; }
[data-orbit-fullscreen-details] .orbit-fullscreen-plan img { position:absolute; display:block; max-width:none; object-fit:fill; }
[data-orbit-fullscreen-details] .orbit-fullscreen-plan figcaption { font-size:8px; font-weight:400; opacity:.8; line-height:1.2; }
[data-orbit-fullscreen-details] .orbit-fullscreen-right { display:flex; flex-direction:column; align-items:stretch; gap:10px; }
[data-orbit-fullscreen-details] .orbit-fullscreen-filters { min-width:0; pointer-events:auto; }
[data-orbit-fullscreen-details] .orbit-fullscreen-filters > [data-orbit-filters] { display:grid; grid-template-rows:52px auto; row-gap:16px; }
[data-orbit-fullscreen-details] .orbit-fullscreen-filters [data-orbit-filter-row] { align-self:start; position:relative; top:3px; }
[data-orbit-fullscreen-details] .orbit-fullscreen-filters [data-orbit-filter-ranges] { margin-top:0; position:relative; top:3px; }

[data-orbit-fullscreen-details] .orbit-fullscreen-conversion { display:flex; align-items:center; justify-content:space-between; gap:10px; min-width:0; }
[data-orbit-fullscreen-details] .orbit-fullscreen-price { margin:0; font-size:17px; font-weight:500; line-height:1.15; letter-spacing:-.035em; white-space:nowrap; }
[data-orbit-fullscreen-details] .orbit-fullscreen-price small { margin-left:3px; font-size:11px; font-weight:400; }
[data-orbit-fullscreen-details] .orbit-fullscreen-detail { display:inline-flex; align-items:center; justify-content:center; gap:10px; min-height:44px; padding:10px 16px; border:1px solid rgba(255,255,255,.85); border-radius:999px; background:#fff; color:#242824; box-shadow:0 2px 8px rgba(0,0,0,.08); font-size:11px; font-weight:600; white-space:nowrap; pointer-events:auto; transition:background .18s,box-shadow .18s; }
[data-orbit-fullscreen-details] .orbit-fullscreen-detail svg { width:15px; height:15px; flex:none; }
[data-orbit-fullscreen-details] .orbit-fullscreen-detail:active:not(:disabled),[data-orbit-fullscreen-details] .orbit-fullscreen-close:active { background:#e9ede5; box-shadow:none; }
[data-orbit-fullscreen-details] .orbit-fullscreen-empty { margin:0; padding:8px 0; text-align:left; font-size:12px; line-height:1.5; }
[data-orbit-fullscreen-details][data-compact="true"] .orbit-fullscreen-bar { --orbit-fullscreen-plan-size:148px; grid-template-columns:minmax(76px,1fr) 148px minmax(256px,1.8fr); padding:20px 16px 10px; gap:10px; }
[data-orbit-fullscreen-details][data-compact="true"] .orbit-fullscreen-stats { grid-template-columns:minmax(0,1fr); gap:5px; }
[data-orbit-fullscreen-details][data-compact="true"] .orbit-fullscreen-stats>div { display:flex; align-items:baseline; flex-wrap:wrap; gap:2px 5px; }
[data-orbit-fullscreen-details][data-compact="true"] dt { margin:0; font-size:9px; }
[data-orbit-fullscreen-details][data-compact="true"] dd { font-size:14px; }
[data-orbit-fullscreen-details][data-compact="true"] .orbit-fullscreen-right { gap:7px; }
[data-orbit-fullscreen-details][data-compact="true"] .orbit-fullscreen-id { font-size:21px; }
[data-orbit-fullscreen-details][data-compact="true"] .orbit-fullscreen-price { font-size:16px; }
[data-orbit-fullscreen-details][data-compact="true"] .orbit-fullscreen-detail { padding:9px 12px; }
@media (prefers-reduced-motion:reduce) { [data-orbit-fullscreen-details] .orbit-fullscreen-detail,[data-orbit-fullscreen-details] .orbit-fullscreen-bar,[data-orbit-fullscreen-details] [data-orbitdata-transition] { transition:none; } }
`

function OrbitFullscreenDetails({
    apartment: currentApartment,
    dataset = null,
    assetBase,
    language,
    onOpenDetails,
    moving,
    onPrevious,
    onNext,
    onClose,
    checkpoint,
    count,
    emptyMessage,
    favorites,
    groupControls,
    filters,
    filterBounds,
    filterAreaBounds = null,
    filterBedroomBounds = null,
    filterCount,
    total,
    onFiltersChange,
}: OrbitFullscreenDetailsProps) {
    const transition = useOrbitDataTransition(
        currentApartment,
        currentApartment?.id || null,
        { moving }
    )
    const apartment = transition.displayed
    const hu = language !== "en"
    const rootRef = React.useRef<HTMLDivElement>(null)
    const barRef = React.useRef<HTMLDivElement>(null)
    const [compact, setCompact] = React.useState(false)
    React.useEffect(() => {
        const root = rootRef.current
        if (!root) return
        // A short landscape phone needs the 148px plan and no secondary meta
        // so the two filter rows plus the 44px action leave room for the building.
        const update = () =>
            setCompact(root.clientWidth < 740 || root.clientHeight < 440)
        const observer = new ResizeObserver(update)
        observer.observe(root)
        update()
        return () => observer.disconnect()
    }, [])
    const number = new Intl.NumberFormat(hu ? "hu-HU" : "en-GB", {
        maximumFractionDigits: 2,
    })
    const known = (value: number | null | undefined) =>
        typeof value === "number" && Number.isFinite(value)
    const area = (value: number | null | undefined) =>
        known(value) ? (
            <>
                {number.format(value!)}
                <small>m²</small>
            </>
        ) : (
            "—"
        )
    const plan =
        apartment && dataset
            ? orbitApartmentPlan(
                  apartment,
                  dataset,
                  assetBase,
                  true
              )
            : null
    const floorplanSource =
        plan?.url ||
        (apartment &&
            orbitApartmentAssetUrl(
                apartment.media?.floorplan?.thumbnail ||
                    apartment.media?.floorplan?.full ||
                    apartment.floorplan,
                assetBase
            ))
    const floorplan = useOrbitPreviewImage(floorplanSource, true, !!plan?.isThumbnail)
    useOrbitDataDividers(
        barRef,
        ".orbit-fullscreen-plan-crop,.orbit-fullscreen-plan-stage,.orbit-fullscreen-plan",
        `${apartment?.id || ""}|${floorplan || ""}|${compact}`
    )
    const viewBox = plan?.viewBox || { x: 0, y: 0, width: 1, height: 1 }
    const planAspect = {
        "--orbit-fullscreen-plan-aspect": plan?.aspect || 0.75,
    } as React.CSSProperties
    const planStyle: React.CSSProperties = {
        left: `${(-viewBox.x / viewBox.width) * 100}%`,
        top: `${(-viewBox.y / viewBox.height) * 100}%`,
        width: `${100 / viewBox.width}%`,
        height: `${100 / viewBox.height}%`,
    }
    const logo = orbitApartmentAssetUrl(
        "assets/brand/admiral-park-full-logo-no-location.svg",
        assetBase
    )
    const state = apartment?.status
    const status =
        state === "available"
            ? hu
                ? "Elérhető"
                : "Available"
            : state === "sold"
              ? hu
                  ? "Eladva"
                  : "Sold"
              : state === "under_negotiation"
                ? hu
                    ? "Egyeztetés alatt"
                    : "In negotiation"
                : state === "reserved"
                  ? hu
                      ? "Foglalt"
                      : "Reserved"
                  : apartment?.statusLabel || ""
    const recordFade = {
        "data-orbitdata-transition": "",
        "data-orbitdata-phase": transition.phase,
        "data-orbitdata-displayed-id": apartment?.id || "",
        "data-orbitdata-visible": String(transition.visible),
        "aria-hidden": !transition.interactive,
        ...(!transition.interactive ? { inert: "" as any } : {}),
    }
    return (
        <div
            ref={rootRef}
            data-orbit-fullscreen-details=""
            data-orbit-glass-tone="overlay"
            data-compact={compact ? "true" : "false"}
            data-apartment-id={currentApartment?.id || ""}
        >
            <style dangerouslySetInnerHTML={homepageStyleMarkup(orbitFullscreenStyles)} />
            {logo && !groupControls && (
                <span
                    className="orbit-fullscreen-brand"
                    role="img"
                    aria-label="Admiral Park"
                    style={
                        {
                            "--orbit-fullscreen-logo": `url("${logo.replace(/["\\]/g, "\\$&")}")`,
                        } as React.CSSProperties
                    }
                />
            )}
            {groupControls && <div data-orbit-fullscreen-group="">{groupControls}</div>}
            {apartment && (
                <OrbitFavoriteButton apartmentId={apartment.id} favorites={favorites}
                    interactive={transition.interactive} hu={hu} />
            )}
            <button
                type="button"
                data-orbit-ignore=""
                data-orbit-fullscreen-close=""
                className="orbit-fullscreen-close"
                aria-label={
                    hu ? "Teljes képernyő bezárása" : "Close fullscreen"
                }
                onClick={onClose}
            >
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    aria-hidden="true"
                >
                    <path d="m5 5 14 14M19 5 5 19" />
                </svg>
            </button>
            <div className="orbit-fullscreen-nav" data-orbit-ignore="">
                <button
                    type="button"
                    data-orbit-fullscreen-step="previous"
                    disabled={moving}
                    aria-label={hu ? "Előző nézet" : "Previous view"}
                    onClick={onPrevious}
                >
                    ←
                </button>
                <button
                    type="button"
                    data-orbit-fullscreen-step="next"
                    disabled={moving}
                    aria-label={hu ? "Következő nézet" : "Next view"}
                    onClick={onNext}
                >
                    →
                </button>
            </div>
            <div
                ref={barRef}
                className="orbit-fullscreen-bar"
                data-orbit-ignore=""
                data-moving={moving ? "true" : "false"}
                aria-hidden={moving}
                {...(moving ? { inert: "" as any } : {})}
                aria-live="polite"
            >
                <span
                    data-orbitdata-divider="left"
                    data-info-visible={String(
                        !!apartment && transition.visible
                    )}
                    aria-hidden="true"
                />
                <span
                    data-orbitdata-divider="right"
                    data-info-visible={String(
                        !!apartment && transition.visible
                    )}
                    aria-hidden="true"
                />
                {apartment ? (
                    <>
                        <div className="orbit-fullscreen-left" {...recordFade}>
                            <div className="orbit-fullscreen-identity"
                            data-orbit-glass-pod="identity">
                                <p
                                    className="orbit-fullscreen-id"
                                    data-orbit-fullscreen-field="number"
                                >
                                    {apartment.id}
                                </p>
                                <p
                                    className="orbit-fullscreen-status"
                                    data-status={state}
                                    data-orbit-fullscreen-field="status"
                                    style={{
                                        color: orbitAvailabilityColor(state),
                                    }}
                                >
                                    {status}
                                </p>
                            </div>
                            <dl className="orbit-fullscreen-stats"
                            data-orbit-glass-pod="facts">
                                <div data-orbit-fullscreen-field="area">
                                    <dt>{hu ? "Lakótér" : "Interior"}</dt>
                                    <dd>{area(apartment.areaInterior)}</dd>
                                </div>
                                <div data-orbit-fullscreen-field="terrace">
                                    <dt>{hu ? "Terasz" : "Terrace"}</dt>
                                    <dd>{area(apartment.areaTerrace)}</dd>
                                </div>
                                {known(apartment.areaGarden) && apartment.areaGarden! > 0 && (
                                <div data-orbit-fullscreen-field="garden">
                                    <dt>{hu ? "Kert" : "Garden"}</dt>
                                    <dd>{area(apartment.areaGarden)}</dd>
                                </div>
                                )}
                                <OrbitBedroomMetric apartment={apartment} hu={hu} number={number} />
                            </dl>
                        </div>
                        <figure
                            className="orbit-fullscreen-plan"
                            data-orbit-fullscreen-field="floorplan"
                            style={planAspect}
                            {...recordFade}
                        >
                            <span className="orbit-fullscreen-plan-stage"
                            data-orbit-glass-pod="plan">
                                {floorplan && (
                                    <span
                                        className="orbit-fullscreen-plan-crop"
                                        data-orbit-plan-crop=""
                                    >
                                        <img
                                            src={floorplan}
                                            style={planStyle}
                                            alt={`${apartment.id} · ${hu ? "alaprajz" : "floorplan"}`}
                                            decoding="async"
                                            draggable={false}
                                        />
                                    </span>
                                )}
                            </span>
                        </figure>
                    </>
                ) : (
                    <>
                        <p className="orbit-fullscreen-empty">
                            {emptyMessage ||
                                (hu
                                    ? "Koppintson egy lakásra a részletekhez."
                                    : "Tap an apartment to see its details.")}
                        </p>
                        <div
                            className="orbit-fullscreen-plan"
                            aria-hidden="true"
                        />
                    </>
                )}
                <div className="orbit-fullscreen-right">
                    <div className="orbit-fullscreen-filters">
                        {!groupControls && (<OrbitFilterBar
                            active={!moving}
                            visible={true}
                            language={language}
                            filters={filters}
                            bounds={filterBounds}
                            areaBounds={filterAreaBounds}
                            bedroomBounds={filterBedroomBounds}
                            matchCount={filterCount}
                            total={total}
                            onChange={onFiltersChange}
                            presentation="overlay"
                        />)}
                    </div>
                    {apartment && (
                        <>
                            <div
                                className="orbit-fullscreen-conversion"
                            data-orbit-glass-pod="conversion"
                                {...recordFade}
                            >
                                <p
                                    className="orbit-fullscreen-price"
                                    data-orbit-fullscreen-field="price"
                                >
                                    {known(apartment.price) ? (
                                        apartment.currency === "HUF" ? (
                                            <>
                                                {number.format(apartment.price!)}
                                                <small>Ft</small>
                                            </>
                                        ) : (
                                            number.format(apartment.price!) +
                                            " " +
                                            apartment.currency
                                        )
                                    ) : hu ? (
                                        "Ár kérésre"
                                    ) : (
                                        "Price on request"
                                    )}
                                </p>
                                <button
                                    type="button"
                                    className="orbit-fullscreen-detail"
                                    data-orbit-detail-link=""
                                    disabled={!transition.interactive}
                                    onClick={() => {
                                        if (transition.interactive)
                                            onOpenDetails()
                                    }}
                                >
                                    {hu ? "Adatlap" : "Apartment details"}
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.7"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        aria-hidden="true"
                                        focusable="false"
                                    >
                                        <path d="M5 12h14m-6-6 6 6-6 6" />
                                    </svg>
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
            <span
                style={{
                    position: "absolute",
                    width: 1,
                    height: 1,
                    overflow: "hidden",
                    clipPath: "inset(50%)",
                }}
                role="status"
            >
                {checkpoint >= 0
                    ? `${hu ? "Nézet" : "View"} ${checkpoint + 1} / ${count}`
                    : hu
                      ? "Nézetváltás"
                      : "Moving to next view"}
            </span>
        </div>
    )
}

/**
 * @framerSupportedLayoutWidth any-prefer-fixed
 * @framerSupportedLayoutHeight any-prefer-fixed
 * @framerIntrinsicWidth 1440
 * @framerIntrinsicHeight 900
 */
export default function AdmiralHomepageStudio(
    props: AdmiralHomepageTrialProps
): React.JSX.Element {
    const {
        useGitHubAssets = true,
        gardenTitle = defaultGardenTitle,
        gardenBody = defaultGardenBody,
        heroBaseUrl = "",
        connectionBaseUrl = "",
        orbitBaseUrl = "",
        sharpCheckpointUrls = HOMEPAGE_EMPTY_CHECKPOINT_URLS,
        startView = "opening",
        editorView = "opening",
        editorOrbitView = "entry",
        orbitStartFrame = 45,
        maskPicking = true,
        apartmentLighting = true,
        apartmentLightingAtlas = HOMEPAGE_LIGHTING_ATLAS_URL,
        apartmentLightingData = HOMEPAGE_LIGHTING_DATA_URL,
        maskBaseUrl = "",
        maskHighlightColor = "#f8d68b",
        maskHighlightOpacity = 50,
        maskAvailableColor = "#46A66A",
        maskNegotiationColor = "#E2B849",
        maskSoldColor = "#DA5961",
        duration = 2.5,
        connectionDuration = 2.5,
        maxSpeed = 1.8,
        momentum = 0.22,
        triggerDistance = 28,
        checkpointCount = 8,
        motionWidth = 960,
        orbitMobileWidth = 640,
        inspectionWidth = 1920,
        desktopBuffer = 1,
        phoneBuffer = 1,
        dragTurnWidths = 2,
        dragMaxCheckpointsPerSecond = 1.5,
        dragReleaseDuration = .35,
        snapDuration = 1.2,
        frameBlend = 0,
        checkpointFadeSeconds = 0,
        phoneFraming = true,
        phoneImageWidth = 100,
        phoneImageTop = 80,
        orbitStories = true,
        fadeExtension = .5,
        storyIn = .6,
        storyOut = .3,
        storyDelay = 0.12,
        storyView1,
        storyView2,
        storyView3,
        storyView4,
        storyView5,
        storyView6,
        storyView7,
        storyView8,
        focalX = 50,
        focalY = 50,
        darken = 0,
        showControls = true,
        showViewpoints = true,
        showDiagnostics = false,
        contentFadeDuration = .8,
        openingLogoMotion,
        openingTextMotion,
        openingScrollMotion,
        openingOut = 20,
        openingZoom = 16,
        buildingIn = 68,
        buildingFull = 88,
        ctaIn = 86,
        rise = 20,
        detailsMode = "preview",
        detailsLanguage = "hu",
        detailsBottom = 32,
        detailsInset = 48,
        apartmentPreview,
        orbitLayout = "studio",
        apartmentDataUrl = "https://raw.githubusercontent.com/UnbuiltMarket/admiral-park/main/data/apartments.json",
        apartmentAssetBase = HOMEPAGE_ASSETS + "/apartment-list/",
        previewApartmentId = "A001",
        detailPageUrl = "/lista",
        inquiryUrl = "",
        orbitBackground = "#fff",
        pageBackdrop = false,
        detailDataUrl = "https://raw.githubusercontent.com/UnbuiltMarket/admiral-park/main/data/apartment-details.json",
        background = "#101820",
        alt = "Explore Admiral Park, Balatonfüred",
        style,
    } = props
    const studioTint = orbitBackground === "#fdfbfb" ? "#fff" : orbitBackground
    // Framer may pass a colour control as rgb()/rgba() rather than its saved hex.
    const backdropHex = studioTint.trim().toLowerCase()
    // Keep existing Framer instances that saved the former silver-blue swatch.
    const blueStudio = pageBackdrop || backdropHex === orbitBlueBackdrop || backdropHex === "#ccd7de" ||
        /^rgba?\(\s*212(?:\s*,\s*|\s+)222(?:\s*,\s*|\s+)228(?:\s*[,/]\s*1(?:\.0*)?)?\s*\)$/i.test(studioTint) ||
        /^rgba?\(\s*204(?:\s*,\s*|\s+)215(?:\s*,\s*|\s+)222(?:\s*[,/]\s*1(?:\.0*)?)?\s*\)$/i.test(studioTint)
    const studioBackdrop = blueStudio ? `${orbitBlueWatermark}, ${orbitBlueGradient}`
        : /^#(?:fff|ffffff)$/i.test(studioTint)
        ? "linear-gradient(155deg, #fff 0%, #f9fcfd 43%, #e0edf2 100%)"
        : `linear-gradient(155deg, ${studioTint} 0%, color-mix(in srgb, ${studioTint} 88%, white) 43%, color-mix(in srgb, ${studioTint} 78%, #b7d1e6) 100%)`
    const openingMotion = React.useMemo(
        () => homepageOpeningMotion(openingLogoMotion, openingTextMotion, openingScrollMotion, openingOut, openingZoom),
        [openingLogoMotion, openingTextMotion, openingScrollMotion, openingOut, openingZoom]
    )
    const fadeExtra = homepageFadeSeconds(fadeExtension)
    const fadeExtensionRef = React.useRef(fadeExtra)
    fadeExtensionRef.current = fadeExtra
    const staticRenderer = useIsStaticRenderer()
    const [imageFormat, setImageFormat] = React.useState<OrbitImageFormat | null>(null)
    React.useEffect(() => {
        if (staticRenderer || !useGitHubAssets) return
        let mounted = true
        void orbitImageFormat().then(format => { if (mounted) setImageFormat(format) })
        return () => { mounted = false }
    }, [staticRenderer, useGitHubAssets])
    const useWebp = useGitHubAssets && imageFormat === "webp"
    const waitingForFormat = useGitHubAssets && !staticRenderer && !imageFormat
    const favorites = useOrbitFavorites(!staticRenderer)
    const heroUrls = React.useMemo(
        () =>
            homepageUrls(
                useGitHubAssets
                    ? HOMEPAGE_ASSETS +
                          "/images/AVIF%2030_1920x1010%20DESKTOP%20HERO%20SEQUENCE"
                    : heroBaseUrl,
                HOMEPAGE_HERO_NAMES,
                useGitHubAssets ? HOMEPAGE_HERO_VERSION : ""
            ),
        [useGitHubAssets, heroBaseUrl]
    )
    const connectionUrls = React.useMemo(
        () =>
            homepageUrls(
                useGitHubAssets
                    ? HOMEPAGE_ASSETS + "/images/SEQ_02_V01"
                    : connectionBaseUrl,
                HOMEPAGE_CONNECTION_NAMES,
                useGitHubAssets ? HOMEPAGE_CONNECTION_VERSION : ""
            ),
        [useGitHubAssets, connectionBaseUrl]
    )
    const heroVideoUrl = useGitHubAssets ? HOMEPAGE_HERO_VIDEO : ""
    const connectionVideoUrl = useGitHubAssets ? HOMEPAGE_CONNECTION_VIDEO : ""
    const heroStartPoster = useWebp ? ORBIT_WEBP_BASE + "/stills/seq01-start.webp" : heroVideoUrl ? HOMEPAGE_HERO_VIDEO_START : heroUrls[0]
    const heroEndPoster = useWebp ? ORBIT_WEBP_BASE + "/stills/seq01-end.webp" : heroVideoUrl ? HOMEPAGE_HERO_VIDEO_END : heroUrls[heroUrls.length - 1]
    const connectionEndPoster = useWebp ? ORBIT_WEBP_BASE + "/stills/seq02-end.webp" : HOMEPAGE_CONNECTION_END
    // Use the actual SEQ_01 endpoint for the existing SEQ_02 dissolve.
    const connectionPlaybackUrls = React.useMemo(
        () => [heroEndPoster, ...connectionUrls],
        [heroEndPoster, connectionUrls]
    )
    const orbitUrls = React.useMemo(() => {
        if (!useGitHubAssets) return homepageUrls(orbitBaseUrl, HOMEPAGE_ORBIT_NAMES)
        return useWebp ? HOMEPAGE_ORBIT_MOVEMENT.map((_, frame) => orbitWebpFrame("movement", frame)) : HOMEPAGE_ORBIT_MOVEMENT
    }, [useGitHubAssets, useWebp, orbitBaseUrl])
    const defaultCheckpointUrls = React.useMemo(() => {
        const folder = useWebp ? "orbit-compat-v06" : "orbit-v06"
        const extension = useWebp ? "webp" : "avif"
        return Array.from({ length: 8 }, (_, camera) => {
            const frame = String(camera * 15).padStart(4, "0")
            return ORBIT_CHECKPOINT_ASSETS + "/" + folder + "/checkpoints/" + frame + "." + extension
        })
    }, [useWebp])
    const checkpointZeroPoster = defaultCheckpointUrls[0]
    const checkpointInspectionUrls = React.useMemo(() => {
        if (checkpointCount !== 8) return []
        const sources = useGitHubAssets && !sharpCheckpointUrls.length ? defaultCheckpointUrls : sharpCheckpointUrls
        return Array.from({length:8}, (_,index)=> typeof sources[index] === "string" ? sources[index].trim() : "")
    }, [useGitHubAssets, defaultCheckpointUrls, sharpCheckpointUrls, checkpointCount])
    const maskUrls = React.useMemo(() => useGitHubAssets
        ? HOMEPAGE_V05_MASKS : maskBaseUrl.trim() ? homepageUrls(maskBaseUrl, HOMEPAGE_MASK_NAMES) : [],
        [useGitHubAssets, maskBaseUrl])
    const orbitStartIndex = Math.round(
        Math.max(
            0,
            Math.min(
                orbitUrls.length - 1,
                Number.isFinite(orbitStartFrame) ? orbitStartFrame : 45
            )
        )
    )
    const parkedPoster = React.useCallback((frame: number) => {
        const camera = frame * checkpointCount / orbitUrls.length
        return (Number.isInteger(camera) && checkpointInspectionUrls[camera]) || orbitUrls[frame]
    }, [checkpointCount, checkpointInspectionUrls, orbitUrls])
    const orbitPoster = parkedPoster(orbitStartIndex)
    const editorViewNumber = /^[1-8]$/.test(editorOrbitView)
        ? Number(editorOrbitView)
        : 0
    const editorPreviewFrame =
        staticRenderer && editorViewNumber
            ? Math.round(((editorViewNumber - 1) * orbitUrls.length) / 8)
            : orbitStartIndex
    const previewStage: HomepageStage = staticRenderer
        ? editorView === "orbit"
            ? "orbit"
            : editorView === "building"
              ? "building"
              : editorView === "connection"
                ? "connection"
                : "opening"
        : startView === "orbit"
          ? "handoff"
          : "opening"
    const initialPoster =
        staticRenderer && editorView === "connection"
            ? (connectionVideoUrl ? connectionEndPoster : connectionUrls[Math.floor(connectionUrls.length / 2)])
            : staticRenderer && editorView === "building"
              ? heroEndPoster
              : staticRenderer && editorView === "orbit"
                ? parkedPoster(editorPreviewFrame)
                : !staticRenderer && startView === "orbit"
                  ? orbitPoster
                  : heroStartPoster
    const [stage, setStage] = React.useState<HomepageStage>(previewStage)
    const [requestedPoster, setPosterUrl] = React.useState<string | null>(null)
    const posterUrl = requestedPoster ?? initialPoster
    const [homepageBooted, setHomepageBooted] = React.useState(false)
    const [directOrbitEntry, setDirectOrbitEntry] = React.useState<{
        poster: string
        framed: boolean
    } | null>(null)
    const apartmentOrbitAvailable = maskPicking && checkpointCount === 8 && maskUrls.length === 8
    useHomepageLayoutEffect(() => {
        if (staticRenderer) return
        const url = new URL(window.location.href)
        if (url.hash.toLowerCase() === homepageOrbitHash) {
            const group = apartmentOrbitAvailable ? homepageOrbitGroup(url) : null
            const id = homepageOrbitApartment(url)
            const frame = group ? bestOrbitGroupFrame(group.ids) ?? orbitStartIndex
                : id && apartmentOrbitAvailable ? orbitApartmentCameras[id][0] : orbitStartIndex
            setDirectOrbitEntry({ poster: parkedPoster(frame), framed: false })
            setStage("handoff")
        }
        setHomepageBooted(true)
    }, [orbitStartIndex, parkedPoster, apartmentOrbitAvailable, staticRenderer])
    const [heroState, setHeroState] = React.useState<SequenceState>("opening")
    const [orbitInfo, setOrbitInfo] = React.useState<OrbitSnapshot>({
        state: "idle",
        frame: orbitStartIndex,
        checkpoint: -1,
        direction: 1,
        ready: 0,
        total: orbitUrls.length,
        decoded: 0,
        downloaded: 0,
        buffered: 0,
        bufferTotal: 0,
        requiredReady: 0,
        requiredTotal: 0,
        position: orbitStartIndex,
        userPaused: false,
        suspended: false,
    })
    const [reduced, setReduced] = React.useState(false)
    const [hostVisible, setHostVisible] = React.useState(false)
    const [hostRendered, setHostRendered] = React.useState(false)
    // Keep the camera and its buffers while the visitor scrolls below it.
    const hostActive = hostVisible || (hostRendered && stage === "orbit")
    const [detailsHeight, setDetailsHeight] = React.useState(140)
    const [mobilePresentation, setMobilePresentation] = React.useState(false)
    const [maskFailed, setMaskFailed] = React.useState(false)
    const useStudio =
        (orbitLayout === "studio" ||
            (orbitLayout === "mobile" && mobilePresentation)) &&
        detailsMode !== "off"
    // Every orbit layout uses real apartment IDs so its floorplan opens the shared card.
    const jsonDetails = detailsMode !== "off"
    const [selectedApartmentId, setSelectedApartmentId] = React.useState<
        string | null
    >(null)
    const [interactionApartmentId, setInteractionApartmentId] = React.useState<
        string | null
    >(null)
    // Keep a real, visible selection after the pointer leaves the facade.
    const [visibleMaskApartments, setVisibleMaskApartments] = React.useState<{
        checkpoint: number
        ids: readonly string[]
    } | null>(null)
    const [apartmentFilters, setApartmentFilters] =
        React.useState<OrbitApartmentFilters>({
            statuses: [],
            priceMin: null,
            priceMax: null,
        })
    const [detailApartmentId, setDetailApartmentId] = React.useState<
        string | null
    >(null)
    const detailOpen = React.useRef(false)
    const [orbitGroup, setOrbitGroup] = React.useState<OrbitApartmentGroup | null>(null)
    const [groupRequest, setGroupRequest] = React.useState<{ id: string; tried: number[] } | null>(null)
    const [orbitApartmentTarget, setOrbitApartmentTarget] = React.useState<{
        id: string
        checkpoint: number
    } | null>(null)
    const apartmentData = useOrbitApartments(
        apartmentDataUrl,
        jsonDetails &&
            ((staticRenderer && editorView === "orbit") ||
                (hostVisible &&
                    ["building", "connection", "orbitApproach", "handoff", "orbit"].includes(
                        stage
                    )))
    )
    const filterBounds = React.useMemo(
        () => getOrbitPriceBounds(apartmentData.dataset?.apartments || []),
        [apartmentData.dataset]
    )
    const filterAreaBounds = React.useMemo(
        () => getOrbitAreaBounds(apartmentData.dataset?.apartments || []),
        [apartmentData.dataset]
    )
    const filterBedroomBounds = React.useMemo(
        () => getOrbitBedroomBounds(apartmentData.dataset?.apartments || []),
        [apartmentData.dataset]
    )
    const filterResult = React.useMemo(
        () =>
            getOrbitFilterResult(
                apartmentData.dataset?.apartments || [],
                apartmentFilters,
                filterBounds,
                filterAreaBounds,
                filterBedroomBounds
            ),
        [
            apartmentData.dataset,
            apartmentFilters,
            filterBounds,
            filterAreaBounds,
            filterBedroomBounds,
        ]
    )
    const filterMatches = React.useMemo(
        () => new Set(filterResult.matchingIds),
        [filterResult]
    )
    const useVisibleMaskSelection = !staticRenderer && apartmentOrbitAvailable
    const visibleGroupIds = React.useMemo(() =>
        orbitGroup && orbitInfo.state === "checkpoint" && visibleMaskApartments?.checkpoint === orbitInfo.checkpoint
            ? orbitGroup.ids.filter(id => visibleMaskApartments.ids.includes(id))
            : [],
        [orbitGroup, orbitInfo.state, orbitInfo.checkpoint, visibleMaskApartments]
    )
    const selectedApartment = React.useMemo(() => {
        const visible = useVisibleMaskSelection
            ? visibleMaskApartments?.checkpoint === orbitInfo.checkpoint
                ? visibleMaskApartments.ids
                : []
            : null
        const records = (apartmentData.dataset?.apartments || []).filter(
            (item) => filterMatches.has(item.id) &&
                (orbitGroup ? visibleGroupIds.includes(item.id) : (!visible || visible.includes(item.id)))
        )
        return records.find((item) => item.id === selectedApartmentId) ||
            (orbitGroup ? records.find((item) => item.id === visibleGroupIds[0]) : null) ||
            records.find((item) => item.id === previewApartmentId) || records[0] || null
    }, [
        apartmentData.dataset, selectedApartmentId, previewApartmentId,
        filterMatches, useVisibleMaskSelection, visibleMaskApartments, orbitInfo.checkpoint,
        orbitGroup, visibleGroupIds,
    ])
    React.useEffect(() => {
        if (
            !jsonDetails || !useVisibleMaskSelection || stage !== "orbit" ||
            orbitInfo.state !== "checkpoint" ||
            visibleMaskApartments?.checkpoint !== orbitInfo.checkpoint
        ) return
        const visible = (orbitGroup ? visibleGroupIds : visibleMaskApartments.ids).filter((id) => filterMatches.has(id))
        setSelectedApartmentId((current) =>
            current && visible.includes(current) ? current :
            visible.includes(previewApartmentId) ? previewApartmentId : visible[0] || null
        )
        setInteractionApartmentId((current) =>
            current && visible.includes(current) ? current : null
        )
    }, [
        jsonDetails, useVisibleMaskSelection, stage, orbitInfo.state, orbitInfo.checkpoint,
        visibleMaskApartments, filterMatches, previewApartmentId, selectedApartmentId, orbitGroup, visibleGroupIds,
    ])
    React.useEffect(() => {
        if (!useVisibleMaskSelection && selectedApartmentId && !filterMatches.has(selectedApartmentId))
            setSelectedApartmentId(null)
        if (interactionApartmentId && !filterMatches.has(interactionApartmentId))
            setInteractionApartmentId(null)
    }, [filterMatches, selectedApartmentId, interactionApartmentId, useVisibleMaskSelection])
    React.useEffect(() => {
        const target = orbitApartmentTarget
        if (!target || stage !== "orbit" || orbitInfo.state !== "checkpoint" ||
            orbitInfo.checkpoint !== target.checkpoint ||
            visibleMaskApartments?.checkpoint !== target.checkpoint ||
            !apartmentData.dataset || filterResult.active)
            return
        if (visibleMaskApartments.ids.includes(target.id) && filterMatches.has(target.id))
            setSelectedApartmentId(target.id)
        setOrbitApartmentTarget(null)
    }, [
        orbitApartmentTarget, stage, orbitInfo.state, orbitInfo.checkpoint,
        visibleMaskApartments, apartmentData.dataset, filterMatches, filterResult.active,
    ])
    const selectedApartmentDetails = React.useMemo<ApartmentDetailsData | null>(
        () =>
            selectedApartment
                ? {
                      id: selectedApartment.id,
                      number: selectedApartment.id,
                      area: selectedApartment.areaInterior,
                      terrace: selectedApartment.areaTerrace,
                      garden: selectedApartment.areaGarden,
                      rooms: selectedApartment.rooms,
                      availability: selectedApartment.status,
                      floorplanUrl:
                          orbitApartmentAssetUrl(
                              selectedApartment.media?.floorplan?.thumbnail ||
                                  selectedApartment.media?.floorplan?.full ||
                                  selectedApartment.floorplan ||
                                  "",
                              apartmentAssetBase
                          ) || undefined,
                  }
                : null,
        [selectedApartment, apartmentAssetBase, detailsLanguage]
    )
    const clearApartmentDetails = React.useCallback(() => {
        setInteractionApartmentId(null)
        setSelectedApartmentId(null)
    }, [])
    const rootRef = React.useRef<HTMLDivElement>(null),
        heroRootRef = React.useRef<HTMLDivElement>(null)
    const heroVideoRef = React.useRef<HTMLVideoElement>(null)
    const connectionVideoRef = React.useRef<HTMLVideoElement>(null)
    const heroEndLayerRef = React.useRef<HTMLImageElement>(null)
    const heroInfographicRef = React.useRef<HTMLImageElement>(null)
    const heroCanvasRef = React.useRef<HTMLCanvasElement>(null),
        orbitCanvasRef = React.useRef<HTMLCanvasElement>(null),
        posterRef = React.useRef<HTMLImageElement>(null)
    const maskCanvasRef = React.useRef<HTMLCanvasElement>(null)
    const maskPickerRef = React.useRef<ReturnType<
        typeof createOrbitApartmentPicker
    > | null>(null)
    const actions = React.useRef<HomepageActions | null>(null)
    useHomepageLayoutEffect(() => {
        const image = posterRef.current
        if (!heroVideoUrl || !image || image.complete || image.getAttribute("src") !== heroStartPoster ||
            window.location.hash.toLowerCase() === homepageOrbitHash) return
        let refinement: Animation | undefined
        const revealSharpFrame = () => {
            if (image.getAttribute("src") !== heroStartPoster || rootRef.current?.dataset.homepageStage !== "opening" ||
                matchMedia("(prefers-reduced-motion: reduce)").matches) return
            refinement = image.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 160, easing: "ease-out" })
        }
        image.addEventListener("load", revealSharpFrame, { once: true })
        return () => {
            image.removeEventListener("load", revealSharpFrame)
            refinement?.cancel()
        }
    }, [heroStartPoster, heroVideoUrl])
    React.useEffect(() => {
        if (!orbitGroup || !groupRequest || stage !== "orbit" ||
            orbitInfo.state !== "checkpoint" || detailOpen.current ||
            visibleMaskApartments?.checkpoint !== orbitInfo.checkpoint)
            return
        const { id, tried } = groupRequest
        if (visibleGroupIds.includes(id)) {
            setSelectedApartmentId(id)
            setGroupRequest(null)
            return
        }
        const visited = [...tried, orbitInfo.frame]
        const frame = bestOrbitGroupFrame(orbitGroup.ids, id, visited)
        if (frame === undefined) {
            setGroupRequest(null)
            return
        }
        const player = actions.current?.orbit
        if (player?.snapshot().state !== "checkpoint") return
        player.setCheckpoint(orbitGroupFrames.indexOf(frame))
        setGroupRequest({ id, tried: visited })
    }, [
        orbitGroup, groupRequest, stage, orbitInfo.state, orbitInfo.checkpoint, orbitInfo.frame,
        visibleMaskApartments, visibleGroupIds,
    ])
    function selectOrbitGroupApartment(id: string) {
        if (visibleGroupIds.includes(id)) {
            setSelectedApartmentId(id)
            setGroupRequest(null)
        } else setGroupRequest({ id, tried: [] })
    }
    const openApartmentDetails = React.useCallback(
        (id?: string) => {
            const value = id || selectedApartment?.id,
                root = rootRef.current
            if (
                !jsonDetails ||
                staticRenderer ||
                !value ||
                !filterMatches.has(value) ||
                !apartmentData.dataset?.apartments.some(
                    (apartment) => apartment.id === value
                ) ||
                !root ||
                root.dataset.homepageStage !== "orbit" ||
                root.dataset.orbitState !== "checkpoint" ||
                Number(root.dataset.orbitCheckpoint) < 0
            )
                return
            setSelectedApartmentId(value)
            detailOpen.current = true
            actions.current?.orbit?.setSuspended(true)
            setDetailApartmentId(value)
        },
        [
            jsonDetails,
            staticRenderer,
            selectedApartment?.id,
            apartmentData.dataset,
            filterMatches,
        ]
    )
    const closeApartmentDetails = React.useCallback(() => {
        detailOpen.current = false
        setDetailApartmentId(null)
        actions.current?.orbit?.setSuspended(false)
        setInteractionApartmentId(null)
    }, [])
    const reportDetailOpen = React.useCallback((open: boolean) => {
        if (rootRef.current)
            rootRef.current.dataset.apartmentDetailOpen = String(open)
    }, [])
    const studioViewportRef = React.useRef<HTMLDivElement | null>(null)
    const wheelCursorRef = React.useRef<HTMLSpanElement | null>(null)
    const studioEnabled = React.useRef(useStudio)
    studioEnabled.current = useStudio
    const framingConfig = React.useRef<HomepageFramingConfig>({
        enabled: phoneFraming,
        sourceWidth: phoneImageWidth,
        top: phoneImageTop,
        detailsHeight,
        detailsBottom,
        reserveDetails: detailsMode !== "off",
    })
    framingConfig.current = {
        enabled: phoneFraming,
        sourceWidth: phoneImageWidth,
        top: phoneImageTop,
        detailsHeight,
        detailsBottom,
        reserveDetails: detailsMode !== "off",
    }
    const refreshPresentation = React.useRef<() => void>(() => {})
    const refreshFullscreenLayout = React.useCallback(() => {
        // Cancel a finger gesture across a mode/size change, retaining the
        // current camera, compressed downloads and bounded decoded cache.
        actions.current?.orbit?.setSuspended(true)
        refreshPresentation.current()
        actions.current?.orbit?.setSuspended(detailOpen.current)
    }, [])
    const fullscreen = useOrbitFullscreen(refreshFullscreenLayout, detailOpen)
    const apartmentHighlightColors = React.useMemo(
        () =>
            new Map(
                (apartmentData.dataset?.apartments || []).flatMap(
                    (apartment) => {
                        const color =
                            apartment.status === "available"
                                ? maskAvailableColor
                                : apartment.status === "sold"
                                  ? maskSoldColor
                                  : apartment.status === "under_negotiation" ||
                                      apartment.status === "reserved"
                                    ? maskNegotiationColor
                                    : null
                        return color ? [[apartment.id, color] as const] : []
                    }
                )
            ),
        [
            apartmentData.dataset,
            maskAvailableColor,
            maskNegotiationColor,
            maskSoldColor,
        ]
    )
    const apartmentLightTints = React.useMemo(() => {
        const tints = new Map<string, string | null>()
        for (const apartment of apartmentData.dataset?.apartments || []) {
            // Preserve the rendered colour for available apartments.
            if (apartment.status === "available") tints.set(apartment.id, null)
            else if (apartment.status === "sold") tints.set(apartment.id, maskSoldColor)
            else if (apartment.status === "under_negotiation" || apartment.status === "reserved")
                tints.set(apartment.id, maskNegotiationColor)
        }
        return tints
    }, [apartmentData.dataset, maskSoldColor, maskNegotiationColor])
    const soldLightIds = React.useMemo(() => new Set((apartmentData.dataset?.apartments || []).filter(apartment => apartment.status === "sold").map(apartment => apartment.id)), [apartmentData.dataset])
    const pickerLatest = React.useRef({
        hostVisible,
        mobilePresentation,
        focalX,
        focalY,
        filterResult,
        jsonDetails,
        apartmentHighlightColors,
        apartmentLightTints,
        soldLightIds,
        orbitGroup,
    })
    pickerLatest.current = {
        hostVisible,
        mobilePresentation,
        focalX,
        focalY,
        filterResult,
        jsonDetails,
        apartmentHighlightColors,
        apartmentLightTints,
        soldLightIds,
        orbitGroup,
    }
    const pickerStyle = React.useRef({
        color: maskHighlightColor,
        opacity: maskHighlightOpacity / 100,
    })
    pickerStyle.current = {
        color: maskHighlightColor,
        opacity: maskHighlightOpacity / 100,
    }

    React.useEffect(() => {
        const root = rootRef.current,
            canvas = maskCanvasRef.current
        if (
            !root ||
            !canvas ||
            staticRenderer ||
            !maskPicking ||
            checkpointCount !== 8 ||
            maskUrls.length !== 8
        )
            return
        const picker = createOrbitApartmentPicker({
            root,
            canvas,
            urls: maskUrls,
            palette: HOMEPAGE_MASK_PALETTE,
            lightingEnabled: apartmentLighting,
            lightingAtlasUrl: apartmentLightingAtlas,
            lightingDataUrl: apartmentLightingData,
            lightingFrame: 45,
            sceneLighting: useGitHubAssets && apartmentLightingAtlas === HOMEPAGE_LIGHTING_ATLAS_URL && apartmentLightingData === HOMEPAGE_LIGHTING_DATA_URL,
            highlightColor: pickerStyle.current.color,
            highlightOpacity: pickerStyle.current.opacity,
            getView: () => {
                const latest = pickerLatest.current,
                    geometry = fullscreen.geometryRef.current
                const width = geometry?.width || root.clientWidth,
                    height = geometry?.height || root.clientHeight
                const value = (name: string, fallback: number) => {
                    const number = parseFloat(root.style.getPropertyValue(name))
                    return Number.isFinite(number) ? number : fallback
                }
                return {
                    enabled:
                        latest.hostVisible &&
                        latest.jsonDetails &&
                        root.dataset.homepageStage === "orbit",
                    checkpoint: Number(root.dataset.orbitCheckpoint ?? -1),
                    moving: root.dataset.orbitState !== "checkpoint",
                    suspended: detailOpen.current,
                    mobile: latest.mobilePresentation,
                    width,
                    height,
                    viewport: geometry
                        ? { x: 0, y: 0, width, height }
                        : {
                              x: value("--admiral-image-x", 0),
                              y: value("--admiral-image-y", 0),
                              width: value("--admiral-image-width", width),
                              height: value("--admiral-image-height", height),
                          },
                    focalX: latest.focalX / 100,
                    focalY: latest.focalY / 100,
                }
            },
            inputPoint: (clientX, clientY) => {
                const geometry = fullscreen.geometryRef.current
                if (geometry) {
                    const { physical, width, height, rotated } = geometry,
                        x = clientX - physical.left,
                        y = clientY - physical.top
                    return rotated
                        ? {
                              x: (y * width) / physical.height,
                              y: height - (x * height) / physical.width,
                          }
                        : {
                              x: (x * width) / physical.width,
                              y: (y * height) / physical.height,
                          }
                }
                const bounds = root.getBoundingClientRect()
                return {
                    x:
                        ((clientX - bounds.left) * root.clientWidth) /
                        Math.max(1, bounds.width),
                    y:
                        ((clientY - bounds.top) * root.clientHeight) /
                        Math.max(1, bounds.height),
                }
            },
            getAllowedIds: () => pickerLatest.current.orbitGroup?.ids ?? pickerLatest.current.filterResult.matchingIds,
            getHighlightColor: (id) =>
                pickerLatest.current.apartmentHighlightColors.get(id),
            isSold: (id) => pickerLatest.current.soldLightIds.has(id),
            getLightTint: (id) => pickerLatest.current.apartmentLightTints.get(id),
            isFilterActive: () =>
                !!pickerLatest.current.orbitGroup || pickerLatest.current.filterResult.active,
            getHighlightIds: () => {
                try {
                    return JSON.parse(
                        root.dataset.orbitHighlightIds || "[]"
                    ) as string[]
                } catch {
                    return []
                }
            },
            onVisibleApartments: (checkpoint, ids) => {
                setVisibleMaskApartments((current) =>
                    current?.checkpoint === checkpoint &&
                    current.ids.length === ids.length &&
                    current.ids.every((id, index) => id === ids[index])
                        ? current : { checkpoint, ids }
                )
            },
            onHover: (id) => {
                // The card owns its ID independently while picking is suspended.
                // Its transient null hover must not change the open datasheet.
                if (id === null && detailOpen.current) return
                root.dispatchEvent(
                    new CustomEvent("admiral:apartment-hover", {
                        detail: { id },
                    })
                )
            },
            onPick: (id) =>
                root.dispatchEvent(
                    new CustomEvent("admiral:apartment-click", {
                        detail: { id },
                    })
                ),
        })
        maskPickerRef.current = picker
        const refresh = () => picker.refresh(),
            retry = () => picker.retry(),
            observer = new ResizeObserver(refresh)
        const status = new MutationObserver(() =>
            setMaskFailed(root.dataset.orbitMaskState === "error")
        )
        status.observe(root, {
            attributes: true,
            attributeFilter: ["data-orbit-mask-state"],
        })
        root.addEventListener("admiral:orbit-filter-change", refresh)
        root.addEventListener("admiral:orbit-mask-retry", retry)
        observer.observe(root)
        picker.refresh()
        return () => {
            observer.disconnect()
            status.disconnect()
            root.removeEventListener("admiral:orbit-filter-change", refresh)
            root.removeEventListener("admiral:orbit-mask-retry", retry)
            picker.destroy()
            setMaskFailed(false)
            if (maskPickerRef.current === picker) maskPickerRef.current = null
        }
    }, [staticRenderer, maskPicking, checkpointCount, maskUrls, useGitHubAssets, apartmentLighting, apartmentLightingAtlas, apartmentLightingData])
    React.useEffect(() => {
        maskPickerRef.current?.setHighlightStyle(
            maskHighlightColor,
            maskHighlightOpacity / 100
        )
    }, [
        maskHighlightColor,
        maskHighlightOpacity,
        mobilePresentation,
        fullscreen.active,
    ])
    React.useEffect(() => {
        maskPickerRef.current?.refresh()
    }, [
        hostVisible,
        mobilePresentation,
        stage,
        orbitInfo.state,
        orbitInfo.checkpoint,
        detailApartmentId,
        fullscreen.active,
        focalX,
        focalY,
        filterResult,
        apartmentHighlightColors,
    ])

    React.useEffect(() => {
        const root = rootRef.current
        if (!root) return
        const moving =
            !staticRenderer &&
            (stage !== "orbit" || orbitInfo.state !== "checkpoint")
        const hoveredApartmentId =
            !moving &&
            interactionApartmentId &&
            filterMatches.has(interactionApartmentId)
                ? interactionApartmentId
                : null
        const highlightIds = moving
            ? []
            : orbitGroup
              ? visibleGroupIds
              : filterResult.active
                ? filterResult.matchingIds
                : selectedApartment
                  ? [selectedApartment.id]
                  : []
        // Selection remains lit after the actual pointer hover ends. Active filters
        // retain their group overlays; the picker distinguishes real pointer/touch emphasis.
        const state = {
            version: 1,
            criteriaActive: filterResult.active,
            ...filterResult.filters,
            matchedIds: [...filterResult.matchingIds],
            highlightIds: [...highlightIds],
            hoveredApartmentId,
            selectedApartmentId: selectedApartment?.id || null,
            checkpoint: orbitInfo.checkpoint,
            moving,
        }
        root.dataset.orbitSelectedApartment = state.selectedApartmentId || ""
        root.dataset.orbitFilterActive = String(state.criteriaActive)
        root.dataset.orbitFilterCriteria = JSON.stringify(filterResult.filters)
        root.dataset.orbitFilterMatches = JSON.stringify(state.matchedIds)
        root.dataset.orbitHighlightIds = JSON.stringify(state.highlightIds)
        root.dispatchEvent(
            new CustomEvent("admiral:orbit-filter-change", { detail: state })
        )
    }, [
        filterResult,
        filterMatches,
        interactionApartmentId,
        selectedApartment,
        orbitGroup,
        visibleGroupIds,
        stage,
        orbitInfo.state,
        orbitInfo.checkpoint,
        staticRenderer,
    ])
    const setStudioViewport = React.useCallback(
        (element: HTMLDivElement | null) => {
            studioViewportRef.current = element
            queueMicrotask(() => refreshPresentation.current())
        },
        []
    )
    const refreshStudioLayout = React.useCallback(() => {
        refreshPresentation.current()
    }, [])
    const timing = React.useRef<HomepageTiming>({
        contentFadeDuration,
        fadeExtension: fadeExtra,
        openingOut: openingMotion.logo.end, openingZoom: openingMotion.logo.zoom,
        openingMotion,
        buildingIn,
        buildingFull,
        ctaIn,
        rise,
    })
    timing.current = { contentFadeDuration, fadeExtension: fadeExtra, openingOut: openingMotion.logo.end, openingZoom: openingMotion.logo.zoom, openingMotion, buildingIn, buildingFull, ctaIn, rise }
    const storySettings = React.useMemo<OrbitStorySettings>(
        () => ({
            enabled: orbitStories && checkpointCount === 8,
            enterDuration: (Number.isFinite(storyIn) ? Math.max(0, storyIn) : .6) + fadeExtra,
            exitDuration: (Number.isFinite(storyOut) ? Math.max(0, storyOut) : .3) + fadeExtra,
            delay: storyDelay,
            views: [
                storyView1,
                storyView2,
                storyView3,
                storyView4,
                storyView5,
                storyView6,
                storyView7,
                storyView8,
            ].map((view, index) => ({
                ...DEFAULT_ORBIT_STORY_VIEWS[index],
                ...view,
            })),
        }),
        [
            orbitStories,
            checkpointCount,
            storyIn,
            storyOut,
            fadeExtra,
            storyDelay,
            storyView1,
            storyView2,
            storyView3,
            storyView4,
            storyView5,
            storyView6,
            storyView7,
            storyView8,
        ]
    )
    const story = React.useRef(storySettings)
    story.current = storySettings

    React.useEffect(() => {
        const root = rootRef.current
        if (!root) return
        const coarse = window.matchMedia("(pointer: coarse)")
        const update = () => {
            const width = root.clientWidth,
                height = root.clientHeight
            setMobilePresentation(
                width > 0 &&
                    (width <= 767 ||
                        (coarse.matches &&
                            height > 0 &&
                            Math.min(width, height) <= 767))
            )
        }
        const observer = new ResizeObserver(update)
        observer.observe(root)
        coarse.addEventListener("change", update)
        update()
        return () => {
            observer.disconnect()
            coarse.removeEventListener("change", update)
        }
    }, [])

    React.useEffect(() => {
        const root = rootRef.current
        if (!root || staticRenderer) return
        const ancestors: HTMLElement[] = []
        for (
            let element: HTMLElement | null = root;
            element;
            element = element.parentElement
        )
            ancestors.push(element)
        const watched = new Set(ancestors),
            inlineVisibility = new WeakMap<HTMLElement, string>()
        const visibilityKey = (element: HTMLElement) =>
            [
                element.style.display,
                element.style.visibility,
                element.style.opacity,
            ].join("|")
        ancestors.forEach((element) =>
            inlineVisibility.set(element, visibilityKey(element))
        )
        let frame: number | null = null
        const update = () => {
            frame = null
            const box = root.getBoundingClientRect()
            const hidden =
                !root.isConnected ||
                ancestors.some((element) => {
                    const css = getComputedStyle(element)
                    return (
                        element.hidden ||
                        css.display === "none" ||
                        css.visibility === "hidden" ||
                        css.visibility === "collapse" ||
                        Number(css.opacity) === 0
                    )
                })
            const rendered = !hidden && box.width > 0 && box.height > 0
            setHostRendered(rendered)
            setHostVisible(
                rendered &&
                    box.bottom > 0 &&
                    box.top < innerHeight &&
                    box.right > 0 &&
                    box.left < innerWidth
            )
        }
        const schedule = () => {
            if (frame === null) frame = requestAnimationFrame(update)
        }
        const resize = new ResizeObserver(schedule),
            intersection = new IntersectionObserver(schedule)
        const mutations = new MutationObserver((records) => {
            let changed = false
            for (const record of records) {
                const element = record.target as HTMLElement,
                    current = visibilityKey(element)
                if (
                    record.attributeName !== "style" ||
                    current !== inlineVisibility.get(element)
                )
                    changed = true
                inlineVisibility.set(element, current)
            }
            if (changed) schedule()
        })
        ancestors.forEach((element) =>
            mutations.observe(element, {
                attributes: true,
                attributeFilter: ["style", "class", "hidden"],
            })
        )
        const end = (event: Event) => {
            if (watched.has(event.target as HTMLElement)) schedule()
        }
        window.addEventListener("resize", schedule)
        window.addEventListener("transitionend", end, true)
        window.addEventListener("animationend", end, true)
        resize.observe(root)
        intersection.observe(root)
        update()
        return () => {
            resize.disconnect()
            intersection.disconnect()
            mutations.disconnect()
            window.removeEventListener("resize", schedule)
            window.removeEventListener("transitionend", end, true)
            window.removeEventListener("animationend", end, true)
            if (frame !== null) cancelAnimationFrame(frame)
        }
    }, [staticRenderer])

    React.useEffect(() => {
        if (!staticRenderer && hostVisible &&
            (stage !== "orbit" || !useStudio || fullscreen.active))
            return pinHomepagePage()
    }, [staticRenderer, hostVisible, stage, useStudio, fullscreen.active])

    React.useEffect(() => {
        if (!hostVisible && detailApartmentId) closeApartmentDetails()
    }, [hostVisible, detailApartmentId, closeApartmentDetails])
    React.useEffect(() => {
        if (fullscreen.active && (!hostVisible || stage !== "orbit"))
            fullscreen.close()
    }, [hostVisible, stage, fullscreen.active, fullscreen.close])

    React.useEffect(() => {
        const root = rootRef.current,
            heroRoot = heroRootRef.current,
            heroCanvas = heroCanvasRef.current,
            orbitCanvas = orbitCanvasRef.current,
            connectionVideo = connectionVideoRef.current,
            poster = posterRef.current
        if (
            !root ||
            !heroRoot ||
            !heroCanvas ||
            !orbitCanvas ||
            !poster ||
            waitingForFormat ||
            (!staticRenderer && !hostActive)
        )
            return
        let disposed = false,
            heroGeneration = 0,
            enterToken = 0
        let currentStage: HomepageStage = previewStage
        // SEQ_01 and SEQ_02 fill the hero. The orbit uses its own measured slot.
        let presentationProgress = previewStage === "orbit" || previewStage === "handoff" ? 1 : 0
        let mobileLayout: HomepageMobileLayout | null = null
        let hero: ReturnType<typeof createHeroSequence> | ReturnType<typeof createHomepageHeroVideo> | null = null
        let activeSequence: "SEQ_01" | "SEQ_02" | "SEQ_03" = "SEQ_01",
            connectionWarmed = false
        let heroSnapshot: SequenceSnapshot = {
            state: previewStage === "building" ? "arrival" : "opening",
            progress: previewStage === "building" ? 1 : 0,
            frame: previewStage === "building" ? heroUrls.length - 1 : 0,
            direction: 1,
            held: false,
            decoded: 0,
            downloaded: 0,
        }
        const cameraCount = Math.round(
            Math.min(orbitUrls.length, Math.max(1, checkpointCount))
        )
        const editorCheckpoint = Array.from(
            { length: cameraCount },
            (_, index) => Math.round((index * orbitUrls.length) / cameraCount)
        ).indexOf(editorPreviewFrame)
        let orbitSnapshot: OrbitSnapshot = {
            state:
                staticRenderer && previewStage === "orbit"
                    ? "checkpoint"
                    : "idle",
            frame: editorPreviewFrame,
            checkpoint:
                staticRenderer && previewStage === "orbit"
                    ? editorCheckpoint
                    : -1,
            direction: 1,
            ready: 0,
            total: orbitUrls.length,
            decoded: 0,
            downloaded: 0,
            buffered: 0,
            bufferTotal: 0,
            requiredReady: 0,
            requiredTotal: 0,
            position: editorPreviewFrame,
            userPaused: false,
            suspended: false,
        }
        const wheelQuietMs = 160
        let lastWheelAt = -Infinity,
            wheelIntent = 0,
            wheelCanEnter = false,
            lastUI = 0,
            lastOrbitUI = ""
        let resetWheelAt: number | null = null
        const abort = new AbortController(),
            signal = abort.signal
        // A phone entering in landscape still uses the phone decode budget.
        // Read logical component sizes so scaled Framer previews stay desktop.
        const phone =
            root.clientWidth <= 767 ||
            (window.matchMedia("(pointer: coarse)").matches &&
                Math.min(root.clientWidth, root.clientHeight) <= 767)
        const reducedMedia = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        )
        setReduced(reducedMedia.matches)
        reducedMedia.addEventListener(
            "change",
            () => setReduced(reducedMedia.matches),
            { signal }
        )
        const decodeWidth = phone ? orbitMobileWidth : motionWidth
        root.dataset.orbitMotionWidth = String(decodeWidth)
        function isVisible(box = root!.getBoundingClientRect()) {
            return (
                box.width > 0 &&
                box.height > 0 &&
                box.bottom > 0 &&
                box.top < innerHeight
            )
        }
        function viewportFor(
            progress: number,
            bounds: { width: number; height: number }
        ) {
            const slot = studioEnabled.current
                ? studioViewportRef.current?.getBoundingClientRect()
                : null
            if (slot && slot.width > 0 && slot.height > 0) {
                const rootBounds = root!.getBoundingClientRect(),
                    amount = sequenceEase(sequenceClamp(progress))
                const scale = Math.min(slot.width / 1920, slot.height / 1010)
                const targetWidth = 1920 * scale,
                    targetHeight = 1010 * scale
                const x =
                    slot.left - rootBounds.left + (slot.width - targetWidth) / 2
                const y =
                    slot.top - rootBounds.top + (slot.height - targetHeight) / 2
                return {
                    x: x * amount,
                    y: y * amount,
                    width: bounds.width + (targetWidth - bounds.width) * amount,
                    height:
                        bounds.height + (targetHeight - bounds.height) * amount,
                }
            }
            // Core drawing uses screen bounds; CSS clipping uses unscaled local pixels.
            const width = root!.clientWidth || bounds.width,
                height = root!.clientHeight || bounds.height
            const local = homepageImageRect(
                progress,
                { width, height },
                framingConfig.current
            )
            return local
                ? {
                      x: (local.x * bounds.width) / width,
                      y: (local.y * bounds.height) / height,
                      width: (local.width * bounds.width) / width,
                      height: (local.height * bounds.height) / height,
                  }
                : null
        }
        function publish() {
            homepageChannels.set(root!, {
                snapshot: heroSnapshot,
                departureProgress: (durationSeconds, delaySeconds = 0) => activeSequence === "SEQ_01" ? hero?.departureProgress(durationSeconds, delaySeconds) ?? 0 : 1,
                openingProgress: (delaySeconds = 0) => activeSequence === "SEQ_01" ? hero?.smoothProgress(delaySeconds) ?? heroSnapshot.progress : 1,
                fadeProgress: (from, to, delaySeconds = 0) => activeSequence === "SEQ_01" ? hero?.fadeProgress(from, to, delaySeconds) ?? heroSnapshot.progress : 1,
                timing: timing.current,
                stage: currentStage,
                orbit: orbitSnapshot,
                story: story.current,
                static: staticRenderer,
                mobile: mobileLayout,
                enabled:
                    currentStage === "opening" ||
                    currentStage === "approach" ||
                    currentStage === "building",
            })
            notifyHomepage()
        }
        const flightMedia = heroRoot.querySelector<HTMLElement>("[data-flight-media]")
        const flightShade = root.querySelector<HTMLElement>("[data-flight-shade]")
        const normalClip = heroRoot.style.clipPath
        let flightGeometry: { width: number; height: number; x: number; y: number; w: number; h: number } | null = null
        function paintFlight() {
            if (!flightMedia || !studioEnabled.current || currentStage !== "orbitApproach") return false
            if (!flightGeometry) {
                const bounds = root!.getBoundingClientRect(), target = viewportFor(1, bounds)
                if (!target || !bounds.width || !bounds.height) return false
                const width = root!.clientWidth, height = root!.clientHeight
                const sx = width / bounds.width, sy = height / bounds.height
                flightGeometry = { width, height, x: target.x * sx, y: target.y * sy,
                    w: target.width * sx, h: target.height * sy }
                heroRoot!.dataset.nativeFlight = ""
            }
            const g = flightGeometry, a = sequenceEase(sequenceClamp(presentationProgress))
            const x = g.x * a, y = g.y * a, w = g.width + (g.w - g.width) * a, h = g.height + (g.h - g.height) * a
            // The media plane keeps one intrinsic size. Compositor transform + clipping preserve object-fit:cover
            // without laying out every full-resolution still and video on every display refresh.
            const scale = Math.max(w / 1920, h / 1010)
            const tx = x + (w - 1920 * scale) * focalX / 100, ty = y + (h - 1010 * scale) * focalY / 100
            flightMedia.style.transform = `translate3d(${tx}px,${ty}px,0) scale(${scale})`
            const clip = `inset(${y}px ${Math.max(0,g.width - x - w)}px ${Math.max(0,g.height - y - h)}px ${x}px round ${orbitWindowRadius * a}px)`
            heroRoot!.style.clipPath = clip
            if (flightShade) flightShade.style.clipPath = clip
            if (presentationProgress >= .68 && !root!.hasAttribute("data-orbit-arriving"))
                root!.setAttribute("data-orbit-arriving", "")
            return true
        }
        function clearFlight() {
            flightGeometry = null
            delete heroRoot!.dataset.nativeFlight
            flightMedia?.style.removeProperty("transform")
            heroRoot!.style.clipPath = normalClip
            flightShade?.style.removeProperty("clip-path")
        }
        function applyPresentation() {
            if (paintFlight()) return
            const bounds = root!.getBoundingClientRect()
            const requested = viewportFor(presentationProgress, bounds)
            const rect = requested || {
                x: 0,
                y: 0,
                width: bounds.width,
                height: bounds.height,
            }
            const setStyle = (name: string, value: string) => {
                if (root!.style.getPropertyValue(name) !== value)
                    root!.style.setProperty(name, value)
            }
            const cssScaleY =
                bounds.height > 0
                    ? (root!.clientHeight || bounds.height) / bounds.height
                    : 1
            const cssScaleX =
                bounds.width > 0
                    ? (root!.clientWidth || bounds.width) / bounds.width
                    : 1
            setStyle("--admiral-image-x", rect.x * cssScaleX + "px")
            setStyle("--admiral-image-width", rect.width * cssScaleX + "px")
            setStyle(
                "--admiral-image-right",
                Math.max(0, bounds.width - rect.x - rect.width) * cssScaleX +
                    "px"
            )
            setStyle("--admiral-image-y", rect.y * cssScaleY + "px")
            setStyle("--admiral-image-height", rect.height * cssScaleY + "px")
            setStyle(
                "--admiral-image-cut",
                Math.max(0, bounds.height - rect.y - rect.height) * cssScaleY +
                    "px"
            )
            const frameRadius = studioEnabled.current
                ? orbitWindowRadius * sequenceEase(sequenceClamp(presentationProgress))
                : 0
            setStyle("--admiral-studio-radius", frameRadius + "px")
            const controls = root!.querySelector<HTMLElement>(
                "[data-homepage-controls]"
            )
            setStyle(
                "--admiral-controls-left",
                (rect.x + rect.width / 2) * cssScaleX + "px"
            )
            setStyle(
                "--admiral-controls-top",
                Math.max(
                    rect.y + 8,
                    rect.y +
                        rect.height -
                        (controls?.offsetHeight || 48) / cssScaleY -
                        12
                ) *
                    cssScaleY +
                    "px"
            )
            setStyle(
                "--admiral-controls-width",
                Math.max(100, rect.width * cssScaleX - 24) + "px"
            )
            root!.dataset.mobileFraming = String(!!requested)
            root!.dataset.imageX = String(rect.x)
            root!.dataset.imageY = String(rect.y)
            root!.dataset.imageWidth = String(rect.width)
            root!.dataset.imageHeight = String(rect.height)
            root!.dataset.visibleImageWidth = String(
                Math.min(
                    100,
                    (100 * rect.width) /
                        Math.max(1, rect.height) /
                        (1920 / 1010)
                )
            )
            if (studioEnabled.current && requested) {
                mobileLayout = {
                    enabled: true,
                    storyLeft: rect.x + 24,
                    storyWidth: Math.max(0, rect.width - 48),
                    storyTop: rect.y + 24,
                    storyMaxHeight: Math.max(0, rect.height - 116),
                }
            } else if (requested) {
                const details = root!.querySelector<HTMLElement>(
                    "[data-apartment-details]"
                )
                const config = framingConfig.current
                // Ignore the strip's entrance translate: its parked position defines the story's space.
                const detailsBottom = details
                    ? parseFloat(getComputedStyle(details).bottom)
                    : config.detailsBottom
                const detailsTop = config.reserveDetails
                    ? bounds.height -
                      (Number.isFinite(detailsBottom)
                          ? detailsBottom
                          : config.detailsBottom) /
                          cssScaleY -
                      (details
                          ? details.getBoundingClientRect().height
                          : config.detailsHeight / cssScaleY)
                    : bounds.height - 16
                const controls = root!.querySelector<HTMLElement>(
                    "[data-homepage-controls]"
                )
                const controlsTop = controls
                    ? controls.getBoundingClientRect().top - bounds.top
                    : bounds.height
                const storyTop = rect.y + rect.height + 20
                mobileLayout = {
                    enabled: true,
                    storyTop,
                    storyMaxHeight: Math.max(
                        0,
                        Math.min(detailsTop, controlsTop) - 20 - storyTop
                    ),
                }
            } else mobileLayout = null
            maskPickerRef.current?.refresh()
        }
        function changeStage(next: HomepageStage) {
            if (currentStage === "orbitApproach" && next !== currentStage) clearFlight()
            if (next !== "orbitApproach" && next !== "connection" && next !== "handoff") delete root!.dataset.orbitPrepaint
            if (next !== "orbitApproach" && next !== "handoff" && next !== "orbit") delete root!.dataset.orbitArriving
            currentStage = next
            root!.dataset.homepageStage = next
            setStage(next)
            applyPresentation()
            scheduleWheelCursor()
            publish()
        }
        function changePoster(url: string) {
            setDirectOrbitEntry(null)
            if (poster!.getAttribute("src") !== url) poster!.src = url
            setPosterUrl(url)
        }
        function destroyHero() {
            heroGeneration++
            hero?.destroy()
            hero = null
        }
        function sequenceInput(event: Event) {
            if (homepageBlocked(event.target)) return false
            if (event instanceof WheelEvent && resetWheelAt !== null) {
                const now = performance.now(),
                    quiet = now - resetWheelAt
                resetWheelAt = now
                // A Home click must not be undone by the trackpad's old inertia.
                // A fresh burst after a quiet gap, keyboard or new touch stays usable.
                if (quiet < wheelQuietMs) return false
                resetWheelAt = null
            }
            return true
        }
        function studioInputBounds() {
            if (!studioEnabled.current || currentStage !== "orbit") return null
            return studioViewportRef.current?.getBoundingClientRect() ?? null
        }

        const orbit = staticRenderer
            ? null
            : createOrbitPlayer({
                  root,
                  canvas: orbitCanvas,
                  urls: orbitUrls,
                  inspectionUrls: checkpointInspectionUrls,
                  startFrame: orbitStartIndex,
                  decodeWidth,
                  inspectionWidth: phone
                      ? Math.min(inspectionWidth, 1280)
                      : inspectionWidth,
                  checkpointCount,
                  bufferCheckpoints: phone ? phoneBuffer : desktopBuffer,
                  dragTurnWidths,
                  dragMaxCheckpointsPerSecond,
                  dragReleaseDuration,
                  continuousWheelBounds: () =>
                      !pickerLatest.current.mobilePresentation && !fullscreen.geometryRef.current
                          ? studioInputBounds()
                          : null,
                  allowsPageScroll: () => studioEnabled.current && !fullscreen.geometryRef.current,
                  snapDuration,
                  frameBlend: frameBlend / 100,
                  checkpointFadeSeconds,
                  focalX: focalX / 100,
                  focalY: focalY / 100,
                  renderBounds: () => fullscreen.geometryRef.current,
                  inputBounds: () =>
                      fullscreen.geometryRef.current?.physical ?? studioInputBounds(),
                  inputPoint: (clientX, clientY) => {
                      const geometry = fullscreen.geometryRef.current
                      if (!geometry) return { x: clientX, y: clientY }
                      const { physical, width, height, rotated } = geometry
                      const x = clientX - physical.left,
                          y = clientY - physical.top
                      return rotated
                          ? {
                                x: (y * width) / physical.height,
                                y: height - (x * height) / physical.width,
                            }
                          : {
                                x: (x * width) / physical.width,
                                y: (y * height) / physical.height,
                            }
                  },
                  viewport: (bounds) =>
                      fullscreen.geometryRef.current
                          ? null
                          : viewportFor(1, bounds),
                  onUpdate(snapshot) {
                      if (disposed) return
                      maskPickerRef.current?.refresh()
                      orbitSnapshot = snapshot
                      publish()
                      if (
                          snapshot.state !== "checkpoint" ||
                          snapshot.checkpoint < 0
                      )
                          setInteractionApartmentId(null)
                      const key = `${snapshot.state}:${snapshot.checkpoint}:${Math.floor(snapshot.ready / 6)}:${Math.floor(snapshot.buffered / 6)}:${Math.floor(snapshot.requiredReady / 3)}:${snapshot.buffered === snapshot.bufferTotal}:${snapshot.requiredReady === snapshot.requiredTotal}:${snapshot.decoded > snapshot.buffered}`
                      const now = performance.now()
                      if (
                          key !== lastOrbitUI ||
                          (showDiagnostics && now - lastUI > 150)
                      ) {
                          lastOrbitUI = key
                          lastUI = now
                          setOrbitInfo(snapshot)
                      }
                  },
              })
        orbit?.setSuspended(detailOpen.current)
        function releaseConnectionPreload() {
            if (connectionVideo?.hasAttribute("src")) {
                connectionVideo.removeAttribute("src")
                connectionVideo.preload = "none"
                connectionVideo.load()
            }
            if (connectionVideoUrl) connectionWarmed = false
        }
        // Each delivery mode warms only its own media.
        function warmConnection() {
            const connection = (
                navigator as Navigator & {
                    connection?: { saveData?: boolean; effectiveType?: string }
                }
            ).connection
            if (
                connectionWarmed ||
                staticRenderer ||
                reducedMedia.matches ||
                connection?.saveData ||
                /(^|-)2g$/.test(connection?.effectiveType || "")
            )
                return
            if (connectionVideoUrl) {
                if (heroSnapshot.state !== "arrival" || !connectionVideo) return
                connectionWarmed = true
                connectionVideo.preload = "auto"
                connectionVideo.src = connectionVideoUrl
                return
            }
            connectionWarmed = true
            let next = 0
            async function worker() {
                while (!disposed && next < connectionUrls.length) {
                    const url = connectionUrls[next++],
                        request = new AbortController()
                    const cancel = () => request.abort(),
                        timeout = setTimeout(cancel, 10000)
                    signal.addEventListener("abort", cancel, { once: true })
                    try {
                        const response = await fetch(url, {
                            signal: request.signal,
                            mode: "cors",
                            credentials: "omit",
                            cache: "force-cache",
                        })
                        if (response.ok) await response.blob()
                    } catch {
                        /* The active sequence retries a failed background download. */
                    } finally {
                        clearTimeout(timeout)
                        signal.removeEventListener("abort", cancel)
                    }
                }
            }
            void Promise.all([worker(), worker()])
        }
        function mountHero(atEnd = false) {
            if (disposed) return
            enterToken++
            orbit?.deactivate(true)
            setOrbitGroup(null)
            setGroupRequest(null)
            destroyHero()
            releaseConnectionPreload()
            presentationProgress = 0
            applyPresentation()
            activeSequence = "SEQ_01"
            root!.dataset.activeSequence = activeSequence
            changePoster(atEnd ? heroEndPoster : heroStartPoster)
            heroSnapshot = {
                state: atEnd ? "arrival" : "opening",
                progress: atEnd ? 1 : 0,
                frame: atEnd ? heroUrls.length - 1 : 0,
                direction: 1,
                held: false,
                decoded: 0,
                downloaded: 0,
            }
            setHeroState(heroSnapshot.state)
            changeStage(atEnd ? "building" : "opening")
            const generation = ++heroGeneration
            const onUpdate = (snapshot: SequenceSnapshot) => {
                if (disposed || generation !== heroGeneration) return
                const stateChanged = heroSnapshot.state !== snapshot.state
                heroSnapshot = snapshot
                if (stateChanged) setHeroState(snapshot.state)
                if (
                    snapshot.state === "moving" ||
                    snapshot.state === "loading" ||
                    snapshot.state === "arrival"
                )
                    warmConnection()
                if (
                    snapshot.state === "arrival" ||
                    snapshot.state === "reduced"
                ) {
                    if (heroVideoUrl) changePoster(heroEndPoster)
                    changeStage("building")
                } else if (snapshot.state === "opening")
                    changeStage("opening")
                else if (
                    snapshot.state === "moving" ||
                    snapshot.state === "loading"
                ) {
                    if (currentStage !== "approach") changeStage("approach")
                    else publish()
                }
                else publish()
            }
            const video = heroVideoRef.current
            const endLayer = heroEndLayerRef.current, graphic = heroInfographicRef.current
            if (heroVideoUrl && video && endLayer && graphic) {
                heroCanvas!.style.opacity = "0"
                poster!.style.opacity = "1"
                hero = createHomepageHeroVideo({
                    video, poster: poster!, endLayer, graphic,
                    url: heroVideoUrl, endPoster: heroEndPoster, graphicUrl: HOMEPAGE_HERO_INFOGRAPHIC,
                    startAtEnd: atEnd, lastFrame: heroUrls.length - 1,
                    fadeExtension: () => fadeExtensionRef.current,
                    onUpdate,
                })
                return
            }
            hero = createHeroSequence({
                fadeExtension: () => fadeExtensionRef.current,
                root: heroRoot!,
                canvas: heroCanvas!,
                poster: poster!,
                urls: heroUrls,
                duration,
                maxSpeed,
                momentum,
                triggerDistance,
                startAtEnd: atEnd,
                preservePresentation: atEnd,
                holdScroll: true,
                preload: true,
                cacheFrames: phone ? 10 : 14,
                decodeWidth: phone ? 1280 : 1920,
                focalX,
                focalY,
                inputFilter: sequenceInput,
                onUpdate,
            })
        }
        let requestedOrbitFrame = orbitStartIndex
        async function activateOrbit(frame = orbitStartIndex) {
            if (disposed || !orbit || !isVisible()) return
            requestedOrbitFrame = frame
            const token = ++enterToken
            // Keep the decoded landing still on top until the orbit paints its first frame.
            const holdLanding = connectionLanded() || currentStage === "orbitApproach"
            if (!holdLanding) {
                destroyHero()
                releaseConnectionPreload()
            }
            changeStage("handoff")
            try {
                await orbit.activate(frame)
                if (disposed || token !== enterToken) return
                if (holdLanding) {
                    destroyHero()
                    releaseConnectionPreload()
                }
                presentationProgress = 1
                applyPresentation()
                changeStage("orbit")
            } catch {
                /* The orbit reports a visible retry state. The completed sequence remains visible. */
            }
        }
        function explore() {
            if (
                disposed ||
                !orbit ||
                !isVisible() ||
                currentStage !== "building"
            )
                return
            if (hero && "leave" in hero) void hero.leave(startConnection)
            else startConnection()
        }
        function startConnection() {
            if (disposed || currentStage !== "building") return
            if (reducedMedia.matches) {
                void activateOrbit()
                return
            }
            enterToken++
            destroyHero()
            clearApartmentDetails()
            presentationProgress = 0
            applyPresentation()
            activeSequence = "SEQ_02"
            root!.dataset.activeSequence = activeSequence
            changePoster(heroEndPoster)
            changeStage("connection")
            const generation = ++heroGeneration
            let completed = false,
                orbitPreparing = false
            const onConnectionUpdate = (snapshot: SequenceSnapshot) => {
                if (disposed || generation !== heroGeneration) return
                heroSnapshot = snapshot
                setHeroState((previous) =>
                    previous === snapshot.state ? previous : snapshot.state
                )
                // SEQ_02's media clock drives the journey events independently of viewport framing.
                // Compressed orbit downloads run from page load; decode its
                // bounded window only near the connecting flight's handoff.
                if (
                    !orbitPreparing &&
                    snapshot.direction > 0 &&
                    (connectionVideoUrl ? snapshot.state === "arrival" : snapshot.progress >= 0.55)
                ) {
                    orbitPreparing = true
                    if (connectionVideoUrl && studioEnabled.current && !reducedMedia.matches && isVisible())
                        root!.setAttribute("data-orbit-prepaint","")
                    void orbit.prepare(connectionVideoUrl ? 0 : undefined).catch(() => {})
                }
                publish()
                if (connectionVideoUrl && (snapshot.state === "arrival" || snapshot.state === "reduced"))
                    changePoster(connectionEndPoster)
            }
            if (connectionVideoUrl && connectionVideo && heroEndLayerRef.current) {
                heroSnapshot = { ...heroSnapshot, state: "loading", progress: 0, frame: 0 }
                heroCanvas!.style.opacity = "0"
                poster!.style.opacity = "1"
                hero = createHomepageHeroVideo({
                    video: connectionVideo, poster: poster!, endLayer: heroEndLayerRef.current,
                    url: connectionVideoUrl, endPoster: connectionEndPoster,
                    startAtEnd: false, lastFrame: connectionPlaybackUrls.length - 1,
                    fadeExtension: () => fadeExtensionRef.current, onUpdate: onConnectionUpdate,
                })
                hero.start()
                return
            }
            hero = createHeroSequence({
                fadeExtension: () => fadeExtensionRef.current,
                root: heroRoot!,
                canvas: heroCanvas!,
                poster: poster!,
                urls: connectionPlaybackUrls,
                duration: connectionDuration,
                maxSpeed,
                momentum,
                triggerDistance,
                preservePresentation: true,
                holdScroll: true,
                preload: true,
                cacheFrames: phone ? 10 : 14,
                decodeWidth: phone ? 1280 : 1920,
                focalX,
                focalY,
                inputFilter: sequenceInput,
                onUpdate(snapshot) {
                    if (disposed || generation !== heroGeneration) return
                    onConnectionUpdate(snapshot)
                    const arrived =
                        (snapshot.state === "arrival" ||
                            snapshot.state === "reduced") &&
                        snapshot.frame === connectionPlaybackUrls.length - 1
                    const returned =
                        snapshot.state === "opening" &&
                        snapshot.direction < 0 &&
                        snapshot.frame === 0
                    if (!completed && (arrived || returned)) {
                        completed = true
                        // Constructors may publish synchronously under reduced motion. Teardown follows assignment, never precedes it.
                        queueMicrotask(() => {
                            if (disposed || generation !== heroGeneration)
                                return
                            if (returned) mountHero(true)
                            else void activateOrbit()
                        })
                    }
                },
            })
            hero.start()
        }
        function startOrbitApproach() {
            if (!connectionLanded() || disposed || !orbit || !connectionVideo || !heroEndLayerRef.current) return
            if (reducedMedia.matches) {
                void activateOrbit(0)
                return
            }
            destroyHero()
            activeSequence = "SEQ_03"
            root!.dataset.activeSequence = activeSequence
            changePoster(connectionEndPoster)
            heroSnapshot = { ...heroSnapshot, state: "loading", progress: 0, frame: 0 }
            changeStage("orbitApproach")
            const generation = ++heroGeneration
            // Prepare checkpoint zero and its neighbours while the last flight is playing.
            void orbit.prepare(0).catch(() => {})
            hero = createHomepageHeroVideo({
                video: connectionVideo, poster: poster!, endLayer: heroEndLayerRef.current,
                url: HOMEPAGE_ORBIT_APPROACH_VIDEO, endPoster: checkpointZeroPoster,
                startAtEnd: false, lastFrame: 1, fadeExtension: () => fadeExtensionRef.current,
                onUpdate(snapshot) {
                    if (disposed || generation !== heroGeneration) return
                    const stateChanged = heroSnapshot.state !== snapshot.state
                    heroSnapshot = snapshot
                    if (stateChanged) setHeroState(snapshot.state)
                    if (presentationProgress !== snapshot.progress) {
                        presentationProgress = snapshot.progress
                        applyPresentation()
                    }
                    // Opening overlays are inactive on this flight. Notify subscribers only on player edges.
                    if (stateChanged) publish()
                    if (snapshot.state === "arrival" || snapshot.state === "reduced") {
                        changePoster(checkpointZeroPoster)
                        queueMicrotask(() => {
                            if (!disposed && generation === heroGeneration && currentStage === "orbitApproach")
                                void activateOrbit(0)
                        })
                    }
                },
            })
            hero.start()
        }
        function overview() {
            mountHero(false)
        }
        function revealJourney() {
            if (currentStage !== "orbit" || !studioEnabled.current) return
            const box = root!.getBoundingClientRect()
            if (box.top >= 0 && isVisible(box)) return
            root!.scrollIntoView({ block: "start", behavior: "instant" })
            if (isVisible()) setHostVisible(true)
        }
        function resetHome() {
            if (disposed || staticRenderer) return
            revealJourney()
            if (!isVisible()) return
            closeApartmentDetails()
            fullscreen.close()
            setOrbitApartmentTarget(null)
            setSelectedApartmentId(null)
            setInteractionApartmentId(null)
            setApartmentFilters({
                statuses: [],
                priceMin: null,
                priceMax: null,
            })
            // Only a recent wheel burst can carry inertia through a Home click.
            resetWheelAt = performance.now() - lastWheelAt < wheelQuietMs
                ? lastWheelAt
                : null
            resetGestureState()
            // Cancels both sequence generations and pending orbit activation,
            // while keeping the orbit's already downloaded compressed frames.
            mountHero(false)
        }
        const journeyPath = window.location.pathname
        const entryUrl = new URL(window.location.href)
        let orbitLocation = entryUrl.hash.toLowerCase() === homepageOrbitHash
        let orbitLocationApartment = homepageOrbitApartment(entryUrl)
        let orbitLocationGroup = homepageOrbitGroup(entryUrl)
        function closeOrbitGroup() {
            orbitLocationGroup = null
            setOrbitGroup(null)
            setGroupRequest(null)
            const url = new URL(window.location.href)
            url.searchParams.delete(orbitGroupParam)
            url.searchParams.delete(orbitGroupApartmentsParam)
            history.replaceState(history.state, "", url)
            root!.focus({ preventScroll: true })
        }
        function showLinkedOrbit(frame = orbitStartIndex) {
            presentationProgress = 1
            setDirectOrbitEntry({ poster: parkedPoster(frame), framed: true })
            void activateOrbit(frame)
        }
        function openOrbitFromLink(id: string | null, group: OrbitApartmentGroup | null, initial = false) {
            const activeGroup = apartmentOrbitAvailable ? group : null
            setOrbitGroup(activeGroup)
            setGroupRequest(null)
            if (activeGroup) {
                closeApartmentDetails()
                fullscreen.close()
                setOrbitApartmentTarget(null)
                setSelectedApartmentId(null)
                setApartmentFilters({ statuses: [], priceMin: null, priceMax: null })
                const frame = bestOrbitGroupFrame(activeGroup.ids) ?? orbitStartIndex
                if (currentStage !== "orbit" || orbitSnapshot.state !== "checkpoint" || orbitSnapshot.frame !== frame)
                    showLinkedOrbit(frame)
                return
            }
            if (id && apartmentOrbitAvailable) {
                closeApartmentDetails()
                fullscreen.close()
                // An explicit apartment lookup should land with that apartment
                // clearly highlighted, even if another filter was active.
                setApartmentFilters({ statuses: [], priceMin: null, priceMax: null })
                const cameras = orbitApartmentCameras[id]
                const keepCurrent = currentStage === "orbit" &&
                    orbitSnapshot.state === "checkpoint" && cameras.includes(orbitSnapshot.frame)
                const frame = keepCurrent ? orbitSnapshot.frame : cameras[0]
                const checkpoint = Math.round(frame * cameraCount / orbitUrls.length)
                setOrbitApartmentTarget({ id, checkpoint })
                if (keepCurrent) return
                showLinkedOrbit(frame)
                return
            }
            setOrbitApartmentTarget(null)
            if (!initial && (currentStage === "handoff" || currentStage === "orbit")) return
            showLinkedOrbit()
        }
        function syncJourneyLocation() {
            if (staticRenderer || window.location.pathname !== journeyPath ||
                (!isVisible() && currentStage !== "orbit")) return
            const url = new URL(window.location.href)
            const showOrbit = url.hash.toLowerCase() === homepageOrbitHash
            const apartment = homepageOrbitApartment(url)
            const group = homepageOrbitGroup(url)
            if (showOrbit === orbitLocation && apartment === orbitLocationApartment &&
                orbitGroupKey(group) === orbitGroupKey(orbitLocationGroup)) return
            orbitLocation = showOrbit
            orbitLocationApartment = apartment
            orbitLocationGroup = group
            if (showOrbit) {
                revealJourney()
                openOrbitFromLink(apartment, group)
            } else resetHome()
        }
        window.addEventListener("popstate", syncJourneyLocation, { signal })
        window.addEventListener("hashchange", syncJourneyLocation, { signal })
        window.addEventListener(
            "click",
            (event) => {
                if (staticRenderer || (!isVisible() && currentStage !== "orbit")) return
                const destination = homepageJourneyLink(event)
                if (!destination) return
                const showOrbit = destination.hash.toLowerCase() === homepageOrbitHash
                const apartment = homepageOrbitApartment(destination)
                const group = homepageOrbitGroup(destination)
                event.preventDefault()
                // Leave propagation intact so the native mobile menu can close.
                if (showOrbit || orbitLocation) {
                    if (destination.href !== window.location.href)
                        history.pushState(history.state, "", destination)
                    orbitLocation = showOrbit
                    orbitLocationApartment = apartment
                    orbitLocationGroup = group
                }
                if (showOrbit) {
                    revealJourney()
                    root!.focus({ preventScroll: true })
                    openOrbitFromLink(apartment, group)
                } else resetHome()
            },
            { capture: true, signal }
        )
        const retry = async () => {
            if (!orbit) return
            const token = enterToken
            try {
                await orbit.retry()
                if (disposed || token !== enterToken) return
                if (currentStage === "handoff") {
                    await orbit.activate(requestedOrbitFrame)
                    if (!disposed && token === enterToken) {
                        destroyHero()
                        releaseConnectionPreload()
                        presentationProgress = 1
                        applyPresentation()
                        changeStage("orbit")
                    }
                }
            } catch {
                /* The retry control remains available. */
            }
        }
        function groupButtonAtPoint(x: number, y: number) {
            if (currentStage !== "orbit" || !root!.querySelector("[data-orbit-group]"))
                return null
            // Hit testing accounts for clipping in the scrolling button row as
            // well as fullscreen transforms. A real control on top has priority.
            for (const layer of document.elementsFromPoint(x, y)) {
                const button = layer.closest<HTMLButtonElement>(
                    "button[data-orbit-group-apartment], button[data-orbit-group-close]"
                )
                if (button && root!.contains(button) && !button.disabled &&
                    !button.closest("[inert],[hidden],[aria-hidden='true'],[aria-disabled='true']"))
                    return button
                if (homepageBlocked(layer)) return null
            }
            return null
        }
        function forwardControlClick(event: MouseEvent, button: HTMLButtonElement) {
            event.preventDefault()
            event.stopPropagation()
            button.focus({ preventScroll: true })
            button.click()
        }
        function relayControlClick(event: MouseEvent) {
            if (event.defaultPrevented || detailOpen.current || !isVisible() ||
                homepageBlocked(event.target))
                return
            if (event.button === 0) {
                const groupButton = groupButtonAtPoint(event.clientX, event.clientY)
                if (groupButton) {
                    forwardControlClick(event, groupButton)
                    return
                }
            }
            if (root!.contains(event.target as Node)) return
            // A clamped phone popup can overlap the status row. Passive Framer
            // covers must not relay a click in its padding to a button below it.
            if (
                Array.from(
                    root!.querySelectorAll<HTMLElement>(
                        "[data-orbit-range-popover]:not([hidden])"
                    )
                ).some((panel) => {
                    if (panel.closest("[inert],[aria-hidden='true']"))
                        return false
                    const box = panel.getBoundingClientRect()
                    return (
                        box.width > 0 &&
                        box.height > 0 &&
                        event.clientX >= box.left &&
                        event.clientX <= box.right &&
                        event.clientY >= box.top &&
                        event.clientY <= box.bottom
                    )
                })
            )
                return
            // Passive Framer overlay frames can cover the viewport. Relay only a click
            // over one of our visible controls; genuine links and buttons above stay native.
            for (const button of Array.from(
                root!.querySelectorAll<HTMLButtonElement>(
                    "[data-homepage-controls] button, [data-orbit-filters] button, button[data-apartment-open], button[data-orbit-detail-link], button[data-orbit-favorite], button[data-orbit-fullscreen-open], button[data-orbit-fullscreen-close], button[data-seq3-cue-action]"
                )
            )) {
                if (
                    button.disabled ||
                    button.getAttribute("aria-disabled") === "true" ||
                    button.closest("[inert], [hidden], [aria-hidden='true']")
                )
                    continue
                let visible = true
                for (
                    let element: HTMLElement | null = button;
                    element;
                    element = element.parentElement
                ) {
                    const css = getComputedStyle(element)
                    if (
                        css.display === "none" ||
                        css.visibility === "hidden" ||
                        css.visibility === "collapse" ||
                        Number(css.opacity) === 0
                    ) {
                        visible = false
                        break
                    }
                    if (element === root) break
                }
                if (!visible) continue
                const box = button.getBoundingClientRect()
                if (
                    box.width > 0 &&
                    box.height > 0 &&
                    event.clientX >= box.left &&
                    event.clientX <= box.right &&
                    event.clientY >= box.top &&
                    event.clientY <= box.bottom
                ) {
                    forwardControlClick(event, button)
                    return
                }
            }
        }
        window.addEventListener("click", relayControlClick, {
            capture: true,
            signal,
        })

        // A cursor label leaves the browser's pointing hotspot available for apartment picking.
        let wheelCursorFrame = 0
        let mousePoint: { x: number; y: number } | null = null
        let mousePressed = false
        function updateWheelCursor() {
            wheelCursorFrame = 0
            const cursor = wheelCursorRef.current
            const bounds = studioInputBounds()
            const point = mousePoint
            const show = !!(cursor && bounds && point && !mousePressed &&
                !pickerLatest.current.mobilePresentation && !fullscreen.geometryRef.current &&
                !detailOpen.current && !document.hidden && bounds.width > 0 && bounds.height > 0 &&
                point.x >= bounds.left && point.x <= bounds.right &&
                point.y >= bounds.top && point.y <= bounds.bottom &&
                !homepageBlocked(document.elementFromPoint(point.x, point.y)))
            root!.toggleAttribute("data-orbit-wheel-pointer", show)
            if (!cursor) return
            cursor.hidden = !show
            if (!show || !bounds || !point) return
            const box = root!.getBoundingClientRect()
            const x = (point.x - box.left) * root!.clientWidth / box.width
            const y = (point.y - box.top) * root!.clientHeight / box.height
            const offsetX = point.x > bounds.right - 125 ? "calc(-100% - 13px)" : "13px"
            const offsetY = point.y > bounds.bottom - 42 ? "calc(-100% - 12px)" : "12px"
            cursor.style.transform = `translate3d(${x}px, ${y}px, 0) translate(${offsetX}, ${offsetY})`
        }
        function scheduleWheelCursor() {
            if (!staticRenderer && !wheelCursorFrame)
                wheelCursorFrame = requestAnimationFrame(updateWheelCursor)
        }
        function trackMouse(event: PointerEvent) {
            if (event.pointerType !== "mouse") return
            mousePressed = event.buttons !== 0
            mousePoint = { x: event.clientX, y: event.clientY }
            scheduleWheelCursor()
        }
        function clearMouse() {
            mousePoint = null
            mousePressed = false
            scheduleWheelCursor()
        }
        for (const type of ["pointermove", "pointerdown", "pointerup"] as const)
            window.addEventListener(type, trackMouse, { passive: true, capture: true, signal })
        window.addEventListener("pointerout", (event) => {
            if (event.pointerType === "mouse" && !event.relatedTarget) clearMouse()
        }, { passive: true, signal })
        window.addEventListener("blur", clearMouse, { signal })
        window.addEventListener("scroll", scheduleWheelCursor, { passive: true, signal })
        document.addEventListener("visibilitychange", scheduleWheelCursor, { signal })
        signal.addEventListener("abort", () => {
            if (wheelCursorFrame) cancelAnimationFrame(wheelCursorFrame)
            root!.removeAttribute("data-orbit-wheel-pointer")
            if (wheelCursorRef.current) wheelCursorRef.current.hidden = true
        }, { once: true })

        function videoOpening() {
            return !!heroVideoUrl && activeSequence === "SEQ_01" && currentStage === "opening"
        }
        function connectionLanded() {
            return !!connectionVideoUrl && currentStage === "connection" &&
                (heroSnapshot.state === "arrival" || heroSnapshot.state === "reduced")
        }
        function interruptedFlight() {
            const interrupted = heroSnapshot.state === "paused" || heroSnapshot.state === "error"
            return interrupted && (
                (currentStage === "approach" && !!heroVideoUrl) ||
                (currentStage === "connection" && !!connectionVideoUrl) ||
                currentStage === "orbitApproach"
            )
        }
        function journeyGestureBlocked(target: EventTarget | null) {
            if (target instanceof Element && target.closest("button[data-seq3-cue-action]")) return false
            return homepageBlocked(target)
        }
        function canAdvanceJourney() {
            return videoOpening() || currentStage === "building" || connectionLanded() || interruptedFlight()
        }
        function advanceJourney() {
            if (videoOpening() || interruptedFlight()) hero?.start()
            else if (currentStage === "building") explore()
            else if (connectionLanded()) startOrbitApproach()
        }
        function videoPlaying() {
            return !interruptedFlight() && ((!!heroVideoUrl && currentStage === "approach") ||
                (!!connectionVideoUrl && currentStage === "connection" && !connectionLanded()) ||
                currentStage === "orbitApproach")
        }
        function resetWheelIntent() {
            wheelIntent = 0
            wheelCanEnter = false
        }
        function wheel(event: WheelEvent) {
            if (
                event.ctrlKey ||
                event.metaKey ||
                document.hidden ||
                Math.abs(event.deltaX) > Math.abs(event.deltaY) ||
                event.deltaY === 0
            )
                return
            if (studioEnabled.current && !pickerLatest.current.mobilePresentation) {
                mousePoint = { x: event.clientX, y: event.clientY }
                scheduleWheelCursor()
            }
            if (currentStage === "orbit") {
                // Its capture listener already checks the view and nested controls.
                if (event.defaultPrevented) lastWheelAt = performance.now()
                return
            }
            if (event.defaultPrevented) return
            const box = root!.getBoundingClientRect()
            if (
                !isVisible(box) ||
                event.clientX < box.left ||
                event.clientX > box.right ||
                event.clientY < box.top ||
                event.clientY > box.bottom ||
                journeyGestureBlocked(event.target)
            )
                return
            for (
                let element =
                    event.target instanceof Element ? event.target : null;
                element &&
                element !== document.body &&
                element !== document.documentElement;
                element = element.parentElement
            ) {
                const css = getComputedStyle(element)
                if (
                    /(auto|scroll)/.test(css.overflowY) &&
                    element.scrollHeight > element.clientHeight + 1 &&
                    (event.deltaY > 0
                        ? element.scrollTop + element.clientHeight <
                          element.scrollHeight - 1
                        : element.scrollTop > 0)
                )
                    return
            }
            const delta =
                event.deltaY *
                (event.deltaMode === 1
                    ? 16
                    : event.deltaMode === 2
                      ? innerHeight
                      : 1)
            if (delta < 0 && delta > -1) return
            const now = performance.now()
            const fresh = now - lastWheelAt >= wheelQuietMs
            lastWheelAt = now
            if (!canAdvanceJourney()) {
                resetWheelIntent()
                if ((currentStage === "handoff" || videoPlaying()) && event.cancelable)
                    event.preventDefault()
                return
            }
            if (videoOpening() && !sequenceInput(event)) {
                resetWheelIntent()
                if (event.cancelable) event.preventDefault()
                return
            }
            if (delta < 0) {
                resetWheelIntent()
                return
            }
            // A trackpad tail from one flight must not launch the next stage.
            if (fresh) {
                wheelIntent = 0
                wheelCanEnter = true
            }
            if (event.cancelable) event.preventDefault()
            if (!wheelCanEnter) return
            wheelIntent += delta
            if (wheelIntent >= triggerDistance) {
                resetWheelIntent()
                advanceJourney()
            }
        }
        let touchOrigin: { x: number; y: number } | null = null,
            touchCanEnter = false
        function resetTouchIntent() {
            touchOrigin = null
            touchCanEnter = false
        }
        function resetGestureState() {
            resetWheelIntent()
            lastWheelAt = -Infinity
            resetTouchIntent()
        }
        document.addEventListener("visibilitychange", () => {
            if (!document.hidden) return
            resetGestureState()
            resetWheelAt = null
        }, { signal })
        window.addEventListener("pagehide", () => {
            resetGestureState()
            resetWheelAt = null
        }, { signal })
        window.addEventListener(
            "touchstart",
            (event) => {
                const touch =
                        event.touches.length === 1 ? event.touches[0] : null,
                    box = root!.getBoundingClientRect()
                resetTouchIntent()
                if (
                    !touch ||
                    document.hidden ||
                    !isVisible(box) ||
                    touch.clientX < box.left ||
                    touch.clientX > box.right ||
                    touch.clientY < box.top ||
                    touch.clientY > box.bottom ||
                    journeyGestureBlocked(event.target)
                )
                    return
                touchOrigin = { x: touch.clientX, y: touch.clientY }
                // A new finger after landing is a new gesture, even immediately.
                touchCanEnter = canAdvanceJourney()
            },
            { passive: true, signal }
        )
        window.addEventListener(
            "touchmove",
            (event) => {
                if (event.touches.length !== 1) {
                    resetTouchIntent()
                    return
                }
                if (!touchOrigin || !isVisible()) return
                if (currentStage === "handoff" || videoPlaying()) {
                    if (event.cancelable) event.preventDefault()
                    return
                }
                if (!touchCanEnter || !canAdvanceJourney()) return
                const touch = event.touches[0]
                const distance = touchOrigin.y - touch.clientY
                if (
                    distance <= 0 ||
                    distance < Math.abs(touchOrigin.x - touch.clientX)
                )
                    return
                if (event.cancelable) event.preventDefault()
                if (distance >= triggerDistance) {
                    touchCanEnter = false
                    advanceJourney()
                }
            },
            { passive: false, signal }
        )
        window.addEventListener("touchend", resetTouchIntent, { passive: true, signal })
        window.addEventListener("touchcancel", resetTouchIntent, { passive: true, signal })
        window.addEventListener("wheel", wheel, { passive: false, signal })
        window.addEventListener(
            "keydown",
            (event) => {
                if (
                    !isVisible() ||
                    homepageBlocked(event.target) ||
                    event.ctrlKey ||
                    event.metaKey ||
                    event.altKey
                )
                    return
                if (currentStage === "handoff") {
                    if (event.key === "Escape") {
                        mountHero(true)
                        return
                    }
                    if (
                        [
                            "ArrowDown",
                            "ArrowUp",
                            "PageDown",
                            "PageUp",
                            "Home",
                            "End",
                            " ",
                        ].includes(event.key)
                    )
                        event.preventDefault()
                    return
                }
                if (
                    (canAdvanceJourney() || videoPlaying()) &&
                    !event.repeat && !event.shiftKey &&
                    ["ArrowDown", "PageDown", " "].includes(event.key)
                ) {
                    event.preventDefault()
                    advanceJourney()
                }
            },
            { signal }
        )
        root.addEventListener("admiral:overview", overview, { signal })
        window.addEventListener(
            "admiral:overview",
            (event) => {
                if (
                    event.target === window &&
                    root!.getBoundingClientRect().width > 0
                )
                    overview()
            },
            { signal }
        )
        root.addEventListener(
            "admiral:explore",
            () => {
                void explore()
            },
            { signal }
        )
        actions.current = {
            startOrbitApproach,
            explore: () => {
                void explore()
            },
            overview,
            closeOrbitGroup,
            skip: () => {
                if (connectionLanded()) startOrbitApproach()
                else if (activeSequence === "SEQ_02" && reducedMedia.matches) void activateOrbit()
                else hero?.skip()
            },
            resumeHero: () => {
                if (heroSnapshot.direction < 0) hero?.reverse()
                else hero?.start()
            },
            orbit,
        }
        ;(
            root as HTMLElement & { retryOrbit?: () => Promise<void> }
        ).retryOrbit = retry
        const refresh = () => {
            if (!disposed) {
                flightGeometry = null
                applyPresentation()
                hero?.redraw()
                orbit?.redraw()
                scheduleWheelCursor()
                publish()
            }
        }
        refreshPresentation.current = refresh
        const presentationResize = new ResizeObserver(refresh)
        presentationResize.observe(root)
        if (studioViewportRef.current)
            presentationResize.observe(studioViewportRef.current)
        applyPresentation()
        if (staticRenderer) {
            changeStage(previewStage)
            changePoster(initialPoster)
        } else {
            if (startView === "orbit" || orbitLocation)
                openOrbitFromLink(orbitLocationApartment, orbitLocationGroup, true)
            else mountHero()
            if (startView !== "orbit" && !orbitLocation) {
                let fallback = 0
                let openingSettled = false
                const warmOrbit = () => {
                    clearTimeout(fallback)
                    if (!disposed && isVisible()) orbit?.prefetch()
                }
                const afterPoster = () => {
                    if (openingSettled) return
                    openingSettled = true
                    const flight = heroVideoUrl && !reducedMedia.matches ? heroVideoRef.current : null
                    if (!flight || flight.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
                        warmOrbit()
                        return
                    }
                    flight.addEventListener("canplay", warmOrbit, { once: true, signal })
                    flight.addEventListener("error", warmOrbit, { once: true, signal })
                    // Some mobile browsers defer video preloading until a gesture.
                    fallback = window.setTimeout(warmOrbit, 4000)
                }
                if (poster!.complete) afterPoster()
                else {
                    poster!.addEventListener("load", afterPoster, { once: true, signal })
                    poster!.addEventListener("error", afterPoster, { once: true, signal })
                }
                signal.addEventListener("abort", () => clearTimeout(fallback), { once: true })
            }
        }
        publish()
        return () => {
            disposed = true
            enterToken++
            clearApartmentDetails()
            destroyHero()
            releaseConnectionPreload()
            orbit?.destroy()
            abort.abort()
            presentationResize.disconnect()
            clearFlight()
            delete root.dataset.orbitPrepaint
            delete root.dataset.orbitArriving
            refreshPresentation.current = () => {}
            actions.current = null
            delete (root as HTMLElement & { retryOrbit?: () => Promise<void> })
                .retryOrbit
            homepageChannels.delete(root)
            notifyHomepage()
        }
    }, [
        heroUrls,
        heroVideoUrl,
        heroStartPoster,
        heroEndPoster,
        connectionEndPoster,
        checkpointZeroPoster,
        waitingForFormat,
        connectionVideoUrl,
        connectionUrls,
        connectionPlaybackUrls,
        orbitUrls,
        checkpointInspectionUrls,
        parkedPoster,
        apartmentOrbitAvailable,
        staticRenderer,
        hostActive,
        startView,
        editorView,
        duration,
        connectionDuration,
        maxSpeed,
        momentum,
        triggerDistance,
        checkpointCount,
        motionWidth,
        orbitMobileWidth,
        inspectionWidth,
        desktopBuffer,
        phoneBuffer,
        dragTurnWidths,
        dragMaxCheckpointsPerSecond,
        dragReleaseDuration,
        orbitStartIndex,
        editorPreviewFrame,
        snapDuration,
        frameBlend,
        checkpointFadeSeconds,
        focalX,
        focalY,
        showDiagnostics,
        clearApartmentDetails,
        closeApartmentDetails,
        fullscreen.close,
    ])

    React.useEffect(() => {
        refreshPresentation.current()
    }, [
        phoneFraming,
        phoneImageWidth,
        phoneImageTop,
        detailsHeight,
        detailsBottom,
        detailsMode,
        useStudio,
        showControls,
        showViewpoints,
        stage,
        orbitInfo.state,
    ])

    React.useEffect(() => {
        const slot = studioViewportRef.current
        if (!useStudio || !slot) return
        const observer = new ResizeObserver(() => refreshPresentation.current())
        observer.observe(slot)
        return () => observer.disconnect()
    }, [useStudio])

    React.useEffect(() => {
        const root = rootRef.current
        if (!root || !jsonDetails) return
        function selectFromMask(event: Event) {
            if (
                root!.dataset.homepageStage !== "orbit" ||
                root!.dataset.orbitState !== "checkpoint"
            )
                return
            const detail = (event as CustomEvent<unknown>).detail
            const values =
                detail && typeof detail === "object"
                    ? (detail as {
                          id?: unknown
                          apartmentId?: unknown
                          number?: unknown
                      })
                    : null
            const value =
                typeof detail === "string"
                    ? detail
                    : (values?.id ?? values?.apartmentId ?? values?.number)
            if (
                detail === null ||
                detail === "" ||
                (values &&
                    (values.id === null ||
                        values.apartmentId === null ||
                        values.number === null))
            ) {
                // Leaving the facade ends pointer emphasis, not the selection.
                setInteractionApartmentId(null)
                return
            }
            if (
                typeof value === "string" &&
                filterMatches.has(value) &&
                apartmentData.dataset?.apartments.some(
                    (item) => item.id === value
                )
            ) {
                setInteractionApartmentId(value)
                setSelectedApartmentId(value)
            }
        }
        root.addEventListener("admiral:apartment-hover", selectFromMask)
        return () => {
            root.removeEventListener("admiral:apartment-hover", selectFromMask)
        }
    }, [jsonDetails, apartmentData.dataset, filterMatches])

    React.useEffect(() => {
        const root = rootRef.current
        if (!root || staticRenderer) return
        const click = (event: Event) => {
            const detail = (event as CustomEvent<unknown>).detail
            const values =
                detail && typeof detail === "object"
                    ? (detail as {
                          id?: unknown
                          apartmentId?: unknown
                          number?: unknown
                      })
                    : null
            const id =
                typeof detail === "string"
                    ? detail
                    : (values?.id ?? values?.apartmentId ?? values?.number)
            if (typeof id !== "string" || !filterMatches.has(id)) return
            if (mobilePresentation) {
                // Touch selects first; the explicit Details action opens the
                // shared card. Desktop facade clicks retain their direct action.
                if (
                    jsonDetails &&
                    root!.dataset.homepageStage === "orbit" &&
                    root!.dataset.orbitState === "checkpoint" &&
                    Number(root!.dataset.orbitCheckpoint) >= 0 &&
                    apartmentData.dataset?.apartments.some(
                        (apartment) => apartment.id === id
                    )
                ) {
                    setInteractionApartmentId(id)
                    setSelectedApartmentId(id)
                }
            } else openApartmentDetails(id)
        }
        root.addEventListener("admiral:apartment-click", click)
        return () => root.removeEventListener("admiral:apartment-click", click)
    }, [
        openApartmentDetails,
        staticRenderer,
        mobilePresentation,
        jsonDetails,
        apartmentData.dataset,
        filterMatches,
    ])
    React.useEffect(() => {
        if (stage !== "orbit" && detailApartmentId) closeApartmentDetails()
    }, [stage, detailApartmentId, closeApartmentDetails])

    React.useEffect(() => {
        const root = rootRef.current,
            channel = root && homepageChannels.get(root)
        if (channel) {
            channel.timing = timing.current
            notifyHomepage()
        }
    }, [fadeExtra, openingMotion, openingOut, openingZoom, buildingIn, buildingFull, ctaIn, rise])
    React.useEffect(() => {
        const root = rootRef.current,
            channel = root && homepageChannels.get(root)
        if (channel) {
            channel.story = story.current
            notifyHomepage()
        }
    }, [storySettings])
    React.useEffect(() => {
        if (detailsMode === "off") clearApartmentDetails()
    }, [detailsMode, clearApartmentDetails])
    const orbitVisible = !staticRenderer && stage === "orbit"
    const groupControls = orbitVisible && orbitGroup ? (
        <OrbitGroupBar
            group={orbitGroup}
            visible={visibleGroupIds}
            selected={selectedApartment?.id || null}
            requested={groupRequest?.id || null}
            language={detailsLanguage}
            onSelect={selectOrbitGroupApartment}
            onClose={() => actions.current?.closeOrbitGroup()}
        />
    ) : null
    const arriving = !fullscreen.active && !staticRenderer &&
        (stage === "orbitApproach" || stage === "handoff") && !directOrbitEntry
    // Prime the correct thumbnail for checkpoint zero while the camera is still approaching.
    // The real mask becomes authoritative on arrival; grouped and deep-linked views choose their own apartment.
    const arrivalApartment = React.useMemo(() => {
        if (!arriving || !useGitHubAssets || !useVisibleMaskSelection || orbitGroup || orbitApartmentTarget)
            return null
        const visible = apartmentData.dataset?.apartments.filter(item =>
            filterMatches.has(item.id) && orbitApartmentCameras[item.id]?.includes(0))
        return visible?.find(item => item.id === previewApartmentId) || visible?.[0] || null
    }, [arriving, useGitHubAssets, useVisibleMaskSelection, orbitGroup, orbitApartmentTarget,
        apartmentData.dataset, filterMatches, previewApartmentId])
    // The last SEQ_02 poster is also the held first frame of SEQ_03.
    const gardenVisible = !!connectionVideoUrl && stage === "connection" && posterUrl === connectionEndPoster &&
        (staticRenderer || heroState === "arrival" || heroState === "reduced")
    const orbitStatic = staticRenderer && editorView === "orbit"
    const preparationPercent = Math.round(
        (100 * orbitInfo.requiredReady) / Math.max(1, orbitInfo.requiredTotal)
    )
    const checkpoints = Math.round(Math.max(2, Math.min(16, checkpointCount)))
    const paused = orbitInfo.state === "paused"
    const orbitMoving = orbitInfo.state !== "checkpoint"
    // Retain the preceding apartment until the destination mask has resolved.
    const orbitDataMoving = orbitMoving ||
        (useVisibleMaskSelection && visibleMaskApartments?.checkpoint !== orbitInfo.checkpoint)
    const orbitButtonStyle: React.CSSProperties = {
        ...homepageButton,
        opacity: orbitMoving ? 0.45 : 1,
        cursor: orbitMoving ? "default" : "pointer",
    }
    const stripFloorplanUrl = useOrbitPreviewImage(
        selectedApartmentDetails?.floorplanUrl || null,
        !useStudio && detailsMode !== "off",
        !!selectedApartment?.media?.floorplan?.thumbnail
    )
    const detailsData = selectedApartmentDetails
        ? {
              ...selectedApartmentDetails,
              floorplanUrl: stripFloorplanUrl || undefined,
          }
        : null
    const detailsVisible =
        !useStudio && detailsMode !== "off" && (orbitStatic || orbitVisible)
    const stripFiltersEnabled =
        !useStudio && !fullscreen.active && detailsMode !== "off"
    const orbitPanelVisible =
        orbitStatic || (orbitVisible && orbitInfo.state === "checkpoint")
    const classicOrbitPanel =
        stripFiltersEnabled && (orbitVisible || orbitStatic)
    const controlsBottom =
        classicOrbitPanel || detailsVisible
            ? `calc(${detailsBottom + detailsHeight + 20}px + env(safe-area-inset-bottom, 0px))`
            : "18px"
    const diagnosticBottom =
        classicOrbitPanel || detailsVisible
            ? detailsBottom + detailsHeight + (showControls ? 112 : 20)
            : 94
    const studioControls =
        useStudio && (stage === "orbit" || stage === "handoff")
    const studioSideControls = useStudio && orbitVisible && showControls && !fullscreen.active
    const showLegacyControls = !staticRenderer && showControls && !fullscreen.active &&
        (stage !== "orbit" || !useStudio)
    const stepFromSide = (heading: number) => {
        const player = actions.current?.orbit
        if (paused) player?.resume()
        player?.go(heading)
    }
    const frameRadius = "var(--admiral-studio-radius, 0px)"
    const imageClip =
        `inset(var(--admiral-image-y, 0px) var(--admiral-image-right, 0px) var(--admiral-image-cut, 0px) var(--admiral-image-x, 0px) round ${frameRadius})`
    const posterStyle: React.CSSProperties = {
        position: "absolute",
        top: "var(--admiral-image-y, 0px)",
        left: "var(--admiral-image-x, 0px)",
        width: "var(--admiral-image-width, 100%)",
        height: "var(--admiral-image-height, 100%)",
        // Clip the image itself so the still cannot fill the canvas's rounded corners.
        borderRadius: frameRadius,
        objectFit: "cover",
        objectPosition: `${focalX}% ${focalY}%`,
        pointerEvents: "none",
    }
    return (
        <HomepageFadeContext.Provider value={fadeExtra}>
        <div
            ref={rootRef}
            data-admiral-homepage=""
            data-admiral-fullscreen-fades=""
            data-admiral-orbit=""
            data-orbit-blue={useStudio && blueStudio ? "" : undefined}
            data-orbit-shared-backdrop={useStudio && blueStudio && pageBackdrop ? "" : undefined}
            data-homepage-stage={stage}
            data-homepage-nav-active={String(hostActive)}
            data-orbit-image-format={useGitHubAssets ? imageFormat ?? undefined : undefined}
            data-homepage-booted={String(homepageBooted)}
            data-direct-orbit-entry={String(!!directOrbitEntry)}
            data-orbit-fullscreen={String(fullscreen.active)}
            role="region"
            aria-label={alt}
            tabIndex={0}
            style={
                {
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    overflow: "hidden",
                    backgroundColor: useStudio ? (blueStudio && pageBackdrop ? "transparent" : studioTint) : background,
                    backgroundImage: useStudio && !(blueStudio && pageBackdrop) ? studioBackdrop : undefined,
                    backgroundPosition: useStudio && blueStudio && !pageBackdrop ? "54% 53%, 0 0, 0 0" : undefined,
                    backgroundSize: useStudio && blueStudio && !pageBackdrop ? "clamp(930px,100%,1780px) auto, 100% 100%, 100% 100%" : undefined,
                    backgroundRepeat: useStudio && blueStudio && !pageBackdrop ? "no-repeat" : undefined,
                    "--admiral-orbit-background": orbitBackground,
                    "--admiral-sequence-copy-duration": `${homepageContentFadeSeconds(timing.current)}s`,
                    "--admiral-sequence-copy-rise": `${rise}px`,
                    "--admiral-fade-panel": `${240 + fadeExtra * 1000}ms`,
                    "--admiral-fade-shell": `${400 + fadeExtra * 1000}ms`,
                    "--admiral-fade-record": `${180 + fadeExtra * 1000}ms`,
                    "--admiral-fade-plan": `${160 + fadeExtra * 1000}ms`,
                    "--admiral-fade-pulse": `${2400 + fadeExtra * 1000}ms`,
                    "--orbit-available-color": maskAvailableColor,
                    "--orbit-negotiation-color": maskNegotiationColor,
                    "--orbit-sold-color": maskSoldColor,
                    ...style,
                } as React.CSSProperties
            }
        >
            <style dangerouslySetInnerHTML={homepageStyleMarkup(homepageOrbitEntryStyles + orbitGroupStyles)} />
            <span
                id={homepageOrbitHash.slice(1)}
                data-admiral-orbit-anchor=""
                aria-hidden="true"
                style={{ position: "absolute", inset: "0 auto auto 0", width: 0, height: 0, pointerEvents: "none" }}
            />
            <style dangerouslySetInnerHTML={homepageStyleMarkup(HOMEPAGE_EXTENDED_FADE_STYLES)} />
            <style dangerouslySetInnerHTML={homepageStyleMarkup(orbitFavoriteStyles)} />
            <style dangerouslySetInnerHTML={homepageStyleMarkup(orbitLiquidGlassStyles)} />
            <style dangerouslySetInnerHTML={homepageStyleMarkup(orbitTourPanelStyles)} />
            <style dangerouslySetInnerHTML={homepageStyleMarkup(orbitPhoneRefinementStyles)} />
            {mobilePresentation && useStudio && (
                <style dangerouslySetInnerHTML={homepageStyleMarkup(homepageMobileOrbitStyles)} />
            )}
            {useStudio && (
                <OrbitApartmentStudio
                    favorites={favorites}
                    groupControls={!fullscreen.active ? groupControls : null}
                    arriving={arriving}
                    active={!fullscreen.active && (orbitVisible || orbitStatic)}
                    mobile={mobilePresentation}
                    moving={!staticRenderer && orbitDataMoving}
                    mode={detailsMode}
                    dataset={apartmentData.dataset}
                    dataStatus={apartmentData.status}
                    error={apartmentData.error}
                    filters={filterResult.filters}
                    filterBounds={filterBounds}
                    filterAreaBounds={filterAreaBounds}
                    filterBedroomBounds={filterBedroomBounds}
                    filterActive={filterResult.active}
                    filterCount={filterResult.matchingIds.length}
                    onFiltersChange={setApartmentFilters}
                    onRetry={apartmentData.retry}
                    apartment={selectedApartment ?? arrivalApartment}
                    onSelect={setSelectedApartmentId}
                    assetBase={apartmentAssetBase}
                    detailsUrl={detailPageUrl}
                    inquiryUrl={inquiryUrl}
                    onViewport={setStudioViewport}
                    language={detailsLanguage}
                    onLayout={refreshStudioLayout}
                    onOpenDetails={() => openApartmentDetails()}
                />
            )}
            <div
                ref={heroRootRef}
                data-admiral-sequence=""
                style={{
                    position: "absolute",
                    inset: 0,
                    zIndex: 2,
                    touchAction: "pinch-zoom",
                    backgroundImage: heroVideoUrl && !directOrbitEntry && posterUrl === heroStartPoster &&
                        (stage === "opening" || stage === "approach") ? `url("${HOMEPAGE_HERO_PREVIEW}")` : undefined,
                    backgroundSize: "cover",
                    backgroundPosition: `${focalX}% ${focalY}%`,
                    pointerEvents:
                        stage === "orbit" || stage === "handoff"
                            ? "none"
                            : "auto",
                    clipPath: imageClip,
                }}
            >
                <div data-flight-media="">
                <img
                    ref={posterRef}
                    src={directOrbitEntry || (startView === "orbit" && waitingForFormat) ? undefined : posterUrl}
                    alt={alt}
                    loading="eager"
                    decoding="async"
                    {...{ fetchpriority: "high" }}
                    crossOrigin="anonymous"
                    draggable={false}
                    style={posterStyle}
                />
                {heroVideoUrl && !staticRenderer && (
                    <video
                        ref={heroVideoRef}
                        data-admiral-hero-video=""
                        aria-hidden="true"
                        muted
                        playsInline
                        preload="none"
                        style={{ ...posterStyle, opacity: 0 }}
                    />
                )}
                {connectionVideoUrl && !staticRenderer && (
                    <video ref={connectionVideoRef} data-admiral-connection-video=""
                        data-admiral-orbit-approach-video={stage === "orbitApproach" ? "" : undefined}
                        aria-hidden="true" muted playsInline preload="none"
                        style={{ ...posterStyle, opacity: 0 }} />
                )}
                {heroVideoUrl && !staticRenderer && (
                    <img ref={heroEndLayerRef} alt="" aria-hidden="true" draggable={false}
                        crossOrigin="anonymous" decoding="async" style={{ ...posterStyle, opacity: 0 }} />
                )}
                {heroVideoUrl && (!staticRenderer || editorView === "building") && (
                    <img ref={heroInfographicRef}
                        src={staticRenderer ? HOMEPAGE_HERO_INFOGRAPHIC : undefined}
                        alt="Az A, B és C épület elhelyezkedése az Aranyhíd sétány mentén."
                        aria-hidden={staticRenderer ? undefined : true} draggable={false}
                        decoding="async" style={{ ...posterStyle, opacity: staticRenderer ? 1 : 0 }} />
                )}
                </div>
                <canvas
                    ref={heroCanvasRef}
                    aria-hidden="true"
                    width={1}
                    height={1}
                    style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        opacity: 0,
                        clipPath:
                            "inset(var(--admiral-image-y, 0px) 0px var(--admiral-image-cut, 0px) 0px)",
                    }}
                />
            </div>
            {directOrbitEntry && (
                <div
                    aria-hidden="true"
                    style={{ position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none", clipPath: imageClip,
                        visibility: directOrbitEntry.framed ? "visible" : "hidden" }}
                >
                    <img
                        key={directOrbitEntry.poster}
                        data-admiral-direct-orbit-poster=""
                        src={directOrbitEntry.framed ? directOrbitEntry.poster : undefined}
                        alt=""
                        loading="eager"
                        decoding="async"
                        {...{ fetchpriority: "high" }}
                        crossOrigin="anonymous"
                        draggable={false}
                        style={posterStyle}
                    />
                </div>
            )}
            <div
                ref={fullscreen.surfaceRef}
                data-orbit-fullscreen-surface=""
                data-active={String(fullscreen.active)}
                role={fullscreen.active ? "dialog" : undefined}
                aria-label={
                    fullscreen.active
                        ? detailsLanguage === "hu"
                            ? "Teljes képernyős épületnézet"
                            : "Fullscreen building view"
                        : undefined
                }
                aria-modal={fullscreen.active ? true : undefined}
                style={fullscreen.surfaceStyle}
            >
                <div
                    data-orbit-fullscreen-plane=""
                    data-rotated={String(
                        !!fullscreen.geometryRef.current?.rotated
                    )}
                    style={fullscreen.planeStyle}
                >
                    <canvas
                        ref={orbitCanvasRef}
                        data-orbit-render-canvas=""
                        aria-hidden="true"
                        width={1}
                        height={1}
                        style={{
                            position: "absolute",
                            inset: 0,
                            width: "100%",
                            height: "100%",
                            zIndex: 2,
                            touchAction: fullscreen.active
                                ? "none"
                                : "pan-y pinch-zoom",
                            pointerEvents: orbitVisible ? "auto" : "none",
                            clipPath: fullscreen.active ? "none" : imageClip,
                        }}
                    />
                    <canvas
                        ref={maskCanvasRef}
                        data-orbit-mask-overlay=""
                        aria-hidden="true"
                        width={1}
                        height={1}
                        style={{
                            position: "absolute",
                            inset: 0,
                            width: "100%",
                            height: "100%",
                            zIndex: 3,
                            opacity: orbitVisible ? 1 : 0,
                            pointerEvents: "none",
                            clipPath: fullscreen.active ? "none" : imageClip,
                        }}
                    />
                    {maskFailed && fullscreen.active && (
                        <button
                            type="button"
                            data-orbit-mask-retry=""
                            data-orbit-ignore=""
                            style={{
                                ...homepageButton,
                                position: "absolute",
                                left: 16,
                                top: 16,
                                zIndex: 9,
                            }}
                            onClick={() => maskPickerRef.current?.retry()}
                        >
                            {detailsLanguage === "hu"
                                ? "Lakáskijelölés újratöltése"
                                : "Retry apartment picking"}
                        </button>
                    )}
                    {fullscreen.active && (
                        <OrbitFullscreenDetails
                            favorites={favorites}
                            groupControls={groupControls}
                            apartment={selectedApartment}
                            dataset={apartmentData.dataset}
                            assetBase={apartmentAssetBase}
                            language={detailsLanguage}
                            filters={filterResult.filters}
                            filterBounds={filterBounds}
                            filterAreaBounds={filterAreaBounds}
                            filterBedroomBounds={filterBedroomBounds}
                            filterCount={filterResult.matchingIds.length}
                            total={
                                apartmentData.dataset?.apartments.length || 0
                            }
                            onFiltersChange={setApartmentFilters}
                            emptyMessage={
                                filterResult.active &&
                                filterResult.matchingIds.length === 0
                                    ? detailsLanguage === "hu"
                                        ? "Nincs a szűrésnek megfelelő lakás."
                                        : "No apartments match these filters."
                                    : undefined
                            }
                            onOpenDetails={() => openApartmentDetails()}
                            moving={orbitDataMoving}
                            onPrevious={() => actions.current?.orbit?.go(-1)}
                            onNext={() => actions.current?.orbit?.go(1)}
                            onClose={fullscreen.close}
                            checkpoint={orbitInfo.checkpoint}
                            count={checkpoints}
                        />
                    )}
                </div>
            </div>
            <span ref={wheelCursorRef} data-orbit-wheel-cursor="" aria-hidden="true" hidden>
                Turn the view
            </span>
            {mobilePresentation &&
                useStudio &&
                orbitVisible &&
                !fullscreen.active && (
                    <button
                        type="button"
                        data-orbit-fullscreen-open=""
                        data-orbit-ignore=""
                        aria-haspopup="dialog"
                        aria-label={
                            detailsLanguage === "hu"
                                ? "Teljes képernyő"
                                : "Fullscreen view"
                        }
                        title={
                            detailsLanguage === "hu"
                                ? "Teljes képernyő"
                                : "Fullscreen view"
                        }
                        onClick={fullscreen.open}
                    >
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.65"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                            focusable="false"
                        >
                            <path d="M8 4H4v4m12-4h4v4M4 16v4h4m12-4v4h-4" />
                        </svg>
                    </button>
                )}
            {maskFailed && orbitVisible && !fullscreen.active && (
                <button
                    type="button"
                    data-orbit-mask-retry=""
                    data-orbit-ignore=""
                    style={{
                        ...homepageButton,
                        position: "absolute",
                        left: "calc(var(--admiral-image-x, 0px) + 12px)",
                        top: "calc(var(--admiral-image-y, 0px) + 12px)",
                        zIndex: 5,
                    }}
                    onClick={() => maskPickerRef.current?.retry()}
                >
                    {detailsLanguage === "hu"
                        ? "Lakáskijelölés újratöltése"
                        : "Retry apartment picking"}
                </button>
            )}
            {orbitStatic && (
                <span
                    style={{
                        position: "absolute",
                        inset: 0,
                        pointerEvents: "none",
                    }}
                />
            )}
            <div
                data-flight-shade=""
                aria-hidden="true"
                style={{
                    position: "absolute",
                    top: "var(--admiral-image-y, 0px)",
                    left: "var(--admiral-image-x, 0px)",
                    width: "var(--admiral-image-width, 100%)",
                    height: "var(--admiral-image-height, 100%)",
                    borderRadius: frameRadius,
                    background: "#000",
                    opacity: darken,
                    pointerEvents: "none",
                    zIndex: 2,
                }}
            />
            {(gardenTitle || gardenBody) && (
                <div data-seq3-garden="" data-visible={gardenVisible} aria-hidden={!gardenVisible}>
                    {gardenTitle && <h2>{gardenTitle}</h2>}
                    {gardenBody && <p>{gardenBody}</p>}
                </div>
            )}
            <div data-seq3-garden-cue="" data-visible={gardenVisible} aria-hidden={!gardenVisible}>
                <div aria-hidden="true">
                    <AdmiralScrollCue caption="A folytatáshoz görgessen lefelé" />
                </div>
                <button type="button" data-seq3-cue-action=""
                    aria-label="A folytatáshoz görgessen lefelé – továbblépés a 3D nézethez"
                    disabled={!gardenVisible || staticRenderer}
                    onClick={() => actions.current?.startOrbitApproach()}
                />
            </div>
            {studioSideControls && orbitInfo.state !== "error" && (
                <div
                    data-homepage-controls=""
                    data-orbit-side-controls=""
                    data-orbit-ignore=""
                    data-mobile={String(mobilePresentation)}
                    role="group"
                    aria-label={detailsLanguage === "hu" ? "Nézetváltás" : "Building views"}
                >
                    {([-1, 1] as const).map((heading) => (
                        <button
                            key={heading}
                            type="button"
                            data-orbit-side-arrow={heading < 0 ? "previous" : "next"}
                            aria-label={heading < 0
                                ? detailsLanguage === "hu" ? "Előző nézet" : "Previous view"
                                : detailsLanguage === "hu" ? "Következő nézet" : "Next view"}
                            disabled={orbitMoving && !paused}
                            onClick={() => stepFromSide(heading)}
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                                strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                                <path d={heading < 0 ? "M19 12H5m6-6-6 6 6 6" : "M5 12h14m-6-6 6 6-6 6"} />
                            </svg>
                        </button>
                    ))}
                </div>
            )}
            {showLegacyControls && (
                <div
                    data-homepage-controls=""
                    data-orbit-ignore=""
                    style={{
                        position: "absolute",
                        bottom: studioControls ? "auto" : controlsBottom,
                        top: studioControls ? "var(--admiral-controls-top)" : "auto",
                        left: studioControls
                            ? "var(--admiral-controls-left)"
                            : "50%",
                        transform: "translateX(-50%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexWrap: "wrap",
                        gap: 7,
                        width: "max-content",
                        maxWidth: studioControls
                            ? "var(--admiral-controls-width)"
                            : "94%",
                        zIndex: 3,
                    }}
                >
                    {(stage === "opening" || stage === "approach") && (
                        <button
                            type="button"
                            style={homepageButton}
                            onClick={() => actions.current?.skip()}
                        >
                            Skip approach
                        </button>
                    )}
                    {stage === "approach" &&
                        (heroState === "paused" || heroState === "error") && (
                            <button
                                type="button"
                                style={homepageButton}
                                onClick={() => actions.current?.resumeHero()}
                            >
                                {heroState === "error"
                                    ? "Retry approach"
                                    : "Continue approach"}
                            </button>
                        )}
                    {(stage === "connection" || stage === "orbitApproach") && (
                        <button
                            type="button"
                            style={homepageButton}
                            onClick={() => actions.current?.skip()}
                        >
                            {stage === "connection" && connectionVideoUrl && (heroState === "arrival" || heroState === "reduced")
                                ? (detailsLanguage === "en" ? "Explore in 3D" : "Tovább a 3D nézethez")
                                : "Skip connection"}
                        </button>
                    )}
                    {(stage === "connection" || stage === "orbitApproach") &&
                        (heroState === "paused" || heroState === "error") && (
                            <button
                                type="button"
                                style={homepageButton}
                                onClick={() => actions.current?.resumeHero()}
                            >
                                {heroState === "error"
                                    ? "Retry connection"
                                    : "Continue connection"}
                            </button>
                        )}
                    {stage === "building" && (
                        <button
                            type="button"
                            style={homepageButton}
                            onClick={() => actions.current?.explore()}
                        >
                            Explore building
                        </button>
                    )}
                    {stage === "handoff" && orbitInfo.state !== "error" && (
                        <span
                            role="status"
                            style={{ ...homepageButton, cursor: "default" }}
                        >
                            Preparing orbit {preparationPercent}%
                        </span>
                    )}
                    {(stage === "building" ||
                        stage === "connection" || stage === "orbitApproach" ||
                        stage === "handoff" ||
                        (stage === "orbit" && !useStudio)) && (
                        <button
                            type="button"
                            style={homepageButton}
                            onClick={() => actions.current?.overview()}
                        >
                            Overview
                        </button>
                    )}
                    {stage === "orbit" && !useStudio && (
                        <>
                            {detailsMode === "preview" && (
                                <button
                                    type="button"
                                    disabled={orbitMoving || !selectedApartment}
                                    style={{
                                        ...orbitButtonStyle,
                                        opacity:
                                            orbitMoving || !selectedApartment
                                                ? 0.45
                                                : 1,
                                    }}
                                    onClick={() => openApartmentDetails()}
                                >
                                    Open apartment details
                                </button>
                            )}
                            <button
                                type="button"
                                aria-label="Previous view"
                                disabled={orbitMoving}
                                style={orbitButtonStyle}
                                onClick={() => actions.current?.orbit?.go(-1)}
                            >
                                ←
                            </button>
                            <span
                                aria-live="polite"
                                style={{
                                    ...homepageButton,
                                    cursor: "default",
                                    minWidth: 65,
                                    textAlign: "center",
                                }}
                            >
                                {orbitInfo.checkpoint >= 0
                                    ? `View ${orbitInfo.checkpoint + 1} / ${checkpoints}`
                                    : orbitInfo.state === "checkpoint"
                                      ? "Custom view"
                                      : orbitInfo.state === "buffering"
                                        ? "Preparing view…"
                                        : orbitInfo.state === "error"
                                          ? "View unavailable"
                                          : "Looking around"}
                            </span>
                            <button
                                type="button"
                                aria-label="Next view"
                                disabled={orbitMoving}
                                style={orbitButtonStyle}
                                onClick={() => actions.current?.orbit?.go(1)}
                            >
                                →
                            </button>
                            <button
                                type="button"
                                data-orbit-playback-toggle=""
                                disabled={orbitInfo.state === "error"}
                                style={homepageButton}
                                onClick={() =>
                                    paused
                                        ? actions.current?.orbit?.resume()
                                        : actions.current?.orbit?.pause()
                                }
                            >
                                {paused
                                    ? "Continue rotation"
                                    : "Pause rotation"}
                            </button>
                            {showViewpoints && (
                                Array.from({ length: checkpoints }, (_, i) => (
                                    <button
                                        key={i}
                                        type="button"
                                        aria-label={`View ${i + 1}`}
                                        aria-pressed={
                                            orbitInfo.checkpoint === i
                                        }
                                        disabled={orbitMoving}
                                        style={{
                                            ...orbitButtonStyle,
                                            padding: "7px 9px",
                                            background:
                                                orbitInfo.checkpoint === i
                                                    ? "rgba(255,255,255,.9)"
                                                    : homepageButton.background,
                                            color:
                                                orbitInfo.checkpoint === i
                                                    ? "#101820"
                                                    : homepageButton.color,
                                        }}
                                        onClick={() =>
                                            actions.current?.orbit?.setCheckpoint(
                                                i
                                            )
                                        }
                                    >
                                        {i + 1}
                                    </button>
                                ))
                            )}
                        </>
                    )}
                </div>
            )}
            {!staticRenderer &&
                !showControls &&
                ["opening", "approach", "connection", "orbitApproach"].includes(stage) &&
                (heroState === "paused" || heroState === "error") && (
                    <div
                        data-homepage-controls=""
                        data-homepage-recovery={
                            stage === "orbitApproach" ? "SEQ_03" : stage === "connection" ? "SEQ_02" : "SEQ_01"
                        }
                        data-orbit-ignore=""
                        role="group"
                        aria-label={detailsLanguage === "en" ? "Animation playback" : "Animáció lejátszása"}
                        style={{
                            position: "absolute",
                            bottom: 18,
                            left: "50%",
                            transform: "translateX(-50%)",
                            display: "flex",
                            gap: 7,
                            zIndex: 3,
                        }}
                    >
                        <button
                            type="button"
                            style={homepageButton}
                            onClick={() => actions.current?.resumeHero()}
                        >
                            {heroState === "error"
                                ? (detailsLanguage === "en" ? "Try again" : "Újrapróbálom")
                                : (detailsLanguage === "en" ? "Continue" : "Folytatás")}
                        </button>
                        <button
                            type="button"
                            style={homepageButton}
                            onClick={() => actions.current?.skip()}
                        >
                            {detailsLanguage === "en" ? "Skip this film" : "Animáció átugrása"}
                        </button>
                    </div>
                )}
            {!staticRenderer &&
                !showControls &&
                orbitInfo.state === "buffering" && (
                    <span
                        role="status"
                        style={{
                            ...homepageButton,
                            position: "absolute",
                            bottom: 18,
                            left: "50%",
                            transform: "translateX(-50%)",
                            pointerEvents: "none",
                            zIndex: 3,
                        }}
                    >
                        Preparing view…
                    </span>
                )}
            {!staticRenderer &&
                (stage === "handoff" || stage === "orbit") &&
                orbitInfo.state === "error" && (
                    <div
                        data-homepage-controls=""
                        data-orbit-ignore=""
                        data-orbit-recovery=""
                        style={{
                            position: "absolute",
                            top: "calc(var(--admiral-image-y, 0px) + var(--admiral-image-height, 100%) / 2)",
                            left: "var(--admiral-controls-left, 50%)",
                            transform: "translate(-50%, -50%)",
                            zIndex: 10,
                        }}
                    >
                        <button
                            type="button"
                            style={homepageButton}
                            onClick={() => {
                                void (
                                    rootRef.current as
                                        | (HTMLElement & {
                                              retryOrbit?: () => Promise<void>
                                          })
                                        | null
                                )?.retryOrbit?.()
                            }}
                        >
                            {detailsLanguage === "en" ? "Retry orbit" : "3D nézet újrapróbálása"}
                        </button>
                    </div>
                )}
            {!useStudio && !fullscreen.active && detailsMode !== "off" && (
                <ApartmentDetailsStrip
                    favorites={favorites}
                    apartment={detailsData}
                    language={detailsLanguage}
                    visible={detailsVisible}
                    preview={false}
                    bottom={detailsBottom}
                    inset={detailsInset}
                    onHeightChange={setDetailsHeight}
                    onOpen={
                        jsonDetails ? () => openApartmentDetails() : undefined
                    }
                    moving={orbitVisible && orbitDataMoving}
                    filtersVisible={classicOrbitPanel}
                    filters={
                        (!fullscreen.active && groupControls) || (stripFiltersEnabled ? (
                            <div data-orbit-desktop-filters="">
                                <OrbitFilterBar
                                    active={orbitPanelVisible && !orbitDataMoving}
                                    visible={classicOrbitPanel}
                                    language={detailsLanguage}
                                    filters={filterResult.filters}
                                    bounds={filterBounds}
                                    areaBounds={filterAreaBounds}
                                    bedroomBounds={filterBedroomBounds}
                                    matchCount={filterResult.matchingIds.length}
                                    total={
                                        apartmentData.dataset?.apartments
                                            .length || 0
                                    }
                                    onChange={setApartmentFilters}
                                    presentation="overlay"
                                />
                            </div>
                        ) : undefined)
                    }
                />
            )}
            {!staticRenderer && (
                <AdmiralApartmentDetailCard
                    openId={detailApartmentId}
                    dataUrl={detailDataUrl}
                    assetBase={apartmentAssetBase}
                    inquiryUrl={inquiryUrl}
                    pageUrl={detailPageUrl}
                    onOpenChange={reportDetailOpen}
                    onClosed={closeApartmentDetails}
                    liveDataset={apartmentData.dataset}
                />
            )}
            {!staticRenderer &&
                !useStudio &&
                jsonDetails &&
                orbitVisible &&
                apartmentData.status === "error" && (
                    <div
                        data-orbit-ignore=""
                        role="status"
                        style={{
                            position: "absolute",
                            left: "4%",
                            bottom: 24,
                            zIndex: 4,
                        }}
                    >
                        <button
                            type="button"
                            style={homepageButton}
                            onClick={apartmentData.retry}
                        >
                            {detailsLanguage === "en"
                                ? "Retry apartment data"
                                : "Lakásadatok újratöltése"}
                        </button>
                    </div>
                )}
            {!staticRenderer && showDiagnostics && (
                <output
                    data-homepage-diagnostics=""
                    style={{
                        position: "absolute",
                        left: 12,
                        bottom: diagnosticBottom,
                        pointerEvents: "none",
                        background: "rgba(0,0,0,.65)",
                        color: "#fff",
                        padding: 8,
                        borderRadius: 4,
                        font: "11px/1.5 monospace",
                        zIndex: 2,
                    }}
                >
                    {stage} · {orbitInfo.state} · frame {orbitInfo.frame} ·
                    downloaded {orbitInfo.downloaded}/{orbitInfo.total} ·
                    buffered {orbitInfo.buffered}/{orbitInfo.bufferTotal} ·
                    required {orbitInfo.requiredReady}/{orbitInfo.requiredTotal}{" "}
                    · decoded {orbitInfo.decoded}
                </output>
            )}
            <span
                role="status"
                aria-live="polite"
                style={{
                    position: "absolute",
                    width: 1,
                    height: 1,
                    overflow: "hidden",
                    clipPath: "inset(50%)",
                }}
            >
                {orbitInfo.state === "error"
                    ? "Orbit unavailable. Retry the images or use the navigation."
                    : ""}
            </span>
        </div>
        </HomepageFadeContext.Provider>
    )
}

function createHomepageOverlay(Component: React.ComponentType<any>, kind: "opening" | "openingText" | "openingScroll" | "building" | "cta"): React.ComponentType<any> {
    const openingKind = kind === "opening" || kind === "openingText" || kind === "openingScroll"
    const Overlay = React.forwardRef<HTMLElement, any>((props, forwardedRef) => {
        const elementRef = React.useRef<HTMLElement | null>(null)
        const ref = React.useCallback((node: HTMLElement | null) => {
            elementRef.current = node
            if (typeof forwardedRef === "function") forwardedRef(node)
            else if (forwardedRef) forwardedRef.current = node
        }, [forwardedRef])
        React.useEffect(() => {
            const element = elementRef.current
            if (!element?.style) return
            const original = { opacity: element.style.opacity, translate: element.style.translate, scale: element.style.scale, pointerEvents: element.style.pointerEvents, visibility: element.style.visibility, hidden: element.getAttribute("aria-hidden"), inert: element.inert }
            let selected: HTMLElement | null = null
            let previousStage: HomepageStage | undefined, lastTiming: HomepageTiming | null = null
            let fadeFrame = 0, contentFrame = 0, disposed = false
            let departure: { from: number; started: number; timing: HomepageTiming } | null = null
            const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
            const cssComponents = (value: string) => {
                const parts: string[] = []; let start = 0, depth = 0
                for (let index = 0; index <= value.length; index++) {
                    if (value[index] === "(") depth++
                    else if (value[index] === ")") depth--
                    if (index === value.length || (!depth && /\s/.test(value[index]))) {
                        if (index > start) parts.push(value.slice(start, index))
                        start = index + 1
                    }
                }
                return parts
            }
            // Compose with the native Framer pose; never replace authored centring.
            const authoredTranslate = getComputedStyle(element).translate
            const baseTranslate = authoredTranslate === "none" ? ["0px", "0px"] : cssComponents(authoredTranslate)
            const fadeDuration = homepageContentFadeSeconds
            function stopContentFrames() {
                if (contentFrame) cancelAnimationFrame(contentFrame)
                contentFrame = 0
            }
            function nextContentFrame() {
                contentFrame = 0
                if (!disposed) update(true)
            }
            function stopFade() {
                if (fadeFrame) cancelAnimationFrame(fadeFrame)
                fadeFrame = 0; departure = null
            }
            function paint(opacity: number, t: HomepageTiming, interactive: boolean, leaving = openingKind) {
                element!.style.opacity = String(opacity)
                const distance = kind === "opening" ? (t.openingMotion?.logo.distance ?? 20) : kind === "openingText" ? (t.openingMotion?.text.distance ?? 20) : kind === "openingScroll" ? (t.openingMotion?.scroll.distance ?? 20) : t.rise
                const travel = reducedMotion.matches ? 0 : (1 - opacity) * distance * (leaving ? -1 : 1)
                element!.style.translate = travel === 0 ? original.translate : 
                    baseTranslate[0] + " calc(" + (baseTranslate[1] || "0px") + " + " + travel + "px) " + (baseTranslate[2] || "0px")
                element!.style.scale = original.scale
                element!.style.visibility = opacity < .001 ? "hidden" : original.visibility
                element!.style.pointerEvents = interactive ? (original.pointerEvents || "auto") : "none"; element!.inert = interactive ? original.inert : true
                if (opacity < .01) element!.setAttribute("aria-hidden", "true")
                else if (original.hidden === null) element!.removeAttribute("aria-hidden"); else element!.setAttribute("aria-hidden", original.hidden)
                element!.dataset.heroOverlay = kind
            }
            function fadeDeparture(now: number) {
                fadeFrame = 0
                if (disposed || !departure) return
                const progress = sequenceClamp((now - departure.started) / (fadeDuration(departure.timing) * 1000))
                paint(departure.from * (1 - sequenceEase(progress)), departure.timing, false, true)
                if (progress < 1) fadeFrame = requestAnimationFrame(fadeDeparture)
                else departure = null
            }
            function resolve() {
                if (selected?.isConnected && homepageChannels.has(selected) && selected.getBoundingClientRect().width > 0) return homepageChannels.get(selected)
                let parent = element!.parentElement
                while (parent) {
                    const candidates = [...homepageChannels.keys()].filter(root => parent!.contains(root) && root.getBoundingClientRect().width > 0)
                    if (candidates.length) {
                        selected = candidates[0]
                        return homepageChannels.get(selected)
                    }
                    parent = parent.parentElement
                }
            }
            function update(fromContentFrame = false) {
                const channel = fromContentFrame && selected?.isConnected ? homepageChannels.get(selected) : resolve()
                if (!channel) {
                    stopFade(); stopContentFrames(); previousStage = undefined
                    if (lastTiming) paint(0, lastTiming, false)
                    return
                }
                const fromStage = previousStage
                previousStage = channel.stage
                const t = channel.timing
                const motionEnabled = !channel.static && !reducedMotion.matches
                const openingDelay = kind === "opening" ? (t.openingMotion?.logo.delay ?? .2) : kind === "openingText" ? (t.openingMotion?.text.delay ?? 0) : kind === "openingScroll" ? (t.openingMotion?.scroll.delay ?? 0) : 0
                const continuous = motionEnabled ? channel.openingProgress?.(openingDelay) : undefined
                const progress = Number.isFinite(continuous) ? sequenceClamp(continuous!) : channel.snapshot.progress
                lastTiming = t
                const openingEnd = kind === "openingScroll" ? (t.openingMotion?.scroll.end ?? t.openingOut * .72) : kind === "openingText" ? (t.openingMotion?.text.end ?? t.openingOut) : t.openingOut
                const phaseLimit = openingKind ? 100 : kind === "building" ? t.buildingFull : 100
                // While moving, only the display-refresh callback paints opening
                // copy. Source-frame notifications must not interleave a second pose.
                if (motionEnabled && channel.enabled && channel.snapshot.playing === true && !fromContentFrame && !document.hidden && (contentFrame || progress * 100 < Math.max(1, phaseLimit))) {
                    if (!contentFrame) contentFrame = requestAnimationFrame(nextContentFrame)
                    return
                }
                if (departure && (channel.enabled || reducedMotion.matches)) stopFade()
                if ((kind === "building" || kind === "cta") && fromStage === "building" && channel.stage === "connection" && !reducedMotion.matches) {
                    const from = sequenceClamp(parseFloat(getComputedStyle(element!).opacity) || 0)
                    if (from > .001) {
                        stopFade(); departure = { from, started: performance.now(), timing: t }
                        // The text stays visible through the dissolve, but its CTA stops accepting input immediately.
                        paint(from, t, false, true); fadeFrame = requestAnimationFrame(fadeDeparture)
                        return
                    }
                }
                if (departure) return
                const ramp = (from: number, to: number, position = progress) => sequenceEase(sequenceClamp((position * 100 - from) / Math.max(1, to - from)))
                const faded = (from: number, to: number) => motionEnabled ? channel.fadeProgress?.(from, to, openingDelay) ?? progress : progress
                const openingPhase = ramp(0, t.openingOut)
                // Both sequence departures use the same time-based ease and travel.
                // The opening reads the camera clock so it also unwinds on reverse.
                const departurePhase = motionEnabled
                    ? channel.departureProgress?.(fadeDuration(t), openingDelay) ?? ramp(0, openingEnd, faded(0, openingEnd))
                    : channel.static ? ramp(0, openingEnd) : progress === 0 ? 0 : 1
                const openingOpacity = 1 - sequenceEase(sequenceClamp(departurePhase))
                const opacity = !channel.enabled ? 0 : openingKind ? openingOpacity : kind === "building" ? ramp(t.buildingIn, t.buildingFull, faded(t.buildingIn, t.buildingFull)) : ramp(t.ctaIn, 100, faded(t.ctaIn, 100))
                const interactive = channel.enabled && opacity >= .98 && (!openingKind || openingPhase === 0) && (kind !== "cta" || channel.snapshot.state === "arrival" || channel.snapshot.state === "reduced")
                paint(opacity, t, interactive)
                // Images retain their authored frame cadence; native text samples
                // the same playback clock on each display refresh without prediction.
                if (motionEnabled && channel.enabled && channel.snapshot.playing === true && progress * 100 < phaseLimit && !document.hidden) {
                    if (!contentFrame) contentFrame = requestAnimationFrame(nextContentFrame)
                } else stopContentFrames()
            }
            const motionChanged = () => update()
            homepageSubscribers.add(update); reducedMotion.addEventListener("change", motionChanged); update()
            return () => {
                disposed = true; stopFade(); stopContentFrames(); reducedMotion.removeEventListener("change", motionChanged)
                homepageSubscribers.delete(update); element.style.opacity = original.opacity; element.style.translate = original.translate; element.style.scale = original.scale
                element.style.pointerEvents = original.pointerEvents; element.style.visibility = original.visibility; element.inert = original.inert
                if (original.hidden === null) element.removeAttribute("aria-hidden"); else element.setAttribute("aria-hidden", original.hidden)
                delete element.dataset.heroOverlay
            }
        }, [])
        return <Component {...props} ref={ref} data-admiral-opening-overlay={openingKind ? "" : undefined} style={{ ...props.style, opacity: openingKind ? 1 : 0 }} />
    })
    Overlay.displayName = `Homepage${kind}`
    return Overlay
}
export function OpeningContent(Component: ComponentType<any>): ComponentType {
    return createHomepageOverlay(Component, "opening")
}
export function OpeningTextContent(Component: ComponentType<any>): ComponentType {
    return createHomepageOverlay(Component, "openingText")
}
export function OpeningScrollContent(Component: ComponentType<any>): ComponentType {
    return createHomepageOverlay(Component, "openingScroll")
}
export function BuildingContent(Component: ComponentType<any>): ComponentType {
    return createHomepageOverlay(Component, "building")
}
export function ArrivalCTA(Component: ComponentType<any>): ComponentType {
    return createHomepageOverlay(Component, "cta")
}
export function BalatonfuredContent(
    Component: ComponentType<any>
): ComponentType {
    return createHomepageOverlay(Component, "opening")
}
export function AranyhidContent(Component: ComponentType<any>): ComponentType {
    return createHomepageOverlay(Component, "building")
}

AdmiralHomepageStudio.displayName = "Admiral Homepage Studio"
addPropertyControls(AdmiralHomepageStudio, {
    contentFadeDuration: {
        type: ControlType.Number,
        title: "SEQ01–03 · Fade",
        defaultValue: .8, min: .1, max: 3, step: .05, unit: "s",
        description: "Base duration for the gentle upward departure of SEQ01 logo, caption and scroll cue, and SEQ02/03 content. Global fade extra is added once; 0.8 + 0.5 gives a gentle 1.3-second fade. Camera speed stays independent.",
    },
    openingLogoMotion: {
        type: ControlType.Object,
        title: "SEQ01 · Logo",
        description: "OpeningContent: gently fades UP when SEQ01 starts, at its authored size. Uses SEQ01–03 · Fade plus Global fade extra.",
        controls: {
            delay: { type: ControlType.Number, title: "Departure delay", defaultValue: .2, min: 0, max: 2, step: .05, unit: "s", description: "Wait after the camera starts before the logo fades upward. 0.2 s lets the text and scroll cue begin disappearing slightly earlier; 0 synchronises all three." },
            distance: { type: ControlType.Number, title: "Move up", defaultValue: 20, min: 0, max: 80, step: 1, unit: "px", description: "Small upward travel during the fade. 20 px matches SEQ02; 0 gives an opacity-only fade. The logo does not enlarge." },
        },
    },
    openingTextMotion: {
        type: ControlType.Object,
        title: "SEQ01 · Text",
        description: "OpeningTextContent: the opening caption fades UP gently. The common duration is SEQ01–03 · Fade plus Global fade extra.",
        controls: {
            delay: { type: ControlType.Number, title: "Departure delay", defaultValue: 0, min: 0, max: 2, step: .05, unit: "s", description: "Seconds before the caption fades upward. 0 starts with the camera; the logo follows 0.2 s later by default." },
            distance: { type: ControlType.Number, title: "Move up", defaultValue: 20, min: 0, max: 80, step: 1, unit: "px", description: "Upward travel while the caption fades. 20 px matches the logo and SEQ02; 0 fades without movement." },
        },
    },
    openingScrollMotion: {
        type: ControlType.Object,
        title: "SEQ01 · Scroll",
        description: "OpeningScrollContent: the whole glass scroll cue gently fades UP. Its inner scrolling animation is independent.",
        controls: {
            delay: { type: ControlType.Number, title: "Departure delay", defaultValue: 0, min: 0, max: 2, step: .05, unit: "s", description: "Seconds before the scroll cue fades upward. 0 matches the text and lets the logo follow slightly later." },
            distance: { type: ControlType.Number, title: "Move up", defaultValue: 20, min: 0, max: 80, step: 1, unit: "px", description: "Upward travel for the whole cue while fading. 20 px matches both sequences. Does not alter the inner loop." },
        },
    },
    fadeExtension: {
        type: ControlType.Number,
        title: "Global fade extra",
        defaultValue: .5,
        min: 0,
        max: 2,
        step: .05,
        unit: "s",
        description: "Extra seconds for image dissolves, native content fades, orbit UI and OrbitView stories. This is shared by the whole homepage. SEQ01–03 · Fade sets the common content departure duration; the three SEQ01 groups set their delay and upward travel.",
    },
    useGitHubAssets: {
        type: ControlType.Boolean,
        title: "GitHub assets",
        defaultValue: true,
    },
    heroBaseUrl: {
        type: ControlType.String,
        title: "SEQ_01 folder",
        defaultValue: "",
        hidden: (p) => p.useGitHubAssets !== false,
    },
    connectionBaseUrl: {
        type: ControlType.String,
        title: "SEQ_02 folder",
        defaultValue: "",
        hidden: (p) => p.useGitHubAssets !== false,
    },
    orbitBaseUrl: {
        type: ControlType.String,
        title: "Orbit folder",
        defaultValue: "",
        hidden: (p) => p.useGitHubAssets !== false,
    },
    maskPicking: {
        type: ControlType.Boolean,
        title: "Apartment masks",
        defaultValue: true,
        description:
            "Hover on desktop or tap on phones to select an apartment at the eight parked camera views.",
    },
    apartmentLighting: {
        type: ControlType.Boolean,
        title: "Apartment lights",
        defaultValue: true,
        description: "Rendered windows at all eight parked views. Available apartments use the warm render, sold apartments use the red render, and apartments under discussion use the negotiation colour.",
        hidden: (p) => p.maskPicking === false,
    },
    apartmentLightingAtlas: {
        type: ControlType.String,
        title: "Lights atlas",
        defaultValue: HOMEPAGE_LIGHTING_ATLAS_URL,
        hidden: (p) => p.maskPicking === false || p.apartmentLighting === false,
    },
    apartmentLightingData: {
        type: ControlType.String,
        title: "Lights placement",
        defaultValue: HOMEPAGE_LIGHTING_DATA_URL,
        hidden: (p) => p.maskPicking === false || p.apartmentLighting === false,
    },
    maskBaseUrl: {
        type: ControlType.String,
        title: "Mask folder",
        defaultValue: "",
        hidden: (p) => p.useGitHubAssets !== false || p.maskPicking === false,
    },
    maskAvailableColor: {
        type: ControlType.Color,
        title: "Available colour",
        defaultValue: "#46A66A",
        hidden: (p) => p.maskPicking === false,
    },
    maskNegotiationColor: {
        type: ControlType.Color,
        title: "Negotiation colour",
        defaultValue: "#E2B849",
        hidden: (p) => p.maskPicking === false,
    },
    maskSoldColor: {
        type: ControlType.Color,
        title: "Sold colour",
        defaultValue: "#DA5961",
        hidden: (p) => p.maskPicking === false,
    },
    maskHighlightColor: {
        type: ControlType.Color,
        title: "Other status colour",
        defaultValue: "#f8d68b",
        hidden: (p) => p.maskPicking === false,
    },
    maskHighlightOpacity: {
        type: ControlType.Number,
        title: "Solid mask strength",
        description: "Solid mask opacity on hover or tap. Filter matches use half this value. Available apartments retain warm window lighting with a subtle lift across the entire apartment.",
        defaultValue: 50,
        min: 5,
        max: 70,
        step: 1,
        unit: "%",
        hidden: (p) => p.maskPicking === false,
    },
    startView: {
        type: ControlType.Enum,
        title: "Start trial",
        options: ["opening", "orbit"],
        optionTitles: ["Full journey", "Orbit directly"],
        defaultValue: "opening",
    },
    gardenTitle: {
        type: ControlType.String, title: "SEQ03 · Heading", defaultValue: defaultGardenTitle,
        description: "Garden headline on the held frame before the third flight.",
    },
    gardenBody: {
        type: ControlType.String, title: "SEQ03 · Body", defaultValue: defaultGardenBody, displayTextArea: true,
        description: "One sentence beneath the heading. Choose SEQ_02 end / SEQ_03 start in Editor view to preview it.",
    },
    editorView: {
        type: ControlType.Enum,
        title: "Editor view",
        options: ["opening", "building", "connection", "orbit"],
        optionTitles: [
            "SEQ_01 opening",
            "SEQ_01 arrival",
            "SEQ_02 end / SEQ_03 start",
            "Orbit",
        ],
        defaultValue: "opening",
    },
    editorOrbitView: {
        type: ControlType.Enum,
        title: "Editor orbit view",
        options: ["entry", "1", "2", "3", "4", "5", "6", "7", "8"],
        optionTitles: [
            "Entry camera",
            "View 1",
            "View 2",
            "View 3",
            "View 4",
            "View 5",
            "View 6",
            "View 7",
            "View 8",
        ],
        defaultValue: "entry",
        hidden: (p) => p.editorView !== "orbit",
        description:
            "Preview one camera and its native story group while editing. The published orbit entry stays unchanged.",
    },
    sharpCheckpointUrls: {
        type: ControlType.Array,
        title: "Sharp parked views",
        control: { type: ControlType.String, title: "Image URL" },
        maxCount: 8,
        defaultValue: [],
        hidden: (p) => p.checkpointCount !== undefined && p.checkpointCount !== 8,
        description: "Optional sharp images for the 8 parked cameras. Slots 1–8 match frames 0, 15, 30, 45, 60, 75, 90 and 105. With GitHub assets the empty list uses the eight supplied sharp checkpoints. An empty custom slot uses the movement frame. The destination image warms during travel and appears on arrival. Match the camera, crop and aspect ratio.",
    },
    orbitStartFrame: {
        type: ControlType.Number,
        title: "Orbit start frame",
        defaultValue: 45,
        min: 0,
        max: HOMEPAGE_ORBIT_NAMES.length - 1,
        step: 1,
        description:
            "Exact first orbit image, numbered 0–119 to match the filenames. With 8 viewpoints: 0 = camera 1, 15 = camera 2, 30 = camera 3, 45 = camera 4. Custom frames stay still until the next gesture; the checkpoint cameras stay fixed.",
    },
    duration: {
        type: ControlType.Number,
        title: "SEQ_01 duration",
        defaultValue: 2.5,
        min: 0.6,
        max: 10,
        step: 0.1,
        unit: "s",
    },
    connectionDuration: {
        type: ControlType.Number,
        title: "SEQ_02 duration",
        defaultValue: 2.5,
        min: 0.6,
        max: 10,
        step: 0.1,
        unit: "s",
        description:
            "Flight time from the SEQ_01 arrival into the orbit. Uses the same scroll trigger, boost, coast, reversal and 0.8 seconds plus Global fade extra for each endpoint fade as SEQ_01.",
    },
    maxSpeed: {
        type: ControlType.Number,
        title: "Flight boost",
        defaultValue: 1.8,
        min: 1,
        max: 3,
        step: 0.1,
        description: "Scroll acceleration for both SEQ_01 and SEQ_02.",
    },
    momentum: {
        type: ControlType.Number,
        title: "Flight coast",
        defaultValue: 0.22,
        min: 0.08,
        max: 0.6,
        step: 0.02,
        description: "Momentum response for both SEQ_01 and SEQ_02.",
    },
    triggerDistance: {
        type: ControlType.Number,
        title: "Scroll trigger",
        defaultValue: 28,
        min: 8,
        max: 150,
        step: 1,
    },
    checkpointCount: {
        type: ControlType.Number,
        title: "Viewpoints",
        defaultValue: 8,
        min: 2,
        max: 16,
        step: 1,
        description:
            "Keep 8 for the eight authored OrbitView story groups. Other counts disable these stories to preserve camera-to-content alignment.",
    },
    motionWidth: {
        type: ControlType.Number,
        title: "Orbit decode",
        defaultValue: 960,
        min: 480,
        max: 1920,
        step: 160,
        unit: "px",
    },
    orbitMobileWidth: {
        type: ControlType.Number,
        title: "Phone decode",
        defaultValue: 640,
        min: 480,
        max: 1280,
        step: 160,
        unit: "px",
    },
    phoneFraming: {
        type: ControlType.Boolean,
        title: "Phone framing",
        defaultValue: true,
        hidden: (p) => p.orbitLayout !== "classic",
        description:
            "On phones, the orbit uses a landscape image with stories and apartment details below. SEQ_01 and SEQ_02 fill the hero.",
    },
    phoneImageWidth: {
        type: ControlType.Number,
        title: "Phone image width",
        defaultValue: 100,
        min: 80,
        max: 100,
        step: 1,
        unit: "%",
        hidden: (p) => p.phoneFraming === false,
        description:
            "How much of the original landscape image remains visible. 80% gives a closer view; 100% shows its full width.",
    },
    phoneImageTop: {
        type: ControlType.Number,
        title: "Phone image top",
        defaultValue: 80,
        min: 0,
        max: 240,
        step: 4,
        unit: "px",
        hidden: (p) => p.phoneFraming === false,
        description:
            "Space above the parked orbit image, for the mobile header. Clamps on short screens to keep the image and details visible.",
    },
    inspectionWidth: {
        type: ControlType.Number,
        title: "Stopped detail",
        defaultValue: 1920,
        min: 960,
        max: 1920,
        step: 160,
        unit: "px",
    },
    desktopBuffer: {
        type: ControlType.Number,
        title: "Desktop buffer",
        defaultValue: 1,
        min: 1,
        max: 3,
        step: 1,
        description:
            "Checkpoints decoded ahead and behind on desktop. With 120 frames and 8 viewpoints, the default 1 keeps 31 movement frames: complete arcs to the next and previous view. 2 keeps 61 and uses more memory. All 120 compressed images stay downloaded.",
    },
    phoneBuffer: {
        type: ControlType.Number,
        title: "Phone buffer",
        defaultValue: 1,
        min: 1,
        max: 3,
        step: 1,
        description:
            "Checkpoints decoded ahead and behind on phones. With 8 viewpoints, 1 keeps up to 31 movement frames. Increasing this uses more memory.",
    },
    snapDuration: {
        type: ControlType.Number,
        title: "Checkpoint · Move time",
        defaultValue: 1.2,
        min: 0.15,
        max: 10,
        step: 0.05,
        unit: "s",
        description:
            "Duration of one complete viewpoint move from a wheel gesture, phone swipe or side arrow. Lower is faster. Keeps the gentle start and arrival; continued scrolling can still flow through viewpoints. Drag release has its own time below.",
    },
    dragTurnWidths: {
        type: ControlType.Number,
        title: "Drag · Turn width",
        defaultValue: 2,
        min: 1,
        max: 6,
        step: .25,
        unit: "×",
        description:
            "Desktop click-and-drag only. Image widths needed for a full 360° turn before the speed cap: 2 means two image widths when dragged slowly. Higher values turn more slowly. Scrolling and phone checkpoint swipes are unchanged.",
    },
    dragMaxCheckpointsPerSecond: {
        type: ControlType.Number,
        title: "Drag · Speed cap",
        defaultValue: 1.5,
        min: .25,
        max: 4,
        step: .25,
        unit: "views/s",
        description:
            "Maximum viewpoints per second during desktop dragging. Fast pointer movement is discarded instead of queued. Releasing settles at the nearest displayed viewpoint. Scrolling and phone checkpoint swipes keep their existing speed.",
    },
    dragReleaseDuration: {
        type: ControlType.Number,
        title: "Drag · Release time",
        defaultValue: .35,
        min: .1,
        max: 1.5,
        step: .05,
        unit: "s",
        description:
            "Desktop only. Maximum time to settle at the nearest displayed viewpoint after releasing a drag. Shorter remaining distances finish sooner, down to 0.1 seconds. Does not change full checkpoint moves or dragging speed.",
    },
    frameBlend: {
        type: ControlType.Number,
        title: "Frame blend",
        defaultValue: 0,
        min: 0,
        max: 100,
        step: 5,
        unit: "%",
        description:
            "Crossfade neighbouring orbit frames. 0% keeps frames crisp; 100% blends throughout each frame interval. Strong blending can produce double edges.",
    },
    checkpointFadeSeconds: {
        type: ControlType.Number,
        title: "Checkpoint fade",
        defaultValue: 0,
        min: 0,
        max: 0.3,
        step: 0.01,
        unit: "s",
        description: "How long the sharp image blends in when the orbit parks. At 0 s it appears on the first available paint. Try 0.05 s for a short blend.",
    },
    orbitStories: {
        type: ControlType.Boolean,
        title: "Orbit stories",
        defaultValue: true,
        description:
            "Animate native Framer groups using the OrbitView1–OrbitView8 overrides. Requires Viewpoints = 8.",
    },
    storyIn: {
        type: ControlType.Number,
        title: "Orbit · Story in",
        description: "Base fade-in time of the eight OrbitView story groups after a checkpoint settles. Global fade extra is added. Does not affect SEQ01 opening content.",
        defaultValue: .6,
        min: 0,
        max: 2.5,
        step: 0.05,
        unit: "s",
        hidden: (p) => p.orbitStories === false,
    },
    storyOut: {
        type: ControlType.Number,
        title: "Orbit · Story out",
        description: "Base fade-out time of the eight OrbitView story groups when leaving a checkpoint. Global fade extra is added. Does not affect SEQ01 opening content.",
        defaultValue: .3,
        min: 0,
        max: 2,
        step: 0.05,
        unit: "s",
        hidden: (p) => p.orbitStories === false,
    },
    storyDelay: {
        type: ControlType.Number,
        title: "Orbit · Story delay",
        defaultValue: 0.12,
        min: 0,
        max: 1.5,
        step: 0.02,
        unit: "s",
        hidden: (p) => p.orbitStories === false,
        description:
            "Wait after the camera parks before revealing its story. Loading updates do not restart this delay.",
    },
    storyView1: {
        type: ControlType.Object,
        title: "View 1 motion",
        hidden: (p) => p.orbitStories === false,
        controls: {
            enterFrom: {
                type: ControlType.Enum,
                title: "Enter from",
                options: ["left", "right", "top", "bottom", "none"],
                optionTitles: ["Left", "Right", "Top", "Bottom", "Fade only"],
                defaultValue: "bottom",
            },
            exitTo: {
                type: ControlType.Enum,
                title: "Exit to",
                options: ["left", "right", "top", "bottom", "none"],
                optionTitles: ["Left", "Right", "Top", "Bottom", "Fade only"],
                defaultValue: "bottom",
            },
            distance: {
                type: ControlType.Number,
                title: "Distance",
                defaultValue: 24,
                min: 0,
                max: 100,
                step: 2,
                unit: "px",
            },
        },
    },
    storyView2: {
        type: ControlType.Object,
        title: "View 2 motion",
        hidden: (p) => p.orbitStories === false,
        controls: {
            enterFrom: {
                type: ControlType.Enum,
                title: "Enter from",
                options: ["left", "right", "top", "bottom", "none"],
                optionTitles: ["Left", "Right", "Top", "Bottom", "Fade only"],
                defaultValue: "bottom",
            },
            exitTo: {
                type: ControlType.Enum,
                title: "Exit to",
                options: ["left", "right", "top", "bottom", "none"],
                optionTitles: ["Left", "Right", "Top", "Bottom", "Fade only"],
                defaultValue: "bottom",
            },
            distance: {
                type: ControlType.Number,
                title: "Distance",
                defaultValue: 24,
                min: 0,
                max: 100,
                step: 2,
                unit: "px",
            },
        },
    },
    storyView3: {
        type: ControlType.Object,
        title: "View 3 motion",
        hidden: (p) => p.orbitStories === false,
        controls: {
            enterFrom: {
                type: ControlType.Enum,
                title: "Enter from",
                options: ["left", "right", "top", "bottom", "none"],
                optionTitles: ["Left", "Right", "Top", "Bottom", "Fade only"],
                defaultValue: "bottom",
            },
            exitTo: {
                type: ControlType.Enum,
                title: "Exit to",
                options: ["left", "right", "top", "bottom", "none"],
                optionTitles: ["Left", "Right", "Top", "Bottom", "Fade only"],
                defaultValue: "bottom",
            },
            distance: {
                type: ControlType.Number,
                title: "Distance",
                defaultValue: 24,
                min: 0,
                max: 100,
                step: 2,
                unit: "px",
            },
        },
    },
    storyView4: {
        type: ControlType.Object,
        title: "View 4 motion",
        hidden: (p) => p.orbitStories === false,
        controls: {
            enterFrom: {
                type: ControlType.Enum,
                title: "Enter from",
                options: ["left", "right", "top", "bottom", "none"],
                optionTitles: ["Left", "Right", "Top", "Bottom", "Fade only"],
                defaultValue: "bottom",
            },
            exitTo: {
                type: ControlType.Enum,
                title: "Exit to",
                options: ["left", "right", "top", "bottom", "none"],
                optionTitles: ["Left", "Right", "Top", "Bottom", "Fade only"],
                defaultValue: "bottom",
            },
            distance: {
                type: ControlType.Number,
                title: "Distance",
                defaultValue: 24,
                min: 0,
                max: 100,
                step: 2,
                unit: "px",
            },
        },
    },
    storyView5: {
        type: ControlType.Object,
        title: "View 5 motion",
        hidden: (p) => p.orbitStories === false,
        controls: {
            enterFrom: {
                type: ControlType.Enum,
                title: "Enter from",
                options: ["left", "right", "top", "bottom", "none"],
                optionTitles: ["Left", "Right", "Top", "Bottom", "Fade only"],
                defaultValue: "bottom",
            },
            exitTo: {
                type: ControlType.Enum,
                title: "Exit to",
                options: ["left", "right", "top", "bottom", "none"],
                optionTitles: ["Left", "Right", "Top", "Bottom", "Fade only"],
                defaultValue: "bottom",
            },
            distance: {
                type: ControlType.Number,
                title: "Distance",
                defaultValue: 24,
                min: 0,
                max: 100,
                step: 2,
                unit: "px",
            },
        },
    },
    storyView6: {
        type: ControlType.Object,
        title: "View 6 motion",
        hidden: (p) => p.orbitStories === false,
        controls: {
            enterFrom: {
                type: ControlType.Enum,
                title: "Enter from",
                options: ["left", "right", "top", "bottom", "none"],
                optionTitles: ["Left", "Right", "Top", "Bottom", "Fade only"],
                defaultValue: "bottom",
            },
            exitTo: {
                type: ControlType.Enum,
                title: "Exit to",
                options: ["left", "right", "top", "bottom", "none"],
                optionTitles: ["Left", "Right", "Top", "Bottom", "Fade only"],
                defaultValue: "bottom",
            },
            distance: {
                type: ControlType.Number,
                title: "Distance",
                defaultValue: 24,
                min: 0,
                max: 100,
                step: 2,
                unit: "px",
            },
        },
    },
    storyView7: {
        type: ControlType.Object,
        title: "View 7 motion",
        hidden: (p) => p.orbitStories === false,
        controls: {
            enterFrom: {
                type: ControlType.Enum,
                title: "Enter from",
                options: ["left", "right", "top", "bottom", "none"],
                optionTitles: ["Left", "Right", "Top", "Bottom", "Fade only"],
                defaultValue: "bottom",
            },
            exitTo: {
                type: ControlType.Enum,
                title: "Exit to",
                options: ["left", "right", "top", "bottom", "none"],
                optionTitles: ["Left", "Right", "Top", "Bottom", "Fade only"],
                defaultValue: "bottom",
            },
            distance: {
                type: ControlType.Number,
                title: "Distance",
                defaultValue: 24,
                min: 0,
                max: 100,
                step: 2,
                unit: "px",
            },
        },
    },
    storyView8: {
        type: ControlType.Object,
        title: "View 8 motion",
        hidden: (p) => p.orbitStories === false,
        controls: {
            enterFrom: {
                type: ControlType.Enum,
                title: "Enter from",
                options: ["left", "right", "top", "bottom", "none"],
                optionTitles: ["Left", "Right", "Top", "Bottom", "Fade only"],
                defaultValue: "bottom",
            },
            exitTo: {
                type: ControlType.Enum,
                title: "Exit to",
                options: ["left", "right", "top", "bottom", "none"],
                optionTitles: ["Left", "Right", "Top", "Bottom", "Fade only"],
                defaultValue: "bottom",
            },
            distance: {
                type: ControlType.Number,
                title: "Distance",
                defaultValue: 24,
                min: 0,
                max: 100,
                step: 2,
                unit: "px",
            },
        },
    },
    // Preserve saved Framer values and older pasted instances; the new groups replace these duplicate sliders.
    openingOut: { type: ControlType.Number, title: "Legacy opening end", defaultValue: 20, min: 1, max: 50, unit: "%", hidden: () => true },
    openingZoom: { type: ControlType.Number, title: "Legacy opening zoom", defaultValue: 16, min: 2, max: 40, step: 1, hidden: () => true },
    buildingIn: {
        type: ControlType.Number,
        title: "Arrival · Text start",
        description: "SEQ01 progress where BuildingContent / AranyhidContent starts appearing. This is the later building caption, not the opening caption.",
        defaultValue: 68,
        min: 20,
        max: 95,
        unit: "%",
    },
    buildingFull: {
        type: ControlType.Number,
        title: "Arrival · Text full",
        description: "SEQ01 progress where the later building caption is fully visible. Set this after Arrival · Text start.",
        defaultValue: 88,
        min: 40,
        max: 100,
        unit: "%",
    },
    ctaIn: {
        type: ControlType.Number,
        title: "Arrival · CTA start",
        description: "SEQ01 progress where the native ArrivalCTA begins appearing. Does not affect the opening scroll indicator or orbit apartment button.",
        defaultValue: 86,
        min: 40,
        max: 99,
        unit: "%",
    },
    rise: {
        type: ControlType.Number,
        title: "Arrival · Rise",
        description: "Travel distance for BuildingContent / AranyhidContent, ArrivalCTA and the SEQ03 garden caption. Content enters from below and departs upward. 20 px matches the opening groups above.",
        defaultValue: 20,
        min: 0,
        max: 60,
        unit: "px",
    },
    focalX: {
        type: ControlType.Number,
        title: "Focal X",
        defaultValue: 50,
        min: 0,
        max: 100,
        unit: "%",
    },
    focalY: {
        type: ControlType.Number,
        title: "Focal Y",
        defaultValue: 50,
        min: 0,
        max: 100,
        unit: "%",
    },
    darken: {
        type: ControlType.Number,
        title: "Darken",
        defaultValue: 0,
        min: 0,
        max: 0.8,
        step: 0.05,
    },
    showControls: {
        type: ControlType.Boolean,
        title: "Tour controls",
        defaultValue: true,
        description: "Shows the approach controls and the two side arrows on the Studio orbit.",
    },
    showViewpoints: {
        type: ControlType.Boolean,
        title: "View buttons",
        defaultValue: true,
        hidden: (p) => p.orbitLayout === "studio",
        description: "Numbered viewpoints for the other orbit layouts.",
    },
    showDiagnostics: {
        type: ControlType.Boolean,
        title: "Diagnostics",
        defaultValue: false,
    },
    orbitLayout: {
        type: ControlType.Enum,
        title: "Orbit layout",
        options: ["mobile", "studio", "classic"],
        optionTitles: ["Fullscreen desktop", "Apartment studio", "Classic"],
        defaultValue: "studio",
        description:
            "Apartment studio places the orbit beside the floor plan and apartment data. SEQ_01 and SEQ_02 fill the hero. Phones use the mobile layout. Keep the component at 100vh.",
    },
    pageBackdrop: {
        type: ControlType.Boolean, title: "Shared page BG", defaultValue: false,
        description: "Use the single Orbit Page Background layer behind the whole page. The Hero becomes transparent so the gradient and SVG continue below it without restarting.",
    },
    orbitBackground: {
        type: ControlType.Color,
        title: "Orbit background",
        defaultValue: "#fff",
        hidden: (p) => p.orbitLayout === "classic",
    },
    apartmentDataUrl: {
        type: ControlType.String,
        title: "Apartment JSON",
        defaultValue:
            "https://raw.githubusercontent.com/UnbuiltMarket/admiral-park/main/data/apartments.json",
        hidden: (p) => p.detailsMode === "off",
        description:
            "Apartment facts and media paths. All 69 records are small; only the selected plan is loaded.",
    },
    apartmentAssetBase: {
        type: ControlType.String,
        title: "Media base",
        defaultValue: HOMEPAGE_ASSETS + "/apartment-list/",
        hidden: (p) => p.detailsMode === "off",
    },
    previewApartmentId: {
        type: ControlType.String,
        title: "Preview apartment",
        defaultValue: "A001",
        hidden: (p) => p.detailsMode === "hover" || p.detailsMode === "off",
        description:
            "Initial apartment before hover or tap selection. Clicking its floorplan opens the shared detail card.",
    },
    detailPageUrl: {
        type: ControlType.String,
        title: "Details page",
        defaultValue: "/lista",
        hidden: (p) => p.detailsMode === "off",
        description:
            "Your Framer apartment page path. Links add ?apartment=ID to open this apartment.",
    },
    detailDataUrl: {
        type: ControlType.String,
        title: "Detail card JSON",
        defaultValue:
            "https://raw.githubusercontent.com/UnbuiltMarket/admiral-park/main/data/apartment-details.json",
        description:
            "Full apartment data for the shared list-view card, fetched only when an apartment is opened.",
    },
    inquiryUrl: {
        type: ControlType.String,
        title: "Inquiry page",
        defaultValue: "",
        hidden: (p) => p.detailsMode === "off",
        description:
            "Optional enquiry page URL. If empty, the action opens the apartment details page.",
    },
    detailsMode: {
        type: ControlType.Enum,
        title: "Apartment details",
        options: ["preview", "hover", "off"],
        optionTitles: ["Preview", "Hover", "Off"],
        defaultValue: "preview",
        description:
            "Preview and Hover start with a visible apartment and keep the last selection after hover or tap. A001 is preferred when visible. Off hides the apartment workspace and picking.",
    },
    detailsLanguage: {
        type: ControlType.Enum,
        title: "Details language",
        options: ["hu", "en"],
        optionTitles: ["Magyar", "English"],
        defaultValue: "hu",
        hidden: (p) => p.detailsMode === "off",
    },
    detailsBottom: {
        type: ControlType.Number,
        title: "Details bottom",
        defaultValue: 32,
        min: 0,
        max: 160,
        step: 1,
        unit: "px",
        hidden: (p) => p.detailsMode === "off" || p.orbitLayout === "studio",
    },
    detailsInset: {
        type: ControlType.Number,
        title: "Details margin",
        defaultValue: 48,
        min: 0,
        max: 120,
        step: 1,
        unit: "px",
        hidden: (p) => p.detailsMode === "off" || p.orbitLayout === "studio",
    },
    apartmentPreview: {
        type: ControlType.Object,
        title: "Sample apartment",
        hidden: () => true,
        controls: {
            number: {
                type: ControlType.String,
                title: "Apartment",
                defaultValue: "A.204",
            },
            area: {
                type: ControlType.Number,
                title: "Area",
                defaultValue: 66.4,
                min: 0,
                max: 500,
                step: 0.1,
                unit: "m²",
            },
            terrace: {
                type: ControlType.Number,
                title: "Terrace",
                defaultValue: 12.8,
                min: 0,
                max: 500,
                step: 0.1,
                unit: "m²",
            },
            garden: {
                type: ControlType.Number,
                title: "Garden",
                defaultValue: 0,
                min: 0,
                max: 3000,
                step: 0.1,
                unit: "m²",
            },
            rooms: {
                type: ControlType.Number,
                title: "Rooms",
                defaultValue: 3,
                min: 0,
                max: 20,
                step: 0.5,
            },
            availability: {
                type: ControlType.Enum,
                title: "Availability",
                options: ["available", "reserved", "sold"],
                optionTitles: ["Available", "Reserved", "Sold"],
                defaultValue: "available",
            },
            floorplan: { type: ControlType.Image, title: "Floorplan" },
        },
    },
    background: {
        type: ControlType.Color,
        title: "Background",
        defaultValue: "#101820",
    },
    alt: {
        type: ControlType.String,
        title: "Image alt",
        defaultValue: "Explore Admiral Park, Balatonfüred",
    },
})

type ApartmentDetailsLanguage = "hu" | "en"

interface ApartmentDetailsData {
    id?: string
    number: string
    area: number | null
    terrace: number | null
    garden: number | null
    rooms: number | null
    availability: string
    floorplanUrl?: string
}

interface ApartmentDetailsPreview {
    number?: string
    area?: number
    terrace?: number
    garden?: number
    rooms?: number
    availability?: string
    floorplan?: string
}

function normalizeApartmentDetails(
    value: unknown
): ApartmentDetailsData | null {
    if (!value || typeof value !== "object" || Array.isArray(value)) return null
    const input = value as Record<string, unknown>
    const identifier = (candidate: unknown): string => {
        if (typeof candidate === "string") return candidate.trim().slice(0, 128)
        return typeof candidate === "number" && Number.isFinite(candidate)
            ? String(candidate)
            : ""
    }
    const number = identifier(input.number) || identifier(input.id)
    if (!number) return null
    const numeric = (candidate: unknown): number | null => {
        const parsed =
            typeof candidate === "number"
                ? candidate
                : typeof candidate === "string" &&
                    /^\s*\d+(?:[.,]\d+)?\s*$/.test(candidate)
                  ? Number(candidate.trim().replace(",", "."))
                  : NaN
        return Number.isFinite(parsed) && parsed >= 0 ? parsed : null
    }
    const floorplan =
        typeof input.floorplanUrl === "string" ? input.floorplanUrl.trim() : ""
    const safeFloorplan =
        floorplan &&
        !/^(?:javascript|vbscript):/i.test(floorplan) &&
        (!/^data:/i.test(floorplan) ||
            /^data:image\/(?:png|jpeg|webp|avif|gif|svg\+xml)[;,]/i.test(
                floorplan
            ))
            ? floorplan
            : undefined
    return {
        ...(identifier(input.id) ? { id: identifier(input.id) } : {}),
        number,
        area: numeric(input.area),
        terrace: numeric(input.terrace),
        garden: numeric(input.garden),
        rooms: numeric(input.rooms),
        availability:
            typeof input.availability === "string"
                ? input.availability.trim().slice(0, 128)
                : "",
        ...(safeFloorplan ? { floorplanUrl: safeFloorplan } : {}),
    }
}

function createApartmentPreview(
    preview: ApartmentDetailsPreview = {}
): ApartmentDetailsData {
    return (
        normalizeApartmentDetails({
            number:
                typeof preview.number === "string" && preview.number.trim()
                    ? preview.number
                    : "A.204",
            area: preview.area ?? 66.4,
            terrace: preview.terrace ?? 12.8,
            garden: preview.garden ?? 0,
            rooms: preview.rooms ?? 3,
            availability: preview.availability ?? "available",
            floorplanUrl: preview.floorplan,
        }) ?? {
            number: "A.204",
            area: 66.4,
            terrace: 12.8,
            garden: 0,
            rooms: 3,
            availability: "available",
        }
    )
}

const apartmentDetailsStyles = `${orbitDataDividerStyles}
[data-apartment-details] {
    container: admiral-apartment / inline-size;
    box-sizing: border-box;
    color: #fff;
    font-family: inherit;
    -webkit-font-smoothing: antialiased;
    pointer-events: none !important;
    isolation: isolate;
    opacity: 0;
    visibility: hidden;
    transform: translateY(8px);
    transition: opacity 240ms ease, transform 240ms ease, visibility 0s linear 240ms;
}
[data-apartment-details][data-details-shell-visible="true"] {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
    transition-delay: 0s;
}
[data-apartment-details]::before {
    content: "";
    position: absolute;
    z-index: -1;
    left: -200px;
    right: -200px;
    top: -120px;
    bottom: calc(0px - var(--admiral-details-bottom, 32px));
    background: linear-gradient(to bottom, rgba(8,15,20,0) 0%, rgba(8,15,20,.16) 28%, rgba(8,15,20,.44) 72%, rgba(8,15,20,.64) 100%);
    pointer-events: none !important;
}
[data-apartment-details] .admiral-details-summary *, [data-apartment-details] .admiral-details-plan *, [data-apartment-details] .admiral-details-summary *::before, [data-apartment-details] .admiral-details-summary *::after {
    box-sizing: border-box;
    pointer-events: none !important;
}
[data-apartment-details] .admiral-details-filter-row { display: flex; justify-content: flex-end; min-width: 0; padding: 5px 0 0; pointer-events: auto !important; }
[data-apartment-details] [data-orbit-desktop-filters] { width: min(520px,100%); min-width: 0; }
[data-apartment-details] [data-apartment-open] { display: flex; flex-direction: column; align-items: center; gap: 7px; max-width: 100%; min-width: 48px; min-height: 48px; padding: 0; border: 0; color: inherit; font: inherit; background: none; cursor: pointer; pointer-events: auto !important; }
[data-apartment-details] [data-apartment-open]:focus-visible { outline: 2px solid currentColor; outline-offset: 5px; }
[data-apartment-details] [data-apartment-open]:hover .admiral-details-plan-image { opacity: .82; }
[data-apartment-details] .admiral-details-grid {
    display: grid;
    grid-template-columns: repeat(3,minmax(0,1fr)) 220px repeat(3,minmax(0,1fr));
    column-gap: clamp(8px,1.1cqw,20px);
    align-items: center;
    padding-top: 8px;
    opacity: 1;
    transition: opacity 240ms ease;
}
[data-apartment-details] .admiral-details-grid[aria-hidden="true"] { opacity: 0; }
[data-apartment-details] .admiral-details-field { min-width: 0; }
[data-apartment-details] .admiral-details-label {
    display: flex;
    align-items: baseline;
    gap: 7px;
    min-height: 11px;
    margin: 0 0 6px;
    color: rgba(255,255,255,.8);
    font-size: 9px;
    line-height: 1.2;
    font-weight: 400;
    letter-spacing: .08em;
    text-transform: uppercase;
    white-space: nowrap;
}
[data-apartment-details] .admiral-details-sample {
    color: #fff;
    font-size: 8px;
    letter-spacing: .13em;
}
[data-apartment-details] .admiral-details-value {
    display: flex;
    align-items: baseline;
    gap: 5px;
    margin: 0;
    color: #fff;
    font-size: 24px;
    line-height: 1.08;
    font-weight: 400;
    letter-spacing: -.035em;
    font-variant-numeric: tabular-nums;
}
[data-apartment-details] .admiral-details-number .admiral-details-value {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 29px;
}
[data-apartment-details] .admiral-details-unit {
    flex-shrink: 0;
    font-size: 12px;
    font-weight: 400;
    line-height: 1;
    letter-spacing: -.01em;
}
[data-apartment-details] .admiral-details-numeric { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
[data-apartment-details] .admiral-details-status .admiral-details-value {
    padding-top: 5px;
    font-size: 13px;
    line-height: 1.45;
    letter-spacing: .015em;
    overflow-wrap: anywhere;
}
[data-apartment-details] .admiral-details-plan { justify-self: center; text-align: center; }
[data-apartment-details] .admiral-details-rooms .admiral-details-value { font-size: 18px; }
[data-apartment-details] .admiral-details-plan .admiral-details-label { display: none; }
[data-apartment-details] .admiral-details-plan-caption { color: rgba(255,255,255,.85); font-size: 9px; line-height: 1.3; letter-spacing: .06em; }
[data-apartment-details] .admiral-details-plan-image {
    display: block;
    width: 220px;
    height: 190px;
    max-width: 100%;
    object-fit: contain;
    object-position: center;
    transition: opacity 160ms ease;
}
[data-apartment-details] .admiral-details-plan-empty {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 220px;
    height: 190px;
    max-width: 100%;
    color: rgba(255,255,255,.6);
    font-size: 10px;
    line-height: 1.4;
    text-align: center;
}
@container admiral-apartment (max-width: 820px) {
    [data-apartment-details] .admiral-details-grid {
        grid-template-columns: repeat(4,minmax(0,1fr));
        column-gap: 12px;
        row-gap: 15px;
        padding-top: 14px;
    }
    [data-apartment-details] .admiral-details-number { grid-area: 1 / 1 / 2 / 2; }
    [data-apartment-details] .admiral-details-status { grid-area: 1 / 4 / 2 / 5; justify-self: end; text-align: right; }
    [data-apartment-details] .admiral-details-status .admiral-details-label { justify-content: flex-end; }
    [data-apartment-details] .admiral-details-plan { grid-area: 1 / 2 / 2 / 4; justify-self: center; }
    [data-apartment-details] .admiral-details-area { grid-area: 2 / 1 / 3 / 2; }
    [data-apartment-details] .admiral-details-terrace { grid-area: 2 / 2 / 3 / 3; }
    [data-apartment-details] .admiral-details-garden { grid-area: 2 / 3 / 3 / 4; }
    [data-apartment-details] .admiral-details-rooms { grid-area: 2 / 4 / 3 / 5; }
    [data-apartment-details] .admiral-details-label { margin-bottom: 8px; font-size: 9px; letter-spacing: .1em; }
    [data-apartment-details] .admiral-details-number .admiral-details-label { flex-wrap: wrap; row-gap: 3px; }
    [data-apartment-details] .admiral-details-number .admiral-details-value { font-size: 26px; }
    [data-apartment-details] .admiral-details-value { gap: 3px; font-size: 22px; }
    [data-apartment-details] .admiral-details-unit { font-size: 10px; }
    [data-apartment-details] .admiral-details-status .admiral-details-value { padding-top: 2px; font-size: 13px; }
    [data-apartment-details] .admiral-details-plan .admiral-details-label { margin-bottom: 6px; text-align: center; justify-content: center; }
    [data-apartment-details] .admiral-details-plan-image, [data-apartment-details] .admiral-details-plan-empty { width: 148px; height: 128px; }
}
@container admiral-apartment (max-width: 360px) {
    [data-apartment-details] .admiral-details-grid { column-gap: 8px; }
    [data-apartment-details] .admiral-details-label { font-size: 8px; letter-spacing: .07em; }
    [data-apartment-details] .admiral-details-value { font-size: 20px; }
    [data-apartment-details] .admiral-details-number .admiral-details-value { font-size: 24px; }
    [data-apartment-details] .admiral-details-plan-image, [data-apartment-details] .admiral-details-plan-empty { width: 120px; height: 112px; }
}
[data-apartment-details] .admiral-details-grid [data-orbitdata-transition] { opacity:1; transition:opacity 180ms ease; }
[data-apartment-details] .admiral-details-grid [data-orbitdata-transition][data-orbitdata-visible="false"] { opacity:0; pointer-events:none; }
/* Shared row guides align the two side columns around the central floorplan. */
[data-apartment-details] .admiral-details-grid { grid-template-columns: minmax(0,1fr) 240px minmax(0,1fr); max-width: 1200px; margin-inline: auto; gap: 28px; padding-top: 12px; align-items: center; --orbitdata-row-one: 52px; --orbitdata-row-gap: 20px; --orbitdata-side-height: 162px; }
[data-apartment-details] .admiral-details-summary { grid-column: 1; grid-row: 1; min-width: 0; width: 100%; height: var(--orbitdata-side-height); max-width: 360px; justify-self: end; display: grid; grid-template-rows: var(--orbitdata-row-one) minmax(0,1fr); gap: var(--orbitdata-row-gap); transition: opacity 240ms ease; }
[data-apartment-details] :is(.admiral-details-summary,.admiral-details-plan)[data-info-visible="false"] { opacity: 0; }
[data-apartment-details] .admiral-details-summary .admiral-details-field { grid-area: auto; justify-self: stretch; min-width: 0; text-align: left; }
[data-apartment-details] .admiral-details-identity { display: flex; align-items: baseline; align-self: start; flex-wrap: wrap; gap: 8px 14px; }
[data-apartment-details] .admiral-details-facts { align-self: start; min-width: 0; }
[data-apartment-details] .admiral-details-identity .admiral-details-label { display: none; }
[data-apartment-details] .admiral-details-number .admiral-details-value { font-size: 29px; font-weight: 700; }
[data-apartment-details] .admiral-details-status .admiral-details-value { padding: 0; font-size: 12px; font-weight: 500; letter-spacing: 0; }
[data-apartment-details] .admiral-details-metrics { display: grid; grid-template-columns: repeat(3,minmax(0,1fr)); gap: 14px; }
[data-apartment-details] .admiral-details-metrics .admiral-details-label { font-size: 9px; letter-spacing: .04em; color: rgba(255,255,255,.72); }
[data-apartment-details] .admiral-details-metrics .admiral-details-value { font-size: 22px; font-weight: 700; }
[data-apartment-details] .admiral-details-secondary .admiral-details-field { display: flex; align-items: baseline; gap: 7px; margin-top: 12px; opacity: .75; }
[data-apartment-details] .admiral-details-secondary :is(.admiral-details-label,.admiral-details-value) { margin: 0; font-size: 11px; letter-spacing: 0; line-height: 1.3; text-transform: none; }
[data-apartment-details] .admiral-details-plan { grid-column: 2; grid-row: 1; transition: opacity 240ms ease; }
[data-apartment-details] :is(.admiral-details-plan-image,.admiral-details-plan-empty) { width: 240px; height: 210px; }
[data-apartment-details] .admiral-details-filter-row { grid-column: 3; grid-row: 1; width: 100%; min-width: 0; padding: 0; justify-content: flex-start; }
[data-apartment-details] [data-orbit-desktop-filters] { width: 100%; min-width: 0; }
[data-apartment-details] [data-orbit-desktop-filters] > [data-orbit-filters] { display: grid; grid-template-rows: var(--orbitdata-row-one) minmax(0,1fr); align-items: start; row-gap: var(--orbitdata-row-gap); height: var(--orbitdata-side-height); }
[data-apartment-details] [data-orbit-desktop-filters] [data-orbit-filter-row] { align-self: start; position: relative; top: 3px; }
[data-apartment-details] [data-orbit-desktop-filters] [data-orbit-filter-ranges] { margin-top: 0; position: relative; top: 3px; }

@container admiral-apartment (max-width: 1000px) {
    [data-apartment-details] .admiral-details-grid { grid-template-columns: minmax(0,1fr) 200px; gap: 14px 22px; max-width: 700px; }
    [data-apartment-details] .admiral-details-filter-row { grid-column: 1 / -1; grid-row: 1; justify-self: center; max-width: 520px; }
    [data-apartment-details] .admiral-details-summary { grid-column: 1; grid-row: 2; height: var(--orbitdata-side-height); }
    [data-apartment-details] [data-orbit-desktop-filters] > [data-orbit-filters] { display: block; height: auto; }
    [data-apartment-details] [data-orbit-desktop-filters] [data-orbit-filter-ranges] { margin-top: 5px; }
    [data-apartment-details] .admiral-details-plan { grid-area: 2 / 2 / 3 / 3; }
    [data-apartment-details] :is(.admiral-details-plan-image,.admiral-details-plan-empty) { width: 200px; height: 180px; }
}
@container admiral-apartment (max-width: 540px) {
    [data-apartment-details] .admiral-details-grid { grid-template-columns: minmax(0,1fr) minmax(120px,1fr); gap: 10px 14px; }
    [data-apartment-details] .admiral-details-grid { --orbitdata-row-one: 52px; --orbitdata-row-gap: 12px; --orbitdata-side-height: 160px; }
    [data-apartment-details] .admiral-details-metrics { grid-template-columns: minmax(0,1fr); gap: 6px; }
    [data-apartment-details] .admiral-details-metrics .admiral-details-field { display: flex; justify-content: space-between; align-items: baseline; gap: 5px; }
    [data-apartment-details] .admiral-details-metrics .admiral-details-label { margin: 0; font-size: 8px; }
    [data-apartment-details] .admiral-details-metrics .admiral-details-value { font-size: 17px; }
    [data-apartment-details] :is(.admiral-details-plan-image,.admiral-details-plan-empty) { width: 150px; height: 160px; }
}
@media (prefers-reduced-motion: reduce) {
    [data-apartment-details] :is(.admiral-details-summary,.admiral-details-plan) { transition: none; }
    [data-apartment-details], [data-apartment-details] .admiral-details-grid, [data-apartment-details] .admiral-details-grid [data-orbitdata-transition] { transform: none; transition: none; }
}
`

function ApartmentDetailsStrip({
    apartment,
    language,
    visible,
    preview,
    bottom,
    inset,
    onHeightChange,
    onOpen,
    filters,
    filtersVisible = false,
    moving = false,
    favorites,
}: {
    apartment: ApartmentDetailsData | null
    language: ApartmentDetailsLanguage
    visible: boolean
    preview: boolean
    bottom: number
    inset: number
    onHeightChange?: (height: number) => void
    onOpen?: () => void
    filters?: React.ReactNode
    filtersVisible?: boolean
    moving?: boolean
    favorites: OrbitFavoriteActions
}): React.JSX.Element {
    const transition = useOrbitDataTransition(
        apartment,
        apartment?.id || apartment?.number || null,
        { moving }
    )
    const data: ApartmentDetailsData = transition.displayed ?? {
        number: "—",
        area: null,
        terrace: null,
        garden: null,
        rooms: null,
        availability: "",
    }
    const sample = preview
    const infoVisible = !!transition.displayed && transition.visible && visible
    const interactive = transition.interactive && visible
    const recordFade = {
        "data-orbitdata-transition": "",
        "data-orbitdata-phase": transition.phase,
        "data-orbitdata-displayed-id":
            transition.displayed?.id || transition.displayed?.number || "",
        "data-orbitdata-visible": String(infoVisible),
        "aria-hidden": !interactive,
        ...(!interactive ? { inert: "" as any } : {}),
    }
    const shown = visible && transition.displayed !== null
    const shellShown = shown || (!!filters && filtersVisible)
    const hu = language !== "en"
    const labels = hu
        ? {
              number: "Lakás",
              area: "Alapterület",
              terrace: "Terasz",
              garden: "Kert",
              rooms: "Szobák",
              availability: "Státusz",
              floorplan: "Alaprajz",
          }
        : {
              number: "Apartment",
              area: "Area",
              terrace: "Terrace",
              garden: "Garden",
              rooms: "Rooms",
              availability: "Availability",
              floorplan: "Floor plan",
          }
    const sampleLabel = hu ? "MINTA" : "SAMPLE"
    const statusCode = data.availability.toLowerCase()
    const status =
        statusCode === "available"
            ? hu
                ? "Elérhető"
                : "Available"
            : statusCode === "reserved"
              ? hu
                  ? "Foglalt"
                  : "Reserved"
              : statusCode === "under_negotiation"
                ? hu
                    ? "Egyeztetés alatt"
                    : "In negotiation"
                : statusCode === "sold"
                  ? hu
                      ? "Eladva"
                      : "Sold"
                  : data.availability
    const formatter = new Intl.NumberFormat(hu ? "hu-HU" : "en-GB", {
        maximumFractionDigits: 2,
    })
    const root = React.useRef<HTMLDivElement>(null)
    useOrbitDataDividers(
        root,
        ".admiral-details-plan-image,.admiral-details-plan-empty",
        `${data.number}|${data.floorplanUrl || ""}`
    )
    const heightCallback = React.useRef(onHeightChange),
        measuredHeight = React.useRef(-1)
    heightCallback.current = onHeightChange
    const [failedFloorplan, setFailedFloorplan] = React.useState("")
    React.useEffect(() => {
        const element = root.current
        if (!element) return
        const measure = () => {
            const height = element.offsetHeight
            if (height !== measuredHeight.current) {
                measuredHeight.current = height
                heightCallback.current?.(height)
            }
        }
        measure()
        if (typeof ResizeObserver !== "undefined") {
            const observer = new ResizeObserver(measure)
            observer.observe(element)
            return () => observer.disconnect()
        }
        window.addEventListener("resize", measure)
        return () => window.removeEventListener("resize", measure)
    }, [])
    const metric = (
        field: "area" | "terrace" | "garden" | "rooms",
        unit = true
    ) => {
        const value = data[field],
            present =
                value !== null &&
                Number.isFinite(value) &&
                !((field === "terrace" || field === "garden") && value === 0)
        return (
            <div
                className={`admiral-details-field admiral-details-${field}`}
                data-apartment-field={field}
            >
                <div className="admiral-details-label">{labels[field]}</div>
                <div className="admiral-details-value">
                    <span className="admiral-details-numeric">
                        {present ? formatter.format(value!) : "—"}
                    </span>
                    {present && unit && (
                        <span className="admiral-details-unit">m²</span>
                    )}
                </div>
            </div>
        )
    }
    const safeBottom = Number.isFinite(bottom)
        ? Math.max(0, Math.min(400, bottom))
        : 24
    const safeInset = Number.isFinite(inset)
        ? Math.max(0, Math.min(200, inset))
        : 48
    const floorplan =
        data.floorplanUrl && data.floorplanUrl !== failedFloorplan
            ? data.floorplanUrl
            : ""
    return (
        <div
            ref={root}
            data-apartment-details=""
            data-orbit-glass-tone="overlay"
            data-details-preview={sample ? "true" : "false"}
            data-details-visible={shown ? "true" : "false"}
            data-details-shell-visible={String(shellShown)}
            role="region"
            aria-label={`${hu ? "Lakásadatok" : "Apartment details"}${sample ? (hu ? " — minta" : " — sample") : ""}`}
            aria-hidden={!shellShown}
            {...(!shellShown ? { inert: "" as any } : {})}
            style={
                {
                    position: "absolute",
                    left: `min(${safeInset}px, 4%)`,
                    right: `min(${safeInset}px, 4%)`,
                    bottom: `calc(${safeBottom}px + env(safe-area-inset-bottom, 0px))`,
                    "--admiral-details-bottom": `calc(${safeBottom}px + env(safe-area-inset-bottom, 0px))`,
                    zIndex: 4,
                    pointerEvents: "none",
                } as React.CSSProperties
            }
        >
            <style dangerouslySetInnerHTML={homepageStyleMarkup(apartmentDetailsStyles)} />
            <span
                data-orbitdata-divider="left"
                data-info-visible={String(shown)}
                aria-hidden="true"
            />
            <span
                data-orbitdata-divider="right"
                data-info-visible={String(shown)}
                aria-hidden="true"
            />
            <div className="admiral-details-grid">
                <div
                    className="admiral-details-summary"
                    data-orbit-glass-pod="tour-info"
                    data-info-visible={String(infoVisible)}
                    {...recordFade}
                >
                    <div className="admiral-details-identity">
                        <div
                            className="admiral-details-field admiral-details-number"
                            data-apartment-field="number"
                        >
                            <div className="admiral-details-label">
                                {labels.number}
                                {sample && (
                                    <span className="admiral-details-sample">
                                        {sampleLabel}
                                    </span>
                                )}
                            </div>
                            <div className="admiral-details-value">
                                {data.number}
                            </div>
                        </div>
                        <div
                            className="admiral-details-field admiral-details-status"
                            data-apartment-field="availability"
                            data-status={statusCode}
                            style={{
                                color: orbitAvailabilityColor(statusCode),
                            }}
                        >
                            <div className="admiral-details-label">
                                {labels.availability}
                            </div>
                            <div
                                className="admiral-details-value"
                                style={{ color: "inherit" }}
                            >
                                {status || "—"}
                            </div>
                        </div>
                        {data.id && (
                            <OrbitFavoriteButton apartmentId={data.id} favorites={favorites}
                                interactive={interactive} hu={hu} />
                        )}
                    </div>
                    <div className="admiral-details-facts">
                        <div className="admiral-details-metrics">
                            {metric("area")}
                            {metric("terrace")}
                            {metric("garden")}
                        </div>
                        <div className="admiral-details-secondary">
                            {metric("rooms", false)}
                        </div>
                    </div>
                </div>
                <div
                    className="admiral-details-field admiral-details-plan"
                            data-orbit-glass-pod="plan"
                    data-apartment-field="floorplan"
                    data-info-visible={String(infoVisible)}
                    {...recordFade}
                >
                    <div className="admiral-details-label">
                        {labels.floorplan}
                    </div>
                    {onOpen ? (
                        <button
                            type="button"
                            data-apartment-open=""
                            data-orbit-ignore=""
                            aria-label={
                                hu
                                    ? `${data.number} lakás részletei`
                                    : `Apartment ${data.number} details`
                            }
                            aria-haspopup="dialog"
                            tabIndex={interactive ? 0 : -1}
                            disabled={!interactive}
                            onClick={() => {
                                if (interactive) onOpen?.()
                            }}
                        >
                            {floorplan ? (
                                <img
                                    className="admiral-details-plan-image"
                                    src={floorplan}
                                    alt={
                                        hu
                                            ? `${data.number} lakás alaprajza`
                                            : `Floor plan of apartment ${data.number}`
                                    }
                                    loading="lazy"
                                    decoding="async"
                                    draggable={false}
                                    onError={() =>
                                        setFailedFloorplan(floorplan)
                                    }
                                />
                            ) : (
                                <span className="admiral-details-plan-empty">
                                    {hu ? "Részletek ↗" : "Details ↗"}
                                </span>
                            )}
                            {floorplan && (
                                <span className="admiral-details-plan-caption">
                                    {hu ? "Adatlap ↗" : "Details ↗"}
                                </span>
                            )}
                        </button>
                    ) : floorplan ? (
                        <img
                            className="admiral-details-plan-image"
                            src={floorplan}
                            alt={
                                hu
                                    ? `${data.number} lakás alaprajza`
                                    : `Floor plan of apartment ${data.number}`
                            }
                            loading="lazy"
                            decoding="async"
                            draggable={false}
                            onError={() => setFailedFloorplan(floorplan)}
                        />
                    ) : sample ? (
                        <svg
                            className="admiral-details-plan-image"
                            viewBox="0 0 112 78"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            role="img"
                            aria-label={
                                hu
                                    ? "Mintaalaprajz — nem valódi lakás"
                                    : "Sample floor plan — not an actual apartment"
                            }
                        >
                            <path
                                d="M7 6H105V58H77V69H7V6Z"
                                stroke="currentColor"
                                strokeWidth="1.3"
                            />
                            <path
                                d="M47 6V29M47 39V69M7 43H28M37 43H47M47 29H70M80 29H105M77 29V58M47 53H61M70 53H77"
                                stroke="currentColor"
                                strokeWidth="1.1"
                            />
                            <path
                                d="M47 39A10 10 0 0 0 37 29H47M37 43A9 9 0 0 0 28 34V43M80 29A10 10 0 0 0 70 19V29M70 53A9 9 0 0 0 61 44V53"
                                stroke="currentColor"
                                strokeWidth=".65"
                                opacity=".65"
                            />
                            <path
                                d="M15 6H36M7 14V31M57 6H90M105 36V50M15 69H36M86 58H98"
                                stroke="currentColor"
                                strokeWidth="2.8"
                            />
                            <text
                                x="101"
                                y="73"
                                textAnchor="end"
                                fill="currentColor"
                                fontSize="6"
                                letterSpacing="1.2"
                                fontFamily="inherit"
                                opacity=".75"
                            >
                                {sampleLabel}
                            </text>
                        </svg>
                    ) : (
                        <span className="admiral-details-plan-empty">
                            {hu ? "Nem elérhető" : "Unavailable"}
                        </span>
                    )}
                </div>
                {filters && (
                    <div className="admiral-details-filter-row" data-orbit-glass-pod="tour-filters">{filters}</div>
                )}
            </div>
        </div>
    )
}

type SequenceState =
    | "opening"
    | "loading"
    | "moving"
    | "arrival"
    | "paused"
    | "error"
    | "reduced"
interface SequenceSnapshot {
    state: SequenceState
    progress: number
    frame: number
    direction: number
    held: boolean
    decoded: number
    downloaded: number
    time?: number
    playing?: boolean
}
interface SequenceOptions {
    fadeExtension?: () => number
    root: HTMLElement
    canvas: HTMLCanvasElement
    poster: HTMLImageElement
    urls: string[]
    /** Physical viewer element when the canvas scene itself is transformed. */
    inputRoot?: HTMLElement
    duration?: number
    maxSpeed?: number
    momentum?: number
    triggerDistance?: number
    preload?: boolean
    holdScroll?: boolean
    cacheFrames?: number
    decodeWidth?: number
    startAtEnd?: boolean
    /** Restore a frozen journey when Framer replaces its active breakpoint component. */
    restoration?: {
        time: number
        direction?: number
        playing?: boolean
        frame?: number
        progress?: number
    }
    suspended?: boolean
    /** Keep the previous sequence's painted endpoint until this sequence paints successfully. */
    preservePresentation?: boolean
    focalX?: number
    focalY?: number
    timeoutMs?: number
    /** Logical CSS dimensions before a surrounding scene transform. */
    renderBounds?: (
        progress: number
    ) => { width: number; height: number } | null
    /** Optional fixed pixel allocation while the logical scene changes shape. */
    backingSize?: () => { width: number; height: number } | null
    /** Optional image rectangle in CSS pixels; the canvas backing size stays tied to the full bounds. */
    viewport?: (
        progress: number,
        bounds: { width: number; height: number }
    ) => { x: number; y: number; width: number; height: number } | null
    onUpdate?: (snapshot: SequenceSnapshot) => void
    inputFilter?: (event: Event) => boolean
}
interface SequenceBitmap {
    image: CanvasImageSource
    width: number
    height: number
    close: () => void
}
// One active hold per document, including multiple Framer breakpoint instances.
let sequenceScrollOwner: HTMLElement | null = null
function sequenceClamp(n: number, min = 0, max = 1) {
    return Math.min(max, Math.max(min, n))
}
function sequenceEase(n: number) {
    return n * n * (3 - 2 * n)
}

/** Encoded bytes are inexpensive; decoded pixels have an explicitly bounded lifetime. */
function createSequenceFrames(
    urls: string[],
    width: number,
    limit: number,
    notify: () => void
) {
    const abort = new AbortController()
    const blobs = new Map<number, Blob>()
    const bitmaps = new Map<number, SequenceBitmap>()
    const fetching = new Set<number>(),
        decoding = new Set<number>(),
        failed = new Set<number>(),
        retrying = new Set<number>()
    let disposed = false,
        all = false,
        center = 0,
        wanted: number[] = [0],
        downloads = 0
    const last = urls.length - 1
    const valid = (n: number) => n >= 0 && n <= last
    function evict() {
        while (bitmaps.size > limit) {
            const candidates = [...bitmaps.keys()].filter(
                (i) => i !== center && i !== 0 && i !== last
            )
            candidates.sort(
                (a, b) => Math.abs(b - center) - Math.abs(a - center)
            )
            const index = candidates[0]
            if (index === undefined) break
            bitmaps.get(index)?.close()
            bitmaps.delete(index)
        }
    }
    async function decode(index: number) {
        decoding.add(index)
        let bitmap: SequenceBitmap | undefined
        try {
            const blob = blobs.get(index)!
            if (typeof createImageBitmap === "function") {
                try {
                    const image = await createImageBitmap(blob, {
                        resizeWidth: width,
                        resizeQuality: "high",
                    })
                    bitmap = {
                        image,
                        width: image.width,
                        height: image.height,
                        close: () => image.close(),
                    }
                } catch {
                    /* Safari/older engines can fall back to HTMLImageElement.decode. */
                }
            }
            if (!bitmap) {
                const image = new Image()
                const objectURL = URL.createObjectURL(blob)
                try {
                    image.src = objectURL
                    await image.decode()
                    bitmap = {
                        image,
                        width: image.naturalWidth,
                        height: image.naturalHeight,
                        close: () => {
                            image.src = ""
                        },
                    }
                } finally {
                    URL.revokeObjectURL(objectURL)
                }
            }
            if (disposed || !wanted.includes(index)) bitmap.close()
            else {
                bitmaps.set(index, bitmap)
                evict()
            }
        } catch {
            if (!disposed) failed.add(index)
        } finally {
            decoding.delete(index)
            if (!disposed) {
                notify()
                pump()
            }
        }
    }
    async function fetchFrame(index: number) {
        fetching.add(index)
        const requestAbort = new AbortController()
        const timeout = setTimeout(() => requestAbort.abort(), 10000)
        const cancel = () => requestAbort.abort()
        abort.signal.addEventListener("abort", cancel, { once: true })
        try {
            const response = await fetch(urls[index], {
                signal: requestAbort.signal,
                mode: "cors",
                credentials: "omit",
                cache: retrying.has(index) ? "reload" : "force-cache",
            })
            if (!response.ok)
                throw new Error("Frame " + index + ": " + response.status)
            const blob = await response.blob()
            if (!disposed) {
                blobs.set(index, blob)
                retrying.delete(index)
                downloads++
            }
        } catch {
            if (!disposed) failed.add(index)
        } finally {
            clearTimeout(timeout)
            abort.signal.removeEventListener("abort", cancel)
            fetching.delete(index)
            if (!disposed) {
                notify()
                pump()
            }
        }
    }
    function pump() {
        if (disposed) return
        const queue = all
            ? [...new Set([...wanted, ...urls.map((_, i) => i)])]
            : wanted
        for (const index of queue) {
            if (fetching.size >= 4) break
            if (!blobs.has(index) && !fetching.has(index) && !failed.has(index))
                void fetchFrame(index)
        }
        for (const index of wanted) {
            if (decoding.size >= 2) break
            if (
                blobs.has(index) &&
                !bitmaps.has(index) &&
                !decoding.has(index) &&
                !failed.has(index)
            )
                void decode(index)
        }
    }
    return {
        request(
            index: number,
            direction: number,
            full = false,
            single = false
        ) {
            center = sequenceClamp(Math.round(index), 0, last)
            all = single ? false : all || full
            const next = [center]
            if (!single) {
                // Keep endpoints and a few frames behind for an immediate change of direction.
                next.push(0, last, center - direction, center - 2 * direction)
                for (let step = 1; next.length < limit; step++)
                    next.push(center + step * direction)
            }
            wanted = [...new Set(next.filter(valid))]
            pump()
        },
        get: (index: number) => bitmaps.get(index),
        failed: (index: number) => failed.has(index),
        counts: () => ({ decoded: bitmaps.size, downloaded: downloads }),
        retry() {
            // A failed decode may have cached a damaged body. An explicit retry downloads a fresh copy.
            for (const index of failed) {
                blobs.delete(index)
                retrying.add(index)
            }
            failed.clear()
            pump()
        },
        destroy() {
            disposed = true
            abort.abort()
            blobs.clear()
            retrying.clear()
            bitmaps.forEach((bitmap) => bitmap.close())
            bitmaps.clear()
        },
    }
}

/** A two-endpoint journey: scroll starts/boosts/reverses; release still completes the flight. */
function createHomepageHeroVideo(options: {
    video: HTMLVideoElement
    poster: HTMLImageElement
    endLayer: HTMLImageElement
    graphic?: HTMLImageElement
    url: string
    endPoster: string
    graphicUrl?: string
    startAtEnd: boolean
    lastFrame: number
    fadeExtension: () => number
    onUpdate: (snapshot: SequenceSnapshot) => void
}) {
    const { video, poster, endLayer, graphic, url, lastFrame } = options
    const controller = new AbortController()
    const signal = controller.signal
    const motion = matchMedia("(prefers-reduced-motion: reduce)")
    const animations = new Map<HTMLElement, Animation>()
    let state: SequenceState = "opening"
    let loaded = video.getAttribute("src") === url, started = false, entered = false, entering = false
    let finishing = false, finished = false, leaving = false
    let frameRequest = 0, timeout = 0, holdTimer = 0, attempt = 0
    let endReady: Promise<boolean> | undefined, graphicReady: Promise<boolean> | undefined
    const length = () => Number.isFinite(video.duration) && video.duration > 0 ? video.duration : 4.041667
    const time = () => finished ? length() : video.currentTime || 0
    const progress = () => sequenceClamp(time() / length())
    function publish() {
        if (signal.aborted) return
        options.onUpdate({
            state,
            progress: progress(),
            frame: Math.round(progress() * lastFrame),
            direction: 1,
            held: state === "loading" || state === "moving",
            decoded: video.readyState >= 2 ? 1 : 0,
            downloaded: video.readyState >= 3 ? 1 : 0,
            time: time(),
            playing: state === "moving" || state === "loading",
        })
    }
    // Read the in-flight opacity before interrupting a fade, e.g. a scroll during the overlay reveal.
    async function fade(layer: HTMLElement, target: number, ms: number) {
        const from = Number(getComputedStyle(layer).opacity)
        animations.get(layer)?.cancel()
        animations.delete(layer)
        layer.style.opacity = String(target)
        if (!ms || motion.matches || from === target || signal.aborted) return
        const animation = layer.animate([{ opacity: from }, { opacity: target }], {
            duration: ms, easing: "ease-in-out",
        })
        animations.set(layer, animation)
        try { await animation.finished } catch { /* Replaced or unmounted. */ }
        if (animations.get(layer) === animation) animations.delete(layer)
    }
    function prepareEndPoster() {
        if (!endReady) {
            endLayer.src = options.endPoster
            endReady = endLayer.decode().then(() => true, () => false)
        }
    }
    function prepareGraphic() {
        if (!graphicReady && graphic && options.graphicUrl) {
            graphic.src = options.graphicUrl
            graphicReady = graphic.decode().then(() => true, () => false)
        }
    }
    async function revealGraphic() {
        if (graphic && await graphicReady && !signal.aborted && !leaving) {
            graphic.removeAttribute("aria-hidden")
            await fade(graphic, 1, 2000)
        }
    }
    function stopCallbacks() {
        clearTimeout(timeout)
        cancelAnimationFrame(frameRequest)
        timeout = frameRequest = 0
    }
    function tick() {
        frameRequest = 0
        if (signal.aborted || finishing || state !== "moving") return
        publish()
        frameRequest = requestAnimationFrame(tick)
    }
    function loadVideo() {
        loaded = true
        video.preload = "auto"
        video.src = url
    }
    function prepare() {
        if (!loaded && !started && !finishing && !finished && !motion.matches && !signal.aborted)
            loadVideo()
    }
    function failed() {
        if (signal.aborted || !started || finished || finishing) return
        attempt++
        stopCallbacks()
        video.pause()
        entering = false
        state = "error"
        publish()
    }
    function waitForPlayback() {
        clearTimeout(timeout)
        timeout = window.setTimeout(failed, 9000)
    }
    function play() {
        const version = ++attempt
        waitForPlayback()
        void video.play().catch(() => { if (version === attempt) failed() })
    }
    async function finish(next: "arrival" | "reduced", instant = false) {
        if (finished || finishing || signal.aborted) return
        finishing = true
        attempt++
        stopCallbacks()
        video.pause()
        prepareEndPoster()
        if (await endReady && !signal.aborted) {
            await fade(endLayer, 1, instant ? 0 : 300)
        }
        if (signal.aborted) return
        finished = true
        finishing = false
        state = motion.matches ? "reduced" : next
        publish()
        if (signal.aborted || leaving || !graphic) return
        // Use the endpoint hold to fetch the overlay, after video playback has ended.
        prepareGraphic()
        if (instant || motion.matches) void revealGraphic()
        else holdTimer = window.setTimeout(revealGraphic, 2000)
    }
    function start() {
        if (signal.aborted || finished || finishing || document.hidden ||
            state === "moving" || state === "loading") return
        if (motion.matches) {
            void finish("reduced", true)
            return
        }
        if (!loaded || video.error) loadVideo()
        started = true
        state = "loading"
        publish()
        // Prime playback in the input gesture for mobile browsers.
        play()
    }
    video.addEventListener("playing", async () => {
        if (!started || finished || finishing || signal.aborted || entering) return
        stopCallbacks()
        prepareEndPoster()
        if (!entered) {
            entering = true
            const version = attempt
            video.pause()
            await fade(video, 1, 300)
            if (signal.aborted || version !== attempt || finishing || finished) return
            entered = true
            entering = false
            play()
            return
        }
        state = "moving"
        publish()
        frameRequest = requestAnimationFrame(tick)
    }, { signal })
    video.addEventListener("waiting", () => {
        if (!started || finished || finishing || entering || video.paused) return
        stopCallbacks()
        state = "loading"
        publish()
        waitForPlayback()
    }, { signal })
    video.addEventListener("ended", () => { void finish("arrival") }, { signal })
    video.addEventListener("error", failed, { signal })
    document.addEventListener("visibilitychange", () => {
        if (!document.hidden || !started || finished || finishing ||
            (state !== "moving" && state !== "loading")) return
        attempt++
        entering = false
        stopCallbacks()
        video.pause()
        state = "paused"
        publish()
    }, { signal })
    motion.addEventListener("change", () => {
        if (motion.matches) {
            for (const animation of animations.values()) animation.finish()
            if (!finished) void finish("reduced", true)
            else if (!leaving) {
                clearTimeout(holdTimer)
                void revealGraphic()
            }
        } else if (poster.complete) prepare()
    }, { signal })
    if (options.startAtEnd || motion.matches)
        void finish(motion.matches ? "reduced" : "arrival", true)
    else {
        poster.addEventListener("load", prepare, { signal })
        if (poster.complete) prepare()
    }

    return {
        start,
        reverse() {},
        skip: () => { void finish("arrival", true) },
        async leave(onComplete: () => void) {
            if (!finished || leaving || signal.aborted) return
            leaving = true
            clearTimeout(holdTimer)
            if (graphic) {
                graphic.setAttribute("aria-hidden", "true")
                await fade(graphic, 0, 500)
            }
            if (!signal.aborted) onComplete()
        },
        departureProgress(duration: number, delay = 0) {
            return sequenceClamp((time() - Math.max(0, delay)) / Math.max(0.1, duration))
        },
        smoothProgress(delay = 0) {
            return sequenceClamp((time() - Math.max(0, delay)) / length())
        },
        fadeProgress(from: number, to: number, delay = 0) {
            const current = Math.max(0, time() - Math.max(0, delay))
            if (!Number.isFinite(from) || !Number.isFinite(to) || to <= from)
                return sequenceClamp(current / length())
            const end = (to / 100) * length()
            const begin = Math.max(0, (from / 100) * length() - homepageFadeSeconds(options.fadeExtension()))
            return (from + (to - from) * sequenceClamp((current - begin) / (end - begin))) / 100
        },
        // The native element shares the poster's CSS viewport and needs no canvas resize.
        redraw() {},
        destroy() {
            controller.abort()
            stopCallbacks()
            clearTimeout(holdTimer)
            for (const animation of animations.values()) animation.cancel()
            animations.clear()
            video.pause()
            video.style.opacity = "0"
            endLayer.style.opacity = "0"
            endLayer.removeAttribute("src")
            if (graphic) {
                graphic.style.opacity = "0"
                graphic.setAttribute("aria-hidden", "true")
                graphic.removeAttribute("src")
            }
            if (loaded) {
                video.removeAttribute("src")
                video.preload = "none"
                video.load()
            }
        },
    }
}

function createHeroSequence(options: SequenceOptions) {
    const { root, canvas, poster, urls } = options
    const inputRoot = options.inputRoot ?? root
    const last = urls.length - 1
    const duration = sequenceClamp(options.duration ?? 2.5, 0.6, 10)
    // Only the opening and final image transitions dissolve, for 0.8s plus the fade extension each.
    let fadeExtra = homepageFadeSeconds(options.fadeExtension?.())
    let openingFade = last >= 3 ? .8 + fadeExtra : 0
    let arrivalFade = last >= 3 ? .8 + fadeExtra : 0
    let flightEnd = openingFade + duration,
        totalDuration = flightEnd + arrivalFade
    const maxSpeed = sequenceClamp(options.maxSpeed ?? 1.8, 1, 3)
    const momentum = sequenceClamp(options.momentum ?? 0.22, 0.08, 0.6)
    const threshold = sequenceClamp(options.triggerDistance ?? 28, 8, 150)
    const motion = matchMedia("(prefers-reduced-motion: reduce)")
    const connection = (
        navigator as Navigator & {
            connection?: { saveData?: boolean; effectiveType?: string }
        }
    ).connection
    const abort = new AbortController(),
        signal = abort.signal
    const context = canvas.getContext("2d", { alpha: false })
    const preservePresentation =
        options.preservePresentation === true &&
        canvas.style.opacity === "1" &&
        canvas.width > 1 &&
        canvas.height > 1
    const restoration =
        options.restoration && Number.isFinite(options.restoration.time)
            ? options.restoration
            : null
    const initialClock = restoration
        ? sequenceClamp(restoration.time, 0, totalDuration)
        : options.startAtEnd
          ? totalDuration
          : 0
    const initialVisual = frameAt(initialClock)
    const initialFrame =
        initialVisual.mix === 1 ? initialVisual.next : initialVisual.index
    const initialDirection =
        restoration?.direction && Number.isFinite(restoration.direction)
            ? Math.sign(restoration.direction)
            : 1
    const restoredPlaying =
        !!restoration?.playing &&
        !(initialDirection > 0
            ? initialClock >= totalDuration
            : initialClock <= 0)
    let disposed = false,
        state: SequenceState = restoredPlaying
            ? "moving"
            : initialClock <= 0
              ? "opening"
              : initialClock >= totalDuration
                ? "arrival"
                : "paused",
        displayed = initialFrame,
        clock = initialClock
    let displayedProgress =
        (initialVisual.index +
            (initialVisual.next - initialVisual.index) * initialVisual.mix) /
        Math.max(1, last)
    let rendered = initialVisual
    let renderedGeometry = ""
    // An opaque canvas may belong to the preceding sequence, so this controller must still paint once.
    let hasPainted = false
    let direction = initialDirection,
        velocity = 0,
        boost = 0,
        held = false,
        playing = restoredPlaying
    let active = false,
        raf = 0,
        previousTime = 0,
        waitingSince = 0,
        suspended = options.suspended === true,
        pageInactive = document.hidden
    let holdY = 0,
        holdX = 0,
        holdTimer: ReturnType<typeof setTimeout> | undefined
    let intent = 0,
        intentAt = 0,
        lastIntentAt = -Infinity,
        drainUntil = 0,
        drainDirection = 0
    let scrollGuard = false,
        warmed = false,
        bypass =
            !!restoration &&
            !restoredPlaying &&
            initialClock > 0 &&
            initialClock < totalDuration
    let touch: { x: number; y: number } | null = null
    let warmTimer: ReturnType<typeof setTimeout> | undefined
    const width = sequenceClamp(options.decodeWidth ?? 1920, 640, 1920)
    const frames = createSequenceFrames(
        urls,
        width,
        sequenceClamp(options.cacheFrames ?? 14, 8, 24),
        wake
    )
    function snapshot(): SequenceSnapshot {
        syncFadeTiming()
        return {
            state,
            progress: displayedProgress,
            frame: displayed,
            direction,
            held,
            time: clock,
            playing,
            ...frames.counts(),
        }
    }
    function publish() {
        if (disposed) return
        root.dataset.sequenceState = state
        root.dataset.sequenceTime = String(clock)
        root.dataset.sequencePlaying = String(playing)
        root.dataset.frame = String(displayed)
        root.dataset.progress = String(displayedProgress)
        root.dataset.crossfade =
            rendered.index !== rendered.next
                ? rendered.index === 0
                    ? "opening"
                    : "arrival"
                : ""
        root.dataset.crossfadeMix = String(rendered.mix)
        root.dataset.scrollHeld = String(held)
        root.dataset.sequenceSuspended = String(suspended)
        root.dataset.decoded = String(frames.counts().decoded)
        options.onUpdate?.(snapshot())
    }
    function visible(rect = inputRoot.getBoundingClientRect()) {
        return (
            rect.width > 0 &&
            rect.height > 0 &&
            rect.bottom > 0 &&
            rect.top < innerHeight &&
            rect.right > 0 &&
            rect.left < innerWidth
        )
    }
    function atHero() {
        const rect = inputRoot.getBoundingClientRect()
        // Framer can retain a small negative top offset on this pinned page.
        return (
            visible(rect) &&
            rect.top <= innerHeight * 0.15 &&
            rect.bottom >= innerHeight * 0.6
        )
    }
    function release(reason: string) {
        if (holdTimer) clearTimeout(holdTimer)
        holdTimer = undefined
        held = false
        if (sequenceScrollOwner === root) sequenceScrollOwner = null
        root.dataset.scrollRelease = reason
    }
    function hold() {
        if (
            suspended ||
            pageInactive ||
            held ||
            options.holdScroll === false ||
            motion.matches ||
            !atHero()
        )
            return
        if (sequenceScrollOwner && sequenceScrollOwner !== root) return
        sequenceScrollOwner = root
        held = true
        holdX = scrollX
        holdY = scrollY
        holdTimer = setTimeout(
            () => fail("timeout"),
            options.timeoutMs ?? Math.max(12000, (totalDuration + 2) * 1000)
        )
    }
    function draw(index: number, force = false, nextIndex = index, mix = 0) {
        const bitmap = frames.get(index),
            next = frames.get(nextIndex)
        if (!context || !bitmap || !next) return false
        const progress = (index + (nextIndex - index) * mix) / Math.max(1, last)
        const requestedBounds = options.renderBounds?.(progress)
        const box =
            requestedBounds &&
            [requestedBounds.width, requestedBounds.height].every(
                Number.isFinite
            ) &&
            requestedBounds.width > 0 &&
            requestedBounds.height > 0
                ? requestedBounds
                : root.getBoundingClientRect()
        if (box.width <= 0 || box.height <= 0) return false
        const requestedViewport = options.viewport?.(progress, {
            width: box.width,
            height: box.height,
        })
        const viewport =
            requestedViewport &&
            [
                requestedViewport.x,
                requestedViewport.y,
                requestedViewport.width,
                requestedViewport.height,
            ].every(Number.isFinite) &&
            requestedViewport.width > 0 &&
            requestedViewport.height > 0
                ? requestedViewport
                : null
        const boxRatio = viewport
            ? viewport.width / viewport.height
            : box.width / box.height
        let sw = bitmap.width,
            sh = bitmap.height
        if (sw / sh > boxRatio) sw = sh * boxRatio
        else sh = sw / boxRatio
        // Mobile framing must not change the backing allocation as its image rectangle shrinks.
        const ratio = viewport
            ? Math.min(devicePixelRatio || 1, 2)
            : Math.min(
                  devicePixelRatio || 1,
                  2,
                  sw / box.width,
                  sh / box.height
              )
        const requestedBacking = options.backingSize?.()
        const backing =
            requestedBacking &&
            [requestedBacking.width, requestedBacking.height].every(
                Number.isFinite
            ) &&
            requestedBacking.width > 0 &&
            requestedBacking.height > 0
                ? requestedBacking
                : null
        const cw = Math.max(1, Math.round(backing?.width ?? box.width * ratio)),
            ch = Math.max(1, Math.round(backing?.height ?? box.height * ratio))
        const destination = viewport
            ? {
                  x: (viewport.x * cw) / box.width,
                  y: (viewport.y * ch) / box.height,
                  width: (viewport.width * cw) / box.width,
                  height: (viewport.height * ch) / box.height,
              }
            : { x: 0, y: 0, width: cw, height: ch }
        const geometry = [
            viewport ? 1 : 0,
            box.width,
            box.height,
            cw,
            ch,
            destination.x,
            destination.y,
            destination.width,
            destination.height,
        ].join("|")
        if (
            hasPainted &&
            index === rendered.index &&
            nextIndex === rendered.next &&
            mix === rendered.mix &&
            geometry === renderedGeometry &&
            !force &&
            canvas.style.opacity === "1"
        )
            return true
        if (canvas.width !== cw) canvas.width = cw
        if (canvas.height !== ch) canvas.height = ch
        // Fill before drawing: a small alpha channel in exported files cannot accumulate trails.
        context.globalAlpha = 1
        context.fillStyle = "#101820"
        context.fillRect(0, 0, cw, ch)
        if (viewport) {
            context.save()
            context.beginPath()
            context.rect(
                destination.x,
                destination.y,
                destination.width,
                destination.height
            )
            context.clip()
        }
        function paint(frame: SequenceBitmap) {
            let w = frame.width,
                h = frame.height
            if (w / h > boxRatio) w = h * boxRatio
            else h = w / boxRatio
            context!.drawImage(
                frame.image,
                (frame.width - w) * sequenceClamp((options.focalX ?? 50) / 100),
                (frame.height - h) *
                    sequenceClamp((options.focalY ?? 50) / 100),
                w,
                h,
                destination.x,
                destination.y,
                destination.width,
                destination.height
            )
        }
        // Keep the lower image opaque to prevent a dark dip during the dissolve.
        paint(bitmap)
        if (nextIndex !== index) {
            context.globalAlpha = mix
            paint(next)
            context.globalAlpha = 1
        }
        if (viewport) context.restore()
        rendered = { index, next: nextIndex, mix }
        renderedGeometry = geometry
        hasPainted = true
        displayed = mix === 1 ? nextIndex : index
        displayedProgress = progress
        canvas.style.opacity = "1"
        poster.style.opacity = "0"
        publish()
        return true
    }
    function redraw() {
        return draw(rendered.index, true, rendered.next, rendered.mix)
    }
    function frameAt(time: number, snapToFrame = true) {
        if (time <= 0) return { index: 0, next: 0, mix: 0 }
        if (time >= totalDuration) return { index: last, next: last, mix: 0 }
        if (openingFade && time < openingFade)
            return { index: 0, next: 1, mix: sequenceEase(time / openingFade) }
        if (arrivalFade && time > flightEnd)
            return {
                index: last - 1,
                next: last,
                mix: sequenceEase((time - flightEnd) / arrivalFade),
            }
        const firstMoving = openingFade ? 1 : 0
        const position = sequenceEase(sequenceClamp((time - openingFade) / duration)) * (last - (arrivalFade ? 1 : 0) - firstMoving)
        const index = firstMoving + (snapToFrame ? Math.round(position) : position)
        return { index, next: index, mix: 0 }
    }

    const fadeTimes = new Map<number, number>()
    function progressAtTime(time: number) {
        const visual = frameAt(time, false)
        return (visual.index + (visual.next - visual.index) * visual.mix) / Math.max(1, last)
    }
    function timeAtProgress(percent: number) {
        const wanted = sequenceClamp(percent / 100)
        if (wanted === 0) return 0
        if (wanted === 1) return totalDuration
        const cached = fadeTimes.get(wanted)
        if (cached !== undefined) return cached
        let low = 0, high = totalDuration
        for (let index = 0; index < 28; index++) {
            const middle = (low + high) / 2
            if (progressAtTime(middle) < wanted) low = middle
            else high = middle
        }
        const value = (low + high) / 2
        fadeTimes.set(wanted, value)
        return value
    }

    function syncFadeTiming() {
        const next = homepageFadeSeconds(options.fadeExtension?.())
        if (next === fadeExtra) return
        // Retain the rendered camera position when the sidebar changes.
        const position = progressAtTime(clock)
        const previousTimeout = Math.max(12000, (totalDuration + 2) * 1000)
        fadeExtra = next
        openingFade = last >= 3 ? .8 + fadeExtra : 0
        arrivalFade = last >= 3 ? .8 + fadeExtra : 0
        flightEnd = openingFade + duration
        totalDuration = flightEnd + arrivalFade
        fadeTimes.clear()
        clock = timeAtProgress(position * 100)
        const nextTimeout = Math.max(12000, (totalDuration + 2) * 1000)
        if (held && nextTimeout > previousTimeout && options.timeoutMs === undefined) {
            if (holdTimer) clearTimeout(holdTimer)
            holdTimer = setTimeout(() => fail("timeout"), nextTimeout)
        }
    }
    function departureProgress(durationSeconds: number, delaySeconds = 0) {
        syncFadeTiming()
        const delay = Number.isFinite(delaySeconds) ? Math.max(0, delaySeconds) : 0
        const duration = Number.isFinite(durationSeconds) ? Math.max(.1, durationSeconds) : 1
        return sequenceClamp((clock - delay) / duration)
    }
    function fadeProgress(from: number, to: number, delaySeconds = 0) {
        syncFadeTiming()
        const readClock = Math.max(0, clock - (Number.isFinite(delaySeconds) ? Math.max(0, delaySeconds) : 0))
        if (!Number.isFinite(from) || !Number.isFinite(to) || to <= from) return progressAtTime(readClock)
        const start = timeAtProgress(from), end = timeAtProgress(to)
        // Begin the fade earlier by the selected extension while retaining its authored end
        // and easing curve. Camera time, image choices and zoom are unaffected.
        const addedAt = (time: number) =>
            (openingFade ? fadeExtra * sequenceClamp(time / openingFade) : 0) +
            (arrivalFade ? fadeExtra * sequenceClamp((time - flightEnd) / arrivalFade) : 0)
        // A window ending in the last dissolve already includes some of the
        // selected image-fade extension; count that once rather than extending twice.
        const alreadyAdded = addedAt(end) - addedAt(start)
        const extendedStart = Math.max(0, start - (fadeExtra - alreadyAdded))
        if (readClock <= extendedStart) return from / 100
        if (readClock >= end) return to / 100
        const mix = sequenceClamp((readClock - extendedStart) / Math.max(.0001, end - extendedStart))
        return progressAtTime(start + mix * (end - start))
    }

    function warm(explicit = false) {
        if (disposed || motion.matches) return
        if (
            !explicit &&
            (options.preload === false ||
                connection?.saveData ||
                /(^|-)2g$/.test(connection?.effectiveType || ""))
        )
            return
        warmed = true
        frames.request(displayed, direction, true)
    }
    function wake() {
        if (
            disposed ||
            (suspended && !(active && !hasPainted)) ||
            pageInactive ||
            raf ||
            document.hidden
        )
            return
        if (
            playing ||
            (motion.matches && displayed !== last) ||
            (active && (!hasPainted || canvas.style.opacity !== "1"))
        )
            raf = requestAnimationFrame(tick)
    }
    function finish() {
        playing = false
        velocity = 0
        boost = 0
        waitingSince = 0
        state = direction > 0 ? "arrival" : "opening"
        drainDirection = direction
        drainUntil = performance.now() + 350
        intent = 0
        release("endpoint")
        publish()
    }
    function fail(reason: string) {
        playing = false
        velocity = 0
        state = "error"
        bypass = true
        release(reason)
        publish()
    }
    function tick(now: number) {
        raf = 0
        if (disposed || pageInactive || document.hidden) return
        syncFadeTiming()
        // A replacement breakpoint needs its saved image, even while the rotation
        // overlay is holding input. This paint never advances the restored clock.
        if (suspended) {
            if (active && !hasPainted) {
                if (
                    frames.failed(rendered.index) ||
                    frames.failed(rendered.next)
                )
                    fail("frame-error")
                else redraw()
            }
            return
        }
        if (restoration && active && !hasPainted) {
            if (frames.failed(rendered.index) || frames.failed(rendered.next)) {
                fail("frame-error")
                return
            }
            redraw()
            previousTime = 0
            if (playing) wake()
            return
        }
        if (motion.matches) {
            if (frames.failed(last)) {
                state = "reduced"
                publish()
                return
            }
            if (draw(last)) {
                state = "reduced"
                publish()
            }
            return
        }
        if (!playing) {
            if (active && (!hasPainted || canvas.style.opacity !== "1"))
                redraw()
            return
        }
        const elapsed = previousTime ? (now - previousTime) / 1000 : 1 / 60
        const dt = Math.min(0.05, elapsed)
        previousTime = now
        boost *= Math.exp(-dt / momentum)
        const wantedVelocity = direction * (1 + boost)
        velocity += (wantedVelocity - velocity) * (1 - Math.exp(-dt / 0.1))
        let proposed: number
        if (
            openingFade &&
            (clock < openingFade || (clock === openingFade && direction < 0))
        ) {
            velocity = direction
            proposed = sequenceClamp(
                clock + direction * elapsed,
                0,
                openingFade
            )
        } else if (
            arrivalFade &&
            (clock > flightEnd || (clock === flightEnd && direction > 0))
        ) {
            velocity = direction
            proposed = sequenceClamp(
                clock + direction * elapsed,
                flightEnd,
                totalDuration
            )
        } else
            proposed = sequenceClamp(
                clock + velocity * dt,
                openingFade,
                flightEnd
            )
        const frame = frameAt(proposed)
        frames.request(frame.index, direction, true)
        if (frames.failed(frame.index) || frames.failed(frame.next)) {
            fail("frame-error")
            return
        }
        const previousClock = clock
        clock = proposed
        if (draw(frame.index, false, frame.next, frame.mix)) {
            waitingSince = 0
            if (state !== "moving") {
                state = "moving"
                publish()
            }
            if (
                (direction > 0 &&
                    clock >= totalDuration &&
                    displayed === last) ||
                (direction < 0 && clock <= 0 && displayed === 0)
            ) {
                finish()
                return
            }
        } else {
            clock = previousClock
            if (!hasPainted || canvas.style.opacity !== "1") draw(displayed)
            if (!waitingSince) waitingSince = now
            if (now - waitingSince > 7000) {
                fail("frame-timeout")
                return
            }
            if (state !== "loading") {
                state = "loading"
                publish()
            }
        }
        wake()
    }
    function start(nextDirection: number, manual = false) {
        if (
            disposed ||
            suspended ||
            pageInactive ||
            document.hidden ||
            motion.matches ||
            !context ||
            last < 1
        )
            return
        if (
            !manual &&
            (!atHero() || (sequenceScrollOwner && sequenceScrollOwner !== root))
        )
            return
        bypass = false
        direction = nextDirection > 0 ? 1 : -1
        if (
            (direction > 0 && clock >= totalDuration && displayed === last) ||
            (direction < 0 && clock <= 0 && displayed === 0)
        )
            return
        active = true
        playing = true
        previousTime = 0
        waitingSince = 0
        state = frames.get(displayed) ? "moving" : "loading"
        frames.retry()
        warm(true)
        hold()
        publish()
        wake()
    }
    function pause(reason = "pause") {
        playing = false
        velocity = 0
        boost = 0
        bypass = true
        if (raf) cancelAnimationFrame(raf)
        raf = 0
        if (state === "moving" || state === "loading") state = "paused"
        release(reason)
        drainUntil = 0
        publish()
    }
    function skip() {
        if (disposed || suspended) return
        direction = 1
        clock = totalDuration
        active = true
        playing = true
        previousTime = 0
        bypass = true
        velocity = 0
        boost = 0
        frames.retry()
        frames.request(last, 1, false, true)
        // Skipping always releases navigation immediately, even on a failed connection.
        release("skip")
        state = "loading"
        publish()
        wake()
    }
    function nestedScroll(target: EventTarget | null, delta: number) {
        let element = target instanceof Element ? target : null
        while (
            element &&
            element !== document.body &&
            element !== document.documentElement
        ) {
            const style = getComputedStyle(element)
            if (
                /(auto|scroll)/.test(style.overflowY) &&
                element.scrollHeight > element.clientHeight + 1 &&
                (delta > 0
                    ? element.scrollTop + element.clientHeight <
                      element.scrollHeight - 1
                    : element.scrollTop > 0)
            )
                return true
            element = element.parentElement
        }
        return false
    }
    function scrollIntent(event: Event, delta: number) {
        if (suspended || pageInactive) return
        if (options.inputFilter && !options.inputFilter(event)) return
        if (
            disposed ||
            bypass ||
            motion.matches ||
            document.hidden ||
            event.defaultPrevented ||
            Math.abs(delta) < 1 ||
            nestedScroll(event.target, delta)
        )
            return
        if (sequenceScrollOwner && sequenceScrollOwner !== root) return
        const now = performance.now(),
            sign = Math.sign(delta)
        if (
            !playing &&
            sign === drainDirection &&
            now < drainUntil &&
            now - lastIntentAt < 140 &&
            atHero()
        ) {
            if (event.cancelable) event.preventDefault()
            lastIntentAt = now
            return
        }
        if (
            !playing &&
            (!atHero() ||
                (clock === 0 && sign < 0) ||
                (clock === totalDuration && sign > 0))
        )
            return
        // Some trackpads deliver only the first pulse as cancelable. The page
        // is already pinned, so later pulses still count toward the threshold.
        if (!event.cancelable && options.holdScroll === false) return
        if (
            event.cancelable &&
            (held || (options.holdScroll !== false && atHero()))
        )
            event.preventDefault()
        lastIntentAt = now
        if (now - intentAt > 180 || Math.sign(intent) !== sign) intent = 0
        intentAt = now
        intent += delta
        if (!playing) {
            if (Math.abs(intent) >= threshold) {
                start(sign)
                intent = 0
            }
        } else if (sign !== direction) {
            if (Math.abs(intent) >= threshold) {
                direction = sign
                boost = 0
                intent = 0
                publish()
            }
        } else {
            boost = Math.min(
                maxSpeed - 1,
                boost + Math.min(250, Math.abs(delta)) / 260
            )
            intent = 0
        }
    }
    function wheel(event: WheelEvent) {
        if (event.ctrlKey || event.metaKey) return
        if (suspendedInput(event, event.clientX, event.clientY)) return
        if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) return
        scrollIntent(
            event,
            event.deltaY *
                (event.deltaMode === 1
                    ? 16
                    : event.deltaMode === 2
                      ? innerHeight
                      : 1)
        )
    }
    function key(event: KeyboardEvent) {
        if (event.key === "Escape") {
            if (playing || held) pause("escape")
            return
        }
        if (event.key === "Tab" && held) {
            pause("focus-navigation")
            return
        }
        if (event.ctrlKey || event.metaKey || event.altKey) return
        if (
            event.target instanceof Element &&
            event.target.closest(
                'input,textarea,select,button,a,[contenteditable="true"],[role="slider"]'
            )
        )
            return
        const delta =
            event.key === "ArrowDown"
                ? 45
                : event.key === "ArrowUp"
                  ? -45
                  : ["PageDown", "End"].includes(event.key)
                    ? innerHeight
                    : ["PageUp", "Home"].includes(event.key)
                      ? -innerHeight
                      : event.key === " "
                        ? event.shiftKey
                            ? -innerHeight
                            : innerHeight
                        : 0
        if (delta) {
            if (suspendedInput(event)) return
            scrollIntent(event, delta)
        }
    }
    function suspendedInput(event: Event, x?: number, y?: number) {
        if (!suspended || disposed || !visible()) return false
        if (
            event.target instanceof Element &&
            event.target.closest(
                'nav,header,input,textarea,select,button,a,[contenteditable="true"],[role="slider"],[role="button"],[role="link"],[data-orbit-ignore]'
            )
        )
            return false
        const box = inputRoot.getBoundingClientRect()
        if (
            x !== undefined &&
            y !== undefined &&
            (x < box.left || x > box.right || y < box.top || y > box.bottom)
        )
            return false
        if (event.cancelable) event.preventDefault()
        return true
    }
    function resetSequenceIntent() {
        touch = null
        intent = 0
        intentAt = 0
        lastIntentAt = -Infinity
        drainUntil = 0
        drainDirection = 0
        previousTime = 0
        waitingSince = 0
    }
    function setSuspended(value: boolean) {
        if (disposed || suspended === value) return
        suspended = value
        resetSequenceIntent()
        if (suspended) {
            if (raf) cancelAnimationFrame(raf)
            raf = 0
            release("orientation")
        } else {
            if (playing && !bypass) hold()
            wake()
        }
        publish()
    }
    function setPageInactive(inactive: boolean) {
        if (disposed || pageInactive === inactive) return
        pageInactive = inactive
        resetSequenceIntent()
        boost = 0
        if (inactive) {
            if (raf) cancelAnimationFrame(raf)
            raf = 0
            release("page-inactive")
        } else {
            if (playing && !bypass) hold()
            wake()
        }
        publish()
    }
    function onScroll() {
        if (suspended || pageInactive) return
        if (held) {
            if (!scrollGuard && (scrollY !== holdY || scrollX !== holdX)) {
                scrollGuard = true
                window.scrollTo({
                    top: holdY,
                    left: holdX,
                    behavior: "instant",
                })
                scrollGuard = false
            }
        } else {
            // Scrollbar dragging and anchor navigation remain native. Never pull a visitor back.
            if (playing && !visible()) pause("offscreen")
            if (!warmed && visible() && poster.complete) warm()
            if (!atHero()) bypass = false
        }
    }
    function reducedChanged() {
        pause("motion-preference")
        if (motion.matches) {
            state = "reduced"
            frames.request(last, 1, false, true)
            active = true
            wake()
            publish()
        } else {
            bypass = false
            if (displayed === last) clock = totalDuration
            state = displayed === last ? "arrival" : "opening"
            publish()
        }
    }
    const resize = new ResizeObserver(() => {
        if (active && !disposed) redraw()
    })
    resize.observe(inputRoot)
    const intersection = new IntersectionObserver((entries) => {
        if (entries[0]?.isIntersecting) {
            if (poster.complete) warm()
        } else if (playing && !suspended && !pageInactive) pause("offscreen")
    })
    intersection.observe(inputRoot)
    window.addEventListener("wheel", wheel, { passive: false, signal })
    window.addEventListener("keydown", key, { signal })
    window.addEventListener(
        "touchstart",
        (event) => {
            if (suspended) {
                touch = null
                return
            }
            touch =
                event.touches.length === 1
                    ? {
                          x: event.touches[0].clientX,
                          y: event.touches[0].clientY,
                      }
                    : null
        },
        { passive: true, signal }
    )
    window.addEventListener(
        "touchmove",
        (event) => {
            if (suspended && event.touches.length === 1) {
                const point = event.touches[0]
                suspendedInput(event, point.clientX, point.clientY)
                touch = null
                return
            }
            if (!touch || event.touches.length !== 1) {
                touch = null
                return
            }
            const next = event.touches[0],
                dx = touch.x - next.clientX,
                dy = touch.y - next.clientY
            touch = { x: next.clientX, y: next.clientY }
            if (Math.abs(dy) >= Math.abs(dx)) scrollIntent(event, dy)
        },
        { passive: false, signal }
    )
    window.addEventListener(
        "touchend",
        () => {
            touch = null
        },
        { passive: true, signal }
    )
    window.addEventListener(
        "touchcancel",
        () => {
            touch = null
        },
        { passive: true, signal }
    )
    window.addEventListener("scroll", onScroll, { passive: true, signal })
    document.addEventListener(
        "visibilitychange",
        () => {
            setPageInactive(document.hidden)
        },
        { signal }
    )
    window.addEventListener("pagehide", () => setPageInactive(true), { signal })
    window.addEventListener("pageshow", () => setPageInactive(document.hidden), { signal })
    motion.addEventListener("change", reducedChanged, { signal })
    const loadedPoster = () => {
        if (!visible() || motion.matches) return
        clearTimeout(warmTimer)
        warmTimer = setTimeout(() => warm(), 250)
    }
    poster.addEventListener("load", loadedPoster, { signal })
    if (poster.complete) loadedPoster()
    // A newly assigned poster can still be undecoded. Leave the shared canvas visible across
    // matching sequence endpoints; draw() replaces it atomically when the next image is ready.
    if (!preservePresentation) {
        canvas.style.opacity = "0"
        poster.style.opacity = "1"
    }
    // A restored endpoint is parked, not skipped: reverse input stays enabled and the opening copy never flashes.
    if (restoration) {
        active = true
        frames.request(initialVisual.index, direction, restoredPlaying)
        if (restoredPlaying) {
            warm(true)
            hold()
        }
        wake()
    } else if (options.startAtEnd) {
        active = true
        frames.request(last, 1, false, true)
        wake()
    }
    publish()
    if (motion.matches) reducedChanged()
    return {
        start: () => start(1, true),
        reverse: () => start(-1, true),
        pause,
        skip,
        snapshot,
        // Sampling an earlier clock delays only overlays, never the camera or frame cache.
        smoothProgress: (delaySeconds = 0) => {
            syncFadeTiming()
            return progressAtTime(Math.max(0, clock - (Number.isFinite(delaySeconds) ? Math.max(0, delaySeconds) : 0)))
        },
        fadeProgress,
        departureProgress,
        redraw,
        setSuspended,
        destroy() {
            if (disposed) return
            pause("destroy")
            disposed = true
            abort.abort()
            if (warmTimer) clearTimeout(warmTimer)
            resize.disconnect()
            intersection.disconnect()
            frames.destroy()
        },
    }
}

type OrbitState =
    | "idle"
    | "loading"
    | "buffering"
    | "moving"
    | "settling"
    | "checkpoint"
    | "paused"
    | "error"

interface OrbitSnapshot {
    state: OrbitState
    frame: number
    checkpoint: number
    direction: number
    ready: number
    total: number
    decoded: number
    downloaded: number
    buffered: number
    bufferTotal: number
    requiredReady: number
    requiredTotal: number
    position: number
    target?: number
    userPaused: boolean
    suspended: boolean
    error?: string
}

interface OrbitRestoration {
    position: number
    target?: number
    paused?: boolean
    direction?: number
}

interface OrbitOptions {
    root: HTMLElement
    canvas: HTMLCanvasElement
    urls: string[]
    /** Optional parked images, indexed by the eight checkpoint cameras. */
    inspectionUrls?: readonly string[]
    decodeWidth?: number
    inspectionWidth?: number
    checkpointCount?: number
    /** Decoded radius on both sides; 1 keeps both adjacent arcs ready (31 frames for 120/8). */
    bufferCheckpoints?: number
    /** Image bounds for Desktop Studio wheel flow and direct mouse dragging. */
    continuousWheelBounds?: () => DOMRect | null
    /** The embedded studio shares the document with the sections below it. */
    allowsPageScroll?: () => boolean
    /** Desktop image-width drags needed for a complete orbit. */
    dragTurnWidths?: number
    /** Desktop drag speed cap, independent of wheel and phone checkpoint moves. */
    dragMaxCheckpointsPerSecond?: number
    dragReleaseDuration?: number
    startFrame?: number
    snapDuration?: number
    frameBlend?: number
    checkpointFadeSeconds?: number
    focalX?: number
    focalY?: number
    /** Logical CSS dimensions before a surrounding scene transform. */
    renderBounds?: () => { width: number; height: number } | null
    /** Optional fixed pixel allocation while the logical scene changes shape. */
    backingSize?: () => { width: number; height: number } | null
    /** Map physical pointer coordinates into the transformed scene's logical space. */
    inputPoint?: (clientX: number, clientY: number) => { x: number; y: number }
    inputBounds?: () => {
        left: number
        top: number
        width: number
        height: number
    } | null
    /** Optional image rectangle in CSS pixels, independent of the full canvas backing size. */
    viewport?: (bounds: {
        width: number
        height: number
    }) => { x: number; y: number; width: number; height: number } | null
    onUpdate?: (snapshot: OrbitSnapshot) => void
}

interface OrbitBitmap {
    image: CanvasImageSource
    width: number
    height: number
    close: () => void
}

const orbitClamp = (value: number, minimum: number, maximum: number) =>
    Math.min(maximum, Math.max(minimum, value))
const orbitModulo = (value: number, size: number) =>
    ((value % size) + size) % size

// Touch picking and camera navigation share one tolerance in scene coordinates.
const ORBIT_TOUCH_GESTURE_THRESHOLD = 12
const ORBIT_WHEEL_RELEASE_MS = 340

const ORBIT_WHEEL_GESTURE_GAP_MS = 180
const ORBIT_TRACKPAD_HOLD_MS = 410

interface OrbitWheelGesture {
    heading: number
    horizontal: boolean
    lastAt: number
    lastStrength: number
    peak: number
    valley: number
    steadySince: number
    steadyStrength: number
    sparsePulses: number
    densePulses: number
    discrete: boolean
}

interface OrbitWheelIntent {
    lastDriveAt: number
    continuous: boolean
    followThrough: boolean
    speed: number | null
    driveStartedAt: number
    tickAt: number
}

function sampleOrbitWheel(
    gesture: OrbitWheelGesture | null,
    now: number,
    heading: number,
    horizontal: boolean,
    strength: number,
    discreteUnits: boolean
) {
    const gap = gesture ? now - gesture.lastAt : Infinity
    if (
        !gesture ||
        heading !== gesture.heading ||
        horizontal !== gesture.horizontal ||
        gap > ORBIT_WHEEL_RELEASE_MS ||
        (gap >= ORBIT_WHEEL_GESTURE_GAP_MS && !gesture.discrete)
    ) {
        return {
            gesture: {
                heading, horizontal, lastAt: now, lastStrength: strength,
                peak: strength, valley: Infinity, steadySince: now,
                steadyStrength: strength, sparsePulses: 0, densePulses: 0,
                discrete: discreteUnits,
            },
            renewed: false,
            continuous: false,
        }
    }

    // A coast can flatten or fluctuate slightly. Require a substantial recovery
    // after a trough, so the initial acceleration doesn't count as another swipe.
    if (strength <= gesture.peak * .55)
        gesture.valley = Math.min(gesture.valley, strength)
    const newSwipe = strength >= Math.max(4, gesture.valley * 1.65, gesture.valley + 3, gesture.peak * .28)
    if (newSwipe) {
        gesture.peak = strength
        gesture.valley = Infinity
    } else {
        gesture.peak = Math.max(gesture.peak, strength)
    }

    // Pixel-mode mouse wheels can also report pixels. Look for separate strong
    // pulses, without promoting a closely spaced trackpad envelope to a wheel.
    gesture.densePulses = gap <= 36 ? gesture.densePulses + 1 : Math.max(0, gesture.densePulses - 1)
    if (gesture.densePulses >= 3) gesture.sparsePulses = 0
    else if (gap >= 46 && strength >= Math.max(18, gesture.lastStrength * .92))
        gesture.sparsePulses++
    gesture.discrete ||= discreteUnits || gesture.sparsePulses >= 2

    // Genuine, steady pressure can also keep a trackpad roll alive. Compare
    // with the start of this steady period, not an ever-falling previous delta.
    if (
        gap > 48 ||
        strength < Math.max(2, gesture.steadyStrength * .84) ||
        strength > gesture.steadyStrength * 1.18
    ) {
        gesture.steadySince = now
        gesture.steadyStrength = strength
    }
    gesture.lastAt = now
    gesture.lastStrength = strength
    const continuous = gesture.discrete || now - gesture.steadySince >= ORBIT_TRACKPAD_HOLD_MS
    return { gesture, renewed: newSwipe, continuous }
}

/** Keep compressed files, both adjacent motion arcs by default, and one sharp parked view. */
function createOrbitPlayer(options: OrbitOptions) {
    const { root, canvas } = options
    const urls = [...options.urls],
        total = urls.length
    const startFrame = Math.round(
        orbitClamp(
            Number.isFinite(options.startFrame) ? options.startFrame! : 0,
            0,
            Math.max(0, total - 1)
        )
    )
    const motionWidth = Math.round(
        orbitClamp(options.decodeWidth ?? 960, 240, 1920)
    )
    const inspectionWidth = Math.round(
        orbitClamp(options.inspectionWidth ?? 1920, motionWidth, 3840)
    )
    const checkpointCount = Math.round(
        orbitClamp(options.checkpointCount ?? 8, 1, Math.max(1, total))
    )
    const checkpoints = Array.from({ length: checkpointCount }, (_, index) =>
        Math.round((index * total) / checkpointCount)
    )
    const inspectionSources = checkpoints.map((_, index) => {
        const url = checkpointCount === 8 ? options.inspectionUrls?.[index] : ""
        return typeof url === "string" ? url.trim() : ""
    })
    // At most the eight parked sources are retained as compressed bytes.
    const inspectionBlobs = new Map<number, Blob>()
    const inspectionRefresh = new Set<number>()
    let inspectionRequest: AbortController | null = null
    const bufferCheckpoints = Math.round(
        orbitClamp(
            options.bufferCheckpoints ?? 1,
            1,
            Math.max(1, Math.floor(checkpointCount / 2))
        )
    )
    const dragTurnWidths = orbitClamp(options.dragTurnWidths ?? 2, 1, 6)
    const dragFramesPerSecond = (total / checkpointCount) *
        orbitClamp(options.dragMaxCheckpointsPerSecond ?? 1.5, .25, 4)
    const dragReleaseDuration = orbitClamp(options.dragReleaseDuration ?? .35, .1, 2)
    const snapDuration = orbitClamp(options.snapDuration ?? 1.2, 0.15, 10)
    const frameBlend = orbitClamp(options.frameBlend ?? 0, 0, 1)
    const checkpointFadeMs = 1000 * orbitClamp(options.checkpointFadeSeconds ?? 0, 0, 0.3)
    const focalX = orbitClamp(options.focalX ?? 0.5, 0, 1),
        focalY = orbitClamp(options.focalY ?? 0.5, 0, 1)
    const context = canvas.getContext("2d", { alpha: false })
    const cancellation = new AbortController()
    const blobs = new Map<number, Blob>(),
        frames = new Map<number, OrbitBitmap>()
    const fetching = new Set<number>(),
        decoding = new Set<number>()
    const fetchFailed = new Map<number, string>(),
        decodeFailed = new Map<number, string>(),
        refresh = new Set<number>()
    const retriedDownloads = new Set<number>()
    const reducedQuery =
        typeof matchMedia === "function"
            ? matchMedia("(prefers-reduced-motion: reduce)")
            : null
    const originalTouchAction = canvas.style.touchAction
    let destroyed = false,
        started = false,
        prepared = false,
        preparing = false,
        active = false,
        activation = 0,
        visible = true,
        automaticPause = false
    let state: OrbitState = "idle",
        position = startFrame,
        entryFrame = startFrame,
        direction = 1,
        error: string | undefined
    let raf = 0,
        lastInputAt = -Infinity,
        lastWheelAt = -Infinity,
        wheelLatched = false,
        pausedAt = 0,
        suppressClickUntil = 0
    let preparePromise: Promise<void> | null = null,
        prepareResolve: (() => void) | null = null
    let prepareReject: ((reason: Error) => void) | null = null
    let inspection: OrbitBitmap | null = null,
        inspectionFrame = -1,
        inspectionTarget = -1,
        inspectionSource: Blob | undefined,
        inspectionGeneration = 0,
        qualityStartedAt = 0,
        inspectionLoading = false,
        inspectionDecoding = false
    let nativeDecodes = 0,
        decodeGeneration = 0
    let lastPaint = "",
        lastNotification = ""
    let residentFramesDirty = true,
        requiredFramesDirty = true
    let residentFramesText = "",
        requiredFramesText = ""
    let drag: {
        id: number
        x: number
        y: number
        moved: boolean
        triggered: boolean
        scrub?: {
            pointerX: number
            inputAt: number
            framesPerPixel: number
            target: number
            bufferCenter?: number
        }
    } | null = null
    let touchDragging = false
    let interruptedScrub = false
    let suspended = false,
        suspendedAt = 0
    let wheelIntent: OrbitWheelIntent | null = null
    // Keep sampling across an arrival, so its remaining coast stays latched.
    let wheelGesture: OrbitWheelGesture | null = null
    let wheelCoasting = false
    let settling: {
        start: number
        target: number
        time: number
        duration: number
        startSlope?: number
    } | null = null
    let pendingMove: {
        start: number
        target: number
        indices: number[]
        durationMs?: number
    } | null = null
    let desired = new Set<number>(),
        required = new Set<number>(),
        priority: number[] = []
    let preparationRequired: number[] = [],
        preparationFrame = startFrame,
        errorWasPaused = false
    const waiters: Array<{
        indices: number[]
        token: number
        resolve: () => void
        reject: (reason: Error) => void
    }> = []
    const frameAt = () => (total ? orbitModulo(Math.round(position), total) : 0)
    const canRun = () =>
        active &&
        !suspended &&
        !destroyed &&
        visible &&
        !document.hidden &&
        state !== "error"
    const inputAvailable = () =>
        active &&
        prepared &&
        !suspended &&
        !destroyed &&
        visible &&
        !document.hidden
    const fullyReady = () => prepared
    const reduced = () => !!reducedQuery?.matches
    const activeScrub = () => drag?.moved ? drag.scrub : undefined

    function checkpointAt() {
        if (state !== "checkpoint" || total === 0) return -1
        const withinRing = orbitModulo(position, total)
        return checkpoints.findIndex(
            (value) =>
                Math.abs(value - withinRing) < 0.0001 ||
                Math.abs(value + total - withinRing) < 0.0001
        )
    }

    function snapshot(): OrbitSnapshot {
        return {
            state,
            frame: frameAt(),
            checkpoint: checkpointAt(),
            direction,
            ready: blobs.size,
            total,
            decoded: frames.size + (inspection ? 1 : 0),
            downloaded: blobs.size,
            buffered: frames.size,
            bufferTotal: desired.size,
            requiredReady: [...required].filter((index) => frames.has(index))
                .length,
            requiredTotal: required.size,
            position,
            target: pendingMove?.target ?? settling?.target,
            userPaused: state === "paused" && !automaticPause,
            suspended,
            ...(error ? { error } : {}),
        }
    }

    function setData(name: string, text: string) {
        if (root.dataset[name] !== text) root.dataset[name] = text
    }

    function notify() {
        if (destroyed) return
        const value = snapshot()
        // These attributes are also consumed by picking and Framer overlays. Keep
        // them current without scheduling MutationObserver work for unchanged data.
        setData("orbitState", state)
        setData("orbitFrame", String(value.frame))
        setData("orbitCheckpoint", String(value.checkpoint))
        setData("orbitReady", String(value.ready))
        setData("orbitDecoded", String(value.decoded))
        setData("orbitDownloaded", String(value.downloaded))
        setData("orbitPosition", position.toFixed(4))
        setData("orbitMotionWidth", String(motionWidth))
        setData(
            "orbitTarget",
            (pendingMove?.target ?? settling?.target ?? position).toFixed(4)
        )
        setData("orbitFrameBlend", String(frameBlend))
        const scrubbing = !!activeScrub()
        setData("orbitScrubbing", String(scrubbing))
        setData("orbitLocked", String(!!settling || !!pendingMove || scrubbing))
        setData("orbitSuspended", String(suspended))
        setData("orbitBuffered", String(value.buffered))
        setData("orbitBufferTotal", String(value.bufferTotal))
        setData("orbitRequiredReady", String(value.requiredReady))
        setData("orbitRequiredTotal", String(value.requiredTotal))
        setData("orbitDecoding", String(nativeDecodes))
        setData("orbitCacheLimit", String(desired.size))
        setData("orbitBufferCheckpoints", String(bufferCheckpoints))
        if (residentFramesDirty) {
            residentFramesText = [...frames.keys()]
                .sort((a, b) => a - b)
                .join(",")
            residentFramesDirty = false
        }
        if (requiredFramesDirty) {
            requiredFramesText = [...required].sort((a, b) => a - b).join(",")
            requiredFramesDirty = false
        }
        setData("orbitResidentFrames", residentFramesText)
        setData("orbitRequiredFrames", requiredFramesText)
        const signature = [
            state,
            value.frame,
            value.checkpoint,
            direction,
            value.ready,
            value.decoded,
            value.bufferTotal,
            value.requiredReady,
            value.requiredTotal,
            position.toFixed(4),
            value.target,
            value.userPaused,
            suspended,
            error,
        ].join("|")
        if (signature !== lastNotification) {
            lastNotification = signature
            options.onUpdate?.(value)
        }
    }

    async function decodeBlob(blob: Blob, width: number, limitToSource = false): Promise<OrbitBitmap> {
        let expired = false
        nativeDecodes++
        const operation = (async () => {
            if (typeof createImageBitmap === "function") {
                try {
                    // Parked images first reveal their native size. A future
                    // 960px movement file must never be enlarged to fake 1920px.
                    const original = await createImageBitmap(blob, limitToSource ? undefined : {
                        resizeWidth: width,
                        resizeQuality: "high",
                    })
                    let image = original
                    if (limitToSource && original.width > width) {
                        try {
                            image = await createImageBitmap(original, {
                                resizeWidth: width,
                                resizeQuality: "high",
                            })
                        } finally {
                            original.close()
                        }
                    }
                    return {
                        image,
                        width: image.width,
                        height: image.height,
                        close: () => image.close(),
                    }
                } catch {
                    /* A resized canvas also works in browsers without AVIF ImageBitmap decoding. */
                }
            }
            const image = new Image(),
                objectURL = URL.createObjectURL(blob)
            try {
                image.decoding = "async"
                image.src = objectURL
                await new Promise<void>((resolve, reject) => {
                    const timer = setTimeout(() => {
                        image.src = ""
                        reject(new Error("Image decoding timed out"))
                    }, 12000)
                    const abort = () => {
                        clearTimeout(timer)
                        image.src = ""
                        reject(new Error("Orbit disposed"))
                    }
                    cancellation.signal.addEventListener("abort", abort, {
                        once: true,
                    })
                    const done = () => {
                        clearTimeout(timer)
                        cancellation.signal.removeEventListener("abort", abort)
                    }
                    image.decode().then(
                        () => {
                            done()
                            resolve()
                        },
                        (reason) => {
                            done()
                            reject(reason)
                        }
                    )
                })
                const surface = document.createElement("canvas")
                surface.width = Math.min(width, image.naturalWidth)
                surface.height = Math.max(
                    1,
                    Math.round(
                        (image.naturalHeight * surface.width) /
                            image.naturalWidth
                    )
                )
                const drawing = surface.getContext("2d", { alpha: false })
                if (!drawing) throw new Error("Canvas decoding is unavailable")
                drawing.drawImage(image, 0, 0, surface.width, surface.height)
                return {
                    image: surface,
                    width: surface.width,
                    height: surface.height,
                    close: () => {
                        surface.width = surface.height = 0
                    },
                }
            } finally {
                image.src = ""
                URL.revokeObjectURL(objectURL)
            }
        })()
        return await new Promise<OrbitBitmap>((resolve, reject) => {
            const timer = setTimeout(() => {
                expired = true
                reject(new Error("Image decoding timed out"))
            }, 15000)
            operation
                .then(
                    (bitmap) => {
                        clearTimeout(timer)
                        if (expired || destroyed) {
                            bitmap.close()
                            if (!expired) reject(new Error("Orbit disposed"))
                        } else resolve(bitmap)
                    },
                    (reason) => {
                        clearTimeout(timer)
                        if (!expired) reject(reason)
                    }
                )
                .finally(() => {
                    // ImageBitmap decoding cannot be cancelled. A watchdog may report
                    // an error, but its native permit stays held until the work settles.
                    nativeDecodes--
                    if (!destroyed) resourcesChanged()
                })
        })
    }

    function indicesBetween(start: number, end: number) {
        const result = new Set<number>()
        for (
            let index = Math.floor(Math.min(start, end));
            index <= Math.ceil(Math.max(start, end)) && result.size < total;
            index++
        )
            result.add(orbitModulo(index, total))
        return [...result]
    }

    /** The drag waits only for pixels that paint() will actually draw. */
    function scrubPaintFrames(value: number): number[] {
        if (frameBlend <= 0 || reduced())
            return [orbitModulo(Math.round(value), total)]
        const lower = Math.floor(value)
        const mix = orbitClamp(
            (value - lower - (1 - frameBlend) / 2) / frameBlend,
            0,
            1
        )
        if (mix === 0) return [orbitModulo(lower, total)]
        if (mix === 1) return [orbitModulo(lower + 1, total)]
        return [orbitModulo(lower, total), orbitModulo(lower + 1, total)]
    }

    /** Advance toward a fast pointer with pixels already decoded, never past it. */
    function readyScrubPosition(target: number): number {
        if (framesReady(scrubPaintFrames(target))) return target
        const forward = target > position
        let closest = position
        for (const index of frames.keys()) {
            // Pick the occurrence nearest the target in its unwrapped orbit.
            // The interval check also handles reversal and repeated loop seams.
            const turns = forward
                ? Math.floor((target - index) / total)
                : Math.ceil((target - index) / total)
            const candidate = index + turns * total
            if (forward
                ? candidate > closest && candidate <= target
                : candidate < closest && candidate >= target)
                closest = candidate
        }
        return closest
    }

    function windowIndices(center: number, radius: number) {
        let left = center,
            right = center
        for (let step = 0; step < radius; step++) {
            left = nextCheckpoint(left, -1)
            right = nextCheckpoint(right, 1)
        }
        return indicesBetween(left, right)
    }

    function nearestFirst(indices: number[], center: number) {
        const wrapped = orbitModulo(center, total)
        const distance = (index: number) =>
            Math.min(
                orbitModulo(index - wrapped, total),
                orbitModulo(wrapped - index, total)
            )
        return [...indices].sort(
            (a, b) =>
                distance(a) - distance(b) ||
                orbitModulo(a - wrapped, total) -
                    orbitModulo(b - wrapped, total)
        )
    }

    function setBuffer(
        wanted: number[],
        essential: number[],
        first = essential
    ) {
        desired = new Set(wanted)
        if (
            essential.length !== required.size ||
            essential.some((index) => !required.has(index))
        ) {
            required = new Set(essential)
            requiredFramesDirty = true
        }
        priority = [...new Set([...first, ...wanted])].filter((index) =>
            desired.has(index)
        )
        for (const [index, bitmap] of frames)
            if (!desired.has(index)) {
                bitmap.close()
                frames.delete(index)
                residentFramesDirty = true
            }
        resourcesChanged()
    }

    function setRestBuffer(center: number) {
        const near = nearestFirst(windowIndices(center, 1), center)
        const wanted = nearestFirst(
            windowIndices(center, bufferCheckpoints),
            center
        )
        const visibleFrames = scrubPaintFrames(center)
        setBuffer(wanted, visibleFrames, [...visibleFrames, ...near])
    }

    function fail(index: number) {
        endWheelFlow(performance.now())
        if (state !== "error") errorWasPaused = state === "paused"
        error =
            "Could not prepare orbit frame " + index + ". Retry to continue."
        state = "error"
        if (raf) cancelAnimationFrame(raf)
        raf = 0
    }

    function failedIndex(indices: number[]) {
        return indices.find(
            (index) => fetchFailed.has(index) || decodeFailed.has(index)
        )
    }
    function framesReady(indices: number[]) {
        return indices.every((index) => frames.has(index))
    }

    function finishPreparation() {
        if (destroyed || !preparing) return
        const failure = failedIndex(preparationRequired)
        if (failure !== undefined) {
            preparing = false
            fail(failure)
            const reject = prepareReject
            prepareResolve = prepareReject = null
            reject?.(new Error(error))
        } else if (framesReady(preparationRequired)) {
            preparing = false
            prepared = true
            error = undefined
            const resolve = prepareResolve
            prepareResolve = prepareReject = null
            if (!active) state = "idle"
            resolve?.()
        }
    }

    function finishWaiters() {
        for (let index = waiters.length - 1; index >= 0; index--) {
            const waiter = waiters[index],
                failure = failedIndex(waiter.indices)
            if (waiter.token !== activation) {
                waiters.splice(index, 1)
                waiter.resolve()
            } else if (failure !== undefined) {
                waiters.splice(index, 1)
                waiter.reject(new Error("Could not prepare orbit frame " + failure))
            } else if (framesReady(waiter.indices)) {
                waiters.splice(index, 1)
                waiter.resolve()
            }
        }
    }

    function waitForFrames(
        indices: number[],
        token: number
    ) {
        return new Promise<void>((resolve, reject) => {
            waiters.push({ indices, token, resolve, reject })
            resourcesChanged()
        })
    }

    function resourcesChanged() {
        if (destroyed) return
        finishPreparation()
        finishWaiters()
        if (prepared && pendingMove) {
            const failure = failedIndex(pendingMove.indices)
            if (failure !== undefined) fail(failure)
            else tryStartPending()
        }
        const scrub = activeScrub()
        if (scrub && scrub.target !== position)
            requestPaint()
        notify()
        pump()
    }

    async function fetchFrame(index: number) {
        fetching.add(index)
        let retryable = true
        const request = new AbortController(),
            cancel = () => request.abort()
        const timer = setTimeout(cancel, 10000)
        cancellation.signal.addEventListener("abort", cancel, { once: true })
        try {
            const response = await fetch(urls[index], {
                signal: request.signal,
                mode: "cors",
                credentials: "omit",
                cache: refresh.has(index) ? "reload" : "force-cache",
                priority: required.has(index) ? "auto" : "low",
            } as RequestInit)
            if (!response.ok) {
                retryable = response.status === 408 || response.status >= 500
                throw new Error("HTTP " + response.status)
            }
            const blob = await response.blob()
            if (!blob.size) throw new Error("Empty orbit image")
            if (!destroyed) {
                blobs.set(index, blob)
                refresh.delete(index)
                retriedDownloads.delete(index)
            }
        } catch (reason) {
            if (!destroyed) {
                refresh.add(index)
                if (retryable && !retriedDownloads.has(index)) {
                    retriedDownloads.add(index)
                    await new Promise(resolve => setTimeout(resolve, 350))
                } else fetchFailed.set(index, String(reason))
            }
        } finally {
            clearTimeout(timer)
            cancellation.signal.removeEventListener("abort", cancel)
            fetching.delete(index)
            if (!destroyed) resourcesChanged()
        }
    }

    async function decodeFrame(index: number) {
        const generation = decodeGeneration
        decoding.add(index)
        try {
            const bitmap = await decodeBlob(blobs.get(index)!, motionWidth)
            if (
                destroyed ||
                generation !== decodeGeneration ||
                !desired.has(index)
            )
                bitmap.close()
            else {
                if (!frames.has(index)) residentFramesDirty = true
                frames.get(index)?.close()
                frames.set(index, bitmap)
            }
        } catch (reason) {
            if (!destroyed && generation === decodeGeneration)
                decodeFailed.set(index, String(reason))
        } finally {
            decoding.delete(index)
            if (!destroyed) resourcesChanged()
        }
    }

    function pump() {
        if (destroyed || !started) return
        const all = nearestFirst(
            urls.map((_, index) => index),
            position
        )
        const downloads = [...new Set([...required, ...priority, ...all])]
        const downloadLimit = prepared || preparing ? 4 : 2
        for (const index of downloads) {
            if (fetching.size >= downloadLimit) break
            if (
                !blobs.has(index) &&
                !fetching.has(index) &&
                !fetchFailed.has(index)
            )
                void fetchFrame(index)
        }
        if (inspectionTarget >= 0) void prepareInspection()
        const allowed = prepared ? priority : preparationRequired
        for (const index of allowed) {
            if (
                nativeDecodes >= 2 ||
                decoding.size + (inspectionDecoding ? 1 : 0) >= 2
            )
                break
            if (
                desired.has(index) &&
                blobs.has(index) &&
                !frames.has(index) &&
                !decoding.has(index) &&
                !decodeFailed.has(index)
            )
                void decodeFrame(index)
        }
        notify()
    }

    /** Download the complete compressed orbit without allocating decoded frames. */
    function prefetch(): void {
        if (destroyed || started || !total) return
        started = true
        pump()
    }

    function prepare(frame = startFrame): Promise<void> {
        if (destroyed) return Promise.reject(new Error("Orbit disposed"))
        if (prepared) return Promise.resolve()
        if (preparePromise) return preparePromise
        if (!total || !context) {
            state = "error"
            error = !total
                ? "No orbit frames were provided."
                : "Canvas rendering is unavailable."
            notify()
            return Promise.reject(new Error(error))
        }
        started = preparing = true
        state = "loading"
        error = undefined
        preparePromise = new Promise<void>((resolve, reject) => {
            prepareResolve = resolve
            prepareReject = reject
        })
        preparationFrame = frame
        // Enable the current camera while the rest of the compressed orbit loads.
        // A move subsequently waits for just the frames on its chosen arc.
        preparationRequired = scrubPaintFrames(frame)
        setRestBuffer(frame)
        return preparePromise
    }

    function dropInspection() {
        inspectionGeneration++
        inspectionRequest?.abort()
        inspectionRequest = null
        inspectionTarget = -1
        inspectionSource = undefined
        inspection?.close()
        inspection = null
        inspectionFrame = -1
        qualityStartedAt = 0
        lastPaint = ""
    }

    /** Cache compressed checkpoint files as their cameras are approached. */
    async function parkedInspectionBlob(frame: number, generation: number): Promise<Blob | undefined> {
        const checkpoint = checkpoints.indexOf(frame)
        const url = checkpoint >= 0 ? inspectionSources[checkpoint] : ""
        if (!url || url === urls[frame]) return blobs.get(frame)
        const cached = inspectionBlobs.get(frame)
        if (cached) return cached
        const request = new AbortController()
        inspectionRequest = request
        const cancel = () => request.abort()
        const timer = setTimeout(cancel, 10000)
        cancellation.signal.addEventListener("abort", cancel, { once: true })
        try {
            const response = await fetch(url, {
                signal: request.signal,
                mode: "cors",
                credentials: "omit",
                cache: inspectionRefresh.has(frame) ? "reload" : "force-cache",
            })
            if (!response.ok) throw new Error("HTTP " + response.status)
            const blob = await response.blob()
            if (!blob.size) throw new Error("Empty parked image")
            if (destroyed || generation !== inspectionGeneration || request.signal.aborted)
                return undefined
            inspectionBlobs.set(frame, blob)
            inspectionRefresh.delete(frame)
            return blob
        } catch {
            if (!destroyed && generation === inspectionGeneration) {
                inspectionRefresh.add(frame)
                return blobs.get(frame)
            }
            return undefined
        } finally {
            clearTimeout(timer)
            cancellation.signal.removeEventListener("abort", cancel)
            if (inspectionRequest === request) inspectionRequest = null
        }
    }

    function queueInspection(position: number) {
        const target = orbitModulo(Math.round(position), total)
        if (target !== inspectionTarget) {
            dropInspection()
            inspectionTarget = target
        }
        void prepareInspection()
    }

    function revealInspection() {
        if (!inspection || state !== "checkpoint" || inspectionTarget !== frameAt() ||
            inspectionFrame === inspectionTarget) return
        inspectionFrame = inspectionTarget
        qualityStartedAt = performance.now()
        lastPaint = ""
        notify()
        requestPaint()
    }

    async function prepareInspection() {
        const frame = inspectionTarget
        if (
            frame < 0 || !canRun() || state === "paused" || pendingMove ||
            inspectionLoading || inspectionDecoding ||
            inspectionFrame === frame
        ) return
        if (inspection) {
            revealInspection()
            return
        }
        const movementBlob = blobs.get(frame)
        if (!movementBlob) return
        const sharpUrl = inspectionSources[checkpoints.indexOf(frame)]
        const separateSource = !!sharpUrl && sharpUrl !== urls[frame]
        if (!separateSource && inspectionWidth <= motionWidth) return
        const generation = inspectionGeneration
        const current = () => !destroyed && active && generation === inspectionGeneration
        const blob = inspectionSource ?? inspectionBlobs.get(frame) ?? (separateSource ? undefined : movementBlob)
        if (!blob) {
            // Fetching a sharp asset consumes no motion decoder permit.
            inspectionLoading = true
            try {
                const source = await parkedInspectionBlob(frame, generation)
                if (current()) inspectionSource = source
            } finally {
                inspectionLoading = false
                if (!destroyed) resourcesChanged()
            }
            return
        }
        if (decoding.size >= 2 || nativeDecodes >= 2) return
        // Travel starts after its motion frames are ready. On entry, the first
        // motion frame is also ready before this optional decode gets a slot.
        inspectionDecoding = true
        try {
            const bitmap = await decodeBlob(blob, inspectionWidth, true)
            if (!current()) bitmap.close()
            else {
                inspection = bitmap
                // A warmed bitmap belongs exclusively to its destination. The
                // final movement frame may be rounded to its index before arrival.
                revealInspection()
                notify()
            }
        } catch {
            if (current()) {
                if (blob !== movementBlob) {
                    inspectionBlobs.delete(frame)
                    inspectionRefresh.add(frame)
                }
                // The ready movement image stays painted and selectable. The
                // sentinel avoids a retry loop until departure or explicit retry.
                inspectionFrame = frame
            }
        } finally {
            inspectionDecoding = false
            if (!destroyed) resourcesChanged()
        }
    }

    function drawImage(
        bitmap: OrbitBitmap,
        viewport?: { x: number; y: number; width: number; height: number },
        logicalRatio?: number
    ) {
        if (!context) return
        const target = viewport ?? {
            x: 0,
            y: 0,
            width: canvas.width,
            height: canvas.height,
        }
        if (logicalRatio) {
            let width = bitmap.width,
                height = bitmap.height
            if (width / height > logicalRatio) width = height * logicalRatio
            else height = width / logicalRatio
            context.drawImage(
                bitmap.image,
                (bitmap.width - width) * focalX,
                (bitmap.height - height) * focalY,
                width,
                height,
                target.x,
                target.y,
                target.width,
                target.height
            )
            return
        }
        const scale = Math.max(
            target.width / bitmap.width,
            target.height / bitmap.height
        )
        const width = bitmap.width * scale,
            height = bitmap.height * scale
        context.drawImage(
            bitmap.image,
            target.x + (target.width - width) * focalX,
            target.y + (target.height - height) * focalY,
            width,
            height
        )
    }

    function paint() {
        const frame = frameAt()
        let from = frame,
            to = frame,
            frameMix = 0
        if (frameBlend > 0 && !reduced()) {
            const lower = Math.floor(position),
                fraction = position - lower
            // Blend only around the boundary between the two nearest samples.
            // Width zero is a hard nearest-frame cut; width one is linear interpolation.
            frameMix = orbitClamp(
                (fraction - (1 - frameBlend) / 2) / frameBlend,
                0,
                1
            )
            from = orbitModulo(lower, total)
            to = orbitModulo(lower + 1, total)
            if (frameMix === 1) {
                from = to
                frameMix = 0
            }
            if (frameMix === 0) to = from
        }
        const bitmap = frames.get(from),
            next = frameMix > 0 ? frames.get(to) : undefined
        if (!context || !bitmap || !active || destroyed) return
        const requestedBounds = options.renderBounds?.()
        const bounds =
            requestedBounds &&
            [requestedBounds.width, requestedBounds.height].every(
                Number.isFinite
            ) &&
            requestedBounds.width > 0 &&
            requestedBounds.height > 0
                ? requestedBounds
                : canvas.getBoundingClientRect()
        if (bounds.width <= 0 || bounds.height <= 0) return
        const requestedViewport = options.viewport?.({
            width: bounds.width,
            height: bounds.height,
        })
        const viewport =
            requestedViewport &&
            [
                requestedViewport.x,
                requestedViewport.y,
                requestedViewport.width,
                requestedViewport.height,
            ].every(Number.isFinite) &&
            requestedViewport.width > 0 &&
            requestedViewport.height > 0
                ? requestedViewport
                : null
        const useful =
            inspection && inspectionFrame === frame ? inspection : bitmap
        // Match pixel density to the visible image, not the mostly clipped
        // full-root backing. Inspection quality restores density only once ready.
        const usefulDPR = Math.min(
            useful.width / (viewport?.width ?? bounds.width),
            useful.height / (viewport?.height ?? bounds.height)
        )
        const dpr = Math.min(window.devicePixelRatio || 1, 2, usefulDPR)
        const requestedBacking = options.backingSize?.()
        const backing =
            requestedBacking &&
            [requestedBacking.width, requestedBacking.height].every(
                Number.isFinite
            ) &&
            requestedBacking.width > 0 &&
            requestedBacking.height > 0
                ? requestedBacking
                : null
        const width = Math.max(
                1,
                Math.round(backing?.width ?? bounds.width * dpr)
            ),
            height = Math.max(
                1,
                Math.round(backing?.height ?? bounds.height * dpr)
            )
        if (canvas.width !== width || canvas.height !== height) {
            canvas.width = width
            canvas.height = height
            lastPaint = ""
        }
        let destination: { x: number; y: number; width: number; height: number } | undefined
        if (viewport) {
            // Cover the fractional pixels just outside the CSS clip so its
            // antialiased edge always composites against the image.
            const left = Math.floor(viewport.x * width / bounds.width) - 1
            const top = Math.floor(viewport.y * height / bounds.height) - 1
            const right = Math.ceil((viewport.x + viewport.width) * width / bounds.width) + 1
            const bottom = Math.ceil((viewport.y + viewport.height) * height / bounds.height) + 1
            destination = { x: left, y: top, width: right - left, height: bottom - top }
        }
        const mix =
            inspection && inspectionFrame === frame
                ? checkpointFadeMs === 0 || reduced()
                    ? 1
                    : orbitClamp((performance.now() - qualityStartedAt) / checkpointFadeMs, 0, 1)
                : 0
        const logicalRatio = backing
            ? viewport
                ? viewport.width / viewport.height
                : bounds.width / bounds.height
            : undefined
        const signature = [
            from,
            to,
            frameMix.toFixed(4),
            width,
            height,
            inspectionFrame,
            mix.toFixed(4),
            logicalRatio ?? "",
            viewport ? 1 : 0,
            destination?.x ?? 0,
            destination?.y ?? 0,
            destination?.width ?? width,
            destination?.height ?? height,
        ].join("|")
        if (signature === lastPaint) return
        context.globalAlpha = 1
        if (destination) {
            context.fillStyle = "#101820"
            context.fillRect(0, 0, width, height)
            context.save()
            context.beginPath()
            context.rect(
                destination.x,
                destination.y,
                destination.width,
                destination.height
            )
            context.clip()
        }
        drawImage(bitmap, destination, logicalRatio)
        if (next) {
            context.globalAlpha = frameMix
            drawImage(next, destination, logicalRatio)
            context.globalAlpha = 1
        }
        if (inspection && mix > 0 && inspectionFrame === frame) {
            context.globalAlpha = mix
            drawImage(inspection, destination, logicalRatio)
            context.globalAlpha = 1
        }
        if (destination) context.restore()
        setData("orbitFrameFrom", String(from))
        setData("orbitFrameTo", String(to))
        setData("orbitFrameMix", frameMix.toFixed(4))
        if (!canvas.hasAttribute("data-orbit-painted")) canvas.setAttribute("data-orbit-painted", "")
        lastPaint = signature
    }

    function requestPaint() {
        if (!raf && canRun() && state !== "paused")
            raf = requestAnimationFrame(tick)
    }

    function nextCheckpoint(from: number, heading: number) {
        const cycle = Math.floor(from / total),
            candidates: number[] = []
        for (let offset = -1; offset <= 1; offset++)
            for (const checkpoint of checkpoints)
                candidates.push((cycle + offset) * total + checkpoint)
        if (heading > 0)
            return Math.min(
                ...candidates.filter((value) => value > from + 0.0001)
            )
        return Math.max(...candidates.filter((value) => value < from - 0.0001))
    }

    function nearestCheckpoint(from: number) {
        const rounded = Math.round(from)
        if (Math.abs(rounded - from) < 0.0001 &&
            checkpoints.includes(orbitModulo(rounded, total))) return rounded
        const previous = nextCheckpoint(from, -1)
        const following = nextCheckpoint(from, 1)
        const difference = (from - previous) - (following - from)
        if (Math.abs(difference) < 0.0001) return direction > 0 ? following : previous
        return difference < 0 ? previous : following
    }

    function arrive(target: number) {
        wheelIntent = null
        position = target
        settling = null
        pendingMove = null
        pausedAt = 0
        state = "checkpoint"
        queueInspection(target)
        setRestBuffer(target)
        paint()
        notify()
    }

    function startSettle(target = nextCheckpoint(position, direction), from = position, durationSeconds?: number) {
        if (!canRun() || !fullyReady()) return
        const distance = target - from
        const destination = orbitModulo(Math.round(target), total)
        if (Math.abs(distance) < 0.0001 &&
            (from === position || frames.has(destination))) {
            arrive(target)
            return
        }
        direction = Math.sign(distance) || direction
        pausedAt = 0
        const indices = reduced()
            ? [...new Set([orbitModulo(Math.round(from), total), destination])]
            : indicesBetween(from, target)
        const adjacent = Math.abs(target - nextCheckpoint(from, direction)) < 0.0001
        // An adjacent target's window already contains the whole committed arc.
        // A distant numbered jump pins only its route, never route + outer window.
        const wanted = adjacent || Math.abs(distance) < 0.0001
            ? windowIndices(target, bufferCheckpoints)
            : indices
        // A quick release can arrive ahead of the decoder. Keep the displayed
        // frame available until the requested pose and its settle arc are ready.
        const retained = from === position ? wanted
            : [...new Set([...wanted, ...indicesBetween(position, position)])]
        // Preserve the release timing while its frames are being prepared.
        pendingMove = { start: from, target, indices, durationMs: durationSeconds === undefined ? undefined : durationSeconds * 1000 }
        state = "buffering"
        setBuffer(retained, indices, [
            ...indices,
            ...nearestFirst(wanted, target),
        ])
    }

    function tryStartPending() {
        if (
            !pendingMove ||
            !canRun() ||
            state === "paused" ||
            !framesReady(pendingMove.indices)
        )
            return
        const pending = pendingMove
        if (failedIndex(pending.indices) !== undefined) return
        pendingMove = null
        pausedAt = 0
        if (reduced()) {
            arrive(pending.target)
            return
        }
        settling = {
            start: pending.start,
            target: pending.target,
            time: performance.now(),
            duration: Math.abs(pending.target - pending.start) < 0.0001
                ? 1
                : pending.durationMs ?? Math.max(snapDuration * 1000, wheelIntent ? 240 : 0),
        }
        state = "settling"
        queueInspection(pending.target)
        notify()
        requestPaint()
    }

    // Convert a live roll to the existing one-checkpoint settle from the
    // painted position. Matching its initial slope avoids an abrupt slowdown.
    function endWheelFlow(now: number) {
        const speed = wheelIntent?.speed
        wheelIntent = null
        if (speed === undefined || speed === null || !settling) return
        const target = settling.target
        const distance = Math.abs(target - position)
        const duration = distance < 0.0001
            ? 1
            : orbitClamp((distance * 2200) / Math.max(1, speed), 160, 900)
        settling = {
            start: position,
            target,
            time: now,
            duration,
            startSlope: distance > 0 ? orbitClamp(speed * duration / (1000 * distance), 0, 3) : 0,
        }
        if (state === "moving") state = "settling"
    }

    function tickWheel(now: number) {
        const intent = wheelIntent, arc = settling
        if (!intent || !arc || (!intent.continuous && !intent.followThrough)) return false
        if ((!intent.followThrough && now - intent.lastDriveAt > ORBIT_WHEEL_RELEASE_MS) ||
            !options.continuousWheelBounds?.()) {
            endWheelFlow(now)
            return false
        }
        if (intent.speed === null) {
            const t = orbitClamp((now - arc.time) / arc.duration, 0, 1)
            const slope = (1 - t) * (6 * t + (arc.startSlope ?? 0) * (1 - 3 * t))
            const easeSpeed = Math.abs(arc.target - arc.start) * 1000 * slope / arc.duration
            intent.speed = orbitClamp(easeSpeed, 2, 44)
            intent.driveStartedAt = now
            intent.tickAt = now
            state = "moving"
        }
        const dt = orbitClamp(now - intent.tickAt, 0, 48)
        intent.tickAt = now
        const ramp = orbitClamp((now - intent.driveStartedAt) / 1700, 0, 1)
        const normalSpeed = Math.abs(arc.target - arc.start) / snapDuration
        const desiredSpeed = orbitClamp(normalSpeed * (1.32 + ramp * 1.35), 8, 44)
        intent.speed += (desiredSpeed - intent.speed) * (1 - Math.exp(-dt / 240))
        const distance = Math.abs(arc.target - position)
        const travel = intent.speed * dt / 1000
        if (travel < distance) {
            position += direction * travel
            return true
        }

        const target = nextCheckpoint(arc.target, direction)
        const indices = indicesBetween(arc.target, target)
        // The next arc is already warming in the existing adjacent buffer.
        // Stay at its shared frame if decoding falls behind the camera.
        if (!framesReady(indices)) {
            position = arc.target
            if (failedIndex(indices) !== undefined) {
                wheelIntent = null
                settling = null
                startSettle(target)
            }
            return true
        }
        // A renewed swipe earns one adjoining arc. A continuous wheel or hold
        // can keep passing checkpoints only while deliberate input is current.
        intent.followThrough = false
        position = arc.target + direction * Math.min(travel - distance, Math.abs(target - arc.target))
        settling = { start: arc.target, target, time: now, duration: snapDuration * 1000 }
        queueInspection(target)
        const wanted = windowIndices(target, bufferCheckpoints)
        setBuffer(wanted, indices, [...indices, ...nearestFirst(wanted, target)])
        if (!intent.continuous || now - intent.lastDriveAt > ORBIT_WHEEL_RELEASE_MS)
            endWheelFlow(now)
        return true
    }

    function paintScrubPosition() {
        const scrub = activeScrub()
        if (!scrub || scrub.target === position) return
        const { target } = scrub
        const center = nearestCheckpoint(target)
        const pair = scrubPaintFrames(target)
        const ready = framesReady(pair)
        position = ready ? target : readyScrubPosition(target)
        // Keep the requested pair as a decode priority, but discard any distance
        // the available pixels could not display. A stopped pointer stays stopped.
        scrub.target = position
        if (center === scrub.bufferCenter &&
            (ready || pair.every((index) => required.has(index)))) return
        scrub.bufferCenter = center
        const nearby = windowIndices(center, bufferCheckpoints)
        const wanted = [...new Set([...nearby, ...scrubPaintFrames(position)])]
        // Decode the exact pose first, then a short runway in the drag direction.
        // The retained window stays symmetric, so reversing needs no new download.
        const ahead = Array.from({ length: 4 }, (_, step) =>
            orbitModulo(Math.round(target) + direction * (step + 1), total)
        )
        setBuffer(wanted, pair, [...pair, ...ahead, ...nearestFirst(nearby, target)])
    }

    function tick(now: number) {
        raf = 0
        if (!canRun() || state === "paused") return
        if (activeScrub()) paintScrubPosition()
        if (!tickWheel(now) && settling) {
            const motion = settling,
                t = orbitClamp((now - motion.time) / motion.duration, 0, 1)
            const smooth = t * t * (3 - 2 * t)
                + (motion.startSlope ?? 0) * t * (1 - t) * (1 - t)
            position = motion.start + (motion.target - motion.start) * smooth
            if (t >= 1) {
                arrive(motion.target)
            }
        }
        paint()
        notify()
        const qualityActive =
            inspection &&
            inspectionFrame === frameAt() &&
            checkpointFadeMs > 0 &&
            !reduced() &&
            now - qualityStartedAt < checkpointFadeMs
        if (settling || qualityActive) requestPaint()
    }

    function releaseDrag() {
        if (!drag) return
        if (drag.moved) suppressClickUntil = performance.now() + 400
        const pointer = drag.id
        drag = null
        touchDragging = false
        try {
            if (root.hasPointerCapture(pointer))
                root.releasePointerCapture(pointer)
        } catch {
            /* Detached elements have no capture. */
        }
    }

    function finishPointerDrag(event: PointerEvent) {
        if (!drag || touchDragging || drag.id !== event.pointerId) return
        const scrub = activeScrub()
        if (scrub && event.cancelable) event.preventDefault()
        if (drag.moved) lastInputAt = performance.now()
        // A pointerup can arrive before the scheduled paint of the last move.
        // Use its already-decoded pose when choosing the nearest checkpoint.
        if (scrub && canRun()) paintScrubPosition()
        releaseDrag()
        if (!scrub) return
        if (canRun()) {
            const target = nearestCheckpoint(position)
            const halfArc = total / checkpointCount / 2
            const fraction = orbitClamp(Math.abs(target - position) / halfArc, 0, 1)
            // A tiny release must not crawl for the full checkpoint duration.
            startSettle(target, position, Math.max(.1, dragReleaseDuration * fraction))
        } else interruptedScrub = true
    }

    function interruptDrag() {
        interruptedScrub ||= !!activeScrub()
        releaseDrag()
    }

    function ignored(target: EventTarget | null) {
        let element = target instanceof Element ? target : null
        if (!element) return true
        // Framer may place a transparent sibling above this component. Stop at the
        // shared container: its role/overflow belongs to the page, not a control.
        while (element && element !== root && !element.contains(root)) {
            if (
                element.matches(
                    "nav,header,a,button,input,textarea,select,option,[contenteditable]:not([contenteditable='false']),[role='button'],[role='link'],[data-orbit-ignore]"
                )
            )
                return true
            element = element.parentElement
        }
        return false
    }

    function insideViewer(x: number, y: number) {
        const box = options.inputBounds?.() || root.getBoundingClientRect()
        return (
            box.width > 0 &&
            box.height > 0 &&
            x >= box.left &&
            x <= box.left + box.width &&
            y >= box.top &&
            y <= box.top + box.height
        )
    }

    function inputPoint(clientX: number, clientY: number) {
        const point = options.inputPoint?.(clientX, clientY)
        return point && Number.isFinite(point.x) && Number.isFinite(point.y)
            ? point
            : { x: clientX, y: clientY }
    }

    function coveredTrialControl(x: number, y: number) {
        return Array.from(
            root.querySelectorAll<HTMLElement>(
                "[data-homepage-controls] button, button[data-apartment-open], button[data-orbit-detail-link], button[data-orbit-favorite], button[data-orbit-fullscreen-open], button[data-orbit-fullscreen-close], [data-orbit-filters], [data-orbit-filters] button, [data-orbit-range-popover], [data-orbit-group]"
            )
        ).some((control) => {
            if (
                (control as HTMLButtonElement).disabled ||
                control.getAttribute("aria-disabled") === "true" ||
                control.closest("[inert], [hidden], [aria-hidden='true']")
            )
                return false
            const box = control.getBoundingClientRect()
            if (box.width <= 0 || box.height <= 0 ||
                x < box.left || x > box.right || y < box.top || y > box.bottom)
                return false
            const style = getComputedStyle(control)
            if (style.pointerEvents === "none") return false
            for (
                let element: HTMLElement | null = control;
                element;
                element = element.parentElement
            ) {
                const css =
                    element === control ? style : getComputedStyle(element)
                if (
                    css.display === "none" ||
                    css.visibility === "hidden" ||
                    css.visibility === "collapse" ||
                    Number(css.opacity) === 0
                )
                    return false
                if (element === root) break
            }
            return true
        })
    }

    function nestedScroll(
        target: EventTarget | null,
        deltaX: number,
        deltaY: number
    ) {
        let element = target instanceof Element ? target : null
        while (element && element !== root && !element.contains(root)) {
            const style = getComputedStyle(element),
                horizontal = Math.abs(deltaX) > Math.abs(deltaY)
            if (
                horizontal &&
                /auto|scroll/.test(style.overflowX) &&
                element.scrollWidth > element.clientWidth + 1
            ) {
                if (
                    deltaX < 0
                        ? element.scrollLeft > 0
                        : element.scrollLeft <
                          element.scrollWidth - element.clientWidth - 1
                )
                    return true
            }
            if (
                !horizontal &&
                /auto|scroll/.test(style.overflowY) &&
                element.scrollHeight > element.clientHeight + 1
            ) {
                if (
                    deltaY < 0
                        ? element.scrollTop > 0
                        : element.scrollTop <
                          element.scrollHeight - element.clientHeight - 1
                )
                    return true
            }
            element = element.parentElement
        }
        return false
    }

    function suspendedInput(event: Event, x?: number, y?: number) {
        if (
            !suspended ||
            !active ||
            destroyed ||
            !visible ||
            ignored(event.target)
        )
            return false
        if (x !== undefined && y !== undefined && !insideViewer(x, y))
            return false
        if (event.cancelable) event.preventDefault()
        return true
    }

    function setSuspended(value: boolean) {
        if (destroyed || suspended === value) return
        const now = performance.now()
        endWheelFlow(now)
        suspended = value
        interruptDrag()
        wheelGesture = null
        wheelCoasting = false
        // Forget the old gesture and consume its immediate inertial tail after rotation.
        lastWheelAt = lastInputAt = now
        wheelLatched = true
        suppressClickUntil = now + 400
        if (suspended) {
            suspendedAt = now
            if (raf) cancelAnimationFrame(raf)
            raf = 0
        } else {
            // The committed arc resumes from the same point. A manual pause owns its
            // own timestamp and remains paused until the visitor explicitly resumes.
            if (settling && state !== "paused")
                settling.time += now - suspendedAt
            suspendedAt = 0
            if (
                !visible ||
                document.hidden ||
                (state === "paused" && automaticPause)
            )
                visibilityChanged()
            if (pendingMove) tryStartPending()
            if (interruptedScrub && state !== "paused") resume()
            void prepareInspection()
            requestPaint()
        }
        notify()
    }

    function onWheel(event: WheelEvent) {
        if (
            !event.ctrlKey &&
            !event.metaKey &&
            suspendedInput(event, event.clientX, event.clientY)
        )
            return
        if (
            !inputAvailable() ||
            event.defaultPrevented ||
            event.ctrlKey ||
            event.metaKey ||
            !insideViewer(event.clientX, event.clientY) ||
            coveredTrialControl(event.clientX, event.clientY) ||
            ignored(event.target)
        )
            return
        if (nestedScroll(event.target, event.deltaX, event.deltaY)) return
        const wheelBounds = options.continuousWheelBounds?.()
        if (wheelBounds && (
            event.clientX < wheelBounds.left || event.clientX > wheelBounds.right ||
            event.clientY < wheelBounds.top || event.clientY > wheelBounds.bottom
        )) return
        const scale =
            event.deltaMode === 1
                ? 16
                : event.deltaMode === 2
                  ? Math.max(1, root.clientHeight)
                  : 1
        const canFlow = !!wheelBounds && !reduced()
        const intent = canFlow && (settling || pendingMove) ? wheelIntent : null
        const now = performance.now()
        const freshGesture = now - lastWheelAt >= ORBIT_WHEEL_GESTURE_GAP_MS
        const horizontal = (canFlow && !wheelCoasting && (intent || !freshGesture) ? wheelGesture?.horizontal : undefined)
            ?? (Math.abs(event.deltaX) > Math.abs(event.deltaY))
        const raw = (horizontal ? event.deltaX : event.deltaY) * scale
        if (Math.abs(raw) < 0.2) return
        event.preventDefault()
        lastWheelAt = lastInputAt = now
        const consumed = wheelLatched && !freshGesture
        wheelLatched = true

        const heading = Math.sign(raw), strength = Math.abs(raw)
        const beginIntent = (): OrbitWheelIntent => ({
            lastDriveAt: now, continuous: false, followThrough: false,
            speed: null, driveStartedAt: 0, tickAt: 0,
        })
        let newSwipe = false
        if (canFlow) {
            // On browsers that expose native momentum, consume it without letting
            // it start or extend a move. Other browsers use the input shape.
            if ((event as WheelEvent & { momentum?: boolean }).momentum === true) {
                wheelCoasting = true
                return
            }
            const afterMomentum = wheelCoasting
            wheelCoasting = false
            if (wheelGesture && heading !== wheelGesture.heading && (!freshGesture || intent) && !afterMomentum)
                return
            const sample = sampleOrbitWheel(afterMomentum ? null : wheelGesture, now, heading, horizontal, strength, event.deltaMode !== 0)
            wheelGesture = sample.gesture
            newSwipe = freshGesture || afterMomentum || sample.renewed

            if (intent) {
                if (heading !== direction) return
                if (newSwipe && !sample.continuous) {
                    intent.followThrough = true
                    intent.continuous = false
                }
                if (sample.continuous) intent.continuous = true
                if (sample.continuous || newSwipe) intent.lastDriveAt = now
                return
            }
            if (settling?.startSlope !== undefined && newSwipe && heading === direction) {
                // Accept renewed input during a wheel-owned release ease.
                wheelIntent = beginIntent()
                wheelIntent.continuous = sample.continuous
                wheelIntent.followThrough = !sample.continuous
                return
            }
        }
        // Keep the latch across the remaining coast, including if the camera
        // has already parked. A distinct renewed swipe can still step again.
        if (
            (consumed && !newSwipe) ||
            state !== "checkpoint" ||
            settling ||
            pendingMove ||
            drag
        )
            return
        wheelIntent = canFlow ? beginIntent() : null
        go(heading)
    }

    function onPointerDown(event: PointerEvent) {
        if (event.pointerType === "touch") return
        if (suspendedInput(event, event.clientX, event.clientY)) return
        if (!event.isPrimary) {
            if (drag && !drag.scrub) releaseDrag()
            return
        }
        if (
            !inputAvailable() ||
            event.defaultPrevented ||
            event.button !== 0 ||
            !insideViewer(event.clientX, event.clientY) ||
            coveredTrialControl(event.clientX, event.clientY) ||
            ignored(event.target)
        )
            return
        if (
            nestedScroll(event.target, 1, 0) ||
            nestedScroll(event.target, 0, 1)
        )
            return
        const bounds = event.pointerType === "mouse" ? options.continuousWheelBounds?.() : null
        const moving = state !== "checkpoint" || !!settling || !!pendingMove
        if (bounds && (moving || bounds.width <= 0 || bounds.height <= 0 ||
            event.clientX < bounds.left || event.clientX > bounds.right ||
            event.clientY < bounds.top || event.clientY > bounds.bottom)) return

        const point = inputPoint(event.clientX, event.clientY)
        drag = {
            id: event.pointerId,
            x: point.x,
            y: point.y,
            moved: false,
            triggered: moving,
            scrub: bounds ? {
                pointerX: point.x,
                inputAt: performance.now(),
                framesPerPixel: total / (bounds.width * dragTurnWidths),
                target: position,
            } : undefined,
        }
        try {
            root.setPointerCapture(event.pointerId)
        } catch {
            /* Mouse events can still finish through the window listener. */
        }
    }

    /** Bound each input sample; discarded motion never becomes a catch-up queue. */
    function boundedDragStep(requested: number, elapsedMs: number, first: boolean) {
        const elapsed = orbitClamp(elapsedMs, 0, first ? 1000 / 60 : 100)
        const limit = dragFramesPerSecond * elapsed / 1000
        return orbitClamp(requested, -limit, limit)
    }

    function onPointerMove(event: PointerEvent) {
        if (
            !drag ||
            touchDragging ||
            drag.id !== event.pointerId ||
            !inputAvailable()
        )
            return
        const dx = inputPoint(event.clientX, event.clientY).x - drag.x
        if (drag.scrub && !(event.buttons & 1)) {
            finishPointerDrag(event)
            return
        }
        if (Math.abs(dx) < 8 && !drag.moved) return
        if (event.cancelable) event.preventDefault()
        if (drag.scrub) {
            if (!drag.moved) {
                dropInspection()
                state = "moving"
            }
            const scrub = drag.scrub
            const pointerX = drag.x + dx
            const now = performance.now()
            const requested = (scrub.pointerX - pointerX) * scrub.framesPerPixel
            const step = boundedDragStep(requested, now - scrub.inputAt, !drag.moved)
            // Consume the whole pointer sample even if its distance was capped.
            // Several samples within one RAF still accumulate their allowed steps.
            scrub.pointerX = pointerX
            scrub.inputAt = now
            direction = Math.sign(step) || direction
            scrub.target += step
            drag.moved = true
            lastInputAt = now
            requestPaint()
            return
        }
        drag.moved = true
        lastInputAt = performance.now()
        if (drag.triggered) return
        drag.triggered = true
        go(dx < 0 ? 1 : -1)
    }

    function onPointerUp(event: PointerEvent) {
        finishPointerDrag(event)
    }

    function onPointerCancel(event: PointerEvent) {
        if (!drag || touchDragging || drag.id !== event.pointerId) return
        if (drag.scrub) finishPointerDrag(event)
        else releaseDrag()
    }

    function onLostPointerCapture(event: PointerEvent) {
        if (drag?.scrub) finishPointerDrag(event)
    }

    function onClick(event: MouseEvent) {
        if (suspendedInput(event, event.clientX, event.clientY)) {
            event.stopPropagation()
            return
        }
        if (coveredTrialControl(event.clientX, event.clientY)) return
        // A drag must not accidentally activate a picking listener attached by the wrapper.
        const now = performance.now()
        if (
            (now < suppressClickUntil ||
                (now - lastInputAt < 120 && state !== "checkpoint")) &&
            insideViewer(event.clientX, event.clientY) &&
            !ignored(event.target)
        ) {
            event.preventDefault()
            event.stopPropagation()
        }
    }

    function onTouchStart(event: TouchEvent) {
        if (suspended) {
            releaseDrag()
            return
        }
        if (drag?.scrub) return
        if (event.touches.length !== 1) {
            if (touchDragging) releaseDrag()
            return
        }
        const touch = event.touches[0]
        if (
            !inputAvailable() ||
            event.defaultPrevented ||
            !insideViewer(touch.clientX, touch.clientY) ||
            coveredTrialControl(touch.clientX, touch.clientY) ||
            ignored(event.target)
        )
            return
        if (
            nestedScroll(event.target, 1, 0) ||
            nestedScroll(event.target, 0, 1)
        )
            return
        const point = inputPoint(touch.clientX, touch.clientY)
        drag = {
            id: touch.identifier,
            x: point.x,
            y: point.y,
            moved: false,
            triggered: state !== "checkpoint" || !!settling || !!pendingMove,
        }
        touchDragging = true
    }

    function onTouchMove(event: TouchEvent) {
        if (suspended && event.touches.length === 1) {
            const point = event.touches[0]
            suspendedInput(event, point.clientX, point.clientY)
            return
        }
        if (
            !touchDragging ||
            !drag ||
            !inputAvailable() ||
            event.touches.length !== 1
        )
            return
        const touch = event.touches[0]
        const point = inputPoint(touch.clientX, touch.clientY)
        const dx = point.x - drag.x,
            dy = point.y - drag.y
        // A non-passive touch listener also reaches Framer sibling hit layers;
        // changing the canvas touch-action alone cannot prevent their page pan.
        if (event.cancelable) event.preventDefault()
        if (!drag.moved && Math.max(Math.abs(dx), Math.abs(dy)) < ORBIT_TOUCH_GESTURE_THRESHOLD) return
        drag.moved = true
        lastInputAt = performance.now()
        if (drag.triggered) return
        const delta = Math.abs(dx) >= Math.abs(dy) ? -dx : -dy
        drag.triggered = true
        go(Math.sign(delta))
    }

    function onTouchEnd(event: TouchEvent) {
        if (!touchDragging || !drag || event.touches.length) return
        if (drag.moved) lastInputAt = performance.now()
        releaseDrag()
    }

    function onTouchCancel() {
        if (!touchDragging || !drag) return
        releaseDrag()
    }

    function go(heading: number) {
        if (
            !canRun() ||
            !fullyReady() ||
            !heading ||
            settling ||
            pendingMove ||
            state !== "checkpoint"
        )
            return
        automaticPause = false
        direction = heading > 0 ? 1 : -1
        if (drag) drag.triggered = true
        startSettle(nextCheckpoint(position, direction))
    }

    function setCheckpoint(index: number) {
        if (
            !canRun() ||
            !fullyReady() ||
            settling ||
            pendingMove ||
            state !== "checkpoint"
        )
            return
        const desired =
            checkpoints[orbitModulo(Math.round(index), checkpointCount)]
        const current = orbitModulo(position, total)
        let distance =
            orbitModulo(desired - current + total / 2, total) - total / 2
        if (Math.abs(distance + total / 2) < 0.0001)
            distance = (direction * total) / 2
        automaticPause = false
        if (drag) drag.triggered = true
        startSettle(position + distance)
    }

    function pauseInternal(automatic: boolean) {
        if (!active || destroyed || state === "error" || state === "loading")
            return
        automaticPause = automatic
        wheelGesture = null
        wheelCoasting = false
        endWheelFlow(performance.now())
        interruptDrag()
        if (state !== "paused")
            pausedAt = suspended ? suspendedAt : performance.now()
        if (raf) cancelAnimationFrame(raf)
        raf = 0
        state = "paused"
        notify()
    }

    function resume() {
        if (
            !active ||
            suspended ||
            destroyed ||
            !fullyReady() ||
            !visible ||
            document.hidden ||
            state === "error"
        )
            return
        automaticPause = false
        if (interruptedScrub) {
            interruptedScrub = false
            startSettle(nearestCheckpoint(position))
            return
        }
        if (pendingMove) {
            pausedAt = 0
            state = "buffering"
            resourcesChanged()
            return
        }
        if (settling) {
            if (reduced()) {
                arrive(settling.target)
                return
            }
            if (pausedAt) settling.time += performance.now() - pausedAt
            pausedAt = 0
            state = "settling"
            queueInspection(settling.target)
            notify()
            requestPaint()
            return
        }
        const current = orbitModulo(position, total),
            checkpoint = checkpoints.find(
                (value) => Math.abs(value - current) < 0.0001
            )
        if (
            checkpoint !== undefined ||
            Math.abs(current - entryFrame) < 0.0001
        ) {
            state = "checkpoint"
            queueInspection(position)
            paint()
            notify()
            requestPaint()
        } else {
            state = "moving"
            startSettle()
        }
    }

    function visibilityChanged() {
        if (!active || suspended) return
        if ((!visible || document.hidden) && state !== "paused")
            pauseInternal(true)
        else if (visible && !document.hidden && automaticPause) resume()
    }

    function onKeyDown(event: KeyboardEvent) {
        if (options.allowsPageScroll?.()) {
            // Keep page navigation available even when a direct orbit link focuses the viewer.
            if (["PageDown", "PageUp", "Home", "End"].includes(event.key)) return
            const outside = !(event.target instanceof Node && root.contains(event.target))
            if (outside && ["ArrowDown", "ArrowUp", " ", "Spacebar"].includes(event.key)) return
        }
        if (
            !event.ctrlKey &&
            !event.metaKey &&
            !event.altKey &&
            [
                "ArrowRight",
                "ArrowDown",
                "PageDown",
                "ArrowLeft",
                "ArrowUp",
                "PageUp",
                " ",
                "Spacebar",
                "Home",
                "End",
            ].includes(event.key) &&
            suspendedInput(event)
        )
            return
        if (
            !inputAvailable() ||
            event.defaultPrevented ||
            event.ctrlKey ||
            event.metaKey ||
            event.altKey ||
            ignored(event.target)
        )
            return
        const heading = ["ArrowRight", "ArrowDown", "PageDown"].includes(
            event.key
        )
            ? 1
            : ["ArrowLeft", "ArrowUp", "PageUp"].includes(event.key)
              ? -1
              : event.key === " " || event.key === "Spacebar"
                ? event.shiftKey
                    ? -1
                    : 1
                : 0
        if (heading) {
            event.preventDefault()
            if (!event.repeat) go(heading)
        }
    }

    function onEscape(event: KeyboardEvent) {
        if (
            event.key === "Escape" &&
            !event.defaultPrevented &&
            !ignored(event.target) &&
            inputAvailable() &&
            root.querySelector("[data-orbit-playback-toggle]")
        )
            pauseInternal(false)
    }

    async function activate(
        frame = startFrame,
        restoration?: OrbitRestoration
    ) {
        const token = ++activation
        const initialPosition = Number.isFinite(restoration?.position)
            ? restoration!.position
            : orbitModulo(Math.round(Number.isFinite(frame) ? frame : startFrame), total)
        await prepare(initialPosition)
        if (destroyed || token !== activation) return
        active = false
        automaticPause = false
        wheelIntent = null
        wheelGesture = null
        wheelCoasting = false
        interruptedScrub = false
        releaseDrag()
        position = initialPosition
        entryFrame = orbitModulo(Math.round(position), total)
        direction =
            restoration?.direction && Number.isFinite(restoration.direction)
                ? Math.sign(restoration.direction)
                : 1
        settling = null
        pendingMove = null
        pausedAt = 0
        dropInspection()
        state = "loading"
        const target =
            Number.isFinite(restoration?.target) &&
            Math.abs(restoration!.target! - position) > 0.0001
                ? restoration!.target!
                : undefined
        const initial =
            target === undefined
                ? scrubPaintFrames(position)
                : indicesBetween(position, target)
        if (target === undefined) setRestBuffer(position)
        else {
            direction = Math.sign(target - position)
            pendingMove = { start: position, target, indices: initial }
            // Resume the same complete route without adding an unrelated outer
            // window to a distant jump. Adjacent moves still warm both neighbours.
            const adjacent = Math.abs(target - nextCheckpoint(position, direction)) < 0.0001
            const wanted = adjacent ? windowIndices(target, bufferCheckpoints) : initial
            setBuffer(wanted, initial, [
                ...initial,
                ...nearestFirst(wanted, target),
            ])
        }
        try {
            await waitForFrames(initial, token)
        } catch (reason) {
            if (!destroyed && token === activation) {
                fail(failedIndex(initial) ?? frameAt())
                notify()
            }
            throw reason
        }
        if (destroyed || token !== activation) return
        active = true
        canvas.style.touchAction = "pinch-zoom"
        // Do not interpret the approach's remaining wheel momentum as an orbit move.
        lastWheelAt = performance.now()
        wheelLatched = true
        state = restoration?.paused
            ? "paused"
            : target === undefined
              ? "checkpoint"
              : "buffering"
        if (state === "paused")
            pausedAt = suspended ? suspendedAt : performance.now()
        // A custom entry frame is parked exactly; the eight selectable cameras stay fixed.
        if (target === undefined) setRestBuffer(position)
        paint()
        notify()
        if (target === undefined) queueInspection(position)
        if (!suspended && (!visible || document.hidden)) pauseInternal(true)
        else if (target !== undefined) resourcesChanged()
    }

    /** Retain compressed downloads while optionally releasing all parked/motion bitmaps. */
    function deactivate(releaseDecoded = false) {
        activation++
        active = false
        canvas.removeAttribute("data-orbit-painted")
        automaticPause = false
        wheelIntent = null
        wheelGesture = null
        wheelCoasting = false
        interruptedScrub = false
        releaseDrag()
        settling = null
        pendingMove = null
        pausedAt = 0
        if (raf) cancelAnimationFrame(raf)
        raf = 0
        dropInspection()
        canvas.style.touchAction = originalTouchAction
        error = undefined
        if (releaseDecoded) {
            // The opening sequence must not share memory with an invisible orbit
            // window. Late native decodes keep their permits, then close instead
            // of entering a later preparation that happens to want the same IDs.
            decodeGeneration++
            prepared = preparing = false
            desired.clear()
            required.clear()
            priority = []
            preparationRequired = []
            residentFramesDirty = requiredFramesDirty = true
            frames.forEach((bitmap) => bitmap.close())
            frames.clear()
            const resolve = prepareResolve
            prepareResolve = prepareReject = null
            preparePromise = null
            // Old activation waiters observe the incremented activation token.
            // Finish abandoned warm-up promises without an unhandled rejection.
            resolve?.()
            state = "idle"
            finishWaiters()
            notify()
            pump()
            return
        }
        state = prepared ? "idle" : preparing ? "loading" : "idle"
        if ((prepared || preparing) && !destroyed)
            setRestBuffer(startFrame)
        else {
            finishWaiters()
            notify()
        }
    }

    async function retry() {
        if (destroyed) return
        dropInspection()
        const token = activation,
            wasActive = active,
            remainPaused = errorWasPaused
        // A decoder failure may be an invalid cached response. Refresh only those
        // sources; successful downloads and resident bitmaps remain untouched.
        for (const index of decodeFailed.keys()) {
            blobs.delete(index)
            refresh.add(index)
        }
        fetchFailed.clear()
        retriedDownloads.clear()
        decodeFailed.clear()
        error = undefined
        errorWasPaused = false
        if (!prepared) {
            preparePromise = null
            await prepare(preparationFrame)
        } else {
            state = wasActive
                ? pendingMove
                    ? remainPaused
                        ? "paused"
                        : "buffering"
                    : "paused"
                : "loading"
            try {
                await waitForFrames([...required], token)
            } catch (reason) {
                if (!destroyed && token === activation) {
                    fail(failedIndex([...required]) ?? frameAt())
                    notify()
                }
                throw reason
            }
        }
        if (destroyed || token !== activation || !wasActive) return
        if (remainPaused) {
            state = "paused"
            notify()
        } else if (pendingMove) {
            state = "buffering"
            resourcesChanged()
        } else {
            state = "paused"
            resume()
        }
    }

    const resizeObserver =
        typeof ResizeObserver === "function"
            ? new ResizeObserver(() => {
                  lastPaint = ""
                  if (active && (state === "paused" || suspended))
                      paint()
                  else requestPaint()
              })
            : null
    resizeObserver?.observe(canvas)
    const intersectionObserver =
        typeof IntersectionObserver === "function"
            ? new IntersectionObserver((entries) => {
                  const entry = entries.find((value) => value.target === root)
                  if (entry) {
                      visible =
                          entry.isIntersecting && entry.intersectionRatio > 0
                      visibilityChanged()
                  }
              })
            : null
    intersectionObserver?.observe(root)
    const resize = () => {
        lastPaint = ""
        if (active && (state === "paused" || suspended))
            paint()
        else requestPaint()
    }
    const reducedChanged = () => {
        if (
            !suspended &&
            !activeScrub() &&
            reduced() &&
            active &&
            fullyReady() &&
            (state === "moving" || state === "settling")
        )
            arrive(settling?.target ?? nextCheckpoint(position, direction))
    }
    window.addEventListener("wheel", onWheel, { passive: false, capture: true })
    root.addEventListener("lostpointercapture", onLostPointerCapture)
    window.addEventListener("pointerdown", onPointerDown, true)
    window.addEventListener("pointermove", onPointerMove, {
        passive: false,
        capture: true,
    })
    window.addEventListener("pointerup", onPointerUp, true)
    window.addEventListener("pointercancel", onPointerCancel, true)
    window.addEventListener("touchstart", onTouchStart, {
        passive: true,
        capture: true,
    })
    window.addEventListener("touchmove", onTouchMove, {
        passive: false,
        capture: true,
    })
    window.addEventListener("touchend", onTouchEnd, true)
    window.addEventListener("touchcancel", onTouchCancel, true)
    window.addEventListener("click", onClick, true)
    window.addEventListener("keydown", onKeyDown, true)
    window.addEventListener("resize", resize)
    window.addEventListener("keydown", onEscape)
    document.addEventListener("visibilitychange", visibilityChanged)
    reducedQuery?.addEventListener?.("change", reducedChanged)
    notify()

    return {
        prefetch,
        prepare,
        activate,
        deactivate,
        go,
        setCheckpoint,
        pause: () => pauseInternal(false),
        resume,
        retry,
        snapshot,
        setSuspended,
        redraw: paint,
        destroy() {
            if (destroyed) return
            destroyed = true
            deactivate()
            cancellation.abort()
            const reject = prepareReject
            prepareResolve = prepareReject = null
            reject?.(new Error("Orbit disposed"))
            waiters.splice(0).forEach((waiter) => waiter.resolve())
            frames.forEach((bitmap) => bitmap.close())
            frames.clear()
            blobs.clear()
            inspectionBlobs.clear()
            inspectionRefresh.clear()
            resizeObserver?.disconnect()
            intersectionObserver?.disconnect()
            window.removeEventListener("wheel", onWheel, true)
            root.removeEventListener("lostpointercapture", onLostPointerCapture)
            window.removeEventListener("pointerdown", onPointerDown, true)
            window.removeEventListener("pointermove", onPointerMove, true)
            window.removeEventListener("pointerup", onPointerUp, true)
            window.removeEventListener("pointercancel", onPointerCancel, true)
            window.removeEventListener("click", onClick, true)
            window.removeEventListener("touchstart", onTouchStart, true)
            window.removeEventListener("touchmove", onTouchMove, true)
            window.removeEventListener("touchend", onTouchEnd, true)
            window.removeEventListener("touchcancel", onTouchCancel, true)
            window.removeEventListener("keydown", onKeyDown, true)
            window.removeEventListener("resize", resize)
            window.removeEventListener("keydown", onEscape)
            document.removeEventListener("visibilitychange", visibilityChanged)
            reducedQuery?.removeEventListener?.("change", reducedChanged)
        },
    }
}

interface OrbitMaskRect {
    x: number
    y: number
    width: number
    height: number
}
interface OrbitApartmentPickerView {
    enabled: boolean
    checkpoint: number
    moving: boolean
    suspended: boolean
    mobile: boolean
    width: number
    height: number
    viewport: OrbitMaskRect
    focalX: number
    focalY: number
}
interface OrbitApartmentPickerOptions {
    root: HTMLElement
    canvas: HTMLCanvasElement
    urls: readonly string[]
    /** Actual exported mask RGB values; these may differ from the source object colours. */
    palette: readonly {
        id: string
        maskColor: string
        maskColorAliases?: readonly string[]
    }[]
    lightingEnabled?: boolean
    lightingAtlasUrl?: string
    lightingDataUrl?: string
    lightingFrame?: number
    sceneLighting?: boolean
    isSold?: (id: string) => boolean
    getView: () => OrbitApartmentPickerView
    inputPoint: (clientX: number, clientY: number) => { x: number; y: number }
    onHover: (id: string | null) => void
    /** Reports IDs in the currently visible, decoded checkpoint crop. */
    onVisibleApartments?: (checkpoint: number, ids: readonly string[]) => void
    onPick: (id: string) => void
    getAllowedIds: () => readonly string[]
    getHighlightIds: () => readonly string[]
    /** Availability colour for this apartment; absent values retain the configured fallback tint. */
    getHighlightColor?: (id: string) => string | undefined
    /** A known apartment has a status tint or null for the original atlas colour. */
    getLightTint?: (id: string) => string | null | undefined
    /** Apply window lighting to every matching apartment in this view. */
    isFilterActive?: () => boolean
    highlightColor?: string
    highlightOpacity?: number
}
interface OrbitMaskIndex {
    width: number
    height: number
    pixels: Uint8Array
    minX: Uint32Array
    maxX: Uint32Array
    minY: Uint32Array
    maxY: Uint32Array
}
interface OrbitApartmentPickerSnapshot {
    state: "off" | "moving" | "loading" | "ready" | "error"
    checkpoint: number
    cached: number
    downloaded: number
    hovered: string | null
    highlighted: string[]
    error: string | null
}

function orbitNumericHighlightRGB(
    input: string
): [number, number, number] | null {
    if (/^#(?:[0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(input)) {
        const raw = input.slice(1),
            hex =
                raw.length <= 4
                    ? raw
                          .split("")
                          .map((channel) => channel + channel)
                          .join("")
                    : raw
        return [
            parseInt(hex.slice(0, 2), 16),
            parseInt(hex.slice(2, 4), 16),
            parseInt(hex.slice(4, 6), 16),
        ]
    }
    const match = input.match(/^rgba?\(([^()]*)\)$/i)
    if (!match) return null
    const channels = match[1]
        .trim()
        .split(/[\s,/]+/)
        .filter(Boolean)
    if (
        (channels.length !== 3 && channels.length !== 4) ||
        channels.some(
            (channel) => !/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)%?$/.test(channel)
        )
    )
        return null
    const values = channels
        .slice(0, 3)
        .map((channel) =>
            Math.round(
                Math.max(
                    0,
                    Math.min(
                        255,
                        channel.endsWith("%")
                            ? (parseFloat(channel) * 255) / 100
                            : parseFloat(channel)
                    )
                )
            )
        )
    // Alpha is controlled separately by highlightOpacity for consistent filters.
    return [values[0], values[1], values[2]]
}

/** Resolve Framer tokens in the component's inherited CSS context, never by discarding their fallback wrapper. */
function orbitMaskHighlightRGB(
    value?: string,
    root?: HTMLElement
): [number, number, number] {
    const input = typeof value === "string" ? value.trim() : "",
        fallback: [number, number, number] = [248, 214, 139]
    const numeric = orbitNumericHighlightRGB(input)
    if (numeric) return numeric
    const owner = root?.ownerDocument
    if (!input || !root || !owner) return fallback
    let probe: HTMLSpanElement | null = null,
        surface: HTMLCanvasElement | null = null
    try {
        probe = owner.createElement("span")
        probe.setAttribute("aria-hidden", "true")
        probe.style.cssText =
            "display:none!important;position:absolute!important;pointer-events:none!important"
        // Custom properties resolve inherited tokens and nested var() fallbacks.
        // An unresolved token also gets the explicit default below, rather than
        // accidentally inheriting the webpage's text colour.
        probe.style.setProperty("--admiral-highlight-probe-color", input)
        probe.style.setProperty(
            "background-color",
            "var(--admiral-highlight-probe-color, #f8d68b)",
            "important"
        )
        root.appendChild(probe)
        const resolved = (
            owner.defaultView?.getComputedStyle(probe) ??
            getComputedStyle(probe)
        ).backgroundColor
        const direct = orbitNumericHighlightRGB(resolved)
        if (
            direct &&
            !/^rgba?\(\s*0[\s,]+0[\s,]+0(?:[\s,/]+0(?:\.0+)?\s*)\)$/i.test(
                resolved
            )
        )
            return direct
        // The browser converts supported hsl(), lab(), oklch(), color() and
        // display-p3 values into the overlay's default sRGB canvas colour space.
        surface = owner.createElement("canvas")
        surface.width = surface.height = 1
        const drawing = surface.getContext("2d", { willReadFrequently: true })
        if (!drawing) return fallback
        drawing.fillStyle = "#f8d68b"
        drawing.fillStyle = resolved
        drawing.fillRect(0, 0, 1, 1)
        const pixel = drawing.getImageData(0, 0, 1, 1).data
        return pixel[3] ? [pixel[0], pixel[1], pixel[2]] : fallback
    } catch {
        return fallback
    } finally {
        probe?.remove()
        if (surface) surface.width = surface.height = 0
    }
}

/** The same object-fit:cover crop used by the orbit image, before any scene rotation. */
function orbitMaskCoverRect(
    width: number,
    height: number,
    viewport: OrbitMaskRect,
    focalX = 0.5,
    focalY = 0.5
): OrbitMaskRect {
    const scale = Math.max(viewport.width / width, viewport.height / height)
    const resultWidth = width * scale,
        resultHeight = height * scale
    return {
        x:
            viewport.x +
            (viewport.width - resultWidth) * Math.max(0, Math.min(1, focalX)),
        y:
            viewport.y +
            (viewport.height - resultHeight) * Math.max(0, Math.min(1, focalY)),
        width: resultWidth,
        height: resultHeight,
    }
}

/** Leave time for input and painting during the camera's full-image pixel scans. */
async function processOrbitPixelRows(
    height: number,
    isCurrent: () => boolean,
    processRows: (first: number, end: number) => void
): Promise<boolean> {
    const scheduler = (globalThis as typeof globalThis & {
        scheduler?: { yield?: () => Promise<void> }
    }).scheduler
    let deadline = performance.now() + 4
    for (let first = 0; first < height; first += 8) {
        if (!isCurrent()) return false
        const end = Math.min(height, first + 8)
        processRows(first, end)
        if (end < height && performance.now() >= deadline) {
            if (scheduler?.yield) await scheduler.yield()
            else await new Promise<void>(resolve => setTimeout(resolve, 0))
            deadline = performance.now() + 4
        }
    }
    return isCurrent()
}

/** Encode an opaque exact RGB match once. Zero always means background or ambiguous edge. */
async function buildOrbitMaskIndex(
    rgba: ArrayLike<number>,
    width: number,
    height: number,
    palette: readonly {
        id: string
        maskColor: string
        maskColorAliases?: readonly string[]
    }[],
    isCurrent: () => boolean
): Promise<OrbitMaskIndex | null> {
    if (
        !Number.isInteger(width) ||
        !Number.isInteger(height) ||
        width <= 0 ||
        height <= 0 ||
        width * height > 16777216 ||
        rgba.length !== width * height * 4
    )
        throw new Error("Invalid apartment mask dimensions")
    if (!palette.length || palette.length > 254)
        throw new Error("Invalid apartment mask palette")
    const colors = new Map<number, number>(),
        ids = new Set<string>()
    palette.forEach((entry, index) => {
        if (
            !entry.id ||
            ids.has(entry.id) ||
            (entry.maskColorAliases &&
                (!Array.isArray(entry.maskColorAliases) ||
                    entry.maskColorAliases.length > 16))
        )
            throw new Error("Invalid apartment mask colour mapping")
        ids.add(entry.id)
        // Only explicitly audited byte encodings are accepted. This never
        // expands to a nearest-colour search or an arbitrary colour tolerance.
        for (const hex of new Set([
            entry.maskColor,
            ...(entry.maskColorAliases ?? []),
        ])) {
            if (!/^#[0-9a-f]{6}$/i.test(hex))
                throw new Error("Invalid apartment mask colour mapping")
            const rgb = parseInt(hex.slice(1), 16),
                owner = colors.get(rgb)
            if (
                rgb === 0 ||
                rgb === 0xffffff ||
                (owner !== undefined && owner !== index + 1)
            )
                throw new Error("Ambiguous apartment mask colour mapping")
            colors.set(rgb, index + 1)
        }
    })
    const pixels = new Uint8Array(width * height)
    const minX = new Uint32Array(palette.length + 1).fill(width)
    const maxX = new Uint32Array(palette.length + 1)
    const minY = new Uint32Array(palette.length + 1).fill(height)
    const maxY = new Uint32Array(palette.length + 1)
    const complete = await processOrbitPixelRows(height, isCurrent, (first, end) => {
        for (let y = first; y < end; y++) {
            const row = y * width
            for (let x = 0; x < width; x++) {
                const pixel = row + x, channel = pixel * 4
                if (rgba[channel + 3] !== 255) continue
                const id = colors.get((rgba[channel] << 16) |
                    (rgba[channel + 1] << 8) | rgba[channel + 2])
                if (!id) continue
                pixels[pixel] = id
                if (x < minX[id]) minX[id] = x
                if (x > maxX[id]) maxX[id] = x
                if (y < minY[id]) minY[id] = y
                if (y > maxY[id]) maxY[id] = y
            }
        }
    })
    if (!complete) return null
    return { width, height, pixels, minX, maxX, minY, maxY }
}

/** Require a solid pixel and its immediate neighbours; never guess an antialiased border. */
function orbitMaskPixelAt(mask: OrbitMaskIndex, x: number, y: number): number {
    const px = Math.floor(x),
        py = Math.floor(y)
    if (px < 1 || py < 1 || px >= mask.width - 1 || py >= mask.height - 1)
        return 0
    const offset = py * mask.width + px,
        value = mask.pixels[offset]
    return value &&
        mask.pixels[offset - 1] === value &&
        mask.pixels[offset + 1] === value &&
        mask.pixels[offset - mask.width] === value &&
        mask.pixels[offset + mask.width] === value
        ? value
        : 0
}

interface OrbitLightingApartment {
    id: string
    sourceRect: OrbitMaskRect
    parts: { sourceRect: OrbitMaskRect; atlasRect: OrbitMaskRect }[]
}
interface OrbitLightingData {
    frame: number
    width: number
    height: number
    atlasWidth: number
    atlasHeight: number
    pixelScale?: number
    mobile?: OrbitLightingData & { atlasUrl: string }
    apartments: OrbitLightingApartment[]
}

interface OrbitLightingRequest {
    id: string
    opacity: number
    tint?: string
    tintRGB?: [number,number,number]
    sold?: boolean
}

/** Share a decoded atlas and a bounded assembly canvas between individual and filtered lighting. */
function createOrbitApartmentLighting(options: {
    root: HTMLElement
    enabled: boolean
    atlasUrl: string
    dataUrl: string
    frame: number
    repaint: () => void
}) {
    let active = false, destroyed = false, loading = false, failed = false
    let phone = false, selectedAtlasUrl = options.atlasUrl
    let metadata: OrbitLightingData | null = null
    let generation = 0, fadeFrame = 0, fadeStarted = 0, cropId = "", cropKey = ""
    let data: OrbitLightingData | null = null, blob: Blob | null = null
    let atlas: ImageBitmap | HTMLImageElement | null = null
    let crop: HTMLCanvasElement | null = null, request: AbortController | null = null
    let tintPatch: HTMLCanvasElement | null = null
    const apartments = new Map<string, OrbitLightingApartment>()
    const root = options.root
    function diagnostic(key: string, value: string) {
        if (root.dataset[key] !== value) root.dataset[key] = value
    }
    function state(value: string, error = "") {
        diagnostic("orbitLightingState", value)
        diagnostic("orbitLightingError", error)
        diagnostic("orbitLightingDecoded", atlas ? "1" : "0")
        diagnostic("orbitLightingVariant", phone ? "phone" : "desktop")
        diagnostic("orbitLightingBytes", String(atlas ? atlas.width * atlas.height * 4 : 0))
    }
    function clearCrop() {
        if (fadeFrame) cancelAnimationFrame(fadeFrame)
        fadeFrame = 0
        if (crop) crop.width = crop.height = 0
        crop = null
        cropId = cropKey = ""
        diagnostic("orbitLightingApartment", "")
        diagnostic("orbitLightingGroupCount", "0")
        diagnostic("orbitLightingCropBytes", "0")
    }
    function closeImage(image: ImageBitmap | HTMLImageElement | null) {
        if (image && "close" in image) image.close()
        else if (image instanceof HTMLImageElement) image.src = ""
    }
    function release() {
        generation++
        request?.abort()
        request = null
        loading = false
        closeImage(atlas)
        atlas = null
        clearCrop()
        if (tintPatch) tintPatch.width = tintPatch.height = 0
        tintPatch = null
        state("off")
    }
    function parseData(value: unknown): OrbitLightingData {
        const candidate = value as OrbitLightingData
        if (!candidate || candidate.frame !== options.frame ||
            candidate.width !== 1920 || candidate.height !== 1010 ||
            !Number.isInteger(candidate.atlasWidth) || !Number.isInteger(candidate.atlasHeight) ||
            candidate.atlasWidth < 1 || candidate.atlasHeight < 1 ||
            candidate.atlasWidth * candidate.atlasHeight > 4194304 ||
            ![1, 0.5].includes(candidate.pixelScale ?? 1) ||
            !Array.isArray(candidate.apartments) || candidate.apartments.length > 254)
            throw new Error("Invalid apartment lighting metadata")
        const rect = (r: OrbitMaskRect, width: number, height: number) =>
            r && [r.x, r.y, r.width, r.height].every(Number.isInteger) &&
            r.x >= 0 && r.y >= 0 && r.width > 0 && r.height > 0 &&
            r.x + r.width <= width && r.y + r.height <= height
        const seen = new Set<string>()
        let parts = 0
        for (const apartment of candidate.apartments) {
            if (!apartment || typeof apartment.id !== "string" || !apartment.id ||
                seen.has(apartment.id) || !rect(apartment.sourceRect, candidate.width, candidate.height) ||
                !Array.isArray(apartment.parts) || !apartment.parts.length)
                throw new Error("Invalid apartment lighting placement")
            seen.add(apartment.id)
            for (const part of apartment.parts) {
                const s = part?.sourceRect, a = part?.atlasRect, parent = apartment.sourceRect
                if (!rect(s, candidate.width, candidate.height) ||
                    !rect(a, candidate.atlasWidth, candidate.atlasHeight) ||
                    a.width !== Math.max(1, Math.ceil(s.width * (candidate.pixelScale ?? 1))) ||
                    a.height !== Math.max(1, Math.ceil(s.height * (candidate.pixelScale ?? 1))) ||
                    s.x < parent.x || s.y < parent.y ||
                    s.x + s.width > parent.x + parent.width ||
                    s.y + s.height > parent.y + parent.height || ++parts > 4096)
                    throw new Error("Invalid apartment lighting atlas part")
            }
        }
        return candidate
    }
    async function load() {
        if (!active || destroyed || loading || failed || atlas) return
        loading = true
        const token = ++generation, controller = new AbortController()
        request = controller
        const valid = () => !destroyed && active && generation === token
        const timer = setTimeout(() => controller.abort(), 15000)
        state("loading")
        try {
            if (!data) {
                if (!metadata) {
                    const response = await fetch(options.dataUrl, {
                        signal: controller.signal, credentials: "omit", cache: "force-cache",
                    })
                    if (!response.ok) throw new Error("Apartment lighting metadata unavailable")
                    const result = await response.json() as OrbitLightingData
                    if (!valid()) return
                    metadata = result
                }
                const variant = phone ? metadata!.mobile : undefined
                const result = parseData(variant ?? metadata)
                selectedAtlasUrl = variant?.atlasUrl || options.atlasUrl
                data = result
                for (const item of result.apartments) apartments.set(item.id, item)
            }
            if (!blob) {
                const response = await fetch(selectedAtlasUrl, {
                    signal: controller.signal, credentials: "omit", cache: "force-cache",
                })
                if (!response.ok) throw new Error("Apartment lighting image unavailable")
                const result = await response.blob()
                if (!result.size || result.size > 5242880) throw new Error("Invalid apartment lighting image")
                if (!valid()) return
                blob = result
            }
            let decoded: ImageBitmap | HTMLImageElement | null = null
            if (typeof createImageBitmap === "function") {
                try { decoded = await createImageBitmap(blob) } catch { /* Native image fallback below. */ }
            }
            if (!valid()) { closeImage(decoded); return }
            if (!decoded) {
                const image = new Image(), url = URL.createObjectURL(blob)
                image.decoding = "async"
                image.src = url
                try {
                    await image.decode()
                    decoded = image
                } finally { URL.revokeObjectURL(url) }
            }
            if (!valid()) { closeImage(decoded); return }
            if (decoded.width !== data!.atlasWidth || decoded.height !== data!.atlasHeight) {
                closeImage(decoded)
                throw new Error("Apartment lighting atlas dimensions do not match")
            }
            atlas = decoded
            state("ready")
        } catch (reason) {
            if (valid()) {
                failed = true
                state("error", reason instanceof Error ? reason.message : "Apartment lighting unavailable")
            }
        } finally {
            clearTimeout(timer)
            if (generation === token) {
                loading = false
                request = null
                if (!destroyed) options.repaint()
            }
        }
    }
    function sync(view: OrbitApartmentPickerView | null) {
        const wanted = options.enabled && options.atlasUrl && options.dataUrl && !!view &&
            view.checkpoint === Math.round(options.frame / 15) &&
            Number(root.dataset.orbitFrame) === options.frame
        if (!wanted) {
            if (active || atlas || loading || crop) release()
            active = false
            failed = false
            return
        }
        const nextPhone = !!view!.mobile
        if (nextPhone !== phone) {
            release()
            failed = false
            phone = nextPhone
            data = null
            blob = null
            apartments.clear()
        }
        active = true
        if (!atlas && !loading && !failed) void load()
    }
    function tintedPatch(
        image: ImageBitmap | HTMLImageElement,
        part: OrbitMaskRect,
        color: string
    ) {
        if (!tintPatch) {
            tintPatch = document.createElement("canvas")
            tintPatch.width = tintPatch.height = 0
        }
        if (tintPatch.width < part.width) tintPatch.width = part.width
        if (tintPatch.height < part.height) tintPatch.height = part.height
        const context = tintPatch.getContext("2d")
        if (!context) return null
        const { x, y, width, height } = part
        context.globalCompositeOperation = "source-over"
        context.clearRect(0, 0, width, height)
        context.drawImage(image, x, y, width, height, 0, 0, width, height)
        // Change hue while retaining the window detail and restoring the
        // original alpha, including the soft edges around the lighting.
        context.globalCompositeOperation = "color"
        if (context.globalCompositeOperation !== "color") return null
        context.fillStyle = color
        context.fillRect(0, 0, width, height)
        context.globalCompositeOperation = "destination-in"
        context.drawImage(image, x, y, width, height, 0, 0, width, height)
        return tintPatch
    }

    function texture(requests: readonly OrbitLightingRequest[]) {
        // Missing atlas entries retain the ordinary status fill.
        const selected = new Map<string, {
            apartment: OrbitLightingApartment
            opacity: number
            tint?: string
        }>()
        if (active && atlas) for (const request of requests) {
            const apartment = apartments.get(request.id)
            const opacity = Math.max(0, Math.min(1, request.opacity))
            if (apartment && Number.isFinite(opacity) && opacity > 0) {
                const previous = selected.get(request.id)
                if (!previous || opacity > previous.opacity) selected.set(request.id, { apartment, opacity, tint: request.tint })
            }
        }
        if (!active || !atlas || !selected.size) {
            if (crop) clearCrop()
            return null
        }
        const entries = Array.from(selected.values()).sort((a, b) => a.apartment.id.localeCompare(b.apartment.id))
        const ids = entries.map(({ apartment }) => apartment.id), id = ids.join(",")
        const key = entries.map(({ apartment, opacity, tint }) => [apartment.id, opacity.toFixed(3), tint || ""].join(":")).join(",")
        const left = Math.min(...entries.map(({ apartment }) => apartment.sourceRect.x))
        const top = Math.min(...entries.map(({ apartment }) => apartment.sourceRect.y))
        const right = Math.max(...entries.map(({ apartment }) => apartment.sourceRect.x + apartment.sourceRect.width))
        const bottom = Math.max(...entries.map(({ apartment }) => apartment.sourceRect.y + apartment.sourceRect.height))
        const rect = { x: left, y: top, width: right - left, height: bottom - top }
        if (!crop || cropKey !== key) {
            // Keep the current fade when the same set of apartments is redrawn.
            const steadyGroup = cropId === id, previousFade = fadeStarted
            clearCrop()
            crop = document.createElement("canvas")
            crop.width = rect.width
            crop.height = rect.height
            const drawing = crop.getContext("2d")
            if (!drawing) { clearCrop(); return null }
            for (const { apartment, opacity, tint } of entries) {
                drawing.globalAlpha = opacity
                for (const { sourceRect: s, atlasRect: a } of apartment.parts) {
                    const patch = tint ? tintedPatch(atlas, a, tint) : null
                    drawing.drawImage(patch ?? atlas, patch ? 0 : a.x, patch ? 0 : a.y, a.width, a.height,
                        s.x - rect.x, s.y - rect.y, s.width, s.height)
                }
            }
            drawing.globalAlpha = 1
            cropId = id
            cropKey = key
            fadeStarted = steadyGroup ? previousFade
                : window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ? 0 : performance.now()
            diagnostic("orbitLightingApartment", cropId)
            diagnostic("orbitLightingGroupCount", String(ids.length))
            diagnostic("orbitLightingCropBytes", String(crop.width * crop.height * 4))
        }
        const opacity = fadeStarted ? Math.min(1, (performance.now() - fadeStarted) / 140) : 1
        if (opacity < 1 && !fadeFrame) fadeFrame = requestAnimationFrame(() => {
            fadeFrame = 0
            if (!destroyed && active) options.repaint()
        })
        return { canvas: crop!, rect, id: cropKey, ids, opacity }
    }
    state("off")
    return {
        sync, texture,
        retry() { failed = false; if (active) void load() },
        destroy() {
            if (destroyed) return
            destroyed = true
            active = false
            release()
            blob = data = metadata = null
            apartments.clear()
        },
    }
}


/** Compressed masks stay downloaded; at most two compact one-byte ID maps stay decoded. */
/** Keep only the changed window pixels from the current camera's two matched lighting renders. */
function createOrbitSceneLighting(options: {
    root: HTMLElement
    ids: readonly string[]
    enabled: boolean
    repaint: () => void
}) {
    interface WindowPatch {
        samples: Uint32Array
        left: number
        top: number
        right: number
        bottom: number
    }
    const patches = new Map<string, WindowPatch>()
    let activeMask: OrbitMaskIndex | null = null
    let frame = -1, phone = false, width = 0, height = 0
    let request: AbortController | null = null
    let failed = false, destroyed = false
    let currentKey = ""
    let surface: HTMLCanvasElement | null = null
    type Texture = { canvas: HTMLCanvasElement; id: string; ids: string[]; rect: OrbitMaskRect; opacity: number }
    let drawn: Texture | null = null

    function clearTexture() {
        currentKey = ""
        drawn = null
        if (surface) surface.width = surface.height = 0
        surface = null
        options.root.dataset.orbitLightingCropBytes = "0"
        options.root.dataset.orbitLightingApartment = ""
        options.root.dataset.orbitLightingGroupCount = "0"
    }
    function release() {
        request?.abort()
        request = null
        patches.clear()
        clearTexture()
        activeMask = null
        failed = false
        frame = -1
        options.root.dataset.orbitLightingState = "off"
        options.root.dataset.orbitLightingError = ""
        options.root.dataset.orbitLightingDecoded = "0"
        options.root.dataset.orbitLightingBytes = "0"
    }

    async function pixels(folder: "light" | "sold", camera: number, w: number, h: number, signal: AbortSignal) {
        const format = await orbitImageFormat()
        const url = format === "webp" ? orbitWebpFrame(folder, camera) : homepageOrbitV05Asset(folder, camera)
        const response = await fetch(url, {
            signal, credentials: "omit", cache: "force-cache"
        })
        if (!response.ok) throw new Error("Orbit light render unavailable")
        const blob = await response.blob()
        let image: ImageBitmap | HTMLImageElement | undefined
        let canvas: HTMLCanvasElement | undefined
        let objectUrl: string | undefined
        try {
            if (signal.aborted) throw new Error("Cancelled")
            if (typeof createImageBitmap === "function") {
                try { image = await createImageBitmap(blob) } catch { /* Use the image decoder on older Safari. */ }
            }
            if (signal.aborted) throw new Error("Cancelled")
            if (!image) {
                const img = new Image()
                objectUrl = URL.createObjectURL(blob)
                image = img
                img.src = objectUrl
                await img.decode()
            }
            if (signal.aborted) throw new Error("Cancelled")
            if (Math.abs(image.width / image.height - w / h) > .005)
                throw new Error("Orbit light render has a different aspect ratio")
            canvas = document.createElement("canvas")
            canvas.width = w
            canvas.height = h
            const ctx = canvas.getContext("2d", {willReadFrequently:true})
            if (!ctx) throw new Error("Orbit light drawing surface unavailable")
            ctx.drawImage(image, 0, 0, w, h)
            return ctx.getImageData(0, 0, w, h).data
        } finally {
            if (image && "close" in image) image.close()
            else if (image instanceof HTMLImageElement) image.src = ""
            if (objectUrl) URL.revokeObjectURL(objectUrl)
            if (canvas) canvas.width = canvas.height = 0
        }
    }

    async function load() {
        if (!activeMask || request || failed || destroyed) return
        const mask = activeMask
        const camera = frame
        const controller = new AbortController()
        request = controller
        const until = window.setTimeout(() => controller.abort(), 18000)
        options.root.dataset.orbitLightingState = "loading"
        try {
            const w = Math.min(mask.width, phone ? 960 : 1920)
            const h = Math.max(1,Math.round(w * mask.height / mask.width))
            // Sequential reads cap transient decoder memory; network response bytes remain in the browser cache.
            const native = await pixels("light", camera, w, h, controller.signal)
            const red = await pixels("sold", camera, w, h, controller.signal)
            if (controller.signal.aborted || request !== controller) return
            const owner = new Uint8Array(w * h), alpha = new Uint8Array(w * h)
            const count = new Uint32Array(options.ids.length + 1)
            const minX = new Uint16Array(count.length).fill(w), minY = new Uint16Array(count.length).fill(h)
            const maxX = new Uint16Array(count.length), maxY = new Uint16Array(count.length)
            const sampleX = new Uint16Array(w)
            for (let x = 0; x < w; x++) sampleX[x] = Math.min(mask.width - 1, Math.floor((x + .5) * mask.width / w))
            const isCurrent = () => !controller.signal.aborted && request === controller
            const measured = await processOrbitPixelRows(h, isCurrent, (first, end) => {
                for (let y = first; y < end; y++) {
                    const row = Math.min(mask.height - 1, Math.floor((y + .5) * mask.height / h)) * mask.width
                    for (let x = 0; x < w; x++) {
                        const id = mask.pixels[row + sampleX[x]]
                        if (!id) continue
                        const px = y * w + x, c = px * 4
                        // Keep only pixels that gain red chroma, excluding foreground trees and unlit facade.
                        const change = red[c] - native[c] - .65 * (red[c+1] - native[c+1]) - .35 * (red[c+2] - native[c+2])
                        if (change <= 8) continue
                        owner[px] = id
                        alpha[px] = Math.min(255, Math.round((change - 8) * 12))
                        count[id]++
                        minX[id] = Math.min(minX[id],x); minY[id] = Math.min(minY[id],y)
                        maxX[id] = Math.max(maxX[id],x); maxY[id] = Math.max(maxY[id],y)
                    }
                }
            })
            if (!measured || !isCurrent()) throw new Error("Orbit lighting preparation cancelled")
            const packed = Array.from(count, n => new Uint32Array(n * 3))
            const offsets = new Uint32Array(count.length)
            const sampled = await processOrbitPixelRows(h, isCurrent, (first, end) => {
                for (let px = first * w; px < end * w; px++) {
                    const id = owner[px]
                    if (!id) continue
                    const c = px*4, out = offsets[id], dst = packed[id]
                    dst[out] = px
                    dst[out+1] = (native[c]<<24) | (native[c+1]<<16) | (native[c+2]<<8) | alpha[px]
                    dst[out+2] = (red[c]<<24) | (red[c+1]<<16) | (red[c+2]<<8)
                    offsets[id] += 3
                }
            })
            if (!sampled || !isCurrent()) throw new Error("Orbit lighting preparation cancelled")
            let bytes = 0
            count.forEach((n,id) => {
                if (!n || !id) return
                patches.set(options.ids[id-1], { samples:packed[id], left:minX[id], top:minY[id], right:maxX[id]+1, bottom:maxY[id]+1 })
                bytes += packed[id].byteLength
            })
            width = w; height = h
            options.root.dataset.orbitLightingState = "ready"
            options.root.dataset.orbitLightingDecoded = "1"
            options.root.dataset.orbitLightingVariant = phone ? "phone" : "desktop"
            options.root.dataset.orbitLightingBytes = String(bytes)
        } catch (error) {
            if (request === controller && !destroyed) {
                failed = true
                options.root.dataset.orbitLightingState = "error"
                options.root.dataset.orbitLightingError = String(error)
            }
        } finally {
            clearTimeout(until)
            if (request === controller) {
                request = null
                if (!destroyed) options.repaint()
            }
        }
    }

    function sync(view: OrbitApartmentPickerView | null, mask?: OrbitMaskIndex) {
        const next = view && mask && options.enabled ? view.checkpoint * 15 : -1
        const nextPhone = !!view?.mobile
        if (frame === next && (frame < 0 || (mask === activeMask && phone === nextPhone))) return
        release()
        if (next < 0 || !mask || destroyed) return
        frame = next
        phone = nextPhone
        activeMask = mask
        void load()
    }

    function texture(requests: readonly OrbitLightingRequest[]): Texture | null {
        if (!activeMask || !patches.size) return null
        const selected = requests.flatMap(entry => {
            const patch = patches.get(entry.id)
            return patch && entry.opacity > 0 ? [{ entry, patch }] : []
        })
        if (!selected.length) { if (drawn) clearTexture(); return null }
        const key = selected.map(({entry:e}) => [e.id,e.opacity,e.sold,e.tint].join(":")).join(",")
        if (key === currentKey) return drawn
        const left = Math.min(...selected.map(s=>s.patch.left)), top = Math.min(...selected.map(s=>s.patch.top))
        const dx = Math.max(...selected.map(s=>s.patch.right)) - left, dy = Math.max(...selected.map(s=>s.patch.bottom)) - top
        if (!surface) surface = document.createElement("canvas")
        if (surface.width !== dx || surface.height !== dy) { surface.width = dx; surface.height = dy }
        const ctx = surface.getContext("2d")
        if (!ctx) return null
        const img = ctx.createImageData(dx,dy)
        for (const {entry,patch} of selected) {
            const rgb = !entry.sold && entry.tintRGB
            const peak = rgb ? Math.max(1,...rgb) : 1
            const samples = patch.samples
            for (let i = 0; i < samples.length; i+=3) {
                const px=samples[i], c=((Math.floor(px/width)-top)*dx + px%width-left)*4
                const warm=samples[i+1], pixel=entry.sold ? samples[i+2] : warm
                const r=pixel>>>24, g=(pixel>>>16)&255, b=(pixel>>>8)&255
                if (rgb) {
                    const intensity = Math.max(r,g,b)
                    img.data[c] = intensity * (.12 + .88 * rgb[0]/peak)
                    img.data[c+1] = intensity * (.12 + .88 * rgb[1]/peak)
                    img.data[c+2] = intensity * (.12 + .88 * rgb[2]/peak)
                } else {
                    img.data[c]=r; img.data[c+1]=g; img.data[c+2]=b
                }
                img.data[c+3] = (warm & 255) * entry.opacity
            }
        }
        ctx.putImageData(img,0,0)
        const sx = activeMask.width/width, sy = activeMask.height/height
        const ids=selected.map(s=>s.entry.id)
        currentKey=key
        drawn={canvas:surface,id:key,ids,rect:{x:left*sx,y:top*sy,width:dx*sx,height:dy*sy},opacity:1}
        options.root.dataset.orbitLightingApartment=ids.join(",")
        options.root.dataset.orbitLightingGroupCount=String(ids.length)
        options.root.dataset.orbitLightingCropBytes=String(dx*dy*4)
        return drawn
    }
    return {sync,texture,retry(){if(failed){failed=false;void load()}},destroy(){destroyed=true;release()}}
}

function createOrbitApartmentPicker(options: OrbitApartmentPickerOptions) {
    const filteredWindowOpacity = 0.85
    const filteredSolidRatio = 0.5
    const { root, canvas } = options,
        urls = [...options.urls],
        palette = [...options.palette]
    const context = canvas.getContext("2d"),
        cancellation = new AbortController()
    const blobs = new Map<number, Blob>(),
        masks = new Map<number, OrbitMaskIndex>(),
        failures = new Map<number, string>()
    const generations = new Map<number, number>(),
        reload = new Set<number>()
    const fetching = new Set<number>(),
        decoding = new Set<number>(),
        ids = palette.map((entry) => entry.id)
    const indices = new Map(ids.map((id, index) => [id, index + 1]))
    let highlightColor = options.highlightColor,
        highlightRGB = orbitMaskHighlightRGB(highlightColor, root)
    let highlightOpacity = Math.max(
        0,
        Math.min(
            1,
            Number.isFinite(options.highlightOpacity)
                ? options.highlightOpacity!
                : 0.5
        )
    )
    const colorCache = new Map<string, [number, number, number]>()
    let styleBounds: string | null = null
    const controls =
        "nav,header,a,button,input,textarea,select,option,[contenteditable]:not([contenteditable='false']),[role='button'],[role='link'],[role='dialog']:not([data-orbit-fullscreen-surface]),[data-orbit-ignore]"
    let destroyed = false,
        begun = false,
        decodingIndex = -1,
        frame = 0,
        hovered: string | null = null,
        pointerHovered: string | null = null,
        tappedEmphasis: string | null = null,
        currentCheckpoint = -1
    let emphasisContext = ""
    let texture: { canvas: HTMLCanvasElement; x: number; y: number } | null = null,
        textureKey = "",
        paintKey = ""
    const lighting = options.sceneLighting ? createOrbitSceneLighting({
        root, ids, enabled: !!options.lightingEnabled,
        repaint: () => { paintKey = ""; refresh() },
    }) : createOrbitApartmentLighting({
        root,
        enabled: !!options.lightingEnabled,
        atlasUrl: options.lightingAtlasUrl?.trim() || "",
        dataUrl: options.lightingDataUrl?.trim() || "",
        frame: options.lightingFrame ?? 45,
        repaint: () => { paintKey = ""; refresh() },
    })
    let latestPoint: {
        clientX: number
        clientY: number
        target: EventTarget | null
    } | null = null
    let down: {
        id: number
        x: number
        y: number
        checkpoint: number
        mobile: boolean
        dragged: boolean
    } | null = null
    // Native touch owns finger taps. Safari can cancel its pointer stream while
    // Touch Events continue, so completing the same gesture in both would race.
    let touchDown: {
        id: number
        x: number
        y: number
        checkpoint: number
        dragged: boolean
    } | null = null
    let diagnostics: OrbitApartmentPickerSnapshot = {
        state: "off",
        checkpoint: -1,
        cached: 0,
        downloaded: 0,
        hovered: null,
        highlighted: [],
        error: null,
    }

    function setDiagnostic(name: string, value: string) {
        if (root.dataset[name] !== value) root.dataset[name] = value
    }

    function viewReady(view: OrbitApartmentPickerView) {
        return (
            !destroyed &&
            !document.hidden &&
            !!context &&
            view.enabled &&
            !view.moving &&
            !view.suspended &&
            Number.isInteger(view.checkpoint) &&
            view.checkpoint >= 0 &&
            view.checkpoint < urls.length &&
            [
                view.width,
                view.height,
                view.viewport.x,
                view.viewport.y,
                view.viewport.width,
                view.viewport.height,
                view.focalX,
                view.focalY,
            ].every(Number.isFinite) &&
            view.width > 0 &&
            view.height > 0 &&
            view.viewport.width > 0 &&
            view.viewport.height > 0
        )
    }

    function setHover(id: string | null, force = false, pointer = false) {
        if (!id) tappedEmphasis = null
        pointerHovered = pointer ? id : null
        if (hovered === id) {
            if (force) options.onHover(id)
            return
        }
        hovered = id
        setDiagnostic("orbitMaskHovered", id ?? "")
        options.onHover(id)
    }

    function clearTexture() {
        if (texture) texture.canvas.width = texture.canvas.height = 0
        texture = null
        textureKey = ""
    }

    function resolveHighlightStyle(
        color = highlightColor,
        opacity = highlightOpacity
    ) {
        highlightColor = color
        // Resolve inherited status tokens again after explicit style or viewport
        // changes, without probing the DOM on every pointer movement.
        colorCache.clear()
        const rgb = orbitMaskHighlightRGB(color, root),
            alpha = Math.max(
                0,
                Math.min(1, Number.isFinite(opacity) ? opacity : 0.5)
            )
        if (
            rgb.every((channel, index) => channel === highlightRGB[index]) &&
            alpha === highlightOpacity
        )
            return false
        highlightRGB = rgb
        highlightOpacity = alpha
        clearTexture()
        paintKey = ""
        return true
    }

    function setHighlightStyle(
        color = highlightColor,
        opacity = highlightOpacity
    ) {
        if (!destroyed) {
            resolveHighlightStyle(color, opacity)
            refresh()
        }
    }

    function updateDiagnostics(
        view: OrbitApartmentPickerView,
        highlighted: string[] = []
    ) {
        const available = viewReady(view),
            error = available ? (failures.get(view.checkpoint) ?? null) : null
        const state =
            !view.enabled || view.suspended || document.hidden
                ? "off"
                : view.moving
                  ? "moving"
                  : !available
                    ? "off"
                    : error
                      ? "error"
                      : masks.has(view.checkpoint)
                        ? "ready"
                        : "loading"
        diagnostics = {
            state,
            checkpoint: available ? view.checkpoint : -1,
            cached: masks.size,
            downloaded: blobs.size,
            hovered,
            highlighted,
            error,
        }
        setDiagnostic("orbitMaskState", state)
        setDiagnostic("orbitMaskCheckpoint", String(diagnostics.checkpoint))
        setDiagnostic("orbitMaskCached", String(masks.size))
        setDiagnostic("orbitMaskDownloaded", String(blobs.size))
        setDiagnostic("orbitMaskHighlights", highlighted.join(","))
        setDiagnostic("orbitMaskError", error ?? "")
    }

    function touchMask(index: number) {
        const mask = masks.get(index)
        if (mask) {
            masks.delete(index)
            masks.set(index, mask)
        }
        return mask
    }

    function storeMask(index: number, mask: OrbitMaskIndex) {
        masks.delete(index)
        masks.set(index, mask)
        while (masks.size > 2) {
            const old =
                [...masks.keys()].find(
                    (key) => key !== currentCheckpoint && key !== index
                ) ?? [...masks.keys()][0]
            masks.delete(old)
        }
    }

    function priority() {
        const anchor = currentCheckpoint >= 0 ? currentCheckpoint : 0
        return [
            ...new Set([
                anchor,
                (anchor + 1) % urls.length,
                (anchor - 1 + urls.length) % urls.length,
                ...urls.map((_, index) => index),
            ]),
        ]
    }

    async function fetchMask(index: number) {
        fetching.add(index)
        const generation = generations.get(index) ?? 0,
            valid = () =>
                !destroyed && (generations.get(index) ?? 0) === generation
        const controller = new AbortController(),
            abort = () => controller.abort()
        cancellation.signal.addEventListener("abort", abort, { once: true })
        const timer = setTimeout(abort, 15000)
        try {
            const cache = reload.delete(index) ? "reload" : "force-cache"
            const response = await fetch(urls[index], {
                signal: controller.signal,
                credentials: "omit",
                cache,
            })
            if (!response.ok)
                throw new Error(
                    "Mask download failed (" + response.status + ")"
                )
            const blob = await response.blob()
            if (!blob.size || blob.size > 16777216)
                throw new Error("Invalid apartment mask file")
            if (valid()) blobs.set(index, blob)
        } catch (reason) {
            if (valid())
                failures.set(
                    index,
                    reason instanceof Error
                        ? reason.message
                        : "Mask download failed"
                )
        } finally {
            clearTimeout(timer)
            cancellation.signal.removeEventListener("abort", abort)
            fetching.delete(index)
            if (!destroyed) {
                refresh()
                pump()
            }
        }
    }

    async function decodeMask(index: number) {
        decoding.add(index)
        decodingIndex = index
        const generation = generations.get(index) ?? 0,
            valid = () =>
                !destroyed && (generations.get(index) ?? 0) === generation
        let image: ImageBitmap | HTMLImageElement | null = null,
            objectURL = ""
        let surface: HTMLCanvasElement | null = null
        let expired = false
        // Native ImageBitmap work cannot be cancelled; keep its one decode permit
        // until it settles, but stop presenting the view as indefinitely loading.
        const watchdog = setTimeout(() => {
            expired = true
            if (valid()) {
                failures.set(index, "Mask decoding timed out")
                refresh()
            }
        }, 15000)
        try {
            const blob = blobs.get(index)
            if (!blob) return
            if (typeof createImageBitmap === "function") {
                try {
                    image = await createImageBitmap(blob, {
                        premultiplyAlpha: "none",
                        colorSpaceConversion: "none",
                    })
                } catch {
                    /* Native PNG Image decoding is also available in older browsers. */
                }
            }
            if (!valid() || expired) return
            if (!image) {
                const fallback = new Image()
                objectURL = URL.createObjectURL(blob)
                fallback.decoding = "async"
                fallback.src = objectURL
                image = fallback
                await new Promise<void>((resolve, reject) => {
                    const timer = setTimeout(() => {
                        fallback.src = ""
                        reject(new Error("Mask decoding timed out"))
                    }, 12000)
                    const abort = () => {
                        clearTimeout(timer)
                        fallback.src = ""
                        reject(new Error("Mask picker disposed"))
                    }
                    cancellation.signal.addEventListener("abort", abort, {
                        once: true,
                    })
                    const done = () => {
                        clearTimeout(timer)
                        cancellation.signal.removeEventListener("abort", abort)
                    }
                    fallback.decode().then(
                        () => {
                            done()
                            resolve()
                        },
                        (reason) => {
                            done()
                            reject(reason)
                        }
                    )
                })
            }
            if (!valid() || expired) return
            const width = image.width,
                height = image.height
            if (!width || !height || width * height > 16777216)
                throw new Error("Invalid apartment mask dimensions")
            surface = document.createElement("canvas")
            surface.width = width
            surface.height = height
            const drawing = surface.getContext("2d", {
                willReadFrequently: true,
            })
            if (!drawing) throw new Error("Mask decoding canvas is unavailable")
            drawing.drawImage(image, 0, 0)
            const rgba = drawing.getImageData(0, 0, width, height).data
            const isCurrent = () => valid() && !expired && currentCheckpoint === index
            const mask = await buildOrbitMaskIndex(rgba, width, height, palette, isCurrent)
            if (!mask || !isCurrent()) return
            if (!mask.minX.some(x => x < width))
                throw new Error(
                    "Mask colours do not match the apartment palette"
                )
            if (valid() && !expired) storeMask(index, mask)
        } catch (reason) {
            if (valid())
                failures.set(
                    index,
                    reason instanceof Error
                        ? reason.message
                        : "Mask decoding failed"
                )
        } finally {
            clearTimeout(watchdog)
            if (image && "close" in image) image.close()
            else if (image instanceof HTMLImageElement) image.src = ""
            if (objectURL) URL.revokeObjectURL(objectURL)
            if (surface) surface.width = surface.height = 0
            decoding.delete(index)
            decodingIndex = -1
            if (!destroyed) {
                refresh()
                pump()
            }
        }
    }

    function pump() {
        if (destroyed || !begun || !urls.length) return
        for (const index of priority()) {
            if (fetching.size >= 2) break
            if (
                !blobs.has(index) &&
                !fetching.has(index) &&
                !failures.has(index)
            )
                void fetchMask(index)
        }
        if (decodingIndex !== -1) return
        const target = currentCheckpoint
        if (
            target >= 0 &&
            blobs.has(target) &&
            !masks.has(target) &&
            !decoding.has(target) &&
            !failures.has(target)
        )
            void decodeMask(target)
    }

    function resolveStatusColor(color?: string | null) {
        const token = color?.trim()
        if (!token) return highlightRGB
        const cached = colorCache.get(token)
        if (cached) return cached
        const rgb = orbitMaskHighlightRGB(token, root)
        colorCache.set(token, rgb)
        return rgb
    }

    function lightRequest(id: string, filterMatchOnly: boolean, onlyKnownStatuses = false): OrbitLightingRequest | null {
        const color = options.getLightTint?.(id)
        if (color === undefined && onlyKnownStatuses) return null
        const tintRGB = color?.trim() ? resolveStatusColor(color) : undefined
        const tint = tintRGB ? "rgb(" + tintRGB.join(", ") + ")" : undefined
        const sold = options.isSold?.(id)
        const opacity = sold || tint
            ? highlightOpacity * (filterMatchOnly ? filteredSolidRatio : 1)
            : filterMatchOnly ? filteredWindowOpacity : 1
        return { id, opacity, tint, tintRGB, sold }
    }

    function highlightStyles(highlighted: string[], lit: Set<string>, filtered: boolean, emphasis: string | null) {
        return highlighted.flatMap(id => {
            const available = options.getLightTint?.(id) === null
            const filterMatchOnly = filtered && id !== emphasis
            const lift = filterMatchOnly ? 0.08 : 0.16
            const neutral = available && !!options.lightingEnabled
            // Available units keep the same full-footprint lift while their window render loads.
            // A rendered solid status already supplies its colour and must not get another fill.
            if (lit.has(id) && !neutral) return []
            const solidOpacity = highlightOpacity * (filterMatchOnly ? filteredSolidRatio : 1)
            const opacity = neutral ? lift : solidOpacity
            const rgb = neutral ? [255, 255, 255] : resolveStatusColor(options.getHighlightColor?.(id))
            const whiteMix = available && !neutral && opacity > 0 ? Math.min(1, lift / opacity) : 0
            return [{ index: indices.get(id)!, rgb, opacity, whiteMix, rim: !neutral }]
        })
    }

    function makeTexture(
        mask: OrbitMaskIndex,
        styles: ReturnType<typeof highlightStyles>,
        key: string
    ) {
        if (key === textureKey) return texture
        clearTexture()
        textureKey = key
        let left = mask.width, right = -1, top = mask.height, bottom = -1
        const fill = new Uint8ClampedArray(255 * 4)
        const rim = new Uint8ClampedArray(255 * 4)
        for (const style of styles) {
            const id = style.index
            if (style.opacity <= 0 || mask.minX[id] > mask.maxX[id]) continue
            left = Math.min(left, mask.minX[id])
            right = Math.max(right, mask.maxX[id])
            top = Math.min(top, mask.minY[id])
            bottom = Math.max(bottom, mask.maxY[id])
            const offset = id * 4
            for (let k = 0; k < 3; k++) {
                const channel = style.rgb[k] + (255 - style.rgb[k]) * style.whiteMix
                fill[offset + k] = channel
                rim[offset + k] = style.rim ? channel * 0.65 + 255 * 0.35 : channel
            }
            fill[offset + 3] = rim[offset + 3] = Math.round(255 * style.opacity)
        }
        if (right < left || bottom < top) return null
        // A single hover normally touches only a small part of the 1920px ID mask.
        const surface = document.createElement("canvas")
        surface.width = right - left + 1
        surface.height = bottom - top + 1
        const drawing = surface.getContext("2d")
        if (!drawing) return null
        const image = drawing.createImageData(surface.width, surface.height)
        const out = image.data, pixels = mask.pixels
        for (let y = top; y <= bottom; y++) {
            let source = y * mask.width + left
            let dest = (y - top) * surface.width * 4
            for (let x = left; x <= right; x++, source++, dest += 4) {
                const id = pixels[source], color = id * 4
                if (!fill[color + 3]) continue
                const border = x === 0 || x === mask.width - 1 || y === 0 || y === mask.height - 1 ||
                    pixels[source - 1] !== id || pixels[source + 1] !== id ||
                    pixels[source - mask.width] !== id || pixels[source + mask.width] !== id
                const rgba = border ? rim : fill
                out[dest] = rgba[color]
                out[dest + 1] = rgba[color + 1]
                out[dest + 2] = rgba[color + 2]
                out[dest + 3] = rgba[color + 3]
            }
        }
        drawing.putImageData(image, 0, 0)
        texture = { canvas: surface, x: left, y: top }
        return texture
    }

    // This scan runs only after a new mask or crop, never per pointer sample.
    let visibleMask: OrbitMaskIndex | null = null
    let visibleCropKey = "", visibleNoticeKey = ""
    let visibleIds: string[] = []
    function reportVisibleApartments(view: OrbitApartmentPickerView, mask: OrbitMaskIndex) {
        const rect = orbitMaskCoverRect(
            mask.width, mask.height, view.viewport, view.focalX, view.focalY
        )
        const left = Math.max(0, view.viewport.x, rect.x),
            top = Math.max(0, view.viewport.y, rect.y),
            right = Math.min(view.width, view.viewport.x + view.viewport.width, rect.x + rect.width),
            bottom = Math.min(view.height, view.viewport.y + view.viewport.height, rect.y + rect.height)
        const x0 = Math.max(1, Math.ceil((left - rect.x) * mask.width / rect.width)),
            y0 = Math.max(1, Math.ceil((top - rect.y) * mask.height / rect.height)),
            x1 = Math.min(mask.width - 1, Math.floor((right - rect.x) * mask.width / rect.width)),
            y1 = Math.min(mask.height - 1, Math.floor((bottom - rect.y) * mask.height / rect.height))
        const cropKey = [x0, y0, x1, y1].join("|")
        if (mask !== visibleMask || cropKey !== visibleCropKey) {
            const seen = new Uint8Array(ids.length + 1)
            for (let y = y0; y < y1; y++) {
                for (let x = x0; x < x1; x++) {
                    const id = mask.pixels[y * mask.width + x]
                    if (id && !seen[id] && orbitMaskPixelAt(mask, x, y) === id) seen[id] = 1
                }
            }
            visibleIds = ids.filter((_, index) => !!seen[index + 1])
            visibleMask = mask
            visibleCropKey = cropKey
        }
        const noticeKey = view.checkpoint + ":" + visibleIds.join(",")
        if (noticeKey !== visibleNoticeKey) {
            visibleNoticeKey = noticeKey
            options.onVisibleApartments?.(view.checkpoint, visibleIds)
        }
    }

    function refresh() {
        if (destroyed) return
        const view = options.getView(),
            ready = viewReady(view),
            checkpoint = ready ? view.checkpoint : -1
        const bounds = view.width + "|" + view.height
        if (bounds !== styleBounds) {
            if (styleBounds !== null) resolveHighlightStyle()
            styleBounds = bounds
        }
        if (checkpoint !== currentCheckpoint) {
            touchDown = null
            currentCheckpoint = checkpoint
            visibleMask = null
            visibleCropKey = visibleNoticeKey = ""
            setHover(null)
            clearTexture()
            paintKey = ""
        }
        if (ready) {
            begun = true
            pump()
        }
        if (!ready) {
            touchDown = null
            down = null
            latestPoint = null
            setHover(null)
            clearTexture()
        }
        const mask = ready ? touchMask(checkpoint) : undefined
        if (mask) reportVisibleApartments(view, mask)
        const allowed = new Set(options.getAllowedIds()),
            highlighted = mask
                ? [...new Set(options.getHighlightIds())]
                      .filter((id) => allowed.has(id) && indices.has(id))
                      .sort()
                : []
        if (hovered && !allowed.has(hovered)) setHover(null)
        lighting.sync(ready && mask ? view : null, mask)
        const filterActive = !!options.isFilterActive?.()
        // An automatic/default record never acquires touch emphasis. Keep a
        // genuine tap only while its camera, presentation and filters remain.
        const nextEmphasisContext = [checkpoint, view.mobile, view.width, view.height,
            ...Object.values(view.viewport), view.focalX, view.focalY, filterActive,
            filterActive ? root.dataset.orbitFilterCriteria || "" : "",
            filterActive ? highlighted.join(",") : ""].join("|")
        if (nextEmphasisContext !== emphasisContext) {
            tappedEmphasis = null
            emphasisContext = nextEmphasisContext
        }
        if (tappedEmphasis && !allowed.has(tappedEmphasis)) tappedEmphasis = null
        const emphasis = view.mobile ? tappedEmphasis : (pointerHovered || tappedEmphasis)
        const lightId = highlighted.length === 1 ? highlighted[0] : hovered
        const requests: OrbitLightingRequest[] = []
        if (filterActive) {
            for (const id of highlighted) {
                const request = lightRequest(id, id !== emphasis, true)
                if (request) requests.push(request)
            }
        } else if (lightId) {
            const request = lightRequest(lightId, false)
            if (request) requests.push(request)
        }
        const light = lighting.texture(requests)
        const styles = highlightStyles(highlighted, new Set(light?.ids), filterActive, emphasis)
        const textureSignature =
            checkpoint +
            ":" +
            styles
                .map((style) =>
                    [style.index, ...style.rgb, style.opacity, style.whiteMix, style.rim].join(",")
                )
                .join(";")
        const logicalWidth =
            Number.isFinite(view.width) && view.width > 0 ? view.width : 1
        const logicalHeight =
            Number.isFinite(view.height) && view.height > 0 ? view.height : 1
        // A transparent full-window backing can otherwise allocate 32+ MB on
        // a 4K screen. Native masks have no additional detail above this budget.
        const dpr = Math.min(
            window.devicePixelRatio || 1,
            2,
            Math.sqrt((1920 * 1010) / (logicalWidth * logicalHeight))
        )
        const width = Math.max(1, Math.floor(logicalWidth * dpr)),
            height = Math.max(1, Math.floor(logicalHeight * dpr))
        const signature = [
            checkpoint,
            !!mask,
            width,
            height,
            ...Object.values(view.viewport),
            view.focalX,
            view.focalY,
            textureSignature,
            light?.id || "",
            light?.opacity.toFixed(3) || "",
        ].join("|")
        if (signature !== paintKey && context) {
            if (canvas.width !== width || canvas.height !== height) {
                canvas.width = width
                canvas.height = height
            }
            context.clearRect(0, 0, canvas.width, canvas.height)
            const layer = mask
                ? makeTexture(mask, styles, textureSignature)
                : null
            if ((layer || light) && mask) {
                const rect = orbitMaskCoverRect(
                    mask.width,
                    mask.height,
                    view.viewport,
                    view.focalX,
                    view.focalY
                )
                context.save()
                context.scale(width / view.width, height / view.height)
                context.beginPath()
                context.rect(
                    view.viewport.x,
                    view.viewport.y,
                    view.viewport.width,
                    view.viewport.height
                )
                context.clip()
                if (layer) {
                    const scaleX = rect.width / mask.width, scaleY = rect.height / mask.height
                    context.drawImage(layer.canvas, rect.x + layer.x * scaleX, rect.y + layer.y * scaleY,
                        layer.canvas.width * scaleX, layer.canvas.height * scaleY)
                }
                if (light) {
                    context.globalAlpha = light.opacity
                    context.drawImage(light.canvas,
                        rect.x + light.rect.x * rect.width / mask.width,
                        rect.y + light.rect.y * rect.height / mask.height,
                        light.rect.width * rect.width / mask.width,
                        light.rect.height * rect.height / mask.height)
                }
                context.restore()
            }
            paintKey = signature
        }
        updateDiagnostics(view, highlighted)
    }

    function ignored(target: EventTarget | null) {
        let element = target instanceof Element ? target : null
        if (!element) return true
        while (element && element !== root && !element.contains(root)) {
            if (element.matches(controls)) return true
            element = element.parentElement
        }
        return false
    }

    function coveredControl(x: number, y: number) {
        return Array.from(root.querySelectorAll<HTMLElement>(controls)).some(
            (control) => {
                if (
                    (control as HTMLButtonElement).disabled ||
                    control.closest("[inert],[hidden],[aria-hidden='true']")
                )
                    return false
                const style = getComputedStyle(control)
                // The shared card keeps a full-window idle wrapper mounted with
                // pointer-events:none. Only a hit-testable control should obscure
                // the facade; an explicitly interactive child is checked itself.
                if (style.pointerEvents === "none") return false
                for (
                    let element: HTMLElement | null = control;
                    element;
                    element = element.parentElement
                ) {
                    const css =
                        element === control ? style : getComputedStyle(element)
                    if (
                        css.display === "none" ||
                        css.visibility === "hidden" ||
                        css.visibility === "collapse" ||
                        Number(css.opacity) === 0
                    )
                        return false
                    if (element === root) break
                }
                const bounds = control.getBoundingClientRect()
                return (
                    bounds.width > 0 &&
                    bounds.height > 0 &&
                    x >= bounds.left &&
                    x <= bounds.right &&
                    y >= bounds.top &&
                    y <= bounds.bottom
                )
            }
        )
    }

    function hit(clientX: number, clientY: number, target: EventTarget | null) {
        const view = options.getView()
        if (
            !viewReady(view) ||
            ignored(target) ||
            coveredControl(clientX, clientY)
        )
            return null
        const mask = masks.get(view.checkpoint),
            point = options.inputPoint(clientX, clientY),
            viewport = view.viewport
        if (
            !mask ||
            !Number.isFinite(point.x) ||
            !Number.isFinite(point.y) ||
            point.x < viewport.x ||
            point.y < viewport.y ||
            point.x >= viewport.x + viewport.width ||
            point.y >= viewport.y + viewport.height
        )
            return null
        const rect = orbitMaskCoverRect(
            mask.width,
            mask.height,
            viewport,
            view.focalX,
            view.focalY
        )
        const index = orbitMaskPixelAt(
            mask,
            ((point.x - rect.x) * mask.width) / rect.width,
            ((point.y - rect.y) * mask.height) / rect.height
        )
        const id = index ? ids[index - 1] : null
        return id && options.getAllowedIds().includes(id) ? id : null
    }

    function processHover() {
        frame = 0
        if (!latestPoint || destroyed) return
        const point = latestPoint
        latestPoint = null
        const id = hit(point.clientX, point.clientY, point.target)
        // Lifecycle clears can be intentionally ignored by the parent while a
        // detail card is open. Explicit background input still clears that
        // parent's restored highlight after the card has closed.
        setHover(id, id === null, true)
        refresh()
    }

    function onPointerMove(event: PointerEvent) {
        if (touchDown) return
        if (
            down &&
            event.pointerId === down.id &&
            Math.hypot(event.clientX - down.x, event.clientY - down.y) > 6
        )
            down.dragged = true
        if (
            event.pointerType === "touch" ||
            options.getView().mobile ||
            down?.dragged ||
            event.buttons
        )
            return
        latestPoint = {
            clientX: event.clientX,
            clientY: event.clientY,
            target: event.target,
        }
        if (!frame) frame = requestAnimationFrame(processHover)
    }

    function onPointerDown(event: PointerEvent) {
        // Retain pointer-only touch hardware; a native touchstart takes over
        // and clears this pending press before either stream can complete it.
        if (touchDown) return
        if (!event.isPrimary || event.button !== 0 || event.defaultPrevented) {
            down = null
            return
        }
        const view = options.getView()
        if (
            !viewReady(view) ||
            ignored(event.target) ||
            coveredControl(event.clientX, event.clientY)
        )
            return
        const point = options.inputPoint(event.clientX, event.clientY),
            viewport = view.viewport
        if (
            point.x < viewport.x ||
            point.y < viewport.y ||
            point.x >= viewport.x + viewport.width ||
            point.y >= viewport.y + viewport.height
        )
            return
        down = {
            id: event.pointerId,
            x: event.clientX,
            y: event.clientY,
            checkpoint: view.checkpoint,
            mobile: view.mobile || event.pointerType === "touch",
            dragged: false,
        }
    }

    function onPointerUp(event: PointerEvent) {
        if (!down || down.id !== event.pointerId) return
        const press = down
        down = null
        if (
            press.dragged ||
            Math.hypot(event.clientX - press.x, event.clientY - press.y) > 6 ||
            options.getView().checkpoint !== press.checkpoint ||
            event.defaultPrevented
        )
            return
        const id = hit(event.clientX, event.clientY, event.target)
        if (press.mobile) tappedEmphasis = id
        setHover(id, id === null, !press.mobile)
        refresh()
        if (id && !press.mobile) options.onPick(id)
    }

    function onPointerCancel() {
        down = null
        latestPoint = null
    }
    function onPointerOut(event: PointerEvent) {
        // Finger lift emits pointerout on Safari too; it is not a mouse leaving
        // the viewer, including on an iPad using the desktop layout.
        if (event.pointerType !== "touch" && !touchDown && !event.relatedTarget && !options.getView().mobile) {
            setHover(null)
            refresh()
        }
    }
    function onTouchStart(event: TouchEvent) {
        touchDown = null
        down = null
        latestPoint = null
        if (event.touches.length !== 1 || event.defaultPrevented) return
        const touch = event.touches[0], view = options.getView()
        if (!viewReady(view) || ignored(event.target) ||
            coveredControl(touch.clientX, touch.clientY)) return
        const point = options.inputPoint(touch.clientX, touch.clientY), viewport = view.viewport
        if (!Number.isFinite(point.x) || !Number.isFinite(point.y) ||
            point.x < viewport.x || point.y < viewport.y ||
            point.x >= viewport.x + viewport.width ||
            point.y >= viewport.y + viewport.height) return
        touchDown = {
            id: touch.identifier, x: point.x, y: point.y,
            checkpoint: view.checkpoint, dragged: false,
        }
    }

    function touchMoved(touch: Touch) {
        if (!touchDown) return
        const point = options.inputPoint(touch.clientX, touch.clientY)
        if (!Number.isFinite(point.x) || !Number.isFinite(point.y) ||
            Math.max(Math.abs(point.x - touchDown.x), Math.abs(point.y - touchDown.y)) >= ORBIT_TOUCH_GESTURE_THRESHOLD)
            touchDown.dragged = true
    }

    function onTouchMove(event: TouchEvent) {
        if (!touchDown) return
        if (event.touches.length !== 1 || event.touches[0].identifier !== touchDown.id) {
            touchDown = null
            return
        }
        touchMoved(event.touches[0])
    }

    function onTouchEnd(event: TouchEvent) {
        if (!touchDown) return
        const touch = Array.from(event.changedTouches).find(value => value.identifier === touchDown!.id)
        if (event.touches.length || !touch) {
            touchDown = null
            return
        }
        touchMoved(touch)
        const press = touchDown
        touchDown = null
        if (press.dragged || options.getView().checkpoint !== press.checkpoint || event.defaultPrevented) return
        const id = hit(touch.clientX, touch.clientY, event.target)
        tappedEmphasis = id
        // Touch selects and updates orbitdata; Adatlap alone opens the card.
        setHover(id, id === null, false)
        refresh()
    }

    function onTouchCancel() {
        touchDown = null
        latestPoint = null
    }

    function onVisibility() {
        if (document.hidden) {
            onPointerCancel()
            onTouchCancel()
        }
        refresh()
    }
    function onResize() {
        down = touchDown = null
        resolveHighlightStyle()
        styleBounds = null
        refresh()
    }

    window.addEventListener("pointermove", onPointerMove, {
        passive: true,
        capture: true,
    })
    window.addEventListener("pointerdown", onPointerDown, {
        passive: true,
        capture: true,
    })
    window.addEventListener("pointerup", onPointerUp, {
        passive: true,
        capture: true,
    })
    window.addEventListener("pointercancel", onPointerCancel, {
        passive: true,
        capture: true,
    })
    window.addEventListener("pointerout", onPointerOut, {
        passive: true,
        capture: true,
    })
    window.addEventListener("touchstart", onTouchStart, { passive: true, capture: true })
    window.addEventListener("touchmove", onTouchMove, { passive: true, capture: true })
    window.addEventListener("touchend", onTouchEnd, { passive: true, capture: true })
    window.addEventListener("touchcancel", onTouchCancel, { passive: true, capture: true })
    window.addEventListener("resize", onResize, { passive: true })
    document.addEventListener("visibilitychange", onVisibility)
    refresh()
    return {
        refresh,
        setHighlightStyle,
        retry(checkpoint?: number) {
            if (destroyed) return
            lighting.retry()
            const failed =
                checkpoint === undefined
                    ? [...failures.keys()]
                    : failures.has(checkpoint)
                      ? [checkpoint]
                      : []
            for (const index of failed) {
                // A corrected file must replace corrupt cached bytes. Version
                // guards also discard an old native decode that finishes late.
                generations.set(index, (generations.get(index) ?? 0) + 1)
                blobs.delete(index)
                masks.delete(index)
                failures.delete(index)
                reload.add(index)
                if (index === currentCheckpoint) {
                    setHover(null)
                    clearTexture()
                    paintKey = ""
                }
            }
            refresh()
            pump()
        },
        snapshot: () => ({
            ...diagnostics,
            highlighted: [...diagnostics.highlighted],
        }),
        destroy() {
            if (destroyed) return
            destroyed = true
            cancellation.abort()
            if (frame) cancelAnimationFrame(frame)
            window.removeEventListener("pointermove", onPointerMove, true)
            window.removeEventListener("pointerdown", onPointerDown, true)
            window.removeEventListener("pointerup", onPointerUp, true)
            window.removeEventListener("pointercancel", onPointerCancel, true)
            window.removeEventListener("pointerout", onPointerOut, true)
            window.removeEventListener("touchstart", onTouchStart, true)
            window.removeEventListener("touchmove", onTouchMove, true)
            window.removeEventListener("touchend", onTouchEnd, true)
            window.removeEventListener("touchcancel", onTouchCancel, true)
            window.removeEventListener("resize", onResize)
            document.removeEventListener("visibilitychange", onVisibility)
            touchDown = null
            down = latestPoint = null
            lighting.destroy()
            clearTexture()
            colorCache.clear()
            masks.clear()
            visibleMask = null
            visibleIds = []
            blobs.clear()
            failures.clear()
            generations.clear()
            reload.clear()
            context?.clearRect(0, 0, canvas.width, canvas.height)
            setHover(null)
            setDiagnostic("orbitMaskState", "off")
            setDiagnostic("orbitMaskCached", "0")
            setDiagnostic("orbitMaskDownloaded", "0")
            setDiagnostic("orbitMaskHighlights", "")
        },
    }
}
