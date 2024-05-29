import Link from 'next/link'
import styles from '../../styles.module.css'

export default function Navigation() {
  return (
    <nav aria-label="principal menu" className={styles.is_desktop}>
      <ul className={styles.navigation_list}>
        <li className={styles.navigation_item}>
          <Link
            className={styles.navigation_link}
            href="#about-me"
            id="about-me"
          >
            Sobre Mim
          </Link>
        </li>
        <li className={styles.navigation_item}>
          <Link
            className={styles.navigation_link}
            href="#my-content"
            id="my-content"
          >
            Meu Conteúdo
          </Link>
        </li>
        <li className={styles.navigation_item}>
          <Link className={styles.navigation_link} href="#my-lab" id="my-lab">
            Meu Lab
          </Link>
        </li>
        <li className={styles.navigation_item}>
          <Link
            className={styles.navigation_link}
            href="#experiences"
            id="experiences"
          >
            Experiências
          </Link>
        </li>
        <li className={styles.navigation_item}>
          <Link
            className={styles.navigation_link}
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
