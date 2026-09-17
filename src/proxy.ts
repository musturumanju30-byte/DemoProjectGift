import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Server-side route guard for administrative endpoints in Next.js
 * Hands off authorization to AdminLayout RBAC gatekeeper which reads Supabase Auth session.
 */
export function proxy(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
