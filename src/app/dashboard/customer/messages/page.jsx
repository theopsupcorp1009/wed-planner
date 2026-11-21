import { MessageSquare } from "lucide-react";

export const metadata = {
  title: "Messages",
};

export default function CustomerMessagesPage() {
  return (
    <section>
      <h1 className="font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        Messages
      </h1>
      <p className="mt-2 text-muted-foreground">
        Talk to vendors about dates, packages and availability.
      </p>

      <div className="mt-8 rounded-2xl border border-border bg-card px-6 py-14 text-center">
        <MessageSquare
          className="mx-auto size-8 text-muted-foreground"
          aria-hidden="true"
        />
        <p className="mt-4 font-medium text-foreground">No messages yet</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Conversations with vendors will appear here.
        </p>
      </div>
    </section>
  );
}
