import Logo from "@/components/atoms/Logo";
import { useTranslation } from "react-i18next";
import "./style.css";

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer id="footer">
      <div className="footer__content">
        <p className="footer__copyright">
          {t("footer.copyright", { year: new Date().getFullYear() })}
        </p>
        <p>{t("footer.rights")}</p>
        <div className="footer__logo">
          <Logo />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
