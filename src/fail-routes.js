/* Ten-question fail-state cascades.
   A failed political settlement no longer cuts immediately to an ending card. The campaign
   leaves the normal chronology and enters a ten-step collapse sequence. Choices alter tone
   and scores, but none can restore the lost settlement: the player is now managing consequences. */

const OATR_FAIL_ROUTE_DEFS = [
  ...OATR_FAIL_STATES.map(f => ({ ...f, originalTest: f.test }))
];

// Disable the old instantaneous ending-screen tests. We retain their trigger conditions above.
OATR_FAIL_STATES.forEach(f => { f.test = () => false; });

const failChoice = (label, effects = {}) => [label, effects];
const failEvent = (date, place, title, body, quote, speaker, advisor, advice, choices) => ({
  date, place, title, body, quote, speaker, advisor, advice, choices
});

const OATR_FAIL_ROUTES = {
  'six-civil-wars': {
    title: 'SIX FIRES IN ONE HOUSE',
    kicker: 'FREEDOM ARRIVES FASTER THAN THE STATE',
    ending: {
      title: 'SIX FIRES IN ONE HOUSE',
      kicker: 'THE MAP HAS BECOME A VERB',
      family: 'FAILURE CASCADE',
      text: 'You abolished coercion faster than you constructed legitimacy. The tragedy is not that Russians were incapable of liberty. It is that every institution that might have taught compromise was asked to become sovereign at once. By the time constitutional government acquires defenders, there is no single constitution left to defend. The Empire does not explode in one heroic revolution. It frays into provisional governments, militias, national committees and emergency armies, each carrying a legal document proving the others illegal.'
    },
    events: [
      failEvent('3 May 1909','Ministry of Justice','The prison gates',[
        'The political amnesty is broader than the Ministry of Justice expected because nobody had agreed what “political” meant before the decree was signed.',
        'Socialist-Revolutionaries convicted of conspiracy leave alongside newspaper editors, Polish organizers, Finnish resisters and several men the police insist are ordinary murderers with excellent pamphlets.',
        'Crowds meet the trains. The government has legalized politics and, in the same gesture, released many of the people best practiced at conducting politics underground.'
      ],'“Majesty, the problem is not that they are free. It is that no one knows which laws survive their freedom.”','Minister of Justice Ivan Shcheglovitov','witte','Do not reverse the amnesty. That would teach every moderate that law is a trap. But put judges, not governors, in charge of the remaining cases before every prison becomes a plebiscite.',[
        failChoice('Order emergency courts to review every remaining political case in public.',{reform:1,legitimacy:1,pressure:1}),
        failChoice('Let the amnesty stand and tell the governors to improvise.',{door:2,pressure:2}),
        failChoice('Quietly re-arrest the men the Okhrana considers dangerous.',{autocracy:2,legitimacy:-2,blood:1})
      ]),
      failEvent('19 June 1909','Warsaw','A committee calls itself a government',[
        'The Polish National Committee publishes a declaration asserting that the right of self-determination already granted by the Crown cannot require further permission from the Crown.',
        'It does not declare independence. It declares a “provisional national competence” over schools, taxation and policing. Russian officials in Warsaw receive identical letters informing them they may remain at their posts if they swear temporary obedience to the committee.',
        'The governor asks whether he should arrest the committee. The Ministry of Justice asks under which statute.'
      ],'“A right whose procedure was never written has become a weapon for whoever writes first.”','Council memorandum','witte','You promised principle without machinery. Negotiate the machinery now, before Warsaw proves that a provisional fact is stronger than an imperial adjective.',[
        failChoice('Recognize a provisional Polish diet while negotiating the limits of autonomy.',{empire:-1,reform:1,legitimacy:1}),
        failChoice('Order the governor to remain in place and refuse to recognize the committee.',{autocracy:1,pressure:2}),
        failChoice('Send troops to secure ministries and railway stations.',{military:1,blood:2,legitimacy:-2})
      ]),
      failEvent('2 August 1909','Helsingfors','The second precedent',[
        'The Finnish Diet has read every dispatch from Warsaw.',
        'It votes that if Poland may negotiate the scope of sovereignty, Finland may suspend imperial administrative decrees until its own constitutional status is clarified.',
        'Russian officers at Sveaborg receive orders from Petersburg and petitions from Helsinki asking them to declare which government they serve. Several decide this is a question for their colonels. The colonels decide it is a question for Petersburg.'
      ],'“Majesty, precedent is now traveling faster than instructions.”','Vladimir Kokovtsov','kokovtsov','Do not mistake simultaneous disputes for a conspiracy. They are copying one another because you have created a market in constitutional improvisation.',[
        failChoice('Offer Finland a formal conference on the terms of union.',{reform:1,empire:-1,pressure:1}),
        failChoice('Suspend the Diet until the Polish question is settled.',{autocracy:2,legitimacy:-1}),
        failChoice('Let local commanders preserve order without new political instructions.',{door:2,military:1,pressure:2})
      ]),
      failEvent('11 September 1909','St Petersburg','The parties acquire guards',[
        'Legal political meetings are now large enough that organizers hire stewards. The stewards begin carrying clubs after Black Hundred groups break up two meetings. The Black Hundreds respond by organizing “patriotic protection detachments.”',
        'The Socialist-Revolutionaries insist their guards are defensive. The monarchists say exactly the same thing.',
        'The police, recently abolished, no longer possess an intelligence network capable of distinguishing theatrical uniforms from actual preparations for violence.'
      ],'“A militia is merely a meeting that has decided the argument may continue outdoors.”','A city magistrate','witte','Recreate a lawful police service immediately. Liberty requires someone who can arrest a man for carrying a bomb without also arresting him for holding an opinion.',[
        failChoice('Create a new municipal police under courts and elected city authorities.',{reform:2,legitimacy:1,pressure:1}),
        failChoice('Authorize the army to disarm every political guard in the capital.',{military:2,blood:2,legitimacy:-1}),
        failChoice('Forbid public weapons and leave enforcement to local authorities.',{door:1,pressure:2})
      ]),
      failEvent('3 October 1909','Vilna','The borderlands begin counting',[
        'Lithuanian, Belarusian, Jewish and Polish councils each publish maps of the same districts.',
        'Every map uses census categories differently. Every map proves a different nation possesses the majority.',
        'Municipal councils begin refusing tax transfers until the future provincial boundaries are known. Railway workers ask which administration will sign their wages next month.'
      ],'“The empire has discovered ethnography at the exact moment ethnography became artillery.”','Pyotr Stolypin','stolypin','Do not draw borders from petitions. Restore fiscal administration first. A state can negotiate a frontier; it cannot negotiate with a payroll that has ceased to exist.',[
        failChoice('Freeze all boundary changes and guarantee existing municipal budgets.',{economy:1,legitimacy:1}),
        failChoice('Create ethnographic commissions to propose national provinces.',{reform:1,pressure:3,empire:-2}),
        failChoice('Place disputed districts under temporary military administration.',{military:2,blood:1,autocracy:1})
      ]),
      failEvent('29 October 1909','Kiev Military District','The officers choose legality',[
        'Two governors issue contradictory requisitions to the same infantry regiment. One cites imperial law. The other cites a provincial assembly recognized under the new constitutional settlement.',
        'The regimental commander asks the district headquarters which order is legal.',
        'District headquarters asks the War Ministry. The War Ministry asks the Council of Ministers. By evening the regiment has elected to remain in barracks until someone produces an order carrying fewer signatures.'
      ],'“An army that must interpret constitutions at company level will eventually write one.”','Grand Duke Nicholas Nikolaevich','nicholas','Give the army one civilian chain of command now. If officers become arbitrators between governments, they will soon discover arbitration is easier when the governments disappear.',[
        failChoice('Place all domestic troop movements under a single civilian cabinet order.',{reform:1,military:1,autocracy:-1}),
        failChoice('Authorize military districts to decide which civil authorities are lawful.',{military:3,autocracy:2,pressure:2}),
        failChoice('Keep the regiment in barracks and summon both governors to Petersburg.',{door:1,pressure:1})
      ]),
      failEvent('14 November 1909','Moscow','The first government falls sideways',[
        'The Moscow Soviet declares it recognizes the Duma but not the Interior Ministry. The city duma recognizes the ministry but refuses orders from the governor. The governor recognizes the Emperor and nobody else.',
        'All three institutions collect taxes.',
        'A printer produces three versions of the same tax receipt and becomes, briefly, the most important man in Moscow.'
      ],'“We have reached the point where legality is not disputed. It is duplicated.”','Sergei Witte','witte','You cannot reconcile three sovereignties by proclamation. Choose one constitutional center and make everyone else negotiate with it, or the printer will be the only honest official left.',[
        failChoice('Declare the elected Duma the sole civilian legislature and subordinate ministries to it.',{reform:2,autocracy:-2,legitimacy:1}),
        failChoice('Declare imperial ministries supreme until a new constitutional convention meets.',{autocracy:2,pressure:2}),
        failChoice('Allow Moscow to reach a temporary local compact without Petersburg.',{empire:-1,door:2,pressure:2})
      ]),
      failEvent('1 December 1909','Tsarskoye Selo','The telegrams arrive in bundles',[
        'Petersburg receives declarations from six provinces before breakfast.',
        'Some declare autonomy. Some declare loyalty conditioned on autonomy. One declares loyalty to the Emperor while refusing every imperial ministry. Another announces a provisional republic and ends the telegram with GOD SAVE THE TSAR.',
        'Alexandra asks whether this is rebellion. Nobody in the room can give her a definition that includes all six.'
      ],'“And if a kingdom be divided against itself, that kingdom cannot stand.”','Mark 3:24','alexandra','Nicky, they have taken every word you gave them and built a different Russia from it. You wanted peace between the Crown and the people. Now the people are arguing over which Crown you meant.',[
        failChoice('Call an all-imperial constituent conference and order a ceasefire among authorities.',{reform:2,legitimacy:1,pressure:3}),
        failChoice('Proclaim a state of emergency in every province refusing ministry orders.',{autocracy:3,blood:2,pressure:2}),
        failChoice('Ask the army to keep communications open while politicians negotiate.',{military:2,door:1,pressure:2})
      ]),
      failEvent('18 December 1909','The Empire','Six fires',[
        'There is no single civil war. That would be administratively simpler.',
        'There are six large armed disputes, perhaps eleven smaller ones, and innumerable towns in which yesterday’s mayor still signs documents that tomorrow’s militia may recognize.',
        'Trains cross borders that did not exist on Monday. Soldiers remove cockades, replace them, then remove them again depending on the station.',
        '<em>The map in the Council chamber is now covered with pencil because ink would imply confidence.</em>'
      ],'“Majesty, there are now too many legal governments to overthrow.”','Vladimir Kokovtsov','kokovtsov','The treasury can finance one Russia. It cannot finance six competing definitions of Russia. From this point onward every ruble you spend is also a vote for whichever authority receives it.',[
        failChoice('Fund the central Duma government and abandon ministries that refuse it.',{reform:1,economy:-3}),
        failChoice('Fund loyal governors and army districts first.',{autocracy:2,military:2,economy:-3}),
        failChoice('Freeze transfers until a settlement exists.',{economy:-2,pressure:3})
      ]),
      failEvent('31 December 1909','Alexander Palace','The house has no walls',[
        'At midnight the palace chapel begins the prayers for the New Year.',
        'The priest reaches the petition for “this God-protected Russian land” and hesitates.',
        'Outside, telegraph clerks are sorting messages into piles labeled RUSSIA, POLAND, FINLAND, CAUCASUS, ARMY, DUMA, UNKNOWN.',
        'One clerk quietly adds a seventh pile: <em>ALL THE RUSSIAS.</em>'
      ],'“Every kingdom divided against itself is brought to desolation; and every city or house divided against itself shall not stand.”','Matthew 12:25','alexandra','There are prayers for emperors, armies, cities, captives, travelers and the dead. Tonight I do not know which prayer contains the country.',[
        failChoice('Remain in the chapel until the service ends.',{faith:1,veil:2}),
        failChoice('Go to the telegraph room and keep issuing orders.',{door:1,autocracy:1}),
        failChoice('Ask the priest to begin the prayers again.',{veil:3,faith:2})
      ])
    ]
  },

  'cossacks-say-hi': {
    title: 'THE COSSACKS SAY HELLO', kicker: 'THE CONSTITUTION HAS A HORSE PROBLEM',
    ending: { title:'THE COSSACKS SAY HELLO', kicker:'RESPONSIBLE GOVERNMENT, IRRESPONSIBLY TERMINATED', family:'FAILURE CASCADE', text:'The constitutional experiment does not die because Russians reject representation. It dies because no organized force believes it must obey the new civilian order when obedience becomes inconvenient. The Duma has speeches, statutes and committees. The Cossacks have horses, carbines, pay chests and a clear idea of who betrayed the old Russia. By the tenth day, everybody claims to be saving the constitution from everybody else.' },
    events: [
      failEvent('4 June 1907','Tauride Palace','The ministry loses a vote',[
        'The cabinet loses a confidence vote over the agrarian budget. This is exactly what responsible government is supposed to look like.',
        'The difficulty begins when three ministers refuse to resign because they were appointed by you, not the Duma. The Duma refuses to fund their departments. The departments continue spending.',
        'For the first time Russia has a constitutional crisis boring enough to be healthy and institutions too immature to survive its boredom.'
      ],'“Majesty, either the vote means something today or no vote will mean anything tomorrow.”','Sergei Witte','witte','Accept the humiliation. Constitutional habits are made from small defeats survived without cavalry.',[
        failChoice('Dismiss the defeated ministers and invite the Duma majority to replace them.',{reform:2,legitimacy:2,autocracy:-1}),
        failChoice('Keep the ministers temporarily while a compromise budget is negotiated.',{door:1,pressure:1}),
        failChoice('Declare confidence votes advisory to the Crown.',{autocracy:2,reform:-1,legitimacy:-1})
      ]),
      failEvent('9 June 1907','St Petersburg Garrison','The Guards discuss politics',[
        'Officers of the Semenovsky and Preobrazhensky regiments circulate a private letter declaring that party government has placed the army beneath “men elected by newspapers and factory districts.”',
        'The letter is not a mutiny. It is signed too elegantly for that.',
        'Junior officers begin asking whether an unconstitutional ministry can issue constitutional orders to the Guard.'
      ],'“The Guard has discovered legal theory. This is rarely good news.”','Grand Duke Nicholas Nikolaevich','nicholas','Move the political officers out of the capital and make the chain of command explicit. Do not purge half the Guard unless you want the other half to decide the rumors were correct.',[
        failChoice('Rotate the signatories to provincial commands and reaffirm civilian authority.',{military:1,reform:1}),
        failChoice('Demand resignations from every officer who signed.',{military:-1,legitimacy:1,pressure:2}),
        failChoice('Ignore a private letter from men who remain outwardly loyal.',{door:2,pressure:2})
      ]),
      failEvent('13 June 1907','Don Host','The telegram from Novocherkassk',[
        'The Don Host ataman informs the Interior Ministry that Cossack units will not be used to enforce decrees “contrary to the historic relationship between the Hosts and the Sovereign.”',
        'The phrase is carefully chosen. They do not refuse you. They refuse the government governing in your name.',
        'The cabinet asks you to order compliance personally. Doing so may save responsible government. It may also prove responsible government exists only when the Emperor personally rescues it.'
      ],'“They are saluting you while refusing the state.”','Pyotr Stolypin','stolypin','Make them obey the ministry once, not because the ministry is wise, but because otherwise every regiment becomes a chamber of constitutional review.',[
        failChoice('Order the Host to obey lawful cabinet instructions without personal countersignature.',{reform:2,autocracy:-1,military:1}),
        failChoice('Issue the order personally and avoid the principle for now.',{autocracy:1,door:1}),
        failChoice('Excuse the Cossacks from domestic political duties.',{military:-1,pressure:2})
      ]),
      failEvent('17 June 1907','Nevsky Prospekt','The patriotic procession',[
        'Black Hundred organizations march beneath icons, imperial portraits and banners reading SAVE THE TSAR FROM THE MINISTERS.',
        'Police estimate forty thousand. Newspapers print eighty thousand. Organizers claim two hundred thousand and include several tram passengers.',
        'The march is peaceful until a constitutionalist newspaper office loses its windows. The police watch because half the constables are wearing patriotic ribbons.'
      ],'“When a mob carries your portrait, dispersing it becomes theologically complicated.”','Vladimir Kokovtsov','kokovtsov','If the police cannot enforce ordinary law against men who praise you, then the law is already partisan. Replace the commanders before the marchers realize this.',[
        failChoice('Order arrests for violence regardless of political affiliation.',{legitimacy:2,reform:1}),
        failChoice('Let the march exhaust itself and avoid blood in the capital.',{door:1,pressure:2}),
        failChoice('Praise the patriotic sentiment while condemning excesses.',{autocracy:2,legitimacy:-1})
      ]),
      failEvent('20 June 1907','Tauride Palace','The horses at the gate',[
        'A Cossack sotnia arrives outside the Tauride Palace without a cabinet order.',
        'Its commander says he is protecting deputies from extremists. Deputies ask him to leave. He says the street is imperial ground and therefore outside their jurisdiction.',
        'By evening another unit has arrived to “prevent misunderstanding” between the first unit and the police.'
      ],'“This is how a coup looks before anyone has had the courage to call it one.”','Sergei Witte','witte','Do not negotiate over the pavement. Order them back to barracks now, while retreat can still be described as discipline.',[
        failChoice('Order both units back to barracks and dismiss their commanders.',{reform:1,military:-1,legitimacy:1}),
        failChoice('Allow one ceremonial guard to remain and send the rest away.',{door:1,pressure:1}),
        failChoice('Let them remain overnight to avoid a confrontation.',{military:1,pressure:3})
      ]),
      failEvent('21 June 1907','Winter Palace','The deputation of generals',[
        'Five senior generals request an audience. They speak respectfully and for forty minutes never use the word coup.',
        'They explain that the Crown is endangered by party ministries, that the army cannot be subordinated to transient majorities, and that temporary “guardianship” may be necessary until constitutional passions cool.',
        'One of them has already brought a draft decree.'
      ],'“Do not sign a document whose authors brought their own guards.”','Alexandra Feodorovna','alexandra','Nicky, they are polite because they still need you. If you sign, tomorrow they will be polite because they no longer do.',[
        failChoice('Refuse the decree and order the generals to return to their commands.',{autocracy:1,reform:1,pressure:2}),
        failChoice('Negotiate a temporary national ministry including military representatives.',{military:2,reform:-1,pressure:2}),
        failChoice('Ask for the night to consider it.',{door:3,pressure:3})
      ]),
      failEvent('22 June 1907','St Petersburg','The bridges rise',[
        'Before dawn, bridges across the Neva are raised. Telegraph exchanges are occupied “for protection.” The Tauride Palace is surrounded.',
        'No shots are fired. Trams continue running until noon.',
        'The city learns about the coup from morning newspapers whose editors are permitted to print so long as they use the phrase emergency constitutional safeguard.'
      ],'“A bloodless coup is still a coup. It merely invoices later.”','Vladimir Kokovtsov','kokovtsov','The treasury has been told to honor military requisitions without ministerial authorization. Once money follows the generals, speeches will not bring it back.',[
        failChoice('Order the State Bank to reject unauthorized military drafts.',{economy:-1,military:-1,pressure:3}),
        failChoice('Keep salaries flowing to prevent panic.',{economy:-2,military:1}),
        failChoice('Try to reach the Duma through a private courier.',{door:1,legitimacy:1,pressure:2})
      ]),
      failEvent('23 June 1907','Alexander Palace','The abdication that is not called abdication',[
        'The generals do not ask you to renounce the throne.',
        'They ask you to appoint a “Council of National Salvation” and withdraw temporarily from active politics. The council will rule in your name. The Duma may reconvene when public order permits.',
        'A train is ready for the imperial family should you prefer Crimea.'
      ],'“They have invented an abdication with your portrait still on the wall.”','Sergei Witte','witte','If you go quietly, the monarchy may survive and constitutional government will not. If you resist, the monarchy may not survive either. That is the trap they spent a week constructing.',[
        failChoice('Refuse to leave and force them to arrest their Emperor.',{legitimacy:1,blood:2,pressure:3}),
        failChoice('Accept temporary withdrawal to avoid fighting around the palace.',{door:2,autocracy:-2}),
        failChoice('Sign only after inserting a date for the Duma to reconvene.',{reform:1,door:1})
      ]),
      failEvent('25 June 1907','St Petersburg','The constitution is protected from itself',[
        'The Council of National Salvation dissolves the cabinet, suspends party newspapers and announces that constitutional government will resume when constitutional conditions have been restored.',
        'The Black Hundreds celebrate the defeat of revolution. Liberal deputies point out that they were the government being defeated.',
        'Cossacks patrol Nevsky beneath portraits of you. Your new ministers have not asked you a question in forty-eight hours.'
      ],'“The Crown has been saved so thoroughly that nobody requires the sovereign.”','Pyotr Stolypin','stolypin','They will keep your name because your name makes obedience easier. Whether they keep you is an administrative detail.',[
        failChoice('Demand a meeting of the council.',{autocracy:1,pressure:2}),
        failChoice('Write privately to loyal provincial governors.',{door:1,pressure:2}),
        failChoice('Attend the palace chapel and wait for them to come to you.',{faith:1,veil:1})
      ]),
      failEvent('1 July 1907','Tsarskoye Selo','The hoofprints in the garden',[
        'At dawn you hear horses on the gravel outside the Alexander Palace.',
        'There is no emergency. The patrol is now routine.',
        'Olga asks why Cossacks are guarding the family if the Cossacks are also guarding the men who will not let Papa govern.',
        'Nobody answers her. Somewhere beyond the trees a bugle sounds, and every adult in the room knows whose orders it carries.'
      ],'“Put not your trust in princes, nor in the son of man, in whom there is no help.”','Psalm 146:3','alexandra','Olga understands the arrangement better than half the generals. That is the worst thing about children: they have not yet learned which contradictions are considered respectable.',[
        failChoice('Tell Olga the soldiers are here to keep Russia safe.',{legitimacy:-1,veil:1}),
        failChoice('Tell her you do not know.',{door:1,veil:2}),
        failChoice('Say nothing.',{door:3,veil:2})
      ])
    ]
  },

  'throne-without-country': {
    title:'THE THRONE WITHOUT A COUNTRY', kicker:'ORDER CONSUMES ITS SUBJECTS',
    ending:{ title:'THE THRONE WITHOUT A COUNTRY', kicker:'THE STATE HAS WON · THE COUNTRY IS MISSING', family:'FAILURE CASCADE', text:'You succeed in making the Crown the only unquestioned source of authority. Then authority ceases to travel. Every institution protects itself from every other institution. Governors hoard troops, police manufacture conspiracies, tax collectors require infantry, and villages learn that the cheapest form of resistance is absence. The Emperor commands everything. Increasingly, everything is somewhere else.' },
    events:[
      failEvent('7 February 1910','Ministry of Interior','The list of unreliable governors',['The Interior Ministry submits a list of twelve governors suspected of softness, corruption or insufficient enthusiasm for emergency law.','The Okhrana submits a second list accusing three of the investigators who wrote the first list.','One governor has arrested the local Okhrana chief for conspiring to fabricate evidence against him. Both men claim to be defending your authority.'],'“When loyalty is the only qualification, accusation becomes a career.”','Vladimir Kokovtsov','kokovtsov','Choose procedures now or every ministry will survive by proving another ministry disloyal.',[failChoice('Require judicial evidence before dismissals.',{reform:1,legitimacy:1}),failChoice('Dismiss every governor named by two independent reports.',{autocracy:2,pressure:1}),failChoice('Let the Interior Ministry resolve its own personnel dispute.',{door:2,pressure:2})]),
      failEvent('19 March 1910','Saratov Province','The tax convoy',['A district has stopped remitting taxes. The governor sends collectors with a company of infantry after two previous teams were beaten.','Villages receive warning of the convoy days in advance and empty grain stores before it arrives. Men disappear into neighboring districts.','The state collects forty percent of the assessment at three times the normal administrative cost. The governor reports the operation a success.'],'“If every ruble requires a bayonet, the bayonet is more expensive than the ruble.”','Vladimir Kokovtsov','kokovtsov','Stop calling punitive collection revenue. Either reduce the assessment or restore local institutions people will actually deal with.',[failChoice('Reduce arrears and restore elected local tax boards.',{reform:1,legitimacy:1,economy:1}),failChoice('Seize livestock and land from villages in arrears.',{blood:2,autocracy:2,economy:-1}),failChoice('Write off the missing revenue quietly.',{door:2,economy:-2})]),
      failEvent('2 May 1910','Okhrana Headquarters','The conspiracy with no conspirators',['The Okhrana announces discovery of a revolutionary network inside the Ministry of Ways and Communications.','Sixteen engineers are arrested. Three confess after interrogation. Two confessions describe meetings held on dates when the accused were documented in Siberia.','The investigator asks for promotions before the discrepancies are resolved.'],'“A police service rewarded for plots will eventually become an industry producing plots.”','Pyotr Stolypin','stolypin','If you cannot punish false discovery, there will soon be no difference between security intelligence and court gossip with cells.',[failChoice('Create an independent review and release cases without corroboration.',{reform:1,legitimacy:1,blood:-1}),failChoice('Trust the service. Conspiracies are rarely neat.',{autocracy:2,blood:1}),failChoice('Transfer the suspects to military jurisdiction.',{military:2,blood:2})]),
      failEvent('18 June 1910','Kazan Military District','The governor keeps the regiment',['A governor refuses an order transferring an infantry regiment from his province. He argues unrest requires its presence.','The War Ministry says the regiment is needed for maneuvers elsewhere. The Interior Ministry supports the governor.','The colonel tells both ministries he will obey whichever order bears your personal signature.'],'“Centralization has reached perfection: nobody obeys the center unless the center writes personally.”','Grand Duke Nicholas Nikolaevich','nicholas','If every colonel needs your hand, you are not commanding an empire. You are a telegraph clerk with a crown.',[failChoice('Order the regiment transferred and rebuke the governor.',{military:1,autocracy:1}),failChoice('Leave the regiment and let governors retain emergency forces.',{autocracy:2,pressure:2}),failChoice('Delay until unrest subsides.',{door:2,pressure:1})]),
      failEvent('9 August 1910','Penza Province','The empty villages',['A census team reports three villages with populations far below tax rolls.','The peasants have not died. They have moved into forests, cities, neighboring estates and fictitious households to escape assessments and police supervision.','On paper the villages still exist. On the ground one contains a church, seven old women and a tax notice nailed to a door.'],'“The files are now more populous than the country.”','A census official','stolypin','People can hide from a state more easily than a state can admit they have hidden. If you continue governing the register, the register will become your only obedient subject.',[failChoice('Offer an amnesty for registration and reduce collective penalties.',{legitimacy:2,land:1}),failChoice('Criminalize unregistered movement and expand passport checks.',{autocracy:2,blood:1}),failChoice('Correct the census and leave the policy unchanged.',{door:1})]),
      failEvent('27 September 1910','Council of Ministers','The ministry arrests a ministry',['The Interior Ministry arrests two Finance officials for obstructing a security requisition.','Finance responds by freezing discretionary funds to the provincial police directorate involved.','The police search a Treasury office for evidence of sabotage. Treasury clerks lock the vault and call the Guard.','For ninety minutes, armed servants of the same Emperor face one another across a corridor.'],'“Majesty, we have achieved civil war in miniature and charged it to office expenses.”','Vladimir Kokovtsov','kokovtsov','Dismiss someone publicly. The precise victim matters less than proving ministries cannot conduct private wars under your seal.',[failChoice('Dismiss both responsible deputy ministers and publish the findings.',{reform:1,legitimacy:1}),failChoice('Back Interior; security requisitions take precedence.',{autocracy:2}),failChoice('Back Finance; no police action without appropriation.',{economy:1,pressure:1})]),
      failEvent('12 November 1910','Tambov','The procession nobody stops',['Ten thousand peasants march to the governor’s residence carrying icons and tax books. They do not chant revolutionary slogans.','Police request troops. The local commander refuses without written authorization because the last deployment produced an inquiry.','The governor sends a telegram marked MOST URGENT. It arrives beneath seventy-three other telegrams marked MOST URGENT.'],'“When everything is emergency, urgency becomes a filing category.”','Pyotr Stolypin','stolypin','Meet the petition before somebody teaches these people they need rifles to receive an answer.',[failChoice('Send a minister to hear the delegation and suspend disputed collections.',{legitimacy:2,reform:1}),failChoice('Authorize troops and disperse the crowd.',{blood:3,autocracy:2,legitimacy:-2}),failChoice('Order the governor to settle it locally.',{door:2,pressure:2})]),
      failEvent('4 December 1910','St Petersburg','The silence between telegraphs',['Provincial replies begin arriving late. Not dramatically late—hours, then a day.','Governors have learned that immediate obedience creates responsibility. Delay creates ambiguity. Every office now asks for clarification before acting and for written confirmation after acting.','The state has become cautious in exactly the way frightened animals become still.'],'“They obey you perfectly, Majesty. They simply wait until obedience no longer matters.”','Sergei Witte','witte','Fear has produced paralysis, not discipline. Unless officials are allowed to be wrong without being ruined, they will arrange always to be late.',[failChoice('Protect officials who act in good faith within written authority.',{reform:1,legitimacy:1}),failChoice('Punish delay as disobedience.',{autocracy:2,pressure:2}),failChoice('Issue a circular demanding initiative.',{door:2})]),
      failEvent('19 December 1910','Peterhof','The map loses voices',['A communications map in the palace marks districts that have failed to report for more than forty-eight hours.','There are too many pins to call it technical trouble. Some offices are overwhelmed. Some governors are withholding information. Some villages have cut lines.','A red pin is placed over a district two hundred miles from the capital. Nobody in the room knows who currently commands there.'],'“The sovereign has unlimited authority in every district that answers the telephone.”','Vladimir Kokovtsov','kokovtsov','Do not send an army merely because the line is silent. But understand what the silence means: the state is no longer sure where its orders become facts.',[failChoice('Send civilian inspection teams with amnesty powers.',{legitimacy:1,reform:1}),failChoice('Send military columns to restore communications.',{military:2,blood:2}),failChoice('Wait for the governors to report.',{door:3,pressure:2})]),
      failEvent('31 December 1910','Alexander Palace','All the Emperor commands',['At midnight you sign a decree extending emergency authority.',
        'The decree is absolute. Its language admits no uncertainty.',
        'By dawn it has been telegraphed to every provincial capital still answering.',
        'In one district the office is empty. In another the governor places it beneath three previous decrees awaiting implementation. In a third, a clerk stamps it RECEIVED and locks the door.',
        '<em>The Empire has never been governed more completely on paper.</em>'],'“Thou hast a name that thou livest, and art dead.”','Revelation 3:1','alexandra','Nicky, your signature is everywhere. I am frightened because I no longer know where you are.',[failChoice('Sign the last copy.',{autocracy:2,veil:2}),failChoice('Put down the pen.',{door:2,veil:2}),failChoice('Ask whether anyone is waiting outside.',{veil:3})])
    ]
  },

  'savior-uniform-early': {
    title:'THE SAVIOR IN UNIFORM', kicker:'THE ARMY PROTECTS THE CROWN FROM ITS OWNER',
    ending:{title:'THE SAVIOR IN UNIFORM',kicker:'THE PORTRAIT REMAINS',family:'FAILURE CASCADE',text:'The generals never abolish the monarchy. Abolition would be revolutionary. They preserve every symbol and remove every uncertainty. Your face remains above desks. Your birthday remains a holiday. Decrees still begin WE, NICHOLAS THE SECOND. You simply cease to be the person from whom they originate. Personalized rule reaches its final absurdity: the person is retained as decoration while the machinery rules in his name.'},
    events:[
      failEvent('6 January 1914','General Staff','The memorandum of national readiness',['The General Staff submits a paper arguing that industrial strikes, Balkan instability and alliance obligations require unified national planning.','Its proposal places rail coordination, war industries and selected provincial administrations under a permanent Defense Council chaired by the Chief of the General Staff.','The council would report to you. The cabinet would be informed.'],'“A war council before a war has a tendency to discover one.”','Sergei Sazonov','sazonov','Keep mobilization planning inside government. Once the generals coordinate factories, provinces and railways in peacetime, civilian ministers become visitors to their own departments.',[failChoice('Limit the council to military planning and require cabinet countersignature.',{reform:1,military:1}),failChoice('Approve the council for one year.',{military:2,autocracy:1}),failChoice('Approve it permanently. Efficiency matters more than jurisdiction.',{military:3,autocracy:2})]),
      failEvent('2 February 1914','Putilov Works','The army settles a strike',['A strike at Putilov threatens an artillery contract. The Interior Ministry wants negotiations. The War Ministry sends officers to “inspect fulfillment.”','The officers order managers to reopen essential shops under military protection. Workers are offered army pay to return.','Production resumes. The War Ministry reports success and asks why civilian authorities are necessary in strategic industry.'],'“They have solved a labor dispute by pretending the factory is already a front.”','Vladimir Kokovtsov','kokovtsov','Do not let emergency procurement become a labor code. You will wake up with half the industrial economy under officers who believe wages are a form of ammunition.',[failChoice('Return the plant to civilian mediation after the contract is secured.',{reform:1,economy:1}),failChoice('Authorize military supervision of strategic plants.',{military:3,autocracy:1}),failChoice('Leave the arrangement temporary and undefined.',{door:2,military:1})]),
      failEvent('11 March 1914','Kiev Military District','The governor asks the general',['The governor of Kiev delays enforcing a cabinet order until he receives the military district commander’s opinion.','When rebuked, he explains that the army controls more men, transport and reliable telegraphs than his civil administration.',
        'Three neighboring governors privately admit they have begun doing the same thing.'],'“Authority follows whoever can make Tuesday happen on Tuesday.”','Pyotr Stolypin','stolypin','Dismiss one governor for this. Not because consultation is treason, but because consultation has become permission.',[failChoice('Dismiss the governor and reaffirm cabinet supremacy.',{reform:1,legitimacy:1}),failChoice('Formalize joint civil-military provincial councils.',{military:2,autocracy:1}),failChoice('Ignore a practical accommodation.',{door:2,military:1})]),
      failEvent('9 April 1914','Winter Palace','The officers’ dinner',['At a Guards dinner, a celebrated general gives a toast to “the Army, the Dynasty, and the nation when politicians fail them.”','The room applauds. A newspaper prints the line. The Duma demands censure.','The general explains he was speaking hypothetically and receives forty-seven congratulatory telegrams from officers.'],'“A hypothetical coup is still useful reconnaissance.”','Sergei Sazonov','sazonov','Make him retire. If you merely scold him, every colonel will learn the permissible wording for sedition.',[failChoice('Retire the general with honors and no new command.',{military:-1,reform:1}),failChoice('Issue a reprimand and move on.',{door:1,pressure:1}),failChoice('Defend the army against partisan attacks.',{military:2,autocracy:1,legitimacy:-1})]),
      failEvent('3 May 1914','Council of Ministers','The empty chair',['The War Minister does not attend cabinet. He is meeting the Defense Council.',
        'The Finance Minister sends a deputy because military procurement officers have already committed funds he expected to debate.',
        'The cabinet completes its agenda anyway. Two decisions are later returned marked INCOMPATIBLE WITH NATIONAL READINESS.'],'“Majesty, your ministers have become advisory to your advisers.”','Vladimir Kokovtsov','kokovtsov','Either abolish the Defense Council or admit it is the government. The current arrangement merely lets both spend money while neither accepts blame.',[failChoice('Abolish the council and return authority to cabinet.',{reform:2,military:-2}),failChoice('Make the council formally superior on defense matters.',{military:3,autocracy:2}),failChoice('Order better coordination without changing jurisdiction.',{door:2})]),
      failEvent('31 May 1914','Tsarskoye Selo','The audience of seven uniforms',['Seven generals request a collective audience. They warn that party politics, strikes and foreign encirclement have created a national emergency before formal war exists.','They propose a temporary “National Readiness Ministry” drawn from army, bureaucracy and patriotic organizations.','They insist it would strengthen your personal authority. Every page of the proposal reduces the number of matters requiring your decision.'],'“They want an autocracy efficient enough to function without the autocrat.”','Alexandra Feodorovna','alexandra','Nicky, they praise you too much. Men who love the sovereign do not usually arrive with a document explaining how rarely he must be consulted.',[failChoice('Reject the proposal and forbid collective military petitions.',{autocracy:1,military:-1,pressure:2}),failChoice('Appoint the ministry for six months.',{military:3,autocracy:2}),failChoice('Ask them to revise the proposal.',{door:2,pressure:2})]),
      failEvent('16 June 1914','St Petersburg','The newspaper that disappears',['A liberal newspaper publishes extracts from the National Readiness proposal. The edition is seized before noon.','The Interior Minister says he did not order the seizure. The military censorship office says no civilian authorization was required because the document concerned defense.',
        'The editor is released that evening after signing a statement whose legal basis nobody can identify.'],'“Censorship has become autonomous before the country has mobilized.”','Sergei Sazonov','sazonov','If the army can define its own secrets, seize its own newspapers and release its own prisoners, it already possesses a small sovereign state inside yours.',[failChoice('Abolish peacetime military censorship outside barracks.',{reform:1,legitimacy:1}),failChoice('Ratify the seizure after the fact.',{military:2,autocracy:1}),failChoice('Leave the dispute to the two ministries.',{door:2,pressure:1})]),
      failEvent('24 June 1914','Peterhof','The decree already typed',['A decree establishing emergency national administration is placed before you.',
        'Your name is already typed beneath it.',
        'The aide apologizes: the General Staff prepared copies in advance to save time if Your Majesty approved.',
        'There are distribution envelopes addressed to governors beside the unsigned original. Several have wax seals already warmed.'],'“They are no longer predicting your decision. They are scheduling it.”','Alexandra Feodorovna','alexandra','Do not sign because they expect you to. Do not refuse merely because they expect you to. Look at the envelopes, Nicky. Someone has begun governing the hour after your consent.',[failChoice('Tear up the decree and dismiss the officers responsible.',{military:-2,autocracy:1,pressure:3}),failChoice('Sign it. The crisis is real even if the procedure is ugly.',{military:3,autocracy:2}),failChoice('Postpone signature until after the weekend.',{door:3,pressure:2})]),
      failEvent('27 June 1914','St Petersburg','The night before Sarajevo',['Military police occupy the central telegraph exchange during an exercise. The exercise was scheduled months ago.','When the Interior Ministry asks them to leave, the commander requests written proof that civilian communications take precedence during national readiness conditions.',
        'The proof exists. He asks for authentication. The authentication office is closed for the night.'],'“A rehearsal repeated often enough becomes government.”','Grand Duke Nicholas Nikolaevich','nicholas','This is no longer about efficiency. Your officers have learned that paperwork can defeat civilian authority without disobeying a single order.',[failChoice('Order the telegraph exchange returned immediately.',{reform:1,military:-1}),failChoice('Allow the exercise to conclude at dawn.',{door:1,military:1}),failChoice('Place communications permanently under the Defense Council.',{military:3,autocracy:2})]),
      failEvent('28 June 1914','Peterhof','The Archduke is dead',['The Sarajevo telegram arrives at noon.',
        'Before Sazonov reaches Peterhof, the Defense Council has convened. Before the cabinet convenes, military districts receive preparatory notices. Before you speak, newspapers report that “the Government” has taken measures.',
        'A general enters with a folder and says, very gently, that national unity requires Your Majesty to avoid contradictory public statements.',
        'Your portrait hangs behind him.'],'“The king is not he who wears the crown, but he who commands what happens next.”','Marginal note, author unknown','nicholas','Majesty, the army does not intend to remove you. That is why this may be permanent.',[failChoice('Demand the folder and read every order issued in your name.',{autocracy:1,pressure:2}),failChoice('Tell them to proceed and keep you informed.',{door:2,military:2}),failChoice('Ask whether the cabinet has been told.',{door:2,veil:1})])
    ]
  }
};

