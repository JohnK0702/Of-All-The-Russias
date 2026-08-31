/* Campaign skeleton for Of All The Russias.
   The point of this file is structure, not final prose: seventy fixed question slots,
   era metadata, reusable policy grammars, special historical nodes, advisors and endings.
   Individual slots can be rewritten without touching the engine. */

const OATR_ERAS = [
  { id: 'crack', start: 1, end: 18, roman: 'I', name: 'THE FIRST CRACK', years: '1905–1907' },
  { id: 'breathing', start: 19, end: 38, roman: 'II', name: 'THE BREATHING SPACE', years: '1907–1911' },
  { id: 'cards', start: 39, end: 55, roman: 'III', name: 'THE HOUSE OF CARDS', years: '1911–1913' },
  { id: 'summer', start: 56, end: 70, roman: 'IV', name: 'THE LAST SUMMER', years: '1914' }
];

const OATR_ADVISORS = {
  sergei: { name: 'GRAND DUKE SERGEI ALEXANDROVICH', role: 'Your uncle · Former Governor-General of Moscow', mark: 'С.А.', tone: 'Order is not cruelty, Nicky. Indecision is cruelty distributed among subordinates.' },
  witte: { name: 'COUNT SERGEI WITTE', role: 'Chairman of the Council of Ministers', mark: 'С.Ю.', tone: 'A state may bend in public or break in private. The ministries prefer the latter because it requires less paperwork.' },
  alexandra: { name: 'ALEXANDRA FEODOROVNA', role: 'Empress of All the Russias', mark: 'А.Ф.', tone: 'They call your constancy weakness because they cannot understand what God has placed upon you.' },
  trepov: { name: 'GENERAL DMITRI TREPOV', role: 'Commandant of the Imperial Palace', mark: 'Д.Т.', tone: 'The state has spoken clearly. It will now be necessary to ensure nobody mistakes clarity for permission to answer.' },
  lamsdorff: { name: 'COUNT VLADIMIR LAMSDORFF', role: 'Minister of Foreign Affairs', mark: 'В.Л.', tone: 'The British will misunderstand this deliberately. The French will misunderstand it loyally. This is called diplomacy.' },
  stolypin: { name: 'PYOTR STOLYPIN', role: 'Chairman of the Council of Ministers', mark: 'П.А.', tone: 'You have purchased time, Majesty. Russia has always mistaken the purchase of time for the solution of a problem.' },
  kokovtsov: { name: 'VLADIMIR KOKOVTSOV', role: 'Minister of Finance', mark: 'В.Н.', tone: 'The treasury can finance reform or emergency indefinitely. It cannot finance both forever.' },
  rasputin: { name: 'GRIGORI RASPUTIN', role: 'Pilgrim · Friend of the Imperial Family', mark: 'Г.Е.', tone: 'Do not go where the blood is waiting, Papa. A river may look shallow because the dead are standing beneath it.' },
  sazonov: { name: 'SERGEI SAZONOV', role: 'Minister of Foreign Affairs', mark: 'С.Д.', tone: 'Prestige is a currency, Majesty, but unlike gold it is easiest to spend when the treasury is empty.' },
  nicholas: { name: 'GRAND DUKE NICHOLAS NIKOLAEVICH', role: 'Inspector-General of Cavalry', mark: 'Н.Н.', tone: 'An army can survive a bad plan. It cannot survive five ministries issuing good plans at once.' }
};

