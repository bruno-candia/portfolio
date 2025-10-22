import { type IconType } from "react-icons";
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiAngular,
  SiRedux,
  SiReactquery,
  SiAxios,
  SiTailwindcss,
  SiSass,
  SiStyledcomponents,
  SiDocker,
  SiGit,
  SiGithubactions,
  SiVite,
  SiStorybook,
  SiNodedotjs,
  SiNestjs,
  SiExpress,
  SiPrisma,
  SiPostgresql,
  SiMongodb,
  SiMysql,
  SiJsonwebtokens,
  SiSwagger,
  SiJest,
  SiVitest,
  SiTestinglibrary,
  SiCypress,
  SiEslint,
  SiFigma,
  SiExpo,
  SiAndroid,
  SiApple,
  SiElectron,
  SiReactrouter,
  SiVercel,
  SiKubernetes,
  SiTerraform,
  SiSonarqube,
  SiFirebase,
} from "react-icons/si";
import {
  FaLayerGroup,
  FaRobot,
  FaServer,
  FaJava,
  FaDatabase,
  FaAws,
} from "react-icons/fa";
import { TbApi, TbBrandOauth } from "react-icons/tb";
import { MdArchitecture, MdAccountTree, MdSpeed } from "react-icons/md";
import { HiOutlineCube } from "react-icons/hi";
import { GoWorkflow } from "react-icons/go";
import { VscSymbolInterface } from "react-icons/vsc";
import { AiOutlineApartment } from "react-icons/ai";
import { AzureIcon, AzurePipelinesIcon } from "@/assets/icons/custom";

export interface TechStack {
  name: string;
  icon: IconType;
  description: string;
  learning?: boolean;
}

export interface SkillCategory {
  title: string;
  description: string;
  stacks: TechStack[];
}

