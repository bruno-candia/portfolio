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
      className="sidebar__content"
      id="mobile-navigation-menu"
      aria-hidden={!isOpen}
    >
      <ul role="list">
        {anchors.map((anchor) => (
          <li key={anchor.link}>
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
