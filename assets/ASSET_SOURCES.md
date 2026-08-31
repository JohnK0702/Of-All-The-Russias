# Historical GUI asset sources

This file records historical visual sources used by the GUI layers. The current build references Wikimedia Commons through `Special:Redirect/file/...` URLs; once the visual direction is locked, these should be replaced with repository-local optimized copies.

## Imperial coat of arms

**File:** `Middle Coat of Arms of the Russian Empire.svg`  
**Source:** https://commons.wikimedia.org/wiki/File:Middle_Coat_of_Arms_of_the_Russian_Empire.svg  
**Use:** Top-left imperial achievement, rendered through a CSS mask as simulated raised gilt / metallic relief  
**Rights:** Heraldic representation based on the public-domain blazon; see the Commons file page for the illustration's licensing notes.

## Nicholas II portrait

**File:** `Nicholas II by Boissonnas & Eggler c1909.jpg`  
**Source:** https://commons.wikimedia.org/wiki/File:Nicholas_II_by_Boissonnas_%26_Eggler_c1909.jpg  
**Date:** c. 1909  
**Author:** Boissonnas & Eggler  
**Use:** Imperial dossier portrait  
**Rights:** Public domain / PD-RusEmpire; public domain in the United States.

## Imperial-family photograph

**File:** `1904-1905peterhof.jpg`  
**Source:** https://commons.wikimedia.org/wiki/File:1904-1905peterhof.jpg  
**Date:** c. 1904  
**Author:** Boasson and Eggler  
**Use:** Earlier full-page photographic texture  
**Rights:** Public domain.

## Winter Palace photograph, 1900

**File:** `Winter Palace in St petersburg.jpg`  
**Source:** https://commons.wikimedia.org/wiki/File:Winter_Palace_in_St_petersburg.jpg  
**Date:** 1900  
**Use:** Header architectural texture  
**Rights:** Public domain by age / Public Domain Mark on Commons.

## Winter Palace photograph, 1904

**File:** `Winter Palace in St Petersburg, 1904.jpg`  
**Source:** https://commons.wikimedia.org/wiki/File:Winter_Palace_in_St_Petersburg,_1904.jpg  
**Date:** 1904  
**Use:** Full-page background behind the main dossier  
**Rights:** Public domain in the United States per Commons.

## Winter Palace dome

**File:** `Dome, Winter Palace.jpg`  
**Source:** https://commons.wikimedia.org/wiki/File:Dome,_Winter_Palace.jpg  
**Use:** Chronology strip, footer and advisor-card architectural texture  
**Rights:** Released to the public domain by the photographer.

## Winter Palace, Library of Congress print

**File:** `Winter Palace, St. Petersburg, Russia LCCN2014646333.jpg`  
**Source:** https://commons.wikimedia.org/wiki/File:Winter_Palace,_St._Petersburg,_Russia_LCCN2014646333.jpg  
**Date:** acquired 1905  
**Use:** Earlier chronology-strip photographic texture  
**Rights:** Public domain.

## Grand Duke Sergei Alexandrovich portrait

**File:** `Grand Duke Sergei Alexandrovich of Russia 1857-1905.jpg`  
**Source:** https://commons.wikimedia.org/wiki/File:Grand_Duke_Sergei_Alexandrovich_of_Russia_1857-1905.jpg  
**Date:** late 19th century  
**Use:** Sergei assassination apparition / damaged devotional portrait  
**Rights:** Public domain; photographer died in 1898 and the work is public domain in the United States.

## Christ Pantocrator, Sinai

**File:** `Christ Icon Sinai 6th century.jpg`  
**Source:** https://commons.wikimedia.org/wiki/File:Christ_Icon_Sinai_6th_century.jpg  
**Date:** 6th century  
**Use:** Advisor-dialogue sacred-image texture  
**Rights:** Public-domain artwork reproduction.

## Vladimir Makovsky, Bloody Sunday sketch

**File:** `Vladimir Makovsky — A sketch for The 9th of January 1905 on Vasilievsky Island — Bloody Sunday (1905).webp`  
**Source:** https://commons.wikimedia.org/wiki/File:Vladimir_Makovsky_%E2%80%94_A_sketch_for_The_9th_of_January_1905_on_Vasilievsky_Island_%E2%80%94_Bloody_Sunday_(1905).webp  
**Date:** 1905  
**Author:** Vladimir Makovsky  
**Use:** Ending-page background texture  
**Rights:** Public domain.

## Visual treatment

The current palette is **blackened imperial forest green / olive / antique gilt / tarnished brass**. The interface should feel expensive before it feels frightening: embossed state stationery, lacquered green leather, palace trim and ecclesiastical gold slowly being forced to carry increasingly ugly information.

Gold is now structural rather than incidental: the imperial achievement, inner frame, progress bar, section rules, headings, option numerals, dossier trim, advisor frames and footer all use layered gilt tones. Red is intentionally reserved for later historical rupture, blood, revolutionary imagery or warning states instead of serving as the default UI language.

Photographs are integrated as damaged archival objects: low brightness, desaturation, green cast, vignette, scanline and translucent black overlays. The imperial coat of arms is not displayed as flat heraldic clip-art; CSS uses the SVG as a mask and paints it with highlight/shadow gradients and drop-shadows to simulate raised gold relief.
