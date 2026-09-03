/* Nicholas's private marginalia.
   Selected people, places and events in the question text become handwritten-looking annotations.
   The notes are character POV, not omniscient narration. Some borrow later Russian political vocabulary
   because the joke is that the state changes banners and terminology more readily than reflexes. Keep the
   irony contemporary where it sharpens that continuity, but avoid app, platform and internet-culture gags. */

const OATR_MARGINALIA = [
  {
    id:'jews', terms:['the Jews','Jews','Jewish'],
    image:'https://rare-paper.cdn.bibliopolis.com/pictures/249_3.jpeg?auto=webp&v=1696125193',
    eyebrow:'Christkillers · N.A.R.',
    note:'The enemy.',
    caption:'Beyond The Pale.'
  },
  {
    id:'witte', terms:['Sergei Witte','Witte'],
    image:()=>typeof oatrAssetUrl==='function'?oatrAssetUrl('witte'):'',
    eyebrow:'TECHNOCRAT · N.A.R.',
    note:'Globalist, knows what a bond yield is. Vain.',
    caption:'Count Sergei Witte.'
  },
  {
    id:'stolypin', terms:['Pyotr Stolypin','Stolypin'],
    image:()=>typeof oatrAssetUrl==='function'?oatrAssetUrl('stolypinRepin'):'',
    eyebrow:'REFORMER · N.A.R.',
    note:'Economic liberal. Social conservative. Reformist. Dangerous extremist.',
    caption:'Pyotr Stolypin.'
  },
  {
    id:'rasputin', terms:['Grigori Rasputin','Rasputin','Grigori'],
    image:()=>typeof oatrAssetUrl==='function'?oatrAssetUrl('rasputin'):'',
    eyebrow:'THE EMPRESS TRUSTS HIM · N.A.R.',
    note:'Impossible man. Alix trusts him. The boy sleeps.',
    caption:'Grigori Rasputin.'
  },
  {
    id:'alexandra', terms:['Alexandra Feodorovna','Alexandra','Alix'],
    image:()=>typeof oatrAssetUrl==='function'?oatrAssetUrl('alexandra1898'):'',
    eyebrow:'ALIX · N.A.R.',
    note:'My wife. German by birth; more Russian than half the court.',
    caption:'Alexandra Feodorovna.'
  },
  {
    id:'bloody-sunday', terms:['Bloody Sunday','9 January 1905','January 1905'],
    image:()=>typeof oatrAssetUrl==='function'?oatrAssetUrl('bloodySundayMakovsky'):'',
    eyebrow:'OPTICS · N.A.R.',
    note:'They brought icons. The troops brought rifles.',
    caption:'Vladimir Makovsky, The 9th of January 1905 on Vasilievsky Island.'
  },
  {
    id:'tsushima', terms:['Tsushima'],
    image:()=>typeof oatrAssetUrl==='function'?oatrAssetUrl('tsushimaPainting'):'',
    eyebrow:'SPECIAL NAVAL OPERATION · N.A.R.',
    note:'Fuck.',
    caption:'The Battle of Tsushima.'
  },
  {
    id:'potemkin', terms:['Potemkin'],
    image:()=>typeof oatrAssetUrl==='function'?oatrAssetUrl('potemkinPhoto'):'',
    eyebrow:'MUTINY AT SEA · N.A.R.',
    note:'The fleet has discovered politics.',
    caption:'Battleship Potemkin.'
  },
  {
    id:'duma', terms:['State Duma','the Duma','Duma'],
    image:()=>typeof oatrAssetUrl==='function'?oatrAssetUrl('taurideDuma'):'',
    eyebrow:'MANAGED DEMOCRACY · N.A.R.',
    note:'Managed democracy. Problem: the management keeps losing control.',
    caption:'The Tauride Palace and the State Duma.'
  },
  {
    id:'finland', terms:['Finland','Finnish','Helsingfors'],
    image:()=>typeof oatrAssetUrl==='function'?oatrAssetUrl('empireMap'):'',
    eyebrow:'FOREIGN AGENT · N.A.R.',
    note:'Liberated from Sweden, never forgave us for it.',
    caption:'The Grand Duchy of Finland within the Empire.'
  },
  {
    id:'poland', terms:['Poland','Polish','Warsaw'],
    image:()=>typeof oatrAssetUrl==='function'?oatrAssetUrl('empireMap'):'',
    eyebrow:'ALWAYS TEMPORARY · N.A.R.',
    note:'I believe you you meant to say Vistulaland?.',
    caption:'Russian Poland and the western borderlands.'
  },
  {
    id:'serbia', terms:['Serbia','Serbian','Belgrade'],
    image:()=>typeof oatrAssetUrl==='function'?oatrAssetUrl('empireMap'):'',
    eyebrow:'THE SERBIAN QUESTION · N.A.R.',
    note:'A civilization built on fellatio.',
    caption:'The Kingdom of Serbia and the Balkan question.'
  },
  {
    id:'austria', terms:['Austria-Hungary','Austria','Austrian','Vienna','Habsburg'],
    image:()=>typeof oatrAssetUrl==='function'?oatrAssetUrl('empireMap'):'',
    eyebrow:'DUAL MONARCHY · N.A.R.',
    note:'Two countries in a trench coat pretending to be a great power.',
    caption:'Austria-Hungary, Russia’s principal Balkan rival.'
  },
  {
    id:'germany', terms:['Kaiser Wilhelm','Wilhelm II','Germany','German','Willy'],
    image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFujs0O1DfIvdYl8-Tx0ahk7Djswwbazrr0fg3BBG0PL8d_aCJzLRuIYo&s=10',
    eyebrow:'DEAR WILLY · N.A.R.',
    note:'Willy. Exhausting. Dear Willy.',
    caption:'Kaiser Wilhelm II.'
  },
  {
    id:'france', terms:['France','French','Paris'],
    image:()=>typeof oatrAssetUrl==='function'?oatrAssetUrl('empireMap'):'',
    eyebrow:'FINANCIAL RELATIONSHIP · N.A.R.',
    note:'Friendship, liberty, equality, fraternity, and several billion francs at interest.',
    caption:'The Franco-Russian alliance.'
  },
  {
    id:'britain', terms:['Great Britain','Britain','British','England','English'],
    image:'https://commons.wikimedia.org/wiki/Special:Redirect/file/John%20Bull%20and%20his%20Friends%201900.jpg',
    eyebrow:'THE BRITISH · N.A.R.',
    note:'Behind it somehow.',
    caption:'John Bull and his Friends, 1900.'
  },
  {
    id:'japan', terms:['Japan','Japanese','Tokyo'],
    image:()=>typeof oatrAssetUrl==='function'?oatrAssetUrl('tsushimaWide'):'',
    eyebrow:'TEMPORARY SETBACK · N.A.R.',
    note:'Small island nation. Surely scale will sort this out.',
    caption:'Imperial Japan during the Russo-Japanese War.'
  },
  {
    id:'ottomans', terms:['Ottoman Empire','Ottomans','Ottoman','Turkey','Turkish','Constantinople'],
    image:()=>typeof oatrAssetUrl==='function'?oatrAssetUrl('empireMap'):'',
    eyebrow:'UNFINISHED BUSINESS · N.A.R.',
    note:'Asian.',
    caption:'The Ottoman Empire and the Straits question.'
  },
  {
    id:'cossacks', terms:['the Cossacks','Cossacks','Cossack'],
    image:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Cossacks%20of%20the%20Russian%20Empire.jpg',
    eyebrow:'THE COSSACKS · N.A.R.',
    note:'Unpleasant, but necessary. Until they decide otherwise.',
    caption:'Cossacks of the Russian Empire.'
  },
  {
    id:'okhrana', terms:['Okhrana','political police','secret police'],
    image:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Okhrana%20group%20photo.jpg',
    eyebrow:'POLITICAL POLICE · N.A.R.',
    note:'They know everything except what is true.',
    caption:'The imperial political police.'
  },
  {
    id:'black-hundreds', terms:['Black Hundreds','Black Hundred','Black Hundredists'],
    image:()=>typeof oatrAssetUrl==='function'?oatrAssetUrl('stateCouncilRepin'):'',
    eyebrow:'GRASSROOTS · N.A.R.',
    note:'Grassroots civic participation. Please ignore the police standing behind the grassroots.',
    caption:'Ultramonarchist mass politics in late Imperial Russia.'
  },
  {
    id:'revolution', terms:['the revolution','revolution','revolutionary'],
    image:()=>typeof oatrAssetUrl==='function'?oatrAssetUrl('revolutionBarricade'):'',
    eyebrow:'COLOR REVOLUTION · N.A.R.',
    note:'Color revolution. Color: red.',
    caption:'The Revolution of 1905.'
  },
  {
    id:'peasants', terms:['the peasants','peasants','peasant'],
    image:()=>typeof oatrAssetUrl==='function'?oatrAssetUrl('empireMap'):'',
    eyebrow:'THE BASE · N.A.R.',
    note:'They love me, too dumb not to.',
    caption:'The peasantry: the overwhelming majority of imperial subjects.'
  },
  {
    id:'intelligentsia', terms:['intelligentsia','intellectuals','students'],
    image:()=>typeof oatrAssetUrl==='function'?oatrAssetUrl('dumaMembers'):'',
    eyebrow:'INTELLIGENTSIA · N.A.R.',
    note:'People who have read themselves into treason.',
    caption:'The educated opposition and radical intelligentsia.'
  },
  {
    id:'liberals', terms:['liberals','liberal opposition','Kadets','Constitutional Democrats'],
    image:()=>typeof oatrAssetUrl==='function'?oatrAssetUrl('dumaMembers'):'',
    eyebrow:'CONSTITUTIONALISTS · N.A.R.',
    note:'Want England with snow.',
    caption:'Liberal constitutional politics in the empire.'
  },
  {
    id:'zemstvo', terms:['zemstvo','zemstvos','zemstva'],
    image:()=>typeof oatrAssetUrl==='function'?oatrAssetUrl('stateCouncilRepin'):'',
    eyebrow:'LOCAL GOVERNMENT · N.A.R.',
    note:'Dangerous gateway drug to competent administration.',
    caption:'Local self-government institutions created under Alexander II.'
  },
  {
    id:'church', terms:['Holy Synod','Orthodox Church','the Church','Orthodoxy'],
    image:()=>typeof oatrAssetUrl==='function'?oatrAssetUrl('pantocrator'):'',
    eyebrow:'SPIRITUAL DEPARTMENT · N.A.R.',
    note:'The Bride of Christ, pending countersignature from the Ministry.',
    caption:'The Orthodox Church under the imperial synodal system.'
  },
  {
    id:'bureaucracy', terms:['bureaucracy','bureaucrats','ministries','ministry'],
    image:()=>typeof oatrAssetUrl==='function'?oatrAssetUrl('stateCouncilRepin'):'',
    eyebrow:'THE PERMANENT STATE · N.A.R.',
    note:'Nobody is responsible. This is why everyone is indispensable.',
    caption:'The imperial administrative state.'
  },
  {
    id:'petrograd', terms:['St. Petersburg','Saint Petersburg','Petersburg','Petrograd'],
    image:()=>typeof oatrAssetUrl==='function'?oatrAssetUrl('winterPalace1900'):'',
    eyebrow:'CAPITAL · N.A.R.',
    note:'A European city built to administer people who resent Europe.',
    caption:'The imperial capital.'
  },
  {
    id:'moscow', terms:['Moscow'],
    image:()=>typeof oatrAssetUrl==='function'?oatrAssetUrl('empireMap'):'',
    eyebrow:'THE OTHER CAPITAL · N.A.R.',
    note:'Here are luxury and penury, abundance and the most extreme deprivation, piety and atheism, … and an unbelievable frivolity—warring elements which, out of their constant conflicts, create this marvelous, outrageous, gigantic whole which we know by its collective name: Moscow..',
    caption:'Moscow, ceremonial and historical heart of Russia.'
  },
  {
    id:'balkans', terms:['Balkans','Balkan'],
    image:()=>typeof oatrAssetUrl==='function'?oatrAssetUrl('empireMap'):'',
    eyebrow:'DO NOT TOUCH · N.A.R.',
    note:'The inbred cousins.',
    caption:'The Balkans.'
  },
  {
    id:'strikes', terms:['general strike','the strike','strike','strikers'],
    image:()=>typeof oatrAssetUrl==='function'?oatrAssetUrl('revolutionBarricade'):'',
    eyebrow:'POLITICAL THEATER · N.A.R.',
    note:'A wage dispute until someone prints a leaflet.',
    caption:'Industrial unrest in the Russian Empire.'
  },
  {
    id:'pogrom', terms:['pogroms','pogrom'],
    image:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Pogrom_of_Jews_in_Kiev_1905.jpg',
    eyebrow:'REGRETTABLE EXCESS · N.A.R.',
    note:'Regrettable excess. No further questions.',
    caption:'Anti-Jewish violence in the late Imperial period.'
  },
  {
    id:'emergency', terms:['emergency powers','emergency decree','martial law'],
    image:()=>typeof oatrAssetUrl==='function'?oatrAssetUrl('stateCouncilRepin'):'',
    eyebrow:'TEMPORARY · N.A.R.',
    note:'Temporary. Renewed until morale improves.',
    caption:'Emergency government as a recurring imperial habit.'
  },
  {
    id:'autonomy', terms:['local autonomy','autonomy','self-government'],
    image:()=>typeof oatrAssetUrl==='function'?oatrAssetUrl('empireMap'):'',
    eyebrow:'SLIPPERY SLOPE · N.A.R.',
    note:'They ask for one thing first.',
    caption:'The empire repeatedly negotiated—and resisted—local self-government.'
  },
  {
    id:'constitution', terms:['constitution','constitutional','constitutionalism'],
    image:()=>typeof oatrAssetUrl==='function'?oatrAssetUrl('dumaDiagram'):'',
    eyebrow:'PAPER LIMITS · N.A.R.',
    note:'A law explaining what the sovereign may not do. Curious.',
    caption:'The constitutional question after 1905.'
  },
  {
    id:'russification', terms:['Russification','Russify','russify'],
    image:()=>typeof oatrAssetUrl==='function'?oatrAssetUrl('empireMap'):'',
    eyebrow:'ADMINISTRATIVE CONSISTENCY · N.A.R.',
    note:'Not repression. Administrative consistency.',
    caption:'Russification policy in the imperial borderlands.'
  },
  {
    id:'army', terms:['the army','Russian army','General Staff'],
    image:()=>typeof oatrAssetUrl==='function'?oatrAssetUrl('grandDukeNicholas'):'',
    eyebrow:'THE ARMY · N.A.R.',
    note:'The only serious men. They are very serious about saying so.',
    caption:'The Imperial Russian Army and General Staff.'
  },
  {
    id:'mobilization', terms:['mobilization','mobilise','mobilize','mobilized','mobilised'],
    image:()=>typeof oatrAssetUrl==='function'?oatrAssetUrl('grandDukeNicholas'):'',
    eyebrow:'JUST A PRECAUTION · N.A.R.',
    note:'Purely defensive. Everyone else is expected to understand this without asking.',
    caption:'Russian mobilization planning before the Great War.'
  }
];

