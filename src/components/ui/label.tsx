import { ReactNode } from 'react';

type LabelProps = {
  htmlFor: string;
  children: ReactNode;
};

export const Label = ({ htmlFor, children }: LabelProps) => <label htmlFor={htmlFor}>{children}</label>;
