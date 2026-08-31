import { readFile, writeFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const template = await readFile(new URL('index.template.html', root), 'utf8');
const baseCss = await readFile(new URL('src/style.css', root), 'utf8');
const darkGuiCss = await readFile(new URL('src/dark-gui.css', root), 'utf8');
const skeletonUiCss = await readFile(new URL('src/skeleton-ui.css', root), 'utf8');
const sergeiCss = await readFile(new URL('src/sergei-horror.css', root), 'utf8');
const assetPlaceholderCss = await readFile(new URL('src/asset-placeholders.css', root), 'utf8');
const eventArtCss = await readFile(new URL('src/event-art.css', root), 'utf8');
const failRoutesCss = await readFile(new URL('src/fail-routes.css', root), 'utf8');
const gameData = await readFile(new URL('src/game-data.js', root), 'utf8');
const branching = await readFile(new URL('src/branching.js', root), 'utf8');
const detailedEvents = await readFile(new URL('src/detailed-events.js', root), 'utf8');
const engine = await readFile(new URL('src/main.js', root), 'utf8');
const endingPaths = await readFile(new URL('src/ending-paths.js', root), 'utf8');
const detailedAdvisors = await readFile(new URL('src/detailed-advisors.js', root), 'utf8');
const politicalHorror = await readFile(new URL('src/political-horror.js', root), 'utf8');
const sergeiHorror = await readFile(new URL('src/sergei-horror.js', root), 'utf8');
const failRoutes = await readFile(new URL('src/fail-routes.js', root), 'utf8');
const canonPassion = await readFile(new URL('src/canon-passion.js', root), 'utf8');
const canonPassionVoice = await readFile(new URL('src/canon-passion-voice.js', root), 'utf8');
const endingEpilogues = await readFile(new URL('src/ending-epilogues.js', root), 'utf8');
const endingEpiloguesExtra = await readFile(new URL('src/ending-epilogues-extra.js', root), 'utf8');
const eventArt = await readFile(new URL('src/event-art.js', root), 'utf8');
const css = `${baseCss}\n\n${darkGuiCss}\n\n${skeletonUiCss}\n\n${sergeiCss}\n\n${assetPlaceholderCss}\n\n${eventArtCss}\n\n${failRoutesCss}`;
const javascript = `${gameData}\n\n${branching}\n\n${detailedEvents}\n\n${engine}\n\n${endingPaths}\n\n${detailedAdvisors}\n\n${politicalHorror}\n\n${sergeiHorror}\n\n${failRoutes}\n\n${canonPassion}\n\n${canonPassionVoice}\n\n${endingEpilogues}\n\n${endingEpiloguesExtra}\n\n${eventArt}`;

if (css.includes('</style>') || javascript.includes('</script>')) {
  throw new Error('Inline assets may not contain closing style or script tags.');
}

const html = template
  .replace('<!-- INLINE_STYLE -->', `<style data-static-bundle>\n${css}\n</style>`)
  .replace('<!-- INLINE_SCRIPT -->', `<script data-static-bundle>\n${javascript}\n</script>`);

await writeFile(new URL('index.html', root), html);
console.log('Self-contained index.html generated.');
