/* Contextual marginalia pass.
   Tooltip notes should feel like Nicholas annotating the file in front of him, not a static glossary.
   Loaded after marginalia.js so it can temporarily retune note/eyebrow/caption text for the current question. */

const OATR_MARGINALIA_BASE_COPY = Object.fromEntries(
  OATR_MARGINALIA.map(entry => [entry.id, {
    eyebrow: entry.eyebrow,
    note: entry.note,
    caption: entry.caption
  }])
);

function oatrMarginaliaQuestionId() {
  try { return typeof currentQuestion === 'function' ? (currentQuestion()?.id || 0) : 0; }
  catch { return 0; }
}

function oatrMarginaliaHas(flag) {
  try { return state?.flags?.has?.(flag) || false; }
  catch { return false; }
}

function oatrMarginaliaScore(key) {
  try { return Number(state?.scores?.[key] || 0); }
  catch { return 0; }
}

function oatrMarginaliaPatch(id, patch) {
  const entry = OATR_MARGINALIA.find(item => item.id === id);
  if (!entry || !patch) return;
  Object.assign(entry, patch);
}

function oatrContextualizeMarginalia() {
  OATR_MARGINALIA.forEach(entry => {
    const base = OATR_MARGINALIA_BASE_COPY[entry.id];
    if (base) Object.assign(entry, base);
  });

  const qid = oatrMarginaliaQuestionId();

  if (qid >= 56) {
    oatrMarginaliaPatch('mobilization', {
      eyebrow:'THE RAILWAYS HAVE AN OPINION · N.A.R.',
      note: oatrMarginaliaHas('generalMobilization')
        ? 'It is no longer a precaution once the timetables begin moving men faster than diplomats can move words.'
        : 'Every general says it is only a precaution. Every foreign general owns the same timetable.',
      caption:'Russian mobilization planning in the July Crisis.'
    });
    oatrMarginaliaPatch('army', {
      eyebrow:'GENERAL STAFF · JULY 1914 · N.A.R.',
      note:'They have spent years preparing the perfect answer to a question diplomacy keeps changing.',
      caption:'The Imperial Russian Army and the machinery behind mobilization.'
    });
    oatrMarginaliaPatch('serbia', {
      eyebrow:'SERBIA · JULY 1914 · N.A.R.',
      note: oatrMarginaliaHas('serbiaAbandoned1914')
        ? 'We taught Belgrade that Russian affection is not an insurance policy. They have noticed.'
        : oatrMarginaliaHas('serbiaPatron1914') || oatrMarginaliaHas('blankChequeSerbia')
          ? 'A small kingdom with the remarkable ability to turn Russian sentiment into a continental obligation.'
          : 'Brother Slavs, inconveniently located at the exact point where sentiment becomes mobilization.',
      caption:'Serbia at the center of the July Crisis.'
    });
    oatrMarginaliaPatch('germany', {
      eyebrow:'BERLIN · JULY 1914 · N.A.R.',
      note: oatrMarginaliaHas('continentalCompact') || oatrMarginaliaHas('berlinUnderstanding')
        ? 'Willy may be exhausting. He is also offering a Europe in which Berlin and Petersburg do not have to discover who mobilizes faster.'
        : 'Willy. Exhausting. Dear Willy. Unfortunately his railway timetables are not sentimental.',
      caption:'Wilhelm II and the German decision at the center of the crisis.'
    });
  }

  if (qid >= 20) {
    oatrMarginaliaPatch('britain', {
      eyebrow:'THE ENTENTE · WITH CONDITIONS · N.A.R.',
      note:'We stopped competing over Persia by drawing lines through Persia. The British call this an understanding.',
      caption:'Punch on the Anglo-Russian understanding: the British Lion watches the Russian Bear sit on the Persian Cat’s tail, 1911.'
    });
  } else {
    oatrMarginaliaPatch('britain', {
      eyebrow:'THE OLD RIVAL · N.A.R.',
      note:'The sea is theirs, India is theirs, and somehow every railway we build south becomes a British security question.',
      caption:'British and Russian rivalry before the Anglo-Russian Convention.'
    });
  }

  if (qid >= 56 && (oatrMarginaliaHas('germanAlignment1914') || oatrMarginaliaHas('continentalCompact'))) {
    oatrMarginaliaPatch('britain', {
      eyebrow:'LONDON WATCHES · N.A.R.',
      note:'The British spent decades fearing Russia in Asia. Now they are wondering what it means if Russia stops fearing Germany in Europe.',
      caption:'The British strategic problem changes when Petersburg and Berlin begin speaking to one another.'
    });
  }

  if (oatrMarginaliaHas('dumaReal') || oatrMarginaliaHas('constitutionalCompact')) {
    oatrMarginaliaPatch('duma', {
      eyebrow:'A REAL INSTITUTION NOW · N.A.R.',
      note:'I gave it enough authority to become difficult. That may have been the point.',
      caption:'The State Duma after the Crown gives parliamentary procedure real political weight.'
    });
    oatrMarginaliaPatch('constitution', {
      eyebrow:'THE PROMISE HAS CONSEQUENCES · N.A.R.',
      note:'A law explaining what the sovereign may not do. More curious now that ministers have begun treating it as law.',
      caption:'The constitutional settlement after 1905.'
    });
  } else if (oatrMarginaliaHas('dumaBroken') || oatrMarginaliaHas('fundamentalLawsHard')) {
    oatrMarginaliaPatch('duma', {
      eyebrow:'THE DUMA · CONTAINED · N.A.R.',
      note:'It may speak. The difficulty begins whenever it assumes speaking should alter anything.',
      caption:'The State Duma under a Crown determined to keep parliamentary authority narrow.'
    });
  }

  if (oatrMarginaliaHas('stolypinBacked') || oatrMarginaliaHas('stolypinSecondWind')) {
    oatrMarginaliaPatch('stolypin', {
      eyebrow:'MY PRIME MINISTER · FOR NOW · N.A.R.',
      note:'He keeps asking me to spend autocratic power on building institutions that will need less autocratic power. Irritatingly coherent.',
      caption:'Pyotr Stolypin while the Crown is actively backing his reform program.'
    });
  } else if (oatrMarginaliaHas('stolypinChecked') || oatrMarginaliaHas('stolypinContained')) {
    oatrMarginaliaPatch('stolypin', {
      eyebrow:'TOO INDISPENSABLE · N.A.R.',
      note:'Useful men become dangerous when they begin to suspect usefulness is authority.',
      caption:'Pyotr Stolypin as court resistance closes around his program.'
    });
  } else if (oatrMarginaliaHas('stolypinDead')) {
    oatrMarginaliaPatch('stolypin', {
      eyebrow:'THE EMPTY CHAIR · N.A.R.',
      note:'The program remains. The man who could force everyone to discuss it does not.',
      caption:'Stolypin after the Kiev assassination.'
    });
  }

  if (oatrMarginaliaHas('rasputinTrusted')) {
    oatrMarginaliaPatch('rasputin', {
      eyebrow:'HE STAYS · N.A.R.',
      note:'They see a peasant in the palace. Alix sees the man who can make Alexei stop bleeding. I know which argument wins upstairs.',
      caption:'Rasputin after becoming indispensable inside the imperial family.'
    });
  } else if (oatrMarginaliaHas('rasputinLimited') || oatrMarginaliaHas('rasputinKeptOut')) {
    oatrMarginaliaPatch('rasputin', {
      eyebrow:'FAMILY, NOT GOVERNMENT · N.A.R.',
      note:'Let him pray for the boy. Let ministers remain ministers. These should be compatible propositions.',
      caption:'Rasputin kept close to the family but away from appointments and state papers.'
    });
  }

  if (oatrMarginaliaHas('earlyPeace1905') && qid <= 22) {
    oatrMarginaliaPatch('revolution', {
      eyebrow:'COLOR REVOLUTION · COLOR: RED · N.A.R.',
      note:'Less blood in the streets, fewer martyrs, more confidence in the palace. An easier revolution to suppress and therefore a harder reform to justify.',
      caption:'The revolutionary crisis after an early peace with Japan changes the balance of fear inside the state.'
    });
  }

  if (oatrMarginaliaScore('land') >= 10) {
    oatrMarginaliaPatch('peasants', {
      eyebrow:'THE VILLAGE HAS PROPERTY NOW · N.A.R.',
      note:'They have something to lose besides patience. Stolypin says this is the beginning of citizenship. The landlords hear something else.',
      caption:'The peasantry after land reform begins converting communal tenure into private holdings.'
    });
  }

  if (oatrMarginaliaScore('blood') >= 14) {
    oatrMarginaliaPatch('emergency', {
      eyebrow:'TEMPORARY · AGAIN · N.A.R.',
      note:'Every emergency measure arrives with an expiry date. Russia keeps the measure and misplaces the date.',
      caption:'Emergency government after repeated resort to repression and exceptional powers.'
    });
  }

  if (oatrMarginaliaHas('okhranaReformed')) {
    oatrMarginaliaPatch('okhrana', {
      eyebrow:'THE POLICE, UNDER SUPERVISION · N.A.R.',
      note:'A secret police service that must explain itself to ministers. They regard this as a radical experiment.',
      caption:'The Okhrana after tighter oversight and anti-provocation reforms.'
    });
  }
}

const oatrApplyMarginaliaBeforeContext = oatrApplyMarginalia;
oatrApplyMarginalia = function(root=document) {
  oatrContextualizeMarginalia();
  return oatrApplyMarginaliaBeforeContext(root);
};

// Refresh the currently rendered question immediately with contextual copy.
if (typeof document !== 'undefined') {
  document.querySelectorAll('.marginalia-term').forEach(node => node.replaceWith(document.createTextNode(node.querySelector('.marginalia-word')?.textContent || node.textContent || '')));
  oatrApplyMarginalia(document);
}
