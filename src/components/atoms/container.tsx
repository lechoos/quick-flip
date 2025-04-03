import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
};

export const Container = ({ children, className }: Props) => {
  return <section className={`mt-10 sm:mt-[14rem] mx-auto w-full max-w-[1200px] ${className}`}>{children}</section>;
};
