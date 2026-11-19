import { AuthShell } from "@/components/auth/auth-shell";
import { AuthFormSkeleton } from "@/components/auth/auth-form-skeleton";

export default function Loading() {
  return (
    <AuthShell>
      <AuthFormSkeleton fields={2} />
    </AuthShell>
  );
}
