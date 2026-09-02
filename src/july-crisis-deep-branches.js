/* Second-order July Crisis branching.
   Loaded after july-crisis-branches.js.

   The first July layer creates a German opening. This layer makes later choices bite: backing
   Serbia after courting Berlin, secretly double-dealing, humiliating Austria, allowing a limited
   occupation, inviting France into the settlement, or touching the mobilization machine all
   produce different crises rather than falling back into the same sequence with altered scores. */

const oatrJulyDeep = ctx => ({
  compact: ctx.flag('continentalCompact'),
  patron: ctx.flag('serbiaPatron1914'),
  secret: ctx.flag('secretSerbiaGuarantee'),
  humiliated: ctx.flag('austriaHumiliated'),
  occupation: ctx.flag('austrianLimitedOccupation'),
  partial: ctx.flag('partialMobilization'),
  general: ctx.flag('generalMobilization'),
  fourPower: ctx.flag('fourPowerConference'),
  concert: ctx.flag('europeanConcert1914'),
  german: ctx.flag('germanAlignment1914'),
  withheld: ctx.flag('mobilizationWithheld'),
  reversed: ctx.flag('mobilizationReversed1914')
});

/* --- THE GERMAN OPENING COLLAPSES OVER SERBIA -------------------------------- */

addVariant(57, {
  when: ctx => ctx.flag('serbiaPatron1914') && oatrJulyGerman(ctx),
  title: 'Berlin understands the limit',
  text: {
    body: [
      'Your answer reaches Berlin before Vienna has fixed its demands: Russia will not trade Serbian sovereignty for a continental understanding. The German ambassador does not threaten. He becomes formal.',
      'The distinction matters. Wilhelm had believed the Russian opening meant that the Balkan quarrel could be separated from the Franco-German one. Your guarantee tells him that Serbia still sits inside the mechanism.',
      'Vienna notices the change in tone immediately. A restrained Austrian ultimatum now looks less useful than a hard one. If Russia will stand behind Belgrade anyway, the Ballhausplatz sees little reason to leave itself room to retreat.'
    ],
    quote: '“The understanding was real until it encountered the first thing Russia considered non-negotiable.”',
    speaker: 'German embassy memorandum'
  }
});

addVariant(58, {
  when: ctx => ctx.flag('serbiaPatron1914') && oatrJulyGerman(ctx),
  title: 'Belgrade hears the old promise again',
  text: {
    body: [
      'The Serbian cabinet receives the assurance it wanted: Russia will not permit Austria to reduce Serbia by force. Ministers in Belgrade who had begun preparing for humiliating concessions now rediscover their courage.',
      'Paris approves. Berlin does not. Vienna concludes that any ultimatum designed to be accepted will merely leave the Serbian problem intact beneath a Russian guarantee.',
      'The crisis has changed shape again. Russia is not stumbling into the old alliance system by inertia. You have deliberately rebuilt it around Serbia after opening a door to Germany.'
    ],
    quote: '“Majesty, they will now bargain with the knowledge that we have promised to catch them if they fall.”',
    speaker: 'Sergei Sazonov'
  }
});

addVariant(59, {
  when: ctx => ctx.flag('serbiaPatron1914') && oatrJulyGerman(ctx),
  title: 'Vienna writes for refusal',
  text: {
    body: [
      'The Austrian ultimatum arrives with clauses drafted less to investigate Sarajevo than to establish whether Serbia is sovereign at all. Vienna expects rejection and has prepared the army accordingly.',
      'Germany has not withdrawn support from Austria. It has withdrawn the assumption that Russia can be detached from Serbia. The famous diplomatic bargain is therefore gone before the first mobilization order is issued.',
      'France asks what Russia intends to do next. Berlin asks the same question in colder language.'
    ],
    quote: '“We attempted to remove Serbia from the machinery. Your Majesty has put her back into it by hand.”',
    speaker: 'Foreign Ministry memorandum'
  }
});

/* --- THE SECRET GUARANTEE IS DISCOVERED -------------------------------------- */

