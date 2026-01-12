'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Work } from '../data/works';
import { WaveText } from './WaveText';

interface WorkCardProps {
  work: Work;
}

export function WorkCard({ work }: WorkCardProps) {
  const t = useTranslations('Works');
  const [isHovered, setIsHovered] = useState(false);
  const [isTapped, setIsTapped] = useState(false);

  const isActive = isHovered || isTapped;

  const handleTouchStart = () => {
    if (isTapped) {
      window.location.href = work.link;
    } else {
      setIsTapped(true);
    }
  };

  const handleTouchEnd = () => {};

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsTapped(false);
  };

  const handleClick = () => {
    if (window.innerWidth >= 768) {
      window.location.href = work.link;
    }
  };

  const projectName = t.has(`projects.${work.id}.name`)
    ? t(`projects.${work.id}.name`)
    : work.title;

  return (
    <div
      className="group cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={handleClick}
    >
      <div className="mb-3">
        <p className="text-base text-zinc-400 font-light pb-2">
          {work.subtitle}
        </p>
      </div>

      <div className="relative overflow-hidden rounded-lg aspect-16/10">
        <Image
          src={work.image}
          alt={work.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div
          className="absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity duration-300"
          style={{ opacity: isActive ? 1 : 0 }}
        >
          <span className="text-2xl md:text-3xl font-medium text-white">
            <WaveText text={projectName} isActive={isActive} />
          </span>
        </div>
      </div>
    </div>
  );
}
