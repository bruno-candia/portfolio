import Me from "@/assets/me.png";
import "./style.css";
import { RoughButton } from "@/components/atoms/RoughButton";
import { Suspense } from "react";

export function Hero() {
  return (
    <section id="hero">
      <div className="hero__content">
        <div>
          <p className="hero__greeting">Hello Wold :)</p>
          <h1 className="hero__title">Me chamo Bruno Candia</h1>
          <h5 className="hero__subtitle">ENGENHEIRO DE SOFTWARE</h5>
        </div>
        <img
          src={Me}
          className="hero__image"
          fetchPriority="high"
          decoding="async"
          alt="Bruno Candia - Engenheiro de Software"
        />
        <div className="hero__description">
          <blockquote className="hero__quote">
            <p>
              "Somos todos viajantes do tempo, viajando juntos rumo ao futuro.
              Mas vamos trabalhar juntos para fazer desse futuro um lugar que
              desejamos visitar. Sejam corajosos, sejam curiosos, sejam
              determinados, superem as adversidades."
            </p>
          </blockquote>
          <p className="hero__quote-author"> — Stephen Hawking</p>
        </div>
      </div>
      <Suspense fallback={null}>
        <RoughButton className="hero__cta">BAIXAR CSV</RoughButton>
      </Suspense>
    </section>
  );
}
