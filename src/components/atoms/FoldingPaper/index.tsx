import { useState, useEffect, useRef } from "react";
import "./style.css";

interface FoldingPaperProps {
  companyLogo: string;
  role: string;
  company: string;
  period: string;
  description: string;
}

export function FoldingPaper({
  companyLogo,
  role,
  company,
  period,
  description,
}: FoldingPaperProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [flippedLogo, setFlippedLogo] = useState<string>("");
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

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) return;

      canvas.width = img.width;
      canvas.height = img.height;

      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(img, 0, 0);

      setFlippedLogo(canvas.toDataURL());
    };

    img.onerror = () => {
      setFlippedLogo(companyLogo);
    };

    img.src = companyLogo;
  }, [companyLogo]);

  return (
    <div
      ref={frameRef}
      id="frame"
      className={isOpen ? "open" : ""}
      onClick={handleClick}
      style={{ "--company-logo": `url(${flippedLogo})` } as React.CSSProperties}
    >
      <div id="stage">
        <div id="box"></div>
        <div id="box"></div>
        <div id="box"></div>
        <div id="box"></div>

        <div className="paper-content">
          <div className="paper-content__header">
            <h3 className="paper-content__role">{role}</h3>
            <p className="paper-content__company">{company}</p>
            <p className="paper-content__period">{period}</p>
          </div>
          <p className="paper-content__description">{description}</p>
        </div>
      </div>
    </div>
  );
}
