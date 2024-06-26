import { render, screen } from '@testing-library/react'
import Badge from './index'

describe('Badge Component', () => {
  it('should render the Badge with children', () => {
    render(<Badge title={'test'} isActive={false} />)
    const BadgeElement = screen.getByTestId('Badge')
    expect(BadgeElement).toContainHTML('test')
  })
})
