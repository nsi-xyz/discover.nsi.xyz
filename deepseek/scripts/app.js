/* ============================================================================
   app.js — Le moteur de la métamorphose
   ----------------------------------------------------------------------------
   · bascule instantanée entre les 9 directions artistiques (View Transitions)
   · mémorisation + partage par URL
   · sélecteur accessible (rôles onglets, clavier, Alt+1…9)
   · onglets de programme, révélations au défilement, panneaux modaux
   · audit de contraste WCAG 2.2 calculé en direct dans le navigateur
   ========================================================================= */
(function () {
  'use strict';

  var NSI = window.NSI || {};
  var THEMES = (NSI.themes && NSI.themes.list) || [];
  var BY_ID = (NSI.themes && NSI.themes.byId) || {};
  var resolve = (NSI.themes && NSI.themes.resolve) || function (v) { return BY_ID[v] ? v : null; };
  var DEFAULT = (NSI.themes && NSI.themes.DEFAULT) || 'flat';

  var STORE_KEY = 'nsi.theme.v1';
  var root = document.documentElement;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  root.classList.add('has-js');

  /* ═══════════════════ Utilitaires ═══════════════════ */

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }

  var toastEl = $('#toast');
  var toastTimer = null;
  function toast(message, ms) {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.hidden = false;
    toastEl.classList.remove('is-leaving');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toastEl.classList.add('is-leaving');
      setTimeout(function () { toastEl.hidden = true; toastEl.classList.remove('is-leaving'); }, 260);
    }, ms || 2600);
  }

  function store(key, value) {
    try { window.localStorage.setItem(key, value); } catch (e) { /* mode privé */ }
  }
  function retrieve(key) {
    try { return window.localStorage.getItem(key); } catch (e) { return null; }
  }

  /* ═══════════════════ 1. Thème courant : lecture initiale ═══════════════ */

  function themeFromUrl() {
    var q = new URLSearchParams(window.location.search);
    return resolve(q.get('theme')) || resolve(q.get('style')) || resolve((window.location.hash || '').replace(/^#(?:theme=)?/, ''));
  }

  function pickInitialTheme() {
    return themeFromUrl() || resolve(retrieve(STORE_KEY)) || DEFAULT;
  }

  /** Nettoie l'adresse sans recharger ni polluer l'historique. */
  function cleanUrl() {
    if (!window.history || !window.history.replaceState) return;
    try {
      var url = new URL(window.location.href);
      var changed = false;
      ['theme', 'style'].forEach(function (k) {
        if (url.searchParams.has(k)) { url.searchParams.delete(k); changed = true; }
      });
      if (/^#(theme=)?/.test(url.hash) && THEMES.some(function (t) { return t.id === url.hash.replace(/^#(theme=)?/, ''); })) {
        url.hash = '';
        changed = true;
      }
      if (changed) window.history.replaceState(null, '', url.pathname + (url.search || '') + url.hash);
    } catch (e) { /* ignore */ }
  }

  /* ═══════════════════ 2. Application du thème ═══════════════════ */

  var current = null;
  var tourTimer = null;

  var statusEl = $('#theme-status');
  var pickerEl = $('#theme-picker');
  var themeColorMeta = $('meta[name="theme-color"]');

  function paintPicker(id, focus) {
    if (!pickerEl) return;
    var buttons = $$('.picker-btn', pickerEl);
    buttons.forEach(function (b) {
      var on = b.dataset.themeId === id;
      b.setAttribute('aria-selected', on ? 'true' : 'false');
      b.setAttribute('tabindex', on ? '0' : '-1');
      if (on && focus) b.focus();
      if (on) {
        var r = b.getBoundingClientRect();
        if (r.left < 0 || r.right > window.innerWidth) b.scrollIntoView({ block: 'nearest', inline: 'center' });
      }
    });
  }

  function announce(theme) {
    if (!statusEl) return;
    statusEl.innerHTML = '<b>' + theme.name + '</b>' + theme.tag;
  }

  function applyTheme(id, opts) {
    opts = opts || {};
    var theme = BY_ID[id];
    if (!theme) return;

    var same = current === id;
    current = id;

    if (same && !opts.force) { paintPicker(id, opts.focus); return; }

    var commit = function () {
      root.setAttribute('data-theme', id);
      root.setAttribute('data-ornaments', theme.ornaments || 'off');
      paintPicker(id, opts.focus);
      announce(theme);
      store(STORE_KEY, id);
      if (themeColorMeta) {
        var bg = getComputedStyle(document.body).backgroundColor;
        if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') themeColorMeta.setAttribute('content', bg);
      }
      if (auditOpen) runAudit();
      if (opts.toast) toast(theme.name + ' — ' + theme.tag);
    };

    /* Vue de transition : masque circulaire qui part du point cliqué. */
    var canTransition = !reduced && typeof document.startViewTransition === 'function' && !opts.silent;
    if (canTransition) {
      var origin = opts.origin;
      if (!origin) origin = { x: window.innerWidth / 2, y: window.innerHeight * 0.12 };
      root.style.setProperty('--vt-x', origin.x + 'px');
      root.style.setProperty('--vt-y', origin.y + 'px');
      root.classList.add('is-morphing');
      var vt = document.startViewTransition(commit);
      var done = function () { root.classList.remove('is-morphing'); };
      if (vt.finished && vt.finished.then) vt.finished.then(done, done); else setTimeout(done, 800);
    } else {
      commit();
      if (!reduced && !opts.silent) {
        root.classList.add('theme-fade');
        setTimeout(function () { root.classList.remove('theme-fade'); }, 520);
      }
    }
  }

  function originFrom(el) {
    if (!el || !el.getBoundingClientRect) return null;
    var r = el.getBoundingClientRect();
    return { x: Math.round(r.left + r.width / 2), y: Math.round(r.top + r.height / 2) };
  }

  /* ═══════════════════ 3. Sélecteur : souris + clavier ═══════════════ */

  if (pickerEl) {
    pickerEl.addEventListener('click', function (e) {
      var btn = e.target.closest ? e.target.closest('.picker-btn') : null;
      if (!btn) return;
      stopTour();
      applyTheme(btn.dataset.themeId, { origin: originFrom(btn), focus: false });
    });

    pickerEl.addEventListener('keydown', function (e) {
      var btn = e.target.closest ? e.target.closest('.picker-btn') : null;
      if (!btn) return;
      var ids = THEMES.map(function (t) { return t.id; });
      var i = ids.indexOf(btn.dataset.themeId);
      var next = null;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = ids[(i + 1) % ids.length];
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = ids[(i - 1 + ids.length) % ids.length];
      else if (e.key === 'Home') next = ids[0];
      else if (e.key === 'End') next = ids[ids.length - 1];
      else return;
      e.preventDefault();
      stopTour();
      applyTheme(next, { origin: originFrom(btn), focus: true });
    });
  }

  /* Raccourcis : Alt+1…9 = style n, Alt+0 = survol automatique, Échap = stop. */
  document.addEventListener('keydown', function (e) {
    if (e.altKey && !e.ctrlKey && !e.metaKey && /^[0-9]$/.test(e.key)) {
      e.preventDefault();
      if (e.key === '0') { toggleTour(); return; }
      var theme = THEMES.filter(function (t) { return String(t.num) === e.key; })[0];
      if (theme) { stopTour(); applyTheme(theme.id, { origin: originFrom($('.picker-btn[aria-selected="true"]')), toast: true }); }
      return;
    }
    if (e.key === 'Escape') { stopTour(); closeModal(); }
  });

  /* ═══════════════════ 4. Visite guidée des 9 styles ═══════════════ */

  function stopTour(silent) {
    if (!tourTimer) return;
    clearInterval(tourTimer);
    tourTimer = null;
    if (!silent) toast('Visite interrompue — le style reste celui-ci.', 2000);
  }

  function toggleTour() {
    if (tourTimer) { stopTour(); return; }
    var i = 0;
    toast('Visite des 9 directions artistiques — Alt+0 ou Échap pour arrêter.', 3600);
    tourTimer = setInterval(function () {
      applyTheme(THEMES[i % THEMES.length].id, { silent: false });
      i += 1;
      if (i >= THEMES.length) {
        clearInterval(tourTimer);
        tourTimer = null;
        setTimeout(function () { toast('Fin de la visite. Cliquez une pastille pour choisir.', 2800); }, 700);
      }
    }, reduced ? 900 : 1500);
  }

  var tourBtn = $('#cta-tour');
  if (tourBtn) tourBtn.addEventListener('click', toggleTour);

  /* ═══════════════════ 5. Onglets du programme ═══════════════ */

  var yearTabs = $$('.year-tab');
  if (yearTabs.length) {
    var selectYear = function (tab) {
      yearTabs.forEach(function (t) {
        var on = t === tab;
        t.classList.toggle('is-active', on);
        t.setAttribute('aria-selected', on ? 'true' : 'false');
        t.setAttribute('tabindex', on ? '0' : '-1');
        var panel = document.getElementById(t.getAttribute('aria-controls'));
        if (panel) {
          panel.classList.toggle('is-active', on);
          if (on) panel.removeAttribute('hidden'); else panel.setAttribute('hidden', '');
        }
      });
    };
    yearTabs.forEach(function (tab) {
      tab.addEventListener('click', function () { selectYear(tab); });
      tab.addEventListener('keydown', function (e) {
        if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
        e.preventDefault();
        var i = yearTabs.indexOf(tab);
        var next = yearTabs[(i + (e.key === 'ArrowRight' ? 1 : -1) + yearTabs.length) % yearTabs.length];
        selectYear(next);
        next.focus();
      });
    });
  }

  /* ═══════════════════ 6. Révélations au défilement ═══════════════ */

  function initReveal() {
    var items = $$('[data-reveal]');
    if (!('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('is-in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });

    items.forEach(function (el) {
      var parent = el.parentElement;
      if (parent) {
        var sibs = $$('[data-reveal]', parent).filter(function (n) { return n.parentElement === parent; });
        var idx = sibs.indexOf(el);
        if (idx > 0) el.style.setProperty('--stagger', String(Math.min(idx, 6)));
      }
      io.observe(el);
    });
  }

  /* ═══════════════════ 7. Barre de progression ═══════════════ */

  var bar = $('#scroll-bar');
  if (bar) {
    var ticking = false;
    var update = function () {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      var p = h > 0 ? Math.min(1, Math.max(0, window.scrollY / h)) : 0;
      bar.style.width = (p * 100).toFixed(2) + '%';
      ticking = false;
    };
    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    }, { passive: true });
    update();
  }

  /* ═══════════════════ 8. Panneaux modaux ═══════════════ */

  var openModalEl = null;
  var lastFocus = null;
  var auditOpen = false;

  function openModal(el) {
    if (!el) return;
    lastFocus = document.activeElement;
    openModalEl = el;
    el.hidden = false;
    document.body.classList.add('is-locked');
    var focusTarget = el.querySelector('.modal-x') || el.querySelector('button, [href], input, [tabindex]');
    if (focusTarget) focusTarget.focus();
  }

  function closeModal() {
    if (!openModalEl) return;
    openModalEl.hidden = true;
    openModalEl = null;
    auditOpen = false;
    document.body.classList.remove('is-locked');
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  $$('.modal').forEach(function (modal) {
    modal.addEventListener('click', function (e) {
      if (e.target.closest && e.target.closest('[data-close]')) closeModal();
    });
    modal.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab') return;
      var f = $$('a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])', modal)
        .filter(function (n) { return n.offsetParent !== null; });
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
  });

  var auditModal = $('#audit-modal');
  var auditButtons = [$('#audit-open'), $('#audit-open-2')];
  auditButtons.forEach(function (b) {
    if (b) b.addEventListener('click', function () {
      stopTour(true);
      openModal(auditModal);
      auditOpen = true;
      runAudit();
    });
  });
  var helpModal = $('#help-modal');
  var helpBtn = $('#help-open');
  if (helpBtn) helpBtn.addEventListener('click', function () { stopTour(true); openModal(helpModal); });

  /* ═══════════════════ 9. Audit de contraste WCAG 2.2 ═══════════════ */

  var cvs = document.createElement('canvas');
  cvs.width = cvs.height = 1;
  var cctx = cvs.getContext('2d', { willReadFrequently: true });

  /** Convertit n'importe quelle couleur CSS (y compris color-mix() et
      color(srgb ...)) en triplet RGB + alpha : le moteur graphique du
      navigateur fait la conversion, on lit simplement le pixel. */
  var COLOR_TOKEN = /(?:rgba?\([^)]*\)|color\([^)]*\)|oklch\([^)]*\)|oklab\([^)]*\)|hsla?\([^)]*\)|#[0-9a-f]{3,8})/i;

  function parseColor(value) {
    if (!value) return null;
    var key = String(value).trim();
    if (!key || key === 'transparent' || key === 'none') return { r: 0, g: 0, b: 0, a: 0 };
    /* Un dégradé n'est pas une couleur : on prend son premier arrêt, qui est
       la teinte dominante du fond peint (alpha compris, pour que les voiles
       translucides se composent correctement sur ce qui les porte). */
    if (key.indexOf('gradient') !== -1) {
      var first = key.match(COLOR_TOKEN);
      if (!first) return null;
      return parseColor(first[0]);
    }
    cctx.setTransform(1, 0, 0, 1, 0, 0);
    cctx.globalAlpha = 1;
    cctx.globalCompositeOperation = 'source-over';
    cctx.clearRect(0, 0, 1, 1);
    try {
      cctx.fillStyle = key;
      cctx.fillRect(0, 0, 1, 1);
      var d = cctx.getImageData(0, 0, 1, 1).data;
      cctx.clearRect(0, 0, 1, 1);
      return { r: d[0], g: d[1], b: d[2], a: d[3] / 255 };
    } catch (e) { return null; }
  }

  function over(fg, bg) { /* composition source-over */
    if (!fg) return null;
    if (!bg) return { r: fg.r, g: fg.g, b: fg.b, a: 1 };
    var a = fg.a + bg.a * (1 - fg.a);
    if (a === 0) return { r: 0, g: 0, b: 0, a: 1 };
    return {
      r: Math.round((fg.r * fg.a + bg.r * bg.a * (1 - fg.a)) / a),
      g: Math.round((fg.g * fg.a + bg.g * bg.a * (1 - fg.a)) / a),
      b: Math.round((fg.b * fg.a + bg.b * bg.a * (1 - fg.a)) / a),
      a: a
    };
  }

  function luminance(c) {
    var f = function (v) { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
    return 0.2126 * f(c.r) + 0.7152 * f(c.g) + 0.0722 * f(c.b);
  }
  function ratio(a, b) {
    var l1 = luminance(a), l2 = luminance(b);
    return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  }
  function hex(c) {
    var h = function (v) { return ('0' + Math.round(v).toString(16)).slice(-2); };
    return '#' + h(c.r) + h(c.g) + h(c.b);
  }

  /** Couleur de fond réellement perçue derrière un élément.
      Modèle simple et honnête : on empile les fonds rencontrés en remontant
      l'ascendance (aplat, sinon premier arrêt du dégradé), puis on compose
      cette pile, du plus lointain au plus proche, sur le fond de référence
      --c-canvas déclaré par chaque direction artistique. Les dégradés sont
      ainsi pris en compte au lieu d'être écrasés par le fond du document. */
  function effectiveBg(el) {
    var stack = [];
    var opaque = null;
    var token = null;
    var depth = 0, opaqueDepth = 0, tokenDepth = 0;
    var node = el;
    while (node && node.nodeType === 1) {
      var cs = getComputedStyle(node);
      if (!token) {
        var t = parseColor(cs.getPropertyValue('--c-canvas').trim());
        if (t && t.a > 0) { token = t; tokenDepth = depth; }  /* la plus proche gagne */
      }
      var solid = parseColor(cs.backgroundColor);
      var layer;
      if (solid && solid.a >= 0.999) {
        layer = solid;                       /* un aplat masque tout ce qui suit */
      } else if (!token) {
        layer = parseColor(cs.backgroundImage) || solid;
      } else {
        layer = (solid && solid.a > 0) ? solid : null;
      }
      if (layer && layer.a > 0) {
        stack.push(layer);
        /* Seul un APLAT opaque peut servir d'ancre : un dégradé opaque est
           peint PAR-DESSUS ce qui le porte, il ne masque pas l'ascendance. */
        if (solid && solid.a >= 0.999) { opaque = solid; opaqueDepth = depth; break; }
      }
      node = node.parentElement;
      depth += 1;
    }
    /* Ancre de la composition. Filtrer OBLIGATOIRE : rien de ce qui se trouve
       sous un aplat opaque ne peut transparaître. On ne retient donc le fond
       déclaré par la section que s'il est plus proche de l'élément que l'aplat
       opaque (cas d'une grande section peinte en dégradé sur un <body> clair). */
    var base = opaque;
    if (token && (!opaque || tokenDepth < opaqueDepth)) base = token;
    if (!base) base = parseColor(getComputedStyle(document.body).backgroundColor);
    if (!base || base.a === 0) base = { r: 255, g: 255, b: 255, a: 1 };
    var out = base;
    for (var i = stack.length - 1; i >= 0; i--) out = over(stack[i], out);
    return out;
  }

  var PAIRS = [
    { label: 'Texte de lecture (hero)',           fg: '.hero .lede',            bg: '.hero' },
    { label: 'Texte de lecture (bande)',          fg: '.band .lede',            bg: '.band' },
    { label: 'Texte de lecture (bande alternée)', fg: '.band--alt .lede',       bg: '.band--alt' },
    { label: 'Titres de section (hero)',          fg: '.hero h1',               bg: '.hero' },
    { label: 'Titres de section (bande)',         fg: '.band .h-lg',            bg: '.band' },
    { label: 'Titres de section (bande alt.)',    fg: '.band--alt .h-lg',       bg: '.band--alt' },
    { label: 'Titres de cartes',                  fg: '.module h3',             bg: '.module' },
    { label: 'Descriptions de cartes',            fg: '.module p',              bg: '.module' },
    { label: 'Étiquettes (eyebrow)',              fg: '.band .eyebrow',         explicitBg: true },
    { label: 'Bouton principal',                  fg: '.hero .cta',             explicitBg: true },
    { label: 'Bouton secondaire',                 fg: '.finale .cta--ghost',    bg: '.finale' },
    { label: 'Chiffres de la frise',              fg: '.tl-year',               bg: '.tl-item' },
    { label: 'Bandeau frise chronologique',       fg: '.tl-txt',                bg: '.tl-item' },
    { label: 'Étiquettes technologiques',         fg: '.p-tech li',             bg: '.project' },
    { label: 'Blocs-notes (figures)',             fg: '.figures span',          bg: '.figures' },
    { label: 'Valeurs chiffrées clés',            fg: '.figures b',             bg: '.figures' },
    { label: 'Encadré des ancêtres',              fg: '.callout-f',             bg: '.callout' },
    { label: 'Questions de la FAQ',               fg: '.qa summary',            bg: '.qa' },
    { label: 'Réponses de la FAQ',                fg: '.qa-a p',                bg: '.qa' },
    { label: 'Dernière proposition (finale)',     fg: '.finale-t',              bg: '.finale' },
    { label: 'Note de la finale',                 fg: '.finale-note',           bg: '.finale' },
    { label: 'Liens du pied de page',             fg: '.f-nav a',               bg: '.site-footer' },
    { label: 'Sélecteur : pastille active',       fg: '.picker-btn[aria-selected="true"]',  explicitBg: true },
    { label: 'Sélecteur : pastille inactive',     fg: '.picker-btn[aria-selected="false"]', bg: '.picker-shell' },
    { label: 'Sélecteur : libellé de section',    fg: '#picker-label',          bg: '.picker-shell' },
    { label: 'Pied de page (bouton)',             fg: '#audit-open-2',          bg: '.site-footer' },
    { label: 'Bouton « Contraste » de l’en-tête', fg: '#audit-open', explicitBg: true },
    { label: 'Lien d’action secondaire',          fg: '.link-arrow',            bg: '.hero' }
  ];

  /** Mesure une paire : couleur du texte, fond réellement perçu, ratio, et
      seuil applicable selon la taille et la graisse (WCAG 2.2, AA). */
  function measure(pair) {
    var fgEl = $(pair.fg);
    if (!fgEl) return null;
    var bgEl = pair.explicitBg ? fgEl : ($(pair.bg) || fgEl);
    var cs = getComputedStyle(fgEl);
    var fg = parseColor(cs.color);
    if (!fg) return null;

    /* Fond perçu : aplat déclaré s'il est opaque, sinon composition sur ce
       qu'il recouvre (indispensable pour les boutons de verre et les voiles). */
    var bg = pair.explicitBg ? parseColor(cs.backgroundColor) : null;
    if (!bg || bg.a === 0) bg = effectiveBg(bgEl);
    if (bg && bg.a < 0.999) bg = over(bg, effectiveBg(bgEl));
    if (!bg) return null;

    if (fg.a < 0.999) fg = over(fg, bg);
    var r = ratio(fg, bg);
    var size = parseFloat(cs.fontSize) || 16;
    var weight = parseInt(cs.fontWeight, 10) || 400;
    var large = size >= 24 || (size >= 18.66 && weight >= 700);
    return {
      label: pair.label,
      ratio: r,
      fg: hex(fg),
      bg: hex(bg),
      size: Math.round(size * 10) / 10,
      large: large,
      verdict: r >= 7 ? 'AAA' : (r >= 4.5 ? 'AA' : (large && r >= 3 ? 'AA grand texte' : 'Insuffisant'))
    };
  }

  function runAudit() {
    var table = $('#audit-table');
    var summary = $('#audit-summary');
    if (!table) return;
    var tbody = table.tBodies[0];
    var results = [];
    PAIRS.forEach(function (p) {
      var m = null;
      try { m = measure(p); } catch (e) { m = null; }
      if (m) results.push(m);
    });
    /* On ne juge que le texte de lecture et les grands textes. */
    var judged = results.filter(function (m) { return !m.large || m.ratio >= 3; });
    var fails = results.filter(function (m) { return m.ratio < 4.5 && !(m.large && m.ratio >= 3); });
    var ok = results.filter(function (m) { return m.ratio >= 4.5; });
    var best = results.reduce(function (a, b) { return (!a || b.ratio > a.ratio) ? b : a; }, null);
    var worst = results.reduce(function (a, b) { return (!a || b.ratio < a.ratio) ? b : a; }, null);

    var theme = BY_ID[current] || { name: '—' };
    tbody.innerHTML = '';
    results.forEach(function (m) {
      var tr = document.createElement('tr');
      var cls = m.ratio >= 7 ? 'aaa' : (m.ratio >= 4.5 ? 'aa' : (m.large && m.ratio >= 3 ? 'large' : 'fail'));
      tr.innerHTML =
        '<td>' + m.label + '</td>' +
        '<td><span class="swatch" style="background:' + m.fg + '"></span>' + m.fg +
        ' <span aria-hidden="true">/</span> <span class="swatch" style="background:' + m.bg + '"></span>' + m.bg + '</td>' +
        '<td>' + m.ratio.toFixed(2) + ':1</td>' +
        '<td class="audit-verdict audit-verdict--' + cls + '">' + m.verdict + '</td>';
      tbody.appendChild(tr);
    });

    if (summary) {
      summary.innerHTML =
        '<span class="audit-pill ' + (fails.length ? 'is-warn' : 'is-ok') + '">Direction : <b>' + theme.name + '</b></span>' +
        '<span class="audit-pill is-ok">Conformes AA : <b>' + ok.length + '/' + results.length + '</b></span>' +
        '<span class="audit-pill">Meilleur : <b>' + (best ? best.ratio.toFixed(1) + ':1' : '—') + '</b></span>' +
        '<span class="audit-pill">' + (fails.length ? 'À surveiller' : 'Point faible') + ' : <b>' + (worst ? worst.ratio.toFixed(1) + ':1' : '—') + '</b></span>';
    }
    return { results: results, fails: fails };
  }

  /* ═══════════════════ 10. Démarrage ═══════════════ */

  var year = $('#year');
  if (year) year.textContent = String(new Date().getFullYear());

  var initial = pickInitialTheme();
  applyTheme(initial, { silent: true, force: true });
  cleanUrl();
  initReveal();

  if (themeFromUrl() && initial) {
    var t = BY_ID[initial];
    setTimeout(function () { toast('Direction artistique : ' + t.name + ' — ' + t.tag, 3000); }, 700);
  }

  /* Un indice discret au premier passage : la page est un démonstrateur. */
  var firstVisit = !retrieve(STORE_KEY + '.seen');
  if (firstVisit) {
    store(STORE_KEY + '.seen', '1');
    setTimeout(function () { toast('Astuce : les 9 pastilles changent tout. Alt+0 pour la visite guidée.', 4000); }, 1600);
  }
})();
