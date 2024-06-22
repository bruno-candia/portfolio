import LanguageSwitcher from './components/language-switcher'
import ThemeSwitcher from './components/theme-switcher'
import Navigation from './components/navigation'
import styles from './header.module.css'
import Button from '../button'
import { useTranslations } from 'next-intl'

function Header() {
  const t = useTranslations('Navigation')

  return (
    <div
      className={`${styles.wrapper}`}
      data-navigation-header
      data-testid={`${Header.name}`}
    >
      <header className={styles.container}>
        <Navigation />
        <div className={styles.navThird}>
          <div className={styles.navRight}>
            <LanguageSwitcher />
            <Button>{t('contact')}</Button>
          </div>
          <ThemeSwitcher />
        </div>
      </header>
    </div>
  )
}

export default Header
