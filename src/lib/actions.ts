'use server';

import prisma from './prisma';
import { auth } from '@/auth';

export const getAllCategories = async () => prisma.flashcardCategory.findMany({});

export const getCategory = async (slug: string) => prisma.flashcardCategory.findUnique({ where: { slug }, select: { slug: true } });

export const getFlashcards = async (slug: string) =>
  prisma.flashcardCategory.findUnique({
    where: { slug },
    select: { flashcards: true },
  });

export const getUserProfile = async () => {
  const session = await auth();

  if (!session) return null;
  return session.user;
};
