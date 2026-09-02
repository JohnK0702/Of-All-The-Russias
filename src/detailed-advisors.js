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

function oatrAnswerSpecificAdvice(q, effects, advisor) {
  const choiceIndex = state.pending?.choiceIndex ?? -1;
  const choices = baseChoicesFor(q);
  const choice = choices[choiceIndex];
  const label = choice?.[0] || state.pending?.label || 'The order';
  const e = effects || {};
  const parts = [];

  // React to what this answer actually does, not merely to the event in the abstract.
  if ((e.door || 0) >= 2) {
    parts.push('You have chosen not to decide. That is still a decision: the ministries, governors and generals will spend the silence for you.');
  } else if ((e.blood || 0) >= 3 && (e.autocracy || 0) >= 2) {
    parts.push('This will make obedience unmistakable in the short term. It will also teach every opponent of the Crown that force is the final language of the state.');
  } else if ((e.reform || 0) >= 2 && (e.legitimacy || 0) >= 2) {
    parts.push('You are spending some of the Crown’s freedom of action to buy consent and institutions. If the promise is honored tomorrow, this can become authority rather than merely concession.');
  } else if ((e.reform || 0) >= 2 && (e.autocracy || 0) <= -1) {
    parts.push('You have deliberately made the state less personal. That weakens your discretion now, but it may leave the monarchy stronger when the man wearing the crown is absent, tired or wrong.');
  } else if ((e.autocracy || 0) >= 2 && (e.legitimacy || 0) <= -1) {
    parts.push('The order strengthens the hand of the sovereign and narrows the room for argument. Do not confuse the disappearance of argument with the disappearance of opposition.');
  } else if ((e.military || 0) >= 2) {
    parts.push('You have treated this as a problem of capability rather than prestige. That is less satisfying at court and considerably more useful to men who may someday have to fight.');
  } else if ((e.land || 0) >= 2) {
    parts.push('This answer moves the peasant question from speeches into property. Men defend abstractions poorly; they defend land with extraordinary seriousness.');
  } else if ((e.pressure || 0) <= -2) {
    parts.push('You have bought time. Russia has often mistaken purchased time for proof that the underlying problem has disappeared.');
  } else if ((e.pressure || 0) >= 2) {
    parts.push('The immediate problem has been made sharper rather than smaller. The next decision will arrive with less room around it.');
  } else if ((e.legitimacy || 0) >= 2) {
    parts.push('This answer asks your subjects to believe the Crown has heard them. That belief is useful only if the next order does not immediately contradict it.');
  } else if ((e.legitimacy || 0) <= -2) {
    parts.push('The state may still secure compliance, but this answer spends belief in the Crown to obtain it. Belief is slower to replenish than ammunition.');
  } else if ((e.britain || 0) >= 2) {
    parts.push('You have chosen the explanation in which London is somewhere behind the curtain. It is a comforting theory because it requires very little examination of ourselves.');
  } else if ((e.veil || 0) >= 2) {
    parts.push('You have allowed the private, sacred world of the palace to enter a matter of state. Once those worlds touch, separating them again will be difficult.');
  } else {
    parts.push(`The order — “${label}” — changes less immediately than its alternatives, but it still establishes a precedent the government will remember.`);
  }

  // Add one secondary consequence when it materially distinguishes this answer.
  if ((e.blood || 0) >= 2 && !parts[0].includes('force')) parts.push('Blood enters the account, and Russia is very poor at closing accounts.');
  else if ((e.leverage || 0) >= 2) parts.push('Reformers will have more leverage after this because the old answer now looks less sufficient.');
  else if ((e.leverage || 0) <= -2) parts.push('The palace will read survival as vindication, which may make the next reform harder rather than easier.');
  else if ((e.economy || 0) >= 2) parts.push('The treasury and the railways gain breathing room; that is political capital whether the court admits it or not.');
  else if ((e.economy || 0) <= -2) parts.push('The bill will arrive through the treasury even if the political cost is postponed.');

  const eventAdvice = typeof oatrEventAdvice === 'function' ? oatrEventAdvice(q.id) : null;
  if (eventAdvice) parts.push(eventAdvice);
  else if (advisor?.tone) parts.push(advisor.tone);

  return parts.join(' ');
}

consequenceText = function(effects, advisor) {
  const q = currentQuestion();
  if (q && state.pending) return oatrAnswerSpecificAdvice(q, effects, advisor);
  return oatrDefaultConsequenceText(effects, advisor);
};

// Re-render once so the opening screen is guaranteed to use the fully installed content layer.
render();
