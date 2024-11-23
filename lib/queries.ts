"use server";

import prisma from "@/prisma/db";
import { authenticatedForQuery } from "@/lib/utils";
import type { BioType } from "@/lib/types";

export const fetchMyBio = async (): Promise<BioType | null> => {
  try {
    const userId = await authenticatedForQuery();

    if (!userId) {
      return null;
    }

    const profile = await prisma.profile.findUnique({
      where: { userId },
      select: {
        bio: true,
      },
    });

    if (!profile) {
      return null;
    }

    const { bio } = profile;

    if (!bio) {
      return "プロフィールが設定されていません";
    }

    return bio;
  } catch (error) {
    console.error(`Error fetching my bio: ${error}`);
    return null;
  }
};
