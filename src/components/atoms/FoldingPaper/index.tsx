import { useState, useEffect, useRef } from "react";
import "./style.css";

interface FoldingPaperProps {
  companyLogo: string;
  companyName?: string;
}

export function FoldingPaper({ companyLogo, companyName }: FoldingPaperProps) {
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
        <div id="box"></div>
        <div id="box"></div>
        <div id="box"></div>
        <div id="box"></div>

        <div className="company-logo">
          <img src={companyLogo} alt={companyName || "Company logo"} />
        </div>
      </div>
    </div>
  );
}
