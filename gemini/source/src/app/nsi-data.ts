export interface ThemeDefinition {
  id: 'flat' | 'material' | 'skeuomorphic' | 'neumorphic' | 'glass' | 'brutalist' | 'minimalist' | 'maximalist' | 'typographic';
  name: string;
  era: string;
  badge: string;
  icon: string;
  description: string;
  philosophy: string;
  cssHighlights: string[];
}

export const DESIGN_THEMES: ThemeDefinition[] = [
  {
    id: 'flat',
    name: 'Flat Design',
    era: '2012 — 2015',
    badge: 'Pure 2D Clarity',
    icon: 'crop_square',
    description: 'Né en réaction aux textures lourdes, le Flat Design privilégie la lisibilité immédiate, les aplats de couleurs franches et l\'absence totale de faux reliefs.',
    philosophy: '« Le contenu est la seule interface. » Simplicité géométrique et clarté typographique.',
    cssHighlights: ['box-shadow: none', 'Aplats purs (#2563EB, #F97316)', 'Bordures géométriques nettes', 'Typographie sans-serif sans artifice']
  },
  {
    id: 'material',
    name: 'Material Design',
    era: 'Google 2014 — Présent',
    badge: 'Paper & Elevation',
    icon: 'layers',
    description: 'Inspiré par le papier et l\'encre physiques. Les éléments possèdent une épaisseur virtuelle (dp) et se superposent dans un espace tridimensionnel codifié.',
    philosophy: 'Un métaphore physique unifiée guidée par l\'élévation, la lumière projetée et les transitions continues.',
    cssHighlights: ['Élévation 1dp à 16dp', 'Surfaces teintées (#FEF7FF / #F3EDF7)', 'Bouton d\'action flottant (FAB)', 'Jetons et chips arrondis']
  },
  {
    id: 'skeuomorphic',
    name: 'Skeuomorphisme',
    era: 'Apple 2007 — 2013',
    badge: 'Analog & Tactile',
    icon: 'texture',
    description: 'Imite délibérément les objets physiques du monde réel (cuir surpiqué, aluminium brossé, biseaux chromés, verre brillant) pour rassurer l\'utilisateur lors des débuts du tactile.',
    philosophy: 'Transférer les repères rassurants du monde physique vers l\'écran pour rendre le numérique immédiatement familier.',
    cssHighlights: ['Gradients biseautés réalistes', 'Boutons gel avec reflet brillant', 'Surfaces gravées en creux (inset)', 'Fond texturé parchemin / table de travail']
  },
  {
    id: 'neumorphic',
    name: 'Neumorphisme',
    era: 'Soft UI ~2020',
    badge: 'Soft Plastic Extrusion',
    icon: 'radio_button_checked',
    description: 'Une esthétique douce et sculptée où les boutons et cartes semblent moulés ou extrudés directement dans la matière même de l\'arrière-plan monochromatique.',
    philosophy: 'Fusionner le fond et la forme grâce à un jeu subtil de double ombre portée : une lumière blanche et une ombre douce.',
    cssHighlights: ['Dual shadows (+8px / -8px)', 'Fond monochromatique (#E2E8F0)', 'Creux intérieurs (inset shadows)', 'LEDs cyan luminescentes minimales']
  },
  {
    id: 'glass',
    name: 'Glassmorphisme',
    era: 'macOS Big Sur / Fluent ~2021',
    badge: 'Frosted Translucency',
    icon: 'blur_on',
    description: 'Un jeu de plans translucides en verre dépoli flottant au-dessus d\'un univers chromatique vibrant. La profondeur spatiale est sublimée par le flou d\'arrière-plan.',
    philosophy: 'Offrir une sensation de légèreté aérienne et d\'immersion spatiale grâce à la transparence optique.',
    cssHighlights: ['backdrop-filter: blur(20px)', 'Bordures blanches 1px translucides', 'Univers spatial sombre à nébuleuses', 'Reflets intérieurs spéculaires']
  },
  {
    id: 'brutalist',
    name: 'Brutalisme Web',
    era: 'Neo-Brutalism Pop ~2022',
    badge: 'Raw High-Voltage Pop',
    icon: 'bolt',
    description: 'Inspiré de l\'architecture brutaliste et de la contre-culture graphique. Trait noir ultra-épais, ombres dures sans aucun flou, typographie monospace et couleurs saturées sans compromis.',
    philosophy: 'Casser la monotonie des templates lisses et aseptisés avec une franchise visuelle explosive et théâtrale.',
    cssHighlights: ['Bordures noires 3.5px massives', 'Ombre portée dure 6px sans flou', 'Couleurs néon (Jaune acide, Cyan, Rose)', 'Typographie Syne & Space Mono']
  },
  {
    id: 'minimalist',
    name: 'Minimalisme',
    era: 'Style Suisse International',
    badge: 'Radical Restraint',
    icon: 'remove',
    description: 'Héritier de l\'école de Zurich et du Bauhaus. Grille modulaire stricte, espace négatif généreux, palette monochrome rigoureuse et une unique pointe de rouge vermillon.',
    philosophy: '« Weniger, aber besser » (Moins, mais mieux). Éliminer l\'ornement pour laisser triompher la vérité du message.',
    cssHighlights: ['Zéro ombre, zéro fioriture', 'Lignes séparatrices d\'1px ultra-fines', 'Contraste noir/blanc chirurgical', 'Accent ponctuel rouge suisse (#DC2626)']
  },
  {
    id: 'maximalist',
    name: 'Maximalisme',
    era: 'Y2K Cyber / Acid Memphis',
    badge: 'Exuberant Chaos',
    icon: 'auto_awesome',
    description: 'La fête de l\'excès visuel ! Stickers superposés, dégradés irisés, bannières déroulantes, fenêtres rétro aux bordures néon et typographie festive pleine de rebond.',
    philosophy: '« More is more! » L\'énergie pure, la joie du pixel et la liberté créative désinhibée.',
    cssHighlights: ['Bandeaux animés en continu (Marquee)', 'Stickers inclinés colorés', 'Bordures dégradées vibrantes', 'Typographie expressive Unbounded']
  },
  {
    id: 'typographic',
    name: 'Typographique',
    era: 'Editorial & Haute-Couture',
    badge: 'Serif Architecture',
    icon: 'text_fields',
    description: 'Ici, la lettre n\'est pas un vecteur de texte : elle est l\'édifice lui-même. Des polices à empattements monumentales avec ligatures et italiques dans un esprit de gazette littéraire.',
    philosophy: 'Le mot comme monument graphique. L\'élégance du noir d\'imprimerie sur papier d\'ivoire.',
    cssHighlights: ['Titres monumentaux en Fraunces Serif', 'Filets d\'imprimerie horizontaux', 'Lettrines et italiques calligraphiées', 'Palette encre de Chine et papier ancien']
  }
];

