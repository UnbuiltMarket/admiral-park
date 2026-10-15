import {createHeroPlayer} from "./src/core/hero-player.js";
const $=id=>document.getElementById(id);
const root=$("hero"),video=$("hero-video"),first=$("first-frame"),last=$("last-frame"),panel=$("review-panel");
let player,config,activeVariant;
function openPanel(open){panel.hidden=!open;$("review-fab").setAttribute("aria-expanded",String(open));$(open?"quality":"review-fab").focus();}
$("review-fab").addEventListener("click",()=>openPanel(panel.hidden));
$("review-close").addEventListener("click",()=>openPanel(false));
document.addEventListener("keydown",event=>{if(event.key==="Escape"&&!panel.hidden)openPanel(false);});
$("shade").addEventListener("input",event=>{root.style.setProperty("--shade",String(Number(event.target.value)/100));$("shade-value").value=event.target.value+"%";});
$("focal").addEventListener("input",event=>{root.style.setProperty("--focal-x",event.target.value+"%");$("focal-value").value=event.target.value+"%";});
const ms=value=>value===null?"—":Math.round(value)+" ms";
function renderMetrics(m){
 $("metric-state").textContent=m.state;$("metric-first").textContent=ms(m.firstFrameMs);
 $("metric-poster").textContent=ms(m.posterReadyMs);
 $("metric-frames").textContent=m.totalFrames?m.droppedFrames+" / "+m.totalFrames:"—";
 $("metric-buffer").textContent=m.bufferedSeconds.toFixed(1)+" s";
 $("metric-stalls").textContent=m.stalls+" · "+Math.round(m.stallMs)+" ms";
 $("metric-motion").textContent=m.reducedMotion?"Reduced · manual":"Standard";
}
function renderState(state){
 const labels={idle:"Play",loading:"Pause loading",playing:"Pause",paused:"Resume",ended:"Replay",blocked:"Tap to play",error:"Retry"};
 $("film-toggle").textContent=labels[state];$("film-toggle").setAttribute("aria-label",labels[state]+" the film");
 $("film-message").textContent=state==="blocked"?"Tap Play to start the film.":state==="error"?"The film could not load. The still remains visible.":"";
}
function mount(id){
 player?.destroy();activeVariant=config.variants.find(v=>v.id===id)||config.variants[0];
 $("quality").value=activeVariant.id;last.removeAttribute("src");
 player=createHeroPlayer({root,video,startImage:first,endImage:last,videoUrl:new URL(activeVariant.path,document.baseURI).href,
  endUrl:new URL(config.endFrame,document.baseURI).href,threshold:18,onState:renderState,onMetrics:renderMetrics});
 window.heroReview={getMetrics:()=>player.getMetrics(),getVariant:()=>activeVariant.id};
}
$("film-toggle").addEventListener("click",()=>{
 if(!player)return;if(["playing","loading"].includes(player.getState()))player.pause();
 else{if(player.getState()==="ended")player.reset();void player.play();}
});
$("reset-film").addEventListener("click",()=>player?.reset());
$("replay-film").addEventListener("click",()=>{player?.reset();void player?.play();});
$("quality").addEventListener("change",event=>{mount(event.target.value);const url=new URL(location.href);url.searchParams.set("quality",activeVariant.id);history.replaceState(null,"",url);});
try{new PerformanceObserver(list=>{for(const entry of list.getEntries())$("metric-lcp").textContent=Math.round(entry.startTime)+" ms";}).observe({type:"largest-contentful-paint",buffered:true});}catch{$("metric-lcp").textContent="Unavailable";}
try{
 const response=await fetch("./data/hero.json");if(!response.ok)throw new Error("Manifest "+response.status);
 config=await response.json();mount(new URL(location.href).searchParams.get("quality")||config.defaultVariant);
 if(new URL(location.href).searchParams.has("review"))openPanel(true);
}catch(error){console.error(error);$("film-message").textContent="The film configuration could not load.";}
window.addEventListener("pagehide",()=>player?.pause());
