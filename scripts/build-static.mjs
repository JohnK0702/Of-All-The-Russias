import { copyFile, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import './render-index.mjs';

const outputDirectory = new URL('../dist/', import.meta.url);
const sourceEntry = new URL('../index.html', import.meta.url);

await rm(outputDirectory, { recursive: true, force: true });
await mkdir(outputDirectory, { recursive: true });

const html = await readFile(sourceEntry, 'utf8');
if (!html.includes('<style data-static-bundle>') || !html.includes('<script data-static-bundle>')) {
  throw new Error('index.html must contain the inline static bundle.');
}

await writeFile(new URL('index.html', outputDirectory), html);
await writeFile(new URL('.nojekyll', outputDirectory), '');
await mkdir(new URL('asset/', outputDirectory), { recursive: true });
await copyFile(
  new URL('../asset/imperial-seal.svg', import.meta.url),
  new URL('asset/imperial-seal.svg', outputDirectory)
);

console.log('Static site assembled in dist/.');
