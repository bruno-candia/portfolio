import { Github, Linkedin } from 'lucide-react';
import { FaBehance } from 'react-icons/fa';
import { useHeroViewModel } from '../hooks/useHeroViewModel';

export function HeroSocials() {
  const { socials, handleSocialClick } = useHeroViewModel();

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
      {socials.map((social) => (
        <a
          key={social.label}
          href={social.href}
          className="text-white hover:text-gray-400 transition-colors"
          aria-label={social.label}
          onClick={() => handleSocialClick(social.label)}
        >
          {getIcon(social.icon)}
        </a>
      ))}
    </div>
  );
}
