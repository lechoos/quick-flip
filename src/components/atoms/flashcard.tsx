import { ElementType, ReactNode } from 'react';

type FlashcardProps = {
  className?: string;
  children: ReactNode;
  SpeechElement?: ElementType | false;
  variant?: 'primary' | 'secondary' | 'accent' | 'destructive';
};

export const Flashcard = ({ className, children, SpeechElement, variant = 'primary' }: FlashcardProps) => (
  <>
    <div className={`relative inline-block mt-1 p-2 min-w-[250px] font-anonymous-pro font-bold border-[3px] border-black rounded-2xl shadow-flashcard overflow-hidden bg-${variant} text-${variant}-foreground ${className}`}>{children}</div>
    {SpeechElement && <SpeechElement />}
  </>
);
