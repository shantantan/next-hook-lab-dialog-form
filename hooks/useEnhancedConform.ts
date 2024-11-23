"use client";

import { useActionState } from "react";
import { useForm } from "@conform-to/react";
import type { SubmissionResult } from "@conform-to/react";
import type { ServerActionResponseWithConform } from "@/lib/types";
import { parseWithZod } from "@conform-to/zod";
import type { z } from "zod";

type FormAction = (
  formData: FormData,
  id: string,
) => Promise<ServerActionResponseWithConform>;

interface Props<T extends z.ZodType> {
  handleSubmission: (
    formAction: FormAction,
    formData: FormData,
    id: string,
    onComplete: () => void,
  ) => Promise<SubmissionResult | undefined>;
  formAction: FormAction;
  schema: T;
  id: string;
}

export const useEnhancedConform = <T extends z.ZodType>({
  handleSubmission,
  formAction,
  schema,
  id,
}: Props<T>) => {
  const onComplete = () => {
    // 何らかの処理
  };
  const [lastResult, action, isPending] = useActionState(
    async (prevState: unknown, formData: FormData) => {
      return await handleSubmission(formAction, formData, id, onComplete);
    },
    undefined,
  );

  const [form] = useForm({
    lastResult,
    onValidate: ({ formData }) => {
      return parseWithZod(formData, { schema });
    },
    shouldValidate: "onSubmit",
    shouldRevalidate: "onBlur",
  });

  return { action, isPending, form };
};
