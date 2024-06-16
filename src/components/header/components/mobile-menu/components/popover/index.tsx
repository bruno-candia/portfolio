import Link from 'next/link'
import LanguageSwitcher from '../../../language-switcher'
import styles from './styles.module.css'
import Button from '@/components/button'
import ThemeSwitcher from '../../../theme-switcher'
import { IMobileMenuProps } from '@/types/mobile'
import { useTranslations } from 'next-intl'

function Popover({ items }: IMobileMenuProps) {
  const t = useTranslations('Navigation')
  return (
    <div className={styles.wrapper}>
      <section className={styles.cta}>
        <Button>{t('contact')}</Button>
      </section>
      <ThemeSwitcher />
      <LanguageSwitcher />
      {items.length && (
        <section>
          <ul>
            {items.map((item) => (
              <li key={item.id}>
                <Link
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
