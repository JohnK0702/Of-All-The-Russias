/* Divergent-route logic for Of All The Russias.
   Historical time keeps moving. Major dated beats do not simply vanish because Nicholas made
   a different choice; instead the same point in the chronology acquires different stakes,
   prose and available decisions. The branch tree should make alternate Russias feel causal. */

const OATR_BRANCHING = {
  // Question slots remain chronological. Variants rewrite the slot instead of deleting it.
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
            'No massacre has occurred. That fact does not mean the grievances have disappeared; it means, for the moment, they still arrive in the language of petitions rather than revenge.',
            'Conservatives are furious that the street discovered the Tsar can be approached. Liberals are surprised that the state did not oblige them by proving every accusation true.',
            'Witte notices something else: with Port Arthur lost and the war unpopular, a negotiated peace now might deprive the revolutionary movement of its most useful accelerant.'
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
        title: 'The fleet that turns home',
        text: {
          body: [
            'There is no Battle of Tsushima. The Baltic Fleet receives orders to turn back after peace is concluded before it reaches the strait.',
            'The navy has therefore escaped annihilation, which is not quite the same thing as having become competent. Admirals who expected to die heroically now return alive enough to defend every procurement decision they made.',
            'The awkward political consequence is less visible. There has been no final national humiliation. The court concludes that firmness worked. The opposition has lost one of its strongest arguments that the old state is physically incapable of governing.'
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
        title: 'The red flag without Tsushima',
        text: {
          body: [
            'Potemkin still mutinies. Rotten meat, brutal officers and sailors who have learned the language of 1905 do not require Admiral Togo’s permission.',
            'But the mutiny does not arrive on top of a destroyed fleet and a visibly lost war. The government has more loyal ships, more available troops, and much more confidence.',
            'For the first time you see the paradox of an early peace clearly: Russia is calmer, and precisely because she is calmer the men around you can argue that nothing fundamental need change.'
          ],
          quote: '“The mutiny is serious. It is not contagious unless we make it so—or unless the sailors discover they were right.”',
          speaker: 'Naval Ministry memorandum'
        }
      }
    ],

    6: [
      {
        when: ctx => ctx.flag('earlyPeace1905'),
        title: 'A Duma nobody has forced you to grant',
        text: {
          body: [
            'Bulygin’s consultative Duma reaches your desk in a Russia that has not suffered Tsushima. The army is home sooner. The treasury is bleeding less. The court feels the floor beneath it again.',
            'That makes reform harder, not easier. There is less immediate terror in the palace and therefore less willingness to concede anything that cannot later be withdrawn.',
            'Witte tells you that this is exactly when reform would be cheapest. The men around you hear the same sentence and conclude it is therefore unnecessary.'
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
            'The October strike still comes, but not as the same national convulsion. Some lines stop, some do not. The army is less exhausted and the government is less frightened.',
            'Workers have grievances; zemstvo liberals have demands; revolutionaries have slogans. What they lack is the intoxicating sense that the state has already lost control of events.',
            'The danger is therefore subtler: repression is easier, and a durable settlement is politically harder to justify inside the palace.'
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
            'Peace ended the war before Tsushima, but it did not resurrect the dead of January. The strike spreads through a country less humiliated abroad and more embittered at home.',
            'The army is available to restore order. That fact sits on the table beside every proposal for concession.',
            'Witte has less leverage than in another history: he cannot point to military collapse, only to the possibility that using a recovered army against Russian cities may poison the dynasty more slowly.'
          ],
          quote: '“We are stronger than we were in January. I beg Your Majesty not to confuse that with being safer.”',
          speaker: 'Sergei Witte'
        }
      }
    ],

    9: [
      {
        when: ctx => ctx.flag('earlyPeace1905') && ctx.score('leverage') < 3,
        title: 'A constitution without a catastrophe',
        text: {
          body: [
            'Witte still places a manifesto before you, but he no longer possesses the same weapon: there is no Tsushima, no army in terminal disarray, no universally acknowledged proof that the old system has failed.',
            'The strike is dangerous. It is not yet existential. Your uncles know this. Alexandra knows this. You know it too.',
            'To sign a real constitution now would require something more difficult than fear. It would require conviction.'
          ],
          quote: '“Majesty, history has been kind enough not to corner you. That means you must decide voluntarily.”',
          speaker: 'Sergei Witte'
        }
      }
    ],

    12: [
      {
        when: ctx => ctx.flag('earlyPeace1905'),
        title: 'Barricades against an army that came home',
        text: {
          body: [
            'Presnya rises. The difference is that the government can move reliable formations into Moscow without the same desperate improvisation.',
            'The uprising is militarily easier to crush. Politically, that makes the decision more dangerous in another way: violence now looks like a choice rather than the last act of a collapsing regime.',
            'The generals promise order in days. Witte asks what sort of order you intend to have afterward.'
          ],
          quote: '“The artillery can clear the streets, Majesty. It cannot draft the settlement that follows.”',
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
            'The Duma speaks, but it does not speak from the same position of strength it might have gained from national military catastrophe.',
            'The court considers it an experiment. The deputies consider themselves the beginning of responsible government. Both cannot be correct indefinitely.',
            'Stolypin watches from the edge of the room. In this Russia, the Crown has less reason to need men like him—and he therefore has less leverage to make the Crown accept what he thinks necessary.'
          ],
          quote: '“A parliament may be weak and still become a habit. That is what frightens the court.”',
          speaker: 'Sergei Witte'
        }
      }
    ],

    16: [
      {
        when: ctx => ctx.flag('earlyPeace1905'),
        title: 'The bomb in a stronger state',
        text: {
          body: [
            'The bomb at Stolypin’s dacha still tears through servants, petitioners and family rooms. Terrorism does not require Tsushima either.',
            'But Stolypin’s political position is weaker. He is useful, not indispensable. The court can imagine replacing him with a safer man precisely because the monarchy no longer feels one bad week from extinction.',
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
            'Stolypin proposes breaking the commune and creating a class of proprietors. The economics are familiar. The politics are not.',
            'Without the full shock of military disaster and revolutionary panic, landowners and conservative ministers feel less compelled to accept a wager they dislike.',
            'You can still force the reform through. But now it costs political capital rather than borrowing urgency from catastrophe.'
          ],
          quote: '“The crisis did not make the reform wise, Majesty. It only made wisdom temporarily fashionable.”',
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
            'Stolypin still asks for twenty years. What he lacks is the terror that once made the court listen.',
            'The landlords believe the emergency has passed. The bureaucracy believes the village can be administered. The dynasty has survived 1905 without a naval annihilation and draws the obvious, dangerous conclusion from its survival.',
            'If you want Stolypin’s Russia, you will have to create his leverage yourself—against men who can plausibly answer that events have already vindicated them.'
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
            'The Duma attacks Stolypin from one side and the court obstructs him from the other. In another Russia, the memory of 1905 might make both sides tolerate him as the man standing over a crack in the floor.',
            'Here the floor appears sounder. His enemies therefore have the luxury of principle.',
            'He asks you to spend personal authority protecting reforms whose original political leverage you helped remove by ending the war early.'
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
            'The question is what you permit him to do with the borrowed sanctity of survival. He wants to use it immediately.',
            'Courtiers who hoped the Kiev theatre would solve their Stolypin problem now discover that providence has returned the problem to the agenda.'
          ],
          quote: '“A failed assassination is a very short mandate, Majesty. We should spend it before it expires.”',
          speaker: 'Pyotr Stolypin'
        }
      }
    ]
  },

  // Hidden option gates. They model political possibility, not arbitrary game locks.
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
    // The first large fork: what Nicholas does with the crisis immediately after January.
    2: ctx => {
      if (ctx.flag('bloodySunday')) return [
        ['Authorize Witte to seek peace now, before another military disaster turns unrest into revolution.', { legitimacy: 2, economy: 2, pressure: -2, leverage: -2, autocracy: -1, flags: ['earlyPeace1905'] }],
        ['Continue the war, but announce a commission on labor grievances and the shootings.', { reform: 1, legitimacy: 1, pressure: 1, leverage: 1 }],
        ['Restore order first. The war and the streets are the same test of authority.', { autocracy: 2, blood: 2, pressure: 3, leverage: 2 }],
        ['Let the ministries handle both matters. You will not govern by panic.', { door: 2, legitimacy: -1, pressure: 2 }]
      ];
      return [
        ['Use the calmer moment to authorize Witte to seek an early peace with Japan.', { legitimacy: 1, economy: 2, pressure: -3, leverage: -3, autocracy: 1, flags: ['earlyPeace1905'] }],
        ['Continue the war, but begin the labor reforms promised to Gapon’s delegation.', { reform: 2, legitimacy: 2, pressure: 1, leverage: 1 }],
        ['The peaceful outcome proves firmness and paternal government still work. Change as little as possible.', { autocracy: 2, legitimacy: -1, pressure: 1, leverage: -1 }],
        ['Ask Witte to prepare both a peace feeler and a reform memorandum, then decide later.', { door: 2, reform: 1, pressure: 1 }]
      ];
    },

    4: ctx => ctx.flag('earlyPeace1905') ? [
      ['Use the saved fleet as the excuse for a ruthless naval reform before complacency returns.', { military: 3, reform: 2, economy: -1, leverage: 1 }],
      ['Celebrate the peace and preserve the command structure. A fleet that was not destroyed cannot be called a failure.', { autocracy: 2, military: -1, leverage: -1 }],
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
      ['Crush the mutiny immediately. The fleet came home intact for a reason.', { autocracy: 2, blood: 2, pressure: 2, leverage: 1 }],
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
        ['Sign a real constitutional settlement anyway. Reform before terror makes it compulsory.', { reform: 5, legitimacy: 4, autocracy: -3, leverage: 2, flags: ['octoberManifesto','dumaReal','voluntaryConstitution'] }],
        ['Issue civil liberties and a Duma, but preserve broad reserve powers for the Crown.', { reform: 2, legitimacy: 1, autocracy: 1, door: 1, flags: ['octoberManifesto'] }],
        ['Refuse a manifesto. The government has survived the strike and need not pretend it has lost a war.', { autocracy: 4, legitimacy: -3, pressure: 2, leverage: -2, flags: ['noManifesto1905'] }],
        ['Promise reform later, after the remaining disorders are suppressed.', { door: 3, legitimacy: -1, leverage: -1 }]
      ];
    },

    12: ctx => ctx.flag('earlyPeace1905') ? [
      ['Use overwhelming force quickly, then announce municipal and labor reforms before victory curdles into triumphalism.', { blood: 2, autocracy: 2, reform: 1, legitimacy: 1, leverage: 1 }],
      ['Surround Presnya and negotiate surrender. Time now favors the state.', { legitimacy: 2, blood: -1, autocracy: 1 }],
      ['Bomb the barricades and make Moscow an example.', { blood: 4, autocracy: 3, legitimacy: -4, pressure: 3, leverage: 2 }],
      ['Delegate the matter to the military governor and do not ask for details.', { door: 3, blood: 2, legitimacy: -2 }]
    ] : null,

    17: ctx => (ctx.flag('earlyPeace1905') && ctx.score('leverage') < 5) ? [
      ['Spend personal authority to force Stolypin’s land decree through over conservative resistance.', { land: 3, reform: 2, autocracy: -2, legitimacy: 2, leverage: 1, flags: ['landReformForced'] }],
      ['Permit voluntary exits from the commune but protect landlords and communal institutions from rapid disruption.', { land: 2, reform: 1, autocracy: 1 }],
      ['Do not gamble the countryside on a theory. Preserve the commune.', { autocracy: 2, land: -2, legitimacy: -1, leverage: -1 }],
      ['Postpone implementation until another harvest clarifies whether the emergency was real.', { door: 2, land: -1, leverage: -1 }]
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
