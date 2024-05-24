import Logo from '@/components/logo'
import { render, screen } from '@testing-library/react'

describe('Logo Component', () => {
  it('renders correctly', () => {
    render(<Logo />)
    expect(screen.getByTestId('hang-loose-icon')).toBeInTheDocument()
    expect(screen.getByText('Bruno Costa')).toBeInTheDocument()
    expect(screen.getByRole('link')).toHaveAttribute('href', '/')
  })
})
