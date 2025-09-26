import { NavButton } from "@/components/atoms/NavButton";
import "./styles.css";
interface INavigation {
  anchors: Array<{ text: string; link: string }>;
}

export function Navigation({ anchors }: INavigation) {
  return (
    <nav className="navigation__content">
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
