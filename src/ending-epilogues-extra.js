/* Complete the epilogue suite for secret/catch-all endings and guarantee no ending loses its base summary. */

OATR_ENDING_EXPANSIONS['eschaton'] = [
  'You reached this ending by solving Russia’s weaknesses in exactly the wrong order. You ended the Japanese war before defeat could force a wider settlement. You kept Stolypin alive long enough to modernize credit, industry, transport and the tax base, then denied him the political institutions he believed must govern the stronger state. You gave the new wealth to an army increasingly permitted to act as the most competent organ of government. Finally, when civilian authority cracked in July, you chose the one counselor who had consistently warned against war—and the army killed him.',
  'Rasputin’s murder does not create the military state. It reveals that one already exists. The Duma cannot compel arrests. Ministers resign because orders require generals willing to execute them. You dissolve the chamber and formalize what the crisis has made true: mobilization becomes government. Factories become quotas. Governors become district auxiliaries. Railways cease carrying the economy and begin carrying the calendar toward an appointment nobody remembers making.',
  'The war then outlives its reasons. France changes governments; Germany changes constitutions; Austria-Hungary comes apart and its successor authorities inherit sectors of the front because nobody has the administrative courage to stop feeding them. Russia itself becomes less a country at war than a continental replacement system. Regimental numbers survive the men. Orphanages are assigned patron units. Boys learn their fathers’ battalion before they learn their fathers’ faces.',
  'By the middle 1920s diplomacy has become archaeology. Original war aims survive in copied memoranda addressed to ministries that no longer exist. Mobilization day counts replace dates in some districts. Clerks receive forms whose originating offices cannot be found. Officers report trenches occupied by formations bearing their own insignia and casualty rolls from years that have not happened in the correct order. Nobody can prove these stories. Nobody has enough living surveyors left to disprove them.',
  'Europe has not been conquered. It has been converted. Fields that once grew rye, wheat and sunflowers grow wire, crosses and rust. The demographic tables become indecent to print. Church bells ring in villages without congregations when offensives begin. In 1933 a Russian battery west of Minsk receives an order to fire. Minsk has been empty for six years. The crew loads the gun because loading the gun is the last surviving form of administration.',
  'You wanted a strong Russia without the political weakness that came with bargaining. You built strength until no civilian institution could command it. The machine did not overthrow the sovereign. It simply ceased requiring one. Somewhere in the advisor window Rasputin is still dead, still speaking, still refusing to tell you whom the Psalm condemns. Europe has not been destroyed by war. Europe has become war. There shall be no fourth.'
];

const OATR_EXPANDED_PARAGRAPHS_BEFORE_EXTRA = oatrExpandedEndingParagraphs;
oatrExpandedEndingParagraphs = function(ending) {
  const accounting = oatrReignAccounting();
  const specific = OATR_ENDING_EXPANSIONS[ending.id] || [];
  const intro = accounting.length ? [accounting.slice(0, 5).join(' ')] : [];
  if (specific.length) return [...intro, ...specific];
  return [...intro, ending.text];
};
