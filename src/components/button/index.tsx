import { ReactNode } from 'react'
import styles from './styles.module.css'

interface IButtonProps {
  children: ReactNode
}

function Button({ children }: IButtonProps) {
  return (
    <button
      role="button"
      className={`${styles.baseBtn} ${styles.resetBtn} ${styles.textWrapper} ${styles.btn} ${styles.invertBtn}`}
      data-button
      data-prefix="false"
      data-suffix="false"
      data-version="1"
    >
      {children}
    </button>
  )
}

export default Button
