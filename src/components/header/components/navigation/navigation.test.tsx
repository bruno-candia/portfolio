import { render, screen } from '@testing-library/react'
import Navigation from '.'

describe('Logo Component', () => {
  it('renders correctly', () => {
    render(<Navigation />)
    expect(screen.getByRole('link', { name: 'Sobre Mim' })).toHaveAttribute(
      'href',
      '#about-me',
    )
    expect(screen.getByRole('link', { name: 'Meu Conteúdo' })).toHaveAttribute(
      'href',
      '#my-content',
    )
    expect(screen.getByRole('link', { name: 'Meu Lab' })).toHaveAttribute(
      'href',
      '#my-lab',
    )
    expect(screen.getByRole('link', { name: 'Experiências' })).toHaveAttribute(
      'href',
      '#experiences',
    )
    expect(
      screen.getByRole('link', { name: 'Trabalhos & História' }),
    ).toHaveAttribute('href', '#jobs-and-history')
  })
})
