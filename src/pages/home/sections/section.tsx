import { ReactNode } from 'react';

type SectionProps = {
  variant?: 'primary' | 'secondary' | 'destructive';
  title: string;
  isList?: boolean;
  border?: boolean;
  children?: ReactNode;
};

export const Section = ({ variant = 'primary', title, isList = false, border, children }: SectionProps) => {
  return (
    <section className={`p-3 bg-${variant} text-${variant}-foreground ${border && 'border-[5px] border-black'}`}>
      <h2 className="my-4 underline">{title}</h2>
      {isList ? <ul className="flex flex-col gap-y-2 text-base sm:text-lg text-justify">{children}</ul> : <div className="flex flex-col gap-y-2 text-base sm:text-lg text-justify">{children}</div>}
    </section>
  );
};
