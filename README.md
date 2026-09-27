# discover.nsi.xyz — un contenu, huit versions

Page de découverte de la spécialité **NSI** (Numérique et Sciences Informatiques)
au lycée, déclinée par **huit modèles**, chacune réinterprétant le même contenu en
**neuf directions artistiques** : Flat, Material, skeuomorphisme, neumorphisme,
glassmorphisme, brutalisme, minimalisme, maximalisme et typographique.

Le site publié est la version **Opus** (page d'accueil). Les autres versions
restent consultables depuis le pied de page de chacune.

| Version | Modèle | Prompteur | Coût | Jetons | Durée | Emplacement |
|---|---|---|---|---|---|---|
| Astra | GPT 6 | @ClovisReye | 13 € | 8 M | 37 min | `astra/` |
| DeepSeek | DeepSeek 4.1 Flash | @nsi_xyz | 0,13 € | 21 M | 42 min | `deepseek/` |
| Fable | Fable 5.1 | @dabogratinib | 6,30 $ | 2,2 M | 30 min | `fable/` |
| Gemini | Gemini 3.8 Flash | @nsi_xyz | forfait < 0,10 € | n.c. | 6 min | `gemini/` (site statique) |
| GLM | GLM 5.3 Flash | @nsi_xyz | 0,12 € | 1 M | 12 min | `glm/` |
| MiMo | MiMo V2.6 Flash | @nsi_xyz | 0,07 € | 4 M | 40 min | `mimo/` |
| MUSE | MUSE 1.3 Contributor | @nsi_xyz | 0,007 € | 200 k | 4 min | `muse/` |
| **Opus** | OPUS 5.5 | @dabogratinib | 13 € | 25 M | 1 h 21 | **racine = page d'accueil** + `opus/` |

> Idée : [@nsi_xyz](https://twitter.com/nsi_xyz), prompté sur Gemini 3.8 Flash,
> DeepSeek 4.1 Flash, GLM 5.3 Flash, MiMo V2.6 Flash et MUSE 1.3 Contributor par
> @nsi_xyz, sur Astra (GPT 6) par @ClovisReye, sur Fable 5.1 et OPUS 5.5 par
> @dabogratinib.

Chacune de ces versions a reçu **exactement le même prompt, en un seul envoi,
sans aucune modification**. Il est publié tel quel dans `prompt/` (page
« copier en un clic » + fichier `.txt`), accessible depuis chaque pied de page.

---

## Arborescence

```
index.html       page d'accueil = version Opus (assets/ à la racine)
assets/          ressources de la version Opus servie à la racine
astra/           version Astra, autonome (index.html + styles.css + app.js)
deepseek/        version DeepSeek, autonome (index.html + styles/ + scripts/ + assets/)
fable/           version Fable 5.1, autonome (index.html + css/ + js/)
gemini/          version Gemini 3.8 Flash, autonome (index.html + css/ + js/ + assets/)
glm/             version GLM 5.3 Flash, autonome (index.html + css/ + js/)
mimo/            version MiMo V2.6 Flash, autonome (index.html + assets/)
muse/            version MUSE 1.3 Contributor, autonome (index.html + styles.css + app.js)
opus/            version OPUS 5.5, autonome (index.html + assets/) — aussi servie à la racine
prompt/          le prompt original du challenge (page « copier » + le-prompt.txt)
scripts/build-site.mjs  assemble worker/site (racine = Opus + astra + deepseek + fable + gemini + glm + mimo + muse + opus + prompt)
preview.mjs      aperçu local complet  →  npm run dev  →  127.0.0.1:4173
.nojekyll        empêche Jekyll d'ignorer les dossiers commençant par un souligné
```

## Déploiement Cloudflare

Le déploiement est automatisé par `.github/workflows/deploy-cloudflare-pages.yml` :
`node scripts/build-site.mjs` assemble `worker/site/`, puis le Worker Cloudflare
(domaine `discover.nsi.xyz`) et un projet Pages publient ce dossier.

Toutes les versions sont désormais **statiques** : aucun build n'est nécessaire,
il suffit de déposer les fichiers de la version dans son dossier.

### Changer la page d'accueil

La racine est une copie de la version mise en avant (aujourd'hui `opus/`) : son
`index.html` et son dossier `assets/` sont posés à la racine du dépôt. Pour
mettre une autre version en avant, recopier de même son `index.html` et ses
ressources à la racine, puis adapter `scripts/build-site.mjs` (`FEATURED`). Chaque
version garde son URL stable (`/astra/`, `/deepseek/`, …, `/opus/`).

## Liens entre les versions

Chaque version affiche dans son pied de page un bandeau **« Un contenu, huit
versions »** : son propre coût, puis un lien vers les sept autres versions et
vers la page `prompt/`. Les liens sont **absolus** (`/astra/`, `/deepseek/`,
`/fable/`, `/gemini/`, `/glm/`, `/mimo/`, `/muse/`, `/opus/`, `/prompt/`) : ils
fonctionnent à l'identique servis depuis la racine du dépôt en local
(`npm run dev`) comme en production.

## Ajouter une version plus tard

1. Déposer la nouvelle version dans un sous-dossier (`ma-version/`).
2. Copier le bloc `<div class="xnav">…</div>` d'un pied de page existant et
   l'adapter : nom, coût, et liens `/…` vers les autres versions.
3. Ajouter son bloc CSS `.xnav…` (structurellement identique ; seuls les jetons
   de couleur changent selon les variables de la version hôte).
4. Ajouter la ligne correspondante au tableau ci-dessus et le dossier à la liste
   `VERSIONS` de `scripts/build-site.mjs`.

Le bandeau ne dépend d'aucun script : HTML et CSS seulement, rien à maintenir
côté JavaScript.

## Vérifier en local

```bash
npm run dev   # aperçu complet sur http://127.0.0.1:4173/
```

- `http://127.0.0.1:4173/` → **Opus**, la page d'accueil (aussi sur `…/opus/`)
- `http://127.0.0.1:4173/astra/`, `…/deepseek/`, `…/fable/`, `…/gemini/`, `…/glm/`, `…/mimo/` et `…/muse/` → les autres versions
- `http://127.0.0.1:4173/prompt/` → le prompt original, à copier ou télécharger
