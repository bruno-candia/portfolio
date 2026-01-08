import '@css/main.css';
import { App } from '@ts/core/App';

document.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  app.hydrate();
});
