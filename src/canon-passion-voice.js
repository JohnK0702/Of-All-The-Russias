/* Canon Passion presentation override.
   Reuses the original 1905–1914 dossier layout, adds Alexandra as the persistent private window,
   and restores a post-choice advisor: Russia itself, speaking without faction, consolation, or absolution. */

const OATR_PASSION_RUSSIA_VOICE = [
  `Bread. Snow. Women waiting beneath a pale sky. I remember fields where the wheat moved like water and no one had yet decided hunger was a political theory. Do not ask me who began this. I am tired of beginnings. Babylon always asks who began the fire while the roof is burning.`,
  `The rifles turn around and everyone suddenly discovers that a rifle has two ends. I have carried armies across steppe, marsh, mountain and frozen river. I have buried them in uniforms of every reign. Do not call them mine when they obey you and traitors when they do not. They are boys. The earth knows this sooner than generals do.`,
  `Your train cannot find the capital. Once, sunlight lay for miles across the fields and the rails seemed to bind me together. Now every junction is a question. Every signal box contains a small frightened king. Babylon had roads too. Babylon thought roads meant possession.`,
  `The crown is gone. The birches do not notice. The Volga does not stop. Birds sing outside Mogilev with the obscene serenity of creatures who have never read a manifesto. You thought the crown was heavy. Perhaps it was. I have been beneath it longer.`,
  `The children are ill. Their hair falls away and suddenly they look like every sick child I have ever held beneath a leaking roof. Eli, Eli. Do not make a doctrine of their suffering. Do not make a defense of yours. There is sunlight on the floor. For one minute, look at that.`,
  `Tobolsk. Snow against the windows. Wood split by hand. Lessons after breakfast. Far away the Volga flows past villages where old women still cross themselves when bells ring. You wanted all of me. No one can have all of me. I am too wide even for my own grief.`,
  `Another revolution. Another proclamation. Babylon changes banners and calls the change eternity. I have heard men announce the final age before. Their voices become photographs. Their slogans become street names. The graves remain difficult to rename.`,
  `House of Special Purpose. Such careful words. Babylon loves careful words. Requisition. Transfer. Necessity. Measure. Liquidation. It makes a clean little fence around the scream. Beyond the fence there are fields of sunflowers turning toward the sun without permission.`,
  `I don't want the bones. They press into me by the score, sinking deeper. Mukden. Presnya. Lena. Galicia. Villages with names that disappear from maps before the widows stop saying them. I have no room left and still you give me more.`,
  `Whitewashed windows. You cannot see the city, but the city is still there. Somewhere a child is chasing a bird through dust. Somewhere wheat bends in warm wind. Somewhere a man is screaming in a cellar for reasons written neatly at the top of a form. I contain all of it. This is what hurts.`,
  `The last evening is ordinary. That is the cruelty. Teacups. Footsteps. A page turned. A cough from the next room. Men imagine apocalypse as trumpets, but most endings arrive while somebody is folding a shirt. Babylon sleeps badly tonight.`,
  `Downstairs. Hold the boy. Look at your wife. There is nothing left to govern. I hear the shots before they are fired because I have heard them too many times. Death. Misery. Screams. Make it stop. Please. Make it stop. The Volga keeps flowing. The birds will sing in the morning. I do not know whether that is mercy.`
];

