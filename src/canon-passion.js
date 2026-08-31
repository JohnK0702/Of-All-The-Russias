/* Canon-ending aftermath: a railroaded Passion from the February Revolution to Ekaterinburg.
   The player can choose posture, confession, mercy, resentment, prayer and interpretation, but cannot
   reverse a collapse whose political conditions were already created during the 1905–1914 campaign. */

const OATR_CANON_PASSION = [
  {
    date:'23–27 February 1917', place:'Petrograd', title:'Bread, women, snow', advisor:'alexandra',
    body:[
      'Bread queues lengthen in Petrograd. Women textile workers leave the mills on International Women’s Day. Metalworkers join them. By evening the crowds are shouting for bread, then against the war, then against the government, then against you.',
      'The city is not yet in revolution because somebody planned one. It is in revolution because every separate failure has finally discovered the others: food distribution, inflation, transport, war weariness, contempt for ministers, distrust of the court, and the old memory of 1905.',
      'The monarchy spent twelve years proving that every grievance could be survived separately. February is the morning on which the grievances meet.'
    ],
    quote:'“Give us bread.”', speaker:'A slogan before it becomes a revolution',
    advice:'Nicky, they will say this began with bread because bread is easier to confess than hatred. Do not comfort yourself with either explanation. They are hungry, and they no longer believe hunger can reach you.',
    choices:[
      ['Order food stocks released and ask the Duma to form an emergency ministry.',{legitimacy:1,reform:1,door:-1}],
      ['Order the demonstrations dispersed and tell the government to restore the streets.',{autocracy:1,blood:1,door:1}],
      ['Send a telegram from Headquarters instructing Rodzianko to stop exaggerating.',{door:2,legitimacy:-1}]
    ]
  },
  {
    date:'27 February 1917', place:'Petrograd Garrison', title:'The rifles turn around', advisor:'nicholas',
    body:[
      'The Volynsky Regiment mutinies. Other units follow. Soldiers shoot officers, open arsenals, and cross the bridges carrying rifles that yesterday existed to restore order.',
      'The Duma forms a Temporary Committee. The Petrograd Soviet forms in the same building. Two authorities are born under one roof while the old authority is still issuing telegrams from hundreds of miles away.',
      'For twelve years the regime treated the army as the final argument. The final argument has acquired an opinion.'
    ],
    quote:'“The troops have gone over.”', speaker:'Petrograd report',
    advice:'Majesty, the army can suppress a riot only while the soldiers believe suppression is an order rather than a choice. In Petrograd that distinction is gone.',
    choices:[
      ['Order loyal front units toward Petrograd.',{military:1,blood:1}],
      ['Tell the generals to avoid civil war in the capital and protect the family.',{legitimacy:1,blood:-1}],
      ['Ask which regiments remain loyal to the person of the Emperor.',{door:1,veil:1}]
    ]
  },
  {
    date:'1–2 March 1917', place:'Pskov', title:'The train cannot find the capital', advisor:'nicholas',
    body:[
      'Your train is diverted because the line toward Tsarskoye Selo is blocked. At Pskov, telegrams arrive from generals whose careers, commands and honors all came from the Crown.',
      'One after another they advise abdication. They do not call it betrayal. They call it the only means of preserving the army and continuing the war.',
      'Personal rule reaches its final paradox: the men taught to obey the sovereign now ask the sovereign to obey necessity.'
    ],
    quote:'“All around me is treachery, cowardice, and deceit.”', speaker:'Nicholas II, diary',
    advice:'There is no military maneuver left in this room. There is only the question of whether the dynasty will be used as fuel for a civil war it may not win.',
    choices:[
      ['Abdicate for yourself and Alexei. Spare the boy the crown that broke you.',{autocracy:-3,faith:1,flags:['canonAbdicatedForMichael']}],
      ['Abdicate for yourself but preserve Alexei’s rights under a regency.',{autocracy:-2,door:1,flags:['canonTriedAlexei']}],
      ['Refuse until every front commander states his advice in writing.',{door:2,legitimacy:-1}]
    ]
  },
  {
    date:'3 March 1917', place:'Mogilev', title:'The throne becomes furniture', advisor:'alexandra',
    body:[
      'Grand Duke Michael declines to accept the Crown unless a future representative assembly invites him to do so. Three centuries of Romanov sovereignty end not with a charge through palace gates but with signatures, railway compartments and cautious legal language.',
      'You return to Headquarters as Colonel Romanov in everything but habit. Officers salute. Some cry. The maps remain on the walls. The war continues without the man for whom so much of the state had supposedly existed.',
      'You wanted to preserve the sacred burden undiminished. At the end it is removed from you in a clerical paragraph.'
    ],
    quote:'“My abdication is needed.”', speaker:'Nicholas II',
    advice:'Nicky, do not let them tell you that the crown was only metal because they have taken it away. But do not tell yourself its holiness excused every failure committed beneath it.',
    choices:[
      ['Write in the diary that God’s will be done.',{faith:2,veil:1}],
      ['Write the names of the generals who advised abdication.',{blood:1,door:1}],
      ['Write nothing. Pray for Alexei.',{faith:1,door:2}]
    ]
  },
  {
    date:'March–July 1917', place:'Alexander Palace', title:'The children shave their heads', advisor:'alexandra',
    body:[
      'The family is confined at Tsarskoye Selo. The children fall ill with measles. Their hair is shaved as fever and medicine reduce imperial iconography to pale heads, blankets and ordinary parental fear.',
      'Outside the gates newspapers print every accusation accumulated during the reign. Some are true. Some are ridiculous. The difference matters less now because power can no longer punish the lie or redeem the truth.',
      'Inside, the family gardens, studies, prays and waits. Sainthood, if it comes, does not arrive dressed for a coronation. It arrives as patience under humiliation.'
    ],
    quote:'“Eli, Eli, lama sabachthani?”', speaker:'Matthew 27:46',
    advice:'Perhaps abandonment is not the absence of God. Perhaps it is the place where a man can no longer confuse God with the protection of his position.',
    choices:[
      ['Teach the children that they must not hate the guards.',{faith:3,blood:-1}],
      ['Tell them the country has been deceived and will repent.',{veil:2,legitimacy:-1}],
      ['Confess privately that some of what brought you here was yours.',{faith:2,door:-2,flags:['canonConfession']}]
    ]
  },
  {
    date:'August 1917', place:'Tobolsk', title:'A house at the end of the empire', advisor:'alexandra',
    body:[
      'Kerensky sends the family to Tobolsk, farther from Petrograd, farther from politics, farther from the world in which your signature once crossed eleven time zones.',
      'There are lessons for the children, wood to cut, services when priests are permitted, and news arriving late. The empire becomes something heard about after supper.',
      'The strange mercy of captivity is scale. Russia was once too large for one man to govern. Now your kingdom is a staircase, several rooms, a yard, and the people you love.'
    ],
    quote:'“The kingdom of God is within you.”', speaker:'Luke 17:21',
    advice:'They can take the ministries, uniforms, palaces and titles. They cannot make the children stop calling you Papa unless you let grief make you absent from the room.',
    choices:[
      ['Keep a strict household routine: lessons, exercise, prayer.',{faith:2,legitimacy:1}],
      ['Spend the evenings rereading wartime telegrams and old diaries.',{door:2,veil:1}],
      ['Ask forgiveness of the family for the life your reign has given them.',{faith:2,flags:['canonFamilyConfession']}]
    ]
  },
  {
    date:'25 October 1917', place:'Tobolsk', title:'The second revolution arrives by newspaper', advisor:'rasputin',
    body:[
      'The Provisional Government falls. Bolsheviks seize Petrograd in the name of soviet power. The men who replaced the autocracy in February are themselves replaced before they have completed a year.',
      'From Tobolsk, October feels less like a new world than another door closing somewhere very far away.',
      'In the family’s devotional imagination the language becomes older than politics: the servants of destruction have been granted an hour; the saints are not promised that the hour will be short.'
    ],
    quote:'“This is your hour, and the power of darkness.”', speaker:'Luke 22:53',
    advice:'You asked me once who the Psalm was for. Now everyone has chosen an answer. The Reds say the old world. The Whites will say the Reds. The widows will say all of you.',
    choices:[
      ['Pray for Russia, including those who now call you an enemy.',{faith:3,blood:-1}],
      ['Pray for judgment upon the men who have seized the country.',{faith:1,veil:3,blood:1}],
      ['Say nothing when Alexandra calls them servants of Satan.',{door:2,veil:2}]
    ]
  },
  {
    date:'April–May 1918', place:'Ekaterinburg', title:'The House of Special Purpose', advisor:'alexandra',
    body:[
      'You and Alexandra are taken to Ekaterinburg. Alexei is too ill to travel at first. The family is divided, then reunited. The Ipatiev House is enclosed by a high wooden palisade and renamed in bureaucratic language: the House of Special Purpose.',
      'Windows are painted over. Guards search belongings, tell obscene stories within hearing of the girls, and regulate the family’s movement room by room.',
      'The title is almost liturgical in its ugliness. Every passion requires a place. Modernity provides requisition forms and a property inventory.'
    ],
    quote:'“Blessed are they which are persecuted for righteousness’ sake.”', speaker:'Matthew 5:10',
    advice:'Do not romanticize humiliation. Endure it. Those are different acts. One makes suffering decorative; the other refuses to let suffering choose what you become.',
    choices:[
      ['Require the family to answer insults without retaliation.',{faith:2,blood:-1}],
      ['Demand formal treatment appropriate to prisoners under law.',{legitimacy:1,autocracy:1}],
      ['Scratch a cross where the guards will not see it.',{faith:2,veil:2}]
    ]
  },
  {
    date:'June 1918', place:'Ipatiev House', title:'Whitewashed windows', advisor:'alexandra',
    body:[
      'The windows are sealed and whitewashed. The family cannot see the city except in fragments. The guards change; discipline becomes harsher; the possibility of rescue is discussed in whispers and then less often.',
      'Across Russia civil war is beginning to give every side permission to call necessity a morality.',
      'You remember the emergency decrees, field courts, police reports, military necessities and temporary measures of your own reign. Recrimination is easy. Recognition is worse.'
    ],
    quote:'“For with what judgment ye judge, ye shall be judged.”', speaker:'Matthew 7:2',
    advice:'The men outside the door are responsible for what they do. You are responsible for what you did. God has enough room in judgment for both truths.',
    choices:[
      ['Refuse to excuse your own failures because your captors are cruel.',{faith:3,door:-2,flags:['canonRepentance']}],
      ['Hold that whatever your mistakes, nothing justifies what is being done to the family.',{legitimacy:1,faith:1}],
      ['Begin naming the dead of 1905 in your prayers.',{faith:3,blood:-2,veil:1,flags:['canonRemembers1905']}]
    ]
  },
  {
    date:'16 July 1918', place:'Ipatiev House', title:'The last evening', advisor:'alexandra',
    body:[
      'The day passes with the narrow routines of captivity. Alexandra writes in her diary. The girls remain close. Alexei is weak. Nobody announces that this is the last ordinary evening because history rarely has the courtesy to label the final ordinary thing.',
      'The family prepares for sleep. Somewhere outside, men discuss a decision in revolutionary administrative language.',
      'The empire that once required thousands of officials to transmit your will has contracted to a few rooms in which another government’s will approaches silently.'
    ],
    quote:'“Be still, and know that I am God.”', speaker:'Psalm 46:10',
    advice:'Nicky, tonight do not be Emperor. Be husband. Be father. There is no statecraft left to perform.',
    choices:[
      ['Sit with Alexandra until she sleeps.',{faith:2}],
      ['Check on each of the children before going to bed.',{faith:2,legitimacy:1}],
      ['Pray the evening rule slowly, without asking for rescue.',{faith:3,veil:1}]
    ]
  },
  {
    date:'17 July 1918 · 01:30', place:'Ipatiev House', title:'They wake the children', advisor:'rasputin',
    body:[
      'The commandant wakes the family. There is unrest in the city, he says. For safety, everyone must go downstairs.',
      'Alexei cannot walk. You carry him.',
      'The family descends toward a basement room. Chairs are brought for Alexandra and the boy. The daughters stand behind them. The servants remain because loyalty, having lost every worldly advantage, has finally become pure choice.',
      'There is a moment before the armed men enter when the room is simply a family waiting to be told why it has been awakened.'
    ],
    quote:'“My God, my God, why hast thou forsaken me?”', speaker:'Psalm 22:1',
    advice:'There are no ministries here. No Guard. No manifesto. No railway. No uncle. No Duma. No excuse. Only the people whose lives touched yours and the God before whom titles were always very small.',
    choices:[
      ['Hold Alexei.',{faith:3}],
      ['Look at Alexandra.',{faith:2,door:-1}],
      ['Make the sign of the Cross.',{faith:3,veil:2}]
    ]
  },
  {
    date:'17 July 1918 · after 02:00', place:'The basement', title:'Into Thy hands', advisor:'rasputin',
    body:[
      'Yurovsky enters with armed men and reads a statement. The words are difficult to hear. You ask him to repeat himself.',
      'Then the room becomes noise: revolvers, smoke, plaster dust, screaming, bullets striking walls and bodies. The jeweled corsets sewn into the daughters’ clothes turn some bullets and prolong what cannot be prevented.',
      'There is no dignified tableau. Martyrdom, if that is the word history will choose, is still murder while it is happening.',
      'The temporary victors possess the basement. They do not possess eternity.'
    ],
    quote:'“Father, into thy hands I commend my spirit.”', speaker:'Luke 23:46',
    advice:'The throne is finished. The family is not a throne. Remember that when men later use their blood to justify new thrones.',
    choices:[
      ['Into Thy hands, I commend my spirit.',{faith:5,veil:4,flags:['canonPassionComplete']}]
    ]
  }
];

