export class Hero {
  private element: HTMLElement | null;
  private ctaButton: HTMLElement | null;

  constructor() {
    this.element = document.querySelector('.hero');
    this.ctaButton = document.querySelector('.hero__cta');
  }

  hydrate(): void {
    if (!this.element) return;

    this.bindEvents();
  }

  private bindEvents(): void {
    this.ctaButton?.addEventListener('click', this.handleCtaClick.bind(this));
  }

  private handleCtaClick(): void {
    console.log('CV Download clicked');
  }
}
