import * as Dialog from '@radix-ui/react-dialog';
import React, { ReactNode } from 'react';

interface RootProps {
  children: ReactNode;
}

export function Root({ children }: RootProps) {
  return <Dialog.Root>{children}</Dialog.Root>;
}
