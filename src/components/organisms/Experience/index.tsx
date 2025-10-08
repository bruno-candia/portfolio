import { FoldingPaper } from "@/components/atoms/FoldingPaper";
import "./style.css";
import { experiencesData } from "@/data/experienceData";

export function Experience() {
  return (
    <section id="experience">
      <div className="experience__content">
        <div className="experience__header">
          <h2 className="experience__title">Experiência</h2>
          <p className="experience__description">
            Minha jornada profissional tem sido marcada por diversas
            oportunidades que me permitiram crescer e adquirir novas
            habilidades. Abaixo estão alguns dos cargos que ocupei, cada um
            contribuindo significativamente para minha formação como
            desenvolvedor e profissional de tecnologia.
          </p>
        </div>

        <div className="experience__cards">
          {experiencesData.map((exp, index) => (
            <div key={index} className="experience__card-wrapper">
              <FoldingPaper descriptions={exp.descriptions} />

              <div className="experience__info">
                <img
                  src={exp.companyLogo}
                  alt={exp.company}
                  className="experience__company-logo"
                  loading="lazy"
                  decoding="async"
                />
                <div className="experience__details">
                  <h3 className="experience__company-name">{exp.company}</h3>
                  <p className="experience__role">{exp.role}</p>
                  <p className="experience__period">{exp.period}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
