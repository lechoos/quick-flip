import { ReactNode } from 'react';

type LabelProps = {
  htmlFor: string;
  children: ReactNode;
  className?: string;
};

export const Label = ({ htmlFor, className, children }: LabelProps) => (
  <label
    htmlFor={htmlFor}
    className={className}
  >
    {children}
  </label>
);
