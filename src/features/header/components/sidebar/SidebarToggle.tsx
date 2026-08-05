'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { Menu } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function Toggle() {
  const t = useTranslations('Sidebar');

  return (
    <Dialog.Trigger asChild>
      <button
        type="button"
        aria-label={t('openMenu')}
        data-sidebar-trigger
        className="inline-flex size-11 items-center justify-center text-ink transition-colors hover:text-ink-2"
      >
        <Menu aria-hidden />
      </button>
    </Dialog.Trigger>
  );
}
