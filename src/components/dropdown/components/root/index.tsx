import { ReactNode } from 'react'

import styles from '../../dropdown.module.css'
import CaretDown from 'public/caret-down'

interface DropdownProps {
  children: ReactNode
  label: string
}

function DropdownRoot({ children, label }: DropdownProps) {
  return (
    <div className={styles.dropdown} data-testid={`${DropdownRoot.name}`}>
      <button
        className={styles.dropButton}
        type="button"
        data-testid={`${DropdownRoot.name}-button`}
      >
        {label}
        <CaretDown />
      </button>
      {children}
    </div>
  )
}

export default DropdownRoot
