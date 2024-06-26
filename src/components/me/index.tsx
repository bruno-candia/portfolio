import { Icons } from '../icons'
import styles from './me.module.css'

function Me() {
  return (
    <div className={styles.myPhoto}>
      <Icons.me className={styles.icon} />
    </div>
  )
}

export default Me
