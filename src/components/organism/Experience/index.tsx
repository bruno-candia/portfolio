import { useState } from "react";
import tornPaper from "@/assets/torn-paper.svg";
import { FoldingPaper } from "@/components/atoms/FoldingPaper";
import "./style.css";

const experiences = [
  {
    companyLogo:
      "https://media.licdn.com/dms/image/v2/C4E0BAQGXPkcsGk7KYA/company-logo_200_200/company-logo_200_200/0/1678379975390/beesb2b_logo?e=1762992000&v=beta&t=Vv5n0E3t4nIpzvdjvDjPVmZyAST-AS6SZetg8xLKhUo",
    role: "Desenvolvedor Full Stack",
    company: "BEES Brasil",
    period: "Jan 2023 - Atual",
    description:
      "Desenvolvimento de aplicações web utilizando React, TypeScript e Node.js. Implementação de features, testes automatizados e melhorias de performance.",
  },
  {
    companyLogo:
      "https://media.licdn.com/dms/image/v2/C4E0BAQGaEKT_mYTsww/company-logo_100_100/company-logo_100_100/0/1639756948830/startupaurem_logo?e=1762992000&v=beta&t=AhC0WrNp7mQ6uk81ic04G538vw3B3oF5uXKRML2fg2A",
    role: "Desenvolvedor Full Stack",
    company: "Startup Aurem",
    period: "Jan 2022 - Dez 2022",
    description:
      "Desenvolvimento de aplicações web utilizando React, TypeScript e Node.js.",
  },
  {
    companyLogo:
      "https://media.licdn.com/dms/image/v2/C4D0BAQHnvgaFSxLdOQ/company-logo_200_200/company-logo_200_200/0/1630579452723/verzel_solucoes_em_sistemas_logo?e=1762992000&v=beta&t=JZiNNxYB9uOgxS0QKywcwRNkxMY1CNatq4iebwUp2WU",
    role: "Desenvolvedor Full Stack",
    company: "Verzel",
    period: "Jan 2021 - Dez 2021",
    description: "Desenvolvimento de soluções em sistemas.",
  },
  {
    companyLogo:
      "https://media.licdn.com/dms/image/v2/D4D0BAQGJ-ATwrvUJuw/company-logo_200_200/company-logo_200_200/0/1684928508417?e=1762992000&v=beta&t=iCAYOyI86lcjm77fMhrpk23KKQCavh6MGfzkTuBZouI",
    role: "Desenvolvedor Junior",
    company: "Empresa 4",
    period: "Jan 2020 - Dez 2020",
    description: "Desenvolvimento de aplicações web.",
  },
];

export function Experience() {
  const [openCard, setOpenCard] = useState<number | null>(null);

  return (
    <section id="experience">
      <div className="experience__torn-paper">
        <img src={tornPaper} alt="" className="experience__torn-edge" />
      </div>

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
          {experiences.map((exp, index) => (
            <div
              key={index}
              className={`experience__card-wrapper ${
                openCard === index ? "open" : ""
              }`}
              onClick={() => setOpenCard(openCard === index ? null : index)}
            >
              <FoldingPaper
                companyLogo={exp.companyLogo}
                role={exp.role}
                company={exp.company}
                period={exp.period}
                description={exp.description}
              />
              <div className="experience__click-hint">
                <span className="experience__click-hint-arrow">↰</span>
                <span className="experience__click-hint-text">clique aqui</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
