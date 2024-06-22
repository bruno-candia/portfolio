import Link from 'next/link'
import LanguageSwitcher from '../../../language-switcher'
import styles from './popover.module.css'
import Button from '@/components/button'
import ThemeSwitcher from '../../../theme-switcher'
import { IMobileMenuProps } from '@/types/mobile'
import { useTranslations } from 'next-intl'

function Popover({ items }: IMobileMenuProps) {
  const t = useTranslations('Navigation')
  return (
    <div className={styles.wrapper} data-testid={Popover.name}>
      <section className={styles.cta}>
        <Button>{t('contact')}</Button>
      </section>
      <ThemeSwitcher />
      <LanguageSwitcher />
      {items.length && (
        <section data-testid={`${Popover.name}-section`}>
          <ul>
            {items.map((item) => (
              <li key={item.id}>
                <Link
                  data-testid={`${Popover.name}-link-${item.id}`}
                  className={styles.navigationListItemLink}
                  href={item.href}
                  data-active="false"
                  scroll={false}
                >
                  {t(`${item.id}`)}
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
