import Logo from "@/components/atoms/Logo";
import "./style.css";

export function Footer() {
  return (
    <footer id="footer">
      <div className="footer__content">
        <p className="footer__copyright">
          Copyright © {new Date().getFullYear()} bruno candia
        </p>
        <p> Todos os direitos reservados</p>
        <div className="footer__logo">
          <Logo />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