function oatrFailRouteTrigger() {
  const snapshot = { ...state.scores, flags: state.flags, history: state.history };
  return OATR_FAIL_ROUTE_DEFS.find(f => f.originalTest(snapshot));
}

function oatrStartFailRoute(def) {
  state.failEnding = null;
  state.failRoute = { id: def.id, step: 0, pending: null };
  saveState();
  renderFailRoute();
}

function oatrApplyFailEffects(effects) {
  Object.entries(effects || {}).forEach(([key, value]) => {
    if (key === 'flags') value.forEach(flag => state.flags.add(flag));
    else if (SCORE_KEYS.includes(key)) state.scores[key] += value;
  });
}

function oatrChooseFailRoute(choiceIndex) {
  const route = OATR_FAIL_ROUTES[state.failRoute.id];
  const ev = route.events[state.failRoute.step];
  const [label, effects] = ev.choices[choiceIndex];
  oatrApplyFailEffects(effects);
  state.history.push({ id:`F-${state.failRoute.id}-${state.failRoute.step+1}`, date:ev.date, title:ev.title, choiceIndex, label });
  state.failRoute.pending = { label, advice: ev.advice, advisor: ev.advisor };
  saveState();
  renderFailRoute();
}

function oatrContinueFailRoute() {
  state.failRoute.pending = null;
  state.failRoute.step += 1;
  saveState();
  renderFailRoute();
}

