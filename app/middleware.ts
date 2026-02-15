import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

type JwtPayload = {
  role?: 'admin' | 'user';
};

function readJwtPayload(token: string): JwtPayload | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const payloadPart = parts[1];
    const normalized = payloadPart.replace(/-/g, '+').replace(/_/g, '/');
    const padded = normalized + '='.repeat((4 - (normalized.length % 4)) % 4);
    const json = atob(padded);
    return JSON.parse(json) as JwtPayload;
  } catch {
    return null;
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('token')?.value;
  const payload = token ? readJwtPayload(token) : null;
  const role = payload?.role;

  // Logged-in users should not stay on login page
  if (pathname === '/login' && token && role) {
    return NextResponse.redirect(
      new URL(role === 'admin' ? '/admin/dashboard' : '/user/dashboard', request.url)
    );
  }

  const isProtectedPath =
    pathname.startsWith('/cart') ||
    pathname.startsWith('/checkout') ||
    pathname.startsWith('/admin') ||
    pathname.startsWith('/user');

  // Not logged in: redirect to login
  if (isProtectedPath && (!token || !role)) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Admin should not access cart or checkout
  if (role === 'admin' && (pathname.startsWith('/cart') || pathname.startsWith('/checkout'))) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }

  // User should not access admin pages
  if (role === 'user' && pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/user/dashboard', request.url));
  }

  // Admin should not access user dashboard pages
  if (role === 'admin' && pathname.startsWith('/user')) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/login', '/cart/:path*', '/checkout/:path*', '/admin/:path*', '/user/:path*'],
};
