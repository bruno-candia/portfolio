'use client'

import { PropsWithChildren } from 'react'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import { GlobalStyle } from '../styles/GlobalStyle'
import { tokens } from '../styles/tokens'

export type GrowThemeProviderProps = PropsWithChildren<unknown>

export function ThemeProvider({ children }: GrowThemeProviderProps) {
  return (
    <StyledThemeProvider theme={tokens}>
      <GlobalStyle />
      {children}
    </StyledThemeProvider>
  )
}
