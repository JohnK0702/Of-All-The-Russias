/* Major route architecture for Of All The Russias.
   These branches treat the player's timeline as lived history. They also turn the ending
   concepts into long causal routes instead of score-only epilogues. */

const OATR_ROUTE = {
  has: (ctx, ...flags) => flags.every(flag => ctx.flag(flag)),
  any: (ctx, ...flags) => flags.some(flag => ctx.flag(flag))
};

function addVariant(id, variant) {
  OATR_BRANCHING.questionVariants[id] = [variant, ...(OATR_BRANCHING.questionVariants[id] || [])];
}

/* -------------------------------------------------------------------------- */
/* THE CONSTITUTIONAL CEILING                                                  */
/* -------------------------------------------------------------------------- */

addVariant(13, {
  when: ctx => ctx.flag('dumaReal') || ctx.score('reform') >= 7,
  title: 'What the Crown will permit',
  text: {
    body: [
      'The Fundamental Laws are ready for your signature. The lawyers have performed the usual Russian miracle: every faction can find a sentence proving it has won.',
      'The Duma exists. The ministries are learning that deputies can ask questions which do not disappear when the audience ends. The court now wants the limits written down before habit becomes constitution.',
      'The question is no longer whether Russia will possess representation. It is how much political life the state can tolerate before men with uniforms decide that tolerance itself is abdication.'
    ],
    quote: '“A constitution survives by becoming ordinary before its enemies decide it is treason.”',
    speaker: 'Sergei Witte'
  }
});

OATR_BRANCHING.choiceOverrides[13] = ctx => [
  ['Write a durable settlement: elected Duma, responsible ministers in domestic affairs, and explicit reserve powers for the Crown.', { reform: 3, legitimacy: 3, autocracy: -2, leverage: 2, flags: ['constitutionalCompact'] }],
  ['Recognize the Duma but keep ministers responsible to the Emperor alone. Representation may advise; sovereignty remains personal.', { reform: 1, legitimacy: 1, autocracy: 2, flags: ['crownConstitution'] }],
  ['Restore the old language without ambiguity. The disturbances are ending and the Crown will not legalize weakness.', { autocracy: 4, legitimacy: -3, blood: 1, flags: ['fundamentalReaction'] }],
  ['Guarantee universal speech, press, assembly and political organization immediately, including revolutionary parties.', { reform: 6, legitimacy: 1, autocracy: -5, pressure: 3, flags: ['maximalLiberties'] }]
];

addVariant(19, {
  when: ctx => ctx.flag('constitutionalCompact') || ctx.flag('maximalLiberties'),
  title: 'Who gets to become political',
  text: {
    body: [
      'The electoral law is becoming more important than the manifesto that created it. A constitution is only as real as the people permitted to use it.',
      'Urban professionals want a wider franchise. Landowners want weighted representation. Workers want legal parties and meetings. Governors warn that every new voter is another person the police must learn to tolerate.',
      'There is a middle path available, but it is narrow: enough political society to produce a class invested in the state, not so much sudden freedom that the state loses the ability to distinguish opposition from insurrection.'
    ],
    quote: '“You require citizens before you can safely possess mass politics. Unfortunately citizens are usually produced by permitting politics.”',
    speaker: 'Pyotr Stolypin'
  }
});

OATR_BRANCHING.choiceOverrides[19] = ctx => [
  ['Broaden the property franchise, protect legal parties and build a middle-class constitutional bloc.', { reform: 3, legitimacy: 3, economy: 2, autocracy: -1, flags: ['middleClassCompact'] }],
  ['Keep the franchise weighted toward land, property and the zemstvos. Reform must have owners behind it.', { reform: 1, land: 1, legitimacy: 1, autocracy: 1, flags: ['propertyConstitution'] }],
  ['Universal male suffrage, unrestricted political meetings and no administrative censorship. Russia will learn freedom by using it.', { reform: 5, legitimacy: 1, autocracy: -4, pressure: 4, flags: ['massPolitics', 'maximalLiberties'] }],
  ['Rewrite the law so the countryside and nobility can permanently outvote the cities.', { autocracy: 3, reform: -2, legitimacy: -2, flags: ['juneSystem'] }]
];

addVariant(23, {
  when: ctx => ctx.score('reform') >= 8 || ctx.flag('constitutionalCompact'),
  title: 'Finland asks what the constitution means',
  text: {
    body: [
      'Helsingfors has noticed that Petersburg now speaks the language of law. Finnish senators would like to know whether law stops at the imperial frontier.',
      'The army wants uniformity. The bureaucracy wants forms that fit every province. The Finns want their old institutions recognized as something more durable than a favor.',
      'A federated empire is imaginable. So is a centralized one. What is not imaginable for long is promising constitutional government in the capital while administering the borderlands entirely by exception.'
    ],
    quote: '“Majesty, an autonomy granted in strength becomes loyalty. An autonomy conceded after mutiny becomes precedent.”',
    speaker: 'Council memorandum'
  }
});

OATR_BRANCHING.choiceOverrides[23] = ctx => [
  ['Recognize Finland as a self-governing Grand Duchy beneath the common Crown, with its own Diet and courts.', { empire: 3, reform: 3, legitimacy: 3, autocracy: -2, flags: ['federalFinland', 'federalBlueprint'] }],
  ['Restore administrative autonomy but keep defense, customs and imperial appointments in Petersburg.', { empire: 2, reform: 1, legitimacy: 2, flags: ['finnishAutonomy'] }],
  ['One empire, one law. Accelerate Russification before constitutional language becomes a solvent.', { autocracy: 3, empire: 1, legitimacy: -3, blood: 1, flags: ['russifyFinland'] }],
  ['Recognize an explicit right of national self-determination, including the right to leave the Empire.', { reform: 5, empire: -4, autocracy: -4, pressure: 5, flags: ['nationalSelfDetermination'] }]
];

addVariant(27, {
  when: ctx => ctx.score('reform') >= 8 || ctx.score('faith') >= 3,
  title: 'Free the Church from Caesar',
  text: {
    body: [
      'The Holy Synod is an organ of faith administered like a ministry. Bishops submit reports through a lay Procurator. Priests preach eternal mysteries beneath regulations printed on government paper.',
      'A growing party inside the Church asks for a restored patriarchate or council, independent ecclesiastical administration and freedom from police uses of Orthodoxy.',
      'The proposal is not secularization in the French sense. It is almost the opposite: the Church asks the state to stop owning it.'
    ],
    quote: '“Majesty, Caesar has protected the Church so closely that she can scarcely breathe.”',
    speaker: 'A provincial bishop'
  }
});

OATR_BRANCHING.choiceOverrides[27] = ctx => [
  ['Restore conciliar government, end the lay Procurator’s control and guarantee the Church independence from ordinary administration.', { faith: 4, reform: 3, legitimacy: 2, autocracy: -2, flags: ['churchFree'] }],
  ['Give the Synod wider ecclesiastical discretion, but preserve the Crown’s formal guardianship of Orthodoxy.', { faith: 2, reform: 1, legitimacy: 1, flags: ['churchAutonomy'] }],
  ['The state and the Church are one pillar. Preserve the existing settlement.', { faith: 1, autocracy: 2, legitimacy: -1, flags: ['caesarChurch'] }],
  ['Disestablish Orthodoxy from above, secularize Church property and treat religion as a wholly private matter.', { reform: 4, faith: -5, legitimacy: -3, pressure: 4, flags: ['forcedSecularization'] }]
];

