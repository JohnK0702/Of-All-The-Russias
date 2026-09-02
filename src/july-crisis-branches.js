/* Deep July Crisis branching.
   Loaded after ending-paths.js so it can prepend route-specific variants without replacing
   the existing canon, Eschaton, or fail-route machinery.

   Principle: once Nicholas has deliberately pursued the German opening, July 1914 stops being
   the historical crisis with different flavor text. Vienna, Berlin, Serbia, France, Britain and
   the Russian General Staff react to the Russia the player actually built. */

const oatrJulyGerman = ctx => ctx.flag('germanophile') || ctx.flag('berlinUnderstanding') || ctx.flag('continentalCompact');
const oatrJulyBerlinLocked = ctx => ctx.flag('berlinUnderstanding') || ctx.flag('continentalCompact') || ctx.flag('serbiaAbandoned1914');

addVariant(56, {
  when: ctx => oatrJulyGerman(ctx),
  title: 'Sarajevo — Berlin calls first',
  text: {
    body: [
      'The Archduke is dead. Vienna blames Belgrade before the bodies are cold. Berlin asks a different question: whether the understanding cultivated with Russia is real when it finally becomes expensive.',
      'The German ambassador proposes a continental bargain. Russia will not guarantee Serbia against an Austrian reckoning; Germany will restrain Vienna from annexation, permanent occupation, or a general Balkan war. France is not consulted.',
      'Sazonov objects that a Great Power cannot publicly abandon a client and remain a Great Power. The reply from Berlin is that perhaps Russia can become something rarer: a Great Power that chooses its clients.'
    ],
    quote: '“If we mean to change Europe, Nicky, this is the hour in which Europe discovers whether we meant it.”',
    speaker: 'A private telegram from Wilhelm II'
  }
});

addVariant(57, {
  when: ctx => ctx.flag('berlinUnderstanding'),
  title: 'The blank cheque acquires handwriting',
  text: {
    body: [
      'Vienna receives German support, but not the support it expected. Berlin has added Russian conditions: no annexation of Serbia, no permanent occupation, no destruction of the Serbian state.',
      'The Ballhausplatz is furious that Petersburg has entered the room through Berlin. The Serbian government is more alarmed still. Belgrade had counted on Russian patronage as a fact of nature.',
      'For the first time in the crisis, Austria must decide whether punishment is worth risking the alignment of the two empires behind its shoulder.'
    ],
    quote: '“They wanted a blank cheque. We have given them a promissory note with three signatures and several unpleasant clauses.”',
    speaker: 'Foreign Ministry memorandum'
  }
});

addVariant(58, {
  when: ctx => ctx.flag('berlinUnderstanding'),
  title: 'Belgrade discovers the price of friendship',
  text: {
    body: [
      'The Serbian cabinet asks directly whether Russia will fight if Austria invades. There is no useful way to answer indirectly now.',
      'Paris urges firmness. Berlin urges clarity. Vienna waits to see whether Serbian resistance is backed by Russian bayonets or only Russian sentiment.',
      'A guarantee would rupture the German understanding at the moment it is being tested. Refusing one may preserve Europe by teaching Belgrade that Russian affection is not an insurance policy.'
    ],
    quote: '“We have spent years telling Serbia that she is our brother. Brothers eventually ask whether you will come when the door is kicked in.”',
    speaker: 'Sergei Sazonov'
  }
});

addVariant(59, {
  when: ctx => ctx.flag('serbiaAbandoned1914'),
  title: 'The ultimatum becomes negotiable',
  text: {
    body: [
      'Austria drafts its ultimatum knowing that Russia has declined to issue an automatic guarantee to Serbia. The most reckless clauses suddenly look less necessary to Vienna and more dangerous to Berlin.',
      'German diplomats press the Austrians to demand arrests, suppression of nationalist organizations and participation in the investigation—but to stop short of powers that would make Serbia a protectorate in all but name.',
      'Belgrade now has something history rarely offers small states in crises: terrible choices that are still choices.'
    ],
    quote: '“The absence of a Russian guarantee has done more to moderate Vienna than a dozen threats would have done.”',
    speaker: 'German embassy memorandum'
  }
});

