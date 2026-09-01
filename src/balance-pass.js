/* Balance pass: keep 70 questions consequential without letting ordinary hardline play
   accidentally fall into the Black Hundred ending. */

const OATR_BALANCE_KEYS = new Set([
  'autocracy','legitimacy','reform','land','blood','empire','veil','door','britain',
  'military','economy','faith','pressure','leverage'
]);

function oatrSoftenEffect(value) {
  if (typeof value !== 'number' || !Number.isFinite(value) || value === 0) return value;
  const sign = Math.sign(value);
  const n = Math.abs(value);
  const softened = n <= 1 ? 1 : n === 2 ? 1 : n === 3 ? 2 : n === 4 ? 3 : Math.max(3, Math.round(n * 0.7));
  return sign * softened;
}

function oatrBalancedEffects(effects) {
  if (!effects || typeof effects !== 'object' || Array.isArray(effects)) return effects;
  const out = { ...effects };
  for (const [key, value] of Object.entries(out)) {
    if (OATR_BALANCE_KEYS.has(key) && typeof value === 'number') out[key] = oatrSoftenEffect(value);
  }
  return out;
}

const OATR_CHOICES_FOR_BEFORE_BALANCE = choicesFor;
choicesFor = function(question) {
  const choices = OATR_CHOICES_FOR_BEFORE_BALANCE(question);
  return choices.map(choice => {
    if (!Array.isArray(choice) || choice.length < 2) return choice;
    return [choice[0], oatrBalancedEffects(choice[1]), ...choice.slice(2)];
  });
};

function oatrEnding(id) { return OATR_ENDINGS.find(e => e.id === id); }
function oatrFlagCount(s, flags) { return flags.reduce((n, flag) => n + (s.flags.has(flag) ? 1 : 0), 0); }

if (oatrEnding('good-queen-olga')) {
  oatrEnding('good-queen-olga').test = s =>
    s.flags.has('olgaSuccession') && s.flags.has('churchFree') && s.flags.has('federalBlueprint') &&
    s.flags.has('peace1914') && s.reform >= 15 && s.legitimacy >= 12;
}

if (oatrEnding('stolypin-right')) {
  oatrEnding('stolypin-right').test = s =>
    (s.flags.has('stolypinFullProgram') || s.flags.has('stolypinBacked') || s.flags.has('stolypinSecondWind')) &&
    s.reform >= 15 && s.land >= 9 && s.economy >= 5 && s.military >= 8 && s.legitimacy >= 11 &&
    s.flags.has('war1914') && !s.flags.has('totalWar');
}

if (oatrEnding('autocracy-works')) {
  oatrEnding('autocracy-works').test = s =>
    s.flags.has('war1914') && s.military >= 11 && s.autocracy >= 14 && s.reform < 14 &&
    s.legitimacy >= 1 && s.blood < 18;
}

if (oatrEnding('elephant-cancer')) {
  oatrEnding('elephant-cancer').test = s =>
    s.flags.has('peace1914') && s.autocracy >= 10 && s.economy >= 4 && s.reform < 14 && s.legitimacy >= -1;
}

if (oatrEnding('constitutional-peace')) {
  oatrEnding('constitutional-peace').test = s =>
    s.flags.has('peace1914') && s.reform >= 11 && s.legitimacy >= 7;
}

for (const id of ['canon-mystic-soviet','canon-military-soviet','canon']) {
  const e = oatrEnding(id);
  if (!e) continue;
  if (id === 'canon-mystic-soviet') e.test = s =>
    s.flags.has('war1914') && s.flags.has('bloodySunday') && !s.flags.has('dumaReal') &&
    s.flags.has('stolypinDead') && s.veil >= 9;
  if (id === 'canon-military-soviet') e.test = s =>
    s.flags.has('war1914') && s.flags.has('bloodySunday') && !s.flags.has('dumaReal') &&
    s.flags.has('stolypinDead') && s.military >= 11;
  if (id === 'canon') e.test = s =>
    s.flags.has('war1914') && s.flags.has('bloodySunday') && !s.flags.has('dumaReal') && s.reform < 14;
}

if (oatrEnding('black-hundred')) {
  oatrEnding('black-hundred').test = s => {
    const reaction = oatrFlagCount(s, [
      'fundamentalReaction','juneSystem','okhranaAscendant','caesarChurch',
      'russifyFinland','russifyPoland','blackHundredSupport','patrioticAuxiliaries'
    ]);
    return s.flags.has('war1914') && reaction >= 2 && s.autocracy >= 18 && s.blood >= 16 &&
      !s.flags.has('dumaReal') && !s.flags.has('legalPolice');
  };
}

for (let i = OATR_ENDINGS.length - 1; i >= 0; i--) {
  if (OATR_ENDINGS[i].id === 'default-war' || OATR_ENDINGS[i].id === 'default-peace') OATR_ENDINGS.splice(i, 1);
}

const OATR_PICK_ENDING_BEFORE_BALANCE = pickEnding;
pickEnding = function() {
  const found = OATR_PICK_ENDING_BEFORE_BALANCE();
  if (found) return found;
  const s = { ...state.scores, flags: state.flags, history: state.history };
  if (s.flags.has('peace1914')) {
    if (s.reform >= 9) return oatrEnding('constitutional-peace') || oatrEnding('good-queen-olga');
    return oatrEnding('elephant-cancer') || oatrEnding('constitutional-peace');
  }
  if (s.flags.has('war1914')) {
    if (s.autocracy >= 12 && s.military >= 8) return oatrEnding('autocracy-works') || oatrEnding('black-hundred');
    return oatrEnding('canon') || oatrEnding('autocracy-works');
  }
  return oatrEnding('elephant-cancer') || oatrEnding('constitutional-peace') || OATR_ENDINGS[OATR_ENDINGS.length - 1];
};
