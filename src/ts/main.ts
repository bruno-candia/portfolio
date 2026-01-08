import '@css/main.css';
import { App } from '@core/App';

document.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  app.hydrate();
});