addVariant(60, {
  when: ctx => ctx.flag('serbiaAbandoned1914') && !ctx.flag('austriaHumiliated'),
  title: 'Serbia bends',
  text: {
    body: [
      'Belgrade accepts nearly every Austrian demand and offers international supervision for the remainder. There are demonstrations, curses against Vienna and not a few against Petersburg.',
      'The Austrian army has mobilized enough men to make retreat politically costly. Conrad wants to strike anyway. Berlin warns that a punitive occupation after Serbian submission would destroy the very arrangement that isolated Serbia.',
      'The crisis has narrowed. Europe is no longer arguing about whether Austria may punish Serbia. It is arguing about whether punishment requires war.'
    ],
    quote: '“Majesty, we have maneuvered them to the edge. The difficulty is that generals dislike edges unless they may march over them.”',
    speaker: 'Sergei Sazonov'
  }
});

addVariant(61, {
  when: ctx => ctx.flag('continentalCompact'),
  title: 'The conference of three emperors',
  text: {
    body: [
      'Berlin proposes what would have sounded absurd a month ago: Germany, Russia and Austria-Hungary will settle the Serbian question directly before either army crosses a frontier.',
      'France protests that Russia is revising the European balance without her. Britain welcomes mediation while quietly asking what a durable Russo-German understanding would mean for the continent.',
      'The old alliance map has not vanished. It has simply begun to discover that maps are promises made by governments that can change their minds.'
    ],
    quote: '“Paris financed our railways. It did not purchase the right to decide when Russian soldiers die.”',
    speaker: 'Council memorandum for the Emperor'
  }
});

addVariant(62, {
  when: ctx => ctx.flag('continentalCompact'),
  title: 'Vienna accepts a smaller victory',
  text: {
    body: [
      'Austria accepts a face-saving settlement: Serbian officers implicated in the conspiracy will be tried, nationalist organizations suppressed, and an international commission seated in Belgrade. Austrian troops do not cross the frontier.',
      'The Serbian press calls it humiliation. The Austrian General Staff calls it cowardice. German diplomats call it Tuesday.',
      'Russia has preserved Serbia as a state by refusing to promise Serbia a war.'
    ],
    quote: '“It is not a glorious settlement. That is usually how one recognizes a successful settlement.”',
    speaker: 'Sergei Sazonov'
  }
});

addVariant(63, {
  when: ctx => ctx.flag('continentalCompact'),
  title: 'Paris asks what alliance means',
  text: {
    body: [
      'The French ambassador requests an explicit statement that the Franco-Russian Alliance remains the foundation of Russian policy. The wording is careful because the answer is no longer obvious.',
      'France can remain a friend, creditor and military partner. What it cannot remain, if the Berlin understanding is real, is the mechanism by which every Austro-Serbian quarrel becomes a continental war.',
      'The decision before you is no longer Serbia or Austria. It is whether Russia intends to belong to one bloc, balance between blocs, or make blocs themselves obsolete.'
    ],
    quote: '“Alliances are supposed to increase freedom of action. When they remove it, diplomats begin using the word destiny.”',
    speaker: 'Foreign Ministry memorandum'
  }
});

addVariant(64, {
  when: ctx => ctx.flag('continentalCompact'),
  title: 'The General Staff has no timetable for peace',
  text: {
    body: [
      'Yanushkevich and Sukhomlinov arrive with mobilization tables prepared for a war that diplomacy is now preventing. They dislike the situation almost aesthetically.',
      'Partial measures against Austria disrupt the schedules for general mobilization against Germany. No mobilization preserves the diplomatic opening but leaves Russia dependent on Berlin keeping Vienna honest.',
      'For years the army has prepared to answer one question perfectly. You have changed the question.'
    ],
    quote: '“Majesty, railway timetables are excellent servants and very poor foreign ministers.”',
    speaker: 'Council of Ministers memorandum'
  }
});

addVariant(65, {
  when: ctx => ctx.flag('continentalCompact') && !ctx.flag('generalMobilization'),
  title: 'Willy–Nicky without the abyss',
  text: {
    body: [
      'Wilhelm wires personally. There is urgency in the telegrams but no accusation that Russian mobilization has made German war plans unavoidable.',
      'He asks you to hold the army while he compels Vienna to accept the conference settlement. In return he offers a written German guarantee of Serbian territorial integrity after compliance with the ultimatum.',
      'For once the cousins are not trying to stop machines they have already started. They are deciding whether to start them.'
    ],
    quote: '“Give me forty-eight hours, Nicky. If Vienna refuses us both, then we shall know what sort of ally I possess.”',
    speaker: 'Wilhelm II'
  }
});