addVariant(59, {
  when: ctx => ctx.flag('secretSerbiaGuarantee'),
  title: 'The second telegram',
  text: {
    body: [
      'Belgrade answers Vienna more boldly than Berlin expected. The reason appears in an intercepted Serbian telegram: Russia has privately promised what it publicly declined to promise.',
      'The German ambassador arrives carrying both texts. He is less angry about Serbia than about the discovery that the new Russo-German understanding has been used as cover for a Russian guarantee against Germany’s ally.',
      'Vienna now assumes every Russian concession may conceal its opposite. Berlin cannot restrain Austria without appearing to reward deception. You have created a crisis of credibility inside the crisis of alliances.'
    ],
    quote: '“Majesty, one may conduct secret diplomacy. It is more difficult to conduct two incompatible foreign policies in the same week.”',
    speaker: 'Vladimir Kokovtsov'
  }
});

addVariant(60, {
  when: ctx => ctx.flag('secretSerbiaGuarantee'),
  title: 'Berlin presents the receipt',
  text: {
    body: [
      'Germany demands an answer before it presses Vienna any further: does the private guarantee to Serbia stand or not?',
      'If it stands, the continental opening is finished and Austria will act with German support. If it is withdrawn, Serbia will learn that Russian guarantees can evaporate when exposed.',
      'There is no elegant option left. The purpose of the secret guarantee was to possess both policies. Discovery has forced you to choose one in public.'
    ],
    quote: '“The difficulty with duplicity is not moral, Majesty. It is administrative. Eventually both recipients compare papers.”',
    speaker: 'Foreign Ministry marginal note'
  }
});

/* --- AUSTRIA IS HUMILIATED AND GOES ROGUE ------------------------------------ */

addVariant(60, {
  when: ctx => ctx.flag('austriaHumiliated'),
  title: 'Vienna refuses the lesson',
  text: {
    body: [
      'Your demand that Austria withdraw the ultimatum entirely has produced the result the Ballhausplatz feared most: retreat under visible Russian pressure.',
      'Conrad and the war party argue that accepting such a humiliation would reduce Austria-Hungary to a German client supervised from Petersburg. Franz Joseph authorizes military action against Serbia before the diplomatic formula can be repaired.',
      'Berlin is furious with Vienna and unwilling to abandon it in the same hour. The German opening has not vanished, but it is now trapped between the ally Germany has and the Russia Germany had hoped to keep.'
    ],
    quote: '“We asked Vienna to choose between a smaller victory and humiliation. Your Majesty removed the smaller victory.”',
    speaker: 'German ambassador'
  }
});

addVariant(61, {
  when: ctx => ctx.flag('austriaHumiliated'),
  title: 'Belgrade is shelled anyway',
  text: {
    body: [
      'Austrian guns open on Belgrade. The diplomatic conference becomes a military fact before its invitations can be delivered.',
      'Germany proposes an emergency bargain: Russia will refrain from mobilization while Berlin orders Vienna to halt after occupying limited positions. Sazonov calls it blackmail conducted by an ally against an ally. The General Staff calls it the last moment in which mobilization can still be a choice.',
      'You sought to demonstrate that Russia could veto Austrian policy. Vienna has answered by asking whether the veto comes with an army.'
    ],
    quote: '“The first shells have done what diplomats could not. They have made every ambiguous promise expensive.”',
    speaker: 'Sergei Sazonov'
  }
});

/* --- LIMITED AUSTRIAN OCCUPATION --------------------------------------------- */

addVariant(61, {
  when: ctx => ctx.flag('austrianLimitedOccupation'),
  title: 'Austria crosses the river — and stops',
  text: {
    body: [
      'Austrian troops occupy a narrow belt opposite Belgrade and several Danube crossings under the formula you accepted: temporary security for Serbian compliance, not conquest.',
      'The arrangement is already rotting. Serbian reservists fire from villages outside the agreed zone. Austrian officers answer by widening patrols. Every kilometer creates a fresh argument about what “limited” meant.',
      'Berlin says the occupation can end in days if Serbia cooperates. Belgrade says cooperation under occupation is surrender. Russia must decide whether it will police the compromise it helped create.'
    ],
    quote: '“A limited occupation is a line on a map until a frightened lieutenant walks past it.”',
    speaker: 'Council of Ministers memorandum'
  }
});

