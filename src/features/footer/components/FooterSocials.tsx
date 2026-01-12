'use client';

import { Github, Linkedin, Instagram, Twitter } from 'lucide-react';

export function FooterSocials() {
  const socials = [
    { label: 'X', href: '#', icon: Twitter },
    { label: 'Instagram', href: '#', icon: Instagram },
    { label: 'LinkedIn', href: '#', icon: Linkedin },
    { label: 'GitHub', href: '#', icon: Github },
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
