import { useState, useEffect, useRef } from "react";
import scotchTape from "@/assets/scotch-tape.png";
import "./style.css";

interface FoldingPaperProps {
  descriptions: string[];
}

export function FoldingPaper({ descriptions }: FoldingPaperProps) {
  const [isOpen, setIsOpen] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        frameRef.current &&
        !frameRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div
      ref={frameRef}
      id="frame"
      className={isOpen ? "open" : ""}
      onClick={handleClick}
    >
      <div id="stage">
        <div className="box"></div>
        <div className="box" data-hint="Clique aqui para saber mais"></div>
        <div className="box"></div>
        <div className="box"></div>
        <img className="paper-content_tape" src={scotchTape} alt="" />

        <ul className="paper-content">
          {descriptions.map((description) => (
            <li key={description}>
              <p className="paper-content__description">{description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