export interface HistoryMilestone {
  year: string;
  title: string;
  label: string;
  summary: string;
  details: string;
  icon: string;
}

export const HISTORY_MILESTONES: HistoryMilestone[] = [
  {
    year: '1985',
    title: 'Option Informatique & Plan IPT',
    label: 'Les Pionniers du Lycée',
    summary: 'Le plan historique « Informatique pour Tous » introduit les premiers ordinateurs (Thomson MO5/TO7) et une option expérimentale d\'algorithmique.',
    details: 'Créée pour éveiller les lycéens à la programmation en Basic et LSE sur le célèbre Nanoréseau, cette première initiative visionnaire s\'est éteinte à la fin des années 90 avant de renaître.',
    icon: 'terminal'
  },
  {
    year: '2012',
    title: 'L\'enseignement ISN',
    label: 'La Première Renaissance',
    summary: 'L\'option ISN (Informatique et Sciences du Numérique) voit le jour en classe de Terminale S avec 2h hebdomadaires et des projets par équipe.',
    details: 'Face à l\'omniprésence du numérique, la France réintroduit la discipline. ISN pose les bases de l\'apprentissage par projets et démontre l\'appétit massif des élèves pour le code.',
    icon: 'school'
  },
  {
    year: '2019 — Aujourd\'hui',
    title: 'La Spécialité NSI',
    label: 'Une Discipline Scientifique Fondamentale',
    summary: 'Avec la réforme du Baccalauréat, NSI devient une véritable spécialité académique : 4h en 1ère, 6h en Terminale, coefficient 16.',
    details: 'Finie la simple initiation bureautique : NSI enseigne les piliers scientifiques réels (structures de données, complexité, von Neumann, SQL, réseaux) et s\'aligne sur les standards internationaux.',
    icon: 'verified'
  }
];

