import { Menu } from 'lucide-react';

export function Toggle() {
  return (
    <>
      <input type="checkbox" id="menu-toggle" className="peer hidden" />

      <label
        htmlFor="menu-toggle"
        className="border h-fit p-2 rounded-full bg-transparent shadow-xs hover:bg-accent hover:text-accent-foreground "
      >
        <Menu />
      </label>
    </>
  );
}
