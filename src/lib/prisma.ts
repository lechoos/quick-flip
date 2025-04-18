import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
  try {
    return new PrismaClient({
      datasources: {
        db: {
          url: process.env.NODE_ENV === 'production' ? process.env.PROD_DATABASE_URL || 'placeholder-url-for-build' : process.env.DATABASE_URL || 'placeholder-url-for-build',
        },
      },
    });
  } catch (_) {
    console.warn('Creating Prisma mock during build');
    return {} as PrismaClient;
  }
};

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') {
  globalThis.prismaGlobal = prisma;
}
