"use client";

import { Button } from "@/components/ui/button";
import { LoaderIcon } from "lucide-react";

interface Props {
  title: string;
  isPending: boolean;
}

export const FormSubmit = ({ title, isPending }: Props) => {
  return (
    <Button type="submit" disabled={isPending}>
      {isPending && (
        <LoaderIcon className="w-5 h-5 stroke-[1.5] animate-spin" />
      )}
      <span className="pb-[2px]">{title}</span>
    </Button>
  );
};