const OATR_CHOICE_SETS = {
  reform: [
    ['Concede the principle and make the institution real.', { reform: 2, legitimacy: 2, autocracy: -1 }],
    ['Offer a narrow concession while preserving the Crown’s discretion.', { reform: 1, legitimacy: 1, autocracy: 1, door: 1 }],
    ['Refuse. Disorder cannot be rewarded with constitutional novelty.', { autocracy: 2, legitimacy: -2, blood: 1 }],
    ['Create a commission to clarify what, precisely, has just been promised.', { door: 2, legitimacy: -1, britain: 1 }]
  ],
  land: [
    ['Break the commune where peasants desire it and finance private holdings.', { land: 3, reform: 1, economy: 1 }],
    ['Proceed cautiously through the zemstvos and local banks.', { land: 2, legitimacy: 1, door: 1 }],
    ['Protect the old commune. Russia is not England and need not become it.', { autocracy: 1, land: -1, legitimacy: -1 }],
    ['Postpone the question. Harvests have a way of making policy less theoretical.', { door: 2, land: -1 }]
  ],
  labor: [
    ['Legalize bargaining societies and shorten the worst factory hours.', { reform: 2, legitimacy: 2, economy: -1 }],
    ['Permit relief while expanding police observation.', { reform: 1, autocracy: 1, legitimacy: 1 }],
    ['Send troops before the strike becomes an example.', { autocracy: 2, blood: 2, legitimacy: -2 }],
    ['Let the employers handle it. The state has other concerns.', { door: 1, legitimacy: -2, economy: 1 }]
  ],
  empire: [
    ['Trade cultural autonomy for loyalty to the Crown.', { empire: 2, legitimacy: 2, autocracy: -1 }],
    ['Preserve local forms but keep governors, police and army firmly imperial.', { empire: 2, autocracy: 1 }],
    ['Russify harder. An empire cannot survive if it apologizes for being one.', { empire: 1, autocracy: 2, blood: 1, legitimacy: -2 }],
    ['Delay. National questions become quieter when ignored from Petersburg.', { door: 2, empire: -1 }]
  ],
  military: [
    ['Professionalize procurement and promote competence over court connection.', { military: 3, reform: 1, economy: -1 }],
    ['Modernize, but preserve the prerogatives of the Guard and court.', { military: 2, autocracy: 1, economy: -1 }],
    ['Expand numbers first. Russia’s strength is depth.', { military: 1, autocracy: 1, economy: -2 }],
    ['Another inquiry. This time insist that admirals attend it sober.', { door: 1, military: -1, britain: 1 }]
  ],
  foreign: [
    ['Take the diplomatic exit. Prestige can be recovered; corps cannot.', { legitimacy: 1, economy: 1, blood: -1 }],
    ['Negotiate, but quietly prepare the army in case negotiation fails.', { military: 1, economy: -1, autocracy: 1 }],
    ['Stand firm. Russia’s enemies have learned to count on retreat.', { autocracy: 1, empire: 1, blood: 1 }],
    ['Ask what role London has played in producing this crisis.', { britain: 2, veil: 1 }]
  ],
  bureaucracy: [
    ['Publish the findings, remove the guilty and simplify the chain of command.', { reform: 2, legitimacy: 2, autocracy: -1 }],
    ['Reorganize the offices without public scandal.', { reform: 1, autocracy: 1, door: 1 }],
    ['Centralize responsibility in the palace. At least someone must be responsible.', { autocracy: 2, door: 1, legitimacy: -1 }],
    ['Appoint a committee to determine why the previous committee failed.', { door: 3, britain: 1 }]
  ],
  church: [
    ['Restore a measure of conciliar life and let the Church breathe outside the bureaucracy.', { faith: 2, reform: 1, legitimacy: 1 }],
    ['Defend Orthodoxy, but restrain officials who use it as a police category.', { faith: 2, autocracy: 1, legitimacy: 1 }],
    ['Orthodoxy, Autocracy, Nationality. There is nothing to revise.', { faith: 1, autocracy: 2, empire: 1, legitimacy: -1 }],
    ['Leave theology to bishops and administration to the Procurator.', { door: 1, faith: -1 }]
  ],
  veil: [
    ['Keep the pilgrim away from affairs of state while allowing him to comfort Alexandra.', { veil: -1, legitimacy: 1 }],
    ['Hear him, but require that ministers remain ministers.', { veil: 1, faith: 1 }],
    ['He calms Alexei. That fact outranks the gossip of Petersburg.', { veil: 3, door: 1, legitimacy: -1 }],
    ['Banish him from the capital.', { veil: -2, legitimacy: 1, faith: -1 }]
  ],
  police: [
    ['Reform the Okhrana and prohibit agents from manufacturing the crimes they report.', { reform: 2, legitimacy: 2, blood: -1 }],
    ['Keep the service intact but tighten ministerial oversight.', { autocracy: 1, reform: 1 }],
    ['The underground understands force. Give the police room to work.', { autocracy: 2, blood: 2, legitimacy: -2 }],
    ['If the revolutionaries are infiltrated, perhaps the matter is already under control.', { door: 2, veil: 1 }]
  ]
};

