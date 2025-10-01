import ReactLogo from "@/assets/react.svg";
import { Sticker, type StickerPeel } from "@/components/atoms/sticker";
import type { ReactNode } from "react";
import "./style.css";

type SkillTool = {
  name: string;
  description: string;
  background: string;
  color?: string;
  accent?: string;
  icon: ReactNode;
  peel?: StickerPeel;
  rotation?: number;
};

type SkillArea = {
  id: string;
  title: string;
  description: string;
  tools: SkillTool[];
};

const TypeScriptIcon = () => (
  <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false">
    <rect width="48" height="48" rx="11" fill="#3178C6" />
    <text
      x="50%"
      y="54%"
      textAnchor="middle"
      dominantBaseline="middle"
      fontSize="20"
      fontWeight="700"
      fill="#ffffff"
      fontFamily="'Inter', 'Segoe UI', sans-serif"
    >
      TS
    </text>
  </svg>
);

const NextIcon = () => (
  <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false">
    <rect width="48" height="48" rx="13" fill="#0F0F0F" />
    <path d="M16 16h2.8v16H16z" fill="#ffffff" />
    <path d="M20.6 16h2.6L34 32h-2.8z" fill="#ffffff" />
    <path d="M28.8 16h2.8v16h-2.8z" fill="#ffffff" />
    <path
      d="M34 16h6c3.1 0 5.2 1.9 5.2 4.9c0 2.5-1.5 4.1-3.8 4.8l4.1 6.3h-3.2l-3.6-5.6h-2.2V32H34zm2.8 7.9h2.5c1.5 0 2.4-.8 2.4-2s-.9-1.9-2.4-1.9h-2.5z"
      fill="#ffffff"
    />
    <path
      d="M18.8 32h18.4"
      stroke="#ffffff"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeOpacity="0.12"
    />
  </svg>
);

const TailwindIcon = () => (
  <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false">
    <rect width="48" height="48" rx="14" fill="#0F172A" />
    <path
      d="M10 24C12.2 18 17 13 24 13C31 13 34.2 16 35 21C33 27 28 31 21 31C14 31 11 28 10 24Z"
      fill="#38BDF8"
    />
    <path
      d="M22 31C24 25 29 20 36 20C43 20 46 23 47 28C45 34 40 38 33 38C26 38 23 35 22 31Z"
      fill="#0EA5E9"
      opacity="0.92"
    />
  </svg>
);

const NodeIcon = () => (
  <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false">
    <path d="M24 4L42 14.5V33.5L24 44L6 33.5V14.5Z" fill="#3C873A" />
    <path
      d="M24 9.8L11.5 16.6V31.4L24 38.2L36.5 31.4V16.6Z"
      fill="#0F172A"
      opacity="0.25"
    />
    <text
      x="50%"
      y="57%"
      textAnchor="middle"
      dominantBaseline="middle"
      fontSize="14"
      fontWeight="700"
      fill="#ECFDF5"
      fontFamily="'Fira Code', 'Courier New', monospace"
    >
      JS
    </text>
  </svg>
);

const NestIcon = () => (
  <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false">
    <rect width="48" height="48" rx="14" fill="#BE123C" />
    <path
      d="M33.5 14.5C31 11.8 27.3 10.7 23.8 11.9C20.1 13.1 17.7 16.5 17.6 20.6V20.8C14.8 22.2 13 25 13 28.2C13 32.8 16.7 36.5 21.3 36.5C24.2 36.5 26.8 35 28.2 32.5C30.2 34 32.9 34.5 35.3 33.7C39.2 32.5 41.8 29 41.9 25C42 21.1 40.3 17.6 33.5 14.5Z"
      fill="#F43F5E"
    />
    <path
      d="M30.8 19.4C32.5 21.4 33.3 23.3 33.2 25C33.1 27.8 30.8 30.3 27.8 30.8"
      stroke="#FDF2F8"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.85"
    />
  </svg>
);

const PostgresIcon = () => (
  <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false">
    <rect width="48" height="48" rx="14" fill="#1D4ED8" />
    <path
      d="M24 12C18.2 12 13.5 16.7 13.5 22.5C13.5 24 13.9 25.5 14.5 26.8C12.6 28.1 11.4 30.1 11.4 32.4C11.4 36.4 14.8 39.6 19 39.6C20.7 39.6 22.3 39 23.6 38.1L24.1 37.7L24.6 38.1C25.9 39 27.5 39.6 29.2 39.6C33.4 39.6 36.8 36.4 36.8 32.4C36.8 30.1 35.6 28.1 33.7 26.8C34.3 25.5 34.7 24 34.7 22.5C34.5 16.7 29.8 12 24 12Z"
      fill="#0F172A"
      stroke="#38BDF8"
      strokeWidth="1.6"
    />
    <circle cx="19" cy="24.5" r="2.4" fill="#38BDF8" />
    <circle cx="29" cy="24.5" r="2.4" fill="#38BDF8" />
    <path
      d="M21 29C22 30 23.3 30.5 24 30.5C24.7 30.5 26 30 27 29"
      stroke="#38BDF8"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);

