import http from "node:http";
import {createReadStream} from "node:fs";
import {stat} from "node:fs/promises";
import {fileURLToPath} from "node:url";
import path from "node:path";
const root=path.resolve(fileURLToPath(new URL("../",import.meta.url)));
const args=process.argv.slice(2);
const port=Number(args[args.indexOf("--port")+1]||4173);
const host="127.0.0.1";
const types={".html":"text/html; charset=utf-8",".css":"text/css; charset=utf-8",".js":"text/javascript; charset=utf-8",".json":"application/json; charset=utf-8",".mp4":"video/mp4",".webp":"image/webp",".jpg":"image/jpeg",".png":"image/png",".tsx":"text/plain; charset=utf-8"};
const server=http.createServer(async(req,res)=>{
  if(!["GET","HEAD"].includes(req.method)){res.writeHead(405);res.end();return;}
  try{
    let pathname=decodeURIComponent(new URL(req.url,"http://localhost").pathname);
    if(pathname==="/")pathname="/index.html";
    const allowed=["/index.html","/styles.css","/app.js","/data/hero.json","/src/core/hero-player.js","/src/framer/AdmiralHeroVideo.tsx"].includes(pathname)||pathname.startsWith("/assets/");
    const filename=path.resolve(root,"."+pathname);
    if(!allowed||!filename.startsWith(root+path.sep)||pathname.split("/").some(p=>p.startsWith("."))){res.writeHead(404);res.end();return;}
    const info=await stat(filename);
    if(!info.isFile()){res.writeHead(404);res.end();return;}
    const etag='"'+info.size+"-"+Math.trunc(info.mtimeMs)+'"';
    const headers={"Content-Type":types[path.extname(filename)]||"application/octet-stream","Accept-Ranges":"bytes","Cache-Control":"no-cache","ETag":etag,"X-Content-Type-Options":"nosniff"};
    if(req.headers["if-none-match"]===etag&&!req.headers.range){res.writeHead(304,headers);res.end();return;}
    let start=0,end=info.size-1,status=200;
    if(req.headers.range){
      const match=/^bytes=(\d*)-(\d*)$/.exec(req.headers.range);
      if(!match||(!match[1]&&!match[2])){res.writeHead(416,{"Content-Range":"bytes */"+info.size});res.end();return;}
      if(!match[1])start=Math.max(0,info.size-Number(match[2]));
      else {start=Number(match[1]);if(match[2])end=Math.min(end,Number(match[2]));}
      if(start>end||start<0||start>=info.size){res.writeHead(416,{"Content-Range":"bytes */"+info.size});res.end();return;}
      status=206;headers["Content-Range"]="bytes "+start+"-"+end+"/"+info.size;
    }
    headers["Content-Length"]=String(end-start+1);
    res.writeHead(status,headers);
    if(req.method==="HEAD"){res.end();return;}
    const stream=createReadStream(filename,{start,end});
    stream.on("error",()=>res.destroy());res.on("close",()=>stream.destroy());stream.pipe(res);
  }catch{if(!res.headersSent)res.writeHead(404);res.end();}
});
server.listen(port,host,()=>console.log("Admiral Park preview: http://"+host+":"+port));
server.on("error",error=>{console.error(error.message);process.exitCode=1;});
