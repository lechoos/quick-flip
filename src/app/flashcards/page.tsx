import { getAllCategories } from '@/lib/actions';
import { CategoryLabel } from '@/components/ui/CategoryLabel';
import { AlbumIcon } from 'lucide-react';
import { Subtitle } from '@/pages/flashcards/Subtitle';

export const dynamic = 'force-dynamic';

export default async function FlashcardsPage() {
  const categories = await getAllCategories();

  if (!categories) {
    return (
      <header className="relative py-4 pt-7 sm:pt-[13rem] h-screen bg-primary border-[5px] border-black">
        <h1 className="text-center">There are no categories.</h1>
      </header>
    );
  }

  return (
    <>
      <header className="relative py-4 pt-7 sm:pt-[13rem] bg-primary border-[5px] border-black">
        <h1 className="text-center">Pick one of these categories:</h1>
      </header>
      <Subtitle />
      <div className="flex flex-wrap justify-center gap-x-2 gap-y-4 mt-2 mx-2">
        {categories.map((category) => (
          <CategoryLabel
            key={category.id}
            href={`/flashcards/category/${category.slug}`}
            Icon={AlbumIcon}
          >
            {category.name}
          </CategoryLabel>
        ))}
      </div>
    </>
  );
}
