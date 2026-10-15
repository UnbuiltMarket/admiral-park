import * as React from "react";
import { addPropertyControls, ControlType, useIsStaticRenderer } from "framer";
// @CORE_INSERT
interface Props {
  videoUrl: string; mobileVideoUrl: string; startFrame: string; endFrame: string;
  overlay: number; focalX: number; focalY: number; triggerDistance: number;
  preloadVideo: boolean; showControls: boolean; style?: React.CSSProperties;
}
/**
 * @framerSupportedLayoutWidth any
 * @framerSupportedLayoutHeight any
 * @framerIntrinsicWidth 1440
 * @framerIntrinsicHeight 900
 */
export default function AdmiralHeroVideo(props: Props) {
  const {videoUrl="",mobileVideoUrl="",startFrame="",endFrame="",overlay=0,
    focalX=50,focalY=50,triggerDistance=18,preloadVideo=true,showControls=true,style} = props;
  const rootRef = React.useRef<HTMLDivElement>(null);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const firstRef = React.useRef<HTMLImageElement>(null);
  const lastRef = React.useRef<HTMLImageElement>(null);
  const playerRef = React.useRef<ReturnType<typeof createHeroPlayer> | null>(null);
  const staticRenderer = useIsStaticRenderer();
  const [state,setState] = React.useState<HeroState>("idle");
  React.useEffect(() => {
    if (staticRenderer || !rootRef.current || !videoRef.current || !firstRef.current || !lastRef.current) return;
    const chosenVideo = mobileVideoUrl && matchMedia("(max-width: 767px)").matches ? mobileVideoUrl : videoUrl;
    const player = createHeroPlayer({root:rootRef.current,video:videoRef.current,
      startImage:firstRef.current,endImage:lastRef.current,videoUrl:chosenVideo,endUrl:endFrame,
      threshold:triggerDistance,preload:preloadVideo,onState:setState});
    playerRef.current = player;
    return () => { player.destroy(); playerRef.current = null; };
  },[staticRenderer,videoUrl,mobileVideoUrl,startFrame,endFrame,triggerDistance,preloadVideo]);
  const mediaStyle: React.CSSProperties = {position:"absolute",inset:0,width:"100%",height:"100%",
    objectFit:"cover",objectPosition:focalX+"% "+focalY+"%",pointerEvents:"none"};
  const label = state==="playing"?"Pause":state==="ended"?"Replay":
    state==="loading"?"Pause loading":state==="paused"?"Resume":
    state==="error"?"Retry":state==="blocked"?"Tap to play":"Play";
  const activate = () => {
    const player = playerRef.current; if (!player) return;
    if (state==="playing" || state==="loading") player.pause();
    else { if (state==="ended") player.reset(); void player.play(); }
  };
  return React.createElement("div",{ref:rootRef,className:"admiral-hero-video",
    style:{position:"relative",width:"100%",height:"100%",overflow:"hidden",background:"#111",...style}},
    React.createElement("style",null,
      ".admiral-hero-video .ap-video,.admiral-hero-video .ap-last{opacity:0;transition:opacity 180ms linear}.admiral-hero-video[data-video-visible=true] .ap-video{opacity:1}.admiral-hero-video[data-end-visible=true] .ap-last{opacity:1}.admiral-hero-video button:focus-visible{outline:2px solid white;outline-offset:4px}@media(prefers-reduced-motion:reduce){.admiral-hero-video .ap-video,.admiral-hero-video .ap-last{transition:none}}"),
    React.createElement("img",{ref:firstRef,src:startFrame||undefined,alt:"",width:1920,height:1013,
      loading:"eager",fetchPriority:"high",decoding:"async",style:mediaStyle}),
    React.createElement("video",{ref:videoRef,className:"ap-video",muted:true,playsInline:true,preload:"none",
      "aria-hidden":true,disablePictureInPicture:true,style:mediaStyle}),
    React.createElement("img",{ref:lastRef,className:"ap-last",alt:"",width:1920,height:1013,
      decoding:"async",style:mediaStyle}),
    overlay>0 && React.createElement("div",{"aria-hidden":true,style:{position:"absolute",inset:0,
      pointerEvents:"none",background:"rgba(0,0,0,"+overlay+")"}}),
    (showControls || state==="blocked" || state==="error") && React.createElement("button",
      {type:"button",onClick:activate,disabled:staticRenderer,"aria-label":label+" hero video",
       style:{position:"absolute",bottom:20,right:20,padding:"9px 14px",color:"white",
        border:"1px solid rgba(255,255,255,.5)",borderRadius:4,background:"rgba(0,0,0,.45)",
        font:"12px Arial,sans-serif",cursor:"pointer"}},label));
}
addPropertyControls(AdmiralHeroVideo,{
  videoUrl:{type:ControlType.String,title:"Video URL",placeholder:"https://…/hero.mp4"},
  mobileVideoUrl:{type:ControlType.String,title:"Mobile video",placeholder:"Optional mobile video URL"},
  startFrame:{type:ControlType.Image,title:"First frame"},
  endFrame:{type:ControlType.Image,title:"Last frame"},
  showControls:{type:ControlType.Boolean,title:"Play controls",defaultValue:true},
  overlay:{type:ControlType.Number,title:"Darken",min:0,max:.8,step:.01,defaultValue:0},
  focalX:{type:ControlType.Number,title:"Focal X",min:0,max:100,step:1,defaultValue:50},
  focalY:{type:ControlType.Number,title:"Focal Y",min:0,max:100,step:1,defaultValue:50},
  triggerDistance:{type:ControlType.Number,title:"Scroll trigger",min:1,max:100,step:1,unit:"px",defaultValue:18},
  preloadVideo:{type:ControlType.Boolean,title:"Warm video",defaultValue:true}
});
