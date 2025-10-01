import type { ButtonHTMLAttributes } from "react";
import "./style.css";

interface IMenuToggleButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  isOpen: boolean;
  onToggle: () => void;
}

export function MenuToggleButton({
  isOpen,
  onToggle,
  ...props
}: IMenuToggleButton) {
  return (
    <button
      type="button"
      className="menu-toggle-button"
      onClick={onToggle}
      aria-label={
        isOpen ? "Fechar menu de navegação" : "Abrir menu de navegação"
      }
      aria-expanded={isOpen}
      aria-controls="mobile-navigation-menu"
      {...props}
    >
      <span className="menu-toggle-button__text" aria-hidden="true">
        Click
        <br />
        {isOpen ? "↑" : "↓"}
      </span>
    </button>
  );
}