function oatrCanonEligible() {
  if (state.canonPassion?.complete) return false;
  const ending = pickEnding();
  return ending && ['canon','canon-mystic-soviet','canon-military-soviet'].includes(ending.id);
}

function oatrSovietSuccessor() {
  const s = state.scores;
  const f = state.flags;
  if ((f.has('armyAutonomy') || f.has('warMachine')) && s.military >= 18) return {
    name:'MIKHAIL TUKHACHEVSKY', subtitle:'THE RED GENERAL STAFF',
    text:'Lenin dies and the Party discovers that the Red Army has become more than an instrument. Tukhachevsky survives the factional wars and builds a Soviet state obsessed with operational depth, mechanization, compulsory modernity and the proposition that history itself can be maneuvered. The old imperial General Staff is denounced, studied, inherited and finally surpassed. Russia abolishes the Tsar and places a map table where the throne used to be.'
  };
  if ((f.has('okhranaAscendant') || s.blood >= 24) && s.reform < 12) return {
    name:'FELIX DZERZHINSKY', subtitle:'THE IRON SAINT OF THE NEGATIVE ICON',
    text:'Lenin dies and the security apparatus proves better organized than the men who thought they controlled it. Dzerzhinsky outlives the illness that once should have killed him and becomes first among revolutionaries because every faction already has a file. The Cheka changes names, buildings and stationery; its function becomes the skeleton of the state. Nicholas once feared conspiracies against the throne. The new Russia solves the problem by making suspicion itself sovereign.'
  };
  if (s.economy >= 8 && s.land >= 10 && s.reform >= 14 && s.blood < 20) return {
    name:'NIKOLAI BUKHARIN', subtitle:'ENRICH YOURSELVES — CAREFULLY',
    text:'Lenin dies and Bukharin wins the argument that the peasant cannot be requisitioned into socialism forever. The New Economic Policy becomes a generation rather than an interlude. Markets return beneath red banners; villages grow richer; party rule remains absolute but learns to tax what it cannot immediately transform. The irony is almost indecent: parts of Stolypin’s social wager survive under men who shot the dynasty that sponsored it.'
  };
  if (s.military >= 13 && s.empire >= 8 && s.autocracy < 20) return {
    name:'LEON TROTSKY', subtitle:'THE REVOLUTION HAS FRONTIERS ONLY TEMPORARILY',
    text:'Lenin dies and Trotsky wins because the Civil War made organization look like legitimacy. The Soviet Union becomes more openly internationalist, more militarized, more impatient with borders. The Red Army is not merely the shield of the revolution but its argument. Europe watches the old Russian fear return wearing universal language: security requires depth, depth requires influence, influence requires one more frontier.'
  };
  return {
    name:'JOSEPH STALIN', subtitle:'THE OFFICES REMAIN',
    text:'Lenin dies and Stalin wins the struggle conducted through appointments, committees, files and patience. The Bolsheviks had promised to destroy the old state; instead they discover the usefulness of a country trained to obey vertical administration. The portraits change. The offices remain. The files remain. The prisons remain. Russia has abolished the Tsar. Russia has not abolished the throne.'
  };
}

