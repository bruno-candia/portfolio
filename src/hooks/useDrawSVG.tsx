import { useRef } from 'react'

export function useDrawSVG() {
  const defaultButton = document.createElement('button')
  defaultButton.innerHTML = 'Default Button Content'
  const buttonRef = useRef<HTMLButtonElement>(defaultButton)

  function drawLine() {
    const path = buttonRef.current.querySelector('path')
    if (path) {
      const pxPerSec = 7000
      const len = Math.ceil(path.getTotalLength())
      const speed = len / pxPerSec
      path.setAttribute('pathLength', '1')
      path.style.setProperty('--path-speed', speed.toString())
      path.style.setProperty('--path-delay', '0')
    } else {
      console.error('No path found in the buttonRef.')
    }
  }

  const restart = () => {
    const markup = buttonRef.current.innerHTML
    console.log(markup)
    buttonRef.current.innerHTML = ''
    requestAnimationFrame(() => {
      buttonRef.current.innerHTML = markup
      drawLine()
    })
  }

  return { buttonRef, drawLine, restart }
}
