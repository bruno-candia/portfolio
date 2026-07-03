import { renderHook } from '@testing-library/react';
import { useHeroViewModel } from './useHeroViewModel';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { sendAnalyticsEvent } from '@/utils/analytics';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => `trans_${key}`,
  useLocale: () => 'en',
}));

vi.mock('@/utils/analytics', () => ({
  sendAnalyticsEvent: vi.fn(),
}));

describe('useHeroViewModel', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return translated content and socials', () => {
    const { result } = renderHook(() => useHeroViewModel());

    expect(result.current.greeting).toBe('trans_greeting');
    expect(result.current.socials).toHaveLength(3);
    expect(result.current.socials[0].label).toBe('LinkedIn');
  });

  it('should track CV download', () => {
    const { result } = renderHook(() => useHeroViewModel());

    result.current.handleDownloadCV();

    expect(sendAnalyticsEvent).toHaveBeenCalledWith('download_cv', {
      locale: 'en',
    });
  });

  it('should track social clicks', () => {
    const { result } = renderHook(() => useHeroViewModel());

    result.current.handleSocialClick('linkedin');

    expect(sendAnalyticsEvent).toHaveBeenCalledWith('click_social', {
      platform: 'linkedin',
    });
  });
});
