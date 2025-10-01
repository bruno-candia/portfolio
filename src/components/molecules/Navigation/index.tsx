import { NavButton } from "@/components/atoms/NavButton";
import "./styles.css";
interface INavigation {
  anchors: Array<{ text: string; link: string }>;
}

export function Navigation({ anchors }: INavigation) {
  return (
    <nav className="navigation">
      <ul className="navigation__list" role="list">
        {anchors.map((anchor) => (
          <li key={anchor.link} className="navigation__item">
            <NavButton href={anchor.link}>{anchor.text}</NavButton>
          </li>
        ))}
      </ul>
    </nav>
  );
}
