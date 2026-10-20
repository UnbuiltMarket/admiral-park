import { readFile, writeFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import { compileTS } from './tooling.mjs';
import { inlineApartmentCardRuntime } from './inline-apartment-card.mjs';

const root = new URL('../', import.meta.url);

// This module is the only owner of the detail dialog. The homepage and list
// import it instead of embedding another copy of its markup, CSS and runtime.
export async function buildApartmentCard() {
  const [template, runtime, styles, shell, pdfExport] = await Promise.all([
    'src/framer/OrbitApartmentCard.source.tsx',
    'src/shared/apartment-card/card-runtime.js',
    'src/shared/apartment-card/card.css',
    'src/shared/apartment-card/card-shell.html',
    'src/shared/apartment-card/pdf-export.js',
  ].map(file => readFile(new URL(file, root), 'utf8')));
  const source = '// Shared apartment detail card. Create this Framer code file once.\nimport * as React from "react"\n\n' + template
    .replace('__APARTMENT_CARD_STYLES__', () => JSON.stringify(styles))
    .replace('__APARTMENT_CARD_SHELL__', () => JSON.stringify(shell))
    .replace('// @APARTMENT_CARD_RUNTIME_INSERT', () => inlineApartmentCardRuntime(pdfExport + '\n' + runtime))
    .trimEnd() + '\n\nexport default AdmiralApartmentDetailCard\n';
  compileTS(source, 'AdmiralApartmentDetailCard.tsx');
  await writeFile(new URL('src/framer/AdmiralApartmentDetailCard.tsx', root), source);
  console.log(`Built shared apartment detail card (${Buffer.byteLength(source).toLocaleString('en')} bytes).`);
  return source;
}

if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) await buildApartmentCard();
