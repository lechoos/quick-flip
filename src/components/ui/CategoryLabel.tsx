import { ElementType, ReactNode } from 'react';
import Link from 'next/link';

type CategoryLabelProps = {
  children: ReactNode;
  Icon: ElementType;
  variant?: 'primary' | 'secondary' | 'accent' | 'destructive';
  href: string;
};

export const CategoryLabel = ({ children, Icon, variant = 'destructive', href }: CategoryLabelProps) => {
  return (
    <Link
      href={{ pathname: href }}
      className={`relative inline-block p-2 min-w-24 font-anonymous-pro font-bold text-4xl bg-${variant} text-${variant}-foreground border-[3px] border-black shadow-flashcard rounded-2xl`}
    >
      <p className="mb-2 text-center">{children}</p>
      <div className={`absolute left-1/2 grid place-items-center w-5 aspect-square border-[3px] border-black rounded-2xl -translate-x-1/2 rotate-45 ${variant === 'primary' ? 'bg-secondary' : 'bg-primary'}`}>
        <Icon className="w-[26px] h-[26px] text-black -rotate-45" />
      </div>
    </Link>
  );
};
