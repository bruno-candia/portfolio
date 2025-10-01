import Logo from "@/components/atoms/Logo";
import "./style.css";
import { SidebarMenuMobile } from "../SidebarMenuMobile";

export function Header() {
  return (
    <header className="header">
      <div className="header__logo">
        <Logo />
      </div>
      <div className="header__menu">
        <SidebarMenuMobile />
      </div>
    </header>
  );
}
