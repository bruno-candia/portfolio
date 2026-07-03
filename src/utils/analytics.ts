export const isTrackingEnabled = (): boolean => {
  if (typeof window === 'undefined') return false;

  const hostname = window.location.hostname;

  // Exclude localhost and local network IPs
  const isLocal =
    hostname === 'localhost' ||
    hostname === '127.0.0.1' ||
    hostname.startsWith('192.168.') ||
    hostname.startsWith('10.') ||
    hostname.startsWith('172.');

  // Exclude Vercel preview environments (not the production domain)
  const isVercelPreview =
    hostname.endsWith('.vercel.app') && hostname !== 'brunocandia.com';

  // Exclude automation/bots (webdriver)
  const isBot = typeof navigator !== 'undefined' && !!navigator.webdriver;

  return !isLocal && !isVercelPreview && !isBot;
};

export const sendGAEvent = (
  type: 'event',
  action: string,
  params?: Record<string, unknown>
) => {
  if (isTrackingEnabled() && typeof window !== 'undefined') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any;
    if (typeof w.gtag !== 'function') {
      w.dataLayer = w.dataLayer || [];
      w.gtag = (...args: unknown[]) => {
        w.dataLayer.push(args);
      };
    }

    if (params) {
      w.gtag(type, action, params);
    } else {
      w.gtag(type, action);
    }
  }
};
