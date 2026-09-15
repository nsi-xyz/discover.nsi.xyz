# discover.nsi.xyz — un contenu, quatre versions

Page de découverte de la spécialité **NSI** (Numérique et Sciences Informatiques)
au lycée, déclinée par quatre modèles, chacune réinterprétant le même contenu en
**neuf directions artistiques** : Flat, Material, skeuomorphisme, neumorphisme,
glassmorphisme, brutalisme, minimalisme, maximalisme et typographique.

Le site publié est la version **Astra**. Les autres versions restent
consultables depuis le pied de page de chacune.

| Version | Modèle | Prompteur | Coût | Jetons | Durée | Emplacement |
|---|---|---|---|---|---|---|
| **Astra** | GPT 6 | @ClovisReye | 13 € | 8 M | 37 min | racine (`dist/`) |
| DeepSeek | DeepSeek 4.1 Flash | @nsi_xyz | 0,13 € | 42 M | 42 min | `deepseek/` |
| Gemini | Gemini 3.8 Flash | @nsi_xyz | 0 € | 50 k | 4 min | `gemini/` (sources) |

> Idée : [@nsi_xyz](https://twitter.com/nsi_xyz), prompté sur Gemini 3.8 Flash et
> DeepSeek 4.1 Flash par @nsi_xyz, prompté sur Astra (GPT 6) : @ClovisReye.

---

## Arborescence

```
dist/            site Astra publié : index.html, styles.css, app.js (100 % statique)
deepseek/        version DeepSeek, autonome (index.html + styles/ + scripts/ + assets/)
gemini/          sources Angular de la version Gemini (à compiler, voir plus bas)
preview.mjs      serveur local du site Astra  →  npm run dev  →  127.0.0.1:4173
CNAME            discover.nsi.xyz
.nojekyll        empêche Jekyll d'ignorer les dossiers commençant par un souligné
```

## Déploiement Cloudflare (100 % statique)

- **Build command** : *(aucune)*
- **Output directory** : `dist`
- **Domaine** : `discover.nsi.xyz` (fichier `CNAME` fourni)

Aucun Worker, aucune fonction serveur : le site Astra est du HTML/CSS/JS pur.

La version Gemini est une application Angular livrée **en sources** ; pour la
mettre en ligne, la compiler puis publier son `dist/app/browser` :

```bash
cd gemini
npm install
npm run build
# sortie : gemini/dist/app/browser/
```

## Liens entre les versions

Chaque version affiche dans son pied de page un bandeau **« Un contenu, quatre
versions »** : son propre coût, puis un lien vers les autres. Les liens sont
**relatifs** (`../`, `../deepseek/`, `../gemini/`), donc fonctionnels en local
comme en ligne, y compris depuis un sous-dossier.

## Ajouter une version plus tard

1. Déposer la nouvelle version dans un sous-dossier (`ma-version/`).
2. Copier le bloc `<div class="xnav">…</div>` d'un pied de page existant et
   l'adapter : nom, coût, et liens `../…` vers les autres versions.
3. Ajouter son bloc CSS `.xnav…` (structurellement identique ; seuls les jetons
   de couleur changent selon les variables de la version hôte).
4. Ajouter la ligne correspondante au tableau ci-dessus.

Le bandeau ne dépend d'aucun script : HTML et CSS seulement, rien à maintenir
côté JavaScript.

## Vérifier en local

```bash
npm run dev                  # site Astra sur http://127.0.0.1:4173/
python3 -m http.server 8000  # ou tout serveur statique à la racine du dépôt
```

Puis `http://127.0.0.1:8000/dist/`, `…/deepseek/`, `…/gemini/`.
