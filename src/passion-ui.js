/* Final Passion UI skin.
   Keeps the restored original campaign layout while replacing imperial offices with personal identities. */

const OATR_NICHOLAS_PASSION_ICON = 'https://www.studiolum.com/wang/russian/apocryph/010.jpg';
const OATR_ALEXANDRA_PASSION_ICON = 'https://www.orthodoxchristiansupply.com/cdn/shop/products/st-tsarina-alexandra-the-royal-martyr-icons-orthodox-christian-supply_620_403x.jpg?v=1571714875';

renderCanonPassion = function() {
  if (!state.canonPassion) state.canonPassion = { index:0, history:[], complete:false, pending:null };
  const cp = state.canonPassion;
  if (cp.complete || cp.index >= OATR_CANON_PASSION.length) return renderCanonFinalEnding();

  const e = OATR_CANON_PASSION[cp.index];
  const year = yearFromDate(e.date);
  const progress = Math.round(cp.index / OATR_CANON_PASSION.length * 100);
  const [phase, chapter] = oatrPassionPhase(cp.index);
  const alexandraNote = OATR_PASSION_ALEXANDRA_NOTES[cp.index] || OATR_PASSION_ALEXANDRA_NOTES.at(-1);
  const choices = e.choices.map(([label], i) => `<li><button data-canon-choice="${i}"><span>${String.fromCharCode(65+i)}</span><p>${label}</p><b>→</b></button></li>`).join('');

  document.body.dataset.era = 'passion';
  document.body.dataset.year = year;
  document.body.dataset.veil = cp.index >= 7 ? 'high' : 'rising';

  document.querySelector('#app').innerHTML = `
    <div class="page-shell">
      <header>
        <div class="seal" aria-hidden="true"></div>
        <div class="masthead">
          <p class="russian-title">1917–1918 · THE PASSION</p>
          <h1>OF ALL THE RUSSIAS</h1>
          <p class="motto">There shall be no fourth.</p>
        </div>
        <div class="year"><b>${year}</b><span>—</span><small>1918</small><button class="restart-campaign" data-restart-campaign title="Restart the campaign from January 1905">↺ RESTART</button></div>
      </header>
      <nav class="chronology" aria-label="Passion progress">
        <span class="${cp.index <= 3 ? 'active' : ''}">FEBRUARY</span><i></i>
        <span class="${cp.index >= 4 && cp.index <= 6 ? 'active' : ''}">CAPTIVITY</span><i></i>
        <span class="${cp.index >= 7 ? 'active' : ''}">EKATERINBURG</span>
      </nav>
      <div class="campaign-progress"><span style="width:${progress}%"></span></div>
      <main>
        <aside class="folio passion-nicholas-window">
          <img class="passion-identity-image" src="${OATR_NICHOLAS_PASSION_ICON}" alt="Icon of Nicholas Romanov" />
          <p class="passion-role">THE PRISONER</p>
          <h3>NICHOLAS ROMANOV</h3>
          <p class="passion-sinner">A Poor Sinner</p>
          <span class="passion-count">PASSION ${String(cp.index+1).padStart(2,'0')} OF ${OATR_CANON_PASSION.length}</span>
          <div class="vertical-rule"></div>
          <p class="nine-years">THE CROWN<br>IS GONE</p>
        </aside>
        <article>
          <div class="dateline"><span>${e.date}</span><span class="cross">✣</span><span>${e.place}</span></div>
          <p class="kicker">${phase} · ${chapter}</p>
          <h2>${e.title}</h2>
          <section class="dispatch">${e.body.map(p => `<p>${p}</p>`).join('')}</section>
          <blockquote><p>${e.quote}</p><cite>${e.speaker}</cite></blockquote>
          <div class="question"><span>WHAT REMAINS TO YOU?</span></div>
          <ol class="choices">${choices}</ol>
        </article>
        <aside class="dossier passion-alexandra-window">
          <img class="passion-identity-image" src="${OATR_ALEXANDRA_PASSION_ICON}" alt="Tsarina Alexandra, Royal Martyr" />
          <p class="hand">Nicky</p>
          <h3>АЛЕКСАНДРА<br><span>ФЕОДОРОВНА</span></h3>
          <p class="passion-wife-name"><b>Your Wife</b>Alexandra, Daughter of Eve</p>
          <div class="stamp">ЛИЧНОЕ<br><b>PRIVATE</b></div>
          <small>${alexandraNote}</small>
        </aside>
      </main>
      <footer><span>☦</span><p>ORTHODOXY</p><i>◆</i><p>PASSION</p><i>◆</i><p>RUSSIA</p><span>☦</span></footer>
      ${cp.pending ? renderPassionRussiaAdvisor(e, cp.index, cp.pending) : ''}
    </div>`;

  document.querySelectorAll('[data-canon-choice]').forEach(btn => btn.onclick = () => applyCanonPassion(Number(btn.dataset.canonChoice)));
  const continueButton = document.querySelector('[data-canon-continue]');
  if (continueButton) continueButton.onclick = continueCanonPassion;
  const restartButton = document.querySelector('[data-restart-campaign]');
  if (restartButton) restartButton.onclick = resetCampaign;
};

/* canon-passion.js and canon-passion-voice.js may already have rendered during initial load. */
if (state.index >= OATR_SKELETONS.length && (state.canonPassion || oatrCanonEligible())) renderCanonPassion();