const OATR_SPECIAL_CHOICES = {
  1: [
    ['Receive a delegation. They are my subjects, and I should hear them.', { legitimacy: 3, reform: 1, door: -1, flags: ['heardGapon'] }],
    ['Send word through Father Gapon: I will receive the petition after they disperse.', { legitimacy: 1, autocracy: 1, flags: ['gaponCompromise'] }],
    ['The procession cannot approach the palace. Trepov understands what must be done.', { autocracy: 2, blood: 4, legitimacy: -3, flags: ['bloodySunday'] }],
    ['I do not wish to discuss this further.', { door: 3, legitimacy: -2, veil: 1, flags: ['bloodySunday'] }]
  ],
  4: [
    ['Accept Roosevelt’s mediation. End the war before defeat becomes revolution.', { legitimacy: 1, economy: 1, autocracy: -1, flags: ['portsmouth'] }],
    ['Continue the war. Russia does not conclude peace after a naval reverse.', { blood: 2, autocracy: 1, legitimacy: -2, economy: -2 }],
    ['Dismiss the naval command and publish the procurement records.', { reform: 2, military: 2, legitimacy: 2, autocracy: -1 }],
    ['Ask why Britain has so many coaling stations.', { britain: 3, veil: 1 }]
  ],
  9: [
    ['Sign—and mean it. The Duma must become part of the state, not its decoration.', { reform: 4, legitimacy: 4, autocracy: -2, door: -1, flags: ['octoberManifesto', 'dumaReal'] }],
    ['Sign. We may revisit the precise meaning when order returns.', { reform: 1, legitimacy: -1, autocracy: 1, door: 2, flags: ['octoberManifesto'] }],
    ['Refuse. Disorder cannot be rewarded with a constitution.', { autocracy: 4, blood: 3, legitimacy: -4 }],
    ['Ask Witte whether the English constitution has a written copy you can inspect.', { britain: 2, door: 1, legitimacy: -1 }]
  ],
  14: [
    ['Invite Duma leaders to form a ministry. Let responsibility teach restraint.', { reform: 4, legitimacy: 3, autocracy: -3, land: 1, flags: ['dumaReal'] }],
    ['Work with moderates, but reserve war and interior to the Crown.', { reform: 2, legitimacy: 2, autocracy: 1 }],
    ['Dissolve it. Russia cannot be governed by speeches.', { autocracy: 3, legitimacy: -3, blood: 1, flags: ['dumaBroken'] }],
    ['End the audience early. Alexei is unwell.', { door: 3, veil: 1 }]
  ],
  22: [
    ['Give Stolypin the latitude he asks for, including against your own courtiers.', { reform: 3, land: 3, legitimacy: 2, autocracy: -1, flags: ['stolypinBacked'] }],
    ['Back the reforms but protect the interests of loyal landowners.', { reform: 2, land: 2, autocracy: 1 }],
    ['Slow him down. He is beginning to behave as though he governs Russia.', { autocracy: 2, door: 1, land: -2, flags: ['stolypinChecked'] }],
    ['Tell him that twenty years is a very long time.', { door: 2, veil: 1 }]
  ],
  34: [
    ['Reform the security detail and take the threats against Stolypin seriously.', { reform: 1, blood: -1, flags: ['stolypinProtected'] }],
    ['He refuses to live behind guards. Respect his decision.', { legitimacy: 1, flags: ['stolypinExposed'] }],
    ['His enemies are numerous because his methods are harsh. This is politics.', { door: 2, flags: ['stolypinExposed'] }],
    ['The Okhrana assures you the theatre is secure.', { door: 2, veil: 1, flags: ['stolypinExposed'] }]
  ],
  35: [
    ['Stolypin survives the attack. Keep him in office and finish the program.', { reform: 3, land: 3, legitimacy: 2, flags: ['stolypinLives'] }],
    ['His wounds make continued service impossible. Accept his resignation with honors.', { legitimacy: 1, flags: ['stolypinRetires'] }],
    ['The assassin got closer than the police admit. Purge the service.', { reform: 1, autocracy: 1, blood: 1, flags: ['okhranaReformed'] }],
    ['The dead and wounded are in God’s hands. Russia continues.', { door: 2, veil: 1 }]
  ],
  41: [
    ['Keep Rasputin away from ministers and appointments.', { veil: -2, legitimacy: 2, flags: ['rasputinLimited'] }],
    ['He may see the family, but nothing bearing a state seal.', { veil: 1, faith: 1, flags: ['rasputinLimited'] }],
    ['He saved Alexei when doctors could not. I will not cast him out to please drawing rooms.', { veil: 4, legitimacy: -2, door: 1, flags: ['rasputinTrusted'] }],
    ['Order him out of Petersburg indefinitely.', { veil: -3, legitimacy: 1, faith: -1, flags: ['rasputinBanish'] }]
  ],
  47: [
    ['Azef proves the security state requires reform from the foundations.', { reform: 3, legitimacy: 2, blood: -1, flags: ['okhranaReformed'] }],
    ['The scandal proves only that revolutionaries cannot be trusted.', { autocracy: 2, blood: 1 }],
    ['Expand infiltration. If one Azef was useful, ten may be better.', { autocracy: 2, veil: 1, blood: 1 }],
    ['I am beginning to suspect the revolutionary movement has penetrated the Okhrana.', { reform: 1, veil: 1, flags: ['understoodAzef'] }]
  ],
  56: [
    ['Treat Sarajevo as an Austrian-Serbian crisis, not a Russian test of manhood.', { legitimacy: 1, blood: -1, flags: ['julyRestraint'] }],
    ['Warn Vienna privately that Russia cannot tolerate the destruction of Serbia.', { empire: 1, military: 1, flags: ['serbiaWarning'] }],
    ['Serbia must know Russia stands behind her completely.', { empire: 2, blood: 1, flags: ['blankChequeSerbia'] }],
    ['Ask Sazonov whether British intelligence knew about the assassins.', { britain: 2, veil: 1 }]
  ],
  61: [
    ['No mobilization. Continue diplomacy even if the army complains about timetables.', { legitimacy: 1, military: -1, flags: ['noMobilization'] }],
    ['Partial mobilization against Austria only.', { military: 1, blood: 1, flags: ['partialMobilization'] }],
    ['General mobilization. Russia cannot be caught unready again.', { military: 2, blood: 3, flags: ['generalMobilization'] }],
    ['Tell the General Staff to prepare every option without issuing the order.', { door: 1, military: 1, flags: ['preparedOnly'] }]
  ],
  66: [
    ['Countermand general mobilization while there is still time.', { legitimacy: 1, autocracy: -1, military: -1, flags: ['mobilizationReversed', 'peace1914'] }],
    ['Return to partial mobilization, even if the rail plans become chaos.', { door: 1, military: -1, flags: ['partialMobilization'] }],
    ['The machine is moving. Do not interfere with it now.', { blood: 3, military: 1, door: 1, flags: ['warMachine'] }],
    ['Ask the Kaiser directly whether two cousins are truly going to end Europe.', { legitimacy: 1, veil: 1, flags: ['willyNicky'] }]
  ],
  69: [
    ['Accept the last German proposal and force Serbia toward a conference.', { legitimacy: 2, empire: -1, flags: ['peace1914'] }],
    ['Demand simultaneous Austrian restraint before Russia halts preparations.', { military: 1, legitimacy: 1, flags: ['conditionalPeace'] }],
    ['There is nothing left to discuss. Russia will not be humiliated again.', { autocracy: 2, blood: 3, flags: ['war1914'] }],
    ['Wait for London to declare itself.', { britain: 2, door: 2, flags: ['war1914'] }]
  ],
  70: [
    ['Stop it. Whatever this costs the Crown, there will be no European war this summer.', { legitimacy: 3, autocracy: -2, blood: -2, flags: ['peace1914'] }],
    ['Enter the war, but define limited aims and preserve civilian government.', { military: 2, legitimacy: 1, blood: 2, flags: ['war1914', 'limitedWar'] }],
    ['General war. The empire will either emerge vindicated or not emerge at all.', { autocracy: 2, military: 2, blood: 4, flags: ['war1914', 'totalWar'] }],
    ['The bells are ringing. You cannot tell whether they are for mobilization or liturgy.', { veil: 4, door: 2, blood: 2, flags: ['war1914', 'eschaton'] }]
  ]
};

