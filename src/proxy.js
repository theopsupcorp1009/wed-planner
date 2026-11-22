import { NextResponse } from "next/server";

const PROTECTED_PREFIXES = ["/dashboard", "/payment"];
/** Service details are private, but the /services browse page is public. */
const PROTECTED_PATTERNS = [/^\/services\/[^/]+$/];
const AUTH_PAGES = ["/sign-in", "/sign-up", "/forgot-password"];

const SESSION_COOKIES = [
  "better-auth.session_token",
  "__Secure-better-auth.session_token",
];

function hasSession(request) {
  return SESSION_COOKIES.some((name) => Boolean(request.cookies.get(name)?.value));
}

export function proxy(request) {
  const { pathname } = request.nextUrl;
  const signedIn = hasSession(request);

  const isProtected =
    PROTECTED_PREFIXES.some(
      (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
    ) || PROTECTED_PATTERNS.some((pattern) => pattern.test(pathname));

  if (isProtected && !signedIn) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (AUTH_PAGES.includes(pathname) && signedIn) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/payment/:path*",
    "/services/:id+",
    "/sign-in",
    "/sign-up",
    "/forgot-password",
  ],
};
