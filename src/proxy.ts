import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function proxy(request: NextRequest) {
  // Add security headers to the base response
  const response = NextResponse.next();
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  
  // Protect /admin routes, but allow /admin/login
  if (request.nextUrl.pathname.startsWith('/admin') && request.nextUrl.pathname !== '/admin/login') {
    const session = request.cookies.get('admin_session');
    
    if (!session?.value) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    try {
      const secretKey = process.env.AUTH_SECRET || "default_unsafe_secret";
      const key = new TextEncoder().encode(secretKey);
      await jwtVerify(session.value, key);
      // Valid token, return response with headers
      return response;
    } catch (error) {
      // Invalid token
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
