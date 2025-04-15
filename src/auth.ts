import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from '@/lib/prisma';
import { Adapter } from 'next-auth/adapters';
import { compare } from 'bcryptjs';

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma) as Adapter,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.username = user.username;
      } else if (token?.id) {
        const dbUser = await prisma.user.findUnique({
          where: { id: token.id as string },
        });

        if (dbUser) {
          token.email = dbUser.email;
          token.username = dbUser.username;
        }
      }
      return token;
    },
    async session(params) {
      const { session, token } = params;
      if (token) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.username = token.username as string;
      }
      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'your@email.com',
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: '********',
        },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({ where: { email: credentials.email as string } });

        if (!user) {
          return null;
        }

        const passwordIsValid = await compare(credentials.password as string, user.password);

        if (!passwordIsValid) {
          return null;
        }

        return user;
      },
    }),
  ],
  pages: {
    signIn: '/auth/login',
  },
});
