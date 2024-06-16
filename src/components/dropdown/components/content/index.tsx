import { ReactNode } from 'react'
import styles from '../../styles.module.css'

interface DropdownContentProps {
  children: ReactNode
}

function DropdownContent({ children }: DropdownContentProps) {
  return <ul className={styles.dropdown_content}>{children}</ul>
}

export default DropdownContent