addVariant(31, {
  when: ctx => ctx.flag('federalBlueprint') || ctx.score('reform') >= 12,
  title: 'How many Russias can one Crown contain?',
  text: {
    body: [
      'The western zemstvo question has become a constitutional question in disguise. Poles, Lithuanians, Belarusians, landowners, clergy and officials all agree that local government is necessary. They agree on little else.',
      'The federalists propose a bargain: local diets, cultural rights and provincial responsibility beneath a common dynasty, army and foreign policy.',
      'The Interior Ministry replies that this is how empires become maps.'
    ],
    quote: '“The choice is not between difference and unity. The difference already exists.”',
    speaker: 'Pyotr Stolypin'
  }
});

OATR_BRANCHING.choiceOverrides[31] = ctx => [
  ['Create elected provincial diets and make the federal bargain explicit: local government beneath the Crown.', { reform: 3, empire: 3, legitimacy: 3, autocracy: -2, flags: ['federalBlueprint', 'provincialDiets'] }],
  ['Expand zemstvos only where property and loyalty provide a stable electorate.', { reform: 1, land: 1, empire: 1, legitimacy: 1 }],
  ['Govern the western provinces through appointed officials. National politics is precisely what local government would create.', { autocracy: 3, empire: 1, legitimacy: -2, flags: ['appointedWest'] }],
  ['Promise each nationality the right to determine its own constitutional future.', { reform: 5, empire: -3, autocracy: -3, pressure: 4, flags: ['nationalSelfDetermination'] }]
];

addVariant(45, {
  when: ctx => ctx.score('reform') >= 12 || ctx.flag('federalBlueprint'),
  title: 'Three hundred years — and who comes next?',
  text: {
    body: [
      'The Romanov tercentenary has produced processions, icons, speeches and an unavoidable dynastic question.',
      'Alexei is beloved and fragile. Olga is healthy, intelligent and already old enough to understand that rooms change when her father enters them.',
      'The succession law is treated at court as sacred because Peter the Great changed it, Paul changed it again, and everyone therefore agrees it must never be changed.'
    ],
    quote: '“A dynasty is strongest when the law serves the dynasty, not when the dynasty serves a dead legislator.”',
    speaker: 'A constitutional jurist'
  }
});

OATR_BRANCHING.choiceOverrides[45] = ctx => [
  ['End male-only primogeniture. Olga will inherit before any more distant male Romanov.', { reform: 3, legitimacy: 3, faith: 1, autocracy: -1, flags: ['olgaSuccession'] }],
  ['Preserve the Pauline law. Alexei is the heir and God will decide the rest.', { faith: 1, autocracy: 2, veil: 1, flags: ['malePrimogeniture'] }],
  ['Create a regency statute but leave the line of succession untouched.', { reform: 1, legitimacy: 1, door: 1, flags: ['regencyStatute'] }],
  ['Do not discuss Alexei’s health publicly. The tercentenary is a celebration, not an autopsy.', { door: 2, veil: 1 }]
];

addVariant(47, {
  when: ctx => ctx.score('reform') >= 12 || ctx.flag('maximalLiberties'),
  title: 'The police discover politics',
  text: {
    body: [
      'Azef has made the abstract argument about political liberty brutally concrete. The secret police infiltrated terror and, in places, fertilized it.',
      'Constitutional ministers demand warrants, judicial oversight and a service confined to actual conspiracy. Radicals demand abolition. The Okhrana replies that the men demanding its abolition are precisely the men it is paid to watch.',
      'If you intend a freer Russia, somebody must decide what the state is still allowed to fear.'
    ],
    quote: '“A free press is survivable. A police service that invents the enemies it needs is not.”',
    speaker: 'Duma committee report'
  }
});

OATR_BRANCHING.choiceOverrides[47] = ctx => [
  ['Rebuild the Okhrana under statute: warrants, ministerial responsibility, no provocations, no political crimes without criminal acts.', { reform: 4, legitimacy: 3, blood: -2, autocracy: -1, flags: ['okhranaReformed', 'legalPolice'] }],
  ['Keep a secret service, but place it under cabinet and judicial oversight.', { reform: 2, legitimacy: 2, autocracy: 1, flags: ['legalPolice'] }],
  ['Abolish the political police immediately and release every nonviolent political prisoner.', { reform: 5, legitimacy: 2, autocracy: -4, pressure: 5, flags: ['okhranaAbolished'] }],
  ['Expand infiltration. The constitutional parties may be legal; the revolution will not be.', { autocracy: 3, blood: 2, legitimacy: -2, flags: ['okhranaAscendant'] }]
];

addVariant(48, {
  when: ctx => ctx.flag('federalBlueprint') || ctx.flag('nationalSelfDetermination'),
  title: 'Poland watches the Crown',
  text: {
    body: [
      'Warsaw has learned to read imperial reform for loopholes and sincerity in equal measure.',
      'Polish conservatives can imagine remaining beneath a Romanov Crown if Poland governs Poland. Polish nationalists can imagine nothing short of departure. Russian nationalists consider both propositions treason.',
      'What you decide here will tell every borderland whether federal language is architecture or decoration.'
    ],
    quote: '“Majesty, if the empire can only keep Poland by pretending Poland does not exist, the argument has already been lost.”',
    speaker: 'Council memorandum'
  }
});

OATR_BRANCHING.choiceOverrides[48] = ctx => [
  ['Restore a Polish Grand Duchy with its own Diet, schools and civil administration beneath the Romanov Crown.', { reform: 3, empire: 3, legitimacy: 3, autocracy: -2, flags: ['federalPoland', 'federalBlueprint'] }],
  ['Permit Polish language, education and municipal government while keeping the province administratively Russian.', { reform: 1, empire: 1, legitimacy: 2 }],
  ['Russify administration and schools. A generation raised Russian will eventually stop asking.', { autocracy: 3, empire: 1, legitimacy: -3, blood: 1, flags: ['russifyPoland'] }],
  ['Offer a plebiscite on independence.', { reform: 5, empire: -4, autocracy: -3, pressure: 5, flags: ['nationalSelfDetermination', 'polishPlebiscite'] }]
];

/* -------------------------------------------------------------------------- */
/* STOLYPIN: GOLDEN ROUTE AND THE ROAD TO ESCHATON                            */
/* -------------------------------------------------------------------------- */

addVariant(22, {
  when: ctx => ctx.flag('earlyPeace1905') && ctx.score('leverage') < 7,
  title: 'Twenty years, on your terms',
  text: {
    body: [
      'Stolypin asks for twenty years and discovers that peace has made everyone less interested in buying them.',
      'His economic program still has a constituency: banks, industrialists, productive landowners and ministries that enjoy tax receipts. His constitutional program has enemies in every corridor.',
      'You can give him the whole wager. You can also give him only the machinery.'
    ],
    quote: '“An efficient state without legal habits is not reform, Majesty. It is merely a stronger instrument.”',
    speaker: 'Pyotr Stolypin'
  }
});

OATR_BRANCHING.choiceOverrides[22] = ctx => {
  if (ctx.flag('earlyPeace1905')) return [
    ['Give Stolypin the whole program: land, local government, legal reform and political protection against your own court.', { reform: 4, land: 4, economy: 3, legitimacy: 3, autocracy: -2, leverage: 3, flags: ['stolypinBacked', 'stolypinFullProgram'] }],
    ['Give him land banks, industry, railways and administrative modernization — but no further surrender of political authority.', { land: 2, economy: 4, military: 1, reform: 1, autocracy: 2, flags: ['stolypinEconomicOnly'] }],
    ['Support the land program privately and let the court limit everything else.', { land: 2, reform: 1, door: 1, flags: ['stolypinHalfBacked'] }],
    ['The emergency has passed. Return Russia to ordinary administration.', { autocracy: 2, reform: -2, land: -2, leverage: -2, flags: ['stolypinChecked'] }]
  ];
  return null;
};

