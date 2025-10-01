import { useState, useEffect } from "react";
import "./style.css";
import { routes } from "@/routes";
import { MobileNavigation } from "@/components/molecules/MobileNavigation";
import { MenuToggleButton } from "@/components/atoms/MenuToggleButton";
import astronaut from "@/assets/astronaut.svg";

export function SidebarMenuMobile() {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  function handleMenu() {
    setIsOpenMenu((prev) => !prev);
  }

  // Fecha o menu quando ESC é pressionado
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape" && isOpenMenu) {
        setIsOpenMenu(false);
      }
    }

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpenMenu]);

  // Previne scroll quando o menu está aberto
  useEffect(() => {
    if (isOpenMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpenMenu]);

  const dataOpen = isOpenMenu ? "open" : "close";

  return (
    <aside
      className="sidebar"
      data-open={dataOpen}
      aria-label="Menu de navegação móvel"
    >
      <MenuToggleButton isOpen={isOpenMenu} onToggle={handleMenu} />

      <nav
        className="sidebar__off-canvas"
        role="navigation"
        aria-label="Navegação principal"
      >
        <div className="sidebar__container">
          <img
            src={astronaut}
            alt="Ilustração de um astronauta flutuando no espaço"
            role="img"
          />
          <MobileNavigation
            anchors={routes}
            isOpen={isOpenMenu}
            onNavigate={() => setIsOpenMenu(false)}
          />
        </div>
      </nav>
    </aside>
  );
}
