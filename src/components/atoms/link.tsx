import NextLink from 'next/link';
import { ReactNode } from 'react';

type LinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

export const Link = ({ href, children, className }: LinkProps) => {
  return (
    <NextLink
      href={{ pathname: href }}
      className={`hover:underline ${className}`}
    >
      {children}
    </NextLink>
  );
};
