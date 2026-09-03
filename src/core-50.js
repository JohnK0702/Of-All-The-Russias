/* Fifty-question campaign spine.

   The old seventy-slot chronology is still the source archive: branch modules can continue to use
   the historical question ids they were written against.  The playable campaign now selects the
   fifty decisions that actually move the reign, keeping the dense 1914 crisis intact and cutting
   the connective tissue that was making choices feel less consequential.

   Historical ids are deliberately NOT renumbered.  They are story keys, not the number shown to
   the player. */

const OATR_CORE_50_IDS = [
  // 1905–1907: revolution, war, constitution, Stolypin's opening
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15, 16, 17, 19,

  // 1908–1911: the wager on reform and the men who may or may not survive it
  22, 23, 24, 26, 32, 33, 34, 35, 36,

  // 1912–1913: Lena, Rasputin, the Balkans, the dynasty, the police, alignment
  39, 41, 42, 43, 45, 47, 52, 54, 55,

  // 1914: keep the whole fuse.  Once Sarajevo happens the player gets every turn of the screw.
  56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70
];

const oatrSkeletonByHistoricalId = new Map(OATR_SKELETONS.map(q => [q.id, q]));
const oatrCoreSkeletons = OATR_CORE_50_IDS.map(id => oatrSkeletonByHistoricalId.get(id)).filter(Boolean);
OATR_SKELETONS.splice(0, OATR_SKELETONS.length, ...oatrCoreSkeletons);
OATR_SKELETONS.forEach((q, index) => { q.coreNumber = index + 1; });

const OATR_CORE_TOTAL = OATR_SKELETONS.length;

/* The seventy-question save used positional indexes.  Migrate it once so an old index cannot land
   on a completely different historical event after the trim. */
if (typeof localStorage !== 'undefined') {
  const migrationKey = 'oatr-core-50-migrated-v1';
  if (!localStorage.getItem(migrationKey)) {
    localStorage.removeItem('oatr-campaign-v4');
    localStorage.setItem(migrationKey, '1');
  }
}

function oatrRefreshCore50Ui() {
  if (typeof document === 'undefined') return;
  const folio = document.querySelector('.folio');
  if (folio) {
    const number = folio.querySelector('strong');
    const total = folio.querySelector(':scope > span');
    const q = OATR_SKELETONS[typeof state !== 'undefined' ? state.index : 0];
    const desiredNumber = q ? String(q.coreNumber || ((typeof state !== 'undefined' ? state.index : 0) + 1)).padStart(2, '0') : null;
    const desiredTotal = `OF ${OATR_CORE_TOTAL}`;
    if (number && desiredNumber && number.textContent !== desiredNumber) number.textContent = desiredNumber;
    if (total && total.textContent !== desiredTotal) total.textContent = desiredTotal;
  }

  const bar = document.querySelector('.campaign-progress > span');
  if (bar && typeof state !== 'undefined') {
    const denom = Math.max(1, OATR_CORE_TOTAL - 1);
    const desiredWidth = `${Math.max(0, Math.min(100, Math.round(state.index / denom * 100)))}%`;
    if (bar.style.width !== desiredWidth) bar.style.width = desiredWidth;
  }
}

/* The app renderer still emits the historical question id/70 total.  Keep a tiny observer that
   corrects those display-only values, but only mutate when the value actually differs.  The old
   implementation rewrote textContent on every observer callback, which re-triggered the observer
   indefinitely in real browsers and could lock the live Pages site. */
if (typeof MutationObserver !== 'undefined' && typeof document !== 'undefined' && document.documentElement) {
  let oatrCoreUiQueued = false;
  new MutationObserver(() => {
    if (oatrCoreUiQueued) return;
    oatrCoreUiQueued = true;
    Promise.resolve().then(() => {
      oatrCoreUiQueued = false;
      oatrRefreshCore50Ui();
    });
  }).observe(document.documentElement, { childList: true, subtree: true });
}
