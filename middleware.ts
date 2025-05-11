import { getSessionCookie } from "better-auth/cookies"
import { type NextRequest, NextResponse } from "next/server"

export async function middleware(request: NextRequest) {
    const url = request.nextUrl.clone()

    if (url.pathname === '/') {
        url.pathname = '/chat'
        return NextResponse.rewrite(url)
    }

    const { pathname } = request.nextUrl;

    /*
     * Playwright starts the dev server and requires a 200 status to
     * begin the tests, so this ensures that the tests can start
     */
    if (pathname.startsWith('/ping')) {
        return new Response('pong', { status: 200 });
    }

    if (pathname.startsWith('/auth')) {
        return NextResponse.next();
    }
    // Check cookie for optimistic redirects for protected routes
    // Use getSession in your RSC to protect a route via SSR or useAuthenticate client side
    const sessionCookie = getSessionCookie(request)

    if (!sessionCookie) {
        const redirectTo = request.nextUrl.pathname + request.nextUrl.search
        return NextResponse.redirect(new URL(`/auth/sign-in?redirectTo=${redirectTo}`, request.url))
    }

    return NextResponse.next()
}

export const config = {
    // Protected routes
    matcher: [
        '/',
        '/chat/:id',
        '/api/:path*',
        "/auth/settings",

        /*
        * Match all request paths except for the ones starting with:
        * - _next/static (static files)
        * - _next/image (image optimization files)
        * - favicon.ico, sitemap.xml, robots.txt (metadata files)
        */
        '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ]
}