export interface PillarTopic {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  icon: string;
  summary: string;
  keyConcepts: string[];
  codeSample: {
    language: string;
    code: string;
    caption: string;
  };
}

export const PROGRAM_PILLARS: PillarTopic[] = [
  {
    id: 'data',
    number: '01',
    title: 'Données & Représentations',
    subtitle: 'De l\'octet aux bases relationnelles',
    icon: 'dataset',
    summary: 'Comprendre comment le monde réel s\'encode en mémoire. Des nombres binaires aux structures complexes.',
    keyConcepts: [
      'Encodage binaire, hexadécimal & virgule flottante',
      'Types construits : listes, dictionnaires, n-uplets',
      'Structures avancées : piles, files, arbres & graphes',
      'Bases de données relationnelles & langage SQL'
    ],
    codeSample: {
      language: 'SQL',
      code: `SELECT eleve.nom, projet.titre, projet.note
FROM eleves AS eleve
JOIN projets AS projet ON eleve.id = projet.auteur_id
WHERE projet.note >= 18
ORDER BY projet.note DESC;`,
      caption: 'Requête relationnelle SQL pour extraire et joindre des données'
    }
  },
  {
    id: 'algo',
    number: '02',
    title: 'Algorithmique & Efficacité',
    subtitle: 'L\'art de résoudre avec méthode',
    icon: 'psychology',
    summary: 'Concevoir des solutions optimales, évaluer leur coût en temps et en mémoire, et prouver leur validité.',
    keyConcepts: [
      'Complexité temporelle & spatiale (notion de grand O)',
      'Recherche dichotomique & tris (insertion, fusion, rapide)',
      'Algorithmes gloutons & programmation dynamique',
      'Parcours de graphes : largeur (BFS) et profondeur (DFS)'
    ],
    codeSample: {
      language: 'Python',
      code: `def recherche_dichotomique(liste, cible):
    debut, fin = 0, len(liste) - 1
    while debut <= fin:
        milieu = (debut + fin) // 2
        if liste[milieu] == cible:
            return milieu
        elif liste[milieu] < cible:
            debut = milieu + 1
        else:
            fin = milieu - 1
    return -1  # O(log n) garanti`,
      caption: 'Recherche dichotomique en complexité logarithmique O(log n)'
    }
  },
  {
    id: 'lang',
    number: '03',
    title: 'Langages & Programmation',
    subtitle: 'Python, Web et POO',
    icon: 'code',
    summary: 'Traduire la pensée logique en code robuste, modulaire, documenté et testé sous plusieurs paradigmes.',
    keyConcepts: [
      'Python comme langage maître d\'apprentissage',
      'Programmation Orientée Objet (Classes, Encapsulation, Héritage)',
      'Récursivité et pile d\'appels système',
      'Développement Web : HTML5, CSS3, DOM et JavaScript'
    ],
    codeSample: {
      language: 'Python',
      code: `class ArbreBinaire:
    def __init__(self, valeur, gauche=None, droite=None):
        self.valeur = valeur
        self.gauche = gauche
        self.droite = droite

    def hauteur(self):
        """Calcul récursif de la hauteur"""
        h_g = self.gauche.hauteur() if self.gauche else 0
        h_d = self.droite.hauteur() if self.droite else 0
        return 1 + max(h_g, h_d)`,
      caption: 'Structure de données récursive en Programmation Orientée Objet'
    }
  },
  {
    id: 'arch',
    number: '04',
    title: 'Architectures & Réseaux',
    subtitle: 'Sous le capot des machines',
    icon: 'memory',
    summary: 'Explorer les circuits matériels, le cœur des processeurs, le système d\'exploitation Linux et l\'Internet mondial.',
    keyConcepts: [
      'Modèle de von Neumann & cycle d\'instruction processeur',
      'Circuits logiques combinatoires (ET, OU, NON, XOR)',
      'Système d\'exploitation Unix/Linux & commandes shell bash',
      'Réseaux & protocoles : IP, TCP, DNS, HTTP et routage RIP/OSPF'
    ],
    codeSample: {
      language: 'Bash / Linux',
      code: `# Analyse réseau et gestion de processus sous Linux
$ ping -c 3 discover.nsi.xyz
$ ip route show
$ ps aux | grep python3
$ chmod 755 deployment.sh && ./deployment.sh`,
      caption: 'Commandes shell fondamentales sous environnement Linux'
    }
  }
];

