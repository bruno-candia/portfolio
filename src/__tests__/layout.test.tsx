import { render, screen } from '@testing-library/react'
import { expect, test, vi } from 'vitest'
import RootLayout from '../app/layout'

vi.mock('next/font/google', () => ({
  Inter: () => ({
    className: 'inter',
  }),
}))

test('RootLayout renders children inside the layout', () => {
  render(
    <RootLayout>
      <div>Test content</div>
    </RootLayout>,
  )
  expect(screen.getByText('Test content')).toBeDefined()
})
