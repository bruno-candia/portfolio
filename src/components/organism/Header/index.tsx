import hangloose from "@/assets/hangloose.svg";
import "./style.css";
import { Navigation } from "@/components/molecules/Navigation";
import { routes } from "@/routes";
export function Header() {
  return (
    <header>
      <div className="logo">
        <img src={hangloose} alt="" />
        <p>Bruno Candia</p>
      </div>
      <div className="desktop-menu">
        <Navigation anchors={routes} />
      </div>
    </header>
  );
}
