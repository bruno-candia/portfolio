import Link from 'next/link'
import HangLooseIcon from '../../../public/hang-loose'
import styles from './styles.module.css'

export default function Logo() {
  return (
    <Link className={styles.container} href="/">
      <HangLooseIcon />
      <span className={styles['brand-name']}>Bruno Costa</span>
    </Link>
  )
}
