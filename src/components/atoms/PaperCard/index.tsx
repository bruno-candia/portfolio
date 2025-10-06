import type { ReactNode } from "react";
import "./style.css";

export type PaperCardVariant =
  | "default"
  | "blue"
  | "purple"
  | "green"
  | "orange"
  | "pink"
  | "yellow"
  | "cyan"
  | "teal";

interface PaperCardProps {
  children: ReactNode;
  variant?: PaperCardVariant;
}

export function PaperCard({ children, variant = "default" }: PaperCardProps) {
  return (
    <div className={`paper-card-wrapper paper-card-wrapper--${variant}`}>
      <div className="tape tape-top-left"></div>
      <div className="tape tape-top-right"></div>
      <div className="paper-card">{children}</div>
      <div className="tape tape-bottom-left"></div>
      <div className="tape tape-bottom-right"></div>
    </div>
  );
}
