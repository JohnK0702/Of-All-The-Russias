/* Replace score-template advisor chatter and generic campaign fallbacks with event-specific content.
   Loaded after main.js so these assignments override the engine defaults.

   IMPORTANT: advisor responses are about the CHOICE just made. They do not paraphrase the button,
   and they do not bolt the same event-level warning onto every answer. */

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

const OATR_EXACT_CHOICE_ADVICE = {
  1: [
    'Good. They came carrying your portrait because they still believe the sovereign stands above the men who employ and police them. Receiving them spends dignity, perhaps, but preserves the older and more valuable fiction that the Tsar may still hear a grievance before it becomes a revolt.',
    'This may disperse the crowd without teaching it that rifles answer petitions. But the promise now has a date attached to it. If the delegation is not received, moderation will look less like prudence than deceit.',
    'The streets will be cleared. They will also remember who stood at the far end of the rifles. You may restore traffic by evening and lose the language of Little Father for a generation.',
    'Then the Interior Ministry will decide what your silence means, and the soldiers will inherit the moral weight of a choice you preferred not to make. Distance from Petersburg will not become distance from the consequences.'
  ],
  4: [
    'Peace now admits the defeat without allowing it to consume the army as well as the fleet. Court society will call it humiliation; the treasury will call it survival. The dangerous part comes afterward, when men decide whether defeat taught them anything.',
    'Then the army must redeem the navy, and prestige becomes a military objective. That is how states continue wars whose purposes have already disappeared.',
    'This is the useful answer. The navy has demonstrated that rank, procurement and court protection can sink steel as effectively as shells. If the records are opened, several very important men will suddenly discover a passion for secrecy.',
    'It is certainly true that Britain possesses an irritating number of coaling stations. It is less useful as an explanation for why Russian officers could not range their guns.'
  ],
  9: [
    'If you mean the signature, the monarchy changes today. Not because a parliament has appeared, but because law has acquired a place where your personal will must stop. The Crown can survive that. What it cannot survive is promising the limit and then behaving as though it were decorative.',
    'This buys the manifesto without accepting the principle beneath it. It may calm the streets, but every later use of reserve power will teach the Duma that constitutional language is camouflage for autocracy.',
    'Then the contest becomes simple enough for everyone to understand: the state possesses force and the opposition possesses numbers, strikes and memory. Simplicity is not the same thing as safety.',
    'You are looking for a constitutional settlement that leaves the autocracy metaphysically untouched. There may be clever lawyers capable of drafting such a thing. There are not enough clever lawyers to make both sides believe it.'
  ],
  14: [
    'A ministry drawn from the Duma would make the chamber responsible for what it demands. That may domesticate the opposition more effectively than dissolving it, but it also creates ministers who possess a political life outside your favor.',
    'This is the narrow bridge: legislation with the moderates, sovereignty over war and police retained by the Crown. It can work, but only if both sides resist the temptation to treat every compromise as temporary.',
    'The deputies will go home and explain that the first Russian parliament was permitted to exist until it behaved like a parliament. The next Duma will arrive less innocent.',
    'The country will not know that Alexei is ill. It will know only that the sovereign ended the audience rather than answer the chamber. Private tragedy is about to acquire public constitutional consequences.'
  ],
  22: [
    'Then Stolypin becomes your minister in the full sense: not merely the man carrying reform, but the man permitted to offend the people whose access to you normally kills reform. You are lending him the Crown’s enemies. Do not withdraw the loan halfway through.',
    'The land program may move, but every protected landlord interest will become a brake attached to it. You will get reform slowly enough to preserve allies and perhaps too slowly to transform the village.',
    'He will understand the message. So will every official obstructing him: the Prime Minister is powerful only until his program becomes inconvenient to the court. After that, sabotage becomes a rational career strategy.',
    'Twenty years is indeed a long time. Russia has spent rather more than twenty years discovering ways to postpone the same questions.'
  ],
  34: [
    'Do it. A government that cannot keep its own Prime Minister alive has no business describing revolutionaries as amateurs. Protection will irritate Stolypin. A corpse will inconvenience him more.',
    'Then his courage becomes part of state policy. If he is killed, nobody may later pretend that the danger was unknowable.',
    'That judgment is comfortable because it makes assassination another form of political criticism. The bomb does not care whether its target has been tactful.',
    'The Okhrana has assured the throne of many things. Its confidence should not be confused with evidence.'
  ],
  35: [
    'Then use the survival while it is politically expensive to oppose him. Sympathy is a wasting asset; the court will remember its objections as soon as the bandages come off.',
    'He leaves honored rather than defeated, but the program loses the one man willing to make enemies in order to carry it. His successor will inherit statutes without inheriting his appetite for conflict.',
    'A purge may uncover incompetence, penetration and simple cowardice. It may also reveal that the security service has become too entangled with the revolutionary underground to explain where one ends and the other begins.',
    'Russia does continue. That is precisely why unfinished policies, surviving enemies and unanswered questions continue with it.'
  ],
  41: [
    'Keep that boundary hard. The family may need him; the state does not. Every appointment denied to Rasputin is one fewer official who must explain why private access outranked public office.',
    'This is sustainable only while the line is visible. A man may enter the palace as a comforter and leave it as a source of recommendations without ever admitting the change to himself.',
    'Then you are choosing the evidence of Alexei’s bedside over the judgment of Petersburg. I understand why. The price is that every courtier who wants something will begin looking for a road that passes through the sickroom.',
    'Alexandra will experience this as cruelty before she experiences it as policy. Politically it may help you; domestically it may place another wall inside the palace.'
  ],
  47: [
    'Exactly. A police service that manufactures threats and employs terrorists to penetrate terrorism can eventually become unable to distinguish success from complicity. Reforming it means accepting that some frightening reports will no longer be useful to the men who wrote them.',
    'That conclusion protects the service by making the scandal proof of its necessity. It will also tell every officer inside it that failure produces larger budgets.',
    'More infiltration gives you more information and more provocateurs. Eventually the state begins receiving intelligence about conspiracies in which its own agents supplied the idea, the money or both.',
    'At last. The problem is not merely that revolutionaries penetrated the police. The police penetrated the revolution so deeply that the government can no longer tell which crimes it has prevented and which ones it helped create.'
  ],
  56: [
    'Good. Franz Ferdinand was killed in Sarajevo, not at the gates of Kiev. If Russia begins by refusing to turn Serbian honor into Russian survival, every later step has to justify itself rather than borrowing necessity from rhetoric.',
    'A private warning gives Vienna something to calculate without forcing it to answer a public humiliation. Keep it private if you want diplomacy; publish it if you want positions to harden.',
    'Then Belgrade will negotiate with Vienna knowing Russian blood stands behind its refusal. That may stiffen Serbia more effectively than it deters Austria.',
    'British intelligence may know many things. None of them changes the fact that Austria has an ultimatum to write and Russia must decide what Serbia is worth.'
  ]
};

