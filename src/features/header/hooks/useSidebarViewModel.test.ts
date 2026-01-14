import { renderHook } from '@testing-library/react';
import { useSidebarViewModel } from './useSidebarViewModel';
import { describe, it, expect, vi } from 'vitest';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => `translated_${key}`,
  useLocale: () => 'en',
}));

vi.mock('@/i18n/routing', () => ({
  usePathname: () => '/current-path',
}));

describe('useSidebarViewModel', () => {
  it('should return correct configuration', () => {
    const { result } = renderHook(() => useSidebarViewModel());

    expect(result.current.locale).toBe('en');
    expect(result.current.pathname).toBe('/current-path');

    expect(result.current.menuItems).toHaveLength(5);
    expect(result.current.menuItems[0]).toEqual({
      label: 'translated_about',
      href: '#about',
    });

    expect(result.current.languages).toHaveLength(2);
    expect(result.current.languages[0]).toEqual({
      label: 'translated_portuguese',
      code: 'pt',
    });
  });
});
