/* Reactive state and military-readiness layer.

   The old score ledger remains the underlying campaign model. This layer turns those scores into
   visible, derived conditions and gives military reform a separate institutional memory. The
   military window is deliberately based on decisions, not simply the generic `military` score:
   buying formations is not the same thing as fixing staff work, logistics or mobilization.
*/

const OATR_STATS_CLAMP = n => Math.max(0, Math.min(100, Math.round(n)));

function oatrConditionWord(value, inverse = false) {
  const v = inverse ? 100 - value : value;
  if (v >= 80) return 'ASCENDANT';
  if (v >= 65) return 'STRONG';
  if (v >= 50) return 'HOLDING';
  if (v >= 35) return 'STRAINED';
  if (v >= 20) return 'ERODING';
  return 'CRITICAL';
}

function oatrImperialStats() {
  const s = state.scores;
  return [
    ['CROWN', OATR_STATS_CLAMP(50 + s.autocracy * 3 - s.door * 2 - Math.max(0, s.pressure) * .7)],
    ['BELIEF', OATR_STATS_CLAMP(52 + s.legitimacy * 3.5 - Math.max(0, s.blood) * 1.6)],
    ['STATE', OATR_STATS_CLAMP(42 + s.economy * 2.5 + s.reform * .9 + s.military * .8 - Math.max(0, s.door) * 1.2)],
    ['REFORM', OATR_STATS_CLAMP(28 + s.reform * 3.2 + s.land * .8 - Math.max(0, s.autocracy) * .7)],
    ['SOCIAL PEACE', OATR_STATS_CLAMP(65 + s.land * 1.2 + s.economy * .8 - Math.max(0, s.blood) * 2 - Math.max(0, s.pressure) * 2.2)],
    ['CRISIS', OATR_STATS_CLAMP(18 + Math.max(0, s.pressure) * 4 + Math.max(0, s.blood) * 1.2 + Math.max(0, s.door) * .8), true]
  ];
}

function oatrImperialTrend(key) {
  const e = state.pending?.effects || {};
  const maps = {
    CROWN: (e.autocracy || 0) - (e.door || 0) * .7,
    BELIEF: (e.legitimacy || 0) - (e.blood || 0) * .4,
    STATE: (e.economy || 0) + (e.reform || 0) * .3 + (e.military || 0) * .4 - (e.door || 0) * .4,
    REFORM: (e.reform || 0) + (e.land || 0) * .3 - (e.autocracy || 0) * .2,
    'SOCIAL PEACE': (e.land || 0) * .3 + (e.economy || 0) * .2 - (e.blood || 0) - (e.pressure || 0) * .5,
    CRISIS: -((e.pressure || 0) + (e.blood || 0) * .35)
  };
  const n = maps[key] || 0;
  return n > .4 ? '▲' : n < -.4 ? '▼' : '—';
}