function renderCanonPassion() {
  if (!state.canonPassion) state.canonPassion = { index:0, history:[], complete:false };
  const cp = state.canonPassion;
  if (cp.complete || cp.index >= OATR_CANON_PASSION.length) return renderCanonFinalEnding();
  const e = OATR_CANON_PASSION[cp.index];
  document.body.dataset.era = 'passion';
  document.body.dataset.veil = cp.index >= 7 ? 'high' : 'rising';
  const choices = e.choices.map((c,i)=>`<button data-canon-choice="${i}"><span>${String.fromCharCode(65+i)}</span>${c[0]}</button>`).join('');
  document.querySelector('#app').innerHTML = `
    <div class="page-shell canon-passion-shell">
      <header><div class="seal" aria-hidden="true"></div><div class="masthead"><p class="russian-title">1917–1918 · THE PASSION</p><h1>OF ALL THE RUSSIAS</h1><p class="motto">There shall be no fourth.</p></div><div class="year"><b>1917</b><span>—</span><small>1918</small></div></header>
      <div class="campaign-progress"><span style="width:${Math.round(cp.index/OATR_CANON_PASSION.length*100)}%"></span></div>
      <main><aside class="folio"><p>PASSION</p><strong>${String(cp.index+1).padStart(2,'0')}</strong><span>OF ${OATR_CANON_PASSION.length}</span><div class="vertical-rule"></div><p class="nine-years">THE CROWN<br>IS GONE</p></aside>
      <article class="question"><p class="dateline">${e.date} · ${e.place}</p><h2>${e.title}</h2>${e.body.map(p=>`<p>${p}</p>`).join('')}<blockquote>“${e.quote}”<cite>${e.speaker}</cite></blockquote><div class="choices">${choices}</div></article>
      <aside class="dossier"><p class="dossier-label">PRIVATE NOTE</p><h3>${e.advisor === 'rasputin' ? 'GRIGORI RASPUTIN' : e.advisor === 'nicholas' ? 'GRAND DUKE NICHOLAS' : 'ALEXANDRA'}</h3><p>${e.advice}</p><p class="route-whisper">The choices remaining concern the soul more than the state.</p></aside></main>
    </div>`;
  document.querySelectorAll('[data-canon-choice]').forEach(btn => btn.onclick = () => applyCanonPassion(Number(btn.dataset.canonChoice)));
}

