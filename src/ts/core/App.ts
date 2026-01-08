import { Header } from '@ts/components/Header';
import { Hero } from '@ts/components/Hero';

export class App {
  private header: Header;
  private hero: Hero;

  constructor() {
    this.header = new Header();
    this.hero = new Hero();
  }

  hydrate(): void {
    this.header.hydrate();
    this.hero.hydrate();
  }
}
