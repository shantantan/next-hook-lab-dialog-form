"use client";

import { FormProvider, getFormProps } from "@conform-to/react";
import { useBasicConform } from "@/hooks/useBasicConform";
import { signInAction } from "@/lib/auth";
import { signInSchema } from "@/lib/schema";
import { FormErrorMessage } from "@/components/form/FormErrorMessage";
import { CustomInput } from "@/components/form/CustomInput";
import { FormSubmit } from "@/components/form/FormSubmit";
import { DEV_USER_PASSWORD } from "@/lib/constants";

export const SignInForm = () => {
  const { action, isPending, form } = useBasicConform<typeof signInSchema>({
    formAction: signInAction,
    schema: signInSchema,
    defaultValue: {
      password: DEV_USER_PASSWORD,
    },
  });

  return (
    <FormProvider context={form.context}>
      <form action={action} {...getFormProps(form)} noValidate>
        {form.errors && (
          <FormErrorMessage errors={form.errors} className="mb-6" />
        )}

        <div className="space-y-6">
          <CustomInput label="メールアドレス" name="email" type="email" />
          <CustomInput label="パスワード" name="password" type="password" />
        </div>

        <div className="mt-8 space-y-8">
          <FormSubmit title="サインアップ" isPending={isPending} />
        </div>
      </form>
    </FormProvider>
  );
};
