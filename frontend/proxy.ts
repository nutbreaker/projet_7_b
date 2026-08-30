import { NextRequest, NextResponse } from 'next/server';
import { getSessionToken } from './services/session';
import decodeJWT from './utils/jwt-decoder';
import { authProfile } from './services/auth-profile';

// https://nextjs.org/docs/pages/guides/authentication#optimistic-checks-with-proxy-optional

const publicRoutes = ['/signin', '/signup'];

export default async function proxy(req: NextRequest) {
    const path = req.nextUrl.pathname;

    const isPublicRoute = publicRoutes.includes(path);
    const cookie = await getSessionToken();
    const userInfo = await decodeJWT(cookie);
    const userProfile = await authProfile(cookie as string);

    if (!isPublicRoute && (!userInfo?.userId || !userProfile.success)) {
        return NextResponse.redirect(new URL('/signin', req.nextUrl))
    }

    if (userInfo?.userId && userProfile.success && (isPublicRoute || path === '/')) {
        return NextResponse.redirect(new URL('/dashboard', req.nextUrl))
    }

    return NextResponse.next()
}

// Routes Proxy should not run on
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|assets|favicon\.ico|.*\\.png$).*)'],
}