function oatrMarginaliaImage(entry) {
  return typeof entry.image === 'function' ? entry.image() : entry.image;
}

function oatrMarginaliaTermNode(text, entry) {
  const mark = document.createElement('span');
  mark.className = `marginalia-term marginalia-${entry.id}`;
  mark.tabIndex = 0;
  mark.setAttribute('role','note');
  mark.setAttribute('aria-label', `${text}. Nicholas private note: ${entry.note}`);

  const word = document.createElement('span');
  word.className = 'marginalia-word';
  word.textContent = text;
  mark.appendChild(word);

  const pencil = document.createElement('span');
  pencil.className = 'marginalia-pencil';
  pencil.textContent = '✎';
  pencil.setAttribute('aria-hidden','true');
  mark.appendChild(pencil);

  const tip = document.createElement('span');
  tip.className = 'marginalia-tooltip';
  tip.setAttribute('aria-hidden','true');
  const image = oatrMarginaliaImage(entry);
  if (image) {
    const img = document.createElement('img');
    img.src = image;
    img.alt = entry.caption || '';
    img.loading = 'lazy';
    tip.appendChild(img);
  }
  const copy = document.createElement('span');
  copy.className = 'marginalia-copy';
  copy.innerHTML = `<small>${entry.eyebrow}</small><strong>${entry.note}</strong>${entry.caption ? `<em>${entry.caption}</em>` : ''}`;
  tip.appendChild(copy);
  mark.appendChild(tip);
  return mark;
}

