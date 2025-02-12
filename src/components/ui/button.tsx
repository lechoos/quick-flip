import react from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const addShadow = (color: string) => `border-2 border-${color}-border shadow-${color}-normal hover:-translate-y-[4px] hover:shadow-${color}-hover active:shadow-none active:translate-y-[4px]`;

const buttonVariants = cva('inline-flex items-center' + ' justify-center gap-2 whitespace-nowrap rounded-md text-base font-medium rounded-lg focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0', {
  variants: {
    variant: {
      default: `bg-primary text-primary-foreground ${addShadow('primary')}`,
      secondary: `bg-secondary text-secondary-foreground ${addShadow('secondary')}`,
      destructive: `bg-destructive text-destructive-foreground ${addShadow('destructive')}`,
      accent: `bg-accent text-accent-foreground ${addShadow('accent')}`,
      link: 'text-primary underline-offset-4 hover:underline',
      muted: 'bg-muted text-muted-foreground' + ' !cursor-not-allowed',
    },
    size: {
      default: 'h-6',
      sm: 'h-5 rounded-md px-1 text-xs',
      lg: 'h-8 rounded-md px-3',
      icon: 'h-4 aspect-square',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

export interface ButtonProps extends react.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = ({ className, variant, size, asChild = false, ...props }: ButtonProps) => {
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
