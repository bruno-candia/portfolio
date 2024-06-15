import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import Button from '@/components/button'

describe('Button component', () => {
  const children = 'Button'

  it('renders the button correctly', () => {
    const { container } = render(<Button> {children}</Button>)
    expect(container.querySelector('button')).toBeInTheDocument()
  })
})
