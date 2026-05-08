const statusStyles: Record<string, string> = {
  pending: "bg-amber-500/15 text-amber-300",
  confirmed: "bg-emerald-500/15 text-emerald-300",
  cancelled: "bg-rose-500/15 text-rose-300",
  completed: "bg-blue-500/15 text-blue-300"
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`status-pill ${statusStyles[status] ?? "bg-white/10 text-white"}`}>
      {status}
    </span>
  );
}