function oatrNormalizeChoiceLabel(label='') {
  return label.toLowerCase().replace(/[’‘]/g,"'");
}

function oatrChoiceSemanticAdvice(q, choiceIndex, label, effects, advisor) {
  const t = oatrNormalizeChoiceLabel(label);
  const e = effects || {};

  // July Crisis / German route. These are deliberately very literal because the route itself mutates.
  if (q.id >= 56) {
    if (/berlin|german|germany|willy|continental/.test(t) && /accept|coordinate|understanding|accord|formula|hold|forty-eight/.test(t))
      return 'Then Berlin becomes a participant in Russian policy rather than merely the other side of a mobilization table. The immediate gain is leverage over Vienna; the price is that France and Serbia must now wonder whether old promises still mean what they meant in June.';
    if (/serbia|belgrade/.test(t) && /guarantee|stand behind|back|support|patron/.test(t))
      return 'Belgrade will hear the guarantee more loudly than any advice to compromise. Vienna will hear it too. From this point forward Serbian concessions become less likely precisely because Russian support makes resistance rational.';
    if (/serbia|belgrade/.test(t) && /accept|comply|no military|will not fight|abandon/.test(t))
      return 'You have removed the assumption on which Serbian defiance rests. Vienna now has less reason to demand the impossible, Berlin has more reason to restrain its ally, and Serbia has to calculate survival without treating Russian intervention as a law of nature.';
    if (/partial mobil/.test(t))
      return 'Partial mobilization sounds restrained in the palace and looks ambiguous on railway maps. Austria will see pressure; Germany will see timetables that can be widened. You have preserved diplomacy, but made every general more interested in the clock.';
    if (/general mobil|send general mobilization|authorize general mobilization/.test(t))
      return 'This is the threshold. Once the general order enters the rail system, German planning begins treating Russian intentions as a scheduling problem. Diplomacy can still speak, but it will now be arguing with trains.';
    if (/do not mobilize|leave the forms unsigned|hold every mobilization|administrative precautions/.test(t))
      return 'You have preserved the one thing every General Staff is rapidly destroying: reversible policy. Berlin must now prove its promises by restraining Vienna, because Russia has declined to give it mobilization as an excuse for failure.';
    if (/france|paris/.test(t) && /reaffirm|alliance|invite|tripartite|four-power/.test(t))
      return 'France is now being asked to accept that alliance does not mean ownership of Russian escalation. If Paris accepts the distinction, Europe may acquire a concert instead of two armed camps. If it does not, the alliance will survive on paper and weaken in practice.';
    if (/austria|vienna/.test(t) && /occupation|permit|symbolic|punish/.test(t))
      return 'You are allowing Austria a victory with boundaries. The danger is no longer immediate continental war; it is whether Vienna treats a limited permission as the first installment on an unlimited one.';
    if (/reverse|cancel|countermand|scale back/.test(t) && /mobil/.test(t))
      return 'Countermanding mobilization will offend the General Staff and confuse the railways, but it restores politics to the problem. You will look hesitant to men who worship timetables and dependable to diplomats who need proof that orders can still be stopped.';
  }

  // Explicit institutional / reform answers.
  if (/receive|hear them|delegation|petition/.test(t))
    return 'You are forcing the state to distinguish petition from rebellion. That costs the police the convenience of treating crowds as one category, but it preserves the sovereign as an avenue of appeal rather than merely the name on the order to disperse them.';
  if (/publish|open the records|procurement|findings/.test(t))
    return 'Publication changes the scandal from rumor into responsibility. Some of the guilty will be protected by rank, which is exactly why publishing the record matters: the reform either reaches them or advertises its own limit.';
  if (/dismiss|remove|purge|replace/.test(t) && /command|admiral|service|police|leadership/.test(t))
    return 'You are making failure expensive for the men at the top rather than merely for the men beneath them. If the replacements are chosen by the same court logic, however, this will become theater with new uniforms.';
  if (/legislative|real constitutional|binding law|responsible government|form a ministry|duma leaders/.test(t))
    return 'This answer gives the institution something it cannot later forget it possessed. The next constitutional crisis will therefore be about whether the Crown keeps a bargain, not whether the Duma deserves to exist.';
  if (/narrow concession|reserve|preserve.*crown|broad reserve powers|ordinary law/.test(t))
    return 'You are trying to divide sovereignty into compartments: enough concession to cool the dispute, enough reserve power to reassure the palace. It can hold, but every future emergency will tempt the Crown to prove the reserve powers were the real constitution all along.';
  if (/dissolve|refuse|withdraw|restore government|no manifesto|change as little|preserve the commune/.test(t))
    return 'This closes the immediate door without removing the people standing behind it. The court will read the absence of concession as strength; the opposition will read it as evidence that ordinary politics cannot produce an answer.';
  if (/postpone|wait|later|committee|commission|clarify|decide later|do nothing|leave .* ministry|leave .* governor/.test(t))
    return 'Delay transfers power from you to process. Officials will preserve whatever arrangement already exists, because inertia is the only policy that requires no signature. When the question returns it will be less theoretical and less yours.';

  // Violence / security.
  if (/crush|storm|artillery|destroy|shoot|troops|clear the streets|make .* example|emergency rule|arrest|repression/.test(t))
    return 'Force can settle who controls the street tonight. It cannot settle why the street filled in the first place. The more completely the operation succeeds, the easier it will be for the government to mistake tactical success for political settlement.';
  if (/amnesty|surrender|negotiate surrender|deadline/.test(t))
    return 'You are separating the men who can still be brought back into obedience from those who have crossed into murder or insurrection. That distinction is harder to administer than collective punishment and much less useful to revolutionaries recruiting martyrs.';
  if (/okhrana|infiltrat|political police|security service/.test(t))
    return 'The service will tell you that extraordinary methods are justified by extraordinary enemies. The problem is that methods become institutions faster than enemies remain extraordinary.';

  // War / military / foreign policy.
  if (/peace|mediation|negotiate|diplomatic settlement|diplomatic exit/.test(t) && !/refuse|reject/.test(t))
    return 'You are choosing to convert military uncertainty into political time. That is usually wise. The danger is what Petersburg does with the time once relief makes the preceding crisis feel exaggerated.';
  if (/continue the war|stand firm|victory before negotiations|does not conclude peace/.test(t))
    return 'Then prestige becomes something soldiers must purchase for the court. Every additional casualty will raise the political price of admitting that the objective was never worth the cost, which is how wars become hardest to stop after their purpose has thinned.';
  if (/professionalize|gunnery|procurement|staff work|modernize|army reform/.test(t))
    return 'This attacks the humiliating part of the problem: not Russian courage, but Russian administration. Competence will create enemies at court because every professional standard quietly identifies somebody whose position rested on something else.';

  // Land / labor / society.
  if (/commune|peasant|land|proprietor|holdings/.test(t)) {
    if ((e.land || 0) > 0) return 'You are creating peasants with assets rather than merely obligations. That may make the village more conservative in the long run, but first it will create winners, losers and lawsuits on a scale the bureaucracy is not prepared to enjoy.';
    return 'You are preserving the village because change is dangerous. The cost is that the land hunger does not disappear; it remains stored inside an institution increasingly blamed for keeping peasants poor.';
  }
  if (/labor|factory|hours|bargaining|strike/.test(t)) {
    if ((e.reform || 0) > 0) return 'This gives industrial conflict a legal channel before the underground monopolizes it. Employers will call it surrender. Revolutionaries may hate it for the opposite reason: ordinary bargaining is competition for revolutionary politics.';
    return 'The factory question is being returned to police and employers. That may restore production quickly, but it teaches workers that economic grievances become political the moment legal remedies close.';
  }

  // Palace / faith / Rasputin.
  if (/rasputin|pilgrim|alexei|alix|alexandra|holy man/.test(t)) {
    if ((e.veil || 0) > 1) return 'You are allowing a fact from the nursery — that the boy seems calmer when this man is near — to outrank the ordinary machinery of state. It is understandable as a father. As an emperor it creates a second channel of authority nobody can audit.';
    return 'You are trying to keep private consolation from becoming public power. That boundary will be tested every time Alexei bleeds, because necessity inside the family will always feel more real than scandal outside it.';
  }

  // Generic but still genuinely choice-relative fallback: compare this answer to the alternatives rather than echoing it.
  const choices = baseChoicesFor(q);
  const altEffects = choices.filter((_,i)=>i!==choiceIndex).map(c=>c[1] || {});
  const delta = (key) => (e[key] || 0) - (altEffects.reduce((n,a)=>n+(a[key]||0),0) / Math.max(1,altEffects.length));
  const ranked = ['reform','legitimacy','autocracy','blood','military','economy','land','pressure','leverage','door','veil','empire','britain','faith']
    .map(key => [key, delta(key)]).sort((a,b)=>Math.abs(b[1])-Math.abs(a[1]));
  const [key, value] = ranked[0] || ['door',0];
  const relative = {
    reform: value>0 ? 'Of the choices before you, this most clearly changes the machinery rather than merely the men operating it.' : 'Of the choices before you, this does the most to preserve the existing machinery of rule.',
    legitimacy: value>0 ? 'This answer relies more than the alternatives on consent surviving the decision.' : 'This answer spends more public trust than the alternatives in exchange for freedom of action now.',
    autocracy: value>0 ? 'This is the answer that most clearly returns responsibility to the sovereign personally.' : 'This answer deliberately moves responsibility away from the sovereign and into an institution that may outlive his preferences.',
    blood: value>0 ? 'This is the bloodiest answer available. It may also be the easiest one for subordinates to execute because violence simplifies instructions.' : 'You have chosen the answer that leaves the least blood in the immediate account, which also means accepting more ambiguity and negotiation.',
    military: value>0 ? 'This puts more weight than the alternatives on military capability and readiness. The generals will approve; the diplomats will inherit the consequences.' : 'This answer deliberately refuses to let military convenience decide the political question.',
    economy: value>0 ? 'This preserves more of the treasury and productive economy than the alternatives. That is not cowardice; money is one of the forms in which state power survives.' : 'This is the expensive answer. The political gain will have to justify costs that the treasury cannot make disappear.',
    land: value>0 ? 'This moves farther than the alternatives toward changing who owns and controls the countryside.' : 'This preserves the old agrarian balance more than the alternatives, and therefore preserves its unresolved grievances as well.',
    pressure: value>0 ? 'This choice leaves less room for the next decision. You are increasing urgency in exchange for clarity or resolve.' : 'This choice buys the most room for the next decision. The test will be whether that room is used rather than merely enjoyed.',
    leverage: value>0 ? 'This gives the reforming side more leverage than the alternatives because it makes the old arrangement harder to defend.' : 'This weakens the argument for reform more than the alternatives. Success may therefore make future change politically harder.',
    door: value>0 ? 'This answer transfers more of the next move to subordinates than the alternatives. They will fill the ambiguity with their own interests.' : 'You have taken more personal ownership of the question than the alternatives allowed; the bureaucracy will have less room to pretend policy emerged by itself.',
    veil: value>0 ? 'This allows the private, providential world of the palace farther into public policy than the alternatives.' : 'This keeps state policy more firmly outside the palace’s private theology and fears.',
    empire: value>0 ? 'This spends more on imperial position than the alternatives. Borderlands and clients will hear resolve; rivals will begin calculating how much of it is bluff.' : 'This sacrifices more imperial posture than the alternatives in exchange for freedom elsewhere.',
    britain: value>0 ? 'This answer places more explanatory weight on British design than the alternatives. That may occasionally be correct; it is also the explanation least likely to require reform in Petersburg.' : 'At least this answer does not require London to be responsible for the contents of our own filing cabinets.',
    faith: value>0 ? 'This gives religious conviction a larger role in the decision than the alternatives. That may strengthen the sovereign inwardly while making policy harder for ministers to contest.' : 'This keeps the decision in the language of administration rather than providence.'
  }[key];
  return relative || 'This answer changes the balance among the available risks rather than removing them. The next memorandum will reveal which risk you actually purchased.';
}

function oatrAnswerSpecificAdvice(q, effects, advisor) {
  const choiceIndex = state.pending?.choiceIndex ?? -1;
  const label = state.pending?.label || baseChoicesFor(q)?.[choiceIndex]?.[0] || '';
  const exact = OATR_EXACT_CHOICE_ADVICE[q.id]?.[choiceIndex];
  if (exact) return exact;
  return oatrChoiceSemanticAdvice(q, choiceIndex, label, effects, advisor);
}

consequenceText = function(effects, advisor) {
  const q = currentQuestion();
  if (q && state.pending) return oatrAnswerSpecificAdvice(q, effects, advisor);
  return oatrDefaultConsequenceText(effects, advisor);
};

// Re-render once so the opening screen is guaranteed to use the fully installed content layer.
render();
