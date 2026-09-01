# Marginalia Tooltip Asset Scrape

This is the source ledger for `src/marginalia-assets.js`.

The tooltip art rule is now stricter: **prefer an object that says something about the subject** — caricature, propaganda, riot photography, painting, state ceremony, political cartoon, petition delegation, newspaper or period map — rather than merely dropping in a generic portrait.

Runtime still uses Wikimedia Commons `Special:Redirect/file/...` URLs so individual images can be swapped without touching event prose. Most selections are public-domain works by age / Imperial Russian publication status, or Commons-hosted archival reproductions. Before vendoring any file locally, re-check the file page's current license.

## Current tooltip set

### People

- **Sergei Witte** — `File:Sergei Witte (cartoon).jpg` — Boris Kustodiev caricature, 1905. Better fit for Nicholas's bitchy private note than a formal portrait.
- **Pyotr Stolypin** — `File:Stolypin by Repin.jpg` — Ilya Repin portrait.
- **Grigori Rasputin** — `File:Grigory Rasputin with his followers.jpg` — Rasputin in his social/religious milieu rather than an isolated headshot.
- **Alexandra Feodorovna** — `File:Family in 1913.jpg` — Alexandra inside the Romanov family rather than as a public imperial portrait.

### Prejudice, police and reaction

- **Jews / Nicholas's antisemitic prejudice** — `File:1905 2fnl Velikoe v malom i antikhrist.jpg` — Sergei Nilus's 1905 antisemitic publication in which the *Protocols* appeared as an appendix. Kept because it is an actual artifact of the ideological world represented by the note, not a modern illustration.
- **Pogroms** — `File:1904 Russian Tsar-Stop your cruel oppression of the Jews-LOC hh0145s.jpg` — contemporary American political cartoon explicitly attacking Nicholas over pogroms and persecution.
- **Black Hundreds** — `File:Postcard Medal “honoring” the Black Hundred, ca. 1905.jpg` — period Russian satire connected directly to the Black Hundreds and anti-Jewish violence.
- **Okhrana** — `File:Okhranka group photo.jpg` — St Petersburg political police leadership, 1905.
- **Emergency powers / repression** — `File:Бодянский 1906.jpg` — 1906 Russian cartoon satirizing political repression. This replaces the old generic State Council painting for the emergency-powers tooltip.

### 1905

- **Bloody Sunday** — `File:Shooting of workers on Voskresenskaya street in 1905.jpg` — period depiction of workers being fired upon.
- **Tsushima** — `File:Battle of Tsushima, 1905 by Tōjō Shōtarō.jpg` — contemporary Japanese battle painting.
- **Potemkin** — `File:Potemkin mutiny newspaper cartoon japanese militaryman makes jokes on russians fighting each other.jpg` — June–July 1905 newspaper cartoon showing a Japanese military figure laughing at Russians fighting one another. Much more on-tone than the old static battleship photograph.
- **Duma** — `File:Opening of Duma.jpg` — Nicholas opening the new parliament in the Winter Palace, 1906.
- **Revolution** — `File:1905Репин.jpg` — Repin's 1905 rally image.
- **Strikes / workers' politics** — `File:Совет рабочих депутатов Петербурга (1905).jpg` — Petersburg Soviet of Workers' Deputies.
- **Intelligentsia / students** — `File:Митинг у Петербургского университета (1905).jpg` — rally at St Petersburg University.
- **Liberals / zemstvos** — `File:Zemskaya deputatsiya.jpg` — zemstvo and city delegates petitioning Nicholas at Peterhof in 1905.

### Borderlands / Russification

- **Finland** — `File:Hyökkäys - Edvard Isto, 1899.jpg` — Edvard Isto's *The Attack*: the Russian double-headed eagle tears the law book from the Finnish Maiden. It became an iconic protest image against Russification.
- **Poland / Warsaw** — `File:Pochód narodowy w Warszawie dn. 5 listopada 1905 r.jpg` — Warsaw national procession, 1905.
- **Autonomy** — also uses *The Attack*. Deliberate: Nicholas's 'autonomy' hover should visually suggest what imperial 'administrative consistency' looks like from the borderland.
- **Russification** — also uses *The Attack* rather than a generic empire map.

### Foreign policy