const PrismaIcon = () => (
  <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false">
    <rect width="48" height="48" rx="14" fill="#0F172A" />
    <path
      d="M19.5 7.5L8 33L24 41.5L40 33L31 13.5L19.5 7.5Z"
      fill="#0B192F"
      stroke="#A5F3FC"
      strokeWidth="1.2"
      strokeLinejoin="round"
    />
    <path
      d="M19.5 7.5L40 33L24 41.5L24.2 25.2Z"
      fill="#1D4ED8"
      opacity="0.65"
    />
  </svg>
);

const ExpoIcon = () => (
  <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false">
    <rect width="48" height="48" rx="14" fill="#020817" />
    <path d="M16 34H12.5L20 14H28L35.5 34H32L26 18.5H25.9Z" fill="#FAFAFA" />
  </svg>
);

const KotlinIcon = () => (
  <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false">
    <defs>
      <linearGradient
        id="kotlinGradient"
        x1="6"
        y1="6"
        x2="42"
        y2="42"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0%" stopColor="#FF6D5A" />
        <stop offset="50%" stopColor="#FF8A00" />
        <stop offset="100%" stopColor="#6559FF" />
      </linearGradient>
    </defs>
    <rect width="48" height="48" rx="12" fill="url(#kotlinGradient)" />
    <polygon points="12,41 24,29 36,41" fill="#2D1B69" opacity="0.35" />
    <polygon points="12,7 24,19 12,31" fill="#FD9F4B" opacity="0.75" />
  </svg>
);

const FlutterIcon = () => (
  <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false">
    <rect width="48" height="48" rx="12" fill="#0F172A" />
    <path d="M12 28L25 15H33L18.5 29.5L12 28Z" fill="#38BDF8" />
    <path
      d="M18.5 29.5L24.5 23.5L33 32H25.5L21 36.5L18.5 29.5Z"
      fill="#0EA5E9"
    />
  </svg>
);

const DockerIcon = () => (
  <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false">
    <rect width="48" height="48" rx="14" fill="#0B3D91" />
    <rect x="12" y="18" width="6" height="6" rx="1" fill="#E0F2FE" />
    <rect x="20" y="18" width="6" height="6" rx="1" fill="#E0F2FE" />
    <rect x="28" y="18" width="6" height="6" rx="1" fill="#E0F2FE" />
    <rect x="20" y="26" width="6" height="6" rx="1" fill="#E0F2FE" />
    <rect x="28" y="26" width="6" height="6" rx="1" fill="#E0F2FE" />
    <path
      d="M12 28C12 35 17.5 38.5 25 38.5C31.5 38.5 36 36 37.5 32.5C39 29 38 27 34 27H12Z"
      fill="#0EA5E9"
      opacity="0.9"
    />
  </svg>
);

const AwsIcon = () => (
  <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false">
    <rect width="48" height="48" rx="14" fill="#111827" />
    <text
      x="50%"
      y="53%"
      textAnchor="middle"
      dominantBaseline="middle"
      fontSize="16"
      fontWeight="600"
      fill="#F5F3FF"
      fontFamily="'Fira Sans', 'Inter', sans-serif"
      letterSpacing="2"
    >
      aws
    </text>
    <path
      d="M16 32C20 34.5 24.5 35.8 29 35.8C33.5 35.8 36.8 34.5 38.8 33"
      stroke="#F97316"
      strokeWidth="2.4"
      strokeLinecap="round"
    />
  </svg>
);

const GithubActionsIcon = () => (
  <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false">
    <rect width="48" height="48" rx="14" fill="#0F172A" />
    <circle cx="16" cy="18" r="4" fill="#22D3EE" />
    <circle cx="32" cy="13" r="3" fill="#38BDF8" />
    <circle cx="32" cy="31" r="4" fill="#818CF8" />
    <path
      d="M19 20C22 23 28 24 30 24"
      stroke="#94A3B8"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.8"
    />
    <path
      d="M19 17C23 13 28 14 30 15"
      stroke="#94A3B8"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.8"
    />
    <path
      d="M19 22C22.5 27 28 28.5 30 29"
      stroke="#94A3B8"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity="0.8"
    />
  </svg>
);

