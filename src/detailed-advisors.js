/* Replace score-template advisor chatter and generic campaign fallbacks with event-specific content.
   Loaded after main.js so these assignments override the engine defaults. */

const oatrDefaultChooseAdvisor = chooseAdvisor;
const oatrDefaultConsequenceText = consequenceText;

questionText = function(q) {
  if (q.branchText) return q.branchText;
  if (OATR_KEY_TEXT[q.id]) return OATR_KEY_TEXT[q.id];
  return {
    body: ['The imperial record for this date is missing.'],
    quote: '“No memorandum was filed.”',
    speaker: 'Imperial Chancellery'
  };
};

baseChoicesFor = function(q) {
  const override = OATR_BRANCHING?.choiceOverrides?.[q.id];
  if (override) {
    const overridden = override(branchContext());
    if (overridden) return overridden;
  }
  return OATR_SPECIAL_CHOICES[q.id] || [['Close the file.', { door: 1 }]];
};

chooseAdvisor = function(q) {
  const key = typeof oatrEventAdvisor === 'function' ? oatrEventAdvisor(q.id) : null;
  if (key && OATR_ADVISORS[key]) return OATR_ADVISORS[key];
  return oatrDefaultChooseAdvisor(q);
};

consequenceText = function(effects, advisor) {
  const q = currentQuestion();
  const bespoke = q && typeof oatrEventAdvice === 'function' ? oatrEventAdvice(q.id) : null;
  if (bespoke) return bespoke;
  return oatrDefaultConsequenceText(effects, advisor);
};

// Re-render once so the opening screen is guaranteed to use the fully installed content layer.
render();
