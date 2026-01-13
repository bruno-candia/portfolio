'use client';

import { Github, Linkedin, Instagram } from 'lucide-react';
import { FaBehance } from 'react-icons/fa';

export function FooterSocials() {
  const socials = [
    {
      label: 'Behance',
      href: 'https://www.behance.net/brunocostac3',
      icon: FaBehance,
    },
    {
      label: 'Instagram',
      href: 'https://www.instagram.com/brunocandia/',
      icon: Instagram,
    },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/bruno-costa-candia/',
      icon: Linkedin,
    },
    { label: 'GitHub', href: 'https://github.com/bruno-candia', icon: Github },
  ];

  return (
    <div className="flex items-center gap-6">
      {socials.map((social) => (
        <a
          key={social.label}
          href={social.href}
          className="text-white hover:text-zinc-400 transition-colors"
          aria-label={social.label}
        >
          <social.icon size={20} strokeWidth={1.5} />
        </a>
      ))}
    </div>
  );
}
