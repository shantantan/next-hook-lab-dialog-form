"use server";

import prisma from "@/prisma/db";
import { parseWithZod } from "@conform-to/zod";
import type { ServerActionResponseWithConform } from "@/lib/types";
import { updateBioSchema } from "@/lib/schema";
import { authenticatedForAction } from "@/lib/utils";

export const updateBioAction = async (
  formData: FormData,
): Promise<ServerActionResponseWithConform> => {
  const submission = parseWithZod(formData, { schema: updateBioSchema });

  try {
    const authenticated = await authenticatedForAction();

    if (!authenticated.success) {
      const errorMessage = authenticated.error.message;

      return {
        success: false,
        error: {
          result: submission.reply({ formErrors: [errorMessage] }),
          message: "",
        },
      };
    }

    const userId = authenticated.userId;

    if (submission.status !== "success") {
      return {
        success: false,
        error: {
          result: submission.reply(),
          message: "",
        },
      };
    }

    const { bio } = submission.value;

    await prisma.profile.update({
      where: { userId },
      data: { bio },
    });

    return {
      success: true,
      message: "プロフィールを更新しました",
    };
  } catch (error) {
    console.error(`Error updating bio: ${error}`);
    return {
      success: false,
      error: {
        result: submission.reply({
          formErrors: ["プロフィールの更新に失敗しました"],
        }),
        message: "",
      },
    };
  }
};
