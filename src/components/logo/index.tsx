import Link from 'next/link'
import HangLooseIcon from '../../../public/hang-loose'
import styles from './style.module.css'

export default function Logo() {
  return (
    <Link className={styles.container} href="/">
      <HangLooseIcon />
      <p className={styles['brand-name']}>Bruno Costa</p>
    </Link>
  )
}