addVariant(33, {
  when: ctx => ctx.flag('stolypinEconomicOnly') && ctx.flag('stolypinLives'),
  title: 'The machine and the man who built it',
  text: {
    body: [
      'Stolypin has won appropriations and lost arguments. Grain moves faster. Credit is deeper. Factories multiply. The army buys better shells.',
      'The Duma remains peripheral, governors remain powerful and the police remain accustomed to solving political problems administratively.',
      'Stolypin tells you the economy is becoming modern faster than the state. The General Staff regards this as excellent news.'
    ],
    quote: '“I asked for twenty years to change Russia. You have given me twenty years to strengthen the parts that resist change.”',
    speaker: 'Pyotr Stolypin'
  }
});

OATR_BRANCHING.choiceOverrides[33] = ctx => {
  if (!(ctx.flag('stolypinEconomicOnly') && ctx.flag('stolypinLives'))) return null;
  return [
    ['Reverse course and give Stolypin the political reforms he says the new economy requires.', { reform: 4, legitimacy: 3, autocracy: -2, flags: ['stolypinBacked', 'stolypinLatePolitical'] }],
    ['Keep him on economics and land. The Duma will not govern the Empire.', { economy: 3, land: 2, autocracy: 2, reform: -1, flags: ['stolypinNeutered'] }],
    ['Increase military appropriations from the new tax base and let Stolypin complain.', { economy: 1, military: 4, autocracy: 2, flags: ['stolypinNeutered', 'armyModernState'] }],
    ['Ask him to stop speaking as though prosperity is a constitutional argument.', { door: 2, autocracy: 1, flags: ['stolypinNeutered'] }]
  ];
};

addVariant(53, {
  when: ctx => ctx.flag('stolypinNeutered') && ctx.score('military') >= 10 && ctx.score('economy') >= 6,
  title: 'The army discovers the modern state',
  text: {
    body: [
      'The 1914 plan is the first General Staff document in years that does not read like an apology for 1905.',
      'The railways are faster. Depots are fuller. Procurement has improved. Mobilization districts report on time because ministries have finally learned to fear schedules.',
      'The generals are grateful to Stolypin for the tax base and contemptuous of his remaining politics. They have begun to understand that the most modern institution in Russia may soon be the army.'
    ],
    quote: '“Give us the trains, Majesty. Politics may continue at its leisure.”',
    speaker: 'General Staff memorandum'
  }
});

OATR_BRANCHING.choiceOverrides[53] = ctx => {
  if (!(ctx.flag('stolypinNeutered') && ctx.score('military') >= 10)) return null;
  return [
    ['Make the General Staff answer to a civilian war ministry and the Duma appropriations committee.', { reform: 3, military: 2, legitimacy: 2, autocracy: -2, flags: ['civilianArmy'] }],
    ['Approve the plan and its railway priorities. Competence has earned discretion.', { military: 4, economy: 1, autocracy: 2, flags: ['armyMachine'] }],
    ['Give the army emergency authority over transport and industry in any mobilization.', { military: 5, autocracy: 3, reform: -2, flags: ['armyMachine', 'mobilizationState'] }],
    ['Increase the Guard’s role so modernization does not become independence.', { military: 2, autocracy: 2, economy: -1 }]
  ];
};

addVariant(56, {
  when: ctx => OATR_ROUTE.has(ctx, 'earlyPeace1905', 'stolypinLives', 'stolypinNeutered', 'armyMachine') && ctx.flag('rasputinTrusted'),
  title: 'Sarajevo — and the resignation',
  text: {
    body: [
      'The Archduke is dead. Vienna blames Serbia. Before Sazonov finishes the telegram, Stolypin places another paper on your desk.',
      'It is his resignation.',
      'He writes that the state he helped enrich now possesses an army powerful enough to dictate the tempo of policy, a parliament too weak to restrain it, and a Crown still convinced that personal will can substitute for institutions. He will not chair a government entering a European crisis under those conditions.',
      'Alexandra says there is one man who has never lied to the family about war.'
    ],
    quote: '“Majesty, I asked for twenty years. I did not ask to spend them constructing the timetable of our destruction.”',
    speaker: 'Pyotr Stolypin'
  }
});

OATR_BRANCHING.choiceOverrides[56] = ctx => {
  if (!(OATR_ROUTE.has(ctx, 'earlyPeace1905', 'stolypinLives', 'stolypinNeutered', 'armyMachine') && ctx.flag('rasputinTrusted'))) return null;
  return [
    ['Refuse the resignation. Give Stolypin full political authority now, however late.', { reform: 4, legitimacy: 3, autocracy: -2, flags: ['stolypinBacked', 'julyCivilianGovernment'] }],
    ['Accept it. Appoint Kokovtsov and keep the crisis in civilian hands.', { economy: 2, legitimacy: 1, flags: ['stolypinResigns1914', 'kokovtsovPremier'] }],
    ['Accept it. Appoint Grigori Rasputin Chairman of the Council of Ministers. He alone has warned us truthfully about war.', { veil: 7, faith: 2, legitimacy: -5, autocracy: 2, flags: ['stolypinResigns1914', 'rasputinPremier', 'eschatonDoor'] }],
    ['Accept it and allow the General Staff to chair an emergency coordinating council until the crisis passes.', { military: 4, autocracy: 3, reform: -3, flags: ['stolypinResigns1914', 'armyGovernment', 'eschatonDoor'] }]
  ];
};

addVariant(57, {
  when: ctx => ctx.flag('rasputinPremier'),
  title: 'The Prime Minister is shot',
  text: {
    body: [
      'Rasputin lasts six days as Chairman of the Council of Ministers.',
      'He spends four of them refusing the General Staff’s requests for preparatory measures. On the fifth he orders Sazonov to tell Belgrade that Russia will not die for Serbia. On the sixth, two officers enter the Mariinsky Palace after midnight.',
      'The official report says they intended only to arrest him.',
      'The official report has been rewritten three times.',
      'Grigori Efimovich Rasputin is dead.'
    ],
    quote: '“Deliver me from the workers of iniquity, and save me from bloody men.”',
    speaker: 'Psalm 59:2'
  }
});

OATR_BRANCHING.choiceOverrides[57] = ctx => ctx.flag('rasputinPremier') ? [
  ['…', { veil: 5, blood: 4, legitimacy: -4, pressure: 5, flags: ['rasputinMurderedArmy'] }]
] : null;

addVariant(58, {
  when: ctx => ctx.flag('rasputinMurderedArmy'),
  title: 'There is no civilian government',
  text: {
    body: [
      'The Duma demands arrests. The generals refuse to surrender the officers while mobilization planning is under way. Ministers resign rather than sign orders nobody intends to obey.',
      'Alexandra has locked herself in the chapel.',
      'The state still functions. Trains run. Telegraphs answer. Regiments receive instructions. The only institutions still capable of issuing commands are the palace and the army.',
      'By morning the constitutional question has become administrative.'
    ],
    quote: '“Set thou a wicked man over him: and let Satan stand at his right hand.”',
    speaker: 'Psalm 109:6'
  }
});

OATR_BRANCHING.choiceOverrides[58] = ctx => ctx.flag('rasputinMurderedArmy') ? [
  ['Dissolve the Duma. Establish a Supreme Military Council with emergency authority over the ministries.', { military: 5, autocracy: 5, reform: -6, blood: 3, veil: 4, flags: ['armyGovernment', 'dumaDissolvedArmy', 'eschaton'] }]
] : null;

