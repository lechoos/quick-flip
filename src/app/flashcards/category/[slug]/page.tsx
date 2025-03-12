import { Link } from '@/components/atoms/link';
import { capitalize } from '@/lib/utils';
import type { SlugParams } from '@/types/SlugParams';

export const dynamic = 'force-dynamic';

const LinkTile = ({ path, mode }: { path: string; mode: 'practice' | 'test' }) => (
  <Link
    className="flex justify-center items-center py-4 md:py-8 font-bold bg-primary rounded-xl border-[5px] border-black shadow"
    href={`/flashcards/category/${path}/${mode}`}
  >
    {capitalize(mode)} mode
  </Link>
);

export default async function CategoryPage({ params }: SlugParams) {
  const { slug } = await params;

  return (
    <section className="grid md:grid-cols-2 gap-2 m-4 mt-8 xl:mx-auto max-w-[1200px] text-xl">
      <LinkTile
        path={slug}
        mode="practice"
      />
      <LinkTile
        path={slug}
        mode="test"
      />
    </section>
  );
}
