import { ModeAnnounce } from '@/sites/Mode/ModeAnnounce';
import { getFlashcards } from '@/lib/actions';
import { ModeContent } from '@/sites/Mode/ModeContent';
import { LearningCard } from '@/components/flashcards-variants/LearningCard';

export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{ slug: string; mode: 'practice' | 'test' }>;
};

type CardType = {
  id: string;
  front: string;
  back: string;
  partOfSpeech: string | null;
  categoryId: string;
};

export default async function ModePage({ params }: Props) {
  const { slug, mode } = await params;

  const cardsContent = await getFlashcards(slug);

  const cards = cardsContent?.flashcards.map((card: CardType) => (
    <LearningCard
      key={card.id}
      isLearning={mode === 'practice'}
      className="embla-slide"
      {...card}
    />
  ));

  return (
    <>
      <ModeAnnounce mode={mode} />
      <ModeContent
        mode={mode}
        slug={slug}
        slides={cards!}
      />
    </>
  );
}
