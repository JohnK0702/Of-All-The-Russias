/* Conditional route logic for Of All The Russias.
   This file decides which questions exist in a given playthrough and which answers
   Nicholas is psychologically/politically able to choose after earlier decisions. */

const OATR_BRANCHING = {
  questionRules: {
    // If Nicholas actually receives or successfully defuses Gapon's procession,
    // there is no Bloody Sunday aftermath question in this form.
    2: ctx => ctx.flag('bloodySunday'),

    // The parliamentary sequence only exists if Nicholas issued the October Manifesto.
    14: ctx => ctx.flag('octoberManifesto'),
    15: ctx => ctx.flag('octoberManifesto') && ctx.answered(14),
    18: ctx => ctx.flag('octoberManifesto'),
    19: ctx => ctx.flag('octoberManifesto'),

    // Stolypin's showdown with the Duma only becomes central if he has actually been empowered
    // or reform has gathered enough institutional weight to force the confrontation.
    33: ctx => ctx.flag('stolypinBacked') || ctx.score('reform') >= 8,

    // There is no 'After Stolypin' if he survives and stays in office.
    36: ctx => !ctx.flag('stolypinLives'),

    // Rasputin becomes a national political problem only if the court has already let the veil in.
    40: ctx => ctx.score('veil') >= 3 || ctx.flag('rasputinAtCourt'),
    41: ctx => ctx.score('veil') >= 2 || ctx.flag('rasputinAtCourt'),
    52: ctx => ctx.score('veil') >= 4 || ctx.flag('rasputinTrusted') || ctx.flag('rasputinLimited'),

    // Constantinople only becomes an active strategic temptation on expansionist / Balkan-heavy routes.
    44: ctx => ctx.score('empire') >= 5 || ctx.score('military') >= 7 || ctx.flag('serbiaWarning'),

    // Alexandra's intervention in the July Crisis is only a full question if court mysticism or
    // Rasputin's influence is already politically meaningful.
    65: ctx => ctx.score('veil') >= 8 || ctx.flag('rasputinTrusted'),

    // A counterorder only exists if there is something to countermand.
    66: ctx => ctx.flag('generalMobilization') || ctx.flag('partialMobilization') || ctx.flag('preparedOnly'),

    // A German ultimatum is not inevitable on a genuinely restrained route with no mobilization.
    67: ctx => !(ctx.flag('noMobilization') && ctx.flag('julyRestraint') && !ctx.flag('blankChequeSerbia')),

    // If a durable peace has already been nailed down, the burning-embassy and final-telegram beats disappear.
    68: ctx => !ctx.flag('peace1914'),
    69: ctx => !ctx.flag('peace1914')
  },

  choiceRules: {
    // Question 9: only a player who has already accumulated some reform credibility can plausibly
    // leap directly to an honestly constitutional reading of the Manifesto.
    9: [
      ctx => ctx.score('reform') >= 2 || ctx.score('legitimacy') >= 2,
      () => true,
      () => true,
      () => true
    ],

    // Question 14: inviting the Duma to form a ministry requires the 'real Duma' path or a strong reform state.
    14: [
      ctx => ctx.flag('dumaReal') || ctx.score('reform') >= 7,
      () => true,
      () => true,
      () => true
    ],

    // Question 22: fully empowering Stolypin requires that Nicholas has learned to tolerate institutions.
    22: [
      ctx => ctx.flag('dumaReal') || ctx.score('reform') >= 8,
      () => true,
      () => true,
      () => true
    ],

    // Question 35: Stolypin cannot simply survive unless the player previously fixed his security.
    35: [
      ctx => ctx.flag('stolypinProtected'),
      ctx => ctx.flag('stolypinProtected'),
      () => true,
      () => true
    ],

    // Question 41: the most intimate defense of Rasputin only appears if he has already been tied to Alexei.
    41: [
      () => true,
      () => true,
      ctx => ctx.flag('rasputinAtCourt') || ctx.flag('alexeiRasputin'),
      () => true
    ],

    // Question 47: radical Okhrana reform requires prior reformist momentum; otherwise Nicholas gets
    // narrower or more paranoid answers.
    47: [
      ctx => ctx.score('reform') >= 7 || ctx.flag('okhranaReformed'),
      () => true,
      () => true,
      () => true
    ],

    // Sarajevo: a full blank cheque to Serbia only appears on an already imperial/nationalist route.
    56: [
      () => true,
      () => true,
      ctx => ctx.score('empire') >= 6 || ctx.score('autocracy') >= 10,
      () => true
    ],

    // Mobilization: partial mobilization requires prior commitment to Serbia; general mobilization
    // requires at least a minimally functional military machine.
    61: [
      () => true,
      ctx => ctx.flag('serbiaWarning') || ctx.flag('blankChequeSerbia') || ctx.score('empire') >= 6,
      ctx => ctx.score('military') >= 4,
      () => true
    ],

    // Counterorder options correspond to what was actually ordered.
    66: [
      ctx => ctx.flag('generalMobilization'),
      ctx => ctx.flag('generalMobilization') || ctx.flag('partialMobilization'),
      ctx => ctx.flag('generalMobilization') || ctx.flag('partialMobilization'),
      () => true
    ],

    // Final telegram: the generous conference option exists only if Nicholas has kept a diplomatic
    // channel alive; pure hardline routes do not suddenly discover it at the last second.
    69: [
      ctx => ctx.flag('julyRestraint') || ctx.flag('willyNicky') || ctx.score('legitimacy') >= 12,
      () => true,
      () => true,
      () => true
    ],

    // Final question: the available futures are products of the route taken into the room.
    70: [
      ctx => !ctx.flag('war1914') && (!ctx.flag('generalMobilization') || ctx.flag('mobilizationReversed') || ctx.flag('willyNicky')),
      ctx => ctx.score('military') >= 5,
      ctx => ctx.flag('generalMobilization') || ctx.flag('warMachine') || ctx.score('autocracy') >= 18,
      ctx => ctx.score('veil') >= 10 || ctx.flag('rasputinTrusted')
    ]
  },

  choiceOverrides: {
    // This is where Rasputin first becomes a path rather than merely a score.
    32: ctx => [
      ['Keep the doctors in charge. Alexandra may pray, but the palace will not become a shrine to every wandering holy man.', { veil: -1, legitimacy: 1, flags: ['rasputinKeptOut'] }],
      ['Let the Siberian see Alexei privately. Nothing more.', { veil: 1, faith: 1, flags: ['rasputinAtCourt', 'alexeiRasputin'] }],
      ['If the boy stops bleeding when Rasputin prays, I will not pretend that fact means nothing.', { veil: 3, faith: 1, door: 1, flags: ['rasputinAtCourt', 'alexeiRasputin'] }],
      ['Send for him whenever Alexei is ill. Alexandra has suffered enough.', { veil: 4, legitimacy: -1, flags: ['rasputinAtCourt', 'alexeiRasputin', 'rasputinTrusted'] }]
    ],

    // If Stolypin was never protected, the assassination does not present fake survival options.
    35: ctx => ctx.flag('stolypinProtected') ? null : [
      ['Preserve Stolypin’s program even without Stolypin.', { reform: 2, land: 2, legitimacy: 1, flags: ['stolypinDead'] }],
      ['Appoint a safer successor and lower the temperature.', { door: 1, legitimacy: 1, flags: ['stolypinDead'] }],
      ['The murder proves reform only feeds instability. Reverse course.', { autocracy: 2, reform: -2, land: -2, blood: 1, flags: ['stolypinDead'] }],
      ['Say nothing publicly beyond the funeral proclamation.', { door: 2, veil: 1, flags: ['stolypinDead'] }]
    ]
  }
};
