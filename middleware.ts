import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Add the paths that require authentication
const protectedPaths = ['/admin'];

export function middleware(request: NextRequest) {
    // Get the pathname
    const { pathname } = request.nextUrl;

    // If it's the login page and user is already authenticated, redirect to admin
    if (pathname === '/admin/login') {
        const token = request.cookies.get('admin_token');
        if (token) {
            return NextResponse.redirect(new URL('/admin', request.url));
        }
        return NextResponse.next();
    }

    // If it's an admin page (but not login), check for authentication
    if (pathname.startsWith('/admin')) {
        const token = request.cookies.get('admin_token');
        if (!token) {
            // Add the current path as a redirect parameter
            const redirectUrl = new URL('/admin/login', request.url);
            redirectUrl.searchParams.set('from', pathname);
            return NextResponse.redirect(redirectUrl);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
}; 