export default async function Loading() {
  const text = 'Hello World';

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-black fixed inset-0 z-[9999]">
      <div className="flex items-center gap-1 overflow-hidden">
        {text.split('').map((char, index) => (
          <span
            key={index}
            className="text-4xl md:text-6xl text-white font-normal animate-wave-text inline-block transform will-change-transform"
            style={{
              animationDelay: `${index * 0.1}s`,
              fontFamily: 'var(--font-cabinet-grotesk), sans-serif',
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </div>
    </div>
  );
}
