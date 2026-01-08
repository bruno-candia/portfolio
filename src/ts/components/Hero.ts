import { SprayEffect } from '@ts/effects/SprayEffect';

export class Hero {
  private element: HTMLElement | null;
  private ctaButton: HTMLElement | null;
  private sprayEffect: SprayEffect | null = null;

  constructor() {
    this.element = document.querySelector('.hero');
    this.ctaButton = document.querySelector('.hero__cta');
  }

  hydrate(): void {
    if (!this.element) return;

    this.bindEvents();
    this.initSprayEffect();
  }

  private initSprayEffect(): void {
    const cursorSprayCan = this.element?.querySelector('.hero__spray-cursor') as HTMLElement;
    if (cursorSprayCan) {
      this.sprayEffect = new SprayEffect(cursorSprayCan);
      this.sprayEffect.init();
    }
  }

  private bindEvents(): void {
    this.ctaButton?.addEventListener('click', this.handleCtaClick.bind(this));
  }

  private handleCtaClick(): void {
    console.log('CV Download clicked');
  }
}
