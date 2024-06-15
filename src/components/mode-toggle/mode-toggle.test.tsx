import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { ThemeProvider, useTheme } from 'next-themes'
import ModeToggle from '@/components/mode-toggle'
import vi, { describe, it, expect, beforeEach, vi as vitest } from 'vitest'
import { ReactNode } from 'react'

const renderWithThemeProvider = (ui: ReactNode) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>)
}

vitest.mock('next-themes', () => ({
  useTheme: vitest.fn(),
  ThemeProvider: ({ children }: { children: ReactNode }) => (
    <div>{children}</div>
  ),
}))

describe('ModeToggle', () => {
  beforeEach(() => {
    localStorage.clear()
    const setTheme = vitest.fn()
    ;(useTheme as vi.Mock).mockReturnValue({
      setTheme,
      theme: 'dark',
      themes: [],
    })
  })

  it('should render without crashing', () => {
    renderWithThemeProvider(<ModeToggle />)
    const button = screen.getByRole('switch')
    expect(button).toBeInTheDocument()
  })

  it('should have correct initial state', () => {
    renderWithThemeProvider(<ModeToggle />)
    const button = screen.getByRole('switch')
    expect(button).toHaveAttribute('aria-checked', 'false')
  })

  it('should toggle theme and state when clicked', async () => {
    const setThemeSpy = vitest.fn()
    ;(useTheme as vi.Mock).mockReturnValue({
      setTheme: setThemeSpy,
      theme: 'dark',
      themes: [],
    })

    renderWithThemeProvider(<ModeToggle />)
    const button = screen.getByRole('switch')

    expect(button).toHaveAttribute('aria-checked', 'false')

    fireEvent.click(button)
    await waitFor(() => expect(button).toHaveAttribute('aria-checked', 'true'))
    await waitFor(() => expect(setThemeSpy).toHaveBeenCalledWith('light'))

    fireEvent.click(button)
    await waitFor(() => expect(button).toHaveAttribute('aria-checked', 'false'))
    await waitFor(() => expect(setThemeSpy).toHaveBeenCalledWith('dark'))
  })

  it('should have accessible attributes', () => {
    renderWithThemeProvider(<ModeToggle />)
    const button = screen.getByRole('switch')
    expect(button).toHaveAttribute('role', 'switch')
    expect(button).toHaveAttribute('aria-checked', 'false')
  })
})
