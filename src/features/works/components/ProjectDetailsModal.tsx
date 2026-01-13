'use client';

import * as Dialog from '@radix-ui/react-dialog';

import { X, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

interface ProjectDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    id: string;
    title: string;
    subtitle: string;
    image: string;
    tags: string[];
    link?: string;
  };
}

export function ProjectDetailsModal({
  isOpen,
  onClose,
  project,
}: ProjectDetailsModalProps) {
  const t = useTranslations(`Works.projects.${project.id}`);

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 z-50" />
        <Dialog.Content className="fixed z-50 grid gap-4 bg-zinc-950 p-6 shadow-xl duration-200 border-zinc-800 w-full overflow-y-auto data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 bottom-0 left-0 max-h-[90vh] rounded-t-2xl border-t data-[state=closed]:slide-out-to-bottom-full data-[state=open]:slide-in-from-bottom-full md:bottom-auto md:left-[50%] md:top-[50%] md:max-w-3xl md:translate-x-[-50%] md:translate-y-[-50%] md:rounded-lg md:border md:max-h-[85vh] md:data-[state=closed]:zoom-out-95 md:data-[state=open]:zoom-in-95 md:data-[state=closed]:slide-out-to-bottom-0 md:data-[state=open]:slide-in-from-bottom-0">
          <div className="flex justify-end w-full">
            <Dialog.Close className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground text-white">
              <X className="h-6 w-6" />
              <span className="sr-only">Close</span>
            </Dialog.Close>
          </div>

          <div className="flex flex-col gap-6">
            <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-zinc-800">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <Dialog.Title className="text-2xl font-semibold text-white">
                  {project.title}
                </Dialog.Title>
                <Dialog.Description className="text-zinc-400 mt-1">
                  {project.subtitle}
                </Dialog.Description>
              </div>

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs text-zinc-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="text-zinc-300 text-sm md:text-base">
                {t.rich('description', {
                  p: (chunks) => (
                    <p className="leading-relaxed mb-4">{chunks}</p>
                  ),
                  h: (chunks) => (
                    <h3 className="text-lg font-semibold text-white mt-8 mb-3 block">
                      {chunks}
                    </h3>
                  ),
                  b: (chunks) => (
                    <strong className="font-medium text-zinc-100">
                      {chunks}
                    </strong>
                  ),
                  ul: (chunks) => (
                    <ul className="flex flex-col gap-2 mb-4 pl-4">{chunks}</ul>
                  ),
                  li: (chunks) => (
                    <li className="list-disc marker:text-zinc-600 pl-1">
                      {chunks}
                    </li>
                  ),
                  spacer: () => <div className="h-6" />,
                })}
              </div>

              {project.link && (
                <div className="pt-4">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-white hover:text-zinc-300 transition-colors text-sm font-medium border-b border-white/20 hover:border-white pb-0.5"
                  >
                    Saiba mais sobre o projeto
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              )}
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
