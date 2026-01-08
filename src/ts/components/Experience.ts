import experienceData from '@data/experience.json';
import { scrollService } from '@ts/services/ScrollService';

type ExperienceDataItem = {
  id: string;
  period: string;
  title: string;
  company: string;
  image: { src: string; alt: string };
  summaryIntro?: string;
  highlights: string[];
};

export class Experience {
  private section: HTMLElement | null;
  private cards: NodeListOf<HTMLButtonElement>;

  private modal: HTMLElement | null;
  private modalPanel: HTMLElement | null;
  private modalCloseButtons: NodeListOf<HTMLElement>;

  private modalPeriod: HTMLElement | null;
  private modalRole: HTMLElement | null;
  private modalCompany: HTMLElement | null;
  private modalIntro: HTMLElement | null;
  private modalHighlights: HTMLUListElement | null;

  private activeId: string | null = null;

  constructor() {
    this.section = document.querySelector('.experience');
    this.cards = document.querySelectorAll('.experience__card');

    this.modal = document.querySelector('.experience-modal');
    this.modalPanel = document.querySelector('.experience-modal__panel');
    this.modalCloseButtons = document.querySelectorAll('[data-experience-close]');

    this.modalPeriod = document.querySelector('.experience-modal__period');
    this.modalRole = document.querySelector('.experience-modal__role');
    this.modalCompany = document.querySelector('.experience-modal__company');
    this.modalIntro = document.querySelector('.experience-modal__intro');
    this.modalHighlights = document.querySelector('.experience-modal__highlights');
  }

  hydrate(): void {
    if (!this.section) return;

    this.renderCardsFromData();
    this.bindEvents();
  }

  private getDataMap(): Map<string, ExperienceDataItem> {
    const data = experienceData as unknown as ExperienceDataItem[];
    return new Map<string, ExperienceDataItem>(data.map(item => [item.id, item]));
  }

  private renderCardsFromData(): void {
    const byId = this.getDataMap();

    this.cards.forEach((card) => {
      const id = card.dataset['experience'];
      if (!id) return;

      const item = byId.get(id);
      if (!item) return;

      const img = card.querySelector('.experience__image') as HTMLImageElement | null;
      const period = card.querySelector('.experience__period') as HTMLElement | null;
      const role = card.querySelector('.experience__role') as HTMLElement | null;
      const company = card.querySelector('.experience__company') as HTMLElement | null;

      if (img) {
        img.src = item.image.src;
        img.alt = item.image.alt;
      }
      if (period) period.textContent = item.period;
      if (role) role.textContent = item.title;
      if (company) company.textContent = item.company;
    });
  }

  private bindEvents(): void {
    this.cards.forEach((card) => {
      card.addEventListener('click', () => {
        const id = card.dataset['experience'];
        if (id) this.open(id);
      });
    });

    this.modalCloseButtons.forEach((el) => {
      el.addEventListener('click', () => this.close());
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen()) {
        this.close();
      }
    });
  }

  private isOpen(): boolean {
    return !!this.modal?.classList.contains('is-open');
  }

  private open(id: string): void {
    const byId = this.getDataMap();
    const item = byId.get(id);
    if (!item || !this.modal || !this.modalPanel) return;

    this.activeId = id;
    this.fillModal(item);

    this.modal.classList.add('is-open');
    this.modal.setAttribute('aria-hidden', 'false');
    scrollService.stop();

    // Focus close for accessibility
    const closeBtn = this.modal.querySelector('.experience-modal__close') as HTMLButtonElement | null;
    closeBtn?.focus();
  }

  private close(): void {
    if (!this.modal) return;

    this.modal.classList.remove('is-open');
    this.modal.setAttribute('aria-hidden', 'true');
    scrollService.start();

    // Restore focus to the originating card
    if (this.activeId) {
      const card = document.querySelector(`.experience__card[data-experience="${this.activeId}"]`) as
        | HTMLButtonElement
        | null;
      card?.focus();
    }
    this.activeId = null;
  }

  private fillModal(item: ExperienceDataItem): void {
    if (!this.modalHighlights) return;

    if (this.modalPeriod) this.modalPeriod.textContent = item.period;
    if (this.modalRole) this.modalRole.textContent = item.title;
    if (this.modalCompany) this.modalCompany.textContent = item.company;
    if (this.modalIntro) this.modalIntro.textContent = item.summaryIntro ?? '';

    this.modalHighlights.innerHTML = '';
    item.highlights.forEach((text) => {
      const li = document.createElement('li');
      li.textContent = text;
      this.modalHighlights?.appendChild(li);
    });
  }
}

