import Link from 'next/link'
import styles from './styles.module.css'

function DesktopMenu() {
  return (
    <div className={styles.navSecond}>
      <nav
        className={styles.navigationMenuRoot}
        aria-label="Main"
        data-orientation="horizontal"
      >
        <div style={{ position: 'relative' }}>
          <ul className={styles.navigationMenuList}>
            <li>
              <Link
                href="#about-me"
                data-active="false"
                className={styles.navigationMenuLink}
                scroll={false}
              >
                About me
              </Link>
            </li>
            <li>
              <Link
                href="#my-content"
                data-active="false"
                className={styles.navigationMenuLink}
                scroll={false}
              >
                My Content
              </Link>
            </li>
            <li>
              <Link
                href="#my-lab"
                data-active="false"
                className={styles.navigationMenuLink}
                scroll={false}
              >
                My Lab
              </Link>
            </li>
            <li>
              <Link
                href="#experiences"
                data-active="false"
                className={styles.navigationMenuLink}
                scroll={false}
              >
                Experiences
              </Link>
            </li>
            <li>
              <Link
                href="#job-and-history"
                data-active="false"
                className={styles.navigationMenuLink}
                scroll={false}
              >
                Job & history
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  )
}

export default DesktopMenu
