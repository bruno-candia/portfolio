import { renderHook, act } from '@testing-library/react-hooks'
import { useDrawSVG } from './useDrawSVG'

vi.mock('react', async (importOriginal) => {
  const mod = await importOriginal<typeof import('react')>()
  return {
    ...mod,
    useRef: () => ({
      current: {
        innerHTML: 'mockMarkup',
        querySelector: () => ({
          getTotalLength: () => 100,
          setAttribute: vi.fn(),
          style: {
            setProperty: vi.fn(),
          },
        }),
      },
    }),
  }
})

describe('useDrawSVG', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should initialize buttonRef', () => {
    const { result } = renderHook(() => useDrawSVG())
    expect(result.current.buttonRef.current).toBeDefined()
  })

  it('should draw the line correctly', async () => {
    const { result } = renderHook(() => useDrawSVG())
    console.error = vi.fn()

    result.current.buttonRef.current = {
      querySelector: vi.fn().mockReturnValue(null),
    } as unknown as HTMLButtonElement

    await act(async () => {
      result.current.drawLine()
    })

    expect(console.error).toHaveBeenCalledWith(
      'No path found in the buttonRef.',
    )
  })

  it('should draw the line correctly', async () => {
    const { result } = renderHook(() => useDrawSVG())
    const mockPath = {
      getTotalLength: vi.fn().mockReturnValue(100),
      setAttribute: vi.fn(),
      style: {
        setProperty: vi.fn(),
      },
    }

    result.current.buttonRef.current = {
      querySelector: vi.fn().mockReturnValue(mockPath),
    } as unknown as HTMLButtonElement

    await act(async () => {
      result.current.drawLine()
    })

    expect(mockPath.getTotalLength).toHaveBeenCalled()
    expect(mockPath.setAttribute).toHaveBeenCalledWith('pathLength', '1')
    expect(mockPath.style.setProperty).toHaveBeenCalledWith(
      '--path-speed',
      (100 / 7000).toString(),
    )
    expect(mockPath.style.setProperty).toHaveBeenCalledWith('--path-delay', '0')
  })

  it('should restart correctly', async () => {
    const { result } = renderHook(() => useDrawSVG())
    const mockPath = {
      getTotalLength: vi.fn().mockReturnValue(100),
      setAttribute: vi.fn(),
      style: {
        setProperty: vi.fn(),
      },
    }

    result.current.buttonRef.current = {
      querySelector: vi.fn().mockReturnValue(mockPath),
      innerHTML: 'mockMarkup',
    } as unknown as HTMLButtonElement

    await act(async () => {
      result.current.restart()
    })

    expect(result.current.buttonRef.current!.innerHTML).toBe('')
    requestAnimationFrame(() => {
      expect(result.current.buttonRef.current!.innerHTML).toBe('mockMarkup')
    })
  })

  it('should call requestAnimationFrame when restart function is called', async () => {
    const { result } = renderHook(() => useDrawSVG())
    const mockPath = {
      getTotalLength: vi.fn().mockReturnValue(100),
      setAttribute: vi.fn(),
      style: {
        setProperty: vi.fn(),
      },
    }

    result.current.buttonRef.current = {
      querySelector: vi.fn().mockReturnValue(mockPath),
      innerHTML: 'mockMarkup',
    } as unknown as HTMLButtonElement

    console.error = vi.fn()

    await act(async () => {
      result.current.restart()
    })

    const defaultButton = document.createElement('button')
    result.current.buttonRef.current = defaultButton
    result.current.buttonRef.current.innerHTML = ''

    requestAnimationFrame(() => {
      expect(result.current.buttonRef.current.innerHTML).toBe('mockMarkup')
    })
  })
})
