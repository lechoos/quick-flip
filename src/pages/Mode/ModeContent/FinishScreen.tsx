import { Card } from '@/components/atoms/card';
import { Link } from '@/components/atoms/link';
import { ReactNode } from 'react';

type Props = {
  slug: string;
  score: number;
  mode: 'practice' | 'test';
};

type ScreenProps = {
  title: string;
  children: ReactNode;
};

const Screen = ({ title, children }: ScreenProps) => (
  <>
    <Card className="p-4 bg-accent text-accent-foreground sm:text-justify border-[3px] border-black shadow">
      <h2>{title}</h2>
    </Card>
    <div className="flex justify-center gap-x-3 mt-4 w-full max-w-60 text-lg">{children}</div>
  </>
);

export const FinishScreen = ({ slug, score, mode }: Props) => {
  return mode === 'practice' ? (
    <Screen title="Congrats! You can test yourself in the test mode, or go back to flashcards page😃">
      <Link href={`/flashcards/category/${slug}/test`}>Test Mode</Link>
      <Link href={'/flashcards/'}>Flashcards page</Link>
    </Screen>
  ) : (
    <Screen title={`You scored ${score} points. You can practice, go back to flashcards page or try again.`}>
      <a
        className="hover:underline"
        href={`/flashcards/category/${slug}/test`}
      >
        Try again
      </a>
      <Link href={`/flashcards/category/${slug}/practice`}>Practice</Link>
      <Link href={'/flashcards/'}>Flashcards page</Link>
    </Screen>
  );
};
