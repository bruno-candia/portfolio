import { MainNavItem } from '@/types/nav'

interface DocsConfig {
  mainNav: MainNavItem[]
}

export const navigationConfig: DocsConfig = {
  mainNav: [
    {
      id: 'about-me',
      title: 'About me',
      href: '#about-me',
    },
    {
      id: 'my-content',
      title: 'My content',
      href: '#my-content',
    },
    {
      id: 'my-lab',
      title: 'My lab',
      href: '#my-lab',
    },
    {
      id: 'experiences',
      title: 'Experiences',
      href: '#experiences',
    },
    {
      id: 'jobs-and-history',
      title: 'Jobs & History',
      href: '#jobs-and-history',
    },
  ],
}