addVariant(62, {
  when: ctx => ctx.flag('austrianLimitedOccupation'),
  title: 'The occupation develops edges',
  text: {
    body: [
      'The mixed commission reports genuine Serbian compliance in Belgrade and continued irregular violence near the Austrian zone. Vienna demands authority to pursue armed bands beyond the agreed line.',
      'Berlin asks Russia to help compel Serbia to disarm the frontier districts. Serbian ministers ask whether Russian diplomacy has now become the instrument by which Austria dictates Serbian policing.',
      'The continental compact can survive, but only if Russia accepts responsibility for restraining the client it refused to guarantee.'
    ],
    quote: '“We have prevented a war by making ourselves partially responsible for everyone’s behavior. This is called success.”',
    speaker: 'Vladimir Kokovtsov'
  }
});

/* --- FRANCE IS BROUGHT INTO THE SETTLEMENT ----------------------------------- */

addVariant(62, {
  when: ctx => ctx.flag('fourPowerConference'),
  title: 'Paris takes a chair',
  text: {
    body: [
      'France accepts the invitation. The Serbian settlement is no longer a private transaction among the three eastern empires. Paris now has a chair, a transcript and a reason not to fear that Russia is changing camps in secret.',
      'The price is that Germany must allow the Franco-Russian ally into a conference originally designed to escape bloc politics. Vienna dislikes the audience. Britain offers to endorse any agreement reached by all four powers.',
      'For the first time the crisis is being managed by a temporary concert rather than by two mobilizing alliances staring through one another.'
    ],
    quote: '“Majesty, if everyone is inside the conspiracy, diplomacy begins to resemble a conference.”',
    speaker: 'Sergei Sazonov'
  }
});

addVariant(63, {
  when: ctx => ctx.flag('fourPowerConference'),
  title: 'France asks for no declaration of loyalty',
  text: {
    body: [
      'The French ambassador no longer asks whether Russia has deserted the alliance. France has spent three days negotiating beside Germany and has discovered that mediation need not be capitulation.',
      'Paris instead proposes turning the emergency conference into a standing mechanism for Balkan disputes. Berlin is interested precisely because the proposal dilutes the automatic logic of the blocs without requiring either alliance to be formally dissolved.',
      'The question is whether July becomes a one-time improvisation or the beginning of a European concert rebuilt under modern conditions.'
    ],
    quote: '“A system that can only preserve peace by pretending the other side does not exist has a design defect.”',
    speaker: 'French ambassador Maurice Paléologue'
  }
});

/* --- PARTIAL MOBILIZATION POISONS, BUT DOES NOT KILL, THE COMPACT ------------- */

addVariant(65, {
  when: ctx => ctx.flag('continentalCompact') && ctx.flag('partialMobilization') && !ctx.flag('generalMobilization'),
  title: 'Willy asks what “partial” means',
  text: {
    body: [
      'Wilhelm’s telegram is shorter now. German railway officers report Russian movements in the districts facing Austria. Berlin accepts that the order is not directed against Germany; the German General Staff does not accept that mobilization can remain compartmentalized indefinitely.',
      'Willy offers a standstill: Russia freezes the partial mobilization where it is; Germany orders no counter-mobilization; Vienna accepts the conference line and begins demobilizing first.',
      'The diplomatic opening still exists, but now every hour has soldiers attached to it.'
    ],
    quote: '“Nicky, stop where you are and I will make them stop where they are.”',
    speaker: 'Wilhelm II'
  }
});

addVariant(66, {
  when: ctx => ctx.flag('continentalCompact') && ctx.flag('partialMobilization') && !ctx.flag('generalMobilization'),
  title: 'The railway compromise',
  text: {
    body: [
      'The General Staff proposes a technical fiction: formations already called may continue concentrating, but no additional districts will mobilize and no trains will be routed toward the German frontier.',
      'Berlin says it can live with the distinction for forty-eight hours. Vienna begins slowing its own concentration. France quietly warns that if Germany mobilizes despite Russian restraint, the alliance remains in force.',
      'The crisis has become a contest over whether military machines can be paused after movement begins.'
    ],
    quote: '“We are attempting to negotiate with railway schedules now. They are less vain than ministers, but less flexible.”',
    speaker: 'Vladimir Kokovtsov'
  }
});

