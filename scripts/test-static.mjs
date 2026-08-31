import { access, readFile } from 'node:fs/promises';

const output = new URL('../dist/', import.meta.url);
const html = await readFile(new URL('index.html', output), 'utf8');
await access(new URL('.nojekyll', output));

if (!html.includes('<style data-static-bundle>')) throw new Error('The deployed page has no inline stylesheet.');
if (!html.includes('<script data-static-bundle>')) throw new Error('The deployed page has no inline script.');
if (/\b(?:src|href)=["']\.\/src\//.test(html)) throw new Error('The deployed page still relies on a source asset URL.');

const scriptMatch = html.match(/<script data-static-bundle>([\s\S]*?)<\/script>/);
if (!scriptMatch) throw new Error('Could not read the inline application script.');
const main = scriptMatch[1];
if (/^\s*import\s/m.test(main)) throw new Error('Deployed JavaScript contains an unbundled import.');

const app = { innerHTML: '' };
globalThis.document = {
  querySelector: selector => selector === '#app' ? app : null,
  querySelectorAll: () => []
};
globalThis.window = { scrollTo() {} };

await import(`data:text/javascript;charset=utf-8,${encodeURIComponent(main)}`);
if (!app.innerHTML.includes('THE THIRD ROME') || !app.innerHTML.includes('WHAT DO YOU DO?')) {
  throw new Error('The application did not render its opening question.');
}

console.log('Static deployment smoke test passed.');
