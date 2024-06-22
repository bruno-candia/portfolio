import styles from './banner.module.css'
import HeroMobile from './hero-mobile'
// import Me from '../me'

function Banner() {
  return (
    <main>
      <div className={styles.wrapper}>
        <HeroMobile />
      </div>
    </main>
  )
}

export default Banner
