/* Advisor feedback layer.
   Every response is delivered from the political, personal and institutional perspective of the
   advisor whose portrait is on screen. The advisor is not the author's conscience and is allowed
   to approve of bad decisions for reasons that reveal his or her own worldview.

   The reader should learn two things after every click:
   1. what the decision is doing to the immediate situation;
   2. what the person advising Nicholas thinks that means.
*/

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

function oatrAdvisorKey(advisor) {
  return Object.entries(OATR_ADVISORS).find(([, value]) => value === advisor)?.[0] || 'witte';
}

function oatrChoiceText(label='') {
  return label.toLowerCase().replace(/[’‘]/g, "'");
}

function oatrEventSubject(q) {
  const title = (q?.title || '').replace(/[—–:]/g, ' ').trim();
  return title || `the matter before us on ${q?.date || 'this date'}`;
}

function oatrDecisionType(label, effects={}) {
  const t = oatrChoiceText(label);
  if (/general mobil|send general mobil|authorize general mobil/.test(t)) return 'generalMobilization';
  if (/partial mobil|precaution|readiness|hold.*army|administrative precaution/.test(t)) return 'partialMobilization';
  if (/reverse|countermand|cancel|scale back/.test(t) && /mobil/.test(t)) return 'reverseMobilization';
  if (/peace|mediat|negot|conference|settlement|diplomatic exit/.test(t) && !/reject|refuse/.test(t)) return 'diplomacy';
  if (/serbia|belgrade/.test(t) && /guarantee|stand behind|back|support|patron/.test(t)) return 'serbiaGuarantee';
  if (/serbia|belgrade/.test(t) && /accept|comply|no military|will not fight|abandon/.test(t)) return 'serbiaRestraint';
  if (/berlin|german|germany|willy|continental/.test(t)) return 'germany';
  if (/receive|hear them|delegation|petition/.test(t)) return 'hearPetition';
  if (/publish|open the records|findings|procurement records/.test(t)) return 'transparency';
  if (/dissolve|refuse|withdraw|no manifesto|change as little|preserve the commune|restore government/.test(t)) return 'reaction';
  if (/legislative|constitutional settlement|binding law|responsible government|form a ministry|make the duma|duma leaders/.test(t)) return 'constitutional';
  if (/land|commune|peasant|proprietor|holdings/.test(t) && (effects.land || 0) > 0) return 'landReform';
  if (/rasputin|pilgrim|holy man|grigori/.test(t)) return (effects.veil || 0) > 1 ? 'rasputinEmpower' : 'rasputinLimit';
  if (/okhrana|political police|infiltrat|security service/.test(t)) return (effects.reform || 0) > 0 ? 'policeReform' : 'policePower';
  if (/professional|procurement|gunnery|staff work|moderniz|promotion/.test(t)) return 'militaryReform';
  if (/crush|storm|artillery|destroy|shoot|clear the streets|make .* example|troops|emergency rule|arrest|repress/.test(t) || (effects.blood || 0) >= 3) return 'force';
  if (/amnesty|surrender|deadline|separate .* murder/.test(t)) return 'limitedMercy';
  if (/postpone|wait|later|committee|commission|clarify|decide later|do nothing|leave .* ministry|leave .* governor|say nothing/.test(t) || (effects.door || 0) >= 2) return 'delay';
  if ((effects.reform || 0) >= 2 && (effects.legitimacy || 0) >= 1) return 'reform';
  if ((effects.autocracy || 0) >= 2) return 'authority';
  if ((effects.military || 0) >= 2) return 'military';
  if ((effects.legitimacy || 0) >= 2) return 'conciliation';
  return 'pragmatic';
}

