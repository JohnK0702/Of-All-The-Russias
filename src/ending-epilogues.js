/* Expanded ending epilogues.
   Endings should read as an accounting of the reign: what Nicholas repeatedly chose, which institutions
   those choices strengthened, what survived 1914, and what kind of Russia those habits produced. */

function oatrHas(flag) { return state.flags.has(flag); }
function oatrChose(id, fragment) { return state.history.some(h => h.id === id && h.label && h.label.includes(fragment)); }

function oatrReignAccounting() {
  const s = state.scores;
  const parts = [];

  if (oatrHas('heardGapon') || oatrHas('gaponCompromise')) parts.push('In 1905 you taught the capital that petition could sometimes reach the Crown before rifle fire did.');
  else if (oatrHas('bloodySunday')) parts.push('In 1905 you allowed the first great petition of the reign to end in blood, and every later promise had to compete with the memory of snow around the Winter Palace.');

  if (oatrHas('dumaReal') || oatrHas('constitutionalCompact') || oatrHas('cabinetGovernment')) parts.push('You gave institutions outside your own person enough reality that ministers, deputies and courts learned to survive disagreement with the sovereign.');
  else if (s.autocracy >= 18) parts.push('You repeatedly chose personal command over institutional bargaining; ministries learned that the safest policy was the one nearest your will, or nearest what they guessed your will to be.');

  if (oatrHas('stolypinFullProgram') || oatrHas('stolypinBacked')) parts.push('You spent dynastic authority protecting Stolypin from the court, the landlords and your own instinct to retreat when reform became embarrassing.');
  else if (oatrHas('stolypinEconomicOnly') || oatrHas('stolypinNeutered')) parts.push('You accepted Stolypin’s railways, banks, tax base and productive farms while refusing much of the political settlement he believed those gains required.');
  else if (oatrHas('stolypinChecked')) parts.push('You let Stolypin become another clever servant whose usefulness ended where his program began to inconvenience the palace.');

  if (s.land >= 12) parts.push('Enough peasants acquired land, credit and a reason to fear chaos that the village ceased to be merely something administered from above.');
  else if (s.land <= 3) parts.push('The land question remained a promise written over millions of strips, communes and resentments; the village entered the future with very little reason to defend the order that governed it.');

  if (oatrHas('okhranaReformed')) parts.push('Political policing was forced back toward law: still intrusive, still Russian, but less able to manufacture the conspiracies it claimed to discover.');
  else if (s.blood >= 18) parts.push('You treated emergency coercion as a renewable resource. The police, governors and patriotic auxiliaries learned that violence committed for order would usually be forgiven after the paperwork was complete.');

  if (oatrHas('churchFree')) parts.push('You loosened the Petrine grip on the Church and allowed Orthodoxy to become less a department of state and more an institution capable of outliving one.');
  if (oatrHas('federalBlueprint') || oatrHas('federalPoland') || oatrHas('federalFinland')) parts.push('You accepted that loyalty did not have to mean sameness, and began turning old imperial bargains into actual federal law.');

  if (oatrHas('civilianArmy')) parts.push('You modernized the army without letting competence become a constitutional claim to rule.');
  else if (oatrHas('armyMachine') || oatrHas('armyAutonomy') || s.military >= 18) parts.push('You made the army one of the few institutions permitted to become fully modern, and it learned the dangerous lesson that competence was a form of political legitimacy.');

  if (oatrHas('germanAlliance')) parts.push('You broke Russia’s inherited alignment and tied continental strategy to Berlin, forcing every Balkan crisis to become a test of whether sentiment or strategy ruled Petersburg.');
  else if (oatrHas('ententeAligned') || oatrHas('frenchCommitment')) parts.push('You kept the French alliance real enough that loans, railway plans and military obligations eventually became one structure.');

  if (oatrHas('peace1914')) parts.push('At the last hour you accepted diplomatic humiliation, ambiguity or delay rather than turn mobilization into destiny.');
  if (oatrHas('war1914')) parts.push('At the last hour you chose war, and Russia entered it carrying every institutional virtue and every unresolved contradiction you had accumulated since 1905.');

  return parts;
}

