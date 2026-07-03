'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';
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

  return (
    <>
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            window.gtag = function(){window.dataLayer.push(arguments);}
            window.gtag('js', new Date());
            window.gtag('config', 'G-8M39HC0PEZ', {
              transport_url: '/ga'
            });
          `,
        }}
      />
      <Script
        id="gtag-load"
        strategy="afterInteractive"
        src="/gtm/gtag/js?id=G-8M39HC0PEZ"
      />
    </>
  );
}
