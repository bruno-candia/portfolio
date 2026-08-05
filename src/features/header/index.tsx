import { Logo } from '@/components/atoms/logo';
import { Sidebar } from './components/sidebar';
import { DesktopNav } from './components/DesktopNav';
import { LanguageSwitcher } from './components/LanguageSwitcher';

/**
 * `sticky` and the background are behaviour, not decoration: a static frame
 * cannot show both states. The frame has a transparent header because nothing
 * scrolls under it there — here the page does, so the bar carries the page
 * background. Against pure black it is invisible at rest, which is what the
 * design shows.
 */
export function Header() {
  return (
    <>
      <header className="group/header sticky top-0 z-50 w-full bg-bg">
        <div className="mx-auto flex h-[104px] w-full max-w-page items-center justify-between px-5 md:px-8">
          <Logo />

          <DesktopNav />

          <div className="md:hidden">
            <Sidebar.Root>
              <Sidebar.Toggle />
              <Sidebar.Content />
            </Sidebar.Root>
          </div>
        </div>
      </header>

      <LanguageSwitcher />
    </>
  );
}