const OATR_SKELETONS = [
  [1,'9 January 1905','Tsarskoye Selo','Before the bells','labor'],
  [2,'22 January 1905','St Petersburg','The little father','police'],
  [3,'17 February 1905','Moscow','The carriage in the Kremlin','police'],
  [4,'30 May 1905','The Alexander Palace','The fleet that is no longer there','military'],
  [5,'14 June 1905','Black Sea Fleet','The red flag over Potemkin','military'],
  [6,'6 August 1905','Peterhof','A Duma without teeth','reform'],
  [7,'5 September 1905','Portsmouth','Peace without victory','foreign'],
  [8,'7 October 1905','The Empire','The railways go still','labor'],
  [9,'17 October 1905','Peterhof','A constitution that may not exist','reform'],
  [10,'22 October 1905','Odessa','The men in black shirts','empire'],
  [11,'8 November 1905','Kronstadt','The sailors answer','military'],
  [12,'7 December 1905','Moscow','Barricades in Presnya','police'],
  [13,'23 April 1906','Tsarskoye Selo','The Fundamental Laws','reform'],
  [14,'6 May 1906','Winter Palace','The sound of another voice','reform'],
  [15,'8 July 1906','Peterhof','The first dissolution','reform'],
  [16,'12 August 1906','Aptekarsky Island','The bomb at the dacha','police'],
  [17,'9 November 1906','Council of Ministers','The peasant may leave','land'],
  [18,'20 February 1907','Tauride Palace','The second Duma','reform'],

  [19,'3 June 1907','St Petersburg','A quieter constitution','reform'],
  [20,'1 January 1908','Ministry of Finance','The price of breathing','bureaucracy'],
  [21,'14 March 1908','Tambov Province','The wager on the peasant','land'],
  [22,'2 May 1908','Peterhof','Give me twenty years','land'],
  [23,'18 July 1908','Finland','The law beyond the frontier','empire'],
  [24,'7 October 1908','Bosnia','Vienna moves the marker','foreign'],
  [25,'25 November 1908','St Petersburg','Belgrade shouts','foreign'],
  [26,'4 March 1909','General Staff','The lessons of Mukden','military'],
  [27,'18 April 1909','Holy Synod','Church under glass','church'],
  [28,'2 June 1909','Baku','Oil, strikes and nations','labor'],
  [29,'12 September 1909','Kiev','A language question','empire'],
  [30,'8 January 1910','Council of Ministers','The ministry devours a ministry','bureaucracy'],
  [31,'21 May 1910','Western Provinces','Zemstvos for some','empire'],
  [32,'14 August 1910','Tsarskoye Selo','The boy bleeds','veil'],
  [33,'4 February 1911','State Duma','Stolypin against the room','reform'],
  [34,'10 September 1911','Kiev','The theatre is secure','police'],
  [35,'15 September 1911','Kiev','The second shot','police'],
  [36,'1 November 1911','Ministry of Finance','After Stolypin','bureaucracy'],
  [37,'18 December 1911','Persia','An empire beside another empire','foreign'],
  [38,'31 December 1911','Tsarskoye Selo','The breathing space','veil'],

  [39,'4 April 1912','Lena Goldfields','The snow turns black','labor'],
  [40,'18 May 1912','St Petersburg','The newspapers learn a name','veil'],
  [41,'1 July 1912','Tsarskoye Selo','The pilgrim in the corridor','veil'],
  [42,'8 October 1912','Balkans','The small kingdoms march','foreign'],
  [43,'21 November 1912','General Staff','Mobilization as arithmetic','military'],
  [44,'5 December 1912','Constantinople Desk','The city of cities','foreign'],
  [45,'16 January 1913','Romanov Tercentenary Committee','Three hundred years','church'],
  [46,'21 February 1913','Kazan Cathedral','A nation at prayer','church'],
  [47,'3 April 1913','Okhrana Headquarters','The agent who killed ministers','police'],
  [48,'18 May 1913','Warsaw','Poland watches the parade','empire'],
  [49,'29 June 1913','Balkans','Allies become enemies','foreign'],
  [50,'17 August 1913','Putilov Works','The city learns to strike','labor'],
  [51,'30 September 1913','Council of Ministers','The fourth reorganization','bureaucracy'],
  [52,'11 November 1913','Tsarskoye Selo','Alexei and the starets','veil'],
  [53,'3 December 1913','General Staff','The 1914 plan','military'],
  [54,'20 December 1913','Foreign Ministry','France expects','foreign'],
  [55,'31 December 1913','Alexander Palace','The year of no return','veil'],

  [56,'28 June 1914','Peterhof','Sarajevo','foreign'],
  [57,'5 July 1914','Foreign Ministry','The blank cheque you did not sign','foreign'],
  [58,'15 July 1914','Tsarskoye Selo','Serbia asks what Russia means','foreign'],
  [59,'23 July 1914','Peterhof','The ultimatum','foreign'],
  [60,'25 July 1914','Council of Ministers','Forty-eight hours','foreign'],
  [61,'28 July 1914','General Staff','Partial','military'],
  [62,'29 July 1914','Peterhof Telegraph Room','Willy and Nicky','foreign'],
  [63,'29 July 1914','St Petersburg','The timetable answers','military'],
  [64,'30 July 1914','General Staff','The red forms','military'],
  [65,'30 July 1914','Alexander Palace','Alexandra says hold','veil'],
  [66,'30 July 1914','Peterhof','Counterorder','military'],
  [67,'31 July 1914','Foreign Ministry','The German ultimatum','foreign'],
  [68,'1 August 1914','St Petersburg','The embassy burns papers','foreign'],
  [69,'1 August 1914','Peterhof','One final telegram','foreign'],
  [70,'1 August 1914','Alexander Palace','The bells','veil']
].map(([id,date,place,title,set]) => ({ id,date,place,title,set }));

