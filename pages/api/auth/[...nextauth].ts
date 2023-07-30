import NextAuth from 'next-auth';

import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';

import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from 'lib/prismadb';

import type { NextAuthOptions, RequestInternal } from 'next-auth';
import { VerifyCredentials } from 'lib/fetcher';

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXT_AUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.OAUTH_CLIENT_KEY as string,
      clientSecret: process.env.OAUTH_CLIENT_SECRET as string
    }),
    CredentialsProvider({
      id: 'credentials',
      credentials: {
        email: {
          type: 'email'
        },
        password: { type: 'password' }
      },
      authorize: async (
        credentials: Record<'email' | 'password', string> | undefined,
        _: any
      ) => {
        try {
          const user = await VerifyCredentials(credentials);
          return user;
        } catch (error) {
          return null;
        }
      }
    })
  ],
  pages: {
    signIn: '/guestbook',
    error: '/guestbook'
  },
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async session({
      session,
      token,
      user
    }: {
      session: any;
      token: any;
      user: any;
    }) {
      return {
        ...session,
        user: { ...session.user, ...user, role: token.role, id: token.userId }
      };
    },
    async jwt({ token, user, trigger }) {
      if (user) {
        token.role = user.role;
        token.userId = user.id;
      }
      return token;
    }
  }
};

export default NextAuth(authOptions);
