/**
 * interactive-nsi.js
 * Modules interactifs pédagogiques :
 * 1. Mini-Lab NSI (Binaire interactif & Tri par sélection animé)
 * 2. Simulateur officiel de note du Baccalauréat NSI (Coef 16)
 * 3. Quiz d'auto-positionnement d'orientation pour les élèves de 2nde
 */

export function initInteractiveNSI() {
  initBinaryVisualizer();
  initSortVisualizer();
  initBacSimulator();
  initQuiz();
}

/* ==========================================================================
   1. VISUALISEUR BINAIRE / OCTET INTERACTIF
   ========================================================================== */
function initBinaryVisualizer() {
  const inputDecimal = document.getElementById('binary-input-dec');
  const bitsContainer = document.getElementById('binary-bits-grid');
  const outputHex = document.getElementById('binary-output-hex');
  const outputChar = document.getElementById('binary-output-char');

  if (!inputDecimal || !bitsContainer) return;

  function renderBits(val) {
    val = Math.max(0, Math.min(255, parseInt(val) || 0));
    inputDecimal.value = val;
    bitsContainer.innerHTML = '';

    for (let i = 7; i >= 0; i--) {
      const bitValue = 1 << i;
      const isSet = (val & bitValue) !== 0;

      const bitBtn = document.createElement('button');
      bitBtn.type = 'button';
      bitBtn.className = `bit-box ${isSet ? 'bit-on' : 'bit-off'}`;
      bitBtn.setAttribute('aria-label', `Bit 2^${i} (valeur ${bitValue}), actuellement ${isSet ? '1' : '0'}`);
      bitBtn.innerHTML = `
        <span class="bit-weight">2<sup>${i}</sup></span>
        <span class="bit-digit">${isSet ? '1' : '0'}</span>
        <span class="bit-val">${bitValue}</span>
      `;

      bitBtn.addEventListener('click', () => {
        const newVal = val ^ bitValue;
        renderBits(newVal);
      });

      bitsContainer.appendChild(bitBtn);
    }

    if (outputHex) {
      outputHex.textContent = '0x' + val.toString(16).toUpperCase().padStart(2, '0');
    }
    if (outputChar) {
      // Affichage ASCII si imprimable
      outputChar.textContent = (val >= 32 && val <= 126) ? `'${String.fromCharCode(val)}'` : '(Non imprimable)';
    }
  }

  inputDecimal.addEventListener('input', (e) => {
    renderBits(e.target.value);
  });

  // Initialisation à 42 (Le nombre fétiche des informaticiens)
  renderBits(42);
}

/* ==========================================================================
   2. SIMULATEUR DE TRI PAR SÉLECTION
   ========================================================================== */
function initSortVisualizer() {
  const container = document.getElementById('sort-array-container');
  const stepBtn = document.getElementById('sort-step-btn');
  const resetBtn = document.getElementById('sort-reset-btn');
  const logEl = document.getElementById('sort-status-log');

  if (!container || !stepBtn || !resetBtn) return;

  let array = [42, 17, 89, 5, 23, 64, 12];
  let currentI = 0;
  let currentJ = 1;
  let minIdx = 0;
  let isSorted = false;

  function renderBars() {
    container.innerHTML = '';
    const maxVal = Math.max(...array);

    array.forEach((val, idx) => {
      const bar = document.createElement('div');
      bar.className = 'sort-bar-item';
      if (isSorted) {
        bar.classList.add('is-sorted');
      } else if (idx === currentI) {
        bar.classList.add('is-current-i');
      } else if (idx === currentJ) {
        bar.classList.add('is-current-j');
      } else if (idx === minIdx) {
        bar.classList.add('is-min');
      }

      const heightPercent = Math.round((val / maxVal) * 80) + 15;
      bar.innerHTML = `
        <div class="bar-fill" style="height: ${heightPercent}%;"></div>
        <span class="bar-value">${val}</span>
        <span class="bar-idx">[${idx}]</span>
      `;
      container.appendChild(bar);
    });
  }

  function step() {
    if (isSorted) {
      if (logEl) logEl.innerHTML = '<strong>Tableau déjà entièrement trié !</strong> Complexité globale $\\mathcal{O}(n^2)$ vérifiée.';
      return;
    }

    if (currentJ < array.length) {
      if (array[currentJ] < array[minIdx]) {
        minIdx = currentJ;
        if (logEl) logEl.innerHTML = `Nouveau minimum trouvé : <strong>${array[minIdx]}</strong> à l'indice ${minIdx}`;
      } else {
        if (logEl) logEl.innerHTML = `Comparaison : ${array[currentJ]} $\\ge$ ${array[minIdx]} (minimum inchangé)`;
      }
      currentJ++;
    } else {
      // Fin de la passe, échange
      if (minIdx !== currentI) {
        const temp = array[currentI];
        array[currentI] = array[minIdx];
        array[minIdx] = temp;
        if (logEl) logEl.innerHTML = `Échange de ${array[currentI]} et ${array[minIdx]} pour placer l'élément à l'indice ${currentI}`;
      } else {
        if (logEl) logEl.innerHTML = `L'élément ${array[currentI]} est déjà à sa position finale triée.`;
      }
      currentI++;
      minIdx = currentI;
      currentJ = currentI + 1;

      if (currentI >= array.length - 1) {
        isSorted = true;
        if (logEl) logEl.innerHTML = '<strong>Tri terminé avec succès !</strong> Invariant de boucle respecté : la tranche [0..i] est ordonnée.';
      }
    }
    renderBars();
  }

  function reset() {
    array = [42, 17, 89, 5, 23, 64, 12];
    currentI = 0;
    currentJ = 1;
    minIdx = 0;
    isSorted = false;
    if (logEl) logEl.textContent = 'Tableau réinitialisé. Cliquez sur "Étape suivante" pour observer le tri.';
    renderBars();
  }

  stepBtn.addEventListener('click', step);
  resetBtn.addEventListener('click', reset);
  renderBars();
}

