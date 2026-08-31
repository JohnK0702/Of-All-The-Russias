import { access, readFile } from 'node:fs/promises';
import vm from 'node:vm';

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
const context = {
  document: {
  querySelector: selector => selector === '#app' ? app : null,
  querySelectorAll: () => []
  },
  window: { scrollTo() {} }
};

vm.createContext(context);
vm.runInContext(main, context);
if (!app.innerHTML.includes('OF ALL THE RUSSIAS') || !app.innerHTML.includes('Mene, Mene, Tekel, Upharsin') || !app.innerHTML.includes('WHAT DO YOU DO?')) {
  throw new Error('The application did not render its opening question.');
}
vm.runInContext('apply(0)', context);
if (!app.innerHTML.includes('GRAND DUKE SERGEI ALEXANDROVICH') || !app.innerHTML.includes('17 February 1905') || !app.innerHTML.includes('data-continue')) {
  throw new Error('The first decision did not render Grand Duke Sergei’s advisor sequence.');
}

console.log('Static deployment smoke test passed.');
