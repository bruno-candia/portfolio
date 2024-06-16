import { MainNavItem } from '@/types/nav'

interface DocsConfig {
  mainNav: MainNavItem[]
}

export const navigationConfig: DocsConfig = {
  mainNav: [
    {
      title: 'About me',
      href: '#about-me',
    },
    {
      title: 'My content',
      href: '#my-content',
    },
    {
      title: 'My lab',
      href: '#my-lab',
    },
    {
      title: 'Experiences',
      href: '/experiences',
    },
    {
      title: 'Jobs & History',
      href: '/jobs-and-history',
    },
  ],
}
