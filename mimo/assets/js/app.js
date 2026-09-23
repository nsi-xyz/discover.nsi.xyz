/* ═══════════════════════════════════════════════
   app.js — métamorphose de thème, navigation,
   révélations. Aucun framework, tout en vanille.
   ═══════════════════════════════════════════════ */
(function () {
  'use strict';
  window.__nsiBooted = true;

  /* ── Registre des 9 paradigmes ─────────────── */
  var THEMES = {
    flat:     { name: 'Flat Design',       color: '#f2f4f9', scheme: 'light' },
    material: { name: 'Material Design',   color: '#fef7ff', scheme: 'light' },
    skeuo:    { name: 'Skeuomorphisme',    color: '#e4dac6', scheme: 'light' },
    neu:      { name: 'Neumorphisme',      color: '#e4e9f0', scheme: 'light' },
    glass:    { name: 'Glassmorphisme',    color: '#0b1020', scheme: 'dark'  },
    brut:     { name: 'Brutalisme',        color: '#f5f1e6', scheme: 'light' },
    minimal:  { name: 'Minimalisme',       color: '#fafafa', scheme: 'light' },
    maximal:  { name: 'Maximalisme',       color: '#ffd23f', scheme: 'light' },
    type:     { name: 'Typographie',       color: '#fafaf8', scheme: 'light' }
  };
  var ORDER = Object.keys(THEMES);
  var STORE = 'nsi-theme';

  var root    = document.documentElement;
  var hudName = document.getElementById('hudName');
  var metaT   = document.getElementById('metaTheme');
  var metaS   = document.getElementById('metaScheme');
  var applyBtns = Array.prototype.slice.call(document.querySelectorAll('[data-apply]'));

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  var current = THEMES[root.dataset.theme] ? root.dataset.theme : 'flat';

  /* ── État visuel (sans animation) ──────────── */
  function syncState(theme) {
    var info = THEMES[theme];
    if (!info) return;

    applyBtns.forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.dataset.apply === theme));
    });
    if (hudName) hudName.textContent = info.name;
    if (metaT) metaT.setAttribute('content', info.color);
    if (metaS) metaS.setAttribute('content', info.scheme);
    root.style.colorScheme = info.scheme;
  }

  /* ── La métamorphose ───────────────────────── */
  function commit(theme) {
    root.dataset.theme = theme;
    current = theme;
    syncState(theme);
    try { localStorage.setItem(STORE, theme); } catch (e) {}
  }

  function setTheme(theme, origin) {
    if (!THEMES[theme] || theme === current) return;

    // point de départ du « rayon » de révélation
    var x = '50%', y = '50%';
    if (origin && origin.getBoundingClientRect) {
      var r = origin.getBoundingClientRect();
      x = (r.left + r.width / 2) + 'px';
      y = (r.top + r.height / 2) + 'px';
    }
    root.style.setProperty('--vt-x', x);
    root.style.setProperty('--vt-y', y);

    var canVT = !reduced.matches && typeof document.startViewTransition === 'function';

    if (canVT) {
      document.startViewTransition(function () { commit(theme); });
    } else {
      commit(theme);
      // repli : transitions collectives le temps du swap
      root.classList.add('theming');
      window.setTimeout(function () { root.classList.remove('theming'); }, 520);
    }

    // le rail suit le scroll même si la transition est longue
    if (origin && origin.focus) origin.focus({ preventScroll: true });
  }

  /* ── Clics délégués (rail + cartes du labo) ── */
  document.addEventListener('click', function (e) {
    var btn = e.target.closest ? e.target.closest('[data-apply]') : null;
    if (!btn) return;
    setTheme(btn.dataset.apply, btn);
  });

  /* ── Clavier dans le rail (flèches, Début, Fin) ── */
  var dock = document.getElementById('dock');
  if (dock) {
    dock.addEventListener('keydown', function (e) {
      var btns = Array.prototype.slice.call(dock.querySelectorAll('.dock-btn'));
      var i = btns.indexOf(document.activeElement);
      if (i < 0) return;
      var next = null;
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = (i + 1) % btns.length;
      else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = (i - 1 + btns.length) % btns.length;
      else if (e.key === 'Home') next = 0;
      else if (e.key === 'End') next = btns.length - 1;
      if (next === null) return;
      e.preventDefault();
      btns[next].focus();
    });
  }

  /* ── Menu mobile ───────────────────────────── */
  var toggle = document.getElementById('menuToggle');
  var nav = document.getElementById('nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = document.body.classList.toggle('menu-open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        document.body.classList.remove('menu-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && document.body.classList.contains('menu-open')) {
        document.body.classList.remove('menu-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });
  }

  /* ── Barre de progression ──────────────────── */
  var bar = document.getElementById('progressBar');
  var header = document.getElementById('siteHeader');
  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      var h = document.documentElement;
      var max = h.scrollHeight - h.clientHeight;
      var top = window.scrollY || h.scrollTop || 0;
      if (bar) bar.style.width = (max > 0 ? Math.min(100, (top / max) * 100) : 0) + '%';
      if (header) header.classList.toggle('is-scrolled', top > 8);
      ticking = false;
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── Révélations + section active ──────────── */
  if ('IntersectionObserver' in window && !reduced.matches) {
    var revealIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('is-in');
          revealIO.unobserve(en.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: .08 });
    document.querySelectorAll('.reveal').forEach(function (el) { revealIO.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('is-in'); });
  }

  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav a[href^="#"]'));
  if ('IntersectionObserver' in window && navLinks.length) {
    var linkFor = {};
    navLinks.forEach(function (a) { linkFor[a.getAttribute('href').slice(1)] = a; });
    var sectionIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        var link = linkFor[en.target.id];
        if (!link) return;
        if (en.isIntersecting) {
          navLinks.forEach(function (a) { a.classList.remove('is-active'); });
          link.classList.add('is-active');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(linkFor).forEach(function (id) {
      var s = document.getElementById(id);
      if (s) sectionIO.observe(s);
    });
  }

  /* ── Material : onde de réaction ───────────── */
  function ripple(e) {
    if (reduced.matches || root.dataset.theme !== 'material') return;
    if (!e.target || typeof e.target.closest !== 'function') return;
    var el = e.target.closest('.btn, .dock-btn');
    if (!el) return;
    var rect = el.getBoundingClientRect();
    var size = Math.max(rect.width, rect.height);
    var span = document.createElement('span');
    span.className = 'ripple';
    span.style.width = span.style.height = size + 'px';
    span.style.left = ((e.clientX || rect.left + rect.width / 2) - rect.left - size / 2) + 'px';
    span.style.top = ((e.clientY || rect.top + rect.height / 2) - rect.top - size / 2) + 'px';
    el.appendChild(span);
    window.setTimeout(function () { span.remove(); }, 600);
  }
  document.addEventListener('pointerdown', ripple);

  /* ── Init ──────────────────────────────────── */
  syncState(current);

  /* Petit clin d'œil pédagogique pour ceux qui ouvrent la console */
  try {
    console.log(
      '%cNSI %c· discover.nsi.xyz\n%cNeuf styles, un seul contenu. Essaie : document.documentElement.dataset.theme = "brut"',
      'font-size:16px;font-weight:bold', 'font-size:16px', 'color:#666'
    );
    console.log('%c→ setTheme("glass") ? ' + current, 'color:#888');
  } catch (e) {}
})();
