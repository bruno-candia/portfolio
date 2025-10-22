import Me from "@/assets/me.png";
import "./style.css";
import { RoughButton } from "@/components/atoms/RoughButton";
import { useTranslation } from "react-i18next";

export function Hero() {
  const { t } = useTranslation();

  return (
    <section id="hero">
      <div className="hero__content">
        <div>
          <p className="hero__greeting">{t("hero.greeting")}</p>
          <h1 className="hero__title">{t("hero.title")}</h1>
          <h2 className="hero__subtitle">{t("hero.subtitle")}</h2>
        </div>
        <img
          src={Me}
          className="hero__image"
          fetchPriority="high"
          decoding="async"
          alt="Bruno Candia - Software Engineer"
        />
        <div className="hero__description">
          <blockquote className="hero__quote">
            <p>"{t("hero.quote")}"</p>
          </blockquote>
          <p className="hero__quote-author"> — {t("hero.quoteAuthor")}</p>
        </div>
      </div>
      <RoughButton className="hero__cta">{t("hero.downloadCV")}</RoughButton>
    </section>
  );
}
