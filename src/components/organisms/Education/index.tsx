import piecePaper from "@/assets/piece-paper.png";
import paperClips from "@/assets/paper-clips.png";
import { useTranslation } from "react-i18next";
import "./style.css";

export function Education() {
  const { t } = useTranslation();

  return (
    <section id="education">
      <div className="education__content">
        <div className="education__header">
          <h2 className="education__title">{t("education.title")}</h2>
          <p className="education__description">{t("education.description")}</p>
        </div>

        <div className="education__paper-wrapper">
          <img
            src={piecePaper}
            alt="Torn paper"
            className="education__paper"
            loading="lazy"
            decoding="async"
          />
          <img
            src={paperClips}
            alt="Paper clip"
            className="education__clip"
            loading="lazy"
            decoding="async"
          />

          <div className="education__paper-content">
            <h3 className="education__degree">{t("education.degree")}</h3>
            <p className="education__line">
              {t("education.madeAt")}{" "}
              <a
                href="https://inatel.br"
                target="_blank"
                rel="noreferrer"
                className="education__link"
              >
                INATEL
              </a>
            </p>
            <p className="education__line">{t("education.period")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
