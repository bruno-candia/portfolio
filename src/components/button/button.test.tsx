import { render, screen } from '@testing-library/react'
import Button from './index'

describe('Button Component', () => {
  it('should render the button with children', () => {
    render(<Button>Click Me</Button>)
    const buttonElement = screen.getByTestId('Button')
    expect(buttonElement).toContainHTML('Click Me')
  })

  it('should render the button with children without children', () => {
    render(
      <Button>
        <></>
      </Button>,
    )
    const buttonElement = screen.getByTestId('Button')
    expect(buttonElement).toContainHTML('')
  })
})
