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

      <ProjectDetailsModal
        isOpen={isModalOpen}
        onClose={onCloseModal}
        project={work}
      />
    </>
  );
}
