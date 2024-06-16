import Logo from '@/components/logo'
import styles from './styles.module.css'
import MobileMenu from '../mobile-menu'
import DesktopMenu from '../desktop-menu'

function Navigation() {
  return (
    <div className={styles.navFirst}>
      <div>
        <Logo />
        <MobileMenu />
      </div>
      <DesktopMenu />
    </div>
  )
}

export default Navigation
