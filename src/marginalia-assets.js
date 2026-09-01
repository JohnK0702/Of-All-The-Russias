/* Wikimedia Commons tooltip art pass.
   This file intentionally loads after marginalia.js and replaces generic map/reused images
   with subject-specific archival photographs, paintings, propaganda, newspapers and cartoons.

   Selection rule: prefer a period object that says something about the subject — a caricature,
   propaganda sheet, painting, riot photograph, state ceremony or contemporary political image —
   rather than merely showing a person's face. */

const OATR_MARGINALIA_ASSETS = {
  // Prejudice / political culture
  jews: '1905 2fnl Velikoe v malom i antikhrist.jpg',
  pogrom: '1904 Russian Tsar-Stop your cruel oppression of the Jews-LOC hh0145s.jpg',
  'black-hundreds': 'Postcard Medal “honoring” the Black Hundred, ca. 1905.jpg',
  okhrana: 'Okhranka group photo.jpg',
  emergency: 'Бодянский 1906.jpg',

  // People — use caricature or contextual imagery where Commons has something stronger than a headshot.
  witte: 'Sergei Witte (cartoon).jpg',
  stolypin: 'Stolypin by Repin.jpg',
  rasputin: 'Grigory Rasputin with his followers.jpg',
  alexandra: 'Family in 1913.jpg',

  // 1905
  'bloody-sunday': 'Shooting of workers on Voskresenskaya street in 1905.jpg',
  tsushima: 'Battle of Tsushima, 1905 by Tōjō Shōtarō.jpg',
  potemkin: 'Potemkin mutiny newspaper cartoon japanese militaryman makes jokes on russians fighting each other.jpg',
  duma: 'Opening of Duma.jpg',
  revolution: '1905Репин.jpg',
  strikes: 'Совет рабочих депутатов Петербурга (1905).jpg',
  intelligentsia: 'Митинг у Петербургского университета (1905).jpg',
  liberals: 'Zemskaya deputatsiya.jpg',
  zemstvo: 'Zemskaya deputatsiya.jpg',

  // Borderlands and the imperial problem
  finland: 'Hyökkäys - Edvard Isto, 1899.jpg',
  poland: 'Pochód narodowy w Warszawie dn. 5 listopada 1905 r.jpg',
  autonomy: 'Hyökkäys - Edvard Isto, 1899.jpg',
  russification: 'Hyökkäys - Edvard Isto, 1899.jpg',

  // Foreign policy — contemporary political images beat generic maps.
  serbia: 'King Peter I of serbia - coronation.jpg',
  austria: 'Le Petit Journal Balkan Crisis (1908).jpg',
  germany: 'Wilhelm II of Germany - 1907.jpg',
  france: 'Nicholas II and Émile Loubet meeting (1901).jpg',
  britain: 'John Bull and his Friends 1900.jpg',
  japan: "Crowds lining the street as the procession of carriages carrying Admiral Togo, naval officers, and government officials passes through a triumphial arch during Togo's official visit, Oct., LCCN2005678641.jpg",
  ottomans: 'Russian view on the Balkan problem 1908.jpg',
  balkans: 'Russian view on the Balkan problem 1908.jpg',

  // State / society
  cossacks: 'Cossacks of the Russian Empire.jpg',
  peasants: 'Крестьянская-семья Беломорье.jpg',
  church: 'Hopewood, Sam - Eine religiöse Prozession auf dem Roten Platz, Moskau (Zeno Fotografie).jpg',
  bureaucracy: 'Ilya Repin - Ceremonial Sitting of the State Council on 7 May 1901 Marking the Centenary of its Foundation - Google Art Project.jpg',
  petrograd: 'Nevskii prospect and Gostinii dvor.jpg',
  moscow: 'Barricades.jpg',
  constitution: 'Opening of Duma.jpg',
  army: 'Grand Duke Nicholas Nikolaevich the Younger (portrait).jpg',
  mobilization: 'Русские солдаты перед отправкой на Первую мировую войну.jpg'
};

function oatrCommonsFile(filename) {
  return `https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent(filename)}`;
}

function oatrInstallMarginaliaAssets() {
  if (typeof OATR_MARGINALIA === 'undefined') return;
  OATR_MARGINALIA.forEach(entry => {
    const file = OATR_MARGINALIA_ASSETS[entry.id];
    if (file) entry.image = oatrCommonsFile(file);
  });

  /* marginalia.js may already have decorated the currently visible question. Refresh those
     images immediately; future questions will use the overridden entry.image automatically. */
  if (typeof document !== 'undefined' && document.querySelectorAll) {
    OATR_MARGINALIA.forEach(entry => {
      const file = OATR_MARGINALIA_ASSETS[entry.id];
      if (!file) return;
      document.querySelectorAll(`.marginalia-${entry.id} .marginalia-tooltip img`).forEach(img => {
        img.src = oatrCommonsFile(file);
      });
    });
  }
}

oatrInstallMarginaliaAssets();
if (typeof window !== 'undefined' && typeof window.addEventListener === 'function') {
  window.addEventListener('DOMContentLoaded', oatrInstallMarginaliaAssets);
}