const OATR_KEY_TEXT = {
  1: {
    body: ['You wake before dawn. Alexandra is sleeping beside you. Somewhere in the palace a clock is ticking.','You have been Emperor of All the Russias for ten years. Your father once called you weak. Your ministers call you Majesty. Your wife calls you Nicky. One hundred and twenty-five million people call you Tsar.','<em>God has not called you anything lately.</em>','Outside Petersburg, Father Georgy Gapon is gathering workers beneath icons and portraits of your face. They believe that if only the Little Father knew what was being done to them, everything would be made right.','The peculiar difficulty is that you do know.'],
    quote: '“The procession is peaceful, Majesty. That is not the same thing as harmless.”', speaker: 'Minister of the Interior Sviatopolk-Mirsky'
  },
  4: { body: ['A telegram has arrived from the other side of the world. Rozhestvensky’s fleet found the Japanese in the strait at Tsushima.','The Baltic Fleet sailed eighteen thousand miles to discover that distance is not a strategy. The empire has lost a fleet in an afternoon.','The Naval Ministry requests funds for an inquiry. The inquiry will be chaired by the men who built the fleet.'], quote: '“London sold them coal. London sold us assurances.”', speaker: 'Admiral Alexeyev, helpfully' },
  9: { body: ['The railways are still. Moscow is dark. Witte has placed a document on your desk which promises civil liberties and an elected legislature.','The ink would not end autocracy tonight. It would, however, admit that Russia contains people other than its sovereign.','Alexandra calls the paper cowardice. Witte calls it the last available instrument of government. Beyond the windows, the gulf is the color of iron.'], quote: '“Majesty may preserve every word of the autocracy, or preserve the autocracy. I no longer believe both are possible.”', speaker: 'Sergei Witte' },
  22: { body: ['Stolypin asks for political protection, money, administrative latitude and time. Especially time.','His wager is indecently simple: make peasants owners before revolutionaries make them soldiers.','He says the phrase almost casually, as if asking for a railway appropriation.'], quote: '“Give the state twenty years of peace, internal and external, and you will not recognize Russia.”', speaker: 'Pyotr Stolypin' },
  35: { body: ['The opera has stopped. There is blood on Stolypin’s white waistcoat.','In another history he dies. In this one, your earlier choices have made the security arrangements slightly less absurd—or they have not.','The physicians wait outside. So does the future.'], quote: '“I am happy to die for the Tsar.”', speaker: 'Pyotr Stolypin' },
  41: { body: ['The strange Siberian has become impossible to classify. He is vulgar, devout, manipulative, compassionate, drunk, lucid and—for reasons the doctors cannot explain—occasionally useful.','Alexandra trusts him because Alexei sometimes stops bleeding when he is present. Petersburg hates him because Petersburg hates mysteries it did not invent.','He has begun to speak of war.'], quote: '“If Russia goes to war, there will be no Tsar.”', speaker: 'Grigori Rasputin' },
  47: { body: ['The report on Yevno Azef has been placed before you. He was a revolutionary terrorist. He was also an Okhrana informant.','He arranged murders for the revolution while drawing money from the state he was helping to murder.','For several minutes nobody in the room can identify which side infiltrated which.'], quote: '“Majesty, I believe we have reached the point where the police require police.”', speaker: 'A tired official of the Ministry of Interior' },
  56: { body: ['The Archduke Franz Ferdinand is dead in Sarajevo. Vienna blames Belgrade. Belgrade denies what it can and conceals what it cannot.','Every capital in Europe insists the crisis can be localized. Every general staff quietly checks its railway tables.','Russia has spent nine years rebuilding authority. Europe may now ask you to spend it in a month.'], quote: '“The Serbian question is not worth a European war. That is precisely why everyone believes the other side will retreat.”', speaker: 'Sergei Sazonov' },
  61: { body: ['Austria has declared war on Serbia. The General Staff says partial mobilization is militarily incoherent. Diplomats say general mobilization will be read in Berlin as the beginning of war.','Both statements can be true.','A state that has spent decades centralizing decision has discovered that railway schedules possess a kind of sovereignty.'], quote: '“Majesty, mobilization is not war. Unfortunately the Germans have built their planning around the opposite proposition.”', speaker: 'Grand Duke Nicholas Nikolaevich' },
  66: { body: ['You have ordered mobilization. You have counterordered it. Men are carrying both sets of instructions through the same corridors.','The General Staff is near revolt—not against you, exactly, but against the possibility that you still possess discretion.','The machine has been built so perfectly that the sovereign is now the least reliable component.'], quote: '“If we stop now, Majesty, we may not be able to start again in time.”', speaker: 'General Yanushkevich' },
  70: { body: ['The palace windows are open to the summer night. Somewhere beyond the trees, bells are ringing.','On desks from Petersburg to Berlin sit orders written by men who insist they are preventing catastrophe.','For nine years you have been asked what Russia is. Tonight Europe asks whether Russia can stop being what everyone expects it to be.'], quote: '“There shall be wars and rumours of wars: see that ye be not troubled.”', speaker: 'Matthew 24:6' }
};

