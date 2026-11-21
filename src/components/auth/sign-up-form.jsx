"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";

const ROLES = [
  { value: "customer", label: "Customer" },
  { value: "vendor", label: "Vendor" },
];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

/** Where to send the user after a successful sign up. */
const AFTER_SIGNUP_PATH = "/sign-in";

const uploadImage = async (image) => {
  const apiKey = process.env.NEXT_PUBLIC_IMAGEBB_API_KEY;

  if (!apiKey) {
    throw new Error("Image upload is not configured. Please try again later.");
  }

  const formData = new FormData();
  formData.append("image", image);

  const response = await fetch(
    `https://api.imgbb.com/1/upload?key=${apiKey}`,
    { method: "POST", body: formData }
  );

  const result = await response.json();

  if (!response.ok || !result.success || !result.data?.url) {
    throw new Error(result.error?.message || "Image upload failed.");
  }

  return result.data.url;
};

export function SignUpForm() {
  const formRef = useRef(null);
  const router = useRouter();
  const [role, setRole] = useState("customer");
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Clear a field's error as soon as the user starts fixing it.
  const clearError = (field) => {
    setErrors((previous) => ({ ...previous, [field]: "" }));
    setFormError("");
  };

  const validate = (name, email, password, imageFile) => {
    const nextErrors = {};

    if (!name.trim()) {
      nextErrors.name = "Full name is required.";
    }

    if (!email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!EMAIL_PATTERN.test(email.trim())) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!password) {
      nextErrors.password = "Password is required.";
    } else if (password.length < 6) {
      nextErrors.password = "Password must be at least 6 characters.";
    } else if (!/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
      nextErrors.password = "Password must include an uppercase and a lowercase letter.";
    }

    // The image is optional — only check it when a file was picked.
    if (imageFile && imageFile.size > 0) {
      if (!imageFile.type.startsWith("image/")) {
        nextErrors.image = "Please choose an image file.";
      } else if (imageFile.size > MAX_IMAGE_SIZE) {
        nextErrors.image = "Image must be 5MB or smaller.";
      }
    }

    return nextErrors;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setFormError("");

    const formData = new FormData(formRef.current);
    const name = String(formData.get("name") || "");
    const email = String(formData.get("email") || "");
    const password = String(formData.get("password") || "");
    const imageFile = formData.get("image");

    const nextErrors = validate(name, email, password, imageFile);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Upload first, but only if the user picked a file.
      let imageUrl = null;
      const hasImage = imageFile instanceof File && imageFile.size > 0;

      if (hasImage) {
        try {
          imageUrl = await uploadImage(imageFile);
        } catch (uploadError) {
          setErrors((previous) => ({
            ...previous,
            image: uploadError.message || "Image upload failed. Please try again.",
          }));
          return;
        }
      }

      // Build the payload explicitly so a missing image is simply left out.
      const payload = {
        name: name.trim(),
        email: email.trim(),
        password,
        role,
        // Only used by better-auth for email-verification links.
        callbackURL: AFTER_SIGNUP_PATH,
      };

      if (imageUrl) {
        payload.image = imageUrl;
      }

      const { error } = await authClient.signUp.email(payload);

      if (error) {
        const message = error.message || "Sign up failed. Please try again.";

        // "User already exists" belongs under the email field.
        if (error.status === 422 || /already exists|already registered/i.test(message)) {
          setErrors((previous) => ({ ...previous, email: message }));
        } else {
          setFormError(message);
        }

        return;
      }

      toast.success("Account created successfully!");

      // Sign up also creates a session — end it so the user signs in explicitly.
      try {
        await authClient.signOut();
      } catch {
        // If this fails the redirect below still lands on the sign-in page.
      }

      // Start over with a clean form.
      formRef.current?.reset();
      setRole("customer");
      setErrors({});
      setFormError("");

      // better-auth does not redirect the email/password flow, so we do it here.
      router.push(AFTER_SIGNUP_PATH);
    } catch {
      setFormError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setFormError("");

    try {
      await authClient.signIn.social({ provider: "google" });
    } catch {
      setFormError("Could not continue with Google. Please try again.");
    }
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

      <form ref={formRef} onSubmit={handleSignUp} noValidate className="space-y-6">
        <div className="space-y-2.5">
          <Label htmlFor="name" className="text-[15px] font-medium">
            Full name
          </Label>
          <Input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            aria-required="true"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            onChange={() => clearError("name")}
          />
          {errors.name ? (
            <p id="name-error" className="text-sm text-destructive">
              {errors.name}
            </p>
          ) : null}
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
            Password (6+ chars, upper and lower case)
          </Label>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
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
        </div>

        <div className="space-y-2.5">
          <Label htmlFor="image" className="text-[15px] font-medium">
            Profile image (optional)
          </Label>
          <Input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            aria-invalid={Boolean(errors.image)}
            aria-describedby={errors.image ? "image-error" : undefined}
            onChange={() => clearError("image")}
          />
          {errors.image ? (
            <p id="image-error" className="text-sm text-destructive">
              {errors.image}
            </p>
          ) : null}
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
            {isSubmitting ? "Creating account…" : "Sign Up"}
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
