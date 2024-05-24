'use client'
import { ReactNode } from 'react'
import styles from './styles.module.css'

interface ButtonRootProps {
  children: ReactNode
  type: 'primary' | 'secondary'
}

export default function ButtonRoot({ children, type }: ButtonRootProps) {
  const buttonClass =
    type === 'primary' ? styles.primaryButton : styles.secondaryButton

  return (
    <button className={`${styles.containerButton} ${buttonClass}`}>
      <span>{children}</span>
    </button>
  )
}
