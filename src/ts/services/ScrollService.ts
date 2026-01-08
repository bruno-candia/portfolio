import Lenis from 'lenis';

class ScrollService {
  private lenis: Lenis | null = null;

  init(): void {
    this.lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    });

    this.startLoop();
  }

  private startLoop(): void {
    const raf = (time: number): void => {
      this.lenis?.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }

  scrollTo(target: string | number | HTMLElement, options?: object): void {
    this.lenis?.scrollTo(target, options);
  }

  stop(): void {
    this.lenis?.stop();
  }

  start(): void {
    this.lenis?.start();
  }

  destroy(): void {
    this.lenis?.destroy();
    this.lenis = null;
  }
}

export const scrollService = new ScrollService();
