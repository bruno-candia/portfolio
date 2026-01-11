import { Logo } from '@/components/atoms/logo';
import { Sidebar } from '@/features/sidebar';

export function Header() {
  return (
    <div
      className={
        'absolute top-0 left-0 w-full flex justify-between items-center p-6 md:p-10 z-50'
      }
    >
      <Logo />
      <Sidebar.Root>
        <Sidebar.Toggle />
        <Sidebar.Content />
      </Sidebar.Root>
    </div>
  );
}