const eschatonVariants = {
  59: {
    title: 'The ultimatum becomes a timetable',
    body: [
      'Vienna’s ultimatum to Serbia arrives as a diplomatic document and leaves the room as a railway problem.',
      'The Supreme Military Council has already distributed preparatory orders. Nobody remembers authorizing several of them.',
      'A clerk points out that one mobilization table is dated 1916. The table is nevertheless being followed in Kiev.'
    ],
    quote: '“Break their teeth, O God, in their mouth.”', speaker: 'Psalm 58:6'
  },
  60: {
    title: 'Forty-eight hours without ministers',
    body: [
      'There is no cabinet meeting because there is no cabinet capable of meeting.',
      'Generals sit at the long table beneath portraits of emperors. They refer to Serbia twice and railway capacity nineteen times.',
      'You notice that Rasputin’s chair has been left empty. Nobody admits leaving it there.'
    ],
    quote: '“Let his days be few; and let another take his office.”', speaker: 'Psalm 109:8'
  },
  61: {
    title: 'Mobilization is government',
    body: [
      'Austria declares war on Serbia. The Supreme Military Council presents mobilization not as a choice but as the first act of administration.',
      'Civilian governors are instructed to obey military districts. Factories are assigned quotas. Railways are transferred to operational control.',
      'The state you spent nine years modernizing closes around the timetable like a fist.'
    ],
    quote: '“The wicked shall be turned into hell, and all the nations that forget God.”', speaker: 'Psalm 9:17'
  },
  62: {
    title: 'Willy writes to a government that no longer exists',
    body: [
      'The Kaiser telegraphs you personally. His message is warm, frightened and almost normal.',
      'The Military Council drafts your reply before you finish reading his.',
      'In the margin someone has written in a hand you recognize: <em>Do not go where the blood is waiting, Papa.</em>'
    ],
    quote: '“His mischief shall return upon his own head.”', speaker: 'Psalm 7:16'
  },
  63: {
    title: 'The timetable answers everyone',
    body: [
      'France asks what Russia intends. Germany asks what Russia intends. Serbia asks what Russia intends.',
      'The railway administration reports that intention is no longer a useful category.',
      'Twenty-seven trains leave Warsaw before dawn.'
    ],
    quote: '“Let death seize upon them, and let them go down quick into hell.”', speaker: 'Psalm 55:15'
  },
  64: {
    title: 'The red forms',
    body: [
      'General mobilization forms are printed in red ink so they cannot be confused with ordinary administration.',
      'By evening there are so many red forms in the ministries that ordinary administration becomes difficult to locate.',
      'One form orders the mobilization of a regiment that was disbanded in 1908. The depot reports full compliance.'
    ],
    quote: '“Consume them in wrath, consume them, that they may not be.”', speaker: 'Psalm 59:13'
  },
  65: {
    title: 'Alexandra hears him downstairs',
    body: [
      'Alexandra tells you Grigori is in the palace.',
      'You remind her that Grigori is dead.',
      'She looks at you with extraordinary pity and says she knows.',
      'The Military Council requests your signature on another railway decree.'
    ],
    quote: '“At evening let them return; and let them make a noise like a dog.”', speaker: 'Psalm 59:14'
  },
  66: {
    title: 'Counterorder',
    body: [
      'You ask whether mobilization can be stopped.',
      'Three generals answer in three different ways. None of them says yes.',
      'A fourth voice, somewhere behind your chair, begins reciting a Psalm.'
    ],
    quote: '“I did not say whom.”', speaker: 'Grigori Rasputin'
  },
  67: {
    title: 'The German ultimatum',
    body: [
      'Berlin demands that Russia halt mobilization.',
      'The demand is forwarded to the Supreme Military Council, which files it under foreign correspondence.',
      'The artillery districts receive their ammunition allocations on schedule.'
    ],
    quote: '“The Lord shall laugh at him: for he seeth that his day is coming.”', speaker: 'Psalm 37:13'
  },
  68: {
    title: 'The embassy burns papers',
    body: [
      'The German embassy burns its files. Smoke rises over Petersburg.',
      'A police clerk records the smoke as an atmospheric condition.',
      'At Pskov, a telegraph operator receives a mobilization order dated 3 September 1921. He sends it onward because the cipher is correct.'
    ],
    quote: '“They have prepared a net for my steps.”', speaker: 'Psalm 57:6'
  },
  69: {
    title: 'The last telegram is not the last',
    body: [
      'Willy sends one more telegram.',
      'Then another arrives beneath it.',
      'The second is dated 17 March 1927 and begins: DAY 4,604 OF MOBILIZATION.',
      'The telegraphist asks whether he should discard it. Nobody answers.'
    ],
    quote: '“He shall rain snares, fire and brimstone, and an horrible tempest.”', speaker: 'Psalm 11:6'
  },
  70: {
    title: 'And the kings of the earth hid themselves',
    body: [
      'The palace windows are open. The bells are ringing. The army reports that everything is proceeding according to plan.',
      'For an instant you see Europe as a map of railway lines without cities between them.',
      'Somewhere west of Minsk, artillery begins firing.',
      '<em>You cannot remember whether the war has started.</em>'
    ],
    quote: '“Let death seize upon them, and let them go down quick into hell.”', speaker: 'Psalm 55:15'
  }
};

Object.entries(eschatonVariants).forEach(([id, v]) => addVariant(Number(id), {
  when: ctx => ctx.flag('eschaton') && ctx.flag('armyGovernment'),
  title: v.title,
  text: { body: v.body, quote: v.quote, speaker: v.speaker }
}));

/* Keep the machine moving on the Eschaton route. Choices become variations of participation,
   not exits from a state whose political organs have already been surrendered to the army. */
[59,60,61,62,63,64,65,66,67,68,69].forEach(id => {
  const old = OATR_BRANCHING.choiceOverrides[id];
  OATR_BRANCHING.choiceOverrides[id] = ctx => {
    if (ctx.flag('eschaton') && ctx.flag('armyGovernment')) return [
      ['Proceed according to the Supreme Military Council’s instructions.', { military: 2, blood: 2, veil: 1, autocracy: 1, flags: ['war1914', 'totalWar', 'eschatonLocked'] }],
      ['Ask whether the order can still be stopped.', { door: 2, veil: 2, blood: 1, flags: ['war1914', 'totalWar', 'eschatonLocked'] }],
      ['Sign without reading the final page.', { door: 3, military: 1, blood: 2, flags: ['war1914', 'totalWar', 'eschatonLocked'] }]
    ];
    return old ? old(ctx) : null;
  };
});

const base70Override = OATR_BRANCHING.choiceOverrides[70];
OATR_BRANCHING.choiceOverrides[70] = ctx => {
  if (ctx.flag('eschaton') && ctx.flag('armyGovernment')) return [
    ['The schedule is already in motion.', { military: 2, blood: 4, veil: 4, flags: ['war1914', 'totalWar', 'eschatonLocked'] }]
  ];
  return base70Override ? base70Override(ctx) : null;
};

