"use client";

import { createContext, useContext } from "react";
import {
  useDialogConform,
  type UseDialogConformResult,
} from "@/hooks/useDialogConform";
import { updateBioSchema } from "@/lib/schema";
import { updateBioAction } from "@/lib/actions";
import { useUpdateBioContext } from "@/contexts/updateBioContext";

type ContextType = UseDialogConformResult<typeof updateBioSchema>;

const UpdateBioDialogFormContext = createContext<ContextType | null>(null);

interface Props {
  children: React.ReactNode;
  initialBio: string | null;
}

export const UpdateBioDialogFormProvider = ({
  children,
  initialBio,
}: Props) => {
  const { handleSubmission, data } = useUpdateBioContext();
  const dialogConform = useDialogConform<typeof updateBioSchema>({
    handleSubmission,
    formAction: updateBioAction,
    schema: updateBioSchema,
    defaultValue: { bio: data ? data : initialBio },
  });

  return (
    <UpdateBioDialogFormContext.Provider value={dialogConform}>
      {children}
    </UpdateBioDialogFormContext.Provider>
  );
};

export const useUpdateBioDialogFormContext = () => {
  const context = useContext(UpdateBioDialogFormContext);

  if (!context) {
    throw new Error(
      "useUpdateBioDialogFormContext must be used within a UpdateBioDialogFormProvider",
    );
  }

  return context;
};
