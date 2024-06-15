import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import ScribbledButton from './scribbled-button'
import { useDrawSVG } from '@/hooks/useDrawSVG'
import { vi } from 'vitest'

const restartMock = vi.fn()
const drawLineMock = vi.fn()

vi.mock('@/hooks/useDrawSVG', () => ({
  useDrawSVG: () => ({
    buttonRef: { current: null },
    drawLine: drawLineMock,
    restart: restartMock,
  }),
}))

describe('ScribbledButton', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should call restart on mouse enter', () => {
    const { restart } = useDrawSVG()
    render(<ScribbledButton>Test Button</ScribbledButton>)
    const button = screen.getByTestId('ScribbledButton-button')
    fireEvent.mouseEnter(button)
    expect(restart).toHaveBeenCalled()
  })

  it('should call drawLine on mouse leave', () => {
    const { drawLine } = useDrawSVG()
    render(<ScribbledButton>Test Button</ScribbledButton>)
    const button = screen.getByTestId('ScribbledButton-button')
    fireEvent.mouseLeave(button)
    expect(drawLine).toHaveBeenCalled()
  })

  it('should render the SVG icon', () => {
    render(<ScribbledButton>Test Button</ScribbledButton>)
    const svgElement = screen.getByTestId('ScribbledButton-svg')
    expect(svgElement).toBeInTheDocument()
  })
})
