import { Logo } from '@/components/atoms/logo';
import { Sidebar } from './components/sidebar';
import { DesktopNav } from './components/DesktopNav';
import { LanguageSwitcher } from './components/LanguageSwitcher';

export function Header() {
  return (
    <>
      <header className="absolute top-0 left-0 w-full flex justify-center items-center z-50">
        <div className="w-full max-w-[1080px] flex justify-between items-center p-6 md:py-10">
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
