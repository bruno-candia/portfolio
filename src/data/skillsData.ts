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
            "Linguagem de programação essencial para desenvolvimento web. Usada para criar interatividade, manipular DOM, fazer requisições assíncronas e construir aplicações completas tanto no front-end quanto no back-end.",
        },
        {
          name: "typescript",
          icon: SiTypescript,
          description:
            "Superset do JavaScript que adiciona tipagem estática. Melhora a qualidade do código, facilita refatoração, previne erros em tempo de desenvolvimento e aumenta a produtividade em projetos de médio e grande porte.",
        },
        {
          name: "react",
          icon: SiReact,
          description:
            "Biblioteca JavaScript para construção de interfaces de usuário. Utiliza componentes reutilizáveis, virtual DOM para performance, hooks para gerenciamento de estado e ciclo de vida. Ideal para SPAs e aplicações complexas.",
        },
        {
          name: "nextjs",
          icon: SiNextdotjs,
          description:
            "Framework React com renderização híbrida (SSR, SSG, ISR). Oferece otimização automática de imagens, code splitting, rotas baseadas em arquivo e melhor SEO. Usado em projetos que exigem performance e indexação.",
        },
        {
          name: "angular",
          icon: SiAngular,
          description:
            "Framework TypeScript completo para aplicações enterprise. Inclui injeção de dependências, RxJS para programação reativa, CLI robusto e estrutura opinativa. Ideal para grandes equipes e projetos corporativos.",
        },
        {
          name: "redux",
          icon: SiRedux,
          description:
            "Biblioteca de gerenciamento de estado global previsível. Implementa padrão Flux com store centralizada, actions e reducers. Útil para aplicações com estado complexo compartilhado entre múltiplos componentes.",
        },
        {
          name: "react-query",
          icon: SiReactquery,
          description:
            "Biblioteca para gerenciamento de estado do servidor. Oferece cache inteligente, sincronização automática, refetch em background e estados de loading/error. Simplifica fetching de dados e reduz código boilerplate.",
        },
        {
          name: "html",
          icon: SiHtml5,
          description:
            "Linguagem de marcação para estruturação de conteúdo web. Uso de tags semânticas (header, nav, article) melhora acessibilidade e SEO. Base fundamental para qualquer aplicação web.",
        },
        {
          name: "css",
          icon: SiCss3,
          description:
            "Linguagem de estilização para controle visual de páginas web. Domínio de Flexbox e Grid para layouts responsivos, animações, transições e técnicas modernas como CSS Variables e Custom Properties.",
        },
        {
          name: "tailwind",
          icon: SiTailwindcss,
          description:
            "Framework CSS utility-first que acelera o desenvolvimento. Classes pré-definidas aplicadas diretamente no HTML, design system consistente, purge automático de CSS não utilizado e customização via configuração.",
        },
        {
          name: "sass",
          icon: SiSass,
          description:
            "Pré-processador CSS que adiciona funcionalidades como variáveis, nesting, mixins e funções. Organiza estilos de forma modular, facilita manutenção em projetos grandes e permite reutilização de código.",
        },
        {
          name: "styled-components",
          icon: SiStyledcomponents,
          description:
            "Biblioteca CSS-in-JS para React. Estilos escopados por componente, suporte a temas dinâmicos, props condicionais e TypeScript. Elimina conflitos de classe e mantém estilos próximos aos componentes.",
        },
        {
          name: "vite",
          icon: SiVite,
          description:
            "Build tool moderna baseada em ESM nativo. Oferece HMR instantâneo, build otimizado com Rollup, suporte TypeScript nativo e plugins. Substitui Webpack em projetos modernos por sua velocidade superior.",
        },
        {
          name: "axios",
          icon: SiAxios,
          description:
            "Cliente HTTP baseado em Promises para navegador e Node.js. Oferece interceptors para requisições/respostas, cancelamento de requests, transformação automática de JSON e tratamento de erros estruturado.",
        },
        {
          name: "figma",
          icon: SiFigma,
          description:
            "Ferramenta colaborativa de design de interfaces. Criação de protótipos interativos, design systems, componentes reutilizáveis e handoff para desenvolvimento. Essencial para trabalho em equipe entre design e desenvolvimento.",
        },
        {
          name: "storybook",
          icon: SiStorybook,
          description:
            "Ferramenta para desenvolvimento e documentação de componentes UI isolados. Permite testar componentes em diferentes estados, criar guias de estilo vivos e facilitar revisão de código visual.",
        },
        {
          name: "jest",
          icon: SiJest,
          description:
            "Framework de testes JavaScript completo. Oferece assertions, mocks, spies, coverage reports e snapshot testing. Usado para testes unitários e de integração em projetos React, Node.js e TypeScript.",
        },
        {
          name: "vitest",
          icon: SiVitest,
          description:
            "Framework de testes ultra-rápido compatível com Jest. Integrado com Vite, execução paralela, HMR para testes e configuração zero. Ideal para projetos modernos que usam Vite como bundler.",
        },
        {
          name: "testing-library",
          icon: SiTestinglibrary,
          description:
            "Biblioteca para testes focados em comportamento do usuário. Testa componentes da forma como usuários interagem, promove boas práticas de acessibilidade e evita testes dependentes de implementação.",
        },
        {
          name: "cypress",
          icon: SiCypress,
          description:
            "Framework para testes end-to-end em navegador real. Time-travel debugging, screenshots automáticos, execução de comandos em tempo real e API intuitiva. Testa fluxos completos da aplicação.",
        },
        {
          name: "msw",
          icon: FaServer,
          description:
            "Mock Service Worker para interceptar requisições de rede. Simula APIs durante desenvolvimento e testes sem modificar código da aplicação. Funciona tanto em navegador quanto em Node.js.",
        },
        {
          name: "eslint",
          icon: SiEslint,
          description:
            "Ferramenta de análise estática de código JavaScript/TypeScript. Identifica problemas, enforça padrões de código, previne bugs e mantém consistência no projeto. Integra com editores e CI/CD.",
        },
        {
          name: "electron",
          icon: SiElectron,
          description:
            "Framework para criar aplicações desktop cross-platform usando tecnologias web. Combina Chromium e Node.js, permite acesso a APIs nativas do sistema operacional e distribuição em Windows, macOS e Linux.",
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
            "Runtime JavaScript server-side construído sobre V8. Execução assíncrona e non-blocking, ideal para APIs RESTful, microserviços, real-time com WebSockets e serviços de alta concorrência com baixo consumo de recursos.",
        },
        {
          name: "java",
          icon: FaJava,
          description:
            "Linguagem orientada a objetos para sistemas enterprise robustos. Usado em aplicações corporativas de grande escala, microserviços Spring Boot, APIs RESTful e sistemas que exigem performance, segurança e escalabilidade.",
        },
        {
          name: "nestjs",
          icon: SiNestjs,
          description:
            "Framework Node.js progressivo inspirado em Angular. Arquitetura modular com injeção de dependências, decorators TypeScript, suporte nativo a GraphQL e WebSockets. Ideal para APIs escaláveis e manuteníveis.",
        },
        {
          name: "express",
          icon: SiExpress,
          description:
            "Framework web minimalista e flexível para Node.js. Sistema de rotas robusto, middlewares customizáveis e grande ecossistema de plugins. Base para criação de APIs REST rápidas e performáticas.",
        },
        {
          name: "prisma",
          icon: SiPrisma,
          description:
            "ORM type-safe de próxima geração com schema declarativo. Migrations automáticas, cliente tipado que previne erros, introspection de banco existente e Prisma Studio para visualização de dados.",
        },
        {
          name: "postgresql",
          icon: SiPostgresql,
          description:
            "Banco de dados relacional open-source avançado. Suporte a JSON, full-text search, transações ACID, índices complexos e extensibilidade. Usado em aplicações que exigem integridade de dados e queries complexas.",
        },
        {
          name: "mysql",
          icon: SiMysql,
          description:
            "Sistema de gerenciamento de banco de dados relacional popular. Performance otimizada para leitura, replicação master-slave, clustering e ampla adoção na indústria. Ideal para aplicações web de alto tráfego.",
        },
        {
          name: "sql-server",
          icon: FaDatabase,
          description:
            "Banco de dados relacional da Microsoft para ambientes enterprise. Integração com ecossistema Azure, suporte a análise avançada, alta disponibilidade, segurança robusta e ferramentas de BI integradas.",
        },
        {
          name: "mongodb",
          icon: SiMongodb,
          description:
            "Banco de dados NoSQL orientado a documentos. Esquema flexível com documentos JSON/BSON, escalabilidade horizontal, aggregation pipeline poderoso. Ideal para dados não estruturados e aplicações que exigem rápida iteração.",
        },
        {
          name: "rest-api",
          icon: TbApi,
          description:
            "Padrão arquitetural para APIs web usando HTTP. Design de endpoints RESTful, uso correto de verbos HTTP (GET, POST, PUT, DELETE), status codes, versionamento e HATEOAS. Comunicação stateless entre cliente e servidor.",
        },
        {
          name: "jwt",
          icon: SiJsonwebtokens,
          description:
            "Padrão aberto para autenticação stateless baseada em tokens. Encoda claims de usuário em token assinado, permite autenticação distribuída sem sessão servidor, refresh tokens e verificação de integridade.",
        },
        {
          name: "oauth2",
          icon: TbBrandOauth,
          description:
            "Framework de autorização para delegação de acesso seguro. Implementação de fluxos (authorization code, implicit, client credentials), integração com providers externos (Google, GitHub) e proteção de recursos.",
        },
        {
          name: "swagger",
          icon: SiSwagger,
          description:
            "Ferramenta para documentação e design de APIs REST. Especificação OpenAPI para descrever endpoints, geração automática de documentação interativa, validação de contratos e cliente SDK para múltiplas linguagens.",
        },
        {
          name: "jest",
          icon: SiJest,
          description:
            "Framework de testes para serviços Node.js. Testes unitários de controllers, services e repositories, mocking de dependências, testes de integração com banco de dados e coverage reports detalhados.",
        },
        {
          name: "wiremock",
          icon: FaServer,
          description:
            "Servidor HTTP mock para simular APIs externas. Stub de responses, matching de requests, simulação de delays e falhas, record/playback de tráfego. Essencial para testes de integração isolados.",
        },
        {
          name: "robot-framework",
          icon: FaRobot,
          description:
            "Framework de automação de testes genérico baseado em keywords. Sintaxe legível para não-programadores, bibliotecas extensíveis, testes de aceitação, API testing e relatórios HTML detalhados.",
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
            "Framework para desenvolvimento mobile nativo multiplataforma. Código JavaScript renderiza componentes nativos, acesso a APIs do dispositivo, hot reload, reutilização de lógica entre iOS e Android e performance próxima ao nativo.",
        },
        {
          name: "expo",
          icon: SiExpo,
          description:
            "Plataforma e conjunto de ferramentas para React Native. Desenvolvimento sem Xcode/Android Studio, over-the-air updates, bibliotecas nativas pré-configuradas, build na nuvem e publicação simplificada nas stores.",
        },
        {
          name: "react-navigation",
          icon: SiReactrouter,
          description:
            "Biblioteca de navegação para React Native. Stack navigator, tab navigation, drawer, deep linking, transições customizadas e estado de navegação persistente. Padrão da indústria para routing em apps mobile.",
        },
        {
          name: "styled-components",
          icon: SiStyledcomponents,
          description:
            "Estilização CSS-in-JS adaptada para React Native. Temas dinâmicos, estilos baseados em props, reutilização através de styled utilities e manutenção de estilos colocalizados com componentes.",
        },
        {
          name: "ios",
          icon: SiApple,
          description:
            "Desenvolvimento e publicação de apps para ecossistema Apple. Configuração de provisioning profiles, otimização de bundle, App Store Connect, guidelines de interface iOS e certificados de distribuição.",
        },
        {
          name: "android",
          icon: SiAndroid,
          description:
            "Desenvolvimento e publicação de apps Android. Configuração de gradle, geração de APK/AAB assinado, Google Play Console, otimização para diferentes tamanhos de tela e versionamento de releases.",
        },
        {
          name: "jest",
          icon: SiJest,
          description:
            "Testes unitários e de integração para React Native. Mocking de módulos nativos, snapshot testing de componentes, testes de lógica de negócio e hooks. Integrado com React Native Testing Library.",
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
            "Arquitetura em camadas independentes (Entities, Use Cases, Adapters, Frameworks). Desacoplamento de regras de negócio da infraestrutura, testabilidade, manutenibilidade e facilidade de mudança de tecnologias.",
        },
        {
          name: "ddd",
          icon: MdAccountTree,
          description:
            "Domain-Driven Design para modelagem de sistemas complexos. Ubiquitous language, bounded contexts, agregados, value objects e domain events. Alinhamento entre código e domínio de negócio.",
        },
        {
          name: "micro-frontends",
          icon: AiOutlineApartment,
          description:
            "Arquitetura que divide aplicação front-end em módulos independentes. Times autônomos, deploy independente, tecnologias heterogêneas e integração em tempo de build ou runtime. Escalabilidade para grandes organizações.",
        },
        {
          name: "module-federation",
          icon: VscSymbolInterface,
          description:
            "Técnica Webpack 5 para compartilhamento dinâmico de código entre aplicações. Carregamento remoto de módulos, versionamento independente, code splitting avançado e redução de duplicação de dependências.",
          learning: true,
        },
        {
          name: "monorepo",
          icon: FaLayerGroup,
          description:
            "Estratégia de organizar múltiplos projetos em único repositório. Ferramentas como Nx, Turborepo ou Lerna, compartilhamento de código, versionamento unificado, CI/CD otimizado e refatoração cross-project.",
        },
        {
          name: "design-patterns",
          icon: HiOutlineCube,
          description:
            "Soluções reutilizáveis para problemas comuns de design. Padrões criacionais (Factory, Singleton), estruturais (Adapter, Decorator) e comportamentais (Observer, Strategy). Código mais manutenível e expressivo.",
        },
        {
          name: "performance",
          icon: MdSpeed,
          description:
            "Otimização de métricas Core Web Vitals (LCP, FID, CLS). Code splitting, lazy loading, otimização de imagens, cache strategies, Web Workers, memoization e técnicas de rendering performance.",
        },
        {
          name: "mvvm",
          icon: MdArchitecture,
          description:
            "Model-View-ViewModel para separação de responsabilidades. Separação entre lógica de apresentação (ViewModel), interface (View) e dados (Model). Binding bidirecional, testabilidade, reatividade e manutenibilidade em aplicações complexas.",
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
            "Sistema de controle de versão distribuído. Git Flow para gestão de branches, conventional commits, rebase interativo, cherry-pick, resolução de conflitos e estratégias de merge. Colaboração eficiente em equipe.",
        },
        {
          name: "github-actions",
          icon: SiGithubactions,
          description:
            "Plataforma de CI/CD integrada ao GitHub. Workflows automatizados com YAML, matrix builds, caching de dependências, deploy automático, testes em múltiplos ambientes e integração com marketplace de actions.",
        },
        {
          name: "azure-pipelines",
          icon: AzurePipelinesIcon,
          description:
            "Serviço de CI/CD da Azure DevOps. Pipelines YAML ou clássicos, multi-stage deployments, aprovações manuais, integração com Azure services, agents self-hosted e templates reutilizáveis.",
        },
        {
          name: "docker",
          icon: SiDocker,
          description:
            "Plataforma de containerização de aplicações. Criação de imagens leves, Dockerfile multi-stage, Docker Compose para ambientes locais, isolamento de processos e garantia de paridade dev/produção.",
        },
        {
          name: "kubernetes",
          icon: SiKubernetes,
          description:
            "Sistema de orquestração de containers em produção. Deployments, services, ingress, auto-scaling horizontal e vertical, self-healing, rolling updates e configuração via Helm charts.",
          learning: true,
        },
        {
          name: "terraform",
          icon: SiTerraform,
          description:
            "Ferramenta de Infrastructure as Code declarativa. Provisionamento multi-cloud com HCL, state management, módulos reutilizáveis, plan/apply seguro e versionamento de infraestrutura como código.",
          learning: true,
        },
        {
          name: "aws",
          icon: FaAws,
          description:
            "Plataforma de cloud computing da Amazon. Serviços como EC2, S3, Lambda, RDS, CloudFront, API Gateway, ECS/EKS. Deploy de aplicações escaláveis, serverless e infraestrutura global distribuída.",
        },
        {
          name: "azure",
          icon: AzureIcon,
          description:
            "Plataforma de cloud computing da Microsoft. App Service, Functions, Blob Storage, SQL Database, CDN e DevOps. Integração com ecossistema Microsoft e híbrido cloud-on premise.",
        },
        {
          name: "vercel",
          icon: SiVercel,
          description:
            "Plataforma de deploy otimizada para front-end e frameworks como Next.js. Deploy automático via Git, edge functions, preview deployments, CDN global, analytics e otimização de performance automática.",
        },
        {
          name: "firebase",
          icon: SiFirebase,
          description:
            "Backend-as-a-Service do Google para desenvolvimento rápido. Firestore (banco real-time), Authentication, Cloud Functions, Hosting, Storage e Analytics. Ideal para MVPs e aplicações real-time.",
        },
        {
          name: "sonarqube",
          icon: SiSonarqube,
          description:
            "Plataforma de análise contínua de qualidade de código. Detecção de bugs, vulnerabilidades de segurança, code smells, cobertura de testes e métricas de complexidade. Integração com CI/CD pipelines.",
        },
        {
          name: "ci-cd",
          icon: GoWorkflow,
          description:
            "Práticas de integração e entrega contínua. Automação de build, testes e deploy, feedback rápido, rollback seguro, feature flags, canary releases e deployment strategies (blue-green, rolling).",
        },
      ],
    },
  ],
};
