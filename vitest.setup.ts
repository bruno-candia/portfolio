import { afterEach, beforeAll, vi } from 'vitest'
import '@testing-library/jest-dom'
import { cleanup } from '@testing-library/react'
import { createTranslator, useTranslations } from 'next-intl'
import enMessage from './messages/en.json'

vi.mock('next-intl', () => ({
  createTranslator: vi.fn(() => (key: string) => key),
  useTranslations: vi.fn(() => (key: string) => key),
  useLocale: vi.fn(() => 'en'),
}))

beforeAll(() => {
  const messages = enMessage
  const translate = createTranslator({
    locale: 'en',
    messages,
  })

  vi.mocked(useTranslations).mockImplementation(() => translate)
})

afterEach(() => {
  cleanup()
})
