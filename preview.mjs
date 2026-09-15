/* Aperçu local du dépôt complet, servi comme en production :
   Astra à la racine, DeepSeek dans son dossier, Gemini depuis son build. */
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, extname, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('.', import.meta.url));
const port = Number(process.env.PORT || 4173);
if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('PORT invalide.');

const MIME = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8', '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon', '.png': 'image/png', '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8'
};

/* Équivalent local des règles `_redirects` de Cloudflare Pages :
   la version Gemini est publiée depuis son dossier de build. */
const REDIRECTS = [
  [/^\/gemini\/$/, '/gemini/dist/index.html'],
  [/^\/gemini\/(?!dist\/)(.*)$/, '/gemini/dist/$1']
];

createServer(async (request, response) => {
  if (!['GET', 'HEAD'].includes(request.method)) {
    response.writeHead(405, { Allow: 'GET, HEAD' });
    return response.end();
  }
  let pathname;
  try { pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname); }
  catch { response.writeHead(400); return response.end('Requête invalide.'); }

  for (const [re, to] of REDIRECTS) {
    if (re.test(pathname)) { pathname = pathname.replace(re, to); break; }
  }
  if (pathname.endsWith('/')) pathname += 'index.html';

  const file = join(ROOT, normalize(pathname).replace(/^(\.\.[/\\])+/, ''));
  try {
    const s = await stat(file);
    if (s.isDirectory()) { response.writeHead(302, { Location: pathname + '/' }); return response.end(); }
    const data = await readFile(file);
    response.writeHead(200, {
      'Content-Type': MIME[extname(file)] || 'application/octet-stream',
      'Content-Length': data.length,
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff'
    });
    response.end(request.method === 'HEAD' ? undefined : data);
  } catch { response.writeHead(404); response.end('Page introuvable.'); }
}).listen(port, '127.0.0.1', () => {
  console.log(`discover.nsi.xyz (aperçu local) : http://127.0.0.1:${port}/`);
});
