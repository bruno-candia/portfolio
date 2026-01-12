'use client';

import { forwardRef } from 'react';

interface TerminalHeaderProps {
  title: string;
}

export const TerminalHeader = forwardRef<HTMLSpanElement, TerminalHeaderProps>(
  ({ title }, ref) => {
    return (
      <header className="h-9 flex items-center justify-between px-4 border-b border-zinc-800 bg-zinc-900/50">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#EE6D5E]" />
          <div className="w-3 h-3 rounded-full bg-[#F3BF4A]" />
          <div className="w-3 h-3 rounded-full bg-[#5DC753]" />
        </div>
        <span
          ref={ref}
          className="text-xs text-zinc-500 font-mono truncate max-w-full"
        >
          {title}
        </span>
        <div className="w-14 shrink-0" />
      </header>
    );
  }
);

TerminalHeader.displayName = 'TerminalHeader';
