import { ModeView } from '@/pages/ModeView';
import { getFlashcards } from '@/lib/actions';
import { ModeContent } from '@/pages/ModeView/ModeContent';
import { LearningCard } from '@/components/flashcards-variants/LearningCard';

type ModeProps = {
  params: Promise<{ slug: string; mode: 'practice' | 'test' }>;
};

export default async function ModePage({ params }: ModeProps) {
  const { slug, mode } = await params;

  const cardsContent = await getFlashcards(slug);

  const cards = cardsContent?.flashcards.map((card) => (
    <LearningCard
      key={card.id}
      isLearning={mode === 'practice'}
      className="embla-slide"
      {...card}
    />
  ));

  return (
    <>
      <ModeView mode={mode} />
      <ModeContent
        slug={slug}
        slides={cards!}
      />
    </>
  );
}
