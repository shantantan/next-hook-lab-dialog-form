"use client";

import { FormProvider, getFormProps } from "@conform-to/react";
import { useBasicConform } from "@/hooks/useBasicConform";
import { signUpAction } from "@/lib/auth";
import { signUpSchema } from "@/lib/schema";
import { FormErrorMessage } from "@/components/form/FormErrorMessage";
import { CustomInput } from "@/components/form/CustomInput";
import { CustomCheckbox } from "@/components/form/CustomCheckbox";
import { FormSubmit } from "@/components/form/FormSubmit";
import { DEV_USER_PASSWORD } from "@/lib/constants";

export const SignUpForm = () => {
  const { action, isPending, form } = useBasicConform<typeof signUpSchema>({
    formAction: signUpAction,
    schema: signUpSchema,
    defaultValue: {
      password: DEV_USER_PASSWORD,
      confirmPassword: DEV_USER_PASSWORD,
    },
  });

  return (
    <FormProvider context={form.context}>
      <form action={action} {...getFormProps(form)} noValidate>
        {form.errors && (
          <FormErrorMessage errors={form.errors} className="mb-6" />
        )}

        <div className="space-y-6">
          <CustomInput label="ユーザーネーム" name="name" type="text" />
          <CustomInput label="メールアドレス" name="email" type="email" />
          <CustomInput label="パスワード" name="password" type="password" />
          <CustomInput
            label="確認用パスワード"
            name="confirmPassword"
            type="password"
          />
        </div>

        <div className="mt-8 space-y-8">
          <CustomCheckbox label="利用規約に同意します" name="agreement" />
          <FormSubmit title="サインアップ" isPending={isPending} />
        </div>
      </form>
    </FormProvider>
  );
};