addVariant(67, {
  when: ctx => ctx.flag('continentalCompact') && ctx.flag('partialMobilization') && !ctx.flag('generalMobilization'),
  title: 'The armies stop halfway',
  text: {
    body: [
      'Austria accepts the settlement and announces a staged stand-down. Russian formations remain in assembly areas but receive no frontier orders. Germany does not mobilize.',
      'The compromise is ugly enough to offend every General Staff. It is also measurable: each Austrian district released will be answered by a Russian district released.',
      'Europe has discovered that mobilization is not literally irreversible. The generals are furious with the discovery.'
    ],
    quote: '“A timetable has been interrupted. Civilization survives the insult.”',
    speaker: 'Council of Ministers memorandum'
  }
});

/* --- GENERAL MOBILIZATION AFTER THE GERMAN OPENING ---------------------------- */

addVariant(65, {
  when: ctx => ctx.flag('continentalCompact') && ctx.flag('generalMobilization'),
  title: 'Berlin asks whether the compact is dead',
  text: {
    body: [
      'The Russian general mobilization order reaches Berlin before Wilhelm’s next personal telegram. The German Chancellor asks whether the continental compact was a settlement or merely cover while Russia prepared the army.',
      'The German General Staff begins the steps that precede its own mobilization. Wilhelm still offers one escape: cancel the Russian general order immediately and Germany will hold while Vienna accepts the Serbian settlement.',
      'For several hours the question is brutally simple. Is mobilization an instrument of policy, or has policy become an instrument of mobilization?'
    ],
    quote: '“Nicky, if this order can be given, it can be countermanded. Tell me now whether the soldiers command us.”',
    speaker: 'Wilhelm II'
  }
});

addVariant(66, {
  when: ctx => ctx.flag('continentalCompact') && ctx.flag('generalMobilization') && !ctx.flag('mobilizationReversed1914'),
  title: 'The counter-order window',
  text: {
    body: [
      'Russian mobilization telegrams are already moving through the military districts. Some trains have started; most have not. The General Staff insists reversal will produce confusion measured in days.',
      'Berlin delivers no ultimatum yet. Germany offers a final twenty-four-hour pause if Russia sends an authenticated counter-order and allows military attachés to verify that westbound concentrations are stopping.',
      'France urges you not to humiliate Russia for a German promise. Kokovtsov replies that humiliation is cheaper than a continental war.'
    ],
    quote: '“Majesty, the machine has begun to turn. It has not yet acquired a soul.”',
    speaker: 'Vladimir Kokovtsov'
  }
});

addVariant(67, {
  when: ctx => ctx.flag('mobilizationReversed1914'),
  title: 'The trains reverse badly',
  text: {
    body: [
      'The counter-order creates exactly the confusion the General Staff predicted: units detrain in the wrong districts, reservists sleep in stations, ammunition trains are shunted into sidings. It is embarrassing and temporary.',
      'Germany holds its mobilization. Austria accepts the Serbian settlement under direct German pressure. France is astonished that Russia has paid a military price to preserve a diplomatic arrangement with Berlin.',
      'You have proved that mobilization can be reversed. You have also taught every Russian general to fear the next civilian intervention in a timetable.'
    ],
    quote: '“The army will forgive disorder more slowly than the mothers would forgive war.”',
    speaker: 'Vladimir Kokovtsov'
  }
});

addVariant(67, {
  when: ctx => ctx.flag('continentalCompact') && ctx.flag('generalMobilization') && !ctx.flag('mobilizationReversed1914'),
  title: 'Germany mobilizes',
  text: {
    body: [
      'The counter-order does not come. Germany orders mobilization. The continental compact collapses not over Serbia but over the military schedules both empires insisted were merely precautionary.',
      'Vienna is suddenly less important than the railway clocks in Warsaw, Berlin and East Prussia. France begins its own measures. Britain asks Berlin about Belgium.',
      'The war that follows will be remembered as inevitable by many of the men who spent the previous week making reversible decisions and declining to reverse them.'
    ],
    quote: '“We had built another road. The armies have closed it.”',
    speaker: 'Foreign Ministry memorandum'
  }
});

/* --- POST-CRISIS: DIFFERENT PEACES PRODUCE DIFFERENT EUROPES ------------------- */

