import piecePaper from "@/assets/piece-paper.png";
import paperClips from "@/assets/paper-clips.png";
import "./style.css";

export function Education() {
  return (
    <section id="education">
      <div className="education__content">
        <div className="education__header">
          <h3 className="education__title">Educação</h3>
          <p className="education__description">
            Abaixo estão algumas das formações acadêmicas e cursos que concluí,
            cada um contribuindo significativamente para a minha capacitação e
            crescimento na área de tecnologia.
          </p>
        </div>

        <div className="education__paper-wrapper">
          <img
            src={piecePaper}
            alt="Papel rasgado"
            className="education__paper"
            loading="lazy"
            decoding="async"
          />
          <img
            src={paperClips}
            alt="Clipe de papel"
            className="education__clip"
            loading="lazy"
            decoding="async"
          />

          <div className="education__paper-content">
            <h3 className="education__degree">
              ENGENHARIA DE CONTROL E AUTOMAÇÃO
            </h3>
            <p className="education__line">
              Feito em{" "}
              <a
                href="https://inatel.br"
                target="_blank"
                rel="noreferrer"
                className="education__link"
              >
                INATEL
              </a>
            </p>
            <p className="education__line">Jan 2017 - Jul 2022</p>
          </div>
        </div>
      </div>
    </section>
  );
}
