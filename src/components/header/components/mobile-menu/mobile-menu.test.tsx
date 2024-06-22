import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import MobileMenu from './'
import { IMobileMenuProps } from '@/types/mobile'
import { MainNavItem } from '@/types/nav'
import { faker } from '@faker-js/faker'

vi.mock('./components/popover', () => ({
  default: ({ items }: { items: MainNavItem[] }) => (
    <div data-testid="popover-mock">
      {items.map((item, index) => (
        <a
          key={index}
          href={item.href.toString()}
          data-testid="popover-item"
          data-title={item.title}
        >
          {item.title}
        </a>
      ))}
    </div>
  ),
}))

describe('MobileMenu', () => {
  const items: IMobileMenuProps['items'] = [
    {
      id: faker.lorem.words(),
      href: faker.internet.url(),
      title: faker.internet.url(),
    },
    {
      id: faker.lorem.words(),
      href: faker.internet.url(),
      title: faker.internet.url(),
    },
  ]

  it('should render the menu button', () => {
    render(<MobileMenu items={items} />)
    const button = screen.getByRole('button', { name: /close menu/i })
    expect(button).toBeInTheDocument()
  })

  it('should toggle the menu when button is clicked', () => {
    render(<MobileMenu items={items} />)
    const button = screen.getByRole('button', { name: /close menu/i })

    expect(screen.queryByTestId('popover-mock')).not.toBeInTheDocument()

    fireEvent.click(button)
    expect(screen.getByTestId('popover-mock')).toBeInTheDocument()
    expect(button).toHaveAttribute('aria-label', 'Open Menu')

    fireEvent.click(button)
    expect(screen.queryByTestId('popover-mock')).not.toBeInTheDocument()
    expect(button).toHaveAttribute('aria-label', 'Close Menu')
  })
})