const TerraformIcon = () => (
  <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false">
    <rect width="48" height="48" rx="14" fill="#1F1444" />
    <path d="M12 10L22 16V28L12 22V10Z" fill="#7C3AED" />
    <path d="M24 16L34 10V22L24 28V16Z" fill="#8B5CF6" />
    <path d="M24 30L34 24V36L24 42V30Z" fill="#6D28D9" />
  </svg>
);

const ReactNativeIcon = () => (
  <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false">
    <rect width="48" height="48" rx="14" fill="#0B1F33" />
    <g transform="translate(4 4) scale(0.78)">
      <circle cx="28" cy="28" r="4" fill="#61DAFB" />
      <g fill="none" stroke="#61DAFB" strokeWidth="3">
        <ellipse cx="28" cy="28" rx="18" ry="8" transform="rotate(0 28 28)" />
        <ellipse cx="28" cy="28" rx="18" ry="8" transform="rotate(60 28 28)" />
        <ellipse cx="28" cy="28" rx="18" ry="8" transform="rotate(120 28 28)" />
      </g>
    </g>
  </svg>
);

const ReactIcon = () => (
  <img src={ReactLogo} alt="" loading="lazy" decoding="async" />
);

const skillAreas: SkillArea[] = (() => {
  const peelSequence: StickerPeel[] = [
    "top-right",
    "bottom-left",
    "top-left",
    "bottom-right",
    "bottom-left",
    "top-right",
    "bottom-right",
    "top-left",
  ];
  const rotationSequence = [
    -8, 6, -5, 10, -12, 8, -6, 9, -4, 11, -9, 7, -7, 5, -10, 12,
  ];
  let peelCursor = 0;
  let rotationCursor = 0;

  const areas: SkillArea[] = [
    {
      id: "frontend",
      title: "Desenvolvimento Front-end",
      description:
        "Essa é uma área pela qual sou apaixonado, pois me permite criar interfaces de usuário dinâmicas e eficientes, proporcionando uma experiência intuitiva e agradável para os usuários finais.",
      tools: [
        {
          name: "React",
          description:
            "Biblioteca que uso para construir interfaces reativas, componentizadas e fáceis de evoluir.",
          background: "#0B1F33",
          color: "#61DAFB",
          accent: "rgba(97, 218, 251, 0.4)",
          icon: <ReactIcon />,
        },
        {
          name: "TypeScript",
          description:
            "Tipagem estática para organizar o código, reduzir bugs e documentar contratos da aplicação.",
          background: "#1C64F2",
          color: "#F8FAFC",
          accent: "rgba(248, 250, 252, 0.35)",
          icon: <TypeScriptIcon />,
        },
        {
          name: "Next.js",
          description:
            "Framework que acelera projetos React com SSR, ISR e uma estrutura pronta para produção.",
          background: "#0f1117",
          color: "#F3F4F6",
          accent: "rgba(243, 244, 246, 0.2)",
          icon: <NextIcon />,
        },
        {
          name: "Tailwind CSS",
          description:
            "CSS utilitário que me ajuda a prototipar rápido, mantendo design consistente e escalável.",
          background: "#132b3a",
          color: "#E0F2FE",
          accent: "rgba(56, 189, 248, 0.35)",
          icon: <TailwindIcon />,
        },
      ],
    },
    {
      id: "backend",
      title: "Desenvolvimento Back-end",
      description:
        "Essa área de desenvolvimento me permite construir sistemas robustos, escaláveis e eficientes, garantindo alta disponibilidade, desempenho otimizado e a capacidade de lidar com grandes volumes de dados e tráfego.",
      tools: [
        {
          name: "Node.js",
          description:
            "Runtime JavaScript para criar APIs e serviços escaláveis com ecossistema moderno.",
          background: "#1a3a24",
          color: "#D1FAE5",
          accent: "rgba(209, 250, 229, 0.25)",
          icon: <NodeIcon />,
        },
        {
          name: "NestJS",
          description:
            "Framework opinativo que organiza o back-end com módulos, injeção de dependência e testes fáceis.",
          background: "#5a1425",
          color: "#FCE7F3",
          accent: "rgba(244, 63, 94, 0.28)",
          icon: <NestIcon />,
        },
        {
          name: "PostgreSQL",
          description:
            "Banco relacional para lidar com dados críticos, com extensões, JSONB e alta confiabilidade.",
          background: "#18386f",
          color: "#E0F2FE",
          accent: "rgba(96, 165, 250, 0.3)",
          icon: <PostgresIcon />,
        },
        {
          name: "Prisma",
          description:
            "ORM que facilita acesso ao banco, gera tipos automáticos e agiliza migrações seguras.",
          background: "#101c2c",
          color: "#BAE6FD",
          accent: "rgba(186, 230, 253, 0.35)",
          icon: <PrismaIcon />,
        },
      ],
    },
    {
      id: "mobile",
      title: "Desenvolvimento Mobile",
      description:
        "Este campo me permite desenvolver apps móveis de alto desempenho com ótimas experiências para os usuários em diversos dispositivos.",
      tools: [
        {
          name: "React Native",
          description:
            "Framework que entrega apps nativos reutilizando o ecossistema React com excelente performance.",
          background: "#11283a",
          color: "#BAE6FD",
          accent: "rgba(186, 230, 253, 0.35)",
          icon: <ReactNativeIcon />,
        },
        {
          name: "Expo",
          description:
            "Ferramenta que acelera o desenvolvimento mobile com build simplificado e atualizações OTA.",
          background: "#1c2436",
          color: "#F8FAFC",
          accent: "rgba(248, 250, 252, 0.2)",
          icon: <ExpoIcon />,
        },
        {
          name: "Kotlin",
          description:
            "Linguagem moderna para Android com null-safety, corrotinas e interoperabilidade com Java.",
          background: "#39206b",
          color: "#FFEFD7",
          accent: "rgba(255, 224, 170, 0.35)",
          icon: <KotlinIcon />,
        },
        {
          name: "Flutter",
          description:
            "SDK que gera interfaces fluidas com um único código base e renderizador próprio.",
          background: "#172f45",
          color: "#D6EEFF",
          accent: "rgba(214, 238, 255, 0.34)",
          icon: <FlutterIcon />,
        },
      ],
    },
    {
      id: "devops",
      title: "DevOps",
      description:
        "Essa área de desenvolvimento me permite automatizar processos, melhorar a eficiência e garantir a confiabilidade dos sistemas.",
      tools: [
        {
          name: "Docker",
          description:
            "Contenerização para padronizar ambiente, facilitar deploy e escalar serviços com confiança.",
          background: "#12395a",
          color: "#E0F2FE",
          accent: "rgba(224, 242, 254, 0.3)",
          icon: <DockerIcon />,
        },
        {
          name: "AWS",
          description:
            "Plataforma em nuvem para hospedar aplicações resilientes, escaláveis e seguras.",
          background: "#1b1f2a",
          color: "#F8FAFC",
          accent: "rgba(248, 250, 252, 0.25)",
          icon: <AwsIcon />,
        },
        {
          name: "GitHub Actions",
          description:
            "CI/CD como código para automatizar testes, builds e deploys em qualquer etapa da pipeline.",
          background: "#111d2c",
          color: "#E2E8F0",
          accent: "rgba(148, 163, 184, 0.3)",
          icon: <GithubActionsIcon />,
        },
        {
          name: "Terraform",
          description:
            "Infraestrutura como código para versionar recursos cloud e replicar ambientes rapidamente.",
          background: "#291d59",
          color: "#EDE9FE",
          accent: "rgba(237, 233, 254, 0.3)",
          icon: <TerraformIcon />,
        },
      ],
    },
  ];

  return areas.map((area) => ({
    ...area,
    tools: area.tools.map((tool) => ({
      ...tool,
      peel: peelSequence[peelCursor++ % peelSequence.length],
      rotation: rotationSequence[rotationCursor++ % rotationSequence.length],
    })),
  }));
})();