const OATR_GENERIC_TEXT = {
  reform: ['Another argument over the shape of authority has reached the palace. Ministers disagree about whether reform will preserve the Crown or teach Russia that the Crown can be resisted.','The paper before you is modest. The principle inside it is not.'],
  land: ['The peasant question has returned, as it always does, carrying statistics nobody quite trusts.','Land is property, livelihood, memory and political explosive in the same acre.'],
  labor: ['Factories have made Russia richer, louder and less governable.','Workers who once petitioned as subjects are learning to negotiate as a class.'],
  empire: ['Another province has asked Petersburg to explain whether loyalty to the empire requires becoming less itself.','The ministries answer with regulations. The province answers with memory.'],
  military: ['The General Staff has produced another memorandum explaining how the disaster of the last war will not be repeated.','The memorandum is excellent. The institutions meant to carry it out are more traditional.'],
  foreign: ['A foreign crisis has reached your desk in the form of telegrams whose politeness is inversely proportional to their danger.','Everyone wishes to avoid war. Everyone also wishes the other power to demonstrate this first.'],
  bureaucracy: ['A ministry has failed in a way that requires the creation of paperwork proving the failure was organizational rather than personal.','Russia possesses more authority than coordination.'],
  church: ['The empire calls itself Holy Russia, yet its Church is administered through a department of state.','Faith remains real. So does the filing cabinet.'],
  veil: ['The boundary between family, faith and government has become difficult to draw in the palace.','What comforts Alexandra may frighten ministers; what reassures ministers cannot stop Alexei bleeding.'],
  police: ['The state knows more about its enemies than ever before and understands them less.','Informers, provocateurs, policemen and revolutionaries have begun occupying the same rooms in different capacities.']
};

const OATR_GENERIC_QUOTES = {
  reform: ['“A concession is dangerous only if one intends never to keep it.”','Sergei Witte'],
  land: ['“The village does not ask whether policy is elegant. It asks who owns the field.”','Pyotr Stolypin'],
  labor: ['“A strike is a wage dispute until the police make it a constitutional question.”','A factory inspector'],
  empire: ['“We govern nations, Majesty, and then act surprised when they notice.”','Council memorandum'],
  military: ['“The timetable is not strategy. It merely punishes those who discover this late.”','General Staff memorandum'],
  foreign: ['“Diplomacy is the art of proving you had no alternative after rejecting several.”','Foreign Ministry marginalia'],
  bureaucracy: ['“The matter is under consideration, which is the administrative form of immortality.”','Ministry clerk'],
  church: ['“Caesar requires reports. God has not asked for them.”','Provincial bishop'],
  veil: ['“There are more things in this palace than appear in the Council minutes.”','Anonymous courtier'],
  police: ['“An agent who commits the crime he reports is, administratively, very productive.”','Okhrana file note']
};

