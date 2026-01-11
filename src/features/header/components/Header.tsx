import { Logo } from '@/components/atoms/logo';
import { Sidebar } from '@/features/sidebar';

export function Header() {
  return (
    <div className={'flex h-100 w-svw justify-between'}>
      <Logo />
      <Sidebar.Root>
        <Sidebar.Toggle />
        <Sidebar.Content />
      </Sidebar.Root>
    </div>
  );
}
