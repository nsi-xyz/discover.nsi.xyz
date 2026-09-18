/**
 * theme-manager.js
 * Contrôleur central des 9 paradigmes de web design :
 * - Gestion des View Transitions natives de l'API moderne
 * - Synchronisation avec le dock de commande et l'inspecteur didactique
 * - Raccourcis clavier (touches 1 à 9, i pour inspecteur, s pour son)
 * - Persistance et accessibilité ARIA
 */

import { THEMES } from './theme-data.js';
import { soundEngine } from './sound-effects.js';

class ThemeManager {
  constructor() {
    this.currentTheme = 'flat';
    this.themeOrder = ['flat', 'material', 'skeuo', 'neumorph', 'glass', 'brutal', 'minimal', 'maximal', 'editorial'];
    this.inspectorOpen = false;
  }

  init() {
    // Récupération de la préférence enregistrée ou valeur par défaut
    const saved = localStorage.getItem('nsi-design-theme');
    if (saved && THEMES[saved]) {
      this.currentTheme = saved;
    } else {
      this.currentTheme = 'flat'; // Flat design par défaut (règle utilisateur)
    }

    this.applyTheme(this.currentTheme, false);
    this.setupDock();
    this.setupInspector();
    this.setupShortcuts();
    this.setupSoundToggle();
  }

