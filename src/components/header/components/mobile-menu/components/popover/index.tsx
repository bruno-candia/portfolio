import Link from 'next/link'
import LanguageSwitcher from '../../../language-switcher'
import styles from './styles.module.css'
import Button from '@/components/button'
import ThemeSwitcher from '../../../theme-switcher'
import { IMobileMenuProps } from '@/types/mobile'

function Popover({ items }: IMobileMenuProps) {
  return (
    <div className={styles.wrapper}>
      <section className={styles.cta}>
        <Button>Contato</Button>
      </section>
      <ThemeSwitcher />
      <LanguageSwitcher />
      {items.length && (
        <section>
          <ul>
            {items.map((item) => (
              <li key={item.title}>
                <Link
                  className={styles.navigationListItemLink}
                  scroll={false}
                  href={item.href}
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}

export default Popover
