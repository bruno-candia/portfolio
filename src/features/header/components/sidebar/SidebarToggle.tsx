import { Menu } from 'lucide-react';

export function Toggle() {
  return (
    <>
      <input type="checkbox" id="menu-toggle" className="peer hidden" />

      <label
        htmlFor="menu-toggle"
        aria-label="Abrir menu"
        className="inline-flex h-11 w-11 cursor-pointer items-center justify-center text-ink transition-colors hover:text-ink-2"
      >
        <Menu aria-hidden />
      </label>
    </>
  );
}
