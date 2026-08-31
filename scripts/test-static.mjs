import { access, readFile } from 'node:fs/promises';

const output = new URL('../dist/', import.meta.url);
const html = await readFile(new URL('index.html', output), 'utf8');
const main = await readFile(new URL('src/main.js', output), 'utf8');

for (const file of ['.nojekyll', 'src/main.js', 'src/style.css']) {
  await access(new URL(file, output));
}

if (!html.includes('href="./src/style.css"')) throw new Error('The deployed page does not load its stylesheet.');
if (!html.includes('src="./src/main.js"')) throw new Error('The deployed page does not load its script.');
if (/^\s*import\s/m.test(main)) throw new Error('Deployed JavaScript contains an unbundled import.');

const app = { innerHTML: '' };
globalThis.document = {
  querySelector: selector => selector === '#app' ? app : null,
  querySelectorAll: () => []
};
globalThis.window = { scrollTo() {} };

await import(new URL(`src/main.js?smoke=${Date.now()}`, output));
if (!app.innerHTML.includes('THE THIRD ROME') || !app.innerHTML.includes('WHAT DO YOU DO?')) {
  throw new Error('The application did not render its opening question.');
}

console.log('Static deployment smoke test passed.');
