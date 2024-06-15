'use client'

import { ReactNode, ButtonHTMLAttributes } from 'react'
import { useDrawSVG } from '@/hooks/useDrawSVG'
import { Icons } from '../icons'
import styles from './styles.module.css'

interface ButtonSecondaryProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'small' | 'normal' | 'large'
  classNames?: string
  children: ReactNode
}

export default function ScribbledButton({
  children,
  ...props
}: ButtonSecondaryProps) {
  const { buttonRef, drawLine, restart } = useDrawSVG()

  return (
    <button
      ref={buttonRef}
      className={`${styles.buttonBase} ${styles.scribble}`}
      onMouseEnter={restart}
      onMouseLeave={drawLine}
      data-testid={`${ScribbledButton.name}-button`}
      {...props}
    >
      {children}
      <Icons.scrawl data-testid={`${ScribbledButton.name}-svg`} />
    </button>
  )
}
