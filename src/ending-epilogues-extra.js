/* Complete the epilogue suite for secret/catch-all endings and guarantee no ending loses its base summary. */

OATR_ENDING_EXPANSIONS['eschaton'] = [
  'You reached this ending by solving Russia’s weaknesses in exactly the wrong order. You ended the Japanese war before defeat could force a wider settlement. You kept Stolypin alive long enough to modernize credit, industry, transport and the tax base, then denied him the political institutions he believed must govern the stronger state. You gave the new wealth to an army increasingly permitted to act as the most competent organ of government. Finally, when civilian authority cracked in July, you chose the one counselor who had consistently warned against war—and the army killed him.',
  'Rasputin’s murder does not create the military state. It reveals that one already exists. The Duma cannot compel arrests. Ministers resign because orders require generals willing to execute them. You dissolve the chamber and formalize what the crisis has made true: mobilization becomes government. Factories become quotas. Governors become district auxiliaries. Railways cease carrying the economy and begin carrying the calendar toward an appointment nobody remembers making.',
  'The war then outlives its reasons. France changes governments; Germany changes constitutions; Austria-Hungary comes apart and its successor authorities inherit sectors of the front because nobody has the administrative courage to stop feeding them. Russia itself becomes less a country at war than a continental replacement system. Regimental numbers survive the men. Orphanages are assigned patron units. Boys learn their fathers’ battalion before they learn their fathers’ faces.',
  'By the middle 1920s diplomacy has become archaeology. Original war aims survive in copied memoranda addressed to ministries that no longer exist. Mobilization day counts replace dates in some districts. Clerks receive forms whose originating offices cannot be found. Officers report trenches occupied by formations bearing their own insignia and casualty rolls from years that have not happened in the correct order. Nobody can prove these stories. Nobody has enough living surveyors left to disprove them.',
  'Europe has not been conquered. It has been converted. Fields that once grew rye, wheat and sunflowers grow wire, crosses and rust. The demographic tables become indecent to print. Church bells ring in villages without congregations when offensives begin. In 1933 a Russian battery west of Minsk receives an order to fire. Minsk has been empty for six years. The crew loads the gun because loading the gun is the last surviving form of administration.',
  'You wanted a strong Russia without the political weakness that came with bargaining. You built strength until no civilian institution could command it. The machine did not overthrow the sovereign. It simply ceased requiring one. Somewhere in the advisor window Rasputin is still dead, still speaking, still refusing to tell you whom the Psalm condemns. Europe has not been destroyed by war. Europe has become war. There shall be no fourth.'
];

/* No 70-question campaign is allowed to end on an intentionally generic card. */
const OATR_GENERIC_ENDING_IDS = new Set(['default-war', 'default-peace']);
for (let i = OATR_ENDINGS.length - 1; i >= 0; i -= 1) {
  if (OATR_GENERIC_ENDING_IDS.has(OATR_ENDINGS[i].id)) OATR_ENDINGS.splice(i, 1);
}
delete OATR_ENDING_EXPANSIONS['default-war'];
delete OATR_ENDING_EXPANSIONS['default-peace'];

/* Recast the Black Hundred outcome as the victorious nightmare: Russia wins the European war,
   acquires the old imperial dream, and discovers that victory has made reaction permanent. */
const OATR_BLACK_HUNDRED_ENDING = OATR_ENDINGS.find(e => e.id === 'black-hundred');
if (OATR_BLACK_HUNDRED_ENDING) {
  OATR_BLACK_HUNDRED_ENDING.family = 'VICTORIOUS · REACTIONARY';
  OATR_BLACK_HUNDRED_ENDING.kicker = 'THE CROSS OVER CONSTANTINOPLE · THE KNOUT AT HOME';
  OATR_BLACK_HUNDRED_ENDING.test = s => s.flags.has('war1914') && s.autocracy >= 22 && s.blood >= 18;
  OATR_BLACK_HUNDRED_ENDING.text = 'You enter the Great War having spent nine years teaching the state that coercion is patriotism, that opposition is contamination, and that every emergency proves the need for a harder hand. The state survives the test. More than survives it. Russia wins—and every instrument that made victory possible comes home expecting to govern.';
}

