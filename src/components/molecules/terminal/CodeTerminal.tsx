'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Highlight, themes } from 'prism-react-renderer';
import { useCodeTerminal } from './hooks/useCodeTerminal';
import { TerminalHeader } from './components/TerminalHeader';
import { TerminalIcon } from './components/TerminalIcon';

interface CodeTerminalProps {
  code: string;
  language: string;
  title?: string;
  icon?: ReactNode;
  iconColor?: string;
  className?: string;
}

export function CodeTerminal({
  code,
  language,
  title = 'Terminal',
  icon,
  iconColor = '#fff',
  className,
}: CodeTerminalProps) {
  const { iconRef, titleRef, codeRef } = useCodeTerminal({
    icon,
    title,
    code,
  });

  return (
    <div className={cn('flex flex-col', className)}>
      {icon && <TerminalIcon ref={iconRef} icon={icon} iconColor={iconColor} />}

      <div className="w-full max-w-full rounded-xl border border-zinc-800 bg-[#0d1117] overflow-hidden shadow-2xl">
        <TerminalHeader ref={titleRef} title={title} />

        <div className="p-4 overflow-x-auto overflow-y-auto max-h-[400px]">
          <Highlight theme={themes.vsDark} code={code} language={language}>
            {({
              className: _className,
              style,
              tokens,
              getLineProps,
              getTokenProps,
            }) => (
              <pre
                ref={codeRef}
                style={{
                  ...style,
                  backgroundColor: 'transparent',
                  fontFamily: 'var(--font-geist-mono), monospace',
                }}
                className="text-sm leading-relaxed whitespace-pre"
              >
                {tokens.map((line, i) => (
                  <div key={i} {...getLineProps({ line })}>
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token })} />
                    ))}
                  </div>
                ))}
              </pre>
            )}
          </Highlight>
        </div>
      </div>
    </div>
  );
}
