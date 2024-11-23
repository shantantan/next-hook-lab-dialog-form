"use client";

import { useState, useActionState, useCallback } from "react";
import { useForm } from "@conform-to/react";
import type { FormMetadata } from "@conform-to/react";
import type { FormAction, HandleSubmission } from "@/lib/types";
import { parseWithZod } from "@conform-to/zod";
import type { z } from "zod";

interface Props<T extends z.ZodType> {
  handleSubmission: HandleSubmission;
  formAction: FormAction;
  schema: T;
}

export interface UseDialogConformResult<T extends z.ZodType> {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  action: (payload: FormData) => void;
  isPending: boolean;
  form: FormMetadata<z.infer<T>, string[]>;
}

export const useDialogConform = <T extends z.ZodType>({
  handleSubmission,
  formAction,
  schema,
}: Props<T>): UseDialogConformResult<T> => {
  const [isOpen, setIsOpen] = useState(false);
  const onComplete = useCallback(() => {
    setIsOpen(false);
  }, []);
  const [lastResult, action, isPending] = useActionState(
    async (prevState: unknown, formData: FormData) => {
      return await handleSubmission(formAction, formData, onComplete);
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

  return { isOpen, setIsOpen, action, isPending, form };
};
