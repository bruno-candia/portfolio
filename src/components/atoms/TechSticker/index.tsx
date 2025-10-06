import type { IconType } from "react-icons";
import { useMemo } from "react";
import "./style.css";

interface TechStickerProps {
  Icon: IconType;
  name: string;
  isSelected: boolean;
  onClick: () => void;
  accentColor?: string;
  size?: number;
  learning?: boolean;
}

function getRotationFromName(name: string): number {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash << 5) - hash + name.charCodeAt(i);
    hash = hash & hash;
  }
  return (hash % 41) - 20;
}

export function TechSticker({
  Icon,
  name,
  isSelected,
  onClick,
  accentColor = "#4a5568",
  size = 40,
  learning = false,
}: TechStickerProps) {
  const rotation = useMemo(() => getRotationFromName(name), [name]);

  return (
    <div
      className={`tech-sticker ${isSelected ? "selected" : ""} ${
        learning ? "learning" : ""
      }`}
      onClick={onClick}
      style={
        {
          transform: `rotate(${rotation}deg)`,
          "--sticker-color": accentColor,
        } as React.CSSProperties
      }
      title={learning ? `${name} (estudando)` : name}
    >
      <div className="tech-sticker__wrapper">
        <div className="tech-sticker__background" />
        <div className="tech-sticker__icon-wrapper">
          <Icon size={size - 8} />
        </div>
      </div>
    </div>
  );
}
