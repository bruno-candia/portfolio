import type { ReactNode } from "react";
import "./style.css";
interface INavButton extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
}

export function NavButton({ children, ...props }: INavButton) {
  return (
    <a className="nav-button" {...props}>
      {children}
    </a>
  );
}
