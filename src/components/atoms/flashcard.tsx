import { ElementType, ReactNode } from 'react';

type Props = {
  className?: string;
  children: ReactNode;
  SpeechElement?: ElementType | false;
  variant?: 'primary' | 'secondary' | 'accent' | 'destructive';
};

export const Flashcard = ({ className, children, SpeechElement, variant = 'primary' }: Props) => (
  <>
    <div
      data-testid={'flashcard-container-' + variant}
      className={`relative inline-flex justify-center items-center mt-1 py-2 px-4 min-w-[250px] sm:min-w-[275px] min-h-[150px] font-anonymous-pro font-bold text-[2.6rem] sm:text-3xl border-[3px] border-black rounded-2xl shadow-flashcard overflow-hidden bg-${variant} text-${variant}-foreground ${className}`}
    >
      {children}
    </div>
    {SpeechElement && <SpeechElement />}
  </>
);
