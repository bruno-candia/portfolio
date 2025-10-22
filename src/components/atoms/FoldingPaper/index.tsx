import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import scotchTape from "@/assets/scotch-tape.png";
import "./style.css";

interface FoldingPaperProps {
  descriptions: string[];
}

export function FoldingPaper({ descriptions }: FoldingPaperProps) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
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
    <div ref={frameRef} id="frame" className={isOpen ? "open" : ""}>
      <div id="stage">
        <div className="box" onClick={handleToggle}></div>
        <div
          className="box"
          data-hint={t("experience.clickToLearnMore")}
          onClick={handleToggle}
        ></div>
        <div className="box" onClick={handleToggle}></div>
        <div className="box" onClick={handleToggle}></div>
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
