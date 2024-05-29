import Link from 'next/link'
import styles from '../../styles.module.css'
import MenuButton from '../menu-button'

export default function SidebarMenu() {
  return (
    <div className={styles.sidebar_container}>
      <input
        type="checkbox"
        className={styles.open_sidebar_menu}
        id={styles.open_sidebar_menu}
      />
      <MenuButton />
      <div id={styles.sidebar_menu}>
        <ul className={styles.sidebar_menu_inner}>
          <li>
            <Link href="#">aaaa</Link>
          </li>
          <li>
            <Link href="#">aaaa</Link>
          </li>
          <li>
            <Link href="#">aaaa</Link>
          </li>
          <li>
            <Link href="#">aaaa</Link>
          </li>
          <li>
            <Link href="#">aaaa</Link>
          </li>
        </ul>
      </div>
    </div>
  )
}
