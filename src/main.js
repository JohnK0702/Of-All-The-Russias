const SCORE_KEYS = ['autocracy','legitimacy','reform','land','blood','empire','veil','door','britain','military','economy','faith'];
const SAVE_KEY = 'oatr-campaign-v3';

const freshState = () => ({
  index: 0,
  history: [],
  pending: null,
  scores: Object.fromEntries(SCORE_KEYS.map(k => [k, 0])),
  flags: new Set(),
  startedAt: Date.now()
});

let state = loadState() || freshState();

function saveState() {
  const payload = { ...state, flags: [...state.flags], pending: null };
  localStorage.setItem(SAVE_KEY, JSON.stringify(payload));
}

function loadState() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || !parsed.scores || !Array.isArray(parsed.history)) return null;
    parsed.flags = new Set(parsed.flags || []);
    parsed.pending = null;
    SCORE_KEYS.forEach(k => { if (typeof parsed.scores[k] !== 'number') parsed.scores[k] = 0; });
    return parsed;
  } catch { return null; }
}

function branchContext() {
  return {
    flag: name => state.flags.has(name),
    score: key => state.scores[key] || 0,
    answered: id => state.history.some(h => h.id === id),
    chose: (id, fragment) => state.history.some(h => h.id === id && h.label.includes(fragment)),
    history: state.history,
    scores: state.scores,
    flags: state.flags
  };
}

function eraFor(questionNumber) {
  return OATR_ERAS.find(era => questionNumber >= era.start && questionNumber <= era.end) || OATR_ERAS.at(-1);
}

function questionAvailable(q) {
  const rule = OATR_BRANCHING?.questionRules?.[q.id];
  return rule ? Boolean(rule(branchContext())) : true;
}

function nextAvailableIndex(startIndex) {
  let i = Math.max(0, startIndex);
  while (i < OATR_SKELETONS.length && !questionAvailable(OATR_SKELETONS[i])) i += 1;
  return i;
}

function currentQuestion() {
  state.index = nextAvailableIndex(state.index);
  return OATR_SKELETONS[state.index];
}

function yearFromDate(date) {
  const match = date.match(/(19\d{2})/);
  return match ? Number(match[1]) : 1905;
}

function yearsRemaining(date) {
  return Math.max(0, 1914 - yearFromDate(date));
}

function questionText(q) {
  const key = OATR_KEY_TEXT[q.id];
  if (key) return key;
  const [quote, speaker] = OATR_GENERIC_QUOTES[q.set];
  const body = [...OATR_GENERIC_TEXT[q.set]];
  if (state.scores.blood >= 16) body.push('Violence now carries memory from one crisis into the next. Every order arrives with ghosts attached.');
  if (state.scores.door >= 14) body.push('Your ministers have become skilled at converting silence into instructions.');
  if (state.scores.veil >= 14) body.push('<em>Somewhere in the palace, a bell sounds once. Nobody else appears to hear it.</em>');
  return { body, quote, speaker };
}

function baseChoicesFor(q) {
  const override = OATR_BRANCHING?.choiceOverrides?.[q.id];
  if (override) {
    const overridden = override(branchContext());
    if (overridden) return overridden;
  }
  if (OATR_SPECIAL_CHOICES[q.id]) return OATR_SPECIAL_CHOICES[q.id];
  return OATR_CHOICE_SETS[q.set];
}

function choicesFor(q) {
  const choices = baseChoicesFor(q);
  const gates = OATR_BRANCHING?.choiceRules?.[q.id];
  if (!gates) return choices;
  const ctx = branchContext();
  const filtered = choices.filter((choice, index) => !gates[index] || gates[index](ctx));
  return filtered.length ? filtered : choices;
}

