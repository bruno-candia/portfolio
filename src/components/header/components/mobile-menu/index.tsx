'use client'

import { useState } from 'react'
import styles from './styles.module.css'
import Popover from './components/popover'
import { IMobileMenuProps } from '@/types/mobile'

function MobileMenu({ items }: IMobileMenuProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false)

  function handleExpand() {
    setIsExpanded((prev) => !prev)
  }

  return (
    <div className={styles.mobileMenu} id={styles.mobileMenuToggle}>
      <button
        aria-label={`${isExpanded ? 'Open' : 'Close'} Menu`}
        className={styles.mobileMenuToggle}
        type="button"
        data-expanded={isExpanded}
        onClick={handleExpand}
      >
        <div className={styles.toggleBar} data-position="top"></div>
        <div className={styles.toggleBar} data-position="bottom"></div>
      </button>
      {isExpanded && <Popover items={items} />}
    </div>
  )
}

export default MobileMenu