/* ==========================================================================
   3. SIMULATEUR OFFICIEL DU BACCALAURÉAT NSI (COEFFICIENT 16)
   ========================================================================== */
function initBacSimulator() {
  const noteEcrit = document.getElementById('bac-note-ecrit');
  const notePratique = document.getElementById('bac-note-pratique');
  const noteGlobaleEl = document.getElementById('bac-note-globale');
  const pointsBacEl = document.getElementById('bac-points-total');
  const mentionEl = document.getElementById('bac-mention-badge');

  if (!noteEcrit || !notePratique || !noteGlobaleEl || !pointsBacEl) return;

  function calculate() {
    const ecrit = parseFloat(noteEcrit.value) || 0;
    const pratique = parseFloat(notePratique.value) || 0;

    // En Terminale NSI : Écrit sur 20 coef 12 + Pratique sur 20 coef 4 = Note NSI sur 20
    const noteFinale = ((ecrit * 12) + (pratique * 4)) / 16;
    const pointsTotal = Math.round(noteFinale * 16);

    noteGlobaleEl.textContent = noteFinale.toFixed(2) + ' / 20';
    pointsBacEl.textContent = `${pointsTotal} pts`;

    if (mentionEl) {
      if (noteFinale >= 16) {
        mentionEl.textContent = 'Très Bien (Félicitations du jury possibles)';
        mentionEl.className = 'bac-mention mb-tb';
      } else if (noteFinale >= 14) {
        mentionEl.textContent = 'Bien (Profil très favorable post-bac)';
        mentionEl.className = 'bac-mention mb-b';
      } else if (noteFinale >= 12) {
        mentionEl.textContent = 'Assez Bien (Bonne maîtrise générale)';
        mentionEl.className = 'bac-mention mb-ab';
      } else if (noteFinale >= 10) {
        mentionEl.textContent = 'Admis (Socle de compétences validé)';
        mentionEl.className = 'bac-mention mb-admis';
      } else {
        mentionEl.textContent = 'En dessous de la moyenne';
        mentionEl.className = 'bac-mention mb-ajourne';
      }
    }
  }

  noteEcrit.addEventListener('input', calculate);
  notePratique.addEventListener('input', calculate);
  calculate();
}

/* ==========================================================================
   4. QUIZ D'ORIENTATION NSI (POUR ÉLÈVES DE 2NDE)
   ========================================================================== */
function initQuiz() {
  const form = document.getElementById('nsi-quiz-form');
  const resultContainer = document.getElementById('nsi-quiz-result');
  const titleEl = document.getElementById('quiz-result-title');
  const descEl = document.getElementById('quiz-result-desc');

  if (!form || !resultContainer) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const q1 = form.querySelector('input[name="q1"]:checked')?.value;
    const q2 = form.querySelector('input[name="q2"]:checked')?.value;
    const q3 = form.querySelector('input[name="q3"]:checked')?.value;

    if (!q1 || !q2 || !q3) {
      alert('Veuillez répondre aux 3 questions pour découvrir votre profil !');
      return;
    }

    let profile = {
      title: 'Profil : Créateur & Ingénieur Numérique',
      desc: 'Vous possédez exactement l’état d’esprit requis en NSI : la curiosité pour comprendre les mécanismes sous le capot, l\'envie de résoudre des problèmes concrets et la passion de bâtir des projets d\'envergure.'
    };

    if (q1 === 'system' && q2 === 'logic') {
      profile = {
        title: 'Profil : Futur Architecte Systèmes & Cybersécurité',
        desc: 'Vous êtes fasciné par les rouages internes de la machine, les protocoles réseau et la rigueur algorithmique. En NSI, les modules d’architecture matérielle, de routage TCP/IP et d’optimisation seront vos terrains de jeu favoris.'
      };
    } else if (q3 === 'ai' || q1 === 'math') {
      profile = {
        title: 'Profil : Futur Data Scientist & Chercheur en Algorithmique',
        desc: 'L’abstraction mathématique, les graphes et la puissance du traitement des données vous stimulent. La NSI vous ouvrira grand les portes des CPGE MP2I ou des doubles licences Maths-Info pour forger l’intelligence artificielle de demain.'
      };
    } else if (q3 === 'creative' || q1 === 'dev') {
      profile = {
        title: 'Profil : Concepteur Logiciel & Développeur Full-Stack',
        desc: 'Vous aimez voir vos idées prendre vie immédiatement à travers des applications, des jeux vidéo ou des plateformes interactives. Le quart d\'horaire consacré aux projets d\'équipe en NSI vous permettra d\'exprimer toute votre créativité technique.'
      };
    }

    if (titleEl) titleEl.textContent = profile.title;
    if (descEl) descEl.textContent = profile.desc;
    resultContainer.style.display = 'block';
    resultContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
}
