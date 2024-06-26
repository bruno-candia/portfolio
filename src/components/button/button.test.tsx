import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import Button from './'
import { IconProps } from '../icons'
import style from './button.module.css'
import { faker } from '@faker-js/faker'

vi.mock('../icons', () => ({
  __esModule: true,
  default: (props: IconProps) => <svg {...props} data-testid="icon" />,
}))

describe('Button Component', () => {
  it('should render with primary variant', () => {
    const buttonText = faker.lorem.words(2)
    render(<Button variant="primary">{buttonText}</Button>)
    const button = screen.getByRole('button', {
      name: new RegExp(buttonText, 'i'),
    })
    expect(button).toHaveClass(`${style.btnBase} ${style.primary}`)
    expect(button).toHaveTextContent(buttonText)
  })

  it('should render with secondary variant', () => {
    const buttonText = faker.lorem.words(2)
    render(<Button variant="secondary">{buttonText}</Button>)
    const button = screen.getByRole('button', {
      name: new RegExp(buttonText, 'i'),
    })
    expect(button).toHaveClass(`${style.btnBase} ${style.secondary}`)
    expect(button).toHaveTextContent(buttonText)
  })

  it('should render with an icon', () => {
    const buttonText = faker.lorem.words(2)
    const IconMock = (props: IconProps & { width: string }) => (
      <svg {...props} data-testid="icon" />
    )

    render(
      <Button variant="primary" icon={IconMock}>
        {buttonText}
      </Button>,
    )
    const icon = screen.getByTestId('icon')
    expect(icon).toBeInTheDocument()
    expect(icon).toHaveAttribute('width', '16')
  })

  it('should render with a link', () => {
    const buttonText = faker.lorem.words(2)
    const link = faker.internet.url()
    render(
      <Button variant="primary" link={link}>
        {buttonText}
      </Button>,
    )
    const button = screen.getByRole('button', {
      name: new RegExp(buttonText, 'i'),
    })
    expect(button).toHaveAttribute('href', link)
    expect(button).toHaveAttribute('target', '_blank')
    expect(button).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('should render with all props', () => {
    const buttonText = faker.lorem.words(2)
    const link = faker.internet.url()
    const IconMock = (props: IconProps & { width: string }) => (
      <svg {...props} data-testid="icon" />
    )

    render(
      <Button variant="secondary" icon={IconMock} link={link}>
        {buttonText}
      </Button>,
    )
    const button = screen.getByRole('button', {
      name: new RegExp(buttonText, 'i'),
    })
    const icon = screen.getByTestId('icon')

    expect(button).toHaveClass(`${style.btnBase} ${style.secondary}`)
    expect(button).toHaveAttribute('href', link)
    expect(button).toHaveAttribute('target', '_blank')
    expect(button).toHaveAttribute('rel', 'noopener noreferrer')
    expect(icon).toBeInTheDocument()
    expect(icon).toHaveAttribute('width', '16')
    expect(button).toHaveTextContent(buttonText)
  })
})
