/* Consequence continuity pass.

   This layer exists for one reason: a decision must be allowed to make later history stop looking
   historical.  If Nicholas saves Stolypin, Stolypin is not shot five minutes later because the
   calendar says 1911.  If Rasputin is expelled, he does not wander back into dialogue as though
   the flag were decorative.  If Russia spends years building a Berlin channel, the German embassy
   does not perform the untouched historical scene unless that relationship has actually collapsed.

   Loaded after the other branch/advisor modules so these are continuity rules of last resort. */

function oatrContinuityOverrideChoices(id, resolver) {
  const prior = OATR_BRANCHING.choiceOverrides[id];
  OATR_BRANCHING.choiceOverrides[id] = ctx => {
    const result = resolver(ctx, prior);
    if (result !== null && result !== undefined) return result;
    return typeof prior === 'function' ? prior(ctx) : prior;
  };
}

function oatrRasputinExiled(ctx) {
  return (ctx.flag('rasputinBanish') || ctx.flag('rasputinBanishFinal')) && !ctx.flag('rasputinRecalled');
}

function oatrGermanDetente(ctx) {
  return ['germanophile','willyNicky','berlinUnderstanding','continentalCompact','germanAlignment1914']
    .some(flag => ctx.flag(flag));
}

function oatrGermanChannelOpen(ctx) {
  if (!oatrGermanDetente(ctx)) return false;
  if (ctx.flag('war1914') || ctx.flag('warMachine')) return false;
  if (ctx.flag('secretSerbiaGuarantee') || ctx.flag('serbiaPatron1914')) return false;
  if (ctx.flag('generalMobilization') && !ctx.flag('mobilizationReversed')) return false;
  return true;
}

/* -------------------------------------------------------------------------- */
/* STOLYPIN: SECURITY HAS AN ACTUAL EFFECT                                    */
/* -------------------------------------------------------------------------- */

addVariant(35, {
  when: ctx => ctx.flag('stolypinProtected'),
  title: 'The pistol at the checkpoint',
  text: {
    body: [
      'Dmitry Bogrov reaches the Kiev theatre with a Browning pistol in his coat. He does not reach Stolypin.',
      'The revised security detail searches him at the inner checkpoint. The weapon is found. More embarrassing still, the arrested man is known to the Okhrana as an informant. By the interval, half the theatre knows that somebody intended to murder the Prime Minister and that the political police knew his name before the guards did.',
      'Stolypin is alive. There is no blood on the white waistcoat, no deathbed blessing, no funeral to simplify the politics. Instead there is a living Prime Minister, a captured assassin, and a security service with explaining to do.'
    ],
    quote: '“Majesty, I asked for guards. I did not expect them to discover a constitutional question in the assassin’s pocket.”',
    speaker: 'Pyotr Stolypin'
  }
});

oatrContinuityOverrideChoices(35, ctx => {
  if (!ctx.flag('stolypinProtected')) return null;
  return [
    ['Put Bogrov on public trial and investigate every Okhrana officer who handled him.', { reform: 2, legitimacy: 2, blood: -1, flags: ['stolypinLives','bogrovStopped','okhranaInquiry'] }],
    ['Keep the arrest quiet. Stolypin is alive; do not turn a failed murder into another national crisis.', { legitimacy: 1, door: 1, flags: ['stolypinLives','bogrovStopped'] }],
    ['Give Stolypin direct authority to rebuild his own protection and purge compromised officials.', { reform: 1, autocracy: 1, leverage: 1, flags: ['stolypinLives','bogrovStopped','stolypinSecondWind'] }],
    ['Treat the plot as proof that the revolutionary underground requires harsher policing, whatever Bogrov’s relationship with the Okhrana.', { autocracy: 2, blood: 1, legitimacy: -1, flags: ['stolypinLives','bogrovStopped'] }]
  ];
});

addVariant(36, {
  when: ctx => ctx.flag('bogrovStopped') && ctx.flag('stolypinLives'),
  title: 'Stolypin comes back to work',
  text: {
    body: [
      'There is no vacancy in the Council of Ministers. Stolypin returns from Kiev irritated, alive, and newly aware that the man sent to kill him had been moving through the political police’s own shadow world.',
      'Preventing the assassination has denied the court a martyr and denied his enemies a convenient succession. It has also given Stolypin a fact he intends to use mercilessly: the state nearly lost its Prime Minister because its security machinery could not distinguish an informant from a murderer.',
      'He asks for authority while everyone still remembers how close the pistol came to the aisle.'
    ],
    quote: '“Twenty years, Majesty. I have become considerably more interested in receiving all twenty.”',
    speaker: 'Pyotr Stolypin'
  }
});

