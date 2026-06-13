import { NextRequest, NextResponse } from 'next/server';
import { getSessionToken } from './services/session';
import decodeJWT from './utils/jwt-decoder';

// https://nextjs.org/docs/pages/guides/authentication#optimistic-checks-with-proxy-optional

const publicRoutes = ['/signin', '/signup', '/signout'];

export default async function proxy(req: NextRequest) {
    const path = req.nextUrl.pathname;

    if (path === '/signout') {
        return NextResponse.next();
    }

    const isPublicRoute = publicRoutes.includes(path);
    const cookie = await getSessionToken();
    const userInfo = await decodeJWT(cookie);

    if (!isPublicRoute && !userInfo?.userId) {
        return NextResponse.redirect(new URL('/signin', req.nextUrl))
    }

    if (userInfo?.userId && (isPublicRoute || path === '/')) {
        return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
    }

    return NextResponse.next()
}

// Routes Proxy should not run on
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|assets|favicon\.ico|.*\\.png$).*)'],
}