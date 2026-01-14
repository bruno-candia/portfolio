import { renderHook } from '@testing-library/react';
import { useAboutViewModel } from './useAboutViewModel';
import { describe, it, expect, vi } from 'vitest';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => `trans_${key}`,
}));

describe('useAboutViewModel', () => {
  it('should return translated strings', () => {
    const { result } = renderHook(() => useAboutViewModel());

    expect(result.current.title).toBe('trans_title');
    expect(result.current.description).toBe('trans_description');
  });
});
