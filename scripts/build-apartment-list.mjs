import {readFile,writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {inlineApartmentCardRuntime} from './inline-apartment-card.mjs';
import {compileTS} from './tooling.mjs';

const root=new URL('../',import.meta.url);
const read=path=>readFile(new URL(path,root),'utf8');
export async function buildApartmentList() {
 const [source,js,css,shell,controls]=await Promise.all([
  read('src/framer/AdmiralApartmentList.source.tsx'),read('src/shared/apartment-list/app.js'),
  read('src/shared/apartment-list/styles.css'),read('src/shared/apartment-list/shell.html'),
  read('src/shared/apartment-list/controls.source.tsx'),
 ]);
 if(/detail-dialog|function detailPlan\b|function detailRooms\b/.test(js+shell+css))throw Error('The list must delegate apartment details to the shared card.');
 if(/INITIAL_JSON|"provenance"|originalFileName/.test(source))throw Error('The list must fetch public JSON instead of embedding private source data.');
 const runtime=inlineApartmentCardRuntime(js.replace('export function mountApartmentList','function mountApartmentList'));
 const output=source.replace('// @APARTMENT_LIST_INSERT',()=>`const STYLES = ${JSON.stringify(css)}\nconst SHELL = ${JSON.stringify(shell)}\n\n${runtime}`).replace('// @APARTMENT_LIST_CONTROLS_INSERT',()=>controls.trimEnd()).trimEnd()+'\n';
 compileTS(output,'AdmiralApartmentList.tsx');
 await writeFile(new URL('src/framer/AdmiralApartmentList.tsx',root),output);
 return {file:'src/framer/AdmiralApartmentList.tsx',bytes:Buffer.byteLength(output)};
}
if(process.argv[1]&&fileURLToPath(import.meta.url)===process.argv[1])console.log(JSON.stringify(await buildApartmentList()));