addVariant(66, {
  when: ctx => ctx.flag('continentalCompact') && !ctx.flag('generalMobilization'),
  title: 'The order that is not sent',
  text: {
    body: [
      'The mobilization forms are complete. The telegraph offices are waiting. No clerk has yet transmitted the order that will turn diplomatic pressure into railway fact.',
      'The General Staff insists delay costs days. The Foreign Ministry replies that days are precisely what the settlement requires.',
      'There is still a distinction between preparing for war and making war the only administratively convenient outcome.'
    ],
    quote: '“Nothing has happened yet, Majesty. That sentence is becoming a strategic asset.”',
    speaker: 'Vladimir Kokovtsov'
  }
});

addVariant(67, {
  when: ctx => ctx.flag('continentalCompact') && !ctx.flag('generalMobilization'),
  title: 'Austria stops at the frontier',
  text: {
    body: [
      'Vienna accepts the final formula. Serbian compliance will be verified by a mixed commission. Austrian formations remain concentrated but receive no order to invade.',
      'There is rage in Belgrade, bitterness in Vienna, relief in Berlin and suspicion in Paris. None of these emotions has yet killed anyone.',
      'The crisis that began with a murder has produced a settlement ugly enough to survive contact with the interests of the men who must sign it.'
    ],
    quote: '“Europe has been saved by allowing everybody to claim they were not the one who blinked.”',
    speaker: 'Foreign Ministry marginal note'
  }
});

addVariant(68, {
  when: ctx => ctx.flag('continentalCompact') && !ctx.flag('generalMobilization'),
  title: 'The alliance map cracks quietly',
  text: {
    body: [
      'French newspapers accuse Russia of sacrificing Slav honor to German pressure. German newspapers discover that Russians can occasionally be described without the word barbarian. British editors become fascinated by continental equilibrium.',
      'Inside Russia the reaction is stranger. Liberals praise peace and distrust Berlin. Nationalists denounce Serbia and Germany in alternating paragraphs. The army resents a crisis in which diplomacy has deprived it of vindication.',
      'Avoiding war has not simplified politics. It has merely ensured that politics continues.'
    ],
    quote: '“Peace is not the absence of consequences. It is the privilege of receiving consequences that do not arrive in coffins.”',
    speaker: 'Vladimir Kokovtsov'
  }
});

addVariant(69, {
  when: ctx => ctx.flag('continentalCompact') && !ctx.flag('generalMobilization'),
  title: 'What have you made in Europe?',
  text: {
    body: [
      'The Serbian crisis is closed. No general mobilization has been ordered. No German ultimatum has arrived. The French alliance remains on paper, but Russia and Germany have just demonstrated that they can jointly restrain Austria without destroying Serbia.',
      'This is not friendship in the sentimental sense. It is something more dangerous to the old order: proof that the alignment of Europe is negotiable.',
      'You must decide whether July was an emergency arrangement to be forgotten or the foundation of Russian strategy after 1914.'
    ],
    quote: '“Majesty, we have discovered that the road to Berlin does not necessarily pass through a battlefield.”',
    speaker: 'Foreign Ministry memorandum'
  }
});

addVariant(70, {
  when: ctx => ctx.flag('continentalCompact') && !ctx.flag('generalMobilization'),
  title: '1 August 1914 — the trains remain ordinary trains',
  text: {
    body: [
      'Across the empire, railway stations are crowded with merchants, pilgrims, reservists returning to ordinary units and families traveling in the summer heat. There is no general mobilization order pasted beside the timetables.',
      'Austria has not invaded Serbia. Germany has not declared war on Russia. France is furious, relieved, or both depending on which ministry is speaking.',
      'The machinery built for continental war remains intact. So does the continent. You have not solved Europe. You have merely denied it the particular apocalypse for which every General Staff had prepared so carefully.'
    ],
    quote: '“No war today, Majesty.”',
    speaker: 'The morning memorandum'
  }
});

