"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Where to send the user after a successful sign in. */
const AFTER_SIGNIN_PATH = "/dashboard";

export function SignInForm() {
  const router = useRouter();
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Clear a field's error as soon as the user starts fixing it.
  const clearError = (field) => {
    setErrors((previous) => ({ ...previous, [field]: "" }));
    setFormError("");
  };

  const validate = (email, password) => {
    const nextErrors = {};

    if (!email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!EMAIL_PATTERN.test(email.trim())) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!password) {
      nextErrors.password = "Password is required.";
    }

    return nextErrors;
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setFormError("");

    const formData = new FormData(e.target);
    const email = String(formData.get("email") || "");
    const password = String(formData.get("password") || "");

    const nextErrors = validate(email, password);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await authClient.signIn.email({
        email: email.trim(),
        password,
        // Only used by better-auth for email-verification links.
        callbackURL: AFTER_SIGNIN_PATH,
      });

      if (error) {
        // Bad credentials are not a single field's fault — show them above the button.
        setFormError(
          error.message || "Sign in failed. Please check your details and try again."
        );
        return;
      }

      toast.success("Successfully signed in!");

      // better-auth does not redirect the email/password flow, so we do it here.
      router.push(AFTER_SIGNIN_PATH);
    } catch {
      setFormError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setFormError("");

    try {
      await authClient.signIn.social({ provider: "google", callbackURL: AFTER_SIGNIN_PATH });
    } catch {
      setFormError("Could not continue with Google. Please try again.");
    }
  };

  return (
    <div className="w-full">
      <header className="mb-9">
        <h1 className="font-serif text-4xl font-semibold tracking-tight text-foreground sm:text-[2.75rem] sm:leading-[1.08]">
          Welcome back
        </h1>
        <p className="mt-3 text-base text-muted-foreground">
          Sign in to continue.
        </p>
      </header>

      <form onSubmit={handleSignIn} noValidate className="space-y-6">
        <div className="space-y-2.5">
          <Label htmlFor="email" className="text-[15px] font-medium">
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            aria-required="true"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            onChange={() => clearError("email")}
          />
          {errors.email ? (
            <p id="email-error" className="text-sm text-destructive">
              {errors.email}
            </p>
          ) : null}
        </div>

        <div className="space-y-2.5">
          <Label htmlFor="password" className="text-[15px] font-medium">
            Password
          </Label>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            aria-required="true"
            aria-invalid={Boolean(errors.password)}
            aria-describedby={errors.password ? "password-error" : undefined}
            onChange={() => clearError("password")}
          />
          {errors.password ? (
            <p id="password-error" className="text-sm text-destructive">
              {errors.password}
            </p>
          ) : null}
          <div className="flex justify-end pt-1.5">
            <Link
              href="/forgot-password"
              className="text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
            >
              Forgot password?
            </Link>
          </div>
        </div>

        {formError ? (
          <p role="alert" className="text-sm text-destructive">
            {formError}
          </p>
        ) : null}

        <div className="space-y-3 pt-3">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-[52px] w-full rounded-lg text-[15px]"
          >
            {isSubmitting ? "Signing in…" : "Sign In"}
          </Button>
          <Button
            type="button"
            onClick={handleGoogleSignIn}
            variant="secondary"
            className="h-[52px] w-full rounded-lg text-[15px]"
          >
            Continue with Google
          </Button>
        </div>
      </form>

      <p className="mt-8 text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link
          href="/sign-up"
          className="font-medium text-brand underline-offset-4 transition-colors hover:underline"
        >
          Sign up here
        </Link>
      </p>
    </div>
  );
}
