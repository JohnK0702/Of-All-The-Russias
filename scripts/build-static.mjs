import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';

const outputDirectory = new URL('../dist/', import.meta.url);
const sourceDirectory = new URL('../src/', import.meta.url);
const sourceEntry = new URL('../index.html', import.meta.url);

await rm(outputDirectory, { recursive: true, force: true });
await mkdir(outputDirectory, { recursive: true });

const html = await readFile(sourceEntry, 'utf8');
if (!html.includes('src="./src/main.js"')) {
  throw new Error('index.html must use a relative entry path for subdirectory hosting.');
}

await writeFile(new URL('index.html', outputDirectory), html);
await cp(sourceDirectory, new URL('src/', outputDirectory), { recursive: true });
await writeFile(new URL('.nojekyll', outputDirectory), '');

console.log('Static site assembled in dist/.');
