import { NavButton } from "@/components/atoms/NavButton";
import "./styles.css";

interface IMobileNavigation {
  anchors: Array<{ text: string; link: string }>;
  isOpen: boolean;
  onNavigate: () => void;
}

export function MobileNavigation({
  anchors,
  isOpen,
  onNavigate,
}: IMobileNavigation) {
  function handleClick() {
    onNavigate();
  }

  return (
    <nav
      className="mobile-navigation"
      id="mobile-navigation-menu"
      aria-hidden={!isOpen}
    >
      <ul className="mobile-navigation__list" role="list">
        {anchors.map((anchor) => (
          <li key={anchor.link} className="mobile-navigation__item">
            <NavButton
              href={anchor.link}
              onClick={handleClick}
              tabIndex={isOpen ? 0 : -1}
            >
              {anchor.text}
            </NavButton>
          </li>
        ))}
      </ul>
    </nav>
  );
}