const OATR_ENDING_EXPANSIONS = {
  'stolypin-right': [
    'The thing you wrought is not a Western republic wearing onion domes. It is a Russian constitutional empire that finally learned the difference between authority and personal supervision. The Duma remains noisy, the Crown remains sacred to millions, governors remain powerful, and Cossacks still exist; but budgets, courts, ministries and local governments have become real enough that a quarrel with the Emperor is no longer automatically a quarrel with the state.',
    'Land reform changes the social arithmetic. By the 1920s a broad class of peasant proprietors, commercial farmers, professionals, engineers and industrial managers has something tangible to lose from revolution and something tangible to demand from government. Zemstvos become schools for administration rather than waiting rooms for opposition. The rail network and industrial base you funded for development also make mobilization work when the European war comes.',
    'Russia pays terribly for the war, but does not disintegrate under the payment. The Duma votes credits, ministers fall without regimes falling, food distribution remains a political scandal rather than a state-ending revelation. Russian offensives eventually become the thing German planners spent decades fearing: mass joined to logistics. Berlin is forced to reckon with an eastern front that gets stronger instead of more desperate. Russia emerges from victory bloodied, indebted and unmistakably inside the Congress of Europe.',
    'Nicholas II is not remembered as the sovereign who preserved autocracy. He is remembered as the sovereign who preserved the dynasty by permitting Russia to become larger than himself. Peter the Great smiles because the state became stronger. Tchaikovsky smiles because it remained recognizably Russian. Stolypin, naturally, is still explaining the land bank.'
  ],
  'autocracy-works': [
    'You accepted modernization wherever it increased the reach of the Crown and resisted it wherever it created an independent center of political authority. The army was professionalized, railways expanded, arsenals filled and governors disciplined. The Duma survived chiefly because it could vote money and provide speeches while the real executive chain remained vertical.',
    'When war came, that machine worked. It requisitioned grain, moved men, censored newspapers, arrested organizers, standardized production and made disobedience expensive. Russia did not collapse in 1917 because the state never permitted the political vacuum in which collapse could become legitimate. It also never learned how to stop governing as though every district were one bad harvest away from rebellion.',
    'Victory is real. German armies are beaten back; Galicia and perhaps the Straits fall into Russian hands; Constantinople may again hear an Orthodox liturgy under Russian protection. The victory arches are enormous. Behind them are internal passports, veterans’ settlements, emergency courts, police informants, censored unions and ministries whose favorite argument is that the measures won the war.',
    'You saved the Empire by proving that the emergency state could succeed. That is the trap. Every success becomes evidence that the emergency should never end. Russia is richer, larger and feared. The Crown is secure. The country has been taught that competence and coercion are the same virtue.'
  ],
  'elephant-cancer': [
    'You avoided the furnace of 1914, but you also avoided the political bargains that might have made peace transformative. You allowed factories, railways, banks and oil fields to modernize while leaving the machinery of representation, law and provincial government half-finished. Russia becomes wealthier without becoming less personal.',
    'The nobility adapts brilliantly. Old titles become bank directorships, railway concessions, procurement firms, governorships and protected monopolies. Ministries are not openly purchased; that would be vulgar. Instead cousins sit on boards, governors recommend investors, police inquiries disappear, and contracts travel through drawing rooms before they reach offices. The state is not exactly a mafia. It is what happens when a hereditary ruling class discovers limited liability corporations.',
    'The empire remains too large to dismiss and too diseased to admire. It periodically disciplines Persia, threatens the Turks, bullies Chinese frontier authorities and reminds Japan that the Far East is still contested. European diplomats respect Russian weight while quietly discounting Russian promises. Foreign capital enters because the returns are excellent and leaves quickly whenever a grand duke becomes interested.',
    'You preserved Russia from catastrophe and from cure. The villages acquire telephones. The ministries acquire automobiles. The same families acquire everything else. The elephant lives for decades. It is enormous, dangerous, intermittently prosperous—and the cancer has learned to wear a court uniform.'
  ],
  'good-queen-olga': [
    'You repeatedly chose to make the dynasty less brittle rather than merely less powerful. Succession law changed before Alexei’s illness could become a constitutional time bomb. The Church was freed from bureaucratic tutelage. Finland and Poland received institutions that made autonomy a legal relationship instead of an argument conducted through governors and underground parties.',
    'The result is not a tidy nation-state. It is a federation of old historical bargains: Russia proper, Finland, Poland, Baltic diets, Caucasian autonomies and other territories tied together by dynasty, defense, currency and foreign policy while governing much of their own daily life. Russians complain that the empire has become too complicated. That complaint is a sign of health. Complicated law has replaced simple coercion.',
    'Because you refused the general European war, the federation receives the resource Stolypin kept asking for: time. Railways reach farther east. Schools multiply. The Church, no longer treated as a ministry with incense, becomes spiritually influential while losing some of its coercive privileges. Olga grows into a monarchy whose legitimacy rests less on male sacral inheritance and more on continuity, family and the fact that the settlement works.',
    'In the 1930s Japan eventually tests the Far East. It discovers that thirty years without continental suicide have left Russia with modern arsenals, deep rail capacity and a population that does not associate mobilization with the collapse of the state. The thanksgiving after victory is celebrated by Queen Olga beneath a constitution that has become too ordinary to overthrow. That is perhaps the strangest miracle of all.'
  ],
  'constitutional-peace': [
    'You did not solve Russia. You made it possible for Russia to continue arguing about itself without every argument becoming a rehearsal for civil war. The Duma can embarrass ministers, budgets matter, courts occasionally restrain governors, newspapers can print things that make the palace furious, and local institutions have accumulated enough practice to be more than decorative.',
    'You also stopped short of the clean liberal fantasy. The Okhrana or its successor still keeps files. Censorship statutes remain available in emergencies. The Cossacks remain Cossacks. The army has political opinions. Orthodoxy retains public privilege. Some borderlands receive autonomy while others continue negotiating under the shadow of garrisons.',
    'The decisive thing is that you avoided 1914. Nothing forces these contradictions to resolve all at once. Political parties learn to lose elections instead of states; the Crown learns that a newspaper insult is not an insurrection; workers discover that a strike can end in a contract rather than a funeral. Russia remains imperial, conservative and maddeningly incomplete.',
    'The Third Rome still stands—not because prophecy guaranteed it, but because you finally stopped treating every imperfection as proof that only one man could be trusted to hold the walls up.'
  ],
  'german-devil': [
    'You tried to combine two things the Russian right could tolerate separately but not together: constitutional reform and strategic intimacy with Germany. Then, when Vienna moved against Serbia, you refused to spend Russian blood proving that Slavic sentiment outranked your new continental alignment. The men who had spent years preaching obedience discovered a higher doctrine: obedience to what they believed Russia ought to be.',
    'The coup is carried out in the language of loyalty. Guards officers, Cossack commanders and Black Hundred leaders remove the Tsar in order to save monarchy from the Tsar. Then they discover there is no acceptable replacement Romanov and no mechanism for choosing one without admitting that sovereignty can be chosen. Their solution is the Russian Federation—a republic invented by men who consider republicanism treason.',
    'The Federation becomes a masterpiece of political contradiction: provincial autonomy administered by generals, patriotic militias incorporated into the state, opposition banned in defense of constitutional liberty, border wars described as federal self-defense. Poland and Finland receive declarations of freedom accompanied by requisition orders. Neighbors are liberated before being asked whether they are oppressed.',
    'You attempted to make Russia less autocratic and less anti-German. You instead taught its most militant defenders that the nation could exist above the dynasty. The throne disappears. The appetite for sacred central power survives perfectly and simply finds a committee large enough to sit in it.'
  ],
  'perfidious-ocean': [
    'You spent years converting suspicion of Britain from a diplomatic habit into an explanatory system. Every Balkan quarrel, every naval problem, every awkward alliance began to look like another ripple from the Anglo-Saxon sea. Then you found Wilhelm, who possessed exactly the temperament required to turn a private geopolitical fixation into bilateral strategy.',
    'The Russian-German understanding keeps the great continental war from detonating on schedule. This should have been the triumph. Instead the Foreign Ministry discovers the old map of Russian America, the Naval Staff discovers the North Pacific, and somebody writes the phrase “Anglo-Saxon oceanic system” often enough that it becomes a planning category.',
    'Sitka is eventually occupied in an operation whose strategic rationale becomes less coherent the closer the transports approach Alaska. The United States mobilizes in bewilderment. Britain is accused of masterminding the American response. Wilhelm sends ecstatic telegrams. Russian newspapers announce the rectification of 1867 while the Finance Ministry calculates how many schools could have been built for the same money.',
    'You avoided Armageddon in Europe and used the saved historical opportunity to invade Alaska. Providence has given Russia another chance. Russia has used it to prove that geography can become a personality disorder.'
  ],
  'black-hundred': [
    'You repeatedly chose the men who promised that violence committed in defense of Throne, Church and Russianness was categorically different from revolutionary violence. Pogromists became auxiliaries, patriotic clubs became intelligence networks, and governors learned that a loyal mob was cheaper than a lawful institution.',
    'For a while it works. Socialist meetings become dangerous to attend. Liberal newspapers lose printers. Minority communities learn to bargain with local police for protection from organizations that local police quietly assist. Elections still occur, but candidates increasingly understand that constitutional argument ends where the street detachments begin.',
    'Then the definition of loyalty narrows. Ministers are accused of softness. Bishops are accused of insufficient zeal. Generals are accused of foreign influence. Eventually even the Emperor is measured against an imagined Russia purer than any government could actually administer.',
    'You armed men because they loved the Tsar. They learned to love the idea of the Tsar more than the man wearing the crown. The throne survives, but increasingly by permission of the people who insist they would die for it.'
  ],
  'default-war': [
    'You reached August 1914 without creating a stable settlement strong enough to determine what the war would mean. Russia enters the conflict as a composite of your choices: whatever land reform you completed, whatever police habits you preserved, whatever competence you built into the army, whatever distrust you left between Crown and Duma.',
    'The first campaigns will therefore test more than tactics. Food distribution will test whether ministries learned to cooperate. War finance will test whether the Duma became real. Casualties will test whether legitimacy survived 1905. Mobilization will test whether the army serves policy or has become policy. Every unresolved domestic argument is now issued a uniform.',
    'Perhaps Russia wins. Perhaps it breaks. Nothing in the mobilization order itself answers that question. You have spent nine years writing the conditions under which millions of men will now discover the answer.',
    'The machine begins to move. What you wrought is not yet an ending. It is a wager large enough to bury a continent.'
  ],
  'default-peace': [
    'You kept Russia out of general war, but your reign produced no single coherent settlement strong enough to deserve one of the cleaner names history gives successful eras. Some institutions improved. Others remained personal. Some provinces learned self-government. Others learned how quickly a governor could still suspend it.',
    'That ambiguity is not nothing. Factories remain open. The villages keep their sons. Railways carry grain instead of corpses. Political enemies continue to be political enemies rather than rival governments with artillery. You have purchased the one resource every Russian program claims to need and almost none receives: more time.',
    'Whether the time becomes reform, reaction, corruption, federation or another delayed catastrophe depends on the habits you strengthened. The future is not redeemed. It is merely still available.',
    'Two Romes have fallen. The third still stands. For once, standing is not the same thing as being saved.'
  ]
};

