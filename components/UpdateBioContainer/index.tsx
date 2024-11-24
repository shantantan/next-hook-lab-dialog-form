"use client";

import { UpdateBioProvider } from "@/contexts/updateBioContext";
import { UpdateBioDialogFormProvider } from "@/contexts/updateBioDialogFormContext";
import { BioDisplay } from "@/components/UpdateBioContainer/BioDisplay";
import { UpdateBioDialog } from "@/components/UpdateBioContainer/UpdateBioDialog";

interface Props {
  initialBio: string | null;
}

export const UpdateBioContainer = ({ initialBio }: Props) => {
  return (
    <UpdateBioProvider>
      <BioDisplay />

      <div className="mt-6">
        <UpdateBioDialogFormProvider initialBio={initialBio}>
          <UpdateBioDialog />
        </UpdateBioDialogFormProvider>
      </div>
    </UpdateBioProvider>
  );
};
