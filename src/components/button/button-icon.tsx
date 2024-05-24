import { ElementType } from 'react'
import styles from './styles.module.css'

interface ButtonIconProps {
  icon: ElementType
}

export default function ButtonIcon({ icon: Icon }: ButtonIconProps) {
  return <Icon className={styles.buttonIcon} />
}