export interface ProjectShowcase {
  id: string;
  title: string;
  category: string;
  difficulty: string;
  icon: string;
  summary: string;
  technologies: string[];
  challenge: string;
  outcome: string;
}

export const STUDENT_PROJECTS: ProjectShowcase[] = [
  {
    id: 'p1',
    title: 'Moteur de Jeu 2D Rétro & Physique',
    category: 'Jeu Vidéo & POO',
    difficulty: 'Intermédiaire',
    icon: 'sports_esports',
    summary: 'Création d\'un jeu de plateforme complet avec détection de collisions AABB, gravité, scrolling de caméra et gestionnaire de sons.',
    technologies: ['Python 3', 'Pygame', 'POO', 'State Machine'],
    challenge: 'Maintenir 60 FPS constants en optimisant le rafraîchissement des surfaces et le calcul des collisions.',
    outcome: 'Un jeu jouable à 100% avec plusieurs niveaux exportables au format JSON.'
  },
  {
    id: 'p2',
    title: 'Visualiseur de Graphes & Algorithme Dijkstra',
    category: 'Algorithmique Interactive',
    difficulty: 'Avancé',
    icon: 'hub',
    summary: 'Application interactive permettant de dessiner un réseau de villes, pondérer les routes et observer l\'algorithme de Dijkstra trouver le plus court chemin pas-à-pas.',
    technologies: ['Python', 'Tkinter / Canvas', 'Graphes', 'Dijkstra / A*'],
    challenge: 'Ralentir et animer visuellement l\'exploration de la file de priorité pour rendre l\'algorithme pédagogique.',
    outcome: 'Un outil interactif utilisé ensuite par les professeurs pour expliquer les réseaux.'
  },
  {
    id: 'p3',
    title: 'Plateforme Web Collaborative Lycée',
    category: 'Web Fullstack',
    difficulty: 'Intermédiaire',
    icon: 'language',
    summary: 'Développement d\'une application web permettant aux lycéens de partager des notes et de planifier des sessions de révision avec authentification sécurisée.',
    technologies: ['FastAPI / Flask', 'SQLite', 'HTML / CSS / JS', 'Jinja2'],
    challenge: 'Sécuriser les formulaires contre les injections SQL et hasher les mots de passe des utilisateurs.',
    outcome: 'Un site web réactif hébergé en local sur le réseau du lycée.'
  },
  {
    id: 'p4',
    title: 'Station Météo Connectée & Domotique',
    category: 'Systèmes Embarqués & IoT',
    difficulty: 'Tous niveaux',
    icon: 'sensors',
    summary: 'Mesure de température, humidité et qualité de l\'air via des capteurs physiques reliés à un microcontrôleur avec affichage sur écran OLED.',
    technologies: ['BBC Micro:bit', 'Raspberry Pi', 'MicroPython', 'Bus I2C'],
    challenge: 'Décoder les signaux numériques des capteurs environnementaux et transmettre les mesures par liaison radio.',
    outcome: 'Un boîtier autonome alimenté par batterie installé dans la classe.'
  },
  {
    id: 'p5',
    title: 'Stéganographie & Coffre-Fort d\'Images',
    category: 'Cybersécurité & Données',
    difficulty: 'Avancé',
    icon: 'lock',
    summary: 'Dissimulation imperceptible d\'un texte confidentiel dans les bits de poids faible (LSB) des pixels d\'une image PNG, avec chiffrement préalable.',
    technologies: ['Python', 'Pillow (PIL)', 'Opérations bit-à-bit', 'Chiffrement XOR / AES'],
    challenge: 'Manipuler directement les composantes RVB sans altérer la qualité visible de la photo pour l\'œil humain.',
    outcome: 'Un script capable d\'injecter et d\'extraire des fichiers secrets sans laisser de trace visuelle.'
  }
];

