import { renderHook } from '@testing-library/react-hooks'
import { act } from 'react'
import { useDrawSVG } from './useDrawSVG'
import { describe, it, expect } from 'vitest'

describe('useDrawSVG', () => {
  it('should initialize buttonRef with null', () => {
    const { result } = renderHook(() => useDrawSVG())
    expect(result.current.buttonRef.current).toBe(null)
  })

  it('should draw line correctly', () => {
    const { result } = renderHook(() => useDrawSVG())
    const button = document.createElement('button')
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')

    // Simular o método getTotalLength
    path.getTotalLength = () => 7000

    button.appendChild(path)
    result.current.buttonRef.current = button

    act(() => {
      result.current.drawLine()
    })

    expect(path.getAttribute('pathLength')).toBe('1')
    expect(path.style.getPropertyValue('--path-speed')).toBe('1')
  })

  it('should restart correctly', () => {
    const { result } = renderHook(() => useDrawSVG())
    const button = document.createElement('button')
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')

    button.appendChild(path)
    result.current.buttonRef.current = button

    act(() => {
      result.current.restart()
    })

    expect(button.innerHTML).toBe('')
    requestAnimationFrame(() => {
      expect(button.innerHTML).toBe('<path></path>')
      expect(path.getAttribute('pathLength')).toBe('1')
    })
  })
})
