import Link from 'next/link'
import styles from './styles.module.css'
import { MainNavItem } from '@/types/nav'

export interface IDesktopMenuProps {
  items: MainNavItem[]
}

function DesktopMenu({ items }: IDesktopMenuProps) {
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
                <li key={item.title}>
                  <Link
                    href={item.href}
                    data-active="false"
                    className={styles.navigationMenuLink}
                    scroll={false}
                  >
                    {item.title}
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
