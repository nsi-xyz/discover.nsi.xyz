/**
 * main.js
 * Point d'entrée principal de l'application web discover.nsi.xyz
 */

import { themeManager } from './theme-manager.js';
import { initInteractiveNSI } from './interactive-nsi.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialiser le gestionnaire des 9 thèmes
  themeManager.init();

  // 2. Initialiser les modules pédagogiques interactifs
  initInteractiveNSI();

  // 3. Gestion du menu de navigation mobile / burger
  const navToggle = document.getElementById('mobile-nav-toggle');
  const navLinks = document.getElementById('primary-nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', (!expanded).toString());
      navLinks.classList.toggle('is-open', !expanded);
    });

    // Fermer le menu lors du clic sur un lien
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('is-open');
      });
    });
  }

  // 4. Défilement doux (Smooth scroll) pour les ancres
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId) return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // 5. Révélation d'éléments au défilement (Intersection Observer pour animations légères)
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observer.observe(el);
    });
  }
});
