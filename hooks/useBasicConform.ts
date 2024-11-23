"use client";

import { useActionState } from "react";
import { useForm } from "@conform-to/react";
import type { SubmissionResult } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import type { z } from "zod";

interface Props<T extends z.ZodType> {
  formAction: (
    prevState: unknown,
    formData: FormData,
  ) => Promise<SubmissionResult>;
  schema: T;
}

export const useBasicConform = <T extends z.ZodType>({
  formAction,
  schema,
}: Props<T>) => {
  const [lastResult, action, isPending] = useActionState(formAction, undefined);

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
