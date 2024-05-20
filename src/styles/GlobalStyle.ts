import { createGlobalStyle } from 'styled-components'

import { tokens } from './tokens'

const GlobalStyle = createGlobalStyle`
  * {
    font-family: ${tokens.fonts['font-family'].Barlow} !important;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    
    &::-webkit-scrollbar {
      width: 14px !important;
    }

    &::selection {
      background-color: #CCFFCC !important;
      color: #000 !important;
    }

    &::-webkit-scrollbar-thumb {
      border: 4px solid rgba(0, 0, 0, 0) !important;
      background-clip: padding-box !important;
      border-radius: 0.625rem !important;
    }
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${tokens.fonts['font-family']['Work Sans']} !important;
  }
`

export { GlobalStyle }
