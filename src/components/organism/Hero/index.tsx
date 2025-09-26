import Me from "@/assets/me.svg";
import "./style.css";
import Rocket from "@/assets/rocket.svg";
import { RoughButton } from "@/components/atoms/RoughButton";

export function Hero() {
  return (
    <div id="about">
      <div className="hero__content">
        <p>Ola :)</p>
        <h1>
          Me chamo <br />
          Bruno Candia
        </h1>
        <h2>
          SOU&nbsp;<span>ENGENHEIRO DE SOFTWARE</span>
        </h2>
        <div className="description">
          <img className="hero__rocket" src={Rocket} alt="" />
          <p>
            "We are all time travellers, journeying together into the future.
            But let us work together to make that future a place we want to
            visit. Be brave, be curious, be determined, overcome the odds." —
            Stephen Hawking
          </p>
        </div>

        <RoughButton className="hero_cta">Baixar CSV</RoughButton>
      </div>
      <img className="hero__me" src={Me} alt="" />
    </div>
  );
}
