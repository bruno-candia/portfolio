import styles from './banner.module.css'
import Badge from '@/components/badge'
import { skillsConfig } from '@/config/skills'
import Me from '@/components/me'
import Button from '@/components/button'
import { Icons } from '../icons'
import { useTranslations } from 'next-intl'
import GlyphText from '@/components/glyph-text'

function Banner() {
  const { gitHub } = Icons
  const t = useTranslations('Banner')

  return (
    <main data-testid={Banner.name}>
      <section className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.badgeGroup}>
              {skillsConfig.map((skill) => (
                <Badge
                  key={skill.id}
                  title={t(`Badge.${skill.id}`)}
                  isActive={skill.isActive}
                />
              ))}
            </div>
            <div>
              <GlyphText element="h1" className={styles.textWrapper}>
                Bruno Costa
              </GlyphText>
              <GlyphText element="h2" className={styles.textWrapper}>
                {t('title')}
              </GlyphText>
            </div>
            <p className={styles.description}>{t('description')}</p>
            <div className={styles.socialCta}>
              <Button
                variant="secondary"
                icon={gitHub}
                link="https://github.com/bruno-candia"
              >
                Github
              </Button>
              <a
                role="button"
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.linkedin.com/in/bruno-costa-candia/"
              >
                <Icons.linkedin width="24" />
              </a>
            </div>
          </div>
          <Me />
        </div>
      </section>
    </main>
  )
}

export default Banner
