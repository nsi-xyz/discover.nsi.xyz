# discover.nsi.xyz — Une page, neuf styles

Landing page de découverte de la spécialité NSI. Le contenu HTML est écrit une seule fois ;
neuf feuilles de style l'habillent différemment. Le sélecteur (touches 1 à 9, ou le dock en bas)
ne change qu'un attribut : `<html data-style="…">`.

## Structure

```
index.html              contenu (sémantique, identique pour tous les styles)
css/base.css            tokens par défaut, grille, rythme, dock, transitions
css/themes/flat.css     1  Flat Design
css/themes/material.css 2  Material Design
css/themes/skeuo.css    3  Skeuomorphisme
css/themes/neumorphism.css 4 Neumorphisme
css/themes/glass.css    5  Glassmorphisme
css/themes/brutalism.css 6 Brutalisme
css/themes/minimalism.css 7 Minimalisme
css/themes/maximalism.css 8 Maximalisme
css/themes/typo.css     9  Typographique
js/app.js               sélecteur, raccourcis clavier, hash d'URL, mémoire locale, View Transitions
```

## Déploiement

Site 100 % statique : copier le dossier tel quel sur n'importe quel hébergeur.
Aucune étape de build. Les polices viennent de Google Fonts.

Chaque style est adressable par URL : `discover.nsi.xyz/#brutalism`.

## Pour la classe

Chaque fichier de thème commence par un commentaire qui résume le paradigme.
Ouvrir l'inspecteur, changer `data-style` à la main, et observer : c'est le chapitre
« Interactions homme-machine sur le web » en action.
