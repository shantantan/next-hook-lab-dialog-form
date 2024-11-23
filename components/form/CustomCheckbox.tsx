"use client";

import { useField } from "@conform-to/react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { FieldErrorMessage } from "@/components/form/FieldErrorMessage";

interface Props {
  label: string;
  name: string;
}

export const CustomCheckbox = ({ label, name }: Props) => {
  const [meta] = useField(name);

  return (
    <div className="w-fit flex flex-col gap-y-2">
      <Label className="flex items-center gap-x-2">
        <Checkbox
          name={meta.name}
          key={meta.key}
          defaultChecked={meta.initialValue === "off"}
        />

        <span className="pb-[1px] text-sm font-medium">{label}</span>
      </Label>

      {meta.errors && <FieldErrorMessage errors={meta.errors} />}
    </div>
  );
};
