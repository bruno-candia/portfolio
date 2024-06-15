import { render } from '@testing-library/react'
import { Icons } from '@/components/icons'

describe('Icons component', () => {
  it('renders the logo icon correctly', () => {
    const { container } = render(<Icons.logo />)
    expect(container.querySelector('svg')).toBeInTheDocument()
    expect(container.querySelector('svg')).toHaveAttribute('height', '48')
    expect(container.querySelector('svg')).toHaveAttribute('fill', '#fff')
  })

  it('renders the twitter icon correctly', () => {
    const { container } = render(<Icons.twitter />)
    expect(container.querySelector('svg')).toBeInTheDocument()
    expect(container.querySelector('svg')).toHaveAttribute('height', '23')
    expect(container.querySelector('svg')).toHaveAttribute('width', '23')
  })

  it('renders the gitHub icon correctly', () => {
    const { container } = render(<Icons.gitHub />)
    expect(container.querySelector('svg')).toBeInTheDocument()
    expect(container.querySelector('svg')).toHaveAttribute(
      'viewBox',
      '0 0 438.549 438.549',
    )
  })

  type IconName = keyof typeof Icons
  const icons: IconName[] = Object.keys(Icons) as IconName[]

  icons.forEach((iconName) => {
    it(`renders the ${String(iconName)} icon correctly with passed props`, () => {
      const IconComponent = Icons[iconName]
      const { container } = render(<IconComponent className="test-class" />)
      expect(container.querySelector('svg')).toBeInTheDocument()
      expect(container.querySelector('svg')).toHaveClass('test-class')
    })
  })

  it('renders all icons', () => {
    icons.forEach((iconName) => {
      const IconComponent = Icons[iconName]
      const { container } = render(<IconComponent />)
      expect(container.querySelector('svg')).toBeInTheDocument()
    })
  })
})
