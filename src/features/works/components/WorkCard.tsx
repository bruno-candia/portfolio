'use client';

import Image from 'next/image';
import { Work } from '../data/works';
import { WaveText } from './WaveText';
import { ProjectDetailsModal } from './ProjectDetailsModal';
import { useWorkCardViewModel } from '../hooks/useWorkCardViewModel';

interface WorkCardProps {
  work: Work;
}

export function WorkCard({ work }: WorkCardProps) {
  const {
    isActive,
    isModalOpen,
    projectName,
    handleTouchStart,
    handleTouchEnd,
    handleMouseEnter,
    handleMouseLeave,
    handleClick,
    onCloseModal,
  } = useWorkCardViewModel(work);

  return (
    <>
      <button
        type="button"
        aria-haspopup="dialog"
        aria-expanded={isModalOpen}
        className="group block w-full cursor-pointer border-0 bg-transparent p-0 text-left"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onClick={handleClick}
      >
        <span className="mb-3 block">
          <span className="block pb-2 text-base font-light text-zinc-400">
            {work.subtitle}
          </span>
        </span>

        <span className="relative block overflow-hidden rounded-lg aspect-16/10">
          <Image
            src={work.image}
            alt={work.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          <span
            className="absolute inset-0 flex items-center justify-center bg-black/50 transition-opacity duration-300"
            style={{ opacity: isActive ? 1 : 0 }}
          >
            <span className="text-2xl md:text-3xl font-medium text-white">
              <WaveText text={projectName} isActive={isActive} />
            </span>
          </span>
        </span>
      </button>

      <ProjectDetailsModal
        isOpen={isModalOpen}
        onClose={onCloseModal}
        project={work}
      />
    </>
  );
}
