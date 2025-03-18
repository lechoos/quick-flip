import { ReactNode } from 'react';
import { getCategory } from '@/lib/actions';
import { Link } from '@/components/atoms/link';
import { capitalize } from '@/lib/utils';

type Props = {
  children: ReactNode;
  params: Promise<{ slug: string }>;
};

export default async function CategoryLayout({ children, params }: Props) {
  const { slug } = await params;
  const category = await getCategory(slug);

  if (!category) {
    return (
      <>
        <h1 className="mt-8 sm:mt-16 text-center underline">The category {slug} doesn't exist</h1>
        <Link
          className="block mt-2 text-lg text-center"
          href="/flashcards"
        >
          {'<<'} Back to flashcards page
        </Link>
      </>
    );
  }

  return (
    <>
      <h1 className="mt-8 sm:mt-16 text-center underline">{capitalize(category.slug)}</h1>
      {children}
    </>
  );
}
