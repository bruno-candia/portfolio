import LanguageSwitcher from './components/language-switcher'
import ThemeSwitcher from './components/theme-switcher'
import Navigation from './components/navigation'
import styles from './styles.module.css'
import Button from '../button'

function Header() {
  return (
    <div className={`${styles.wrapper}`} data-navigation-header>
      <header className={styles.container}>
        <Navigation />
        <div className={styles.navThird}>
          <div className={styles.navRight}>
            <LanguageSwitcher />
            <Button>Contato</Button>
          </div>
          <ThemeSwitcher />
        </div>
      </header>
    </div>
  )
}

export default Header
