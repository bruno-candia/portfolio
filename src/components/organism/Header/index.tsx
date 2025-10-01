import Logo from "@/components/atoms/Logo";
import "./style.css";
import { SidebarMenuMobile } from "../SidebarMenuMobile";
export function Header() {
  return (
    <header>
      <Logo />
      <SidebarMenuMobile />
    </header>
  );
}
