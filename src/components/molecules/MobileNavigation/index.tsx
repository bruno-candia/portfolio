import { NavButton } from "@/components/atoms/NavButton";
import "./styles.css";
interface IMobileNavigation {
  anchors: Array<{ text: string; link: string }>;
}

export function MobileNavigation({ anchors }: IMobileNavigation) {
  return (
    <nav className="menu__content">
      <ul>
        {anchors.map((anchor) => (
          <li key={anchor.link}>
            <NavButton href={anchor.link}>{anchor.text}</NavButton>
          </li>
        ))}
      </ul>
    </nav>
  );
}
