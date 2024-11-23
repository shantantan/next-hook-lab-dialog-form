import { z } from "zod";

export const signUpSchema = z
  .object({
    name: z
      .string({ required_error: "ユーザーネームを入力してください" })
      .max(16, { message: "ユーザーネームは16文字以下です" }),
    email: z
      .string({ required_error: "メールアドレスを入力してください" })
      .max(256, { message: "メールアドレスが長すぎます" })
      .email("正しい形式のメールアドレスを入力してください"),
    password: z
      .string({ required_error: "パスワードを入力してください" })
      .min(8, { message: "パスワードは8文字以上です" })
      .max(24, { message: "パスワードは24文字以下です" })
      .regex(/^[a-zA-Z0-9]{8,24}$/, {
        message: "パスワードに使用できるのは半角英数字のみです",
      })
      .regex(/(?=.*[a-z](?=.*[A-Z])(?=.*[0-9]))/, {
        message:
          "パスワードには少なくとも1文字以上の数字、小文字、大文字を含む必要があります",
      }),
    confirmPassword: z
      .string({
        required_error: "確認用パスワードを入力してください",
      })
      .min(8, { message: "パスワードは8文字以上です" })
      .max(24, { message: "パスワードは24文字以下です" }),
    agreement: z.literal("on", {
      errorMap: () => ({ message: "利用規約に同意してください" }),
    }),
  })
  .refine(
    (values) => {
      const { password, confirmPassword } = values;

      return password === confirmPassword;
    },
    { message: "確認用パスワードが一致しません", path: ["confirmPassword"] },
  );

export const signInSchema = z.object({
  email: z
    .string({ required_error: "メールアドレスを入力してください" })
    .max(256, { message: "メールアドレスが長すぎます" })
    .email("正しい形式のメールアドレスを入力してください"),
  password: z
    .string({ required_error: "パスワードを入力してください" })
    .min(8, { message: "パスワードは6文字以上です" })
    .max(24, { message: "パスワードは24文字以下です" }),
});

export const updateBioSchema = z.object({
  bio: z
    .string({ required_error: "プロフィールを入力してください" })
    .max(128, { message: "プロフィールは128文字以下です" }),
});
