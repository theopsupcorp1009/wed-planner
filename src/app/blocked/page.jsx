export const metadata = {
  title: "Account blocked",
};

export default function BlockedPage() {
  return (
    <section className="mx-auto max-w-xl px-5 py-24 text-center">
      <h1 className="font-serif text-3xl font-semibold text-foreground">
        Your account is blocked
      </h1>
      <p className="mt-3 text-muted-foreground">
        You cannot use these features right now. Please contact WedPlan support.
      </p>
    </section>
  );
}
