'use client';

import { type ReactNode, useState } from 'react';

type Props = {
  variant?: 'primary' | 'secondary' | 'destructive';
  title: string;
  isList?: boolean;
  border?: boolean;
  children?: ReactNode;
};

export const Section = ({ variant = 'primary', title, isList = false, border, children }: Props) => {
  const [hasUnderline] = useState(() => {
    // Title has an underline unless it's equal to "Try
    // Quickflip"
    return !(title === 'Try QuickFlip!');
  });

  return (
    <section className={`p-3 bg-${variant} text-${variant}-foreground ${border && 'border-[5px] border-black'}`}>
      <h2 className={`my-4 ${hasUnderline && 'underline'}`}>{title}</h2>
      {isList ? <ul className="flex flex-col gap-y-2 text-base sm:text-lg text-justify">{children}</ul> : <div className="flex flex-col gap-y-2 text-base sm:text-lg text-justify">{children}</div>}
    </section>
  );
};