/* Exact moments where the advisor's personality is itself part of the scene. */
const OATR_EXACT_ADVISOR_FEEDBACK = {
  1: {
    sergei: [
      'I would not have gone to them, Nicky. A sovereign who receives a crowd teaches crowds that pressure opens palace doors. Still, if you insist upon playing Little Father, do it completely: hear the petition yourself, answer it yourself, and make certain the police do not turn your act of condescension into a spectacle of weakness.',
      'Better. You separate the petition from the mob and preserve the principle that subjects approach the Throne by permission, not by massing in the streets. If they disperse, receive the delegates exactly as promised. Authority is strongest when even mercy occurs on our terms.',
      'Good. The street has learned that icons and portraits do not confer immunity from an order to disperse. Do not apologize for restoring the capital. Arrest the organizers, clear the bridges, reopen the factories, and let the empire see that the sovereign does not bargain with a procession simply because it has learned to sing hymns.',
      'No, Nicky. If force is necessary, order it. If mercy is necessary, grant it. Leaving the Interior Ministry to guess which one you wanted gives you all the blood of repression and none of the authority of command. A Tsar must not hide from his own firmness.'
    ]
  },
  9: {
    witte: [
      'Then we must behave tomorrow as though the signature is law. That is the part the court has not understood. A real Duma will irritate you, obstruct ministers and make bad speeches; nevertheless it gives political anger somewhere to go besides the railway yards. If you sign and then cheat it, we shall have purchased contempt at constitutional prices.',
      'You may get quiet in the streets, Majesty, but not trust. Every deputy will study the reserve clauses instead of the liberties, and every minister will learn to govern through the exceptions. We can live with an imperfect constitution. We cannot live indefinitely with a constitution everyone knows is a trick.',
      'Then there is no political settlement. There is only a contest of endurance between the state and society, and the state is more brittle than it looks from Tsarskoye Selo. The army may restore communications; it cannot make merchants lend, workers cooperate, or educated men forget what they have seen.',
      'The English constitution is mostly accumulated habit, which is precisely why copying its wording will not save us. Russia needs rules our own officials expect to obey. If the purpose of the exercise is to discover a document proving autocracy already constitutional, save the stationery.'
    ]
  },
  10: {
    trepov: [
      'Correct. Loyalists who assault Jews, students or liberals without orders are not defending authority; they are competing with it. Hang a few policemen who assisted them and the patriotic societies will suddenly rediscover discipline. The Crown needs obedient streets, not friendly mobs.',
      'Acceptable, provided the prohibition is enforced. Let them carry icons, sing the anthem and curse the revolution to their hearts’ content. The moment they begin choosing whom the law applies to, put Cossacks between patriotism and its victim.',
      'Useful men, Majesty, but dangerous instruments. If you arm them, make certain they understand they are auxiliaries, not a second government. A mob that learns it may spill blood in the Tsar’s name will eventually decide it understands the Tsar’s interests better than his ministers do.',
      'Governors will hear this as permission to do whatever keeps their desks quiet. Some will suppress the mobs, some will employ them, and every atrocity will arrive in Petersburg wrapped in a memorandum explaining local conditions. Central authority should not outsource its conscience to provincial cowards.'
    ]
  },
  22: {
    stolypin: [
      'That is what I require, Majesty. Not praise, not another rescript: protection when the landlords, courtiers and officials discover reform applies to them. Give me that and I can make property, credit and local government stronger than the commune’s habit of dependence. Withdraw it halfway and every enemy of reform will simply wait for you to tire of me.',
      'I can work with it, but understand what we are buying. Every exception for a loyal landlord becomes evidence in the village that reform is another favor distributed from above. We may still create proprietors; we shall create fewer of them, more slowly, and with greater bitterness around each boundary stone.',
      'Then dismiss me, Majesty. A Prime Minister permitted to reform only where reform offends nobody is a clerk with a better uniform. The court will celebrate that you have checked my ambition; the bureaucracy will understand that obstruction has been vindicated.',
      'Twenty years is a long time only to men who assume Russia will wait politely while they waste it. The village changes whether we legislate or not. My question is whether it changes into owners who have something to defend or into men who have learned the state has nothing left to offer them.'
    ]
  },
  41: {
    alexandra: [
      'You ask me to accept that the man who gives our son peace must become a stranger whenever a minister enters the room. I will obey you, Nicky, but I do not believe Petersburg’s gossip is cleaner than Grigori’s prayers. If you draw this line, do not let courtiers move it merely because they dislike him.',
      'That is all I have ever asked: let him come when Baby is ill and leave the ministries to their papers. But you know how this palace works. Men will call even his presence influence because they cannot imagine love that is not political.',
      'Yes. You have seen it yourself. The doctors whisper, the bleeding stops, and then men who were not in the room explain that we are fools. If preserving our son costs the approval of society, let society disapprove. God did not give them Alexei to carry.',
      'You may send him away, but do not ask me to call it prudence. When the next hemorrhage comes, it will be you and I at the bedside while the people who demanded this sleep comfortably in Petersburg.'
    ]
  },
  47: {
    witte: [
      'At last we have discovered the absurdity plainly enough to name it. A police service that pays revolutionaries, permits crimes to preserve sources and then reports the resulting conspiracies as proof of its necessity is no longer gathering intelligence; it is manufacturing the political weather. Reform it before nobody in government can tell an agent from an enemy.',
      'That answer will be very popular inside the Okhrana. Every institutional failure becomes evidence that the institution requires greater protection from scrutiny. If we accept that logic, there is no scandal large enough to count against them.',
      'Ten Azefs will give you ten times the reports and perhaps ten times the terrorism. Penetration is useful until the service becomes invested in keeping the underground alive. A policeman whose promotion depends on conspiracies eventually develops a professional objection to peace and quiet.',
      'Yes, though you have the direction reversed. The scandal is that the state penetrated the revolution so deeply that it ceased to know where its own hands were. Once the police finance the man who organizes the bomb, “penetration” is no longer a reassuring word.'
    ]
  },
  56: {
    sazonov: [
      'That buys us room, Majesty, and I will use it. Vienna must be made to state what it actually wants before Russia decides what Serbia is worth. The danger is domestic: every newspaper that has spent ten years describing Belgrade as our little brother will call patience cowardice the moment Austria raises its voice.',
      'Good. A private warning gives Berchtold a fact to calculate without forcing him to answer a public challenge. I can work with facts. What I cannot work with is Slav honor shouted from both capitals until neither government is permitted to compromise.',
      'Then tell the General Staff to prepare, because Belgrade will negotiate differently the moment it believes our army stands behind every comma of its reply. A guarantee may deter Vienna; it may also remove Serbia’s strongest reason to accept anything unpleasant.',
      'I will ask London whatever Your Majesty wishes. But unless Sir Edward Grey personally handed Princip the pistol, Britain is not the immediate problem. Austria is preparing a demand, Serbia is deciding how far to yield, and we are deciding whether a Balkan quarrel is a Russian vital interest.'
    ]
  }
};

