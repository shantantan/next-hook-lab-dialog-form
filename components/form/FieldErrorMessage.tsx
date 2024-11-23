interface Props {
  errors: string[];
}

export const FieldErrorMessage = ({ errors }: Props) => {
  return (
    <div className="text-destructive text-sm font-medium space-y-2">
      {errors.map((error) => (
        <p key={error}>{error}</p>
      ))}
    </div>
  );
};
