import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Work } from '../data/works';
import { sendGAEvent } from '@next/third-parties/google';

export const useWorkCardViewModel = (work: Work) => {
  const t = useTranslations('Works');
  const [isHovered, setIsHovered] = useState(false);
  const [isTapped, setIsTapped] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isActive = isHovered || isTapped;

  const handleTouchStart = () => {
    setIsTapped(true);
  };

  const handleTouchEnd = () => {
    setTimeout(() => {
      setIsModalOpen(true);
      setIsTapped(false);
    }, 200);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsTapped(false);
  };

  const handleClick = () => {
    setIsModalOpen(true);
    sendGAEvent('event', 'view_project', {
      event_category: 'content_interaction',
      event_label: work.title,
    });
  };

  const onCloseModal = () => {
    setIsModalOpen(false);
  };

  const projectName = t.has(`projects.${work.id}.name`)
    ? t(`projects.${work.id}.name`)
    : work.title;

  return {
    isActive,
    isModalOpen,
    projectName,
    handleTouchStart,
    handleTouchEnd,
    handleMouseEnter,
    handleMouseLeave,
    handleClick,
    onCloseModal,
  };
};
