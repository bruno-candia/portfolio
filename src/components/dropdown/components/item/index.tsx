import { ElementType } from 'react'
import Link from 'next/link'
import styles from '../../styles.module.css'

export interface DropdownItemProps {
  page: string
  description: string
  icon?: ElementType
}

function DropdownItem({ description, page, icon: Icon }: DropdownItemProps) {
  const title = `Maincore ${page[0].toUpperCase() + page.substring(1)}`
  return (
    <li data-testid={`${DropdownItem.name}`}>
      <Link
        className={styles.dropdown_item}
        href={page}
        scroll={false}
        data-testid={`${DropdownItem.name}-link-${page}`}
      >
        <div className={styles.item}>
          <span className={styles.title}>{title}</span>
          <span className={styles.description}>{description}</span>
        </div>
        <div>
          {Icon && (
            <Icon
              data-testid={`${DropdownItem.name}-icon`}
              size={32}
              weight="fill"
              color="rgba(24, 74, 140, 1)"
            />
          )}
        </div>
      </Link>
    </li>
  )
}

export default DropdownItem
