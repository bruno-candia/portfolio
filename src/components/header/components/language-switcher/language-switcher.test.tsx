import { vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import LanguageSwitcher from './'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { faker } from '@faker-js/faker'

const mockTranslations = {
  title: faker.lorem.words(),
  legend: faker.lorem.words(),
  'label-portuguese': faker.lorem.words(),
  'label-english': faker.lorem.words(),
}

vi.mock('next-intl', () => ({
  useLocale: vi.fn(() => 'en'),
  useTranslations: vi.fn(() => (key: string) => {
    const translations: { [key: string]: string } = {
      ...mockTranslations,
    }
    return translations[key]
  }),
}))

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => ({
    replace: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
    push: vi.fn(),
    prefetch: vi.fn(),
  })),
  usePathname: vi.fn(() => '/en'),
}))

vi.mock('react', () => ({
  useTransition: vi.fn(),
}))

describe('LanguageSwitcher Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders without crashing', () => {
    vi.mocked(useTransition).mockImplementation(() => [
      false,
      vi.fn() as unknown as ReturnType<typeof useTransition>[1],
    ])
    const { getByText, getByTitle } = render(<LanguageSwitcher />)
    expect(getByText(mockTranslations.title)).toBeInTheDocument()
    expect(getByText(mockTranslations.legend)).toBeInTheDocument()
    expect(getByTitle(mockTranslations['label-portuguese'])).toBeInTheDocument()
    expect(getByTitle(mockTranslations['label-english'])).toBeInTheDocument()
  })

  it('shows loading component during state transition', () => {
    vi.mocked(useTransition).mockImplementation(() => [
      true,
      vi.fn() as unknown as ReturnType<typeof useTransition>[1],
    ])
    render(<LanguageSwitcher />)
    expect(screen.getByTestId('LanguageSwitcher-Loading')).toBeInTheDocument()
  })

  it('handles locale change correctly when selecting Portuguese', async () => {
    const mockReplace = vi.fn()
    const mockStartTransition = vi.fn((callback) => callback())

    vi.mocked(useRouter).mockReturnValue({
      replace: mockReplace,
      back: vi.fn(),
      forward: vi.fn(),
      refresh: vi.fn(),
      push: vi.fn(),
      prefetch: vi.fn(),
    })

    vi.mocked(useTransition).mockReturnValue([false, mockStartTransition])

    const { getByTestId } = render(<LanguageSwitcher />)
    const input = getByTestId('LanguageSwitcher-portuguese')

    fireEvent.click(input, { target: { value: 'pt' } })

    await waitFor(() => {
      expect(mockStartTransition).toHaveBeenCalled()
      expect(mockReplace).toHaveBeenCalledWith(expect.stringContaining('/pt'))
    })
  })

  it('handles locale change correctly when selecting English', async () => {
    const mockReplace = vi.fn()
    const mockStartTransition = vi.fn((callback) => callback())

    vi.mocked(useRouter).mockReturnValue({
      replace: mockReplace,
      back: vi.fn(),
      forward: vi.fn(),
      refresh: vi.fn(),
      push: vi.fn(),
      prefetch: vi.fn(),
    })

    vi.mocked(useTransition).mockReturnValue([false, mockStartTransition])

    const { getByTestId } = render(<LanguageSwitcher />)
    const input = getByTestId('LanguageSwitcher-portuguese')

    fireEvent.click(input, { target: { value: 'en' } })

    await waitFor(() => {
      expect(mockStartTransition).toHaveBeenCalled()
      expect(mockReplace).toHaveBeenCalledWith(expect.stringContaining('/en'))
    })
  })
})
