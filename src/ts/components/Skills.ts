import skillsData from '@data/skills.json';

type SkillsDataItem = {
  id: string;
  category: string;
  stacks: Array<{ name: string; icon?: string }>;
};

export class Skills {
  private element: HTMLElement | null;
  private accordionItems: NodeListOf<HTMLElement>;
  private boundResize?: () => void;
  private animations = new Map<HTMLElement, number>();
  private readonly defaultOpenSkillId = 'frontend';
  private readonly animationDurationMs = 520;

  constructor() {
    this.element = document.querySelector('.skills');
    this.accordionItems = document.querySelectorAll('.skills__accordion-item');
  }

  hydrate(): void {
    if (!this.element) return;

    this.renderStacksFromData();
    this.bindEvents();
    this.bindResize();
    this.openDefault();
  }

  private bindEvents(): void {
    this.accordionItems.forEach((item) => {
      const trigger = item.querySelector('.skills__accordion-trigger') as HTMLButtonElement | null;
      trigger?.addEventListener('click', () => this.toggleItem(item));
    });
  }

  private renderStacksFromData(): void {
    const data = skillsData as unknown as SkillsDataItem[];
    const byId = new Map<string, SkillsDataItem>(data.map(item => [item.id, item]));

    this.accordionItems.forEach((item) => {
      const skillId = item.dataset['skill'];
      const list = item.querySelector('.skills__stacks') as HTMLUListElement | null;
      if (!skillId || !list) return;

      const skill = byId.get(skillId);
      list.innerHTML = '';

      (skill?.stacks ?? []).forEach((stack) => {
        const li = document.createElement('li');
        li.className = 'skills__stack';
        li.textContent = stack.name;
        list.appendChild(li);
      });
    });
  }

  private bindResize(): void {
    this.boundResize = () => {
      const openItem = this.element?.querySelector('.skills__accordion-item.is-open') as HTMLElement | null;
      if (!openItem) return;
      const content = openItem.querySelector('.skills__accordion-content') as HTMLElement | null;
      if (!content) return;
      content.style.maxHeight = `${content.scrollHeight}px`;
    };

    window.addEventListener('resize', this.boundResize);
  }

  private openDefault(): void {
    const preferred = this.element?.querySelector(
      `.skills__accordion-item[data-skill="${this.defaultOpenSkillId}"]`,
    ) as HTMLElement | null;

    const first = this.accordionItems[0] ?? null;
    const item = preferred ?? first;
    if (!item) return;

    this.openItem(item, { animate: false });
  }

  private toggleItem(item: HTMLElement): void {
    const content = item.querySelector('.skills__accordion-content') as HTMLElement | null;
    const trigger = item.querySelector('.skills__accordion-trigger') as HTMLElement | null;
    const isOpen = item.classList.contains('is-open');

    if (isOpen) return;

    this.accordionItems.forEach((other) => {
      if (other === item) return;
      this.closeItem(other, { animate: true });
    });

    item.classList.add('is-open');
    trigger?.setAttribute('aria-expanded', 'true');
    if (content) {
      this.animateHeight(content, {
        from: content.offsetHeight,
        to: content.scrollHeight,
        durationMs: this.animationDurationMs,
      });
    }
  }

  private openItem(item: HTMLElement, opts: { animate: boolean }): void {
    const content = item.querySelector('.skills__accordion-content') as HTMLElement | null;
    const trigger = item.querySelector('.skills__accordion-trigger') as HTMLElement | null;
    item.classList.add('is-open');
    trigger?.setAttribute('aria-expanded', 'true');

    if (!content) return;

    if (!opts.animate) {
      content.style.maxHeight = `${content.scrollHeight}px`;
      return;
    }

    this.animateHeight(content, {
      from: content.offsetHeight,
      to: content.scrollHeight,
      durationMs: this.animationDurationMs,
    });
  }

  private closeItem(item: HTMLElement, opts: { animate: boolean }): void {
    const content = item.querySelector('.skills__accordion-content') as HTMLElement | null;
    const trigger = item.querySelector('.skills__accordion-trigger') as HTMLElement | null;
    item.classList.remove('is-open');
    trigger?.setAttribute('aria-expanded', 'false');
    if (!content) return;

    if (!opts.animate) {
      content.style.maxHeight = '0';
      return;
    }

    this.animateHeight(content, {
      from: content.offsetHeight,
      to: 0,
      durationMs: Math.round(this.animationDurationMs * 0.75),
    });
  }

  private animateHeight(
    el: HTMLElement,
    params: { from: number; to: number; durationMs: number },
  ): void {
    const existing = this.animations.get(el);
    if (existing) cancelAnimationFrame(existing);

    const start = performance.now();
    const from = Math.max(0, params.from);
    const to = Math.max(0, params.to);
    const duration = Math.max(120, params.durationMs);

    const easeOut = (t: number): number => 1 - Math.pow(1 - t, 4);

    const tick = (now: number): void => {
      const t = Math.min(1, (now - start) / duration);
      const v = from + (to - from) * easeOut(t);
      el.style.maxHeight = `${v}px`;

      if (t < 1) {
        this.animations.set(el, requestAnimationFrame(tick));
      } else {
        this.animations.delete(el);
        el.style.maxHeight = to === 0 ? '0' : `${el.scrollHeight}px`;
      }
    };

    this.animations.set(el, requestAnimationFrame(tick));
  }
}
