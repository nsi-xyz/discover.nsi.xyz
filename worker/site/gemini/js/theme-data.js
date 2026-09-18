/**
 * theme-data.js
 * Base encyclopédique & pédagogique des 9 paradigmes de web design
 * Utilisé par le sélecteur, l'inspecteur didactique et les toasts interactifs.
 */

export const THEMES = {
  flat: {
    id: 'flat',
    number: 1,
    name: 'Flat Design',
    subtitle: 'La clarté géométrique sans artifice',
    period: '2012 – 2015 (Apogée Windows Phone & iOS 7)',
    pioneers: 'Microsoft (Metro UI), Apple (Jony Ive), Google (Holistic Flat)',
    philosophy: 'Rejet total des fausses imitations du monde réel. Priorité absolue au contenu, aux aplats de couleurs franches et à une typographie sans-serif impeccable.',
    cssFormula: 'box-shadow: none; border-radius: 4px; background: solid-colors;',
    keyFeatures: [
      'Absence absolue d\'ombres portées et de faux reliefs',
      'Palette de couleurs franches et saturées (bleu roi, émeraude, corail)',
      'Boutons d\'action compacts (py-2.5 px-4 text-[11px] uppercase)',
      'Hiérarchie visuelle guidée par la taille du texte et les contrastes de teintes'
    ],
    strengths: 'Performance de rendu maximale, lisibilité immédiate, propreté architecturale.',
    limitations: 'Risque d\'affordance faible (difficulté à distinguer immédiatement les éléments cliquables des simples zones d\'affichage).',
    quote: '« La simplicité ne consiste pas à retirer ce qui est complexe, mais à révéler ce qui est essentiel. »',
    badgeColor: '#2563eb'
  },
  material: {
    id: 'material',
    number: 2,
    name: 'Material Design',
    subtitle: 'La physique poétique du papier quantique',
    period: '2014 – Présent (Conçu par Matias Duarte / Google)',
    pioneers: 'Google Design Team, Android Lollipop, Polymer Project',
    philosophy: 'L\'interface est une superposition de feuilles de papier virtuel dotées d\'une épaisseur physique, se déplaçant dans un espace 3D avec élévation mesurée en dps et réactions lumineuses tactiles.',
    cssFormula: 'box-shadow: 0 var(--dp) calc(var(--dp)*2) rgba(0,0,0,0.14); border-radius: 12px;',
    keyFeatures: [
      'Système rigoureux d\'élévation sur l\'axe Z (dp 1, 2, 4, 8, 16)',
      'Bouton d\'action flottant emblématique (Floating Action Button - FAB)',
      'Effet ondulatoire d\'encre au clic (Ripple Effect)',
      'Couleurs primaires vibrantes et teintes d\'accentuation franches'
    ],
    strengths: 'Affordance intuitive exceptionnelle, standardisation industrielle éprouvée, fluidité des transitions d\'état.',
    limitations: 'Peut créer une certaine uniformité visuelle (« l\'effet Google ») si les règles ne sont pas réappropriées.',
    quote: '« Contrairement au vrai papier, notre matériau numérique peut s\'étendre, se déformer et se recombiner intelligemment. »',
    badgeColor: '#6200ee'
  },
  skeuo: {
    id: 'skeuo',
    number: 3,
    name: 'Skeuomorphisme',
    subtitle: 'L\'hommage tangible aux matières physiques',
    period: '1984 – 2012 (Des premiers Mac OS à iOS 6)',
    pioneers: 'Steve Jobs, Scott Forstall, David Kelley (IDEO)',
    philosophy: 'Rassurer l\'utilisateur en dotant les objets virtuels des attributs physiques de leurs ancêtres mécaniques : cuir surpiqué, brossage métallique, biseaux 3D et voyants lumineux réels.',
    cssFormula: 'box-shadow: inset 0 1px 0 #fff, 0 3px 6px #000; text-shadow: 0 1px 0 #fff;',
    keyFeatures: [
      'Textures physiques riches (aluminium brossé, cuir, voyants LED)',
      'Biseaux embossés et débossés simulant une source de lumière haute',
      'Boutons poussoirs avec résistance mécanique visible au clic',
      'Compteurs analogiques, rivets métalliques et ombrages étagés'
    ],
    strengths: 'Compréhension immédiate par métaphore analogique, nostalgie chaleureuse, richesse sensorielle incomparable.',
    limitations: 'Poids des ressources graphiques, complexité sur les écrans ultra-haute résolution, rigidité adaptative.',
    quote: '« Nous avons fait des boutons à l\'écran tellement léchés que vous aurez envie de les lécher. » — Steve Jobs',
    badgeColor: '#475569'
  },
  neumorph: {
    id: 'neumorph',
    number: 4,
    name: 'Neumorphisme',
    subtitle: 'Le Soft UI sculpté dans la matière',
    period: '2019 – 2021 (Mouvement Dribbble & Interfaces futuristes)',
    pioneers: 'Alexander Plyuto, Michal Malewicz, communauté Dribbble',
    philosophy: 'L\'écran n\'est plus un assemblage de couches superposées, mais une feuille de plastique continue et souple dans laquelle les boutons et cartes sont directement sculptés par extrusion ou emboutissage.',
    cssFormula: 'box-shadow: 8px 8px 16px #bec3c9, -8px -8px 16px #ffffff;',
    keyFeatures: [
      'Les composants partagent rigoureusement la même couleur que l\'arrière-plan',
      'Double ombre opposée (halo de lumière blanche opposé à une ombre portée douce)',
      'Boutons qui s\'enfoncent dans la matière (transition en inset)',
      'Rayons de courbure généreux et sensation de douceur tactile'
    ],
    strengths: 'Élégance futuriste hypnotique, esthétique épurée digne d\'équipements audio haut de gamme.',
    limitations: 'Contraste souvent insuffisant pour l\'accessibilité WCAG s\'il n\'est pas compensé par une typographie renforcée.',
    quote: '« Tout est né de la même surface, moulé avec une infinie douceur. »',
    badgeColor: '#8a99ad'
  },
  glass: {
    id: 'glass',
    number: 5,
    name: 'Glassmorphisme',
    subtitle: 'La translucidité givrée et la profondeur néon',
    period: '2020 – Présent (macOS Big Sur, Windows 11 Fluent Acrylic)',
    pioneers: 'Apple Design Team, Microsoft Fluent Design, Michal Malewicz',
    philosophy: 'Empilement de plaques de verre poli semi-transparentes flottant au-dessus d\'arrière-plans dynamiques et colorés, créant une illusion de profondeur sans alourdir l\'espace.',
    cssFormula: 'backdrop-filter: blur(20px); background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.2);',
    keyFeatures: [
      'Effet de verre dépoli givré via backdrop-filter: blur()',
      'Orbes lumineux colorés flottant en arrière-plan pour révéler la translucidité',
      'Bordure cristalline ultrafine captant la lumière incidente',
      'Hiérarchie de plans étagés avec des niveaux de flou distincts'
    ],
    strengths: 'Modernité visuelle spectaculaire, impression d\'apesanteur et de légèreté, mise en valeur des fonds.',
    limitations: 'Gourmand en calcul GPU lors des défilements complexes sur terminaux d\'entrée de gamme.',
    quote: '« Le verre ne cache pas le monde d\'en dessous, il le sublime et le tamise. »',
    badgeColor: '#06b6d4'
  },
  brutal: {
    id: 'brutal',
    number: 6,
    name: 'Néo-Brutalisme',
    subtitle: 'L\'énergie brute du web sans fard',
    period: '2021 – Présent (Figma, Gumroad, Design indépendant)',
    pioneers: 'Pascal Deville (BrutalistWebsites), Figma, Gumroad (Sahil Lavingia)',
    philosophy: 'Inspiré du brutalisme architectural de Le Corbusier (béton brut). Refus catégorique du bon goût aseptisé. Bordures noires massives, contrastes électriques sans compromis et ombres projetées à 100% d\'opacité.',
    cssFormula: 'border: 3px solid #000; box-shadow: 5px 5px 0px #000; transform: translate(-3px, -3px);',
    keyFeatures: [
      'Bordures noires épaisses (3px à 4px) dures et omniprésentes',
      'Ombres portées sèches sans aucun flou (hard shadow)',
      'Palette chromatique électrique (jaune canari, rose bubblegum, menthe fluo)',
      'Boutons physiques qui sautent ou s\'écrasent au clic en absorbant leur ombre'
    ],
    strengths: 'Mémorabilité extrême, contrastes WCAG AAA parfaits, énergie jeune et anticonformiste.',
    limitations: 'Peut dérouter un public non averti si la typographie n\'assure pas une clarté irréprochable.',
    quote: '« Le brutalisme célèbre la matière première sans maquillage : ici, le code et l\'écran. »',
    badgeColor: '#ff0055'
  },
  minimal: {
    id: 'minimal',
    number: 7,
    name: 'Minimalisme',
    subtitle: 'Le silence éloquent du fonctionnalisme suisse',
    period: '1950 – Éternel (École de Bâle, Braun, Dieter Rams)',
    pioneers: 'Josef Müller-Brockmann, Dieter Rams, Massimo Vignelli, Jony Ive',
    philosophy: '« Moins, mais mieux ». L\'ornement est superflu. L\'espace négatif blanc devient l\'élément graphique majeur. Chaque élément présent doit avoir une utilité fonctionnelle indiscutable.',
    cssFormula: 'border: 1px solid #e5e5e5; background: #ffffff; letter-spacing: -0.02em;',
    keyFeatures: [
      'Espace négatif monumental laissant chaque paragraphe respirer',
      'Palette quasi-monochrome austère (noir d\'encre, blanc d\'albâtre, gris pierre)',
      'Filets de séparation ultra-fins d\'un pixel',
      'Typographie sans-serif neutre et géométrique au millimètre près'
    ],
    strengths: 'Charge cognitive minimale, élégance intemporelle, temps de chargement éclair, sérénité de lecture.',
    limitations: 'Exige une rigueur extrême dans l\'alignement et la composition sous peine de paraître vide.',
    quote: '« Un bon design est aussi peu de design que possible. » — Dieter Rams',
    badgeColor: '#171717'
  },
  maximal: {
    id: 'maximal',
    number: 8,
    name: 'Maximalisme',
    subtitle: 'L\'explosion pop et la célébration de l\'abondance',
    period: '2022 – Présent (Mouvement Memphis revival, Web Y2K, Acid Graphics)',
    pioneers: 'Ettore Sottsass (Memphis Milano), David Carson, Scène Web Expérimentale',
    philosophy: '« More is more ». Pourquoi se limiter quand le numérique permet l\'infini ? Superposition jubilatoire de dégradés holographiques, de micro-animations, de stickers interactifs et d\'audaces géométriques.',
    cssFormula: 'background: linear-gradient(...); animation: pulse 4s infinite; transform: rotate(1deg);',
    keyFeatures: [
      'Superposition vibrante de textures, dégradés acidulés et motifs géométriques',
      'Bandeaux défilants continus (Marquee animés) et stickers flottants',
      'Micro-animations ludiques et réactions dynamiques au curseur',
      'Rythme visuel syncopé et festif tout en préservant la lisibilité des textes'
    ],
    strengths: 'Impact émotionnel foudroyant, créativité débridée, captation irrésistible de l\'attention.',
    limitations: 'Nécessite un dosage artistique précis pour éviter la cacophonie visuelle.',
    quote: '« Moins, c\'est ennuyeux. Vive l\'exubérance, la couleur et le bruit du monde ! » — Robert Venturi',
    badgeColor: '#ec4899'
  },
  editorial: {
    id: 'editorial',
    number: 9,
    name: 'Typographique',
    subtitle: 'La noblesse du plomb et des gazettes littéraires',
    period: 'Tradition XVe siècle – Renouveau Éditorial Contemporain',
    pioneers: 'Alde Manuce, Giambattista Bodoni, The New York Times Magazine, Kinfolk',
    philosophy: 'Le texte EST le design. Les polices de caractères ne servent pas à habiller le contenu, elles en sont la chair et les piliers architecturaux. Les jeux d\'échelles gigantesques dictent la partition spatiale.',
    cssFormula: 'font-family: serif; column-count: 3; border-top: 3px double #111; letter-spacing: 0.05em;',
    keyFeatures: [
      'Lettrines monumentales historiées au début des chapitres',
      'Grille de mise en page en 3 colonnes de presse avec filets d\'encadrement doubles',
      'Palette noble : papier vergé chaud (#fcf9f2), encre noire de suie et rouge vermillon',
      'Citations géantes en exergue (pull quotes) avec sérifs d\'orfèvre'
    ],
    strengths: 'Autorité intellectuelle immédiate, immersion littéraire profonde, poésie du mot imprimé.',
    limitations: 'Moins adapté aux dashboards d\'outils ou aux flux de micro-données ultra-rapides.',
    quote: '« La typographie est l\'art de donner une forme visible et durable à la pensée humaine. »',
    badgeColor: '#991b1b'
  }
};
