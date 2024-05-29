import styles from '../../styles.module.css'

export default function MenuButton() {
  return (
    <div className={styles.menu_icon}>
      <label
        htmlFor={styles.open_sidebar_menu}
        className={styles.sidebar_icon_toggle}
      >
        <span></span>
        <span></span>
      </label>
    </div>
  )
}
