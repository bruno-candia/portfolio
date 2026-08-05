import { Github, Linkedin } from 'lucide-react';
import { FaBehance } from 'react-icons/fa';
import type { Basics } from '@/lib/resume';

const icons = {
  LinkedIn: Linkedin,
  GitHub: Github,
  Behance: FaBehance,
};

interface FooterSocialsProps {
  profiles: Basics['profiles'];
}

export function FooterSocials({ profiles }: FooterSocialsProps) {
  const socials = profiles.filter(
    (profile): profile is typeof profile & { network: keyof typeof icons } =>
      profile.network in icons
  );

  return (
    <div className="mt-5 flex items-center gap-1 md:mt-0 md:justify-end">
      {socials.map((social) => {
        const Icon = icons[social.network];

        return (
          <a
            key={social.network}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex size-11 items-center justify-center text-ink-3 transition-colors hover:text-ink focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ink"
            aria-label={social.network}
          >
            <Icon aria-hidden size={20} strokeWidth={1.5} />
          </a>
        );
      })}
    </div>
  );
}
