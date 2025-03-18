import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type Props = HTMLAttributes<HTMLDivElement>;

const Card = ({ className, ...props }: Props) => (
  <div
    className={cn('rounded-xl border-2 overflow-hidden', className)}
    {...props}
  />
);
Card.displayName = 'Card';

const CardHeader = ({ className, ...props }: Props) => (
  <div
    className={cn('flex flex-col space-y-1.5 p-2', className)}
    {...props}
  />
);
CardHeader.displayName = 'CardHeader';

const CardTitle = ({ className, ...props }: Props) => (
  <div
    className={cn('font-semibold leading-none' + ' tracking-tight', className)}
    {...props}
  />
);
CardTitle.displayName = 'CardTitle';

const CardDescription = ({ className, ...props }: Props) => (
  <div
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
);
CardDescription.displayName = 'CardDescription';

const CardContent = ({ className, ...props }: Props) => (
  <div
    className={cn('p-2 pt-0', className)}
    {...props}
  />
);
CardContent.displayName = 'CardContent';

const CardFooter = ({ className, ...props }: Props) => (
  <div
    className={cn('flex items-center p-2 pt-0', className)}
    {...props}
  />
);
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
