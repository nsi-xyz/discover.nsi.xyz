# discover.nsi.xyz — un contenu, quatre versions

Page de découverte de la spécialité **NSI** (Numérique et Sciences Informatiques)
au lycée, déclinée par **quatre modèles**, chacune réinterprétant le même contenu en
**neuf directions artistiques** : Flat, Material, skeuomorphisme, neumorphisme,
glassmorphisme, brutalisme, minimalisme, maximalisme et typographique.

Le site publié est la version **Astra**. Les autres versions restent
consultables depuis le pied de page de chacune.

| Version | Modèle | Prompteur | Coût | Jetons | Durée | Emplacement |
|---|---|---|---|---|---|---|
| **Astra** | GPT 6 | @ClovisReye | 13 € | 8 M | 37 min | **racine = page d'accueil** |
| DeepSeek | DeepSeek 4.1 Flash | @nsi_xyz | 0,13 € | 42 M | 42 min | `deepseek/` |
| Fable | Fable 5.1 | @dabogratinib | 6,30 $ | 2,2 M | 30 min | `fable/` |
| Gemini | Gemini 3.8 Flash | @nsi_xyz | 0 € | 50 k | 4 min | `gemini/` (build + sources) |

> Idée : [@nsi_xyz](https://twitter.com/nsi_xyz), prompté sur Gemini 3.8 Flash et
> DeepSeek 4.1 Flash par @nsi_xyz, sur Astra (GPT 6) par @ClovisReye, sur
> Fable 5.1 par @dabogratinib.

Chacune de ces versions a reçu **exactement le même prompt, en un seul envoi,
sans aucune modification**. Il est publié tel quel dans `prompt/` (page
« copier en un clic » + fichier `.txt`), accessible depuis chaque pied de page.

---

## Arborescence

```
index.html       page d'accueil = version Astra (styles.css + app.js à la racine)
deepseek/        version DeepSeek, autonome (index.html + styles/ + scripts/ + assets/)
fable/           version Fable 5.1, autonome (index.html + css/ + js/)
gemini/          version Gemini : build statique + sources Angular dans gemini/source/
prompt/          le prompt original du challenge (page « copier » + le-prompt.txt)
scripts/build-site.mjs  assemble worker/site (Astra + deepseek + fable + gemini + prompt)
preview.mjs      aperçu local complet  →  npm run dev  →  127.0.0.1:4173
.nojekyll        empêche Jekyll d'ignorer les dossiers commençant par un souligné
```

## Déploiement Cloudflare

Le déploiement est automatisé par `.github/workflows/deploy-cloudflare-pages.yml` :
`node scripts/build-site.mjs` assemble `worker/site/`, puis le Worker Cloudflare
(domaine `discover.nsi.xyz`) et un projet Pages publient ce dossier.

Reconstruire la version Gemini après une modification de `gemini/source/` :

```bash
cd gemini/source
npm install
npm run build
cp dist/app/browser/{index.html,index.csr.html,main-*.js,styles-*.css,favicon.ico} ..
```

## Liens entre les versions

Chaque version affiche dans son pied de page un bandeau **« Un contenu, quatre
versions »** : son propre coût, puis un lien vers les trois autres versions et
vers la page `prompt/`. Les liens sont **absolus** (`/`, `/deepseek/`,
`/fable/`, `/gemini/`, `/prompt/`) : ils fonctionnent à l'identique servis depuis
la racine du dépôt en local (`npm run dev`) comme en production.

## Ajouter une version plus tard

1. Déposer la nouvelle version dans un sous-dossier (`ma-version/`).
2. Copier le bloc `<div class="xnav">…</div>` d'un pied de page existant et
   l'adapter : nom, coût, et liens `/…` vers les autres versions.
3. Ajouter son bloc CSS `.xnav…` (structurellement identique ; seuls les jetons
   de couleur changent selon les variables de la version hôte).
4. Ajouter la ligne correspondante au tableau ci-dessus et le dossier à
   `scripts/build-site.mjs`.

Le bandeau ne dépend d'aucun script : HTML et CSS seulement, rien à maintenir
côté JavaScript.

## Vérifier en local

```bash
npm run dev   # aperçu complet sur http://127.0.0.1:4173/
```

- `http://127.0.0.1:4173/` → **Astra**, la page d'accueil
- `http://127.0.0.1:4173/deepseek/`, `…/fable/` et `…/gemini/` → les autres versions
- `http://127.0.0.1:4173/prompt/` → le prompt original, à copier ou télécharger
