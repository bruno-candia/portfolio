import gsap from 'gsap';

export class SlideshowService {
  private container: HTMLElement;
  private tablist: HTMLElement;
  private panelsContainer: HTMLElement;
  private totalTabs: number = 0;
  private activeTabIndex: number = 0;

  constructor(container: HTMLElement) {
    this.container = container;
    this.tablist = container.querySelector('.slideshow-stack__tablist') as HTMLElement;
    this.panelsContainer = container.querySelector('.slideshow-stack__panels') as HTMLElement;
  }

  public init(totalTabs: number) {
    this.totalTabs = totalTabs;
    this.activeTabIndex = 0;
    this.updateAria();
    this.animateGrid(0);
  }

  public activate(index: number) {
    if (index < 0 || index >= this.totalTabs || this.activeTabIndex === index) return;

    this.activeTabIndex = index;
    this.updateAria();
    this.animateGrid(index);

    return this.getPanel(index);
  }

  public getPanel(index: number): HTMLElement | null {
    return this.panelsContainer.querySelector(`#panel-${index}`);
  }

  private updateAria() {
    const tabs = this.tablist.querySelectorAll('[role="tab"]');
    tabs.forEach((tab, i) => {
      tab.setAttribute('aria-selected', i === this.activeTabIndex ? 'true' : 'false');
    });
  }

  private animateGrid(index: number) {
    const ratios = Array(this.totalTabs).fill(1);
    ratios[index] = 2.6;
    const gridString = ratios.map((r) => `${r}fr`).join(' ');

    gsap.to(this.container, {
      '--active-tab': gridString,
      duration: 0.8,
      ease: 'power3.inOut',
    });
  }
}
