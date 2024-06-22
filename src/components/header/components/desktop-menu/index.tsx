import Link from 'next/link'
import styles from './desktop-menu.module.css'
import { MainNavItem } from '@/types/nav'
import { useTranslations } from 'next-intl'

export interface IDesktopMenuProps {
  items: MainNavItem[]
}

function DesktopMenu({ items }: IDesktopMenuProps) {
  const t = useTranslations('Navigation')
  return (
    items.length && (
      <div className={styles.navSecond}>
        <nav
          className={styles.navigationMenuRoot}
          aria-label="Main"
          data-orientation="horizontal"
        >
          <div style={{ position: 'relative' }}>
            <ul className={styles.navigationMenuList}>
              {items.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    data-active="false"
                    className={styles.navigationMenuLink}
                    scroll={false}
                  >
                    {t(`${item.id}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    )
  )
}

export default DesktopMenu
