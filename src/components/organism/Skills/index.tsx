import { useState } from "react";
import { PaperCard } from "@/components/atoms/PaperCard";
import type { PaperCardVariant } from "@/components/atoms/PaperCard";
import { TechSticker } from "@/components/atoms/TechSticker";
import { skills } from "@/data/skillsData";
import type { TechStack } from "@/data/skillsData";
import "./style.css";

// Mapeamento de cores para cada categoria
const categoryColors: Record<
  string,
  { variant: PaperCardVariant; color: string }
> = {
  frontend: { variant: "blue", color: "#3b82f6" },
  backend: { variant: "cyan", color: "#06b6d4" },
  mobile: { variant: "pink", color: "#ec4899" },
  arquitetura: { variant: "teal", color: "#14b8a6" },
  devops: { variant: "orange", color: "#f97316" },
};

export function Skills() {
  const [selectedTech, setSelectedTech] = useState<
    Record<string, string | null>
  >({});

  const handleTechClick = (categoryTitle: string, techName: string) => {
    setSelectedTech((prev) => ({
      ...prev,
      [categoryTitle]: techName,
    }));
  };

  const getSelectedTechInfo = (categoryTitle: string, stacks: TechStack[]) => {
    const selectedName = selectedTech[categoryTitle];
    return stacks.find((tech) => tech.name === selectedName);
  };

  return (
    <section id="skills">
      <div className="skills__header">
        <h3 className="skills__title">Habilidades</h3>
        <p className="skills__description">
          Minhas competências abrangem o desenvolvimento front-end, back-end e
          DevOps, refletindo meu interesse contínuo pela inovação e minha
          dedicação ao aprendizado constante.
        </p>
      </div>
      <div className="skills__content">
        {skills.content.map(({ title, description, stacks }) => {
          const selectedTechInfo = getSelectedTechInfo(title, stacks);
          const categoryStyle =
            categoryColors[title] || categoryColors["scripts & automação"];

          return (
            <PaperCard key={title} variant={categoryStyle.variant}>
              <div className="skill-card">
                <div className="skill-card__header">
                  <h3 className="skill-card__title">{title}</h3>
                  <p className="skill-card__category-description">
                    {description}
                  </p>
                </div>

                <div className="skill-card__stickers">
                  {stacks.map((tech) => (
                    <TechSticker
                      key={tech.name}
                      Icon={tech.icon}
                      name={tech.name}
                      isSelected={selectedTech[title] === tech.name}
                      onClick={() => handleTechClick(title, tech.name)}
                      accentColor={categoryStyle.color}
                      size={40}
                      learning={tech.learning}
                    />
                  ))}
                </div>

                <div className="skill-card__description-area">
                  {selectedTechInfo ? (
                    <div className="skill-card__description active">
                      {selectedTechInfo.learning && (
                        <span className="skill-card__learning-badge">
                          Estudando
                        </span>
                      )}
                      <strong>{selectedTechInfo.name}</strong>
                      <p>{selectedTechInfo.description}</p>
                    </div>
                  ) : (
                    <div className="skill-card__description placeholder">
                      <p>Clique em um ícone para ver mais detalhes</p>
                    </div>
                  )}
                </div>
              </div>
            </PaperCard>
          );
        })}
      </div>
    </section>
  );
}
