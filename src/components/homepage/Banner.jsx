import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Banner() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 pt-10 pb-16 sm:px-6 lg:pt-14 lg:pb-24">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Copy */}
        <div>
          <span className="inline-flex items-center rounded-full bg-secondary px-4 py-1.5 text-[13px] font-medium tracking-wide text-secondary-foreground">
            Wedding planning, made calm
          </span>

          <h1 className="mt-6 font-serif text-[2.5rem] leading-[1.06] font-semibold tracking-tight text-foreground sm:text-5xl lg:text-[3.75rem]">
            Find the people who will make your day unforgettable
          </h1>

          <p className="mt-6 max-w-[430px] text-base leading-relaxed text-muted-foreground sm:text-lg">
            Compare photographers, venues, florists and more. Send a request in
            minutes and track every reply.
          </p>

          <Button asChild className="mt-8 h-11 rounded-lg px-6 text-[15px]">
            <Link href="/services">Explore Wedding Services</Link>
          </Button>
        </div>

        {/* Arch-shaped hero visual */}
        <div className="relative">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-[999px] bg-panel">
            <Image
              src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80"
              alt="A couple at an elegant wedding"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 hover:scale-[1.03]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
