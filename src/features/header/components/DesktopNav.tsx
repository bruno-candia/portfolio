'use client';

import { useSidebarViewModel } from '../hooks/useSidebarViewModel';

export function DesktopNav() {
  const { menuItems, handleNavClick } = useSidebarViewModel();

  return (
    <nav className="hidden items-center gap-8 md:flex">
      {menuItems.map((item) => (
        <a
          key={item.id}
          href={item.href}
          className="ds-small text-ink-2 transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
          onClick={() => handleNavClick(item.id)}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}
