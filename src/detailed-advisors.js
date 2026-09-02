/* Advisor feedback layer.
   Advice is spoken by the person whose portrait is on screen. It should sound like a private
   memorandum, not a game system explaining itself. Advisors may be prejudiced, vain, brutal,
   sentimental, shortsighted or simply wrong. The player is expected to read through them.

   Rules for this file:
   - never quote or restate the event title;
   - never narrate score changes;
   - never say "for this event" or "on this question";
   - tell Nicholas what his order is causing, then let the advisor judge it in-character.
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

function oatrDecisionType(label, effects={}) {
  const t = oatrChoiceText(label);
  if (/general mobil|send general mobil|authorize general mobil/.test(t)) return 'generalMobilization';
  if (/reverse|countermand|cancel|scale back/.test(t) && /mobil/.test(t)) return 'reverseMobilization';
  if (/partial mobil|readiness|administrative precaution|hold .*mobil|hold .*army/.test(t)) return 'partialMobilization';
  if (/serbia|belgrade/.test(t) && /guarantee|stand behind|back|support|patron/.test(t)) return 'serbiaGuarantee';
  if (/serbia|belgrade/.test(t) && /accept|comply|no military|will not fight|abandon/.test(t)) return 'serbiaRestraint';
  if (/berlin|german|germany|willy|continental/.test(t)) return 'germany';
  if (/peace|mediat|negot|conference|settlement|diplomatic exit/.test(t) && !/reject|refuse/.test(t)) return 'diplomacy';
  if (/receive|hear them|delegation|petition/.test(t)) return 'hearPetition';
  if (/publish|open the records|findings|procurement records/.test(t)) return 'transparency';
  if (/legislative|constitutional settlement|binding law|responsible government|form a ministry|duma leaders|make the duma/.test(t)) return 'constitutional';
  if (/dissolve|refuse|withdraw|no manifesto|change as little|preserve the commune|restore government/.test(t)) return 'reaction';
  if (/land|commune|peasant|proprietor|holdings/.test(t) && (effects.land || 0) > 0) return 'landReform';
  if (/rasputin|pilgrim|holy man|grigori/.test(t)) return (effects.veil || 0) > 1 ? 'rasputinEmpower' : 'rasputinLimit';
  if (/okhrana|political police|infiltrat|security service/.test(t)) return (effects.reform || 0) > 0 ? 'policeReform' : 'policePower';
  if (/professional|procurement|gunnery|staff work|moderniz|promotion/.test(t)) return 'militaryReform';
  if (/amnesty|surrender|deadline|separate .* murder/.test(t)) return 'limitedMercy';
  if (/crush|storm|artillery|destroy|shoot|clear the streets|make .* example|troops|emergency rule|arrest|repress/.test(t) || (effects.blood || 0) >= 3) return 'force';
  if (/postpone|wait|later|committee|commission|clarify|decide later|do nothing|leave .* ministry|leave .* governor|say nothing/.test(t) || (effects.door || 0) >= 2) return 'delay';
  if ((effects.reform || 0) >= 2 && (effects.legitimacy || 0) >= 1) return 'reform';
  if ((effects.autocracy || 0) >= 2) return 'authority';
  if ((effects.military || 0) >= 2) return 'military';
  if ((effects.legitimacy || 0) >= 2) return 'conciliation';
  return 'pragmatic';
}

/* Major decisions get wholly bespoke reactions. These are deliberately written as speech,
   not as miniature encyclopedia entries. */
