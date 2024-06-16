import Link from 'next/link'
import LanguageSwitcher from '../../../language-switcher'
import styles from './styles.module.css'
import Button from '@/components/button'
import ThemeSwitcher from '../../../theme-switcher'

function Popover() {
  return (
    <div className={styles.wrapper}>
      <section className={styles.cta}>
        <Button>Contato</Button>
      </section>
      <div className={styles.wrapperThemeSwitcher}>
        <div className={styles.containerThemeSwitcher}>
          <div>
            <div className={styles.mobileThemeSwitcher}>
              <p>Theme</p>
              <div
                className={`${styles.themeSwitcherRoot} ${styles.themeSwitcherComponent}`}
              >
                <ThemeSwitcher />
              </div>
            </div>
          </div>
        </div>
      </div>
      <LanguageSwitcher />
      <section>
        <ul>
          <li>
            <Link
              className={styles.navigationListItemLink}
              scroll={false}
              href="#about-me"
            >
              About me
            </Link>
          </li>
          <li>
            <Link
              className={styles.navigationListItemLink}
              scroll={false}
              href="#my-content"
            >
              My Content
            </Link>
          </li>
          <li>
            <Link
              className={styles.navigationListItemLink}
              scroll={false}
              href="#my-lab"
            >
              My Lab
            </Link>
          </li>
          <li>
            <Link
              className={styles.navigationListItemLink}
              scroll={false}
              href="#experiences"
            >
              Experiences
            </Link>
          </li>
          <li>
            <Link
              className={styles.navigationListItemLink}
              scroll={false}
              href="#job-and-history"
            >
              Job & history
            </Link>
          </li>
        </ul>
      </section>
    </div>
  )
}

export default Popover
