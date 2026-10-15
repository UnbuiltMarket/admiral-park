import {createRequire} from "node:module";
import path from "node:path";
// Optional external node_modules directory for cloud-synced workspaces.
export const requireDev=createRequire(process.env.HERO_DEV_MODULES
  ? path.join(process.env.HERO_DEV_MODULES,"package.json")
  : new URL("../package.json",import.meta.url));
export const ts=requireDev("typescript");
export const inlineCore=source=>source.replace(/^export (?=(?:type|interface|function)\b)/gm,"");
export function compileTS(source,fileName){
  const result=ts.transpileModule(source,{fileName,reportDiagnostics:true,compilerOptions:{
    target:ts.ScriptTarget.ES2020,module:ts.ModuleKind.ESNext,jsx:ts.JsxEmit.React}});
  const errors=(result.diagnostics||[]).filter(d=>d.category===ts.DiagnosticCategory.Error);
  if(errors.length)throw new Error(ts.formatDiagnosticsWithColorAndContext(errors,{
    getCurrentDirectory:()=>process.cwd(),getCanonicalFileName:f=>f,getNewLine:()=>"\n"}));
  return result.outputText;
}
