'use client';

import { Flashcard } from '@/components/atoms/flashcard';
import type { Flashcard as FlashcardType } from '@/types/Flashcard';
import { ChevronsRight } from 'lucide-react';

type ContentProps = Omit<FlashcardType, 'partOfSpeech'> & { isLearning?: boolean };

export const LearningCard = ({ front, back, variant = 'primary', isLearning = false }: ContentProps) => {
  return (
    <Flashcard
      variant={variant}
      className="learning-card"
    >
      <div className="grid place-items-center h-full">{front}</div>
      <div className={`absolute top-0 left-0 grid place-items-center w-full h-full learning-card--back ${variant === 'accent' ? 'bg-primary text-primary-foreground' : 'bg-accent text-accent-foreground'}`}>
        {back}
        {isLearning && (
          <div className={`absolute top-0 right-0 flex items-center px-[0.7rem] h-full translate-x-full z-10 text-${variant}-foreground`}>
            <ChevronsRight
              data-testid="arrows-icon"
              className="w-[3.5rem] h-[3.5rem]"
            />
          </div>
        )}
      </div>
    </Flashcard>
  );
};
