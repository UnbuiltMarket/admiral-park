// Build the edited component for a private localhost Safari run before publishing.
const fs = require('node:fs')
const ts = require('./typescript.cjs')
const parts = ['AdmiralPalette', 'AdmiralScrollCue', 'AdmiralApartmentDetailCard', 'HERO_video_no_fullscreen']
const code = parts.map(id => {
    const source = fs.readFileSync(id + '.tsx', 'utf8')
    return [id + '.tsx', ts.transpileModule(source, {compilerOptions: {
        target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.React, module: ts.ModuleKind.CommonJS,
    }}).outputText]
})
const props = JSON.parse(fs.readFileSync('props.json', 'utf8'))
const loader = `const registry={react:React,framer:{useIsStaticRenderer:()=>false,addPropertyControls(){},ControlType:new Proxy({},{get:(_,key)=>key})}};
for(const [id,body] of ${JSON.stringify(code)}){
  const mod={exports:{}};
  new Function('module','exports','require',body)(mod,mod.exports,id=>registry[id]);
  registry['./'+id]=mod.exports;
}
ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(registry['./HERO_video_no_fullscreen.tsx'].default,${JSON.stringify(props)}));`
fs.writeFileSync('candidate.js', loader)
fs.writeFileSync('index.html', '<!doctype html><html lang="hu"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>*{box-sizing:border-box}html,body,#root{width:100%;height:100%;margin:0}</style></head><body><main id="root"></main><script src="/react.js"></script><script src="/react-dom.js"></script><script src="/candidate.js"></script></body></html>')
