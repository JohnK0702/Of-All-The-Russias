/* Nicholas's private marginalia.
   Selected people, places and events in the question text become handwritten-looking annotations.
   The notes are character POV, not omniscient narration: petty, affectionate, suspicious, frightened,
   prejudiced, or simply exhausted depending on what Nicholas is looking at. */

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
    eyebrow:'IN THE MARGIN · N.A.R.',
    note:'Clever. Vain. Useful. He always makes surrender sound like administration.',
    caption:'Count Sergei Witte.'
  },
  {
    id:'stolypin', terms:['Pyotr Stolypin','Stolypin'],
    image:()=>typeof oatrAssetUrl==='function'?oatrAssetUrl('stolypinRepin'):'',
    eyebrow:'IN THE MARGIN · N.A.R.',
    note:'He asks for twenty years as though twenty years were something I could sign at the bottom of a page.',
    caption:'Pyotr Stolypin.'
  },
  {
    id:'rasputin', terms:['Grigori Rasputin','Rasputin','Grigori'],
    image:()=>typeof oatrAssetUrl==='function'?oatrAssetUrl('rasputin'):'',
    eyebrow:'PRIVATE · N.A.R.',
    note:'Impossible man. Alix trusts him. The boy sleeps.',
    caption:'Grigori Rasputin.'
  },
  {
    id:'alexandra', terms:['Alexandra Feodorovna','Alexandra','Alix'],
    image:()=>typeof oatrAssetUrl==='function'?oatrAssetUrl('alexandra1898'):'',
    eyebrow:'PRIVATE · N.A.R.',
    note:'Alix.',
    caption:'Alexandra Feodorovna.'
  },
  {
    id:'bloody-sunday', terms:['Bloody Sunday','9 January 1905','January 1905'],
    image:()=>typeof oatrAssetUrl==='function'?oatrAssetUrl('bloodySundayMakovsky'):'',
    eyebrow:'DO NOT FORGET · N.A.R.',
    note:'The snow remembers.',
    caption:'Vladimir Makovsky, The 9th of January 1905 on Vasilievsky Island.'
  },
  {
    id:'tsushima', terms:['Tsushima'],
    image:()=>typeof oatrAssetUrl==='function'?oatrAssetUrl('tsushimaPainting'):'',
    eyebrow:'UNDERLINED TWICE · N.A.R.',
    note:'Do not say the name at dinner.',
    caption:'The Battle of Tsushima.'
  },
  {
    id:'potemkin', terms:['Potemkin'],
    image:()=>typeof oatrAssetUrl==='function'?oatrAssetUrl('potemkinPhoto'):'',
    eyebrow:'NAVAL FILE · N.A.R.',
    note:'Apparently a battleship can become a political party.',
    caption:'Battleship Potemkin.'
  },
  {
    id:'duma', terms:['State Duma','the Duma','Duma'],
    image:()=>typeof oatrAssetUrl==='function'?oatrAssetUrl('taurideDuma'):'',
    eyebrow:'IN THE MARGIN · N.A.R.',
    note:'A room full of men who believe speaking is governing. Unfortunately, sometimes they are right.',
    caption:'The Tauride Palace and the State Duma.'
  },
  {
    id:'finland', terms:['Finland','Finnish','Helsingfors'],
    image:()=>typeof oatrAssetUrl==='function'?oatrAssetUrl('empireMap'):'',
    eyebrow:'WESTERN EDGE · N.A.R.',
    note:'They insist the old promises were laws.',
    caption:'The Grand Duchy of Finland within the Empire.'
  },
  {
    id:'poland', terms:['Poland','Polish','Warsaw'],
    image:()=>typeof oatrAssetUrl==='function'?oatrAssetUrl('empireMap'):'',
    eyebrow:'WESTERN EDGE · N.A.R.',
    note:'Always a question disguised as a province.',
    caption:'Russian Poland and the western borderlands.'
  },
  {
    id:'serbia', terms:['Serbia','Serbian','Belgrade'],
    image:()=>typeof oatrAssetUrl==='function'?oatrAssetUrl('empireMap'):'',
    eyebrow:'FOREIGN OFFICE · N.A.R.',
    note:'A small kingdom with an extraordinary talent for becoming my problem.',
    caption:'Serbia and the Balkan question.'
  },
  {
    id:'germany', terms:['Kaiser Wilhelm','Wilhelm II','Germany','German','Willy'],
    image:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Wilhelm%20II%20of%20Germany%20-%201907.jpg',
    eyebrow:'COUSIN · N.A.R.',
    note:'Willy. Exhausting. Dear Willy.',
    caption:'Kaiser Wilhelm II.'
  },
  {
    id:'britain', terms:['Great Britain','Britain','British','England','English'],
    image:'https://commons.wikimedia.org/wiki/Special:Redirect/file/John%20Bull%20and%20his%20Friends%201900.jpg',
    eyebrow:'FOREIGN OFFICE · N.A.R.',
    note:'Smiles, ships, and other peoples problems.',
    caption:'John Bull and his Friends, 1900.'
  },
  {
    id:'cossacks', terms:['the Cossacks','Cossacks','Cossack'],
    image:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Cossacks%20of%20the%20Russian%20Empire.jpg',
    eyebrow:'DOMESTIC ORDER · N.A.R.',
    note:'They arrive before explanations do.',
    caption:'Cossacks of the Russian Empire.'
  },
  {
    id:'okhrana', terms:['Okhrana','political police','secret police'],
    image:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Okhrana%20group%20photo.jpg',
    eyebrow:'VERY PRIVATE · N.A.R.',
    note:'They know everything except what is true.',
    caption:'The imperial political police.'
  },
  {
    id:'revolution', terms:['the revolution','revolution','revolutionary'],
    image:()=>typeof oatrAssetUrl==='function'?oatrAssetUrl('revolutionBarricade'):'',
    eyebrow:'UNDERLINED · N.A.R.',
    note:'A word everyone uses for someone elses crime.',
    caption:'The Revolution of 1905.'
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
