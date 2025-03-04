import { Flashcard } from '@/components/atoms/flashcard';
import type { Flashcard as FlashcardType } from '@/types/Flashcard';

export const LearningCard = ({ front, back, variant }: FlashcardType) => (
  <Flashcard
    variant={variant}
    className="learning-card min-h-[150px] text-3xl"
  >
    <div className="grid place-items-center h-full">{front}</div>
    <div className="absolute top-0 left-0 grid place-items-center w-full h-full bg-accent text-accent-foreground learning-card--back">{back}</div>
  </Flashcard>
);
