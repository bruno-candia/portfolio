import { Header } from '@ts/components/Header';
import { Hero } from '@ts/components/Hero';
import { scrollService } from '@ts/services/ScrollService';

export class App {
  private header: Header;
  private hero: Hero;

  constructor() {
    this.header = new Header();
    this.hero = new Hero();
  }

  hydrate(): void {
    scrollService.init();
    this.header.hydrate();
    this.hero.hydrate();
  }
}
