import Badge from '@/components/badge'
import styles from './hero-mobile.module.css'
import { skillsConfig } from '@/config/skills'

function HeroMobile() {
  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.content}>
            <div className={styles.badgeGroup}>
              {skillsConfig.map((skill) => (
                <Badge
                  key={skill.id}
                  title={skill.title}
                  isActive={skill.isActive}
                />
              ))}
            </div>
            <div>
              <h1 className={styles.textWrapper}>BRUNO COSTA</h1>
              <h2 className={styles.textWrapper}>SENIOR SOFTWARE DEVELOPER</h2>
            </div>
            <p className={styles.description}>
              I’m a software developer with a passion for building web
              applications and solving problems.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroMobile
