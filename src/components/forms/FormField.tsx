export function FormField({
  label,
  error,
  children,
  className
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className ?? ""}`}>
      <span className="field-label">{label}</span>
      {children}
      {error ? <p className="field-error">{error}</p> : null}
    </label>
  );
}