const OATR_PASSION_ALEXANDRA_NOTES = [
  `Nicky, whatever they are shouting, remember that frightened people also belong to you. Do not let wounded pride answer hunger.`,
  `The reports say the soldiers have gone over. I care less for the reports than for whether you can come home to us.`,
  `They are asking you to surrender the crown to save Russia. I cannot tell you what God requires. I only know Alexei needs his father more than Russia needs another sacrifice from him.`,
  `They may call you Colonel Romanov now. To me you are still Nicky. Let the name be enough for tonight.`,
  `The girls are brave. Alexei suffers quietly. Do not teach them bitterness simply because bitterness would be easier than humiliation.`,
  `Our world has become very small. Perhaps we did not understand how much grace can fit inside a small room.`,
  `They have taken the government from those who took it from you. Everything outside changes names. We must not let hatred rename us too.`,
  `The guards can make a prison vulgar. They cannot compel us to become vulgar with them.`,
  `Do not answer cruelty by pretending you never failed. And do not answer guilt by pretending cruelty is justice.`,
  `The windows are white. I miss the sky. I miss the children running where no one counts their steps.`,
  `Stay with me tonight. No politics. No Russia. No explanations. Just stay.`,
  `Nicky, carry Alexei. I will walk beside you.`
];

function oatrPassionPhase(index) {
  if (index <= 3) return ['FEBRUARY', 'ABDICATION'];
  if (index <= 6) return ['CAPTIVITY', 'TOBOLSK'];
  return ['EKATERINBURG', 'THE PASSION'];
}

function renderPassionRussiaAdvisor(event, index, pending) {
  const voice = OATR_PASSION_RUSSIA_VOICE[index] || OATR_PASSION_RUSSIA_VOICE.at(-1);
  return `<div class="advisor-scrim passion-russia-advisor" role="dialog" aria-modal="true" aria-labelledby="passion-russia-name">
    <section class="advisor-card">
      <p class="advisor-label">NO MINISTRY · NO FILE NUMBER · ${event.date}</p>
      <div class="advisor-layout">
        <div class="advisor-portrait"><span>Р</span></div>
        <div class="advisor-copy">
          <p class="handwritten">You know this voice.</p>
          <h2 id="passion-russia-name">РОССИЯ</h2>
          <p class="advisor-role">NEITHER MOTHER NOR JUDGE · NEITHER ACCUSER NOR DEFENDER</p>
          <blockquote>${voice}</blockquote>
          <p class="decision-echo">You chose: “${pending.label}”</p>
          <p class="fate-note">It does not sound angry. It does not sound kind. It sounds as though something enormous has been awake for too long.</p>
          <button data-canon-continue>LISTEN UNTIL IT STOPS <span>→</span></button>
        </div>
      </div>
    </section>
  </div>`;
}

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
        <aside class="dossier passion-alexandra-window">
          <div class="portrait" role="img" aria-label="Alexandra Feodorovna"><div class="portrait-glow"></div><span class="crown">♛</span><div class="silhouette"><i></i></div></div>
          <p class="hand">Nicky</p>
          <h3>АЛЕКСАНДРА<br><span>ФЕОДОРОВНА</span></h3>
          <p>Your wife<br>Former Empress of All the Russias</p>
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

applyCanonPassion = function(i) {
  const cp = state.canonPassion;
  if (cp.pending) return;
  const e = OATR_CANON_PASSION[cp.index];
  const [label,effects] = e.choices[i];
  Object.entries(effects || {}).forEach(([k,v]) => {
    if (k === 'flags') v.forEach(flag => state.flags.add(flag));
    else if (SCORE_KEYS.includes(k)) state.scores[k] += v;
  });
  cp.pending = { index:cp.index, label };
  saveState();
  renderCanonPassion();
  window.scrollTo({top:0,behavior:'smooth'});
};

function continueCanonPassion() {
  const cp = state.canonPassion;
  if (!cp?.pending) return;
  const e = OATR_CANON_PASSION[cp.index];
  cp.history.push({ date:e.date, title:e.title, label:cp.pending.label });
  cp.pending = null;
  cp.index += 1;
  if (cp.index >= OATR_CANON_PASSION.length) cp.complete = true;
  saveState();
  if (cp.complete) renderCanonFinalEnding(); else renderCanonPassion();
  window.scrollTo({top:0,behavior:'smooth'});
}

/* canon-passion.js may already have rendered once on load. Re-render with the restored layout. */
if (state.index >= OATR_SKELETONS.length && (state.canonPassion || oatrCanonEligible())) renderCanonPassion();
