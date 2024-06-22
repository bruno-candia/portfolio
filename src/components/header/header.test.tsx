import { render } from '@testing-library/react'
import Header from './index'

vi.mock('next/navigation', () => ({
  useRouter() {
    return {
      prefetch: () => null,
    }
  },
  usePathname() {
    return '/en'
  },
}))

vi.mock('react', () => ({
  useTransition: () => [false, vi.fn()],
  useState: vi.fn(() => [false, vi.fn()]),
  useEffect: vi.fn(),
}))

vi.mock('next/themes', () => ({
  useTheme: () => ({
    setTheme: vi.fn(),
    theme: undefined,
  }),
}))

describe('Header Component', () => {
  it('should render the header with all sub-components', async () => {
    const { getByTestId } = render(<Header />)

    expect(getByTestId('Header')).toBeInTheDocument()
    expect(getByTestId('LanguageSwitcher')).toBeInTheDocument()
    expect(getByTestId('Button')).toBeInTheDocument()
    expect(getByTestId('ThemeSwitcher-Loading')).toBeInTheDocument()
    expect(getByTestId('Navigation')).toBeInTheDocument()
  })
})
