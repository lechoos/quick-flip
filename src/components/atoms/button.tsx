import react from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva('inline-flex items-center' + ' justify-center px-1 gap-2 whitespace-nowrap rounded-md text-base font-medium rounded-lg focus:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border-[3px] border-black shadow-button hover:-translate-y-[4px] hover:shadow-button-hover focus-visible:-translate-y-[4px] focus-visible:shadow-button-hover active:shadow-none active:translate-y-[4px]', {
  variants: {
    variant: {
      default: 'bg-primary text-primary-foreground',
      secondary: 'bg-secondary text-secondary-foreground',
      destructive: 'bg-destructive text-destructive-foreground',
      accent: 'bg-accent text-accent-foreground',
    },
    size: {
      default: 'h-6',
      sm: 'h-5 rounded-md px-1 text-xs',
      lg: 'h-8 text-xl rounded-md px-2',
      icon: 'h-4 aspect-square',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

export interface Props extends react.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = ({ className, variant, size, asChild = false, ...props }: Props) => {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
};
Button.displayName = 'Button';

export { Button, buttonVariants };
