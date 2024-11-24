"use client";

import { FormProvider, getFormProps } from "@conform-to/react";
import { useUpdateBioDialogFormContext } from "@/contexts/updateBioDialogFormContext";
import { Alert } from "@/components/ui/alert";
import { CustomTextarea } from "@/components/form/CustomTextarea";
import { FormSubmit } from "@/components/form/FormSubmit";

export const UpdateBioForm = () => {
  const { action, isPending, form } = useUpdateBioDialogFormContext();

  return (
    <FormProvider context={form.context}>
      <form action={action} {...getFormProps(form)} noValidate>
        {form.errors && (
          <Alert variant="destructive" className="mb-6 space-y-2">
            {form.errors.map((error) => (
              <p key={error}>{error}</p>
            ))}
          </Alert>
        )}

        <div className="space-y-6">
          <CustomTextarea label="プロフィール" name="bio" />
        </div>

        <div className="mt-8 space-y-8">
          <FormSubmit title="更新する" isPending={isPending} />
        </div>
      </form>
    </FormProvider>
  );
};
