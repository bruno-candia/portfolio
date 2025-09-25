import { useState } from "react";
import "./style.css";
import { routes } from "@/routes";
import { MobileNavigation } from "@/components/molecules/MobileNavigation";
import astronaut from "@/assets/astronaut.svg";

export function SidebarMenuMobile() {
  const [isOpenMenu, setIsOpenMenu] = useState<"open" | "close">("close");

  function handleMenu() {
    setIsOpenMenu((prev) => (prev === "open" ? "close" : "open"));
  }

  return (
    <div className="menu" data-open={isOpenMenu}>
      <div className="menu__paper-ear" onClick={handleMenu}>
        Click
      </div>
      <nav className="menu__off-canvas">
        <div className="menu__container">
          <img src={astronaut} alt="" />
          <MobileNavigation anchors={routes} />
        </div>
      </nav>
    </div>
  );
}
