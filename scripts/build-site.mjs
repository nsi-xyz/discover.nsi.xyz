/* Assemble le site publié dans worker/site :
   la version mise en avant (Opus) est servie à la racine ET dans son dossier ;
   chaque version (Astra, DeepSeek, Fable, Gemini, GLM, MiMo, MUSE, Opus) a son
   dossier autonome, la page « prompt » à part. Le même dossier alimente le
   Worker (domaine discover.nsi.xyz) et Pages. */
import { cp, rm, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const OUT = join(ROOT, 'worker', 'site');

/* La version mise en avant : à la racine, et aussi consultable via son dossier. */
const FEATURED = 'opus';
const VERSIONS = ['astra', 'deepseek', 'fable', 'gemini', 'glm', 'mimo', 'muse', 'opus'];

await rm(OUT, { recursive: true, force: true });

/* Racine = page d'accueil (la version mise en avant) + fichiers du dépôt. */
for (const f of ['index.html', 'assets', '.nojekyll', '_redirects']) {
  if (existsSync(join(ROOT, f))) await cp(join(ROOT, f), join(OUT, f), { recursive: true });
}

/* Chaque version dans son propre dossier, autonome. */
for (const v of VERSIONS) {
  await cp(join(ROOT, v), join(OUT, v), { recursive: true });
}

/* Page « le prompt » (texte brut + copie en un clic) */
await cp(join(ROOT, 'prompt'), join(OUT, 'prompt'), { recursive: true });

const count = (await readdir(OUT, { recursive: true })).length;
console.log(`Site assemblé dans worker/site (${count} entrées), page d'accueil = ${FEATURED}`);
