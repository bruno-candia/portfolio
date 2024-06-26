import Banner from '@/components/banner'
import styles from './page.module.css'

export default function Page() {
  return (
    <div className={styles.wrapper} data-testid={Page.name}>
      <div className={styles.container}>
        <div className={styles.content}>
          <Banner />
        </div>
      </div>
    </div>
  )
}
