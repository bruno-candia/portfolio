import { render, screen, fireEvent } from '@testing-library/react'
import Collapse from './index'
import { faker } from '@faker-js/faker'

describe('Collapse Component', () => {
  const links = faker.lorem.words(2)
  const text = faker.string.sample.name

  const items = [
    { title: links[0], href: `/${links[0]}` },
    { title: links[1], href: `/${links[1]}` },
  ]

  it('should render the collapse component with text and items', () => {
    render(<Collapse text={text} items={items} />)
    const buttonElement = screen.getByTestId('Collapse-button')
    expect(buttonElement).toContainHTML(text)
    items.forEach((item) => {
      const linkElement = screen.getByTestId(`Collapse-link-${item.title}`)
      expect(linkElement).toContainHTML(item.title)
      expect(linkElement).toHaveAttribute('href', item.href)
    })
  })

  it('should toggle collapse content visibility on button click', () => {
    render(<Collapse text={text} items={items} />)
    const buttonElement = screen.getByTestId('Collapse-button')
    const contentElement = screen.getByTestId('Collapse-content')

    expect(contentElement).toHaveStyle('height: 0px')

    fireEvent.click(buttonElement)
    expect(contentElement).toHaveStyle('height: 96px')

    fireEvent.click(buttonElement)
    expect(contentElement).toHaveStyle('height: 0px')
  })
})
