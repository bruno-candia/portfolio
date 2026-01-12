/* eslint-disable @typescript-eslint/no-require-imports */
'use client';

import { useEffect, useRef, isValidElement, ReactNode } from 'react';
import { Prism } from 'prism-react-renderer';
import gsap from 'gsap';

type GlobalWithPrism = {
  Prism?: typeof Prism;
};

if (typeof global !== 'undefined' || typeof window !== 'undefined') {
  const globalScope = (typeof global !== 'undefined'
    ? global
    : window) as unknown as GlobalWithPrism;
  if (!globalScope.Prism) {
    globalScope.Prism = Prism;
    require('prismjs/components/prism-java');
    require('prismjs/components/prism-kotlin');
    require('prismjs/components/prism-swift');
    require('prismjs/components/prism-sql');
    require('prismjs/components/prism-yaml');
    require('prismjs/components/prism-python');
  }
}

interface UseCodeTerminalProps {
  icon?: ReactNode;
  title?: string;
  code: string;
}

export function useCodeTerminal({ icon, title, code }: UseCodeTerminalProps) {
  const iconRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLSpanElement>(null);
  const codeRef = useRef<HTMLPreElement>(null);

  const iconKey = isValidElement(icon) ? icon.type : icon;

  useEffect(() => {
    if (iconRef.current) {
      gsap.killTweensOf(iconRef.current);
      gsap.fromTo(
        iconRef.current,
        { scale: 0 },
        { scale: 1, duration: 0.4, ease: 'back.out(2)' }
      );
    }
  }, [iconKey]);

  useEffect(() => {
    if (titleRef.current) {
      gsap.killTweensOf(titleRef.current);
      gsap.fromTo(
        titleRef.current,
        { opacity: 0.3, y: 5 },
        { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
      );
    }
  }, [title]);

  useEffect(() => {
    if (codeRef.current) {
      gsap.killTweensOf(codeRef.current);
      gsap.fromTo(
        codeRef.current,
        { opacity: 0.3 },
        { opacity: 1, duration: 0.3, ease: 'power2.out' }
      );
    }
  }, [code]);

  return {
    iconRef,
    titleRef,
    codeRef,
  };
}