/* Dead Rasputin becomes the adviser once the army murders him. */
const OATR_ROUTE_RENDER_ADVISOR = renderAdvisor;
renderAdvisor = function(question) {
  if (!(state.flags.has('rasputinMurderedArmy') && state.flags.has('armyGovernment') && question.id >= 58)) {
    return OATR_ROUTE_RENDER_ADVISOR(question);
  }
  const psalms = [
    ['Break their teeth, O God, in their mouth.', 'PSALM 58:6'],
    ['Let death seize upon them, and let them go down quick into hell.', 'PSALM 55:15'],
    ['Consume them in wrath, consume them, that they may not be.', 'PSALM 59:13'],
    ['The Lord shall laugh at him: for he seeth that his day is coming.', 'PSALM 37:13']
  ];
  const [verse, cite] = psalms[(question.id - 58) % psalms.length];
  return `<div class="advisor-scrim" role="dialog" aria-modal="true">
    <section class="advisor-card">
      <p class="advisor-label">PRIVATE ADVICE · NO FILE NUMBER</p>
      <div class="advisor-layout">
        <div class="advisor-portrait"><span>Г.Е.</span></div>
        <div class="advisor-copy">
          <p class="handwritten">You buried him.</p>
          <h2>GRIGORI RASPUTIN</h2>
          <p class="advisor-role">DECEASED · CHAIRMAN OF THE COUNCIL OF MINISTERS</p>
          <blockquote>“${verse}”<br><small>${cite}</small></blockquote>
          <p class="decision-echo">You ordered: “${state.pending.label}”</p>
          <p class="fate-note">You ask whom the Psalm is for.<br><br>He smiles.<br><br>“I did not say whom.”</p>
          <button data-continue>CONTINUE <span>→</span></button>
        </div>
      </div>
    </section>
  </div>`;
};

/* -------------------------------------------------------------------------- */
/* GERMANOPHILE ROUTES                                                        */
/* -------------------------------------------------------------------------- */

addVariant(24, {
  when: () => true,
  title: 'Vienna moves the marker',
  text: {
    body: [
      'Austria-Hungary annexes Bosnia-Herzegovina. Belgrade is furious. Berlin stands behind Vienna. Paris waits to see what you will do.',
      'There is another possibility almost nobody in the Foreign Ministry enjoys saying aloud: Russia could stop treating Germany as the inevitable enemy and Serbia as an automatic obligation.',
      'It would require swallowing humiliation now in exchange for an entirely different European alignment later.'
    ],
    quote: '“Cousins may quarrel, Majesty. Alliances make the quarrel expensive.”',
    speaker: 'Count Lamsdorff'
  }
});

OATR_BRANCHING.choiceOverrides[24] = ctx => [
  ['Open a direct understanding with Berlin and Vienna. Russia will not contest Bosnia if Germany recognizes Russian interests elsewhere.', { legitimacy: -1, empire: -1, britain: 1, economy: 1, flags: ['germanOpening'] }],
  ['Stand behind Serbia diplomatically, but do not mobilize.', { empire: 2, legitimacy: 1, flags: ['serbiaPatron'] }],
  ['Call for an international conference and trade recognition for concessions.', { reform: 1, legitimacy: 1 }],
  ['The annexation succeeds because Britain prefers Austria to Russia in the Balkans.', { britain: 3, veil: 1 }]
];

addVariant(42, {
  when: ctx => ctx.flag('germanOpening'),
  title: 'The Balkans march without Russian permission',
  text: {
    body: [
      'The Balkan League attacks the Ottoman Empire. Serbia expects Russian enthusiasm. Berlin expects Russian restraint.',
      'Your understanding with Germany has survived four years because both courts have avoided asking what it means when Slavic sentiment and continental strategy point in opposite directions.',
      'The small kingdoms have now asked the question for you.'
    ],
    quote: '“Majesty, Serbia believes kinship is a treaty clause.”',
    speaker: 'Sergei Sazonov'
  }
});

OATR_BRANCHING.choiceOverrides[42] = ctx => {
  if (!ctx.flag('germanOpening')) return null;
  return [
    ['Coordinate with Berlin: no Russian guarantee to Serbia, no Austrian intervention while the Balkan states fight the Turks.', { economy: 1, empire: -1, legitimacy: -1, flags: ['germanophile', 'serbiaCool'] }],
    ['Support Serbia diplomatically despite Berlin. The German opening has limits.', { empire: 2, legitimacy: 1, flags: ['serbiaPatron'] }],
    ['Mediate collectively and avoid choosing between cousins and Slavs.', { door: 1, legitimacy: 1 }],
    ['Explain privately that Britain benefits from every quarrel between continental monarchies.', { britain: 3, veil: 1, flags: ['germanophile'] }]
  ];
};

addVariant(54, {
  when: ctx => ctx.flag('germanophile'),
  title: 'France expects — Berlin offers',
  text: {
    body: [
      'Paris wants confirmation that the alliance still means what Paris thinks it means. Berlin quietly offers something larger: a continental understanding among the Romanovs and Hohenzollerns, with Austria included where possible.',
      'The bankers point out that France financed a great deal of your railway network. The generals point out that those same railways were designed around a German war.',
      'Willy’s personal note is much shorter than the diplomatic memorandum: <em>Nicky, why are we preparing to kill one another for people neither of us particularly likes?</em>'
    ],
    quote: '“A new alliance is an excellent way to discover how much old debt you have.”',
    speaker: 'Vladimir Kokovtsov'
  }
});

OATR_BRANCHING.choiceOverrides[54] = ctx => {
  if (!ctx.flag('germanophile')) return null;
  return [
    ['Break the French military convention and negotiate a formal continental pact with Germany.', { britain: 3, economy: -2, military: -1, legitimacy: -1, flags: ['germanAlliance'] }],
    ['Keep France, keep Berlin warm, and promise nobody anything new.', { door: 2, legitimacy: 1 }],
    ['Return to the French alliance. Personal affection is not strategy.', { legitimacy: 1, economy: 2, flags: ['franceConfirmed'] }],
    ['Tell Willy that the real strategic problem is the Anglo-Saxon oceanic system.', { britain: 5, veil: 2, flags: ['germanAlliance', 'thalassocracyDoctrine'] }]
  ];
};

addVariant(58, {
  when: ctx => ctx.flag('germanAlliance') && !ctx.flag('rasputinMurderedArmy'),
  title: 'Serbia asks what Russia means',
  text: {
    body: [
      'Belgrade asks whether Russia will stand behind Serbia against Austria.',
      'Berlin asks whether your continental pact means Russia will restrain Serbia.',
      'The answer cannot be postponed much longer. One relationship will become real by disappointing the other.'
    ],
    quote: '“Majesty, alliances become visible at the moment somebody is abandoned.”',
    speaker: 'Sergei Sazonov'
  }
});

const old58 = OATR_BRANCHING.choiceOverrides[58];
OATR_BRANCHING.choiceOverrides[58] = ctx => {
  if (ctx.flag('rasputinMurderedArmy')) return [['Dissolve the Duma. Establish a Supreme Military Council with emergency authority over the ministries.', { military: 5, autocracy: 5, reform: -6, blood: 3, veil: 4, flags: ['armyGovernment', 'dumaDissolvedArmy', 'eschaton'] }]];
  if (ctx.flag('germanAlliance')) return [
    ['Tell Serbia plainly that Russia will not fight Austria over the ultimatum. Accept what can be accepted and survive.', { empire: -3, legitimacy: -2, flags: ['abandonSerbia', 'germanAlliance'] }],
    ['Threaten to leave the German pact unless Vienna moderates the ultimatum.', { legitimacy: 1, empire: 1, flags: ['conditionalGermany'] }],
    ['Reverse course and guarantee Serbia after all.', { empire: 3, military: 1, flags: ['serbiaPatron'] }],
    ['Tell Berlin that Russia will stand aside if Germany supports the eventual return of Alaska.', { britain: 6, veil: 2, flags: ['abandonSerbia', 'thalassocracyDoctrine', 'alaskaIdea'] }]
  ];
  return old58 ? old58(ctx) : null;
};

