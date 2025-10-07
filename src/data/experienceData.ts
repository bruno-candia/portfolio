// Placeholder para logos - você pode substituir pelos logos reais das empresas
export interface Experience {
  id: string;
  companyLogo: string;
  companyName: string;
  role: string;
  duration: string;
  period: string;
  description: string;
  color: string;
}

export const experiences: Experience[] = [
  {
    id: "1",
    companyLogo: "https://via.placeholder.com/80/ABC7C9/FFFFFF?text=Empresa+1", // Substitua com logo real
    companyName: "Empresa 1",
    role: "Desenvolvedor Full Stack",
    duration: "2 anos",
    period: "Jan 2022 - Presente",
    description:
      "Desenvolvimento de aplicações web usando React, Node.js e TypeScript. Responsável pela arquitetura de front-end e integração com APIs.",
    color: "#ABC7C9",
  },
  {
    id: "2",
    companyLogo: "https://via.placeholder.com/80/F3BCAA/FFFFFF?text=Empresa+2",
    companyName: "Empresa 2",
    role: "Desenvolvedor Front-end",
    duration: "1.5 anos",
    period: "Jun 2020 - Dez 2021",
    description:
      "Criação de interfaces responsivas e acessíveis. Trabalho com React, Redux e styled-components. Implementação de testes unitários e integração.",
    color: "#F3BCAA",
  },
  {
    id: "3",
    companyLogo: "https://via.placeholder.com/80/B8D4E8/FFFFFF?text=Empresa+3",
    companyName: "Empresa 3",
    role: "Estagiário de Desenvolvimento",
    duration: "1 ano",
    period: "Jun 2019 - Mai 2020",
    description:
      "Suporte no desenvolvimento de aplicações web. Aprendizado de boas práticas de código, versionamento com Git e metodologias ágeis.",
    color: "#B8D4E8",
  },
  {
    id: "4",
    companyLogo: "https://via.placeholder.com/80/D4C5E8/FFFFFF?text=Empresa+4",
    companyName: "Empresa 4",
    role: "Desenvolvedor Júnior",
    duration: "6 meses",
    period: "Jan 2019 - Mai 2019",
    description:
      "Desenvolvimento de features para sistema web. Trabalho em equipe usando metodologia Scrum. Foco em aprendizado e crescimento profissional.",
    color: "#D4C5E8",
  },
];
