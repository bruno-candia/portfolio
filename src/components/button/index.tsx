import React, { ReactNode } from 'react'
import styles from './button.module.css'
import { IconProps } from '../icons'

interface IButtonProps {
  children: ReactNode
  variant: 'primary' | 'secondary'
  icon?: (props: IconProps & { width: string }) => JSX.Element
  link?: string
}

function Button({ children, variant, icon: Icon, link }: IButtonProps) {
  return (
    <a
      role="button"
      className={`${styles.btnBase} ${styles[variant]}`}
      data-testid={`${Button.name}`}
      href={link}
      target="_blank"
      rel="noopener noreferrer"
    >
      {Icon && <Icon width="16" className={styles.icon} />}
      {children}
    </a>
  )
}

export default Button
