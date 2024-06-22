import { ReactNode } from 'react'
import styles from './button.module.css'

interface IButtonProps {
  children: ReactNode
}

function Button({ children }: IButtonProps) {
  return (
    <button
      role="button"
      className={`${styles.baseBtn} ${styles.resetBtn} ${styles.textWrapper} ${styles.btn} ${styles.invertBtn}`}
      data-testid={`${Button.name}`}
    >
      {children}
    </button>
  )
}

export default Button
