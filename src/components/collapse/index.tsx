// src/components/collapse/index.tsx
import Link from 'next/link'
import CaretDown from 'public/caret-down'
import styles from './styles.module.css'
import { useState } from 'react'

interface ICollapseProps {
  text: string
  items: Array<{
    title: string
    href: string
  }>
}

function Collapse({ text, items }: ICollapseProps) {
  const [isOpen, setIsOpen] = useState<string>('')

  function handleCollapse() {
    setIsOpen(isOpen === '' ? 'collapseOpen' : '')
  }

  return (
    <div
      className={`${styles.collapse} ${styles.navigationCollapse}`}
      data-testid={`${Collapse.name}-container`}
    >
      <h3 className={`textWrapper ${styles.collapseText}`} data-version="v1">
        <button
          className={`resetBtn ${styles.collapseBtn}`}
          id="collapse-button"
          type="button"
          aria-expanded={isOpen === 'collapseOpen'}
          onClick={handleCollapse}
          data-testid={`${Collapse.name}-button`}
        >
          <span className={`${styles.collapseTitle} ${styles.collapseSmall}`}>
            {text}
            <span
              className={`${styles.collapseIcon} ${styles[isOpen]}`}
              data-testid={`${Collapse.name}-icon`}
            >
              <CaretDown />
            </span>
          </span>
        </button>
      </h3>
      <div
        className={styles.collapseContent}
        aria-labelledby="collapse-button"
        style={{ height: isOpen ? '96px' : '0px' }}
        data-testid={`${Collapse.name}-content`}
      >
        <div>
          <ul>
            {items.map((item) => (
              <li
                key={`${item.title} - ${item.href}`}
                data-testid={`${Collapse.name}-item`}
              >
                <Link
                  className={styles.navigationListItemLink}
                  href={item.href}
                  data-testid={`${Collapse.name}-link-${item.title}`}
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Collapse
