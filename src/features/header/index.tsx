import { Logo } from '@/components/atoms/logo';
import { pageContent } from '@/components/atoms/page';
import { cn } from '@/lib/utils';
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
        <div
          className={cn(
            pageContent,
            'flex h-[104px] items-center justify-between'
          )}
        >
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
