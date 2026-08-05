'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { useEffect, useId, useRef, useState } from 'react';
import { PiXBold } from 'react-icons/pi';
import { useTranslations } from 'next-intl';
import { Logo } from '@/components/atoms/logo';
import { pageContent } from '@/components/atoms/page';
import { cn } from '@/lib/utils';
import { Sidebar } from './components/sidebar';
import { DesktopNav } from './components/DesktopNav';
import { LanguageSwitcher } from './components/LanguageSwitcher';

const STORAGE_KEY = 'portfolio-accessibility-preferences';
const PREFERENCES_EVENT = 'accessibility-preferences-change';

type TextScale = '100' | '125' | '150' | '175' | '200';
type MotionPreference = 'system' | 'reduced';
type ReadingFont = 'standard' | 'alternative';
type ContrastPreference = 'standard' | 'high';

interface AccessibilityPreferences {
  textScale: TextScale;
  motion: MotionPreference;
  readingFont: ReadingFont;
  contrast: ContrastPreference;
}

const DEFAULT_PREFERENCES: AccessibilityPreferences = {
  textScale: '100',
  motion: 'system',
  readingFont: 'standard',
  contrast: 'standard',
};

const textScales: TextScale[] = ['100', '125', '150', '175', '200'];

function isPreferences(value: unknown): value is AccessibilityPreferences {
  if (!value || typeof value !== 'object') return false;
  const candidate = value as Record<string, unknown>;
  return (
    textScales.includes(candidate.textScale as TextScale) &&
    ['system', 'reduced'].includes(candidate.motion as string) &&
    ['standard', 'alternative'].includes(candidate.readingFont as string) &&
    ['standard', 'high'].includes(candidate.contrast as string)
  );
}

function applyPreferences(preferences: AccessibilityPreferences) {
  const root = document.documentElement;
  root.dataset.textScale = preferences.textScale;
  root.dataset.motion = preferences.motion;
  root.dataset.readingFont = preferences.readingFont;
  root.dataset.contrast = preferences.contrast;
  window.dispatchEvent(
    new CustomEvent(PREFERENCES_EVENT, { detail: preferences })
  );
}

function readPreferences(): AccessibilityPreferences {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const parsed: unknown = stored ? JSON.parse(stored) : null;
    return isPreferences(parsed) ? parsed : DEFAULT_PREFERENCES;
  } catch {
    return DEFAULT_PREFERENCES;
  }
}

