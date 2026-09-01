/* Nicholas's private marginalia.
   Selected people, places and events in the question text become handwritten-looking annotations.
   The notes are character POV, not omniscient narration. They are intentionally anachronistic in places:
   Nicholas's instincts are allowed to sound like later Russian political language, internet slang and 2020s
   state-media brain because the joke is that the organism changes vocabulary more readily than reflexes. */

const OATR_MARGINALIA = [
  {
    id:'jews', terms:['the Jews','Jews','Jewish'],
    image:'https://commons.wikimedia.org/wiki/Special:Redirect/file/1905%202fnl%20Velikoe%20v%20malom%20i%20antikhrist.jpg',
    eyebrow:'PRIVATE PREJUDICE · N.A.R.',
    note:'The enemy.',
    caption:'Antisemitic propaganda published in Imperial Russia, 1905.'
  },
  {
    id:'witte', terms:['Sergei Witte','Witte'],
    image:()=>typeof oatrAssetUrl==='function'?oatrAssetUrl('witte'):'',
    eyebrow:'TECHNOCRAT · N.A.R.',
    note:'Globalist. Knows what a bond yield is. Suspicious.',
    caption:'Count Sergei Witte.'
  },
  {
    id:'stolypin', terms:['Pyotr Stolypin','Stolypin'],
    image:()=>typeof oatrAssetUrl==='function'?oatrAssetUrl('stolypinRepin'):'',
    eyebrow:'REFORMER · N.A.R.',
    note:'Economic liberal. Social conservative. Wants competent institutions. Dangerous extremist.',
    caption:'Pyotr Stolypin.'
  },
  {
    id:'rasputin', terms:['Grigori Rasputin','Rasputin','Grigori'],
    image:()=>typeof oatrAssetUrl==='function'?oatrAssetUrl('rasputin'):'',
    eyebrow:'UNVERIFIED SOURCE · N.A.R.',
    note:'Unverified source. Extremely high engagement. Alix follows him.',
    caption:'Grigori Rasputin.'
  },
  {
    id:'alexandra', terms:['Alexandra Feodorovna','Alexandra','Alix'],
    image:()=>typeof oatrAssetUrl==='function'?oatrAssetUrl('alexandra1898'):'',
    eyebrow:'MUTUAL · N.A.R.',
    note:'Alix. Notifications always on.',
    caption:'Alexandra Feodorovna.'
  },
  {
    id:'bloody-sunday', terms:['Bloody Sunday','9 January 1905','January 1905'],
    image:()=>typeof oatrAssetUrl==='function'?oatrAssetUrl('bloodySundayMakovsky'):'',
    eyebrow:'OPTICS · N.A.R.',
    note:'They brought icons. The police brought optics.',
    caption:'Vladimir Makovsky, The 9th of January 1905 on Vasilievsky Island.'
  },
  {
    id:'tsushima', terms:['Tsushima'],
    image:()=>typeof oatrAssetUrl==='function'?oatrAssetUrl('tsushimaPainting'):'',
    eyebrow:'SPECIAL NAVAL OPERATION · N.A.R.',
    note:'Going according to plan. Do not ask which plan.',
    caption:'The Battle of Tsushima.'
  },
  {
    id:'potemkin', terms:['Potemkin'],
    image:()=>typeof oatrAssetUrl==='function'?oatrAssetUrl('potemkinPhoto'):'',
    eyebrow:'MARITIME CONTENT · N.A.R.',
    note:'Mutiny, but with excellent branding.',
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
    note:'Foreign agent with a constitution.',
    caption:'The Grand Duchy of Finland within the Empire.'
  },
  {
    id:'poland', terms:['Poland','Polish','Warsaw'],
    image:()=>typeof oatrAssetUrl==='function'?oatrAssetUrl('empireMap'):'',
    eyebrow:'REPEAT REQUEST · N.A.R.',
    note:'Has requested sovereignty again. Muted.',
    caption:'Russian Poland and the western borderlands.'
  },
  {
    id:'serbia', terms:['Serbia','Serbian','Belgrade'],
    image:()=>typeof oatrAssetUrl==='function'?oatrAssetUrl('empireMap'):'',
    eyebrow:'SMALL ACCOUNT · HIGH REACH · N.A.R.',
    note:'Small account. Catastrophic engagement.',
    caption:'Serbia and the Balkan question.'
  },
  {
    id:'germany', terms:['Kaiser Wilhelm','Wilhelm II','Germany','German','Willy'],
    image:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Wilhelm%20II%20of%20Germany%20-%201907.jpg',
    eyebrow:'MUTUALS · N.A.R.',
    note:'Willy. Mutual. Posts too much.',
    caption:'Kaiser Wilhelm II.'
  },
  {
    id:'britain', terms:['Great Britain','Britain','British','England','English'],
    image:'https://commons.wikimedia.org/wiki/Special:Redirect/file/John%20Bull%20and%20his%20Friends%201900.jpg',
    eyebrow:'THE DEEP STATE, BUT WET · N.A.R.',
    note:'Behind it somehow.',
    caption:'John Bull and his Friends, 1900.'
  },
  {
    id:'cossacks', terms:['the Cossacks','Cossacks','Cossack'],
    image:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Cossacks%20of%20the%20Russian%20Empire.jpg',
    eyebrow:'COMMUNITY NOTES · N.A.R.',
    note:'Community Notes, but with sabres.',
    caption:'Cossacks of the Russian Empire.'
  },
  {
    id:'okhrana', terms:['Okhrana','political police','secret police'],
    image:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Okhrana%20group%20photo.jpg',
    eyebrow:'TRUST & SAFETY · N.A.R.',
    note:'Trust & Safety. They know everything except what is true.',
    caption:'The imperial political police.'
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
    note:'The base. Very loyal. Please do not ask them directly.',
    caption:'The peasantry: the overwhelming majority of imperial subjects.'
  },
  {
    id:'intelligentsia', terms:['intelligentsia','intellectuals','students'],
    image:()=>typeof oatrAssetUrl==='function'?oatrAssetUrl('dumaMembers'):'',
    eyebrow:'TERMINALLY ONLINE · N.A.R.',
    note:'People who have read themselves into treason.',
    caption:'The educated opposition and radical intelligentsia.'
  },
  {
    id:'strikes', terms:['general strike','the strike','strike','strikers'],
    image:()=>typeof oatrAssetUrl==='function'?oatrAssetUrl('revolutionBarricade'):'',
    eyebrow:'COORDINATED INAUTHENTIC BEHAVIOR · N.A.R.',
    note:'Organic grassroots movement. Coordinated by everyone I dislike.',
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
    id:'russification', terms:['Russification','Russify','russify'],
    image:()=>typeof oatrAssetUrl==='function'?oatrAssetUrl('empireMap'):'',
    eyebrow:'ADMINISTRATIVE CONSISTENCY · N.A.R.',
    note:'Not repression. Administrative consistency.',
    caption:'Russification policy in the imperial borderlands.'
  },
  {
    id:'army', terms:['the army','Russian army','General Staff'],
    image:()=>typeof oatrAssetUrl==='function'?oatrAssetUrl('grandDukeNicholas'):'',
    eyebrow:'THE ADULTS IN THE ROOM · N.A.R.',
    note:'The only serious men. Concerning how often they mention this.',
    caption:'The Imperial Russian Army and General Staff.'
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
  const selectors = '.dispatch p, article > h2, article > blockquote p, .dateline span';
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