'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="h-[80vh] w-full flex flex-col items-center justify-center p-4 text-center">
      <div className="space-y-6 max-w-lg">
        <h2 className="text-6xl md:text-8xl font-black text-red-600 tracking-tighter opacity-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 select-none">
          ERROR
        </h2>

        <h3 className="text-3xl font-bold text-white uppercase tracking-widest">
          Critical Malfunction
        </h3>

        <p className="text-zinc-400">
          We encountered an unexpected anomaly. The system has logged this
          event.
        </p>

        <div className="pt-8 space-x-4">
          <button
            onClick={reset}
            className="px-6 py-3 bg-white text-black font-bold uppercase tracking-wider hover:bg-zinc-200 transition-colors"
          >
            Reboot System
          </button>
        </div>
      </div>
    </div>
  );
}
