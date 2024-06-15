import { MainNavItem } from '@/types/nav'

interface DocsConfig {
  mainNav: MainNavItem[]
}

export const navigationConfig: DocsConfig = {
  mainNav: [
    {
      title: 'Documentation',
      href: '/docs',
    },
    {
      title: 'Components',
      href: '/docs/components/accordion',
    },
    {
      title: 'Themes',
      href: '/themes',
    },
    {
      title: 'Examples',
      href: '/examples',
    },
    {
      title: 'Blocks',
      href: '/blocks',
    },
  ],
}
