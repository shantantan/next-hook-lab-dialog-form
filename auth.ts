import NextAuth from "next-auth";
import type { NextAuthConfig } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/prisma/db";
import Credentials from "next-auth/providers/credentials";
import { fetchUserById, fetchUserByEmail } from "@/lib/auth";
import { signInSchema } from "@/lib/schema";
import bcrypt from "bcryptjs";

export const authConfig = {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFileds = signInSchema.safeParse(credentials);

        if (!validatedFileds.success) {
          return null;
        }

        const { email, password } = validatedFileds.data;

        const user = await fetchUserByEmail(email);

        if (!user) {
          return null;
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
          return null;
        }

        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  callbacks: {
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) {
        return token;
      }

      const existingUser = await fetchUserById(token.sub);

      if (!existingUser) {
        return token;
      }

      return token;
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
});
