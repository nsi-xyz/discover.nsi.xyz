/* ============================================================
   NSI — discover.nsi.xyz
   Sélecteur d'esthétique : dock, raccourcis clavier, wipe,
   persistance localStorage, transitions d'apparition.
   ============================================================ */
(function () {
  'use strict';

  var THEMES = ['flat', 'material', 'skeuo', 'neu', 'glass', 'brutal', 'minimal', 'maxi', 'typo'];
  var STORAGE_KEY = 'nsi-discover-theme';
  var html = document.documentElement;

  var dock = document.querySelector('.dock');
  var dockBtns = Array.prototype.slice.call(document.querySelectorAll('.dock-btn[data-theme-target]'));
  var randomBtn = document.querySelector('.dock-btn-random');
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Wipe : rideau bicolore pendant le changement de thème ---------- */
  var wipe = document.createElement('div');
  wipe.className = 'wipe';
  wipe.setAttribute('aria-hidden', 'true');
  document.body.appendChild(wipe);

  var wipeTimer = null;
  function playWipe() {
    if (reducedMotion) return;
    clearTimeout(wipeTimer);
    wipe.classList.remove('is-animating');
    // force reflow pour relancer l'animation CSS
    void wipe.offsetWidth;
    wipe.classList.add('is-animating');
    wipeTimer = setTimeout(function () {
      wipe.classList.remove('is-animating');
    }, 850);
  }

  /* ---------- Changement de thème ---------- */
  function applyTheme(name, opts) {
    opts = opts || {};
    if (THEMES.indexOf(name) === -1) name = 'flat';

    if (!opts.silent) playWipe();

    // Petit délai pour que le rideau recouvre l'écran avant le switch
    var switchDelay = (!opts.silent && !reducedMotion) ? 260 : 0;
    setTimeout(function () {
      html.setAttribute('data-theme', name);
      try { localStorage.setItem(STORAGE_KEY, name); } catch (e) { /* mode privé */ }
      dockBtns.forEach(function (btn) {
        var active = btn.getAttribute('data-theme-target') === name;
        btn.classList.toggle('active', active);
        if (active) btn.setAttribute('aria-pressed', 'true');
        else btn.removeAttribute('aria-pressed');
      });
    }, switchDelay);
  }

  /* ---------- Dock ---------- */
  dockBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      applyTheme(btn.getAttribute('data-theme-target'));
    });
  });

  if (randomBtn) {
    randomBtn.addEventListener('click', function () {
      var current = html.getAttribute('data-theme');
      var pool = THEMES.filter(function (t) { return t !== current; });
      applyTheme(pool[Math.floor(Math.random() * pool.length)]);
    });
  }

  /* ---------- Raccourcis clavier : 1-9 thèmes, R aléatoire ---------- */
  document.addEventListener('keydown', function (e) {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    var tag = (e.target.tagName || '').toLowerCase();
    if (tag === 'input' || tag === 'textarea' || tag === 'select') return;

    if (e.key >= '1' && e.key <= '9') {
      applyTheme(THEMES[Number(e.key) - 1]);
    } else if (e.key === 'r' || e.key === 'R') {
      var current = html.getAttribute('data-theme');
      var pool = THEMES.filter(function (t) { return t !== current; });
      applyTheme(pool[Math.floor(Math.random() * pool.length)]);
    }
  });

  /* ---------- Apparition au scroll (IntersectionObserver) ---------- */
  var reveals = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  if ('IntersectionObserver' in window && !reducedMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- Init : URL ?theme= > localStorage > flat ---------- */
  var initial = 'flat';
  try {
    initial = localStorage.getItem(STORAGE_KEY) || 'flat';
  } catch (e) { /* noop */ }
  var urlTheme = new URLSearchParams(window.location.search).get('theme');
  if (urlTheme && THEMES.indexOf(urlTheme) !== -1) initial = urlTheme;
  applyTheme(initial, { silent: true });

  /* ---------- Styles de transition injectés (wipe + reveal) ---------- */
  var css = document.createElement('style');
  css.textContent =
    '.wipe{position:fixed;inset:0;z-index:999;pointer-events:none;' +
    'transform:scaleY(0);transform-origin:top;' +
    'background:linear-gradient(120deg,var(--accent,#3450f5),#16181d);}' +
    '.wipe.is-animating{animation:nsiWipe .8s cubic-bezier(.7,0,.3,1) forwards;}' +
    '@keyframes nsiWipe{' +
    '0%{transform:scaleY(0);transform-origin:top}' +
    '38%,62%{transform:scaleY(1)}' +
    '100%{transform:scaleY(0);transform-origin:bottom}}' +
    '.reveal{opacity:0;transform:translateY(18px);transition:opacity .7s ease,transform .7s ease;}' +
    '.reveal.is-visible{opacity:1;transform:none;}';
  document.head.appendChild(css);
})();
