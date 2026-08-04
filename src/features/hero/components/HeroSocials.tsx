import { Github, Linkedin } from 'lucide-react';
import { FaBehance } from 'react-icons/fa';
import { useHeroViewModel } from '../hooks/useHeroViewModel';

const ICONS = {
  linkedin: Linkedin,
  github: Github,
  behance: FaBehance,
} as const;

/** Vertical on desktop, horizontal on mobile where the fold has no height to spare. */
export function HeroSocials() {
  const { socials, handleSocialClick } = useHeroViewModel();

  return (
    <ul className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-row gap-6 md:left-10 md:translate-x-0 md:flex-col">
      {socials.map((social) => {
        const Icon = ICONS[social.icon as keyof typeof ICONS];
        return (
          <li key={social.label}>
            <a
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              onClick={() => handleSocialClick(social.platform)}
              className="inline-flex text-ink transition-colors hover:text-ink-3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
            >
              <Icon size={24} aria-hidden />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
