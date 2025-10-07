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
            companyLogo="https://media.licdn.com/dms/image/v2/C4E0BAQGXPkcsGk7KYA/company-logo_200_200/company-logo_200_200/0/1678379975390/beesb2b_logo?e=1762992000&v=beta&t=Vv5n0E3t4nIpzvdjvDjPVmZyAST-AS6SZetg8xLKhUo"
            companyName="Empresa Exemplo"
          />
        </div>
      </div>
    </section>
  );
}
