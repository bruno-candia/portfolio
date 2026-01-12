import { ReactNode, RefObject } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface ShowcaseContainerProps {
  children: ReactNode;
  containerRef: RefObject<HTMLDivElement | null>;
  className?: string;
}

export const ShowcaseContainer = ({
  children,
  containerRef,
  className,
}: ShowcaseContainerProps) => {
  return (
    <div
      ref={containerRef}
      className={cn(
        'relative w-full h-[300px] md:h-full overflow-hidden rounded-2xl bg-zinc-900 shadow-2xl group border border-zinc-800',
        className
      )}
    >
      {children}
    </div>
  );
};

export const ShowcaseOverlay = () => {
  return (
    <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-transparent to-transparent z-10 opacity-60" />
  );
};

export const ShowcaseGlowEffect = () => {
  return (
    <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-20 pointer-events-none" />
  );
};

interface ShowcaseImageProps {
  src: string;
  alt: string;
  imageRef: RefObject<HTMLImageElement | null>;
}

export const ShowcaseImage = ({ src, alt, imageRef }: ShowcaseImageProps) => {
  return (
    <Image
      ref={imageRef}
      src={src}
      alt={alt}
      fill
      className="object-cover object-center w-full h-full"
      priority
      sizes="(max-width: 768px) 100vw, 50vw"
    />
  );
};

interface ShowcaseLabelProps {
  title: string;
}

export const ShowcaseLabel = ({ title }: ShowcaseLabelProps) => {
  return (
    <div className="absolute bottom-6 left-6 z-20 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
      <div className="flex items-center gap-2 mb-2">
        <span className="h-1 w-8 bg-primary rounded-full"></span>
        <span className="text-zinc-300 text-xs font-mono uppercase tracking-widest">
          Showcase
        </span>
      </div>
      <h3 className="text-2xl font-bold text-white capitalize">{title}</h3>
    </div>
  );
};
