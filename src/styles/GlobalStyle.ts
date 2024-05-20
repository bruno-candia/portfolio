import { createGlobalStyle } from 'styled-components'

// import { tokens } from './tokens'

const GlobalStyle = createGlobalStyle`
  * {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    
    &::-webkit-scrollbar {
      width: 14px;
    }

    &::selection {
      background-color: #CCFFCC;
      color: #000;
    }

    &::-webkit-scrollbar-thumb {
      border: 4px solid rgba(0, 0, 0, 0);
      background-clip: padding-box;
      border-radius: 0.625rem;
    }
  }
`

export { GlobalStyle }
