/* Wikimedia Commons tooltip art pass.
   This file intentionally loads after marginalia.js and replaces generic map/reused images
   with subject-specific archival photographs, paintings, propaganda, newspapers and maps. */

const OATR_MARGINALIA_ASSETS = {
  jews: '1905 2fnl Velikoe v malom i antikhrist.jpg',
  witte: 'Sergey Yulievich Vitte.jpg',
  stolypin: 'Stolypin by Repin.jpg',
  rasputin: 'Grigori Rasputin 1916.jpg',
  alexandra: 'Alexandra Fyodorovna LOC 01137u.jpg',
  'bloody-sunday': 'Shooting of workers on Voskresenskaya street in 1905.jpg',
  tsushima: 'Battle of Tsushima, 1905 by Tōjō Shōtarō.jpg',
  potemkin: 'Potemkin in Constantza.JPG',
  duma: 'AperturaDeLaDumaEnLaSalaDelTrono19060510.png',
  finland: 'Hakaniemen mellakka 1906.jpg',
  poland: 'Pochód narodowy w Warszawie dn. 5 listopada 1905 r.jpg',
  serbia: 'King Peter I of serbia - coronation.jpg',
  austria: 'Imperatoru Francisc Joseph.jpg',
  germany: 'Wilhelm II of Germany - 1907.jpg',
  france: 'Nicholas II and Émile Loubet meeting (1901).jpg',
  britain: 'John Bull and his Friends 1900.jpg',
  japan: "Crowds lining the street as the procession of carriages carrying Admiral Togo, naval officers, and government officials passes through a triumphial arch during Togo's official visit, Oct., LCCN2005678641.jpg",
  ottomans: 'Abdul Hamid 2.jpg',
  cossacks: 'Cossacks of the Russian Empire.jpg',
  okhrana: 'Okhranka group photo.jpg',
  'black-hundreds': 'Chernosotenzy v odessa.jpg',
  revolution: 'Revolution of 1905.jpg',
  peasants: 'Крестьянская-семья Беломорье.jpg',
  intelligentsia: 'Митинг у Петербургского университета (1905).jpg',
  liberals: 'Zemskaya deputatsiya.jpg',
  zemstvo: 'Zemskaya deputatsiya.jpg',
  church: 'Hopewood, Sam - Eine religiöse Prozession auf dem Roten Platz, Moskau (Zeno Fotografie).jpg',
  bureaucracy: 'Ilya repin, seduta cerimoniale del consiglio di stato il 7 maggio 1901, nel centenario della sua fondazione, 1903.JPG',
  petrograd: 'Russischer Photograph um 1900 - Blick auf den Fontanka-Fluss zwischen der Aničkov- und der Semenovskij-Brücke. St. Petersburg (Zeno Fotografie).jpg',
  moscow: 'Krasnaya Ploshad-1900-N.jpg',
  balkans: 'Bałkany 1912.svg',
  strikes: 'Совет рабочих депутатов Петербурга (1905).jpg',
  pogrom: 'Pogrom_of_Jews_in_Kiev_1905.jpg',
  emergency: 'Ilya repin, seduta cerimoniale del consiglio di stato il 7 maggio 1901, nel centenario della sua fondazione, 1903.JPG',
  autonomy: 'Russian Empire 1914, modern borders.svg',
  constitution: 'Russia State Duma 1906.svg',
  russification: 'Russian Empire 1914, modern borders.svg',
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
