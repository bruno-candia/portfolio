import { useRef } from 'react'

export function useDrawSVG() {
  const buttonRef = useRef<HTMLButtonElement | null>(null)

  function drawLine() {
    const PATH = buttonRef.current?.querySelector('path')
    if (PATH) {
      const PX_PER_SEC = 7000
      let DELAY = 0
      const LEN = Math.ceil(PATH.getTotalLength())
      const SPEED = LEN / PX_PER_SEC
      PATH.setAttribute('pathLength', '1')
      PATH.style.setProperty('--path-speed', SPEED.toString())
      if (DELAY) PATH.style.setProperty('--path-delay', DELAY.toString())
      DELAY += SPEED
    }
  }

  const restart = () => {
    if (buttonRef.current) {
      const MARKUP = buttonRef.current.innerHTML
      buttonRef.current.innerHTML = ''
      requestAnimationFrame(() => {
        if (buttonRef.current) {
          buttonRef.current.innerHTML = MARKUP
          drawLine()
        }
      })
    }
  }

  return { buttonRef, drawLine, restart }
}
