interface CertificationsProps {
  selector: string;
}

export class Certifications {
  element: any;
  constructor({ selector }: CertificationsProps) {
    this.element = document.querySelector(selector);
  }

  init() {
    this.element.innerHTML = `
      <h2>Certificações</h2>
    `;
  }
}