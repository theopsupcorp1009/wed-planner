import { Logo } from "@/components/brand/logo";

/**
 * Split auth layout.
 * Desktop: 50/50 — brand panel + form panel.
 * Mobile: single column form, brand panel hidden.
 */
export function AuthShell({ children }) {
  return (
    <div className="grid min-h-[calc(100svh-5rem)] grid-cols-1 bg-background lg:grid-cols-2">
      {/* Brand panel — desktop only */}
      <aside className="relative hidden flex-col justify-end overflow-hidden bg-panel p-14 text-panel-foreground lg:flex xl:p-20">
        <div className="max-w-md">
          <Logo className="text-3xl" />
          <p className="mt-8 font-serif text-4xl leading-[1.15] font-medium xl:text-5xl xl:leading-[1.12]">
            Every great wedding starts with the right team.
          </p>
        </div>
      </aside>

      {/* Form panel */}
      <main className="flex items-center justify-center px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
        <div className="w-full max-w-[600px]">
          <Logo className="mb-12 inline-block text-2xl lg:hidden" />
          {children}
        </div>
      </main>
    </div>
  );
}
