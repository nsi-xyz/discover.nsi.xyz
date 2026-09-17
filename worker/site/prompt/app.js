/* Page « le prompt » : affiche le texte original et le copie en un clic.
   Source unique : le-prompt.txt (le prompt à soumettre, sans son en-tête). */
const out = document.getElementById('prompt');
const copyBtn = document.getElementById('copy');
const status = document.getElementById('status');
let promptText = '';

const ready = fetch('le-prompt.txt', { cache: 'no-store' })
  .then((response) => {
    if (!response.ok) throw new Error('HTTP ' + response.status);
    return response.text();
  })
  .then((text) => {
    promptText = text.replace(/\s+$/, '');
    if (out) out.textContent = promptText;
  })
  .catch(() => {
    if (out) out.textContent = "Le prompt n'a pas pu être chargé ici. Utilisez le bouton « Télécharger le .txt ».";
  });

copyBtn?.addEventListener('click', async () => {
  await ready;
  if (!promptText) {
    if (status) status.textContent = 'Copie impossible depuis cette page : téléchargez le fichier .txt.';
    return;
  }
  try {
    await navigator.clipboard.writeText(promptText);
    if (status) status.textContent = 'Prompt copié — collez-le tel quel, en un seul envoi.';
  } catch {
    if (out) {
      const range = document.createRange();
      range.selectNodeContents(out);
      const selection = getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    }
    if (status) status.textContent = 'Prompt sélectionné : copiez-le avec Ctrl/Cmd + C.';
  }
});
