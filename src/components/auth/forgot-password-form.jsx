"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ForgotPasswordForm() {
  const handleForgotPassword = (e) => {
    e.preventDefault();
  };

  return (
    <div className="w-full">
      <header className="mb-9">
        <h1 className="font-serif text-4xl font-semibold tracking-tight text-foreground sm:text-[2.75rem] sm:leading-[1.08]">
          Forgot password
        </h1>
        <p className="mt-3 text-base text-muted-foreground">
          Enter your email and we will send a reset link.
        </p>
      </header>

      <form onSubmit={handleForgotPassword} noValidate className="space-y-10">
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
          />
        </div>

        <div className="space-y-4">
          <Button type="submit" className="h-[52px] w-full rounded-lg text-[15px]">
            Send Reset Link
          </Button>
          <Link
            href="/sign-in"
            className="block text-center text-[15px] text-foreground underline-offset-4 transition-colors hover:text-brand hover:underline"
          >
            Back to Sign In
          </Link>
        </div>
      </form>
    </div>
  );
}
