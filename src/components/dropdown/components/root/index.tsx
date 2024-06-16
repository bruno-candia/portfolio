import { ReactNode } from 'react'

import styles from '../../styles.module.css'
import CaretDown from 'public/caret-down'

interface DropdownProps {
  children: ReactNode
  label: string
}

function DropdownRoot({ children, label }: DropdownProps) {
  return (
    <div className={styles.dropdown}>
      <button className={styles.dropButton} type="button">
        {label}
        <CaretDown />
      </button>
      {children}
    </div>
  )
}

export default DropdownRoot