addVariant(60, {
  when: ctx => ctx.flag('germanAlliance') && ctx.flag('abandonSerbia') && ctx.score('reform') >= 12 && ctx.score('autocracy') <= 12,
  title: 'Dear Tsar, German Devil',
  text: {
    body: [
      'The first telegram says that Cossack regiments in the capital have refused orders from the Interior Ministry.',
      'The second says Black Hundred organizations are marching beneath icons and portraits of Alexander III.',
      'The third is signed by officers of the Guard. It accuses you of betraying Slavic blood, humiliating Holy Russia before the German, weakening autocracy through constitutional experiments, and placing the dynasty beneath foreign influence.',
      'They demand your abdication in order to save the principles of monarchy.',
      'By evening nobody can agree which Romanov should replace you. The men who overthrew the Tsar therefore proclaim a Russian Federation.'
    ],
    quote: '“The Crown has been protected from the German Devil who wore it.”',
    speaker: 'Provisional National Directorate proclamation'
  }
});

const old60 = OATR_BRANCHING.choiceOverrides[60];
OATR_BRANCHING.choiceOverrides[60] = ctx => {
  if (ctx.flag('germanAlliance') && ctx.flag('abandonSerbia') && ctx.score('reform') >= 12 && ctx.score('autocracy') <= 12) return [
    ['Sign the abdication. The Guard has already occupied the telegraph office.', { legitimacy: -8, blood: 4, military: 4, autocracy: -4, flags: ['blackHundredCoup', 'russianFederation'] }]
  ];
  return old60 ? old60(ctx) : null;
};

const federationVariants = {
  61: ['The Federation mobilizes itself', ['The men who denounced parliamentary weakness establish fourteen emergency committees before breakfast.','Cossack hosts receive “temporary” territorial commands. Black Hundred clubs become patriotic auxiliaries. The Duma is retained because nobody can decide who has authority to dissolve it.','Austria notices that the new Russian Federation is mobilizing despite having overthrown you for refusing to support Serbia.'], '“The Revolution is over. National discipline begins.”', 'National Directorate'],
  64: ['Every faction receives a uniform', ['The Federation discovers that federalism is easiest when every constituent region is commanded by a general.','Poland is promised autonomy and placed under martial law. Finland is congratulated on its liberties and ordered to provide railway rolling stock.','The Cossacks request permission to “stabilize” three neighboring provinces. Permission is granted retroactively.'], '“Local self-government requires local self-defense.”', 'Interior Committee'],
  67: ['Germany asks what happened to Nicky', ['Berlin sends a diplomatic note asking whether the new government intends to honor your agreements.','The Directorate replies that treaties made by a German puppet cannot bind free Russia.','The same communiqué demands German diplomatic support for Russian claims in the Straits.'], '“We have liberated foreign policy from consistency.”', 'Foreign Committee'],
  70: ['The Federation discovers the neighborhood', ['By August the state that overthrew you for being too liberal has banned six parties, armed seven militias, dissolved two provincial diets and announced the liberation of four peoples who were not consulted.','Nobody restores the monarchy. Nobody restores the constitution either.','A republic created to save autocracy has discovered that the Tsar was one of the few institutions capable of telling its patriots no.'], '“Russia is free.”', 'A poster beside a requisition notice']
};
Object.entries(federationVariants).forEach(([id, [title, body, quote, speaker]]) => addVariant(Number(id), {
  when: ctx => ctx.flag('russianFederation'), title, text: { body, quote, speaker }
}));

[61,62,63,64,65,66,67,68,69,70].forEach(id => {
  const prior = OATR_BRANCHING.choiceOverrides[id];
  OATR_BRANCHING.choiceOverrides[id] = ctx => {
    if (ctx.flag('russianFederation')) return [
      ['The National Directorate proceeds.', { military: 2, blood: 2, empire: 2, legitimacy: -1, flags: ['federationRampage'] }],
      ['The Cossack hosts demand a freer hand.', { military: 1, blood: 3, empire: 2, autocracy: 1, flags: ['federationRampage'] }],
      ['The Duma protests and is informed that this is what constitutional government looks like now.', { reform: -2, autocracy: 2, blood: 1, flags: ['federationRampage'] }]
    ];
    return prior ? prior(ctx) : null;
  };
});

/* Alaska joke path. */
addVariant(55, {
  when: ctx => ctx.flag('thalassocracyDoctrine') && ctx.score('britain') >= 10,
  title: 'The map contains an old wound',
  text: {
    body: [
      'A naval officer produces a map of the North Pacific during a discussion that was originally about Britain.',
      'Someone points to Alaska. Someone else points out that Alaska is American. The first officer replies that this only proves the Anglo-Saxon maritime system has become more sophisticated.',
      'Willy’s latest personal letter contains three underlined words: <em>WHY NOT, NICKY?</em>'
    ],
    quote: '“The sale of 1867 may be interpreted as an unusually long lease.”',
    speaker: 'A memorandum that should not exist'
  }
});

const old55 = OATR_BRANCHING.choiceOverrides[55];
OATR_BRANCHING.choiceOverrides[55] = ctx => {
  if (ctx.flag('thalassocracyDoctrine') && ctx.score('britain') >= 10) return [
    ['Open contingency planning for the “recovery” of Alaska in a future Anglo-Saxon crisis.', { britain: 5, military: 2, veil: 2, flags: ['alaskaPlan'] }],
    ['Tell everyone in the room to stop talking.', { legitimacy: 1, veil: -1 }],
    ['Send the map to Willy with no explanation.', { britain: 3, veil: 1, flags: ['alaskaPlan'] }]
  ];
  return old55 ? old55(ctx) : null;
};

addVariant(69, {
  when: ctx => ctx.flag('alaskaPlan') && ctx.flag('germanAlliance') && ctx.score('britain') >= 14,
  title: 'The North Pacific question',
  text: {
    body: [
      'Europe has stepped back from general war. The German alliance holds. Serbia is furious but alive.',
      'The War Ministry therefore submits the contingency paper everyone assumed would die in a locked cabinet.',
      'Its title is: ON THE RESTORATION OF RUSSIAN SOVEREIGNTY IN ALASKA DURING A CRISIS OF THE ANGLO-SAXON OCEANIC SYSTEM.',
      'The Americans have not been consulted.'
    ],
    quote: '“NICKY!!! MAGNIFICENT!!!”',
    speaker: 'Wilhelm II, personal telegram'
  }
});

const old69 = OATR_BRANCHING.choiceOverrides[69];
OATR_BRANCHING.choiceOverrides[69] = ctx => {
  if (ctx.flag('alaskaPlan') && ctx.flag('germanAlliance') && ctx.score('britain') >= 14) return [
    ['Liberate Sitka from the Anglo-Saxon thalassocratic yoke.', { military: 2, britain: 5, economy: -4, veil: 2, flags: ['alaskaInvasion', 'peace1914'] }],
    ['The memorandum has gone far enough. Burn it.', { legitimacy: 1, britain: -2, flags: ['peace1914'] }]
  ];
  return old69 ? old69(ctx) : null;
};

/* -------------------------------------------------------------------------- */
/* FAIL STATES                                                                 */
/* -------------------------------------------------------------------------- */

