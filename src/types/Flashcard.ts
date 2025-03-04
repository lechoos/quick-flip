export type Flashcard = {
  front: string;
  back: string;
  partOfSpeech?: 'noun' | 'verb' | 'adjective' | 'adverb' | 'numeral';
  variant?: 'primary' | 'secondary' | 'accent' | 'destructive';
};
