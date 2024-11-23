import type { SubmissionResult } from "@conform-to/react";

export interface LayoutProps {
  children: Readonly<React.ReactNode>;
}

export type ServerActionResponseWithConform =
  | { success: false; error: { result: SubmissionResult; message: string } }
  | { success: true; message: string };

export type AuthenticatedForAction =
  | { success: false; error: { message: string } }
  | { success: true; userId: string };

export type FormAction = (
  formData: FormData,
) => Promise<ServerActionResponseWithConform>;

export type HandleSubmission = (
  formAction: FormAction,
  formData: FormData,
  onComplete: () => void,
) => Promise<SubmissionResult | undefined>;

export type BioType = string;
