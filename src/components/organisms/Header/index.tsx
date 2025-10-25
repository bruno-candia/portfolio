import Logo from "@/components/atoms/Logo";
import { LanguageSwitcher } from "@/components/atoms/LanguageSwitcher";
import "./style.css";
import { SidebarMenuMobile } from "../SidebarMenuMobile";
import { Navigation } from "@/components/molecules/Navigation";
import { useTranslation } from "react-i18next";

export function Header() {
  const { t } = useTranslation();

  const routes = [
    { text: t("nav.about"), link: "#hero" },
    { text: t("nav.skills"), link: "#skills" },
    { text: t("nav.experience"), link: "#experience" },
    { text: t("nav.education"), link: "#education" },
    // { text: t("nav.contact"), link: "#footer" },
  ];

  return (
    <header id="header">
      <div className="header__logo">
        <Logo />
      </div>
      <div className="header__nav">
        <Navigation anchors={routes} />
      </div>
      <div className="header__actions">
        <LanguageSwitcher />
        <div className="header__menu">
          <SidebarMenuMobile />
        </div>
      </div>
    </header>
  );
}