function oatrExpandedEndingParagraphs(ending) {
  const accounting = oatrReignAccounting();
  const specific = OATR_ENDING_EXPANSIONS[ending.id] || [];
  const intro = accounting.length ? [accounting.slice(0, 4).join(' ')] : [];
  return [...intro, ...specific];
}

const OATR_RENDER_ENDING_BEFORE_EPILOGUES = renderEnding;
renderEnding = function() {
  const ending = pickEnding();
  if (!ending) return OATR_RENDER_ENDING_BEFORE_EPILOGUES();
  const paragraphs = oatrExpandedEndingParagraphs(ending);
  if (!paragraphs.length) return OATR_RENDER_ENDING_BEFORE_EPILOGUES();
  document.querySelector('#app').innerHTML = `
    <main class="ending-page ending-${ending.family.toLowerCase().replace(/[^a-z]+/g,'-')}">
      <div class="ornament">☦</div>
      <p class="eyebrow">A POSSIBLE RUSSIA · AFTER 1 AUGUST 1914</p>
      <h1>${ending.title}</h1>
      <p class="ending-kicker">${ending.kicker}</p>
      <div class="rule"><span>◆</span></div>
      <p class="ending-family">${ending.family}</p>
      ${paragraphs.map((p,i)=>`<p class="ending-copy ${i===0?'ending-accounting':''}">${p}</p>`).join('')}
      <p class="ending-verse">“Mene, mene, tekel, upharsin.”</p>
      <div class="ending-actions"><button class="restart" data-restart>BEGIN AGAIN</button><button class="restart" data-review>REVIEW THE REIGN</button></div>
      <p class="fineprint">${state.history.length} decisions · 1905–1914 · Ending: ${ending.id}</p>
    </main>`;
  document.querySelector('[data-restart]').onclick = resetCampaign;
  document.querySelector('[data-review]').onclick = renderReview;
};