export interface PostBacPathway {
  id: string;
  title: string;
  badge: string;
  duration: string;
  target: string;
  icon: string;
  color: string;
  description: string;
  examples: string[];
}

export const POST_BAC_PATHWAYS: PostBacPathway[] = [
  {
    id: 'cpge',
    title: 'Prépas Scientifiques MP2I & MPI',
    badge: 'Voie Royale',
    duration: '2 ans',
    target: 'Grandes Écoles (ENS, X, Centrale, Mines, Télécom)',
    icon: 'workspace_premium',
    color: '#2563eb',
    description: 'La nouvelle filière d\'excellence des classes préparatoires spécialement créée pour les passionnés de NSI et de Mathématiques.',
    examples: ['CPGE MP2I (Lycée Louis-le-Grand, Saint-Louis, Le Parc...)', 'Concours Polytechnique, ENS, Mines-Ponts', 'Master d\'informatique théorique']
  },
  {
    id: 'ecoles',
    title: 'Grandes Écoles d\'Ingénieurs Post-Bac',
    badge: 'Direct 5 ans',
    duration: '5 ans',
    target: 'Titre d\'Ingénieur CTI certifié',
    icon: 'school',
    color: '#7c3aed',
    description: 'Intégrez directement une école d\'ingénieurs après le bac via concours (Puissance Alpha, Geipi Polytech, Avenir, Advance).',
    examples: ['Réseau INSA, UTC / UTT', 'Polytech (16 universités)', 'EPITA, ESIEE Paris, Télécom Saint-Étienne']
  },
  {
    id: 'univ',
    title: 'Universités & Licences d\'Excellence',
    badge: 'Recherche & Expertise',
    duration: 'Bac +3 à Bac +8',
    target: 'Masters de pointe, IA & Doctorat',
    icon: 'account_balance',
    color: '#059669',
    description: 'Parcours universitaires riches offrant une grande autonomie, doubles licences sélectives et cursus magistère vers la R&D.',
    examples: ['Licence Informatique & Math-Info', 'Double Licence IA / Science des Données', 'Licence MIASHS (Maths & Sciences Humaines)']
  },
  {
    id: 'but',
    title: 'BUT Informatique & Réseaux (IUT)',
    badge: 'Pratique & Professionnalisant',
    duration: '3 ans',
    target: 'Grade de Licence + Passerelles Écoles',
    icon: 'devices',
    color: '#ea580c',
    description: 'Formation très concrète en 3 ans alternant cours, ateliers et stages en entreprise. Plus de 50% des diplômés poursuivent en école d\'ingénieurs.',
    examples: ['BUT Informatique (Déploiement, Réalisation d\'applications)', 'BUT Réseaux & Télécommunications (Cybersécurité)', 'BUT MMI (Multimédia et Web)']
  }
];

