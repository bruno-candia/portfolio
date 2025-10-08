import Logo from "@/components/atoms/Logo";
import "./style.css";
import { SidebarMenuMobile } from "../SidebarMenuMobile";
import { Navigation } from "@/components/molecules/Navigation";
import { routes } from "@/routes";

export function Header() {
  return (
    <header id="header">
      <div className="header__logo">
        <Logo />
      </div>
      <div className="header__nav">
        <Navigation anchors={routes} />
      </div>
      <div className="header__menu">
        <SidebarMenuMobile />
      </div>
    </header>
  );
}
