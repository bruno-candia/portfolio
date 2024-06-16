import { Icons } from '@/components/icons'
import styles from './styles.module.css'

function LanguageSwitcher() {
  return (
    <section className={styles.wrapperLanguageSwitcher}>
      <div>
        <div className={styles.mobileLanguageSwitcher}>
          <fieldset
            className={`${styles.languageSwitcherRoot} ${styles.languageSwitcherComponent}`}
          >
            <legend className={styles.srOnly}>Select display language:</legend>
            <span style={{ height: '100%' }}>
              <input
                type="radio"
                id="mobile-language-switch-portuguese"
                name="language"
                value="pt-br"
              />
              <label
                htmlFor="mobile-language-switch-portuguese"
                title="portuguese language"
              >
                <Icons.brazilFlag />
              </label>
            </span>
            <span style={{ height: '100%' }}>
              <input
                type="radio"
                id="mobile-language-switch-english"
                name="language"
                value="en-us"
              />
              <label
                htmlFor="mobile-language-switch-english"
                title="english language"
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
