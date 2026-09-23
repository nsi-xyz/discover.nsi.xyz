# discover2.nsi.xyz — NSI × 9 paradigmes de web design

Landing page pédagogique pour la spécialité **Numérique et Sciences Informatiques**
(histoire, ancêtres, programme officiel, projets, débouchés). Le parti pris UI/UX :
**un seul contenu, neuf interprétations visuelles complètes**, commutables en un clic.

## Lancer

Aucune dépendance, aucun build :

```bash
python3 -m http.server 8099
# → http://127.0.0.1:8099/
```

(ou déposer le dossier tel quel sur n'importe quel hébergeur statique).

## Architecture

```
index.html                 contenu unique + marqueurs de portée (data-theme-scope)
assets/css/base.css        jetons par défaut, composants, accessibilité, transitions
assets/css/themes/*.css    9 thèmes = 9 × (jetons complets + règles « signature »)
assets/js/app.js           métamorphose, rail, navigation, révélations, ripple
assets/img/favicon.svg
```

### Le principe : les jetons (custom properties)

`base.css` définit ~60 jetons (`--bg`, `--text`, `--primary`, `--card-shadow`,
`--btn-radius`, `--h-transform`, `--pattern`, `--code-*`…) et n'utilise que ces
jetons pour peindre les composants. Un thème ne « repeint » pas la page : il
**redefinit les jetons** et ajoute quelques règles de signature (le relief du
skeuo, le `backdrop-filter` du glass, les ombres dures du brutalisme…).

Conséquence : le HTML reste strictement identique dans les neuf univers.

### Isolation des aperçus (le cœur du laboratoire)

Chaque carte du laboratoire et chaque bouton du rail porte
`data-theme-scope="X"` (+ la classe `.sc`). Le bloc de jetons de chaque thème
cible **deux racines** :

```css
html[data-theme="flat"], [data-theme-scope="flat"].sc { /* jetons */ }
html[data-theme="flat"] .card, [data-theme-scope="flat"].sc .pv-title { /* signatures */ }
```

- `html[data-theme]` habille la page entière ;
- `[data-theme-scope].sc` redéclare les jetons **sur l'élément lui-même** :
  une déclaration locale bat toujours l'héritage, donc chaque aperçu reste fidèle
  à son paradigme quel que soit le thème actif.

Règle de convention dans les fichiers de thème : les sélecteurs descendants
globaux gardent au plus **une classe** (les sélecteurs d'aperçu sont préfixés
par `.sc`), ce qui garantit que la règle d'aperçu gagne toujours la bataille de
spécificité contre le thème actif.

### La métamorphose

1. `document.startViewTransition()` (View Transitions API) : l'ancien rendu
   s'efface et le nouveau se révèle en **cercle depuis le bouton cliqué**
   (`--vt-x/--vt-y`).
2. Repli (navigateurs sans API, ou `prefers-reduced-motion`) : la classe
   `html.theming` applique une transition collective de 420 ms sur couleurs,
   ombres et filets.
3. Le choix est mémorisé (`localStorage`) et ré-appliqué avant le premier rendu
   (script inline en `<head>` → pas de flash du thème par défaut).
4. `meta[name=theme-color]` et `color-scheme` suivent le thème (verre = nuit).

## Les 9 paradigmes

| Fichier | Lecture retenue |
|---|---|
| `flat.css` | aplats, zéro ombre, bandeau bicolore en tête de carte |
| `material.css` | élévation M3, pilules, états d'encre, ripple au clic |
| `skeuo.css` | lin, papier réglé, biseaux, boutons laqués, tampon d'encre |
| `neumorph.css` | double ombre claire/sombre, volumes sculptés, état enfoncé |
| `glass.css` | aurore animée, verre dépoli, bordures lumineuses |
| `brutal.css` | filets 3 px, ombres décalées sans flou, jaune de chantier |
| `minimal.css` | filets éditoriaux, capitales espacées, respiration maximale |
| `maximal.css` | pois, cartes de travers, ombres colorées, pilules criardes |
| `type.css` | display monumental, réglure, index en chiffres géants, un rouge |

## Ajouter un 10ᵉ thème

1. Créer `assets/css/themes/montheme.css` : copier la structure d'un thème
   existant, **redéfinir tous les jetons** (sinon l'aperçu héritera du thème
   actif), puis ajouter ses règles signature.
2. Laisser une `<link>` dans `index.html`.
3. Ajouter l'entrée dans `THEMES` (app.js) + un bouton `data-apply`/`data-theme-scope`
   dans le rail et dans le laboratoire.

## Accessibilité & responsive

- contrastes vérifiés à la main pour chaque paire texte/fond (y compris
  maximaliste et brutaliste) ; anneau de focus `--focus` visible partout ;
- navigation clavier complète : rail = flèches / Début / Fin, `aria-pressed`
  sur les neuf sélecteurs, lien d'évitement, `Escape` ferme le menu ;
- `prefers-reduced-motion` coupe View Transitions, les révélations et l'aurora ;
- grilles `auto-fit/minmax`, breakpoints à 920/860/720/480 px, rail en barre
  basse sur mobile.

## Sources du contenu

- Programme officiel NSI — éduscol (BO 22/01/2019 en Première, BO 25/07/2019 en Terminale)
- Volumes horaires et épreuves — éduscol / notes de service
- Débouchés et liens de formation — Onisep