export const skills: { content: SkillCategory[] } = {
  content: [
    {
      title: "frontend",
      description:
        "Desenvolvimento de interfaces web modernas e responsivas. Experiência com SPAs, SSR, gerenciamento de estado complexo, testes automatizados e integração com APIs.",
      stacks: [
        {
          name: "javascript",
          icon: SiJavascript,
          description:
            "Linguagem essencial para desenvolvimento web. Usada para criar interatividade, manipular DOM e construir aplicações completas tanto no front-end quanto no back-end.",
        },
        {
          name: "typescript",
          icon: SiTypescript,
          description:
            "Superset do JavaScript que adiciona tipagem estática. Melhora qualidade do código, facilita refatoração e previne erros em tempo de desenvolvimento.",
        },
        {
          name: "react",
          icon: SiReact,
          description:
            "Biblioteca para construção de interfaces. Utiliza componentes reutilizáveis, virtual DOM, hooks para estado e ciclo de vida. Ideal para SPAs e aplicações complexas.",
        },
        {
          name: "nextjs",
          icon: SiNextdotjs,
          description:
            "Framework React com renderização híbrida (SSR, SSG, ISR). Otimização de imagens, code splitting, rotas baseadas em arquivo e melhor SEO.",
        },
        {
          name: "angular",
          icon: SiAngular,
          description:
            "Framework TypeScript completo para aplicações enterprise. Inclui injeção de dependências, RxJS para programação reativa e CLI robusto.",
        },
        {
          name: "redux",
          icon: SiRedux,
          description:
            "Biblioteca de gerenciamento de estado global. Implementa padrão Flux com store centralizada, actions e reducers para aplicações com estado complexo.",
        },
        {
          name: "react-query",
          icon: SiReactquery,
          description:
            "Gerenciamento de estado do servidor. Cache inteligente, sincronização automática, refetch em background. Simplifica fetching de dados e reduz boilerplate.",
        },
        {
          name: "html",
          icon: SiHtml5,
          description:
            "Linguagem de marcação para estruturação de conteúdo web. Tags semânticas melhoram acessibilidade e SEO. Base fundamental para qualquer aplicação web.",
        },
        {
          name: "css",
          icon: SiCss3,
          description:
            "Linguagem de estilização para controle visual de páginas. Domínio de Flexbox e Grid para layouts responsivos, animações e técnicas modernas.",
        },
        {
          name: "tailwind",
          icon: SiTailwindcss,
          description:
            "Framework CSS utility-first que acelera o desenvolvimento. Classes pré-definidas, design system consistente e purge automático de CSS não utilizado.",
        },
        {
          name: "sass",
          icon: SiSass,
          description:
            "Pré-processador CSS com variáveis, nesting, mixins e funções. Organiza estilos de forma modular e facilita manutenção em projetos grandes.",
        },
        {
          name: "styled-components",
          icon: SiStyledcomponents,
          description:
            "Biblioteca CSS-in-JS para React. Estilos escopados por componente, suporte a temas dinâmicos e TypeScript. Elimina conflitos de classe.",
        },
        {
          name: "vite",
          icon: SiVite,
          description:
            "Build tool moderna baseada em ESM. HMR instantâneo, build otimizado com Rollup e suporte TypeScript nativo. Substitui Webpack por velocidade superior.",
        },
        {
          name: "axios",
          icon: SiAxios,
          description:
            "Cliente HTTP baseado em Promises. Oferece interceptors, cancelamento de requests, transformação automática de JSON e tratamento estruturado de erros.",
        },
        {
          name: "figma",
          icon: SiFigma,
          description:
            "Ferramenta colaborativa de design de interfaces. Criação de protótipos interativos, design systems e componentes reutilizáveis.",
        },
        {
          name: "storybook",
          icon: SiStorybook,
          description:
            "Desenvolvimento e documentação de componentes UI isolados. Testa componentes em diferentes estados e cria guias de estilo vivos.",
        },
        {
          name: "jest",
          icon: SiJest,
          description:
            "Framework de testes JavaScript completo. Assertions, mocks, spies, coverage e snapshot testing. Para testes unitários e de integração.",
        },
        {
          name: "vitest",
          icon: SiVitest,
          description:
            "Framework de testes ultra-rápido compatível com Jest. Integrado com Vite, execução paralela, HMR para testes e configuração zero.",
        },
        {
          name: "testing-library",
          icon: SiTestinglibrary,
          description:
            "Testes focados em comportamento do usuário. Testa componentes como usuários interagem, promove acessibilidade e evita dependência de implementação.",
        },
        {
          name: "cypress",
          icon: SiCypress,
          description:
            "Framework para testes end-to-end em navegador real. Time-travel debugging, screenshots automáticos e API intuitiva. Testa fluxos completos da aplicação.",
        },
        {
          name: "msw",
          icon: FaServer,
          description:
            "Mock Service Worker para interceptar requisições de rede. Simula APIs durante desenvolvimento e testes sem modificar código. Funciona em navegador e Node.js.",
        },
        {
          name: "eslint",
          icon: SiEslint,
          description:
            "Análise estática de código JavaScript/TypeScript. Identifica problemas, enforça padrões, previne bugs e mantém consistência. Integra com editores e CI/CD.",
        },
        {
          name: "electron",
          icon: SiElectron,
          description:
            "Framework para aplicações desktop cross-platform usando tecnologias web. Combina Chromium e Node.js, acesso a APIs nativas do sistema operacional.",
        },
      ],
    },
    {
      title: "backend",
      description:
        "Desenvolvimento de APIs escaláveis e microsserviços. Experiência com arquitetura RESTful, autenticação, bancos de dados e testes de integração.",
      stacks: [
        {
          name: "nodejs",
          icon: SiNodedotjs,
          description:
            "Runtime JavaScript server-side sobre V8. Execução assíncrona e non-blocking, ideal para APIs RESTful, microserviços e serviços de alta concorrência.",
        },
        {
          name: "java",
          icon: FaJava,
          description:
            "Linguagem orientada a objetos para sistemas enterprise. Usado em aplicações corporativas, microserviços Spring Boot e sistemas que exigem performance.",
        },
        {
          name: "nestjs",
          icon: SiNestjs,
          description:
            "Framework Node.js progressivo inspirado em Angular. Arquitetura modular com injeção de dependências e decorators TypeScript. Ideal para APIs escaláveis.",
        },
        {
          name: "express",
          icon: SiExpress,
          description:
            "Framework web minimalista e flexível para Node.js. Sistema de rotas robusto, middlewares customizáveis. Base para APIs REST rápidas e performáticas.",
        },
        {
          name: "prisma",
          icon: SiPrisma,
          description:
            "ORM type-safe de próxima geração com schema declarativo. Migrations automáticas, cliente tipado que previne erros e Prisma Studio para visualização de dados.",
        },
        {
          name: "postgresql",
          icon: SiPostgresql,
          description:
            "Banco de dados relacional open-source avançado. Suporte a JSON, full-text search, transações ACID e índices complexos. Ideal para integridade de dados.",
        },
        {
          name: "mysql",
          icon: SiMysql,
          description:
            "Sistema de gerenciamento de banco relacional popular. Performance otimizada para leitura, replicação master-slave. Ideal para aplicações web de alto tráfego.",
        },
        {
          name: "sql-server",
          icon: FaDatabase,
          description:
            "Banco de dados relacional da Microsoft para ambientes enterprise. Integração com Azure, análise avançada, alta disponibilidade e ferramentas de BI integradas.",
        },
        {
          name: "mongodb",
          icon: SiMongodb,
          description:
            "Banco de dados NoSQL orientado a documentos. Esquema flexível com JSON/BSON, escalabilidade horizontal. Ideal para dados não estruturados e rápida iteração.",
        },
        {
          name: "rest-api",
          icon: TbApi,
          description:
            "Padrão arquitetural para APIs web usando HTTP. Design de endpoints RESTful, uso correto de verbos HTTP, status codes e versionamento.",
        },
        {
          name: "jwt",
          icon: SiJsonwebtokens,
          description:
            "Padrão para autenticação stateless baseada em tokens. Encoda claims de usuário em token assinado, autenticação distribuída sem sessão servidor.",
        },
        {
          name: "oauth2",
          icon: TbBrandOauth,
          description:
            "Framework de autorização para delegação de acesso seguro. Implementação de fluxos, integração com providers externos (Google, GitHub) e proteção de recursos.",
        },
        {
          name: "swagger",
          icon: SiSwagger,
          description:
            "Ferramenta para documentação e design de APIs REST. Especificação OpenAPI, geração automática de documentação interativa e validação de contratos.",
        },
        {
          name: "jest",
          icon: SiJest,
          description:
            "Framework de testes para serviços Node.js. Testes unitários de controllers e services, mocking de dependências, testes de integração e coverage reports.",
        },
        {
          name: "wiremock",
          icon: FaServer,
          description:
            "Servidor HTTP mock para simular APIs externas. Stub de responses, matching de requests e simulação de delays e falhas. Essencial para testes de integração.",
        },
        {
          name: "robot-framework",
          icon: FaRobot,
          description:
            "Framework de automação de testes genérico baseado em keywords. Sintaxe legível, bibliotecas extensíveis, testes de aceitação e relatórios HTML detalhados.",
        },
      ],
    },
    {
      title: "mobile",
      description:
        "Desenvolvimento de aplicações mobile multiplataforma com React Native. Experiência em apps iOS e Android com navegação, APIs nativas e otimização.",
      stacks: [
        {
          name: "react-native",
          icon: SiReact,
          description:
            "Framework para desenvolvimento mobile nativo multiplataforma. Código JavaScript renderiza componentes nativos, acesso a APIs do dispositivo e hot reload.",
        },
        {
          name: "expo",
          icon: SiExpo,
          description:
            "Plataforma e ferramentas para React Native. Desenvolvimento sem Xcode/Android Studio, over-the-air updates, bibliotecas nativas pré-configuradas e build na nuvem.",
        },
        {
          name: "react-navigation",
          icon: SiReactrouter,
          description:
            "Biblioteca de navegação para React Native. Stack navigator, tab navigation, drawer, deep linking e transições customizadas. Padrão da indústria para routing mobile.",
        },
        {
          name: "styled-components",
          icon: SiStyledcomponents,
          description:
            "Estilização CSS-in-JS adaptada para React Native. Temas dinâmicos, estilos baseados em props e manutenção de estilos colocalizados com componentes.",
        },
        {
          name: "ios",
          icon: SiApple,
          description:
            "Desenvolvimento e publicação de apps para ecossistema Apple. Configuração de provisioning profiles, App Store Connect e guidelines de interface iOS.",
        },
        {
          name: "android",
          icon: SiAndroid,
          description:
            "Desenvolvimento e publicação de apps Android. Configuração de gradle, geração de APK/AAB assinado, Google Play Console e otimização para diferentes tamanhos de tela.",
        },
        {
          name: "jest",
          icon: SiJest,
          description:
            "Testes unitários e de integração para React Native. Mocking de módulos nativos, snapshot testing de componentes e testes de lógica de negócio e hooks.",
        },
      ],
    },
    {
      title: "arquitetura",
      description:
        "Design de sistemas escaláveis e manuteníveis. Experiência em padrões arquiteturais, micro-frontends, DDD e estratégias de modularização para aplicações complexas.",
      stacks: [
        {
          name: "clean-architecture",
          icon: MdArchitecture,
          description:
            "Arquitetura em camadas independentes (Entities, Use Cases, Adapters). Desacoplamento de regras de negócio da infraestrutura, testabilidade e manutenibilidade.",
        },
        {
          name: "ddd",
          icon: MdAccountTree,
          description:
            "Domain-Driven Design para modelagem de sistemas complexos. Ubiquitous language, bounded contexts, agregados e domain events. Alinhamento entre código e domínio.",
        },
        {
          name: "micro-frontends",
          icon: AiOutlineApartment,
          description:
            "Arquitetura que divide aplicação front-end em módulos independentes. Times autônomos, deploy independente e tecnologias heterogêneas.",
        },
        {
          name: "module-federation",
          icon: VscSymbolInterface,
          description:
            "Técnica Webpack 5 para compartilhamento dinâmico de código. Carregamento remoto de módulos, versionamento independente e code splitting avançado.",
          learning: true,
        },
        {
          name: "monorepo",
          icon: FaLayerGroup,
          description:
            "Estratégia de organizar múltiplos projetos em único repositório. Ferramentas como Nx e Turborepo, compartilhamento de código e versionamento unificado.",
        },
        {
          name: "design-patterns",
          icon: HiOutlineCube,
          description:
            "Soluções reutilizáveis para problemas comuns de design. Padrões criacionais (Factory), estruturais (Adapter) e comportamentais (Observer, Strategy).",
        },
        {
          name: "performance",
          icon: MdSpeed,
          description:
            "Otimização de métricas Core Web Vitals (LCP, FID, CLS). Code splitting, lazy loading, otimização de imagens, cache strategies e Web Workers.",
        },
        {
          name: "mvvm",
          icon: MdArchitecture,
          description:
            "Model-View-ViewModel para separação de responsabilidades. Separação entre lógica (ViewModel), interface (View) e dados (Model). Binding bidirecional.",
        },
      ],
    },
    {
      title: "devops",
      description:
        "Automação de processos, containerização, CI/CD e cloud computing. Experiência com pipelines automatizados, infraestrutura como código e deploy em múltiplas plataformas.",
      stacks: [
        {
          name: "git",
          icon: SiGit,
          description:
            "Sistema de controle de versão distribuído. Git Flow para gestão de branches, conventional commits, rebase interativo e resolução de conflitos.",
        },
        {
          name: "github-actions",
          icon: SiGithubactions,
          description:
            "Plataforma de CI/CD integrada ao GitHub. Workflows automatizados com YAML, matrix builds, caching de dependências e deploy automático.",
        },
        {
          name: "azure-pipelines",
          icon: AzurePipelinesIcon,
          description:
            "Serviço de CI/CD da Azure DevOps. Pipelines YAML ou clássicos, multi-stage deployments, aprovações manuais e integração com Azure services.",
        },
        {
          name: "docker",
          icon: SiDocker,
          description:
            "Plataforma de containerização de aplicações. Criação de imagens leves, Dockerfile multi-stage, Docker Compose para ambientes locais e isolamento de processos.",
        },
        {
          name: "kubernetes",
          icon: SiKubernetes,
          description:
            "Sistema de orquestração de containers em produção. Deployments, services, ingress, auto-scaling, self-healing e rolling updates via Helm charts.",
          learning: true,
        },
        {
          name: "terraform",
          icon: SiTerraform,
          description:
            "Ferramenta de Infrastructure as Code declarativa. Provisionamento multi-cloud com HCL, state management, módulos reutilizáveis e plan/apply seguro.",
          learning: true,
        },
        {
          name: "aws",
          icon: FaAws,
          description:
            "Plataforma de cloud computing da Amazon. Serviços como EC2, S3, Lambda, RDS, CloudFront e API Gateway. Deploy de aplicações escaláveis e serverless.",
        },
        {
          name: "azure",
          icon: AzureIcon,
          description:
            "Plataforma de cloud computing da Microsoft. App Service, Functions, Blob Storage, SQL Database, CDN e DevOps. Integração com ecossistema Microsoft.",
        },
        {
          name: "vercel",
          icon: SiVercel,
          description:
            "Plataforma de deploy otimizada para front-end e Next.js. Deploy automático via Git, edge functions, preview deployments, CDN global e analytics.",
        },
        {
          name: "firebase",
          icon: SiFirebase,
          description:
            "Backend-as-a-Service do Google para desenvolvimento rápido. Firestore, Authentication, Cloud Functions, Hosting e Storage. Ideal para MVPs e apps real-time.",
        },
        {
          name: "sonarqube",
          icon: SiSonarqube,
          description:
            "Plataforma de análise contínua de qualidade de código. Detecção de bugs, vulnerabilidades, code smells, cobertura de testes. Integração com CI/CD.",
        },
        {
          name: "ci-cd",
          icon: GoWorkflow,
          description:
            "Práticas de integração e entrega contínua. Automação de build, testes e deploy, feedback rápido, rollback seguro e deployment strategies (blue-green, rolling).",
        },
      ],
    },
  ],
};
