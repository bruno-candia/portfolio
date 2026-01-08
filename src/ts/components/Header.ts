import { scrollService } from '@ts/services/ScrollService';

export class Header {
  private element: HTMLElement | null;
  private menuButton: HTMLElement | null;
  private menuText: HTMLElement | null;
  private menu: HTMLElement | null;
  private menuLinks: NodeListOf<HTMLAnchorElement>;
  private isMenuOpen = false;
  private currentRotation = 0;
  private spinAnimation: number | null = null;

  constructor() {
    this.element = document.querySelector('.header');
    this.menuButton = document.querySelector('.header__menu-toggle');
    this.menuText = document.querySelector('.header__menu-text');
    this.menu = document.querySelector('.menu');
    this.menuLinks = document.querySelectorAll('.menu__link');
  }

  hydrate(): void {
    if (!this.element) return;

    this.bindEvents();
  }

  private bindEvents(): void {
    this.menuButton?.addEventListener('click', this.handleMenuClick.bind(this));

    this.menuLinks.forEach(link => {
      link.addEventListener('click', this.handleLinkClick.bind(this));
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isMenuOpen) {
        this.closeMenu();
      }
    });
  }

  private handleMenuClick(): void {
    this.spinText();

    if (this.isMenuOpen) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }

  private spinText(): void {
    if (!this.menuText) return;

    if (this.spinAnimation) {
      cancelAnimationFrame(this.spinAnimation);
    }

    const targetRotation = this.currentRotation + 360;
    let velocity = 25;
    const friction = 0.92;
    const precision = 0.1;

    const animate = (): void => {
      const distance = targetRotation - this.currentRotation;

      velocity *= friction;
      this.currentRotation += velocity;

      if (this.currentRotation > targetRotation) {
        velocity = -Math.abs(velocity) * 0.5;
      }

      if (this.menuText) {
        this.menuText.style.transform = `rotate(${this.currentRotation % 360}deg)`;
      }

      if (Math.abs(velocity) > precision || Math.abs(distance) > 1) {
        this.spinAnimation = requestAnimationFrame(animate);
      } else {
        this.currentRotation = targetRotation;
        if (this.menuText) {
          this.menuText.style.transform = `rotate(${this.currentRotation % 360}deg)`;
        }
        this.spinAnimation = null;
      }
    };

    this.spinAnimation = requestAnimationFrame(animate);
  }

  private openMenu(): void {
    this.isMenuOpen = true;
    this.menu?.classList.add('is-open');
    this.menu?.setAttribute('aria-hidden', 'false');
    this.menuButton?.setAttribute('aria-expanded', 'true');
    scrollService.stop();
  }

  private closeMenu(): void {
    this.isMenuOpen = false;
    this.menu?.classList.remove('is-open');
    this.menu?.setAttribute('aria-hidden', 'true');
    this.menuButton?.setAttribute('aria-expanded', 'false');
    scrollService.start();
  }

  private handleLinkClick(e: Event): void {
    e.preventDefault();

    const target = e.currentTarget as HTMLAnchorElement;
    const sectionId = target.getAttribute('data-section');

    if (sectionId) {
      this.closeMenu();

      setTimeout(() => {
        scrollService.scrollTo(`#${sectionId}`, {
          offset: 0,
          duration: 1.2,
        });
      }, 400);
    }
  }
}