const OATR_EXACT_ADVISOR_FEEDBACK = {
  1: {
    sergei: [
      `I would not have received them, Nicky. Still, now that you have opened the door, make the audience yours: hear them, grant what is just, dismiss them, and let nobody imagine a crowd has discovered a new organ of government.`,
      `Better. They disperse first; then you hear the petition. Mercy after obedience looks like sovereignty. Mercy before obedience looks like bargaining.`,
      `Good. The bridges will clear, the factories will reopen, and the next procession will remember what happened to this one. Do not disgrace a necessary act by apologizing for it afterward.`,
      `No. If men are to be shot, you must own the order. If they are to be spared, you must own that too. Leaving the police to guess gives you blood without command.`
    ]
  },
  4: {
    nicholas: [
      `Then end it. The fleet is gone and there is no military sense in asking the army to recover naval honor with infantry casualties. Bring the men home and rebuild what failed.`,
      `Very well. But understand what you are asking of the army: not victory for a political objective, but victory to erase humiliation. Soldiers can be ordered to do that. They cannot make it sensible.`,
      `Good. Put the contracts, promotions and gunnery reports on the table. We have had enough brave men ruined by admirals whose chief qualification was knowing the right dining room.`,
      `Britain has coaling stations because Britain planned for a navy. We lost because ours arrived exhausted, badly handled and badly shot. I would rather fix that than flatter ourselves.`
    ]
  },
  9: {
    witte: [
      `Then mean it. Tomorrow the deputies must discover that the signature changed the way ministers govern, not merely the paper on which they govern. If we cheat them now, we shall make constitutionalism look like fraud and revolution look honest.`,
      `This may calm the streets, but every deputy will spend his time studying the exceptions. A constitution built around escape hatches teaches both sides to prepare for the moment one of them uses one.`,
      `Then there is no settlement. We will have troops, arrests and perhaps quiet, but not cooperation. A modern state cannot be run indefinitely by compelling every railwayman, clerk, merchant and professor to obey at rifle point.`,
      `There is no English paragraph that will save us from deciding who governs. We can waste a week pretending the answer is hidden in comparative law, or we can write rules our own ministers intend to obey.`
    ]
  },
  10: {
    trepov: [
      `Correct. A loyal mob is still a mob. Arrest the men who attacked civilians, dismiss policemen who assisted them, and the patriotic societies will remember that the Tsar has one government, not several.`,
      `That is workable. Let them march, sing and shout themselves hoarse. The instant they begin deciding who is entitled to protection of the law, put troops between them and their victim.`,
      `They can be useful, but only on a leash. Arm them and they will soon decide that enthusiasm gives them authority the state itself denied them. I want auxiliaries, not freelance sovereignty.`,
      `Then every governor will do whatever keeps his province quiet and call it local judgment. Petersburg will receive the corpses later, attached to excellent paperwork.`
    ]
  },
  22: {
    stolypin: [
      `That is what I need. Not another speech in my favor—your protection when the men around you discover that reform applies to their property, their offices and their friends. Give me that, and I can work.`,
      `I can proceed, but every protected interest slows the thing down. We will still make proprietors; we will simply make fewer of them, later, while teaching the village that reform bends when the right landlord complains.`,
      `Then dismiss me. A Prime Minister allowed to reform only where nobody important objects is not a Prime Minister. He is an unusually well-dressed clerk.`,
      `Twenty years is a long time only if you think the village is standing still while we talk. It is changing now. I am asking whether we shape that change or wait to be surprised by it.`
    ]
  },
  35: {
    stolypin: [
      `Then use me while they are still ashamed to oppose me. Sympathy will fade before the wounds do. If we are going to finish the work, now is the moment to force the remaining doors open.`,
      `I can leave with honors. The question is whether the program leaves with me. A safer successor will discover very quickly that every obstacle I fought has survived intact.`,
      `Do it. If the service cannot explain how a man reached me, then the service needs less self-confidence and more scrutiny. I would rather have competent police than loyal assurances.`,
      `Russia always continues. That is our most dangerous consolation. The unfinished work continues too.`
    ]
  },
  41: {
    alexandra: [
      `I will accept the line because you ask it, Nicky. But do not pretend the drawing rooms are protecting the monarchy from Grigori. Most of them are offended that a peasant may enter a door they thought belonged to them.`,
      `Yes. Let him come to Baby and nowhere else. If that satisfies them, good. If they call even compassion political influence, then they were never asking for a boundary in the first place.`,
      `You have seen what happens when he comes. The bleeding slows; our boy sleeps. Let Petersburg laugh. They do not sit beside the bed with us.`,
      `Then send him away. But when Alexei is ill again, the people who demanded this will not be here. You and I will.`
    ]
  },
  47: {
    witte: [
      `Good. A police service that pays conspirators, protects them as sources and then reports their plots as proof of its usefulness has ceased to know what success means. Clean it out before the government itself loses track of who works for whom.`,
      `The Okhrana will adore that conclusion. Every failure becomes proof that it must be protected from scrutiny. If we accept that, there is literally no scandal capable of counting against it.`,
      `More agents will give you more reports and more conspiracies in which our own men helped with the introductions. Intelligence becomes useless when the service needs the disease in order to justify the doctor.`,
      `Yes—except it is worse than infiltration. We have reached the point where the police and the underground share personnel. That is not mastery. That is administrative confusion with explosives.`
    ]
  },
  56: {
    sazonov: [
      `Good. Make Vienna tell us what it actually wants before we decide how much Serbia is worth. The newspapers will scream that hesitation is cowardice. Let them. Newspapers do not have to mobilize armies.`,
      `That is useful. A private warning gives Austria something to calculate without forcing it to answer a public insult. Keep the language precise and I can still negotiate.`,
      `Then Belgrade will bargain knowing our army stands behind it. That may frighten Vienna. It will certainly make Serbia less inclined to swallow anything unpleasant.`,
      `I will ask London. But unless Grey handed Princip the pistol himself, Britain is not the decision in front of us. Austria has demands, Serbia has choices, and we must decide what we are actually prepared to fight for.`
    ]
  }
};

