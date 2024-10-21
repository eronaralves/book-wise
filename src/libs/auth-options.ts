import type { NextAuthOptions } from "next-auth";

import { PrismaClient } from "@prisma/client";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
  ],
  session: {
    maxAge: 60 * 60,
    updateAge: 60 * 30,
  },
  pages: {
    signIn: '/sign-in',
  },
  callbacks: {
    session({ session, user }) {
      return {
        ...session,
        user: {
          ...session.user,
          created_at: user.created_at,
          id: user.id,
        },
      };
    },
    async signIn({ user, account }) {
      const existingUser = await prisma.user.findUnique({
        where: { email: user.email },
        include: {
          accounts: true,
        },
      });

      if (existingUser) {
        const hasLinkedAccount = existingUser.accounts.some(
          (acc) => acc.provider === account?.provider
        );

        if (hasLinkedAccount) {
          return true;
        }

        if (account) {
          await prisma.account.create({
            data: {
              userId: existingUser.id,
              provider: account.provider,
              providerAccountId: account.providerAccountId,
              type: account.type,
              access_token: account.access_token,
              refresh_token: account.refresh_token,
              expires_at: account.expires_at,
            },
          });
        }
        return true;
      }

      return true;
    },
  },
};