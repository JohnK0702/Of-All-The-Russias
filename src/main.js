const chapters = [
  {
    number: 'I',
    date: '9 January 1905',
    place: 'Tsarskoye Selo',
    kicker: 'THE FIRST CRACK',
    title: 'Before the bells',
    body: [
      'You wake before dawn. Alexandra is sleeping beside you. Somewhere in the palace a clock is ticking.',
      'You have been Emperor of All the Russias for ten years. Your father once called you weak. Your ministers call you Majesty. Your wife calls you Nicky. One hundred and twenty-five million people call you Tsar.',
      '<em>God has not called you anything lately.</em>',
      'Outside Petersburg, a priest named Georgy Gapon is gathering workers beneath icons and portraits of your face. They believe that if only the Little Father knew what was being done to them, everything would be made right.',
      'The peculiar difficulty is that you do know.'
    ],
    quote: '“The procession is peaceful, Majesty. That is not the same thing as harmless.”',
    speaker: 'Minister of the Interior Sviatopolk-Mirsky',
    choices: [
      ['Receive a delegation. They are my subjects, and I should hear them.', { legitimacy: 2, reform: 1, door: -1 }],
      ['Send word through Father Gapon: I will receive the petition after they disperse.', { legitimacy: 1, autocracy: 1 }],
      ['The procession cannot approach the palace. Trepov understands what must be done.', { autocracy: 2, blood: 3 }],
      ['I do not wish to discuss this further.', { door: 3, legitimacy: -2, veil: 1 }]
    ]
  },
  {
    number: 'II',
    date: '30 May 1905',
    place: 'The Alexander Palace',
    kicker: 'A DISTANT SEA',
    title: 'The fleet that is no longer there',
    body: [
      'A telegram has arrived from the other side of the world. Admiral Rozhestvensky’s fleet found the Japanese in the strait at Tsushima.',
      'The Baltic Fleet sailed eighteen thousand miles to discover that distance is not a strategy. Ships that survived the guns raised white flags. The empire has lost a fleet in an afternoon.',
      'The Naval Ministry requests funds for an inquiry. The inquiry will be chaired by the men who built the fleet.'
    ],
    quote: '“London sold them coal. London sold us assurances.”',
    speaker: 'Admiral Alexeyev, helpfully',
    choices: [
      ['Accept Roosevelt’s mediation. End the war before defeat becomes revolution.', { legitimacy: 1, reform: 1, autocracy: -1 }],
      ['Continue the war. Russia does not conclude peace after a single naval reverse.', { blood: 2, autocracy: 1, legitimacy: -2 }],
      ['Dismiss the naval command and publish the procurement records.', { reform: 2, autocracy: -1, legitimacy: 2 }],
      ['Ask why Britain has so many coaling stations.', { britain: 2, veil: 1 }]
    ]
  },
  {
    number: 'III',
    date: '17 October 1905',
    place: 'Peterhof',
    kicker: 'THE CLOSED DOOR',
    title: 'A constitution that may not exist',
    body: [
      'The railways are still. Moscow is dark. Witte has placed a document on your desk which promises civil liberties and an elected legislature.',
      'The ink would not end autocracy tonight. It would, however, admit that Russia contains people other than its sovereign.',
      'Alexandra calls the paper cowardice. Witte calls it the last available instrument of government. Beyond the windows, the gulf is the color of iron.'
    ],
    quote: '“Majesty may preserve every word of the autocracy, or preserve the autocracy. I no longer believe both are possible.”',
    speaker: 'Sergei Witte',
    choices: [
      ['Sign—and mean it. The Duma must become part of the state, not its decoration.', { reform: 3, legitimacy: 3, autocracy: -2, door: -1 }],
      ['Sign. We may revisit the precise meaning when order returns.', { reform: 1, legitimacy: -1, autocracy: 1, door: 1 }],
      ['Refuse. Disorder cannot be rewarded with a constitution.', { autocracy: 3, blood: 3, legitimacy: -3 }],
      ['Create a commission to examine the legal character of future commissions.', { door: 2, legitimacy: -1, britain: 1 }]
    ]
  },
  {
    number: 'IV',
    date: '6 May 1906',
    place: 'The Winter Palace',
    kicker: 'THE FIRST DUMA',
    title: 'The sound of another voice',
    body: [
      'For the first time, elected deputies stand before the throne. Many have arrived from villages whose names the ministries have never learned to spell.',
      'They ask for land, responsible government, amnesty, and an end to arbitrary power. They ask all of this at once, as though nine months of legality have made up for centuries without it.',
      'You notice how few of them bow correctly.'
    ],
    quote: '“The constitution does not diminish the Crown unless the Crown proves unable to share a room with it.”',
    speaker: 'Count Witte, no longer prime minister',
    choices: [
      ['Invite the Duma leaders to form a ministry. Let responsibility teach restraint.', { reform: 4, legitimacy: 3, autocracy: -3, land: 1 }],
      ['Work with moderates, but reserve the ministries of war and the interior.', { reform: 2, legitimacy: 2, autocracy: 1 }],
      ['Dissolve it. Russia cannot be governed by speeches.', { autocracy: 3, legitimacy: -3, blood: 1 }],
      ['End the audience early. Alexei is unwell.', { door: 3, veil: 1 }]
    ]
  }
];

