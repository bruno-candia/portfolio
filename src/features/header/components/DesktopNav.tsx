'use client';

import { useSidebarViewModel } from '../hooks/useSidebarViewModel';

export function DesktopNav() {
  const { menuItems, handleNavClick } = useSidebarViewModel();

  return (
    <nav className="hidden md:flex items-center gap-8">
      {menuItems.map((item, index) => (
        <a
          key={index}
          href={item.href}
          className="text-white text-sm font-medium hover:text-zinc-400 transition-colors"
          onClick={() => handleNavClick(item.label)}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}
