import Me from "@/assets/me.svg";
import "./style.css";
import Rocket from "@/assets/rocket.svg";
import { RoughButton } from "@/components/atoms/RoughButton";
import { Suspense } from "react";

export function Hero() {
  return (
    <section id="about">
      <div className="hero__content">
        <p>Hello Wold :)</p>
        <h1>
          Me chamo <br />
          <span>BRUNO CANDIA</span>
        </h1>
        <h2>
          SOU&nbsp;<span>ENGENHEIRO DE SOFTWARE</span>
        </h2>
        <div className="description">
          <blockquote>
            <p>
              "Somos todos viajantes do tempo, viajando juntos rumo ao futuro.
              Mas vamos trabalhar juntos para fazer desse futuro um lugar que
              desejamos visitar. Sejam corajosos, sejam curiosos, sejam
              determinados, superem as adversidades."
            </p>
          </blockquote>
          <p> — Stephen Hawking</p>
        </div>
        <Suspense fallback={null}>
          <RoughButton className="hero_cta">Baixar CSV</RoughButton>
        </Suspense>
      </div>
      <img
        src={Me}
        className="hero__me"
        fetchPriority="high"
        decoding="async"
        width="400"
        height="400"
        alt="Bruno"
      />
    </section>
  );
}
