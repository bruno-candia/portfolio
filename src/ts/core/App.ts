import { Header } from '@ts/components/Header';
import { Hero } from '@ts/components/Hero';
import { Skills } from '@ts/components/Skills';
import { Experience } from '@ts/components/Experience';
import { scrollService } from '@ts/services/ScrollService';

export class App {
  private header: Header;
  private hero: Hero;
  private skills: Skills;
  private experience: Experience;

  constructor() {
    this.header = new Header();
    this.hero = new Hero();
    this.skills = new Skills();
    this.experience = new Experience();
  }

  hydrate(): void {
    scrollService.init();
    this.header.hydrate();
    this.hero.hydrate();
    this.skills.hydrate();
    this.experience.hydrate();
  }
}