oatrContinuityOverrideChoices(36, ctx => {
  if (!ctx.flag('bogrovStopped') || !ctx.flag('stolypinLives')) return null;
  return [
    ['Back him openly. Use the exposed plot to finish the land, local-government and administrative program.', { reform: 3, land: 3, legitimacy: 2, leverage: 2, flags: ['stolypinLives','stolypinSecondWind'] }],
    ['Keep Stolypin, but narrow the program to land, credit and economic modernization.', { land: 2, economy: 2, reform: 1, flags: ['stolypinLives','stolypinEconomicOnly'] }],
    ['He has survived the assassin and exhausted the court. Move him to an honorary post before the next crisis.', { autocracy: 2, reform: -1, land: -1, flags: ['stolypinLives','stolypinRetires'] }],
    ['Make the Okhrana relationship with Bogrov the issue. Stolypin stays while the service is rebuilt under ministerial law.', { reform: 2, legitimacy: 2, flags: ['stolypinLives','okhranaReformed','legalPolice'] }]
  ];
});

/* -------------------------------------------------------------------------- */
/* RASPUTIN: EXILE MEANS ABSENCE UNTIL THE PLAYER RECALLS HIM                 */
/* -------------------------------------------------------------------------- */

oatrContinuityOverrideChoices(41, (ctx, prior) => {
  const choices = typeof prior === 'function' ? prior(ctx) : (prior || OATR_SPECIAL_CHOICES[41]);
  if (!choices) return null;
  return choices.map(([label, effects], index) => {
    if (index !== choices.length - 1 && !/out of petersburg|banish|send .* away/i.test(label)) return [label, effects];
    return [label, { ...effects, flags: [...(effects.flags || []), 'rasputinBanishFinal'] }];
  });
});

addVariant(52, {
  when: ctx => oatrRasputinExiled(ctx),
  title: 'Alexei without the starets',
  text: {
    body: [
      'Alexei is bleeding again. Rasputin is not in the palace, not in the corridor, and not waiting in an antechamber for somebody to pretend he has no influence. You sent him away and the order has held.',
      'The doctors work. Alexandra sits beside the bed and says very little to you. Petersburg has received what it demanded: distance between the starets and the dynasty. The private cost of that distance is now occurring behind a locked door nobody outside the family is permitted to understand.',
      'A telegram can reach Siberia. So can another imperial order. The question is whether exile was a boundary or merely an interval until the next hemorrhage.'
    ],
    quote: '“You promised me he would be gone. You did not promise me I would stop wanting him here.”',
    speaker: 'Alexandra Feodorovna'
  }
});

oatrContinuityOverrideChoices(52, ctx => {
  if (!oatrRasputinExiled(ctx)) return null;
  return [
    ['Keep the banishment. Tell a small circle of ministers the truth about Alexei so the palace no longer has to explain the absence with lies.', { legitimacy: 2, veil: -2, door: -1, flags: ['alexeiDisclosed','rasputinBanishFinal'] }],
    ['Permit Rasputin to send private telegrams to Alexandra, but do not allow him back to Petersburg.', { faith: 1, veil: 1, flags: ['rasputinBanishFinal','rasputinExileCorrespondence'] }],
    ['Recall him for Alexei only. No ministers, no appointments, no state papers.', { faith: 1, veil: 1, legitimacy: 1, flags: ['rasputinRecalled','rasputinLimited','alexeiRasputin'] }],
    ['End the banishment. If he can calm the boy, Petersburg may endure the scandal.', { veil: 4, legitimacy: -2, flags: ['rasputinRecalled','rasputinAtCourt','rasputinTrusted','alexeiRasputin'] }]
  ];
});

addVariant(65, {
  when: ctx => oatrRasputinExiled(ctx) && !ctx.flag('continentalCompact'),
  title: 'Alexandra says hold',
  text: {
    body: [
      'Alexandra wants you to resist the men who speak as though mobilization has become a natural law. She distrusts Sazonov, distrusts the Duma, distrusts half the court, and remains entirely certain that a German-Russian war would be a catastrophe.',
      'There is no warning from Rasputin. You sent him away. Whatever case exists for peace must now survive without prophecy attached to it.',
      'The palace offers what it has always offered you in a crisis: love, fear, certainty and no railway timetable.'
    ],
    quote: '“Do not let them tell you that because the orders are prepared, God has already signed them.”',
    speaker: 'Alexandra Feodorovna'
  }
});