const OATR_FAIL_STATES = [
  {
    id: 'six-civil-wars', title: 'SIX FIRES IN ONE HOUSE', kicker: 'FREEDOM ARRIVES FASTER THAN THE STATE', family: 'FAIL STATE',
    test: s => s.history.length >= 24 && s.flags.has('maximalLiberties') && s.flags.has('nationalSelfDetermination') && s.flags.has('okhranaAbolished') && s.legitimacy < 18,
    text: 'Political prisoners walk out before the courts know which cases still exist. National committees declare provisional sovereignties. Revolutionary parties organize armed guards openly. Governors refuse orders they consider unconstitutional; army districts refuse governors they consider revolutionary. You have not created liberty. You have removed three coercive structures before building one legitimate structure capable of replacing them. By winter there are six governments claiming legal authority and twelve claiming historical authority.'
  },
  {
    id: 'cossacks-say-hi', title: 'THE COSSACKS SAY HELLO', kicker: 'THE CONSTITUTION HAS A HORSE PROBLEM', family: 'FAIL STATE',
    test: s => s.history.length >= 18 && s.reform >= 22 && s.autocracy <= -8 && s.military < 8 && !s.flags.has('middleClassCompact'),
    text: 'The Guards do not object to elections. They object to discovering that nobody appears responsible for telling the elections no. Cossack regiments enter the capital “to preserve order.” The Duma requests they withdraw. They decline. The cabinet requests your support. The palace guard requests your abdication. Russia has achieved responsible government approximately six hours before discovering that responsibility without a coalition is a theory.'
  },
  {
    id: 'throne-without-country', title: 'THE THRONE WITHOUT A COUNTRY', kicker: 'ORDER CONSUMES ITS SUBJECTS', family: 'FAIL STATE',
    test: s => s.history.length >= 30 && s.autocracy >= 30 && s.blood >= 28 && s.legitimacy <= -12,
    text: 'Every organization outside the state has been treated as a threat until the state is the only organization left. Then parts of the state begin treating one another as threats. Governors hoard troops. Police files become political weapons between ministries. Peasant districts stop paying taxes because the tax collectors travel with infantry and therefore announce themselves weeks in advance. The throne possesses unlimited authority over a country increasingly capable of hearing it and doing nothing.'
  },
  {
    id: 'savior-uniform-early', title: 'THE SAVIOR IN UNIFORM', kicker: 'THE ARMY PROTECTS THE CROWN FROM ITS OWNER', family: 'FAIL STATE',
    test: s => s.history.length >= 52 && s.military >= 24 && s.autocracy >= 22 && s.legitimacy < 3 && !s.flags.has('civilianArmy') && !s.flags.has('armyGovernment'),
    text: 'The generals do not abolish the monarchy. That would be radical. They simply explain that national survival requires the Emperor to cease interfering with government. Your portrait remains in every barracks. Your signature remains on decrees prepared elsewhere. Russia has solved personalized rule by ensuring the person at its center has no power at all.'
  }
];

function renderFailState(fail) {
  document.querySelector('#app').innerHTML = `
    <main class="ending-page ending-fail-state">
      <div class="ornament">☦</div>
      <p class="eyebrow">THE REIGN ENDS BEFORE 1914</p>
      <h1>${fail.title}</h1>
      <p class="ending-kicker">${fail.kicker}</p>
      <div class="rule"><span>◆</span></div>
      <p class="ending-family">${fail.family}</p>
      <p class="ending-copy">${fail.text}</p>
      <div class="ending-actions"><button class="restart" data-restart>BEGIN AGAIN</button><button class="restart" data-review>REVIEW THE REIGN</button></div>
      <p class="fineprint">The state reached a condition from which the campaign cannot continue coherently.</p>
    </main>`;
  document.querySelector('[data-restart]').onclick = resetCampaign;
  document.querySelector('[data-review]').onclick = renderReview;
}

const OATR_BASE_APPLY_FOR_FAILURES = apply;
apply = function(choiceIndex) {
  OATR_BASE_APPLY_FOR_FAILURES(choiceIndex);
  const snapshot = { ...state.scores, flags: state.flags, history: state.history };
  const fail = OATR_FAIL_STATES.find(f => f.test(snapshot));
  if (fail) {
    state.failEnding = fail.id;
    saveState();
    renderFailState(fail);
  }
};

/* -------------------------------------------------------------------------- */
/* ENDING SUITE                                                                */
/* -------------------------------------------------------------------------- */