function renderFailRouteEnding(route) {
  const ending = route.ending;
  document.body.dataset.failDepth = '10';
  document.querySelector('#app').innerHTML = `
    <main class="ending-page ending-fail-state fail-route-ending">
      <div class="ornament">☦</div>
      <p class="eyebrow">TEN DECISIONS AFTER THE SETTLEMENT FAILED</p>
      <h1>${ending.title}</h1>
      <p class="ending-kicker">${ending.kicker}</p>
      <div class="rule"><span>◆</span></div>
      <p class="ending-family">${ending.family}</p>
      <p class="ending-copy">${ending.text}</p>
      <div class="ending-actions"><button class="restart" data-restart>BEGIN AGAIN</button><button class="restart" data-review>REVIEW THE REIGN</button></div>
    </main>`;
  document.querySelector('[data-restart]').onclick = resetCampaign;
  document.querySelector('[data-review]').onclick = renderReview;
}

function renderFailRoute() {
  if (!state.failRoute) return render();
  const route = OATR_FAIL_ROUTES[state.failRoute.id];
  if (!route) { state.failRoute = null; saveState(); return render(); }
  if (state.failRoute.step >= route.events.length) return renderFailRouteEnding(route);
  const ev = route.events[state.failRoute.step];
  const n = state.failRoute.step + 1;
  document.body.dataset.failDepth = String(n);
  const pending = state.failRoute.pending;
  document.querySelector('#app').innerHTML = `
    <div class="page-shell fail-route-shell">
      <header>
        <div class="seal" aria-hidden="true"><span>☦</span><b>Н II</b></div>
        <div class="masthead"><p class="russian-title">FAILURE CASCADE · ${route.title}</p><h1>OF ALL THE RUSSIAS</h1><p class="motto">${route.kicker}</p></div>
        <div class="year"><b>${n}</b><span>—</span><small>10</small><button class="restart-campaign" data-restart-campaign>↺ RESTART</button></div>
      </header>
      <div class="campaign-progress"><span style="width:${n*10}%"></span></div>
      <main>
        <aside class="folio"><p>CASCADE</p><strong>${String(n).padStart(2,'0')}</strong><span>OF 10</span><div class="vertical-rule"></div><p class="nine-years">NO ROAD<br><b>BACK</b></p></aside>
        <article>
          <div class="dateline"><span>${ev.date}</span><span class="cross">✣</span><span>${ev.place}</span></div>
          <p class="kicker">${route.title}</p>
          <h2>${ev.title}</h2>
          <section class="dispatch">${ev.body.map(p=>`<p>${p}</p>`).join('')}</section>
          <blockquote><p>${ev.quote}</p><cite>${ev.speaker}</cite></blockquote>
          <div class="question"><span>WHAT DO YOU DO?</span></div>
          <ol class="choices">${ev.choices.map(([label],i)=>`<li><button data-fail-choice="${i}"><span>${String.fromCharCode(65+i)}</span><p>${label}</p><b>→</b></button></li>`).join('')}</ol>
        </article>
        <aside class="dossier"><p class="hand">Nicky</p><h3>НИКОЛАЙ II</h3><p>${route.kicker}</p><div class="stamp">КАСКАД<br><b>${String(n).padStart(2,'0')} / 10</b></div><small>The choices remain yours. The settlement does not.</small></aside>
      </main>
      <footer><span>☦</span><p>ORDER</p><i>◆</i><p>MEMORY</p><i>◆</i><p>CONSEQUENCE</p><span>☦</span></footer>
      ${pending ? `<div class="advisor-scrim" role="dialog" aria-modal="true"><section class="advisor-card"><p class="advisor-label">PRIVATE ADVICE · ${ev.date}</p><div class="advisor-layout"><div class="advisor-portrait"><span>${(OATR_ADVISORS[pending.advisor]?.mark)||'☦'}</span></div><div class="advisor-copy"><p class="handwritten">There is still advice. There is no longer an exit.</p><h2>${(OATR_ADVISORS[pending.advisor]?.name)||'THE PALACE'}</h2><p class="advisor-role">${(OATR_ADVISORS[pending.advisor]?.role)||route.title}</p><blockquote>${pending.advice}</blockquote><p class="decision-echo">You ordered: “${pending.label}”</p><button data-fail-continue>${n===10?'SEE WHAT REMAINS':'CONTINUE'} <span>→</span></button></div></div></section></div>` : ''}
    </div>`;
  document.querySelectorAll('[data-fail-choice]').forEach(b=>b.onclick=()=>oatrChooseFailRoute(Number(b.dataset.failChoice)));
  const c=document.querySelector('[data-fail-continue]'); if(c)c.onclick=oatrContinueFailRoute;
  const r=document.querySelector('[data-restart-campaign]'); if(r)r.onclick=resetCampaign;
}

// Replace the fail-screen wrapper with a route trigger. The underlying normal apply still
// performs the ordinary choice, history, score, advisor and save operations.
apply = function(choiceIndex) {
  OATR_BASE_APPLY_FOR_FAILURES(choiceIndex);
  if (state.failRoute) return renderFailRoute();
  const fail = oatrFailRouteTrigger();
  if (fail) oatrStartFailRoute(fail);
};

// Persist cascades across refreshes and suppress the normal campaign UI once one begins.
const OATR_RENDER_BEFORE_FAIL_ROUTES = render;
render = function() {
  if (state.failRoute) return renderFailRoute();
  return OATR_RENDER_BEFORE_FAIL_ROUTES();
};

if (state.failRoute) renderFailRoute();