addVariant(68, {
  when: ctx => ctx.flag('fourPowerConference') && !ctx.flag('generalMobilization'),
  title: 'The conference refuses to dissolve',
  text: {
    body: [
      'The Serbian settlement is signed, but the four ambassadors remain in session. France proposes a permanent consultation clause for Balkan crises. Germany proposes extending it to mobilization disputes. Russia supports both.',
      'Britain is not formally inside the mechanism and immediately becomes interested in joining it. Austria resents the entire structure while admitting that it preserved Austrian prestige better than war might have done.',
      'The alliance map has not cracked so much as acquired a second layer above it.'
    ],
    quote: '“Perhaps Europe does not need fewer alliances. Perhaps it needs somewhere for the alliances to speak before they mobilize.”',
    speaker: 'Sergei Sazonov'
  }
});

addVariant(68, {
  when: ctx => ctx.flag('austrianLimitedOccupation') && !ctx.flag('generalMobilization'),
  title: 'The Austrians go home',
  text: {
    body: [
      'The final Serbian arrests are verified. Austrian units begin withdrawing from the Danube zone under the timetable Berlin and Petersburg guaranteed together.',
      'Belgrade celebrates survival and remembers who permitted the occupation. Vienna celebrates punishment and remembers who prevented a larger victory. Russia has kept the peace at the cost of becoming less beloved by the people it claimed to protect.',
      'The settlement works. That does not make it noble.'
    ],
    quote: '“A successful compromise leaves each participant enough grievance to explain why he signed it.”',
    speaker: 'Foreign Ministry memorandum'
  }
});

addVariant(69, {
  when: ctx => ctx.flag('germanAlignment1914') && !ctx.flag('generalMobilization'),
  title: 'The continental turn',
  text: {
    body: [
      'The Serbian crisis is over, but the decision made inside it is larger than Serbia. Russian and German diplomats begin drafting principles for a standing continental accord: mutual consultation, restraint of Austria in the Balkans, and Russian freedom in questions that do not threaten Germany directly.',
      'France is not discarded. It is demoted from destiny to relationship. Britain becomes the largest unanswered question in Russian strategy.',
      'For the first time since Bismarck, Petersburg is seriously considering a Europe in which Germany is not the enemy around which Russian planning is organized.'
    ],
    quote: '“We are not marrying Germany, Majesty. We are ceasing to plan our entire household around killing her.”',
    speaker: 'Foreign Ministry memorandum'
  }
});