function oatrPerspectiveAdvice(advisorKey, type, q, label, effects) {
  const subject = oatrEventSubject(q);
  const e = effects || {};

  const voices = {
    sergei: {
      force: `Good. ${subject} required the state to demonstrate that commands are not invitations to debate. Restore order completely; half-measures merely produce martyrs without producing fear. If this creates hatred, hatred is preferable to the discovery that the government can be pushed backward by a crowd.`,
      hearPetition: `I dislike the precedent, Nicky. On ${subject}, you have rewarded collective pressure with access to the sovereign. Since you have done it, make the audience paternal rather than political: hear grievances, grant what is just, and make it unmistakable that the Throne concedes from strength.`,
      constitutional: `This gives another institution a claim against your own authority. I think that dangerous. If you proceed, bind it tightly enough that Russia still knows where sovereignty lives; a Crown that begins asking permission will soon be told when it may speak.`,
      delay: `Indecision is the worst answer to ${subject}. Subordinates will improvise, enemies will test the gap, and afterward everyone will insist they acted in your name. Choose severity or mercy, but choose it yourself.`,
      diplomacy: `Peace is useful only if it restores freedom of action. Do not let foreign relief become an excuse for domestic softness. End the crisis, bring the army home, and let everyone inside Russia notice that the state has recovered its hands.`,
      reaction: `Quite right. Not every demand becomes legitimate because it arrives during a disturbance. Hold the line now and the opposition may learn that agitation does not automatically rewrite the structure of the state.`,
      reform: `I think you are giving away more than the situation requires. If you insist, make the concession administrative and revocable; do not teach subjects that disorder is a legislative procedure.`,
      authority: `At least the chain of command is clear. ${subject} will now be administered rather than argued over. Keep it that way.`,
      pragmatic: `The essential thing in ${subject} is that the state must appear to possess a will. Whatever inconvenience follows, do not allow ministers to explain your decision as hesitation.`
    },
    witte: {
      force: `Majesty, you can clear ${subject} with force and still lose the argument that produced it. The operation may succeed perfectly; that is what worries me. Successful repression has a way of convincing governments that administration, wages, law and representation were never the problem after all.`,
      hearPetition: `Good. This gives grievance a legal address. The important thing is not sentiment but administration: record what they ask, answer what can be answered, and prove that petition is more effective than conspiracy.`,
      constitutional: `This is expensive in personal discretion and cheap in comparison with another revolution. You are creating a place where conflict can become procedure. The institution will annoy you precisely because it is becoming real.`,
      reaction: `The palace will enjoy this answer for several months. Then the same pressures will return with fewer moderates attached to them. Refusing reform is sometimes necessary; convincing ourselves refusal solved the underlying problem is how necessity becomes habit.`,
      transparency: `Excellent. Let names, contracts and failures become visible. The state cannot modernize while incompetence remains a private embarrassment protected by rank. Several important people will hate you for this, which is often the first evidence that an administrative reform has reached the correct office.`,
      militaryReform: `Yes. Russia does not lack courage; it lacks systems that reward competence before catastrophe exposes the absence of it. Professional standards will offend the court because standards are impolite enough to compare men who were never meant to be compared.`,
      diplomacy: `Take the exit. ${subject} is consuming money, confidence and attention that Russia needs elsewhere. Prestige lost in a settlement can be recovered; treasury reserves, trained officers and political time are harder to resurrect.`,
      delay: `A commission postpones the quarrel and preserves every interest currently blocking a solution. Sometimes that is useful. Do not mistake usefulness for resolution: the file will return thicker, and the people inside it angrier.`,
      landReform: `This is where reform becomes material. A peasant who owns, borrows, improves and inherits has a different relationship to the state than a peasant who merely waits for repartition. Expect lawsuits, resentment and disorder during the transition; that is not proof the old arrangement was healthy.`,
      policeReform: `Good. Intelligence must tell the government what exists, not create the evidence that justifies its own budget. If reform costs us some omniscience, I suspect much of that omniscience was imaginary anyway.`,
      policePower: `The service will promise certainty. What it can actually deliver is more files, more agents and greater dependence on men whose careers require conspiracies to exist. Be careful what sort of knowledge you reward.`,
      pragmatic: `On ${subject}, ask the vulgar question first: does this make the state more capable six months from now? Court satisfaction is not a metric. If the answer survives that test, I can defend it.`
    },
    trepov: {
      force: `Correct. ${subject} has reached the point where ambiguity invites another test. Use enough force to finish the operation quickly and under orders. I want arrests, cordons and names—not drunken auxiliaries, stray shooting and three days of men improvising patriotism.`,
      limitedMercy: `Reasonable, if surrender comes first. Mercy after obedience demonstrates confidence. Mercy offered while men remain armed looks like negotiation with mutiny. Make the sequence unmistakable.`,
      policeReform: `Reform the service if it has become sloppy, but do not emasculate it to please people who will demand protection from revolution the moment the next bomb explodes. I want better police, not apologetic police.`,
      reaction: `Good. The state is under no obligation to legalize every pressure tactic used against it. Once order is restored we may discuss defects quietly, with men who are not standing on barricades.`,
      constitutional: `I do not like it, Majesty. You are making public argument part of government. If that is now unavoidable, then define the limits clearly and enforce them the first time the chamber mistakes debate for command.`,
      delay: `No. A security problem does not improve while ministries exchange memoranda. Give one man authority, give him an objective and require a report when it is finished.`,
      authority: `That is a state answer. The public may complain, but officials will know who is responsible and what is permitted. Confusion is more dangerous than severity.`,
      pragmatic: `The question on ${subject} is whether the government looks more governable after your order. If every governor interprets it differently, we have failed regardless of the words used.`
    },
    stolypin: {
      force: `Order first, yes—but only if order creates room to govern. If ${subject} ends with troops in the street and no policy afterward, we have merely purchased silence at an absurd price. Repression is a tool; reactionaries keep trying to make it a constitution.`,
      landReform: `Good. This changes the village instead of lecturing it. Property will create enemies, inequalities and movement; it will also create millions of men with a personal stake in law. Give me time and do not let frightened landlords sabotage the machinery once it begins to work.`,
      constitutional: `Use the institution. Make deputies responsible for the consequences of what they demand. I do not need parliamentary romance; I need a political class forced to choose between governing and merely denouncing the government.`,
      reaction: `You are strengthening the people who tell you Russia is safest when nothing important changes. They will use the temporary calm as evidence they were right, then act surprised when the same question returns larger.`,
      reform: `Yes, provided this is implemented rather than announced. Russia has no shortage of excellent decrees. Our shortage is ministers willing to survive the enemies created by carrying them out.`,
      delay: `Every month of delay is a vote for the existing arrangement and for everyone who profits from its defects. If you mean to refuse, refuse. If you mean to reform, give me the authority to begin.`,
      policeReform: `Necessary. A strong state does not require stupid police. I want revolutionaries found before they throw bombs, not encouraged to throw bombs so an agent can write a better report afterward.`,
      authority: `Personal authority is useful when it forces blocked reforms through. If it is used merely to preserve the blockage, then autocracy has become the mechanism by which nobody can make the state move.`,
      pragmatic: `On ${subject}, measure this by whether it leaves Russia harder to overthrow and easier to govern. Those are not opposites, whatever the court may think.`
    },
    alexandra: {
      force: `If order must be restored, then restore it and do not torment yourself because people who despise you will call firmness cruelty. But do not let officials become savage simply because they can invoke your name. You answer before God for the authority He placed upon you.`,
      reaction: `Yes, Nicky. You are not free to give away what was entrusted to you merely because frightened ministers say surrender is practical. The Crown is a duty before it is a convenience.`,
      constitutional: `I fear this. They will call each surrender the last one, then return asking for another because you have taught them pressure works. If you must concede, promise me you will remember that a parliament is not the source of your duty.`,
      rasputinEmpower: `You have seen what Grigori does for Baby. Let the clever people laugh. They do not sit beside the bed when the bleeding will not stop. If his prayers bring peace to our son, I will not apologize for opening the door to him.`,
      rasputinLimit: `I will accept the boundary because you ask it, not because I believe Petersburg has earned the right to set it. Keep him from politics if you must; do not keep him from us when Alexei needs him.`,
      delay: `Do not let them exhaust you into surrender by paperwork. Decide what you believe is right, Nicky, and make the ministers carry it out.`,
      diplomacy: `Peace, yes. There is no glory in sending Russian boys to die because diplomats are afraid of looking weak. Preserve the empire and come home to your family.`,
      authority: `Stand firm. The men around you become brave when they sense you are uncertain and obedient when they know you are not.`,
      pragmatic: `On ${subject}, remember that ministers see departments and factions. You must see the whole burden. Do not let their fear become your conscience.`
    },
    lamsdorff: {
      diplomacy: `Good. ${subject} remains negotiable, which is the first requirement of useful diplomacy. Give the other capital a way to retreat without admitting defeat; states are often most dangerous when prestige leaves them only one door.`,
      germany: `Berlin can be dealt with, but never sentimentally. Wilhelm’s friendship is genuine at breakfast and strategic by luncheon. Put every understanding into concrete obligations and assume the General Staff is reading a different document.`,
      serbiaGuarantee: `A guarantee is a splendid way to lose control of a client. Belgrade will now know that any concession it makes is partly a concession of Russian power. If you issue this promise, be prepared to have Serbian ministers spend it for us.`,
      serbiaRestraint: `This gives us leverage precisely because Belgrade dislikes it. A client who knows support has conditions is more useful than one who believes geography has signed a blank cheque on our behalf.`,
      force: `Force abroad is diplomacy with most of the useful ambiguity removed. If we cross that threshold, define the objective now; otherwise every battlefield success will invent a larger one.`,
      delay: `Delay can be diplomatic policy if the clock works for us. If the other side is mobilizing while we merely request more reports, then delay is simply surrender with better manners.`,
      reaction: `A firm position is useful only if the other capital knows what would satisfy us. “No” without an exit produces pride on both sides and policy on neither.`,
      pragmatic: `In ${subject}, I care less about who appears offended than about who retains options tomorrow morning. Preserve options and we can repair the speeches later.`
    },
    kokovtsov: {
      diplomacy: `Thank God. Every week of peace keeps trains carrying grain and machinery instead of reservists and shells. The treasury can finance preparedness; it cannot finance every minister’s theory of prestige indefinitely.`,
      force: `The Interior Ministry will present the operation as a security expense. It is also a revenue problem, a credit problem and eventually a labor problem. Rifle fire has an irritating tendency to appear later in bond yields and factory output.`,
      landReform: `This costs money now and may save the state money later. Credit, surveying, migration and local administration are tedious investments; that is precisely why they are preferable to emergency appropriations after another rural crisis.`,
      constitutional: `Predictable law is good for credit even when the law irritates the palace. Investors, municipalities and ministries all become cheaper to manage when tomorrow’s rules are not dependent on who last entered the Emperor’s study.`,
      militaryReform: `Spend on competence before spending on quantity. Russia can always buy another regiment on paper. Training officers, rationalizing procurement and making rail capacity honest are less glorious and considerably more valuable.`,
      delay: `Postponement is not free. The current arrangement continues charging us while the committee deliberates, and the eventual emergency will arrive with interest.`,
      generalMobilization: `Once this order goes out, the budget ceases to be a budget and becomes a war ledger. Railways, credit and industry will reorganize around military demand within days. Do not sign unless diplomacy is genuinely finished.`,
      partialMobilization: `This is cheaper than general mobilization and more expensive than it looks. Civil traffic will already feel it, markets will already interpret it, and other states will price the risk before our own ministers finish defining what “partial” means.`,
      pragmatic: `For ${subject}, I ask only that we count the second-order cost. Russia is rich enough to survive many bad decisions; that has unfortunately encouraged us to make them.`
    },
    rasputin: {
      force: `No. I can smell the blood in this answer, Papa. They will tell you it is only enough blood to restore order, only enough blood to defend honor, only enough blood to make the next man afraid. Blood never stays the amount men write in memoranda.`,
      diplomacy: `Yes. Let them call it weakness while their sons remain alive. A ruler who walks away from a war has lost a headline. A mother whose boy comes home has lost nothing.`,
      generalMobilization: `Do not send it. The paper looks clean because the mud and torn bodies are still weeks away. Once the trains begin, every man will tell you stopping them is more dangerous than continuing. That is how the dead acquire timetables.`,
      reverseMobilization: `Turn the trains around, Papa. Let the generals curse. Better a thousand officers embarrassed in stations than a million mothers learning which field swallowed their sons.`,
      rasputinEmpower: `I do not want ministries. I want the boy to sleep and his mother not to hear him cry. But men will put politics in my mouth because they cannot imagine anyone near a throne wanting something smaller than power.`,
      rasputinLimit: `Send me away if it gives you peace. I will pray from Siberia. Just do not send the boys west because men in clean rooms are ashamed to look frightened.`,
      delay: `Silence can be holy. This silence is not. You are waiting for other men to make the sin unavoidable so you can tell yourself it was never yours.`,
      pragmatic: `I do not understand all the papers about ${subject}. I understand that every paper has faces hidden behind it. Ask whose mother will weep if the clever men are wrong.`
    },
    sazonov: {
      diplomacy: `Good. Diplomacy still has material to work with. On ${subject}, the objective is not universal affection; it is a settlement Russia can live with without making every other capital believe we are either helpless or insane.`,
      serbiaGuarantee: `Then we must be prepared to fight. Belgrade will treat this as permission to bargain harder, Vienna will treat it as Russian intervention, and Paris will assume the alliance machinery has begun to move. A guarantee is not rhetoric once everyone believes it.`,
      serbiaRestraint: `This will cause fury in Belgrade and among our own Slav committees. It also forces Serbia to distinguish between survival and pride. If Vienna moderates in response, we may preserve Serbian independence by refusing to promise Serbian impunity.`,
      germany: `A Berlin understanding changes the geometry of the crisis. It gives us leverage over Austria at the cost of making France wonder whether Russian strategy still points west in the same direction. Use Germany, Majesty; do not become dependent on Wilhelm’s moods.`,
      generalMobilization: `This is no longer signaling. Germany will read the order through its own war plans, not through our explanatory telegrams. If we send it, assume diplomacy has hours rather than days.`,
      partialMobilization: `It puts pressure on Vienna without formally aiming the whole empire at Germany. The trouble is that our railway scheme was not designed by philosophers: partial measures can become general ones simply because the timetables fit better.`,
      reverseMobilization: `Politically humiliating, strategically useful. If Berlin reciprocates, we have turned a military fact back into a diplomatic one. If it does not, then we shall know restraint was one-sided before paying for that knowledge with an army.`,
      force: `If we are going to use force, define the political end before the first army crosses a frontier. Otherwise every success will create a new “vital interest” and every setback will create a new demand for prestige.`,
      pragmatic: `On ${subject}, I need a Russian interest I can explain in one sentence to Vienna, Berlin, Paris and Belgrade. If each hears a different policy, one of them will eventually test which version is real.`
    },
    nicholas: {
      militaryReform: `Yes. Promotions, procurement, gunnery, staffs—these are the things that decide whether courage becomes victory or casualty lists. Court favorites will complain that professional standards are unfair. War is less considerate than any examination board.`,
      force: `If you order troops in, give them a military objective and rules clear enough to survive panic. I do not object to force; I object to politicians using soldiers to compensate for decisions they refused to make earlier.`,
      generalMobilization: `Then understand what you have done. The rail plan is built for speed because delay in war kills armies. Once activated it will resist every diplomatic impulse to slow it. If you want war, mobilize completely. If you do not, keep your hand off the lever.`,
      partialMobilization: `Possible, but ugly. Our plans assume Germany and Austria are connected problems. Pulling one half of the machine may jam the other. Give me a clear political limit and I will tell you what military precautions fit inside it.`,
      reverseMobilization: `Painful, but not impossible if the order comes now. Every hour adds trains, depots and formations that must be unscrambled. Do not let staff inconvenience become an argument for continental war.`,
      diplomacy: `If diplomacy can accomplish the objective, use it. Armies exist so states possess choices, not so generals may complain whenever a choice avoids battle.`,
      delay: `I need a decision. A bad plan can be corrected; no plan leaves every district commander inventing his own war. Tell us what Russia is trying to accomplish and we can prepare for it.`,
      pragmatic: `For ${subject}, separate prestige from the military requirement. Tell me the objective, the enemy and the limit. Everything else is salon conversation.`
    }
  };

  const persona = voices[advisorKey] || voices.witte;
  return persona[type] || persona.pragmatic || voices.witte.pragmatic;
}

