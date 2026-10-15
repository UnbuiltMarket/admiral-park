import test from "node:test";
import assert from "node:assert/strict";
import {readFile,stat} from "node:fs/promises";
import {stripTypeScriptTypes} from "node:module";
const root=new URL("../",import.meta.url);
test("every selectable video exists and metadata matches its actual size",async()=>{
  const data=JSON.parse(await readFile(new URL("data/hero.json",root),"utf8"));
  assert.ok(data.variants.some(v=>v.id===data.defaultVariant));
  for(const variant of data.variants){
    assert.ok(!variant.path.includes(".."));
    assert.equal((await stat(new URL(variant.path,root))).size,variant.bytes);
  }
  for(const frame of [data.startFrame,data.endFrame])assert.ok((await stat(new URL(frame,root))).size>0);
});
test("Framer component uses the same core as the browser implementation",async()=>{
  const core=await readFile(new URL("src/core/hero-player.ts",root),"utf8");
  const component=await readFile(new URL("src/framer/AdmiralHeroVideo.tsx",root),"utf8");
  assert.ok(component.includes(core),"Run node scripts/build.mjs after changing core");
  assert.doesNotThrow(()=>stripTypeScriptTypes(component,{mode:"strip"}));
});