oatrContinuityOverrideChoices(65, (ctx, prior) => {
  if (!oatrRasputinExiled(ctx) || ctx.flag('continentalCompact')) return null;
  const choices = (typeof prior === 'function' ? prior(ctx) : prior) || OATR_SPECIAL_CHOICES[65];
  return choices.map(([label, effects]) => /rasputin|grigori/i.test(label)
    ? ['Suspend every measure aimed at general war on your own authority. No prophet is required to know what the trains are carrying toward.', { pressure: -2, autocracy: 1, flags: ['julyRestraint'] }]
    : [label, effects]);
});

/* -------------------------------------------------------------------------- */
/* GERMANY: DETENTE CHANGES WHAT 1 AUGUST LOOKS LIKE                          */
/* -------------------------------------------------------------------------- */

addVariant(68, {
  when: ctx => oatrGermanChannelOpen(ctx),
  title: 'The embassy lights stay on',
  text: {
    body: [
      'The German embassy is still open. No files are burning in the courtyard. Count Pourtalès is receiving telegrams instead of destroying them.',
      'That fact is political now. Years of tentative rapprochement have created a channel neither government is willing to kill merely because the old alliance map says the two empires should already be enemies. Crowds gather outside expecting a rupture and are disappointed by clerks continuing to enter through the front door.',
      'France wants reassurance. Vienna wants to know whether Berlin has traded Austrian freedom of action for Russian friendship. Britain wants to know whether the continental balance has just changed while everyone was looking at Serbia.',
      'The relationship with Germany has not solved the crisis. It has changed what can still happen inside it.'
    ],
    quote: '“Majesty, an embassy that has not burned its papers is still a diplomatic instrument.”',
    speaker: 'Sergei Sazonov'
  }
});

addVariant(68, {
  when: ctx => oatrGermanDetente(ctx) && !oatrGermanChannelOpen(ctx),
  title: 'Pourtalès asks for one last audience',
  text: {
    body: [
      'The German embassy does not look like an enemy mission yet. The archives are being crated, the cipher room is locked, and Count Pourtalès has asked to see you before Berlin decides the relationship built over the previous years is finished.',
      'That is the difference the détente has bought you: not automatic peace, but one final human channel where the historical timetable expected only smoke and ultimatums.',
      'German officers believe Russian military measures have made their own plans unavoidable. Russian ministers insist Berlin is using its plans to manufacture inevitability. Pourtalès wants to know whether the cousins’ correspondence, the private talks and every previous assurance were policy or decoration.',
      'If the relationship dies tonight, it will die consciously.'
    ],
    quote: '“I have not burned the papers, Majesty. I would prefer not to discover that this was sentimentality.”',
    speaker: 'Count Friedrich von Pourtalès'
  }
});

oatrContinuityOverrideChoices(68, ctx => {
  if (!oatrGermanDetente(ctx)) return null;
  if (oatrGermanChannelOpen(ctx)) return [
    ['Keep the embassy channel open and propose a written Russo-German standstill while Berlin finishes restraining Vienna.', { legitimacy: 2, pressure: -2, flags: ['detenteSurvivesJuly','willyNicky'] }],
    ['Tell Berlin the crisis settlement is enough. Preserve good relations without turning the understanding into an alliance.', { legitimacy: 1, pressure: -1, flags: ['detenteSurvivesJuly'] }],
    ['Bring France into the arrangement. Russia will not trade one automatic bloc for another.', { reform: 1, legitimacy: 2, flags: ['europeanConcert1914','detenteSurvivesJuly'] }],
    ['End the experiment now. Reaffirm France and Serbia before Berlin mistakes restraint for realignment.', { empire: 1, pressure: 2, flags: ['germanDetenteBroken','francePrimary1914'] }]
  ];
  return [
    ['Receive Pourtalès personally and offer a simultaneous Russian-German stand-down before either embassy closes.', { legitimacy: 2, pressure: -2, flags: ['detenteLastChance','willyNicky'] }],
    ['Let Sazonov negotiate the rupture. Keep the embassy protected and leave a channel for the morning.', { legitimacy: 1, pressure: 0, flags: ['detenteLastChance'] }],
    ['Publish the Russo-German correspondence. If the understanding is dying, let Europe see where and why it failed.', { legitimacy: 2, reform: 1, pressure: 1, flags: ['germanDetenteBroken'] }],
    ['Refuse the audience. The military facts have overtaken the personal relationship.', { autocracy: 1, blood: 2, pressure: 3, flags: ['germanDetenteBroken','war1914'] }]
  ];
});

