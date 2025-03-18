import { Link } from '@/components/atoms/link';
import { capitalize } from '@/lib/utils';

export const LinkTile = ({ path, mode }: { path: string; mode?: 'practice' | 'test' }) => (
  <Link
    className="flex justify-center items-center py-4 md:py-8 font-bold bg-primary rounded-xl border-[5px] border-black shadow"
    href={`/flashcards/category/${path}/${mode}`}
  >
    {mode ? capitalize(mode) + ' mode' : 'Back to flashcards'}
  </Link>
);
