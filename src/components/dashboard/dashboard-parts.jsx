export function PageTitle({ title, text }) {
  return (
    <header>
      <h1 className="font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        {title}
      </h1>
      <p className="mt-2 text-muted-foreground">{text}</p>
    </header>
  );
}

export function StatCard({ label, value, icon: Icon }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">{label}</p>
        <Icon className="size-4 text-brand" aria-hidden="true" />
      </div>
      <p className="mt-3 font-serif text-3xl font-semibold capitalize text-foreground">
        {value}
      </p>
    </div>
  );
}

export function Message({ text }) {
  return (
    <div className="mt-8 rounded-2xl border border-border bg-card px-6 py-14 text-center text-sm text-muted-foreground">
      {text}
    </div>
  );
}

export function StatusPill({ status }) {
  const styles = {
    approved: "bg-success-bg text-success",
    accepted: "bg-success-bg text-success",
    paid: "bg-success-bg text-success",
    premium: "bg-success-bg text-success",
    pending: "bg-warning-bg text-warning",
    rejected: "bg-danger-bg text-danger",
    cancelled: "bg-danger-bg text-danger",
    blocked: "bg-danger-bg text-danger",
  };

  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-xs font-medium capitalize ${
        styles[status] || "bg-muted text-muted-foreground"
      }`}
    >
      {status}
    </span>
  );
}
