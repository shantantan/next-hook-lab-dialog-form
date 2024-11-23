import { Alert } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  errors: string[];
}

export const FormErrorMessage = ({ className, errors }: Props) => {
  return (
    <Alert variant="destructive" className={cn("space-y-2", className)}>
      {errors.map((error) => (
        <p key={error}>{error}</p>
      ))}
    </Alert>
  );
};
