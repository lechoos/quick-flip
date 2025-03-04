'use client';

import { useRef } from 'react';
import { useHover } from '@/hooks/useHover';
import { BadgeHelp } from 'lucide-react';
import { Flashcard } from '@/components/atoms/flashcard';
import { PartOfSpeech } from '@/components/ui/PartOfSpeach';

import type { Flashcard as FlashcardType } from '@/types/Flashcard';

type NormalCardProps = FlashcardType & {
  example?: string;
};

export const NormalCard = ({ variant = 'primary', front, back, example, partOfSpeech }: NormalCardProps) => {
  const [hoverRef, isHovered] = useHover();
  const badgeRef = useRef<HTMLDivElement>(null);

  const SpeechElement = () => {
    if (partOfSpeech) {
      return (
        isHovered && (
          <PartOfSpeech
            color={variant}
            targetRef={badgeRef}
          >
            {partOfSpeech}
          </PartOfSpeech>
        )
      );
    }
  };

  return (
    <Flashcard
      SpeechElement={SpeechElement}
      variant={variant}
    >
      <p className="text-3xl">{front}</p>
      <div className="grid gap-y-1 font-inter text-sm">
        <p className={`font-semibold opacity-80 ${example && 'pb-[1.5rem]'}`}>{back}</p>
        {example && <p className="text-base">{example}</p>}
      </div>
      {partOfSpeech && (
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
      )}
    </Flashcard>
  );
};
