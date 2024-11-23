"use server";

import { redirect } from "next/navigation";
import prisma from "@/prisma/db";
import { signIn as NextAuthSignIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import { parseWithZod } from "@conform-to/zod";
import type { SubmissionResult } from "@conform-to/react";
import type { ServerActionResponseWithConform } from "@/lib/types";
import { signUpSchema, signInSchema } from "@/lib/schema";
import bcrypt from "bcryptjs";

export const fetchUserById = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    return user;
  } catch (error) {
    console.error(`Error fetching user by id: ${error}`);
    return null;
  }
};

export const fetchUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    return user;
  } catch (error) {
    console.error(`Error fetching user by id: ${error}`);
    return null;
  }
};

export const signUpAction = async (
  prevState: unknown,
  formData: FormData,
): Promise<SubmissionResult> => {
  const submission = parseWithZod(formData, { schema: signUpSchema });

  try {
    if (submission.status !== "success") {
      return submission.reply();
    }

    const { name, email, password } = submission.value;

    const hashedPassword = await bcrypt.hash(password, 8);

    const txResult: ServerActionResponseWithConform = await prisma.$transaction(
      async (tx) => {
        const existingUserCount = await tx.user.count({ where: { email } });

        if (existingUserCount !== 0) {
          return {
            success: false,
            error: {
              result: submission.reply({
                formErrors: [
                  "入力されたメールアドレスはすでに使用されています",
                ],
              }),
              message: "",
            },
          };
        }

        const newUser = await tx.user.create({
          data: {
            name,
            email,
            password: hashedPassword,
          },
        });

        await tx.profile.create({
          data: {
            userId: newUser.id,
          },
        });

        return { success: true, message: "" };
      },
    );

    if (!txResult.success) {
      return txResult.error.result;
    }
  } catch (error) {
    console.error(`Error creating user: ${error}`);
    return submission.reply({ formErrors: ["ユーザーの作成に失敗しました"] });
  }

  redirect("/sign-in");
};

export const signInAction = async (
  prevState: unknown,
  formData: FormData,
): Promise<SubmissionResult> => {
  const submission = parseWithZod(formData, { schema: signInSchema });

  try {
    if (submission.status !== "success") {
      return submission.reply();
    }

    await NextAuthSignIn("credentials", {
      redirect: false,
      ...submission.value,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.type === "CredentialsSignin") {
        return submission.reply({
          formErrors: ["メールアドレスまたはパスワードが正しくありません"],
        });
      }

      return submission.reply({ formErrors: ["ログインできませんでした"] });
    }

    throw error;
  }

  redirect("/");
};

export const signOutAction = async () => {
  await signOut({ redirectTo: "/sign-in" });
};
