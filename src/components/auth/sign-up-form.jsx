"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";
import { toast } from 'react-toastify';

const ROLES = [
  { value: "customer", label: "Customer" },
  { value: "vendor", label: "Vendor" },
];

export function SignUpForm() {
  const [role, setRole] = useState("customer");

  const uploadImage = async (image) => {
  if (!image || image.size === 0) return null;

  const formData = new FormData();
  formData.append('image', image);

  const response = await fetch(
    `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`,
    {
      method: 'POST',
      body: formData,
    }
  );

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.error?.message || 'Image upload failed!');
  }

  return result.data.url;
};
const handleSignUp = async (e) => {
  e.preventDefault();

  try {
    const formData = new FormData(e.target);
    const newUser = Object.fromEntries(formData.entries());


    const imageFile = formData.get('image');
    const imageUrl = await uploadImage(imageFile);

    const { data, error } = await authClient.signUp.email({
      ...newUser,
      image: imageUrl,
      callbackURL: '/sign-in',
    });

    if (error) {
      toast.error(error.message || 'Sign up failed!');
      return;
    }

    toast.success('Account created successfully!');
  } catch (err) {
    toast.error(err.message || 'Something went wrong!');
  }
};

const handleGoogleSignUp = async() => {
   const data = await authClient.signIn.social({
    provider: "google",
  });
}


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
            onClick={handleGoogleSignUp}
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