function applyCanonPassion(i) {
  const cp = state.canonPassion;
  const e = OATR_CANON_PASSION[cp.index];
  const [label,effects] = e.choices[i];
  Object.entries(effects || {}).forEach(([k,v]) => {
    if (k === 'flags') v.forEach(flag=>state.flags.add(flag));
    else if (SCORE_KEYS.includes(k)) state.scores[k] += v;
  });
  cp.history.push({ date:e.date, title:e.title, label });
  cp.index += 1;
  if (cp.index >= OATR_CANON_PASSION.length) cp.complete = true;
  saveState();
  if (cp.complete) renderCanonFinalEnding(); else renderCanonPassion();
  window.scrollTo({top:0,behavior:'smooth'});
}

function renderCanonFinalEnding() {
  const successor = oatrSovietSuccessor();
  const remembered = state.flags.has('canonRepentance') || state.flags.has('canonConfession') || state.flags.has('canonRemembers1905');
  document.querySelector('#app').innerHTML = `
    <main class="ending-page canon-passion-ending">
      <div class="ornament">☦</div><p class="eyebrow">17 JULY 1918 · AFTER THE BASEMENT</p>
      <h1>THE HOUSE AT EKATERINBURG</h1><p class="ending-kicker">THE PASSION OF THE ROMANOVS</p><div class="rule"><span>◆</span></div>
      <p class="ending-copy">Nicholas Alexandrovich Romanov, Alexandra Feodorovna, Olga, Tatiana, Maria, Anastasia and Alexei are dead. Their servants who remained with them are dead. The dynasty that confused itself with Russia has been severed from Russia by men who believe history has acquitted them in advance.</p>
      <p class="ending-copy">${remembered ? 'At the end, guilt and innocence no longer cancel one another. Nicholas dies neither vindicated by his suffering nor reduced to his failures. He suffers with the people he loves, confesses what he can confess, and carries the rest into judgment.' : 'At the end, suffering strips politics down to persons. Whatever Nicholas failed to understand as Emperor, the basement does not execute an abstraction. It kills a husband, a wife, children, and loyal servants.'}</p>
      <p class="ending-verse">“Father, into thy hands I commend my spirit.”</p>
      <div class="rule"><span>☭</span></div><p class="ending-family">AFTER LENIN</p><h2>${successor.name}</h2><p class="ending-kicker">${successor.subtitle}</p><p class="ending-copy">${successor.text}</p>
      <div class="ending-actions"><button class="restart" data-restart>BEGIN AGAIN</button><button class="restart" data-review>REVIEW THE REIGN</button></div>
      <p class="fineprint">70 imperial decisions · ${OATR_CANON_PASSION.length} Passion decisions · the portraits come down; history continues.</p>
    </main>`;
  document.querySelector('[data-restart]').onclick = resetCampaign;
  document.querySelector('[data-review]').onclick = renderReview;
}

const OATR_RENDER_ENDING_BEFORE_PASSION = renderEnding;
renderEnding = function() {
  if (state.canonPassion?.complete) return renderCanonFinalEnding();
  if (state.canonPassion || oatrCanonEligible()) return renderCanonPassion();
  return OATR_RENDER_ENDING_BEFORE_PASSION();
};

// If a saved canon game is loaded past question 70, enter or resume the Passion immediately.
if (state.index >= OATR_SKELETONS.length && (state.canonPassion || oatrCanonEligible())) renderCanonPassion();
