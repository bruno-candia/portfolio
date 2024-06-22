import Logo from '@/components/logo'
import styles from './styles.module.css'
import MobileMenu from '../mobile-menu'
import DesktopMenu from '../desktop-menu'
import { navigationConfig } from '@/config/navigation'

function Navigation() {
  return (
    <div className={styles.navFirst} data-testid={Navigation.name}>
      <div>
        <Logo />
        <MobileMenu items={navigationConfig.mainNav} />
      </div>
      <DesktopMenu items={navigationConfig.mainNav} />
    </div>
  )
}

export default Navigation
