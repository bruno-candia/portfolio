export class Header {
  private element: HTMLElement | null;
  private menuButton: HTMLElement | null;

  constructor() {
    this.element = document.querySelector('.header');
    this.menuButton = document.querySelector('.header__menu-toggle');
  }

  hydrate(): void {
    if (!this.element) return;

    this.bindEvents();
  }

  private bindEvents(): void {
    this.menuButton?.addEventListener('click', this.handleMenuClick.bind(this));
  }

  private handleMenuClick(): void {
    console.log('Menu clicked!');
  }
}