- **Serbia** — `File:King Peter I of serbia - coronation.jpg` — King Peter I and the post-1903 Serbian monarchy.
- **Austria-Hungary** — `File:Le Petit Journal Balkan Crisis (1908).jpg` — contemporary color cartoon of the Bosnian Crisis: Franz Joseph annexes Bosnia while Ferdinand and Abdul Hamid feature alongside him.
- **Germany / Wilhelm II** — `File:Wilhelm II of Germany - 1907.jpg`.
- **France / Franco-Russian alliance** — `File:Nicholas II and Émile Loubet meeting (1901).jpg`.
- **Britain** — `File:John Bull and his Friends 1900.jpg` — contemporary political cartoon.
- **Japan** — `File:Crowds lining the street as the procession of carriages carrying Admiral Togo, naval officers, and government officials passes through a triumphial arch during Togo's official visit, Oct., LCCN2005678641.jpg` — Tōgō triumphal imagery.
- **Ottoman Empire** — `File:Russian view on the Balkan problem 1908.jpg` — Russian cartoon of the Balkan problem, with Turkey watching while European powers trap the Balkan states.
- **Balkans** — same 1908 Russian cartoon rather than the old sterile map.

### State / society

- **Cossacks** — `File:Cossacks of the Russian Empire.jpg`.
- **Peasantry** — `File:Крестьянская-семья Беломорье.jpg`.
- **Orthodox Church** — `File:Hopewood, Sam - Eine religiöse Prozession auf dem Roten Platz, Moskau (Zeno Fotografie).jpg` — religious procession on Red Square, 1905.
- **Bureaucracy / ministries** — `File:Ilya Repin - Ceremonial Sitting of the State Council on 7 May 1901 Marking the Centenary of its Foundation - Google Art Project.jpg` — the painting itself, not a photograph of the work hanging in the museum.
- **St Petersburg / Petrograd** — `File:Nevskii prospect and Gostinii dvor.jpg` — an affirmative mid-19th-century painted/lithographed view of Nevsky Prospekt and Gostiny Dvor, presenting Petersburg as the imperial capital imagined at its best rather than as a gloomy documentary photograph.
- **Moscow** — `File:Barricades.jpg` — construction of barricades during the 1905 uprising, replacing the old postcard-pretty Red Square shot.
- **Constitution** — `File:Opening of Duma.jpg` — the constitutional settlement represented as Nicholas physically facing the parliamentary institution he created and distrusted.
- **Army** — `File:Grand Duke Nicholas Nikolaevich the Younger (portrait).jpg`.
- **Mobilization** — `File:Русские солдаты перед отправкой на Первую мировую войну.jpg` — Russian soldiers before departure in July 1914.

## Strong reserve assets found in this pass

These are worth using later for branch-specific tooltip variants or event art:

- `File:Kishineff must be paid for - with interest - Keppler. LCCN2011645734.jpg` — 1905 Puck cartoon connecting Nicholas, Kishinev, war finance and antisemitism.
- `File:Caricatures of Theodore Roosevelt proclaims to Czar Nicholas II of Russia, Stop your cruel oppression of the Jews - Flohri. LCCN2004671428 (cropped).jpg` — 1904 anti-pogrom cartoon.
- `File:Kapparot, Nicholas II of Russia as chicken.jpg` — 1907–1910 Jewish-American postcard attacking Nicholas over pogroms and persecution.
- `File:Le Petit Journal Balkan Crisis (1908).jpg` — featured Commons image and excellent Bosnian Crisis visual.
- `File:Caricature Bosnia Annexion 1909 Ion Kalem.jpg` — Ottoman satire of Austria-Hungary's annexation of Bosnia.
- `File:Caricature Karagoz 1908 Mehmed Baha.jpg` — Ottoman cartoon mocking Franz Joseph during the boycott crisis.
- `File:The army worm. - Luther D. Bradley.jpg` — 1914 cartoon about the Serbia/Austria ultimatum crisis.
- `File:Potemkin mutiny Odessa le corps du omeltchouk.jpg` — revolutionary meeting around Vakulenchuk's body.
- `File:Odessa mobs burn the port potemkin mutiny.jpg` — aftermath of the Odessa port fires.
- `File:Russian Duma Members, 1906.jpg` — enormous First Duma group photograph.
- `File:Zitting van de eerste Doema duma te Rusland 1906, SFA002001738.jpg` — First Duma in session.
- `File:The Russian Revolution, 1905 Q81553.jpg` — Moscow Arbat barricades, December 1905.
- `File:The Russian Revolution, 1905 Q81555.jpg` — Presnya barricades in contemporary artwork.
- `File:Nicholas II, Alexandra and Alexei during the tercentenary in Moscow.jpg` — useful for Romanov-tercentenary / dynasty-confidence tooltips.
- `File:Russian Imperial Family 1913.jpg` — high-quality family portrait for later family-specific notes.

## Runtime note

The archive is still hotlinked through Commons redirects. That is useful while art direction is changing quickly, but once the tooltip set is stable the next technical pass should vendor optimized local copies into `/asset/marginalia/` so the game does not depend on dozens of external redirects at runtime.
