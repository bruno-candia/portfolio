import { render, screen } from '@testing-library/react'
import Page from '@/app/page'
import '@testing-library/jest-dom'

describe('Page', () => {
  it('should render ModeToggle component within Page', () => {
    render(<Page />)
    const button = screen.getByRole('switch')
    expect(button).toBeInTheDocument()
  })
})
