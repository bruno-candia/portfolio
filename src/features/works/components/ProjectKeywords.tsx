'use client';

import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

import { fittedKeywordCount, hiddenKeywordCount } from '../lib/project-card';

const chipClassName =
  'shrink-0 whitespace-nowrap rounded-sm border border-line bg-surface px-[9px] py-[5px] ds-mono-label text-ink-2';

export function ProjectKeywords({
  keywords,
  cardKeywords,
}: {
  keywords: string[];
  cardKeywords: string[];
}) {
  const t = useTranslations('Works');
  const listRef = useRef<HTMLUListElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const [measuredCount, setMeasuredCount] = useState<number | null>(null);

  const measure = useCallback(() => {
    const list = listRef.current;
    const measureRow = measureRef.current;
    if (!list || !measureRow || list.clientWidth === 0) return;

    const rightEdges = Array.from(measureRow.children, (chip) => {
      const element = chip as HTMLElement;
      return element.offsetLeft + element.offsetWidth;
    });

    setMeasuredCount(fittedKeywordCount(rightEdges, list.clientWidth));
  }, []);

  useLayoutEffect(() => {
    const observer = new ResizeObserver(measure);
    if (listRef.current) observer.observe(listRef.current);

    let active = true;
    void document.fonts.ready.then(() => {
      if (active) measure();
    });

    return () => {
      active = false;
      observer.disconnect();
    };
  }, [measure]);

  const shownCount = measuredCount ?? cardKeywords.length;
  const shownKeywords = cardKeywords.slice(0, shownCount);
  const hidden = hiddenKeywordCount(keywords.length, shownKeywords.length);

  if (keywords.length === 0) return null;

  return (
    <div className="relative mt-auto pt-[21px] md:pt-6">
      <div
        ref={measureRef}
        aria-hidden="true"
        className="invisible absolute left-0 top-0 flex w-max gap-1.5"
      >
        {cardKeywords.map((keyword) => (
          <span key={keyword} className={chipClassName}>
            {keyword}
          </span>
        ))}
      </div>

      <ul ref={listRef} className="flex flex-wrap gap-1.5">
        {shownKeywords.map((keyword) => (
          <li key={keyword} className={chipClassName}>
            {keyword}
          </li>
        ))}
        {hidden > 0 && (
          <li
            aria-label={t('moreTechnologies', { count: hidden })}
            className={chipClassName}
          >
            +{hidden}
          </li>
        )}
      </ul>
    </div>
  );
}
