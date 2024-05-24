import Link from 'next/link'
import styles from './styles.module.css'

export default function Navigation() {
  return (
    <nav aria-label="principal menu">
      <ul className={styles.navigationList}>
        <li className={styles.navigationItem}>
          <Link
            className={styles.navigationLink}
            href="#about-me"
            id="about-me"
          >
            Sobre Mim
          </Link>
        </li>
        <li className={styles.navigationItem}>
          <Link
            className={styles.navigationLink}
            href="#my-content"
            id="my-content"
          >
            Meu Conteúdo
          </Link>
        </li>
        <li className={styles.navigationItem}>
          <Link className={styles.navigationLink} href="#my-lab" id="my-lab">
            Meu Lab
          </Link>
        </li>
        <li className={styles.navigationItem}>
          <Link
            className={styles.navigationLink}
            href="#experiences"
            id="experiences"
          >
            Experiências
          </Link>
        </li>
        <li className={styles.navigationItem}>
          <Link
            className={styles.navigationLink}
            href="#jobs-and-history"
            id="jobs-and-history"
          >
            Trabalhos & História
          </Link>
        </li>
      </ul>
    </nav>
  )
}
