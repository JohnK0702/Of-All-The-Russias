/* Passion UI revamp: restore the original event composition, move both family icons to the right,
   and replace the imperial motto with Zechariah 12:10. Loaded after canon-passion-voice.js. */

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
    <div class="page-shell passion-revamp-shell">
      <header>
        <div class="seal" aria-hidden="true"></div>
        <div class="masthead passion-masthead">
          <p class="russian-title">1917–1918 · THE PASSION</p>
          <h1>OF ALL THE RUSSIAS</h1>
          <p class="motto passion-scripture"><em>They will look on him they pierced, and mourn for him as for an only son, and grieve bitterly for him</em><span>— Zechariah 12:10</span></p>
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
        <aside class="folio">
          <p>PASSION</p><strong>${String(cp.index+1).padStart(2,'0')}</strong><span>OF ${OATR_CANON_PASSION.length}</span>
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
        <aside class="dossier passion-royal-windows">
          <section class="passion-window passion-window-nicholas">
            <div class="passion-icon passion-nicholas-icon" role="img" aria-label="Icon of Nicholas Romanov"></div>
            <p class="passion-window-label">THE PRISONER</p>
            <h3>НИКОЛАЙ<br><span>РОМАНОВ</span></h3>
            <p class="passion-identity"><strong>Nicholas Romanov</strong><br><em>A Poor Sinner</em></p>
          </section>
          <div class="passion-family-rule"><span>☦</span></div>
          <section class="passion-window passion-window-alexandra">
            <div class="passion-icon passion-alexandra-icon" role="img" aria-label="Icon of Alexandra Feodorovna"></div>
            <p class="hand">Nicky</p>
            <h3>АЛЕКСАНДРА<br><span>ФЕОДОРОВНА</span></h3>
            <p class="passion-identity"><strong>Your Wife</strong><br><em>Alexandra, Daughter of Eve</em></p>
            <div class="stamp">ЛИЧНОЕ<br><b>PRIVATE</b></div>
            <small>${alexandraNote}</small>
          </section>
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

if (state.index >= OATR_SKELETONS.length && (state.canonPassion || oatrCanonEligible())) renderCanonPassion();
