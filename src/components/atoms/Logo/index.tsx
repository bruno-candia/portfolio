import hangloose from "@/assets/hangloose.svg";
import "./style.css";

export interface ILogo {
  type?: "minimal" | "default";
}

function Logo({ type = "default" }: ILogo) {
  return (
    <div className="logo">
      <img src={hangloose} alt="" />
      {type === "default" && <p>Bruno Candia</p>}
    </div>
  );
}

export default Logo;
