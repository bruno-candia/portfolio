'use client';

import { forwardRef, ReactNode } from 'react';

interface TerminalIconProps {
  icon: ReactNode;
  iconColor: string;
}

export const TerminalIcon = forwardRef<HTMLDivElement, TerminalIconProps>(
  ({ icon, iconColor }, ref) => {
    return (
      <div className="flex flex-col items-center mb-4">
        <div
          className="w-14 h-14 rounded-xl border border-zinc-800 flex items-center justify-center transition-colors duration-300"
          style={{
            backgroundColor: `${iconColor}20`,
            borderColor: `${iconColor}40`,
            color: iconColor,
            boxShadow: `0 0 20px -5px ${iconColor}40`,
          }}
        >
          <div ref={ref} className="text-2xl flex items-center justify-center">
            {icon}
          </div>
        </div>
        <div className="w-0.5 h-8 bg-zinc-800" />
      </div>
    );
  }
);

TerminalIcon.displayName = 'TerminalIcon';