const state = { index: 0, history: [], pending: null, scores: { autocracy: 0, legitimacy: 0, reform: 0, land: 0, blood: 0, empire: 0, veil: 0, door: 0, britain: 0 } };

const advisors = {
  sergei: {
    name: 'GRAND DUKE SERGEI ALEXANDROVICH',
    role: 'Your uncle · Former Governor-General of Moscow',
    mark: 'С.А.',
    tone: 'Order is not cruelty, Nicky. Indecision is cruelty distributed among subordinates.'
  },
  witte: {
    name: 'COUNT SERGEI WITTE',
    role: 'Chairman of the Council of Ministers',
    mark: 'С.Ю.',
    tone: 'A state may bend in public or break in private. The ministries prefer the latter because it requires less paperwork.'
  },
  alexandra: {
    name: 'ALEXANDRA FEODOROVNA',
    role: 'Empress of All the Russias',
    mark: 'А.Ф.',
    tone: 'They call your constancy weakness because they cannot understand what God has placed upon you.'
  },
  trepov: {
    name: 'GENERAL DMITRI TREPOV',
    role: 'Commandant of the Imperial Palace',
    mark: 'Д.Т.',
    tone: 'The state has spoken clearly. It will now be necessary to ensure nobody mistakes clarity for permission to answer.'
  },
  lamsdorff: {
    name: 'COUNT VLADIMIR LAMSDORFF',
    role: 'Minister of Foreign Affairs',
    mark: 'В.Л.',
    tone: 'The British will misunderstand this deliberately. The French will misunderstand it loyally. This is called diplomacy.'
  },
  stolypin: {
    name: 'PYOTR STOLYPIN',
    role: 'Minister of the Interior',
    mark: 'П.А.',
    tone: 'You have purchased time, Majesty. Russia has always mistaken the purchase of time for the solution of a problem.'
  }
};

function chooseAdvisor(chapterIndex) {
  if (chapterIndex === 0) return advisors.sergei;
  const s = state.scores;
  if (s.britain >= 3) return advisors.lamsdorff;
  if (s.door + s.veil >= 5) return advisors.alexandra;
  if (s.blood + s.autocracy >= 7) return advisors.trepov;
  if (chapterIndex >= 3 && s.land > 0) return advisors.stolypin;
  return advisors.witte;
}

function consequenceText(effects) {
  const observations = [];
  if ((effects.legitimacy || 0) > 0) observations.push('For the moment, more of your subjects believe the Crown has heard them');
  if ((effects.legitimacy || 0) < 0) observations.push('The Crown has retained obedience, but belief in it has thinned');
  if ((effects.reform || 0) > 0) observations.push('the machinery of reform has acquired another small piece of reality');
  if ((effects.autocracy || 0) > 0) observations.push('your personal authority is less ambiguous than it was yesterday');
  if ((effects.autocracy || 0) < 0) observations.push('the ministries have noticed that the sovereign can surrender discretion without surrendering the throne');
  if ((effects.blood || 0) > 0) observations.push('blood has entered the account, and Russia is very poor at closing accounts');
  if ((effects.door || 0) > 0) observations.push('your silence has been interpreted as policy by men who profit from interpreting it');
  if ((effects.britain || 0) > 0) observations.push('the Foreign Ministry is relieved to possess an explanation involving London');
  if ((effects.veil || 0) > 0) observations.push('Alexandra says the unease in the palace is only a trial of faith');
  return `${observations.join('; ')}. ${chooseAdvisor(state.index).tone}`;
}

