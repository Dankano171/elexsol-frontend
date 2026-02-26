import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default withAuth(
  function middleware(req: NextRequest) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // Admin route protection
    if (path.startsWith('/admin') && token?.role !== 'super_admin') {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    // MFA verification gate
    if (token?.mfaEnabled && !token?.mfaVerified && path !== '/mfa-verify') {
      return NextResponse.redirect(new URL('/mfa-verify', req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: '/login',
    },
  }
);

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/integrations/:path*',
    '/compliance/:path*',
    '/invoices/:path*',
    '/reports/:path*',
    '/settings/:path*',
    '/admin/:path*',
  ],
};
