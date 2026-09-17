/* discover.nsi.xyz — style lab
   Le contenu HTML ne change jamais. Seul l'attribut data-style de <html>
   change, et neuf feuilles CSS font le reste. */
(() => {
  const STYLES = {
    flat:        { name: "Flat Design",     era: "2012", theme: "#1d4ed8",
      desc: "Aplats de couleur, zéro relief, formes géométriques. La réaction du web aux boutons brillants des années 2000." },
    material:    { name: "Material Design", era: "2014", theme: "#6750a4",
      desc: "Le système de Google : des surfaces de papier empilées, des ombres qui indiquent la hauteur, des mouvements physiques." },
    skeuo:       { name: "Skeuomorphisme",  era: "2007", theme: "#5a3a22",
      desc: "L'interface imite le monde réel : cuir, bois, papier, boutons bombés. Le style de l'iPhone originel." },
    neumorphism: { name: "Neumorphisme",    era: "2019", theme: "#e0e5ec",
      desc: "Des formes extrudées de la surface, comme moulées dans le plastique. Doux, tactile, mais fragile côté contraste." },
    glass:       { name: "Glassmorphisme",  era: "2020", theme: "#0f1a3a",
      desc: "Du verre dépoli au-dessus de couleurs floues. Transparence, flou d'arrière-plan et fines bordures lumineuses." },
    brutalism:   { name: "Brutalisme",      era: "2014", theme: "#ffe600",
      desc: "Brut, sans finition : bordures noires, typographie système, ombres dures. On montre la structure au lieu de la cacher." },
    minimalism:  { name: "Minimalisme",     era: "1960", theme: "#ffffff",
      desc: "Enlever jusqu'à ce qu'il ne reste que l'essentiel. Le blanc est un matériau, l'espace fait la hiérarchie." },
    maximalism:  { name: "Maximalisme",     era: "2022", theme: "#ff2e88",
      desc: "Plus, c'est plus. Couleurs qui s'entrechoquent, motifs, autocollants, plusieurs polices. Une fête organisée." },
    typo:        { name: "Typographique",   era: "1928", theme: "#141414",
      desc: "Pas de boîtes, pas de couleurs : le texte seul, ses tailles, ses graisses et ses règles construisent la page." },
  };
  const ORDER = Object.keys(STYLES);

  const root = document.documentElement;
  const keys = [...document.querySelectorAll(".key[data-style-key]")];
  const labName = document.querySelector(".lab-name");
  const labEra = document.querySelector(".lab-era");
  const labDesc = document.querySelector(".lab-desc");
  const liveAttr = document.querySelector(".live-attr");
  const themeMeta = document.querySelector('meta[name="theme-color"]');
  const toggle = document.querySelector(".lab-toggle");
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  function paint(id) {
    const s = STYLES[id];
    root.dataset.style = id;
    keys.forEach(k => k.setAttribute("aria-checked", String(k.dataset.styleKey === id)));
    labName.textContent = s.name;
    labEra.textContent = s.era;
    labDesc.textContent = s.desc;
    liveAttr.textContent = `data-style="${id}"`;
    if (themeMeta) themeMeta.content = s.theme;
    const active = keys.find(k => k.dataset.styleKey === id);
    if (active) active.scrollIntoView({ block: "nearest", inline: "center", behavior: reduced ? "auto" : "smooth" });
  }

  function apply(id, { push = true } = {}) {
    if (!STYLES[id] || id === root.dataset.style) return;
    const run = () => paint(id);
    if (document.startViewTransition && !reduced) document.startViewTransition(run);
    else run();
    try { localStorage.setItem("nsi-style", id); } catch {}
    if (push) history.replaceState(null, "", `#${id}`);
  }

  // État initial : hash > mémoire > défaut
  const fromHash = location.hash.slice(1);
  let initial = "flat";
  try { initial = localStorage.getItem("nsi-style") || initial; } catch {}
  if (STYLES[fromHash]) initial = fromHash;
  paint(initial);

  keys.forEach(k => k.addEventListener("click", () => apply(k.dataset.styleKey)));
  window.addEventListener("hashchange", () => { const h = location.hash.slice(1); if (STYLES[h]) apply(h, { push: false }); });

  // Clavier : 1–9 pour choisir, flèches pour naviguer
  document.addEventListener("keydown", e => {
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    const t = e.target;
    if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
    const n = parseInt(e.key, 10);
    if (n >= 1 && n <= 9) { apply(ORDER[n - 1]); return; }
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      if (!t.classList || !t.classList.contains("key")) return;
      const i = ORDER.indexOf(root.dataset.style);
      const next = ORDER[(i + (e.key === "ArrowRight" ? 1 : -1) + ORDER.length) % ORDER.length];
      apply(next);
      keys.find(k => k.dataset.styleKey === next)?.focus();
      e.preventDefault();
    }
  });

  // Afficher / masquer le dock
  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!open));
    document.body.classList.toggle("lab-collapsed", open);
  });

  // Apparition au défilement
  const targets = document.querySelectorAll(".section-head, .tl-item, .card, .exam, .facts, .cta");
  targets.forEach(el => el.classList.add("reveal"));
  if ("IntersectionObserver" in window && !reduced) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.1 });
    targets.forEach(el => io.observe(el));
  } else {
    targets.forEach(el => el.classList.add("in"));
  }
})();