export function Skills() {
  return (
    <section id="skills">
      <header className="skills__header">
        <span className="skills__tag">Habilidades</span>
        <h3>Meu painel de stacks favoritas</h3>
        <p>
          Um mural com os conhecimentos que aplico no dia a dia. Passe o mouse
          (ou toque) e descubra um pouco mais sobre cada tecnologia.
        </p>
      </header>

      <div className="skills__grid">
        {skillAreas.map((area) => (
          <article key={area.id} className="skills__area-card">
            <span className="skills__area-tape" aria-hidden="true" />

            <div className="skills__area-inner">
              <header className="skills__area-header">
                <span className="skills__area-hand" aria-hidden="true">
                  {area.title}
                </span>
                <h4>{area.title}</h4>
              </header>
              <p className="skills__area-description">{area.description}</p>
              <div className="skills__tools-intro">
                <strong>Linguagens e Ferramentas</strong>
                <span>
                  Passe o mouse ou clique sobre o cartão para ler a descrição de
                  cada linguagem/ferramenta
                </span>
              </div>
              <div className="skills__stickers">
                {area.tools.map((tool) => (
                  <Sticker
                    key={`${area.id}-${tool.name}`}
                    label={tool.name}
                    description={tool.description}
                    background={tool.background}
                    color={tool.color}
                    accent={tool.accent}
                    icon={tool.icon}
                    peel={tool.peel}
                    rotation={tool.rotation}
                  />
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