const OATR_ENDINGS = [
  { id:'twenty-years', family:'GOLDEN', title:'THE TWENTY YEARS', kicker:'THE TSAR WHO BECAME SMALLER', test:s=>s.reform>=24&&s.legitimacy>=22&&s.land>=14&&s.blood<=12&&s.flags.has('peace1914')&&(s.flags.has('stolypinLives')||s.land>=18), text:'The throne is no longer the state, and therefore both endure. Russia is not perfected. It has learned the less glorious art of correction. You were not remembered as Nicholas the Great. Russia did not need a great Tsar. It needed a Tsar willing to become smaller.' },
  { id:'eastern-giant', family:'GOOD', title:'EUROPE’S EASTERN GIANT', kicker:'A CROWN ABOVE PARLIAMENT', test:s=>s.reform>=28&&s.legitimacy>=20&&s.autocracy<=5&&s.flags.has('peace1914'), text:'The Duma becomes government rather than scenery. The Crown remains, increasingly ceremonial and increasingly secure. You save the dynasty by surrendering the political system you believed God entrusted to it.' },
  { id:'holy-russia', family:'GOOD', title:'HOLY RUSSIA', kicker:'BELLS AND ELECTRIC TRAMS', test:s=>s.faith>=10&&s.land>=12&&s.legitimacy>=16&&s.blood<=14&&s.flags.has('peace1914'), text:'Icons hang beside telephones. Peasants vote beneath portraits of your grandfather. Western visitors continue writing books explaining that Russia is about to collapse. They will continue doing so for another fifty years.' },
  { id:'federal-crown', family:'GOOD', title:'THE CROWN OF MANY NATIONS', kicker:'OF ALL THE RUSSIAS', test:s=>s.empire>=16&&s.reform>=18&&s.legitimacy>=18&&s.flags.has('peace1914'), text:'Poles, Finns, Armenians and Russians remain under one crown because the crown ceases demanding that loyalty resemble sameness. The empire becomes looser and, against every bureaucratic instinct, harder to break.' },
  { id:'peasant-empire', family:'GOOD', title:'THE PEASANT’S EMPIRE', kicker:'LAND BEFORE THEORY', test:s=>s.land>=20&&s.legitimacy>=16&&s.blood<=15, text:'The revolutionaries discover that ownership is a poor recruiting sergeant. Russia remains poor, argumentative and gigantic, but the village no longer waits for somebody to divide the landlord’s fields.' },
  { id:'constantinople', family:'BITTERSWEET', title:'THE CITY OF CITIES', kicker:'VICTORY WITHOUT SALVATION', test:s=>s.flags.has('war1914')&&s.military>=18&&s.empire>=12&&s.blood<28, text:'The cross rises over Hagia Sophia. Petrograd is under martial law. You achieve a dream Russian emperors carried for centuries and discover that fulfilled prophecies still send casualty lists.' },
  { id:'limited-victory', family:'BITTERSWEET', title:'VICTORY WITHOUT SALVATION', kicker:'THE LAURELS ARE HEAVY', test:s=>s.flags.has('limitedWar')&&s.military>=15&&s.legitimacy>=12, text:'Russia wins enough of the war to call it victory. Veterans return to shortages, elections and old grievances wearing medals. The empire survives the test and is permanently changed by having survived it.' },
  { id:'last-autocrat', family:'BITTERSWEET', title:'THE LAST AUTOCRAT', kicker:'HISTORY AGREES TO RETURN LATER', test:s=>s.autocracy>=24&&s.blood<=18&&s.flags.has('peace1914'), text:'You preserve nearly every prerogative and avoid the war. Nothing collapses. Nothing resolves. You have defeated history. History has agreed to return later.' },
  { id:'breathing-space', family:'AMBIGUOUS', title:'THE BREATHING SPACE', kicker:'A CONSTITUTION WRITTEN IN PENCIL', test:s=>s.flags.has('peace1914')&&s.reform>=10, text:'The old state and the new Russia regard one another across a desk. Neither has won. Neither has left. Somewhere a minister is asking for twenty years. You have given him more than history did.' },
  { id:'english', family:'BLACK COMEDY', title:'THE ENGLISH DID IT', kicker:'EUROPE FINALLY GETS TO THE BOTTOM OF IT', test:s=>s.britain>=16, text:'The Foreign Ministry has isolated the source of every Russian misfortune. It is an island in the North Sea. Europe rearranges itself around this discovery. One question remains: if Britain was responsible for everything, what happens now?' },
  { id:'committee', family:'BLACK COMEDY', title:'THE EMPIRE OF COMMITTEES', kicker:'THE MATTER REMAINS UNDER CONSIDERATION', test:s=>s.door>=25&&s.blood<22, text:'A committee is appointed to investigate why the commission failed to implement the recommendations of the committee appointed after the previous commission. Nobody finds this unusual. Russia survives by never reaching the final agenda item.' },
  { id:'closed-door', family:'BAD', title:'THE CLOSED DOOR', kicker:'NO ANSWER IS ALSO AN ANSWER', test:s=>s.door>=20, text:'Every official learns to guess your wishes, and every guess becomes an order carrying your name. You avoid deciding anything. Everything is decided.' },
  { id:'black-hundred', family:'BAD', title:'THE BLACK HUNDRED EMPIRE', kicker:'ORDER WITHOUT BELIEF', test:s=>s.autocracy>=26&&s.blood>=20&&s.empire>=10, text:'The monarchy survives by teaching its loudest defenders that violence is patriotism. The throne remains standing inside a country increasingly governed by men who insist they defend it better than you do.' },
  { id:'red-tsar', family:'BAD', title:'THE RED TSAR', kicker:'THE THRONE CHANGES VOCABULARY', test:s=>s.autocracy>=22&&s.reform<=5&&s.blood>=24, text:'The portraits change. The offices remain. The files remain. The prisons remain. Russia discovers that abolishing a dynasty is easier than abolishing personalized power.' },
  { id:'october', family:'BAD', title:'OCTOBER', kicker:'THE THRONE IS EMPTY', test:s=>s.legitimacy<=-10||s.blood>=30, text:'The portraits come down. The files remain. The prisons remain. The men who explain why they are necessary remain. Russia abolishes the Tsar. Russia does not abolish the throne.' },
  { id:'cromwell', family:'BAD', title:'THE SAVIOR IN UNIFORM', kicker:'THE CROWN IS PROTECTED FROM THE TSAR', test:s=>s.military>=22&&s.legitimacy<5&&s.autocracy>=18, text:'The generals insist the dynasty can only be saved by removing its sovereign from politics. You remain Emperor in proclamations printed by men who no longer ask what you think.' },
  { id:'smuta', family:'BAD', title:'THE SECOND TIME OF TROUBLES', kicker:'NO ONE HOLDS THE CENTER', test:s=>s.legitimacy<=-15&&s.blood>=22&&s.empire<=2, text:'Governors bargain with armies, cities with soviets, villages with whoever has rifles. Russia does not fall so much as cease answering the same telephone.' },
  { id:'house', family:'HISTORICAL NIGHTMARE', title:'THE HOUSE AT EKATERINBURG', kicker:'THE LAST FAMILY PORTRAIT', test:s=>s.flags.has('war1914')&&s.legitimacy<5&&s.reform<15, text:'The children are told they are moving again. Alexei cannot walk today. After two in the morning, Nicholas Alexandrovich Romanov ceases to exist. Russia does not. That is the problem.' },
  { id:'iron-harvest', family:'NIGHTMARE', title:'THE IRON HARVEST', kicker:'EUROPE DISCOVERS PERPETUAL MOTION', test:s=>s.flags.has('totalWar')&&s.blood>=28&&s.military>=12, text:'The war lasts eleven years. Children serve in regiments whose fathers enlisted in August 1914. Berlin publishes favorable casualty ratios. Petrograd publishes favorable casualty ratios. Vienna has stopped publishing maps. Spring comes late. The guns begin again.' },
  { id:'nebuchadnezzar', family:'NIGHTMARE', title:'НЕБУХАДНЕЦАР', kicker:'HEW DOWN THE TREE', test:s=>s.veil>=18&&s.autocracy>=18&&s.blood>=22, text:'Petrograd is starving. Rasputin has been dead for six years. You spoke with him yesterday. The guns continue firing west of Minsk. There are no Germans there anymore. There are no Russians there either. The artillery continues according to schedule.' },
  { id:'silence', family:'NIGHTMARE', title:'AND THERE WAS SILENCE IN HEAVEN', kicker:'HE THAT HATH EARS TO HEAR', test:s=>s.veil>=22&&s.blood>=24&&s.flags.has('eschaton'), text:'The Russian armies stop transmitting on Tuesday. German patrols encounter no resistance. They also encounter no civilians. Telegraph offices in Moscow continue receiving messages. The messages consist entirely of names.' },
  { id:'fourth-rome', family:'NIGHTMARE', title:'THE FOURTH ROME', kicker:'THERE SHALL BE NO FOURTH', test:s=>s.flags.has('war1914')&&s.veil>=14&&s.empire>=16, text:'The cross rises over Constantinople and a theological question enters the palace like a draft: if the Second Rome stands again, what exactly is Moscow? During the Cherubic Hymn every candle in Hagia Sophia goes out. There is no wind.' },
  { id:'forever', family:'NIGHTMARE', title:'1914 FOREVER', kicker:'YOU HAVE HAD THIS DREAM BEFORE', test:s=>s.flags.has('war1914')&&s.door>=15&&s.veil>=14, text:'The bells ring. The screen goes dark. January 1905 returns. Witte looks older than he did the first time. “Majesty,” he says, “last time you refused.”' },
  { id:'default-war', family:'WAR', title:'THE GREAT WAR', kicker:'THE MACHINE', test:s=>s.flags.has('war1914'), text:'Europe goes to war because every capital believes delay is more dangerous than catastrophe. Russia enters the furnace with more strength than in 1905 and many of the same unresolved questions.' },
  { id:'default-peace', family:'OPEN ENDING', title:'THE THIRD STILL STANDS', kicker:'NINE YEARS LATER', test:s=>true, text:'August passes without general war. Russia remains contradictory, unfinished and alive. The fact that nothing ended is not the same thing as nothing changing.' }
];
