import { z } from 'zod';
import { hash, compare } from 'bcryptjs';
import { prisma } from '@/../prisma';
import { registerSchema } from '@/lib/formSchemas';

const SALT_ROUNDS = 12;

type User = z.infer<typeof registerSchema>;

export const checkUserExist = async (email: string) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  return !!existingUser;
};

export const createUser = async (data: User) => {
  const hashedPassword = await hash(data.password, SALT_ROUNDS);

  const user = await prisma.user.create({
    data: {
      email: data.email,
      username: data.username,
      password: hashedPassword,
    },
  });

  const { email, username } = user;

  return { email, username };
};

export const getUserData = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) return null;

  const { email, username } = user;

  return { email, username };
};

export const verifyUser = async (credentials: Pick<User, 'email' | 'password'>) => {
  const user = await prisma.user.findUnique({
    where: {
      email: credentials.email,
    },
  });

  if (!user) return null;

  const isPasswordValid = await compare(credentials.password, user.password);

  if (!isPasswordValid) return null;

  const { email, username } = user;

  return { email, username };
};