function oatrDecisionAdvice(q, choiceIndex, label, effects, advisor) {
  const key = oatrAdvisorKey(advisor);
  const exact = OATR_EXACT_ADVISOR_FEEDBACK[q.id]?.[key]?.[choiceIndex];
  if (exact) return exact;

  const type = oatrDecisionType(label, effects);
  let text = oatrPerspectiveAdvice(key, type, q, label, effects);

  /* One concrete immediate consequence, phrased as something the advisor cares about.
     This is subordinate to personality rather than a generic score readout. */
  const e = effects || {};
  if (key === 'witte' && (e.economy || 0) <= -2) text += ' And I will need money for this; the political argument does not exempt us from arithmetic.';
  else if (key === 'kokovtsov' && (e.economy || 0) >= 2) text += ' The treasury will feel the relief quickly, which gives us room to do something useful before another ministry spends it.';
  else if (key === 'stolypin' && (e.leverage || 0) <= -2) text += ' The men resisting reform will read the resulting calm as proof that they need never yield again.';
  else if (key === 'trepov' && (e.blood || 0) >= 3) text += ' I want the arrests and casualty reports on my desk tonight; uncontrolled violence is not strength.';
  else if (key === 'sergei' && (e.blood || 0) >= 3) text += ' Do not spoil firmness afterward by apologizing for having been firm.';
  else if (key === 'rasputin' && (e.blood || 0) >= 2) text += ' The dead do not care whether the order was technically limited.';
  else if (key === 'sazonov' && (e.pressure || 0) >= 3) text += ' From this point every capital will begin planning around what we might do next rather than what we say we want.';
  else if (key === 'nicholas' && (e.military || 0) >= 2) text += ' Give the officers enough time to turn the political decision into an actual plan rather than another ceremonial directive.';
  else if (key === 'alexandra' && (e.autocracy || 0) <= -2) text += ' I know why the ministers call this practical. I am asking you to remember what cannot be recovered once surrendered.';
  else if (key === 'lamsdorff' && (e.britain || 0) >= 2) text += ' London may indeed be involved; that fact will not relieve us of the burden of having a policy of our own.';

  return text;
}

consequenceText = function(effects, advisor) {
  const q = currentQuestion();
  if (!q || !state.pending) return oatrDefaultConsequenceText(effects, advisor);
  return oatrDecisionAdvice(q, state.pending.choiceIndex ?? 0, state.pending.label || '', effects, advisor);
};

render();
