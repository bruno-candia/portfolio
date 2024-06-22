import Logo from '@/components/logo'
import styles from './navigation.module.css'
import MobileMenu from '../mobile-menu'
import DesktopMenu from '../desktop-menu'
import { navigationConfig } from '@/config/navigation'
import Me from '@/components/me'

function Navigation() {
  return (
    <div className={styles.navFirst} data-testid={Navigation.name}>
      <div>
        <Logo />
        <div className={styles.avatar}>
          <Me width="10" height="10" />
        </div>
        <MobileMenu items={navigationConfig.mainNav} />
      </div>
      <DesktopMenu items={navigationConfig.mainNav} />
    </div>
  )
}

export default Navigation
