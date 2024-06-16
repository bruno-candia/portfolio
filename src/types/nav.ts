import { Icons } from '@/components/icons'
import { Url } from 'next/dist/shared/lib/router/router'

export interface NavItem {
  id: string
  title: string
  href: Url
  disabled?: boolean
  external?: boolean
  icon?: keyof typeof Icons
  label?: string
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[]
}

export interface MainNavItem extends NavItem {}

export interface SidebarNavItem extends NavItemWithChildren {}
