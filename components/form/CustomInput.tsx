"use client";

import { useField, getInputProps } from "@conform-to/react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FieldErrorMessage } from "@/components/form/FieldErrorMessage";
import { cn } from "@/lib/utils";

interface Props {
  name: string;
  label: string;
  type: "text" | "email" | "password";
}

export const CustomInput = ({ name, label, type }: Props) => {
  const [meta] = useField(name);

  return (
    <div className="flex flex-col gap-y-2">
      <Label
        htmlFor={meta.id}
        className={cn({ "text-destructive": meta.errors })}
      >
        {label}
      </Label>

      <Input
        {...getInputProps(meta, { type })}
        key={meta.key}
        defaultValue={meta.value as string}
        className={cn({
          "border-destructive focus-visible:ring-destructive bg-destructive-foreground dark:text-background":
            meta.errors,
        })}
      />

      {meta.errors && <FieldErrorMessage errors={meta.errors} />}
    </div>
  );
};
