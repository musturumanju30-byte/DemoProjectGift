import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Server-side route guard for administrative endpoints in Next.js 16+
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /admin routes (except /admin/login)
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    // Check if any Supabase authentication session cookie exists
    const hasAuthCookie = request.cookies
      .getAll()
      .some(c => c.name.startsWith("sb-") && c.name.includes("-auth-token"));

    // If definitely unauthenticated, redirect early to /admin/login
    if (!hasAuthCookie) {
      const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === "true";
      if (!isDemoMode) {
        const loginUrl = new URL("/admin/login", request.url);
        loginUrl.searchParams.set("error", "unauthorized");
        return NextResponse.redirect(loginUrl);
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