function oatrMilitaryProfile(history = state.history) {
  const p = { command:28, logistics:26, firepower:28, mobilization:24, cohesion:48 };
  const add = (key, n) => { p[key] = OATR_STATS_CLAMP(p[key] + n); };

  for (const h of history || []) {
    const c = h.choiceIndex;
    switch (h.id) {
      case 4: // Tsushima: whether humiliation produces institutional reform.
        if (c === 2) { add('command',12); add('firepower',10); add('logistics',4); }
        else if (c === 3) { add('firepower',4); add('logistics',-3); }
        else if (c === 1) { add('cohesion',-3); }
        break;
      case 5: // Potemkin: discipline versus personnel reform.
        if (c === 0) add('cohesion',4);
        if (c === 2) add('cohesion',-5);
        if (c === 3) { add('cohesion',6); add('command',2); }
        break;
      case 20: // Budget priority, if this archival event is ever on a route.
        if (c === 0) { add('logistics',4); add('firepower',-2); }
        if (c === 1) { add('logistics',6); add('firepower',6); }
        if (c === 2) { add('firepower',9); add('logistics',2); }
        break;
      case 26: // The main post-Mukden army reform decision.
        if (c === 0) { add('command',22); add('logistics',16); add('firepower',14); add('mobilization',12); add('cohesion',10); }
        if (c === 1) { add('command',3); add('logistics',16); add('firepower',18); add('cohesion',2); }
        if (c === 2) { add('command',-4); add('logistics',-6); add('mobilization',14); add('cohesion',-2); }
        if (c === 3) { add('command',10); add('logistics',5); add('mobilization',6); }
        break;
      case 43: // Flexible mobilization planning.
        if (c === 0) { add('command',6); add('logistics',5); add('mobilization',18); }
        if (c === 1) { add('command',-4); add('mobilization',4); }
        if (c === 2) { add('logistics',16); add('mobilization',14); }
        if (c === 3) { add('command',-5); add('mobilization',9); }
        break;
      case 53: // 1914 war planning, retained for archival/branch routes.
        if (c === 0) { add('command',8); add('logistics',12); add('firepower',12); add('mobilization',6); }
        if (c === 1) { add('logistics',14); add('mobilization',8); add('command',-2); }
        if (c === 2) { add('command',4); add('mobilization',2); }
        if (c === 3) { add('command',3); add('cohesion',-2); }
        break;
      case 54:
        if (c === 1) { add('command',4); add('mobilization',4); }
        break;
      case 55:
        if (c === 2) { add('logistics',6); add('firepower',6); add('mobilization',5); }
        break;
      case 63:
        if (c === 0) add('command',4);
        if (c === 1) add('command',3);
        if (c === 2) { add('mobilization',5); add('command',-2); }
        if (c === 3) add('command',5);
        break;
      case 64:
        if (c === 0) add('command',5);
        if (c === 1) add('mobilization',3);
        if (c === 3) add('command',-4);
        break;
      case 66:
        if (c === 0) { add('mobilization',-5); add('command',3); }
        if (c === 1) add('mobilization',2);
        if (c === 2) add('mobilization',3);
        break;
    }
  }

  p.overall = OATR_STATS_CLAMP((p.command + p.logistics + p.firepower + p.mobilization + p.cohesion) / 5);
  return p;
}

function oatrPrewarMilitaryProfile() {
  return oatrMilitaryProfile((state.history || []).filter(h => h.id <= 55));
}

function oatrArmyPosture(profile = oatrMilitaryProfile()) {
  const r = profile.overall;
  if (r >= 75) return ['READY', 'The army is an instrument of policy rather than a wager.'];
  if (r >= 58) return ['REFORMED', 'The reforms are visible in the staffs, depots and timetables.'];
  if (r >= 45) return ['IMPROVING', 'The army is stronger than in 1905, but important systems remain brittle.'];
  if (r >= 34) return ['FRAGILE', 'Paper strength is outrunning the institutions meant to move and supply it.'];
  return ['HOLLOW', 'Russia has men and courage. It still lacks enough of the machinery that turns them into an army.'];
}

function oatrMilitaryRow(label, value) {
  return `<li><div><span>${label}</span><b>${value}</b></div><i><em style="width:${value}%"></em></i></li>`;
}

function oatrRenderReactivePanels() {
  if (typeof document === 'undefined') return;
  const condition = document.querySelector('.condition-panel');
  if (condition) {
    const rows = oatrImperialStats().map(([key, value, inverse]) =>
      `<li><div><span>${key}</span><b>${oatrConditionWord(value, inverse)} <small>${oatrImperialTrend(key)}</small></b></div><i><em style="width:${inverse ? 100 - value : value}%"></em></i></li>`
    ).join('');
    condition.innerHTML = `<p>IMPERIAL CONDITION</p><ul class="reactive-condition">${rows}</ul>`;
  }

  const dossier = document.querySelector('.dossier');
  if (!dossier || dossier.querySelector('.military-panel')) return;
  const p = oatrMilitaryProfile();
  const [posture, note] = oatrArmyPosture(p);
  const military = document.createElement('section');
  military.className = `military-panel military-${posture.toLowerCase()}`;
  military.innerHTML = `
    <div class="military-heading"><span>IMPERIAL GENERAL STAFF</span><b>${posture}</b></div>
    <ul>
      ${oatrMilitaryRow('COMMAND', p.command)}
      ${oatrMilitaryRow('LOGISTICS', p.logistics)}
      ${oatrMilitaryRow('FIREPOWER', p.firepower)}
      ${oatrMilitaryRow('MOBILIZATION', p.mobilization)}
      ${oatrMilitaryRow('COHESION', p.cohesion)}
    </ul>
    <p>${note}</p>`;
  const whisper = dossier.querySelector(':scope > small');
  if (whisper) dossier.insertBefore(military, whisper);
  else dossier.appendChild(military);
}