/* Failure cascades already narrate ten steps of collapse; give their ending cards the same causal accounting. */
if (typeof renderFailRouteEnding === 'function') {
  const OATR_FAIL_END_BEFORE_EPILOGUES = renderFailRouteEnding;
  renderFailRouteEnding = function(route) {
    const ending = route.ending;
    const account = oatrReignAccounting().slice(0,4).join(' ');
    const routeLessons = {
      'six-civil-wars':'You removed censorship, political policing and imperial restraints faster than courts, parties and federal law could acquire authority. Liberty did not fail because it was foreign to Russia; it failed because every liberated institution was asked to become sovereign before any shared procedure existed for telling it no. Ten decisions later, the country is not free or unfree. It is plural in the most literal and violent sense: several Russias occupying the same map.',
      'cossacks-say-hi':'You pushed constitutional government farther than the coalition supporting it could defend. The Duma learned to vote before the army learned that votes could command it; the cabinet learned responsibility before the Guards accepted ministers chosen by civilians. The coup therefore arrives not as an abolition of law but as a claim to rescue law from the people practicing it.',
      'throne-without-country':'You solved opposition by making organization outside the state dangerous, then solved administrative disagreement by making officials answer upward, then solved disobedience by widening coercion. Eventually the state became the only thing left—and therefore the only thing capable of fighting itself. Unlimited authority survived. Effective government did not.',
      'savior-uniform-early':'You built a modern army inside a political order that never made clear whom modern competence was supposed to obey. The generals acquired railways, budgets, staffs, contingency powers and public prestige while civilian institutions remained weaker. They do not need to abolish the monarchy. They merely discover they can preserve it more efficiently by removing the monarch from government.'
    };
    const lesson = routeLessons[state.failRoute?.id] || ending.text;
    document.body.dataset.failDepth = '10';
    document.querySelector('#app').innerHTML = `
      <main class="ending-page ending-fail-state fail-route-ending">
        <div class="ornament">☦</div><p class="eyebrow">TEN DECISIONS AFTER THE SETTLEMENT FAILED</p>
        <h1>${ending.title}</h1><p class="ending-kicker">${ending.kicker}</p><div class="rule"><span>◆</span></div><p class="ending-family">${ending.family}</p>
        ${account ? `<p class="ending-copy ending-accounting">${account}</p>` : ''}
        <p class="ending-copy">${lesson}</p><p class="ending-copy">${ending.text}</p>
        <div class="ending-actions"><button class="restart" data-restart>BEGIN AGAIN</button><button class="restart" data-review>REVIEW THE REIGN</button></div>
      </main>`;
    document.querySelector('[data-restart]').onclick = resetCampaign;
    document.querySelector('[data-review]').onclick = renderReview;
  };
}

