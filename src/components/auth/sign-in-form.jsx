"use client";import { toast } from 'react-toastify';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";


export function SignInForm() {
 const handleSignIn = async (e) => {
  e.preventDefault();

  try {
    const formData = new FormData(e.target);
    const user = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signIn.email({
      ...user,
      callbackURL: '/',
    });

    if (error) {
      toast.error(error.message || 'Sign in failed!');
      return;
    }

    toast.success('Successfully signed in!');
  } catch (err) {
    toast.error(err.message || 'Something went wrong!');
  }
};

const handleGoogleSignIn = async() => {
   const data = await authClient.signIn.social({
    provider: "google",
  });
}


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
          />
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
          />
          <div className="flex justify-end pt-1.5">
            <Link
              href="/forgot-password"
              className="text-sm text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
            >
              Forgot password?
            </Link>
          </div>
        </div>

        <div className="space-y-3 pt-3">
          <Button type="submit" className="h-[52px] w-full rounded-lg text-[15px]">
            Sign In
          </Button>
          <Button
            type="button"
            onClick = {handleGoogleSignIn}
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
