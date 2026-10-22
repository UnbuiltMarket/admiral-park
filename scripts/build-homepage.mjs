import { readFile, readdir, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { inlineCore, compileTS } from './tooling.mjs';
import { validateOrbitMaskAssets } from './orbit-mask-assets.mjs';
const root = new URL('../', import.meta.url);
export async function buildHomepage() {
 const masks = await validateOrbitMaskAssets(root);
 const heroFolder = new URL('assets/images/AVIF 30_1920x1010 DESKTOP HERO SEQUENCE/', root);
 const orbitFolder = new URL('assets/ORBIT PICKER/BEAUTY sequence_Desktop/', root);
 const connectionFolder = new URL('assets/images/SEQ_02_V01/', root);
 const heroNames = (await readdir(heroFolder)).filter(name => /^raw sequence\d{2}\.avif$/.test(name)).sort();
 const connectionNames = (await readdir(connectionFolder)).filter(name => /^02 sequence\d+ copy\.avif$/.test(name)).sort((a,b) => a.localeCompare(b, 'en', { numeric: true }));
 const orbitNames = (await readdir(orbitFolder)).filter(name => /^adjusted sequence\d{4} copy\.avif$/.test(name)).sort();
 if (heroNames.length < 2 || connectionNames.length < 2 || orbitNames.length !== 120) throw new Error('Homepage trial requires SEQ_01 and SEQ_02 with at least two frames each, and exactly 120 orbit AVIF frames.');
 const heroHash = createHash('sha256'), connectionHash = createHash('sha256'), orbitHash = createHash('sha256');
 for (const [i, name] of heroNames.entries()) {
  if (name !== `raw sequence${String(i).padStart(2,'0')}.avif`) throw new Error('Missing hero image at index '+i);
  heroHash.update(await readFile(new URL(encodeURIComponent(name),heroFolder)));
 }
 for (const [i, name] of connectionNames.entries()) {
  if (name !== `02 sequence${String(i).padStart(2,'0')} copy.avif`) throw new Error('Missing SEQ_02 connection image at index '+i);
  connectionHash.update(await readFile(new URL(encodeURIComponent(name),connectionFolder)));
 }
 for (const [i, name] of orbitNames.entries()) {
  if (name !== `adjusted sequence${String(i).padStart(4,'0')} copy.avif`) throw new Error('Missing orbit image at index '+i);
  orbitHash.update(await readFile(new URL(encodeURIComponent(name),orbitFolder)));
 }
 const hero = await readFile(new URL('src/core/hero-sequence.ts',root),'utf8');
 const orbit = await readFile(new URL('src/core/orbit-player.ts',root),'utf8');
 const picker = await readFile(new URL('src/core/orbit-apartment-picker.ts',root),'utf8');
 const template = await readFile(new URL('src/framer/AdmiralHomepageTrial.source.tsx',root),'utf8');
 const apartmentDetails = await readFile(new URL('src/framer/ApartmentDetails.source.tsx',root),'utf8');
 const orbitStories = await readFile(new URL('src/framer/OrbitStoryOverlays.source.tsx',root),'utf8');
 const apartmentData = await readFile(new URL('src/framer/OrbitApartmentData.source.tsx',root),'utf8');
 const apartmentFilterLogic = await readFile(new URL('src/core/orbit-apartment-filters.ts',root),'utf8');
 const apartmentFilterBar = await readFile(new URL('src/framer/OrbitApartmentFilters.source.tsx',root),'utf8');
 const apartmentStudio = await readFile(new URL('src/framer/OrbitApartmentStudio.source.tsx',root),'utf8');
 const orbitFullscreen = await readFile(new URL('src/framer/OrbitFullscreen.source.tsx',root),'utf8');
 const source = '// Generated Framer homepage. Requires AdmiralApartmentDetailCard.tsx in the same Framer project.\n'+template
  .replace('__HERO_NAMES__',JSON.stringify(heroNames)).replace('__CONNECTION_NAMES__',JSON.stringify(connectionNames)).replace('__ORBIT_NAMES__',JSON.stringify(orbitNames))
  .replace('__MASK_NAMES__',JSON.stringify(masks.names)).replace('__MASK_VERSION__',masks.version).replace('__MASK_PALETTE__',JSON.stringify(masks.palette))
  .replace('__HERO_VERSION__',heroHash.digest('hex').slice(0,12)).replace('__CONNECTION_VERSION__',connectionHash.digest('hex').slice(0,12)).replace('__ORBIT_VERSION__',orbitHash.digest('hex').slice(0,12))
  .replace('// @ORBIT_STORY_INSERT',orbitStories).replace('// @ORBIT_APARTMENT_DATA_INSERT',apartmentData).replace('// @ORBIT_APARTMENT_FILTERS_INSERT',inlineCore(apartmentFilterLogic)+'\n'+apartmentFilterBar).replace('// @ORBIT_APARTMENT_STUDIO_INSERT',apartmentStudio).replace('// @ORBIT_FULLSCREEN_INSERT',orbitFullscreen).replace('// @APARTMENT_DETAILS_INSERT',apartmentDetails).replace('// @HERO_CORE_INSERT',inlineCore(hero)).replace('// @ORBIT_CORE_INSERT',inlineCore(orbit)).replace('// @ORBIT_PICKER_INSERT',inlineCore(picker)).trimEnd()+'\n';
 compileTS(source,'AdmiralHomepageTrial.tsx');
 await writeFile(new URL('src/framer/AdmiralHomepageTrial.tsx',root),source);
 await writeFile(new URL('src/core/orbit-player.js',root),'// Generated from orbit-player.ts.\n'+compileTS(orbit,'orbit-player.ts'));
 console.log(`Built homepage with shared apartment card: ${heroNames.length} SEQ_01 frames + ${connectionNames.length} SEQ_02 frames + ${orbitNames.length} orbit frames.`);
}
