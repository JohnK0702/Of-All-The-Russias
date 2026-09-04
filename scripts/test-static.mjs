import { access, readFile } from 'node:fs/promises';
import vm from 'node:vm';

const output = new URL('../dist/', import.meta.url);
const html = await readFile(new URL('index.html', output), 'utf8');
const imperialSeal = await readFile(new URL('asset/imperial-seal.svg', output), 'utf8');
await access(new URL('.nojekyll', output));

if (!html.includes('<style data-static-bundle>')) throw new Error('The deployed page has no inline stylesheet.');
if (!html.includes('<script data-static-bundle>')) throw new Error('The deployed page has no inline script.');
if (/\b(?:src|href)=["']\.\/src\//.test(html)) throw new Error('The deployed page still relies on a source asset URL.');

// Accept the asset with or without a cache-busting query string.
// The source stylesheet intentionally versions this URL so browsers do not retain an old replacement.
if (!/url\(["']\.\/asset\/imperial-seal\.svg(?:\?[^"']*)?["']\)/.test(html)) {
  throw new Error('The deployed page does not reference the imperial seal.');
}
if (!imperialSeal.includes('<svg') || !imperialSeal.includes('</svg>')) throw new Error('The deployed imperial seal is not a complete SVG.');

const scriptMatch = html.match(/<script data-static-bundle>([\s\S]*?)<\/script>/);
if (!scriptMatch) throw new Error('Could not read the inline application script.');
const main = scriptMatch[1];
if (/^\s*import\s/m.test(main)) throw new Error('Deployed JavaScript contains an unbundled import.');
if (main.includes('<!-- INLINE_SCRIPT -->')) {
  throw new Error('Static bundling corrupted JavaScript replacement tokens; src/marginalia.js is not preserved verbatim.');
}
if (!main.includes("const OATR_MARGINALIA = [") || !main.includes("const selectors = '.dispatch p, article > blockquote p';")) {
  throw new Error('The deployed bundle does not contain the current marginalia runtime.');
}

const app = { innerHTML: '' };
const body = { dataset: {} };
const context = {
  document: {
    body,
    querySelector: selector => selector === '#app' ? app : null,
    querySelectorAll: () => []
  },
  window: { scrollTo() {} },
  localStorage: {
    getItem() { return null; },
    setItem() {},
    removeItem() {}
  }
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
