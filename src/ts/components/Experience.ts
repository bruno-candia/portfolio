import experienceData from '@data/experience.json';
import { scrollService } from '@ts/services/ScrollService';
import { SlideshowService } from '@ts/services/SlideshowService';
import { ParallaxEffect } from '@ts/effects/ParallaxEffect';

type ExperienceDataItem = {
  id: string;
  period: string;
  title: string;
  company: string;
  background: string;
  logo: string;
  summaryIntro?: string;
  highlights: string[];
};

export class Experience {
  private section: HTMLElement | null;
  private container: HTMLElement | null;
  private panelsContainer: HTMLElement | null;

  private slideshowService: SlideshowService | null = null;
  private parallaxEffect: ParallaxEffect | null = null;

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
    this.container = document.querySelector('.slideshow-stack__container');
    this.panelsContainer = document.querySelector('.slideshow-stack__panels');

    if (this.container && this.section) {
      this.slideshowService = new SlideshowService(this.container);
      this.parallaxEffect = new ParallaxEffect(this.section);
    }

    this.modal = document.querySelector('.experience-modal');
    this.modalPanel = document.querySelector('.experience-modal__panel');
    this.modalCloseButtons = document.querySelectorAll(
      '[data-experience-close]'
    );

    this.modalPeriod = document.querySelector('.experience-modal__period');
    this.modalRole = document.querySelector('.experience-modal__role');
    this.modalCompany = document.querySelector('.experience-modal__company');
    this.modalIntro = document.querySelector('.experience-modal__intro');
    this.modalHighlights = document.querySelector(
      '.experience-modal__highlights'
    );
  }

  hydrate(): void {
    if (!this.section || !this.container || !this.slideshowService) return;

    this.renderSlideshow();
    this.bindEvents();

    this.renderSlideshow();
    this.bindEvents();
    this.activateTab(0);
  }

  private getDataMap(): Map<string, ExperienceDataItem> {
    const data = experienceData as unknown as ExperienceDataItem[];
    return new Map<string, ExperienceDataItem>(
      data.map((item) => [item.id, item])
    );
  }

  private getDataArray(): ExperienceDataItem[] {
    return experienceData as unknown as ExperienceDataItem[];
  }

  private renderSlideshow(): void {
    if (!this.slideshowService || !this.panelsContainer) return;

    const data = this.getDataArray();

    this.slideshowService.init(data.length);

    const tablist = this.container?.querySelector('.slideshow-stack__tablist');
    if (tablist) tablist.innerHTML = '';
    this.panelsContainer.innerHTML = '';

    data.forEach((item, index) => {
      const tabItem = document.createElement('div');
      tabItem.className = 'slideshow-stack__tablist-item';
      const btn = document.createElement('button');
      btn.className = 'slideshow-stack__tab-button';
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-selected', 'false');
      btn.setAttribute('aria-controls', `panel-${index}`);
      btn.id = `tab-${index}`;
      btn.dataset['index'] = index.toString();
      btn.setAttribute('aria-label', `View ${item.title} at ${item.company}`);

      tabItem.appendChild(btn);
      tablist?.appendChild(tabItem);

      const panel = document.createElement('div');
      panel.className = 'slideshow-stack__panel';
      panel.id = `panel-${index}`;
      panel.setAttribute('role', 'tabpanel');
      panel.setAttribute('aria-labelledby', `tab-${index}`);
      panel.dataset['id'] = item.id;

      panel.innerHTML = `
        <div class="slideshow-stack__panel-content">
            <div class="experience__parallax-container">
                <img src="${item.background}" alt="" class="experience__image parallax-layer layer-bg" />
                <div class="experience__logo-wrapper parallax-layer layer-front">
                    <img src="${item.logo}" alt="${item.company} Logo" class="experience__logo" />
                </div>
            </div>
            <div class="experience__title-layer">
                <h3 class="experience__role-title">${item.title}</h3>
            </div>
            <div class="experience__overlay"></div>

            <div class="experience__content">
                <div class="experience__action">
                    <button type="button" class="experience__cta experience__ui-element" data-details-trigger="${item.id}">
                        View details
                    </button>
                </div>

                <div class="experience__info">
                    <div class="experience__meta-row experience__ui-element">
                        <span>${item.company}</span>
                        <span>${item.period}</span>
                    </div>
                </div>
            </div>
        </div>
      `;

      this.panelsContainer?.appendChild(panel);
    });
  }

  private activateTab(index: number): void {
    if (!this.slideshowService) return;

    if (this.panelsContainer) {
        const panels = this.panelsContainer.querySelectorAll('.slideshow-stack__panel');
        panels.forEach((p, i) => {
            if (i === index) p.classList.add('is-active');
            else p.classList.remove('is-active');
        });
    }

    let panel = this.slideshowService.activate(index);
    if (!panel) {
        panel = this.slideshowService.getPanel(index);
    }

    if (panel && this.parallaxEffect) {
        const layers = panel.querySelectorAll('.parallax-layer') as NodeListOf<HTMLElement>;
        this.parallaxEffect.setLayers(layers);
        this.parallaxEffect.enable();
    }
  }

  private bindEvents(): void {
    if (!this.container || !this.slideshowService) return;

    const tablist = this.container.querySelector('.slideshow-stack__tablist');
    const tabs = tablist?.querySelectorAll('[role="tab"]');

    tabs?.forEach(tab => {
        tab.addEventListener('click', (e) => {
            this.parallaxEffect?.requestMobilePermission();
            const index = parseInt((e.currentTarget as HTMLElement).dataset['index'] || '0');
            this.activateTab(index);
        });

        tab.addEventListener('mouseenter', (e) => {
             if (window.innerWidth > 768) {
                 const index = parseInt((e.currentTarget as HTMLElement).dataset['index'] || '0');
                 this.activateTab(index);
             }
        });
    });

    this.panelsContainer?.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        const trigger = target.closest('[data-details-trigger]');
        if (trigger) {
            e.stopPropagation();
            const id = (trigger as HTMLElement).dataset['detailsTrigger'];
            if (id) this.openModal(id);
        }
    });

    this.modalCloseButtons.forEach((el) => {
      el.addEventListener('click', () => this.closeModal());
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isModalOpen()) {
        this.closeModal();
      }
    });
  }


  private isModalOpen(): boolean {
    return !!this.modal?.classList.contains('is-open');
  }

  private openModal(id: string): void {
    const byId = this.getDataMap();
    const item = byId.get(id);
    if (!item || !this.modal || !this.modalPanel) return;

    this.activeId = id;
    this.fillModal(item);

    this.modal.classList.add('is-open');
    this.modal.setAttribute('aria-hidden', 'false');
    scrollService.stop();

    const closeBtn = this.modal.querySelector(
      '.experience-modal__close'
    ) as HTMLButtonElement | null;
    closeBtn?.focus();
  }

  private closeModal(): void {
    if (!this.modal) return;

    this.modal.classList.remove('is-open');
    this.modal.setAttribute('aria-hidden', 'true');
    scrollService.start();

    if (this.activeId) {
        const btn = this.panelsContainer?.querySelector(`[data-details-trigger="${this.activeId}"]`) as HTMLElement;
        btn?.focus();
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
