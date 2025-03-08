import { getAllCategories } from '@/lib/actions';
import { CategoryLabel } from '@/components/ui/CategoryLabel';
import { AlbumIcon } from 'lucide-react';

export default async function FlashcardsPage() {
  const categories = await getAllCategories();

  return (
    <div className="grid grid-cols-2 justify-center gap-x-2 gap-y-4 mt-2 mx-2">
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
  );
}
