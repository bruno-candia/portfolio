'use client'

import { Icons } from '@/components/icons'
import styles from './styles.module.css'
import { useLocale, useTranslations } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'
import { ChangeEvent, useTransition } from 'react'
import { Skeleton } from '@/components/skeleton'

function LanguageSwitcher() {
  const locale = useLocale()
  const t = useTranslations('LocaleSwitcher')
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const pathname = usePathname()

  if (isPending) {
    return <Loading />
  }

  function onSelectChange(event: ChangeEvent<HTMLInputElement>) {
    const nextLocale = event.target.value
    console.log(
      `Changing locale from ${locale} to ${nextLocale}. Pathname: ${pathname}`,
    )
    startTransition(() => {
      console.log('Transitioning...')
      const newPathname = pathname.replace(`/${locale}`, `/${nextLocale}`)
      router.replace(newPathname)
    })
  }

  return (
    <section className={styles.wrapper} data-testid={LanguageSwitcher.name}>
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
                data-testid={`${LanguageSwitcher.name}-portuguese`}
              />
              <label
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
                data-testid={`${LanguageSwitcher.name}-english`}
              />
              <label
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

function Loading() {
  return (
    <section
      className={styles.wrapper}
      data-testid={`${LanguageSwitcher.name}-${Loading.name}`}
    >
      <div>
        <div className={styles.container}>
          <Skeleton
            width="3.25rem"
            height="2rem"
            className={styles.skeletonTitle}
          />
          <div>
            <Skeleton width="4rem" height="2rem" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default LanguageSwitcher
