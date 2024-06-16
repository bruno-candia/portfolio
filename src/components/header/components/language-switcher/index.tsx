'use client'

import { Icons } from '@/components/icons'
import styles from './styles.module.css'
import { useLocale, useTranslations } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'
import { ChangeEvent, useTransition } from 'react'
import clsx from 'clsx'

function LanguageSwitcher() {
  const locale = useLocale()
  const t = useTranslations('LocaleSwitcher')
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const pathname = usePathname()

  function onSelectChange(event: ChangeEvent<HTMLInputElement>) {
    const nextLocale = event.target.value
    startTransition(() => {
      const newPathname = pathname.replace(`/${locale}`, `/${nextLocale}`)
      router.replace(newPathname)
    })
  }

  return (
    <section className={styles.wrapper}>
      <div>
        <div className={styles.container}>
          <p>{t('title')}</p>
          <fieldset className={`${styles.root} ${styles.component}`}>
            <legend className={styles.srOnly}>{t('legend')}</legend>
            <span style={{ height: '100%' }}>
              <input
                type="radio"
                id="mobile-language-switch-portuguese"
                name="language"
                value="pt"
                onChange={onSelectChange}
                checked={locale === 'pt'}
                disabled={isPending}
              />
              <label
                className={clsx(
                  isPending && 'transition-opacity [&:disabled]:opacity-30',
                )}
                htmlFor="mobile-language-switch-portuguese"
                title={t('label-portuguese')}
              >
                <Icons.brazilFlag />
              </label>
            </span>
            <span style={{ height: '100%' }}>
              <input
                type="radio"
                id="mobile-language-switch-english"
                name="language"
                value="en"
                onChange={onSelectChange}
                checked={locale === 'en'}
                disabled={isPending}
              />
              <label
                className={clsx(
                  isPending && 'transition-opacity [&:disabled]:opacity-30',
                )}
                htmlFor="mobile-language-switch-english"
                title={t('label-english')}
              >
                <Icons.usaFlag />
              </label>
            </span>
          </fieldset>
        </div>
      </div>
    </section>
  )
}

export default LanguageSwitcher
