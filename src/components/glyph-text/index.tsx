import { ReactNode } from 'react'
import styles from './glyph-text.module.css'

interface GlyphTextProps {
  element: React.ElementType
  className?: string
  children: ReactNode
}

function GlyphText({ element: Element, children, className }: GlyphTextProps) {
  if (!children) {
    return null
  }
  const GLYPHS =
    'ラドクリフマラソンわたしワタシんょンョたばこタバコとうきょうトウキョウ0123456789±!@#$%^&*()_+ABCDEFGHIJKLMNOPQRSTUVWXYZ'

  return (
    <Element
      className={`${styles.container} ${className}`}
      data-testid={GlyphText.name}
    >
      {children
        .toString()
        .split('')
        .map((char, index) => {
          const displayChar = char === ' ' ? '\u00A0' : char

          if (char === '/') {
            return <br key={`${index}-${char}`} />
          }

          return (
            <span
              key={`${index}-${char}`}
              data-char={char}
              className={styles.glyphEffect}
              style={
                {
                  '--index': index,
                  '--char-1': `"${
                    GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
                  }"`,
                  '--char-2': `"${
                    GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
                  }"`,
                  '--char-3': `"${
                    GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
                  }"`,
                } as React.CSSProperties
              }
            >
              {displayChar}
            </span>
          )
        })}
    </Element>
  )
}

export default GlyphText
