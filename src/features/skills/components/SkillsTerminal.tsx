'use client';

import { Highlight, themes } from 'prism-react-renderer';

const FALLBACK = `type Result<T, E> =
  | { ok: true; value: T }
  | { ok: false; error: E };`;

export function SkillsTerminal({
  fileName,
  code,
  language = 'ts',
  className,
}: {
  fileName: string;
  code?: string;
  language?: string;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col overflow-hidden rounded-xl border border-line bg-code-bg ${className ?? ''}`}
    >
      <div className="flex items-center gap-2.5 border-b border-line px-4.5 py-3">
        <span aria-hidden className="size-2 rounded-full bg-line-hard" />
        <span aria-hidden className="size-2 rounded-full bg-line-strong" />
        <span aria-hidden className="size-2 rounded-full bg-line-strong" />
        <span className="ml-2.5 ds-mono-label text-ink-2">{fileName}</span>
      </div>

      <div
        className="grow overflow-auto px-5 py-5"
        // eslint-disable-next-line jsx-a11y-x/no-noninteractive-tabindex
        tabIndex={0}
        role="region"
        aria-label={fileName}
      >
        <Highlight
          theme={themes.vsDark}
          code={code ?? FALLBACK}
          language={language}
        >
          {({ tokens, getLineProps, getTokenProps }) => (
            <pre className="ds-mono bg-transparent whitespace-pre">
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
  );
}