function apply(choiceIndex) {
  const q = currentQuestion();
  const choices = choicesFor(q);
  const [label, effects] = choices[choiceIndex];
  Object.entries(effects).forEach(([key, value]) => {
    if (key === 'flags') value.forEach(flag => state.flags.add(flag));
    else if (SCORE_KEYS.includes(key)) state.scores[key] += value;
  });
  state.history.push({ id: q.id, choiceIndex, label });
  state.pending = { choiceIndex, label, effects, advisor: chooseAdvisor(q) };
  saveState();
  render();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function continueFromAdvisor() {
  state.pending = null;
  state.index = nextAvailableIndex(state.index + 1);
  saveState();
  render();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function chooseAdvisor(q) {
  const s = state.scores;
  if (q.id === 1) return OATR_ADVISORS.sergei;
  if (q.id >= 56) return s.veil >= 14 ? OATR_ADVISORS.rasputin : (q.set === 'military' ? OATR_ADVISORS.nicholas : OATR_ADVISORS.sazonov);
  if (q.id >= 32 && s.veil >= 9) return OATR_ADVISORS.rasputin;
  if (q.id >= 19 && q.id <= 35 && !state.flags.has('stolypinDead')) return OATR_ADVISORS.stolypin;
  if (s.britain >= 8) return OATR_ADVISORS.lamsdorff;
  if (s.door + s.veil >= 18) return OATR_ADVISORS.alexandra;
  if (s.blood + s.autocracy >= 22) return OATR_ADVISORS.trepov;
  if (q.set === 'military') return OATR_ADVISORS.nicholas;
  if (q.set === 'bureaucracy' || q.set === 'land') return OATR_ADVISORS.kokovtsov;
  return OATR_ADVISORS.witte;
}

function consequenceText(effects, advisor) {
  const o = [];
  if ((effects.legitimacy || 0) >= 2) o.push('More of your subjects believe the Crown has heard them');
  if ((effects.legitimacy || 0) <= -2) o.push('obedience may remain, but belief in the Crown has thinned');
  if ((effects.reform || 0) >= 2) o.push('an institution outside your person has acquired a little more reality');
  if ((effects.autocracy || 0) >= 2) o.push('your personal authority is less ambiguous than it was yesterday');
  if ((effects.autocracy || 0) <= -2) o.push('the ministries have seen that discretion can be surrendered without surrendering the throne');
  if ((effects.land || 0) >= 2) o.push('the land question has moved from rhetoric into ownership');
  if ((effects.military || 0) >= 2) o.push('the army has become marginally more capable of surviving its own paperwork');
  if ((effects.blood || 0) >= 2) o.push('blood has entered the account, and Russia is very poor at closing accounts');
  if ((effects.door || 0) >= 2) o.push('your silence is already being interpreted as policy');
  if ((effects.britain || 0) >= 2) o.push('the Foreign Ministry is relieved to possess an explanation involving London');
  if ((effects.veil || 0) >= 2) o.push('the palace feels a little less separable from prophecy');
  const lead = o.length ? `${o.join('; ')}.` : 'The order is entered into the record.';
  return `${lead} ${advisor.tone}`;
}

function conditionLabel(value, goodHigh = true) {
  const v = goodHigh ? value : -value;
  if (v >= 16) return 'ASCENDANT';
  if (v >= 8) return 'STRONG';
  if (v >= 2) return 'HOLDING';
  if (v > -5) return 'UNCERTAIN';
  if (v > -12) return 'ERODING';
  return 'CRITICAL';
}

function imperialCondition() {
  const s = state.scores;
  return [
    ['CROWN', conditionLabel(s.autocracy)],
    ['BELIEF', conditionLabel(s.legitimacy)],
    ['REFORM', conditionLabel(s.reform)],
    ['LAND', conditionLabel(s.land)],
    ['ORDER', conditionLabel(s.blood, false)],
    ['VEIL', conditionLabel(s.veil, false)]
  ];
}

function routeWhisper() {
  const s = state.scores;
  if (s.veil >= 18) return 'The bells have begun appearing in dreams.';
  if (s.blood >= 22) return 'Every solution now arrives carrying rifles.';
  if (s.door >= 18) return 'The ministries have learned to govern your silences.';
  if (s.reform >= 20 && s.legitimacy >= 18) return 'For the first time, the state may be learning how to correct itself.';
  if (s.britain >= 12) return 'London remains suspiciously involved in geography.';
  if (s.land >= 14) return 'The village has begun to acquire something worth losing.';
  return 'Russia is still deciding whether time is a resource or merely an interval.';
}

function pickEnding() {
  const snapshot = { ...state.scores, flags: state.flags };
  return OATR_ENDINGS.find(e => e.test(snapshot));
}

function renderEnding() {
  const ending = pickEnding();
  document.querySelector('#app').innerHTML = `
    <main class="ending-page ending-${ending.family.toLowerCase().replace(/[^a-z]+/g,'-')}">
      <div class="ornament">☦</div>
      <p class="eyebrow">A POSSIBLE RUSSIA · AFTER 1 AUGUST 1914</p>
      <h1>${ending.title}</h1>
      <p class="ending-kicker">${ending.kicker}</p>
      <div class="rule"><span>◆</span></div>
      <p class="ending-family">${ending.family}</p>
      <p class="ending-copy">${ending.text}</p>
      <p class="ending-verse">“Mene, mene, tekel, upharsin.”</p>
      <div class="ending-actions">
        <button class="restart" data-restart>BEGIN AGAIN</button>
        <button class="restart" data-review>REVIEW THE REIGN</button>
      </div>
      <p class="fineprint">${state.history.length} decisions survived the branch tree · 1905–1914 · Ending: ${ending.id}</p>
    </main>`;
  document.querySelector('[data-restart]').onclick = resetCampaign;
  document.querySelector('[data-review]').onclick = renderReview;
}

function renderReview() {
  const ending = pickEnding();
  const rows = state.history.map((h, i) => {
    const q = OATR_SKELETONS.find(x => x.id === h.id);
    return `<li><span>${String(i+1).padStart(2,'0')}</span><div><b>${q.date} · ${q.title}</b><p>${h.label}</p></div></li>`;
  }).join('');
  document.querySelector('#app').innerHTML = `
    <main class="review-page">
      <header class="review-header"><div><p>THE IMPERIAL RECORD</p><h1>${ending.title}</h1></div><button data-back>RETURN TO ENDING</button></header>
      <ol class="reign-ledger">${rows}</ol>
    </main>`;
  document.querySelector('[data-back]').onclick = renderEnding;
}

function resetCampaign() {
  localStorage.removeItem(SAVE_KEY);
  state = freshState();
  render();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function render() {
  const q = currentQuestion();
  if (!q || state.index >= OATR_SKELETONS.length) return renderEnding();
  const era = eraFor(q.id);
  const copy = questionText(q);
  const choices = choicesFor(q);
  const year = yearFromDate(q.date);
  const condition = imperialCondition().map(([k,v]) => `<li><span>${k}</span><b>${v}</b></li>`).join('');
  const progress = Math.round((q.id - 1) / 69 * 100);
  const playNumber = state.history.length + 1;

  document.body.dataset.era = era.id;
  document.body.dataset.year = year;
  document.body.dataset.veil = state.scores.veil >= 18 ? 'high' : state.scores.veil >= 10 ? 'rising' : 'low';
  document.body.dataset.blood = state.scores.blood >= 22 ? 'high' : state.scores.blood >= 12 ? 'rising' : 'low';

  document.querySelector('#app').innerHTML = `
    <div class="page-shell">
      <header>
        <div class="seal" aria-hidden="true"><span>☦</span><b>Н II</b></div>
        <div class="masthead">
          <p class="russian-title">1905–1914 · A RUSSIAN PASSION</p>
          <h1>OF ALL THE RUSSIAS</h1>
          <p class="motto">Mene, Mene, Tekel, Upharsin</p>
        </div>
        <div class="year"><b>${year}</b><span>—</span><small>1914</small></div>
      </header>
      <nav class="chronology" aria-label="Story progress">
        ${OATR_ERAS.map((e,i)=>`<span class="${e.id===era.id?'active':''}">${e.name}</span>${i<OATR_ERAS.length-1?'<i></i>':''}`).join('')}
      </nav>
      <div class="campaign-progress"><span style="width:${progress}%"></span></div>
      <main>
        <aside class="folio">
          <p>QUESTION</p><strong>${String(playNumber).padStart(2, '0')}</strong><span>FILE ${String(q.id).padStart(2,'0')} / 70</span>
          <div class="vertical-rule"></div>
          <p class="nine-years">YEARS TO<br><b>${yearsRemaining(q.date)}</b><br>MIDNIGHT</p>
        </aside>
        <article>
          <div class="dateline"><span>${q.date}</span><span class="cross">✣</span><span>${q.place}</span></div>
          <p class="kicker">${era.name} · CHAPTER ${era.roman}</p>
          <h2>${q.title}</h2>
          <section class="dispatch">${copy.body.map(p => `<p>${p}</p>`).join('')}</section>
          <blockquote><p>${copy.quote}</p><cite>${copy.speaker}</cite></blockquote>
          <div class="question"><span>WHAT DO YOU DO?</span></div>
          <ol class="choices">
            ${choices.map(([label], i) => `<li><button data-choice="${i}"><span>${String.fromCharCode(65 + i)}</span><p>${label}</p><b>→</b></button></li>`).join('')}
          </ol>
        </article>
        <aside class="dossier">
          <div class="portrait" role="img" aria-label="Portrait of Emperor Nicholas II"><div class="portrait-glow"></div><span class="crown">♛</span><div class="silhouette"><i></i></div></div>
          <p class="hand">Nicky</p>
          <h3>НИКОЛАЙ II<br><span>АЛЕКСАНДРОВИЧ</span></h3>
          <p>Emperor and Autocrat<br>of All the Russias</p>
          <div class="stamp">СОВЕРШЕННО<br><b>СЕКРЕТНО</b></div>
          <section class="condition-panel"><p>IMPERIAL CONDITION</p><ul>${condition}</ul></section>
          <small>${routeWhisper()}</small>
        </aside>
      </main>
      <footer><span>☦</span><p>ORTHODOXY</p><i>◆</i><p>AUTOCRACY</p><i>◆</i><p>NATIONALITY</p><span>☦</span></footer>
      ${state.pending ? renderAdvisor(q) : ''}
    </div>`;

  document.querySelectorAll('[data-choice]').forEach(button => button.onclick = () => apply(Number(button.dataset.choice)));
  const continueButton = document.querySelector('[data-continue]');
  if (continueButton) continueButton.onclick = continueFromAdvisor;
}

function renderAdvisor(question) {
  const { advisor, label, effects } = state.pending;
  const isSergei = advisor === OATR_ADVISORS.sergei;
  const stolypinDeath = question.id === 35 && state.flags.has('stolypinDead');
  return `<div class="advisor-scrim" role="dialog" aria-modal="true" aria-labelledby="advisor-name">
    <section class="advisor-card">
      <p class="advisor-label">PRIVATE ADVICE · ${question.date}</p>
      <div class="advisor-layout">
        <div class="advisor-portrait"><span>${advisor.mark}</span></div>
        <div class="advisor-copy">
          <p class="handwritten">For Nicky’s eyes alone</p>
          <h2 id="advisor-name">${advisor.name}</h2>
          <p class="advisor-role">${advisor.role}</p>
          <blockquote>${consequenceText(effects, advisor)}</blockquote>
          <p class="decision-echo">You ordered: “${label}”</p>
          ${isSergei ? '<p class="fate-note">Grand Duke Sergei will be assassinated in Moscow on 17 February 1905. This is the only advice he will give you.</p>' : ''}
          ${stolypinDeath ? '<p class="fate-note">The chair opposite you is empty. The program will now have to survive the man who made it possible.</p>' : ''}
          <button data-continue>SEAL THE MEMORANDUM <span>→</span></button>
        </div>
      </div>
    </section>
  </div>`;
}

render();
