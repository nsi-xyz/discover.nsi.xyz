/* Assemble le site publié dans worker/site :
   Astra à la racine, DeepSeek, Fable, Gemini et GLM dans leurs sous-dossiers,
   la page « prompt » à part. Le même dossier alimente le Worker
   (domaine discover.nsi.xyz) et Pages. */
import { cp, rm, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const OUT = join(ROOT, 'worker', 'site');

await rm(OUT, { recursive: true, force: true });

/* Astra : à la racine */
for (const f of ['index.html', 'styles.css', 'app.js', '.nojekyll', '_redirects']) {
  if (existsSync(join(ROOT, f))) await cp(join(ROOT, f), join(OUT, f));
}
/* DeepSeek : dossier autonome */
await cp(join(ROOT, 'deepseek'), join(OUT, 'deepseek'), { recursive: true });

/* Fable : dossier autonome */
await cp(join(ROOT, 'fable'), join(OUT, 'fable'), { recursive: true });

/* Gemini : dossier autonome (site statique, plus de build Angular) */
await cp(join(ROOT, 'gemini'), join(OUT, 'gemini'), { recursive: true });

/* GLM : dossier autonome */
await cp(join(ROOT, 'glm'), join(OUT, 'glm'), { recursive: true });

/* Page « le prompt » (texte brut + copie en un clic) */
await cp(join(ROOT, 'prompt'), join(OUT, 'prompt'), { recursive: true });

const count = (await readdir(OUT, { recursive: true })).length;
console.log(`Site assemblé dans worker/site (${count} entrées)`);
