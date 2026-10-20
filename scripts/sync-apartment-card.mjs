import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Snapshot the existing list-view card; never modify its source project.
const args = process.argv.slice(2);
const sourceIndex = args.indexOf('--source');
if (sourceIndex < 0 || !args[sourceIndex + 1]) throw new Error('Usage: node scripts/sync-apartment-card.mjs --source <apartment-list project folder>');
const source = path.resolve(args[sourceIndex + 1]);
const target = fileURLToPath(new URL('../src/shared/apartment-card/', import.meta.url));
const originals = Object.fromEntries(await Promise.all(['app.js', 'styles.css', 'index.html'].map(async name => [name, await readFile(path.join(source, 'site', name), 'utf8')])));
const sha = value => createHash('sha256').update(value).digest('hex');
const replaceOnce = (input, before, after, label) => {
    const count = input.split(before).length - 1;
    if (count !== 1) throw new Error(`Apartment-card source changed at ${label}: expected one anchor, found ${count}. Review the adapter before updating.`);
    return input.replace(before, after);
};
const body = originals['index.html'].match(/<body>([\s\S]*?)<script type="module"/);
if (!body) throw new Error('Apartment-card HTML shell was not found.');
const shell = body[1].replace(/\r\n/g, '\n').trimEnd() + '\n';
if (!shell.includes('id="detail-dialog"') || !shell.includes('id="media-dialog"')) throw new Error('The expected native detail dialogs are missing.');
let runtime = originals['app.js'].replace(/\r\n/g, '\n');
runtime = replaceOnce(runtime, "if (!window.ADMIRAL_MANUAL_MOUNT) mountApartmentList(document, window.ADMIRAL_CONFIG || {});", '', 'manual mount');
runtime = replaceOnce(runtime, 'export function mountApartmentList(root = document, config = {}) {', 'function mountOrbitApartmentCardRuntime(root = document, config = {}) {', 'runtime name');
runtime = runtime.replaceAll('ensureAdmiralFont', 'ensureOrbitApartmentCardFont');
runtime = replaceOnce(runtime, 'let apartments = [], data, selected = new Set(), favorites = new Set(), toastTimer, mediaView=null, mediaSequence=0, rangeDrag=null;', 'let apartments = [], data, selected = new Set(), favorites = new Set(), toastTimer, mediaView=null, mediaSequence=0, rangeDrag=null;\nlet requestedApartmentId=typeof config.apartment===\'string\'?config.apartment:null, cardOpen=false;', 'selection state');
runtime = replaceOnce(runtime, 'function render() {', "function render() {\n  if(config.detailOnly){$('results').replaceChildren();return;}", 'prevent hidden list thumbnails');
runtime = replaceOnce(runtime, 'function syncModalState() {', "function syncModalState() {\n  const nextCardOpen=dialogs.some(dialog=>dialog.open);\n  if(nextCardOpen!==cardOpen){cardOpen=nextCardOpen;config.onOpenChange?.(cardOpen);}", 'modal state bridge');
runtime = replaceOnce(runtime, "async function load() {\n  $('results')", "async function load() {\n  config.onState?.('loading','');\n  $('results')", 'loading bridge');
runtime = replaceOnce(runtime, "    const id=config.apartment||(useUrl?new URL(location.href).searchParams.get('apartment'):null);\n    if(id&&byId(id))detail(id);", "    config.onState?.('ready','');\n    config.onReady?.(controller);\n    const id=requestedApartmentId||(useUrl?new URL(location.href).searchParams.get('apartment'):null);\n    if(id&&byId(id))detail(id);\n    else if(id)config.onState?.('error','A kiválasztott lakás nem található.');", 'ready bridge');
runtime = replaceOnce(runtime, "    $('retry').addEventListener('click',load); resizeEmbed();", "    $('retry').addEventListener('click',load); resizeEmbed();\n    config.onState?.('error','Nem sikerült betölteni a lakás adatait. Próbálja újra.');", 'error bridge');
runtime = replaceOnce(runtime, "load();\nreturn () => {lifecycle.abort();observer.disconnect();detailResize?.disconnect();clearTimeout(toastTimer);for(const d of [...dialogs].reverse()){if(d.open)d.close();modalRegistry.delete(d);}for(const url of downloadUrls)URL.revokeObjectURL(url);downloadUrls.clear();mediaView=null;syncModalState();};", `const controller={
  open(id){
    requestedApartmentId=typeof id==='string'?id:null;
    if(!requestedApartmentId)return;
    if(data){
      if(byId(requestedApartmentId)){config.onState?.('ready','');detail(requestedApartmentId);}
      else config.onState?.('error','A kiválasztott lakás nem található.');
    }
  },
  close(){requestedApartmentId=null;for(const dialog of [...dialogs].reverse())closeDialog(dialog);},
  retry(){return load();},
  dispose(){lifecycle.abort();observer.disconnect();detailResize?.disconnect();clearTimeout(toastTimer);for(const d of [...dialogs].reverse()){if(d.open)d.close();modalRegistry.delete(d);}for(const url of downloadUrls)URL.revokeObjectURL(url);downloadUrls.clear();mediaView=null;syncModalState();}
};
load();
return controller;`, 'controller lifecycle');
runtime = runtime.trimEnd() + '\n';
const manifest = {
    schemaVersion: '1.0',
    sourceProject: 'AdmiralApartmentList',
    description: 'Exact list-view dialog UI with an adapter for lazy orbit opening. No apartment data is embedded.',
    originals: Object.fromEntries(Object.entries(originals).map(([name, content]) => [name, { sha256: sha(content), bytes: Buffer.byteLength(content) }])),
    adapted: { 'app.js': { sha256: sha(runtime), bytes: Buffer.byteLength(runtime) }, 'styles.css': { sha256: sha(originals['styles.css']) }, 'shell.html': { sha256: sha(shell) } },
    adapter: { version: 1, changes: ['manual mount only', 'runtime and font-loader names', 'queued apartment selection', 'skip list rendering', 'dialog lifecycle bridge', 'loading and retry bridge', 'controller lifecycle'] },
};
await mkdir(target, { recursive: true });
await Promise.all([
    writeFile(path.join(target, 'app.js'), runtime),
    writeFile(path.join(target, 'styles.css'), originals['styles.css']),
    writeFile(path.join(target, 'shell.html'), shell),
    writeFile(path.join(target, 'source.json'), JSON.stringify(manifest, null, 2) + '\n'),
]);
console.log(JSON.stringify({ target: 'src/shared/apartment-card/', runtimeBytes: Buffer.byteLength(runtime), stylesBytes: Buffer.byteLength(originals['styles.css']), sourceAppSha256: sha(originals['app.js']) }));
