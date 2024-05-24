import { render, screen } from '@testing-library/react'
import { Button } from '.'

function MockIcon() {
  return <p>Icon</p>
}

describe('Button Component', () => {
  it('renders correctly when button is primary', () => {
    const text = 'Contact'
    const { getByText } = render(
      <Button.Root type="primary">{text}</Button.Root>,
    )

    const button = getByText(text).closest('button')

    expect(button).not.toBeNull()

    if (button) {
      expect(button.className).toMatch(/primaryButton/)
      expect(screen.getByText('Contact')).toBeInTheDocument()
    }
  })

  it('renders correctly when button is secondary', () => {
    const text = 'Contact'
    const { getByText } = render(
      <Button.Root type="secondary">{text}</Button.Root>,
    )

    const button = getByText(text).closest('button')

    expect(button).not.toBeNull()

    if (button) {
      expect(button.className).toMatch(/secondaryButton/)
      expect(screen.getByText('Contact')).toBeInTheDocument()
    }
  })

  it('renders correctly with an icon', () => {
    const text = 'Contact'
    render(
      <Button.Root type="secondary">
        <Button.Icon icon={MockIcon} />
        {text}
      </Button.Root>,
    )

    expect(screen.getByText('Icon')).toBeInTheDocument()
    expect(screen.getByText(text)).toBeInTheDocument()
  })
})
