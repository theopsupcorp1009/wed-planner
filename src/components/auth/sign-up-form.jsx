"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const ROLES = [
  { value: "customer", label: "Customer" },
  { value: "vendor", label: "Vendor" },
];

export function SignUpForm() {
  const [role, setRole] = useState("customer");

  const handleSignUp = (e) => {
    e.preventDefault();
  };

  return (
    <div className="w-full">
      <header className="mb-9">
        <h1 className="font-serif text-4xl font-semibold tracking-tight text-foreground sm:text-[2.75rem] sm:leading-[1.08]">
          Create your account
        </h1>
        <p className="mt-3 text-base text-muted-foreground">
          Join as a customer or a vendor.
        </p>
      </header>

      <form onSubmit={handleSignUp} noValidate className="space-y-6">
        <div className="space-y-2.5">
          <Label htmlFor="name" className="text-[15px] font-medium">
            Full name
          </Label>
          <Input id="name" name="name" type="text" autoComplete="name" />
        </div>

        <div className="space-y-2.5">
          <Label htmlFor="email" className="text-[15px] font-medium">
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
          />
        </div>

        <div className="space-y-2.5">
          <Label htmlFor="password" className="text-[15px] font-medium">
            Password (6+ chars, upper and lower case)
          </Label>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
          />
        </div>

        <div className="space-y-2.5">
          <Label htmlFor="image" className="text-[15px] font-medium">
            Profile image (optional)
          </Label>
          <Input id="image" name="image" type="file" accept="image/*" />
        </div>

        <div className="space-y-2.5">
          <span className="text-[15px] font-medium">Account role</span>
          <div
            role="group"
            aria-label="Account role"
            className="grid grid-cols-2 gap-3"
          >
            {ROLES.map((option) => {
              const active = role === option.value;

              return (
                <button
                  key={option.value}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setRole(option.value)}
                  className={cn(
                    "h-[52px] rounded-xl border bg-card text-[15px] transition-colors outline-none",
                    "focus-visible:ring-[3px] focus-visible:ring-ring/30",
                    active
                      ? "border-brand text-foreground"
                      : "border-input text-muted-foreground hover:border-ring/60 hover:text-foreground"
                  )}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-3 pt-3">
          <Button type="submit" className="h-[52px] w-full rounded-lg text-[15px]">
            Sign Up
          </Button>
          <Button
            type="button"
            variant="secondary"
            className="h-[52px] w-full rounded-lg text-[15px]"
          >
            Continue with Google
          </Button>
        </div>
      </form>

      <p className="mt-8 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/sign-in"
          className="font-medium text-brand underline-offset-4 transition-colors hover:underline"
        >
          Sign in here
        </Link>
      </p>
    </div>
  );
}
