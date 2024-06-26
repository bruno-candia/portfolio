import { render, screen } from '@testing-library/react'
import { faker } from '@faker-js/faker'
import GlyphText from './'
import styles from './glyph-text.module.css'

describe('GlyphText Component', () => {
  it('should render the text with glyph effects', () => {
    const text = faker.lorem.words(5)
    render(<GlyphText element="div">{text}</GlyphText>)
    const glyphText = screen.getByTestId('GlyphText')
    expect(glyphText).toHaveClass(styles.container)

    text.split('').forEach((char, index) => {
      const spans = screen.getAllByText((_, element) => {
        return (
          element?.tagName.toLowerCase() === 'span' &&
          element?.getAttribute('data-char') === char &&
          (element as HTMLElement)?.style.getPropertyValue('--index') ===
            index.toString()
        )
      })
      expect(spans.length).toBe(1)
      const span = spans[0]
      expect(span).toHaveClass(styles.glyphEffect)
      expect(span).toHaveStyle({
        '--index': index.toString(),
      })
    })
  })

  it('should render a line break for / character', () => {
    const text = `Line 1/${faker.lorem.words(2)}`
    render(<GlyphText element="div">{text}</GlyphText>)
    const lineBreak = screen.getByText('', { selector: 'br' })
    expect(lineBreak).toBeInTheDocument()
  })

  it('should render with a custom element', () => {
    const text = faker.lorem.words(3)
    render(<GlyphText element="span">{text}</GlyphText>)
    const glyphText = screen.getByTestId('GlyphText')
    expect(glyphText.tagName).toBe('SPAN')
  })

  it('should render with an additional class', () => {
    const text = faker.lorem.words(3)
    const customClass = faker.lorem.word()
    render(
      <GlyphText element="div" className={customClass}>
        {text}
      </GlyphText>,
    )
    const glyphText = screen.getByTestId('GlyphText')
    expect(glyphText).toHaveClass(customClass)
  })

  it('should return null if no children are provided', () => {
    const { container } = render(<GlyphText element="div">{null}</GlyphText>)
    expect(container.firstChild).toBeNull()
  })
})
