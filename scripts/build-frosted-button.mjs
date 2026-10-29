import {readFile, writeFile} from 'node:fs/promises';
import {pathToFileURL} from 'node:url';
import {compileTS} from './tooling.mjs';
import {FROSTED_BUTTON_CSS, FROSTED_BUTTON_DEFAULTS} from '../src/shared/ui/frosted-button.js';

const root = new URL('../', import.meta.url);
export async function buildFrostedButton() {
  const template = await readFile(new URL('src/framer/AdmiralFrostedGlassButton.source.tsx', root), 'utf8');
  if (!template.includes('// @FROSTED_BUTTON_CSS_INSERT')) throw Error('Missing shared frosted button CSS insertion point.');
  const source = template.replace('// @FROSTED_BUTTON_CSS_INSERT', () => 'const FROSTED_BUTTON_DEFAULTS = ' + JSON.stringify(FROSTED_BUTTON_DEFAULTS) + '\nconst FROSTED_BUTTON_CSS = ' + JSON.stringify(FROSTED_BUTTON_CSS)).trimEnd() + '\n';
  compileTS(source, 'AdmiralFrostedGlassButton.tsx');
  await writeFile(new URL('src/framer/AdmiralFrostedGlassButton.tsx', root), source);
  return {file: 'src/framer/AdmiralFrostedGlassButton.tsx', bytes: Buffer.byteLength(source)};
}
if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) console.log(JSON.stringify(await buildFrostedButton()));
