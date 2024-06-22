import { ReactNode } from 'react'
import styles from '../../dropdown.module.css'

interface DropdownContentProps {
  children: ReactNode
}

function DropdownContent({ children }: DropdownContentProps) {
  return (
    <ul
      data-testid={`${DropdownContent.name}`}
      className={styles.dropdown_content}
    >
      {children}
    </ul>
  )
}

export default DropdownContent
