import * as React from 'react'
import styles from './logo.module.css'
import { Icons } from '../icons'

const Logo = () => (
  <a
    aria-controls="menu-:r1m:"
    aria-expanded="false"
    aria-label="home"
    className={styles.contextMenuButton}
    data-testid="header/navbar/logo"
    id="menu-button-:r1n:"
    href="/"
  >
    <Icons.logo />
  </a>
)
export default Logo
