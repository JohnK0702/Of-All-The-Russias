/* Divergent-route logic for Of All The Russias.
   The player never sees a comparison against another timeline. Every branch is written as
   the history that is happening now. */

const OATR_BRANCHING = {
  questionRules: {},

  questionVariants: {
    2: [
      {
        when: ctx => ctx.flag('bloodySunday'),
        title: 'After the snow turns red',
        text: {
          body: [
            'The procession has broken apart under rifle fire. Petersburg is full of stories, most of them worse than the official count and some of them true.',
            'The workers who marched beneath your portraits have begun tearing those portraits down. The phrase Little Father now sounds different when ministers say it.',
            'Witte makes an argument that seems almost indecent in its timing: the war with Japan is consuming money, troops and prestige that the state may shortly need at home.'
          ],
          quote: '“Majesty, we can continue the war abroad or discover whether we still possess a government at home.”',
          speaker: 'Sergei Witte'
        }
      },
      {
        when: ctx => !ctx.flag('bloodySunday'),
        title: 'The petition was heard',
        text: {
          body: [
            'The procession dispersed without a massacre. The grievances remain, but for the moment they still arrive in the language of petitions rather than revenge.',
            'Conservatives are furious that the street discovered the Tsar can be approached. Liberals are surprised that the state did not oblige them by proving every accusation true.',
            'With Port Arthur lost and the war unpopular, Witte argues that peace with Japan might rob the revolutionary movement of its strongest accelerant.'
          ],
          quote: '“You have prevented a martyrdom, Majesty. Do not assume you have prevented politics.”',
          speaker: 'Sergei Witte'
        }
      }
    ],

    4: [
      {
        when: ctx => ctx.flag('earlyPeace1905'),
        date: '30 May 1905',
        place: 'Kronstadt',
        title: 'The fleet turns home',
        text: {
          body: [
            'Peace has been signed. The Baltic Fleet receives orders to reverse course and return to Kronstadt before reaching the Tsushima Strait.',
            'The ships come home intact, though intact is not the same thing as well run. Admirals step ashore alive, decorated, relieved, and ready to defend every procurement decision that brought the navy this far.',
            'At court the conclusion forms quickly: Russia endured the war, preserved the fleet, and restored peace without national humiliation. Men who feared reform in January now ask why a victorious state should alter itself.'
          ],
          quote: '“We have saved the ships, Majesty. I fear we may also have saved several admirals.”',
          speaker: 'A naval reformer, without enthusiasm'
        }
      },
      {
        when: ctx => !ctx.flag('earlyPeace1905'),
        title: 'The fleet that is no longer there'
      }
    ],

    5: [
      {
        when: ctx => ctx.flag('earlyPeace1905'),
        title: 'The red flag at Odessa',
        text: {
          body: [
            'The battleship Potemkin mutinies over rotten meat, brutal discipline and officers who still believe a sailor is an agricultural implement with a uniform.',
            'The fleet is otherwise intact. Loyal ships remain available, troops have returned from the Far East, and the ministries are confident the mutiny can be isolated.',
            'That confidence reaches the palace before the first complete report. Russia is calmer now, and calm has already become an argument against changing anything important.'
          ],
          quote: '“The mutiny is serious. It is not contagious unless we make it so—or unless the sailors discover they were right.”',
          speaker: 'Naval Ministry memorandum'
        }
      }
    ],

    6: [
      {
        when: ctx => ctx.flag('earlyPeace1905'),
        title: 'A Duma offered from strength',
        text: {
          body: [
            'Bulygin’s proposal for a consultative Duma reaches your desk while the army is returning home and the treasury has begun to breathe again.',
            'There is no panic in the room. That is precisely the difficulty. Men who would concede under duress now regard concession as gratuitous.',
            'Witte argues that reform is cheapest before necessity turns it into surrender. Several of your uncles hear the same argument and take it as proof that reform can safely wait.'
          ],
          quote: '“Majesty, necessity is the worst possible time to begin reform. Unfortunately it is usually the only time autocracies agree to it.”',
          speaker: 'Sergei Witte'
        }
      }
    ],

    8: [
      {
        when: ctx => ctx.flag('earlyPeace1905') && !ctx.flag('bloodySunday'),
        title: 'The railways hesitate',
        text: {
          body: [
            'The October strike spreads unevenly. Some lines stop, others keep moving, and the telegraph remains sufficiently alive for the ministries to believe the state can ride it out.',
            'Workers have grievances; zemstvo liberals have demands; revolutionaries have slogans. What they lack is the intoxicating certainty that the government has already lost command of events.',
            'Repression is therefore easier. A durable settlement is harder to justify inside the palace.'
          ],
          quote: '“We can probably break this strike, Majesty. That is not the same as answering why another will come.”',
          speaker: 'Ministerial conference note'
        }
      },
      {
        when: ctx => ctx.flag('earlyPeace1905') && ctx.flag('bloodySunday'),
        title: 'The railways remember January',
        text: {
          body: [
            'Peace has brought the army home, but it has not quieted the memory of January. The strike spreads through a country steadier abroad and angrier at home.',
            'Reliable troops are available to restore order. That fact sits on the table beside every proposal for concession.',
            'Witte cannot claim the state is collapsing. He can only warn that using a recovered army against Russian cities may poison the dynasty more slowly and more deeply.'
          ],
          quote: '“We are stronger than we were in January. I beg Your Majesty not to confuse that with being safer.”',
          speaker: 'Sergei Witte'
        }
      }
    ],

    9: [
      {
        when: ctx => ctx.flag('earlyPeace1905') && ctx.score('leverage') < 3,
        title: 'A constitution without panic',
        text: {
          body: [
            'Witte places a manifesto before you. The strike is dangerous, but the army is intact, the treasury is recovering, and the court does not believe the dynasty stands on the edge of immediate ruin.',
            'Your uncles know it. Alexandra knows it. You know it too.',
            'To sign a real constitutional settlement now would require something more difficult than fear. It would require conviction.'
          ],
          quote: '“Majesty, nobody can force this wisdom upon you. That is why it must be yours.”',
          speaker: 'Sergei Witte'
        }
      }
    ],

    12: [
      {
        when: ctx => ctx.flag('earlyPeace1905'),
        title: 'Barricades in Presnya',
        text: {
          body: [
            'Presnya rises. Reliable formations can be moved into Moscow without stripping the empire bare elsewhere.',
            'The uprising can probably be crushed quickly. The generals know it, the revolutionaries know it, and by evening the palace knows it too.',
            'Witte asks what sort of order you intend to possess after the artillery has finished establishing it.'
          ],
          quote: '“The guns can clear the streets, Majesty. They cannot draft the settlement that follows.”',
          speaker: 'Sergei Witte'
        }
      }
    ],

    14: [
      {
        when: ctx => ctx.flag('earlyPeace1905') && ctx.score('leverage') < 4,
        title: 'The sound of another voice — faintly',
        text: {
          body: [
            'The Duma speaks, but the court still treats it as an experiment whose terms can be revised by the Crown.',
            'The deputies increasingly behave as though they are the beginning of responsible government. The ministries increasingly behave as though they are temporary guests in a permanent autocracy. Both cannot remain true indefinitely.',
            'Stolypin watches from the edge of the room. He is useful, respected, and nowhere near indispensable enough to force the palace to accept everything he believes necessary.'
          ],
          quote: '“A parliament may be weak and still become a habit. That is what frightens the court.”',
          speaker: 'Sergei Witte'
        }
      }
    ],

    16: [
      {
        when: ctx => ctx.flag('earlyPeace1905'),
        title: 'The bomb at Aptekarsky Island',
        text: {
          body: [
            'The bomb at Stolypin’s dacha tears through servants, petitioners and family rooms. Windows leave their frames. Walls fold inward. Men who came to ask favors leave on stretchers.',
            'Stolypin survives, but his political position is still precarious. He is valuable to the Crown, not indispensable to it, and several courtiers already suggest a safer man could perform the same work with fewer enemies.',
            'He asks for emergency powers and land reform in the same breath. His enemies hear only the first half; your courtiers only the second.'
          ],
          quote: '“They want my neck and my reforms, Majesty. I would prefer they receive neither.”',
          speaker: 'Pyotr Stolypin'
        }
      }
    ],

    17: [
      {
        when: ctx => ctx.flag('earlyPeace1905') && ctx.score('leverage') < 5,
        title: 'The peasant may leave — if the court permits it',
        text: {
          body: [
            'Stolypin proposes breaking the commune where peasants wish to leave it and creating a class of proprietors with something tangible to defend.',
            'Landowners and conservative ministers dislike the wager. They acknowledge unrest in the countryside, but they do not feel enough immediate danger to make surrendering old assumptions seem prudent.',
            'You can still force the reform through. It will simply cost you political capital now, rather than borrowing urgency from fear.'
          ],
          quote: '“The reform is wise, Majesty. That does not mean the men who must permit it are frightened enough to become wise with us.”',
          speaker: 'Pyotr Stolypin'
        }
      }
    ],

    22: [
      {
        when: ctx => ctx.flag('earlyPeace1905') && ctx.score('leverage') < 6,
        title: 'Give me twenty years — and authority I do not possess',
        text: {
          body: [
            'Stolypin asks for twenty years of peace and the authority to remake the village beneath it.',
            'The landlords believe the emergency has passed. The bureaucracy believes the peasant can be administered. The dynasty survived 1905, brought the army home, preserved the fleet and restored order; survival itself has become evidence for the old arrangements.',
            'If Stolypin is to have the leverage he wants, it will have to come from you.'
          ],
          quote: '“Majesty, success has become the argument against changing the things that nearly failed.”',
          speaker: 'Pyotr Stolypin'
        }
      }
    ],

    33: [
      {
        when: ctx => ctx.flag('earlyPeace1905') && !ctx.flag('stolypinBacked'),
        title: 'Stolypin against a room that no longer fears him',
        text: {
          body: [
            'The Duma attacks Stolypin from one side and the court obstructs him from the other. Nobody believes removing him would bring the state down with him.',
            'His enemies therefore have the luxury of principle, vanity and patience.',
            'He asks you to spend personal authority protecting reforms whose political necessity the palace has never fully accepted.'
          ],
          quote: '“You gave Russia peace, Majesty. I am asking whether peace was meant to preserve the old argument forever.”',
          speaker: 'Pyotr Stolypin'
        }
      }
    ],

    36: [
      {
        when: ctx => ctx.flag('stolypinLives'),
        title: 'After the bullet that failed',
        text: {
          body: [
            'Stolypin lives. The assassin has therefore produced the opposite of his intention: for several weeks the Prime Minister is politically untouchable.',
            'He wants to spend that borrowed sanctity immediately, before sympathy cools and the court remembers why it disliked him.',
            'Men who hoped the Kiev theatre would solve their Stolypin problem now discover that providence has returned the problem to the agenda.'
          ],
          quote: '“A failed assassination is a very short mandate, Majesty. We should spend it before it expires.”',
          speaker: 'Pyotr Stolypin'
        }
      }
    ]
  },

  choiceRules: {
    9: [
      ctx => ctx.score('leverage') >= 3 || ctx.score('reform') >= 5 || (ctx.flag('heardGapon') && !ctx.flag('earlyPeace1905')),
      () => true,
      () => true,
      () => true
    ],
    14: [
      ctx => ctx.flag('dumaReal') && (ctx.score('leverage') >= 4 || ctx.score('reform') >= 8),
      () => true,
      () => true,
      () => true
    ],
    22: [
      ctx => ctx.score('leverage') >= 5 || ctx.score('reform') >= 10 || ctx.flag('dumaReal'),
      () => true,
      () => true,
      () => true
    ],
    35: [
      ctx => ctx.flag('stolypinProtected'),
      ctx => ctx.flag('stolypinProtected'),
      () => true,
      () => true
    ],
    41: [
      () => true,
      () => true,
      ctx => ctx.flag('rasputinAtCourt') || ctx.flag('alexeiRasputin'),
      () => true
    ],
    47: [
      ctx => ctx.score('reform') >= 7 || ctx.flag('okhranaReformed'),
      () => true,
      () => true,
      () => true
    ],
    56: [
      () => true,
      () => true,
      ctx => ctx.score('empire') >= 6 || ctx.score('autocracy') >= 10,
      () => true
    ],
    61: [
      () => true,
      ctx => ctx.flag('serbiaWarning') || ctx.flag('blankChequeSerbia') || ctx.score('empire') >= 6,
      ctx => ctx.score('military') >= 4,
      () => true
    ],
    66: [
      ctx => ctx.flag('generalMobilization'),
      ctx => ctx.flag('generalMobilization') || ctx.flag('partialMobilization'),
      ctx => ctx.flag('generalMobilization') || ctx.flag('partialMobilization'),
      () => true
    ],
    69: [
      ctx => ctx.flag('julyRestraint') || ctx.flag('willyNicky') || ctx.score('legitimacy') >= 12,
      () => true,
      () => true,
      () => true
    ],
    70: [
      ctx => !ctx.flag('war1914') && (!ctx.flag('generalMobilization') || ctx.flag('mobilizationReversed') || ctx.flag('willyNicky')),
      ctx => ctx.score('military') >= 5,
      ctx => ctx.flag('generalMobilization') || ctx.flag('warMachine') || ctx.score('autocracy') >= 18,
      ctx => ctx.score('veil') >= 10 || ctx.flag('rasputinTrusted')
    ]
  },

  choiceOverrides: {
    2: ctx => {
      if (ctx.flag('bloodySunday')) return [
        ['Authorize Witte to seek peace now, before another military disaster turns unrest into revolution.', { legitimacy: 2, economy: 2, pressure: -2, leverage: -2, autocracy: -1, flags: ['earlyPeace1905'] }],
        ['Continue the war, but announce a commission on labor grievances and the shootings.', { reform: 1, legitimacy: 1, pressure: 1, leverage: 1 }],
        ['Restore order first. The war and the streets are the same test of authority.', { autocracy: 2, blood: 2, pressure: 3, leverage: 2 }],
        ['Let the ministries handle both matters. You will not govern by panic.', { door: 2, legitimacy: -1, pressure: 2 }]
      ];
      return [
        ['Authorize Witte to seek peace with Japan while the government still has room to choose its terms.', { legitimacy: 1, economy: 2, pressure: -3, leverage: -3, autocracy: 1, flags: ['earlyPeace1905'] }],
        ['Continue the war, but begin the labor reforms promised to Gapon’s delegation.', { reform: 2, legitimacy: 2, pressure: 1, leverage: 1 }],
        ['The peaceful procession proves paternal government still works. Change as little as possible.', { autocracy: 2, legitimacy: -1, pressure: 1, leverage: -1 }],
        ['Ask Witte to prepare both a peace feeler and a reform memorandum, then decide later.', { door: 2, reform: 1, pressure: 1 }]
      ];
    },

    4: ctx => ctx.flag('earlyPeace1905') ? [
      ['Use the returning fleet as the occasion for a ruthless naval reform before complacency sets in.', { military: 3, reform: 2, economy: -1, leverage: 1 }],
      ['Celebrate the peace and preserve the command structure. A fleet that came home intact cannot be called a failure.', { autocracy: 2, military: -1, leverage: -1 }],
      ['Retire the worst admirals quietly and spend the peace dividend on the army and railways.', { military: 2, economy: 1, door: 1 }],
      ['Explain that British diplomacy forced Japan to accept peace before Russia’s inevitable victory.', { britain: 3, autocracy: 1, veil: 1 }]
    ] : [
      ['Accept mediation now. End the war before defeat becomes political collapse.', { legitimacy: 1, economy: 1, autocracy: -1, pressure: -1, leverage: 1, flags: ['portsmouth'] }],
      ['Continue the war. Russia does not conclude peace after a naval annihilation.', { blood: 2, autocracy: 1, legitimacy: -2, economy: -2, pressure: 3, leverage: 2 }],
      ['Dismiss the naval command and publish the procurement records.', { reform: 2, military: 2, legitimacy: 2, autocracy: -1, pressure: 1, leverage: 2 }],
      ['Ask why Britain has so many coaling stations.', { britain: 3, veil: 1, pressure: 1 }]
    ],

    5: ctx => ctx.flag('earlyPeace1905') ? [
      ['Negotiate the sailors’ surrender and investigate the officers. Do not manufacture martyrs.', { reform: 2, legitimacy: 2, blood: -1, leverage: 1 }],
      ['Use loyal ships to isolate Potemkin, then offer amnesty to ordinary sailors.', { autocracy: 1, legitimacy: 1, military: 1 }],
      ['Crush the mutiny immediately. The fleet came home intact to obey orders, not debate them.', { autocracy: 2, blood: 2, pressure: 2, leverage: 1 }],
      ['Treat it as a disciplinary matter and forbid political discussion of the mutiny.', { door: 1, legitimacy: -1, pressure: 1 }]
    ] : null,

    6: ctx => ctx.flag('earlyPeace1905') ? [
      ['Make the Duma genuinely legislative now, while concession still looks voluntary.', { reform: 4, legitimacy: 3, autocracy: -2, leverage: 2, flags: ['preOctoberDumaReal'] }],
      ['Approve Bulygin’s consultative Duma and no more.', { reform: 1, autocracy: 1, legitimacy: 1 }],
      ['Withdraw the proposal. Peace has restored the government’s freedom of action.', { autocracy: 3, legitimacy: -2, leverage: -2 }],
      ['Keep the proposal alive in committee until the political weather becomes clearer.', { door: 2, leverage: -1 }]
    ] : null,

    8: ctx => {
      if (!ctx.flag('earlyPeace1905')) return null;
      return [
        ['Offer concrete labor concessions before the strike becomes a general political front.', { reform: 2, legitimacy: 2, pressure: -1, leverage: 1 }],
        ['Use the returned army to keep the rail hubs open while negotiating locally.', { military: 1, autocracy: 1, legitimacy: 1, pressure: 1 }],
        ['Break the strike quickly. The state is stronger than the opposition believes.', { autocracy: 3, blood: 2, legitimacy: -2, pressure: 2, leverage: -2, flags: ['strikeBroken1905'] }],
        ['Wait. If the strike fragments on its own, there is no reason to purchase peace with concessions.', { door: 2, pressure: 1, leverage: -1 }]
      ];
    },

    9: ctx => {
      if (!ctx.flag('earlyPeace1905')) return null;
      return [
        ['Sign a real constitutional settlement. Reform before terror makes it compulsory.', { reform: 5, legitimacy: 4, autocracy: -3, leverage: 2, flags: ['octoberManifesto','dumaReal','voluntaryConstitution'] }],
        ['Issue civil liberties and a Duma, but preserve broad reserve powers for the Crown.', { reform: 2, legitimacy: 1, autocracy: 1, door: 1, flags: ['octoberManifesto'] }],
        ['Refuse a manifesto. The government has survived the strike and retains the means to govern.', { autocracy: 4, legitimacy: -3, pressure: 2, leverage: -2, flags: ['noManifesto1905'] }],
        ['Promise reform later, after the remaining disorders are suppressed.', { door: 3, legitimacy: -1, leverage: -1 }]
      ];
    },

    12: ctx => ctx.flag('earlyPeace1905') ? [
      ['Use overwhelming force quickly, then announce municipal and labor reforms before victory curdles into triumphalism.', { blood: 2, autocracy: 2, reform: 1, legitimacy: 1, leverage: 1 }],
      ['Surround Presnya and negotiate surrender. Time favors the state.', { legitimacy: 2, blood: -1, autocracy: 1 }],
      ['Bomb the barricades and make Moscow an example.', { blood: 4, autocracy: 3, legitimacy: -4, pressure: 3, leverage: 2 }],
      ['Delegate the matter to the military governor and do not ask for details.', { door: 3, blood: 2, legitimacy: -2 }]
    ] : null,

    17: ctx => (ctx.flag('earlyPeace1905') && ctx.score('leverage') < 5) ? [
      ['Spend personal authority to force Stolypin’s land decree through over conservative resistance.', { land: 3, reform: 2, autocracy: -2, legitimacy: 2, leverage: 1, flags: ['landReformForced'] }],
      ['Permit voluntary exits from the commune but protect landlords and communal institutions from rapid disruption.', { land: 2, reform: 1, autocracy: 1 }],
      ['Do not gamble the countryside on a theory. Preserve the commune.', { autocracy: 2, land: -2, legitimacy: -1, leverage: -1 }],
      ['Postpone implementation until another harvest clarifies how urgent the problem truly is.', { door: 2, land: -1, leverage: -1 }]
    ] : null,

    22: ctx => (ctx.flag('earlyPeace1905') && ctx.score('leverage') < 6) ? [
      ['Make Stolypin indispensable by publicly identifying yourself with his program.', { reform: 3, land: 3, legitimacy: 2, autocracy: -2, leverage: 2, flags: ['stolypinBacked','stolypinMadeLeverage'] }],
      ['Support the land program privately, but do not let him dictate appointments or Duma policy.', { reform: 1, land: 2, autocracy: 1, flags: ['stolypinHalfBacked'] }],
      ['The crisis has passed. Replace emergency reform with normal administration.', { autocracy: 2, land: -2, reform: -1, leverage: -2, flags: ['stolypinChecked'] }],
      ['Keep Stolypin in office without giving him the enemies—or authority—he wants.', { door: 2, land: 1, flags: ['stolypinContained'] }]
    ] : null,

    32: ctx => [
      ['Keep the doctors in charge. Alexandra may pray, but the palace will not become a shrine to every wandering holy man.', { veil: -1, legitimacy: 1, flags: ['rasputinKeptOut'] }],
      ['Let the Siberian see Alexei privately. Nothing more.', { veil: 1, faith: 1, flags: ['rasputinAtCourt', 'alexeiRasputin'] }],
      ['If the boy stops bleeding when Rasputin prays, I will not pretend that fact means nothing.', { veil: 3, faith: 1, door: 1, flags: ['rasputinAtCourt', 'alexeiRasputin'] }],
      ['Send for him whenever Alexei is ill. Alexandra has suffered enough.', { veil: 4, legitimacy: -1, flags: ['rasputinAtCourt', 'alexeiRasputin', 'rasputinTrusted'] }]
    ],

    35: ctx => ctx.flag('stolypinProtected') ? null : [
      ['Preserve Stolypin’s program even without Stolypin.', { reform: 2, land: 2, legitimacy: 1, flags: ['stolypinDead'] }],
      ['Appoint a safer successor and lower the temperature.', { door: 1, legitimacy: 1, flags: ['stolypinDead'] }],
      ['The murder proves reform only feeds instability. Reverse course.', { autocracy: 2, reform: -2, land: -2, blood: 1, flags: ['stolypinDead'] }],
      ['Say nothing publicly beyond the funeral proclamation.', { door: 2, veil: 1, flags: ['stolypinDead'] }]
    ],

    36: ctx => ctx.flag('stolypinLives') ? [
      ['Use his survival to force the remaining land and local-government reforms through while the court cannot openly attack him.', { reform: 3, land: 2, legitimacy: 2, leverage: 2, flags: ['stolypinSecondWind'] }],
      ['Tell him to recover and govern more cautiously. Providence is not a parliamentary majority.', { legitimacy: 1, door: 1, flags: ['stolypinContained'] }],
      ['Move him upward into an honorary position and end the experiment gracefully.', { autocracy: 2, reform: -2, land: -1, flags: ['stolypinRetires'] }],
      ['Ask whether surviving an assassin has changed his opinion of twenty years.', { veil: 1, door: 1 }]
    ] : null
  }
};