import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, fireEvent, screen } from '@testing-library/react'
import ThemeSwitcher from '.'
import '@testing-library/jest-dom'
import { useTheme } from 'next-themes'
import { UseThemeProps } from 'next-themes/dist/types'

vi.mock('next-themes', () => ({
  useTheme: vi.fn(() => ({
    setTheme: vi.fn(),
    theme: undefined,
  })),
}))

describe('ThemeSwitcher Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders the loading state initially', () => {
    vi.mocked(useTheme).mockImplementation(
      () =>
        ({
          setTheme: vi.fn(),
          theme: undefined,
        }) as unknown as UseThemeProps,
    )

    render(<ThemeSwitcher />)
    expect(screen.getByTestId('ThemeSwitcher-Loading')).toBeInTheDocument()
  })

  it('renders the main UI when mounted', async () => {
    vi.mocked(useTheme).mockImplementation(
      () =>
        ({
          setTheme: vi.fn(),
          theme: 'dark',
        }) as unknown as UseThemeProps,
    )

    render(<ThemeSwitcher />)
    expect(screen.getByTestId('ThemeSwitcher')).toBeInTheDocument()
    expect(
      screen.queryByTestId('ThemeSwitcher-Loading'),
    ).not.toBeInTheDocument()
  })

  it('toggles theme on button click', async () => {
    const setThemeMock = vi.fn()
    vi.mocked(useTheme).mockImplementation(
      () =>
        ({
          setTheme: setThemeMock,
          theme: 'light',
        }) as unknown as UseThemeProps,
    )

    render(<ThemeSwitcher />)
    fireEvent.click(screen.getByRole('button'))
    await vi.waitFor(() => {
      expect(setThemeMock).toHaveBeenCalledWith('dark')
    })
    fireEvent.click(screen.getByRole('button'))
    await vi.waitFor(() => {
      expect(setThemeMock).toHaveBeenCalledWith('light')
    })
  })
})
