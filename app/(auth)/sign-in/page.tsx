import Link from "next/link";
import { SignInForm } from "@/components/SignInForm";

const SignIn = () => {
  return (
    <main className="mx-auto max-w-md px-4 py-16">
      <h1 className="text-xl font-bold">サインイン</h1>

      <div className="mt-16">
        <SignInForm />
      </div>

      <p className="mt-16 text-sm">
        登録はお済みですか？
        <Link
          href="/sign-up"
          className="ml-2 text-sky-800 font-medium underline hover:text-sky-600 hover:no-underline"
        >
          サインイン
        </Link>
      </p>
    </main>
  );
};

export default SignIn;
