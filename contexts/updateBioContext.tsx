"use client";

import { createContext, useContext } from "react";
import type { SubmissionResult } from "@conform-to/react";
import { useFetchItem, type UseFetchItemResult } from "@/hooks/useFetchItem";
import type { FormAction, HandleSubmission } from "@/lib/types";
import { fetchMyBio } from "@/lib/queries";
import type { BioType } from "@/lib/types";

type ContextType = UseFetchItemResult<BioType> & {
  handleSubmission: HandleSubmission;
};

const UpdateBioContext = createContext<ContextType | null>(null);

interface Props {
  children: React.ReactNode;
}

export const UpdateBioProvider = ({ children }: Props) => {
  const fetchItem = useFetchItem<BioType>({
    fetchFunction: fetchMyBio,
  });

  const handleSubmission = async (
    formAction: FormAction,
    formData: FormData,
    onComplete: () => void,
  ): Promise<SubmissionResult | undefined> => {
    try {
      const response = await formAction(formData);

      if (!response.success) {
        return response.error.result;
      }

      fetchItem.fetchItem();
      onComplete();

      return undefined;
    } catch {
      /**
       * クライアントサイドのエラーハンドリングは useFetchItem.ts を参照すること
       */
    }
  };

  return (
    <UpdateBioContext.Provider value={{ ...fetchItem, handleSubmission }}>
      {children}
    </UpdateBioContext.Provider>
  );
};

export const useUpdateBioContext = () => {
  const context = useContext(UpdateBioContext);

  if (!context) {
    throw new Error(
      "useUpdateBioContext must be used within a UpdateBioProvider",
    );
  }

  return context;
};
