/* ============================================================================
   themes.js — Catalogue des neuf directions artistiques
   ----------------------------------------------------------------------------
   Un seul contenu, neuf interprétations. Ce fichier ne contient que des
   données : les styles vivent dans styles/30-themes.css, la logique dans app.js.
   ========================================================================= */
(function () {
  'use strict';

  /** Ordre du parcours : du plus sobre au plus excessif. */
  var THEMES = [
    {
      id: 'flat',
      num: 1,
      name: 'Flat Design',
      short: 'Flat',
      swatch: '--sw-flat',
      tag: 'Aplats, angles nets, zéro ombre',
      desc: "La hiérarchie tient uniquement à la couleur et à l'échelle. Deux pixels de contour remplacent toute la profondeur du monde.",
      ornaments: 'on'
    },
    {
      id: 'material',
      num: 2,
      name: 'Material Design',
      short: 'Material',
      swatch: '--sw-material',
      tag: 'Élévation, ondulation, 8 px',
      desc: "Chaque objet annonce son altitude par son ombre. Le clic produit une ondulation : l'interface répond physiquement.",
      ornaments: 'on'
    },
    {
      id: 'skeuomorphisme',
      num: 3,
      name: 'Skeuomorphisme',
      short: 'Skeuo',
      swatch: '--sw-skeuo',
      tag: 'Cuir, papier, cuivre poli',
      desc: "Le pixel imite la matière : dégradés superposés, liserés lumineux, ombres internes. On croit pouvoir attraper les boutons.",
      ornaments: 'on'
    },
    {
      id: 'neumorphisme',
      num: 4,
      name: 'Neumorphisme',
      short: 'Neumo',
      swatch: '--sw-neumo',
      tag: 'Deux lumières, aucune bordure',
      desc: "Une seule couleur de fond, sculptée par deux sources lumineuses opposées. Les éléments passent de bombé à creusé.",
      ornaments: 'on'
    },
    {
      id: 'glassmorphisme',
      num: 5,
      name: 'Glassmorphisme',
      short: 'Glass',
      swatch: '--sw-glass',
      tag: 'Verre dépoli sur nuit colorée',
      desc: "Des halos profonds traversent des panneaux de verre. Le flou n'est pas un filtre : c'est la structure même de la page.",
      ornaments: 'on'
    },
    {
      id: 'brutalisme',
      num: 6,
      name: 'Brutalisme',
      short: 'Brutal',
      swatch: '--sw-brutal',
      tag: 'Contours noirs, aucune excuse',
      desc: "Pas d'ombre douce, pas de dégradé, pas de politesse. La structure est le décor et la typographie fait le bruit.",
      ornaments: 'off'
    },
    {
      id: 'minimalisme',
      num: 7,
      name: 'Minimalisme',
      short: 'Minimal',
      swatch: '--sw-minimal',
      tag: 'Le vide comme matériau',
      desc: "Retirer jusqu'à ce que seul l'essentiel résiste : un filet d'un pixel, beaucoup d'air, une typographie qui chuchote juste.",
      ornaments: 'off'
    },
    {
      id: 'maximalisme',
      num: 8,
      name: 'Maximalisme',
      short: 'Maximal',
      swatch: '--sw-maximal',
      tag: "Trop n'est jamais assez",
      desc: "Motifs, dégradés, ombres pleines, inclinaisons : la page est une fête foraine assumée, mais jamais illisible.",
      ornaments: 'chaos'
    },
    {
      id: 'typographique',
      num: 9,
      name: 'Typographique',
      short: 'Typo',
      swatch: '--sw-typo',
      tag: "La lettre EST l'interface",
      desc: "Plus de cartes ni de couleurs de remplissage : des filets, des capitales, des chiffres géants et du vide. Le texte tient tout.",
      ornaments: 'off'
    }
  ];

  var INDEX = {};
  THEMES.forEach(function (t) { INDEX[t.id] = t; });

  /** Alias tolérants pour les adresses partagées à la main. */
  var ALIASES = {
    flatdesign: 'flat', 'flat-design': 'flat',
    materialdesign: 'material', 'material-design': 'material',
    skeuo: 'skeuomorphisme', skeuomorph: 'skeuomorphisme', skeuomorphism: 'skeuomorphisme',
    neumo: 'neumorphisme', neumorph: 'neumorphisme', neumorphism: 'neumorphisme',
    glass: 'glassmorphisme', glassmorphism: 'glassmorphisme', glassmorph: 'glassmorphisme',
    brutal: 'brutalisme', brutalist: 'brutalisme', brutalism: 'brutalisme',
    minimal: 'minimalisme', minimalism: 'minimalisme',
    maximal: 'maximalisme', maximalism: 'maximalisme',
    typo: 'typographique', typography: 'typographique', typographic: 'typographique'
  };

  var DEFAULT = 'flat';

  /** Résout une valeur (id, alias, numéro) vers un identifiant valide. */
  function resolve(value) {
    if (!value) return null;
    var key = String(value).trim().toLowerCase();
    if (INDEX[key]) return key;
    if (ALIASES[key] && INDEX[ALIASES[key]]) return ALIASES[key];
    var byNum = THEMES.filter(function (t) { return String(t.num) === key; })[0];
    return byNum ? byNum.id : null;
  }

  /** Construit les calques décoratifs, communs à tous les thèmes. */
  function mountDecor() {
    var targets = document.querySelectorAll('.hero, .finale');
    Array.prototype.forEach.call(targets, function (host) {
      if (host.querySelector(':scope > .deco')) return;
      var deco = document.createElement('div');
      deco.className = 'deco';
      deco.setAttribute('aria-hidden', 'true');
      deco.innerHTML =
        '<div class="deco-grid"></div>' +
        '<div class="deco-dots"></div>' +
        '<div class="deco-rings"><span></span><span></span><span></span><span></span></div>';
      host.insertBefore(deco, host.firstChild);
    });
  }

  /** Construit les neuf pastilles du sélecteur. */
  function mountPicker(host) {
    if (!host || host.dataset.mounted === '1') return;
    var frag = document.createDocumentFragment();
    THEMES.forEach(function (t) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'picker-btn';
      b.setAttribute('role', 'tab');
      b.setAttribute('aria-selected', 'false');
      b.setAttribute('tabindex', '-1');
      b.setAttribute('aria-controls', 'contenu');
      b.setAttribute('data-theme-id', t.id);
      b.setAttribute('data-num', String(t.num));
      b.style.setProperty('--sw', 'var(' + t.swatch + ')');
      b.title = t.name + ' — ' + t.tag;
      var dot = document.createElement('span');
      dot.className = 'pt';
      dot.setAttribute('aria-hidden', 'true');
      var txt = document.createElement('span');
      txt.className = 'ptxt';
      txt.textContent = t.short;
      b.appendChild(dot);
      b.appendChild(txt);
      frag.appendChild(b);
    });
    host.appendChild(frag);
    host.dataset.mounted = '1';
  }

  window.NSI = window.NSI || {};
  window.NSI.themes = {
    list: THEMES,
    byId: INDEX,
    resolve: resolve,
    DEFAULT: DEFAULT,
    mountDecor: mountDecor,
    mountPicker: mountPicker
  };

  /* Montage immédiat : les décors et le sélecteur doivent exister avant
     la première peinture pour éviter tout décalage visuel. */
  mountDecor();
  mountPicker(document.getElementById('theme-picker'));
})();
