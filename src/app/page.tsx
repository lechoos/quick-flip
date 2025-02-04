import { Flashcard } from '@/components/ui/flashcard';

type FlashcardProps = {
  variant: 'primary' | 'secondary' | 'accent' | 'destructive';
  word: string;
  partOfSpeech: 'noun' | 'verb' | 'adjective';
  translation: string;
  example?: string;
};

const data: FlashcardProps[] = [
  {
    variant: 'primary',
    word: 'tener',
    partOfSpeech: 'verb',
    translation: 'to have',
    example: 'Yo tengo un amigo.',
  },
  {
    variant: 'accent',
    word: 'el vino',
    partOfSpeech: 'noun',
    translation: 'wine',
  },
  {
    variant: 'secondary',
    word: 'asqueroso',
    partOfSpeech: 'adjective',
    translation: 'ready',
    example: '¿Están listos para pedir?',
  },
];

export default function Home() {
  return (
    <div className="flex gap-4">
      {data.map((flashcard) => (
        <Flashcard
          key={flashcard.word}
          {...flashcard}
        />
      ))}
    </div>
  );
}
