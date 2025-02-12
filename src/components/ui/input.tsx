import { ComponentProps, InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement>, ComponentProps<'input'> {}

const Input = ({ className, type, ...props }: InputProps) => (
  <input
    type={type}
    className={cn('rounded-md border-2', className)}
    {...props}
  />
);

Input.displayName = 'Input';

export { Input };
