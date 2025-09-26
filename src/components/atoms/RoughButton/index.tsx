import { useEffect, useRef, useState } from "react";
// @ts-ignore
import rough from "roughjs/bundled/rough.esm";
import "./style.css";

interface IRoughButton {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  seed?: number;
}

export function RoughButton({
  children,
  onClick,
  className = "",
  seed = Math.random() * 1000,
}: IRoughButton) {
  const containerRef = useRef<HTMLButtonElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const stableSeedRef = useRef<number>(seed);
  const lastDrawRef = useRef<{
    width: number;
    height: number;
    isHovered: boolean;
    hoverVersion: number;
  } | null>(null);
  const [hoverVersion, setHoverVersion] = useState(0);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const svg = svgRef.current;
    const container = containerRef.current;
    const rc = rough.svg(svg);

    const updateDrawing = () => {
      const rect = container.getBoundingClientRect();
      const width = Math.round(rect.width);
      const height = Math.round(rect.height);

      const last = lastDrawRef.current;
      if (
        last &&
        last.width === width &&
        last.height === height &&
        last.isHovered === isHovered &&
        last.hoverVersion === hoverVersion
      ) {
        return;
      }

      if (width > 0 && height > 0) {
        svg.innerHTML = "";
        svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
        svg.setAttribute("preserveAspectRatio", "none");

        const node = rc.rectangle(4, 4, width - 8, height - 8, {
          roughness: 1.3,
          bowing: 1.2,
          stroke: "#797979",
          strokeWidth: 1.6,
          fill: "transparent",
          fillStyle: "solid",
          seed: stableSeedRef.current + hoverVersion,
        });

        svg.appendChild(node);
        lastDrawRef.current = {
          width,
          height,
          isHovered,
          hoverVersion,
        };
      }
    };

    const resizeObserver = new ResizeObserver(() => updateDrawing());
    resizeObserver.observe(container);
    updateDrawing();
    return () => {
      resizeObserver.disconnect();
    };
  }, [isHovered, hoverVersion]);

  return (
    <button
      ref={containerRef}
      onClick={onClick}
      onMouseEnter={() => {
        setIsHovered(true);
        setHoverVersion((v) => v + 1);
      }}
      onMouseLeave={() => setIsHovered(false)}
      className={`rough-button ${className}`}
      style={{
        background: "transparent",
        border: "none",
        cursor: "pointer",
      }}
    >
      <svg ref={svgRef} className="rough-button__svg" />
      <span className="rough-button__content">{children}</span>
    </button>
  );
}
