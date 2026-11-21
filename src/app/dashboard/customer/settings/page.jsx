import { Settings } from "lucide-react";

export const metadata = {
  title: "Settings",
};

export default function CustomerSettingsPage() {
  return (
    <section>
      <h1 className="font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        Settings
      </h1>
      <p className="mt-2 text-muted-foreground">
        Manage your profile, password and notification preferences.
      </p>

      <div className="mt-8 rounded-2xl border border-border bg-card px-6 py-14 text-center">
        <Settings
          className="mx-auto size-8 text-muted-foreground"
          aria-hidden="true"
        />
        <p className="mt-4 font-medium text-foreground">
          Account settings are coming soon
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Your profile details will be editable here.
        </p>
      </div>
    </section>
  );
}
