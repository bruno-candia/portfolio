'use client';

import { Github, Linkedin } from 'lucide-react';
import { FaBehance } from 'react-icons/fa';
import { sendGAEvent } from '@next/third-parties/google';

interface SocialLink {
  label: string;
  href: string;
  icon: string;
}

const SOCIALS: SocialLink[] = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/bruno-costa-candia/',
    icon: 'linkedin',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/bruno-candia',
    icon: 'github',
  },
  {
    label: 'Behance',
    href: 'https://www.behance.net/brunocostac3',
    icon: 'behance',
  },
];

export function HeroSocials() {
  const handleSocialClick = (network: string) => {
    sendGAEvent('event', 'click_social', {
      event_category: 'engagement',
      event_label: network,
    });
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'linkedin':
        return <Linkedin size={24} />;
      case 'behance':
        return <FaBehance size={24} />;
      case 'github':
        return <Github size={24} />;
      default:
        return null;
    }
  };

  return (
    <div className="absolute bottom-10 left-10 flex flex-col gap-6 z-10">
      {SOCIALS.map((social) => (
        <a
          key={social.label}
          href={social.href}
          className="text-white hover:text-gray-400 transition-colors"
          aria-label={social.label}
          onClick={() => handleSocialClick(social.label)}
          target="_blank"
          rel="noopener noreferrer"
        >
          {getIcon(social.icon)}
        </a>
      ))}
    </div>
  );
}
