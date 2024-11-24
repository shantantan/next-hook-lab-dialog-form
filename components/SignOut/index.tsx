"use client";

import { signOutAction } from "@/lib/auth";

export const SignOut = () => {
  return (
    <button
      onClick={() => signOutAction()}
      type="button"
      className="text-sky-800 font-medium underline hover:text-sky-600 hover:no-underline"
    >
      ログアウト
    </button>
  );
};