  setTheme(themeId, playFeedback = true) {
    if (!THEMES[themeId] || this.currentTheme === themeId) return;

    if (playFeedback) {
      soundEngine.playThemeSound(themeId);
    }

    // Utilisation de la nouvelle API moderne View Transitions du navigateur si disponible
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        this.applyTheme(themeId, true);
      });
    } else {
      this.applyTheme(themeId, true);
    }
  }

  applyTheme(themeId, showToast = false) {
    this.currentTheme = themeId;
    localStorage.setItem('nsi-design-theme', themeId);

    // Application de l'attribut racine data-theme
    document.documentElement.setAttribute('data-theme', themeId);
    document.body.setAttribute('data-theme', themeId);

    // Mise à jour de l'interface du dock
    this.updateDockUI();

    // Mise à jour de l'inspecteur didactique
    this.updateInspectorUI();

    // Notification toast
    if (showToast) {
      this.showToast(THEMES[themeId]);
    }
  }

  setupDock() {
    const dockContainer = document.getElementById('theme-dock-list');
    if (!dockContainer) return;

    dockContainer.innerHTML = '';

    this.themeOrder.forEach((id, index) => {
      const theme = THEMES[id];
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `theme-pill-btn ${id === this.currentTheme ? 'is-active' : ''}`;
      btn.dataset.themeId = id;
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-selected', id === this.currentTheme ? 'true' : 'false');
      btn.setAttribute('title', `${theme.name} (Touche ${index + 1}) - ${theme.subtitle}`);

      btn.innerHTML = `
        <span class="pill-number">${index + 1}</span>
        <span class="pill-swatch pill-swatch-${id}"></span>
        <span class="pill-name">${theme.name}</span>
      `;

      btn.addEventListener('click', () => {
        this.setTheme(id);
      });

      dockContainer.appendChild(btn);
    });
  }

  updateDockUI() {
    const buttons = document.querySelectorAll('.theme-pill-btn');
    buttons.forEach((btn) => {
      const isActive = btn.dataset.themeId === this.currentTheme;
      btn.classList.toggle('is-active', isActive);
      btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    const activeThemeLabel = document.getElementById('active-theme-name-display');
    if (activeThemeLabel && THEMES[this.currentTheme]) {
      activeThemeLabel.textContent = THEMES[this.currentTheme].name;
    }
  }

  setupInspector() {
    const inspectorDrawer = document.getElementById('design-inspector-drawer');
    const openBtn = document.getElementById('btn-open-inspector');
    const closeBtn = document.getElementById('btn-close-inspector');
    const backdrop = document.getElementById('inspector-backdrop');

    if (!inspectorDrawer) return;

    const toggle = (open) => {
      this.inspectorOpen = typeof open === 'boolean' ? open : !this.inspectorOpen;
      inspectorDrawer.classList.toggle('is-open', this.inspectorOpen);
      if (backdrop) backdrop.classList.toggle('is-visible', this.inspectorOpen);
      inspectorDrawer.setAttribute('aria-hidden', (!this.inspectorOpen).toString());
      if (openBtn) openBtn.setAttribute('aria-expanded', this.inspectorOpen.toString());
      if (this.inspectorOpen) {
        soundEngine.playTone(600, 'sine', 0.05, 0.1);
      }
    };

    if (openBtn) openBtn.addEventListener('click', () => toggle(true));
    if (closeBtn) closeBtn.addEventListener('click', () => toggle(false));
    if (backdrop) backdrop.addEventListener('click', () => toggle(false));

    // Mettre à jour le contenu
    this.updateInspectorUI();
  }

  updateInspectorUI() {
    const theme = THEMES[this.currentTheme];
    if (!theme) return;

    const nameEl = document.getElementById('inspector-theme-name');
    const subEl = document.getElementById('inspector-theme-subtitle');
    const periodEl = document.getElementById('inspector-theme-period');
    const pioneersEl = document.getElementById('inspector-theme-pioneers');
    const philEl = document.getElementById('inspector-theme-philosophy');
    const cssCodeEl = document.getElementById('inspector-theme-css');
    const featuresListEl = document.getElementById('inspector-theme-features');
    const strengthsEl = document.getElementById('inspector-theme-strengths');
    const limitsEl = document.getElementById('inspector-theme-limits');
    const quoteEl = document.getElementById('inspector-theme-quote');
    const badgeEl = document.getElementById('inspector-theme-badge');

    if (nameEl) nameEl.textContent = theme.name;
    if (subEl) subEl.textContent = theme.subtitle;
    if (periodEl) periodEl.textContent = theme.period;
    if (pioneersEl) pioneersEl.textContent = theme.pioneers;
    if (philEl) philEl.textContent = theme.philosophy;
    if (cssCodeEl) cssCodeEl.textContent = theme.cssFormula;
    if (strengthsEl) strengthsEl.textContent = theme.strengths;
    if (limitsEl) limitsEl.textContent = theme.limitations;
    if (quoteEl) quoteEl.textContent = theme.quote;
    if (badgeEl) {
      badgeEl.textContent = `Style #${theme.number} / 9`;
      badgeEl.style.backgroundColor = theme.badgeColor;
    }

    if (featuresListEl) {
      featuresListEl.innerHTML = '';
      theme.keyFeatures.forEach((feat) => {
        const li = document.createElement('li');
        li.textContent = feat;
        featuresListEl.appendChild(li);
      });
    }
  }

  setupShortcuts() {
    window.addEventListener('keydown', (e) => {
      // Ne pas intercepter si l'utilisateur saisit dans un input
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) {
        return;
      }

      // Touches 1 à 9 pour changer de style
      const keyNum = parseInt(e.key, 10);
      if (keyNum >= 1 && keyNum <= 9) {
        e.preventDefault();
        const targetTheme = this.themeOrder[keyNum - 1];
        if (targetTheme) {
          this.setTheme(targetTheme);
        }
      }

      // Touche 'i' pour ouvrir/fermer l'inspecteur de design
      if (e.key.toLowerCase() === 'i') {
        const drawer = document.getElementById('design-inspector-drawer');
        if (drawer) {
          const isOpen = drawer.classList.contains('is-open');
          const openBtn = document.getElementById('btn-open-inspector');
          const closeBtn = document.getElementById('btn-close-inspector');
          if (isOpen && closeBtn) closeBtn.click();
          else if (!isOpen && openBtn) openBtn.click();
        }
      }

      // Touche 'Escape' pour fermer les modales
      if (e.key === 'Escape') {
        const closeBtn = document.getElementById('btn-close-inspector');
        if (closeBtn) closeBtn.click();
      }

      // Touche 's' pour activer/désactiver les sons haptiques
      if (e.key.toLowerCase() === 's') {
        const soundBtn = document.getElementById('btn-toggle-sound');
        if (soundBtn) soundBtn.click();
      }
    });
  }

  setupSoundToggle() {
    const soundBtn = document.getElementById('btn-toggle-sound');
    if (!soundBtn) return;

    soundBtn.addEventListener('click', () => {
      const isEnabled = soundEngine.toggle();
      soundBtn.classList.toggle('is-muted', !isEnabled);
      soundBtn.setAttribute('aria-pressed', isEnabled.toString());
      soundBtn.setAttribute('title', isEnabled ? 'Effets sonores activés (Touche S)' : 'Effets sonores coupés (Touche S)');

      const label = soundBtn.querySelector('.sound-btn-label');
      if (label) {
        label.textContent = isEnabled ? 'Son : Activé' : 'Son : Muet';
      }

      const icon = soundBtn.querySelector('.sound-icon');
      if (icon) {
        icon.innerHTML = isEnabled
          ? `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>`
          : `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>`;
      }
    });
  }

  showToast(theme) {
    let toast = document.getElementById('theme-toast-notify');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'theme-toast-notify';
      toast.className = 'theme-toast';
      document.body.appendChild(toast);
    }

    toast.innerHTML = `
      <div class="toast-header">
        <span class="toast-indicator" style="background: ${theme.badgeColor}"></span>
        <strong class="toast-title">${theme.name}</strong>
        <span class="toast-badge">#${theme.number}/9</span>
      </div>
      <div class="toast-sub">${theme.subtitle}</div>
    `;

    toast.classList.add('is-visible');
    clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => {
      toast.classList.remove('is-visible');
    }, 2800);
  }
}

export const themeManager = new ThemeManager();