OATR_ENDING_EXPANSIONS['black-hundred'] = [
  'You did not merely preserve autocracy. You surrounded it with men and institutions that believed the Crown was most sacred when it was least restrained. Black Hundred leagues, loyalist newspapers, police auxiliaries, governors, parish activists and officers learned that violence committed for Orthodoxy, Autocracy and Nationality belonged to a different moral category from violence committed against them. You repeatedly rewarded that distinction until it became part of the state.',
  'When the European war comes, this Russia is ugly but brutally coherent. Opposition deputies are watched, then silenced. Strikes become wartime sabotage. Requisitioning is enforced by troops who have already practiced domestic pacification. Minority districts are treated as security problems before they become political ones. The Duma continues to meet because closing it would look weak; everyone understands which speeches are permitted to survive the night.',
  'And the machine wins. The German armies discover that Russia can absorb losses no parliamentary government would tolerate and replace them with men no newspaper is permitted to count honestly. Austria-Hungary breaks. Russian armies cross Galicia and the Carpathians. The Ottoman Empire is driven from the Straits. Constantinople falls beneath Russian guns and is solemnly renamed Tsargrad in newspapers printed beside casualty lists whose totals have been administratively improved.',
  'Victory makes the regime worse because victory vindicates every method. The wartime censorship bureau becomes permanent. Internal passports tighten. Veterans are settled in troublesome districts. Emergency military courts continue hearing political cases because the emergency has become a theory of government. Black Hundred organizations that once served the state now police the state for insufficient conviction. Governors compete in loyalty. Bishops discover that patriotic sermons are easier to begin than to stop. The monarchy has won the argument so completely that nobody remains capable of telling it when the argument is over.',
  'Russia is larger, feared and triumphant. It is also a shithole with victory arches. Petrograd is under recurring states of emergency. Warsaw is pacified every few years. The Caucasus is administered as a security district. The peasantry has medals, debts and sons missing from family icons. The industrial cities produce guns, locomotives and men who know not to speak loudly in cafés. Abroad, diplomats bow to the empire that broke Germany and took the Straits. At home, the empire behaves like a conquered country.',
  'On Easter morning 1921, the bells of Hagia Sophia ring beneath an Orthodox cross.<br><br>You have achieved what Russian emperors dreamed of for centuries.<br><br>Martial law in Petrograd.'
];

/* With the explicit generic endings removed, select the closest substantive Russia if a player
   misses every narrow named threshold. The fallback is still a real political settlement, not an
   "and then history continues" screen. */
const OATR_PICK_ENDING_BEFORE_NO_GENERIC = pickEnding;
pickEnding = function() {
  const direct = OATR_PICK_ENDING_BEFORE_NO_GENERIC();
  if (direct) return direct;

  const s = state.scores;
  const byId = id => OATR_ENDINGS.find(e => e.id === id);

  if (state.flags.has('war1914')) {
    if (s.blood >= 14 || s.autocracy >= 20) return byId('black-hundred') || byId('autocracy-works');
    if (s.reform >= 14 && s.land >= 8 && s.legitimacy >= 8) return byId('stolypin-right') || byId('autocracy-works');
    return byId('autocracy-works') || byId('canon');
  }

  if (state.flags.has('peace1914')) {
    if (s.reform >= 10 || s.legitimacy >= 8) return byId('constitutional-peace') || byId('elephant-cancer');
    return byId('elephant-cancer') || byId('constitutional-peace');
  }

  return byId('elephant-cancer') || OATR_ENDINGS[0];
};

const OATR_EXPANDED_PARAGRAPHS_BEFORE_EXTRA = oatrExpandedEndingParagraphs;
oatrExpandedEndingParagraphs = function(ending) {
  const accounting = oatrReignAccounting();
  const specific = OATR_ENDING_EXPANSIONS[ending.id] || [];
  const intro = accounting.length ? [accounting.slice(0, 5).join(' ')] : [];
  if (specific.length) return [...intro, ...specific];
  return [...intro, ending.text];
};
