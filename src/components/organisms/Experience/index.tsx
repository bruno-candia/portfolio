import { FoldingPaper } from "@/components/atoms/FoldingPaper";
import { useTranslation } from "react-i18next";

import "./style.css";

const experienceJobKeys = [
  "bees_tech_leader",
  "bees_frontend",
  "aurem",
  "verzel",
  "neoenergia_dev",
  "neoenergia_analyst",
] as const;

const companyLogos: Record<string, string> = {
  bees_tech_leader:
    "https://media.licdn.com/dms/image/v2/C4E0BAQGXPkcsGk7KYA/company-logo_200_200/company-logo_200_200/0/1678379975390/beesb2b_logo?e=1762992000&v=beta&t=Vv5n0E3t4nIpzvdjvDjPVmZyAST-AS6SZetg8xLKhUo",
  bees_frontend:
    "https://media.licdn.com/dms/image/v2/C4E0BAQGXPkcsGk7KYA/company-logo_200_200/company-logo_200_200/0/1678379975390/beesb2b_logo?e=1762992000&v=beta&t=Vv5n0E3t4nIpzvdjvDjPVmZyAST-AS6SZetg8xLKhUo",
  aurem:
    "https://media.licdn.com/dms/image/v2/C4E0BAQGaEKT_mYTsww/company-logo_100_100/company-logo_100_100/0/1639756948830/startupaurem_logo?e=1762992000&v=beta&t=AhC0WrNp7mQ6uk81ic04G538vw3B3oF5uXKRML2fg2A",
  verzel:
    "https://media.licdn.com/dms/image/v2/C4D0BAQHnvgaFSxLdOQ/company-logo_200_200/company-logo_200_200/0/1630579452723/verzel_solucoes_em_sistemas_logo?e=1762992000&v=beta&t=JZiNNxYB9uOgxS0QKywcwRNkxMY1CNatq4iebwUp2WU",
  neoenergia_dev: "https://logo.clearbit.com/neoenergia.com",
  neoenergia_analyst: "https://logo.clearbit.com/neoenergia.com",
};

export function Experience() {
  const { t } = useTranslation();

  return (
    <section id="experience">
      <div className="experience__content">
        <div className="experience__header">
          <h2 className="experience__title">{t("experience.title")}</h2>
          <p className="experience__description">
            {t("experience.description")}
          </p>
        </div>

        <div className="experience__cards">
          {experienceJobKeys.map((jobKey) => {
            const job = t(`experience.jobs.${jobKey}`, {
              returnObjects: true,
            }) as {
              role: string;
              company: string;
              period: string;
              descriptions: string[];
            };

            return (
              <div key={jobKey} className="experience__card-wrapper">
                <FoldingPaper descriptions={job.descriptions} />

                <div className="experience__info">
                  <img
                    src={companyLogos[jobKey]}
                    alt={job.company}
                    className="experience__company-logo"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="experience__details">
                    <h3 className="experience__company-name">{job.company}</h3>
                    <p className="experience__role">{job.role}</p>
                    <p className="experience__period">{job.period}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
