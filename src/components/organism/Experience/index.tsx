import tornPaper from "@/assets/torn-paper.svg";
import { FoldingPaper } from "@/components/atoms/FoldingPaper";
import "./style.css";

export function Experience() {
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
          <FoldingPaper
            companyLogo="https://media.licdn.com/dms/image/v2/C4D0BAQHm1ULYG7xpsw/company-logo_200_200/company-logo_200_200/0/1630576352747/beesbrasil_logo?e=1762992000&v=beta&t=GeCrbz-0NOlDCRoJXo42kXVkDvlCBOobxKJacYRsDl8"
            role="Desenvolvedor Full Stack"
            company="BEES Brasil"
            period="Jan 2023 - Atual"
            description="Desenvolvimento de aplicações web utilizando React, TypeScript e Node.js. Implementação de features, testes automatizados e melhorias de performance."
          />
          <FoldingPaper
            companyLogo="https://media.licdn.com/dms/image/v2/C4D0BAQHm1ULYG7xpsw/company-logo_200_200/company-logo_200_200/0/1630576352747/beesbrasil_logo?e=1762992000&v=beta&t=GeCrbz-0NOlDCRoJXo42kXVkDvlCBOobxKJacYRsDl8"
            role="Desenvolvedor Full Stack"
            company="BEES Brasil"
            period="Jan 2023 - Atual"
            description="Desenvolvimento de aplicações web utilizando React, TypeScript e Node.js. Implementação de features, testes automatizados e melhorias de performance."
          />
          <FoldingPaper
            companyLogo="https://media.licdn.com/dms/image/v2/C4D0BAQHm1ULYG7xpsw/company-logo_200_200/company-logo_200_200/0/1630576352747/beesbrasil_logo?e=1762992000&v=beta&t=GeCrbz-0NOlDCRoJXo42kXVkDvlCBOobxKJacYRsDl8"
            role="Desenvolvedor Full Stack"
            company="BEES Brasil"
            period="Jan 2023 - Atual"
            description="Desenvolvimento de aplicações web utilizando React, TypeScript e Node.js. Implementação de features, testes automatizados e melhorias de performance."
          />
          <FoldingPaper
            companyLogo="https://media.licdn.com/dms/image/v2/C4D0BAQHm1ULYG7xpsw/company-logo_200_200/company-logo_200_200/0/1630576352747/beesbrasil_logo?e=1762992000&v=beta&t=GeCrbz-0NOlDCRoJXo42kXVkDvlCBOobxKJacYRsDl8"
            role="Desenvolvedor Full Stack"
            company="BEES Brasil"
            period="Jan 2023 - Atual"
            description="Desenvolvimento de aplicações web utilizando React, TypeScript e Node.js. Implementação de features, testes automatizados e melhorias de performance."
          />
        </div>
      </div>
    </section>
  );
}
