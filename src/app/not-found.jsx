import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <section className="flex min-h-[calc(100svh-5rem)] items-center justify-center px-5 py-20 sm:px-8">
      <div className="w-full max-w-xl text-center">
        <p
          aria-hidden="true"
          className="font-serif text-[7rem] leading-none font-semibold tracking-tight text-brand/25 sm:text-[10rem]"
        >
          404
        </p>

        <h1 className="mt-4 font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          This page wandered off
        </h1>

        <p className="mx-auto mt-4 max-w-sm text-base leading-relaxed text-muted-foreground">
          The page you are looking for does not exist.
        </p>

        <Button asChild className="mt-8 h-11 rounded-lg px-6 text-[15px]">
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </section>
  );
}
