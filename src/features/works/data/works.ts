export interface Work {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  tags: string[];
  link?: string;
}

export const works: Work[] = [
  {
    id: 'aurem',
    title: 'Aurem',
    subtitle: 'Real Time Subtitle',
    image: '/aurem.png',
    tags: [
      'React',
      'TypeScript',
      'Electron',
      'Redux',
      'Socket.io',
      'Fabric.js',
      'Node.js',
      'Express',
      'MySQL',
      'MongoDB',
      'Redis',
      'AWS',
      'Docker',
      'Azure',
    ],
    link: 'https://www.linkedin.com/company/aurem-tec/posts/?feedView=images&viewAsMember=true',
  },
  {
    id: 'wind-energy',
    title: 'Wind Energy',
    subtitle: 'C++ Terminal',
    image: '/wind-energy.png',
    tags: [
      'C++',
      'C++17',
      'C++20',
      'Binary Files',
      'Algorithms',
      'Math',
      'Physics',
      'Git',
      'GCC',
      'Clang',
      'Cross-platform',
    ],
    link: 'https://github.com/bruno-candia/wind-energy',
  },
  {
    id: 'scaling-x',
    title: 'Scaling-X',
    subtitle: 'Brand Design',
    image: '/scaling-x.png',
    tags: [
      'Branding',
      'Visual Identity',
      'Typography',
      'Color Theory',
      'Graphic Design',
      'Vector Art',
    ],
    link: 'https://www.behance.net/gallery/157869603/ScalinX',
  },
  {
    id: 'maincore',
    title: 'Maincore',
    subtitle: 'Web Development',
    image: '/maincore.png',
    tags: [
      'Next.js',
      'React',
      'TypeScript',
      'Jest',
      'Testing Library',
      'Formik',
      'CSS Modules',
      'UX/UI Design',
      'i18n',
      'SEO',
    ],
    link: 'https://maincore-last.vercel.app/',
  },
];
