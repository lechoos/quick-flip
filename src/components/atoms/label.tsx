import { ReactNode } from 'react';

type Props = {
  htmlFor: string;
  children: ReactNode;
  className?: string;
};

export const Label = ({ htmlFor, className, children }: Props) => (
  <label
    htmlFor={htmlFor}
    className={className}
  >
    {children}
  </label>
);
