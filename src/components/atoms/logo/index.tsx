import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const logoVariants = cva('font-graffiti', {
  variants: {
    variant: {
      default: 'text-white',
      secondary: 'text-black',
    },
    size: {
      default: 'text-4xl',
      sm: 'text-2xl',
      lg: 'text-6xl',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

export function Logo({
  className,
  variant = 'default',
  size = 'default',
  ...props
}: React.ComponentProps<'button'> & VariantProps<typeof logoVariants>) {
  return (
    <span
      data-variant={variant}
      data-size={size}
      className={cn(logoVariants({ variant, size, className }))}
      {...props}
    >
      BC
    </span>
  );
}