/* The canon Passion has its own ending renderer. Add an explicit accounting of how the imperial choices furnished the Soviet inheritance. */
if (typeof renderCanonFinalEnding === 'function') {
  const OATR_CANON_FINAL_BEFORE_EPILOGUES = renderCanonFinalEnding;
  renderCanonFinalEnding = function() {
    const successor = oatrSovietSuccessor();
    const remembered = state.flags.has('canonRepentance') || state.flags.has('canonConfession') || state.flags.has('canonRemembers1905');
    const account = oatrReignAccounting().slice(0,5).join(' ');
    const inheritance = state.scores.military >= 14 ? 'You left the revolution an unusually modern military skeleton: depots, staffs, railway habits and a political culture already accustomed to emergency command.' : state.scores.blood >= 20 ? 'You left the revolution a country accustomed to surveillance, exceptional law and the proposition that violence becomes legitimate when the state names an emergency.' : state.scores.land >= 10 && state.scores.economy >= 8 ? 'You left the revolution a more productive village, a deeper market economy and a class of peasants who had already learned to think of land as property rather than merely allotment.' : 'You left the revolution the old Russian administrative temptation: concentrate responsibility upward, preserve the files, change the names on the doors.';
    document.querySelector('#app').innerHTML = `
      <main class="ending-page canon-passion-ending">
        <div class="ornament">☦</div><p class="eyebrow">17 JULY 1918 · AFTER THE BASEMENT</p><h1>THE HOUSE AT EKATERINBURG</h1><p class="ending-kicker">THE PASSION OF THE ROMANOVS</p><div class="rule"><span>◆</span></div>
        ${account ? `<p class="ending-copy ending-accounting">${account}</p>` : ''}
        <p class="ending-copy">Nicholas Alexandrovich Romanov, Alexandra Feodorovna, Olga, Tatiana, Maria, Anastasia and Alexei are dead. Their servants who remained with them are dead. The dynasty that confused itself with Russia has been severed from Russia by men who believe history has acquitted them in advance.</p>
        <p class="ending-copy">${remembered ? 'At the end, guilt and innocence no longer cancel one another. Nicholas dies neither vindicated by his suffering nor reduced to his failures. He suffers with the people he loves, confesses what he can confess, and carries the rest into judgment.' : 'At the end, suffering strips politics down to persons. Whatever Nicholas failed to understand as Emperor, the basement does not execute an abstraction. It kills a husband, a wife, children, and loyal servants.'}</p>
        <p class="ending-verse">“Father, into thy hands I commend my spirit.”</p><div class="rule"><span>☭</span></div><p class="ending-family">AFTER LENIN</p><h2>${successor.name}</h2><p class="ending-kicker">${successor.subtitle}</p>
        <p class="ending-copy">${inheritance}</p><p class="ending-copy">${successor.text}</p>
        <div class="ending-actions"><button class="restart" data-restart>BEGIN AGAIN</button><button class="restart" data-review>REVIEW THE REIGN</button></div><p class="fineprint">70 imperial decisions · ${OATR_CANON_PASSION.length} Passion decisions · the portraits come down; history continues.</p>
      </main>`;
    document.querySelector('[data-restart]').onclick = resetCampaign;
    document.querySelector('[data-review]').onclick = renderReview;
  };
}