/* A banished Rasputin must also disappear from the advisor chair. */
const OATR_CHOOSE_ADVISOR_BEFORE_CONTINUITY = chooseAdvisor;
chooseAdvisor = function(q) {
  const advisor = OATR_CHOOSE_ADVISOR_BEFORE_CONTINUITY(q);
  const ctx = branchContext();
  if (oatrRasputinExiled(ctx) && advisor === OATR_ADVISORS.rasputin) {
    if (q.id >= 56) return q.set === 'military' ? OATR_ADVISORS.nicholas : OATR_ADVISORS.sazonov;
    return OATR_ADVISORS.alexandra;
  }
  return advisor;
};

/* Some base copy mentions Rasputin directly.  Preserve stronger route-specific copy when it has
   already removed him; only replace scenes that would otherwise resurrect an exiled man. */
const OATR_QUESTION_TEXT_BEFORE_CONTINUITY = questionText;
questionText = function(q) {
  const copy = OATR_QUESTION_TEXT_BEFORE_CONTINUITY(q);
  const ctx = branchContext();
  if (!oatrRasputinExiled(ctx) || !copy) return copy;

  const mentionsHim = /rasputin|grigori/i.test(JSON.stringify(copy));
  if (!mentionsHim) return copy;

  if (q.id === 52) return {
    body: [
      'Alexei is ill again. The doctors remain in charge because the man Alexandra once summoned in desperation is still outside Petersburg by your order.',
      'The illness remains secret, which means the public sees only the family’s strain and invents explanations for it.'
    ],
    quote: '“The boy is no better for the fact that society is satisfied.”',
    speaker: 'Alexandra Feodorovna'
  };

  if (q.id === 65) return {
    body: [
      'Alexandra begs you not to let staff plans decide whether Europe goes to war. There is no prophetic telegram on the desk and no Siberian voice in the room.',
      'The argument for restraint must stand on its own: Russian interests, Russian lives and your authority to stop an order that has not yet become fate.'
    ],
    quote: '“Prepared is not the same word as inevitable, Nicky.”',
    speaker: 'Alexandra Feodorovna'
  };

  if (q.id === 70) return {
    body: [
      'The final orders are waiting. Germany and Russia are at the edge of formal war. The palace is quiet enough that the clocks sound accusatory.',
      'No holy man is here to tell you what the blood will mean. Ministers, generals and ambassadors have given you all the certainty they possess. The last decision is yours without an oracle.'
    ],
    quote: '“There is still time to stop the trains. There is no longer time to pretend somebody else started them.”',
    speaker: 'Sergei Sazonov'
  };

  return copy;
};

oatrContinuityOverrideChoices(70, (ctx, prior) => {
  if (!oatrRasputinExiled(ctx)) return null;
  const choices = (typeof prior === 'function' ? prior(ctx) : prior) || OATR_SPECIAL_CHOICES[70];
  return choices.map(([label, effects]) => /rasputin|grigori/i.test(label)
    ? ['Dissolve the Duma, vest emergency authority in the high command, and place the rest in God’s hands.', { ...effects }]
    : [label, effects]);
});

/* Make the route state visible without a debugger. */
const OATR_ROUTE_WHISPER_BEFORE_CONTINUITY = routeWhisper;
routeWhisper = function() {
  const ctx = branchContext();
  if (ctx.flag('bogrovStopped') && ctx.flag('stolypinLives') && !ctx.flag('stolypinRetires')) return 'Stolypin is still alive. The future now has to argue with him instead of burying him.';
  if (oatrRasputinExiled(ctx)) return 'The starets is gone. The palace must live with the silence it asked for.';
  if (ctx.flag('detenteSurvivesJuly')) return 'Berlin is still answering the telephone.';
  if (oatrGermanDetente(ctx) && ctx.flag('germanDetenteBroken')) return 'The German opening existed. Its collapse is now part of the crisis, not a forgotten choice.';
  return OATR_ROUTE_WHISPER_BEFORE_CONTINUITY();
};

/* This file loads late; refresh the currently visible page so a restored save immediately obeys
   the continuity rules instead of waiting for the next click. */
if (typeof render === 'function') render();
