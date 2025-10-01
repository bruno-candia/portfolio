import type { ComponentPropsWithoutRef, CSSProperties, ReactNode } from "react";
import "./style.css";

export type StickerPeel =
  | "top-right"
  | "top-left"
  | "bottom-right"
  | "bottom-left";

interface StickerProps
  extends Omit<ComponentPropsWithoutRef<"button">, "children" | "type"> {
  label: string;
  description: string;
  background: string;
  color?: string;
  accent?: string;
  icon?: ReactNode;
  peel?: StickerPeel;
  rotation?: number;
}

export function Sticker({
  label,
  description,
  background,
  color,
  accent,
  icon,
  peel = "bottom-right",
  rotation = 0,
  className,
  style,
  ...buttonProps
}: StickerProps) {
  const inlineStyle: CSSProperties = {
    "--sticker-bg": background,
    "--sticker-text": color ?? "#ffffff",
    "--sticker-accent": accent ?? "rgba(255, 255, 255, 0.22)",
    "--sticker-rotation": `${rotation}deg`,
    ...style,
  } as CSSProperties;

  const classes = ["sticker", `sticker--peel-${peel}`, className]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type="button"
      {...buttonProps}
      className={classes}
      style={inlineStyle}
      aria-label={`${label}: ${description}`}
    >
      <span className="sticker__content">
        {icon ? <span className="sticker__icon">{icon}</span> : null}
        <span className="sticker__label">{label}</span>
        <span className="sticker__accent" aria-hidden="true" />
      </span>
      <span className="sticker__tooltip" role="tooltip">
        <strong>{label}</strong>
        {description}
      </span>
    </button>
  );
}