/* Military capability changes the crisis instead of merely decorating an ending score. */
const OATR_CHOICES_BEFORE_REACTIVE_STATS = choicesFor;
choicesFor = function(q) {
  const base = OATR_CHOICES_BEFORE_REACTIVE_STATS(q);
  if (!q || q.id < 56) return base;
  const army = oatrPrewarMilitaryProfile();
  const weak = army.overall < 48;
  const strong = army.overall >= 62;

  return base.map(choice => {
    if (!Array.isArray(choice) || choice.length < 2) return choice;
    let [label, effects, ...rest] = choice;
    const next = { ...(effects || {}) };
    const flags = [...(next.flags || [])];
    const militaryCommitment = flags.some(f => ['generalMobilization','warMachine','war1914','totalWar','limitedWar'].includes(f)) ||
      /general mobilization|prepare for war|enter (?:the )?war|offensive war/i.test(label);

    if (militaryCommitment && weak) {
      next.pressure = (next.pressure || 0) + 2;
      next.blood = (next.blood || 0) + 2;
      next.legitimacy = (next.legitimacy || 0) - 1;
      if (!flags.includes('armyUnready1914')) flags.push('armyUnready1914');
    } else if (militaryCommitment && strong) {
      next.military = (next.military || 0) + 1;
      next.pressure = (next.pressure || 0) - 1;
    }

    if ((q.id === 61 || q.id === 64) && /partial mobilization/i.test(label) && army.mobilization < 45) {
      next.military = (next.military || 0) - 1;
      next.pressure = (next.pressure || 0) + 1;
    }

    if (flags.length) next.flags = flags;
    return [label, next, ...rest];
  });
};

/* Tell the player what the General Staff actually has, especially once Sarajevo starts the fuse. */
const OATR_QUESTION_TEXT_BEFORE_REACTIVE_STATS = questionText;
questionText = function(q) {
  const copy = OATR_QUESTION_TEXT_BEFORE_REACTIVE_STATS(q);
  if (!copy || !q || q.id < 56) return copy;
  const army = oatrPrewarMilitaryProfile();
  const body = [...(copy.body || [])];
  if (army.overall < 35) {
    body.push('The confidential readiness return is ugly. Mobilization exists on paper, but staff work, shell supply and railway flexibility remain close to the weaknesses exposed against Japan. A general war would ask the army to improvise at imperial scale.');
  } else if (army.overall < 48) {
    body.push('The army is larger and better armed than it was in 1905, but the General Staff still reports brittle timetables, uneven supply and too many reforms completed in memorandum rather than practice.');
  } else if (army.overall < 62) {
    body.push('The postwar reforms have made the army materially more usable. The weak points are now specific rather than universal: some districts, depots and command habits remain behind the new plans.');
  } else {
    body.push('The General Staff enters the crisis with evidence behind its confidence: practiced staffs, deeper stocks, more flexible rail plans and an officer corps increasingly promoted for competence. War would still be terrible; unreadiness is no longer the principal reason.');
  }
  return { ...copy, body };
};

/* Entering the Great War with an unreformed army is the canon trap. Political brilliance cannot
   make shells, staff officers or flexible mobilization appear in August 1914. */
const OATR_PICK_ENDING_BEFORE_REACTIVE_STATS = pickEnding;
pickEnding = function() {
  const army = oatrPrewarMilitaryProfile();
  if (state.flags.has('war1914') && army.overall < 48) {
    state.flags.add('armyUnready1914');
    const canon = typeof oatrEnding === 'function'
      ? (oatrEnding('canon') || oatrEnding('canon-military-soviet'))
      : OATR_ENDINGS.find(e => e.id === 'canon') || OATR_ENDINGS.find(e => e.id === 'canon-military-soviet');
    if (canon) return canon;
  }
  return OATR_PICK_ENDING_BEFORE_REACTIVE_STATS();
};

/* Existing renderers own the page. Decorate the normal campaign screen after they finish. */
const OATR_RENDER_BEFORE_REACTIVE_STATS = render;
render = function() {
  const result = OATR_RENDER_BEFORE_REACTIVE_STATS();
  oatrRenderReactivePanels();
  return result;
};

render();
