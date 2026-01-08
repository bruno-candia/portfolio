export type ExperienceItem = {
  id: string;
  period: string;
  title: string;
  company: string;
  image: {
    src: string;
    alt: string;
  };
  summaryIntro?: string;
  highlights: string[];
};