/* Route-specific choices. Each answer creates facts that later slots read. */
const oatrJulyChoiceOverrides = {
  56: ctx => oatrJulyGerman(ctx) ? [
    ['Accept Berlin’s formula: no Russian blank cheque to Serbia, and no Austrian annexation or destruction of Serbia.', { legitimacy: 1, empire: -1, pressure: -2, flags: ['berlinUnderstanding'] }],
    ['Tell Berlin the understanding ends where Serbian sovereignty begins. Russia will back Belgrade.', { empire: 2, pressure: 2, flags: ['serbiaPatron1914'] }],
    ['Offer joint mediation but make no commitment until Vienna states its demands.', { legitimacy: 1, door: 1, flags: ['julyMediation'] }],
    ['Encourage Vienna privately. A chastened Serbia may be useful to everyone.', { autocracy: 1, empire: -2, flags: ['berlinUnderstanding','serbiaAbandoned1914'] }]
  ] : null,
  57: ctx => ctx.flag('berlinUnderstanding') ? [
    ['Tell Berlin the conditions are firm: punish the conspirators, preserve the Serbian state.', { legitimacy: 1, pressure: -1, flags: ['continentalCompact'] }],
    ['Let Germany decide how far Vienna may go. Do not spend Russian prestige on the details.', { door: 2, empire: -1, flags: ['serbiaAbandoned1914'] }],
    ['Demand that Austria accept an international inquiry instead of unilateral action.', { legitimacy: 1, reform: 1, flags: ['julyMediation'] }],
    ['Reverse course and guarantee Serbia after all.', { empire: 2, pressure: 3, flags: ['serbiaPatron1914'] }]
  ] : null,
  58: ctx => ctx.flag('berlinUnderstanding') ? [
    ['Tell Belgrade plainly: comply with every demand compatible with sovereignty. Russia will not fight for refusal.', { pressure: -2, empire: -1, flags: ['serbiaAbandoned1914'] }],
    ['Give Serbia a secret guarantee while publicly maintaining the Berlin understanding.', { empire: 2, veil: 1, pressure: 3, flags: ['secretSerbiaGuarantee'] }],
    ['Promise diplomatic support but no military guarantee.', { legitimacy: 1, flags: ['serbiaDiplomaticOnly'] }],
    ['Tell Serbia to accept the ultimatum in full. The dynasty will survive humiliation better than Europe will survive war.', { pressure: -3, legitimacy: -1, flags: ['serbiaAbandoned1914','continentalCompact'] }]
  ] : null,
  59: ctx => ctx.flag('serbiaAbandoned1914') ? [
    ['Approve the moderated Austro-German text and pressure Serbia to accept it.', { pressure: -2, legitimacy: 1, flags: ['continentalCompact'] }],
    ['Insist that foreign participation in Serbian courts be removed, but accept the rest.', { legitimacy: 1, empire: 1, flags: ['continentalCompact'] }],
    ['Demand Austria withdraw the ultimatum entirely. Russia has conceded enough.', { empire: 2, pressure: 2, flags: ['austriaHumiliated'] }],
    ['Let Vienna issue its original text. Serbia must learn what isolation means.', { autocracy: 1, empire: -2, pressure: 1, flags: ['serbiaAbandoned1914'] }]
  ] : null,
  60: ctx => ctx.flag('serbiaAbandoned1914') ? [
    ['Tell Berlin Russia will accept a symbolic Austrian victory but not an invasion.', { pressure: -2, flags: ['continentalCompact'] }],
    ['Permit a brief Austrian border occupation as a guarantee of Serbian compliance.', { empire: -2, legitimacy: -1, flags: ['continentalCompact','austrianLimitedOccupation'] }],
    ['Warn Vienna that Serbian acceptance has exhausted its case for war.', { empire: 1, legitimacy: 1, flags: ['continentalCompact'] }],
    ['Do nothing. If Austria attacks after Serbian submission, Berlin may answer for its ally.', { door: 2, pressure: 1 }]
  ] : null,
  61: ctx => ctx.flag('continentalCompact') ? [
    ['Attend the three-emperor conference and make Serbian territorial integrity the Russian price of settlement.', { legitimacy: 2, pressure: -2, flags: ['threeEmperorsConference'] }],
    ['Invite France into the conference as well. A new arrangement need not mean an anti-French one.', { legitimacy: 1, reform: 1, flags: ['fourPowerConference'] }],
    ['Let Berlin mediate between Petersburg and Vienna without a formal conference.', { door: 1, pressure: -1 }],
    ['Reject the conference and return to alliance diplomacy.', { empire: 2, pressure: 2, flags: ['serbiaPatron1914'] }]
  ] : null,
  63: ctx => ctx.flag('continentalCompact') ? [
    ['Tell Paris the alliance remains, but it does not include an automatic Russian war over Serbia.', { legitimacy: 1, flags: ['franceReassured'] }],
    ['Begin moving Russian strategy toward an explicit continental understanding with Germany.', { economy: 1, britain: 2, empire: -1, flags: ['germanAlignment1914'] }],
    ['Offer France a tripartite Russia–France–Germany security conference after the crisis.', { reform: 1, legitimacy: 1, flags: ['europeanConcert1914'] }],
    ['Reaffirm the French alliance without qualification and quietly cool the German opening.', { empire: 1, flags: ['francePrimary1914'] }]
  ] : null,
  64: ctx => ctx.flag('continentalCompact') ? [
    ['Do not mobilize. Keep the army at readiness inside existing districts while diplomacy runs.', { military: 1, pressure: -2, flags: ['julyRestraint'] }],
    ['Authorize only administrative precautions with no troop movements toward Germany or Austria.', { military: 1, pressure: -1, flags: ['julyRestraint'] }],
    ['Begin partial mobilization against Austria despite Berlin’s assurances.', { military: 2, pressure: 2, flags: ['partialMobilization'] }],
    ['Order general mobilization. Diplomacy may fail; railways must not.', { military: 3, pressure: 4, flags: ['generalMobilization'] }]
  ] : null,
  65: ctx => ctx.flag('continentalCompact') && !ctx.flag('generalMobilization') ? [
    ['Give Willy forty-eight hours and hold every mobilization order.', { pressure: -2, legitimacy: 1, flags: ['willyNicky','julyRestraint'] }],
    ['Ask for the German guarantee in writing before holding the army.', { legitimacy: 1, pressure: -1, flags: ['willyNicky'] }],
    ['Hold against Germany but begin discreet precautions against Austria.', { military: 1, pressure: 1, flags: ['partialMobilization'] }],
    ['The cousins have talked enough. Authorize general mobilization.', { military: 3, pressure: 4, flags: ['generalMobilization'] }]
  ] : null,
  66: ctx => ctx.flag('continentalCompact') && !ctx.flag('generalMobilization') ? [
    ['Leave the forms unsigned.', { pressure: -2, legitimacy: 1, flags: ['mobilizationWithheld'] }],
    ['Prepare the telegram but require a second personal order before transmission.', { military: 1, pressure: -1, flags: ['mobilizationWithheld'] }],
    ['Issue partial mobilization against Austria only.', { military: 2, pressure: 2, flags: ['partialMobilization'] }],
    ['Send general mobilization.', { military: 3, pressure: 4, flags: ['generalMobilization'] }]
  ] : null,
  69: ctx => ctx.flag('continentalCompact') && !ctx.flag('generalMobilization') ? [
    ['Make the German understanding permanent: Russia will balance Europe with Berlin rather than against it.', { economy: 2, empire: -1, britain: 2, flags: ['germanAlignment1914','peace1914'] }],
    ['Restore distance from Germany now that the Serbian danger has passed, while keeping the precedent of mediation.', { legitimacy: 1, flags: ['peace1914'] }],
    ['Build a wider European concert with France and Germany both inside it.', { reform: 1, legitimacy: 2, flags: ['europeanConcert1914','peace1914'] }],
    ['Return to the Franco-Russian alliance as before. July was an exception.', { empire: 1, flags: ['francePrimary1914','peace1914'] }]
  ] : null,
  70: ctx => ctx.flag('continentalCompact') && !ctx.flag('generalMobilization') ? [
    ['Keep the peace settlement and begin negotiating a formal Russo-German continental accord.', { economy: 2, legitimacy: 2, flags: ['peace1914','germanAlignment1914'] }],
    ['Keep Europe at peace without binding Russia permanently to Berlin.', { legitimacy: 2, flags: ['peace1914'] }],
    ['Use the reprieve to accelerate army reform while remaining diplomatically uncommitted.', { military: 2, economy: 1, flags: ['peace1914'] }],
    ['Let the palace call it Providence and go to church.', { faith: 2, veil: 1, flags: ['peace1914'] }]
  ] : null
};

Object.entries(oatrJulyChoiceOverrides).forEach(([id, fn]) => {
  const prior = OATR_BRANCHING.choiceOverrides[id];
  OATR_BRANCHING.choiceOverrides[id] = ctx => fn(ctx) || (typeof prior === 'function' ? prior(ctx) : prior);
});
