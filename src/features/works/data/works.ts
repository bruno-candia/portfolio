export interface Work {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  link: string;
}

export const works: Work[] = [
  {
    id: 'project-1',
    title: 'Project One',
    subtitle: 'Web Application',
    image: '/frontend.png',
    link: '/works/project-1',
  },
  {
    id: 'project-2',
    title: 'Project Two',
    subtitle: 'Mobile App',
    image: '/backend.png',
    link: '/works/project-2',
  },
  {
    id: 'project-3',
    title: 'Project Three',
    subtitle: 'E-commerce Platform',
    image: '/frontend.png',
    link: '/works/project-3',
  },
  {
    id: 'project-4',
    title: 'Project Four',
    subtitle: 'Dashboard System',
    image: '/backend.png',
    link: '/works/project-4',
  },
];
