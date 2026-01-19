import { renderHook } from '@testing-library/react';
import { useHeroViewModel } from './useHeroViewModel';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { sendGAEvent } from '@next/third-parties/google';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => `trans_${key}`,
}));

vi.mock('@next/third-parties/google', () => ({
  sendGAEvent: vi.fn(),
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

    expect(sendGAEvent).toHaveBeenCalledWith('event', 'download_cv', {
      event_category: 'engagement',
      event_label: 'CV Download',
      value: 1,
    });
  });

  it('should track social clicks', () => {
    const { result } = renderHook(() => useHeroViewModel());

    result.current.handleSocialClick('LinkedIn');

    expect(sendGAEvent).toHaveBeenCalledWith('event', 'click_social', {
      event_category: 'engagement',
      event_label: 'LinkedIn',
    });
  });
});
