import styles from './badge.module.css'

interface IBadgeProps {
  title: string
  isActive: boolean
}

function Badge({ title, isActive }: IBadgeProps) {
  return (
    <span
      data-testid={Badge.name}
      data-active={isActive}
      className={styles.badge}
    >
      <p>{title}</p>
    </span>
  )
}

export default Badge