function oatrApplyMarginalia(root=document) {
  if (!root?.querySelectorAll || !document?.createTreeWalker || !document?.createElement) return;
  // Marginalia belongs in the dispatch prose, not in navigation/header copy. Keep the dateline,
  // chapter kicker and event title inert even when they contain a term with an available tooltip.
  const selectors = '.dispatch p, article > blockquote p';
  root.querySelectorAll(selectors).forEach(container => {
    const showText = typeof NodeFilter !== 'undefined' ? NodeFilter.SHOW_TEXT : 4;
    const walker = document.createTreeWalker(container, showText);
    const nodes = [];
    let node;
    while ((node = walker.nextNode())) {
      if (!node.parentElement?.closest?.('.marginalia-term') && node.nodeValue?.trim()) nodes.push(node);
    }

    nodes.forEach(textNode => {
      let segments = [{ text:textNode.nodeValue, entry:null }];
      OATR_MARGINALIA.forEach(entry => {
        entry.terms.forEach(term => {
          const next = [];
          segments.forEach(seg => {
            if (seg.entry) return next.push(seg);
            const pattern = new RegExp(`(${term.replace(/[.*+?^${}()|[\\]\\]/g,'\\$&')})`, 'ig');
            let last = 0;
            let match;
            while ((match = pattern.exec(seg.text))) {
              if (match.index > last) next.push({text:seg.text.slice(last,match.index),entry:null});
              next.push({text:match[0],entry});
              last = match.index + match[0].length;
            }
            if (last < seg.text.length) next.push({text:seg.text.slice(last),entry:null});
          });
          segments = next.length ? next : segments;
        });
      });

      if (!segments.some(seg => seg.entry)) return;
      const frag = document.createDocumentFragment();
      segments.forEach(seg => frag.appendChild(seg.entry ? oatrMarginaliaTermNode(seg.text,seg.entry) : document.createTextNode(seg.text)));
      textNode.parentNode.replaceChild(frag,textNode);
    });
  });
}

if (typeof MutationObserver !== 'undefined' && document?.documentElement) {
  let marginaliaQueued = false;
  new MutationObserver(() => {
    if (marginaliaQueued) return;
    marginaliaQueued = true;
    Promise.resolve().then(() => {
      marginaliaQueued = false;
      oatrApplyMarginalia(document);
    });
  }).observe(document.documentElement,{subtree:true,childList:true});
}

if (typeof window !== 'undefined' && typeof window.addEventListener === 'function') {
  window.addEventListener('DOMContentLoaded',()=>oatrApplyMarginalia(document));
}

// Process the opening question when this file is loaded after the initial render.
oatrApplyMarginalia(document);
