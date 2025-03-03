'use client';

import { useRef } from 'react';
import { useHover } from '@/hooks/useHover';
import { BadgeHelp } from 'lucide-react';
import { PartOfSpeech } from '@/components/ui/PartOfSpeach';

type FlashcardProps = {
  variant: 'primary' | 'secondary' | 'accent' | 'destructive';
  word: string;
  partOfSpeech: 'noun' | 'verb' | 'adjective';
  translation: string;
  example?: string;
};

export const Flashcard = ({ variant, word, partOfSpeech, translation, example }: FlashcardProps) => {
  const [hoverRef, isHovered] = useHover();
  const badgeRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div className={`relative inline-block mt-1 p-2 min-w-[250px] font-anonymous-pro font-bold text-${variant}-foreground bg-${variant} border-[3px] border-black rounded-2xl shadow-flashcard overflow-hidden`}>
        <p className="text-3xl">{word}</p>
        <div className="grid gap-y-1 pb-3 font-inter text-sm">
          <p className="font-semibold opacity-80">{translation}</p>
          {example && <p className="text-base">{example}</p>}
        </div>
        <div
          ref={(node) => {
            if (hoverRef.current !== node) {
              hoverRef.current = node!;
            }
            badgeRef.current = node!;
          }}
          className="absolute top-2 right-2 scale-125 cursor-help"
        >
          <BadgeHelp />
        </div>
      </div>
      {isHovered && (
        <PartOfSpeech
          color={variant}
          targetRef={badgeRef}
          offsetX={10}
          offsetY={0}
        >
          {partOfSpeech}
        </PartOfSpeech>
      )}
    </>
  );
};
