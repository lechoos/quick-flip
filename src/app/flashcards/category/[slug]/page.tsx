import { getCategory } from '@/lib/actions';

type Params = {
  params: Promise<{ slug: string }>;
};

export default async function CategoryPage({ params }: Params) {
  const { slug } = await params;

  const category = await getCategory(slug);

  return <h1>{category?.name}</h1>;
}
