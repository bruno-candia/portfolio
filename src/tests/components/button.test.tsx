import { render } from '@testing-library/react'
import { Button } from '@/components/button'

describe('Button component', () => {
  it('renders the button correctly', () => {
    const { container } = render(<Button />)
    expect(container.querySelector('button')).toBeInTheDocument()
  })

  it(`renders the button correctly with passed className, variant and size`, () => {
    const children = 'Button'
    const { container } = render(
      <Button className="test-class" variant="default" size="normal">
        {children}
      </Button>,
    )
    expect(container.querySelector('button')).toHaveClass('test-class')
    expect(container.querySelector('button')).toHaveClass(/default/)
    expect(container.querySelector('button')).toHaveClass(/normal/)
    expect(container.querySelector('button')).toHaveTextContent('Button')
  })
})
