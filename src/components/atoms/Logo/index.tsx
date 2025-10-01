import hangloose from "@/assets/hangloose.svg";
import "./style.css";

export interface ILogo {
  type?: "minimal" | "default";
}

function Logo({ type = "default" }: ILogo) {
  return (
    <div className="logo">
      <img src={hangloose} alt="Logo hang loose" className="logo__icon" />
      {type === "default" && <span className="logo__text">Bruno Candia</span>}
    </div>
  );
}

export default Logo;
