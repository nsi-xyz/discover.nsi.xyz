/**
 * sound-effects.js
 * Moteur audio Web Audio API synthétique (zéro ressource externe).
 * Produit des textures sonores distinctes adaptées à chaque paradigme de design.
 */

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.enabled = false; // Désactivé par défaut pour respecter l'utilisateur
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggle() {
    this.enabled = !this.enabled;
    if (this.enabled) {
      this.init();
      this.playBeep(520, 0.08, 'sine');
    }
    return this.enabled;
  }

  playThemeSound(themeId) {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;

    switch (themeId) {
      case 'flat':
        // Clic sec, net et moderne
        this.playTone(880, 'square', 0.03, 0.15);
        break;

      case 'material':
        // Onde douce (ripple sound)
        this.playSweep(300, 600, 'sine', 0.1, 0.2);
        break;

      case 'skeuo':
        // Clac d'interrupteur mécanique lourd
        this.playMechanicalClick();
        break;

      case 'neumorph':
        // Goutte / Pop plastique doux
        this.playPop(440, 220, 0.08);
        break;

      case 'glass':
        // Tintement cristallin
        this.playChime([1200, 1800, 2400]);
        break;

      case 'brutal':
        // 8-bit blip punchy
        this.playTone(220, 'sawtooth', 0.06, 0.3);
        break;

      case 'minimal':
        // Déclic d'obturateur ultra discret
        this.playNoiseClick();
        break;

      case 'maximal':
        // Accord pop scintillant
        this.playChime([523.25, 659.25, 783.99, 1046.50]);
        break;

      case 'editorial':
        // Frappe de machine à écrire mécanique
        this.playTypewriter();
        break;

      default:
        this.playTone(440, 'sine', 0.05, 0.1);
    }
  }

  playTone(freq, type, duration, vol = 0.15) {
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(vol, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {}
  }

  playSweep(startFreq, endFreq, type, duration, vol = 0.15) {
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(startFreq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(endFreq, this.ctx.currentTime + duration);
      gain.gain.setValueAtTime(vol, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {}
  }

  playBeep(freq, duration, type = 'sine') {
    this.playTone(freq, type, duration, 0.12);
  }

  playPop(freqStart, freqEnd, duration) {
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.frequency.setValueAtTime(freqStart, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freqEnd, this.ctx.currentTime + duration);
      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {}
  }

  playChime(freqs) {
    freqs.forEach((f, i) => {
      setTimeout(() => {
        if (this.ctx) this.playTone(f, 'sine', 0.18, 0.08);
      }, i * 35);
    });
  }

  playMechanicalClick() {
    try {
      // Deux bruits très rapprochés : impact + ressort
      this.playTone(180, 'triangle', 0.04, 0.25);
      setTimeout(() => {
        if (this.ctx) this.playTone(420, 'square', 0.03, 0.15);
      }, 25);
    } catch (e) {}
  }

  playTypewriter() {
    try {
      this.playTone(600, 'triangle', 0.02, 0.2);
      setTimeout(() => {
        if (this.ctx) this.playTone(120, 'sine', 0.04, 0.15);
      }, 15);
    } catch (e) {}
  }

  playNoiseClick() {
    try {
      const bufferSize = this.ctx.sampleRate * 0.02;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.02);
      noise.connect(gain);
      gain.connect(this.ctx.destination);
      noise.start();
    } catch (e) {}
  }
}

export const soundEngine = new SoundEngine();
