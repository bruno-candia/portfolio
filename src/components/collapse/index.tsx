import Link from 'next/link'
import CaretDown from 'public/caret-down'
import styles from './styles.module.css'
import { useState } from 'react'

interface ICollapseProps {
  text: string
  itens: Array<{
    title: string
    href: string
  }>
}

function Collapse({ text, itens }: ICollapseProps) {
  const [isOpen, setIsOpen] = useState<string>('')

  function handleCollapse() {
    setIsOpen(isOpen === '' ? 'collapseOpen' : '')
  }
  return (
    <div
      className={`${styles.collapse} ${styles.navigationCollapse}`}
      data-version="v1"
    >
      <h3 className={`textWrapper ${styles.collapseText}`} data-version="v1">
        <button
          className={`resetBtn ${styles.collapseBtn}`}
          id="collapse-button"
          type="button"
          aria-expanded="true"
          onClick={handleCollapse}
        >
          <span className={`${styles.collapseTitle} ${styles.collapseSmall}`}>
            {text}
            <span className={`${styles.collapseIcon} ${styles[isOpen]}`}>
              <CaretDown />
            </span>
          </span>
        </button>
      </h3>
      <div
        className={styles.collapseContent}
        aria-labelledby="collapse-button"
        style={{ height: isOpen ? '96px' : '0px' }}
      >
        <div>
          <ul>
            {itens.map((item) => (
              <li key={`${item.title} - ${item.href}`}>
                <Link
                  className={styles.navigationListItemLink}
                  href={item.href}
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
