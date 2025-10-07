import { useState } from "react";
import "./style.css";

interface ExperienceCardProps {
  companyLogo: string;
  companyName: string;
  role: string;
  duration: string;
  period: string;
  description: string;
  color?: string;
}

export function ExperienceCard({
  companyLogo,
  companyName,
  role,
  duration,
  period,
  description,
  color = "#ABC7C9",
}: ExperienceCardProps) {
  const [isUnfolded, setIsUnfolded] = useState(false);

  const handleToggle = () => {
    setIsUnfolded(!isUnfolded);
  };

  return (
    <div className="experience-card-wrapper">
      <div
        className={`experience-card ${isUnfolded ? "unfolded" : ""}`}
        onClick={handleToggle}
        style={{ "--card-color": color } as React.CSSProperties}
      >
        <div className="experience-card__stage">
          <div className="experience-card__box box-1">
            <div className="in one"></div>
          </div>
          <div className="experience-card__box box-2">
            <div className="in two"></div>
          </div>
          <div className="experience-card__box box-3">
            <div className="in thr"></div>
          </div>
          <div className="experience-card__box box-4">
            <div className="in fou"></div>
          </div>
        </div>

        <div className="experience-card__content">
          {!isUnfolded ? (
            <div className="experience-card__logo">
              <img src={companyLogo} alt={companyName} />
            </div>
          ) : (
            <div className="experience-card__details">
              <div className="experience-card__header">
                <h3 className="experience-card__role">{role}</h3>
                <span className="experience-card__duration">{duration}</span>
              </div>
              <div className="experience-card__period">{period}</div>
              <p className="experience-card__description">{description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