/* Route-specific choice replacements for the new sub-branches. */
const oatrJulyDeepChoices = {
  60: ctx => ctx.flag('secretSerbiaGuarantee') ? [
    ['Admit the guarantee and stand by it. The German understanding ends here.', { empire: 2, pressure: 3, flags: ['serbiaPatron1914','berlinRupture1914'] }],
    ['Withdraw the guarantee and order Belgrade to accept the moderated ultimatum.', { legitimacy: -2, empire: -1, pressure: -2, flags: ['serbiaAbandoned1914','continentalCompact','secretGuaranteeRepudiated'] }],
    ['Claim the telegram exceeded Sazonov’s authority and dismiss the officials responsible.', { door: 2, legitimacy: -1, pressure: -1, flags: ['serbiaAbandoned1914','continentalCompact','sazonovScapegoated'] }],
    ['Ask Berlin to treat the guarantee as applying only against annexation, not a limited Austrian action.', { legitimacy: 1, pressure: 1, flags: ['austrianLimitedOccupation','continentalCompact'] }]
  ] : ctx.flag('austriaHumiliated') ? [
    ['Tell Berlin to stop Vienna now. Russia will not mobilize while Germany attempts it.', { legitimacy: 1, pressure: -1, flags: ['julyRestraint','germanUltimatumToVienna'] }],
    ['Order partial mobilization against Austria only. The veto now requires evidence.', { military: 2, pressure: 2, flags: ['partialMobilization'] }],
    ['Guarantee Serbia and prepare general mobilization if the bombardment continues.', { empire: 2, military: 2, pressure: 3, flags: ['serbiaPatron1914'] }],
    ['Accept a temporary Austrian bridgehead if Berlin guarantees withdrawal after compliance.', { empire: -1, pressure: -1, flags: ['austrianLimitedOccupation','continentalCompact'] }]
  ] : null,

  61: ctx => ctx.flag('austrianLimitedOccupation') ? [
    ['Police the compromise: pressure Belgrade to disarm irregulars and hold Vienna to the agreed line.', { legitimacy: 1, pressure: -1, flags: ['occupationPoliced','continentalCompact'] }],
    ['Demand immediate Austrian withdrawal now that Serbia has complied.', { empire: 1, pressure: 1, flags: ['occupationWithdrawalDemanded'] }],
    ['Permit Austrian pursuit operations beyond the line for seventy-two hours.', { empire: -2, blood: 1, pressure: 1, flags: ['occupationExpanded'] }],
    ['Internationalize the occupation zone under Russian, German and French observers.', { reform: 1, legitimacy: 2, pressure: -2, flags: ['fourPowerConference','continentalCompact'] }]
  ] : ctx.flag('austriaHumiliated') ? [
    ['Accept Berlin’s emergency standstill: no Russian mobilization while Germany halts the Austrian advance.', { pressure: -2, flags: ['julyRestraint','continentalCompact'] }],
    ['Order partial mobilization against Austria and give Berlin forty-eight hours.', { military: 2, pressure: 2, flags: ['partialMobilization','continentalCompact'] }],
    ['Order general mobilization. Vienna has answered diplomacy with shells.', { military: 3, pressure: 4, flags: ['generalMobilization'] }],
    ['Ask France to join an emergency four-power conference before any mobilization order.', { legitimacy: 1, reform: 1, flags: ['fourPowerConference','continentalCompact'] }]
  ] : null,

  62: ctx => ctx.flag('austrianLimitedOccupation') ? [
    ['Compel Serbia to disarm the frontier districts and compel Austria to publish a withdrawal date.', { legitimacy: 1, pressure: -2, flags: ['occupationPoliced','occupationWithdrawalScheduled','continentalCompact'] }],
    ['Tell Vienna the line is final. Any further advance triggers Russian military measures.', { empire: 1, military: 1, pressure: 1, flags: ['occupationWithdrawalScheduled'] }],
    ['Replace the Austrian zone with an international commission and neutral observers.', { reform: 1, legitimacy: 2, pressure: -2, flags: ['fourPowerConference','continentalCompact'] }],
    ['Let Austria widen operations against irregulars. Do not risk Europe over villages.', { empire: -2, blood: 1, flags: ['occupationExpanded'] }]
  ] : ctx.flag('fourPowerConference') ? [
    ['Adopt the French proposal for a standing four-power Balkan consultation.', { reform: 2, legitimacy: 2, pressure: -1, flags: ['europeanConcert1914','continentalCompact'] }],
    ['Keep the conference temporary. Settle Serbia and dissolve it.', { legitimacy: 1, flags: ['continentalCompact'] }],
    ['Invite Britain to guarantee the settlement without giving London a permanent seat.', { britain: -1, legitimacy: 1, flags: ['continentalCompact'] }],
    ['Return the settlement to the three emperors now that France has reassured itself.', { empire: -1, flags: ['threeEmperorsConference','continentalCompact'] }]
  ] : null,

  65: ctx => ctx.flag('continentalCompact') && ctx.flag('generalMobilization') ? [
    ['Countermand general mobilization immediately and accept the military confusion.', { military: -1, legitimacy: 1, pressure: -4, flags: ['mobilizationReversed1914','julyRestraint'] }],
    ['Offer to convert general mobilization into partial mobilization against Austria only.', { military: 1, pressure: -1, flags: ['partialMobilization','mobilizationScaledBack1914'] }],
    ['Demand that Germany demobilize Austria first. Russia will not move on a promise.', { empire: 1, pressure: 2 }],
    ['Refuse to reverse anything. If Berlin mobilizes, so be it.', { military: 2, pressure: 4, flags: ['war1914','berlinRupture1914'] }]
  ] : ctx.flag('continentalCompact') && ctx.flag('partialMobilization') ? [
    ['Accept Willy’s standstill: freeze Russian concentrations while Berlin freezes Vienna.', { pressure: -2, legitimacy: 1, flags: ['mobilizationFrozen1914','julyRestraint'] }],
    ['Begin demobilizing one district for every Austrian district Vienna releases.', { military: -1, legitimacy: 1, pressure: -2, flags: ['mobilizationReciprocal1914'] }],
    ['Keep partial mobilization moving. It is directed only at Austria.', { military: 1, pressure: 2 }],
    ['Convert to general mobilization before Germany can exploit the delay.', { military: 3, pressure: 4, flags: ['generalMobilization'] }]
  ] : null,

  66: ctx => ctx.flag('continentalCompact') && ctx.flag('generalMobilization') && !ctx.flag('mobilizationReversed1914') ? [
    ['Send the authenticated counter-order now.', { military: -1, pressure: -4, legitimacy: 1, flags: ['mobilizationReversed1914'] }],
    ['Scale back to Austria-only mobilization and invite German verification.', { military: 1, pressure: -2, flags: ['partialMobilization','mobilizationScaledBack1914'] }],
    ['Delay the answer for twenty-four hours while the army continues concentrating.', { door: 2, pressure: 2 }],
    ['Reject German verification and continue general mobilization.', { military: 2, pressure: 4, flags: ['war1914','berlinRupture1914'] }]
  ] : ctx.flag('continentalCompact') && ctx.flag('partialMobilization') ? [
    ['Freeze every formation where it stands and await Austrian stand-down.', { pressure: -2, flags: ['mobilizationFrozen1914'] }],
    ['Begin reciprocal district-by-district demobilization.', { military: -1, legitimacy: 1, pressure: -2, flags: ['mobilizationReciprocal1914'] }],
    ['Maintain partial mobilization until the last Austrian unit leaves the Serbian frontier.', { military: 1, pressure: 1 }],
    ['Generalize mobilization. The compromise has become too fragile.', { military: 3, pressure: 4, flags: ['generalMobilization'] }]
  ] : null,

  67: ctx => ctx.flag('mobilizationReversed1914') ? [
    ['Accept the military embarrassment and order a full stand-down as Austria withdraws.', { legitimacy: 2, pressure: -3, flags: ['peace1914','continentalCompact'] }],
    ['Keep selected eastern districts at peacetime reinforcement while releasing reservists.', { military: 1, pressure: -1, flags: ['peace1914','continentalCompact'] }],
    ['Use the breathing room to demand a written German guarantee of the Serbian settlement.', { legitimacy: 1, pressure: -1, flags: ['peace1914','continentalCompact','willyNicky'] }],
    ['Blame the General Staff publicly for the mobilization error and purge the timetable faction.', { autocracy: 1, military: -1, legitimacy: -1, flags: ['peace1914'] }]
  ] : ctx.flag('continentalCompact') && ctx.flag('partialMobilization') && !ctx.flag('generalMobilization') ? [
    ['Begin reciprocal demobilization as agreed.', { legitimacy: 2, pressure: -3, flags: ['peace1914','mobilizationReciprocal1914'] }],
    ['Hold the formations until Austrian withdrawal is physically complete.', { military: 1, pressure: 1 }],
    ['Release the army immediately. The diplomatic settlement has done its work.', { legitimacy: 1, military: -1, pressure: -2, flags: ['peace1914'] }],
    ['Convert the pause into a permanent readiness system short of mobilization.', { military: 2, economy: -1, flags: ['peace1914'] }]
  ] : null,

  68: ctx => ctx.flag('fourPowerConference') && !ctx.flag('generalMobilization') ? [
    ['Make the consultation mechanism permanent and invite Britain to join future sessions.', { reform: 2, legitimacy: 2, britain: -1, flags: ['europeanConcert1914','peace1914'] }],
    ['Keep it a four-power mechanism without Britain.', { reform: 1, legitimacy: 1, flags: ['europeanConcert1914','peace1914'] }],
    ['Let the conference lapse now that Serbia is settled.', { door: 1, flags: ['peace1914'] }],
    ['Use the conference to negotiate mutual limits on mobilization procedures.', { military: 1, reform: 2, flags: ['europeanConcert1914','peace1914'] }]
  ] : null
};

Object.entries(oatrJulyDeepChoices).forEach(([id, fn]) => {
  const prior = OATR_BRANCHING.choiceOverrides[id];
  OATR_BRANCHING.choiceOverrides[id] = ctx => fn(ctx) || (typeof prior === 'function' ? prior(ctx) : prior);
});