/* The general voice bank. No event titles are interpolated here. Each line begins with the real-world
   consequence of the order and then filters it through the advisor's prejudices. */
const OATR_ADVISOR_VOICES = {
  sergei: {
    force: `The streets will quiet once people believe the order will actually be enforced. Good. Fear is not affection, but a government can survive being hated more easily than it can survive being tested and found harmless.`,
    hearPetition: `You have given petitioners access to the sovereign because they arrived together. I dislike that lesson. Since it is done, keep the exchange paternal: hear them, answer them, dismiss them, and concede nothing to the principle of pressure.`,
    constitutional: `Another institution now has a claim against your discretion. I think that a mistake. If you keep it, keep the boundaries unmistakable, or every concession will become the starting point for the next demand.`,
    reaction: `Good. Not every demand becomes respectable because enough people repeat it. Hold the line, restore routine, and let the opposition learn that agitation does not automatically rewrite the state.`,
    limitedMercy: `Mercy is useful after submission. Separate the frightened and foolish from the men who meant to overthrow authority, punish the latter, and let the former go home knowing exactly why they were spared.`,
    diplomacy: `End the foreign trouble, bring the army back within reach, and recover freedom of action. Peace is valuable because it lets the state become dangerous again where it matters.`,
    delay: `You have left a vacuum and called it patience. Governors and ministers will fill it with their own instincts, then explain afterward that they were carrying out your will.`,
    reform: `You are giving away more than I would. If the concession must be made, make it narrow, administrative and obviously yours to grant. Do not turn disturbance into a recognized method of legislation.`,
    authority: `At least everyone now knows where the order came from. Clarity is half of government. Enforce it once and the second order will require less effort.`,
    pragmatic: `Make certain the bureaucracy understands this as a decision, not an invitation to reinterpret you. A sovereign loses more authority through ambiguity than through an unpopular command.`
  },

  witte: {
    force: `The operation may succeed by nightfall and leave the actual grievance untouched. That is precisely the danger: competent repression makes bad administration look vindicated.`,
    hearPetition: `Good. Grievance has been given an address other than the underground. Record what they ask, answer what can be answered, and make lawful petition more productive than conspiracy.`,
    constitutional: `You have traded some personal discretion for rules that can absorb conflict. That is not surrender. It is the difference between a state and a household with several million difficult tenants.`,
    reaction: `The palace will feel stronger tomorrow. The same pressure will return later with fewer moderates attached to it. Refusal can buy time; it cannot make causes disappear.`,
    transparency: `Excellent. Names, contracts and failures belong in daylight. If a reform never embarrasses an important man, it probably has not reached the part of the system that failed.`,
    militaryReform: `Good. Courage is not our shortage. Procurement, staff work and promotion by competence are. Fix those before we buy more expensive evidence of the same defects.`,
    diplomacy: `Take the settlement. Prestige can be rebuilt; money, trained men and political time are more stubborn losses. Relief now gives us room to correct what the crisis exposed.`,
    delay: `The current arrangement wins another month because nobody signed against it. That may be convenient, but the file will return thicker and the people inside it less patient.`,
    landReform: `This is real reform because it changes what a peasant owns, borrows and leaves to his children. Expect litigation and resentment. Movement is not the same thing as failure.`,
    policeReform: `Good. Intelligence should describe conspiracies, not cultivate them. We may learn less for a while; I suspect much of what we thought we knew was produced by our own agents anyway.`,
    policePower: `The service will give you more reports and call that certainty. Remember that its careers depend on discovering danger, and institutions rarely become indifferent to the thing that justifies them.`,
    reform: `Now carry it out. Russia is full of splendid decrees whose only defect is that nobody expected them to survive contact with an office corridor.`,
    pragmatic: `Ask whether the state will be more capable six months from now. If the answer is yes, I can defend almost any amount of court grumbling in the meantime.`
  },

  trepov: {
    force: `Good. Use enough force to finish quickly and keep it under orders. I want cordons, arrests and reports—not stray shooting, drunken patriots and three days of improvisation.`,
    limitedMercy: `Surrender first, mercy second. That sequence matters. Leniency after obedience demonstrates confidence; leniency while men remain armed teaches them to negotiate with rifles.`,
    policeReform: `Clean the service up, certainly. But do not turn reform into an apology for having police. I want fewer fools and provocateurs, not a weaker state.`,
    policePower: `Give them room, but make them report upward. A secret service that cannot be supervised eventually becomes secret from its own government.`,
    reaction: `Correct. Restore order first. We can discuss defects afterward with people who are not standing on barricades.`,
    constitutional: `I do not like making public argument part of government. If it is unavoidable, define the limits now and enforce them before the chamber mistakes debate for command.`,
    delay: `No. Security deteriorates while committees compare memoranda. Put one man in charge, give him an objective, and require him to answer for the result.`,
    authority: `That is a usable order. Officials know what is permitted, governors know who is responsible, and nobody needs to guess whether firmness will be punished from above.`,
    pragmatic: `I care whether the state looks more governable after this. If every governor reads the order differently, we have failed no matter how elegant the wording was.`
  },

  stolypin: {
    force: `Order may be necessary. But when the streets are empty, I want a policy waiting for the morning. Troops can create room to govern; reactionaries always want to mistake the empty street for government itself.`,
    landReform: `Good. Give the peasant something he can own, improve and lose. Property will create quarrels, but it also creates men with a stake in law stronger than any sermon about loyalty.`,
    constitutional: `Make the deputies responsible for choices, not merely speeches. I do not need parliamentary romance; I need politicians who can be blamed for what they vote for.`,
    reaction: `The men resisting change will call the resulting calm proof that they were right. Then they will use that proof to block the next reform until the next crisis frightens them again.`,
    reform: `Good. Now protect the officials who actually carry it out. Every serious reform creates enemies; announcing one and abandoning its servants merely trains those enemies to wait.`,
    delay: `Delay is a decision for the present arrangement and for everyone who benefits from it. If you mean no, say no. If you mean yes, give somebody the authority to begin.`,
    policeReform: `Necessary. A strong state requires police clever enough to stop bombs before they are thrown, not police who help arrange the conspiracy so they can report on it.`,
    authority: `Personal authority is useful when it breaks a blockage. Used only to preserve the blockage, autocracy becomes a machine for preventing the state from moving.`,
    pragmatic: `The test is simple: are we harder to overthrow and easier to govern afterward? Those goals belong together, however much the court likes pretending otherwise.`
  },

  alexandra: {
    force: `If order must be restored, restore it and do not let people who hate you define firmness as sin. But make certain officials do not use your name as permission to become cruel for sport.`,
    reaction: `Yes. You were not given the Crown so frightened ministers could surrender it piece by piece whenever a crowd becomes loud enough. Hold what was entrusted to you.`,
    constitutional: `I fear this, Nicky. They will call each concession final and then return for another because you have taught them pressure works. If you must yield, do not forget where your duty comes from.`,
    rasputinEmpower: `You have seen what Grigori does for Baby. Let them sneer. The people mocking us are not there when the bleeding begins.`,
    rasputinLimit: `I will accept the boundary because you ask it. Keep him from papers and appointments if you must; do not keep him from Alexei when our son needs him.`,
    diplomacy: `Good. Bring the boys home. There is no glory in widows simply because diplomats were frightened of looking weak.`,
    delay: `Do not let paperwork exhaust you into surrender. Decide what you believe is right and make the ministers carry it out.`,
    authority: `Stand firm. The men around you become bold when they smell uncertainty and obedient when they know the decision is settled.`,
    pragmatic: `The ministers see departments and factions. You carry the whole burden. Listen to them, but do not let their fear become your conscience.`
  },

  lamsdorff: {
    diplomacy: `Good. There is still room for the other capital to retreat without announcing that it has been defeated. Leave men that door and they often take it.`,
    germany: `Treat Berlin seriously and Wilhelm sentimentally at your peril. Put obligations in writing, keep the language narrow, and assume the German General Staff is reading the same agreement for different reasons.`,
    serbiaGuarantee: `Belgrade will now spend our promise as though it were Serbian property. That is the trouble with guarantees: the client gains leverage over the patron the moment everyone believes them.`,
    serbiaRestraint: `Good. Conditional support is more useful than affection without limits. Serbia will hate hearing it, which is exactly why it may finally calculate what it can afford to refuse.`,
    generalMobilization: `Once the order goes out, every chancery will read our railway movements more carefully than our telegrams. We will have exchanged ambiguity for speed.`,
    partialMobilization: `This preserves more room than a general order, but not as much as the phrase suggests. Foreign ministries will assume the precautions can widen faster than our explanations can reassure them.`,
    force: `If we use force, define the object before the first shot. Otherwise every success will enlarge the appetite and every setback will become a new claim of honor.`,
    delay: `Delay is useful only when the clock favors us. If the other side is moving troops while we request another memorandum, then we are not buying time; we are giving it away.`,
    reaction: `A firm refusal is useful only if the other side knows what would satisfy us. Pride without an exit is how governments manufacture inevitability.`,
    pragmatic: `Preserve options. Speeches can be repaired tomorrow; a mobilization order, treaty clause or public guarantee is much harder to retrieve once spent.`
  },

  kokovtsov: {
    diplomacy: `Thank God. Every quiet week keeps trains carrying grain and machinery instead of reservists and shells. Peace is not sentimental; it is economically productive.`,
    force: `The Interior Ministry will call this a security expense. It will also become a labor problem, a credit problem and eventually a revenue problem. Rifle fire travels remarkably well through balance sheets.`,
    landReform: `This is expensive now and cheaper than another rural emergency later. Surveyors, credit and migration are tedious things to fund, which is one reason governments neglect them until the countryside burns.`,
    constitutional: `Predictable rules are good for credit even when they annoy the palace. Everyone borrows more cheaply when tomorrow's law does not depend on who last entered the Emperor's study.`,
    militaryReform: `Spend on competence before numbers. Russia can always create another regiment on paper. Honest rail capacity, trained officers and sane procurement take longer and matter more.`,
    delay: `Postponement is not free. The present arrangement keeps charging us while the committee deliberates, and the emergency will arrive with interest.`,
    generalMobilization: `Once that goes out, the budget becomes a war ledger. Railways, markets and industry will reorganize themselves within days. Do not sign unless you are prepared to live inside that economy.`,
    partialMobilization: `Cheaper than a general order, yes. Cheap, no. Civil traffic will feel it immediately, markets will price the risk, and the ministries will discover that “partial” is not an accounting category.`,
    reverseMobilization: `There will be waste, confusion and angry generals. Pay it. A few ruined timetables are cheaper than financing a continental war because the staff dislikes erasers.`,
    pragmatic: `Count the second-order cost before congratulating ourselves on the first-order effect. Russia is rich enough to survive many bad decisions, which has unfortunately encouraged us to make them.`
  },

  rasputin: {
    force: `No, Papa. They will tell you it is only enough blood to restore order, only enough to frighten the next man. Blood never stays the amount written on the paper.`,
    diplomacy: `Yes. Let them call you weak while their sons remain alive. A ruler loses a headline by walking away; a mother keeps her child.`,
    generalMobilization: `Do not send it. The paper is clean because the mud and torn bodies are still weeks away. Once the trains move, every clever man will tell you stopping them is more dangerous than continuing.`,
    partialMobilization: `They will say this is only half a step. Men do not die in halves. If the trains begin carrying soldiers toward the border, the other rulers will hear what the wheels are saying.`,
    reverseMobilization: `Turn them around. Let the generals curse you. Better officers embarrassed at stations than mothers learning which field swallowed their boys.`,
    rasputinEmpower: `I do not want ministries. I want the boy to sleep and his mother not to hear him cry. Men will put politics in my mouth because they cannot imagine anyone near a throne wanting something smaller than power.`,
    rasputinLimit: `Send me away if it gives you peace. I can pray from Siberia. Just do not let the men in clean rooms turn their embarrassment into graves.`,
    delay: `This is not patience. You are waiting for someone else to make the sin unavoidable so you can tell yourself the choice was never yours.`,
    pragmatic: `I do not understand every memorandum. I understand there are faces hidden behind every one of them. Ask whose mother weeps if the clever men are wrong.`
  },

  sazonov: {
    diplomacy: `Good. We still have room to trade words instead of armies. I do not need everyone pleased; I need a settlement Russia can live with and the other capitals can survive accepting.`,
    serbiaGuarantee: `Then be ready to fight. Belgrade will bargain harder, Vienna will assume Russian intervention, and Paris will expect the alliance machinery to move. Once believed, a guarantee stops being rhetoric.`,
    serbiaRestraint: `Belgrade will curse us and the Slav committees will howl. Good. Serbia now has to distinguish between humiliation and extinction instead of assuming Russia will make the distinction for her.`,
    germany: `This gives us leverage over Vienna and makes Paris nervous. Use Berlin while the interests overlap; do not build Russian strategy around Wilhelm waking in the same mood two mornings in succession.`,
    generalMobilization: `This is no longer a signal. Germany will read the railway order through its war plan, not through our explanatory telegrams. From here diplomacy has hours, not days.`,
    partialMobilization: `It pressures Vienna without openly aiming the whole empire at Germany. Unfortunately the rail plan was written by soldiers, not metaphysicians; partial measures have a habit of becoming general because the timetable works better that way.`,
    reverseMobilization: `Humiliating, yes. Useful, also yes. If Berlin reciprocates, we have turned a military fact back into a diplomatic one. If it does not, we learn something important before paying for it with an army.`,
    force: `Define what political result we want before the guns begin. Otherwise every success will create a larger demand and every setback a louder appeal to prestige.`,
    delay: `I can use time if I know what I am trying to obtain with it. Delay without an objective merely lets every other capital write the next move for us.`,
    pragmatic: `Give me a Russian interest I can explain in one sentence to Vienna, Berlin, Paris and Belgrade. If each hears a different policy, one of them will test which version is real.`
  },

  nicholas: {
    militaryReform: `Good. Promotions, procurement, gunnery and staffs decide whether courage becomes victory or a casualty list. Court favorites may complain that standards are unfair. War is less considerate.`,
    force: `If troops go in, give them a military objective and rules clear enough to survive panic. I do not object to force. I object to politicians using soldiers to repair decisions they refused to make earlier.`,
    generalMobilization: `Then understand the machine you are starting. The rail plan is designed to move faster than diplomacy can reconsider. If you want war, mobilize completely. If you do not, keep your hand off the lever.`,
    partialMobilization: `Possible, but ugly. Our plans treat Germany and Austria as one connected problem. Pulling only half the machine can jam the rest. Give me the political limit and I will tell you what military precautions fit inside it.`,
    reverseMobilization: `Do it now. Every hour adds trains, depots and formations that must be unscrambled. Staff inconvenience is not a reason to fight a continental war.`,
    diplomacy: `If diplomacy gets the result, use it. Armies exist so the state has choices, not so generals can complain whenever one of those choices avoids battle.`,
    delay: `I need a decision. A bad plan can be corrected; no plan leaves every district commander inventing his own interpretation of what Russia intends.`,
    authority: `The chain of command is clear now. Good. Make sure the order reaches the districts in language that cannot become four different policies by breakfast.`,
    military: `Give the officers time, transport and a definite objective. Numbers alone are not preparedness; a million men without a coherent plan are simply a very large administrative problem.`,
    pragmatic: `Tell me what outcome you want, what force may be used to obtain it, and where the limit is. Everything else belongs in the salon.`
  }
};

function oatrPerspectiveAdvice(advisorKey, type) {
  const persona = OATR_ADVISOR_VOICES[advisorKey] || OATR_ADVISOR_VOICES.witte;
  return persona[type] || persona.pragmatic || OATR_ADVISOR_VOICES.witte.pragmatic;
}

function oatrDecisionAdvice(q, choiceIndex, label, effects, advisor) {
  const key = oatrAdvisorKey(advisor);
  const exact = OATR_EXACT_ADVISOR_FEEDBACK[q.id]?.[key]?.[choiceIndex];
  if (exact) return exact;
  return oatrPerspectiveAdvice(key, oatrDecisionType(label, effects));
}

consequenceText = function(effects, advisor) {
  const q = currentQuestion();
  if (!q || !state.pending) return oatrDefaultConsequenceText(effects, advisor);
  return oatrDecisionAdvice(q, state.pending.choiceIndex ?? 0, state.pending.label || '', effects, advisor);
};

render();
