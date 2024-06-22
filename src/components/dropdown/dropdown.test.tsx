import { render, screen } from '@testing-library/react'
import { Dropdown } from './index'
import { DropdownItemProps } from './components/item'
import CaretDown from 'public/caret-down'
import { faker } from '@faker-js/faker'

describe('Dropdown Component', () => {
  const pages = faker.lorem.words(2)
  const descriptions = faker.lorem.sentences(2)
  const label = faker.lorem.text.name
  const items: DropdownItemProps[] = [
    { page: pages[0], description: descriptions[0] },
    { page: pages[1], description: descriptions[1] },
  ]

  it('should render the dropdown root with label', () => {
    render(
      <Dropdown.Root label={label}>
        <Dropdown.Content>
          {items.map((item) => (
            <Dropdown.Item key={item.page} {...item} />
          ))}
        </Dropdown.Content>
      </Dropdown.Root>,
    )
    const buttonElement = screen.getByTestId('DropdownRoot-button')
    expect(buttonElement).toHaveTextContent(label)
  })

  it('should render the dropdown items', () => {
    render(
      <Dropdown.Root label={label}>
        <Dropdown.Content>
          {items.map((item) => (
            <Dropdown.Item key={item.page} {...item} />
          ))}
        </Dropdown.Content>
      </Dropdown.Root>,
    )
    items.forEach((item) => {
      const linkElement = screen.getByTestId(`DropdownItem-link-${item.page}`)
      expect(linkElement).toHaveAttribute('href', item.page)
    })
  })

  it('should render the icon if provided', () => {
    render(
      <Dropdown.Root label={label}>
        <Dropdown.Content>
          <Dropdown.Item
            page={items[0].page}
            description={items[0].description}
            icon={CaretDown}
          />
        </Dropdown.Content>
      </Dropdown.Root>,
    )
    const iconElement = screen.getByTestId('DropdownItem-icon')
    expect(iconElement).toBeInTheDocument()
  })
})
