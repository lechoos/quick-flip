'use server';

import prisma from './prisma';

export const getAllCategories = async () => prisma.flashcardCategory.findMany({});

export const getCategory = async (slug: string) =>
  prisma.flashcardCategory.findUnique({
    where: { slug },
    include: { flashcards: true },
  });