OATR_ENDINGS.splice(0, OATR_ENDINGS.length,
  {
    id: 'eschaton', family: 'SECRET · ESCHATOLOGICAL NIGHTMARE', title: 'ESCHATON', kicker: 'AND THE KINGS OF THE EARTH HID THEMSELVES',
    test: s => s.flags.has('eschatonLocked') && s.flags.has('armyGovernment') && s.flags.has('rasputinMurderedArmy'),
    text: 'The war does not end. Governments do. By 1922 France has changed ministries eleven times and Germany has changed flags twice. The mobilization schedules remain. Children inherit regimental numbers from fathers they never met. Orphanages are assigned to replacement battalions. In 1927 a Russian telegraph office receives DAY 4,732 OF MOBILIZATION and nobody can identify the office that sent it. In 1933 a battery west of Minsk receives an order to fire. Minsk has been empty for six years. Germany has had four governments since anyone last knew who issued the order. The crew loads the gun. They have never done anything else. Europe has not been destroyed by war. Europe has become war. Somewhere behind the clouds, a bell rings. Rasputin smiles. There shall be no fourth.'
  },
  {
    id: 'german-devil', family: 'SECRET · NATIONAL REVOLUTION', title: 'DEAR TSAR, GERMAN DEVIL', kicker: 'THE REPUBLIC THAT COUPED THE TSAR TO SAVE AUTOCRACY',
    test: s => s.flags.has('russianFederation') && s.flags.has('blackHundredCoup'),
    text: 'The men who overthrew you for weakening autocracy cannot agree on a new autocrat. They therefore invent a republic administered by generals, Cossack hosts, patriotic leagues and provincial bosses. It calls itself federal while imposing martial law, constitutional while banning opposition, and defensive while repeatedly crossing borders to liberate people who did not request liberation. The Romanov throne is gone. Nearly every habit that made the throne dangerous survives it.'
  },
  {
    id: 'perfidious-ocean', family: 'SECRET · BLACK COMEDY', title: 'THE PERFIDIOUS HOMOSEXUAL ANGLO-SAXON OCEANIC EMPIRE', kicker: 'NICKY AND WILLY SOLVE GEOPOLITICS',
    test: s => s.flags.has('alaskaInvasion'),
    text: 'Russia and Germany avoid destroying Europe and instead devote immense diplomatic energy to proving that every continental inconvenience originates at sea. The Russian Army lands in Alaska beneath banners announcing liberation from the Anglo-Saxon thalassocratic system. The United States asks what this means. Nobody in Petersburg has prepared an answer. Sitka is occupied at a cost large enough to finance several years of rural schools. Wilhelm sends seventeen exclamation marks. The Foreign Ministry declares the operation a historic correction. Alaska remains extremely far away.'
  },
  {
    id: 'good-queen-olga', family: 'GOLDEN · FEDERAL', title: 'GOOD QUEEN OLGA', kicker: 'THE CROWN LEARNS TO SHARE THE MAP',
    test: s => s.flags.has('olgaSuccession') && s.flags.has('churchFree') && s.flags.has('federalBlueprint') && s.flags.has('peace1914') && s.reform >= 18 && s.legitimacy >= 16,
    text: 'You leave Olga a Crown lighter than the one you inherited. Finland and Poland are Grand Duchies in fact rather than antique titles. Baltic and Caucasian diets govern local affairs beneath a common dynasty, army and foreign policy. The Orthodox Church, freed from bureaucratic ownership, becomes more independent and more genuinely religious. Russia does not become a liberal republic. It becomes something stranger and more durable: a federation of old loyalties given legal forms. In the 1930s Japan discovers that thirty years of Russian peace have not made the Far East undefended. Queen Olga attends the victory thanksgiving beneath a constitution nobody now considers temporary.'
  },
  {
    id: 'stolypin-right', family: 'GOLDEN · GREAT POWER', title: 'STOLYPIN WAS RIGHT ABOUT EVERYTHING!', kicker: 'TWENTY YEARS, MORE OR LESS',
    test: s => (s.flags.has('stolypinFullProgram') || s.flags.has('stolypinBacked') || s.flags.has('stolypinSecondWind')) && s.reform >= 18 && s.land >= 12 && s.economy >= 6 && s.military >= 10 && s.legitimacy >= 14 && s.flags.has('war1914') && !s.flags.has('totalWar'),
    text: 'The peasant becomes an owner often enough to matter. The middle class becomes political often enough to defend the state that made its prosperity possible. Ministries learn to answer to institutions rather than moods. The army mobilizes into a country whose railways, factories and finances can sustain it. Germany discovers that the Russian steamroller has finally acquired bearings. Victory does not produce revolution because there is a state beneath the Crown capable of absorbing victory. Russia enters the Congress of Europe not as its frightening eastern exception but as one of its central powers. You are remembered less as Nicholas the Great than as Nicholas who finally listened. Somewhere in Orthodox Heaven, Peter the Great is insufferably pleased. Tchaikovsky smiles politely. Stolypin is still explaining the land bank.'
  },
  {
    id: 'autocracy-works', family: 'VICTORIOUS · TERRIBLE', title: 'AUTOCRACY, BUT IT WORKS', kicker: 'THE LAURELS REQUIRE INTERNAL PASSPORTS',
    test: s => s.flags.has('war1914') && s.military >= 14 && s.autocracy >= 18 && s.reform < 15 && s.legitimacy >= 3,
    text: 'The army is competent, the railways run, the governors obey and the opposition is unable to stop any of it. Russia wins. The victory parades are enormous. So are the casualty lists, the censorship office, the veterans’ colonies and the police budget. Constantinople may even carry the cross again. The success of every emergency measure becomes the argument for retaining it. You save the empire by turning it into an efficient barracks with a stock exchange. The country is powerful. The country is exhausted. The Crown has never been safer. Almost nobody else is.'
  },
  {
    id: 'elephant-cancer', family: 'STAGNANT SUCCESS', title: 'THE ELEPHANT HAS CANCER', kicker: 'VERY LARGE · VERY ALIVE · VERY ILL',
    test: s => s.flags.has('peace1914') && s.autocracy >= 14 && s.economy >= 5 && s.reform < 15 && s.legitimacy >= 0,
    text: 'Russia avoids the continental furnace and becomes richer almost in spite of its politics. Railways spread. Oil fortunes grow. Factories appear beside medieval administration. Noble families turn ministries, banks, concessions and governorships into overlapping patronage syndicates. The system is not quite a mafia because the mafia generally knows which laws it is breaking. Russia remains formidable enough to beat up Turks, Persians and Chinese whenever the imperial mood requires exercise. Europe respects its mass, distrusts its institutions and avoids depending on its promises. The elephant is alive. The elephant is enormous. The elephant absolutely has cancer.'
  },
  {
    id: 'canon-mystic-soviet', family: 'CANON · AFTERSHOCK', title: 'THE HOUSE AT EKATERINBURG', kicker: 'THE LAST FAMILY PORTRAIT · AND THE RED ICON',
    test: s => s.flags.has('war1914') && s.flags.has('bloodySunday') && !s.flags.has('dumaReal') && s.flags.has('stolypinDead') && s.veil >= 12,
    text: 'The children are told they are moving again. Alexei cannot walk today. After two in the morning, Nicholas Alexandrovich Romanov ceases to exist. Alexandra dies believing history has become prophecy. The men who inherit Russia publicly abolish the sacred state and privately rebuild its habits with new saints, new relics and new liturgies. Portraits become icons of another kind. Processions return under different banners. The Tsar is gone. The need to sanctify power is not.'
  },
  {
    id: 'canon-military-soviet', family: 'CANON · AFTERSHOCK', title: 'THE HOUSE AT EKATERINBURG', kicker: 'THE LAST FAMILY PORTRAIT · AND THE RED GENERAL STAFF',
    test: s => s.flags.has('war1914') && s.flags.has('bloodySunday') && !s.flags.has('dumaReal') && s.flags.has('stolypinDead') && s.military >= 14,
    text: 'The children are told they are moving again. Alexei cannot walk today. After two in the morning, Nicholas Alexandrovich Romanov ceases to exist. Russia does not. The revolutionary state inherits unusually modern railways, depots, staffs and habits of emergency administration. The new rulers denounce the old army and then discover its filing cabinets are excellent. The Soviet Union that follows is less improvised, more militarized and frighteningly competent earlier than anyone expected.'
  },
  {
    id: 'canon', family: 'CANON', title: 'THE HOUSE AT EKATERINBURG', kicker: 'YOU WERE LOVED · YOU WERE NOT ENOUGH',
    test: s => s.flags.has('war1914') && s.flags.has('bloodySunday') && !s.flags.has('dumaReal') && s.reform < 15,
    text: 'The children are told they are moving again. Alexei cannot walk today. You know, finally, that every small refusal was also a decision and every postponed reform purchased time at interest. None of this makes the room less intimate. Alexandra is beside you. The girls are frightened. You love them completely. After two in the morning Nicholas Alexandrovich Romanov ceases to exist. Russia does not. That is the tragedy. The portraits come down; the offices, files, prisons and appetite for personal power remain. You die knowing you doomed the old Russia forever, and knowing that the people in the room with you would have followed you anywhere.'
  },
  {
    id: 'constitutional-peace', family: 'GOOD · INCOMPLETE', title: 'THE THIRD STILL STANDS', kicker: 'A CONSTITUTION WITH COSSACKS',
    test: s => s.flags.has('peace1914') && s.reform >= 14 && s.legitimacy >= 10,
    text: 'Russia has newspapers that can insult ministers, a Duma that can topple some of them, courts that occasionally tell governors no, and a middle class beginning to regard politics as something other than conspiracy. It also has Cossacks, emergency statutes, censorship law, an army with opinions and a secret service that has not forgotten where everyone lives. This is not liberal democracy. It is a state learning legal habits while remaining unmistakably imperial. That may be enough.'
  },
  {
    id: 'black-hundred', family: 'BAD', title: 'THE BLACK HUNDRED EMPIRE', kicker: 'THE MEN WHO LOVE THE TSAR MORE THAN THE TSAR',
    test: s => s.autocracy >= 24 && s.blood >= 20,
    text: 'The monarchy survives by teaching its loudest defenders that violence is patriotism. They eventually notice that this doctrine gives them standing to judge whether you are patriotic enough. The throne remains, but increasingly at the pleasure of men who claim to defend it.'
  },
  {
    id: 'default-war', family: 'WAR', title: 'THE GREAT WAR', kicker: 'THE MACHINE',
    test: s => s.flags.has('war1914'),
    text: 'Europe goes to war. Russia enters with whatever state you built: stronger in some places, rotten in others, magnificent on paper and terrifying in scale. The ending has not yet been written, which is another way of saying millions of people are about to write it with their bodies.'
  },
  {
    id: 'default-peace', family: 'OPEN ENDING', title: 'THE THIRD STILL STANDS', kicker: 'NINE YEARS LATER',
    test: s => true,
    text: 'August passes without general war. Russia remains contradictory, unfinished and alive. Avoiding catastrophe has not answered what the empire is for. It has merely granted another generation the dangerous privilege of answering.'
  }
);

/* On reload, restore fail screens and re-resolve route variants after this file loads. */
if (state.failEnding) {
  const failed = OATR_FAIL_STATES.find(f => f.id === state.failEnding);
  if (failed) renderFailState(failed);
} else {
  render();
}