export interface QuizQuestion {
  id: number;
  question: string;
  options: {
    label: string;
    description: string;
    profile: string;
    icon: string;
  }[];
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Quand tu penses à créer avec un ordinateur, qu\'est-ce qui t\'attire en premier ?',
    options: [
      { label: 'L\'architecture du système', description: 'Comprendre comment le processeur exécute chaque instruction en binaire', profile: 'system', icon: 'memory' },
      { label: 'La logique pure et les maths', description: 'Inventer des algorithmes élégants pour résoudre des énigmes complexes', profile: 'algo', icon: 'psychology' },
      { label: 'Le produit interactif', description: 'Construire des jeux, des interfaces web et des applications visibles', profile: 'creator', icon: 'web' },
      { label: 'La protection et le décodage', description: 'Comprendre les failles de sécurité, les réseaux et chiffrer des données', profile: 'cyber', icon: 'security' }
    ]
  },
  {
    id: 2,
    question: 'Quel super-pouvoir informatique aimerais-tu maîtriser dès la fin du lycée ?',
    options: [
      { label: 'Parler couramment Linux & Shell', description: 'Piloter des serveurs distants et configurer des réseaux mondiaux', profile: 'system', icon: 'terminal' },
      { label: 'Déjouer la complexité', description: 'Résoudre un problème en une milliseconde plutôt qu\'en un million d\'années', profile: 'algo', icon: 'speed' },
      { label: 'Programmer en équipe', description: 'Livrer un projet complet fonctionnel avec Python, BDD et interface graphique', profile: 'creator', icon: 'groups' },
      { label: 'Défendre les données sensibles', description: 'Auditer un protocole et déjouer les attaques sur le réseau', profile: 'cyber', icon: 'vpn_key' }
    ]
  },
  {
    id: 3,
    question: 'Ton projet de rêve au 3e trimestre de NSI : ce serait plutôt...',
    options: [
      { label: 'Une console rétro faite maison', description: 'Fabriquer une borne d\'arcade avec Raspberry Pi et manettes faites main', profile: 'system', icon: 'gamepad' },
      { label: 'Une IA qui joue aux échecs', description: 'Programmer un algorithme Minimax capable de battre tes camarades', profile: 'algo', icon: 'smart_toy' },
      { label: 'Une appli web pour ton lycée', description: 'Un réseau d\'entraide en ligne avec base SQL et design soigné', profile: 'creator', icon: 'apps' },
      { label: 'Un système d\'espionnage crypté', description: 'Un canal de messagerie chiffré de bout-en-bout avec stéganographie', profile: 'cyber', icon: 'enhanced_encryption' }
    ]
  }
];

export interface QuizProfileResult {
  title: string;
  subtitle: string;
  badge: string;
  description: string;
  recommendedProject: string;
  idealPath: string;
  icon: string;
}

export const QUIZ_PROFILES: Record<string, QuizProfileResult> = {
  system: {
    title: 'L\'Architecte Systèmes & Réseaux',
    subtitle: 'Passionné par le métal, les OS et l\'infrastructure',
    badge: 'Bas niveau & Performance',
    description: 'Tu aimes savoir exactement ce qui se passe sous le capot. Linux, les protocoles réseau et le modèle de von Neumann te passionneront.',
    recommendedProject: 'Station Météo Connectée & Automatisation Linux',
    idealPath: 'CPGE MP2I / MPI ou BUT Réseaux & Télécoms',
    icon: 'memory'
  },
  algo: {
    title: 'Le Stratège Algorithmique',
    subtitle: 'Amoureux de logique, de défis et d\'optimisation',
    badge: 'Mathématiques & Résolution',
    description: 'Pour toi, programmer est un jeu d\'échecs intellectuel. Trouver la structure de données parfaite et minimiser la complexité est ton kiff.',
    recommendedProject: 'Visualiseur de Graphes et Algorithme Dijkstra',
    idealPath: 'CPGE MP2I ou Licence Math-Info vers Master IA / Recherche',
    icon: 'psychology'
  },
  creator: {
    title: 'Le Bâtisseur d\'Applications',
    subtitle: 'Créatif, pragmatique et orienté utilisateur',
    badge: 'Produit & Plein Écran',
    description: 'Ce qui t\'anime, c\'est de voir tes lignes de code prendre vie sous forme de jeux ou d\'outils utiles que les autres peuvent tester.',
    recommendedProject: 'Moteur de Jeu 2D Pygame ou Plateforme Web Lycée',
    idealPath: 'Grandes Écoles d\'Ingénieurs Post-Bac (INSA, Polytech) ou BUT Info',
    icon: 'web'
  },
  cyber: {
    title: 'Le Gardien de la Cybersécurité',
    subtitle: 'Curieux des failles, de la cryptographie et de la défense',
    badge: 'Chiffrement & Sécurité',
    description: 'Tu as l\'âme d\'un enquêteur et d\'un bâtisseur de coffres-forts numériques. En NSI, tu découvriras les protocoles et la cryptographie moderne.',
    recommendedProject: 'Stéganographie & Chiffrement de Données',
    idealPath: 'Écoles d\'Ingénieurs spécialisées Cybersécurité ou BUT R&T',
    icon: 'security'
  }
};
