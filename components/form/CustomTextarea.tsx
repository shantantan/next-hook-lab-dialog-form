"use client";

import { useField, getTextareaProps } from "@conform-to/react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FieldErrorMessage } from "@/components/form/FieldErrorMessage";
import { cn } from "@/lib/utils";

interface Props {
  name: string;
  label: string;
  rows?: number;
}

export const CustomTextarea = ({ name, label, rows = 8 }: Props) => {
  const [meta] = useField(name);

  return (
    <div className="flex flex-col gap-y-2">
      <Label
        htmlFor={meta.id}
        className={cn({ "text-destructive": meta.errors })}
      >
        {label}
      </Label>

      <Textarea
        {...getTextareaProps(meta)}
        key={meta.key}
        defaultValue={meta.value as string}
        rows={rows}
        className={cn({
          "border-destructive focus-visible:ring-destructive bg-destructive-foreground dark:text-background":
            meta.errors,
        })}
      />

      {meta.errors && <FieldErrorMessage errors={meta.errors} />}
    </div>
  );
};