function SegmentedPreference<T extends string>({
  label,
  description,
  value,
  options,
  onChange,
}: {
  label: string;
  description: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (value: T) => void;
}) {
  const id = useId();

  return (
    <fieldset>
      <legend className="text-sm/[20px] font-medium text-ink md:text-[15px]/[22px]">
        {label}
      </legend>
      <p
        id={`${id}-description`}
        className="mt-0.5 text-xs/[18px] text-ink-2 md:text-[13px]/[19px]"
      >
        {description}
      </p>
      <div
        className="mt-2.5 grid h-[52px] gap-1 rounded-[10px] border border-ink-3 bg-inset p-1"
        style={{
          gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))`,
        }}
      >
        {options.map((option) => (
          <label
            key={option.value}
            className="relative flex h-11 min-w-0 cursor-pointer items-center justify-center rounded-[7px] px-2 text-[13px]/[18px] font-medium text-ink-2 transition-colors has-[:checked]:bg-ink has-[:checked]:font-bold has-[:checked]:text-ink-inverse has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ink md:has-[:checked]:font-medium"
          >
            <input
              type="radio"
              name={id}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              aria-describedby={`${id}-description`}
              className="absolute inset-0 cursor-pointer opacity-0"
            />
            {option.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function AccessibilityDialog({
  open,
  onOpenChange,
  onReturnFocus,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onReturnFocus: () => void;
}) {
  const t = useTranslations('Accessibility');
  const [preferences, setPreferences] =
    useState<AccessibilityPreferences>(DEFAULT_PREFERENCES);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const stored = readPreferences();
      setPreferences(stored);
      applyPreferences(stored);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const update = <K extends keyof AccessibilityPreferences>(
    key: K,
    value: AccessibilityPreferences[K]
  ) => {
    const next = { ...preferences, [key]: value };
    setPreferences(next);
    applyPreferences(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // The preference still applies for this visit when storage is blocked.
    }
  };

  const reset = () => {
    setPreferences(DEFAULT_PREFERENCES);
    applyPreferences(DEFAULT_PREFERENCES);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // The defaults still apply for this visit when storage is blocked.
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[110] bg-black/75" />
        <Dialog.Content
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            onReturnFocus();
          }}
          className="fixed z-[120] flex flex-col overflow-hidden bg-surface text-ink focus:outline-none max-md:inset-0 max-md:h-dvh md:left-1/2 md:top-1/2 md:h-[684px] md:w-[620px] md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-[14px] md:border md:border-ink-3 md:shadow-[0_24px_64px_rgba(0,0,0,0.45)]"
        >
          <Dialog.Title className="sr-only">{t('title')}</Dialog.Title>
          <Dialog.Description className="sr-only">
            {t('description')}
          </Dialog.Description>

          {/* Aria-hidden: the dialog already announces the same words. */}
          <div className="flex h-16 shrink-0 items-center justify-between gap-4 border-b border-line px-5 py-3 md:h-[84px] md:px-6 md:pt-6 md:pb-5">
            <div>
              <h2
                aria-hidden
                className="text-lg/[24px] font-bold md:text-[22px]/[28px] md:font-medium"
              >
                {t('title')}
              </h2>
              <p
                aria-hidden
                className="mt-1 hidden text-[13px]/[19px] text-ink-2 md:block"
              >
                {t('description')}
              </p>
            </div>
            <Dialog.Close asChild>
              <button
                type="button"
                aria-label={t('close')}
                className="inline-flex size-11 shrink-0 items-center justify-center rounded-[10px] border border-ink-3 text-ink transition-colors hover:bg-surface-hi"
              >
                <PiXBold aria-hidden size={28} />
              </button>
            </Dialog.Close>
          </div>

          <div className="flex-1 space-y-5 overflow-y-auto px-5 pt-5 pb-6 md:flex-none md:h-[524px] md:px-6">
            <SegmentedPreference
              label={t('textSize.title')}
              description={t('textSize.description')}
              value={preferences.textScale}
              options={textScales.map((scale) => ({
                value: scale,
                label: `${scale}%`,
              }))}
              onChange={(value) => update('textScale', value)}
            />
            <SegmentedPreference
              label={t('motion.title')}
              description={t('motion.description')}
              value={preferences.motion}
              options={[
                { value: 'system', label: t('motion.system') },
                { value: 'reduced', label: t('motion.reduced') },
              ]}
              onChange={(value) => update('motion', value)}
            />
            <SegmentedPreference
              label={t('readingFont.title')}
              description={t('readingFont.description')}
              value={preferences.readingFont}
              options={[
                { value: 'standard', label: t('standard') },
                { value: 'alternative', label: t('readingFont.alternative') },
              ]}
              onChange={(value) => update('readingFont', value)}
            />
            <SegmentedPreference
              label={t('contrast.title')}
              description={t('contrast.description')}
              value={preferences.contrast}
              options={[
                { value: 'standard', label: t('standard') },
                { value: 'high', label: t('contrast.high') },
              ]}
              onChange={(value) => update('contrast', value)}
            />
          </div>

          <div className="flex h-[72px] shrink-0 items-center justify-between border-t border-line px-5 py-[14px] md:px-6">
            <button
              type="button"
              onClick={reset}
              className="text-sm/[20px] font-bold text-ink-2 underline underline-offset-2 transition-colors hover:text-ink md:font-medium"
            >
              {t('reset')}
            </button>
            <Dialog.Close asChild>
              <button
                type="button"
                className="inline-flex h-11 w-[104px] items-center justify-center rounded-[10px] bg-ink text-sm/[20px] font-medium text-ink-inverse transition-colors hover:bg-white md:w-28"
              >
                {t('done')}
              </button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

/**
 * `sticky` and the background are behaviour, not decoration: a static frame
 * cannot show both states. The frame has a transparent header because nothing
 * scrolls under it there. Here the page does, so the bar carries the page
 * background. Against pure black it is invisible at rest, which is what the
 * design shows.
 */
export function Header() {
  const t = useTranslations('Accessibility');
  const [accessibilityOpen, setAccessibilityOpen] = useState(false);
  const accessibilityTrigger = useRef<HTMLElement | null>(null);

  const openAccessibility = (trigger: HTMLElement) => {
    accessibilityTrigger.current = trigger;
    setAccessibilityOpen(true);
  };

  const returnAccessibilityFocus = () => {
    const fallback = document.querySelector<HTMLElement>(
      window.matchMedia('(min-width: 768px)').matches
        ? '[data-accessibility-trigger]'
        : '[data-sidebar-trigger]'
    );
    const target = accessibilityTrigger.current?.isConnected
      ? accessibilityTrigger.current
      : fallback;
    target?.focus();
    accessibilityTrigger.current = null;
  };

  return (
    <>
      <header className="group/header sticky top-0 z-50 w-full bg-bg">
        <div
          className={cn(
            pageContent,
            'flex h-[104px] items-center justify-between'
          )}
        >
          <Logo />

          <DesktopNav
            onOpenAccessibility={openAccessibility}
            accessibilityLabel={t('open')}
          />

          <div className="md:hidden">
            <Sidebar.Root>
              <Sidebar.Toggle />
              <Sidebar.Content onOpenAccessibility={openAccessibility} />
            </Sidebar.Root>
          </div>
        </div>
      </header>

      <LanguageSwitcher />
      <AccessibilityDialog
        open={accessibilityOpen}
        onOpenChange={setAccessibilityOpen}
        onReturnFocus={returnAccessibilityFocus}
      />
    </>
  );
}
