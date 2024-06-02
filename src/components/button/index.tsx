import { ButtonHTMLAttributes } from 'react'
import styles from './styles.module.css'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default'

  size?: 'small' | 'normal' | 'large'
  className?: string
}

export default function Button({
  className = '',
  variant = 'default',
  size = 'normal',
  ...props
}: ButtonProps) {
  const classNames = `${styles.buttonBase} ${styles[variant]} ${styles[size]} ${className}`
  return <button className={classNames} {...props} />
}

export { Button }
