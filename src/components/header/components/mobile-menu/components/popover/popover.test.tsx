import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import Popover from '.'
import { faker } from '@faker-js/faker'
import { MainNavItem } from '@/types/nav'

vi.mock('next-intl', () => ({
  useTranslations: vi.fn().mockReturnValue((key: string) => key),
}))

vi.mock('../../../language-switcher', () => ({
  __esModule: true,
  default: () => <div data-testid="LanguageSwitcher" />,
}))

vi.mock('../../../theme-switcher', () => ({
  __esModule: true,
  default: () => <div data-testid="ThemeSwitcher" />,
}))

vi.mock('@/components/button', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <button>{children}</button>
  ),
}))

describe('Popover', () => {
  const items: MainNavItem[] = Array.from({ length: 5 }).map(() => ({
    id: faker.string.uuid(),
    href: faker.internet.url(),
    title: faker.string.sample(),
  }))

  it('should render the contact button, theme switcher, and language switcher', () => {
    render(<Popover items={items} />)

    expect(screen.getByRole('button', { name: /contact/i })).toBeInTheDocument()

    expect(screen.getByTestId('LanguageSwitcher')).toBeInTheDocument()
    expect(screen.getByTestId('ThemeSwitcher')).toBeInTheDocument()
  })

  it('should render a list of items when items are provided', () => {
    render(<Popover items={items} />)

    expect(screen.getByTestId('Popover-section')).toBeInTheDocument()

    items.forEach((item) => {
      const link = screen.getByTestId(`Popover-link-${item.id}`)
      expect(link).toHaveAttribute('href', item.href)
      expect(link).toHaveTextContent(item.id)
    })
  })

  it('should not render the list when items are empty', () => {
    render(<Popover items={[]} />)

    expect(screen.queryByTestId('Popover-section')).not.toBeInTheDocument()
  })
})
