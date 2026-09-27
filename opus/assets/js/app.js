/* ==========================================================================
   discover.nsi.xyz — un contenu, neuf esthétiques.
   ========================================================================== */
(() => {
  "use strict";

  const STYLES = [
    {
      id: "flat", name: "Flat Design", swatch: "#2F5BEA", themeColor: "#FFFFFF",
      fonts: "family=Rubik:wght@400;500;600;700;800",
      faces: ["400 1em Rubik", "700 1em Rubik", "800 1em Rubik"],
      meta: "2012 · Windows 8 « Metro », puis iOS 7",
      summary: "Le numérique cesse d'imiter le monde physique : plus d'ombres, plus de textures, seulement des aplats de couleur et des formes nettes.",
      principles: [
        "Couleurs pleines, sans dégradé ni ombre",
        "Formes géométriques simples, icônes au trait",
        "La couleur seule sépare et hiérarchise les zones"
      ],
      bits: "Des carrés de couleur pure. Bleu pour 1, gris pour 0.",
      css: `.hero {
  background: #2F5BEA; /* un aplat */
}
.btn {
  box-shadow: none;
  border-radius: 6px;
}`,
      a11y: "Sans ombre, un bouton peut ne plus ressembler à un bouton. Ici, chaque action est un bloc plein au libellé explicite, et le texte posé sur les couleurs vives est en bleu nuit (contraste ≥ 5,6:1)."
    },
    {
      id: "material", name: "Material Design", swatch: "#3F51B5", themeColor: "#303F9F",
      fonts: "family=Roboto:wght@400;500;700&family=Roboto+Mono:wght@500",
      faces: ["400 1em Roboto", "500 1em Roboto", "500 1em 'Roboto Mono'"],
      meta: "2014 · Google",
      summary: "Google imagine une interface faite de feuilles de papier numérique empilées : chaque surface a une altitude, et l'ombre dit laquelle est au-dessus.",
      principles: [
        "Surfaces en couches, altitude exprimée par l'ombre",
        "Un mouvement qui a du sens : l'onde naît sous le doigt",
        "Grille de 8 px, une couleur primaire et une d'accent"
      ],
      bits: "Des boutons en relief : un bit à 1 monte d'un cran d'altitude. Clique pour voir l'onde.",
      css: `.domain {
  /* altitude 1 */
  box-shadow: 0 1px 3px rgb(0 0 0 / .2);
}
.domain:hover {
  /* altitude 8 */
  box-shadow: 0 8px 10px 1px rgb(0 0 0 / .14);
}`,
      a11y: "Le rose d'accent ne porte jamais de petit texte : il est réservé au bouton flottant. Quand du texte doit être rose, il prend une teinte plus sombre (5,8:1)."
    },
    {
      id: "skeuo", name: "Skeuomorphisme", swatch: "linear-gradient(135deg,#7E5130,#5E3B1F)", themeColor: "#5E3B1F",
      fonts: "family=Alegreya:ital,wght@0,400;0,700;0,800;1,400&family=Kalam:wght@400;700",
      faces: ["400 1em Alegreya", "800 1em Alegreya", "400 1em Kalam", "700 1em Kalam"],
      meta: "2007 – 2013 · iPhone OS, puis iOS 1 à 6",
      summary: "Du grec skeuos (outil) et morphê (forme). Pour apprivoiser les premiers écrans tactiles, les interfaces imitent les objets réels : bois, cuir, papier, métal.",
      principles: [
        "Matières réalistes : textures, reliefs, reflets",
        "Objets familiers : interrupteurs, étiquettes, chemises",
        "Une lumière cohérente, qui vient d'en haut"
      ],
      bits: "Les interrupteurs à levier de l'Altair 8800 (1975), un ordinateur qu'on programmait bit par bit. La LED s'allume sur 1.",
      css: `.bit::before { /* le levier */
  background: linear-gradient(90deg,
    #8D9299, #F4F5F7 45%, #7F858C);
  box-shadow: 0 4px 4px rgb(0 0 0 / .6);
}`,
      a11y: "Aucun texte ne repose directement sur le bois ou le liège : il est toujours imprimé sur une surface unie (papier, laiton, cuir)."
    },
    {
      id: "neu", name: "Neumorphisme", swatch: "#E3E8EF", themeColor: "#E3E8EF",
      fonts: "family=Manrope:wght@400;600;700;800",
      faces: ["400 1em Manrope", "700 1em Manrope", "800 1em Manrope"],
      meta: "2019 · Alexander Plyuto, sur Dribbble",
      summary: "Un « nouveau skeuomorphisme » : les éléments semblent moulés dans une seule matière douce, éclairée par une lumière rasante.",
      principles: [
        "Fond et éléments de la même couleur",
        "Double ombre : claire en haut à gauche, sombre en bas à droite",
        "Enfoncé = actif, relevé = disponible"
      ],
      bits: "Des touches moulées dans la matière : 1 est enfoncé, 0 est relevé.",
      css: `.domain {
  background: #E3E8EF;
  box-shadow:
     9px  9px 18px #B4BCC9,
    -9px -9px 18px #FFFFFF;
}`,
      a11y: "Son défaut connu : des contours presque invisibles. Correctifs appliqués : texte très sombre (12:1), une vraie couleur pour l'action principale, un anneau de focus bien net."
    },
    {
      id: "glass", name: "Glassmorphisme", swatch: "linear-gradient(135deg,#7C3AED,#DB2777 60%,#06B6D4)", themeColor: "#0B1030",
      fonts: "family=Sora:wght@300;400;500;600;700",
      faces: ["400 1em Sora", "600 1em Sora", "700 1em Sora"],
      meta: "2020 · macOS Big Sur, Windows Fluent",
      summary: "Des panneaux de verre dépoli flottent au-dessus de formes colorées. La profondeur vient du flou, plus de l'ombre.",
      principles: [
        "Transparence et flou de l'arrière-plan",
        "Un fond vivant et coloré sous les panneaux",
        "Une bordure fine et lumineuse détache le verre"
      ],
      bits: "Des gouttes de verre. Un 1 s'allume de l'intérieur.",
      css: `.domain {
  background: rgb(12 16 44 / .52);
  backdrop-filter: blur(24px) saturate(160%);
  border: 1px solid rgb(255 255 255 / .16);
}`,
      a11y: "Le verre est teinté sombre : le texte blanc posé dessus dépasse 10:1 de contraste, quelle que soit la couleur qui passe dessous."
    },
    {
      id: "brutal", name: "Brutalisme", swatch: "#FFE600", themeColor: "#FFFFFF",
      fonts: "family=Archivo+Black",
      faces: ["400 1em 'Archivo Black'"],
      meta: "1950 en architecture (béton brut) · 2014 sur le web",
      summary: "Hérité de l'architecture en béton brut, le brutalisme web montre sa structure au lieu de la cacher : polices par défaut, bordures épaisses, aucun ménagement.",
      principles: [
        "Structure exposée : même les balises s'affichent",
        "Polices système et liens bleus soulignés",
        "Bordures épaisses, ombres dures, zéro arrondi"
      ],
      bits: "Des cases de tableau, noires ou blanches. Aucun compromis.",
      css: `.project {
  border: 3px solid #000;
  box-shadow: 8px 8px 0 #000;
  border-radius: 0;
  font-family: "Times New Roman", serif;
}`,
      a11y: "Brut ne veut pas dire illisible : noir sur blanc (21:1), liens soulignés en #0000EE (9,4:1), texte courant à 20 px."
    },
    {
      id: "minimal", name: "Minimalisme", swatch: "#FFFFFF", themeColor: "#FFFFFF",
      fonts: "family=Hanken+Grotesk:wght@300;400;500;600",
      faces: ["400 1em 'Hanken Grotesk'", "500 1em 'Hanken Grotesk'", "600 1em 'Hanken Grotesk'"],
      meta: "Bauhaus (1919), Dieter Rams, style suisse",
      summary: "« Less is more. » On retire tout ce qui n'est pas indispensable, jusqu'à ce que chaque élément restant porte du sens.",
      principles: [
        "L'espace vide est un matériau",
        "Une seule famille de caractères, peu de graisses",
        "Une couleur d'accent, utilisée presque jamais"
      ],
      bits: "Des points. Plein pour 1, vide pour 0. Rien d'autre.",
      css: `section {
  padding-block: 12rem;
}
.project__icon {
  display: none; /* superflu */
}`,
      a11y: "Le minimalisme n'excuse pas le gris pâle : le texte secondaire est en #5E5E5E (6,5:1)."
    },
    {
      id: "maximal", name: "Maximalisme", swatch: "conic-gradient(#FF2E93,#FFE500,#00E0B8,#2B2BFF,#FF2E93)", themeColor: "#FF2E93",
      fonts: "family=Bungee&family=Work+Sans:wght@400;500;600;700;800&family=Permanent+Marker",
      faces: ["400 1em Bungee", "400 1em 'Work Sans'", "800 1em 'Work Sans'", "400 1em 'Permanent Marker'"],
      meta: "1966 · « Less is a bore », Robert Venturi",
      summary: "La réponse au minimalisme : plus de couleurs, plus de motifs, plus de mouvement. Le chaos est permis, le désordre non.",
      principles: [
        "Motifs, couleurs saturées, contrastes forts",
        "Plusieurs polices qui se répondent",
        "Rotations, superpositions, mouvement"
      ],
      bits: "Des confettis de couleur, chaque octet dans sa teinte.",
      css: `.event:nth-child(odd) {
  transform: rotate(-2deg);
  box-shadow: 6px 6px 0 #000,
             12px 12px 0 #FF2E93;
}`,
      a11y: "Tout texte repose sur un aplat opaque. Le bandeau défilant et les formes s'arrêtent si ton système demande de réduire les animations."
    },
    {
      id: "typo", name: "Typographique", swatch: "#1B25C9", themeColor: "#1B25C9",
      fonts: "family=Anybody:wdth,wght@50..150,100..900&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;1,8..60,400",
      faces: ["900 1em Anybody", "200 1em Anybody", "400 1em 'Source Serif 4'", "italic 400 1em 'Source Serif 4'"],
      meta: "Style suisse (1950), puis polices variables (2016)",
      summary: "Pas d'image, pas de décor : la lettre devient l'image. L'échelle, la graisse et la largeur suffisent à créer la hiérarchie.",
      principles: [
        "Contrastes d'échelle extrêmes",
        "Jeu sur la graisse et la largeur des lettres",
        "Une grille stricte, le texte comme matière"
      ],
      bits: "Des glyphes : 1 en graisse maximale, 0 en graisse minimale, grâce à une police variable. Au chargement, les lettres du titre s’étirent jusqu’à remplir leur ligne.",
      css: `.hero__line--2 {
  font-family: "Anybody";
  font-variation-settings:
    "wdth" 50, "wght" 900;
  font-size: 24cqi; /* remplit la ligne */
}`,
      a11y: "Titres géants, mais corps de texte à 19 px avec un interlignage de 1,6. Blanc sur cobalt : 9,8:1."
    }
  ];

  // Fiche affichée en mode « Sans CSS »
  const RAW = {
    name: "HTML seul", swatch: "repeating-linear-gradient(45deg,#fff 0 4px,#ddd 4px 8px)",
    meta: "1991 · la première page web, cinq ans avant CSS",
    summary: "Sans feuille de style, le navigateur applique ses réglages par défaut. Le contenu est intact : titres, listes, liens, boutons. Tout ce que tu as vu jusqu'ici n'était que du CSS.",
    principles: [
      "Le HTML décrit la structure : titres, sections, listes, définitions",
      "Le CSS décide de l'apparence, et rien d'autre",
      "Le JavaScript gère le comportement : les bits marchent toujours"
    ],
    bits: "De simples boutons 0 et 1. La logique vit dans le JavaScript, pas dans le CSS.",
    css: `/* aucune règle */`,
    a11y: "Une page bien structurée reste lisible et navigable sans aucun CSS : c'est le socle de l'accessibilité."
  };

  const root = document.documentElement;
  const $ = (id) => document.getElementById(id);
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)");
  const smallScreen = matchMedia("(max-width: 560px)");
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* stockage indisponible */ } }
  };
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));

  let current = Math.max(0, STYLES.findIndex((s) => s.id === root.dataset.theme));
  let raw = false;
  let busy = false;

  /* ---------- Polices : chargées à la demande ---------- */
  const fontSheets = new Map();
  function fontSheet(style) {
    if (!fontSheets.has(style.id)) {
      const early = document.querySelector(`link[data-font="${style.id}"]`);
      if (early) {
        fontSheets.set(style.id, early.sheet ? Promise.resolve() : new Promise((res) => { early.onload = res; early.onerror = res; }));
        return fontSheets.get(style.id);
      }
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://fonts.googleapis.com/css2?" + style.fonts + "&display=swap";
      const ready = new Promise((res) => { link.onload = res; link.onerror = res; });
      document.head.appendChild(link);
      fontSheets.set(style.id, ready);
    }
    return fontSheets.get(style.id);
  }
  function loadFonts(style) {
    const all = fontSheet(style).then(() =>
      Promise.all(style.faces.map((f) => document.fonts.load(f).catch(() => null)))
    );
    return Promise.race([all, wait(1200)]);
  }

  /* ---------- Garder sa place pendant la métamorphose ---------- */
  function captureAnchor() {
    if (window.scrollY < 8) return null;
    const blocks = document.querySelectorAll("main > section, .site-footer");
    for (const el of blocks) {
      const r = el.getBoundingClientRect();
      if (r.bottom > 0) return { el, ratio: r.height ? -r.top / r.height : 0 };
    }
    return null;
  }
  function restoreAnchor(a) {
    if (!a) return;
    const r = a.el.getBoundingClientRect();
    window.scrollTo({ top: window.scrollY + r.top + a.ratio * r.height, behavior: "instant" });
  }

  /* ---------- Transition « tache de peinture » ---------- */
  function morph(update, origin) {
    const run = () => {
      // Pas de transitions pendant la bascule : le nouveau style apparaît d'un bloc
      root.classList.add("sk-switching");
      const a = captureAnchor();
      update();
      restoreAnchor(a);
      void getComputedStyle(document.body).color;
      requestAnimationFrame(() => requestAnimationFrame(() => root.classList.remove("sk-switching")));
    };
    if (!document.startViewTransition || reduceMotion.matches) { run(); return Promise.resolve(); }
    const x = origin ? origin.x : innerWidth / 2;
    const y = origin ? origin.y : innerHeight / 2;
    const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    const t = document.startViewTransition(run);
    t.ready.then(() => {
      root.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
        { duration: 720, easing: "cubic-bezier(.65, 0, .35, 1)", pseudoElement: "::view-transition-new(root)" }
      );
    }).catch(() => {});
    return t.finished.catch(() => {});
  }

  function originOf(el, evt) {
    if (evt && evt.clientX) return { x: evt.clientX, y: evt.clientY };
    if (el) { const r = el.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }
    return null;
  }

  /* ---------- Appliquer un style ---------- */
  async function setStyle(index, origin) {
    index = (index + STYLES.length) % STYLES.length;
    if (busy || (index === current && !raw)) return;
    busy = true;
    const style = STYLES[index];
    markTiles(index);
    await loadFonts(style);
    await morph(() => {
      if (raw) applyRaw(false);
      current = index;
      root.dataset.theme = style.id;
      syncUI();
    }, origin);
    store.set("nsi-style", style.id);
    try {
      const url = new URL(location.href);
      url.searchParams.set("style", style.id);
      history.replaceState(null, "", url);
    } catch (e) { /* file:// ou autre */ }
    announce("Style appliqué : " + style.name);
    busy = false;
  }

  function applyRaw(on) {
    raw = on;
    document.querySelectorAll("link[data-page-css]").forEach((l) => { l.disabled = on; });
    root.classList.toggle("is-raw", on);
    const btn = $("sk-raw");
    btn.setAttribute("aria-pressed", String(on));
    const s = on ? RAW : STYLES[current];
    $("sk-name").textContent = s.name;
    $("sk-swatch").style.background = s.swatch;
    fillSheet(s);
  }
  function toggleRaw(evt) {
    const on = !raw;
    morph(() => applyRaw(on), originOf($("sk-raw"), evt));
    announce(on ? "Feuilles de style désactivées : voici le HTML brut, avec exactement le même contenu." : "Style " + STYLES[current].name + " rétabli.");
  }

  /* ---------- Interface du sélecteur ---------- */
  const grid = $("sk-grid");
  STYLES.forEach((s, i) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "sk-tile";
    b.dataset.index = String(i);
    b.setAttribute("aria-pressed", "false");
    b.innerHTML =
      `<span class="sk-art sk-art--${s.id}" aria-hidden="true"><i></i><b>Aa</b></span>` +
      `<span class="sk-tile__name"><span>${s.name}</span><span class="sk-tile__key" aria-hidden="true">${i + 1}</span></span>`;
    b.addEventListener("click", (e) => {
      setStyle(i, originOf(b, e));
      if (smallScreen.matches) togglePalette(false);
    });
    b.addEventListener("pointerenter", () => fontSheet(s), { once: true });
    b.addEventListener("focus", () => fontSheet(s), { once: true });
    grid.appendChild(b);
  });

  function markTiles(index) {
    grid.querySelectorAll(".sk-tile").forEach((t, i) => t.setAttribute("aria-pressed", String(i === index)));
  }

  function syncUI() {
    const s = STYLES[current];
    markTiles(current);
    $("sk-name").textContent = s.name;
    $("sk-count").textContent = `${current + 1}/${STYLES.length}`;
    $("sk-swatch").style.background = s.swatch;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", s.themeColor);
    fillSheet(s);
  }

  function escapeHTML(str) {
    return str.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  }
  function highlight(css) {
    return escapeHTML(css)
      .replace(/(\/\*.*?\*\/)/g, '<span class="c">$1</span>')
      .replace(/^(\s*)([a-z-]+)(:)/gm, '$1<span class="p">$2</span>$3')
      .replace(/(&quot;.*?&quot;)/g, '<span class="s">$1</span>');
  }

  function fillSheet(s) {
    $("sk-sheet-title").textContent = s.name;
    $("sk-sheet-meta").textContent = s.meta;
    $("sk-sheet-summary").textContent = s.summary;
    $("sk-sheet-bits").textContent = s.bits;
    $("sk-sheet-a11y").textContent = s.a11y;
    $("sk-sheet-code").innerHTML = highlight(s.css);
    const list = $("sk-sheet-principles");
    list.replaceChildren(...s.principles.map((p) => { const li = document.createElement("li"); li.textContent = p; return li; }));
    $("sk-sheet").style.setProperty("--sk-swatch", s.swatch);
  }

  /* Palette */
  const palette = $("sk-palette");
  const currentBtn = $("sk-current");
  function togglePalette(force) {
    const open = typeof force === "boolean" ? force : palette.hidden;
    palette.hidden = !open;
    currentBtn.setAttribute("aria-expanded", String(open));
    if (open) { dismissHint(); STYLES.forEach(fontSheet); }
  }
  currentBtn.addEventListener("click", () => togglePalette());

  /* Fiche */
  const sheet = $("sk-sheet");
  const infoBtn = $("sk-info");
  function toggleSheet(force) {
    const open = typeof force === "boolean" ? force : sheet.hidden;
    sheet.hidden = !open;
    infoBtn.setAttribute("aria-expanded", String(open));
    if (open) { if (smallScreen.matches) togglePalette(false); $("sk-sheet-title").focus({ preventScroll: true }); }
  }
  infoBtn.addEventListener("click", () => toggleSheet());
  $("sk-sheet-close").addEventListener("click", () => { toggleSheet(false); infoBtn.focus(); });

  $("sk-prev").addEventListener("click", (e) => { stopTour(); setStyle(current - 1, originOf(e.currentTarget, e)); });
  $("sk-next").addEventListener("click", (e) => { stopTour(); setStyle(current + 1, originOf(e.currentTarget, e)); });
  $("sk-raw").addEventListener("click", (e) => { stopTour(); toggleRaw(e); });
  document.querySelectorAll('[data-action="next-style"]').forEach((b) =>
    b.addEventListener("click", (e) => setStyle(current + 1, originOf(b, e)))
  );

  /* Défilé automatique (projection en classe) */
  const tourBtn = $("sk-tour");
  let tourTimer = null;
  function startTour() {
    tourBtn.setAttribute("aria-pressed", "true");
    tourBtn.querySelector(".sk-chip__label").textContent = "Pause";
    STYLES.forEach(fontSheet);
    const step = () => setStyle(current + 1, null);
    step();
    tourTimer = setInterval(step, 4000);
  }
  function stopTour() {
    if (!tourTimer) return;
    clearInterval(tourTimer);
    tourTimer = null;
    tourBtn.setAttribute("aria-pressed", "false");
    tourBtn.querySelector(".sk-chip__label").textContent = "Défilé auto";
  }
  tourBtn.addEventListener("click", () => (tourTimer ? stopTour() : startTour()));

  /* Clavier & clics extérieurs */
  document.addEventListener("keydown", (e) => {
    const t = e.target;
    if (e.altKey || e.ctrlKey || e.metaKey || (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)))) return;
    if (/^[1-9]$/.test(e.key)) {
      stopTour();
      const i = Number(e.key) - 1;
      setStyle(i, originOf(grid.children[i] && !palette.hidden ? grid.children[i] : currentBtn));
    } else if (e.key === "Escape") {
      if (!palette.hidden) { togglePalette(false); currentBtn.focus(); }
      else if (!sheet.hidden) { toggleSheet(false); infoBtn.focus(); }
    }
  });
  document.addEventListener("pointerdown", (e) => {
    if (!palette.hidden && !e.target.closest(".sk")) togglePalette(false);
    if (tourTimer && !e.target.closest(".sk")) stopTour();
  });

  /* Bulle d'aide à la première visite */
  const hint = $("sk-hint");
  function dismissHint() {
    if (!hint.hidden) hint.hidden = true;
    store.set("nsi-hint", "1");
  }
  if (!store.get("nsi-hint")) {
    setTimeout(() => { if (palette.hidden) hint.hidden = false; }, 1200);
    setTimeout(dismissHint, 9000);
  }
  document.querySelector(".sk-bar").addEventListener("click", dismissHint);

  /* Annonces pour lecteurs d'écran */
  const live = $("sk-live");
  function announce(msg) { live.textContent = ""; requestAnimationFrame(() => { live.textContent = msg; }); }

  /* ---------- Les 24 bits de « NSI » ---------- */
  const WORD = "NSI";
  const bytesEl = $("bytes");
  const wordEl = $("bits-word");
  let codes = [...WORD].map((c) => c.charCodeAt(0));

  function glyph(code) { return code >= 33 && code <= 126 ? String.fromCharCode(code) : code === 32 ? "␣" : "·"; }
  function spoken(code) {
    if (code === 32) return "espace";
    if (code < 33 || code > 126) return "caractère non imprimable";
    return String.fromCharCode(code);
  }

  codes.forEach((code, i) => {
    const row = document.createElement("div");
    row.className = "byte";
    row.setAttribute("role", "group");
    for (let b = 7; b >= 0; b--) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "bit";
      btn.dataset.byte = String(i);
      btn.dataset.bit = String(b);
      btn.setAttribute("aria-label", `Bit de poids ${1 << b}`);
      row.appendChild(btn);
    }
    const out = document.createElement("p");
    out.className = "byte__char";
    out.innerHTML = '<span class="byte__glyph"></span><span class="byte__dec"></span>';
    row.appendChild(out);
    bytesEl.appendChild(row);
  });

  function renderBits() {
    [...bytesEl.children].forEach((row, i) => {
      const code = codes[i];
      row.querySelectorAll(".bit").forEach((btn) => {
        const on = (code >> Number(btn.dataset.bit)) & 1;
        btn.textContent = String(on);
        btn.setAttribute("aria-pressed", on ? "true" : "false");
      });
      row.querySelector(".byte__glyph").textContent = glyph(code);
      row.querySelector(".byte__dec").textContent = String(code);
      row.setAttribute("aria-label", `Lettre ${i + 1} : ${spoken(code)}, code ${code}`);
    });
    wordEl.textContent = codes.map(glyph).join("");
  }

  bytesEl.addEventListener("click", (e) => {
    const btn = e.target.closest(".bit");
    if (!btn) return;
    const i = Number(btn.dataset.byte);
    codes[i] ^= 1 << Number(btn.dataset.bit);
    renderBits();
    announce(`Lettre ${i + 1} : ${spoken(codes[i])}, code ${codes[i]}. Mot : ${codes.map(spoken).join(" ")}`);
  });
  $("bits-reset").addEventListener("click", () => {
    codes = [...WORD].map((c) => c.charCodeAt(0));
    renderBits();
    announce("Mot rétabli : N S I");
  });
  renderBits();

  /* ---------- Onde Material ---------- */
  document.addEventListener("pointerdown", (e) => {
    if (root.dataset.theme !== "material" || raw || reduceMotion.matches) return;
    const host = e.target.closest(".btn, .bit, .bits__reset, .domain, .project");
    if (!host) return;
    const r = host.getBoundingClientRect();
    const size = Math.hypot(r.width, r.height) * 2;
    const ink = document.createElement("span");
    ink.className = "ripple";
    ink.setAttribute("aria-hidden", "true");
    ink.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - r.left - size / 2}px;top:${e.clientY - r.top - size / 2}px`;
    host.appendChild(ink);
    ink.addEventListener("animationend", () => ink.remove());
  });

  /* ---------- Démarrage ---------- */
  syncUI();
  loadFonts(STYLES[current]);
  const idle = window.requestIdleCallback || ((fn) => setTimeout(fn, 2500));
  idle(() => STYLES.forEach(fontSheet));
})();
