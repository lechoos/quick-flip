import { Card } from '@/components/atoms/card';
import { Link } from '@/components/atoms/link';

export const FinishScreen = ({ slug }: { slug: string }) => (
  <>
    <Card className="p-4 bg-accent text-accent-foreground sm:text-justify border-[3px] border-black shadow">
      <h2>Congrats! You can test yourself in the test mode, or go back to flashcards page😃</h2>
    </Card>
    <div className="flex justify-center gap-x-3 mt-4 w-full max-w-60 text-lg">
      <Link href={`/flashcards/category/${slug}/test`}>Test Mode</Link>
      <Link href={'/flashcards/'}>Flashcards page</Link>
    </div>
  </>
);
