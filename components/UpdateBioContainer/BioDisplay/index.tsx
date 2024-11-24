"use client";

import { useUpdateBioContext } from "@/contexts/updateBioContext";
import { LoaderIcon } from "lucide-react";

export const BioDisplay = () => {
  const { data } = useUpdateBioContext();

  if (!data) {
    return (
      <div className="p-6 border border-border rounded-md relative">
        <h3 className="w-fit px-2 bg-background text-sm font-bold absolute z-10 top-0 left-4 -translate-y-[calc(50%+1px)]">
          プロフィール
        </h3>
        <div className="flex items-center gap-x-2 opacity-60">
          <LoaderIcon className="w5 h-5 stroke-[1.5] animate-spin" />
          <span className="pb-[2px]">読み込み中...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 border border-border rounded-md relative">
      <h3 className="w-fit px-2 bg-background text-sm font-bold absolute z-10 top-0 left-4 -translate-y-[calc(50%+1px)]">
        プロフィール
      </h3>

      {data ? (
        <p className="whitespace-pre-wrap">{data}</p>
      ) : (
        <p className="text-muted-foreground">
          プロフィールがまた設定されていません。
        </p>
      )}
    </div>
  );
};
