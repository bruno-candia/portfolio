import { render } from '@testing-library/react'
import Page from '@/app/page'

describe('Page component', () => {
  it('renders the Home heading', () => {
    const { getByText } = render(<Page />)
    expect(getByText('Home')).toBeInTheDocument()
  })

  it('renders the About link', () => {
    const { getByText } = render(<Page />)
    const link = getByText('About')
    expect(link).toBeInTheDocument()
    expect(link.closest('a')).toHaveAttribute('href', '/about')
  })
})
