import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { auth } from "@/auth";
import type { AuthenticatedForAction } from "@/lib/types";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const authenticatedForQuery = async (): Promise<string | null> => {
  const session = await auth();

  if (!session) {
    return null;
  }

  return session.user.id;
};

export const authenticatedForAction =
  async (): Promise<AuthenticatedForAction> => {
    const session = await auth();

    if (!session) {
      return {
        success: false,
        error: { message: "認証情報の確認に失敗しました" },
      };
    }

    return { success: true, userId: session.user.id };
  };
