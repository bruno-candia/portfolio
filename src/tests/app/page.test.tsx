import { render, screen } from '@testing-library/react'
import Page from '@/app/page'
import '@testing-library/jest-dom'
import { ThemeProvider, useTheme } from 'next-themes'
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

describe('Page', () => {
  beforeEach(() => {
    localStorage.clear()
    const setTheme = vitest.fn()
    ;(useTheme as vi.Mock).mockReturnValue({
      setTheme,
      theme: 'dark',
      themes: [],
    })
  })

  it('should render ModeToggle component within Page', () => {
    render(<Page />)
    const button = screen.getByRole('switch')
    expect(button).toBeInTheDocument()
  })

  it('should render light astronaut when theme is light', async () => {
    const setThemeSpy = vitest.fn()
    ;(useTheme as vi.Mock).mockReturnValue({
      setTheme: setThemeSpy,
      theme: 'light',
      themes: [],
    })

    renderWithThemeProvider(<Page />)
    const image = screen.getByRole('img')
    expect(image).toHaveAttribute('alt', 'Hand draw light astronaut')
  })

  it('should render light astronaut when theme is dark', async () => {
    const setThemeSpy = vitest.fn()
    ;(useTheme as vi.Mock).mockReturnValue({
      setTheme: setThemeSpy,
      theme: 'dark',
      themes: [],
    })

    renderWithThemeProvider(<Page />)
    const image = screen.getByRole('img')
    expect(image).toHaveAttribute('alt', 'Hand draw dark astronaut')
  })
})
