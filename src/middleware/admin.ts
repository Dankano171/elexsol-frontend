import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function adminMiddleware(request: NextRequest) {
  const token = await getToken({ req: request });

  // Check if user is authenticated and has admin role
  if (!token || token.role !== 'super_admin') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
