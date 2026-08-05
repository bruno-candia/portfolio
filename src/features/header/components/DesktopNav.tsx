'use client';

import { useSidebarViewModel } from '../hooks/useSidebarViewModel';

export function DesktopNav({
  onOpenAccessibility,
  accessibilityLabel,
}: {
  onOpenAccessibility: (trigger: HTMLButtonElement) => void;
  accessibilityLabel: string;
}) {
  const { menuItems, handleNavClick } = useSidebarViewModel();

  return (
    <div className="hidden items-center gap-4 md:flex">
      <nav className="flex items-center gap-8">
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

      <button
        type="button"
        onClick={(event) => onOpenAccessibility(event.currentTarget)}
        data-accessibility-trigger
        aria-label={accessibilityLabel}
        title={accessibilityLabel}
        className="inline-flex size-11 items-center justify-center rounded-[10px] border border-ink-3 text-[13px]/[18px] font-medium text-ink transition-colors hover:bg-surface-hi"
      >
        Aa
      </button>
    </div>
  );
}
