import type { SlugParams } from '@/types/SlugParams';
import { LinkTile } from '@/components/ui/LinkTile';

export const dynamic = 'force-dynamic';

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
