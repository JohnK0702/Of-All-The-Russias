/* Replace score-template advisor chatter with event-specific counsel.
   Loaded after main.js so these assignments override the engine defaults. */

const oatrDefaultChooseAdvisor = chooseAdvisor;
const oatrDefaultConsequenceText = consequenceText;

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
