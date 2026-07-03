'use client';

import { useEffect, useState } from 'react';
import { GoogleAnalytics } from '@next/third-parties/google';
import { isTrackingEnabled } from '@/utils/analytics';

export function SafeGoogleAnalytics() {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (isTrackingEnabled()) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShouldLoad(true);
    }
  }, []);

  if (!shouldLoad) return null;

  return <GoogleAnalytics gaId="G-8M39HC0PEZ" />;
}
