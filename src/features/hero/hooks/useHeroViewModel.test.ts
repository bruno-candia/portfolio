import { renderHook } from '@testing-library/react';
import { useHeroViewModel } from './useHeroViewModel';
import { describe, it, expect, vi } from 'vitest';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => `trans_${key}`,
}));

describe('useHeroViewModel', () => {
  it('should return translated content and socials', () => {
    const { result } = renderHook(() => useHeroViewModel());

    expect(result.current.greeting).toBe('trans_greeting');
    expect(result.current.socials).toHaveLength(3);
    expect(result.current.socials[0].label).toBe('LinkedIn');
  });
});
