type FlashcardProps = {
  variant: 'primary' | 'secondary' | 'accent' | 'destructive';
  word: string;
  partOfSpeech: 'noun' | 'verb' | 'adjective';
  translation: string;
  example?: string;
};

export const Flashcard = ({ variant, word, partOfSpeech, translation, example }: FlashcardProps) => {
  return (
    <div className={`relative inline-block mt-1 p-2 min-w-[250px] font-anonymous-pro font-bold text-${variant}-foreground bg-${variant} border-[3px] border-${variant}-border rounded-2xl shadow-${variant}-border`}>
      <p className="text-3xl">{word}</p>
      <div className="grid gap-y-1 pb-3 font-inter text-sm">
        <p className="font-semibold opacity-80">{translation}</p>
        {example && <p className="text-base">{example}</p>}
      </div>
      <p className={`absolute right-[-2px] bottom-[-2px] left-[-2px] inline-block py-0.5 text-xl text-white bg-${variant}-border rounded-bl-2xl rounded-br-2xl text-center`}>{partOfSpeech}</p>
    </div>
  );
};
