import { renderHook, act } from '@testing-library/react';
import { useWorkCardViewModel } from './useWorkCardViewModel';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Work } from '../data/works';

vi.mock('next-intl', () => ({
  useTranslations: () => {
    const fn = (key: string) => key;
    fn.has = () => true;
    return fn;
  },
}));

describe('useWorkCardViewModel', () => {
  const mockWork: Work = {
    id: 'aurem',
    title: 'Aurem',
    subtitle: 'desc',
    image: '/img.png',
    link: 'link',
    tags: ['a'],
  };

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should toggle hover state correctly', () => {
    const { result } = renderHook(() => useWorkCardViewModel(mockWork));

    expect(result.current.isActive).toBe(false);

    act(() => {
      result.current.handleMouseEnter();
    });
    expect(result.current.isActive).toBe(true);

    act(() => {
      result.current.handleMouseLeave();
    });
    expect(result.current.isActive).toBe(false);
  });

  it('should handle modal state correctly (click)', () => {
    const { result } = renderHook(() => useWorkCardViewModel(mockWork));

    expect(result.current.isModalOpen).toBe(false);

    act(() => {
      result.current.handleClick();
    });
    expect(result.current.isModalOpen).toBe(true);

    act(() => {
      result.current.onCloseModal();
    });
    expect(result.current.isModalOpen).toBe(false);
  });

  it('should handle touch interaction correctly', () => {
    const { result } = renderHook(() => useWorkCardViewModel(mockWork));

    act(() => {
      result.current.handleTouchStart();
    });
    expect(result.current.isActive).toBe(true); // isTapped = true

    act(() => {
      result.current.handleTouchEnd();
    });

    expect(result.current.isModalOpen).toBe(false);

    act(() => {
      vi.advanceTimersByTime(200);
    });

    expect(result.current.isModalOpen).toBe(true);
    expect(result.current.isActive).toBe(false);
  });
});
