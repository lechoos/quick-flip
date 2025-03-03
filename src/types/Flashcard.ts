export type Flashcard = {
  front: string;
  back: string;
  partOfSpeech?: 'noun' | 'verb' | 'adjective' | 'adverb' | 'numeral';
};
