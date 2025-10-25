import { useState, useEffect } from "react";
import "./style.css";
import { MobileNavigation } from "@/components/molecules/MobileNavigation";
import { MenuToggleButton } from "@/components/atoms/MenuToggleButton";
import astronaut from "@/assets/astronaut.svg";
import { useTranslation } from "react-i18next";

export function SidebarMenuMobile() {
  const { t } = useTranslation();
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const routes = [
    { text: t("nav.about"), link: "#hero" },
    { text: t("nav.skills"), link: "#skills" },
    { text: t("nav.experience"), link: "#experience" },
    { text: t("nav.education"), link: "#education" },
    // { text: t("nav.contact"), link: "#footer" },
  ];

  function handleMenu() {
    setIsOpenMenu((prev) => !prev);
  }

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape" && isOpenMenu) {
        setIsOpenMenu(false);
      }
    }

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpenMenu]);

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
            loading="lazy"
            decoding="async"
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
