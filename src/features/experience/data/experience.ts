export interface Experience {
  id: string;
  company: string;
  period: string;
}

export const experiences: Experience[] = [
  {
    id: 'bees-tech-lead',
    company: 'BEES (AB InBev)',
    period: 'Feb 2024 – Present',
  },
  {
    id: 'bees-senior',
    company: 'BEES (AB InBev)',
    period: 'Mar 2023 – Feb 2024',
  },
  {
    id: 'aurem',
    company: 'Aurem',
    period: 'Feb 2018 – May 2023',
  },
  {
    id: 'verzel',
    company: 'Verzel',
    period: 'Dec 2021 – Aug 2022',
  },
  {
    id: 'neoenergia',
    company: 'Neoenergia',
    period: 'May 2021 – Nov 2021',
  },
];

export const lineColors = [
  '#ef4444',
  '#22d3ee',
  '#22c55e',
  '#f97316',
  '#ec4899',
  '#eab308',
];
