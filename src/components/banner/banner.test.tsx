import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import Banner from './'

vi.mock('@/components/me', () => ({
  __esModule: true,
  default: () => <div>Me Component</div>,
}))

vi.mock('@/components/button', () => ({
  __esModule: true,
  default: ({ children }: { children: string }) => <button>{children}</button>,
}))

vi.mock('@/components/glyph-text', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}))

vi.mock('@/components/badge', () => ({
  __esModule: true,
  default: ({ title }: { title: string }) => (
    <div data-testid="Badge">{title}</div>
  ),
}))

vi.mock('@/components/icons', async (importOriginal) => {
  const original = await importOriginal<typeof import('@/components/icons')>()
  return {
    ...original,
    Icons: {
      ...original.Icons,
      gitHub: () => <svg data-testid="GitHubIcon" />,
      linkedin: () => <div data-testid="LinkedIn" />,
      me: () => <div data-testid="Me" />,
    },
  }
})

vi.mock('@/config/skills', () => ({
  skillsConfig: [
    { id: 'skill1', isActive: true },
    { id: 'skill2', isActive: false },
  ],
}))

vi.mock('next-intl', () => ({
  useTranslations: () => (id: string) => `Translated ${id}`,
}))

describe('Banner Component', () => {
  it('should render the Banner', () => {
    render(<Banner />)

    const title1 = screen.getByText('Bruno Costa')
    expect(title1).toBeTruthy()

    const title2 = screen.getByText('Translated title')
    expect(title2).toBeTruthy()

    const badge1 = screen.getByText('Translated Badge.skill1')
    const badge2 = screen.getByText('Translated Badge.skill2')
    expect(badge1).toBeTruthy()
    expect(badge2).toBeTruthy()

    const description = screen.getByText('Translated description')
    expect(description).toBeTruthy()

    const gitHubButton = screen.getByRole('button', { name: /Github/i })
    expect(gitHubButton).toBeTruthy()

    const linkedInLink = screen.getByRole('button', { name: '' })
    expect(linkedInLink).toContainElement(screen.getByTestId('LinkedIn'))

    const meComponent = screen.getByText('Me Component')
    expect(meComponent).toBeTruthy()
  })
})
