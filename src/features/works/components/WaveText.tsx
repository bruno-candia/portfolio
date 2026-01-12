'use client';

interface WaveTextProps {
  text: string;
  isActive: boolean;
  className?: string;
  letterDelay?: number;
}

export function WaveText({
  text,
  isActive,
  className = '',
  letterDelay = 40,
}: WaveTextProps) {
  const letters = text.split('');
  const totalLetters = letters.length;

  return (
    <span className={`inline-flex overflow-hidden ${className}`}>
      {letters.map((letter, index) => {
        const enterDelay = index * letterDelay;
        const exitDelay = (totalLetters - 1 - index) * letterDelay;

        return (
          <span
            key={index}
            className="inline-block transition-transform duration-300 ease-out"
            style={{
              transform: isActive ? 'translateY(0)' : 'translateY(100%)',
              transitionDelay: isActive ? `${enterDelay}ms` : `${exitDelay}ms`,
            }}
          >
            {letter === ' ' ? '\u00A0' : letter}
          </span>
        );
      })}
    </span>
  );
}
