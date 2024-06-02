'use client'

import { useTheme } from 'next-themes'
import styles from './styles.module.css'
import { useEffect, useState } from 'react'
import { Icons } from '../icons'
import { Button } from '../button'

export default function ModeToggle() {
  const { setTheme } = useTheme()
  const [clicked, setClicked] = useState(false)

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setTheme(clicked ? 'light' : 'dark')
    }, 250)

    return () => clearTimeout(timeoutId)
  }, [clicked, setTheme])

  const handleClick = () => {
    setClicked(!clicked)
  }

  return (
    <div className={`${styles.wrapper} ${clicked ? styles.clicked : ''} `}>
      <Button
        className={styles.theme_toggle}
        onClick={handleClick}
        aria-checked={clicked}
        role="switch"
      >
        <Icons.sun className={styles.icon} id={styles.sun} />
        <Icons.moon className={styles.icon} id={styles.moon} />
      </Button>
    </div>
  )
}