function apply(choiceIndex) {
  const chapter = chapters[state.index];
  const [, effects] = chapter.choices[choiceIndex];
  Object.entries(effects).forEach(([key, value]) => { state.scores[key] += value; });
  state.history.push(choiceIndex);
  state.pending = { choiceIndex, effects, advisor: chooseAdvisor(state.index) };
  render();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function continueFromAdvisor() {
  state.pending = null;
  state.index += 1;
  render();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function ending() {
  const s = state.scores;
  if (s.britain >= 4) return ['EUROPE FINALLY GETS TO THE BOTTOM OF IT', 'THE ENGLISH DID IT', 'The Foreign Ministry has isolated the source of every Russian misfortune. It is an island in the North Sea. One question remains: if Britain was responsible for everything, what happens now?'];
  if (s.blood >= 7) return ['THE TREE IS CUT DOWN', 'НЕБУХАДНЕЦАР', 'Authority has survived every concession because none were made. Obedience remains universal in all places where soldiers are present. The underground no longer asks Russia to reform. It asks Russia to answer for the dead.'];
  if (s.reform >= 8 && s.legitimacy >= 7) return ['THE TSAR WHO BECAME SMALLER', 'THE TWENTY YEARS', 'The throne is no longer the state, and therefore both endure. Russia has not been perfected. It has learned the less glorious art of correction. History waits at the door and, for once, finds it open.'];
  if (s.door >= 6) return ['NO ANSWER IS ALSO AN ANSWER', 'THE CLOSED DOOR', 'The empire is governed through silences. Every official learns to guess your wishes, and every guess becomes an order carrying your name. You have avoided deciding anything. Everything has been decided.'];
  return ['A CONSTITUTION WRITTEN IN PENCIL', 'THE BREATHING SPACE', 'The old state and the new Russia regard one another across a desk. Neither has won. Neither has left. Somewhere beyond the palace, Stolypin is asking for twenty years. You have eight.'];
}

function renderEnding() {
  const [kicker, title, text] = ending();
  document.querySelector('#app').innerHTML = `
    <main class="ending-page">
      <div class="ornament">☦</div>
      <p class="eyebrow">A POSSIBLE RUSSIA · 1906</p>
      <h1>${title}</h1>
      <p class="ending-kicker">${kicker}</p>
      <div class="rule"><span>◆</span></div>
      <p class="ending-copy">${text}</p>
      <p class="ending-verse">“Mene, mene, tekel, upharsin.”</p>
      <button class="restart">BEGIN AGAIN</button>
      <p class="fineprint">This prologue contains four of the proposed seventy questions.</p>
    </main>`;
  document.querySelector('.restart').onclick = () => {
    state.index = 0; state.history = []; state.pending = null;
    Object.keys(state.scores).forEach(key => { state.scores[key] = 0; });
    render();
  };
}

function render() {
  if (state.index >= chapters.length) return renderEnding();
  const q = chapters[state.index];
  document.querySelector('#app').innerHTML = `
    <div class="page-shell">
      <header>
        <div class="seal" aria-hidden="true"><span>☦</span><b>Н II</b></div>
        <div class="masthead">
          <p class="russian-title">1905–1914 · A RUSSIAN PASSION</p>
          <h1>OF ALL THE RUSSIAS</h1>
          <p class="motto">Mene, Mene, Tekel, Upharsin</p>
        </div>
        <div class="year"><b>1905</b><span>—</span><small>1914</small></div>
      </header>
      <nav class="chronology" aria-label="Story progress">
        <span>THE FIRST CRACK</span><i></i><span>THE BREATHING SPACE</span><i></i><span>THE HOUSE OF CARDS</span><i></i><span>THE LAST SUMMER</span>
      </nav>
      <main>
        <aside class="folio">
          <p>QUESTION</p><strong>${String(state.index + 1).padStart(2, '0')}</strong><span>OF 70</span>
          <div class="vertical-rule"></div>
          <p class="nine-years">YOU HAVE<br><b>${9 - state.index}</b><br>YEARS</p>
        </aside>
        <article>
          <div class="dateline"><span>${q.date}</span><span class="cross">✣</span><span>${q.place}</span></div>
          <p class="kicker">${q.kicker} · CHAPTER ${q.number}</p>
          <h2>${q.title}</h2>
          <section class="dispatch">${q.body.map(p => `<p>${p}</p>`).join('')}</section>
          <blockquote><p>${q.quote}</p><cite>${q.speaker}</cite></blockquote>
          <div class="question"><span>WHAT DO YOU DO?</span></div>
          <ol class="choices">
            ${q.choices.map(([label], i) => `<li><button data-choice="${i}"><span>${String.fromCharCode(65 + i)}</span><p>${label}</p><b>→</b></button></li>`).join('')}
          </ol>
        </article>
        <aside class="dossier">
          <div class="portrait" role="img" aria-label="Stylized portrait of Emperor Nicholas II">
            <div class="portrait-glow"></div><span class="crown">♛</span><div class="silhouette"><i></i></div>
          </div>
          <p class="hand">Nicky</p>
          <h3>НИКОЛАЙ II<br><span>АЛЕКСАНДРОВИЧ</span></h3>
          <p>Emperor and Autocrat<br>of All the Russias</p>
          <div class="stamp">СОВЕРШЕННО<br><b>СЕКРЕТНО</b></div>
          <small>“If Russia understood what Russia was, it would terrify her.”</small>
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
  const { advisor, choiceIndex, effects } = state.pending;
  const isSergei = advisor === advisors.sergei;
  return `<div class="advisor-scrim" role="dialog" aria-modal="true" aria-labelledby="advisor-name">
    <section class="advisor-card">
      <p class="advisor-label">PRIVATE ADVICE · ${question.date}</p>
      <div class="advisor-layout">
        <div class="advisor-portrait"><span>${advisor.mark}</span></div>
        <div class="advisor-copy">
          <p class="handwritten">For Nicky’s eyes alone</p>
          <h2 id="advisor-name">${advisor.name}</h2>
          <p class="advisor-role">${advisor.role}</p>
          <blockquote>${consequenceText(effects)}</blockquote>
          <p class="decision-echo">You ordered: “${question.choices[choiceIndex][0]}”</p>
          ${isSergei ? '<p class="fate-note">Grand Duke Sergei will be assassinated in Moscow on 17 February 1905. This is the only advice he will give you.</p>' : ''}
          <button data-continue>SEAL THE MEMORANDUM <span>→</span></button>
        </div>
      </div>
    </section>
  </div>`;
}

render();
