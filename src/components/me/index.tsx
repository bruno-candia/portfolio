import { Icons } from '../icons'
import styles from './me.module.css'

interface IMeProps {
  width: string
  height: string
}

function Me({ width, height }: IMeProps) {
  return (
    <div
      className={styles.myPhoto}
      style={{
        width: `${width}vw`,
        height: `${height}vw`,
      }}
    >
      <Icons.me className={styles.icon} />
    </div>
  )
}

export default Me
