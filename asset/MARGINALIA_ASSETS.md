# Marginalia Tooltip Asset Scrape

This is the source ledger for `src/marginalia-assets.js`. The tooltip system prefers period photographs, paintings, newspapers, propaganda, maps and other archival material from Wikimedia Commons. Runtime uses `Special:Redirect/file/...` URLs so individual images can be swapped without editing event prose.

The goal is that a hover feels like Nicholas has pulled a clipping, photograph, police file or postcard from the imperial archive rather than receiving a generic encyclopedia card.

## Current tooltip set

- **Jews / Nicholas's antisemitic prejudice** — `File:1905 2fnl Velikoe v malom i antikhrist.jpg` — Imperial Russian antisemitic publication, 1905.
- **Sergei Witte** — `File:Sergey Yulievich Vitte.jpg` — 1905–06 portrait, public domain.
- **Pyotr Stolypin** — `File:Stolypin by Repin.jpg` — Repin portrait.
- **Grigori Rasputin** — `File:Grigori Rasputin 1916.jpg`.
- **Alexandra Feodorovna** — `File:Alexandra Fyodorovna LOC 01137u.jpg`.
- **Bloody Sunday** — `File:Shooting of workers on Voskresenskaya street in 1905.jpg` — period depiction of workers being fired upon.
- **Tsushima** — `File:Battle of Tsushima, 1905 by Tōjō Shōtarō.jpg`.
- **Potemkin** — `File:Potemkin in Constantza.JPG`.
- **State Duma** — `File:AperturaDeLaDumaEnLaSalaDelTrono19060510.png` — opening of the First Duma, 1906.
- **Finland** — `File:Hakaniemen mellakka 1906.jpg` — Helsinki unrest, 1906.
- **Poland / Warsaw** — `File:Pochód narodowy w Warszawie dn. 5 listopada 1905 r.jpg` — Warsaw national procession, 1905.
- **Serbia** — `File:King Peter I of serbia - coronation.jpg` — King Peter I.
- **Austria-Hungary** — `File:Imperatoru Francisc Joseph.jpg` — Franz Joseph I, 1905.
- **Germany / Wilhelm II** — `File:Wilhelm II of Germany - 1907.jpg`.
- **France / Franco-Russian alliance** — `File:Nicholas II and Émile Loubet meeting (1901).jpg` — Franco-Russian alliance souvenir image.
- **Britain** — `File:John Bull and his Friends 1900.jpg` — contemporary political cartoon.
- **Japan** — `File:Crowds lining the street as the procession of carriages carrying Admiral Togo, naval officers, and government officials passes through a triumphial arch during Togo's official visit, Oct., LCCN2005678641.jpg` — Tōgō triumphal imagery, 1905.
- **Ottoman Empire** — `File:Abdul Hamid 2.jpg` — Sultan Abdul Hamid II.
- **Cossacks** — `File:Cossacks of the Russian Empire.jpg`.
- **Okhrana** — `File:Okhranka group photo.jpg` — St Petersburg Okhrana leadership, 1905. Note the filename is *Okhranka*, not the previously used broken `Okhrana group photo.jpg` path.
- **Black Hundreds** — `File:Chernosotenzy v odessa.jpg` — Black Hundred demonstration in Odessa, 1905.
- **1905 Revolution** — `File:Revolution of 1905.jpg` — barricades in Moscow University.
- **Peasantry** — `File:Крестьянская-семья Беломорье.jpg` — Russian peasant family.
- **Intelligentsia / students** — `File:Митинг у Петербургского университета (1905).jpg` — rally at St Petersburg University, 18 October 1905.
- **Liberals / zemstvo politics** — `File:Zemskaya deputatsiya.jpg` — zemstvo and city delegates petitioning Nicholas for popular representation at Peterhof, 6 June 1905.
- **Zemstvos** — `File:Zemskaya deputatsiya.jpg`.
- **Orthodox Church** — `File:Hopewood, Sam - Eine religiöse Prozession auf dem Roten Platz, Moskau (Zeno Fotografie).jpg` — religious procession on Red Square, 1905.
- **Bureaucracy / ministries** — `File:Ilya repin, seduta cerimoniale del consiglio di stato il 7 maggio 1901, nel centenario della sua fondazione, 1903.JPG` — Repin's State Council.
- **St Petersburg / Petrograd** — `File:Russischer Photograph um 1900 - Blick auf den Fontanka-Fluss zwischen der Aničkov- und der Semenovskij-Brücke. St. Petersburg (Zeno Fotografie).jpg`.
- **Moscow** — `File:Krasnaya Ploshad-1900-N.jpg` — Red Square around 1900.
- **Balkans** — `File:Bałkany 1912.svg` — frontiers immediately before the First Balkan War.
- **Strikes / workers' politics** — `File:Совет рабочих депутатов Петербурга (1905).jpg` — Petersburg Soviet of Workers' Deputies, 1905.
- **Pogroms** — `File:Pogrom_of_Jews_in_Kiev_1905.jpg`.
- **Emergency government / martial law** — Repin State Council image, used deliberately as the respectable face of exceptional rule.
- **Autonomy / Russification** — `File:Russian Empire 1914, modern borders.svg`.
- **Constitutional politics** — `File:Russia State Duma 1906.svg`.
- **Army** — `File:Grand Duke Nicholas Nikolaevich the Younger (portrait).jpg`.
- **Mobilization** — `File:Русские солдаты перед отправкой на Первую мировую войну.jpg` — Imperial Russian NCOs before deployment, 24 July 1914.

## Additional scrape candidates

These were found during the same Commons pass and are good candidates for later tooltip variants, event-specific swaps, or branching-dependent marginalia:

- `File:Postcard Certificate of not belonging to the intelligentsia, early 20th century.jpg` — Black Hundred satire; a mock certificate stating the holder is not a student/intellectual and therefore should not be beaten.
- `File:Front page of the newspaper “Vittova plyaska” (December 1905).jpg` — Black Hundred political satire/newspaper material.
- `File:Russkoye Znamya (URP newspaper).jpg` — Union of the Russian People newspaper masthead.
- `File:Манифестанты на Невском проспекте у здания городской думы (1905).jpg` — demonstrators on Nevsky Prospect, October 1905.
- `File:Ul. Senatorska, Warszawa 1905.jpg` — Warsaw during the 1905 uprising.
- `File:Strzaly.jpg` — 1905 Revolution in Poland.
- `File:Kauppatori Helsinki 1906.jpg` — Helsinki market square, 1906.
- `File:Aatelissääty1906.jpg` — Finnish estate/political imagery, 1906.
- `File:Triumfalnaya Square 1900s.jpg` — Moscow street life.
- `File:Moscow, Kremlin, Voznesenskaya Square, 1900s.jpg` — Kremlin-era Moscow.
- `File:Triple Entente.jpg` — Russian 1914 propaganda poster personifying France, Russia and Britain.
- `File:First days of mobilization, examples, 1914.jpg` — Balkan mobilization visual reference.
- `File:State Duma 1906.svg` and `File:1906 Russian State Duma diagram.svg` — alternative parliamentary diagrams.
- `File:Plan zala gosdumy-1.jpg` — period plan of the First Duma chamber.

## Licensing / runtime notes

Most selected material is public domain by age, Imperial Russian publication status, or explicit Commons licensing; several newer maps are CC0/CC-BY-SA. Always preserve the source filename in this ledger before vendoring a local copy. Runtime hotlinks are provisional: once the art direction is locked, optimize and vendor stable local copies in `/asset/` so Commons redirects are no longer a runtime dependency.
