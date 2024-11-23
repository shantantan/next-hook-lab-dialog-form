import NextAuth from "next-auth";

export type SessionUser = DefaultSession["user"];

declare module "next-auth" {
  interface Session {
    user: SessionUser;
  }
}
