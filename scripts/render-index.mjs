import { readFile, writeFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const template = await readFile(new URL('index.template.html', root), 'utf8');
const baseCss = await readFile(new URL('src/style.css', root), 'utf8');
const darkGuiCss = await readFile(new URL('src/dark-gui.css', root), 'utf8');
const skeletonUiCss = await readFile(new URL('src/skeleton-ui.css', root), 'utf8');
const gameData = await readFile(new URL('src/game-data.js', root), 'utf8');
const engine = await readFile(new URL('src/main.js', root), 'utf8');
const css = `${baseCss}\n\n${darkGuiCss}\n\n${skeletonUiCss}`;
const javascript = `${gameData}\n\n${engine}`;

if (css.includes('</style>') || javascript.includes('</script>')) {
  throw new Error('Inline assets may not contain closing style or script tags.');
}

const html = template
  .replace('<!-- INLINE_STYLE -->', `<style data-static-bundle>\n${css}\n</style>`)
  .replace('<!-- INLINE_SCRIPT -->', `<script data-static-bundle>\n${javascript}\n</script>`);

await writeFile(new URL('index.html', root), html);
console.log('Self-contained index.html generated.');
