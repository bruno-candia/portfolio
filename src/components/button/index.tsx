import { ButtonHTMLAttributes, ReactNode } from 'react'
import styles from './styles.module.css'

interface ButtonRootProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
}

export default function Button({ children, ...props }: ButtonRootProps) {
  const classNames = `${styles.buttonBase} ${styles.primary} `

  return (
    <button className={classNames} {...props}>
      {children}
    </button>
  )
}
