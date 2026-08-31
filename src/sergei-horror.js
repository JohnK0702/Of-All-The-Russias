/* Grand Duke Sergei assassination interlude.
   This keeps the 17 February 1905 historical beat fixed, but turns it into a one-option
   rupture whose post-decision advice depends on Nicholas's Bloody Sunday response. */

OATR_BRANCHING.questionVariants[3] = [
  {
    when: () => true,
    title: 'The carriage in the Kremlin',
    text: {
      body: [
        'A sound reaches the palace before the telegram does. Not literally. You will remember it that way anyway.',
        'Grand Duke Sergei Alexandrovich has been killed inside the Kremlin. Ivan Kalyayev waited for his carriage and threw the bomb at close range. Your uncle has been reduced from a man into pieces, relics, cloth, snow and things the attendants will spend the afternoon refusing to name.',
        'The report is very careful with nouns. The report is less careful with the fact that his wife, Ella, went out into the courtyard afterward and helped gather what could be gathered.',
        'For several minutes the machinery of the Russian Empire produces no policy at all.',
        '<em>You stare at the page.</em>'
      ],
      quote: '“And they cried with a loud voice, saying, How long, O Lord, holy and true, dost thou not judge and avenge our blood?”',
      speaker: 'Revelation 6:10'
    }
  }
];

OATR_BRANCHING.choiceOverrides[3] = () => [
  ['Oh fuck.', { veil: 2, blood: 1, pressure: 2, flags: ['sergeiAssassinated', 'sergeiIcon'] }]
];

/* The normal advisor renderer is deliberately replaced after main.js loads. */
function sergeiIconAdvice() {
  const orderedBlood = state.flags.has('bloodySunday');

  if (orderedBlood) {
    return {
      title: 'СЕРГЕЙ',
      subtitle: 'THE MARTYR WHO WILL NOT STAY DEAD',
      verse: '“For they have shed the blood of saints and prophets, and thou hast given them blood to drink; for they are worthy.”',
      scripture: 'REVELATION 16:6',
      message: [
        'Nicky.',
        'Do not become tender now.',
        'You taught them in January that the Crown still possesses teeth. They answered with a bomb and put me into the snow of the Kremlin.',
        'Do you understand what mercy looks like from inside the grave? It looks like hesitation. It looks like a door left open for the next murderer.',
        'They carried icons when they came to you. They carried dynamite when they came to me. The difference is not innocence. It is time.',
        'You have already crossed the river. Do not stand in the middle of it apologizing for the water.',
        'Kill them all, Nicky.',
        'Kill the bomb-throwers. Kill the men who hide them. Kill the men who print little poems about their courage. Tear the disease out by the root and burn the root and salt the fucking earth where it grew.',
        'If you are going to be Caesar, then be Caesar. If you are going to be weak, then at least have the decency not to use my blood as decoration on your weakness.'
      ]
    };
  }

  return {
    title: 'СЕРГЕЙ',
    subtitle: 'THE ICON ACCUSES',
    verse: '“Smite the shepherd, and the sheep shall be scattered.”',
    scripture: 'ZECHARIAH 13:7',
    message: [
      'Nicky.',
      'You wanted them to love you.',
      'You listened in January. You opened the door because you believed a father should hear his children. Very Christian. Very gentle. Very weak.',
      'Did you imagine the bomb would notice?',
      'The men who hate the throne did not look upon your mercy and become ashamed. They looked upon it and learned that pressure works.',
      'Now I am meat in the snow and Petersburg will congratulate you for your restraint.',
      'You mistake reluctance to punish for innocence. You mistake being loved by your family for being capable of ruling people who have decided history is permission to murder.',
      'A crown is not a halo, Nicky. A halo belongs to the dead.',
      'You may have mine if you like.'
    ]
  };
}

const OATR_BASE_RENDER_ADVISOR = renderAdvisor;
renderAdvisor = function(question) {
  if (question.id !== 3 || !state.flags.has('sergeiIcon')) return OATR_BASE_RENDER_ADVISOR(question);

  const vision = sergeiIconAdvice();
  return `<div class="advisor-scrim sergei-scrim" role="dialog" aria-modal="true" aria-labelledby="sergei-icon-name">
    <section class="advisor-card sergei-card">
      <p class="advisor-label">THERE IS NO MEMORANDUM · 17 FEBRUARY 1905</p>
      <div class="sergei-layout">
        <div class="sergei-icon" aria-label="A damaged devotional icon of Grand Duke Sergei">
          <div class="sergei-halo">С.А.</div>
          <div class="sergei-face"><span></span><i></i><b></b></div>
          <div class="icon-wound one"></div>
          <div class="icon-wound two"></div>
          <div class="icon-wound three"></div>
          <p>СЕРГЕЙ<br>МУЧЕНИК</p>
        </div>
        <div class="advisor-copy sergei-copy">
          <p class="handwritten">You do not remember falling asleep.</p>
          <h2 id="sergei-icon-name">${vision.title}</h2>
          <p class="advisor-role">${vision.subtitle}</p>
          <blockquote class="sergei-voice">${vision.message.map(p => `<p>${p}</p>`).join('')}</blockquote>
          <p class="sergei-verse">${vision.verse}<br><small>${vision.scripture}</small></p>
          <p class="fate-note">There will be no official record of this conversation.</p>
          <button data-continue>WAKE UP <span>→</span></button>
        </div>
      </div>
    </section>
  </div>`;
};
