import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import Page from './page'

vi.mock('@/components/banner', () => {
  return {
    default: () => <div data-testid="mockBanner">Mock Banner</div>,
  }
})

describe('Page Component', () => {
  it('deve renderizar corretamente', () => {
    const { getByTestId } = render(<Page />)
    const wrapperElement = getByTestId('Page')
    const bannerElement = getByTestId('mockBanner')

    expect(wrapperElement).toBeInTheDocument()
    expect(bannerElement).toBeInTheDocument()
  })
})
