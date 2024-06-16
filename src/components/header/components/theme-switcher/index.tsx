'use client'

import { useTheme } from 'next-themes'
import styles from './styles.module.css'
import { useEffect, useState } from 'react'
import { Icons } from '@/components/icons'

export default function ThemeSwitcher() {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [clicked, setClicked] = useState<boolean>(theme === 'light')

  useEffect(() => {
    if (theme) {
      setMounted(true)
    }
  }, [theme])

  useEffect(() => {
    if (mounted) {
      const timeoutId = setTimeout(() => {
        setTheme(clicked ? 'light' : 'dark')
      }, 250)
      return () => clearTimeout(timeoutId)
    }
  }, [clicked, mounted, setTheme])

  const handleClick = () => {
    setClicked(!clicked)
  }

  if (!mounted) return null

  return (
    <div className={styles.wrapper}>
      <div>
        <div className={styles.container}>
          <p>Theme</p>
          <div className={`${styles.Root} ${styles.Component}`}>
            <div
              className={`${styles.buttonContainer} ${clicked ? styles.clicked : ''}`}
              data-navigation-header
            >
              <button className={styles.theme_toggle} onClick={handleClick}>
                <Icons.sun className={`${styles.icon}`} id={styles.sun} />
                <Icons.moon className={`${styles.icon}`} id={styles.moon} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
