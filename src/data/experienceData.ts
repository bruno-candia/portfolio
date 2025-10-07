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
    companyLogo: "https://via.placeholder.com/80/FCC200/FFFFFF?text=BEES",
    companyName: "BEES",
    role: "Tech Leader",
    duration: "1 ano 9 meses",
    period: "Fev 2024 - Presente",
    description:
      "🏆 Top Performer Award 2025 AB InBev por resultados consistentes e impacto estratégico.\n\n• Defino e evoluo arquitetura microfrontend usando Single-SPA, import-map e Module Federation para plataformas globais com 3.3M+ usuários ativos mensais em 20+ mercados\n• Crio e mantenho design systems corporativos garantindo consistência e eficiência entre times frontend\n• Estruturo pipelines CI/CD e versionamento automatizado com estratégias multi-ambiente (UAT, SIT, PROD) e multi-vendor\n• Desenvolvo ferramentas de performance e observabilidade: dashboards de memória, bundle analyzer e integração New Relic\n• Lidero desenvolvimento e padronização de arquitetura BFF com NestJS, configurando WireMock e Robot Framework para simulação de serviços externos e testes automatizados\n\nTecnologias: React, TypeScript, Node.js, NestJS, Single-SPA, Module Federation, Azure DevOps, New Relic",
    color: "#FCC200",
  },
  {
    id: "2",
    companyLogo: "https://via.placeholder.com/80/FCC200/FFFFFF?text=BEES",
    companyName: "BEES",
    role: "Frontend Developer",
    duration: "1 ano",
    period: "Mar 2023 - Fev 2024",
    description:
      "Desenvolvi a plataforma BEES Grow, projetada para impulsionar vendas através de interações com clientes.\n\nPrincipais conquistas:\n• Construí o modo Auto Dialer, aumentando significativamente o volume diário de chamadas de vendas no Grow\n• Liderei a migração do Grow de arquitetura monolítica para micro-frontends, garantindo maior escalabilidade e flexibilidade\n• Criei aplicação Electron para simular ambiente CTI (Computer Telephony Integration), simplificando testes e eliminando dependências de máquinas virtuais\n• Responsável por levantamento de requisitos, desenvolvimento, testes, deploy, code reviews, suporte ao cliente e documentação\n\nTecnologias: TypeScript, React, Redux, Styled-Components, Electron, Azure DevOps, Azure Pipelines, Jest, Testing Library, Webpack, Module Federation",
    color: "#FCC200",
  },
  {
    id: "3",
    companyLogo: "https://via.placeholder.com/80/6B5B95/FFFFFF?text=Aurem",
    companyName: "Aurem",
    role: "Founder & Software Architect",
    duration: "5 anos 4 meses",
    period: "Fev 2018 - Mai 2023",
    description:
      "🏆 Prêmio Empreenda Santander 2019 - reconhecimento nacional por empreendedorismo de impacto.\n\nFundei e liderei startup de tecnologia assistiva focada em acessibilidade para pessoas surdas.\n\nPrincipais conquistas técnicas:\n• Implementei Web Speech API para captura e transcrição de fala em tempo real diretamente no browser\n• Desenvolvi aplicações web, mobile (iOS/Android) e desktop, garantindo experiência consistente multiplataforma\n• Projetei sistema baseado em WebSocket para gerenciamento de salas e sincronização de legendas em tempo real\n• Construí arquitetura de design system para padronizar UI/UX em todas as aplicações\n• Implantei em ambientes cloud (AWS, Vercel, Azure, Docker) para escalabilidade\n\nImpacto: Aplicado em universidades USF, Unicamp, Inatel e eventos como Hack Town e Learning Village.\n\nTecnologias: React, React Native, Electron, TypeScript, Node.js, WebSocket, Socket.io, AWS, Azure, Docker, Figma",
    color: "#6B5B95",
  },
  {
    id: "4",
    companyLogo: "https://via.placeholder.com/80/00A859/FFFFFF?text=Verzel",
    companyName: "Verzel",
    role: "UX Designer",
    duration: "9 meses",
    period: "Dez 2021 - Ago 2022",
    description:
      "Trabalhei no UX/Tech Team projetando soluções digitais que equilibram necessidades de empresas parceiras, requisitos de usuários e viabilidade técnica.\n\nResponsabilidades:\n• Levantamento de requisitos e pesquisa com usuários\n• Prototipagem e design de interfaces\n• Testes de usabilidade e validação com usuários\n• Apresentação de resultados e justificativas de design\n• Colaboração com desenvolvedores para garantir implementação fiel\n\nProjetei layouts e interfaces para empresas de diversos setores: campanhas de doação, plataformas de aluguel de carros, soluções blockchain, marketplaces e aplicativos corporativos.\n\nTecnologias: Figma, Adobe XD, Miro, Design Systems, User Research, Usability Testing, Prototyping",
    color: "#00A859",
  },
  {
    id: "5",
    companyLogo: "https://via.placeholder.com/80/0066B3/FFFFFF?text=Neoenergia",
    companyName: "Neoenergia",
    role: "Software Developer Intern",
    duration: "7 meses",
    period: "Mai 2021 - Nov 2021",
    description:
      "Trabalhei na Agility Team desenvolvendo projetos focados em eficiência de processos, gerando ganhos quantitativos e qualitativos ao negócio.\n\nPrincipais atividades:\n• Desenvolvimento de aplicações usando React e TypeScript no frontend e Node.js com SQL no backend\n• Criação de componentes reutilizáveis para melhorar consistência e acelerar entregas entre projetos\n• Implementação de workflows para otimizar processos internos com foco em eficiência operacional\n• Levantamento de requisitos, design de componentes, desenvolvimento, testes, deploy e documentação\n• Monitoramento de aplicações em produção e suporte aos usuários finais\n\nTecnologias: React, TypeScript, Node.js, Express, SQL, Git, Azure DevOps, REST APIs",
    color: "#0066B3",
  },
  {
    id: "6",
    companyLogo: "https://via.placeholder.com/80/0066B3/FFFFFF?text=Neoenergia",
    companyName: "Neoenergia",
    role: "Business Analyst Intern",
    duration: "4 meses",
    period: "Fev 2021 - Mai 2021",
    description:
      "Auxiliei na estruturação e planejamento de projetos usando metodologia SCRUM na área de tecnologia.\n\nResponsabilidades:\n• Comunicação com clientes internos para levantamento de necessidades\n• Mapeamento de requisitos técnicos e funcionais com stakeholders\n• Redação de user stories seguindo critérios INVEST\n• Criação e análise de indicadores internos (KPIs) para métricas da área\n• Apoio na condução de reuniões SCRUM (planning, daily, review, retrospective)\n• Documentação de processos e fluxos de trabalho\n• Priorização de backlog junto ao Product Owner\n\nPrimeira experiência profissional que me proporcionou entendimento sólido sobre metodologias ágeis e gestão de projetos de tecnologia.\n\nCompetências: Gestão de projetos, SCRUM, Análise de requisitos, Documentação",
    color: "#0066B3",
  },
];
