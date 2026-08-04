import { Logo } from '@/components/atoms/logo';
import { Sidebar } from './components/sidebar';
import { DesktopNav } from './components/DesktopNav';
import { LanguageSwitcher } from './components/LanguageSwitcher';

/**
 * `sticky` and the hairline on scroll are behaviour, not decoration: a static
 * frame cannot show both states. At rest this matches the design exactly.
 */
export function Header() {
  return (
    <>
      <header className="group/header sticky top-0 z-50 w-full">
        <div className="mx-auto flex h-[104px] w-full max-w-page items-center justify-between px-5 md:px-0">
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
