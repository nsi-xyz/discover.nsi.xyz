import {
  ChangeDetectionStrategy,
  Component,
  computed,
  HostListener,
  inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  signal
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import {
  DESIGN_THEMES,
  HISTORY_MILESTONES,
  POST_BAC_PATHWAYS,
  PROGRAM_PILLARS,
  QUIZ_PROFILES,
  QUIZ_QUESTIONS,
  STUDENT_PROJECTS,
  ThemeDefinition
} from './nsi-data';

@Component({
  selector: 'app-root',
  imports: [MatIconModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.data-theme]': 'currentThemeId()',
    'class': 'min-h-screen block'
  }
})
export class App implements OnInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);

  // Design Themes state
  readonly themes = DESIGN_THEMES;
  readonly currentThemeId = signal<ThemeDefinition['id']>('flat');
  readonly currentTheme = computed(() =>
    this.themes.find((t) => t.id === this.currentThemeId()) || this.themes[0]
  );

  // Auto-tour (Demo mode)
  readonly isAutoTourActive = signal<boolean>(false);
  private autoTourTimer: ReturnType<typeof setInterval> | null = null;
  readonly autoTourProgress = signal<number>(0);
  private progressTimer: ReturnType<typeof setInterval> | null = null;

  // Inspector modal / drawer
  readonly isInspectorOpen = signal<boolean>(false);

  // Content state
  readonly milestones = HISTORY_MILESTONES;
  readonly pillars = PROGRAM_PILLARS;
  readonly selectedPillarId = signal<string>('data');
  readonly currentPillar = computed(() =>
    this.pillars.find((p) => p.id === this.selectedPillarId()) || this.pillars[0]
  );

  // Projects filter
  readonly projects = STUDENT_PROJECTS;
  readonly selectedProjectCategory = signal<string>('all');
  readonly filteredProjects = computed(() => {
    const cat = this.selectedProjectCategory();
    if (cat === 'all') return this.projects;
    return this.projects.filter((p) => p.category.toLowerCase().includes(cat.toLowerCase()));
  });

  // Selected project for modal detail
  readonly activeProjectModal = signal<typeof STUDENT_PROJECTS[0] | null>(null);

  // Post-bac pathways
  readonly pathways = POST_BAC_PATHWAYS;
  readonly selectedPathwayId = signal<string>('cpge');
  readonly currentPathway = computed(() =>
    this.pathways.find((p) => p.id === this.selectedPathwayId()) || this.pathways[0]
  );

  // Quiz state
  readonly quizQuestions = QUIZ_QUESTIONS;
  readonly currentQuizStep = signal<number>(0);
  readonly quizAnswers = signal<Record<number, string>>({});
  readonly quizCompleted = signal<boolean>(false);
  readonly quizResultProfile = signal<typeof QUIZ_PROFILES['creator'] | null>(null);
  readonly quizProgressPercentage = computed(() =>
    Math.round((this.currentQuizStep() / this.quizQuestions.length) * 100)
  );

  // Sound feedback toggle (subtle click)
  readonly soundEnabled = signal<boolean>(false);

  ngOnInit(): void {
    // Check url param or default
    if (isPlatformBrowser(this.platformId)) {
      try {
        const params = new URLSearchParams(window.location.search);
        const themeParam = params.get('theme');
        if (themeParam && this.themes.some((t) => t.id === themeParam)) {
          this.setTheme(themeParam as ThemeDefinition['id']);
        }
      } catch {
        // Fallback safely
      }
    }
  }

  ngOnDestroy(): void {
    this.stopAutoTour();
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboard(event: KeyboardEvent): void {
    // Ignore keyboard shortcuts if user is typing in an input
    const target = event.target as HTMLElement;
    if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) {
      return;
    }

    const key = event.key;
    if (key >= '1' && key <= '9') {
      const index = parseInt(key, 10) - 1;
      if (this.themes[index]) {
        this.setTheme(this.themes[index].id);
      }
    } else if (key.toLowerCase() === 'd') {
      this.toggleAutoTour();
    } else if (key.toLowerCase() === 'i') {
      this.toggleInspector();
    } else if (key === 'Escape') {
      this.isInspectorOpen.set(false);
      this.activeProjectModal.set(null);
    }
  }

  setTheme(themeId: ThemeDefinition['id']): void {
    this.currentThemeId.set(themeId);
    this.playSubtleSound();
  }

  nextTheme(): void {
    const currentIndex = this.themes.findIndex((t) => t.id === this.currentThemeId());
    const nextIndex = (currentIndex + 1) % this.themes.length;
    this.setTheme(this.themes[nextIndex].id);
  }

  prevTheme(): void {
    const currentIndex = this.themes.findIndex((t) => t.id === this.currentThemeId());
    const prevIndex = (currentIndex - 1 + this.themes.length) % this.themes.length;
    this.setTheme(this.themes[prevIndex].id);
  }

  toggleAutoTour(): void {
    if (this.isAutoTourActive()) {
      this.stopAutoTour();
    } else {
      this.startAutoTour();
    }
  }

  startAutoTour(): void {
    this.isAutoTourActive.set(true);
    this.autoTourProgress.set(0);

    const stepInterval = 100;
    const totalDuration = 4500;
    let elapsed = 0;

    this.progressTimer = setInterval(() => {
      elapsed += stepInterval;
      this.autoTourProgress.set(Math.min(100, Math.floor((elapsed / totalDuration) * 100)));
      if (elapsed >= totalDuration) {
        elapsed = 0;
        this.nextTheme();
      }
    }, stepInterval);
  }

  stopAutoTour(): void {
    this.isAutoTourActive.set(false);
    this.autoTourProgress.set(0);
    if (this.progressTimer) {
      clearInterval(this.progressTimer);
      this.progressTimer = null;
    }
    if (this.autoTourTimer) {
      clearInterval(this.autoTourTimer);
      this.autoTourTimer = null;
    }
  }

  toggleInspector(): void {
    this.isInspectorOpen.update((v) => !v);
  }

  selectPillar(pillarId: string): void {
    this.selectedPillarId.set(pillarId);
  }

  filterProjects(category: string): void {
    this.selectedProjectCategory.set(category);
  }

  openProjectDetail(project: typeof STUDENT_PROJECTS[0]): void {
    this.activeProjectModal.set(project);
  }

  closeProjectDetail(): void {
    this.activeProjectModal.set(null);
  }

  selectPathway(pathwayId: string): void {
    this.selectedPathwayId.set(pathwayId);
  }

  answerQuiz(questionId: number, profile: string): void {
    this.quizAnswers.update((prev) => ({ ...prev, [questionId]: profile }));

    if (this.currentQuizStep() < this.quizQuestions.length - 1) {
      this.currentQuizStep.update((step) => step + 1);
    } else {
      this.calculateQuizResult();
    }
  }

  calculateQuizResult(): void {
    const answers = Object.values(this.quizAnswers());
    const counts: Record<string, number> = { system: 0, algo: 0, creator: 0, cyber: 0 };
    for (const ans of answers) {
      if (counts[ans] !== undefined) {
        counts[ans]++;
      }
    }

    let topProfileKey = 'creator';
    let maxCount = -1;
    for (const [key, count] of Object.entries(counts)) {
      if (count > maxCount) {
        maxCount = count;
        topProfileKey = key;
      }
    }

    this.quizResultProfile.set(QUIZ_PROFILES[topProfileKey] || QUIZ_PROFILES['creator']);
    this.quizCompleted.set(true);
  }

  resetQuiz(): void {
    this.currentQuizStep.set(0);
    this.quizAnswers.set({});
    this.quizCompleted.set(false);
    this.quizResultProfile.set(null);
  }

  toggleSound(): void {
    this.soundEnabled.update((v) => !v);
  }

  private playSubtleSound(): void {
    if (!this.soundEnabled() || !isPlatformBrowser(this.platformId)) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch {
      // Audio not permitted or failed
    }
  }

  scrollToSection(sectionId: string): void {
    if (isPlatformBrowser(this.platformId)) {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
}
